import "./safe-text-wtXgRSZv.js";
import "./code-regions-B1zlXqqO.js";
import "./assistant-visible-text-DONkuTGN.js";
import "./directive-tags-XkukyPkv.js";
import { n as splitLongTextLine, t as chunkTextByBreakResolver } from "./text-chunking-8xnp3BH3.js";
import { t as applyConstructFallbacks, u as isAutoLinkedMarkdownLink } from "./construct-fallbacks-BR_o1n_g.js";
import "./strip-markdown-C5tNLXiY.js";
import "./tables-CPvf63q-.js";
import "./render-aware-chunking--JnNVd1x.js";
import "./auto-linked-file-ref-DIO7giFK.js";
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
//#region src/plugin-sdk/text-chunking.ts
/**
* Splits outbound channel text into chunks no longer than the requested limit.
* Newline boundaries win over spaces; text without usable separators falls back
* to a hard character split so channel senders always receive bounded strings.
*/
function chunkTextForOutbound(text, limit, options) {
	if (options?.preserveWhitespace !== void 0) return splitLongTextLine(text, limit, { preserveWhitespace: options.preserveWhitespace });
	return chunkTextByBreakResolver(text, limit, (window) => {
		const lastNewline = window.lastIndexOf("\n");
		const lastSpace = window.lastIndexOf(" ");
		return lastNewline > 0 ? lastNewline : lastSpace;
	});
}
//#endregion
export { renderMarkdownWithAttributedRanges as n, FormatCapabilityProfile as r, chunkTextForOutbound as t };
