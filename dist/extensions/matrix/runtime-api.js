import { _ as resolvePinnedHostnameWithPolicy, a as createPinnedDispatcher, i as closeDispatcher } from "../../ssrf-C889LYfv.js";
import { r as formatZonedTimestamp } from "../../format-datetime-Bp7Mn3G9.js";
import { t as assertHttpUrlTargetsPrivateNetwork, u as ssrfPolicyFromDangerouslyAllowPrivateNetwork } from "../../ssrf-policy-CHmrygRA.js";
import "../../ssrf-runtime-B8V5-MiN.js";
import { t as chunkTextForOutbound$1 } from "../../text-chunking-nhEIGrpB.js";
import { i as writeJsonFileAtomically } from "../../json-store-BVGQY8xv.js";
import { a as resolveMatrixDefaultOrOnlyAccountId, i as resolveMatrixChannelConfig, n as requiresExplicitMatrixDefaultAccount, o as resolveMatrixAccountStringValues, r as resolveConfiguredMatrixAccountIds, t as findMatrixAccountEntry } from "../../account-selection-BObnVAfj.js";
import { n as listMatrixEnvAccountIds, r as resolveMatrixEnvAccountToken, t as getMatrixScopedEnvVarNames } from "../../env-vars-W8rRlmHr.js";
import { r as setMatrixRuntime } from "../../runtime-Drg4hYqm.js";
import { a as resolveMatrixCredentialsPath, i as resolveMatrixCredentialsFilename, n as resolveMatrixAccountStorageRoot, o as resolveMatrixHomeserverKey, r as resolveMatrixCredentialsDir, s as sanitizeMatrixPathSegment, t as hashMatrixAccessToken } from "../../storage-paths-HvTTKK7M.js";
import { d as setMatrixThreadBindingIdleTimeoutBySessionKey, p as setMatrixThreadBindingMaxAgeBySessionKey } from "../../thread-bindings-shared-DK1Xgc7-.js";
import { n as ensureMatrixSdkInstalled, r as isMatrixSdkAvailable } from "../../deps-BFJ7lozh.js";
//#region extensions/matrix/runtime-api.ts
function chunkTextForOutbound(text, limit) {
	if (text.length === 0) return [""];
	if (Number.isFinite(limit) && limit > 0 && !Number.isInteger(limit)) return chunkTextForOutbound$1(text, limit);
	const chunks = [];
	let remaining = text;
	while (remaining.length > limit) {
		const window = remaining.slice(0, limit);
		const splitAt = Math.max(window.lastIndexOf("\n"), window.lastIndexOf(" "));
		const breakAt = splitAt > 0 ? splitAt : limit;
		chunks.push(remaining.slice(0, breakAt).trimEnd());
		remaining = remaining.slice(breakAt).trimStart();
	}
	if (remaining.length > 0) chunks.push(remaining);
	return chunks;
}
//#endregion
export { assertHttpUrlTargetsPrivateNetwork, chunkTextForOutbound, closeDispatcher, createPinnedDispatcher, ensureMatrixSdkInstalled, findMatrixAccountEntry, formatZonedTimestamp, getMatrixScopedEnvVarNames, hashMatrixAccessToken, isMatrixSdkAvailable, listMatrixEnvAccountIds, requiresExplicitMatrixDefaultAccount, resolveConfiguredMatrixAccountIds, resolveMatrixAccountStorageRoot, resolveMatrixAccountStringValues, resolveMatrixChannelConfig, resolveMatrixCredentialsDir, resolveMatrixCredentialsFilename, resolveMatrixCredentialsPath, resolveMatrixDefaultOrOnlyAccountId, resolveMatrixEnvAccountToken, resolveMatrixHomeserverKey, resolvePinnedHostnameWithPolicy, sanitizeMatrixPathSegment, setMatrixRuntime, setMatrixThreadBindingIdleTimeoutBySessionKey, setMatrixThreadBindingMaxAgeBySessionKey, ssrfPolicyFromDangerouslyAllowPrivateNetwork, writeJsonFileAtomically };
