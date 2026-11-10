import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { l as normalizeStringEntries } from "./string-normalization-CRyoFBPt.js";
import { o as resolveAgentConfig } from "./agent-scope-config-Dusa8eSA.js";
import { it as resolveOwnerDisplaySetting } from "./io-C_mRWnfm.js";
import { n as findGitRoot } from "./git-commit-BNs9G2AE.js";
import "./agent-scope-DyEposw2.js";
import { c as resolveEffectiveToolFsWorkspaceOnly } from "./local-roots-DY1lg2k6.js";
import { n as buildAgentSystemPrompt } from "./system-prompt-DDiiiLkW.js";
import { i as resolveUserTimezone, t as formatDateStamp } from "./date-time-BhYZ-ADP.js";
import { i as buildTtsSystemPromptHint } from "./tts-settings-Cim3tOQK.js";
import { n as getCurrentActiveNodeContext, t as formatActiveNodeContextLabel } from "./active-node-context-_qYwwG99.js";
import fs from "node:fs";
import path from "node:path";
//#region src/agents/system-prompt-config.ts
/**
* Config-aware system prompt builder.
*
* This module gathers agent/config knobs before rendering the canonical system
* prompt so callers do not duplicate owner, TTS, alias, memory, or FS policy.
*/
function buildModelAliasLines(cfg) {
	const entries = [];
	for (const [keyRaw, entryRaw] of Object.entries(cfg?.agents?.defaults?.models ?? {})) {
		const model = normalizeOptionalString(keyRaw) ?? "";
		const alias = normalizeOptionalString(entryRaw?.alias) ?? "";
		if (model && alias) entries.push({
			alias,
			model
		});
	}
	return entries.toSorted((a, b) => a.alias.localeCompare(b.alias)).map((entry) => `- ${entry.alias}: ${entry.model}`);
}
/** Resolves all config-derived system prompt fields for an agent. */
function resolveAgentSystemPromptConfig(params) {
	const { config, agentId } = params;
	const ownerDisplay = resolveOwnerDisplaySetting(config);
	const agentSubagents = config && agentId ? resolveAgentConfig(config, agentId)?.subagents : void 0;
	return {
		ownerDisplay: ownerDisplay.ownerDisplay,
		ownerDisplaySecret: ownerDisplay.ownerDisplaySecret,
		subagentDelegationMode: agentSubagents?.delegationMode ?? config?.agents?.defaults?.subagents?.delegationMode ?? "suggest",
		ttsHint: config ? buildTtsSystemPromptHint(config, agentId) : void 0,
		modelAliasLines: buildModelAliasLines(config),
		memoryCitationsMode: config?.memory?.citations,
		fsWorkspaceOnly: resolveEffectiveToolFsWorkspaceOnly({
			cfg: config,
			agentId
		})
	};
}
/** Builds the agent system prompt after applying config-derived prompt fields. */
function buildConfiguredAgentSystemPrompt(params) {
	const { config, agentId, ...renderParams } = params;
	const configParams = config ? resolveAgentSystemPromptConfig({
		config,
		agentId
	}) : {};
	return buildAgentSystemPrompt({
		...renderParams,
		...configParams
	});
}
//#endregion
//#region src/agents/system-prompt-params.ts
/**
* System prompt runtime parameter resolver.
*
* Collects repository, time, timezone, channel, shell, and active-process facts for prompt rendering.
*/
function buildSystemPromptParams(params) {
	const repoRoot = Object.hasOwn(params, "preparedRepoRoot") ? params.preparedRepoRoot ?? void 0 : resolveSystemPromptRepoRoot(params);
	const userTimezone = resolveUserTimezone(params.config?.agents?.defaults?.userTimezone);
	const userDate = formatDateStamp(Date.now(), userTimezone);
	return {
		runtimeInfo: {
			agentId: params.agentId,
			...params.runtime,
			activeNode: formatActiveNodeContextLabel(getCurrentActiveNodeContext()) ?? params.runtime.activeNode,
			repoRoot
		},
		userTimezone,
		userDate
	};
}
function resolveSystemPromptRepoRoot(params) {
	const configured = params.config?.agents?.defaults?.repoRoot?.trim();
	if (configured) try {
		const resolved = path.resolve(configured);
		if (fs.statSync(resolved).isDirectory()) return resolved;
	} catch {}
	const candidates = normalizeStringEntries([params.workspaceDir ?? "", params.cwd ?? ""]);
	const seen = /* @__PURE__ */ new Set();
	for (const candidate of candidates) {
		const resolved = path.resolve(candidate);
		if (seen.has(resolved)) continue;
		seen.add(resolved);
		const root = findGitRoot(resolved);
		if (root) return root;
	}
}
//#endregion
export { resolveSystemPromptRepoRoot as n, buildConfiguredAgentSystemPrompt as r, buildSystemPromptParams as t };
