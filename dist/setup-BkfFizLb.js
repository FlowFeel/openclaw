import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import { t as formatCliCommand } from "./command-format-C5kg4XY_.js";
import { a as writeRuntimeJson, r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { f as resolveDefaultAgentId, l as resolveAgentEntry, m as toAgentEntriesRecord, n as listAgentEntries } from "./agent-scope-config-Dusa8eSA.js";
import { f as migratePersistedImplicitMainRoster } from "./legacy-C8NOAlee.js";
import { r as hasResolvedRosterBeforeMigrations, t as configIncludeOwnsAgentRoster } from "./agent-roster-provenance-CfRWZSQN.js";
import fs from "node:fs/promises";
//#region src/commands/setup.ts
/**
* Minimal setup command.
*
* Ensures config, default workspace, and session directories exist without
* running the full onboarding wizard.
*/
const agentWorkspaceModuleLoader = createLazyImportLoader(() => import("./workspace-yjZWPD2s.js"));
const configIOModuleLoader = createLazyImportLoader(() => import("./config/config.js"));
const configLoggingModuleLoader = createLazyImportLoader(() => import("./logging-Ci4qMKQZ.js"));
function loadAgentWorkspaceModule() {
	return agentWorkspaceModuleLoader.load();
}
function loadConfigIOModule() {
	return configIOModuleLoader.load();
}
function loadConfigLoggingModule() {
	return configLoggingModuleLoader.load();
}
async function createDefaultConfigIO() {
	const { createConfigIO } = await loadConfigIOModule();
	return createConfigIO();
}
async function resolveDefaultAgentWorkspaceDir(deps) {
	const override = deps.defaultAgentWorkspaceDir;
	if (typeof override === "string") return override;
	if (typeof override === "function") return await override();
	const { DEFAULT_AGENT_WORKSPACE_DIR } = await loadAgentWorkspaceModule();
	return DEFAULT_AGENT_WORKSPACE_DIR;
}
async function ensureDefaultAgentWorkspace(params) {
	const { ensureAgentWorkspace } = await loadAgentWorkspaceModule();
	return ensureAgentWorkspace(params);
}
async function writeDefaultConfigFile(params) {
	const { replaceConfigFile } = await loadConfigIOModule();
	await replaceConfigFile(params);
}
async function formatDefaultConfigPath(configPath) {
	const { formatConfigPath } = await loadConfigLoggingModule();
	return formatConfigPath(configPath);
}
async function logDefaultConfigUpdated(runtime, opts) {
	const { logConfigUpdated } = await loadConfigLoggingModule();
	logConfigUpdated(runtime, opts);
}
async function resolveDefaultSessionTranscriptsDir(agentId) {
	const { resolveSessionTranscriptsDirForAgent } = await import("./sessions-C6cDaiWL.js");
	return resolveSessionTranscriptsDirForAgent(agentId);
}
/** Prepares config, workspace, and session directories for a usable installation. */
async function setupCommand(opts, runtime = defaultRuntime, deps = {}) {
	const desiredWorkspace = typeof opts?.workspace === "string" && opts.workspace.trim() ? opts.workspace.trim() : void 0;
	const io = deps.createConfigIO?.() ?? await createDefaultConfigIO();
	const configPath = io.configPath;
	const prepared = await io.readConfigFileSnapshotForWrite();
	const snapshot = prepared.snapshot;
	if (snapshot.exists && !snapshot.valid) {
		const formatConfigPath = deps.formatConfigPath ?? formatDefaultConfigPath;
		runtime.error(`Config invalid at ${await formatConfigPath(configPath)}. Run \`${formatCliCommand("openclaw doctor")}\` to repair it, then re-run setup.`);
		runtime.exit(1);
		return;
	}
	const resolvedConfig = snapshot.config;
	const shouldPersistRoster = !snapshot.exists || !hasResolvedRosterBeforeMigrations(snapshot) && !configIncludeOwnsAgentRoster(snapshot);
	const cfg = shouldPersistRoster ? migratePersistedImplicitMainRoster(snapshot.sourceConfig).config : snapshot.sourceConfig;
	const authoredDefaults = cfg.agents?.defaults ?? {};
	const resolvedDefaults = resolvedConfig.agents?.defaults ?? authoredDefaults;
	const defaultEntryWorkspace = resolveAgentEntry(resolvedConfig, resolveDefaultAgentId(resolvedConfig))?.workspace?.trim();
	const configuredWorkspace = defaultEntryWorkspace || resolvedDefaults.workspace;
	const workspace = desiredWorkspace ?? configuredWorkspace ?? await resolveDefaultAgentWorkspaceDir(deps);
	const shouldWriteWorkspace = !snapshot.exists || desiredWorkspace !== void 0 && configuredWorkspace !== workspace;
	const shouldWriteGatewayMode = resolvedConfig.gateway?.mode === void 0;
	const writeInheritedWorkspaceOverride = snapshot.exists && shouldWriteWorkspace && !defaultEntryWorkspace && configIncludeOwnsAgentRoster(snapshot);
	let next = snapshot.exists ? resolvedConfig : cfg;
	if (shouldPersistRoster) {
		const { list: _legacyList, ...agents } = next.agents ?? {};
		next = {
			...next,
			agents: {
				...agents,
				entries: toAgentEntriesRecord(listAgentEntries(cfg))
			}
		};
	}
	if (shouldWriteWorkspace) {
		if (!writeInheritedWorkspaceOverride) {
			const roster = structuredClone(listAgentEntries(next));
			if (!snapshot.exists || Boolean(defaultEntryWorkspace)) {
				for (const entry of roster) if (entry.default === true) entry.workspace = workspace;
			}
			const entries = roster.length > 0 ? toAgentEntriesRecord(roster) : void 0;
			const { list: _legacyList, ...agents } = next.agents ?? {};
			next = {
				...next,
				agents: {
					...agents,
					defaults: {
						...agents.defaults,
						workspace
					},
					...entries ? { entries } : {}
				}
			};
		}
	}
	if (shouldWriteGatewayMode) next = {
		...next,
		gateway: {
			...next.gateway,
			mode: "local"
		}
	};
	if (!snapshot.exists) {
		const { ensureOnboardingAgent } = await import("./onboard-agent-B8yD0Xrd.js");
		next = (await ensureOnboardingAgent({
			config: next,
			workspace,
			baseConfig: cfg
		})).config;
	}
	const configChanged = !snapshot.exists || shouldPersistRoster || shouldWriteWorkspace || shouldWriteGatewayMode;
	let configStatus;
	if (configChanged) {
		await (deps.replaceConfigFile ?? writeDefaultConfigFile)({
			nextConfig: next,
			snapshot,
			afterWrite: { mode: "auto" },
			writeOptions: {
				...prepared.writeOptions,
				...snapshot.exists && shouldPersistRoster ? {
					explicitSetPaths: [["agents", "entries"]],
					explicitSetValueSource: cfg
				} : {},
				...writeInheritedWorkspaceOverride ? {
					allowIncludeAncestorExplicitSetPaths: true,
					explicitSetPaths: [[
						"agents",
						"defaults",
						"workspace"
					]],
					explicitSetValueSource: { agents: { defaults: { workspace } } }
				} : {}
			}
		});
		configStatus = snapshot.exists ? "updated" : "created";
		if (!opts?.json && !snapshot.exists) {
			const formatConfigPath = deps.formatConfigPath ?? formatDefaultConfigPath;
			runtime.log(`Wrote ${await formatConfigPath(configPath)}`);
		} else if (!opts?.json) {
			const updates = [];
			if (shouldWriteWorkspace) updates.push("set agents.defaults.workspace");
			if (shouldWriteGatewayMode) updates.push("set gateway.mode");
			const suffix = updates.length > 0 ? `(${updates.join(", ")})` : void 0;
			await (deps.logConfigUpdated ?? logDefaultConfigUpdated)(runtime, {
				path: configPath,
				suffix
			});
		}
	} else {
		configStatus = "unchanged";
		if (!opts?.json) {
			const formatConfigPath = deps.formatConfigPath ?? formatDefaultConfigPath;
			runtime.log(`Config OK: ${await formatConfigPath(configPath)}`);
		}
	}
	const ws = await (deps.ensureAgentWorkspace ?? ensureDefaultAgentWorkspace)({
		dir: workspace,
		ensureBootstrapFiles: !resolvedDefaults.skipBootstrap,
		skipOptionalBootstrapFiles: resolvedDefaults.skipOptionalBootstrapFiles
	});
	if (!opts?.json) runtime.log(`Workspace OK: ${shortenHomePath(ws.dir)}`);
	const defaultAgentId = resolveDefaultAgentId(next);
	const sessionsDir = await (deps.resolveSessionTranscriptsDir ?? resolveDefaultSessionTranscriptsDir)(defaultAgentId);
	await (deps.mkdir ?? fs.mkdir)(sessionsDir, { recursive: true });
	if (opts?.json) {
		writeRuntimeJson(runtime, {
			ok: true,
			configPath,
			configStatus,
			workspaceDir: ws.dir,
			sessionsDir
		});
		return;
	}
	runtime.log(`Sessions OK: ${shortenHomePath(sessionsDir)}`);
	runtime.log("");
	runtime.log("Setup complete: config, workspace, and session directories are ready.");
	runtime.log(`Next guided path: ${formatCliCommand("openclaw onboard")}.`);
	runtime.log(`Next targeted changes: ${formatCliCommand("openclaw configure")} for models, channels, Gateway, plugins, skills, and health checks.`);
	runtime.log(`Add a chat channel later: ${formatCliCommand("openclaw channels add")}.`);
}
//#endregion
export { setupCommand };
