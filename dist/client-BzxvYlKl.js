import { u as redactToolPayloadText } from "./redact-BGqyyKN9.js";
import { n as VERSION } from "./version-CeFj_iGk.js";
import { n as logError, t as logDebug } from "./logger-CWK_jOH2.js";
import { a as storeDeviceAuthToken, n as loadDeviceAuthToken, t as clearDeviceAuthToken } from "./device-auth-store-CjxJ6zbn.js";
import { o as publicKeyRawBase64UrlFromPem, r as loadOrCreateDeviceIdentity, s as signDevicePayload } from "./device-identity-BOrXxcUy.js";
import { t as normalizeFingerprint } from "./fingerprint-BRiEKKMN.js";
import { t as GatewayClient$1 } from "./client-qrqst037.js";
import { r as registerManagedProxyGatewayLoopbackBypass, t as ensureInheritedManagedProxyRoutingActive } from "./proxy-lifecycle-Cw2RH3tI.js";
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
