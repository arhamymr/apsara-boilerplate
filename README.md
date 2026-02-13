# Apsara Boilerplate

A comprehensive modern web application template built with Next.js 16, React 19, and TypeScript. This monorepo includes a production-ready frontend, backend API, AI agent integration, a Rust backend boilerplate, and a shared UI component library.

## Features

- **Next.js 16** - App Router, Server Components, Server Actions
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Full type safety with strict mode
- **Turborepo** - High-performance monorepo build system
- **Shared UI Library** - 50+ accessible components built with Radix UI
- **Theme System** - Dark/light mode with next-themes
- **Backend API** - Hono server for fast API endpoints
- **AI Integration** - Mastra AI agent framework
- **Rust Boilerplate** - Cargo-based Rust workspace integrated with Turborepo
- **Authentication** - Complete auth flow with login/register
- **Tailwind CSS v4** - Utility-first styling

## Project Structure

```
apsara-devkit/
├── apps/
│   ├── web/          # Next.js frontend (port 1111)
│   ├── backend/      # Hono API server
│   ├── ai/           # Mastra AI agents
│   └── rust-backend/ # Rust backend (Cargo) — minimal boilerplate
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
- For Rust backend: Rust toolchain via `rustup` (includes `cargo`), optional `clippy` and `rustfmt`

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development servers (all workspaces)
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
pnpm --filter backend dev   # Start API server
pnpm --filter backend build # Build for production
pnpm --filter backend start # Start production server
```

### AI App (Mastra)

```bash
pnpm --filter ai dev       # Start AI agent server
pnpm --filter ai build     # Build for production
```

### Rust Backend (Cargo)

The Rust backend is a minimal boilerplate integrated into the Turborepo via `pnpm` workspace scripts. It uses Cargo under the hood.

```bash
# Start Rust backend in dev mode (cargo run)
pnpm --filter rust-backend dev

# Build Rust backend (cargo build)
pnpm --filter rust-backend build

# Lint Rust backend (cargo clippy)
pnpm --filter rust-backend lint

# Test Rust backend (cargo test)
pnpm --filter rust-backend test
```

Notes:
- The Rust workspace is defined in `apps/rust-backend` with a `Cargo.toml` and a minimal `src/main.rs`.
- A `package.json` is added to `apps/rust-backend` to expose `dev`, `build`, `lint`, and `test` scripts for Turborepo.
- `turbo.json` outputs include `target/**` so Cargo build artifacts can be cached in Turbo build pipelines.

## Rust Boilerplate Details

The Rust backend currently provides a starter binary that prints an initialization message. You can extend this to a web service (e.g., using `axum`, `actix-web`, or `warp`).

Directory layout:

```
apps/rust-backend/
├── Cargo.toml
└── src/
    └── main.rs
```

Key files:
- `apps/rust-backend/Cargo.toml` — Rust package manifest
- `apps/rust-backend/src/main.rs` — Entry point printing a startup message
- `apps/rust-backend/package.json` — pnpm/Turborepo bridge that maps Turbo tasks to Cargo commands

Script mapping:
- `dev` → `cargo run`
- `build` → `cargo build`
- `lint` → `cargo clippy`
- `test` → `cargo test`

### Extend to a Web Server (optional)

To turn this into a web server, add dependencies to `Cargo.toml` and change `main.rs` accordingly. Example (Axum):

```toml
# Cargo.toml
[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
// src/main.rs
use axum::{routing::get, Router};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "Hello from Rust backend" }));
    let addr: SocketAddr = "0.0.0.0:4000".parse().unwrap();
    println!("Listening on {}", addr);
    axum::Server::bind(&addr).serve(app.into_make_service()).await.unwrap();
}
```

Then you can run `pnpm --filter rust-backend dev` and visit `http://localhost:4000`.

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

## API Documentation

The backend API provides comprehensive authentication endpoints with automatically generated documentation:

- **Authentication API Reference**: [http://localhost:2222/api/auth/reference](http://localhost:2222/api/auth/reference) - Complete interactive documentation for all authentication endpoints including login, registration, session management, and more

### Testing the API

You can access the API documentation when the backend is running:

1. Start the backend server with `pnpm --filter backend dev` or `bun run --hot src/index.ts` from the backend directory
2. Visit the API reference URL in your browser at [http://localhost:2222/api/auth/reference](http://localhost:2222/api/auth/reference)
3. The documentation includes interactive examples for testing endpoints directly in your browser

### Quick Access

For convenience, you can also use the provided script to open the auth documentation:

```bash
pnpm --filter backend auth-docs
```

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
- **Rust**: Cargo-based backend integrated with Turborepo

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
