import { c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { n as isVitestRuntimeEnv } from "./test-runtime-env-DQDRzsLt.js";
import "./env-Bnf0Z-yF.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { n as resolveOpenClawPackageRootSync } from "./openclaw-root-DSkQ6e_8.js";
import { i as isPathInside } from "./path-D8zNGPJM.js";
import { i as openRootFileSync } from "./root-file-dEMp_-h5.js";
import { t as describeRootFileOpenFailure } from "./boundary-file-read-CPk48AYJ.js";
import { n as extractErrorCode, r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import "./path-guards-C3glTcy2.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { n as resolveBundledPluginsDir } from "./bundled-dir-Ble_JuKC.js";
import { c as isJavaScriptModulePath, n as getCachedPluginModuleLoader } from "./plugin-module-loader-cache-17a12qxQ.js";
import { c as normalizePluginsConfig } from "./config-state-B6-Feb6H.js";
import { r as resolveBundledPluginGeneratedPath } from "./bundled-plugin-metadata-BX5ce3W4.js";
import { n as loadPluginManifestRegistryForPluginRegistry } from "./plugin-registry-contributions-DAYph4GM.js";
import "./plugin-registry-BKsO1htA.js";
import { i as passesManifestOwnerBasePolicy } from "./manifest-owner-policy-BCiKEwXY.js";
import { t as unwrapDefaultModuleExport } from "./module-export-DsZgGIbX.js";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
//#region src/channels/plugins/module-loader.ts
/**
* Channel plugin module loader.
*
* Loads JavaScript or source plugin modules through native require or cached TS loaders.
*/
const nodeRequire = createRequire(import.meta.url);
const SOURCE_MODULE_EXTENSIONS = /* @__PURE__ */ new Set([
	".ts",
	".tsx",
	".mts",
	".cts"
]);
const jitiLoaders = /* @__PURE__ */ new Map();
function hasNativeSourceRequireHook(modulePath) {
	const extension = path.extname(modulePath).toLowerCase();
	return SOURCE_MODULE_EXTENSIONS.has(extension) && typeof nodeRequire.extensions?.[extension] === "function";
}
function isSourceModulePath$1(modulePath) {
	return SOURCE_MODULE_EXTENSIONS.has(path.extname(modulePath).toLowerCase());
}
function loadModuleWithJiti(modulePath) {
	return getCachedPluginModuleLoader({
		cache: jitiLoaders,
		modulePath,
		importerUrl: import.meta.url,
		loaderFilename: import.meta.url,
		tryNative: false,
		cacheScopeKey: "channel-plugin-module-loader"
	})(modulePath);
}
function loadModule(modulePath) {
	if (!isJavaScriptModulePath(modulePath) && !hasNativeSourceRequireHook(modulePath)) {
		if (isSourceModulePath$1(modulePath)) return loadModuleWithJiti(modulePath);
		throw new Error(`channel plugin module must be built JavaScript: ${modulePath}`);
	}
	try {
		return nodeRequire(modulePath);
	} catch (error) {
		if (isSourceModulePath$1(modulePath)) return loadModuleWithJiti(modulePath);
		throw new Error(`failed to load channel plugin module with native require: ${modulePath}`, { cause: error });
	}
}
function resolvePluginModuleCandidates(rootDir, specifier) {
	const normalizedSpecifier = specifier.replace(/\\/g, "/");
	const resolvedPath = path.resolve(rootDir, normalizedSpecifier);
	if (path.extname(resolvedPath)) return [resolvedPath];
	return [
		resolvedPath,
		`${resolvedPath}.ts`,
		`${resolvedPath}.mts`,
		`${resolvedPath}.js`,
		`${resolvedPath}.mjs`,
		`${resolvedPath}.cts`,
		`${resolvedPath}.cjs`
	];
}
/**
* Resolves a plugin-relative module specifier to an existing candidate path.
*/
function resolveExistingPluginModulePath(rootDir, specifier) {
	for (const candidate of resolvePluginModuleCandidates(rootDir, specifier)) if (fs.existsSync(candidate)) return candidate;
	return path.resolve(rootDir, specifier);
}
/**
* Loads a channel plugin module after enforcing plugin-root file boundaries.
*
* `rootDir` is always the plugin's own directory, so the containment failure is
* reported against that one root; no caller boundary override exists.
*/
function loadChannelPluginModule(params) {
	const boundaryLabel = "plugin root";
	const opened = openRootFileSync({
		absolutePath: params.modulePath,
		rootPath: params.rootDir,
		boundaryLabel,
		rejectHardlinks: false,
		skipLexicalRootCheck: true
	});
	if (!opened.ok) throw new Error(describeRootFileOpenFailure({
		failure: opened,
		subject: "plugin module path",
		boundaryLabel,
		filePath: params.modulePath
	}), { cause: opened.error });
	const safePath = opened.path;
	fs.closeSync(opened.fd);
	return loadModule(safePath);
}
//#endregion
//#region src/plugins/bundled-channel-runtime.ts
/** Loads bundled channel plugin runtime entries and setup metadata. */
function resolveBundledMetadataScope(params) {
	const overrideDir = params?.scanDir ? path.resolve(params.scanDir) : params?.rootDir ? resolveBundledPluginsDirForRoot(params.rootDir) : void 0;
	if (!overrideDir) return params?.rootDir ? { kind: "empty" } : { kind: "default" };
	if (!fs.existsSync(overrideDir)) return { kind: "empty" };
	return {
		kind: "env",
		env: {
			...process.env,
			OPENCLAW_BUNDLED_PLUGINS_DIR: overrideDir,
			...isVitestRuntimeEnv() ? { OPENCLAW_TEST_TRUST_BUNDLED_PLUGINS_DIR: "1" } : {}
		}
	};
}
function resolveBundledPluginsDirForRoot(rootDir) {
	return [
		path.join(rootDir, "extensions"),
		path.join(rootDir, "dist-runtime", "extensions"),
		path.join(rootDir, "dist", "extensions")
	].find((candidate) => fs.existsSync(candidate));
}
function toBundledChannelEntryPair(source) {
	if (!source) return null;
	return {
		source,
		built: source
	};
}
function toBundledChannelPluginMetadata(record) {
	if (record.origin !== "bundled") return null;
	const source = toBundledChannelEntryPair(record.source);
	if (!source) return null;
	const setupSource = toBundledChannelEntryPair(record.setupSource);
	return {
		dirName: path.basename(record.rootDir),
		source,
		...setupSource ? { setupSource } : {},
		manifest: {
			id: record.id,
			channels: record.channels
		},
		...record.packageManifest ? { packageManifest: record.packageManifest } : {},
		rootDir: record.rootDir
	};
}
/** Lists bundled channel plugin metadata from default or caller-provided scan roots. */
function listBundledChannelPluginMetadata(params) {
	const scope = resolveBundledMetadataScope(params);
	if (scope.kind === "empty") return [];
	return loadPluginManifestRegistryForPluginRegistry({
		env: scope.kind === "env" ? scope.env : void 0,
		includeDisabled: true
	}).plugins.flatMap((record) => toBundledChannelPluginMetadata(record) ?? []);
}
/** Resolves a generated runtime path for a bundled channel entry. */
function resolveBundledChannelGeneratedPath(rootDir, entry, pluginDirName, scanDir) {
	return resolveBundledPluginGeneratedPath(rootDir, entry, pluginDirName, scanDir);
}
//#endregion
//#region src/channels/plugins/bundled-root.ts
/**
* Bundled channel package-root resolver.
*
* Computes cache scopes for generated channel metadata across source and packaged layouts.
*/
const OPENCLAW_PACKAGE_ROOT = resolveOpenClawPackageRootSync({
	argv1: process.argv[1],
	cwd: process.cwd(),
	moduleUrl: import.meta.url.startsWith("file:") ? import.meta.url : void 0
}) ?? (import.meta.url.startsWith("file:") ? path.resolve(fileURLToPath(new URL("../../..", import.meta.url))) : process.cwd());
function derivePackageRootFromExtensionsDir(extensionsDir) {
	const parentDir = path.dirname(extensionsDir);
	const parentBase = path.basename(parentDir);
	if (parentBase === "dist" || parentBase === "dist-runtime") return path.dirname(parentDir);
	return parentDir;
}
/**
* Resolves the package/cache scope used for bundled channel plugin metadata.
*/
function resolveBundledChannelRootScope(env = process.env) {
	const bundledPluginsDir = resolveBundledPluginsDir(env);
	if (!bundledPluginsDir) return {
		packageRoot: OPENCLAW_PACKAGE_ROOT,
		cacheKey: OPENCLAW_PACKAGE_ROOT
	};
	const resolvedPluginsDir = path.resolve(bundledPluginsDir);
	return {
		packageRoot: path.basename(resolvedPluginsDir) === "extensions" ? derivePackageRootFromExtensionsDir(resolvedPluginsDir) : resolvedPluginsDir,
		cacheKey: resolvedPluginsDir,
		pluginsDir: resolvedPluginsDir
	};
}
//#endregion
//#region src/channels/plugins/meta-normalization.ts
/**
* Channel metadata normalizer.
*
* Recomputes required metadata fields while preserving optional manifest/registry fields.
*/
function stripRequiredChannelMeta(meta) {
	const { id: _ignoredId, label: _ignoredLabel, selectionLabel: _ignoredSelectionLabel, docsPath: _ignoredDocsPath, blurb: _ignoredBlurb, ...rest } = meta ?? {};
	return rest;
}
function normalizeChannelMeta(params) {
	const next = params.meta ?? void 0;
	const existing = params.existing ?? void 0;
	const label = normalizeOptionalString(next?.label) ?? normalizeOptionalString(existing?.label) ?? normalizeOptionalString(next?.selectionLabel) ?? normalizeOptionalString(existing?.selectionLabel) ?? params.id;
	const selectionLabel = normalizeOptionalString(next?.selectionLabel) ?? normalizeOptionalString(existing?.selectionLabel) ?? label;
	const docsPath = normalizeOptionalString(next?.docsPath) ?? normalizeOptionalString(existing?.docsPath) ?? `/channels/${params.id}`;
	const blurb = normalizeOptionalString(next?.blurb) ?? normalizeOptionalString(existing?.blurb) ?? "";
	return {
		...stripRequiredChannelMeta(existing),
		...stripRequiredChannelMeta(next),
		id: params.id,
		label,
		selectionLabel,
		docsPath,
		blurb
	};
}
//#endregion
//#region src/channels/plugins/bundled.ts
/**
* Bundled channel plugin loader.
*
* Loads generated bundled channel entries, setup metadata, secrets, and legacy migration hooks.
*/
const log = createSubsystemLogger("channels");
const MAX_BUNDLED_CHANNEL_LOAD_CONTEXTS = 32;
const MAX_BUNDLED_CHANNEL_BOUNDARY_ROOTS = 256;
const bundledChannelLoadContextsByRoot = /* @__PURE__ */ new Map();
const bundledChannelBoundaryRoots = /* @__PURE__ */ new Map();
const sourceBundledEntryLoaderCache = /* @__PURE__ */ new Map();
function isSourceModulePath(modulePath) {
	return /\.(?:c|m)?tsx?$/iu.test(modulePath);
}
function resolveCanonicalPathOrAbsolute(targetPath) {
	try {
		return fs.realpathSync.native(targetPath);
	} catch {
		return path.resolve(targetPath);
	}
}
function isPathInsideCanonicalRoot(rootPath, targetPath) {
	return isPathInside(resolveCanonicalPathOrAbsolute(rootPath), resolveCanonicalPathOrAbsolute(targetPath));
}
function isPackageLocalBundledDistModulePath(params) {
	return [...params.rootScope.pluginsDir ? [path.join(params.rootScope.pluginsDir, params.metadata.dirName, "dist")] : [], path.join(params.rootScope.packageRoot, "extensions", params.metadata.dirName, "dist")].some((root) => isPathInsideCanonicalRoot(root, params.modulePath));
}
function resolveBundledChannelModuleEntry(moduleExport, kind) {
	const resolved = unwrapDefaultModuleExport(moduleExport);
	if (!resolved || typeof resolved !== "object") return null;
	const record = resolved;
	const setup = kind === "setupEntry";
	if (record.kind !== (setup ? "bundled-channel-setup-entry" : "bundled-channel-entry")) return null;
	const stringFields = setup ? [] : [
		"id",
		"name",
		"description"
	];
	const functionFields = setup ? ["loadSetupPlugin"] : ["register", "loadChannelPlugin"];
	if (stringFields.some((field) => typeof record[field] !== "string") || functionFields.some((field) => typeof record[field] !== "function")) return null;
	return record;
}
function resolveBundledChannelBoundaryRoot(params) {
	const cacheKey = [
		params.packageRoot,
		params.pluginsDir ?? "",
		params.metadata.dirName,
		params.modulePath
	].join("\0");
	const cached = bundledChannelBoundaryRoots.get(cacheKey);
	if (cached) {
		bundledChannelBoundaryRoots.delete(cacheKey);
		bundledChannelBoundaryRoots.set(cacheKey, cached);
		pruneMapToMaxSize(bundledChannelBoundaryRoots, MAX_BUNDLED_CHANNEL_BOUNDARY_ROOTS);
		return cached;
	}
	const canonicalModulePath = resolveCanonicalPathOrAbsolute(params.modulePath);
	const sourceRoot = path.resolve(params.packageRoot, "extensions", params.metadata.dirName);
	const boundaryRoot = [
		...params.pluginsDir ? [path.resolve(params.pluginsDir, params.metadata.dirName)] : [],
		...["dist", "dist-runtime"].map((layout) => path.resolve(params.packageRoot, layout, "extensions", params.metadata.dirName)),
		sourceRoot
	].map(resolveCanonicalPathOrAbsolute).find((root) => isPathInside(root, canonicalModulePath)) ?? resolveCanonicalPathOrAbsolute(sourceRoot);
	bundledChannelBoundaryRoots.set(cacheKey, boundaryRoot);
	pruneMapToMaxSize(bundledChannelBoundaryRoots, MAX_BUNDLED_CHANNEL_BOUNDARY_ROOTS);
	return boundaryRoot;
}
function resolveGeneratedBundledChannelModulePath(params) {
	if (!params.entry) return null;
	const generatedPath = resolveBundledChannelGeneratedPath(params.rootScope.packageRoot, params.entry, params.metadata.dirName, params.rootScope.pluginsDir);
	if (generatedPath) return generatedPath;
	let packageRoot;
	let pluginRoot;
	try {
		packageRoot = fs.realpathSync.native(params.rootScope.packageRoot);
		pluginRoot = fs.realpathSync.native(params.metadata.rootDir);
	} catch {
		return null;
	}
	if (!isPathInside(packageRoot, pluginRoot)) return null;
	for (const rawEntry of [params.entry.built, params.entry.source]) {
		if (!rawEntry) continue;
		const candidate = path.isAbsolute(rawEntry) ? path.normalize(rawEntry) : path.resolve(pluginRoot, rawEntry);
		let realCandidate;
		try {
			realCandidate = fs.realpathSync.native(candidate);
		} catch {
			continue;
		}
		if (isPathInside(pluginRoot, realCandidate)) return realCandidate;
	}
	return null;
}
function loadGeneratedBundledChannelModule(params) {
	const modulePath = resolveGeneratedBundledChannelModulePath(params);
	if (!modulePath) throw new Error(`missing generated module for bundled channel ${params.metadata.manifest.id}`);
	const scanDir = params.rootScope.pluginsDir;
	const boundaryRoot = resolveBundledChannelBoundaryRoot({
		packageRoot: params.rootScope.packageRoot,
		...scanDir ? { pluginsDir: scanDir } : {},
		metadata: params.metadata,
		modulePath
	});
	try {
		return loadChannelPluginModule({
			modulePath,
			rootDir: boundaryRoot
		});
	} catch (error) {
		if (!(isSourceModulePath(modulePath) || isPackageLocalBundledDistModulePath({
			rootScope: params.rootScope,
			metadata: params.metadata,
			modulePath
		}) && findMissingModuleCodeInChain(error) !== void 0)) throw error;
		return getCachedPluginModuleLoader({
			cache: sourceBundledEntryLoaderCache,
			modulePath,
			importerUrl: import.meta.url,
			preferBuiltDist: true,
			cacheScopeKey: "bundled-channel-entry"
		})(modulePath);
	}
}
function findMissingModuleCodeInChain(error) {
	const seen = /* @__PURE__ */ new Set();
	let current = error;
	while (current && !seen.has(current)) {
		seen.add(current);
		const code = extractErrorCode(current);
		if (code === "ERR_MODULE_NOT_FOUND" || code === "MODULE_NOT_FOUND") return code;
		if (typeof current !== "object") return;
		current = current.cause;
	}
}
function describeBundledChannelLoadError(error, channelId) {
	const detail = formatErrorMessage(error);
	if (findMissingModuleCodeInChain(error) !== void 0) return `${detail} (run \`openclaw doctor --fix\` to install missing bundled runtime dependencies for channel ${channelId})`;
	return detail;
}
function loadGeneratedBundledChannelEntry(kind, rootScope, metadata) {
	const setup = kind === "setupEntry";
	const source = setup ? metadata.setupSource : metadata.source;
	if (setup && !source) return;
	try {
		const entry = resolveBundledChannelModuleEntry(loadGeneratedBundledChannelModule({
			rootScope,
			metadata,
			entry: source
		}), kind);
		if (!entry) {
			const description = setup ? "setup entry" : "entry";
			const contract = setup ? "bundled-channel-setup-entry" : "bundled-channel-entry";
			log.warn(`[channels] bundled channel ${description} ${metadata.manifest.id} missing ${contract} contract; skipping`);
		}
		return entry ?? void 0;
	} catch (error) {
		const detail = describeBundledChannelLoadError(error, metadata.manifest.id);
		const description = setup ? " setup entry" : "";
		log.warn(`[channels] failed to load bundled channel${description} ${metadata.manifest.id}: ${detail}`);
		return;
	}
}
function createBundledChannelLoadContext() {
	return {
		artifactLoadsInProgress: /* @__PURE__ */ new Set(),
		artifactsById: /* @__PURE__ */ new Map(),
		metadataById: /* @__PURE__ */ new Map(),
		metadataLoaded: false
	};
}
function resolveActiveBundledChannelLoadScope(env = process.env) {
	const rootScope = resolveBundledChannelRootScope(env);
	const loadContext = bundledChannelLoadContextsByRoot.get(rootScope.cacheKey) ?? createBundledChannelLoadContext();
	bundledChannelLoadContextsByRoot.delete(rootScope.cacheKey);
	bundledChannelLoadContextsByRoot.set(rootScope.cacheKey, loadContext);
	pruneMapToMaxSize(bundledChannelLoadContextsByRoot, MAX_BUNDLED_CHANNEL_LOAD_CONTEXTS);
	return {
		rootScope,
		loadContext
	};
}
function listBundledChannelMetadata(rootScope = resolveBundledChannelRootScope()) {
	const scanDir = rootScope.pluginsDir;
	return listBundledChannelPluginMetadata({
		rootDir: rootScope.packageRoot,
		...scanDir ? { scanDir } : {},
		includeChannelConfigs: false,
		includeSyntheticChannelConfigs: false
	}).filter((metadata) => (metadata.manifest.channels?.length ?? 0) > 0);
}
function listBundledChannelPluginIdsForRoot(rootScope) {
	return listBundledChannelMetadata(rootScope).map((metadata) => metadata.manifest.id).toSorted((left, right) => left.localeCompare(right));
}
function shouldIncludeBundledChannelSetupFeatureForConfig(params) {
	if (!params.config) return true;
	const pluginId = params.metadata.manifest.id;
	if (!passesManifestOwnerBasePolicy({
		plugin: { id: pluginId },
		normalizedConfig: normalizePluginsConfig(params.config.plugins),
		allowRestrictiveAllowlistBypass: true
	})) return false;
	let hasExplicitChannelDisable = false;
	for (const channelId of params.metadata.manifest.channels ?? [pluginId]) {
		const normalizedChannelId = normalizeOptionalLowercaseString(channelId);
		if (!normalizedChannelId) continue;
		const channelConfig = params.config.channels?.[normalizedChannelId];
		if (!channelConfig || typeof channelConfig !== "object" || Array.isArray(channelConfig)) continue;
		if (channelConfig.enabled === false) {
			hasExplicitChannelDisable = true;
			continue;
		}
		return true;
	}
	return !hasExplicitChannelDisable;
}
function listBundledChannelPluginIdsForSetupFeature(rootScope, feature, options = {}) {
	const eligible = listBundledChannelMetadata(rootScope).filter((metadata) => shouldIncludeBundledChannelSetupFeatureForConfig({
		metadata,
		config: options.config
	}));
	const hinted = eligible.filter((metadata) => metadata.packageManifest?.setupFeatures?.[feature] === true);
	return (hinted.length > 0 ? hinted : eligible).map((metadata) => metadata.manifest.id).toSorted((left, right) => left.localeCompare(right));
}
function hasBundledChannelPackageSetupFeature(id, feature) {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope();
	return resolveBundledChannelMetadata(id, rootScope, loadContext)?.packageManifest?.setupFeatures?.[feature] === true;
}
function resolveBundledChannelMetadata(id, rootScope, loadContext) {
	if (loadContext.metadataById.has(id)) return loadContext.metadataById.get(id) ?? void 0;
	if (loadContext.metadataLoaded) {
		loadContext.metadataById.set(id, null);
		return;
	}
	for (const metadata of listBundledChannelMetadata(rootScope)) {
		const ids = /* @__PURE__ */ new Set([metadata.manifest.id, ...metadata.manifest.channels ?? []]);
		for (const metadataId of ids) loadContext.metadataById.set(metadataId, metadata);
	}
	loadContext.metadataLoaded = true;
	const metadata = loadContext.metadataById.get(id);
	if (metadata) return metadata;
	loadContext.metadataById.set(id, null);
}
function rememberBundledChannelArtifact(loadContext, kind, id, artifact) {
	const artifacts = loadContext.artifactsById.get(id) ?? {};
	artifacts[kind] = artifact ?? null;
	loadContext.artifactsById.set(id, artifacts);
}
function getBundledChannelArtifactForRoot(kind, id, rootScope, loadContext) {
	const artifacts = loadContext.artifactsById.get(id);
	if (artifacts && Object.hasOwn(artifacts, kind)) return artifacts[kind] ?? void 0;
	const loadKey = `${kind}\0${id}`;
	if (loadContext.artifactLoadsInProgress.has(loadKey)) return;
	loadContext.artifactLoadsInProgress.add(loadKey);
	try {
		const artifact = bundledChannelArtifactLoaders[kind]({
			id,
			rootScope,
			loadContext
		});
		rememberBundledChannelArtifact(loadContext, kind, id, artifact);
		return artifact;
	} catch (error) {
		if (kind === "entry" || kind === "setupEntry") throw error;
		const descriptions = {
			entry: "",
			setupEntry: " setup entry",
			plugin: "",
			setupPlugin: " setup",
			secrets: " secrets",
			setupSecrets: " setup secrets",
			accountInspector: " account inspector"
		};
		const detail = describeBundledChannelLoadError(error, id);
		log.warn(`[channels] failed to load bundled channel${descriptions[kind]} ${id}: ${detail}`);
		rememberBundledChannelArtifact(loadContext, kind, id, void 0);
		return;
	} finally {
		loadContext.artifactLoadsInProgress.delete(loadKey);
	}
}
const bundledChannelArtifactLoaders = {
	entry({ id, rootScope, loadContext }) {
		const metadata = resolveBundledChannelMetadata(id, rootScope, loadContext);
		if (!metadata) return;
		const entry = loadGeneratedBundledChannelEntry("entry", rootScope, metadata);
		if (entry && entry.id !== id) rememberBundledChannelArtifact(loadContext, "entry", entry.id, entry);
		return entry;
	},
	setupEntry({ id, rootScope, loadContext }) {
		const metadata = resolveBundledChannelMetadata(id, rootScope, loadContext);
		if (!metadata) return;
		const entry = loadGeneratedBundledChannelEntry("setupEntry", rootScope, metadata);
		const aliases = /* @__PURE__ */ new Set([
			metadata.manifest.id,
			...metadata.manifest.channels ?? [],
			id
		]);
		for (const alias of aliases) rememberBundledChannelArtifact(loadContext, "setupEntry", alias, entry);
		return entry;
	},
	plugin({ id, rootScope, loadContext }) {
		const entry = getBundledChannelArtifactForRoot("entry", id, rootScope, loadContext);
		if (!entry) return;
		const metadata = resolveBundledChannelMetadata(id, rootScope, loadContext);
		const plugin = entry.loadChannelPlugin();
		return plugin ? {
			...plugin,
			meta: normalizeChannelMeta({
				id: plugin.id,
				meta: plugin.meta,
				existing: metadata?.packageManifest?.channel
			})
		} : void 0;
	},
	setupPlugin({ id, rootScope, loadContext }) {
		return getBundledChannelArtifactForRoot("setupEntry", id, rootScope, loadContext)?.loadSetupPlugin();
	},
	secrets({ id, rootScope, loadContext }) {
		const entry = getBundledChannelArtifactForRoot("entry", id, rootScope, loadContext);
		return entry ? entry.loadChannelSecrets?.() ?? getBundledChannelArtifactForRoot("plugin", id, rootScope, loadContext)?.secrets : void 0;
	},
	setupSecrets({ id, rootScope, loadContext }) {
		const entry = getBundledChannelArtifactForRoot("setupEntry", id, rootScope, loadContext);
		return entry ? entry.loadSetupSecrets?.() ?? getBundledChannelArtifactForRoot("setupPlugin", id, rootScope, loadContext)?.secrets : void 0;
	},
	accountInspector({ id, rootScope, loadContext }) {
		return getBundledChannelArtifactForRoot("entry", id, rootScope, loadContext)?.loadChannelAccountInspector?.();
	}
};
function listBundledChannelPlugins() {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope();
	return listBundledChannelPluginIdsForRoot(rootScope).flatMap((id) => {
		const plugin = getBundledChannelArtifactForRoot("plugin", id, rootScope, loadContext);
		return plugin ? [plugin] : [];
	});
}
function listBundledChannelSetupPlugins() {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope();
	return listBundledChannelPluginIdsForRoot(rootScope).flatMap((id) => {
		const plugin = getBundledChannelArtifactForRoot("setupPlugin", id, rootScope, loadContext);
		return plugin ? [plugin] : [];
	});
}
function listBundledChannelLegacyArtifacts(feature, options, loadFromEntry, loadFromPlugin) {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope();
	return listBundledChannelPluginIdsForSetupFeature(rootScope, feature, options).flatMap((id) => {
		const entry = getBundledChannelArtifactForRoot("setupEntry", id, rootScope, loadContext);
		const artifact = entry ? loadFromEntry(entry) : void 0;
		if (artifact) return [artifact];
		if (entry?.features?.[feature] !== true) return [];
		const plugin = getBundledChannelArtifactForRoot("setupPlugin", id, rootScope, loadContext);
		const fallback = plugin ? loadFromPlugin(plugin) : void 0;
		return fallback ? [fallback] : [];
	});
}
function listBundledChannelLegacySessionSurfaces(options = {}) {
	return listBundledChannelLegacyArtifacts("legacySessionSurfaces", options, (entry) => entry.loadLegacySessionSurface?.(), (plugin) => plugin.messaging);
}
function listBundledChannelLegacyStateMigrationDetectors(options = {}) {
	return listBundledChannelLegacyArtifacts("legacyStateMigrations", options, (entry) => entry.loadLegacyStateMigrationDetector?.(), (plugin) => plugin.lifecycle?.detectLegacyStateMigrations);
}
function getBundledChannelAccountInspector(id) {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope();
	return getBundledChannelArtifactForRoot("accountInspector", id, rootScope, loadContext);
}
function getBundledChannelPlugin(id) {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope();
	return getBundledChannelArtifactForRoot("plugin", id, rootScope, loadContext);
}
function getBundledChannelSecrets(id) {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope();
	return getBundledChannelArtifactForRoot("secrets", id, rootScope, loadContext);
}
function getBundledChannelSetupPlugin(id, env = process.env) {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope(env);
	return getBundledChannelArtifactForRoot("setupPlugin", id, rootScope, loadContext);
}
function getBundledChannelSetupSecrets(id, env = process.env) {
	const { rootScope, loadContext } = resolveActiveBundledChannelLoadScope(env);
	return getBundledChannelArtifactForRoot("setupSecrets", id, rootScope, loadContext);
}
//#endregion
export { getBundledChannelSetupSecrets as a, listBundledChannelLegacyStateMigrationDetectors as c, normalizeChannelMeta as d, resolveBundledChannelRootScope as f, getBundledChannelSetupPlugin as i, listBundledChannelPlugins as l, resolveExistingPluginModulePath as m, getBundledChannelPlugin as n, hasBundledChannelPackageSetupFeature as o, loadChannelPluginModule as p, getBundledChannelSecrets as r, listBundledChannelLegacySessionSurfaces as s, getBundledChannelAccountInspector as t, listBundledChannelSetupPlugins as u };
