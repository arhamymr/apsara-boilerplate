import { multiselect, confirm, text, select } from "@clack/prompts";
import type { ProjectConfig, Feature } from "./types.js";

const PRESETS = {
  minimal: {
    name: "Minimal",
    description: "Auth + Dashboard + User Profile",
    features: ["auth", "dashboard", "user-profile"],
    apps: ["web", "backend"],
  },
  standard: {
    name: "Standard",
    description: "Auth + Dashboard + User Profile + Access Control + Blog",
    features: ["auth", "dashboard", "user-profile", "access-control", "blog"],
    apps: ["web", "backend"],
  },
};

const FEATURES: Feature[] = [
  {
    id: "auth",
    name: "Authentication",
    description: "Email/password login, session management, password reset",
    apps: ["web", "backend"],
    category: "core",
    requiredBy: ["dashboard", "user-profile", "blog"],
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Stats overview, activity feed, charts, sidebar navigation",
    apps: ["web"],
    category: "ui",
  },
  {
    id: "user-profile",
    name: "User Profile",
    description: "Account settings, profile management, avatar upload",
    apps: ["web", "backend"],
    category: "core",
    requires: ["auth"],
  },
  {
    id: "access-control",
    name: "Access Control",
    description: "Role-based access control (admin/user), permissions",
    apps: ["web", "backend"],
    category: "security",
    requires: ["auth"],
  },
  {
    id: "blog",
    name: "Blog",
    description: "Posts, categories, tags, author pages",
    apps: ["web", "backend"],
    category: "content",
    requires: ["auth"],
  },
];

export async function promptProjectName(): Promise<string> {
  const name = await text({
    message: "What is your project name?",
    placeholder: "my-app",
    validate: (value: string): string | undefined => {
      if (!value) return "Project name is required";
      if (!/^[a-zA-Z][a-zA-Z0-9-]*$/.test(value)) {
        return "Project name must start with a letter and contain only letters, numbers, and hyphens";
      }
      return undefined;
    },
  });

  if (typeof name !== "string") {
    throw new Error("Project name is required");
  }

  return name;
}

export async function promptApps(): Promise<string[]> {
  const apps = await multiselect({
    message: "Which apps do you need?",
    options: [
      {
        value: "web",
        label: "Web",
        hint: "Next.js frontend (required for all features)",
      },
      { value: "backend", label: "Backend", hint: "Hono API server" },
      { value: "ai", label: "AI", hint: "Mastra AI agents (optional)" },
    ],
    required: true,
  });

  if (!Array.isArray(apps)) {
    throw new Error("At least one app must be selected");
  }

  return apps;
}

export async function promptPresetOrCustom(): Promise<
  "minimal" | "standard" | "custom"
> {
  const preset = await select({
    message: "Select a preset or choose custom features:",
    options: [
      {
        value: "minimal",
        label: "Minimal",
        hint: "Auth + Dashboard + User Profile",
      },
      {
        value: "standard",
        label: "Standard",
        hint: "Auth + Dashboard + User Profile + Access Control + Blog",
      },
      {
        value: "custom",
        label: "Custom",
        hint: "Choose features yourself",
      },
    ],
  });

  if (typeof preset !== "string") {
    throw new Error("Please select a preset");
  }

  return preset as "minimal" | "standard" | "custom";
}

export async function promptFeatures(
  preset: "minimal" | "standard" | "custom",
): Promise<string[]> {
  if (preset !== "custom") {
    return PRESETS[preset].features;
  }

  const selected = await multiselect({
    message: "Select features to include:",
    options: FEATURES.map((f) => ({
      value: f.id,
      label: f.name,
      hint: f.description,
    })),
    required: true,
  });

  if (!Array.isArray(selected)) {
    throw new Error("Please select at least one feature");
  }

  return selected;
}

export async function promptGitInit(): Promise<boolean> {
  const initGit = await confirm({
    message: "Initialize git repository?",
    initialValue: true,
  });

  return initGit === true;
}

export async function promptInstallDeps(): Promise<boolean> {
  const install = await confirm({
    message: "Install dependencies?",
    initialValue: true,
  });

  return install === true;
}

export async function resolveFeatures(
  selectedFeatures: string[],
): Promise<string[]> {
  const resolved = new Set<string>();
  const queue = [...selectedFeatures];

  while (queue.length > 0) {
    const featureId = queue.shift()!;
    if (resolved.has(featureId)) continue;

    const feature = FEATURES.find((f) => f.id === featureId);
    if (!feature) continue;

    if (feature.requires) {
      for (const req of feature.requires) {
        if (!resolved.has(req)) {
          queue.push(req);
        }
      }
    }

    resolved.add(featureId);
  }

  return Array.from(resolved);
}

export function getRequiredApps(features: string[]): string[] {
  const apps = new Set<string>(["web"]);

  for (const featureId of features) {
    const feature = FEATURES.find((f) => f.id === featureId);
    if (feature) {
      for (const app of feature.apps) {
        apps.add(app);
      }
    }
  }

  return Array.from(apps);
}

export function getFeatureById(id: string): Feature | undefined {
  return FEATURES.find((f) => f.id === id);
}

export { PRESETS, FEATURES };
