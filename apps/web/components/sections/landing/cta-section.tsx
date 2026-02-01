"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Github, Star, GitFork, Users, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Build Something Amazing?
          </h2>
          <p className="mt-4 text-lg leading-8 opacity-90">
            Join thousands of developers using Apsara DevKit to build modern web
            applications faster and more efficiently.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="gap-1" asChild>
              <a
                href="https://github.com/arhamymr/apsara-devkit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" /> View on GitHub
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-1 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="/docs">
                Read Documentation <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <Star className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">Production Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-center opacity-90">
                Built with best practices and production deployment in mind
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <GitFork className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">Developer Focused</CardTitle>
              </CardHeader>
              <CardContent className="text-center opacity-90">
                Built by a developer for developers with real-world needs in
                mind
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <GitFork className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">Extensible</CardTitle>
              </CardHeader>
              <CardContent className="text-center opacity-90">
                Easy to customize and extend with your own features
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm opacity-75">
              MIT License - Ready for commercial and personal projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
