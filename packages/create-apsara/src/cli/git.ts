import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function gitInit(cwd: string): Promise<void> {
  console.log("\n🔧 Initializing git repository...");

  try {
    await execAsync("git init", { cwd });
    await execAsync("git add .", { cwd });
    await execAsync(
      'git commit -m "Initial commit generated with Apsara DevKit"',
      { cwd },
    );
    console.log("✅ Git repository initialized!");
  } catch (error) {
    console.warn("⚠️  Failed to initialize git repository:", error);
  }
}
