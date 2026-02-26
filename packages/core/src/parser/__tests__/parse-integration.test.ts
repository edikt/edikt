import { describe, test, expect } from "bun:test";
import { parse, parseFile } from "../index";
import { createParser } from "../../adapters/parser/create-parser";
import { createBunYAMLFrontmatterParser } from "../../adapters/frontmatter/bun-yaml-frontmatter";
import { createMemoryFileSystem } from "../../adapters/fs/memory-fs";
import {
  VALID_AGENTS_MD,
  MINIMAL_MD,
  FRONTMATTER_ONLY,
  MALFORMED_FRONTMATTER,
  EMPTY_MD,
  SKILL_FILE,
  SCOPED_REFS,
  NESTED_HEADINGS,
} from "./fixture-content";

const parser = createParser("unified");
const frontmatter = createBunYAMLFrontmatterParser();

describe("parse()", () => {
  test("parses a full AGENTS.md with all features", () => {
    const ast = parse(VALID_AGENTS_MD, {
      parser,
      frontmatter,
      filePath: "AGENTS.md",
    });

    expect(ast.type).toBe("agent-file");
    expect(ast.fileType).toBe("agents.md");
    expect(ast.metadata.filePath).toBe("AGENTS.md");
    expect(ast.metadata.lineCount).toBeGreaterThan(0);
    expect(ast.metadata.wordCount).toBeGreaterThan(0);
    expect(ast.metadata.characterCount).toBeGreaterThan(0);
  });

  test("detects metadata boolean flags", () => {
    const ast = parse(VALID_AGENTS_MD, {
      parser,
      frontmatter,
      filePath: "AGENTS.md",
    });

    expect(ast.metadata.hasProjectOverview).toBe(true);
    expect(ast.metadata.hasStructureSection).toBe(true);
    expect(ast.metadata.hasGuidelinesSection).toBe(true);
    expect(ast.metadata.hasSkillsSection).toBe(true);
    expect(ast.metadata.hasAutoInvokeSection).toBe(true);
    expect(ast.metadata.hasScopedReferences).toBe(true);
  });

  test("extracts frontmatter", () => {
    const ast = parse(VALID_AGENTS_MD, {
      parser,
      frontmatter,
      filePath: "AGENTS.md",
    });

    expect(ast.frontmatter).toBeDefined();
    expect(ast.frontmatter!.name).toBe("test-project");
  });

  test("extracts skill references", () => {
    const ast = parse(VALID_AGENTS_MD, {
      parser,
      frontmatter,
      filePath: "AGENTS.md",
    });

    expect(ast.skillReferences.length).toBeGreaterThan(0);
    expect(ast.skillReferences[0].path).toContain(".agents/skills/");
  });

  test("extracts auto-invoke table", () => {
    const ast = parse(VALID_AGENTS_MD, {
      parser,
      frontmatter,
      filePath: "AGENTS.md",
    });

    expect(ast.autoInvokeTable).toBeDefined();
    expect(ast.autoInvokeTable!.rows.length).toBe(2);
  });

  test("extracts scoped file references", () => {
    const ast = parse(VALID_AGENTS_MD, {
      parser,
      frontmatter,
      filePath: "AGENTS.md",
    });

    expect(ast.scopedFileReferences.length).toBeGreaterThan(0);
    expect(ast.scopedFileReferences).toContain("frontend/AGENTS.md");
  });

  test("parses minimal markdown without frontmatter", () => {
    const ast = parse(MINIMAL_MD, {
      parser,
      frontmatter,
      filePath: "README.md",
    });

    expect(ast.frontmatter).toBeUndefined();
    expect(ast.sections.length).toBeGreaterThan(0);
    expect(ast.sections[0].heading).toBe("Hello World");
  });

  test("parses skill file with frontmatter", () => {
    const ast = parse(SKILL_FILE, {
      parser,
      frontmatter,
      filePath: ".agents/skills/review/skill.md",
    });

    expect(ast.fileType).toBe("skill");
    expect(ast.frontmatter).toBeDefined();
    expect(ast.frontmatter!.name).toBe("code-review");
    expect(ast.frontmatter!.tools).toEqual(["grep", "ast-parser"]);
  });

  test("handles malformed frontmatter gracefully", () => {
    const ast = parse(MALFORMED_FRONTMATTER, {
      parser,
      frontmatter,
      filePath: "bad.md",
    });

    // Should still parse, just without valid frontmatter
    expect(ast.frontmatter).toBeUndefined();
    expect(ast.sections.length).toBeGreaterThan(0);
  });

  test("handles empty content", () => {
    const ast = parse(EMPTY_MD, {
      parser,
      frontmatter,
      filePath: "empty.md",
    });

    expect(ast.type).toBe("agent-file");
    expect(ast.sections.length).toBe(0);
  });

  test("builds section hierarchy correctly", () => {
    const ast = parse(NESTED_HEADINGS, {
      parser,
      frontmatter,
      filePath: "nested.md",
    });

    expect(ast.sections.length).toBe(1); // One H1
    expect(ast.sections[0].heading).toBe("Top Level");
    expect(ast.sections[0].children.length).toBe(2); // Two H2s
    expect(ast.sections[0].children[0].children.length).toBe(1); // One H3
  });

  test("uses filePath to determine fileType", () => {
    expect(
      parse(MINIMAL_MD, { parser, frontmatter, filePath: "AGENTS.md" }).fileType
    ).toBe("agents.md");
    expect(
      parse(MINIMAL_MD, { parser, frontmatter, filePath: "CLAUDE.md" }).fileType
    ).toBe("claude.md");
    expect(
      parse(MINIMAL_MD, { parser, frontmatter, filePath: ".cursorrules" })
        .fileType
    ).toBe("cursorrules");
  });
});

describe("parseFile()", () => {
  test("reads from memory filesystem and parses", async () => {
    const fs = createMemoryFileSystem({
      "AGENTS.md": VALID_AGENTS_MD,
    });

    const ast = await parseFile("AGENTS.md", { fs, parser, frontmatter });

    expect(ast.type).toBe("agent-file");
    expect(ast.fileType).toBe("agents.md");
    expect(ast.metadata.filePath).toBe("AGENTS.md");
    expect(ast.sections.length).toBeGreaterThan(0);
  });

  test("throws for non-existent file", async () => {
    const fs = createMemoryFileSystem({});

    await expect(
      parseFile("missing.md", { fs, parser, frontmatter })
    ).rejects.toThrow("ENOENT");
  });

  test("correctly parses a skill file from memory fs", async () => {
    const fs = createMemoryFileSystem({
      ".agents/skills/review/skill.md": SKILL_FILE,
    });

    const ast = await parseFile(".agents/skills/review/skill.md", {
      fs,
      parser,
      frontmatter,
    });

    expect(ast.fileType).toBe("skill");
    expect(ast.frontmatter!.name).toBe("code-review");
  });
});
