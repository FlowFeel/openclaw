import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { N as validateConfigObjectWithPlugins } from "./io-DCw4R0kD.js";
import { t as getBootstrapChannelPlugin } from "./bootstrap-registry-DX8KJK1s.js";
import { n as LEGACY_CONFIG_MIGRATIONS } from "./legacy-B52k-ZXJ.js";
import { n as collectRelevantDoctorPluginIds, t as applyPluginDoctorCompatibilityMigrations } from "./doctor-contract-registry-CRvVJr_Z.js";
import { t as loadBundledChannelDoctorContractApi } from "./doctor-contract-api-BPhAT8_s.js";
//#region src/commands/doctor/shared/channel-legacy-config-migrate.ts
function collectRelevantDoctorChannelIds(raw) {
	const channels = isRecord(raw) && isRecord(raw.channels) ? raw.channels : null;
	if (!channels) return [];
	return Object.keys(channels).filter((channelId) => channelId !== "defaults").toSorted();
}
function migrateHeartbeatVisibility(raw, changes) {
	const channels = isRecord(raw.channels) ? raw.channels : null;
	if (!channels) return;
	const migrateEntry = (entry, path, preserveEmptyPluginBlock = false) => {
		const heartbeat = isRecord(entry.heartbeat) ? entry.heartbeat : null;
		const keys = heartbeat ? Object.keys(heartbeat) : [];
		if (!heartbeat || preserveEmptyPluginBlock && keys.length === 0 || keys.some((key) => key !== "showOk" && key !== "showAlerts" && key !== "useIndicator")) return;
		if (entry.heartbeatVisibility === void 0) {
			entry.heartbeatVisibility = entry.heartbeat;
			changes.push(`Moved ${path}.heartbeat → ${path}.heartbeatVisibility.`);
		} else changes.push(`Removed ${path}.heartbeat (${path}.heartbeatVisibility already set).`);
		delete entry.heartbeat;
	};
	const defaults = isRecord(channels.defaults) ? channels.defaults : null;
	if (defaults) migrateEntry(defaults, "channels.defaults");
	for (const [channelId, value] of Object.entries(channels)) {
		if (channelId === "defaults" || !isRecord(value)) continue;
		const preserveEmptyPluginBlock = channelId === "feishu";
		migrateEntry(value, `channels.${channelId}`, preserveEmptyPluginBlock);
		const accounts = isRecord(value.accounts) ? value.accounts : null;
		if (!accounts) continue;
		for (const [accountId, account] of Object.entries(accounts)) if (isRecord(account)) migrateEntry(account, `channels.${channelId}.accounts.${accountId}`, preserveEmptyPluginBlock);
	}
}
function resolveBundledChannelCompatibilityNormalizer(channelId) {
	const contractNormalizer = loadBundledChannelDoctorContractApi(channelId)?.normalizeCompatibilityConfig;
	if (typeof contractNormalizer === "function") return contractNormalizer;
	return getBootstrapChannelPlugin(channelId)?.doctor?.normalizeCompatibilityConfig;
}
function collectPluginDoctorCompatibilityIds(params) {
	const unresolvedChannelIds = new Set(params.unresolvedChannelIds);
	return [.../* @__PURE__ */ new Set([...params.unresolvedChannelIds, ...collectRelevantDoctorPluginIds(params.raw).filter((pluginId) => !unresolvedChannelIds.has(pluginId))])].toSorted();
}
/** Apply bundled and plugin channel compatibility migrations to a legacy config object. */
function applyChannelDoctorCompatibilityMigrations(cfg) {
	let nextCfg = cfg;
	const changes = [];
	migrateHeartbeatVisibility(cfg, changes);
	const unresolvedChannelIds = [];
	for (const channelId of collectRelevantDoctorChannelIds(cfg)) {
		const normalizeCompatibilityConfig = resolveBundledChannelCompatibilityNormalizer(channelId);
		if (!normalizeCompatibilityConfig) {
			unresolvedChannelIds.push(channelId);
			continue;
		}
		const mutation = normalizeCompatibilityConfig({ cfg: nextCfg });
		if (!mutation || mutation.changes.length === 0) continue;
		nextCfg = mutation.config;
		changes.push(...mutation.changes);
	}
	const pluginIds = collectPluginDoctorCompatibilityIds({
		raw: cfg,
		unresolvedChannelIds
	});
	if (pluginIds.length > 0) {
		const compat = applyPluginDoctorCompatibilityMigrations(nextCfg, {
			config: cfg,
			pluginIds
		});
		nextCfg = compat.config;
		changes.push(...compat.changes);
	}
	return {
		next: nextCfg,
		changes
	};
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-compat.ts
/** Apply all legacy doctor migrations to raw config, returning null when nothing changed. */
function applyLegacyDoctorMigrations(raw, context) {
	if (!raw || typeof raw !== "object") return {
		next: null,
		changes: []
	};
	const original = raw;
	const next = structuredClone(original);
	const changes = [];
	for (const migration of LEGACY_CONFIG_MIGRATIONS) migration.apply(next, changes, context);
	const compat = applyChannelDoctorCompatibilityMigrations(next);
	changes.push(...compat.changes);
	if (changes.length === 0) return {
		next: null,
		changes: []
	};
	return {
		next: compat.next,
		changes
	};
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-migrate.ts
/** Apply legacy migrations and validate the resulting OpenClaw config shape when possible. */
function migrateLegacyConfig(raw, context) {
	const { next, changes } = applyLegacyDoctorMigrations(raw, context);
	if (!next) return {
		config: null,
		changes: []
	};
	const validated = validateConfigObjectWithPlugins(context ? applyLegacyDoctorMigrations(context.resolvedRaw, context).next ?? context.resolvedRaw : next);
	if (!validated.ok) {
		changes.push("Migration applied; other validation issues remain — run doctor to review.");
		return {
			config: next,
			changes,
			partiallyValid: true
		};
	}
	return {
		config: validated.config,
		sourceConfig: next,
		changes
	};
}
//#endregion
export { applyChannelDoctorCompatibilityMigrations as n, migrateLegacyConfig as t };
