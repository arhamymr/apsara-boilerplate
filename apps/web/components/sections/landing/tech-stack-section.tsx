"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { CodeBlock } from "@workspace/ui/components/code-block";

const techStack = {
  frontend: [
    "Next.js 16",
    "React 19",
    "TypeScript 5",
    "Tailwind CSS v4",
    "Radix UI",
  ],
  backend: ["Hono", "Drizzle ORM", "Node.js 22+", "Bun Runtime", "PostgreSQL"],
  tooling: ["Turborepo", "pnpm", "ESLint", "Prettier", "Docker"],
  ai: ["Mastra", "Node.js >= 22.13.0", "AI Agents", "LLM Integration"],
};

export function TechStackSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl  tracking-tight sm:text-4xl">
            Modern Tech Stack
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built with the latest and greatest technologies for optimal
            development experience
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(techStack).map(([category, technologies]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Project Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`apsara-devkit/
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
└── AGENTS.md         # AI agent development guidelines`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
