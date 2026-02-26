import { describe, test, expect } from "bun:test";
import { tryExtractAutoInvokeTable } from "../table-parser";
import type { Section } from "@edikt/types";

function makeSection(heading: string, content: string, depth = 1): Section {
  return {
    heading,
    depth,
    content,
    location: {
      start: { line: 1, column: 1 },
      end: { line: 1, column: 1 },
    },
    children: [],
  };
}

describe("tryExtractAutoInvokeTable", () => {
  test("extracts auto-invoke table with skill and trigger columns", () => {
    const section = makeSection(
      "Auto-Invoke",
      "| Skill | Trigger | Scope |\n|-------|---------|-------|\n| lint | *.ts | root |\n| test | *.test.ts | directory |"
    );

    const result = tryExtractAutoInvokeTable([section]);

    expect(result).toBeDefined();
    expect(result!.rows.length).toBe(2);
    expect(result!.rows[0].skill).toBe("lint");
    expect(result!.rows[0].trigger).toBe("*.ts");
    expect(result!.rows[0].scope).toBe("root");
    expect(result!.rows[1].skill).toBe("test");
    expect(result!.rows[1].trigger).toBe("*.test.ts");
    expect(result!.rows[1].scope).toBe("directory");
  });

  test("returns undefined for table without skill/trigger columns", () => {
    const section = makeSection(
      "Data",
      "| Name | Value |\n|------|-------|\n| foo | bar |"
    );

    const result = tryExtractAutoInvokeTable([section]);
    expect(result).toBeUndefined();
  });

  test("returns undefined for sections without tables", () => {
    const section = makeSection("Notes", "Just some text, no tables here.");

    const result = tryExtractAutoInvokeTable([section]);
    expect(result).toBeUndefined();
  });

  test("finds table in nested children", () => {
    const child = makeSection(
      "Auto-Invoke",
      "| Skill | Trigger |\n|-------|---------|\n| lint | *.ts |",
      2
    );
    const parent: Section = {
      heading: "Skills",
      depth: 1,
      content: "Overview of skills.",
      location: { start: { line: 1, column: 1 }, end: { line: 1, column: 1 } },
      children: [child],
    };

    const result = tryExtractAutoInvokeTable([parent]);

    expect(result).toBeDefined();
    expect(result!.rows.length).toBe(1);
    expect(result!.rows[0].skill).toBe("lint");
  });

  test("handles table with name column alias", () => {
    const section = makeSection(
      "Skills",
      "| Name | Pattern |\n|------|---------|\n| format | *.ts |"
    );

    // "name" maps to skill, "pattern" maps to trigger
    const result = tryExtractAutoInvokeTable([section]);
    expect(result).toBeDefined();
    expect(result!.rows[0].skill).toBe("format");
  });
});
