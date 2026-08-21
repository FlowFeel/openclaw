import { t as createSubsystemLogger } from "./subsystem-Ess1Ww-N.js";
import { m as runWithGatewayIndependentRootWorkAdmission } from "./gateway-work-admission-BaRJo64l.js";
import "./sessions-CxWGGmnA.js";
import { t as SessionManager } from "./session-manager-Dn9JwolR.js";
import { t as resolveSkillWorkshopConfig } from "./config-DFolTFBo.js";
import { n as formatSkillExperienceReviewTranscript, t as buildSkillExperienceReviewPrompt } from "./experience-review-prompt-BzoC3cDN.js";
import { t as autoApplySkillProposal } from "./auto-apply-zKASRVGN.js";
import { randomUUID } from "node:crypto";
//#region src/skills/workshop/experience-review.ts
const EXPERIENCE_REVIEW_MIN_MODEL_ITERATIONS = 10;
const EXPERIENCE_REVIEW_IDLE_MS = 3e4;
const EXPERIENCE_REVIEW_RETRY_IDLE_MS = 3e4;
const EXPERIENCE_REVIEW_TIMEOUT_MS = 12e4;
const EXPERIENCE_REVIEW_MAX_PENDING = 32;
const EXPERIENCE_REVIEW_SESSION_SEGMENT = "skill-workshop-review";
const EXPERIENCE_REVIEW_BLOCKED_TRIGGERS = /* @__PURE__ */ new Set([
	"cron",
	"heartbeat",
	"memory",
	"overflow"
]);
const EXPERIENCE_REVIEW_BLOCKED_SESSION_SEGMENTS = /* @__PURE__ */ new Set([
	"cron",
	"hook",
	"subagent",
	EXPERIENCE_REVIEW_SESSION_SEGMENT
]);
const log = createSubsystemLogger("skills/workshop");
function isAuthProfileMigrationRequiredError(error) {
	return typeof error === "object" && error !== null && error.code === "AUTH_PROFILE_MIGRATION_REQUIRED";
}
function isEligibleContext(ctx) {
	if (ctx.compacted === true || ctx.skillWorkshopAvailable !== true || !ctx.modelProviderId?.trim() || !ctx.modelId?.trim()) return false;
	const trigger = ctx.trigger?.trim().toLowerCase();
	if (trigger && EXPERIENCE_REVIEW_BLOCKED_TRIGGERS.has(trigger)) return false;
	const sessionKey = ctx.sessionKey?.trim().toLowerCase();
	if (!sessionKey || sessionKey.includes("active-memory")) return false;
	return !sessionKey.split(":").some((segment) => EXPERIENCE_REVIEW_BLOCKED_SESSION_SEGMENTS.has(segment));
}
function currentTurnMessages(messages) {
	for (let index = messages.length - 1; index >= 0; index -= 1) {
		const message = messages[index];
		if (message && typeof message === "object" && !Array.isArray(message) && message.role === "user") return messages.slice(index);
	}
	return messages;
}
function countModelIterations(messages) {
	return messages.reduce((count, message) => {
		if (!message || typeof message !== "object" || Array.isArray(message)) return count;
		return count + (message.role === "assistant" ? 1 : 0);
	}, 0);
}
async function prepareSkillExperienceReviewCandidate(candidate, config) {
	if (resolveSkillWorkshopConfig(config).autonomous.mode === "off") return;
	const { resolveConversationCapabilityProfile } = await import("./agents/conversation-capability-profile.js");
	const { resolveSandboxRuntimeStatus } = await import("./sandbox-CpNceFhp.js");
	const { isToolAllowedByPolicies } = await import("./tool-policy-match-B_siZxT4.js");
	const { mergeAlsoAllowPolicy } = await import("./tool-policy-DNQGYh7t.js");
	const sessionKey = candidate.ctx.sessionKey;
	if (!sessionKey || resolveSandboxRuntimeStatus({
		cfg: config,
		sessionKey
	}).sandboxed) return;
	const capabilityProfile = resolveConversationCapabilityProfile({
		config,
		sessionKey,
		sandboxSessionKey: sessionKey,
		agentId: candidate.ctx.agentId,
		agentAccountId: candidate.ctx.agentAccountId,
		messageProvider: candidate.ctx.messageProvider,
		messageChannel: candidate.ctx.messageChannel,
		chatType: candidate.ctx.chatType,
		groupId: candidate.ctx.groupId,
		groupChannel: candidate.ctx.groupChannel,
		groupSpace: candidate.ctx.groupSpace,
		memberRoleIds: candidate.ctx.memberRoleIds,
		spawnedBy: candidate.ctx.spawnedBy,
		senderId: candidate.ctx.senderId,
		senderName: candidate.ctx.senderName,
		senderUsername: candidate.ctx.senderUsername,
		senderE164: candidate.ctx.senderE164,
		senderIsOwner: candidate.ctx.senderIsOwner,
		modelProvider: candidate.ctx.modelProviderId,
		modelId: candidate.ctx.modelId,
		workspaceDir: candidate.ctx.workspaceDir
	});
	if (!isToolAllowedByPolicies("skill_workshop", [
		mergeAlsoAllowPolicy(capabilityProfile.policy.profilePolicy, capabilityProfile.policy.profileAlsoAllow),
		mergeAlsoAllowPolicy(capabilityProfile.policy.providerProfilePolicy, capabilityProfile.policy.providerProfileAlsoAllow),
		capabilityProfile.policy.globalPolicy,
		capabilityProfile.policy.globalProviderPolicy,
		capabilityProfile.policy.agentPolicy,
		capabilityProfile.policy.agentProviderPolicy,
		capabilityProfile.policy.groupPolicy,
		capabilityProfile.policy.senderPolicy,
		capabilityProfile.policy.subagentPolicy,
		capabilityProfile.policy.inheritedToolPolicy
	])) return;
	return {
		...candidate,
		config
	};
}
function createSkillExperienceReviewScheduler(deps) {
	const pendingBySession = /* @__PURE__ */ new Map();
	let reviewInFlight = false;
	const setTimer = deps.setTimer ?? ((callback, delayMs) => setTimeout(callback, delayMs));
	const clearTimer = deps.clearTimer ?? clearTimeout;
	const arm = (sessionKey, pending, delayMs) => {
		if (pending.timer) clearTimer(pending.timer);
		const generation = ++pending.generation;
		const timer = setTimer(() => {
			if (pendingBySession.get(sessionKey) !== pending || pending.generation !== generation) return;
			pending.timer = void 0;
			Promise.resolve(deps.isSystemActive()).then(async (active) => {
				if (pendingBySession.get(sessionKey) !== pending || pending.generation !== generation) return;
				if (active) {
					arm(sessionKey, pending, EXPERIENCE_REVIEW_RETRY_IDLE_MS);
					return;
				}
				if (reviewInFlight) {
					arm(sessionKey, pending, EXPERIENCE_REVIEW_RETRY_IDLE_MS);
					return;
				}
				reviewInFlight = true;
				try {
					const candidate = deps.prepareReview ? await deps.prepareReview(pending.candidate) : pending.candidate;
					if (!candidate) {
						pendingBySession.delete(sessionKey);
						return;
					}
					if (pendingBySession.get(sessionKey) !== pending || pending.generation !== generation) return;
					await deps.runReview(candidate);
					if (pendingBySession.get(sessionKey) === pending && pending.generation === generation) pendingBySession.delete(sessionKey);
				} finally {
					reviewInFlight = false;
				}
			}).catch((error) => {
				log.warn(`skill experience review failed: ${String(error)}`);
				if (isAuthProfileMigrationRequiredError(error)) {
					if (pendingBySession.get(sessionKey) === pending && pending.generation === generation) pendingBySession.delete(sessionKey);
					return;
				}
				if (pendingBySession.get(sessionKey) === pending && pending.generation === generation) arm(sessionKey, pending, EXPERIENCE_REVIEW_RETRY_IDLE_MS);
			});
		}, delayMs);
		pending.timer = timer;
		timer.unref?.();
	};
	return {
		schedule(params) {
			const sessionKey = params.ctx.sessionKey?.trim();
			if (!sessionKey) return;
			const existing = pendingBySession.get(sessionKey);
			const errored = typeof params.event.error === "string" && params.event.error.trim() !== "";
			if (existing && errored && params.ctx.runId?.trim() && params.ctx.runId === existing.candidate.ctx.runId) {
				if (existing.timer) clearTimer(existing.timer);
				pendingBySession.delete(sessionKey);
				return;
			}
			if (existing) arm(sessionKey, existing, EXPERIENCE_REVIEW_IDLE_MS);
			if (errored) {
				log.debug(`experience review skipped: reason=errored-completion session=${sessionKey}`);
				return;
			}
			if (resolveSkillWorkshopConfig(params.config).autonomous.mode === "off") return;
			if (!isEligibleContext(params.ctx)) {
				log.debug(`experience review skipped: reason=ineligible-context session=${sessionKey}`);
				return;
			}
			const workspaceDir = params.ctx.workspaceDir?.trim();
			if (!workspaceDir) {
				log.debug(`experience review skipped: reason=missing-workspace session=${sessionKey}`);
				return;
			}
			const turnMessages = currentTurnMessages(params.event.messages);
			const reportedModelIterations = params.ctx.modelIterations;
			const modelIterations = reportedModelIterations === void 0 ? countModelIterations(turnMessages) : Number.isSafeInteger(reportedModelIterations) && reportedModelIterations >= 0 ? reportedModelIterations : 0;
			if (modelIterations >= EXPERIENCE_REVIEW_MIN_MODEL_ITERATIONS) {
				if (!existing && pendingBySession.size >= EXPERIENCE_REVIEW_MAX_PENDING) {
					const oldest = pendingBySession.entries().next().value;
					if (oldest) {
						if (oldest[1].timer) clearTimer(oldest[1].timer);
						pendingBySession.delete(oldest[0]);
					}
				}
				const candidate = {
					ctx: {
						agentId: params.ctx.agentId,
						runId: params.ctx.runId,
						sessionKey,
						sessionId: params.ctx.sessionId,
						workspaceDir,
						modelProviderId: params.ctx.modelProviderId,
						modelId: params.ctx.modelId,
						authProfileId: params.ctx.authProfileId,
						skillWorkshopAvailable: params.ctx.skillWorkshopAvailable,
						compacted: params.ctx.compacted,
						trigger: params.ctx.trigger,
						messageChannel: params.ctx.messageChannel,
						messageProvider: params.ctx.messageProvider,
						chatType: params.ctx.chatType,
						agentAccountId: params.ctx.agentAccountId,
						groupId: params.ctx.groupId,
						groupChannel: params.ctx.groupChannel,
						groupSpace: params.ctx.groupSpace,
						memberRoleIds: params.ctx.memberRoleIds ? [...params.ctx.memberRoleIds] : void 0,
						spawnedBy: params.ctx.spawnedBy,
						senderId: params.ctx.senderId,
						senderName: params.ctx.senderName,
						senderUsername: params.ctx.senderUsername,
						senderE164: params.ctx.senderE164,
						senderIsOwner: params.ctx.senderIsOwner
					},
					...params.config ? { config: params.config } : {},
					transcript: formatSkillExperienceReviewTranscript(turnMessages),
					modelIterations,
					turnAborted: !params.event.success
				};
				const pending = existing ?? {
					candidate,
					generation: 0
				};
				pending.candidate = candidate;
				pendingBySession.set(sessionKey, pending);
				arm(sessionKey, pending, EXPERIENCE_REVIEW_IDLE_MS);
				log.debug(`experience review scheduled: session=${sessionKey} iterations=${modelIterations} aborted=${!params.event.success}`);
			} else log.debug(`experience review skipped: reason=below-depth-bar iterations=${modelIterations} session=${sessionKey}`);
		},
		clear() {
			for (const pending of pendingBySession.values()) if (pending.timer) clearTimer(pending.timer);
			pendingBySession.clear();
		}
	};
}
async function runSkillExperienceReview(candidate, deps = {}) {
	await runWithGatewayIndependentRootWorkAdmission(() => runSkillExperienceReviewInner(candidate, deps));
}
async function runSkillExperienceReviewInner(candidate, deps) {
	const workspaceDir = candidate.ctx.workspaceDir;
	const sessionKey = candidate.ctx.sessionKey;
	const modelProviderId = candidate.ctx.modelProviderId?.trim();
	const modelId = candidate.ctx.modelId?.trim();
	if (!workspaceDir || !sessionKey || !modelProviderId || !modelId) return;
	const sessionId = randomUUID();
	const proposalMutationBudget = { remaining: 1 };
	const reviewSessionKey = `agent:${candidate.ctx.agentId ?? "main"}:${EXPERIENCE_REVIEW_SESSION_SEGMENT}:incognito-${sessionId}`;
	const { runEmbeddedAgent } = await import("./embedded-agent-CZpATf5T.js");
	await runEmbeddedAgent({
		sessionId,
		sessionKey: reviewSessionKey,
		sandboxSessionKey: sessionKey,
		sessionManager: SessionManager.inMemory(workspaceDir),
		...candidate.ctx.agentId ? { agentId: candidate.ctx.agentId } : {},
		trigger: "manual",
		lane: "skill-workshop-review",
		messageChannel: candidate.ctx.messageChannel ?? void 0,
		messageProvider: candidate.ctx.messageProvider ?? void 0,
		...candidate.ctx.chatType ? { chatType: candidate.ctx.chatType } : {},
		...candidate.ctx.agentAccountId ? { agentAccountId: candidate.ctx.agentAccountId } : {},
		groupId: candidate.ctx.groupId,
		groupChannel: candidate.ctx.groupChannel,
		groupSpace: candidate.ctx.groupSpace,
		memberRoleIds: candidate.ctx.memberRoleIds ? [...candidate.ctx.memberRoleIds] : void 0,
		spawnedBy: candidate.ctx.spawnedBy,
		senderId: candidate.ctx.senderId,
		senderName: candidate.ctx.senderName,
		senderUsername: candidate.ctx.senderUsername,
		senderE164: candidate.ctx.senderE164,
		senderIsOwner: candidate.ctx.senderIsOwner,
		agentHarnessId: "openclaw",
		agentHarnessRuntimeOverride: "openclaw",
		workspaceDir,
		...candidate.config ? { config: candidate.config } : {},
		prompt: buildSkillExperienceReviewPrompt(candidate),
		provider: modelProviderId,
		model: modelId,
		modelSelectionLocked: true,
		modelFallbacksOverride: [],
		...candidate.ctx.authProfileId ? {
			authProfileId: candidate.ctx.authProfileId,
			authProfileIdSource: "user"
		} : {},
		timeoutMs: EXPERIENCE_REVIEW_TIMEOUT_MS,
		runId: `skill-workshop-review:${randomUUID()}`,
		toolsAllow: ["skill_workshop"],
		disableMessageTool: true,
		disableTrajectory: true,
		skillWorkshopProposalOnly: true,
		skillWorkshopAutonomousCapture: true,
		skillWorkshopProposalMutationBudget: proposalMutationBudget,
		skillWorkshopOrigin: {
			...candidate.ctx.agentId ? { agentId: candidate.ctx.agentId } : {},
			sessionKey,
			...candidate.ctx.runId ? { runId: candidate.ctx.runId } : {}
		},
		cleanupBundleMcpOnRunEnd: true,
		bootstrapContextMode: "lightweight",
		skillsSnapshot: {
			prompt: "",
			skills: []
		},
		verboseLevel: "off",
		reasoningLevel: "off",
		suppressToolErrorWarnings: true
	});
	const currentConfig = deps.getCurrentConfig ? await deps.getCurrentConfig() : (await import("./config/config.js")).getRuntimeConfig();
	if (resolveSkillWorkshopConfig(currentConfig).autonomous.mode !== "auto") return;
	const proposalIds = [...proposalMutationBudget.mutatedProposalIds ?? []];
	if (proposalIds.length === 0) return;
	const { inspectSkillProposal } = await import("./service-B7FL5loq.js");
	for (const proposalId of proposalIds) {
		const proposal = await inspectSkillProposal(proposalId, {
			workspaceDir,
			...candidate.ctx.agentId ? { agentId: candidate.ctx.agentId } : {}
		});
		if (!proposal || proposal.record.status !== "pending" || proposal.record.autonomousCapture !== true) continue;
		await autoApplySkillProposal({
			workspaceDir,
			...candidate.ctx.agentId ? { agentId: candidate.ctx.agentId } : {},
			config: currentConfig,
			proposalId,
			skillName: proposal.record.target.skillName
		});
	}
}
//#endregion
//#region src/skills/workshop/experience-review-default.ts
const defaultScheduler = createSkillExperienceReviewScheduler({
	isSystemActive: async () => {
		const [{ getActiveEmbeddedRunCount }, { getActiveReplyRunCount }] = await Promise.all([import("./runs-1nSA0FUg.js"), import("./reply-run-registry-BNoxpB8J.js")]);
		return getActiveEmbeddedRunCount() > 0 || getActiveReplyRunCount() > 0;
	},
	prepareReview: async (candidate) => {
		const { getRuntimeConfig } = await import("./config/config.js");
		return prepareSkillExperienceReviewCandidate(candidate, getRuntimeConfig());
	},
	runReview: runSkillExperienceReview
});
/** Queues a conservative, post-run learning review after the agent system becomes idle. */
function scheduleSkillExperienceReview(params) {
	defaultScheduler.schedule(params);
}
//#endregion
export { scheduleSkillExperienceReview };
