import type { AutoInvokeTable, AutoInvokeRow, Section } from "@edikt/types";

// Match GFM table rows: | cell | cell | cell |
const TABLE_ROW_REGEX = /^\|(.+)\|$/;
const TABLE_SEP_REGEX = /^\|[\s:|-]+\|$/;

/**
 * Try to extract an auto-invoke table from sections.
 * Looks for a section containing a markdown table with
 * columns: skill, trigger, and optionally scope.
 */
export function tryExtractAutoInvokeTable(
  sections: Section[]
): AutoInvokeTable | undefined {
  for (const section of sections) {
    const result = extractFromSection(section);
    if (result) return result;
    // Recurse into children
    const childResult = tryExtractAutoInvokeTable(section.children);
    if (childResult) return childResult;
  }
  return undefined;
}

function extractFromSection(section: Section): AutoInvokeTable | undefined {
  const lines = section.content.split("\n");
  let headerIdx = -1;
  let headers: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const headerMatch = line.match(TABLE_ROW_REGEX);

    if (headerMatch && i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim();
      if (TABLE_SEP_REGEX.test(nextLine)) {
        headers = headerMatch[1].split("|").map((c) => c.trim().toLowerCase());
        headerIdx = i;
        break;
      }
    }
  }

  if (headerIdx === -1) return undefined;

  // Check this is an auto-invoke table (has skill and trigger columns)
  const skillCol = headers.findIndex(
    (h) => h === "skill" || h === "name" || h === "skill name"
  );
  const triggerCol = headers.findIndex(
    (h) => h === "trigger" || h === "pattern" || h === "glob"
  );

  if (skillCol === -1 || triggerCol === -1) return undefined;

  const scopeCol = headers.findIndex((h) => h === "scope");

  const rows: AutoInvokeRow[] = [];

  // Parse data rows (skip header + separator)
  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    const rowMatch = line.match(TABLE_ROW_REGEX);
    if (!rowMatch) break; // End of table

    const cells = rowMatch[1].split("|").map((c) => c.trim());
    const skill = cells[skillCol];
    const trigger = cells[triggerCol];

    if (skill && trigger) {
      rows.push({
        skill,
        trigger,
        scope: scopeCol !== -1 ? cells[scopeCol] : undefined,
      });
    }
  }

  if (rows.length === 0) return undefined;

  return {
    rows,
    location: section.location,
  };
}
