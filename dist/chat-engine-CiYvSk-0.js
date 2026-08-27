import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { a as buildAgentMainSessionKey } from "./session-key-DtTE9-Tg.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { t as isSensitiveConfigPath } from "./sensitive-paths-DYIyGcFS.js";
import "./sessions-Cj7BqXHP.js";
import { t as SessionManager } from "./session-manager-dOl3u7vE.js";
import { i as resolveCliBackendConfig } from "./cli-backends-CmZ252m-.js";
import { t as SYSTEM_AGENT_ID } from "./agent-id-D7-xzIog.js";
import { i as loadSystemAgentOverview } from "./overview-8mY9XHbo.js";
import { a as resolveSystemAgentVerifiedInferenceRoute, i as resolveSystemAgentExpectedAgentHarnessRuntimeArtifact } from "./verified-inference-Dm9ykO8f.js";
import { a as parseSystemAgentOperation, i as isPersistentSystemAgentOperation, n as describeSystemAgentPersistentOperation, t as executeSystemAgentOperation } from "./operations-DStBH-DH.js";
import { n as hashSystemAgentOperation } from "./system-agent-tool-DQRsTPBe.js";
import { n as isSystemAgentInferenceUnavailableError, t as SystemAgentInferenceUnavailableError } from "./inference-error-ZQMpxTxR.js";
import { t as approvalQuestion } from "./dialogue-Bb6we47f.js";
import { n as classifySystemAgentApprovalText } from "./approval-intent-i_brHZxo.js";
import { o as normalizeCliModel } from "./helpers-D_kujQOX.js";
import { n as sanitizeWizardStepForClient, r as wizardStepAwaitsInput, t as WizardSession } from "./session-BeEA_WOJ.js";
import { a as SYSTEM_AGENT_SYSTEM_PROMPT } from "./assistant-prompts-RVY1rAkh.js";
import { randomUUID } from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
//#region src/system-agent/agent-turn.ts
/**
* OpenClaw is a real agent: same loop, session transcript, and tool pipeline
* as regular agents — restricted to the single ring-zero `openclaw` tool.
* Embedded runtimes enforce that restriction with toolsAllow. CLI harnesses
* must explicitly support per-run native-tool selection, then receive the tool
* over a dedicated stdio MCP server that replaces the normal bundle surface.
* Turns share one persistent session so the conversation has genuine
* multi-turn memory. Inference setup must succeed before this runner is entered.
*/
const AGENT_TURN_TIMEOUT_MS = 12e4;
const SYSTEM_AGENT_TOOL_NAME = "openclaw";
function createSystemAgentSession(verifiedInference) {
	if (!verifiedInference) throw new SystemAgentInferenceUnavailableError("agent-turn");
	return {
		sessionId: `openclaw-${randomUUID()}`,
		verifiedInference,
		proposalRef: {}
	};
}
function extractRunText(result) {
	return result.meta?.finalAssistantVisibleText ?? result.meta?.finalAssistantRawText ?? result.payloads?.map((payload) => payload.text?.trim()).filter(Boolean).join("\n");
}
async function ensureSystemAgentDirs() {
	const base = path.join(resolveStateDir(), "openclaw");
	const workspaceDir = path.join(base, "workspace");
	await fs.mkdir(workspaceDir, { recursive: true });
	return { workspaceDir };
}
async function cleanupSystemAgentSession(session) {
	delete session.cliSession;
	delete session.sessionManager;
}
function clearSystemAgentCliSession(session) {
	delete session.cliSession;
}
function clearFailedSystemAgentSessionState(session) {
	session.proposalRef.current = void 0;
	session.proposalRef.operation = void 0;
	clearSystemAgentCliSession(session);
}
function throwSystemAgentInferenceUnavailable(params) {
	clearFailedSystemAgentSessionState(params.session);
	throw new SystemAgentInferenceUnavailableError("agent-turn", params.failures);
}
function cliRouteKey(route, backend) {
	return JSON.stringify({
		provider: route.provider,
		backendId: backend?.id ?? route.provider,
		modelLabel: route.modelLabel,
		configuredModel: route.model,
		model: backend ? normalizeCliModel(route.model, backend.config) : route.model,
		authProfileId: route.authProfileId ?? "",
		agentDir: path.resolve(route.agentDir),
		backend: backend ? {
			pluginId: backend.pluginId,
			modelProvider: backend.modelProvider,
			config: backend.config,
			bundleMcp: backend.bundleMcp,
			bundleMcpMode: backend.bundleMcpMode,
			authEpochMode: backend.authEpochMode,
			nativeToolMode: backend.nativeToolMode,
			toolAvailabilityEnforcement: backend.toolAvailabilityEnforcement,
			sideQuestionToolMode: backend.sideQuestionToolMode
		} : null
	});
}
function resolveSystemAgentCliBackend(route) {
	const backend = resolveCliBackendConfig(route.provider, route.runConfig, { agentId: SYSTEM_AGENT_ID });
	if (!backend) return null;
	const { liveSession: _liveSession, ...config } = backend.config;
	return {
		...backend,
		config
	};
}
function resolveSystemAgentCliToolAvailability(backend) {
	if (backend?.nativeToolMode === "none") return;
	if (backend?.nativeToolMode === "selectable" && (backend.toolAvailabilityEnforcement === "execution-args" && backend.resolveExecutionArgs || backend.toolAvailabilityEnforcement === "prepare-execution" && backend.prepareExecution)) return {
		native: [],
		openClaw: [SYSTEM_AGENT_TOOL_NAME]
	};
	const backendId = backend?.id ?? "unknown";
	throw new Error(`CLI backend ${backendId} cannot enforce OpenClaw's exact tool availability`);
}
/**
* CLI harnesses run the openclaw tool in a stdio MCP subprocess, so the
* in-process proposalRef/directiveRef cannot be shared with the host. Mirror
* the tool's transitions from the harness tool events instead: a denial
* registers the exact-operation hash, a mismatch voids it, an executed
* mutation consumes it, and directive actions replay the interactive handoff —
* same lifecycle as system-agent-tool.ts enforces.
*/
async function mirrorSystemAgentToolStateFromEvents(params) {
	const [{ onAgentEvent }, { extractToolResultText }, { resolveSystemAgentProposalTransition, resolveSystemAgentDirectiveTransition }] = await Promise.all([
		import("./agent-events-toq1QUi1.js"),
		import("./embedded-agent-subscribe.tools-DzBC8GtY.js"),
		import("./system-agent-tool-Csen7ezU.js")
	]);
	return onAgentEvent((evt) => {
		if (evt.runId !== params.runId || evt.stream !== "tool" || evt.data.phase !== "result") return;
		const name = typeof evt.data.name === "string" ? evt.data.name : "";
		if (name !== "openclaw" && !name.endsWith("__openclaw")) return;
		const args = typeof evt.data.args === "object" && evt.data.args !== null ? evt.data.args : {};
		const resultText = extractToolResultText(evt.data.result) ?? "";
		const transition = resolveSystemAgentProposalTransition({
			args,
			resultText
		});
		if (transition) {
			params.proposalRef.current = transition.proposal;
			params.proposalRef.operation = transition.operation;
		}
		const directive = resolveSystemAgentDirectiveTransition({
			args,
			resultText
		});
		if (directive && params.directiveRef.current?.kind !== "approved-operation") params.directiveRef.current = directive;
	});
}
/**
* Run one OpenClaw turn through the embedded agent loop. Route, runner, and
* output failures are typed so callers may try another inference path without
* mistaking the failure for deterministic setup authority.
*/
async function runSystemAgentTurnWithDeps(params, deps = {}) {
	const binding = params.session.verifiedInference;
	if (!binding) return throwSystemAgentInferenceUnavailable({ session: params.session });
	let plan;
	try {
		plan = await resolveSystemAgentVerifiedInferenceRoute(binding, deps);
	} catch (error) {
		return throwSystemAgentInferenceUnavailable({
			session: params.session,
			failures: [error]
		});
	}
	if (!plan) return throwSystemAgentInferenceUnavailable({ session: params.session });
	let expectedAgentHarnessRuntimeArtifact;
	try {
		expectedAgentHarnessRuntimeArtifact = resolveSystemAgentExpectedAgentHarnessRuntimeArtifact(binding);
	} catch (error) {
		return throwSystemAgentInferenceUnavailable({
			session: params.session,
			failures: [error]
		});
	}
	let workspaceDir;
	try {
		({workspaceDir} = await ensureSystemAgentDirs());
	} catch (error) {
		return throwSystemAgentInferenceUnavailable({
			session: params.session,
			failures: [error]
		});
	}
	const runId = `openclaw-turn-${randomUUID()}`;
	const sessionManager = params.session.sessionManager ?? SessionManager.inMemory(workspaceDir);
	params.session.sessionManager = sessionManager;
	const shared = {
		sessionId: params.session.sessionId,
		sessionKey: buildAgentMainSessionKey({ agentId: SYSTEM_AGENT_ID }),
		agentId: SYSTEM_AGENT_ID,
		trigger: "manual",
		sessionFile: `in-memory:${params.session.sessionId}`,
		sessionManager,
		workspaceDir,
		config: plan.runConfig,
		prompt: params.input,
		timeoutMs: AGENT_TURN_TIMEOUT_MS,
		thinkLevel: "off",
		runId,
		messageChannel: "openclaw",
		messageProvider: "openclaw",
		disableTrajectory: true
	};
	const directiveRef = {};
	const systemAgentTool = {
		surface: params.surface,
		approvalArmed: params.approvalArmed,
		proposalRef: params.session.proposalRef,
		directiveRef
	};
	try {
		let result;
		if (plan.runner === "cli") {
			const backend = resolveSystemAgentCliBackend(plan);
			const cliToolAvailability = resolveSystemAgentCliToolAvailability(backend);
			const routeKey = cliRouteKey(plan, backend);
			const previousBinding = params.session.cliSession?.routeKey === routeKey ? params.session.cliSession.binding : void 0;
			if (!previousBinding) clearSystemAgentCliSession(params.session);
			const runCli = deps.runCliAgent ?? (await import("./cli-runner-CUWjD261.js")).runCliAgent;
			const stopToolStateMirror = await mirrorSystemAgentToolStateFromEvents({
				runId,
				proposalRef: params.session.proposalRef,
				directiveRef
			});
			try {
				result = await runCli({
					...shared,
					provider: plan.provider,
					model: plan.model,
					agentDir: plan.agentDir,
					...plan.authProfileId ? { authProfileId: plan.authProfileId } : {},
					extraSystemPrompt: SYSTEM_AGENT_SYSTEM_PROMPT,
					extraSystemPromptStatic: SYSTEM_AGENT_SYSTEM_PROMPT,
					systemAgentTool,
					...cliToolAvailability ? { cliToolAvailability } : {},
					...previousBinding ? { cliSessionBinding: previousBinding } : {},
					disableCliLiveSession: true,
					cleanupCliLiveSessionOnRunEnd: true
				});
			} finally {
				stopToolStateMirror();
			}
			const agentMeta = result.meta?.agentMeta;
			if (agentMeta?.clearCliSessionBinding || !agentMeta?.cliSessionBinding?.sessionId) clearSystemAgentCliSession(params.session);
			else if (agentMeta?.cliSessionBinding?.sessionId) params.session.cliSession = {
				routeKey,
				binding: agentMeta.cliSessionBinding
			};
		} else {
			clearSystemAgentCliSession(params.session);
			result = await (deps.runEmbeddedAgent ?? (await import("./embedded-agent-A4lbfjQj.js")).runEmbeddedAgent)({
				...shared,
				extraSystemPrompt: SYSTEM_AGENT_SYSTEM_PROMPT,
				toolsAllow: ["openclaw"],
				systemAgentTool,
				disableMessageTool: true,
				provider: plan.provider,
				model: plan.model,
				agentDir: plan.agentDir,
				agentHarnessRuntimeOverride: plan.agentHarnessRuntimeOverride,
				...expectedAgentHarnessRuntimeArtifact ? { expectedAgentHarnessRuntimeArtifact } : {},
				...plan.authProfileId ? {
					authProfileId: plan.authProfileId,
					authProfileIdSource: "user"
				} : {}
			});
		}
		if (params.session.verifiedInference !== binding) throw new SystemAgentInferenceUnavailableError("agent-turn");
		if (!await resolveSystemAgentVerifiedInferenceRoute(binding, deps)) throw new SystemAgentInferenceUnavailableError("agent-turn");
		const text = extractRunText(result)?.trim();
		if (!text) throw new SystemAgentInferenceUnavailableError("agent-turn");
		return {
			text,
			modelLabel: plan.modelLabel,
			...directiveRef.current ? { directive: directiveRef.current } : {}
		};
	} catch (error) {
		const failures = error instanceof SystemAgentInferenceUnavailableError ? [...error.failures] : [error];
		return throwSystemAgentInferenceUnavailable({
			session: params.session,
			failures
		});
	}
}
const runSystemAgentTurn = (params) => runSystemAgentTurnWithDeps(params);
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.systemAgentTurnTestApi")] = { runSystemAgentTurnWithDeps };
//#endregion
//#region src/system-agent/operator-approval.ts
function resolvePendingOperatorProposal(pending, proposalRef) {
	const operation = pending ?? proposalRef.operation;
	if (!operation || !isPersistentSystemAgentOperation(operation)) return null;
	const hash = hashSystemAgentOperation(operation);
	if (proposalRef.current && proposalRef.current !== hash) return null;
	proposalRef.current = hash;
	proposalRef.operation = operation;
	return {
		operation,
		hash
	};
}
async function resolveOperatorApprovalDecision(params) {
	const proposal = params.getProposal();
	if (!proposal || proposal.hash !== params.proposalHash) return null;
	if (params.decision !== "allow-once") {
		params.clear();
		return params.denied();
	}
	return await params.apply(`[operator-approved] Human approved ${params.proposalHash}. Apply exact proposal; approved=true.`);
}
//#endregion
//#region src/system-agent/post-write-verification.ts
function unavailable(reason) {
	return [`⚠ The write was applied, but post-write verification is unavailable: ${reason}.`, "Run `openclaw doctor --fix` on the machine running OpenClaw, then verify the configuration before continuing."].join("\n");
}
async function verifyConfigAfterSystemAgentWrite(resolveRepair) {
	let issuesText;
	try {
		const { readConfigFileSnapshot } = await import("./config/config.js");
		const snapshot = await readConfigFileSnapshot();
		if (!snapshot.exists) return unavailable("openclaw.json was not found");
		if (snapshot.valid) return null;
		const issues = (snapshot.issues ?? []).map((issue) => `${issue.path ? `${issue.path}: ` : ""}${issue.message}`);
		issuesText = issues.length > 0 ? issues.join("\n") : "unknown validation failure";
	} catch {
		return unavailable("openclaw.json could not be read");
	}
	const notice = `⚠ openclaw.json failed validation after that write:\n${issuesText}`;
	let recovery;
	try {
		recovery = await resolveRepair(`[config-verify] The config file is now invalid:\n${issuesText}\nPropose one corrective command from the allowed list.`);
	} catch (error) {
		if (!isSystemAgentInferenceUnavailableError(error)) throw error;
		return `${notice}\nThe write was applied, but inference could not propose a repair. Run \`openclaw doctor --fix\` on the machine running OpenClaw, then try again.`;
	}
	return recovery.text ? `${notice}\n\n${recovery.text}` : `${notice}\nUse \`config schema <path>\` here to check the expected shape. Or, with OpenClaw stopped, run \`openclaw doctor --fix\` on the machine running it.`;
}
//#endregion
//#region src/system-agent/chat-engine.ts
const log = createSubsystemLogger("system-agent/chat-engine");
const GATEWAY_SETUP_AFTER_WRITE = {
	mode: "none",
	reason: "Gateway setup defers runtime apply until explicit restart"
};
function assertLocalGatewaySetupMode(config) {
	if (config.gateway?.mode === "local") return;
	throw new Error("Hosted Gateway setup manages only a local Gateway. Use `openclaw onboard` for fresh setup or `openclaw configure` for the mode question, then retry after selecting local mode.");
}
function createHostedWizardRuntime(runtime) {
	return {
		...runtime,
		exit: (code) => {
			throw new Error(`hosted wizard exited with code ${String(code)}`);
		}
	};
}
function createCaptureRuntime() {
	const lines = [];
	return {
		log: (...args) => lines.push(args.join(" ")),
		error: (...args) => lines.push(args.join(" ")),
		exit: (code) => {
			throw new Error(`OpenClaw operation exited with code ${String(code)}`);
		},
		read: () => lines.join("\n").trim()
	};
}
async function runHostedConfigWizard(params) {
	const { readSetupConfigFileSnapshot, writeWizardConfigFile } = await import("./setup.shared-B20Bo9O_.js");
	const snapshot = await readSetupConfigFileSnapshot();
	if (!snapshot.exists || !snapshot.valid || !snapshot.hash) throw new Error(`${params.label} requires a valid saved config snapshot. On the machine running OpenClaw, run \`openclaw doctor --fix\` and resolve any remaining validation errors; then retry.`);
	const baseConfig = snapshot.sourceConfig ?? snapshot.config;
	const { defaultRuntime } = await import("./runtime-BpncsYKr.js");
	const runtime = createHostedWizardRuntime(defaultRuntime);
	const result = await params.run({
		baseConfig,
		runtime
	});
	if ("keptCurrent" in result) return "kept-current";
	await params.beforePersistentApply(runtime);
	const committedConfig = await writeWizardConfigFile(result.nextConfig, {
		allowConfigSizeDrop: false,
		baseHash: snapshot.hash,
		migrationBaseConfig: baseConfig,
		...params.afterWrite ? { afterWrite: params.afterWrite } : {}
	});
	await result.afterWrite?.(committedConfig);
	return "applied";
}
async function defaultChannelSetupWizardRunner(channel, prompter, beforePersistentApply) {
	const { createChannelOnboardingPostWriteHookCollector, runCollectedChannelOnboardingPostWriteHooks, setupChannels } = await import("./onboard-channels-Bjkrb6M5.js");
	const postWriteHooks = createChannelOnboardingPostWriteHookCollector();
	return await runHostedConfigWizard({
		label: "Channel setup",
		beforePersistentApply,
		run: async ({ baseConfig, runtime }) => ({
			nextConfig: await setupChannels(baseConfig, runtime, prompter, {
				initialSelection: [channel],
				forceAllowFromChannels: [channel],
				allowIMessageInstall: true,
				allowSignalInstall: true,
				deferStatusUntilSelection: true,
				quickstartDefaults: true,
				skipDmPolicyPrompt: true,
				skipConfirm: true,
				beforePersistentEffect: async () => await beforePersistentApply(runtime),
				onPostWriteHook: (hook) => postWriteHooks.collect(hook)
			}),
			afterWrite: async (committedConfig) => {
				await runCollectedChannelOnboardingPostWriteHooks({
					hooks: postWriteHooks.drain(),
					cfg: committedConfig,
					runtime,
					beforePersistentEffect: async () => await beforePersistentApply(runtime)
				});
			}
		})
	});
}
async function defaultSkillsSetupWizardRunner(prompter, beforePersistentApply) {
	const [{ setupSkills }, { resolveOnboardingAgentTarget }] = await Promise.all([import("./onboard-skills-DIXeo_Hv.js"), import("./onboard-agent-target-Bf0fC8tl.js")]);
	return await runHostedConfigWizard({
		label: "Skills setup",
		beforePersistentApply,
		run: async ({ baseConfig, runtime }) => ({ nextConfig: await setupSkills(baseConfig, resolveOnboardingAgentTarget(baseConfig).workspaceDir, runtime, prompter, { beforePersistentEffect: async () => await beforePersistentApply(runtime) }) })
	});
}
async function defaultSearchSetupWizardRunner(prompter, beforePersistentApply) {
	const { runSearchSetupFlow } = await import("./search-setup-BpgHiIq3.js");
	return await runHostedConfigWizard({
		label: "Web search setup",
		beforePersistentApply,
		run: async ({ baseConfig, runtime }) => {
			const result = await runSearchSetupFlow(baseConfig, runtime, prompter, {
				preserveDisabledSearchState: false,
				beforePersistentEffect: async () => await beforePersistentApply(runtime)
			});
			if (result.outcome === "install-failed") {
				const failure = result.reason === "timed-out" ? "timed out" : "failed";
				throw new Error(`web search provider ${result.providerId} installation ${failure}`);
			}
			if (result.outcome === "kept-current") {
				if (result.reason === "user-skipped" || result.reason === "provider-install-skipped") return { keptCurrent: true };
				const reason = result.reason === "no-providers" ? "no web search providers are available under the current plugin policy" : "the selected web search provider is no longer available";
				throw new Error(reason);
			}
			return { nextConfig: result.config };
		}
	});
}
async function defaultGatewaySetupWizardRunner(prompter, beforePersistentApply) {
	const [{ resolveGatewayPort }, { configureGatewayForSetup }, { resolveQuickstartGatewayDefaults }] = await Promise.all([
		import("./config/config.js"),
		import("./setup.gateway-config-nPIK_F61.js"),
		import("./setup.shared-B20Bo9O_.js")
	]);
	return await runHostedConfigWizard({
		label: "Gateway setup",
		beforePersistentApply,
		afterWrite: GATEWAY_SETUP_AFTER_WRITE,
		run: async ({ baseConfig, runtime }) => {
			assertLocalGatewaySetupMode(baseConfig);
			return { nextConfig: (await configureGatewayForSetup({
				flow: "advanced",
				baseConfig,
				nextConfig: baseConfig,
				localPort: resolveGatewayPort(baseConfig),
				quickstartGateway: resolveQuickstartGatewayDefaults(baseConfig),
				prompter,
				runtime
			})).nextConfig };
		}
	});
}
async function defaultMemoryImportWizardRunner(prompter, beforePersistentApply, onProviderOutcome) {
	const [{ resolveAgentWorkspaceDir, resolveDefaultAgentId }, { defaultRuntime }, { readSetupConfigFileSnapshot }, { stat }] = await Promise.all([
		import("./agent-scope-Jqp3H3Rj.js"),
		import("./runtime-BpncsYKr.js"),
		import("./setup.shared-B20Bo9O_.js"),
		import("node:fs/promises")
	]);
	const snapshot = await readSetupConfigFileSnapshot();
	if (!snapshot.exists || !snapshot.valid || !snapshot.hash) throw new Error("Memory import requires a valid saved config. Run `openclaw doctor --fix`, then retry.");
	const baseHash = snapshot.hash;
	const config = snapshot.config;
	const workspace = resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config));
	try {
		if (!(await stat(workspace)).isDirectory()) return {
			status: "workspace-missing",
			providers: [],
			workspace
		};
	} catch (error) {
		const code = error.code;
		if (code === "ENOENT" || code === "ENOTDIR") return {
			status: "workspace-missing",
			providers: [],
			workspace
		};
		throw error;
	}
	const { runSetupMemoryImportStep } = await import("./setup.memory-import-CnQeusDS.js");
	const runtime = createHostedWizardRuntime(defaultRuntime);
	return await runSetupMemoryImportStep({
		config,
		prompter,
		runtime,
		beforeApply: async () => {
			await beforePersistentApply(runtime);
			const currentSnapshot = await readSetupConfigFileSnapshot();
			if (!currentSnapshot.exists || !currentSnapshot.valid || currentSnapshot.hash !== baseHash) throw new Error("configuration changed during memory import; nothing further was copied — retry to import against the current setup");
		},
		onProviderOutcome
	});
}
function formatItemCount(count) {
	return `${count} ${count === 1 ? "item" : "items"}`;
}
function hasConfirmedMemoryImportCount(provider) {
	return provider.copiesIndeterminate !== true;
}
function formatMemoryImportProviders(providers) {
	return providers.map((provider) => `${provider.label} (${formatItemCount(provider.migrated)})`).join(", ");
}
function formatWizardOptions(step) {
	return (step.options ?? []).map((option, index) => {
		const hint = option.hint ? ` — ${option.hint}` : "";
		return `${index + 1}. ${option.label}${hint}`;
	});
}
/**
* Mirror the awaited wizard step as a typed question for card clients. Only
* closed choices small enough for cards qualify; everything else stays text.
* Option replies are labels/yes/no because parseWizardAnswer matches those.
*/
function wizardStepChatQuestion(step) {
	if (!step) return;
	if (step.type === "confirm") {
		const yesRecommended = step.initialValue !== false;
		return {
			id: step.id,
			header: step.title ?? "Confirm",
			question: step.message ?? "Continue?",
			options: [{
				label: "Yes",
				reply: "yes",
				...yesRecommended ? { recommended: true } : {}
			}, {
				label: "No",
				reply: "no",
				...!yesRecommended ? { recommended: true } : {}
			}]
		};
	}
	if (step.type !== "select") return;
	const options = step.options ?? [];
	if (options.length < 2 || options.length > 4) return;
	return {
		id: step.id,
		header: step.title ?? "Choose one",
		question: step.message ?? "Choose one.",
		options: options.map((option) => {
			const mapped = { label: option.label };
			if (option.hint) mapped.description = option.hint;
			if (step.initialValue !== void 0 && option.value === step.initialValue) mapped.recommended = true;
			return mapped;
		})
	};
}
function renderWizardStep(step) {
	const lines = [];
	if (step.title) lines.push(`**${step.title}**`);
	if (step.message) lines.push(step.message);
	switch (step.type) {
		case "select":
			lines.push(...formatWizardOptions(step), "Reply with a number.");
			break;
		case "multiselect":
			lines.push(...formatWizardOptions(step), "Reply with numbers (e.g. 1,3) or `none`.");
			break;
		case "confirm":
			lines.push("Reply yes or no.");
			break;
		case "text":
			if (step.placeholder) lines.push(`(e.g. ${step.placeholder})`);
			lines.push("Type your answer.");
			break;
		default: break;
	}
	return lines.filter(Boolean).join("\n");
}
const WIZARD_CANCEL_HINT = "Say `cancel` to stop this setup.";
/** Map a chat reply to a wizard step answer; null means "could not parse". */
function parseWizardAnswer(step, text) {
	const trimmed = text.trim();
	if (step.type === "confirm") {
		const intent = classifySystemAgentApprovalText(trimmed);
		if (intent === "approve") return { value: true };
		if (intent === "decline") return { value: false };
		return null;
	}
	if (step.type === "text") return { value: trimmed };
	const options = step.options ?? [];
	const matchOption = (token) => {
		if (/^\d+$/.test(token)) {
			const index = Number(token);
			if (Number.isSafeInteger(index) && index >= 1 && index <= options.length) return options[index - 1];
		}
		const lower = token.toLowerCase();
		return options.find((option) => option.label.toLowerCase() === lower || typeof option.value === "string" && option.value.toLowerCase() === lower);
	};
	if (step.type === "select") {
		const option = matchOption(trimmed);
		return option ? { value: option.value } : null;
	}
	if (step.type === "multiselect") {
		if (/^none$/i.test(trimmed)) return { value: [] };
		const tokens = trimmed.split(/[\s,]+/).map((token) => token.trim()).filter(Boolean);
		const values = [];
		for (const token of tokens) {
			const option = matchOption(token);
			if (!option) return null;
			values.push(option.value);
		}
		return { value: values };
	}
	return { value: step.type === "action" ? true : void 0 };
}
function formatStructuredWizardAnswerForHistory(step, value) {
	if (step.sensitive === true) return "<redacted secret>";
	if (step.type === "text") {
		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") return String(value);
		return "<wizard answer>";
	}
	if (step.type === "confirm") return typeof value === "boolean" ? value ? "Yes" : "No" : "<wizard answer>";
	if (step.type === "select") return step.options?.find((option) => Object.is(option.value, value))?.label ?? "<wizard answer>";
	if (step.type === "multiselect") {
		if (!Array.isArray(value)) return "<wizard answer>";
		if (value.length === 0) return "None";
		const labels = value.map((entry) => step.options?.find((option) => Object.is(option.value, entry))?.label);
		return labels.every((label) => label !== void 0) ? labels.join(", ") : "<wizard answer>";
	}
	return "Continue";
}
var SystemAgentWizardAnswerError = class extends Error {};
function formatOperationError(error) {
	return `That did not go through: ${error instanceof Error ? error.message : String(error)}`;
}
/**
* A typed `config set` against a sensitive path carries a raw secret; the
* stored history feeds future planner prompts (and CLI-harness transcripts),
* so the value is masked the same way hosted-wizard secrets are.
*/
function redactSensitiveCommandText(text) {
	const operation = parseSystemAgentOperation(text);
	if (operation.kind === "config-set" && isSensitiveConfigPath(operation.path)) return `config set ${operation.path} <redacted secret>`;
	return text;
}
function formatPendingOperationForAssistant(operation) {
	const description = describeSystemAgentPersistentOperation(operation);
	return operation.kind === "setup" ? `${description}. Exact setup JSON: ${JSON.stringify(operation)}. Keep the verified model unless the user explicitly asks to leave OpenClaw and reconfigure inference.` : description;
}
function preservePendingSetupModel(pending, operation) {
	if (pending?.kind !== "setup" || operation.kind !== "setup") return operation;
	const pendingModel = pending.model?.trim();
	const requestedModel = operation.model?.trim();
	if (requestedModel && requestedModel !== pendingModel) return operation;
	return {
		...operation,
		...requestedModel ? {} : pendingModel ? { model: pendingModel } : {}
	};
}
var SystemAgentChatEngine = class {
	constructor(opts) {
		this.opts = opts;
		this.pending = null;
		this.wizardBridge = null;
		this.awaitingSetupChannel = false;
		this.history = [];
		this.turnQueue = Promise.resolve();
		const binding = opts?.verifiedInference;
		if (!binding) throw new SystemAgentInferenceUnavailableError("conversation");
		this.verifiedInference = binding;
		this.agentSession = createSystemAgentSession(binding);
	}
	/**
	* Seed a proposed operation that the user's next approval will apply. Used
	* by first-run onboarding: the welcome message states the plan, the user
	* just agrees.
	*/
	propose(operation) {
		this.clearPendingProposals();
		this.pending = operation;
		return describeSystemAgentPersistentOperation(operation);
	}
	hasPendingProposal() {
		return this.pending !== null;
	}
	getPendingOperatorProposal() {
		return resolvePendingOperatorProposal(this.pending, this.agentSession.proposalRef);
	}
	async resolveOperatorApproval(decision, proposalHash) {
		const turn = this.turnQueue.then(async () => {
			const reply = await resolveOperatorApprovalDecision({
				decision,
				proposalHash,
				getProposal: () => this.getPendingOperatorProposal(),
				clear: () => this.clearPendingProposals(),
				apply: (message) => this.pending ? this.applyPendingProposal() : this.resolveAssistantTurn(message, true),
				denied: () => ({
					text: "Denied. No change.",
					action: "none"
				})
			});
			if (reply?.text) this.history.push({
				role: "assistant",
				text: reply.text
			});
			return reply;
		});
		this.turnQueue = turn.catch(() => void 0);
		return await turn;
	}
	/** Record a host-rendered assistant message (welcome) so AI turns see it. */
	noteAssistantMessage(text) {
		this.history.push({
			role: "assistant",
			text
		});
	}
	/** Seed only conversational context; wizard and approval state intentionally stay fresh. */
	seedHistory(turns) {
		this.history.push(...turns.map((turn) => ({ ...turn })));
	}
	historyLength() {
		return this.history.length;
	}
	/** Return copies so the server can persist exactly the engine's sanitized commit. */
	historySince(index) {
		return this.history.slice(index).map((turn) => ({
			role: turn.role,
			text: turn.text
		}));
	}
	async dispose() {
		this.wizardBridge?.session.cancel();
		this.wizardBridge = null;
		this.lastSensitiveChannel = void 0;
		this.awaitingSetupChannel = false;
		await cleanupSystemAgentSession(this.agentSession);
	}
	async handle(text, options) {
		const turn = this.turnQueue.then(() => this.handleSerialized(text, options));
		this.turnQueue = turn.catch(() => void 0);
		return await turn;
	}
	async answerWizard(answer) {
		const turn = this.turnQueue.then(() => this.answerWizardSerialized(answer));
		this.turnQueue = turn.catch(() => void 0);
		return await turn;
	}
	async handleSerialized(text, options) {
		await this.requireVerifiedInference();
		const sensitiveTurn = this.wizardBridge?.step?.sensitive === true;
		const reply = await this.resolveTurn(text, options);
		return this.completeTurn(reply, sensitiveTurn ? "<redacted secret>" : redactSensitiveCommandText(text));
	}
	async answerWizardSerialized(answer) {
		await this.requireVerifiedInference();
		const bridge = this.wizardBridge;
		const step = bridge?.step;
		if (!bridge || !step) throw new SystemAgentWizardAnswerError("No hosted wizard is awaiting an answer.");
		if (answer.stepId !== step.id) throw new SystemAgentWizardAnswerError("The hosted wizard answer targets a stale step.");
		const validationError = await bridge.session.answer(step.id, answer.value);
		const text = validationError ? [validationError, renderWizardStep(step)].join("\n\n") : await this.pumpWizardBridge();
		return this.completeTurn({
			text,
			action: "none"
		}, formatStructuredWizardAnswerForHistory(step, answer.value));
	}
	completeTurn(reply, userHistoryText) {
		const awaitedStep = this.wizardBridge?.step;
		const completedReply = reply.text && awaitedStep && wizardStepAwaitsInput(awaitedStep) ? {
			...reply,
			text: `${reply.text}\n${WIZARD_CANCEL_HINT}`
		} : reply;
		this.history.push({
			role: "user",
			text: userHistoryText
		});
		if (completedReply.text) this.history.push({
			role: "assistant",
			text: completedReply.text
		});
		const step = this.wizardBridge?.step ?? null;
		const question = wizardStepChatQuestion(step);
		const clientStep = step ? sanitizeWizardStepForClient(step) : null;
		return {
			...completedReply,
			...step?.sensitive === true ? { sensitive: true } : {},
			...this.wizardBridge ? { wizardInputPending: true } : {},
			...question ? { question } : {},
			...clientStep ? { step: clientStep } : {}
		};
	}
	async resolveTurn(text, options) {
		if (this.wizardBridge) return {
			text: await this.resolveWizardBridgeReply(text),
			action: "none"
		};
		const trimmed = text.trim();
		if (!trimmed) return {
			text: "Tiny claw tap: tell me what you want — setup, repair, channels, anything config.",
			action: "none"
		};
		if (/^(quit|exit)$/i.test(trimmed)) return {
			text: "OpenClaw retracts into shell. Bye.",
			action: "exit"
		};
		if (this.awaitingSetupChannel) {
			if (/^(cancel|abort|stop)$/i.test(trimmed)) {
				this.awaitingSetupChannel = false;
				return {
					text: "Channel wizard handoff cancelled.",
					action: "none"
				};
			}
			if (!/^[a-z0-9_-]+$/i.test(trimmed)) return {
				text: "Reply with one channel id, such as `slack` or `telegram`, or say `cancel`.",
				action: "none"
			};
			this.awaitingSetupChannel = false;
			return await this.runOperation({
				kind: "open-setup",
				target: "channels",
				channel: trimmed.toLowerCase()
			}, void 0);
		}
		if (this.opts.operatorApprovalOnly && this.getPendingOperatorProposal()) return {
			text: "Approval pending. Human must decide in OpenClaw UI.",
			action: "none"
		};
		const typed = parseSystemAgentOperation(text);
		if (typed.kind === "config-set" && isSensitiveConfigPath(typed.path)) return await this.runOperation(typed, void 0);
		const typedRefusal = this.refuseDelegatedNavigationDirective(typed.kind);
		if (typedRefusal) return {
			text: typedRefusal,
			action: "none"
		};
		if (typed.kind === "open-tui") {
			this.clearPendingProposals();
			return await this.runOperation(typed, void 0);
		}
		if (typed.kind === "open-setup" || typed.kind === "channel-setup" || typed.kind === "skills-setup" || typed.kind === "search-setup" || typed.kind === "gateway-config-setup" || typed.kind === "memory-import" || typed.kind === "model-setup") return await this.runOperation(typed, void 0);
		const intent = this.opts.operatorApprovalOnly ? "other" : await this.classifyApprovalIntent(text);
		if (this.pending) {
			if (intent === "approve") {
				await this.requireVerifiedInference();
				return await this.applyPendingProposal();
			}
			if (intent === "decline") {
				const skippedModelSetup = this.pending.kind === "model-setup";
				this.clearPendingProposals();
				this.hostProposalResolution = "declined";
				return {
					text: skippedModelSetup ? "Skipped. The current inference route is unchanged." : "Skipped. No barnacles on config today.",
					action: "none"
				};
			}
		}
		if (intent === "decline") {
			this.agentSession.proposalRef.current = void 0;
			this.agentSession.proposalRef.operation = void 0;
		}
		return await this.resolveAssistantTurn(text, this.opts.operatorApprovalOnly ? false : intent === "approve", options?.uiContext);
	}
	async classifyApprovalIntent(text) {
		if (!(this.pending !== null || this.agentSession.proposalRef.current !== void 0)) return "other";
		return await (this.opts.classifyApproval ?? (await import("./approval-intent-BOlIHtie.js")).classifySystemAgentApprovalIntent)({
			message: text,
			...this.pending ? { proposal: describeSystemAgentPersistentOperation(this.pending) } : {},
			verifiedInference: this.verifiedInference
		});
	}
	async applyPendingProposal() {
		const pending = this.pending;
		this.clearPendingProposals();
		this.hostProposalResolution = "approved";
		if (!pending) return {
			text: "",
			action: "none"
		};
		if (pending.kind === "channel-setup") return {
			text: await this.startChannelSetupWizard(pending.channel),
			action: "none"
		};
		if (pending.kind === "model-setup") return await this.startModelSetup(pending.workspace);
		if (!isPersistentSystemAgentOperation(pending)) return await this.runOperation(pending, void 0);
		return await this.applyApprovedPersistentOperation(pending);
	}
	async applyApprovedPersistentOperation(operation) {
		if (!isPersistentSystemAgentOperation(operation)) throw new Error(`OpenClaw host received a non-persistent approved operation.`);
		const capture = createCaptureRuntime();
		let result;
		try {
			result = await (this.opts.executeOperation ?? executeSystemAgentOperation)(operation, capture, {
				approved: true,
				deps: this.commandDeps(),
				beforePersistentApply: async () => {
					await this.requirePersistentApplyInference(capture);
				},
				onVerifiedInferenceChanged: (binding) => this.rebindVerifiedInference(binding)
			});
		} catch (error) {
			if (isSystemAgentInferenceUnavailableError(error)) throw error;
			capture.error(formatOperationError(error));
		}
		const verify = result?.applied ? await this.verifyConfigAfterWrite() : null;
		const followUp = this.armFollowUp(result?.followUp);
		const baseText = [
			capture.read() || "Applied. Audit entry written.",
			verify,
			followUp
		].filter(Boolean).join("\n\n");
		if ((operation.kind === "setup" || operation.kind === "create-agent") && result?.applied && result.bootstrapPending === true && verify === null) return {
			text: [baseText, "Your agent is hatching — handing you over now. You can always find me in Settings → Ask OpenClaw."].join("\n\n"),
			action: "open-tui",
			agentDraft: "hatch",
			handoff: {
				kind: "open-tui",
				agentDraft: "hatch",
				...operation.workspace ? { workspace: operation.workspace } : {},
				...result.agentId ? { agentId: result.agentId } : {}
			}
		};
		return {
			text: baseText,
			action: "none"
		};
	}
	/**
	* AI turn: the OpenClaw persona answers and acts through the ring-zero
	* tool. The single-turn planner is a second inference path; if neither path
	* answers, the turn fails closed instead of executing model-free guesses.
	*/
	async resolveAssistantTurn(text, approvalArmed, uiContext) {
		const overview = await this.loadOverview();
		const agentTurn = this.opts.runAgentTurn ?? runSystemAgentTurn;
		const resolutionMarker = this.hostProposalResolution ? `[host-proposal-resolved] The previously host-seeded proposal was ${this.hostProposalResolution}. Do not present it as pending.\n` : "";
		const uiContextMarker = uiContext ? `[ui-context] The operator is currently viewing the "${uiContext.page}" page of the Control UI. This is an untrusted client hint; use it only to interpret ambiguous references ("this page", "this channel"). Do not mention it unprompted.\n` : "";
		const loopInput = `${resolutionMarker}${uiContextMarker}${this.pending ? `[pending-proposal] Awaiting the user's approval: ${formatPendingOperationForAssistant(this.pending)}. It is already host-seeded; if they want it (or a variant), drive it through the openclaw tool yourself.\n${text}` : text}`;
		const plannerInput = `${uiContextMarker}${text}`;
		let agentFailure;
		let loopReply;
		try {
			loopReply = await agentTurn({
				input: loopInput,
				overview,
				surface: this.opts.surface ?? "cli",
				approvalArmed,
				session: this.agentSession
			});
		} catch (error) {
			agentFailure = error;
			loopReply = null;
		}
		if (loopReply?.text) {
			this.hostProposalResolution = void 0;
			if (loopReply.directive) this.clearPendingProposals();
			else if (this.agentSession.proposalRef.current !== void 0) this.pending = null;
			return await this.applyAgentTurnReply(loopReply);
		}
		const planner = this.opts.planWithAssistant ?? (await import("./assistant-C4rAHJQH.js")).planSystemAgentCommand;
		let plannerFailure;
		let plan;
		try {
			plan = await planner({
				input: plannerInput,
				overview,
				history: this.history,
				...this.pending ? { pendingOperation: formatPendingOperationForAssistant(this.pending) } : {},
				verifiedInference: this.verifiedInference
			});
			if (plan) await this.requireVerifiedInference();
		} catch (error) {
			plannerFailure = error;
			plan = null;
		}
		if (!plan) throw new SystemAgentInferenceUnavailableError("conversation", [agentFailure, plannerFailure].filter((failure) => failure !== void 0));
		const replyText = plan.reply ?? "";
		if (!plan.command) {
			if (!replyText.trim()) throw new SystemAgentInferenceUnavailableError("planner", [agentFailure]);
			return {
				text: replyText,
				action: "none"
			};
		}
		const operation = preservePendingSetupModel(this.pending, parseSystemAgentOperation(plan.command));
		if (operation.kind === "none") {
			if (!replyText.trim()) throw new SystemAgentInferenceUnavailableError("planner", [agentFailure]);
			return {
				text: replyText,
				action: "none"
			};
		}
		const provenance = `(${plan.modelLabel ?? "model"} → \`${plan.command}\`)`;
		const executed = await this.runOperation(operation, provenance);
		return {
			...executed,
			text: [replyText, executed.text].filter(Boolean).join("\n\n")
		};
	}
	async applyAgentTurnReply(loopReply) {
		await this.requireVerifiedInference();
		const refusal = this.refuseDelegatedNavigationDirective(loopReply.directive?.kind);
		if (refusal) return {
			text: [loopReply.text, refusal].filter(Boolean).join("\n\n"),
			action: "none"
		};
		if (loopReply.directive?.kind === "approved-operation") {
			const applied = await this.applyApprovedPersistentOperation(loopReply.directive.operation);
			return {
				...applied,
				text: [loopReply.text, applied.text].filter(Boolean).join("\n\n")
			};
		}
		if (loopReply.directive?.kind === "channel-setup") {
			const wizardIntro = await this.startChannelSetupWizard(loopReply.directive.channel);
			return {
				text: [loopReply.text, wizardIntro].filter(Boolean).join("\n\n"),
				action: "none"
			};
		}
		if (loopReply.directive?.kind === "skills-setup") {
			const wizardIntro = await this.startSkillsSetupWizard();
			return {
				text: [loopReply.text, wizardIntro].filter(Boolean).join("\n\n"),
				action: "none"
			};
		}
		if (loopReply.directive?.kind === "search-setup") {
			const wizardIntro = await this.startSearchSetupWizard();
			return {
				text: [loopReply.text, wizardIntro].filter(Boolean).join("\n\n"),
				action: "none"
			};
		}
		if (loopReply.directive?.kind === "gateway-config-setup") {
			const wizardIntro = await this.startGatewaySetupWizard();
			return {
				text: [loopReply.text, wizardIntro].filter(Boolean).join("\n\n"),
				action: "none"
			};
		}
		if (loopReply.directive?.kind === "memory-import") {
			const wizardIntro = await this.startMemoryImportWizard();
			return {
				text: [loopReply.text, wizardIntro].filter(Boolean).join("\n\n"),
				action: "none"
			};
		}
		if (loopReply.directive?.kind === "model-setup") {
			const setup = await this.startModelSetup(loopReply.directive.workspace);
			return {
				...setup,
				text: [loopReply.text, setup.text].filter(Boolean).join("\n\n")
			};
		}
		if (loopReply.directive?.kind === "open-tui") {
			this.clearPendingProposals();
			return {
				text: loopReply.text,
				action: "open-tui",
				handoff: loopReply.directive
			};
		}
		if (loopReply.directive?.kind === "open-setup") {
			const handoff = await this.runOperation(loopReply.directive, void 0);
			return {
				...handoff,
				text: [loopReply.text, handoff.text].filter(Boolean).join("\n\n")
			};
		}
		return {
			text: loopReply.text,
			action: "none"
		};
	}
	refuseDelegatedNavigationDirective(kind) {
		if (!this.opts.operatorApprovalOnly) return;
		if (kind === "channel-setup" || kind === "skills-setup" || kind === "search-setup" || kind === "gateway-config-setup" || kind === "memory-import" || kind === "model-setup" || kind === "open-setup" || kind === "open-tui") return "Channel, model, and setup flows need a human operator in the OpenClaw app; they cannot run from a delegated agent request.";
	}
	async runOperation(operation, provenance) {
		await this.requireVerifiedInference();
		if (operation.kind === "open-tui") {
			this.clearPendingProposals();
			return {
				text: "Opening your normal agent TUI. Use /openclaw there to come back.",
				action: "open-tui",
				handoff: operation
			};
		}
		if (operation.kind === "open-setup") {
			this.clearPendingProposals();
			if (this.opts.surface === "gateway") return {
				text: "Open Settings to change your model or connect a channel. To change providers from a shell, run `openclaw onboard` on the machine running OpenClaw.",
				action: "none"
			};
			if (operation.target !== "channels" && operation.target !== "search" && operation.target !== "gateway") return {
				text: "Setup can replace the inference route powering this session. Exit OpenClaw and run `openclaw onboard`; it saves only a route that passes a live test. Then start OpenClaw again.",
				action: "none"
			};
			let handoff = operation;
			if (handoff.target === "channels" && !handoff.channel) {
				const channel = this.lastSensitiveChannel;
				if (!channel) {
					this.awaitingSetupChannel = true;
					return {
						text: "Which channel should I open in the masked terminal wizard?",
						action: "none"
					};
				}
				this.lastSensitiveChannel = void 0;
				handoff = {
					...handoff,
					channel
				};
			}
			this.awaitingSetupChannel = false;
			return {
				text: `Opening the ${handoff.target === "channels" ? `${handoff.channel ?? "channel"} setup` : handoff.target === "search" ? "web search setup" : "Gateway setup"} wizard.`,
				action: "open-setup",
				handoff
			};
		}
		if (operation.kind === "channel-setup") return {
			text: await this.startChannelSetupWizard(operation.channel),
			action: "none"
		};
		if (operation.kind === "skills-setup") return {
			text: await this.startSkillsSetupWizard(),
			action: "none"
		};
		if (operation.kind === "search-setup") return {
			text: await this.startSearchSetupWizard(),
			action: "none"
		};
		if (operation.kind === "gateway-config-setup") return {
			text: await this.startGatewaySetupWizard(),
			action: "none"
		};
		if (operation.kind === "memory-import") return {
			text: await this.startMemoryImportWizard(),
			action: "none"
		};
		if (operation.kind === "model-setup") return await this.startModelSetup(operation.workspace);
		const capture = createCaptureRuntime();
		if (isPersistentSystemAgentOperation(operation) && !this.opts.yes) {
			this.clearPendingProposals();
			this.pending = operation;
			await executeSystemAgentOperation(operation, capture, {
				approved: false,
				deps: this.commandDeps()
			});
			return {
				text: [
					provenance,
					capture.read(),
					approvalQuestion(operation)
				].filter(Boolean).join("\n\n"),
				action: "none"
			};
		}
		let result;
		try {
			result = await (this.opts.executeOperation ?? executeSystemAgentOperation)(operation, capture, {
				approved: this.opts.yes === true || !isPersistentSystemAgentOperation(operation),
				deps: this.commandDeps(),
				beforePersistentApply: async () => {
					await this.requirePersistentApplyInference(capture);
				},
				onVerifiedInferenceChanged: (binding) => this.rebindVerifiedInference(binding)
			});
		} catch (error) {
			if (isSystemAgentInferenceUnavailableError(error)) throw error;
			capture.error(formatOperationError(error));
		}
		const verify = result?.applied ? await this.verifyConfigAfterWrite() : null;
		const followUp = this.armFollowUp(result?.followUp);
		const reply = [
			provenance,
			capture.read(),
			verify,
			followUp
		].filter(Boolean).join("\n\n");
		if (operation.kind === "none" && reply.includes("Bye.")) return {
			text: reply,
			action: "exit"
		};
		return {
			text: reply,
			action: "none"
		};
	}
	async loadOverview() {
		const verifiedRoute = await this.requireVerifiedInference();
		return {
			...this.opts.deps?.loadOverview ? await this.opts.deps.loadOverview() : await loadSystemAgentOverview(),
			defaultModel: verifiedRoute.modelLabel
		};
	}
	async planGreeting(params) {
		const planner = this.opts.planGreeting;
		const plan = planner ? await planner(params) : await import("./assistant-C4rAHJQH.js").then(({ planSystemAgentGreetingWithConfiguredModel }) => planSystemAgentGreetingWithConfiguredModel({
			...params,
			verifiedInference: this.verifiedInference,
			deps: this.opts.deps
		}));
		if (plan) await this.requireVerifiedInference();
		return plan;
	}
	async requireVerifiedInference() {
		const binding = this.verifiedInference;
		if (this.agentSession.verifiedInference !== binding) return this.throwInferenceUnavailable();
		try {
			const route = await resolveSystemAgentVerifiedInferenceRoute(binding, this.opts.deps);
			if (route) return route;
		} catch (error) {
			return this.throwInferenceUnavailable([error]);
		}
		return this.throwInferenceUnavailable();
	}
	async requirePersistentApplyInference(runtime) {
		const binding = this.verifiedInference;
		if (this.agentSession.verifiedInference !== binding) return this.throwInferenceUnavailable();
		try {
			const { resolvePersistentApplyInference } = await import("./system-agent/setup-inference.js");
			const route = await resolvePersistentApplyInference({
				binding,
				runtime,
				deps: this.opts.deps
			});
			if (route) return route;
		} catch (error) {
			if (isSystemAgentInferenceUnavailableError(error)) return this.throwInferenceUnavailable(error.failures, false);
			return this.throwInferenceUnavailable([error], false);
		}
		return this.throwInferenceUnavailable([], false);
	}
	rebindVerifiedInference(binding) {
		if (binding.execution.agentId !== this.verifiedInference.execution.agentId) return;
		delete this.agentSession.cliSession;
		this.verifiedInference = binding;
		this.agentSession.verifiedInference = binding;
	}
	throwInferenceUnavailable(failures = [], cancelWizard = true) {
		this.pending = null;
		this.hostProposalResolution = void 0;
		this.agentSession.proposalRef.current = void 0;
		this.agentSession.proposalRef.operation = void 0;
		delete this.agentSession.cliSession;
		if (cancelWizard) this.wizardBridge?.session.cancel();
		this.wizardBridge = null;
		this.lastSensitiveChannel = void 0;
		this.awaitingSetupChannel = false;
		this.history.splice(0);
		throw new SystemAgentInferenceUnavailableError("conversation", failures);
	}
	/**
	* Post-write hook: re-validate openclaw.json after every applied operation.
	* On failure the exact schema issues go straight back into the conversation
	* (and to the AI, which proposes one corrective command) so a bad write is
	* caught and fixed in the same chat instead of surfacing at gateway start.
	*/
	async verifyConfigAfterWrite() {
		return await verifyConfigAfterSystemAgentWrite((message) => this.resolveAssistantTurn(message, false));
	}
	commandDeps() {
		if (!this.opts.deps && !this.opts.surface) return;
		return {
			...this.opts.deps,
			...this.opts.surface ? { setupSurface: this.opts.surface } : {}
		};
	}
	clearPendingProposals() {
		this.pending = null;
		this.agentSession.proposalRef.current = void 0;
		this.agentSession.proposalRef.operation = void 0;
	}
	armFollowUp(operation) {
		if (operation?.kind !== "model-setup") return null;
		return ["No usable inference route is configured, so OpenClaw cannot continue.", "Run `openclaw onboard` on the machine running OpenClaw; it saves only a route that passes a live test."].join("\n");
	}
	async startChannelSetupWizard(channel) {
		this.clearPendingProposals();
		this.lastSensitiveChannel = void 0;
		const beforePersistentApply = async (runtime) => {
			await this.requirePersistentApplyInference(runtime);
		};
		const runWizard = this.opts.runChannelSetupWizard ?? ((ch, prompter, guard) => defaultChannelSetupWizardRunner(ch, prompter, guard));
		return await this.startHostedWizard({
			kind: "channel",
			label: channel,
			autoSelectChannel: channel,
			run: (prompter) => runWizard(channel, prompter, beforePersistentApply)
		});
	}
	async startSkillsSetupWizard() {
		this.clearPendingProposals();
		const beforePersistentApply = async (runtime) => {
			await this.requirePersistentApplyInference(runtime);
		};
		const runWizard = this.opts.runSkillsSetupWizard ?? defaultSkillsSetupWizardRunner;
		return await this.startHostedWizard({
			kind: "skills",
			label: "skills",
			run: (prompter) => runWizard(prompter, beforePersistentApply)
		});
	}
	async startSearchSetupWizard() {
		this.clearPendingProposals();
		const beforePersistentApply = async (runtime) => {
			await this.requirePersistentApplyInference(runtime);
		};
		const runWizard = this.opts.runSearchSetupWizard ?? defaultSearchSetupWizardRunner;
		return await this.startHostedWizard({
			kind: "search",
			label: "web search",
			run: (prompter) => runWizard(prompter, beforePersistentApply)
		});
	}
	async startGatewaySetupWizard() {
		this.clearPendingProposals();
		const beforePersistentApply = async (runtime) => {
			await this.requirePersistentApplyInference(runtime);
		};
		const runWizard = this.opts.runGatewaySetupWizard ?? defaultGatewaySetupWizardRunner;
		const firstStep = await this.startHostedWizard({
			kind: "gateway",
			label: "gateway",
			run: (prompter) => runWizard(prompter, beforePersistentApply)
		});
		if (this.opts.surface !== "gateway" || this.wizardBridge === null) return firstStep;
		return [["Before we start: changing the Gateway port, bind address, or auth credential requires a Gateway restart to apply.", "That restart may disconnect this chat, and you may need to sign in to the Control UI again with the new address or credential."].join(" "), firstStep].filter(Boolean).join("\n\n");
	}
	async startMemoryImportWizard() {
		this.clearPendingProposals();
		const beforePersistentApply = async (runtime) => {
			await this.requirePersistentApplyInference(runtime);
		};
		const runWizard = this.opts.runMemoryImportWizard ?? defaultMemoryImportWizardRunner;
		const providerOutcomes = [];
		return await this.startHostedWizard({
			kind: "memory-import",
			label: "memory import",
			memoryImportProviders: providerOutcomes,
			run: (prompter) => runWizard(prompter, beforePersistentApply, (outcome) => providerOutcomes.push(outcome))
		});
	}
	async startHostedWizard(params) {
		this.lastSensitiveChannel = void 0;
		const completion = {
			status: "applied",
			...params.memoryImportProviders ? { memoryImportProviders: params.memoryImportProviders } : {}
		};
		const session = new WizardSession(async (prompter) => {
			const result = await params.run(prompter);
			if (typeof result === "string") completion.status = result;
			else if (result) completion.memoryImport = result;
		});
		this.wizardBridge = {
			session,
			step: null,
			kind: params.kind,
			label: params.label,
			completion,
			...params.autoSelectChannel ? { autoSelectChannel: params.autoSelectChannel } : {}
		};
		return await this.pumpWizardBridge();
	}
	async startModelSetup(_workspace) {
		this.clearPendingProposals();
		return {
			text: ["Changing provider credentials would replace the inference route powering this session.", "Stop the OpenClaw host through whatever started it. Run `openclaw onboard` on the machine running OpenClaw: it stages credentials, live-tests the new route, and saves only a passing setup. Then restart the host and return to OpenClaw."].join("\n"),
			action: "none"
		};
	}
	/**
	* "connect telegram" already names the channel; answer the wizard's channel
	* selection step automatically instead of echoing the full channel wall.
	*/
	tryAutoSelectChannel(step) {
		const bridge = this.wizardBridge;
		const channel = bridge?.autoSelectChannel;
		if (!bridge || !channel) return null;
		if (step.type !== "select" && step.type !== "multiselect") return null;
		const match = (step.options ?? []).find((option) => typeof option.value === "string" && option.value.toLowerCase() === channel);
		if (!match) return null;
		bridge.autoSelectChannel = void 0;
		return { value: step.type === "multiselect" ? [match.value] : match.value };
	}
	/** Advance the hosted wizard to the next interactive step (or completion). */
	async pumpWizardBridge() {
		const bridge = this.wizardBridge;
		if (!bridge) return "";
		const result = await bridge.session.next();
		if (result.done) {
			this.wizardBridge = null;
			const label = bridge.label;
			if (result.status === "done") {
				if (bridge.kind === "memory-import") return await this.finishMemoryImportWizard(bridge.completion.memoryImport);
				if (bridge.completion.status === "kept-current") return `${label[0]?.toUpperCase() ?? "S"}${label.slice(1)} setup kept the current configuration. Nothing was changed.`;
				const audit = bridge.kind === "channel" ? {
					operation: "channels.setup",
					summary: `Configured channel ${label} via chat setup`,
					details: { channel: label }
				} : bridge.kind === "skills" ? {
					operation: "skills.setup",
					summary: "Completed skills dependency setup via chat",
					details: { capability: "skills" }
				} : bridge.kind === "search" ? {
					operation: "search.setup",
					summary: "Configured web search via chat setup",
					details: { capability: "web-search" }
				} : {
					operation: "gateway.setup",
					summary: "Configured Gateway via chat setup",
					details: { capability: "gateway" }
				};
				try {
					await (this.opts.appendAuditEntry ?? (await import("./system-agent/audit.js")).appendSystemAgentAuditEntry)(audit);
				} catch (error) {
					log.warn(`${bridge.kind} setup completed without audit entry: ${formatErrorMessage(error)}`);
				}
				const verify = await this.verifyConfigAfterWrite();
				return [...bridge.kind === "channel" ? [`Done — ${label} is configured.`, "Say `restart gateway` to apply channel changes, or `channels` to review."] : bridge.kind === "skills" ? ["Done — skills dependency setup is complete."] : bridge.kind === "search" ? ["Done — web search setup is complete.", "Restart the Gateway if the selected provider or plugin changed."] : ["Done — gateway settings saved.", "Restart the Gateway to apply them (`restart gateway`)."], verify ?? ""].filter(Boolean).join("\n");
			}
			if (bridge.kind === "memory-import") await this.auditMemoryImportProviders(bridge.completion.memoryImportProviders ?? []);
			if (result.status === "cancelled") return `${label[0]?.toUpperCase() ?? "S"}${label.slice(1)} setup cancelled. Nothing was changed beyond completed steps.`;
			return `${label[0]?.toUpperCase() ?? "S"}${label.slice(1)} setup stopped: ${result.error ?? "unknown error"}`;
		}
		bridge.step = result.step ?? null;
		if (bridge.step) {
			const auto = this.tryAutoSelectChannel(bridge.step);
			if (auto) {
				const step = bridge.step;
				bridge.step = null;
				await bridge.session.answer(step.id, auto.value);
				return await this.pumpWizardBridge();
			}
			if (this.opts.surface === "cli" && bridge.step.sensitive === true) {
				bridge.session.cancel();
				this.wizardBridge = null;
				if (bridge.kind === "channel") {
					this.lastSensitiveChannel = bridge.label;
					return ["Sensitive input is not accepted in the OpenClaw chat because terminal input is visible.", `Say \`open channel wizard\` and I'll hand you to the masked terminal wizard for ${bridge.label}, or run \`openclaw channels add --channel ${bridge.label}\` yourself later.`].join("\n");
				}
				if (bridge.kind === "gateway") return ["Sensitive input is not accepted in the OpenClaw chat because terminal input is visible.", "Say `open gateway wizard` and I'll hand you to the masked terminal wizard, or run `openclaw configure --section gateway` yourself later."].join("\n");
				return ["Sensitive input is not accepted in the OpenClaw chat because terminal input is visible.", "Say `open search wizard` and I'll hand you to the masked terminal wizard, or run `openclaw configure --section web` yourself later."].join("\n");
			}
			if (bridge.step.type === "note" || bridge.step.type === "progress") {
				const step = bridge.step;
				bridge.step = null;
				await bridge.session.answer(step.id, void 0);
				const next = await this.pumpWizardBridge();
				return [renderWizardStep(step), next].filter(Boolean).join("\n\n");
			}
			if (bridge.step.type === "action" && bridge.step.executor !== "client") {
				const step = bridge.step;
				bridge.step = null;
				await bridge.session.answer(step.id, true);
				return await this.pumpWizardBridge();
			}
		}
		return bridge.step ? renderWizardStep(bridge.step) : "";
	}
	async auditMemoryImportProviders(providers) {
		const importedProviders = providers.filter(hasConfirmedMemoryImportCount).filter((provider) => provider.migrated > 0);
		const indeterminateProviders = providers.filter((provider) => provider.copiesIndeterminate === true);
		const importedItems = importedProviders.reduce((total, provider) => total + provider.migrated, 0);
		if (importedItems === 0 && indeterminateProviders.length === 0) return;
		const providerSummary = formatMemoryImportProviders(importedProviders);
		const indeterminateSummary = indeterminateProviders.map((provider) => `${provider.label} (copy count indeterminate)`).join(", ");
		const auditSummary = indeterminateProviders.length > 0 ? `Memory import failed partway via chat: ${[providerSummary ? `confirmed ${providerSummary}` : "", indeterminateSummary].filter(Boolean).join("; ")}` : `Imported memory via chat: ${providerSummary}`;
		try {
			await (this.opts.appendAuditEntry ?? (await import("./system-agent/audit.js")).appendSystemAgentAuditEntry)({
				operation: "memory.import",
				summary: auditSummary,
				details: {
					...indeterminateProviders.length > 0 ? {
						confirmedItems: importedItems,
						copiesIndeterminate: true
					} : { totalItems: importedItems },
					providers: providers.map((provider) => provider.copiesIndeterminate === true ? {
						providerId: provider.providerId,
						copiesIndeterminate: true
					} : {
						providerId: provider.providerId,
						items: provider.migrated,
						...provider.failure ? { partial: true } : {}
					})
				}
			});
		} catch (error) {
			log.warn(`memory import completed without audit entry: ${formatErrorMessage(error)}`);
		}
	}
	async finishMemoryImportWizard(outcome) {
		if (!outcome) return "Memory import did not complete. No outcome was reported, and no success was assumed.";
		if (outcome.status === "workspace-missing") return [`Memory import is unavailable because the default agent workspace does not exist at ${outcome.workspace}.`, "Finish onboarding first with `openclaw onboard`, then retry."].join("\n");
		if (outcome.status === "nothing-to-import") return "Nothing to import — no new memory files were detected in supported local agent homes.";
		if (outcome.status === "skipped") return "Memory import skipped. Nothing was copied.";
		const confirmedProviders = outcome.providers.filter(hasConfirmedMemoryImportCount);
		const importedProviders = confirmedProviders.filter((provider) => provider.migrated > 0);
		const failedProviders = confirmedProviders.filter((provider) => provider.failure);
		const indeterminateProviders = outcome.providers.filter((provider) => provider.copiesIndeterminate === true);
		const importedItems = importedProviders.reduce((total, provider) => total + provider.migrated, 0);
		const providerSummary = formatMemoryImportProviders(importedProviders);
		await this.auditMemoryImportProviders(outcome.providers);
		if (importedItems === 0) {
			if (indeterminateProviders.length > 0) return ["Memory import failed partway. Some files may have been copied before the failure.", `Copy counts are indeterminate for: ${indeterminateProviders.map((provider) => provider.label).join(", ")}.`].join("\n");
			if (failedProviders.length > 0) return ["Memory import did not complete. No files were copied.", `Failed providers: ${failedProviders.map((provider) => provider.label).join(", ")}.`].join("\n");
			return "Nothing was imported. No files were copied.";
		}
		const sourceSummary = importedProviders.length === 1 ? importedProviders[0].label : providerSummary;
		return [`Imported ${formatItemCount(importedItems)} from ${sourceSummary}.`, indeterminateProviders.length > 0 ? `Memory import failed partway for ${indeterminateProviders.map((provider) => provider.label).join(", ")}; some additional files may have been copied before the failure.` : failedProviders.length > 0 ? `Some providers did not complete: ${failedProviders.map((provider) => provider.label).join(", ")}.` : ""].filter(Boolean).join("\n");
	}
	async resolveWizardBridgeReply(text) {
		const bridge = this.wizardBridge;
		if (!bridge) return "";
		if (/^(cancel|abort|stop|quit|exit)$/i.test(text.trim())) {
			bridge.session.cancel();
			return await this.pumpWizardBridge();
		}
		const step = bridge.step;
		if (!step) return await this.pumpWizardBridge();
		const answer = parseWizardAnswer(step, text);
		if (!answer) return ["I could not match that answer.", renderWizardStep(step)].join("\n");
		const validationError = await bridge.session.answer(step.id, answer.value);
		if (validationError) return [validationError, renderWizardStep(step)].join("\n\n");
		return await this.pumpWizardBridge();
	}
};
//#endregion
export { assertLocalGatewaySetupMode as i, SystemAgentChatEngine as n, SystemAgentWizardAnswerError as r, GATEWAY_SETUP_AFTER_WRITE as t };
