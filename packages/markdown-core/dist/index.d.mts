import { FenceScanState, FenceSpan, findFenceSpanAt, isSafeFenceBreak, parseFenceSpans, scanFenceSpans } from "./fences.mjs";
import { InlineCodeState, buildCodeSpanIndex, createInlineCodeState } from "./code-spans.mjs";
import { ExtractedFrontmatterBlock, FrontmatterParseIssue, ParsedFrontmatterBlockResult, extractFrontmatterBlock, parseFrontmatterBlock, parseFrontmatterBlockResult, stripFrontmatterBlock } from "./frontmatter.mjs";
import { a as renderMarkdownWithMarkers, c as FormatConstruct, i as RenderStyleMarker, n as RenderOptions, o as ConstructSupport, r as RenderStyleMap, s as FormatCapabilityProfile, t as RenderLink } from "./render-BID5wZaR.mjs";
import { a as MarkdownTableMeta, c as markdownToIRWithMeta, d as MarkdownLinkSpan, f as MarkdownStyle, i as MarkdownTableData, l as sliceMarkdownIR, n as MarkdownParseOptions, o as chunkMarkdownIR, p as MarkdownStyleSpan, r as MarkdownTableCell, s as markdownToIR, t as MarkdownIR, u as MarkdownAnnotationSpan } from "./ir-QQ94xNl0.mjs";
import { t as MarkdownTableMode } from "./types-C6mGxBC3.mjs";
import { RenderMarkdownIRChunksWithinLimitOptions, RenderedMarkdownChunk, renderMarkdownIRChunksWithinLimit } from "./render-aware-chunking.mjs";
import { convertMarkdownTables } from "./tables.mjs";

//#region packages/normalization-core/src/utf16-slice.d.ts
/** Moves a chunk boundary away from the middle of a UTF-16 surrogate pair. */
declare function avoidTrailingHighSurrogateBreak(text: string, start: number, end: number): number;
//#endregion
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
/**
 * Splits plain text into size-bounded chunks at readable boundaries.
 *
 * Returns the original text as one chunk when the limit is non-positive.
 */
declare function chunkText(text: string, limit: number): string[];
//#endregion
//#region packages/markdown-core/src/construct-fallbacks.d.ts
/** Applies target-declared semantic fallbacks before a mechanism-specific renderer runs. */
declare function applyConstructFallbacks(ir: MarkdownIR, profile: FormatCapabilityProfile): MarkdownIR;
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
//#region packages/markdown-core/src/render-plain.d.ts
type PlainRenderOptions = {
  linkStyle?: "label" | "label-and-url";
};
/** Projects Markdown IR to plain text, optionally applying channel capability fallbacks. */
declare function renderMarkdownAsPlainText(ir: MarkdownIR, options?: PlainRenderOptions, profile?: FormatCapabilityProfile): string;
//#endregion
export { AttributedRenderOptions, ChunkTextRangesOptions, ConstructSupport, ExtractedFrontmatterBlock, FenceScanState, FenceSpan, FormatCapabilityProfile, FormatConstruct, FrontmatterParseIssue, InlineCodeState, MarkdownIR, type MarkdownLinkSpan, MarkdownParseOptions, type MarkdownStyle, type MarkdownStyleSpan, MarkdownTableCell, MarkdownTableData, MarkdownTableMeta, MarkdownTableMode, ParsedFrontmatterBlockResult, PlainRenderOptions, RenderLink, RenderMarkdownIRChunksWithinLimitOptions, RenderOptions, RenderStyleMap, RenderStyleMarker, RenderedMarkdownChunk, TextChunkRange, applyConstructFallbacks, avoidTrailingHighSurrogateBreak, buildCodeSpanIndex, chunkMarkdownIR, chunkText, chunkTextRanges, convertMarkdownTables, createInlineCodeState, extractFrontmatterBlock, findFenceSpanAt, isSafeFenceBreak, markdownToIR, markdownToIRWithMeta, parseFenceSpans, parseFrontmatterBlock, parseFrontmatterBlockResult, renderMarkdownAsPlainText, renderMarkdownIRChunksWithinLimit, renderMarkdownWithAttributedRanges, renderMarkdownWithMarkers, scanFenceSpans, sliceMarkdownIR, stripFrontmatterBlock, tokenizeHtmlTags };