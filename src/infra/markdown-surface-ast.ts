/**
 * Phosphene MD StructRAG — High-level Surface AST Facade.
 * Pure DFT module composing frontmatter parser and lexer AST modules.
 * Zero inline regular expressions.
 */

import {
  parseFrontmatter,
  serializeFrontmatter,
} from "./markdown-frontmatter-parser.js";
import {
  groupTokensBySections,
  tokenizeMarkdownContent,
  type MarkdownSectionMap,
} from "./markdown-lexer-ast.js";

export type MarkdownSurfaceAST = {
  frontmatter: Record<string, string | number | boolean>;
  title: string;
  sections: MarkdownSectionMap;
};

export function parseMarkdownSurface(rawMd: string): MarkdownSurfaceAST {
  const { frontmatter, content } = parseFrontmatter(rawMd);
  const tokens = tokenizeMarkdownContent(content);
  const { title, sections } = groupTokensBySections(tokens);

  return { frontmatter, title, sections };
}

export function renderMarkdownSurface(ast: MarkdownSurfaceAST): string {
  const parts: string[] = [];

  const frontmatterStr = serializeFrontmatter(ast.frontmatter);
  if (frontmatterStr) {
    parts.push(frontmatterStr.trim());
  }

  parts.push(`# ${ast.title}\n`);

  for (const [heading, body] of ast.sections) {
    parts.push(`## ${heading}`);
    if (body) {
      parts.push(body);
    }
    parts.push("");
  }

  return parts.join("\n").trim() + "\n";
}

export function extractMarkdownSection(rawMd: string, sectionTitle: string): string | null {
  const ast = parseMarkdownSurface(rawMd);
  const normalizedTarget = sectionTitle.toLowerCase().trim();

  for (const [heading, body] of ast.sections) {
    if (heading.toLowerCase().trim() === normalizedTarget) {
      return body;
    }
  }

  return null;
}

export function addDecisionToMarkdownSurface(rawMd: string, decision: string): string {
  const ast = parseMarkdownSurface(rawMd);
  const existing = ast.sections.get("Active Decisions") || "";
  const formattedItem = decision.startsWith("- ") ? decision : `- ${decision}`;

  const updatedBody = existing ? `${existing}\n${formattedItem}` : formattedItem;
  ast.sections.set("Active Decisions", updatedBody);

  return renderMarkdownSurface(ast);
}
