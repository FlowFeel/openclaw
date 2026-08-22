import { p as readStringValue } from "./string-coerce-DW4mBlAt.js";
import { i as redactSecrets, u as redactToolPayloadText } from "./redact-DUpJZuMu.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { o as swapSecretSentinelsInText } from "./sentinel-DVfNmxPl.js";
import { r as resolveProviderRequestCapabilities } from "./provider-attribution-D6GRQEFS.js";
import { n as detectMime, u as normalizeMimeType } from "./mime-Ir6g3Vae.js";
import { n as estimateBase64DecodedBytes, t as canonicalizeBase64 } from "./base64-KcXAb-1x.js";
import { n as resolveModelRequestTimeoutMs, t as buildGuardedModelFetch } from "./provider-transport-fetch-CpJ8peau.js";
import { a as convertImageToJpeg, o as convertImageToPng } from "./image-ops-BtojRCsZ.js";
import { configureAiTransportHost } from "@openclaw/ai";
//#region src/agents/openai-strict-tool-setting.ts
/**
* Strict tool-schema default resolution for native OpenAI-compatible routes.
*
* Compatible providers can support strict schemas without inheriting OpenAI's required default.
*/
const optionalString = readStringValue;
function resolvesToNativeOpenAIStrictTools(model, transport) {
	const capabilities = resolveProviderRequestCapabilities({
		provider: optionalString(model.provider),
		api: optionalString(model.api),
		baseUrl: optionalString(model.baseUrl),
		capability: "llm",
		transport,
		modelId: optionalString(model.id),
		compat: model.compat
	});
	if (!capabilities.usesKnownNativeOpenAIRoute) return false;
	return capabilities.provider === "openai" || capabilities.provider === "azure-openai" || capabilities.provider === "azure-openai-responses";
}
/** Resolve the strict-tool setting for one OpenAI-compatible model/transport. */
function resolveOpenAIStrictToolSetting(model, options) {
	if (resolvesToNativeOpenAIStrictTools(model, options?.transport ?? "stream")) return true;
	if (options?.supportsStrictMode) return false;
}
//#endregion
//#region src/media/anthropic-inline-images.ts
const ANTHROPIC_SUPPORTED_IMAGE_MIMES = [
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp"
];
const ANTHROPIC_INLINE_IMAGE_DECODE_SAFETY_BYTES = 10 * 1024 * 1024;
const ANTHROPIC_SUPPORTED_IMAGE_MIME_SET = new Set(ANTHROPIC_SUPPORTED_IMAGE_MIMES);
function isAnthropicSupportedImageMime(value) {
	return typeof value === "string" && ANTHROPIC_SUPPORTED_IMAGE_MIME_SET.has(value);
}
async function normalizeAnthropicInlineImage(block) {
	const canonicalData = canonicalizeBase64(block.data) ?? block.data.trim();
	const buffer = Buffer.from(canonicalData, "base64");
	const declaredMime = normalizeMimeType(block.mimeType);
	const detectedMime = normalizeMimeType(await detectMime({ buffer }));
	if (isAnthropicSupportedImageMime(detectedMime)) return {
		data: canonicalData,
		mimeType: detectedMime
	};
	if (!detectedMime && isAnthropicSupportedImageMime(declaredMime)) return {
		data: canonicalData,
		mimeType: declaredMime
	};
	const convertToPng = detectedMime === "image/bmp";
	const normalizedBuffer = convertToPng ? await convertImageToPng(buffer) : await convertImageToJpeg(buffer);
	if (normalizedBuffer.byteLength > ANTHROPIC_INLINE_IMAGE_DECODE_SAFETY_BYTES) throw new Error("Normalized Anthropic inline image exceeds the 10 MB decoded safety limit.");
	return {
		data: normalizedBuffer.toString("base64"),
		mimeType: convertToPng ? "image/png" : "image/jpeg"
	};
}
async function normalizeAnthropicInlineContentBlocks(content) {
	for (const block of content) {
		if (block.type !== "image") continue;
		if (estimateBase64DecodedBytes(block.data) > ANTHROPIC_INLINE_IMAGE_DECODE_SAFETY_BYTES) throw new Error("Anthropic inline image exceeds the 10 MB decoded safety limit.");
	}
	const normalized = [];
	for (const block of content) {
		if (block.type !== "image") {
			normalized.push(block);
			continue;
		}
		normalized.push({
			...block,
			...await normalizeAnthropicInlineImage(block)
		});
	}
	return normalized;
}
//#endregion
//#region src/llm/ai-transport-host.ts
const transportLogBySubsystem = /* @__PURE__ */ new Map();
function transportLog(subsystem) {
	let log = transportLogBySubsystem.get(subsystem);
	if (!log) {
		log = createSubsystemLogger(subsystem);
		transportLogBySubsystem.set(subsystem, log);
	}
	return log;
}
configureAiTransportHost({
	buildModelFetch: buildGuardedModelFetch,
	resolveSecretSentinel: (value) => {
		const swapped = swapSecretSentinelsInText(value);
		const unknown = swapped.unknown[0];
		if (unknown) throw new Error(`Secret sentinel ${unknown} is not registered in this process; refusing to construct provider client`);
		return swapped.text;
	},
	redactSecrets,
	redactToolPayloadText,
	normalizeAnthropicInlineContentBlocks,
	resolveOpenAIStrictToolSetting,
	resolveModelRequestTimeoutMs: (model) => resolveModelRequestTimeoutMs(model, void 0),
	logDebug: (subsystem, build) => {
		const log = transportLog(subsystem);
		if (!log.isEnabled("debug", "any")) return;
		const entry = build();
		if (entry) log.debug(entry.message, entry.data);
	},
	logInfo: (subsystem, message, data) => transportLog(subsystem).info(message, data),
	logWarn: (subsystem, message, data) => transportLog(subsystem).warn(message, data)
});
//#endregion
export {};
