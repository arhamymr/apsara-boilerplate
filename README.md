# Apsara DevKit

A comprehensive modern web application template built with Next.js 16, React 19, and TypeScript. This monorepo includes a production-ready frontend, backend API, AI agent integration, and a shared UI component library.

## Features

- **Next.js 16** - App Router, Server Components, Server Actions
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Full type safety with strict mode
- **Turborepo** - High-performance monorepo build system
- **Shared UI Library** - 50+ accessible components built with Radix UI
- **Theme System** - Dark/light mode with next-themes
- **Backend API** - Hono server for fast API endpoints
- **AI Integration** - Mastra AI agent framework
- **Authentication** - Complete auth flow with login/register
- **Tailwind CSS v4** - Utility-first styling

## Project Structure

```
apsara-devkit/
├── apps/
│   ├── web/          # Next.js frontend (port 1111)
│   ├── backend/      # Hono API server
│   └── ai/           # Mastra AI agents
├── packages/
│   ├── ui/           # Shared UI component library
│   ├── eslint-config/# ESLint configuration
│   └── typescript-config/# TypeScript configuration
├── turbo.json        # Turborepo configuration
└── pnpm-workspace.yaml
```

## Quick Start

### Prerequisites

- Node.js 22.13.0 or higher
- pnpm 9.x

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development servers
pnpm dev
```

## Available Commands

### Root Level

```bash
pnpm build          # Build all workspaces
pnpm dev            # Run dev servers for all apps
pnpm lint           # Lint all workspaces
pnpm format         # Format files with Prettier
```

### Web App (Next.js)

```bash
pnpm --filter web dev      # Start dev server (port 1111)
pnpm --filter web build    # Build for production
pnpm --filter web lint     # Run ESLint
pnpm --filter web typecheck # Run TypeScript check
```

### Backend (Hono)

```bash
pnpm --filter backend dev  # Start API server
```

### AI App (Mastra)

```bash
pnpm --filter ai dev       # Start AI agent server
```

### UI Package

```bash
pnpm --filter @workspace/ui lint
```

## Adding Components

To add UI components to the shared library:

```bash
# From the web app directory
pnpm dlx shadcn@latest add button -c apps/web
```

This adds the component to `packages/ui/src/components`.

## Using Components

Import components from the UI package:

```tsx
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card } from "@workspace/ui/components/card";
```

## Theme Configuration

The theme is configured in `apps/web/app/layout.tsx`:

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  {children}
</ThemeProvider>
```

Available themes: `light`, `dark`, `system`.

## Deployment

### Build for Production

```bash
pnpm build
```

### Docker (Coming Soon)

Docker configurations will be added for containerized deployments.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI primitives
- **State**: React hooks + TanStack Query
- **Forms**: React Hook Form + Zod
- **Build**: Turborepo + pnpm
- **Backend**: Hono
- **AI**: Mastra

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

For issues and feature requests, please open a GitHub issue.
