import { u as readResponseWithLimit } from "./http-body-CcNaNPg0.js";
//#region src/gateway/control-ui-github-api.ts
const GITHUB_API_ORIGIN = "https://api.github.com";
const GITHUB_JSON_MAX_BYTES = 256 * 1024;
const GITHUB_REQUEST_TIMEOUT_MS = 8e3;
const GITHUB_API_VERSION = "2022-11-28";
const GITHUB_API_MAX_REDIRECTS = 3;
var ControlUiGitHubError = class extends Error {
	constructor(statusCode, message) {
		super(message);
		this.name = "ControlUiGitHubError";
		this.statusCode = statusCode;
	}
};
function requiredString(record, key) {
	const value = record[key];
	if (typeof value !== "string" || !value.trim()) throw new ControlUiGitHubError(502, `GitHub response omitted ${key}`);
	return value;
}
function optionalString(record, key) {
	const value = record[key];
	return typeof value === "string" && value.trim() ? value : void 0;
}
function optionalNumber(record, key) {
	const value = record[key];
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function githubApiToken() {
	return process.env.GH_TOKEN?.trim() || process.env.GITHUB_TOKEN?.trim() || void 0;
}
function githubApiHeaders(token) {
	const headers = {
		Accept: "application/vnd.github+json",
		"User-Agent": "OpenClaw-Control-UI",
		"X-GitHub-Api-Version": GITHUB_API_VERSION
	};
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
}
function isGitHubApiRedirect(status) {
	return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}
function safeGitHubApiUrl(raw, base) {
	try {
		const url = new URL(raw, base);
		if (url.origin !== "https://api.github.com" || url.username || url.password || url.port) return null;
		return url;
	} catch {
		return null;
	}
}
async function fetchGitHubApi(rawUrl, fetchImpl, token, beforeRedirect) {
	const initialUrl = safeGitHubApiUrl(rawUrl);
	if (!initialUrl) throw new ControlUiGitHubError(502, "Invalid GitHub API URL");
	let url = initialUrl;
	const signal = AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS);
	for (let redirects = 0;; redirects += 1) {
		const response = await fetchImpl(url.href, {
			headers: githubApiHeaders(token),
			redirect: "manual",
			signal
		});
		if (!isGitHubApiRedirect(response.status)) return response;
		const location = response.headers.get("location");
		const nextUrl = location ? safeGitHubApiUrl(location, url) : null;
		if (!nextUrl || redirects >= GITHUB_API_MAX_REDIRECTS) {
			await discardResponse(response);
			throw new ControlUiGitHubError(502, "GitHub API returned an unsafe redirect");
		}
		await discardResponse(response);
		await beforeRedirect?.(nextUrl);
		url = nextUrl;
	}
}
async function discardResponse(response) {
	await response.body?.cancel().catch(() => {});
}
async function readBoundedResponse(response, maxBytes) {
	try {
		return await readResponseWithLimit(response, maxBytes);
	} finally {
		await discardResponse(response);
	}
}
function upstreamErrorStatus(status) {
	if (status === 404) return 404;
	if (status === 403 || status === 429) return 429;
	return 502;
}
function isGitHubRateLimitResponse(response) {
	if (response.status === 429) return true;
	return response.status === 403 && (response.headers.get("x-ratelimit-remaining") === "0" || response.headers.has("retry-after"));
}
function jsonErrorStatus(response) {
	if (isGitHubRateLimitResponse(response)) return 429;
	if (response.status === 404 || response.status === 403) return response.status;
	return 502;
}
/** Fetch a GitHub API JSON document with bounded size and normalized errors. */
async function fetchGitHubJson(rawUrl, fetchImpl, token) {
	const response = await fetchGitHubApi(rawUrl, fetchImpl, token);
	if (!response.ok) {
		const status = jsonErrorStatus(response);
		await discardResponse(response);
		throw new ControlUiGitHubError(status, `GitHub request failed (${response.status})`);
	}
	const body = await readBoundedResponse(response, GITHUB_JSON_MAX_BYTES);
	try {
		return JSON.parse(body.toString("utf8"));
	} catch {
		throw new ControlUiGitHubError(502, "GitHub response was not valid JSON");
	}
}
//#endregion
export { discardResponse as a, githubApiToken as c, readBoundedResponse as d, requiredString as f, GITHUB_REQUEST_TIMEOUT_MS as i, optionalNumber as l, GITHUB_API_ORIGIN as n, fetchGitHubApi as o, upstreamErrorStatus as p, GITHUB_JSON_MAX_BYTES as r, fetchGitHubJson as s, ControlUiGitHubError as t, optionalString as u };
