import { a as annotateAssistantTranscriptRoleMessageBoundary, i as sliceMarkdownIR, l as isAutoLinkedMarkdownLink, m as avoidTrailingHighSurrogateBreak, s as copyMarkdownLinkSpan, u as mergeAnnotationSpans } from "./ir-CWUNBw8Y.mjs";
//#region packages/markdown-core/src/render-aware-chunking.ts
function resolveIntegerOption(value, fallback, opts) {
	if (!Number.isFinite(value)) return fallback;
	return Math.max(opts.min, Math.trunc(value));
}
function prepareChunkForMessageBoundary(options, chunk) {
	return options.assistantTranscriptRoleMessageBoundaries === true ? annotateAssistantTranscriptRoleMessageBoundary(chunk) : chunk;
}
/** Chunks Markdown IR by rendered size while preserving styles, links, and whitespace. */
function renderMarkdownIRChunksWithinLimit(options) {
	if (!options.ir.text) return [];
	if (options.limit === Number.POSITIVE_INFINITY) {
		const source = prepareChunkForMessageBoundary(options, options.ir);
		return [{
			source,
			rendered: options.renderChunk(source)
		}];
	}
	const normalizedLimit = resolveIntegerOption(options.limit, 1, { min: 1 });
	const renderResolver = {
		measureRendered: options.measureRendered,
		renderChunk: (chunk) => options.renderChunk(prepareChunkForMessageBoundary(options, chunk))
	};
	const pending = splitMarkdownIRPreserveWhitespace(options.ir, normalizedLimit).toReversed();
	const finalized = [];
	while (pending.length > 0) {
		const chunk = pending.pop();
		if (!chunk) continue;
		const rendered = renderResolver.renderChunk(chunk);
		if (renderResolver.measureRendered(rendered) <= normalizedLimit || chunk.text.length <= 1) {
			finalized.push(chunk);
			continue;
		}
		const split = splitMarkdownIRByRenderedLimit(chunk, normalizedLimit, renderResolver);
		if (split.length <= 1) {
			finalized.push(chunk);
			continue;
		}
		for (let index = split.length - 1; index >= 0; index -= 1) {
			const next = split[index];
			if (next) pending.push(next);
		}
	}
	return coalesceWhitespaceOnlyMarkdownIRChunks(finalized, normalizedLimit, renderResolver).map((chunk) => {
		const source = prepareChunkForMessageBoundary(options, chunk);
		return {
			source,
			rendered: options.renderChunk(source)
		};
	});
}
function splitMarkdownIRByRenderedLimit(chunk, renderedLimit, options) {
	const currentTextLength = chunk.text.length;
	if (currentTextLength <= 1) return [chunk];
	const splitLimit = findLargestChunkTextLengthWithinRenderedLimit(chunk, renderedLimit, options);
	if (splitLimit <= 0) return [chunk];
	const split = splitMarkdownIRPreserveWhitespace(chunk, splitLimit);
	const firstChunk = split[0];
	if (firstChunk && options.measureRendered(options.renderChunk(firstChunk)) <= renderedLimit) return split;
	return [sliceMarkdownIR(chunk, 0, splitLimit), sliceMarkdownIR(chunk, splitLimit, currentTextLength)];
}
function findLargestChunkTextLengthWithinRenderedLimit(chunk, renderedLimit, options) {
	const currentTextLength = chunk.text.length;
	if (currentTextLength <= 1) return currentTextLength;
	for (let candidateLength = currentTextLength - 1; candidateLength >= 1; candidateLength -= 1) {
		const safeCandidateLength = avoidTrailingHighSurrogateBreak(chunk.text, 0, candidateLength);
		const candidate = sliceMarkdownIR(chunk, 0, safeCandidateLength);
		const rendered = options.renderChunk(candidate);
		if (options.measureRendered(rendered) <= renderedLimit) return safeCandidateLength;
	}
	return 0;
}
function findMarkdownIRPreservedSplitIndex(text, start, limit) {
	const maxEnd = Math.min(text.length, start + limit);
	if (maxEnd >= text.length) return text.length;
	let lastOutsideParenNewlineBreak = -1;
	let lastOutsideParenWhitespaceBreak = -1;
	let lastOutsideParenWhitespaceRunStart = -1;
	let lastAnyNewlineBreak = -1;
	let lastAnyWhitespaceBreak = -1;
	let lastAnyWhitespaceRunStart = -1;
	let parenDepth = 0;
	let sawNonWhitespace = false;
	for (let index = start; index < maxEnd; index += 1) {
		const char = text.charAt(index);
		if (char === "(") {
			sawNonWhitespace = true;
			parenDepth += 1;
			continue;
		}
		if (char === ")" && parenDepth > 0) {
			sawNonWhitespace = true;
			parenDepth -= 1;
			continue;
		}
		if (!/\s/.test(char)) {
			sawNonWhitespace = true;
			continue;
		}
		if (!sawNonWhitespace) continue;
		if (char === "\n") {
			lastAnyNewlineBreak = index + 1;
			if (parenDepth === 0) lastOutsideParenNewlineBreak = index + 1;
			continue;
		}
		const whitespaceRunStart = index === start || !/\s/.test(text[index - 1] ?? "") ? index : lastAnyWhitespaceRunStart;
		lastAnyWhitespaceBreak = index + 1;
		lastAnyWhitespaceRunStart = whitespaceRunStart;
		if (parenDepth === 0) {
			lastOutsideParenWhitespaceBreak = index + 1;
			lastOutsideParenWhitespaceRunStart = whitespaceRunStart;
		}
	}
	const resolveWhitespaceBreak = (breakIndex, runStart) => {
		if (breakIndex <= start) return breakIndex;
		if (runStart <= start) return breakIndex;
		return /\s/.test(text[breakIndex] ?? "") ? runStart : breakIndex;
	};
	if (lastOutsideParenNewlineBreak > start) return lastOutsideParenNewlineBreak;
	if (lastOutsideParenWhitespaceBreak > start) return resolveWhitespaceBreak(lastOutsideParenWhitespaceBreak, lastOutsideParenWhitespaceRunStart);
	if (lastAnyNewlineBreak > start) return lastAnyNewlineBreak;
	if (lastAnyWhitespaceBreak > start) return resolveWhitespaceBreak(lastAnyWhitespaceBreak, lastAnyWhitespaceRunStart);
	return avoidTrailingHighSurrogateBreak(text, start, maxEnd);
}
function splitMarkdownIRPreserveWhitespace(ir, limit) {
	if (!ir.text) return [];
	const normalizedLimit = resolveIntegerOption(limit, 1, { min: 1 });
	if (normalizedLimit <= 0 || ir.text.length <= normalizedLimit) return [ir];
	const chunks = [];
	let cursor = 0;
	while (cursor < ir.text.length) {
		const end = findMarkdownIRPreservedSplitIndex(ir.text, cursor, normalizedLimit);
		chunks.push(sliceMarkdownIR(ir, cursor, end));
		cursor = end;
	}
	return chunks;
}
function mergeAdjacentStyleSpans(styles) {
	const merged = [];
	for (const span of styles) {
		const last = merged.at(-1);
		if (last && last.style === span.style && last.language === span.language && span.start <= last.end) {
			last.end = Math.max(last.end, span.end);
			continue;
		}
		merged.push({ ...span });
	}
	return merged;
}
function mergeAdjacentLinkSpans(links) {
	const merged = [];
	for (const link of links) {
		const last = merged.at(-1);
		if (last && last.href === link.href && isAutoLinkedMarkdownLink(last) === isAutoLinkedMarkdownLink(link) && link.start <= last.end) {
			last.end = Math.max(last.end, link.end);
			continue;
		}
		merged.push(copyMarkdownLinkSpan(link));
	}
	return merged;
}
function mergeMarkdownIRChunks(left, right) {
	const offset = left.text.length;
	const shiftedAnnotations = [];
	for (const annotation of right.annotations ?? []) shiftedAnnotations.push({
		...annotation,
		start: annotation.start + offset,
		end: annotation.end + offset
	});
	const shiftedStyles = [];
	for (const span of right.styles) shiftedStyles.push({
		...span,
		start: span.start + offset,
		end: span.end + offset
	});
	const shiftedLinks = [];
	for (const link of right.links) shiftedLinks.push(copyMarkdownLinkSpan(link, {
		start: link.start + offset,
		end: link.end + offset
	}));
	const annotations = mergeAnnotationSpans([...left.annotations ?? [], ...shiftedAnnotations]);
	return {
		text: left.text + right.text,
		styles: mergeAdjacentStyleSpans([...left.styles, ...shiftedStyles]),
		links: mergeAdjacentLinkSpans([...left.links, ...shiftedLinks]),
		...annotations.length > 0 ? { annotations } : {}
	};
}
function coalesceWhitespaceOnlyMarkdownIRChunks(chunks, renderedLimit, options) {
	const coalesced = [];
	let index = 0;
	while (index < chunks.length) {
		const chunk = chunks[index];
		if (!chunk) {
			index += 1;
			continue;
		}
		if (chunk.text.trim().length > 0) {
			coalesced.push(chunk);
			index += 1;
			continue;
		}
		const prev = coalesced.at(-1);
		const next = chunks[index + 1];
		const chunkLength = chunk.text.length;
		const canMerge = (candidate) => options.measureRendered(options.renderChunk(candidate)) <= renderedLimit;
		if (prev) {
			const mergedPrev = mergeMarkdownIRChunks(prev, chunk);
			if (canMerge(mergedPrev)) {
				coalesced[coalesced.length - 1] = mergedPrev;
				index += 1;
				continue;
			}
		}
		if (next) {
			const mergedNext = mergeMarkdownIRChunks(chunk, next);
			if (canMerge(mergedNext)) {
				chunks[index + 1] = mergedNext;
				index += 1;
				continue;
			}
		}
		if (prev && next) for (let prefixLength = chunkLength - 1; prefixLength >= 1; prefixLength -= 1) {
			const prefix = sliceMarkdownIR(chunk, 0, prefixLength);
			const suffix = sliceMarkdownIR(chunk, prefixLength, chunkLength);
			const mergedPrev = mergeMarkdownIRChunks(prev, prefix);
			const mergedNext = mergeMarkdownIRChunks(suffix, next);
			if (canMerge(mergedPrev) && canMerge(mergedNext)) {
				coalesced[coalesced.length - 1] = mergedPrev;
				chunks[index + 1] = mergedNext;
				break;
			}
		}
		index += 1;
	}
	return coalesced;
}
//#endregion
export { renderMarkdownIRChunksWithinLimit };
