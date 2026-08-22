//#region packages/media-understanding-common/src/types.d.ts
/** Kind of media-understanding output produced for an attachment. */
type MediaUnderstandingKind = "audio.transcription" | "video.description" | "image.description";
/** Capability exposed by a media-understanding provider. */
type MediaUnderstandingCapability = "image" | "audio" | "video";
/** Capability registry keyed by provider id. */
type MediaUnderstandingCapabilityRegistry = Map<string, {
  capabilities?: MediaUnderstandingCapability[];
}>;
/** Media attachment passed to understanding providers. */
type MediaAttachment = {
  path?: string;
  url?: string;
  mime?: string;
  index: number;
  alreadyTranscribed?: boolean;
};
/** Normalized text output produced by media understanding. */
type MediaUnderstandingOutput = {
  kind: MediaUnderstandingKind;
  attachmentIndex: number;
  text: string;
  provider: string;
  model?: string;
};
/** Provider shape used for capability discovery and dispatch. */
type MediaUnderstandingProvider = {
  id: string;
  capabilities?: MediaUnderstandingCapability[];
  transcribeAudio?: unknown;
  describeVideo?: unknown;
  describeImage?: unknown;
  describeImages?: unknown;
  extractStructured?: unknown;
};
//#endregion
export { MediaAttachment, MediaUnderstandingCapability, MediaUnderstandingCapabilityRegistry, MediaUnderstandingKind, MediaUnderstandingOutput, MediaUnderstandingProvider };