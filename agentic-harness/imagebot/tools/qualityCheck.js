import { readFile } from "node:fs/promises";

// quality_check — vision-based QC. For each generated image, Claude looks at
// the picture, compares it to its intended prompt, and returns a structured
// verdict the agent can act on (regenerate the failures).

const SYSTEM = `You are a meticulous art director performing quality control on AI-generated images.
Judge how faithfully the image realizes its intended prompt: subject accuracy, composition, style match,
and technical quality (no warped anatomy, garbled text, or obvious artifacts). Be honest and specific.`;

const schema = {
  type: "object",
  properties: {
    score: { type: "integer", description: "0-10 fidelity/quality score" },
    pass: { type: "boolean", description: "true only if score >= 7 and no major artifacts" },
    feedback: { type: "string", description: "Specific, actionable notes (what's wrong / how to improve)" },
  },
  required: ["score", "pass", "feedback"],
  additionalProperties: false,
};

export const qualityCheckTool = {
  name: "quality_check",
  description:
    "Visually inspect generated images against their prompts. Returns a score (0-10), a pass/fail, " +
    "and actionable feedback for each item. Use the feedback to refine and regenerate any failures.",
  input_schema: {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            path: { type: "string", description: "Path to the generated image file" },
            prompt: { type: "string", description: "The prompt the image was meant to fulfill" },
          },
          required: ["label", "path", "prompt"],
          additionalProperties: false,
        },
      },
    },
    required: ["items"],
    additionalProperties: false,
  },

  async run(input, ctx) {
    const { anthropic, config, log } = ctx;
    const results = [];

    for (let i = 0; i < input.items.length; i++) {
      const item = input.items[i];
      log.info(`QC ${i + 1}/${input.items.length}: ${item.label}`);
      try {
        const b64 = (await readFile(item.path)).toString("base64");
        const response = await anthropic.messages.create({
          model: config.model,
          max_tokens: 1500,
          system: SYSTEM,
          messages: [
            {
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: "image/png", data: b64 } },
                {
                  type: "text",
                  text:
                    `Intended prompt:\n${item.prompt}\n\n` +
                    `Score 0-10 how well the image fulfills this prompt. ` +
                    `pass = true only if score >= 7 and there are no major artifacts.`,
                },
              ],
            },
          ],
          output_config: { format: { type: "json_schema", schema } },
        });

        const text = response.content.find((b) => b.type === "text")?.text ?? "{}";
        results.push({ label: item.label, path: item.path, ...JSON.parse(text) });
      } catch (err) {
        results.push({ label: item.label, path: item.path, error: err.message });
      }
    }

    return JSON.stringify(results);
  },
};
