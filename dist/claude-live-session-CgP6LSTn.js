import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { n as sliceUtf16Safe, r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { a as addTimerTimeoutGraceMs } from "./number-coercion-Crk_c9KW.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { l as normalizeStringEntries } from "./string-normalization-CRyoFBPt.js";
import "./utils-Bs67j6-3.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { t as createAbortError$1 } from "./abort-signal-DEbc_zqk.js";
import { f as resolveDefaultAgentId, o as resolveAgentConfig } from "./agent-scope-config-Dusa8eSA.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { o as emitTrustedDiagnosticEvent } from "./diagnostic-events-Dt41CZkD.js";
import { c as tryReadJson, u as writeJson } from "./json-C-CW4mQo.js";
import "./json-files-v5WP3doI.js";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.js";
import { t as applyMergePatch } from "./merge-patch-DNAwVDQs.js";
import { t as extractMcpServerMap } from "./bundle-mcp-BRjgdCzH.js";
import { i as classifyFailoverReason } from "./errors-B811vGBl.js";
import { i as scanReasoningTags, r as createReasoningTagTextPartitioner } from "./code-regions-B1zlXqqO.js";
import { d as isTimeoutError, p as resolveFailoverStatus, t as FailoverError } from "./failover-error-BSBBvfXF.js";
import { f as resolveCliToolTerminalReason } from "./run-termination-nrLSEQ_b.js";
import { t as BLOCKED_TOOL_CALL_ABORT_FLOOR_MS } from "./diagnostic-run-activity-3mcrQxEA.js";
import "./embedded-agent-helpers-zm6jLxdk.js";
import { n as toCliBundleMcpServerConfig, t as loadMergedBundleMcpConfig } from "./bundle-mcp-config-DInGKwm1.js";
import { r as resolveMcpBearerBundleConfig } from "./mcp-auth-profile-DiWNmuwf.js";
import { t as callGatewayTool } from "./gateway-CRcKH8Wu.js";
import { n as DEFAULT_PLUGIN_APPROVAL_TIMEOUT_MS, p as truncatePluginApprovalDetail } from "./plugin-approvals-DmWtM_Ej.js";
import { D as minSecurity, E as maxAsk, F as normalizeExecAsk, H as resolveExecModePolicy, K as loadExecApprovals, r as resolveExecApprovalsFromFile } from "./exec-approvals-DpQk_nvk.js";
import { t as extractBalancedJsonFragments } from "./balanced-json-cZHIw6Jd.js";
import { n as OPENCLAW_TOOLS_MCP_SYSTEM_AGENT_PROPOSAL_ENV, t as OPENCLAW_TOOLS_MCP_SYSTEM_AGENT_APPROVAL_ARMED_ENV } from "./openclaw-tools-serve-config-CPi0gqnN.js";
import { a as decodeHeaderEnvPlaceholder, o as normalizeBundleMcpServerConfig, s as normalizeStringRecord } from "./codex-mcp-config-Culuwpp0.js";
import { r as injectCodexMcpConfigArgs } from "./bundle-mcp-codex-C1cYcGzq.js";
import { a as sanitizeExecApprovalWarningTextWithStatus } from "./exec-approval-command-display-Bz0QY5bu.js";
import { t as buildClaudeOwnerKey, v as cliBackendLog, y as formatCliBackendOutputDigest } from "./helpers-ZECrr_yU.js";
import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
import { splitSystemPromptCacheBoundary, stripSystemPromptCacheBoundary } from "@openclaw/ai/internal/shared";
//#region src/agents/cli-runner/bundle-mcp-runtime.ts
function injectBundleMcpBackendArgs(backend, inject) {
	return {
		...backend,
		args: inject(backend.args),
		resumeArgs: inject(backend.resumeArgs ?? backend.args ?? [])
	};
}
async function writeTemporaryBundleMcpJson(prefix, value, fileName = "settings.json", atomic = true) {
	const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), prefix));
	const filePath = path.join(tempDir, fileName);
	if (atomic) await writeJson(filePath, value, { trailingNewline: true });
	else await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf-8");
	return {
		filePath,
		cleanup: () => fs.rm(tempDir, {
			recursive: true,
			force: true
		})
	};
}
function withOpenClawMcpCaptureHeader(config, captureKey, missingServerError) {
	const mcpServers = isRecord(config.mcpServers) ? config.mcpServers : {};
	if (!(isRecord(mcpServers.openclaw) ? mcpServers.openclaw : void 0) && missingServerError) throw new Error(missingServerError);
	return applyMergePatch(config, { mcpServers: { openclaw: { headers: { "x-openclaw-cli-capture-key": captureKey } } } });
}
//#endregion
//#region src/agents/cli-runner/bundle-mcp-claude.ts
/**
* Claude CLI argument helpers for OpenClaw-managed bundle MCP config.
*/
/** Find existing Claude `--mcp-config` argument values. */
function findClaudeMcpConfigPaths(args) {
	const paths = [];
	if (!args?.length) return paths;
	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i] ?? "";
		if (arg === "--mcp-config") {
			while (typeof args[i + 1] === "string" && !args[i + 1]?.startsWith("-")) {
				i += 1;
				const path = normalizeOptionalString(args[i]);
				if (path) paths.push(path);
			}
			continue;
		}
		if (arg.startsWith("--mcp-config=")) {
			const path = normalizeOptionalString(arg.slice(13));
			if (path) paths.push(path);
		}
	}
	return paths;
}
/** Return Claude args with OpenClaw's strict MCP config path injected. */
function mergeClaudeDisallowedTools(args, deniedTools) {
	if (deniedTools.length === 0) return args;
	const next = [];
	const existingDisallowed = [];
	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i] ?? "";
		if (arg === "--disallowedTools" || arg === "--disallowed-tools") {
			while (typeof args[i + 1] === "string" && !args[i + 1]?.startsWith("-")) {
				i += 1;
				existingDisallowed.push(args[i] ?? "");
			}
			continue;
		}
		if (arg.startsWith("--disallowedTools=") || arg.startsWith("--disallowed-tools=")) {
			existingDisallowed.push(arg.slice(arg.indexOf("=") + 1));
			continue;
		}
		next.push(arg);
	}
	next.push("--disallowedTools", [.../* @__PURE__ */ new Set([...existingDisallowed, ...deniedTools])].join(","));
	return next;
}
function injectClaudeWebSearchDisabledArgs(args) {
	return mergeClaudeDisallowedTools(args ?? [], ["WebSearch"]);
}
function injectClaudeMcpConfigArgs(args, mcpConfigPath, mcpToolsDeny, webSearchEnabled) {
	const next = [];
	for (let i = 0; i < (args?.length ?? 0); i += 1) {
		const arg = args?.[i] ?? "";
		if (arg === "--strict-mcp-config") continue;
		if (arg === "--mcp-config") {
			while (typeof args?.[i + 1] === "string" && !args[i + 1]?.startsWith("-")) i += 1;
			continue;
		}
		if (arg.startsWith("--mcp-config=")) continue;
		next.push(arg);
	}
	next.push("--strict-mcp-config", "--mcp-config", mcpConfigPath);
	const deniedTools = Object.entries(mcpToolsDeny ?? {}).flatMap(([serverName, toolNames]) => toolNames.map((toolName) => `mcp__${serverName}__${toolName}`));
	if (webSearchEnabled === false) deniedTools.push("WebSearch");
	return mergeClaudeDisallowedTools(next, deniedTools.toSorted());
}
/** Writes the active per-attempt capture token into OpenClaw's generated Claude MCP config. */
async function writeClaudeMcpCaptureConfig(params) {
	const raw = JSON.parse(await fs.readFile(params.mcpConfigPath, "utf-8"));
	if (!isRecord(raw)) throw new Error("Claude MCP capture requires an object config");
	await fs.writeFile(params.mcpConfigPath, `${JSON.stringify(withOpenClawMcpCaptureHeader(raw, params.captureKey, "Claude MCP capture requires an openclaw server config"), null, 2)}\n`, "utf-8");
}
//#endregion
//#region src/agents/cli-runner/bundle-mcp-gemini.ts
/**
* Gemini CLI bundle MCP adapter that writes temporary system settings files.
*/
const GEMINI_MCP_SERVER_FIELDS = {
	strings: ["type"],
	booleans: ["trust"]
};
async function readJsonObject(filePath) {
	const raw = await tryReadJson(filePath);
	return raw && typeof raw === "object" && !Array.isArray(raw) ? { ...raw } : {};
}
async function readGeminiBaseSettings(inheritedEnv) {
	const settingsPath = inheritedEnv?.GEMINI_CLI_SYSTEM_SETTINGS_PATH ?? process.env.GEMINI_CLI_SYSTEM_SETTINGS_PATH;
	return typeof settingsPath === "string" && settingsPath.trim() ? await readJsonObject(settingsPath) : {};
}
function mergeGeminiWebSearchDisabled(base) {
	const existing = isRecord(base.tools) && Array.isArray(base.tools.exclude) ? base.tools.exclude.filter((name) => typeof name === "string") : [];
	return applyMergePatch(base, { tools: { exclude: [.../* @__PURE__ */ new Set([...existing, "google_web_search"])] } });
}
async function writeGeminiSettings(settings, inheritedEnv) {
	const temporary = await writeTemporaryBundleMcpJson("openclaw-gemini-mcp-", settings);
	return {
		env: {
			...inheritedEnv,
			GEMINI_CLI_SYSTEM_SETTINGS_PATH: temporary.filePath
		},
		cleanup: temporary.cleanup
	};
}
async function writeGeminiWebSearchDisabledSettings(inheritedEnv) {
	return await writeGeminiSettings(mergeGeminiWebSearchDisabled(await readGeminiBaseSettings(inheritedEnv)), inheritedEnv);
}
function resolveEnvPlaceholder(value, inheritedEnv) {
	const decoded = decodeHeaderEnvPlaceholder(value);
	if (!decoded) return value;
	const resolved = inheritedEnv?.[decoded.envVar] ?? process.env[decoded.envVar] ?? "";
	return decoded.bearer ? `Bearer ${resolved}` : resolved;
}
function normalizeGeminiServerConfig(server, inheritedEnv, deniedTools) {
	const next = normalizeBundleMcpServerConfig(server, GEMINI_MCP_SERVER_FIELDS);
	const headers = normalizeStringRecord(server.headers);
	if (headers) next.headers = Object.fromEntries(Object.entries(headers).map(([name, value]) => [name, resolveEnvPlaceholder(value, inheritedEnv)]));
	if (deniedTools?.length) {
		const existing = Array.isArray(server.excludeTools) ? server.excludeTools.filter((name) => typeof name === "string") : [];
		next.excludeTools = [.../* @__PURE__ */ new Set([...existing, ...deniedTools])].toSorted();
	}
	return next;
}
/** Writes merged Gemini system settings and returns env plus cleanup hook. */
async function writeGeminiSystemSettings(mergedConfig, inheritedEnv, mcpToolsDeny, webSearchEnabled) {
	const base = await readGeminiBaseSettings(inheritedEnv);
	const normalizedConfig = { mcpServers: Object.fromEntries(Object.entries(mergedConfig.mcpServers).map(([name, server]) => [name, normalizeGeminiServerConfig(server, inheritedEnv, mcpToolsDeny && Object.hasOwn(mcpToolsDeny, name) ? mcpToolsDeny[name] : void 0)])) };
	const settings = applyMergePatch(webSearchEnabled === false ? mergeGeminiWebSearchDisabled(base) : base, {
		mcp: { allowed: Object.keys(normalizedConfig.mcpServers) },
		mcpServers: normalizedConfig.mcpServers
	});
	if (!isRecord(settings.mcp) || !isRecord(settings.mcpServers)) throw new Error("Gemini MCP settings merge produced an invalid object");
	return await writeGeminiSettings(settings, inheritedEnv);
}
/** Writes per-attempt Gemini settings with the active loopback capture token. */
async function writeGeminiMcpCaptureSettings(params) {
	const existingSettingsPath = params.inheritedEnv?.GEMINI_CLI_SYSTEM_SETTINGS_PATH;
	if (!existingSettingsPath) throw new Error("Gemini MCP capture requires prepared system settings");
	const temporary = await writeTemporaryBundleMcpJson("openclaw-gemini-mcp-attempt-", withOpenClawMcpCaptureHeader(await readJsonObject(existingSettingsPath), params.captureKey));
	return {
		env: {
			...params.inheritedEnv,
			GEMINI_CLI_SYSTEM_SETTINGS_PATH: temporary.filePath
		},
		cleanup: temporary.cleanup
	};
}
//#endregion
//#region src/agents/cli-runner/bundle-mcp.ts
/**
* Prepares bundled MCP configuration for CLI runner backends.
*/
async function readExternalMcpConfig(configPath) {
	return { mcpServers: extractMcpServerMap(await tryReadJson(configPath)) };
}
function sortJsonValue(value) {
	if (Array.isArray(value)) return value.map((entry) => sortJsonValue(entry));
	if (!isRecord(value)) return value;
	return Object.fromEntries(Object.keys(value).toSorted().map((key) => [key, sortJsonValue(value[key])]));
}
function normalizeOpenClawLoopbackUrl(value) {
	const match = /^(http:\/\/(?:127\.0\.0\.1|localhost|\[::1\])):\d+(\/mcp)$/.exec(value.trim()) ?? void 0;
	if (!match) return value;
	return `${match[1]}:<openclaw-loopback>${match[2]}`;
}
function canonicalizeSystemAgentTurnStateForResume(server) {
	if (!isRecord(server.env) || server.env["OPENCLAW_TOOLS_MCP_TOOLS"] !== "openclaw") return server;
	return {
		...server,
		env: {
			...server.env,
			[OPENCLAW_TOOLS_MCP_SYSTEM_AGENT_APPROVAL_ARMED_ENV]: "<openclaw-turn-state>",
			[OPENCLAW_TOOLS_MCP_SYSTEM_AGENT_PROPOSAL_ENV]: "<openclaw-turn-state>"
		}
	};
}
function canonicalizeBundleMcpConfigForResume(config) {
	return { mcpServers: sortJsonValue(Object.fromEntries(Object.entries(config.mcpServers).map(([name, server]) => {
		const canonicalServer = canonicalizeSystemAgentTurnStateForResume(server);
		if (name !== "openclaw" || typeof canonicalServer.url !== "string") return [name, sortJsonValue(canonicalServer)];
		return [name, sortJsonValue({
			...canonicalServer,
			url: normalizeOpenClawLoopbackUrl(canonicalServer.url)
		})];
	}))) };
}
const OPENCLAW_MCP_ENV_TEMPLATE_PATTERN = /\$\{(OPENCLAW_MCP_[A-Z0-9_]+)\}/g;
function normalizeMcpToolDenials(value) {
	const entries = Object.entries(value ?? {}).map(([serverName, toolNames]) => [serverName, [...new Set(toolNames)].toSorted()]).filter(([, toolNames]) => toolNames.length > 0).toSorted(([left], [right]) => left.localeCompare(right));
	return entries.length > 0 ? Object.fromEntries(entries) : void 0;
}
function applyCodexMcpToolDenials(config, denials) {
	if (!denials) return config;
	return { mcpServers: Object.fromEntries(Object.entries(config.mcpServers).map(([serverName, server]) => {
		const denied = Object.hasOwn(denials, serverName) ? denials[serverName] : void 0;
		if (!denied?.length) return [serverName, server];
		const toolFilter = isRecord(server.toolFilter) ? server.toolFilter : {};
		const existing = Array.isArray(toolFilter.exclude) ? toolFilter.exclude.filter((name) => typeof name === "string") : [];
		return [serverName, {
			...server,
			toolFilter: {
				...toolFilter,
				exclude: [.../* @__PURE__ */ new Set([...existing, ...denied])].toSorted()
			}
		}];
	})) };
}
function applyMcpServerOverrides(config, overrides) {
	return overrides ? { mcpServers: Object.fromEntries(Object.entries(config.mcpServers).filter(([serverName]) => !Object.hasOwn(overrides, serverName) || overrides[serverName] !== false)) } : config;
}
function resolveOpenClawMcpEnvTemplates(value, env) {
	if (!env) return value;
	if (typeof value === "string") return value.replace(OPENCLAW_MCP_ENV_TEMPLATE_PATTERN, (match, name) => {
		const replacement = env[name];
		return Object.hasOwn(env, name) && replacement !== void 0 ? replacement : match;
	});
	if (Array.isArray(value)) return value.map((entry) => resolveOpenClawMcpEnvTemplates(entry, env));
	if (!isRecord(value)) return value;
	return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, resolveOpenClawMcpEnvTemplates(entry, env)]));
}
async function prepareModeSpecificBundleMcpConfig(params) {
	const mcpToolsDeny = normalizeMcpToolDenials(params.mcpToolsDeny);
	const webSearchDisabled = params.webSearchEnabled === false;
	const configHashInput = mcpToolsDeny || webSearchDisabled ? {
		config: params.mergedConfig,
		mcpToolsDeny,
		webSearchDisabled
	} : params.mergedConfig;
	const serializedConfig = `${JSON.stringify(configHashInput, null, 2)}\n`;
	const mcpConfigHash = crypto.createHash("sha256").update(serializedConfig).digest("hex");
	const serializedResumeConfig = `${JSON.stringify(mcpToolsDeny || webSearchDisabled ? {
		config: canonicalizeBundleMcpConfigForResume(params.mergedConfig),
		mcpToolsDeny,
		webSearchDisabled
	} : canonicalizeBundleMcpConfigForResume(params.mergedConfig), null, 2)}\n`;
	const mcpResumeHash = crypto.createHash("sha256").update(serializedResumeConfig).digest("hex");
	if (params.mode === "codex-config-overrides") {
		const codexConfig = applyCodexMcpToolDenials(params.mergedConfig, mcpToolsDeny);
		return {
			backend: injectBundleMcpBackendArgs(params.backend, (args) => webSearchDisabled ? [
				...injectCodexMcpConfigArgs(args, codexConfig),
				"-c",
				"web_search=\"disabled\""
			] : injectCodexMcpConfigArgs(args, codexConfig)),
			mcpConfigHash,
			mcpResumeHash,
			env: params.env
		};
	}
	if (params.mode === "gemini-system-settings") {
		const settings = await writeGeminiSystemSettings(params.mergedConfig, params.env, mcpToolsDeny, params.webSearchEnabled);
		return {
			backend: params.backend,
			mcpConfigHash,
			mcpResumeHash,
			env: settings.env,
			cleanup: settings.cleanup
		};
	}
	const temporary = await writeTemporaryBundleMcpJson("openclaw-cli-mcp-", resolveOpenClawMcpEnvTemplates(params.mergedConfig, params.env), "mcp.json", false);
	return {
		backend: injectBundleMcpBackendArgs(params.backend, (args) => injectClaudeMcpConfigArgs(args, temporary.filePath, mcpToolsDeny, params.webSearchEnabled)),
		mcpConfigHash,
		mcpResumeHash,
		env: params.env,
		cleanup: temporary.cleanup
	};
}
async function prepareCliWebSearchDisabled(params) {
	const fingerprint = crypto.createHash("sha256").update("web-search-disabled-v1").digest("hex");
	if (params.mode === "gemini-system-settings") {
		const settings = await writeGeminiWebSearchDisabledSettings(params.env);
		return {
			backend: params.backend,
			env: settings.env,
			cleanup: settings.cleanup,
			mcpConfigHash: fingerprint,
			mcpResumeHash: fingerprint
		};
	}
	return {
		backend: injectBundleMcpBackendArgs(params.backend, (args) => params.mode === "codex-config-overrides" ? [
			...args ?? [],
			"-c",
			"web_search=\"disabled\""
		] : injectClaudeWebSearchDisabledArgs(args)),
		env: params.env,
		mcpConfigHash: fingerprint,
		mcpResumeHash: fingerprint
	};
}
/** Prepare backend args/env/cleanup for bundle MCP injection into a CLI run. */
async function prepareCliBundleMcpConfig(params) {
	if (!params.enabled) return params.toolOverrides?.webSearch === false ? await prepareCliWebSearchDisabled({
		mode: params.mode ?? "claude-config-file",
		backend: params.backend,
		env: params.env
	}) : {
		backend: params.backend,
		env: params.env
	};
	const mode = params.mode ?? "claude-config-file";
	if (params.exclusiveConfig) return await prepareModeSpecificBundleMcpConfig({
		mode,
		backend: params.backend,
		mergedConfig: applyMcpServerOverrides(params.exclusiveConfig, params.toolOverrides?.mcpServers),
		env: params.env,
		mcpToolsDeny: params.toolOverrides?.mcpToolsDeny,
		webSearchEnabled: params.toolOverrides?.webSearch
	});
	const resumeMcpConfigPaths = mode === "claude-config-file" ? findClaudeMcpConfigPaths(params.backend.resumeArgs) : [];
	const existingMcpConfigPaths = mode === "claude-config-file" && resumeMcpConfigPaths.length > 0 ? resumeMcpConfigPaths : mode === "claude-config-file" ? findClaudeMcpConfigPaths(params.backend.args) : [];
	let mergedConfig = { mcpServers: {} };
	for (const existingMcpConfigPath of existingMcpConfigPaths) {
		const resolvedExistingPath = path.isAbsolute(existingMcpConfigPath) ? existingMcpConfigPath : path.resolve(params.workspaceDir, existingMcpConfigPath);
		mergedConfig = applyMergePatch(mergedConfig, await readExternalMcpConfig(resolvedExistingPath));
	}
	const bundleConfig = loadMergedBundleMcpConfig({
		workspaceDir: params.workspaceDir,
		cfg: params.config,
		mapConfiguredServer: toCliBundleMcpServerConfig,
		toolOverrides: params.toolOverrides
	});
	for (const diagnostic of bundleConfig.diagnostics) params.warn?.(`bundle MCP skipped for ${diagnostic.pluginId}: ${diagnostic.message}`);
	mergedConfig = applyMergePatch(mergedConfig, bundleConfig.config);
	if (params.additionalConfig) mergedConfig = applyMergePatch(mergedConfig, params.additionalConfig);
	const resolvedBearerConfig = await resolveMcpBearerBundleConfig({
		config: mergedConfig,
		cfg: params.config,
		agentDir: params.agentDir,
		env: params.env,
		omitUnavailableOAuthServers: true,
		onServerUnavailable: (serverName, error) => params.warn?.(`bundle MCP skipped unavailable OAuth server ${serverName}: ${formatErrorMessage(error)}`)
	});
	return await prepareModeSpecificBundleMcpConfig({
		mode,
		backend: params.backend,
		mergedConfig: applyMcpServerOverrides(resolvedBearerConfig.config, params.toolOverrides?.mcpServers),
		env: resolvedBearerConfig.env,
		mcpToolsDeny: params.toolOverrides?.mcpToolsDeny,
		webSearchEnabled: params.toolOverrides?.webSearch
	});
}
/** Prepares a per-attempt capture token without changing resume compatibility hashes. */
async function prepareCliBundleMcpCaptureAttempt(params) {
	if (!params.captureKey) return { env: params.env };
	if ((params.mode ?? "claude-config-file") === "gemini-system-settings") return await writeGeminiMcpCaptureSettings({
		inheritedEnv: params.env,
		captureKey: params.captureKey
	});
	if ((params.mode ?? "claude-config-file") === "claude-config-file") {
		const mcpConfigPath = findClaudeMcpConfigPaths(params.backend?.args)[0] ?? findClaudeMcpConfigPaths(params.backend?.resumeArgs)[0];
		if (mcpConfigPath) await writeClaudeMcpCaptureConfig({
			mcpConfigPath,
			captureKey: params.captureKey
		});
	}
	return { env: {
		...params.env,
		OPENCLAW_MCP_CLI_CAPTURE_KEY: params.captureKey
	} };
}
//#endregion
//#region src/agents/cli-output.ts
/**
* Parses output from CLI-backed model providers. It supports plain text, JSON,
* JSONL streaming, Claude stream-json dialects, usage metadata, and tool event
* reconstruction.
*/
function normalizeCliContextValue(value) {
	const normalized = value?.trim().replace(/\s+/g, " ");
	return normalized ? truncateUtf16Safe(normalized, 200) : void 0;
}
function formatCliOutputError(output, attribution = {}) {
	if (output.terminalFailure?.reason !== "max_turns") return output.errorText || "CLI failed.";
	const runId = normalizeCliContextValue(attribution.runId);
	const sessionId = normalizeCliContextValue(attribution.sessionId);
	const cliSessionId = normalizeCliContextValue(output.sessionId);
	const context = [
		runId ? `OpenClaw run: ${runId}.` : void 0,
		sessionId ? `OpenClaw session: ${sessionId}.` : void 0,
		cliSessionId ? `Claude session: ${cliSessionId}.` : void 0
	].filter((entry) => Boolean(entry));
	const limit = output.terminalFailure.limit;
	return [
		`Claude CLI stopped after reaching the maximum number of turns${limit ? ` (limit: ${limit})` : ""}.`,
		...context,
		"Tool actions may already have run; verify their effects before retrying.",
		"Retry with a higher --max-turns value or a narrower task."
	].join(" ");
}
const CLI_STREAM_JSON_DEFAULT_MAX_TURN_RAW_CHARS = 8 * 1024 * 1024;
const CLI_STREAM_JSON_DEFAULT_MAX_TURN_LINES = 2e4;
const CLI_STREAM_JSON_MISSING_RESULT_ERROR = "CLI stream-json output ended without a result event.";
function isClaudeCliProvider(providerId) {
	return normalizeLowercaseStringOrEmpty(providerId) === "claude-cli";
}
function isGeminiCliProvider(providerId) {
	return normalizeLowercaseStringOrEmpty(providerId) === "google-gemini-cli";
}
function isGeminiStreamJsonDialect(params) {
	return params.backend.jsonlDialect === "gemini-stream-json" || isGeminiCliProvider(params.providerId);
}
function isClaudeStreamJsonDialect(params) {
	if (params.backend.jsonlDialect) return params.backend.jsonlDialect === "claude-stream-json";
	return isClaudeCliProvider(params.providerId);
}
function isStreamJsonDialect(params) {
	return supportsCliJsonlToolEvents(params);
}
/** Returns whether JSONL output carries correlated provider tool events. */
function supportsCliJsonlToolEvents(params) {
	return params.backend.jsonlDialect === "claude-stream-json" || isClaudeCliProvider(params.providerId) || isGeminiStreamJsonDialect(params);
}
function isClaudeStreamJsonResult(params) {
	return supportsCliJsonlToolEvents(params) && params.parsed.type === "result";
}
function extractJsonObjectCandidates(raw) {
	return extractBalancedJsonFragments(raw, { openers: ["{"] }).map((fragment) => fragment.json);
}
function parseJsonRecordCandidates(raw) {
	const parsedRecords = [];
	const trimmed = raw.trim();
	if (!trimmed) return parsedRecords;
	try {
		const parsed = JSON.parse(trimmed);
		if (isRecord(parsed)) {
			parsedRecords.push(parsed);
			return parsedRecords;
		}
	} catch {}
	for (const candidate of extractJsonObjectCandidates(trimmed)) try {
		const parsed = JSON.parse(candidate);
		if (isRecord(parsed)) parsedRecords.push(parsed);
	} catch {}
	return parsedRecords;
}
function readNestedErrorMessage(parsed) {
	if (isRecord(parsed.error)) {
		const errorMessage = readNestedErrorMessage(parsed.error);
		if (errorMessage) return errorMessage;
	}
	if (typeof parsed.message === "string") {
		const trimmed = parsed.message.trim();
		if (trimmed) return trimmed;
	}
	if (typeof parsed.error === "string") {
		const trimmed = parsed.error.trim();
		if (trimmed) return trimmed;
	}
}
function unwrapCliErrorText(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return "";
	for (const parsed of parseJsonRecordCandidates(trimmed)) {
		const nested = readNestedErrorMessage(parsed);
		if (nested) return nested;
	}
	return trimmed;
}
function toCliUsage(raw) {
	const readNestedCached = (key, field = "cached_tokens") => {
		const nested = raw[key];
		if (!isRecord(nested)) return;
		return typeof nested[field] === "number" && nested[field] > 0 ? nested[field] : void 0;
	};
	const pick = (key) => typeof raw[key] === "number" && raw[key] > 0 ? raw[key] : void 0;
	const totalInput = pick("input_tokens") ?? pick("inputTokens") ?? pick("prompt_tokens") ?? pick("promptTokens");
	const output = pick("output_tokens") ?? pick("outputTokens") ?? pick("completion_tokens") ?? pick("completionTokens");
	const nestedCached = readNestedCached("input_tokens_details") ?? readNestedCached("prompt_tokens_details");
	const cacheRead = pick("cache_read_input_tokens") ?? pick("cached_input_tokens") ?? pick("cacheRead") ?? pick("cached") ?? nestedCached;
	const nestedCacheWrite = readNestedCached("input_tokens_details", "cache_write_tokens") ?? readNestedCached("prompt_tokens_details", "cache_write_tokens");
	const cacheWrite = pick("cache_creation_input_tokens") ?? pick("cache_write_input_tokens") ?? pick("cacheWrite") ?? nestedCacheWrite;
	const input = pick("input") ?? ((Object.hasOwn(raw, "cached") || Object.hasOwn(raw, "cached_input_tokens") || Object.hasOwn(raw, "cache_write_input_tokens") || nestedCached !== void 0 || nestedCacheWrite !== void 0) && typeof totalInput === "number" ? Math.max(0, totalInput - (cacheRead ?? 0) - (cacheWrite ?? 0)) : totalInput);
	const total = pick("total_tokens") ?? pick("total");
	if (!input && !output && !cacheRead && !cacheWrite && !total) return;
	return {
		input,
		output,
		cacheRead,
		cacheWrite,
		total
	};
}
function readCliUsage(parsed) {
	if (isRecord(parsed.message) && isRecord(parsed.message.usage)) {
		const usage = toCliUsage(parsed.message.usage);
		if (usage) return usage;
	}
	if (isRecord(parsed.usage)) {
		const usage = toCliUsage(parsed.usage);
		if (usage) return usage;
	}
	if (isRecord(parsed.stats)) return toCliUsage(parsed.stats);
}
function collectCliText(value) {
	if (!value) return "";
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map((entry) => collectCliText(entry)).join("");
	if (!isRecord(value)) return "";
	if (typeof value.response === "string") return value.response;
	if (typeof value.text === "string") return value.text;
	if (typeof value.result === "string") return value.result;
	if (typeof value.content === "string") return value.content;
	if (Array.isArray(value.content)) return value.content.map((entry) => collectCliText(entry)).join("");
	if (isRecord(value.message)) return collectCliText(value.message);
	return "";
}
function unwrapNestedCliResultText(raw) {
	let text = raw;
	for (let depth = 0; depth < 8; depth += 1) {
		const trimmed = text.trim();
		if (!trimmed.startsWith("{")) return text;
		try {
			const parsed = JSON.parse(trimmed);
			if (!isRecord(parsed) || typeof parsed.type !== "string" || parsed.type !== "result" || typeof parsed.result !== "string") return text;
			text = parsed.result;
		} catch {
			return text;
		}
	}
	return text;
}
function collectExplicitCliErrorText(parsed) {
	const subtype = typeof parsed.subtype === "string" ? parsed.subtype.trim() : "";
	if (parsed.is_error === true || parsed.type === "result" && (subtype.startsWith("error_") || parsed.status === "error")) {
		const text = collectCliText(parsed.result) || collectCliText(parsed.message) || collectCliText(parsed.content);
		if (text) return unwrapCliErrorText(text);
		const nested = readNestedErrorMessage(parsed);
		if (nested) return unwrapCliErrorText(nested);
		if (subtype) return `Claude CLI result subtype ${subtype}.`;
		return "CLI result was marked as an error.";
	}
	const nested = readNestedErrorMessage(parsed);
	if (nested) return unwrapCliErrorText(nested);
	if (parsed.type === "assistant") {
		const text = collectCliText(parsed.message);
		if (/^\s*API Error:/i.test(text)) return unwrapCliErrorText(text);
	}
	if (parsed.type === "error") return unwrapCliErrorText(collectCliText(parsed.message) || collectCliText(parsed.content) || collectCliText(parsed.result) || collectCliText(parsed));
	return "";
}
function readClaudeMaxTurnsFailure(parsed) {
	const subtype = typeof parsed.subtype === "string" ? parsed.subtype.trim() : "";
	const terminalReason = typeof parsed.terminal_reason === "string" ? parsed.terminal_reason.trim() : "";
	if (subtype !== "error_max_turns" && terminalReason !== "max_turns") return;
	const errors = Array.isArray(parsed.errors) ? parsed.errors : [];
	for (const error of errors) {
		if (typeof error !== "string") continue;
		const match = error.match(/maximum number of turns\s*\((\d+)\)/i);
		if (match) {
			const limit = Number.parseInt(match[1] ?? "", 10);
			if (Number.isSafeInteger(limit) && limit > 0) return {
				reason: "max_turns",
				limit
			};
		}
	}
	return { reason: "max_turns" };
}
function readClaudeMaxTurnsErrorText(parsed) {
	if (!Array.isArray(parsed.errors)) return;
	for (const error of parsed.errors) if (typeof error === "string" && error.trim()) return error.trim();
}
function resolveCliTerminalErrorText(parsed, terminalFailure) {
	const explicitErrorText = collectExplicitCliErrorText(parsed);
	return ((terminalFailure ? readClaudeMaxTurnsErrorText(parsed) : void 0) ?? explicitErrorText) || (terminalFailure ? "Reached maximum number of turns." : "");
}
function pickCliSessionId(parsed, backend) {
	const fields = backend.sessionIdFields ?? [
		"session_id",
		"sessionId",
		"conversation_id",
		"conversationId"
	];
	for (const field of fields) {
		const value = parsed[field];
		if (typeof value === "string" && value.trim()) return value.trim();
	}
}
function pickCliResumeCheckpointId(params) {
	if (!isClaudeStreamJsonDialect(params) || params.parsed.type !== "assistant" || params.parsed.parent_tool_use_id != null) return;
	return (typeof params.parsed.uuid === "string" ? params.parsed.uuid.trim() : "") || void 0;
}
function shouldUnwrapNestedCliResultText(params) {
	if (!params.providerId || !isClaudeCliProvider(params.providerId)) return false;
	return !Object.hasOwn(params.parsed, "type") || params.parsed.type === "result";
}
function resolveCliStreamJsonOutputLimits(_backend) {
	return {
		maxTurnRawChars: CLI_STREAM_JSON_DEFAULT_MAX_TURN_RAW_CHARS,
		maxPendingLineChars: CLI_STREAM_JSON_DEFAULT_MAX_TURN_RAW_CHARS,
		maxTurnLines: CLI_STREAM_JSON_DEFAULT_MAX_TURN_LINES
	};
}
function streamJsonOutputLimitErrorText(kind, limit) {
	if (kind === "line") return `CLI JSONL line exceeded ${limit} characters; refusing to parse output.`;
	if (kind === "lines") return `CLI JSONL output exceeded ${limit} lines; refusing to parse output.`;
	return `CLI JSONL output exceeded ${limit} characters; refusing to parse output.`;
}
function hasExplicitCliErrorPayload(parsed) {
	if (typeof parsed.error === "string") return Boolean(parsed.error.trim());
	if (isRecord(parsed.error)) return Boolean(readNestedErrorMessage(parsed.error));
	return false;
}
/** Parses JSON CLI output, including mixed stdout that contains embedded JSON objects. */
/** Parses a single JSON payload emitted by a CLI backend. */
function parseCliJson(raw, backend, providerId) {
	const parsedRecords = parseJsonRecordCandidates(raw);
	if (parsedRecords.length === 0) return null;
	let sessionId;
	let usage;
	let text = "";
	let sawStructuredOutput = false;
	for (const parsed of parsedRecords) {
		sessionId = pickCliSessionId(parsed, backend) ?? sessionId;
		usage = readCliUsage(parsed) ?? usage;
		const terminalFailure = isClaudeStreamJsonDialect({
			backend,
			providerId: providerId ?? ""
		}) ? readClaudeMaxTurnsFailure(parsed) : void 0;
		if (terminalFailure) return {
			text: "",
			sessionId,
			usage,
			errorText: resolveCliTerminalErrorText(parsed, terminalFailure),
			terminalFailure
		};
		const subtype = typeof parsed.subtype === "string" ? parsed.subtype.trim() : "";
		const errorText = parsed.is_error === true || parsed.type === "error" || parsed.type === "result" && (subtype.startsWith("error_") || parsed.status === "error" || hasExplicitCliErrorPayload(parsed)) ? collectExplicitCliErrorText(parsed) : "";
		if (errorText) return {
			text: "",
			sessionId,
			usage,
			errorText
		};
		const nextText = collectCliText(parsed.message) || collectCliText(parsed.content) || collectCliText(parsed.result) || collectCliText(parsed.response) || collectCliText(parsed);
		const trimmedText = (shouldUnwrapNestedCliResultText({
			providerId,
			parsed
		}) ? unwrapNestedCliResultText(nextText) : nextText).trim();
		if (trimmedText) {
			text = trimmedText;
			sawStructuredOutput = true;
			continue;
		}
		if (sessionId || usage) sawStructuredOutput = true;
	}
	if (!text && !sawStructuredOutput) return null;
	return {
		text,
		sessionId,
		usage
	};
}
function parseClaudeCliJsonlResult(params) {
	if (!supportsCliJsonlToolEvents(params)) return null;
	if (typeof params.parsed.type === "string" && params.parsed.type === "result") {
		const terminalFailure = isClaudeStreamJsonDialect(params) ? readClaudeMaxTurnsFailure(params.parsed) : void 0;
		const errorText = resolveCliTerminalErrorText(params.parsed, terminalFailure);
		if (errorText) return {
			text: "",
			sessionId: params.sessionId,
			usage: params.usage,
			errorText,
			...terminalFailure ? { terminalFailure } : {}
		};
		if (typeof params.parsed.result !== "string") return null;
		const resultText = unwrapNestedCliResultText(params.parsed.result).trim();
		if (resultText) return {
			text: resultText,
			sessionId: params.sessionId,
			usage: params.usage
		};
		return {
			text: "",
			sessionId: params.sessionId,
			usage: params.usage
		};
	}
	return null;
}
function preferStreamedClaudeTextOverResult(params) {
	return Boolean(params.resultText) && params.streamedText !== params.resultText && params.finalMessageText === params.resultText;
}
function missingMessageBoundarySeparator(previousText, nextDelta) {
	if (!previousText) return "";
	const trailing = previousText.match(/\n*$/u)?.[0].length ?? 0;
	const leading = nextDelta.match(/^\n*/u)?.[0].length ?? 0;
	return "\n".repeat(Math.max(0, 2 - trailing - leading));
}
function parseClaudeCliStreamingDelta(params) {
	if (!supportsCliJsonlToolEvents(params)) return null;
	if (params.parsed.type !== "stream_event" || !isRecord(params.parsed.event)) return null;
	const event = params.parsed.event;
	if (event.type !== "content_block_delta" || !isRecord(event.delta)) return null;
	const delta = event.delta;
	if (delta.type !== "text_delta" || typeof delta.text !== "string") return null;
	if (!delta.text) return null;
	return {
		text: `${params.textSoFar}${delta.text}`,
		delta: delta.text,
		sessionId: params.sessionId,
		usage: params.usage
	};
}
function createToolUseTracker() {
	return {
		pendingByIndex: /* @__PURE__ */ new Map(),
		nameById: /* @__PURE__ */ new Map(),
		startedIds: /* @__PURE__ */ new Set(),
		resultDeliveredIds: /* @__PURE__ */ new Set()
	};
}
function emitToolStartOnce(tracker, toolCallId, name, kind, args, onToolUseStart) {
	if (tracker.startedIds.has(toolCallId)) return;
	tracker.startedIds.add(toolCallId);
	tracker.nameById.set(toolCallId, name);
	onToolUseStart?.({
		toolCallId,
		name,
		kind,
		args
	});
}
function emitToolResultOnce(tracker, toolCallId, isError, result, onToolResult) {
	if (tracker.resultDeliveredIds.has(toolCallId)) return;
	tracker.resultDeliveredIds.add(toolCallId);
	onToolResult?.({
		toolCallId,
		name: tracker.nameById.get(toolCallId) ?? "",
		isError,
		result
	});
}
function isClaudeToolUseBlockType(type) {
	return type === "tool_use" || type === "server_tool_use" || type === "mcp_tool_use";
}
function isClaudeAssistantToolResultBlockType(type) {
	return typeof type === "string" && type.endsWith("_tool_result") && type !== "tool_result";
}
function isClaudeToolResultError(content) {
	return isRecord(content) && typeof content.type === "string" && content.type.endsWith("_error");
}
function parseToolInputJson(parts) {
	if (parts.length === 0) return {};
	try {
		const parsed = JSON.parse(parts.join(""));
		return isRecord(parsed) ? parsed : {};
	} catch {
		return {};
	}
}
function dispatchClaudeCliStreamingToolEvent(params) {
	if (!supportsCliJsonlToolEvents(params)) return;
	const tracker = params.tracker;
	if (params.parsed.type === "stream_event" && isRecord(params.parsed.event)) {
		const event = params.parsed.event;
		if (event.type === "content_block_start" && typeof event.index === "number" && isRecord(event.content_block)) {
			const block = event.content_block;
			if (isClaudeToolUseBlockType(block.type)) {
				const toolCallId = typeof block.id === "string" ? block.id.trim() : "";
				const name = typeof block.name === "string" ? block.name.trim() : "";
				if (toolCallId && name) tracker.pendingByIndex.set(event.index, {
					toolCallId,
					name,
					kind: block.type,
					inputJsonParts: []
				});
			} else if (isClaudeAssistantToolResultBlockType(block.type)) {
				const toolCallId = typeof block.tool_use_id === "string" ? block.tool_use_id.trim() : "";
				if (toolCallId) emitToolResultOnce(tracker, toolCallId, block.is_error === true || isClaudeToolResultError(block.content), block.content, params.onToolResult);
			}
			return;
		}
		if (event.type === "content_block_delta" && typeof event.index === "number" && isRecord(event.delta)) {
			if (event.delta.type === "input_json_delta" && typeof event.delta.partial_json === "string") tracker.pendingByIndex.get(event.index)?.inputJsonParts.push(event.delta.partial_json);
			return;
		}
		if (event.type === "content_block_stop" && typeof event.index === "number") {
			const pending = tracker.pendingByIndex.get(event.index);
			tracker.pendingByIndex.delete(event.index);
			if (pending) emitToolStartOnce(tracker, pending.toolCallId, pending.name, pending.kind, parseToolInputJson(pending.inputJsonParts), params.onToolUseStart);
			return;
		}
		return;
	}
	if (params.parsed.type === "assistant" && isRecord(params.parsed.message)) {
		const message = params.parsed.message;
		const content = Array.isArray(message.content) ? message.content : [];
		for (const block of content) {
			if (!isRecord(block)) continue;
			if (isClaudeToolUseBlockType(block.type)) {
				const toolCallId = typeof block.id === "string" ? block.id.trim() : "";
				const name = typeof block.name === "string" ? block.name.trim() : "";
				if (!toolCallId || !name) continue;
				const args = isRecord(block.input) ? block.input : {};
				emitToolStartOnce(tracker, toolCallId, name, block.type, args, params.onToolUseStart);
			} else if (isClaudeAssistantToolResultBlockType(block.type)) {
				const toolCallId = typeof block.tool_use_id === "string" ? block.tool_use_id.trim() : "";
				if (!toolCallId) continue;
				emitToolResultOnce(tracker, toolCallId, block.is_error === true || isClaudeToolResultError(block.content), block.content, params.onToolResult);
			}
		}
		return;
	}
	if (params.parsed.type === "user" && isRecord(params.parsed.message)) {
		const message = params.parsed.message;
		const content = Array.isArray(message.content) ? message.content : [];
		for (const block of content) {
			if (!isRecord(block) || block.type !== "tool_result") continue;
			const toolCallId = typeof block.tool_use_id === "string" ? block.tool_use_id.trim() : "";
			if (!toolCallId) continue;
			emitToolResultOnce(tracker, toolCallId, block.is_error === true, block.content, params.onToolResult);
		}
	}
}
function createThinkingTracker() {
	return {
		streamedByIndex: /* @__PURE__ */ new Map(),
		emittedText: "",
		nextSyntheticBlockIndex: 0,
		progressTokens: 0
	};
}
function resetThinkingBlockState(tracker) {
	tracker.streamedByIndex.clear();
	tracker.emittedText = "";
	tracker.currentSyntheticBlockIndex = void 0;
	tracker.nextSyntheticBlockIndex = 0;
	tracker.progressTokens = 0;
}
function resetThinkingTrackerForMessage(tracker, messageId) {
	if (messageId && messageId === tracker.currentMessageId) return;
	if (messageId && tracker.currentMessageId === void 0) {
		tracker.currentMessageId = messageId;
		return;
	}
	resetThinkingBlockState(tracker);
	tracker.currentMessageId = messageId;
}
function beginClaudeContentBlock(tracker, index) {
	if (typeof index === "number") {
		tracker.currentSyntheticBlockIndex = index;
		tracker.nextSyntheticBlockIndex = Math.max(tracker.nextSyntheticBlockIndex, index + 1);
		return;
	}
	if (index !== void 0) {
		tracker.currentSyntheticBlockIndex = void 0;
		return;
	}
	tracker.currentSyntheticBlockIndex = tracker.nextSyntheticBlockIndex;
	tracker.nextSyntheticBlockIndex += 1;
}
function stopClaudeContentBlock(tracker) {
	tracker.currentSyntheticBlockIndex = void 0;
}
function resolveClaudeContentBlockIndex(tracker, index) {
	if (typeof index === "number") {
		tracker.nextSyntheticBlockIndex = Math.max(tracker.nextSyntheticBlockIndex, index + 1);
		return index;
	}
	if (index !== void 0) return null;
	return tracker.currentSyntheticBlockIndex ?? null;
}
function assembleThinkingTextByIndex(streamedByIndex) {
	return [...streamedByIndex.entries()].toSorted(([left], [right]) => left - right).map(([, text]) => text).join("");
}
function emitClaudeThinking(tracker, index, streamed, delta, onThinkingDelta) {
	tracker.streamedByIndex.set(index, `${streamed}${delta}`);
	tracker.emittedText = assembleThinkingTextByIndex(tracker.streamedByIndex);
	onThinkingDelta({
		text: tracker.emittedText,
		delta,
		isReasoningSnapshot: true
	});
}
function readThinkingProgressTokens(delta) {
	if (delta.type !== "thinking_delta" || delta.thinking !== "") return;
	const estimatedTokens = delta.estimated_tokens;
	if (typeof estimatedTokens !== "number" || !Number.isFinite(estimatedTokens)) return;
	return estimatedTokens > 0 ? estimatedTokens : void 0;
}
function emitClaudeThinkingProgress(tracker, progressTokensDelta, onThinkingProgress) {
	tracker.progressTokens += progressTokensDelta;
	onThinkingProgress({ progressTokens: tracker.progressTokens });
}
function dispatchClaudeCliThinking(params) {
	if (!supportsCliJsonlToolEvents(params)) return;
	const tracker = params.tracker;
	if (params.parsed.type === "stream_event" && isRecord(params.parsed.event)) {
		const event = params.parsed.event;
		if (event.type === "message_start") {
			const message = isRecord(event.message) ? event.message : void 0;
			resetThinkingTrackerForMessage(tracker, typeof message?.id === "string" ? message.id : void 0);
			return;
		}
		if (event.type === "content_block_start") {
			beginClaudeContentBlock(tracker, event.index);
			return;
		}
		if (event.type === "content_block_stop") {
			stopClaudeContentBlock(tracker);
			return;
		}
		if (event.type !== "content_block_delta" || !isRecord(event.delta)) return;
		const blockIndex = resolveClaudeContentBlockIndex(tracker, event.index);
		if (blockIndex === null) return;
		const progressTokensDelta = readThinkingProgressTokens(event.delta);
		if (progressTokensDelta !== void 0 && params.onThinkingProgress) {
			emitClaudeThinkingProgress(tracker, progressTokensDelta, params.onThinkingProgress);
			return;
		}
		if (event.delta.type !== "thinking_delta" || typeof event.delta.thinking !== "string") return;
		if (!event.delta.thinking) return;
		if (!params.onThinkingDelta) return;
		emitClaudeThinking(tracker, blockIndex, tracker.streamedByIndex.get(blockIndex) ?? "", event.delta.thinking, params.onThinkingDelta);
		return;
	}
	if (params.parsed.type === "assistant" && isRecord(params.parsed.message)) {
		resetThinkingTrackerForMessage(tracker, typeof params.parsed.message.id === "string" ? params.parsed.message.id : void 0);
		const content = Array.isArray(params.parsed.message.content) ? params.parsed.message.content : [];
		for (const [index, block] of content.entries()) {
			if (!isRecord(block) || block.type !== "thinking" || typeof block.thinking !== "string") continue;
			if (!params.onThinkingDelta) continue;
			tracker.streamedByIndex.set(index, block.thinking);
			const text = assembleThinkingTextByIndex(tracker.streamedByIndex);
			if (text === tracker.emittedText) continue;
			tracker.emittedText = text;
			params.onThinkingDelta({
				text,
				delta: block.thinking,
				isReasoningSnapshot: true
			});
		}
	}
}
function dispatchGeminiCliStreamingToolEvent(params) {
	if (!isGeminiStreamJsonDialect(params)) return;
	if (params.parsed.type === "tool_use") {
		const toolCallId = typeof params.parsed.tool_id === "string" ? params.parsed.tool_id.trim() : "";
		const name = typeof params.parsed.tool_name === "string" ? params.parsed.tool_name.trim() : "";
		if (!toolCallId || !name) return;
		const args = isRecord(params.parsed.parameters) ? params.parsed.parameters : {};
		emitToolStartOnce(params.tracker, toolCallId, name, "tool_use", args, params.onToolUseStart);
		return;
	}
	if (params.parsed.type === "tool_result") {
		const toolCallId = typeof params.parsed.tool_id === "string" ? params.parsed.tool_id.trim() : "";
		if (!toolCallId) return;
		const result = params.parsed.status === "error" && isRecord(params.parsed.error) ? params.parsed.error : params.parsed.output;
		emitToolResultOnce(params.tracker, toolCallId, params.parsed.status === "error", result, params.onToolResult);
	}
}
const GEMINI_CLI_ERROR_EVENT_FALLBACK = "Gemini CLI emitted an error event.";
const GEMINI_CLI_RESULT_ERROR_FALLBACK = "Gemini CLI result status was error.";
function isFallbackGeminiCliStreamJsonError(errorText) {
	return errorText === GEMINI_CLI_ERROR_EVENT_FALLBACK || errorText === GEMINI_CLI_RESULT_ERROR_FALLBACK;
}
function preferGeminiCliStreamJsonError(current, next) {
	if (!current) return next;
	if (isFallbackGeminiCliStreamJsonError(current) && !isFallbackGeminiCliStreamJsonError(next)) return next;
	return current;
}
function readGeminiCliStreamJsonError(parsed) {
	if (parsed.type === "error" && parsed.severity === "error") return collectExplicitCliErrorText(parsed) || GEMINI_CLI_ERROR_EVENT_FALLBACK;
	if (parsed.type === "result" && parsed.status === "error") return collectExplicitCliErrorText(parsed) || GEMINI_CLI_RESULT_ERROR_FALLBACK;
}
function partitionLeadingTaggedReasoning(text, final) {
	const first = text.search(/\S/u);
	if (first === -1) return final ? {
		pending: false,
		reasoningText: "",
		visibleText: text
	} : { pending: true };
	if (text.charAt(first) !== "<") return {
		pending: false,
		reasoningText: "",
		visibleText: text
	};
	const scan = scanReasoningTags(text, final);
	let depth = 0;
	let end = -1;
	for (const tag of scan.tags) {
		if (depth === 0) {
			const expectedStart = end === -1 ? first : end;
			if (text.slice(expectedStart, tag.index).trim() || tag.isClose || tag.isSelfClosing) break;
		}
		depth += tag.isClose ? -1 : tag.isSelfClosing ? 0 : 1;
		if (depth === 0 && tag.isClose) end = tag.index + tag.text.length;
	}
	const pendingTagAfterBlock = end !== -1 && scan.pendingStart !== void 0 && !text.slice(end, scan.pendingStart).trim();
	if (end === -1) {
		const pendingLeadingTag = scan.pendingStart !== void 0 && !text.slice(first, scan.pendingStart).trim();
		return !final && (depth > 0 || pendingLeadingTag) ? { pending: true } : {
			pending: false,
			reasoningText: "",
			visibleText: text
		};
	}
	if (!final && (depth > 0 || pendingTagAfterBlock || !text.slice(end).trim())) return { pending: true };
	const partitioner = createReasoningTagTextPartitioner();
	const reasoningText = [...partitioner.pushVisible(text.slice(0, end)), ...partitioner.flush()].filter((delta) => delta.kind === "thinking").map((delta) => delta.text).join("");
	return reasoningText ? {
		pending: false,
		reasoningText,
		visibleText: text.slice(end)
	} : {
		pending: false,
		reasoningText: "",
		visibleText: text
	};
}
function createLeadingTaggedReasoningRouter() {
	let pending = "";
	let settled = false;
	const consume = (chunk, final) => {
		if (settled) return chunk ? [{
			kind: "text",
			text: chunk
		}] : [];
		pending += chunk;
		const result = partitionLeadingTaggedReasoning(pending, final);
		if (result.pending) return [];
		settled = true;
		pending = "";
		return [...result.reasoningText ? [{
			kind: "thinking",
			text: result.reasoningText
		}] : [], ...result.visibleText ? [{
			kind: "text",
			text: result.visibleText
		}] : []];
	};
	return {
		push: (chunk) => consume(chunk, false),
		finish: () => consume("", true)
	};
}
/** Creates a stateful parser for streaming JSONL CLI backend output. */
function createCliJsonlStreamingParser(params) {
	let lineBuffer = "";
	let assistantText = "";
	let customThinkingText = "";
	let pendingClaudeText = "";
	let pendingMessageSeparator = false;
	let currentMessageStart = 0;
	let segmentStart = 0;
	let preserveFrom = 0;
	let sawToolUseSinceText = false;
	let currentMessageHadToolUse = false;
	let previousMessageHadToolUse = false;
	let sessionId;
	let resumeCheckpointId;
	let usage;
	let diagnosticUsage;
	let output = null;
	let parseErrorText = "";
	let rawChars = 0;
	let rawLines = 0;
	const texts = [];
	let sawCustomJsonlEvent = false;
	const toolTracker = createToolUseTracker();
	const outputLimits = resolveCliStreamJsonOutputLimits(params.backend);
	const classifyClaudeCommentary = Boolean(params.onCommentaryText) && supportsCliJsonlToolEvents(params);
	const thinkingTracker = createThinkingTracker();
	const claudeStreamJson = isClaudeStreamJsonDialect(params);
	let taggedReasoningRouter = createLeadingTaggedReasoningRouter();
	let currentTaggedReasoningText = "";
	const flushPendingClaudeAssistantText = () => {
		if (!pendingClaudeText) return;
		const delta = pendingClaudeText;
		pendingClaudeText = "";
		assistantText = `${assistantText}${delta}`;
		params.onAssistantDelta({
			text: assistantText,
			delta,
			sessionId,
			usage
		});
	};
	const flushPendingClaudeCommentaryText = () => {
		if (!pendingClaudeText) return;
		const text = pendingClaudeText.trim();
		pendingClaudeText = "";
		if (text) params.onCommentaryText?.(text);
	};
	const emitClaudeVisibleText = (delta) => {
		if (!delta) return;
		if (classifyClaudeCommentary) {
			pendingClaudeText = `${pendingClaudeText}${delta}`;
			return;
		}
		const boundaryPending = pendingMessageSeparator || sawToolUseSinceText;
		const isToolSplitBoundary = pendingMessageSeparator ? previousMessageHadToolUse : sawToolUseSinceText;
		const separator = boundaryPending && assistantText ? missingMessageBoundarySeparator(assistantText, delta) : "";
		if (boundaryPending && assistantText) {
			currentMessageStart = assistantText.length + separator.length;
			if (!isToolSplitBoundary) preserveFrom = currentMessageStart;
		}
		pendingMessageSeparator = false;
		sawToolUseSinceText = false;
		const deltaText = `${separator}${delta}`;
		assistantText = `${assistantText}${deltaText}`;
		params.onAssistantDelta({
			text: assistantText,
			delta: deltaText,
			sessionId,
			usage
		});
	};
	const emitTaggedReasoning = (delta) => {
		if (!delta) return;
		currentTaggedReasoningText = `${currentTaggedReasoningText}${delta}`;
		if (!thinkingTracker.emittedText) params.onThinkingDelta?.({
			text: currentTaggedReasoningText,
			delta,
			isReasoningSnapshot: true
		});
	};
	const routeTaggedReasoningDeltas = (deltas) => {
		for (const delta of deltas) if (delta.kind === "thinking") emitTaggedReasoning(delta.text);
		else emitClaudeVisibleText(delta.text);
	};
	const finishTaggedReasoningMessage = () => {
		if (claudeStreamJson) routeTaggedReasoningDeltas(taggedReasoningRouter.finish());
	};
	const beginTaggedReasoningMessage = () => {
		finishTaggedReasoningMessage();
		taggedReasoningRouter = createLeadingTaggedReasoningRouter();
		currentTaggedReasoningText = "";
	};
	const updateSessionId = (nextSessionId) => {
		const normalized = nextSessionId?.trim();
		if (!normalized || normalized === sessionId) return;
		sessionId = normalized;
		params.onSessionId?.(normalized);
	};
	const handleCustomJsonlEvent = (event) => {
		if (output?.errorText && event.kind !== "sessionId" && event.kind !== "result") return;
		sawCustomJsonlEvent = true;
		if (event.kind === "sessionId") {
			updateSessionId(event.sessionId);
			if (output) output = {
				...output,
				sessionId
			};
			return;
		}
		if (event.kind === "text") {
			if (!event.text) return;
			assistantText = `${assistantText}${event.text}`;
			params.onAssistantDelta({
				text: assistantText,
				delta: event.text,
				sessionId,
				usage
			});
			return;
		}
		if (event.kind === "thinking") {
			if (!event.text || !params.onThinkingDelta) return;
			customThinkingText = `${customThinkingText}${event.text}`;
			params.onThinkingDelta({
				text: customThinkingText,
				delta: event.text,
				isReasoningSnapshot: true
			});
			return;
		}
		if (event.kind === "toolStart") {
			emitToolStartOnce(toolTracker, event.toolCallId, event.name, "tool_use", event.args ?? {}, params.onDisplayToolUseStart ?? params.onToolUseStart);
			return;
		}
		if (event.kind === "toolResult") {
			if (event.name) toolTracker.nameById.set(event.toolCallId, event.name);
			emitToolResultOnce(toolTracker, event.toolCallId, event.isError === true, event.result, params.onDisplayToolResult ?? params.onToolResult);
			return;
		}
		updateSessionId(event.sessionId);
		if (event.usage) {
			usage = event.usage;
			params.onUsage?.(event.usage, true);
		}
		const existingErrorText = output?.errorText;
		const eventText = event.text?.trim() ?? "";
		const existingText = output?.text.trim() ?? "";
		const streamedText = assistantText.trim();
		const delegatedText = texts.join("\n").trim();
		const resultText = existingErrorText ? existingText || delegatedText || streamedText : eventText || existingText || delegatedText || streamedText;
		const errorText = existingErrorText || event.errorText;
		output = {
			...output,
			text: resultText,
			sessionId,
			usage,
			...errorText ? { errorText } : {}
		};
	};
	const handleCustomJsonlLine = (line) => {
		if (parseErrorText) return true;
		if (!params.parseJsonlEvent) return false;
		let parsed;
		try {
			parsed = params.parseJsonlEvent(line, {
				backendId: params.providerId,
				backend: params.backend
			});
		} catch (error) {
			parseErrorText = truncateUtf16Safe(`CLI backend ${params.providerId} JSONL parser failed: ${formatErrorMessage(error)}`, 500);
			return true;
		}
		if (parsed == null) return false;
		for (const event of Array.isArray(parsed) ? parsed : [parsed]) handleCustomJsonlEvent(event);
		return true;
	};
	const handleParsedRecord = (parsed) => {
		if (parseErrorText) return;
		const parsedSessionId = pickCliSessionId(parsed, params.backend) ?? (!sessionId && typeof parsed.thread_id === "string" ? parsed.thread_id.trim() : void 0);
		if (parsedSessionId && parsedSessionId !== sessionId) {
			sessionId = parsedSessionId;
			params.onSessionId?.(parsedSessionId);
		}
		const nextUsage = readCliUsage(parsed);
		const isClaudeTerminalResult = isClaudeStreamJsonDialect({
			backend: params.backend,
			providerId: params.providerId
		}) && parsed.type === "result";
		if (isClaudeTerminalResult && nextUsage && usage) diagnosticUsage = nextUsage;
		if (nextUsage) params.onUsage?.(nextUsage, isClaudeTerminalResult);
		if (!isClaudeStreamJsonResult({
			backend: params.backend,
			providerId: params.providerId,
			parsed
		}) || !usage) usage = nextUsage ?? usage;
		if (parsed.type === "assistant" && isRecord(parsed.message)) {
			resumeCheckpointId = pickCliResumeCheckpointId({
				...params,
				parsed
			}) ?? resumeCheckpointId;
			params.onAssistantMessage?.(parsed.message);
		}
		const geminiErrorText = isGeminiStreamJsonDialect(params) ? readGeminiCliStreamJsonError(parsed) : void 0;
		if (geminiErrorText) {
			output = {
				text: "",
				sessionId,
				usage,
				errorText: preferGeminiCliStreamJsonError(output?.errorText, geminiErrorText)
			};
			return;
		}
		if (classifyClaudeCommentary && parsed.type === "result") {
			finishTaggedReasoningMessage();
			flushPendingClaudeAssistantText();
		} else if (parsed.type === "result") finishTaggedReasoningMessage();
		let result = parseClaudeCliJsonlResult({
			backend: params.backend,
			providerId: params.providerId,
			parsed,
			sessionId,
			usage
		});
		if (result) {
			if (result.errorText) {
				output = result;
				return;
			}
			if (claudeStreamJson && result.text) {
				const taggedResult = partitionLeadingTaggedReasoning(result.text, true);
				if (!taggedResult.pending && taggedResult.reasoningText) {
					if (!thinkingTracker.emittedText && taggedResult.reasoningText !== currentTaggedReasoningText) {
						currentTaggedReasoningText = "";
						emitTaggedReasoning(taggedResult.reasoningText);
					}
					result = {
						...result,
						text: taggedResult.visibleText.trim()
					};
				}
			}
			const streamedText = assistantText.slice(segmentStart).trim();
			const preservedCandidate = assistantText.slice(preserveFrom).trim();
			const nextText = (preferStreamedClaudeTextOverResult({
				streamedText: preservedCandidate,
				finalMessageText: assistantText.slice(currentMessageStart).trim(),
				resultText: result.text
			}) ? preservedCandidate : result.text || streamedText || texts.join("\n").trim()).trim();
			const previousText = output?.text?.trim() ?? "";
			let text = nextText;
			if (previousText && nextText && previousText !== nextText && !nextText.startsWith(previousText)) text = `${previousText}\n${nextText}`;
			else if (!nextText) text = previousText;
			output = {
				...result,
				text,
				...resumeCheckpointId ? { resumeCheckpointId } : {},
				...diagnosticUsage ? { diagnosticUsage } : {}
			};
			segmentStart = assistantText.length;
			currentMessageStart = segmentStart;
			preserveFrom = segmentStart;
			pendingMessageSeparator = false;
			sawToolUseSinceText = false;
			currentMessageHadToolUse = false;
			previousMessageHadToolUse = false;
			return;
		}
		const item = isRecord(parsed.item) ? parsed.item : null;
		if (item?.type === "todo_list" && Array.isArray(item.items)) {
			const steps = item.items.flatMap((entry) => {
				if (!isRecord(entry) || typeof entry.text !== "string") return [];
				return [{
					step: entry.text,
					status: entry.completed === true ? "completed" : "pending"
				}];
			});
			if (steps.length > 0) params.onPlanUpdate?.({ steps });
		}
		if (item && typeof item.text === "string") {
			const type = normalizeLowercaseStringOrEmpty(item.type);
			if (!type || type.includes("message")) texts.push(item.text);
		}
		if (parsed.type === "stream_event" && isRecord(parsed.event)) {
			const evt = parsed.event;
			if (evt.type === "message_start") {
				beginTaggedReasoningMessage();
				pendingMessageSeparator = true;
				previousMessageHadToolUse = currentMessageHadToolUse;
				currentMessageHadToolUse = false;
			} else if (evt.type === "message_stop") finishTaggedReasoningMessage();
			const isToolUseBlockStart = evt.type === "content_block_start" && isRecord(evt.content_block) && isClaudeToolUseBlockType(evt.content_block.type);
			if (isToolUseBlockStart) {
				sawToolUseSinceText = true;
				currentMessageHadToolUse = true;
			}
			if (classifyClaudeCommentary) {
				if (isToolUseBlockStart) flushPendingClaudeCommentaryText();
				else if (evt.type === "content_block_start" || evt.type === "message_stop") flushPendingClaudeAssistantText();
			}
		}
		if (params.onThinkingDelta || params.onThinkingProgress) dispatchClaudeCliThinking({
			backend: params.backend,
			providerId: params.providerId,
			parsed,
			tracker: thinkingTracker,
			onThinkingDelta: params.onThinkingDelta,
			onThinkingProgress: params.onThinkingProgress
		});
		if (params.onToolUseStart || params.onToolResult) {
			dispatchGeminiCliStreamingToolEvent({
				backend: params.backend,
				providerId: params.providerId,
				parsed,
				tracker: toolTracker,
				onToolUseStart: params.onToolUseStart,
				onToolResult: params.onToolResult
			});
			dispatchClaudeCliStreamingToolEvent({
				backend: params.backend,
				providerId: params.providerId,
				parsed,
				tracker: toolTracker,
				onToolUseStart: params.onToolUseStart,
				onToolResult: params.onToolResult
			});
		}
		const delta = parseClaudeCliStreamingDelta({
			backend: params.backend,
			providerId: params.providerId,
			parsed,
			textSoFar: assistantText,
			sessionId,
			usage
		});
		if (!delta) {
			if (isGeminiStreamJsonDialect(params) && parsed.type === "message" && parsed.role === "assistant" && typeof parsed.content === "string") {
				const deltaText = parsed.content;
				if (deltaText) {
					assistantText = `${assistantText}${deltaText}`;
					params.onAssistantDelta({
						text: assistantText,
						delta: deltaText,
						sessionId,
						usage
					});
				}
			} else if (isGeminiStreamJsonDialect(params) && parsed.type === "result" && parsed.status === "success") output = {
				text: assistantText.trim(),
				sessionId,
				usage
			};
			return;
		}
		if (claudeStreamJson) {
			routeTaggedReasoningDeltas(taggedReasoningRouter.push(delta.delta));
			return;
		}
		emitClaudeVisibleText(delta.delta);
	};
	const flushLines = (flushPartial) => {
		while (true) {
			if (parseErrorText) return;
			const newlineIndex = lineBuffer.indexOf("\n");
			if (newlineIndex < 0) break;
			const line = lineBuffer.slice(0, newlineIndex).trim();
			lineBuffer = lineBuffer.slice(newlineIndex + 1);
			if (!line) continue;
			rawLines += 1;
			if (rawLines > outputLimits.maxTurnLines) {
				parseErrorText = streamJsonOutputLimitErrorText("lines", outputLimits.maxTurnLines);
				lineBuffer = "";
				return;
			}
			if (handleCustomJsonlLine(line)) continue;
			for (const parsed of parseJsonRecordCandidates(line)) handleParsedRecord(parsed);
		}
		if (!flushPartial) return;
		const tail = lineBuffer.trim();
		lineBuffer = "";
		if (!tail) return;
		if (handleCustomJsonlLine(tail)) return;
		for (const parsed of parseJsonRecordCandidates(tail)) handleParsedRecord(parsed);
	};
	return {
		push(chunk) {
			if (!chunk || parseErrorText) return;
			rawChars += chunk.length;
			if (rawChars > outputLimits.maxTurnRawChars) {
				parseErrorText = streamJsonOutputLimitErrorText("raw", outputLimits.maxTurnRawChars);
				lineBuffer = "";
				return;
			}
			if (lineBuffer.length + chunk.length > outputLimits.maxPendingLineChars) {
				parseErrorText = streamJsonOutputLimitErrorText("line", outputLimits.maxPendingLineChars);
				lineBuffer = "";
				return;
			}
			lineBuffer += chunk;
			flushLines(false);
		},
		finish() {
			if (parseErrorText) return;
			flushLines(true);
			finishTaggedReasoningMessage();
			if (classifyClaudeCommentary) flushPendingClaudeAssistantText();
		},
		getErrorText() {
			return parseErrorText || null;
		},
		getOutput() {
			if (parseErrorText) return {
				text: "",
				sessionId,
				usage,
				...diagnosticUsage ? { diagnosticUsage } : {},
				errorText: parseErrorText
			};
			if (output) return output;
			if (sawCustomJsonlEvent) return {
				text: texts.join("\n").trim() || assistantText.trim(),
				sessionId,
				usage
			};
			if (isStreamJsonDialect(params) && assistantText.trim()) return {
				text: assistantText.trim(),
				sessionId,
				usage,
				...resumeCheckpointId ? { resumeCheckpointId } : {}
			};
			const text = texts.join("\n").trim();
			return text ? {
				text,
				sessionId,
				usage,
				...resumeCheckpointId ? { resumeCheckpointId } : {}
			} : null;
		}
	};
}
/** Parses complete JSONL CLI output into the final assistant result and metadata. */
/** Parses complete JSONL output from a CLI backend into normalized text and metadata. */
function parseCliJsonl(raw, backend, providerId) {
	const lines = normalizeStringEntries(raw.split(/\r?\n/g));
	if (lines.length === 0) return null;
	let sessionId;
	let resumeCheckpointId;
	let usage;
	const texts = [];
	let streamJsonText = "";
	let pendingMessageSeparator = false;
	let currentMessageStart = 0;
	let segmentStart = 0;
	let preserveFrom = 0;
	let sawToolUseSinceText = false;
	let currentMessageHadToolUse = false;
	let previousMessageHadToolUse = false;
	let committedResult = null;
	let geminiErrorText;
	let sawGeminiStructuredOutput = false;
	const streamJsonDialect = isStreamJsonDialect({
		backend,
		providerId
	});
	for (const line of lines) for (const parsed of parseJsonRecordCandidates(line)) {
		sessionId = pickCliSessionId(parsed, backend) ?? sessionId;
		if (!sessionId && typeof parsed.thread_id === "string") sessionId = parsed.thread_id.trim();
		resumeCheckpointId = pickCliResumeCheckpointId({
			backend,
			providerId,
			parsed
		}) ?? resumeCheckpointId;
		const nextUsage = readCliUsage(parsed);
		if (!isClaudeStreamJsonResult({
			backend,
			providerId,
			parsed
		}) || !usage) usage = nextUsage ?? usage;
		if (isGeminiStreamJsonDialect({
			backend,
			providerId
		})) {
			const nextGeminiErrorText = readGeminiCliStreamJsonError(parsed);
			if (nextGeminiErrorText) {
				geminiErrorText = preferGeminiCliStreamJsonError(geminiErrorText, nextGeminiErrorText);
				sawGeminiStructuredOutput = true;
				continue;
			}
			if (parsed.type === "message" && parsed.role === "assistant" && typeof parsed.content === "string") {
				streamJsonText = `${streamJsonText}${parsed.content}`;
				sawGeminiStructuredOutput = true;
				continue;
			}
			if (parsed.type === "tool_use" || parsed.type === "tool_result" || parsed.type === "result") sawGeminiStructuredOutput = true;
		}
		const claudeResult = parseClaudeCliJsonlResult({
			backend,
			providerId,
			parsed,
			sessionId,
			usage
		});
		if (claudeResult) {
			if (claudeResult.errorText) return {
				...claudeResult,
				...resumeCheckpointId ? { resumeCheckpointId } : {}
			};
			const streamedText = streamJsonText.slice(segmentStart).trim();
			const preservedCandidate = streamJsonText.slice(preserveFrom).trim();
			const nextText = (preferStreamedClaudeTextOverResult({
				streamedText: preservedCandidate,
				finalMessageText: streamJsonText.slice(currentMessageStart).trim(),
				resultText: claudeResult.text
			}) ? preservedCandidate : claudeResult.text || streamedText || texts.join("\n").trim()).trim();
			const previousText = committedResult?.text?.trim() ?? "";
			let text = nextText;
			if (previousText && nextText && previousText !== nextText && !nextText.startsWith(previousText)) text = `${previousText}\n${nextText}`;
			else if (!nextText) text = previousText;
			committedResult = {
				...claudeResult,
				text,
				...resumeCheckpointId ? { resumeCheckpointId } : {}
			};
			segmentStart = streamJsonText.length;
			currentMessageStart = segmentStart;
			preserveFrom = segmentStart;
			pendingMessageSeparator = false;
			sawToolUseSinceText = false;
			currentMessageHadToolUse = false;
			previousMessageHadToolUse = false;
			continue;
		}
		if (parsed.type === "stream_event" && isRecord(parsed.event)) {
			if (parsed.event.type === "message_start") {
				pendingMessageSeparator = true;
				previousMessageHadToolUse = currentMessageHadToolUse;
				currentMessageHadToolUse = false;
			}
			if (parsed.event.type === "content_block_start" && isRecord(parsed.event.content_block) && isClaudeToolUseBlockType(parsed.event.content_block.type)) {
				sawToolUseSinceText = true;
				currentMessageHadToolUse = true;
			}
		}
		const claudeDelta = parseClaudeCliStreamingDelta({
			backend,
			providerId,
			parsed,
			textSoFar: streamJsonText,
			sessionId,
			usage
		});
		if (claudeDelta) {
			const boundaryPending = pendingMessageSeparator || sawToolUseSinceText;
			const isToolSplitBoundary = pendingMessageSeparator ? previousMessageHadToolUse : sawToolUseSinceText;
			const separator = boundaryPending && streamJsonText ? missingMessageBoundarySeparator(streamJsonText, claudeDelta.delta) : "";
			if (boundaryPending && streamJsonText) {
				currentMessageStart = streamJsonText.length + separator.length;
				if (!isToolSplitBoundary) preserveFrom = currentMessageStart;
			}
			pendingMessageSeparator = false;
			sawToolUseSinceText = false;
			streamJsonText = `${streamJsonText}${separator}${claudeDelta.delta}`;
			continue;
		}
		const item = isRecord(parsed.item) ? parsed.item : null;
		if (item && typeof item.text === "string") {
			const type = normalizeLowercaseStringOrEmpty(item.type);
			if (!type || type.includes("message")) texts.push(item.text);
		}
	}
	if (committedResult) return committedResult;
	if (isGeminiStreamJsonDialect({
		backend,
		providerId
	}) && geminiErrorText) return {
		text: "",
		sessionId,
		usage,
		errorText: geminiErrorText
	};
	if (streamJsonDialect && (streamJsonText.trim() || sawGeminiStructuredOutput)) return {
		text: streamJsonText.trim(),
		sessionId,
		usage,
		...resumeCheckpointId ? { resumeCheckpointId } : {}
	};
	if (streamJsonDialect) return {
		text: "",
		sessionId,
		usage,
		errorText: CLI_STREAM_JSON_MISSING_RESULT_ERROR
	};
	const text = texts.join("\n").trim();
	if (!text) return null;
	return {
		text,
		sessionId,
		usage
	};
}
/** Parses CLI output according to the backend output mode with text fallback. */
/** Parses CLI backend output using the configured JSON/JSONL/plain-text mode. */
function parseCliOutput(params) {
	const outputMode = params.outputMode ?? "text";
	if (outputMode === "text") return {
		text: params.raw.trim(),
		sessionId: params.fallbackSessionId
	};
	if (outputMode === "jsonl") {
		const parsed = parseCliJsonl(params.raw, params.backend, params.providerId);
		if (parsed) return parsed;
		if (isStreamJsonDialect(params)) return {
			text: "",
			sessionId: params.fallbackSessionId,
			errorText: CLI_STREAM_JSON_MISSING_RESULT_ERROR
		};
		return {
			text: params.raw.trim(),
			sessionId: params.fallbackSessionId
		};
	}
	return parseCliJson(params.raw, params.backend, params.providerId) ?? {
		text: params.raw.trim(),
		sessionId: params.fallbackSessionId
	};
}
/** Extracts the most specific structured CLI error message from mixed or JSON output. */
/** Extracts a human-readable error message from mixed CLI stderr/stdout text. */
function extractCliErrorMessage(raw) {
	const parsedRecords = parseJsonRecordCandidates(raw);
	if (parsedRecords.length === 0) return null;
	let errorText = "";
	for (const parsed of parsedRecords) {
		const next = collectExplicitCliErrorText(parsed);
		if (next) errorText = next;
	}
	return errorText || null;
}
//#endregion
//#region src/agents/cli-runner/claude-live-session-policy.ts
const LIVE_SESSION_LIMITS = {
	maxSessions: 16,
	maxStderrChars: 64 * 1024
};
/** Resolve Claude's live permission mode without asking root to use an unsupported bypass. */
function resolveClaudeLiveMode(security, ask, uid) {
	return security === "full" && ask === "off" && uid !== 0 ? "bypassPermissions" : "default";
}
//#endregion
//#region src/agents/cli-runner/claude-live-tool-approval.ts
const CLAUDE_NATIVE_TOOL_DESCRIPTION_HEAD_CHARS = 300;
const CLAUDE_NATIVE_TOOL_DESCRIPTION_TAIL_CHARS = 80;
const CLAUDE_NATIVE_TOOL_DESCRIPTION_MAX_CHARS = 380;
const CLAUDE_NATIVE_TOOL_APPROVAL_GATEWAY_GRACE_MS = 1e4;
const CLAUDE_NATIVE_TOOL_ALLOWED_DECISIONS = [
	"allow-once",
	"allow-always",
	"deny"
];
const CLAUDE_NATIVE_TOOL_TRUNCATED_DECISIONS = ["allow-once", "deny"];
const CLAUDE_NATIVE_TOOL_ARBITRARY_EXECUTION_TOOL = "Bash";
function resolveClaudeNativeToolApprovalPlan(execPermission) {
	if (execPermission.security === "deny") return "deny";
	if (execPermission.ask === "off") return execPermission.security === "full" ? "allow" : "deny";
	return "prompt";
}
/**
* The gateway caps approval descriptions (PLUGIN_APPROVAL_DESCRIPTION_MAX_LENGTH),
* so full inputs cannot ride this channel. Head+tail display defeats padded
* prefixes hiding an executable tail, and the quantified marker makes a partial
* view an explicit operator decision. Accepted tradeoff: the middle stays
* unreviewable; oversized inputs therefore never earn allow-always.
*/
function formatClaudeNativeToolDescription(toolInput) {
	const compact = JSON.stringify(toolInput) ?? "{}";
	if (compact.length <= CLAUDE_NATIVE_TOOL_DESCRIPTION_MAX_CHARS) return {
		compact,
		text: compact,
		truncated: false
	};
	const head = truncateUtf16Safe(compact, CLAUDE_NATIVE_TOOL_DESCRIPTION_HEAD_CHARS);
	const tail = sliceUtf16Safe(compact, compact.length - CLAUDE_NATIVE_TOOL_DESCRIPTION_TAIL_CHARS);
	return {
		compact,
		text: `${head} …[+${compact.length - head.length - tail.length} chars hidden]… ${tail}`,
		truncated: true
	};
}
function formatClaudeNativeToolTitle(toolName) {
	return truncateUtf16Safe(`Claude native tool: ${toolName}`, 80);
}
function resolveClaudeNativeToolAllowedDecisions(params) {
	return params.ask === "always" || params.toolName === CLAUDE_NATIVE_TOOL_ARBITRARY_EXECUTION_TOOL || params.descriptionTruncated ? CLAUDE_NATIVE_TOOL_TRUNCATED_DECISIONS : CLAUDE_NATIVE_TOOL_ALLOWED_DECISIONS;
}
function toAbortError(reason) {
	return reason instanceof Error ? reason : /* @__PURE__ */ new Error("Claude native tool approval aborted");
}
async function raceClaudeNativeToolApprovalAbort(promise, abortSignal) {
	if (!abortSignal) return promise;
	let onAbort;
	const abortPromise = new Promise((_, reject) => {
		if (abortSignal.aborted) {
			reject(toAbortError(abortSignal.reason));
			return;
		}
		onAbort = () => reject(toAbortError(abortSignal.reason));
		abortSignal.addEventListener("abort", onAbort, { once: true });
	});
	try {
		return await Promise.race([promise, abortPromise]);
	} finally {
		if (onAbort) abortSignal.removeEventListener("abort", onAbort);
	}
}
function waitForClaudeNativeToolApproval(params) {
	return raceClaudeNativeToolApprovalAbort(callGatewayTool("plugin.approval.waitDecision", { timeoutMs: params.gatewayTimeoutMs }, { id: params.id }, { signal: params.abortSignal }), params.abortSignal);
}
async function requestClaudeNativeToolApproval(params) {
	try {
		const timeoutMs = DEFAULT_PLUGIN_APPROVAL_TIMEOUT_MS;
		const gatewayTimeoutMs = addTimerTimeoutGraceMs(timeoutMs, CLAUDE_NATIVE_TOOL_APPROVAL_GATEWAY_GRACE_MS) ?? timeoutMs + CLAUDE_NATIVE_TOOL_APPROVAL_GATEWAY_GRACE_MS;
		const description = formatClaudeNativeToolDescription(params.toolInput);
		const detail = truncatePluginApprovalDetail(description.compact);
		const detailSanitization = params.toolName === CLAUDE_NATIVE_TOOL_ARBITRARY_EXECUTION_TOOL ? sanitizeExecApprovalWarningTextWithStatus(description.compact) : null;
		const summarySanitization = params.toolName === CLAUDE_NATIVE_TOOL_ARBITRARY_EXECUTION_TOOL ? sanitizeExecApprovalWarningTextWithStatus(description.text) : null;
		if (params.toolName === CLAUDE_NATIVE_TOOL_ARBITRARY_EXECUTION_TOOL && (description.truncated || detailSanitization?.truncated === true || detailSanitization?.oversized === true || summarySanitization?.truncated === true || summarySanitization?.oversized === true || summarySanitization && Array.from(summarySanitization.text).length > 512)) return {
			kind: "deny",
			reason: "policy-oversized"
		};
		const allowedDecisions = resolveClaudeNativeToolAllowedDecisions({
			ask: params.ask,
			toolName: params.toolName,
			descriptionTruncated: description.truncated
		});
		const requestResult = await raceClaudeNativeToolApprovalAbort(callGatewayTool("plugin.approval.request", { timeoutMs: gatewayTimeoutMs }, {
			pluginId: params.pluginId,
			toolName: params.toolName,
			toolCallId: params.toolCallId,
			agentId: params.agentId,
			sessionKey: params.sessionKey,
			title: formatClaudeNativeToolTitle(params.toolName),
			description: description.text,
			detail,
			severity: "warning",
			allowedDecisions,
			timeoutMs,
			twoPhase: true
		}, {
			expectFinal: false,
			signal: params.abortSignal
		}), params.abortSignal);
		const id = typeof requestResult?.id === "string" ? requestResult.id : "";
		if (!id) return {
			kind: "deny",
			reason: "unavailable"
		};
		let decision;
		if (Object.hasOwn(requestResult ?? {}, "decision")) decision = requestResult.decision;
		else {
			const waitResult = await waitForClaudeNativeToolApproval({
				id,
				gatewayTimeoutMs,
				abortSignal: params.abortSignal
			});
			decision = waitResult?.id === id ? waitResult.decision : void 0;
		}
		if (params.abortSignal?.aborted) return {
			kind: "deny",
			reason: "unavailable"
		};
		if (decision === "allow-once") return {
			kind: "allow",
			grantAlways: false
		};
		if (decision === "allow-always" && allowedDecisions.includes(decision)) return {
			kind: "allow",
			grantAlways: true
		};
		if (decision === "deny") return {
			kind: "deny",
			reason: "user"
		};
		return {
			kind: "deny",
			reason: "unavailable"
		};
	} catch {
		return {
			kind: "deny",
			reason: "unavailable"
		};
	}
}
//#endregion
//#region src/agents/cli-runner/output-error.ts
function createCliOutputFailoverError(params) {
	if (!params.output.errorText) return;
	const message = formatCliOutputError(params.output, {
		runId: params.runId,
		sessionId: params.sessionId
	});
	const reason = classifyFailoverReason(message, { provider: params.provider }) ?? "unknown";
	const code = params.output.terminalFailure?.reason === "max_turns" ? "cli_max_turns" : reason === "context_overflow" ? "cli_context_overflow" : void 0;
	return new FailoverError(message, {
		reason,
		provider: params.provider,
		model: params.model,
		sessionId: params.sessionId,
		lane: params.lane,
		status: resolveFailoverStatus(reason),
		code,
		rawError: params.output.errorText
	});
}
//#endregion
//#region src/agents/cli-runner/claude-live-session.ts
/**
* Manages reusable Claude CLI stdio sessions for CLI-backed agent turns.
*/
const CLAUDE_LIVE_IDLE_TIMEOUT_MS = 600 * 1e3;
const CLAUDE_LIVE_CONTROL_TIMEOUT_MS = 3e3;
const CLAUDE_LIVE_SYSTEM_PROMPT_PROBE_ERROR = "set_model: system_prompt must be a non-empty string when present";
const CLAUDE_LIVE_CLOSE_WAIT_TIMEOUT_MS = 5e3;
const liveSessions = /* @__PURE__ */ new Map();
const liveSessionCreates = /* @__PURE__ */ new Map();
const liveSessionTurns = new KeyedAsyncQueue();
function sha256(value) {
	return crypto.createHash("sha256").update(value).digest("hex");
}
/** Closes all live Claude CLI sessions and clears creation promises for tests. */
function resetClaudeLiveSessionsForTest() {
	for (const session of liveSessions.values()) closeLiveSession(session, "restart");
	liveSessions.clear();
	liveSessionCreates.clear();
}
/** Returns whether this owner still has an in-process Claude stdio session. */
function hasClaudeLiveSessionForOwner(owner) {
	return getClaudeLiveSessionGenerationForOwner(owner) !== void 0;
}
/** Returns the opaque generation of this owner's current or pending Claude stdio session. */
function getClaudeLiveSessionGenerationForOwner(owner) {
	const key = buildClaudeLiveOwnerKey(owner);
	return liveSessions.get(key)?.generation ?? liveSessionCreates.get(key)?.generation;
}
async function waitForManagedRunExit(managedRun) {
	let timeout = null;
	try {
		await Promise.race([managedRun.wait().then(() => void 0, () => void 0), new Promise((resolve) => {
			timeout = setTimeout(resolve, CLAUDE_LIVE_CLOSE_WAIT_TIMEOUT_MS);
			timeout.unref?.();
		})]);
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}
/** Closes the live Claude session associated with a prepared run context, if one exists. */
async function closeClaudeLiveSessionForContext(context) {
	const key = buildClaudeLiveKey(context);
	const session = liveSessions.get(key);
	if (session) {
		closeLiveSession(session, "restart");
		await waitForManagedRunExit(session.managedRun);
	}
	liveSessionCreates.delete(key);
}
/** Close a tainted live process so its replacement gets a fresh MCP capture key. */
async function rotateClaudeLiveMcpCaptureKeyForContext(context) {
	await closeClaudeLiveSessionForContext(context);
}
/** Returns whether a prepared backend context is eligible for Claude live stdio reuse. */
function shouldUseClaudeLiveSession(context) {
	return context.params.sessionEntry?.execHost !== "node" && context.backendResolved.id === "claude-cli" && context.preparedBackend.backend.liveSession === "claude-stdio" && context.preparedBackend.backend.output === "jsonl" && context.preparedBackend.backend.input === "stdin";
}
function upsertArgValue(args, flag, value) {
	const normalized = [];
	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i] ?? "";
		if (arg === flag) {
			i += 1;
			continue;
		}
		if (arg.startsWith(`${flag}=`)) continue;
		normalized.push(arg);
	}
	normalized.push(flag, value);
	return normalized;
}
function appendArg(args, flag) {
	return args.includes(flag) ? args : [...args, flag];
}
function stripLiveProcessArgs(args, backend, stripSystemPrompt) {
	const liveProcessFlags = new Set([
		"--session-id",
		stripSystemPrompt ? backend.systemPromptArg : void 0,
		stripSystemPrompt ? backend.systemPromptFileArg : void 0
	].filter((entry) => typeof entry === "string" && entry.length > 0));
	const stripped = [];
	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i] ?? "";
		if (liveProcessFlags.has(arg)) {
			i += 1;
			continue;
		}
		if ([...liveProcessFlags].some((flag) => arg.startsWith(`${flag}=`))) continue;
		stripped.push(arg);
	}
	return stripped;
}
/** Builds Claude CLI args for stream-json live sessions, stripping one-shot session flags. */
function buildClaudeLiveArgs(params) {
	const liveArgs = appendArg(upsertArgValue(upsertArgValue(upsertArgValue(stripLiveProcessArgs(params.args, params.backend, params.useResume && params.backend.systemPromptWhen !== "always"), "--input-format", "stream-json"), "--output-format", "stream-json"), "--permission-prompt-tool", "stdio"), "--replay-user-messages");
	return params.permissionMode ? upsertArgValue(liveArgs, "--permission-mode", params.permissionMode) : liveArgs;
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.claudeLiveSessionTestApi")] = {
	buildClaudeLiveArgs,
	readConfiguredExecPolicy,
	resetClaudeLiveSessionsForTest
};
function buildClaudeLiveOwnerKey(owner) {
	return `${owner.backendId}:${buildClaudeOwnerKey(owner)}`;
}
function buildClaudeLiveKey(context) {
	return buildClaudeLiveOwnerKey({
		backendId: context.backendResolved.id,
		agentAccountId: context.params.agentAccountId,
		agentId: context.params.agentId,
		authProfileId: context.effectiveAuthProfileId,
		sessionId: context.params.sessionId,
		sessionKey: context.params.sessionKey
	});
}
function buildClaudeLiveFingerprint(params) {
	const stableSystemPrompt = (params.context.preparedBackend.backend.systemPromptWhen === "always" ? splitSystemPromptCacheBoundary(params.context.systemPrompt)?.stablePrefix : void 0) ?? params.context.systemPrompt;
	const normalizeMcpConfigPath = Boolean(params.context.preparedBackend.mcpConfigHash);
	const skillSnapshot = params.context.params.skillsSnapshot;
	const skillsFingerprint = skillSnapshot ? sha256(JSON.stringify({
		promptHash: sha256(skillSnapshot.prompt),
		skillFilter: skillSnapshot.skillFilter,
		skills: skillSnapshot.skills,
		resolvedSkills: (skillSnapshot.resolvedSkills ?? []).map((skill) => ({
			name: skill.name,
			description: skill.description,
			filePath: skill.filePath,
			sourceInfo: skill.sourceInfo
		})),
		version: skillSnapshot.version
	})) : void 0;
	const normalizePluginDir = Boolean(skillsFingerprint);
	const omittedValueFlags = new Set([
		params.context.preparedBackend.backend.systemPromptArg,
		params.context.preparedBackend.backend.systemPromptFileArg,
		"--resume",
		"-r"
	].filter((entry) => typeof entry === "string" && entry.length > 0));
	const unstableValueFlags = new Set([
		"--session-id",
		normalizeMcpConfigPath ? "--mcp-config" : void 0,
		normalizePluginDir ? "--plugin-dir" : void 0
	].filter((entry) => typeof entry === "string" && entry.length > 0));
	const stableArgv = [];
	for (let i = 0; i < params.argv.length; i += 1) {
		const entry = params.argv[i] ?? "";
		if (omittedValueFlags.has(entry)) {
			i += 1;
			continue;
		}
		if ([...omittedValueFlags].some((flag) => entry.startsWith(`${flag}=`))) continue;
		if (unstableValueFlags.has(entry)) {
			stableArgv.push("<unstable>");
			i += 1;
			continue;
		}
		if ([...unstableValueFlags].some((flag) => entry.startsWith(`${flag}=`))) {
			stableArgv.push("<unstable>");
			continue;
		}
		stableArgv.push(entry);
	}
	return JSON.stringify({
		command: params.argv[0],
		workspaceDirHash: sha256(params.context.workspaceDir),
		cwdHash: params.context.cwdHash ?? sha256(params.context.cwd ?? params.context.workspaceDir),
		provider: params.context.params.provider,
		model: params.context.normalizedModel,
		systemPromptHash: sha256(stableSystemPrompt),
		authProfileIdHash: params.context.effectiveAuthProfileId ? sha256(params.context.effectiveAuthProfileId) : void 0,
		authEpochHash: params.context.authEpoch ? sha256(params.context.authEpoch) : void 0,
		extraSystemPromptHash: params.context.extraSystemPromptHash,
		promptToolNamesHash: params.context.promptToolNamesHash,
		mcpConfigHash: params.context.preparedBackend.mcpConfigHash,
		credentialFingerprint: params.context.preparedBackend.secretInput?.fingerprint,
		skillsFingerprint,
		argv: stableArgv,
		env: Object.keys(params.env).toSorted().map((key) => [key, params.env[key] ? sha256(params.env[key]) : ""])
	});
}
function createAbortError(reason) {
	if (reason instanceof Error && isTimeoutError(reason)) return reason;
	if (reason === void 0) return createAbortError$1("CLI run aborted");
	const error = new Error(reason instanceof Error ? reason.message : typeof reason === "string" ? reason : "CLI run aborted", reason instanceof Error ? { cause: reason } : void 0);
	error.name = "AbortError";
	return error;
}
function clearTurnTimers(turn) {
	if (turn.noOutputTimer) {
		clearTimeout(turn.noOutputTimer);
		turn.noOutputTimer = null;
	}
	if (turn.timeoutTimer) {
		clearTimeout(turn.timeoutTimer);
		turn.timeoutTimer = null;
	}
}
function clearOutstandingBackgroundTasks(session) {
	session.outstandingBackgroundTaskIds.clear();
}
function settleClaudeLivePendingControlRequest(session, response) {
	const pending = session.pendingControlRequest;
	if (!pending) return;
	clearTimeout(pending.timer);
	session.pendingControlRequest = null;
	pending.resolve(response);
}
function finishTurn(session, output) {
	const turn = session.currentTurn;
	if (!turn) return;
	cliBackendLog.info(`claude live session turn: provider=${session.providerId} model=${session.modelId} durationMs=${Date.now() - turn.startedAtMs} rawLines=${turn.rawLines.length} ${formatCliBackendOutputDigest(output.text)}`);
	turn.streamingParser.finish();
	failActiveClaudeLiveTools(turn, /* @__PURE__ */ new Error("Tool result missing before turn completed"));
	clearTurnTimers(turn);
	clearOutstandingBackgroundTasks(session);
	session.currentTurn = null;
	turn.resolve(output);
	scheduleIdleClose(session);
}
function failTurn(session, error) {
	const turn = session.currentTurn;
	if (!turn) return;
	const errorKind = error instanceof Error ? error.name : typeof error;
	cliBackendLog.warn(`claude live session turn failed: provider=${session.providerId} model=${session.modelId} durationMs=${Date.now() - turn.startedAtMs} error=${errorKind}`);
	turn.streamingParser.finish();
	failActiveClaudeLiveTools(turn, error);
	clearTurnTimers(turn);
	clearOutstandingBackgroundTasks(session);
	session.currentTurn = null;
	turn.reject(error);
}
function abortTurn(session, error) {
	if (!session.currentTurn) return;
	closeLiveSession(session, "abort", error);
}
function cleanupLiveSession(session) {
	if (!session.cleanupPromise) session.cleanupPromise = session.cleanup().catch((error) => {
		cliBackendLog.warn(`Claude live session cleanup failed: ${formatErrorMessage(error)}`);
	});
	return session.cleanupPromise;
}
function closeLiveSession(session, reason, error) {
	if (session.closing) return;
	cliBackendLog.info(`claude live session close: provider=${session.providerId} model=${session.modelId} reason=${reason}`);
	session.closing = true;
	if (session.idleTimer) {
		clearTimeout(session.idleTimer);
		session.idleTimer = null;
	}
	if (liveSessions.get(session.key) === session) liveSessions.delete(session.key);
	settleClaudeLivePendingControlRequest(session, null);
	if (error) failTurn(session, error);
	else clearOutstandingBackgroundTasks(session);
	session.managedRun.cancel("manual-cancel");
	cleanupLiveSession(session);
}
function scheduleIdleClose(session) {
	if (session.idleTimer) clearTimeout(session.idleTimer);
	session.idleTimer = setTimeout(() => {
		if (!session.currentTurn) closeLiveSession(session, "idle");
	}, CLAUDE_LIVE_IDLE_TIMEOUT_MS);
}
function createTimeoutError(session, message, code, cliTimeout) {
	return new FailoverError(message, {
		reason: "timeout",
		provider: session.providerId,
		model: session.modelId,
		status: resolveFailoverStatus("timeout"),
		code,
		cliTimeout
	});
}
function createOutputLimitError(session, message) {
	return new FailoverError(message, {
		reason: "format",
		provider: session.providerId,
		model: session.modelId,
		status: resolveFailoverStatus("format")
	});
}
function diagnosticToolSourceForClaudeLiveTool(toolName) {
	return toolName.startsWith("mcp__") ? "mcp" : "core";
}
function claudeLiveDiagnosticBase(turn) {
	return {
		runId: turn.diagnosticRefs.runId,
		sessionId: turn.diagnosticRefs.sessionId,
		...turn.diagnosticRefs.sessionKey ? { sessionKey: turn.diagnosticRefs.sessionKey } : {},
		...turn.diagnosticRefs.agentId ? { agentId: turn.diagnosticRefs.agentId } : {}
	};
}
function emitClaudeLiveProgress(turn, reason) {
	emitTrustedDiagnosticEvent({
		type: "run.progress",
		...claudeLiveDiagnosticBase(turn),
		reason
	});
}
function summarizeClaudeLiveToolInput(input) {
	if (input === void 0) return;
	if (input === null) return { kind: "null" };
	if (Array.isArray(input)) return {
		kind: "array",
		length: input.length
	};
	switch (typeof input) {
		case "object": return { kind: "object" };
		case "string": return {
			kind: "string",
			length: input.length
		};
		case "number": return { kind: "number" };
		case "boolean": return { kind: "boolean" };
		case "undefined": return { kind: "undefined" };
		default: return { kind: "other" };
	}
}
function markClaudeLiveToolStarted(turn, tool) {
	if (turn.completedToolCallIds.has(tool.toolCallId) || turn.activeTools.has(tool.toolCallId)) return;
	const now = Date.now();
	turn.activeTools.set(tool.toolCallId, {
		toolName: tool.name,
		toolCallId: tool.toolCallId,
		kind: tool.kind,
		startedAt: now
	});
	turn.toolEventCount += 1;
	emitTrustedDiagnosticEvent({
		type: "tool.execution.started",
		...claudeLiveDiagnosticBase(turn),
		toolName: tool.name,
		toolSource: diagnosticToolSourceForClaudeLiveTool(tool.name),
		toolOwner: "claude-cli",
		toolCallId: tool.toolCallId,
		paramsSummary: summarizeClaudeLiveToolInput(tool.args)
	});
	emitClaudeLiveProgress(turn, "cli_live:tool_started");
}
function markClaudeLiveToolCompleted(turn, result, terminalOutcome) {
	if (turn.completedToolCallIds.has(result.toolCallId)) return;
	turn.toolEventCount += 1;
	const activeTool = turn.activeTools.get(result.toolCallId);
	if (!activeTool) {
		emitClaudeLiveProgress(turn, "cli_live:tool_result");
		return;
	}
	turn.activeTools.delete(result.toolCallId);
	turn.completedToolCallIds.add(result.toolCallId);
	const event = {
		...claudeLiveDiagnosticBase(turn),
		toolName: activeTool.toolName,
		toolSource: diagnosticToolSourceForClaudeLiveTool(activeTool.toolName),
		toolOwner: "claude-cli",
		toolCallId: activeTool.toolCallId,
		durationMs: Math.max(0, Date.now() - activeTool.startedAt)
	};
	if (terminalOutcome?.outcome === "blocked") emitTrustedDiagnosticEvent({
		type: "tool.execution.blocked",
		...event,
		deniedReason: terminalOutcome.deniedReason,
		reason: terminalOutcome.reason ?? "blocked by before-tool policy"
	});
	else if (terminalOutcome?.outcome === "unknown") emitTrustedDiagnosticEvent({
		type: "tool.execution.error",
		...event,
		errorCategory: "cli_tool_ambiguous",
		errorCode: "tool_outcome_unknown"
	});
	else if (terminalOutcome || result.isError) {
		const terminalReason = terminalOutcome?.outcome ?? "failed";
		emitTrustedDiagnosticEvent({
			type: "tool.execution.error",
			...event,
			errorCategory: terminalReason === "cancelled" ? "aborted" : "tool_failed",
			terminalReason
		});
	} else emitTrustedDiagnosticEvent({
		type: "tool.execution.completed",
		...event
	});
	emitClaudeLiveProgress(turn, "cli_live:tool_result");
}
function markClaudeLiveToolDenied(turn, tool) {
	markClaudeLiveToolStarted(turn, tool);
	markClaudeLiveToolCompleted(turn, {
		toolCallId: tool.toolCallId,
		name: tool.name,
		isError: true
	}, {
		outcome: "blocked",
		deniedReason: "cli_live_exec_policy",
		reason: "blocked by CLI live execution policy"
	});
}
function failActiveClaudeLiveTools(turn, error) {
	const terminalReason = resolveCliToolTerminalReason({
		error,
		abortSignal: turn.abortSignal
	});
	const errorCategory = terminalReason === "timed_out" ? "timeout" : terminalReason === "cancelled" ? "aborted" : "error";
	for (const activeTool of turn.activeTools.values()) {
		const event = {
			...claudeLiveDiagnosticBase(turn),
			toolName: activeTool.toolName,
			toolSource: diagnosticToolSourceForClaudeLiveTool(activeTool.toolName),
			toolOwner: "claude-cli",
			toolCallId: activeTool.toolCallId,
			durationMs: Math.max(0, Date.now() - activeTool.startedAt)
		};
		if (activeTool.kind === "server_tool_use") {
			emitTrustedDiagnosticEvent({
				type: "tool.execution.error",
				...event,
				errorCategory: "cli_tool_ambiguous",
				errorCode: "tool_outcome_unknown"
			});
			continue;
		}
		emitTrustedDiagnosticEvent({
			type: "tool.execution.error",
			...event,
			errorCategory,
			terminalReason
		});
	}
	turn.activeTools.clear();
}
function noteClaudeLiveProgress(turn, parsed, sawToolEvent) {
	if (parsed.type === "result") {
		emitClaudeLiveProgress(turn, "cli_live:result");
		return;
	}
	if (sawToolEvent) return;
	emitClaudeLiveProgress(turn, "cli_live:stream_progress");
}
function armNoOutputTimer(session, turn, delayMs) {
	if (turn.noOutputTimer) clearTimeout(turn.noOutputTimer);
	turn.noOutputTimer = setTimeout(() => {
		const quietSinceMs = turn.lastOutputAtMs ?? turn.startedAtMs;
		if (turn.activeTools.size > 0 || session.outstandingBackgroundTaskIds.size > 0) {
			const remainingMs = quietSinceMs + Math.max(session.noOutputTimeoutMs, BLOCKED_TOOL_CALL_ABORT_FLOOR_MS) - Date.now();
			if (remainingMs > 0) {
				armNoOutputTimer(session, turn, remainingMs);
				return;
			}
		}
		const retryableResumeStall = turn.useResume && session.stdoutBuffer.trim().length === 0 && !turn.hasReplayUnsafeActivity && turn.toolEventCount === 0 && turn.activeTools.size === 0 && session.outstandingBackgroundTaskIds.size === 0;
		closeLiveSession(session, "abort", createTimeoutError(session, `CLI produced no output for ${Math.round((Date.now() - quietSinceMs) / 1e3)}s and was terminated.`, turn.lastOutputAtMs === null || retryableResumeStall ? "cli_no_output_timeout" : void 0, {
			mode: "no-output",
			timeoutSeconds: Math.round((Date.now() - quietSinceMs) / 1e3),
			observedActivity: turn.lastOutputAtMs !== null || turn.toolEventCount > 0 || turn.rawLines.length > 0,
			activeToolCount: turn.activeTools.size,
			backgroundTaskCount: session.outstandingBackgroundTaskIds.size
		}));
	}, delayMs);
}
const CLAUDE_LIVE_RESULT_HOLDING_BACKGROUND_TASK_TYPES = /* @__PURE__ */ new Set(["local_agent", "local_workflow"]);
/** Replace outstanding subagent/workflow task ids from background_tasks_changed. */
function applyBackgroundTasksChanged(session, parsed) {
	if (parsed.type !== "system" || parsed.subtype !== "background_tasks_changed") return;
	const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
	session.outstandingBackgroundTaskIds.clear();
	for (const task of tasks) {
		if (!isRecord(task)) continue;
		const taskType = typeof task.task_type === "string" ? task.task_type.trim() : "";
		if (!CLAUDE_LIVE_RESULT_HOLDING_BACKGROUND_TASK_TYPES.has(taskType)) continue;
		const taskId = typeof task.task_id === "string" ? task.task_id.trim() : "";
		if (taskId) session.outstandingBackgroundTaskIds.add(taskId);
	}
}
function applyClaudeLiveInputLifecycle(turn, parsed) {
	if (parsed.type === "command_lifecycle" && parsed.command_uuid === turn.inputUuid && parsed.state === "started" && !turn.inputStarted) {
		turn.inputStarted = true;
		emitClaudeLiveProgress(turn, "cli_live:input_started");
	}
}
function applyClaudeLiveSessionRequirement(session, parsed) {
	const requirement = session.liveSessionRequirement;
	if (!requirement || parsed.type !== "system" || parsed.subtype !== "init") return true;
	if ((Array.isArray(parsed.capabilities) ? parsed.capabilities.filter((value) => typeof value === "string") : []).includes(requirement.capability)) {
		session.liveSessionCapabilityReady = true;
		return true;
	}
	const version = typeof parsed.claude_code_version === "string" ? parsed.claude_code_version.trim() || void 0 : void 0;
	closeLiveSession(session, "abort", new FailoverError(`The running Claude Code build${version ? ` (version ${version})` : ""} did not advertise the required ${requirement.capability} capability. Claude Code ${requirement.minimumVersion} is the first known compatible release. Run \`${requirement.updateCommand}\`, restart OpenClaw, and retry.`, {
		reason: "format",
		provider: session.providerId,
		model: session.modelId,
		status: resolveFailoverStatus("format"),
		code: "cli_live_session_unsupported"
	}));
	return false;
}
function resetNoOutputTimer(session) {
	const turn = session.currentTurn;
	if (!turn) return;
	turn.lastOutputAtMs = Date.now();
	armNoOutputTimer(session, turn, session.noOutputTimeoutMs);
}
function parseSessionId(parsed) {
	return (typeof parsed.session_id === "string" ? parsed.session_id.trim() : typeof parsed.sessionId === "string" ? parsed.sessionId.trim() : "") || void 0;
}
function readConfiguredExecPolicy(context) {
	const agentId = context.params.agentId ?? resolveAgentIdFromSessionKey(context.params.sessionKey, context.params.config ? resolveDefaultAgentId(context.params.config) : "main");
	const exec = (context.params.config ? resolveAgentConfig(context.params.config, agentId)?.tools?.exec : void 0) ?? context.params.config?.tools?.exec;
	const configured = resolveExecModePolicy({
		mode: exec?.mode,
		security: exec?.security ?? "full",
		ask: exec?.ask ?? "off"
	});
	const security = configured.security;
	const configuredAsk = configured.ask;
	const sessionAsk = normalizeExecAsk(context.params.sessionEntry?.execAsk);
	return {
		agentId,
		security,
		ask: sessionAsk ? maxAsk(configuredAsk, sessionAsk) : configuredAsk
	};
}
function resolveClaudeLiveExecPermission(context) {
	const configured = readConfiguredExecPolicy(context);
	const approvals = resolveExecApprovalsFromFile({
		file: loadExecApprovals(),
		agentId: configured.agentId,
		overrides: {
			security: configured.security,
			ask: configured.ask
		}
	});
	const security = minSecurity(configured.security, approvals.agent.security);
	const ask = maxAsk(configured.ask, approvals.agent.ask);
	return {
		security,
		ask,
		permissionMode: resolveClaudeLiveMode(security, ask, process.getuid?.())
	};
}
function parseClaudeLiveJsonLine(session, trimmed) {
	const maxPendingLineChars = session.currentTurn?.outputLimits.maxPendingLineChars ?? 8388608;
	if (trimmed.length > maxPendingLineChars) {
		closeLiveSession(session, "abort", createOutputLimitError(session, "Claude CLI JSONL line exceeded output limit."));
		return null;
	}
	let parsed;
	try {
		parsed = JSON.parse(trimmed);
	} catch {
		return null;
	}
	return isRecord(parsed) ? parsed : null;
}
function writeClaudeLiveControlResponse(session, response) {
	const stdin = session.managedRun.stdin;
	if (!stdin) throw new Error("Claude CLI live session stdin is unavailable");
	stdin.write(`${JSON.stringify(response)}\n`);
}
function handleClaudeLiveControlResponse(session, parsed) {
	const pending = session.pendingControlRequest;
	if (!pending || parsed.type !== "control_response" || !isRecord(parsed.response)) return false;
	const response = parsed.response;
	if (response.request_id !== pending.requestId) return false;
	settleClaudeLivePendingControlRequest(session, {
		subtype: typeof response.subtype === "string" ? response.subtype : "",
		...typeof response.error === "string" ? { error: response.error } : {}
	});
	return true;
}
async function requestClaudeLiveModelUpdate(params) {
	if (params.session.pendingControlRequest) return null;
	const requestId = crypto.randomUUID();
	const response = new Promise((resolve) => {
		params.session.pendingControlRequest = {
			requestId,
			timer: setTimeout(() => {
				settleClaudeLivePendingControlRequest(params.session, null);
			}, CLAUDE_LIVE_CONTROL_TIMEOUT_MS),
			resolve
		};
	});
	try {
		await writeTurnInput(params.session, `${JSON.stringify({
			type: "control_request",
			request_id: requestId,
			request: {
				subtype: "set_model",
				model: params.model,
				system_prompt: params.systemPrompt
			}
		})}\n`);
	} catch {
		settleClaudeLivePendingControlRequest(params.session, null);
	}
	return response;
}
async function supportsClaudeLiveSystemPromptSwitch(params) {
	if (params.session.systemPromptSwitchCapability !== "unknown") return params.session.systemPromptSwitchCapability === "supported";
	const response = await requestClaudeLiveModelUpdate({
		session: params.session,
		model: params.model,
		systemPrompt: ""
	});
	const supported = response?.subtype === "error" && response.error === CLAUDE_LIVE_SYSTEM_PROMPT_PROBE_ERROR;
	params.session.systemPromptSwitchCapability = supported ? "supported" : "unsupported";
	return supported;
}
async function updateClaudeLiveSystemPrompt(params) {
	const systemPrompt = stripSystemPromptCacheBoundary(params.systemPrompt);
	if (!systemPrompt.trim() || !await supportsClaudeLiveSystemPromptSwitch({
		session: params.session,
		model: params.model
	})) return false;
	return (await requestClaudeLiveModelUpdate({
		session: params.session,
		model: params.model,
		systemPrompt
	}))?.subtype === "success";
}
async function refreshClaudeLiveSystemPromptForReuse(params) {
	if (params.session.systemPromptHash === params.systemPromptHash) return true;
	if (await updateClaudeLiveSystemPrompt({
		session: params.session,
		model: params.context.normalizedModel,
		systemPrompt: params.context.systemPrompt
	})) {
		params.session.systemPromptHash = params.systemPromptHash;
		return true;
	}
	closeLiveSession(params.session, "restart");
	return false;
}
function writeClaudeLiveToolControlResponse(params) {
	writeClaudeLiveControlResponse(params.session, {
		type: "control_response",
		response: {
			subtype: "success",
			request_id: params.requestId,
			response: params.decision.behavior === "allow" ? {
				behavior: "allow",
				updatedInput: params.toolInput,
				...params.toolUseId ? { toolUseID: params.toolUseId } : {}
			} : {
				behavior: "deny",
				decisionClassification: "user_reject",
				message: params.decision.message
			}
		}
	});
}
function markClaudeLiveControlToolDenied(params) {
	if (!params.toolUseId || !params.toolName) return;
	markClaudeLiveToolDenied(params.turn, {
		toolCallId: params.toolUseId,
		name: params.toolName,
		kind: "tool_use",
		args: params.toolInput
	});
}
function handleClaudeLiveControlRequest(session, turn, parsed) {
	if (parsed.type !== "control_request" || !isRecord(parsed.request)) return;
	const request = parsed.request;
	if (request.subtype !== "can_use_tool") return;
	const requestId = typeof parsed.request_id === "string" ? parsed.request_id : "";
	if (!requestId) return;
	const toolUseId = typeof request.tool_use_id === "string" ? request.tool_use_id : void 0;
	const toolName = typeof request.tool_name === "string" ? request.tool_name.trim() : "";
	const toolInput = isRecord(request.input) ? request.input : {};
	const plan = resolveClaudeNativeToolApprovalPlan(turn.execPermission);
	if (plan === "allow" || plan === "prompt" && turn.execPermission.ask !== "always" && session.nativeToolApprovalGrants.has(toolName)) {
		writeClaudeLiveToolControlResponse({
			session,
			requestId,
			toolUseId,
			toolInput,
			decision: { behavior: "allow" }
		});
		return;
	}
	if (plan === "deny") {
		markClaudeLiveControlToolDenied({
			turn,
			toolUseId,
			toolName,
			toolInput
		});
		writeClaudeLiveToolControlResponse({
			session,
			requestId,
			toolUseId,
			toolInput,
			decision: {
				behavior: "deny",
				message: `OpenClaw exec policy denied Claude native tool use (security=${turn.execPermission.security}, ask=${turn.execPermission.ask}).`
			}
		});
		return;
	}
	(async () => {
		const outcome = await requestClaudeNativeToolApproval({
			toolName,
			toolInput,
			pluginId: session.providerId,
			sessionKey: turn.diagnosticRefs.sessionKey,
			agentId: turn.diagnosticRefs.agentId,
			toolCallId: toolUseId,
			abortSignal: turn.abortSignal,
			ask: turn.execPermission.ask
		});
		const runAborted = turn.abortSignal?.aborted === true;
		const allowed = !runAborted && outcome.kind === "allow";
		if (!runAborted && outcome.kind === "allow" && outcome.grantAlways) session.nativeToolApprovalGrants.add(toolName);
		if (!allowed) markClaudeLiveControlToolDenied({
			turn,
			toolUseId,
			toolName,
			toolInput
		});
		if (session.closing || !session.managedRun.stdin) return;
		try {
			writeClaudeLiveToolControlResponse({
				session,
				requestId,
				toolUseId,
				toolInput,
				decision: allowed ? { behavior: "allow" } : {
					behavior: "deny",
					message: outcome.kind === "deny" && outcome.reason === "policy-oversized" ? "OpenClaw denied Claude native tool use (Bash): the command is too large to display for out-of-band approval. Split it into smaller commands and retry." : outcome.kind === "deny" && outcome.reason === "user" && !runAborted ? `OpenClaw user denied Claude native tool use (${toolName}).` : `OpenClaw approval was not granted for Claude native tool use (${toolName}).`
				}
			});
		} catch {}
	})();
}
function handleClaudeLiveLine(session, line) {
	const turn = session.currentTurn;
	const trimmed = line.trim();
	if (!trimmed) return;
	const parsed = parseClaudeLiveJsonLine(session, trimmed);
	if (turn) turn.observedStdout = true;
	if (!parsed) {
		if (turn) turn.hasReplayUnsafeActivity = true;
		return;
	}
	const parsedSessionId = parseSessionId(parsed);
	if (parsedSessionId) {
		session.sessionId = parsedSessionId;
		if (parsed.type === "system" && parsed.subtype === "init") turn?.onSessionId?.(parsedSessionId);
	}
	if (handleClaudeLiveControlResponse(session, parsed)) return;
	if (!turn) return;
	applyClaudeLiveInputLifecycle(turn, parsed);
	if (!applyClaudeLiveSessionRequirement(session, parsed)) return;
	if (!session.liveSessionCapabilityReady) return;
	if (!turn.inputStarted) {
		if (!(parsed.type === "system" && parsed.subtype === "init")) turn.hasReplayUnsafeActivity = true;
		return;
	}
	if (!(parsed.type === "system" && parsed.subtype === "init") && parsed.type !== "command_lifecycle") turn.hasReplayUnsafeActivity = true;
	turn.rawChars += trimmed.length + 1;
	if (turn.rawChars > turn.outputLimits.maxTurnRawChars || turn.rawLines.length >= turn.outputLimits.maxTurnLines) {
		closeLiveSession(session, "abort", createOutputLimitError(session, "Claude CLI turn output exceeded limit."));
		return;
	}
	turn.rawLines.push(trimmed);
	applyBackgroundTasksChanged(session, parsed);
	const toolEventCountBefore = turn.toolEventCount;
	turn.streamingParser.push(`${trimmed}\n`);
	turn.sessionId = parsedSessionId ?? turn.sessionId;
	noteClaudeLiveProgress(turn, parsed, turn.toolEventCount !== toolEventCountBefore);
	handleClaudeLiveControlRequest(session, turn, parsed);
	if (parsed.type !== "result") return;
	turn.onPhase?.("resolve");
	const raw = turn.rawLines.join("\n");
	const output = turn.streamingParser.getOutput() ?? parseCliOutput({
		raw,
		backend: turn.backend,
		providerId: session.providerId,
		outputMode: "jsonl",
		fallbackSessionId: turn.sessionId
	});
	if (output.errorText) {
		const error = createCliOutputFailoverError({
			output,
			provider: session.providerId,
			model: session.modelId,
			runId: turn.diagnosticRefs.runId,
			sessionId: turn.diagnosticRefs.sessionId
		});
		if (error) failTurn(session, error);
		scheduleIdleClose(session);
		return;
	}
	if (session.outstandingBackgroundTaskIds.size > 0) {
		turn.onPhase?.("send");
		emitClaudeLiveProgress(turn, "cli_live:result_deferred_background_tasks");
		return;
	}
	finishTurn(session, output);
}
function handleClaudeStdout(session, chunk) {
	session.currentTurn?.onCliOutput?.(chunk, "stdout");
	resetNoOutputTimer(session);
	session.stdoutBuffer += chunk;
	const maxPendingLineChars = session.currentTurn?.outputLimits.maxPendingLineChars ?? 8388608;
	if (session.stdoutBuffer.length > maxPendingLineChars) {
		closeLiveSession(session, "abort", createOutputLimitError(session, "Claude CLI JSONL line exceeded output limit."));
		return;
	}
	const lines = session.stdoutBuffer.split(/\r?\n/g);
	session.stdoutBuffer = lines.pop() ?? "";
	try {
		for (const line of lines) {
			handleClaudeLiveLine(session, line);
			if (session.closing) break;
		}
	} catch (error) {
		closeLiveSession(session, "abort", error);
	}
}
function handleClaudeExit(session, exitCode) {
	session.closing = true;
	if (session.idleTimer) {
		clearTimeout(session.idleTimer);
		session.idleTimer = null;
	}
	if (liveSessions.get(session.key) === session) liveSessions.delete(session.key);
	settleClaudeLivePendingControlRequest(session, null);
	cleanupLiveSession(session);
	if (!session.currentTurn) return;
	if (session.stdoutBuffer.trim()) {
		try {
			handleClaudeLiveLine(session, session.stdoutBuffer);
		} catch (error) {
			session.stdoutBuffer = "";
			failTurn(session, error);
			return;
		}
		session.stdoutBuffer = "";
	}
	if (!session.currentTurn) return;
	const stderr = session.stderr.trim();
	const fallbackMessage = exitCode === 0 ? "Claude CLI exited before completing the turn." : "Claude CLI failed.";
	const message = extractCliErrorMessage(stderr) ?? (stderr || fallbackMessage);
	if (exitCode === 0 && !stderr) {
		const turn = session.currentTurn;
		const retryCode = turn && !turn.observedStdout && turn.rawLines.length === 0 ? "cli_unknown_empty_failure" : void 0;
		failTurn(session, new FailoverError(message, {
			reason: "empty_response",
			provider: session.providerId,
			model: session.modelId,
			status: resolveFailoverStatus("empty_response"),
			code: retryCode
		}));
		return;
	}
	const reason = classifyFailoverReason(message, { provider: session.providerId }) ?? "unknown";
	const code = reason === "context_overflow" ? "cli_context_overflow" : void 0;
	failTurn(session, new FailoverError(message, {
		reason,
		provider: session.providerId,
		model: session.modelId,
		status: resolveFailoverStatus(reason),
		code
	}));
}
function createClaudeUserInputMessage(content, uuid) {
	return `${JSON.stringify({
		type: "user",
		uuid,
		session_id: "",
		parent_tool_use_id: null,
		message: {
			role: "user",
			content
		}
	})}\n`;
}
async function writeTurnInput(session, payload) {
	const stdin = session.managedRun.stdin;
	if (!stdin) throw new Error("Claude CLI live session stdin is unavailable");
	await new Promise((resolve, reject) => {
		stdin.write(payload, (error) => {
			if (error) {
				reject(error);
				return;
			}
			resolve();
		});
	});
}
async function createClaudeLiveSession(params) {
	let session = null;
	const mcpCaptureAttempt = await prepareCliBundleMcpCaptureAttempt({
		mode: params.context.backendResolved.bundleMcpMode,
		backend: params.context.preparedBackend.backend,
		env: params.env,
		captureKey: params.mcpCaptureKey
	});
	let managedRun;
	try {
		managedRun = await params.supervisor.spawn({
			sessionId: params.context.params.sessionId,
			backendId: params.context.backendResolved.id,
			scopeKey: `claude-live:${params.key}`,
			replaceExistingScope: true,
			mode: "child",
			argv: params.argv,
			cwd: params.context.cwd ?? params.context.workspaceDir,
			env: mcpCaptureAttempt.env ?? params.env,
			stdinMode: "pipe-open",
			secretInput: params.context.preparedBackend.secretInput,
			captureOutput: false,
			onStdout: (chunk) => {
				if (session) handleClaudeStdout(session, chunk);
			},
			onStderr: (chunk) => {
				if (session) {
					session.currentTurn?.onCliOutput?.(chunk, "stderr");
					if (session.currentTurn && chunk.trim()) session.currentTurn.hasReplayUnsafeActivity = true;
					session.stderr += chunk;
					if (session.stderr.length > LIVE_SESSION_LIMITS.maxStderrChars) {
						closeLiveSession(session, "abort", createOutputLimitError(session, "Claude CLI stderr exceeded limit."));
						return;
					}
					resetNoOutputTimer(session);
				}
			}
		});
	} catch (error) {
		await mcpCaptureAttempt.cleanup?.();
		throw error;
	}
	session = {
		key: params.key,
		generation: params.generation,
		fingerprint: params.fingerprint,
		systemPromptHash: params.systemPromptHash,
		systemPromptSwitchCapability: "unknown",
		liveSessionRequirement: params.context.backendResolved.liveSessionRequirement,
		liveSessionCapabilityReady: !params.context.backendResolved.liveSessionRequirement,
		managedRun,
		providerId: params.context.params.provider,
		modelId: params.context.modelId,
		noOutputTimeoutMs: params.noOutputTimeoutMs,
		stderr: "",
		stdoutBuffer: "",
		currentTurn: null,
		idleTimer: null,
		cleanup: async () => {
			await mcpCaptureAttempt.cleanup?.();
			await params.cleanup();
		},
		cleanupPromise: null,
		closing: false,
		pendingControlRequest: null,
		mcpCaptureKey: params.mcpCaptureKey,
		nativeToolApprovalGrants: /* @__PURE__ */ new Set(),
		outstandingBackgroundTaskIds: /* @__PURE__ */ new Set()
	};
	managedRun.wait().then((exit) => handleClaudeExit(session, exit.exitCode), (error) => {
		if (session) closeLiveSession(session, "abort", error);
	});
	liveSessions.set(params.key, session);
	cliBackendLog.info(`claude live session start: provider=${session.providerId} model=${session.modelId} activeSessions=${liveSessions.size}`);
	return session;
}
function createTurn(params) {
	const turn = {
		backend: params.context.preparedBackend.backend,
		diagnosticRefs: {
			runId: params.context.params.runId,
			sessionId: params.context.params.sessionId,
			...params.context.params.sessionKey ? { sessionKey: params.context.params.sessionKey } : {},
			...params.context.params.agentId ? { agentId: params.context.params.agentId } : {}
		},
		abortSignal: params.context.params.abortSignal,
		outputLimits: resolveCliStreamJsonOutputLimits(params.context.preparedBackend.backend),
		startedAtMs: Date.now(),
		rawLines: [],
		rawChars: 0,
		noOutputTimer: null,
		lastOutputAtMs: null,
		timeoutTimer: null,
		activeTools: /* @__PURE__ */ new Map(),
		observedStdout: false,
		inputUuid: params.inputUuid,
		inputStarted: false,
		onSessionId: params.onSessionId,
		useResume: params.useResume,
		hasReplayUnsafeActivity: false,
		completedToolCallIds: /* @__PURE__ */ new Set(),
		toolEventCount: 0,
		streamingParser: createCliJsonlStreamingParser({
			backend: params.context.preparedBackend.backend,
			providerId: params.context.backendResolved.id,
			onAssistantDelta: params.onAssistantDelta,
			onThinkingDelta: params.onThinkingDelta,
			onThinkingProgress: params.onThinkingProgress,
			onToolUseStart: (delta) => {
				markClaudeLiveToolStarted(turn, delta);
				params.onToolUseStart?.(delta);
			},
			onToolResult: (delta) => {
				markClaudeLiveToolCompleted(turn, delta, params.resolveToolResultTerminalOutcome?.(delta));
				params.onToolResult?.(delta);
			},
			onCommentaryText: params.onCommentaryText,
			onSessionId: params.onSessionId,
			onAssistantMessage: params.onAssistantMessage,
			onUsage: params.onUsage
		}),
		onCliOutput: params.onCliOutput,
		onPhase: params.onPhase,
		execPermission: params.execPermission,
		resolve: params.resolve,
		reject: params.reject
	};
	armNoOutputTimer(params.session, turn, params.noOutputTimeoutMs);
	turn.timeoutTimer = setTimeout(() => {
		closeLiveSession(params.session, "abort", createTimeoutError(params.session, `CLI exceeded timeout (${Math.round(params.context.params.timeoutMs / 1e3)}s) and was terminated.`, "cli_overall_timeout", {
			mode: "overall",
			timeoutSeconds: Math.round(params.context.params.timeoutMs / 1e3),
			observedActivity: turn.observedStdout || turn.rawLines.length > 0 || turn.toolEventCount > 0,
			activeToolCount: turn.activeTools.size,
			backgroundTaskCount: params.session.outstandingBackgroundTaskIds.size
		}));
	}, params.context.params.timeoutMs);
	return turn;
}
function closeOldestIdleSession() {
	for (const session of liveSessions.values()) if (!session.currentTurn) {
		closeLiveSession(session, "idle");
		return true;
	}
	return false;
}
function ensureLiveSessionCapacity(key, context) {
	if (liveSessions.has(key) || liveSessionCreates.has(key) || liveSessions.size + liveSessionCreates.size < LIVE_SESSION_LIMITS.maxSessions) return;
	if (closeOldestIdleSession()) return;
	throw new FailoverError("Too many Claude CLI live sessions are active.", {
		reason: "rate_limit",
		provider: context.params.provider,
		model: context.modelId,
		status: resolveFailoverStatus("rate_limit")
	});
}
function createRequiredLiveSessionError(params) {
	return new FailoverError("Managed Claude live session is no longer reusable.", {
		reason: "session_expired",
		provider: params.context.params.provider,
		model: params.context.modelId,
		status: resolveFailoverStatus("session_expired"),
		code: params.code,
		cause: params.cause
	});
}
async function abortClaudeLiveTurnBeforeStart(cleanup, abortError) {
	try {
		await cleanup();
	} catch (cleanupError) {
		throw new Error("Claude live turn aborted before start and cleanup failed", { cause: cleanupError });
	}
	throw abortError;
}
/** Runs one prompt through a reusable Claude CLI live session. */
function runClaudeLiveSessionTurn(params) {
	const key = buildClaudeLiveKey(params.context);
	let cleanupPromise;
	const cleanup = () => cleanupPromise ??= Promise.resolve().then(params.cleanup);
	const abortSignal = params.context.params.abortSignal;
	if (!abortSignal) return liveSessionTurns.enqueue(key, () => runSerializedClaudeLiveSessionTurn(params, key, cleanup));
	if (abortSignal.aborted) return abortClaudeLiveTurnBeforeStart(cleanup, createAbortError(abortSignal.reason));
	return new Promise((resolve, reject) => {
		let started = false;
		let settled = false;
		const settle = (outcome) => {
			if (settled) return;
			settled = true;
			abortSignal.removeEventListener("abort", onAbort);
			if (outcome.kind === "resolve") resolve(outcome.value);
			else reject(outcome.error instanceof Error ? outcome.error : new Error(formatErrorMessage(outcome.error)));
		};
		const onAbort = () => {
			if (!started) abortClaudeLiveTurnBeforeStart(cleanup, createAbortError(abortSignal.reason)).catch((error) => settle({
				kind: "reject",
				error
			}));
		};
		abortSignal.addEventListener("abort", onAbort, { once: true });
		liveSessionTurns.enqueue(key, async () => {
			started = true;
			abortSignal.removeEventListener("abort", onAbort);
			if (abortSignal.aborted) return await abortClaudeLiveTurnBeforeStart(cleanup, createAbortError(abortSignal.reason));
			return await runSerializedClaudeLiveSessionTurn(params, key, cleanup);
		}).then((value) => settle({
			kind: "resolve",
			value
		}), (error) => settle({
			kind: "reject",
			error
		}));
	});
}
async function runSerializedClaudeLiveSessionTurn(params, key, cleanup) {
	const resumeCapable = Boolean(params.context.preparedBackend.backend.resumeArgs?.length);
	const execPermission = resolveClaudeLiveExecPermission(params.context);
	const argv = [
		params.executableCommand ?? params.context.preparedBackend.backend.command,
		...params.executableLeadingArgv ?? [],
		...buildClaudeLiveArgs({
			args: params.args,
			backend: params.context.preparedBackend.backend,
			systemPrompt: params.context.systemPrompt,
			useResume: params.useResume,
			permissionMode: execPermission.permissionMode
		})
	];
	const fingerprint = buildClaudeLiveFingerprint({
		context: params.context,
		argv,
		env: params.env
	});
	const systemPromptHash = sha256(stripSystemPromptCacheBoundary(params.context.systemPrompt));
	let session = liveSessions.get(key) ?? null;
	if (session && params.requiredSessionGeneration && session.generation !== params.requiredSessionGeneration) {
		await cleanup();
		throw createRequiredLiveSessionError({
			context: params.context,
			code: "cli_live_session_changed"
		});
	}
	if (session && params.forceNewSession) {
		closeLiveSession(session, "restart");
		session = null;
	}
	if (session && resumeCapable && !params.useResume) {
		closeLiveSession(session, "restart");
		session = null;
	}
	if (session && session.fingerprint !== fingerprint) {
		if (params.requiredSessionGeneration) {
			await cleanup();
			throw createRequiredLiveSessionError({
				context: params.context,
				code: "cli_live_session_changed"
			});
		}
		closeLiveSession(session, "restart");
		session = null;
	}
	if (session && !await refreshClaudeLiveSystemPromptForReuse({
		session,
		context: params.context,
		systemPromptHash
	})) {
		if (params.requiredSessionGeneration) {
			await cleanup();
			throw createRequiredLiveSessionError({
				context: params.context,
				code: "cli_live_session_changed"
			});
		}
		session = null;
	}
	if (!session && params.requiredSessionGeneration) {
		const pendingGeneration = liveSessionCreates.get(key)?.generation;
		if (pendingGeneration !== params.requiredSessionGeneration) {
			await cleanup();
			throw createRequiredLiveSessionError({
				context: params.context,
				code: pendingGeneration ? "cli_live_session_changed" : "cli_live_session_missing"
			});
		}
	}
	let cleanupTurnArtifacts = Boolean(session);
	let notifiedMcpCaptureKey;
	const notifyMcpCaptureReady = (captureKey) => {
		if (!captureKey || notifiedMcpCaptureKey === captureKey) return;
		params.onMcpCaptureReady?.(captureKey);
		notifiedMcpCaptureKey = captureKey;
	};
	try {
		ensureLiveSessionCapacity(key, params.context);
	} catch (error) {
		await cleanup();
		throw error;
	}
	if (!session) {
		const pendingSession = liveSessionCreates.get(key);
		if (pendingSession) {
			try {
				session = await pendingSession.promise;
			} catch (error) {
				await cleanup();
				if (params.requiredSessionGeneration) throw createRequiredLiveSessionError({
					context: params.context,
					code: "cli_live_session_missing",
					cause: error
				});
				throw error;
			}
			if (params.requiredSessionGeneration && session.generation !== params.requiredSessionGeneration) {
				await cleanup();
				throw createRequiredLiveSessionError({
					context: params.context,
					code: "cli_live_session_changed"
				});
			}
			if (params.forceNewSession) {
				closeLiveSession(session, "restart");
				session = null;
			} else if (session.fingerprint !== fingerprint) {
				if (params.requiredSessionGeneration) {
					await cleanup();
					throw createRequiredLiveSessionError({
						context: params.context,
						code: "cli_live_session_changed"
					});
				}
				closeLiveSession(session, "restart");
				session = null;
			} else if (resumeCapable && !params.useResume) {
				closeLiveSession(session, "restart");
				session = null;
			} else {
				if (!await refreshClaudeLiveSystemPromptForReuse({
					session,
					context: params.context,
					systemPromptHash
				})) {
					if (params.requiredSessionGeneration) {
						await cleanup();
						throw createRequiredLiveSessionError({
							context: params.context,
							code: "cli_live_session_changed"
						});
					}
					session = null;
				}
				cleanupTurnArtifacts = true;
			}
		}
		if (!session) {
			if (params.requiredSessionGeneration) {
				await cleanup();
				throw createRequiredLiveSessionError({
					context: params.context,
					code: "cli_live_session_missing"
				});
			}
			const generation = crypto.randomUUID();
			const mcpCaptureKey = params.context.mcpDeliveryCapture ? crypto.randomUUID() : void 0;
			if (mcpCaptureKey) try {
				notifyMcpCaptureReady(mcpCaptureKey);
			} catch (error) {
				await cleanup();
				throw error;
			}
			const createSession = createClaudeLiveSession({
				context: params.context,
				argv,
				env: params.env,
				generation,
				fingerprint,
				systemPromptHash,
				key,
				mcpCaptureKey,
				noOutputTimeoutMs: params.noOutputTimeoutMs,
				supervisor: params.getProcessSupervisor(),
				cleanup
			}).finally(() => {
				if (liveSessionCreates.get(key)?.promise === createSession) liveSessionCreates.delete(key);
			});
			liveSessionCreates.set(key, {
				generation,
				promise: createSession
			});
			try {
				session = await createSession;
			} catch (error) {
				await cleanup();
				throw error;
			}
		}
	}
	if (cleanupTurnArtifacts && session) {
		if (session.idleTimer) {
			clearTimeout(session.idleTimer);
			session.idleTimer = null;
		}
		await cleanup();
		cliBackendLog.info(`claude live session reuse: provider=${session.providerId} model=${session.modelId}`);
	}
	if (session.closing || liveSessions.get(key) !== session) {
		await cleanup();
		if (params.requiredSessionGeneration) throw createRequiredLiveSessionError({
			context: params.context,
			code: "cli_live_session_missing"
		});
		throw new Error("Claude CLI live session closed before handling the turn");
	}
	if (session.currentTurn) throw new Error("Claude CLI live session is already handling a turn");
	const liveSession = session;
	if (liveSession.sessionId) params.onSessionId?.(liveSession.sessionId);
	notifyMcpCaptureReady(liveSession.mcpCaptureKey);
	liveSession.noOutputTimeoutMs = params.noOutputTimeoutMs;
	liveSession.stderr = "";
	const inputUuid = crypto.randomUUID();
	const outputPromise = new Promise((resolve, reject) => {
		liveSession.currentTurn = createTurn({
			context: params.context,
			noOutputTimeoutMs: params.noOutputTimeoutMs,
			inputUuid,
			useResume: params.useResume,
			onAssistantDelta: params.onAssistantDelta,
			onThinkingDelta: params.onThinkingDelta,
			onThinkingProgress: params.onThinkingProgress,
			onToolUseStart: params.onToolUseStart,
			onToolResult: params.onToolResult,
			resolveToolResultTerminalOutcome: params.resolveToolResultTerminalOutcome,
			onCommentaryText: params.onCommentaryText,
			onSessionId: params.onSessionId,
			onAssistantMessage: params.onAssistantMessage,
			onUsage: params.onUsage,
			onCliOutput: params.onCliOutput,
			onPhase: params.onPhase,
			session: liveSession,
			execPermission,
			resolve,
			reject
		});
	});
	outputPromise.catch(() => void 0);
	const abort = () => abortTurn(liveSession, createAbortError(params.context.params.abortSignal?.reason));
	let replyBackendCompleted = false;
	const replyBackendHandle = params.context.params.replyOperation ? {
		kind: "cli",
		cancel: abort,
		isStreaming: () => !replyBackendCompleted
	} : void 0;
	params.context.params.abortSignal?.addEventListener("abort", abort, { once: true });
	if (replyBackendHandle) params.context.params.replyOperation?.attachBackend(replyBackendHandle);
	try {
		if (params.context.params.abortSignal?.aborted) abort();
		else try {
			const requestPayload = createClaudeUserInputMessage(params.prompt, inputUuid);
			params.onRequestPayload?.(requestPayload);
			await Promise.race([writeTurnInput(liveSession, requestPayload), outputPromise]);
		} catch (error) {
			closeLiveSession(liveSession, "abort", error);
		}
		return { output: await outputPromise };
	} finally {
		replyBackendCompleted = true;
		params.context.params.abortSignal?.removeEventListener("abort", abort);
		try {
			if (replyBackendHandle) params.context.params.replyOperation?.detachBackend(replyBackendHandle);
		} finally {
			if (liveSession.mcpCaptureKey) {
				closeLiveSession(liveSession, "restart");
				await waitForManagedRunExit(liveSession.managedRun);
				await cleanupLiveSession(liveSession);
			}
		}
	}
}
//#endregion
export { runClaudeLiveSessionTurn as a, createCliJsonlStreamingParser as c, prepareCliBundleMcpCaptureAttempt as d, prepareCliBundleMcpConfig as f, rotateClaudeLiveMcpCaptureKeyForContext as i, extractCliErrorMessage as l, getClaudeLiveSessionGenerationForOwner as n, shouldUseClaudeLiveSession as o, hasClaudeLiveSessionForOwner as r, createCliOutputFailoverError as s, closeClaudeLiveSessionForContext as t, parseCliOutput as u };
