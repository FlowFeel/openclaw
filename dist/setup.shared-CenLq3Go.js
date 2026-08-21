import { g as isPlainObject } from "./utils-Bs67j6-3.js";
import { g as resolveGatewayPort } from "./paths-CL43LNS6.js";
import { t as formatCliCommand } from "./command-format-C5kg4XY_.js";
import { b as createConfigIO } from "./io-BsQc3Kgy.js";
import { c as resolveDefaultSecretProviderAlias } from "./ref-contract-BVYOI0KD.js";
import { r as replaceConfigFile } from "./mutate-dYcqgG_5.js";
import "./config-BBVHtcXg.js";
import { n as t } from "./i18n-BYpJa9f7.js";
import { t as WizardCancelledError } from "./prompts-B0iOB1_a.js";
import { a as hasPendingPluginInstallRecords, c as unchangedPendingPluginInstallRecordIds, n as commitConfigWriteWithPendingPluginInstalls, o as stripPendingPluginInstallRecords } from "./install-record-commit-BuloUnQI.js";
import { isDeepStrictEqual } from "node:util";
import chalk from "chalk";
//#region src/wizard/setup.security-note.ts
const heading = (text) => chalk.bold(text);
function getSecurityNoteTitle() {
	return t("wizard.security.title");
}
function getSecurityConfirmMessage() {
	return t("wizard.security.confirm");
}
function getSecurityNoteMessage() {
	return [
		t("wizard.security.attribution"),
		t("wizard.security.personalAgent"),
		t("wizard.security.toolAccess"),
		t("wizard.security.promptRisk"),
		"",
		t("wizard.security.notMultitenant"),
		t("wizard.security.sharedAuthority"),
		"",
		t("wizard.security.hardeningRequired"),
		t("wizard.security.askForHelp"),
		"",
		heading(t("wizard.security.recommendedBaseline")),
		`- ${t("wizard.security.baselinePairing")}`,
		`- ${t("wizard.security.baselineSharedInbox")}`,
		`- ${t("wizard.security.baselineSandbox")}`,
		`- ${t("wizard.security.baselineDmSessions")}`,
		`- ${t("wizard.security.baselineSecrets")}`,
		`- ${t("wizard.security.baselineStrongModel")}`,
		"",
		heading(t("wizard.security.runRegularly")),
		formatCliCommand("openclaw security audit --deep"),
		formatCliCommand("openclaw security audit --fix"),
		"",
		heading(t("wizard.security.learnMore")),
		"- https://docs.openclaw.ai/gateway/security"
	].join("\n");
}
//#endregion
//#region src/wizard/setup.shared.ts
function hasQuickstartGatewayOverrides(overrides) {
	return overrides.gatewayPort !== void 0 || overrides.gatewayBind !== void 0 || overrides.gatewayAuth !== void 0 || overrides.gatewayToken !== void 0 || overrides.gatewayTokenRefEnv !== void 0 || overrides.gatewayPassword !== void 0 || overrides.tailscale !== void 0 || overrides.tailscaleResetOnExit !== void 0;
}
function mergeWizardConfigValueOntoLatest(current, base, next) {
	if (isDeepStrictEqual(next, base)) return current;
	if (isPlainObject(current) && isPlainObject(base) && isPlainObject(next)) {
		const merged = { ...current };
		const keys = /* @__PURE__ */ new Set([
			...Object.keys(current),
			...Object.keys(base),
			...Object.keys(next)
		]);
		for (const key of keys) {
			const mergedValue = mergeWizardConfigValueOntoLatest(current[key], base[key], next[key]);
			if (mergedValue === void 0) delete merged[key];
			else merged[key] = mergedValue;
		}
		return merged;
	}
	return structuredClone(next);
}
/** Preserve concurrent edits while applying only changes made by an interactive wizard. */
function mergeWizardConfigOntoLatest(current, base, next) {
	return mergeWizardConfigValueOntoLatest(current, base, next);
}
/**
* Config writes go through the pending-plugin-install commit helper so wizard
* flows never drop install records that a concurrent migration already staged.
*/
async function writeWizardConfigFile(configInput, opts = {}) {
	let config = configInput;
	let baseHash = opts.baseHash;
	let baseSnapshot = opts.baseSnapshot;
	const allowConfigSizeDrop = opts.allowConfigSizeDrop === true;
	const afterWrite = opts.afterWrite ?? { mode: "auto" };
	if (!allowConfigSizeDrop && hasPendingPluginInstallRecords(config)) {
		if (!Object.hasOwn(opts, "migrationBaseConfig")) throw new Error("Wizard config writes with pending plugin installs must declare migration ownership.");
		const migrationBaseConfig = opts.migrationBaseConfig;
		if (migrationBaseConfig && hasPendingPluginInstallRecords(migrationBaseConfig)) {
			baseHash = (await commitConfigWriteWithPendingPluginInstalls({
				nextConfig: migrationBaseConfig,
				sourceConfig: migrationBaseConfig,
				writeOptions: { allowConfigSizeDrop: true },
				commit: async (nextConfig, writeOptions) => {
					return await replaceConfigFile({
						nextConfig,
						...baseSnapshot ? { snapshot: baseSnapshot } : {},
						...baseHash !== void 0 ? { baseHash } : {},
						...writeOptions ? { writeOptions } : {},
						afterWrite
					});
				}
			})).persistedHash ?? void 0;
			baseSnapshot = void 0;
			config = stripPendingPluginInstallRecords(config, unchangedPendingPluginInstallRecordIds(config, migrationBaseConfig));
			opts.onPendingPluginInstallMigration?.();
		}
	}
	return (await commitConfigWriteWithPendingPluginInstalls({
		nextConfig: config,
		writeOptions: { allowConfigSizeDrop },
		commit: async (nextConfig, writeOptions) => {
			return await replaceConfigFile({
				nextConfig,
				...baseSnapshot ? { snapshot: baseSnapshot } : {},
				...baseHash !== void 0 ? { baseHash } : {},
				...writeOptions ? { writeOptions } : {},
				afterWrite
			});
		}
	})).config;
}
async function readSetupConfigFileSnapshot() {
	return await createConfigIO({ pluginValidation: "skip" }).readConfigFileSnapshot();
}
async function readValidSetupConfigFile() {
	const snapshot = await readSetupConfigFileSnapshot();
	if (!snapshot.valid) throw new Error("Migration target config became invalid. Run `openclaw doctor`.");
	return snapshot.exists ? snapshot.sourceConfig ?? snapshot.config : {};
}
/** One-time security acknowledgement; persisted so reruns stay quiet. */
async function requireRiskAcknowledgement(params) {
	if (params.config.wizard?.securityAcknowledgedAt) return params.config;
	if (params.opts.acceptRisk === true) return applySecurityAcknowledgement(params.config);
	await params.prompter.note(getSecurityNoteMessage(), getSecurityNoteTitle());
	if (!await params.prompter.confirm({
		message: getSecurityConfirmMessage(),
		initialValue: true,
		layout: "vertical"
	})) throw new WizardCancelledError(t("wizard.setup.riskNotAccepted"));
	return applySecurityAcknowledgement(params.config);
}
function applySecurityAcknowledgement(config) {
	if (config.wizard?.securityAcknowledgedAt) return config;
	return {
		...config,
		wizard: {
			...config.wizard,
			securityAcknowledgedAt: (/* @__PURE__ */ new Date()).toISOString()
		}
	};
}
/** Derive quickstart gateway defaults, preserving any existing gateway settings. */
function resolveQuickstartGatewayDefaults(baseConfig, overrides = {}) {
	const hasExisting = typeof baseConfig.gateway?.port === "number" || baseConfig.gateway?.bind !== void 0 || baseConfig.gateway?.auth?.mode !== void 0 || baseConfig.gateway?.auth?.token !== void 0 || baseConfig.gateway?.auth?.password !== void 0 || baseConfig.gateway?.customBindHost !== void 0 || baseConfig.gateway?.tailscale?.mode !== void 0;
	const bindRaw = baseConfig.gateway?.bind;
	const bind = bindRaw === "loopback" || bindRaw === "lan" || bindRaw === "auto" || bindRaw === "custom" || bindRaw === "tailnet" ? bindRaw : "loopback";
	let authMode = "token";
	if (baseConfig.gateway?.auth?.mode === "token" || baseConfig.gateway?.auth?.mode === "password") authMode = baseConfig.gateway.auth.mode;
	else if (baseConfig.gateway?.auth?.token) authMode = "token";
	else if (baseConfig.gateway?.auth?.password) authMode = "password";
	const tailscaleRaw = baseConfig.gateway?.tailscale?.mode;
	const tailscaleMode = tailscaleRaw === "off" || tailscaleRaw === "serve" || tailscaleRaw === "funnel" ? tailscaleRaw : "off";
	const explicitAuthMode = overrides.gatewayAuth ?? (overrides.gatewayToken !== void 0 || overrides.gatewayTokenRefEnv !== void 0 ? "token" : overrides.gatewayPassword !== void 0 ? "password" : void 0);
	return {
		hasExisting,
		port: overrides.gatewayPort ?? resolveGatewayPort(baseConfig),
		bind: overrides.gatewayBind ?? bind,
		authMode: explicitAuthMode ?? authMode,
		tailscaleMode: overrides.tailscale ?? tailscaleMode,
		token: overrides.gatewayTokenRefEnv !== void 0 ? {
			source: "env",
			provider: resolveDefaultSecretProviderAlias(baseConfig, "env", { preferFirstProviderForSource: true }),
			id: overrides.gatewayTokenRefEnv.trim()
		} : overrides.gatewayToken ?? baseConfig.gateway?.auth?.token,
		password: overrides.gatewayPassword ?? baseConfig.gateway?.auth?.password,
		customBindHost: baseConfig.gateway?.customBindHost,
		tailscaleResetOnExit: overrides.tailscaleResetOnExit ?? baseConfig.gateway?.tailscale?.resetOnExit ?? false
	};
}
//#endregion
export { requireRiskAcknowledgement as a, readValidSetupConfigFile as i, mergeWizardConfigOntoLatest as n, resolveQuickstartGatewayDefaults as o, readSetupConfigFileSnapshot as r, writeWizardConfigFile as s, hasQuickstartGatewayOverrides as t };
