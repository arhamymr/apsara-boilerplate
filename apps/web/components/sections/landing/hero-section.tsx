"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { ArrowRight, Github } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto mb-20">
        <div className="mx-auto p-6">
          <Card className="w-full">
            <CardContent className="p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h1 className="text-4xl text-foreground md:text-6xl lg:text-7xl">
                Web Development Boilerplate
              </h1>
              <p className="mt-6 text-sm leading-8 text-muted-foreground md:text-xl md:leading-9">
                A comprehensive modern web application template built with
                Next.js 16, React 19, and TypeScript. This monorepo includes a
                production-ready frontend, backend API, AI agent integration,
                and a shared UI component library.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/docs">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <Link
                    href="https://github.com/arhamymr/apsara-devkit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" /> View on GitHub
                  </Link>
                </Button>
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline">Next.js 16</Badge>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline">React 19</Badge>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline">TypeScript 5</Badge>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline">Turborepo</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
