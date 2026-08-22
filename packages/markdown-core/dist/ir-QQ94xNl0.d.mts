import { t as MarkdownTableMode } from "./types-C6mGxBC3.mjs";

//#region packages/markdown-core/src/assistant-transcript-headers.d.ts
type AssistantTranscriptRole = "assistant" | "developer" | "system" | "user";
type AssistantTranscriptRoleHeaderKind = "angle_role_header" | "role_timestamp_bracket" | "timestamp_role_colon";
//#endregion
//#region packages/markdown-core/src/ir-spans.d.ts
type MarkdownStyle = "bold" | "italic" | "underline" | "strikethrough" | "code" | "code_block" | "spoiler" | "blockquote" | "heading_1" | "heading_2" | "heading_3" | "heading_4" | "heading_5" | "heading_6";
type MarkdownStyleSpan = {
  start: number;
  end: number;
  style: MarkdownStyle;
  language?: string;
};
type MarkdownLinkSpan = {
  start: number;
  end: number;
  href: string;
};
type MarkdownAnnotationSpan = {
  start: number;
  end: number;
  type: "assistant_transcript_role";
  kind: AssistantTranscriptRoleHeaderKind;
  role: AssistantTranscriptRole;
};
//#endregion
//#region packages/markdown-core/src/ir.d.ts
type MarkdownListItemMarker = {
  kind: "bullet" | "ordered";
  listMarker?: {
    start: number;
    end: number;
  };
  task?: true;
  taskMarker?: {
    start: number;
    end: number;
  }; /** Parser-owned identity and rendered span for block-native list emitters. */
  listId?: number;
  parentListId?: number;
  depth?: number;
  start?: number;
  end?: number;
};
type MarkdownIR = {
  text: string;
  styles: MarkdownStyleSpan[];
  links: MarkdownLinkSpan[];
  annotations?: MarkdownAnnotationSpan[];
  listItems?: MarkdownListItemMarker[];
};
type MarkdownTableAlignment = "left" | "center" | "right";
type MarkdownTableData = {
  headers: string[];
  rows: string[][];
  aligns?: (MarkdownTableAlignment | undefined)[];
};
type MarkdownTableCell = {
  text: string;
  styles: MarkdownStyleSpan[];
  links: MarkdownLinkSpan[];
  annotations?: MarkdownAnnotationSpan[];
};
type MarkdownTableMeta = MarkdownTableData & {
  placeholderOffset: number;
  headerCells: MarkdownTableCell[];
  rowCells: MarkdownTableCell[][];
};
type MarkdownParseOptions = {
  /** Mark assistant-authored transcript-role headers after Markdown parsing. */assistantTranscriptRoleHeaders?: boolean;
  linkify?: boolean;
  enableSpoilers?: boolean; /** Parse authored HTML <u>/<ins> tags into underline spans. */
  enableHtmlUnderline?: boolean; /** Preserve task-list checkboxes as semantic list markers. */
  enableTaskLists?: boolean;
  headingStyle?: "none" | "bold" | "rich";
  blockquotePrefix?: string;
  autolink?: boolean; /** How to render tables (off|bullets|code|block). Default: off. */
  tableMode?: MarkdownTableMode; /** Visible text emitted for a thematic break. Default: ───. */
  horizontalRuleText?: string; /** Preserve source line spacing after headings and code blocks. */
  preserveSourceBlockSpacing?: boolean;
};
declare function sliceMarkdownIR(ir: MarkdownIR, start: number, end: number): MarkdownIR;
declare function markdownToIR(markdown: string, options?: MarkdownParseOptions): MarkdownIR;
declare function markdownToIRWithMeta(markdown: string, options?: MarkdownParseOptions): {
  ir: MarkdownIR;
  hasTables: boolean;
  tables: MarkdownTableMeta[];
};
declare function chunkMarkdownIR(ir: MarkdownIR, limit: number): MarkdownIR[];
//#endregion
export { MarkdownTableMeta as a, markdownToIRWithMeta as c, MarkdownLinkSpan as d, MarkdownStyle as f, MarkdownTableData as i, sliceMarkdownIR as l, MarkdownParseOptions as n, chunkMarkdownIR as o, MarkdownStyleSpan as p, MarkdownTableCell as r, markdownToIR as s, MarkdownIR as t, MarkdownAnnotationSpan as u };