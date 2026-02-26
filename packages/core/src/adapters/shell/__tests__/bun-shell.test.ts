import { describe, test, expect } from "bun:test";
import { createBunShell } from "../bun-shell";

describe("BunShell", () => {
  const shell = createBunShell();

  test("executes a simple command", async () => {
    const result = await shell.exec("echo", ["hello"]);
    expect(result.stdout.trim()).toBe("hello");
    expect(result.exitCode).toBe(0);
  });

  test("returns non-zero exit code for failed commands", async () => {
    const result = await shell.exec("false", []);
    expect(result.exitCode).not.toBe(0);
  });

  test("captures stderr", async () => {
    const result = await shell.exec("sh", [
      "-c",
      "echo error >&2",
    ]);
    expect(result.stderr.trim()).toBe("error");
  });

  test("which finds existing commands", () => {
    const result = shell.which("echo");
    expect(result).not.toBeNull();
  });

  test("which returns null for nonexistent commands", () => {
    const result = shell.which("nonexistent-command-xyz");
    expect(result).toBeNull();
  });
});
