import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { a as projectPluginDependencyHealth, r as buildPluginDependencyStatus } from "./discovery-B47lmslh.js";
import { f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { I as createEmptyPluginRegistry } from "./runtime-yJAYArQt.js";
import { a as loadPluginRegistrySnapshotWithMetadata } from "./plugin-registry-snapshot-_sDMVMul.js";
import "./plugin-registry-BKsO1htA.js";
import { r as loadPluginMetadataSnapshot } from "./plugin-metadata-snapshot-DtW_P3kZ.js";
import "./config-UtpOr1Uw.js";
//#region src/plugins/status-snapshot.ts
/** Builds plugin status reports from persisted metadata without importing full plugin runtimes. */
function isPluginLifecycleTraceEnabled() {
	const raw = process.env.OPENCLAW_PLUGIN_LIFECYCLE_TRACE?.trim().toLowerCase();
	return raw === "1" || raw === "true" || raw === "yes";
}
function formatTraceValue(value) {
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	return JSON.stringify(value);
}
function tracePluginLifecyclePhase(phase, fn, details) {
	if (!isPluginLifecycleTraceEnabled()) return fn();
	const start = process.hrtime.bigint();
	let status;
	try {
		const result = fn();
		status = "ok";
		return result;
	} catch (error) {
		status = "error";
		throw error;
	} finally {
		const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
		const detailText = Object.entries(details ?? {}).filter((entry) => entry[1] !== void 0).map(([key, value]) => `${key}=${formatTraceValue(value)}`).join(" ");
		const suffix = detailText ? ` ${detailText}` : "";
		console.error(`[plugins:lifecycle] phase=${JSON.stringify(phase)} ms=${elapsedMs.toFixed(2)} status=${status ?? "error"}${suffix}`);
	}
}
function buildPluginRecordFromInstalledIndex(plugin, manifest) {
	const format = plugin.format ?? manifest?.format ?? "openclaw";
	const bundleFormat = plugin.bundleFormat ?? manifest?.bundleFormat;
	return {
		id: plugin.pluginId,
		name: manifest?.name ?? plugin.packageName ?? plugin.pluginId,
		...plugin.packageVersion || manifest?.version ? { version: plugin.packageVersion ?? manifest?.version } : {},
		...manifest?.description ? { description: manifest.description } : {},
		format,
		...bundleFormat ? { bundleFormat } : {},
		...manifest?.kind ? { kind: manifest.kind } : {},
		source: plugin.source ?? plugin.manifestPath,
		rootDir: plugin.rootDir,
		origin: plugin.origin,
		enabled: plugin.enabled,
		compat: plugin.compat,
		syntheticAuthRefs: [...plugin.syntheticAuthRefs ?? manifest?.syntheticAuthRefs ?? []],
		status: plugin.enabled ? "loaded" : "disabled",
		toolNames: uniqueStrings(manifest?.contracts?.tools ?? []),
		hookNames: [],
		channelIds: [...manifest?.channels ?? []],
		cliBackendIds: [...manifest?.cliBackends ?? [], ...manifest?.setup?.cliBackends ?? []],
		providerIds: [...manifest?.providers ?? []],
		embeddingProviderIds: [...manifest?.contracts?.embeddingProviders ?? []],
		speechProviderIds: [...manifest?.contracts?.speechProviders ?? []],
		realtimeTranscriptionProviderIds: [...manifest?.contracts?.realtimeTranscriptionProviders ?? []],
		realtimeVoiceProviderIds: [...manifest?.contracts?.realtimeVoiceProviders ?? []],
		mediaUnderstandingProviderIds: [...manifest?.contracts?.mediaUnderstandingProviders ?? []],
		transcriptSourceProviderIds: [...manifest?.contracts?.transcriptSourceProviders ?? []],
		imageGenerationProviderIds: [...manifest?.contracts?.imageGenerationProviders ?? []],
		videoGenerationProviderIds: [...manifest?.contracts?.videoGenerationProviders ?? []],
		musicGenerationProviderIds: [...manifest?.contracts?.musicGenerationProviders ?? []],
		webFetchProviderIds: [...manifest?.contracts?.webFetchProviders ?? []],
		webSearchProviderIds: [...manifest?.contracts?.webSearchProviders ?? []],
		migrationProviderIds: [...manifest?.contracts?.migrationProviders ?? []],
		memoryEmbeddingProviderIds: [...manifest?.contracts?.memoryEmbeddingProviders ?? []],
		agentHarnessIds: [],
		cliCommands: [],
		services: [],
		gatewayDiscoveryServiceIds: [],
		commands: [...manifest?.commandAliases?.map((alias) => alias.name) ?? []],
		httpRoutes: 0,
		hookCount: 0,
		configSchema: Boolean(manifest?.configSchema),
		contracts: manifest?.contracts,
		dependencyStatus: plugin.origin === "bundled" ? void 0 : buildPluginDependencyStatus({
			rootDir: plugin.rootDir,
			dependencies: manifest?.packageDependencies,
			optionalDependencies: manifest?.packageOptionalDependencies
		})
	};
}
/** Resolves the best available plugin registry snapshot and annotates dependency status. */
function buildPluginRegistrySnapshotReport(params) {
	const config = params?.config ?? getRuntimeConfig();
	const env = params?.env ?? process.env;
	const workspaceDir = params?.workspaceDir ?? resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config), env);
	const result = tracePluginLifecyclePhase("plugin registry snapshot", () => loadPluginRegistrySnapshotWithMetadata({
		config,
		env: params?.env,
		workspaceDir
	}), { surface: "status" });
	const manifestByPluginId = loadPluginMetadataSnapshot({
		index: result.snapshot,
		config,
		env,
		workspaceDir
	}).byPluginId;
	return projectPluginDependencyHealth({
		workspaceDir,
		...createEmptyPluginRegistry(),
		plugins: result.snapshot.plugins.map((plugin) => buildPluginRecordFromInstalledIndex(plugin, manifestByPluginId.get(plugin.pluginId))),
		diagnostics: [...result.snapshot.diagnostics],
		registrySource: result.source,
		registryDiagnostics: result.diagnostics
	});
}
//#endregion
export { buildPluginRegistrySnapshotReport as t };
