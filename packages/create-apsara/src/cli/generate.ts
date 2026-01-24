import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import {
  bgCyan,
  black,
  blue,
  bold,
  cyan,
  green,
  red,
  yellow,
} from "picocolors";
import { install } from "./installer.js";
import { gitInit } from "./git.js";
import { copyCore, copyFeature, copySharedFeature, copyApp } from "./copier.js";
import {
  mergePackageJson,
  mergeTurboJson,
  mergeEnvExample,
  createEnvProduction,
} from "./merger.js";
import {
  loadAllManifests,
  resolveDependencies,
  collectDependencies,
  collectEnvVars,
} from "./resolver.js";
import type { ProjectConfig } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface GenerateOptions {
  name: string;
  preset?: string;
  apps?: string;
  features?: string;
  git?: boolean;
  install?: boolean;
}

async function logStep(message: string): Promise<void> {
  console.log(`\n${bgCyan(black(" STEP "))} ${cyan(message)}`);
}

async function logSuccess(message: string): Promise<void> {
  console.log(`\n${bgCyan(black(" DONE "))} ${green(message)}`);
}

async function logInfo(message: string): Promise<void> {
  console.log(`\n${blue(" INFO ")} ${message}`);
}

async function logWarning(message: string): Promise<void> {
  console.log(`\n${yellow(" WARN ")} ${message}`);
}

async function printBanner(): Promise<void> {
  console.log(`
${bold(blue("╔══════════════════════════════════════════════════════════╗"))}
${bold(blue("║"))}  ${bold(cyan("Apsara DevKit"))} - Modular Project Generator          ${bold(blue("║"))}
${bold(blue("║"))}  ${cyan("Create customizable web applications with ease")}   ${bold(blue("║"))}
${bold(blue("╚══════════════════════════════════════════════════════════╝"))}
  `);
}

export async function generate(options: GenerateOptions): Promise<void> {
  await printBanner();

  const targetDir = path.resolve(process.cwd(), options.name);

  if (await fs.pathExists(targetDir)) {
    console.log(
      `\n${red(" ERROR ")} Directory "${options.name}" already exists!`,
    );
    process.exit(1);
  }

  await logStep("Loading feature manifests...");
  const allManifests = await loadAllManifests();

  let apps = options.apps?.split(",").map((a) => a.trim()) || [
    "web",
    "backend",
  ];
  let features = options.features?.split(",").map((f) => f.trim()) || [];

  if (options.preset && !features.length) {
    const presetFeatures: Record<string, string[]> = {
      minimal: ["auth", "dashboard", "user-profile"],
      standard: ["auth", "dashboard", "user-profile", "access-control", "blog"],
    };
    features = presetFeatures[options.preset] || [];
  }

  await logStep("Resolving dependencies...");
  features = resolveDependencies(features, allManifests);
  apps = apps.filter((app) => {
    const requiredApps = new Set(
      features.flatMap((f) => {
        const manifest = allManifests.find((m) => m.id === f);
        return manifest?.apps || [];
      }),
    );
    return requiredApps.has(app);
  });

  const dependencies = collectDependencies(features, allManifests);
  const envVars = collectEnvVars(features, allManifests);

  await logStep("Creating project structure...");
  await fs.ensureDir(targetDir);
  await fs.ensureDir(path.join(targetDir, "apps"));
  await fs.ensureDir(path.join(targetDir, "packages"));
  await fs.ensureDir(path.join(targetDir, "packages", "shared", "types"));

  await logStep("Copying core files...");
  await copyCore(targetDir);

  for (const app of apps) {
    await logInfo(`Setting up ${app} app...`);
    await copyApp(app as "web" | "backend" | "ai", targetDir);
  }

  await logStep("Copying feature files...");

  const webFeatures = features.filter((f) => {
    const manifest = allManifests.find((m) => m.id === f);
    return manifest?.apps.includes("web");
  });

  const backendFeatures = features.filter((f) => {
    const manifest = allManifests.find((m) => m.id === f);
    return manifest?.apps.includes("backend");
  });

  const aiFeatures = features.filter((f) => {
    const manifest = allManifests.find((m) => m.id === f);
    return manifest?.apps.includes("ai");
  });

  for (const feature of webFeatures) {
    await copyFeature(feature, targetDir, "web");
    await copySharedFeature(feature, targetDir);
  }

  for (const feature of backendFeatures) {
    await copyFeature(feature, targetDir, "backend");
  }

  for (const feature of aiFeatures) {
    await copyFeature(feature, targetDir, "ai");
  }

  await logStep("Merging configuration files...");

  const appDependencies: Record<string, string[]> = {
    web: dependencies.web,
    backend: dependencies.backend,
    ai: dependencies.ai,
  };

  const appDevDependencies: Record<string, string[]> = {
    web: dependencies.webDev,
    backend: dependencies.backendDev,
    ai: dependencies.aiDev,
  };

  for (const app of apps) {
    await mergePackageJson(
      path.join(targetDir, "apps", app),
      app as "web" | "backend" | "ai",
      appDependencies,
      appDevDependencies,
    );
  }

  await mergeTurboJson(targetDir, apps);
  await mergeEnvExample(targetDir, envVars);
  await createEnvProduction(targetDir);

  await fs.writeFile(
    path.join(targetDir, "package.json"),
    JSON.stringify(
      {
        name: options.name,
        version: "0.0.1",
        private: true,
        scripts: {
          build: "turbo run build",
          dev: "turbo run dev",
          lint: "turbo run lint",
          typecheck: "turbo run typecheck",
        },
        devDependencies: {
          "@workspace/eslint-config": "workspace:*",
          "@workspace/typescript-config": "workspace:*",
          prettier: "^3.7.4",
          tailwindcss: "^4.1.11",
          turbo: "^2.7.3",
          typescript: "^5.7.3",
        },
        packageManager: "pnpm@10.4.1",
        engines: {
          node: ">=20",
        },
      },
      null,
      2,
    ),
  );

  await fs.writeFile(
    path.join(targetDir, "pnpm-workspace.yaml"),
    `packages:
  - apps/*
  - packages/*
`,
  );

  await fs.writeFile(
    path.join(targetDir, "README.md"),
    `# ${options.name}

Generated with Apsara DevKit.

## Features

${features.map((f) => `- ${f}`).join("\n")}

## Getting Started

\`\`\`bash
# Install dependencies
${options.install !== false ? "pnpm install" : "pnpm install --no-frozen-lockfile"}

# Start development server
pnpm dev
\`\`\`

## Available Commands

\`\`\`bash
pnpm build      # Build all apps
pnpm dev        # Start development servers
pnpm lint       # Lint all apps
pnpm typecheck  # Type check all apps
\`\`\`

## Environment Variables

Copy \`.env.example\` to \`.env\` and fill in the values:

\`\`\`bash
cp .env.example .env
\`\`\`

## Documentation

See the [Apsara DevKit documentation](https://github.com/your-org/apsara-devkit) for more information.
`,
  );

  await fs.writeFile(
    path.join(targetDir, ".gitignore"),
    `node_modules/
.pnp
.pnp.js
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.next/
out/
build/
dist/
*.log
npm-debug.log*
.DS_Store
*.pem
.vercel
.turbo
coverage/
.nyc_output/
`,
  );

  if (options.git !== false) {
    await gitInit(targetDir);
  }

  if (options.install !== false) {
    await install(targetDir);
  }

  await logSuccess(`Project "${options.name}" created successfully!`);
  console.log(`
${bold("Next steps:")}

  ${cyan("cd")} ${options.name}
  ${cyan("pnpm")} dev

${bold("Project structure:")}

  ${options.name}/
  ├── apps/
  │   ${apps.map((a) => a + "/").join("\n  │   ")}
  ├── packages/
  │   ├── ui/
  │   └── shared/
  └── features/
      ${features.map((f) => f + "/").join("\n      ")}
`);
}
