# AGENTS.md

This document provides guidelines for AI agents working in this repository.

## Repository Overview

This is a monorepo using Turborepo, pnpm workspace, Next.js 16, TypeScript 5, and React 19. Contains:

- `apps/web` - Next.js frontend application
- `apps/ai` - Mastra AI agent framework application
- `apps/backend` - Hono backend server
- `packages/ui` - Shared UI component library
- `packages/eslint-config` - Shared ESLint configuration
- `packages/typescript-config` - Shared TypeScript configuration
- `transfer` - Legacy/experimental application (Next.js)

## Build, Lint, and Test Commands

### Root Level Commands (run from repository root)

```bash
pnpm build          # Build all workspaces (turbo build)
pnpm dev            # Run dev servers for all apps (turbo dev)
pnpm lint           # Lint all workspaces (turbo lint)
pnpm format         # Format all files with Prettier
```

### Application-Specific Commands

```bash
# Web app (Next.js, port 1111)
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web lint
pnpm --filter web lint:fix
pnpm --filter web typecheck

# AI app (Mastra, Node >=22.13.0)
pnpm --filter ai dev
pnpm --filter ai build

# Backend (Hono)
pnpm --filter backend dev

# UI package
pnpm --filter @workspace/ui lint
```

### Running a Single Test

Tests use various frameworks depending on the app. Check individual `package.json` files:

- AI app: `pnpm --filter ai test` (no tests configured yet)
- Add Jest/Vitest configurations as needed per package

## Code Style Guidelines

### TypeScript Configuration

- Target: ES2022
- Module: NodeNext
- ModuleResolution: NodeNext
- Strict mode: enabled
- noUncheckedIndexedAccess: enabled
- jsx: react-jsx (for library) / react (for Next.js apps)

### Import Conventions

```typescript
// 1. React (always import React for hooks)
import * as React from "react";

// 2. External dependencies (alphabetical)
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 3. Radix UI primitives
import { Slot } from "@radix-ui/react-slot";

// 4. Internal imports (use path aliases)
import { Button } from "@workspace/ui/components/button";
import { cn } from "@/lib/utils";

// 5. Named exports for utilities
export function helperFunction() {}
```

### Path Aliases

- Web app: `@/*` maps to root, `@workspace/ui/*` to packages/ui
- UI package: `@workspace/ui/*` maps to ./src

### Component Patterns

- Use class-variance-authority (CVA) for variant props
- Use Radix UI primitives for accessible components
- Export both component and variants: `export { Button, buttonVariants }`
- Default to functional components with typed props
- Use `data-slot` attributes for component targeting

### ClassName Handling

Use the `cn()` utility for conditional class merging:

```typescript
import { cn } from "@/lib/utils"

function Component({ className, ...props }) {
  return <div className={cn("base-class", condition && "conditional", className)} {...props} />
}
```

### Naming Conventions

- Components: PascalCase (e.g., `Button`, `DashboardHeader`)
- Hooks: usePrefix (e.g., `useMobile`, `useAuth`)
- Utilities/Non-components: camelCase
- Types: PascalCase with descriptive names
- Constants: SCREAMING_SNAKE_CASE for configs, camelCase for internal

### React Server Components vs Client Components

- Default to Server Components in Next.js
- Add `"use client"` directive at the top of files needing client-side interactivity
- Keep client-side logic in separate components from server logic

### Error Handling

- Next.js/React: Use error boundaries and proper error states
- Hono backend: Return proper Response objects via context
- AI/Mastra: Use try/catch with proper logging
- Always handle async operations with appropriate error states

### Styling

- Tailwind CSS v4
- Use tailwind-merge for class conflicts
- Use tw-animate-css for animations
- Follow existing color patterns (destructive, primary, secondary, etc.)

### File Structure

```
apps/web/
├── app/                    # Next.js App Router pages
├── components/             # App-specific components
│   ├── ui/                 # Component overrides
│   └── providers.tsx       # Context providers
├── hooks/                  # Custom hooks
└── lib/                    # Utilities

packages/ui/src/
├── components/             # Shared components
├── hooks/                  # Shared hooks
└── lib/                    # Shared utilities
```

### ESLint and Prettier

- ESLint config extends `@workspace/eslint-config` and typescript-eslint
- Prettier configured with default settings
- Run `pnpm format` to auto-format
- Max warnings: 0 for strict linting

### Dependency Management

- Use `pnpm add <package>` for dependencies
- Use `pnpm -w add -D <package>` for dev dependencies
- Workspace protocols: `workspace:*` for internal packages
- Pin exact versions in package.json for consistency

### General Guidelines

- No comments unless explaining complex logic
- Prefer explicit types over type inference
- Use Zod for runtime validation
- Keep functions small and focused
- Avoid unnecessary abstraction
- Follow existing patterns in each workspace
