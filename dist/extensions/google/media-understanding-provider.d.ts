import { a as MediaUnderstandingProvider, c as VideoDescriptionResult, n as AudioTranscriptionResult, s as VideoDescriptionRequest, t as AudioTranscriptionRequest } from "../../types-CcZ614_b.js";
//#region extensions/google/media-understanding-provider.d.ts
declare function transcribeGeminiAudio(params: AudioTranscriptionRequest): Promise<AudioTranscriptionResult>;
declare function describeGeminiVideo(params: VideoDescriptionRequest): Promise<VideoDescriptionResult>;
declare const googleMediaUnderstandingProvider: MediaUnderstandingProvider;
//#endregion
export { describeGeminiVideo, googleMediaUnderstandingProvider, transcribeGeminiAudio };