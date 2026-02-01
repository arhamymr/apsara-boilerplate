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
import { Button } from "@workspace/ui/components/button";
import { Copy, Play } from "lucide-react";

export function QuickstartSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Quick Start
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Follow these simple steps to get your development environment up and
            running
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Installation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Prerequisites</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Node.js 20 or higher</li>
                  <li>pnpm 10.x</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Install Dependencies</h4>
                <CodeBlock language="bash" code="pnpm install" />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Build All Packages</h4>
                <CodeBlock language="bash" code="pnpm build" />
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Start Development Servers
                </h4>
                <CodeBlock language="bash" code="pnpm dev" />
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-4">
                  Application-Specific Commands
                </h4>
                <div className="space-y-6">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Web App
                    </Badge>
                    <CodeBlock
                      language="bash"
                      code={`pnpm --filter web dev      # Start dev server (port 1111)
pnpm --filter web build    # Build for production
pnpm --filter web lint     # Run ESLint`}
                    />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Backend
                    </Badge>
                    <CodeBlock
                      language="bash"
                      code={`pnpm --filter backend dev  # Start API server
pnpm --filter backend build # Build for production
pnpm --filter backend start # Start production server`}
                    />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      AI App
                    </Badge>
                    <CodeBlock
                      language="bash"
                      code={`pnpm --filter ai dev       # Start AI agent server
pnpm --filter ai build     # Build for production`}
                    />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      UI Package
                    </Badge>
                    <CodeBlock
                      language="bash"
                      code="pnpm --filter @workspace/ui lint"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Adding UI Components</h4>
                <CodeBlock
                  language="bash"
                  code="# From the web app directory
pnpm dlx shadcn@latest add button -c apps/web"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  This adds the component to{" "}
                  <code className="bg-muted px-1 rounded">
                    packages/ui/src/components
                  </code>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button size="lg" className="gap-1">
              <Play className="h-4 w-4" /> Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
