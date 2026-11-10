import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { n as normalizeAccountId } from "./account-id-CIVg1QNG.js";
import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-BBjU-hqW.js";
import { t as defineChannelSetupContract } from "./setup-contract-v3-D0s84.js";
import { t as createSetupTranslator } from "./i18n-BYpJa9f7.js";
import { t as createAccountListHelpers } from "./account-helpers-Dal2iRvY.js";
import "./temp-path-CVFOBJ6f.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import { i as createPatchedAccountSetupAdapter } from "./setup-helpers-Clze7-j-.js";
import { i as createDelegatedSetupWizardProxy } from "./setup-credential-BpH9R_y0.js";
import "./setup-runtime-CB6BLGeO.js";
import "./channel-setup-BJoA6Z1d.js";
import "./account-resolution-BGa8AgPR.js";
import path from "node:path";
import fs from "node:fs/promises";
//#region extensions/zalouser/src/accounts.ts
const loadZalouserAccountsRuntime = createLazyRuntimeModule(() => import("./accounts.runtime.js"));
const { listAccountIds: listZalouserAccountIds, resolveDefaultAccountId: resolveDefaultZalouserAccountId, resolveAccountConfig: resolveMergedZalouserAccountConfig } = createAccountListHelpers("zalouser", {
	omitKeys: ["defaultAccount"],
	implicitDefaultAccount: {
		channelKeys: ["profile"],
		envVars: ["ZALOUSER_PROFILE", "ZCA_PROFILE"]
	}
});
function mergeZalouserAccountConfig(cfg, accountId) {
	const merged = resolveMergedZalouserAccountConfig(cfg, accountId);
	return {
		...merged,
		groupPolicy: merged.groupPolicy ?? "allowlist"
	};
}
function resolveProfile(config, accountId) {
	if (config.profile?.trim()) return config.profile.trim();
	if (process.env.ZALOUSER_PROFILE?.trim()) return process.env.ZALOUSER_PROFILE.trim();
	if (process.env.ZCA_PROFILE?.trim()) return process.env.ZCA_PROFILE.trim();
	if (accountId !== "default") return accountId;
	return "default";
}
function resolveZalouserAccountBase(params) {
	const accountId = normalizeAccountId(params.accountId ?? resolveDefaultZalouserAccountId(params.cfg));
	const baseEnabled = (params.cfg.channels?.zalouser)?.enabled !== false;
	const merged = mergeZalouserAccountConfig(params.cfg, accountId);
	return {
		accountId,
		enabled: baseEnabled && merged.enabled !== false,
		merged,
		profile: resolveProfile(merged, accountId)
	};
}
function resolveZalouserAccountSync(params) {
	const { accountId, enabled, merged, profile } = resolveZalouserAccountBase(params);
	return {
		accountId,
		name: normalizeOptionalString(merged.name),
		enabled,
		profile,
		authenticated: false,
		config: merged
	};
}
async function checkZcaAuthenticated(profile, options) {
	return await (await loadZalouserAccountsRuntime()).checkZaloAuthenticated(profile, options);
}
//#endregion
//#region extensions/zalouser/src/qr-temp-file.ts
async function writeQrDataUrlToTempFile(qrDataUrl, profile) {
	const base64 = (qrDataUrl.trim().match(/^data:image\/png;base64,(.+)$/i)?.[1] ?? "").trim();
	if (!base64) return null;
	const safeProfile = profile.replace(/[^a-zA-Z0-9_-]+/g, "-") || "default";
	const filePath = path.join(resolvePreferredOpenClawTmpDir(), `openclaw-zalouser-qr-${safeProfile}.png`);
	await fs.writeFile(filePath, Buffer.from(base64, "base64"), { mode: 384 });
	await fs.chmod(filePath, 384);
	return filePath;
}
//#endregion
//#region extensions/zalouser/src/setup-core.ts
const t = createSetupTranslator();
const channel = "zalouser";
const zalouserSetupAdapter = createPatchedAccountSetupAdapter({
	channelKey: channel,
	validateInput: () => null,
	buildPatch: () => ({})
});
const zalouserSetupContract = defineChannelSetupContract({
	fields: {},
	legacyAdapter: zalouserSetupAdapter
});
function createZalouserSetupWizardProxy(loadWizard) {
	return createDelegatedSetupWizardProxy({
		channel,
		loadWizard,
		status: {
			configuredLabel: t("wizard.channels.statusLoggedIn"),
			unconfiguredLabel: t("wizard.channels.statusNeedsQrLogin"),
			configuredHint: t("wizard.channels.statusRecommendedLoggedIn"),
			unconfiguredHint: t("wizard.channels.statusRecommendedQrLogin"),
			configuredScore: 1,
			unconfiguredScore: 15
		},
		credentials: [],
		delegatePrepare: true,
		delegateFinalize: true
	});
}
//#endregion
export { checkZcaAuthenticated as a, resolveZalouserAccountSync as c, writeQrDataUrlToTempFile as i, zalouserSetupAdapter as n, listZalouserAccountIds as o, zalouserSetupContract as r, resolveDefaultZalouserAccountId as s, createZalouserSetupWizardProxy as t };
