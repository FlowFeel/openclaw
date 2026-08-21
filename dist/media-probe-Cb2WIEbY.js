import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { t as resolveSystemBin } from "./resolve-system-bin-CUZ-EuVq.js";
import { n as runExec } from "./exec-Bcu-_3pW.js";
import fs from "node:fs/promises";
/** Default ffprobe timeout for lightweight metadata probes. */
const MEDIA_FFPROBE_TIMEOUT_MS = 1e4;
/** Default ffmpeg timeout for bounded media conversion work. */
const MEDIA_FFMPEG_TIMEOUT_MS = 45e3;
/** Maximum audio duration accepted by ffmpeg-backed media flows. */
const MEDIA_FFMPEG_MAX_AUDIO_DURATION_SECS = 1200;
//#endregion
//#region src/media/ffmpeg-exec.ts
function resolveExecOptions(defaultTimeoutMs, options) {
	if (options?.input !== void 0 && options.stdinFileDescriptor !== void 0) throw new Error("media exec accepts either input or stdinFileDescriptor, not both");
	return {
		input: options?.input,
		...options?.stdinFileDescriptor !== void 0 ? { stdinFileDescriptor: options.stdinFileDescriptor } : {},
		logOutput: false,
		maxBuffer: options?.maxBufferBytes ?? 10485760,
		timeoutMs: options?.timeoutMs ?? defaultTimeoutMs
	};
}
function requireSystemBin(name) {
	const resolved = resolveSystemBin(name, { trust: "standard" });
	if (!resolved) {
		const hint = process.platform === "darwin" ? "e.g. brew install ffmpeg" : "e.g. apt install ffmpeg / dnf install ffmpeg";
		throw new Error(`${name} not found in trusted system directories. Install it via your system package manager (${hint}).`);
	}
	return resolved;
}
/** Resolves ffmpeg from trusted system paths before command execution. */
function resolveFfmpegBin() {
	return requireSystemBin("ffmpeg");
}
/** Runs ffprobe with optional stdin input. */
async function runFfprobe(args, options) {
	const { stdout } = await runExec(requireSystemBin("ffprobe"), args, resolveExecOptions(MEDIA_FFPROBE_TIMEOUT_MS, options));
	return stdout;
}
/** Runs ffmpeg with bounded timeout and buffer settings. */
async function runFfmpeg(args, options) {
	const { stdout } = await runExec(resolveFfmpegBin(), args, resolveExecOptions(MEDIA_FFMPEG_TIMEOUT_MS, options));
	return stdout;
}
/** Splits ffprobe CSV-ish output into normalized lowercase fields. */
function parseFfprobeCsvFields(stdout, maxFields) {
	return stdout.trim().split(/[,\r\n]+/, maxFields).map((field) => normalizeLowercaseStringOrEmpty(field));
}
function parseFfprobeSampleRateHz(value) {
	if (!value || !/^\d+$/.test(value)) return null;
	const sampleRate = Number(value);
	return Number.isSafeInteger(sampleRate) && sampleRate > 0 ? sampleRate : null;
}
/** Parses codec and positive sample rate from compact ffprobe stream output. */
function parseFfprobeCodecAndSampleRate(stdout) {
	const [codecRaw, sampleRateRaw] = parseFfprobeCsvFields(stdout, 2);
	return {
		codec: codecRaw ? codecRaw : null,
		sampleRateHz: parseFfprobeSampleRateHz(sampleRateRaw)
	};
}
//#endregion
//#region src/media/media-probe.ts
function parsePositiveInteger(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : void 0;
}
function parseDurationMs(value) {
	if (typeof value !== "number" && typeof value !== "string") return;
	const seconds = typeof value === "number" ? value : Number(value.trim());
	if (!Number.isFinite(seconds) || seconds <= 0) return;
	return parsePositiveInteger(Math.round(seconds * 1e3));
}
function readRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
}
function normalizeCodecName(value) {
	if (typeof value !== "string") return;
	return value.trim().toLowerCase() || void 0;
}
function parseStreamIndex(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : void 0;
}
function selectPlaybackStream(streams, codecType) {
	const candidates = streams.filter((stream) => {
		if (stream.codec_type !== codecType) return false;
		const disposition = readRecord(stream.disposition);
		return codecType !== "video" || disposition?.attached_pic !== 1;
	});
	return candidates.find((stream) => readRecord(stream.disposition)?.default === 1) ?? candidates[0];
}
function parseFfprobeMediaMetadata(stdout, kind) {
	let parsed;
	try {
		parsed = JSON.parse(stdout);
	} catch {
		return null;
	}
	const root = readRecord(parsed);
	if (!root) return null;
	const format = readRecord(root.format);
	const streams = (Array.isArray(root.streams) ? root.streams : []).map(readRecord).filter((stream) => Boolean(stream));
	const audioStream = selectPlaybackStream(streams, "audio");
	const videoStream = selectPlaybackStream(streams, "video");
	const selectedDurations = (kind === "video" ? [videoStream, audioStream] : [audioStream]).map((stream) => parseDurationMs(stream?.duration)).filter((duration) => duration !== void 0);
	const durationMs = (selectedDurations.length > 0 ? Math.max(...selectedDurations) : void 0) ?? parseDurationMs(format?.duration);
	const width = parsePositiveInteger(videoStream?.width);
	const height = parsePositiveInteger(videoStream?.height);
	const audioCodec = normalizeCodecName(audioStream?.codec_name);
	const videoCodec = normalizeCodecName(videoStream?.codec_name);
	const videoPixelFormat = normalizeCodecName(videoStream?.pix_fmt);
	const videoProfile = normalizeCodecName(videoStream?.profile);
	const audioStreamIndex = parseStreamIndex(audioStream?.index);
	const videoStreamIndex = parseStreamIndex(videoStream?.index);
	return {
		...durationMs ? { durationMs } : {},
		...kind === "video" && width && height ? {
			width,
			height
		} : {},
		...audioCodec ? { audioCodec } : {},
		...audioStreamIndex !== void 0 ? { audioStreamIndex } : {},
		...videoCodec ? { videoCodec } : {},
		...videoPixelFormat ? { videoPixelFormat } : {},
		...videoProfile ? { videoProfile } : {},
		...videoStreamIndex !== void 0 ? { videoStreamIndex } : {}
	};
}
function buildFfprobeMetadataArgs(protocol) {
	const isFileDescriptor = protocol === "fd";
	return [
		"-v",
		"error",
		"-protocol_whitelist",
		protocol,
		"-show_entries",
		"format=duration:stream=index,codec_type,codec_name,profile,pix_fmt,duration,width,height:stream_disposition=default,attached_pic",
		"-of",
		"json",
		...isFileDescriptor ? ["-fd", "0"] : [],
		isFileDescriptor ? "fd:" : "pipe:0"
	];
}
function isMissingFdProtocolError(error) {
	if (!error || typeof error !== "object") return false;
	const stderr = error.stderr;
	const message = typeof stderr === "string" ? stderr : error instanceof Error ? error.message : "";
	return /(?:fd:.*protocol not found|protocol not found.*fd|unrecognized option ['"]?fd|option fd not found)/is.test(message);
}
async function probeMediaSource(source, kind, options = {}) {
	const runProbe = async (protocol) => await runFfprobe(buildFfprobeMetadataArgs(protocol), source.kind === "buffer" ? {
		input: source.buffer,
		...options
	} : {
		stdinFileDescriptor: source.fd,
		...options
	});
	try {
		return parseFfprobeMediaMetadata(await runProbe(source.kind === "fileDescriptor" ? "fd" : "pipe"), kind);
	} catch (error) {
		if (source.kind === "fileDescriptor" && isMissingFdProtocolError(error)) try {
			return parseFfprobeMediaMetadata(await runProbe("pipe"), kind);
		} catch {
			return null;
		}
		return null;
	}
}
function toMediaProbeResult(result, kind) {
	if (!result) return {};
	return {
		...result.durationMs ? { durationMs: result.durationMs } : {},
		...kind === "video" && result.width && result.height ? {
			width: result.width,
			height: result.height
		} : {}
	};
}
/** Probes a local audio or video file; every failure degrades to absent fields. */
async function probeMediaFile(filePath, kind, options = {}) {
	try {
		const handle = await fs.open(filePath, "r");
		try {
			return toMediaProbeResult(await probeMediaSource({
				kind: "fileDescriptor",
				fd: handle.fd
			}, kind, options), kind);
		} finally {
			await handle.close().catch(() => {});
		}
	} catch {
		return {};
	}
}
/** Probes a bounded local-file batch under one shared wall-clock budget. */
async function probeMediaFilesWithinBudget(inputs, options) {
	const results = inputs.map(() => ({}));
	const deadlineMs = Date.now() + options.budgetMs;
	const probeCount = Math.min(inputs.length, options.maxProbes);
	for (let offset = 0; offset < probeCount; offset += options.concurrency) {
		const timeoutMs = deadlineMs - Date.now();
		if (timeoutMs <= 0) break;
		const batchEnd = Math.min(offset + options.concurrency, probeCount);
		const batch = inputs.slice(offset, batchEnd);
		const batchResults = await Promise.all(batch.map((input) => probeMediaFile(input.filePath, input.kind, { timeoutMs })));
		for (const [batchIndex, metadata] of batchResults.entries()) results[offset + batchIndex] = metadata;
	}
	return results;
}
/** Probes duration and first-stream codecs from an already validated local descriptor. */
async function probePlaybackMediaFileDescriptor(fd, kind, options = {}) {
	return await probeMediaSource({
		kind: "fileDescriptor",
		fd
	}, kind, options);
}
/** Probes a video buffer while preserving the existing public media-runtime API. */
async function probeVideoDimensions(buffer) {
	const { width, height } = await probeMediaSource({
		kind: "buffer",
		buffer
	}, "video") ?? {};
	return width && height ? {
		width,
		height
	} : void 0;
}
//#endregion
export { resolveFfmpegBin as a, MEDIA_FFMPEG_MAX_AUDIO_DURATION_SECS as c, parseFfprobeCodecAndSampleRate as i, probePlaybackMediaFileDescriptor as n, runFfmpeg as o, probeVideoDimensions as r, runFfprobe as s, probeMediaFilesWithinBudget as t };
