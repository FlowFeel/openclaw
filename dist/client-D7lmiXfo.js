import { u as redactToolPayloadText } from "./redact-DUpJZuMu.js";
import { n as VERSION } from "./version-CeFj_iGk.js";
import { n as logError, t as logDebug } from "./logger-DGpe8sSn.js";
import { a as storeDeviceAuthToken, n as loadDeviceAuthToken, t as clearDeviceAuthToken } from "./device-auth-store-C0rVjVQr.js";
import { o as publicKeyRawBase64UrlFromPem, r as loadOrCreateDeviceIdentity, s as signDevicePayload } from "./device-identity-P-Q23TDZ.js";
import { t as normalizeFingerprint } from "./fingerprint-BRiEKKMN.js";
import { t as GatewayClient$1 } from "./client-qrqst037.js";
import { r as registerManagedProxyGatewayLoopbackBypass, t as ensureInheritedManagedProxyRoutingActive } from "./proxy-lifecycle-QXGsYfJj.js";
//#region src/gateway/client.ts
function createOpenClawGatewayClientHostDeps(overrides) {
	return {
		loadOrCreateDeviceIdentity,
		signDevicePayload,
		publicKeyRawBase64UrlFromPem,
		loadDeviceAuthToken,
		storeDeviceAuthToken,
		clearDeviceAuthToken,
		beforeConnect: ensureInheritedManagedProxyRoutingActive,
		registerGatewayLoopbackBypass: registerManagedProxyGatewayLoopbackBypass,
		normalizeTlsFingerprint: (fingerprint) => normalizeFingerprint(fingerprint ?? ""),
		logDebug,
		logError,
		redactForLog: redactToolPayloadText,
		...overrides
	};
}
var GatewayClient = class {
	#client;
	constructor(opts) {
		this.#client = new GatewayClient$1({
			...opts,
			clientVersion: opts.clientVersion ?? VERSION,
			hostDeps: createOpenClawGatewayClientHostDeps(opts.hostDeps)
		});
	}
	start() {
		this.#client.start();
	}
	stop() {
		this.#client.stop();
	}
	stopAndWait(opts) {
		return this.#client.stopAndWait(opts);
	}
	request(method, params, opts) {
		return this.#client.request(method, params, opts);
	}
	getConnectionMetadata() {
		return this.#client.getConnectionMetadata();
	}
	updateNodeManifest(manifest) {
		this.#client.updateNodeManifest(manifest);
	}
};
//#endregion
export { GatewayClient as t };
