import { describe, test, expect } from "bun:test";
import { resolveSkillReferences, discoverSkills } from "../skill-resolver";
import { createMemoryFileSystem } from "../../adapters/fs/memory-fs";
import type { SkillReference } from "@edikt/types";

describe("resolveSkillReferences", () => {
  test("marks existing skills as exists=true", async () => {
    const fs = createMemoryFileSystem({
      "project/.agents/skills/review/skill.md": "# Review Skill",
    });

    const refs: SkillReference[] = [
      {
        name: "Review",
        path: ".agents/skills/review/skill.md",
        location: {
          start: { line: 1, column: 1 },
          end: { line: 1, column: 1 },
        },
      },
    ];

    const resolved = await resolveSkillReferences(refs, fs, {
      rootDir: "project",
    });

    expect(resolved[0].exists).toBe(true);
  });

  test("marks missing skills as exists=false", async () => {
    const fs = createMemoryFileSystem({});

    const refs: SkillReference[] = [
      {
        name: "Missing",
        path: ".agents/skills/missing/skill.md",
        location: {
          start: { line: 1, column: 1 },
          end: { line: 1, column: 1 },
        },
      },
    ];

    const resolved = await resolveSkillReferences(refs, fs, {
      rootDir: "project",
    });

    expect(resolved[0].exists).toBe(false);
  });

  test("handles multiple references", async () => {
    const fs = createMemoryFileSystem({
      "project/.agents/skills/a/skill.md": "# A",
    });

    const refs: SkillReference[] = [
      {
        name: "A",
        path: ".agents/skills/a/skill.md",
        location: {
          start: { line: 1, column: 1 },
          end: { line: 1, column: 1 },
        },
      },
      {
        name: "B",
        path: ".agents/skills/b/skill.md",
        location: {
          start: { line: 2, column: 1 },
          end: { line: 2, column: 1 },
        },
      },
    ];

    const resolved = await resolveSkillReferences(refs, fs, {
      rootDir: "project",
    });

    expect(resolved[0].exists).toBe(true);
    expect(resolved[1].exists).toBe(false);
  });
});

describe("discoverSkills", () => {
  test("discovers skill.md files in default directory", async () => {
    const fs = createMemoryFileSystem({
      ".agents/skills/review/skill.md": "# Review",
      ".agents/skills/test/skill.md": "# Test",
      ".agents/other.md": "# Other",
    });

    const skills = await discoverSkills(fs, { rootDir: "." });
    expect(skills).toContain(".agents/skills/review/skill.md");
    expect(skills).toContain(".agents/skills/test/skill.md");
  });

  test("uses custom skills directory", async () => {
    const fs = createMemoryFileSystem({
      "custom/skills/a/skill.md": "# A",
    });

    const skills = await discoverSkills(fs, {
      rootDir: ".",
      skillsDirectory: "custom/skills",
    });
    expect(skills).toContain("custom/skills/a/skill.md");
  });
});
