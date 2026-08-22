import { a as MediaUnderstandingProvider, c as VideoDescriptionResult, n as AudioTranscriptionResult, s as VideoDescriptionRequest, t as AudioTranscriptionRequest } from "../../types-3Lxbbsmf.js";
//#region extensions/google/media-understanding-provider.d.ts
declare function transcribeGeminiAudio(params: AudioTranscriptionRequest): Promise<AudioTranscriptionResult>;
declare function describeGeminiVideo(params: VideoDescriptionRequest): Promise<VideoDescriptionResult>;
declare const googleMediaUnderstandingProvider: MediaUnderstandingProvider;
//#endregion
export { describeGeminiVideo, googleMediaUnderstandingProvider, transcribeGeminiAudio };