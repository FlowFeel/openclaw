import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as fetchWithSsrFGuard } from "./fetch-guard-CE5RRhcq.js";
import { m as readProviderJsonResponse } from "./provider-http-errors-Cj7zfu8U.js";
import { s as coerceSecretRef } from "./types.secrets-BvApkFoj.js";
import { n as enablePluginInConfig } from "./enable-fTclAE3x.js";
import { c as isNonSecretApiKeyMarker } from "./model-auth-markers-z4js65k2.js";
import { t as normalizeOptionalSecretInput } from "./normalize-secret-input-Df_qhWv_.js";
import { t as resolveEnvApiKey } from "./model-auth-env-Dh-g1B4g.js";
import { _ as readStringParam, p as readPositiveIntegerParam } from "./common-yW0U9cHP.js";
import { o as wrapWebContent } from "./external-content-NkkZExk2.js";
import "./provider-auth-SalgjzRl.js";
import { a as truncateText } from "./web-fetch-utils-CW6hCUJx.js";
import { a as readResponseText } from "./web-shared-GN7fVb2k.js";
import { g as resolveSearchCount, v as resolveSiteName } from "./web-search-provider-common-C57ra4nC.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./secret-input-Dsfz4fVL.js";
import "./ssrf-runtime-BKWYxujx.js";
import "./provider-auth-runtime-y5vTf3MK.js";
import "./provider-http-BV0argQa.js";
import { i as resolveProviderWebSearchPluginConfig } from "./web-search-provider-config-CZc1Mkyg.js";
import { t as resolveWebSearchProviderCredential } from "./provider-web-search-DcrU7uie.js";
import { i as OLLAMA_DEFAULT_BASE_URL } from "./defaults-h8fOLDCy.js";
import { _ as resolveOllamaApiBase, d as fetchOllamaModels, r as buildOllamaBaseUrlSsrFPolicy, t as readProviderBaseUrl } from "./provider-base-url-D9XsktX-.js";
import { t as checkOllamaCloudAuth } from "./setup-DzwsGSBQ.js";
import { Type } from "typebox";
//#region extensions/ollama/src/web-search-provider.ts
const OLLAMA_WEB_SEARCH_SCHEMA = Type.Object({
	query: Type.String({ description: "Search query string." }),
	count: Type.Optional(Type.Integer({
		description: "Number of results to return (1-10).",
		minimum: 1,
		maximum: 10
	}))
}, { additionalProperties: false });
const OLLAMA_HOSTED_WEB_SEARCH_PATH = "/api/web_search";
const OLLAMA_LOCAL_WEB_SEARCH_PROXY_PATH = "/api/experimental/web_search";
const OLLAMA_CLOUD_BASE_URL = "https://ollama.com";
const DEFAULT_OLLAMA_WEB_SEARCH_COUNT = 5;
const DEFAULT_OLLAMA_WEB_SEARCH_TIMEOUT_MS = 15e3;
const OLLAMA_WEB_SEARCH_SNIPPET_MAX_CHARS = 300;
async function readOllamaWebSearchResponse(response) {
	return await readProviderJsonResponse(response, "Ollama web search");
}
function isOllamaCloudBaseUrl(baseUrl) {
	try {
		const parsed = new URL(baseUrl);
		return parsed.protocol === "https:" && parsed.hostname === "ollama.com";
	} catch {
		return false;
	}
}
function normalizeOllamaWebSearchApiKey(value) {
	const apiKey = normalizeOptionalSecretInput(value);
	return apiKey && !isNonSecretApiKeyMarker(apiKey) ? apiKey : void 0;
}
function resolveEnvOllamaWebSearchApiKey() {
	return normalizeOllamaWebSearchApiKey(resolveEnvApiKey("ollama")?.apiKey);
}
function createOllamaWebSearchCredentialError(ref) {
	return /* @__PURE__ */ new Error(ref.source === "env" ? `models.providers.ollama.apiKey env SecretRef ${ref.id} is not available for Ollama web search.` : "models.providers.ollama.apiKey SecretRef cannot be resolved by Ollama web search. Use an env SecretRef for this path.");
}
function resolveConfiguredOllamaWebSearchApiKey(config) {
	const credentialValue = config?.models?.providers?.ollama?.apiKey;
	const credentialRef = coerceSecretRef(credentialValue);
	const resolvedValue = normalizeOllamaWebSearchApiKey(resolveWebSearchProviderCredential({
		credentialValue,
		path: "models.providers.ollama.apiKey",
		envVars: []
	}));
	if (credentialRef && !resolvedValue) throw createOllamaWebSearchCredentialError(credentialRef);
	return resolvedValue;
}
function resolveOllamaWebSearchBaseUrl(config) {
	const pluginBaseUrl = normalizeOptionalString(resolveProviderWebSearchPluginConfig(config, "ollama")?.baseUrl);
	if (pluginBaseUrl) return resolveOllamaApiBase(pluginBaseUrl);
	const configuredBaseUrl = readProviderBaseUrl(config?.models?.providers?.ollama);
	if (configuredBaseUrl) return resolveOllamaApiBase(configuredBaseUrl);
	return OLLAMA_DEFAULT_BASE_URL;
}
function normalizeOllamaWebSearchResult(result) {
	const url = normalizeOptionalString(result.url) ?? "";
	if (!url) return null;
	return {
		title: normalizeOptionalString(result.title) ?? "",
		url,
		content: normalizeOptionalString(result.content) ?? ""
	};
}
function buildOllamaWebSearchAttempts(params) {
	if (isOllamaCloudBaseUrl(params.baseUrl)) return [{
		baseUrl: params.baseUrl,
		path: OLLAMA_HOSTED_WEB_SEARCH_PATH,
		apiKey: params.configuredApiKey ?? params.envApiKey
	}];
	const attempts = [{
		baseUrl: params.baseUrl,
		path: OLLAMA_LOCAL_WEB_SEARCH_PROXY_PATH,
		apiKey: params.configuredApiKey
	}, {
		baseUrl: params.baseUrl,
		path: OLLAMA_HOSTED_WEB_SEARCH_PATH,
		apiKey: params.configuredApiKey
	}];
	if (params.envApiKey) attempts.push({
		baseUrl: OLLAMA_CLOUD_BASE_URL,
		path: OLLAMA_HOSTED_WEB_SEARCH_PATH,
		apiKey: params.envApiKey
	});
	return attempts;
}
async function runOllamaWebSearch(params) {
	const query = params.query.trim();
	if (!query) throw new Error("query parameter is required");
	const baseUrl = resolveOllamaWebSearchBaseUrl(params.config);
	const configuredApiKey = resolveConfiguredOllamaWebSearchApiKey(params.config);
	const envApiKey = resolveEnvOllamaWebSearchApiKey();
	const count = resolveSearchCount(params.count, DEFAULT_OLLAMA_WEB_SEARCH_COUNT);
	const startedAt = Date.now();
	const body = JSON.stringify({
		query,
		max_results: count
	});
	const attempts = buildOllamaWebSearchAttempts({
		baseUrl,
		configuredApiKey,
		envApiKey
	});
	let payload;
	let lastError;
	for (const attempt of attempts) {
		params.signal?.throwIfAborted();
		const headers = { "Content-Type": "application/json" };
		if (attempt.apiKey) headers.Authorization = `Bearer ${attempt.apiKey}`;
		const { response, release } = await fetchWithSsrFGuard({
			url: `${attempt.baseUrl}${attempt.path}`,
			init: {
				method: "POST",
				headers,
				body
			},
			timeoutMs: DEFAULT_OLLAMA_WEB_SEARCH_TIMEOUT_MS,
			...params.signal ? { signal: params.signal } : {},
			policy: buildOllamaBaseUrlSsrFPolicy(attempt.baseUrl),
			auditContext: "ollama-web-search.search"
		});
		try {
			if (response.status === 401) throw new Error("Ollama web search authentication failed. Run `ollama signin`.");
			if (response.status === 403) throw new Error("Ollama web search is unavailable. Ensure cloud-backed web search is enabled on the Ollama host.");
			if (!response.ok) {
				const detail = await readResponseText(response, { maxBytes: 64e3 });
				const message = `Ollama web search failed (${response.status}): ${detail.text || ""}`.trim();
				if (response.status === 404) {
					lastError = new Error(message);
					continue;
				}
				throw new Error(message);
			}
			payload = await readOllamaWebSearchResponse(response);
			params.signal?.throwIfAborted();
			break;
		} catch (error) {
			if (error instanceof Error) lastError = error;
			else lastError = new Error(String(error));
			throw lastError;
		} finally {
			if (!response.bodyUsed) response.body?.cancel().catch(() => void 0);
			await release();
		}
	}
	if (!payload) throw lastError ?? /* @__PURE__ */ new Error("Ollama web search failed");
	const results = Array.isArray(payload.results) ? payload.results.map(normalizeOllamaWebSearchResult).filter((result) => result !== null).slice(0, count) : [];
	return {
		query,
		provider: "ollama",
		count: results.length,
		tookMs: Date.now() - startedAt,
		externalContent: {
			untrusted: true,
			source: "web_search",
			provider: "ollama",
			wrapped: true
		},
		results: results.map((result) => {
			const snippet = truncateText(result.content, OLLAMA_WEB_SEARCH_SNIPPET_MAX_CHARS).text;
			return {
				title: result.title ? wrapWebContent(result.title, "web_search") : "",
				url: result.url,
				snippet: snippet ? wrapWebContent(snippet, "web_search") : "",
				siteName: resolveSiteName(result.url) || void 0
			};
		})
	};
}
async function warnOllamaWebSearchPrereqs(params) {
	const baseUrl = resolveOllamaWebSearchBaseUrl(params.config);
	const { reachable } = await fetchOllamaModels(baseUrl);
	if (!reachable) {
		await params.prompter.note([
			"Ollama Web Search requires Ollama to be running.",
			`Expected host: ${baseUrl}`,
			"Start Ollama before using this provider."
		].join("\n"), "Ollama Web Search");
		return params.config;
	}
	const auth = await checkOllamaCloudAuth(baseUrl);
	if (!auth.signedIn) await params.prompter.note(["Ollama Web Search requires `ollama signin`.", ...auth.signinUrl ? [auth.signinUrl] : ["Run `ollama signin`."]].join("\n"), "Ollama Web Search");
	return params.config;
}
function createOllamaWebSearchProvider() {
	return {
		id: "ollama",
		label: "Ollama Web Search",
		hint: "Local Ollama host · requires ollama signin",
		onboardingScopes: ["text-inference"],
		requiresCredential: false,
		envVars: [],
		placeholder: "(run ollama signin)",
		signupUrl: "https://ollama.com/",
		docsUrl: "https://docs.openclaw.ai/tools/web",
		autoDetectOrder: 110,
		credentialPath: "",
		getCredentialValue: () => void 0,
		setCredentialValue: () => {},
		applySelectionConfig: (config) => enablePluginInConfig(config, "ollama").config,
		runSetup: async (ctx) => await warnOllamaWebSearchPrereqs({
			config: ctx.config,
			prompter: ctx.prompter
		}),
		createTool: (ctx) => ({
			description: "Search the web using Ollama's web search API. Returns titles, URLs, and snippets from the configured Ollama host.",
			parameters: OLLAMA_WEB_SEARCH_SCHEMA,
			execute: async (args, context) => {
				context?.signal?.throwIfAborted();
				return await runOllamaWebSearch({
					config: ctx.config,
					query: readStringParam(args, "query", { required: true }),
					count: readPositiveIntegerParam(args, "count", {
						max: 10,
						message: "count must be an integer from 1 to 10."
					}),
					signal: context?.signal
				});
			}
		})
	};
}
//#endregion
export { createOllamaWebSearchProvider as t };
