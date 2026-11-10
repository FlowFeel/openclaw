import { c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./model-compat-DUHhYgC8.js";
import "./model-definitions-DS2_tBMV.js";
import { t as isXaiProviderId } from "./provider-id-DSjkYYKR.js";
import "./provider-catalog-DHKiF3-O.js";
import "./onboard-Cdex6uw-.js";
import "./image-generation-provider-Bqv3ugsv.js";
import "./runtime-model-compat-CbdLmMVi.js";
import "./provider-models-Dvbp1SK7.js";
//#region extensions/xai/api.ts
const XAI_NATIVE_ENDPOINT_HOSTS = /* @__PURE__ */ new Set(["api.x.ai"]);
function resolveHostname(value) {
	try {
		return new URL(value).hostname.toLowerCase();
	} catch {
		return;
	}
}
function isXaiNativeEndpoint(baseUrl) {
	return typeof baseUrl === "string" && XAI_NATIVE_ENDPOINT_HOSTS.has(resolveHostname(baseUrl) ?? "");
}
function isXaiModelHint(modelId) {
	return getModelProviderHint(modelId) === "x-ai";
}
function getModelProviderHint(modelId) {
	const trimmed = normalizeOptionalLowercaseString(modelId);
	if (!trimmed) return null;
	const slashIndex = trimmed.indexOf("/");
	if (slashIndex <= 0) return null;
	return trimmed.slice(0, slashIndex) || null;
}
function shouldUseXaiResponsesTransport(params) {
	const hasDefaultXaiRoute = isXaiProviderId(params.provider) && !normalizeOptionalString(params.baseUrl);
	return params.api === "openai-responses" ? hasDefaultXaiRoute : params.api === "openai-completions" && (isXaiNativeEndpoint(params.baseUrl) || hasDefaultXaiRoute);
}
function resolveXaiTransport(params) {
	if (!shouldUseXaiResponsesTransport(params)) return;
	return {
		api: "openai-responses",
		baseUrl: normalizeOptionalString(params.baseUrl) ?? (isXaiProviderId(params.provider) ? "https://api.x.ai/v1" : void 0)
	};
}
//#endregion
export { resolveXaiTransport as n, isXaiModelHint as t };
