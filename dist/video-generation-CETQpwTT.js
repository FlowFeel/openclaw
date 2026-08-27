import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { u as readResponseWithLimit } from "./http-body-DhB9daEt.js";
import { m as readProviderJsonResponse, r as assertOkOrThrowHttpError } from "./provider-http-errors-Dm9G78mz.js";
import { p as sanitizeConfiguredModelProviderRequest } from "./provider-request-config-DZemMjbU.js";
import { r as resolveGeneratedMediaMaxBytes } from "./configured-max-bytes-DnjCdIxf.js";
import { r as isProviderApiKeyConfigured } from "./provider-auth-Cot2SGgW.js";
import { t as executeProviderOperationWithRetry } from "./operation-retry-D0h2PXUu.js";
import { c as postJsonRequest, g as waitProviderOperationPollInterval, h as resolveProviderOperationTimeoutMs, n as createProviderOperationDeadline, o as fetchWithTimeoutGuarded, p as resolveProviderHttpRequestConfig, r as createProviderOperationTimeoutResolver } from "./shared-Ck9SyaVQ.js";
import { a as resolveApiKeyForProvider } from "./provider-auth-runtime-BN5AmRpe.js";
import "./provider-http-C8bsuM26.js";
//#region src/video-generation/dashscope-compatible.ts
const DEFAULT_DASHSCOPE_WAN_VIDEO_MODEL = "wan2.6-t2v";
const DASHSCOPE_WAN_VIDEO_MODELS = [
	DEFAULT_DASHSCOPE_WAN_VIDEO_MODEL,
	"wan2.6-i2v",
	"wan2.6-r2v",
	"wan2.6-r2v-flash",
	"wan2.7-r2v"
];
const DASHSCOPE_WAN_VIDEO_CAPABILITIES = {
	generate: {
		maxVideos: 1,
		maxDurationSeconds: 10,
		supportsSize: true,
		supportsAspectRatio: true,
		supportsResolution: true,
		supportsAudio: true,
		supportsWatermark: true
	},
	imageToVideo: {
		enabled: true,
		maxVideos: 1,
		maxInputImages: 1,
		maxDurationSeconds: 10,
		supportsSize: true,
		supportsAspectRatio: true,
		supportsResolution: true,
		supportsAudio: true,
		supportsWatermark: true
	},
	videoToVideo: {
		enabled: true,
		maxVideos: 1,
		maxInputVideos: 4,
		maxDurationSeconds: 10,
		supportsSize: true,
		supportsAspectRatio: true,
		supportsResolution: true,
		supportsAudio: true,
		supportsWatermark: true
	}
};
const DEFAULT_VIDEO_GENERATION_DURATION_SECONDS = 5;
const DEFAULT_VIDEO_GENERATION_TIMEOUT_MS = 12e4;
const DEFAULT_VIDEO_RESOLUTION_TO_SIZE = {
	"480P": "832*480",
	"720P": "1280*720",
	"1080P": "1920*1080"
};
const DEFAULT_VIDEO_GENERATION_POLL_INTERVAL_MS = 2500;
const DEFAULT_VIDEO_GENERATION_MAX_POLL_ATTEMPTS = 120;
function buildDashscopeVideoGenerationInput(params) {
	if ([...params.req.inputImages ?? [], ...params.req.inputVideos ?? []].some((asset) => !asset.url?.trim() && asset.buffer)) throw new Error(`${params.providerLabel} video generation currently requires remote http(s) URLs for reference images/videos.`);
	const input = { prompt: params.req.prompt };
	const referenceUrls = resolveVideoGenerationReferenceUrls(params.req.inputImages, params.req.inputVideos);
	if (referenceUrls.length === 1 && (params.req.inputImages?.length ?? 0) === 1 && !params.req.inputVideos?.length) input.img_url = referenceUrls[0];
	else if (referenceUrls.length > 0) input.reference_urls = referenceUrls;
	return input;
}
function resolveVideoGenerationReferenceUrls(inputImages, inputVideos) {
	return [...inputImages ?? [], ...inputVideos ?? []].map((asset) => asset.url?.trim()).filter((value) => Boolean(value));
}
function buildDashscopeVideoGenerationParameters(req, resolutionToSize = DEFAULT_VIDEO_RESOLUTION_TO_SIZE) {
	const parameters = {};
	const size = req.size?.trim() || (req.resolution ? resolutionToSize[req.resolution] : void 0);
	if (size) parameters.size = size;
	if (req.aspectRatio?.trim()) parameters.aspect_ratio = req.aspectRatio.trim();
	if (typeof req.durationSeconds === "number" && Number.isFinite(req.durationSeconds)) parameters.duration = Math.max(1, Math.round(req.durationSeconds));
	if (typeof req.audio === "boolean") parameters.enable_audio = req.audio;
	if (typeof req.watermark === "boolean") parameters.watermark = req.watermark;
	return Object.keys(parameters).length > 0 ? parameters : void 0;
}
function extractDashscopeVideoUrls(payload) {
	return uniqueStrings([...payload.output?.results?.map((entry) => entry.video_url).filter(Boolean) ?? [], payload.output?.video_url].filter((value) => typeof value === "string" && value.trim().length > 0));
}
async function pollDashscopeVideoTaskUntilComplete(params) {
	const defaultTimeoutMs = params.defaultTimeoutMs ?? 12e4;
	const deadline = createProviderOperationDeadline({
		timeoutMs: params.timeoutMs,
		label: `${params.providerLabel} video generation task ${params.taskId}`
	});
	for (let attempt = 0; attempt < DEFAULT_VIDEO_GENERATION_MAX_POLL_ATTEMPTS; attempt += 1) {
		const pollResult = await executeProviderOperationWithRetry({
			provider: params.providerLabel,
			stage: "poll",
			operation: async () => {
				const result = await fetchWithTimeoutGuarded(`${params.baseUrl}/api/v1/tasks/${params.taskId}`, {
					method: "GET",
					headers: params.headers
				}, createProviderOperationTimeoutResolver({
					deadline,
					defaultTimeoutMs
				})(), params.fetchFn, {
					...params.allowPrivateNetwork ? { ssrfPolicy: { allowPrivateNetwork: true } } : {},
					...params.dispatcherPolicy ? { dispatcherPolicy: params.dispatcherPolicy } : {}
				});
				try {
					await assertOkOrThrowHttpError(result.response, `${params.providerLabel} video-generation task poll failed`);
					return result;
				} catch (error) {
					await result.release();
					throw error;
				}
			}
		});
		let payload;
		try {
			payload = await readProviderJsonResponse(pollResult.response, `${params.providerLabel} video-generation task poll`);
		} finally {
			await pollResult.release();
		}
		const status = payload.output?.task_status?.trim().toUpperCase();
		if (status === "SUCCEEDED") return payload;
		if (status === "FAILED" || status === "CANCELED") throw new Error(payload.output?.message?.trim() || payload.message?.trim() || `${params.providerLabel} video generation task ${params.taskId} ${normalizeLowercaseStringOrEmpty(status)}`);
		await waitProviderOperationPollInterval({
			deadline,
			pollIntervalMs: DEFAULT_VIDEO_GENERATION_POLL_INTERVAL_MS
		});
	}
	throw new Error(`${params.providerLabel} video generation task ${params.taskId} did not finish in time`);
}
async function runDashscopeVideoGenerationTask(params) {
	const defaultTimeoutMs = params.defaultTimeoutMs ?? 12e4;
	const deadline = createProviderOperationDeadline({
		timeoutMs: params.timeoutMs,
		label: `${params.providerLabel} video generation`
	});
	const { response, release } = await postJsonRequest({
		url: params.url,
		headers: params.headers,
		body: {
			model: params.model,
			input: buildDashscopeVideoGenerationInput({
				providerLabel: params.providerLabel,
				req: params.req
			}),
			parameters: buildDashscopeVideoGenerationParameters({
				...params.req,
				durationSeconds: params.req.durationSeconds ?? 5
			}, DEFAULT_VIDEO_RESOLUTION_TO_SIZE)
		},
		timeoutMs: resolveProviderOperationTimeoutMs({
			deadline,
			defaultTimeoutMs
		}),
		fetchFn: params.fetchFn,
		allowPrivateNetwork: params.allowPrivateNetwork,
		dispatcherPolicy: params.dispatcherPolicy
	});
	try {
		await assertOkOrThrowHttpError(response, `${params.providerLabel} video generation failed`);
		const submitted = await readProviderJsonResponse(response, `${params.providerLabel} video generation`);
		const taskId = submitted.output?.task_id?.trim();
		if (!taskId) throw new Error(`${params.providerLabel} video generation response missing task_id`);
		const completed = await pollDashscopeVideoTaskUntilComplete({
			providerLabel: params.providerLabel,
			taskId,
			headers: params.headers,
			timeoutMs: resolveProviderOperationTimeoutMs({
				deadline,
				defaultTimeoutMs
			}),
			fetchFn: params.fetchFn,
			baseUrl: params.baseUrl,
			allowPrivateNetwork: params.allowPrivateNetwork,
			dispatcherPolicy: params.dispatcherPolicy,
			defaultTimeoutMs
		});
		const urls = extractDashscopeVideoUrls(completed);
		if (urls.length === 0) throw new Error(`${params.providerLabel} video generation completed without output video URLs`);
		return {
			videos: await downloadDashscopeGeneratedVideos({
				providerLabel: params.providerLabel,
				urls,
				timeoutMs: createProviderOperationTimeoutResolver({
					deadline,
					defaultTimeoutMs
				}),
				fetchFn: params.fetchFn,
				allowPrivateNetwork: params.allowPrivateNetwork,
				dispatcherPolicy: params.dispatcherPolicy,
				defaultTimeoutMs,
				maxBytes: resolveGeneratedMediaMaxBytes(params.req.cfg, "video")
			}),
			model: params.model,
			metadata: {
				requestId: submitted.request_id,
				taskId,
				taskStatus: completed.output?.task_status
			}
		};
	} finally {
		await release();
	}
}
function resolveDashscopeVideoDownloadTimeoutMs(providerLabel, timeoutMs, defaultTimeoutMs) {
	const resolved = typeof timeoutMs === "function" ? timeoutMs() : timeoutMs;
	const downloadTimeoutMs = typeof resolved === "number" && Number.isFinite(resolved) ? Math.max(0, Math.floor(resolved)) : defaultTimeoutMs ?? 12e4;
	if (downloadTimeoutMs <= 0) throw new Error(`${providerLabel} generated video download stalled: remaining budget exhausted`);
	return downloadTimeoutMs;
}
async function downloadDashscopeGeneratedVideos(params) {
	const videos = [];
	for (const [index, url] of params.urls.entries()) {
		const result = await executeProviderOperationWithRetry({
			provider: params.providerLabel,
			stage: "download",
			operation: async () => {
				const downloadTimeoutMs = resolveDashscopeVideoDownloadTimeoutMs(params.providerLabel, params.timeoutMs, params.defaultTimeoutMs);
				const guarded = await fetchWithTimeoutGuarded(url, { method: "GET" }, downloadTimeoutMs, params.fetchFn, {
					...params.allowPrivateNetwork ? { ssrfPolicy: { allowPrivateNetwork: true } } : {},
					...params.dispatcherPolicy ? { dispatcherPolicy: params.dispatcherPolicy } : {}
				});
				try {
					await assertOkOrThrowHttpError(guarded.response, `${params.providerLabel} generated video download failed`);
					return guarded;
				} catch (error) {
					await guarded.release();
					throw error;
				}
			}
		});
		let buffer;
		let mimeType;
		try {
			let downloadTimeoutMs;
			try {
				downloadTimeoutMs = resolveDashscopeVideoDownloadTimeoutMs(params.providerLabel, params.timeoutMs, params.defaultTimeoutMs);
			} catch (error) {
				await result.response.body?.cancel(error).catch(() => void 0);
				throw error;
			}
			buffer = await readResponseWithLimit(result.response, params.maxBytes, {
				chunkTimeoutMs: downloadTimeoutMs,
				onOverflow: ({ maxBytes }) => /* @__PURE__ */ new Error(`${params.providerLabel} generated video download exceeds ${maxBytes} bytes`),
				onIdleTimeout: ({ chunkTimeoutMs }) => /* @__PURE__ */ new Error(`${params.providerLabel} generated video download stalled: no data received for ${chunkTimeoutMs}ms`)
			});
			mimeType = result.response.headers.get("content-type")?.trim() || "video/mp4";
		} finally {
			await result.release();
		}
		videos.push({
			buffer,
			mimeType,
			fileName: `video-${index + 1}.mp4`,
			metadata: { sourceUrl: url }
		});
	}
	return videos;
}
//#endregion
//#region src/plugin-sdk/video-generation.ts
/** Builds one provider descriptor for the shared DashScope async video task protocol. */
function buildDashscopeVideoGenerationProvider(options) {
	const resolveRequestBaseUrl = options.resolveRequestBaseUrl ?? ((configuredBaseUrl) => configuredBaseUrl?.trim() || options.defaultBaseUrl);
	const resolveAigcBaseUrl = options.resolveAigcBaseUrl ?? ((baseUrl) => baseUrl.replace(/\/+$/u, ""));
	return {
		id: options.providerId,
		label: options.label,
		defaultModel: DEFAULT_DASHSCOPE_WAN_VIDEO_MODEL,
		models: [...DASHSCOPE_WAN_VIDEO_MODELS],
		isConfigured: (ctx) => {
			const baseUrl = ctx.cfg?.models?.providers?.[options.providerId]?.baseUrl;
			if (options.credentialPolicy?.acceptsBaseUrl?.(baseUrl) === false) return false;
			return isProviderApiKeyConfigured({
				provider: options.providerId,
				...ctx,
				profileTypes: options.credentialPolicy ? ["api_key"] : void 0,
				acceptsApiKey: options.credentialPolicy?.acceptsApiKey
			});
		},
		capabilities: DASHSCOPE_WAN_VIDEO_CAPABILITIES,
		async generateVideo(req) {
			const providerConfig = req.cfg?.models?.providers?.[options.providerId];
			if (options.credentialPolicy?.acceptsBaseUrl?.(providerConfig?.baseUrl) === false) throw new Error(options.credentialPolicy.unsupportedMessage);
			const auth = await resolveApiKeyForProvider({
				provider: options.providerId,
				cfg: req.cfg,
				agentDir: req.agentDir,
				store: req.authStore
			});
			if (!auth.apiKey) throw new Error(`${options.apiKeyLabel ?? options.label} API key missing`);
			if (options.credentialPolicy?.acceptsApiKey(auth.apiKey) === false) throw new Error(options.credentialPolicy.unsupportedMessage);
			const { baseUrl, allowPrivateNetwork, headers, dispatcherPolicy } = resolveProviderHttpRequestConfig({
				baseUrl: resolveRequestBaseUrl(providerConfig?.baseUrl),
				defaultBaseUrl: options.defaultBaseUrl,
				defaultHeaders: {
					Authorization: `Bearer ${auth.apiKey}`,
					"Content-Type": "application/json",
					"X-DashScope-Async": "enable"
				},
				provider: options.providerId,
				capability: "video",
				transport: "http",
				request: sanitizeConfiguredModelProviderRequest(providerConfig?.request)
			});
			const aigcBaseUrl = resolveAigcBaseUrl(baseUrl);
			return await runDashscopeVideoGenerationTask({
				providerLabel: options.taskLabel,
				model: req.model?.trim() || "wan2.6-t2v",
				req,
				url: `${aigcBaseUrl}/api/v1/services/aigc/video-generation/video-synthesis`,
				headers,
				baseUrl: aigcBaseUrl,
				timeoutMs: req.timeoutMs,
				fetchFn: fetch,
				allowPrivateNetwork,
				dispatcherPolicy,
				defaultTimeoutMs: DEFAULT_VIDEO_GENERATION_TIMEOUT_MS
			});
		}
	};
}
//#endregion
export { DEFAULT_VIDEO_GENERATION_DURATION_SECONDS as a, buildDashscopeVideoGenerationInput as c, extractDashscopeVideoUrls as d, pollDashscopeVideoTaskUntilComplete as f, DEFAULT_DASHSCOPE_WAN_VIDEO_MODEL as i, buildDashscopeVideoGenerationParameters as l, runDashscopeVideoGenerationTask as m, DASHSCOPE_WAN_VIDEO_CAPABILITIES as n, DEFAULT_VIDEO_GENERATION_TIMEOUT_MS as o, resolveVideoGenerationReferenceUrls as p, DASHSCOPE_WAN_VIDEO_MODELS as r, DEFAULT_VIDEO_RESOLUTION_TO_SIZE as s, buildDashscopeVideoGenerationProvider as t, downloadDashscopeGeneratedVideos as u };
