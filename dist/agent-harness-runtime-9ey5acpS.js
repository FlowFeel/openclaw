import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { l as redactToolDetail } from "./redact-DUpJZuMu.js";
import "./fs-safe-defaults-BsoUVa5C.js";
import "./utils-Bs67j6-3.js";
import "./errors-D-7D3ZtF.js";
import "./version-CeFj_iGk.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import "./agent-events-COCf-9-O.js";
import { u as listCodexAppServerExtensionFactories } from "./loader-si71apUX.js";
import "./agent-scope-DyEposw2.js";
import { n as createFileLockManager } from "./file-lock-CLjy2n00.js";
import { r as isPidAlive } from "./pid-alive-ClLrY9h9.js";
import "./file-lock-manager-BdC0K4tY.js";
import "./registry-BjwLx-0R.js";
import "./provider-request-config-DZemMjbU.js";
import "./registry-DxqpqZwd.js";
import { g as joinPresentTextSegments, t as getGlobalHookRunner } from "./hook-runner-global-CRNklGqK.js";
import "./session-accessor.sqlite-B9iW7DOt.js";
import "./agent-tools.before-tool-call-Cp_0kD4x.js";
import "./tool-result-error-D4i-Z2FR.js";
import "./model-auth-D32HIbZ7.js";
import "./execution-auth-binding-CmucNoqo.js";
import { n as SessionWriteLockTimeoutError, t as SessionWriteLockStaleError } from "./session-write-lock-error-5gHYmvxH.js";
import { c as mergeAgentRunAttemptTerminal, d as projectAgentRunAttemptTerminal, f as setAgentRunAttemptTerminalFailure, u as normalizeAgentRunAttemptTerminal } from "./agent-run-terminal-outcome-DXPF-TAc.js";
import "./run-termination-nrLSEQ_b.js";
import "./diagnostic-DiTvyQCh.js";
import { g as queueEmbeddedAgentMessageWithOutcome } from "./runs-Du_qIW6W.js";
import "./tool-replay-safety-CRqM1och.js";
import { m as shouldLoadRequesterScopedMcpHarnessRuntime } from "./agent-bundle-mcp-manager-api-BO7-Y1u4.js";
import "./tools-DfrDsxdD.js";
import "./agent-end-side-effects-BrmMcpME.js";
import "./local-model-lean-CeG7_aMD.js";
import "./gateway-CRcKH8Wu.js";
import "./tool-mutation-BmnNoynG.js";
import "./logger-BeJ7WAxI.js";
import "./heartbeat-tool-response-7o9KGNyQ.js";
import { i as resolveToolDisplay, t as formatToolDetail } from "./tool-display-Cz3bW8uZ.js";
import "./streaming-B45j2FQx.js";
import "./embedded-agent-messaging-BHU1Makt.js";
import "./embedded-agent-subscribe.tools-D7tyhgah.js";
import "./embedded-agent-message-tool-source-reply-DOQB4HRp.js";
import "./openclaw-tools-CoDz4vSH.js";
import "./bootstrap-files-BmlEwlGk.js";
import { _ as wrapPluginSystemContextSection } from "./attempt.prompt-helpers-vAfr0YHA.js";
import "./nodes-utils-D89B91st.js";
import "./hook-helpers-CF3av4GZ.js";
import "./tools-CnfMpH7Q.js";
import "./tool-schema-projection-ZrMdwk4s.js";
import "./attempt-tool-construction-plan-D4Oh4XYT.js";
import { n as prepareWatchedSessionsPrompt, t as buildWatchedSessionsPromptLines } from "./watched-sessions-prompt-xnopYGHE.js";
import "./attempt.thread-helpers-CM0JLs3S.js";
import "./settled-turn-finalization-result--gesCUtm.js";
import { i as resolveSessionWriteLockOptions, t as acquireSessionWriteLock$1 } from "./session-write-lock-Cd3jxq-d.js";
import { s as buildAgentHookContext } from "./lifecycle-hook-helpers-CVo05dyc.js";
import "./tool-result-middleware-TepndI6l.js";
import "./context-C139Uthy.js";
import "./sandbox-BHXEMQc2.js";
import "./result-fallback-classifier-Cn7gPY3u.js";
import "./build-D_NaYZbq.js";
import { n as parseSessionLockFilePayload, r as readSessionLockProcessStartTime, t as inspectSessionLockFileContention } from "./session-lock-file-inspection-DV0su9ha.js";
import "./native-hook-relay-CVCNc5L4.js";
import path from "node:path";
import fs from "node:fs/promises";
import { scheduler } from "node:timers/promises";
//#region src/plugin-sdk/session-write-lock-runtime.ts
const FILE_LOCKS = createFileLockManager("openclaw.session-write-lock.sdk-compat");
const ABORT_POLL_MS = 100;
const WATCHDOG_INTERVAL_MS = 6e4;
const ORPHAN_GRACE_MS = 3e4;
const SHORT_ORPHAN_GRACE_MS = 5e3;
const CLEANUP_SIGNALS = [
	"SIGINT",
	"SIGTERM",
	"SIGQUIT",
	"SIGABRT"
];
const signalCleanup = /* @__PURE__ */ new Map();
let watchdog;
function positiveMs(value, fallback, allowInfinity = false) {
	if (value === Number.POSITIVE_INFINITY) return allowInfinity ? value : fallback;
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}
async function readOwner(lockPath, staleMs, orphanGraceMs) {
	let payload = null;
	let missing = false;
	try {
		payload = parseSessionLockFilePayload(await fs.readFile(lockPath, "utf8"));
	} catch (error) {
		missing = error.code === "ENOENT";
	}
	const { inspection, report } = await inspectSessionLockFileContention({
		lockPath,
		payload,
		staleMs,
		nowMs: Date.now(),
		orphanGraceMs,
		reclaimLockWithoutStarttime: true,
		respectMaxHold: true
	});
	const { pid } = inspection;
	return {
		missing,
		pid,
		owner: pid === null ? "owner=unknown" : `pid=${pid} alive=${isPidAlive(pid)}`,
		reasons: report ? inspection.staleReasons : []
	};
}
function throwIfAborted(signal) {
	if (!signal?.aborted) return;
	if (signal.reason instanceof Error) throw signal.reason;
	const error = new Error("request aborted", { cause: signal.reason });
	error.name = "AbortError";
	throw error;
}
function ensureSignalCleanup() {
	if (signalCleanup.size > 0) return;
	for (const signal of CLEANUP_SIGNALS) {
		const listener = () => {
			const reraise = process.listenerCount(signal) === 1;
			FILE_LOCKS.reset();
			if (watchdog) {
				clearInterval(watchdog);
				watchdog = void 0;
			}
			if (reraise) {
				process.off(signal, listener);
				signalCleanup.delete(signal);
				try {
					process.kill(process.pid, signal);
				} catch {}
			}
		};
		try {
			process.on(signal, listener);
			signalCleanup.set(signal, listener);
		} catch {}
	}
}
function ensureWatchdog() {
	if (watchdog || process.env.VITEST === "true") return;
	watchdog = setInterval(() => {
		const now = Date.now();
		for (const held of FILE_LOCKS.heldEntries()) {
			const maxHoldMs = Number(held.metadata.maxHoldMs);
			if (Number.isFinite(maxHoldMs) && now - held.acquiredAt > maxHoldMs) {
				console.warn(`[session-write-lock] releasing lock held for ${now - held.acquiredAt}ms (max=${maxHoldMs}ms): ${held.lockPath}`);
				held.forceRelease().catch(() => void 0);
			}
		}
	}, WATCHDOG_INTERVAL_MS);
	watchdog.unref?.();
}
async function acquireFileArtifactLock(params) {
	throwIfAborted(params.signal);
	ensureSignalCleanup();
	ensureWatchdog();
	const defaults = resolveSessionWriteLockOptions();
	const timeoutMs = positiveMs(params.timeoutMs, defaults.timeoutMs, true);
	const staleMs = positiveMs(params.staleMs, defaults.staleMs);
	const maxHoldMs = positiveMs(params.maxHoldMs, defaults.maxHoldMs);
	const orphanGraceMs = timeoutMs < ORPHAN_GRACE_MS ? SHORT_ORPHAN_GRACE_MS : ORPHAN_GRACE_MS;
	const targetPath = path.resolve(params.sessionFile);
	await fs.mkdir(path.dirname(targetPath), { recursive: true });
	const startedAt = Date.now();
	const inspectArtifact = async (lockPath, payload, nowMs, heldByThisProcess = false) => {
		await scheduler.yield();
		return await inspectSessionLockFileContention({
			lockPath,
			payload,
			staleMs,
			nowMs,
			orphanGraceMs,
			heldByThisProcess,
			reclaimLockWithoutStarttime: true,
			respectMaxHold: true
		});
	};
	while (true) {
		throwIfAborted(params.signal);
		const remainingMs = timeoutMs === Number.POSITIVE_INFINITY ? timeoutMs : Math.max(0, timeoutMs - (Date.now() - startedAt));
		const lockPath = `${targetPath}.lock`;
		if (remainingMs <= 0) throw new SessionWriteLockTimeoutError({
			timeoutMs,
			owner: (await readOwner(lockPath, staleMs, orphanGraceMs)).owner,
			lockPath
		});
		try {
			const lock = await FILE_LOCKS.acquire(targetPath, {
				staleMs,
				timeoutMs: params.signal ? Math.min(remainingMs, ABORT_POLL_MS) : remainingMs,
				retry: {
					minTimeout: 50,
					maxTimeout: 1e3,
					factor: 1
				},
				staleRecovery: "remove-if-unchanged",
				reentrantOwner: params.reentrantOwner,
				metadata: { maxHoldMs },
				payload: () => {
					const starttime = readSessionLockProcessStartTime(process.pid);
					return {
						pid: process.pid,
						createdAt: (/* @__PURE__ */ new Date()).toISOString(),
						maxHoldMs,
						...starttime === null ? {} : { starttime }
					};
				},
				parsePayload: parseSessionLockFilePayload,
				shouldReclaim: async ({ lockPath: contenderPath, payload, nowMs, heldByThisProcess }) => (await inspectArtifact(contenderPath, payload, nowMs, heldByThisProcess)).report,
				shouldRemoveStaleLock: async ({ lockPath: contenderPath, payload }) => (await inspectArtifact(contenderPath, payload, Date.now())).removable
			});
			if (params.signal?.aborted) {
				await lock.release().catch(() => void 0);
				throwIfAborted(params.signal);
			}
			return { release: () => lock.release() };
		} catch (error) {
			throwIfAborted(params.signal);
			const code = error.code;
			if (params.signal && code === "file_lock_timeout" && remainingMs > ABORT_POLL_MS) continue;
			const errorLockPath = error.lockPath ?? `${targetPath}.lock`;
			const diagnostics = await readOwner(errorLockPath, staleMs, orphanGraceMs);
			if (code === "file_lock_stale") {
				if (diagnostics.missing || diagnostics.reasons.length === 0) continue;
				throw new SessionWriteLockStaleError({
					owner: diagnostics.owner,
					lockPath: errorLockPath,
					staleReasons: diagnostics.reasons
				});
			}
			if (code === "file_lock_timeout") {
				if (diagnostics.pid !== process.pid && diagnostics.reasons.some((reason) => reason === "too-old" || reason === "hold-exceeded")) throw new SessionWriteLockStaleError({
					owner: diagnostics.owner,
					lockPath: errorLockPath,
					staleReasons: diagnostics.reasons
				});
				throw new SessionWriteLockTimeoutError({
					timeoutMs,
					owner: diagnostics.owner,
					lockPath: errorLockPath
				});
			}
			throw error;
		}
	}
}
/** Acquires the shipped file-artifact lock or the canonical SQLite session lease. */
async function acquireSessionWriteLock(params) {
	return params.targetKind === "session-key" ? await acquireSessionWriteLock$1(params) : await acquireFileArtifactLock(params);
}
//#endregion
//#region src/agents/harness/prompt-compaction-hook-helpers.ts
/**
* Agent harness prompt and compaction hook helpers.
*
* Harness runtimes use this to run plugin hooks around prompt construction and
* compaction while keeping hook failures non-fatal.
*/
const log$1 = createSubsystemLogger("agents/harness");
/** Runs before-prompt hooks and returns the adjusted prompt fields. */
async function resolveAgentHarnessBeforePromptBuildResult(params) {
	const hookRunner = getGlobalHookRunner();
	const hasHeartbeatContribution = params.ctx.trigger === "heartbeat" && params.bootstrapContextRunKind !== "commitment-only" && Boolean(hookRunner?.hasHooks("heartbeat_prompt_contribution"));
	if (!hasHeartbeatContribution && !hookRunner?.hasHooks("before_prompt_build")) return {
		prompt: params.prompt,
		developerInstructions: params.developerInstructions,
		promptInputRange: {
			start: 0,
			end: params.prompt.length
		}
	};
	const hookCtx = buildAgentHookContext(params.ctx);
	const promptEvent = {
		prompt: params.prompt,
		messages: params.messages
	};
	const heartbeatResult = hasHeartbeatContribution && hookRunner ? await hookRunner.runHeartbeatPromptContribution({
		sessionKey: params.ctx.sessionKey,
		agentId: params.ctx.agentId,
		heartbeatName: "heartbeat"
	}, hookCtx).catch((error) => {
		log$1.warn(`heartbeat_prompt_contribution hook failed: ${String(error)}`);
	}) : void 0;
	const promptBuildResult = hookRunner?.hasHooks("before_prompt_build") ? await hookRunner.runBeforePromptBuild(promptEvent, hookCtx).catch((error) => {
		log$1.warn(`before_prompt_build hook failed: ${String(error)}`);
	}) : void 0;
	const systemPrompt = resolvePromptBuildSystemPrompt({
		developerInstructions: params.developerInstructions,
		promptBuildResult
	});
	const promptPrefix = joinPresentTextSegments([heartbeatResult?.prependContext, promptBuildResult?.prependContext]);
	const promptSuffix = joinPresentTextSegments([heartbeatResult?.appendContext, promptBuildResult?.appendContext]);
	const prompt = joinPresentTextSegments([
		promptPrefix,
		params.prompt,
		promptSuffix
	]) ?? params.prompt;
	const promptInputStart = params.prompt.length === 0 ? promptPrefix?.length ?? 0 : promptPrefix ? promptPrefix.length + 2 : 0;
	return {
		prompt,
		...promptBuildResult?.toolsAllow !== void 0 ? { toolsAllow: promptBuildResult.toolsAllow } : {},
		developerInstructions: joinPresentTextSegments([
			wrapPluginSystemContextSection(promptBuildResult?.prependSystemContext),
			systemPrompt,
			wrapPluginSystemContextSection(promptBuildResult?.appendSystemContext)
		]) ?? systemPrompt,
		promptInputRange: {
			start: promptInputStart,
			end: promptInputStart + params.prompt.length
		}
	};
}
function resolvePromptBuildSystemPrompt(params) {
	if (typeof params.promptBuildResult?.systemPrompt === "string") return params.promptBuildResult.systemPrompt;
	return params.developerInstructions;
}
/** Runs best-effort before-compaction hooks for a harness session. */
async function runAgentHarnessBeforeCompactionHook(params) {
	const hookRunner = getGlobalHookRunner();
	if (!hookRunner?.hasHooks("before_compaction")) return;
	try {
		await hookRunner.runBeforeCompaction({
			messageCount: params.messages?.length ?? -1,
			...params.messages ? { messages: params.messages } : {},
			sessionFile: params.sessionFile
		}, buildAgentHookContext(params.ctx));
	} catch (error) {
		log$1.warn(`before_compaction hook failed: ${String(error)}`);
	}
}
/** Runs best-effort after-compaction hooks for a harness session. */
async function runAgentHarnessAfterCompactionHook(params) {
	const hookRunner = getGlobalHookRunner();
	if (!hookRunner?.hasHooks("after_compaction")) return;
	try {
		await hookRunner.runAfterCompaction({
			messageCount: params.messages?.length ?? -1,
			compactedCount: params.compactedCount,
			sessionFile: params.sessionFile
		}, buildAgentHookContext(params.ctx));
	} catch (error) {
		log$1.warn(`after_compaction hook failed: ${String(error)}`);
	}
}
//#endregion
//#region src/agents/harness/codex-app-server-extensions.ts
/**
* Codex app-server extension runner.
*
* Harness integration uses this to let registered extensions observe and adjust
* tool results before they are returned to the agent runtime.
*/
const log = createSubsystemLogger("agents/harness");
/** Creates a runner that applies registered Codex app-server tool-result extensions. */
function createCodexAppServerToolResultExtensionRunner(ctx, factories = listCodexAppServerExtensionFactories()) {
	const handlers = [];
	const runtime = { on(event, handler) {
		if (event === "tool_result") handlers.push(handler);
	} };
	const initPromise = (async () => {
		for (const factory of factories) await factory(runtime);
	})();
	return { async applyToolResultExtensions(event) {
		await initPromise;
		let current = event.result;
		for (const handler of handlers) try {
			const next = await handler({
				...event,
				result: current
			}, ctx);
			if (next?.result) current = next.result;
		} catch (error) {
			const detail = error instanceof Error ? error.message : String(error);
			log.warn(`[codex] tool_result extension failed for ${event.toolName}: ${detail}`);
		}
		return current;
	} };
}
//#endregion
//#region src/plugin-sdk/agent-harness-runtime.ts
/** Default truncation limit for user-facing tool progress output. */
const TOOL_PROGRESS_OUTPUT_MAX_CHARS = 8e3;
/**
* Renders the Watched Sessions prompt block for plugin-owned harness prompts.
* Harness runtimes that assemble their own instruction layers (e.g. Codex)
* must surface the same watched-session facts as the embedded prompt, or the
* model keeps refusing cross-session questions on those runtimes (openclaw#114797).
*/
function buildWatchedSessionsHarnessContext(params) {
	const lines = buildWatchedSessionsPromptLines(prepareWatchedSessionsPrompt({
		enabled: true,
		...params
	}));
	return lines.length > 0 ? lines.join("\n").trimEnd() : void 0;
}
const agentHarnessAttemptTerminal = {
	merge: mergeAgentRunAttemptTerminal,
	normalize: normalizeAgentRunAttemptTerminal,
	project: projectAgentRunAttemptTerminal,
	setFailure: setAgentRunAttemptTerminalFailure
};
/**
* @deprecated Active-run queueing is an internal runtime concern. This legacy
* boolean API only reports immediate queue eligibility and cannot observe async
* runtime rejection; runtime-owned delivery paths should use acceptance-aware
* steering instead of public SDK queueing.
*/
function queueAgentHarnessMessage(sessionId, text, options) {
	return queueEmbeddedAgentMessageWithOutcome(sessionId, text, options).queued;
}
/** Detect prompt image references and load them through the same limits used by embedded runs. */
async function detectAndLoadAgentHarnessPromptImages(params) {
	const [{ resolveImageSanitizationLimits }, { detectAndLoadPromptImages }, { MAX_IMAGE_BYTES }] = await Promise.all([
		import("./image-sanitization-BghTEphW.js"),
		import("./images-B-ZFPbcI.js"),
		import("./media-core/constants.js")
	]);
	return detectAndLoadPromptImages({
		prompt: params.prompt,
		workspaceDir: params.workspaceDir,
		model: params.model,
		existingImages: params.existingImages,
		imageOrder: params.imageOrder,
		media: params.media,
		maxBytes: MAX_IMAGE_BYTES,
		maxDimensionPx: resolveImageSanitizationLimits(params.config).maxDimensionPx,
		workspaceOnly: params.workspaceOnly,
		localRoots: params.localRoots,
		sandbox: params.sandbox
	});
}
/** Load Codex bundle MCP thread config without forcing the heavy config module into SDK imports. */
async function loadCodexBundleMcpThreadConfig(params) {
	const { loadCodexBundleMcpThreadConfig: load } = await import("./codex-mcp-config-DmSbbl9d.js");
	return load(params);
}
/**
* Materialize an MCP App view for a tool executed by a harness-native MCP client.
* The harness supplies a runtime adapter so the view keeps using that exact connection.
*/
async function prepareHarnessNativeMcpAppPreview(params) {
	if (params.runtime.mcpAppsEnabled !== true) return;
	const { buildMcpAppCanvasPayload, fetchMcpAppView } = await import("./mcp-ui-resource-BEH8PBrp.js");
	const view = await fetchMcpAppView({
		runtime: params.runtime,
		serverName: params.serverName,
		toolName: params.toolName,
		uiResourceUri: params.uiResourceUri,
		toolCallId: params.toolCallId,
		toolInput: params.toolInput,
		toolResult: params.toolResult,
		allowedAppToolNames: params.allowedAppToolNames
	});
	if (!view) return;
	return { mcpAppPreview: buildMcpAppCanvasPayload({
		...view,
		...params.runtime.sessionKey ? { originSessionKey: params.runtime.sessionKey } : {},
		...params.resultMetaState ? { resultMetaState: params.resultMetaState } : {}
	}) };
}
/**
* Materialize requester-scoped MCP tools for a harness run (dynamic tools, not
* harness-native MCP config). Lazy-loaded so harness plugins avoid the MCP manager graph.
*/
async function materializeRequesterScopedMcpToolsForHarnessRun(params) {
	if (!shouldLoadRequesterScopedMcpHarnessRuntime(params)) return;
	const { materializeRequesterScopedMcpToolsForHarnessRun: materialize } = await import("./agent-bundle-mcp-harness-CGUYcr6C.js");
	return materialize(params);
}
/** Infer compact display metadata for one tool invocation from its name and arguments. */
function inferToolMetaFromArgs(toolName, args, options) {
	return formatToolDetail(resolveToolDisplay({
		name: toolName,
		args,
		detailMode: options?.detailMode
	}));
}
/**
* Prepare verbose tool output for user-facing progress messages.
*/
function formatToolProgressOutput(output, options) {
	const trimmed = output.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
	if (!trimmed) return;
	const redacted = redactToolDetail(trimmed);
	const maxChars = options?.maxChars ?? 8e3;
	if (redacted.length <= maxChars) return redacted;
	return `${truncateUtf16Safe(redacted, maxChars)}\n...(truncated)...`;
}
/**
* Classify terminal harness turns that completed without assistant output that
* should advance fallback. Deliberate silent replies such as NO_REPLY count as
* intentional output, while whitespace-only text remains fallback-eligible.
* This is intentionally SDK-level so plugin harness adapters such as Codex
* preserve the same OpenClaw-owned fallback signals as the built-in OpenClaw path
* without re-implementing terminal-result policy.
*/
function classifyAgentHarnessTerminalOutcome(params) {
	if (!params.turnCompleted || params.promptError !== void 0 && params.promptError !== null || hasVisibleAssistantText(params.assistantTexts)) return;
	if (params.planText?.trim()) return "planning-only";
	if (params.reasoningText?.trim()) return "reasoning-only";
	return "empty";
}
function hasVisibleAssistantText(assistantTexts) {
	return assistantTexts.some((text) => text.trim().length > 0);
}
//#endregion
export { detectAndLoadAgentHarnessPromptImages as a, loadCodexBundleMcpThreadConfig as c, queueAgentHarnessMessage as d, createCodexAppServerToolResultExtensionRunner as f, acquireSessionWriteLock as g, runAgentHarnessBeforeCompactionHook as h, classifyAgentHarnessTerminalOutcome as i, materializeRequesterScopedMcpToolsForHarnessRun as l, runAgentHarnessAfterCompactionHook as m, agentHarnessAttemptTerminal as n, formatToolProgressOutput as o, resolveAgentHarnessBeforePromptBuildResult as p, buildWatchedSessionsHarnessContext as r, inferToolMetaFromArgs as s, TOOL_PROGRESS_OUTPUT_MAX_CHARS as t, prepareHarnessNativeMcpAppPreview as u };
