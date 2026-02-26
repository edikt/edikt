import { describe, test, expect } from "bun:test";
import { analyzeFile } from "../file-analyzer";
import { parse } from "../../parser";
import { createParser } from "../../adapters/parser/create-parser";
import { createBunYAMLFrontmatterParser } from "../../adapters/frontmatter/bun-yaml-frontmatter";
import { VALID_AGENTS_MD, MINIMAL_MD } from "../../parser/__tests__/fixture-content";

const parser = createParser("unified");
const frontmatter = createBunYAMLFrontmatterParser();

describe("analyzeFile", () => {
  test("returns metadata from parsed AST", () => {
    const ast = parse(VALID_AGENTS_MD, {
      parser,
      frontmatter,
      filePath: "AGENTS.md",
    });

    const metadata = analyzeFile(ast);

    expect(metadata.filePath).toBe("AGENTS.md");
    expect(metadata.lineCount).toBeGreaterThan(0);
    expect(metadata.wordCount).toBeGreaterThan(0);
    expect(metadata.characterCount).toBeGreaterThan(0);
  });

  test("detects metadata flags correctly", () => {
    const ast = parse(VALID_AGENTS_MD, {
      parser,
      frontmatter,
      filePath: "AGENTS.md",
    });

    const metadata = analyzeFile(ast);

    expect(metadata.hasProjectOverview).toBe(true);
    expect(metadata.hasStructureSection).toBe(true);
    expect(metadata.hasGuidelinesSection).toBe(true);
  });

  test("returns false flags for minimal markdown", () => {
    const ast = parse(MINIMAL_MD, {
      parser,
      frontmatter,
      filePath: "README.md",
    });

    const metadata = analyzeFile(ast);

    expect(metadata.hasProjectOverview).toBe(false);
    expect(metadata.hasStructureSection).toBe(false);
  });
});
