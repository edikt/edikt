import type { Rule } from "@edikt/types";

export interface EdiktPlugin {
  name: string;
  rules?: Rule[];
}

export function createPlugin(plugin: EdiktPlugin): EdiktPlugin {
  return plugin;
}
