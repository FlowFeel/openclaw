import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import "./utils-Bs67j6-3.js";
import { i as GENERATED_BUNDLED_CHANNEL_CONFIG_METADATA } from "./ids-DcuH-YRr.js";
import { r as resolveMemoryPluginStatus } from "./status.scan.shared-ChraK9k3.js";
import { n as resolveStatusSummaryFromOverview, t as collectStatusScanOverview } from "./status.scan-overview-BnB2cgY-.js";
//#region src/commands/status.scan-result.ts
/** Flattens overview, gateway, channel, summary, memory, and compatibility inputs into a scan result. */
function buildStatusScanResult(params) {
	return {
		cfg: params.cfg,
		sourceConfig: params.sourceConfig,
		secretDiagnostics: params.secretDiagnostics,
		osSummary: params.osSummary,
		tailscaleMode: params.tailscaleMode,
		tailscaleDns: params.tailscaleDns,
		tailscaleHttpsUrl: params.tailscaleHttpsUrl,
		...params.advertisedControlUiLinks ? { advertisedControlUiLinks: params.advertisedControlUiLinks } : {},
		update: params.update,
		gatewayConnection: params.gatewaySnapshot.gatewayConnection,
		remoteUrlMissing: params.gatewaySnapshot.remoteUrlMissing,
		gatewayMode: params.gatewaySnapshot.gatewayMode,
		gatewayProbeAuth: params.gatewaySnapshot.gatewayProbeAuth,
		gatewayProbeAuthWarning: params.gatewaySnapshot.gatewayProbeAuthWarning,
		gatewayProbe: params.gatewaySnapshot.gatewayProbe,
		gatewayReachable: params.gatewaySnapshot.gatewayReachable,
		gatewaySelf: params.gatewaySnapshot.gatewaySelf,
		channelIssues: params.channelIssues,
		agentStatus: params.agentStatus,
		channels: params.channels,
		summary: params.summary,
		memory: params.memory,
		memoryPlugin: params.memoryPlugin,
		pluginCompatibility: params.pluginCompatibility
	};
}
//#endregion
//#region src/commands/status.scan-execute.ts
/** Builds a full status scan result from an overview scan plus channel/plugin compatibility data. */
async function executeStatusScanFromOverview(params) {
	const memoryPlugin = resolveMemoryPluginStatus(params.overview.cfg);
	const [memory, summary] = await Promise.all([params.resolveMemory({
		cfg: params.overview.cfg,
		agentStatus: params.overview.agentStatus,
		memoryPlugin,
		...params.runtime ? { runtime: params.runtime } : {}
	}), resolveStatusSummaryFromOverview({ overview: params.overview })]);
	return buildStatusScanResult({
		cfg: params.overview.cfg,
		sourceConfig: params.overview.sourceConfig,
		secretDiagnostics: params.overview.secretDiagnostics,
		osSummary: params.overview.osSummary,
		tailscaleMode: params.overview.tailscaleMode,
		tailscaleDns: params.overview.tailscaleDns,
		tailscaleHttpsUrl: params.overview.tailscaleHttpsUrl,
		...params.overview.advertisedControlUiLinks ? { advertisedControlUiLinks: params.overview.advertisedControlUiLinks } : {},
		update: params.overview.update,
		gatewaySnapshot: params.overview.gatewaySnapshot,
		channelIssues: params.channelIssues,
		agentStatus: params.overview.agentStatus,
		channels: params.channels,
		summary,
		memory,
		memoryPlugin,
		pluginCompatibility: params.pluginCompatibility
	});
}
//#endregion
//#region src/commands/status.scan.fast-json.ts
const statusScanMemoryModuleLoader = createLazyImportLoader(() => import("./status.scan-memory-D2kZfTs3.js"));
const statusScanPluginStatusModuleLoader = createLazyImportLoader(() => import("./status-CoKWGsHn.js"));
const IGNORED_CHANNEL_CONFIG_KEYS = /* @__PURE__ */ new Set(["defaults", "modelByChannel"]);
const STATUS_JSON_CHANNEL_ENV_PREFIXES = GENERATED_BUNDLED_CHANNEL_CONFIG_METADATA.filter((entry) => entry.configurable !== false).map((entry) => `${entry.channelId.replace(/[^a-z0-9]+/gi, "_").toUpperCase()}_`);
const STATUS_JSON_CHANNEL_ENV_VARS = new Set(GENERATED_BUNDLED_CHANNEL_CONFIG_METADATA.filter((entry) => entry.configurable !== false).flatMap((entry) => entry.channelEnvVars ?? []));
function hasMeaningfulStatusJsonChannelConfig(value) {
	if (!isRecord(value)) return false;
	return Object.keys(value).some((key) => key !== "enabled");
}
function hasExplicitStatusJsonChannelConfig(cfg) {
	if (!isRecord(cfg.channels)) return false;
	for (const [key, value] of Object.entries(cfg.channels)) {
		if (IGNORED_CHANNEL_CONFIG_KEYS.has(key)) continue;
		if (hasMeaningfulStatusJsonChannelConfig(value)) return true;
	}
	return false;
}
function hasStatusJsonChannelEnvConfig(env = process.env) {
	for (const [key, value] of Object.entries(env)) {
		if (typeof value !== "string" || value.trim().length === 0) continue;
		if (STATUS_JSON_CHANNEL_ENV_VARS.has(key) || STATUS_JSON_CHANNEL_ENV_PREFIXES.some((prefix) => key.startsWith(prefix))) return true;
	}
	return false;
}
function hasPotentialConfiguredChannelsForStatusJson(cfg) {
	return hasExplicitStatusJsonChannelConfig(cfg) || hasStatusJsonChannelEnvConfig();
}
/** Runs status JSON with an injectable policy for tests and specialized callers. */
async function scanStatusJsonWithPolicy(opts, runtime, policy) {
	const overview = await collectStatusScanOverview({
		commandName: policy.commandName,
		opts,
		showSecrets: false,
		runtime,
		allowMissingConfigFastPath: policy.allowMissingConfigFastPath,
		resolveHasConfiguredChannels: policy.resolveHasConfiguredChannels,
		includeChannelsData: false,
		includeChannelSecretTargets: false,
		skipConfigPluginValidation: true,
		fetchGitUpdate: policy.fetchGitUpdate,
		includeRegistryUpdate: policy.includeRegistryUpdate,
		includeLocalStatusRpcFallback: policy.includeLocalStatusRpcFallback,
		gatewayProbeTimeoutMs: policy.gatewayProbeTimeoutMs
	});
	const pluginCompatibility = opts.all ? await statusScanPluginStatusModuleLoader.load().then(({ buildPluginCompatibilitySnapshotNotices }) => buildPluginCompatibilitySnapshotNotices({ config: overview.cfg })) : [];
	return await executeStatusScanFromOverview({
		overview,
		runtime,
		resolveMemory: policy.resolveMemory,
		channelIssues: [],
		channels: {
			rows: [],
			details: []
		},
		pluginCompatibility
	});
}
/** Runs the default fast status JSON scan. */
async function scanStatusJsonFast(opts, runtime) {
	return await scanStatusJsonWithPolicy(opts, runtime, {
		commandName: "status --json",
		allowMissingConfigFastPath: true,
		fetchGitUpdate: opts.all === true,
		includeRegistryUpdate: opts.all === true,
		includeLocalStatusRpcFallback: opts.all === true,
		gatewayProbeTimeoutMs: opts.all === true ? void 0 : () => opts.timeoutMs ?? 1e3,
		resolveHasConfiguredChannels: (cfg) => hasPotentialConfiguredChannelsForStatusJson(cfg),
		resolveMemory: async ({ cfg, agentStatus, memoryPlugin }) => {
			if (!opts.all) return null;
			const { resolveDefaultMemoryDatabasePath, resolveStatusMemoryStatusSnapshot } = await statusScanMemoryModuleLoader.load();
			return await resolveStatusMemoryStatusSnapshot({
				cfg,
				agentStatus,
				memoryPlugin,
				requireDefaultDatabasePath: resolveDefaultMemoryDatabasePath
			});
		}
	});
}
//#endregion
export { scanStatusJsonWithPolicy as n, executeStatusScanFromOverview as r, scanStatusJsonFast as t };
