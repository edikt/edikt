import { defineRule } from "../define-rule";

export const noAbsolutePaths = defineRule({
  id: "no-absolute-paths",
  description: "Agent files should not contain absolute filesystem paths",
  category: "best-practice",
  defaultSeverity: "warn",
  fixable: false,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
