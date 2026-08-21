import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { o as resolveAgentConfig } from "./agent-scope-config-Dusa8eSA.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import "./agent-scope-DyEposw2.js";
import { c as readRecentSessionTranscriptActiveEvents } from "./session-accessor-D5Or7WgI.js";
import { _ as isWorkspaceSetupCompleted, m as filterBootstrapFilesForSession, n as DEFAULT_BOOTSTRAP_FILENAME, y as loadWorkspaceBootstrapFiles } from "./workspace-aPJlJwqC.js";
import { i as resolveBootstrapTotalMaxChars, n as buildBootstrapContextFiles, r as resolveBootstrapMaxChars } from "./bootstrap-DOyGG4hV.js";
import "./embedded-agent-helpers-dlCGQLQ2.js";
import { i as getOrLoadBootstrapFiles } from "./bootstrap-cache-Yis-5ymR.js";
import { m as triggerInternalHook, n as createInternalHookEvent } from "./internal-hooks-g7-iEVAy.js";
import path from "node:path";
//#region src/agents/bootstrap-hooks.ts
/** Runs bootstrap hooks and returns the effective bootstrap file list. */
async function applyBootstrapHookOverrides(params) {
	const sessionKey = params.sessionKey ?? params.sessionId ?? "unknown";
	const agentId = params.agentId ?? (params.sessionKey ? resolveAgentIdFromSessionKey(params.sessionKey) : void 0);
	const event = createInternalHookEvent("agent", "bootstrap", sessionKey, {
		workspaceDir: params.workspaceDir,
		bootstrapFiles: params.files,
		cfg: params.config,
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		agentId
	});
	await triggerInternalHook(event);
	const updated = event.context.bootstrapFiles;
	return Array.isArray(updated) ? updated : params.files;
}
//#endregion
//#region src/agents/bootstrap-files.ts
/**
* Resolves workspace bootstrap files for agent runs and converts them into
* bounded context files.
*/
const CONTINUATION_SCAN_MAX_RECORDS = 500;
const FULL_BOOTSTRAP_COMPLETED_CUSTOM_TYPE = "openclaw:bootstrap-context:full";
const BOOTSTRAP_WARNING_DEDUPE_LIMIT = 1024;
const seenBootstrapWarnings = /* @__PURE__ */ new Set();
const bootstrapWarningOrder = [];
function rememberBootstrapWarning(key) {
	if (seenBootstrapWarnings.has(key)) return false;
	if (seenBootstrapWarnings.size >= BOOTSTRAP_WARNING_DEDUPE_LIMIT) {
		const oldest = bootstrapWarningOrder.shift();
		if (oldest) seenBootstrapWarnings.delete(oldest);
	}
	seenBootstrapWarnings.add(key);
	bootstrapWarningOrder.push(key);
	return true;
}
/** Resolves the effective bootstrap injection mode for a session agent. */
function resolveContextInjectionMode(config, agentId) {
	const agentMode = config && agentId ? resolveAgentConfig(config, agentId)?.contextInjection : void 0;
	if (agentMode === "always" || agentMode === "continuation-skip" || agentMode === "never") return agentMode;
	return config?.agents?.defaults?.contextInjection ?? "always";
}
/** Checks the active SQLite transcript branch for a valid full-bootstrap marker. */
async function hasCompletedBootstrapTurn(sessionTarget) {
	const { agentId, sessionId, sessionKey, storePath } = sessionTarget ?? {};
	if (!agentId || !sessionId || !sessionKey || !storePath) return false;
	try {
		const records = readRecentSessionTranscriptActiveEvents({
			agentId,
			sessionId,
			sessionKey,
			storePath
		}, CONTINUATION_SCAN_MAX_RECORDS);
		for (const entry of records.toReversed()) {
			const record = entry;
			if (record?.type === "compaction" || record?.type === "reset") return false;
			if (record?.type === "custom" && record.customType === "openclaw:bootstrap-context:full") return true;
		}
		return false;
	} catch {
		return false;
	}
}
/** Builds a session-scoped warning sink that dedupes repeated bootstrap warnings. */
function makeBootstrapWarn(params) {
	const warn = params.warn;
	if (!warn) return;
	const workspacePrefix = params.workspaceDir ?? "";
	return (message) => {
		if (!rememberBootstrapWarning(`${workspacePrefix}\u0000${params.sessionLabel}\u0000${message}`)) return;
		warn(`${message} (sessionKey=${params.sessionLabel})`);
	};
}
function sanitizeBootstrapFiles(files, workspaceDir, warn) {
	const workspaceRoot = resolveUserPath(workspaceDir);
	const seenPaths = /* @__PURE__ */ new Set();
	const sanitized = [];
	for (const file of files) {
		const pathValue = normalizeOptionalString(file.path) ?? "";
		if (!pathValue) {
			warn?.(`skipping bootstrap file "${file.name}" — missing or invalid "path" field (hook may have used "filePath" instead)`);
			continue;
		}
		const resolvedPath = path.isAbsolute(pathValue) ? path.resolve(pathValue) : pathValue.startsWith("~") ? resolveUserPath(pathValue) : path.resolve(workspaceRoot, pathValue);
		const dedupeKey = path.normalize(path.relative(workspaceRoot, resolvedPath));
		if (seenPaths.has(dedupeKey)) continue;
		seenPaths.add(dedupeKey);
		sanitized.push({
			...file,
			path: resolvedPath
		});
	}
	return sanitized;
}
function applyContextModeFilter(params) {
	if ((params.contextMode ?? "full") !== "lightweight") return params.files;
	return [];
}
function filterCompletedWorkspaceBootstrapFile(files, setupCompleted, workspaceDir) {
	if (!setupCompleted) return files;
	const workspaceRoot = resolveUserPath(workspaceDir);
	const rootBootstrapPath = path.join(workspaceRoot, DEFAULT_BOOTSTRAP_FILENAME);
	return files.filter((file) => {
		if (file.name !== "BOOTSTRAP.md") return true;
		const pathValue = normalizeOptionalString(file.path);
		if (!pathValue) return true;
		return (path.isAbsolute(pathValue) ? path.resolve(pathValue) : pathValue.startsWith("~") ? resolveUserPath(pathValue) : path.resolve(workspaceRoot, pathValue)) !== rootBootstrapPath;
	});
}
async function isWorkspaceSetupCompletedForContext(workspaceDir) {
	try {
		return await isWorkspaceSetupCompleted(workspaceDir);
	} catch {
		return false;
	}
}
/** Resolves hook-adjusted, session-filtered bootstrap files for a run. */
async function resolveBootstrapFilesForRun(params) {
	const sessionKey = params.sessionKey ?? params.sessionId;
	const workspaceSetupCompleted = await isWorkspaceSetupCompletedForContext(params.workspaceDir);
	return sanitizeBootstrapFiles(filterCompletedWorkspaceBootstrapFile(await applyBootstrapHookOverrides({
		files: applyContextModeFilter({
			files: filterCompletedWorkspaceBootstrapFile(filterBootstrapFilesForSession(params.sessionKey ? await getOrLoadBootstrapFiles({
				workspaceDir: params.workspaceDir,
				sessionKey: params.sessionKey
			}) : await loadWorkspaceBootstrapFiles(params.workspaceDir), sessionKey), workspaceSetupCompleted, params.workspaceDir),
			contextMode: params.contextMode,
			runKind: params.runKind
		}),
		workspaceDir: params.workspaceDir,
		config: params.config,
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		agentId: params.agentId
	}), workspaceSetupCompleted, params.workspaceDir), params.workspaceDir, params.warn);
}
/** Resolves both raw bootstrap metadata and bounded context files for a run. */
async function resolveBootstrapContextForRun(params) {
	const bootstrapFiles = await resolveBootstrapFilesForRun(params);
	return {
		bootstrapFiles,
		contextFiles: buildBootstrapContextForFiles(bootstrapFiles, params)
	};
}
/** Builds bounded context files from already-resolved bootstrap file metadata. */
function buildBootstrapContextForFiles(bootstrapFiles, params) {
	return buildBootstrapContextFiles(bootstrapFiles, {
		maxChars: resolveBootstrapMaxChars(params.config, params.agentId),
		totalMaxChars: resolveBootstrapTotalMaxChars(params.config, params.agentId),
		warn: params.warn
	});
}
//#endregion
export { resolveBootstrapContextForRun as a, makeBootstrapWarn as i, buildBootstrapContextForFiles as n, resolveBootstrapFilesForRun as o, hasCompletedBootstrapTurn as r, resolveContextInjectionMode as s, FULL_BOOTSTRAP_COMPLETED_CUSTOM_TYPE as t };
