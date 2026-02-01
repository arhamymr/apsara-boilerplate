"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Layers,
  Zap,
  Palette,
  Shield,
  Database,
  Cpu,
  Cloud,
  Code,
  Package,
  GitBranch,
  Settings,
  Moon,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Next.js 16",
    description:
      "App Router, Server Components, and Server Actions for optimal performance",
  },
  {
    icon: Layers,
    title: "React 19",
    description:
      "Latest React with concurrent features and improved developer experience",
  },
  {
    icon: Code,
    title: "TypeScript 5",
    description: "Full type safety with strict mode for better code quality",
  },
  {
    icon: GitBranch,
    title: "Turborepo",
    description:
      "High-performance monorepo build system for efficient development",
  },
  {
    icon: Palette,
    title: "Shared UI Library",
    description:
      "50+ accessible components built with Radix UI and Tailwind CSS",
  },
  {
    icon: Moon,
    title: "Theme System",
    description: "Dark/light mode with next-themes for customizable appearance",
  },
  {
    icon: Database,
    title: "Backend API",
    description: "Hono server for fast and efficient API endpoints",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Mastra AI agent framework for intelligent applications",
  },
  {
    icon: Shield,
    title: "Authentication",
    description: "Complete auth flow with login/register functionality",
  },
  {
    icon: Package,
    title: "Component Library",
    description: "Comprehensive UI components with consistent design system",
  },
  {
    icon: Settings,
    title: "Developer Tools",
    description: "ESLint, Prettier, and TypeScript configurations included",
  },
  {
    icon: Cloud,
    title: "Docker Ready",
    description: "Containerized deployment with zero-downtime strategy",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl  tracking-tight sm:text-4xl">
            Everything You Need to Build Modern Web Apps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A comprehensive toolkit with production-ready features and best
            practices built-in
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
