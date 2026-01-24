import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function install(cwd: string): Promise<void> {
  console.log("\n📦 Installing dependencies...");

  try {
    const { stdout, stderr } = await execAsync("pnpm install", {
      encoding: "utf-8",
    });
    if (stdout) console.log(stdout);
    if (stderr) console.warn(stderr);
    console.log("✅ Dependencies installed successfully!");
  } catch (error) {
    console.error("❌ Failed to install dependencies:", error);
    throw error;
  }
}

export async function runScript(cwd: string, script: string): Promise<void> {
  try {
    const { stdout, stderr } = await execAsync(script, { encoding: "utf-8" });
    if (stdout) console.log(stdout);
    if (stderr) console.warn(stderr);
  } catch (error) {
    console.error(`❌ Failed to run script "${script}":`, error);
    throw error;
  }
}
