import { MediaUnderstandingCapability } from "./types.mjs";

//#region packages/media-understanding-common/src/defaults.d.ts
/** Default max response characters for bounded text outputs. */
declare const DEFAULT_MAX_CHARS = 500;
/** Default max response characters by capability. */
declare const DEFAULT_MAX_CHARS_BY_CAPABILITY: Record<MediaUnderstandingCapability, number | undefined>;
/** Default input byte limits by capability. */
declare const DEFAULT_MAX_BYTES: Record<MediaUnderstandingCapability, number>;
/** Default request timeout by capability. */
declare const DEFAULT_TIMEOUT_SECONDS: Record<MediaUnderstandingCapability, number>;
/** Default prompts by capability. */
declare const DEFAULT_PROMPT: Record<MediaUnderstandingCapability, string>;
/** Upper bound for base64-expanded video payloads. */
declare const DEFAULT_VIDEO_MAX_BASE64_BYTES: number;
/** CLI output buffer used by provider child processes. */
declare const CLI_OUTPUT_MAX_BUFFER: number;
/** Default parallel media-understanding request count. */
declare const DEFAULT_MEDIA_CONCURRENCY = 2;
/** Minimum bytes for audio files before transcription is attempted. */
declare const MIN_AUDIO_FILE_BYTES = 1024;
//#endregion
export { CLI_OUTPUT_MAX_BUFFER, DEFAULT_MAX_BYTES, DEFAULT_MAX_CHARS, DEFAULT_MAX_CHARS_BY_CAPABILITY, DEFAULT_MEDIA_CONCURRENCY, DEFAULT_PROMPT, DEFAULT_TIMEOUT_SECONDS, DEFAULT_VIDEO_MAX_BASE64_BYTES, MIN_AUDIO_FILE_BYTES };