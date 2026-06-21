# Image Batch Bot

A small chat bot, built on the agentic-harness patterns in [`../RESEARCH.md`](../RESEARCH.md),
that turns **one creative brief into a batch of image variations — with quality control**.

You type a brief; an agent rewrites it into N distinct prompts, generates an image for each,
visually inspects every result against its prompt, and regenerates the ones that fail.

## How it works

The agent is a **manual Claude tool-use loop** (RESEARCH.md §2/§3). Claude orchestrates;
three registered tools (RESEARCH.md §5) do the work:

| Tool | What it does | Powered by |
|---|---|---|
| `expand_prompts` | Rewrites one brief into N distinct, detailed prompts (and refines a single prompt from QC feedback) | Claude, structured output |
| `generate_images` | Renders one image per prompt, saves PNGs to `output/` | Google Imagen |
| `quality_check` | Looks at each image, scores it 0-10 vs its prompt, returns pass/fail + feedback | Claude vision |

Loop: `expand_prompts → generate_images → quality_check → (refine + regenerate failures) → summary`.
Bounded by `MAX_STEPS`; tool errors come back as recoverable conversation turns rather than crashes.

```
        ┌─────────── Claude (orchestrator loop) ───────────┐
 brief →│  expand_prompts → generate_images → quality_check │→ summary + saved PNGs
        │            ↑__________ regenerate failures ________│
        └──────────────────────────────────────────────────┘
```

## Setup

Real APIs only — set both keys (the bot exits early if either is missing):

```bash
export ANTHROPIC_API_KEY=sk-ant-...     # Claude: prompt rewriting + vision QC
export GEMINI_API_KEY=...               # Google Imagen: image generation
```

Optional overrides:

| Env var | Default | Purpose |
|---|---|---|
| `ANTHROPIC_MODEL` | `claude-opus-4-8` | The reasoning + QC model |
| `IMAGEN_MODEL` | `imagen-4.0-generate-001` | The image model |
| `MAX_STEPS` | `16` | Agent-loop safety cap |

## Run

```bash
cd agentic-harness
npm install
npm run imagebot
```

Then chat:

```
you> make 4 variations of a cozy coffee-shop logo, warm and minimal
```

Generated images land in `imagebot/output/` (gitignored).

## Notes
- Uses each provider's **official** SDK: `@anthropic-ai/sdk` and `@google/genai` — OpenCode is a
  reference for the *harness shape*, not a dependency.
- `IMAGEN_MODEL` is overridable because the exact current Imagen revision changes over time.
- This is a sandbox experiment: in-memory state, console output, no persistence.
