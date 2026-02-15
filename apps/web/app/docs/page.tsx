import * as React from "react"
import Link from "next/link"
import { RichTextEditor } from "@workspace/ui/components/rich-text-editor"

export default function DocsPage() {
  return (
    <div className="prose max-w-none">
      {/* Overview */}
      <section id="overview" aria-labelledby="overview-title" className="scroll-mt-20">
        <h1 id="overview-title" className="text-2xl font-bold tracking-tight">Apsara DevKit Documentation</h1>
        <p className="text-muted-foreground">Comprehensive documentation for the monorepo, applications, and the additional custom components available in this project.</p>
        <ul className="mt-3 list-disc pl-6">
          <li>Next.js 16 (App Router, Server Components, Actions)</li>
          <li>React 19 and TypeScript 5 with strict mode</li>
          <li>Turborepo monorepo management</li>
          <li>Shared UI library with accessible components</li>
          <li>Hono backend API with Drizzle ORM</li>
          <li>Mastra AI agent application</li>
          <li>Rust backend boilerplate (Cargo)</li>
        </ul>
        <p className="mt-3">Project structure is described in detail in the repository README, but the essential layout is:</p>
        <pre className="mt-2 rounded bg-muted p-3 text-sm">
{`apsara-devkit/
├── apps/
│   ├── web/          # Next.js frontend (port 1111)
│   ├── backend/      # Hono API server
│   ├── ai/           # Mastra AI agents
│   └── rust-backend/ # Rust backend (Cargo)
├── packages/
│   ├── ui/                 # Shared UI component library
│   ├── eslint-config/      # ESLint configuration
│   └── typescript-config/  # TypeScript configuration
└── turbo.json, pnpm-workspace.yaml`}
        </pre>
      </section>

      {/* Monorepo & Turborepo */}
      <section id="monorepo" aria-labelledby="monorepo-title" className="mt-12 scroll-mt-20">
        <h2 id="monorepo-title" className="text-xl font-semibold tracking-tight">Monorepo & Turborepo</h2>
        <p className="text-muted-foreground">This repository is managed with Turborepo and pnpm workspaces for efficient builds, caching, and dependency management across multiple applications.</p>
        <h3 className="mt-4 text-lg font-semibold">Core commands (run at repo root)</h3>
        <pre className="mt-2 rounded bg-muted p-3 text-sm">
{`pnpm build   # Build all workspaces (turbo build)
pnpm dev     # Run dev servers for all apps (turbo dev)
pnpm lint    # Lint all workspaces (turbo lint)
pnpm format  # Format all files with Prettier`}
        </pre>
        <p className="mt-3">Refer to AGENTS.md for detailed build, lint, and test conventions, TypeScript configuration, component patterns, aliases, and general guidelines.</p>
      </section>

      {/* Apps: Web */}
      <section id="apps-web" aria-labelledby="apps-web-title" className="mt-12 scroll-mt-20">
        <h2 id="apps-web-title" className="text-xl font-semibold tracking-tight">App: Web (Next.js)</h2>
        <p className="text-muted-foreground">Next.js 16 frontend application with Server Components by default and client components where interaction is required.</p>
        <h3 className="mt-4 text-lg font-semibold">Development commands</h3>
        <pre className="mt-2 rounded bg-muted p-3 text-sm">
{`pnpm --filter web dev      # Start dev server (port 1111)
pnpm --filter web build    # Build for production
pnpm --filter web lint     # Run ESLint
pnpm --filter web lint:fix # Fix ESLint issues
pnpm --filter web typecheck # TypeScript check`}
        </pre>
        <p className="mt-3">Styling uses Tailwind CSS v4 with shared design tokens. Global styles are provided from the UI package and imported in the app layout.</p>
      </section>

      {/* Apps: Backend */}
      <section id="apps-backend" aria-labelledby="apps-backend-title" className="mt-12 scroll-mt-20">
        <h2 id="apps-backend-title" className="text-xl font-semibold tracking-tight">App: Backend (Hono)</h2>
        <p className="text-muted-foreground">Lightweight, fast API server using Hono with Drizzle ORM for schema and queries.</p>
        <h3 className="mt-4 text-lg font-semibold">Development commands</h3>
        <pre className="mt-2 rounded bg-muted p-3 text-sm">
{`pnpm --filter backend dev   # Start API server
pnpm --filter backend build # Build for production
pnpm --filter backend start # Start production server`}
        </pre>
        <p className="mt-3">Authentication endpoints include interactive API documentation at the provided reference route when running locally.</p>
      </section>

      {/* Apps: AI */}
      <section id="apps-ai" aria-labelledby="apps-ai-title" className="mt-12 scroll-mt-20">
        <h2 id="apps-ai-title" className="text-xl font-semibold tracking-tight">App: AI (Mastra)</h2>
        <p className="text-muted-foreground">Mastra-based AI agent application. Requires Node.js 22.13.0 or higher.</p>
        <h3 className="mt-4 text-lg font-semibold">Development commands</h3>
        <pre className="mt-2 rounded bg-muted p-3 text-sm">
{`pnpm --filter ai dev    # Start AI agent server
pnpm --filter ai build  # Build for production`}
        </pre>
        <p className="mt-3">Agents, tools, workflows, and scorers are organized under <code>apps/ai/src/mastra</code>. Extend as needed per your use case.</p>
      </section>

      {/* Apps: Rust */}
      <section id="apps-rust" aria-labelledby="apps-rust-title" className="mt-12 scroll-mt-20">
        <h2 id="apps-rust-title" className="text-xl font-semibold tracking-tight">App: Rust Backend</h2>
        <p className="text-muted-foreground">Cargo-based minimal Rust backend integrated with the workspace and Turbo pipelines. Includes standard dev, build, lint, and test scripts.</p>
        <h3 className="mt-4 text-lg font-semibold">Development commands</h3>
        <pre className="mt-2 rounded bg-muted p-3 text-sm">
{`pnpm --filter rust-backend dev   # cargo run
pnpm --filter rust-backend build # cargo build
pnpm --filter rust-backend lint  # cargo clippy
pnpm --filter rust-backend test  # cargo test`}
        </pre>
        <p className="mt-3">You can extend to a web server (e.g., Axum) by adding dependencies in <code>Cargo.toml</code> and updating <code>src/main.rs</code>.</p>
      </section>

      {/* UI Components */}
      <section id="ui-components" aria-labelledby="ui-components-title" className="mt-12 scroll-mt-20">
        <h2 id="ui-components-title" className="text-xl font-semibold tracking-tight">UI Components</h2>
        <p className="text-muted-foreground">This project uses a shared UI component library under <code>packages/ui</code> and includes both Shadcn-derived components and custom additions.</p>
        <div className="mt-3">
          <h3 className="text-lg font-semibold">Shadcn/UI Components</h3>
          <p className="text-muted-foreground">For the standard Shadcn components, please refer to the official documentation:</p>
          <Link href="https://ui.shadcn.com/" target="_blank" className="text-primary underline underline-offset-4">Shadcn/UI Documentation</Link>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Additional Components</h3>
          <p className="text-muted-foreground">Currently available custom component:</p>
          <ul className="list-disc pl-6">
            <li>Text Editor (RichTextEditor)</li>
          </ul>
        </div>
      </section>

      {/* Showcase: Text Editor */}
      <section id="rich-text-editor" aria-labelledby="rich-text-editor-title" className="mt-12 scroll-mt-20">
        <h2 id="rich-text-editor-title" className="text-xl font-semibold tracking-tight">Showcase: Text Editor</h2>
        <p className="text-muted-foreground">Interactive rich text editor built on Lexical, with toolbar controls, list support, link insertion, Markdown shortcuts, and code highlighting.</p>
        <div className="mt-4">
          <RichTextEditor
            defaultValue={`<h2>Welcome</h2><p>This is the <strong>RichTextEditor</strong> demo. Try headings, lists, links, or code blocks.</p><pre><code class=\"language-ts\">const hello: string = 'world'\nconsole.log(hello)</code></pre>`}
            minHeight={180}
            toolbar
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Usage</h3>
          <pre className="rounded bg-muted p-3 text-sm overflow-auto">
{`import { RichTextEditor } from "@workspace/ui/components/rich-text-editor"

export function Example() {
  return (
    <RichTextEditor
      defaultValue="<p>Type here...</p>"
      minHeight={160}
      toolbar
      onChange={(snapshot) => {
        // snapshot.html and snapshot.json are available
        console.log(snapshot.html)
      }}
    />
  )
}`}
          </pre>
          <p className="text-muted-foreground mt-2">Value can be provided as HTML string or Lexical serialized JSON. Use the <code>onChange</code> callback to persist content.</p>
        </div>
      </section>
    </div>
  )
}
