import { i as isPathInside } from "./path-D8zNGPJM.js";
import { _ as pathExists, r as root } from "./fs-safe-DVaClkIX.js";
import { a as getPackageManifestMetadata, o as resolvePackageExtensionEntries, r as loadPluginManifest } from "./manifest-BUOsMMgJ.js";
import { l as validateRegistryNpmSpec } from "./npm-registry-spec-CCN1EPEy.js";
import { o as resolveCompatibilityHostVersion, s as resolveRuntimeServiceVersion } from "./version-CeFj_iGk.js";
import { n as readJson } from "./json-C-CW4mQo.js";
import "./json-files-v5WP3doI.js";
import "./path-safety-DhI4mL0m.js";
import { a as loadBundleManifest, i as detectBundleManifestFormat } from "./bundle-manifest-BVamVGYB.js";
import { t as checkMinHostVersion } from "./min-host-version-BaZAbb17.js";
import { t as resolveArchiveKind } from "./archive-BeFCy_95.js";
import { i as resolveArchiveSourcePath } from "./install-source-utils-YrpMqgeA.js";
import { i as withExtractedArchiveRoot, r as resolveExistingInstallPath, t as installPackageDir } from "./install-package-dir-DP9cOOeX.js";
import { a as scanFileInstallSource, i as scanBundleInstallSource, o as scanInstalledPackageDependencyTree, s as scanPackageInstallSource } from "./install-security-scan-Rm0IC18V.js";
import { a as finalizeNpmSpecArchiveInstall, i as resolveTimedInstallModeOptions, n as resolveCanonicalInstallTarget, o as installFromNpmSpecArchiveWithInstaller, r as resolveInstallModeOptions, t as ensureInstallTargetAvailable } from "./install-target-BZCqnHwk.js";
//#region src/plugins/install.runtime.ts
/** Lazy runtime barrel for plugin installation helpers used by install flows. */
//#endregion
export { checkMinHostVersion, detectBundleManifestFormat, ensureInstallTargetAvailable, pathExists as fileExists, finalizeNpmSpecArchiveInstall, getPackageManifestMetadata, installFromNpmSpecArchiveWithInstaller, installPackageDir, isPathInside, loadBundleManifest, loadPluginManifest, readJson as readJsonFile, resolveArchiveKind, resolveArchiveSourcePath, resolveCanonicalInstallTarget, resolveCompatibilityHostVersion, resolveExistingInstallPath, resolveInstallModeOptions, resolvePackageExtensionEntries, resolveRuntimeServiceVersion, resolveTimedInstallModeOptions, root, scanBundleInstallSource, scanFileInstallSource, scanInstalledPackageDependencyTree, scanPackageInstallSource, validateRegistryNpmSpec, withExtractedArchiveRoot };
