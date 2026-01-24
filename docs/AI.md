# AI Application Documentation

The AI application is built with [Mastra](https://mastra.ai), an AI agent framework for building, deploying, and managing AI agents in production.

## Overview

Mastra enables you to create intelligent agents with:

- **Agents**: LLM-powered assistants with tools and memory
- **Workflows**: Multi-step AI pipelines with step-by-step execution
- **Tools**: Custom functions agents can call
- **Scorers**: Evaluation metrics for agent responses
- **Observability**: Built-in tracing and monitoring

## Project Structure

```
apps/ai/
├── src/
│   └── mastra/
│       ├── index.ts           # Mastra configuration and entry point
│       ├── agents/
│       │   └── weather-agent.ts
│       ├── workflows/
│       │   └── weather-workflow.ts
│       ├── tools/
│       │   └── weather-tool.ts
│       └── scorers/
│           └── weather-scorer.ts
├── package.json
└── .env.example
```

## Core Components

### Agents

Agents are LLM-powered assistants that can use tools, maintain memory, and are evaluated by scorers.

**Example: Weather Agent** (`src/mastra/agents/weather-agent.ts`)

```typescript
export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: 'You are a helpful weather assistant...',
  model: 'google/gemini-2.5-pro',
  tools: { weatherTool },
  scorers: {
    toolCallAppropriateness: { ... },
    completeness: { ... },
    translation: { ... },
  },
  memory: new Memory({ ... }),
});
```

### Workflows

Workflows chain multiple steps together for complex multi-step AI tasks.

**Example: Weather Workflow** (`src/mastra/workflows/weather-workflow.ts`)

```typescript
const weatherWorkflow = createWorkflow({
  id: "weather-workflow",
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ activities: z.string() }),
})
  .then(fetchWeather)
  .then(planActivities);

weatherWorkflow.commit();
```

### Tools

Tools are functions agents can call to interact with external systems.

**Example: Weather Tool** (`src/mastra/tools/weather-tool.ts`)

```typescript
export const weatherTool = createTool({
  id: 'get-weather',
  description: 'Get current weather for a location',
  inputSchema: z.object({ location: z.string() }),
  outputSchema: z.object({ ... }),
  execute: async ({ context }) => { ... },
});
```

### Scorers

Scorers evaluate agent responses for quality, completeness, and other metrics.

**Available Scorer Types:**

| Scorer                          | Purpose                               |
| ------------------------------- | ------------------------------------- |
| `toolCallAppropriatenessScorer` | Validates correct tool usage          |
| `completenessScorer`            | Measures response completeness        |
| `translationScorer`             | Custom LLM-judged translation quality |

## Configuration

The main Mastra configuration in `src/mastra/index.ts`:

```typescript
export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  scorers: { ... },
  storage: new LibSQLStore({ url: ':memory:' }),
  logger: new PinoLogger({ name: 'Mastra', level: 'info' }),
  observability: {
    default: { enabled: true },
  },
  server: { port: 3333 },
});
```

## Available Models

The current setup uses:

- **Primary**: `google/gemini-2.5-pro`
- **Evaluator**: `google/gemini-2.5-pro` (for custom scorers)

To change the model:

```typescript
model: 'openai/gpt-4o',  // or other supported models
```

## Commands

### Development

```bash
pnpm --filter ai dev
```

Starts the Mastra development server with hot reload at `http://localhost:3333`.

### Production Build

```bash
pnpm --filter ai build
```

Builds the AI application for production.

### Start Production Server

```bash
pnpm --filter ai start
```

Starts the production server on port 3333.

## API Endpoints

| Endpoint                              | Description              |
| ------------------------------------- | ------------------------ |
| `http://localhost:3333`               | Mastra health check      |
| `http://localhost:3333/api/agents`    | List available agents    |
| `http://localhost:3333/api/workflows` | List available workflows |

## Docker Deployment

The AI app runs in an isolated container on port 3333 (internal).

### Dockerfile Overview

- **Base Image**: Bun (Alpine)
- **Build Strategy**: Multi-stage with Turborepo prune
- **Security**: Runs as non-root user `mastraai` (uid 1001)
- **Exposed Port**: 3333

### Environment Variables

| Variable         | Description           | Required |
| ---------------- | --------------------- | -------- |
| `GOOGLE_API_KEY` | Google Gemini API key | Yes      |

### Docker Compose Service

```yaml
ai:
  build:
    context: .
    dockerfile: apps/ai/Dockerfile
```

## Observability

Mastra includes built-in observability features:

```typescript
observability: {
  default: { enabled: true },  // DefaultExporter for AI tracing
}
```

This enables:

- Request/response logging
- Trace tracking
- Performance metrics

## Memory

Agents can maintain conversational memory:

```typescript
memory: new Memory({
  storage: new LibSQLStore({
    url: 'file:../mastra.db',
  }),
}),
```

## Extending the Application

### Adding a New Agent

1. Create `src/mastra/agents/my-agent.ts`:

```typescript
import { Agent } from '@mastra/core/agent';

export const myAgent = new Agent({
  name: 'My Agent',
  instructions: 'You are...',
  model: 'google/gemini-2.5-pro',
  tools: { ... },
});
```

2. Register in `src/mastra/index.ts`:

```typescript
agents: { weatherAgent, myAgent },
```

### Adding a New Tool

1. Create `src/mastra/tools/my-tool.ts`:

```typescript
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const myTool = createTool({
  id: 'my-tool',
  description: '...',
  inputSchema: z.object({ ... }),
  outputSchema: z.object({ ... }),
  execute: async ({ context }) => { ... },
});
```

2. Add to agent's tools:

```typescript
tools: { weatherTool, myTool },
```

### Adding a New Workflow

1. Create `src/mastra/workflows/my-workflow.ts`:

```typescript
import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

const step1 = createStep({ ... });
const step2 = createStep({ ... });

export const myWorkflow = createWorkflow({
  id: 'my-workflow',
  inputSchema: z.object({ ... }),
  outputSchema: z.object({ ... }),
}).then(step1).then(step2);

myWorkflow.commit();
```

## Troubleshooting

### Agent Not Responding

1. Check logs: `docker compose logs -f ai`
2. Verify API keys in environment
3. Ensure port 3333 is not blocked

### Workflow Execution Failed

1. Check step error messages in logs
2. Verify input data matches schema
3. Check agent availability in workflow steps

### Memory Not Persisting

Memory uses file-based storage. Ensure the `mastra.db` path is writable:

```typescript
storage: new LibSQLStore({
  url: 'file:../mastra.db',  // Path relative to .mastra/output
}),
```

## Related Documentation

- [Mastra Documentation](https://mastra.ai/docs)
- [Environment Variables](./ENVIRONMENT.md)
- [Deployment Overview](../README.md#deployment)
