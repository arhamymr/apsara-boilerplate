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

## Global Styles

Global styles are centralized in the UI package for consistency across all apps:

```
packages/ui/src/styles/globals.css
```

This file contains:

- CSS custom properties (design tokens) for colors, radius, typography
- Light and dark theme color schemes
- Tailwind CSS v4 theme configuration
- Base layer styles for typography and form elements

Import in your app:

```tsx
// apps/web/app/layout.tsx
import "@workspace/ui/styles/globals.css";
```

The globals.css automatically scans all components for Tailwind classes using `@source` directives.

See [docs/STYLES.md](./docs/STYLES.md) for detailed styling guide.

## Deployment

### Docker Deployment (Zero Downtime)

This project includes a complete Docker deployment setup for production VPS deployments.

#### Architecture

```
Cloudflare DNS → VPS :80 → Web Container (:3000) [Public]
                                ├──→ Backend (:2222) [Internal]
                                ├──→ AI (:3333) [Internal]
                                └──→ PostgreSQL (:5432) [Internal]
```

#### Prerequisites

- Docker Engine 24+
- Docker Compose v2
- 2GB+ RAM available
- 10GB+ disk space

#### Quick Deploy

```bash
# 1. Clone and navigate to the project
git clone <your-repo>
cd apsara-devkit

# 2. Create environment file
cp .env.production .env.production
# Edit .env.production with your values

# 3. Make deploy script executable
chmod +x scripts/deploy.sh

# 4. Deploy (zero-downtime)
./scripts/deploy.sh production
```

#### Zero-Downtime Deployment Strategy

The deploy script uses a zero-downtime strategy:

1. **Build Phase**: Build new Docker images while services continue running
2. **Deploy Phase**: Recreate containers with new images (minimal downtime during restart)
3. **Cleanup Phase**: Remove old images after successful deployment

This ensures your application stays available during most of the deployment process.

#### Required Environment Variables

| Variable              | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | Your production domain (e.g., `https://yourdomain.com`) |
| `DB_PASSWORD`         | PostgreSQL password                                     |
| `BETTER_AUTH_SECRET`  | Auth encryption key (`openssl rand -base64 32`)         |
| `DATABASE_URL`        | PostgreSQL connection string                            |

See `.env.production` for the complete template.

#### Manual Docker Commands

```bash
# Build all images
docker compose build --no-cache

# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Full cleanup (removes all containers, networks, and images)
docker compose down --remove-orphans
docker system prune -a -f
```

#### Cloudflare DNS Setup

Create an A record pointing to your VPS IP:

| Type | Name | Value       |
| ---- | ---- | ----------- |
| A    | @    | YOUR_VPS_IP |

### Build for Production

```bash
pnpm build
```

### Docker (Legacy)

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
