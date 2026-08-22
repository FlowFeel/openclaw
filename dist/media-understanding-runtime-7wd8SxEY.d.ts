import { t as ImageDescriptionResult } from "./types-CPoo3Uhn.js";
import { a as RunMediaUnderstandingFileParams, n as DescribeImageFileWithModelParams, o as RunMediaUnderstandingFileResult, r as DescribeVideoFileParams, s as TranscribeAudioFileParams, t as DescribeImageFileParams } from "./runtime-types-6jfV0woi.js";

//#region src/media-understanding/runtime.d.ts
/** Runs media understanding for one local file or remote URL and returns the first matching output. */
declare function runMediaUnderstandingFile(params: RunMediaUnderstandingFileParams): Promise<RunMediaUnderstandingFileResult>;
/** Describes one image file or URL through the configured image-understanding pipeline. */
declare function describeImageFile(params: DescribeImageFileParams): Promise<RunMediaUnderstandingFileResult>;
/** Describes one image with an explicit provider/model, bypassing configured media model selection. */
declare function describeImageFileWithModel(params: DescribeImageFileWithModelParams): Promise<ImageDescriptionResult>;
/** Describes one video file or URL through the configured video-understanding pipeline. */
declare function describeVideoFile(params: DescribeVideoFileParams): Promise<RunMediaUnderstandingFileResult>;
/** Transcribes one audio file or URL through the configured audio-understanding pipeline. */
declare function transcribeAudioFile(params: TranscribeAudioFileParams): Promise<RunMediaUnderstandingFileResult>;
//#endregion
export { transcribeAudioFile as a, runMediaUnderstandingFile as i, describeImageFileWithModel as n, describeVideoFile as r, describeImageFile as t };