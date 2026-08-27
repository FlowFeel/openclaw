import { c as tracePluginLifecyclePhaseAsync, s as tracePluginLifecyclePhase } from "./discovery-B47lmslh.js";
import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import { r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { d as readConfigFileSnapshotForWrite } from "./io-DCw4R0kD.js";
import { t as parseClawHubPluginSpec } from "./clawhub-spec-CzLwxQg_.js";
import { r as theme } from "./theme-vjDs9tao.js";
import "./clawhub-Clykbwlp.js";
import { r as resolveDefaultPluginExtensionsDir } from "./install-paths-D18EkQi8.js";
import { n as assertConfigWriteAllowedInCurrentMode } from "./nix-mode-write-guard-DxUD04la.js";
import { r as replaceConfigFile } from "./mutate-j69oSRi2.js";
import "./config-UtpOr1Uw.js";
import { r as withClawPackageLifecycleLease } from "./claw-package-lifecycle-lease-CHOJplxB.js";
import { t as withPluginLifecycleLease } from "./plugin-lifecycle-lease-Cz3f3Szj.js";
//#region src/cli/plugins-uninstall-command.ts
function isPromptInputClosedError(error, PromptInputClosedError) {
	return error instanceof PromptInputClosedError;
}
async function runPluginUninstallCommand(id, opts = {}, runtime = defaultRuntime) {
	if (opts.dryRun) return await runPluginUninstallCommandUnlocked(id, opts, runtime);
	assertConfigWriteAllowedInCurrentMode();
	if (!opts.force) return await runPluginUninstallCommandUnlocked(id, opts, runtime);
	return await withPluginLifecycleLease({}, async () => await runPluginUninstallCommandUnlocked(id, opts, runtime));
}
async function runPluginUninstallCommandUnlocked(id, opts, runtime, skipPreview = false) {
	if (!opts.dryRun) assertConfigWriteAllowedInCurrentMode();
	const { loadInstalledPluginIndexInstallRecords, removePluginInstallRecordFromRecords, withoutPluginInstallRecords, withPluginInstallRecords } = await import("./installed-plugin-index-records-D0VI1KgI.js");
	const { buildPluginSnapshotReport } = await import("./status-B2HU2CGu.js");
	const { applyPluginUninstallDirectoryRemoval, formatUninstallActionLabels, formatUninstallSlotResetPreview, planPluginUninstall, pluginUninstallTargetExists, prepareConfigForPendingPluginDirectoryRemoval, resolveUninstallChannelConfigKeys, UNINSTALL_ACTION_LABELS } = await import("./uninstall-C44uh50l.js");
	const { commitPluginInstallRecordsWithConfig } = await import("./install-record-commit-B54Qq6Ut.js");
	const { selectInstallMutationWriteOptions } = await import("./install-persistence-nSrhe1rf.js");
	const { refreshPluginRegistryAfterConfigMutation } = await import("./registry-refresh-BfT1DNuO.js");
	const { resolvePluginUninstallId } = await import("./plugins-uninstall-selection-CNJmpU6d.js");
	const { PromptInputClosedError, promptYesNo } = await import("./prompt-B7EijTXm.js");
	const prepared = await tracePluginLifecyclePhaseAsync("config read", () => readConfigFileSnapshotForWrite(), { command: "uninstall" });
	const { snapshot } = prepared;
	const mutationWriteOptions = selectInstallMutationWriteOptions(prepared.writeOptions);
	const sourceConfig = snapshot.sourceConfig ?? snapshot.config;
	const installRecords = await tracePluginLifecyclePhaseAsync("install records load", () => loadInstalledPluginIndexInstallRecords(), { command: "uninstall" });
	const cfg = withPluginInstallRecords(sourceConfig, installRecords);
	const report = tracePluginLifecyclePhase("plugin registry snapshot", () => buildPluginSnapshotReport({ config: cfg }), { command: "uninstall" });
	const extensionsDir = resolveDefaultPluginExtensionsDir();
	const keepFiles = Boolean(opts.keepFiles || opts.keepConfig);
	if (opts.keepConfig) runtime.log(theme.warn("`--keep-config` is deprecated, use `--keep-files`."));
	const selection = resolvePluginUninstallId({
		rawId: id,
		config: cfg,
		plugins: report.plugins
	});
	if (!selection.ok) {
		runtime.error(selection.error);
		runtime.exit(1);
		return;
	}
	const { plugin, pluginId } = selection.value;
	const channelIds = plugin?.channelIds;
	const initialPlan = planPluginUninstall({
		config: cfg,
		pluginId,
		channelIds,
		deleteFiles: !keepFiles,
		extensionsDir
	});
	if (!initialPlan.ok) {
		if (plugin) runtime.error(`Plugin "${pluginId}" is not managed by plugins config/install records and cannot be uninstalled.`);
		else runtime.error(initialPlan.error);
		runtime.exit(1);
		return;
	}
	let plan = initialPlan;
	const hasInstall = Object.hasOwn(cfg.plugins?.installs ?? {}, pluginId);
	const preview = [];
	if (plan.actions.entry) preview.push(UNINSTALL_ACTION_LABELS.entry);
	if (plan.actions.install) preview.push(UNINSTALL_ACTION_LABELS.install);
	if (plan.actions.allowlist) preview.push(UNINSTALL_ACTION_LABELS.allowlist);
	if (plan.actions.denylist) preview.push(UNINSTALL_ACTION_LABELS.denylist);
	if (plan.actions.loadPath) preview.push(UNINSTALL_ACTION_LABELS.loadPath);
	if (plan.actions.memorySlot) preview.push(formatUninstallSlotResetPreview("memory"));
	if (plan.actions.contextEngineSlot) preview.push(formatUninstallSlotResetPreview("contextEngine"));
	const channels = cfg.channels;
	if (plan.actions.channelConfig && hasInstall && channels) {
		for (const key of resolveUninstallChannelConfigKeys(pluginId, { channelIds })) if (Object.hasOwn(channels, key)) preview.push(`${UNINSTALL_ACTION_LABELS.channelConfig} (channels.${key})`);
	}
	if (plan.directoryRemoval) preview.push(`directory: ${shortenHomePath(plan.directoryRemoval.target)}`);
	if (!skipPreview) {
		const pluginName = plugin?.name || pluginId;
		runtime.log(`Plugin: ${theme.command(pluginName)}${pluginName !== pluginId ? theme.muted(` (${pluginId})`) : ""}`);
		runtime.log(`Will remove: ${preview.length > 0 ? preview.join(", ") : "(nothing)"}`);
		const { collectClawPluginUninstallWarnings } = await import("./uninstall-claw-references-BhM08FbG.js");
		for (const warning of collectClawPluginUninstallWarnings({
			pluginId,
			installRecord: cfg.plugins?.installs?.[pluginId]
		})) runtime.log(theme.warn(warning));
	}
	let nextConfig = withoutPluginInstallRecords(plan.config);
	if (opts.dryRun) {
		runtime.log(theme.muted("Dry run, no changes made."));
		return;
	}
	if (!opts.force) {
		let confirmed;
		try {
			confirmed = await promptYesNo(`Uninstall plugin "${pluginId}"?`);
		} catch (error) {
			if (isPromptInputClosedError(error, PromptInputClosedError)) {
				runtime.error("Error: plugins uninstall requires confirmation input. Re-run in an interactive TTY or pass --force.");
				runtime.exit(1);
				return;
			}
			throw error;
		}
		if (!confirmed) {
			runtime.log("Cancelled.");
			return;
		}
		return await withPluginLifecycleLease({}, async () => await runPluginUninstallCommandUnlocked(id, {
			...opts,
			force: true
		}, runtime, true));
	}
	const uninstall = async () => {
		let finalBaseHash = snapshot.hash;
		let finalWriteOptions = mutationWriteOptions;
		let directoryResult = {
			directoryRemoved: false,
			warnings: []
		};
		if (plan.directoryRemoval) {
			const disabledConfig = prepareConfigForPendingPluginDirectoryRemoval(sourceConfig, pluginId);
			finalBaseHash = (await tracePluginLifecyclePhaseAsync("config disable", () => replaceConfigFile({
				nextConfig: disabledConfig,
				...snapshot.hash !== void 0 ? { baseHash: snapshot.hash } : {},
				writeOptions: {
					...mutationWriteOptions,
					afterWrite: { mode: "auto" }
				}
			}), { command: "uninstall" }))?.persistedHash ?? snapshot.hash;
			directoryResult = await applyPluginUninstallDirectoryRemoval(plan.directoryRemoval);
			for (const warning of directoryResult.warnings) runtime.log(theme.warn(warning));
			if (pluginUninstallTargetExists(plan.directoryRemoval.target)) throw new Error(`Failed to remove plugin directory ${shortenHomePath(plan.directoryRemoval.target)}; the plugin remains disabled and tracked so uninstall can be retried.`);
			const refreshedPrepared = await tracePluginLifecyclePhaseAsync("config reread", () => readConfigFileSnapshotForWrite(), { command: "uninstall" });
			const refreshedSnapshot = refreshedPrepared.snapshot;
			const refreshedSourceConfig = refreshedSnapshot.sourceConfig ?? refreshedSnapshot.config;
			const refreshedPlan = planPluginUninstall({
				config: withPluginInstallRecords(refreshedSourceConfig, installRecords),
				pluginId,
				channelIds,
				deleteFiles: true,
				extensionsDir
			});
			if (!refreshedPlan.ok) throw new Error(refreshedPlan.error);
			plan = refreshedPlan;
			nextConfig = withoutPluginInstallRecords(plan.config);
			finalBaseHash = refreshedSnapshot.hash;
			finalWriteOptions = selectInstallMutationWriteOptions(refreshedPrepared.writeOptions);
		}
		const nextInstallRecords = removePluginInstallRecordFromRecords(installRecords, pluginId);
		await tracePluginLifecyclePhaseAsync("config mutation", () => commitPluginInstallRecordsWithConfig({
			previousInstallRecords: installRecords,
			nextInstallRecords,
			nextConfig,
			...finalBaseHash !== void 0 ? { baseHash: finalBaseHash } : {},
			writeOptions: {
				...finalWriteOptions,
				allowConfigSizeDrop: true,
				afterWrite: {
					mode: "restart",
					reason: "plugin source changed"
				}
			}
		}), { command: "uninstall" });
		if (!plan.directoryRemoval) directoryResult = await applyPluginUninstallDirectoryRemoval(null);
		await refreshPluginRegistryAfterConfigMutation({
			config: nextConfig,
			reason: "source-changed",
			installRecords: nextInstallRecords,
			invalidateRuntimeCache: opts.invalidateRuntimeCache,
			traceCommand: "uninstall",
			logger: { warn: (message) => runtime.log(theme.warn(message)) }
		});
		const removed = formatUninstallActionLabels({
			...plan.actions,
			directory: directoryResult.directoryRemoved
		});
		runtime.log(`Uninstalled plugin "${pluginId}". Removed: ${removed.length > 0 ? removed.join(", ") : "nothing"}.`);
		runtime.log("Restart the gateway to apply changes.");
	};
	const installRecord = cfg.plugins?.installs?.[pluginId];
	const clawhubPackage = installRecord?.source === "clawhub" ? installRecord.clawhubPackage ?? parseClawHubPluginSpec(installRecord.spec ?? "")?.name : void 0;
	if (opts.clawManaged || !clawhubPackage) return await uninstall();
	await withClawPackageLifecycleLease({
		kind: "plugin",
		source: "clawhub",
		ref: clawhubPackage
	}, uninstall, { required: true });
}
//#endregion
export { runPluginUninstallCommand as t };
