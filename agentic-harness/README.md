# About this branch
This README is for an experiment branch. Branches are for trying things out without messing up the clean `main` sandbox.

# About this sandbox-folder
This folder is for exploring an **agentic coding harness**, borrowing ideas from [OpenCode](https://github.com/opencode-ai/opencode) and similar open-source agent runtimes.

The goal is to understand the moving parts of an agent loop by building a small one:

- **Agent loop** — read input, ask the model, run tools, feed results back, repeat until done.
- **Provider abstraction** — keep the LLM call behind one interface so providers/models can be swapped.
- **Tool registry** — register tools (read file, run command, etc.) the agent can call.
- **Session/state** — track the running message history for a turn.

This is a scaffold, not a finished app. `src/index.js` sketches the loop with stubbed pieces so the structure is visible before wiring in a real model.

## Getting started
```bash
cd agentic-harness
npm install
npm start
```

## Layout
```
agentic-harness/
  src/
    index.js      # entry point + agent loop skeleton
    provider.js   # LLM provider abstraction (stubbed)
    tools.js      # tool registry
  package.json
```

## Next steps / ideas
- Wire `provider.js` to a real model API (e.g. Claude via the Anthropic SDK).
- Flesh out tools with real filesystem / shell access (mind the sandboxing).
- Add a simple REPL so you can chat with the harness from the terminal.
