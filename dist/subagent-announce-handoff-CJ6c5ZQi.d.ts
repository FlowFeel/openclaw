import { r as CronScheduledToolPolicy, t as Skill } from "./skill-contract-CGA9eqw_.js";
//#region src/plugins/runtime/tool-grant.d.ts
/** Owner-scoped additive plugin tools for one trusted agent run. */
type RuntimePluginToolGrant = {
  pluginId: string;
  toolNames: readonly string[];
};
//#endregion
//#region src/skills/types.d.ts
type SkillCommandDispatchSpec = {
  kind: "tool"; /** Name of the tool to invoke (AnyAgentTool.name). */
  toolName: string;
  /**
   * How to forward user-provided args to the tool.
   * - raw: forward the raw args string (no core parsing).
   */
  argMode?: "raw";
};
type SkillTelemetrySource = "bundled" | "unknown" | "workspace";
type SkillUsagePath = {
  /** Path visible to the tool runtime when it reads SKILL.md. */readPath: string; /** Canonical source SKILL.md path used as the lifecycle identity. */
  skillFile: string;
  skillName: string;
  skillSource: SkillTelemetrySource;
};
type SkillCommandSpec = {
  name: string; /** Canonical SKILL.md path for file-scoped usage accounting. */
  skillFile?: string;
  skillName: string;
  description: string; /** Whether the model can resolve this skill from its available-skills prompt. */
  modelVisible?: boolean; /** Bounded source label used for diagnostics. */
  skillSource?: SkillTelemetrySource; /** Localized descriptions for native command surfaces that support them. */
  descriptionLocalizations?: Record<string, string>; /** Optional deterministic dispatch behavior for this command. */
  dispatch?: SkillCommandDispatchSpec; /** Native prompt template used by Claude-bundle command markdown files. */
  promptTemplate?: string; /** Source markdown path for bundle-backed commands. */
  sourceFilePath?: string;
};
type SkillEligibilityContext = {
  nodeSkills?: {
    canExec: boolean;
    node?: string;
  };
  remote?: {
    platforms: string[];
    hasBin: (bin: string) => boolean;
    hasAnyBin: (bins: string[]) => boolean;
    note?: string;
  };
};
type SkillSnapshot = {
  prompt: string;
  skills: Array<{
    name: string; /** Config key can differ from the prompt-facing skill name. */
    skillKey?: string;
    primaryEnv?: string;
    requiredEnv?: string[];
  }>; /** Normalized agent-level filter used to build this snapshot; undefined means unrestricted. */
  skillFilter?: string[]; /** Sparse per-session overlay applied after the agent-level filter. */
  skillOverrides?: Record<string, boolean>; /** Effective node-exec eligibility used to select connected node-hosted skills. */
  nodeSkillsEligibility?: SkillEligibilityContext["nodeSkills"];
  resolvedSkills?: Skill[];
  version?: number;
  promptFormatVersion?: number;
};
//#endregion
//#region src/agents/scheduled-tool-policy.d.ts
/** Trusted runtime context for a scheduled run with a server-stamped tool cap. */
type ScheduledToolPolicyContext = CronScheduledToolPolicy;
//#endregion
//#region src/agents/subagent-announce-handoff.d.ts
type TrustedSubagentCompletionHandoff = {
  kind: "subagent-completion";
  sourceSessionKey: string;
  sourceSessionId?: string;
  targetSessionKey: string;
  targetSessionId: string;
  provider: string;
  model: string;
};
//#endregion
export { SkillTelemetrySource as a, SkillSnapshot as i, ScheduledToolPolicyContext as n, SkillUsagePath as o, SkillCommandSpec as r, RuntimePluginToolGrant as s, TrustedSubagentCompletionHandoff as t };