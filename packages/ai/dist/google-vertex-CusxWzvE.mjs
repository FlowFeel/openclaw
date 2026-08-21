import { t as AssistantMessageEventStream } from "./event-stream-CEV9t6da.mjs";
import { n as getAiTransportHost, r as resolveAiTransportHeaderSentinels, v as normalizeOptionalString } from "./host-Bl7Kgddo.mjs";
import { c as buildBaseOptions } from "./tool-result-text-Dvkp2Dus.mjs";
import { i as runGoogleGenerateContentLifecycle, n as buildGoogleSimpleThinking, r as createGoogleAssistantOutput, t as buildGoogleGenerateContentParams } from "./google-shared-Cq2UKx1l.mjs";
import { GoogleGenAI, ResourceScope } from "@google/genai";
//#region packages/ai/src/providers/google-vertex.ts
const API_VERSION = "v1";
const GCP_VERTEX_CREDENTIALS_MARKER = "gcp-vertex-credentials";
let toolCallCounter = 0;
const streamGoogleVertex = (model, context, options) => {
	const stream = new AssistantMessageEventStream();
	runGoogleGenerateContentLifecycle({
		stream,
		model,
		output: createGoogleAssistantOutput(model, "google-vertex"),
		options,
		createClient: () => {
			const apiKey = resolveApiKey(options);
			return apiKey ? createClientWithApiKey(model, apiKey, options?.headers) : createClient(model, resolveProject(options), resolveLocation(options), options?.headers);
		},
		buildParams: () => buildParams(model, context, options),
		nextToolCallId: (name) => `${name}_${Date.now()}_${++toolCallCounter}`
	});
	return stream;
};
const streamSimpleGoogleVertex = (model, context, options) => {
	const base = buildBaseOptions(model, options, void 0);
	return streamGoogleVertex(model, context, {
		...base,
		thinking: buildGoogleSimpleThinking(model, options, {
			includeGemma4ThinkingLevel: true,
			useFlashLiteBudgets: true
		})
	});
};
function createClient(model, project, location, optionsHeaders) {
	return new GoogleGenAI({
		vertexai: true,
		project,
		location,
		apiVersion: API_VERSION,
		httpOptions: buildHttpOptions(model, optionsHeaders)
	});
}
function createClientWithApiKey(model, apiKey, optionsHeaders) {
	return new GoogleGenAI({
		vertexai: true,
		apiKey: getAiTransportHost().resolveSecretSentinel(apiKey),
		apiVersion: API_VERSION,
		httpOptions: buildHttpOptions(model, optionsHeaders)
	});
}
function buildHttpOptions(model, optionsHeaders) {
	const httpOptions = {};
	const baseUrl = resolveCustomBaseUrl(model.baseUrl);
	if (baseUrl) {
		httpOptions.baseUrl = baseUrl;
		httpOptions.baseUrlResourceScope = ResourceScope.COLLECTION;
		if (baseUrlIncludesApiVersion(baseUrl)) httpOptions.apiVersion = "";
	}
	if (model.headers || optionsHeaders) httpOptions.headers = resolveAiTransportHeaderSentinels({
		...model.headers,
		...optionsHeaders
	});
	return Object.keys(httpOptions).length > 0 ? httpOptions : void 0;
}
function resolveCustomBaseUrl(baseUrl) {
	const trimmed = baseUrl.trim();
	if (!trimmed || trimmed.includes("{location}")) return;
	return trimmed;
}
function baseUrlIncludesApiVersion(baseUrl) {
	try {
		return new URL(baseUrl).pathname.split("/").some((part) => /^v\d+(?:beta\d*)?$/.test(part));
	} catch {
		return /(?:^|\/)v\d+(?:beta\d*)?(?:\/|$)/.test(baseUrl);
	}
}
function resolveApiKey(options) {
	const apiKey = options?.apiKey?.trim() || process.env.GOOGLE_CLOUD_API_KEY?.trim();
	if (!apiKey || apiKey === GCP_VERTEX_CREDENTIALS_MARKER || isPlaceholderApiKey(apiKey)) return;
	return apiKey;
}
function isPlaceholderApiKey(apiKey) {
	return /^<[^>]+>$/.test(apiKey);
}
function resolveProject(options) {
	const project = normalizeOptionalString(options?.project) || normalizeOptionalString(process.env.GOOGLE_CLOUD_PROJECT) || normalizeOptionalString(process.env.GCLOUD_PROJECT);
	if (!project) throw new Error("Vertex AI requires a project ID. Set GOOGLE_CLOUD_PROJECT/GCLOUD_PROJECT or pass project in options.");
	return project;
}
function resolveLocation(options) {
	const location = normalizeOptionalString(options?.location) || normalizeOptionalString(process.env.GOOGLE_CLOUD_LOCATION);
	if (!location) throw new Error("Vertex AI requires a location. Set GOOGLE_CLOUD_LOCATION or pass location in options.");
	return location;
}
function buildParams(model, context, options = {}) {
	return buildGoogleGenerateContentParams(model, context, options);
}
//#endregion
export { streamGoogleVertex, streamSimpleGoogleVertex };
