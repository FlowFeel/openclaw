import "./proxy-env-sKZhlk0j.js";
import "./managed-proxy-undici-CD5SRgnh.js";
import "./undici-runtime-CXx9v98C.js";
import "./ssrf-CLKoEH8E.js";
import "./node-proxy-agent-C0zc81BU.js";
import "./proxy-fetch-CXtGpMfW.js";
import "./fetch-DKp7Cack.js";
//#region src/plugin-sdk/fetch-runtime.ts
const NULL_BODY_STATUSES = /* @__PURE__ */ new Set([
	101,
	103,
	204,
	205,
	304
]);
function responseWithRelease(response, release) {
	let released = false;
	let canceling;
	const releaseOnce = async () => {
		if (released) return;
		released = true;
		await release();
	};
	if (!response.body || NULL_BODY_STATUSES.has(response.status)) {
		releaseOnce();
		return response;
	}
	const reader = response.body.getReader();
	const body = new ReadableStream({
		async pull(controller) {
			try {
				const next = await reader.read();
				if (canceling) {
					await canceling;
					await releaseOnce();
					return;
				}
				if (next.done) {
					controller.close();
					await releaseOnce();
					return;
				}
				controller.enqueue(next.value);
			} catch (error) {
				if (canceling) {
					await canceling;
					await releaseOnce();
					return;
				}
				await releaseOnce();
				throw error;
			}
		},
		async cancel(reason) {
			canceling = reader.cancel(reason).catch(() => void 0);
			await canceling;
			await releaseOnce();
		}
	});
	return new Response(body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers
	});
}
/** Apply the trusted-env-proxy guarded fetch preset without exposing raw mode strings to plugins. */
function withTrustedEnvProxyGuardedFetchMode(params) {
	return {
		...params,
		mode: "trusted_env_proxy"
	};
}
//#endregion
export { withTrustedEnvProxyGuardedFetchMode as n, responseWithRelease as t };
