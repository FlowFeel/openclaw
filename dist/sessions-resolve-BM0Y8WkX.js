import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { n as loadCombinedSessionStoreForGateway } from "./combined-store-gateway-Dl7qKsCA.js";
import { A as resolveGatewaySessionStoreTargetWithStore, O as resolveDeletedAgentIdFromSessionKey } from "./session-utils-row-BDvhdN3C.js";
import { n as listSessionsFromStore, t as filterAndSortSessionEntries } from "./session-utils-list-PF9PlJs5.js";
import "./session-utils-C8yYh4dv.js";
import { n as resolveSessionIdMatchSelection } from "./session-id-resolution-joL8CTWk.js";
import { t as parseSessionLabel } from "./session-label-DSD-L6TD.js";
//#region src/gateway/sessions-resolve.ts
function resolveSessionVisibilityFilterOptions(p) {
	return {
		includeGlobal: p.includeGlobal === true,
		includeUnknown: p.includeUnknown === true,
		spawnedBy: p.spawnedBy,
		agentId: p.agentId
	};
}
function noSessionFoundResult(params) {
	if (params.p.allowMissing) return {
		ok: true,
		missing: true
	};
	return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, params.message)
	};
}
/** Rejects sessions whose owning agent no longer exists in config (#65524). */
function validateSessionAgentExists(cfg, key, entry, options) {
	const deletedAgentId = resolveDeletedAgentIdFromSessionKey(cfg, key, entry, options);
	if (deletedAgentId === null) return null;
	return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, `Agent "${deletedAgentId}" no longer exists in configuration`)
	};
}
function isResolvedSessionKeyVisible(params) {
	if (typeof params.p.spawnedBy !== "string" || params.p.spawnedBy.trim().length === 0) return true;
	return filterAndSortSessionEntries({
		cfg: params.cfg,
		store: params.store,
		now: Date.now(),
		opts: resolveSessionVisibilityFilterOptions(params.p)
	}).some(([key]) => key === params.key);
}
function findVisibleSessionIdMatches(params) {
	const now = Date.now();
	return filterAndSortSessionEntries({
		cfg: params.cfg,
		store: params.store,
		now,
		opts: resolveSessionVisibilityFilterOptions(params.p)
	}).filter(([key, entry]) => entry?.sessionId === params.sessionId || key === params.sessionId);
}
async function resolveSessionKeyFromResolveParams(params) {
	const { cfg, p } = params;
	const key = normalizeOptionalString(p.key) ?? "";
	const hasKey = key.length > 0;
	const sessionId = normalizeOptionalString(p.sessionId) ?? "";
	const hasSessionId = sessionId.length > 0;
	const selectionCount = [
		hasKey,
		hasSessionId,
		(normalizeOptionalString(p.label) ?? "").length > 0
	].filter(Boolean).length;
	if (selectionCount > 1) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "Provide either key, sessionId, or label (not multiple)")
	};
	if (selectionCount === 0) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "Either key, sessionId, or label is required")
	};
	if (hasKey) {
		const target = resolveGatewaySessionStoreTargetWithStore({
			cfg,
			key,
			clone: false
		});
		const store = target.store;
		if (store[target.canonicalKey]) {
			if (!isResolvedSessionKeyVisible({
				cfg,
				p,
				store,
				key: target.canonicalKey
			})) return noSessionFoundResult({
				p,
				message: `No session found: ${key}`
			});
			const agentCheck = validateSessionAgentExists(cfg, target.canonicalKey, store[target.canonicalKey], { acpMetadataSessionKey: target.canonicalKey });
			if (agentCheck) return agentCheck;
			return {
				ok: true,
				key: target.canonicalKey
			};
		}
		return noSessionFoundResult({
			p,
			message: `No session found: ${key}`
		});
	}
	if (hasSessionId) {
		const { store } = loadCombinedSessionStoreForGateway(cfg, { agentId: p.agentId });
		const matches = findVisibleSessionIdMatches({
			cfg,
			store,
			p,
			sessionId
		});
		const selection = resolveSessionIdMatchSelection(matches, sessionId);
		if (selection.kind === "none") return noSessionFoundResult({
			p,
			message: `No session found: ${sessionId}`
		});
		if (selection.kind === "ambiguous") {
			const keys = selection.sessionKeys.join(", ");
			return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, `Multiple sessions found for sessionId: ${sessionId} (${keys})`)
			};
		}
		const selectedEntry = matches.find(([matchKey]) => matchKey === selection.sessionKey)?.[1];
		const agentCheckSessionId = validateSessionAgentExists(cfg, selection.sessionKey, selectedEntry);
		if (agentCheckSessionId) return agentCheckSessionId;
		return {
			ok: true,
			key: selection.sessionKey
		};
	}
	const parsedLabel = parseSessionLabel(p.label);
	if (!parsedLabel.ok) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, parsedLabel.error)
	};
	const { storePath, store } = loadCombinedSessionStoreForGateway(cfg, { agentId: p.agentId });
	const list = listSessionsFromStore({
		cfg,
		storePath,
		store,
		lightweightListRows: true,
		opts: {
			includeGlobal: p.includeGlobal === true,
			includeUnknown: p.includeUnknown === true,
			label: parsedLabel.label,
			agentId: p.agentId,
			spawnedBy: p.spawnedBy,
			limit: 2
		}
	});
	if (list.sessions.length === 0) return noSessionFoundResult({
		p,
		message: `No session found with label: ${parsedLabel.label}`
	});
	if (list.sessions.length > 1) {
		const keys = list.sessions.map((session) => session.key).join(", ");
		return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, `Multiple sessions found with label: ${parsedLabel.label} (${keys})`)
		};
	}
	const labelKey = expectDefined(list.sessions[0], "sessions entry at 0").key;
	const agentCheckLabel = validateSessionAgentExists(cfg, labelKey, store[labelKey]);
	if (agentCheckLabel) return agentCheckLabel;
	return {
		ok: true,
		key: labelKey
	};
}
//#endregion
export { resolveSessionKeyFromResolveParams as t };
