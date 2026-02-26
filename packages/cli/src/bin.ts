#!/usr/bin/env bun
import { Command } from "commander";

const program = new Command();

program
  .name("edikt")
  .description("The quality toolchain for AI agent configuration files")
  .version("0.0.0");

program
  .command("lint [files...]")
  .description("Lint agent configuration files")
  .action(() => {
    console.log("edikt lint — not yet implemented");
  });

program
  .command("fmt [files...]")
  .description("Format agent configuration files")
  .action(() => {
    console.log("edikt fmt — not yet implemented");
  });

program
  .command("init")
  .description("Initialize agent architecture in a project")
  .action(() => {
    console.log("edikt init — not yet implemented");
  });

program
  .command("sync")
  .description("Sync AGENTS.md to tool-specific files")
  .action(() => {
    console.log("edikt sync — not yet implemented");
  });

program
  .command("doctor")
  .description("Run health checks on agent setup")
  .action(() => {
    console.log("edikt doctor — not yet implemented");
  });

program
  .command("check")
  .description("Run lint + fmt --check + doctor (CI mode)")
  .action(() => {
    console.log("edikt check — not yet implemented");
  });

program.parse();
