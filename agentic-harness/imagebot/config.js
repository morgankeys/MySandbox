import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Central config. "Real APIs only" — the caller checks the keys are present
// before starting. Models and limits are env-overridable so this stays a
// flexible sandbox.
export function loadConfig() {
  return {
    anthropicKey: process.env.ANTHROPIC_API_KEY,
    // Google's official SDK reads GEMINI_API_KEY / GOOGLE_API_KEY; we also
    // accept the Vercel-style name in case that's what's already set.
    googleKey:
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY,

    // Claude does the reasoning (prompt rewriting) and the vision QC.
    // Default to the latest Opus; override with ANTHROPIC_MODEL.
    model: process.env.ANTHROPIC_MODEL || "claude-opus-4-8",

    // Google Imagen generates the pictures. Override with IMAGEN_MODEL if a
    // newer/older Imagen revision is preferred.
    imagenModel: process.env.IMAGEN_MODEL || "imagen-4.0-generate-001",

    // Safety rail for the agent loop (see RESEARCH.md §2 / §9).
    maxSteps: Number(process.env.MAX_STEPS || 16),

    outputDir: join(__dirname, "output"),
  };
}
