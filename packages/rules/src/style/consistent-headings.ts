import { defineRule } from "../define-rule";

export const consistentHeadings = defineRule({
  id: "consistent-headings",
  description: "Headings must use a consistent style (atx or setext)",
  category: "style",
  defaultSeverity: "warn",
  fixable: true,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
