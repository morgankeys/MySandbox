// Tool registry — the harness's tool contract (see ../RESEARCH.md §5).
//
// A tool is { name, description, input_schema, run(input, ctx) }:
//   - name/description/input_schema are handed to Claude as a tool definition
//   - run() is dispatched by the agent loop when Claude calls the tool
//
// run() returns a string that becomes the tool_result fed back to the model.
// Thrown errors are turned into is_error tool_results by the loop, so a bad
// tool call becomes a conversation turn the model can recover from rather than
// a crash.

export function createRegistry(tools) {
  const byName = new Map(tools.map((t) => [t.name, t]));

  return {
    // The tool definitions to send to Claude.
    toolSpecs() {
      return tools.map(({ name, description, input_schema }) => ({
        name,
        description,
        input_schema,
      }));
    },

    async run(name, input, ctx) {
      const tool = byName.get(name);
      if (!tool) throw new Error(`Unknown tool: ${name}`);
      return tool.run(input, ctx);
    },
  };
}
