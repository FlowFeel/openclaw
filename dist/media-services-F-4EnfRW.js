import { i as writeExternalFileWithinRoot } from "./fs-safe-DVaClkIX.js";
import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-BBjU-hqW.js";
import { n as tempWorkspaceSync, r as withTempWorkspace } from "./private-temp-workspace-D2z2djhq.js";
import { r as runCommandWithTimeout } from "./exec-Bcu-_3pW.js";
import { t as basenameFromAnyPath } from "./file-name-D1nUHSBH.js";
import "./image-ops-BtojRCsZ.js";
import { o as runFfmpeg } from "./media-probe-Cb2WIEbY.js";
import path from "node:path";
//#region src/media/audio-transcode.ts
const DEFAULT_OPUS_SAMPLE_RATE_HZ = 48e3;
const DEFAULT_OPUS_BITRATE = "64k";
const DEFAULT_OPUS_CHANNELS = 1;
const DEFAULT_TEMP_PREFIX = "audio-opus-";
const DEFAULT_OUTPUT_FILE_NAME = "voice.opus";
function normalizeAudioExtension(params) {
	const fromExtension = params.inputExtension?.trim();
	const normalized = (fromExtension ? fromExtension.startsWith(".") ? fromExtension : `.${fromExtension}` : path.extname(params.inputFileName ?? "")).toLowerCase();
	return /^\.[a-z0-9]{1,12}$/.test(normalized) ? normalized : ".audio";
}
function normalizeTempPrefix(value) {
	const sanitized = value?.trim().replace(/[^a-zA-Z0-9._-]/g, "-");
	if (!sanitized || sanitized === "." || sanitized === "..") return DEFAULT_TEMP_PREFIX;
	return sanitized.endsWith("-") ? sanitized : `${sanitized}-`;
}
function normalizeOutputFileName(value) {
	const baseName = basenameFromAnyPath(value?.trim() || DEFAULT_OUTPUT_FILE_NAME);
	if (/^[a-zA-Z0-9._-]{1,80}$/.test(baseName) && baseName !== "." && baseName !== "..") return baseName;
	return DEFAULT_OUTPUT_FILE_NAME;
}
function resolveMaxDurationSeconds(value) {
	if (value === void 0) return;
	if (!Number.isFinite(value) || value <= 0) throw new Error("maxDurationSeconds must be a positive finite number");
	return value;
}
/** Transcodes arbitrary audio input into mono Opus using a scoped temp workspace. */
async function transcodeAudioBufferToOpus(params) {
	const maxDurationSeconds = resolveMaxDurationSeconds(params.maxDurationSeconds);
	return await withTempWorkspace({
		rootDir: resolvePreferredOpenClawTmpDir(),
		prefix: normalizeTempPrefix(params.tempPrefix)
	}, async (workspace) => {
		const inputPath = await workspace.write(`input${normalizeAudioExtension(params)}`, params.audioBuffer);
		const outputFileName = normalizeOutputFileName(params.outputFileName);
		await writeExternalFileWithinRoot({
			rootDir: workspace.dir,
			path: outputFileName,
			write: async (outputPath) => {
				await runFfmpeg([
					"-hide_banner",
					"-loglevel",
					"error",
					"-y",
					"-i",
					inputPath,
					"-vn",
					"-sn",
					"-dn",
					...maxDurationSeconds === void 0 ? [] : ["-t", String(maxDurationSeconds)],
					"-c:a",
					"libopus",
					"-b:a",
					params.bitrate ?? DEFAULT_OPUS_BITRATE,
					"-ar",
					String(params.sampleRateHz ?? DEFAULT_OPUS_SAMPLE_RATE_HZ),
					"-ac",
					String(params.channels ?? DEFAULT_OPUS_CHANNELS),
					"-f",
					"opus",
					outputPath
				], { timeoutMs: params.timeoutMs });
			}
		});
		return await workspace.read(outputFileName);
	});
}
/** Transcodes known audio container pairs, currently using macOS afconvert recipes where needed. */
async function transcodeAudioBuffer(params) {
	const source = normalizeContainerExt(params.sourceExtension);
	const target = normalizeContainerExt(params.targetExtension);
	if (!source || !target) return {
		ok: false,
		reason: "invalid-extension"
	};
	if (source === target) return {
		ok: false,
		reason: "noop-same-container"
	};
	const recipe = pickAfconvertRecipe(source, target);
	if (!recipe) return {
		ok: false,
		reason: "no-recipe"
	};
	if (process.platform !== "darwin") return {
		ok: false,
		reason: "platform-unsupported"
	};
	const tmp = tempWorkspaceSync({
		rootDir: resolvePreferredOpenClawTmpDir(),
		prefix: "tts-transcode-"
	});
	const inPath = tmp.write(`in.${source}`, params.audioBuffer);
	const outPath = tmp.path(`out.${target}`);
	try {
		const result = await runAfconvert({
			args: [
				...recipe,
				inPath,
				outPath
			],
			timeoutMs: params.timeoutMs ?? 5e3
		});
		if (!result.ok) return {
			ok: false,
			reason: "transcoder-failed",
			detail: result.detail
		};
		return {
			ok: true,
			buffer: tmp.read(`out.${target}`)
		};
	} catch (err) {
		return {
			ok: false,
			reason: "transcoder-failed",
			detail: err.message
		};
	} finally {
		tmp.cleanup();
	}
}
function normalizeContainerExt(ext) {
	const trimmed = ext.trim().toLowerCase().replace(/^\./, "");
	return /^[a-z0-9]{1,12}$/.test(trimmed) ? trimmed : void 0;
}
function pickAfconvertRecipe(_source, target) {
	if (target === "caf") return [
		"-f",
		"caff",
		"-d",
		"opus@24000",
		"-c",
		"1"
	];
}
async function runAfconvert(params) {
	try {
		const result = await runCommandWithTimeout(["/usr/bin/afconvert", ...params.args], {
			maxOutputBytes: 1024,
			timeoutMs: params.timeoutMs
		});
		if (result.termination === "timeout") return {
			ok: false,
			detail: `timeout-${params.timeoutMs}ms`
		};
		return result.code === 0 ? { ok: true } : {
			ok: false,
			detail: `exit-${result.code ?? "unknown"}`
		};
	} catch (err) {
		return {
			ok: false,
			detail: err instanceof Error ? err.message : String(err)
		};
	}
}
//#endregion
export { transcodeAudioBufferToOpus as n, transcodeAudioBuffer as t };
