import { i as PluginInstallRecord, r as OpenClawConfig } from "./types.openclaw-C7iFpWwX.js";
import { n as PluginManifestRegistry, r as PluginDiscoveryResult } from "./manifest-registry-D4clTLHV.js";
import { Dt as PluginRegistryParams, Pa as CreatePluginRuntimeOptions, ei as PluginLogger } from "./types-CVuq6K6F.js";
import { n as GatewayRequestHandler } from "./types-DCanIKq0.js";
//#region src/plugins/sdk-alias.d.ts
type PluginSdkResolutionPreference = "auto" | "dist" | "src";
//#endregion
//#region src/plugins/loader-types.d.ts
type ChannelPluginLoadIntent = "full" | "setup";
/** Inputs shared by runtime, snapshot, and CLI-metadata plugin loading. */
type PluginLoadOptions = {
  config?: OpenClawConfig;
  activationSourceConfig?: OpenClawConfig;
  autoEnabledReasons?: Readonly<Record<string, string[]>>;
  workspaceDir?: string;
  installRecords?: Record<string, PluginInstallRecord>; /** Resolve plugin roots and load paths against an explicit environment. */
  env?: NodeJS.ProcessEnv; /** Apply the config IO env-substitution pass to direct raw-config callers. */
  resolveRawConfigEnvVars?: boolean;
  logger?: PluginLogger;
  coreGatewayHandlers?: Record<string, GatewayRequestHandler>;
  coreGatewayMethodNames?: readonly string[];
  hostServices?: PluginRegistryParams["hostServices"];
  runtimeOptions?: CreatePluginRuntimeOptions;
  startupTrace?: {
    detail: (name: string, metrics: ReadonlyArray<readonly [string, number | string]>) => void;
  };
  pluginSdkResolution?: PluginSdkResolutionPreference;
  cache?: boolean;
  mode?: "full" | "validate";
  onlyPluginIds?: string[];
  includeSetupOnlyChannelPlugins?: boolean;
  forceSetupOnlyChannelPlugins?: boolean;
  requireSetupEntryForSetupOnlyChannelPlugins?: boolean; /** Select full runtime registration or the lightweight unconfigured-channel setup path. */
  channelPluginLoadIntent?: ChannelPluginLoadIntent; /** Prefer bundled JavaScript artifacts over source TypeScript entrypoints. */
  preferBuiltPluginArtifacts?: boolean;
  toolDiscovery?: boolean;
  activate?: boolean;
  loadModules?: boolean;
  throwOnLoadError?: boolean;
  manifestRegistry?: PluginManifestRegistry;
  discovery?: PluginDiscoveryResult;
};
//#endregion
export { PluginLoadOptions as t };