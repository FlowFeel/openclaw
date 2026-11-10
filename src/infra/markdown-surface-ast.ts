/**
 * Phosphene MD StructRAG — High-level Surface AST Facade.
 * Backed by @phosphene/prism-ast (axiomatic ingest/emitters, L3-isomorphism
 * verified): canonical node kinds replace the marked token walk. Section
 * grouping semantics preserved: title = H1, sections = H2 groups, H3+
 * remain in section bodies. Zero inline regular expressions.
 */

import { createAstNode } from "@phosphene/prism-ast/core/factory/create-ast-node.js";
import type { AstNode } from "@phosphene/prism-ast/core/types/ast-node.js";
import { mintNodeId } from "@phosphene/prism-ast/core/types/brands.js";
import { NodeKindIndex, isHeading } from "@phosphene/prism-ast/core/types/node-kind.js";
import { emitMarkdown } from "@phosphene/prism-ast/md/emitters/emit-markdown.js";
import { ingestMarkdown } from "@phosphene/prism-ast/md/parsers/ingest-markdown.js";
import { parseFrontmatter, serializeFrontmatter } from "./markdown-frontmatter-parser.js";

export type MarkdownSectionMap = Map<string, string>;

export type MarkdownSurfaceAST = {
  frontmatter: Record<string, string | number | boolean>;
  title: string;
  sections: MarkdownSectionMap;
};

const DEFAULT_TITLE = "Topic Surface";
const DEFAULT_SECTION = "General";

function emitBlocks(nodes: readonly AstNode[]): string {
  const program = createAstNode(mintNodeId(0), NodeKindIndex.Program, null, null, 0, nodes);
  return emitMarkdown(program).trim();
}

function groupBySections(content: string): { title: string; sections: MarkdownSectionMap } {
  const doc = ingestMarkdown(content);
  const sections: MarkdownSectionMap = new Map();
  let title = DEFAULT_TITLE;
  let currentSection = DEFAULT_SECTION;
  let currentNodes: AstNode[] = [];

  const flush = () => {
    if (currentNodes.length > 0) {
      const sectionText = emitBlocks(currentNodes);
      if (sectionText) sections.set(currentSection, sectionText);
      currentNodes = [];
    }
  };

  for (const node of doc.children) {
    if (isHeading(node)) {
      if (node.flags === 1) {
        title = (node.value ?? DEFAULT_TITLE).trim();
      } else if (node.flags === 2) {
        flush();
        currentSection = (node.value ?? DEFAULT_SECTION).trim();
      } else {
        currentNodes.push(node);
      }
    } else {
      currentNodes.push(node);
    }
  }
  flush();

  return { title, sections };
}

export function parseMarkdownSurface(rawMd: string): MarkdownSurfaceAST {
  const { frontmatter, content } = parseFrontmatter(rawMd);
  const { title, sections } = groupBySections(content);
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
