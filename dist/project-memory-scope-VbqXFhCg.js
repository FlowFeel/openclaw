import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { g as isDefaultAgentRuntimeId, i as isOpenAIProvider, v as normalizeOptionalAgentRuntimeId } from "./openai-routing-G4z6ipSe.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { t as resolveAgentHarnessPolicy } from "./policy-BxKGFISr.js";
import { n as DEFAULT_MODEL, r as DEFAULT_PROVIDER } from "./defaults-CdX9UGcX.js";
import { r as runCommandWithTimeout } from "./exec-Bcu-_3pW.js";
import "./hook-runner-global-CRNklGqK.js";
import { t as formatSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.js";
import { t as emitSessionTranscriptUpdate } from "./transcript-events-BG9Ai61T.js";
import { i as ensureAuthProfileStore, o as ensureAuthProfileStoreWithoutExternalProfiles } from "./store-BMd0T0_g.js";
import { X as parseGitUrl } from "./sessions-Cj7BqXHP.js";
import "./model-auth-D-tc_3Dn.js";
import { c as resolveAgentHarnessPreparedAuthSupport, l as resolveAgentHarnessPreparedRouteSupport } from "./thinking-runtime-93ZQ8Ibj.js";
import { r as prepareAgentRuntimeAuth } from "./prepare-auth-BxIOzOpa.js";
import { a as resolveReusableRuntimeModelAuth, r as providerUsesCredentialScopedModelMetadata } from "./credential-scoped-model-DsrKf4kx.js";
import { t as log } from "./logger-BeJ7WAxI.js";
import { m as triggerInternalHook, n as createInternalHookEvent } from "./internal-hooks-glvlO_hY.js";
import { h as resolveEmbeddedCompactionTarget, m as resolveCompactionHarnessRuntime } from "./attempt.prompt-helpers-ey3uEUB2.js";
import { c as resolveMemorySearchConfig } from "./config-utils-bVWMjALM.js";
import { c as selectAgentHarnessForPreparedModelProviders, s as selectAgentHarness } from "./selection-Y2SH9mLO.js";
import { a as resolveCompactionCheckpointTranscriptPosition, i as readSessionLeafStateFromTranscriptAsync, o as resolveSessionCompactionCheckpointReason, t as createFileBackedCompactionCheckpointStore } from "./session-compaction-checkpoints-RZwlLjEx.js";
import { i as getActiveMemorySearchManager } from "./memory-runtime-iam6N0Dd.js";
import path from "node:path";
//#region src/agents/embedded-agent-runner/compaction-checkpoint.ts
const compactionCheckpointStore = createFileBackedCompactionCheckpointStore();
async function persistCompactionCheckpoint(params) {
	if (!params.config || !params.sessionKey || !params.snapshot) return false;
	try {
		const transcriptState = await readSessionLeafStateFromTranscriptAsync(params.sessionTarget ?? params.sessionFile);
		const checkpointPosition = resolveCompactionCheckpointTranscriptPosition({
			preferredLeafId: params.leafId,
			transcriptState
		});
		return await compactionCheckpointStore.persistCheckpoint({
			cfg: params.config,
			sessionKey: params.sessionKey,
			sessionId: params.sessionId,
			reason: resolveSessionCompactionCheckpointReason({ trigger: params.trigger }),
			snapshot: params.snapshot,
			summary: params.summary,
			firstKeptEntryId: params.firstKeptEntryId,
			tokensBefore: params.tokensBefore,
			tokensAfter: params.tokensAfter,
			postSessionFile: params.sessionTarget ? formatSqliteSessionFileMarker(params.sessionTarget) : params.sessionFile,
			postLeafId: checkpointPosition.leafId,
			postEntryId: checkpointPosition.entryId,
			createdAt: params.createdAt
		}) !== null;
	} catch (err) {
		log.warn("failed to persist compaction checkpoint", { errorMessage: formatErrorMessage(err) });
		return false;
	}
}
//#endregion
//#region src/agents/embedded-agent-runner/compaction-hooks.ts
function resolvePostCompactionIndexSyncMode(config) {
	const mode = config?.agents?.defaults?.compaction?.postIndexSync;
	if (mode === "off" || mode === "async" || mode === "await") return mode;
	return "async";
}
async function runPostCompactionSessionMemorySync(params) {
	if (!params.config) return;
	try {
		const sessionFile = params.sessionFile.trim();
		if (!sessionFile) return;
		const agentId = resolveSessionAgentId({
			sessionKey: params.sessionKey,
			config: params.config,
			agentId: params.agentId
		});
		const resolvedMemory = resolveMemorySearchConfig(params.config, agentId);
		if (!resolvedMemory || !resolvedMemory.sources.includes("sessions")) return;
		if (!resolvedMemory.sync.sessions.postCompactionForce) return;
		const { manager } = await getActiveMemorySearchManager({
			cfg: params.config,
			agentId
		});
		if (!manager?.sync) return;
		const sessionId = params.sessionId?.trim();
		await manager.sync({
			reason: "post-compaction",
			...sessionId ? { sessions: [{
				agentId,
				sessionId,
				...params.sessionKey ? { sessionKey: params.sessionKey } : {}
			}] } : { archiveFiles: [sessionFile] }
		});
	} catch (err) {
		log.warn(`memory sync skipped (post-compaction): ${formatErrorMessage(err)}`);
	}
}
function syncPostCompactionSessionMemory(params) {
	if (params.mode === "off" || !params.config) return Promise.resolve();
	const syncTask = runPostCompactionSessionMemorySync({
		config: params.config,
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		agentId: params.agentId,
		sessionFile: params.sessionFile
	});
	if (params.mode === "await") return syncTask;
	return Promise.resolve();
}
/** Emits post-compaction transcript and memory-index side effects for a compacted session file. */
async function runPostCompactionSideEffects(params) {
	const sessionFile = params.sessionFile.trim();
	if (!sessionFile) return;
	emitSessionTranscriptUpdate({
		sessionFile,
		sessionKey: params.sessionKey,
		...params.sessionId ? { sessionId: params.sessionId } : {},
		...params.agentId ? { agentId: params.agentId } : {}
	});
	await syncPostCompactionSessionMemory({
		config: params.config,
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		agentId: params.agentId,
		sessionFile,
		mode: resolvePostCompactionIndexSyncMode(params.config)
	});
}
/** Converts the global hook runner into the compaction-specific hook shape. */
function asCompactionHookRunner(hookRunner) {
	if (!hookRunner) return null;
	return {
		hasHooks: (hookName) => hookRunner.hasHooks?.(hookName) ?? false,
		runBeforeCompaction: hookRunner.runBeforeCompaction?.bind(hookRunner),
		runAfterCompaction: hookRunner.runAfterCompaction?.bind(hookRunner)
	};
}
function estimateTokenCountSafe(messages, estimateTokensFn) {
	try {
		let total = 0;
		for (const message of messages) total += estimateTokensFn(message);
		return total;
	} catch {
		return;
	}
}
/** Builds before-hook metrics while tolerating providers that cannot estimate all messages. */
function buildBeforeCompactionHookMetrics(params) {
	return {
		messageCountOriginal: params.originalMessages.length,
		tokenCountOriginal: estimateTokenCountSafe(params.originalMessages, params.estimateTokensFn),
		messageCountBefore: params.currentMessages.length,
		tokenCountBefore: params.observedTokenCount ?? estimateTokenCountSafe(params.currentMessages, params.estimateTokensFn)
	};
}
/** Runs internal and plugin before-compaction hooks, forwarding hook-produced messages. */
async function runBeforeCompactionHooks(params) {
	const missingSessionKey = !params.sessionKey || !params.sessionKey.trim();
	const hookSessionKey = params.sessionKey?.trim() || params.sessionId;
	try {
		const hookEvent = createInternalHookEvent("session", "compact:before", hookSessionKey, {
			sessionId: params.sessionId,
			missingSessionKey,
			messageCount: params.metrics.messageCountBefore,
			tokenCount: params.metrics.tokenCountBefore,
			messageCountOriginal: params.metrics.messageCountOriginal,
			tokenCountOriginal: params.metrics.tokenCountOriginal
		});
		await triggerInternalHook(hookEvent);
		if (hookEvent.messages.length > 0) await params.onHookMessages?.({
			phase: "before",
			messages: hookEvent.messages.slice(),
			sessionId: params.sessionId,
			sessionKey: hookSessionKey
		});
	} catch (err) {
		log.warn("session:compact:before hook failed", {
			errorMessage: formatErrorMessage(err),
			errorStack: err instanceof Error ? err.stack : void 0
		});
	}
	if (params.hookRunner?.hasHooks?.("before_compaction")) try {
		await params.hookRunner.runBeforeCompaction?.({
			messageCount: params.metrics.messageCountBefore,
			tokenCount: params.metrics.tokenCountBefore
		}, {
			sessionId: params.sessionId,
			agentId: params.sessionAgentId,
			sessionKey: hookSessionKey,
			workspaceDir: params.workspaceDir,
			messageProvider: params.messageProvider
		});
	} catch (err) {
		log.warn("before_compaction hook failed", {
			errorMessage: formatErrorMessage(err),
			errorStack: err instanceof Error ? err.stack : void 0
		});
	}
	return {
		hookSessionKey,
		missingSessionKey
	};
}
/** Estimates compacted-session token count and rejects impossible growth from stale estimates. */
function estimateTokensAfterCompaction(params) {
	const tokensAfter = estimateTokenCountSafe(params.messagesAfter, params.estimateTokensFn);
	if (tokensAfter === void 0) return;
	const sanityCheckBaseline = params.observedTokenCount ?? params.fullSessionTokensBefore;
	if (sanityCheckBaseline > 0 && tokensAfter > (params.observedTokenCount !== void 0 ? sanityCheckBaseline : sanityCheckBaseline * 1.1)) return;
	return tokensAfter;
}
/** Runs internal and plugin after-compaction hooks with the final compacted metrics. */
async function runAfterCompactionHooks(params) {
	try {
		const hookEvent = createInternalHookEvent("session", "compact:after", params.hookSessionKey, {
			sessionId: params.sessionId,
			missingSessionKey: params.missingSessionKey,
			messageCount: params.messageCountAfter,
			tokenCount: params.tokensAfter,
			compactedCount: params.compactedCount,
			summaryLength: params.summaryLength,
			tokensBefore: params.tokensBefore,
			tokensAfter: params.tokensAfter,
			firstKeptEntryId: params.firstKeptEntryId
		});
		await triggerInternalHook(hookEvent);
		if (hookEvent.messages.length > 0) await params.onHookMessages?.({
			phase: "after",
			messages: hookEvent.messages.slice(),
			sessionId: params.sessionId,
			sessionKey: params.hookSessionKey
		});
	} catch (err) {
		log.warn("session:compact:after hook failed", {
			errorMessage: formatErrorMessage(err),
			errorStack: err instanceof Error ? err.stack : void 0
		});
	}
	if (params.hookRunner?.hasHooks?.("after_compaction")) try {
		await params.hookRunner.runAfterCompaction?.({
			messageCount: params.messageCountAfter,
			tokenCount: params.tokensAfter,
			compactedCount: params.compactedCount,
			sessionFile: params.sessionFile,
			...params.previousSessionId ? { previousSessionId: params.previousSessionId } : {}
		}, {
			sessionId: params.sessionId,
			agentId: params.sessionAgentId,
			sessionKey: params.hookSessionKey,
			workspaceDir: params.workspaceDir,
			messageProvider: params.messageProvider
		});
	} catch (err) {
		log.warn("after_compaction hook failed", {
			errorMessage: formatErrorMessage(err),
			errorStack: err instanceof Error ? err.stack : void 0
		});
	}
}
//#endregion
//#region src/agents/embedded-agent-runner/compaction-runtime-preparation.ts
/** Resolves the shared policy, target, and harness ownership for either compaction entry point. */
function resolveCompactionRuntimeSelection(params) {
	const runtimePolicySessionKey = params.sandboxSessionKey ?? params.sessionKey ?? void 0;
	const runtimePolicyAgentId = params.sandboxSessionKey && parseAgentSessionKey(params.sandboxSessionKey) ? void 0 : params.agentId;
	const policyTarget = resolveEmbeddedCompactionTarget({
		config: params.config,
		provider: params.provider,
		modelId: params.modelId,
		authProfileId: params.authProfileId,
		modelSelectionLocked: params.modelSelectionLocked,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL
	});
	const policyProvider = policyTarget.provider ?? "openai";
	const policyModelId = policyTarget.model ?? "gpt-5.6-sol";
	const policy = resolveAgentHarnessPolicy({
		provider: policyProvider,
		modelId: policyModelId,
		config: params.config,
		agentId: runtimePolicyAgentId,
		sessionKey: runtimePolicySessionKey
	});
	const configuredHarnessRuntime = policy.runtimeSource && policy.runtimeSource !== "implicit" && !isDefaultAgentRuntimeId(policy.runtime) ? policy.runtime : void 0;
	const boundHarnessRuntime = normalizeOptionalAgentRuntimeId(params.boundHarnessRuntime);
	const selectedHarnessRuntime = params.selectedHarnessRuntime ?? resolveCompactionHarnessRuntime({
		boundHarnessRuntime,
		preparedRuntimePlan: params.preparedRuntimePlan,
		configuredHarnessRuntime,
		provider: policyProvider,
		modelId: policyModelId
	});
	const target = resolveEmbeddedCompactionTarget({
		config: params.config,
		provider: params.provider,
		modelId: params.modelId,
		authProfileId: params.authProfileId,
		harnessRuntime: selectedHarnessRuntime,
		modelSelectionLocked: params.modelSelectionLocked,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL
	});
	const provider = target.provider ?? "openai";
	const modelId = target.model ?? "gpt-5.6-sol";
	return {
		runtimePolicySessionKey,
		runtimePolicyAgentId,
		boundHarnessRuntime,
		selectedHarnessRuntime,
		selectedHarnessRuntimeOverride: boundHarnessRuntime ? void 0 : selectedHarnessRuntime,
		target,
		runtimeModelAuth: resolveReusableRuntimeModelAuth({
			plan: params.runtimeAuthPlan ?? params.preparedRuntimePlan?.auth,
			provider,
			modelId,
			authProfileId: target.authProfileId
		}),
		provider,
		runtimeProvider: target.runtimeProvider ?? provider,
		contextConfigProvider: target.contextProvider ?? provider,
		modelId
	};
}
function buildCompactionHarnessModelProvider(params) {
	const route = params.plan?.modelRoute;
	return {
		api: route?.api ?? params.model?.api,
		baseUrl: route?.baseUrl ?? params.model?.baseUrl,
		...resolveAgentHarnessPreparedRouteSupport(params.plan),
		...params.plan ? { preparedAuth: resolveAgentHarnessPreparedAuthSupport({
			plan: params.plan,
			source: params.attempt?.kind === "implicit" ? void 0 : params.attempt?.kind
		}) } : {}
	};
}
/** Prepares one ordered auth-attempt set and converges it on a single compaction harness. */
async function prepareCompactionHarnessAuth(params) {
	const runtimeAuthProfileStore = isOpenAIProvider(params.provider) ? ensureAuthProfileStore(params.agentDir, {
		externalCliProviderIds: ["openai"],
		allowKeychainPrompt: false
	}) : ensureAuthProfileStoreWithoutExternalProfiles(params.agentDir, { allowKeychainPrompt: false });
	const selectPreparedHarness = (attempts) => selectAgentHarnessForPreparedModelProviders({
		provider: params.provider,
		modelId: params.modelId,
		modelProviders: attempts.map((attempt) => buildCompactionHarnessModelProvider({
			model: params.model,
			plan: attempt.plan,
			attempt
		})),
		config: params.config,
		agentId: params.runtimePolicyAgentId,
		sessionKey: params.runtimePolicySessionKey ?? void 0,
		agentHarnessId: params.agentHarnessId,
		agentHarnessRuntimeOverride: params.agentHarnessRuntimeOverride
	});
	const initialHarness = params.reusableRuntimeAuthPlan ? void 0 : selectAgentHarness({
		provider: params.provider,
		modelId: params.modelId,
		modelProvider: buildCompactionHarnessModelProvider({ model: params.model }),
		config: params.config,
		agentId: params.runtimePolicyAgentId,
		sessionKey: params.runtimePolicySessionKey ?? void 0,
		agentHarnessId: params.agentHarnessId,
		agentHarnessRuntimeOverride: params.agentHarnessRuntimeOverride
	});
	const prepare = (harness) => prepareAgentRuntimeAuth({
		provider: params.provider,
		modelId: params.modelId,
		modelApi: params.model?.api,
		modelBaseUrl: params.model?.baseUrl,
		config: params.config,
		env: process.env,
		agentDir: params.agentDir,
		workspaceDir: params.workspaceDir,
		authProfileStore: runtimeAuthProfileStore,
		sessionAuthProfileId: params.authProfileId,
		sessionAuthProfileSource: params.authProfileIdSource,
		harnessId: harness.id,
		harnessRuntime: harness.id,
		harnessAuthBootstrap: harness.authBootstrap
	});
	let runtimeAuthPreparation = params.reusableRuntimeAuthPlan ? {
		plan: params.reusableRuntimeAuthPlan,
		attempts: [{
			kind: "implicit",
			plan: params.reusableRuntimeAuthPlan
		}]
	} : prepare(initialHarness);
	let selectedPreparedHarness = selectPreparedHarness(runtimeAuthPreparation.attempts);
	if (!params.reusableRuntimeAuthPlan && selectedPreparedHarness.id !== initialHarness?.id) {
		runtimeAuthPreparation = prepare(selectedPreparedHarness);
		const confirmedHarness = selectPreparedHarness(runtimeAuthPreparation.attempts);
		if (confirmedHarness.id !== selectedPreparedHarness.id) throw new Error(`${params.convergenceErrorPrefix ?? "Prepared compaction"} auth routes did not converge on one agent harness for ${params.provider}/${params.modelId}.`);
		selectedPreparedHarness = confirmedHarness;
	}
	return {
		runtimeAuthProfileStore,
		runtimeAuthPreparation,
		selectedPreparedHarness,
		providerUsesProfileScopedModelMetadata: providerUsesCredentialScopedModelMetadata({
			provider: params.metadataProvider ?? params.provider,
			modelId: params.modelId,
			config: params.config,
			agentDir: params.agentDir,
			workspaceDir: params.workspaceDir
		})
	};
}
//#endregion
//#region src/agents/project-memory-scope.ts
const MAX_PROJECT_KEY_CACHE_ENTRIES = 128;
const GIT_CONFIG_TIMEOUT_MS = 4e3;
const projectKeyByRepoRoot = /* @__PURE__ */ new Map();
function escapeProjectKeyForAnnotation(value) {
	return value.replaceAll("%", "%25").replaceAll(";", "%3b").replaceAll("<", "%3c").replaceAll(">", "%3e").replaceAll("\r", "%0d").replaceAll("\n", "%0a");
}
async function resolveUncachedProjectKey(repoRoot) {
	try {
		const result = await runCommandWithTimeout([
			"git",
			"-C",
			repoRoot,
			"config",
			"--get",
			"remote.origin.url"
		], { timeoutMs: GIT_CONFIG_TIMEOUT_MS });
		if (result.code === 0) {
			const source = parseGitUrl(`git:${result.stdout.trim()}`);
			if (source) return escapeProjectKeyForAnnotation(`${source.host.toLowerCase()}/${source.path}`);
		}
	} catch {}
	return `path:${escapeProjectKeyForAnnotation(repoRoot)}`;
}
/** Resolve one stable repository identity without spawning Git again for the same root. */
function resolveProjectKey(repoRoot) {
	const canonicalRoot = path.resolve(repoRoot);
	const cached = projectKeyByRepoRoot.get(canonicalRoot);
	if (cached) {
		projectKeyByRepoRoot.delete(canonicalRoot);
		projectKeyByRepoRoot.set(canonicalRoot, cached);
		return cached;
	}
	const pending = resolveUncachedProjectKey(canonicalRoot);
	projectKeyByRepoRoot.set(canonicalRoot, pending);
	pruneMapToMaxSize(projectKeyByRepoRoot, MAX_PROJECT_KEY_CACHE_ENTRIES);
	return pending;
}
//#endregion
export { buildBeforeCompactionHookMetrics as a, runBeforeCompactionHooks as c, persistCompactionCheckpoint as d, asCompactionHookRunner as i, runPostCompactionSideEffects as l, prepareCompactionHarnessAuth as n, estimateTokensAfterCompaction as o, resolveCompactionRuntimeSelection as r, runAfterCompactionHooks as s, resolveProjectKey as t, compactionCheckpointStore as u };
