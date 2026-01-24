#!/usr/bin/env node
import { Command } from "commander";
import { generate } from "./cli/generate.js";
import { init } from "./cli/init.js";

const program = new Command();

program
  .name("create-apsara")
  .description("Generate modular web application projects")
  .version("0.0.1");

program
  .command("generate <name>")
  .alias("g")
  .description("Generate a new project")
  .option("--preset <name>", "Use a preset (minimal, standard, full)")
  .option("--apps <list>", "Comma-separated list of apps (web,backend,ai)")
  .option("--features <list>", "Comma-separated list of features")
  .option("--no-git", "Skip git initialization")
  .option("--no-install", "Skip dependency installation")
  .action(async (name, options) => {
    await generate({ name, ...options });
  });

program
  .command("init")
  .description("Initialize feature modules in an existing project")
  .action(init);

program.parse();
