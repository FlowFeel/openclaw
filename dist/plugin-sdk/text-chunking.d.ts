import { t as convertMarkdownTables } from "../tables-BBMGs0qO.js";
import { $ as stripToolCallXmlTags, A as MarkdownParseOptions, B as MarkdownStyle, C as RenderStyleMap, E as RenderMarkdownIRChunksWithinLimitOptions, F as markdownToIR, G as sanitizeAssistantVisibleText, H as FormatCapabilityProfile, I as markdownToIRWithMeta, J as stripAssistantInternalScaffolding, K as sanitizeAssistantVisibleTextWithOptions, L as sliceMarkdownIR, N as MarkdownTableMeta, O as renderMarkdownIRChunksWithinLimit, P as chunkMarkdownIR, R as MarkdownAnnotationSpan, S as RenderOptions, T as renderMarkdownWithMarkers, U as AssistantVisibleTextSanitizerProfile, V as MarkdownStyleSpan, _ as findCodeRegions, b as isAutoLinkedFileRef, c as stripInlineDirectiveTagsFromMessageForDisplay, d as ReasoningTagMode, g as CodeRegion, h as stripReasoningTagsFromText, j as MarkdownTableCell, k as MarkdownIR, l as sanitizeTerminalText, n as DisplayMessageWithContent, o as stripInlineDirectiveTagsForDelivery, p as ReasoningTagTrim, q as sanitizeAssistantVisibleTextWithProfile, r as InlineDirectiveParseResult, s as stripInlineDirectiveTagsForDisplay, t as chunkItems, u as stripMarkdown, v as isInsideCode, w as RenderStyleMarker, x as RenderLink, y as FILE_REF_EXTENSIONS_WITH_TLD, z as MarkdownLinkSpan } from "../chunk-items-ChyXgHjr.js";
import { n as hasSystemMark, r as prefixSystemMessage, t as SYSTEM_MARK } from "../system-message-BaqODHMh.js";

//#region packages/markdown-core/src/chunk-text.d.ts
type TextChunkRange = {
  start: number;
  end: number;
};
type ChunkTextRangesOptions = {
  limit: number;
  mode?: "hard" | "preferred";
};
/**
 * Splits text into contiguous UTF-16 ranges without dropping separator whitespace.
 * Preferred mode selects paragraph, newline, then whitespace boundaries.
 */
declare function chunkTextRanges(text: string, options: ChunkTextRangesOptions): TextChunkRange[];
//#endregion
//#region packages/markdown-core/src/html-tags.d.ts
type HtmlTagToken = {
  raw: string;
  start: number;
  end: number;
  name: string;
  closing: boolean;
  selfClosing: boolean;
};
/** Tokenizes valid open/close HTML tags with Markdown-It's quote-aware grammar. */
declare function tokenizeHtmlTags(html: string): Generator<HtmlTagToken>;
//#endregion
//#region packages/markdown-core/src/render-attributed.d.ts
type AttributedRange<TStyle extends string> = {
  start: number;
  length: number;
  style: TStyle;
};
/** Renderer hooks for converting Markdown IR into text plus native style ranges. */
type AttributedRenderOptions<TStyle extends string> = {
  styleMap: Partial<Record<MarkdownStyle, TStyle>>;
  annotationStyleMap?: Partial<Record<MarkdownAnnotationSpan["type"], TStyle>>; /** Returns text appended after a link label; appended text remains unstyled. */
  renderLink?: (link: MarkdownLinkSpan, text: string, context: {
    origin: "authored" | "linkify";
  }) => string;
  trimEnd?: boolean;
};
/** Renders Markdown IR into text plus UTF-16 style ranges for attributed-text targets. */
declare function renderMarkdownWithAttributedRanges<TStyle extends string>(ir: MarkdownIR, options: AttributedRenderOptions<TStyle>, profile?: FormatCapabilityProfile): {
  text: string;
  ranges: AttributedRange<TStyle>[];
};
//#endregion
//#region src/plugin-sdk/text-chunking.d.ts
/**
 * Splits outbound channel text into chunks no longer than the requested limit.
 * Newline boundaries win over spaces; text without usable separators falls back
 * to a hard character split so channel senders always receive bounded strings.
 */
declare function chunkTextForOutbound(text: string, limit: number, options?: {
  preserveWhitespace?: boolean;
  formatting?: unknown;
}): string[];
//#endregion
export { type AssistantVisibleTextSanitizerProfile, type AttributedRenderOptions, type ChunkTextRangesOptions, type CodeRegion, type DisplayMessageWithContent, FILE_REF_EXTENSIONS_WITH_TLD, FormatCapabilityProfile, type InlineDirectiveParseResult, type MarkdownIR, type MarkdownLinkSpan, type MarkdownParseOptions, type MarkdownStyle, type MarkdownStyleSpan, type MarkdownTableCell, type MarkdownTableMeta, type ReasoningTagMode, type ReasoningTagTrim, type RenderLink, type RenderMarkdownIRChunksWithinLimitOptions, type RenderOptions, type RenderStyleMap, type RenderStyleMarker, SYSTEM_MARK, type TextChunkRange, chunkItems, chunkMarkdownIR, chunkTextForOutbound, chunkTextRanges, convertMarkdownTables, findCodeRegions, hasSystemMark, isAutoLinkedFileRef, isInsideCode, markdownToIR, markdownToIRWithMeta, prefixSystemMessage, renderMarkdownIRChunksWithinLimit, renderMarkdownWithAttributedRanges, renderMarkdownWithMarkers, sanitizeAssistantVisibleText, sanitizeAssistantVisibleTextWithOptions, sanitizeAssistantVisibleTextWithProfile, sanitizeTerminalText, sliceMarkdownIR, stripAssistantInternalScaffolding, stripInlineDirectiveTagsForDelivery, stripInlineDirectiveTagsForDisplay, stripInlineDirectiveTagsFromMessageForDisplay, stripMarkdown, stripReasoningTagsFromText, stripToolCallXmlTags, tokenizeHtmlTags };