/**
 * Deterministic Frontmatter Extractor — Index-Based Slicing + YAML 1.2 Parsing.
 *
 * Replaces regex-based frontmatter splitters with deterministic index slicing (indexOf('\n---'))
 * paired directly with yaml.parse to achieve 100% ReDoS immunity and spec-compliant YAML 1.2 parsing.
 *
 * @dft
 * - Pure function (A1): No I/O, no side effects, deterministic execution.
 */

import { parse as parseYaml } from "yaml";
import type { ExtractedFrontmatter } from "./types.js";

/**
 * Extracts frontmatter from a Markdown document using deterministic substring slicing.
 */
export function extractFrontmatter(content: string): ExtractedFrontmatter {
  if (typeof content !== "string" || !content.startsWith("---")) {
    return {
      frontmatter: {},
      frontmatterRaw: "",
      body: content ?? "",
      hasFrontmatter: false,
    };
  }

  // Find the end of the opening '---' line
  const firstLineEnd = content.indexOf("\n", 3);
  if (firstLineEnd === -1) {
    return {
      frontmatter: {},
      frontmatterRaw: "",
      body: content,
      hasFrontmatter: false,
    };
  }

  // Check that the opening line contains only '---' (with optional \r)
  const openingFence = content.slice(0, firstLineEnd).trim();
  if (openingFence !== "---") {
    return {
      frontmatter: {},
      frontmatterRaw: "",
      body: content,
      hasFrontmatter: false,
    };
  }

  // Locate closing delimiter '\n---'
  const closeIndex = content.indexOf("\n---", firstLineEnd);
  if (closeIndex === -1) {
    return {
      frontmatter: {},
      frontmatterRaw: "",
      body: content,
      hasFrontmatter: false,
    };
  }

  // Ensure the closing delimiter line is strictly '---'
  const afterCloseLineBreak = content.indexOf("\n", closeIndex + 4);
  const closingLine = afterCloseLineBreak === -1
    ? content.slice(closeIndex + 1).trim()
    : content.slice(closeIndex + 1, afterCloseLineBreak).trim();

  if (closingLine !== "---") {
    // If it was e.g. '\n---some-other-text', find next valid closing delimiter
    let searchOffset = closeIndex + 4;
    let foundValid = false;
    let validCloseIndex = -1;
    let validAfterClose = -1;

    while (searchOffset < content.length) {
      const nextClose = content.indexOf("\n---", searchOffset);
      if (nextClose === -1) break;
      const nextAfterBreak = content.indexOf("\n", nextClose + 4);
      const nextLine = nextAfterBreak === -1
        ? content.slice(nextClose + 1).trim()
        : content.slice(nextClose + 1, nextAfterBreak).trim();
      if (nextLine === "---") {
        foundValid = true;
        validCloseIndex = nextClose;
        validAfterClose = nextAfterBreak;
        break;
      }
      searchOffset = nextClose + 4;
    }

    if (!foundValid) {
      return {
        frontmatter: {},
        frontmatterRaw: "",
        body: content,
        hasFrontmatter: false,
      };
    }

    const frontmatterRaw = content.slice(firstLineEnd + 1, validCloseIndex).trim();
    const body = validAfterClose !== -1 ? content.slice(validAfterClose + 1).trim() : "";
    let frontmatter: Record<string, unknown> = {};
    try {
      const parsed = parseYaml(frontmatterRaw, { schema: "core" });
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        frontmatter = parsed as Record<string, unknown>;
      }
    } catch {
      // Return empty frontmatter on syntax errors while preserving body
      frontmatter = {};
    }

    return {
      frontmatter,
      frontmatterRaw,
      body,
      hasFrontmatter: true,
    };
  }

  const frontmatterRaw = content.slice(firstLineEnd + 1, closeIndex).trim();
  const body = afterCloseLineBreak !== -1 ? content.slice(afterCloseLineBreak + 1).trim() : "";

  let frontmatter: Record<string, unknown> = {};
  try {
    const parsed = parseYaml(frontmatterRaw, { schema: "core" });
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      frontmatter = parsed as Record<string, unknown>;
    }
  } catch {
    frontmatter = {};
  }

  return {
    frontmatter,
    frontmatterRaw,
    body,
    hasFrontmatter: true,
  };
}
