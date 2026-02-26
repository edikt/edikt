import type { MarkdownParser } from "../../ports/markdown-parser";

/**
 * Experimental parser using Bun.markdown (native Zig parser).
 * Activate with EDIKT_PARSER=bun environment variable.
 *
 * STATUS: Stub. Bun.markdown doesn't produce a walkable AST —
 * only renders to HTML/callbacks. This adapter will use the
 * render() callback API to reconstruct sections.
 *
 * Known limitations:
 * - Bun.markdown API is marked as unstable
 * - No AST traversal (must reconstruct from callbacks)
 * - May miss edge cases that unified handles
 */
export function createBunMarkdownParser(): MarkdownParser {
  return {
    parse(_content, _opts) {
      throw new Error(
        "Bun.markdown parser is not yet implemented. " +
          "Use EDIKT_PARSER=unified (default) or contribute the adapter."
      );
    },
  };
}
