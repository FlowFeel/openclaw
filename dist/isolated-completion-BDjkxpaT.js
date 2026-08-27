import { c as resolveAgentDir, f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-BBjU-hqW.js";
import { N as withPluginRuntimeRegistryScope } from "./runtime-yJAYArQt.js";
import "./agent-scope-DyEposw2.js";
import { r as withTempWorkspace } from "./private-temp-workspace-D2z2djhq.js";
import { n as getRegisteredAgentHarness } from "./registry-BjwLx-0R.js";
import { a as unwrapSecretSentinelsForProviderEgress, i as unwrapModelHeaderSentinelsForProviderEgress } from "./provider-secret-egress-J5B4EL1L.js";
import { i as resolveCliBackendConfig, o as resolveCliRuntimeCanonicalProvider } from "./cli-backends-CmZ252m-.js";
import { i as isCliRuntimeAliasForProvider, s as resolveCliRuntimeExecutionProvider } from "./model-runtime-aliases-D6C4F5xr.js";
import { t as acquireAgentRunPreparedModelRuntime } from "./prepared-model-runtime-CXHnGzH_.js";
import { t as ensureSelectedAgentHarnessPlugin } from "./runtime-plugin-Ab_u_Uth.js";
import { a as resolveEffectiveAgentRuntime } from "./thinking-runtime-93ZQ8Ibj.js";
import { n as prepareSimpleCompletionModel } from "./simple-completion-runtime-CxQ3y0xz.js";
import { t as resolveEmbeddedCliBackendDispatchEligibility } from "./cli-backend-dispatch-eligibility-CipLCTxX.js";
import { o as normalizeCliModel } from "./helpers-D_kujQOX.js";
import path from "node:path";
//#region src/agents/isolated-completion.ts
/**
* Fresh, prompt-only inference with an exact zero-tool execution contract.
*
* This operation deliberately bypasses the ordinary agent attempt, retry,
* transcript, hook, and delivery lifecycle. Execution owners either prove a
* literal empty native tool surface or fail before inference starts.
*/
var IsolatedCompletionError = class extends Error {
	constructor(code, message, options) {
		super(message, options);
		this.name = "IsolatedCompletionError";
		this.code = code;
	}
};
function requireIsolatedAssistantText(assistant) {
	if (assistant.stopReason !== "stop" && assistant.stopReason !== "length") throw new IsolatedCompletionError("output-rejected", `Isolated completion failed with stop reason ${assistant.stopReason}.`);
	const textParts = [];
	for (const block of assistant.content) {
		if (block.type === "text") {
			textParts.push(block.text);
			continue;
		}
		if (block.type === "thinking") continue;
		throw new IsolatedCompletionError("output-rejected", "Isolated completion returned a tool call; the result was rejected.");
	}
	const text = textParts.join("").trim();
	if (!text) throw new IsolatedCompletionError("output-rejected", "Isolated completion returned empty output.");
	return text;
}
function hasCliSideEffectEvidence(result) {
	return Boolean(result.didSendViaMessagingTool || result.didDeliverSourceReplyViaMessageTool || result.messagingToolSentTexts?.length || result.messagingToolSentMediaUrls?.length || result.messagingToolSentTargets?.length || result.messagingToolSourceReplyPayloads?.length || result.acceptedSessionSpawns?.length || result.successfulCronAdds);
}
async function runCliIsolatedCompletion(params) {
	return await withTempWorkspace({
		rootDir: resolvePreferredOpenClawTmpDir(),
		prefix: "openclaw-isolated-completion-"
	}, async ({ dir }) => {
		const { runCliAgent } = await import("./cli-runner.runtime.js");
		const sessionId = `isolated-completion-${Date.now()}`;
		const result = await runCliAgent({
			sessionId,
			sessionFile: path.join(dir, "session.json"),
			workspaceDir: params.workspaceDir,
			cwd: dir,
			agentDir: params.agentDir,
			agentId: params.agentId,
			config: params.request.config,
			prompt: params.request.prompt,
			extraSystemPrompt: params.request.systemPrompt,
			timeoutMs: params.request.timeoutMs,
			runId: sessionId,
			provider: params.provider,
			modelProvider: params.modelProvider,
			model: params.request.model,
			authProfileId: params.request.authProfileId,
			thinkLevel: params.request.thinkLevel,
			streamParams: params.request.streamParams,
			abortSignal: params.request.abortSignal,
			executionMode: "side-question",
			cliToolAvailability: {
				native: [],
				openClaw: []
			},
			disableTools: true,
			disableCliLiveSession: true,
			cleanupCliLiveSessionOnRunEnd: true,
			cleanupBundleMcpOnRunEnd: true,
			requireExplicitMessageTarget: true,
			isolatedCompletion: true
		});
		if (hasCliSideEffectEvidence(result)) throw new IsolatedCompletionError("output-rejected", "Isolated CLI completion returned side-effect evidence; result rejected.");
		const payloads = result.payloads ?? [];
		if (payloads.some((payload) => payload.isError || payload.mediaUrl || payload.mediaUrls?.length || payload.audioAsVoice || payload.channelData)) throw new IsolatedCompletionError("output-rejected", "Isolated CLI completion returned non-text output; result rejected.");
		const text = payloads.filter((payload) => !payload.isReasoning && typeof payload.text === "string").map((payload) => payload.text ?? "").join("\n").trim();
		if (!text) throw new IsolatedCompletionError("output-rejected", "Isolated CLI completion returned empty output.");
		const backend = resolveCliBackendConfig(params.provider, params.request.config, { agentId: params.agentId });
		if (!backend) throw new IsolatedCompletionError("runtime-unavailable", `CLI backend ${params.provider} became unavailable after execution.`);
		return {
			text,
			model: normalizeCliModel(params.request.model, backend.config)
		};
	});
}
function resolveCliOwner(params) {
	if (isCliRuntimeAliasForProvider({
		runtime: params.runtime,
		provider: params.provider,
		cfg: params.request.config
	})) return params.runtime;
	if (params.request.agentHarnessRuntimeOverride) return;
	return resolveCliRuntimeExecutionProvider({
		provider: params.provider,
		cfg: params.request.config,
		agentId: params.agentId,
		modelId: params.request.model,
		authProfileId: params.request.authProfileId
	}) ?? resolveEmbeddedCliBackendDispatchEligibility({
		provider: params.provider,
		model: params.request.model,
		agentId: params.agentId,
		authProfileId: params.request.authProfileId,
		config: params.request.config,
		agentDir: params.agentDir,
		workspaceDir: params.workspaceDir
	})?.provider;
}
async function resolveHarness(runtime) {
	if (runtime === "openclaw") {
		const { createOpenClawAgentHarness } = await import("./builtin-openclaw-Do-WbZ2f.js");
		return createOpenClawAgentHarness();
	}
	const harness = getRegisteredAgentHarness(runtime)?.harness;
	if (!harness) throw new IsolatedCompletionError("runtime-unavailable", `Agent harness ${runtime} is unavailable for isolated completion.`);
	return harness;
}
function prepareIsolatedHarnessParams(harness, params) {
	if (harness.id === "openclaw") return params;
	const boundary = "plugin harness isolated completion handoff";
	const apiKey = params.auth.apiKey ? unwrapSecretSentinelsForProviderEgress(params.auth.apiKey, boundary) : params.auth.apiKey;
	const model = unwrapModelHeaderSentinelsForProviderEgress(params.model, boundary);
	if (apiKey === params.auth.apiKey && model === params.model) return params;
	return {
		...params,
		model,
		auth: {
			...params.auth,
			apiKey
		}
	};
}
/** Run one fresh completion without any model-callable tool surface or fallback. */
async function runIsolatedCompletion(request) {
	const config = request.config ?? {};
	const agentId = request.agentId ?? resolveDefaultAgentId(config);
	const agentDir = resolveAgentDir(config, agentId);
	const workspaceDir = request.workspaceDir ?? resolveAgentWorkspaceDir(config, agentId);
	const provider = resolveCliRuntimeCanonicalProvider({
		runtime: request.provider,
		config,
		includeSetupRegistry: true
	}) ?? request.provider;
	const lease = await acquireAgentRunPreparedModelRuntime({
		config,
		agentId,
		agentDir,
		workspaceDir,
		runtimePluginSelections: [{
			provider,
			modelId: request.model,
			...request.agentHarnessRuntimeOverride ? { runtime: request.agentHarnessRuntimeOverride } : {},
			agentId
		}]
	});
	const pluginRegistry = lease.snapshot.pluginRegistry;
	try {
		const run = async () => {
			await ensureSelectedAgentHarnessPlugin({
				provider,
				modelId: request.model,
				config,
				agentId,
				agentHarnessId: request.agentHarnessRuntimeOverride,
				agentHarnessRuntimeOverride: request.agentHarnessRuntimeOverride,
				workspaceDir,
				pluginRegistry
			});
			const runtime = request.agentHarnessRuntimeOverride ?? resolveEffectiveAgentRuntime({
				cfg: config,
				provider,
				modelId: request.model,
				agentId
			});
			const cliOwner = resolveCliOwner({
				request,
				provider,
				runtime,
				agentId,
				agentDir,
				workspaceDir
			});
			if (cliOwner) {
				const completion = await runCliIsolatedCompletion({
					request,
					provider: cliOwner,
					modelProvider: provider,
					agentId,
					agentDir,
					workspaceDir
				});
				return {
					text: completion.text,
					provider,
					model: completion.model,
					owner: {
						kind: "cli",
						id: cliOwner
					}
				};
			}
			const harness = await resolveHarness(runtime);
			if (!harness.runIsolatedCompletion) throw new IsolatedCompletionError("unsupported", `Agent harness ${harness.id} does not support isolated completion.`);
			const prepared = await prepareSimpleCompletionModel({
				cfg: config,
				agentId,
				provider,
				modelId: request.model,
				agentDir,
				profileId: request.authProfileId,
				allowMissingApiKeyModes: ["aws-sdk"],
				allowBundledStaticCatalogFallback: true,
				skipAgentDiscovery: true,
				bindAuthOwner: true
			});
			if ("error" in prepared) throw new Error(`Isolated completion preparation failed: ${prepared.error}`);
			const harnessParams = {
				provider,
				modelId: request.model,
				model: prepared.model,
				auth: prepared.auth,
				...prepared.sourceAuthFingerprint ? { sourceAuthFingerprint: prepared.sourceAuthFingerprint } : {},
				config,
				agentId,
				agentDir,
				workspaceDir,
				systemPrompt: request.systemPrompt,
				prompt: request.prompt,
				timeoutMs: request.timeoutMs,
				abortSignal: request.abortSignal,
				thinkLevel: request.thinkLevel,
				streamParams: request.streamParams
			};
			const result = await harness.runIsolatedCompletion(prepareIsolatedHarnessParams(harness, harnessParams));
			return {
				text: requireIsolatedAssistantText(result.assistant),
				provider: result.assistant.provider,
				model: result.assistant.model,
				owner: {
					kind: "harness",
					id: harness.id
				},
				usage: result.assistant.usage
			};
		};
		return await withPluginRuntimeRegistryScope(pluginRegistry, run);
	} finally {
		lease.release();
	}
}
//#endregion
export { runIsolatedCompletion };
