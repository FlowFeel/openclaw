import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { i as asOptionalRecord, o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { t as stableStringify } from "./stable-stringify-DoZ6Yalc.js";
import "./redact-DUpJZuMu.js";
import { c as isWithinDir } from "./path-D8zNGPJM.js";
import { t as sameFileIdentity } from "./file-identity-C0fBiekR.js";
import { r as root } from "./fs-safe-DVaClkIX.js";
import { i as root$1 } from "./root-impl-DYBxk3hn.js";
import { c as assertNoSymlinkParents } from "./regular-file-jv7y-frB.js";
import { c as resolveUserPath, o as resolveRequiredHomeDir, t as expandHomePrefix } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { C as resolveStateDir, S as resolveOAuthDir, x as resolveNewStateDir, y as resolveLegacyStateDirs } from "./paths-CL43LNS6.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { f as resolveDefaultAgentId, i as listAgentIds, n as listAgentEntries, o as resolveAgentConfig, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId, t as isValidAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey, o as normalizeSessionKeyPreservingOpaquePeerIds } from "./session-key-utils-02xWdGSz.js";
import { t as DEFAULT_ACCOUNT_ID } from "./account-id-CIVg1QNG.js";
import { a as buildAgentMainSessionKey, f as resolveAgentIdFromSessionKey, n as DEFAULT_MAIN_KEY, r as LEGACY_IMPLICIT_AGENT_ID, u as normalizeMainKey } from "./session-key-DtTE9-Tg.js";
import { s as parseRegistryNpmSpec } from "./npm-registry-spec-CCN1EPEy.js";
import { t as compareOpenClawVersions } from "./version-CG_bbh3U.js";
import { n as VERSION } from "./version-CeFj_iGk.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { c as runSqliteDeferredTransactionSync, d as clearNodeSqliteKyselyCacheForDatabase, h as getNodeSqliteKysely, l as runSqliteImmediateTransactionSync, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync, t as openNodeSqliteDatabase } from "./node-sqlite-BJTPe7U8.js";
import { _ as detectOpenClawStateDatabaseSchemaMigrations, d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction, m as repairOpenClawStateDatabaseSchemaIfNeeded, p as repairOpenClawStateDatabaseSchema, yt as repairCanonicalSqliteIndexes } from "./openclaw-state-db-BU55lNCH.js";
import { a as readSqliteUserVersion, c as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS, n as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-2PkDmkRl.js";
import { n as readFileWindowFullySync } from "./file-read-DtMn74uz.js";
import { t as CHANNEL_IDS } from "./ids-DcuH-YRr.js";
import { n as replaceFileAtomicSync } from "./replace-file-BMEQ8gO6.js";
import "./replace-file-BYn355zQ.js";
import { n as readConfigMachineState, r as updateConfigMachineState, t as importConfigMachineState } from "./config-machine-state-C97R6LG-.js";
import "./agent-scope-DyEposw2.js";
import { a as sha256Hex, i as sha256File } from "./crypto-digest-CmUwt1S-.js";
import { c as resolveLegacyInstalledPluginIndexStorePath } from "./installed-plugin-index-record-reader-COVyHO2A.js";
import "./installed-plugin-index-CqNI0grC.js";
import { c as writePersistedInstalledPluginIndexSync, i as readPersistedInstalledPluginIndexSync, n as parseInstalledPluginIndex } from "./installed-plugin-index-store-wgyw6sCS.js";
import { c as listBundledChannelLegacyStateMigrationDetectors, s as listBundledChannelLegacySessionSurfaces } from "./bundled-C1enQlWY.js";
import { t as createSqliteAuditRecordStore } from "./sqlite-audit-record-store-DuKgwurO.js";
import { n as CONFIG_AUDIT_SCOPE, t as CONFIG_AUDIT_MAX_ENTRIES } from "./io.audit-CVIGoBrK.js";
import { n as createFileLockManager } from "./file-lock-CLjy2n00.js";
import { i as isPidDefinitelyDead, t as getFileLockProcessStartTime } from "./pid-alive-ClLrY9h9.js";
import { t as isLockOwnerDefinitelyStale } from "./stale-lock-file-CEuvanrm.js";
import { s as withFileLock } from "./file-lock-CndaTTeS.js";
import "./file-lock-DTTGVw6O.js";
import { t as asFsSafeFileLockRoot } from "./file-lock-manager-BdC0K4tY.js";
import { n as acquireGatewayLock } from "./gateway-lock-BPZGOtDB.js";
import { $ as unregisterOpenClawAgentDatabase, P as OPENCLAW_AGENT_SCHEMA_SQL, Q as registerOpenClawAgentDatabase, S as migrateOpenClawAgentDatabaseToMediaPrerequisiteSchema, X as isPersistentOpenClawAgentDatabasePath, et as listOpenClawRegisteredAgentDatabases, k as assertOpenClawAgentSchemaContains, x as ensureOpenClawAgentDatabaseSchema, y as assertOpenClawAgentDatabaseOwner } from "./openclaw-agent-db--PLC25lY.js";
import "./openclaw-agent-db-migration-required-BU5hc3wx.js";
import { a as registerMigratedPluginStateEntry, h as getPluginStateCapacity, i as importPluginStateEntriesForDoctor, m as countPluginStateLiveEntries, n as createPluginStateKeyedStore, v as resolveMaxPluginStateEntriesPerPlugin } from "./plugin-state-store-aPYaqCXn.js";
import { n as canonicalizeMainSessionAlias } from "./main-session-Bjm_i_Af.js";
import { C as SESSION_ARCHIVE_ZSTD_SUFFIX, D as readSessionArchiveContentSync, T as encodeSessionArchiveContent, _ as isSessionArchiveArtifactName, l as resolveStorePath, n as resolveAgentsDirFromSessionStorePath, w as decodeSessionArchiveBytes } from "./paths-DSnYpBD3.js";
import { rt as listSqliteSessionEntryKeysReadOnly } from "./session-accessor.sqlite-B9iW7DOt.js";
import { t as getChannelPlugin } from "./registry-B1AiP2IQ.js";
import { t as normalizePersistedSessionEntryShape } from "./store-entry-shape-DB6qjwcl.js";
import { l as resolveSessionStoreTargets, r as listConfiguredSessionStoreAgentIds, s as resolveAllAgentSessionStoreTargetsSync } from "./targets-Dooi6t13.js";
import { l as resolveSqliteTranscriptArchiveDirectory } from "./session-accessor.sqlite-scope-BFeKxPFV.js";
import { d as rewriteSqliteTranscriptEventRowsInTransaction } from "./session-accessor.sqlite-transcript-store-Si6-bv-m.js";
import { i as hasMeaningfulRetiredMediaCarrier, r as canonicalizePersistedUserMessageMedia } from "./media-facts-D_wLZOa9.js";
import "./session-accessor-t3qUoTeV.js";
import { s as getMediaDir } from "./store-BDR50q7S.js";
import { a as isSafeWorkspaceAttestationFilename, d as resolveWorkspaceStateIdentity, l as registerWorkspaceStateAliasesInTransaction, n as WORKSPACE_LEGACY_STATE_MIGRATION_KIND } from "./workspace-state-store-BLsJEXll.js";
import { n as LEGACY_WORKSPACE_ATTESTATION_HEADER, o as WORKSPACE_DOCTOR_CLAIM_SUFFIX, r as LEGACY_WORKSPACE_ATTESTATION_MAX_BYTES, t as LEGACY_WORKSPACE_ATTESTATION_DIRNAME, u as resolveLegacyWorkspaceSourcePaths } from "./workspace-legacy-state-C6Thdnz2.js";
import { n as SYSTEM_AGENT_AUDIT_SCOPE, t as SYSTEM_AGENT_AUDIT_MAX_ENTRIES } from "./audit-CYKiw6TQ.js";
import { i as resolveSandboxConfigForAgent } from "./config-Cp0gVUpH.js";
import { n as resolveSandboxRuntimeStatus } from "./runtime-status-BsZayE7D.js";
import { n as normalizeConversationRef } from "./session-binding-normalization-OQQei4BD.js";
import { c as writeAcpSessionMetaForMigration } from "./session-meta-DqFXJodN.js";
import { a as writeRestartSentinelRowSync, n as parseRestartSentinelEnvelope, r as readRestartSentinelRowSync } from "./restart-sentinel-store-CaiLAucS.js";
import { n as parseMcpOAuthStoreJson } from "./mcp-oauth-store-0Oqnow0e.js";
import { i as resolveChannelDefaultAccountId } from "./helpers-B381bECH.js";
import { a as transcriptSessionExportKey, i as safeTranscriptPathSegment, n as renderTranscriptsMarkdown, o as transcriptSessionSelector, s as ensureMeetingTranscriptsSchema, t as TranscriptsStore } from "./store-DXleh4bY.js";
import { r as resolveSandboxWorkspaceLayoutPaths } from "./shared-Ckksfird.js";
import { a as commitmentRecordToUpdate, i as commitmentRecordToRow, n as commitmentImmutableIdentity, o as commitmentRecordsEqual, r as commitmentRecordFromRow, t as coerceCommitmentRecord } from "./store-record-DwIxciDC.js";
import { a as updateChannelPairingStateSnapshot, c as resolveAllowFromAccountId, l as safeAccountKey, s as dedupePreserveOrder, u as getPairingAdapter } from "./pairing-store-sqlite-BGFFsO5N.js";
import { a as ensureMigrationDir, c as parseSessionStoreJson5, l as readSessionStoreJson5, o as existsDir, r as saveLegacySessionStore, s as fileExists$1, u as safeReadDir } from "./state-migrations.legacy-session-store-RXXUZyiq.js";
import { t as listAgentWorkspaceDirs } from "./workspace-dirs-DbyiYbZj.js";
import { h as hasLegacyRegistryWorktrees, o as discardLegacyRegistryWorktrees } from "./registry-TDGrEpYt.js";
import { c as managedImageRecordToRow, l as managedImageRecordsEqual, s as managedImageRecordFromRow, t as MANAGED_OUTGOING_ORIGINALS_SUBDIR } from "./managed-image-record-store-TcCkVdjs.js";
import { c as repairGatewayAgentMediaMigrationStartupFailures } from "./gateway-boot-lifecycle-B_02jyRB.js";
import { n as LEGACY_NODE_HOST_CONFIG_FILE, r as NODE_HOST_CONFIG_KEY, t as LEGACY_NODE_HOST_CONFIG_CLAIM_SUFFIX } from "./config-BsAL8S9S.js";
import { _ as migrateLegacyDeviceAuth, a as assertLegacyMigrationSourceUnchanged, c as legacyMigrationPathMayExist, d as readLegacyMigrationSourceSnapshot, f as readLegacyMigrationSourceSnapshotSync, g as detectLegacyDeviceAuth, h as detectLegacyDeviceIdentity, i as LegacyMigrationSourceClaim, l as legacyMigrationSourceOrClaimMayExist, m as restoreLegacyMigrationSourceClaims, n as migrateLegacyExecApprovals, o as claimAndRemoveLegacyMigrationSource, p as resolveLegacyMigrationRelativePath, r as migrateLegacyDeviceIdentity, s as claimLegacyMigrationSourceClaims, t as detectLegacyExecApprovals, u as legacyMigrationSourceSnapshotsMatch, v as withLegacyMigrationStateLock } from "./state-migrations.exec-approvals-Bfjm2Yt8.js";
import { a as recordLegacyMigrationRun, i as recordLegacyMigrationReceipt, n as readLegacyMigrationReceipt, o as recordLegacyMigrationSource, r as readLegacyMigrationReceiptFromDatabase, s as resolveLegacyMigrationSourceKey, t as markLegacyMigrationSourceRemoved } from "./state-migrations.receipts-BV0HPXiq.js";
import { c as recordsAfterLegacyAuditRawCheckpoint, d as prepareLegacyAuditRecords, f as serializePreparedAuditRecords, g as legacyAuditSourceGenerationKey, l as restoreInterruptedAuditRecoveryArchive, m as hasLegacyAuditRawCheckpointCapacity, n as finalizeLegacyAuditRecoveryArchive, o as readLegacyAuditSourceSnapshot, p as detectLegacyAuditLogs, r as findPreviousLegacyAuditRawCheckpoint, s as recordLegacyAuditRawCheckpoint, t as withLegacyAuditMigrationLease, u as scrubLegacyAuditRecoveryArchive } from "./state-migrations.audit-coordination-DGisKiTr.js";
import { a as isLegacyControlUiDeviceAuthMigrationInput, t as CONTROL_UI_DEVICE_AUTH_MIGRATION_STATE_KEY } from "./control-ui-device-auth-migration-DvCdzOnp.js";
import { n as collectRelevantDoctorPluginIds, o as listPluginDoctorSessionStoreAgentIds, s as listPluginDoctorStateMigrationEntries } from "./doctor-contract-registry-CRvVJr_Z.js";
import { d as normalizeApnsNodeId, m as normalizeCanonicalApnsRegistration, n as apnsRegistrationFromRow, o as isValidApnsNodeId, r as apnsRegistrationToRow, u as normalizeApnsEnvironment } from "./push-apns-store-DIKYgzVs.js";
import { n as normalizeVoiceWakeRoutingConfig } from "./voicewake-routing-DBFKUAyU.js";
import { c as isValidWebPushEndpoint, g as webPushVapidKeyPairToRow, h as webPushSubscriptionsEqual, l as isValidWebPushKey, m as webPushSubscriptionToRow, n as WEB_PUSH_VAPID_KEY_ID, o as hashWebPushEndpoint, p as webPushSubscriptionFromRow, r as createWebPushVapidKeyPair } from "./push-web-store-wBl7iwDf.js";
import { createHash, randomUUID } from "node:crypto";
import fs, { createReadStream } from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
import { TextDecoder as TextDecoder$1, isDeepStrictEqual } from "node:util";
import { gunzipSync } from "node:zlib";
import { createInterface } from "node:readline";
import { OAuthClientInformationSchema, OAuthMetadataSchema, OAuthProtectedResourceMetadataSchema, OAuthTokensSchema, OpenIdProviderDiscoveryMetadataSchema } from "@modelcontextprotocol/sdk/shared/auth.js";
//#region src/infra/state-migrations.acp-replay.ts
const LEGACY_LEDGER_VERSION = 1;
const LEGACY_LEDGER_LOCK_OPTIONS = {
	retries: {
		retries: 8,
		factor: 2,
		minTimeout: 50,
		maxTimeout: 5e3,
		randomize: true
	},
	stale: 15e3,
	staleRecovery: "fail-closed"
};
function resolveLegacyAcpReplayLedgerPath(stateDir) {
	return path.join(stateDir, "acp", "event-ledger.json");
}
function resolveLegacyAcpReplayClaimPath(sourcePath) {
	return `${sourcePath}.doctor-import`;
}
/** Detect the retired ledger only when an explicit doctor flow opts in. */
function detectLegacyAcpReplayLedger(params) {
	const sourcePath = resolveLegacyAcpReplayLedgerPath(params.stateDir);
	const claimPath = resolveLegacyAcpReplayClaimPath(sourcePath);
	return {
		sourcePath,
		hasLegacy: params.doctorOnlyStateMigrations === true && (fs.existsSync(sourcePath) || fs.existsSync(claimPath))
	};
}
function parseLegacyEvent(raw, sessionId) {
	if (!isRecord(raw) || !isRecord(raw.update)) throw new Error(`legacy ACP replay session ${sessionId} contains an invalid event`);
	if (typeof raw.seq !== "number" || !Number.isInteger(raw.seq) || raw.seq < 1 || typeof raw.at !== "number" || !Number.isFinite(raw.at) || raw.sessionId !== sessionId || typeof raw.sessionKey !== "string" || typeof raw.update.sessionUpdate !== "string") throw new Error(`legacy ACP replay session ${sessionId} contains an invalid event`);
	if (raw.runId !== void 0 && (typeof raw.runId !== "string" || raw.runId.length === 0)) throw new Error(`legacy ACP replay session ${sessionId} contains an invalid run id`);
	return {
		seq: raw.seq,
		at: raw.at,
		sessionId,
		sessionKey: raw.sessionKey,
		...typeof raw.runId === "string" ? { runId: raw.runId } : {},
		update: structuredClone(raw.update)
	};
}
function parseLegacySession(raw, expectedSessionId) {
	if (!isRecord(raw) || raw.sessionId !== expectedSessionId || typeof raw.sessionKey !== "string" || typeof raw.cwd !== "string" || typeof raw.complete !== "boolean" || typeof raw.createdAt !== "number" || !Number.isFinite(raw.createdAt) || typeof raw.updatedAt !== "number" || !Number.isFinite(raw.updatedAt) || typeof raw.nextSeq !== "number" || !Number.isInteger(raw.nextSeq) || raw.nextSeq < 1 || !Array.isArray(raw.events)) throw new Error(`legacy ACP replay session ${expectedSessionId} is invalid`);
	const events = raw.events.map((event) => parseLegacyEvent(event, expectedSessionId));
	const sequences = new Set(events.map((event) => event.seq));
	const maxSeq = events.reduce((max, event) => Math.max(max, event.seq), 0);
	if (sequences.size !== events.length || raw.nextSeq <= maxSeq) throw new Error(`legacy ACP replay session ${expectedSessionId} has invalid sequencing`);
	return {
		sessionId: expectedSessionId,
		sessionKey: raw.sessionKey,
		cwd: raw.cwd,
		complete: raw.complete,
		createdAt: raw.createdAt,
		updatedAt: raw.updatedAt,
		nextSeq: raw.nextSeq,
		events: events.toSorted((left, right) => left.seq - right.seq)
	};
}
function parseLegacyLedger(raw) {
	const parsed = JSON.parse(raw);
	if (!isRecord(parsed) || parsed.version !== LEGACY_LEDGER_VERSION || !isRecord(parsed.sessions)) throw new Error("legacy ACP replay ledger must be a version 1 JSON object");
	return Object.entries(parsed.sessions).map(([sessionId, session]) => parseLegacySession(session, sessionId));
}
function estimateSessionBytes(session) {
	return session.sessionId.length + session.sessionKey.length + session.cwd.length + 32;
}
function estimateEventBytes(event, updateJson) {
	return event.sessionId.length + event.sessionKey.length + updateJson.length + (event.runId?.length ?? 0) + 32;
}
function sourceIdentity(stat, raw) {
	return {
		dev: stat.dev,
		ino: stat.ino,
		mtimeMs: stat.mtimeMs,
		sha256: createHash("sha256").update(raw).digest("hex"),
		size: stat.size
	};
}
function sourceIdentityMatches(left, right) {
	return left.dev === right.dev && left.ino === right.ino && left.mtimeMs === right.mtimeMs && left.sha256 === right.sha256 && left.size === right.size;
}
function reconcileCanonicalSession(db, session) {
	const replayDb = getNodeSqliteKysely(db);
	const stored = executeSqliteQueryTakeFirstSync(db, replayDb.selectFrom("acp_replay_sessions").select([
		"session_key",
		"cwd",
		"complete",
		"created_at",
		"updated_at",
		"next_seq",
		"estimated_bytes"
	]).where("session_id", "=", session.sessionId));
	if (!stored || stored.session_key !== session.sessionKey || stored.cwd !== session.cwd || stored.complete !== (session.complete ? 1 : 0) || stored.created_at !== session.createdAt || stored.updated_at !== session.updatedAt || stored.next_seq !== session.nextSeq) return false;
	const storedEvents = executeSqliteQuerySync(db, replayDb.selectFrom("acp_replay_events").select([
		"seq",
		"at",
		"session_key",
		"run_id",
		"update_json",
		"estimated_bytes"
	]).where("session_id", "=", session.sessionId).orderBy("seq", "asc")).rows;
	if (storedEvents.length !== session.events.length) return false;
	const expectedEventBytes = [];
	for (const [index, event] of session.events.entries()) {
		const storedEvent = storedEvents[index];
		if (!storedEvent) return false;
		let storedUpdate;
		try {
			storedUpdate = JSON.parse(storedEvent.update_json);
		} catch {
			return false;
		}
		if (storedEvent.seq !== event.seq || storedEvent.at !== event.at || storedEvent.session_key !== event.sessionKey || storedEvent.run_id !== (event.runId ?? null) || !isDeepStrictEqual(storedUpdate, event.update)) return false;
		expectedEventBytes.push(estimateEventBytes(event, JSON.stringify(event.update)));
	}
	for (const [index, event] of session.events.entries()) {
		const expectedBytes = expectedEventBytes[index];
		if (expectedBytes !== void 0 && storedEvents[index]?.estimated_bytes !== expectedBytes) executeSqliteQuerySync(db, replayDb.updateTable("acp_replay_events").set({ estimated_bytes: expectedBytes }).where("session_id", "=", session.sessionId).where("seq", "=", event.seq));
	}
	const expectedSessionBytes = estimateSessionBytes(session) + expectedEventBytes.reduce((sum, value) => sum + value, 0);
	if (stored.estimated_bytes !== expectedSessionBytes) executeSqliteQuerySync(db, replayDb.updateTable("acp_replay_sessions").set({ estimated_bytes: expectedSessionBytes }).where("session_id", "=", session.sessionId));
	return true;
}
/** Import, verify, and remove the retired JSON ledger during explicit doctor repair. */
async function migrateLegacyAcpReplayLedger(params) {
	const changes = [];
	const warnings = [];
	if (!params.detected.hasLegacy) return {
		changes,
		warnings
	};
	try {
		const result = await withFileLock(params.detected.sourcePath, LEGACY_LEDGER_LOCK_OPTIONS, async () => {
			const claimPath = resolveLegacyAcpReplayClaimPath(params.detected.sourcePath);
			const resumedClaim = fs.existsSync(claimPath);
			const activePath = resumedClaim ? claimPath : params.detected.sourcePath;
			const before = await fs$1.lstat(activePath);
			if (!before.isFile() || before.isSymbolicLink()) throw new Error("legacy ACP replay source is not a regular non-symlink file");
			const raw = await fs$1.readFile(activePath, "utf8");
			const identity = sourceIdentity(before, raw);
			const sessions = parseLegacyLedger(raw);
			let importedSessions = 0;
			let importedEvents = 0;
			let retainedSessions = 0;
			let claimedThisRun = false;
			try {
				if (!resumedClaim) {
					await fs$1.rename(params.detected.sourcePath, claimPath);
					claimedThisRun = true;
					if (!sourceIdentityMatches(identity, sourceIdentity(await fs$1.lstat(claimPath), await fs$1.readFile(claimPath, "utf8")))) throw new Error("legacy ACP replay source changed while doctor was claiming it");
				}
				runOpenClawStateWriteTransaction(({ db }) => {
					const replayDb = getNodeSqliteKysely(db);
					const missingSessions = [];
					for (const session of sessions) {
						if (executeSqliteQueryTakeFirstSync(db, replayDb.selectFrom("acp_replay_sessions").select("session_id").where("session_id", "=", session.sessionId))) {
							if (!reconcileCanonicalSession(db, session)) throw new Error(`canonical ACP replay session ${session.sessionId} conflicts with the legacy source`);
							retainedSessions += 1;
							continue;
						}
						missingSessions.push(session);
					}
					for (const session of missingSessions) {
						let estimatedBytes = estimateSessionBytes(session);
						executeSqliteQuerySync(db, replayDb.insertInto("acp_replay_sessions").values({
							session_id: session.sessionId,
							session_key: session.sessionKey,
							cwd: session.cwd,
							complete: session.complete ? 1 : 0,
							created_at: session.createdAt,
							updated_at: session.updatedAt,
							next_seq: session.nextSeq,
							estimated_bytes: estimatedBytes
						}));
						for (const event of session.events) {
							const updateJson = JSON.stringify(event.update);
							const eventBytes = estimateEventBytes(event, updateJson);
							executeSqliteQuerySync(db, replayDb.insertInto("acp_replay_events").values({
								session_id: event.sessionId,
								seq: event.seq,
								at: event.at,
								session_key: event.sessionKey,
								run_id: event.runId ?? null,
								update_json: updateJson,
								estimated_bytes: eventBytes
							}));
							estimatedBytes += eventBytes;
							importedEvents += 1;
						}
						executeSqliteQuerySync(db, replayDb.updateTable("acp_replay_sessions").set({ estimated_bytes: estimatedBytes }).where("session_id", "=", session.sessionId));
						if (!reconcileCanonicalSession(db, session)) throw new Error(`failed verifying imported ACP replay session ${session.sessionId}`);
						importedSessions += 1;
					}
				}, { env: {
					...process.env,
					OPENCLAW_STATE_DIR: params.stateDir
				} });
				await fs$1.unlink(claimPath);
				return {
					importedSessions,
					importedEvents,
					retainedSessions,
					pendingSource: fs.existsSync(params.detected.sourcePath)
				};
			} catch (error) {
				if (claimedThisRun && !fs.existsSync(params.detected.sourcePath)) await fs$1.rename(claimPath, params.detected.sourcePath).catch(() => {});
				throw error;
			}
		});
		changes.push(`Migrated ${result.importedSessions} ACP replay session(s) and ${result.importedEvents} event(s) → shared SQLite state`);
		if (result.retainedSessions > 0) changes.push(`Kept ${result.retainedSessions} existing ACP replay session(s) from shared SQLite state`);
		changes.push(`Removed retired ACP replay ledger ${params.detected.sourcePath}`);
		if (result.pendingSource) warnings.push(`A newer ACP replay ledger remains at ${params.detected.sourcePath}; rerun doctor to migrate it`);
	} catch (error) {
		warnings.push(`Failed migrating legacy ACP replay ledger ${params.detected.sourcePath}: ${String(error)}`);
	}
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/legacy-json-object-stream.ts
const JSON_WHITESPACE = /* @__PURE__ */ new Set([
	" ",
	"	",
	"\r",
	"\n"
]);
var JsonCharacterCursor = class {
	constructor(chunks) {
		this.chunk = "";
		this.offset = 0;
		this.chunks = chunks[Symbol.asyncIterator]();
	}
	async fill() {
		while (this.offset >= this.chunk.length) {
			const next = await this.chunks.next();
			if (next.done) return false;
			this.chunk = next.value;
			this.offset = 0;
		}
		return true;
	}
	async peek() {
		return await this.fill() ? this.chunk[this.offset] ?? null : null;
	}
	async take() {
		if (!await this.fill()) return null;
		return this.chunk[this.offset++] ?? null;
	}
	async skipWhitespace() {
		while (true) {
			const next = await this.peek();
			if (next === null || !JSON_WHITESPACE.has(next)) return;
			await this.take();
		}
	}
};
function parseLegacyJson(raw) {
	try {
		return JSON.parse(raw);
	} catch {
		throw new Error("legacy JSON store contains invalid JSON");
	}
}
async function expectCharacter(cursor, expected) {
	await cursor.skipWhitespace();
	if (await cursor.take() !== expected) throw new Error(`expected ${JSON.stringify(expected)} in legacy JSON store`);
}
async function readJsonString(cursor) {
	await cursor.skipWhitespace();
	if (await cursor.take() !== "\"") throw new Error("expected string in legacy JSON store");
	let raw = "\"";
	let escaped = false;
	while (true) {
		const character = await cursor.take();
		if (character === null) throw new Error("unterminated string in legacy JSON store");
		raw += character;
		if (escaped) {
			escaped = false;
			continue;
		}
		if (character === "\\") {
			escaped = true;
			continue;
		}
		if (character === "\"") {
			const parsed = parseLegacyJson(raw);
			if (typeof parsed !== "string") throw new Error("invalid string in legacy JSON store");
			return parsed;
		}
	}
}
async function readJsonObject(cursor) {
	await cursor.skipWhitespace();
	if (await cursor.take() !== "{") throw new Error("legacy JSON entries must be objects");
	let raw = "{";
	let depth = 1;
	let escaped = false;
	let inString = false;
	while (depth > 0) {
		const character = await cursor.take();
		if (character === null) throw new Error("unterminated object in legacy JSON store");
		raw += character;
		if (inString) {
			if (escaped) escaped = false;
			else if (character === "\\") escaped = true;
			else if (character === "\"") inString = false;
			continue;
		}
		if (character === "\"") inString = true;
		else if (character === "{") depth += 1;
		else if (character === "}") depth -= 1;
	}
	return parseLegacyJson(raw);
}
async function parseSinglePropertyObject(params) {
	const cursor = new JsonCharacterCursor(params.chunks);
	await expectCharacter(cursor, "{");
	if (await readJsonString(cursor) !== params.property) throw new Error(`legacy JSON store must contain only ${params.property}`);
	await expectCharacter(cursor, ":");
	await expectCharacter(cursor, "{");
	await cursor.skipWhitespace();
	if (await cursor.peek() !== "}") while (true) {
		const key = await readJsonString(cursor);
		await expectCharacter(cursor, ":");
		params.onEntry(key, await readJsonObject(cursor));
		await cursor.skipWhitespace();
		const separator = await cursor.take();
		if (separator === "}") break;
		if (separator !== ",") throw new Error("expected comma or object end in legacy JSON store");
	}
	else await cursor.take();
	await expectCharacter(cursor, "}");
	await cursor.skipWhitespace();
	if (await cursor.take() !== null) throw new Error("legacy JSON store has trailing content");
}
async function* decodeUtf8Chunks(params) {
	const decoder = new TextDecoder("utf-8", { fatal: true });
	const stream = params.handle.createReadStream({
		autoClose: false,
		start: 0
	});
	for await (const rawChunk of stream) {
		const chunk = Buffer.isBuffer(rawChunk) ? rawChunk : Buffer.from(rawChunk);
		params.hash.update(chunk);
		params.onBytes(chunk.byteLength);
		const text = decoder.decode(chunk, { stream: true });
		if (text) yield text;
	}
	const tail = decoder.decode();
	if (tail) yield tail;
}
function assertStableRead(before, after, bytesRead) {
	if (before.dev !== after.dev || before.ino !== after.ino || before.mtimeMs !== after.mtimeMs || before.size !== after.size || bytesRead !== after.size) throw new Error("legacy JSON store changed while it was being read");
}
/** Hash a safely opened file, optionally parsing its single object property entry by entry. */
async function readLegacyJsonObjectStream(params) {
	const opened = await params.stateRoot.open(params.relativePath, {
		hardlinks: "reject",
		symlinks: "reject"
	});
	const hash = createHash("sha256");
	let size = 0;
	try {
		const before = opened.stat;
		if (params.property && params.onEntry) await parseSinglePropertyObject({
			chunks: decodeUtf8Chunks({
				handle: opened.handle,
				hash,
				onBytes: (length) => {
					size += length;
				}
			}),
			property: params.property,
			onEntry: params.onEntry
		});
		else {
			const stream = opened.handle.createReadStream({
				autoClose: false,
				start: 0
			});
			for await (const rawChunk of stream) {
				const chunk = Buffer.isBuffer(rawChunk) ? rawChunk : Buffer.from(rawChunk);
				hash.update(chunk);
				size += chunk.byteLength;
			}
		}
		const after = await opened.handle.stat();
		assertStableRead(before, after, size);
		return {
			dev: after.dev,
			ino: after.ino,
			mtimeMs: after.mtimeMs,
			sha256: hash.digest("hex"),
			size
		};
	} catch (error) {
		if (error instanceof TypeError && /encoded data was not valid/i.test(error.message)) throw new Error("legacy JSON store is not valid UTF-8", { cause: error });
		throw error;
	} finally {
		await opened[Symbol.asyncDispose]();
	}
}
//#endregion
//#region src/infra/state-migrations.apns.ts
const LEGACY_APNS_REGISTRATION_PATH = "push/apns-registrations.json";
const APNS_DOCTOR_CLAIM_SUFFIX = ".doctor-importing";
const MIGRATION_KIND$4 = "legacy-apns-registrations-json";
const MAX_LEGACY_APNS_UPDATED_AT_MS = 864e13;
const DIRECT_REGISTRATION_KEYS = /* @__PURE__ */ new Set([
	"nodeId",
	"transport",
	"token",
	"topic",
	"environment",
	"updatedAtMs"
]);
const RELAY_REGISTRATION_KEYS = /* @__PURE__ */ new Set([
	"nodeId",
	"transport",
	"relayHandle",
	"sendGrant",
	"installationId",
	"topic",
	"environment",
	"distribution",
	"updatedAtMs",
	"relayOrigin",
	"tokenDebugSuffix"
]);
function resolveLegacyApnsPath(stateDir) {
	return path.join(stateDir, LEGACY_APNS_REGISTRATION_PATH);
}
/** Detect the retired APNs store only when an explicit Doctor flow opts in. */
function detectLegacyApnsRegistrations(params) {
	const sourcePath = resolveLegacyApnsPath(params.stateDir);
	return {
		sourcePath,
		hasLegacy: params.doctorOnlyStateMigrations === true && legacyMigrationSourceOrClaimMayExist(sourcePath, APNS_DOCTOR_CLAIM_SUFFIX)
	};
}
function relativeLegacyPath$1(stateDir, filePath) {
	return resolveLegacyMigrationRelativePath(stateDir, filePath, "APNs", false);
}
async function readLegacySourceSnapshot$4(stateRoot, stateDir, sourcePath, onEntry) {
	return {
		sourcePath,
		...await readLegacyJsonObjectStream({
			stateRoot,
			relativePath: relativeLegacyPath$1(stateDir, sourcePath),
			...onEntry ? {
				property: "registrationsByNodeId",
				onEntry
			} : {}
		})
	};
}
function assertOnlyKeys$3(value, allowed) {
	if (Object.keys(value).find((key) => !allowed.has(key))) throw new Error("legacy APNs registration has an unexpected field");
}
function isValidLegacyApnsTimestamp(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 && value <= MAX_LEGACY_APNS_UPDATED_AT_MS;
}
function parseLegacyApnsRegistration(rawNodeId, rawRegistration, env) {
	if (!isRecord(rawRegistration)) throw new Error("legacy APNs registration is not an object");
	const transport = rawRegistration.transport ?? "direct";
	if (transport !== "direct" && transport !== "relay") throw new Error("legacy APNs registration has invalid transport");
	assertOnlyKeys$3(rawRegistration, transport === "relay" ? RELAY_REGISTRATION_KEYS : DIRECT_REGISTRATION_KEYS);
	const normalizedNodeId = normalizeApnsNodeId(rawNodeId);
	if (!isValidApnsNodeId(normalizedNodeId)) throw new Error("legacy APNs registration has an invalid node id");
	if (!isValidLegacyApnsTimestamp(rawRegistration.updatedAtMs)) throw new Error("legacy APNs registration has an invalid updated timestamp");
	const registration = normalizeCanonicalApnsRegistration(transport === "direct" ? {
		...rawRegistration,
		transport,
		environment: normalizeApnsEnvironment(rawRegistration.environment) ?? "sandbox"
	} : {
		...rawRegistration,
		transport
	}, env);
	const invalidRelayOrigin = transport === "relay" && Object.hasOwn(rawRegistration, "relayOrigin") && (!registration || registration.transport !== "relay" || !registration.relayOrigin);
	const invalidTokenDebugSuffix = transport === "relay" && Object.hasOwn(rawRegistration, "tokenDebugSuffix") && typeof rawRegistration.tokenDebugSuffix !== "string";
	if (!registration || registration.nodeId !== normalizedNodeId || invalidRelayOrigin || invalidTokenDebugSuffix) throw new Error("legacy APNs registration is invalid");
	return [normalizedNodeId, registration];
}
function importAndRecordReceipt$2(params) {
	const sourceKey = resolveLegacyMigrationSourceKey("apns-json", params.sourcePath);
	const runId = `${sourceKey}:${params.snapshot.sha256.slice(0, 16)}`;
	const now = Date.now();
	return runOpenClawStateWriteTransaction(({ db }) => {
		const stateDb = getNodeSqliteKysely(db);
		if (readLegacyMigrationReceiptFromDatabase(db, sourceKey)) return {
			sourceKey,
			imported: 0,
			preserved: 0,
			suppressed: 0,
			receiptAuthoritative: true
		};
		let imported = 0;
		let preserved = 0;
		let suppressed = 0;
		const expectedNodeIds = [];
		for (const [nodeId, registration] of params.registrations) {
			const existing = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("apns_registrations").selectAll().where("node_id", "=", nodeId));
			const tombstone = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("apns_registration_tombstones").select("node_id").where("node_id", "=", nodeId));
			if (existing && tombstone) throw new Error("APNs state has both a registration and deletion tombstone");
			if (existing) {
				apnsRegistrationFromRow(existing);
				preserved += 1;
				expectedNodeIds.push(nodeId);
			} else if (tombstone) suppressed += 1;
			else {
				executeSqliteQuerySync(db, stateDb.insertInto("apns_registrations").values(apnsRegistrationToRow(registration)));
				imported += 1;
				expectedNodeIds.push(nodeId);
			}
		}
		for (const nodeId of expectedNodeIds) {
			const verified = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("apns_registrations").selectAll().where("node_id", "=", nodeId));
			if (!verified) throw new Error("SQLite verification failed for an APNs registration");
			apnsRegistrationFromRow(verified);
		}
		const reportJson = JSON.stringify({
			source: MIGRATION_KIND$4,
			target: "apns_registrations",
			sourceSha256: params.snapshot.sha256,
			sourceRecordCount: params.registrations.size,
			importedRecordCount: imported,
			preservedSqliteRecordCount: preserved,
			suppressedDeletedRecordCount: suppressed
		});
		recordLegacyMigrationReceipt(db, {
			sourceKey,
			migrationKind: MIGRATION_KIND$4,
			sourcePath: params.sourcePath,
			targetTable: "apns_registrations",
			sourceSha256: params.snapshot.sha256,
			sourceSizeBytes: params.snapshot.size,
			sourceRecordCount: params.registrations.size,
			runId,
			now,
			reportJson
		});
		return {
			sourceKey,
			imported,
			preserved,
			suppressed,
			receiptAuthoritative: false
		};
	}, { env: params.env });
}
async function cleanupReceiptAuthoritativeSources$1(params) {
	let removed = 0;
	for (const candidate of [params.sourcePath, `${params.sourcePath}${APNS_DOCTOR_CLAIM_SUFFIX}`]) {
		if (!await params.stateRoot.exists(relativeLegacyPath$1(params.stateDir, candidate))) continue;
		await readLegacySourceSnapshot$4(params.stateRoot, params.stateDir, candidate);
		if (params.removeSource) await params.removeSource(candidate);
		else await params.stateRoot.remove(relativeLegacyPath$1(params.stateDir, candidate));
		removed += 1;
	}
	if (!params.receipt.removedSource || removed > 0) markLegacyMigrationSourceRemoved(params.receipt.sourceKey, params.env);
	return removed;
}
async function migrateWithExclusiveStateOwnership$4(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	if (!params.detected.hasLegacy) return {
		changes,
		warnings
	};
	const receipt = readLegacyMigrationReceipt(resolveLegacyMigrationSourceKey("apns-json", params.detected.sourcePath), params.env);
	if (receipt) {
		try {
			if (await cleanupReceiptAuthoritativeSources$1({
				...params,
				sourcePath: params.detected.sourcePath,
				receipt
			}) > 0) notices.push("Discarded retired APNs JSON state already covered by its SQLite receipt.");
		} catch (error) {
			warnings.push(`APNs state is in SQLite, but legacy cleanup failed: ${String(error)}`);
		}
		return notices.length > 0 ? {
			changes,
			warnings,
			notices
		} : {
			changes,
			warnings
		};
	}
	const sourcePath = params.detected.sourcePath;
	const source = new LegacyMigrationSourceClaim({
		stateRoot: params.stateRoot,
		stateDir: params.stateDir,
		sourcePath,
		label: "APNs",
		includeFilePath: false,
		claimSuffix: APNS_DOCTOR_CLAIM_SUFFIX,
		readSnapshot: (snapshotPath) => readLegacySourceSnapshot$4(params.stateRoot, params.stateDir, snapshotPath)
	});
	const hasSource = await source.exists();
	const hasClaim = await source.exists(true);
	if (hasSource && hasClaim) return {
		changes,
		warnings: ["Failed migrating legacy APNs state: source and interrupted claim both exist."]
	};
	const activePath = hasSource ? sourcePath : hasClaim ? source.claimPath : null;
	if (!activePath) return {
		changes,
		warnings
	};
	let snapshot;
	const registrations = /* @__PURE__ */ new Map();
	try {
		snapshot = await readLegacySourceSnapshot$4(params.stateRoot, params.stateDir, activePath, (rawNodeId, rawRegistration) => {
			const [nodeId, registration] = parseLegacyApnsRegistration(rawNodeId, rawRegistration, params.env);
			if (registrations.has(nodeId)) throw new Error("legacy APNs registration has a duplicate node id");
			registrations.set(nodeId, registration);
		});
	} catch (error) {
		warnings.push(`Failed reading legacy APNs state: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	if (activePath === sourcePath) try {
		snapshot = await source.claim({
			snapshot,
			mismatchMessage: "legacy APNs source changed before Doctor could claim it",
			beforeClaim: params.beforeClaim
		});
	} catch (error) {
		const restoreError = await source.restore();
		warnings.push(`Failed migrating legacy APNs state: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	let result;
	try {
		result = importAndRecordReceipt$2({
			env: params.env,
			sourcePath,
			snapshot,
			registrations
		});
	} catch (error) {
		const restoreError = await source.restore();
		warnings.push(`Failed migrating legacy APNs state: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	try {
		await source.remove({
			removeSource: params.removeSource,
			sourceReappearedMessage: "legacy APNs source reappeared during import"
		});
		markLegacyMigrationSourceRemoved(result.sourceKey, params.env);
	} catch (error) {
		warnings.push(`APNs state is in SQLite, but legacy cleanup failed: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	changes.push(`Migrated ${result.imported} APNs registration${result.imported === 1 ? "" : "s"} to SQLite.`);
	if (result.preserved > 0) notices.push(`Preserved ${result.preserved} canonical SQLite APNs registration${result.preserved === 1 ? "" : "s"}.`);
	if (result.suppressed > 0) notices.push(`Kept ${result.suppressed} deleted APNs registration${result.suppressed === 1 ? "" : "s"} retired.`);
	notices.push("Removed retired APNs JSON state after verified SQLite import.");
	return {
		changes,
		warnings,
		notices
	};
}
/** Import the retired APNs store while excluding old Gateways that can recreate it. */
async function migrateLegacyApnsRegistrations(params) {
	if (!params.detected.hasLegacy) return {
		changes: [],
		warnings: []
	};
	return await withLegacyMigrationStateLock({
		stateDir: params.stateDir,
		env: params.env,
		label: "legacy APNs state",
		releaseLabel: "APNs",
		errorLabel: "Failed reading legacy APNs state",
		run: async (env) => {
			const stateRoot = await root$1(params.stateDir, {
				hardlinks: "reject",
				symlinks: "reject"
			});
			return await migrateWithExclusiveStateOwnership$4({
				...params,
				env,
				stateRoot
			});
		}
	});
}
//#endregion
//#region src/infra/state-migrations.audit-sanitized.ts
async function writeRecoveredSanitizedAuditArchive(params) {
	const current = await params.root.exists(params.relativePath) ? await readLegacyAuditSourceSnapshot(params.root, params.relativePath) : void 0;
	let desired;
	if (params.previousCheckpoint) {
		if (!current || current.rawBytes.length < params.previousCheckpoint.sanitizedSize) {
			params.warnings.push(`Skipped ${params.sourceLabel} recovery because its sanitized archive is missing or truncated`);
			return false;
		}
		const checkpointedPrefix = current.rawBytes.subarray(0, params.previousCheckpoint.sanitizedSize);
		if (createHash("sha256").update(checkpointedPrefix).digest("hex") !== params.previousCheckpoint.sanitizedContentHash) {
			params.warnings.push(`Skipped ${params.sourceLabel} recovery because its sanitized archive changed after checkpoint`);
			return false;
		}
		desired = Buffer.concat([checkpointedPrefix, Buffer.from(params.candidateRecordsJsonl, "utf8")]);
		if (current.rawBytes.equals(desired)) return true;
		const currentIsVerifiedDesiredPrefix = desired.subarray(0, current.rawBytes.length).equals(current.rawBytes);
		if (current.rawBytes.length !== params.previousCheckpoint.sanitizedSize && !currentIsVerifiedDesiredPrefix) {
			params.warnings.push(`Skipped ${params.sourceLabel} recovery because its sanitized archive has an uncheckpointed tail`);
			return false;
		}
	} else {
		desired = Buffer.from(params.allRecordsJsonl, "utf8");
		if (current?.rawBytes.equals(desired)) return true;
	}
	await params.root.write(params.relativePath, desired, {
		mkdir: false,
		mode: 384
	});
	return true;
}
//#endregion
//#region src/infra/state-migrations.audit-logs.ts
function legacyAuditClaimPathForArchive(sourcePath, sanitizedArchivePath) {
	const archivePrefix = `${sourcePath}.migrated`;
	if (!sanitizedArchivePath.startsWith(archivePrefix)) throw new Error(`Invalid legacy audit archive path ${sanitizedArchivePath}`);
	const generationSuffix = sanitizedArchivePath.slice(archivePrefix.length);
	return path.join(path.dirname(sourcePath), `.${path.basename(sourcePath)}.doctor-importing${generationSuffix}`);
}
async function resolveAuditArchiveRelativePaths(root, sourceRelativePath) {
	const directoryPath = path.join(root.rootReal, path.dirname(sourceRelativePath));
	const baseName = path.basename(sourceRelativePath).replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
	const archivePattern = new RegExp(`^${baseName}\\.migrated(?:\\.([2-9]|[1-9][0-9]+))?(?:\\.raw)?$`, "u");
	const claimPattern = new RegExp(`^\\.${baseName}\\.doctor-importing(?:\\.([2-9]|[1-9][0-9]+))?$`, "u");
	let latestGeneration = 0n;
	for (const entry of fs.readdirSync(directoryPath)) {
		const match = archivePattern.exec(entry) ?? claimPattern.exec(entry);
		if (!match) continue;
		const generation = BigInt(match[1] ?? "1");
		if (generation > latestGeneration) latestGeneration = generation;
	}
	const generation = latestGeneration + 1n;
	const sanitized = `${sourceRelativePath}.migrated${generation === 1n ? "" : `.${generation}`}`;
	return {
		sanitized,
		raw: `${sanitized}.raw`,
		resumeSanitized: false
	};
}
async function secureAuditArchiveFile(params) {
	try {
		const opened = await params.root.open(params.relativePath);
		try {
			await opened.handle.chmod(384);
			await opened.handle.sync();
		} finally {
			await opened.handle.close();
		}
		return true;
	} catch (error) {
		params.warnings.push(`Failed securing ${params.label} legacy source: ${String(error)}`);
		return false;
	}
}
async function archiveLegacyAuditClaim(params) {
	let moved = false;
	let sanitizedCreated = false;
	const archivePaths = params.archivePaths;
	try {
		if (archivePaths.resumeSanitized) await params.root.write(archivePaths.sanitized, params.sanitizedJsonl, {
			mkdir: false,
			mode: 384
		});
		else await params.root.create(archivePaths.sanitized, params.sanitizedJsonl, { mode: 384 });
		sanitizedCreated = true;
		if (!await secureAuditArchiveFile({
			root: params.root,
			relativePath: archivePaths.sanitized,
			label: `sanitized ${params.source.label}`,
			warnings: params.warnings
		})) return { moved: false };
		await params.root.move(params.claimRelativePath, archivePaths.raw);
		if (!await secureAuditArchiveFile({
			root: params.root,
			relativePath: archivePaths.raw,
			label: `raw archived ${params.source.label}`,
			warnings: params.warnings
		})) {
			try {
				await params.root.move(archivePaths.raw, params.claimRelativePath);
			} catch (error) {
				params.warnings.push(`Failed restoring unsecured ${params.source.label} legacy source: ${String(error)}`);
			}
			return { moved: false };
		}
		moved = true;
		const scrubbedSnapshot = await scrubLegacyAuditRecoveryArchive({
			root: params.root,
			relativePath: archivePaths.raw,
			expectedSnapshot: params.snapshot,
			label: params.source.label,
			warnings: params.warnings
		});
		params.changes.push(`Archived sanitized ${params.source.label} legacy source → ${path.join(path.dirname(params.source.logicalSourcePath), path.basename(archivePaths.sanitized))}; ${scrubbedSnapshot ? "scrubbed same-inode append recovery archive" : "retained same-inode append recovery archive for Doctor retry"} → ${path.join(path.dirname(params.source.logicalSourcePath), path.basename(archivePaths.raw))}`);
		return {
			moved: true,
			rawRelativePath: archivePaths.raw,
			...scrubbedSnapshot ? { scrubbedSnapshot } : {}
		};
	} catch (error) {
		params.warnings.push(`Failed archiving ${params.source.label} ${params.source.logicalSourcePath}: ${String(error)}`);
	} finally {
		if (!moved && sanitizedCreated) await params.root.remove(archivePaths.sanitized).catch(() => void 0);
	}
	return {
		moved,
		...moved ? { rawRelativePath: archivePaths.raw } : {}
	};
}
async function restoreOrPreserveLegacyAuditClaim(params) {
	try {
		if (!await params.root.exists(params.claimRelativePath)) return;
		if (!await params.root.exists(params.sourceRelativePath)) {
			await params.root.move(params.claimRelativePath, params.sourceRelativePath);
			await secureAuditArchiveFile({
				root: params.root,
				relativePath: params.sourceRelativePath,
				label: params.source.label,
				warnings: params.warnings
			});
			return;
		}
		await params.root.move(params.claimRelativePath, params.archivePaths.raw);
		await secureAuditArchiveFile({
			root: params.root,
			relativePath: params.archivePaths.raw,
			label: `preserved ${params.source.label}`,
			warnings: params.warnings
		});
		params.warnings.push(`Preserved claimed ${params.source.label} at ${path.join(path.dirname(params.source.logicalSourcePath), path.basename(params.archivePaths.raw))} because an old writer recreated ${params.source.logicalSourcePath}`);
	} catch (error) {
		params.warnings.push(`Failed restoring claimed ${params.source.label} ${params.source.logicalSourcePath}: ${String(error)}`);
	}
}
async function migrateLegacyAuditLogSource(params) {
	const changes = [];
	const warnings = [];
	const result = (completed) => ({
		changes,
		warnings,
		completed
	});
	const root$2 = await root(params.stateDir, {
		hardlinks: "reject",
		maxBytes: Number.MAX_SAFE_INTEGER,
		mkdir: false,
		mode: 384,
		symlinks: "reject"
	});
	const sourceRelativePath = path.relative(path.resolve(params.stateDir), params.source.logicalSourcePath);
	const detectedRelativePath = path.relative(path.resolve(params.stateDir), params.source.sourcePath);
	let archivePaths;
	let claimRelativePath = detectedRelativePath;
	if (params.source.storage === "active") {
		archivePaths = await resolveAuditArchiveRelativePaths(root$2, sourceRelativePath);
		claimRelativePath = path.relative(path.resolve(params.stateDir), legacyAuditClaimPathForArchive(params.source.logicalSourcePath, path.join(params.stateDir, archivePaths.sanitized)));
		await root$2.move(detectedRelativePath, claimRelativePath);
	} else if (params.source.storage === "claim") {
		if (!params.source.sanitizedArchivePath || !params.source.rawArchivePath) throw new Error(`Missing reserved archive generation for ${params.source.sourcePath}`);
		const sanitized = path.relative(path.resolve(params.stateDir), params.source.sanitizedArchivePath);
		const raw = path.relative(path.resolve(params.stateDir), params.source.rawArchivePath);
		archivePaths = {
			sanitized,
			raw,
			resumeSanitized: await root$2.exists(sanitized) && !await root$2.exists(raw)
		};
	}
	let claimFinalized = params.source.storage === "raw-archive";
	try {
		if (!await secureAuditArchiveFile({
			root: root$2,
			relativePath: claimRelativePath,
			label: `claimed ${params.source.label}`,
			warnings
		})) return result(false);
		const rawArchiveRelativePath = archivePaths?.raw ?? detectedRelativePath;
		if (!hasLegacyAuditRawCheckpointCapacity(params.stateDir, rawArchiveRelativePath)) {
			warnings.push(`Skipped ${params.source.label} migration because durable raw-archive checkpoint capacity is exhausted; left the legacy source in place`);
			return result(false);
		}
		if (!await restoreInterruptedAuditRecoveryArchive({
			root: root$2,
			relativePath: claimRelativePath,
			label: params.source.label,
			warnings
		})) return result(false);
		const snapshot = await readLegacyAuditSourceSnapshot(root$2, claimRelativePath);
		const sourceGeneration = legacyAuditSourceGenerationKey(rawArchiveRelativePath);
		const sanitizedRelativePath = params.source.storage === "raw-archive" && params.source.sanitizedArchivePath ? path.relative(path.resolve(params.stateDir), params.source.sanitizedArchivePath) : void 0;
		const previousCheckpoint = params.source.storage === "raw-archive" ? findPreviousLegacyAuditRawCheckpoint(params.stateDir, rawArchiveRelativePath) : void 0;
		if (params.source.storage === "raw-archive" && !previousCheckpoint) {
			if (!sanitizedRelativePath) throw new Error(`Missing sanitized archive path for ${params.source.sourcePath}`);
			const firstContentByte = snapshot.rawBytes.findIndex((byte) => byte !== 32 && byte !== 9 && byte !== 10 && byte !== 13);
			if (snapshot.rawBytes.length > 0 && firstContentByte !== 0) {
				warnings.push(`Skipped ${params.source.label} recovery because its checkpointless raw archive begins with ambiguous whitespace; left the archive in place`);
				return result(false);
			}
		}
		const prepared = prepareLegacyAuditRecords(params.source, snapshot.raw, sourceGeneration, previousCheckpoint?.recordOrdinalBase ?? 0);
		if (!prepared.ok) {
			warnings.push(...prepared.warnings);
			return result(false);
		}
		const env = {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		};
		const maxEntries = params.source.kind === "config" ? CONFIG_AUDIT_MAX_ENTRIES : SYSTEM_AGENT_AUDIT_MAX_ENTRIES;
		const store = createSqliteAuditRecordStore({
			scope: params.source.kind === "config" ? CONFIG_AUDIT_SCOPE : SYSTEM_AGENT_AUDIT_SCOPE,
			maxEntries,
			env
		});
		const existingEntries = store.entries();
		const existingKeys = new Set(existingEntries.map((entry) => entry.key));
		let candidateRecords = prepared.records;
		if (params.source.storage === "raw-archive") {
			if (previousCheckpoint) {
				const appendedRecords = recordsAfterLegacyAuditRawCheckpoint({
					checkpoint: previousCheckpoint,
					snapshot,
					records: prepared.records
				});
				if (!appendedRecords) {
					warnings.push(`Skipped ${params.source.label} recovery because ${params.source.sourcePath} changed other than by append; left the raw archive in place`);
					return result(false);
				}
				candidateRecords = appendedRecords;
			}
		}
		if (!previousCheckpoint && candidateRecords === prepared.records) {
			const lastRetainedSourceIndex = prepared.records.findLastIndex((record) => existingKeys.has(record.key));
			if (lastRetainedSourceIndex >= 0) candidateRecords = prepared.records.slice(lastRetainedSourceIndex + 1);
		}
		const missing = candidateRecords.filter((record) => !existingKeys.has(record.key));
		store.registerLegacyMany(missing);
		const importedKeys = new Set(store.entries().map((entry) => entry.key));
		const retainedNewRows = missing.filter((record) => importedKeys.has(record.key)).length;
		const retentionNote = retainedNewRows === missing.length ? "" : `; ${retainedNewRows} retained after bounded retention`;
		if (params.source.storage === "raw-archive") {
			if (!sanitizedRelativePath) throw new Error(`Missing sanitized archive path for ${params.source.sourcePath}`);
			if (!await writeRecoveredSanitizedAuditArchive({
				sourceLabel: params.source.label,
				root: root$2,
				relativePath: sanitizedRelativePath,
				allRecordsJsonl: prepared.sanitizedJsonl,
				candidateRecordsJsonl: serializePreparedAuditRecords(candidateRecords),
				previousCheckpoint,
				warnings
			})) return result(false);
			if (previousCheckpoint?.phase !== "merge-intent" || candidateRecords.length > 0) {
				if (!await recordLegacyAuditRawCheckpoint({
					stateDir: params.stateDir,
					rawPath: params.source.sourcePath,
					rawRelativePath: claimRelativePath,
					sanitizedRelativePath,
					root: root$2,
					snapshot,
					phase: "merge-intent",
					recordCount: prepared.records.length,
					recordOrdinalBase: previousCheckpoint?.recordOrdinalBase ?? 0,
					warnings
				})) return result(false);
			}
			if (!await secureAuditArchiveFile({
				root: root$2,
				relativePath: sanitizedRelativePath,
				label: `sanitized ${params.source.label}`,
				warnings
			})) return result(false);
			if (missing.length > 0) changes.push(`Recovered ${missing.length} later ${params.source.label} row(s) from ${params.source.sourcePath}${retentionNote}`);
			const scrubbedSnapshot = await scrubLegacyAuditRecoveryArchive({
				root: root$2,
				relativePath: claimRelativePath,
				expectedSnapshot: snapshot,
				label: params.source.label,
				warnings
			});
			if (!scrubbedSnapshot) return result(false);
			const scrubbedRecords = prepareLegacyAuditRecords(params.source, scrubbedSnapshot.raw, legacyAuditSourceGenerationKey(rawArchiveRelativePath));
			if (!scrubbedRecords.ok) {
				warnings.push(...scrubbedRecords.warnings);
				warnings.push(`Retained uncheckpointed ${params.source.label} recovery archive; rerun openclaw doctor --fix`);
				return result(false);
			}
			if (scrubbedRecords.records.length !== 0) {
				warnings.push(`A legacy ${params.source.label} writer appended during recovery; rerun openclaw doctor --fix to import the retained rows`);
				return result(false);
			}
			const checkpointed = await recordLegacyAuditRawCheckpoint({
				stateDir: params.stateDir,
				rawPath: params.source.sourcePath,
				rawRelativePath: claimRelativePath,
				sanitizedRelativePath,
				root: root$2,
				snapshot: scrubbedSnapshot,
				phase: "raw",
				recordCount: 0,
				recordOrdinalBase: (previousCheckpoint?.recordOrdinalBase ?? 0) + Math.max(previousCheckpoint?.recordCount ?? 0, prepared.records.length),
				warnings
			});
			if (checkpointed) await finalizeLegacyAuditRecoveryArchive({
				root: root$2,
				relativePath: claimRelativePath
			}).catch((error) => {
				warnings.push(`Failed removing completed ${params.source.label} recovery journal: ${String(error)}`);
			});
			return result(checkpointed);
		}
		if (!archivePaths) throw new Error(`Missing archive generation for ${params.source.sourcePath}`);
		changes.push(`Migrated ${params.source.label} -> shared SQLite state (${missing.length} new row(s)${retentionNote})`);
		const archived = await archiveLegacyAuditClaim({
			source: params.source,
			claimRelativePath,
			archivePaths,
			snapshot,
			sanitizedJsonl: prepared.sanitizedJsonl,
			root: root$2,
			changes,
			warnings
		});
		claimFinalized = archived.moved;
		if (!archived.moved || !archived.rawRelativePath) {
			changes.pop();
			return result(false);
		}
		if (!archived.scrubbedSnapshot) return result(false);
		const scrubbedRecords = prepareLegacyAuditRecords(params.source, archived.scrubbedSnapshot.raw, legacyAuditSourceGenerationKey(archived.rawRelativePath));
		if (!scrubbedRecords.ok) {
			warnings.push(...scrubbedRecords.warnings);
			warnings.push(`Retained uncheckpointed ${params.source.label} recovery archive; rerun openclaw doctor --fix`);
			return result(false);
		}
		if (scrubbedRecords.records.length !== 0) {
			warnings.push(`A legacy ${params.source.label} writer appended during migration; rerun openclaw doctor --fix to import the retained rows`);
			return result(false);
		}
		const rawPath = path.join(params.stateDir, archived.rawRelativePath);
		const checkpointed = await recordLegacyAuditRawCheckpoint({
			stateDir: params.stateDir,
			rawPath,
			rawRelativePath: archived.rawRelativePath,
			sanitizedRelativePath: archivePaths.sanitized,
			root: root$2,
			snapshot: archived.scrubbedSnapshot,
			phase: "raw",
			recordCount: 0,
			recordOrdinalBase: prepared.records.length,
			warnings
		});
		if (checkpointed) await finalizeLegacyAuditRecoveryArchive({
			root: root$2,
			relativePath: archived.rawRelativePath
		}).catch((error) => {
			warnings.push(`Failed removing completed ${params.source.label} recovery journal: ${String(error)}`);
		});
		if (await root$2.exists(sourceRelativePath) && !params.recreatedSourceScheduled) warnings.push(`An old writer recreated ${params.source.label} at ${params.source.logicalSourcePath}; rerun openclaw doctor --fix to import the retained rows`);
		return result(checkpointed);
	} finally {
		if (!claimFinalized && params.source.storage === "active" && archivePaths) await restoreOrPreserveLegacyAuditClaim({
			source: params.source,
			claimRelativePath,
			sourceRelativePath,
			archivePaths,
			root: root$2,
			warnings
		});
	}
}
async function migrateLegacyAuditLogs(params) {
	const changes = [];
	const warnings = [];
	if (params.detected.sources.length === 0) return {
		changes,
		warnings
	};
	const env = {
		...process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	};
	let lock;
	try {
		lock = await acquireGatewayLock({
			allowInTests: true,
			env,
			pollIntervalMs: 25,
			role: "sqlite-maintenance",
			timeoutMs: 250
		});
	} catch (error) {
		warnings.push(`Skipped legacy audit migration because exclusive state ownership is unavailable: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	if (!lock) {
		warnings.push("Skipped legacy audit migration because exclusive state ownership is unavailable");
		return {
			changes,
			warnings
		};
	}
	try {
		await withLegacyAuditMigrationLease(params.stateDir, async () => {
			const blockedLogicalSources = /* @__PURE__ */ new Set();
			for (const [index, source] of params.detected.sources.entries()) {
				if (blockedLogicalSources.has(source.logicalSourcePath)) continue;
				try {
					const recreatedSourceScheduled = params.detected.sources.slice(index + 1).some((candidate) => candidate.storage === "active" && candidate.logicalSourcePath === source.logicalSourcePath);
					const result = await migrateLegacyAuditLogSource({
						source,
						stateDir: params.stateDir,
						...recreatedSourceScheduled ? { recreatedSourceScheduled: true } : {}
					});
					changes.push(...result.changes);
					warnings.push(...result.warnings);
					if (!result.completed) blockedLogicalSources.add(source.logicalSourcePath);
				} catch (error) {
					warnings.push(`Failed migrating ${source.label}: ${String(error)}`);
					blockedLogicalSources.add(source.logicalSourcePath);
				}
			}
		});
	} catch (error) {
		warnings.push(`Skipped legacy audit migration because coordination failed: ${String(error)}`);
	} finally {
		await lock.release();
	}
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.channel-pairing.ts
const PAIRING_SUFFIX = "-pairing.json";
const ALLOW_FROM_SUFFIX = "-allowFrom.json";
function detectLegacyChannelPairingState(params) {
	let directoryEntries = [];
	try {
		directoryEntries = fs.readdirSync(params.sourceDir, { withFileTypes: true });
	} catch (err) {
		if (err.code !== "ENOENT") throw err;
	}
	const files = directoryEntries.filter((entry) => entry.isFile() && (entry.name.endsWith(PAIRING_SUFFIX) || entry.name.endsWith(ALLOW_FROM_SUFFIX))).map((entry) => entry.name).toSorted();
	const pairedChannelIds = files.filter((filename) => filename.endsWith(PAIRING_SUFFIX)).map((filename) => filename.slice(0, -13));
	const knownChannelIds = dedupePreserveOrder([
		...CHANNEL_IDS,
		...params.configuredChannelIds ?? [],
		...pairedChannelIds
	]).toSorted((left, right) => right.length - left.length || left.localeCompare(right));
	return {
		sourceDir: params.sourceDir,
		files,
		knownChannelIds,
		defaultAccountIds: { ...params.configuredDefaultAccountIds },
		accountIds: Object.fromEntries(Object.entries(params.configuredAccountIds ?? {}).map(([channel, accountIds]) => [channel, dedupePreserveOrder(accountIds.map((accountId) => resolveAllowFromAccountId(accountId)))])),
		hasLegacy: files.length > 0
	};
}
function parsePairingFilename(filename) {
	return filename.endsWith(PAIRING_SUFFIX) ? filename.slice(0, -13) : null;
}
function parseAllowFromFilename(filename, knownChannelIds, defaultAccountIds, accountIds) {
	if (!filename.endsWith(ALLOW_FROM_SUFFIX)) return null;
	const stem = filename.slice(0, -15);
	const targets = [];
	let hasAccountCollision = false;
	for (const channel of knownChannelIds) {
		if (stem === channel) {
			targets.push({
				channel,
				accountId: normalizeOptionalString(defaultAccountIds[channel]) ?? "default"
			});
			continue;
		}
		if (!stem.startsWith(`${channel}-`)) continue;
		const accountKey = stem.slice(channel.length + 1);
		const matchingAccountIds = (accountIds[channel] ?? []).filter((accountId) => {
			try {
				return safeAccountKey(accountId) === accountKey;
			} catch {
				return false;
			}
		});
		if (matchingAccountIds.length === 1 && matchingAccountIds[0]) targets.push({
			channel,
			accountId: matchingAccountIds[0]
		});
		else if (matchingAccountIds.length > 1) hasAccountCollision = true;
		else if (accountKey === "default" && CHANNEL_IDS.includes(channel)) targets.push({
			channel,
			accountId: DEFAULT_ACCOUNT_ID
		});
	}
	if (hasAccountCollision || targets.length > 1) return {
		target: null,
		reason: "ambiguous"
	};
	return targets[0] ? { target: targets[0] } : {
		target: null,
		reason: "unresolved"
	};
}
function normalizeLegacyPairingRequest(value) {
	if (!isRecord(value)) return null;
	const id = normalizeOptionalString(value.id);
	const code = normalizeOptionalString(value.code);
	const createdAt = normalizeOptionalString(value.createdAt);
	const lastSeenAt = normalizeOptionalString(value.lastSeenAt) ?? createdAt;
	if (!id || !code || !createdAt || !lastSeenAt) return null;
	const meta = isRecord(value.meta) ? Object.fromEntries(Object.entries(value.meta).map(([key, entry]) => [key, normalizeOptionalString(entry) ?? ""]).filter(([, entry]) => Boolean(entry))) : void 0;
	return {
		id,
		code,
		createdAt,
		lastSeenAt,
		...meta && Object.keys(meta).length ? { meta } : {}
	};
}
function readLegacyPairingRequests(filePath) {
	try {
		const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
		if (!isRecord(parsed) || !Array.isArray(parsed.requests)) return null;
		return parsed.requests.flatMap((entry) => {
			const request = normalizeLegacyPairingRequest(entry);
			return request ? [request] : [];
		});
	} catch {
		return null;
	}
}
function normalizeAllowEntry(channel, value) {
	const raw = typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
	if (!raw || raw === "*") return "";
	let adapter;
	try {
		adapter = getPairingAdapter(channel);
	} catch {
		adapter = null;
	}
	const entry = normalizeOptionalString(adapter?.normalizeAllowEntry ? adapter.normalizeAllowEntry(raw) : raw) ?? "";
	return entry === "*" ? "" : entry;
}
function readLegacyAllowFrom(filePath, channel) {
	try {
		const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
		const values = Array.isArray(parsed) ? parsed : isRecord(parsed) && Array.isArray(parsed.allowFrom) ? parsed.allowFrom : null;
		if (!values) return null;
		return dedupePreserveOrder(values.map((value) => normalizeAllowEntry(channel, value)).filter(Boolean));
	} catch {
		return null;
	}
}
function mergePairingRequests(current, legacy) {
	const merged = current.slice();
	const keys = new Set(current.map((request) => `${resolveAllowFromAccountId(request.meta?.accountId)}\0${request.id}`));
	for (const request of legacy) {
		const key = `${resolveAllowFromAccountId(request.meta?.accountId)}\0${request.id}`;
		if (!keys.has(key)) {
			keys.add(key);
			merged.push(request);
		}
	}
	return merged;
}
function removeImportedSource(filePath, warnings) {
	try {
		fs.rmSync(filePath, { force: true });
		return true;
	} catch (err) {
		warnings.push(`Imported legacy channel pairing state but failed removing ${filePath}: ${String(err)}`);
		return false;
	}
}
function migrateLegacyChannelPairingState(params) {
	const changes = [];
	const warnings = [];
	for (const filename of params.detected.files) {
		const filePath = path.join(params.detected.sourceDir, filename);
		const pairingChannel = parsePairingFilename(filename);
		if (pairingChannel) {
			const requests = readLegacyPairingRequests(filePath);
			if (!requests) {
				warnings.push(`Legacy channel pairing file unreadable; left in place at ${filePath}`);
				continue;
			}
			updateChannelPairingStateSnapshot(pairingChannel, params.env, (state) => {
				state.requests = mergePairingRequests(state.requests, requests);
			});
			removeImportedSource(filePath, warnings);
			changes.push(`Migrated ${requests.length} ${pairingChannel} pairing request(s) → shared SQLite state`);
			continue;
		}
		const allowTarget = parseAllowFromFilename(filename, params.detected.knownChannelIds, params.detected.defaultAccountIds, params.detected.accountIds);
		if (!allowTarget) continue;
		if (!allowTarget.target) {
			const reason = allowTarget.reason === "ambiguous" ? "ambiguous" : "unresolved";
			warnings.push(`Legacy channel allowFrom channel/account is ${reason}; left in place at ${filePath}`);
			continue;
		}
		const entries = readLegacyAllowFrom(filePath, allowTarget.target.channel);
		if (!entries) {
			warnings.push(`Legacy channel allowFrom file unreadable; left in place at ${filePath}`);
			continue;
		}
		const accountId = resolveAllowFromAccountId(allowTarget.target.accountId);
		updateChannelPairingStateSnapshot(allowTarget.target.channel, params.env, (state) => {
			state.allowFrom ??= {};
			state.allowFrom[accountId] = dedupePreserveOrder([...state.allowFrom[accountId] ?? [], ...entries]);
		});
		removeImportedSource(filePath, warnings);
		changes.push(`Migrated ${entries.length} ${allowTarget.target.channel}/${accountId} allowFrom entr${entries.length === 1 ? "y" : "ies"} → shared SQLite state`);
	}
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.commitments.ts
const LEGACY_STORE_KEYS = /* @__PURE__ */ new Set(["version", "commitments"]);
const ACTIVE_STATUSES = ["pending", "snoozed"];
function resolveLegacyCommitmentsPath(stateDir) {
	return path.join(stateDir, "commitments", "commitments.json");
}
/** Detect retired commitment state only when an explicit doctor flow opts in. */
function detectLegacyCommitments(params) {
	const sourcePath = resolveLegacyCommitmentsPath(params.stateDir);
	return {
		sourcePath,
		hasLegacy: params.doctorOnlyStateMigrations === true && fs.existsSync(sourcePath)
	};
}
function readLegacySourceSnapshot$3(sourcePath) {
	return readLegacyMigrationSourceSnapshotSync({
		sourcePath,
		label: "commitments"
	});
}
function assertLegacySourceUnchanged$1(sourcePath, snapshot) {
	assertLegacyMigrationSourceUnchanged({
		sourcePath,
		snapshot,
		label: "commitments"
	});
}
function parseLegacyCommitments(raw) {
	const parsed = JSON.parse(raw);
	if (!isRecord(parsed) || parsed.version !== 1 || !Array.isArray(parsed.commitments)) throw new Error("legacy commitments store must be a version 1 JSON object");
	const unexpectedKey = Object.keys(parsed).find((key) => !LEGACY_STORE_KEYS.has(key));
	if (unexpectedKey) throw new Error(`legacy commitments store has unexpected field ${unexpectedKey}`);
	const records = [];
	const ids = /* @__PURE__ */ new Set();
	for (const [index, rawRecord] of parsed.commitments.entries()) {
		const record = coerceCommitmentRecord(rawRecord);
		if (!record) throw new Error(`legacy commitment at index ${index} is invalid`);
		if (ids.has(record.id)) throw new Error(`legacy commitments store contains duplicate id ${record.id}`);
		ids.add(record.id);
		records.push(record);
	}
	return records;
}
function sameLogicalScope(left, right) {
	return left.agentId === right.agentId && left.sessionKey === right.sessionKey && left.channel === right.channel && (left.accountId ?? "") === (right.accountId ?? "") && (left.to ?? "") === (right.to ?? "") && (left.threadId ?? "") === (right.threadId ?? "") && (left.senderId ?? "") === (right.senderId ?? "") && left.dedupeKey === right.dedupeKey;
}
function findActiveLogicalRow(db, record) {
	if (record.status !== "pending" && record.status !== "snoozed") return;
	return executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("commitments").selectAll().where("agent_id", "=", record.agentId).where("session_key", "=", record.sessionKey).where("channel", "=", record.channel).where("dedupe_key", "=", record.dedupeKey).where("status", "in", [...ACTIVE_STATUSES]).orderBy("updated_at_ms", "desc").orderBy("id", "asc")).rows.find((candidate) => sameLogicalScope(commitmentRecordFromRow(candidate), record));
}
function updateCommitmentRow(db, record) {
	executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("commitments").set(commitmentRecordToUpdate(record)).where("id", "=", record.id));
}
/** Import, verify, and remove the retired JSON store during explicit doctor repair. */
function migrateLegacyCommitments(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	if (!params.detected.hasLegacy) return {
		changes,
		warnings
	};
	let snapshot;
	let legacyRecords;
	try {
		snapshot = readLegacySourceSnapshot$3(params.detected.sourcePath);
		legacyRecords = parseLegacyCommitments(snapshot.raw);
	} catch (error) {
		warnings.push(`Failed reading legacy commitments state ${params.detected.sourcePath}: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	const expectedRows = /* @__PURE__ */ new Map();
	let importedCount = 0;
	let newerSqliteCount = 0;
	let activeDuplicateCount = 0;
	try {
		assertLegacySourceUnchanged$1(params.detected.sourcePath, snapshot);
		runOpenClawStateWriteTransaction(({ db }) => {
			const commitmentsDb = getNodeSqliteKysely(db);
			for (const legacyRecord of legacyRecords) {
				const existingRow = executeSqliteQueryTakeFirstSync(db, commitmentsDb.selectFrom("commitments").selectAll().where("id", "=", legacyRecord.id));
				if (existingRow) {
					const existing = commitmentRecordFromRow(existingRow);
					if (commitmentImmutableIdentity(existing) !== commitmentImmutableIdentity(legacyRecord)) throw new Error(`commitment ${legacyRecord.id} has conflicting immutable identity`);
					if (existing.updatedAtMs > legacyRecord.updatedAtMs) {
						expectedRows.set(existing.id, existing);
						newerSqliteCount += 1;
						continue;
					}
					if (existing.updatedAtMs === legacyRecord.updatedAtMs) {
						if (!commitmentRecordsEqual(existing, legacyRecord)) throw new Error(`commitment ${legacyRecord.id} diverges between JSON and SQLite at the same timestamp`);
						expectedRows.set(existing.id, existing);
						continue;
					}
					updateCommitmentRow(db, legacyRecord);
					expectedRows.set(legacyRecord.id, legacyRecord);
					importedCount += 1;
					continue;
				}
				const activeLogicalRow = findActiveLogicalRow(db, legacyRecord);
				if (activeLogicalRow) {
					const activeRecord = commitmentRecordFromRow(activeLogicalRow);
					expectedRows.set(activeRecord.id, activeRecord);
					activeDuplicateCount += 1;
					continue;
				}
				executeSqliteQuerySync(db, commitmentsDb.insertInto("commitments").values(commitmentRecordToRow(legacyRecord)));
				expectedRows.set(legacyRecord.id, legacyRecord);
				importedCount += 1;
			}
		}, { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
	} catch (error) {
		warnings.push(`Failed migrating legacy commitments state: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		params.beforeVerify?.();
		const database = openOpenClawStateDatabase({ env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		const commitmentsDb = getNodeSqliteKysely(database.db);
		for (const expected of expectedRows.values()) {
			const row = executeSqliteQueryTakeFirstSync(database.db, commitmentsDb.selectFrom("commitments").selectAll().where("id", "=", expected.id));
			if (!row || !commitmentRecordsEqual(commitmentRecordFromRow(row), expected)) throw new Error(`SQLite verification failed for commitment ${expected.id}`);
		}
		assertLegacySourceUnchanged$1(params.detected.sourcePath, snapshot);
	} catch (error) {
		warnings.push(`Failed verifying legacy commitments migration: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		claimAndRemoveLegacyMigrationSource({
			sourcePath: params.detected.sourcePath,
			snapshot,
			label: "commitments",
			beforeClaim: params.beforeClaim,
			removeSource: params.removeSource
		});
	} catch (error) {
		warnings.push(`Migrated commitments but could not remove legacy source ${params.detected.sourcePath}: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	if (importedCount > 0) changes.push(`Migrated ${importedCount} commitment(s) → shared SQLite state`);
	changes.push("Removed legacy commitments JSON after SQLite verification");
	if (newerSqliteCount > 0) notices.push(`Kept ${newerSqliteCount} newer shared SQLite commitment(s) over legacy JSON`);
	if (activeDuplicateCount > 0) notices.push(`Kept ${activeDuplicateCount} canonical active SQLite commitment(s) over legacy logical duplicates`);
	return notices.length > 0 ? {
		changes,
		warnings,
		notices
	} : {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.config-machine-state.ts
const BUNDLED_DISCOVERY_STATE_CUTOVER_VERSION = "2026.7.2";
/** Preserve retired machine-owned config fields before Doctor strips them. */
function migrateLegacyConfigMachineState(params) {
	const raw = params.config;
	const entries = [];
	const controlUi = asOptionalRecord(asOptionalRecord(raw.gateway)?.controlUi);
	const meta = asOptionalRecord(raw.meta);
	if (isLegacyControlUiDeviceAuthMigrationInput({
		disabledDeviceAuth: controlUi?.dangerouslyDisableDeviceAuth === true,
		lastTouchedVersion: typeof meta?.lastTouchedVersion === "string" ? meta.lastTouchedVersion : void 0
	})) {
		const pending = {
			version: 1,
			status: "pending",
			detectedAtMs: Date.now()
		};
		entries.push([CONTROL_UI_DEVICE_AUTH_MIGRATION_STATE_KEY, pending]);
	}
	if (meta && Object.hasOwn(meta, "lastTouchedAt")) entries.push(["config.lastTouchedAt", meta.lastTouchedAt]);
	const installs = asOptionalRecord(asOptionalRecord(asOptionalRecord(raw.hooks)?.internal)?.installs);
	const hasInstalls = Boolean(installs && Object.keys(installs).length > 0);
	const plugins = asOptionalRecord(raw.plugins);
	if (plugins && Object.hasOwn(plugins, "bundledDiscovery")) entries.push(["plugins.bundledDiscovery", plugins.bundledDiscovery]);
	else if (Array.isArray(plugins?.allow) && plugins.allow.length > 0 && (typeof meta?.lastTouchedVersion !== "string" || compareOpenClawVersions(meta.lastTouchedVersion, BUNDLED_DISCOVERY_STATE_CUTOVER_VERSION) === -1)) {
		let hasCanonicalState = false;
		try {
			hasCanonicalState = readConfigMachineState("plugins.bundledDiscovery", { env: params.env }) !== void 0;
		} catch {}
		if (!hasCanonicalState) entries.push(["plugins.bundledDiscovery", "compat"]);
	}
	const tts = asOptionalRecord(raw.tts);
	if (tts && Object.hasOwn(tts, "prefsPath")) entries.push(["tts.prefsPath", tts.prefsPath]);
	const cron = asOptionalRecord(raw.cron);
	if (cron && Object.hasOwn(cron, "store")) entries.push(["cron.store", cron.store]);
	if (entries.length === 0 && !hasInstalls) return {
		changes: [],
		warnings: []
	};
	const result = importConfigMachineState(entries, { env: params.env });
	const changes = result.imported.map((key) => `Migrated ${key} → shared SQLite state`);
	changes.push(...result.kept.map((key) => `Kept existing shared SQLite ${key} state`));
	if (installs && hasInstalls) {
		updateConfigMachineState("hooks.internal.installs", (current) => ({
			...installs,
			...current
		}), { env: params.env });
		changes.push("Migrated hooks.internal.installs → shared SQLite state");
	}
	return {
		changes,
		warnings: []
	};
}
//#endregion
//#region src/infra/state-migrations.debug-proxy.ts
const DEBUG_PROXY_SQLITE_SIDECAR_SUFFIXES = [
	"",
	"-shm",
	"-wal",
	"-journal"
];
var LegacyDebugProxyBlobConflictError = class extends Error {
	constructor(blobId) {
		super(`legacy debug proxy blob conflicts with shared state: ${blobId}`);
		this.blobId = blobId;
	}
};
var LegacyDebugProxySessionConflictError = class extends Error {
	constructor(sessionId) {
		super(`legacy debug proxy session conflicts with shared state: ${sessionId}`);
		this.sessionId = sessionId;
	}
};
function fileExists(filePath) {
	try {
		return fs.statSync(filePath).isFile();
	} catch {
		return false;
	}
}
function dirExists(dirPath) {
	try {
		return fs.statSync(dirPath).isDirectory();
	} catch {
		return false;
	}
}
function resolveLegacyDebugProxyCapturePaths(stateDir) {
	const rootDir = path.join(stateDir, "debug-proxy");
	return {
		sourcePath: path.join(rootDir, "capture.sqlite"),
		blobDir: path.join(rootDir, "blobs")
	};
}
function hasPendingSqliteArchive(sourcePath) {
	return !fileExists(sourcePath) && fileExists(`${sourcePath}.migrated`) && DEBUG_PROXY_SQLITE_SIDECAR_SUFFIXES.some((suffix) => suffix !== "" && fileExists(`${sourcePath}${suffix}`));
}
function detectLegacyDebugProxyCaptureSidecar(stateDir, env = process.env) {
	const paths = resolveLegacyDebugProxyCapturePaths(stateDir);
	if (path.resolve(paths.sourcePath) === path.resolve(resolveOpenClawStateSqlitePath({
		...env,
		OPENCLAW_STATE_DIR: stateDir
	}))) return {
		...paths,
		hasLegacy: false
	};
	const hasArchivedDatabase = fileExists(`${paths.sourcePath}.migrated`);
	return {
		...paths,
		hasLegacy: fileExists(paths.sourcePath) || hasPendingSqliteArchive(paths.sourcePath) || hasArchivedDatabase && dirExists(paths.blobDir)
	};
}
function listSqliteColumns$1(db, table) {
	const rows = db.prepare(`PRAGMA table_info(${table})`).all();
	return new Set(rows.flatMap((row) => typeof row.name === "string" ? [row.name] : []));
}
function assertTableColumns(db, table, expected) {
	const columns = listSqliteColumns$1(db, table);
	const missing = expected.filter((column) => !columns.has(column));
	if (missing.length > 0) throw new Error(`legacy ${table} table is missing ${missing.join(", ")}`);
}
function normalizeSqliteInteger(value) {
	return typeof value === "bigint" ? Number(value) : value;
}
function readLegacyDebugProxyCapture(params) {
	const db = openNodeSqliteDatabase(params.sourcePath, { readOnly: true });
	try {
		assertTableColumns(db, "capture_sessions", [
			"id",
			"started_at",
			"ended_at",
			"mode",
			"source_scope",
			"source_process",
			"proxy_url",
			"db_path",
			"blob_dir"
		]);
		assertTableColumns(db, "capture_events", [
			"session_id",
			"ts",
			"source_scope",
			"source_process",
			"protocol",
			"direction",
			"kind",
			"flow_id",
			"method",
			"host",
			"path",
			"status",
			"close_code",
			"content_type",
			"headers_json",
			"data_text",
			"data_blob_id",
			"data_sha256",
			"error_text",
			"meta_json"
		]);
		const sessions = db.prepare(`SELECT id, started_at, ended_at, mode, source_scope, source_process, proxy_url, blob_dir
         FROM capture_sessions
         ORDER BY started_at ASC, id ASC`).all();
		const events = db.prepare(`SELECT
           session_id, ts, source_scope, source_process, protocol, direction, kind, flow_id,
           method, host, path, status, close_code, content_type, headers_json, data_text,
           data_blob_id, data_sha256, error_text, meta_json
         FROM capture_events
         ORDER BY ts ASC, id ASC`).all();
		const sessionIds = new Set(sessions.map((session) => session.id));
		for (const event of events) {
			if (sessionIds.has(event.session_id)) continue;
			sessions.push({
				id: event.session_id,
				started_at: event.ts,
				ended_at: null,
				mode: "implicit",
				source_scope: event.source_scope,
				source_process: event.source_process,
				proxy_url: null,
				blob_dir: params.blobDir
			});
			sessionIds.add(event.session_id);
		}
		const blobEvents = /* @__PURE__ */ new Map();
		for (const event of events) {
			if (!event.data_blob_id) continue;
			const rows = blobEvents.get(event.data_blob_id) ?? [];
			rows.push(event);
			blobEvents.set(event.data_blob_id, rows);
		}
		const blobDirBySession = new Map(sessions.map((session) => [session.id, session.blob_dir]));
		const usedBlobDirs = /* @__PURE__ */ new Set();
		const blobs = [];
		for (const [blobId, referencingEvents] of blobEvents) {
			const candidateBlobDirs = [.../* @__PURE__ */ new Set([...referencingEvents.map((event) => blobDirBySession.get(event.session_id) ?? params.blobDir), params.blobDir])];
			const blobPath = candidateBlobDirs.map((blobDir) => path.join(blobDir, `${blobId}.bin.gz`)).find(fileExists) ?? path.join(candidateBlobDirs[0] ?? params.blobDir, `${blobId}.bin.gz`);
			const data = fs.readFileSync(blobPath);
			const raw = gunzipSync(data);
			const sha256 = sha256Hex(raw);
			if (sha256.slice(0, 24) !== blobId) throw new Error(`legacy debug proxy blob hash mismatch: ${blobPath}`);
			usedBlobDirs.add(path.dirname(blobPath));
			blobs.push({
				blobId,
				contentType: referencingEvents.find((event) => event.content_type)?.content_type ?? null,
				encoding: "gzip",
				sizeBytes: raw.byteLength,
				sha256,
				data,
				createdAt: Math.min(...referencingEvents.map((event) => normalizeSqliteInteger(event.ts) ?? 0))
			});
		}
		return {
			sessions,
			events,
			blobs,
			blobDirs: [...usedBlobDirs]
		};
	} finally {
		db.close();
	}
}
function eventValues(event) {
	return [
		event.session_id,
		normalizeSqliteInteger(event.ts),
		event.source_scope,
		event.source_process,
		event.protocol,
		event.direction,
		event.kind,
		event.flow_id,
		event.method,
		event.host,
		event.path,
		normalizeSqliteInteger(event.status),
		normalizeSqliteInteger(event.close_code),
		event.content_type,
		event.headers_json,
		event.data_text,
		event.data_blob_id,
		event.data_sha256,
		event.error_text,
		event.meta_json
	];
}
function eventKey(values) {
	return JSON.stringify(values);
}
function archiveLegacyDebugProxySqlite(params) {
	const existingSources = DEBUG_PROXY_SQLITE_SIDECAR_SUFFIXES.map((suffix) => `${params.sourcePath}${suffix}`).filter(fileExists);
	if (existingSources.length === 0) return;
	const resolutions = [];
	for (const sourcePath of existingSources) {
		const archivedPath = `${sourcePath}.migrated`;
		try {
			if (fileExists(archivedPath)) {
				if (fs.readFileSync(sourcePath).equals(fs.readFileSync(archivedPath))) {
					fs.rmSync(sourcePath, { force: true });
					resolutions.push({
						sourcePath,
						targetPath: archivedPath,
						removed: true
					});
					continue;
				}
				let index = 2;
				while (fs.existsSync(`${sourcePath}.migrated.${index}`)) index++;
				const nextArchivePath = `${sourcePath}.migrated.${index}`;
				fs.renameSync(sourcePath, nextArchivePath);
				resolutions.push({
					sourcePath,
					targetPath: nextArchivePath,
					removed: false
				});
				continue;
			}
			fs.renameSync(sourcePath, archivedPath);
			resolutions.push({
				sourcePath,
				targetPath: archivedPath,
				removed: false
			});
		} catch (err) {
			params.warnings.push(`Failed archiving debug proxy capture sidecar ${sourcePath}: ${String(err)}`);
			return;
		}
	}
	if (resolutions.every((resolution) => !resolution.removed && resolution.targetPath === `${resolution.sourcePath}.migrated`)) {
		params.changes.push(`Archived debug proxy capture sidecar legacy source → ${params.sourcePath}.migrated`);
		return;
	}
	for (const resolution of resolutions) params.changes.push(resolution.removed ? `Removed already-archived debug proxy capture sidecar legacy source ${resolution.sourcePath}` : `Archived debug proxy capture sidecar legacy source → ${resolution.targetPath}`);
}
function archiveLegacyDebugProxyBlobs(params) {
	if (!dirExists(params.blobDir)) return;
	const archivePath = `${params.blobDir}.migrated`;
	try {
		let targetPath = archivePath;
		if (dirExists(archivePath)) {
			let index = 2;
			while (fs.existsSync(`${params.blobDir}.migrated.${index}`)) index++;
			targetPath = `${params.blobDir}.migrated.${index}`;
		}
		fs.renameSync(params.blobDir, targetPath);
		params.changes.push(`Archived debug proxy capture blobs → ${targetPath}`);
	} catch (err) {
		params.warnings.push(`Failed archiving debug proxy capture blobs ${params.blobDir}: ${String(err)}`);
	}
}
function migrateLegacyDebugProxyCaptureSidecar(params) {
	const detected = params.detected ?? detectLegacyDebugProxyCaptureSidecar(params.stateDir);
	const changes = [];
	const warnings = [];
	if (!detected.hasLegacy) return {
		changes,
		warnings
	};
	if (!fileExists(detected.sourcePath)) {
		archiveLegacyDebugProxySqlite({
			sourcePath: detected.sourcePath,
			changes,
			warnings
		});
		if (fileExists(`${detected.sourcePath}.migrated`)) archiveLegacyDebugProxyBlobs({
			blobDir: detected.blobDir,
			changes,
			warnings
		});
		return {
			changes,
			warnings
		};
	}
	let legacy;
	try {
		legacy = readLegacyDebugProxyCapture(detected);
	} catch (err) {
		return {
			changes,
			warnings: [`Failed reading debug proxy capture sidecar ${detected.sourcePath}: ${String(err)}`]
		};
	}
	try {
		runOpenClawStateWriteTransaction(({ db }) => {
			const selectBlob = db.prepare(`SELECT encoding, size_bytes AS sizeBytes, sha256, data
           FROM capture_blobs
           WHERE blob_id = ?`);
			const insertBlob = db.prepare(`INSERT INTO capture_blobs (
            blob_id, content_type, encoding, size_bytes, sha256, data, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`);
			for (const blob of legacy.blobs) {
				const existing = selectBlob.get(blob.blobId);
				if (existing) {
					if (existing.encoding !== blob.encoding || Number(existing.sizeBytes) !== blob.sizeBytes || existing.sha256 !== blob.sha256 || !existing.data || !Buffer.from(existing.data).equals(blob.data)) throw new LegacyDebugProxyBlobConflictError(blob.blobId);
					continue;
				}
				insertBlob.run(blob.blobId, blob.contentType, blob.encoding, blob.sizeBytes, blob.sha256, blob.data, blob.createdAt);
			}
			const selectSession = db.prepare(`SELECT
            started_at AS startedAt,
            ended_at AS endedAt,
            mode,
            source_scope AS sourceScope,
            source_process AS sourceProcess,
            proxy_url AS proxyUrl
           FROM capture_sessions
           WHERE id = ?`);
			const insertSession = db.prepare(`INSERT INTO capture_sessions (
            id, started_at, ended_at, mode, source_scope, source_process, proxy_url
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`);
			for (const session of legacy.sessions) {
				const values = [
					session.id,
					normalizeSqliteInteger(session.started_at),
					normalizeSqliteInteger(session.ended_at),
					session.mode,
					session.source_scope,
					session.source_process,
					session.proxy_url
				];
				const existing = selectSession.get(session.id);
				if (existing) {
					const expected = {
						startedAt: values[1],
						endedAt: values[2],
						mode: values[3],
						sourceScope: values[4],
						sourceProcess: values[5],
						proxyUrl: values[6]
					};
					if (JSON.stringify(existing) !== JSON.stringify(expected)) throw new LegacyDebugProxySessionConflictError(session.id);
					continue;
				}
				insertSession.run(...values);
			}
			const existingEventCount = db.prepare(`SELECT COUNT(*) AS count
           FROM capture_events
           WHERE session_id IS ? AND ts IS ? AND source_scope IS ? AND source_process IS ?
             AND protocol IS ? AND direction IS ? AND kind IS ? AND flow_id IS ?
             AND method IS ? AND host IS ? AND path IS ? AND status IS ? AND close_code IS ?
             AND content_type IS ? AND headers_json IS ? AND data_text IS ? AND data_blob_id IS ?
             AND data_sha256 IS ? AND error_text IS ? AND meta_json IS ?
          `);
			const insertEvent = db.prepare(`INSERT INTO capture_events (
            session_id, ts, source_scope, source_process, protocol, direction, kind, flow_id,
            method, host, path, status, close_code, content_type, headers_json, data_text,
            data_blob_id, data_sha256, error_text, meta_json
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
			const existingCounts = /* @__PURE__ */ new Map();
			const seenCounts = /* @__PURE__ */ new Map();
			for (const event of legacy.events) {
				const values = eventValues(event);
				const key = eventKey(values);
				const seenCount = (seenCounts.get(key) ?? 0) + 1;
				seenCounts.set(key, seenCount);
				let existingCount = existingCounts.get(key);
				if (existingCount === void 0) {
					const row = existingEventCount.get(...values);
					existingCount = Number(row?.count ?? 0);
					existingCounts.set(key, existingCount);
				}
				if (seenCount > existingCount) insertEvent.run(...values);
			}
		}, { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		changes.push(`Migrated ${legacy.sessions.length} debug proxy capture ${legacy.sessions.length === 1 ? "session" : "sessions"}, ${legacy.events.length} ${legacy.events.length === 1 ? "event" : "events"}, and ${legacy.blobs.length} ${legacy.blobs.length === 1 ? "blob" : "blobs"} → shared SQLite state`);
	} catch (err) {
		const detail = err instanceof LegacyDebugProxyBlobConflictError ? `blob ${err.blobId} already exists with different data` : err instanceof LegacyDebugProxySessionConflictError ? `session ${err.sessionId} already exists with different data` : String(err);
		return {
			changes,
			warnings: [`Failed migrating debug proxy capture sidecar ${detected.sourcePath}: ${detail}`]
		};
	}
	archiveLegacyDebugProxySqlite({
		sourcePath: detected.sourcePath,
		changes,
		warnings
	});
	if (!fileExists(detected.sourcePath) && fileExists(`${detected.sourcePath}.migrated`)) {
		archiveLegacyDebugProxyBlobs({
			blobDir: detected.blobDir,
			changes,
			warnings
		});
		for (const blobDir of legacy.blobDirs) {
			if (path.resolve(blobDir) === path.resolve(detected.blobDir) || !dirExists(blobDir)) continue;
			warnings.push(`Left migrated debug proxy capture blobs in stored session directory: ${blobDir}`);
		}
	}
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.session-surfaces.ts
let cachedLegacySessionSurfaces = null;
function getLegacySessionSurfaces() {
	cachedLegacySessionSurfaces ??= [...listBundledChannelLegacySessionSurfaces()];
	return cachedLegacySessionSurfaces;
}
function isSurfaceGroupKey(key) {
	return key.includes(":group:") || key.includes(":channel:");
}
function isLegacyGroupKey(key) {
	const trimmed = key.trim();
	if (!trimmed) return false;
	const lower = normalizeLowercaseStringOrEmpty(trimmed);
	if (lower.startsWith("group:") || lower.startsWith("channel:")) return true;
	for (const surface of getLegacySessionSurfaces()) if (surface.isLegacyGroupSessionKey?.(trimmed)) return true;
	return false;
}
function resetLegacySessionSurfacesForTest() {
	cachedLegacySessionSurfaces = null;
}
//#endregion
//#region src/infra/state-migrations.session-store.ts
function isLegacyDefaultMainAliasKey(key, mainKey) {
	const lower = normalizeLowercaseStringOrEmpty(key.trim());
	const canonicalMainKey = normalizeMainKey(mainKey);
	return lower === `agent:main:main` || lower === `agent:main:${canonicalMainKey}`;
}
function resolveCanonicalAgentSessionOwner(key) {
	const parsed = parseAgentSessionKey(key);
	if (parsed === null || !isValidAgentId(parsed.agentId) || normalizeAgentId(parsed.agentId) !== parsed.agentId) return;
	return parsed.agentId;
}
function canonicalizeSessionKeyForAgent(params) {
	const raw = params.key.trim();
	if (!raw) return raw;
	const rawLower = normalizeLowercaseStringOrEmpty(raw);
	const legacyDefaultMainAlias = isLegacyDefaultMainAliasKey(rawLower, params.mainKey);
	const configuredAgentId = normalizeAgentId(params.agentId);
	const canonicalRowOwner = resolveCanonicalAgentSessionOwner(raw);
	const candidateOwner = params.preserveCanonicalAgentOwner ? canonicalRowOwner : void 0;
	const agentId = (candidateOwner === "main" && configuredAgentId !== "main" && legacyDefaultMainAlias ? void 0 : candidateOwner) ?? configuredAgentId;
	const normalized = normalizeSessionKeyPreservingOpaquePeerIds(raw);
	if (rawLower === "global" || rawLower === "unknown") return rawLower;
	if (params.preserveForeignMainAliases && legacyDefaultMainAlias) return params.key;
	const canonicalMain = canonicalizeMainSessionAlias({
		cfg: { session: {
			scope: params.scope,
			mainKey: params.mainKey
		} },
		agentId,
		sessionKey: normalized
	});
	if (params.scope === "global" && canonicalMain === "global") return canonicalMain;
	if (params.preserveAmbiguousKeys && (!canonicalRowOwner || legacyDefaultMainAlias)) return params.key;
	if (params.skipCrossAgentRemap) {
		const parsed = parseAgentSessionKey(raw);
		if (parsed && normalizeAgentId(parsed.agentId) !== agentId) return normalized;
		if (agentId !== "main" && (rawLower === "main" || rawLower === params.mainKey)) return rawLower;
	}
	if (canonicalMain !== normalized) return normalizeLowercaseStringOrEmpty(canonicalMain);
	const defaultPrefix = `agent:${LEGACY_IMPLICIT_AGENT_ID}:`;
	if (rawLower.startsWith(defaultPrefix) && agentId !== "main" && !params.skipCrossAgentRemap) {
		const rest = rawLower.slice(defaultPrefix.length);
		if (rest === "main" || rest === params.mainKey) {
			const remapped = `agent:${agentId}:${rest}`;
			return normalizeLowercaseStringOrEmpty(canonicalizeMainSessionAlias({
				cfg: { session: {
					scope: params.scope,
					mainKey: params.mainKey
				} },
				agentId,
				sessionKey: remapped
			}));
		}
	}
	if (rawLower.startsWith("agent:") && canonicalRowOwner) return normalized;
	if (rawLower.startsWith("subagent:")) return normalizeLowercaseStringOrEmpty(`agent:${agentId}:subagent:${raw.slice(9)}`);
	for (const surface of getLegacySessionSurfaces()) {
		const canonicalized = surface.canonicalizeLegacySessionKey?.({
			key: raw,
			agentId
		});
		const normalizedCanonicalized = normalizeSessionKeyPreservingOpaquePeerIds(canonicalized);
		if (normalizedCanonicalized) return normalizedCanonicalized;
	}
	if (rawLower.startsWith("group:") || rawLower.startsWith("channel:")) return normalizeLowercaseStringOrEmpty(`agent:${agentId}:unknown:${raw}`);
	if (isSurfaceGroupKey(raw)) return `agent:${agentId}:${normalized}`;
	return normalizeSessionKeyPreservingOpaquePeerIds(`agent:${agentId}:${raw}`);
}
function pickLatestLegacyDirectEntry(store) {
	let best = null;
	let bestUpdated = -1;
	for (const [key, entry] of Object.entries(store)) {
		if (!entry || typeof entry !== "object") continue;
		const normalized = key.trim();
		if (!normalized) continue;
		const normalizedLower = normalizeLowercaseStringOrEmpty(normalized);
		if (normalizedLower === "global") continue;
		if (normalizedLower.startsWith("agent:")) continue;
		if (normalizedLower.startsWith("subagent:")) continue;
		if (isLegacyGroupKey(normalized) || isSurfaceGroupKey(normalized)) continue;
		const updatedAt = typeof entry.updatedAt === "number" ? entry.updatedAt : 0;
		if (updatedAt > bestUpdated) {
			bestUpdated = updatedAt;
			best = entry;
		}
	}
	return best;
}
function normalizeSessionEntry(entry, sessionKey) {
	const shaped = normalizePersistedSessionEntryShape(entry, { sessionKey });
	if (!shaped) return null;
	const normalized = { ...shaped };
	if (typeof normalized.sessionId === "string") normalized.updatedAt = typeof normalized.updatedAt === "number" && Number.isFinite(normalized.updatedAt) ? normalized.updatedAt : Date.now();
	const rec = normalized;
	if (typeof rec.groupChannel !== "string" && typeof rec.room === "string") rec.groupChannel = rec.room;
	delete rec.room;
	return normalized;
}
function resolveUpdatedAt(entry) {
	return typeof entry.updatedAt === "number" && Number.isFinite(entry.updatedAt) ? entry.updatedAt : 0;
}
function mergeSessionEntry(params) {
	if (!params.existing) return params.incoming;
	const existingUpdated = resolveUpdatedAt(params.existing);
	const incomingUpdated = resolveUpdatedAt(params.incoming);
	if (incomingUpdated > existingUpdated) return params.incoming;
	if (incomingUpdated < existingUpdated) return params.existing;
	return params.preferIncomingOnTie ? params.incoming : params.existing;
}
function canonicalizeSessionStore(params) {
	const canonical = Object.create(null);
	const meta = /* @__PURE__ */ new Map();
	const legacyKeys = [];
	for (const [key, entry] of Object.entries(params.store)) {
		if (!entry || typeof entry !== "object") continue;
		const canonicalKey = canonicalizeSessionKeyForAgent({
			key,
			agentId: params.agentId,
			mainKey: params.mainKey,
			scope: params.scope,
			skipCrossAgentRemap: params.skipCrossAgentRemap,
			preserveCanonicalAgentOwner: params.preserveCanonicalAgentOwner,
			preserveAmbiguousKeys: params.preserveAmbiguousKeys,
			preserveForeignMainAliases: params.preserveForeignMainAliases
		});
		const isCanonical = canonicalKey === key;
		if (!isCanonical) legacyKeys.push(key);
		const existing = canonical[canonicalKey];
		if (!existing) {
			canonical[canonicalKey] = entry;
			meta.set(canonicalKey, {
				isCanonical,
				updatedAt: resolveUpdatedAt(entry)
			});
			continue;
		}
		const existingMeta = meta.get(canonicalKey);
		const incomingUpdated = resolveUpdatedAt(entry);
		const existingUpdated = existingMeta?.updatedAt ?? resolveUpdatedAt(existing);
		if (incomingUpdated > existingUpdated) {
			canonical[canonicalKey] = entry;
			meta.set(canonicalKey, {
				isCanonical,
				updatedAt: incomingUpdated
			});
			continue;
		}
		if (incomingUpdated < existingUpdated) continue;
		if (existingMeta?.isCanonical && !isCanonical) continue;
		if (!existingMeta?.isCanonical && isCanonical) {
			canonical[canonicalKey] = entry;
			meta.set(canonicalKey, {
				isCanonical,
				updatedAt: incomingUpdated
			});
			continue;
		}
	}
	return {
		store: canonical,
		legacyKeys
	};
}
function isAmbiguousSharedStoreKey(key, mainKey, scope) {
	const raw = key.trim();
	const lower = normalizeLowercaseStringOrEmpty(raw);
	if (!raw || lower === "global" || lower === "unknown") return false;
	if (scope === "global" && canonicalizeMainSessionAlias({
		cfg: { session: {
			scope,
			mainKey
		} },
		agentId: "main",
		sessionKey: lower
	}) === "global") return false;
	return !resolveCanonicalAgentSessionOwner(raw) || isLegacyDefaultMainAliasKey(lower, mainKey);
}
function aliasedSessionStoreMigrationWarning(params) {
	return `Deferred ${params.subject} ${params.count} ambiguous session key(s) in aliased store ${params.storePath}; remove filesystem aliases or configure one canonical session.store path, then rerun openclaw doctor --fix`;
}
function unresolvedSessionStoreIdentityWarning(subject, storePath) {
	return `Deferred ${subject} for ${storePath}; filesystem identity could not be established for every configured store path. Restore path access or configure one canonical session.store path, then rerun openclaw doctor --fix`;
}
function distinctSessionStoreAliasWarning(subject, storePath) {
	return `Deferred ${subject} in aliased store ${storePath}; atomic replacement cannot update distinct filesystem aliases as one operation. Remove filesystem aliases or configure one canonical session.store path, then rerun openclaw doctor --fix`;
}
function resolveStaleLegacySessionFile(params) {
	if (!params.entry || typeof params.entry !== "object" || Array.isArray(params.entry)) return;
	const entry = params.entry;
	const rawSessionFile = entry.sessionFile;
	if (typeof rawSessionFile !== "string") return;
	const legacySessionFile = path.isAbsolute(rawSessionFile) ? path.resolve(rawSessionFile) : path.resolve(params.legacyDir, rawSessionFile);
	const relative = path.relative(path.resolve(params.legacyDir), legacySessionFile);
	if (relative.startsWith("..") || path.isAbsolute(relative) || fileExists$1(legacySessionFile)) return;
	if (safeReadDir(path.dirname(params.legacyDir)).some((dirent) => dirent.isDirectory() && dirent.name.startsWith(`${path.basename(params.legacyDir)}.legacy-`) && fileExists$1(path.join(path.dirname(params.legacyDir), dirent.name, path.basename(legacySessionFile))))) return;
	const parsed = path.parse(path.basename(legacySessionFile));
	if (safeReadDir(params.targetDir).some((dirent) => dirent.isFile() && dirent.name.startsWith(`${parsed.name}.legacy-`) && dirent.name.endsWith(parsed.ext))) return;
	const targetSessionFile = path.join(params.targetDir, path.basename(legacySessionFile));
	if (!fileExists$1(targetSessionFile) || typeof entry.sessionId !== "string") return;
	const readFirstLine = () => {
		const fd = fs.openSync(targetSessionFile, "r");
		try {
			const buffer = Buffer.alloc(8192);
			const bytesRead = readFileWindowFullySync(fd, buffer, 0);
			if (bytesRead <= 0) return;
			const chunk = buffer.subarray(0, bytesRead).toString("utf8");
			const newline = chunk.indexOf("\n");
			return newline >= 0 ? chunk.slice(0, newline) : chunk;
		} finally {
			fs.closeSync(fd);
		}
	};
	try {
		const firstLine = readFirstLine();
		const header = firstLine ? JSON.parse(firstLine) : void 0;
		if (!header || typeof header !== "object" || Array.isArray(header)) return;
		if (header.type === "session") return header.id === entry.sessionId ? targetSessionFile : void 0;
		return (path.basename(entry.sessionId) === entry.sessionId ? `${entry.sessionId}.jsonl` : void 0) === path.basename(targetSessionFile) ? targetSessionFile : void 0;
	} catch {
		return;
	}
}
function sessionStoreMayNeedCanonicalization(params) {
	const storeAgentIds = new Set([...params.storeAgentIds].map((id) => normalizeAgentId(id)));
	const hasNonMainAgent = [...storeAgentIds].some((id) => id !== LEGACY_IMPLICIT_AGENT_ID);
	for (const key of Object.keys(params.store)) {
		const rawKey = key.trim();
		if (rawKey !== key) return true;
		if (!rawKey) continue;
		const lowerKey = normalizeLowercaseStringOrEmpty(rawKey);
		if (lowerKey !== rawKey) return true;
		if (lowerKey === "global" || lowerKey === "unknown") continue;
		if (params.preserveForeignMainAliases && isLegacyDefaultMainAliasKey(lowerKey, params.mainKey)) return true;
		if (lowerKey === "main" || lowerKey === params.mainKey) return true;
		if (lowerKey.startsWith("subagent:")) return true;
		if (lowerKey.startsWith("group:") || lowerKey.startsWith("channel:")) return true;
		if (!lowerKey.startsWith("agent:")) return true;
		const rowOwner = resolveCanonicalAgentSessionOwner(rawKey);
		if (!rowOwner) return true;
		const agentMainAlias = `agent:${rowOwner}:${DEFAULT_MAIN_KEY}`;
		const agentMainKey = `agent:${rowOwner}:${params.mainKey}`;
		if (lowerKey === agentMainAlias && (params.mainKey !== "main" || params.scope === "global")) return true;
		if (lowerKey === agentMainKey && params.scope === "global") return true;
		if (lowerKey === `agent:main:main` && (params.mainKey !== "main" || hasNonMainAgent || params.scope === "global")) return true;
		if (lowerKey === `agent:main:${params.mainKey}` && hasNonMainAgent && !storeAgentIds.has("main")) return true;
	}
	return false;
}
function listLegacySessionKeys(params) {
	const legacy = [];
	for (const key of Object.keys(params.store)) if (canonicalizeSessionKeyForAgent({
		key,
		agentId: params.agentId,
		mainKey: params.mainKey,
		scope: params.scope,
		skipCrossAgentRemap: params.preserveAmbiguousKeys,
		preserveCanonicalAgentOwner: params.preserveAmbiguousKeys,
		preserveAmbiguousKeys: params.preserveAmbiguousKeys,
		preserveForeignMainAliases: params.preserveForeignMainAliases
	}) !== key) legacy.push(key);
	return legacy;
}
function emptyDirOrMissing(dir) {
	if (!existsDir(dir)) return true;
	return safeReadDir(dir).length === 0;
}
function removeDirIfEmpty(dir) {
	if (!existsDir(dir)) return;
	if (!emptyDirOrMissing(dir)) return;
	try {
		fs.rmdirSync(dir);
	} catch {}
}
async function migrateOrphanedSessionKeys(params) {
	const changes = [];
	const warnings = [];
	const env = params.env ?? process.env;
	const stateDir = resolveStateDir(env);
	const mainKey = normalizeMainKey(params.cfg.session?.mainKey);
	const scope = params.cfg.session?.scope;
	const storeConfig = params.cfg.session?.store;
	const pluginAgentIds = params.additionalAgentIds ?? listPluginDoctorSessionStoreAgentIds({
		config: params.cfg,
		env,
		pluginIds: collectRelevantDoctorPluginIds(params.cfg)
	});
	const pluginAgentIdSet = new Set(pluginAgentIds.map((id) => normalizeAgentId(id)));
	const storeMap = /* @__PURE__ */ new Map();
	const storeAliasCandidates = /* @__PURE__ */ new Map();
	const addToStoreMap = (p, id) => {
		const storePath = [...storeMap.keys()].find((candidate) => sessionStorePathsMatch(candidate, p)) ?? p;
		const aliasCandidates = storeAliasCandidates.get(storePath) ?? /* @__PURE__ */ new Set([storePath]);
		aliasCandidates.add(p);
		storeAliasCandidates.set(storePath, aliasCandidates);
		const existing = storeMap.get(storePath);
		if (existing) existing.add(id);
		else storeMap.set(storePath, /* @__PURE__ */ new Set([id]));
	};
	for (const configuredAgentId of listConfiguredSessionStoreAgentIds(params.cfg)) {
		const id = normalizeAgentId(configuredAgentId);
		addToStoreMap(storeConfig ? resolveStorePathFromTemplate(storeConfig, id, env) : path.join(stateDir, "agents", id, "sessions", "sessions.json"), id);
	}
	for (const pluginAgentId of pluginAgentIds) {
		const id = normalizeAgentId(pluginAgentId);
		addToStoreMap(storeConfig ? resolveStorePathFromTemplate(storeConfig, id, env) : path.join(stateDir, "agents", id, "sessions", "sessions.json"), id);
	}
	const agentsDir = path.join(stateDir, "agents");
	if (existsDir(agentsDir)) {
		for (const dirEntry of safeReadDir(agentsDir)) if (dirEntry.isDirectory()) {
			const diskAgentId = normalizeAgentId(dirEntry.name);
			if (diskAgentId) addToStoreMap(path.join(agentsDir, diskAgentId, "sessions", "sessions.json"), diskAgentId);
		}
	}
	for (const [mappedStorePath, storeAgentIds] of storeMap) {
		const storePaths = storeAliasCandidates.get(mappedStorePath) ?? /* @__PURE__ */ new Set([mappedStorePath]);
		const storePath = [...storePaths].find((candidate) => fileExists$1(candidate));
		if (!storePath) continue;
		const pluginForeignMainAliasRisk = [...storeAgentIds].some((id) => pluginAgentIdSet.has(id) && id !== "main");
		let parsed;
		try {
			parsed = parseSessionStoreJson5(fs.readFileSync(storePath, "utf-8"));
		} catch (err) {
			warnings.push(`Could not read ${storePath}: ${String(err)}`);
			continue;
		}
		if (!parsed.ok || !sessionStoreMayNeedCanonicalization({
			store: parsed.store,
			storeAgentIds,
			mainKey,
			scope,
			preserveForeignMainAliases: pluginForeignMainAliasRisk
		})) continue;
		let working = parsed.store;
		let totalLegacy = 0;
		const storeAliases = resolveSessionStoreAliasPlan(storePath, storePaths);
		const hasDistinctAliases = storeAliases.hasDistinctAliases;
		const preserveAmbiguousKeys = storeAgentIds.size > 1;
		const preservedAmbiguousKeyCount = Object.keys(working).filter((key) => preserveAmbiguousKeys && isAmbiguousSharedStoreKey(key, mainKey, scope) || pluginForeignMainAliasRisk && isLegacyDefaultMainAliasKey(key, mainKey)).length;
		if (storeAliases.hasUnresolvedIdentity) {
			warnings.push(unresolvedSessionStoreIdentityWarning("session key migration", storePath));
			continue;
		}
		if (hasDistinctAliases && preservedAmbiguousKeyCount > 0) {
			warnings.push(aliasedSessionStoreMigrationWarning({
				subject: "migration of",
				count: preservedAmbiguousKeyCount,
				storePath
			}));
			continue;
		}
		if (storeAliases.hasFinalSymlink) {
			warnings.push(`Deferred session key migration in final-component symlink store ${storePath}; configure one canonical session.store path, then rerun openclaw doctor --fix`);
			continue;
		}
		if (hasDistinctAliases) {
			warnings.push(distinctSessionStoreAliasWarning("session key migration", storePath));
			continue;
		}
		for (const storeAgentId of storeAgentIds) {
			const { store: canonicalized, legacyKeys } = canonicalizeSessionStore({
				store: working,
				agentId: storeAgentId,
				mainKey,
				scope,
				skipCrossAgentRemap: preserveAmbiguousKeys,
				preserveCanonicalAgentOwner: true,
				preserveAmbiguousKeys,
				preserveForeignMainAliases: pluginForeignMainAliasRisk
			});
			working = canonicalized;
			totalLegacy += legacyKeys.length;
		}
		if (preservedAmbiguousKeyCount > 0) warnings.push(`Preserved ${preservedAmbiguousKeyCount} ambiguous session key(s) in potentially shared store ${storePath}`);
		if (totalLegacy === 0) continue;
		const normalized = Object.create(null);
		for (const [key, entry] of Object.entries(working)) {
			const ne = normalizeSessionEntry(entry, key);
			if (ne) normalized[key] = ne;
		}
		try {
			await saveSessionStoreStrict(storePath, normalized);
			changes.push(`Canonicalized ${totalLegacy} orphaned session key(s) in ${storePath}`);
		} catch (err) {
			warnings.push(`Failed to write canonicalized store ${storePath}: ${String(err)}`);
		}
	}
	return {
		changes,
		warnings
	};
}
async function migrateLegacyAcpSessionMetadata(params) {
	const changes = [];
	const warnings = [];
	const env = params.env ?? process.env;
	const now = params.now ?? (() => Date.now());
	const stateDir = resolveStateDir(env);
	const storeConfig = params.cfg.session?.store;
	const pluginAgentIds = params.pluginSessionStoreAgentIds ?? listPluginDoctorSessionStoreAgentIds({
		config: params.cfg,
		env,
		pluginIds: collectRelevantDoctorPluginIds(params.cfg)
	});
	const normalizedPluginAgentIds = new Set(pluginAgentIds.map((id) => normalizeAgentId(id)));
	const declaredAgentIds = /* @__PURE__ */ new Set([...listConfiguredSessionStoreAgentIds(params.cfg).map((id) => normalizeAgentId(id)), ...normalizedPluginAgentIds]);
	const declaredTargets = [...declaredAgentIds].map((agentId) => ({
		agentId,
		storePath: storeConfig ? resolveStorePathFromTemplate(storeConfig, agentId, env) : path.join(stateDir, "agents", agentId, "sessions", "sessions.json")
	}));
	const pluginTargets = declaredTargets.filter(({ agentId }) => agentId !== "main" && normalizedPluginAgentIds.has(agentId));
	const configuredAgents = listAgentEntries(params.cfg);
	const configuredAgentIds = new Set(configuredAgents.flatMap((entry) => entry?.id ? [normalizeAgentId(entry.id)] : []));
	const targets = resolveLegacyAcpMetadataSessionStoreTargets([...declaredAgentIds].some((agentId) => !configuredAgentIds.has(agentId)) ? {
		...params.cfg,
		agents: {
			...params.cfg.agents,
			list: [...configuredAgents, ...[...declaredAgentIds].filter((agentId) => !configuredAgentIds.has(agentId)).map((id) => ({ id }))]
		}
	} : params.cfg, env);
	const mainKey = normalizeMainKey(params.cfg.session?.mainKey);
	const scope = params.cfg.session?.scope;
	const storeGroups = [];
	for (const target of targets) {
		if (!fileExists$1(target.storePath)) continue;
		const group = storeGroups.find(({ target: existing }) => sessionStorePathsMatch(existing.storePath, target.storePath));
		const matchingDeclaredTargets = declaredTargets.filter((declaredTarget) => sessionStorePathsMatch(target.storePath, declaredTarget.storePath));
		if (group) {
			group.agentIds.add(normalizeAgentId(target.agentId));
			group.aliasCandidates.add(target.storePath);
			for (const declaredTarget of matchingDeclaredTargets) {
				group.agentIds.add(declaredTarget.agentId);
				group.aliasCandidates.add(declaredTarget.storePath);
			}
			continue;
		}
		storeGroups.push({
			target,
			agentIds: /* @__PURE__ */ new Set([normalizeAgentId(target.agentId), ...matchingDeclaredTargets.map((declaredTarget) => declaredTarget.agentId)]),
			aliasCandidates: /* @__PURE__ */ new Set([target.storePath, ...matchingDeclaredTargets.map((declaredTarget) => declaredTarget.storePath)])
		});
	}
	for (const { target, agentIds, aliasCandidates } of storeGroups) {
		const storePath = target.storePath;
		const storeAliases = resolveSessionStoreAliasPlan(storePath, aliasCandidates);
		const pluginForeignMainAliasRisk = pluginTargets.some((pluginTarget) => sessionStorePathsMatch(storePath, pluginTarget.storePath));
		let parsed;
		try {
			parsed = readSessionStoreJson5(storePath);
		} catch (err) {
			warnings.push(`Could not read ${storePath}: ${String(err)}`);
			continue;
		}
		if (!parsed.ok) continue;
		const ambiguousKeyCount = Object.keys(parsed.store).filter((key) => isAmbiguousSharedStoreKey(key, mainKey, scope) || pluginForeignMainAliasRisk && isLegacyDefaultMainAliasKey(key, mainKey)).length;
		const hasLegacyAcpMetadata = Object.entries(parsed.store).some(([sessionKey, entry]) => normalizeSessionEntry(entry, sessionKey)?.acp !== void 0);
		if (hasLegacyAcpMetadata && storeAliases.hasUnresolvedIdentity) {
			warnings.push(unresolvedSessionStoreIdentityWarning("ACP metadata migration", storePath));
			continue;
		}
		if (hasLegacyAcpMetadata && storeAliases.hasFinalSymlink) {
			warnings.push(`Deferred ACP metadata migration in final-component symlink store ${storePath}; configure one canonical session.store path, then rerun openclaw doctor --fix`);
			continue;
		}
		if (hasLegacyAcpMetadata && storeAliases.hasDistinctAliases) {
			warnings.push(ambiguousKeyCount > 0 ? aliasedSessionStoreMigrationWarning({
				subject: "ACP metadata migration for",
				count: ambiguousKeyCount,
				storePath
			}) : distinctSessionStoreAliasWarning("ACP metadata migration", storePath));
			continue;
		}
		const normalized = Object.create(null);
		let migrated = 0;
		let preserved = 0;
		for (const [sessionKey, entry] of Object.entries(parsed.store)) {
			const normalizedEntry = normalizeSessionEntry(entry, sessionKey);
			if (!normalizedEntry) continue;
			if (normalizedEntry.acp) {
				const ambiguousSharedStoreKey = isAmbiguousSharedStoreKey(sessionKey, mainKey, scope);
				const ambiguousMultiOwnerKey = agentIds.size > 1 && ambiguousSharedStoreKey;
				const foreignMainAlias = pluginForeignMainAliasRisk && isLegacyDefaultMainAliasKey(sessionKey, mainKey);
				if (ambiguousMultiOwnerKey || foreignMainAlias) {
					preserved++;
					normalized[sessionKey] = normalizedEntry;
					continue;
				}
				writeAcpSessionMetaForMigration({
					sessionKey: canonicalizeSessionKeyForAgent({
						key: sessionKey,
						agentId: resolveCanonicalAgentSessionOwner(sessionKey) ?? target.agentId,
						mainKey,
						scope,
						skipCrossAgentRemap: true
					}),
					sessionId: normalizedEntry.sessionId,
					lifecycleRevision: normalizedEntry.lifecycleRevision,
					meta: normalizedEntry.acp,
					env,
					now
				});
				delete normalizedEntry.acp;
				migrated++;
			}
			normalized[sessionKey] = normalizedEntry;
		}
		if (preserved > 0) warnings.push(`Preserved ACP metadata for ${preserved} ambiguous session key(s) in potentially shared store ${storePath}`);
		if (migrated === 0) continue;
		try {
			await saveSessionStoreStrict(storePath, normalized);
			changes.push(`Migrated ${migrated} ACP session metadata ${migrated === 1 ? "row" : "rows"} → shared SQLite state`);
		} catch (err) {
			warnings.push(`Failed to write ACP metadata migration source ${storePath}: ${String(err)}`);
		}
	}
	return {
		changes,
		warnings
	};
}
function resolveLegacyAcpMetadataSessionStoreTargets(cfg, env) {
	const stateDir = resolveStateDir(env);
	const agentsDirs = /* @__PURE__ */ new Set([path.join(stateDir, "agents")]);
	const targets = /* @__PURE__ */ new Map();
	const addTarget = (agentId, storePath) => {
		if (!isManagedLegacySessionStorePathSafe(storePath)) return;
		const agentsDir = resolveAgentsDirFromSessionStorePath(storePath);
		if (agentsDir) agentsDirs.add(agentsDir);
		if (!targets.has(storePath)) targets.set(storePath, {
			agentId,
			storePath
		});
	};
	for (const target of resolveAllAgentSessionStoreTargetsSync(cfg, { env })) addTarget(target.agentId, target.storePath);
	for (const target of resolveSessionStoreTargets(cfg, { allAgents: true }, { env })) addTarget(target.agentId, target.storePath);
	for (const agentsDir of agentsDirs) {
		if (!existsDir(agentsDir)) continue;
		for (const entry of safeReadDir(agentsDir)) {
			if (!entry.isDirectory()) continue;
			const agentId = normalizeAgentId(entry.name);
			const normalizedDirName = normalizeLowercaseStringOrEmpty(entry.name);
			if (agentId === "main" && normalizedDirName !== agentId) continue;
			addTarget(agentId, path.join(agentsDir, entry.name, "sessions", "sessions.json"));
		}
	}
	return [...targets.values()];
}
function isManagedLegacySessionStorePathSafe(storePath) {
	const resolvedStorePath = path.resolve(storePath);
	const agentsDir = resolveAgentsDirFromSessionStorePath(resolvedStorePath);
	if (!agentsDir) return true;
	if (!fileExists$1(resolvedStorePath)) return true;
	try {
		const stat = fs.lstatSync(resolvedStorePath);
		if (stat.isSymbolicLink() || !stat.isFile()) return false;
		const resolvedAgentsDir = path.resolve(agentsDir);
		const realStorePath = fs.realpathSync.native(resolvedStorePath);
		return isWithinDir(fs.realpathSync.native(resolvedAgentsDir), realStorePath);
	} catch {
		return false;
	}
}
function resolveStorePathFromTemplate(template, agentId, env) {
	const expand = (s) => s.startsWith("~") ? expandHomePrefix(s, {
		env: env ?? process.env,
		homedir: os.homedir
	}) : s;
	if (template.includes("{agentId}")) return path.resolve(expand(template.replaceAll("{agentId}", agentId)));
	return path.resolve(expand(template));
}
function resolveSessionStorePathRelationship(left, right) {
	if (left === right) return "same";
	try {
		return sameFileIdentity(fs.statSync(left, { bigint: true }), fs.statSync(right, { bigint: true })) ? "same" : "different";
	} catch (err) {
		const code = err.code;
		if (code !== "ENOENT" && code !== "ENOTDIR") return "unknown";
		const resolvedLeft = resolvePathThroughExistingParents(left);
		const resolvedRight = resolvePathThroughExistingParents(right);
		if (resolvedLeft === void 0 || resolvedRight === void 0) return "unknown";
		return resolvedLeft === resolvedRight ? "same" : "different";
	}
}
function sessionStorePathsMatch(left, right) {
	return resolveSessionStorePathRelationship(left, right) !== "different";
}
function resolvePathThroughExistingParents(filePath) {
	const resolvedPath = path.resolve(filePath);
	const suffix = [path.basename(resolvedPath)];
	let parentPath = path.dirname(resolvedPath);
	while (true) try {
		return path.join(fs.realpathSync.native(parentPath), ...suffix);
	} catch (err) {
		const code = err.code;
		if (code !== "ENOENT" && code !== "ENOTDIR") return;
		const nextParent = path.dirname(parentPath);
		if (nextParent === parentPath) return;
		suffix.unshift(path.basename(parentPath));
		parentPath = nextParent;
	}
}
function sessionStorePathIsFinalSymlink(storePath) {
	try {
		return fs.lstatSync(storePath).isSymbolicLink();
	} catch {
		return false;
	}
}
function sessionStorePathsHaveDistinctEntries(left, right) {
	if (left === right) return false;
	try {
		if (fs.lstatSync(left).isSymbolicLink() || fs.lstatSync(right).isSymbolicLink()) return true;
		return fs.realpathSync.native(left) !== fs.realpathSync.native(right);
	} catch (err) {
		const code = err.code;
		if (code !== "ENOENT" && code !== "ENOTDIR") return true;
		const resolvedLeft = resolvePathThroughExistingParents(left);
		const resolvedRight = resolvePathThroughExistingParents(right);
		return resolvedLeft === void 0 || resolvedLeft !== resolvedRight;
	}
}
function resolveSessionStoreAliasPlan(storePath, candidatePaths) {
	let hasDistinctEntries = false;
	let hasFinalSymlink = sessionStorePathIsFinalSymlink(storePath);
	let hasUnresolvedIdentity = false;
	for (const candidatePath of candidatePaths) {
		const relationship = resolveSessionStorePathRelationship(storePath, candidatePath);
		if (relationship === "different") continue;
		if (relationship === "unknown") {
			hasUnresolvedIdentity = true;
			continue;
		}
		hasFinalSymlink ||= sessionStorePathIsFinalSymlink(candidatePath);
		if (sessionStorePathsHaveDistinctEntries(storePath, candidatePath)) hasDistinctEntries = true;
	}
	return {
		hasDistinctAliases: hasFinalSymlink || hasDistinctEntries || hasUnresolvedIdentity,
		hasFinalSymlink,
		hasUnresolvedIdentity
	};
}
function mergeSessionStoreAliasPlans(left, right) {
	if (!left) return right;
	return {
		hasDistinctAliases: left.hasDistinctAliases || right.hasDistinctAliases,
		hasFinalSymlink: left.hasFinalSymlink || right.hasFinalSymlink,
		hasUnresolvedIdentity: left.hasUnresolvedIdentity || right.hasUnresolvedIdentity
	};
}
async function saveSessionStoreStrict(storePath, store) {
	await saveLegacySessionStore(storePath, store, {
		requireWriteSuccess: true,
		skipMaintenance: true
	});
}
function resolveSessionStoreOwnership(params) {
	const targetStorePath = path.join(params.stateDir, "agents", params.targetAgentId, "sessions", "sessions.json");
	const configuredStore = params.cfg.session?.store;
	const resolveAgentStorePath = (agentId) => configuredStore ? resolveStorePathFromTemplate(configuredStore, agentId, params.env) : path.join(params.stateDir, "agents", agentId, "sessions", "sessions.json");
	const preserveForeignMainAliases = params.pluginSessionStoreAgentIds.some((pluginAgentId) => {
		const id = normalizeAgentId(pluginAgentId);
		if (id === "main") return false;
		return sessionStorePathsMatch(resolveAgentStorePath(id), targetStorePath);
	});
	const configuredOwnerStorePaths = [.../* @__PURE__ */ new Set([...listConfiguredSessionStoreAgentIds(params.cfg).map((id) => normalizeAgentId(id)), ...params.pluginSessionStoreAgentIds.map((id) => normalizeAgentId(id))])].map(resolveAgentStorePath);
	const preserveAmbiguousKeys = configuredOwnerStorePaths.filter((storePath) => sessionStorePathsMatch(storePath, targetStorePath)).length > 1;
	const candidateStorePaths = [...configuredOwnerStorePaths];
	const agentsDir = path.join(params.stateDir, "agents");
	for (const entry of safeReadDir(agentsDir)) if (entry.isDirectory()) candidateStorePaths.push(path.join(agentsDir, entry.name, "sessions", "sessions.json"));
	return {
		preserveAmbiguousKeys,
		preserveForeignMainAliases,
		targetStoreAliases: resolveSessionStoreAliasPlan(targetStorePath, candidateStorePaths)
	};
}
//#endregion
//#region src/infra/state-migrations.legacy-sessions.ts
function normalizeMergedSessionStore(merged, protectedKeys) {
	const store = Object.create(null);
	let rejectedProtectedKeyCount = 0;
	for (const [key, entry] of Object.entries(merged)) {
		const normalizedEntry = normalizeSessionEntry(entry, key);
		if (!normalizedEntry) {
			if (protectedKeys.has(key)) rejectedProtectedKeyCount++;
			continue;
		}
		store[key] = normalizedEntry;
	}
	return {
		store,
		rejectedProtectedKeyCount
	};
}
async function migrateLegacySessions(detected, now, options = {}) {
	const changes = [];
	const warnings = [];
	if (!detected.sessions.hasLegacy) return {
		changes,
		warnings
	};
	ensureMigrationDir(detected.sessions.targetDir);
	const legacyParsed = fileExists$1(detected.sessions.legacyStorePath) ? readSessionStoreJson5(detected.sessions.legacyStorePath) : {
		store: {},
		ok: true
	};
	const targetParsed = fileExists$1(detected.sessions.targetStorePath) ? readSessionStoreJson5(detected.sessions.targetStorePath) : {
		store: {},
		ok: true
	};
	const legacyStore = legacyParsed.store;
	const targetStore = targetParsed.store;
	if (detected.sessions.targetStoreAliases.hasUnresolvedIdentity) {
		warnings.push(unresolvedSessionStoreIdentityWarning("legacy session migration", detected.sessions.targetStorePath));
		return {
			changes,
			warnings
		};
	}
	if (detected.sessions.targetStoreAliases.hasFinalSymlink) {
		warnings.push(`Deferred legacy session migration in final-component symlink store ${detected.sessions.targetStorePath}; configure one canonical session.store path, then rerun openclaw doctor --fix`);
		return {
			changes,
			warnings
		};
	}
	const ambiguousAliasedKeys = new Set([...Object.keys(targetStore), ...Object.keys(legacyStore)].filter((key) => isAmbiguousSharedStoreKey(key, detected.targetMainKey, detected.targetScope) || detected.sessions.preserveForeignMainAliases && isLegacyDefaultMainAliasKey(key, detected.targetMainKey)));
	if (detected.sessions.targetStoreAliases.hasDistinctAliases) {
		warnings.push(ambiguousAliasedKeys.size > 0 ? aliasedSessionStoreMigrationWarning({
			subject: "migration of",
			count: ambiguousAliasedKeys.size,
			storePath: detected.sessions.targetStorePath
		}) : distinctSessionStoreAliasWarning("legacy session migration", detected.sessions.targetStorePath));
		return {
			changes,
			warnings
		};
	}
	const canonicalizedTarget = canonicalizeSessionStore({
		store: targetStore,
		agentId: detected.targetAgentId,
		mainKey: detected.targetMainKey,
		scope: detected.targetScope,
		skipCrossAgentRemap: detected.sessions.preserveAmbiguousKeys,
		preserveCanonicalAgentOwner: true,
		preserveAmbiguousKeys: detected.sessions.preserveAmbiguousKeys,
		preserveForeignMainAliases: detected.sessions.preserveForeignMainAliases
	});
	const canonicalizedLegacy = canonicalizeSessionStore({
		store: legacyStore,
		agentId: detected.targetAgentId,
		mainKey: detected.targetMainKey,
		scope: detected.targetScope,
		preserveCanonicalAgentOwner: true,
		preserveForeignMainAliases: detected.sessions.preserveForeignMainAliases
	});
	const targetKeys = new Set(Object.keys(canonicalizedTarget.store));
	const preservedLegacyForeignMainAliasCount = detected.sessions.preserveForeignMainAliases ? Object.keys(legacyStore).filter((key) => isLegacyDefaultMainAliasKey(key, detected.targetMainKey)).length : 0;
	let repairedStaleSessionFiles = false;
	for (const entry of Object.values(canonicalizedTarget.store)) {
		const targetSessionFile = resolveStaleLegacySessionFile({
			entry,
			legacyDir: detected.sessions.legacyDir,
			targetDir: detected.sessions.targetDir
		});
		if (targetSessionFile) {
			entry.sessionFile = targetSessionFile;
			repairedStaleSessionFiles = true;
		}
	}
	const merged = Object.create(null);
	for (const [key, entry] of Object.entries(canonicalizedTarget.store)) merged[key] = entry;
	for (const [key, entry] of Object.entries(canonicalizedLegacy.store)) merged[key] = mergeSessionEntry({
		existing: merged[key],
		incoming: entry,
		preferIncomingOnTie: false
	});
	const mainKey = buildAgentMainSessionKey({
		agentId: detected.targetAgentId,
		mainKey: detected.targetMainKey
	});
	let migratedDirectChatKey;
	if (!merged[mainKey]) {
		const latest = pickLatestLegacyDirectEntry(legacyStore);
		if (latest?.sessionId) {
			merged[mainKey] = latest;
			migratedDirectChatKey = mainKey;
		}
	}
	if (!legacyParsed.ok) warnings.push(`Legacy sessions store unreadable; left in place at ${detected.sessions.legacyStorePath}`);
	let targetReadable = !fileExists$1(detected.sessions.targetStorePath) || targetParsed.ok;
	if (!targetReadable) if (options.recoverCorruptTargetStore) {
		const archivedTargetPath = `${detected.sessions.targetStorePath}.corrupt-${now()}`;
		try {
			fs.renameSync(detected.sessions.targetStorePath, archivedTargetPath);
			changes.push(`Archived corrupt target sessions store → ${archivedTargetPath}`);
			targetReadable = true;
		} catch (err) {
			warnings.push(`Target sessions store unreadable; failed to archive ${detected.sessions.targetStorePath}: ${String(err)}`);
		}
	} else warnings.push(`Target sessions store unreadable; left untouched to avoid overwriting at ${detected.sessions.targetStorePath}. Run openclaw doctor --fix to archive it and retry the legacy merge.`);
	if (targetReadable && (legacyParsed.ok || targetParsed.ok) && (Object.keys(legacyStore).length > 0 || Object.keys(targetStore).length > 0)) {
		const normalized = normalizeMergedSessionStore(merged, targetKeys);
		if (normalized.rejectedProtectedKeyCount > 0) {
			warnings.push(`Refused legacy session migration because normalization rejected ${normalized.rejectedProtectedKeyCount} existing target session ${normalized.rejectedProtectedKeyCount === 1 ? "key" : "keys"}; left ${detected.sessions.targetStorePath} and ${detected.sessions.legacyStorePath} in place. Repair the conflicting rows, then rerun openclaw doctor --fix.`);
			return {
				changes,
				warnings
			};
		}
		await saveSessionStoreStrict(detected.sessions.targetStorePath, normalized.store);
		if (migratedDirectChatKey) changes.push(`Migrated latest direct-chat session → ${migratedDirectChatKey}`);
		changes.push(`Merged sessions store → ${detected.sessions.targetStorePath}`);
		if (preservedLegacyForeignMainAliasCount > 0) warnings.push(`Preserved ${preservedLegacyForeignMainAliasCount} ambiguous session key(s) while importing legacy sessions into ${detected.sessions.targetStorePath}`);
		if (canonicalizedTarget.legacyKeys.length > 0) changes.push(`Canonicalized ${canonicalizedTarget.legacyKeys.length} legacy session key(s)`);
		if (repairedStaleSessionFiles) changes.push("Repaired migrated session transcript paths");
	}
	if (!targetReadable) return {
		changes,
		warnings
	};
	const entries = safeReadDir(detected.sessions.legacyDir);
	for (const entry of entries) {
		if (!entry.isFile()) continue;
		if (entry.name === "sessions.json") continue;
		const from = path.join(detected.sessions.legacyDir, entry.name);
		let to = path.join(detected.sessions.targetDir, entry.name);
		if (fileExists$1(to)) {
			const parsed = path.parse(entry.name);
			to = path.join(detected.sessions.targetDir, `${parsed.name}.legacy-${now()}${parsed.ext}`);
		}
		try {
			fs.renameSync(from, to);
			changes.push(`Moved ${entry.name} → agents/${detected.targetAgentId}/sessions`);
		} catch (err) {
			warnings.push(`Failed moving ${from}: ${String(err)}`);
		}
	}
	if (legacyParsed.ok && targetReadable) try {
		if (fileExists$1(detected.sessions.legacyStorePath)) fs.rmSync(detected.sessions.legacyStorePath, { force: true });
	} catch {}
	removeDirIfEmpty(detected.sessions.legacyDir);
	if (safeReadDir(detected.sessions.legacyDir).filter((e) => e.isFile()).length > 0) {
		const backupDir = `${detected.sessions.legacyDir}.legacy-${now()}`;
		try {
			fs.renameSync(detected.sessions.legacyDir, backupDir);
			warnings.push(`Left legacy sessions at ${backupDir}`);
		} catch {}
	}
	return {
		changes,
		warnings
	};
}
async function migrateLegacyAgentDir(detected, now) {
	const changes = [];
	const warnings = [];
	if (!detected.agentDir.hasLegacy) return {
		changes,
		warnings
	};
	ensureMigrationDir(detected.agentDir.targetDir);
	const entries = safeReadDir(detected.agentDir.legacyDir);
	for (const entry of entries) {
		const from = path.join(detected.agentDir.legacyDir, entry.name);
		const to = path.join(detected.agentDir.targetDir, entry.name);
		if (fs.existsSync(to)) continue;
		try {
			fs.renameSync(from, to);
			changes.push(`Moved agent file ${entry.name} → agents/${detected.targetAgentId}/agent`);
		} catch (err) {
			warnings.push(`Failed moving ${from}: ${String(err)}`);
		}
	}
	removeDirIfEmpty(detected.agentDir.legacyDir);
	if (!emptyDirOrMissing(detected.agentDir.legacyDir)) {
		const backupDir = path.join(detected.stateDir, "agents", detected.targetAgentId, `agent.legacy-${now()}`);
		try {
			fs.renameSync(detected.agentDir.legacyDir, backupDir);
			warnings.push(`Left legacy agent dir at ${backupDir}`);
		} catch (err) {
			warnings.push(`Failed relocating legacy agent dir: ${String(err)}`);
		}
	}
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.managed-outgoing-images.ts
const LEGACY_RECORD_MAX_BYTES = 1024 * 1024;
const DEFAULT_TRANSIENT_TTL_MS = 900 * 1e3;
const ATTACHMENT_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DOCTOR_CLAIM_MARKER = ".json.doctor-importing-";
const DOCTOR_CLAIM_SUFFIX_RE = /^\d+-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RECORD_KEYS = /* @__PURE__ */ new Set([
	"attachmentId",
	"sessionKey",
	"agentId",
	"messageId",
	"createdAt",
	"updatedAt",
	"retentionClass",
	"alt",
	"original"
]);
const ORIGINAL_KEYS = /* @__PURE__ */ new Set([
	"path",
	"contentType",
	"width",
	"height",
	"sizeBytes",
	"filename"
]);
function resolveLegacyManagedOutgoingImageRecordsDir(stateDir) {
	return path.join(stateDir, "media", "outgoing", "records");
}
function sourceNameFromDoctorClaim(name) {
	const markerIndex = name.indexOf(DOCTOR_CLAIM_MARKER);
	if (markerIndex < 0) return null;
	const attachmentId = name.slice(0, markerIndex);
	const suffix = name.slice(markerIndex + 23);
	return ATTACHMENT_ID_RE.test(attachmentId) && DOCTOR_CLAIM_SUFFIX_RE.test(suffix) ? `${attachmentId}.json` : null;
}
function isLegacyManagedImageSourceName(name) {
	return name.endsWith(".json") || sourceNameFromDoctorClaim(name) !== null;
}
function detectLegacyManagedOutgoingImages(params) {
	const sourceDir = resolveLegacyManagedOutgoingImageRecordsDir(params.stateDir);
	let hasLegacy = false;
	if (params.doctorOnlyStateMigrations === true) try {
		hasLegacy = fs.readdirSync(sourceDir).some(isLegacyManagedImageSourceName);
	} catch {
		hasLegacy = false;
	}
	return {
		sourceDir,
		hasLegacy
	};
}
function recoverInterruptedDoctorClaims(sourceDir) {
	for (const claimName of fs.readdirSync(sourceDir).toSorted()) {
		const sourceName = sourceNameFromDoctorClaim(claimName);
		if (!sourceName) continue;
		const claimPath = path.join(sourceDir, claimName);
		const sourcePath = path.join(sourceDir, sourceName);
		const claimSnapshot = readLegacySourceSnapshot$2(claimPath);
		if (!fs.existsSync(sourcePath)) {
			fs.renameSync(claimPath, sourcePath);
			continue;
		}
		const sourceSnapshot = readLegacySourceSnapshot$2(sourcePath);
		if (sourceSnapshot.size !== claimSnapshot.size || sourceSnapshot.sha256 !== claimSnapshot.sha256) throw new Error(`interrupted managed image claim conflicts with ${sourcePath}`);
		fs.unlinkSync(claimPath);
	}
}
function readLegacySourceSnapshot$2(sourcePath) {
	return readLegacyMigrationSourceSnapshotSync({
		sourcePath,
		label: "managed image",
		maxBytes: LEGACY_RECORD_MAX_BYTES
	});
}
function optionalNonEmptyString(value) {
	return typeof value === "string" && value.trim() ? value : void 0;
}
function nullableNonNegativeInteger(value) {
	if (value === null) return null;
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : void 0;
}
function parseLegacyManagedImageRecord(params) {
	const raw = JSON.parse(params.snapshot.raw);
	if (!isRecord(raw) || !isRecord(raw.original)) throw new Error("legacy managed image record must be an object");
	const unexpectedRecordKey = Object.keys(raw).find((key) => !RECORD_KEYS.has(key));
	const unexpectedOriginalKey = Object.keys(raw.original).find((key) => !ORIGINAL_KEYS.has(key));
	if (unexpectedRecordKey || unexpectedOriginalKey) throw new Error(`legacy managed image record has unexpected field ${unexpectedRecordKey ?? `original.${unexpectedOriginalKey}`}`);
	const attachmentId = optionalNonEmptyString(raw.attachmentId);
	const sessionKey = optionalNonEmptyString(raw.sessionKey);
	const agentId = optionalNonEmptyString(raw.agentId);
	const messageId = raw.messageId === null ? null : optionalNonEmptyString(raw.messageId);
	const createdAt = optionalNonEmptyString(raw.createdAt);
	const updatedAt = optionalNonEmptyString(raw.updatedAt);
	const alt = typeof raw.alt === "string" ? raw.alt : void 0;
	const retentionClass = raw.retentionClass;
	const originalPath = optionalNonEmptyString(raw.original.path);
	const contentType = optionalNonEmptyString(raw.original.contentType);
	const width = nullableNonNegativeInteger(raw.original.width);
	const height = nullableNonNegativeInteger(raw.original.height);
	const sizeBytes = nullableNonNegativeInteger(raw.original.sizeBytes);
	const filename = raw.original.filename === null ? null : optionalNonEmptyString(raw.original.filename);
	if (!attachmentId || !ATTACHMENT_ID_RE.test(attachmentId) || path.basename(params.snapshot.sourcePath) !== `${attachmentId}.json` || !sessionKey || raw.agentId !== void 0 && !agentId || raw.messageId !== null && messageId === void 0 || !createdAt || !Number.isFinite(Date.parse(createdAt)) || raw.updatedAt !== void 0 && (!updatedAt || !Number.isFinite(Date.parse(updatedAt))) || retentionClass !== void 0 && retentionClass !== "transient" && retentionClass !== "history" || alt === void 0 || !originalPath || !contentType || width === void 0 || height === void 0 || sizeBytes === void 0 || raw.original.filename !== null && filename === void 0) throw new Error(`legacy managed image record is invalid: ${params.snapshot.sourcePath}`);
	const resolvedOriginalPath = path.resolve(originalPath);
	const mediaRoot = path.dirname(path.dirname(path.dirname(resolvedOriginalPath)));
	if (!(/* @__PURE__ */ new Set([path.resolve(params.stateDir, "media"), path.resolve(getMediaDir())])).has(mediaRoot) || path.dirname(resolvedOriginalPath) !== path.join(mediaRoot, "outgoing/originals")) throw new Error("legacy managed image original is outside managed outgoing storage");
	const mediaId = path.basename(resolvedOriginalPath);
	if (!mediaId || mediaId === "." || mediaId === "..") throw new Error("legacy managed image original has an invalid media id");
	return {
		snapshot: params.snapshot,
		originalPath: resolvedOriginalPath,
		record: {
			attachmentId,
			sessionKey,
			...agentId ? { agentId } : {},
			messageId: messageId ?? null,
			createdAt,
			...updatedAt ? { updatedAt } : {},
			...retentionClass === "transient" || retentionClass === "history" ? { retentionClass } : {},
			alt,
			original: {
				mediaRoot,
				mediaId,
				mediaSubdir: MANAGED_OUTGOING_ORIGINALS_SUBDIR,
				contentType,
				width,
				height,
				sizeBytes,
				filename: filename ?? null
			}
		}
	};
}
function restoreClaimedSources(claimed) {
	const restoreErrors = [];
	for (const entry of claimed.toReversed()) {
		if (!fs.existsSync(entry.claimPath)) continue;
		if (fs.existsSync(entry.sourcePath)) {
			restoreErrors.push(`source path already exists: ${entry.sourcePath}`);
			continue;
		}
		try {
			fs.renameSync(entry.claimPath, entry.sourcePath);
		} catch (error) {
			restoreErrors.push(String(error));
		}
	}
	return restoreErrors;
}
function appendRestoreFailures(error, restoreErrors) {
	return `${String(error)}${restoreErrors.length > 0 ? `; restore failures: ${restoreErrors.join("; ")}` : ""}`;
}
function claimLegacySources(params) {
	params.beforeClaim?.();
	const claimed = [];
	try {
		for (const parsed of params.records) {
			const sourcePath = parsed.snapshot.sourcePath;
			const claimPath = `${sourcePath}.doctor-importing-${process.pid}-${randomUUID()}`;
			fs.renameSync(sourcePath, claimPath);
			claimed.push({
				claimPath,
				sourcePath,
				parsed
			});
			if (!legacyMigrationSourceSnapshotsMatch(readLegacySourceSnapshot$2(claimPath), parsed.snapshot)) throw new Error(`legacy managed image source changed before doctor claimed it: ${sourcePath}`);
		}
		return claimed;
	} catch (error) {
		throw new Error(appendRestoreFailures(error, restoreClaimedSources(claimed)), { cause: error });
	}
}
function verifyClaimedSources(claimed) {
	for (const entry of claimed) {
		if (!legacyMigrationSourceSnapshotsMatch(readLegacySourceSnapshot$2(entry.claimPath), entry.parsed.snapshot)) throw new Error(`claimed legacy managed image source changed: ${entry.sourcePath}`);
		if (fs.existsSync(entry.sourcePath)) throw new Error(`legacy managed image source was replaced while doctor imported it`);
	}
}
function removeClaimedSources$1(params) {
	try {
		for (const entry of params.claimed) (params.removeSource ?? fs.unlinkSync)(entry.claimPath);
	} catch (error) {
		throw new Error(appendRestoreFailures(error, restoreClaimedSources(params.claimed)), { cause: error });
	}
}
function isExpiredTransient(record, nowMs, transientTtlMs) {
	const createdAtMs = Date.parse(record.createdAt);
	return record.messageId === null && Number.isFinite(createdAtMs) && nowMs - createdAtMs >= transientTtlMs;
}
function rollbackImportedRecords(params) {
	try {
		runOpenClawStateWriteTransaction(({ db }) => {
			const stateDb = getNodeSqliteKysely(db);
			for (const parsed of params.records) {
				const row = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("managed_outgoing_image_records").selectAll().where("attachment_id", "=", parsed.record.attachmentId));
				if (!row || row.cleanup_pending === 1 || !managedImageRecordsEqual(managedImageRecordFromRow(row), parsed.record)) continue;
				executeSqliteQuerySync(db, stateDb.deleteFrom("managed_outgoing_image_records").where("attachment_id", "=", parsed.record.attachmentId));
			}
		}, { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		return null;
	} catch (error) {
		return String(error);
	}
}
/** Import, verify, and remove retired record JSON during explicit Doctor repair. */
function migrateLegacyManagedOutgoingImages(params) {
	const changes = [];
	const warnings = [];
	if (!params.detected.hasLegacy) return {
		changes,
		warnings
	};
	let parsedRecords;
	try {
		const sourceDirStat = fs.lstatSync(params.detected.sourceDir);
		if (!sourceDirStat.isDirectory() || sourceDirStat.isSymbolicLink()) throw new Error("legacy managed image records owner is not a regular directory");
		recoverInterruptedDoctorClaims(params.detected.sourceDir);
		parsedRecords = fs.readdirSync(params.detected.sourceDir).filter((name) => name.endsWith(".json")).toSorted().map((name) => parseLegacyManagedImageRecord({
			snapshot: readLegacySourceSnapshot$2(path.join(params.detected.sourceDir, name)),
			stateDir: params.stateDir
		}));
	} catch (error) {
		warnings.push(`Failed reading legacy managed outgoing image state: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	const nowMs = params.nowMs ?? Date.now();
	const transientTtlMs = params.transientTtlMs ?? DEFAULT_TRANSIENT_TTL_MS;
	const discardedIds = /* @__PURE__ */ new Set();
	const insertedRecords = [];
	let claimed;
	try {
		claimed = claimLegacySources({
			records: parsedRecords,
			beforeClaim: params.beforeClaim
		});
	} catch (error) {
		warnings.push(`Failed claiming legacy managed outgoing image state: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		runOpenClawStateWriteTransaction(({ db }) => {
			const stateDb = getNodeSqliteKysely(db);
			for (const parsed of parsedRecords) {
				const existing = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("managed_outgoing_image_records").selectAll().where("attachment_id", "=", parsed.record.attachmentId));
				if (existing) {
					if (!managedImageRecordsEqual(managedImageRecordFromRow(existing), parsed.record)) throw new Error(`legacy managed image record conflicts with shared SQLite state: ${parsed.record.attachmentId}`);
					continue;
				}
				if (isExpiredTransient(parsed.record, nowMs, transientTtlMs)) {
					discardedIds.add(parsed.record.attachmentId);
					continue;
				}
				executeSqliteQuerySync(db, stateDb.insertInto("managed_outgoing_image_records").values(managedImageRecordToRow(parsed.record)));
				insertedRecords.push(parsed);
			}
		}, { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
	} catch (error) {
		warnings.push(`Failed migrating legacy managed outgoing image state: ${appendRestoreFailures(error, restoreClaimedSources(claimed))}`);
		return {
			changes,
			warnings
		};
	}
	try {
		params.beforeVerify?.();
		const database = openOpenClawStateDatabase({ env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		const stateDb = getNodeSqliteKysely(database.db);
		for (const parsed of parsedRecords) {
			const row = executeSqliteQueryTakeFirstSync(database.db, stateDb.selectFrom("managed_outgoing_image_records").selectAll().where("attachment_id", "=", parsed.record.attachmentId));
			if (discardedIds.has(parsed.record.attachmentId)) {
				if (row) throw new Error(`discarded transient record unexpectedly exists: ${parsed.record.attachmentId}`);
			} else if (!row || !managedImageRecordsEqual(managedImageRecordFromRow(row), parsed.record)) throw new Error(`managed image verification failed: ${parsed.record.attachmentId}`);
		}
		verifyClaimedSources(claimed);
	} catch (error) {
		const rollbackError = rollbackImportedRecords({
			records: insertedRecords,
			stateDir: params.stateDir
		});
		const restoreErrors = restoreClaimedSources(claimed);
		warnings.push(`Failed verifying legacy managed outgoing image migration: ${appendRestoreFailures(error, restoreErrors)}` + (rollbackError ? `; SQLite rollback failure: ${rollbackError}` : ""));
		return {
			changes,
			warnings
		};
	}
	let deletedExpiredFiles = 0;
	try {
		for (const parsed of parsedRecords) {
			if (!discardedIds.has(parsed.record.attachmentId)) continue;
			fs.rmSync(parsed.originalPath, { force: true });
			deletedExpiredFiles += 1;
		}
	} catch (error) {
		warnings.push(`Failed deleting expired legacy managed image attachments: ${appendRestoreFailures(error, restoreClaimedSources(claimed))}`);
		return {
			changes,
			warnings
		};
	}
	try {
		removeClaimedSources$1({
			claimed,
			removeSource: params.removeSource
		});
	} catch (error) {
		warnings.push(`Migrated managed outgoing images but could not remove legacy JSON: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		fs.rmdirSync(params.detected.sourceDir);
	} catch {}
	const importedCount = parsedRecords.length - discardedIds.size;
	if (importedCount > 0) changes.push(`Migrated ${importedCount} managed outgoing image record(s) → shared SQLite state`);
	if (discardedIds.size > 0) changes.push(`Discarded ${discardedIds.size} expired managed outgoing image record(s)` + (deletedExpiredFiles > 0 ? ` and ${deletedExpiredFiles} attachment file(s)` : ""));
	changes.push("Removed legacy managed outgoing image JSON after SQLite verification");
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.mcp-oauth-format.ts
const MAX_TIMESTAMP_MS = 864e13;
const STORE_KEYS = /* @__PURE__ */ new Set([
	"clientInformation",
	"tokens",
	"tokenExpiresAt",
	"codeVerifier",
	"discoveryState",
	"lastAuthorizationUrl",
	"redirectUrl",
	"state"
]);
const DISCOVERY_KEYS = /* @__PURE__ */ new Set([
	"authorizationServerUrl",
	"authorizationServerMetadata",
	"resourceMetadata",
	"resourceMetadataUrl"
]);
function assertOnlyKeys$2(value, allowed, label) {
	if (Object.keys(value).some((key) => !allowed.has(key))) throw new Error(`${label} has an unexpected field`);
}
function parseSafeUrl(value, label) {
	if (typeof value !== "string") throw new Error(`${label} is not a string`);
	let parsed;
	try {
		parsed = new URL(value);
	} catch {
		throw new Error(`${label} is not a valid URL`);
	}
	if ([
		"javascript:",
		"data:",
		"vbscript:"
	].includes(parsed.protocol)) throw new Error(`${label} uses an unsafe URL scheme`);
	return value;
}
function parseDiscoveryState(value) {
	if (!isRecord(value)) throw new Error("legacy MCP OAuth discovery state is not an object");
	assertOnlyKeys$2(value, DISCOVERY_KEYS, "legacy MCP OAuth discovery state");
	const result = { authorizationServerUrl: parseSafeUrl(value.authorizationServerUrl, "legacy MCP OAuth authorization server URL") };
	if (value.authorizationServerMetadata !== void 0) {
		const oauth = OAuthMetadataSchema.safeParse(value.authorizationServerMetadata);
		const oidc = oauth.success ? null : OpenIdProviderDiscoveryMetadataSchema.safeParse(value.authorizationServerMetadata);
		if (!oauth.success && !oidc?.success) throw new Error("legacy MCP OAuth authorization server metadata is invalid");
		result.authorizationServerMetadata = value.authorizationServerMetadata;
	}
	if (value.resourceMetadata !== void 0) {
		if (!OAuthProtectedResourceMetadataSchema.safeParse(value.resourceMetadata).success) throw new Error("legacy MCP OAuth resource metadata is invalid");
		result.resourceMetadata = value.resourceMetadata;
	}
	if (value.resourceMetadataUrl !== void 0) result.resourceMetadataUrl = parseSafeUrl(value.resourceMetadataUrl, "legacy MCP OAuth resource metadata URL");
	return result;
}
function parseLegacyMcpOAuthStore(value) {
	if (!isRecord(value)) throw new Error("legacy MCP OAuth store is not an object");
	assertOnlyKeys$2(value, STORE_KEYS, "legacy MCP OAuth store");
	const result = {};
	if (value.clientInformation !== void 0) {
		if (!OAuthClientInformationSchema.safeParse(value.clientInformation).success) throw new Error("legacy MCP OAuth client information is invalid");
		result.clientInformation = value.clientInformation;
	}
	if (value.tokens !== void 0) {
		if (!OAuthTokensSchema.safeParse(value.tokens).success) throw new Error("legacy MCP OAuth tokens are invalid");
		result.tokens = value.tokens;
	}
	if (value.tokenExpiresAt !== void 0) {
		if (typeof value.tokenExpiresAt !== "number" || !Number.isFinite(value.tokenExpiresAt) || value.tokenExpiresAt < 0 || value.tokenExpiresAt > MAX_TIMESTAMP_MS) throw new Error("legacy MCP OAuth token expiry is invalid");
		if (result.tokens !== void 0) result.tokenExpiresAt = value.tokenExpiresAt;
	}
	if (value.codeVerifier !== void 0) {
		if (typeof value.codeVerifier !== "string" || value.codeVerifier.length === 0) throw new Error("legacy MCP OAuth code verifier is invalid");
		result.codeVerifier = value.codeVerifier;
	}
	if (value.discoveryState !== void 0) result.discoveryState = parseDiscoveryState(value.discoveryState);
	if (value.lastAuthorizationUrl !== void 0) result.lastAuthorizationUrl = parseSafeUrl(value.lastAuthorizationUrl, "legacy MCP OAuth authorization URL");
	if (value.redirectUrl !== void 0) result.redirectUrl = parseSafeUrl(value.redirectUrl, "legacy MCP OAuth redirect URL");
	return result;
}
//#endregion
//#region src/infra/state-migrations.mcp-oauth-lock-stale.ts
const LEGACY_LOCK_STALE_MS = 6e4;
function parseLockPayload(raw) {
	try {
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
/** Classify only retired-runtime owners whose age and process identity are provably stale. */
function isDefinitelyStaleLegacyMcpOAuthLock(params) {
	const payload = parseLockPayload(params.raw);
	if (!payload) return false;
	const pid = payload.pid;
	const createdAt = payload.createdAt;
	const starttime = payload.starttime;
	if (typeof pid !== "number" || !Number.isSafeInteger(pid) || pid <= 0 || typeof createdAt !== "string" || starttime !== void 0 && (typeof starttime !== "number" || !Number.isSafeInteger(starttime) || starttime < 0)) return false;
	const createdAtMs = Date.parse(createdAt);
	const ageMs = (params.nowMs ?? Date.now()) - createdAtMs;
	if (!Number.isFinite(createdAtMs) || new Date(createdAtMs).toISOString() !== createdAt || !Number.isFinite(ageMs) || ageMs < LEGACY_LOCK_STALE_MS) return false;
	return isLockOwnerDefinitelyStale({
		payload,
		isPidDefinitelyDead: params.isPidDefinitelyDead ?? isPidDefinitelyDead,
		getProcessStartTime: params.getProcessStartTime ?? getFileLockProcessStartTime
	});
}
//#endregion
//#region src/infra/state-migrations.mcp-oauth-lock.ts
const LOCK_RETRIES = 20;
const LOCK_RETRY_FACTOR = 1.3;
const LOCK_RETRY_MIN_MS = 25;
const LOCK_RETRY_MAX_MS = 500;
const MCP_OAUTH_LOCKS = createFileLockManager("openclaw.mcp-oauth-legacy-migration");
function createLockPayload() {
	const payload = {
		pid: process.pid,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		nonce: randomUUID()
	};
	const starttime = getFileLockProcessStartTime(process.pid);
	if (starttime !== null) payload.starttime = starttime;
	return payload;
}
function readLegacyRawPayload(payload) {
	return payload && typeof payload === "object" && "raw" in payload && typeof payload.raw === "string" ? payload.raw : "";
}
/** Share the retired runtime's sidecar protocol without leaving the pinned state root. */
async function withRootBoundedLegacyFileLock(params, run) {
	const targetPath = path.resolve(params.stateRoot.rootReal, params.targetRelativePath);
	return await MCP_OAUTH_LOCKS.withLock(targetPath, {
		lockPath: `${targetPath}.lock`,
		lockRoot: asFsSafeFileLockRoot(params.stateRoot),
		retry: {
			retries: LOCK_RETRIES,
			factor: LOCK_RETRY_FACTOR,
			minTimeout: LOCK_RETRY_MIN_MS,
			maxTimeout: LOCK_RETRY_MAX_MS
		},
		staleRecovery: "fail-closed",
		payload: createLockPayload,
		parsePayload: (raw) => ({ raw }),
		shouldReclaim: ({ payload }) => isDefinitelyStaleLegacyMcpOAuthLock({ raw: readLegacyRawPayload(payload) })
	}, run);
}
//#endregion
//#region src/infra/state-migrations.mcp-oauth.ts
const LEGACY_MCP_OAUTH_DIR = "mcp-oauth";
const DOCTOR_CLAIM_SUFFIX$2 = ".doctor-importing";
const MIGRATION_KIND$3 = "legacy-mcp-oauth-json";
const MAX_LEGACY_STORE_BYTES = 4 * 1024 * 1024;
const LEGACY_STORE_NAME_RE = /^[A-Za-z][A-Za-z0-9_-]{0,29}-[0-9a-f]{16}\.json$/u;
const utf8Decoder$2 = new TextDecoder("utf-8", { fatal: true });
function parseLegacyMcpOAuthJson(buffer) {
	try {
		return JSON.parse(utf8Decoder$2.decode(buffer));
	} catch {
		throw new Error("legacy MCP OAuth store contains invalid JSON");
	}
}
function exactLegacyBaseName(name) {
	const baseName = name.endsWith(DOCTOR_CLAIM_SUFFIX$2) ? name.slice(0, -17) : name;
	return LEGACY_STORE_NAME_RE.test(baseName) ? baseName : null;
}
function exactLegacyBaseNames(entries) {
	const baseNames = /* @__PURE__ */ new Set();
	for (const entry of entries) {
		const baseName = exactLegacyBaseName(entry.name);
		if (baseName) baseNames.add(baseName);
	}
	return Array.from(baseNames).toSorted();
}
function listLegacySourcePaths(sourceDir) {
	return exactLegacyBaseNames(fs.readdirSync(sourceDir, { withFileTypes: true })).map((baseName) => path.join(sourceDir, baseName));
}
async function listLegacySourcePathsFromRoot(params) {
	return exactLegacyBaseNames(await params.stateRoot.list(LEGACY_MCP_OAUTH_DIR, { withFileTypes: true })).map((baseName) => path.join(params.stateDir, LEGACY_MCP_OAUTH_DIR, baseName));
}
/** Detect exact retired MCP OAuth filenames only for an explicit Doctor flow. */
function detectLegacyMcpOAuthStores(params) {
	const sourceDir = path.join(params.stateDir, LEGACY_MCP_OAUTH_DIR);
	if (params.doctorOnlyStateMigrations !== true) return {
		sourceDir,
		sourcePaths: [],
		hasLegacy: false
	};
	try {
		const sourcePaths = listLegacySourcePaths(sourceDir);
		return {
			sourceDir,
			sourcePaths,
			hasLegacy: sourcePaths.length > 0
		};
	} catch {
		return {
			sourceDir,
			sourcePaths: [],
			hasLegacy: legacyMigrationPathMayExist(sourceDir)
		};
	}
}
function relativeLegacyPath(stateDir, filePath) {
	return resolveLegacyMigrationRelativePath(stateDir, filePath, "MCP OAuth", false);
}
async function readLegacySourceSnapshot$1(stateRoot, stateDir, sourcePath, options = {}) {
	const snapshot = await readLegacyMigrationSourceSnapshot({
		stateRoot,
		stateDir,
		sourcePath,
		maxBytes: MAX_LEGACY_STORE_BYTES,
		label: "MCP OAuth"
	});
	const parsed = options.parseStore === false ? {} : parseLegacyMcpOAuthStore(parseLegacyMcpOAuthJson(snapshot.buffer));
	return {
		...snapshot,
		store: parsed
	};
}
function storeKeyForSource(sourcePath) {
	const fileName = path.basename(sourcePath);
	if (!LEGACY_STORE_NAME_RE.test(fileName)) throw new Error("legacy MCP OAuth filename is invalid");
	return fileName.slice(0, -5);
}
function importAndRecordReceipt$1(params) {
	const sourceKey = resolveLegacyMigrationSourceKey("mcp-oauth-json", params.sourcePath);
	const storeKey = storeKeyForSource(params.sourcePath);
	const runId = `${sourceKey}:${params.snapshot.sha256.slice(0, 16)}`;
	const now = Date.now();
	return runOpenClawStateWriteTransaction(({ db }) => {
		const stateDb = getNodeSqliteKysely(db);
		if (readLegacyMigrationReceiptFromDatabase(db, sourceKey)) return {
			sourceKey,
			imported: false
		};
		const existingStore = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("mcp_oauth_stores").selectAll().where("store_key", "=", storeKey));
		let importedLegacyState;
		if (existingStore) {
			if (existingStore.format_version !== 1) throw new Error("canonical MCP OAuth store has an unsupported format version");
			const canonicalStore = parseMcpOAuthStoreJson(storeKey, existingStore.store_json);
			const canMergeLegacyState = canonicalStore.credentialState === "uninitialized";
			const legacyStore = { ...params.snapshot.store };
			if (canonicalStore.pendingAuthorizationChallenge?.resourceMetadataUrl) delete legacyStore.discoveryState;
			importedLegacyState = canMergeLegacyState && Object.keys(legacyStore).some((key) => !Object.hasOwn(canonicalStore, key));
			if (importedLegacyState) {
				const mergedStore = {
					...legacyStore,
					...canonicalStore
				};
				delete mergedStore.credentialState;
				executeSqliteQuerySync(db, stateDb.updateTable("mcp_oauth_stores").set({
					store_json: JSON.stringify(mergedStore),
					updated_at: now
				}).where("store_key", "=", storeKey));
			}
		} else {
			importedLegacyState = true;
			executeSqliteQuerySync(db, stateDb.insertInto("mcp_oauth_stores").values({
				store_key: storeKey,
				format_version: 1,
				store_json: JSON.stringify(params.snapshot.store),
				updated_at: now
			}));
		}
		const verified = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("mcp_oauth_stores").selectAll().where("store_key", "=", storeKey));
		if (!verified || verified.format_version !== 1) throw new Error("SQLite verification failed for an MCP OAuth store");
		parseMcpOAuthStoreJson(storeKey, verified.store_json);
		const reportJson = JSON.stringify({
			source: MIGRATION_KIND$3,
			target: "mcp_oauth_stores",
			storeKey,
			sourceSha256: params.snapshot.sha256,
			importedRecordCount: importedLegacyState ? 1 : 0,
			preservedSqliteRecordCount: existingStore ? 1 : 0
		});
		recordLegacyMigrationReceipt(db, {
			sourceKey,
			migrationKind: MIGRATION_KIND$3,
			sourcePath: params.sourcePath,
			targetTable: "mcp_oauth_stores",
			sourceSha256: params.snapshot.sha256,
			sourceSizeBytes: params.snapshot.size,
			sourceRecordCount: 1,
			runId,
			now,
			reportJson
		});
		return {
			sourceKey,
			imported: importedLegacyState
		};
	}, { env: params.env });
}
async function cleanupReceiptAuthoritativeSources(params) {
	let removed = 0;
	for (const candidate of [params.sourcePath, `${params.sourcePath}${DOCTOR_CLAIM_SUFFIX$2}`]) {
		if (!await params.stateRoot.exists(relativeLegacyPath(params.stateDir, candidate))) continue;
		await readLegacySourceSnapshot$1(params.stateRoot, params.stateDir, candidate, { parseStore: false });
		if (params.removeSource) await params.removeSource(candidate);
		else await params.stateRoot.remove(relativeLegacyPath(params.stateDir, candidate));
		removed += 1;
	}
	if (!params.receipt.removedSource || removed > 0) markLegacyMigrationSourceRemoved(params.receipt.sourceKey, params.env);
	return removed;
}
async function migrateOneStore(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	const receipt = readLegacyMigrationReceipt(resolveLegacyMigrationSourceKey("mcp-oauth-json", params.sourcePath), params.env);
	if (receipt) {
		try {
			if (await cleanupReceiptAuthoritativeSources({
				...params,
				receipt
			}) > 0) changes.push("Discarded recreated retired MCP OAuth JSON without importing it.");
		} catch (error) {
			warnings.push(`MCP OAuth state is in SQLite, but legacy cleanup failed: ${String(error)}`);
		}
		return notices.length > 0 ? {
			changes,
			warnings,
			notices
		} : {
			changes,
			warnings
		};
	}
	const source = new LegacyMigrationSourceClaim({
		stateRoot: params.stateRoot,
		stateDir: params.stateDir,
		sourcePath: params.sourcePath,
		label: "MCP OAuth",
		includeFilePath: false,
		claimSuffix: DOCTOR_CLAIM_SUFFIX$2,
		readSnapshot: (snapshotPath) => readLegacySourceSnapshot$1(params.stateRoot, params.stateDir, snapshotPath)
	});
	const hasSource = await source.exists();
	const hasClaim = await source.exists(true);
	if (hasSource && hasClaim) return {
		changes,
		warnings: [`Failed migrating legacy MCP OAuth store ${path.basename(params.sourcePath)}: source and interrupted claim both exist.`]
	};
	const activePath = hasSource ? params.sourcePath : hasClaim ? source.claimPath : null;
	if (!activePath) return {
		changes,
		warnings
	};
	let snapshot;
	try {
		snapshot = await readLegacySourceSnapshot$1(params.stateRoot, params.stateDir, activePath);
	} catch (error) {
		warnings.push(`Failed reading legacy MCP OAuth store ${path.basename(params.sourcePath)}: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	if (activePath === params.sourcePath) try {
		snapshot = await source.claim({
			snapshot,
			mismatchMessage: "legacy MCP OAuth source changed before Doctor could claim it",
			beforeClaim: () => params.beforeClaim?.(params.sourcePath)
		});
	} catch (error) {
		const restoreError = await source.restore();
		warnings.push(`Failed migrating legacy MCP OAuth store ${path.basename(params.sourcePath)}: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	let result;
	try {
		result = importAndRecordReceipt$1({
			env: params.env,
			sourcePath: params.sourcePath,
			snapshot
		});
	} catch (error) {
		const restoreError = await source.restore();
		warnings.push(`Failed migrating legacy MCP OAuth store ${path.basename(params.sourcePath)}: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	try {
		if (await source.exists()) throw new Error("legacy MCP OAuth source reappeared during import");
		const finalSnapshot = await source.read(true);
		if (!legacyMigrationSourceSnapshotsMatch(snapshot, finalSnapshot)) throw new Error("legacy MCP OAuth claim changed after SQLite import");
		await source.remove({
			removeSource: params.removeSource,
			claimRemainingMessage: "legacy MCP OAuth Doctor claim remains after cleanup",
			skipSourceCheck: true
		});
		markLegacyMigrationSourceRemoved(result.sourceKey, params.env);
	} catch (error) {
		warnings.push(`MCP OAuth state is in SQLite, but legacy cleanup failed: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	changes.push(result.imported ? `Migrated MCP OAuth store ${path.basename(params.sourcePath)} to SQLite.` : `Preserved canonical SQLite MCP OAuth store for ${path.basename(params.sourcePath)}.`);
	notices.push("Removed retired MCP OAuth JSON after verified SQLite import.");
	return {
		changes,
		warnings,
		notices
	};
}
async function migrateWithExclusiveStateOwnership$3(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	let sourcePaths;
	try {
		sourcePaths = await listLegacySourcePathsFromRoot(params);
	} catch (error) {
		const code = error.code;
		if (code === "ENOENT" || code === "not-found") return {
			changes,
			warnings
		};
		return {
			changes,
			warnings: [`Failed reading legacy MCP OAuth directory: ${String(error)}`]
		};
	}
	for (const sourcePath of sourcePaths) try {
		params.beforeLegacyLock?.(sourcePath);
		const result = await withRootBoundedLegacyFileLock({
			stateRoot: params.stateRoot,
			targetRelativePath: relativeLegacyPath(params.stateDir, sourcePath)
		}, async () => await migrateOneStore({
			...params,
			sourcePath
		}));
		changes.push(...result.changes);
		warnings.push(...result.warnings);
		notices.push(...result.notices ?? []);
	} catch (error) {
		const staleGuidance = error.code === "file_lock_stale" ? " Verify no older OpenClaw process is running, remove the retired .lock sidecar, and rerun Doctor." : "";
		warnings.push(`Failed locking legacy MCP OAuth store ${path.basename(sourcePath)}: ${String(error)}.${staleGuidance}`);
	}
	return notices.length > 0 ? {
		changes,
		warnings,
		notices
	} : {
		changes,
		warnings
	};
}
/** Import retired MCP OAuth stores while excluding old Gateways that can recreate them. */
async function migrateLegacyMcpOAuthStores(params) {
	if (!params.detected.hasLegacy) return {
		changes: [],
		warnings: []
	};
	return await withLegacyMigrationStateLock({
		stateDir: params.stateDir,
		env: params.env,
		label: "legacy MCP OAuth stores",
		releaseLabel: "MCP OAuth",
		errorLabel: "Failed reading legacy MCP OAuth state",
		run: async (env) => {
			const stateRoot = await root$1(params.stateDir, {
				hardlinks: "reject",
				maxBytes: MAX_LEGACY_STORE_BYTES,
				symlinks: "reject"
			});
			return await migrateWithExclusiveStateOwnership$3({
				...params,
				env,
				stateRoot
			});
		}
	});
}
//#endregion
//#region src/infra/state-migrations.media-persistence.ts
const PREVIOUS_MEDIA_SCHEMA_VERSION = 15;
const ARCHIVE_TEMP_MARKER = ".media-retirement";
function transformTranscriptEvent(event) {
	if (!isRecord(event) || event.type !== "message" || !isRecord(event.message)) return {
		changed: false,
		event
	};
	const canonical = canonicalizePersistedUserMessageMedia(event.message);
	return canonical.changed ? {
		changed: true,
		event: {
			...event,
			message: canonical.message
		}
	} : {
		changed: false,
		event
	};
}
function parseTranscriptEvent(raw, owner) {
	try {
		return JSON.parse(raw);
	} catch (error) {
		throw new Error(`${owner} contains invalid transcript JSON: ${String(error)}`, { cause: error });
	}
}
function eventIdentity(event) {
	if (!isRecord(event)) return JSON.stringify({
		id: null,
		parentId: null,
		type: null
	});
	return JSON.stringify({
		id: typeof event.id === "string" ? event.id : null,
		parentId: typeof event.parentId === "string" ? event.parentId : null,
		type: typeof event.type === "string" ? event.type : null
	});
}
function assertEventIdentitiesUnchanged(before, after, owner) {
	if (before.length !== after.length) throw new Error(`${owner} event count changed during media migration`);
	for (let index = 0; index < before.length; index += 1) if (eventIdentity(before[index]) !== eventIdentity(after[index])) throw new Error(`${owner} event identity changed at index ${index}`);
}
function planTranscriptRows(database, pathname) {
	const db = getNodeSqliteKysely(database);
	const sessionRows = executeSqliteQuerySync(database, db.selectFrom("session_windows").select(["session_id", "session_key"])).rows;
	const sessionKeys = new Map(sessionRows.map((row) => [row.session_id, row.session_key]));
	const rows = executeSqliteQuerySync(database, db.selectFrom("transcript_events").select([
		"session_id",
		"seq",
		"event_json",
		"created_at"
	]).orderBy("session_id", "asc").orderBy("seq", "asc")).rows;
	const bySession = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const snapshots = bySession.get(row.session_id) ?? [];
		snapshots.push({
			createdAt: row.created_at,
			event: parseTranscriptEvent(row.event_json, `${pathname}:${row.session_id}:${row.seq}`),
			eventJson: row.event_json,
			seq: row.seq,
			sessionId: row.session_id
		});
		bySession.set(row.session_id, snapshots);
	}
	return [...bySession].map(([sessionId, snapshots]) => {
		const sessionKey = sessionKeys.get(sessionId);
		if (!sessionKey) throw new Error(`${pathname}:${sessionId} has transcript rows without a session window`);
		let changed = false;
		const events = snapshots.map((row) => {
			const transformed = transformTranscriptEvent(row.event);
			changed ||= transformed.changed;
			return transformed.event;
		});
		assertEventIdentitiesUnchanged(snapshots.map((row) => row.event), events, `${pathname}:${sessionId}`);
		return {
			changed,
			events,
			rows: snapshots,
			sessionId,
			sessionKey
		};
	});
}
function assertTranscriptSourceUnchanged(database, pathname, planned) {
	const current = executeSqliteQuerySync(database, getNodeSqliteKysely(database).selectFrom("transcript_events").select([
		"session_id",
		"seq",
		"event_json",
		"created_at"
	]).orderBy("session_id", "asc").orderBy("seq", "asc")).rows;
	const expected = planned.flatMap((session) => session.rows);
	if (current.length !== expected.length) throw new Error(`${pathname} transcript source changed before migration commit`);
	for (let index = 0; index < expected.length; index += 1) {
		const left = current[index];
		const right = expected[index];
		if (!left || !right || left.session_id !== right.sessionId || left.seq !== right.seq || left.event_json !== right.eventJson || left.created_at !== right.createdAt) throw new Error(`${pathname} transcript source changed before migration commit`);
	}
}
function planTrajectoryRowRewrite(params) {
	let event;
	try {
		event = JSON.parse(params.eventJson);
	} catch (error) {
		throw new Error(`${params.owner} contains invalid trajectory JSON: ${String(error)}`, { cause: error });
	}
	if (!isRecord(event) || !isRecord(event.data) || !Array.isArray(event.data.messagesSnapshot)) return {
		eventJson: params.eventJson,
		rewrittenEventJson: params.eventJson,
		seq: params.seq,
		sessionId: params.sessionId
	};
	let changed = false;
	const messagesSnapshot = event.data.messagesSnapshot.map((message) => {
		if (!isRecord(message) || !hasMeaningfulRetiredMediaCarrier(message)) return message;
		const canonical = canonicalizePersistedUserMessageMedia(message);
		changed ||= canonical.changed;
		return canonical.message;
	});
	return {
		eventJson: params.eventJson,
		rewrittenEventJson: changed ? JSON.stringify({
			...event,
			data: {
				...event.data,
				messagesSnapshot
			}
		}) : params.eventJson,
		seq: params.seq,
		sessionId: params.sessionId
	};
}
function assertTrajectorySourceUnchanged(database, pathname, planned) {
	const current = executeSqliteQuerySync(database, getNodeSqliteKysely(database).selectFrom("trajectory_runtime_events").select([
		"session_id",
		"seq",
		"event_json"
	]).orderBy("session_id", "asc").orderBy("seq", "asc")).rows;
	if (current.length !== planned.length) throw new Error(`${pathname} trajectory source changed before migration commit`);
	for (let index = 0; index < planned.length; index += 1) {
		const left = current[index];
		const right = planned[index];
		if (!left || !right || left.session_id !== right.sessionId || left.seq !== right.seq || left.event_json !== right.eventJson) throw new Error(`${pathname} trajectory source changed before migration commit`);
	}
}
function createMigrationDatabaseHandle(database, agentId, pathname) {
	return {
		agentId,
		db: database,
		path: pathname,
		walMaintenance: {
			checkpoint: () => false,
			close: () => false
		}
	};
}
function migrateRegisteredDatabase(params) {
	const database = openNodeSqliteDatabase(params.pathname);
	try {
		database.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
		let metadata = assertOpenClawAgentDatabaseOwner(database, {
			agentId: params.agentId,
			pathname: params.pathname
		});
		let userVersion = readSqliteUserVersion(database);
		if (userVersion < PREVIOUS_MEDIA_SCHEMA_VERSION) {
			migrateOpenClawAgentDatabaseToMediaPrerequisiteSchema(database, {
				agentId: params.agentId,
				path: params.pathname
			});
			metadata = assertOpenClawAgentDatabaseOwner(database, {
				agentId: params.agentId,
				pathname: params.pathname
			});
			userVersion = readSqliteUserVersion(database);
		}
		if (userVersion !== PREVIOUS_MEDIA_SCHEMA_VERSION && userVersion !== 16) throw new Error(`${params.pathname} uses schema version ${userVersion}; expected ${PREVIOUS_MEDIA_SCHEMA_VERSION} or 16`);
		if (metadata.schemaVersion !== userVersion) throw new Error(`${params.pathname} metadata schema version ${metadata.schemaVersion ?? "invalid"} does not match ${userVersion}`);
		if (userVersion === 16) ensureOpenClawAgentDatabaseSchema(database, {
			agentId: params.agentId,
			path: params.pathname
		});
		if (userVersion === PREVIOUS_MEDIA_SCHEMA_VERSION) repairCanonicalSqliteIndexes(database, params.pathname, OPENCLAW_AGENT_SCHEMA_SQL, { validateAfterRepair: () => assertOpenClawAgentSchemaContains(database, params.pathname, OPENCLAW_AGENT_SCHEMA_SQL) });
		assertOpenClawAgentSchemaContains(database, params.pathname, OPENCLAW_AGENT_SCHEMA_SQL);
		const planned = planTranscriptRows(database, params.pathname);
		const db = getNodeSqliteKysely(database);
		const plannedTrajectoryRows = executeSqliteQuerySync(database, db.selectFrom("trajectory_runtime_events").select([
			"session_id",
			"seq",
			"event_json"
		]).orderBy("session_id", "asc").orderBy("seq", "asc")).rows.map((row) => planTrajectoryRowRewrite({
			eventJson: row.event_json,
			owner: `${params.pathname}:${row.session_id}:${row.seq}`,
			seq: row.seq,
			sessionId: row.session_id
		}));
		const changedTrajectoryRows = plannedTrajectoryRows.filter((row) => row.rewrittenEventJson !== row.eventJson);
		const changedSessions = planned.filter((session) => session.changed);
		const versionAdvanced = userVersion === PREVIOUS_MEDIA_SCHEMA_VERSION;
		if (!versionAdvanced && changedSessions.length === 0 && changedTrajectoryRows.length === 0) return {
			rewrittenSessions: 0,
			rewrittenTrajectoryRows: 0,
			versionAdvanced: false
		};
		params.beforeTransaction?.();
		const owner = createMigrationDatabaseHandle(database, params.agentId, params.pathname);
		runSqliteImmediateTransactionSync(database, () => {
			assertTranscriptSourceUnchanged(database, params.pathname, planned);
			assertTrajectorySourceUnchanged(database, params.pathname, plannedTrajectoryRows);
			for (const session of changedSessions) {
				const rows = session.events.flatMap((event, index) => {
					const source = session.rows[index];
					if (!source || JSON.stringify(event) === source.eventJson) return [];
					return [{
						event,
						expectedEventJson: source.eventJson,
						seq: source.seq
					}];
				});
				rewriteSqliteTranscriptEventRowsInTransaction(owner, {
					agentId: params.agentId,
					path: params.pathname,
					sessionId: session.sessionId,
					sessionKey: session.sessionKey
				}, rows);
			}
			for (const row of changedTrajectoryRows) executeSqliteQuerySync(database, db.updateTable("trajectory_runtime_events").set({ event_json: row.rewrittenEventJson }).where("session_id", "=", row.sessionId).where("seq", "=", row.seq));
			if (versionAdvanced) {
				database.exec(`PRAGMA user_version = 16;`);
				executeSqliteQuerySync(database, db.updateTable("schema_meta").set({
					app_version: VERSION,
					schema_version: 16,
					updated_at: Date.now()
				}).where("meta_key", "=", "primary"));
			}
		}, {
			busyTimeoutMs: OPENCLAW_SQLITE_BUSY_TIMEOUT_MS,
			databaseLabel: params.pathname,
			operationLabel: "media-persistence-retirement"
		});
		return {
			rewrittenSessions: changedSessions.length,
			rewrittenTrajectoryRows: changedTrajectoryRows.length,
			versionAdvanced
		};
	} finally {
		clearNodeSqliteKyselyCacheForDatabase(database);
		database.close();
	}
}
function readArchiveSourceSnapshot(filePath) {
	const stat = fs.lstatSync(filePath);
	if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`${filePath} is not a regular archive file`);
	const bytes = fs.readFileSync(filePath);
	return {
		dev: stat.dev,
		ino: stat.ino,
		mtimeMs: stat.mtimeMs,
		sha256: createHash("sha256").update(bytes).digest("hex"),
		size: stat.size
	};
}
function archiveSourceMatches(filePath, expected) {
	try {
		const current = readArchiveSourceSnapshot(filePath);
		return current.dev === expected.dev && current.ino === expected.ino && current.mtimeMs === expected.mtimeMs && current.sha256 === expected.sha256 && current.size === expected.size;
	} catch {
		return false;
	}
}
function parseArchiveContent(content, filePath) {
	const lines = content.endsWith("\n") ? content.slice(0, -1).split("\n") : content.split("\n");
	if (lines.length === 1 && lines[0] === "") return [];
	return lines.map((line, index) => {
		if (!line) throw new Error(`${filePath} contains a blank JSONL record at line ${index + 1}`);
		return parseTranscriptEvent(line, `${filePath}:${index + 1}`);
	});
}
function serializeArchiveEvents(events, trailingNewline) {
	if (events.length === 0) return "";
	return `${events.map((event) => JSON.stringify(event)).join("\n")}${trailingNewline ? "\n" : ""}`;
}
function migrateTranscriptArchive(filePath, options = {}) {
	const source = readArchiveSourceSnapshot(filePath);
	const content = readSessionArchiveContentSync(filePath);
	const events = parseArchiveContent(content, filePath);
	let changed = false;
	const transformed = events.map((event) => {
		const result = transformTranscriptEvent(event);
		changed ||= result.changed;
		return result.event;
	});
	if (!changed) return false;
	assertEventIdentitiesUnchanged(events, transformed, filePath);
	const rewritten = serializeArchiveEvents(transformed, content.endsWith("\n"));
	const compressed = filePath.endsWith(SESSION_ARCHIVE_ZSTD_SUFFIX);
	const encoded = compressed ? encodeSessionArchiveContent(rewritten) : {
		bytes: Buffer.from(rewritten, "utf8"),
		suffix: ""
	};
	if (compressed && encoded.suffix !== ".zst") throw new Error(`${filePath} could not be re-encoded with its zstd codec`);
	options.beforeReplace?.();
	replaceFileAtomicSync({
		filePath,
		content: encoded.bytes,
		preserveExistingMode: true,
		syncParentDir: true,
		syncTempFile: true,
		tempPrefix: `${path.basename(filePath)}${ARCHIVE_TEMP_MARKER}`,
		beforeRename: ({ tempPath }) => {
			if (!archiveSourceMatches(filePath, source)) throw new Error(`${filePath} changed before atomic media migration replacement`);
			const staged = decodeSessionArchiveBytes(fs.readFileSync(tempPath), compressed);
			if (staged !== rewritten) throw new Error(`${filePath} failed codec readback before replacement`);
			assertEventIdentitiesUnchanged(events, parseArchiveContent(staged, tempPath), filePath);
		}
	});
	if (readSessionArchiveContentSync(filePath) !== rewritten) throw new Error(`${filePath} failed codec readback after replacement`);
	return true;
}
function listTranscriptArchives(directory) {
	let entries;
	try {
		entries = fs.readdirSync(directory, { withFileTypes: true });
	} catch (error) {
		if (error.code === "ENOENT") return [];
		throw error;
	}
	return entries.filter((entry) => entry.isFile() && entry.name.includes(".jsonl.") && isSessionArchiveArtifactName(entry.name)).map((entry) => path.join(directory, entry.name));
}
/** Doctor-only migration from top-level Media* transcript fields to canonical facts. */
function migrateLegacyMediaPersistence(params = {}) {
	const env = params.env ?? process.env;
	const changes = [];
	const warnings = [];
	let registered;
	try {
		registered = listOpenClawRegisteredAgentDatabases({
			env,
			includeIncompatibleSchemaVersions: true
		});
	} catch (error) {
		return {
			changes,
			warnings: [`Failed enumerating registered agent databases for media migration: ${String(error)}`]
		};
	}
	const seenPaths = /* @__PURE__ */ new Set();
	let databaseMigrationFailed = false;
	const archiveDirectories = /* @__PURE__ */ new Set();
	for (const entry of registered) {
		const pathname = path.resolve(entry.path);
		if (!isPersistentOpenClawAgentDatabasePath(pathname, env)) {
			unregisterOpenClawAgentDatabase({
				agentId: entry.agentId,
				env,
				path: entry.path
			});
			changes.push(`Removed archived or transient agent database registry entry ${pathname}.`);
			continue;
		}
		let stat;
		try {
			stat = fs.statSync(pathname);
		} catch (error) {
			if (error.code !== "ENOENT") {
				warnings.push(`Could not inspect registered agent database ${pathname}: ${String(error)}`);
				continue;
			}
		}
		if (!stat?.isFile()) {
			unregisterOpenClawAgentDatabase({
				agentId: entry.agentId,
				env,
				path: entry.path
			});
			changes.push(`Removed missing agent database registry entry ${pathname}.`);
			warnings.push(`Skipped missing registered agent database ${pathname}.`);
			continue;
		}
		archiveDirectories.add(resolveSqliteTranscriptArchiveDirectory({
			agentId: entry.agentId,
			path: pathname
		}));
		if (seenPaths.has(pathname)) continue;
		seenPaths.add(pathname);
		try {
			const result = migrateRegisteredDatabase({
				agentId: entry.agentId,
				beforeTransaction: params.hooks?.beforeDatabaseTransaction ? () => params.hooks?.beforeDatabaseTransaction?.(pathname) : void 0,
				pathname
			});
			if (result.versionAdvanced) registerOpenClawAgentDatabase({
				agentId: entry.agentId,
				env,
				path: pathname
			});
			if (result.versionAdvanced || result.rewrittenSessions > 0 || result.rewrittenTrajectoryRows > 0) changes.push(`Migrated media persistence in ${pathname}: ${result.rewrittenSessions} transcript session(s), ${result.rewrittenTrajectoryRows} trajectory row(s), schema v16.`);
		} catch (error) {
			databaseMigrationFailed = true;
			warnings.push(`Skipped media persistence migration for ${pathname}: ${String(error)}`);
		}
	}
	if (!databaseMigrationFailed && seenPaths.size > 0) {
		const repairedFailures = repairGatewayAgentMediaMigrationStartupFailures({
			databasePaths: [...seenPaths],
			env
		});
		if (repairedFailures > 0) changes.push(`Repaired ${repairedFailures} gateway startup failure ${repairedFailures === 1 ? "record" : "records"} after media migration.`);
	}
	for (const directory of archiveDirectories) {
		let archives;
		try {
			archives = listTranscriptArchives(directory);
		} catch (error) {
			warnings.push(`Could not enumerate transcript archives in ${directory}: ${String(error)}`);
			continue;
		}
		for (const archive of archives) try {
			if (migrateTranscriptArchive(archive, { beforeReplace: params.hooks?.beforeArchiveReplace ? () => params.hooks?.beforeArchiveReplace?.(archive) : void 0 })) changes.push(`Migrated archived transcript media in ${archive}.`);
		} catch (error) {
			warnings.push(`Skipped archived transcript media migration for ${archive}: ${String(error)}`);
		}
	}
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.meeting-transcripts-database.ts
function migrationDb(db) {
	return getNodeSqliteKysely(db);
}
//#endregion
//#region src/infra/state-migrations.meeting-transcripts-files.ts
const TRANSCRIPT_EXPORT_FILE_NAMES = /* @__PURE__ */ new Set([
	"metadata.json",
	"summary.json",
	"summary.md",
	"transcript.jsonl"
]);
const LEGACY_UTTERANCE_STAGE_BATCH_SIZE = 256;
function sha256FileSync(filePath) {
	const digest = createHash("sha256");
	const descriptor = fs.openSync(filePath, "r");
	const buffer = Buffer.allocUnsafe(64 * 1024);
	try {
		while (true) {
			const bytesRead = fs.readSync(descriptor, buffer, 0, buffer.length, null);
			if (bytesRead === 0) break;
			digest.update(buffer.subarray(0, bytesRead));
		}
	} finally {
		fs.closeSync(descriptor);
	}
	return digest.digest("hex");
}
function isRecordedCanonicalTranscriptExport(params) {
	const entries = fs.readdirSync(params.sessionDir, { withFileTypes: true });
	for (const entry of entries) {
		const canonicalName = entry.name.toLowerCase();
		if (!TRANSCRIPT_EXPORT_FILE_NAMES.has(canonicalName)) continue;
		const filePath = path.join(params.sessionDir, entry.name);
		const stat = fs.lstatSync(filePath);
		if (stat.isSymbolicLink() || !stat.isFile()) return false;
		const expectedHash = params.manifest[canonicalName];
		if (params.pending?.has(canonicalName) !== true && (!expectedHash || sha256FileSync(filePath) !== expectedHash)) return false;
	}
	return true;
}
function hasMatchingRecordedTranscriptArtifact(params) {
	for (const entry of fs.readdirSync(params.sessionDir, { withFileTypes: true })) {
		const canonicalName = entry.name.toLowerCase();
		const expectedHash = params.manifest[canonicalName];
		if (!TRANSCRIPT_EXPORT_FILE_NAMES.has(canonicalName) || !expectedHash) continue;
		const filePath = path.join(params.sessionDir, entry.name);
		const stat = fs.lstatSync(filePath);
		if (!stat.isSymbolicLink() && stat.isFile() && sha256FileSync(filePath) === expectedHash) return true;
	}
	return false;
}
async function validateMeetingTranscriptRoot(rootDir, options = {}) {
	try {
		const stat = await fs$1.lstat(rootDir);
		if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`meeting transcript root must be a regular directory: ${rootDir}`);
		return true;
	} catch (error) {
		if (isRecord(error) && error.code === "ENOENT" && options.allowMissing === true) return false;
		throw error;
	}
}
function parseSession(value, sourcePath) {
	if (!isRecord(value) || typeof value.sessionId !== "string" || !value.sessionId) throw new Error(`invalid transcripts metadata sessionId at ${sourcePath}`);
	if (typeof value.startedAt !== "string" || !value.startedAt) throw new Error(`invalid transcripts metadata startedAt at ${sourcePath}`);
	if (!isRecord(value.source) || typeof value.source.providerId !== "string") throw new Error(`invalid transcripts metadata source at ${sourcePath}`);
	if (value.title !== void 0 && typeof value.title !== "string") throw new Error(`invalid transcripts metadata title at ${sourcePath}`);
	if (value.stoppedAt !== void 0 && typeof value.stoppedAt !== "string") throw new Error(`invalid transcripts metadata stoppedAt at ${sourcePath}`);
	if (value.metadata !== void 0 && !isRecord(value.metadata)) throw new Error(`invalid transcripts metadata payload at ${sourcePath}`);
	return value;
}
function parseUtterance(value, sourcePath, lineNumber) {
	if (!isRecord(value) || typeof value.text !== "string") throw new Error(`invalid transcript utterance at ${sourcePath}:${lineNumber}`);
	if (value.speaker !== void 0 && (!isRecord(value.speaker) || typeof value.speaker.label !== "string")) throw new Error(`invalid transcript speaker at ${sourcePath}:${lineNumber}`);
	return value;
}
function parseSummary(value, sourcePath) {
	if (!isRecord(value) || typeof value.sessionId !== "string" || typeof value.title !== "string" || typeof value.generatedAt !== "string" || typeof value.overview !== "string" || !Array.isArray(value.transcript) || !Array.isArray(value.decisions) || !Array.isArray(value.actionItems) || !Array.isArray(value.risks) || !Number.isSafeInteger(value.utteranceCount) || value.utteranceCount < 0) throw new Error(`invalid transcripts summary at ${sourcePath}`);
	return value;
}
function legacyTranscriptRelativeDir(session) {
	const date = session.startedAt.match(/^(\d{4}-\d{2}-\d{2})T/)?.[1];
	if (!date) throw new Error(`legacy transcript startedAt has no date: ${session.startedAt}`);
	const legacySegment = session.sessionId.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "session";
	return path.normalize(path.join(date, legacySegment));
}
async function optionalRegularFile(filePath) {
	try {
		const stat = await fs$1.lstat(filePath);
		if (stat.isSymbolicLink() || !stat.isFile()) throw new Error(`legacy transcript source must be a regular file: ${filePath}`);
		return true;
	} catch (error) {
		if (isRecord(error) && error.code === "ENOENT") return false;
		throw error;
	}
}
function openLegacyMeetingTranscriptStage(databasePath) {
	const database = openNodeSqliteDatabase(databasePath);
	database.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE staged_utterances (
      stage_key TEXT NOT NULL,
      sequence INTEGER NOT NULL,
      utterance_json TEXT NOT NULL,
      PRIMARY KEY (stage_key, sequence)
    ) STRICT;
  `);
	return database;
}
async function stageUtterances(params) {
	const filePath = params.filePath;
	if (!await optionalRegularFile(filePath)) return 0;
	const stream = createReadStream(filePath, { encoding: "utf8" });
	const lines = createInterface({
		input: stream,
		crlfDelay: Infinity
	});
	let lineNumber = 0;
	let sequence = 0;
	let pending = [];
	const insert = params.stageDatabase.prepare("INSERT INTO staged_utterances (stage_key, sequence, utterance_json) VALUES (?, ?, ?)");
	const flush = () => {
		if (pending.length === 0) return;
		params.stageDatabase.exec("BEGIN IMMEDIATE");
		try {
			for (const utteranceJson of pending) {
				insert.run(params.stageKey, sequence, utteranceJson);
				sequence += 1;
			}
			params.stageDatabase.exec("COMMIT");
			pending = [];
		} catch (error) {
			params.stageDatabase.exec("ROLLBACK");
			throw error;
		}
	};
	try {
		for await (const line of lines) {
			lineNumber += 1;
			if (!line.trim()) continue;
			const utterance = parseUtterance(JSON.parse(line), filePath, lineNumber);
			pending.push(JSON.stringify(utterance));
			if (pending.length >= LEGACY_UTTERANCE_STAGE_BATCH_SIZE) flush();
		}
		flush();
	} finally {
		lines.close();
		stream.destroy();
	}
	return sequence;
}
function readStagedMeetingTranscriptUtterances(params) {
	return params.stageDatabase.prepare("SELECT utterance_json FROM staged_utterances WHERE stage_key = ? AND sequence >= ? ORDER BY sequence ASC LIMIT ?").all(params.stageKey, params.start, params.limit).map((row) => JSON.parse(String(row.utterance_json)));
}
async function snapshotFile(filePath) {
	if (!await optionalRegularFile(filePath)) return { sizeBytes: 0 };
	const stat = await fs$1.stat(filePath);
	return {
		hash: await sha256File(filePath),
		sizeBytes: stat.size
	};
}
async function snapshotSourceFiles(files) {
	return await Promise.all(files.map(snapshotFile));
}
function sourceFilesHash(files, snapshots) {
	return sha256Hex(snapshots.map((snapshot, index) => `${path.basename(files[index] ?? "")}\0${snapshot.hash ?? "-"}`).join("\n"));
}
async function snapshotLegacyMeetingTranscriptSession(params) {
	const sourceDir = path.join(params.rootDir, params.relativeDir);
	const sourceStat = await fs$1.lstat(sourceDir);
	if (sourceStat.isSymbolicLink() || !sourceStat.isDirectory()) throw new Error(`legacy transcript session must be a regular directory: ${sourceDir}`);
	const metadataPath = path.join(sourceDir, "metadata.json");
	const transcriptPath = path.join(sourceDir, "transcript.jsonl");
	const summaryJsonPath = path.join(sourceDir, "summary.json");
	const summaryMarkdownPath = path.join(sourceDir, "summary.md");
	const files = [
		metadataPath,
		transcriptPath,
		summaryJsonPath,
		summaryMarkdownPath
	];
	const beforeSnapshots = await snapshotSourceFiles(files);
	if (!beforeSnapshots[0]?.hash) throw new Error(`legacy transcript session is missing metadata.json: ${sourceDir}`);
	const session = parseSession(JSON.parse(await fs$1.readFile(metadataPath, "utf8")), metadataPath);
	const expectedRelativeDir = legacyTranscriptRelativeDir(session);
	if (path.normalize(params.relativeDir) !== expectedRelativeDir) throw new Error(`legacy transcript selector mismatch at ${sourceDir}: expected ${expectedRelativeDir}`);
	const utteranceCount = await stageUtterances({
		filePath: transcriptPath,
		stageDatabase: params.stageDatabase,
		stageKey: params.relativeDir
	});
	const hasSummaryJson = await optionalRegularFile(summaryJsonPath);
	const hasSummaryMarkdown = await optionalRegularFile(summaryMarkdownPath);
	const summary = hasSummaryJson ? parseSummary(JSON.parse(await fs$1.readFile(summaryJsonPath, "utf8")), summaryJsonPath) : void 0;
	const markdown = hasSummaryMarkdown ? await fs$1.readFile(summaryMarkdownPath, "utf8") : summary ? renderTranscriptsMarkdown(summary) : void 0;
	if (summary && summary.sessionId !== session.sessionId) throw new Error(`legacy transcript summary session mismatch at ${summaryJsonPath}`);
	const fileSnapshots = await snapshotSourceFiles(files);
	if (fileSnapshots.some((snapshot, index) => snapshot.hash !== beforeSnapshots[index]?.hash || snapshot.sizeBytes !== beforeSnapshots[index]?.sizeBytes)) throw new Error(`legacy transcript files changed while being staged: ${sourceDir}`);
	const sourceHash = sourceFilesHash(files, fileSnapshots);
	return {
		sourceDir,
		relativeDir: params.relativeDir,
		stageKey: params.relativeDir,
		session,
		utteranceCount,
		summary,
		markdown,
		sourceHash,
		sourceSizeBytes: fileSnapshots.reduce((total, file) => total + file.sizeBytes, 0)
	};
}
async function hasLegacyTranscriptArtifacts(directory) {
	const entries = await fs$1.readdir(directory, { withFileTypes: true });
	let found = false;
	for (const entry of entries) {
		if (!TRANSCRIPT_EXPORT_FILE_NAMES.has(entry.name.toLowerCase())) continue;
		const stat = await fs$1.lstat(path.join(directory, entry.name));
		if (stat.isSymbolicLink() || !stat.isFile()) throw new Error(`legacy transcript source must be a regular file: ${directory}`);
		found = true;
	}
	return found;
}
async function listLegacyMeetingTranscriptDirs(rootDir, mode) {
	if (!await validateMeetingTranscriptRoot(rootDir, { allowMissing: true })) return [];
	let dateEntries;
	try {
		dateEntries = await fs$1.readdir(rootDir, { withFileTypes: true });
	} catch (error) {
		if (isRecord(error) && error.code === "ENOENT") return [];
		throw error;
	}
	const include = async (directory) => mode === "sessions" ? await optionalRegularFile(path.join(directory, "metadata.json")) : await hasLegacyTranscriptArtifacts(directory);
	const sessions = [];
	if (await include(rootDir)) sessions.push(".");
	for (const dateEntry of dateEntries.toSorted((a, b) => a.name.localeCompare(b.name))) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(dateEntry.name)) continue;
		if (dateEntry.isSymbolicLink()) throw new Error(`legacy transcript date directory cannot be a symlink: ${dateEntry.name}`);
		if (!dateEntry.isDirectory()) continue;
		const dateDir = path.join(rootDir, dateEntry.name);
		if (await include(dateDir)) sessions.push(dateEntry.name);
		const sessionEntries = await fs$1.readdir(dateDir, { withFileTypes: true });
		for (const sessionEntry of sessionEntries.toSorted((a, b) => a.name.localeCompare(b.name))) {
			if (sessionEntry.isSymbolicLink()) throw new Error(`legacy transcript session cannot be a symlink: ${sessionEntry.name}`);
			if (sessionEntry.isDirectory() && await include(path.join(dateDir, sessionEntry.name))) sessions.push(path.join(dateEntry.name, sessionEntry.name));
		}
	}
	return sessions;
}
async function listLegacyMeetingTranscriptSessionDirs(rootDir) {
	return await listLegacyMeetingTranscriptDirs(rootDir, "sessions");
}
async function listLegacyMeetingTranscriptArtifactDirs(rootDir) {
	return await listLegacyMeetingTranscriptDirs(rootDir, "artifacts");
}
async function archivePartialMeetingTranscriptArtifacts(params) {
	const moves = [];
	const sourceDirs = /* @__PURE__ */ new Set();
	for (const relativeDir of params.relativeDirs) {
		const sourceDir = path.join(params.sourceRoot, relativeDir);
		if (relativeDir !== ".") sourceDirs.add(sourceDir);
		const destinationDir = path.join(params.recoveryRoot, relativeDir);
		for (const entry of await fs$1.readdir(sourceDir, { withFileTypes: true })) {
			if (!TRANSCRIPT_EXPORT_FILE_NAMES.has(entry.name.toLowerCase())) continue;
			const source = path.join(sourceDir, entry.name);
			const stat = await fs$1.lstat(source);
			if (stat.isSymbolicLink() || !stat.isFile()) throw new Error(`legacy transcript source must be a regular file: ${sourceDir}`);
			const destination = path.join(destinationDir, entry.name);
			try {
				await fs$1.lstat(destination);
				throw new Error(`partial transcript recovery destination already exists: ${destination}`);
			} catch (error) {
				if (!(isRecord(error) && error.code === "ENOENT")) throw error;
			}
			moves.push({
				source,
				destination
			});
		}
	}
	for (const destinationDir of new Set(moves.map((move) => path.dirname(move.destination)))) await fs$1.mkdir(destinationDir, { recursive: true });
	const moved = [];
	try {
		for (const move of moves) {
			await fs$1.rename(move.source, move.destination);
			moved.push(move);
		}
	} catch (error) {
		const rollbackErrors = [];
		for (const move of moved.toReversed()) try {
			await fs$1.rename(move.destination, move.source);
		} catch (rollbackError) {
			rollbackErrors.push(String(rollbackError));
		}
		if (rollbackErrors.length > 0) throw new Error(`partial transcript recovery failed and rollback was incomplete; inspect ${params.recoveryRoot}: ${String(error)}; rollback errors: ${rollbackErrors.join("; ")}`, { cause: error });
		throw error;
	}
	for (const sourceDir of [...sourceDirs].toSorted((a, b) => b.length - a.length)) await fs$1.rmdir(sourceDir).catch(() => void 0);
}
async function rehashLegacyMeetingTranscriptSnapshots(snapshots) {
	for (const snapshot of snapshots) {
		const files = [
			"metadata.json",
			"transcript.jsonl",
			"summary.json",
			"summary.md"
		].map((fileName) => path.join(snapshot.sourceDir, fileName));
		if (sourceFilesHash(files, await snapshotSourceFiles(files)) !== snapshot.sourceHash) return false;
	}
	return true;
}
async function archiveLegacyMeetingTranscriptSnapshots(params) {
	await validateMeetingTranscriptRoot(params.sourceRoot);
	const currentRelativeDirs = await listLegacyMeetingTranscriptSessionDirs(params.sourceRoot);
	const expectedRelativeDirs = params.expectedRelativeDirs.toSorted((a, b) => a.localeCompare(b));
	if (JSON.stringify(currentRelativeDirs) !== JSON.stringify(expectedRelativeDirs)) throw new Error("legacy transcript session tree changed before archive");
	await fs$1.rename(params.sourceRoot, params.archiveRoot);
	try {
		if (!await rehashLegacyMeetingTranscriptSnapshots(params.snapshots.map((snapshot) => ({
			...snapshot,
			sourceDir: path.join(params.archiveRoot, path.relative(params.sourceRoot, snapshot.sourceDir) || ".")
		})))) throw new Error("legacy transcript files changed at the archive boundary");
		await restoreCanonicalMeetingTranscriptExports({
			sourceRoot: params.sourceRoot,
			archiveRoot: params.archiveRoot,
			migratedSourcePaths: params.snapshots.map((snapshot) => snapshot.sourceDir),
			canonicalRelativeDirs: params.canonicalRelativeDirs
		});
	} catch (error) {
		throw new LegacyMeetingTranscriptArchiveMovedError(error);
	}
	return params.archiveRoot;
}
var LegacyMeetingTranscriptArchiveMovedError = class extends Error {
	constructor(cause) {
		super(`legacy transcript source moved but canonical export restoration failed: ${String(cause)}`);
		this.name = "LegacyMeetingTranscriptArchiveMovedError";
	}
};
async function restoreCanonicalMeetingTranscriptExports(params) {
	await validateMeetingTranscriptRoot(params.archiveRoot);
	if (!await validateMeetingTranscriptRoot(params.sourceRoot, { allowMissing: true })) {
		await fs$1.mkdir(params.sourceRoot, { recursive: true });
		await validateMeetingTranscriptRoot(params.sourceRoot);
	}
	const migratedRelativeDirs = new Set(params.migratedSourcePaths.map((sourcePath) => path.relative(params.sourceRoot, sourcePath) || "."));
	for (const relativeDir of params.canonicalRelativeDirs) {
		const archiveRelative = path.relative(path.resolve(params.archiveRoot), path.resolve(params.archiveRoot, relativeDir));
		const sourceRelative = path.relative(path.resolve(params.sourceRoot), path.resolve(params.sourceRoot, relativeDir));
		if (!archiveRelative || archiveRelative.startsWith("..") || path.isAbsolute(archiveRelative) || !sourceRelative || sourceRelative.startsWith("..") || path.isAbsolute(sourceRelative)) throw new Error(`canonical transcript export path escaped its root: ${relativeDir}`);
		if (migratedRelativeDirs.has(relativeDir)) continue;
		const source = path.join(params.archiveRoot, relativeDir);
		const destination = path.join(params.sourceRoot, relativeDir);
		try {
			const sourceStat = await fs$1.lstat(source);
			if (sourceStat.isSymbolicLink() || !sourceStat.isDirectory()) throw new Error(`canonical transcript export source is not a directory: ${source}`);
			await assertNoSymlinkParents({
				rootDir: params.archiveRoot,
				targetPath: source,
				allowMissing: false,
				messagePrefix: "Canonical transcript export source"
			});
		} catch (error) {
			if (!(isRecord(error) && error.code === "ENOENT")) throw error;
			const destinationStat = await fs$1.lstat(destination);
			if (destinationStat.isSymbolicLink() || !destinationStat.isDirectory()) throw new Error(`canonical transcript export destination is not a directory: ${destination}`, { cause: error });
			await assertNoSymlinkParents({
				rootDir: params.sourceRoot,
				targetPath: destination,
				allowMissing: false,
				messagePrefix: "Canonical transcript export destination"
			});
			continue;
		}
		try {
			const destinationStat = await fs$1.lstat(destination);
			if (destinationStat.isSymbolicLink() || !destinationStat.isDirectory()) throw new Error(`canonical transcript export destination is not a directory: ${destination}`);
			await assertNoSymlinkParents({
				rootDir: params.sourceRoot,
				targetPath: destination,
				allowMissing: false,
				messagePrefix: "Canonical transcript export destination"
			});
			const readMetadata = async (directory) => parseSession(JSON.parse(await fs$1.readFile(path.join(directory, "metadata.json"), "utf8")), path.join(directory, "metadata.json"));
			const [sourceMetadata, destinationMetadata] = await Promise.all([readMetadata(source), readMetadata(destination)]);
			if (sourceMetadata.sessionId !== destinationMetadata.sessionId || sourceMetadata.startedAt !== destinationMetadata.startedAt) throw new Error(`canonical transcript export destination changed identity: ${destination}`);
			continue;
		} catch (error) {
			if (!(isRecord(error) && error.code === "ENOENT")) throw error;
		}
		await assertNoSymlinkParents({
			rootDir: params.sourceRoot,
			targetPath: destination,
			allowMissing: true,
			messagePrefix: "Canonical transcript export destination"
		});
		await fs$1.mkdir(path.dirname(destination), { recursive: true });
		await fs$1.rename(source, destination);
	}
}
async function archiveDivergentMeetingTranscriptExport(params) {
	const source = path.join(params.sourceRoot, params.relativeDir);
	const destination = path.join(params.recoveryRoot, params.relativeDir);
	await fs$1.mkdir(path.dirname(destination), { recursive: true });
	await fs$1.rename(source, destination);
	return destination;
}
//#endregion
//#region src/infra/state-migrations.meeting-transcripts-detection.ts
const TRANSCRIPT_ARTIFACT_NAMES = /* @__PURE__ */ new Set([
	"metadata.json",
	"summary.json",
	"summary.md",
	"transcript.jsonl"
]);
function hasLegacyArtifactsSync(directory) {
	const entries = fs.readdirSync(directory, { withFileTypes: true });
	let found = false;
	for (const entry of entries) {
		if (!TRANSCRIPT_ARTIFACT_NAMES.has(entry.name.toLowerCase())) continue;
		const stat = fs.lstatSync(path.join(directory, entry.name));
		if (stat.isSymbolicLink() || !stat.isFile()) throw new Error(`legacy transcript source must be a regular file: ${directory}`);
		found = true;
	}
	return found;
}
function resolveMeetingTranscriptExportOwnership(params) {
	const exact = params.state.exportOwnership.get(params.selector);
	if (exact) return exact;
	const folded = params.state.exportOwnershipByFoldedSelector.get(params.selector.toLowerCase());
	if (!folded || folded.length === 0) return;
	try {
		const metadataEntries = fs.readdirSync(params.sessionDir, { withFileTypes: true }).filter((entry) => entry.name.toLowerCase() === "metadata.json");
		if (metadataEntries.length > 0) {
			if (metadataEntries.length !== 1) return;
			const metadataPath = path.join(params.sessionDir, metadataEntries[0].name);
			const stat = fs.lstatSync(metadataPath);
			if (stat.isSymbolicLink() || !stat.isFile()) return;
			const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
			const matches = folded.filter((ownership) => metadata.sessionId === ownership.sessionId && metadata.startedAt === ownership.startedAt);
			return matches.length === 1 ? matches[0] : void 0;
		}
	} catch {
		return;
	}
	const manifestMatches = folded.filter((ownership) => {
		try {
			const canonicalDir = path.join(params.sourceRoot, ownership.selector);
			const canonicalStat = fs.statSync(canonicalDir);
			const observedStat = fs.statSync(params.sessionDir);
			if (canonicalStat.dev !== observedStat.dev || canonicalStat.ino !== observedStat.ino) return false;
			return hasMatchingRecordedTranscriptArtifact({
				sessionDir: params.sessionDir,
				manifest: ownership.manifest
			});
		} catch {
			return false;
		}
	});
	return manifestMatches.length === 1 ? manifestMatches[0] : void 0;
}
function detectLegacyMeetingTranscripts(params) {
	const sourceDir = path.join(params.stateDir, "transcripts");
	if (params.doctorOnlyStateMigrations !== true) return {
		sourceDir,
		hasLegacy: false,
		pendingImportCount: 0
	};
	const databaseState = readMeetingTranscriptMigrationDetectionState({ env: {
		...params.env ?? process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} });
	const pendingImportCount = databaseState.pendingImportCount;
	try {
		const rootStat = fs.lstatSync(sourceDir);
		if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) throw new Error(`meeting transcript root must be a regular directory: ${sourceDir}`);
		const dateEntries = fs.readdirSync(sourceDir, { withFileTypes: true });
		const sourceSelectors = hasLegacyArtifactsSync(sourceDir) ? ["."] : [];
		for (const dateEntry of dateEntries) {
			if (!/^\d{4}-\d{2}-\d{2}$/.test(dateEntry.name)) continue;
			if (dateEntry.isSymbolicLink()) throw new Error(`legacy transcript date directory cannot be a symlink: ${dateEntry.name}`);
			if (!dateEntry.isDirectory()) continue;
			const dateDir = path.join(sourceDir, dateEntry.name);
			if (hasLegacyArtifactsSync(dateDir)) sourceSelectors.push(dateEntry.name);
			for (const entry of fs.readdirSync(dateDir, { withFileTypes: true })) {
				if (entry.isSymbolicLink()) throw new Error(`legacy transcript session cannot be a symlink: ${entry.name}`);
				if (entry.isDirectory() && hasLegacyArtifactsSync(path.join(dateDir, entry.name))) sourceSelectors.push(`${dateEntry.name}/${entry.name}`);
			}
		}
		return {
			sourceDir,
			hasLegacy: sourceSelectors.some((selector) => {
				const ownership = resolveMeetingTranscriptExportOwnership({
					state: databaseState,
					selector,
					sessionDir: path.join(sourceDir, selector),
					sourceRoot: sourceDir
				});
				return !ownership || !isRecordedCanonicalTranscriptExport({
					sessionDir: path.join(sourceDir, selector),
					manifest: ownership.manifest,
					pending: ownership.pending
				});
			}) || pendingImportCount > 0,
			pendingImportCount
		};
	} catch (error) {
		if (isRecord(error) && error.code === "ENOENT") return {
			sourceDir,
			hasLegacy: pendingImportCount > 0,
			pendingImportCount
		};
		throw error;
	}
}
function readMeetingTranscriptMigrationDetectionState(params) {
	const databasePath = resolveOpenClawStateSqlitePath(params.env);
	if (!fs.existsSync(databasePath)) return {
		exportOwnership: /* @__PURE__ */ new Map(),
		exportOwnershipByFoldedSelector: /* @__PURE__ */ new Map(),
		pendingImportCount: 0
	};
	const database = openNodeSqliteDatabase(databasePath, { readOnly: true });
	try {
		const tables = new Set(database.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name IN ('meeting_transcript_sessions', 'migration_sources')").all().map((row) => String(row.name)));
		const exportOwnership = /* @__PURE__ */ new Map();
		const exportOwnershipByFoldedSelector = /* @__PURE__ */ new Map();
		if (tables.has("meeting_transcript_sessions")) {
			const rows = database.prepare("SELECT session_id, started_at, selector, export_manifest_json, export_pending_json FROM meeting_transcript_sessions").all();
			for (const row of rows) {
				const selector = String(row.selector);
				const parsed = JSON.parse(String(row.export_manifest_json));
				if (isRecord(parsed)) {
					const ownership = {
						selector,
						sessionId: String(row.session_id),
						startedAt: String(row.started_at),
						manifest: parsed,
						pending: new Set(JSON.parse(String(row.export_pending_json)))
					};
					exportOwnership.set(selector, ownership);
					const foldedSelector = selector.toLowerCase();
					const foldedOwners = exportOwnershipByFoldedSelector.get(foldedSelector) ?? [];
					foldedOwners.push(ownership);
					exportOwnershipByFoldedSelector.set(foldedSelector, foldedOwners);
				}
			}
		}
		const pendingRow = tables.has("migration_sources") ? database.prepare("SELECT COUNT(*) AS count FROM migration_sources WHERE migration_kind = ? AND status = ? AND removed_source = 0").get("meeting-transcripts-files-v1", "imported") : void 0;
		return {
			exportOwnership,
			exportOwnershipByFoldedSelector,
			pendingImportCount: typeof pendingRow?.count === "number" ? pendingRow.count : 0
		};
	} finally {
		database.close();
	}
}
//#endregion
//#region src/infra/state-migrations.meeting-transcripts-insert.ts
function insertMeetingTranscriptSnapshots(params) {
	runOpenClawStateWriteTransaction(({ db: database }) => {
		const db = migrationDb(database);
		recordLegacyMigrationRun(database, {
			runId: params.runId,
			startedAt: params.now,
			finishedAt: null,
			status: "imported",
			reportJson: JSON.stringify({
				format: "meeting-transcripts-files-v1",
				sessions: params.snapshots.length,
				utterances: params.snapshots.reduce((total, snapshot) => total + snapshot.utteranceCount, 0),
				archiveRoot: params.archiveRoot,
				canonicalRelativeDirs: params.canonicalRelativeDirs
			})
		});
		for (const snapshot of params.snapshots) {
			executeSqliteQuerySync(database, db.insertInto("meeting_transcript_sessions").values({
				session_id: snapshot.session.sessionId,
				started_at: snapshot.session.startedAt,
				selector: transcriptSessionSelector(snapshot.session),
				export_key: transcriptSessionExportKey(snapshot.session),
				session_slug: safeTranscriptPathSegment(snapshot.session.sessionId),
				provider_id: snapshot.session.source.providerId,
				title: snapshot.session.title ?? null,
				source_json: JSON.stringify(snapshot.session.source),
				stopped_at: snapshot.session.stoppedAt ?? null,
				metadata_json: snapshot.session.metadata ? JSON.stringify(snapshot.session.metadata) : null,
				export_manifest_json: "{}",
				export_pending_json: "[]",
				next_utterance_seq: snapshot.utteranceCount,
				created_at_ms: params.now,
				updated_at_ms: params.now
			}));
			if (snapshot.utteranceCount > 0) for (let start = 0; start < snapshot.utteranceCount; start += 64) {
				const chunk = readStagedMeetingTranscriptUtterances({
					stageDatabase: params.stageDatabase,
					stageKey: snapshot.stageKey,
					start,
					limit: 64
				});
				executeSqliteQuerySync(database, db.insertInto("meeting_transcript_utterances").values(chunk.map((utterance, offset) => ({
					session_id: snapshot.session.sessionId,
					session_started_at: snapshot.session.startedAt,
					sequence: start + offset,
					utterance_id: utterance.id ?? null,
					started_at: utterance.startedAt ?? null,
					ended_at: utterance.endedAt ?? null,
					speaker_id: utterance.speaker?.id ?? null,
					speaker_label: utterance.speaker?.label ?? null,
					text: utterance.text,
					final: utterance.final === void 0 ? null : utterance.final ? 1 : 0,
					metadata_json: utterance.metadata ? JSON.stringify(utterance.metadata) : null
				}))));
			}
			if (snapshot.summary !== void 0 || snapshot.markdown !== void 0) executeSqliteQuerySync(database, db.insertInto("meeting_transcript_summaries").values({
				session_id: snapshot.session.sessionId,
				session_started_at: snapshot.session.startedAt,
				generated_at: snapshot.summary?.generatedAt ?? null,
				summary_json: snapshot.summary ? JSON.stringify(snapshot.summary) : null,
				markdown: snapshot.markdown ?? null,
				utterance_count: snapshot.summary?.utteranceCount ?? snapshot.utteranceCount
			}));
			recordLegacyMigrationSource(database, {
				sourceKey: resolveLegacyMigrationSourceKey("meeting-transcripts", snapshot.sourceDir),
				migrationKind: "meeting-transcripts-files-v1",
				sourcePath: snapshot.sourceDir,
				targetTable: "meeting_transcript_sessions",
				sourceSha256: snapshot.sourceHash,
				sourceSizeBytes: snapshot.sourceSizeBytes,
				sourceRecordCount: snapshot.utteranceCount,
				runId: params.runId,
				status: "imported",
				importedAt: params.now,
				reportJson: JSON.stringify({ selector: transcriptSessionSelector(snapshot.session) }),
				upsert: true,
				updateReportOnConflict: false
			});
		}
	}, { env: {
		...params.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} }, { operationLabel: "meeting-transcripts.legacy-import" });
}
//#endregion
//#region src/infra/state-migrations.meeting-transcripts-verify.ts
function storedUtteranceFromRow(row) {
	const utterance = {
		sessionId: row.session_id,
		text: row.text
	};
	if (row.utterance_id !== null) utterance.id = row.utterance_id;
	if (row.started_at !== null) utterance.startedAt = row.started_at;
	if (row.ended_at !== null) utterance.endedAt = row.ended_at;
	if (row.speaker_label !== null) {
		const speaker = { label: row.speaker_label };
		if (row.speaker_id !== null) speaker.id = row.speaker_id;
		utterance.speaker = speaker;
	}
	if (row.final !== null) utterance.final = row.final === 1;
	if (row.metadata_json) utterance.metadata = JSON.parse(row.metadata_json);
	return utterance;
}
async function verifyImportedMeetingTranscriptSnapshots(params) {
	const selectUtterances = params.database.prepare(`
    SELECT
      ended_at,
      final,
      metadata_json,
      session_id,
      speaker_id,
      speaker_label,
      started_at,
      text,
      utterance_id
    FROM meeting_transcript_utterances
    WHERE session_id = ? AND session_started_at = ?
    ORDER BY sequence ASC
    LIMIT ? OFFSET ?
  `);
	for (const snapshot of params.snapshots) {
		const session = await params.store.readSession(transcriptSessionSelector(snapshot.session));
		if (!session || stableStringify(session) !== stableStringify(snapshot.session)) throw new Error(`meeting transcript import verification failed: ${snapshot.relativeDir}`);
		for (let start = 0; start < snapshot.utteranceCount; start += 64) {
			const expected = readStagedMeetingTranscriptUtterances({
				stageDatabase: params.stageDatabase,
				stageKey: snapshot.stageKey,
				start,
				limit: 64
			});
			if (stableStringify(selectUtterances.all(snapshot.session.sessionId, snapshot.session.startedAt, 64, start).map((row) => storedUtteranceFromRow(row))) !== stableStringify(expected)) throw new Error(`meeting transcript import verification failed: ${snapshot.relativeDir}`);
		}
		const summary = await params.store.readSummary(session);
		if (stableStringify(summary.summary) !== stableStringify(snapshot.summary) || stableStringify(summary.markdown?.trimEnd()) !== stableStringify(snapshot.markdown?.trimEnd())) throw new Error(`meeting transcript summary verification failed: ${snapshot.relativeDir}`);
	}
}
//#endregion
//#region src/infra/state-migrations.meeting-transcripts.ts
function resolveArchiveRoot(sourceRoot, now) {
	const base = `${sourceRoot}.migrated-${new Date(now).toISOString().replace(/[:.]/g, "-")}`;
	return fs.existsSync(base) ? `${base}-${randomUUID()}` : base;
}
function rollbackImportedSnapshots(params) {
	runOpenClawStateWriteTransaction(({ db: database }) => {
		const db = migrationDb(database);
		for (const snapshot of params.snapshots) executeSqliteQuerySync(database, db.deleteFrom("meeting_transcript_sessions").where("session_id", "=", snapshot.session.sessionId).where("started_at", "=", snapshot.session.startedAt));
		executeSqliteQuerySync(database, db.deleteFrom("migration_sources").where("last_run_id", "=", params.runId));
		executeSqliteQuerySync(database, db.deleteFrom("migration_runs").where("id", "=", params.runId));
	}, { env: {
		...params.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} }, { operationLabel: "meeting-transcripts.legacy-import.rollback" });
}
function finishPendingMigration(params) {
	runOpenClawStateWriteTransaction(({ db: database }) => {
		const db = migrationDb(database);
		executeSqliteQuerySync(database, db.updateTable("migration_sources").set({
			status: "archived",
			removed_source: 1
		}).where("last_run_id", "=", params.runId).where("migration_kind", "=", "meeting-transcripts-files-v1"));
		const run = executeSqliteQueryTakeFirstSync(database, db.selectFrom("migration_runs").select("report_json").where("id", "=", params.runId));
		const report = run ? JSON.parse(run.report_json) : {};
		executeSqliteQuerySync(database, db.updateTable("migration_runs").set({
			finished_at: params.now,
			status: "completed",
			report_json: JSON.stringify({
				...report,
				archiveRoot: params.archiveRoot
			})
		}).where("id", "=", params.runId));
	}, { env: {
		...params.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} }, { operationLabel: "meeting-transcripts.legacy-import.finish" });
}
function isStrictRelativePathWithinRoot(root, relativePath) {
	if (!relativePath || relativePath === "." || path.isAbsolute(relativePath)) return false;
	const resolvedRoot = path.resolve(root);
	const resolvedPath = path.resolve(resolvedRoot, relativePath);
	const relative = path.relative(resolvedRoot, resolvedPath);
	return Boolean(relative && !relative.startsWith("..") && !path.isAbsolute(relative));
}
async function snapshotPendingImportRun(params) {
	const snapshots = [];
	let hashesMatch = true;
	for (const source of params.run.sources) {
		const relativeDir = path.relative(params.sourceRoot, source.sourcePath) || ".";
		if (relativeDir.startsWith("..") || path.isAbsolute(relativeDir)) throw new Error(`pending meeting transcript source escaped its root: ${source.sourcePath}`);
		const snapshot = await snapshotLegacyMeetingTranscriptSession({
			rootDir: params.snapshotRoot,
			relativeDir,
			stageDatabase: params.stageDatabase
		});
		snapshots.push(snapshot);
		hashesMatch &&= snapshot.sourceHash === source.sourceHash;
	}
	return {
		snapshots,
		hashesMatch
	};
}
function readPendingImportRuns(params) {
	const database = openOpenClawStateDatabase({ env: {
		...params.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} });
	const db = migrationDb(database.db);
	const rows = executeSqliteQuerySync(database.db, db.selectFrom("migration_sources as source").innerJoin("migration_runs as run", "run.id", "source.last_run_id").select([
		"source.last_run_id as run_id",
		"source.source_path",
		"source.source_sha256",
		"run.report_json as run_report_json"
	]).where("source.migration_kind", "=", "meeting-transcripts-files-v1").where("source.status", "=", "imported").where("source.removed_source", "=", 0).orderBy("source.source_path", "asc")).rows;
	const runs = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const report = JSON.parse(row.run_report_json);
		const format = report.format;
		const archiveRoot = report.archiveRoot;
		const canonicalRelativeDirs = report.canonicalRelativeDirs;
		if (typeof archiveRoot !== "string" || format !== "meeting-transcripts-files-v1" || !archiveRoot.startsWith(`${params.sourceRoot}.migrated-`) || !Array.isArray(canonicalRelativeDirs) || !canonicalRelativeDirs.every((relativeDir) => typeof relativeDir === "string" && isStrictRelativePathWithinRoot(params.sourceRoot, relativeDir)) || typeof row.source_sha256 !== "string") throw new Error(`invalid pending meeting transcript migration receipt: ${row.run_id}`);
		const run = runs.get(row.run_id) ?? {
			runId: row.run_id,
			archiveRoot,
			canonicalRelativeDirs,
			sources: []
		};
		if (run.archiveRoot !== archiveRoot || JSON.stringify(run.canonicalRelativeDirs) !== JSON.stringify(canonicalRelativeDirs)) throw new Error(`conflicting meeting transcript archive receipts: ${row.run_id}`);
		run.sources.push({
			sourcePath: row.source_path,
			sourceHash: row.source_sha256
		});
		runs.set(row.run_id, run);
	}
	return [...runs.values()];
}
async function listCanonicalMeetingTranscriptExportDirs(params) {
	const state = readMeetingTranscriptMigrationDetectionState({ env: params.env });
	return (await listLegacyMeetingTranscriptArtifactDirs(params.rootDir)).filter((relativeDir) => {
		const selector = relativeDir.split(path.sep).join("/");
		const sessionDir = path.join(params.rootDir, relativeDir);
		const ownership = resolveMeetingTranscriptExportOwnership({
			state,
			selector,
			sessionDir,
			sourceRoot: params.rootDir
		});
		return Boolean(ownership && isRecordedCanonicalTranscriptExport({
			sessionDir,
			manifest: ownership.manifest,
			pending: ownership.pending
		}));
	});
}
async function resumePendingImports(params) {
	const runs = readPendingImportRuns(params);
	if (runs.length === 0) return;
	const changes = [];
	const warnings = [];
	for (const run of runs) {
		if (fs.existsSync(run.archiveRoot)) {
			try {
				const archived = await snapshotPendingImportRun({
					run,
					snapshotRoot: run.archiveRoot,
					sourceRoot: params.sourceRoot,
					stageDatabase: params.stageDatabase
				});
				if (!archived.hashesMatch) throw new Error("archived source hashes do not match migration receipts");
				const database = openOpenClawStateDatabase({ env: {
					...params.env,
					OPENCLAW_STATE_DIR: params.stateDir
				} });
				await verifyImportedMeetingTranscriptSnapshots({
					store: params.store,
					snapshots: archived.snapshots,
					stageDatabase: params.stageDatabase,
					database: database.db
				});
				await restoreCanonicalMeetingTranscriptExports({
					sourceRoot: params.sourceRoot,
					archiveRoot: run.archiveRoot,
					migratedSourcePaths: run.sources.map((source) => source.sourcePath),
					canonicalRelativeDirs: run.canonicalRelativeDirs
				});
				finishPendingMigration({
					runId: run.runId,
					archiveRoot: run.archiveRoot,
					now: Date.now(),
					env: params.env,
					stateDir: params.stateDir
				});
				changes.push(`Finalized interrupted meeting transcript archive → ${run.archiveRoot}`);
			} catch (error) {
				warnings.push(`Pending meeting transcript migration ${run.runId} archive could not be verified or restored; left its rows and files for recovery: ${String(error)}`);
			}
			continue;
		}
		if (!fs.existsSync(params.sourceRoot)) {
			warnings.push(`Pending meeting transcript migration ${run.runId} has neither source tree nor archive`);
			continue;
		}
		const canonicalRelativeDirs = [.../* @__PURE__ */ new Set([...run.canonicalRelativeDirs, ...await listCanonicalMeetingTranscriptExportDirs({
			rootDir: params.sourceRoot,
			env: {
				...params.env,
				OPENCLAW_STATE_DIR: params.stateDir
			}
		})])];
		const expectedRelativeDirs = [.../* @__PURE__ */ new Set([...run.sources.map((source) => path.relative(params.sourceRoot, source.sourcePath) || "."), ...canonicalRelativeDirs])].toSorted((a, b) => a.localeCompare(b));
		const pending = await snapshotPendingImportRun({
			run,
			snapshotRoot: params.sourceRoot,
			sourceRoot: params.sourceRoot,
			stageDatabase: params.stageDatabase
		});
		if (!pending.hashesMatch) {
			warnings.push(`Pending meeting transcript migration ${run.runId} source tree changed; left its imported rows and files for manual recovery`);
			continue;
		}
		const database = openOpenClawStateDatabase({ env: {
			...params.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		await verifyImportedMeetingTranscriptSnapshots({
			store: params.store,
			snapshots: pending.snapshots,
			stageDatabase: params.stageDatabase,
			database: database.db
		});
		await archiveLegacyMeetingTranscriptSnapshots({
			sourceRoot: params.sourceRoot,
			snapshots: pending.snapshots,
			expectedRelativeDirs,
			canonicalRelativeDirs,
			archiveRoot: run.archiveRoot
		});
		finishPendingMigration({
			runId: run.runId,
			archiveRoot: run.archiveRoot,
			now: Date.now(),
			env: params.env,
			stateDir: params.stateDir
		});
		changes.push(`Resumed and archived meeting transcript migration → ${run.archiveRoot}`);
	}
	return {
		changes,
		warnings
	};
}
async function migrateLegacyMeetingTranscripts(params) {
	const detected = params.detected;
	if (!detected?.hasLegacy) return {
		changes: [],
		warnings: []
	};
	const env = params.env ?? process.env;
	let lock;
	try {
		lock = await acquireGatewayLock({
			allowInTests: true,
			env: {
				...env,
				OPENCLAW_STATE_DIR: params.stateDir
			},
			role: "sqlite-maintenance",
			timeoutMs: 5e3
		});
	} catch (error) {
		return {
			changes: [],
			warnings: [`Skipped meeting transcript migration because exclusive state ownership is unavailable: ${String(error)}`]
		};
	}
	if (!lock) return {
		changes: [],
		warnings: ["Skipped meeting transcript migration because exclusive state ownership is unavailable"]
	};
	let stageDatabase;
	let stagePath;
	const recoveryChanges = [];
	try {
		fs.mkdirSync(params.stateDir, { recursive: true });
		stagePath = path.join(params.stateDir, `.meeting-transcripts-migration-${randomUUID()}.sqlite`);
		const stage = openLegacyMeetingTranscriptStage(stagePath);
		stageDatabase = stage;
		await validateMeetingTranscriptRoot(detected.sourceDir, { allowMissing: true });
		const databaseOptions = { env: {
			...env,
			OPENCLAW_STATE_DIR: params.stateDir
		} };
		ensureMeetingTranscriptsSchema(databaseOptions);
		const store = new TranscriptsStore(detected.sourceDir, databaseOptions);
		const resumed = await resumePendingImports({
			env,
			stateDir: params.stateDir,
			sourceRoot: detected.sourceDir,
			store,
			stageDatabase: stage
		});
		if (resumed) return resumed;
		const now = params.now?.() ?? Date.now();
		const relativeDirs = await listLegacyMeetingTranscriptArtifactDirs(detected.sourceDir);
		const sessionRelativeDirs = await listLegacyMeetingTranscriptSessionDirs(detected.sourceDir);
		const sessionRelativeDirSet = new Set(sessionRelativeDirs);
		const detectionState = readMeetingTranscriptMigrationDetectionState({ env: {
			...env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		const legacyRelativeDirs = [];
		const partialRelativeDirs = [];
		const divergentExportDirs = [];
		for (const relativeDir of relativeDirs) {
			const ownership = resolveMeetingTranscriptExportOwnership({
				state: detectionState,
				selector: relativeDir.split(path.sep).join("/"),
				sessionDir: path.join(detected.sourceDir, relativeDir),
				sourceRoot: detected.sourceDir
			});
			if (ownership && isRecordedCanonicalTranscriptExport({
				sessionDir: path.join(detected.sourceDir, relativeDir),
				manifest: ownership.manifest,
				pending: ownership.pending
			})) continue;
			if (ownership) divergentExportDirs.push({
				relativeDir,
				ownerSelector: ownership.selector
			});
			else if (!sessionRelativeDirSet.has(relativeDir)) partialRelativeDirs.push(relativeDir);
			else legacyRelativeDirs.push(relativeDir);
		}
		const snapshots = [];
		for (const relativeDir of legacyRelativeDirs) snapshots.push(await snapshotLegacyMeetingTranscriptSession({
			rootDir: detected.sourceDir,
			relativeDir,
			stageDatabase: stage
		}));
		const plans = [];
		for (const snapshot of snapshots) {
			const database = openOpenClawStateDatabase(databaseOptions);
			if (executeSqliteQueryTakeFirstSync(database.db, migrationDb(database.db).selectFrom("meeting_transcript_sessions").select("session_id").where("session_id", "=", snapshot.session.sessionId).where("started_at", "=", snapshot.session.startedAt))) throw new Error(`legacy transcript conflicts with canonical SQLite state: ${snapshot.relativeDir}`);
			plans.push(snapshot);
		}
		if (divergentExportDirs.length > 0) {
			const recoveryRoot = `${detected.sourceDir}.exports-recovered-${new Date(now).toISOString().replace(/[:.]/g, "-")}`;
			for (const { relativeDir, ownerSelector } of divergentExportDirs) {
				const session = await store.readSession(ownerSelector);
				if (!session) throw new Error(`divergent transcript export has no SQLite owner: ${relativeDir}`);
				await archiveDivergentMeetingTranscriptExport({
					sourceRoot: detected.sourceDir,
					relativeDir,
					recoveryRoot
				});
				recoveryChanges.push(`Archived modified meeting transcript export ${relativeDir} → ${recoveryRoot}`);
				await store.materializeSessionArtifacts(session, "all");
			}
		}
		if (plans.length === 0 && partialRelativeDirs.length > 0) {
			const recoveryRoot = `${detected.sourceDir}.partials-recovered-${new Date(now).toISOString().replace(/[:.]/g, "-")}`;
			await archivePartialMeetingTranscriptArtifacts({
				sourceRoot: detected.sourceDir,
				relativeDirs: partialRelativeDirs,
				recoveryRoot
			});
			recoveryChanges.push(`Archived ${partialRelativeDirs.length} incomplete meeting transcript director${partialRelativeDirs.length === 1 ? "y" : "ies"} → ${recoveryRoot}`);
		}
		const expectedArchiveRelativeDirs = await listLegacyMeetingTranscriptSessionDirs(detected.sourceDir);
		if (plans.length === 0) return {
			changes: recoveryChanges,
			warnings: []
		};
		const runId = randomUUID();
		const archiveRoot = resolveArchiveRoot(detected.sourceDir, now);
		const canonicalRelativeDirs = await listCanonicalMeetingTranscriptExportDirs({
			rootDir: detected.sourceDir,
			env: {
				...env,
				OPENCLAW_STATE_DIR: params.stateDir
			}
		});
		insertMeetingTranscriptSnapshots({
			snapshots: plans,
			runId,
			now,
			archiveRoot,
			canonicalRelativeDirs,
			stageDatabase: stage,
			env,
			stateDir: params.stateDir
		});
		try {
			await verifyImportedMeetingTranscriptSnapshots({
				store,
				snapshots: plans,
				stageDatabase: stage,
				database: openOpenClawStateDatabase(databaseOptions).db
			});
			if (!await rehashLegacyMeetingTranscriptSnapshots(plans)) {
				rollbackImportedSnapshots({
					snapshots: plans,
					runId,
					env,
					stateDir: params.stateDir
				});
				return {
					changes: recoveryChanges,
					warnings: ["Legacy meeting transcript files changed after import; rolled back SQLite rows and left every source in place for a Doctor retry"]
				};
			}
		} catch (error) {
			rollbackImportedSnapshots({
				snapshots: plans,
				runId,
				env,
				stateDir: params.stateDir
			});
			throw error;
		}
		params.testHooks?.afterImport?.();
		let archiveRootAfterMove;
		try {
			archiveRootAfterMove = await archiveLegacyMeetingTranscriptSnapshots({
				sourceRoot: detected.sourceDir,
				snapshots: plans,
				expectedRelativeDirs: expectedArchiveRelativeDirs,
				canonicalRelativeDirs,
				archiveRoot
			});
		} catch (error) {
			if (error instanceof LegacyMeetingTranscriptArchiveMovedError) return {
				changes: [...recoveryChanges, `Imported ${plans.length} meeting transcript session${plans.length === 1 ? "" : "s"} into shared SQLite state`],
				warnings: [`Meeting transcript archive needs Doctor resume after moving the source tree: ${String(error)}`]
			};
			rollbackImportedSnapshots({
				snapshots: plans,
				runId,
				env,
				stateDir: params.stateDir
			});
			return {
				changes: recoveryChanges,
				warnings: [`Failed archiving verified legacy meeting transcripts; rolled back SQLite rows and left every source in place for Doctor retry: ${String(error)}`]
			};
		}
		params.testHooks?.afterArchive?.();
		finishPendingMigration({
			runId,
			archiveRoot: archiveRootAfterMove,
			now,
			env,
			stateDir: params.stateDir
		});
		const utteranceCount = plans.reduce((total, snapshot) => total + snapshot.utteranceCount, 0);
		return {
			changes: [
				...recoveryChanges,
				`Migrated ${plans.length} meeting transcript session${plans.length === 1 ? "" : "s"} and ${utteranceCount} utterance${utteranceCount === 1 ? "" : "s"} to shared SQLite state`,
				`Archived legacy meeting transcript files → ${archiveRootAfterMove}`
			],
			warnings: []
		};
	} catch (error) {
		return {
			changes: recoveryChanges,
			warnings: [`Failed migrating meeting transcripts: ${String(error)}`]
		};
	} finally {
		try {
			stageDatabase?.close();
			if (stagePath) {
				fs.rmSync(stagePath, { force: true });
				fs.rmSync(`${stagePath}-shm`, { force: true });
				fs.rmSync(`${stagePath}-wal`, { force: true });
			}
		} finally {
			await lock.release();
		}
	}
}
//#endregion
//#region src/infra/state-migrations.messages.ts
function mergeNotices(sources) {
	return [...new Set(sources.flatMap((source) => source?.notices ? [...source.notices] : []))];
}
//#endregion
//#region src/infra/state-migrations.node-host.ts
const LEGACY_NODE_HOST_MAX_BYTES = 64 * 1024;
const CONFIG_KEYS = /* @__PURE__ */ new Set([
	"version",
	"nodeId",
	"token",
	"displayName",
	"gateway"
]);
const GATEWAY_KEYS = /* @__PURE__ */ new Set([
	"host",
	"port",
	"tls",
	"tlsFingerprint",
	"contextPath"
]);
/** Detect retired node-host state only when an explicit Doctor flow opts in. */
function detectLegacyNodeHostConfig(params) {
	const sourcePath = path.join(params.stateDir, LEGACY_NODE_HOST_CONFIG_FILE);
	return {
		sourcePath,
		hasLegacy: params.doctorOnlyStateMigrations === true && legacyMigrationSourceOrClaimMayExist(sourcePath, ".doctor-importing")
	};
}
function assertOnlyKeys$1(value, allowed, label) {
	const unexpected = Object.keys(value).find((key) => !allowed.has(key));
	if (unexpected) throw new Error(`${label} has unexpected field ${unexpected}`);
}
function optionalLegacyString(value, label) {
	if (value === void 0) return;
	if (typeof value !== "string" || !value.trim()) throw new Error(`${label} must be a non-empty string`);
	return value.trim();
}
function optionalLegacyContextPath(value) {
	if (value === void 0) return;
	if (typeof value !== "string") throw new Error("legacy node-host gateway contextPath must be a string");
	return value.trim() || void 0;
}
function parseLegacyGateway(value) {
	if (value === void 0) return;
	if (!isRecord(value)) throw new Error("legacy node-host gateway must be an object");
	assertOnlyKeys$1(value, GATEWAY_KEYS, "legacy node-host gateway");
	const port = value.port;
	if (port !== void 0 && (typeof port !== "number" || !Number.isSafeInteger(port) || port <= 0 || port > 65535)) throw new Error("legacy node-host gateway port is invalid");
	if (value.tls !== void 0 && typeof value.tls !== "boolean") throw new Error("legacy node-host gateway tls must be a boolean");
	const gateway = {
		host: optionalLegacyString(value.host, "legacy node-host gateway host"),
		port,
		tls: value.tls,
		tlsFingerprint: optionalLegacyString(value.tlsFingerprint, "legacy node-host gateway tlsFingerprint"),
		contextPath: optionalLegacyContextPath(value.contextPath)
	};
	return Object.values(gateway).some((entry) => entry !== void 0) ? gateway : void 0;
}
function parseLegacyNodeHostConfig(snapshot) {
	const parsed = JSON.parse(snapshot.raw);
	if (!isRecord(parsed)) throw new Error("legacy node-host config must be an object");
	assertOnlyKeys$1(parsed, CONFIG_KEYS, "legacy node-host config");
	if (parsed.version !== 1) throw new Error("legacy node-host config version must be 1");
	if (typeof parsed.nodeId !== "string" || !parsed.nodeId.trim()) throw new Error("legacy node-host nodeId must be a non-empty string");
	if (parsed.token !== void 0 && typeof parsed.token !== "string") throw new Error("legacy node-host token must be a string when present");
	return {
		config: {
			version: 1,
			nodeId: parsed.nodeId.trim(),
			displayName: optionalLegacyString(parsed.displayName, "legacy node-host displayName"),
			gateway: parseLegacyGateway(parsed.gateway)
		},
		updatedAtMs: Math.max(0, Math.floor(snapshot.mtimeMs))
	};
}
function nullableNonEmptyString(value, label) {
	if (value === null) return;
	if (!value.trim()) throw new Error(`invalid node-host SQLite row: ${label} must not be empty`);
	return value.trim();
}
function rowToCanonicalState(row) {
	if (row.version !== 1 || !row.node_id.trim()) throw new Error("invalid canonical node-host SQLite identity");
	if (!Number.isSafeInteger(row.updated_at_ms) || row.updated_at_ms < 0) throw new Error("invalid canonical node-host SQLite timestamp");
	if (row.gateway_port !== null && (!Number.isSafeInteger(row.gateway_port) || row.gateway_port <= 0 || row.gateway_port > 65535)) throw new Error("invalid canonical node-host SQLite gateway port");
	if (row.gateway_tls !== null && row.gateway_tls !== 0 && row.gateway_tls !== 1) throw new Error("invalid canonical node-host SQLite gateway tls");
	const gateway = {
		host: nullableNonEmptyString(row.gateway_host, "gateway_host"),
		port: row.gateway_port ?? void 0,
		tls: row.gateway_tls === null ? void 0 : row.gateway_tls === 1,
		tlsFingerprint: nullableNonEmptyString(row.gateway_tls_fingerprint, "gateway_tls_fingerprint"),
		contextPath: nullableNonEmptyString(row.gateway_context_path, "gateway_context_path")
	};
	return {
		config: {
			version: 1,
			nodeId: row.node_id.trim(),
			displayName: nullableNonEmptyString(row.display_name, "display_name"),
			gateway: Object.values(gateway).some((entry) => entry !== void 0) ? gateway : void 0
		},
		updatedAtMs: row.updated_at_ms
	};
}
function configsEqual(left, right) {
	return left.nodeId === right.nodeId && left.displayName === right.displayName && left.gateway?.host === right.gateway?.host && left.gateway?.port === right.gateway?.port && left.gateway?.tls === right.gateway?.tls && left.gateway?.tlsFingerprint === right.gateway?.tlsFingerprint && left.gateway?.contextPath === right.gateway?.contextPath;
}
function writeCanonicalState(db, state) {
	const gateway = state.config.gateway;
	const row = {
		config_key: NODE_HOST_CONFIG_KEY,
		version: 1,
		node_id: state.config.nodeId,
		token: null,
		display_name: state.config.displayName ?? null,
		gateway_host: gateway?.host ?? null,
		gateway_port: gateway?.port ?? null,
		gateway_tls: gateway?.tls === void 0 ? null : gateway.tls ? 1 : 0,
		gateway_tls_fingerprint: gateway?.tlsFingerprint ?? null,
		gateway_context_path: gateway?.contextPath ?? null,
		updated_at_ms: state.updatedAtMs
	};
	const { config_key: _configKey, ...updates } = row;
	executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("node_host_config").values(row).onConflict((conflict) => conflict.column("config_key").doUpdateSet(updates)));
}
function migrateIntoDatabase$1(params) {
	let imported = false;
	let preservedCanonical = false;
	runOpenClawStateWriteTransaction(({ db }) => {
		const stateDb = getNodeSqliteKysely(db);
		const row = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("node_host_config").selectAll().where("config_key", "=", NODE_HOST_CONFIG_KEY));
		const existing = row ? rowToCanonicalState(row) : null;
		if (existing && existing.config.nodeId !== params.legacy.config.nodeId) throw new Error("legacy node-host nodeId conflicts with canonical SQLite identity");
		let expected = params.legacy;
		if (existing) {
			if (configsEqual(existing.config, params.legacy.config)) expected = existing.updatedAtMs >= params.legacy.updatedAtMs ? existing : params.legacy;
			else if (existing.updatedAtMs === params.legacy.updatedAtMs) throw new Error("legacy node-host config diverges at the same timestamp");
			else if (existing.updatedAtMs > params.legacy.updatedAtMs) {
				expected = existing;
				preservedCanonical = true;
			}
		}
		if (!existing || !configsEqual(existing.config, expected.config) || existing.updatedAtMs !== expected.updatedAtMs || row?.token !== null) {
			writeCanonicalState(db, expected);
			imported = expected === params.legacy;
		}
		const verifiedRow = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("node_host_config").selectAll().where("config_key", "=", NODE_HOST_CONFIG_KEY));
		if (!verifiedRow || verifiedRow.token !== null) throw new Error("SQLite verification failed for node-host config");
		const verified = rowToCanonicalState(verifiedRow);
		if (!configsEqual(verified.config, expected.config) || verified.updatedAtMs !== expected.updatedAtMs) throw new Error("SQLite verification failed for node-host config");
	}, { env: params.env });
	return {
		imported,
		preservedCanonical
	};
}
async function migrateWithExclusiveStateOwnership$2(params) {
	if (!params.detected.hasLegacy) return {
		changes: [],
		warnings: []
	};
	const changes = [];
	const warnings = [];
	const notices = [];
	const sourcePath = params.detected.sourcePath;
	const source = new LegacyMigrationSourceClaim({
		stateRoot: params.stateRoot,
		stateDir: params.stateDir,
		sourcePath,
		label: "node-host",
		claimSuffix: LEGACY_NODE_HOST_CONFIG_CLAIM_SUFFIX,
		readSnapshot: (snapshotPath) => readLegacyMigrationSourceSnapshot({
			stateRoot: params.stateRoot,
			stateDir: params.stateDir,
			sourcePath: snapshotPath,
			maxBytes: LEGACY_NODE_HOST_MAX_BYTES,
			label: "node-host",
			hashDecodedText: true
		})
	});
	let snapshot;
	let legacy;
	try {
		await source.recover("interrupted node-host Doctor claim conflicts with its source");
		if (!await source.exists()) return {
			changes,
			warnings
		};
		snapshot = await source.read();
		legacy = parseLegacyNodeHostConfig(snapshot);
		params.beforeVerify?.();
		if (!legacyMigrationSourceSnapshotsMatch(await source.read(), snapshot)) throw new Error("legacy node-host source changed after Doctor loaded it");
	} catch (error) {
		warnings.push(`Failed reading legacy node-host state: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		await source.claim({
			snapshot,
			mismatchMessage: "legacy node-host source changed before Doctor could claim it",
			beforeClaim: params.beforeClaim
		});
	} catch (error) {
		const restoreError = await source.restore();
		warnings.push(`Failed migrating legacy node-host state: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	let result;
	try {
		result = migrateIntoDatabase$1({
			env: params.env,
			legacy
		});
	} catch (error) {
		const restoreError = await source.restore();
		warnings.push(`Failed migrating legacy node-host state: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	try {
		await source.remove({
			removeSource: params.removeSource,
			sourceReappearedMessage: `legacy node-host source reappeared during import: ${sourcePath}`,
			remainingMessage: "legacy node-host source or Doctor claim remains after cleanup"
		});
	} catch (error) {
		warnings.push(`Node-host state is in SQLite, but legacy cleanup failed: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	changes.push(result.preservedCanonical ? "Kept newer canonical node-host SQLite state." : result.imported ? "Migrated node-host config to shared SQLite state." : "Verified node-host config in shared SQLite state.");
	notices.push("Removed retired node.json after verified SQLite import.");
	return {
		changes,
		warnings,
		notices
	};
}
/** Import retired node-host state while excluding active Gateway/state maintenance owners. */
async function migrateLegacyNodeHostConfig(params) {
	if (!params.detected.hasLegacy) return {
		changes: [],
		warnings: []
	};
	return await withLegacyMigrationStateLock({
		stateDir: params.stateDir,
		env: params.env,
		label: "legacy node-host state",
		releaseLabel: "Node-host",
		errorLabel: "Failed reading legacy node-host state",
		retryGuidance: "Stop the Gateway and node host, then run `openclaw doctor --fix` again.",
		run: async (env) => {
			const stateRoot = await root$1(params.stateDir, {
				hardlinks: "reject",
				maxBytes: LEGACY_NODE_HOST_MAX_BYTES,
				symlinks: "reject"
			});
			return await migrateWithExclusiveStateOwnership$2({
				...params,
				env,
				stateRoot
			});
		}
	});
}
//#endregion
//#region src/infra/state-migrations.task-sidecar-rows.ts
function normalizeLegacySqliteInteger(value) {
	if (typeof value === "bigint") return Number(value);
	return value;
}
function listSqliteColumns(db, table) {
	const rows = db.prepare(`PRAGMA table_info(${table})`).all();
	return new Set(rows.flatMap((row) => row.name ? [row.name] : []));
}
function pickLegacyColumn(columns, name, fallbackSql = "NULL") {
	return columns.has(name) ? name : `${fallbackSql} AS ${name}`;
}
function legacyBindValue(value) {
	if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "bigint" || value instanceof Uint8Array) return value ?? null;
	return JSON.stringify(value);
}
function legacyStringValue(value) {
	return typeof value === "string" ? value : "";
}
function normalizeLegacyTaskRow(row) {
	const runtime = legacyStringValue(row.runtime);
	const sourceId = typeof row.source_id === "string" ? row.source_id : "";
	const taskId = legacyStringValue(row.task_id);
	const ownerRaw = typeof row.owner_key === "string" ? row.owner_key.trim() : "";
	const requesterRaw = typeof row.requester_session_key === "string" ? row.requester_session_key.trim() : "";
	const ownerKey = ownerRaw || requesterRaw || `system:${runtime}:${sourceId || taskId}`;
	const scopeKind = (typeof row.scope_kind === "string" ? row.scope_kind : "") === "system" || ownerKey.startsWith("system:") ? "system" : "session";
	const childSessionKey = typeof row.child_session_key === "string" ? row.child_session_key.trim() : "";
	const persistedAgentId = typeof row.agent_id === "string" ? row.agent_id.trim() : "";
	const isSpawnRuntime = runtime === "subagent" || runtime === "acp";
	const childAgentId = isSpawnRuntime ? parseAgentSessionKey(childSessionKey)?.agentId : void 0;
	const requesterAgentId = (typeof row.requester_agent_id === "string" ? row.requester_agent_id.trim() : "") || (isSpawnRuntime ? parseAgentSessionKey(ownerKey)?.agentId ?? parseAgentSessionKey(requesterRaw)?.agentId ?? (childAgentId && persistedAgentId !== childAgentId ? persistedAgentId : "") : "");
	const executorAgentId = requesterAgentId ? childAgentId || persistedAgentId : persistedAgentId;
	const deliveryStatus = row.delivery_status === "not-requested" ? "not_applicable" : row.delivery_status;
	return {
		task_id: taskId,
		runtime,
		task_kind: legacyBindValue(row.task_kind),
		source_id: legacyBindValue(row.source_id),
		requester_session_key: scopeKind === "system" ? "" : requesterRaw || ownerKey,
		owner_key: ownerKey,
		scope_kind: scopeKind,
		child_session_key: childSessionKey || null,
		parent_flow_id: legacyBindValue(row.parent_flow_id),
		parent_task_id: legacyBindValue(row.parent_task_id),
		agent_id: executorAgentId || null,
		requester_agent_id: requesterAgentId || null,
		run_id: legacyBindValue(row.run_id),
		label: legacyBindValue(row.label),
		task: legacyBindValue(row.task ?? ""),
		status: legacyBindValue(row.status ?? ""),
		delivery_status: legacyBindValue(deliveryStatus ?? ""),
		notify_policy: legacyBindValue(row.notify_policy ?? ""),
		created_at: normalizeLegacySqliteInteger(row.created_at) ?? 0,
		started_at: normalizeLegacySqliteInteger(row.started_at),
		ended_at: normalizeLegacySqliteInteger(row.ended_at),
		last_event_at: normalizeLegacySqliteInteger(row.last_event_at),
		cleanup_after: normalizeLegacySqliteInteger(row.cleanup_after),
		error: legacyBindValue(row.error),
		progress_summary: legacyBindValue(row.progress_summary),
		terminal_summary: legacyBindValue(row.terminal_summary),
		terminal_outcome: legacyBindValue(row.terminal_outcome),
		detail_json: legacyBindValue(row.detail_json)
	};
}
function readLegacyTaskRows(sourcePath) {
	const db = openNodeSqliteDatabase(sourcePath, { readOnly: true });
	try {
		const columns = listSqliteColumns(db, "task_runs");
		if (columns.size === 0) return [];
		const selectColumns = [
			"task_id",
			"runtime",
			pickLegacyColumn(columns, "task_kind"),
			pickLegacyColumn(columns, "source_id"),
			pickLegacyColumn(columns, "requester_session_key"),
			pickLegacyColumn(columns, "owner_key"),
			pickLegacyColumn(columns, "scope_kind"),
			pickLegacyColumn(columns, "child_session_key"),
			pickLegacyColumn(columns, "parent_flow_id"),
			pickLegacyColumn(columns, "parent_task_id"),
			pickLegacyColumn(columns, "agent_id"),
			pickLegacyColumn(columns, "requester_agent_id"),
			pickLegacyColumn(columns, "run_id"),
			pickLegacyColumn(columns, "label"),
			"task",
			"status",
			"delivery_status",
			"notify_policy",
			"created_at",
			pickLegacyColumn(columns, "started_at"),
			pickLegacyColumn(columns, "ended_at"),
			pickLegacyColumn(columns, "last_event_at"),
			pickLegacyColumn(columns, "cleanup_after"),
			pickLegacyColumn(columns, "error"),
			pickLegacyColumn(columns, "progress_summary"),
			pickLegacyColumn(columns, "terminal_summary"),
			pickLegacyColumn(columns, "terminal_outcome"),
			pickLegacyColumn(columns, "detail_json")
		];
		return db.prepare(`SELECT ${selectColumns.join(", ")} FROM task_runs ORDER BY created_at ASC, task_id ASC`).all().map((row) => normalizeLegacyTaskRow(row));
	} finally {
		db.close();
	}
}
function readLegacyTaskDeliveryRows(sourcePath) {
	const db = openNodeSqliteDatabase(sourcePath, { readOnly: true });
	try {
		if (listSqliteColumns(db, "task_delivery_state").size === 0) return [];
		return db.prepare(`SELECT task_id, requester_origin_json, last_notified_event_at FROM task_delivery_state ORDER BY task_id ASC`).all();
	} finally {
		db.close();
	}
}
function insertTaskRunRowSql(db, row) {
	db.prepare(`
      INSERT INTO task_runs (
        task_id, runtime, task_kind, source_id, requester_session_key, owner_key, scope_kind,
        child_session_key, parent_flow_id, parent_task_id, agent_id, requester_agent_id, run_id,
        label, task, status, delivery_status, notify_policy, created_at, started_at, ended_at,
        last_event_at, cleanup_after, error, progress_summary, terminal_summary, terminal_outcome,
        detail_json
      ) VALUES (
        @task_id, @runtime, @task_kind, @source_id, @requester_session_key, @owner_key,
        @scope_kind, @child_session_key, @parent_flow_id, @parent_task_id, @agent_id,
        @requester_agent_id, @run_id, @label, @task, @status, @delivery_status, @notify_policy,
        @created_at, @started_at, @ended_at, @last_event_at, @cleanup_after, @error,
        @progress_summary, @terminal_summary, @terminal_outcome, @detail_json
      )
    `).run(row);
}
function insertTaskDeliveryRowSql(db, row) {
	db.prepare(`
      INSERT INTO task_delivery_state (
        task_id, requester_origin_json, last_notified_event_at
      ) VALUES (
        @task_id, @requester_origin_json, @last_notified_event_at
      )
    `).run(row);
}
//#endregion
//#region src/infra/state-migrations.storage.ts
const PLUGIN_STATE_SQLITE_SIDECAR_SUFFIXES = [
	"",
	"-shm",
	"-wal",
	"-journal"
];
const TASK_STATE_SQLITE_SIDECAR_SUFFIXES = PLUGIN_STATE_SQLITE_SIDECAR_SUFFIXES;
const LEGACY_DELIVERY_QUEUE_DIRS = [{
	label: "outbound delivery queue",
	queueName: "outbound",
	dirName: "delivery-queue"
}, {
	label: "session delivery queue",
	queueName: "session",
	dirName: "session-delivery-queue"
}];
var LegacyTaskStateSidecarConflictError = class extends Error {
	constructor(conflictedKeys) {
		super("legacy task-state sidecar conflicts with shared state");
		this.conflictedKeys = conflictedKeys;
	}
};
function buildLegacyMigrationPreview(plan) {
	if (plan.kind === "plugin-state-import") return plan.preview ?? `- ${plan.label}: ${plan.sourcePath}`;
	return `- ${plan.label}: ${plan.sourcePath} → ${plan.targetPath}`;
}
function resolveLegacyPluginStateSidecarPath(stateDir) {
	return path.join(stateDir, "plugin-state", "state.sqlite");
}
function resolveLegacyTaskRunsSidecarPath(stateDir) {
	return path.join(stateDir, "tasks", "runs.sqlite");
}
function resolveLegacyFlowRunsSidecarPath(stateDir) {
	return path.join(stateDir, "flows", "registry.sqlite");
}
function readLegacyPluginStateSidecarRows(sourcePath) {
	const db = openNodeSqliteDatabase(sourcePath, { readOnly: true });
	try {
		return db.prepare(`
          SELECT plugin_id, namespace, entry_key, value_json, created_at, expires_at
          FROM plugin_state_entries
          ORDER BY plugin_id ASC, namespace ASC, entry_key ASC
        `).all();
	} finally {
		db.close();
	}
}
function legacyPluginStateRowsMatch(existing, legacy) {
	return existing.value_json === legacy.value_json && normalizeLegacySqliteInteger(existing.created_at) === normalizeLegacySqliteInteger(legacy.created_at) && normalizeLegacySqliteInteger(existing.expires_at) === normalizeLegacySqliteInteger(legacy.expires_at);
}
function isLegacyPluginStateRowExpired(row, now) {
	const expiresAt = normalizeLegacySqliteInteger(row.expires_at);
	return expiresAt !== null && expiresAt <= now;
}
function hasPendingSqliteSidecarArchive(sourcePath, suffixes) {
	return !fileExists$1(sourcePath) && fileExists$1(`${sourcePath}.migrated`) && suffixes.some((suffix) => suffix !== "" && fileExists$1(`${sourcePath}${suffix}`));
}
function firstFreeArchivePath(sourcePath) {
	for (let index = 2;; index++) {
		const candidate = `${sourcePath}.migrated.${index}`;
		if (!fs.existsSync(candidate)) return candidate;
	}
}
function archiveLegacyFileSource(params) {
	const archivedPath = `${params.sourcePath}.migrated`;
	try {
		if (fileExists$1(archivedPath)) {
			if (fs.readFileSync(params.sourcePath).equals(fs.readFileSync(archivedPath))) {
				fs.rmSync(params.sourcePath, { force: true });
				return {
					sourcePath: params.sourcePath,
					targetPath: archivedPath,
					action: "removed"
				};
			}
			const nextArchivePath = firstFreeArchivePath(params.sourcePath);
			fs.renameSync(params.sourcePath, nextArchivePath);
			return {
				sourcePath: params.sourcePath,
				targetPath: nextArchivePath,
				action: "archived"
			};
		}
		fs.renameSync(params.sourcePath, archivedPath);
		return {
			sourcePath: params.sourcePath,
			targetPath: archivedPath,
			action: "archived"
		};
	} catch (err) {
		params.warnings.push(`Failed archiving ${params.label} ${params.sourcePath}: ${String(err)}`);
		return null;
	}
}
function recordArchiveCollisionResolutions(changes, label, resolutions) {
	for (const resolution of resolutions) changes.push(resolution.action === "removed" ? `Removed already-archived ${label} legacy source ${resolution.sourcePath}` : `Archived ${label} legacy source → ${resolution.targetPath}`);
}
function archiveLegacySqliteSidecar(params) {
	const existingSources = PLUGIN_STATE_SQLITE_SIDECAR_SUFFIXES.map((suffix) => `${params.sourcePath}${suffix}`).filter(fileExists$1);
	if (existingSources.length === 0) return;
	const resolutions = [];
	for (const sourcePath of existingSources) {
		const resolution = archiveLegacyFileSource({
			sourcePath,
			label: `${params.label} sidecar`,
			warnings: params.warnings
		});
		if (!resolution) return;
		resolutions.push(resolution);
	}
	if (resolutions.every((resolution) => resolution.action === "archived" && resolution.targetPath === `${resolution.sourcePath}.migrated`)) params.changes.push(`Archived ${params.label} sidecar legacy source → ${params.sourcePath}.migrated`);
	else recordArchiveCollisionResolutions(params.changes, `${params.label} sidecar`, resolutions);
}
function archiveLegacyPluginStateSidecar(params) {
	archiveLegacySqliteSidecar({
		...params,
		label: "plugin-state"
	});
}
function readLegacyInstalledPluginIndex(sourcePath) {
	try {
		const parsed = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
		const current = parseInstalledPluginIndex(parsed);
		if (current) return current;
		const installRecords = readLegacyTopLevelInstallRecords(parsed) ?? readLegacyEmbeddedInstallRecords(parsed);
		if (!installRecords || typeof installRecords !== "object" || Array.isArray(installRecords)) return null;
		return parseInstalledPluginIndex({
			version: 1,
			hostContractVersion: "legacy",
			compatRegistryVersion: "legacy",
			migrationVersion: 1,
			policyHash: "legacy",
			generatedAtMs: 0,
			installRecords,
			plugins: [],
			diagnostics: []
		});
	} catch {
		return null;
	}
}
function readLegacyTopLevelInstallRecords(parsed) {
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
	const legacy = parsed;
	return legacy.installRecords ?? legacy.records;
}
function readLegacyEmbeddedInstallRecords(parsed) {
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
	const plugins = parsed.plugins;
	if (!Array.isArray(plugins)) return null;
	const records = {};
	for (const plugin of plugins) {
		if (!plugin || typeof plugin !== "object" || Array.isArray(plugin)) continue;
		const pluginId = plugin.pluginId;
		const installRecord = plugin.installRecord;
		if (typeof pluginId === "string" && pluginId.trim() && installRecord && typeof installRecord === "object" && !Array.isArray(installRecord)) records[pluginId] = installRecord;
	}
	return Object.keys(records).length > 0 ? records : null;
}
function legacyInstalledPluginIndexMatches(current, legacy) {
	return JSON.stringify(current.installRecords) === JSON.stringify(legacy.installRecords) && JSON.stringify(current.plugins) === JSON.stringify(legacy.plugins) && JSON.stringify(current.diagnostics) === JSON.stringify(legacy.diagnostics);
}
function readInstallRecordField(record, key) {
	return record[key];
}
function readInstallRecordStringField(record, key) {
	const value = readInstallRecordField(record, key);
	return typeof value === "string" ? value : void 0;
}
function legacyInstallRecordHasCurrentResolvedIdentity(params) {
	const { currentRecord, legacyRecord } = params;
	const currentResolvedSpec = readInstallRecordStringField(currentRecord, "resolvedSpec");
	const legacySpec = readInstallRecordStringField(legacyRecord, "spec");
	if (legacySpec) return currentResolvedSpec === legacySpec;
	const legacyResolvedSpec = readInstallRecordStringField(legacyRecord, "resolvedSpec");
	return Boolean(legacyResolvedSpec && currentResolvedSpec === legacyResolvedSpec);
}
function readAuthoritativeCurrentNpmIdentity(record) {
	const resolvedName = readInstallRecordStringField(record, "resolvedName");
	const resolvedVersion = readInstallRecordStringField(record, "resolvedVersion");
	if (resolvedName && resolvedVersion) return {
		name: resolvedName,
		version: resolvedVersion
	};
	const resolvedSpec = readInstallRecordStringField(record, "resolvedSpec");
	const parsed = resolvedSpec ? parseRegistryNpmSpec(resolvedSpec) : null;
	if (parsed?.selectorKind === "exact-version" && parsed.selector) return {
		name: parsed.name,
		version: parsed.selector
	};
	return null;
}
function legacyNpmInstallRecordSupersededByCurrent(params) {
	const { currentRecord, legacyRecord } = params;
	if (currentRecord.source !== "npm" || legacyRecord.source !== "npm") return false;
	const legacySpec = readInstallRecordStringField(legacyRecord, "spec");
	const legacyParsedSpec = legacySpec ? parseRegistryNpmSpec(legacySpec) : null;
	if (legacyParsedSpec?.selectorKind !== "exact-version") return false;
	const currentIdentity = readAuthoritativeCurrentNpmIdentity(currentRecord);
	return Boolean(currentIdentity && legacyParsedSpec.selector && currentIdentity.name === legacyParsedSpec.name && currentIdentity.version === legacyParsedSpec.selector);
}
function legacyInstallRecordCoveredByCurrent(currentRecord, legacyRecord) {
	if (currentRecord.source !== legacyRecord.source) return false;
	if (legacyNpmInstallRecordSupersededByCurrent({
		currentRecord,
		legacyRecord
	})) return true;
	for (const key of Object.keys(legacyRecord).toSorted()) {
		const currentValue = readInstallRecordField(currentRecord, key);
		if (currentValue === readInstallRecordField(legacyRecord, key)) continue;
		if (key === "spec" && legacyInstallRecordHasCurrentResolvedIdentity({
			currentRecord,
			legacyRecord
		})) continue;
		if ((key === "resolvedAt" || key === "installedAt") && typeof currentValue === "string") continue;
		return false;
	}
	return true;
}
function mergeLegacyInstalledPluginIndexRecords(current, legacy) {
	const installRecords = { ...current.installRecords };
	const conflicts = [];
	let addedCount = 0;
	for (const [pluginId, legacyRecord] of Object.entries(legacy.installRecords)) {
		const currentRecord = installRecords[pluginId];
		if (!currentRecord) {
			installRecords[pluginId] = legacyRecord;
			addedCount += 1;
			continue;
		}
		if (!legacyInstallRecordCoveredByCurrent(currentRecord, legacyRecord)) conflicts.push(pluginId);
	}
	return {
		merged: {
			...current,
			installRecords
		},
		addedCount,
		conflicts
	};
}
function archiveLegacyInstalledPluginIndex(params) {
	const resolution = archiveLegacyFileSource({
		sourcePath: params.sourcePath,
		label: "plugin install index",
		warnings: params.warnings
	});
	if (!resolution) return;
	params.changes.push(resolution.action === "removed" ? `Removed already-archived plugin install index legacy source ${params.sourcePath}` : `Archived plugin install index legacy source → ${resolution.targetPath}`);
}
function hardenLegacyImportSource(params) {
	try {
		fs.chmodSync(params.sourcePath, 384);
		return true;
	} catch (err) {
		params.warnings.push(`Failed securing ${params.label} legacy source: ${String(err)}`);
		return false;
	}
}
function archiveLegacyImportSource(params) {
	if (!hardenLegacyImportSource(params)) return;
	const resolution = archiveLegacyFileSource({
		sourcePath: params.sourcePath,
		label: `${params.label} legacy source`,
		warnings: params.warnings
	});
	if (!resolution) return;
	if (resolution.action === "archived") try {
		fs.chmodSync(resolution.targetPath, 384);
	} catch (err) {
		params.warnings.push(`Failed securing archived ${params.label} legacy source: ${String(err)}`);
	}
	params.changes.push(resolution.action === "removed" ? `Removed already-archived ${params.label} legacy source ${params.sourcePath}` : `Archived ${params.label} legacy source → ${resolution.targetPath}`);
}
function legacyKeyValue(value) {
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "bigint") return `${value}`;
	return "";
}
function normalizeLegacyFlowRow(row) {
	const syncMode = row.sync_mode === "task_mirrored" || row.shape === "single_task" ? "task_mirrored" : "managed";
	const ownerKey = typeof row.owner_key === "string" && row.owner_key.trim() ? row.owner_key.trim() : typeof row.owner_session_key === "string" ? row.owner_session_key.trim() : "";
	const controllerId = syncMode === "managed" ? typeof row.controller_id === "string" && row.controller_id.trim() ? row.controller_id.trim() : "core/legacy-restored" : null;
	return {
		flow_id: legacyBindValue(row.flow_id ?? ""),
		shape: legacyBindValue(row.shape),
		sync_mode: syncMode,
		owner_key: ownerKey,
		requester_origin_json: legacyBindValue(row.requester_origin_json),
		controller_id: controllerId,
		revision: normalizeLegacySqliteInteger(row.revision) ?? 0,
		status: legacyBindValue(row.status ?? ""),
		notify_policy: legacyBindValue(row.notify_policy ?? ""),
		goal: legacyBindValue(row.goal ?? ""),
		current_step: legacyBindValue(row.current_step),
		blocked_task_id: legacyBindValue(row.blocked_task_id),
		blocked_summary: legacyBindValue(row.blocked_summary),
		state_json: legacyBindValue(row.state_json),
		wait_json: legacyBindValue(row.wait_json),
		cancel_requested_at: normalizeLegacySqliteInteger(row.cancel_requested_at),
		created_at: normalizeLegacySqliteInteger(row.created_at) ?? 0,
		updated_at: normalizeLegacySqliteInteger(row.updated_at) ?? 0,
		ended_at: normalizeLegacySqliteInteger(row.ended_at)
	};
}
function legacyRowsMatch(existing, incoming, columns) {
	return columns.every((column) => normalizeLegacySqliteInteger(existing[column]) === normalizeLegacySqliteInteger(incoming[column]));
}
function readLegacyFlowRows(sourcePath) {
	const db = openNodeSqliteDatabase(sourcePath, { readOnly: true });
	try {
		const columns = listSqliteColumns(db, "flow_runs");
		if (columns.size === 0) return [];
		const selectColumns = [
			"flow_id",
			pickLegacyColumn(columns, "shape"),
			pickLegacyColumn(columns, "sync_mode"),
			pickLegacyColumn(columns, "owner_key"),
			pickLegacyColumn(columns, "owner_session_key"),
			pickLegacyColumn(columns, "requester_origin_json"),
			pickLegacyColumn(columns, "controller_id"),
			pickLegacyColumn(columns, "revision", "0"),
			"status",
			"notify_policy",
			"goal",
			pickLegacyColumn(columns, "current_step"),
			pickLegacyColumn(columns, "blocked_task_id"),
			pickLegacyColumn(columns, "blocked_summary"),
			pickLegacyColumn(columns, "state_json"),
			pickLegacyColumn(columns, "wait_json"),
			pickLegacyColumn(columns, "cancel_requested_at"),
			"created_at",
			"updated_at",
			pickLegacyColumn(columns, "ended_at")
		];
		return db.prepare(`SELECT ${selectColumns.join(", ")} FROM flow_runs ORDER BY created_at ASC, flow_id ASC`).all().map((row) => normalizeLegacyFlowRow(row));
	} finally {
		db.close();
	}
}
function insertFlowRunRowSql(db, row) {
	db.prepare(`
      INSERT INTO flow_runs (
        flow_id, shape, sync_mode, owner_key, requester_origin_json, controller_id, revision,
        status, notify_policy, goal, current_step, blocked_task_id, blocked_summary, state_json,
        wait_json, cancel_requested_at, created_at, updated_at, ended_at
      ) VALUES (
        @flow_id, @shape, @sync_mode, @owner_key, @requester_origin_json, @controller_id,
        @revision, @status, @notify_policy, @goal, @current_step, @blocked_task_id,
        @blocked_summary, @state_json, @wait_json, @cancel_requested_at, @created_at,
        @updated_at, @ended_at
      )
    `).run(row);
}
async function migrateLegacyTaskRunsSidecar(params) {
	const sourcePath = resolveLegacyTaskRunsSidecarPath(params.stateDir);
	if (!fileExists$1(sourcePath)) {
		const changes = [];
		const warnings = [];
		if (hasPendingSqliteSidecarArchive(sourcePath, TASK_STATE_SQLITE_SIDECAR_SUFFIXES)) archiveLegacySqliteSidecar({
			sourcePath,
			label: "task registry",
			changes,
			warnings
		});
		return {
			changes,
			warnings
		};
	}
	const changes = [];
	const warnings = [];
	let taskRows;
	let deliveryRows;
	try {
		taskRows = readLegacyTaskRows(sourcePath);
		deliveryRows = readLegacyTaskDeliveryRows(sourcePath);
	} catch (err) {
		return {
			changes,
			warnings: [`Failed reading task registry sidecar ${sourcePath}: ${String(err)}`]
		};
	}
	try {
		const conflicts = [];
		let importedTasks = 0;
		let importedDeliveryStates = 0;
		let skippedOrphanDeliveryStates = 0;
		runOpenClawStateWriteTransaction(({ db }) => {
			const taskColumns = [
				"runtime",
				"task_kind",
				"source_id",
				"requester_session_key",
				"owner_key",
				"scope_kind",
				"child_session_key",
				"parent_flow_id",
				"parent_task_id",
				"agent_id",
				"requester_agent_id",
				"run_id",
				"label",
				"task",
				"status",
				"delivery_status",
				"notify_policy",
				"created_at",
				"started_at",
				"ended_at",
				"last_event_at",
				"cleanup_after",
				"error",
				"progress_summary",
				"terminal_summary",
				"terminal_outcome",
				"detail_json"
			];
			for (const row of taskRows) {
				const taskId = legacyKeyValue(expectDefined(row.task_id, "task migration row key"));
				const existing = db.prepare(`SELECT ${taskColumns.join(", ")} FROM task_runs WHERE task_id = ?`).get(taskId);
				if (existing) {
					if (!legacyRowsMatch(existing, row, taskColumns)) conflicts.push(taskId);
					continue;
				}
				insertTaskRunRowSql(db, row);
				importedTasks++;
			}
			const deliveryColumns = ["requester_origin_json", "last_notified_event_at"];
			for (const row of deliveryRows) {
				const taskId = legacyKeyValue(expectDefined(row.task_id, "delivery migration row key"));
				const existing = db.prepare(`SELECT requester_origin_json, last_notified_event_at FROM task_delivery_state WHERE task_id = ?`).get(taskId);
				if (existing) {
					if (!legacyRowsMatch(existing, row, deliveryColumns)) conflicts.push(`${taskId}/delivery`);
					continue;
				}
				if (!db.prepare("SELECT 1 FROM task_runs WHERE task_id = ?").get(taskId)) {
					skippedOrphanDeliveryStates++;
					continue;
				}
				insertTaskDeliveryRowSql(db, row);
				importedDeliveryStates++;
			}
			if (conflicts.length > 0) throw new LegacyTaskStateSidecarConflictError(conflicts);
		}, { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		if (importedTasks > 0) changes.push(`Migrated ${importedTasks} task registry sidecar ${importedTasks === 1 ? "row" : "rows"} → shared SQLite state`);
		if (importedDeliveryStates > 0) changes.push(`Migrated ${importedDeliveryStates} task delivery sidecar ${importedDeliveryStates === 1 ? "row" : "rows"} → shared SQLite state`);
		if (skippedOrphanDeliveryStates > 0) warnings.push(`Skipped ${skippedOrphanDeliveryStates} orphan task delivery sidecar ${skippedOrphanDeliveryStates === 1 ? "row" : "rows"} with no task run`);
	} catch (err) {
		if (err instanceof LegacyTaskStateSidecarConflictError) return {
			changes,
			warnings: [`Left task registry sidecar in place because ${err.conflictedKeys.length} ${err.conflictedKeys.length === 1 ? "row" : "rows"} already existed in shared state: ${err.conflictedKeys[0]}`]
		};
		return {
			changes,
			warnings: [`Failed migrating task registry sidecar ${sourcePath}: ${String(err)}`]
		};
	}
	archiveLegacySqliteSidecar({
		sourcePath,
		label: "task registry",
		changes,
		warnings
	});
	return {
		changes,
		warnings
	};
}
async function migrateLegacyFlowRunsSidecar(params) {
	const sourcePath = resolveLegacyFlowRunsSidecarPath(params.stateDir);
	if (!fileExists$1(sourcePath)) {
		const changes = [];
		const warnings = [];
		if (hasPendingSqliteSidecarArchive(sourcePath, TASK_STATE_SQLITE_SIDECAR_SUFFIXES)) archiveLegacySqliteSidecar({
			sourcePath,
			label: "task flow",
			changes,
			warnings
		});
		return {
			changes,
			warnings
		};
	}
	const changes = [];
	const warnings = [];
	let rows;
	try {
		rows = readLegacyFlowRows(sourcePath);
	} catch (err) {
		return {
			changes,
			warnings: [`Failed reading task flow sidecar ${sourcePath}: ${String(err)}`]
		};
	}
	try {
		const conflicts = [];
		let imported = 0;
		runOpenClawStateWriteTransaction(({ db }) => {
			const columns = [
				"shape",
				"sync_mode",
				"owner_key",
				"requester_origin_json",
				"controller_id",
				"revision",
				"status",
				"notify_policy",
				"goal",
				"current_step",
				"blocked_task_id",
				"blocked_summary",
				"state_json",
				"wait_json",
				"cancel_requested_at",
				"created_at",
				"updated_at",
				"ended_at"
			];
			for (const row of rows) {
				const flowId = legacyKeyValue(expectDefined(row.flow_id, "flow migration row key"));
				const existing = db.prepare(`SELECT ${columns.join(", ")} FROM flow_runs WHERE flow_id = ?`).get(flowId);
				if (existing) {
					if (!legacyRowsMatch(existing, row, columns)) conflicts.push(flowId);
					continue;
				}
				insertFlowRunRowSql(db, row);
				imported++;
			}
			if (conflicts.length > 0) throw new LegacyTaskStateSidecarConflictError(conflicts);
		}, { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		if (imported > 0) changes.push(`Migrated ${imported} task flow sidecar ${imported === 1 ? "row" : "rows"} → shared SQLite state`);
	} catch (err) {
		if (err instanceof LegacyTaskStateSidecarConflictError) return {
			changes,
			warnings: [`Left task flow sidecar in place because ${err.conflictedKeys.length} ${err.conflictedKeys.length === 1 ? "row" : "rows"} already existed in shared state: ${err.conflictedKeys[0]}`]
		};
		return {
			changes,
			warnings: [`Failed migrating task flow sidecar ${sourcePath}: ${String(err)}`]
		};
	}
	archiveLegacySqliteSidecar({
		sourcePath,
		label: "task flow",
		changes,
		warnings
	});
	return {
		changes,
		warnings
	};
}
async function migrateLegacyTaskStateSidecars(params) {
	const taskRuns = await migrateLegacyTaskRunsSidecar(params);
	const flowRuns = await migrateLegacyFlowRunsSidecar(params);
	return {
		changes: [...taskRuns.changes, ...flowRuns.changes],
		warnings: [...taskRuns.warnings, ...flowRuns.warnings]
	};
}
function resolveLegacyDeliveryQueuePath(stateDir, dirName) {
	return path.join(stateDir, dirName);
}
function listLegacyDeliveryQueueFiles(queueDir) {
	const pending = safeReadDir(queueDir).filter((entry) => entry.isFile() && entry.name.endsWith(".json")).map((entry) => ({
		sourcePath: path.join(queueDir, entry.name),
		status: "pending"
	}));
	const failedDir = path.join(queueDir, "failed");
	const failed = safeReadDir(failedDir).filter((entry) => entry.isFile() && entry.name.endsWith(".json")).map((entry) => ({
		sourcePath: path.join(failedDir, entry.name),
		status: "failed"
	}));
	return [...pending, ...failed];
}
function listLegacyDeliveryQueueDeliveredMarkers(queueDir) {
	return safeReadDir(queueDir).filter((entry) => entry.isFile() && entry.name.endsWith(".delivered")).map((entry) => path.join(queueDir, entry.name));
}
function readLegacyDeliveryQueueEntry(sourcePath) {
	try {
		const parsed = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
function legacyQueueMetadata(entry) {
	const session = entry.session;
	const route = entry.route;
	const deliveryContext = entry.deliveryContext;
	const stringOrNull = (value) => typeof value === "string" ? value : null;
	return {
		entryKind: stringOrNull(entry.kind) ?? "outbound",
		sessionKey: stringOrNull(entry.sessionKey) ?? stringOrNull(session?.key),
		channel: stringOrNull(entry.channel) ?? stringOrNull(route?.channel) ?? stringOrNull(deliveryContext?.channel),
		target: stringOrNull(entry.to) ?? stringOrNull(route?.to) ?? stringOrNull(deliveryContext?.to),
		accountId: stringOrNull(entry.accountId) ?? stringOrNull(route?.accountId) ?? stringOrNull(deliveryContext?.accountId)
	};
}
function buildLegacyDeliveryQueueRow(params) {
	const enqueuedAt = typeof params.entry.enqueuedAt === "number" ? params.entry.enqueuedAt : params.now;
	const retryCount = typeof params.entry.retryCount === "number" ? params.entry.retryCount : 0;
	const failedAt = params.status === "failed" ? typeof params.entry.failedAt === "number" ? params.entry.failedAt : typeof params.entry.lastAttemptAt === "number" ? params.entry.lastAttemptAt : enqueuedAt : null;
	const meta = legacyQueueMetadata(params.entry);
	return {
		queue_name: params.queueName,
		id: params.id,
		status: params.status,
		entry_kind: meta.entryKind,
		session_key: meta.sessionKey,
		channel: meta.channel,
		target: meta.target,
		account_id: meta.accountId,
		retry_count: retryCount,
		last_attempt_at: typeof params.entry.lastAttemptAt === "number" ? params.entry.lastAttemptAt : null,
		last_error: typeof params.entry.lastError === "string" ? params.entry.lastError : null,
		recovery_state: typeof params.entry.recoveryState === "string" ? params.entry.recoveryState : null,
		platform_send_started_at: typeof params.entry.platformSendStartedAt === "number" ? params.entry.platformSendStartedAt : null,
		entry_json: JSON.stringify({
			...params.entry,
			id: params.id,
			enqueuedAt,
			retryCount
		}),
		enqueued_at: enqueuedAt,
		updated_at: params.now,
		failed_at: failedAt
	};
}
function legacyDeliveryQueueRowsMatch(existing, incoming) {
	return [
		"status",
		"entry_kind",
		"session_key",
		"channel",
		"target",
		"account_id",
		"retry_count",
		"last_attempt_at",
		"last_error",
		"recovery_state",
		"platform_send_started_at",
		"entry_json",
		"enqueued_at",
		"failed_at"
	].every((column) => {
		const left = existing[column];
		const right = incoming[column];
		if (typeof left === "bigint" || typeof right === "bigint") return normalizeLegacySqliteInteger(left) === normalizeLegacySqliteInteger(right);
		return left === right;
	});
}
function removeLegacyDeliveryQueueDir(params) {
	try {
		fs.rmSync(params.queueDir, { recursive: true });
		params.changes.push(`Removed ${params.label} legacy source ${params.queueDir}`);
	} catch (err) {
		params.warnings.push(`Failed removing ${params.label} ${params.queueDir}: ${String(err)}`);
	}
}
function removeLegacyDeliveryQueueMarkers(markerPaths, label, warnings) {
	let removed = 0;
	for (const markerPath of markerPaths) try {
		fs.rmSync(markerPath, { force: true });
		removed++;
	} catch (err) {
		warnings.push(`Failed removing ${label} marker ${markerPath}: ${String(err)}`);
		return null;
	}
	return removed;
}
async function migrateLegacyDeliveryQueues(params) {
	const changes = [];
	const warnings = [];
	for (const queue of LEGACY_DELIVERY_QUEUE_DIRS) {
		const queueDir = resolveLegacyDeliveryQueuePath(params.stateDir, queue.dirName);
		const files = listLegacyDeliveryQueueFiles(queueDir);
		const markerPaths = listLegacyDeliveryQueueDeliveredMarkers(queueDir);
		if (files.length === 0 && markerPaths.length === 0) continue;
		let imported = 0;
		let skipped = 0;
		const conflicts = [];
		try {
			runOpenClawStateWriteTransaction(({ db }) => {
				const insert = db.prepare(`
            INSERT INTO delivery_queue_entries (
              queue_name, id, status, entry_kind, session_key, channel, target, account_id,
              retry_count, last_attempt_at, last_error, recovery_state,
              platform_send_started_at, entry_json, enqueued_at, updated_at, failed_at
            ) VALUES (
              @queue_name, @id, @status, @entry_kind, @session_key, @channel, @target,
              @account_id, @retry_count, @last_attempt_at, @last_error, @recovery_state,
              @platform_send_started_at, @entry_json, @enqueued_at, @updated_at, @failed_at
            )
          `);
				const now = Date.now();
				for (const file of files) {
					const entry = readLegacyDeliveryQueueEntry(file.sourcePath);
					const id = typeof entry?.id === "string" ? entry.id : path.basename(file.sourcePath, ".json");
					if (!entry || !id) {
						skipped++;
						continue;
					}
					const row = buildLegacyDeliveryQueueRow({
						queueName: queue.queueName,
						id,
						status: file.status,
						entry,
						now
					});
					const existing = db.prepare(`
                SELECT status, entry_kind, session_key, channel, target, account_id,
                       retry_count, last_attempt_at, last_error, recovery_state,
                       platform_send_started_at, entry_json, enqueued_at, failed_at
                  FROM delivery_queue_entries
                 WHERE queue_name = ? AND id = ?
              `).get(queue.queueName, id);
					if (existing) {
						if (!legacyDeliveryQueueRowsMatch(existing, row)) conflicts.push(id);
						continue;
					}
					insert.run(row);
					imported++;
				}
			}, { env: {
				...process.env,
				OPENCLAW_STATE_DIR: params.stateDir
			} });
		} catch (err) {
			warnings.push(`Failed migrating ${queue.label} ${queueDir}: ${String(err)}`);
			continue;
		}
		const removedMarkers = removeLegacyDeliveryQueueMarkers(markerPaths, queue.label, warnings);
		if (removedMarkers === null) continue;
		if (removedMarkers > 0) changes.push(`Removed ${removedMarkers} ${queue.label} delivered ${removedMarkers === 1 ? "marker" : "markers"}`);
		if (imported > 0) changes.push(`Migrated ${imported} ${queue.label} ${imported === 1 ? "entry" : "entries"} → shared SQLite state`);
		if (skipped > 0) {
			warnings.push(`Skipped ${skipped} malformed ${queue.label} ${skipped === 1 ? "entry" : "entries"}`);
			warnings.push(`Left ${queue.label} in place because malformed entries need manual cleanup`);
			continue;
		}
		if (conflicts.length > 0) {
			warnings.push(`Left ${queue.label} in place because ${conflicts.length} ${conflicts.length === 1 ? "entry" : "entries"} already existed in shared state: ${conflicts[0]}`);
			continue;
		}
		removeLegacyDeliveryQueueDir({
			queueDir,
			label: queue.label,
			changes,
			warnings
		});
	}
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.plugin-state.ts
async function migrateLegacyPluginStateSidecar(params) {
	const sourcePath = resolveLegacyPluginStateSidecarPath(params.stateDir);
	if (!fileExists$1(sourcePath)) {
		const changes = [];
		const warnings = [];
		if (hasPendingSqliteSidecarArchive(sourcePath, PLUGIN_STATE_SQLITE_SIDECAR_SUFFIXES)) archiveLegacyPluginStateSidecar({
			sourcePath,
			changes,
			warnings
		});
		return {
			changes,
			warnings
		};
	}
	const changes = [];
	const warnings = [];
	let rows;
	try {
		rows = readLegacyPluginStateSidecarRows(sourcePath);
	} catch (err) {
		return {
			changes,
			warnings: [`Failed reading plugin-state sidecar ${sourcePath}: ${String(err)}`]
		};
	}
	try {
		const conflictedKeys = [];
		const rowsToInsert = [];
		let imported = 0;
		let skippedExpired = 0;
		const now = Date.now();
		runOpenClawStateWriteTransaction(({ db }) => {
			const stateDb = getNodeSqliteKysely(db);
			for (const row of rows) {
				executeSqliteQuerySync(db, stateDb.deleteFrom("plugin_state_entries").where("plugin_id", "=", row.plugin_id).where("namespace", "=", row.namespace).where("entry_key", "=", row.entry_key).where("expires_at", "is not", null).where("expires_at", "<=", now));
				const existing = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("plugin_state_entries").select([
					"value_json",
					"created_at",
					"expires_at"
				]).where("plugin_id", "=", row.plugin_id).where("namespace", "=", row.namespace).where("entry_key", "=", row.entry_key));
				const legacyExpired = isLegacyPluginStateRowExpired(row, now);
				if (existing) {
					if (!legacyPluginStateRowsMatch(existing, row)) if ((normalizeLegacySqliteInteger(existing.created_at) ?? 0) > (normalizeLegacySqliteInteger(row.created_at) ?? 0)) {} else if (legacyExpired) skippedExpired += 1;
					else conflictedKeys.push(`${row.plugin_id}/${row.namespace}/${row.entry_key}`);
					continue;
				}
				if (legacyExpired) {
					skippedExpired += 1;
					continue;
				}
				rowsToInsert.push(row);
			}
			for (const row of rowsToInsert) {
				executeSqliteQuerySync(db, stateDb.insertInto("plugin_state_entries").values({
					plugin_id: row.plugin_id,
					namespace: row.namespace,
					entry_key: row.entry_key,
					value_json: row.value_json,
					created_at: normalizeLegacySqliteInteger(row.created_at) ?? 0,
					expires_at: normalizeLegacySqliteInteger(row.expires_at)
				}).onConflict((conflict) => conflict.columns([
					"plugin_id",
					"namespace",
					"entry_key"
				]).doNothing()));
				imported += 1;
			}
		}, { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		if (imported > 0) changes.push(`Migrated ${imported} plugin-state sidecar ${imported === 1 ? "entry" : "entries"} → shared SQLite state`);
		if (conflictedKeys.length > 0) return {
			changes,
			warnings: [`Left plugin-state sidecar in place because ${conflictedKeys.length} ${conflictedKeys.length === 1 ? "row differs" : "rows differ"} from shared state without a newer canonical timestamp. First key: ${conflictedKeys[0]}`]
		};
		if (skippedExpired > 0) changes.push(`Dropped ${skippedExpired} expired plugin-state sidecar ${skippedExpired === 1 ? "entry" : "entries"}`);
	} catch (err) {
		return {
			changes,
			warnings: [`Failed migrating plugin-state sidecar ${sourcePath}: ${String(err)}`]
		};
	}
	archiveLegacyPluginStateSidecar({
		sourcePath,
		changes,
		warnings
	});
	return {
		changes,
		warnings
	};
}
async function migrateLegacyInstalledPluginIndex(params) {
	const sourcePath = resolveLegacyInstalledPluginIndexStorePath({ stateDir: params.stateDir });
	if (!fileExists$1(sourcePath)) return {
		changes: [],
		warnings: []
	};
	const changes = [];
	const warnings = [];
	const legacy = readLegacyInstalledPluginIndex(sourcePath);
	if (!legacy) return {
		changes,
		warnings: [`Left plugin install index in place because ${sourcePath} is invalid`]
	};
	const storeOptions = { stateDir: params.stateDir };
	const current = readPersistedInstalledPluginIndexSync(storeOptions);
	if (current && !legacyInstalledPluginIndexMatches(current, legacy)) {
		const merged = mergeLegacyInstalledPluginIndexRecords(current, legacy);
		if (merged.addedCount > 0) try {
			writePersistedInstalledPluginIndexSync(merged.merged, storeOptions);
			changes.push(`Merged ${merged.addedCount} legacy plugin install ${merged.addedCount === 1 ? "record" : "records"} → shared SQLite state`);
		} catch (err) {
			return {
				changes,
				warnings: [`Failed merging plugin install index ${sourcePath}: ${String(err)}`]
			};
		}
		if (merged.conflicts.length > 0) {
			archiveLegacyInstalledPluginIndex({
				sourcePath,
				changes,
				warnings
			});
			return {
				changes,
				warnings,
				notices: [`Kept canonical shared SQLite plugin install metadata despite differing legacy records for: ${merged.conflicts.join(", ")}`]
			};
		}
	}
	if (!current) try {
		writePersistedInstalledPluginIndexSync(legacy, storeOptions);
		const recordCount = Object.keys(legacy.installRecords).length;
		changes.push(`Migrated plugin install index ${recordCount} ${recordCount === 1 ? "record" : "records"} → shared SQLite state`);
	} catch (err) {
		return {
			changes,
			warnings: [`Failed migrating plugin install index ${sourcePath}: ${String(err)}`]
		};
	}
	archiveLegacyInstalledPluginIndex({
		sourcePath,
		changes,
		warnings
	});
	return {
		changes,
		warnings
	};
}
function resolvePluginStateImportTargetKey(scopeKey, key) {
	return scopeKey ? `${scopeKey}:${key}` : key;
}
function findMissingKey(expected, actual) {
	for (const key of expected) if (!actual.has(key)) return key;
}
function compareImportEntriesNewestFirst(a, b) {
	if (a.timestamp !== void 0 && b.timestamp !== void 0) return b.timestamp - a.timestamp;
	if (a.ttlMs !== void 0 && b.ttlMs !== void 0) return b.ttlMs - a.ttlMs;
	return 0;
}
async function withPluginStateImportEnv(plan, run) {
	if (!plan.stateDir) return await run();
	const previous = process.env.OPENCLAW_STATE_DIR;
	process.env.OPENCLAW_STATE_DIR = plan.stateDir;
	try {
		return await run();
	} finally {
		if (previous === void 0) delete process.env.OPENCLAW_STATE_DIR;
		else process.env.OPENCLAW_STATE_DIR = previous;
	}
}
async function runLegacyMigrationPlans(plans) {
	const changes = [];
	const warnings = [];
	for (const plan of plans) {
		if (plan.kind === "plugin-state-import") {
			await withPluginStateImportEnv(plan, async () => {
				let storeEntries;
				let pluginEntryCount;
				const store = createPluginStateKeyedStore(plan.pluginId, {
					namespace: plan.namespace,
					maxEntries: plan.maxEntries,
					...plan.defaultTtlMs != null ? { defaultTtlMs: plan.defaultTtlMs } : {}
				});
				try {
					storeEntries = await store.entries();
					pluginEntryCount = countPluginStateLiveEntries(plan.pluginId);
				} catch (err) {
					warnings.push(`Failed reading ${plan.label} plugin state before migration: ${String(err)}`);
					return;
				}
				const existingKeys = new Set(storeEntries.map(({ key }) => key));
				const existingValuesByKey = new Map(storeEntries.map(({ key, value }) => [key, value]));
				const existingCreatedAtByKey = new Map(storeEntries.map(({ key, createdAt }) => [key, createdAt]));
				const expectedKeys = new Set(existingKeys);
				const namespaceRemainingCapacity = Math.max(0, plan.maxEntries - storeEntries.length);
				let entries;
				try {
					entries = await plan.readEntries();
				} catch (err) {
					warnings.push(`Failed reading ${plan.label} legacy source: ${String(err)}`);
					return;
				}
				const replacementEntries = [];
				let newEntries = [];
				const failedTargetKeys = /* @__PURE__ */ new Set();
				for (const entry of entries) {
					const targetKey = resolvePluginStateImportTargetKey(plan.scopeKey, entry.key);
					const existingValue = existingValuesByKey.get(targetKey);
					if (existingKeys.has(targetKey)) {
						if (existingValue !== void 0 && await plan.shouldReplaceExistingEntry?.({
							key: entry.key,
							existingValue,
							incomingValue: entry.value
						})) replacementEntries.push({
							...entry,
							targetKey,
							existedBefore: true
						});
						continue;
					}
					newEntries.push({
						...entry,
						targetKey,
						existedBefore: false
					});
				}
				const missingEntryCount = newEntries.length;
				const pluginRemainingCapacity = Math.max(0, resolveMaxPluginStateEntriesPerPlugin() - pluginEntryCount);
				const importBudget = Math.min(namespaceRemainingCapacity, pluginRemainingCapacity);
				if (missingEntryCount > importBudget) {
					newEntries = newEntries.toSorted(compareImportEntriesNewestFirst).slice(0, importBudget);
					const constraint = namespaceRemainingCapacity <= pluginRemainingCapacity ? `plugin state namespace ${plan.namespace} has room for ${namespaceRemainingCapacity}` : `plugin state has room for ${pluginRemainingCapacity}`;
					warnings.push(newEntries.length > 0 ? `Partially migrating ${plan.label} because ${constraint} of ${missingEntryCount} missing entries; importing the newest ${newEntries.length} and deferring the rest in the legacy source` : `Deferring ${plan.label} migration because ${constraint} of ${missingEntryCount} missing entries; left legacy source in place to retry when capacity frees`);
				}
				const registerPreservingCreatedAt = async (params) => {
					if (params.createdAtMs === void 0 || !Number.isFinite(params.createdAtMs) || params.createdAtMs < 0) {
						await store.register(params.key, params.value, params.ttlMs != null ? { ttlMs: params.ttlMs } : void 0);
						return;
					}
					registerMigratedPluginStateEntry({
						pluginId: plan.pluginId,
						namespace: plan.namespace,
						maxEntries: plan.maxEntries,
						...plan.defaultTtlMs != null ? { defaultTtlMs: plan.defaultTtlMs } : {},
						key: params.key,
						value: params.value,
						...params.ttlMs != null ? { ttlMs: params.ttlMs } : {},
						createdAtMs: params.createdAtMs
					});
				};
				const restoreExistingEntry = async (key) => {
					await registerPreservingCreatedAt({
						key,
						value: existingValuesByKey.get(key),
						createdAtMs: existingCreatedAtByKey.get(key)
					});
				};
				let imported = 0;
				const changedKeys = /* @__PURE__ */ new Set();
				for (const entry of [...replacementEntries, ...newEntries]) try {
					await registerPreservingCreatedAt({
						key: entry.targetKey,
						value: entry.value,
						...entry.ttlMs != null ? { ttlMs: entry.ttlMs } : {},
						...entry.timestamp !== void 0 ? { createdAtMs: entry.timestamp } : {}
					});
					const nextExpectedKeys = new Set(expectedKeys);
					nextExpectedKeys.add(entry.targetKey);
					const missingKey = findMissingKey(nextExpectedKeys, new Set((await store.entries()).map(({ key }) => key)));
					if (missingKey) {
						if (existingValuesByKey.has(entry.targetKey)) await restoreExistingEntry(entry.targetKey);
						else await store.delete(entry.targetKey);
						if (changedKeys.has(missingKey)) {
							changedKeys.delete(missingKey);
							expectedKeys.delete(missingKey);
							existingKeys.delete(missingKey);
							imported = Math.max(0, imported - 1);
						} else if (existingValuesByKey.has(missingKey)) try {
							await restoreExistingEntry(missingKey);
						} catch (restoreErr) {
							warnings.push(`Failed restoring ${plan.label} entry ${missingKey} after cap eviction: ${String(restoreErr)}`);
						}
						warnings.push(`Paused migrating ${plan.label} because plugin state cap evicted ${missingKey}; imported ${imported} of ${missingEntryCount} missing entries and deferred the rest in the legacy source`);
						break;
					}
					expectedKeys.add(entry.targetKey);
					existingKeys.add(entry.targetKey);
					changedKeys.add(entry.targetKey);
					imported++;
				} catch (err) {
					failedTargetKeys.add(entry.targetKey);
					warnings.push(`Failed migrating ${plan.label} entry ${entry.key}: ${String(err)}`);
				}
				if (imported > 0) changes.push(`Migrated ${imported} ${plan.label} ${imported === 1 ? "entry" : "entries"} → plugin state`);
				let cleanupKeys = existingKeys;
				if (plan.cleanupSource === "rename") cleanupKeys = expectedKeys;
				const allEntriesCovered = entries.length === 0 && plan.cleanupWhenEmpty === true || entries.length > 0 && entries.every(({ key }) => cleanupKeys.has(resolvePluginStateImportTargetKey(plan.scopeKey, key)) && !failedTargetKeys.has(resolvePluginStateImportTargetKey(plan.scopeKey, key)));
				if (allEntriesCovered && plan.cleanupSource === "rename" && fileExists$1(plan.sourcePath)) archiveLegacyImportSource({
					sourcePath: plan.sourcePath,
					label: plan.label,
					changes,
					warnings
				});
				if (allEntriesCovered && plan.cleanupSource === "remove" && fileExists$1(plan.sourcePath)) try {
					fs.unlinkSync(plan.sourcePath);
					changes.push(`Removed ${plan.label} legacy source (${plan.sourcePath})`);
				} catch (err) {
					warnings.push(`Failed removing ${plan.label} legacy source: ${String(err)}`);
				}
				if (allEntriesCovered && plan.removeSource) try {
					await plan.removeSource();
					changes.push(`Removed ${plan.label} legacy source (${plan.sourcePath})`);
				} catch (err) {
					warnings.push(`Failed removing ${plan.label} legacy source: ${String(err)}`);
				}
			});
			continue;
		}
		if (fileExists$1(plan.targetPath)) continue;
		try {
			ensureMigrationDir(path.dirname(plan.targetPath));
			if (plan.kind === "move") {
				fs.renameSync(plan.sourcePath, plan.targetPath);
				changes.push(`Moved ${plan.label} → ${plan.targetPath}`);
			} else {
				fs.copyFileSync(plan.sourcePath, plan.targetPath);
				changes.push(`Copied ${plan.label} → ${plan.targetPath}`);
			}
		} catch (err) {
			warnings.push(`Failed migrating ${plan.label} (${plan.sourcePath}): ${String(err)}`);
		}
	}
	return {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.rescue-pending.ts
function resolveLegacyRescuePendingPaths(stateDir) {
	return ["crestodian", "openclaw"].map((owner) => path.join(stateDir, owner, "rescue-pending"));
}
function isSafeLegacyOwnerDirectory(stateDir, sourcePath) {
	const ownerPath = path.dirname(sourcePath);
	try {
		const owner = fs.lstatSync(ownerPath);
		return owner.isDirectory() && !owner.isSymbolicLink() && path.resolve(path.dirname(ownerPath)) === path.resolve(stateDir);
	} catch {
		return false;
	}
}
/** Detect retired security capabilities only during an explicit doctor run. */
function detectLegacyRescuePending(params) {
	const sourcePaths = resolveLegacyRescuePendingPaths(params.stateDir);
	return {
		sourcePaths,
		hasLegacy: params.doctorOnlyStateMigrations === true && sourcePaths.some((sourcePath) => fs.existsSync(sourcePath))
	};
}
/** Discard retired one-shot capabilities; importing them could reactivate stale writes. */
function discardLegacyRescuePending(params) {
	if (!params.detected.hasLegacy) return {
		changes: [],
		warnings: []
	};
	const removed = [];
	const warnings = [];
	for (const sourcePath of resolveLegacyRescuePendingPaths(params.stateDir)) {
		if (!fs.existsSync(sourcePath)) continue;
		if (!isSafeLegacyOwnerDirectory(params.stateDir, sourcePath)) {
			warnings.push(`Refused to remove retired rescue approvals through unsafe path ${sourcePath}`);
			continue;
		}
		try {
			fs.rmSync(sourcePath, {
				recursive: true,
				force: true
			});
			removed.push(sourcePath);
		} catch (error) {
			warnings.push(`Failed removing retired rescue approvals at ${sourcePath}: ${String(error)}`);
		}
	}
	return {
		changes: removed.length > 0 ? [`Discarded retired system-agent rescue approvals from ${removed.join(", ")}`] : [],
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.restart-sentinel.ts
const LEGACY_RESTART_SENTINEL_FILENAME = "restart-sentinel.json";
const DOCTOR_CLAIM_SUFFIX$1 = ".doctor-importing";
const MAX_LEGACY_RESTART_SENTINEL_BYTES = 4 * 1024 * 1024;
const MIGRATION_KIND$2 = "legacy-restart-sentinel-json";
const utf8Decoder$1 = new TextDecoder("utf-8", { fatal: true });
/** Detect the exact retired file for startup preflight and explicit Doctor alike. */
function detectLegacyRestartSentinel(params) {
	const sourcePath = path.join(params.stateDir, LEGACY_RESTART_SENTINEL_FILENAME);
	return {
		sourcePath,
		hasLegacy: legacyMigrationSourceOrClaimMayExist(sourcePath, DOCTOR_CLAIM_SUFFIX$1)
	};
}
function parseLegacyEnvelope(snapshot) {
	try {
		return parseRestartSentinelEnvelope(JSON.parse(utf8Decoder$1.decode(snapshot.buffer)));
	} catch {
		return null;
	}
}
function decideAndRecordMigration(params) {
	const sourceKey = resolveLegacyMigrationSourceKey("restart-sentinel-json", params.sourcePath);
	const runId = `${sourceKey}:${params.snapshot.sha256.slice(0, 16)}`;
	const now = Date.now();
	return runOpenClawStateWriteTransaction(({ db }) => {
		const receipt = readLegacyMigrationReceiptFromDatabase(db, sourceKey);
		const before = readRestartSentinelRowSync(db);
		let decision;
		if (receipt) decision = "receipt-authoritative";
		else if (!params.envelope) decision = "malformed-legacy-discarded";
		else if (before.kind === "valid") decision = "canonical-preserved";
		else {
			const written = writeRestartSentinelRowSync(db, params.envelope.payload);
			const verified = readRestartSentinelRowSync(db);
			if (verified.kind !== "valid" || verified.sentinel.revision !== written.revision || !isDeepStrictEqual(verified.sentinel.payload, params.envelope.payload)) throw new Error("SQLite verification failed for the restart sentinel migration");
			decision = before.kind === "invalid" ? "invalid-canonical-repaired" : "legacy-imported";
		}
		const reportJson = JSON.stringify({
			source: MIGRATION_KIND$2,
			target: "gateway_restart_sentinel",
			decision,
			sourceSha256: params.snapshot.sha256,
			sourceValid: params.envelope !== null,
			importedRecordCount: decision === "legacy-imported" || decision === "invalid-canonical-repaired" ? 1 : 0,
			preservedSqliteRecordCount: decision === "canonical-preserved" ? 1 : 0
		});
		recordLegacyMigrationReceipt(db, {
			sourceKey,
			migrationKind: MIGRATION_KIND$2,
			sourcePath: params.sourcePath,
			targetTable: "gateway_restart_sentinel",
			sourceSha256: params.snapshot.sha256,
			sourceSizeBytes: params.snapshot.size,
			sourceRecordCount: params.envelope ? 1 : 0,
			runId,
			now,
			reportJson,
			upsert: true
		});
		return {
			decision,
			sourceKey
		};
	}, { env: params.env });
}
async function recoverInterruptedClaim$1(params) {
	if (!await params.source.exists(true)) return;
	if (!await params.source.exists()) {
		const restoreError = await params.source.restore();
		if (restoreError) throw new Error(restoreError);
		return;
	}
	if (!readLegacyMigrationReceipt(resolveLegacyMigrationSourceKey("restart-sentinel-json", params.source.sourcePath), params.env)) throw new Error("legacy restart sentinel source and interrupted claim both exist");
	await params.source.read(true);
	await params.source.remove({ skipSourceCheck: true });
}
function decisionChange(decision) {
	switch (decision) {
		case "legacy-imported": return "Imported the legacy restart sentinel into shared SQLite state.";
		case "invalid-canonical-repaired": return "Replaced an invalid SQLite restart sentinel with validated legacy state.";
		case "canonical-preserved": return "Preserved the canonical SQLite restart sentinel and discarded conflicting legacy JSON.";
		case "malformed-legacy-discarded": return "Discarded malformed retired restart sentinel JSON without importing it.";
		case "receipt-authoritative": return "Discarded recreated retired restart sentinel JSON using its migration receipt.";
	}
	return decision;
}
async function migrateWithExclusiveStateOwnership$1(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	const sourcePath = params.detected.sourcePath;
	const source = new LegacyMigrationSourceClaim({
		stateRoot: params.stateRoot,
		stateDir: params.stateDir,
		sourcePath,
		label: "restart sentinel",
		includeFilePath: false,
		claimSuffix: DOCTOR_CLAIM_SUFFIX$1,
		readSnapshot: (snapshotPath) => readLegacyMigrationSourceSnapshot({
			stateRoot: params.stateRoot,
			stateDir: params.stateDir,
			sourcePath: snapshotPath,
			maxBytes: MAX_LEGACY_RESTART_SENTINEL_BYTES,
			label: "restart sentinel"
		})
	});
	try {
		await recoverInterruptedClaim$1({
			source,
			env: params.env
		});
	} catch (error) {
		return {
			changes,
			warnings: [`Failed recovering a legacy restart sentinel Doctor claim: ${String(error)}`]
		};
	}
	if (!await source.exists()) return {
		changes,
		warnings
	};
	let snapshot;
	try {
		snapshot = await source.read();
	} catch (error) {
		return {
			changes,
			warnings: [`Failed reading the legacy restart sentinel: ${String(error)}`]
		};
	}
	const envelope = parseLegacyEnvelope(snapshot);
	try {
		params.beforeVerify?.();
		if (!legacyMigrationSourceSnapshotsMatch(await source.read(), snapshot)) throw new Error("legacy restart sentinel changed after migration loaded it");
		await source.claim({
			snapshot,
			mismatchMessage: "legacy restart sentinel changed before migration could claim it",
			beforeClaim: params.beforeClaim
		});
	} catch (error) {
		const restoreError = await source.restore();
		return {
			changes,
			warnings: [`Failed claiming the legacy restart sentinel: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`]
		};
	}
	let result;
	try {
		result = decideAndRecordMigration({
			env: params.env,
			sourcePath,
			snapshot,
			envelope
		});
	} catch (error) {
		const restoreError = await source.restore();
		return {
			changes,
			warnings: [`Failed migrating the legacy restart sentinel: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`]
		};
	}
	try {
		await source.remove({
			removeSource: params.removeSource,
			sourceReappearedMessage: "legacy restart sentinel reappeared during migration cleanup",
			remainingMessage: "legacy restart sentinel remains after migration cleanup"
		});
	} catch (error) {
		warnings.push(`Legacy restart sentinel cleanup failed: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		markLegacyMigrationSourceRemoved(result.sourceKey, params.env);
	} catch (error) {
		warnings.push(`Legacy restart sentinel was removed, but its receipt could not be finalized: ${String(error)}`);
	}
	changes.push(decisionChange(result.decision));
	notices.push("Removed retired restart-sentinel.json after recording its migration decision.");
	return {
		changes,
		warnings,
		notices
	};
}
/** Import or retire the old file under exclusive state ownership. */
async function migrateLegacyRestartSentinel(params) {
	const detected = params.detected;
	if (!detected?.hasLegacy) return {
		changes: [],
		warnings: []
	};
	return await withLegacyMigrationStateLock({
		stateDir: params.stateDir,
		env: params.env,
		label: "the legacy restart sentinel",
		releaseLabel: "Restart sentinel",
		errorLabel: "Failed reading the legacy restart sentinel",
		retryGuidance: "Stop the Gateway, then run `openclaw doctor --fix` again.",
		run: async (env) => {
			const stateRoot = await root$1(params.stateDir, {
				hardlinks: "reject",
				maxBytes: MAX_LEGACY_RESTART_SENTINEL_BYTES,
				symlinks: "reject"
			});
			return await migrateWithExclusiveStateOwnership$1({
				...params,
				detected,
				env,
				stateRoot
			});
		}
	});
}
//#endregion
//#region src/infra/state-migrations.runtime-state.ts
const VOICEWAKE_CONFIG_KEY = "default";
const DEFAULT_VOICEWAKE_TRIGGERS = [
	"openclaw",
	"claude",
	"computer"
];
function resolveLegacyVoiceWakeTriggersPath(stateDir) {
	return path.join(stateDir, "settings", "voicewake.json");
}
function resolveLegacyVoiceWakeRoutingPath(stateDir) {
	return path.join(stateDir, "settings", "voicewake-routing.json");
}
function readLegacyJsonObject(sourcePath) {
	return JSON.parse(fs.readFileSync(sourcePath, "utf8"));
}
/** Import and archive legacy JSON only after its synchronous SQLite commit succeeds. */
function migrateLegacyJsonState(params) {
	const changes = [];
	const warnings = [];
	if (!fileExists$1(params.sourcePath)) return {
		changes,
		warnings
	};
	let value;
	try {
		value = params.normalize(readLegacyJsonObject(params.sourcePath));
	} catch (err) {
		warnings.push(`Failed reading legacy ${params.label} ${params.sourcePath}: ${String(err)}`);
		return {
			changes,
			warnings
		};
	}
	if (params.shouldMigrate && !params.shouldMigrate(value)) return {
		changes,
		warnings
	};
	let outcome;
	try {
		outcome = runOpenClawStateWriteTransaction(({ db }) => params.migrate(db, value), { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
	} catch (err) {
		warnings.push(`Failed migrating legacy ${params.label}: ${String(err)}`);
		return {
			changes,
			warnings
		};
	}
	changes.push(...outcome.changes);
	if (params.retire) params.retire({
		sourcePath: params.sourcePath,
		changes,
		warnings
	});
	else archiveLegacyImportSource({
		sourcePath: params.sourcePath,
		label: params.label,
		changes,
		warnings
	});
	return outcome.notices?.length ? {
		changes,
		warnings,
		notices: outcome.notices
	} : {
		changes,
		warnings
	};
}
function normalizeLegacyVoiceWakeTriggers(input) {
	const rec = input && typeof input === "object" ? input : {};
	const triggers = Array.isArray(rec.triggers) ? rec.triggers.flatMap((entry) => typeof entry === "string" ? [entry.trim()] : []).filter((entry) => entry.length > 0) : [];
	return triggers.length > 0 ? triggers : DEFAULT_VOICEWAKE_TRIGGERS;
}
function legacyVoiceWakeTriggersMatch(rows, triggers) {
	return rows.length === triggers.length && rows.every((row, index) => row.trigger === triggers[index]);
}
function legacyVoiceWakeTargetColumns(target) {
	if (target.agentId) return {
		targetAgentId: target.agentId,
		targetMode: "agent",
		targetSessionKey: null
	};
	if (target.sessionKey) return {
		targetAgentId: null,
		targetMode: "session",
		targetSessionKey: target.sessionKey
	};
	return {
		targetAgentId: null,
		targetMode: "current",
		targetSessionKey: null
	};
}
function legacyVoiceWakeTargetColumnsMatch(left, right) {
	return left.targetAgentId === (right.target_agent_id ?? null) && left.targetMode === right.target_mode && left.targetSessionKey === (right.target_session_key ?? null);
}
function legacyVoiceWakeRoutingMatches(configRow, routeRows, routingConfig) {
	if (!legacyVoiceWakeTargetColumnsMatch(legacyVoiceWakeTargetColumns(routingConfig.defaultTarget), {
		target_agent_id: configRow.default_target_agent_id,
		target_mode: configRow.default_target_mode,
		target_session_key: configRow.default_target_session_key
	})) return false;
	return routeRows.length === routingConfig.routes.length && routeRows.every((row, index) => {
		const route = routingConfig.routes[index];
		if (!route || row.trigger !== route.trigger) return false;
		return legacyVoiceWakeTargetColumnsMatch(legacyVoiceWakeTargetColumns(route.target), row);
	});
}
function migrateLegacyVoiceWakeSettings(params) {
	const triggerMigration = migrateLegacyJsonState({
		sourcePath: params.detected.triggersPath,
		stateDir: params.stateDir,
		label: "voice wake triggers",
		normalize: normalizeLegacyVoiceWakeTriggers,
		shouldMigrate: (triggers) => triggers.length > 0,
		migrate(db, triggers) {
			const stateDb = getNodeSqliteKysely(db);
			const existing = executeSqliteQuerySync(db, stateDb.selectFrom("voicewake_triggers").select(["trigger"]).where("config_key", "=", VOICEWAKE_CONFIG_KEY).orderBy("position", "asc")).rows;
			if (existing.length > 0) return {
				changes: [],
				...legacyVoiceWakeTriggersMatch(existing, triggers) ? {} : { notices: [`Kept shared SQLite voice wake triggers because legacy file differs: ${params.detected.triggersPath}`] }
			};
			const updatedAtMs = Date.now();
			executeSqliteQuerySync(db, stateDb.insertInto("voicewake_triggers").values(triggers.map((trigger, position) => ({
				config_key: VOICEWAKE_CONFIG_KEY,
				position,
				trigger,
				updated_at_ms: updatedAtMs
			}))));
			return { changes: [`Migrated ${triggers.length} voice wake ${triggers.length === 1 ? "trigger" : "triggers"} → shared SQLite state`] };
		}
	});
	const routingMigration = migrateLegacyJsonState({
		sourcePath: params.detected.routingPath,
		stateDir: params.stateDir,
		label: "voice wake routing",
		normalize: normalizeVoiceWakeRoutingConfig,
		shouldMigrate: Boolean,
		migrate(db, routingConfig) {
			const stateDb = getNodeSqliteKysely(db);
			const existing = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("voicewake_routing_config").select([
				"default_target_agent_id",
				"default_target_mode",
				"default_target_session_key"
			]).where("config_key", "=", VOICEWAKE_CONFIG_KEY));
			if (existing) {
				const routeRows = executeSqliteQuerySync(db, stateDb.selectFrom("voicewake_routing_routes").select([
					"target_agent_id",
					"target_mode",
					"target_session_key",
					"trigger"
				]).where("config_key", "=", VOICEWAKE_CONFIG_KEY).orderBy("position", "asc")).rows;
				return {
					changes: [],
					...legacyVoiceWakeRoutingMatches(existing, routeRows, routingConfig) ? {} : { notices: [`Kept shared SQLite voice wake routing because legacy file differs: ${params.detected.routingPath}`] }
				};
			}
			const updatedAtMs = Date.now();
			const defaultTarget = legacyVoiceWakeTargetColumns(routingConfig.defaultTarget);
			executeSqliteQuerySync(db, stateDb.insertInto("voicewake_routing_config").values({
				config_key: VOICEWAKE_CONFIG_KEY,
				version: 1,
				default_target_mode: defaultTarget.targetMode,
				default_target_agent_id: defaultTarget.targetAgentId,
				default_target_session_key: defaultTarget.targetSessionKey,
				updated_at_ms: updatedAtMs
			}));
			if (routingConfig.routes.length > 0) executeSqliteQuerySync(db, stateDb.insertInto("voicewake_routing_routes").values(routingConfig.routes.map((route, position) => {
				const target = legacyVoiceWakeTargetColumns(route.target);
				return {
					config_key: VOICEWAKE_CONFIG_KEY,
					position,
					trigger: route.trigger,
					target_mode: target.targetMode,
					target_agent_id: target.targetAgentId,
					target_session_key: target.targetSessionKey,
					updated_at_ms: updatedAtMs
				};
			})));
			return { changes: [`Migrated voice wake routing config with ${routingConfig.routes.length} ${routingConfig.routes.length === 1 ? "route" : "routes"} → shared SQLite state`] };
		}
	});
	const changes = [...triggerMigration.changes, ...routingMigration.changes];
	const warnings = [...triggerMigration.warnings, ...routingMigration.warnings];
	const notices = [...triggerMigration.notices ?? [], ...routingMigration.notices ?? []];
	return notices.length > 0 ? {
		changes,
		warnings,
		notices
	} : {
		changes,
		warnings
	};
}
function resolveLegacyConfigHealthPath(stateDir) {
	return path.join(stateDir, "logs", "config-health.json");
}
function normalizeLegacyConfigHealthEntry(configPath, input) {
	if (!configPath.trim() || !input || typeof input !== "object" || Array.isArray(input)) return null;
	const entry = input;
	const lastKnownGoodJson = entry.lastKnownGood && typeof entry.lastKnownGood === "object" ? JSON.stringify(entry.lastKnownGood) : null;
	const lastPromotedGoodJson = entry.lastPromotedGood && typeof entry.lastPromotedGood === "object" ? JSON.stringify(entry.lastPromotedGood) : null;
	const lastObservedSuspiciousSignature = typeof entry.lastObservedSuspiciousSignature === "string" ? entry.lastObservedSuspiciousSignature : null;
	if (!lastKnownGoodJson && !lastPromotedGoodJson && !lastObservedSuspiciousSignature) return null;
	return {
		configPath,
		lastKnownGoodJson,
		lastPromotedGoodJson,
		lastObservedSuspiciousSignature
	};
}
function normalizeLegacyConfigHealthFile(input) {
	const entries = (input && typeof input === "object" ? input : {}).entries;
	if (!entries || typeof entries !== "object" || Array.isArray(entries)) return [];
	return Object.entries(entries).flatMap(([configPath, entry]) => {
		const normalized = normalizeLegacyConfigHealthEntry(configPath, entry);
		return normalized ? [normalized] : [];
	}).toSorted((a, b) => a.configPath.localeCompare(b.configPath));
}
function configHealthRow(entry) {
	return {
		config_path: entry.configPath,
		last_known_good_json: entry.lastKnownGoodJson,
		last_promoted_good_json: entry.lastPromotedGoodJson,
		last_observed_suspicious_signature: entry.lastObservedSuspiciousSignature,
		updated_at_ms: Date.now()
	};
}
function retireLegacyConfigHealthSource(params) {
	if (!fileExists$1(`${params.sourcePath}.migrated`)) {
		archiveLegacyImportSource({
			sourcePath: params.sourcePath,
			label: "config health state",
			changes: params.changes,
			warnings: params.warnings
		});
		return;
	}
	try {
		fs.rmSync(params.sourcePath, { force: true });
		params.changes.push("Removed regenerated config health legacy source");
	} catch (err) {
		params.warnings.push(`Failed removing regenerated config health legacy source: ${String(err)}`);
	}
}
function migrateLegacyConfigHealth(params) {
	return migrateLegacyJsonState({
		sourcePath: params.detected.sourcePath,
		stateDir: params.stateDir,
		label: "config health state",
		normalize: normalizeLegacyConfigHealthFile,
		retire: retireLegacyConfigHealthSource,
		migrate(db, entries) {
			const stateDb = getNodeSqliteKysely(db);
			const existing = executeSqliteQuerySync(db, stateDb.selectFrom("config_health_entries").select([
				"config_path",
				"last_known_good_json",
				"last_promoted_good_json",
				"last_observed_suspicious_signature"
			])).rows;
			const existingByPath = new Map(existing.map((row) => [row.config_path, row]));
			const entriesToInsert = [];
			let reconciledCount = 0;
			for (const entry of entries) {
				const existingEntry = existingByPath.get(entry.configPath);
				if (!existingEntry) {
					entriesToInsert.push(entry);
					continue;
				}
				const lastKnownGoodJson = existingEntry.last_known_good_json ?? entry.lastKnownGoodJson;
				const lastPromotedGoodJson = existingEntry.last_promoted_good_json ?? entry.lastPromotedGoodJson;
				if (lastKnownGoodJson === existingEntry.last_known_good_json && lastPromotedGoodJson === existingEntry.last_promoted_good_json) continue;
				executeSqliteQuerySync(db, stateDb.updateTable("config_health_entries").set({
					last_known_good_json: lastKnownGoodJson,
					last_promoted_good_json: lastPromotedGoodJson,
					updated_at_ms: Date.now()
				}).where("config_path", "=", entry.configPath));
				reconciledCount += 1;
			}
			if (entriesToInsert.length > 0) executeSqliteQuerySync(db, stateDb.insertInto("config_health_entries").values(entriesToInsert.map(configHealthRow)));
			const changes = [];
			if (entriesToInsert.length > 0) changes.push(`Migrated ${entriesToInsert.length} config health ${entriesToInsert.length === 1 ? "entry" : "entries"} → shared SQLite state`);
			if (reconciledCount > 0) changes.push(`Reconciled ${reconciledCount} config health ${reconciledCount === 1 ? "entry" : "entries"} → shared SQLite state`);
			return { changes };
		}
	});
}
function resolveLegacyPluginBindingApprovalsPath(env, homedir) {
	return path.join(resolveRequiredHomeDir(env, homedir), ".openclaw", "plugin-binding-approvals.json");
}
function pluginBindingApprovalScopeKey(entry) {
	return [
		entry.pluginRoot,
		normalizeLowercaseStringOrEmpty(entry.channel),
		entry.accountId
	].join("::");
}
function normalizeLegacyPluginBindingApprovalEntry(input) {
	const entry = input && typeof input === "object" ? input : {};
	const pluginRoot = typeof entry.pluginRoot === "string" ? entry.pluginRoot.trim() : "";
	const pluginId = typeof entry.pluginId === "string" ? entry.pluginId.trim() : "";
	const channel = typeof entry.channel === "string" ? normalizeLowercaseStringOrEmpty(entry.channel) : "";
	const accountId = typeof entry.accountId === "string" && entry.accountId.trim() ? entry.accountId.trim() : "default";
	if (!pluginRoot || !pluginId || !channel) return null;
	return {
		pluginRoot,
		pluginId,
		pluginName: typeof entry.pluginName === "string" ? entry.pluginName : void 0,
		channel,
		accountId,
		approvedAt: typeof entry.approvedAt === "number" && Number.isFinite(entry.approvedAt) ? Math.floor(entry.approvedAt) : Date.now()
	};
}
function normalizeLegacyPluginBindingApprovalsFile(input) {
	const file = input && typeof input === "object" ? input : {};
	if (file.version !== 1 || !Array.isArray(file.approvals)) return [];
	const approvals = /* @__PURE__ */ new Map();
	for (const item of file.approvals) {
		const entry = normalizeLegacyPluginBindingApprovalEntry(item);
		if (!entry) continue;
		approvals.set(pluginBindingApprovalScopeKey(entry), entry);
	}
	return [...approvals.values()].toSorted((a, b) => pluginBindingApprovalScopeKey(a).localeCompare(pluginBindingApprovalScopeKey(b)));
}
function pluginBindingApprovalRow(entry) {
	return {
		plugin_root: entry.pluginRoot,
		channel: entry.channel,
		account_id: entry.accountId,
		plugin_id: entry.pluginId,
		plugin_name: entry.pluginName ?? null,
		approved_at: entry.approvedAt
	};
}
function pluginBindingApprovalComparable(entry) {
	return JSON.stringify(pluginBindingApprovalRow(entry));
}
function migrateLegacyPluginBindingApprovals(params) {
	if (!params.detected.hasLegacy) return {
		changes: [],
		warnings: []
	};
	return migrateLegacyJsonState({
		sourcePath: params.detected.sourcePath,
		stateDir: params.stateDir,
		label: "plugin binding approvals",
		normalize: normalizeLegacyPluginBindingApprovalsFile,
		migrate(db, approvals) {
			const stateDb = getNodeSqliteKysely(db);
			const existing = executeSqliteQuerySync(db, stateDb.selectFrom("plugin_binding_approvals").select([
				"plugin_root",
				"channel",
				"account_id",
				"plugin_id",
				"plugin_name",
				"approved_at"
			])).rows;
			const existingByKey = new Map(existing.map((row) => [pluginBindingApprovalScopeKey({
				pluginRoot: row.plugin_root,
				channel: row.channel,
				accountId: row.account_id
			}), JSON.stringify(row)]));
			const approvalsToInsert = [];
			let conflictCount = 0;
			for (const approval of approvals) {
				const existingApprovalJson = existingByKey.get(pluginBindingApprovalScopeKey(approval));
				if (existingApprovalJson === void 0) approvalsToInsert.push(approval);
				else if (existingApprovalJson !== pluginBindingApprovalComparable(approval)) conflictCount += 1;
			}
			if (approvalsToInsert.length > 0) executeSqliteQuerySync(db, stateDb.insertInto("plugin_binding_approvals").values(approvalsToInsert.map(pluginBindingApprovalRow)));
			return {
				changes: approvalsToInsert.length > 0 ? [`Migrated ${approvalsToInsert.length} plugin binding ${approvalsToInsert.length === 1 ? "approval" : "approvals"} → shared SQLite state`] : [],
				...conflictCount > 0 ? { notices: [`Kept shared SQLite plugin binding approvals because ${conflictCount} ${conflictCount === 1 ? "legacy approval conflicts" : "legacy approvals conflict"}: ${params.detected.sourcePath}`] } : {}
			};
		}
	});
}
const CURRENT_BINDING_CONVERSATION_KIND = "current";
function resolveLegacyCurrentConversationBindingsPath(stateDir) {
	return path.join(stateDir, "bindings", "current-conversations.json");
}
function currentConversationBindingKey(ref) {
	const normalized = normalizeConversationRef(ref);
	return [
		normalized.channel,
		normalized.accountId,
		normalized.parentConversationId ?? "",
		normalized.conversationId
	].join("␟");
}
function normalizeLegacyCurrentConversationBindingRecord(input) {
	const record = input && typeof input === "object" ? input : {};
	if (!record.conversation?.conversationId) return null;
	const conversation = normalizeConversationRef(record.conversation);
	const targetSessionKey = typeof record.targetSessionKey === "string" ? record.targetSessionKey.trim() : "";
	if (!targetSessionKey) return null;
	const targetKind = record.targetKind === "subagent" ? "subagent" : "session";
	const status = record.status === "ending" || record.status === "ended" ? record.status : "active";
	const boundAt = typeof record.boundAt === "number" && Number.isFinite(record.boundAt) ? Math.floor(record.boundAt) : Date.now();
	const expiresAt = typeof record.expiresAt === "number" && Number.isFinite(record.expiresAt) ? Math.floor(record.expiresAt) : void 0;
	return {
		bindingId: `generic:${currentConversationBindingKey(conversation)}`,
		targetSessionKey,
		targetKind,
		conversation,
		status,
		boundAt,
		...expiresAt !== void 0 ? { expiresAt } : {},
		...record.metadata && typeof record.metadata === "object" && !Array.isArray(record.metadata) ? { metadata: record.metadata } : {}
	};
}
function normalizeLegacyCurrentConversationBindingFile(input) {
	const file = input && typeof input === "object" ? input : {};
	if (file.version !== 1 || !Array.isArray(file.bindings)) return [];
	const records = /* @__PURE__ */ new Map();
	for (const item of file.bindings) {
		const record = normalizeLegacyCurrentConversationBindingRecord(item);
		if (!record) continue;
		records.set(currentConversationBindingKey(record.conversation), record);
	}
	return [...records.values()].toSorted((a, b) => a.bindingId.localeCompare(b.bindingId));
}
function currentConversationBindingRow(record) {
	const conversation = normalizeConversationRef(record.conversation);
	return {
		binding_key: currentConversationBindingKey(conversation),
		binding_id: record.bindingId,
		target_agent_id: resolveAgentIdFromSessionKey(record.targetSessionKey),
		target_session_id: null,
		target_session_key: record.targetSessionKey,
		channel: conversation.channel,
		account_id: conversation.accountId,
		conversation_kind: CURRENT_BINDING_CONVERSATION_KIND,
		parent_conversation_id: conversation.parentConversationId ?? null,
		conversation_id: conversation.conversationId,
		target_kind: record.targetKind,
		status: record.status,
		bound_at: record.boundAt,
		expires_at: record.expiresAt ?? null,
		metadata_json: record.metadata ? JSON.stringify(record.metadata) : null,
		record_json: JSON.stringify(record),
		updated_at: Date.now()
	};
}
function migrateLegacyCurrentConversationBindings(params) {
	return migrateLegacyJsonState({
		sourcePath: params.detected.sourcePath,
		stateDir: params.stateDir,
		label: "current-conversation bindings",
		normalize: normalizeLegacyCurrentConversationBindingFile,
		migrate(db, records) {
			const stateDb = getNodeSqliteKysely(db);
			const existing = executeSqliteQuerySync(db, stateDb.selectFrom("current_conversation_bindings").select(["binding_key", "record_json"])).rows;
			const existingByKey = new Map(existing.map((row) => [row.binding_key, row.record_json]));
			const recordsToInsert = [];
			let conflictCount = 0;
			for (const record of records) {
				const existingRecordJson = existingByKey.get(currentConversationBindingKey(record.conversation));
				if (existingRecordJson === void 0) recordsToInsert.push(record);
				else if (existingRecordJson !== JSON.stringify(record)) conflictCount += 1;
			}
			if (recordsToInsert.length > 0) executeSqliteQuerySync(db, stateDb.insertInto("current_conversation_bindings").values(recordsToInsert.map(currentConversationBindingRow)));
			return {
				changes: recordsToInsert.length > 0 ? [`Migrated ${recordsToInsert.length} current-conversation ${recordsToInsert.length === 1 ? "binding" : "bindings"} → shared SQLite state`] : [],
				...conflictCount > 0 ? { notices: [`Kept shared SQLite current-conversation bindings because ${conflictCount} ${conflictCount === 1 ? "legacy binding conflicts" : "legacy bindings conflict"}: ${params.detected.sourcePath}`] } : {}
			};
		}
	});
}
//#endregion
//#region src/infra/state-migrations.state-dir.ts
let autoMigrateStateDirChecked = false;
let autoMigrateTaskStateSidecarsChecked = false;
function resetAutoMigrateLegacyStateDirForTest() {
	autoMigrateStateDirChecked = false;
}
function resetAutoMigrateLegacyTaskStateSidecarsForTest() {
	autoMigrateTaskStateSidecarsChecked = false;
}
function resolveSymlinkTarget(linkPath) {
	try {
		const target = fs.readlinkSync(linkPath);
		return path.resolve(path.dirname(linkPath), target);
	} catch {
		return null;
	}
}
function formatStateDirMigration(legacyDir, targetDir) {
	return `State dir: ${legacyDir} → ${targetDir} (legacy path now symlinked)`;
}
function isDirPath(filePath) {
	try {
		return fs.statSync(filePath).isDirectory();
	} catch {
		return false;
	}
}
function isLegacyTreeSymlinkMirror(currentDir, realTargetDir) {
	let entries;
	try {
		entries = fs.readdirSync(currentDir, { withFileTypes: true });
	} catch {
		return false;
	}
	if (entries.length === 0) return false;
	for (const entry of entries) {
		const entryPath = path.join(currentDir, entry.name);
		let stat;
		try {
			stat = fs.lstatSync(entryPath);
		} catch {
			return false;
		}
		if (stat.isSymbolicLink()) {
			const resolvedTarget = resolveSymlinkTarget(entryPath);
			if (!resolvedTarget) return false;
			let resolvedRealTarget;
			try {
				resolvedRealTarget = fs.realpathSync(resolvedTarget);
			} catch {
				return false;
			}
			if (!isWithinDir(realTargetDir, resolvedRealTarget)) return false;
			continue;
		}
		if (stat.isDirectory()) {
			if (!isLegacyTreeSymlinkMirror(entryPath, realTargetDir)) return false;
			continue;
		}
		return false;
	}
	return true;
}
function isLegacyDirSymlinkMirror(legacyDir, targetDir) {
	let realTargetDir;
	try {
		realTargetDir = fs.realpathSync(targetDir);
	} catch {
		return false;
	}
	return isLegacyTreeSymlinkMirror(legacyDir, realTargetDir);
}
async function autoMigrateLegacyStateDir(params) {
	if (autoMigrateStateDirChecked) return {
		migrated: false,
		skipped: true,
		changes: [],
		warnings: []
	};
	autoMigrateStateDirChecked = true;
	const homedir = params.homedir ?? os.homedir;
	const env = params.env ?? process.env;
	const warnings = [];
	const changes = [];
	const notices = [];
	const hasCustomStateDir = Boolean(env.OPENCLAW_STATE_DIR?.trim());
	const targetDir = hasCustomStateDir ? resolveStateDir(env, homedir) : resolveNewStateDir(homedir);
	const migratePluginInstallIndex = async () => {
		const result = await migrateLegacyInstalledPluginIndex({ stateDir: targetDir });
		changes.push(...result.changes);
		warnings.push(...result.warnings);
		notices.push(...result.notices ?? []);
	};
	if (hasCustomStateDir) {
		await migratePluginInstallIndex();
		return {
			migrated: changes.length > 0,
			skipped: changes.length === 0 && warnings.length === 0 && notices.length === 0,
			changes,
			warnings,
			...notices.length > 0 ? { notices } : {}
		};
	}
	const legacyDirs = resolveLegacyStateDirs(homedir);
	let legacyDir = legacyDirs.find((dir) => {
		try {
			return fs.existsSync(dir);
		} catch {
			return false;
		}
	});
	let legacyStat;
	try {
		legacyStat = legacyDir ? fs.lstatSync(legacyDir) : null;
	} catch {
		legacyStat = null;
	}
	if (!legacyStat) {
		await migratePluginInstallIndex();
		return {
			migrated: changes.length > 0,
			skipped: false,
			changes,
			warnings,
			...notices.length > 0 ? { notices } : {}
		};
	}
	if (!legacyStat.isDirectory() && !legacyStat.isSymbolicLink()) {
		warnings.push(`Legacy state path is not a directory: ${legacyDir}`);
		return {
			migrated: false,
			skipped: false,
			changes,
			warnings
		};
	}
	let symlinkDepth = 0;
	while (legacyStat.isSymbolicLink()) {
		const legacyTarget = legacyDir ? resolveSymlinkTarget(legacyDir) : null;
		if (!legacyTarget) {
			warnings.push(`Legacy state dir is a symlink (${legacyDir ?? "unknown"}); could not resolve target.`);
			return {
				migrated: false,
				skipped: false,
				changes,
				warnings
			};
		}
		if (path.resolve(legacyTarget) === path.resolve(targetDir)) {
			await migratePluginInstallIndex();
			return {
				migrated: changes.length > 0,
				skipped: false,
				changes,
				warnings,
				...notices.length > 0 ? { notices } : {}
			};
		}
		if (legacyDirs.some((dir) => path.resolve(dir) === path.resolve(legacyTarget))) {
			legacyDir = legacyTarget;
			try {
				legacyStat = fs.lstatSync(legacyDir);
			} catch {
				legacyStat = null;
			}
			if (!legacyStat) {
				warnings.push(`Legacy state dir missing after symlink resolution: ${legacyDir}`);
				return {
					migrated: false,
					skipped: false,
					changes,
					warnings
				};
			}
			if (!legacyStat.isDirectory() && !legacyStat.isSymbolicLink()) {
				warnings.push(`Legacy state path is not a directory: ${legacyDir}`);
				return {
					migrated: false,
					skipped: false,
					changes,
					warnings
				};
			}
			symlinkDepth += 1;
			if (symlinkDepth > 2) {
				warnings.push(`Legacy state dir symlink chain too deep: ${legacyDir}`);
				return {
					migrated: false,
					skipped: false,
					changes,
					warnings
				};
			}
			continue;
		}
		warnings.push(`Legacy state dir is a symlink (${legacyDir ?? "unknown"} → ${legacyTarget}); skipping auto-migration.`);
		return {
			migrated: false,
			skipped: false,
			changes,
			warnings
		};
	}
	if (isDirPath(targetDir)) {
		if (legacyDir && isLegacyDirSymlinkMirror(legacyDir, targetDir)) {
			await migratePluginInstallIndex();
			return {
				migrated: changes.length > 0,
				skipped: false,
				changes,
				warnings,
				...notices.length > 0 ? { notices } : {}
			};
		}
		await migratePluginInstallIndex();
		warnings.push(`State dir migration skipped: target already exists (${targetDir}). Remove or merge manually.`);
		return {
			migrated: changes.length > 0,
			skipped: false,
			changes,
			warnings,
			...notices.length > 0 ? { notices } : {}
		};
	}
	try {
		if (!legacyDir) throw new Error("Legacy state dir not found");
		fs.renameSync(legacyDir, targetDir);
	} catch (err) {
		warnings.push(`Failed to move legacy state dir (${legacyDir ?? "unknown"} → ${targetDir}): ${String(err)}`);
		return {
			migrated: false,
			skipped: false,
			changes,
			warnings
		};
	}
	try {
		if (!legacyDir) throw new Error("Legacy state dir not found");
		fs.symlinkSync(targetDir, legacyDir, "dir");
		changes.push(formatStateDirMigration(legacyDir, targetDir));
	} catch (err) {
		try {
			if (process.platform === "win32") {
				if (!legacyDir) throw new Error("Legacy state dir not found", { cause: err });
				fs.symlinkSync(targetDir, legacyDir, "junction");
				changes.push(formatStateDirMigration(legacyDir, targetDir));
			} else throw err;
		} catch (fallbackErr) {
			try {
				if (!legacyDir) throw new Error("Legacy state dir not found", { cause: fallbackErr });
				fs.renameSync(targetDir, legacyDir);
				warnings.push(`State dir migration rolled back (failed to link legacy path): ${String(fallbackErr)}`);
				return {
					migrated: false,
					skipped: false,
					changes: [],
					warnings
				};
			} catch (rollbackErr) {
				warnings.push(`State dir moved but failed to link legacy path (${legacyDir ?? "unknown"} → ${targetDir}): ${String(fallbackErr)}`);
				warnings.push(`Rollback failed; set OPENCLAW_STATE_DIR=${targetDir} to avoid split state: ${String(rollbackErr)}`);
				changes.push(`State dir: ${legacyDir ?? "unknown"} → ${targetDir}`);
			}
		}
	}
	await migratePluginInstallIndex();
	return {
		migrated: changes.length > 0,
		skipped: false,
		changes,
		warnings,
		...notices.length > 0 ? { notices } : {}
	};
}
async function autoMigrateLegacyTaskStateSidecars(params) {
	if (autoMigrateTaskStateSidecarsChecked) return {
		migrated: false,
		skipped: true,
		changes: [],
		warnings: []
	};
	autoMigrateTaskStateSidecarsChecked = true;
	const result = await migrateLegacyTaskStateSidecars({ stateDir: resolveStateDir(params.env ?? process.env, params.homedir) });
	const logger = params.log ?? createSubsystemLogger("state-migrations");
	if (result.changes.length > 0) logger.info(`Auto-migrated legacy state:\n${result.changes.map((entry) => `- ${entry}`).join("\n")}`);
	if (result.warnings.length > 0) logger.warn(`Legacy state migration warnings:\n${result.warnings.map((entry) => `- ${entry}`).join("\n")}`);
	return {
		migrated: result.changes.length > 0,
		skipped: false,
		changes: result.changes,
		warnings: result.warnings
	};
}
//#endregion
//#region src/infra/state-migrations.subagent-registry-db.ts
const MIGRATION_KIND$1 = "legacy-subagent-registry-json";
/** Records the irreversible retirement decision before Doctor removes the claimed file. */
function recordLegacySubagentRegistryDiscard(params) {
	const sourceKey = `subagent-json:${createHash("sha256").update(params.sourcePath).digest("hex")}`;
	const now = Date.now();
	const runId = `${sourceKey}:${params.sourceSha256.slice(0, 16)}`;
	let decision = "retired-source-discarded";
	runOpenClawStateWriteTransaction(({ db }) => {
		const stateDb = getNodeSqliteKysely(db);
		if (executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("migration_sources").select("source_key").where("source_key", "=", sourceKey))) decision = "receipt-authoritative";
		const reportJson = JSON.stringify({
			source: MIGRATION_KIND$1,
			target: "subagent_runs",
			decision,
			sourceSha256: params.sourceSha256,
			importedRecordCount: 0,
			reason: "retired transient state is never imported into the canonical SQLite registry"
		});
		executeSqliteQuerySync(db, stateDb.insertInto("migration_runs").values({
			id: runId,
			started_at: now,
			finished_at: now,
			status: "completed",
			report_json: reportJson
		}).onConflict((conflict) => conflict.column("id").doUpdateSet({
			finished_at: now,
			status: "completed",
			report_json: reportJson
		})));
		executeSqliteQuerySync(db, stateDb.insertInto("migration_sources").values({
			source_key: sourceKey,
			migration_kind: MIGRATION_KIND$1,
			source_path: params.sourcePath,
			target_table: "subagent_runs",
			source_sha256: params.sourceSha256,
			source_size_bytes: params.sourceSize,
			source_record_count: null,
			last_run_id: runId,
			status: "completed",
			imported_at: now,
			removed_source: 0,
			report_json: reportJson
		}).onConflict((conflict) => conflict.column("source_key").doUpdateSet({
			source_sha256: params.sourceSha256,
			source_size_bytes: params.sourceSize,
			source_record_count: null,
			last_run_id: runId,
			status: "completed",
			imported_at: now,
			removed_source: 0,
			report_json: reportJson
		})));
	}, { env: params.env });
	return {
		decision,
		sourceKey
	};
}
function markLegacySubagentRegistrySourceRemoved(sourceKey, env) {
	runOpenClawStateWriteTransaction(({ db }) => {
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("migration_sources").set({ removed_source: 1 }).where("source_key", "=", sourceKey));
	}, { env });
}
//#endregion
//#region src/infra/state-migrations.subagent-registry.ts
const LEGACY_SUBAGENT_REGISTRY_MAX_BYTES = 16 * 1024 * 1024;
const DOCTOR_CLAIM_SUFFIX = ".doctor-importing";
function resolveLegacySubagentRegistryPath(stateDir) {
	return path.join(stateDir, "subagents", "runs.json");
}
/** Detect retired subagent state only when an explicit Doctor flow opts in. */
function detectLegacySubagentRegistry(params) {
	const sourcePath = resolveLegacySubagentRegistryPath(params.stateDir);
	return {
		sourcePath,
		hasLegacy: params.doctorOnlyStateMigrations === true && legacyMigrationSourceOrClaimMayExist(sourcePath)
	};
}
async function recoverInterruptedClaim(params) {
	if (!await params.source.exists(true)) return;
	const claimed = await params.source.read(true);
	if (!await params.source.exists()) {
		const restoreError = await params.source.restore();
		if (restoreError) throw new Error(restoreError);
		return;
	}
	await params.source.read();
	const result = recordLegacySubagentRegistryDiscard({
		env: params.env,
		sourcePath: params.source.sourcePath,
		sourceSha256: claimed.sha256,
		sourceSize: claimed.size
	});
	await params.source.remove({ skipSourceCheck: true });
	markLegacySubagentRegistrySourceRemoved(result.sourceKey, params.env);
}
async function migrateWithExclusiveStateOwnership(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	const sourcePath = params.detected.sourcePath;
	const source = new LegacyMigrationSourceClaim({
		stateRoot: params.stateRoot,
		stateDir: params.stateDir,
		sourcePath,
		label: "subagent registry",
		claimSuffix: DOCTOR_CLAIM_SUFFIX,
		readSnapshot: (snapshotPath) => readLegacyMigrationSourceSnapshot({
			stateRoot: params.stateRoot,
			stateDir: params.stateDir,
			sourcePath: snapshotPath,
			maxBytes: LEGACY_SUBAGENT_REGISTRY_MAX_BYTES,
			label: "subagent registry"
		})
	});
	if (!params.detected.hasLegacy) return {
		changes,
		warnings
	};
	let snapshot;
	try {
		await recoverInterruptedClaim({
			source,
			env: params.env
		});
		if (!await source.exists()) return {
			changes,
			warnings
		};
		snapshot = await source.read();
	} catch (error) {
		warnings.push(`Failed reading legacy subagent registry: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		params.beforeVerify?.();
		if (!legacyMigrationSourceSnapshotsMatch(await source.read(), snapshot)) throw new Error("legacy subagent registry changed after Doctor loaded it");
		await source.claim({
			snapshot,
			mismatchMessage: "legacy subagent registry changed before Doctor could claim it",
			beforeClaim: params.beforeClaim
		});
	} catch (error) {
		const restoreError = await source.restore();
		warnings.push(`Failed migrating legacy subagent registry: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	let result;
	try {
		result = recordLegacySubagentRegistryDiscard({
			env: params.env,
			sourcePath: snapshot.sourcePath,
			sourceSha256: snapshot.sha256,
			sourceSize: snapshot.size
		});
	} catch (error) {
		const restoreError = await source.restore();
		warnings.push(`Failed migrating legacy subagent registry: ${String(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	try {
		await source.remove({
			removeSource: params.removeSource,
			sourceReappearedMessage: `legacy subagent registry reappeared during retirement: ${sourcePath}`,
			sourceRemainingMessage: `legacy subagent registry reappeared during cleanup: ${sourcePath}`,
			claimRemainingMessage: `legacy subagent registry Doctor claim remains after cleanup: ${source.claimPath}`
		});
	} catch (error) {
		warnings.push(`Legacy subagent registry retirement cleanup failed: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		markLegacySubagentRegistrySourceRemoved(result.sourceKey, params.env);
	} catch (error) {
		warnings.push(`Legacy subagent registry was removed, but its receipt could not be finalized: ${String(error)}`);
	}
	changes.push(result.decision === "receipt-authoritative" ? "Discarded recreated retired subagent JSON without importing it." : "Discarded retired subagent JSON without importing transient run state.");
	notices.push("Removed retired subagents/runs.json after the discard decision was recorded.");
	return {
		changes,
		warnings,
		notices
	};
}
/** Discard retired transient state while excluding active Gateway owners. */
async function migrateLegacySubagentRegistry(params) {
	if (!params.detected.hasLegacy) return {
		changes: [],
		warnings: []
	};
	return await withLegacyMigrationStateLock({
		stateDir: params.stateDir,
		env: params.env,
		label: "legacy subagent registry",
		releaseLabel: "Subagent registry",
		errorLabel: "Failed reading legacy subagent registry",
		retryGuidance: "Stop the Gateway, then run `openclaw doctor --fix` again.",
		run: async (env) => {
			const stateRoot = await root$1(params.stateDir, {
				hardlinks: "reject",
				maxBytes: LEGACY_SUBAGENT_REGISTRY_MAX_BYTES,
				symlinks: "reject"
			});
			return await migrateWithExclusiveStateOwnership({
				...params,
				env,
				stateRoot
			});
		}
	});
}
//#endregion
//#region src/infra/state-migrations.tui-last-session.ts
const LEGACY_RECORD_KEYS = /* @__PURE__ */ new Set(["sessionKey", "updatedAt"]);
function resolveLegacyTuiLastSessionPath(stateDir) {
	return path.join(stateDir, "tui", "last-session.json");
}
/** Detect retired TUI state only when an explicit doctor flow opts in. */
function detectLegacyTuiLastSessions(params) {
	const sourcePath = resolveLegacyTuiLastSessionPath(params.stateDir);
	return {
		sourcePath,
		hasLegacy: params.doctorOnlyStateMigrations === true && fs.existsSync(sourcePath)
	};
}
function readLegacySourceSnapshot(sourcePath) {
	return readLegacyMigrationSourceSnapshotSync({
		sourcePath,
		label: "TUI last-session",
		followSymlinks: true
	});
}
function assertLegacySourceUnchanged(sourcePath, expected) {
	assertLegacyMigrationSourceUnchanged({
		sourcePath,
		snapshot: expected,
		label: "TUI last-session",
		followSymlinks: true
	});
}
function isObjectRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isHeartbeatSessionKey(sessionKey) {
	return sessionKey.toLowerCase().endsWith(":heartbeat");
}
function parseLegacyTuiLastSessions(raw) {
	const parsed = JSON.parse(raw);
	if (!isObjectRecord(parsed)) throw new Error("legacy TUI last-session store must be a JSON object");
	const records = [];
	for (const [scopeKey, value] of Object.entries(parsed)) {
		if (!scopeKey || scopeKey.trim() !== scopeKey) throw new Error("legacy TUI last-session store contains an invalid scope key");
		if (!isObjectRecord(value)) throw new Error(`legacy TUI last-session record ${scopeKey} must be an object`);
		const unexpectedKey = Object.keys(value).find((key) => !LEGACY_RECORD_KEYS.has(key));
		if (unexpectedKey) throw new Error(`legacy TUI last-session record ${scopeKey} has unexpected field ${unexpectedKey}`);
		const sessionKey = value.sessionKey;
		const updatedAt = value.updatedAt;
		if (typeof sessionKey !== "string" || !sessionKey || sessionKey.trim() !== sessionKey || sessionKey === "unknown") throw new Error(`legacy TUI last-session record ${scopeKey} has an invalid session key`);
		if (!Number.isSafeInteger(updatedAt) || updatedAt < 0) throw new Error(`legacy TUI last-session record ${scopeKey} has an invalid timestamp`);
		records.push({
			scopeKey,
			sessionKey,
			updatedAt
		});
	}
	return records;
}
function rowMatches(row, expected) {
	return row?.session_key === expected.sessionKey && row.updated_at === expected.updatedAt;
}
/** Import, verify, and remove the retired JSON store during an explicit doctor repair. */
function migrateLegacyTuiLastSessions(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	if (!params.detected.hasLegacy) return {
		changes,
		warnings
	};
	let snapshot;
	let records;
	try {
		snapshot = readLegacySourceSnapshot(params.detected.sourcePath);
		records = parseLegacyTuiLastSessions(snapshot.raw);
	} catch (error) {
		warnings.push(`Failed reading legacy TUI last-session state ${params.detected.sourcePath}: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	const activeRecords = records.filter((record) => !isHeartbeatSessionKey(record.sessionKey));
	const discardedHeartbeatCount = records.length - activeRecords.length;
	const expectedRows = /* @__PURE__ */ new Map();
	let importedCount = 0;
	let supersededCount = 0;
	try {
		assertLegacySourceUnchanged(params.detected.sourcePath, snapshot);
		runOpenClawStateWriteTransaction(({ db }) => {
			const tuiDb = getNodeSqliteKysely(db);
			for (const record of activeRecords) {
				const existing = executeSqliteQueryTakeFirstSync(db, tuiDb.selectFrom("tui_last_sessions").select(["session_key", "updated_at"]).where("scope_key", "=", record.scopeKey));
				if (!existing) {
					executeSqliteQuerySync(db, tuiDb.insertInto("tui_last_sessions").values({
						scope_key: record.scopeKey,
						session_key: record.sessionKey,
						updated_at: record.updatedAt
					}));
					expectedRows.set(record.scopeKey, record);
					importedCount += 1;
					continue;
				}
				if (existing.updated_at === record.updatedAt) {
					if (existing.session_key !== record.sessionKey) throw new Error(`scope ${record.scopeKey} has divergent JSON and SQLite pointers at the same timestamp`);
					expectedRows.set(record.scopeKey, record);
					continue;
				}
				if (existing.updated_at > record.updatedAt) {
					expectedRows.set(record.scopeKey, {
						scopeKey: record.scopeKey,
						sessionKey: existing.session_key,
						updatedAt: existing.updated_at
					});
					supersededCount += 1;
					continue;
				}
				executeSqliteQuerySync(db, tuiDb.updateTable("tui_last_sessions").set({
					session_key: record.sessionKey,
					updated_at: record.updatedAt
				}).where("scope_key", "=", record.scopeKey));
				expectedRows.set(record.scopeKey, record);
				importedCount += 1;
			}
		}, { env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
	} catch (error) {
		warnings.push(`Failed migrating legacy TUI last-session state: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		params.beforeVerify?.();
		const database = openOpenClawStateDatabase({ env: {
			...process.env,
			OPENCLAW_STATE_DIR: params.stateDir
		} });
		const tuiDb = getNodeSqliteKysely(database.db);
		for (const expected of expectedRows.values()) if (!rowMatches(executeSqliteQueryTakeFirstSync(database.db, tuiDb.selectFrom("tui_last_sessions").select(["session_key", "updated_at"]).where("scope_key", "=", expected.scopeKey)), expected)) throw new Error(`SQLite verification failed for scope ${expected.scopeKey}`);
		assertLegacySourceUnchanged(params.detected.sourcePath, snapshot);
	} catch (error) {
		warnings.push(`Failed verifying legacy TUI last-session migration: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	try {
		claimAndRemoveLegacyMigrationSource({
			sourcePath: params.detected.sourcePath,
			snapshot,
			label: "TUI last-session",
			followSymlinks: true,
			beforeClaim: params.beforeClaim,
			removeSource: params.removeSource
		});
	} catch (error) {
		warnings.push(`Migrated TUI last-session state but could not remove legacy source ${params.detected.sourcePath}: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	if (importedCount > 0) changes.push(`Migrated ${importedCount} TUI last-session pointer(s) → shared SQLite state`);
	if (discardedHeartbeatCount > 0) changes.push(`Discarded ${discardedHeartbeatCount} legacy heartbeat TUI restore pointer(s)`);
	changes.push("Removed legacy TUI last-session JSON after SQLite verification");
	if (supersededCount > 0) notices.push(`Kept ${supersededCount} newer shared SQLite TUI last-session pointer(s) over legacy JSON`);
	return notices.length > 0 ? {
		changes,
		warnings,
		notices
	} : {
		changes,
		warnings
	};
}
//#endregion
//#region src/infra/state-migrations.update-check.ts
const UPDATE_CHECK_STATE_KEY = "default";
const UPDATE_CHECK_STATE_FIELDS = [
	["lastCheckedAt", "last_checked_at"],
	["lastNotifiedVersion", "last_notified_version"],
	["lastNotifiedTag", "last_notified_tag"],
	["lastAvailableVersion", "last_available_version"],
	["lastAvailableTag", "last_available_tag"],
	["autoInstallId", "auto_install_id"],
	["autoFirstSeenVersion", "auto_first_seen_version"],
	["autoFirstSeenTag", "auto_first_seen_tag"],
	["autoFirstSeenAt", "auto_first_seen_at"],
	["autoLastAttemptVersion", "auto_last_attempt_version"],
	["autoLastAttemptAt", "auto_last_attempt_at"],
	["autoLastSuccessVersion", "auto_last_success_version"],
	["autoLastSuccessAt", "auto_last_success_at"]
];
function resolveLegacyUpdateCheckPath(stateDir) {
	return path.join(stateDir, "update-check.json");
}
function normalizeLegacyUpdateCheckState(input) {
	const record = input && typeof input === "object" ? input : {};
	return Object.fromEntries(UPDATE_CHECK_STATE_FIELDS.map(([field]) => {
		const value = record[field];
		return [field, typeof value === "string" && value.trim().length > 0 ? value : void 0];
	}));
}
function legacyUpdateCheckStateMatches(row, state) {
	return UPDATE_CHECK_STATE_FIELDS.every(([field, column]) => (state[field] ?? null) === row[column]);
}
function migrateLegacyUpdateCheckState(params) {
	return migrateLegacyJsonState({
		sourcePath: params.detected.sourcePath,
		stateDir: params.stateDir,
		label: "update-check state",
		normalize: normalizeLegacyUpdateCheckState,
		migrate(db, state) {
			const stateDb = getNodeSqliteKysely(db);
			const existing = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("update_check_state").selectAll().where("state_key", "=", UPDATE_CHECK_STATE_KEY));
			if (existing) return {
				changes: [],
				...legacyUpdateCheckStateMatches(existing, state) ? {} : { notices: [`Kept shared SQLite update-check state because legacy cache differs: ${params.detected.sourcePath}`] }
			};
			const columns = Object.fromEntries(UPDATE_CHECK_STATE_FIELDS.map(([field, column]) => [column, state[field] ?? null]));
			executeSqliteQuerySync(db, stateDb.insertInto("update_check_state").values({
				state_key: UPDATE_CHECK_STATE_KEY,
				...columns,
				updated_at_ms: Date.now()
			}));
			return { changes: ["Migrated update-check state → shared SQLite state"] };
		}
	});
}
//#endregion
//#region src/infra/state-migrations.web-push-parse.ts
const SUBSCRIPTION_STORE_KEYS = /* @__PURE__ */ new Set(["subscriptionsByEndpointHash"]);
const SUBSCRIPTION_KEYS = /* @__PURE__ */ new Set([
	"subscriptionId",
	"endpoint",
	"keys",
	"createdAtMs",
	"updatedAtMs"
]);
const PUSH_KEYS = /* @__PURE__ */ new Set(["p256dh", "auth"]);
const VAPID_KEYS = /* @__PURE__ */ new Set([
	"publicKey",
	"privateKey",
	"subject"
]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function assertOnlyKeys(value, allowed, label) {
	const unexpected = Object.keys(value).find((key) => !allowed.has(key));
	if (unexpected) throw new Error(`${label} has unexpected field ${unexpected}`);
}
function parseLegacySubscriptions(raw) {
	const parsed = JSON.parse(raw);
	if (!isRecord(parsed) || !isRecord(parsed.subscriptionsByEndpointHash)) throw new Error("legacy Web Push subscriptions must be an object");
	assertOnlyKeys(parsed, SUBSCRIPTION_STORE_KEYS, "legacy Web Push subscriptions store");
	const subscriptions = /* @__PURE__ */ new Map();
	const subscriptionIds = /* @__PURE__ */ new Set();
	for (const [endpointHash, rawSubscription] of Object.entries(parsed.subscriptionsByEndpointHash)) {
		if (!isRecord(rawSubscription) || !isRecord(rawSubscription.keys)) throw new Error("legacy Web Push subscription is not an object");
		assertOnlyKeys(rawSubscription, SUBSCRIPTION_KEYS, "legacy Web Push subscription");
		assertOnlyKeys(rawSubscription.keys, PUSH_KEYS, "legacy Web Push subscription keys");
		const { subscriptionId, endpoint, createdAtMs, updatedAtMs } = rawSubscription;
		const p256dh = rawSubscription.keys.p256dh;
		const auth = rawSubscription.keys.auth;
		if (typeof subscriptionId !== "string" || !UUID_RE.test(subscriptionId) || typeof endpoint !== "string" || !isValidWebPushEndpoint(endpoint) || hashWebPushEndpoint(endpoint) !== endpointHash || !isValidWebPushKey(p256dh) || !isValidWebPushKey(auth) || typeof createdAtMs !== "number" || !Number.isSafeInteger(createdAtMs) || createdAtMs < 0 || typeof updatedAtMs !== "number" || !Number.isSafeInteger(updatedAtMs) || updatedAtMs < createdAtMs) throw new Error("legacy Web Push subscription is invalid");
		if (subscriptionIds.has(subscriptionId)) throw new Error("legacy Web Push subscriptions contain a duplicate subscription id");
		subscriptionIds.add(subscriptionId);
		subscriptions.set(endpointHash, {
			subscriptionId,
			endpoint,
			keys: {
				p256dh,
				auth
			},
			createdAtMs,
			updatedAtMs
		});
	}
	return subscriptions;
}
function parseLegacyVapidKeys(raw, env) {
	const parsed = JSON.parse(raw);
	if (!isRecord(parsed)) throw new Error("legacy Web Push VAPID keys must be an object");
	assertOnlyKeys(parsed, VAPID_KEYS, "legacy Web Push VAPID keys");
	if (parsed.subject !== void 0 && typeof parsed.subject !== "string") throw new Error("legacy Web Push VAPID keys are invalid");
	const subject = normalizeOptionalString(parsed.subject) ?? normalizeOptionalString(env.OPENCLAW_VAPID_SUBJECT) ?? "https://openclaw.ai";
	if (!isValidWebPushKey(parsed.publicKey) || !isValidWebPushKey(parsed.privateKey) || subject.length > 512) throw new Error("legacy Web Push VAPID keys are invalid");
	return createWebPushVapidKeyPair(parsed.publicKey, parsed.privateKey, subject);
}
//#endregion
//#region src/infra/state-migrations.web-push.ts
const LEGACY_SUBSCRIPTIONS_MAX_BYTES = 4 * 1024 * 1024;
const LEGACY_VAPID_KEYS_MAX_BYTES = 64 * 1024;
function resolveLegacyWebPushPaths(stateDir) {
	return {
		subscriptionsPath: path.join(stateDir, "push", "web-push-subscriptions.json"),
		vapidKeysPath: path.join(stateDir, "push", "vapid-keys.json")
	};
}
function detectLegacyWebPush(params) {
	const paths = resolveLegacyWebPushPaths(params.stateDir);
	return {
		...paths,
		hasLegacy: params.doctorOnlyStateMigrations === true && (legacyMigrationSourceOrClaimMayExist(paths.subscriptionsPath) || legacyMigrationSourceOrClaimMayExist(paths.vapidKeysPath))
	};
}
function createLegacySourceClaim$1(stateRoot, stateDir, sourcePath, maxBytes) {
	return new LegacyMigrationSourceClaim({
		stateRoot,
		stateDir,
		sourcePath,
		label: "Web Push",
		readSnapshot: (snapshotPath) => readLegacyMigrationSourceSnapshot({
			stateRoot,
			stateDir,
			sourcePath: snapshotPath,
			maxBytes,
			label: "Web Push",
			hashDecodedText: true
		})
	});
}
async function readLegacyState(stateRoot, stateDir, detected, env) {
	const subscriptionsSource = createLegacySourceClaim$1(stateRoot, stateDir, detected.subscriptionsPath, LEGACY_SUBSCRIPTIONS_MAX_BYTES);
	const vapidSource = createLegacySourceClaim$1(stateRoot, stateDir, detected.vapidKeysPath, LEGACY_VAPID_KEYS_MAX_BYTES);
	await subscriptionsSource.recover("interrupted Web Push doctor claim conflicts with its source");
	await vapidSource.recover("interrupted Web Push doctor claim conflicts with its source");
	const sources = [];
	let subscriptions = /* @__PURE__ */ new Map();
	let vapidKeys = null;
	if (await subscriptionsSource.exists()) {
		const snapshot = await subscriptionsSource.read();
		subscriptions = parseLegacySubscriptions(snapshot.raw);
		sources.push({
			claim: subscriptionsSource,
			snapshot
		});
	}
	if (await vapidSource.exists()) {
		const snapshot = await vapidSource.read();
		vapidKeys = parseLegacyVapidKeys(snapshot.raw, env);
		sources.push({
			claim: vapidSource,
			snapshot
		});
	}
	return {
		subscriptions,
		vapidKeys,
		sources
	};
}
async function assertSourcesUnchanged(sources) {
	for (const { claim, snapshot } of sources) if (!legacyMigrationSourceSnapshotsMatch(await claim.read(), snapshot)) throw new Error("legacy Web Push source changed after doctor loaded it");
}
function mergedSubscription(params) {
	const { existing, legacy } = params;
	const createdAtMs = Math.min(existing.createdAtMs, legacy.createdAtMs);
	if (existing.updatedAtMs === legacy.updatedAtMs) {
		const normalizedExisting = {
			...existing,
			createdAtMs
		};
		if (!webPushSubscriptionsEqual(normalizedExisting, {
			...legacy,
			createdAtMs
		})) throw new Error("Web Push subscription diverges at the same timestamp");
		return normalizedExisting;
	}
	return {
		...existing.updatedAtMs > legacy.updatedAtMs ? existing : legacy,
		createdAtMs
	};
}
function findSubscriptionById(db, subscriptionId) {
	return executeSqliteQueryTakeFirstSync(db, getNodeSqliteKysely(db).selectFrom("web_push_subscriptions").selectAll().where("subscription_id", "=", subscriptionId));
}
function writeSubscription(db, endpointHash, subscription) {
	const row = webPushSubscriptionToRow({
		endpointHash,
		subscription
	});
	executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("web_push_subscriptions").values(row).onConflict((conflict) => conflict.column("endpoint_hash").doUpdateSet({
		subscription_id: row.subscription_id,
		endpoint: row.endpoint,
		p256dh: row.p256dh,
		auth: row.auth,
		created_at_ms: row.created_at_ms,
		updated_at_ms: row.updated_at_ms
	})));
}
function migrateIntoDatabase(params) {
	let importedSubscriptions = 0;
	let importedVapidKeys = false;
	runOpenClawStateWriteTransaction(({ db }) => {
		const webPushDb = getNodeSqliteKysely(db);
		const expectedSubscriptions = /* @__PURE__ */ new Map();
		for (const [endpointHash, legacySubscription] of params.legacy.subscriptions) {
			const existingRow = executeSqliteQueryTakeFirstSync(db, webPushDb.selectFrom("web_push_subscriptions").selectAll().where("endpoint_hash", "=", endpointHash));
			if (existingRow && existingRow.endpoint !== legacySubscription.endpoint) throw new Error("Web Push endpoint hash collision during legacy import");
			const existing = existingRow ? webPushSubscriptionFromRow(existingRow) : null;
			const expected = existing ? mergedSubscription({
				existing,
				legacy: legacySubscription
			}) : legacySubscription;
			const conflictingIdRow = findSubscriptionById(db, expected.subscriptionId);
			if (conflictingIdRow && conflictingIdRow.endpoint_hash !== endpointHash) throw new Error("Web Push subscription id conflicts with another endpoint");
			if (!existing || !webPushSubscriptionsEqual(existing, expected)) {
				writeSubscription(db, endpointHash, expected);
				importedSubscriptions += 1;
			}
			expectedSubscriptions.set(endpointHash, expected);
		}
		let expectedVapidKeys = null;
		if (params.legacy.vapidKeys) {
			const existingVapidRow = executeSqliteQueryTakeFirstSync(db, webPushDb.selectFrom("web_push_vapid_keys").selectAll().where("key_id", "=", WEB_PUSH_VAPID_KEY_ID));
			if (existingVapidRow) {
				if (existingVapidRow.public_key !== params.legacy.vapidKeys.publicKey || existingVapidRow.private_key !== params.legacy.vapidKeys.privateKey) throw new Error("legacy Web Push VAPID identity conflicts with SQLite");
				expectedVapidKeys = createWebPushVapidKeyPair(existingVapidRow.public_key, existingVapidRow.private_key, existingVapidRow.subject);
			} else {
				executeSqliteQuerySync(db, webPushDb.insertInto("web_push_vapid_keys").values(webPushVapidKeyPairToRow({
					keyPair: params.legacy.vapidKeys,
					nowMs: params.nowMs
				})));
				expectedVapidKeys = params.legacy.vapidKeys;
				importedVapidKeys = true;
			}
		}
		for (const [endpointHash, expected] of expectedSubscriptions) {
			const row = executeSqliteQueryTakeFirstSync(db, webPushDb.selectFrom("web_push_subscriptions").selectAll().where("endpoint_hash", "=", endpointHash));
			if (!row || !webPushSubscriptionsEqual(webPushSubscriptionFromRow(row), expected)) throw new Error("SQLite verification failed for a Web Push subscription");
		}
		if (expectedVapidKeys) {
			const row = executeSqliteQueryTakeFirstSync(db, webPushDb.selectFrom("web_push_vapid_keys").selectAll().where("key_id", "=", WEB_PUSH_VAPID_KEY_ID));
			if (!row || row.public_key !== expectedVapidKeys.publicKey || row.private_key !== expectedVapidKeys.privateKey || row.subject !== expectedVapidKeys.subject) throw new Error("SQLite verification failed for the Web Push VAPID identity");
		}
	}, { env: {
		...process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} });
	return {
		importedSubscriptions,
		importedVapidKeys
	};
}
async function removeClaimedSources(params) {
	for (const claim of params.claimed) if (await claim.exists()) throw new Error(`legacy Web Push source reappeared during import: ${claim.sourcePath}`);
	for (const claim of params.claimed) await claim.remove({
		removeSource: params.removeSource,
		skipSourceCheck: true
	});
}
async function migrateLegacyWebPushWithExclusiveStateOwnership(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	if (!params.detected.hasLegacy) return {
		changes,
		warnings
	};
	let legacy;
	try {
		legacy = await readLegacyState(params.stateRoot, params.stateDir, params.detected, params.env);
	} catch (error) {
		warnings.push(`Failed reading legacy Web Push state: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	let claimed;
	try {
		params.beforeVerify?.();
		await assertSourcesUnchanged(legacy.sources);
		await claimLegacyMigrationSourceClaims(legacy.sources, {
			beforeClaim: params.beforeClaim,
			mismatchMessage: "legacy Web Push source changed before doctor could claim it"
		});
		claimed = legacy.sources.map(({ claim }) => claim);
	} catch (error) {
		warnings.push(`Failed migrating legacy Web Push state: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	let result;
	try {
		result = migrateIntoDatabase({
			stateDir: params.stateDir,
			legacy,
			nowMs: Date.now()
		});
	} catch (error) {
		const restoreErrors = await restoreLegacyMigrationSourceClaims(claimed);
		warnings.push(`Failed migrating legacy Web Push state: ${String(error)}${restoreErrors.length > 0 ? `; restore failures: ${restoreErrors.join("; ")}` : ""}`);
		return {
			changes,
			warnings
		};
	}
	try {
		await removeClaimedSources({
			claimed,
			removeSource: params.removeSource
		});
	} catch (error) {
		warnings.push(`Web Push state is in SQLite, but legacy cleanup failed: ${String(error)}`);
		return {
			changes,
			warnings
		};
	}
	changes.push(`Migrated ${result.importedSubscriptions} Web Push subscription${result.importedSubscriptions === 1 ? "" : "s"} to SQLite.`);
	if (result.importedVapidKeys) changes.push("Migrated the Web Push VAPID identity to SQLite.");
	notices.push("Removed retired Web Push JSON state after verified SQLite import.");
	return {
		changes,
		warnings,
		notices
	};
}
async function migrateLegacyWebPush(params) {
	if (!params.detected.hasLegacy) return {
		changes: [],
		warnings: []
	};
	return await withLegacyMigrationStateLock({
		stateDir: params.stateDir,
		env: params.env,
		label: "legacy Web Push state",
		releaseLabel: "Web Push",
		errorLabel: "Failed reading legacy Web Push state",
		run: async (env) => {
			const stateRoot = await root$1(params.stateDir, {
				hardlinks: "reject",
				maxBytes: LEGACY_SUBSCRIPTIONS_MAX_BYTES,
				symlinks: "reject"
			});
			return await migrateLegacyWebPushWithExclusiveStateOwnership({
				...params,
				env,
				stateRoot
			});
		}
	});
}
//#endregion
//#region src/infra/state-migrations.workspace-setup-receipts.ts
function resolveWorkspaceMigrationSourceKey(source) {
	return resolveLegacyMigrationSourceKey(`workspace-${source.kind}`, source.sourcePath, source.workspaceKey);
}
function readReceipt(source, env) {
	const receipt = readLegacyMigrationReceipt(resolveWorkspaceMigrationSourceKey(source), env);
	return receipt ? {
		sourceKey: receipt.sourceKey,
		sha256: receipt.sourceSha256,
		removedSource: receipt.removedSource
	} : null;
}
//#endregion
//#region src/infra/state-migrations.workspace-setup-sandbox.ts
function listSandboxWorkspaceDirs(params) {
	const dirs = /* @__PURE__ */ new Set();
	for (const agentId of listAgentIds(params.cfg)) {
		const sandbox = resolveSandboxConfigForAgent(params.cfg, agentId);
		if (sandbox.mode === "off" || sandbox.workspaceAccess === "rw") continue;
		const workspaceRoot = resolveUserPath(resolveAgentConfig(params.cfg, agentId)?.sandbox?.workspaceRoot ?? params.cfg.agents?.defaults?.sandbox?.workspaceRoot ?? path.join(params.stateDir, "sandboxes"), params.env, params.homedir);
		if (sandbox.scope === "shared") {
			dirs.add(workspaceRoot);
			continue;
		}
		if (sandbox.scope === "agent") {
			const layout = resolveSandboxWorkspaceLayoutPaths({
				cfg: {
					...sandbox,
					workspaceRoot
				},
				rawSessionKey: `agent:${agentId}:main`,
				workspaceDir: resolveAgentWorkspaceDir(params.cfg, agentId, params.env)
			});
			dirs.add(layout.sandboxWorkspaceDir);
			continue;
		}
		const sessionKeys = listSqliteSessionEntryKeysReadOnly({
			agentId,
			env: params.env,
			storePath: resolveStorePath(params.cfg.session?.store, {
				agentId,
				env: params.env
			})
		});
		for (const sessionKey of sessionKeys) {
			const sessionAgentId = parseAgentSessionKey(sessionKey)?.agentId;
			if (sessionAgentId && sessionAgentId !== agentId) continue;
			if (!resolveSandboxRuntimeStatus({
				cfg: params.cfg,
				sessionKey,
				agentId
			}).sandboxed) continue;
			const layout = resolveSandboxWorkspaceLayoutPaths({
				cfg: {
					...sandbox,
					workspaceRoot
				},
				rawSessionKey: sessionKey,
				workspaceDir: resolveAgentWorkspaceDir(params.cfg, agentId, params.env)
			});
			dirs.add(layout.sandboxWorkspaceDir);
		}
	}
	return [...dirs];
}
//#endregion
//#region src/infra/state-migrations.workspace-setup-store.ts
const MIGRATION_KIND = WORKSPACE_LEGACY_STATE_MIGRATION_KIND;
function parseIsoTimestamp(value, field) {
	if (value === void 0) return;
	if (typeof value !== "string" || value.length === 0) throw new Error(`legacy workspace setup ${field} is invalid`);
	const parsed = new Date(value);
	if (!Number.isFinite(parsed.getTime()) || parsed.toISOString() !== value) throw new Error(`legacy workspace setup ${field} is invalid`);
	return value;
}
function parseSetup(raw) {
	let value;
	try {
		value = JSON.parse(raw);
	} catch {
		throw new Error("legacy workspace setup contains invalid JSON");
	}
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("legacy workspace setup is not an object");
	const record = value;
	const allowed = /* @__PURE__ */ new Set([
		"version",
		"bootstrapSeededAt",
		"setupCompletedAt",
		"onboardingCompletedAt"
	]);
	if (Object.keys(record).some((key) => !allowed.has(key))) throw new Error("legacy workspace setup has an unexpected field");
	if (record.version !== void 0 && record.version !== 1) throw new Error("legacy workspace setup has an unsupported version");
	const bootstrapSeededAt = parseIsoTimestamp(record.bootstrapSeededAt, "bootstrap timestamp");
	const setupCompletedAt = parseIsoTimestamp(record.setupCompletedAt, "completion timestamp");
	const onboardingCompletedAt = parseIsoTimestamp(record.onboardingCompletedAt, "legacy completion timestamp");
	if (setupCompletedAt && onboardingCompletedAt && setupCompletedAt !== onboardingCompletedAt) throw new Error("legacy workspace setup has conflicting completion timestamps");
	const parsed = {
		...bootstrapSeededAt ? { bootstrapSeededAt } : {},
		...setupCompletedAt ?? onboardingCompletedAt ? { setupCompletedAt: setupCompletedAt ?? onboardingCompletedAt } : {}
	};
	return {
		kind: "setup",
		value: parsed,
		recordCount: Number(Boolean(parsed.bootstrapSeededAt)) + Number(Boolean(parsed.setupCompletedAt))
	};
}
function parseAttestation(snapshot) {
	const lines = snapshot.raw.split(/\r?\n/);
	if (lines.at(-1) === "") lines.pop();
	if (lines[0] !== "openclaw-workspace-attestation:v1" || lines.length < 2) throw new Error("legacy workspace attestation has an invalid header");
	parseIsoTimestamp(lines[1], "attestation timestamp");
	const generatedHashes = /* @__PURE__ */ new Map();
	for (const line of lines.slice(2)) {
		const match = /^generated:([^:]+):([a-f0-9]{64})$/.exec(line);
		if (!match?.[1] || !match[2] || !isSafeWorkspaceAttestationFilename(match[1])) throw new Error("legacy workspace attestation has an invalid generated hash");
		if (generatedHashes.has(match[1])) throw new Error("legacy workspace attestation has a duplicate generated hash");
		generatedHashes.set(match[1], match[2]);
	}
	const attestedAtMs = Math.trunc(snapshot.mtimeMs);
	if (!Number.isSafeInteger(attestedAtMs) || attestedAtMs < 0) throw new Error("legacy workspace attestation has an invalid modification time");
	return {
		kind: "attestation",
		value: {
			attestedAtMs,
			generatedHashes
		},
		recordCount: 1 + generatedHashes.size
	};
}
function parseSource(source, snapshot) {
	return source.kind === "setup" ? parseSetup(snapshot.raw) : parseAttestation(snapshot);
}
function mapsEqual(left, right) {
	if (left.size !== right.size) return false;
	for (const [key, value] of left) if (right.get(key) !== value) return false;
	return true;
}
function canonicalFingerprint(value) {
	return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}
function setupFingerprint(params) {
	return canonicalFingerprint({
		kind: "setup",
		workspacePath: params.workspacePath,
		version: 1,
		bootstrapSeededAt: params.bootstrapSeededAt,
		setupCompletedAt: params.setupCompletedAt
	});
}
function attestationFingerprint(params) {
	return canonicalFingerprint({
		kind: "attestation",
		attestedAtMs: params.attestedAtMs,
		generatedHashes: [...params.generatedHashes.entries()].toSorted(([left], [right]) => left.localeCompare(right))
	});
}
function findMigrationAuthority(params) {
	const rows = executeSqliteQuerySync(params.db, params.kysely.selectFrom("migration_sources").select("report_json").where("migration_kind", "=", MIGRATION_KIND).where("target_table", "=", params.source.kind === "setup" ? "workspace_setup_state" : "workspace_attestations")).rows;
	let bestPriority = null;
	for (const row of rows) {
		if (!row.report_json) continue;
		try {
			const report = JSON.parse(row.report_json);
			if (report.workspaceKey !== params.source.workspaceKey || report.sourceKind !== params.source.kind || report.canonicalFingerprint !== params.fingerprint || report.authoritative !== true || typeof report.sourcePriority !== "number" || !Number.isSafeInteger(report.sourcePriority) || report.sourcePriority < 0) continue;
			bestPriority = bestPriority === null ? report.sourcePriority : Math.min(bestPriority, report.sourcePriority);
		} catch {}
	}
	return bestPriority === null ? null : { priority: bestPriority };
}
function canonicalCoversParsedSource(params) {
	const { db } = openOpenClawStateDatabase({ env: params.env });
	return runSqliteDeferredTransactionSync(db, () => {
		const kysely = getNodeSqliteKysely(db);
		if (params.source.kind === "setup" && params.parsed.kind === "setup") {
			if (!params.source.workspaceDir) return false;
			const row = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("workspace_setup_state").selectAll().where("workspace_key", "=", params.source.workspaceKey));
			if (!row || row.workspace_path !== params.source.workspaceDir || row.version !== 1) return false;
			const fingerprint = setupFingerprint({
				workspacePath: row.workspace_path,
				bootstrapSeededAt: row.bootstrap_seeded_at,
				setupCompletedAt: row.setup_completed_at
			});
			const sourceBootstrapSeededAt = params.parsed.value.bootstrapSeededAt ?? null;
			const sourceSetupCompletedAt = params.parsed.value.setupCompletedAt ?? null;
			const coversSource = (sourceBootstrapSeededAt === null || row.bootstrap_seeded_at === sourceBootstrapSeededAt) && (sourceSetupCompletedAt === null || row.setup_completed_at === sourceSetupCompletedAt);
			const authority = findMigrationAuthority({
				db,
				kysely,
				source: params.source,
				fingerprint
			});
			return coversSource || Boolean(authority && authority.priority <= params.source.priority);
		}
		if (params.source.kind !== "attestation" || params.parsed.kind !== "attestation") return false;
		const row = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("workspace_attestations").select("attested_at_ms").where("workspace_key", "=", params.source.workspaceKey));
		if (!row) return false;
		if (row.attested_at_ms > params.parsed.value.attestedAtMs) return true;
		if (row.attested_at_ms < params.parsed.value.attestedAtMs) return false;
		const hashes = new Map(executeSqliteQuerySync(db, kysely.selectFrom("workspace_generated_bootstrap_hashes").select(["filename", "sha256"]).where("workspace_key", "=", params.source.workspaceKey)).rows.map((hashRow) => [hashRow.filename, hashRow.sha256]));
		if (mapsEqual(hashes, params.parsed.value.generatedHashes)) return true;
		const fingerprint = attestationFingerprint({
			attestedAtMs: row.attested_at_ms,
			generatedHashes: hashes
		});
		const authority = findMigrationAuthority({
			db,
			kysely,
			source: params.source,
			fingerprint
		});
		return Boolean(authority && authority.priority <= params.source.priority);
	});
}
function importAndRecordReceipt(params) {
	const key = resolveWorkspaceMigrationSourceKey(params.source);
	const runId = `${key}:${params.snapshot.sha256.slice(0, 16)}`;
	const now = Date.now();
	return runOpenClawStateWriteTransaction((database) => {
		const { db } = database;
		const kysely = getNodeSqliteKysely(db);
		if (readLegacyMigrationReceiptFromDatabase(db, key)) throw new Error("workspace migration receipt appeared concurrently; retry Doctor");
		let imported = false;
		let resolution;
		let verifiedFingerprint;
		if (params.parsed.kind === "setup") {
			if (!params.source.workspaceDir) throw new Error("legacy workspace setup has no workspace path");
			const incomingFingerprint = setupFingerprint({
				workspacePath: params.source.workspaceDir,
				bootstrapSeededAt: params.parsed.value.bootstrapSeededAt ?? null,
				setupCompletedAt: params.parsed.value.setupCompletedAt ?? null
			});
			const existing = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("workspace_setup_state").selectAll().where("workspace_key", "=", params.source.workspaceKey));
			if (existing) {
				if (existing.workspace_path !== params.source.workspaceDir || existing.version !== 1) throw new Error("legacy workspace setup conflicts with canonical SQLite state");
				const existingFingerprint = setupFingerprint({
					workspacePath: existing.workspace_path,
					bootstrapSeededAt: existing.bootstrap_seeded_at,
					setupCompletedAt: existing.setup_completed_at
				});
				const sourceBootstrapSeededAt = params.parsed.value.bootstrapSeededAt ?? null;
				const sourceSetupCompletedAt = params.parsed.value.setupCompletedAt ?? null;
				const coversSource = (sourceBootstrapSeededAt === null || existing.bootstrap_seeded_at === sourceBootstrapSeededAt) && (sourceSetupCompletedAt === null || existing.setup_completed_at === sourceSetupCompletedAt);
				const authority = findMigrationAuthority({
					db,
					kysely,
					source: params.source,
					fingerprint: existingFingerprint
				});
				if (authority && params.source.priority < authority.priority) {
					executeSqliteQuerySync(db, kysely.updateTable("workspace_setup_state").set({
						bootstrap_seeded_at: sourceBootstrapSeededAt,
						setup_completed_at: sourceSetupCompletedAt,
						updated_at: now
					}).where("workspace_key", "=", params.source.workspaceKey));
					imported = true;
					resolution = "replaced";
					verifiedFingerprint = incomingFingerprint;
				} else if (coversSource) {
					resolution = "verified";
					verifiedFingerprint = existingFingerprint;
				} else if (!authority) {
					const mergedBootstrapSeededAt = existing.bootstrap_seeded_at ?? sourceBootstrapSeededAt;
					const mergedSetupCompletedAt = existing.setup_completed_at ?? sourceSetupCompletedAt;
					if (sourceBootstrapSeededAt !== null && existing.bootstrap_seeded_at !== null && sourceBootstrapSeededAt !== existing.bootstrap_seeded_at || sourceSetupCompletedAt !== null && existing.setup_completed_at !== null && sourceSetupCompletedAt !== existing.setup_completed_at) throw new Error("legacy workspace setup conflicts with canonical SQLite state");
					executeSqliteQuerySync(db, kysely.updateTable("workspace_setup_state").set({
						bootstrap_seeded_at: mergedBootstrapSeededAt,
						setup_completed_at: mergedSetupCompletedAt,
						updated_at: now
					}).where("workspace_key", "=", params.source.workspaceKey));
					imported = true;
					resolution = "merged";
					verifiedFingerprint = setupFingerprint({
						workspacePath: existing.workspace_path,
						bootstrapSeededAt: mergedBootstrapSeededAt,
						setupCompletedAt: mergedSetupCompletedAt
					});
				} else {
					resolution = "superseded";
					verifiedFingerprint = existingFingerprint;
				}
			} else {
				executeSqliteQuerySync(db, kysely.insertInto("workspace_setup_state").values({
					workspace_key: params.source.workspaceKey,
					workspace_path: params.source.workspaceDir,
					version: 1,
					bootstrap_seeded_at: params.parsed.value.bootstrapSeededAt ?? null,
					setup_completed_at: params.parsed.value.setupCompletedAt ?? null,
					updated_at: now
				}));
				imported = true;
				resolution = "inserted";
				verifiedFingerprint = incomingFingerprint;
			}
			const verified = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("workspace_setup_state").selectAll().where("workspace_key", "=", params.source.workspaceKey));
			const actualFingerprint = verified ? setupFingerprint({
				workspacePath: verified.workspace_path,
				bootstrapSeededAt: verified.bootstrap_seeded_at,
				setupCompletedAt: verified.setup_completed_at
			}) : null;
			if (!verified || actualFingerprint !== verifiedFingerprint) throw new Error("SQLite verification failed for workspace setup state");
		} else {
			const parsedAttestation = params.parsed.value;
			const incomingFingerprint = attestationFingerprint({
				attestedAtMs: parsedAttestation.attestedAtMs,
				generatedHashes: parsedAttestation.generatedHashes
			});
			const existing = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("workspace_attestations").selectAll().where("workspace_key", "=", params.source.workspaceKey));
			if (existing) {
				const rows = executeSqliteQuerySync(db, kysely.selectFrom("workspace_generated_bootstrap_hashes").select(["filename", "sha256"]).where("workspace_key", "=", params.source.workspaceKey)).rows;
				const existingHashes = new Map(rows.map((row) => [row.filename, row.sha256]));
				const existingFingerprint = attestationFingerprint({
					attestedAtMs: existing.attested_at_ms,
					generatedHashes: existingHashes
				});
				const replaceExistingAttestation = () => {
					executeSqliteQuerySync(db, kysely.updateTable("workspace_attestations").set({
						attested_at_ms: parsedAttestation.attestedAtMs,
						updated_at_ms: now
					}).where("workspace_key", "=", params.source.workspaceKey));
					executeSqliteQuerySync(db, kysely.deleteFrom("workspace_generated_bootstrap_hashes").where("workspace_key", "=", params.source.workspaceKey));
					const replacementHashes = [...parsedAttestation.generatedHashes.entries()].toSorted(([left], [right]) => left.localeCompare(right));
					if (replacementHashes.length > 0) executeSqliteQuerySync(db, kysely.insertInto("workspace_generated_bootstrap_hashes").values(replacementHashes.map(([filename, sha256]) => ({
						workspace_key: params.source.workspaceKey,
						filename,
						sha256
					}))));
				};
				if (existing.attested_at_ms === parsedAttestation.attestedAtMs && mapsEqual(existingHashes, parsedAttestation.generatedHashes)) {
					resolution = "verified";
					verifiedFingerprint = existingFingerprint;
				} else if (existing.attested_at_ms > parsedAttestation.attestedAtMs) {
					resolution = "superseded";
					verifiedFingerprint = existingFingerprint;
				} else if (existing.attested_at_ms === parsedAttestation.attestedAtMs) {
					const authority = findMigrationAuthority({
						db,
						kysely,
						source: params.source,
						fingerprint: existingFingerprint
					});
					if (!authority) throw new Error("legacy workspace attestation conflicts with canonical SQLite state");
					if (params.source.priority < authority.priority) {
						replaceExistingAttestation();
						imported = true;
						resolution = "replaced";
						verifiedFingerprint = incomingFingerprint;
					} else {
						resolution = "superseded";
						verifiedFingerprint = existingFingerprint;
					}
				} else {
					replaceExistingAttestation();
					imported = true;
					resolution = "replaced";
					verifiedFingerprint = incomingFingerprint;
				}
			} else {
				executeSqliteQuerySync(db, kysely.insertInto("workspace_attestations").values({
					workspace_key: params.source.workspaceKey,
					attested_at_ms: parsedAttestation.attestedAtMs,
					updated_at_ms: now
				}));
				const hashes = [...parsedAttestation.generatedHashes.entries()].toSorted(([a], [b]) => a.localeCompare(b));
				if (hashes.length > 0) executeSqliteQuerySync(db, kysely.insertInto("workspace_generated_bootstrap_hashes").values(hashes.map(([filename, sha256]) => ({
					workspace_key: params.source.workspaceKey,
					filename,
					sha256
				}))));
				imported = true;
				resolution = "inserted";
				verifiedFingerprint = incomingFingerprint;
			}
			const verified = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("workspace_attestations").select("attested_at_ms").where("workspace_key", "=", params.source.workspaceKey));
			const verifiedHashes = new Map(executeSqliteQuerySync(db, kysely.selectFrom("workspace_generated_bootstrap_hashes").select(["filename", "sha256"]).where("workspace_key", "=", params.source.workspaceKey)).rows.map((row) => [row.filename, row.sha256]));
			const actualFingerprint = verified ? attestationFingerprint({
				attestedAtMs: verified.attested_at_ms,
				generatedHashes: verifiedHashes
			}) : null;
			if (!verified || actualFingerprint !== verifiedFingerprint) throw new Error("SQLite verification failed for workspace attestation state");
		}
		if (params.source.workspaceDir) registerWorkspaceStateAliasesInTransaction({
			database,
			workspaceDirs: [params.source.workspaceDir, params.source.workspaceAliasPath ?? params.source.workspaceDir],
			identity: {
				workspaceKey: params.source.workspaceKey,
				workspacePath: params.source.workspaceDir
			},
			updatedAtMs: now
		});
		const targetTable = params.parsed.kind === "setup" ? "workspace_setup_state" : "workspace_attestations";
		const reportJson = JSON.stringify({
			source: MIGRATION_KIND,
			sourceKind: params.parsed.kind,
			target: targetTable,
			workspaceKey: params.source.workspaceKey,
			sourceSha256: params.snapshot.sha256,
			sourceRecordCount: params.parsed.recordCount,
			sourcePriority: params.source.priority,
			canonicalFingerprint: verifiedFingerprint,
			authoritative: resolution === "inserted" || resolution === "replaced",
			resolution,
			imported
		});
		recordLegacyMigrationReceipt(db, {
			sourceKey: key,
			migrationKind: MIGRATION_KIND,
			sourcePath: params.source.sourcePath,
			targetTable,
			sourceSha256: params.snapshot.sha256,
			sourceSizeBytes: params.snapshot.size,
			sourceRecordCount: params.parsed.recordCount,
			runId,
			now,
			reportJson
		});
		return {
			sourceKey: key,
			imported
		};
	}, { env: params.env });
}
//#endregion
//#region src/infra/state-migrations.workspace-setup.ts
const SETUP_MAX_BYTES = 64 * 1024;
const CLAIM_SUFFIX = WORKSPACE_DOCTOR_CLAIM_SUFFIX;
const utf8Decoder = new TextDecoder$1("utf-8", { fatal: true });
async function readBoundedRegularFile(params) {
	const opened = await params.sourceRoot.open(params.relativePath, {
		hardlinks: "reject",
		symlinks: "reject"
	});
	try {
		const before = opened.stat;
		if (!before.isFile() || before.nlink !== 1 || !Number.isSafeInteger(before.size) || before.size < 0 || before.size > params.maxBytes) throw new Error("legacy workspace source is not a safe regular file");
		const buffer = Buffer.alloc(before.size);
		let offset = 0;
		while (offset < buffer.length) {
			const { bytesRead } = await opened.handle.read(buffer, offset, buffer.length - offset, offset);
			if (bytesRead === 0) throw new Error("legacy workspace source ended unexpectedly");
			offset += bytesRead;
		}
		const after = await opened.handle.stat();
		if (!after.isFile() || after.nlink !== 1 || after.dev !== before.dev || after.ino !== before.ino || after.size !== before.size || after.mtimeMs !== before.mtimeMs || after.ctimeMs !== before.ctimeMs || offset !== after.size) throw new Error("legacy workspace source changed while reading");
		let raw;
		try {
			raw = utf8Decoder.decode(buffer);
		} catch {
			throw new Error("legacy workspace source is not valid UTF-8");
		}
		return {
			sourcePath: params.sourcePath,
			dev: after.dev,
			ino: after.ino,
			mtimeMs: after.mtimeMs,
			sha256: createHash("sha256").update(buffer).digest("hex"),
			size: after.size,
			raw
		};
	} finally {
		await opened[Symbol.asyncDispose]();
	}
}
function createLegacySourceClaim(sourceRoot, source) {
	return new LegacyMigrationSourceClaim({
		stateRoot: sourceRoot,
		stateDir: source.rootDir,
		sourcePath: source.sourcePath,
		label: "workspace",
		claimSuffix: CLAIM_SUFFIX,
		formatError: formatErrorMessage,
		readSnapshot: (sourcePath) => readBoundedRegularFile({
			sourceRoot,
			relativePath: sourcePath === source.sourcePath ? source.relativePath : `${source.relativePath}${CLAIM_SUFFIX}`,
			sourcePath,
			maxBytes: source.kind === "setup" ? SETUP_MAX_BYTES : LEGACY_WORKSPACE_ATTESTATION_MAX_BYTES
		})
	});
}
function createLegacySource(params) {
	const rootDir = path.resolve(params.rootDir);
	const sourcePath = path.resolve(params.sourcePath);
	const relativePath = path.relative(rootDir, sourcePath);
	if (!relativePath || relativePath === ".." || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) throw new Error("legacy workspace source is outside its migration root");
	return {
		...params,
		rootDir,
		relativePath,
		sourcePath
	};
}
function siblingAttestationNeedsDoctor(filePath) {
	try {
		const before = fs.lstatSync(filePath);
		if (!before.isFile()) return false;
		const noFollow = typeof fs.constants.O_NOFOLLOW === "number" ? fs.constants.O_NOFOLLOW : 0;
		let fd;
		try {
			fd = fs.openSync(filePath, fs.constants.O_RDONLY | noFollow);
		} catch {
			return true;
		}
		try {
			const opened = fs.fstatSync(fd);
			if (!opened.isFile() || opened.dev !== before.dev || opened.ino !== before.ino) return true;
			const expected = Buffer.from(`${LEGACY_WORKSPACE_ATTESTATION_HEADER}\n`, "utf8");
			const bytes = Buffer.alloc(expected.length);
			return fs.readSync(fd, bytes, 0, bytes.length, 0) === expected.length && bytes.equals(expected);
		} catch {
			return true;
		} finally {
			fs.closeSync(fd);
		}
	} catch {
		return false;
	}
}
function listOrphanAttestationSources(params) {
	const sources = [];
	const stateDirs = [.../* @__PURE__ */ new Set([params.stateDir, ...resolveLegacyStateDirs(params.homedir)])];
	for (const [priority, stateDir] of stateDirs.entries()) {
		const attestationDir = path.join(stateDir, LEGACY_WORKSPACE_ATTESTATION_DIRNAME);
		let entries;
		try {
			entries = fs.readdirSync(attestationDir, { withFileTypes: true });
		} catch (error) {
			if (error.code === "ENOENT") continue;
			sources.push({ ...createLegacySource({
				kind: "attestation",
				rootDir: stateDir,
				sourcePath: attestationDir,
				workspaceKey: "unreadable-attestation-directory",
				priority
			}) });
			continue;
		}
		for (const entry of entries) {
			const match = /^([a-f0-9]{64})\.attested(?:\.doctor-importing)?$/.exec(entry.name);
			if (!match?.[1]) continue;
			const sourceName = entry.name.endsWith(CLAIM_SUFFIX) ? entry.name.slice(0, -CLAIM_SUFFIX.length) : entry.name;
			sources.push(createLegacySource({
				kind: "attestation",
				rootDir: stateDir,
				sourcePath: path.join(attestationDir, sourceName),
				workspaceKey: match[1],
				priority
			}));
		}
	}
	return sources;
}
function addLegacyWorkspaceSources(params) {
	const identity = resolveWorkspaceStateIdentity(params.workspaceDir);
	const paths = resolveLegacyWorkspaceSourcePaths(params.workspaceDir, {
		env: params.env,
		homedir: params.homedir
	});
	for (const [priority, sourcePath] of paths.setupStatePaths.entries()) if (legacyMigrationSourceOrClaimMayExist(sourcePath)) params.add(createLegacySource({
		kind: "setup",
		rootDir: sourcePath.endsWith("openclaw-workspace-state.json") ? path.dirname(sourcePath) : path.dirname(path.dirname(sourcePath)),
		sourcePath,
		workspaceKey: identity.workspaceKey,
		workspaceDir: identity.workspacePath,
		workspaceAliasPath: paths.workspacePath,
		priority
	}));
	for (const [priority, sourcePath] of paths.stateDirAttestationPaths.entries()) if (legacyMigrationSourceOrClaimMayExist(sourcePath)) params.add(createLegacySource({
		kind: "attestation",
		rootDir: path.dirname(path.dirname(sourcePath)),
		sourcePath,
		workspaceKey: identity.workspaceKey,
		workspaceDir: identity.workspacePath,
		workspaceAliasPath: paths.workspacePath,
		priority
	}));
	for (const [index, sourcePath] of paths.siblingAttestationPaths.entries()) {
		if (!legacyMigrationPathMayExist(`${sourcePath}${CLAIM_SUFFIX}`) && !siblingAttestationNeedsDoctor(sourcePath)) continue;
		params.add(createLegacySource({
			kind: "attestation",
			rootDir: path.dirname(sourcePath),
			sourcePath,
			workspaceKey: identity.workspaceKey,
			workspaceDir: identity.workspacePath,
			workspaceAliasPath: paths.workspacePath,
			priority: paths.stateDirAttestationPaths.length + index
		}));
	}
}
/** Detect retired workspace files only when an explicit Doctor flow opts in. */
function detectLegacyWorkspaceState(params) {
	if (params.doctorOnlyStateMigrations !== true) return {
		sources: [],
		hasLegacy: false
	};
	const env = {
		...params.env ?? process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	};
	const homedir = params.homedir ?? os.homedir;
	const byPath = /* @__PURE__ */ new Map();
	const add = (source) => {
		const key = `${source.kind}:${path.resolve(source.sourcePath)}`;
		const existing = byPath.get(key);
		const sourceIsConfigured = source.workspaceDir !== void 0;
		const existingIsConfigured = existing?.workspaceDir !== void 0;
		if (!existing || sourceIsConfigured && !existingIsConfigured || sourceIsConfigured === existingIsConfigured && source.priority < existing.priority) byPath.set(key, source);
	};
	for (const workspaceDir of listAgentWorkspaceDirs(params.cfg)) addLegacyWorkspaceSources({
		workspaceDir,
		env,
		homedir,
		add
	});
	for (const workspaceDir of listSandboxWorkspaceDirs({
		cfg: params.cfg,
		env,
		homedir,
		stateDir: params.stateDir
	})) addLegacyWorkspaceSources({
		workspaceDir,
		env,
		homedir,
		add
	});
	for (const source of listOrphanAttestationSources({
		stateDir: params.stateDir,
		homedir
	})) add(source);
	const sources = [...byPath.values()].toSorted((left, right) => left.priority - right.priority || left.workspaceKey.localeCompare(right.workspaceKey) || left.sourcePath.localeCompare(right.sourcePath));
	return {
		sources,
		hasLegacy: sources.length > 0
	};
}
function assertConfiguredWorkspaceIdentity(source) {
	if (!source.workspaceAliasPath) return;
	if (!source.workspaceDir) throw new Error("configured legacy workspace source has no canonical path");
	const current = resolveWorkspaceStateIdentity(source.workspaceAliasPath);
	if (current.workspaceKey !== source.workspaceKey || current.workspacePath !== source.workspaceDir) throw new Error("configured workspace identity changed during Doctor migration");
}
async function cleanupReceiptSource(params) {
	try {
		assertConfiguredWorkspaceIdentity(params.source);
		const sourceClaim = params.sourceClaim;
		const hasSource = await sourceClaim.exists();
		const hasClaim = await sourceClaim.exists(true);
		if (!hasSource && !hasClaim) {
			if (!params.receipt.removedSource) markLegacyMigrationSourceRemoved(params.receipt.sourceKey, params.env);
			return {
				changes: [],
				warnings: []
			};
		}
		if (hasSource && hasClaim) return {
			changes: [],
			warnings: ["Workspace state is in SQLite, but source and interrupted claim both exist."]
		};
		let snapshot = await sourceClaim.read(hasClaim);
		let claimedByThisRun = false;
		if (hasSource) {
			try {
				snapshot = await sourceClaim.claim({
					snapshot,
					mismatchMessage: "legacy workspace source changed before Doctor could claim it"
				});
			} catch (error) {
				await sourceClaim.restore();
				throw error;
			}
			claimedByThisRun = true;
		}
		const parsed = parseSource(params.source, snapshot);
		if (!params.receipt.sha256 || snapshot.sha256 !== params.receipt.sha256 || !canonicalCoversParsedSource({
			source: params.source,
			parsed,
			env: params.env
		})) {
			if (claimedByThisRun) await sourceClaim.restore();
			return {
				changes: [],
				warnings: ["Workspace state is in SQLite, but the retired source now conflicts."]
			};
		}
		const unchanged = await sourceClaim.read(true);
		if (!legacyMigrationSourceSnapshotsMatch(snapshot, unchanged)) {
			if (claimedByThisRun) await sourceClaim.restore();
			throw new Error("legacy workspace claim changed before cleanup");
		}
		assertConfiguredWorkspaceIdentity(params.source);
		await sourceClaim.remove({ skipSourceCheck: true });
		markLegacyMigrationSourceRemoved(params.receipt.sourceKey, params.env);
		return {
			changes: [],
			warnings: [],
			notices: ["Discarded retired workspace state already covered by its SQLite receipt."]
		};
	} catch (error) {
		return {
			changes: [],
			warnings: [`Workspace state is in SQLite, but legacy cleanup failed: ${formatErrorMessage(error)}`]
		};
	}
}
async function migrateOneSource(params) {
	let sourceClaim;
	try {
		assertConfiguredWorkspaceIdentity(params.source);
		sourceClaim = createLegacySourceClaim(await root$1(params.source.rootDir, {
			hardlinks: "reject",
			symlinks: "reject"
		}), params.source);
	} catch (error) {
		return {
			changes: [],
			warnings: [`Failed reading legacy workspace state: ${formatErrorMessage(error)}`]
		};
	}
	const receipt = readReceipt(params.source, params.env);
	if (receipt) return cleanupReceiptSource({
		sourceClaim,
		source: params.source,
		receipt,
		env: params.env
	});
	let hasSource;
	let hasClaim;
	try {
		hasSource = await sourceClaim.exists();
		hasClaim = await sourceClaim.exists(true);
	} catch (error) {
		return {
			changes: [],
			warnings: [`Failed reading legacy workspace state: ${formatErrorMessage(error)}`]
		};
	}
	if (hasSource && hasClaim) return {
		changes: [],
		warnings: ["Failed migrating legacy workspace state: source and interrupted claim both exist."]
	};
	if (!hasSource && !hasClaim) return {
		changes: [],
		warnings: []
	};
	let snapshot;
	let parsed;
	let claimedByThisRun = false;
	try {
		snapshot = await sourceClaim.read(!hasSource);
		parsed = parseSource(params.source, snapshot);
	} catch (error) {
		return {
			changes: [],
			warnings: [`Failed reading legacy workspace state: ${formatErrorMessage(error)}`]
		};
	}
	if (hasSource) try {
		snapshot = await sourceClaim.claim({
			snapshot,
			beforeClaim: () => {
				params.beforeClaim?.(params.source);
				assertConfiguredWorkspaceIdentity(params.source);
			},
			mismatchMessage: "legacy workspace source changed before Doctor could claim it"
		});
		claimedByThisRun = true;
	} catch (error) {
		const restoreError = await sourceClaim.restore();
		return {
			changes: [],
			warnings: [`Failed migrating legacy workspace state: ${formatErrorMessage(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`]
		};
	}
	let result;
	try {
		assertConfiguredWorkspaceIdentity(params.source);
		result = importAndRecordReceipt({
			source: params.source,
			snapshot,
			parsed,
			env: params.env
		});
	} catch (error) {
		const restoreError = claimedByThisRun ? await sourceClaim.restore() : null;
		return {
			changes: [],
			warnings: [`Failed migrating legacy workspace state: ${formatErrorMessage(error)}${restoreError ? `; restore failure: ${restoreError}` : ""}`]
		};
	}
	try {
		if (await sourceClaim.exists()) throw new Error("legacy workspace source reappeared during import");
		const unchanged = await sourceClaim.read(true);
		if (!legacyMigrationSourceSnapshotsMatch(snapshot, unchanged)) throw new Error("legacy workspace claim changed after import");
		await sourceClaim.remove({
			removeSource: params.removeSource,
			skipSourceCheck: true
		});
		markLegacyMigrationSourceRemoved(result.sourceKey, params.env);
	} catch (error) {
		return {
			changes: [],
			warnings: [`Workspace state is in SQLite, but legacy cleanup failed: ${formatErrorMessage(error)}`]
		};
	}
	const label = parsed.kind === "setup" ? "workspace setup state" : "workspace attestation";
	return {
		changes: [result.imported ? `Migrated ${label} to SQLite.` : `Verified canonical SQLite ${label}.`],
		warnings: [],
		notices: ["Removed retired workspace state after verified SQLite import."]
	};
}
/** Import retired workspace files while excluding Gateways that can recreate them. */
async function migrateLegacyWorkspaceState(params) {
	const detected = params.detected;
	if (!detected?.hasLegacy) return {
		changes: [],
		warnings: []
	};
	return await withLegacyMigrationStateLock({
		stateDir: params.stateDir,
		env: params.env,
		label: "legacy workspace state",
		releaseLabel: "Workspace",
		formatAcquireError: formatErrorMessage,
		run: async (env) => {
			const changes = [];
			const warnings = [];
			const notices = [];
			for (const source of detected.sources) {
				const result = await migrateOneSource({
					source,
					env,
					...params.beforeClaim ? { beforeClaim: params.beforeClaim } : {},
					...params.removeSource ? { removeSource: params.removeSource } : {}
				});
				changes.push(...result.changes);
				warnings.push(...result.warnings);
				notices.push(...result.notices ?? []);
			}
			return notices.length > 0 ? {
				changes,
				warnings,
				notices
			} : {
				changes,
				warnings
			};
		}
	});
}
//#endregion
//#region src/infra/state-migrations.doctor.ts
function describeStateSchemaMigration(migration) {
	switch (migration.kind) {
		case "agent-databases-composite-primary-key": return "agent database registry primary key → agent_id,path";
		case "audit-events-v2": return "audit event ledger → versioned message lifecycle schema";
		case "operator-approvals-system-agent": return "operator approvals → OpenClaw system changes";
		case "session-watch-cursor-provenance-v4": return "session watch cursors → provenance column";
		case "strict-tables-v3": return "tables → SQLite STRICT typing";
	}
	return migration.kind;
}
const autoMigrateChecked = /* @__PURE__ */ new Set();
const PLUGIN_DOCTOR_MIGRATION_LOCK_TIMEOUT_MS = 250;
const PLUGIN_DOCTOR_MIGRATION_LOCK_POLL_INTERVAL_MS = 25;
function resetAutoMigrateLegacyStateForTest() {
	autoMigrateChecked.clear();
	resetAutoMigrateLegacyTaskStateSidecarsForTest();
	resetLegacySessionSurfacesForTest();
}
async function collectChannelLegacyStateMigrationPlans(params) {
	const plans = [];
	const detectors = listBundledChannelLegacyStateMigrationDetectors({ config: params.cfg });
	for (const detectLegacyStateMigrationsLocal of detectors) {
		const detected = await detectLegacyStateMigrationsLocal({
			cfg: params.cfg,
			env: params.env,
			stateDir: params.stateDir,
			oauthDir: params.oauthDir
		});
		if (detected?.length) for (const detectedPlan of detected) {
			const plan = detectedPlan.kind === "plugin-state-import" && !detectedPlan.stateDir ? {
				...detectedPlan,
				stateDir: params.stateDir
			} : detectedPlan;
			plans.push(plan);
		}
	}
	return plans;
}
async function collectPluginDoctorStateMigrationPlans(params) {
	const plans = [];
	const config = params.pluginDoctorConfig ?? params.cfg;
	for (const entry of listPluginDoctorStateMigrationEntries({
		config,
		env: params.env
	})) {
		if (entry.migration.doctorOnly === true && params.includeDoctorOnly !== true) continue;
		let detected;
		try {
			detected = await entry.migration.detectLegacyState({
				config,
				env: params.env,
				stateDir: params.stateDir,
				oauthDir: params.oauthDir,
				context: createPluginDoctorStateMigrationContext(entry.pluginId, params.env)
			});
		} catch (err) {
			params.warnings?.push(`Failed detecting ${entry.migration.label}: ${String(err)}`);
			continue;
		}
		if (detected?.preview.length) plans.push({
			pluginId: entry.pluginId,
			migration: entry.migration,
			preview: detected.preview
		});
	}
	return plans;
}
function createPluginDoctorStateMigrationContext(pluginId, env) {
	return {
		getPluginStateCapacity() {
			return getPluginStateCapacity(pluginId, env);
		},
		importPluginStateEntries(options, entries) {
			importPluginStateEntriesForDoctor(pluginId, {
				...options,
				env: options.env ?? env
			}, entries);
		},
		openPluginStateKeyedStore(options) {
			return createPluginStateKeyedStore(pluginId, {
				...options,
				env: options.env ?? env
			});
		}
	};
}
function resolveDoctorStateMigrationAgentId(cfg) {
	try {
		return normalizeAgentId(resolveDefaultAgentId(cfg));
	} catch {
		return LEGACY_IMPLICIT_AGENT_ID;
	}
}
function resolveConcreteBindingAccountId(value) {
	if (typeof value !== "string") return;
	const accountId = value.trim();
	return accountId && accountId !== "*" ? accountId : void 0;
}
async function detectLegacyStateMigrations(params) {
	const env = params.env ?? process.env;
	const homedir = params.homedir ?? os.homedir;
	const stateDir = resolveStateDir(env, homedir);
	const oauthDir = resolveOAuthDir(env, stateDir);
	const targetAgentId = resolveDoctorStateMigrationAgentId(params.cfg);
	const rawMainKey = params.cfg.session?.mainKey;
	const targetMainKey = typeof rawMainKey === "string" && rawMainKey.trim().length > 0 ? rawMainKey.trim() : DEFAULT_MAIN_KEY;
	const targetScope = params.cfg.session?.scope;
	const sessionsLegacyDir = path.join(stateDir, "sessions");
	const sessionsLegacyStorePath = path.join(sessionsLegacyDir, "sessions.json");
	const sessionsTargetDir = path.join(stateDir, "agents", targetAgentId, "sessions");
	const sessionsTargetStorePath = path.join(sessionsTargetDir, "sessions.json");
	const pluginConfig = params.pluginDoctorConfig ?? params.cfg;
	const pluginSessionStoreAgentIds = params.pluginSessionStoreAgentIds ?? listPluginDoctorSessionStoreAgentIds({
		config: pluginConfig,
		env,
		pluginIds: collectRelevantDoctorPluginIds(pluginConfig)
	});
	const currentSessionStoreOwnership = resolveSessionStoreOwnership({
		cfg: params.cfg,
		env,
		stateDir,
		targetAgentId,
		pluginSessionStoreAgentIds
	});
	const sessionStoreOwnership = {
		preserveAmbiguousKeys: params.sessionStoreOwnership?.preserveAmbiguousKeys === true || currentSessionStoreOwnership.preserveAmbiguousKeys,
		preserveForeignMainAliases: params.sessionStoreOwnership?.preserveForeignMainAliases === true || currentSessionStoreOwnership.preserveForeignMainAliases,
		targetStoreAliases: mergeSessionStoreAliasPlans(params.sessionStoreOwnership?.targetStoreAliases, currentSessionStoreOwnership.targetStoreAliases)
	};
	const { preserveForeignMainAliases } = sessionStoreOwnership;
	const legacySessionEntries = safeReadDir(sessionsLegacyDir);
	const hasLegacySessions = fileExists$1(sessionsLegacyStorePath) || legacySessionEntries.some((e) => e.isFile() && e.name.endsWith(".jsonl"));
	const targetSessionParsed = fileExists$1(sessionsTargetStorePath) ? readSessionStoreJson5(sessionsTargetStorePath) : {
		store: {},
		ok: true
	};
	const legacyKeys = targetSessionParsed.ok ? listLegacySessionKeys({
		store: targetSessionParsed.store,
		agentId: targetAgentId,
		mainKey: targetMainKey,
		scope: targetScope,
		preserveAmbiguousKeys: sessionStoreOwnership.preserveAmbiguousKeys,
		preserveForeignMainAliases
	}) : [];
	const hasStaleSessionFiles = targetSessionParsed.ok && Object.values(targetSessionParsed.store).some((entry) => Boolean(resolveStaleLegacySessionFile({
		entry,
		legacyDir: sessionsLegacyDir,
		targetDir: sessionsTargetDir
	})));
	const legacyAgentDir = path.join(stateDir, "agent");
	const targetAgentDir = path.join(stateDir, "agents", targetAgentId, "agent");
	const hasLegacyAgentDir = existsDir(legacyAgentDir);
	const pluginStateSidecarPath = resolveLegacyPluginStateSidecarPath(stateDir);
	const hasPluginStateSidecar = fileExists$1(pluginStateSidecarPath);
	const hasPendingPluginStateSidecarArchive = hasPendingSqliteSidecarArchive(pluginStateSidecarPath, PLUGIN_STATE_SQLITE_SIDECAR_SUFFIXES);
	const pluginInstallIndexPath = resolveLegacyInstalledPluginIndexStorePath({ stateDir });
	const hasPluginInstallIndex = fileExists$1(pluginInstallIndexPath);
	const debugProxyCaptureSidecar = detectLegacyDebugProxyCaptureSidecar(stateDir, env);
	const stateSchemaMigrations = detectOpenClawStateDatabaseSchemaMigrations({ env: {
		...env,
		OPENCLAW_STATE_DIR: stateDir
	} });
	const stateEnv = {
		...env,
		OPENCLAW_STATE_DIR: stateDir
	};
	const hasLegacyWorktrees = params.doctorOnlyStateMigrations === true && stateSchemaMigrations.length === 0 && fileExists$1(resolveOpenClawStateSqlitePath(stateEnv)) && hasLegacyRegistryWorktrees(stateEnv);
	const taskRunsSidecarPath = resolveLegacyTaskRunsSidecarPath(stateDir);
	const flowRunsSidecarPath = resolveLegacyFlowRunsSidecarPath(stateDir);
	const hasPendingTaskRunsSidecarArchive = hasPendingSqliteSidecarArchive(taskRunsSidecarPath, TASK_STATE_SQLITE_SIDECAR_SUFFIXES);
	const hasPendingFlowRunsSidecarArchive = hasPendingSqliteSidecarArchive(flowRunsSidecarPath, TASK_STATE_SQLITE_SIDECAR_SUFFIXES);
	const hasTaskStateSidecars = fileExists$1(taskRunsSidecarPath) || fileExists$1(flowRunsSidecarPath) || hasPendingTaskRunsSidecarArchive || hasPendingFlowRunsSidecarArchive;
	const deliveryQueuePaths = {
		outboundPath: resolveLegacyDeliveryQueuePath(stateDir, "delivery-queue"),
		sessionPath: resolveLegacyDeliveryQueuePath(stateDir, "session-delivery-queue")
	};
	const hasDeliveryQueues = listLegacyDeliveryQueueFiles(deliveryQueuePaths.outboundPath).length > 0 || listLegacyDeliveryQueueDeliveredMarkers(deliveryQueuePaths.outboundPath).length > 0 || listLegacyDeliveryQueueFiles(deliveryQueuePaths.sessionPath).length > 0 || listLegacyDeliveryQueueDeliveredMarkers(deliveryQueuePaths.sessionPath).length > 0;
	const voiceWake = {
		triggersPath: resolveLegacyVoiceWakeTriggersPath(stateDir),
		routingPath: resolveLegacyVoiceWakeRoutingPath(stateDir)
	};
	const hasVoiceWake = fileExists$1(voiceWake.triggersPath) || fileExists$1(voiceWake.routingPath);
	const updateCheck = { sourcePath: resolveLegacyUpdateCheckPath(stateDir) };
	const hasUpdateCheck = fileExists$1(updateCheck.sourcePath);
	const configHealth = { sourcePath: resolveLegacyConfigHealthPath(stateDir) };
	const hasConfigHealth = fileExists$1(configHealth.sourcePath);
	const pluginBindingApprovals = { sourcePath: resolveLegacyPluginBindingApprovalsPath(env, homedir) };
	const hasPluginBindingApprovals = path.resolve(path.dirname(pluginBindingApprovals.sourcePath)) === path.resolve(stateDir) && fileExists$1(pluginBindingApprovals.sourcePath);
	const currentConversationBindings = { sourcePath: resolveLegacyCurrentConversationBindingsPath(stateDir) };
	const hasCurrentConversationBindings = fileExists$1(currentConversationBindings.sourcePath);
	const detectDoctorOwnedState = (detect) => detect({
		stateDir,
		doctorOnlyStateMigrations: params.doctorOnlyStateMigrations
	});
	const tuiLastSessions = detectDoctorOwnedState(detectLegacyTuiLastSessions);
	const commitments = detectDoctorOwnedState(detectLegacyCommitments);
	const auditLogs = detectDoctorOwnedState(detectLegacyAuditLogs);
	const acpReplayLedger = detectDoctorOwnedState(detectLegacyAcpReplayLedger);
	const managedOutgoingImages = detectDoctorOwnedState(detectLegacyManagedOutgoingImages);
	const apns = detectDoctorOwnedState(detectLegacyApnsRegistrations);
	const deviceAuth = detectDoctorOwnedState(detectLegacyDeviceAuth);
	const deviceIdentity = detectLegacyDeviceIdentity({
		stateDir,
		env,
		doctorOnlyStateMigrations: params.doctorOnlyStateMigrations
	});
	const execApprovals = detectDoctorOwnedState(detectLegacyExecApprovals);
	const mcpOauth = detectDoctorOwnedState(detectLegacyMcpOAuthStores);
	const meetingTranscripts = detectLegacyMeetingTranscripts({
		stateDir,
		env,
		doctorOnlyStateMigrations: params.doctorOnlyStateMigrations
	});
	const restartSentinel = detectLegacyRestartSentinel({ stateDir });
	const workspace = detectLegacyWorkspaceState({
		cfg: params.cfg,
		stateDir,
		env,
		homedir,
		doctorOnlyStateMigrations: params.doctorOnlyStateMigrations
	});
	const webPush = detectDoctorOwnedState(detectLegacyWebPush);
	const nodeHost = detectDoctorOwnedState(detectLegacyNodeHostConfig);
	const subagentRegistry = detectDoctorOwnedState(detectLegacySubagentRegistry);
	const rescuePending = detectDoctorOwnedState(detectLegacyRescuePending);
	const configuredChannels = Object.entries(params.cfg.channels ?? {});
	const configuredAccountIds = Object.fromEntries(configuredChannels.map(([channelId, value]) => {
		const channelConfig = value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
		const accountIds = [
			...getChannelPlugin(channelId)?.config.listAccountIds(params.cfg) ?? [],
			...channelConfig?.accounts && typeof channelConfig.accounts === "object" && !Array.isArray(channelConfig.accounts) ? Object.keys(channelConfig.accounts) : [],
			...typeof channelConfig?.defaultAccount === "string" ? [channelConfig.defaultAccount] : [],
			...(params.cfg.bindings ?? []).flatMap((binding) => {
				const accountId = binding.match?.channel === channelId ? resolveConcreteBindingAccountId(binding.match.accountId) : void 0;
				return accountId ? [accountId] : [];
			})
		];
		return [channelId, Array.from(new Set(accountIds.map((entry) => entry.trim()).filter(Boolean)))];
	}));
	const channelPairing = detectLegacyChannelPairingState({
		sourceDir: oauthDir,
		configuredChannelIds: configuredChannels.map(([channelId]) => channelId),
		configuredDefaultAccountIds: Object.fromEntries(configuredChannels.flatMap(([channelId, value]) => {
			const boundAccountId = params.cfg.bindings?.find((binding) => normalizeAgentId(binding.agentId) === targetAgentId && binding.match?.channel === channelId && resolveConcreteBindingAccountId(binding.match.accountId) !== void 0)?.match.accountId;
			const concreteBoundAccountId = resolveConcreteBindingAccountId(boundAccountId);
			if (concreteBoundAccountId) return [[channelId, concreteBoundAccountId]];
			const defaultAccount = value && typeof value === "object" && !Array.isArray(value) ? value.defaultAccount : void 0;
			if (typeof defaultAccount === "string" && defaultAccount.trim()) return [[channelId, defaultAccount.trim()]];
			const plugin = getChannelPlugin(channelId);
			if (plugin) return [[channelId, resolveChannelDefaultAccountId({
				plugin,
				cfg: params.cfg
			})]];
			return [[channelId, configuredAccountIds[channelId]?.toSorted()[0] ?? "default"]];
		})),
		configuredAccountIds
	});
	const channelPlans = await collectChannelLegacyStateMigrationPlans({
		cfg: params.cfg,
		env,
		stateDir,
		oauthDir
	});
	const pluginPlanWarnings = [];
	const pluginPlans = stateSchemaMigrations.length > 0 ? [] : await collectPluginDoctorStateMigrationPlans({
		cfg: params.cfg,
		pluginDoctorConfig: params.pluginDoctorConfig,
		env,
		stateDir,
		oauthDir,
		includeDoctorOnly: params.doctorOnlyStateMigrations === true,
		warnings: pluginPlanWarnings
	});
	const preview = [];
	if (hasLegacySessions) preview.push(`- Sessions: ${sessionsLegacyDir} → ${sessionsTargetDir}`);
	if (legacyKeys.length > 0) preview.push(`- Sessions: canonicalize legacy keys in ${sessionsTargetStorePath}`);
	if (hasStaleSessionFiles) preview.push(`- Sessions: repair migrated transcript paths in ${sessionsTargetStorePath}`);
	if (hasLegacyAgentDir) preview.push(`- Agent dir: ${legacyAgentDir} → ${targetAgentDir}`);
	if (hasPluginStateSidecar) preview.push(`- Plugin state sidecar: ${pluginStateSidecarPath} → shared SQLite state`);
	else if (hasPendingPluginStateSidecarArchive) preview.push(`- Plugin state sidecar: finish archive cleanup for ${pluginStateSidecarPath}`);
	if (hasPluginInstallIndex) preview.push(`- Plugin install index: ${pluginInstallIndexPath} → shared SQLite state`);
	if (debugProxyCaptureSidecar.hasLegacy) preview.push(`- Debug proxy capture sidecar: ${debugProxyCaptureSidecar.sourcePath} → shared SQLite state`);
	if (stateSchemaMigrations.length > 0) {
		for (const migration of stateSchemaMigrations) preview.push(`- Shared SQLite schema: ${describeStateSchemaMigration(migration)}`);
		preview.push("- Rerun doctor after shared SQLite schema repair to detect plugin state migrations");
	}
	if (hasLegacyWorktrees) preview.push("- Managed worktrees: discard rows without provisioned-file ledgers");
	if (fileExists$1(taskRunsSidecarPath)) preview.push(`- Task registry sidecar: ${taskRunsSidecarPath} → shared SQLite state`);
	else if (hasPendingTaskRunsSidecarArchive) preview.push(`- Task registry sidecar: finish archive cleanup for ${taskRunsSidecarPath}`);
	if (fileExists$1(flowRunsSidecarPath)) preview.push(`- Task flow sidecar: ${flowRunsSidecarPath} → shared SQLite state`);
	else if (hasPendingFlowRunsSidecarArchive) preview.push(`- Task flow sidecar: finish archive cleanup for ${flowRunsSidecarPath}`);
	const stateMigrationPreviews = [
		[hasDeliveryQueues, "- Delivery queues: legacy JSON queue files → shared SQLite state"],
		[hasVoiceWake, "- Voice Wake settings: legacy JSON files → shared SQLite state"],
		[hasUpdateCheck, "- Update-check state: legacy JSON file → shared SQLite state"],
		[hasConfigHealth, "- Config health state: legacy JSON file → shared SQLite state"],
		[hasPluginBindingApprovals, "- Plugin binding approvals: legacy JSON file → shared SQLite state"],
		[hasCurrentConversationBindings, "- Current-conversation bindings: legacy JSON file → shared SQLite state"],
		[tuiLastSessions.hasLegacy, "- TUI last-session pointers: legacy JSON file → shared SQLite state"],
		[commitments.hasLegacy, "- Commitments: legacy JSON file → shared SQLite state"],
		...auditLogs.sources.map((source) => [true, `- ${source.label}: legacy JSONL file → shared SQLite state`]),
		[acpReplayLedger.hasLegacy, "- ACP replay ledger: legacy JSON file → shared SQLite state"],
		[managedOutgoingImages.hasLegacy, "- Managed outgoing images: legacy record JSON → shared SQLite state"],
		[apns.hasLegacy, "- APNs registrations: legacy JSON → shared SQLite state"],
		[deviceAuth.hasLegacy, "- Device auth tokens: legacy JSON → shared SQLite state"],
		[deviceIdentity.hasLegacy, "- Primary device identity: legacy JSON → shared SQLite state"],
		[deviceIdentity.hasInvalidCanonical && !deviceIdentity.hasLegacy, "- Primary device identity: invalid SQLite row → new device identity"],
		[execApprovals.hasLegacy, "- Exec approvals: legacy JSON → shared SQLite state"],
		[mcpOauth.hasLegacy, "- MCP OAuth credentials: legacy JSON → shared SQLite state"],
		[meetingTranscripts.hasLegacy, "- Meeting transcripts: legacy JSON/JSONL files → shared SQLite state"],
		[restartSentinel.hasLegacy, "- Restart sentinel: legacy JSON → shared SQLite state"],
		[workspace.hasLegacy, "- Workspace setup and attestations: legacy files → shared SQLite state"],
		[webPush.hasLegacy, "- Web Push subscriptions and VAPID identity: legacy JSON → shared SQLite state"],
		[nodeHost.hasLegacy, "- Node-host config: legacy node.json → shared SQLite state"],
		[subagentRegistry.hasLegacy, "- Subagent runs: discard retired transient subagents/runs.json state"],
		[rescuePending.hasLegacy, "- System-agent rescue approvals: discard retired pending JSON capabilities"],
		[channelPairing.hasLegacy, "- Channel pairing state: legacy JSON files → shared SQLite state"]
	];
	for (const [hasLegacy, message] of stateMigrationPreviews) if (hasLegacy) preview.push(message);
	if (channelPlans.length > 0) preview.push(...channelPlans.map(buildLegacyMigrationPreview));
	if (pluginPlans.length > 0) preview.push(...pluginPlans.flatMap((plan) => plan.preview));
	return {
		doctorOnlyStateMigrations: params.doctorOnlyStateMigrations === true,
		targetAgentId,
		targetMainKey,
		targetScope,
		stateDir,
		oauthDir,
		sessions: {
			legacyDir: sessionsLegacyDir,
			legacyStorePath: sessionsLegacyStorePath,
			targetDir: sessionsTargetDir,
			targetStorePath: sessionsTargetStorePath,
			hasLegacy: hasLegacySessions || legacyKeys.length > 0 || hasStaleSessionFiles,
			legacyKeys,
			preserveAmbiguousKeys: sessionStoreOwnership.preserveAmbiguousKeys,
			preserveForeignMainAliases,
			targetStoreAliases: sessionStoreOwnership.targetStoreAliases
		},
		agentDir: {
			legacyDir: legacyAgentDir,
			targetDir: targetAgentDir,
			hasLegacy: hasLegacyAgentDir
		},
		channelPlans: {
			hasLegacy: channelPlans.length > 0,
			plans: channelPlans
		},
		pluginPlans: {
			hasLegacy: pluginPlans.length > 0,
			plans: pluginPlans
		},
		pluginStateSidecar: {
			sourcePath: pluginStateSidecarPath,
			hasLegacy: hasPluginStateSidecar || hasPendingPluginStateSidecarArchive
		},
		pluginInstallIndex: {
			sourcePath: pluginInstallIndexPath,
			hasLegacy: hasPluginInstallIndex
		},
		debugProxyCaptureSidecar,
		stateSchema: {
			hasLegacy: stateSchemaMigrations.length > 0,
			preview: stateSchemaMigrations.map((migration) => migration.path)
		},
		worktrees: { hasLegacy: hasLegacyWorktrees },
		taskStateSidecars: {
			taskRunsPath: taskRunsSidecarPath,
			flowRunsPath: flowRunsSidecarPath,
			hasLegacy: hasTaskStateSidecars
		},
		deliveryQueues: {
			...deliveryQueuePaths,
			hasLegacy: hasDeliveryQueues
		},
		voiceWake: {
			...voiceWake,
			hasLegacy: hasVoiceWake
		},
		updateCheck: {
			...updateCheck,
			hasLegacy: hasUpdateCheck
		},
		configHealth: {
			...configHealth,
			hasLegacy: hasConfigHealth
		},
		pluginBindingApprovals: {
			...pluginBindingApprovals,
			hasLegacy: hasPluginBindingApprovals
		},
		currentConversationBindings: {
			...currentConversationBindings,
			hasLegacy: hasCurrentConversationBindings
		},
		tuiLastSessions,
		commitments,
		auditLogs,
		acpReplayLedger,
		managedOutgoingImages,
		apns,
		deviceAuth,
		deviceIdentity,
		execApprovals,
		mcpOauth,
		meetingTranscripts,
		restartSentinel,
		workspace,
		webPush,
		nodeHost,
		subagentRegistry,
		rescuePending,
		channelPairing,
		warnings: pluginPlanWarnings,
		notices: [],
		preview
	};
}
async function runPluginDoctorStateMigrationPlans(params) {
	const warnings = [];
	const refreshedPlans = await collectPluginDoctorStateMigrationPlans({
		cfg: params.config,
		env: params.env,
		stateDir: params.detected.stateDir,
		oauthDir: params.detected.oauthDir,
		includeDoctorOnly: params.detected.doctorOnlyStateMigrations,
		warnings
	});
	const hasDetectorFailure = warnings.length > 0;
	const migrated = await migratePluginDoctorStatePlans({
		plans: refreshedPlans.length > 0 || hasDetectorFailure ? refreshedPlans : params.detected.pluginPlans?.plans ?? [],
		config: params.config,
		env: params.env,
		stateDir: params.detected.stateDir,
		oauthDir: params.detected.oauthDir
	});
	return {
		...migrated,
		warnings: [...warnings, ...migrated.warnings]
	};
}
async function migratePluginDoctorStatePlans(params) {
	const changes = [];
	const warnings = [];
	const notices = [];
	if (params.plans.length === 0) return {
		changes,
		warnings
	};
	let lock;
	try {
		lock = await acquireGatewayLock({
			allowInTests: true,
			env: {
				...params.env,
				OPENCLAW_STATE_DIR: params.stateDir
			},
			pollIntervalMs: PLUGIN_DOCTOR_MIGRATION_LOCK_POLL_INTERVAL_MS,
			role: "sqlite-maintenance",
			timeoutMs: PLUGIN_DOCTOR_MIGRATION_LOCK_TIMEOUT_MS
		});
	} catch (error) {
		return {
			changes,
			warnings: [`Skipped plugin doctor state migrations because exclusive state ownership is unavailable: ${String(error)}`]
		};
	}
	if (!lock) return {
		changes,
		warnings: ["Skipped plugin doctor state migrations because exclusive state ownership is unavailable"]
	};
	try {
		for (const plan of params.plans) try {
			const result = await plan.migration.migrateLegacyState({
				config: params.config,
				env: params.env,
				stateDir: params.stateDir,
				oauthDir: params.oauthDir,
				context: createPluginDoctorStateMigrationContext(plan.pluginId, params.env)
			});
			changes.push(...result.changes);
			warnings.push(...result.warnings);
			notices.push(...result.notices ?? []);
		} catch (err) {
			warnings.push(`Failed migrating ${plan.migration.label}: ${String(err)}`);
		}
	} finally {
		await lock.release();
	}
	return notices.length > 0 ? {
		changes,
		warnings,
		notices
	} : {
		changes,
		warnings
	};
}
async function autoMigrateLegacyPluginDoctorState(params) {
	const env = params.env ?? process.env;
	const stateDirResult = await autoMigrateLegacyStateDir({
		env,
		homedir: params.homedir,
		log: params.log
	});
	const stateDir = resolveStateDir(env, params.homedir ?? os.homedir);
	const oauthDir = resolveOAuthDir(env, stateDir);
	const stateSchema = repairOpenClawStateDatabaseSchemaIfNeeded({ env: {
		...env,
		OPENCLAW_STATE_DIR: stateDir
	} });
	const changes = [...stateDirResult.changes, ...stateSchema.changes];
	const warnings = [...stateDirResult.warnings, ...stateSchema.warnings];
	const notices = [...stateDirResult.notices ?? []];
	if (stateSchema.warnings.length > 0) return {
		migrated: stateDirResult.migrated || stateSchema.changes.length > 0,
		skipped: false,
		changes,
		warnings,
		...notices.length > 0 ? { notices } : {}
	};
	const plans = await collectPluginDoctorStateMigrationPlans({
		cfg: params.config,
		env,
		stateDir,
		oauthDir,
		includeDoctorOnly: params.doctorOnlyStateMigrations === true,
		warnings
	});
	const migrated = await migratePluginDoctorStatePlans({
		plans,
		config: params.config,
		env,
		stateDir,
		oauthDir
	});
	changes.push(...migrated.changes);
	warnings.push(...migrated.warnings);
	notices.push(...migrated.notices ?? []);
	return {
		migrated: stateDirResult.migrated || stateSchema.changes.length > 0 || plans.length > 0,
		skipped: false,
		changes,
		warnings,
		...notices.length > 0 ? { notices } : {}
	};
}
function migrateLegacyStateSchema(detected, env) {
	return repairOpenClawStateDatabaseSchema({ env: {
		...env,
		OPENCLAW_STATE_DIR: detected.stateDir
	} });
}
function buildLegacyStateMigrationSteps(params) {
	const { detected, env } = params;
	const stateDir = detected.stateDir;
	const now = params.now ?? (() => Date.now());
	const isDoctor = params.mode === "doctor";
	const sharedStep = (run, collectNotices = false) => ({
		phase: "shared",
		run,
		collectNotices
	});
	const finalStep = (run, collectNotices = false) => ({
		phase: "final",
		run,
		collectNotices
	});
	const ownerStep = (detection, migrate, phase = "final", collectNotices = true) => ({
		phase,
		collectNotices,
		run: () => migrate({
			detected: detection,
			env,
			stateDir
		})
	});
	const doctorPrelude = isDoctor ? [finalStep(() => {
		const discardedWorktrees = detected.worktrees.hasLegacy ? discardLegacyRegistryWorktrees({
			...env,
			OPENCLAW_STATE_DIR: stateDir
		}) : 0;
		return {
			changes: discardedWorktrees > 0 ? [`Discarded ${discardedWorktrees} legacy managed worktree ${discardedWorktrees === 1 ? "row" : "rows"}; affected worktrees will provision fresh on next use`] : [],
			warnings: []
		};
	})] : [];
	const sharedSteps = [
		sharedStep(() => migrateLegacyPluginStateSidecar({ stateDir })),
		sharedStep(() => migrateLegacyInstalledPluginIndex({ stateDir }), true),
		ownerStep(detected.debugProxyCaptureSidecar, migrateLegacyDebugProxyCaptureSidecar, "shared", false),
		sharedStep(() => migrateLegacyTaskStateSidecars({ stateDir })),
		sharedStep(() => migrateLegacyDeliveryQueues({ stateDir })),
		ownerStep(detected.voiceWake, migrateLegacyVoiceWakeSettings, "shared"),
		ownerStep(detected.updateCheck, migrateLegacyUpdateCheckState, "shared"),
		ownerStep(detected.configHealth, migrateLegacyConfigHealth, "shared", false),
		ownerStep(detected.pluginBindingApprovals, migrateLegacyPluginBindingApprovals, "shared"),
		ownerStep(detected.currentConversationBindings, migrateLegacyCurrentConversationBindings, "shared")
	];
	const doctorStateSteps = isDoctor ? [
		ownerStep(detected.tuiLastSessions, migrateLegacyTuiLastSessions),
		ownerStep(detected.commitments, migrateLegacyCommitments),
		ownerStep(detected.auditLogs, migrateLegacyAuditLogs),
		ownerStep(detected.acpReplayLedger, migrateLegacyAcpReplayLedger),
		ownerStep(detected.managedOutgoingImages, migrateLegacyManagedOutgoingImages),
		ownerStep(detected.apns, migrateLegacyApnsRegistrations),
		ownerStep(detected.deviceAuth, migrateLegacyDeviceAuth),
		finalStep(() => migrateLegacyDeviceIdentity({
			detected: detected.deviceIdentity,
			env,
			stateDir,
			doctorOnlyStateMigrations: params.doctorOnlyStateMigrations
		}), true),
		ownerStep(detected.execApprovals, migrateLegacyExecApprovals),
		ownerStep(detected.mcpOauth, migrateLegacyMcpOAuthStores),
		finalStep(() => migrateLegacyMeetingTranscripts({
			detected: detected.meetingTranscripts,
			env,
			stateDir,
			now
		}), true)
	] : [];
	const doctorFinalSteps = isDoctor ? [
		ownerStep(detected.workspace, migrateLegacyWorkspaceState),
		ownerStep(detected.webPush, migrateLegacyWebPush),
		ownerStep(detected.nodeHost, migrateLegacyNodeHostConfig),
		ownerStep(detected.subagentRegistry, migrateLegacySubagentRegistry),
		ownerStep(detected.rescuePending, discardLegacyRescuePending, "final", false)
	] : [];
	const finalSteps = [
		ownerStep(detected.restartSentinel, migrateLegacyRestartSentinel),
		...doctorFinalSteps,
		finalStep(() => migrateLegacyChannelPairingState({
			detected: detected.channelPairing,
			env: {
				...env,
				OPENCLAW_STATE_DIR: stateDir
			}
		})),
		finalStep(() => runLegacyMigrationPlans(detected.channelPlans.plans.filter((plan) => plan.kind === "plugin-state-import"))),
		finalStep(() => isDoctor && detected.stateSchema.hasLegacy ? {
			changes: [],
			warnings: []
		} : runPluginDoctorStateMigrationPlans({
			detected,
			config: params.config,
			env
		}), true)
	];
	if (!params.skipAgentScopedMigrations) finalSteps.push(finalStep(() => migrateLegacySessions(detected, now, { recoverCorruptTargetStore: params.recoverCorruptTargetStore })), {
		...finalStep(() => migrateLegacyAcpSessionMetadata({
			cfg: params.sessionConfig ?? params.config,
			env: isDoctor ? {
				...env,
				OPENCLAW_STATE_DIR: stateDir
			} : env,
			now,
			...isDoctor ? {} : { pluginSessionStoreAgentIds: params.pluginSessionStoreAgentIds }
		})),
		kind: "acp-session-metadata"
	}, finalStep(() => migrateLegacyAgentDir(detected, now)), finalStep(() => runLegacyMigrationPlans(detected.channelPlans.plans.filter((plan) => plan.kind !== "plugin-state-import"))));
	return [
		...doctorPrelude,
		...sharedSteps,
		...doctorStateSteps,
		...finalSteps
	];
}
async function runLegacyStateMigrationSteps(steps) {
	const sources = [];
	const sharedSources = [];
	const finalSources = [];
	const sharedNoticeSources = [];
	const finalNoticeSources = [];
	for (const step of steps) {
		const result = await step.run();
		sources.push(result);
		(step.phase === "shared" ? sharedSources : finalSources).push(result);
		if (step.collectNotices) (step.phase === "shared" ? sharedNoticeSources : finalNoticeSources).push(result);
	}
	return {
		sources,
		sharedSources,
		finalSources,
		sharedNoticeSources,
		finalNoticeSources
	};
}
async function runLegacyStateMigrations(params) {
	const detected = params.detected;
	const env = params.env ?? process.env;
	const stateSchema = migrateLegacyStateSchema(detected, env);
	if (detected.stateSchema.hasLegacy && stateSchema.warnings.length > 0) return stateSchema;
	const migrations = await runLegacyStateMigrationSteps(buildLegacyStateMigrationSteps({
		mode: "doctor",
		detected,
		config: params.config ?? {},
		env,
		now: params.now,
		recoverCorruptTargetStore: params.recoverCorruptTargetStore,
		doctorOnlyStateMigrations: params.doctorOnlyStateMigrations
	}));
	const notices = mergeNotices([...migrations.sharedNoticeSources, ...migrations.finalNoticeSources]);
	return {
		changes: [...stateSchema.changes, ...migrations.sources.flatMap((source) => source.changes)],
		warnings: [
			...stateSchema.warnings,
			...detected.warnings,
			...migrations.sources.flatMap((source) => source.warnings)
		],
		...notices.length > 0 ? { notices } : {}
	};
}
/**
* Canonicalize orphaned raw session keys in all known agent session stores.
*
* Keys written by resolveSessionKey() used DEFAULT_AGENT_ID="main" regardless
* of the configured default agent; reads always use resolveSessionStoreKey()
* which canonicalizes via canonicalizeMainSessionAlias. This migration renames
* any orphaned raw keys to their canonical form in-place, merging with any
* existing canonical entry by preferring the most recently updated.
*
* Safe to run multiple times (idempotent). See #29683.
*/
async function autoMigrateLegacyState(params) {
	const env = params.env ?? process.env;
	const homedir = params.homedir ?? os.homedir;
	const migrationMode = params.doctorOnlyStateMigrations === true ? "doctor-repair" : "automatic";
	const initialStateDir = resolveStateDir(env, homedir);
	const checkKey = `${path.resolve(initialStateDir)}\0${migrationMode}`;
	if (autoMigrateChecked.has(checkKey)) return {
		migrated: false,
		skipped: true,
		changes: [],
		warnings: []
	};
	autoMigrateChecked.add(checkKey);
	const stateDirResult = await autoMigrateLegacyStateDir({
		env,
		homedir,
		log: params.log
	});
	const stateDir = resolveStateDir(env, homedir);
	autoMigrateChecked.add(`${path.resolve(stateDir)}\0${migrationMode}`);
	const stateSchemaOptions = { env: {
		...env,
		OPENCLAW_STATE_DIR: stateDir
	} };
	const stateSchema = params.doctorOnlyStateMigrations === true ? repairOpenClawStateDatabaseSchema(stateSchemaOptions) : repairOpenClawStateDatabaseSchemaIfNeeded(stateSchemaOptions);
	if (stateSchema.warnings.length > 0) return {
		migrated: stateDirResult.migrated || stateSchema.changes.length > 0,
		skipped: false,
		changes: [...stateDirResult.changes, ...stateSchema.changes],
		warnings: [...stateDirResult.warnings, ...stateSchema.warnings],
		...stateDirResult.notices?.length ? { notices: stateDirResult.notices } : {}
	};
	const mediaPersistence = params.doctorOnlyStateMigrations === true ? migrateLegacyMediaPersistence({ env: {
		...env,
		OPENCLAW_STATE_DIR: stateDir
	} }) : {
		changes: [],
		warnings: []
	};
	if (mediaPersistence.warnings.length > 0) return {
		migrated: stateDirResult.migrated || stateSchema.changes.length > 0 || mediaPersistence.changes.length > 0,
		skipped: false,
		changes: [
			...stateDirResult.changes,
			...stateSchema.changes,
			...mediaPersistence.changes
		],
		warnings: [
			...stateDirResult.warnings,
			...stateSchema.warnings,
			...mediaPersistence.warnings
		],
		...stateDirResult.notices?.length ? { notices: stateDirResult.notices } : {}
	};
	const pluginDoctorConfig = params.pluginDoctorConfig ?? params.cfg;
	const configMachineState = migrateLegacyConfigMachineState({
		config: pluginDoctorConfig,
		env: {
			...env,
			OPENCLAW_STATE_DIR: stateDir
		}
	});
	const pluginSessionStoreAgentIds = listPluginDoctorSessionStoreAgentIds({
		config: pluginDoctorConfig,
		env,
		pluginIds: collectRelevantDoctorPluginIds(pluginDoctorConfig)
	});
	const sessionStoreOwnership = resolveSessionStoreOwnership({
		cfg: params.cfg,
		env,
		stateDir,
		targetAgentId: normalizeAgentId(resolveDefaultAgentId(params.cfg)),
		pluginSessionStoreAgentIds
	});
	const orphanKeys = await migrateOrphanedSessionKeys({
		cfg: params.cfg,
		env,
		additionalAgentIds: pluginSessionStoreAgentIds
	});
	const logMigrationResults = (changes, warnings, notices) => {
		const logger = params.log ?? createSubsystemLogger("state-migrations");
		if (changes.length > 0) logger.info(`Auto-migrated legacy state:\n${changes.map((entry) => `- ${entry}`).join("\n")}`);
		if (warnings.length > 0) logger.warn(`Legacy state migration warnings:\n${warnings.map((entry) => `- ${entry}`).join("\n")}`);
		if (notices.length > 0) logger.info(`Legacy state migration notes:\n${notices.map((entry) => `- ${entry}`).join("\n")}`);
	};
	const detected = await detectLegacyStateMigrations({
		cfg: params.cfg,
		pluginDoctorConfig: params.pluginDoctorConfig,
		pluginSessionStoreAgentIds,
		sessionStoreOwnership,
		env,
		homedir: params.homedir,
		doctorOnlyStateMigrations: params.doctorOnlyStateMigrations
	});
	const deviceAuth = await migrateLegacyDeviceAuth({
		detected: detected.deviceAuth,
		env,
		stateDir: detected.stateDir
	});
	const deviceIdentity = await migrateLegacyDeviceIdentity({
		detected: detected.deviceIdentity,
		env,
		stateDir: detected.stateDir,
		doctorOnlyStateMigrations: params.doctorOnlyStateMigrations
	});
	const meetingTranscripts = await migrateLegacyMeetingTranscripts({
		detected: detected.meetingTranscripts,
		env,
		stateDir: detected.stateDir,
		now: params.now
	});
	const hasCustomAgentDir = env.OPENCLAW_AGENT_DIR?.trim() || env.PI_CODING_AGENT_DIR?.trim();
	const migrationSteps = buildLegacyStateMigrationSteps({
		mode: "automatic",
		detected,
		config: pluginDoctorConfig,
		sessionConfig: params.cfg,
		env,
		now: params.now,
		pluginSessionStoreAgentIds,
		recoverCorruptTargetStore: params.recoverCorruptTargetStore,
		skipAgentScopedMigrations: Boolean(hasCustomAgentDir)
	});
	const initialMigrationSources = [
		stateDirResult,
		stateSchema,
		mediaPersistence,
		configMachineState,
		orphanKeys
	];
	const initialMigrationWarnings = [
		...initialMigrationSources.slice(0, -1).flatMap((source) => source.warnings),
		...detected.warnings,
		...orphanKeys.warnings
	];
	if (!hasCustomAgentDir && !detected.sessions.hasLegacy && !detected.agentDir.hasLegacy && !detected.channelPlans.hasLegacy && !detected.pluginPlans?.hasLegacy && !detected.pluginStateSidecar.hasLegacy && !detected.pluginInstallIndex.hasLegacy && !detected.debugProxyCaptureSidecar.hasLegacy && !detected.stateSchema.hasLegacy && !detected.taskStateSidecars.hasLegacy && !detected.deliveryQueues.hasLegacy && !detected.voiceWake.hasLegacy && !detected.updateCheck.hasLegacy && !detected.configHealth.hasLegacy && !detected.pluginBindingApprovals.hasLegacy && !detected.currentConversationBindings.hasLegacy && !detected.deviceAuth.hasLegacy && !detected.restartSentinel?.hasLegacy && !detected.workspace.hasLegacy && !detected.channelPairing.hasLegacy) {
		const acpSessionMetadataStep = migrationSteps.find((step) => step.kind === "acp-session-metadata");
		const acpSessionMetadata = acpSessionMetadataStep ? await acpSessionMetadataStep.run() : {
			changes: [],
			warnings: []
		};
		const changes = [
			...initialMigrationSources,
			acpSessionMetadata,
			deviceAuth,
			deviceIdentity,
			meetingTranscripts
		].flatMap((source) => source.changes);
		const warnings = [...initialMigrationWarnings, ...[
			acpSessionMetadata,
			deviceAuth,
			deviceIdentity,
			meetingTranscripts
		].flatMap((source) => source.warnings)];
		const notices = mergeNotices([
			stateDirResult,
			detected,
			deviceAuth,
			deviceIdentity
		]);
		logMigrationResults(changes, warnings, notices);
		return {
			migrated: stateDirResult.migrated || changes.length > 0,
			skipped: false,
			changes,
			warnings,
			...notices.length > 0 ? { notices } : {}
		};
	}
	const migrations = await runLegacyStateMigrationSteps(migrationSteps);
	const changes = [
		...initialMigrationSources,
		...migrations.sharedSources,
		deviceAuth,
		deviceIdentity,
		...hasCustomAgentDir ? [] : [meetingTranscripts],
		...migrations.finalSources
	].flatMap((source) => source.changes);
	const warnings = [
		...initialMigrationWarnings,
		...migrations.sharedSources.flatMap((source) => source.warnings),
		...deviceAuth.warnings,
		...deviceIdentity.warnings,
		...hasCustomAgentDir ? [] : meetingTranscripts.warnings,
		...migrations.finalSources.flatMap((source) => source.warnings)
	];
	const notices = mergeNotices([
		stateDirResult,
		detected,
		...migrations.sharedNoticeSources,
		deviceAuth,
		deviceIdentity,
		meetingTranscripts,
		...migrations.finalNoticeSources
	]);
	logMigrationResults(changes, warnings, notices);
	return {
		migrated: stateDirResult.migrated || changes.length > 0 || meetingTranscripts.changes.length > 0,
		skipped: Boolean(hasCustomAgentDir),
		changes,
		warnings,
		...notices.length > 0 ? { notices } : {}
	};
}
//#endregion
export { runLegacyStateMigrations as a, resetAutoMigrateLegacyStateDirForTest as c, migrateLegacyAgentDir as d, migrateOrphanedSessionKeys as f, resetAutoMigrateLegacyStateForTest as i, resetAutoMigrateLegacyTaskStateSidecarsForTest as l, autoMigrateLegacyState as n, autoMigrateLegacyStateDir as o, detectLegacyStateMigrations as r, autoMigrateLegacyTaskStateSidecars as s, autoMigrateLegacyPluginDoctorState as t, migrateLegacyMediaPersistence as u };
