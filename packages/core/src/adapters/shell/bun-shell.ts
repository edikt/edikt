import type { Shell } from "../../ports/shell";

export function createBunShell(): Shell {
  return {
    exec: async (cmd, args) => {
      try {
        const proc = Bun.spawn([cmd, ...args], {
          stdout: "pipe",
          stderr: "pipe",
        });
        const [stdout, stderr] = await Promise.all([
          new Response(proc.stdout).text(),
          new Response(proc.stderr).text(),
        ]);
        const exitCode = await proc.exited;
        return { stdout, stderr, exitCode };
      } catch (e) {
        return {
          stdout: "",
          stderr: e instanceof Error ? e.message : String(e),
          exitCode: 1,
        };
      }
    },
    which: (bin) => Bun.which(bin) ?? null,
  };
}
