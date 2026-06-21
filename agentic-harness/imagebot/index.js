// Image Batch Bot — entry point / chat REPL.
//
// Stack: Claude (@anthropic-ai/sdk) for prompt-rewriting + vision QC, and
// Google Imagen (@google/genai) for image generation. Real APIs only — it
// exits early if the required keys aren't set.

import { createInterface } from "node:readline";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";

import { loadConfig } from "./config.js";
import { createRegistry } from "./registry.js";
import { runImageBatch } from "./agent.js";
import { expandPromptsTool } from "./tools/expandPrompts.js";
import { generateImagesTool } from "./tools/generateImages.js";
import { qualityCheckTool } from "./tools/qualityCheck.js";

function main() {
  const config = loadConfig();

  if (!config.anthropicKey) {
    console.error("Missing ANTHROPIC_API_KEY (Claude — prompt rewriting + QC).");
    process.exit(1);
  }
  if (!config.googleKey) {
    console.error("Missing GEMINI_API_KEY (Google Imagen — image generation).");
    process.exit(1);
  }

  const ctx = {
    config,
    anthropic: new Anthropic({ apiKey: config.anthropicKey }),
    google: new GoogleGenAI({ apiKey: config.googleKey }),
    log: {
      assistant: (t) => console.log(`\nbot> ${t}`),
      info: (t) => console.log(`  · ${t}`),
    },
  };

  const registry = createRegistry([expandPromptsTool, generateImagesTool, qualityCheckTool]);

  console.log("Image Batch Bot");
  console.log(`  brain:  ${config.model}`);
  console.log(`  images: ${config.imagenModel}  →  ${config.outputDir}`);
  console.log("Describe a batch, e.g. \"make 4 variations of a cozy coffee-shop logo\". Ctrl+C to exit.");

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  rl.setPrompt("\nyou> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const text = line.trim();
    if (!text) {
      rl.prompt();
      return;
    }
    rl.pause();
    try {
      const summary = await runImageBatch({ userRequest: text, ctx, registry, config });
      console.log(`\n${summary}`);
    } catch (err) {
      console.error(`\nError: ${err.message}`);
    }
    rl.resume();
    rl.prompt();
  });

  rl.on("close", () => {
    console.log("\nbye");
    process.exit(0);
  });
}

main();
