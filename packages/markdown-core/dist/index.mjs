import { findFenceSpanAt, isSafeFenceBreak, parseFenceSpans, scanFenceSpans } from "./fences.mjs";
import { buildCodeSpanIndex, createInlineCodeState } from "./code-spans.mjs";
import { extractFrontmatterBlock, parseFrontmatterBlock, parseFrontmatterBlockResult, stripFrontmatterBlock } from "./frontmatter.mjs";
import { f as chunkText, i as sliceMarkdownIR, l as isAutoLinkedMarkdownLink, m as avoidTrailingHighSurrogateBreak, n as markdownToIR, o as tokenizeHtmlTags, p as chunkTextRanges, r as markdownToIRWithMeta, t as chunkMarkdownIR } from "./ir-CWUNBw8Y.mjs";
import { n as applyConstructFallbacks, t as renderMarkdownWithMarkers } from "./render-BE6JHcJS.mjs";
import { renderMarkdownIRChunksWithinLimit } from "./render-aware-chunking.mjs";
import { convertMarkdownTables } from "./tables.mjs";
import "./types.mjs";
//#region packages/markdown-core/src/format-capabilities.ts
const NATIVE_FORMAT_CONSTRUCTS = {
	bold: "native",
	italic: "native",
	underline: "native",
	strikethrough: "native",
	spoiler: "native",
	codeInline: "native",
	codeBlock: "native",
	codeLanguage: "native",
	linkLabel: "native",
	heading: "native",
	bulletList: "native",
	orderedList: "native",
	taskList: "native",
	table: "native",
	blockquote: "native",
	image: "native",
	mention: "native"
};
/** Defines a channel profile with native support as the default for each construct. */
function defineFormatProfile(profile) {
	return {
		...profile,
		constructs: {
			...NATIVE_FORMAT_CONSTRUCTS,
			...profile.constructs
		}
	};
}
/** Runtime helpers for defining static channel formatting capabilities. */
const FormatCapabilityProfile = { define: defineFormatProfile };
//#endregion
//#region packages/markdown-core/src/render-attributed.ts
/** Renders Markdown IR into text plus UTF-16 style ranges for attributed-text targets. */
function renderMarkdownWithAttributedRanges(ir, options, profile) {
	const projected = profile ? applyConstructFallbacks(ir, profile) : ir;
	const text = projected.text ?? "";
	const insertions = [];
	let rendered = text;
	if (options.renderLink) {
		rendered = "";
		let cursor = 0;
		for (const link of [...projected.links].toSorted((a, b) => a.start - b.start)) {
			if (link.start < cursor) continue;
			rendered += text.slice(cursor, link.end);
			const origin = isAutoLinkedMarkdownLink(link) ? "linkify" : "authored";
			const suffix = options.renderLink(link, text, { origin });
			rendered += suffix;
			if (suffix) insertions.push({
				pos: link.end,
				length: suffix.length
			});
			cursor = link.end;
		}
		rendered += text.slice(cursor);
	}
	rendered = options.trimEnd ? rendered.trimEnd() : rendered;
	const spans = projected.styles.flatMap((span) => {
		const style = options.styleMap[span.style];
		return style === void 0 ? [] : [{
			start: span.start,
			end: span.end,
			style
		}];
	});
	for (const annotation of projected.annotations ?? []) {
		const style = options.annotationStyleMap?.[annotation.type];
		if (style !== void 0) spans.push({
			start: annotation.start,
			end: annotation.end,
			style
		});
	}
	const ranges = spans.flatMap((span) => {
		const pieces = [];
		let cursor = span.start;
		let shift = 0;
		for (const insertion of insertions) if (insertion.pos <= cursor) shift += insertion.length;
		else if (insertion.pos >= span.end) break;
		else {
			pieces.push({
				...span,
				start: cursor + shift,
				end: insertion.pos + shift
			});
			cursor = insertion.pos;
			shift += insertion.length;
		}
		pieces.push({
			...span,
			start: cursor + shift,
			end: span.end + shift
		});
		return pieces;
	}).map((span) => {
		const start = Math.max(0, Math.min(span.start, rendered.length));
		return {
			start,
			length: Math.min(span.end, rendered.length) - start,
			style: span.style
		};
	}).filter((range) => range.length > 0).toSorted((a, b) => a.start - b.start || a.length - b.length || a.style.localeCompare(b.style));
	const merged = [];
	for (const range of ranges) {
		const previous = merged.at(-1);
		if (previous && previous.style === range.style && range.start <= previous.start + previous.length) previous.length = Math.max(previous.start + previous.length, range.start + range.length) - previous.start;
		else merged.push({ ...range });
	}
	return {
		text: rendered,
		ranges: merged
	};
}
//#endregion
//#region packages/markdown-core/src/render-plain.ts
/** Projects Markdown IR to plain text, optionally applying channel capability fallbacks. */
function renderMarkdownAsPlainText(ir, options = {}, profile) {
	const effectiveProfile = profile && options.linkStyle === "label" ? {
		...profile,
		constructs: {
			...profile.constructs,
			linkLabel: "strip"
		}
	} : profile;
	const projected = effectiveProfile ? applyConstructFallbacks(ir, effectiveProfile) : ir;
	if ((options.linkStyle ?? "label-and-url") === "label" || projected.links.length === 0) return projected.text;
	let output = "";
	let cursor = 0;
	for (const link of [...projected.links].toSorted((a, b) => a.start - b.start)) {
		if (link.start < cursor) continue;
		output += projected.text.slice(cursor, link.end);
		const href = link.href.trim();
		const label = projected.text.slice(link.start, link.end).trim();
		const comparableHref = href.startsWith("mailto:") ? href.slice(7) : href;
		if (href && label && label !== href && label !== comparableHref) output += ` (${href})`;
		cursor = link.end;
	}
	return output + projected.text.slice(cursor);
}
//#endregion
export { FormatCapabilityProfile, applyConstructFallbacks, avoidTrailingHighSurrogateBreak, buildCodeSpanIndex, chunkMarkdownIR, chunkText, chunkTextRanges, convertMarkdownTables, createInlineCodeState, extractFrontmatterBlock, findFenceSpanAt, isSafeFenceBreak, markdownToIR, markdownToIRWithMeta, parseFenceSpans, parseFrontmatterBlock, parseFrontmatterBlockResult, renderMarkdownAsPlainText, renderMarkdownIRChunksWithinLimit, renderMarkdownWithAttributedRanges, renderMarkdownWithMarkers, scanFenceSpans, sliceMarkdownIR, stripFrontmatterBlock, tokenizeHtmlTags };
