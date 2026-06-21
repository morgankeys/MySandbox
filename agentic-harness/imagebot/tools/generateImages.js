import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

// generate_images — the batch generator. Calls Google Imagen once per prompt
// and writes each result to the output directory.

function slug(s) {
  return (
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image"
  );
}

export const generateImagesTool = {
  name: "generate_images",
  description:
    "Generate one image per prompt with Google Imagen and save them to disk. " +
    "Returns the saved file path (or an error) for each prompt.",
  input_schema: {
    type: "object",
    properties: {
      images: {
        type: "array",
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            prompt: { type: "string" },
          },
          required: ["label", "prompt"],
          additionalProperties: false,
        },
      },
      aspect_ratio: {
        type: "string",
        enum: ["1:1", "3:4", "4:3", "9:16", "16:9"],
        description: "Aspect ratio for all images (default 1:1)",
      },
    },
    required: ["images"],
    additionalProperties: false,
  },

  async run(input, ctx) {
    const { google, config, log } = ctx;
    await mkdir(config.outputDir, { recursive: true });
    const aspectRatio = input.aspect_ratio || "1:1";
    const results = [];

    for (let i = 0; i < input.images.length; i++) {
      const img = input.images[i];
      log.info(`generating ${i + 1}/${input.images.length}: ${img.label}`);
      try {
        const response = await google.models.generateImages({
          model: config.imagenModel,
          prompt: img.prompt,
          config: { numberOfImages: 1, aspectRatio },
        });

        const bytes = response.generatedImages?.[0]?.image?.imageBytes;
        if (!bytes) {
          // Imagen returns nothing when the prompt is filtered.
          results.push({ label: img.label, error: "No image returned (possibly filtered)" });
          continue;
        }

        const filename = `${slug(img.label)}-${Date.now()}-${i}.png`;
        const path = join(config.outputDir, filename);
        await writeFile(path, Buffer.from(bytes, "base64"));
        results.push({ label: img.label, path, prompt: img.prompt });
      } catch (err) {
        results.push({ label: img.label, error: err.message });
      }
    }

    return JSON.stringify(results);
  },
};
