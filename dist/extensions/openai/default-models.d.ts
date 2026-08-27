import { n as OpenClawConfig } from "../../types.openclaw-rejpcq0R.js";
//#region extensions/openai/default-models.d.ts
declare const OPENAI_DEFAULT_MODEL = "openai/gpt-5.6";
declare const OPENAI_CODEX_DEFAULT_MODEL = "openai/gpt-5.6-sol";
declare const OPENAI_DEFAULT_IMAGE_MODEL = "gpt-image-2";
declare const OPENAI_DEFAULT_TTS_MODEL = "gpt-4o-mini-tts";
declare const OPENAI_DEFAULT_TTS_VOICE = "alloy";
declare const OPENAI_DEFAULT_AUDIO_TRANSCRIPTION_MODEL = "gpt-4o-transcribe";
declare const OPENAI_DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";
declare function applyOpenAIProviderConfig(cfg: OpenClawConfig): OpenClawConfig;
declare function applyOpenAIConfig(cfg: OpenClawConfig): OpenClawConfig;
//#endregion
export { OPENAI_CODEX_DEFAULT_MODEL, OPENAI_DEFAULT_AUDIO_TRANSCRIPTION_MODEL, OPENAI_DEFAULT_EMBEDDING_MODEL, OPENAI_DEFAULT_IMAGE_MODEL, OPENAI_DEFAULT_MODEL, OPENAI_DEFAULT_TTS_MODEL, OPENAI_DEFAULT_TTS_VOICE, applyOpenAIConfig, applyOpenAIProviderConfig };