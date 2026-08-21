import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { f as resolveDefaultAgentId, o as resolveAgentConfig, t as hasAgentRosterProperty, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { c as classifySessionKeyShape } from "./session-key-DtTE9-Tg.js";
import { a as logWarn } from "./logger-DGpe8sSn.js";
import "./agent-scope-DyEposw2.js";
import { t as redactIdentifier } from "./redact-identifier-BjaGGxG8.js";
import { t as sanitizeForPromptLiteral } from "./sanitize-for-prompt-Drdy09dw.js";
//#region src/agents/workspace-run.ts
const RUN_WORKSPACE_ROSTER_REQUIRED_ERROR_CODE = "RUN_WORKSPACE_ROSTER_REQUIRED";
var RunWorkspaceRosterRequiredError = class extends Error {
	constructor() {
		super("No agents configured; run workspace resolution requires an explicit roster.");
		this.code = RUN_WORKSPACE_ROSTER_REQUIRED_ERROR_CODE;
		this.name = "RunWorkspaceRosterRequiredError";
	}
};
var RunWorkspaceAgentNotConfiguredError = class extends Error {
	constructor(agentId) {
		super(`Agent ${agentId} is not present in the configured roster.`);
		this.code = "RUN_WORKSPACE_AGENT_NOT_CONFIGURED";
		this.name = "RunWorkspaceAgentNotConfiguredError";
		this.agentId = agentId;
	}
};
function resolveRunAgentId(params) {
	const rawSessionKey = params.sessionKey?.trim() ?? "";
	const shape = classifySessionKeyShape(rawSessionKey);
	if (shape === "malformed_agent") throw new Error("Malformed agent session key; refusing workspace resolution.");
	const explicit = typeof params.agentId === "string" && params.agentId.trim() ? normalizeAgentId(params.agentId) : void 0;
	if (explicit) return {
		agentId: explicit,
		agentIdSource: "explicit"
	};
	if (shape === "missing" || shape === "legacy_or_alias") return {
		agentId: resolveDefaultAgentId(params.config),
		agentIdSource: "default"
	};
	const parsed = parseAgentSessionKey(rawSessionKey);
	if (parsed?.agentId) return {
		agentId: normalizeAgentId(parsed.agentId),
		agentIdSource: "session_key"
	};
	throw new Error("Session key does not resolve to a configured agent.");
}
/** Redacts a run/session identifier for logs and prompts. */
function redactRunIdentifier(value) {
	return redactIdentifier(value, { len: 12 });
}
/** Resolves the workspace directory used for an agent run. */
function resolveRunWorkspaceDir(params) {
	if (classifySessionKeyShape(params.sessionKey?.trim() ?? "") === "malformed_agent") throw new Error("Malformed agent session key; refusing workspace resolution.");
	const config = params.config;
	if (!config || !hasAgentRosterProperty(config)) throw new RunWorkspaceRosterRequiredError();
	const env = params.env ?? process.env;
	const requested = params.workspaceDir;
	const { agentId, agentIdSource } = resolveRunAgentId({
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		config
	});
	if (!resolveAgentConfig(config, agentId)) throw new RunWorkspaceAgentNotConfiguredError(agentId);
	if (typeof requested === "string") {
		const trimmed = requested.trim();
		if (trimmed) {
			const sanitized = sanitizeForPromptLiteral(trimmed);
			if (sanitized !== trimmed) logWarn("Control/format characters stripped from workspaceDir (OC-19 hardening).");
			const workspaceDir = resolveUserPath(sanitized, env);
			return {
				workspaceDir,
				isCanonicalWorkspace: workspaceDir === resolveUserPath(resolveAgentWorkspaceDir(config, agentId, env), env),
				usedFallback: false,
				agentId,
				agentIdSource
			};
		}
	}
	const fallbackReason = requested == null ? "missing" : typeof requested === "string" ? "blank" : "invalid_type";
	const fallbackWorkspace = resolveAgentWorkspaceDir(config, agentId, env);
	const sanitizedFallback = sanitizeForPromptLiteral(fallbackWorkspace);
	if (sanitizedFallback !== fallbackWorkspace) logWarn("Control/format characters stripped from fallback workspaceDir (OC-19 hardening).");
	return {
		workspaceDir: resolveUserPath(sanitizedFallback, env),
		isCanonicalWorkspace: true,
		usedFallback: true,
		fallbackReason,
		agentId,
		agentIdSource
	};
}
//#endregion
export { resolveRunWorkspaceDir as n, redactRunIdentifier as t };
