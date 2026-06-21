// Tool registry.
//
// Tools are the agent's hands. Each tool has a name, a description (the model
// uses this to decide when to call it), a parameter schema, and a `run`
// function. The harness exposes the schemas to the provider and dispatches
// tool calls back here.

export function createRegistry() {
  const tools = new Map();

  return {
    register(tool) {
      tools.set(tool.name, tool);
      return this;
    },

    // Schemas to hand to the provider/model.
    schemas() {
      return [...tools.values()].map(({ name, description, parameters }) => ({
        name,
        description,
        parameters,
      }));
    },

    async run(name, input) {
      const tool = tools.get(name);
      if (!tool) throw new Error(`Unknown tool: ${name}`);
      return tool.run(input);
    },
  };
}

// A couple of trivial example tools to make the registry concrete.
export const exampleTools = [
  {
    name: "echo",
    description: "Echo back the given text.",
    parameters: { type: "object", properties: { text: { type: "string" } } },
    run: ({ text }) => text,
  },
  {
    name: "now",
    description: "Return the current ISO timestamp.",
    parameters: { type: "object", properties: {} },
    run: () => new Date().toISOString(),
  },
];
