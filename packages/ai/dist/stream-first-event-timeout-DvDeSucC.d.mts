//#region packages/ai/src/utils/stream-first-event-timeout.d.ts
type StreamStage = "responses" | "completions";
type FirstStreamEventTimeoutContext = {
  provider?: string;
  api?: string;
  model?: string;
  timeoutMs: number;
  stage?: StreamStage;
  hint?: string;
  abort?: (reason: Error) => void;
  onTimeout?: (reason: Error) => void;
};
type FirstStreamEventInternalOptions = {
  firstEventTimeoutMs?: number;
  abortFirstEventStream?: (reason: Error) => void;
  onFirstEventTimeout?: (reason: Error) => void;
};
type FirstStreamEventAbortController = {
  signal: AbortSignal;
  abort: (reason: Error) => void;
  dispose: () => void;
};
declare function getFirstStreamEventTimeoutMs(options: unknown): number | undefined;
declare function getFirstStreamEventTimeoutHandler(options: unknown): ((reason: Error) => void) | undefined;
declare function createFirstStreamEventTimeoutError(context: FirstStreamEventTimeoutContext): Error;
declare function createFirstStreamEventAbortController(parentSignal?: AbortSignal): FirstStreamEventAbortController;
declare function withFirstStreamEventTimeout<T>(stream: AsyncIterable<T>, context: FirstStreamEventTimeoutContext): AsyncIterable<T>;
//#endregion
export { createFirstStreamEventTimeoutError as a, withFirstStreamEventTimeout as c, createFirstStreamEventAbortController as i, FirstStreamEventInternalOptions as n, getFirstStreamEventTimeoutHandler as o, FirstStreamEventTimeoutContext as r, getFirstStreamEventTimeoutMs as s, FirstStreamEventAbortController as t };