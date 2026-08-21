import { n as OpenClawConfig } from "./types.openclaw-B-6RRL7F.js";
import { g as SandboxDockerSettings } from "./types.models-Cbb-WeIa.js";
import { a as SandboxBackendId, g as SkillUsagePath, i as SandboxBackendHandle, p as SkillEligibilityContext, u as SandboxFsBridge } from "./exec-defaults-2ifWpOT3.js";

//#region src/agents/sandbox/types.docker.d.ts
type RequiredDockerConfigKeys = "image" | "containerPrefix" | "workdir" | "readOnlyRoot" | "tmpfs" | "network" | "capDrop";
type SandboxDockerConfig = Omit<SandboxDockerSettings, RequiredDockerConfigKeys> & Required<Pick<SandboxDockerSettings, RequiredDockerConfigKeys>>;
//#endregion
//#region src/agents/sandbox/types.d.ts
type SandboxToolPolicy = {
  allow?: string[];
  deny?: string[];
};
type SandboxToolPolicySource = {
  source: "agent" | "global" | "default";
  /**
   * Config key path hint for humans.
   * (Keyed agent entries use `agents.entries.*.…` form.)
   */
  key: string;
};
type SandboxToolPolicyResolved = {
  allow: string[];
  deny: string[];
  sources: {
    allow: SandboxToolPolicySource;
    deny: SandboxToolPolicySource;
  };
};
type SandboxWorkspaceAccess = "none" | "ro" | "rw";
type SandboxBrowserConfig = {
  enabled: boolean;
  image: string;
  containerPrefix: string;
  network: string;
  cdpPort: number;
  cdpSourceRange?: string;
  vncPort: number;
  noVncPort: number;
  headless: boolean;
  noVncEnabled: boolean;
  allowHostControl: boolean;
  autoStart: boolean;
  autoStartTimeoutMs: number;
  binds?: string[];
};
type SandboxPruneConfig = {
  idleHours: number;
  maxAgeDays: number;
};
type SandboxSshConfig = {
  target?: string;
  command: string;
  workspaceRoot: string;
  strictHostKeyChecking: boolean;
  updateHostKeys: boolean;
  identityFile?: string;
  certificateFile?: string;
  knownHostsFile?: string;
  identityData?: string;
  certificateData?: string;
  knownHostsData?: string;
};
type SandboxScope = "session" | "agent" | "shared";
type SandboxConfig = {
  mode: "off" | "non-main" | "all";
  backend: SandboxBackendId;
  scope: SandboxScope;
  workspaceAccess: SandboxWorkspaceAccess;
  workspaceRoot: string;
  dockerTmpfsSource: "default" | "configured";
  docker: SandboxDockerConfig;
  ssh: SandboxSshConfig;
  browser: SandboxBrowserConfig;
  tools: SandboxToolPolicy;
  prune: SandboxPruneConfig;
};
type SandboxBrowserContext = {
  bridgeUrl: string;
  noVncUrl?: string;
  containerName: string;
};
type SandboxContext = {
  enabled: boolean;
  backendId: SandboxBackendId;
  sessionKey: string;
  workspaceDir: string;
  agentWorkspaceDir: string;
  skillsWorkspaceDir?: string;
  skillsEligibility?: SkillEligibilityContext;
  skillUsagePaths?: SkillUsagePath[];
  workspaceAccess: SandboxWorkspaceAccess;
  runtimeId: string;
  runtimeLabel: string;
  containerName: string;
  containerWorkdir: string;
  docker: SandboxDockerConfig;
  tools: SandboxToolPolicy;
  browserAllowHostControl: boolean;
  browser?: SandboxBrowserContext;
  fsBridge?: SandboxFsBridge;
  backend?: SandboxBackendHandle;
};
//#endregion
//#region src/agents/sandbox/container-engine.d.ts
type SandboxContainerEngineTarget = {
  key: string;
  globalArgs: string[];
};
//#endregion
//#region src/agents/sandbox/registry.d.ts
type SandboxRegistryEntry = {
  containerName: string;
  backendId?: string;
  backendTarget?: SandboxContainerEngineTarget;
  runtimeLabel?: string;
  sessionKey: string;
  createdAtMs: number;
  lastUsedAtMs: number;
  image: string;
  configLabelKind?: string;
  configHash?: string;
};
//#endregion
//#region src/agents/sandbox/backend.types.d.ts
/** Current runtime state reported by a sandbox backend manager. */
type SandboxBackendRuntimeInfo = {
  running: boolean;
  actualConfigLabel?: string;
  configLabelMatch: boolean;
};
/** Optional lifecycle manager for an existing registered sandbox runtime. */
type SandboxBackendManager = {
  describeRuntime(params: {
    entry: SandboxRegistryEntry;
    config: OpenClawConfig;
    agentId?: string;
  }): Promise<SandboxBackendRuntimeInfo>;
  removeRuntime(params: {
    entry: SandboxRegistryEntry;
    config: OpenClawConfig;
    agentId?: string;
  }): Promise<void>;
};
/** Inputs needed to create a sandbox backend handle for one session scope. */
type CreateSandboxBackendParams = {
  sessionKey: string;
  scopeKey: string; /** Runtime IDs already registered for this backend and scope, newest first. */
  registeredRuntimeIds?: readonly string[];
  workspaceDir: string;
  agentWorkspaceDir: string;
  skillsWorkspaceDir?: string;
  cfg: SandboxConfig;
  requireCurrentConfig?: boolean;
};
/** Factory that creates a backend handle for a sandbox session. */
type SandboxBackendFactory = (params: CreateSandboxBackendParams) => Promise<SandboxBackendHandle>;
/** Resolve the runtime workdir without creating or starting the backend. */
type SandboxBackendWorkdirResolver = (params: CreateSandboxBackendParams) => string;
/** Registry input accepted for sandbox backend registration. */
type SandboxBackendRegistration = SandboxBackendFactory | {
  factory: SandboxBackendFactory;
  manager?: SandboxBackendManager;
  resolveWorkdir?: SandboxBackendWorkdirResolver;
};
//#endregion
//#region src/agents/sandbox/backend.d.ts
/** Register or replace a sandbox backend and return a restore callback. */
declare function registerSandboxBackend(id: string, registration: SandboxBackendRegistration): () => void;
/** Look up a sandbox backend factory by normalized backend id. */
declare function getSandboxBackendFactory(id: string): SandboxBackendFactory | null;
/** Look up optional lifecycle management hooks for a registered backend. */
declare function getSandboxBackendManager(id: string): SandboxBackendManager | null;
/** Look up optional backend workdir resolution that does not start the runtime. */
declare function getSandboxBackendWorkdirResolver(id: string): SandboxBackendWorkdirResolver | null;
/** Resolve a backend factory or throw the user-facing configuration error. */
declare function requireSandboxBackendFactory(id: string): SandboxBackendFactory;
//#endregion
//#region src/agents/sandbox/runtime-status.d.ts
/** Resolves sandbox mode, effective session scope, and tool policy for a session. */
declare function resolveSandboxRuntimeStatus(params: {
  cfg?: OpenClawConfig;
  sessionKey?: string;
  agentId?: string;
}): {
  agentId: string;
  sessionKey: string;
  mainSessionKey: string;
  mode: SandboxConfig["mode"];
  sandboxed: boolean;
  toolPolicy: SandboxToolPolicyResolved;
};
//#endregion
//#region src/agents/sandbox/tool-policy.d.ts
declare function isToolAllowed(policy: SandboxToolPolicy, name: string): boolean;
//#endregion
export { getSandboxBackendWorkdirResolver as a, CreateSandboxBackendParams as c, SandboxBackendRegistration as d, SandboxBackendRuntimeInfo as f, SandboxToolPolicy as g, SandboxSshConfig as h, getSandboxBackendManager as i, SandboxBackendFactory as l, SandboxContext as m, resolveSandboxRuntimeStatus as n, registerSandboxBackend as o, SandboxBackendWorkdirResolver as p, getSandboxBackendFactory as r, requireSandboxBackendFactory as s, isToolAllowed as t, SandboxBackendManager as u };