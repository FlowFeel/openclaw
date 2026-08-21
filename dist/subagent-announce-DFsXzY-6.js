import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { i as isCronSessionKey } from "./session-key-utils-02xWdGSz.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { a as logWarn } from "./logger-DGpe8sSn.js";
import { E as isAnnounceSkip } from "./openclaw-state-db-BU55lNCH.js";
import { c as stripLeadingSilentToken, l as stripSilentToken, n as SILENT_REPLY_TOKEN, o as isSilentReplyText, s as startsWithSilentToken } from "./tokens-CMI0yx54.js";
import { c as isAgentEventLifecycleGenerationCurrent, s as getAgentEventLifecycleGeneration } from "./agent-events-COCf-9-O.js";
import { c as callGateway } from "./call-YSl9HPoR.js";
import { s as normalizeDeliveryContext } from "./delivery-context.shared-B-QSuGw_.js";
import { t as INTERNAL_MESSAGE_CHANNEL } from "./message-channel-constants-76XnXM8q.js";
import "./message-channel-1n7hD5_u.js";
import "./delivery-context-BPtbSx1b.js";
import { D as waitForEmbeddedAgentRunEnd, u as isEmbeddedAgentRunActive } from "./runs-Du_qIW6W.js";
import { n as buildAnnounceIdempotencyKey, t as buildAnnounceIdFromChildRun } from "./announce-idempotency-D7LnUTJR.js";
import { c as getSubagentDepthFromSessionStore } from "./subagent-capabilities-nSrXwosf.js";
import { r as dispatchGatewayMethodInProcess } from "./server-plugins-Dw5hvH9r.js";
import { S as deleteSubagentSessionForCleanup, _ as readLatestSubagentOutputWithRetry, b as waitForSubagentRunOutcome, d as applySubagentWaitOutcome, f as buildChildCompletionFindings, g as filterCurrentDirectChildCompletionRows, h as dedupeLatestChildCompletionRows, i as terminateAcceptedCollectorRun, p as buildCompactAnnounceStatsLine, v as readSubagentOutput, y as readSubagentTimeoutProgress } from "./subagent-spawn-cleanup-CeLRHtIi.js";
import { a as resolveSubagentAnnounceTimeoutMs, c as resolveSubagentCompletionOrigin, i as loadSessionEntryByKey, o as runAnnounceDeliveryWithRetry, r as loadRequesterSessionEntry, s as resolveAnnounceOrigin, t as deliverSubagentAnnouncement, u as formatAgentInternalEventsForPrompt } from "./subagent-announce-delivery-CmKxHjJp.js";
//#region src/agents/subagent-announce.ts
/**
* Subagent completion announcement coordinator.
*
* Captures child output, applies wait outcomes, routes announcements, and performs cleanup decisions.
*/
const defaultSubagentAnnounceDeps = {
	callGateway,
	dispatchGatewayMethodInProcess,
	getRuntimeConfig,
	loadSubagentRegistryRuntime
};
let subagentAnnounceDeps = defaultSubagentAnnounceDeps;
const subagentRegistryRuntimeLoader = createLazyImportLoader(() => import("./subagent-registry-runtime-CE-urzZ0.js"));
function loadSubagentRegistryRuntime() {
	return subagentRegistryRuntimeLoader.load();
}
function buildAnnounceReplyInstruction(params) {
	if (params.requesterIsSubagent) return `Convert this completion into a concise internal orchestration update for your parent agent in your own words. Keep this internal context private (don't mention system/log/stats/session details or announce type). If this result is duplicate or no update is needed, reply ONLY: ${SILENT_REPLY_TOKEN}.`;
	if (params.expectsCompletionMessage) return `A completed ${params.announceType} is ready for parent review. Review/verify the result above before deciding whether the original task is done. If additional action is required, continue the task or record a follow-up; otherwise send a truthful user-facing update. Keep this internal context private (don't mention system/log/stats/session details or announce type). Reply ONLY: ${SILENT_REPLY_TOKEN} only when this exact result is already visible to the user in this same turn.`;
	return `A completed ${params.announceType} is ready for parent review. Review/verify the result above before deciding whether the original task is done. If additional action is required, continue the task or record a follow-up; otherwise send a truthful user-facing update. Keep this internal context private (don't mention system/log/stats/session details or announce type), and do not copy the internal event text verbatim. Reply ONLY: ${SILENT_REPLY_TOKEN} if this exact result was already delivered to the user in this same turn.`;
}
function buildAnnounceSteerMessage(events) {
	return formatAgentInternalEventsForPrompt(events) || "A background task finished. Process the completion update now.";
}
function hasUsableSessionEntry(entry) {
	if (!isRecord(entry)) return false;
	const sessionId = entry.sessionId;
	return typeof sessionId !== "string" || sessionId.trim() !== "";
}
function buildDescendantWakeMessage(params) {
	return [
		"[Subagent Context] Your prior run ended while waiting for descendant subagent completions.",
		"[Subagent Context] All pending descendants for that run have now settled.",
		"[Subagent Context] Continue your workflow using these results. Spawn more subagents if needed, otherwise send your final answer.",
		"",
		`Task: ${params.taskLabel}`,
		"",
		params.findings
	].join("\n");
}
const WAKE_RUN_SUFFIX = ":wake";
function stripWakeRunSuffixes(runId) {
	let next = runId.trim();
	while (next.endsWith(WAKE_RUN_SUFFIX)) next = next.slice(0, -5);
	return next || runId.trim();
}
function isWakeContinuationRun(runId) {
	const trimmed = runId.trim();
	if (!trimmed) return false;
	return stripWakeRunSuffixes(trimmed) !== trimmed;
}
function stripAndClassifyReply(text) {
	let result = text;
	let didStrip = false;
	const hasLeadingSilentToken = startsWithSilentToken(result, SILENT_REPLY_TOKEN);
	if (hasLeadingSilentToken) {
		result = stripLeadingSilentToken(result, SILENT_REPLY_TOKEN);
		didStrip = true;
	}
	if (hasLeadingSilentToken || result.toLowerCase().includes("NO_REPLY".toLowerCase())) {
		result = stripSilentToken(result, SILENT_REPLY_TOKEN);
		didStrip = true;
	}
	if (didStrip && (!result.trim() || isSilentReplyText(result, "NO_REPLY") || isAnnounceSkip(result))) return null;
	return result;
}
async function wakeSubagentRunAfterDescendants(params) {
	if (params.signal?.aborted || !params.isChildSessionEffectsAllowed()) return false;
	const childEntry = loadSessionEntryByKey(params.childSessionKey);
	if (!hasUsableSessionEntry(childEntry)) return false;
	const announceTimeoutMs = resolveSubagentAnnounceTimeoutMs(subagentAnnounceDeps.getRuntimeConfig());
	const wakeLifecycleGeneration = getAgentEventLifecycleGeneration();
	const wakeMessage = buildDescendantWakeMessage({
		findings: params.findings,
		taskLabel: params.taskLabel
	});
	let wakeRunId;
	try {
		wakeRunId = normalizeOptionalString((await runAnnounceDeliveryWithRetry({
			operation: "descendant wake agent call",
			signal: params.signal,
			run: async () => {
				if (!params.isChildSessionEffectsAllowed()) return {};
				return await subagentAnnounceDeps.dispatchGatewayMethodInProcess("agent", {
					sessionKey: params.childSessionKey,
					message: wakeMessage,
					deliver: false,
					inputProvenance: {
						kind: "inter_session",
						sourceSessionKey: params.childSessionKey,
						sourceChannel: "webchat",
						sourceTool: "subagent_announce"
					},
					idempotencyKey: buildAnnounceIdempotencyKey(`${params.announceId}:wake`)
				}, { timeoutMs: announceTimeoutMs });
			}
		}))?.runId) ?? "";
	} catch {
		return false;
	}
	if (!wakeRunId) return false;
	const terminateUnownedWake = async () => {
		await terminateAcceptedCollectorRun({
			childSessionKey: params.childSessionKey,
			gatewayRunId: wakeRunId,
			expectedSessionId: typeof childEntry.sessionId === "string" ? childEntry.sessionId.trim() || void 0 : void 0,
			expectedLifecycleRevision: typeof childEntry.lifecycleRevision === "string" ? childEntry.lifecycleRevision.trim() || void 0 : void 0,
			timeoutMs: announceTimeoutMs,
			callGateway: subagentAnnounceDeps.callGateway
		});
	};
	const { replaceSubagentRunAfterSteer } = await loadSubagentRegistryRuntime();
	if (!params.isChildSessionEffectsAllowed() || !isAgentEventLifecycleGenerationCurrent(wakeLifecycleGeneration)) {
		await terminateUnownedWake();
		return false;
	}
	const replaced = await replaceSubagentRunAfterSteer({
		previousRunId: params.runId,
		nextRunId: wakeRunId,
		lifecycleGeneration: wakeLifecycleGeneration,
		preserveFrozenResultFallback: true,
		task: wakeMessage
	});
	if (!replaced) await terminateUnownedWake();
	return replaced;
}
async function runSubagentAnnounceFlow(params) {
	let didAnnounce = false;
	const expectsCompletionMessage = params.expectsCompletionMessage === true;
	const announceType = params.announceType ?? "subagent task";
	let shouldDeleteChildSession = params.cleanup === "delete";
	const childSessionEffectsAllowed = () => params.suppressChildSessionEffects !== true && params.isChildSessionEffectsAllowed?.() !== false;
	const completionDeliveryAllowed = () => params.isCompletionDeliveryAllowed?.() !== false;
	let childSessionId;
	let childSessionLifecycleRevision;
	try {
		let targetRequesterSessionKey = params.requesterSessionKey;
		let targetRequesterOrigin = normalizeDeliveryContext(params.requesterOrigin);
		const childSessionEntry = !childSessionEffectsAllowed() ? void 0 : loadSessionEntryByKey(params.childSessionKey);
		childSessionId = typeof childSessionEntry?.sessionId === "string" && childSessionEntry.sessionId.trim() ? childSessionEntry.sessionId.trim() : void 0;
		childSessionLifecycleRevision = normalizeOptionalString(childSessionEntry?.lifecycleRevision);
		const settleTimeoutMs = Math.min(Math.max(params.timeoutMs, 1), 12e4);
		let reply = params.terminalReply?.disposition === "visible" ? params.terminalReply.text : params.terminalReply?.disposition === "silent" ? SILENT_REPLY_TOKEN : params.roundOneReply;
		let outcome = params.outcome;
		if (childSessionId && isEmbeddedAgentRunActive(childSessionId)) {
			if (!await waitForEmbeddedAgentRunEnd(childSessionId, settleTimeoutMs) && isEmbeddedAgentRunActive(childSessionId)) {
				shouldDeleteChildSession = false;
				if (outcome?.status !== "timeout" || params.cleanup === "delete") return false;
			}
		}
		if (!reply && params.waitForCompletion !== false) {
			const applied = applySubagentWaitOutcome({
				wait: await waitForSubagentRunOutcome(params.childRunId, settleTimeoutMs),
				outcome,
				startedAt: params.startedAt,
				endedAt: params.endedAt
			});
			outcome = applied.outcome;
			params.startedAt = applied.startedAt;
			params.endedAt = applied.endedAt;
		}
		if (!outcome) outcome = { status: "unknown" };
		const failedTerminalOutcome = outcome.status === "error";
		const allowFailedOutputCapture = !failedTerminalOutcome || !params.roundOneReply && !params.fallbackReply;
		if (failedTerminalOutcome && !params.terminalReply) reply = void 0;
		let requesterDepth = getSubagentDepthFromSessionStore(targetRequesterSessionKey);
		const requesterIsInternalSession = () => requesterDepth >= 1 || isCronSessionKey(targetRequesterSessionKey);
		let childCompletionFindings;
		let subagentRegistryRuntime;
		try {
			subagentRegistryRuntime = await subagentAnnounceDeps.loadSubagentRegistryRuntime();
			if (requesterDepth >= 1 && subagentRegistryRuntime.shouldIgnorePostCompletionAnnounceForSession(targetRequesterSessionKey)) return true;
			if ((!childSessionEffectsAllowed() ? 0 : Math.max(0, subagentRegistryRuntime.countPendingDescendantRuns(params.childSessionKey))) > 0 && announceType !== "cron job") {
				shouldDeleteChildSession = false;
				return false;
			}
			if (childSessionEffectsAllowed() && typeof subagentRegistryRuntime.listSubagentRunsForRequester === "function") {
				const directChildren = subagentRegistryRuntime.listSubagentRunsForRequester(params.childSessionKey, { requesterRunId: params.childRunId });
				if (Array.isArray(directChildren) && directChildren.length > 0) childCompletionFindings = buildChildCompletionFindings(dedupeLatestChildCompletionRows(filterCurrentDirectChildCompletionRows(directChildren, {
					requesterSessionKey: params.childSessionKey,
					getLatestSubagentRunByChildSessionKey: subagentRegistryRuntime.getLatestSubagentRunByChildSessionKey
				})));
			}
		} catch {}
		const announceId = buildAnnounceIdFromChildRun({
			childSessionKey: params.childSessionKey,
			childRunId: params.childRunId
		});
		const childRunAlreadyWoken = isWakeContinuationRun(params.childRunId);
		if (params.wakeOnDescendantSettle === true && childSessionEffectsAllowed() && childCompletionFindings?.trim() && !childRunAlreadyWoken) {
			const wakeAnnounceId = buildAnnounceIdFromChildRun({
				childSessionKey: params.childSessionKey,
				childRunId: stripWakeRunSuffixes(params.childRunId)
			});
			if (await wakeSubagentRunAfterDescendants({
				runId: params.childRunId,
				childSessionKey: params.childSessionKey,
				taskLabel: params.label || params.task || "task",
				findings: childCompletionFindings,
				announceId: wakeAnnounceId,
				isChildSessionEffectsAllowed: childSessionEffectsAllowed,
				signal: params.signal
			})) {
				shouldDeleteChildSession = false;
				return true;
			}
		}
		if (!childCompletionFindings) {
			if (params.terminalReply?.disposition === "silent") return true;
			if (params.terminalReply?.disposition === "empty" && outcome.status === "timeout") {
				const timeoutProgress = await readSubagentTimeoutProgress(params.childSessionKey, params.timeoutMs, outcome);
				if (timeoutProgress) reply = stripAndClassifyReply(timeoutProgress) ?? void 0;
			}
			if (!params.terminalReply) {
				const fallbackReply = failedTerminalOutcome ? void 0 : normalizeOptionalString(params.fallbackReply);
				const fallbackIsSilent = Boolean(fallbackReply) && (isAnnounceSkip(fallbackReply) || isSilentReplyText(fallbackReply, "NO_REPLY"));
				if (childSessionEffectsAllowed() && !reply && allowFailedOutputCapture) reply = await readSubagentOutput(params.childSessionKey, outcome);
				if (childSessionEffectsAllowed() && !reply?.trim() && allowFailedOutputCapture) reply = await readLatestSubagentOutputWithRetry({
					sessionKey: params.childSessionKey,
					maxWaitMs: params.timeoutMs,
					outcome
				});
				if (!reply?.trim() && fallbackReply && !fallbackIsSilent) reply = fallbackReply;
				if (outcome?.status === "timeout" && reply?.trim() && params.waitForCompletion !== false) try {
					const applied = applySubagentWaitOutcome({
						wait: await waitForSubagentRunOutcome(params.childRunId, 0),
						outcome,
						startedAt: params.startedAt,
						endedAt: params.endedAt
					});
					outcome = applied.outcome;
					params.startedAt = applied.startedAt;
					params.endedAt = applied.endedAt;
				} catch {}
				if (isAnnounceSkip(reply) || isSilentReplyText(reply, "NO_REPLY")) if (fallbackReply && !fallbackIsSilent) {
					const cleaned = stripAndClassifyReply(fallbackReply);
					if (cleaned === null) {
						if (isAnnounceSkip(reply) && isCronSessionKey(targetRequesterSessionKey)) logWarn(`cron job completion for session=${targetRequesterSessionKey} run=${params.childRunId} suppressed by ANNOUNCE_SKIP; the agent replied with the skip sentinel instead of delivering a result`);
						return true;
					}
					reply = cleaned;
				} else {
					if (isAnnounceSkip(reply) && isCronSessionKey(targetRequesterSessionKey)) logWarn(`cron job completion for session=${targetRequesterSessionKey} run=${params.childRunId} suppressed by ANNOUNCE_SKIP; the agent replied with the skip sentinel instead of delivering a result`);
					return true;
				}
				else if (reply) {
					const cleaned = stripAndClassifyReply(reply);
					if (cleaned === null) if (fallbackReply && !fallbackIsSilent) {
						const cleanedFallback = stripAndClassifyReply(fallbackReply);
						if (cleanedFallback === null) return true;
						reply = cleanedFallback;
					} else return true;
					else reply = cleaned;
				}
			}
		}
		if (!outcome) outcome = { status: "unknown" };
		if (!childSessionEffectsAllowed()) {
			childCompletionFindings = void 0;
			reply = params.roundOneReply ?? params.fallbackReply;
			outcome = params.outcome ?? { status: "unknown" };
		}
		const statusLabel = outcome.status === "ok" ? "completed; ready for parent review" : outcome.status === "timeout" ? "timed out" : outcome.status === "error" ? `failed: ${outcome.error || "unknown error"}` : "finished with unknown status";
		const taskLabel = params.label || params.task || "task";
		const announceSessionId = childSessionEffectsAllowed() ? childSessionId || "unknown" : "unknown";
		const findings = childCompletionFindings || reply || "(no output)";
		let requesterIsSubagent = requesterIsInternalSession();
		if (requesterIsSubagent) {
			const { isSubagentSessionRunActive, resolveRequesterForChildSession, shouldIgnorePostCompletionAnnounceForSession } = subagentRegistryRuntime ?? await loadSubagentRegistryRuntime();
			if (!isSubagentSessionRunActive(targetRequesterSessionKey)) {
				if (shouldIgnorePostCompletionAnnounceForSession(targetRequesterSessionKey)) return true;
				if (!hasUsableSessionEntry(loadSessionEntryByKey(targetRequesterSessionKey))) {
					const fallback = resolveRequesterForChildSession(targetRequesterSessionKey);
					if (!fallback?.requesterSessionKey) {
						shouldDeleteChildSession = false;
						return false;
					}
					targetRequesterSessionKey = fallback.requesterSessionKey;
					targetRequesterOrigin = normalizeDeliveryContext(fallback.requesterOrigin) ?? targetRequesterOrigin;
					requesterDepth = getSubagentDepthFromSessionStore(targetRequesterSessionKey);
					requesterIsSubagent = requesterIsInternalSession();
				}
			}
		}
		const replyInstruction = buildAnnounceReplyInstruction({
			requesterIsSubagent,
			announceType,
			expectsCompletionMessage
		});
		const candidateStatsLine = !childSessionEffectsAllowed() ? void 0 : await buildCompactAnnounceStatsLine({
			sessionKey: params.childSessionKey,
			startedAt: params.startedAt,
			endedAt: params.endedAt
		});
		const statsLine = childSessionEffectsAllowed() ? candidateStatsLine : void 0;
		const internalEvents = [{
			type: "task_completion",
			source: announceType === "cron job" ? "cron" : "subagent",
			childSessionKey: params.childSessionKey,
			childSessionId: announceSessionId,
			announceType,
			taskLabel,
			status: outcome.status,
			statusLabel,
			result: findings,
			statsLine,
			replyInstruction
		}];
		const triggerMessage = buildAnnounceSteerMessage(internalEvents);
		let directOrigin = targetRequesterOrigin;
		if (!requesterIsSubagent) {
			const { entry } = loadRequesterSessionEntry(targetRequesterSessionKey);
			directOrigin = resolveAnnounceOrigin(entry, targetRequesterOrigin);
		}
		const candidateCompletionDirectOrigin = expectsCompletionMessage && !requesterIsSubagent ? !childSessionEffectsAllowed() ? targetRequesterOrigin : await resolveSubagentCompletionOrigin({
			childSessionKey: params.childSessionKey,
			requesterSessionKey: targetRequesterSessionKey,
			requesterOrigin: directOrigin,
			childRunId: params.childRunId,
			spawnMode: params.spawnMode,
			expectsCompletionMessage
		}) : targetRequesterOrigin;
		const completionDirectOrigin = childSessionEffectsAllowed() ? candidateCompletionDirectOrigin : targetRequesterOrigin;
		const directIdempotencyKey = buildAnnounceIdempotencyKey(announceId);
		let deliveryResultReported = false;
		const reportDeliveryResult = (delivery) => {
			if (deliveryResultReported) return;
			deliveryResultReported = true;
			params.onDeliveryResult?.(delivery);
		};
		const delivery = await deliverSubagentAnnouncement({
			requesterSessionKey: targetRequesterSessionKey,
			announceId,
			triggerMessage,
			steerMessage: triggerMessage,
			internalEvents,
			summaryLine: taskLabel,
			requesterSessionOrigin: targetRequesterOrigin,
			requesterOrigin: expectsCompletionMessage && !requesterIsSubagent ? completionDirectOrigin : targetRequesterOrigin,
			completionDirectOrigin,
			directOrigin,
			sourceSessionKey: params.childSessionKey,
			sourceRunId: params.childRunId,
			sourceChannel: INTERNAL_MESSAGE_CHANNEL,
			sourceTool: "subagent_announce",
			isSourceSessionEffectsAllowed: completionDeliveryAllowed,
			isCompletionOwnedByRequesterYield: params.isCompletionOwnedByRequesterYield,
			targetRequesterSessionKey,
			requesterIsSubagent,
			expectsCompletionMessage,
			bestEffortDeliver: params.bestEffortDeliver,
			directIdempotencyKey,
			onDeliveryResult: reportDeliveryResult,
			signal: params.signal
		});
		reportDeliveryResult(delivery);
		didAnnounce = delivery.delivered || delivery.disposition === "intentional_non_delivery";
		if (!delivery.delivered && delivery.path === "direct" && delivery.error) defaultRuntime.log(`[warn] Subagent completion direct announce failed for run ${params.childRunId}: ${delivery.error}`);
	} catch (err) {
		defaultRuntime.error?.(`Subagent announce failed: ${String(err)}`);
	} finally {
		if (shouldDeleteChildSession && childSessionEffectsAllowed() && (params.onBeforeDeleteChildSession?.() ?? true)) await deleteSubagentSessionForCleanup({
			callGateway: subagentAnnounceDeps.callGateway,
			childSessionKey: params.childSessionKey,
			spawnMode: params.spawnMode,
			expectedSessionId: childSessionId,
			expectedLifecycleRevision: childSessionLifecycleRevision
		});
	}
	return didAnnounce;
}
const testing = { setDepsForTest(overrides) {
	const callGatewayOverride = overrides?.callGateway;
	const dispatchGatewayMethodInProcessOverride = overrides?.dispatchGatewayMethodInProcess ?? (callGatewayOverride ? (async (method, agentParams, options) => await callGatewayOverride({
		method,
		params: agentParams,
		expectFinal: options?.expectFinal,
		timeoutMs: options?.timeoutMs
	})) : void 0);
	subagentAnnounceDeps = overrides ? {
		...defaultSubagentAnnounceDeps,
		...overrides,
		...dispatchGatewayMethodInProcessOverride ? { dispatchGatewayMethodInProcess: dispatchGatewayMethodInProcessOverride } : {}
	} : defaultSubagentAnnounceDeps;
} };
//#endregion
export { runSubagentAnnounceFlow as n, testing as r, hasUsableSessionEntry as t };
