import { defineRule } from "../define-rule";

export const noTodoInstructions = defineRule({
  id: "no-todo-instructions",
  description: "Instructions should not contain TODO or placeholder text",
  category: "content",
  defaultSeverity: "warn",
  fixable: false,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
