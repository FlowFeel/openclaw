import { scanFenceSpans } from "./fences.mjs";
//#region packages/markdown-core/src/code-spans.ts
/** Creates the carry-forward state used when scanning inline code across chunks. */
function createInlineCodeState() {
	return {
		open: false,
		ticks: 0
	};
}
/** Builds a lookup for fenced and inline code spans while preserving scanner state. */
function buildCodeSpanIndex(text, inlineState, fenceState) {
	const { spans: fenceSpans, state: nextFenceState } = scanFenceSpans(text, fenceState);
	const { spans: inlineSpans, state: nextInlineState } = parseInlineCodeSpans(text, fenceSpans, inlineState ? {
		open: inlineState.open,
		ticks: inlineState.ticks
	} : createInlineCodeState());
	return {
		inlineState: nextInlineState,
		fenceState: nextFenceState,
		isInside: (index) => isInsideFenceSpan(index, fenceSpans) || isInsideInlineSpan(index, inlineSpans)
	};
}
function parseInlineCodeSpans(text, fenceSpans, initialState) {
	const spans = [];
	let open = initialState.open;
	let ticks = initialState.ticks;
	let openStart = open ? 0 : -1;
	let i = 0;
	while (i < text.length) {
		const fence = findFenceSpanAtInclusive(fenceSpans, i);
		if (fence) {
			i = fence.end;
			continue;
		}
		if (text[i] !== "`") {
			i += 1;
			continue;
		}
		const runStart = i;
		let runLength = 0;
		while (i < text.length && text[i] === "`") {
			runLength += 1;
			i += 1;
		}
		if (!open) {
			open = true;
			ticks = runLength;
			openStart = runStart;
			continue;
		}
		if (runLength === ticks) {
			spans.push([openStart, i]);
			open = false;
			ticks = 0;
			openStart = -1;
		}
	}
	if (open) spans.push([openStart, text.length]);
	return {
		spans,
		state: {
			open,
			ticks
		}
	};
}
function findFenceSpanAtInclusive(spans, index) {
	return spans.find((span) => index >= span.start && index < span.end);
}
function isInsideFenceSpan(index, spans) {
	return spans.some((span) => index >= span.start && index < span.end);
}
function isInsideInlineSpan(index, spans) {
	return spans.some(([start, end]) => index >= start && index < end);
}
//#endregion
export { buildCodeSpanIndex, createInlineCodeState };
