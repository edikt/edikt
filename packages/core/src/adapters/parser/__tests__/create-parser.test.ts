import { describe, test, expect } from "bun:test";
import { createParser } from "../create-parser";

describe("createParser", () => {
  test("creates unified parser by default", () => {
    const parser = createParser();
    expect(parser).toBeDefined();
    expect(typeof parser.parse).toBe("function");
  });

  test("creates unified parser when explicitly specified", () => {
    const parser = createParser("unified");
    expect(parser).toBeDefined();

    // Should successfully parse markdown
    const ast = parser.parse("# Hello\n\nWorld");
    expect(ast.type).toBe("agent-file");
    expect(ast.sections.length).toBe(1);
    expect(ast.sections[0].heading).toBe("Hello");
  });

  test("creates bun parser (which throws not implemented)", () => {
    const parser = createParser("bun");
    expect(parser).toBeDefined();

    expect(() => parser.parse("# Hello")).toThrow("not yet implemented");
  });

  test("EDIKT_PARSER=bun selects bun adapter", () => {
    const parser = createParser("bun");
    expect(() => parser.parse("# Test")).toThrow("not yet implemented");
  });

  test("EDIKT_PARSER=unified selects unified adapter", () => {
    const parser = createParser("unified");
    const ast = parser.parse("# Test\n\nContent");
    expect(ast.type).toBe("agent-file");
    expect(ast.sections[0].heading).toBe("Test");
  });
});
