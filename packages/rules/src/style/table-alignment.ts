import { defineRule } from "../define-rule";

export const tableAlignment = defineRule({
  id: "table-alignment",
  description: "Markdown tables must have properly aligned columns",
  category: "style",
  defaultSeverity: "info",
  fixable: true,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
