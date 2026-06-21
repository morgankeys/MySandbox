# Research: Borrowing OpenCode's Agentic Harness

> Goal: understand how OpenCode ([`sst/opencode`](https://github.com/sst/opencode))
> builds its agent loop so we can **replicate the patterns** in our own small
> Node/JS harness — *not* depend on it as a library.
>
> OpenCode is **MIT licensed** (`Copyright (c) 2025 opencode`). We can borrow
> ideas freely; if we ever copy code verbatim, MIT just requires keeping the
> license/attribution. Everything below is a description of patterns, written
> from reading the source — nothing here is copied.

---

## 1. What OpenCode actually is

A TypeScript monorepo (Bun) with ~2,000 `.ts` files. The agent runtime lives in
`packages/opencode/src`. Two foundations do most of the heavy lifting:

- **Vercel AI SDK (`ai`)** — provider abstraction, streaming, and tool-calling.
  OpenCode's default runtime is literally `streamText(...)` from this SDK. This
  is the single biggest thing to borrow: *don't reinvent provider plumbing.*
- **Effect (`effect`)** — a functional effect system used for dependency
  injection (Layers/Services), typed errors, and schemas. This is powerful but
  heavy; it's the main thing we should **not** copy (see §8).

Tools' parameters are defined with Effect `Schema` internally and `zod` for
plugin-supplied tools, both lowered to **JSON Schema** before going to the model.

### The pieces that matter for a harness

| Concern | OpenCode file | What it does |
|---|---|---|
| **Agent loop** | `session/prompt.ts` (~1140+) | The `while(true)` that drives steps until done |
| **Step processor** | `session/processor.ts` | Consumes the model's event stream, dispatches tools, persists parts |
| **LLM call** | `session/llm.ts` | Wraps `streamText`, provider transforms, tool-call repair |
| **Request prep** | `session/llm/request.ts` | Builds system + messages + tools + params + headers |
| **Tool contract** | `tool/tool.ts` | `{ id, description, parameters, execute(args, ctx) }` |
| **Tool registry** | `tool/registry.ts` | Assembles builtin + custom + plugin tools, filters per model/permission |
| **Permissions** | `permission/index.ts` | Rule-based allow/ask/deny with wildcard patterns |
| **Agents/subagents** | `agent/agent.ts`, `tool/task.ts` | Named agent configs; subagents spawned via a `task` tool |
| **Compaction** | `session/compaction.ts` | Summarize-head/keep-tail when over the token budget |
| **System prompts** | `session/prompt/*.txt` | Per-model-family prompt variants |

---

## 2. The agent loop (the core to replicate)

`session/prompt.ts` is a single `while (true)` loop. Stripped of OpenCode's
persistence and v1/v2 migration noise, each iteration is:

1. **Load conversation** (dropping compacted-away messages); find the latest
   user / assistant / finished messages.
2. **Decide whether to exit.** Exit when the last assistant message has a finish
   reason that is *not* `tool-calls` **and** there are no pending (unanswered)
   tool calls. The comment notes some providers return `stop` even with tool
   calls present, so the loop also checks for actual pending tool parts rather
   than trusting the finish reason alone.
3. **Step bookkeeping.** `step++`; on step 1, kick off async title + summary
   generation (forked, non-blocking).
4. **Handle special work items first:** a queued *subtask* (subagent) or a
   *compaction* task.
5. **Overflow check.** If the last turn's token count exceeds the model's usable
   window, enqueue a compaction and `continue`.
6. **Resolve the agent config** (`maxSteps = agent.steps ?? Infinity`,
   `isLastStep = step >= maxSteps`).
7. **Inject reminders** (system-reminder messages).
8. **Resolve the tool set** for this agent+model (permission-filtered).
9. **Assemble the system prompt** (`env + instructions + skills`).
10. **Run the step** via the processor, passing messages (plus a
    `MAX_STEPS_PROMPT` assistant nudge if this is the last allowed step).
11. The step returns **`"continue" | "compact" | "stop"`**; the loop acts on it.

**Borrow:** the loop shape, the "stop only when finish≠tool-calls *and* no
pending tool calls" rule, the `maxSteps` cap with a final-step nudge, and the
tri-state step result.

```
loop:
  msgs = history()
  if last assistant finished and no pending tool calls: break
  step++
  if over token budget: compact(); continue
  tools = resolveTools(agent, model)         # permission-filtered
  system = [env, instructions, skills]
  result = processStep(msgs, system, tools)  # streams model, runs tools
  if result == "stop": break
  if result == "compact": enqueueCompaction()
  # else continue
```

---

## 3. The step processor (streaming + tool dispatch)

`session/processor.ts` consumes a **normalized event stream** and `switch`es on
event type: `reasoning-start/delta/end`, `tool-input-start/delta/end`,
`tool-call`, `tool-result`, `tool-error`, `step-start`, `step-finish`,
`provider-error`. For each it updates the in-memory message "parts", persists
them, and publishes events to a bus (for the UI).

Worth stealing:

- **Tool calls are assembled incrementally** from streamed input deltas, then
  executed once `tool-call` arrives — enables live "tool is running" UI.
- **Doom-loop detection** (`DOOM_LOOP_THRESHOLD`): if the last *N* parts are the
  same tool called with the *same input*, it raises a `doom_loop` permission ask
  instead of letting the model spin forever. Cheap, high-value safety net.
- **Step result derivation** (end of file):
  `if needsCompaction → "compact"; if blocked or error → "stop"; else "continue"`.

For our first version we don't need OpenCode's dual persistence — we can consume
the AI SDK `fullStream` directly (text-delta, tool-call, tool-result, finish)
and keep messages in memory.

---

## 4. The LLM call

`session/llm.ts` wraps the AI SDK `streamText`. Things to borrow:

- **`experimental_repairToolCall`**: if the model emits a tool name with wrong
  casing, remap it; if it's genuinely unknown, rewrite the call to a built-in
  **`invalid`** tool whose output tells the model what went wrong. The loop
  never crashes on a bad tool name — the model self-corrects. (Pairs with the
  `InvalidArgumentsError` "please rewrite the input" message in `tool/tool.ts`.)
- **Adapter seam**: OpenCode supports two runtimes (default AI SDK; experimental
  "native") that both converge on one `LLMEvent` stream (documented in
  `session/llm/AGENTS.md`). We don't need two runtimes, but the lesson holds:
  *keep the model-call behind one interface that emits a normalized event
  stream*, so the processor doesn't care who produced it. (Our scaffold's
  `provider.js` is already this seam.)
- **Plugin hooks** at prep time (`chat.params`, `chat.headers`,
  `experimental.chat.system.transform`) — overkill for us initially.

`session/llm/request.ts` shows the request assembly order: system prompt =
`agent.prompt (or provider default) + extra system + user system`; then params
(`temperature/topP/topK/maxOutputTokens` with provider-specific defaults); then
permission-filtered tools; then headers.

---

## 5. The tool contract (clean, very borrowable)

From `tool/tool.ts`, a tool definition is essentially:

```ts
interface ToolDef {
  id: string
  description: string          // sent to the model
  parameters: Schema           // validated; lowered to JSON Schema for the model
  execute(args, ctx): Promise<{
    title: string
    output: string             // what the model sees
    metadata: object           // for UI / telemetry
    attachments?: File[]
  }>
}
```

The `define()` wrapper adds three behaviors we should copy:

1. **Validate args against the schema**; on failure throw a typed
   `InvalidArgumentsError` whose message is *model-facing*:
   *"The X tool was called with invalid arguments: … Please rewrite the input so
   it satisfies the expected schema."* The AI SDK feeds that back as the tool
   result and the model retries. Errors become **conversation turns, not
   crashes** — this is the central robustness trick.
2. **Truncate output** to a per-agent budget (with an `outputPath` pointer to
   the full content when truncated).
3. **Carry a rich `ctx`**: `sessionID`, `messageID`, `agent`, **`abort` signal**,
   the running `messages`, a `metadata()` updater (for streaming UI), and
   **`ask()`** for permission.

`tool/read.ts` is a good concrete example: it resolves/normalizes the path,
**calls `ctx.ask({ permission: "read", ... })` before touching the FS**, handles
directories/images/PDFs/binary, caps output at 50 KB, and returns paginated
content with "use offset=N to continue" hints. The pattern — *ask permission →
do the side effect → return bounded, paginated, self-describing output* — is
exactly what we want for `read`/`write`/`shell`/`grep`.

The default builtin set (`tool/registry.ts`): `shell, read, glob, grep, edit,
write, task, fetch, todo, search, skill, patch` (+ `invalid`, optional
`question`/`lsp`/`plan`). The registry also filters tools per model (e.g.
`apply_patch` for GPT models, `edit`/`write` otherwise) and per permission.

---

## 6. Permissions (rule-based, simple, worth copying)

`permission/index.ts`:

- A **rule** = `{ permission, pattern, action: "allow" | "ask" | "deny" }`.
- **`evaluate(permission, pattern, ...rulesets)`** = the *last* rule whose
  `permission` and `pattern` both wildcard-match; default is **`ask`**.
- **`ask()`** evaluates each requested pattern: `deny` → error; `allow` → pass;
  otherwise raise an async request (an Effect `Deferred`) published on the event
  bus and wait for a reply.
- **`reply()`** resolves the request; an **"always"** reply appends `allow`
  rules so the same action is auto-approved later (and auto-resolves other
  pending asks that the new rule now permits). A **reject** with a message
  becomes a `CorrectedError` carrying feedback back to the model.

This is a small, elegant model: tools self-declare what they need via
`ctx.ask`, and a single ruleset (config + agent + session + runtime approvals)
decides allow/ask/deny. We can replicate it with a plain promise instead of
Effect's `Deferred`.

---

## 7. Agents, subagents, and context management

- **Agents** (`agent/agent.ts`): `Info = { name, description, mode
  (primary|subagent|all), model, prompt, permission ruleset, temperature, topP,
  steps, options }`. Agents can even be **generated** from a description.
- **Subagents** (`tool/task.ts`): the `task` tool spawns a *nested* agent loop
  with its own `subagent_type`, derived permissions, optional **background**
  execution (returns immediately, notifies on completion), and `task_id` to
  resume. Same loop, recursively. The `task` tool's description is dynamically
  built from the list of available subagents the current agent may call.
- **Compaction** (`session/compaction.ts`): when usage overflows the usable
  window, summarize the **head** of the conversation and keep a **tail** of the
  most recent turns (`tail_turns`, default config), inserting a compaction
  summary part. Triggered automatically on overflow or manually.
- **Per-model system prompts** (`session/prompt/*.txt`): distinct prompts for
  `anthropic`, `gpt`, `gemini`, `kimi`, `codex`, `beast`, etc., chosen by model.
  The Anthropic/`default` prompts emphasize terseness ("answer in < 4 lines",
  "no preamble/postamble") and safe-URL rules.

---

## 8. What to skip / simplify for our version

OpenCode is production software for many providers and clients; a lot of its
bulk is not the harness itself:

- **Effect-ts** (Layers/Services/Schema/typed errors). Powerful DI, but a steep
  conceptual tax. Use plain `async/await`, a small manual registry object, and
  **zod** for schemas (zod → JSON Schema is one call).
- **The v1→v2 migration code** — the `mirrorAssistant` / "dual-write" branches
  everywhere are transitional cruft, not architecture.
- **The "native" runtime** — just use the AI SDK path.
- **Persistence / DB / event bus / TUI / LSP / MCP / plugins / snapshots** —
  start in-memory with console output; add later if useful.

---

## 9. Proposed minimal harness (what we'd actually build here)

Stack: **Node + AI SDK (`ai`) + `@ai-sdk/anthropic` + `zod`** (Claude, per the
project's default to the latest Claude models). Borrow the *patterns* above:

```
agentic-harness/src/
  index.js        # REPL / entry
  loop.js         # the while-loop (§2): step, stop-condition, maxSteps
  provider.js     # wraps streamText; emits a normalized event stream (§4)
  processor.js    # consume stream: text/tool-call/tool-result/finish (§3)
  tools/
    registry.js   # name -> tool; exposes JSON Schemas (§5)
    read.js write.js shell.js grep.js   # each: ask -> act -> bounded output
  permission.js   # allow/ask/deny ruleset + ctx.ask (§6)
  prompt.js       # system prompt assembly (§7)
```

**Build order (each step independently runnable):**

1. Swap our stub `provider.js` for a real AI SDK `streamText` call to Claude;
   surface its `fullStream` as our event stream.
2. Make `processor.js` consume that stream and dispatch tools from the registry.
3. Turn the existing `runTurn` into the §2 loop with the tri-state result and a
   `maxSteps` cap.
4. Add the schema-validation-error-as-tool-result trick + an `invalid` tool (§5).
5. Add `read`/`write`/`shell` tools that `ctx.ask` before side effects (§6).
6. Add a simple REPL.
7. *(Later)* compaction, subagents via a `task` tool, persistence.

**The five highest-leverage ideas to carry over:**
1. Let the AI SDK own provider/streaming/tool-calling.
2. Tool = `{ description, schema, execute(args, ctx) }`; **validation/tool errors
   become conversation turns, not crashes**.
3. A normalized event stream between the model call and the loop.
4. Rule-based allow/ask/deny permissions; tools self-declare needs via `ctx.ask`.
5. Loop safety: `maxSteps`, doom-loop detection, output truncation, context
   compaction.
