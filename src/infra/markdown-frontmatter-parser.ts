/**
 * Pure Frontmatter AST Module — Uses open-source `yaml` package and `markdown-patterns.ts`.
 * Zero inline regular expressions.
 */

import yaml from "yaml";
import { splitFrontmatterContent } from "../utils/markdown-patterns.js";

export function parseFrontmatter(rawMd: string): {
  frontmatter: Record<string, string | number | boolean>;
  content: string;
} {
  const result = splitFrontmatterContent(rawMd);
  if (!result) {
    return { frontmatter: {}, content: rawMd };
  }

  try {
    const parsed = yaml.parse(result.yamlBlock) as Record<string, string | number | boolean>;
    return {
      frontmatter: parsed && typeof parsed === "object" ? parsed : {},
      content: result.content,
    };
  } catch {
    return { frontmatter: {}, content: rawMd };
  }
}

export function serializeFrontmatter(frontmatter: Record<string, unknown>): string {
  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return "";
  }
  const yamlText = yaml.stringify(frontmatter).trim();
  return `---\n${yamlText}\n---\n`;
}
