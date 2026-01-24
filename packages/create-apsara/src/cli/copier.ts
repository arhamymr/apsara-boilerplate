import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORE_DIR = path.join(__dirname, "..", "core");
const FEATURES_DIR = path.join(__dirname, "..", "features");

export async function copyCore(targetDir: string): Promise<void> {
  await fs.copy(CORE_DIR, targetDir);
}

export async function copyFeature(
  featureId: string,
  targetDir: string,
  app: "web" | "backend" | "ai",
): Promise<void> {
  const featureDir = path.join(FEATURES_DIR, featureId);
  const appDir = path.join(targetDir, "apps", app, "features", featureId);

  await fs.ensureDir(appDir);

  const appSubdir = path.join(featureDir, app);
  if (await fs.pathExists(appSubdir)) {
    await fs.copy(appSubdir, appDir);
  }
}

export async function copySharedFeature(
  featureId: string,
  targetDir: string,
): Promise<void> {
  const featureDir = path.join(FEATURES_DIR, featureId);
  const sharedDir = path.join(
    targetDir,
    "packages",
    "shared",
    "types",
    featureId,
  );

  await fs.ensureDir(sharedDir);

  const featureShared = path.join(featureDir, "shared");
  if (await fs.pathExists(featureShared)) {
    await fs.copy(featureShared, sharedDir);
  }
}

export async function copyApp(
  app: "web" | "backend" | "ai",
  targetDir: string,
): Promise<void> {
  const appTemplateDir = path.join(CORE_DIR, "apps", app);

  if (await fs.pathExists(appTemplateDir)) {
    await fs.copy(appTemplateDir, path.join(targetDir, "apps", app));
  }
}

export async function createFeatureIndex(
  featureId: string,
  targetDir: string,
  app: "web" | "backend",
): Promise<void> {
  const featureDir = path.join(FEATURES_DIR, featureId);
  const appDir = path.join(targetDir, "apps", app, "features", featureId);

  const webIndexPath = path.join(featureDir, "web", "index.ts");
  const backendIndexPath = path.join(featureDir, "backend", "index.ts");

  let content = "";

  if (app === "web" && (await fs.pathExists(webIndexPath))) {
    content = await fs.readFile(webIndexPath, "utf-8");
  } else if (app === "backend" && (await fs.pathExists(backendIndexPath))) {
    content = await fs.readFile(backendIndexPath, "utf-8");
  }

  if (content) {
    await fs.writeFile(path.join(appDir, "index.ts"), content);
  }
}
