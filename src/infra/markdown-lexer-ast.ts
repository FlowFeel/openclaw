/**
 * Pure Lexer AST Module — Uses open-source `marked` lexer for Markdown AST tokenization.
 * Zero inline regular expressions.
 */

import { marked, type Tokens, type TokensList } from "marked";

export type MarkdownSectionMap = Map<string, string>;

export function tokenizeMarkdownContent(content: string): TokensList {
  return marked.lexer(content);
}

export function groupTokensBySections(tokens: TokensList): {
  title: string;
  sections: MarkdownSectionMap;
} {
  const sections: MarkdownSectionMap = new Map();
  let title = "Topic Surface";
  let currentSection = "General";
  let currentTokens: Tokens.Generic[] = [];

  const flush = () => {
    if (currentTokens.length > 0) {
      const sectionText = currentTokens.map((t) => t.raw).join("").trim();
      sections.set(currentSection, sectionText);
      currentTokens = [];
    }
  };

  for (const token of tokens) {
    if (token.type === "heading") {
      if (token.depth === 1) {
        title = token.text.trim();
      } else if (token.depth === 2) {
        flush();
        currentSection = token.text.trim();
      } else {
        currentTokens.push(token);
      }
    } else {
      currentTokens.push(token);
    }
  }
  flush();

  return { title, sections };
}
