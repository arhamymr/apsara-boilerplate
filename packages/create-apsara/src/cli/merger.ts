import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

interface PackageJson {
  name?: string;
  version?: string;
  private?: boolean;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  packageManager?: string;
  engines?: Record<string, string>;
}

export async function mergePackageJson(
  targetPath: string,
  app: "web" | "backend" | "ai",
  dependencies: Record<string, string[]>,
  devDependencies: Record<string, string[]>,
): Promise<void> {
  const packageJsonPath = path.join(targetPath, "package.json");
  const templatePath = path.join(TEMPLATES_DIR, `${app}-package.json`);

  let existing: PackageJson = {};
  if (await fs.pathExists(packageJsonPath)) {
    existing = await fs.readJSON(packageJsonPath);
  } else if (await fs.pathExists(templatePath)) {
    existing = await fs.readJSON(templatePath);
  }

  const merged: PackageJson = {
    ...existing,
    name: existing.name || `${app}-app`,
    version: "0.0.1",
    private: true,
    scripts: {
      ...existing.scripts,
      dev: `${app === "web" ? "next dev" : app === "backend" ? "bun run src/index.ts" : "pnpm run dev"}`,
      build: `${app === "web" ? "next build" : app === "backend" ? "tsc" : "tsc"}`,
      lint: "eslint . --ext .ts,.tsx",
      typecheck: "tsc --noEmit",
    },
  };

  const appDeps = dependencies[app] || [];
  const appDevDeps = devDependencies[app] || [];

  merged.dependencies = {
    ...existing.dependencies,
    ...Object.fromEntries(appDeps.map((d) => [d, "latest"])),
  };

  merged.devDependencies = {
    ...existing.devDependencies,
    ...Object.fromEntries(appDevDeps.map((d) => [d, "latest"])),
  };

  await fs.writeJSON(packageJsonPath, merged, { spaces: 2 });
}

export async function mergeTurboJson(
  targetPath: string,
  apps: string[],
): Promise<void> {
  const turboJsonPath = path.join(targetPath, "turbo.json");

  const tasks: Record<string, Record<string, unknown>> = {};

  for (const app of apps) {
    tasks[app] = {
      dependsOn: [],
      inputs: ["**"],
      outputMode: "hash",
    };
  }

  const turboConfig = {
    $schema: "https://turbo.build/schema.json",
    pipeline: {
      build: {
        dependsOn: ["^build"],
        outputs: [],
      },
      dev: {
        cache: false,
        persistent: true,
      },
      lint: {},
      typecheck: {},
    },
    tasks,
  };

  await fs.writeJSON(turboJsonPath, turboConfig, { spaces: 2 });
}

export async function mergeEnvExample(
  targetPath: string,
  envVars: { required: string[]; optional: string[] },
): Promise<void> {
  const envPath = path.join(targetPath, ".env.example");

  let content = "";

  for (const env of envVars.required) {
    content += `# Required\n${env}=your_${env.toLowerCase().replace(/_/g, "")}\n\n`;
  }

  for (const env of envVars.optional) {
    content += `# Optional\n# ${env}=your_${env.toLowerCase().replace(/_/g, "")}\n\n`;
  }

  content += `# Database\nDATABASE_URL=file:./sqlite.db\n\n`;
  content += `# App\nNEXT_PUBLIC_APP_URL=http://localhost:3000\n`;

  await fs.writeFile(envPath, content);
}

export async function createEnvProduction(targetPath: string): Promise<void> {
  const envPath = path.join(targetPath, ".env.production");

  let content = `# Required\nDATABASE_URL=your_database_url\nBETTER_AUTH_SECRET=your_auth_secret\n\n`;
  content += `# Optional\n# GOOGLE_CLIENT_ID=\n# GOOGLE_CLIENT_SECRET=\n\n`;
  content += `# App\nNEXT_PUBLIC_APP_URL=https://yourdomain.com\n`;

  await fs.writeFile(envPath, content);
}
