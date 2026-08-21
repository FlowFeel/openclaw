import { MediaUnderstandingOutput } from "./types.mjs";

//#region packages/media-understanding-common/src/format.d.ts
/** Formats media-understanding outputs into the chat body sent back to the model. */
declare function formatMediaUnderstandingBody(params: {
  body?: string;
  outputs: MediaUnderstandingOutput[];
}): string;
/** Formats one or more audio transcript outputs for legacy transcript-only callers. */
declare function formatAudioTranscripts(outputs: MediaUnderstandingOutput[]): string;
//#endregion
export { formatAudioTranscripts, formatMediaUnderstandingBody };