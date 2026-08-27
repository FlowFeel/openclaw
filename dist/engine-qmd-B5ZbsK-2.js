import { c as redactSensitiveText } from "./redact-DUpJZuMu.js";
import { o as statRegularFile, r as readRegularFile } from "./regular-file-jv7y-frB.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { r as isCronRunSessionKey } from "./session-key-utils-02xWdGSz.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { l as resolveSafeTimeoutDelayMs } from "./timeouts-Dbj-IGQf.js";
import { f as stripInternalRuntimeContext } from "./internal-runtime-context-s8_TwHnQ.js";
import { r as stripInboundMetadata } from "./strip-inbound-meta-BOGiSpdi.js";
import { i as isSilentReplyPayloadText } from "./tokens-CMI0yx54.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { t as formatErrorMessage } from "./error-utils-F_0lOXMP.js";
import { n as canonicalizeMainSessionAlias } from "./main-session-Bjm_i_Af.js";
import { E as materializeSessionArchiveForRead, S as parseUsageCountedSessionIdFromFileName, _ as isSessionArchiveArtifactName, b as isUsageCountedSessionTranscriptFileName, c as resolveSessionTranscriptsDirForAgent, p as isCompactionCheckpointTranscriptFileName } from "./paths-DSnYpBD3.js";
import { n as parseSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.js";
import { ct as listSessionTranscriptInstances } from "./session-accessor-t3qUoTeV.js";
import { a as resolveWindowsSpawnProgram, r as materializeWindowsSpawnProgram } from "./windows-spawn-C5RDaB22.js";
import { a as hasInterSessionUserProvenance } from "./input-provenance-CYGbY89H.js";
import { r as HEARTBEAT_PROMPT } from "./heartbeat-Cw1AzhxC.js";
import { s as readTranscriptContentRevisionSync } from "./config-utils-bVWMjALM.js";
import { r as isHeartbeatUserMessage } from "./heartbeat-filter-DUXErom1.js";
import { h as resolveTranscriptSessionKeyBySessionId, i as listSessionEntries, m as resolveStorePath, o as loadTranscriptEventsSync, u as readTranscriptStatsSync } from "./session-store-runtime-dul9f0ER.js";
import { i as isExecCompletionEvent } from "./heartbeat-events-filter-sLs_6Z5x.js";
import "./fs-utils-DF79bccZ.js";
import { r as retryTransientMemoryRead, t as hashText } from "./hash-CLsGYYJA.js";
import "./query-expansion-DzoKGtnD.js";
import { i as isDreamingNarrativeSessionStoreKey, n as extractAgentIdFromSessionPath, r as extractAgentIdFromSessionsDir } from "./openclaw-runtime-session-C57QMNYU.js";
import fs, { statSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
//#region packages/memory-host-sdk/src/host/session-transcript-corpus.ts
function fileContentRevision(filePath) {
	try {
		const stat = fs.statSync(filePath, { bigint: true });
		if (!stat.isFile()) return;
		return `file:${stat.dev}:${stat.ino}:${stat.size}:${stat.mtimeNs}:${stat.ctimeNs}`;
	} catch {
		return;
	}
}
function sqliteContentRevision(params) {
	try {
		return readTranscriptContentRevisionSync(params);
	} catch {
		return;
	}
}
function isDreamingNarrativeSessionKeyLike(value) {
	return typeof value === "string" && isDreamingNarrativeSessionStoreKey(value);
}
function normalizeComparablePath$1(pathname) {
	const resolved = path.resolve(pathname);
	return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}
function normalizeRealComparablePath(pathname) {
	try {
		return normalizeComparablePath$1(fs.realpathSync(pathname));
	} catch {
		try {
			return normalizeComparablePath$1(path.join(fs.realpathSync(path.dirname(pathname)), path.basename(pathname)));
		} catch {
			return normalizeComparablePath$1(pathname);
		}
	}
}
function rememberArtifactDir(dirs, dir) {
	dirs.set(normalizeRealComparablePath(dir), dir);
}
function classifySessionEntry(sessionKey, entry, cronGeneratedSessionKeys) {
	const generatedByDreamingNarrative = isDreamingNarrativeSessionStoreKey(sessionKey) || isDreamingNarrativeSessionKeyLike(entry.spawnedBy);
	const generatedByCronRun = cronGeneratedSessionKeys.has(sessionKey);
	return {
		generatedByDreamingNarrative,
		generatedByCronRun,
		sessionKind: generatedByCronRun ? "cron" : typeof entry.heartbeatIsolatedBaseSessionKey === "string" && entry.heartbeatIsolatedBaseSessionKey.trim() ? "heartbeat" : generatedByDreamingNarrative || Boolean(entry.spawnedBy) ? "subagent" : sessionKey.includes(":subagent:") ? "subagent" : "interactive"
	};
}
function readParentSessionKeys(entry) {
	const keys = /* @__PURE__ */ new Set();
	for (const value of [entry?.parentSessionKey, entry?.spawnedBy]) {
		if (typeof value !== "string") continue;
		const trimmed = value.trim();
		if (trimmed) keys.add(trimmed);
	}
	return [...keys];
}
function collectCronGeneratedSessionKeys(summaries) {
	const entriesByKey = new Map(summaries.map((summary) => [summary.sessionKey, summary.entry]));
	const cronGeneratedKeys = /* @__PURE__ */ new Set();
	const cache = /* @__PURE__ */ new Map();
	const resolving = /* @__PURE__ */ new Set();
	const isCronGenerated = (sessionKey, entry) => {
		if (isCronRunSessionKey(sessionKey)) {
			cache.set(sessionKey, true);
			cronGeneratedKeys.add(sessionKey);
			return true;
		}
		const cached = cache.get(sessionKey);
		if (cached !== void 0) return cached;
		if (resolving.has(sessionKey)) return false;
		resolving.add(sessionKey);
		const generated = readParentSessionKeys(entry).some((parentKey) => isCronRunSessionKey(parentKey) || isCronGenerated(parentKey, entriesByKey.get(parentKey)));
		resolving.delete(sessionKey);
		cache.set(sessionKey, generated);
		if (generated) cronGeneratedKeys.add(sessionKey);
		return generated;
	};
	for (const summary of summaries) isCronGenerated(summary.sessionKey, summary.entry);
	return cronGeneratedKeys;
}
function toSessionStoreCorpusEntry(agentId, storePath, summary, cronGeneratedSessionKeys) {
	const sessionId = summary.entry.sessionId?.trim();
	if (!sessionId) return null;
	const sessionKey = summary.sessionKey.trim();
	const classification = classifySessionEntry(summary.sessionKey, summary.entry, cronGeneratedSessionKeys);
	const contentRevision = sqliteContentRevision({
		agentId,
		sessionId,
		...sessionKey ? { sessionKey } : {},
		storePath
	});
	return {
		agentId,
		artifactKind: "active-session",
		sessionFile: sessionKey,
		sessionId,
		...contentRevision ? { contentRevision } : {},
		transcriptSource: "sqlite",
		storePath,
		...Number.isFinite(summary.entry.updatedAt) ? { updatedAtMs: summary.entry.updatedAt } : {},
		...sessionKey ? { sessionKey } : {},
		...classification.generatedByDreamingNarrative ? { generatedByDreamingNarrative: true } : {},
		...classification.generatedByCronRun ? { generatedByCronRun: true } : {},
		sessionKind: classification.sessionKind
	};
}
function toRetainedSessionCorpusEntry(agentId, instance, sessionKey, storePath, cronGeneratedSessionKeys) {
	if (!instance.provenanceKnown || instance.acpOwned || instance.entry.pluginOwnerId || instance.entry.hookExternalContentSource) return null;
	const classification = classifySessionEntry(sessionKey, instance.entry, cronGeneratedSessionKeys);
	const contentRevision = sqliteContentRevision({
		agentId,
		sessionId: instance.sessionId,
		...sessionKey ? { sessionKey } : {},
		storePath
	});
	return {
		agentId,
		artifactKind: "retained-session",
		sessionFile: sessionKey,
		sessionId: instance.sessionId,
		...contentRevision ? { contentRevision } : {},
		storePath,
		transcriptSource: "sqlite",
		updatedAtMs: instance.updatedAtMs,
		...sessionKey ? { sessionKey } : {},
		...classification.generatedByDreamingNarrative ? { generatedByDreamingNarrative: true } : {},
		...classification.generatedByCronRun ? { generatedByCronRun: true } : {},
		sessionKind: classification.sessionKind
	};
}
function listSessionTranscriptArtifactFiles(sessionsDir) {
	try {
		return fs.readdirSync(sessionsDir, { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => entry.name).filter((name) => isUsageCountedSessionTranscriptFileName(name)).filter((name) => isSessionArchiveArtifactName(name)).map((name) => path.join(sessionsDir, name));
	} catch {
		return [];
	}
}
function toArtifactCorpusEntry(agentId, artifactPath, sessionId, primaryEntry) {
	const contentRevision = fileContentRevision(artifactPath);
	return {
		agentId,
		artifactKind: "archive-artifact",
		sessionFile: artifactPath,
		sessionId,
		...contentRevision ? { contentRevision } : {},
		...primaryEntry?.generatedByDreamingNarrative ? { generatedByDreamingNarrative: true } : {},
		...primaryEntry?.generatedByCronRun ? { generatedByCronRun: true } : {},
		sessionKind: primaryEntry?.sessionKind ?? "unknown"
	};
}
function listSessionTranscriptCorpusEntriesForAgentSync(agentId, options = {}) {
	const normalizedAgentId = normalizeAgentId(agentId);
	const cfg = getRuntimeConfig();
	const configuredStore = cfg.session?.store;
	const storePath = resolveStorePath(configuredStore, { agentId: normalizedAgentId });
	const sessionsDir = path.dirname(storePath);
	const fixedStoreOwnerAgentId = extractAgentIdFromSessionsDir(sessionsDir);
	const isAgentOwnedFixedStore = fixedStoreOwnerAgentId !== null && normalizeAgentId(fixedStoreOwnerAgentId) === normalizedAgentId;
	const isSharedFixedStore = typeof configuredStore === "string" && configuredStore.trim().length > 0 && !configuredStore.includes("{agentId}") && !isAgentOwnedFixedStore;
	const activeEntriesBySessionId = /* @__PURE__ */ new Map();
	const entryOwnersBySessionId = /* @__PURE__ */ new Map();
	const artifactDirsByPath = /* @__PURE__ */ new Map();
	rememberArtifactDir(artifactDirsByPath, sessionsDir);
	rememberArtifactDir(artifactDirsByPath, resolveSessionTranscriptsDirForAgent(normalizedAgentId));
	const sessionEntries = listSessionEntries({
		agentId: normalizedAgentId,
		hydrateSkillPromptRefs: false,
		storePath
	});
	const retainedInstances = options.includeRetainedSqlite ? listSessionTranscriptInstances({
		agentId: normalizedAgentId,
		hydrateSkillPromptRefs: false,
		readConsistency: "latest",
		storePath
	}) : [];
	const cronGeneratedSessionKeys = collectCronGeneratedSessionKeys([...retainedInstances.map(({ entry, sessionKey }) => ({
		entry,
		sessionKey
	})), ...sessionEntries]);
	for (const summary of sessionEntries) {
		const ownerAgentId = resolveSessionAgentId({
			config: cfg,
			sessionKey: isSharedFixedStore ? summary.sessionKey : canonicalizeMainSessionAlias({
				cfg,
				agentId: normalizedAgentId,
				sessionKey: summary.sessionKey
			}),
			...isSharedFixedStore ? {} : { fallbackAgentId: normalizedAgentId }
		});
		const entry = toSessionStoreCorpusEntry(ownerAgentId, storePath, summary, cronGeneratedSessionKeys);
		if (!entry) continue;
		entryOwnersBySessionId.set(entry.sessionId, ownerAgentId);
		if (ownerAgentId === normalizedAgentId) activeEntriesBySessionId.set(entry.sessionId, entry);
	}
	const includeUnownedArtifacts = !isSharedFixedStore;
	const corpusEntries = [...activeEntriesBySessionId.values()];
	if (options.includeRetainedSqlite) for (const instance of retainedInstances) {
		if (activeEntriesBySessionId.has(instance.sessionId)) continue;
		const sessionKey = isSharedFixedStore ? instance.sessionKey : canonicalizeMainSessionAlias({
			cfg,
			agentId: normalizedAgentId,
			sessionKey: instance.sessionKey
		});
		const ownerAgentId = resolveSessionAgentId({
			config: cfg,
			sessionKey,
			...isSharedFixedStore ? {} : { fallbackAgentId: normalizedAgentId }
		});
		if (ownerAgentId !== normalizedAgentId) continue;
		const entry = toRetainedSessionCorpusEntry(ownerAgentId, instance, sessionKey, storePath, cronGeneratedSessionKeys);
		if (entry?.transcriptSource === "sqlite") corpusEntries.push(entry);
	}
	const scannedArtifactPaths = /* @__PURE__ */ new Set();
	for (const artifactDir of artifactDirsByPath.values()) for (const artifactPath of listSessionTranscriptArtifactFiles(artifactDir)) {
		const normalizedArtifactPath = normalizeRealComparablePath(artifactPath);
		if (scannedArtifactPaths.has(normalizedArtifactPath)) continue;
		scannedArtifactPaths.add(normalizedArtifactPath);
		const primarySessionId = parseUsageCountedSessionIdFromFileName(path.basename(artifactPath));
		if (!primarySessionId) continue;
		const primaryEntry = activeEntriesBySessionId.get(primarySessionId);
		const primaryOwner = entryOwnersBySessionId.get(primarySessionId);
		if (primaryOwner && primaryOwner !== normalizedAgentId) continue;
		if (!primaryOwner && !includeUnownedArtifacts) continue;
		corpusEntries.push(toArtifactCorpusEntry(normalizedAgentId, artifactPath, primarySessionId, primaryEntry));
	}
	return corpusEntries;
}
/**
* Lists transcript corpus entries for QMD/memory indexing.
*
* Active sessions come from the session accessor seam; retained reset/delete
* transcript artifacts remain explicit file artifacts until core owns archive
* artifact enumeration.
*/
async function listSessionTranscriptCorpusEntriesForAgent(agentId, options = {}) {
	return listSessionTranscriptCorpusEntriesForAgentSync(agentId, options);
}
//#endregion
//#region packages/memory-host-sdk/src/host/session-files.ts
const SESSION_EXPORT_CONTENT_WRAP_CHARS = 800;
const SESSION_ENTRY_PARSE_YIELD_LINES = 250;
const MAX_DATE_TIMESTAMP_MS = 864e13;
const DIRECT_CRON_PROMPT_RE = /^\[cron:[^\]]+\]\s*/;
function shouldSkipTranscriptFileForDreaming(absPath) {
	const fileName = path.basename(absPath);
	if (isCompactionCheckpointTranscriptFileName(fileName)) return true;
	if (isSessionArchiveArtifactName(fileName) && !isUsageCountedSessionTranscriptFileName(fileName)) return true;
	return false;
}
function isUsageCountedSessionArchiveTranscriptPath(absPath) {
	const fileName = path.basename(absPath);
	return isUsageCountedSessionTranscriptFileName(fileName) && isSessionArchiveArtifactName(fileName) && parseUsageCountedSessionIdFromFileName(fileName) !== null;
}
function isDreamingNarrativeBootstrapRecord(record) {
	if (!record || typeof record !== "object" || Array.isArray(record)) return false;
	const candidate = record;
	if (candidate.type !== "custom" || candidate.customType !== "openclaw:bootstrap-context:full" || !candidate.data || typeof candidate.data !== "object" || Array.isArray(candidate.data)) return false;
	const runId = candidate.data.runId;
	return typeof runId === "string" && runId.startsWith("dreaming-narrative-");
}
function hasDreamingNarrativeRunId(value) {
	return typeof value === "string" && value.startsWith("dreaming-narrative-");
}
function isDreamingNarrativeGeneratedRecord(record) {
	if (isDreamingNarrativeBootstrapRecord(record)) return true;
	if (!record || typeof record !== "object" || Array.isArray(record)) return false;
	const candidate = record;
	if (hasDreamingNarrativeRunId(candidate.runId) || hasDreamingNarrativeRunId(candidate.sessionKey)) return true;
	if (!candidate.data || typeof candidate.data !== "object" || Array.isArray(candidate.data)) return false;
	const nested = candidate.data;
	return hasDreamingNarrativeRunId(nested.runId) || hasDreamingNarrativeRunId(nested.sessionKey);
}
function hasCronRunSessionKey(value) {
	return typeof value === "string" && isCronRunSessionKey(value);
}
function isCronRunGeneratedRecord(record) {
	if (!record || typeof record !== "object" || Array.isArray(record)) return false;
	const candidate = record;
	if (hasCronRunSessionKey(candidate.sessionKey)) return true;
	if (!candidate.data || typeof candidate.data !== "object" || Array.isArray(candidate.data)) return false;
	const nested = candidate.data;
	return hasCronRunSessionKey(nested.sessionKey);
}
function normalizeComparablePath(pathname) {
	const resolved = path.resolve(pathname);
	return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}
function resolveSessionStoreTranscriptPath(sessionsDir, entry) {
	const resolved = resolveSessionStoreTranscriptResolvedPath(sessionsDir, entry);
	return resolved ? normalizeComparablePath(resolved) : null;
}
function resolveSessionStoreTranscriptResolvedPath(sessionsDir, entry) {
	if (typeof entry?.sessionFile === "string" && entry.sessionFile.trim().length > 0) {
		const sessionFile = entry.sessionFile.trim();
		return path.isAbsolute(sessionFile) ? sessionFile : path.resolve(sessionsDir, sessionFile);
	}
	if (typeof entry?.sessionId === "string" && entry.sessionId.trim().length > 0) return path.join(sessionsDir, `${entry.sessionId.trim()}.jsonl`);
	return null;
}
function isCanonicalSessionsDirForAgent(sessionsDir, agentId) {
	return normalizeComparablePath(sessionsDir) === normalizeComparablePath(resolveSessionTranscriptsDirForAgent(agentId));
}
function loadSessionTranscriptClassificationForSessionsDir(sessionsDir) {
	const agentId = extractAgentIdFromSessionsDir(sessionsDir);
	if (agentId && isCanonicalSessionsDirForAgent(sessionsDir, agentId)) return classifySessionTranscriptCorpusEntries(listSessionTranscriptCorpusEntriesForAgentSync(agentId));
	const store = readSessionTranscriptClassificationStore(path.join(sessionsDir, "sessions.json"));
	const dreamingTranscriptPaths = /* @__PURE__ */ new Set();
	const cronRunTranscriptPaths = /* @__PURE__ */ new Set();
	for (const [sessionKey, entry] of Object.entries(store)) {
		const transcriptPath = resolveSessionStoreTranscriptPath(sessionsDir, entry);
		if (!transcriptPath) continue;
		if (isDreamingNarrativeSessionStoreKey(sessionKey)) dreamingTranscriptPaths.add(transcriptPath);
		if (isCronRunSessionKey(sessionKey)) cronRunTranscriptPaths.add(transcriptPath);
	}
	return {
		dreamingNarrativeTranscriptPaths: dreamingTranscriptPaths,
		cronRunTranscriptPaths
	};
}
function readSessionTranscriptClassificationStore(storePath) {
	try {
		const parsed = JSON.parse(fs.readFileSync(storePath, "utf-8"));
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
		return parsed;
	} catch {
		return {};
	}
}
function classifySessionTranscriptCorpusEntries(corpusEntries) {
	const dreamingTranscriptPaths = /* @__PURE__ */ new Set();
	const cronRunTranscriptPaths = /* @__PURE__ */ new Set();
	for (const entry of corpusEntries) {
		if (entry.transcriptSource === "sqlite") continue;
		const normalizedPath = normalizeComparablePath(entry.sessionFile);
		if (entry.generatedByDreamingNarrative) dreamingTranscriptPaths.add(normalizedPath);
		if (entry.generatedByCronRun) cronRunTranscriptPaths.add(normalizedPath);
	}
	return {
		dreamingNarrativeTranscriptPaths: dreamingTranscriptPaths,
		cronRunTranscriptPaths
	};
}
function classifySessionTranscriptFromSessionStore(absPath) {
	const sessionsDir = path.dirname(absPath);
	const normalizedAbsPath = normalizeComparablePath(absPath);
	const primarySessionId = parseUsageCountedSessionIdFromFileName(path.basename(absPath));
	const normalizedPrimaryPath = primarySessionId && isSessionArchiveArtifactName(path.basename(absPath)) ? normalizeComparablePath(path.join(sessionsDir, `${primarySessionId}.jsonl`)) : null;
	const classification = loadSessionTranscriptClassificationForSessionsDir(sessionsDir);
	const hasClassifiedPath = (paths) => paths.has(normalizedAbsPath) || normalizedPrimaryPath !== null && paths.has(normalizedPrimaryPath);
	return {
		generatedByDreamingNarrative: hasClassifiedPath(classification.dreamingNarrativeTranscriptPaths),
		generatedByCronRun: hasClassifiedPath(classification.cronRunTranscriptPaths)
	};
}
function sessionPathForFile(absPath) {
	const agentId = extractAgentIdFromSessionPath(absPath);
	return path.join("sessions", ...agentId ? [agentId] : [], path.basename(absPath)).replace(/\\/g, "/");
}
/** Returns the logical memory path for a live SQLite-backed session transcript. */
function sessionPathForSessionIdentity(agentId, sessionId) {
	return path.join("sessions", normalizeAgentId(agentId), `${sessionId}.jsonl`).replace(/\\/g, "/");
}
/**
* Parses a deprecated path-shaped memory sync hint only when it points at an
* OpenClaw-owned usage-counted transcript in the canonical agent sessions dir.
*/
function parseCanonicalSessionSyncTargetFromPath(sessionFile) {
	const trimmed = sessionFile.trim();
	if (!trimmed) return null;
	const resolved = path.resolve(trimmed);
	const fileName = path.basename(resolved);
	const sessionId = parseUsageCountedSessionIdFromFileName(fileName);
	if (!sessionId || !isUsageCountedSessionTranscriptFileName(fileName)) return null;
	const agentId = extractAgentIdFromSessionPath(resolved);
	if (!agentId) return null;
	const canonicalSessionsDir = normalizeComparablePath(resolveSessionTranscriptsDirForAgent(agentId));
	if (normalizeComparablePath(path.dirname(resolved)) !== canonicalSessionsDir) return null;
	return {
		agentId,
		sessionId
	};
}
/**
* Resolves a current transcript path back to the canonical session-store
* identity when available, falling back to the usage-counted file identity.
*/
function resolveSessionIdentityForTranscriptFile(sessionFile) {
	const parsed = parseCanonicalSessionSyncTargetFromPath(sessionFile);
	if (!parsed?.agentId) return null;
	const sessionsDir = resolveSessionTranscriptsDirForAgent(parsed.agentId);
	const normalizedSessionFile = normalizeComparablePath(sessionFile);
	const store = readSessionTranscriptClassificationStore(path.join(sessionsDir, "sessions.json"));
	for (const [sessionKey, entry] of Object.entries(store)) {
		if (resolveSessionStoreTranscriptPath(sessionsDir, entry) !== normalizedSessionFile) continue;
		const sessionId = typeof entry.sessionId === "string" ? entry.sessionId.trim() : "";
		if (!sessionId) continue;
		return {
			agentId: parsed.agentId,
			sessionId,
			...sessionKey.trim() ? { sessionKey } : {}
		};
	}
	return {
		agentId: parsed.agentId,
		sessionId: parsed.sessionId
	};
}
/** Resolves only deprecated path-shaped sync targets; live identity uses corpus entries. */
function resolveSessionFileForSyncTarget(target, defaultAgentId) {
	const sessionId = target.sessionId.trim();
	if (!(target.agentId ?? defaultAgentId ?? "").trim() || !sessionId) return null;
	return null;
}
async function logSessionFileReadFailure(absPath, err) {
	createSubsystemLogger("memory").debug(`Failed reading session file ${absPath}: ${String(err)}`);
}
function normalizeSessionText(value) {
	return value.replace(/\s*\n+\s*/g, " ").replace(/\s+/g, " ").trim();
}
function collectRawSessionText(content) {
	if (typeof content === "string") return content;
	if (!Array.isArray(content)) return null;
	const parts = [];
	for (const block of content) {
		if (!block || typeof block !== "object") continue;
		const record = block;
		if (record.type === "text" && typeof record.text === "string") parts.push(record.text);
	}
	return parts.length > 0 ? parts.join("\n") : null;
}
function isHighSurrogate(code) {
	return code >= 55296 && code <= 56319;
}
function isLowSurrogate(code) {
	return code >= 56320 && code <= 57343;
}
function splitLongSessionLine(text, maxChars = SESSION_EXPORT_CONTENT_WRAP_CHARS) {
	const normalized = text.trim();
	if (!normalized) return [];
	if (normalized.length <= maxChars) return [normalized];
	const segments = [];
	let cursor = 0;
	while (cursor < normalized.length) {
		if (normalized.length - cursor <= maxChars) {
			segments.push(normalized.slice(cursor).trim());
			break;
		}
		const limit = cursor + maxChars;
		let splitAt = limit;
		for (let index = limit; index > cursor; index -= 1) if (normalized[index] === " ") {
			splitAt = index;
			break;
		}
		if (splitAt < normalized.length && splitAt > cursor && isHighSurrogate(normalized.charCodeAt(splitAt - 1)) && isLowSurrogate(normalized.charCodeAt(splitAt))) splitAt -= 1;
		segments.push(normalized.slice(cursor, splitAt).trim());
		cursor = splitAt;
		while (cursor < normalized.length && normalized[cursor] === " ") cursor += 1;
	}
	return segments.filter(Boolean);
}
function renderSessionExportLines(label, text) {
	return splitLongSessionLine(text).map((segment) => `${label}: ${segment}`);
}
/**
* Strip OpenClaw-injected inbound metadata envelopes from a raw text block.
*
* User-role messages arriving from external channels (Telegram, Discord,
* Slack, …) are stored with a multi-line prefix containing Conversation info,
* Sender info, and other AI-facing metadata blocks. These envelopes must be
* removed BEFORE normalization, because `stripInboundMetadata` relies on
* newline structure and fenced `json` code fences to locate sentinels; once
* `normalizeSessionText` collapses newlines into spaces, stripping is
* impossible.
*
* See: https://github.com/openclaw/openclaw/issues/63921
*/
function stripInboundMetadataForUserRole(text, role) {
	if (role !== "user") return text;
	return stripInboundMetadata(text);
}
const GENERATED_SYSTEM_MESSAGE_RE = /^System(?: \(untrusted\))?: \[[^\]]+\]\s*/;
function isGeneratedSystemWrapperMessage(text, role) {
	if (role !== "user") return false;
	return GENERATED_SYSTEM_MESSAGE_RE.test(text);
}
function isGeneratedCronPromptMessage(text, role) {
	if (role !== "user") return false;
	return DIRECT_CRON_PROMPT_RE.test(text);
}
function isGeneratedHeartbeatPromptMessage(text, role) {
	return role === "user" && isHeartbeatUserMessage({
		role,
		content: text
	}, HEARTBEAT_PROMPT);
}
function sanitizeSessionText(text, role) {
	const normalized = normalizeSessionText(stripInternalRuntimeContext(stripInboundMetadataForUserRole(text, role)));
	if (!normalized) return null;
	if (isGeneratedSystemWrapperMessage(normalized, role)) return null;
	if (isGeneratedCronPromptMessage(normalized, role)) return null;
	if (isGeneratedHeartbeatPromptMessage(normalized, role)) return null;
	if (isSilentReplyPayloadText(normalized)) return null;
	if (role === "assistant" && normalized === "HEARTBEAT_OK") return null;
	if (isExecCompletionEvent(normalized.replace(GENERATED_SYSTEM_MESSAGE_RE, "").trim())) return null;
	return normalized;
}
function isRecalledMemoryMessage(message) {
	const provenance = message.provenance;
	return provenance?.kind === "internal_system" && (provenance.sourceTool === "memory_search" || provenance.sourceTool === "memory_get");
}
function classifySessionMessageOrigin(message, turnOrigin) {
	if (message.role === "assistant") {
		const openClawMetadata = message["__openclaw"];
		if (openClawMetadata && typeof openClawMetadata === "object" && openClawMetadata.turnTainted === true) return "untrusted";
		return turnOrigin === "owner" ? "agent" : turnOrigin;
	}
	if (message.provenance?.kind === "internal_system") return "system";
	const openClawMetadata = message["__openclaw"];
	return (openClawMetadata && typeof openClawMetadata === "object" ? openClawMetadata : void 0)?.senderIsOwner === true ? "owner" : "untrusted";
}
function parseSessionTimestampMs(record, message) {
	const candidates = [message.timestamp, record.timestamp];
	for (const value of candidates) {
		if (typeof value === "number" && Number.isFinite(value)) {
			const ms = value > 0 && value < 1e11 ? value * 1e3 : value;
			if (Number.isFinite(ms) && ms > 0 && ms <= MAX_DATE_TIMESTAMP_MS) return Math.floor(ms);
		}
		if (typeof value === "string") {
			const parsed = Date.parse(value);
			if (Number.isFinite(parsed) && parsed > 0) return parsed;
		}
	}
	return 0;
}
function serializeTranscriptEvent(record) {
	const serialized = JSON.stringify(record);
	return typeof serialized === "string" ? serialized : null;
}
function serializeTranscriptEvents(records) {
	return records.map(serializeTranscriptEvent).filter((line) => line !== null).join("\n");
}
function resolveSessionEntryParseYieldLines(opts) {
	const configured = opts.parseYieldEveryLines;
	if (typeof configured === "number" && Number.isFinite(configured)) return Math.max(1, Math.floor(configured));
	return SESSION_ENTRY_PARSE_YIELD_LINES;
}
function resolveBuildSessionSqliteIdentity(absPath, opts) {
	if (opts.agentId && opts.sessionId && opts.storePath) return {
		agentId: opts.agentId,
		sessionId: opts.sessionId,
		...opts.sessionKey ? { sessionKey: opts.sessionKey } : {},
		storePath: opts.storePath
	};
	const marker = parseSqliteSessionFileMarker(absPath);
	return marker && opts.sessionKey ? {
		...marker,
		sessionKey: opts.sessionKey
	} : marker;
}
function statSessionEntrySync(absPath, opts = {}) {
	const sqliteIdentity = resolveBuildSessionSqliteIdentity(absPath, opts);
	if (sqliteIdentity) {
		const stats = readTranscriptStatsSync({ ...sqliteIdentity });
		return {
			absPath,
			path: sessionPathForSessionIdentity(sqliteIdentity.agentId, sqliteIdentity.sessionId),
			mtimeMs: opts.updatedAtMs ?? stats.maxSeq,
			size: stats.sizeBytes
		};
	}
	try {
		const stat = fs.statSync(absPath);
		return stat.isFile() ? {
			absPath,
			path: sessionPathForFile(absPath),
			mtimeMs: stat.mtimeMs,
			size: stat.size
		} : null;
	} catch {
		return null;
	}
}
async function yieldSessionEntryParseIfNeeded(lineIndex, everyLines) {
	if (lineIndex > 0 && lineIndex % everyLines === 0) await new Promise((resolve) => {
		setImmediate(resolve);
	});
}
async function buildSessionEntry(absPath, opts = {}) {
	try {
		const sqliteIdentity = resolveBuildSessionSqliteIdentity(absPath, opts);
		const rawSource = sqliteIdentity ? (() => {
			const stats = readTranscriptStatsSync({ ...sqliteIdentity });
			const raw = serializeTranscriptEvents(loadTranscriptEventsSync({ ...sqliteIdentity }));
			return {
				mtimeMs: opts.updatedAtMs ?? stats.maxSeq,
				path: sessionPathForSessionIdentity(sqliteIdentity.agentId, sqliteIdentity.sessionId),
				raw,
				size: stats.sizeBytes
			};
		})() : null;
		let raw;
		let mtimeMs;
		let size;
		let memoryPath;
		if (rawSource) {
			raw = rawSource.raw;
			mtimeMs = rawSource.mtimeMs;
			size = rawSource.size;
			memoryPath = rawSource.path;
		} else {
			const regularFile = await statRegularFile(absPath);
			if (regularFile.missing) return null;
			const stat = regularFile.stat;
			if (shouldSkipTranscriptFileForDreaming(absPath)) return {
				path: sessionPathForFile(absPath),
				absPath,
				mtimeMs: stat.mtimeMs,
				size: stat.size,
				hash: hashText("\n\n"),
				content: "",
				lineMap: [],
				messageTimestampsMs: [],
				lineProvenance: [],
				sessionKind: opts.sessionKind ?? "unknown"
			};
			raw = (await retryTransientMemoryRead(() => readRegularFile({ filePath: isUsageCountedSessionArchiveTranscriptPath(absPath) ? materializeSessionArchiveForRead(absPath) : absPath }), `read session transcript ${absPath}`)).buffer.toString("utf-8");
			mtimeMs = stat.mtimeMs;
			size = stat.size;
			memoryPath = sessionPathForFile(absPath);
		}
		const collected = [];
		const lineMap = [];
		const messageTimestampsMs = [];
		const lineProvenance = [];
		const parseYieldEveryLines = resolveSessionEntryParseYieldLines(opts);
		const sqliteSessionKey = sqliteIdentity && !opts.sessionKey ? resolveTranscriptSessionKeyBySessionId({
			agentId: sqliteIdentity.agentId,
			sessionId: sqliteIdentity.sessionId,
			storePath: sqliteIdentity.storePath
		}) : void 0;
		const sessionStoreClassification = !sqliteIdentity && (opts.generatedByDreamingNarrative === void 0 || opts.generatedByCronRun === void 0) ? classifySessionTranscriptFromSessionStore(absPath) : null;
		let generatedByDreamingNarrative = opts.generatedByDreamingNarrative ?? (sqliteSessionKey ? isDreamingNarrativeSessionStoreKey(sqliteSessionKey) : void 0) ?? sessionStoreClassification?.generatedByDreamingNarrative ?? false;
		let generatedByCronRun = opts.generatedByCronRun ?? (sqliteSessionKey ? isCronRunSessionKey(sqliteSessionKey) : void 0) ?? sessionStoreClassification?.generatedByCronRun ?? false;
		const sessionKind = opts.sessionKind ?? "unknown";
		const allowArchiveRecordCronClassification = isUsageCountedSessionArchiveTranscriptPath(absPath);
		let insideHeartbeatTurn = false;
		let insideRecalledMemoryTurn = false;
		let turnOrigin = "untrusted";
		for (let jsonlIdx = 0, lineStart = 0; lineStart <= raw.length; jsonlIdx++) {
			await yieldSessionEntryParseIfNeeded(jsonlIdx, parseYieldEveryLines);
			const newlineIndex = raw.indexOf("\n", lineStart);
			const lineEnd = newlineIndex === -1 ? raw.length : newlineIndex;
			const line = raw.slice(lineStart, lineEnd);
			lineStart = newlineIndex === -1 ? raw.length + 1 : newlineIndex + 1;
			if (!line.trim()) continue;
			let record;
			try {
				record = JSON.parse(line);
			} catch {
				continue;
			}
			if (!generatedByDreamingNarrative && isDreamingNarrativeGeneratedRecord(record)) generatedByDreamingNarrative = true;
			if (!generatedByCronRun && allowArchiveRecordCronClassification && isCronRunGeneratedRecord(record)) {
				generatedByCronRun = true;
				collected.length = 0;
				lineMap.length = 0;
				messageTimestampsMs.length = 0;
				lineProvenance.length = 0;
			}
			if (!record || typeof record !== "object" || record.type !== "message") continue;
			const message = record.message;
			if (!message || typeof message.role !== "string") continue;
			if (message.role !== "user" && message.role !== "assistant") continue;
			const inputProvenance = message.provenance;
			const isHeartbeatUser = message.role === "user" && inputProvenance?.kind === "internal_system" && inputProvenance.sourceTool === "heartbeat";
			if (message.role === "user") {
				insideHeartbeatTurn = isHeartbeatUser;
				insideRecalledMemoryTurn = isRecalledMemoryMessage(message);
				turnOrigin = classifySessionMessageOrigin(message, turnOrigin);
			}
			if (message.role === "user" && hasInterSessionUserProvenance(message)) continue;
			const rawText = collectRawSessionText(message.content);
			if (rawText === null) continue;
			const text = sanitizeSessionText(rawText, message.role);
			if (!text) continue;
			if (insideHeartbeatTurn || insideRecalledMemoryTurn) continue;
			if (generatedByDreamingNarrative || generatedByCronRun) continue;
			const safe = redactSensitiveText(text, { mode: "tools" });
			const renderedLines = renderSessionExportLines(message.role === "user" ? "User" : "Assistant", safe);
			const timestampMs = parseSessionTimestampMs(record, message);
			const memoryProvenance = {
				originClass: classifySessionMessageOrigin(message, turnOrigin),
				sessionKind,
				observedAt: Math.max(0, Math.floor(timestampMs || mtimeMs))
			};
			collected.push(...renderedLines);
			lineMap.push(...renderedLines.map(() => jsonlIdx + 1));
			messageTimestampsMs.push(...renderedLines.map(() => timestampMs));
			lineProvenance.push(...renderedLines.map(() => memoryProvenance));
		}
		const content = collected.join("\n");
		return {
			path: memoryPath,
			absPath,
			mtimeMs,
			size,
			hash: hashText(content + "\n" + lineMap.join(",") + "\n" + messageTimestampsMs.join(",") + "\n" + JSON.stringify(lineProvenance)),
			content,
			lineMap,
			messageTimestampsMs,
			lineProvenance,
			sessionKind,
			...generatedByDreamingNarrative ? { generatedByDreamingNarrative: true } : {},
			...generatedByCronRun ? { generatedByCronRun: true } : {}
		};
	} catch (err) {
		logSessionFileReadFailure(absPath, err);
		return null;
	}
}
//#endregion
//#region packages/memory-host-sdk/src/host/qmd-process.ts
const DEFAULT_WINDOWS_SYSTEM_ROOT = "C:\\Windows";
const WINDOWS_TASKKILL_TIMEOUT_MS = 5e3;
function resolveQmdBinaryUnavailableReason(result) {
	return result.reason ?? "binary";
}
function resolveCliSpawnInvocation(params) {
	return materializeWindowsSpawnProgram(resolveWindowsSpawnProgram({
		command: params.command,
		platform: process.platform,
		env: params.env,
		execPath: process.execPath,
		packageName: params.packageName,
		allowShellFallback: false
	}), params.args);
}
async function checkQmdBinaryAvailability(params) {
	let spawnInvocation;
	try {
		spawnInvocation = resolveCliSpawnInvocation({
			command: params.command,
			args: [],
			env: params.env,
			packageName: "qmd"
		});
	} catch (err) {
		return {
			available: false,
			reason: "binary",
			error: formatErrorMessage(err)
		};
	}
	const cwd = params.cwd ?? process.cwd();
	const cwdError = validateQmdProbeCwd(cwd);
	if (cwdError) return cwdError;
	return await new Promise((resolve) => {
		let settled = false;
		let didSpawn = false;
		const finish = (result) => {
			if (settled) return;
			settled = true;
			if (timer) clearTimeout(timer);
			resolve(result);
		};
		const child = spawn(spawnInvocation.command, spawnInvocation.argv, {
			env: params.env,
			cwd,
			shell: spawnInvocation.shell,
			windowsHide: spawnInvocation.windowsHide,
			stdio: "ignore",
			detached: shouldUseQmdProcessGroup()
		});
		const timeoutMs = resolveSafeTimeoutDelayMs(params.timeoutMs ?? 2e3, { minMs: 0 });
		const timer = setTimeout(() => {
			signalQmdProcessTree(child, "SIGKILL");
			finish({
				available: false,
				reason: "binary",
				error: `spawn ${params.command} timed out after ${timeoutMs}ms`
			});
		}, timeoutMs);
		child.once("error", (err) => {
			finish({
				available: false,
				reason: "binary",
				error: formatErrorMessage(err)
			});
		});
		child.once("spawn", () => {
			didSpawn = true;
			signalQmdProcessTree(child);
			finish({ available: true });
		});
		child.once("close", () => {
			if (!didSpawn) return;
			finish({ available: true });
		});
	});
}
function validateQmdProbeCwd(cwd) {
	try {
		if (!statSync(cwd).isDirectory()) return {
			available: false,
			reason: "workspace-cwd",
			error: `workspace directory is not a directory: ${cwd}`
		};
		return null;
	} catch (err) {
		if (typeof err === "object" && err && "code" in err && err.code === "ENOENT") return {
			available: false,
			reason: "workspace-cwd",
			error: `workspace directory missing: ${cwd}`
		};
		return {
			available: false,
			reason: "workspace-cwd",
			error: `workspace directory unavailable: ${cwd} (${formatErrorMessage(err)})`
		};
	}
}
/**
* Normalize an aborted signal into the error used to reject a killed command.
* Prefers the caller-supplied abort reason (so a deadline message survives) and
* falls back to a stable per-command abort error.
*/
function abortReason(signal, commandSummary) {
	const reason = signal?.reason;
	if (reason instanceof Error) return reason;
	if (typeof reason === "string" && reason.length > 0) return new Error(reason);
	return /* @__PURE__ */ new Error(`${commandSummary} aborted`);
}
async function runCliCommand(params) {
	return await new Promise((resolve, reject) => {
		const { signal } = params;
		if (signal?.aborted) {
			reject(abortReason(signal, params.commandSummary));
			return;
		}
		const child = spawn(params.spawnInvocation.command, params.spawnInvocation.argv, {
			env: params.env,
			cwd: params.cwd,
			shell: params.spawnInvocation.shell,
			windowsHide: params.spawnInvocation.windowsHide,
			detached: shouldUseQmdProcessGroup()
		});
		let stdout = "";
		let stderr = "";
		let stdoutTruncated = false;
		let stderrTruncated = false;
		let settled = false;
		const discardStdout = params.discardStdout === true;
		if (!discardStdout) child.stdout.setEncoding("utf8");
		child.stderr.setEncoding("utf8");
		const timeoutMs = params.timeoutMs === void 0 ? void 0 : resolveSafeTimeoutDelayMs(params.timeoutMs);
		const timer = timeoutMs ? setTimeout(() => {
			signalQmdProcessTree(child, "SIGKILL");
			settle(() => reject(/* @__PURE__ */ new Error(`${params.commandSummary} timed out after ${timeoutMs}ms`)));
		}, timeoutMs) : null;
		const onAbort = () => {
			signalQmdProcessTree(child, "SIGKILL");
			settle(() => reject(abortReason(signal, params.commandSummary)));
		};
		function settle(run) {
			if (settled) return;
			settled = true;
			if (timer) clearTimeout(timer);
			signal?.removeEventListener("abort", onAbort);
			run();
		}
		signal?.addEventListener("abort", onAbort, { once: true });
		child.stdout.on("data", (data) => {
			if (discardStdout) return;
			const next = appendOutputWithCap(stdout, data, params.maxOutputChars);
			stdout = next.text;
			stdoutTruncated = stdoutTruncated || next.truncated;
		});
		child.stderr.on("data", (data) => {
			const next = appendOutputWithCap(stderr, data, params.maxOutputChars);
			stderr = next.text;
			stderrTruncated = stderrTruncated || next.truncated;
		});
		for (const streamName of ["stdout", "stderr"]) child[streamName].on("error", (error) => {
			if (settled) return;
			signalQmdProcessTree(child, "SIGKILL");
			settle(() => reject(new Error(`${params.commandSummary} ${streamName} error: ${error.message}`, { cause: error })));
		});
		child.on("error", (err) => {
			if (timer) clearTimeout(timer);
			settle(() => reject(err));
		});
		child.on("close", (code, closeSignal) => {
			if (timer) clearTimeout(timer);
			settle(() => {
				if (!discardStdout && (stdoutTruncated || stderrTruncated)) {
					reject(/* @__PURE__ */ new Error(`${params.commandSummary} produced too much output (limit ${params.maxOutputChars} chars)`));
					return;
				}
				if (code === 0) resolve({
					stdout,
					stderr
				});
				else reject(new CliCommandError({
					commandSummary: params.commandSummary,
					code,
					signal: closeSignal ?? null,
					stdout,
					stderr
				}));
			});
		});
	});
}
function shouldUseQmdProcessGroup() {
	return process.platform !== "win32";
}
function getEnvValueCaseInsensitive(env, expectedKey) {
	const direct = env[expectedKey];
	if (direct !== void 0) return direct;
	const expected = expectedKey.toUpperCase();
	const actualKey = Object.keys(env).find((key) => key.toUpperCase() === expected);
	return actualKey ? env[actualKey] : void 0;
}
function normalizeWindowsSystemRoot(raw) {
	const trimmed = raw?.trim();
	if (!trimmed || trimmed.includes("\0") || trimmed.includes("\r") || trimmed.includes("\n") || trimmed.includes(";")) return null;
	const normalized = path.win32.normalize(trimmed);
	if (!path.win32.isAbsolute(normalized) || normalized.startsWith("\\\\")) return null;
	const parsed = path.win32.parse(normalized);
	if (!/^[A-Za-z]:\\$/.test(parsed.root) || normalized.length <= parsed.root.length) return null;
	return normalized.replace(/[\\/]+$/, "");
}
function resolveWindowsTaskkillPath(env = process.env) {
	const systemRoot = normalizeWindowsSystemRoot(getEnvValueCaseInsensitive(env, "SystemRoot")) ?? normalizeWindowsSystemRoot(getEnvValueCaseInsensitive(env, "WINDIR")) ?? DEFAULT_WINDOWS_SYSTEM_ROOT;
	return path.win32.join(systemRoot, "System32", "taskkill.exe");
}
function runWindowsTaskkill(params) {
	return new Promise((resolve) => {
		let taskkill;
		try {
			taskkill = spawn(params.taskkillPath, params.args, {
				stdio: "ignore",
				windowsHide: true
			});
		} catch {
			resolve("failure");
			return;
		}
		let settled = false;
		const finish = (result) => {
			if (settled) return;
			settled = true;
			clearTimeout(timeout);
			resolve(result);
		};
		taskkill.once("error", () => finish("failure"));
		taskkill.once("close", (code) => finish(code === 0 ? "success" : "failure"));
		const timeout = setTimeout(() => {
			finish("timed-out");
			try {
				taskkill.kill("SIGKILL");
			} catch {}
			taskkill.unref();
		}, WINDOWS_TASKKILL_TIMEOUT_MS);
		timeout.unref?.();
	});
}
function isQmdChildAlive(child) {
	return child.exitCode === null && child.signalCode === null;
}
async function signalQmdProcessTree(child, signal) {
	if (shouldUseQmdProcessGroup() && typeof child.pid === "number") try {
		if (signal === void 0) process.kill(-child.pid);
		else process.kill(-child.pid, signal);
		return;
	} catch {}
	if (!shouldUseQmdProcessGroup() && typeof child.pid === "number" && isQmdChildAlive(child)) {
		const taskkillPath = resolveWindowsTaskkillPath();
		const args = [
			"/PID",
			String(child.pid),
			"/T"
		];
		if (signal === "SIGKILL") args.push("/F");
		const result = await runWindowsTaskkill({
			taskkillPath,
			args
		});
		if (result === "success") return;
		if (signal !== "SIGKILL" && result !== "timed-out" && isQmdChildAlive(child)) {
			if (await runWindowsTaskkill({
				taskkillPath,
				args: [...args, "/F"]
			}) === "success") return;
		}
	}
	if (!isQmdChildAlive(child)) return;
	try {
		if (signal === void 0) child.kill();
		else child.kill(signal);
	} catch {}
}
var CliCommandError = class extends Error {
	constructor(params) {
		super(formatCliCommandFailureMessage(params));
		this.name = "CliCommandError";
		this.code = params.code;
		this.signal = params.signal;
		this.stdout = params.stdout;
		this.stderr = params.stderr;
	}
};
function formatCliCommandFailureMessage(params) {
	const exit = params.code === null ? `signal ${params.signal ?? "unknown"}` : `code ${String(params.code)}`;
	return `${params.commandSummary} failed (${exit}): ${params.stderr || params.stdout}`;
}
function appendOutputWithCap(current, chunk, maxChars) {
	const appended = current + chunk;
	const chars = Array.from(appended);
	if (chars.length <= maxChars) return {
		text: appended,
		truncated: false
	};
	return {
		text: chars.slice(-maxChars).join(""),
		truncated: true
	};
}
//#endregion
export { buildSessionEntry as a, resolveSessionIdentityForTranscriptFile as c, statSessionEntrySync as d, listSessionTranscriptCorpusEntriesForAgent as f, runCliCommand as i, sessionPathForFile as l, resolveCliSpawnInvocation as n, parseCanonicalSessionSyncTargetFromPath as o, resolveQmdBinaryUnavailableReason as r, resolveSessionFileForSyncTarget as s, checkQmdBinaryAvailability as t, sessionPathForSessionIdentity as u };
