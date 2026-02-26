import type { LintResult } from "@edikt/types";

export type Reporter = {
  format: (results: LintResult[]) => string;
};
