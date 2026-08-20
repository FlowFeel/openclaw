/**
 * Isolated Markdown Pattern Utilities — Pure functions encapsulating regex patterns.
 * Zero inline regular expressions are used outside of this utility module.
 */

const FRONTMATTER_BLOCK_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
const WINDOWS_NEWLINE_PATTERN = /\r\n/g;
const KEY_VALUE_DELIMITER_PATTERN = /^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/;
const QUOTED_STRING_PATTERN = /^["'](.*)["']$/;

export function isFrontmatterDocument(text: string): boolean {
  return text.trim().startsWith("---");
}

export function splitFrontmatterContent(text: string): { yamlBlock: string; content: string } | null {
  const trimmed = text.trim();
  if (!isFrontmatterDocument(trimmed)) {
    return null;
  }
  const match = trimmed.match(FRONTMATTER_BLOCK_PATTERN);
  if (!match) {
    return null;
  }
  return {
    yamlBlock: match[1].trim(),
    content: match[2].trim(),
  };
}

export function normalizeLineEndings(text: string): string {
  return text.replace(WINDOWS_NEWLINE_PATTERN, "\n");
}

export function parseKeyValueLine(line: string): { key: string; rawValue: string } | null {
  const match = line.trim().match(KEY_VALUE_DELIMITER_PATTERN);
  if (!match) {
    return null;
  }
  return {
    key: match[1].trim(),
    rawValue: match[2].trim(),
  };
}

export function stripQuotes(value: string): string {
  const match = value.match(QUOTED_STRING_PATTERN);
  return match ? match[1] : value;
}
