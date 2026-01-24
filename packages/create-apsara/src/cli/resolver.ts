import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import type { FeatureManifest } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEATURES_DIR = path.join(__dirname, "..", "features");

export async function loadManifest(
  featureId: string,
): Promise<FeatureManifest> {
  const manifestPath = path.join(FEATURES_DIR, featureId, "manifest.json");

  if (!(await fs.pathExists(manifestPath))) {
    throw new Error(`Feature manifest not found: ${featureId}`);
  }

  const manifest = await fs.readJSON(manifestPath);
  return manifest as FeatureManifest;
}

export async function loadAllManifests(): Promise<FeatureManifest[]> {
  const features = await fs.readdir(FEATURES_DIR);
  const manifests: FeatureManifest[] = [];

  for (const feature of features) {
    const manifestPath = path.join(FEATURES_DIR, feature, "manifest.json");
    if (await fs.pathExists(manifestPath)) {
      const manifest = await fs.readJSON(manifestPath);
      manifests.push(manifest as FeatureManifest);
    }
  }

  return manifests;
}

export function resolveDependencies(
  selectedFeatures: string[],
  manifests: FeatureManifest[],
): string[] {
  const resolved = new Set<string>();
  const queue = [...selectedFeatures];

  while (queue.length > 0) {
    const featureId = queue.shift()!;
    if (resolved.has(featureId)) continue;

    const manifest = manifests.find((m) => m.id === featureId);
    if (!manifest) continue;

    for (const req of manifest.requires) {
      if (!resolved.has(req)) {
        queue.push(req);
      }
    }

    resolved.add(featureId);
  }

  return Array.from(resolved);
}

export function getRequiredApps(
  features: string[],
  manifests: FeatureManifest[],
): string[] {
  const apps = new Set<string>();

  for (const featureId of features) {
    const manifest = manifests.find((m) => m.id === featureId);
    if (manifest) {
      for (const app of manifest.apps) {
        apps.add(app);
      }
    }
  }

  return Array.from(apps);
}

interface DependencyMap {
  web: string[];
  backend: string[];
  ai: string[];
}

export function collectDependencies(
  features: string[],
  manifests: FeatureManifest[],
): DependencyMap & { webDev: string[]; backendDev: string[]; aiDev: string[] } {
  const deps: DependencyMap = {
    web: [],
    backend: [],
    ai: [],
  };

  const devDeps: DependencyMap = {
    web: [],
    backend: [],
    ai: [],
  };

  for (const featureId of features) {
    const manifest = manifests.find((m) => m.id === featureId);
    if (!manifest) continue;

    if (manifest.config?.web) {
      const webConfig = manifest.config.web;
      if (webConfig.dependencies) {
        deps.web = deps.web.concat(webConfig.dependencies);
      }
      if (webConfig.devDependencies) {
        devDeps.web = devDeps.web.concat(webConfig.devDependencies);
      }
    }

    if (manifest.config?.backend) {
      const backendConfig = manifest.config.backend;
      if (backendConfig.dependencies) {
        deps.backend = deps.backend.concat(backendConfig.dependencies);
      }
      if (backendConfig.devDependencies) {
        devDeps.backend = devDeps.backend.concat(backendConfig.devDependencies);
      }
    }

    if (manifest.config?.ai) {
      const aiConfig = manifest.config.ai;
      if (aiConfig.dependencies) {
        deps.ai = deps.ai.concat(aiConfig.dependencies);
      }
      if (aiConfig.devDependencies) {
        devDeps.ai = devDeps.ai.concat(aiConfig.devDependencies);
      }
    }
  }

  return {
    web: [...new Set(deps.web)],
    backend: [...new Set(deps.backend)],
    ai: [...new Set(deps.ai)],
    webDev: [...new Set(devDeps.web)],
    backendDev: [...new Set(devDeps.backend)],
    aiDev: [...new Set(devDeps.ai)],
  };
}

export function collectEnvVars(
  features: string[],
  manifests: FeatureManifest[],
): { required: string[]; optional: string[] } {
  const required = new Set<string>();
  const optional = new Set<string>();

  for (const featureId of features) {
    const manifest = manifests.find((m) => m.id === featureId);
    if (!manifest) continue;

    const webEnvVars = manifest.config?.web?.envVars;
    if (webEnvVars) {
      webEnvVars.required.forEach((v) => required.add(v));
      webEnvVars.optional.forEach((v) => optional.add(v));
    }

    const backendEnvVars = manifest.config?.backend?.envVars;
    if (backendEnvVars) {
      backendEnvVars.required.forEach((v) => required.add(v));
      backendEnvVars.optional.forEach((v) => optional.add(v));
    }
  }

  return {
    required: Array.from(required),
    optional: Array.from(optional),
  };
}
