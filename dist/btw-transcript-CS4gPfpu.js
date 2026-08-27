import { a as resolveSessionFilePathOptions, i as resolveSessionFilePath } from "./paths-DSnYpBD3.js";
import { st as loadSqliteSessionEntry } from "./session-accessor.sqlite-B9iW7DOt.js";
import { n as parseSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.js";
import { b as scanSessionTranscriptTree } from "./session-transcript-index-cy-aJty7.js";
import { y as loadSqliteTranscriptEvents } from "./session-accessor.sqlite-transcript-store-Si6-bv-m.js";
import { $ as listSessionEntries } from "./session-accessor-t3qUoTeV.js";
import { o as migrateSessionEntries, t as buildSessionContext } from "./session-manager-codec-DRZh7P2-.js";
import "./session-manager-dOl3u7vE.js";
import { t as diagnosticLogger } from "./diagnostic-runtime-wzkpciZD.js";
import "./diagnostic-Ba_lpTat.js";
import "./sessions-CBo4LOdS.js";
import { t as resolvePreferredSessionKeyForSessionIdMatches } from "./session-id-resolution-joL8CTWk.js";
//#region src/agents/btw-transcript.ts
/**
* Reads prior session transcript context for `/btw` side-question handoffs.
*/
/** Resolves the persisted transcript file for a BTW session handoff. */
function resolveBtwSessionTranscriptPath(params) {
	try {
		const agentId = params.sessionKey?.split(":")[1];
		const pathOpts = resolveSessionFilePathOptions({
			agentId,
			storePath: params.storePath
		});
		return resolveSessionFilePath(params.sessionId, params.sessionEntry, pathOpts);
	} catch (error) {
		diagnosticLogger.debug(`resolveSessionTranscriptPath failed: sessionId=${params.sessionId} err=${String(error)}`);
		return;
	}
}
function readSessionEntryId(entry) {
	const id = entry.id;
	return typeof id === "string" && id.trim().length > 0 ? id : void 0;
}
function buildSessionBranchEntries(tree, leafId) {
	if (leafId === null) return [];
	if (!leafId) return;
	const branch = [];
	const seen = /* @__PURE__ */ new Set();
	let currentId = leafId;
	while (currentId) {
		if (seen.has(currentId)) return;
		seen.add(currentId);
		const node = tree.byId.get(currentId);
		if (!node) return;
		if (node.entry.type !== "leaf") branch.push(node.entry.parentId === node.parentId ? node.entry : {
			...node.entry,
			parentId: node.parentId
		});
		currentId = node.parentId ?? void 0;
	}
	return branch.toReversed();
}
function isTrailingUserMessage(entry) {
	return entry?.type === "message" && entry.message?.role === "user";
}
/**
* Reads prior messages for BTW continuation.
*
* When a transcript has fork links, this returns the selected snapshot branch
* instead of the full file so a resumed agent does not inherit sibling-branch
* messages.
*/
async function readBtwTranscriptMessages(params) {
	try {
		const marker = parseSqliteSessionFileMarker(params.sessionFile);
		const completeTarget = Boolean(params.agentId?.trim() && params.sessionId.trim() && params.sessionKey?.trim() && params.storePath?.trim());
		const agentId = completeTarget ? params.agentId : params.agentId ?? marker?.agentId;
		const sessionId = completeTarget ? params.sessionId : marker?.sessionId ?? params.sessionId;
		const storePath = completeTarget ? params.storePath : params.storePath ?? marker?.storePath;
		const markerMatches = marker && !completeTarget ? listSessionEntries({
			agentId: marker.agentId,
			storePath: marker.storePath
		}).filter(({ entry }) => entry.sessionId === marker.sessionId) : [];
		const suppliedEntry = marker && params.sessionKey && !completeTarget ? loadSqliteSessionEntry({
			agentId: marker.agentId,
			sessionKey: params.sessionKey,
			storePath: marker.storePath
		}) : void 0;
		if (marker && !completeTarget && params.sessionKey && (suppliedEntry && suppliedEntry.sessionId !== marker.sessionId || !suppliedEntry && markerMatches.length > 0)) return [];
		const sessionKey = completeTarget ? params.sessionKey : marker ? suppliedEntry?.sessionId === marker.sessionId ? params.sessionKey : resolvePreferredSessionKeyForSessionIdMatches(markerMatches.map(({ sessionKey: mappedKey, entry }) => [mappedKey, entry]), marker.sessionId) ?? (markerMatches.length === 0 ? params.sessionKey : void 0) : params.sessionKey;
		if (!sessionKey || !storePath) return [];
		const entries = await loadSqliteTranscriptEvents({
			agentId,
			sessionId,
			sessionKey,
			storePath
		});
		migrateSessionEntries(entries);
		const sessionEntries = entries.filter((entry) => entry.type !== "session");
		const tree = scanSessionTranscriptTree(sessionEntries);
		if (!tree.hasLeafUpdate) return buildSessionContext(sessionEntries).messages;
		const hasSnapshotLeaf = params.snapshotLeafId !== void 0;
		let branchEntries = hasSnapshotLeaf ? buildSessionBranchEntries(tree, params.snapshotLeafId) : void 0;
		if (hasSnapshotLeaf && branchEntries === void 0) diagnosticLogger.debug(`btw snapshot leaf unavailable: sessionId=${sessionId} leaf=${params.snapshotLeafId}`);
		branchEntries ??= buildSessionBranchEntries(tree, tree.leafId);
		if (!hasSnapshotLeaf && isTrailingUserMessage(branchEntries?.at(-1))) {
			const trailingId = readSessionEntryId(branchEntries.at(-1));
			const parentId = trailingId ? tree.byId.get(trailingId)?.parentId : null;
			branchEntries = parentId ? buildSessionBranchEntries(tree, parentId) ?? [] : [];
		}
		const sessionContext = buildSessionContext(branchEntries ?? sessionEntries);
		return Array.isArray(sessionContext.messages) ? sessionContext.messages : [];
	} catch {
		return [];
	}
}
//#endregion
export { resolveBtwSessionTranscriptPath as n, readBtwTranscriptMessages as t };
