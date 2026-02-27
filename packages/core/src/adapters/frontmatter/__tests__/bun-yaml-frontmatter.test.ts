import { describe, test, expect } from "bun:test";
import { createBunYAMLFrontmatterParser } from "../bun-yaml-frontmatter";

describe("BunYAML FrontmatterParser", () => {
  const parser = createBunYAMLFrontmatterParser();

  test("extracts valid YAML frontmatter", () => {
    const result = parser.parse("---\nname: test\nscope: root\n---\n# Content");
    expect(result.frontmatter).toEqual({ name: "test", scope: "root" });
    expect(result.content.trim()).toBe("# Content");
    expect(result.errors).toHaveLength(0);
  });

  test("returns null for files without frontmatter", () => {
    const result = parser.parse("# Just Markdown\n\nNo frontmatter here.");
    expect(result.frontmatter).toBeNull();
    expect(result.content).toBe("# Just Markdown\n\nNo frontmatter here.");
  });

  test("reports error for truly invalid YAML", () => {
    // Use YAML that Bun's parser actually rejects
    const result = parser.parse("---\n{unclosed: [\n---\n# Content");
    expect(result.frontmatter).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test("handles empty frontmatter block", () => {
    const result = parser.parse("---\n---\n# Content");
    expect(result.errors).toHaveLength(0);
  });

  test("preserves content after frontmatter", () => {
    const result = parser.parse(
      "---\nname: test\n---\n# Title\n\nBody text here."
    );
    expect(result.content).toBe("# Title\n\nBody text here.");
  });

  test("handles frontmatter with complex YAML", () => {
    const result = parser.parse(
      "---\nname: test\ntools:\n  - grep\n  - ast\ntags:\n  key: value\n---\n# Content"
    );
    expect(result.frontmatter).toBeDefined();
    expect(result.frontmatter!.name).toBe("test");
    expect(result.frontmatter!.tools).toEqual(["grep", "ast"]);
  });

  test("rejects non-object frontmatter", () => {
    const result = parser.parse("---\n- item1\n- item2\n---\n# Content");
    expect(result.frontmatter).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0].message).toContain("must be a YAML object");
  });
});
