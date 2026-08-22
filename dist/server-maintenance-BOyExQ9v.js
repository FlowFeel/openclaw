import { r as createLazyPromiseLoader } from "./lazy-promise-DGqyc4Y4.js";
import { m as isFutureDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { y as sweepStaleRunContexts } from "./agent-run-registry-BluEqSPq.js";
import { o as startSkillCuratorMaintenance } from "./curator-SRJ_8Uu1.js";
import { r as cleanOldMedia } from "./store-BDR50q7S.js";
import { n as pruneOrphanedDeliveryQueueMedia } from "./delivery-queue-media-spool-zRDf89Bg.js";
import { t as chatAbortMarkerTimestampMs } from "./server-chat-state-C8AVcQU8.js";
import { c as removeChatAbortControllerEntry, r as abortTrackedChatRunById } from "./chat-abort-dteij8GM.js";
import { r as HEALTH_REFRESH_INTERVAL_MS, s as TICK_INTERVAL_MS, t as DEDUPE_MAX } from "./server-constants-DKuFNbQH.js";
import "./server-shared-C-7Ahu3n.js";
import { c as resolveWorktreeCleanupLimits, i as WORKTREE_GC_INTERVAL_MS, s as managedWorktrees } from "./service-Dwy8AYem.js";
import { t as createManagedWorktreeOwnerProtection } from "./owner-protection-BD9uH8LB.js";
import { r as pruneStaleControlPlaneBuckets } from "./control-plane-rate-limit-BtKY9m7Q.js";
import "./server-utils-Z6YDwlLk.js";
import { s as setBroadcastHealthUpdate } from "./health-state-n2ZsBJgJ.js";
//#region src/gateway/server-maintenance.ts
const DELIVERY_QUEUE_MEDIA_GC_INTERVAL_MS = 60 * 6e4;
function startGatewayMaintenanceTimers(params) {
	setBroadcastHealthUpdate((snap) => {
		params.broadcast("health", snap, { stateVersion: {
			presence: params.getPresenceVersion(),
			health: params.getHealthVersion()
		} });
		params.nodeSendToAllSubscribed("health", snap);
	});
	const tickInterval = setInterval(() => {
		const payload = { ts: Date.now() };
		params.broadcast("tick", payload);
		params.nodeSendToAllSubscribed("tick", payload);
	}, TICK_INTERVAL_MS);
	const healthInterval = setInterval(() => {
		params.refreshGatewayHealthSnapshot({ probe: false }).catch((err) => params.logHealth.error(`refresh failed: ${formatErrorMessage(err)}`));
	}, HEALTH_REFRESH_INTERVAL_MS);
	params.refreshGatewayHealthSnapshot({ probe: false }).catch((err) => params.logHealth.error(`initial refresh failed: ${formatErrorMessage(err)}`));
	const runWorktreeGc = params.runWorktreeGc ?? (() => {
		const cfg = params.getRuntimeConfig();
		return managedWorktrees.gc({
			shouldProtectOwner: createManagedWorktreeOwnerProtection(cfg),
			limits: resolveWorktreeCleanupLimits()
		});
	});
	const performWorktreeGc = () => runWorktreeGc().catch((err) => {
		params.logHealth.error(`managed worktree cleanup failed: ${formatErrorMessage(err)}`);
	});
	const worktreeCleanup = setInterval(() => void performWorktreeGc(), WORKTREE_GC_INTERVAL_MS);
	performWorktreeGc();
	const runDeliveryQueueMediaGc = params.runDeliveryQueueMediaGc ?? (() => pruneOrphanedDeliveryQueueMedia());
	let deliveryQueueMediaGcStartedAtMs = 0;
	const deliveryQueueMediaGcLoader = createLazyPromiseLoader(async () => {
		try {
			await runDeliveryQueueMediaGc();
		} catch (error) {
			params.logHealth.error(`delivery queue media cleanup failed: ${formatErrorMessage(error)}`);
		} finally {
			deliveryQueueMediaGcLoader.clear();
		}
	});
	const performDeliveryQueueMediaGc = () => {
		if (!deliveryQueueMediaGcLoader.peek()) deliveryQueueMediaGcStartedAtMs = Date.now();
		return deliveryQueueMediaGcLoader.load();
	};
	performDeliveryQueueMediaGc();
	let skillCuratorCleanup = () => {};
	if (params.enableSkillCurator) skillCuratorCleanup = startSkillCuratorMaintenance({
		onError: (err) => params.logHealth.error(`skill curator sweep failed: ${formatErrorMessage(err)}`),
		registerUsageTracking: params.registerSkillUsageTracking,
		runSweep: params.runSkillCuratorSweep
	});
	const dedupeCleanup = setInterval(() => {
		const AGENT_RUN_SEQ_MAX = 1e4;
		const now = Date.now();
		if (now - deliveryQueueMediaGcStartedAtMs >= DELIVERY_QUEUE_MEDIA_GC_INTERVAL_MS) performDeliveryQueueMediaGc();
		const resolveDedupeRunId = (key, entry) => {
			if (!key.startsWith("agent:") && !key.startsWith("chat:")) return;
			const keyRunId = key.slice(key.indexOf(":") + 1);
			if (keyRunId) {
				if (params.chatAbortControllers.has(keyRunId) || params.chatQueuedTurns.has(keyRunId)) return keyRunId;
			}
			const payload = entry.payload;
			return payload && typeof payload === "object" && !Array.isArray(payload) ? typeof payload.runId === "string" ? payload.runId.trim() || void 0 : void 0 : void 0;
		};
		const isPendingAcceptedRunDedupeKey = (key, dedupeEntry) => {
			if (!key.startsWith("agent:") && !key.startsWith("pending-chat:")) return false;
			const payload = dedupeEntry.payload;
			if (!payload || typeof payload !== "object" || Array.isArray(payload)) return false;
			if (payload.status !== "accepted") return false;
			const expiresAtMs = payload.expiresAtMs;
			return isFutureDateTimestampMs(expiresAtMs, { nowMs: now });
		};
		const isActiveRunDedupeKey = (key, dedupeEntry) => {
			const isAgentKey = key.startsWith("agent:");
			const isChatKey = key.startsWith("chat:");
			if (!isAgentKey && !isChatKey) return false;
			const runId = resolveDedupeRunId(key, dedupeEntry);
			const entry = runId ? params.chatAbortControllers.get(runId) : void 0;
			if (entry) return isAgentKey ? entry.kind === "agent" : entry.kind !== "agent";
			return Boolean(isChatKey && runId && params.chatQueuedTurns.has(runId));
		};
		for (const [k, v] of params.dedupe) {
			if (isActiveRunDedupeKey(k, v) || isPendingAcceptedRunDedupeKey(k, v)) continue;
			if (now - v.ts > 3e5) params.dedupe.delete(k);
		}
		if (params.dedupe.size > 1e3) {
			const excess = params.dedupe.size - DEDUPE_MAX;
			const oldestKeys = [...params.dedupe.entries()].filter(([key, entry]) => !isActiveRunDedupeKey(key, entry) && !isPendingAcceptedRunDedupeKey(key, entry)).toSorted(([, left], [, right]) => left.ts - right.ts).slice(0, excess).map(([key]) => key);
			for (const key of oldestKeys) params.dedupe.delete(key);
		}
		pruneMapToMaxSize(params.agentRunSeq, AGENT_RUN_SEQ_MAX);
		for (const [runId, entry] of params.chatAbortControllers) {
			if (entry.projectSessionTerminalPending === true) continue;
			if (isFutureDateTimestampMs(entry.expiresAtMs, { nowMs: now })) continue;
			if (entry.projectSessionTerminalPersistence) {
				const lifecycleGeneration = entry.lifecycleGeneration?.trim();
				const sessionKey = entry.sessionKey.trim();
				const sessionId = entry.sessionId.trim();
				if (entry.controlUiVisible !== false && lifecycleGeneration && sessionKey && sessionId) params.restartRecoveryCandidates.set(runId, {
					runId,
					lifecycleGeneration,
					sessionKey,
					sessionId,
					observedAt: entry.projectSessionTerminalObservedAt
				});
				removeChatAbortControllerEntry(params.chatAbortControllers, runId, entry);
				continue;
			}
			if (entry.projectSessionActive === false) {
				removeChatAbortControllerEntry(params.chatAbortControllers, runId, entry);
				continue;
			}
			abortTrackedChatRunById(params, {
				runId,
				sessionKey: entry.sessionKey,
				stopReason: "timeout"
			});
		}
		const ABORTED_RUN_TTL_MS = 60 * 6e4;
		pruneStaleControlPlaneBuckets(now);
		for (const [runId, record] of params.chatRunState.runs) {
			if (record.abortMarker !== void 0) {
				if (now - chatAbortMarkerTimestampMs(record.abortMarker) > ABORTED_RUN_TTL_MS) {
					params.chatRunState.deleteAbortMarker(runId);
					params.chatRunState.clearRun(runId);
				}
				continue;
			}
			if (params.chatAbortControllers.has(runId)) continue;
			if ([
				record.deltaSentAt,
				record.bufferUpdatedAt,
				record.agentText?.assistant?.lastSentAt,
				record.agentText?.thinking?.lastSentAt
			].some((timestamp) => timestamp !== void 0 && now - timestamp > ABORTED_RUN_TTL_MS)) params.chatRunState.clearRun(runId);
		}
		sweepStaleRunContexts();
	}, 6e4);
	if (typeof params.mediaCleanupTtlMs !== "number") return {
		tickInterval,
		healthInterval,
		dedupeCleanup,
		mediaCleanup: null,
		worktreeCleanup,
		skillCuratorCleanup
	};
	let mediaCleanupInFlight = null;
	const runMediaCleanup = () => {
		if (mediaCleanupInFlight) return mediaCleanupInFlight;
		mediaCleanupInFlight = cleanOldMedia(params.mediaCleanupTtlMs, {
			recursive: true,
			pruneEmptyDirs: true
		}).catch((err) => {
			params.logHealth.error(`media cleanup failed: ${formatErrorMessage(err)}`);
		}).finally(() => {
			mediaCleanupInFlight = null;
		});
		return mediaCleanupInFlight;
	};
	const mediaCleanup = setInterval(() => {
		runMediaCleanup();
	}, 60 * 6e4);
	runMediaCleanup();
	return {
		tickInterval,
		healthInterval,
		dedupeCleanup,
		mediaCleanup,
		worktreeCleanup,
		skillCuratorCleanup
	};
}
//#endregion
export { startGatewayMaintenanceTimers };
