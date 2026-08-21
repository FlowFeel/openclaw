import { Fg as BrowserProfileConfig, Pg as BrowserConfig, n as OpenClawConfig } from "./types.openclaw-_47ZKysp.js";
import { r as SsrFPolicy } from "./ssrf-82Db1HTt.js";
//#region extensions/browser/src/browser/paths.d.ts
/** Default root directory for browser upload inputs. */
declare const DEFAULT_UPLOAD_DIR: string;
//#endregion
//#region extensions/browser/src/browser/config.d.ts
/** Browser config after defaults, derived ports, and profile defaults are applied. */
type ResolvedBrowserConfig = {
  enabled: boolean;
  evaluateEnabled: boolean;
  controlPort: number;
  cdpPortRangeStart: number;
  cdpPortRangeEnd: number;
  cdpProtocol: "http" | "https";
  cdpHost: string;
  cdpIsLoopback: boolean;
  remoteCdpTimeoutMs: number;
  remoteCdpHandshakeTimeoutMs: number;
  localLaunchTimeoutMs: number;
  localCdpReadyTimeoutMs: number;
  actionTimeoutMs: number;
  color: string;
  executablePath?: string;
  headless: boolean;
  headlessSource?: "config" | "default";
  noSandbox: boolean;
  attachOnly: boolean;
  defaultProfile: string;
  profiles: Record<string, BrowserProfileConfig>;
  tabCleanup: ResolvedBrowserTabCleanupConfig;
  ssrfPolicy?: SsrFPolicy;
  extraArgs: string[]; /** Default loopback port for extension-driver relay servers. */
  extensionRelayDefaultPort: number; /** Assigned loopback relay port per extension-driver profile (no explicit cdpPort). */
  extensionRelayPorts: Record<string, number>; /** Derived bearer token for extension relay auth (absent until gateway auth exists). */
  extensionRelayToken?: string;
};
/** Normalized tab-cleanup settings for session-owned browser tabs. */
type ResolvedBrowserTabCleanupConfig = {
  enabled: boolean;
  idleMinutes: number;
  maxTabsPerSession: number;
  sweepMinutes: number;
};
/** Runtime browser profile settings resolved from global and profile config. */
type ResolvedBrowserProfile = {
  name: string;
  cdpPort: number;
  cdpUrl: string;
  cdpHost: string;
  cdpIsLoopback: boolean;
  userDataDir?: string;
  mcpCommand?: string;
  mcpArgs?: string[];
  color: string;
  driver: "openclaw" | "existing-session" | "extension";
  executablePath?: string;
  headless: boolean;
  headlessSource?: "profile" | "config" | "default";
  attachOnly: boolean;
};
/** Source that determined managed Chrome headless mode. */
type ManagedBrowserHeadlessSource = "request" | "env" | "profile" | "config" | "linux-display-fallback" | "default";
/** Resolve raw browser config into runtime browser defaults. */
declare function resolveBrowserConfig(cfg: BrowserConfig | undefined, rootConfig?: OpenClawConfig): ResolvedBrowserConfig;
/** Resolve one configured browser profile by name. */
declare function resolveProfile(resolved: ResolvedBrowserConfig, profileName: string): ResolvedBrowserProfile | null;
//#endregion
export { resolveBrowserConfig as a, ResolvedBrowserTabCleanupConfig as i, ResolvedBrowserConfig as n, resolveProfile as o, ResolvedBrowserProfile as r, DEFAULT_UPLOAD_DIR as s, ManagedBrowserHeadlessSource as t };