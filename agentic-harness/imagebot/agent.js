// The agent loop — a manual Claude tool-use loop (see ../RESEARCH.md §2/§3).
//
// Claude orchestrates the workflow by calling the registered tools; we run them
// and feed the results back until it stops calling tools and returns a summary.

const SYSTEM_PROMPT = `You are an image batch-creation agent. You turn ONE creative brief into a batch of
polished image variations, with quality control.

Workflow:
1. Call expand_prompts to fan the user's brief into N distinct, detailed prompts (one per variation).
   If the user doesn't give a number, default to 4.
2. Call generate_images with those prompts to render them.
3. Call quality_check to evaluate every rendered image against its own prompt.
4. For any image that did NOT pass, refine its prompt — call expand_prompts again with count 1 and the
   QC feedback in the guidance field — then regenerate and re-check it. Do AT MOST one regeneration round per image.
5. Finish with a concise plain-text summary: for each variation give the label, the saved file path, and
   its final QC score; clearly flag any that still failed.

Be efficient: batch tool calls where you can, don't re-run work that already passed, and don't ask the
user clarifying questions mid-run — make reasonable choices and note them in the final summary.`;

function textOf(response) {
  return response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
}

export async function runImageBatch({ userRequest, ctx, registry, config }) {
  const { anthropic, log } = ctx;
  const tools = registry.toolSpecs();
  const messages = [{ role: "user", content: userRequest }];

  for (let step = 0; step < config.maxSteps; step++) {
    const response = await anthropic.messages.create({
      model: config.model,
      max_tokens: 8000,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      tools,
      messages,
    });

    const visible = textOf(response);
    if (visible) log.assistant(visible);

    // No tool calls → the model is done; its text is the final summary.
    if (response.stop_reason !== "tool_use") {
      return visible || "(done — no summary text returned)";
    }

    // Echo the full assistant turn back (preserves tool_use + thinking blocks).
    messages.push({ role: "assistant", content: response.content });

    // Run every tool the model asked for; collect all results into one user turn.
    const toolResults = [];
    for (const block of response.content) {
      if (block.type !== "tool_use") continue;
      try {
        const result = await registry.run(block.name, block.input, ctx);
        toolResults.push({ type: "tool_result", tool_use_id: block.id, content: result });
      } catch (err) {
        // Errors become a recoverable conversation turn, not a crash.
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: `Error running ${block.name}: ${err.message}`,
          is_error: true,
        });
      }
    }
    messages.push({ role: "user", content: toolResults });
  }

  throw new Error(`Reached max steps (${config.maxSteps}) without finishing.`);
}
