import { defineRule } from "../define-rule";

export const preferSymlinks = defineRule({
  id: "prefer-symlinks",
  description: "Prefer symlinks over duplicated agent files",
  category: "best-practice",
  defaultSeverity: "info",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
