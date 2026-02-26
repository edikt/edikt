import { defineRule } from "../define-rule";

export const scopedFileReferenced = defineRule({
  id: "scoped-file-referenced",
  description: "Scoped agent files should be referenced from root AGENTS.md",
  category: "best-practice",
  defaultSeverity: "info",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
