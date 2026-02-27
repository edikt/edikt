export type FileSystem = {
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, content: string) => Promise<void>;
  exists: (path: string) => Promise<boolean>;
  isDirectory: (path: string) => Promise<boolean>;
  glob: (pattern: string, opts?: { cwd?: string }) => Promise<string[]>;
};
