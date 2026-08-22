import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { v as resolveIsNixMode } from "./paths-CL43LNS6.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { n as registerPluginMetadataProcessMemoLifecycleClear } from "./plugin-metadata-lifecycle-NcA0EWhA.js";
import { f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { E as collectChangedPaths, d as readConfigFileSnapshotForWrite } from "./io-DCw4R0kD.js";
import { t as parseClawHubPluginSpec } from "./clawhub-spec-CzLwxQg_.js";
import { s as parseRegistryNpmSpec } from "./npm-registry-spec-CCN1EPEy.js";
import { t as installPluginFromGitSpec } from "./git-install-Bx_wakIK.js";
import { n as MANIFEST_KEY } from "./legacy-names-NIXaj2oi.js";
import { r as resolveDefaultPluginExtensionsDir } from "./install-paths-D18EkQi8.js";
import { n as loadInstalledPluginIndexInstallRecords } from "./installed-plugin-index-record-reader-COVyHO2A.js";
import { f as loadConfiguredHostedOfficialExternalPluginCatalogEntries, g as resolveOfficialExternalPluginLabel, h as resolveOfficialExternalPluginInstall, i as getOfficialExternalPluginCatalogManifest, m as resolveOfficialExternalPluginId, u as listOfficialExternalPluginCatalogEntries } from "./official-external-plugin-catalog-D2YYNHlE.js";
import { i as resolveTrustedSourceLinkedOfficialNpmSpec, r as resolveTrustedSourceLinkedOfficialClawHubSpec, t as resolveTrustedOfficialClawHubPackageName } from "./official-external-install-records-CF6EIE25.js";
import { t as validateJsonSchemaValue } from "./schema-validator-CySXOkZz.js";
import { a as resolvePluginMetadataSnapshot, r as loadPluginMetadataSnapshot } from "./plugin-metadata-snapshot-DtW_P3kZ.js";
import { t as ensurePluginAllowlisted } from "./plugins-allowlist-DGbUrepm.js";
import { t as setPluginEnabledInConfig } from "./toggle-config-BtlQD1G9.js";
import { t as enableExplicitlySelectedPluginInConfig } from "./enable-DEW975UE.js";
import { n as assertConfigWriteAllowedInCurrentMode } from "./nix-mode-write-guard-DxUD04la.js";
import { r as replaceConfigFile } from "./mutate-j69oSRi2.js";
import "./config-UtpOr1Uw.js";
import { t as buildNpmResolutionFields } from "./install-source-utils-Bi2zlcsu.js";
import { a as withPluginInstallRecords, o as withoutPluginInstallRecords, r as removePluginInstallRecordFromRecords } from "./installed-plugin-index-records-D-ObTfAD.js";
import { t as listRecommendedToolInstalls } from "./recommended-tool-installs-5z2KJP_x.js";
import { r as resolveManifestProviderAuthChoices } from "./provider-auth-choices-t9Huvqjl.js";
import { a as planPluginUninstall, n as applyPluginUninstallDirectoryRemoval, o as pluginUninstallTargetExists, r as formatUninstallActionLabels, s as prepareConfigForPendingPluginDirectoryRemoval } from "./uninstall-UbEs0MM2.js";
import { i as commitPluginInstallRecordsWithConfig } from "./install-record-commit-DrWxHVRD.js";
import { n as refreshPluginRegistryAfterConfigMutation } from "./registry-refresh-DWgWrc0h.js";
import { t as applySlotSelectionForPlugin } from "./slot-selection-BfqVv4uS.js";
import { a as selectInstallMutationWriteOptions, i as resolveInstallConfigMutationPreflights, n as persistPluginInstall } from "./install-persistence-0w6g-lDo.js";
import { t as withPluginLifecycleLease } from "./plugin-lifecycle-lease-Cz3f3Szj.js";
import { i as installPluginFromNpmPackArchive, n as installPluginFromPath, r as installPluginFromNpmSpec } from "./install-DPhv2dMg.js";
import { t as CLAWHUB_INSTALL_ERROR_CODE } from "./clawhub-error-codes-OgrR1N6P.js";
import { t as installPluginFromClawHub } from "./clawhub-CE8R--1P.js";
import { t as buildClawHubPluginInstallRecordFields } from "./clawhub-install-records-Dy2deHKG.js";
import { t as collectClawPluginUninstallWarnings } from "./uninstall-claw-references-DyLAj-00.js";
import path from "node:path";
//#region src/plugins/bundled-install.ts
function resolveBundledPluginConfigEnablement(params) {
	if (!params.bundledSource.requiresConfig) return { mode: "ready" };
	const entry = isRecord(params.existingEntry) ? params.existingEntry : void 0;
	if (!entry || !Object.hasOwn(entry, "config")) return { mode: "missing" };
	const config = entry.config;
	if (!params.bundledSource.configSchema) return isRecord(config) && Object.keys(config).length > 0 ? { mode: "ready" } : {
		mode: "invalid",
		error: "config must be a non-empty object"
	};
	const result = validateJsonSchemaValue({
		schema: params.bundledSource.configSchema,
		cacheKey: `bundled-install:${params.bundledSource.pluginId}`,
		value: config,
		applyDefaults: true
	});
	return result.ok ? { mode: "ready" } : {
		mode: "invalid",
		error: result.errors[0]?.text ?? "invalid plugin config"
	};
}
function prepareConfigForDisabledBundledInstall(config, pluginId) {
	const entry = config.plugins?.entries?.[pluginId];
	const policy = isRecord(entry) ? { ...entry } : {};
	delete policy.config;
	return {
		...config,
		plugins: {
			...config.plugins,
			entries: {
				...config.plugins?.entries,
				[pluginId]: {
					...policy,
					enabled: false
				}
			}
		}
	};
}
async function installBundledPluginSource(params) {
	const existingEntry = params.snapshot.config.plugins?.entries?.[params.bundledSource.pluginId];
	const configEnablement = resolveBundledPluginConfigEnablement({
		bundledSource: params.bundledSource,
		existingEntry
	});
	if (configEnablement.mode === "invalid") throw new Error(`Plugin "${params.bundledSource.pluginId}" has invalid configured settings: ${configEnablement.error}. Fix plugins.entries.${params.bundledSource.pluginId}.config, then rerun the install.`);
	const shouldEnable = configEnablement.mode === "ready";
	const configBase = shouldEnable ? params.snapshot.config : prepareConfigForDisabledBundledInstall(params.snapshot.config, params.bundledSource.pluginId);
	const configWarning = shouldEnable ? void 0 : `Installed bundled plugin "${params.bundledSource.pluginId}" without enabling it because it requires configuration first. Configure it, then run \`openclaw plugins enable ${params.bundledSource.pluginId}\`.`;
	const warnings = [params.warning, configWarning].filter((warning) => Boolean(warning));
	await persistPluginInstall({
		snapshot: {
			...params.snapshot,
			config: configBase
		},
		pluginId: params.bundledSource.pluginId,
		install: {
			source: "path",
			spec: params.rawSpec,
			sourcePath: params.bundledSource.localPath,
			installPath: params.bundledSource.localPath
		},
		enable: shouldEnable,
		invalidateRuntimeCache: params.invalidateRuntimeCache,
		...warnings.length > 0 ? { warningMessage: warnings.join("\n") } : {},
		runtime: params.runtime
	});
	return {
		pluginId: params.bundledSource.pluginId,
		warnings
	};
}
//#endregion
//#region src/plugins/management-service.ts
var ManagedPluginLifecycleError = class extends Error {
	constructor(message, details) {
		super(message, details?.cause !== void 0 ? { cause: details.cause } : void 0);
		this.name = "ManagedPluginLifecycleError";
		this.kind = details?.kind ?? "invalid-request";
		this.code = details?.code;
		this.version = details?.version;
		this.warning = details?.warning;
	}
};
let officialCatalogCache;
const OFFICIAL_CATALOG_CACHE_KEY = "built-in";
/** Clear the process-stable hosted catalog snapshot after an explicit owner reload. */
function clearManagedPluginOfficialCatalogCache() {
	officialCatalogCache = void 0;
}
registerPluginMetadataProcessMemoLifecycleClear(clearManagedPluginOfficialCatalogCache);
function resolveCatalogManifestIcon(manifest) {
	if (!manifest || typeof manifest !== "object") return;
	return normalizeOptionalString(manifest.icon);
}
function resolveCatalogEntryIcon(entry) {
	return normalizeOptionalString(entry?.icon) ?? resolveCatalogManifestIcon(getOfficialExternalPluginCatalogManifest(entry ?? {}));
}
function mergeCatalogMetadata(hosted, bundled, options) {
	const hostedManifest = getOfficialExternalPluginCatalogManifest(hosted);
	const bundledManifest = getOfficialExternalPluginCatalogManifest(bundled);
	const bundledCatalog = bundledManifest?.catalog;
	const bundledPlugin = bundledManifest?.plugin;
	const bundledIcon = resolveCatalogManifestIcon(bundledManifest);
	const bundledName = normalizeOptionalString(bundled.name);
	const bundledDescription = normalizeOptionalString(bundled.description);
	const bundledKind = normalizeOptionalString(bundled.kind);
	const bundledSource = normalizeOptionalString(bundled.source);
	const hostedFeatured = typeof hosted.featured === "boolean" ? hosted.featured : false;
	const mergedCatalog = bundledCatalog || hostedManifest?.catalog || options.hostedFeaturedAuthoritative && hostedFeatured ? {
		...hostedManifest?.catalog,
		...bundledCatalog,
		...options.hostedFeaturedAuthoritative ? { featured: hostedFeatured } : {}
	} : void 0;
	if (!mergedCatalog && !bundledPlugin) return hosted;
	return {
		...hosted,
		...!normalizeOptionalString(hosted.name) && bundledName ? { name: bundledName } : {},
		...!normalizeOptionalString(hosted.description) && bundledDescription ? { description: bundledDescription } : {},
		...!normalizeOptionalString(hosted.kind) && bundledKind ? { kind: bundledKind } : {},
		...!normalizeOptionalString(hosted.source) && bundledSource ? { source: bundledSource } : {},
		[MANIFEST_KEY]: {
			...hostedManifest,
			...bundledPlugin ? { plugin: {
				...hostedManifest?.plugin,
				...bundledPlugin
			} } : {},
			...mergedCatalog ? { catalog: mergedCatalog } : {},
			...!resolveCatalogManifestIcon(hostedManifest) && bundledIcon ? { icon: bundledIcon } : {}
		}
	};
}
function resolveCatalogPackageSourceIdentities(entry) {
	const install = resolveOfficialExternalPluginInstall(entry);
	const clawhubPackage = install?.clawhubSpec ? parseClawHubPluginSpec(install.clawhubSpec)?.name : void 0;
	const npmPackage = install?.npmSpec ? parseRegistryNpmSpec(install.npmSpec)?.name : void 0;
	return [...clawhubPackage ? [{
		source: "clawhub",
		packageName: clawhubPackage
	}] : [], ...npmPackage ? [{
		source: "npm",
		packageName: npmPackage
	}] : []];
}
function matchesBundledCatalogIdentity(params) {
	const hostedSources = resolveCatalogPackageSourceIdentities(params.hosted);
	const bundledSources = resolveCatalogPackageSourceIdentities(params.bundled);
	return hostedSources.some((hosted) => bundledSources.some((bundled) => bundled.source === hosted.source && bundled.packageName === hosted.packageName));
}
/**
* Overlay local runtime identity and ordering after an exact package/source match.
* Hosted curation wins; bundled Featured state survives only in fallback mode.
*/
function overlayBundledOfficialPluginCatalogMetadata(entries, bundledEntries = listOfficialExternalPluginCatalogEntries(), options = { hostedFeaturedAuthoritative: false }) {
	return entries.map((entry) => {
		const matches = bundledEntries.filter((bundled) => matchesBundledCatalogIdentity({
			hosted: entry,
			bundled
		}));
		const bundled = matches.length === 1 ? matches[0] : void 0;
		if (bundled) return mergeCatalogMetadata(entry, bundled, options);
		if (!options.hostedFeaturedAuthoritative) return entry;
		const hostedManifest = getOfficialExternalPluginCatalogManifest(entry);
		if (entry.featured !== true && !hostedManifest?.catalog) return entry;
		return {
			...entry,
			[MANIFEST_KEY]: {
				...hostedManifest,
				catalog: {
					...hostedManifest?.catalog,
					featured: entry.featured === true
				}
			}
		};
	});
}
async function loadOfficialCatalog() {
	const key = OFFICIAL_CATALOG_CACHE_KEY;
	if (officialCatalogCache?.key !== key) officialCatalogCache = {
		key,
		result: loadConfiguredHostedOfficialExternalPluginCatalogEntries()
	};
	const result = await officialCatalogCache.result;
	const hostedFeaturedAuthoritative = result.source === "hosted" || result.source === "hosted-snapshot";
	return {
		entries: overlayBundledOfficialPluginCatalogMetadata(result.entries, void 0, { hostedFeaturedAuthoritative }),
		hostedFeaturedAuthoritative,
		..."error" in result ? { error: result.error } : {}
	};
}
function normalizeKinds(kind) {
	const values = (typeof kind === "string" ? [kind] : kind ?? []).map((value) => value.trim()).filter(Boolean);
	return values.length > 0 ? [...new Set(values)] : void 0;
}
function normalizeCatalogMetadata(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return;
	const record = value;
	const featured = typeof record.featured === "boolean" ? record.featured : void 0;
	const order = typeof record.order === "number" && Number.isFinite(record.order) ? record.order : void 0;
	return featured === void 0 && order === void 0 ? void 0 : {
		...featured !== void 0 ? { featured } : {},
		...order !== void 0 ? { order } : {}
	};
}
function normalizeFeaturedAt(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : void 0;
}
function resolveCatalogInstallAction(params) {
	const install = resolveOfficialExternalPluginInstall(params.entry);
	const clawhub = install?.clawhubSpec ? parseClawHubPluginSpec(install.clawhubSpec) : void 0;
	if (clawhub && !clawhub.version) return {
		source: "clawhub",
		packageName: clawhub.name
	};
	return install ? {
		source: "official",
		pluginId: params.pluginId
	} : void 0;
}
/** Coarse manifest-derived grouping so catalog UIs can shelve a large inventory. */
function derivePluginCategory(manifest) {
	if (!manifest) return;
	if (manifest.channels.length > 0 || Object.keys(manifest.channelConfigs ?? {}).length > 0) return "channel";
	const mediaProvider = Object.keys(manifest.imageGenerationProviderMetadata ?? {}).length > 0 || Object.keys(manifest.videoGenerationProviderMetadata ?? {}).length > 0 || Object.keys(manifest.musicGenerationProviderMetadata ?? {}).length > 0 || Object.keys(manifest.mediaUnderstandingProviderMetadata ?? {}).length > 0;
	if (manifest.providers.length > 0 || manifest.providerEndpoints?.length || manifest.modelCatalog || mediaProvider) return "provider";
	const kinds = normalizeKinds(manifest.kind);
	if (kinds?.includes("memory")) return "memory";
	if (kinds?.includes("context-engine")) return "context-engine";
	if (manifest.contracts?.tools?.length || Object.keys(manifest.toolMetadata ?? {}).length > 0 || manifest.skills.length > 0) return "tool";
}
function firstPluginError(diagnostics, pluginId) {
	return diagnostics.find((diagnostic) => diagnostic.level === "error" && diagnostic.pluginId === pluginId)?.message;
}
function compareCatalogEntries(left, right) {
	const featured = Number(Boolean(right.featured)) - Number(Boolean(left.featured));
	if (featured !== 0) return featured;
	if (left.featured && right.featured) {
		const leftFeaturedAt = left.featuredAt;
		const rightFeaturedAt = right.featuredAt;
		if (leftFeaturedAt !== void 0 || rightFeaturedAt !== void 0) {
			if (leftFeaturedAt === void 0) return 1;
			if (rightFeaturedAt === void 0) return -1;
			if (leftFeaturedAt !== rightFeaturedAt) return rightFeaturedAt - leftFeaturedAt;
		}
	}
	const order = (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER);
	return order !== 0 ? order : left.name.localeCompare(right.name);
}
function resolveInstalledOfficialCatalogEntry(params) {
	if (!params.packageName) return;
	const matches = params.entries.filter((entry) => resolveCatalogPackageSourceIdentities(entry).some((identity) => identity.source === params.source && identity.packageName === params.packageName));
	return matches.length === 1 ? matches[0] : void 0;
}
function resolveOfficialCatalogIconUrl(entries, pluginId) {
	return resolveCatalogEntryIcon(entries.find((candidate) => resolveOfficialExternalPluginId(candidate) === pluginId));
}
function resolveInstalledHostedOfficialEntry(params) {
	const trustedOfficialClawHubSpec = params.installRecord ? resolveTrustedSourceLinkedOfficialClawHubSpec({
		pluginId: params.record.pluginId,
		record: params.installRecord
	}) : void 0;
	const trustedOfficialNpmSpec = params.installRecord ? resolveTrustedSourceLinkedOfficialNpmSpec({
		pluginId: params.record.pluginId,
		record: params.installRecord
	}) : void 0;
	const sourceLinkedOfficialClawHubPackage = trustedOfficialClawHubSpec ? parseClawHubPluginSpec(trustedOfficialClawHubSpec)?.name : void 0;
	const currentOfficialClawHubPackage = params.installRecord ? resolveTrustedOfficialClawHubPackageName(params.installRecord) : void 0;
	const trustedOfficialNpmPackage = trustedOfficialNpmSpec ? parseRegistryNpmSpec(trustedOfficialNpmSpec)?.name : void 0;
	const bundledPublishedEntry = params.record.origin === "bundled" ? resolveInstalledOfficialCatalogEntry({
		entries: params.bundledOfficialEntries,
		packageName: params.record.packageName,
		source: "npm"
	}) : void 0;
	const installedOfficialIdentity = sourceLinkedOfficialClawHubPackage ? {
		source: "clawhub",
		packageName: sourceLinkedOfficialClawHubPackage
	} : trustedOfficialNpmPackage ? {
		source: "npm",
		packageName: trustedOfficialNpmPackage
	} : currentOfficialClawHubPackage && (!params.record.packageName || params.record.packageName === currentOfficialClawHubPackage) ? {
		source: "clawhub",
		packageName: currentOfficialClawHubPackage
	} : bundledPublishedEntry && params.record.packageName ? {
		source: "npm",
		packageName: params.record.packageName
	} : void 0;
	const hasInstalledOfficialProvenance = Boolean(installedOfficialIdentity && (!params.record.packageName || params.record.packageName === installedOfficialIdentity.packageName));
	const bundledOfficialEntry = bundledPublishedEntry ?? resolveInstalledOfficialCatalogEntry({
		entries: params.bundledOfficialEntries,
		packageName: hasInstalledOfficialProvenance ? installedOfficialIdentity?.packageName : void 0,
		source: installedOfficialIdentity?.source ?? "clawhub"
	});
	const hostedPackageName = installedOfficialIdentity?.source === "npm" ? (bundledOfficialEntry ? resolveCatalogPackageSourceIdentities(bundledOfficialEntry) : []).find((identity) => identity.source === "clawhub")?.packageName : installedOfficialIdentity?.packageName;
	return {
		entry: resolveInstalledOfficialCatalogEntry({
			entries: params.officialEntries,
			packageName: hasInstalledOfficialProvenance ? hostedPackageName : void 0,
			source: "clawhub"
		}),
		hasPublishedIdentity: Boolean(hasInstalledOfficialProvenance && hostedPackageName)
	};
}
function resolvePluginIconUrlFromCatalogFacts(params) {
	const normalizedPluginId = params.metadata.normalizePluginId(params.pluginId);
	const record = params.metadata.index.plugins.find((candidate) => params.metadata.normalizePluginId(candidate.pluginId) === normalizedPluginId);
	const localIcon = normalizeOptionalString(params.metadata.byPluginId.get(normalizedPluginId)?.icon);
	if (!record) return resolveOfficialCatalogIconUrl(params.officialEntries, normalizedPluginId);
	const { entry: officialEntry } = resolveInstalledHostedOfficialEntry({
		record,
		installRecord: params.metadata.index.installRecords[record.pluginId],
		officialEntries: params.officialEntries,
		bundledOfficialEntries: params.bundledOfficialEntries ?? listOfficialExternalPluginCatalogEntries()
	});
	return resolveCatalogEntryIcon(officialEntry) ?? localIcon;
}
function resolveManagedPluginMetadataParams(config, env) {
	return {
		config,
		env,
		workspaceDir: resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config), env)
	};
}
/** Resolve the current manifest/catalog icon URL without accepting a caller-provided URL. */
async function resolveManagedPluginIconUrl(params) {
	const env = params.env ?? process.env;
	return resolvePluginIconUrlFromCatalogFacts({
		metadata: resolvePluginMetadataSnapshot(resolveManagedPluginMetadataParams(params.config, env)),
		officialEntries: (params.officialCatalog ?? await loadOfficialCatalog()).entries,
		bundledOfficialEntries: listOfficialExternalPluginCatalogEntries(),
		pluginId: params.pluginId
	});
}
function normalizeManagedCatalogIconUrl(value) {
	const normalized = normalizeOptionalString(value);
	if (!normalized || normalized.length > 2048) return;
	try {
		const url = new URL(normalized);
		return url.protocol === "https:" && url.hostname && !url.username && !url.password && !url.hash ? url.href : void 0;
	} catch {
		return;
	}
}
/** Resolve only URLs currently owned by a manifest or bundled presentation catalog. */
function resolveManagedSetupCatalogIconUrl(params) {
	const requested = normalizeManagedCatalogIconUrl(params.iconUrl);
	if (!requested) return;
	const env = params.env ?? process.env;
	return [...resolveManifestProviderAuthChoices({
		config: params.config,
		env,
		includeUntrustedWorkspacePlugins: false,
		includeWorkspacePlugins: false
	}).map((choice) => choice.icon), ...listRecommendedToolInstalls().map((install) => install.icon)].some((iconUrl) => normalizeManagedCatalogIconUrl(iconUrl) === requested) ? requested : void 0;
}
/** Build cold installed state merged with the hosted official catalog and bundled curation. */
async function listManagedPlugins(params) {
	const env = params.env ?? process.env;
	const metadata = resolvePluginMetadataSnapshot(resolveManagedPluginMetadataParams(params.config, env));
	const officialCatalog = params.officialCatalog ?? await loadOfficialCatalog();
	const bundledOfficialEntries = listOfficialExternalPluginCatalogEntries();
	const plugins = metadata.index.plugins.map((record) => {
		const manifest = metadata.byPluginId.get(record.pluginId);
		const localCatalog = normalizeCatalogMetadata(manifest?.catalog);
		const installRecord = metadata.index.installRecords[record.pluginId];
		const { entry: officialEntry, hasPublishedIdentity } = resolveInstalledHostedOfficialEntry({
			record,
			installRecord,
			officialEntries: officialCatalog.entries,
			bundledOfficialEntries
		});
		const hasHostedOfficialIdentity = hasPublishedIdentity;
		const officialCatalogMetadata = officialEntry ? normalizeCatalogMetadata(getOfficialExternalPluginCatalogManifest(officialEntry)?.catalog) : void 0;
		const catalog = hasHostedOfficialIdentity && officialCatalog.hostedFeaturedAuthoritative ? {
			...localCatalog,
			...officialCatalogMetadata,
			featured: officialEntry?.featured === true
		} : officialCatalogMetadata ? {
			...localCatalog,
			...officialCatalogMetadata
		} : localCatalog;
		const error = firstPluginError(metadata.diagnostics, record.pluginId);
		const kind = normalizeKinds(manifest?.kind);
		const category = derivePluginCategory(manifest);
		const removable = record.origin !== "bundled" && Boolean(metadata.index.installRecords[record.pluginId]);
		const localName = (manifest?.name && manifest.name !== record.packageName ? manifest.name : void 0) ?? manifest?.channelCatalogMeta?.label ?? record.pluginId;
		const localDescription = manifest?.description ?? manifest?.channelCatalogMeta?.blurb ?? manifest?.packageDescription;
		const hostedListingAuthoritative = hasHostedOfficialIdentity && officialCatalog.hostedFeaturedAuthoritative;
		const featuredAt = hostedListingAuthoritative && catalog?.featured === true ? normalizeFeaturedAt(officialEntry?.featuredAt) : void 0;
		const name = (hostedListingAuthoritative ? normalizeOptionalString(officialEntry?.title) : void 0) ?? localName;
		const description = (hostedListingAuthoritative ? normalizeOptionalString(officialEntry?.description) : void 0) ?? localDescription;
		return {
			id: record.pluginId,
			name,
			...record.packageName ? { packageName: record.packageName } : {},
			...description ? { description } : {},
			...record.packageVersion || manifest?.version ? { version: record.packageVersion ?? manifest?.version } : {},
			...kind ? { kind } : {},
			...record.origin ? { origin: record.origin } : {},
			installed: true,
			enabled: record.enabled,
			state: error ? "error" : record.enabled ? "enabled" : "disabled",
			...catalog?.featured !== void 0 ? { featured: catalog.featured } : {},
			...featuredAt !== void 0 ? { featuredAt } : {},
			...catalog?.order !== void 0 ? { order: catalog.order } : {},
			...resolvePluginIconUrlFromCatalogFacts({
				metadata,
				officialEntries: officialCatalog.entries,
				bundledOfficialEntries,
				pluginId: record.pluginId
			}) ? { hasIcon: true } : {},
			...error ? { error } : {},
			...category ? { category } : {},
			removable
		};
	});
	const installedIds = new Set(plugins.map((plugin) => plugin.id));
	const installedPackageNames = new Set(plugins.flatMap((plugin) => plugin.packageName ? [plugin.packageName] : []));
	const entryPackageInstalled = (entry) => resolveCatalogPackageSourceIdentities(entry).some((identity) => installedPackageNames.has(identity.packageName));
	for (const entry of officialCatalog.entries) {
		const pluginId = resolveOfficialExternalPluginId(entry);
		const manifestCatalog = normalizeCatalogMetadata(getOfficialExternalPluginCatalogManifest(entry)?.catalog);
		const catalog = manifestCatalog || typeof entry.featured === "boolean" ? {
			...manifestCatalog,
			...manifestCatalog?.featured === void 0 && typeof entry.featured === "boolean" ? { featured: entry.featured } : {}
		} : void 0;
		if (!pluginId || !catalog || installedIds.has(pluginId) || entryPackageInstalled(entry)) continue;
		const kind = normalizeKinds(entry.kind);
		const install = resolveCatalogInstallAction({
			entry,
			pluginId
		});
		const description = normalizeOptionalString(entry.description);
		const version = normalizeOptionalString(entry.version);
		const featuredAt = catalog.featured === true ? normalizeFeaturedAt(entry.featuredAt) : void 0;
		plugins.push({
			id: pluginId,
			name: resolveOfficialExternalPluginLabel(entry),
			...description ? { description } : {},
			...version ? { version } : {},
			...kind ? { kind } : {},
			origin: "official",
			installed: false,
			enabled: false,
			state: "not-installed",
			...catalog.featured !== void 0 ? { featured: catalog.featured } : {},
			...featuredAt !== void 0 ? { featuredAt } : {},
			...catalog.order !== void 0 ? { order: catalog.order } : {},
			...resolveCatalogEntryIcon(entry) ? { hasIcon: true } : {},
			...install ? { install } : {}
		});
	}
	const diagnostics = [...metadata.diagnostics];
	if (officialCatalog.error) diagnostics.push({
		level: "warn",
		message: `Official plugin catalog fallback: ${officialCatalog.error}`
	});
	return {
		plugins: plugins.toSorted(compareCatalogEntries),
		diagnostics,
		mutationAllowed: !resolveIsNixMode(env)
	};
}
function assertValidConfigSnapshot(prepared) {
	const { snapshot, writeOptions } = prepared;
	if (!snapshot.valid) throw new ManagedPluginLifecycleError("Config invalid; run `openclaw doctor --fix` before managing plugins.");
	const mutationWriteOptions = selectInstallMutationWriteOptions(writeOptions);
	const { pluginMutation } = resolveInstallConfigMutationPreflights({
		parsed: snapshot.parsed ?? {},
		snapshotPath: snapshot.path,
		writeOptions: mutationWriteOptions
	});
	if (pluginMutation.mode === "blocked") throw new ManagedPluginLifecycleError(pluginMutation.reason);
	return {
		config: snapshot.sourceConfig,
		baseHash: snapshot.hash,
		writeOptions: mutationWriteOptions
	};
}
async function readPluginMutationSnapshot(env) {
	try {
		assertConfigWriteAllowedInCurrentMode({ env });
	} catch (error) {
		throw new ManagedPluginLifecycleError(formatErrorMessage(error), { cause: error });
	}
	return assertValidConfigSnapshot(await readConfigFileSnapshotForWrite());
}
function createSilentRuntime() {
	return {
		log: () => void 0,
		error: () => void 0,
		exit: (code) => {
			throw new ManagedPluginLifecycleError(`plugin lifecycle exited with code ${code}`);
		}
	};
}
function createInstallLogger(warnings) {
	return {
		info: () => void 0,
		warn: (message) => warnings.push(message)
	};
}
function resolveOfficialEntryById(entries, pluginId) {
	return entries.find((entry) => resolveOfficialExternalPluginId(entry) === pluginId);
}
/** Explicitly declared runtime id, ignoring the entry-id fallback used for display. */
function resolveDeclaredOfficialPluginId(entry) {
	const manifest = getOfficialExternalPluginCatalogManifest(entry);
	return normalizeOptionalString(manifest?.plugin?.id) ?? normalizeOptionalString(manifest?.channel?.id) ?? normalizeOptionalString(manifest?.providers?.[0]?.id);
}
function resolveOfficialEntryByClawHubPackage(entries, packageName) {
	return [...listOfficialExternalPluginCatalogEntries(), ...entries].find((entry) => {
		return parseClawHubPluginSpec(resolveOfficialExternalPluginInstall(entry)?.clawhubSpec ?? "")?.name === packageName;
	});
}
function resolveHostedOfficialEntryByClawHubPackage(entries, packageName) {
	return entries.find((entry) => {
		return parseClawHubPluginSpec(resolveOfficialExternalPluginInstall(entry)?.clawhubSpec ?? "")?.name === packageName;
	});
}
function buildClawHubSpec(packageName, version) {
	const parsed = parseClawHubPluginSpec(`clawhub:${packageName}`);
	if (!parsed || parsed.version) throw new ManagedPluginLifecycleError(`invalid ClawHub package name: ${packageName}`);
	return `clawhub:${packageName}${version ? `@${version}` : ""}`;
}
function throwInstallFailure(result) {
	const unavailable = !result.code || result.code === CLAWHUB_INSTALL_ERROR_CODE.ARTIFACT_UNAVAILABLE || result.code === CLAWHUB_INSTALL_ERROR_CODE.ARTIFACT_DOWNLOAD_UNAVAILABLE || result.code === CLAWHUB_INSTALL_ERROR_CODE.CLAWHUB_SECURITY_UNAVAILABLE;
	throw new ManagedPluginLifecycleError(result.error, {
		kind: unavailable ? "unavailable" : "invalid-request",
		code: result.code,
		version: result.version,
		warning: result.warning,
		cause: result
	});
}
function installRecordOwnsTarget(record, targetDir) {
	return Boolean(record?.installPath && path.resolve(record.installPath) === path.resolve(targetDir));
}
async function cleanupFailedManagedPluginInstall(params) {
	let installRecords;
	try {
		installRecords = await loadInstalledPluginIndexInstallRecords({ env: params.env });
	} catch (error) {
		return [`Could not verify whether the failed plugin install was committed; retained ${params.targetDir}: ${formatErrorMessage(error)}`];
	}
	if (installRecordOwnsTarget(installRecords[params.pluginId], params.targetDir)) return [`Plugin install persistence reported an error after ${params.targetDir} was recorded; retained the managed target.`];
	const plan = planPluginUninstall({
		config: { plugins: { installs: { [params.pluginId]: params.install } } },
		pluginId: params.pluginId,
		deleteFiles: true,
		extensionsDir: params.extensionsDir
	});
	if (!plan.ok) return [`Could not plan cleanup for failed plugin install: ${plan.error}`];
	if (!plan.directoryRemoval) return [`Could not resolve a managed cleanup target for failed plugin install ${params.pluginId}.`];
	if (path.resolve(plan.directoryRemoval.target) !== path.resolve(params.targetDir)) return [`Refused cleanup for failed plugin install ${params.pluginId}: planned target does not match the newly installed target.`];
	try {
		return (await applyPluginUninstallDirectoryRemoval(plan.directoryRemoval)).warnings;
	} catch (error) {
		return [`Failed to remove the newly installed target after plugin persistence failed: ${formatErrorMessage(error)}`];
	}
}
function throwPersistenceFailureWithCleanupWarnings(error, warnings) {
	if (warnings.length === 0) throw error;
	const cleanupWarning = [...new Set(warnings)].join("\n");
	if (error instanceof ManagedPluginLifecycleError) throw new ManagedPluginLifecycleError(error.message, {
		kind: error.kind,
		code: error.code,
		version: error.version,
		warning: [error.warning, cleanupWarning].filter(Boolean).join("\n"),
		cause: error
	});
	throw new ManagedPluginLifecycleError(formatErrorMessage(error), {
		kind: "unavailable",
		warning: cleanupWarning,
		cause: error
	});
}
async function persistManagedSourceInstall(params) {
	const persist = () => persistPluginInstall({
		snapshot: params.snapshot,
		pluginId: params.pluginId,
		install: params.install,
		invalidateRuntimeCache: params.cleanupOnPersistenceFailure ? false : params.invalidateRuntimeCache,
		runtime: params.cleanupOnPersistenceFailure ? createSilentRuntime() : params.runtime,
		...params.successMessage ? { successMessage: params.successMessage } : {}
	});
	if (!params.cleanupOnPersistenceFailure) return await persist();
	try {
		return await persist();
	} catch (error) {
		return throwPersistenceFailureWithCleanupWarnings(error, await cleanupFailedManagedPluginInstall(params));
	}
}
/** Execute one resolved plugin source through the shared install-and-persist pipeline. */
async function installManagedPluginSource(params) {
	const { request } = params;
	const env = params.env ?? process.env;
	const extensionsDir = resolveDefaultPluginExtensionsDir(env);
	if (request.source === "bundled") return {
		ok: true,
		...await installBundledPluginSource({
			snapshot: params.snapshot,
			rawSpec: request.rawSpec,
			bundledSource: request.bundledSource,
			warning: request.warning,
			invalidateRuntimeCache: params.invalidateRuntimeCache,
			runtime: params.runtime
		}),
		config: params.snapshot.config
	};
	const common = {
		...params.safetyOverrides,
		config: params.snapshot.config,
		extensionsDir,
		logger: params.logger
	};
	const complete = async (installResult, completed) => {
		const result = await installResult;
		if (!result.ok) return result;
		const installed = result;
		if (completed.expectedPluginId && installed.pluginId !== completed.expectedPluginId) return {
			ok: false,
			error: `official catalog plugin id mismatch: expected ${completed.expectedPluginId}, got ${installed.pluginId}`
		};
		const targetDir = completed.targetDir ?? installed.targetDir;
		const config = await persistManagedSourceInstall({
			...params,
			env,
			snapshot: completed.snapshot ?? params.snapshot,
			pluginId: installed.pluginId,
			install: completed.install(installed),
			targetDir,
			extensionsDir,
			successMessage: completed.successMessage
		});
		return {
			...installed,
			config
		};
	};
	if (request.source === "local") {
		const installPath = request.link ? request.path : void 0;
		const linkedSnapshot = request.link ? {
			...params.snapshot,
			config: {
				...params.snapshot.config,
				plugins: {
					...params.snapshot.config.plugins,
					load: {
						...params.snapshot.config.plugins?.load,
						paths: uniqueStrings([...params.snapshot.config.plugins?.load?.paths ?? [], request.path])
					}
				}
			}
		} : params.snapshot;
		return await complete(installPluginFromPath({
			...common,
			path: request.path,
			mode: request.mode,
			...request.link ? {
				dryRun: true,
				allowSourceTypeScriptEntries: true
			} : {}
		}), {
			snapshot: linkedSnapshot,
			targetDir: installPath,
			successMessage: request.successMessage,
			install: (result) => ({
				source: request.recordSource,
				sourcePath: request.path,
				installPath: installPath ?? result.targetDir,
				version: result.version
			})
		});
	}
	if (request.source === "npm-pack") return await complete(installPluginFromNpmPackArchive({
		...common,
		archivePath: request.archivePath,
		mode: request.mode
	}), { install: (result) => ({
		source: "npm",
		spec: result.npmResolution?.resolvedSpec ?? result.manifestName ?? result.pluginId,
		sourcePath: request.archivePath,
		installPath: result.targetDir,
		...result.version ? { version: result.version } : {},
		...buildNpmResolutionFields(result.npmResolution),
		artifactKind: "npm-pack",
		artifactFormat: "tgz",
		...result.npmResolution?.integrity ? { npmIntegrity: result.npmResolution.integrity } : {},
		...result.npmResolution?.shasum ? { npmShasum: result.npmResolution.shasum } : {},
		...result.npmTarballName ? { npmTarballName: result.npmTarballName } : {}
	}) });
	if (request.source === "git") return await complete(installPluginFromGitSpec({
		...common,
		spec: request.spec,
		mode: request.mode
	}), { install: (result) => ({
		source: "git",
		spec: request.spec,
		installPath: result.targetDir,
		version: result.version,
		resolvedAt: result.git.resolvedAt,
		gitUrl: result.git.url,
		gitRef: result.git.ref,
		gitCommit: result.git.commit
	}) });
	if (request.source === "clawhub") return await complete(installPluginFromClawHub({
		...common,
		spec: request.spec,
		mode: request.mode,
		...request.expectedPluginId ? { expectedPluginId: request.expectedPluginId } : {},
		...request.expectedIntegrity ? { expectedIntegrity: request.expectedIntegrity } : {},
		...request.acknowledgeClawHubRisk ? { acknowledgeClawHubRisk: true } : {},
		...request.onClawHubRisk ? { onClawHubRisk: request.onClawHubRisk } : {}
	}), {
		expectedPluginId: request.expectedPluginId,
		install: (result) => ({
			...buildClawHubPluginInstallRecordFields(result.clawhub),
			spec: request.spec,
			installPath: result.targetDir
		})
	});
	const expectedPluginId = request.source === "official" ? request.pluginId : request.expectedPluginId;
	return await complete(installPluginFromNpmSpec({
		...common,
		spec: request.spec,
		mode: request.mode,
		...request.source === "official" || request.trustedSourceLinkedOfficialInstall ? { trustedSourceLinkedOfficialInstall: true } : {},
		...expectedPluginId ? { expectedPluginId } : {},
		...request.expectedIntegrity ? { expectedIntegrity: request.expectedIntegrity } : {}
	}), {
		expectedPluginId,
		install: (result) => ({
			source: "npm",
			spec: request.pin ? result.npmResolution?.resolvedSpec ?? request.spec : request.spec,
			installPath: result.targetDir,
			...result.version ? { version: result.version } : {},
			...buildNpmResolutionFields(result.npmResolution)
		})
	});
}
function resolveManagedClawHubInstallRequest(params) {
	const packageName = params.request.packageName.trim();
	const official = resolveOfficialEntryByClawHubPackage(params.officialEntries, packageName);
	const expectedPluginId = official ? resolveDeclaredOfficialPluginId(official) : void 0;
	const hostedOfficial = resolveHostedOfficialEntryByClawHubPackage(params.officialEntries, packageName);
	const hostedInstall = hostedOfficial ? resolveOfficialExternalPluginInstall(hostedOfficial) : void 0;
	const hostedClawHub = parseClawHubPluginSpec(hostedInstall?.clawhubSpec ?? "");
	const requestMatchesHostedCandidate = !params.request.version || params.request.version === hostedClawHub?.version;
	const version = params.request.version ?? (requestMatchesHostedCandidate ? hostedClawHub?.version : void 0);
	const expectedIntegrity = params.expectedIntegrity ?? (requestMatchesHostedCandidate ? hostedInstall?.expectedIntegrity : void 0);
	return {
		source: "clawhub",
		spec: buildClawHubSpec(packageName, version),
		...expectedPluginId ? { expectedPluginId } : {},
		...expectedIntegrity ? { expectedIntegrity } : {},
		...params.request.acknowledgeClawHubRisk ? { acknowledgeClawHubRisk: true } : {}
	};
}
function resolveManagedOfficialInstallRequest(params) {
	const entry = resolveOfficialEntryById(params.officialEntries, params.request.pluginId);
	if (!entry) throw new ManagedPluginLifecycleError(`unknown official plugin catalog entry: ${params.request.pluginId}`);
	const pluginId = resolveOfficialExternalPluginId(entry);
	const install = resolveOfficialExternalPluginInstall(entry);
	if (!pluginId || !install) throw new ManagedPluginLifecycleError(`official plugin catalog entry is not installable: ${params.request.pluginId}`);
	const clawhub = install.clawhubSpec ? parseClawHubPluginSpec(install.clawhubSpec) : void 0;
	if (clawhub) return resolveManagedClawHubInstallRequest({
		request: {
			source: "clawhub",
			packageName: clawhub.name,
			...clawhub.version ? { version: clawhub.version } : {}
		},
		officialEntries: params.officialEntries,
		...install.expectedIntegrity ? { expectedIntegrity: install.expectedIntegrity } : {}
	});
	if (!install.npmSpec) throw new ManagedPluginLifecycleError(`official plugin catalog entry has no supported install source: ${params.request.pluginId}`);
	return {
		source: "official",
		spec: install.npmSpec,
		pluginId,
		mode: "install",
		...install.expectedIntegrity ? { expectedIntegrity: install.expectedIntegrity } : {}
	};
}
/** Install a ClawHub or curated official plugin through the canonical install pipeline. */
async function installManagedPlugin(params) {
	const env = params.env ?? process.env;
	return await withPluginLifecycleLease({ env }, async () => {
		const snapshot = await readPluginMutationSnapshot(env);
		const officialCatalog = await loadOfficialCatalog();
		const warnings = [];
		const installed = await installManagedPluginSource({
			request: params.request.source === "clawhub" ? resolveManagedClawHubInstallRequest({
				request: params.request,
				officialEntries: officialCatalog.entries
			}) : resolveManagedOfficialInstallRequest({
				request: params.request,
				officialEntries: officialCatalog.entries
			}),
			snapshot,
			env,
			logger: createInstallLogger(warnings),
			cleanupOnPersistenceFailure: true
		});
		if (!installed.ok) return throwInstallFailure(installed);
		const plugin = (await listManagedPlugins({
			config: installed.config,
			env,
			officialCatalog
		})).plugins.find((entry) => entry.id === installed.pluginId);
		if (!plugin) throw new ManagedPluginLifecycleError(`installed plugin missing from refreshed registry: ${installed.pluginId}`);
		return {
			plugin,
			...warnings.length > 0 ? { warnings: [...new Set(warnings)] } : {}
		};
	});
}
/** Persist desired plugin policy while preserving allow/deny, slot, include, and hash guards. */
async function setManagedPluginEnabled(params) {
	const env = params.env ?? process.env;
	return await withPluginLifecycleLease({ env }, async () => {
		const snapshot = await readPluginMutationSnapshot(env);
		const metadata = loadPluginMetadataSnapshot(resolveManagedPluginMetadataParams(snapshot.config, env));
		const pluginId = metadata.normalizePluginId(params.pluginId.trim());
		if (!metadata.index.plugins.some((plugin) => plugin.pluginId === pluginId)) throw new ManagedPluginLifecycleError(`plugin not installed: ${params.pluginId}`);
		let next = snapshot.config;
		const warnings = [];
		let policyPluginId = pluginId;
		if (params.enabled) {
			if ((next.plugins?.allow?.length ?? 0) > 0) next = ensurePluginAllowlisted(next, pluginId);
			const enableResult = enableExplicitlySelectedPluginInConfig(next, pluginId, { updateChannelConfig: false });
			if (!enableResult.enabled) throw new ManagedPluginLifecycleError(`plugin "${pluginId}" could not be enabled (${enableResult.reason ?? "unknown reason"})`);
			next = enableResult.config;
			policyPluginId = enableResult.pluginId;
			const slotResult = applySlotSelectionForPlugin(next, pluginId);
			next = slotResult.config;
			warnings.push(...slotResult.warnings);
		} else next = setPluginEnabledInConfig(next, pluginId, false, { updateChannelConfig: false });
		const changedPaths = /* @__PURE__ */ new Set();
		collectChangedPaths(snapshot.config, next, "", changedPaths);
		await replaceConfigFile({
			nextConfig: next,
			baseHash: snapshot.baseHash,
			writeOptions: snapshot.writeOptions
		});
		await refreshPluginRegistryAfterConfigMutation({
			config: next,
			env,
			reason: "policy-changed",
			invalidateRuntimeCache: false,
			policyPluginIds: [policyPluginId],
			logger: { warn: (message) => warnings.push(message) }
		});
		const plugin = (await listManagedPlugins({
			config: next,
			env
		})).plugins.find((entry) => entry.id === pluginId);
		if (!plugin) throw new ManagedPluginLifecycleError(`updated plugin missing from refreshed registry: ${pluginId}`);
		return {
			plugin,
			changedPaths: [...changedPaths].filter(Boolean).toSorted(),
			...warnings.length > 0 ? { warnings } : {}
		};
	});
}
/** Remove an installed plugin: config references, install record, and managed files. */
async function uninstallManagedPlugin(params) {
	const env = params.env ?? process.env;
	return await withPluginLifecycleLease({ env }, async () => {
		const snapshot = await readPluginMutationSnapshot(env);
		const installRecords = await loadInstalledPluginIndexInstallRecords({ env });
		const configWithRecords = withPluginInstallRecords(snapshot.config, installRecords);
		const metadata = loadPluginMetadataSnapshot(resolveManagedPluginMetadataParams(configWithRecords, env));
		const pluginId = metadata.normalizePluginId(params.pluginId.trim());
		if (metadata.index.plugins.find((plugin) => plugin.pluginId === pluginId)?.origin === "bundled") throw new ManagedPluginLifecycleError(`bundled plugin cannot be uninstalled: ${pluginId}; disable it instead`);
		const channelIds = metadata.byPluginId.get(pluginId)?.channels;
		const extensionsDir = resolveDefaultPluginExtensionsDir(env);
		const initialPlan = planPluginUninstall({
			config: configWithRecords,
			pluginId,
			...channelIds ? { channelIds } : {},
			deleteFiles: true,
			extensionsDir
		});
		if (!initialPlan.ok) throw new ManagedPluginLifecycleError(initialPlan.error);
		let plan = initialPlan;
		let finalSnapshot = snapshot;
		let directoryResult = {
			directoryRemoved: false,
			warnings: []
		};
		if (plan.directoryRemoval) {
			await replaceConfigFile({
				nextConfig: prepareConfigForPendingPluginDirectoryRemoval(snapshot.config, pluginId),
				baseHash: snapshot.baseHash,
				writeOptions: {
					...snapshot.writeOptions,
					afterWrite: { mode: "auto" }
				}
			});
			directoryResult = await applyPluginUninstallDirectoryRemoval(plan.directoryRemoval);
			if (pluginUninstallTargetExists(plan.directoryRemoval.target)) throw new ManagedPluginLifecycleError(`Failed to remove plugin directory ${plan.directoryRemoval.target}; the plugin remains disabled and tracked so uninstall can be retried.`, { kind: "unavailable" });
			finalSnapshot = await readPluginMutationSnapshot(env);
			const refreshedPlan = planPluginUninstall({
				config: withPluginInstallRecords(finalSnapshot.config, installRecords),
				pluginId,
				...channelIds ? { channelIds } : {},
				deleteFiles: true,
				extensionsDir
			});
			if (!refreshedPlan.ok) throw new ManagedPluginLifecycleError(refreshedPlan.error);
			plan = refreshedPlan;
		}
		const nextConfig = withoutPluginInstallRecords(plan.config);
		const nextInstallRecords = removePluginInstallRecordFromRecords(installRecords, pluginId);
		await commitPluginInstallRecordsWithConfig({
			previousInstallRecords: installRecords,
			nextInstallRecords,
			nextConfig,
			baseHash: finalSnapshot.baseHash,
			writeOptions: finalSnapshot.writeOptions
		});
		const warnings = [...collectClawPluginUninstallWarnings({
			pluginId,
			installRecord: installRecords[pluginId],
			env
		}), ...directoryResult.warnings];
		await refreshPluginRegistryAfterConfigMutation({
			config: nextConfig,
			env,
			reason: "source-changed",
			installRecords: nextInstallRecords,
			invalidateRuntimeCache: false,
			logger: { warn: (message) => warnings.push(message) }
		});
		return {
			pluginId,
			removed: formatUninstallActionLabels({
				...plan.actions,
				directory: directoryResult.directoryRemoved
			}),
			...warnings.length > 0 ? { warnings: [...new Set(warnings)] } : {}
		};
	});
}
/** Normalize unexpected lifecycle failures for Gateway response adapters. */
function formatManagedPluginLifecycleError(error) {
	return formatErrorMessage(error);
}
//#endregion
export { installManagedPluginSource as a, resolveManagedSetupCatalogIconUrl as c, installManagedPlugin as i, setManagedPluginEnabled as l, clearManagedPluginOfficialCatalogCache as n, listManagedPlugins as o, formatManagedPluginLifecycleError as r, resolveManagedPluginIconUrl as s, ManagedPluginLifecycleError as t, uninstallManagedPlugin as u };
