// Agentic harness — entry point.
//
// Sketches the core loop of an agent runtime (inspired by OpenCode):
//
//   1. Add the user's message to the session.
//   2. Ask the provider for a completion, handing it the tool schemas.
//   3. If the model asked to call tools, run them and feed results back.
//   4. Repeat until the model returns a plain text answer (no tool calls).
//
// Everything underneath (provider, tools) is stubbed so the structure is
// visible and runnable before a real model is wired in.

import { createProvider } from "./provider.js";
import { createRegistry, exampleTools } from "./tools.js";

const MAX_STEPS = 10;

async function runTurn({ provider, registry, session, userInput }) {
  session.push({ role: "user", content: userInput });

  for (let step = 0; step < MAX_STEPS; step++) {
    const { text, toolCalls } = await provider.complete({
      messages: session,
      tools: registry.schemas(),
    });

    if (!toolCalls || toolCalls.length === 0) {
      session.push({ role: "assistant", content: text });
      return text;
    }

    // Run each requested tool and feed the results back into the session.
    for (const call of toolCalls) {
      const result = await registry.run(call.name, call.input);
      session.push({
        role: "tool",
        content: JSON.stringify({ name: call.name, result }),
      });
    }
  }

  throw new Error(`Turn exceeded ${MAX_STEPS} steps`);
}

async function main() {
  const provider = createProvider({ model: "stub" });
  const registry = createRegistry();
  exampleTools.forEach((t) => registry.register(t));

  const session = [];
  const reply = await runTurn({
    provider,
    registry,
    session,
    userInput: "Hello, harness!",
  });

  console.log("Assistant:", reply);
  console.log(`Registered tools: ${registry.schemas().map((t) => t.name).join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
