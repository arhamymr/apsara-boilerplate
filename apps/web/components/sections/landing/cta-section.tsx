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
          <h2 className="text-4xl md:text-5xl">
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
          </div>
        </div>
      </div>
    </section>
  );
}
