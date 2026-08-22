import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { r as normalizeOptionalAccountId } from "./account-id-CIVg1QNG.js";
//#region src/cron/scheduled-tool-policy.ts
/** Creates provenance for an authenticated operator or trusted in-process caller. */
function createTrustedCronScheduledToolPolicy() {
	return {
		version: 1,
		mode: "trusted"
	};
}
/** Creates requester-scoped provenance from an authenticated account identity. */
function createAccountCronScheduledToolPolicy(params) {
	const ownerSessionKey = normalizeOptionalString(params.ownerSessionKey);
	const ownerAccountId = normalizeOptionalAccountId(params.ownerAccountId);
	if (!ownerSessionKey || !ownerAccountId) return;
	return {
		version: 1,
		mode: "account",
		ownerSessionKey,
		ownerAccountId
	};
}
/** Accepts only the current closed provenance shape; unknown versions fail closed. */
function normalizeCronScheduledToolPolicy(value) {
	if (!isRecord(value) || value.version !== 1) return;
	if (value.mode === "trusted") return Object.keys(value).every((key) => key === "version" || key === "mode") ? createTrustedCronScheduledToolPolicy() : void 0;
	if (value.mode !== "account") return;
	const policy = createAccountCronScheduledToolPolicy({
		ownerSessionKey: typeof value.ownerSessionKey === "string" ? value.ownerSessionKey : "",
		ownerAccountId: typeof value.ownerAccountId === "string" ? value.ownerAccountId : ""
	});
	if (!policy) return;
	return Object.keys(value).every((key) => key === "version" || key === "mode" || key === "ownerSessionKey" || key === "ownerAccountId") ? policy : void 0;
}
/** Resolves trusted provenance only when it is consistent with the persisted job owner. */
function resolveCronScheduledToolPolicy(params) {
	if (params.toolsAllow === void 0) return;
	const policy = normalizeCronScheduledToolPolicy(params.scheduledToolPolicy);
	if (!policy || policy.mode === "trusted") return policy;
	const ownerSessionKey = normalizeOptionalString(params.owner?.sessionKey);
	const ownerAccountId = normalizeOptionalAccountId(params.owner?.accountId);
	return ownerSessionKey === policy.ownerSessionKey && ownerAccountId === policy.ownerAccountId ? policy : void 0;
}
//#endregion
export { resolveCronScheduledToolPolicy as i, createTrustedCronScheduledToolPolicy as n, normalizeCronScheduledToolPolicy as r, createAccountCronScheduledToolPolicy as t };
