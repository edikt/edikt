import type { FileSystem } from "../../ports/file-system";

export function createBunFileSystem(): FileSystem {
  return {
    readFile: (path) => Bun.file(path).text(),
    writeFile: (path, content) => Bun.write(path, content).then(() => {}),
    exists: (path) => Bun.file(path).exists(),
    isDirectory: async (path) => {
      try {
        const fs = await import("node:fs/promises");
        const stat = await fs.stat(path);
        return stat.isDirectory();
      } catch {
        return false;
      }
    },
    glob: async (pattern, opts) => {
      const g = new Bun.Glob(pattern);
      return Array.fromAsync(g.scan({ cwd: opts?.cwd ?? ".", onlyFiles: true }));
    },
  };
}
