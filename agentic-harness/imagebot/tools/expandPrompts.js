// expand_prompts — the "smart enough to rewrite one prompt into variations"
// tool. It makes a focused, structured Claude call (a small sub-agent) that
// turns one creative brief into N distinct, production-ready image prompts.

const SYSTEM = `You are a senior art director and prompt engineer for text-to-image models.
Given one creative brief, produce DISTINCT variations that each explore a meaningfully different
direction (composition, mood, palette, style, lens, era, materials, etc.) while staying true to the
brief. Each prompt must be vivid, concrete, and self-contained (a generator sees only that one prompt):
name the subject, setting, style, lighting, color, and framing. Avoid near-duplicates. Keep each prompt
under ~60 words.`;

const schema = {
  type: "object",
  properties: {
    variations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            description: "Short kebab-case-ish handle for this variation, e.g. 'warm-minimal'",
          },
          prompt: { type: "string", description: "The full image-generation prompt" },
        },
        required: ["label", "prompt"],
        additionalProperties: false,
      },
    },
  },
  required: ["variations"],
  additionalProperties: false,
};

export const expandPromptsTool = {
  name: "expand_prompts",
  description:
    "Rewrite a single creative brief into N distinct, detailed image-generation prompts. " +
    "Use this first to fan one idea out into variations, and again to refine a specific prompt " +
    "when quality control reports problems (pass the QC feedback in `guidance`).",
  input_schema: {
    type: "object",
    properties: {
      base_prompt: { type: "string", description: "The creative brief / idea to expand" },
      count: { type: "integer", description: "How many variations to produce" },
      guidance: {
        type: "string",
        description:
          "Optional extra direction: dimensions to vary, a style to lean into, or QC feedback to fix.",
      },
    },
    required: ["base_prompt", "count"],
    additionalProperties: false,
  },

  async run(input, ctx) {
    const { anthropic, config, log } = ctx;
    log.info(`expanding brief into ${input.count} variation prompt(s)…`);

    const response = await anthropic.messages.create({
      model: config.model,
      max_tokens: 4000,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content:
            `Brief: ${input.base_prompt}\n` +
            `Number of variations: ${input.count}\n` +
            (input.guidance ? `Extra guidance: ${input.guidance}\n` : ""),
        },
      ],
      output_config: { format: { type: "json_schema", schema } },
    });

    // Structured outputs guarantee the first text block is valid JSON.
    const text = response.content.find((b) => b.type === "text")?.text ?? "{}";
    const data = JSON.parse(text);
    return JSON.stringify(data.variations);
  },
};
