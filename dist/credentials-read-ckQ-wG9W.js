import { n as normalizeAccountId } from "./account-id-CIVg1QNG.js";
import { r as createPluginStateSyncKeyedStore } from "./plugin-state-store-aPYaqCXn.js";
import "./runtime-doctor-DgQNxy3X.js";
import { n as getOptionalMatrixRuntime } from "./runtime-Drg4hYqm.js";
import "./storage-paths-HvTTKK7M.js";
//#region extensions/matrix/src/matrix/credentials-read.ts
const MATRIX_CREDENTIALS_NAMESPACE = "credentials";
const MATRIX_CREDENTIALS_MAX_ENTRIES = 256;
function matrixCredentialsStoreKey(accountId) {
	return `account:${normalizeAccountId(accountId)}`;
}
function normalizeMatrixStoredCredentials(value, accountId) {
	if (!value || typeof value !== "object") return null;
	const parsed = value;
	if (typeof parsed.homeserver !== "string" || !parsed.homeserver || typeof parsed.userId !== "string" || !parsed.userId || typeof parsed.accessToken !== "string" || !parsed.accessToken || typeof parsed.createdAt !== "string" || !parsed.createdAt) return null;
	return {
		accountId: normalizeAccountId(accountId ?? parsed.accountId),
		homeserver: parsed.homeserver,
		userId: parsed.userId,
		accessToken: parsed.accessToken,
		...typeof parsed.deviceId === "string" ? { deviceId: parsed.deviceId } : {},
		createdAt: parsed.createdAt,
		...typeof parsed.lastUsedAt === "string" ? { lastUsedAt: parsed.lastUsedAt } : {}
	};
}
function isMatrixCredentialRevocation(value, accountId) {
	if (!value || typeof value !== "object") return false;
	const parsed = value;
	return parsed.kind === "revoked" && typeof parsed.revokedAt === "string" && parsed.revokedAt.length > 0 && normalizeAccountId(parsed.accountId) === normalizeAccountId(accountId ?? parsed.accountId);
}
function openMatrixCredentialsStore(env = process.env) {
	const runtime = getOptionalMatrixRuntime();
	const resolvedEnv = env.OPENCLAW_STATE_DIR?.trim() || !runtime ? env : {
		...env,
		OPENCLAW_STATE_DIR: runtime.state.resolveStateDir(env)
	};
	return createPluginStateSyncKeyedStore("matrix", {
		namespace: MATRIX_CREDENTIALS_NAMESPACE,
		maxEntries: 256,
		overflowPolicy: "reject-new",
		env: resolvedEnv
	});
}
function loadMatrixCredentials(env = process.env, accountId) {
	const normalizedAccountId = normalizeAccountId(accountId);
	const parsed = normalizeMatrixStoredCredentials(openMatrixCredentialsStore(env).lookup(matrixCredentialsStoreKey(accountId)), normalizedAccountId);
	if (!parsed || parsed.accountId !== normalizedAccountId) return null;
	const { accountId: _accountId, ...credentials } = parsed;
	return credentials;
}
function clearMatrixCredentials(env = process.env, accountId) {
	const normalizedAccountId = normalizeAccountId(accountId);
	openMatrixCredentialsStore(env).register(matrixCredentialsStoreKey(normalizedAccountId), {
		accountId: normalizedAccountId,
		kind: "revoked",
		revokedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
}
function credentialsMatchConfig(stored, config) {
	if (!config.userId) {
		if (!config.accessToken) return false;
		return stored.homeserver === config.homeserver && stored.accessToken === config.accessToken;
	}
	return stored.homeserver === config.homeserver && stored.userId === config.userId;
}
//#endregion
export { isMatrixCredentialRevocation as a, normalizeMatrixStoredCredentials as c, credentialsMatchConfig as i, openMatrixCredentialsStore as l, MATRIX_CREDENTIALS_NAMESPACE as n, loadMatrixCredentials as o, clearMatrixCredentials as r, matrixCredentialsStoreKey as s, MATRIX_CREDENTIALS_MAX_ENTRIES as t };
