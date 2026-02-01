# Apsara Boilerplate

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
├── pnpm-workspace.yaml
└── AGENTS.md         # AI agent development guidelines
```

## Quick Start

### Prerequisites

- Node.js 20 or higher
- pnpm 10.x

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
pnpm build          # Build all workspaces (turbo build)
pnpm dev            # Run dev servers for all apps (turbo dev)
pnpm lint           # Lint all workspaces (turbo lint)
pnpm format         # Format all files with Prettier
```

### Web App (Next.js)

```bash
pnpm --filter web dev      # Start dev server (port 1111)
pnpm --filter web build    # Build for production
pnpm --filter web lint     # Run ESLint
pnpm --filter web lint:fix # Fix ESLint issues
pnpm --filter web typecheck # Run TypeScript check
```

### Backend (Hono)

```bash
pnpm --filter backend dev  # Start API server
pnpm --filter backend build # Build for production
pnpm --filter backend start # Start production server
```

### AI App (Mastra)

```bash
pnpm --filter ai dev       # Start AI agent server
pnpm --filter ai build     # Build for production
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

This project supports Docker-based deployment for production environments. All applications run in isolated containers with internal networking.

### Architecture

```
Internet → Cloudflare → VPS :80 → Nginx (optional) → Docker Web (:3000) [Public]
                                                           ├──→ Backend (:2222) [Internal]
                                                           ├──→ AI (:3333) [Internal]
                                                           └──→ PostgreSQL (:5432) [Optional]
```

### Port Mapping

| Service | Container Port | External Port | Exposure |
| ------- | -------------- | ------------- | -------- |
| Web     | 3000           | 80            | Public   |
| Backend | 2222           | Internal only | Private  |
| AI      | 3333           | Internal only | Private  |

### Docker Configuration by App

#### Web App (`apps/web/Dockerfile`)

- **Base Image**: Node.js 22-slim
- **Build Strategy**: Multi-stage with Turborepo prune for optimized builds
- **Standalone Output**: Uses Next.js standalone mode for minimal image size
- **Security**: Runs as non-root user `nextjs` (uid 1001)
- **Exposed Port**: 3000 (internal)
- **Start Command**: `node apps/web/server.js`

```dockerfile
# Build stages: prepare → builder → runner
# Optimized for layer caching and minimal image size
```

#### Backend (`apps/backend/Dockerfile`)

- **Base Image**: Bun (Alpine)
- **Build Strategy**: Turbo prune with Node.js 22-slim builder
- **Security**: Runs as non-root user
- **Exposed Port**: 2222 (internal)
- **Start Command**: `bun start`

#### AI App (`apps/ai/Dockerfile`)

- **Base Image**: Bun (Alpine)
- **Build Strategy**: Multi-stage with Turborepo prune
- **Security**: Runs as non-root user
- **Exposed Port**: 3333 (internal)
- **Start Command**: `bun run .mastra/start`

### Docker Compose Services

```yaml
services:
  web:
    build: apps/web/Dockerfile
    ports: ["80:3000"] # Public-facing
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:2222
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
      - DATABASE_URL=${DATABASE_URL}

  backend:
    build: apps/backend/Dockerfile
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - TRUSTED_ORIGINS=${NEXT_PUBLIC_APP_URL}

  ai:
    build: apps/ai/Dockerfile
```

### Environment Variables

Create `.env.production` from the template:

```bash
cp .env.production .env.production
```

Required variables:

| Variable              | Description                                     |
| --------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | Production domain (e.g., `https://example.com`) |
| `DATABASE_URL`        | PostgreSQL connection string                    |
| `DB_PASSWORD`         | Database password                               |
| `BETTER_AUTH_SECRET`  | Auth key (`openssl rand -base64 32`)            |

### Deployment Scripts

#### deploy.sh

Main deployment script that performs zero-downtime deployment:

```bash
./scripts/deploy.sh production
```

**Steps executed:**

1. Pre-flight checks (Docker, Docker Compose)
2. Run cleanup script
3. Build all Docker images with `--no-cache`
4. Start services with `docker compose up -d`
5. Wait 15 seconds for services to initialize
6. Health checks on ports 80 (web) and 2222 (backend)
7. Report container status

**Health check endpoints:**

- Web: `http://localhost:80`
- Backend: `http://localhost:2222/health` or `http://localhost:2222`

#### cleanup.sh

Cleans up Docker artifacts and frees required ports:

```bash
./scripts/cleanup.sh
```

**Actions performed:**

1. Stop and remove all Docker containers
2. Remove Docker networks
3. Kill processes on ports 80, 3000, 2222
4. Prune unused Docker images and volumes
5. Full Docker system cleanup

### Quick Deploy

```bash
# 1. Setup environment
cp .env.production .env.production
# Edit .env.production with your values

# 2. Make scripts executable
chmod +x scripts/deploy.sh
chmod +x scripts/cleanup.sh

# 3. Deploy
./scripts/deploy.sh production
```

### Manual Docker Commands

```bash
# Build all images
docker compose build --no-cache

# Start services
docker compose up -d

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f web
docker compose logs -f backend
docker compose logs -f ai

# Stop services
docker compose down

# Full cleanup
docker compose down --remove-orphans
docker system prune -a -f
```

### Zero-Downtime Deployment Strategy

The deploy script uses a strategy that minimizes downtime:

1. **Build Phase**: Build new images while services continue running
2. **Deploy Phase**: Recreate containers with new images (only brief restart downtime)
3. **Cleanup Phase**: Remove old images after successful deployment

For true zero-downtime with rolling updates, configure your reverse proxy with health checks before updating containers.

### Cloudflare DNS Setup

Create an A record pointing to your VPS IP:

| Type | Name | Value       |
| ---- | ---- | ----------- |
| A    | @    | YOUR_VPS_IP |

For subdomains:

| Type | Name | Value       |
| ---- | ---- | ----------- |
| A    | api  | YOUR_VPS_IP |
| A    | ai   | YOUR_VPS_IP |

### Troubleshooting

```bash
# Check container status
docker compose ps

# Check container logs
docker compose logs -f

# Check if ports are in use
lsof -i :80
lsof -i :2222

# Restart specific service
docker compose restart web
docker compose restart backend
docker compose restart ai

# Rebuild single service
docker compose build --no-cache web
docker compose up -d web
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Package Manager**: pnpm 10.x with workspace protocol
- **Monorepo**: Turborepo 2.7.3
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI primitives + class-variance-authority
- **State**: React hooks + TanStack Query
- **Forms**: React Hook Form + Zod
- **Backend**: Hono with Drizzle ORM
- **AI**: Mastra with Node.js >= 22.13.0 requirement
- **UI Package**: Shared component library with workspace protocol

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
