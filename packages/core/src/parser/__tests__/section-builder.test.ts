import { describe, test, expect } from "bun:test";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import type { MdastRoot } from "../section-builder";
import { buildSections, buildHierarchy } from "../section-builder";
import {
  NESTED_HEADINGS,
  MINIMAL_MD,
  NO_HEADINGS,
  CONTENT_BEFORE_HEADING,
} from "./fixture-content";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkFrontmatter, ["yaml"]);

function parseMdast(content: string): MdastRoot {
  return processor.parse(content) as unknown as MdastRoot;
}

describe("buildSections", () => {
  test("extracts flat sections from markdown with headings", () => {
    const tree = parseMdast(NESTED_HEADINGS);
    const sections = buildSections(tree, NESTED_HEADINGS);

    expect(sections.length).toBe(4);
    expect(sections[0].heading).toBe("Top Level");
    expect(sections[0].depth).toBe(1);
    expect(sections[1].heading).toBe("Second Level A");
    expect(sections[1].depth).toBe(2);
    expect(sections[2].heading).toBe("Third Level");
    expect(sections[2].depth).toBe(3);
    expect(sections[3].heading).toBe("Second Level B");
    expect(sections[3].depth).toBe(2);
  });

  test("creates implicit section for content before first heading", () => {
    const tree = parseMdast(CONTENT_BEFORE_HEADING);
    const sections = buildSections(tree, CONTENT_BEFORE_HEADING);

    expect(sections.length).toBe(2);
    expect(sections[0].heading).toBe("");
    expect(sections[0].depth).toBe(0);
    expect(sections[0].content).toContain("preamble content");
    expect(sections[1].heading).toBe("First Heading");
  });

  test("handles markdown with no headings", () => {
    const tree = parseMdast(NO_HEADINGS);
    const sections = buildSections(tree, NO_HEADINGS);

    expect(sections.length).toBe(1);
    expect(sections[0].heading).toBe("");
    expect(sections[0].depth).toBe(0);
    expect(sections[0].content).toContain("plain text");
  });

  test("accumulates content between headings", () => {
    const tree = parseMdast(NESTED_HEADINGS);
    const sections = buildSections(tree, NESTED_HEADINGS);

    expect(sections[0].content).toContain("Top content");
    expect(sections[1].content).toContain("Content A");
    expect(sections[2].content).toContain("Deep content");
    expect(sections[3].content).toContain("Content B");
  });

  test("handles minimal markdown", () => {
    const tree = parseMdast(MINIMAL_MD);
    const sections = buildSections(tree, MINIMAL_MD);

    expect(sections.length).toBe(1);
    expect(sections[0].heading).toBe("Hello World");
    expect(sections[0].content).toContain("simple markdown");
  });

  test("sets location data on sections", () => {
    const tree = parseMdast(MINIMAL_MD);
    const sections = buildSections(tree, MINIMAL_MD);

    expect(sections[0].location.start.line).toBe(1);
    expect(sections[0].location.start.column).toBeGreaterThan(0);
  });
});

describe("buildHierarchy", () => {
  test("nests sections based on depth", () => {
    const tree = parseMdast(NESTED_HEADINGS);
    const flat = buildSections(tree, NESTED_HEADINGS);
    const hierarchy = buildHierarchy(flat);

    expect(hierarchy.length).toBe(1); // Only the H1
    expect(hierarchy[0].heading).toBe("Top Level");
    expect(hierarchy[0].children.length).toBe(2); // Two H2s
    expect(hierarchy[0].children[0].heading).toBe("Second Level A");
    expect(hierarchy[0].children[0].children.length).toBe(1); // One H3
    expect(hierarchy[0].children[0].children[0].heading).toBe("Third Level");
    expect(hierarchy[0].children[1].heading).toBe("Second Level B");
    expect(hierarchy[0].children[1].children.length).toBe(0);
  });

  test("handles flat list with same-level headings", () => {
    const md = "## A\n\nContent A\n\n## B\n\nContent B\n\n## C\n\nContent C\n";
    const tree = parseMdast(md);
    const flat = buildSections(tree, md);
    const hierarchy = buildHierarchy(flat);

    expect(hierarchy.length).toBe(3);
    expect(hierarchy[0].heading).toBe("A");
    expect(hierarchy[1].heading).toBe("B");
    expect(hierarchy[2].heading).toBe("C");
  });
});
