import { s as asFiniteNumber } from "./number-coercion-Crk_c9KW.js";
import { i as asOptionalRecord } from "./record-coerce-DHZ4bFlT.js";
import { i as resolveGlobalSingleton } from "./global-singleton-Dc_stLtU.js";
import { t as setSafeTimeout } from "./timer-delay-Cq4bgkWf.js";
import { M as normalizeAgentRunTerminalReplySnapshot, j as mergeAgentRunTerminalReplySnapshot } from "./openclaw-state-db-BU55lNCH.js";
import { u as onAgentEvent } from "./agent-events-COCf-9-O.js";
import { i as buildAgentRunTerminalOutcomeFromLifecycleEvent, l as mergeAgentRunTerminalOutcome, n as buildAgentRunTerminalOutcome, s as isStickyAgentRunTerminalOutcome, t as AGENT_RUN_TERMINAL_RETRY_GRACE_MS } from "./agent-run-terminal-outcome-9kJP3Yn1.js";
import { t as isNonTerminalAgentRunStatus } from "./agent-run-status-CdFMkKaA.js";
//#region src/gateway/server-methods/agent-job.ts
const AGENT_RUN_CACHE_TTL_MS = 10 * 6e4;
const AGENT_RUN_CACHE_MAX_ENTRIES = 5e3;
const agentJobState = resolveGlobalSingleton(Symbol.for("openclaw.agentJobState"), () => ({
	jobs: /* @__PURE__ */ new Map(),
	runStarts: /* @__PURE__ */ new Map(),
	pendingErrors: /* @__PURE__ */ new Map(),
	pendingTimeouts: /* @__PURE__ */ new Map(),
	waiters: /* @__PURE__ */ new Map(),
	version: 0
}), (state) => {
	for (const pending of state.pendingErrors.values()) clearTimeout(pending.timer);
	for (const pending of state.pendingTimeouts.values()) clearTimeout(pending.timer);
	state.jobs.clear();
	state.runStarts.clear();
	state.pendingErrors.clear();
	state.pendingTimeouts.clear();
	const waiters = Array.from(state.waiters.values()).flatMap((entries) => Array.from(entries));
	state.waiters.clear();
	for (const waiter of waiters) waiter(true);
});
const agentJobs = agentJobState.jobs;
const agentRunStarts = agentJobState.runStarts;
const pendingAgentRunErrors = agentJobState.pendingErrors;
const pendingAgentRunTimeouts = agentJobState.pendingTimeouts;
const agentRunWaiters = agentJobState.waiters;
let agentRunListenerStarted = false;
function nextAgentRunVersion() {
	agentJobState.version += 1;
	return agentJobState.version;
}
function pruneAgentRunCache(now = Date.now()) {
	for (const [runId, job] of agentJobs) {
		if (now - job.cachedAt <= AGENT_RUN_CACHE_TTL_MS) continue;
		agentJobs.delete(runId);
	}
}
function enforceAgentRunCacheMaxEntries() {
	if (agentJobs.size <= AGENT_RUN_CACHE_MAX_ENTRIES) return;
	const toRemove = agentJobs.size - AGENT_RUN_CACHE_MAX_ENTRIES;
	let removed = 0;
	for (const runId of agentJobs.keys()) {
		if (removed >= toRemove) break;
		if ((agentRunWaiters.get(runId)?.size ?? 0) > 0) continue;
		agentJobs.delete(runId);
		removed += 1;
	}
}
function terminalOutcomeFromSnapshot(snapshot) {
	if (snapshot.pendingError) return;
	return buildAgentRunTerminalOutcome(snapshot);
}
function shouldPreserveTerminalSnapshot(existing, incoming) {
	const existingOutcome = terminalOutcomeFromSnapshot(existing);
	const incomingOutcome = terminalOutcomeFromSnapshot(incoming);
	if (!existingOutcome || !incomingOutcome) return false;
	return mergeAgentRunTerminalOutcome(existingOutcome, incomingOutcome) === existingOutcome;
}
function mergeSnapshot(existing, incoming) {
	if (!existing) return incoming;
	const terminalReply = mergeAgentRunTerminalReplySnapshot(existing.terminalReply, incoming.terminalReply);
	return {
		...shouldPreserveTerminalSnapshot(existing, incoming) ? existing : incoming,
		...terminalReply ? { terminalReply } : {},
		cachedAt: incoming.cachedAt,
		recordedAt: incoming.recordedAt,
		version: incoming.version
	};
}
function notifyAgentRunWaiters(runId) {
	for (const waiter of agentRunWaiters.get(runId) ?? []) waiter();
}
function recordAgentRunSnapshot(snapshot, version = nextAgentRunVersion()) {
	const entry = {
		...snapshot,
		cachedAt: Date.now(),
		version
	};
	pruneAgentRunCache(entry.cachedAt);
	const snapshotsBySource = agentJobs.get(entry.runId)?.snapshotsBySource ?? /* @__PURE__ */ new Map();
	const sourceSnapshot = mergeSnapshot(snapshotsBySource.get(entry.source), entry);
	snapshotsBySource.set(entry.source, sourceSnapshot);
	agentJobs.set(entry.runId, {
		cachedAt: entry.cachedAt,
		snapshotsBySource
	});
	enforceAgentRunCacheMaxEntries();
	notifyAgentRunWaiters(entry.runId);
}
function clearPendingAgentRunError(runId) {
	const pending = pendingAgentRunErrors.get(runId);
	if (!pending) return;
	clearTimeout(pending.timer);
	pendingAgentRunErrors.delete(runId);
}
function clearPendingAgentRunTimeout(runId) {
	const pending = pendingAgentRunTimeouts.get(runId);
	if (!pending) return;
	clearTimeout(pending.timer);
	pendingAgentRunTimeouts.delete(runId);
}
function beginAgentJob(runId, startedAt) {
	nextAgentRunVersion();
	clearPendingAgentRunError(runId);
	clearPendingAgentRunTimeout(runId);
	agentJobs.delete(runId);
	if (startedAt !== void 0) agentRunStarts.set(runId, startedAt);
}
function mergePendingAgentRunTerminal(snapshot) {
	return [pendingAgentRunErrors, pendingAgentRunTimeouts].reduce((current, pendingRuns) => {
		const pending = pendingRuns.get(snapshot.runId)?.snapshot;
		return pending && shouldPreserveTerminalSnapshot(pending, current) ? pending : current;
	}, snapshot);
}
function schedulePendingAgentRunTerminal(pendingRuns, snapshot) {
	const terminalSnapshot = mergePendingAgentRunTerminal(snapshot);
	if (terminalSnapshot !== snapshot) {
		terminalSnapshot.version = snapshot.version;
		return;
	}
	clearPendingAgentRunError(snapshot.runId);
	clearPendingAgentRunTimeout(snapshot.runId);
	const timer = setSafeTimeout(() => {
		const pending = pendingRuns.get(snapshot.runId);
		if (!pending || pending.timer !== timer) return;
		pendingRuns.delete(snapshot.runId);
		recordAgentRunSnapshot(pending.snapshot, pending.snapshot.version);
	}, AGENT_RUN_TERMINAL_RETRY_GRACE_MS);
	timer.unref?.();
	pendingRuns.set(snapshot.runId, {
		snapshot,
		timer
	});
}
function createPendingErrorTimeoutSnapshot(snapshot) {
	return {
		status: "timeout",
		startedAt: snapshot.startedAt,
		error: snapshot.error,
		pendingError: true,
		...snapshot.providerStarted !== void 0 ? { providerStarted: snapshot.providerStarted } : {}
	};
}
function createSnapshotFromLifecycleEvent(params) {
	const { runId, phase, data } = params;
	const startedAt = typeof data?.startedAt === "number" ? data.startedAt : agentRunStarts.get(runId);
	const endedAt = typeof data?.endedAt === "number" ? data.endedAt : void 0;
	const terminalOutcome = buildAgentRunTerminalOutcomeFromLifecycleEvent({
		phase,
		data,
		startedAt,
		endedAt
	});
	const legacyBareAbort = terminalOutcome.reason === "aborted" && data?.stopReason == null && data?.status == null;
	const terminalReply = normalizeAgentRunTerminalReplySnapshot(data?.terminalReply);
	return {
		runId,
		source: "lifecycle",
		recordedAt: Date.now(),
		status: legacyBareAbort ? "timeout" : terminalOutcome.status,
		startedAt,
		endedAt,
		error: legacyBareAbort ? void 0 : terminalOutcome.error,
		stopReason: legacyBareAbort ? void 0 : terminalOutcome.stopReason,
		livenessState: terminalOutcome.livenessState,
		...data?.yielded === true ? { yielded: true } : {},
		...terminalOutcome.timeoutPhase ? { timeoutPhase: terminalOutcome.timeoutPhase } : {},
		...terminalOutcome.providerStarted !== void 0 ? { providerStarted: terminalOutcome.providerStarted } : {},
		...terminalReply ? { terminalReply } : {},
		version: nextAgentRunVersion()
	};
}
function ensureAgentRunListener() {
	if (agentRunListenerStarted) return;
	agentRunListenerStarted = true;
	onAgentEvent((evt) => {
		if (!evt || evt.stream !== "lifecycle") return;
		const phase = evt.data?.phase;
		if (phase === "start") {
			const startedAt = typeof evt.data?.startedAt === "number" ? evt.data.startedAt : Date.now();
			beginAgentJob(evt.runId, startedAt);
			return;
		}
		if (phase !== "end" && phase !== "error") return;
		const snapshot = createSnapshotFromLifecycleEvent({
			runId: evt.runId,
			phase,
			data: evt.data
		});
		agentRunStarts.delete(evt.runId);
		if (phase === "error" && evt.data?.fallbackExhaustedFailure !== true) {
			schedulePendingAgentRunTerminal(pendingAgentRunErrors, snapshot);
			return;
		}
		if (phase === "end" && snapshot.status === "timeout") {
			schedulePendingAgentRunTerminal(pendingAgentRunTimeouts, snapshot);
			return;
		}
		const terminalSnapshot = mergePendingAgentRunTerminal(snapshot);
		clearPendingAgentRunError(evt.runId);
		clearPendingAgentRunTimeout(evt.runId);
		recordAgentRunSnapshot(terminalSnapshot, snapshot.version);
	});
}
function asString(value) {
	return typeof value === "string" && value.trim() ? value : void 0;
}
function parseDedupeObservation(entry) {
	const payload = entry.payload;
	const status = typeof payload?.status === "string" ? payload.status : void 0;
	if (isNonTerminalAgentRunStatus(status)) return { state: "active" };
	const terminalStatus = status === "ok" || status === "timeout" || status === "error" ? status : entry.ok ? void 0 : "error";
	if (!terminalStatus) return { state: "untracked" };
	const resultMeta = asOptionalRecord(asOptionalRecord(payload?.result)?.meta);
	const terminalReply = normalizeAgentRunTerminalReplySnapshot(payload?.terminalReply ?? resultMeta?.terminalReply);
	const startedAt = asFiniteNumber(payload?.startedAt);
	const endedAt = asFiniteNumber(payload?.endedAt) ?? entry.ts;
	const stopReason = asString(payload?.stopReason) ?? asString(resultMeta?.stopReason);
	const livenessState = asString(payload?.livenessState) ?? asString(resultMeta?.livenessState);
	const terminalOutcome = buildAgentRunTerminalOutcome({
		status: terminalStatus,
		startedAt,
		endedAt,
		error: typeof payload?.error === "string" ? payload.error : typeof payload?.summary === "string" ? payload.summary : entry.error?.message,
		stopReason,
		livenessState,
		timeoutPhase: payload?.timeoutPhase ?? resultMeta?.timeoutPhase,
		providerStarted: payload?.providerStarted ?? resultMeta?.providerStarted
	});
	return {
		state: "terminal",
		snapshot: {
			status: terminalOutcome.status,
			startedAt,
			endedAt,
			error: terminalOutcome.status === "ok" ? void 0 : terminalOutcome.error,
			stopReason,
			livenessState,
			...payload?.yielded === true || resultMeta?.yielded === true ? { yielded: true } : {},
			...terminalOutcome.timeoutPhase ? { timeoutPhase: terminalOutcome.timeoutPhase } : {},
			...terminalOutcome.providerStarted !== void 0 ? { providerStarted: terminalOutcome.providerStarted } : {},
			...terminalReply ? { terminalReply } : {}
		}
	};
}
function parseDedupeKey(key) {
	const separator = key.indexOf(":");
	if (separator === -1) return;
	const source = key.slice(0, separator);
	const runId = key.slice(separator + 1);
	if (source !== "agent" && source !== "chat" || !runId) return;
	return {
		runId,
		source
	};
}
function setGatewayDedupeEntry(params) {
	const existing = params.dedupe.get(params.key);
	const existingObservation = existing ? parseDedupeObservation(existing) : void 0;
	const incomingObservation = parseDedupeObservation(params.entry);
	const existingOutcome = existingObservation?.state === "terminal" ? terminalOutcomeFromSnapshot(existingObservation.snapshot) : void 0;
	const incomingOutcome = incomingObservation.state === "terminal" ? terminalOutcomeFromSnapshot(incomingObservation.snapshot) : void 0;
	if (existingOutcome && isStickyAgentRunTerminalOutcome(existingOutcome) && (!incomingOutcome || mergeAgentRunTerminalOutcome(existingOutcome, incomingOutcome) === existingOutcome)) return;
	params.dedupe.set(params.key, params.entry);
	const key = parseDedupeKey(params.key);
	if (!key) return;
	if (incomingObservation.state === "active") {
		beginAgentJob(key.runId);
		return;
	}
	if (incomingObservation.state === "terminal") recordAgentRunSnapshot({
		...incomingObservation.snapshot,
		runId: key.runId,
		source: key.source,
		recordedAt: params.entry.ts
	});
}
function getFreshestDedupeSnapshot(snapshotsBySource) {
	const agent = snapshotsBySource.get("agent");
	const chat = snapshotsBySource.get("chat");
	if (agent && chat) return chat.recordedAt > agent.recordedAt ? mergeSnapshot(agent, chat) : mergeSnapshot(chat, agent);
	return agent ?? chat;
}
function getCanonicalAgentRunSnapshot(snapshotsBySource) {
	const dedupe = getFreshestDedupeSnapshot(snapshotsBySource);
	const lifecycle = snapshotsBySource.get("lifecycle");
	if (!dedupe || !lifecycle) return dedupe ?? lifecycle;
	return dedupe.version > lifecycle.version ? mergeSnapshot(lifecycle, dedupe) : mergeSnapshot(dedupe, lifecycle);
}
function getAgentRunSnapshot(params) {
	pruneAgentRunCache();
	const job = agentJobs.get(params.runId);
	const snapshot = params.source ? job?.snapshotsBySource.get(params.source) : job ? getCanonicalAgentRunSnapshot(job.snapshotsBySource) : void 0;
	return snapshot && snapshot.version > params.afterVersion ? snapshot : void 0;
}
function addAgentRunWaiter(runId, waiter) {
	const waiters = agentRunWaiters.get(runId) ?? /* @__PURE__ */ new Set();
	waiters.add(waiter);
	agentRunWaiters.set(runId, waiters);
	return () => {
		waiters.delete(waiter);
		if (waiters.size === 0) agentRunWaiters.delete(runId);
	};
}
function publicSnapshot(snapshot) {
	return {
		status: snapshot.status,
		startedAt: snapshot.startedAt,
		endedAt: snapshot.endedAt,
		error: snapshot.error,
		stopReason: snapshot.stopReason,
		livenessState: snapshot.livenessState,
		yielded: snapshot.yielded,
		pendingError: snapshot.pendingError,
		timeoutPhase: snapshot.timeoutPhase,
		providerStarted: snapshot.providerStarted,
		terminalReply: snapshot.terminalReply
	};
}
async function waitForAgentJob(params) {
	ensureAgentRunListener();
	const afterVersion = params.ignoreCachedSnapshot ? agentJobState.version : -1;
	const cached = getAgentRunSnapshot({
		runId: params.runId,
		source: params.source,
		afterVersion
	});
	if (cached) return publicSnapshot(cached);
	if (params.timeoutMs <= 0) return null;
	return await new Promise((resolve) => {
		let settled = false;
		let removeWaiter = () => {};
		const finish = (snapshot) => {
			if (settled) return;
			settled = true;
			clearTimeout(timeoutHandle);
			removeWaiter();
			resolve(snapshot);
		};
		const onWake = (lifecycleReset = false) => {
			if (lifecycleReset) {
				finish(null);
				return;
			}
			const snapshot = getAgentRunSnapshot({
				runId: params.runId,
				source: params.source,
				afterVersion
			});
			if (snapshot) finish(publicSnapshot(snapshot));
		};
		removeWaiter = addAgentRunWaiter(params.runId, onWake);
		const timeoutHandle = setSafeTimeout(() => {
			if (!params.source) {
				const pendingError = pendingAgentRunErrors.get(params.runId)?.snapshot;
				if (pendingError && pendingError.version > afterVersion) {
					finish(isStickyAgentRunTerminalOutcome(terminalOutcomeFromSnapshot(pendingError)) ? publicSnapshot(pendingError) : createPendingErrorTimeoutSnapshot(pendingError));
					return;
				}
				const pendingTimeout = pendingAgentRunTimeouts.get(params.runId)?.snapshot;
				if (pendingTimeout && pendingTimeout.version > afterVersion && terminalOutcomeFromSnapshot(pendingTimeout)?.reason === "hard_timeout") {
					finish(publicSnapshot(pendingTimeout));
					return;
				}
			}
			finish(null);
		}, params.timeoutMs);
		timeoutHandle.unref?.();
		onWake();
	});
}
ensureAgentRunListener();
//#endregion
export { waitForAgentJob as n, setGatewayDedupeEntry as t };
