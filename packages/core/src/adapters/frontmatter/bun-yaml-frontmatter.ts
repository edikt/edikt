import type {
  FrontmatterParser,
  FrontmatterResult,
} from "../../ports/frontmatter-parser";

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function createBunYAMLFrontmatterParser(): FrontmatterParser {
  return {
    parse(raw: string): FrontmatterResult {
      const match = raw.match(FRONTMATTER_REGEX);

      if (!match) {
        return { frontmatter: null, content: raw, errors: [] };
      }

      const yamlString = match[1];
      const content = raw.slice(match[0].length);
      const errors: FrontmatterResult["errors"] = [];

      try {
        const { YAML } = Bun;
        const parsed = YAML.parse(yamlString);

        if (
          typeof parsed !== "object" ||
          parsed === null ||
          Array.isArray(parsed)
        ) {
          errors.push({
            message: "Frontmatter must be a YAML object",
            line: 1,
          });
          return { frontmatter: null, content, errors };
        }

        return {
          frontmatter: parsed as Record<string, unknown>,
          content,
          errors,
        };
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Invalid YAML in frontmatter";
        errors.push({ message, line: 1 });
        return { frontmatter: null, content, errors };
      }
    },
  };
}
