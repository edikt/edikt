import { describe, test, expect } from "bun:test";
import {
  extractSkillReferences,
  extractScopedReferences,
} from "../skill-extractor";
import type { Section } from "@edikt/types";

function makeSection(heading: string, content: string): Section {
  return {
    heading,
    depth: 1,
    content,
    location: {
      start: { line: 1, column: 1 },
      end: { line: 10, column: 1 },
    },
    children: [],
  };
}

describe("extractSkillReferences", () => {
  test("extracts skill references from markdown links", () => {
    const section = makeSection(
      "Skills",
      "Use [Code Review](.agents/skills/code-review/skill.md) for reviews."
    );

    const refs = extractSkillReferences([section], section.content);

    expect(refs.length).toBe(1);
    expect(refs[0].name).toBe("Code Review");
    expect(refs[0].path).toBe(".agents/skills/code-review/skill.md");
    expect(refs[0].exists).toBe(false);
  });

  test("extracts multiple skill references", () => {
    const content = [
      "- [Review](.agents/skills/review/skill.md)",
      "- [Test](.agents/skills/test/skill.md)",
    ].join("\n");
    const section = makeSection("Skills", content);

    const refs = extractSkillReferences([section], content);
    expect(refs.length).toBe(2);
  });

  test("ignores non-skill links", () => {
    const section = makeSection(
      "Links",
      "See [docs](https://example.com) and [readme](README.md)"
    );

    const refs = extractSkillReferences([section], section.content);
    expect(refs.length).toBe(0);
  });

  test("deduplicates skill references", () => {
    const content =
      "[Skill](.agents/skills/a/skill.md) and [Skill Again](.agents/skills/a/skill.md)";
    const section = makeSection("Skills", content);

    const refs = extractSkillReferences([section], content);
    expect(refs.length).toBe(1);
  });
});

describe("extractScopedReferences", () => {
  test("extracts scoped AGENTS.md references", () => {
    const content = "See frontend/AGENTS.md for frontend guidelines.";
    const section = makeSection("References", content);

    const refs = extractScopedReferences([section], content);
    expect(refs).toContain("frontend/AGENTS.md");
  });

  test("extracts scoped CLAUDE.md references", () => {
    const content = "See shared/CLAUDE.md for config.";
    const section = makeSection("References", content);

    const refs = extractScopedReferences([section], content);
    expect(refs).toContain("shared/CLAUDE.md");
  });

  test("extracts multiple scoped references", () => {
    const content =
      "See frontend/AGENTS.md and backend/AGENTS.md for details.";
    const section = makeSection("References", content);

    const refs = extractScopedReferences([section], content);
    expect(refs.length).toBe(2);
  });

  test("returns empty for content without scoped references", () => {
    const content = "No scoped references here.";
    const section = makeSection("Notes", content);

    const refs = extractScopedReferences([section], content);
    expect(refs.length).toBe(0);
  });
});
