//#region packages/markdown-core/src/fences.d.ts
/** Markdown fenced-code block span with the opener data needed to reopen it. */
type FenceSpan = {
  start: number;
  end: number;
  openLine: string;
  marker: string;
  indent: string;
};
/** Streaming fence scanner state carried across partial markdown chunks. */
type FenceScanState = {
  atLineStart?: boolean;
  open?: {
    markerChar: string;
    markerLen: number;
    openLine: string;
    marker: string;
    indent: string;
  };
};
/** Scans fenced-code spans incrementally so chunking can carry an open fence forward. */
declare function scanFenceSpans(buffer: string, state?: FenceScanState): {
  spans: FenceSpan[];
  state: FenceScanState;
};
/** Parses all fenced-code spans in a complete markdown buffer. */
declare function parseFenceSpans(buffer: string): FenceSpan[];
/** Looks up the fence containing an offset; spans must be sorted by start offset. */
declare function findFenceSpanAt(spans: FenceSpan[], index: number): FenceSpan | undefined;
/** True when a chunk boundary would not split a fenced-code block. */
declare function isSafeFenceBreak(spans: FenceSpan[], index: number): boolean;
//#endregion
export { FenceScanState, FenceSpan, findFenceSpanAt, isSafeFenceBreak, parseFenceSpans, scanFenceSpans };