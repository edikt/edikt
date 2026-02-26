import { describe, test, expect } from "bun:test";
import { createMemoryFileSystem } from "../memory-fs";

describe("MemoryFileSystem", () => {
  test("reads files that exist", async () => {
    const fs = createMemoryFileSystem({
      "hello.txt": "Hello World",
    });

    const content = await fs.readFile("hello.txt");
    expect(content).toBe("Hello World");
  });

  test("throws ENOENT for missing files", async () => {
    const fs = createMemoryFileSystem({});

    await expect(fs.readFile("missing.txt")).rejects.toThrow("ENOENT");
  });

  test("writes and reads back files", async () => {
    const fs = createMemoryFileSystem({});

    await fs.writeFile("new.txt", "new content");
    const content = await fs.readFile("new.txt");
    expect(content).toBe("new content");
  });

  test("checks file existence", async () => {
    const fs = createMemoryFileSystem({
      "exists.txt": "content",
    });

    expect(await fs.exists("exists.txt")).toBe(true);
    expect(await fs.exists("missing.txt")).toBe(false);
  });

  test("detects directories from child paths", async () => {
    const fs = createMemoryFileSystem({
      "dir/file.txt": "content",
      "dir/sub/other.txt": "content",
    });

    expect(await fs.isDirectory("dir")).toBe(true);
    expect(await fs.isDirectory("dir/sub")).toBe(true);
    expect(await fs.isDirectory("dir/file.txt")).toBe(false);
    expect(await fs.isDirectory("nonexistent")).toBe(false);
  });

  test("globs files matching patterns", async () => {
    const fs = createMemoryFileSystem({
      "src/a.ts": "",
      "src/b.ts": "",
      "src/c.js": "",
      "test/d.ts": "",
    });

    const tsFiles = await fs.glob("**/*.ts");
    expect(tsFiles).toContain("src/a.ts");
    expect(tsFiles).toContain("src/b.ts");
    expect(tsFiles).toContain("test/d.ts");
    expect(tsFiles).not.toContain("src/c.js");
  });

  test("starts empty by default", async () => {
    const fs = createMemoryFileSystem();

    expect(await fs.exists("anything")).toBe(false);
  });
});
