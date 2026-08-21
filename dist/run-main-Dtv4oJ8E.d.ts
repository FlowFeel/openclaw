import { i as OpenClawConfig } from "./types.openclaw-3lPuYQv-.js";
import { n as PluginManifestCommandAliasRegistry } from "./manifest-command-aliases-DOsqsy-q.js";

//#region src/cli/startup-trace.d.ts
type GatewayStartupTraceSource = "entry" | "cli.main";
type GatewayStartupTraceLineFormatter = (message: string) => string;
type StartupTraceMeasureOptions = {
  timeline?: boolean;
};
declare function createGatewayStartupTrace(argv: string[], source: GatewayStartupTraceSource): {
  enabled: boolean;
  requiresDiagnosticsConfig(): Promise<boolean>;
  configureDiagnosticsTimeline(config: OpenClawConfig): Promise<void>;
  setLineFormatter(formatter: GatewayStartupTraceLineFormatter): void;
  mark(name: string): void;
  measure<T>(name: string, run: () => T | PromiseLike<T>, options?: StartupTraceMeasureOptions): Promise<T>;
};
//#endregion
//#region src/cli/run-main-policy.d.ts
declare function rewriteUpdateFlagArgv(argv: string[]): string[];
declare function shouldEnsureCliPath(argv: string[]): boolean;
declare function shouldUseRootHelpFastPath(argv: string[], env?: NodeJS.ProcessEnv): boolean;
declare function shouldUseSetupOnboardConfigureHelpFastPath(argv: string[], env?: NodeJS.ProcessEnv): boolean;
declare function shouldHandleBareRoot(argv: string[]): boolean;
declare function shouldStartProxyForCli(argv: string[]): boolean;
declare namespace run_main_d_exports {
  export { isGatewayRunFastPathArgv, resolveMissingPluginCommandMessage, rewriteUpdateFlagArgv, runCli, shouldEnsureCliPath, shouldHandleBareRoot, shouldStartOnboardingForFreshInstall, shouldStartProxyForCli, shouldUseRootHelpFastPath, shouldUseSetupOnboardConfigureHelpFastPath };
}
declare function isGatewayRunFastPathArgv(argv: string[]): boolean;
declare function shouldStartOnboardingForFreshInstall(argv: string[]): Promise<boolean>;
declare function resolveMissingPluginCommandMessage(pluginId: string, config?: OpenClawConfig, options?: {
  registry?: PluginManifestCommandAliasRegistry;
}): string | null;
declare function runCli(argv?: string[], options?: {
  additionalStartupTrace?: ReturnType<typeof createGatewayStartupTrace>;
  retainConsoleRoutingUntilProcessExit?: boolean;
}): Promise<void>;
//#endregion
export { shouldStartOnboardingForFreshInstall as a, shouldHandleBareRoot as c, shouldUseSetupOnboardConfigureHelpFastPath as d, run_main_d_exports as i, shouldStartProxyForCli as l, resolveMissingPluginCommandMessage as n, rewriteUpdateFlagArgv as o, runCli as r, shouldEnsureCliPath as s, isGatewayRunFastPathArgv as t, shouldUseRootHelpFastPath as u };