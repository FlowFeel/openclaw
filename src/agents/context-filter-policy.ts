/**
 * Pure Context Filter Policy Module — Filters workspace context files for prompt assembly.
 * Enables ultra-slim system prompts ("dynamic_only" / "slim_persona"), beating Pi's baseline (< 480 tokens).
 * Zero inline regular expressions.
 */

import type { EmbeddedContextFile } from "./embedded-agent-helpers.js";
import { getContextFileBasename } from "./system-prompt.js";

export type ContextFilterMode = "all" | "slim_persona" | "dynamic_only";

export type ContextFilterOptions = {
  mode?: ContextFilterMode;
  excludeBasenames?: string[];
  includeBasenames?: string[];
};

const STATIC_PERSONA_BASENAMES = new Set<string>([
  "soul.md",
  "agents.md",
  "identity.md",
  "tools.md",
  "bootstrap.md",
]);

export function filterContextFilesForPrompt(
  files: EmbeddedContextFile[] = [],
  options: ContextFilterOptions = {},
): EmbeddedContextFile[] {
  const mode = options.mode ?? "all";
  const customExclude = new Set((options.excludeBasenames ?? []).map((b) => b.toLowerCase().trim()));
  const customInclude = new Set((options.includeBasenames ?? []).map((b) => b.toLowerCase().trim()));

  if (mode === "all" && customExclude.size === 0 && customInclude.size === 0) {
    return files;
  }

  const result: EmbeddedContextFile[] = [];

  for (const file of files) {
    const basename = getContextFileBasename(file.path);

    if (customInclude.size > 0 && !customInclude.has(basename)) {
      continue;
    }
    if (customExclude.has(basename)) {
      continue;
    }

    if (mode === "dynamic_only") {
      if (STATIC_PERSONA_BASENAMES.has(basename)) {
        continue;
      }
      result.push(file);
    } else if (mode === "slim_persona") {
      if (basename === "soul.md") {
        result.push({
          path: file.path,
          content: "SOUL.md: Follow agent persona and tone.",
        });
      } else if (basename === "agents.md") {
        result.push({
          path: file.path,
          content: "AGENTS.md: Core operational guidelines.",
        });
      } else if (STATIC_PERSONA_BASENAMES.has(basename)) {
        continue;
      } else {
        result.push(file);
      }
    } else {
      result.push(file);
    }
  }

  return result;
}
