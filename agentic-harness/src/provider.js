// Provider abstraction.
//
// The agent loop should never call a model API directly — it talks to a
// provider that exposes a single `complete()` method. That keeps the loop
// independent of which model/SDK is behind it (Anthropic, local, etc.).
//
// This stub just echoes back a fake "done" response so the loop runs
// end-to-end before a real model is wired in.

export function createProvider({ model = "stub" } = {}) {
  return {
    model,

    // messages: [{ role, content }]
    // tools:    [{ name, description, parameters }]
    // returns:  { text, toolCalls: [{ name, input }] }
    async complete({ messages, tools }) {
      const last = messages[messages.length - 1];
      // A real provider would send messages + tools to the model here.
      return {
        text: `(${model}) stub reply to: ${last?.content ?? ""}`,
        toolCalls: [],
      };
    },
  };
}
