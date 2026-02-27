import { describe, test, expect } from "bun:test";
import { createContext } from "../context";
import { createMemoryFileSystem } from "../adapters/fs/memory-fs";

describe("createContext", () => {
  test("works with zero arguments (returns functional defaults)", async () => {
    const ctx = await createContext();

    expect(ctx.fs).toBeDefined();
    expect(ctx.parser).toBeDefined();
    expect(ctx.frontmatter).toBeDefined();
    expect(ctx.patternEngine).toBeDefined();
    expect(ctx.shell).toBeDefined();
    expect(ctx.config).toBeDefined();
    expect(ctx.cwd).toBeDefined();
  });

  test("accepts partial override with memory filesystem", async () => {
    const memFs = createMemoryFileSystem({
      "test.md": "# Hello",
    });

    const ctx = await createContext({ fs: memFs });

    expect(ctx.fs).toBe(memFs);
    // Other fields should be defaults
    expect(ctx.parser).toBeDefined();
    expect(ctx.frontmatter).toBeDefined();
  });

  test("accepts config override", async () => {
    const ctx = await createContext({
      config: { rules: { "test-rule": "error" } },
    });

    expect(ctx.config.rules).toEqual({ "test-rule": "error" });
  });

  test("accepts cwd override", async () => {
    const ctx = await createContext({ cwd: "/custom/path" });

    expect(ctx.cwd).toBe("/custom/path");
  });
});
