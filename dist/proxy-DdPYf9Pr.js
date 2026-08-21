import { r as makeProxyFetch } from "./proxy-fetch-CXtGpMfW.js";
import "./fetch-runtime-C6dvgZVF.js";
//#region extensions/zalo/src/proxy.ts
const proxyCache = /* @__PURE__ */ new Map();
function resolveZaloProxyFetch(proxyUrl) {
	const trimmed = proxyUrl?.trim();
	if (!trimmed) return;
	const cached = proxyCache.get(trimmed);
	if (cached) return cached;
	const fetcher = makeProxyFetch(trimmed);
	proxyCache.set(trimmed, fetcher);
	return fetcher;
}
//#endregion
export { resolveZaloProxyFetch as t };
