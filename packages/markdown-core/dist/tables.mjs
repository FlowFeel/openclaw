import { r as markdownToIRWithMeta } from "./ir-CWUNBw8Y.mjs";
import { t as renderMarkdownWithMarkers } from "./render-BE6JHcJS.mjs";
//#region packages/markdown-core/src/tables.ts
const MARKDOWN_STYLE_MARKERS = {
	bold: {
		open: "**",
		close: "**"
	},
	italic: {
		open: "_",
		close: "_"
	},
	strikethrough: {
		open: "~~",
		close: "~~"
	},
	code: {
		open: "`",
		close: "`"
	},
	code_block: {
		open: "```\n",
		close: "```"
	}
};
/** Converts markdown tables into the configured plaintext/code rendering mode. */
function convertMarkdownTables(markdown, mode) {
	if (!markdown || mode === "off") return markdown;
	const { ir, hasTables } = markdownToIRWithMeta(markdown, {
		linkify: false,
		autolink: false,
		headingStyle: "none",
		blockquotePrefix: "",
		tableMode: mode === "block" ? "code" : mode
	});
	if (!hasTables) return markdown;
	return renderMarkdownWithMarkers(ir, {
		styleMarkers: MARKDOWN_STYLE_MARKERS,
		escapeText: (text) => text,
		buildLink: (link, text) => {
			const href = link.href.trim();
			if (!href) return null;
			if (!text.slice(link.start, link.end)) return null;
			return {
				start: link.start,
				end: link.end,
				open: "[",
				close: `](${href})`
			};
		}
	});
}
//#endregion
export { convertMarkdownTables };
