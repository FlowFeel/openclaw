import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { g as resolveGatewayPort } from "./paths-CL43LNS6.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { t as formatCliCommand } from "./command-format-C5kg4XY_.js";
import { r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { Q as ConfigMutationConflictError } from "./io-BsQc3Kgy.js";
import { m as normalizeSecretInputString } from "./types.secrets-BvApkFoj.js";
import { i as resolveAgentModelPrimaryValue } from "./model-input-BofPWz0k.js";
import { r as hasResolvedRosterBeforeMigrations } from "./agent-roster-provenance-CfRWZSQN.js";
import { n as createMergePatch, t as applyMergePatch } from "./merge-patch-DNAwVDQs.js";
import "./config-BBVHtcXg.js";
import { r as resolveOnboardingAgentTarget } from "./onboard-agent-target-enCiwOCS.js";
import { n as t } from "./i18n-BYpJa9f7.js";
import { c as formatPluginCompatibilityNotice, r as buildPluginCompatibilitySnapshotNotices } from "./status-DBhSQc1q.js";
import { t as runWizardWithPromptNavigation } from "./navigation-prompter-CL-8dE9t.js";
import { t as resolveSetupSecretInputString } from "./setup.secret-input-LgKCz_O5.js";
import { a as requireRiskAcknowledgement, i as readValidSetupConfigFile, o as resolveQuickstartGatewayDefaults, r as readSetupConfigFileSnapshot, s as writeWizardConfigFile, t as hasQuickstartGatewayOverrides } from "./setup.shared-CenLq3Go.js";
import { a as runSetupModelAuthStep, i as offerLiveModelVerification, n as listSetupMigrationOptions, r as runSetupMigrationImport, t as detectSetupMigrationSources } from "./setup.migration-import-B9uCPQW6.js";
import { t as resolveSetupWorkspaceSelection } from "./setup.workspace-BHi5WwA6.js";
import { isDeepStrictEqual } from "node:util";
//#region src/wizard/setup.ts
const loadConfigLoggingModule = createLazyRuntimeModule(() => import("./logging-Ci4qMKQZ.js"));
const loadOnboardConfigModule = createLazyRuntimeModule(() => import("./onboard-config-QTvalpLQ.js"));
function hasConfiguredDefaultModel(config) {
	return resolveAgentModelPrimaryValue(config.agents?.defaults?.model) !== void 0;
}
function isSetupImportFlowChoice(flow) {
	return flow === "import" || flow.startsWith("import:");
}
function resolveImportProviderFromFlowChoice(flow) {
	return flow.startsWith("import:") ? flow.slice(7) : void 0;
}
async function runSetupWizard(opts, runtimeInput, prompter) {
	await runWizardWithPromptNavigation(prompter, async (navigationPrompter) => await runSetupWizardOnce(opts, runtimeInput, navigationPrompter));
}
async function runSetupWizardOnce(opts, runtimeInput, prompter) {
	let runtime = runtimeInput;
	runtime ??= defaultRuntime;
	const onboardHelpers = await import("./onboard-helpers-CKVn1bCG.js");
	await onboardHelpers.printWizardHeader(runtime);
	await prompter.intro(t("wizard.setup.intro"));
	const snapshot = await readSetupConfigFileSnapshot();
	let currentSetupSnapshot = snapshot;
	let baseConfig = snapshot.valid ? snapshot.runtimeConfig ?? snapshot.config : {};
	baseConfig = await requireRiskAcknowledgement({
		opts,
		prompter,
		config: baseConfig
	});
	let pendingPluginInstallMigrationBaseConfig = baseConfig;
	const writeSetupConfigFile = async (config, optsLocal = {}) => await writeWizardConfigFile(config, {
		...optsLocal,
		migrationBaseConfig: pendingPluginInstallMigrationBaseConfig,
		onPendingPluginInstallMigration: () => {
			pendingPluginInstallMigrationBaseConfig = void 0;
		}
	});
	if (snapshot.exists && !snapshot.valid) {
		await prompter.note(onboardHelpers.summarizeExistingConfig(baseConfig), t("wizard.setup.invalidConfigTitle"));
		if (snapshot.issues.length > 0) await prompter.note([
			...snapshot.issues.map((iss) => `- ${iss.path}: ${iss.message}`),
			"",
			"Docs: https://docs.openclaw.ai/gateway/configuration"
		].join("\n"), "Config issues");
		await prompter.outro(`Config invalid. Run \`${formatCliCommand("openclaw doctor")}\` to repair it, then re-run setup.`);
		runtime.exit(1);
		return;
	}
	const compatibilityNotices = snapshot.valid ? buildPluginCompatibilitySnapshotNotices({ config: baseConfig }) : [];
	if (compatibilityNotices.length > 0) await prompter.note([
		`Detected ${compatibilityNotices.length} plugin compatibility notice${compatibilityNotices.length === 1 ? "" : "s"} in the current config.`,
		...compatibilityNotices.slice(0, 4).map((notice) => `- ${formatPluginCompatibilityNotice(notice)}`),
		...compatibilityNotices.length > 4 ? [`- ... +${compatibilityNotices.length - 4} more`] : [],
		"",
		`Review: ${formatCliCommand("openclaw doctor")}`,
		`Inspect: ${formatCliCommand("openclaw plugins inspect --all")}`
	].join("\n"), t("wizard.setup.pluginCompatibilityTitle"));
	const quickstartHint = t("wizard.setup.flowQuickstartHint", { command: formatCliCommand("openclaw configure") });
	const manualHint = t("wizard.setup.flowAdvancedHint");
	const hasExistingModelConfig = hasConfiguredDefaultModel(baseConfig);
	const migrationDetections = await detectSetupMigrationSources({
		config: baseConfig,
		runtime
	});
	const importOptions = (await listSetupMigrationOptions({
		baseConfig,
		detections: migrationDetections
	})).map((option) => {
		const choice = {
			value: `import:${option.providerId}`,
			label: t("wizard.migration.importFrom", { source: option.label })
		};
		if (option.hint) choice.hint = option.hint;
		return choice;
	});
	const explicitFlowRaw = opts.flow?.trim();
	const normalizedExplicitFlow = explicitFlowRaw === "manual" ? "advanced" : explicitFlowRaw;
	if (normalizedExplicitFlow && normalizedExplicitFlow !== "quickstart" && normalizedExplicitFlow !== "advanced" && normalizedExplicitFlow !== "import") {
		runtime.error("Invalid --flow. Use quickstart, manual, advanced, or import. Example: openclaw onboard --flow quickstart");
		runtime.exit(1);
		return;
	}
	const explicitFlow = normalizedExplicitFlow === "quickstart" || normalizedExplicitFlow === "advanced" || normalizedExplicitFlow === "import" ? normalizedExplicitFlow : void 0;
	const keepModelOption = hasExistingModelConfig ? {
		value: "keep-model",
		label: t("wizard.setup.flowKeepModel"),
		hint: t("wizard.setup.flowKeepModelHint")
	} : void 0;
	const importIntent = Boolean(opts.importFrom?.trim() || opts.importSource?.trim() || opts.importSecrets);
	let flow = explicitFlow ?? (importIntent ? "import" : await prompter.select({
		message: t("wizard.setup.setupMode"),
		options: [
			...keepModelOption ? [keepModelOption] : [],
			{
				value: "quickstart",
				label: t("wizard.setup.flowQuickstart"),
				hint: quickstartHint
			},
			{
				value: "advanced",
				label: t("wizard.setup.flowAdvanced"),
				hint: manualHint
			},
			...importOptions
		],
		initialValue: hasExistingModelConfig ? "keep-model" : "quickstart"
	}));
	let keepExistingModelConfig = flow === "keep-model";
	if (keepExistingModelConfig) flow = "quickstart";
	if (opts.mode === "remote" && flow === "quickstart") {
		await prompter.note(t("wizard.setup.quickstartOnlyLocal"), t("wizard.setup.quickstartTitle"));
		flow = "advanced";
	}
	if (snapshot.exists && !keepExistingModelConfig) await prompter.note(onboardHelpers.summarizeExistingConfig(baseConfig), t("wizard.setup.existingConfigTitle"));
	const usedImportFlow = Boolean(opts.importFrom || isSetupImportFlowChoice(flow));
	let acknowledgeMigrationPromotion;
	let importedInferenceVerified = false;
	if (usedImportFlow) {
		const importFrom = opts.importFrom ?? resolveImportProviderFromFlowChoice(flow);
		prompter.disableBackNavigation?.();
		const migrationOutcome = await runSetupMigrationImport({
			opts: {
				...opts,
				...importFrom ? { importFrom } : {}
			},
			baseConfig,
			detections: migrationDetections,
			prompter,
			runtime,
			readConfigFile: readValidSetupConfigFile,
			async commitConfigFile(cfg, expectedConfig) {
				const latest = await readSetupConfigFileSnapshot();
				if (!latest.valid) throw new Error("Migration target config became invalid. Run `openclaw doctor`.");
				if (!isDeepStrictEqual(latest.exists ? latest.sourceConfig ?? latest.config : {}, expectedConfig)) throw new ConfigMutationConflictError("config changed during migration promotion", { currentHash: latest.hash ?? null });
				return await writeWizardConfigFile(cfg, {
					allowConfigSizeDrop: true,
					baseSnapshot: latest,
					...latest.hash !== void 0 ? { baseHash: latest.hash } : {}
				});
			},
			continueOnboarding: true
		});
		acknowledgeMigrationPromotion = migrationOutcome.acknowledgePromotion;
		const migratedSnapshot = await readSetupConfigFileSnapshot();
		if (!migratedSnapshot.valid) throw new Error("Migration produced an invalid OpenClaw config. Run `openclaw doctor`.");
		currentSetupSnapshot = migratedSnapshot;
		baseConfig = migratedSnapshot.runtimeConfig ?? migratedSnapshot.config;
		pendingPluginInstallMigrationBaseConfig = baseConfig;
		const importedModelRef = resolveAgentModelPrimaryValue(baseConfig.agents?.defaults?.model);
		importedInferenceVerified = migrationOutcome.kind === "verified-inference" && importedModelRef === migrationOutcome.modelRef;
		keepExistingModelConfig = importedInferenceVerified;
		flow = "quickstart";
	}
	const wizardFlow = flow === "advanced" ? "advanced" : "quickstart";
	const hasExplicitQuickstartGatewayOverrides = wizardFlow === "quickstart" && hasQuickstartGatewayOverrides(opts);
	const quickstartGateway = resolveQuickstartGatewayDefaults(baseConfig, wizardFlow === "quickstart" ? opts : void 0);
	if (flow === "quickstart") {
		const formatBind = (value) => {
			if (value === "loopback") return t("wizard.gateway.bindLoopback");
			if (value === "lan") return t("wizard.gateway.bindLan");
			if (value === "custom") return t("wizard.gateway.bindCustom");
			if (value === "tailnet") return t("wizard.gateway.bindTailnet");
			return t("wizard.gateway.bindAuto");
		};
		const formatAuth = (value) => {
			if (value === "token") return t("wizard.setup.quickstartAuthTokenDefault");
			return t("common.password");
		};
		const formatTailscale = (value) => {
			return t(`wizard.gatewayTailscale.${value}`);
		};
		const quickstartLines = [
			...quickstartGateway.hasExisting && !hasExplicitQuickstartGatewayOverrides ? [t("wizard.setup.quickstartKeepSettings")] : [],
			t("wizard.setup.quickstartGatewayPort", { port: quickstartGateway.port }),
			t("wizard.setup.quickstartGatewayBind", { bind: formatBind(quickstartGateway.bind) }),
			...quickstartGateway.bind === "custom" && quickstartGateway.customBindHost ? [t("wizard.setup.quickstartGatewayCustomIp", { host: quickstartGateway.customBindHost })] : [],
			t("wizard.setup.quickstartGatewayAuth", { auth: formatAuth(quickstartGateway.authMode) }),
			t("wizard.setup.quickstartTailscaleExposure", { exposure: formatTailscale(quickstartGateway.tailscaleMode) }),
			t("wizard.setup.quickstartDirectChannels")
		];
		await prompter.note(quickstartLines.join("\n"), "QuickStart");
	}
	const localPort = resolveGatewayPort(baseConfig);
	const localUrl = `ws://127.0.0.1:${localPort}`;
	let localGatewayToken = process.env.OPENCLAW_GATEWAY_TOKEN;
	try {
		const resolvedGatewayToken = await resolveSetupSecretInputString({
			config: baseConfig,
			value: baseConfig.gateway?.auth?.token,
			path: "gateway.auth.token",
			env: process.env
		});
		if (resolvedGatewayToken) localGatewayToken = resolvedGatewayToken;
	} catch (error) {
		await prompter.note([t("wizard.setup.secretRefProbeFailed", { field: "gateway.auth.token" }), formatErrorMessage(error)].join("\n"), t("wizard.gateway.auth"));
	}
	let localGatewayPassword = process.env.OPENCLAW_GATEWAY_PASSWORD;
	try {
		const resolvedGatewayPassword = await resolveSetupSecretInputString({
			config: baseConfig,
			value: baseConfig.gateway?.auth?.password,
			path: "gateway.auth.password",
			env: process.env
		});
		if (resolvedGatewayPassword) localGatewayPassword = resolvedGatewayPassword;
	} catch (error) {
		await prompter.note([t("wizard.setup.secretRefProbeFailed", { field: "gateway.auth.password" }), formatErrorMessage(error)].join("\n"), t("wizard.gateway.auth"));
	}
	const localProbe = await onboardHelpers.probeGatewayReachable({
		url: localUrl,
		token: localGatewayToken,
		password: localGatewayPassword
	});
	const storedRemoteUrl = normalizeOptionalString(baseConfig.gateway?.remote?.url);
	const optionRemoteUrl = normalizeOptionalString(opts.remoteUrl);
	const remoteUrlChanged = opts.remoteUrl !== void 0 && optionRemoteUrl !== storedRemoteUrl;
	const remoteSeedConfig = opts.remoteUrl === void 0 && opts.remoteToken === void 0 ? baseConfig : {
		...baseConfig,
		gateway: {
			...baseConfig.gateway,
			remote: {
				...baseConfig.gateway?.remote,
				...opts.remoteUrl !== void 0 ? { url: optionRemoteUrl } : {},
				...opts.remoteToken !== void 0 ? { token: normalizeOptionalString(opts.remoteToken) } : remoteUrlChanged ? { token: void 0 } : {},
				...remoteUrlChanged ? { password: void 0 } : {}
			}
		}
	};
	const seededRemoteUrl = remoteSeedConfig.gateway?.remote?.url?.trim() ?? "";
	const remoteOnboard = seededRemoteUrl ? await import("./onboard-remote-B3PlA9nF.js") : null;
	const remoteUrl = seededRemoteUrl && remoteOnboard?.validateGatewayWebSocketUrl(seededRemoteUrl) === void 0 ? seededRemoteUrl : "";
	let remoteGatewayToken = normalizeSecretInputString(remoteSeedConfig.gateway?.remote?.token);
	try {
		const resolvedRemoteGatewayToken = await resolveSetupSecretInputString({
			config: remoteSeedConfig,
			value: remoteSeedConfig.gateway?.remote?.token,
			path: "gateway.remote.token",
			env: process.env
		});
		if (resolvedRemoteGatewayToken) remoteGatewayToken = resolvedRemoteGatewayToken;
	} catch (error) {
		await prompter.note(["Could not resolve gateway.remote.token SecretRef for setup probe.", formatErrorMessage(error)].join("\n"), "Gateway auth");
	}
	const remoteProbe = remoteUrl ? await onboardHelpers.probeGatewayReachable({
		url: remoteUrl,
		token: remoteGatewayToken
	}) : null;
	const mode = opts.mode ?? (flow === "quickstart" ? "local" : await prompter.select({
		message: t("wizard.setup.whatSetup"),
		options: [{
			value: "local",
			label: t("wizard.setup.localGateway"),
			hint: localProbe.ok ? t("wizard.setup.localGatewayReachable", { url: localUrl }) : t("wizard.setup.localGatewayMissing", { url: localUrl })
		}, {
			value: "remote",
			label: t("wizard.setup.remoteGateway"),
			hint: !remoteUrl ? t("wizard.setup.remoteGatewayMissing") : remoteProbe?.ok ? t("wizard.setup.remoteGatewayReachable", { url: remoteUrl }) : t("wizard.setup.remoteGatewayUnreachable", { url: remoteUrl })
		}]
	}));
	if (mode === "remote") {
		const { promptRemoteGatewayConfig } = remoteOnboard ?? await import("./onboard-remote-B3PlA9nF.js");
		const { applySkipBootstrapConfig } = await loadOnboardConfigModule();
		const { logConfigUpdated } = await loadConfigLoggingModule();
		let nextConfig = await promptRemoteGatewayConfig(remoteSeedConfig, prompter, { secretInputMode: opts.secretInputMode });
		if (opts.skipBootstrap) nextConfig = applySkipBootstrapConfig(nextConfig);
		nextConfig = onboardHelpers.applyWizardMetadata(nextConfig, {
			command: "onboard",
			mode
		});
		prompter.disableBackNavigation?.();
		await writeSetupConfigFile(nextConfig, { allowConfigSizeDrop: false });
		logConfigUpdated(runtime);
		await prompter.outro(t("wizard.setup.remoteConfigured"));
		return;
	}
	const requestedWorkspaceDir = resolveUserPath((opts.workspace ?? (flow === "quickstart" ? baseConfig.agents?.defaults?.workspace ?? onboardHelpers.DEFAULT_WORKSPACE : await prompter.text({
		message: t("wizard.setup.workspaceDirectory"),
		initialValue: baseConfig.agents?.defaults?.workspace ?? onboardHelpers.DEFAULT_WORKSPACE
	}))).trim() || onboardHelpers.DEFAULT_WORKSPACE);
	const { applyLocalSetupWorkspaceConfig, applySkipBootstrapConfig } = await loadOnboardConfigModule();
	const hasAuthoredRoster = hasResolvedRosterBeforeMigrations(currentSetupSnapshot);
	const { workspaceDir, allowWorkspaceChange } = await resolveSetupWorkspaceSelection({
		baseConfig,
		requestedWorkspaceDir,
		prompter,
		hasAuthoredRoster
	});
	let nextConfig = applyLocalSetupWorkspaceConfig(baseConfig, requestedWorkspaceDir, { allowWorkspaceChange: allowWorkspaceChange || !hasAuthoredRoster });
	if (opts.skipBootstrap) nextConfig = applySkipBootstrapConfig(nextConfig);
	const preModelAuthConfig = nextConfig;
	let stagedModelAuth;
	if (!keepExistingModelConfig) {
		stagedModelAuth = await runSetupModelAuthStep({
			config: nextConfig,
			opts,
			prompter,
			runtime
		});
		nextConfig = stagedModelAuth.config;
	}
	const { configureGatewayForSetup } = await import("./setup.gateway-config-CWCcBRM9.js");
	const gateway = await configureGatewayForSetup({
		flow: wizardFlow,
		baseConfig,
		nextConfig,
		localPort,
		quickstartGateway,
		secretInputMode: opts.secretInputMode,
		prompter,
		runtime
	});
	const onboard = (await import("./onboard-agent-B8yD0Xrd.js")).ensureOnboardingConfig;
	nextConfig = (await onboard(gateway.nextConfig, workspaceDir, usedImportFlow, baseConfig)).config;
	let liveModelVerified = false;
	let setupConfigPersisted = false;
	if (opts.nonInteractive !== true && !importedInferenceVerified && hasConfiguredDefaultModel(nextConfig) && (usedImportFlow && keepExistingModelConfig || opts.authChoice !== "skip")) {
		const verificationTarget = resolveOnboardingAgentTarget(nextConfig);
		const verification = await offerLiveModelVerification({
			config: nextConfig,
			...stagedModelAuth ? { initialCandidate: {
				...stagedModelAuth,
				config: nextConfig
			} } : {},
			opts,
			prompter,
			runtime,
			workspaceDir: verificationTarget.workspaceDir,
			writeConfig: async (config) => await writeSetupConfigFile(config, { allowConfigSizeDrop: false }),
			required: usedImportFlow && keepExistingModelConfig
		});
		nextConfig = verification.config;
		liveModelVerified = verification.verified;
		setupConfigPersisted = verification.persisted;
		if (!verification.verified && verification.attempted && stagedModelAuth) nextConfig = applyMergePatch(nextConfig, createMergePatch(stagedModelAuth.config, preModelAuthConfig));
		else if (!verification.verified && stagedModelAuth) await stagedModelAuth.persistAuthProfiles();
	} else if (stagedModelAuth) await stagedModelAuth.persistAuthProfiles();
	if (!setupConfigPersisted) nextConfig = await writeSetupConfigFile(nextConfig, { allowConfigSizeDrop: false });
	prompter.disableBackNavigation?.();
	if (opts.skipChannels) await prompter.note(t("wizard.setup.skipChannels"), t("wizard.setup.channelsTitle"));
	else {
		const { listChannelPlugins } = await import("./plugins-BbO9-w4w.js");
		const { setupChannels } = await import("./onboard-channels-yrpTV2ON.js");
		const quickstartAllowFromChannels = flow === "quickstart" ? listChannelPlugins().filter((plugin) => plugin.meta.quickstartAllowFrom).map((plugin) => plugin.id) : [];
		nextConfig = await setupChannels(nextConfig, runtime, prompter, {
			allowIMessageInstall: true,
			allowSignalInstall: true,
			deferStatusUntilSelection: flow === "quickstart",
			forceAllowFromChannels: quickstartAllowFromChannels,
			skipDmPolicyPrompt: flow === "quickstart",
			skipConfirm: flow === "quickstart",
			quickstartDefaults: flow === "quickstart",
			secretInputMode: opts.secretInputMode
		});
	}
	nextConfig = await writeSetupConfigFile(nextConfig, { allowConfigSizeDrop: false });
	let onboardingTarget = resolveOnboardingAgentTarget(nextConfig);
	const { logConfigUpdated } = await loadConfigLoggingModule();
	logConfigUpdated(runtime);
	await onboardHelpers.ensureWorkspaceAndSessions(onboardingTarget.workspaceDir, runtime, {
		skipBootstrap: Boolean(nextConfig.agents?.defaults?.skipBootstrap),
		skipOptionalBootstrapFiles: nextConfig.agents?.defaults?.skipOptionalBootstrapFiles,
		agentId: onboardingTarget.agentId
	});
	if (!usedImportFlow) {
		const { runSetupMemoryImportStep } = await import("./setup.memory-import-B7R9AdB5.js");
		await runSetupMemoryImportStep({
			config: nextConfig,
			prompter,
			runtime
		});
	}
	if (opts.skipSearch) await prompter.note(t("wizard.setup.skipSearch"), t("wizard.setup.searchTitle"));
	else {
		const { runSearchSetupFlow } = await import("./search-setup-D9t5LPIq.js");
		nextConfig = (await runSearchSetupFlow(nextConfig, runtime, prompter, {
			quickstartDefaults: flow === "quickstart",
			secretInputMode: opts.secretInputMode
		})).config;
	}
	if (opts.skipSkills) await prompter.note(t("wizard.setup.skipSkills"), t("wizard.setup.skillsTitle"));
	else {
		const { setupSkills } = await import("./onboard-skills-DLW1szzn.js");
		nextConfig = await setupSkills(nextConfig, onboardingTarget.workspaceDir, runtime, prompter, { nodeManager: opts.nodeManager });
	}
	let commitAppRecommendationResult;
	if (flow !== "quickstart") {
		const { setupOfficialPluginInstalls } = await import("./setup.official-plugins-BIE5s9Qy.js");
		nextConfig = await setupOfficialPluginInstalls({
			config: nextConfig,
			prompter,
			runtime,
			workspaceDir: onboardingTarget.workspaceDir
		});
		const { setupAppRecommendations } = await import("./setup.app-recommendations-D3q12h4e.js");
		const recommendationOutcome = await setupAppRecommendations({
			config: nextConfig,
			prompter,
			runtime,
			workspaceDir: onboardingTarget.workspaceDir,
			modelRouteVerified: liveModelVerified
		});
		nextConfig = recommendationOutcome.config;
		commitAppRecommendationResult = recommendationOutcome.commitResult;
		const { setupPluginConfig } = await import("./setup.plugin-config-p9pdlrGc.js");
		nextConfig = await setupPluginConfig({
			config: nextConfig,
			prompter,
			workspaceDir: onboardingTarget.workspaceDir
		});
	}
	if (!opts.skipHooks) {
		const { enableDefaultOnboardingInternalHooks } = await import("./onboard-hooks-B9MyjyDR.js");
		nextConfig = enableDefaultOnboardingInternalHooks(nextConfig);
	}
	nextConfig = onboardHelpers.applyWizardMetadata(nextConfig, {
		command: "onboard",
		mode
	});
	nextConfig = await writeSetupConfigFile(nextConfig, { allowConfigSizeDrop: false });
	onboardingTarget = resolveOnboardingAgentTarget(nextConfig);
	commitAppRecommendationResult?.();
	const { finalizeSetupWizard } = await import("./setup.finalize-DUvH4s--.js");
	const finalizeResult = await finalizeSetupWizard({
		flow: wizardFlow,
		opts,
		baseConfig,
		hadExistingConfig: snapshot.exists,
		nextConfig,
		workspaceDir: onboardingTarget.workspaceDir,
		settings: gateway.settings,
		prompter,
		runtime
	});
	await acknowledgeMigrationPromotion?.();
	if (finalizeResult.launchedTui) runtime.exit(0);
}
//#endregion
export { runSetupWizard as t };
