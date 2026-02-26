import type { FileSystem } from "../../ports/file-system";

export function createMemoryFileSystem(
  files: Record<string, string> = {}
): FileSystem {
  const store = new Map(Object.entries(files));

  return {
    readFile: async (path) => {
      const content = store.get(path);
      if (content === undefined) throw new Error(`ENOENT: ${path}`);
      return content;
    },
    writeFile: async (path, content) => {
      store.set(path, content);
    },
    exists: async (path) => store.has(path),
    isDirectory: async (path) => {
      const prefix = path.endsWith("/") ? path : `${path}/`;
      return [...store.keys()].some((k) => k.startsWith(prefix));
    },
    glob: async (pattern, opts) => {
      const g = new Bun.Glob(pattern);
      const cwd = opts?.cwd ?? ".";
      return [...store.keys()]
        .map((k) =>
          cwd !== "." && k.startsWith(`${cwd}/`) ? k.slice(cwd.length + 1) : k
        )
        .filter((k) => g.match(k));
    },
  };
}
