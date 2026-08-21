import { r as ErrorShape } from "./frames-C3sy04oE.mjs";
import { o as MissingScopeErrorDetails, t as ErrorCode } from "./gateway-error-details-bvFmzL6t.mjs";
import { Static, TSchema, Type } from "typebox";

//#region packages/gateway-protocol/src/schema/agents-models-skills.d.ts
/**
 * Agent, model, skill, and tool catalog schemas.
 *
 * These contracts back dashboard selectors, agent management, model catalogs,
 * skill upload/install flows, skill workshop proposals, and effective tool
 * discovery. Keep public request/result schemas documented because they are
 * shared by gateway RPC, CLI, and UI clients.
 */
/** Model option shown in selectors and model catalog results. */
declare const GatewayAgentRuntimeSchema: Type.TObject<{
  id: Type.TString;
  fallback: Type.TOptional<Type.TUnion<[Type.TLiteral<"openclaw">, Type.TLiteral<"none">]>>;
  source: Type.TUnion<[Type.TLiteral<"env">, Type.TLiteral<"agent">, Type.TLiteral<"defaults">, Type.TLiteral<"model">, Type.TLiteral<"provider">, Type.TLiteral<"implicit">, Type.TLiteral<"session">, Type.TLiteral<"session-key">]>;
}>;
declare const ModelChoiceSchema: Type.TObject<{
  id: Type.TString;
  name: Type.TString;
  provider: Type.TString;
  alias: Type.TOptional<Type.TString>;
  available: Type.TOptional<Type.TBoolean>;
  contextWindow: Type.TOptional<Type.TInteger>;
  reasoning: Type.TOptional<Type.TBoolean>;
  supportsTools: Type.TOptional<Type.TBoolean>;
  agentRuntime: Type.TOptional<Type.TObject<{
    id: Type.TString;
    fallback: Type.TOptional<Type.TUnion<[Type.TLiteral<"openclaw">, Type.TLiteral<"none">]>>;
    source: Type.TUnion<[Type.TLiteral<"env">, Type.TLiteral<"agent">, Type.TLiteral<"defaults">, Type.TLiteral<"model">, Type.TLiteral<"provider">, Type.TLiteral<"implicit">, Type.TLiteral<"session">, Type.TLiteral<"session-key">]>;
  }>>;
  apiKeySupported: Type.TOptional<Type.TBoolean>;
  input: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"audio">, Type.TLiteral<"video">, Type.TLiteral<"document">]>>>;
}>;
/** Semantic owner of an agent roster entry. */
declare const AgentKindSchema: Type.TUnion<[Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
/** Condensed agent record returned by list APIs. */
declare const AgentSummarySchema: Type.TObject<{
  id: Type.TString;
  kind: Type.TOptional<Type.TUnion<[Type.TLiteral<"agent">, Type.TLiteral<"system">]>>;
  name: Type.TOptional<Type.TString>;
  identity: Type.TOptional<Type.TObject<{
    name: Type.TOptional<Type.TString>;
    theme: Type.TOptional<Type.TString>;
    emoji: Type.TOptional<Type.TString>;
    avatar: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>>;
  workspace: Type.TOptional<Type.TString>;
  workspaceGit: Type.TOptional<Type.TBoolean>;
  model: Type.TOptional<Type.TObject<{
    primary: Type.TOptional<Type.TString>;
    fallbacks: Type.TOptional<Type.TArray<Type.TString>>;
  }>>;
  agentRuntime: Type.TOptional<Type.TObject<{
    id: Type.TString;
    fallback: Type.TOptional<Type.TUnion<[Type.TLiteral<"openclaw">, Type.TLiteral<"none">]>>;
    source: Type.TUnion<[Type.TLiteral<"env">, Type.TLiteral<"agent">, Type.TLiteral<"defaults">, Type.TLiteral<"model">, Type.TLiteral<"provider">, Type.TLiteral<"implicit">, Type.TLiteral<"session">, Type.TLiteral<"session-key">]>;
  }>>;
  thinkingLevels: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
  }>>>;
  thinkingOptions: Type.TOptional<Type.TArray<Type.TString>>;
  thinkingDefault: Type.TOptional<Type.TString>;
}>;
/** Empty request payload for listing configured agents. */
declare const AgentsListParamsSchema: Type.TObject<{}>;
/** Agent list result including the default agent and session scoping mode. */
declare const AgentsListResultSchema: Type.TObject<{
  defaultId: Type.TString;
  mainKey: Type.TString;
  scope: Type.TUnion<[Type.TLiteral<"per-sender">, Type.TLiteral<"global">]>;
  agents: Type.TArray<Type.TObject<{
    id: Type.TString;
    kind: Type.TOptional<Type.TUnion<[Type.TLiteral<"agent">, Type.TLiteral<"system">]>>;
    name: Type.TOptional<Type.TString>;
    identity: Type.TOptional<Type.TObject<{
      name: Type.TOptional<Type.TString>;
      theme: Type.TOptional<Type.TString>;
      emoji: Type.TOptional<Type.TString>;
      avatar: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>>;
    workspace: Type.TOptional<Type.TString>;
    workspaceGit: Type.TOptional<Type.TBoolean>;
    model: Type.TOptional<Type.TObject<{
      primary: Type.TOptional<Type.TString>;
      fallbacks: Type.TOptional<Type.TArray<Type.TString>>;
    }>>;
    agentRuntime: Type.TOptional<Type.TObject<{
      id: Type.TString;
      fallback: Type.TOptional<Type.TUnion<[Type.TLiteral<"openclaw">, Type.TLiteral<"none">]>>;
      source: Type.TUnion<[Type.TLiteral<"env">, Type.TLiteral<"agent">, Type.TLiteral<"defaults">, Type.TLiteral<"model">, Type.TLiteral<"provider">, Type.TLiteral<"implicit">, Type.TLiteral<"session">, Type.TLiteral<"session-key">]>;
    }>>;
    thinkingLevels: Type.TOptional<Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
    }>>>;
    thinkingOptions: Type.TOptional<Type.TArray<Type.TString>>;
    thinkingDefault: Type.TOptional<Type.TString>;
  }>>;
}>;
/** Creates a configured agent; the server supplies an omitted workspace. */
declare const AgentsCreateParamsSchema: Type.TObject<{
  name: Type.TString;
  workspace: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  emoji: Type.TOptional<Type.TString>;
  avatar: Type.TOptional<Type.TString>;
}>;
/** Result returned after creating an agent. */
declare const AgentsCreateResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  agentId: Type.TString;
  name: Type.TString;
  workspace: Type.TString;
  model: Type.TOptional<Type.TString>;
}>;
/** Updates mutable agent identity, workspace, and model fields; null clears the model override. */
declare const AgentsUpdateParamsSchema: Type.TObject<{
  agentId: Type.TString;
  name: Type.TOptional<Type.TString>;
  workspace: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  emoji: Type.TOptional<Type.TString>;
  avatar: Type.TOptional<Type.TString>;
}>;
/** Result returned after updating an agent. */
declare const AgentsUpdateResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  agentId: Type.TString;
}>;
/** Deletes an agent and optionally its workspace/config files. */
declare const AgentsDeleteParamsSchema: Type.TObject<{
  agentId: Type.TString;
  deleteFiles: Type.TOptional<Type.TBoolean>;
}>;
/** Result returned after deleting an agent and unbinding sessions. */
declare const AgentsDeleteResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  agentId: Type.TString;
  removedBindings: Type.TInteger;
  removed: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TString;
    method: Type.TUnion<[Type.TLiteral<"trash">, Type.TLiteral<"missing">]>;
  }>>>;
  failed: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TString;
    reason: Type.TString;
  }>>>;
}>;
/** File metadata and optional content for agent-local editable files. */
declare const AgentsFileEntrySchema: Type.TObject<{
  name: Type.TString;
  path: Type.TString;
  missing: Type.TBoolean;
  expectedAbsent: Type.TOptional<Type.TBoolean>;
  size: Type.TOptional<Type.TInteger>;
  updatedAtMs: Type.TOptional<Type.TInteger>;
  content: Type.TOptional<Type.TString>;
}>;
/** Lists editable files for one agent. */
declare const AgentsFilesListParamsSchema: Type.TObject<{
  agentId: Type.TString;
}>;
/** Editable file list for an agent workspace. */
declare const AgentsFilesListResultSchema: Type.TObject<{
  agentId: Type.TString;
  workspace: Type.TString;
  files: Type.TArray<Type.TObject<{
    name: Type.TString;
    path: Type.TString;
    missing: Type.TBoolean;
    expectedAbsent: Type.TOptional<Type.TBoolean>;
    size: Type.TOptional<Type.TInteger>;
    updatedAtMs: Type.TOptional<Type.TInteger>;
    content: Type.TOptional<Type.TString>;
  }>>;
}>;
/** Reads one editable agent file by name. */
declare const AgentsFilesGetParamsSchema: Type.TObject<{
  agentId: Type.TString;
  name: Type.TString;
}>;
/** Result for reading one editable agent file. */
declare const AgentsFilesGetResultSchema: Type.TObject<{
  agentId: Type.TString;
  workspace: Type.TString;
  file: Type.TObject<{
    name: Type.TString;
    path: Type.TString;
    missing: Type.TBoolean;
    expectedAbsent: Type.TOptional<Type.TBoolean>;
    size: Type.TOptional<Type.TInteger>;
    updatedAtMs: Type.TOptional<Type.TInteger>;
    content: Type.TOptional<Type.TString>;
  }>;
}>;
/** Writes one editable agent file. */
declare const AgentsFilesSetParamsSchema: Type.TObject<{
  agentId: Type.TString;
  name: Type.TString;
  content: Type.TString;
}>;
/** Result returned after writing an editable agent file. */
declare const AgentsFilesSetResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  agentId: Type.TString;
  workspace: Type.TString;
  file: Type.TObject<{
    name: Type.TString;
    path: Type.TString;
    missing: Type.TBoolean;
    expectedAbsent: Type.TOptional<Type.TBoolean>;
    size: Type.TOptional<Type.TInteger>;
    updatedAtMs: Type.TOptional<Type.TInteger>;
    content: Type.TOptional<Type.TString>;
  }>;
}>;
/** Model catalog request with optional visibility scope. */
declare const ModelsListParamsSchema: Type.TObject<{
  includeProviderCapabilities: Type.TOptional<Type.TBoolean>;
  view: Type.TOptional<Type.TUnion<[Type.TLiteral<"default">, Type.TLiteral<"configured">, Type.TLiteral<"provider-config">, Type.TLiteral<"all">]>>;
}>;
/** Reads model-provider credential health for one configured agent. */
declare const ModelsAuthStatusParamsSchema: Type.TObject<{
  refresh: Type.TOptional<Type.TBoolean>;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Removes saved model-provider credentials from one configured agent. */
declare const ModelsAuthLogoutParamsSchema: Type.TObject<{
  provider: Type.TString;
  profileIds: Type.TOptional<Type.TArray<Type.TString>>;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Model catalog result. */
declare const ModelsListResultSchema: Type.TObject<{
  models: Type.TArray<Type.TObject<{
    id: Type.TString;
    name: Type.TString;
    provider: Type.TString;
    alias: Type.TOptional<Type.TString>;
    available: Type.TOptional<Type.TBoolean>;
    contextWindow: Type.TOptional<Type.TInteger>;
    reasoning: Type.TOptional<Type.TBoolean>;
    supportsTools: Type.TOptional<Type.TBoolean>;
    agentRuntime: Type.TOptional<Type.TObject<{
      id: Type.TString;
      fallback: Type.TOptional<Type.TUnion<[Type.TLiteral<"openclaw">, Type.TLiteral<"none">]>>;
      source: Type.TUnion<[Type.TLiteral<"env">, Type.TLiteral<"agent">, Type.TLiteral<"defaults">, Type.TLiteral<"model">, Type.TLiteral<"provider">, Type.TLiteral<"implicit">, Type.TLiteral<"session">, Type.TLiteral<"session-key">]>;
    }>>;
    apiKeySupported: Type.TOptional<Type.TBoolean>;
    input: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"audio">, Type.TLiteral<"video">, Type.TLiteral<"document">]>>>;
  }>>;
}>;
/** Runs a bounded live credential probe for one model provider. */
declare const ModelsProbeParamsSchema: Type.TObject<{
  provider: Type.TString;
  profileId: Type.TOptional<Type.TString>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const AuthProbeStatusSchema: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"auth">, Type.TLiteral<"rate_limit">, Type.TLiteral<"billing">, Type.TLiteral<"timeout">, Type.TLiteral<"format">, Type.TLiteral<"unknown">, Type.TLiteral<"no_model">]>;
/** Secret-free result for one provider credential target. */
declare const ModelsProbeTargetResultSchema: Type.TObject<{
  profileId: Type.TOptional<Type.TString>;
  label: Type.TString;
  status: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"auth">, Type.TLiteral<"rate_limit">, Type.TLiteral<"billing">, Type.TLiteral<"timeout">, Type.TLiteral<"format">, Type.TLiteral<"unknown">, Type.TLiteral<"no_model">]>;
  latencyMs: Type.TOptional<Type.TInteger>;
  error: Type.TOptional<Type.TString>;
}>;
/** Provider-level live probe rollup plus per-credential results. */
declare const ModelsProbeResultSchema: Type.TObject<{
  provider: Type.TString;
  status: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"auth">, Type.TLiteral<"rate_limit">, Type.TLiteral<"billing">, Type.TLiteral<"timeout">, Type.TLiteral<"format">, Type.TLiteral<"unknown">, Type.TLiteral<"no_model">]>;
  latencyMs: Type.TOptional<Type.TInteger>;
  error: Type.TOptional<Type.TString>;
  results: Type.TArray<Type.TObject<{
    profileId: Type.TOptional<Type.TString>;
    label: Type.TString;
    status: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"auth">, Type.TLiteral<"rate_limit">, Type.TLiteral<"billing">, Type.TLiteral<"timeout">, Type.TLiteral<"format">, Type.TLiteral<"unknown">, Type.TLiteral<"no_model">]>;
    latencyMs: Type.TOptional<Type.TInteger>;
    error: Type.TOptional<Type.TString>;
  }>>;
}>;
/** Reads installed skill status, optionally for a selected agent. */
declare const SkillsStatusParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
}>;
/** Empty request payload for listing available skill bins. */
declare const SkillsBinsParamsSchema: Type.TObject<{}>;
/** Skill bin names available to the gateway. */
declare const SkillsBinsResultSchema: Type.TObject<{
  bins: Type.TArray<Type.TString>;
}>;
/** Starts a chunked skill archive upload. */
declare const SkillsUploadBeginParamsSchema: Type.TObject<{
  kind: Type.TLiteral<"skill-archive">;
  slug: Type.TString;
  sizeBytes: Type.TInteger;
  sha256: Type.TOptional<Type.TString>;
  force: Type.TOptional<Type.TBoolean>;
  idempotencyKey: Type.TOptional<Type.TString>;
}>;
/** Uploads one base64-encoded chunk for a skill archive. */
declare const SkillsUploadChunkParamsSchema: Type.TObject<{
  uploadId: Type.TString;
  offset: Type.TInteger;
  dataBase64: Type.TString;
}>;
/** Commits a completed skill archive upload. */
declare const SkillsUploadCommitParamsSchema: Type.TObject<{
  uploadId: Type.TString;
  sha256: Type.TOptional<Type.TString>;
}>;
/** Installs a skill from legacy install id, ClawHub, or uploaded archive. */
declare const SkillsInstallParamsSchema: Type.TUnion<[Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  name: Type.TString;
  installId: Type.TString;
  dangerouslyForceUnsafeInstall: Type.TOptional<Type.TBoolean>;
  timeoutMs: Type.TOptional<Type.TInteger>;
}>, Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  source: Type.TLiteral<"clawhub">;
  slug: Type.TString;
  version: Type.TOptional<Type.TString>;
  force: Type.TOptional<Type.TBoolean>;
  acknowledgeClawHubRisk: Type.TOptional<Type.TBoolean>;
  timeoutMs: Type.TOptional<Type.TInteger>;
}>, Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  source: Type.TLiteral<"upload">;
  uploadId: Type.TString;
  slug: Type.TString;
  force: Type.TOptional<Type.TBoolean>;
  sha256: Type.TOptional<Type.TString>;
  timeoutMs: Type.TOptional<Type.TInteger>;
}>]>;
/** Updates installed skill settings or refreshes ClawHub-installed skills. */
declare const SkillsUpdateParamsSchema: Type.TUnion<[Type.TObject<{
  skillKey: Type.TString;
  enabled: Type.TOptional<Type.TBoolean>;
  apiKey: Type.TOptional<Type.TString>;
  env: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
}>, Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  source: Type.TLiteral<"clawhub">;
  slug: Type.TOptional<Type.TString>;
  all: Type.TOptional<Type.TBoolean>;
  acknowledgeClawHubRisk: Type.TOptional<Type.TBoolean>;
}>]>;
/** Searches the skill registry. */
declare const SkillsSearchParamsSchema: Type.TObject<{
  query: Type.TOptional<Type.TString>;
  limit: Type.TOptional<Type.TInteger>;
}>;
/** Ranked skill registry search results. */
declare const SkillsSearchResultSchema: Type.TObject<{
  results: Type.TArray<Type.TObject<{
    score: Type.TNumber;
    slug: Type.TString;
    displayName: Type.TString;
    summary: Type.TOptional<Type.TString>;
    version: Type.TOptional<Type.TString>;
    updatedAt: Type.TOptional<Type.TInteger>;
  }>>;
}>;
/** Reads registry detail for one skill slug. */
declare const SkillsDetailParamsSchema: Type.TObject<{
  slug: Type.TString;
}>;
/** Reads current security verdicts for configured skills. */
declare const SkillsSecurityVerdictsParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
}>;
/** Skill registry detail, latest version, metadata, and owner info. */
declare const SkillsDetailResultSchema: Type.TObject<{
  skill: Type.TUnion<[Type.TObject<{
    slug: Type.TString;
    displayName: Type.TString;
    summary: Type.TOptional<Type.TString>;
    tags: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
    channel: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    isOfficial: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TNull]>>;
    createdAt: Type.TInteger;
    updatedAt: Type.TInteger;
  }>, Type.TNull]>;
  latestVersion: Type.TOptional<Type.TUnion<[Type.TObject<{
    version: Type.TString;
    createdAt: Type.TInteger;
    changelog: Type.TOptional<Type.TString>;
  }>, Type.TNull]>>;
  metadata: Type.TOptional<Type.TUnion<[Type.TObject<{
    os: Type.TOptional<Type.TUnion<[Type.TArray<Type.TString>, Type.TNull]>>;
    systems: Type.TOptional<Type.TUnion<[Type.TArray<Type.TString>, Type.TNull]>>;
  }>, Type.TNull]>>;
  owner: Type.TOptional<Type.TUnion<[Type.TObject<{
    handle: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    displayName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    image: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    official: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TNull]>>;
    channel: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    isOfficial: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TNull]>>;
  }>, Type.TNull]>>;
}>;
/** Security verdict report for installed/requested skills. */
declare const SkillsSecurityVerdictsResultSchema: Type.TObject<{
  schema: Type.TLiteral<"openclaw.skills.security-verdicts.v1">;
  items: Type.TArray<Type.TObject<{
    registry: Type.TString;
    ok: Type.TBoolean;
    decision: Type.TString;
    reasons: Type.TArray<Type.TString>;
    requestedSlug: Type.TString;
    requestedVersion: Type.TString;
    slug: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    version: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    displayName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    publisherHandle: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    publisherDisplayName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    createdAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    checkedAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    skillUrl: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    securityAuditUrl: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    securityStatus: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    securityPassed: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TNull]>>;
    error: Type.TOptional<Type.TObject<{
      code: Type.TOptional<Type.TString>;
      message: Type.TOptional<Type.TString>;
    }>>;
  }>>;
}>;
/** Reads the rendered skill card for one installed skill. */
declare const SkillsSkillCardParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  skillKey: Type.TString;
}>;
/** Rendered skill card content and file metadata. */
declare const SkillsSkillCardResultSchema: Type.TObject<{
  schema: Type.TLiteral<"openclaw.skills.skill-card.v1">;
  skillKey: Type.TString;
  path: Type.TString;
  sizeBytes: Type.TInteger;
  content: Type.TString;
}>;
/** Latest completed evaluator run attached to a proposal record. */
declare const SkillProposalEvaluationSchema: Type.TObject<{
  id: Type.TString;
  proposedVersion: Type.TString;
  revisionHash: Type.TString;
  trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
  startedAt: Type.TString;
  completedAt: Type.TString;
  correlationId: Type.TOptional<Type.TString>;
  targetTreeSha256: Type.TOptional<Type.TString>;
  outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
    status: Type.TLiteral<"completed">;
    result: Type.TObject<{
      summary: Type.TOptional<Type.TString>;
      findings: Type.TOptional<Type.TArray<Type.TObject<{
        ruleId: Type.TString;
        severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
        message: Type.TString;
        file: Type.TOptional<Type.TString>;
        line: Type.TOptional<Type.TInteger>;
      }>>>;
      metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
      evaluatorVersion: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TString>;
      decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
      decisionReason: Type.TOptional<Type.TString>;
    }>;
    pluginId: Type.TString;
    pluginVersion: Type.TOptional<Type.TString>;
    evaluatorId: Type.TString;
  }>, Type.TObject<{
    status: Type.TLiteral<"skipped">;
    pluginId: Type.TString;
    pluginVersion: Type.TOptional<Type.TString>;
    evaluatorId: Type.TString;
  }>, Type.TObject<{
    status: Type.TLiteral<"error">;
    error: Type.TString;
    pluginId: Type.TString;
    pluginVersion: Type.TOptional<Type.TString>;
    evaluatorId: Type.TString;
  }>]>>;
}>;
/** Lists skill-workshop proposals for the selected agent scope. */
declare const SkillsProposalsListParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
}>;
/** Proposal manifest response for dashboard/workshop list views. */
declare const SkillsProposalsListResultSchema: Type.TObject<{
  schema: Type.TLiteral<"openclaw.skill-workshop.proposals-manifest.v1">;
  updatedAt: Type.TString;
  proposals: Type.TArray<Type.TObject<{
    id: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"create">, Type.TLiteral<"update">]>;
    status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"applied">, Type.TLiteral<"rejected">, Type.TLiteral<"quarantined">, Type.TLiteral<"stale">]>;
    title: Type.TString;
    description: Type.TString;
    skillName: Type.TString;
    skillKey: Type.TString;
    createdAt: Type.TString;
    updatedAt: Type.TString;
    scanState: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"clean">, Type.TLiteral<"failed">, Type.TLiteral<"quarantined">]>;
  }>>;
}>;
/** Reads a proposal record plus editable draft/support content. */
declare const SkillsProposalInspectParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  proposalId: Type.TString;
}>;
/** Full proposal inspection result used before apply/revise decisions. */
declare const SkillsProposalInspectResultSchema: Type.TObject<{
  record: Type.TObject<{
    schema: Type.TLiteral<"openclaw.skill-workshop.proposal.v1">;
    id: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"create">, Type.TLiteral<"update">]>;
    status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"applied">, Type.TLiteral<"rejected">, Type.TLiteral<"quarantined">, Type.TLiteral<"stale">]>;
    title: Type.TString;
    description: Type.TString;
    createdAt: Type.TString;
    updatedAt: Type.TString;
    createdBy: Type.TUnion<[Type.TLiteral<"skill-workshop">, Type.TLiteral<"cli">, Type.TLiteral<"gateway">]>;
    origin: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
      runId: Type.TOptional<Type.TString>;
      messageId: Type.TOptional<Type.TString>;
    }>>;
    proposedVersion: Type.TString;
    draftFile: Type.TLiteral<"PROPOSAL.md">;
    draftHash: Type.TString;
    supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
      path: Type.TString;
      sizeBytes: Type.TInteger;
      hash: Type.TString;
      targetExisted: Type.TOptional<Type.TBoolean>;
      targetContentHash: Type.TOptional<Type.TString>;
    }>>>;
    target: Type.TObject<{
      skillName: Type.TString;
      skillKey: Type.TString;
      skillDir: Type.TString;
      skillFile: Type.TString;
      source: Type.TOptional<Type.TString>;
      currentContentHash: Type.TOptional<Type.TString>;
    }>;
    scan: Type.TObject<{
      state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"clean">, Type.TLiteral<"failed">, Type.TLiteral<"quarantined">]>;
      scannedAt: Type.TString;
      critical: Type.TInteger;
      warn: Type.TInteger;
      info: Type.TInteger;
      findings: Type.TArray<Type.TObject<{
        ruleId: Type.TString;
        severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
        file: Type.TString;
        line: Type.TInteger;
        message: Type.TString;
        evidence: Type.TString;
      }>>;
    }>;
    goal: Type.TOptional<Type.TString>;
    evidence: Type.TOptional<Type.TString>;
    appliedAt: Type.TOptional<Type.TString>;
    rejectedAt: Type.TOptional<Type.TString>;
    quarantinedAt: Type.TOptional<Type.TString>;
    staleAt: Type.TOptional<Type.TString>;
    statusReason: Type.TOptional<Type.TString>;
    evaluation: Type.TOptional<Type.TObject<{
      id: Type.TString;
      proposedVersion: Type.TString;
      revisionHash: Type.TString;
      trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
      startedAt: Type.TString;
      completedAt: Type.TString;
      correlationId: Type.TOptional<Type.TString>;
      targetTreeSha256: Type.TOptional<Type.TString>;
      outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
        status: Type.TLiteral<"completed">;
        result: Type.TObject<{
          summary: Type.TOptional<Type.TString>;
          findings: Type.TOptional<Type.TArray<Type.TObject<{
            ruleId: Type.TString;
            severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
            message: Type.TString;
            file: Type.TOptional<Type.TString>;
            line: Type.TOptional<Type.TInteger>;
          }>>>;
          metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
          evaluatorVersion: Type.TOptional<Type.TString>;
          mode: Type.TOptional<Type.TString>;
          decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
          decisionReason: Type.TOptional<Type.TString>;
        }>;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>, Type.TObject<{
        status: Type.TLiteral<"skipped">;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>, Type.TObject<{
        status: Type.TLiteral<"error">;
        error: Type.TString;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>]>>;
    }>>;
  }>;
  revisionHash: Type.TOptional<Type.TString>;
  content: Type.TString;
  supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TString;
    content: Type.TString;
  }>>>;
}>;
/** Creates a proposal for a new skill. */
declare const SkillsProposalCreateParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  name: Type.TString;
  description: Type.TString;
  content: Type.TString;
  supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TString;
    content: Type.TString;
  }>>>;
  goal: Type.TOptional<Type.TString>;
  evidence: Type.TOptional<Type.TString>;
}>;
/** Creates a proposal to update an existing skill. */
declare const SkillsProposalUpdateParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  skillName: Type.TString;
  description: Type.TOptional<Type.TString>;
  content: Type.TString;
  supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TString;
    content: Type.TString;
  }>>>;
  goal: Type.TOptional<Type.TString>;
  evidence: Type.TOptional<Type.TString>;
}>;
/** Replaces draft content/support files for an existing proposal. */
declare const SkillsProposalReviseParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  proposalId: Type.TString;
  expectedRevisionHash: Type.TOptional<Type.TString>;
  correlationId: Type.TOptional<Type.TString>;
  content: Type.TOptional<Type.TString>;
  supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TString;
    content: Type.TString;
  }>>>;
  description: Type.TOptional<Type.TString>;
  goal: Type.TOptional<Type.TString>;
  evidence: Type.TOptional<Type.TString>;
}>;
/** Starts an agent turn that revises a pending proposal from natural-language instructions. */
declare const SkillsProposalRequestRevisionParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  targetAgentId: Type.TOptional<Type.TString>;
  proposalId: Type.TString;
  expectedRevisionHash: Type.TOptional<Type.TString>;
  instructions: Type.TString;
  sessionKey: Type.TString;
  sessionId: Type.TOptional<Type.TString>;
  idempotencyKey: Type.TString;
}>;
/** Chat-run acknowledgement returned after queueing a Skill Workshop revision request. */
declare const SkillsProposalRequestRevisionResultSchema: Type.TObject<{
  runId: Type.TString;
  status: Type.TUnion<[Type.TLiteral<"started">, Type.TLiteral<"in_flight">, Type.TLiteral<"ok">, Type.TLiteral<"timeout">, Type.TLiteral<"error">]>;
}>;
/** Shared approve/reject/quarantine action payload for one proposal. */
declare const SkillsProposalActionParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  proposalId: Type.TString;
  expectedRevisionHash: Type.TOptional<Type.TString>;
  correlationId: Type.TOptional<Type.TString>;
  reason: Type.TOptional<Type.TString>;
}>;
/** Runs configured proposal evaluators against the current draft. */
declare const SkillsProposalEvaluateParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  proposalId: Type.TString;
  expectedRevisionHash: Type.TOptional<Type.TString>;
  correlationId: Type.TOptional<Type.TString>;
}>;
/** Updated proposal record and completed evaluator run returned by manual evaluation. */
declare const SkillsProposalEvaluateResultSchema: Type.TObject<{
  record: Type.TObject<{
    schema: Type.TLiteral<"openclaw.skill-workshop.proposal.v1">;
    id: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"create">, Type.TLiteral<"update">]>;
    status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"applied">, Type.TLiteral<"rejected">, Type.TLiteral<"quarantined">, Type.TLiteral<"stale">]>;
    title: Type.TString;
    description: Type.TString;
    createdAt: Type.TString;
    updatedAt: Type.TString;
    createdBy: Type.TUnion<[Type.TLiteral<"skill-workshop">, Type.TLiteral<"cli">, Type.TLiteral<"gateway">]>;
    origin: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
      runId: Type.TOptional<Type.TString>;
      messageId: Type.TOptional<Type.TString>;
    }>>;
    proposedVersion: Type.TString;
    draftFile: Type.TLiteral<"PROPOSAL.md">;
    draftHash: Type.TString;
    supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
      path: Type.TString;
      sizeBytes: Type.TInteger;
      hash: Type.TString;
      targetExisted: Type.TOptional<Type.TBoolean>;
      targetContentHash: Type.TOptional<Type.TString>;
    }>>>;
    target: Type.TObject<{
      skillName: Type.TString;
      skillKey: Type.TString;
      skillDir: Type.TString;
      skillFile: Type.TString;
      source: Type.TOptional<Type.TString>;
      currentContentHash: Type.TOptional<Type.TString>;
    }>;
    scan: Type.TObject<{
      state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"clean">, Type.TLiteral<"failed">, Type.TLiteral<"quarantined">]>;
      scannedAt: Type.TString;
      critical: Type.TInteger;
      warn: Type.TInteger;
      info: Type.TInteger;
      findings: Type.TArray<Type.TObject<{
        ruleId: Type.TString;
        severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
        file: Type.TString;
        line: Type.TInteger;
        message: Type.TString;
        evidence: Type.TString;
      }>>;
    }>;
    goal: Type.TOptional<Type.TString>;
    evidence: Type.TOptional<Type.TString>;
    appliedAt: Type.TOptional<Type.TString>;
    rejectedAt: Type.TOptional<Type.TString>;
    quarantinedAt: Type.TOptional<Type.TString>;
    staleAt: Type.TOptional<Type.TString>;
    statusReason: Type.TOptional<Type.TString>;
    evaluation: Type.TOptional<Type.TObject<{
      id: Type.TString;
      proposedVersion: Type.TString;
      revisionHash: Type.TString;
      trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
      startedAt: Type.TString;
      completedAt: Type.TString;
      correlationId: Type.TOptional<Type.TString>;
      targetTreeSha256: Type.TOptional<Type.TString>;
      outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
        status: Type.TLiteral<"completed">;
        result: Type.TObject<{
          summary: Type.TOptional<Type.TString>;
          findings: Type.TOptional<Type.TArray<Type.TObject<{
            ruleId: Type.TString;
            severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
            message: Type.TString;
            file: Type.TOptional<Type.TString>;
            line: Type.TOptional<Type.TInteger>;
          }>>>;
          metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
          evaluatorVersion: Type.TOptional<Type.TString>;
          mode: Type.TOptional<Type.TString>;
          decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
          decisionReason: Type.TOptional<Type.TString>;
        }>;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>, Type.TObject<{
        status: Type.TLiteral<"skipped">;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>, Type.TObject<{
        status: Type.TLiteral<"error">;
        error: Type.TString;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>]>>;
    }>>;
  }>;
  evaluation: Type.TObject<{
    id: Type.TString;
    proposedVersion: Type.TString;
    revisionHash: Type.TString;
    trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
    startedAt: Type.TString;
    completedAt: Type.TString;
    correlationId: Type.TOptional<Type.TString>;
    targetTreeSha256: Type.TOptional<Type.TString>;
    outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
      status: Type.TLiteral<"completed">;
      result: Type.TObject<{
        summary: Type.TOptional<Type.TString>;
        findings: Type.TOptional<Type.TArray<Type.TObject<{
          ruleId: Type.TString;
          severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
          message: Type.TString;
          file: Type.TOptional<Type.TString>;
          line: Type.TOptional<Type.TInteger>;
        }>>>;
        metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
        evaluatorVersion: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TString>;
        decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
        decisionReason: Type.TOptional<Type.TString>;
      }>;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>, Type.TObject<{
      status: Type.TLiteral<"skipped">;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>, Type.TObject<{
      status: Type.TLiteral<"error">;
      error: Type.TString;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>]>>;
  }>;
}>;
/** Durable Skill Workshop lifecycle event returned for replay. */
declare const SkillProposalLifecycleEventSchema: Type.TObject<{
  sequence: Type.TInteger;
  eventId: Type.TString;
  proposalId: Type.TString;
  proposedVersion: Type.TString;
  revisionHash: Type.TString;
  type: Type.TUnion<[Type.TLiteral<"created">, Type.TLiteral<"revised">, Type.TLiteral<"evaluation_completed">, Type.TLiteral<"applied">, Type.TLiteral<"rejected">, Type.TLiteral<"quarantined">, Type.TLiteral<"stale">]>;
  occurredAt: Type.TString;
  actor: Type.TObject<{
    type: Type.TUnion<[Type.TLiteral<"agent">, Type.TLiteral<"gateway">, Type.TLiteral<"plugin">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>;
  correlationId: Type.TOptional<Type.TString>;
  payload: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean, Type.TNull]>>>;
  evaluation: Type.TOptional<Type.TObject<{
    id: Type.TString;
    proposedVersion: Type.TString;
    revisionHash: Type.TString;
    trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
    startedAt: Type.TString;
    completedAt: Type.TString;
    correlationId: Type.TOptional<Type.TString>;
    targetTreeSha256: Type.TOptional<Type.TString>;
    outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
      status: Type.TLiteral<"completed">;
      result: Type.TObject<{
        summary: Type.TOptional<Type.TString>;
        findings: Type.TOptional<Type.TArray<Type.TObject<{
          ruleId: Type.TString;
          severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
          message: Type.TString;
          file: Type.TOptional<Type.TString>;
          line: Type.TOptional<Type.TInteger>;
        }>>>;
        metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
        evaluatorVersion: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TString>;
        decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
        decisionReason: Type.TOptional<Type.TString>;
      }>;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>, Type.TObject<{
      status: Type.TLiteral<"skipped">;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>, Type.TObject<{
      status: Type.TLiteral<"error">;
      error: Type.TString;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>]>>;
  }>>;
}>;
/** Lists durable proposal lifecycle events after an optional sequence cursor. */
declare const SkillsProposalEventsListParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  proposalId: Type.TOptional<Type.TString>;
  afterSequence: Type.TOptional<Type.TInteger>;
  limit: Type.TOptional<Type.TInteger>;
}>;
/** Sequence-ordered proposal lifecycle replay page. */
declare const SkillsProposalEventsListResultSchema: Type.TObject<{
  events: Type.TArray<Type.TObject<{
    sequence: Type.TInteger;
    eventId: Type.TString;
    proposalId: Type.TString;
    proposedVersion: Type.TString;
    revisionHash: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"created">, Type.TLiteral<"revised">, Type.TLiteral<"evaluation_completed">, Type.TLiteral<"applied">, Type.TLiteral<"rejected">, Type.TLiteral<"quarantined">, Type.TLiteral<"stale">]>;
    occurredAt: Type.TString;
    actor: Type.TObject<{
      type: Type.TUnion<[Type.TLiteral<"agent">, Type.TLiteral<"gateway">, Type.TLiteral<"plugin">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>;
    correlationId: Type.TOptional<Type.TString>;
    payload: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean, Type.TNull]>>>;
    evaluation: Type.TOptional<Type.TObject<{
      id: Type.TString;
      proposedVersion: Type.TString;
      revisionHash: Type.TString;
      trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
      startedAt: Type.TString;
      completedAt: Type.TString;
      correlationId: Type.TOptional<Type.TString>;
      targetTreeSha256: Type.TOptional<Type.TString>;
      outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
        status: Type.TLiteral<"completed">;
        result: Type.TObject<{
          summary: Type.TOptional<Type.TString>;
          findings: Type.TOptional<Type.TArray<Type.TObject<{
            ruleId: Type.TString;
            severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
            message: Type.TString;
            file: Type.TOptional<Type.TString>;
            line: Type.TOptional<Type.TInteger>;
          }>>>;
          metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
          evaluatorVersion: Type.TOptional<Type.TString>;
          mode: Type.TOptional<Type.TString>;
          decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
          decisionReason: Type.TOptional<Type.TString>;
        }>;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>, Type.TObject<{
        status: Type.TLiteral<"skipped">;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>, Type.TObject<{
        status: Type.TLiteral<"error">;
        error: Type.TString;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>]>>;
    }>>;
  }>>;
  nextSequence: Type.TOptional<Type.TInteger>;
}>;
/** Result returned after applying a skill proposal to disk. */
declare const SkillsProposalApplyResultSchema: Type.TObject<{
  record: Type.TObject<{
    schema: Type.TLiteral<"openclaw.skill-workshop.proposal.v1">;
    id: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"create">, Type.TLiteral<"update">]>;
    status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"applied">, Type.TLiteral<"rejected">, Type.TLiteral<"quarantined">, Type.TLiteral<"stale">]>;
    title: Type.TString;
    description: Type.TString;
    createdAt: Type.TString;
    updatedAt: Type.TString;
    createdBy: Type.TUnion<[Type.TLiteral<"skill-workshop">, Type.TLiteral<"cli">, Type.TLiteral<"gateway">]>;
    origin: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
      runId: Type.TOptional<Type.TString>;
      messageId: Type.TOptional<Type.TString>;
    }>>;
    proposedVersion: Type.TString;
    draftFile: Type.TLiteral<"PROPOSAL.md">;
    draftHash: Type.TString;
    supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
      path: Type.TString;
      sizeBytes: Type.TInteger;
      hash: Type.TString;
      targetExisted: Type.TOptional<Type.TBoolean>;
      targetContentHash: Type.TOptional<Type.TString>;
    }>>>;
    target: Type.TObject<{
      skillName: Type.TString;
      skillKey: Type.TString;
      skillDir: Type.TString;
      skillFile: Type.TString;
      source: Type.TOptional<Type.TString>;
      currentContentHash: Type.TOptional<Type.TString>;
    }>;
    scan: Type.TObject<{
      state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"clean">, Type.TLiteral<"failed">, Type.TLiteral<"quarantined">]>;
      scannedAt: Type.TString;
      critical: Type.TInteger;
      warn: Type.TInteger;
      info: Type.TInteger;
      findings: Type.TArray<Type.TObject<{
        ruleId: Type.TString;
        severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
        file: Type.TString;
        line: Type.TInteger;
        message: Type.TString;
        evidence: Type.TString;
      }>>;
    }>;
    goal: Type.TOptional<Type.TString>;
    evidence: Type.TOptional<Type.TString>;
    appliedAt: Type.TOptional<Type.TString>;
    rejectedAt: Type.TOptional<Type.TString>;
    quarantinedAt: Type.TOptional<Type.TString>;
    staleAt: Type.TOptional<Type.TString>;
    statusReason: Type.TOptional<Type.TString>;
    evaluation: Type.TOptional<Type.TObject<{
      id: Type.TString;
      proposedVersion: Type.TString;
      revisionHash: Type.TString;
      trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
      startedAt: Type.TString;
      completedAt: Type.TString;
      correlationId: Type.TOptional<Type.TString>;
      targetTreeSha256: Type.TOptional<Type.TString>;
      outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
        status: Type.TLiteral<"completed">;
        result: Type.TObject<{
          summary: Type.TOptional<Type.TString>;
          findings: Type.TOptional<Type.TArray<Type.TObject<{
            ruleId: Type.TString;
            severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
            message: Type.TString;
            file: Type.TOptional<Type.TString>;
            line: Type.TOptional<Type.TInteger>;
          }>>>;
          metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
          evaluatorVersion: Type.TOptional<Type.TString>;
          mode: Type.TOptional<Type.TString>;
          decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
          decisionReason: Type.TOptional<Type.TString>;
        }>;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>, Type.TObject<{
        status: Type.TLiteral<"skipped">;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>, Type.TObject<{
        status: Type.TLiteral<"error">;
        error: Type.TString;
        pluginId: Type.TString;
        pluginVersion: Type.TOptional<Type.TString>;
        evaluatorId: Type.TString;
      }>]>>;
    }>>;
  }>;
  targetSkillFile: Type.TString;
}>;
/** Proposal record result returned after non-apply proposal actions. */
declare const SkillsProposalRecordResultSchema: Type.TObject<{
  schema: Type.TLiteral<"openclaw.skill-workshop.proposal.v1">;
  id: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"create">, Type.TLiteral<"update">]>;
  status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"applied">, Type.TLiteral<"rejected">, Type.TLiteral<"quarantined">, Type.TLiteral<"stale">]>;
  title: Type.TString;
  description: Type.TString;
  createdAt: Type.TString;
  updatedAt: Type.TString;
  createdBy: Type.TUnion<[Type.TLiteral<"skill-workshop">, Type.TLiteral<"cli">, Type.TLiteral<"gateway">]>;
  origin: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    messageId: Type.TOptional<Type.TString>;
  }>>;
  proposedVersion: Type.TString;
  draftFile: Type.TLiteral<"PROPOSAL.md">;
  draftHash: Type.TString;
  supportFiles: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TString;
    sizeBytes: Type.TInteger;
    hash: Type.TString;
    targetExisted: Type.TOptional<Type.TBoolean>;
    targetContentHash: Type.TOptional<Type.TString>;
  }>>>;
  target: Type.TObject<{
    skillName: Type.TString;
    skillKey: Type.TString;
    skillDir: Type.TString;
    skillFile: Type.TString;
    source: Type.TOptional<Type.TString>;
    currentContentHash: Type.TOptional<Type.TString>;
  }>;
  scan: Type.TObject<{
    state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"clean">, Type.TLiteral<"failed">, Type.TLiteral<"quarantined">]>;
    scannedAt: Type.TString;
    critical: Type.TInteger;
    warn: Type.TInteger;
    info: Type.TInteger;
    findings: Type.TArray<Type.TObject<{
      ruleId: Type.TString;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
      file: Type.TString;
      line: Type.TInteger;
      message: Type.TString;
      evidence: Type.TString;
    }>>;
  }>;
  goal: Type.TOptional<Type.TString>;
  evidence: Type.TOptional<Type.TString>;
  appliedAt: Type.TOptional<Type.TString>;
  rejectedAt: Type.TOptional<Type.TString>;
  quarantinedAt: Type.TOptional<Type.TString>;
  staleAt: Type.TOptional<Type.TString>;
  statusReason: Type.TOptional<Type.TString>;
  evaluation: Type.TOptional<Type.TObject<{
    id: Type.TString;
    proposedVersion: Type.TString;
    revisionHash: Type.TString;
    trigger: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"apply">]>;
    startedAt: Type.TString;
    completedAt: Type.TString;
    correlationId: Type.TOptional<Type.TString>;
    targetTreeSha256: Type.TOptional<Type.TString>;
    outcomes: Type.TArray<Type.TUnion<[Type.TObject<{
      status: Type.TLiteral<"completed">;
      result: Type.TObject<{
        summary: Type.TOptional<Type.TString>;
        findings: Type.TOptional<Type.TArray<Type.TObject<{
          ruleId: Type.TString;
          severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"critical">]>;
          message: Type.TString;
          file: Type.TOptional<Type.TString>;
          line: Type.TOptional<Type.TInteger>;
        }>>>;
        metrics: Type.TOptional<Type.TRecord<"^.*$", Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean]>>>;
        evaluatorVersion: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TString>;
        decision: Type.TOptional<Type.TUnion<[Type.TLiteral<"pass">, Type.TLiteral<"revise">, Type.TLiteral<"block">]>>;
        decisionReason: Type.TOptional<Type.TString>;
      }>;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>, Type.TObject<{
      status: Type.TLiteral<"skipped">;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>, Type.TObject<{
      status: Type.TLiteral<"error">;
      error: Type.TString;
      pluginId: Type.TString;
      pluginVersion: Type.TOptional<Type.TString>;
      evaluatorId: Type.TString;
    }>]>>;
  }>>;
}>;
/** Reads persisted skill lifecycle curation state. */
declare const SkillsCuratorStatusParamsSchema: Type.TObject<{}>;
declare const SkillsCuratorStatusResultSchema: Type.TObject<{
  lastAttemptAtMs: Type.TUnion<[Type.TNumber, Type.TNull]>;
  lastSuccessAtMs: Type.TUnion<[Type.TNumber, Type.TNull]>;
  lastError: Type.TUnion<[Type.TString, Type.TNull]>;
  counts: Type.TObject<{
    active: Type.TNumber;
    stale: Type.TNumber;
    archived: Type.TNumber;
  }>;
  skills: Type.TArray<Type.TObject<{
    skillFile: Type.TString;
    skillKey: Type.TString;
    skillName: Type.TString;
    state: Type.TUnion<[Type.TLiteral<"active">, Type.TLiteral<"stale">, Type.TLiteral<"archived">]>;
    pinned: Type.TBoolean;
    createdAtMs: Type.TNumber;
    stateChangedAtMs: Type.TNumber;
    lastUsedAtMs: Type.TUnion<[Type.TNumber, Type.TNull]>;
    useCount: Type.TNumber;
    archivedReason: Type.TUnion<[Type.TString, Type.TNull]>;
  }>>;
  overlaps: Type.TArray<Type.TObject<{
    left: Type.TString;
    right: Type.TString;
    score: Type.TNumber;
  }>>;
}>;
/** Pins, unpins, or explicitly restores one curated skill. */
declare const SkillsCuratorActionParamsSchema: Type.TObject<{
  skill: Type.TString;
}>;
declare const SkillsCuratorActionResultSchema: Type.TObject<{
  skillFile: Type.TString;
  skillKey: Type.TString;
  skillName: Type.TString;
  state: Type.TUnion<[Type.TLiteral<"active">, Type.TLiteral<"stale">, Type.TLiteral<"archived">]>;
  pinned: Type.TBoolean;
  createdAtMs: Type.TNumber;
  stateChangedAtMs: Type.TNumber;
  lastUsedAtMs: Type.TUnion<[Type.TNumber, Type.TNull]>;
  useCount: Type.TNumber;
  archivedReason: Type.TUnion<[Type.TString, Type.TNull]>;
}>;
/** Reads the configured tool catalog for an agent. */
declare const ToolsCatalogParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  includePlugins: Type.TOptional<Type.TBoolean>;
}>;
/** Reads the effective tool set for one session. */
declare const ToolsEffectiveParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TString;
}>;
/** Invokes one tool through the gateway tool dispatcher. */
declare const ToolsInvokeParamsSchema: Type.TObject<{
  name: Type.TString;
  args: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  sessionKey: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  confirm: Type.TOptional<Type.TBoolean>;
  idempotencyKey: Type.TOptional<Type.TString>;
  /**
   * Explicit operation-local marker for an authenticated direct operator.
   * Missing values remain delegated, and agent runtime identity wins server-side.
   */
  conversationReadOrigin: Type.TOptional<Type.TLiteral<"direct-operator">>;
}>;
/** Tool profile shown in catalog views. */
declare const ToolCatalogProfileSchema: Type.TObject<{
  id: Type.TUnion<[Type.TLiteral<"minimal">, Type.TLiteral<"coding">, Type.TLiteral<"messaging">, Type.TLiteral<"full">]>;
  label: Type.TString;
}>;
/** Tool catalog entry before session-specific filtering is applied. */
declare const ToolCatalogEntrySchema: Type.TObject<{
  id: Type.TString;
  label: Type.TString;
  description: Type.TString;
  source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">]>;
  pluginId: Type.TOptional<Type.TString>;
  optional: Type.TOptional<Type.TBoolean>;
  risk: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
  tags: Type.TOptional<Type.TArray<Type.TString>>;
  defaultProfiles: Type.TArray<Type.TUnion<[Type.TLiteral<"minimal">, Type.TLiteral<"coding">, Type.TLiteral<"messaging">, Type.TLiteral<"full">]>>;
}>;
/** Group of related catalog tools from core or a plugin. */
declare const ToolCatalogGroupSchema: Type.TObject<{
  id: Type.TString;
  label: Type.TString;
  source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">]>;
  pluginId: Type.TOptional<Type.TString>;
  tools: Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
    description: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">]>;
    pluginId: Type.TOptional<Type.TString>;
    optional: Type.TOptional<Type.TBoolean>;
    risk: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
    tags: Type.TOptional<Type.TArray<Type.TString>>;
    defaultProfiles: Type.TArray<Type.TUnion<[Type.TLiteral<"minimal">, Type.TLiteral<"coding">, Type.TLiteral<"messaging">, Type.TLiteral<"full">]>>;
  }>>;
}>;
/** Tool catalog result for agent configuration UI. */
declare const ToolsCatalogResultSchema: Type.TObject<{
  agentId: Type.TString;
  profiles: Type.TArray<Type.TObject<{
    id: Type.TUnion<[Type.TLiteral<"minimal">, Type.TLiteral<"coding">, Type.TLiteral<"messaging">, Type.TLiteral<"full">]>;
    label: Type.TString;
  }>>;
  groups: Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">]>;
    pluginId: Type.TOptional<Type.TString>;
    tools: Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
      description: Type.TString;
      source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">]>;
      pluginId: Type.TOptional<Type.TString>;
      optional: Type.TOptional<Type.TBoolean>;
      risk: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
      tags: Type.TOptional<Type.TArray<Type.TString>>;
      defaultProfiles: Type.TArray<Type.TUnion<[Type.TLiteral<"minimal">, Type.TLiteral<"coding">, Type.TLiteral<"messaging">, Type.TLiteral<"full">]>>;
    }>>;
  }>>;
}>;
/** Effective tool entry after session/profile/channel/plugin filtering. */
declare const ToolsEffectiveEntrySchema: Type.TObject<{
  id: Type.TString;
  label: Type.TString;
  description: Type.TString;
  rawDescription: Type.TString;
  source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">, Type.TLiteral<"channel">, Type.TLiteral<"mcp">]>;
  pluginId: Type.TOptional<Type.TString>;
  channelId: Type.TOptional<Type.TString>;
  mcpServer: Type.TOptional<Type.TString>;
  mcpToolName: Type.TOptional<Type.TString>;
  deniedBySession: Type.TOptional<Type.TLiteral<true>>;
  risk: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
  tags: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Effective tool group shown to runtime/session callers. */
declare const ToolsEffectiveGroupSchema: Type.TObject<{
  id: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">, Type.TLiteral<"channel">, Type.TLiteral<"mcp">]>;
  label: Type.TString;
  source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">, Type.TLiteral<"channel">, Type.TLiteral<"mcp">]>;
  tools: Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
    description: Type.TString;
    rawDescription: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">, Type.TLiteral<"channel">, Type.TLiteral<"mcp">]>;
    pluginId: Type.TOptional<Type.TString>;
    channelId: Type.TOptional<Type.TString>;
    mcpServer: Type.TOptional<Type.TString>;
    mcpToolName: Type.TOptional<Type.TString>;
    deniedBySession: Type.TOptional<Type.TLiteral<true>>;
    risk: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
    tags: Type.TOptional<Type.TArray<Type.TString>>;
  }>>;
}>;
/** Notice explaining runtime filtering such as quarantined tool schemas. */
declare const ToolsEffectiveNoticeSchema: Type.TObject<{
  id: Type.TString;
  severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">]>;
  message: Type.TString;
  servers: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Effective tool set for a session, including profile and filtering notices. */
declare const ToolsEffectiveResultSchema: Type.TObject<{
  agentId: Type.TString;
  profile: Type.TString;
  groups: Type.TArray<Type.TObject<{
    id: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">, Type.TLiteral<"channel">, Type.TLiteral<"mcp">]>;
    label: Type.TString;
    source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">, Type.TLiteral<"channel">, Type.TLiteral<"mcp">]>;
    tools: Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
      description: Type.TString;
      rawDescription: Type.TString;
      source: Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">, Type.TLiteral<"channel">, Type.TLiteral<"mcp">]>;
      pluginId: Type.TOptional<Type.TString>;
      channelId: Type.TOptional<Type.TString>;
      mcpServer: Type.TOptional<Type.TString>;
      mcpToolName: Type.TOptional<Type.TString>;
      deniedBySession: Type.TOptional<Type.TLiteral<true>>;
      risk: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
      tags: Type.TOptional<Type.TArray<Type.TString>>;
    }>>;
  }>>;
  notices: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">]>;
    message: Type.TString;
    servers: Type.TOptional<Type.TArray<Type.TString>>;
  }>>>;
}>;
/** Normalized error shape for tool invocation failures. */
declare const ToolsInvokeErrorSchema: Type.TObject<{
  code: Type.TString;
  message: Type.TString;
  details: Type.TOptional<Type.TUnknown>;
}>;
/** Tool invocation result, including approval handoff when required. */
declare const ToolsInvokeResultSchema: Type.TObject<{
  ok: Type.TBoolean;
  toolName: Type.TString;
  output: Type.TOptional<Type.TUnknown>;
  requiresApproval: Type.TOptional<Type.TBoolean>;
  approvalId: Type.TOptional<Type.TString>;
  source: Type.TOptional<Type.TUnion<[Type.TLiteral<"core">, Type.TLiteral<"plugin">, Type.TLiteral<"mcp">, Type.TLiteral<"channel">, Type.TString]>>;
  error: Type.TOptional<Type.TObject<{
    code: Type.TString;
    message: Type.TString;
    details: Type.TOptional<Type.TUnknown>;
  }>>;
}>;
type AgentKind = Static<typeof AgentKindSchema>;
type AgentSummary = Static<typeof AgentSummarySchema>;
type GatewayAgentRuntime = Static<typeof GatewayAgentRuntimeSchema>;
type AgentsFileEntry = Static<typeof AgentsFileEntrySchema>;
type AgentsCreateParams = Static<typeof AgentsCreateParamsSchema>;
type AgentsCreateResult = Static<typeof AgentsCreateResultSchema>;
type AgentsUpdateParams = Static<typeof AgentsUpdateParamsSchema>;
type AgentsUpdateResult = Static<typeof AgentsUpdateResultSchema>;
type AgentsDeleteParams = Static<typeof AgentsDeleteParamsSchema>;
type AgentsDeleteResult = Static<typeof AgentsDeleteResultSchema>;
type AgentsFilesListParams = Static<typeof AgentsFilesListParamsSchema>;
type AgentsFilesListResult = Static<typeof AgentsFilesListResultSchema>;
type AgentsFilesGetParams = Static<typeof AgentsFilesGetParamsSchema>;
type AgentsFilesGetResult = Static<typeof AgentsFilesGetResultSchema>;
type AgentsFilesSetParams = Static<typeof AgentsFilesSetParamsSchema>;
type AgentsFilesSetResult = Static<typeof AgentsFilesSetResultSchema>;
type AgentsListParams = Static<typeof AgentsListParamsSchema>;
type AgentsListResult = Static<typeof AgentsListResultSchema>;
type ModelChoice = Static<typeof ModelChoiceSchema>;
type ModelsListParams = Static<typeof ModelsListParamsSchema>;
type ModelsListResult = Static<typeof ModelsListResultSchema>;
type ModelsAuthStatusParams = Static<typeof ModelsAuthStatusParamsSchema>;
type ModelsAuthLogoutParams = Static<typeof ModelsAuthLogoutParamsSchema>;
type AuthProbeStatus = Static<typeof AuthProbeStatusSchema>;
type ModelsProbeParams = Static<typeof ModelsProbeParamsSchema>;
type ModelsProbeTargetResult = Static<typeof ModelsProbeTargetResultSchema>;
type ModelsProbeResult = Static<typeof ModelsProbeResultSchema>;
type SkillsStatusParams = Static<typeof SkillsStatusParamsSchema>;
type ToolsCatalogParams = Static<typeof ToolsCatalogParamsSchema>;
type ToolCatalogProfile = Static<typeof ToolCatalogProfileSchema>;
type ToolCatalogEntry = Static<typeof ToolCatalogEntrySchema>;
type ToolCatalogGroup = Static<typeof ToolCatalogGroupSchema>;
type ToolsCatalogResult = Static<typeof ToolsCatalogResultSchema>;
type ToolsEffectiveParams = Static<typeof ToolsEffectiveParamsSchema>;
type ToolsEffectiveEntry = Static<typeof ToolsEffectiveEntrySchema>;
type ToolsEffectiveGroup = Static<typeof ToolsEffectiveGroupSchema>;
type ToolsEffectiveNotice = Static<typeof ToolsEffectiveNoticeSchema>;
type ToolsEffectiveResult = Static<typeof ToolsEffectiveResultSchema>;
type ToolsInvokeParams = Static<typeof ToolsInvokeParamsSchema>;
type ToolsInvokeResult = Static<typeof ToolsInvokeResultSchema>;
type SkillsBinsParams = Static<typeof SkillsBinsParamsSchema>;
type SkillsBinsResult = Static<typeof SkillsBinsResultSchema>;
type SkillsSearchParams = Static<typeof SkillsSearchParamsSchema>;
type SkillsSearchResult = Static<typeof SkillsSearchResultSchema>;
type SkillsDetailParams = Static<typeof SkillsDetailParamsSchema>;
type SkillsDetailResult = Static<typeof SkillsDetailResultSchema>;
type SkillsProposalsListParams = Static<typeof SkillsProposalsListParamsSchema>;
type SkillsProposalsListResult = Static<typeof SkillsProposalsListResultSchema>;
type SkillsProposalInspectParams = Static<typeof SkillsProposalInspectParamsSchema>;
type SkillsProposalInspectResult = Static<typeof SkillsProposalInspectResultSchema>;
type SkillsProposalCreateParams = Static<typeof SkillsProposalCreateParamsSchema>;
type SkillsProposalUpdateParams = Static<typeof SkillsProposalUpdateParamsSchema>;
type SkillsProposalReviseParams = Static<typeof SkillsProposalReviseParamsSchema>;
type SkillsProposalRequestRevisionParams = Static<typeof SkillsProposalRequestRevisionParamsSchema>;
type SkillsProposalRequestRevisionResult = Static<typeof SkillsProposalRequestRevisionResultSchema>;
type SkillsProposalActionParams = Static<typeof SkillsProposalActionParamsSchema>;
type SkillProposalEvaluation = Static<typeof SkillProposalEvaluationSchema>;
type SkillsProposalEvaluateParams = Static<typeof SkillsProposalEvaluateParamsSchema>;
type SkillsProposalEvaluateResult = Static<typeof SkillsProposalEvaluateResultSchema>;
type SkillProposalLifecycleEvent = Static<typeof SkillProposalLifecycleEventSchema>;
type SkillsProposalEventsListParams = Static<typeof SkillsProposalEventsListParamsSchema>;
type SkillsProposalEventsListResult = Static<typeof SkillsProposalEventsListResultSchema>;
type SkillsProposalApplyResult = Static<typeof SkillsProposalApplyResultSchema>;
type SkillsProposalRecordResult = Static<typeof SkillsProposalRecordResultSchema>;
type SkillsCuratorStatusParams = Static<typeof SkillsCuratorStatusParamsSchema>;
type SkillsCuratorStatusResult = Static<typeof SkillsCuratorStatusResultSchema>;
type SkillsCuratorActionParams = Static<typeof SkillsCuratorActionParamsSchema>;
type SkillsCuratorActionResult = Static<typeof SkillsCuratorActionResultSchema>;
type SkillsSecurityVerdictsParams = Static<typeof SkillsSecurityVerdictsParamsSchema>;
type SkillsSecurityVerdictsResult = Static<typeof SkillsSecurityVerdictsResultSchema>;
type SkillsSkillCardParams = Static<typeof SkillsSkillCardParamsSchema>;
type SkillsSkillCardResult = Static<typeof SkillsSkillCardResultSchema>;
type SkillsUploadBeginParams = Static<typeof SkillsUploadBeginParamsSchema>;
type SkillsUploadChunkParams = Static<typeof SkillsUploadChunkParamsSchema>;
type SkillsUploadCommitParams = Static<typeof SkillsUploadCommitParamsSchema>;
type SkillsInstallParams = Static<typeof SkillsInstallParamsSchema>;
type SkillsUpdateParams = Static<typeof SkillsUpdateParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/validation-errors.d.ts
/** Normalized validation error shape exposed by every protocol validator. */
type ValidationError = {
  /** Failed schema keyword, when the validator can report one. */keyword?: string; /** JSON-pointer path to the failing data location. */
  instancePath?: string; /** JSON-pointer path to the failing schema location. */
  schemaPath?: string; /** Validator-specific keyword parameters for richer diagnostics. */
  params?: Record<string, unknown>; /** Human-readable validation message. */
  message?: string;
};
/** Convert validator errors into compact operator-facing failure text. */
declare function formatValidationErrors(errors: ValidationError[] | null | undefined): string;
//#endregion
//#region packages/gateway-protocol/src/protocol-validator.d.ts
/** Runtime validator shape shared by gateway clients and server handlers. */
type ProtocolValidator<T = unknown> = ((data: unknown) => data is T) & {
  errors: ValidationError[] | null; /** Original schema used by the validator, exposed for diagnostics/tests. */
  schema: unknown;
};
//#endregion
//#region packages/gateway-protocol/src/schema/approval-id.d.ts
/** Whether an approval id is non-empty, path-stable, and contains no unpaired UTF-16 surrogate. */
declare function isWellFormedApprovalId(value: string): boolean;
//#endregion
//#region packages/gateway-protocol/src/schema/approvals.d.ts
/** Approval owner used to select the safe presentation payload. */
declare const ApprovalKindSchema: Type.TUnion<[Type.TLiteral<"exec">, Type.TLiteral<"plugin">, Type.TLiteral<"system-agent">]>;
/** Reviewer decisions accepted by the unified approval resolver. */
declare const ApprovalDecisionSchema: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>;
/** Reviewer decisions that permit an operation to proceed. */
declare const ApprovalAllowDecisionSchema: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
/** Closed reason recorded for a terminal approval transition. */
declare const ApprovalTerminalReasonSchema: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"timeout">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">, Type.TLiteral<"storage-corrupt">]>;
/** Terminal reason accepted for an allowed approval. */
declare const ApprovalAllowedReasonSchema: Type.TUnion<[Type.TLiteral<"user">]>;
/** Terminal reasons accepted for a denied approval. */
declare const ApprovalDeniedReasonSchema: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
/** Terminal reason accepted for an expired approval. */
declare const ApprovalExpiredReasonSchema: Type.TUnion<[Type.TLiteral<"timeout">]>;
/** Terminal reasons accepted for a cancelled approval. */
declare const ApprovalCancelledReasonSchema: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
/** Reviewer-facing severity for plugin-owned approval requests. */
declare const PluginApprovalSeveritySchema: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
/** Redacted exec details safe to persist and render outside the requesting runtime. */
declare const ExecApprovalPresentationSchema: Type.TObject<{
  kind: Type.TLiteral<"exec">;
  commandText: Type.TString;
  commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
}>;
/** Plugin-supplied reviewer text safe to persist and render across surfaces. */
declare const PluginApprovalPresentationSchema: Type.TObject<{
  kind: Type.TLiteral<"plugin">;
  title: Type.TString;
  description: Type.TString;
  detail: Type.TOptional<Type.TString>;
  severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
  pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
}>;
/** Reviewer-safe OpenClaw system change. Exact operation stays host-local. */
declare const SystemAgentApprovalPresentationSchema: Type.TObject<{
  kind: Type.TLiteral<"system-agent">;
  title: Type.TString;
  description: Type.TString;
  proposalHash: Type.TString;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
}>;
/** Reviewer-safe presentation discriminated by the approval owner. */
declare const ApprovalPresentationSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"exec">;
  commandText: Type.TString;
  commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"plugin">;
  title: Type.TString;
  description: Type.TString;
  detail: Type.TOptional<Type.TString>;
  severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
  pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"system-agent">;
  title: Type.TString;
  description: Type.TString;
  proposalHash: Type.TString;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
}>]>;
/** Approval that has not yet accepted a reviewer decision. */
declare const PendingApprovalSnapshotSchema: Type.TObject<{
  status: Type.TLiteral<"pending">;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>;
/** Approval whose first recorded reviewer decision allows the operation. */
declare const AllowedApprovalSnapshotSchema: Type.TObject<{
  status: Type.TLiteral<"allowed">;
  decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
  reason: Type.TUnion<[Type.TLiteral<"user">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>;
/** Approval whose first recorded reviewer decision denies the operation. */
declare const DeniedApprovalSnapshotSchema: Type.TObject<{
  status: Type.TLiteral<"denied">;
  decision: Type.TLiteral<"deny">;
  reason: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>;
/** Approval that reached its deadline and therefore failed closed. */
declare const ExpiredApprovalSnapshotSchema: Type.TObject<{
  status: Type.TLiteral<"expired">;
  reason: Type.TUnion<[Type.TLiteral<"timeout">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>;
/** Approval cancelled by its runtime owner before a reviewer decision. */
declare const CancelledApprovalSnapshotSchema: Type.TObject<{
  status: Type.TLiteral<"cancelled">;
  reason: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>;
/** Durable approval projection returned identically to every authorized surface. */
declare const ApprovalSnapshotSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"pending">;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>, Type.TObject<{
  status: Type.TLiteral<"allowed">;
  decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
  reason: Type.TUnion<[Type.TLiteral<"user">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>, Type.TObject<{
  status: Type.TLiteral<"denied">;
  decision: Type.TLiteral<"deny">;
  reason: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>, Type.TObject<{
  status: Type.TLiteral<"expired">;
  reason: Type.TUnion<[Type.TLiteral<"timeout">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>, Type.TObject<{
  status: Type.TLiteral<"cancelled">;
  reason: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>]>;
/** Durable terminal approval state returned after a resolution attempt. */
declare const TerminalApprovalSnapshotSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"allowed">;
  decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
  reason: Type.TUnion<[Type.TLiteral<"user">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>, Type.TObject<{
  status: Type.TLiteral<"denied">;
  decision: Type.TLiteral<"deny">;
  reason: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>, Type.TObject<{
  status: Type.TLiteral<"expired">;
  reason: Type.TUnion<[Type.TLiteral<"timeout">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>, Type.TObject<{
  status: Type.TLiteral<"cancelled">;
  reason: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
  resolvedAtMs: Type.TInteger;
  source: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
  }>>;
  resolver: Type.TOptional<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
  }>>;
  id: Type.TString;
  urlPath: Type.TString;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  presentation: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"exec">;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    title: Type.TString;
    description: Type.TString;
    detail: Type.TOptional<Type.TString>;
    severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
    pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"system-agent">;
    title: Type.TString;
    description: Type.TString;
    proposalHash: Type.TString;
    agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
  }>]>;
}>]>;
/** Lookup payload for one approval by its exact full id. */
declare const ApprovalGetParamsSchema: Type.TObject<{
  id: Type.TString;
}>;
/** Current durable state for one authorized approval lookup. */
declare const ApprovalGetResultSchema: Type.TObject<{
  approval: Type.TUnion<[Type.TObject<{
    status: Type.TLiteral<"pending">;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"allowed">;
    decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
    reason: Type.TUnion<[Type.TLiteral<"user">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"denied">;
    decision: Type.TLiteral<"deny">;
    reason: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"expired">;
    reason: Type.TUnion<[Type.TLiteral<"timeout">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"cancelled">;
    reason: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>]>;
}>;
/** Cursor-based query for the retained terminal approval ledger. */
declare const ApprovalHistoryParamsSchema: Type.TObject<{
  cursor: Type.TOptional<Type.TString>;
  limit: Type.TOptional<Type.TInteger>;
  kind: Type.TOptional<Type.TUnion<[Type.TLiteral<"exec">, Type.TLiteral<"plugin">, Type.TLiteral<"system-agent">]>>;
}>;
/** Newest-first page from the retained terminal approval ledger. */
declare const ApprovalHistoryResultSchema: Type.TObject<{
  items: Type.TArray<Type.TUnion<[Type.TObject<{
    status: Type.TLiteral<"allowed">;
    decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
    reason: Type.TUnion<[Type.TLiteral<"user">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"denied">;
    decision: Type.TLiteral<"deny">;
    reason: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"expired">;
    reason: Type.TUnion<[Type.TLiteral<"timeout">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"cancelled">;
    reason: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>]>>;
  nextCursor: Type.TOptional<Type.TString>;
}>;
/** Reviewer decision for one approval identified by its exact full id. */
declare const ApprovalResolveParamsSchema: Type.TObject<{
  id: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"exec">, Type.TLiteral<"plugin">, Type.TLiteral<"system-agent">]>;
  decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>;
}>;
/** First-answer outcome plus the canonical recorded state returned to all contenders. */
declare const ApprovalResolveResultSchema: Type.TObject<{
  applied: Type.TBoolean;
  approval: Type.TUnion<[Type.TObject<{
    status: Type.TLiteral<"allowed">;
    decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
    reason: Type.TUnion<[Type.TLiteral<"user">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"denied">;
    decision: Type.TLiteral<"deny">;
    reason: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"expired">;
    reason: Type.TUnion<[Type.TLiteral<"timeout">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"cancelled">;
    reason: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>]>;
}>;
/** Sanitized pending transition delivered only to an opted-in session audience. */
declare const PendingSessionApprovalEventSchema: Type.TObject<{
  phase: Type.TLiteral<"pending">;
  approval: Type.TObject<{
    status: Type.TLiteral<"pending">;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>;
  sessionKey: Type.TString;
  sourceSessionKey: Type.TOptional<Type.TString>;
  updatedAtMs: Type.TInteger;
}>;
/** Sanitized terminal transition delivered only to an opted-in session audience. */
declare const TerminalSessionApprovalEventSchema: Type.TObject<{
  phase: Type.TLiteral<"terminal">;
  approval: Type.TUnion<[Type.TObject<{
    status: Type.TLiteral<"allowed">;
    decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
    reason: Type.TUnion<[Type.TLiteral<"user">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"denied">;
    decision: Type.TLiteral<"deny">;
    reason: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"expired">;
    reason: Type.TUnion<[Type.TLiteral<"timeout">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"cancelled">;
    reason: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>]>;
  sessionKey: Type.TString;
  sourceSessionKey: Type.TOptional<Type.TString>;
  updatedAtMs: Type.TInteger;
}>;
/** Sanitized approval transition delivered only to an opted-in session audience. */
declare const SessionApprovalEventSchema: Type.TUnion<[Type.TObject<{
  phase: Type.TLiteral<"pending">;
  approval: Type.TObject<{
    status: Type.TLiteral<"pending">;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>;
  sessionKey: Type.TString;
  sourceSessionKey: Type.TOptional<Type.TString>;
  updatedAtMs: Type.TInteger;
}>, Type.TObject<{
  phase: Type.TLiteral<"terminal">;
  approval: Type.TUnion<[Type.TObject<{
    status: Type.TLiteral<"allowed">;
    decision: Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">]>;
    reason: Type.TUnion<[Type.TLiteral<"user">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"denied">;
    decision: Type.TLiteral<"deny">;
    reason: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"malformed-verdict">, Type.TLiteral<"no-route">, Type.TLiteral<"storage-corrupt">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"expired">;
    reason: Type.TUnion<[Type.TLiteral<"timeout">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>, Type.TObject<{
    status: Type.TLiteral<"cancelled">;
    reason: Type.TUnion<[Type.TLiteral<"run-aborted">, Type.TLiteral<"gateway-restart">]>;
    resolvedAtMs: Type.TInteger;
    source: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
    }>>;
    resolver: Type.TOptional<Type.TObject<{
      kind: Type.TUnion<[Type.TLiteral<"device">, Type.TLiteral<"channel">, Type.TLiteral<"runtime">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
    }>>;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>]>;
  sessionKey: Type.TString;
  sourceSessionKey: Type.TOptional<Type.TString>;
  updatedAtMs: Type.TInteger;
}>]>;
/** Authoritative pending approval set returned when a session stream subscribes. */
declare const SessionApprovalReplaySchema: Type.TObject<{
  sessionKey: Type.TString;
  updatedAtMs: Type.TInteger;
  approvals: Type.TArray<Type.TObject<{
    status: Type.TLiteral<"pending">;
    id: Type.TString;
    urlPath: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    presentation: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"exec">;
      commandText: Type.TString;
      commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"plugin">;
      title: Type.TString;
      description: Type.TString;
      detail: Type.TOptional<Type.TString>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warning">, Type.TLiteral<"critical">]>;
      pluginId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      toolName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TArray<Type.TUnion<[Type.TLiteral<"allow-once">, Type.TLiteral<"allow-always">, Type.TLiteral<"deny">]>>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"system-agent">;
      title: Type.TString;
      description: Type.TString;
      proposalHash: Type.TString;
      agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
      allowedDecisions: Type.TTuple<[Type.TLiteral<"allow-once">, Type.TLiteral<"deny">]>;
    }>]>;
  }>>;
  truncated: Type.TBoolean;
}>;
type ApprovalKind = Static<typeof ApprovalKindSchema>;
type ApprovalDecision = Static<typeof ApprovalDecisionSchema>;
type ApprovalAllowDecision = Static<typeof ApprovalAllowDecisionSchema>;
type ApprovalTerminalReason = Static<typeof ApprovalTerminalReasonSchema>;
type PluginApprovalSeverity = Static<typeof PluginApprovalSeveritySchema>;
type ExecApprovalPresentation = Static<typeof ExecApprovalPresentationSchema>;
type PluginApprovalPresentation = Static<typeof PluginApprovalPresentationSchema>;
type SystemAgentApprovalPresentation = Static<typeof SystemAgentApprovalPresentationSchema>;
type ApprovalPresentation = Static<typeof ApprovalPresentationSchema>;
type PendingApprovalSnapshot = Static<typeof PendingApprovalSnapshotSchema>;
type ApprovalSnapshot = Static<typeof ApprovalSnapshotSchema>;
type ApprovalGetParams = Static<typeof ApprovalGetParamsSchema>;
type ApprovalGetResult = Static<typeof ApprovalGetResultSchema>;
type ApprovalHistoryParams = Static<typeof ApprovalHistoryParamsSchema>;
type ApprovalHistoryResult = Static<typeof ApprovalHistoryResultSchema>;
type ApprovalResolveParams = Static<typeof ApprovalResolveParamsSchema>;
type ApprovalResolveResult = Static<typeof ApprovalResolveResultSchema>;
type AllowedApprovalSnapshot = Static<typeof AllowedApprovalSnapshotSchema>;
type DeniedApprovalSnapshot = Static<typeof DeniedApprovalSnapshotSchema>;
type ExpiredApprovalSnapshot = Static<typeof ExpiredApprovalSnapshotSchema>;
type CancelledApprovalSnapshot = Static<typeof CancelledApprovalSnapshotSchema>;
type TerminalApprovalSnapshot = Static<typeof TerminalApprovalSnapshotSchema>;
type SessionApprovalEvent = Static<typeof SessionApprovalEventSchema>;
type SessionApprovalReplay = Static<typeof SessionApprovalReplaySchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/worker-inference.d.ts
declare const WORKER_INFERENCE_PROTOCOL_FEATURE = "worker-inference-v1";
declare const WORKER_INFERENCE_METHODS: readonly ["worker.inference.start", "worker.inference.cancel"];
declare const WORKER_PROTOCOL_MAX_INFERENCE_PAYLOAD_BYTES: number;
declare const WORKER_INFERENCE_MAX_CONTEXT_MESSAGES = 1024;
declare const WORKER_INFERENCE_MAX_OUTPUT_TOKENS = 1000000;
declare const WorkerInferenceModelRefSchema: Type.TObject<{
  readonly provider: Type.TString;
  readonly model: Type.TString;
}>;
declare const WorkerInferenceContextSchema: Type.TObject<{
  readonly systemPrompt: Type.TOptional<Type.TString>;
  readonly messages: Type.TArray<Type.TUnion<[Type.TObject<{
    readonly role: Type.TLiteral<"user">;
    readonly content: Type.TUnion<[Type.TString, Type.TArray<Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"text">;
      readonly text: Type.TString;
      readonly textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"image">;
      readonly data: Type.TString;
      readonly mimeType: Type.TString;
    }>]>>]>;
    readonly timestamp: Type.TInteger;
    readonly runtimeContextCarrier: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    readonly diagnostics: Type.TOptional<Type.TArray<Type.TObject<{
      type: Type.TString;
      timestamp: Type.TInteger;
      error: Type.TOptional<Type.TObject<{
        name: Type.TOptional<Type.TString>;
        message: Type.TString;
        stack: Type.TOptional<Type.TString>;
        code: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      }>>;
      details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    }>>>;
    readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">, Type.TLiteral<"error">, Type.TLiteral<"aborted">]>;
    readonly errorMessage: Type.TOptional<Type.TString>;
    readonly errorCode: Type.TOptional<Type.TString>;
    readonly errorType: Type.TOptional<Type.TString>;
    readonly errorBody: Type.TOptional<Type.TString>;
    readonly role: Type.TLiteral<"assistant">;
    readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"text">;
      readonly text: Type.TString;
      readonly textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking">;
      readonly thinking: Type.TString;
      readonly thinkingSignature: Type.TOptional<Type.TString>;
      readonly redacted: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolCall">;
      readonly id: Type.TString;
      readonly name: Type.TString;
      readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
      readonly thoughtSignature: Type.TOptional<Type.TString>;
      readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
    }>]>>;
    readonly api: Type.TString;
    readonly provider: Type.TString;
    readonly model: Type.TString;
    readonly responseModel: Type.TOptional<Type.TString>;
    readonly responseId: Type.TOptional<Type.TString>;
    readonly usage: Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
        state: Type.TLiteral<"available">;
        promptTokens: Type.TNumber;
        totalTokens: Type.TNumber;
      }>, Type.TObject<{
        state: Type.TLiteral<"unavailable">;
      }>]>>;
      totalTokens: Type.TNumber;
      cost: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        total: Type.TNumber;
        totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
      }>;
    }>;
    readonly timestamp: Type.TInteger;
  }>, Type.TObject<{
    readonly role: Type.TLiteral<"toolResult">;
    readonly toolCallId: Type.TString;
    readonly toolName: Type.TString;
    readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"text">;
      readonly text: Type.TString;
      readonly textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"image">;
      readonly data: Type.TString;
      readonly mimeType: Type.TString;
    }>]>>;
    readonly details: Type.TOptional<Type.TUnknown>;
    readonly isError: Type.TBoolean;
    readonly timestamp: Type.TInteger;
  }>]>>;
  readonly tools: Type.TOptional<Type.TArray<Type.TObject<{
    readonly name: Type.TString;
    readonly description: Type.TString;
    readonly parameters: Type.TUnknown;
  }>>>;
}>;
declare const WorkerInferenceOptionsSchema: Type.TObject<{
  readonly temperature: Type.TOptional<Type.TNumber>;
  readonly maxTokens: Type.TOptional<Type.TInteger>;
  readonly reasoning: Type.TOptional<Type.TUnion<[Type.TLiteral<"off">, Type.TLiteral<"minimal">, Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">, Type.TLiteral<"xhigh">, Type.TLiteral<"adaptive">, Type.TLiteral<"max">]>>;
  readonly thinkingBudgets: Type.TOptional<Type.TObject<{
    readonly minimal: Type.TOptional<Type.TInteger>;
    readonly low: Type.TOptional<Type.TInteger>;
    readonly medium: Type.TOptional<Type.TInteger>;
    readonly high: Type.TOptional<Type.TInteger>;
    readonly max: Type.TOptional<Type.TInteger>;
  }>>;
}>;
declare const WorkerInferenceStartParamsSchema: Type.TObject<{
  readonly modelRef: Type.TObject<{
    readonly provider: Type.TString;
    readonly model: Type.TString;
  }>;
  readonly context: Type.TObject<{
    readonly systemPrompt: Type.TOptional<Type.TString>;
    readonly messages: Type.TArray<Type.TUnion<[Type.TObject<{
      readonly role: Type.TLiteral<"user">;
      readonly content: Type.TUnion<[Type.TString, Type.TArray<Type.TUnion<[Type.TObject<{
        readonly type: Type.TLiteral<"text">;
        readonly text: Type.TString;
        readonly textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"image">;
        readonly data: Type.TString;
        readonly mimeType: Type.TString;
      }>]>>]>;
      readonly timestamp: Type.TInteger;
      readonly runtimeContextCarrier: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      readonly diagnostics: Type.TOptional<Type.TArray<Type.TObject<{
        type: Type.TString;
        timestamp: Type.TInteger;
        error: Type.TOptional<Type.TObject<{
          name: Type.TOptional<Type.TString>;
          message: Type.TString;
          stack: Type.TOptional<Type.TString>;
          code: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
        }>>;
        details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
      }>>>;
      readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">, Type.TLiteral<"error">, Type.TLiteral<"aborted">]>;
      readonly errorMessage: Type.TOptional<Type.TString>;
      readonly errorCode: Type.TOptional<Type.TString>;
      readonly errorType: Type.TOptional<Type.TString>;
      readonly errorBody: Type.TOptional<Type.TString>;
      readonly role: Type.TLiteral<"assistant">;
      readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
        readonly type: Type.TLiteral<"text">;
        readonly text: Type.TString;
        readonly textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"thinking">;
        readonly thinking: Type.TString;
        readonly thinkingSignature: Type.TOptional<Type.TString>;
        readonly redacted: Type.TOptional<Type.TBoolean>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"toolCall">;
        readonly id: Type.TString;
        readonly name: Type.TString;
        readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
        readonly thoughtSignature: Type.TOptional<Type.TString>;
        readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
      }>]>>;
      readonly api: Type.TString;
      readonly provider: Type.TString;
      readonly model: Type.TString;
      readonly responseModel: Type.TOptional<Type.TString>;
      readonly responseId: Type.TOptional<Type.TString>;
      readonly usage: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
          state: Type.TLiteral<"available">;
          promptTokens: Type.TNumber;
          totalTokens: Type.TNumber;
        }>, Type.TObject<{
          state: Type.TLiteral<"unavailable">;
        }>]>>;
        totalTokens: Type.TNumber;
        cost: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          total: Type.TNumber;
          totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
        }>;
      }>;
      readonly timestamp: Type.TInteger;
    }>, Type.TObject<{
      readonly role: Type.TLiteral<"toolResult">;
      readonly toolCallId: Type.TString;
      readonly toolName: Type.TString;
      readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
        readonly type: Type.TLiteral<"text">;
        readonly text: Type.TString;
        readonly textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"image">;
        readonly data: Type.TString;
        readonly mimeType: Type.TString;
      }>]>>;
      readonly details: Type.TOptional<Type.TUnknown>;
      readonly isError: Type.TBoolean;
      readonly timestamp: Type.TInteger;
    }>]>>;
    readonly tools: Type.TOptional<Type.TArray<Type.TObject<{
      readonly name: Type.TString;
      readonly description: Type.TString;
      readonly parameters: Type.TUnknown;
    }>>>;
  }>;
  readonly options: Type.TObject<{
    readonly temperature: Type.TOptional<Type.TNumber>;
    readonly maxTokens: Type.TOptional<Type.TInteger>;
    readonly reasoning: Type.TOptional<Type.TUnion<[Type.TLiteral<"off">, Type.TLiteral<"minimal">, Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">, Type.TLiteral<"xhigh">, Type.TLiteral<"adaptive">, Type.TLiteral<"max">]>>;
    readonly thinkingBudgets: Type.TOptional<Type.TObject<{
      readonly minimal: Type.TOptional<Type.TInteger>;
      readonly low: Type.TOptional<Type.TInteger>;
      readonly medium: Type.TOptional<Type.TInteger>;
      readonly high: Type.TOptional<Type.TInteger>;
      readonly max: Type.TOptional<Type.TInteger>;
    }>>;
  }>;
  readonly runEpoch: Type.TInteger;
  readonly sessionId: Type.TString;
  readonly runId: Type.TString;
  readonly turnId: Type.TString;
}>;
declare const WorkerInferenceStartResultSchema: Type.TObject<{
  readonly status: Type.TUnion<[Type.TLiteral<"accepted">, Type.TLiteral<"replayed">]>;
}>;
declare const WorkerInferenceErrorReasonSchema: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
declare const WorkerInferenceErrorShapeSchema: Type.TObject<{
  readonly code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
  readonly message: Type.TString;
  readonly details: Type.TObject<{
    readonly reason: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
  }>;
}>;
declare const WorkerInferenceStartRequestFrameSchema: Type.TObject<{
  readonly type: Type.TLiteral<"req">;
  readonly id: Type.TString;
  readonly method: Type.TLiteral<"worker.inference.start">;
  readonly params: Type.TObject<{
    readonly modelRef: Type.TObject<{
      readonly provider: Type.TString;
      readonly model: Type.TString;
    }>;
    readonly context: Type.TObject<{
      readonly systemPrompt: Type.TOptional<Type.TString>;
      readonly messages: Type.TArray<Type.TUnion<[Type.TObject<{
        readonly role: Type.TLiteral<"user">;
        readonly content: Type.TUnion<[Type.TString, Type.TArray<Type.TUnion<[Type.TObject<{
          readonly type: Type.TLiteral<"text">;
          readonly text: Type.TString;
          readonly textSignature: Type.TOptional<Type.TString>;
        }>, Type.TObject<{
          readonly type: Type.TLiteral<"image">;
          readonly data: Type.TString;
          readonly mimeType: Type.TString;
        }>]>>]>;
        readonly timestamp: Type.TInteger;
        readonly runtimeContextCarrier: Type.TOptional<Type.TBoolean>;
      }>, Type.TObject<{
        readonly diagnostics: Type.TOptional<Type.TArray<Type.TObject<{
          type: Type.TString;
          timestamp: Type.TInteger;
          error: Type.TOptional<Type.TObject<{
            name: Type.TOptional<Type.TString>;
            message: Type.TString;
            stack: Type.TOptional<Type.TString>;
            code: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
          }>>;
          details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
        }>>>;
        readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">, Type.TLiteral<"error">, Type.TLiteral<"aborted">]>;
        readonly errorMessage: Type.TOptional<Type.TString>;
        readonly errorCode: Type.TOptional<Type.TString>;
        readonly errorType: Type.TOptional<Type.TString>;
        readonly errorBody: Type.TOptional<Type.TString>;
        readonly role: Type.TLiteral<"assistant">;
        readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
          readonly type: Type.TLiteral<"text">;
          readonly text: Type.TString;
          readonly textSignature: Type.TOptional<Type.TString>;
        }>, Type.TObject<{
          readonly type: Type.TLiteral<"thinking">;
          readonly thinking: Type.TString;
          readonly thinkingSignature: Type.TOptional<Type.TString>;
          readonly redacted: Type.TOptional<Type.TBoolean>;
        }>, Type.TObject<{
          readonly type: Type.TLiteral<"toolCall">;
          readonly id: Type.TString;
          readonly name: Type.TString;
          readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
          readonly thoughtSignature: Type.TOptional<Type.TString>;
          readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
        }>]>>;
        readonly api: Type.TString;
        readonly provider: Type.TString;
        readonly model: Type.TString;
        readonly responseModel: Type.TOptional<Type.TString>;
        readonly responseId: Type.TOptional<Type.TString>;
        readonly usage: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
            state: Type.TLiteral<"available">;
            promptTokens: Type.TNumber;
            totalTokens: Type.TNumber;
          }>, Type.TObject<{
            state: Type.TLiteral<"unavailable">;
          }>]>>;
          totalTokens: Type.TNumber;
          cost: Type.TObject<{
            input: Type.TNumber;
            output: Type.TNumber;
            cacheRead: Type.TNumber;
            cacheWrite: Type.TNumber;
            total: Type.TNumber;
            totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
          }>;
        }>;
        readonly timestamp: Type.TInteger;
      }>, Type.TObject<{
        readonly role: Type.TLiteral<"toolResult">;
        readonly toolCallId: Type.TString;
        readonly toolName: Type.TString;
        readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
          readonly type: Type.TLiteral<"text">;
          readonly text: Type.TString;
          readonly textSignature: Type.TOptional<Type.TString>;
        }>, Type.TObject<{
          readonly type: Type.TLiteral<"image">;
          readonly data: Type.TString;
          readonly mimeType: Type.TString;
        }>]>>;
        readonly details: Type.TOptional<Type.TUnknown>;
        readonly isError: Type.TBoolean;
        readonly timestamp: Type.TInteger;
      }>]>>;
      readonly tools: Type.TOptional<Type.TArray<Type.TObject<{
        readonly name: Type.TString;
        readonly description: Type.TString;
        readonly parameters: Type.TUnknown;
      }>>>;
    }>;
    readonly options: Type.TObject<{
      readonly temperature: Type.TOptional<Type.TNumber>;
      readonly maxTokens: Type.TOptional<Type.TInteger>;
      readonly reasoning: Type.TOptional<Type.TUnion<[Type.TLiteral<"off">, Type.TLiteral<"minimal">, Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">, Type.TLiteral<"xhigh">, Type.TLiteral<"adaptive">, Type.TLiteral<"max">]>>;
      readonly thinkingBudgets: Type.TOptional<Type.TObject<{
        readonly minimal: Type.TOptional<Type.TInteger>;
        readonly low: Type.TOptional<Type.TInteger>;
        readonly medium: Type.TOptional<Type.TInteger>;
        readonly high: Type.TOptional<Type.TInteger>;
        readonly max: Type.TOptional<Type.TInteger>;
      }>>;
    }>;
    readonly runEpoch: Type.TInteger;
    readonly sessionId: Type.TString;
    readonly runId: Type.TString;
    readonly turnId: Type.TString;
  }>;
}>;
declare const WorkerInferenceStartResponseFrameSchema: Type.TUnion<[Type.TObject<{
  readonly type: Type.TLiteral<"res">;
  readonly id: Type.TString;
  readonly ok: Type.TLiteral<true>;
  readonly payload: Type.TObject<{
    readonly status: Type.TUnion<[Type.TLiteral<"accepted">, Type.TLiteral<"replayed">]>;
  }>;
}>, Type.TObject<{
  readonly type: Type.TLiteral<"res">;
  readonly id: Type.TString;
  readonly ok: Type.TLiteral<false>;
  readonly error: Type.TObject<{
    readonly code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
    readonly message: Type.TString;
    readonly details: Type.TObject<{
      readonly reason: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
    }>;
  }>;
}>, Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<false>;
  error: Type.TObject<{
    code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
    message: Type.TString;
    details: Type.TObject<{
      reason: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
    }>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>;
}>]>;
declare const WorkerInferenceCancelParamsSchema: Type.TObject<{
  readonly runEpoch: Type.TInteger;
  readonly sessionId: Type.TString;
  readonly runId: Type.TString;
  readonly turnId: Type.TString;
}>;
declare const WorkerInferenceCancelResultSchema: Type.TObject<{
  readonly status: Type.TLiteral<"cancelled">;
}>;
declare const WorkerInferenceCancelRequestFrameSchema: Type.TObject<{
  readonly type: Type.TLiteral<"req">;
  readonly id: Type.TString;
  readonly method: Type.TLiteral<"worker.inference.cancel">;
  readonly params: Type.TObject<{
    readonly runEpoch: Type.TInteger;
    readonly sessionId: Type.TString;
    readonly runId: Type.TString;
    readonly turnId: Type.TString;
  }>;
}>;
declare const WorkerInferenceCancelResponseFrameSchema: Type.TUnion<[Type.TObject<{
  readonly type: Type.TLiteral<"res">;
  readonly id: Type.TString;
  readonly ok: Type.TLiteral<true>;
  readonly payload: Type.TObject<{
    readonly status: Type.TLiteral<"cancelled">;
  }>;
}>, Type.TObject<{
  readonly type: Type.TLiteral<"res">;
  readonly id: Type.TString;
  readonly ok: Type.TLiteral<false>;
  readonly error: Type.TObject<{
    readonly code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
    readonly message: Type.TString;
    readonly details: Type.TObject<{
      readonly reason: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
    }>;
  }>;
}>, Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<false>;
  error: Type.TObject<{
    code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
    message: Type.TString;
    details: Type.TObject<{
      reason: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
    }>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>;
}>]>;
declare const WorkerInferenceEventParamsSchema: Type.TObject<{
  readonly seq: Type.TInteger;
  readonly event: Type.TUnion<[Type.TObject<{
    readonly type: Type.TLiteral<"start">;
    readonly resolvedModel: Type.TObject<{
      readonly api: Type.TString;
      readonly provider: Type.TString;
      readonly model: Type.TString;
    }>;
    readonly timestamp: Type.TInteger;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"text_start">;
    readonly contentIndex: Type.TInteger;
    readonly contentSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"text_delta">;
    readonly contentIndex: Type.TInteger;
    readonly delta: Type.TString;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"text_end">;
    readonly contentIndex: Type.TInteger;
    readonly contentSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"thinking_start">;
    readonly contentIndex: Type.TInteger;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"thinking_delta">;
    readonly contentIndex: Type.TInteger;
    readonly delta: Type.TString;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"thinking_end">;
    readonly contentIndex: Type.TInteger;
    readonly contentSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"toolcall_start">;
    readonly contentIndex: Type.TInteger;
    readonly id: Type.TString;
    readonly toolName: Type.TString;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"toolcall_delta">;
    readonly contentIndex: Type.TInteger;
    readonly delta: Type.TString;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"toolcall_end">;
    readonly contentIndex: Type.TInteger;
  }>]>;
  readonly runEpoch: Type.TInteger;
  readonly sessionId: Type.TString;
  readonly runId: Type.TString;
  readonly turnId: Type.TString;
}>;
declare const WorkerInferenceEventFrameSchema: Type.TObject<{
  readonly type: Type.TLiteral<"event">;
  readonly event: Type.TLiteral<"worker.inference.event">;
  readonly payload: Type.TObject<{
    readonly seq: Type.TInteger;
    readonly event: Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"start">;
      readonly resolvedModel: Type.TObject<{
        readonly api: Type.TString;
        readonly provider: Type.TString;
        readonly model: Type.TString;
      }>;
      readonly timestamp: Type.TInteger;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"text_start">;
      readonly contentIndex: Type.TInteger;
      readonly contentSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"text_delta">;
      readonly contentIndex: Type.TInteger;
      readonly delta: Type.TString;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"text_end">;
      readonly contentIndex: Type.TInteger;
      readonly contentSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking_start">;
      readonly contentIndex: Type.TInteger;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking_delta">;
      readonly contentIndex: Type.TInteger;
      readonly delta: Type.TString;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking_end">;
      readonly contentIndex: Type.TInteger;
      readonly contentSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolcall_start">;
      readonly contentIndex: Type.TInteger;
      readonly id: Type.TString;
      readonly toolName: Type.TString;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolcall_delta">;
      readonly contentIndex: Type.TInteger;
      readonly delta: Type.TString;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolcall_end">;
      readonly contentIndex: Type.TInteger;
    }>]>;
    readonly runEpoch: Type.TInteger;
    readonly sessionId: Type.TString;
    readonly runId: Type.TString;
    readonly turnId: Type.TString;
  }>;
}>;
declare const WorkerInferenceTerminalOutcomeSchema: Type.TUnion<[Type.TObject<{
  readonly type: Type.TLiteral<"done">;
  readonly message: Type.TObject<{
    readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">]>;
    readonly role: Type.TLiteral<"assistant">;
    readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"text">;
      readonly text: Type.TString;
      readonly textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"thinking">;
      readonly thinking: Type.TString;
      readonly thinkingSignature: Type.TOptional<Type.TString>;
      readonly redacted: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"toolCall">;
      readonly id: Type.TString;
      readonly name: Type.TString;
      readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
      readonly thoughtSignature: Type.TOptional<Type.TString>;
      readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
    }>]>>;
    readonly api: Type.TString;
    readonly provider: Type.TString;
    readonly model: Type.TString;
    readonly responseModel: Type.TOptional<Type.TString>;
    readonly responseId: Type.TOptional<Type.TString>;
    readonly usage: Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
        state: Type.TLiteral<"available">;
        promptTokens: Type.TNumber;
        totalTokens: Type.TNumber;
      }>, Type.TObject<{
        state: Type.TLiteral<"unavailable">;
      }>]>>;
      totalTokens: Type.TNumber;
      cost: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        total: Type.TNumber;
        totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
      }>;
    }>;
    readonly timestamp: Type.TInteger;
  }>;
}>, Type.TObject<{
  readonly type: Type.TLiteral<"error">;
  readonly reason: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
  readonly message: Type.TString;
  readonly usage: Type.TOptional<Type.TObject<{
    input: Type.TNumber;
    output: Type.TNumber;
    cacheRead: Type.TNumber;
    cacheWrite: Type.TNumber;
    contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
      state: Type.TLiteral<"available">;
      promptTokens: Type.TNumber;
      totalTokens: Type.TNumber;
    }>, Type.TObject<{
      state: Type.TLiteral<"unavailable">;
    }>]>>;
    totalTokens: Type.TNumber;
    cost: Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      total: Type.TNumber;
      totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
    }>;
  }>>;
}>]>;
declare const WorkerInferenceTerminalParamsSchema: Type.TObject<{
  readonly seq: Type.TInteger;
  readonly outcome: Type.TUnion<[Type.TObject<{
    readonly type: Type.TLiteral<"done">;
    readonly message: Type.TObject<{
      readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">]>;
      readonly role: Type.TLiteral<"assistant">;
      readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
        readonly type: Type.TLiteral<"text">;
        readonly text: Type.TString;
        readonly textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"thinking">;
        readonly thinking: Type.TString;
        readonly thinkingSignature: Type.TOptional<Type.TString>;
        readonly redacted: Type.TOptional<Type.TBoolean>;
      }>, Type.TObject<{
        readonly type: Type.TLiteral<"toolCall">;
        readonly id: Type.TString;
        readonly name: Type.TString;
        readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
        readonly thoughtSignature: Type.TOptional<Type.TString>;
        readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
      }>]>>;
      readonly api: Type.TString;
      readonly provider: Type.TString;
      readonly model: Type.TString;
      readonly responseModel: Type.TOptional<Type.TString>;
      readonly responseId: Type.TOptional<Type.TString>;
      readonly usage: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
          state: Type.TLiteral<"available">;
          promptTokens: Type.TNumber;
          totalTokens: Type.TNumber;
        }>, Type.TObject<{
          state: Type.TLiteral<"unavailable">;
        }>]>>;
        totalTokens: Type.TNumber;
        cost: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          total: Type.TNumber;
          totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
        }>;
      }>;
      readonly timestamp: Type.TInteger;
    }>;
  }>, Type.TObject<{
    readonly type: Type.TLiteral<"error">;
    readonly reason: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
    readonly message: Type.TString;
    readonly usage: Type.TOptional<Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
        state: Type.TLiteral<"available">;
        promptTokens: Type.TNumber;
        totalTokens: Type.TNumber;
      }>, Type.TObject<{
        state: Type.TLiteral<"unavailable">;
      }>]>>;
      totalTokens: Type.TNumber;
      cost: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        total: Type.TNumber;
        totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
      }>;
    }>>;
  }>]>;
  readonly runEpoch: Type.TInteger;
  readonly sessionId: Type.TString;
  readonly runId: Type.TString;
  readonly turnId: Type.TString;
}>;
declare const WorkerInferenceTerminalFrameSchema: Type.TObject<{
  readonly type: Type.TLiteral<"event">;
  readonly event: Type.TLiteral<"worker.inference.terminal">;
  readonly payload: Type.TObject<{
    readonly seq: Type.TInteger;
    readonly outcome: Type.TUnion<[Type.TObject<{
      readonly type: Type.TLiteral<"done">;
      readonly message: Type.TObject<{
        readonly stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">]>;
        readonly role: Type.TLiteral<"assistant">;
        readonly content: Type.TArray<Type.TUnion<[Type.TObject<{
          readonly type: Type.TLiteral<"text">;
          readonly text: Type.TString;
          readonly textSignature: Type.TOptional<Type.TString>;
        }>, Type.TObject<{
          readonly type: Type.TLiteral<"thinking">;
          readonly thinking: Type.TString;
          readonly thinkingSignature: Type.TOptional<Type.TString>;
          readonly redacted: Type.TOptional<Type.TBoolean>;
        }>, Type.TObject<{
          readonly type: Type.TLiteral<"toolCall">;
          readonly id: Type.TString;
          readonly name: Type.TString;
          readonly arguments: Type.TRecord<"^.*$", Type.TUnknown>;
          readonly thoughtSignature: Type.TOptional<Type.TString>;
          readonly executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
        }>]>>;
        readonly api: Type.TString;
        readonly provider: Type.TString;
        readonly model: Type.TString;
        readonly responseModel: Type.TOptional<Type.TString>;
        readonly responseId: Type.TOptional<Type.TString>;
        readonly usage: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
            state: Type.TLiteral<"available">;
            promptTokens: Type.TNumber;
            totalTokens: Type.TNumber;
          }>, Type.TObject<{
            state: Type.TLiteral<"unavailable">;
          }>]>>;
          totalTokens: Type.TNumber;
          cost: Type.TObject<{
            input: Type.TNumber;
            output: Type.TNumber;
            cacheRead: Type.TNumber;
            cacheWrite: Type.TNumber;
            total: Type.TNumber;
            totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
          }>;
        }>;
        readonly timestamp: Type.TInteger;
      }>;
    }>, Type.TObject<{
      readonly type: Type.TLiteral<"error">;
      readonly reason: Type.TUnion<[Type.TLiteral<"model-not-approved">, Type.TLiteral<"invalid-context">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"provider-error">, Type.TLiteral<"cancelled">]>;
      readonly message: Type.TString;
      readonly usage: Type.TOptional<Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
          state: Type.TLiteral<"available">;
          promptTokens: Type.TNumber;
          totalTokens: Type.TNumber;
        }>, Type.TObject<{
          state: Type.TLiteral<"unavailable">;
        }>]>>;
        totalTokens: Type.TNumber;
        cost: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          total: Type.TNumber;
          totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
        }>;
      }>>;
    }>]>;
    readonly runEpoch: Type.TInteger;
    readonly sessionId: Type.TString;
    readonly runId: Type.TString;
    readonly turnId: Type.TString;
  }>;
}>;
type WorkerInferenceModelRef = Static<typeof WorkerInferenceModelRefSchema>;
type WorkerInferenceContext = Static<typeof WorkerInferenceContextSchema>;
type WorkerInferenceOptions = Static<typeof WorkerInferenceOptionsSchema>;
type WorkerInferenceStartParams = Static<typeof WorkerInferenceStartParamsSchema>;
type WorkerInferenceStartResult = Static<typeof WorkerInferenceStartResultSchema>;
type WorkerInferenceErrorReason = Static<typeof WorkerInferenceErrorReasonSchema>;
type WorkerInferenceErrorShape = Static<typeof WorkerInferenceErrorShapeSchema>;
type WorkerInferenceStartRequestFrame = Static<typeof WorkerInferenceStartRequestFrameSchema>;
type WorkerInferenceStartResponseFrame = Static<typeof WorkerInferenceStartResponseFrameSchema>;
type WorkerInferenceCancelParams = Static<typeof WorkerInferenceCancelParamsSchema>;
type WorkerInferenceCancelResult = Static<typeof WorkerInferenceCancelResultSchema>;
type WorkerInferenceCancelRequestFrame = Static<typeof WorkerInferenceCancelRequestFrameSchema>;
type WorkerInferenceCancelResponseFrame = Static<typeof WorkerInferenceCancelResponseFrameSchema>;
type WorkerInferenceEventParams = Static<typeof WorkerInferenceEventParamsSchema>;
type WorkerInferenceEventFrame = Static<typeof WorkerInferenceEventFrameSchema>;
type WorkerInferenceTerminalOutcome = Static<typeof WorkerInferenceTerminalOutcomeSchema>;
type WorkerInferenceTerminalParams = Static<typeof WorkerInferenceTerminalParamsSchema>;
type WorkerInferenceTerminalFrame = Static<typeof WorkerInferenceTerminalFrameSchema>;
declare function validateWorkerInferenceStartParams(data: unknown): data is WorkerInferenceStartParams;
declare function validateWorkerInferenceCancelParams(data: unknown): data is WorkerInferenceCancelParams;
declare function validateWorkerInferenceTerminalOutcome(data: unknown): data is WorkerInferenceTerminalOutcome;
declare function validateWorkerInferenceEventFrame(data: unknown): data is WorkerInferenceEventFrame;
declare function validateWorkerInferenceTerminalFrame(data: unknown): data is WorkerInferenceTerminalFrame;
//#endregion
//#region packages/gateway-protocol/src/schema/skill-history.d.ts
declare const SkillsProposalHistoryStatusParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SkillsProposalHistoryScanParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  direction: Type.TOptional<Type.TUnion<[Type.TLiteral<"older">, Type.TLiteral<"newer">]>>;
}>;
declare const SkillsProposalHistoryScanResultSchema: Type.TObject<{
  schema: Type.TLiteral<"openclaw.skill-workshop.history-scan.v1">;
  hasScanned: Type.TBoolean;
  reviewedSessions: Type.TInteger;
  ideasFound: Type.TInteger;
  hasMore: Type.TBoolean;
  lastScanReviewed: Type.TInteger;
  lastScanIdeas: Type.TInteger;
  lastScanAt: Type.TOptional<Type.TString>;
  oldestReviewedAt: Type.TOptional<Type.TString>;
  newestReviewedAt: Type.TOptional<Type.TString>;
}>;
type SkillsProposalHistoryStatusParams = Static<typeof SkillsProposalHistoryStatusParamsSchema>;
type SkillsProposalHistoryScanParams = Static<typeof SkillsProposalHistoryScanParamsSchema>;
type SkillsProposalHistoryScanResult = Static<typeof SkillsProposalHistoryScanResultSchema>;
declare const validateSkillsProposalHistoryStatusParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateSkillsProposalHistoryScanParams: ProtocolValidator<{
  agentId?: string | undefined;
  direction?: "older" | "newer" | undefined;
}>;
//#endregion
//#region packages/gateway-protocol/src/schema/ui-command.d.ts
declare const UiSplitCommandSchema: Type.TObject<{
  kind: Type.TLiteral<"split">;
  direction: Type.TUnion<[Type.TLiteral<"right">, Type.TLiteral<"down">]>;
  sessionKey: Type.TString;
}>;
declare const UiClosePaneCommandSchema: Type.TObject<{
  kind: Type.TLiteral<"close-pane">;
  sessionKey: Type.TString;
}>;
declare const UiFocusCommandSchema: Type.TObject<{
  kind: Type.TLiteral<"focus">;
  sessionKey: Type.TString;
}>;
declare const UiSidebarCommandSchema: Type.TObject<{
  kind: Type.TLiteral<"sidebar">;
  visible: Type.TBoolean;
}>;
declare const UiPanelCommandSchema: Type.TObject<{
  kind: Type.TLiteral<"panel">;
  panel: Type.TUnion<[Type.TLiteral<"terminal">, Type.TLiteral<"browser">]>;
  open: Type.TBoolean;
  dock: Type.TOptional<Type.TUnion<[Type.TLiteral<"bottom">, Type.TLiteral<"right">]>>;
  terminalSessionId: Type.TOptional<Type.TString>;
}>;
declare const UiNavigateCommandSchema: Type.TObject<{
  kind: Type.TLiteral<"navigate">;
  sessionKey: Type.TString;
}>;
declare const UiCommandSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"split">;
  direction: Type.TUnion<[Type.TLiteral<"right">, Type.TLiteral<"down">]>;
  sessionKey: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"close-pane">;
  sessionKey: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"focus">;
  sessionKey: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"sidebar">;
  visible: Type.TBoolean;
}>, Type.TObject<{
  kind: Type.TLiteral<"panel">;
  panel: Type.TUnion<[Type.TLiteral<"terminal">, Type.TLiteral<"browser">]>;
  open: Type.TBoolean;
  dock: Type.TOptional<Type.TUnion<[Type.TLiteral<"bottom">, Type.TLiteral<"right">]>>;
  terminalSessionId: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  kind: Type.TLiteral<"navigate">;
  sessionKey: Type.TString;
}>]>;
type UiCommand = Static<typeof UiCommandSchema>;
declare const UiCommandParamsSchema: Type.TObject<{
  command: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"split">;
    direction: Type.TUnion<[Type.TLiteral<"right">, Type.TLiteral<"down">]>;
    sessionKey: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"close-pane">;
    sessionKey: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"focus">;
    sessionKey: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"sidebar">;
    visible: Type.TBoolean;
  }>, Type.TObject<{
    kind: Type.TLiteral<"panel">;
    panel: Type.TUnion<[Type.TLiteral<"terminal">, Type.TLiteral<"browser">]>;
    open: Type.TBoolean;
    dock: Type.TOptional<Type.TUnion<[Type.TLiteral<"bottom">, Type.TLiteral<"right">]>>;
    terminalSessionId: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"navigate">;
    sessionKey: Type.TString;
  }>]>;
  sessionKey: Type.TOptional<Type.TString>;
}>;
type UiCommandParams = Static<typeof UiCommandParamsSchema>;
declare const UiCommandResultSchema: Type.TObject<{
  ok: Type.TBoolean;
}>;
type UiCommandResult = Static<typeof UiCommandResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/error-codes.d.ts
/** Missing operator-scope details shared by WebSocket and HTTP responses. */
declare const MissingScopeErrorDetailsSchema: Type.TObject<{
  code: Type.TLiteral<"MISSING_SCOPE">;
  missingScope: Type.TString;
  requiredScopes: Type.TArray<Type.TString>;
}>;
declare const McpAppViewExpiredErrorDetailsSchema: Type.TObject<{
  code: Type.TLiteral<"MCP_APP_VIEW_EXPIRED">;
}>;
declare const UnknownAgentIdErrorDetailsSchema: Type.TObject<{
  code: Type.TLiteral<"UNKNOWN_AGENT_ID">;
  agentId: Type.TString;
}>;
declare const WizardNotFoundErrorDetailsSchema: Type.TObject<{
  code: Type.TLiteral<"WIZARD_NOT_FOUND">;
}>;
/** Structured details emitted by method-level failures. */
declare const GatewayErrorDetailsSchema: Type.TUnion<[Type.TObject<{
  code: Type.TLiteral<"MISSING_SCOPE">;
  missingScope: Type.TString;
  requiredScopes: Type.TArray<Type.TString>;
}>, Type.TObject<{
  code: Type.TLiteral<"MCP_APP_VIEW_EXPIRED">;
}>, Type.TObject<{
  code: Type.TLiteral<"UNKNOWN_AGENT_ID">;
  agentId: Type.TString;
}>, Type.TObject<{
  code: Type.TLiteral<"WIZARD_NOT_FOUND">;
}>]>;
/** Builds the canonical gateway error payload while preserving optional retry metadata. */
declare function errorShape(code: ErrorCode, message: string, opts?: {
  details?: unknown;
  retryable?: boolean;
  retryAfterMs?: number;
}): ErrorShape;
/** Builds structured details for a missing operator scope. */
declare function buildMissingScopeErrorDetails(params: {
  missingScope: string;
  requiredScopes: readonly string[];
}): MissingScopeErrorDetails;
/** Builds a forbidden error for a missing operator scope without message parsing. */
declare function missingScopeErrorShape(params: {
  missingScope: string;
  requiredScopes: readonly string[];
}): ErrorShape;
//#endregion
//#region packages/gateway-protocol/src/schema/board.d.ts
declare const BoardTabIdSchema: Type.TString;
declare const BoardWidgetNameSchema: Type.TString;
declare const BoardWidgetGeneratedIdentitySchema: Type.TObject<{
  source: Type.TLiteral<"show_widget">;
  key: Type.TString;
  fallbackName: Type.TString;
}>;
type BoardWidgetGeneratedIdentity = Static<typeof BoardWidgetGeneratedIdentitySchema>;
declare const BoardWidgetPluginKindSchema: Type.TString;
declare const BoardWidgetPluginPropsSchema: Type.TRecord<"^.*$", Type.TUnknown>;
declare const BoardChatDockSchema: Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>;
declare const BoardSizeSchema: Type.TUnion<[Type.TLiteral<"sm">, Type.TLiteral<"md">, Type.TLiteral<"lg">, Type.TLiteral<"xl">, Type.TLiteral<"full">]>;
declare const BoardWidgetPresentationSchema: Type.TUnion<[Type.TLiteral<"card">, Type.TLiteral<"full-bleed">, Type.TLiteral<"frameless">]>;
declare const BoardWidgetHeightModeSchema: Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"fixed">]>;
declare const BOARD_CRON_JOB_ID_MAX_LENGTH = 256;
declare const BOARD_CRON_TRIGGER_PREFIX = "cron.trigger:";
declare const BOARD_WIDGET_TOOL_MAX_LENGTH: number;
declare const BOARD_DATA_BINDING_ID_MAX_LENGTH = 64;
declare const BoardTabSchema: Type.TObject<{
  tabId: Type.TString;
  title: Type.TString;
  position: Type.TInteger;
  chatDock: Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>;
}>;
type BoardTab = Static<typeof BoardTabSchema>;
declare const BoardWidgetDeclaredSchema: Type.TObject<{
  netOrigins: Type.TOptional<Type.TArray<Type.TString>>;
  tools: Type.TOptional<Type.TArray<Type.TString>>;
}>;
type BoardWidgetDeclared = Static<typeof BoardWidgetDeclaredSchema>;
declare const BoardWidgetSchema: Type.TObject<{
  name: Type.TString;
  tabId: Type.TString;
  title: Type.TOptional<Type.TString>;
  contentKind: Type.TUnion<[Type.TLiteral<"html">, Type.TLiteral<"mcp-app">, Type.TLiteral<"plugin">]>;
  pluginKind: Type.TOptional<Type.TString>;
  props: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  presentation: Type.TOptional<Type.TUnion<[Type.TLiteral<"card">, Type.TLiteral<"full-bleed">, Type.TLiteral<"frameless">]>>;
  heightMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"fixed">]>>;
  sizeW: Type.TInteger;
  sizeH: Type.TInteger;
  position: Type.TInteger;
  grantState: Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"pending">, Type.TLiteral<"granted">, Type.TLiteral<"rejected">]>;
  revision: Type.TInteger;
  instanceId: Type.TOptional<Type.TString>;
  declaredSummary: Type.TOptional<Type.TArray<Type.TString>>;
  declared: Type.TOptional<Type.TObject<{
    netOrigins: Type.TOptional<Type.TArray<Type.TString>>;
    tools: Type.TOptional<Type.TArray<Type.TString>>;
  }>>;
  frameUrl: Type.TOptional<Type.TString>;
  viewTicket: Type.TOptional<Type.TString>;
  viewTicketTtlMs: Type.TOptional<Type.TInteger>;
  viewGeneration: Type.TOptional<Type.TString>;
  sandboxUrl: Type.TOptional<Type.TString>;
  sandboxPort: Type.TOptional<Type.TInteger>;
  sandboxOrigin: Type.TOptional<Type.TString>;
}>;
type BoardWidget = Static<typeof BoardWidgetSchema>;
declare const BoardSnapshotSchema: Type.TObject<{
  sessionKey: Type.TString;
  revision: Type.TInteger;
  tabs: Type.TArray<Type.TObject<{
    tabId: Type.TString;
    title: Type.TString;
    position: Type.TInteger;
    chatDock: Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>;
  }>>;
  widgets: Type.TArray<Type.TObject<{
    name: Type.TString;
    tabId: Type.TString;
    title: Type.TOptional<Type.TString>;
    contentKind: Type.TUnion<[Type.TLiteral<"html">, Type.TLiteral<"mcp-app">, Type.TLiteral<"plugin">]>;
    pluginKind: Type.TOptional<Type.TString>;
    props: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    presentation: Type.TOptional<Type.TUnion<[Type.TLiteral<"card">, Type.TLiteral<"full-bleed">, Type.TLiteral<"frameless">]>>;
    heightMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"fixed">]>>;
    sizeW: Type.TInteger;
    sizeH: Type.TInteger;
    position: Type.TInteger;
    grantState: Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"pending">, Type.TLiteral<"granted">, Type.TLiteral<"rejected">]>;
    revision: Type.TInteger;
    instanceId: Type.TOptional<Type.TString>;
    declaredSummary: Type.TOptional<Type.TArray<Type.TString>>;
    declared: Type.TOptional<Type.TObject<{
      netOrigins: Type.TOptional<Type.TArray<Type.TString>>;
      tools: Type.TOptional<Type.TArray<Type.TString>>;
    }>>;
    frameUrl: Type.TOptional<Type.TString>;
    viewTicket: Type.TOptional<Type.TString>;
    viewTicketTtlMs: Type.TOptional<Type.TInteger>;
    viewGeneration: Type.TOptional<Type.TString>;
    sandboxUrl: Type.TOptional<Type.TString>;
    sandboxPort: Type.TOptional<Type.TInteger>;
    sandboxOrigin: Type.TOptional<Type.TString>;
  }>>;
}>;
type BoardSnapshot = Static<typeof BoardSnapshotSchema>;
declare const BoardTabCreateOpSchema: Type.TObject<{
  kind: Type.TLiteral<"tab_create">;
  tabId: Type.TString;
  title: Type.TString;
  chatDock: Type.TOptional<Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>>;
}>;
declare const BoardTabUpdateOpSchema: Type.TObject<{
  kind: Type.TLiteral<"tab_update">;
  tabId: Type.TString;
  title: Type.TOptional<Type.TString>;
  chatDock: Type.TOptional<Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>>;
  position: Type.TOptional<Type.TInteger>;
}>;
declare const BoardTabDeleteOpSchema: Type.TObject<{
  kind: Type.TLiteral<"tab_delete">;
  tabId: Type.TString;
}>;
declare const BoardTabsReorderOpSchema: Type.TObject<{
  kind: Type.TLiteral<"tabs_reorder">;
  tabIds: Type.TArray<Type.TString>;
}>;
declare const BoardWidgetMoveOpSchema: Type.TObject<{
  kind: Type.TLiteral<"widget_move">;
  name: Type.TString;
  tabId: Type.TOptional<Type.TString>;
  position: Type.TOptional<Type.TInteger>;
  after: Type.TOptional<Type.TString>;
}>;
declare const BoardWidgetResizeOpSchema: Type.TObject<{
  kind: Type.TLiteral<"widget_resize">;
  name: Type.TString;
  sizeW: Type.TInteger;
  sizeH: Type.TInteger;
  heightMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"fixed">]>>;
}>;
declare const BoardWidgetRemoveOpSchema: Type.TObject<{
  kind: Type.TLiteral<"widget_remove">;
  name: Type.TString;
}>;
declare const BoardOpSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"tab_create">;
  tabId: Type.TString;
  title: Type.TString;
  chatDock: Type.TOptional<Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"tab_update">;
  tabId: Type.TString;
  title: Type.TOptional<Type.TString>;
  chatDock: Type.TOptional<Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>>;
  position: Type.TOptional<Type.TInteger>;
}>, Type.TObject<{
  kind: Type.TLiteral<"tab_delete">;
  tabId: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"tabs_reorder">;
  tabIds: Type.TArray<Type.TString>;
}>, Type.TObject<{
  kind: Type.TLiteral<"widget_move">;
  name: Type.TString;
  tabId: Type.TOptional<Type.TString>;
  position: Type.TOptional<Type.TInteger>;
  after: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  kind: Type.TLiteral<"widget_resize">;
  name: Type.TString;
  sizeW: Type.TInteger;
  sizeH: Type.TInteger;
  heightMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"fixed">]>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"widget_remove">;
  name: Type.TString;
}>]>;
type BoardOp = Static<typeof BoardOpSchema>;
declare const BoardGetParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
}>;
type BoardGetParams = Static<typeof BoardGetParamsSchema>;
declare const BoardUpdateParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  ops: Type.TArray<Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"tab_create">;
    tabId: Type.TString;
    title: Type.TString;
    chatDock: Type.TOptional<Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"tab_update">;
    tabId: Type.TString;
    title: Type.TOptional<Type.TString>;
    chatDock: Type.TOptional<Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>>;
    position: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"tab_delete">;
    tabId: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"tabs_reorder">;
    tabIds: Type.TArray<Type.TString>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"widget_move">;
    name: Type.TString;
    tabId: Type.TOptional<Type.TString>;
    position: Type.TOptional<Type.TInteger>;
    after: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"widget_resize">;
    name: Type.TString;
    sizeW: Type.TInteger;
    sizeH: Type.TInteger;
    heightMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"fixed">]>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"widget_remove">;
    name: Type.TString;
  }>]>>;
}>;
type BoardUpdateParams = Static<typeof BoardUpdateParamsSchema>;
declare const BoardMcpAppDescriptorSchema: Type.TObject<{
  serverName: Type.TString;
  toolName: Type.TString;
  uiResourceUri: Type.TString;
  toolCallId: Type.TString;
}>;
type BoardMcpAppDescriptor = Static<typeof BoardMcpAppDescriptorSchema>;
declare const BoardWidgetHtmlContentSchema: Type.TObject<{
  kind: Type.TLiteral<"html">;
  html: Type.TString;
}>;
declare const BoardWidgetMcpAppContentSchema: Type.TObject<{
  kind: Type.TLiteral<"mcp-app">;
  descriptor: Type.TObject<{
    serverName: Type.TString;
    toolName: Type.TString;
    uiResourceUri: Type.TString;
    toolCallId: Type.TString;
  }>;
}>;
declare const BoardWidgetMcpAppPutContentSchema: Type.TObject<{
  kind: Type.TLiteral<"mcp-app">;
  viewId: Type.TString;
}>;
declare const BoardWidgetPluginContentSchema: Type.TObject<{
  kind: Type.TLiteral<"plugin">;
  pluginKind: Type.TString;
  props: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
}>;
declare const BoardWidgetContentSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"html">;
  html: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"mcp-app">;
  descriptor: Type.TObject<{
    serverName: Type.TString;
    toolName: Type.TString;
    uiResourceUri: Type.TString;
    toolCallId: Type.TString;
  }>;
}>, Type.TObject<{
  kind: Type.TLiteral<"plugin">;
  pluginKind: Type.TString;
  props: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
}>]>;
type BoardWidgetContent = Static<typeof BoardWidgetContentSchema>;
type BoardWidgetMaterializedContent = Static<typeof BoardWidgetHtmlContentSchema> | (Static<typeof BoardWidgetMcpAppContentSchema> & {
  interactive: boolean;
}) | Static<typeof BoardWidgetPluginContentSchema>;
declare const BoardCanvasDocumentSourceSchema: Type.TObject<{
  kind: Type.TLiteral<"canvas-doc">;
  docId: Type.TString;
}>;
type BoardCanvasDocumentSource = Static<typeof BoardCanvasDocumentSourceSchema>;
declare const BoardWidgetPutContentSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"html">;
  html: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"mcp-app">;
  viewId: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"plugin">;
  pluginKind: Type.TString;
  props: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
}>, Type.TObject<{
  kind: Type.TLiteral<"canvas-doc">;
  docId: Type.TString;
}>]>;
type BoardWidgetPutContent = Static<typeof BoardWidgetPutContentSchema>;
declare const BoardWidgetPutParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  name: Type.TString;
  title: Type.TOptional<Type.TString>;
  content: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"html">;
    html: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"mcp-app">;
    viewId: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"plugin">;
    pluginKind: Type.TString;
    props: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"canvas-doc">;
    docId: Type.TString;
  }>]>;
  presentation: Type.TOptional<Type.TUnion<[Type.TLiteral<"card">, Type.TLiteral<"full-bleed">, Type.TLiteral<"frameless">]>>;
  heightMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"fixed">]>>;
  placement: Type.TOptional<Type.TObject<{
    tabId: Type.TOptional<Type.TString>;
    size: Type.TOptional<Type.TUnion<[Type.TLiteral<"sm">, Type.TLiteral<"md">, Type.TLiteral<"lg">, Type.TLiteral<"xl">, Type.TLiteral<"full">]>>;
    after: Type.TOptional<Type.TString>;
  }>>;
  declared: Type.TOptional<Type.TObject<{
    netOrigins: Type.TOptional<Type.TArray<Type.TString>>;
    tools: Type.TOptional<Type.TArray<Type.TString>>;
  }>>;
  generatedIdentity: Type.TOptional<Type.TObject<{
    source: Type.TLiteral<"show_widget">;
    key: Type.TString;
    fallbackName: Type.TString;
  }>>;
}>;
type BoardWidgetPutParams = Static<typeof BoardWidgetPutParamsSchema>;
/** Materialized input accepted by the board store after gateway source resolution. */
type BoardWidgetMaterializedPutParams = Omit<BoardWidgetPutParams, "content"> & {
  content: BoardWidgetMaterializedContent;
};
declare const BoardWidgetPutResultSchema: Type.TObject<{
  resolvedWidgetName: Type.TString;
  sessionKey: Type.TString;
  revision: Type.TInteger;
  tabs: Type.TArray<Type.TObject<{
    tabId: Type.TString;
    title: Type.TString;
    position: Type.TInteger;
    chatDock: Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>;
  }>>;
  widgets: Type.TArray<Type.TObject<{
    name: Type.TString;
    tabId: Type.TString;
    title: Type.TOptional<Type.TString>;
    contentKind: Type.TUnion<[Type.TLiteral<"html">, Type.TLiteral<"mcp-app">, Type.TLiteral<"plugin">]>;
    pluginKind: Type.TOptional<Type.TString>;
    props: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    presentation: Type.TOptional<Type.TUnion<[Type.TLiteral<"card">, Type.TLiteral<"full-bleed">, Type.TLiteral<"frameless">]>>;
    heightMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"auto">, Type.TLiteral<"fixed">]>>;
    sizeW: Type.TInteger;
    sizeH: Type.TInteger;
    position: Type.TInteger;
    grantState: Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"pending">, Type.TLiteral<"granted">, Type.TLiteral<"rejected">]>;
    revision: Type.TInteger;
    instanceId: Type.TOptional<Type.TString>;
    declaredSummary: Type.TOptional<Type.TArray<Type.TString>>;
    declared: Type.TOptional<Type.TObject<{
      netOrigins: Type.TOptional<Type.TArray<Type.TString>>;
      tools: Type.TOptional<Type.TArray<Type.TString>>;
    }>>;
    frameUrl: Type.TOptional<Type.TString>;
    viewTicket: Type.TOptional<Type.TString>;
    viewTicketTtlMs: Type.TOptional<Type.TInteger>;
    viewGeneration: Type.TOptional<Type.TString>;
    sandboxUrl: Type.TOptional<Type.TString>;
    sandboxPort: Type.TOptional<Type.TInteger>;
    sandboxOrigin: Type.TOptional<Type.TString>;
  }>>;
}>;
type BoardWidgetPutResult = Static<typeof BoardWidgetPutResultSchema>;
declare const BoardWidgetGrantParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  name: Type.TString;
  decision: Type.TUnion<[Type.TLiteral<"granted">, Type.TLiteral<"rejected">]>;
  revision: Type.TInteger;
  instanceId: Type.TString;
}>;
type BoardWidgetGrantParams = Static<typeof BoardWidgetGrantParamsSchema>;
declare const BoardWidgetAppViewParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  name: Type.TString;
  revision: Type.TInteger;
  instanceId: Type.TString;
}>;
type BoardWidgetAppViewParams = Static<typeof BoardWidgetAppViewParamsSchema>;
declare const BoardWidgetAppViewResultSchema: Type.TObject<{
  viewId: Type.TString;
  expiresAtMs: Type.TInteger;
}>;
type BoardWidgetAppViewResult = Static<typeof BoardWidgetAppViewResultSchema>;
declare const BoardViewTicketSchema: Type.TString;
declare const BoardLegacyEventParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  widget: Type.TString;
  payload: Type.TUnknown;
}>;
declare const BoardTicketEventParamsSchema: Type.TObject<{
  ticket: Type.TString;
  payload: Type.TUnknown;
}>;
declare const BoardEventParamsSchema: Type.TUnion<[Type.TObject<{
  sessionKey: Type.TString;
  widget: Type.TString;
  payload: Type.TUnknown;
}>, Type.TObject<{
  ticket: Type.TString;
  payload: Type.TUnknown;
}>]>;
type BoardEventParams = Static<typeof BoardEventParamsSchema>;
declare const BoardPromptAuthorizeParamsSchema: Type.TObject<{
  ticket: Type.TString;
}>;
type BoardPromptAuthorizeParams = Static<typeof BoardPromptAuthorizeParamsSchema>;
declare const BoardDataReadParamsSchema: Type.TObject<{
  ticket: Type.TString;
  bindingId: Type.TString;
  params: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
}>;
type BoardDataReadParams = Static<typeof BoardDataReadParamsSchema>;
declare const BoardCronActionParamsSchema: Type.TObject<{
  ticket: Type.TString;
  action: Type.TLiteral<"cron.trigger">;
  jobId: Type.TString;
}>;
declare const BoardPluginActionParamsSchema: Type.TObject<{
  ticket: Type.TString;
  action: Type.TString;
  params: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
}>;
declare const BoardActionParamsSchema: Type.TUnion<[Type.TObject<{
  ticket: Type.TString;
  action: Type.TLiteral<"cron.trigger">;
  jobId: Type.TString;
}>, Type.TObject<{
  ticket: Type.TString;
  action: Type.TString;
  params: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
}>]>;
type BoardActionParams = Static<typeof BoardActionParamsSchema>;
declare const BoardChangedEventSchema: Type.TObject<{
  sessionKey: Type.TString;
  revision: Type.TInteger;
  widget: Type.TOptional<Type.TString>;
}>;
type BoardChangedEvent = Static<typeof BoardChangedEventSchema>;
declare const BoardFocusTabCommandSchema: Type.TObject<{
  kind: Type.TLiteral<"focus_tab">;
  tabId: Type.TString;
}>;
declare const BoardSetChatDockCommandSchema: Type.TObject<{
  kind: Type.TLiteral<"set_chat_dock">;
  dock: Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>;
}>;
declare const BoardCommandSchema: Type.TUnion<[Type.TObject<{
  kind: Type.TLiteral<"focus_tab">;
  tabId: Type.TString;
}>, Type.TObject<{
  kind: Type.TLiteral<"set_chat_dock">;
  dock: Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>;
}>]>;
type BoardCommand = Static<typeof BoardCommandSchema>;
declare const BoardCommandEventSchema: Type.TObject<{
  sessionKey: Type.TString;
  command: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"focus_tab">;
    tabId: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"set_chat_dock">;
    dock: Type.TUnion<[Type.TLiteral<"left">, Type.TLiteral<"right">, Type.TLiteral<"bottom">, Type.TLiteral<"hidden">]>;
  }>]>;
}>;
type BoardCommandEvent = Static<typeof BoardCommandEventSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-row.d.ts
declare const SessionToolOverridesSchema: Type.TObject<{
  mcpServers: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
  mcpToolsDeny: Type.TOptional<Type.TRecord<"^.*$", Type.TArray<Type.TString>>>;
  skills: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
  webSearch: Type.TOptional<Type.TBoolean>;
}>;
/** Projected actor that caused a session node to be created. */
declare const SessionCreatedActorSchema: Type.TObject<{
  type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
  id: Type.TOptional<Type.TString>;
  label: Type.TOptional<Type.TString>; /** Durable profile avatar route; absent for actors without a stored profile avatar. */
  avatarUrl: Type.TOptional<Type.TString>;
}>;
/** Stable Gateway session row fields; mutation envelopes may add null tombstones. */
declare const SessionRowSchema: Type.TObject<{
  key: Type.TString;
  sessionId: Type.TOptional<Type.TString>;
  incognito: Type.TOptional<Type.TLiteral<true>>;
  kind: Type.TUnion<[Type.TLiteral<"direct">, Type.TLiteral<"group">, Type.TLiteral<"global">, Type.TLiteral<"unknown">]>;
  label: Type.TOptional<Type.TString>;
  boardFace: Type.TOptional<Type.TUnion<[Type.TLiteral<"chat">, Type.TLiteral<"dashboard">]>>;
  displayName: Type.TOptional<Type.TString>;
  derivedTitle: Type.TOptional<Type.TString>;
  lastMessagePreview: Type.TOptional<Type.TString>;
  channel: Type.TOptional<Type.TString>;
  chatType: Type.TOptional<Type.TUnion<[Type.TLiteral<"direct">, Type.TLiteral<"group">, Type.TLiteral<"channel">]>>;
  updatedAt: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
  archived: Type.TOptional<Type.TBoolean>;
  archivedAt: Type.TOptional<Type.TNumber>;
  archivedBy: Type.TOptional<Type.TObject<{
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
    label: Type.TOptional<Type.TString>; /** Durable profile avatar route; absent for actors without a stored profile avatar. */
    avatarUrl: Type.TOptional<Type.TString>;
  }>>;
  pinned: Type.TOptional<Type.TBoolean>;
  pinnedAt: Type.TOptional<Type.TNumber>;
  icon: Type.TOptional<Type.TString>;
  unread: Type.TOptional<Type.TBoolean>;
  lastReadAt: Type.TOptional<Type.TNumber>;
  lastActivityAt: Type.TOptional<Type.TNumber>;
  lastInteractionAt: Type.TOptional<Type.TNumber>;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"failed">, Type.TLiteral<"killed">, Type.TLiteral<"timeout">]>>;
  lastRunError: Type.TOptional<Type.TString>;
  activeLeafEntryId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  spawnedBy: Type.TOptional<Type.TString>;
  parentSessionKey: Type.TOptional<Type.TString>;
  controlOwnerSessionKey: Type.TOptional<Type.TString>;
  childSessions: Type.TOptional<Type.TArray<Type.TString>>;
  forkedFromParent: Type.TOptional<Type.TBoolean>;
  spawnDepth: Type.TOptional<Type.TNumber>;
  subagentRole: Type.TOptional<Type.TUnion<[Type.TLiteral<"orchestrator">, Type.TLiteral<"leaf">]>>;
  subagentControlScope: Type.TOptional<Type.TUnion<[Type.TLiteral<"children">, Type.TLiteral<"none">]>>;
  swarmGroupId: Type.TOptional<Type.TString>;
  worktree: Type.TOptional<Type.TObject<{
    id: Type.TString;
    branch: Type.TString;
    repoRoot: Type.TString;
  }>>;
  execNode: Type.TOptional<Type.TString>;
  execCwd: Type.TOptional<Type.TString>;
  spawnedWorkspaceDir: Type.TOptional<Type.TString>;
  spawnedCwd: Type.TOptional<Type.TString>;
  createdVia: Type.TOptional<Type.TUnion<[Type.TLiteral<"operator">, Type.TLiteral<"spawn">, Type.TLiteral<"channel">, Type.TLiteral<"cron">, Type.TLiteral<"talk">, Type.TLiteral<"run">, Type.TLiteral<"plugin">, Type.TLiteral<"internal">]>>;
  createdActor: Type.TOptional<Type.TObject<{
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
    label: Type.TOptional<Type.TString>; /** Durable profile avatar route; absent for actors without a stored profile avatar. */
    avatarUrl: Type.TOptional<Type.TString>;
  }>>;
  visibility: Type.TOptional<Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>>;
  sharingRole: Type.TOptional<Type.TUnion<[Type.TLiteral<"admin">, Type.TLiteral<"owner">, Type.TLiteral<"member">, Type.TLiteral<"viewer">]>>;
  createdAt: Type.TOptional<Type.TNumber>;
  forkSource: Type.TOptional<Type.TObject<{
    sessionKey: Type.TString;
    sessionId: Type.TString;
    entryId: Type.TOptional<Type.TString>;
  }>>;
  previousSessionId: Type.TOptional<Type.TString>;
  inputTokens: Type.TOptional<Type.TNumber>;
  outputTokens: Type.TOptional<Type.TNumber>;
  totalTokens: Type.TOptional<Type.TNumber>;
  totalTokensFresh: Type.TOptional<Type.TBoolean>;
  contextTokens: Type.TOptional<Type.TNumber>;
  estimatedCostUsd: Type.TOptional<Type.TNumber>;
  model: Type.TOptional<Type.TString>;
  modelProvider: Type.TOptional<Type.TString>;
  toolOverrides: Type.TOptional<Type.TObject<{
    mcpServers: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
    mcpToolsDeny: Type.TOptional<Type.TRecord<"^.*$", Type.TArray<Type.TString>>>;
    skills: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
    webSearch: Type.TOptional<Type.TBoolean>;
  }>>;
}>;
type SessionCreatedActor = Static<typeof SessionCreatedActorSchema>;
type SessionToolOverrides = Static<typeof SessionToolOverridesSchema>;
type SessionRow = Static<typeof SessionRowSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-suggestions.d.ts
declare const SessionSuggestionStateSchema: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"dismissed">]>;
declare const SessionSuggestionResolutionSchema: Type.TUnion<[Type.TLiteral<"send">, Type.TLiteral<"queue">, Type.TLiteral<"edit">, Type.TLiteral<"dismiss">]>;
declare const SessionSuggestionActionSchema: Type.TUnion<[Type.TLiteral<"added">, Type.TLiteral<"resolved">]>;
declare const SessionSuggestionSchema: Type.TObject<{
  id: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TString;
  author: Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    label: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>;
  text: Type.TString;
  createdAt: Type.TInteger;
  state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"dismissed">]>;
}>;
declare const SessionSuggestionsAddParamsSchema: Type.TObject<{
  text: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionSuggestionsListParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionSuggestionsResolveParamsSchema: Type.TObject<{
  id: Type.TString;
  resolution: Type.TUnion<[Type.TLiteral<"send">, Type.TLiteral<"queue">, Type.TLiteral<"edit">, Type.TLiteral<"dismiss">]>;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionSuggestionsAddResultSchema: Type.TObject<{
  suggestion: Type.TObject<{
    id: Type.TString;
    sessionKey: Type.TString;
    agentId: Type.TString;
    author: Type.TObject<{
      id: Type.TString;
      type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      label: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>;
    text: Type.TString;
    createdAt: Type.TInteger;
    state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"dismissed">]>;
  }>;
}>;
declare const SessionSuggestionsListResultSchema: Type.TObject<{
  suggestions: Type.TArray<Type.TObject<{
    id: Type.TString;
    sessionKey: Type.TString;
    agentId: Type.TString;
    author: Type.TObject<{
      id: Type.TString;
      type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      label: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>;
    text: Type.TString;
    createdAt: Type.TInteger;
    state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"dismissed">]>;
  }>>;
  role: Type.TUnion<[Type.TLiteral<"admin">, Type.TLiteral<"owner">, Type.TLiteral<"member">, Type.TLiteral<"viewer">]>;
}>;
declare const SessionSuggestionsResolveResultSchema: Type.TObject<{
  suggestion: Type.TObject<{
    id: Type.TString;
    sessionKey: Type.TString;
    agentId: Type.TString;
    author: Type.TObject<{
      id: Type.TString;
      type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      label: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>;
    text: Type.TString;
    createdAt: Type.TInteger;
    state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"dismissed">]>;
  }>;
}>;
declare const SessionSuggestionEventSchema: Type.TObject<{
  action: Type.TUnion<[Type.TLiteral<"added">, Type.TLiteral<"resolved">]>;
  suggestion: Type.TObject<{
    id: Type.TString;
    sessionKey: Type.TString;
    agentId: Type.TString;
    author: Type.TObject<{
      id: Type.TString;
      type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      label: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>;
    text: Type.TString;
    createdAt: Type.TInteger;
    state: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"dismissed">]>;
  }>;
}>;
declare const SessionTypingParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  typing: Type.TBoolean;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionTypingResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  broadcast: Type.TBoolean;
}>;
declare const SessionTypingEventSchema: Type.TObject<{
  sessionKey: Type.TString;
  sessionId: Type.TString;
  agentId: Type.TString;
  actor: Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    label: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>;
  typing: Type.TBoolean;
  ts: Type.TInteger;
}>;
type SessionSuggestionState = Static<typeof SessionSuggestionStateSchema>;
type SessionSuggestionResolution = Static<typeof SessionSuggestionResolutionSchema>;
type SessionSuggestionAction = Static<typeof SessionSuggestionActionSchema>;
type SessionSuggestion = Static<typeof SessionSuggestionSchema>;
type SessionSuggestionsAddParams = Static<typeof SessionSuggestionsAddParamsSchema>;
type SessionSuggestionsListParams = Static<typeof SessionSuggestionsListParamsSchema>;
type SessionSuggestionsResolveParams = Static<typeof SessionSuggestionsResolveParamsSchema>;
type SessionSuggestionsAddResult = Static<typeof SessionSuggestionsAddResultSchema>;
type SessionSuggestionsListResult = Static<typeof SessionSuggestionsListResultSchema>;
type SessionSuggestionsResolveResult = Static<typeof SessionSuggestionsResolveResultSchema>;
type SessionSuggestionEvent = Static<typeof SessionSuggestionEventSchema>;
type SessionTypingParams = Static<typeof SessionTypingParamsSchema>;
type SessionTypingResult = Static<typeof SessionTypingResultSchema>;
type SessionTypingEvent = Static<typeof SessionTypingEventSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/migrations.d.ts
declare const MAX_MEMORY_MIGRATION_ITEMS = 2000;
declare const MemoryMigrationItemSchema: Type.TObject<{
  id: Type.TString;
  status: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
  source: Type.TOptional<Type.TString>;
  target: Type.TOptional<Type.TString>;
  message: Type.TOptional<Type.TString>;
  reason: Type.TOptional<Type.TString>;
  details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
}>;
declare const MemoryMigrationProviderPlanSchema: Type.TObject<{
  providerId: Type.TString;
  label: Type.TString;
  description: Type.TOptional<Type.TString>;
  planFingerprint: Type.TOptional<Type.TString>;
  found: Type.TBoolean;
  source: Type.TOptional<Type.TString>;
  target: Type.TOptional<Type.TString>;
  confidence: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
  message: Type.TOptional<Type.TString>;
  error: Type.TOptional<Type.TString>;
  summary: Type.TObject<{
    total: Type.TInteger;
    planned: Type.TInteger;
    migrated: Type.TInteger;
    skipped: Type.TInteger;
    conflicts: Type.TInteger;
    errors: Type.TInteger;
    sensitive: Type.TInteger;
  }>;
  items: Type.TArray<Type.TObject<{
    id: Type.TString;
    status: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
    source: Type.TOptional<Type.TString>;
    target: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    reason: Type.TOptional<Type.TString>;
    details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  }>>;
  warnings: Type.TOptional<Type.TArray<Type.TString>>;
}>;
declare const MigrationsMemoryPlanParamsSchema: Type.TObject<{
  agentId: Type.TString;
  overwrite: Type.TOptional<Type.TBoolean>;
}>;
declare const MigrationsMemoryPlanResultSchema: Type.TObject<{
  agentId: Type.TString;
  workspace: Type.TString;
  providers: Type.TArray<Type.TObject<{
    providerId: Type.TString;
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
    planFingerprint: Type.TOptional<Type.TString>;
    found: Type.TBoolean;
    source: Type.TOptional<Type.TString>;
    target: Type.TOptional<Type.TString>;
    confidence: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
    message: Type.TOptional<Type.TString>;
    error: Type.TOptional<Type.TString>;
    summary: Type.TObject<{
      total: Type.TInteger;
      planned: Type.TInteger;
      migrated: Type.TInteger;
      skipped: Type.TInteger;
      conflicts: Type.TInteger;
      errors: Type.TInteger;
      sensitive: Type.TInteger;
    }>;
    items: Type.TArray<Type.TObject<{
      id: Type.TString;
      status: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
      source: Type.TOptional<Type.TString>;
      target: Type.TOptional<Type.TString>;
      message: Type.TOptional<Type.TString>;
      reason: Type.TOptional<Type.TString>;
      details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    }>>;
    warnings: Type.TOptional<Type.TArray<Type.TString>>;
  }>>;
}>;
declare const MigrationsMemoryApplyParamsSchema: Type.TObject<{
  idempotencyKey: Type.TString;
  agentId: Type.TString;
  providerId: Type.TString;
  planFingerprint: Type.TString;
  itemIds: Type.TArray<Type.TString>;
  overwrite: Type.TOptional<Type.TBoolean>;
}>;
declare const MigrationsMemoryApplyResultSchema: Type.TObject<{
  providerId: Type.TString;
  source: Type.TString;
  target: Type.TOptional<Type.TString>;
  summary: Type.TObject<{
    total: Type.TInteger;
    planned: Type.TInteger;
    migrated: Type.TInteger;
    skipped: Type.TInteger;
    conflicts: Type.TInteger;
    errors: Type.TInteger;
    sensitive: Type.TInteger;
  }>;
  items: Type.TArray<Type.TObject<{
    id: Type.TString;
    status: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
    source: Type.TOptional<Type.TString>;
    target: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    reason: Type.TOptional<Type.TString>;
    details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  }>>;
  warnings: Type.TOptional<Type.TArray<Type.TString>>;
  backupPath: Type.TOptional<Type.TString>;
  reportDir: Type.TOptional<Type.TString>;
}>;
declare const MigrationProtocolSchemas: {
  readonly MemoryMigrationItemStatus: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
  readonly MemoryMigrationItem: Type.TObject<{
    id: Type.TString;
    status: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
    source: Type.TOptional<Type.TString>;
    target: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    reason: Type.TOptional<Type.TString>;
    details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  }>;
  readonly MemoryMigrationSummary: Type.TObject<{
    total: Type.TInteger;
    planned: Type.TInteger;
    migrated: Type.TInteger;
    skipped: Type.TInteger;
    conflicts: Type.TInteger;
    errors: Type.TInteger;
    sensitive: Type.TInteger;
  }>;
  readonly MemoryMigrationProviderPlan: Type.TObject<{
    providerId: Type.TString;
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
    planFingerprint: Type.TOptional<Type.TString>;
    found: Type.TBoolean;
    source: Type.TOptional<Type.TString>;
    target: Type.TOptional<Type.TString>;
    confidence: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
    message: Type.TOptional<Type.TString>;
    error: Type.TOptional<Type.TString>;
    summary: Type.TObject<{
      total: Type.TInteger;
      planned: Type.TInteger;
      migrated: Type.TInteger;
      skipped: Type.TInteger;
      conflicts: Type.TInteger;
      errors: Type.TInteger;
      sensitive: Type.TInteger;
    }>;
    items: Type.TArray<Type.TObject<{
      id: Type.TString;
      status: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
      source: Type.TOptional<Type.TString>;
      target: Type.TOptional<Type.TString>;
      message: Type.TOptional<Type.TString>;
      reason: Type.TOptional<Type.TString>;
      details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    }>>;
    warnings: Type.TOptional<Type.TArray<Type.TString>>;
  }>;
  readonly MigrationsMemoryPlanParams: Type.TObject<{
    agentId: Type.TString;
    overwrite: Type.TOptional<Type.TBoolean>;
  }>;
  readonly MigrationsMemoryPlanResult: Type.TObject<{
    agentId: Type.TString;
    workspace: Type.TString;
    providers: Type.TArray<Type.TObject<{
      providerId: Type.TString;
      label: Type.TString;
      description: Type.TOptional<Type.TString>;
      planFingerprint: Type.TOptional<Type.TString>;
      found: Type.TBoolean;
      source: Type.TOptional<Type.TString>;
      target: Type.TOptional<Type.TString>;
      confidence: Type.TOptional<Type.TUnion<[Type.TLiteral<"low">, Type.TLiteral<"medium">, Type.TLiteral<"high">]>>;
      message: Type.TOptional<Type.TString>;
      error: Type.TOptional<Type.TString>;
      summary: Type.TObject<{
        total: Type.TInteger;
        planned: Type.TInteger;
        migrated: Type.TInteger;
        skipped: Type.TInteger;
        conflicts: Type.TInteger;
        errors: Type.TInteger;
        sensitive: Type.TInteger;
      }>;
      items: Type.TArray<Type.TObject<{
        id: Type.TString;
        status: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
        source: Type.TOptional<Type.TString>;
        target: Type.TOptional<Type.TString>;
        message: Type.TOptional<Type.TString>;
        reason: Type.TOptional<Type.TString>;
        details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
      }>>;
      warnings: Type.TOptional<Type.TArray<Type.TString>>;
    }>>;
  }>;
  readonly MigrationsMemoryApplyParams: Type.TObject<{
    idempotencyKey: Type.TString;
    agentId: Type.TString;
    providerId: Type.TString;
    planFingerprint: Type.TString;
    itemIds: Type.TArray<Type.TString>;
    overwrite: Type.TOptional<Type.TBoolean>;
  }>;
  readonly MigrationsMemoryApplyResult: Type.TObject<{
    providerId: Type.TString;
    source: Type.TString;
    target: Type.TOptional<Type.TString>;
    summary: Type.TObject<{
      total: Type.TInteger;
      planned: Type.TInteger;
      migrated: Type.TInteger;
      skipped: Type.TInteger;
      conflicts: Type.TInteger;
      errors: Type.TInteger;
      sensitive: Type.TInteger;
    }>;
    items: Type.TArray<Type.TObject<{
      id: Type.TString;
      status: Type.TUnion<[Type.TLiteral<"planned">, Type.TLiteral<"migrated">, Type.TLiteral<"skipped">, Type.TLiteral<"warning">, Type.TLiteral<"conflict">, Type.TLiteral<"error">]>;
      source: Type.TOptional<Type.TString>;
      target: Type.TOptional<Type.TString>;
      message: Type.TOptional<Type.TString>;
      reason: Type.TOptional<Type.TString>;
      details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    }>>;
    warnings: Type.TOptional<Type.TArray<Type.TString>>;
    backupPath: Type.TOptional<Type.TString>;
    reportDir: Type.TOptional<Type.TString>;
  }>;
};
type MemoryMigrationItem = Static<typeof MemoryMigrationItemSchema>;
type MemoryMigrationProviderPlan = Static<typeof MemoryMigrationProviderPlanSchema>;
type MigrationsMemoryPlanResult = Static<typeof MigrationsMemoryPlanResultSchema>;
type MigrationsMemoryApplyResult = Static<typeof MigrationsMemoryApplyResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-catalog.d.ts
declare const SessionCatalogLocatorSchema: Type.TObject<{
  catalogId: Type.TString;
  hostId: Type.TString;
  threadId: Type.TString;
}>;
declare const SessionCatalogCapabilitiesSchema: Type.TObject<{
  continueSession: Type.TBoolean;
  archive: Type.TBoolean;
  createSession: Type.TOptional<Type.TObject<{
    model: Type.TString;
  }>>;
  openTerminal: Type.TOptional<Type.TBoolean>;
}>;
declare const SessionCatalogDescriptorSchema: Type.TObject<{
  id: Type.TString;
  label: Type.TString;
  capabilities: Type.TObject<{
    continueSession: Type.TBoolean;
    archive: Type.TBoolean;
    createSession: Type.TOptional<Type.TObject<{
      model: Type.TString;
    }>>;
    openTerminal: Type.TOptional<Type.TBoolean>;
  }>;
}>;
declare const SessionCatalogPullRequestSummarySchema: Type.TObject<{
  numbers: Type.TArray<Type.TInteger>;
  state: Type.TUnion<[Type.TLiteral<"open">, Type.TLiteral<"draft">, Type.TLiteral<"merged">, Type.TLiteral<"closed">]>;
}>;
declare const SessionCatalogSessionSchema: Type.TObject<{
  threadId: Type.TString;
  name: Type.TOptional<Type.TString>;
  cwd: Type.TOptional<Type.TString>;
  status: Type.TString;
  createdAt: Type.TOptional<Type.TNumber>;
  updatedAt: Type.TOptional<Type.TNumber>;
  recencyAt: Type.TOptional<Type.TNumber>;
  source: Type.TOptional<Type.TString>;
  modelProvider: Type.TOptional<Type.TString>;
  cliVersion: Type.TOptional<Type.TString>;
  gitBranch: Type.TOptional<Type.TString>;
  customGroup: Type.TOptional<Type.TString>;
  pullRequest: Type.TOptional<Type.TObject<{
    numbers: Type.TArray<Type.TInteger>;
    state: Type.TUnion<[Type.TLiteral<"open">, Type.TLiteral<"draft">, Type.TLiteral<"merged">, Type.TLiteral<"closed">]>;
  }>>;
  archived: Type.TBoolean;
  sessionKey: Type.TOptional<Type.TString>;
  createdActor: Type.TOptional<Type.TObject<{
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    id: Type.TOptional<Type.TString>;
    label: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>>;
  canContinue: Type.TBoolean;
  canArchive: Type.TBoolean;
  canOpenTerminal: Type.TOptional<Type.TBoolean>;
}>;
declare const SessionCatalogHostSchema: Type.TObject<{
  hostId: Type.TString;
  label: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"node">]>;
  connected: Type.TBoolean;
  nodeId: Type.TOptional<Type.TString>;
  sessions: Type.TArray<Type.TObject<{
    threadId: Type.TString;
    name: Type.TOptional<Type.TString>;
    cwd: Type.TOptional<Type.TString>;
    status: Type.TString;
    createdAt: Type.TOptional<Type.TNumber>;
    updatedAt: Type.TOptional<Type.TNumber>;
    recencyAt: Type.TOptional<Type.TNumber>;
    source: Type.TOptional<Type.TString>;
    modelProvider: Type.TOptional<Type.TString>;
    cliVersion: Type.TOptional<Type.TString>;
    gitBranch: Type.TOptional<Type.TString>;
    customGroup: Type.TOptional<Type.TString>;
    pullRequest: Type.TOptional<Type.TObject<{
      numbers: Type.TArray<Type.TInteger>;
      state: Type.TUnion<[Type.TLiteral<"open">, Type.TLiteral<"draft">, Type.TLiteral<"merged">, Type.TLiteral<"closed">]>;
    }>>;
    archived: Type.TBoolean;
    sessionKey: Type.TOptional<Type.TString>;
    createdActor: Type.TOptional<Type.TObject<{
      type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      id: Type.TOptional<Type.TString>;
      label: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>>;
    canContinue: Type.TBoolean;
    canArchive: Type.TBoolean;
    canOpenTerminal: Type.TOptional<Type.TBoolean>;
  }>>;
  nextCursor: Type.TOptional<Type.TString>;
  error: Type.TOptional<Type.TObject<{
    code: Type.TString;
    message: Type.TString;
  }>>;
}>;
declare const SessionCatalogSchema: Type.TObject<{
  id: Type.TString;
  label: Type.TString;
  capabilities: Type.TObject<{
    continueSession: Type.TBoolean;
    archive: Type.TBoolean;
    createSession: Type.TOptional<Type.TObject<{
      model: Type.TString;
    }>>;
    openTerminal: Type.TOptional<Type.TBoolean>;
  }>;
  hosts: Type.TArray<Type.TObject<{
    hostId: Type.TString;
    label: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"node">]>;
    connected: Type.TBoolean;
    nodeId: Type.TOptional<Type.TString>;
    sessions: Type.TArray<Type.TObject<{
      threadId: Type.TString;
      name: Type.TOptional<Type.TString>;
      cwd: Type.TOptional<Type.TString>;
      status: Type.TString;
      createdAt: Type.TOptional<Type.TNumber>;
      updatedAt: Type.TOptional<Type.TNumber>;
      recencyAt: Type.TOptional<Type.TNumber>;
      source: Type.TOptional<Type.TString>;
      modelProvider: Type.TOptional<Type.TString>;
      cliVersion: Type.TOptional<Type.TString>;
      gitBranch: Type.TOptional<Type.TString>;
      customGroup: Type.TOptional<Type.TString>;
      pullRequest: Type.TOptional<Type.TObject<{
        numbers: Type.TArray<Type.TInteger>;
        state: Type.TUnion<[Type.TLiteral<"open">, Type.TLiteral<"draft">, Type.TLiteral<"merged">, Type.TLiteral<"closed">]>;
      }>>;
      archived: Type.TBoolean;
      sessionKey: Type.TOptional<Type.TString>;
      createdActor: Type.TOptional<Type.TObject<{
        type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
        id: Type.TOptional<Type.TString>;
        label: Type.TOptional<Type.TString>;
        avatarUrl: Type.TOptional<Type.TString>;
      }>>;
      canContinue: Type.TBoolean;
      canArchive: Type.TBoolean;
      canOpenTerminal: Type.TOptional<Type.TBoolean>;
    }>>;
    nextCursor: Type.TOptional<Type.TString>;
    error: Type.TOptional<Type.TObject<{
      code: Type.TString;
      message: Type.TString;
    }>>;
  }>>;
  error: Type.TOptional<Type.TObject<{
    code: Type.TString;
    message: Type.TString;
  }>>;
}>;
declare const SessionsCatalogListParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  progressId: Type.TOptional<Type.TString>;
  search: Type.TOptional<Type.TString>;
  limitPerHost: Type.TOptional<Type.TInteger>;
  hostIds: Type.TOptional<Type.TArray<Type.TString>>;
  catalogId: Type.TOptional<Type.TString>;
  cursors: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
}>;
declare const SessionsCatalogListResultSchema: Type.TObject<{
  catalogs: Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
    capabilities: Type.TObject<{
      continueSession: Type.TBoolean;
      archive: Type.TBoolean;
      createSession: Type.TOptional<Type.TObject<{
        model: Type.TString;
      }>>;
      openTerminal: Type.TOptional<Type.TBoolean>;
    }>;
    hosts: Type.TArray<Type.TObject<{
      hostId: Type.TString;
      label: Type.TString;
      kind: Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"node">]>;
      connected: Type.TBoolean;
      nodeId: Type.TOptional<Type.TString>;
      sessions: Type.TArray<Type.TObject<{
        threadId: Type.TString;
        name: Type.TOptional<Type.TString>;
        cwd: Type.TOptional<Type.TString>;
        status: Type.TString;
        createdAt: Type.TOptional<Type.TNumber>;
        updatedAt: Type.TOptional<Type.TNumber>;
        recencyAt: Type.TOptional<Type.TNumber>;
        source: Type.TOptional<Type.TString>;
        modelProvider: Type.TOptional<Type.TString>;
        cliVersion: Type.TOptional<Type.TString>;
        gitBranch: Type.TOptional<Type.TString>;
        customGroup: Type.TOptional<Type.TString>;
        pullRequest: Type.TOptional<Type.TObject<{
          numbers: Type.TArray<Type.TInteger>;
          state: Type.TUnion<[Type.TLiteral<"open">, Type.TLiteral<"draft">, Type.TLiteral<"merged">, Type.TLiteral<"closed">]>;
        }>>;
        archived: Type.TBoolean;
        sessionKey: Type.TOptional<Type.TString>;
        createdActor: Type.TOptional<Type.TObject<{
          type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
          id: Type.TOptional<Type.TString>;
          label: Type.TOptional<Type.TString>;
          avatarUrl: Type.TOptional<Type.TString>;
        }>>;
        canContinue: Type.TBoolean;
        canArchive: Type.TBoolean;
        canOpenTerminal: Type.TOptional<Type.TBoolean>;
      }>>;
      nextCursor: Type.TOptional<Type.TString>;
      error: Type.TOptional<Type.TObject<{
        code: Type.TString;
        message: Type.TString;
      }>>;
    }>>;
    error: Type.TOptional<Type.TObject<{
      code: Type.TString;
      message: Type.TString;
    }>>;
  }>>;
}>;
declare const SessionsCatalogHostEventSchema: Type.TObject<{
  progressId: Type.TString;
  agentId: Type.TString;
  catalog: Type.TObject<{
    hosts: Type.TArray<Type.TObject<{
      hostId: Type.TString;
      label: Type.TString;
      kind: Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"node">]>;
      connected: Type.TBoolean;
      nodeId: Type.TOptional<Type.TString>;
      sessions: Type.TArray<Type.TObject<{
        threadId: Type.TString;
        name: Type.TOptional<Type.TString>;
        cwd: Type.TOptional<Type.TString>;
        status: Type.TString;
        createdAt: Type.TOptional<Type.TNumber>;
        updatedAt: Type.TOptional<Type.TNumber>;
        recencyAt: Type.TOptional<Type.TNumber>;
        source: Type.TOptional<Type.TString>;
        modelProvider: Type.TOptional<Type.TString>;
        cliVersion: Type.TOptional<Type.TString>;
        gitBranch: Type.TOptional<Type.TString>;
        customGroup: Type.TOptional<Type.TString>;
        pullRequest: Type.TOptional<Type.TObject<{
          numbers: Type.TArray<Type.TInteger>;
          state: Type.TUnion<[Type.TLiteral<"open">, Type.TLiteral<"draft">, Type.TLiteral<"merged">, Type.TLiteral<"closed">]>;
        }>>;
        archived: Type.TBoolean;
        sessionKey: Type.TOptional<Type.TString>;
        createdActor: Type.TOptional<Type.TObject<{
          type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
          id: Type.TOptional<Type.TString>;
          label: Type.TOptional<Type.TString>;
          avatarUrl: Type.TOptional<Type.TString>;
        }>>;
        canContinue: Type.TBoolean;
        canArchive: Type.TBoolean;
        canOpenTerminal: Type.TOptional<Type.TBoolean>;
      }>>;
      nextCursor: Type.TOptional<Type.TString>;
      error: Type.TOptional<Type.TObject<{
        code: Type.TString;
        message: Type.TString;
      }>>;
    }>>;
    id: Type.TString;
    label: Type.TString;
    capabilities: Type.TObject<{
      continueSession: Type.TBoolean;
      archive: Type.TBoolean;
      createSession: Type.TOptional<Type.TObject<{
        model: Type.TString;
      }>>;
      openTerminal: Type.TOptional<Type.TBoolean>;
    }>;
    error: Type.TOptional<Type.TObject<{
      code: Type.TString;
      message: Type.TString;
    }>>;
  }>;
}>;
declare const SessionCatalogTranscriptItemSchema: Type.TObject<{
  id: Type.TOptional<Type.TString>;
  type: Type.TUnion<[Type.TLiteral<"userMessage">, Type.TLiteral<"agentMessage">, Type.TLiteral<"reasoning">, Type.TLiteral<"toolCall">, Type.TLiteral<"toolResult">, Type.TLiteral<"other">]>;
  text: Type.TOptional<Type.TString>;
  timestamp: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  truncated: Type.TOptional<Type.TBoolean>;
  raw: Type.TOptional<Type.TUnknown>;
}>;
declare const SessionsCatalogReadParamsSchema: Type.TObject<{
  limit: Type.TOptional<Type.TInteger>;
  cursor: Type.TOptional<Type.TString>;
  catalogId: Type.TString;
  hostId: Type.TString;
  threadId: Type.TString;
}>;
declare const SessionsCatalogReadResultSchema: Type.TObject<{
  hostId: Type.TString;
  label: Type.TOptional<Type.TString>;
  threadId: Type.TString;
  items: Type.TArray<Type.TObject<{
    id: Type.TOptional<Type.TString>;
    type: Type.TUnion<[Type.TLiteral<"userMessage">, Type.TLiteral<"agentMessage">, Type.TLiteral<"reasoning">, Type.TLiteral<"toolCall">, Type.TLiteral<"toolResult">, Type.TLiteral<"other">]>;
    text: Type.TOptional<Type.TString>;
    timestamp: Type.TOptional<Type.TString>;
    model: Type.TOptional<Type.TString>;
    truncated: Type.TOptional<Type.TBoolean>;
    raw: Type.TOptional<Type.TUnknown>;
  }>>;
  nextCursor: Type.TOptional<Type.TString>;
}>;
declare const SessionsCatalogContinueParamsSchema: Type.TObject<{
  catalogId: Type.TString;
  hostId: Type.TString;
  threadId: Type.TString;
}>;
declare const SessionsCatalogContinueResultSchema: Type.TObject<{
  sessionKey: Type.TString;
}>;
declare const SessionsCatalogArchiveParamsSchema: Type.TObject<{
  confirmNoOtherRunner: Type.TLiteral<true>;
  catalogId: Type.TString;
  hostId: Type.TString;
  threadId: Type.TString;
}>;
declare const SessionsCatalogArchiveResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
}>;
type SessionCatalogCapabilities = Static<typeof SessionCatalogCapabilitiesSchema>;
type SessionCatalogLocator = Static<typeof SessionCatalogLocatorSchema>;
type SessionCatalogDescriptor = Static<typeof SessionCatalogDescriptorSchema>;
type SessionCatalogPullRequestSummary = Static<typeof SessionCatalogPullRequestSummarySchema>;
type SessionCatalogSession = Static<typeof SessionCatalogSessionSchema>;
type SessionCatalogHost = Static<typeof SessionCatalogHostSchema>;
type SessionCatalog = Static<typeof SessionCatalogSchema>;
type SessionsCatalogListParams = Static<typeof SessionsCatalogListParamsSchema>;
type SessionsCatalogListResult = Static<typeof SessionsCatalogListResultSchema>;
type SessionsCatalogHostEvent = Static<typeof SessionsCatalogHostEventSchema>;
type SessionCatalogTranscriptItem = Static<typeof SessionCatalogTranscriptItemSchema>;
type SessionsCatalogReadParams = Static<typeof SessionsCatalogReadParamsSchema>;
type SessionsCatalogReadResult = Static<typeof SessionsCatalogReadResultSchema>;
type SessionsCatalogContinueParams = Static<typeof SessionsCatalogContinueParamsSchema>;
type SessionsCatalogContinueResult = Static<typeof SessionsCatalogContinueResultSchema>;
type SessionsCatalogArchiveParams = Static<typeof SessionsCatalogArchiveParamsSchema>;
type SessionsCatalogArchiveResult = Static<typeof SessionsCatalogArchiveResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/primitives.d.ts
/** Non-empty string primitive for protocol fields that reject blank values. */
declare const NonEmptyString: Type.TString;
/** Maximum stable session key length accepted by chat-send protocol requests. */
declare const CHAT_SEND_SESSION_KEY_MAX_LENGTH = 512;
/** Chat-send session key string primitive with bounded length. */
declare const ChatSendSessionKeyString: Type.TString;
/** Human-readable session label primitive with bounded display length. */
declare const SessionLabelString: Type.TString;
/** Provenance marker for content copied from another user/session/system source. */
declare const InputProvenanceSchema: Type.TObject<{
  kind: Type.TString;
  originSessionId: Type.TOptional<Type.TString>;
  sourceSessionKey: Type.TOptional<Type.TString>;
  sourceChannel: Type.TOptional<Type.TString>;
  sourceTool: Type.TOptional<Type.TString>;
}>;
/** Closed gateway client id schema aligned with `GATEWAY_CLIENT_IDS`. */
declare const GatewayClientIdSchema: Type.TEnum<["webchat-ui", "openclaw-control-ui", "openclaw-browser-copilot", "openclaw-tui", "webchat", "cli", "gateway-client", "openclaw-macos", "openclaw-linux", "openclaw-ios", "openclaw-watchos", "openclaw-android", "node-host", "openclaw-worker", "test", "fingerprint", "openclaw-probe"]>;
/** Closed gateway client mode schema aligned with `GATEWAY_CLIENT_MODES`. */
declare const GatewayClientModeSchema: Type.TEnum<["webchat", "cli", "worker", "test", "probe", "ui", "backend", "node"]>;
/** Structured secret reference accepted by config and channel protocol payloads. */
declare const SecretRefSchema: Type.TUnion<[Type.TObject<{
  source: Type.TLiteral<"env">;
  provider: Type.TString;
  id: Type.TString;
}>, Type.TObject<{
  source: Type.TLiteral<"file">;
  provider: Type.TString;
  id: Type.TUnsafe<string>;
}>, Type.TObject<{
  source: Type.TLiteral<"exec">;
  provider: Type.TString;
  id: Type.TString;
}>]>;
/** Secret input value: either an inline string or a structured SecretRef. */
declare const SecretInputSchema: Type.TUnion<[Type.TString, Type.TUnion<[Type.TObject<{
  source: Type.TLiteral<"env">;
  provider: Type.TString;
  id: Type.TString;
}>, Type.TObject<{
  source: Type.TLiteral<"file">;
  provider: Type.TString;
  id: Type.TUnsafe<string>;
}>, Type.TObject<{
  source: Type.TLiteral<"exec">;
  provider: Type.TString;
  id: Type.TString;
}>]>]>;
//#endregion
//#region packages/gateway-protocol/src/schema/agent.d.ts
/** Stream event emitted by the agent runtime over the gateway protocol. */
declare const AgentEventSchema: Type.TObject<{
  runId: Type.TString;
  seq: Type.TInteger;
  stream: Type.TString;
  ts: Type.TInteger;
  spawnedBy: Type.TOptional<Type.TString>;
  isHeartbeat: Type.TOptional<Type.TBoolean>;
  data: Type.TRecord<"^.*$", Type.TUnknown>;
}>;
/** Request to execute a channel message action through a configured adapter. */
declare const MessageActionParamsSchema: Type.TObject<{
  channel: Type.TString;
  action: Type.TString;
  params: Type.TRecord<"^.*$", Type.TUnknown>;
  accountId: Type.TOptional<Type.TString>;
  requesterAccountId: Type.TOptional<Type.TString>;
  requesterSenderId: Type.TOptional<Type.TString>;
  senderIsOwner: Type.TOptional<Type.TBoolean>;
  sessionKey: Type.TOptional<Type.TString>;
  sessionId: Type.TOptional<Type.TString>;
  inboundTurnKind: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  toolContext: Type.TOptional<Type.TObject<{
    currentChannelId: Type.TOptional<Type.TString>;
    currentMessagingTarget: Type.TOptional<Type.TString>;
    currentGraphChannelId: Type.TOptional<Type.TString>;
    currentChannelProvider: Type.TOptional<Type.TString>;
    currentThreadTs: Type.TOptional<Type.TString>;
    currentMessageId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    replyToMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"off">, Type.TLiteral<"first">, Type.TLiteral<"all">, Type.TLiteral<"batched">]>>;
    hasRepliedRef: Type.TOptional<Type.TObject<{
      value: Type.TBoolean;
    }>>;
    sameChannelThreadRequired: Type.TOptional<Type.TBoolean>;
    skipCrossContextDecoration: Type.TOptional<Type.TBoolean>;
  }>>;
  /**
   * Explicit operation-local marker for an authenticated direct operator.
   * Missing values remain delegated, and agent runtime identity wins server-side.
   */
  conversationReadOrigin: Type.TOptional<Type.TLiteral<"direct-operator">>;
  idempotencyKey: Type.TString;
}>;
/** Outbound send request shared by channel adapters. */
declare const SendParamsSchema: Type.TObject<{
  to: Type.TString;
  message: Type.TOptional<Type.TString>;
  mediaUrl: Type.TOptional<Type.TString>;
  mediaUrls: Type.TOptional<Type.TArray<Type.TString>>; /** Base64 attachment payload for gateway-local media materialization. */
  buffer: Type.TOptional<Type.TString>; /** Optional filename for a base64 attachment payload. */
  filename: Type.TOptional<Type.TString>; /** Optional MIME type for a base64 attachment payload. */
  contentType: Type.TOptional<Type.TString>;
  asVoice: Type.TOptional<Type.TBoolean>;
  gifPlayback: Type.TOptional<Type.TBoolean>;
  channel: Type.TOptional<Type.TString>;
  accountId: Type.TOptional<Type.TString>; /** Optional agent id for per-agent media root resolution on gateway sends. */
  agentId: Type.TOptional<Type.TString>; /** Reply target message id for native quoted/threaded sends where supported. */
  replyToId: Type.TOptional<Type.TString>; /** Thread id (channel-specific meaning, e.g. Telegram forum topic id). */
  threadId: Type.TOptional<Type.TString>; /** Force document-style media sends where supported. */
  forceDocument: Type.TOptional<Type.TBoolean>; /** Send silently (no notification) where supported. */
  silent: Type.TOptional<Type.TBoolean>; /** Channel-specific parse mode for formatted text. */
  parseMode: Type.TOptional<Type.TLiteral<"HTML">>; /** Optional session key for mirroring delivered output back into the transcript. */
  sessionKey: Type.TOptional<Type.TString>;
  idempotencyKey: Type.TString;
}>;
/** Gateway-owned request that lists persisted and channel-directory addresses. */
declare const ConversationListParamsSchema: Type.TObject<{
  agentId: Type.TString;
  channel: Type.TOptional<Type.TString>;
  query: Type.TOptional<Type.TString>;
  limit: Type.TOptional<Type.TInteger>;
}>;
declare const ConversationListItemSchema: Type.TObject<{
  conversationRef: Type.TString;
  channel: Type.TString;
  accountId: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"direct">, Type.TLiteral<"group">, Type.TLiteral<"channel">]>;
  target: Type.TString;
  threadId: Type.TOptional<Type.TString>;
  label: Type.TOptional<Type.TString>;
  firstSeenAt: Type.TInteger;
  lastSeenAt: Type.TInteger;
}>;
declare const ConversationListResultSchema: Type.TObject<{
  conversations: Type.TArray<Type.TObject<{
    conversationRef: Type.TString;
    channel: Type.TString;
    accountId: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"direct">, Type.TLiteral<"group">, Type.TLiteral<"channel">]>;
    target: Type.TString;
    threadId: Type.TOptional<Type.TString>;
    label: Type.TOptional<Type.TString>;
    firstSeenAt: Type.TInteger;
    lastSeenAt: Type.TInteger;
  }>>;
}>;
/** Gateway-owned request that sends to one durable external conversation. */
declare const ConversationSendParamsSchema: Type.TObject<{
  agentId: Type.TString;
  sourceSessionKey: Type.TOptional<Type.TString>;
  operationId: Type.TString;
  conversationRef: Type.TString;
  message: Type.TString;
}>;
declare const ConversationSendResultSchema: Type.TObject<{
  status: Type.TUnion<[Type.TLiteral<"sent">, Type.TLiteral<"queued">, Type.TLiteral<"suppressed">, Type.TLiteral<"unknown">]>;
  conversationRef: Type.TString;
  channel: Type.TString;
  messageId: Type.TOptional<Type.TString>;
  queueId: Type.TOptional<Type.TString>;
}>;
/** Gateway-owned request that sends and consumes one correlated external reply inline. */
declare const ConversationTurnParamsSchema: Type.TObject<{
  agentId: Type.TString;
  sourceSessionKey: Type.TOptional<Type.TString>;
  turnId: Type.TString;
  conversationRef: Type.TString;
  message: Type.TString;
  timeoutMs: Type.TInteger;
}>;
declare const ConversationTurnCancelParamsSchema: Type.TObject<{
  agentId: Type.TString;
  turnId: Type.TString;
}>;
declare const ConversationTurnCancelResultSchema: Type.TObject<{
  cancelled: Type.TBoolean;
}>;
declare const ConversationTurnReplySchema: Type.TObject<{
  conversationRef: Type.TString;
  messageId: Type.TString;
  replyToId: Type.TOptional<Type.TString>;
  threadId: Type.TOptional<Type.TString>;
  text: Type.TString;
  timestamp: Type.TInteger;
  transcriptArtifactId: Type.TOptional<Type.TString>;
  transcriptMessageId: Type.TOptional<Type.TString>;
}>;
declare const ConversationTurnResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"replied">;
  reply: Type.TObject<{
    conversationRef: Type.TString;
    messageId: Type.TString;
    replyToId: Type.TOptional<Type.TString>;
    threadId: Type.TOptional<Type.TString>;
    text: Type.TString;
    timestamp: Type.TInteger;
    transcriptArtifactId: Type.TOptional<Type.TString>;
    transcriptMessageId: Type.TOptional<Type.TString>;
  }>;
  conversationRef: Type.TString;
  channel: Type.TString;
  messageId: Type.TString;
  correlationPersisted: Type.TBoolean;
}>, Type.TObject<{
  status: Type.TLiteral<"timeout">;
  conversationRef: Type.TString;
  channel: Type.TString;
  messageId: Type.TString;
  correlationPersisted: Type.TBoolean;
}>, Type.TObject<{
  conversationRef: Type.TString;
  channel: Type.TString;
  messageId: Type.TOptional<Type.TString>;
  correlationPersisted: Type.TBoolean;
  status: Type.TUnion<[Type.TLiteral<"sent">, Type.TLiteral<"queued">, Type.TLiteral<"suppressed">, Type.TLiteral<"unknown">]>;
  error: Type.TString;
}>]>;
/** Poll creation request for adapters that support native polls. */
declare const PollParamsSchema: Type.TObject<{
  to: Type.TString;
  question: Type.TString;
  options: Type.TArray<Type.TString>;
  maxSelections: Type.TOptional<Type.TInteger>; /** Poll duration in seconds (channel-specific limits may apply). */
  durationSeconds: Type.TOptional<Type.TInteger>;
  durationHours: Type.TOptional<Type.TInteger>; /** Send silently (no notification) where supported. */
  silent: Type.TOptional<Type.TBoolean>; /** Poll anonymity where supported (e.g. Telegram polls default to anonymous). */
  isAnonymous: Type.TOptional<Type.TBoolean>; /** Thread id (channel-specific meaning, e.g. Telegram forum topic id). */
  threadId: Type.TOptional<Type.TString>;
  channel: Type.TOptional<Type.TString>;
  accountId: Type.TOptional<Type.TString>;
  idempotencyKey: Type.TString;
}>;
/** Main agent-run request accepted by the gateway. */
declare const AgentParamsSchema: Type.TObject<{
  message: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  provider: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  to: Type.TOptional<Type.TString>;
  replyTo: Type.TOptional<Type.TString>;
  sessionId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  expectedExistingSessionId: Type.TOptional<Type.TString>;
  thinking: Type.TOptional<Type.TString>;
  deliver: Type.TOptional<Type.TBoolean>;
  attachments: Type.TOptional<Type.TArray<Type.TUnknown>>;
  channel: Type.TOptional<Type.TString>;
  replyChannel: Type.TOptional<Type.TString>;
  accountId: Type.TOptional<Type.TString>;
  replyAccountId: Type.TOptional<Type.TString>;
  threadId: Type.TOptional<Type.TString>;
  groupId: Type.TOptional<Type.TString>;
  groupChannel: Type.TOptional<Type.TString>;
  groupSpace: Type.TOptional<Type.TString>;
  timeout: Type.TOptional<Type.TInteger>;
  bestEffortDeliver: Type.TOptional<Type.TBoolean>;
  lane: Type.TOptional<Type.TString>;
  cwd: Type.TOptional<Type.TString>;
  cleanupBundleMcpOnRunEnd: Type.TOptional<Type.TBoolean>;
  modelRun: Type.TOptional<Type.TBoolean>;
  promptMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"full">, Type.TLiteral<"minimal">, Type.TLiteral<"none">]>>;
  extraSystemPrompt: Type.TOptional<Type.TString>;
  bootstrapContextMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"full">, Type.TLiteral<"lightweight">]>>;
  bootstrapContextRunKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"default">, Type.TLiteral<"heartbeat">, Type.TLiteral<"cron">]>>;
  acpTurnSource: Type.TOptional<Type.TLiteral<"manual_spawn">>;
  internalRuntimeHandoffId: Type.TOptional<Type.TString>;
  execApprovalFollowupExpectedSessionId: Type.TOptional<Type.TString>;
  internalEvents: Type.TOptional<Type.TArray<Type.TObject<{
    type: Type.TLiteral<"task_completion">;
    source: Type.TString;
    childSessionKey: Type.TString;
    childSessionId: Type.TOptional<Type.TString>;
    announceType: Type.TString;
    taskLabel: Type.TString;
    status: Type.TString;
    statusLabel: Type.TString;
    result: Type.TString;
    attachments: Type.TOptional<Type.TArray<Type.TObject<{
      type: Type.TOptional<Type.TString>;
      path: Type.TOptional<Type.TString>;
      url: Type.TOptional<Type.TString>;
      mediaUrl: Type.TOptional<Type.TString>;
      filePath: Type.TOptional<Type.TString>;
      mimeType: Type.TOptional<Type.TString>;
      name: Type.TOptional<Type.TString>;
      sizeBytes: Type.TOptional<Type.TNumber>;
      durationMs: Type.TOptional<Type.TNumber>;
      width: Type.TOptional<Type.TNumber>;
      height: Type.TOptional<Type.TNumber>;
    }>>>;
    mediaUrls: Type.TOptional<Type.TArray<Type.TString>>;
    statsLine: Type.TOptional<Type.TString>;
    replyInstruction: Type.TString;
  }>>>;
  inputProvenance: Type.TOptional<Type.TObject<{
    kind: Type.TString;
    originSessionId: Type.TOptional<Type.TString>;
    sourceSessionKey: Type.TOptional<Type.TString>;
    sourceChannel: Type.TOptional<Type.TString>;
    sourceTool: Type.TOptional<Type.TString>;
  }>>;
  suppressPromptPersistence: Type.TOptional<Type.TBoolean>;
  sessionEffects: Type.TOptional<Type.TUnion<[Type.TLiteral<"visible">, Type.TLiteral<"internal">]>>;
  sourceReplyDeliveryMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"automatic">, Type.TLiteral<"message_tool_only">]>>;
  disableMessageTool: Type.TOptional<Type.TBoolean>;
  swarmCollector: Type.TOptional<Type.TBoolean>;
  swarmOutputSchema: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  forceRestartSafeTools: Type.TOptional<Type.TBoolean>;
  forceCodeModeTools: Type.TOptional<Type.TBoolean>;
  voiceWakeTrigger: Type.TOptional<Type.TString>;
  idempotencyKey: Type.TString;
  label: Type.TOptional<Type.TString>;
}>;
/** Identity lookup request for the current or selected agent/session. */
declare const AgentIdentityParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
}>;
/** Public display identity returned for an agent. */
declare const AgentIdentityResultSchema: Type.TObject<{
  agentId: Type.TString;
  name: Type.TOptional<Type.TString>;
  avatar: Type.TOptional<Type.TString>;
  avatarSource: Type.TOptional<Type.TString>;
  avatarStatus: Type.TOptional<Type.TString>;
  avatarReason: Type.TOptional<Type.TString>;
  emoji: Type.TOptional<Type.TString>;
}>;
/** Waits for a submitted agent run to complete or time out. */
declare const AgentWaitParamsSchema: Type.TObject<{
  runId: Type.TString;
  timeoutMs: Type.TOptional<Type.TInteger>;
}>;
/** Wake request from external schedulers or devices into an agent session. */
declare const WakeParamsSchema: Type.TObject<{
  mode: Type.TUnion<[Type.TLiteral<"now">, Type.TLiteral<"next-heartbeat">]>;
  text: Type.TString;
  sessionKey: Type.TOptional<Type.TString>;
  /**
   * Optional agent id paired with `sessionKey`. Routes multi-agent setups
   * to the agent that owns the targeted session — closes the related half
   * of #46886 ("always routes to default agent").
   */
  agentId: Type.TOptional<Type.TString>;
}>;
type AgentEvent = Static<typeof AgentEventSchema>;
type AgentIdentityParams = Static<typeof AgentIdentityParamsSchema>;
type AgentIdentityResult = Static<typeof AgentIdentityResultSchema>;
type ConversationListParams = Static<typeof ConversationListParamsSchema>;
type ConversationListItem = Static<typeof ConversationListItemSchema>;
type ConversationListResult = Static<typeof ConversationListResultSchema>;
type ConversationSendParams = Static<typeof ConversationSendParamsSchema>;
type ConversationSendResult = Static<typeof ConversationSendResultSchema>;
type ConversationTurnParams = Static<typeof ConversationTurnParamsSchema>;
type ConversationTurnCancelParams = Static<typeof ConversationTurnCancelParamsSchema>;
type ConversationTurnCancelResult = Static<typeof ConversationTurnCancelResultSchema>;
type ConversationTurnReply = Static<typeof ConversationTurnReplySchema>;
type ConversationTurnResult = Static<typeof ConversationTurnResultSchema>;
type MessageActionParams = Static<typeof MessageActionParamsSchema>;
type PollParams = Static<typeof PollParamsSchema>;
type AgentWaitParams = Static<typeof AgentWaitParamsSchema>;
type WakeParams = Static<typeof WakeParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/agents-workspace.d.ts
/**
 * Read-only agent workspace browsing schemas.
 *
 * These contracts back the workspace file browser in operator clients
 * (mobile apps, Control UI). The surface is intentionally read-only:
 * write/delete/upload stay out of this namespace until a separately
 * reviewed mutation contract exists.
 */
/** One file or folder in an agent workspace directory listing. */
declare const AgentsWorkspaceEntrySchema: Type.TObject<{
  path: Type.TString;
  name: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"file">, Type.TLiteral<"directory">]>;
  size: Type.TOptional<Type.TInteger>;
  updatedAtMs: Type.TOptional<Type.TInteger>;
}>;
/** Lists one directory of an agent workspace. */
declare const AgentsWorkspaceListParamsSchema: Type.TObject<{
  agentId: Type.TString;
  path: Type.TOptional<Type.TString>;
  offset: Type.TOptional<Type.TInteger>;
  limit: Type.TOptional<Type.TInteger>;
}>;
/** Paginated directory listing rooted at the agent workspace. */
declare const AgentsWorkspaceListResultSchema: Type.TObject<{
  agentId: Type.TString;
  path: Type.TString;
  parentPath: Type.TOptional<Type.TString>;
  entries: Type.TArray<Type.TObject<{
    path: Type.TString;
    name: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"file">, Type.TLiteral<"directory">]>;
    size: Type.TOptional<Type.TInteger>;
    updatedAtMs: Type.TOptional<Type.TInteger>;
  }>>;
  totalEntries: Type.TInteger;
  offset: Type.TInteger;
}>;
/** One workspace file preview payload (UTF-8 text or base64 image). */
declare const AgentsWorkspaceFileSchema: Type.TObject<{
  path: Type.TString;
  name: Type.TString;
  size: Type.TInteger;
  updatedAtMs: Type.TInteger;
  mimeType: Type.TString;
  encoding: Type.TUnion<[Type.TLiteral<"utf8">, Type.TLiteral<"base64">]>;
  content: Type.TString;
}>;
/** Reads one workspace file by workspace-relative path. */
declare const AgentsWorkspaceGetParamsSchema: Type.TObject<{
  agentId: Type.TString;
  path: Type.TString;
}>;
/** Result for reading one workspace file. */
declare const AgentsWorkspaceGetResultSchema: Type.TObject<{
  agentId: Type.TString;
  file: Type.TObject<{
    path: Type.TString;
    name: Type.TString;
    size: Type.TInteger;
    updatedAtMs: Type.TInteger;
    mimeType: Type.TString;
    encoding: Type.TUnion<[Type.TLiteral<"utf8">, Type.TLiteral<"base64">]>;
    content: Type.TString;
  }>;
}>;
type AgentsWorkspaceEntry = Static<typeof AgentsWorkspaceEntrySchema>;
type AgentsWorkspaceFile = Static<typeof AgentsWorkspaceFileSchema>;
type AgentsWorkspaceListParams = Static<typeof AgentsWorkspaceListParamsSchema>;
type AgentsWorkspaceListResult = Static<typeof AgentsWorkspaceListResultSchema>;
type AgentsWorkspaceGetParams = Static<typeof AgentsWorkspaceGetParamsSchema>;
type AgentsWorkspaceGetResult = Static<typeof AgentsWorkspaceGetResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/artifacts.d.ts
/** Public artifact metadata returned before or alongside download data. */
declare const ArtifactSummarySchema: Type.TObject<{
  id: Type.TString;
  type: Type.TString;
  title: Type.TString;
  mimeType: Type.TOptional<Type.TString>;
  sizeBytes: Type.TOptional<Type.TInteger>;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  taskId: Type.TOptional<Type.TString>;
  messageSeq: Type.TOptional<Type.TInteger>;
  source: Type.TOptional<Type.TString>;
  download: Type.TObject<{
    mode: Type.TUnion<[Type.TLiteral<"bytes">, Type.TLiteral<"url">, Type.TLiteral<"unsupported">]>;
  }>;
}>;
/** List request payload for artifacts visible in the selected scope. */
declare const ArtifactsListParamsSchema: Type.TObject<{
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  taskId: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
}>;
/** List response containing artifact summaries only. */
declare const ArtifactsListResultSchema: Type.TObject<{
  artifacts: Type.TArray<Type.TObject<{
    id: Type.TString;
    type: Type.TString;
    title: Type.TString;
    mimeType: Type.TOptional<Type.TString>;
    sizeBytes: Type.TOptional<Type.TInteger>;
    sessionKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    taskId: Type.TOptional<Type.TString>;
    messageSeq: Type.TOptional<Type.TInteger>;
    source: Type.TOptional<Type.TString>;
    download: Type.TObject<{
      mode: Type.TUnion<[Type.TLiteral<"bytes">, Type.TLiteral<"url">, Type.TLiteral<"unsupported">]>;
    }>;
  }>>;
}>;
/** Get request payload for one artifact summary. */
declare const ArtifactsGetParamsSchema: Type.TObject<{
  artifactId: Type.TString;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  taskId: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Get response containing one artifact summary. */
declare const ArtifactsGetResultSchema: Type.TObject<{
  artifact: Type.TObject<{
    id: Type.TString;
    type: Type.TString;
    title: Type.TString;
    mimeType: Type.TOptional<Type.TString>;
    sizeBytes: Type.TOptional<Type.TInteger>;
    sessionKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    taskId: Type.TOptional<Type.TString>;
    messageSeq: Type.TOptional<Type.TInteger>;
    source: Type.TOptional<Type.TString>;
    download: Type.TObject<{
      mode: Type.TUnion<[Type.TLiteral<"bytes">, Type.TLiteral<"url">, Type.TLiteral<"unsupported">]>;
    }>;
  }>;
}>;
/** Download request payload for one artifact. */
declare const ArtifactsDownloadParamsSchema: Type.TObject<{
  artifactId: Type.TString;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  taskId: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Download response, either inline base64 bytes, URL, or metadata for unsupported modes. */
declare const ArtifactsDownloadResultSchema: Type.TObject<{
  artifact: Type.TObject<{
    id: Type.TString;
    type: Type.TString;
    title: Type.TString;
    mimeType: Type.TOptional<Type.TString>;
    sizeBytes: Type.TOptional<Type.TInteger>;
    sessionKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    taskId: Type.TOptional<Type.TString>;
    messageSeq: Type.TOptional<Type.TInteger>;
    source: Type.TOptional<Type.TString>;
    download: Type.TObject<{
      mode: Type.TUnion<[Type.TLiteral<"bytes">, Type.TLiteral<"url">, Type.TLiteral<"unsupported">]>;
    }>;
  }>;
  encoding: Type.TOptional<Type.TLiteral<"base64">>;
  data: Type.TOptional<Type.TString>;
  url: Type.TOptional<Type.TString>;
  expiresAt: Type.TOptional<Type.TString>;
}>;
type ArtifactSummary = Static<typeof ArtifactSummarySchema>;
type ArtifactsListParams = Static<typeof ArtifactsListParamsSchema>;
type ArtifactsListResult = Static<typeof ArtifactsListResultSchema>;
type ArtifactsGetParams = Static<typeof ArtifactsGetParamsSchema>;
type ArtifactsGetResult = Static<typeof ArtifactsGetResultSchema>;
type ArtifactsDownloadParams = Static<typeof ArtifactsDownloadParamsSchema>;
type ArtifactsDownloadResult = Static<typeof ArtifactsDownloadResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/audit-activity.d.ts
/** V1 agent-run activity record. */
declare const AuditActivityAgentRunV1Schema: TSchema;
/** V1 tool-action activity record. */
declare const AuditActivityToolActionV1Schema: TSchema;
declare const AuditActivityInboundMessageV1Schema: TSchema;
declare const AuditActivityOutboundMessageV1Schema: TSchema;
/** Discriminated V1 activity record union. */
declare const AuditActivityEventV1Schema: TSchema;
/** Bounded newest-first V1 activity query filters. */
declare const AuditActivityListParamsSchema: TSchema;
/** Stable sequence-cursor V1 activity page. */
declare const AuditActivityListResultSchema: TSchema;
/** Metadata-only audit query payloads. */
type AuditActivityRecordBaseV1 = {
  schemaVersion: 1;
  eventId: string;
  sequence: number;
  sourceSequence: number;
  occurredAt: number;
  redaction: "metadata_only";
};
type AuditActivityAgentRecordBaseV1 = AuditActivityRecordBaseV1 & {
  actor: {
    type: "agent" | "system";
    id: string;
  };
  agentId: string;
  sessionKey?: string;
  sessionId?: string;
  runId: string;
};
type AuditActivityAgentRunV1Terminal = {
  action: "agent.run.started";
  status: "started";
  errorCode?: never;
} | {
  action: "agent.run.finished";
  status: "succeeded";
  errorCode?: never;
} | {
  action: "agent.run.finished";
  status: "failed";
  errorCode: "run_failed";
} | {
  action: "agent.run.finished";
  status: "cancelled";
  errorCode: "run_cancelled";
} | {
  action: "agent.run.finished";
  status: "timed_out";
  errorCode: "run_timed_out";
} | {
  action: "agent.run.finished";
  status: "blocked";
  errorCode: "run_blocked";
};
type AuditActivityAgentRunV1 = AuditActivityAgentRecordBaseV1 & {
  eventType: "agent_run";
  kind: "agent_run";
} & AuditActivityAgentRunV1Terminal;
type AuditActivityToolActionV1Terminal = {
  action: "tool.action.started";
  status: "started";
  errorCode?: never;
} | {
  action: "tool.action.finished";
  status: "succeeded";
  errorCode?: never;
} | {
  action: "tool.action.finished";
  status: "failed";
  errorCode: "tool_failed";
} | {
  action: "tool.action.finished";
  status: "cancelled";
  errorCode: "tool_cancelled";
} | {
  action: "tool.action.finished";
  status: "timed_out";
  errorCode: "tool_timed_out";
} | {
  action: "tool.action.finished";
  status: "blocked";
  errorCode: "tool_blocked";
} | {
  action: "tool.action.finished";
  status: "unknown";
  errorCode: "tool_outcome_unknown";
};
type AuditActivityToolActionV1 = AuditActivityAgentRecordBaseV1 & {
  eventType: "tool_action";
  kind: "tool_action";
  toolCallId?: string;
  toolName?: string;
} & AuditActivityToolActionV1Terminal;
type AuditActivityMessageRecordBaseV1 = AuditActivityRecordBaseV1 & {
  kind: "message";
  channel: string;
  conversationKind: "direct" | "group" | "channel" | "unknown";
  durationMs?: number;
  resultCount?: number;
  agentId?: string;
  runId?: string;
  accountRef?: string;
  conversationRef?: string;
  messageRef?: string;
  targetRef?: string;
  sessionKey?: never;
  sessionId?: never;
  toolCallId?: never;
  toolName?: never;
};
type AuditActivityInboundMessageV1Terminal = {
  status: "succeeded";
  outcome: "completed";
  errorCode?: never;
  reasonCode?: "fast_abort" | "plugin_bound_handled" | "plugin_bound_unavailable" | "plugin_bound_declined" | "before_dispatch_handled" | "acp_dispatch_completed" | "acp_dispatch_empty";
} | {
  status: "blocked";
  outcome: "skipped";
  errorCode?: never;
  reasonCode?: "duplicate" | "reply_operation_active" | "reply_operation_aborted" | "acp_dispatch_aborted";
} | {
  status: "failed";
  outcome: "failed";
  errorCode: "message_processing_failed";
  reasonCode?: "acp_dispatch_failed" | "plugin_bound_error";
};
type AuditActivityInboundMessageV1 = AuditActivityMessageRecordBaseV1 & {
  eventType: "inbound_message";
  action: "message.inbound.processed";
  direction: "inbound";
  actor: {
    type: "channel_sender";
    id: string;
  } | {
    type: "system";
    id: string;
  };
  deliveryKind?: never;
  failureStage?: never;
} & AuditActivityInboundMessageV1Terminal;
type AuditActivityOutboundMessageV1Terminal = {
  status: "succeeded";
  outcome: "sent";
  errorCode?: never;
  reasonCode?: never;
  failureStage?: never;
  deliveryKind?: "text" | "media" | "other";
} | {
  status: "blocked";
  outcome: "suppressed";
  errorCode?: never;
  reasonCode: "cancelled_by_message_sending_hook" | "cancelled_by_reply_payload_sending_hook" | "empty_after_message_sending_hook" | "empty_after_reply_payload_sending_hook" | "no_visible_payload";
  failureStage?: never;
  deliveryKind?: never;
} | {
  status: "failed";
  outcome: "failed";
  errorCode: "message_delivery_failed" | "message_delivery_partial_failure";
  reasonCode?: never;
  failureStage: "platform_send" | "queue" | "unknown";
  deliveryKind?: "text" | "media" | "other";
} | {
  status: "unknown";
  outcome: "unknown";
  errorCode?: never;
  reasonCode?: never;
  failureStage: "platform_send" | "queue" | "unknown";
  deliveryKind?: never;
};
type AuditActivityOutboundMessageV1 = AuditActivityMessageRecordBaseV1 & {
  eventType: "outbound_message";
  action: "message.outbound.finished";
  direction: "outbound";
  actor: {
    type: "agent" | "system";
    id: string;
  };
} & AuditActivityOutboundMessageV1Terminal;
type AuditActivityEventV1 = AuditActivityAgentRunV1 | AuditActivityToolActionV1 | AuditActivityInboundMessageV1 | AuditActivityOutboundMessageV1;
type AuditActivityListParams = {
  agentId?: string;
  sessionKey?: string;
  runId?: string;
  kind?: "agent_run" | "tool_action" | "message";
  status?: "started" | "succeeded" | "failed" | "cancelled" | "timed_out" | "blocked" | "unknown";
  direction?: "inbound" | "outbound";
  channel?: string;
  after?: number;
  before?: number;
  limit?: number;
  cursor?: string;
};
type AuditActivityListResult = {
  events: AuditActivityEventV1[];
  nextCursor?: string;
};
//#endregion
//#region packages/gateway-protocol/src/schema/audit.d.ts
/** One content-free run/tool audit record. */
declare const AuditEventSchema: Type.TObject<{
  eventId: Type.TString;
  sequence: Type.TInteger;
  sourceSequence: Type.TInteger;
  occurredAt: Type.TInteger;
  kind: Type.TUnion<[Type.TLiteral<"agent_run">, Type.TLiteral<"tool_action">]>;
  action: Type.TUnion<[Type.TLiteral<"agent.run.started">, Type.TLiteral<"agent.run.finished">, Type.TLiteral<"tool.action.started">, Type.TLiteral<"tool.action.finished">]>;
  status: Type.TUnion<[Type.TLiteral<"started">, Type.TLiteral<"succeeded">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">, Type.TLiteral<"blocked">, Type.TLiteral<"unknown">]>;
  errorCode: Type.TOptional<Type.TUnion<[Type.TLiteral<"run_failed">, Type.TLiteral<"run_cancelled">, Type.TLiteral<"run_timed_out">, Type.TLiteral<"run_blocked">, Type.TLiteral<"tool_failed">, Type.TLiteral<"tool_cancelled">, Type.TLiteral<"tool_timed_out">, Type.TLiteral<"tool_blocked">, Type.TLiteral<"tool_outcome_unknown">]>>;
  actor: Type.TObject<{
    type: Type.TUnion<[Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    id: Type.TString;
  }>;
  agentId: Type.TString;
  sessionKey: Type.TOptional<Type.TString>;
  sessionId: Type.TOptional<Type.TString>;
  runId: Type.TString;
  toolCallId: Type.TOptional<Type.TString>;
  toolName: Type.TOptional<Type.TString>;
  redaction: Type.TLiteral<"metadata_only">;
}>;
/** Bounded newest-first audit query filters. */
declare const AuditListParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  kind: Type.TOptional<Type.TUnion<[Type.TLiteral<"agent_run">, Type.TLiteral<"tool_action">]>>;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"started">, Type.TLiteral<"succeeded">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">, Type.TLiteral<"blocked">, Type.TLiteral<"unknown">]>>;
  after: Type.TOptional<Type.TInteger>;
  before: Type.TOptional<Type.TInteger>;
  limit: Type.TOptional<Type.TInteger>;
  cursor: Type.TOptional<Type.TString>;
}>;
/** Stable sequence-cursor page suitable for bounded JSON export. */
declare const AuditListResultSchema: Type.TObject<{
  events: Type.TArray<Type.TObject<{
    eventId: Type.TString;
    sequence: Type.TInteger;
    sourceSequence: Type.TInteger;
    occurredAt: Type.TInteger;
    kind: Type.TUnion<[Type.TLiteral<"agent_run">, Type.TLiteral<"tool_action">]>;
    action: Type.TUnion<[Type.TLiteral<"agent.run.started">, Type.TLiteral<"agent.run.finished">, Type.TLiteral<"tool.action.started">, Type.TLiteral<"tool.action.finished">]>;
    status: Type.TUnion<[Type.TLiteral<"started">, Type.TLiteral<"succeeded">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">, Type.TLiteral<"blocked">, Type.TLiteral<"unknown">]>;
    errorCode: Type.TOptional<Type.TUnion<[Type.TLiteral<"run_failed">, Type.TLiteral<"run_cancelled">, Type.TLiteral<"run_timed_out">, Type.TLiteral<"run_blocked">, Type.TLiteral<"tool_failed">, Type.TLiteral<"tool_cancelled">, Type.TLiteral<"tool_timed_out">, Type.TLiteral<"tool_blocked">, Type.TLiteral<"tool_outcome_unknown">]>>;
    actor: Type.TObject<{
      type: Type.TUnion<[Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
      id: Type.TString;
    }>;
    agentId: Type.TString;
    sessionKey: Type.TOptional<Type.TString>;
    sessionId: Type.TOptional<Type.TString>;
    runId: Type.TString;
    toolCallId: Type.TOptional<Type.TString>;
    toolName: Type.TOptional<Type.TString>;
    redaction: Type.TLiteral<"metadata_only">;
  }>>;
  nextCursor: Type.TOptional<Type.TString>;
}>;
type AuditEvent = Static<typeof AuditEventSchema>;
type AuditListParams = Static<typeof AuditListParamsSchema>;
type AuditListResult = Static<typeof AuditListResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/users.d.ts
declare const UserProfileAvatarMimeSchema: Type.TUnion<[Type.TLiteral<"image/png">, Type.TLiteral<"image/jpeg">, Type.TLiteral<"image/webp">]>;
declare const UserProfileSchema: Type.TObject<{
  id: Type.TString;
  displayName: Type.TUnion<[Type.TString, Type.TNull]>;
  avatarMime: Type.TUnion<[Type.TUnion<[Type.TLiteral<"image/png">, Type.TLiteral<"image/jpeg">, Type.TLiteral<"image/webp">]>, Type.TNull]>;
  mergedInto: Type.TUnion<[Type.TString, Type.TNull]>;
  createdAt: Type.TInteger;
  updatedAt: Type.TInteger;
  emails: Type.TArray<Type.TString>;
  hasAvatar: Type.TBoolean;
}>;
declare const UsersListParamsSchema: Type.TObject<{}>;
declare const UsersListResultSchema: Type.TObject<{
  profiles: Type.TArray<Type.TObject<{
    id: Type.TString;
    displayName: Type.TUnion<[Type.TString, Type.TNull]>;
    avatarMime: Type.TUnion<[Type.TUnion<[Type.TLiteral<"image/png">, Type.TLiteral<"image/jpeg">, Type.TLiteral<"image/webp">]>, Type.TNull]>;
    mergedInto: Type.TUnion<[Type.TString, Type.TNull]>;
    createdAt: Type.TInteger;
    updatedAt: Type.TInteger;
    emails: Type.TArray<Type.TString>;
    hasAvatar: Type.TBoolean;
  }>>;
}>;
declare const UsersSelfParamsSchema: Type.TObject<{}>;
declare const UsersSelfResultSchema: Type.TObject<{
  profile: Type.TObject<{
    id: Type.TString;
    displayName: Type.TUnion<[Type.TString, Type.TNull]>;
    avatarMime: Type.TUnion<[Type.TUnion<[Type.TLiteral<"image/png">, Type.TLiteral<"image/jpeg">, Type.TLiteral<"image/webp">]>, Type.TNull]>;
    mergedInto: Type.TUnion<[Type.TString, Type.TNull]>;
    createdAt: Type.TInteger;
    updatedAt: Type.TInteger;
    emails: Type.TArray<Type.TString>;
    hasAvatar: Type.TBoolean;
  }>;
}>;
declare const UsersLinkEmailParamsSchema: Type.TObject<{
  email: Type.TString;
  targetProfileId: Type.TString;
}>;
declare const UsersLinkEmailResultSchema: Type.TObject<{
  profile: Type.TObject<{
    id: Type.TString;
    displayName: Type.TUnion<[Type.TString, Type.TNull]>;
    avatarMime: Type.TUnion<[Type.TUnion<[Type.TLiteral<"image/png">, Type.TLiteral<"image/jpeg">, Type.TLiteral<"image/webp">]>, Type.TNull]>;
    mergedInto: Type.TUnion<[Type.TString, Type.TNull]>;
    createdAt: Type.TInteger;
    updatedAt: Type.TInteger;
    emails: Type.TArray<Type.TString>;
    hasAvatar: Type.TBoolean;
  }>;
}>;
declare const UsersSetDisplayNameParamsSchema: Type.TObject<{
  profileId: Type.TString;
  displayName: Type.TUnion<[Type.TString, Type.TNull]>;
}>;
declare const UsersSetDisplayNameResultSchema: Type.TObject<{
  profile: Type.TObject<{
    id: Type.TString;
    displayName: Type.TUnion<[Type.TString, Type.TNull]>;
    avatarMime: Type.TUnion<[Type.TUnion<[Type.TLiteral<"image/png">, Type.TLiteral<"image/jpeg">, Type.TLiteral<"image/webp">]>, Type.TNull]>;
    mergedInto: Type.TUnion<[Type.TString, Type.TNull]>;
    createdAt: Type.TInteger;
    updatedAt: Type.TInteger;
    emails: Type.TArray<Type.TString>;
    hasAvatar: Type.TBoolean;
  }>;
}>;
declare const UsersSetAvatarParamsSchema: Type.TObject<{
  profileId: Type.TString;
  mime: Type.TUnion<[Type.TLiteral<"image/png">, Type.TLiteral<"image/jpeg">, Type.TLiteral<"image/webp">]>;
  avatarBase64: Type.TString;
}>;
declare const UsersSetAvatarResultSchema: Type.TObject<{
  profile: Type.TObject<{
    id: Type.TString;
    displayName: Type.TUnion<[Type.TString, Type.TNull]>;
    avatarMime: Type.TUnion<[Type.TUnion<[Type.TLiteral<"image/png">, Type.TLiteral<"image/jpeg">, Type.TLiteral<"image/webp">]>, Type.TNull]>;
    mergedInto: Type.TUnion<[Type.TString, Type.TNull]>;
    createdAt: Type.TInteger;
    updatedAt: Type.TInteger;
    emails: Type.TArray<Type.TString>;
    hasAvatar: Type.TBoolean;
  }>;
}>;
type UserProfile = Static<typeof UserProfileSchema>;
type UsersListParams = Static<typeof UsersListParamsSchema>;
type UsersListResult = Static<typeof UsersListResultSchema>;
type UsersSelfParams = Static<typeof UsersSelfParamsSchema>;
type UsersSelfResult = Static<typeof UsersSelfResultSchema>;
type UsersLinkEmailParams = Static<typeof UsersLinkEmailParamsSchema>;
type UsersLinkEmailResult = Static<typeof UsersLinkEmailResultSchema>;
type UsersSetDisplayNameParams = Static<typeof UsersSetDisplayNameParamsSchema>;
type UsersSetDisplayNameResult = Static<typeof UsersSetDisplayNameResultSchema>;
type UsersSetAvatarParams = Static<typeof UsersSetAvatarParamsSchema>;
type UsersSetAvatarResult = Static<typeof UsersSetAvatarResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/channels.d.ts
/**
 * Channel and Talk protocol schemas.
 *
 * Talk schemas are consumed by browser realtime clients, gateway relay sessions,
 * and channel adapters, so the mode/transport/brain unions below are shared
 * API vocabulary rather than provider-local implementation details.
 */
/** Toggles Talk mode for the gateway, with an optional rollout phase marker. */
declare const TalkModeParamsSchema: Type.TObject<{
  enabled: Type.TBoolean;
  phase: Type.TOptional<Type.TString>;
}>;
/** Reads Talk configuration; secrets are included only for trusted callers. */
declare const TalkConfigParamsSchema: Type.TObject<{
  includeSecrets: Type.TOptional<Type.TBoolean>;
}>;
/** One-shot text-to-speech request with provider-specific voice tuning knobs. */
declare const TalkSpeakParamsSchema: Type.TObject<{
  text: Type.TString;
  voiceId: Type.TOptional<Type.TString>;
  modelId: Type.TOptional<Type.TString>;
  outputFormat: Type.TOptional<Type.TString>;
  speed: Type.TOptional<Type.TNumber>;
  rateWpm: Type.TOptional<Type.TInteger>;
  stability: Type.TOptional<Type.TNumber>;
  similarity: Type.TOptional<Type.TNumber>;
  style: Type.TOptional<Type.TNumber>;
  speakerBoost: Type.TOptional<Type.TBoolean>;
  seed: Type.TOptional<Type.TInteger>;
  normalize: Type.TOptional<Type.TString>;
  language: Type.TOptional<Type.TString>;
  latencyTier: Type.TOptional<Type.TInteger>;
}>;
/**
 * One-shot text-to-speech request rendered with the configured TTS provider
 * chain (unlike `talk.speak`, which pins the Talk-mode provider).
 */
declare const TtsSpeakParamsSchema: Type.TObject<{
  text: Type.TString;
}>;
/** Canonical Talk event envelope emitted to browser, relay, and channel consumers. */
declare const TalkEventSchema: Type.TObject<{
  id: Type.TString;
  type: Type.TUnion<[Type.TLiteral<"session.started">, Type.TLiteral<"session.ready">, Type.TLiteral<"session.closed">, Type.TLiteral<"session.error">, Type.TLiteral<"session.replaced">, Type.TLiteral<"turn.started">, Type.TLiteral<"turn.ended">, Type.TLiteral<"turn.cancelled">, Type.TLiteral<"capture.started">, Type.TLiteral<"capture.stopped">, Type.TLiteral<"capture.cancelled">, Type.TLiteral<"capture.once">, Type.TLiteral<"input.audio.delta">, Type.TLiteral<"input.audio.committed">, Type.TLiteral<"transcript.delta">, Type.TLiteral<"transcript.done">, Type.TLiteral<"output.text.delta">, Type.TLiteral<"output.text.done">, Type.TLiteral<"output.audio.started">, Type.TLiteral<"output.audio.delta">, Type.TLiteral<"output.audio.done">, Type.TLiteral<"tool.call">, Type.TLiteral<"tool.progress">, Type.TLiteral<"tool.result">, Type.TLiteral<"tool.error">, Type.TLiteral<"usage.metrics">, Type.TLiteral<"latency.metrics">, Type.TLiteral<"health.changed">]>;
  sessionId: Type.TString;
  turnId: Type.TOptional<Type.TString>;
  captureId: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
  timestamp: Type.TString;
  mode: Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>;
  transport: Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>;
  brain: Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>;
  provider: Type.TOptional<Type.TString>;
  final: Type.TOptional<Type.TBoolean>;
  callId: Type.TOptional<Type.TString>;
  itemId: Type.TOptional<Type.TString>;
  parentId: Type.TOptional<Type.TString>;
  payload: Type.TUnknown;
}>;
/** Creates a browser-facing Talk client session. */
declare const TalkClientCreateParamsSchema: Type.TObject<{
  sessionKey: Type.TOptional<Type.TString>;
  voiceSessionId: Type.TOptional<Type.TString>;
  provider: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  voice: Type.TOptional<Type.TString>;
  vadThreshold: Type.TOptional<Type.TNumber>;
  silenceDurationMs: Type.TOptional<Type.TInteger>;
  prefixPaddingMs: Type.TOptional<Type.TInteger>;
  reasoningEffort: Type.TOptional<Type.TString>;
  mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>>;
  transport: Type.TOptional<Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>>;
  brain: Type.TOptional<Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>>;
  capabilities: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"camera-frame">, Type.TLiteral<"voice-transcript">]>>>;
}>;
/** Tool-call request from a browser/client session back into the agent runtime. */
declare const TalkClientToolCallParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  voiceSessionId: Type.TOptional<Type.TString>;
  callId: Type.TString;
  name: Type.TString;
  args: Type.TOptional<Type.TUnknown>;
  relaySessionId: Type.TOptional<Type.TString>;
}>;
/** One finalized transcript item from a client-owned Talk session. */
declare const TalkClientTranscriptParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  voiceSessionId: Type.TString;
  entryId: Type.TString;
  role: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"assistant">]>;
  text: Type.TString;
  timestamp: Type.TOptional<Type.TNumber>;
}>;
/** Logical close for a client-owned Talk session. */
declare const TalkClientCloseParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  voiceSessionId: Type.TString;
}>;
/** Result for client-owned transcript and close mutations. */
declare const TalkClientMutationResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
}>;
/** Agent run identity returned after accepting a Talk client tool call. */
declare const TalkClientToolCallResultSchema: Type.TObject<{
  runId: Type.TString;
  idempotencyKey: Type.TString;
}>;
/** Text steering request for a Talk session bound to an agent turn. */
declare const TalkClientSteerParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  text: Type.TString;
  mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"status">, Type.TLiteral<"steer">, Type.TLiteral<"cancel">, Type.TLiteral<"followup">]>>;
}>;
/** Result of applying agent control to an embedded or reply-backed Talk run. */
declare const TalkAgentControlResultSchema: Type.TObject<{
  ok: Type.TBoolean;
  mode: Type.TUnion<[Type.TLiteral<"status">, Type.TLiteral<"steer">, Type.TLiteral<"cancel">, Type.TLiteral<"followup">]>;
  sessionKey: Type.TString;
  sessionId: Type.TOptional<Type.TString>;
  active: Type.TBoolean;
  queued: Type.TOptional<Type.TBoolean>;
  aborted: Type.TOptional<Type.TBoolean>;
  target: Type.TOptional<Type.TUnion<[Type.TLiteral<"embedded_run">, Type.TLiteral<"reply_run">]>>;
  reason: Type.TOptional<Type.TString>;
  message: Type.TString;
  speak: Type.TBoolean;
  show: Type.TBoolean;
  suppress: Type.TBoolean;
  providerResult: Type.TOptional<Type.TObject<{
    status: Type.TLiteral<"cancelled">;
    message: Type.TString;
  }>>;
  enqueuedAtMs: Type.TOptional<Type.TNumber>;
  deliveredAtMs: Type.TOptional<Type.TNumber>;
}>;
/** Joins an existing managed-room Talk session. */
declare const TalkSessionJoinParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  token: Type.TString;
}>;
/** Creates a gateway-managed Talk session for realtime, transcription, or relay use. */
declare const TalkSessionCreateParamsSchema: Type.TObject<{
  sessionKey: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  provider: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  voice: Type.TOptional<Type.TString>;
  language: Type.TOptional<Type.TString>;
  vadThreshold: Type.TOptional<Type.TNumber>;
  silenceDurationMs: Type.TOptional<Type.TInteger>;
  prefixPaddingMs: Type.TOptional<Type.TInteger>;
  reasoningEffort: Type.TOptional<Type.TString>;
  mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>>;
  transport: Type.TOptional<Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>>;
  brain: Type.TOptional<Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>>;
  ttlMs: Type.TOptional<Type.TInteger>;
}>;
/** Appends base64 audio to an active Talk session. */
declare const TalkSessionAppendAudioParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  audioBase64: Type.TString;
  timestamp: Type.TOptional<Type.TNumber>;
}>;
/** Starts or advances a Talk turn within a session. */
declare const TalkSessionTurnParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  turnId: Type.TOptional<Type.TString>;
}>;
/** Cancels the active or named Talk turn. */
declare const TalkSessionCancelTurnParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  turnId: Type.TOptional<Type.TString>;
  reason: Type.TOptional<Type.TString>;
}>;
/** Cancels currently streaming Talk output without necessarily ending the turn. */
declare const TalkSessionCancelOutputParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  turnId: Type.TOptional<Type.TString>;
  reason: Type.TOptional<Type.TString>;
}>;
/** Submits a tool result back to a Talk provider session. */
declare const TalkSessionSubmitToolResultParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  callId: Type.TString;
  result: Type.TUnknown;
  options: Type.TOptional<Type.TObject<{
    suppressResponse: Type.TOptional<Type.TBoolean>;
    willContinue: Type.TOptional<Type.TBoolean>;
  }>>;
}>;
/** Steers a managed Talk session by session id rather than transcript key. */
declare const TalkSessionSteerParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  sessionKey: Type.TOptional<Type.TString>;
  text: Type.TString;
  mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"status">, Type.TLiteral<"steer">, Type.TLiteral<"cancel">, Type.TLiteral<"followup">]>>;
}>;
/** Closes a gateway-managed Talk session. */
declare const TalkSessionCloseParamsSchema: Type.TObject<{
  sessionId: Type.TString;
}>;
/** Empty request payload for reading configured Talk provider capabilities. */
declare const TalkCatalogParamsSchema: Type.TObject<{}>;
/** Provider, mode, transport, and audio-format catalog returned to clients. */
declare const TalkCatalogResultSchema: Type.TObject<{
  modes: Type.TArray<Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>>;
  transports: Type.TArray<Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>>;
  brains: Type.TArray<Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>>;
  speech: Type.TObject<{
    ready: Type.TOptional<Type.TBoolean>;
    activeProvider: Type.TOptional<Type.TString>;
    providers: Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
      configured: Type.TBoolean;
      aliases: Type.TOptional<Type.TArray<Type.TString>>;
      models: Type.TOptional<Type.TArray<Type.TString>>;
      voices: Type.TOptional<Type.TArray<Type.TString>>;
      defaultModel: Type.TOptional<Type.TString>;
      modes: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>>>;
      transports: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>>>;
      brains: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>>>;
      inputAudioFormats: Type.TOptional<Type.TArray<Type.TObject<{
        encoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
        sampleRateHz: Type.TInteger;
        channels: Type.TInteger;
      }>>>;
      outputAudioFormats: Type.TOptional<Type.TArray<Type.TObject<{
        encoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
        sampleRateHz: Type.TInteger;
        channels: Type.TInteger;
      }>>>;
      supportsBrowserSession: Type.TOptional<Type.TBoolean>;
      supportsBargeIn: Type.TOptional<Type.TBoolean>;
      supportsToolCalls: Type.TOptional<Type.TBoolean>;
      supportsVideoFrames: Type.TOptional<Type.TBoolean>;
      supportsSessionResumption: Type.TOptional<Type.TBoolean>;
    }>>;
  }>;
  transcription: Type.TObject<{
    ready: Type.TOptional<Type.TBoolean>;
    activeProvider: Type.TOptional<Type.TString>;
    providers: Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
      configured: Type.TBoolean;
      aliases: Type.TOptional<Type.TArray<Type.TString>>;
      models: Type.TOptional<Type.TArray<Type.TString>>;
      voices: Type.TOptional<Type.TArray<Type.TString>>;
      defaultModel: Type.TOptional<Type.TString>;
      modes: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>>>;
      transports: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>>>;
      brains: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>>>;
      inputAudioFormats: Type.TOptional<Type.TArray<Type.TObject<{
        encoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
        sampleRateHz: Type.TInteger;
        channels: Type.TInteger;
      }>>>;
      outputAudioFormats: Type.TOptional<Type.TArray<Type.TObject<{
        encoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
        sampleRateHz: Type.TInteger;
        channels: Type.TInteger;
      }>>>;
      supportsBrowserSession: Type.TOptional<Type.TBoolean>;
      supportsBargeIn: Type.TOptional<Type.TBoolean>;
      supportsToolCalls: Type.TOptional<Type.TBoolean>;
      supportsVideoFrames: Type.TOptional<Type.TBoolean>;
      supportsSessionResumption: Type.TOptional<Type.TBoolean>;
    }>>;
  }>;
  realtime: Type.TObject<{
    ready: Type.TOptional<Type.TBoolean>;
    activeProvider: Type.TOptional<Type.TString>;
    providers: Type.TArray<Type.TObject<{
      id: Type.TString;
      label: Type.TString;
      configured: Type.TBoolean;
      aliases: Type.TOptional<Type.TArray<Type.TString>>;
      models: Type.TOptional<Type.TArray<Type.TString>>;
      voices: Type.TOptional<Type.TArray<Type.TString>>;
      defaultModel: Type.TOptional<Type.TString>;
      modes: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>>>;
      transports: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>>>;
      brains: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>>>;
      inputAudioFormats: Type.TOptional<Type.TArray<Type.TObject<{
        encoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
        sampleRateHz: Type.TInteger;
        channels: Type.TInteger;
      }>>>;
      outputAudioFormats: Type.TOptional<Type.TArray<Type.TObject<{
        encoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
        sampleRateHz: Type.TInteger;
        channels: Type.TInteger;
      }>>>;
      supportsBrowserSession: Type.TOptional<Type.TBoolean>;
      supportsBargeIn: Type.TOptional<Type.TBoolean>;
      supportsToolCalls: Type.TOptional<Type.TBoolean>;
      supportsVideoFrames: Type.TOptional<Type.TBoolean>;
      supportsSessionResumption: Type.TOptional<Type.TBoolean>;
    }>>;
  }>;
}>;
/** Session creation result with transport-specific ids and credentials. */
declare const TalkSessionCreateResultSchema: Type.TObject<{
  sessionId: Type.TString;
  provider: Type.TOptional<Type.TString>;
  mode: Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>;
  transport: Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>;
  brain: Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>;
  relaySessionId: Type.TOptional<Type.TString>;
  transcriptionSessionId: Type.TOptional<Type.TString>;
  handoffId: Type.TOptional<Type.TString>;
  roomId: Type.TOptional<Type.TString>;
  roomUrl: Type.TOptional<Type.TString>;
  token: Type.TOptional<Type.TString>;
  audio: Type.TOptional<Type.TUnknown>;
  model: Type.TOptional<Type.TString>;
  voice: Type.TOptional<Type.TString>;
  expiresAt: Type.TOptional<Type.TNumber>;
}>;
/** Result for a Talk turn request, optionally including emitted events. */
declare const TalkSessionTurnResultSchema: Type.TObject<{
  ok: Type.TBoolean;
  turnId: Type.TOptional<Type.TString>;
  events: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"session.started">, Type.TLiteral<"session.ready">, Type.TLiteral<"session.closed">, Type.TLiteral<"session.error">, Type.TLiteral<"session.replaced">, Type.TLiteral<"turn.started">, Type.TLiteral<"turn.ended">, Type.TLiteral<"turn.cancelled">, Type.TLiteral<"capture.started">, Type.TLiteral<"capture.stopped">, Type.TLiteral<"capture.cancelled">, Type.TLiteral<"capture.once">, Type.TLiteral<"input.audio.delta">, Type.TLiteral<"input.audio.committed">, Type.TLiteral<"transcript.delta">, Type.TLiteral<"transcript.done">, Type.TLiteral<"output.text.delta">, Type.TLiteral<"output.text.done">, Type.TLiteral<"output.audio.started">, Type.TLiteral<"output.audio.delta">, Type.TLiteral<"output.audio.done">, Type.TLiteral<"tool.call">, Type.TLiteral<"tool.progress">, Type.TLiteral<"tool.result">, Type.TLiteral<"tool.error">, Type.TLiteral<"usage.metrics">, Type.TLiteral<"latency.metrics">, Type.TLiteral<"health.changed">]>;
    sessionId: Type.TString;
    turnId: Type.TOptional<Type.TString>;
    captureId: Type.TOptional<Type.TString>;
    seq: Type.TInteger;
    timestamp: Type.TString;
    mode: Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>;
    transport: Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>;
    brain: Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>;
    provider: Type.TOptional<Type.TString>;
    final: Type.TOptional<Type.TBoolean>;
    callId: Type.TOptional<Type.TString>;
    itemId: Type.TOptional<Type.TString>;
    parentId: Type.TOptional<Type.TString>;
    payload: Type.TUnknown;
  }>>>;
}>;
/** Managed-room record returned to clients after joining an existing Talk session. */
declare const TalkSessionJoinResultSchema: Type.TObject<{
  id: Type.TString;
  roomId: Type.TString;
  roomUrl: Type.TString;
  sessionKey: Type.TString;
  sessionId: Type.TOptional<Type.TString>;
  channel: Type.TOptional<Type.TString>;
  target: Type.TOptional<Type.TString>;
  provider: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  voice: Type.TOptional<Type.TString>;
  mode: Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>;
  transport: Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>;
  brain: Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>;
  createdAt: Type.TNumber;
  expiresAt: Type.TNumber;
  room: Type.TObject<{
    activeClientId: Type.TOptional<Type.TString>;
    activeTurnId: Type.TOptional<Type.TString>;
    recentTalkEvents: Type.TArray<Type.TObject<{
      id: Type.TString;
      type: Type.TUnion<[Type.TLiteral<"session.started">, Type.TLiteral<"session.ready">, Type.TLiteral<"session.closed">, Type.TLiteral<"session.error">, Type.TLiteral<"session.replaced">, Type.TLiteral<"turn.started">, Type.TLiteral<"turn.ended">, Type.TLiteral<"turn.cancelled">, Type.TLiteral<"capture.started">, Type.TLiteral<"capture.stopped">, Type.TLiteral<"capture.cancelled">, Type.TLiteral<"capture.once">, Type.TLiteral<"input.audio.delta">, Type.TLiteral<"input.audio.committed">, Type.TLiteral<"transcript.delta">, Type.TLiteral<"transcript.done">, Type.TLiteral<"output.text.delta">, Type.TLiteral<"output.text.done">, Type.TLiteral<"output.audio.started">, Type.TLiteral<"output.audio.delta">, Type.TLiteral<"output.audio.done">, Type.TLiteral<"tool.call">, Type.TLiteral<"tool.progress">, Type.TLiteral<"tool.result">, Type.TLiteral<"tool.error">, Type.TLiteral<"usage.metrics">, Type.TLiteral<"latency.metrics">, Type.TLiteral<"health.changed">]>;
      sessionId: Type.TString;
      turnId: Type.TOptional<Type.TString>;
      captureId: Type.TOptional<Type.TString>;
      seq: Type.TInteger;
      timestamp: Type.TString;
      mode: Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>;
      transport: Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>;
      brain: Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>;
      provider: Type.TOptional<Type.TString>;
      final: Type.TOptional<Type.TBoolean>;
      callId: Type.TOptional<Type.TString>;
      itemId: Type.TOptional<Type.TString>;
      parentId: Type.TOptional<Type.TString>;
      payload: Type.TUnknown;
    }>>;
  }>;
}>;
/** Generic success result for Talk session lifecycle calls. */
declare const TalkSessionOkResultSchema: Type.TObject<{
  ok: Type.TBoolean;
}>;
/** Union of all browser Talk session setup payloads. */
declare const TalkClientCreateResultSchema: Type.TUnion<[Type.TObject<{
  provider: Type.TString;
  transport: Type.TLiteral<"webrtc">;
  voiceSessionId: Type.TString;
  clientSecret: Type.TString;
  offerUrl: Type.TOptional<Type.TString>;
  offerHeaders: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
  model: Type.TOptional<Type.TString>;
  voice: Type.TOptional<Type.TString>;
  expiresAt: Type.TOptional<Type.TNumber>;
}>, Type.TObject<{
  provider: Type.TString;
  transport: Type.TLiteral<"provider-websocket">;
  voiceSessionId: Type.TString;
  protocol: Type.TString;
  clientSecret: Type.TString;
  websocketUrl: Type.TString;
  audio: Type.TObject<{
    inputEncoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
    inputSampleRateHz: Type.TInteger;
    outputEncoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
    outputSampleRateHz: Type.TInteger;
  }>;
  initialMessage: Type.TOptional<Type.TUnknown>;
  model: Type.TOptional<Type.TString>;
  voice: Type.TOptional<Type.TString>;
  expiresAt: Type.TOptional<Type.TNumber>;
}>, Type.TObject<{
  provider: Type.TString;
  transport: Type.TLiteral<"gateway-relay">;
  voiceSessionId: Type.TOptional<Type.TString>;
  relaySessionId: Type.TString;
  audio: Type.TObject<{
    inputEncoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
    inputSampleRateHz: Type.TInteger;
    outputEncoding: Type.TUnion<[Type.TLiteral<"pcm16">, Type.TLiteral<"g711_ulaw">]>;
    outputSampleRateHz: Type.TInteger;
  }>;
  model: Type.TOptional<Type.TString>;
  voice: Type.TOptional<Type.TString>;
  expiresAt: Type.TOptional<Type.TNumber>;
}>, Type.TObject<{
  provider: Type.TString;
  transport: Type.TLiteral<"managed-room">;
  voiceSessionId: Type.TOptional<Type.TString>;
  roomUrl: Type.TString;
  token: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  voice: Type.TOptional<Type.TString>;
  expiresAt: Type.TOptional<Type.TNumber>;
}>]>;
/** Full Talk config read result, including related session/UI context. */
declare const TalkConfigResultSchema: Type.TObject<{
  config: Type.TObject<{
    talk: Type.TOptional<Type.TObject<{
      provider: Type.TOptional<Type.TString>;
      providers: Type.TOptional<Type.TRecord<"^.*$", Type.TObject<{
        apiKey: Type.TOptional<Type.TUnion<[Type.TString, Type.TUnion<[Type.TObject<{
          source: Type.TLiteral<"env">;
          provider: Type.TString;
          id: Type.TString;
        }>, Type.TObject<{
          source: Type.TLiteral<"file">;
          provider: Type.TString;
          id: Type.TUnsafe<string>;
        }>, Type.TObject<{
          source: Type.TLiteral<"exec">;
          provider: Type.TString;
          id: Type.TString;
        }>]>]>>;
      }>>>;
      realtime: Type.TOptional<Type.TObject<{
        provider: Type.TOptional<Type.TString>;
        providers: Type.TOptional<Type.TRecord<"^.*$", Type.TObject<{
          apiKey: Type.TOptional<Type.TUnion<[Type.TString, Type.TUnion<[Type.TObject<{
            source: Type.TLiteral<"env">;
            provider: Type.TString;
            id: Type.TString;
          }>, Type.TObject<{
            source: Type.TLiteral<"file">;
            provider: Type.TString;
            id: Type.TUnsafe<string>;
          }>, Type.TObject<{
            source: Type.TLiteral<"exec">;
            provider: Type.TString;
            id: Type.TString;
          }>]>]>>;
        }>>>;
        model: Type.TOptional<Type.TString>;
        speakerVoice: Type.TOptional<Type.TString>;
        speakerVoiceId: Type.TOptional<Type.TString>;
        voice: Type.TOptional<Type.TString>;
        instructions: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"realtime">, Type.TLiteral<"stt-tts">, Type.TLiteral<"transcription">]>>;
        transport: Type.TOptional<Type.TUnion<[Type.TLiteral<"webrtc">, Type.TLiteral<"provider-websocket">, Type.TLiteral<"gateway-relay">, Type.TLiteral<"managed-room">]>>;
        vadThreshold: Type.TOptional<Type.TNumber>;
        silenceDurationMs: Type.TOptional<Type.TInteger>;
        prefixPaddingMs: Type.TOptional<Type.TInteger>;
        reasoningEffort: Type.TOptional<Type.TString>;
        brain: Type.TOptional<Type.TUnion<[Type.TLiteral<"agent-consult">, Type.TLiteral<"direct-tools">, Type.TLiteral<"none">]>>;
        consultRouting: Type.TOptional<Type.TUnion<[Type.TLiteral<"provider-direct">, Type.TLiteral<"force-agent-consult">]>>;
      }>>;
      resolved: Type.TOptional<Type.TObject<{
        provider: Type.TString;
        config: Type.TObject<{
          apiKey: Type.TOptional<Type.TUnion<[Type.TString, Type.TUnion<[Type.TObject<{
            source: Type.TLiteral<"env">;
            provider: Type.TString;
            id: Type.TString;
          }>, Type.TObject<{
            source: Type.TLiteral<"file">;
            provider: Type.TString;
            id: Type.TUnsafe<string>;
          }>, Type.TObject<{
            source: Type.TLiteral<"exec">;
            provider: Type.TString;
            id: Type.TString;
          }>]>]>>;
        }>;
      }>>;
      consultThinkingLevel: Type.TOptional<Type.TString>;
      consultFastMode: Type.TOptional<Type.TBoolean>;
      speechLocale: Type.TOptional<Type.TString>;
      interruptOnSpeech: Type.TOptional<Type.TBoolean>;
      silenceTimeoutMs: Type.TOptional<Type.TInteger>;
    }>>;
    session: Type.TOptional<Type.TObject<{
      mainKey: Type.TOptional<Type.TString>;
    }>>;
    ui: Type.TOptional<Type.TObject<{
      seamColor: Type.TOptional<Type.TString>;
    }>>;
  }>;
}>;
/** Text-to-speech result with encoded audio and provider output metadata. */
declare const TalkSpeakResultSchema: Type.TObject<{
  audioBase64: Type.TString;
  provider: Type.TString;
  outputFormat: Type.TOptional<Type.TString>;
  voiceCompatible: Type.TOptional<Type.TBoolean>;
  mimeType: Type.TOptional<Type.TString>;
  fileExtension: Type.TOptional<Type.TString>;
}>;
/** Text-to-speech result for `tts.speak` with encoded audio and provider metadata. */
declare const TtsSpeakResultSchema: Type.TObject<{
  audioBase64: Type.TString;
  provider: Type.TString;
  outputFormat: Type.TOptional<Type.TString>;
  mimeType: Type.TOptional<Type.TString>;
  fileExtension: Type.TOptional<Type.TString>;
}>;
/** Channel status request, optionally probing one channel before returning. */
declare const ChannelsStatusParamsSchema: Type.TObject<{
  probe: Type.TOptional<Type.TBoolean>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  channel: Type.TOptional<Type.TString>;
}>;
/** Full channel status result for dashboard and operator diagnostics. */
declare const ChannelsStatusResultSchema: Type.TObject<{
  ts: Type.TInteger;
  channelOrder: Type.TArray<Type.TString>;
  channelLabels: Type.TRecord<"^.*$", Type.TString>;
  channelDetailLabels: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
  channelSystemImages: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
  channelMeta: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString;
    label: Type.TString;
    detailLabel: Type.TString;
    systemImage: Type.TOptional<Type.TString>;
  }>>>;
  channels: Type.TRecord<"^.*$", Type.TUnknown>;
  channelAccounts: Type.TRecord<"^.*$", Type.TArray<Type.TObject<{
    accountId: Type.TString;
    name: Type.TOptional<Type.TString>;
    enabled: Type.TOptional<Type.TBoolean>;
    configured: Type.TOptional<Type.TBoolean>;
    linked: Type.TOptional<Type.TBoolean>;
    running: Type.TOptional<Type.TBoolean>;
    connected: Type.TOptional<Type.TBoolean>;
    reconnectAttempts: Type.TOptional<Type.TInteger>;
    lastConnectedAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    lastError: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    healthState: Type.TOptional<Type.TString>;
    lastStartAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    lastStopAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    lastInboundAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    lastOutboundAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    lastTransportActivityAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    busy: Type.TOptional<Type.TBoolean>;
    activeRuns: Type.TOptional<Type.TInteger>;
    lastRunActivityAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    activeRunStartedAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    lastProbeAt: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    mode: Type.TOptional<Type.TString>;
    dmPolicy: Type.TOptional<Type.TString>;
    allowFrom: Type.TOptional<Type.TArray<Type.TString>>;
    tokenSource: Type.TOptional<Type.TString>;
    botTokenSource: Type.TOptional<Type.TString>;
    appTokenSource: Type.TOptional<Type.TString>;
    credentialSource: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    audienceType: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    audience: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    webhookPath: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    webhookUrl: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    baseUrl: Type.TOptional<Type.TString>;
    allowUnmentionedGroups: Type.TOptional<Type.TBoolean>;
    cliPath: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    dbPath: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    port: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    probe: Type.TOptional<Type.TUnknown>;
    audit: Type.TOptional<Type.TUnknown>;
    application: Type.TOptional<Type.TUnknown>;
  }>>>;
  channelDefaultAccountId: Type.TRecord<"^.*$", Type.TString>;
  eventLoop: Type.TOptional<Type.TObject<{
    degraded: Type.TBoolean;
    degradedSinceMs: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    reasons: Type.TArray<Type.TUnion<[Type.TLiteral<"event_loop_delay">, Type.TLiteral<"event_loop_utilization">, Type.TLiteral<"cpu">]>>;
    intervalMs: Type.TInteger;
    delayP99Ms: Type.TNumber;
    delayMaxMs: Type.TNumber;
    utilization: Type.TNumber;
    cpuCoreRatio: Type.TNumber;
  }>>;
  partial: Type.TOptional<Type.TBoolean>;
  warnings: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Logs out one channel account. */
declare const ChannelsLogoutParamsSchema: Type.TObject<{
  channel: Type.TString;
  accountId: Type.TOptional<Type.TString>;
}>;
/** Stops one channel account runtime. */
declare const ChannelsStopParamsSchema: Type.TObject<{
  channel: Type.TString;
  accountId: Type.TOptional<Type.TString>;
}>;
/** Starts one channel account runtime. */
declare const ChannelsStartParamsSchema: Type.TObject<{
  channel: Type.TString;
  accountId: Type.TOptional<Type.TString>;
}>;
/** Starts browser/web login for a channel account. */
declare const WebLoginStartParamsSchema: Type.TObject<{
  force: Type.TOptional<Type.TBoolean>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  verbose: Type.TOptional<Type.TBoolean>;
  accountId: Type.TOptional<Type.TString>;
}>;
/** Waits for web login completion or the next QR code. */
declare const WebLoginWaitParamsSchema: Type.TObject<{
  timeoutMs: Type.TOptional<Type.TInteger>;
  accountId: Type.TOptional<Type.TString>;
  currentQrDataUrl: Type.TOptional<Type.TString>;
}>;
type TalkEvent = Static<typeof TalkEventSchema>;
type TalkModeParams = Static<typeof TalkModeParamsSchema>;
type TalkCatalogParams = Static<typeof TalkCatalogParamsSchema>;
type TalkCatalogResult = Static<typeof TalkCatalogResultSchema>;
type TalkConfigParams = Static<typeof TalkConfigParamsSchema>;
type TalkConfigResult = Static<typeof TalkConfigResultSchema>;
type TalkClientCreateParams = Static<typeof TalkClientCreateParamsSchema>;
type TalkClientCreateResult = Static<typeof TalkClientCreateResultSchema>;
type TalkClientSteerParams = Static<typeof TalkClientSteerParamsSchema>;
type TalkAgentControlResult = Static<typeof TalkAgentControlResultSchema>;
type TalkClientToolCallParams = Static<typeof TalkClientToolCallParamsSchema>;
type TalkClientToolCallResult = Static<typeof TalkClientToolCallResultSchema>;
type TalkClientTranscriptParams = Static<typeof TalkClientTranscriptParamsSchema>;
type TalkClientCloseParams = Static<typeof TalkClientCloseParamsSchema>;
type TalkClientMutationResult = Static<typeof TalkClientMutationResultSchema>;
type TalkSessionCreateParams = Static<typeof TalkSessionCreateParamsSchema>;
type TalkSessionCreateResult = Static<typeof TalkSessionCreateResultSchema>;
type TalkSessionJoinParams = Static<typeof TalkSessionJoinParamsSchema>;
type TalkSessionJoinResult = Static<typeof TalkSessionJoinResultSchema>;
type TalkSessionAppendAudioParams = Static<typeof TalkSessionAppendAudioParamsSchema>;
type TalkSessionTurnParams = Static<typeof TalkSessionTurnParamsSchema>;
type TalkSessionCancelTurnParams = Static<typeof TalkSessionCancelTurnParamsSchema>;
type TalkSessionCancelOutputParams = Static<typeof TalkSessionCancelOutputParamsSchema>;
type TalkSessionTurnResult = Static<typeof TalkSessionTurnResultSchema>;
type TalkSessionSteerParams = Static<typeof TalkSessionSteerParamsSchema>;
type TalkSessionSubmitToolResultParams = Static<typeof TalkSessionSubmitToolResultParamsSchema>;
type TalkSessionCloseParams = Static<typeof TalkSessionCloseParamsSchema>;
type TalkSessionOkResult = Static<typeof TalkSessionOkResultSchema>;
type TalkSpeakParams = Static<typeof TalkSpeakParamsSchema>;
type TalkSpeakResult = Static<typeof TalkSpeakResultSchema>;
type TtsSpeakParams = Static<typeof TtsSpeakParamsSchema>;
type TtsSpeakResult = Static<typeof TtsSpeakResultSchema>;
type ChannelsStatusParams = Static<typeof ChannelsStatusParamsSchema>;
type ChannelsStatusResult = Static<typeof ChannelsStatusResultSchema>;
type ChannelsStartParams = Static<typeof ChannelsStartParamsSchema>;
type ChannelsStopParams = Static<typeof ChannelsStopParamsSchema>;
type ChannelsLogoutParams = Static<typeof ChannelsLogoutParamsSchema>;
type WebLoginStartParams = Static<typeof WebLoginStartParamsSchema>;
type WebLoginWaitParams = Static<typeof WebLoginWaitParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/channel-pairing.d.ts
declare const ChannelPairingAccountSchema: Type.TObject<{
  channel: Type.TString;
  channelLabel: Type.TString;
  accountId: Type.TString;
  accountLabel: Type.TOptional<Type.TString>;
  notifySupported: Type.TBoolean;
}>;
declare const ChannelPairingRequestSchema: Type.TObject<{
  requestId: Type.TString;
  channel: Type.TString;
  channelLabel: Type.TString;
  accountId: Type.TString;
  accountLabel: Type.TOptional<Type.TString>;
  senderId: Type.TString;
  senderLabel: Type.TString;
  metadata: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
  createdAt: Type.TString;
  lastSeenAt: Type.TString;
  expiresAt: Type.TString;
  notifySupported: Type.TBoolean;
}>;
/** Lists pending DM sender access requests for pairing-policy channel accounts. */
declare const ChannelsPairingListParamsSchema: Type.TObject<{
  channel: Type.TOptional<Type.TString>;
  accountId: Type.TOptional<Type.TString>;
}>;
declare const ChannelsPairingListResultSchema: Type.TObject<{
  accounts: Type.TArray<Type.TObject<{
    channel: Type.TString;
    channelLabel: Type.TString;
    accountId: Type.TString;
    accountLabel: Type.TOptional<Type.TString>;
    notifySupported: Type.TBoolean;
  }>>;
  requests: Type.TArray<Type.TObject<{
    requestId: Type.TString;
    channel: Type.TString;
    channelLabel: Type.TString;
    accountId: Type.TString;
    accountLabel: Type.TOptional<Type.TString>;
    senderId: Type.TString;
    senderLabel: Type.TString;
    metadata: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
    createdAt: Type.TString;
    lastSeenAt: Type.TString;
    expiresAt: Type.TString;
    notifySupported: Type.TBoolean;
  }>>;
  commandOwnerConfigured: Type.TBoolean;
  limits: Type.TObject<{
    pendingPerAccount: Type.TInteger;
    ttlMs: Type.TInteger;
  }>;
}>;
/** Approves one pending DM sender request. */
declare const ChannelsPairingApproveParamsSchema: Type.TObject<{
  channel: Type.TString;
  accountId: Type.TString;
  requestId: Type.TString;
  notify: Type.TOptional<Type.TBoolean>;
  bootstrapCommandOwner: Type.TOptional<Type.TBoolean>;
}>;
declare const ChannelsPairingApproveResultSchema: Type.TObject<{
  requestId: Type.TString;
  senderId: Type.TString;
  notification: Type.TString;
  commandOwnerBootstrap: Type.TString;
}>;
/** Dismisses one pending request without permanently blocking the sender. */
declare const ChannelsPairingDismissParamsSchema: Type.TObject<{
  channel: Type.TString;
  accountId: Type.TString;
  requestId: Type.TString;
}>;
declare const ChannelsPairingDismissResultSchema: Type.TObject<{
  requestId: Type.TString;
  senderId: Type.TString;
}>;
type ChannelsPairingListParams = Static<typeof ChannelsPairingListParamsSchema>;
type ChannelsPairingListResult = Static<typeof ChannelsPairingListResultSchema>;
type ChannelsPairingApproveParams = Static<typeof ChannelsPairingApproveParamsSchema>;
type ChannelsPairingApproveResult = Static<typeof ChannelsPairingApproveResultSchema>;
type ChannelsPairingDismissParams = Static<typeof ChannelsPairingDismissParamsSchema>;
type ChannelsPairingDismissResult = Static<typeof ChannelsPairingDismissResultSchema>;
type ChannelsPairingAccount = Static<typeof ChannelPairingAccountSchema>;
type ChannelsPairingRequest = Static<typeof ChannelPairingRequestSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/talk-marks.d.ts
/** Acknowledges playback through a named realtime provider mark. */
declare const TalkSessionAcknowledgeMarkParamsSchema: import("typebox").TObject<{
  sessionId: import("typebox").TString;
  markName: import("typebox").TString;
}>;
type TalkSessionAcknowledgeMarkParams = Static<typeof TalkSessionAcknowledgeMarkParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/commands.d.ts
/**
 * Command catalog protocol schemas.
 *
 * Command entries describe native, skill, and plugin commands that clients can
 * render or route; limits keep command catalogs bounded for UI and transport.
 */
/** Maximum command display/name length accepted in catalog entries. */
declare const COMMAND_NAME_MAX_LENGTH = 200;
/** Maximum command description length accepted in catalog entries. */
declare const COMMAND_DESCRIPTION_MAX_LENGTH = 2000;
/** Maximum text aliases advertised for one command. */
declare const COMMAND_ALIAS_MAX_ITEMS = 20;
/** Maximum declared arguments advertised for one command. */
declare const COMMAND_ARGS_MAX_ITEMS = 20;
/** Maximum argument name length accepted in catalog entries. */
declare const COMMAND_ARG_NAME_MAX_LENGTH = 200;
/** Maximum argument description length accepted in catalog entries. */
declare const COMMAND_ARG_DESCRIPTION_MAX_LENGTH = 500;
/** Maximum static choices advertised for one argument. */
declare const COMMAND_ARG_CHOICES_MAX_ITEMS = 50;
/** Maximum machine-readable choice value length. */
declare const COMMAND_CHOICE_VALUE_MAX_LENGTH = 200;
/** Maximum user-facing choice label length. */
declare const COMMAND_CHOICE_LABEL_MAX_LENGTH = 200;
/** Maximum commands returned by one catalog response. */
declare const COMMAND_LIST_MAX_ITEMS = 500;
/** One command catalog entry visible to clients. */
declare const CommandEntrySchema: Type.TObject<{
  name: Type.TString;
  nativeName: Type.TOptional<Type.TString>;
  textAliases: Type.TOptional<Type.TArray<Type.TString>>;
  description: Type.TString;
  category: Type.TOptional<Type.TUnion<[Type.TLiteral<"session">, Type.TLiteral<"options">, Type.TLiteral<"status">, Type.TLiteral<"management">, Type.TLiteral<"media">, Type.TLiteral<"tools">, Type.TLiteral<"docks">]>>;
  source: Type.TUnion<[Type.TLiteral<"native">, Type.TLiteral<"skill">, Type.TLiteral<"plugin">]>; /** Whether a skill command is also present in the model-visible skill catalog. */
  skillModelVisible: Type.TOptional<Type.TBoolean>;
  scope: Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"native">, Type.TLiteral<"both">]>;
  acceptsArgs: Type.TBoolean;
  args: Type.TOptional<Type.TArray<Type.TObject<{
    name: Type.TString;
    description: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"string">, Type.TLiteral<"number">, Type.TLiteral<"boolean">]>;
    required: Type.TOptional<Type.TBoolean>;
    choices: Type.TOptional<Type.TArray<Type.TObject<{
      value: Type.TString;
      label: Type.TString;
    }>>>;
    dynamic: Type.TOptional<Type.TBoolean>;
  }>>>;
}>;
/** Command catalog request filters. */
declare const CommandsListParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  provider: Type.TOptional<Type.TString>;
  scope: Type.TOptional<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"native">, Type.TLiteral<"both">]>>;
  includeArgs: Type.TOptional<Type.TBoolean>;
}>;
/** Bounded command catalog response. */
declare const CommandsListResultSchema: Type.TObject<{
  commands: Type.TArray<Type.TObject<{
    name: Type.TString;
    nativeName: Type.TOptional<Type.TString>;
    textAliases: Type.TOptional<Type.TArray<Type.TString>>;
    description: Type.TString;
    category: Type.TOptional<Type.TUnion<[Type.TLiteral<"session">, Type.TLiteral<"options">, Type.TLiteral<"status">, Type.TLiteral<"management">, Type.TLiteral<"media">, Type.TLiteral<"tools">, Type.TLiteral<"docks">]>>;
    source: Type.TUnion<[Type.TLiteral<"native">, Type.TLiteral<"skill">, Type.TLiteral<"plugin">]>; /** Whether a skill command is also present in the model-visible skill catalog. */
    skillModelVisible: Type.TOptional<Type.TBoolean>;
    scope: Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"native">, Type.TLiteral<"both">]>;
    acceptsArgs: Type.TBoolean;
    args: Type.TOptional<Type.TArray<Type.TObject<{
      name: Type.TString;
      description: Type.TString;
      type: Type.TUnion<[Type.TLiteral<"string">, Type.TLiteral<"number">, Type.TLiteral<"boolean">]>;
      required: Type.TOptional<Type.TBoolean>;
      choices: Type.TOptional<Type.TArray<Type.TObject<{
        value: Type.TString;
        label: Type.TString;
      }>>>;
      dynamic: Type.TOptional<Type.TBoolean>;
    }>>>;
  }>>;
}>;
type CommandEntry = Static<typeof CommandEntrySchema>;
type CommandsListParams = Static<typeof CommandsListParamsSchema>;
type CommandsListResult = Static<typeof CommandsListResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/config.d.ts
/** Empty request payload for reading the current raw config. */
declare const ConfigGetParamsSchema: Type.TObject<{}>;
/** Full raw config replacement request with optional base hash guard. */
declare const ConfigSetParamsSchema: Type.TObject<{
  raw: Type.TString;
  baseHash: Type.TOptional<Type.TString>;
}>;
/** Raw config apply request that may schedule a restart. */
declare const ConfigApplyParamsSchema: Type.TObject<{
  readonly raw: Type.TString;
  readonly baseHash: Type.TOptional<Type.TString>;
  readonly sessionKey: Type.TOptional<Type.TString>;
  readonly deliveryContext: Type.TOptional<Type.TObject<{
    channel: Type.TOptional<Type.TString>;
    to: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
  }>>;
  readonly note: Type.TOptional<Type.TString>;
  readonly restartDelayMs: Type.TOptional<Type.TInteger>;
}>;
/** Raw config patch request that may schedule a restart. */
declare const ConfigPatchParamsSchema: Type.TObject<{
  replacePaths: Type.TOptional<Type.TArray<Type.TString>>;
  raw: Type.TString;
  baseHash: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  deliveryContext: Type.TOptional<Type.TObject<{
    channel: Type.TOptional<Type.TString>;
    to: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
  }>>;
  note: Type.TOptional<Type.TString>;
  restartDelayMs: Type.TOptional<Type.TInteger>;
}>;
/** Empty request payload for fetching the generated config schema. */
declare const ConfigSchemaParamsSchema: Type.TObject<{}>;
/** Schema lookup request for one config path. */
declare const ConfigSchemaLookupParamsSchema: Type.TObject<{
  path: Type.TString;
}>;
/** Empty request payload for checking update/restart status. */
declare const UpdateStatusParamsSchema: Type.TObject<{}>;
/** Request payload for running an update/restart flow with optional channel delivery context. */
declare const UpdateRunParamsSchema: Type.TObject<{
  sessionKey: Type.TOptional<Type.TString>;
  deliveryContext: Type.TOptional<Type.TObject<{
    channel: Type.TOptional<Type.TString>;
    to: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
  }>>;
  note: Type.TOptional<Type.TString>;
  continuationMessage: Type.TOptional<Type.TString>;
  restartDelayMs: Type.TOptional<Type.TInteger>;
  timeoutMs: Type.TOptional<Type.TInteger>;
}>;
/** Full generated config schema response. */
declare const ConfigSchemaResponseSchema: Type.TObject<{
  schema: Type.TUnknown;
  uiHints: Type.TRecord<"^.*$", Type.TObject<{
    label: Type.TOptional<Type.TString>;
    help: Type.TOptional<Type.TString>;
    docsUrl: Type.TOptional<Type.TString>;
    tags: Type.TOptional<Type.TArray<Type.TString>>;
    group: Type.TOptional<Type.TString>;
    order: Type.TOptional<Type.TInteger>;
    advanced: Type.TOptional<Type.TBoolean>;
    sensitive: Type.TOptional<Type.TBoolean>;
    placeholder: Type.TOptional<Type.TString>;
    presentation: Type.TOptional<Type.TLiteral<"phone-number">>;
    itemTemplate: Type.TOptional<Type.TUnknown>;
  }>>;
  version: Type.TString;
  generatedAt: Type.TString;
}>;
/** Schema lookup response for one config path and its immediate children. */
declare const ConfigSchemaLookupResultSchema: Type.TObject<{
  path: Type.TString;
  schema: Type.TUnknown;
  reloadKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"restart">, Type.TLiteral<"hot">, Type.TLiteral<"none">]>>;
  hint: Type.TOptional<Type.TObject<{
    label: Type.TOptional<Type.TString>;
    help: Type.TOptional<Type.TString>;
    docsUrl: Type.TOptional<Type.TString>;
    tags: Type.TOptional<Type.TArray<Type.TString>>;
    group: Type.TOptional<Type.TString>;
    order: Type.TOptional<Type.TInteger>;
    advanced: Type.TOptional<Type.TBoolean>;
    sensitive: Type.TOptional<Type.TBoolean>;
    placeholder: Type.TOptional<Type.TString>;
    presentation: Type.TOptional<Type.TLiteral<"phone-number">>;
    itemTemplate: Type.TOptional<Type.TUnknown>;
  }>>;
  hintPath: Type.TOptional<Type.TString>;
  children: Type.TArray<Type.TObject<{
    key: Type.TString;
    path: Type.TString;
    type: Type.TOptional<Type.TUnion<[Type.TString, Type.TArray<Type.TString>]>>;
    required: Type.TBoolean;
    hasChildren: Type.TBoolean;
    reloadKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"restart">, Type.TLiteral<"hot">, Type.TLiteral<"none">]>>;
    hint: Type.TOptional<Type.TObject<{
      label: Type.TOptional<Type.TString>;
      help: Type.TOptional<Type.TString>;
      docsUrl: Type.TOptional<Type.TString>;
      tags: Type.TOptional<Type.TArray<Type.TString>>;
      group: Type.TOptional<Type.TString>;
      order: Type.TOptional<Type.TInteger>;
      advanced: Type.TOptional<Type.TBoolean>;
      sensitive: Type.TOptional<Type.TBoolean>;
      placeholder: Type.TOptional<Type.TString>;
      presentation: Type.TOptional<Type.TLiteral<"phone-number">>;
      itemTemplate: Type.TOptional<Type.TUnknown>;
    }>>;
    hintPath: Type.TOptional<Type.TString>;
  }>>;
}>;
type ConfigGetParams = Static<typeof ConfigGetParamsSchema>;
type ConfigSetParams = Static<typeof ConfigSetParamsSchema>;
type ConfigApplyParams = Static<typeof ConfigApplyParamsSchema>;
type ConfigPatchParams = Static<typeof ConfigPatchParamsSchema>;
type ConfigSchemaParams = Static<typeof ConfigSchemaParamsSchema>;
type ConfigSchemaLookupParams = Static<typeof ConfigSchemaLookupParamsSchema>;
type ConfigSchemaResponse = Static<typeof ConfigSchemaResponseSchema>;
type ConfigSchemaLookupResult = Static<typeof ConfigSchemaLookupResultSchema>;
type UpdateStatusParams = Static<typeof UpdateStatusParamsSchema>;
type UpdateRunParams = Static<typeof UpdateRunParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/openclaw.d.ts
/**
 * OpenClaw chat lets clients (macOS app onboarding, future UIs) hold the
 * setup/repair conversation over the gateway. The gateway live-tests the
 * configured inference route before creating a session. Omitting `message`
 * returns the welcome/greeting for a verified fresh session without input.
 */
declare const SystemAgentChatParamsSchema: Type.TObject<{
  sessionId: Type.TString; /** Free-text input for conversational and text-only clients. */
  message: Type.TOptional<Type.TString>; /** Typed answer from a client rendering the current `WizardStep`. */
  wizardAnswer: Type.TOptional<Type.TObject<{
    stepId: Type.TString;
    value: Type.TOptional<Type.TUnknown>;
  }>>; /** Seeds a purpose-specific first greeting for a fresh conversation. */
  welcomeVariant: Type.TOptional<Type.TUnion<[Type.TLiteral<"onboarding">, Type.TLiteral<"new-agent">]>>; /** Drop any in-flight approval/wizard state and start the session over. */
  reset: Type.TOptional<Type.TBoolean>; /** Ephemeral Control UI location hint for interpreting the current user turn. */
  context: Type.TOptional<Type.TObject<{
    page: Type.TString;
  }>>; /** Host-only regular-agent delegation context. Never model-authored. */
  delegation: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    turnSourceChannel: Type.TOptional<Type.TString>;
    turnSourceTo: Type.TOptional<Type.TString>;
    turnSourceAccountId: Type.TOptional<Type.TString>;
    turnSourceThreadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
  }>>;
}>;
/**
 * Structured choice attached to a chat reply. Card-capable clients render the
 * options and send back `reply` (default: `label`) as the next message; text
 * clients ignore this and use the reply prose, which always stands alone.
 */
declare const SystemAgentChatQuestionSchema: Type.TObject<{
  id: Type.TString;
  header: Type.TString;
  question: Type.TString;
  options: Type.TArray<Type.TObject<{
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
    recommended: Type.TOptional<Type.TBoolean>; /** Message text a client sends when this option is chosen; defaults to label. */
    reply: Type.TOptional<Type.TString>;
  }>>; /** Free-text answers are also accepted for this question. */
  isOther: Type.TOptional<Type.TBoolean>; /** Client-owned action for the visible skip control; omitted means send a reply. */
  skipAction: Type.TOptional<Type.TLiteral<"exit">>;
}>;
/** One OpenClaw reply; `action` tells clients about conversation handoffs. */
declare const SystemAgentChatResultSchema: Type.TObject<{
  sessionId: Type.TString;
  reply: Type.TString; /** The next reply is a hosted-wizard secret and clients must mask its input/echo. */
  sensitive: Type.TOptional<Type.TBoolean>; /** The hosted wizard will consume the next message as its current step answer. */
  wizardInputPending: Type.TOptional<Type.TBoolean>;
  action: Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"open-agent">, Type.TLiteral<"exit">]>; /** Optional localized-draft intent for an `open-agent` handoff. */
  agentDraft: Type.TOptional<Type.TLiteral<"hatch">>; /** Destination agent for a specific `open-agent` handoff. */
  agentId: Type.TOptional<Type.TString>;
  needsApproval: Type.TOptional<Type.TBoolean>;
  proposalId: Type.TOptional<Type.TString>;
  question: Type.TOptional<Type.TObject<{
    id: Type.TString;
    header: Type.TString;
    question: Type.TString;
    options: Type.TArray<Type.TObject<{
      label: Type.TString;
      description: Type.TOptional<Type.TString>;
      recommended: Type.TOptional<Type.TBoolean>; /** Message text a client sends when this option is chosen; defaults to label. */
      reply: Type.TOptional<Type.TString>;
    }>>; /** Free-text answers are also accepted for this question. */
    isOther: Type.TOptional<Type.TBoolean>; /** Client-owned action for the visible skip control; omitted means send a reply. */
    skipAction: Type.TOptional<Type.TLiteral<"exit">>;
  }>>;
  /**
   * The awaited wizard step in full. `question` above is a lossy card projection
   * of the same step, so control-capable clients render this instead.
   */
  step: Type.TOptional<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"note">, Type.TLiteral<"select">, Type.TLiteral<"text">, Type.TLiteral<"confirm">, Type.TLiteral<"multiselect">, Type.TLiteral<"progress">, Type.TLiteral<"action">]>;
    title: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    format: Type.TOptional<Type.TUnion<[Type.TLiteral<"plain">]>>;
    options: Type.TOptional<Type.TArray<Type.TObject<{
      value: Type.TUnknown;
      label: Type.TString;
      hint: Type.TOptional<Type.TString>;
    }>>>;
    initialValue: Type.TOptional<Type.TUnknown>;
    placeholder: Type.TOptional<Type.TString>;
    sensitive: Type.TOptional<Type.TBoolean>;
    executor: Type.TOptional<Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"client">]>>;
    externalUrl: Type.TOptional<Type.TString>;
    deviceCode: Type.TOptional<Type.TObject<{
      code: Type.TString;
      expiresInMinutes: Type.TOptional<Type.TInteger>;
      message: Type.TOptional<Type.TString>;
    }>>;
  }>>;
}>;
declare const SystemAgentChatHistoryParamsSchema: Type.TObject<{
  limit: Type.TOptional<Type.TInteger>;
}>;
declare const SystemAgentChatHistoryTurnSchema: Type.TObject<{
  role: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"assistant">]>;
  text: Type.TString;
  at: Type.TNumber;
}>;
declare const SystemAgentChatHistoryResultSchema: Type.TObject<{
  turns: Type.TArray<Type.TObject<{
    role: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"assistant">]>;
    text: Type.TString;
    at: Type.TNumber;
  }>>;
}>;
declare const SystemChangeKindSchema: Type.TUnion<[Type.TLiteral<"operation">, Type.TLiteral<"config-write">, Type.TLiteral<"external-edit">]>;
declare const SystemChangeSourceSchema: Type.TUnion<[Type.TLiteral<"system-agent">, Type.TLiteral<"doctor">, Type.TLiteral<"config-rpc">, Type.TLiteral<"cli">, Type.TLiteral<"plugin-install">, Type.TLiteral<"external">, Type.TLiteral<"unknown">]>;
declare const SystemChangeEntrySchema: Type.TObject<{
  id: Type.TString;
  at: Type.TNumber;
  kind: Type.TUnion<[Type.TLiteral<"operation">, Type.TLiteral<"config-write">, Type.TLiteral<"external-edit">]>;
  source: Type.TUnion<[Type.TLiteral<"system-agent">, Type.TLiteral<"doctor">, Type.TLiteral<"config-rpc">, Type.TLiteral<"cli">, Type.TLiteral<"plugin-install">, Type.TLiteral<"external">, Type.TLiteral<"unknown">]>;
  summary: Type.TString;
  changedPaths: Type.TOptional<Type.TArray<Type.TString>>;
  invalid: Type.TOptional<Type.TBoolean>;
  opaqueChange: Type.TOptional<Type.TBoolean>;
}>;
declare const SystemChangesListParamsSchema: Type.TObject<{
  limit: Type.TOptional<Type.TInteger>;
  beforeCursor: Type.TOptional<Type.TString>;
}>;
declare const SystemChangesListResultSchema: Type.TObject<{
  entries: Type.TArray<Type.TObject<{
    id: Type.TString;
    at: Type.TNumber;
    kind: Type.TUnion<[Type.TLiteral<"operation">, Type.TLiteral<"config-write">, Type.TLiteral<"external-edit">]>;
    source: Type.TUnion<[Type.TLiteral<"system-agent">, Type.TLiteral<"doctor">, Type.TLiteral<"config-rpc">, Type.TLiteral<"cli">, Type.TLiteral<"plugin-install">, Type.TLiteral<"external">, Type.TLiteral<"unknown">]>;
    summary: Type.TString;
    changedPaths: Type.TOptional<Type.TArray<Type.TString>>;
    invalid: Type.TOptional<Type.TBoolean>;
    opaqueChange: Type.TOptional<Type.TBoolean>;
  }>>;
  nextCursor: Type.TOptional<Type.TString>;
}>;
/**
 * Structured first-run inference setup for GUI clients: detect reusable AI
 * access (CLI logins, env keys, existing config), then activate one choice.
 * Activation live-tests the candidate and persists it only on success, so a
 * client can walk the ladder candidate-by-candidate without ever leaving a
 * broken default model behind.
 */
declare const SystemAgentSetupDetectParamsSchema: Type.TObject<{}>;
declare const SystemAgentSetupDetectResultSchema: Type.TObject<{
  candidates: Type.TArray<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"existing-model">, Type.TLiteral<"openai-api-key">, Type.TLiteral<"anthropic-api-key">, Type.TLiteral<"claude-cli">, Type.TLiteral<"codex-cli">, Type.TLiteral<"gemini-cli">, Type.TTemplateLiteral<"^provider-auto:.*$">]>; /** Canonical provider identity for clients with bundled brand artwork. */
    brandId: Type.TOptional<Type.TString>;
    label: Type.TString;
    detail: Type.TString;
    modelRef: Type.TString;
    recommended: Type.TBoolean; /** true: verified; false: definitively logged out; absent: unknown. */
    credentials: Type.TOptional<Type.TBoolean>;
    icon: Type.TOptional<Type.TString>;
    website: Type.TOptional<Type.TString>;
  }>>;
  unavailableCandidates: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString; /** Canonical provider identity for clients with bundled brand artwork. */
    brandId: Type.TOptional<Type.TString>;
    label: Type.TString;
    detail: Type.TString;
    reason: Type.TString;
    authOptionId: Type.TOptional<Type.TString>;
    manualProviderId: Type.TOptional<Type.TString>;
    icon: Type.TOptional<Type.TString>;
    website: Type.TOptional<Type.TString>;
  }>>>; /** Text-inference key/token methods exposed by the Gateway provider registry. */
  manualProviders: Type.TArray<Type.TObject<{
    /** Opaque provider-auth choice sent back during activation. */id: Type.TString; /** Canonical provider identity for clients with bundled brand artwork. */
    brandId: Type.TOptional<Type.TString>; /** Provider family shown above the specific credential method. */
    groupLabel: Type.TOptional<Type.TString>;
    label: Type.TString;
    hint: Type.TOptional<Type.TString>;
    icon: Type.TOptional<Type.TString>;
    website: Type.TOptional<Type.TString>;
  }>>; /** Provider-owned browser and device-code login methods. */
  authOptions: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString; /** Canonical provider identity for clients with bundled brand artwork. */
    brandId: Type.TOptional<Type.TString>;
    label: Type.TString;
    hint: Type.TOptional<Type.TString>;
    groupLabel: Type.TOptional<Type.TString>;
    icon: Type.TOptional<Type.TString>;
    website: Type.TOptional<Type.TString>;
    kind: Type.TUnion<[Type.TLiteral<"oauth">, Type.TLiteral<"device-code">]>;
    featured: Type.TBoolean;
  }>>>; /** Provider-owned app-guided local model setup methods. */
  prepareOptions: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString; /** Canonical provider identity for clients with bundled brand artwork. */
    brandId: Type.TOptional<Type.TString>;
    label: Type.TString;
    hint: Type.TOptional<Type.TString>;
    actionLabel: Type.TOptional<Type.TString>;
    icon: Type.TOptional<Type.TString>;
    website: Type.TOptional<Type.TString>;
  }>>>;
  recommendedInstalls: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString; /** Canonical provider or tool identity for bundled client artwork. */
    brandId: Type.TOptional<Type.TString>;
    label: Type.TString;
    hint: Type.TString;
    website: Type.TString;
    icon: Type.TString;
  }>>>;
  workspace: Type.TString;
  codexAppServerDetected: Type.TOptional<Type.TBoolean>;
  configuredModel: Type.TOptional<Type.TString>;
  setupComplete: Type.TBoolean;
}>;
/** Live verification of the Gateway's current default-agent inference route. */
declare const SystemAgentSetupVerifyParamsSchema: Type.TObject<{}>;
declare const SystemAgentSetupVerifyResultSchema: Type.TUnion<[Type.TObject<{
  ok: Type.TLiteral<true>;
  modelRef: Type.TString;
  latencyMs: Type.TNumber;
}>, Type.TObject<{
  ok: Type.TLiteral<false>;
  status: Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"rate_limit">, Type.TLiteral<"billing">, Type.TLiteral<"timeout">, Type.TLiteral<"format">, Type.TLiteral<"unavailable">, Type.TLiteral<"unknown">]>;
  error: Type.TString;
}>]>;
declare const SystemAgentSetupActivateParamsSchema: Type.TObject<{
  kind: Type.TUnion<[Type.TLiteral<"existing-model">, Type.TLiteral<"openai-api-key">, Type.TLiteral<"anthropic-api-key">, Type.TLiteral<"claude-cli">, Type.TLiteral<"codex-cli">, Type.TLiteral<"gemini-cli">, Type.TTemplateLiteral<"^provider-auto:.*$">, Type.TLiteral<"api-key">]>; /** Exact detected model for this route; prevents detect/activate drift. */
  modelRef: Type.TOptional<Type.TString>; /** Manual step only: opaque provider-auth choice returned by detection. */
  authChoice: Type.TOptional<Type.TString>; /** Manual step only: the pasted API key or token; masked by clients, never echoed. */
  apiKey: Type.TOptional<Type.TString>;
  workspace: Type.TOptional<Type.TString>;
}>;
declare const SystemAgentSetupActivateResultSchema: Type.TObject<{
  ok: Type.TBoolean; /** Present on success: the model ref that answered the live test. */
  modelRef: Type.TOptional<Type.TString>;
  latencyMs: Type.TOptional<Type.TNumber>; /** Human-readable setup summary lines (workspace, model, gateway). */
  lines: Type.TOptional<Type.TArray<Type.TString>>; /** Present on failure: coarse bucket for client copy + docs links. */
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"auth">, Type.TLiteral<"rate_limit">, Type.TLiteral<"billing">, Type.TLiteral<"timeout">, Type.TLiteral<"format">, Type.TLiteral<"unavailable">, Type.TLiteral<"unknown">]>>;
  error: Type.TOptional<Type.TString>;
}>;
/** Starts one provider-owned interactive login as a gateway wizard session. */
declare const SystemAgentSetupAuthStartParamsSchema: Type.TObject<{
  /** Client-generated so cancellation remains possible if the start reply is lost. */sessionId: Type.TString;
  authChoice: Type.TString;
  workspace: Type.TOptional<Type.TString>;
}>;
declare const SystemAgentSetupAuthStartResultSchema: Type.TObject<{
  done: Type.TBoolean;
  step: Type.TOptional<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"note">, Type.TLiteral<"select">, Type.TLiteral<"text">, Type.TLiteral<"confirm">, Type.TLiteral<"multiselect">, Type.TLiteral<"progress">, Type.TLiteral<"action">]>;
    title: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    format: Type.TOptional<Type.TUnion<[Type.TLiteral<"plain">]>>;
    options: Type.TOptional<Type.TArray<Type.TObject<{
      value: Type.TUnknown;
      label: Type.TString;
      hint: Type.TOptional<Type.TString>;
    }>>>;
    initialValue: Type.TOptional<Type.TUnknown>;
    placeholder: Type.TOptional<Type.TString>;
    sensitive: Type.TOptional<Type.TBoolean>;
    executor: Type.TOptional<Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"client">]>>;
    externalUrl: Type.TOptional<Type.TString>;
    deviceCode: Type.TOptional<Type.TObject<{
      code: Type.TString;
      expiresInMinutes: Type.TOptional<Type.TInteger>;
      message: Type.TOptional<Type.TString>;
    }>>;
  }>>;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"cancelled">, Type.TLiteral<"error">]>>;
  error: Type.TOptional<Type.TString>;
  channels: Type.TOptional<Type.TArray<Type.TString>>;
  accounts: Type.TOptional<Type.TArray<Type.TObject<{
    channel: Type.TString;
    accountId: Type.TString;
  }>>>;
  preparedModelRef: Type.TOptional<Type.TString>;
  sessionId: Type.TString;
}>;
type SystemAgentChatParams = Static<typeof SystemAgentChatParamsSchema>;
type SystemAgentChatQuestion = Static<typeof SystemAgentChatQuestionSchema>;
type SystemAgentChatResult = Static<typeof SystemAgentChatResultSchema>;
type SystemAgentChatHistoryParams = Static<typeof SystemAgentChatHistoryParamsSchema>;
type SystemAgentChatHistoryTurn = Static<typeof SystemAgentChatHistoryTurnSchema>;
type SystemAgentChatHistoryResult = Static<typeof SystemAgentChatHistoryResultSchema>;
type SystemChangeEntry = Static<typeof SystemChangeEntrySchema>;
type SystemChangeKind = Static<typeof SystemChangeKindSchema>;
type SystemChangeSource = Static<typeof SystemChangeSourceSchema>;
type SystemChangesListParams = Static<typeof SystemChangesListParamsSchema>;
type SystemChangesListResult = Static<typeof SystemChangesListResultSchema>;
type SystemAgentSetupDetectParams = Static<typeof SystemAgentSetupDetectParamsSchema>;
type SystemAgentSetupDetectResult = Static<typeof SystemAgentSetupDetectResultSchema>;
type SystemAgentSetupActivateParams = Static<typeof SystemAgentSetupActivateParamsSchema>;
type SystemAgentSetupActivateResult = Static<typeof SystemAgentSetupActivateResultSchema>;
type SystemAgentSetupVerifyParams = Static<typeof SystemAgentSetupVerifyParamsSchema>;
type SystemAgentSetupVerifyResult = Static<typeof SystemAgentSetupVerifyResultSchema>;
type SystemAgentSetupAuthStartParams = Static<typeof SystemAgentSetupAuthStartParamsSchema>;
type SystemAgentSetupAuthStartResult = Static<typeof SystemAgentSetupAuthStartResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/cron.d.ts
/** Optional dynamic-cadence bounds stored with a cron job. */
declare const CronPacingSchema: Type.TObject<{
  min: Type.TOptional<Type.TString>;
  max: Type.TOptional<Type.TString>;
}>;
/** Delivery policy for cron run output. */
declare const CronDeliverySchema: Type.TUnion<[Type.TObject<{
  to: Type.TOptional<Type.TString>;
  channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
  threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
  accountId: Type.TOptional<Type.TString>;
  bestEffort: Type.TOptional<Type.TBoolean>;
  failureDestination: Type.TOptional<Type.TObject<{
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    to: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
  }>>;
  mode: Type.TLiteral<"none">;
}>, Type.TObject<{
  completionDestination: Type.TOptional<Type.TObject<{
    mode: Type.TLiteral<"webhook">;
    to: Type.TString;
  }>>;
  to: Type.TOptional<Type.TString>;
  channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
  threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
  accountId: Type.TOptional<Type.TString>;
  bestEffort: Type.TOptional<Type.TBoolean>;
  failureDestination: Type.TOptional<Type.TObject<{
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    to: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
  }>>;
  mode: Type.TLiteral<"announce">;
}>, Type.TObject<{
  to: Type.TString;
  channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
  threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
  accountId: Type.TOptional<Type.TString>;
  bestEffort: Type.TOptional<Type.TBoolean>;
  failureDestination: Type.TOptional<Type.TObject<{
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    to: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
  }>>;
  mode: Type.TLiteral<"webhook">;
}>]>;
/** Scheduler-maintained state for the latest run/delivery outcome. */
declare const CronJobStateSchema: Type.TObject<{
  nextRunAtMs: Type.TOptional<Type.TInteger>;
  scheduleActivatedAtMs: Type.TOptional<Type.TInteger>;
  runningAtMs: Type.TOptional<Type.TInteger>;
  lastRunAtMs: Type.TOptional<Type.TInteger>;
  lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
  lastStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
  lastError: Type.TOptional<Type.TString>;
  lastDiagnostics: Type.TOptional<Type.TObject<{
    summary: Type.TOptional<Type.TString>;
    entries: Type.TArray<Type.TObject<{
      ts: Type.TInteger;
      source: Type.TUnion<[Type.TLiteral<"cron-preflight">, Type.TLiteral<"cron-setup">, Type.TLiteral<"model-preflight">, Type.TLiteral<"agent-run">, Type.TLiteral<"tool">, Type.TLiteral<"exec">, Type.TLiteral<"delivery">]>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"error">]>;
      message: Type.TString;
      toolName: Type.TOptional<Type.TString>;
      exitCode: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
      truncated: Type.TOptional<Type.TBoolean>;
    }>>;
  }>>;
  lastDiagnosticSummary: Type.TOptional<Type.TString>;
  lastErrorReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
  lastDurationMs: Type.TOptional<Type.TInteger>;
  consecutiveErrors: Type.TOptional<Type.TInteger>;
  autoDisabled: Type.TOptional<Type.TObject<{
    reason: Type.TUnion<[Type.TLiteral<"consecutive-failures">, Type.TLiteral<"schedule-errors">]>;
    atMs: Type.TInteger;
    consecutiveErrors: Type.TInteger;
  }>>;
  consecutiveSkipped: Type.TOptional<Type.TInteger>;
  lastDelivered: Type.TOptional<Type.TBoolean>;
  lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  lastDeliveryError: Type.TOptional<Type.TString>;
  lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
  lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
  lastFailureAlertAtMs: Type.TOptional<Type.TInteger>;
  lastTriggerEvalAtMs: Type.TOptional<Type.TInteger>;
  triggerEvalCount: Type.TOptional<Type.TInteger>;
  lastTriggerFireAtMs: Type.TOptional<Type.TInteger>;
  triggerState: Type.TOptional<Type.TUnknown>;
  streamStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"starting">, Type.TLiteral<"running">, Type.TLiteral<"restarting">, Type.TLiteral<"stopped">, Type.TLiteral<"disabled">, Type.TLiteral<"error">]>>;
  streamError: Type.TOptional<Type.TString>;
  streamConsecutiveFailures: Type.TOptional<Type.TInteger>;
  streamRestartExhausted: Type.TOptional<Type.TBoolean>;
  streamSourceIdentity: Type.TOptional<Type.TString>;
  streamDroppedBatches: Type.TOptional<Type.TInteger>;
  streamCoalescedBatches: Type.TOptional<Type.TInteger>;
  streamLastStartedAtMs: Type.TOptional<Type.TInteger>;
  streamLastExitAtMs: Type.TOptional<Type.TInteger>;
}>;
/** Persisted cron job definition returned by scheduler list/get APIs. */
declare const CronJobSchema: Type.TObject<{
  id: Type.TString;
  declarationKey: Type.TOptional<Type.TString>;
  displayName: Type.TOptional<Type.TString>;
  owner: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
  }>>;
  scheduledToolPolicy: Type.TOptional<Type.TUnion<[Type.TObject<{
    version: Type.TLiteral<1>;
    mode: Type.TLiteral<"trusted">;
  }>, Type.TObject<{
    version: Type.TLiteral<1>;
    mode: Type.TLiteral<"account">;
    ownerSessionKey: Type.TString;
    ownerAccountId: Type.TString;
  }>]>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  name: Type.TString;
  description: Type.TOptional<Type.TString>;
  enabled: Type.TBoolean;
  deleteAfterRun: Type.TOptional<Type.TBoolean>;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger; /** Opaque Gateway-computed token for the job definition, excluding scheduler state. */
  configRevision: Type.TOptional<Type.TString>;
  schedule: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"at">;
    at: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"every">;
    everyMs: Type.TInteger;
    anchorMs: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"cron">;
    expr: Type.TString;
    tz: Type.TOptional<Type.TString>;
    staggerMs: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"on-exit">;
    command: Type.TString;
    cwd: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"stream">;
    command: Type.TArray<Type.TString>;
    cwd: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"line">, Type.TLiteral<"match">]>>;
    match: Type.TOptional<Type.TString>;
    batchMs: Type.TOptional<Type.TInteger>;
    maxBatchBytes: Type.TOptional<Type.TInteger>;
  }>]>;
  pacing: Type.TOptional<Type.TObject<{
    min: Type.TOptional<Type.TString>;
    max: Type.TOptional<Type.TString>;
  }>>;
  trigger: Type.TOptional<Type.TObject<{
    script: Type.TString;
    once: Type.TOptional<Type.TBoolean>;
  }>>;
  sessionTarget: Type.TUnion<[Type.TLiteral<"main">, Type.TLiteral<"isolated">, Type.TLiteral<"current">, Type.TString]>;
  wakeMode: Type.TUnion<[Type.TLiteral<"next-heartbeat">, Type.TLiteral<"now">]>;
  payload: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"systemEvent">;
    text: Type.TString;
    toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"agentTurn">;
    message: Type.TSchema;
    model: Type.TOptional<Type.TSchema>;
    fallbacks: Type.TOptional<Type.TSchema>;
    thinking: Type.TOptional<Type.TSchema>;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    allowUnsafeExternalContent: Type.TOptional<Type.TBoolean>;
    lightContext: Type.TOptional<Type.TBoolean>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"command">;
    argv: Type.TSchema;
    cwd: Type.TOptional<Type.TString>;
    env: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
    input: Type.TOptional<Type.TString>;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    noOutputTimeoutSeconds: Type.TOptional<Type.TNumber>;
    outputMaxBytes: Type.TOptional<Type.TInteger>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"script">;
    script: Type.TSchema;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    toolBudget: Type.TOptional<Type.TInteger>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"heartbeat">;
  }>]>;
  delivery: Type.TOptional<Type.TUnion<[Type.TObject<{
    to: Type.TOptional<Type.TString>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"none">;
  }>, Type.TObject<{
    completionDestination: Type.TOptional<Type.TObject<{
      mode: Type.TLiteral<"webhook">;
      to: Type.TString;
    }>>;
    to: Type.TOptional<Type.TString>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"announce">;
  }>, Type.TObject<{
    to: Type.TString;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"webhook">;
  }>]>>;
  failureAlert: Type.TOptional<Type.TUnion<[Type.TLiteral<false>, Type.TObject<{
    after: Type.TOptional<Type.TInteger>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    to: Type.TOptional<Type.TString>;
    cooldownMs: Type.TOptional<Type.TInteger>;
    includeSkipped: Type.TOptional<Type.TBoolean>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    accountId: Type.TOptional<Type.TString>;
  }>]>>;
  state: Type.TObject<{
    nextRunAtMs: Type.TOptional<Type.TInteger>;
    scheduleActivatedAtMs: Type.TOptional<Type.TInteger>;
    runningAtMs: Type.TOptional<Type.TInteger>;
    lastRunAtMs: Type.TOptional<Type.TInteger>;
    lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
    lastStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
    lastError: Type.TOptional<Type.TString>;
    lastDiagnostics: Type.TOptional<Type.TObject<{
      summary: Type.TOptional<Type.TString>;
      entries: Type.TArray<Type.TObject<{
        ts: Type.TInteger;
        source: Type.TUnion<[Type.TLiteral<"cron-preflight">, Type.TLiteral<"cron-setup">, Type.TLiteral<"model-preflight">, Type.TLiteral<"agent-run">, Type.TLiteral<"tool">, Type.TLiteral<"exec">, Type.TLiteral<"delivery">]>;
        severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"error">]>;
        message: Type.TString;
        toolName: Type.TOptional<Type.TString>;
        exitCode: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
        truncated: Type.TOptional<Type.TBoolean>;
      }>>;
    }>>;
    lastDiagnosticSummary: Type.TOptional<Type.TString>;
    lastErrorReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
    lastDurationMs: Type.TOptional<Type.TInteger>;
    consecutiveErrors: Type.TOptional<Type.TInteger>;
    autoDisabled: Type.TOptional<Type.TObject<{
      reason: Type.TUnion<[Type.TLiteral<"consecutive-failures">, Type.TLiteral<"schedule-errors">]>;
      atMs: Type.TInteger;
      consecutiveErrors: Type.TInteger;
    }>>;
    consecutiveSkipped: Type.TOptional<Type.TInteger>;
    lastDelivered: Type.TOptional<Type.TBoolean>;
    lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastDeliveryError: Type.TOptional<Type.TString>;
    lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
    lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
    lastFailureAlertAtMs: Type.TOptional<Type.TInteger>;
    lastTriggerEvalAtMs: Type.TOptional<Type.TInteger>;
    triggerEvalCount: Type.TOptional<Type.TInteger>;
    lastTriggerFireAtMs: Type.TOptional<Type.TInteger>;
    triggerState: Type.TOptional<Type.TUnknown>;
    streamStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"starting">, Type.TLiteral<"running">, Type.TLiteral<"restarting">, Type.TLiteral<"stopped">, Type.TLiteral<"disabled">, Type.TLiteral<"error">]>>;
    streamError: Type.TOptional<Type.TString>;
    streamConsecutiveFailures: Type.TOptional<Type.TInteger>;
    streamRestartExhausted: Type.TOptional<Type.TBoolean>;
    streamSourceIdentity: Type.TOptional<Type.TString>;
    streamDroppedBatches: Type.TOptional<Type.TInteger>;
    streamCoalescedBatches: Type.TOptional<Type.TInteger>;
    streamLastStartedAtMs: Type.TOptional<Type.TInteger>;
    streamLastExitAtMs: Type.TOptional<Type.TInteger>;
  }>;
  nextRunAtMs: Type.TOptional<Type.TInteger>;
  lastRunAtMs: Type.TOptional<Type.TInteger>;
  lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
  lastRunError: Type.TOptional<Type.TString>;
  lastDelivered: Type.TOptional<Type.TBoolean>;
  lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  lastDeliveryError: Type.TOptional<Type.TString>;
  lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
  lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
}>;
/** Query params for listing cron jobs with filters and pagination. */
declare const CronListParamsSchema: Type.TObject<{
  includeDisabled: Type.TOptional<Type.TBoolean>;
  limit: Type.TOptional<Type.TInteger>;
  offset: Type.TOptional<Type.TInteger>;
  query: Type.TOptional<Type.TString>;
  enabled: Type.TOptional<Type.TUnion<[Type.TLiteral<"all">, Type.TLiteral<"enabled">, Type.TLiteral<"disabled">]>>;
  scheduleKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"all">, Type.TLiteral<"at">, Type.TLiteral<"every">, Type.TLiteral<"cron">, Type.TLiteral<"on-exit">, Type.TLiteral<"stream">]>>;
  lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"all">, Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">, Type.TLiteral<"unknown">]>>;
  sortBy: Type.TOptional<Type.TUnion<[Type.TLiteral<"nextRunAtMs">, Type.TLiteral<"updatedAtMs">, Type.TLiteral<"name">]>>;
  sortDir: Type.TOptional<Type.TUnion<[Type.TLiteral<"asc">, Type.TLiteral<"desc">]>>;
  agentId: Type.TOptional<Type.TString>;
  compact: Type.TOptional<Type.TBoolean>;
  includeDeliveryPreviews: Type.TOptional<Type.TBoolean>;
}>;
/** Empty request payload for scheduler status. */
declare const CronStatusParamsSchema: Type.TObject<{}>;
/** Looks up a job by stable id or legacy jobId alias. */
declare const CronGetParamsSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
}>, Type.TObject<{
  jobId: Type.TString;
}>]>;
declare const CronScratchSchema: Type.TObject<{
  content: Type.TString;
  revision: Type.TInteger;
  updatedAtMs: Type.TInteger;
}>;
/** Reads private per-job scratch without adding it to the public job schema. */
declare const CronScratchGetParamsSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
}>, Type.TObject<{
  jobId: Type.TString;
}>]>;
declare const CronScratchGetResultSchema: Type.TObject<{
  scratch: Type.TUnion<[Type.TObject<{
    content: Type.TString;
    revision: Type.TInteger;
    updatedAtMs: Type.TInteger;
  }>, Type.TNull]>;
  currentRevision: Type.TInteger;
  maxBytes: Type.TInteger;
}>;
/** Compare-and-swaps or clears private per-job scratch. */
declare const CronScratchSetParamsSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
}>, Type.TObject<{
  jobId: Type.TString;
}>]>;
declare const CronScratchSetResultSchema: Type.TUnion<[Type.TObject<{
  ok: Type.TLiteral<true>;
  scratch: Type.TUnion<[Type.TObject<{
    content: Type.TString;
    revision: Type.TInteger;
    updatedAtMs: Type.TInteger;
  }>, Type.TNull]>;
  currentRevision: Type.TInteger;
  maxBytes: Type.TInteger;
}>, Type.TObject<{
  ok: Type.TLiteral<false>;
  reason: Type.TLiteral<"revision-conflict">;
  currentRevision: Type.TInteger;
}>]>;
/** Creates a scheduled job with schedule, target, payload, and delivery policy. */
declare const CronAddParamsSchema: Type.TObject<{
  schedule: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"at">;
    at: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"every">;
    everyMs: Type.TInteger;
    anchorMs: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"cron">;
    expr: Type.TString;
    tz: Type.TOptional<Type.TString>;
    staggerMs: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"on-exit">;
    command: Type.TString;
    cwd: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"stream">;
    command: Type.TArray<Type.TString>;
    cwd: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"line">, Type.TLiteral<"match">]>>;
    match: Type.TOptional<Type.TString>;
    batchMs: Type.TOptional<Type.TInteger>;
    maxBatchBytes: Type.TOptional<Type.TInteger>;
  }>]>;
  pacing: Type.TOptional<Type.TObject<{
    min: Type.TOptional<Type.TString>;
    max: Type.TOptional<Type.TString>;
  }>>;
  trigger: Type.TOptional<Type.TObject<{
    script: Type.TString;
    once: Type.TOptional<Type.TBoolean>;
  }>>;
  sessionTarget: Type.TUnion<[Type.TLiteral<"main">, Type.TLiteral<"isolated">, Type.TLiteral<"current">, Type.TString]>;
  wakeMode: Type.TUnion<[Type.TLiteral<"next-heartbeat">, Type.TLiteral<"now">]>;
  payload: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"systemEvent">;
    text: Type.TString;
    toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"agentTurn">;
    message: Type.TSchema;
    model: Type.TOptional<Type.TSchema>;
    fallbacks: Type.TOptional<Type.TSchema>;
    thinking: Type.TOptional<Type.TSchema>;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    allowUnsafeExternalContent: Type.TOptional<Type.TBoolean>;
    lightContext: Type.TOptional<Type.TBoolean>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"command">;
    argv: Type.TSchema;
    cwd: Type.TOptional<Type.TString>;
    env: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
    input: Type.TOptional<Type.TString>;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    noOutputTimeoutSeconds: Type.TOptional<Type.TNumber>;
    outputMaxBytes: Type.TOptional<Type.TInteger>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"script">;
    script: Type.TSchema;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    toolBudget: Type.TOptional<Type.TInteger>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>]>;
  delivery: Type.TOptional<Type.TUnion<[Type.TObject<{
    to: Type.TOptional<Type.TString>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"none">;
  }>, Type.TObject<{
    completionDestination: Type.TOptional<Type.TObject<{
      mode: Type.TLiteral<"webhook">;
      to: Type.TString;
    }>>;
    to: Type.TOptional<Type.TString>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"announce">;
  }>, Type.TObject<{
    to: Type.TString;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"webhook">;
  }>]>>;
  failureAlert: Type.TOptional<Type.TUnion<[Type.TLiteral<false>, Type.TObject<{
    after: Type.TOptional<Type.TInteger>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    to: Type.TOptional<Type.TString>;
    cooldownMs: Type.TOptional<Type.TInteger>;
    includeSkipped: Type.TOptional<Type.TBoolean>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    accountId: Type.TOptional<Type.TString>;
  }>]>>;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  sessionKey: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  description: Type.TOptional<Type.TString>;
  enabled: Type.TOptional<Type.TBoolean>;
  deleteAfterRun: Type.TOptional<Type.TBoolean>;
  name: Type.TString;
  declarationKey: Type.TOptional<Type.TString>;
  displayName: Type.TOptional<Type.TString>;
  owner: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
  }>>;
}>;
/** Successful declaration-key convergence result. */
declare const CronDeclarativeAddResultSchema: Type.TObject<{
  created: Type.TBoolean;
  updated: Type.TOptional<Type.TBoolean>;
  job: Type.TObject<{
    id: Type.TString;
    declarationKey: Type.TOptional<Type.TString>;
    displayName: Type.TOptional<Type.TString>;
    owner: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
    }>>;
    scheduledToolPolicy: Type.TOptional<Type.TUnion<[Type.TObject<{
      version: Type.TLiteral<1>;
      mode: Type.TLiteral<"trusted">;
    }>, Type.TObject<{
      version: Type.TLiteral<1>;
      mode: Type.TLiteral<"account">;
      ownerSessionKey: Type.TString;
      ownerAccountId: Type.TString;
    }>]>>;
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    name: Type.TString;
    description: Type.TOptional<Type.TString>;
    enabled: Type.TBoolean;
    deleteAfterRun: Type.TOptional<Type.TBoolean>;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger; /** Opaque Gateway-computed token for the job definition, excluding scheduler state. */
    configRevision: Type.TOptional<Type.TString>;
    schedule: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"at">;
      at: Type.TString;
    }>, Type.TObject<{
      kind: Type.TLiteral<"every">;
      everyMs: Type.TInteger;
      anchorMs: Type.TOptional<Type.TInteger>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"cron">;
      expr: Type.TString;
      tz: Type.TOptional<Type.TString>;
      staggerMs: Type.TOptional<Type.TInteger>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"on-exit">;
      command: Type.TString;
      cwd: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"stream">;
      command: Type.TArray<Type.TString>;
      cwd: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"line">, Type.TLiteral<"match">]>>;
      match: Type.TOptional<Type.TString>;
      batchMs: Type.TOptional<Type.TInteger>;
      maxBatchBytes: Type.TOptional<Type.TInteger>;
    }>]>;
    pacing: Type.TOptional<Type.TObject<{
      min: Type.TOptional<Type.TString>;
      max: Type.TOptional<Type.TString>;
    }>>;
    trigger: Type.TOptional<Type.TObject<{
      script: Type.TString;
      once: Type.TOptional<Type.TBoolean>;
    }>>;
    sessionTarget: Type.TUnion<[Type.TLiteral<"main">, Type.TLiteral<"isolated">, Type.TLiteral<"current">, Type.TString]>;
    wakeMode: Type.TUnion<[Type.TLiteral<"next-heartbeat">, Type.TLiteral<"now">]>;
    payload: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"systemEvent">;
      text: Type.TString;
      toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
      toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"agentTurn">;
      message: Type.TSchema;
      model: Type.TOptional<Type.TSchema>;
      fallbacks: Type.TOptional<Type.TSchema>;
      thinking: Type.TOptional<Type.TSchema>;
      timeoutSeconds: Type.TOptional<Type.TNumber>;
      allowUnsafeExternalContent: Type.TOptional<Type.TBoolean>;
      lightContext: Type.TOptional<Type.TBoolean>;
      toolsAllow: Type.TOptional<Type.TSchema>;
      toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"command">;
      argv: Type.TSchema;
      cwd: Type.TOptional<Type.TString>;
      env: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
      input: Type.TOptional<Type.TString>;
      timeoutSeconds: Type.TOptional<Type.TNumber>;
      noOutputTimeoutSeconds: Type.TOptional<Type.TNumber>;
      outputMaxBytes: Type.TOptional<Type.TInteger>;
      toolsAllow: Type.TOptional<Type.TSchema>;
      toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"script">;
      script: Type.TSchema;
      timeoutSeconds: Type.TOptional<Type.TNumber>;
      toolBudget: Type.TOptional<Type.TInteger>;
      toolsAllow: Type.TOptional<Type.TSchema>;
      toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"heartbeat">;
    }>]>;
    delivery: Type.TOptional<Type.TUnion<[Type.TObject<{
      to: Type.TOptional<Type.TString>;
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      accountId: Type.TOptional<Type.TString>;
      bestEffort: Type.TOptional<Type.TBoolean>;
      failureDestination: Type.TOptional<Type.TObject<{
        channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
        to: Type.TOptional<Type.TString>;
        accountId: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
      }>>;
      mode: Type.TLiteral<"none">;
    }>, Type.TObject<{
      completionDestination: Type.TOptional<Type.TObject<{
        mode: Type.TLiteral<"webhook">;
        to: Type.TString;
      }>>;
      to: Type.TOptional<Type.TString>;
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      accountId: Type.TOptional<Type.TString>;
      bestEffort: Type.TOptional<Type.TBoolean>;
      failureDestination: Type.TOptional<Type.TObject<{
        channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
        to: Type.TOptional<Type.TString>;
        accountId: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
      }>>;
      mode: Type.TLiteral<"announce">;
    }>, Type.TObject<{
      to: Type.TString;
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      accountId: Type.TOptional<Type.TString>;
      bestEffort: Type.TOptional<Type.TBoolean>;
      failureDestination: Type.TOptional<Type.TObject<{
        channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
        to: Type.TOptional<Type.TString>;
        accountId: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
      }>>;
      mode: Type.TLiteral<"webhook">;
    }>]>>;
    failureAlert: Type.TOptional<Type.TUnion<[Type.TLiteral<false>, Type.TObject<{
      after: Type.TOptional<Type.TInteger>;
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      cooldownMs: Type.TOptional<Type.TInteger>;
      includeSkipped: Type.TOptional<Type.TBoolean>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
      accountId: Type.TOptional<Type.TString>;
    }>]>>;
    state: Type.TObject<{
      nextRunAtMs: Type.TOptional<Type.TInteger>;
      scheduleActivatedAtMs: Type.TOptional<Type.TInteger>;
      runningAtMs: Type.TOptional<Type.TInteger>;
      lastRunAtMs: Type.TOptional<Type.TInteger>;
      lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
      lastStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
      lastError: Type.TOptional<Type.TString>;
      lastDiagnostics: Type.TOptional<Type.TObject<{
        summary: Type.TOptional<Type.TString>;
        entries: Type.TArray<Type.TObject<{
          ts: Type.TInteger;
          source: Type.TUnion<[Type.TLiteral<"cron-preflight">, Type.TLiteral<"cron-setup">, Type.TLiteral<"model-preflight">, Type.TLiteral<"agent-run">, Type.TLiteral<"tool">, Type.TLiteral<"exec">, Type.TLiteral<"delivery">]>;
          severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"error">]>;
          message: Type.TString;
          toolName: Type.TOptional<Type.TString>;
          exitCode: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
          truncated: Type.TOptional<Type.TBoolean>;
        }>>;
      }>>;
      lastDiagnosticSummary: Type.TOptional<Type.TString>;
      lastErrorReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
      lastDurationMs: Type.TOptional<Type.TInteger>;
      consecutiveErrors: Type.TOptional<Type.TInteger>;
      autoDisabled: Type.TOptional<Type.TObject<{
        reason: Type.TUnion<[Type.TLiteral<"consecutive-failures">, Type.TLiteral<"schedule-errors">]>;
        atMs: Type.TInteger;
        consecutiveErrors: Type.TInteger;
      }>>;
      consecutiveSkipped: Type.TOptional<Type.TInteger>;
      lastDelivered: Type.TOptional<Type.TBoolean>;
      lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
      lastDeliveryError: Type.TOptional<Type.TString>;
      lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
      lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
      lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
      lastFailureAlertAtMs: Type.TOptional<Type.TInteger>;
      lastTriggerEvalAtMs: Type.TOptional<Type.TInteger>;
      triggerEvalCount: Type.TOptional<Type.TInteger>;
      lastTriggerFireAtMs: Type.TOptional<Type.TInteger>;
      triggerState: Type.TOptional<Type.TUnknown>;
      streamStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"starting">, Type.TLiteral<"running">, Type.TLiteral<"restarting">, Type.TLiteral<"stopped">, Type.TLiteral<"disabled">, Type.TLiteral<"error">]>>;
      streamError: Type.TOptional<Type.TString>;
      streamConsecutiveFailures: Type.TOptional<Type.TInteger>;
      streamRestartExhausted: Type.TOptional<Type.TBoolean>;
      streamSourceIdentity: Type.TOptional<Type.TString>;
      streamDroppedBatches: Type.TOptional<Type.TInteger>;
      streamCoalescedBatches: Type.TOptional<Type.TInteger>;
      streamLastStartedAtMs: Type.TOptional<Type.TInteger>;
      streamLastExitAtMs: Type.TOptional<Type.TInteger>;
    }>;
    nextRunAtMs: Type.TOptional<Type.TInteger>;
    lastRunAtMs: Type.TOptional<Type.TInteger>;
    lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
    lastRunError: Type.TOptional<Type.TString>;
    lastDelivered: Type.TOptional<Type.TBoolean>;
    lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastDeliveryError: Type.TOptional<Type.TString>;
    lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
    lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
  }>;
}>;
/** Successful result from imperative create or declaration-key convergence. */
declare const CronAddResultSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
  declarationKey: Type.TOptional<Type.TString>;
  displayName: Type.TOptional<Type.TString>;
  owner: Type.TOptional<Type.TObject<{
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    accountId: Type.TOptional<Type.TString>;
  }>>;
  scheduledToolPolicy: Type.TOptional<Type.TUnion<[Type.TObject<{
    version: Type.TLiteral<1>;
    mode: Type.TLiteral<"trusted">;
  }>, Type.TObject<{
    version: Type.TLiteral<1>;
    mode: Type.TLiteral<"account">;
    ownerSessionKey: Type.TString;
    ownerAccountId: Type.TString;
  }>]>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  name: Type.TString;
  description: Type.TOptional<Type.TString>;
  enabled: Type.TBoolean;
  deleteAfterRun: Type.TOptional<Type.TBoolean>;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger; /** Opaque Gateway-computed token for the job definition, excluding scheduler state. */
  configRevision: Type.TOptional<Type.TString>;
  schedule: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"at">;
    at: Type.TString;
  }>, Type.TObject<{
    kind: Type.TLiteral<"every">;
    everyMs: Type.TInteger;
    anchorMs: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"cron">;
    expr: Type.TString;
    tz: Type.TOptional<Type.TString>;
    staggerMs: Type.TOptional<Type.TInteger>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"on-exit">;
    command: Type.TString;
    cwd: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"stream">;
    command: Type.TArray<Type.TString>;
    cwd: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"line">, Type.TLiteral<"match">]>>;
    match: Type.TOptional<Type.TString>;
    batchMs: Type.TOptional<Type.TInteger>;
    maxBatchBytes: Type.TOptional<Type.TInteger>;
  }>]>;
  pacing: Type.TOptional<Type.TObject<{
    min: Type.TOptional<Type.TString>;
    max: Type.TOptional<Type.TString>;
  }>>;
  trigger: Type.TOptional<Type.TObject<{
    script: Type.TString;
    once: Type.TOptional<Type.TBoolean>;
  }>>;
  sessionTarget: Type.TUnion<[Type.TLiteral<"main">, Type.TLiteral<"isolated">, Type.TLiteral<"current">, Type.TString]>;
  wakeMode: Type.TUnion<[Type.TLiteral<"next-heartbeat">, Type.TLiteral<"now">]>;
  payload: Type.TUnion<[Type.TObject<{
    kind: Type.TLiteral<"systemEvent">;
    text: Type.TString;
    toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"agentTurn">;
    message: Type.TSchema;
    model: Type.TOptional<Type.TSchema>;
    fallbacks: Type.TOptional<Type.TSchema>;
    thinking: Type.TOptional<Type.TSchema>;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    allowUnsafeExternalContent: Type.TOptional<Type.TBoolean>;
    lightContext: Type.TOptional<Type.TBoolean>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"command">;
    argv: Type.TSchema;
    cwd: Type.TOptional<Type.TString>;
    env: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
    input: Type.TOptional<Type.TString>;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    noOutputTimeoutSeconds: Type.TOptional<Type.TNumber>;
    outputMaxBytes: Type.TOptional<Type.TInteger>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"script">;
    script: Type.TSchema;
    timeoutSeconds: Type.TOptional<Type.TNumber>;
    toolBudget: Type.TOptional<Type.TInteger>;
    toolsAllow: Type.TOptional<Type.TSchema>;
    toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    kind: Type.TLiteral<"heartbeat">;
  }>]>;
  delivery: Type.TOptional<Type.TUnion<[Type.TObject<{
    to: Type.TOptional<Type.TString>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"none">;
  }>, Type.TObject<{
    completionDestination: Type.TOptional<Type.TObject<{
      mode: Type.TLiteral<"webhook">;
      to: Type.TString;
    }>>;
    to: Type.TOptional<Type.TString>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"announce">;
  }>, Type.TObject<{
    to: Type.TString;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    accountId: Type.TOptional<Type.TString>;
    bestEffort: Type.TOptional<Type.TBoolean>;
    failureDestination: Type.TOptional<Type.TObject<{
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    }>>;
    mode: Type.TLiteral<"webhook">;
  }>]>>;
  failureAlert: Type.TOptional<Type.TUnion<[Type.TLiteral<false>, Type.TObject<{
    after: Type.TOptional<Type.TInteger>;
    channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
    to: Type.TOptional<Type.TString>;
    cooldownMs: Type.TOptional<Type.TInteger>;
    includeSkipped: Type.TOptional<Type.TBoolean>;
    mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
    accountId: Type.TOptional<Type.TString>;
  }>]>>;
  state: Type.TObject<{
    nextRunAtMs: Type.TOptional<Type.TInteger>;
    scheduleActivatedAtMs: Type.TOptional<Type.TInteger>;
    runningAtMs: Type.TOptional<Type.TInteger>;
    lastRunAtMs: Type.TOptional<Type.TInteger>;
    lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
    lastStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
    lastError: Type.TOptional<Type.TString>;
    lastDiagnostics: Type.TOptional<Type.TObject<{
      summary: Type.TOptional<Type.TString>;
      entries: Type.TArray<Type.TObject<{
        ts: Type.TInteger;
        source: Type.TUnion<[Type.TLiteral<"cron-preflight">, Type.TLiteral<"cron-setup">, Type.TLiteral<"model-preflight">, Type.TLiteral<"agent-run">, Type.TLiteral<"tool">, Type.TLiteral<"exec">, Type.TLiteral<"delivery">]>;
        severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"error">]>;
        message: Type.TString;
        toolName: Type.TOptional<Type.TString>;
        exitCode: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
        truncated: Type.TOptional<Type.TBoolean>;
      }>>;
    }>>;
    lastDiagnosticSummary: Type.TOptional<Type.TString>;
    lastErrorReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
    lastDurationMs: Type.TOptional<Type.TInteger>;
    consecutiveErrors: Type.TOptional<Type.TInteger>;
    autoDisabled: Type.TOptional<Type.TObject<{
      reason: Type.TUnion<[Type.TLiteral<"consecutive-failures">, Type.TLiteral<"schedule-errors">]>;
      atMs: Type.TInteger;
      consecutiveErrors: Type.TInteger;
    }>>;
    consecutiveSkipped: Type.TOptional<Type.TInteger>;
    lastDelivered: Type.TOptional<Type.TBoolean>;
    lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastDeliveryError: Type.TOptional<Type.TString>;
    lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
    lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
    lastFailureAlertAtMs: Type.TOptional<Type.TInteger>;
    lastTriggerEvalAtMs: Type.TOptional<Type.TInteger>;
    triggerEvalCount: Type.TOptional<Type.TInteger>;
    lastTriggerFireAtMs: Type.TOptional<Type.TInteger>;
    triggerState: Type.TOptional<Type.TUnknown>;
    streamStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"starting">, Type.TLiteral<"running">, Type.TLiteral<"restarting">, Type.TLiteral<"stopped">, Type.TLiteral<"disabled">, Type.TLiteral<"error">]>>;
    streamError: Type.TOptional<Type.TString>;
    streamConsecutiveFailures: Type.TOptional<Type.TInteger>;
    streamRestartExhausted: Type.TOptional<Type.TBoolean>;
    streamSourceIdentity: Type.TOptional<Type.TString>;
    streamDroppedBatches: Type.TOptional<Type.TInteger>;
    streamCoalescedBatches: Type.TOptional<Type.TInteger>;
    streamLastStartedAtMs: Type.TOptional<Type.TInteger>;
    streamLastExitAtMs: Type.TOptional<Type.TInteger>;
  }>;
  nextRunAtMs: Type.TOptional<Type.TInteger>;
  lastRunAtMs: Type.TOptional<Type.TInteger>;
  lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
  lastRunError: Type.TOptional<Type.TString>;
  lastDelivered: Type.TOptional<Type.TBoolean>;
  lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  lastDeliveryError: Type.TOptional<Type.TString>;
  lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
  lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  created: Type.TBoolean;
  updated: Type.TOptional<Type.TBoolean>;
  job: Type.TObject<{
    id: Type.TString;
    declarationKey: Type.TOptional<Type.TString>;
    displayName: Type.TOptional<Type.TString>;
    owner: Type.TOptional<Type.TObject<{
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
      accountId: Type.TOptional<Type.TString>;
    }>>;
    scheduledToolPolicy: Type.TOptional<Type.TUnion<[Type.TObject<{
      version: Type.TLiteral<1>;
      mode: Type.TLiteral<"trusted">;
    }>, Type.TObject<{
      version: Type.TLiteral<1>;
      mode: Type.TLiteral<"account">;
      ownerSessionKey: Type.TString;
      ownerAccountId: Type.TString;
    }>]>>;
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    name: Type.TString;
    description: Type.TOptional<Type.TString>;
    enabled: Type.TBoolean;
    deleteAfterRun: Type.TOptional<Type.TBoolean>;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger; /** Opaque Gateway-computed token for the job definition, excluding scheduler state. */
    configRevision: Type.TOptional<Type.TString>;
    schedule: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"at">;
      at: Type.TString;
    }>, Type.TObject<{
      kind: Type.TLiteral<"every">;
      everyMs: Type.TInteger;
      anchorMs: Type.TOptional<Type.TInteger>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"cron">;
      expr: Type.TString;
      tz: Type.TOptional<Type.TString>;
      staggerMs: Type.TOptional<Type.TInteger>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"on-exit">;
      command: Type.TString;
      cwd: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"stream">;
      command: Type.TArray<Type.TString>;
      cwd: Type.TOptional<Type.TString>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"line">, Type.TLiteral<"match">]>>;
      match: Type.TOptional<Type.TString>;
      batchMs: Type.TOptional<Type.TInteger>;
      maxBatchBytes: Type.TOptional<Type.TInteger>;
    }>]>;
    pacing: Type.TOptional<Type.TObject<{
      min: Type.TOptional<Type.TString>;
      max: Type.TOptional<Type.TString>;
    }>>;
    trigger: Type.TOptional<Type.TObject<{
      script: Type.TString;
      once: Type.TOptional<Type.TBoolean>;
    }>>;
    sessionTarget: Type.TUnion<[Type.TLiteral<"main">, Type.TLiteral<"isolated">, Type.TLiteral<"current">, Type.TString]>;
    wakeMode: Type.TUnion<[Type.TLiteral<"next-heartbeat">, Type.TLiteral<"now">]>;
    payload: Type.TUnion<[Type.TObject<{
      kind: Type.TLiteral<"systemEvent">;
      text: Type.TString;
      toolsAllow: Type.TOptional<Type.TArray<Type.TString>>;
      toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"agentTurn">;
      message: Type.TSchema;
      model: Type.TOptional<Type.TSchema>;
      fallbacks: Type.TOptional<Type.TSchema>;
      thinking: Type.TOptional<Type.TSchema>;
      timeoutSeconds: Type.TOptional<Type.TNumber>;
      allowUnsafeExternalContent: Type.TOptional<Type.TBoolean>;
      lightContext: Type.TOptional<Type.TBoolean>;
      toolsAllow: Type.TOptional<Type.TSchema>;
      toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"command">;
      argv: Type.TSchema;
      cwd: Type.TOptional<Type.TString>;
      env: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
      input: Type.TOptional<Type.TString>;
      timeoutSeconds: Type.TOptional<Type.TNumber>;
      noOutputTimeoutSeconds: Type.TOptional<Type.TNumber>;
      outputMaxBytes: Type.TOptional<Type.TInteger>;
      toolsAllow: Type.TOptional<Type.TSchema>;
      toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"script">;
      script: Type.TSchema;
      timeoutSeconds: Type.TOptional<Type.TNumber>;
      toolBudget: Type.TOptional<Type.TInteger>;
      toolsAllow: Type.TOptional<Type.TSchema>;
      toolsAllowIsDefault: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      kind: Type.TLiteral<"heartbeat">;
    }>]>;
    delivery: Type.TOptional<Type.TUnion<[Type.TObject<{
      to: Type.TOptional<Type.TString>;
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      accountId: Type.TOptional<Type.TString>;
      bestEffort: Type.TOptional<Type.TBoolean>;
      failureDestination: Type.TOptional<Type.TObject<{
        channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
        to: Type.TOptional<Type.TString>;
        accountId: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
      }>>;
      mode: Type.TLiteral<"none">;
    }>, Type.TObject<{
      completionDestination: Type.TOptional<Type.TObject<{
        mode: Type.TLiteral<"webhook">;
        to: Type.TString;
      }>>;
      to: Type.TOptional<Type.TString>;
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      accountId: Type.TOptional<Type.TString>;
      bestEffort: Type.TOptional<Type.TBoolean>;
      failureDestination: Type.TOptional<Type.TObject<{
        channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
        to: Type.TOptional<Type.TString>;
        accountId: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
      }>>;
      mode: Type.TLiteral<"announce">;
    }>, Type.TObject<{
      to: Type.TString;
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      threadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      accountId: Type.TOptional<Type.TString>;
      bestEffort: Type.TOptional<Type.TBoolean>;
      failureDestination: Type.TOptional<Type.TObject<{
        channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
        to: Type.TOptional<Type.TString>;
        accountId: Type.TOptional<Type.TString>;
        mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
      }>>;
      mode: Type.TLiteral<"webhook">;
    }>]>>;
    failureAlert: Type.TOptional<Type.TUnion<[Type.TLiteral<false>, Type.TObject<{
      after: Type.TOptional<Type.TInteger>;
      channel: Type.TOptional<Type.TUnion<[Type.TLiteral<"last">, Type.TString]>>;
      to: Type.TOptional<Type.TString>;
      cooldownMs: Type.TOptional<Type.TInteger>;
      includeSkipped: Type.TOptional<Type.TBoolean>;
      mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"announce">, Type.TLiteral<"webhook">]>>;
      accountId: Type.TOptional<Type.TString>;
    }>]>>;
    state: Type.TObject<{
      nextRunAtMs: Type.TOptional<Type.TInteger>;
      scheduleActivatedAtMs: Type.TOptional<Type.TInteger>;
      runningAtMs: Type.TOptional<Type.TInteger>;
      lastRunAtMs: Type.TOptional<Type.TInteger>;
      lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
      lastStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
      lastError: Type.TOptional<Type.TString>;
      lastDiagnostics: Type.TOptional<Type.TObject<{
        summary: Type.TOptional<Type.TString>;
        entries: Type.TArray<Type.TObject<{
          ts: Type.TInteger;
          source: Type.TUnion<[Type.TLiteral<"cron-preflight">, Type.TLiteral<"cron-setup">, Type.TLiteral<"model-preflight">, Type.TLiteral<"agent-run">, Type.TLiteral<"tool">, Type.TLiteral<"exec">, Type.TLiteral<"delivery">]>;
          severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"error">]>;
          message: Type.TString;
          toolName: Type.TOptional<Type.TString>;
          exitCode: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
          truncated: Type.TOptional<Type.TBoolean>;
        }>>;
      }>>;
      lastDiagnosticSummary: Type.TOptional<Type.TString>;
      lastErrorReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
      lastDurationMs: Type.TOptional<Type.TInteger>;
      consecutiveErrors: Type.TOptional<Type.TInteger>;
      autoDisabled: Type.TOptional<Type.TObject<{
        reason: Type.TUnion<[Type.TLiteral<"consecutive-failures">, Type.TLiteral<"schedule-errors">]>;
        atMs: Type.TInteger;
        consecutiveErrors: Type.TInteger;
      }>>;
      consecutiveSkipped: Type.TOptional<Type.TInteger>;
      lastDelivered: Type.TOptional<Type.TBoolean>;
      lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
      lastDeliveryError: Type.TOptional<Type.TString>;
      lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
      lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
      lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
      lastFailureAlertAtMs: Type.TOptional<Type.TInteger>;
      lastTriggerEvalAtMs: Type.TOptional<Type.TInteger>;
      triggerEvalCount: Type.TOptional<Type.TInteger>;
      lastTriggerFireAtMs: Type.TOptional<Type.TInteger>;
      triggerState: Type.TOptional<Type.TUnknown>;
      streamStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"starting">, Type.TLiteral<"running">, Type.TLiteral<"restarting">, Type.TLiteral<"stopped">, Type.TLiteral<"disabled">, Type.TLiteral<"error">]>>;
      streamError: Type.TOptional<Type.TString>;
      streamConsecutiveFailures: Type.TOptional<Type.TInteger>;
      streamRestartExhausted: Type.TOptional<Type.TBoolean>;
      streamSourceIdentity: Type.TOptional<Type.TString>;
      streamDroppedBatches: Type.TOptional<Type.TInteger>;
      streamCoalescedBatches: Type.TOptional<Type.TInteger>;
      streamLastStartedAtMs: Type.TOptional<Type.TInteger>;
      streamLastExitAtMs: Type.TOptional<Type.TInteger>;
    }>;
    nextRunAtMs: Type.TOptional<Type.TInteger>;
    lastRunAtMs: Type.TOptional<Type.TInteger>;
    lastRunStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
    lastRunError: Type.TOptional<Type.TString>;
    lastDelivered: Type.TOptional<Type.TBoolean>;
    lastDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastDeliveryError: Type.TOptional<Type.TString>;
    lastFailureNotificationDelivered: Type.TOptional<Type.TBoolean>;
    lastFailureNotificationDeliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
    lastFailureNotificationDeliveryError: Type.TOptional<Type.TString>;
  }>;
}>]>;
/** Updates a cron job by id or legacy jobId alias. */
declare const CronUpdateParamsSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
}>, Type.TObject<{
  jobId: Type.TString;
}>]>;
/** Removes a cron job by id or legacy jobId alias. */
declare const CronRemoveParamsSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
}>, Type.TObject<{
  jobId: Type.TString;
}>]>;
/** Runs a cron job immediately or only if due. */
declare const CronRunParamsSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
}>, Type.TObject<{
  jobId: Type.TString;
}>]>;
/** Query params for cron run history. */
declare const CronRunsParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  scope: Type.TOptional<Type.TUnion<[Type.TLiteral<"job">, Type.TLiteral<"all">]>>;
  id: Type.TOptional<Type.TString>;
  jobId: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  limit: Type.TOptional<Type.TInteger>;
  offset: Type.TOptional<Type.TInteger>;
  statuses: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>>;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"all">, Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
  deliveryStatuses: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>>;
  deliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  query: Type.TOptional<Type.TString>;
  sortDir: Type.TOptional<Type.TUnion<[Type.TLiteral<"asc">, Type.TLiteral<"desc">]>>;
}>;
/** One persisted cron run history entry. */
declare const CronRunLogEntrySchema: Type.TObject<{
  ts: Type.TInteger;
  jobId: Type.TString;
  action: Type.TLiteral<"finished">;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"error">, Type.TLiteral<"skipped">]>>;
  error: Type.TOptional<Type.TString>;
  errorReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"tls_certificate">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
  summary: Type.TOptional<Type.TString>;
  diagnostics: Type.TOptional<Type.TObject<{
    summary: Type.TOptional<Type.TString>;
    entries: Type.TArray<Type.TObject<{
      ts: Type.TInteger;
      source: Type.TUnion<[Type.TLiteral<"cron-preflight">, Type.TLiteral<"cron-setup">, Type.TLiteral<"model-preflight">, Type.TLiteral<"agent-run">, Type.TLiteral<"tool">, Type.TLiteral<"exec">, Type.TLiteral<"delivery">]>;
      severity: Type.TUnion<[Type.TLiteral<"info">, Type.TLiteral<"warn">, Type.TLiteral<"error">]>;
      message: Type.TString;
      toolName: Type.TOptional<Type.TString>;
      exitCode: Type.TOptional<Type.TUnion<[Type.TNumber, Type.TNull]>>;
      truncated: Type.TOptional<Type.TBoolean>;
    }>>;
  }>>;
  delivered: Type.TOptional<Type.TBoolean>;
  deliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>>;
  deliveryError: Type.TOptional<Type.TString>;
  failureNotificationDelivery: Type.TOptional<Type.TObject<{
    delivered: Type.TOptional<Type.TBoolean>;
    status: Type.TUnion<[Type.TLiteral<"delivered">, Type.TLiteral<"not-delivered">, Type.TLiteral<"unknown">, Type.TLiteral<"not-requested">]>;
    error: Type.TOptional<Type.TString>;
  }>>;
  sessionId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  runAtMs: Type.TOptional<Type.TInteger>;
  durationMs: Type.TOptional<Type.TInteger>;
  nextRunAtMs: Type.TOptional<Type.TInteger>;
  triggerFired: Type.TOptional<Type.TBoolean>;
  model: Type.TOptional<Type.TString>;
  provider: Type.TOptional<Type.TString>;
  usage: Type.TOptional<Type.TObject<{
    input_tokens: Type.TOptional<Type.TNumber>;
    output_tokens: Type.TOptional<Type.TNumber>;
    total_tokens: Type.TOptional<Type.TNumber>;
    cache_read_tokens: Type.TOptional<Type.TNumber>;
    cache_write_tokens: Type.TOptional<Type.TNumber>;
  }>>;
  jobName: Type.TOptional<Type.TString>;
}>;
//#endregion
//#region packages/gateway-protocol/src/schema/cron.types.d.ts
type CronJob = Static<typeof CronJobSchema>;
type CronListParams = Static<typeof CronListParamsSchema>;
type CronStatusParams = Static<typeof CronStatusParamsSchema>;
type CronGetParams = Static<typeof CronGetParamsSchema>;
type CronAddParams = Static<typeof CronAddParamsSchema>;
type CronAddResult = Static<typeof CronAddResultSchema>;
type CronDeclarativeAddResult = Static<typeof CronDeclarativeAddResultSchema>;
type CronUpdateParams = Static<typeof CronUpdateParamsSchema>;
type CronRemoveParams = Static<typeof CronRemoveParamsSchema>;
type CronRunParams = Static<typeof CronRunParamsSchema>;
type CronRunsParams = Static<typeof CronRunsParamsSchema>;
type CronScratchGetParams = Static<typeof CronScratchGetParamsSchema>;
type CronScratchGetResult = Static<typeof CronScratchGetResultSchema>;
type CronScratchSetParams = Static<typeof CronScratchSetParamsSchema>;
type CronScratchSetResult = Static<typeof CronScratchSetResultSchema>;
type CronRunLogEntry = Static<typeof CronRunLogEntrySchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/environments.d.ts
/**
 * Environment inventory protocol schemas.
 *
 * Environments are runtime targets such as local hosts, VMs, or remote workers;
 * this schema layer only describes their gateway-visible status summary.
 */
/** Runtime availability state for an environment target. */
declare const EnvironmentStatusSchema: Type.TString;
/** Durable lifecycle states for plugin-provisioned worker environments. */
declare const WorkerEnvironmentStateSchema: Type.TUnion<[Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"bootstrapping">, Type.TLiteral<"ready">, Type.TLiteral<"attached">, Type.TLiteral<"idle">, Type.TLiteral<"draining">, Type.TLiteral<"destroying">, Type.TLiteral<"destroyed">, Type.TLiteral<"failed">, Type.TLiteral<"orphaned">]>;
/** Process-local SSH tunnel connectivity for a worker environment. */
declare const WorkerTunnelStatusSchema: Type.TUnion<[Type.TLiteral<"stopped">, Type.TLiteral<"connecting">, Type.TLiteral<"connected">, Type.TLiteral<"reconnecting">]>;
/** Worker-only lifecycle metadata layered onto the existing environment projection. */
declare const WorkerEnvironmentMetadataSchema: Type.TObject<{
  providerId: Type.TString;
  leaseId: Type.TOptional<Type.TString>;
  state: Type.TUnion<[Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"bootstrapping">, Type.TLiteral<"ready">, Type.TLiteral<"attached">, Type.TLiteral<"idle">, Type.TLiteral<"draining">, Type.TLiteral<"destroying">, Type.TLiteral<"destroyed">, Type.TLiteral<"failed">, Type.TLiteral<"orphaned">]>;
  ageMs: Type.TInteger;
  idleMs: Type.TOptional<Type.TInteger>;
  attachedSessionIds: Type.TArray<Type.TString>;
  tunnelStatus: Type.TUnion<[Type.TLiteral<"stopped">, Type.TLiteral<"connecting">, Type.TLiteral<"connected">, Type.TLiteral<"reconnecting">]>;
}>;
/** Public environment summary shown in listings and status responses. */
declare const EnvironmentSummarySchema: Type.TObject<{
  id: Type.TString;
  type: Type.TString;
  label: Type.TOptional<Type.TString>;
  status: Type.TString;
  capabilities: Type.TOptional<Type.TArray<Type.TString>>;
  worker: Type.TOptional<Type.TObject<{
    providerId: Type.TString;
    leaseId: Type.TOptional<Type.TString>;
    state: Type.TUnion<[Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"bootstrapping">, Type.TLiteral<"ready">, Type.TLiteral<"attached">, Type.TLiteral<"idle">, Type.TLiteral<"draining">, Type.TLiteral<"destroying">, Type.TLiteral<"destroyed">, Type.TLiteral<"failed">, Type.TLiteral<"orphaned">]>;
    ageMs: Type.TInteger;
    idleMs: Type.TOptional<Type.TInteger>;
    attachedSessionIds: Type.TArray<Type.TString>;
    tunnelStatus: Type.TUnion<[Type.TLiteral<"stopped">, Type.TLiteral<"connecting">, Type.TLiteral<"connected">, Type.TLiteral<"reconnecting">]>;
  }>>;
}>;
/** Empty request payload for listing known environments. */
declare const EnvironmentsListParamsSchema: Type.TObject<{}>;
/** List response containing all gateway-visible environment summaries. */
declare const EnvironmentsListResultSchema: Type.TObject<{
  environments: Type.TArray<Type.TObject<{
    id: Type.TString;
    type: Type.TString;
    label: Type.TOptional<Type.TString>;
    status: Type.TString;
    capabilities: Type.TOptional<Type.TArray<Type.TString>>;
    worker: Type.TOptional<Type.TObject<{
      providerId: Type.TString;
      leaseId: Type.TOptional<Type.TString>;
      state: Type.TUnion<[Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"bootstrapping">, Type.TLiteral<"ready">, Type.TLiteral<"attached">, Type.TLiteral<"idle">, Type.TLiteral<"draining">, Type.TLiteral<"destroying">, Type.TLiteral<"destroyed">, Type.TLiteral<"failed">, Type.TLiteral<"orphaned">]>;
      ageMs: Type.TInteger;
      idleMs: Type.TOptional<Type.TInteger>;
      attachedSessionIds: Type.TArray<Type.TString>;
      tunnelStatus: Type.TUnion<[Type.TLiteral<"stopped">, Type.TLiteral<"connecting">, Type.TLiteral<"connected">, Type.TLiteral<"reconnecting">]>;
    }>>;
  }>>;
  profiles: Type.TOptional<Type.TArray<Type.TObject<{
    id: Type.TString;
    providerId: Type.TString;
  }>>>;
}>;
/** Status lookup request for one environment id. */
declare const EnvironmentsStatusParamsSchema: Type.TObject<{
  environmentId: Type.TString;
}>;
/** Status lookup result for one environment id. */
declare const EnvironmentsStatusResultSchema: Type.TObject<{
  id: Type.TString;
  type: Type.TString;
  label: Type.TOptional<Type.TString>;
  status: Type.TString;
  capabilities: Type.TOptional<Type.TArray<Type.TString>>;
  worker: Type.TOptional<Type.TObject<{
    providerId: Type.TString;
    leaseId: Type.TOptional<Type.TString>;
    state: Type.TUnion<[Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"bootstrapping">, Type.TLiteral<"ready">, Type.TLiteral<"attached">, Type.TLiteral<"idle">, Type.TLiteral<"draining">, Type.TLiteral<"destroying">, Type.TLiteral<"destroyed">, Type.TLiteral<"failed">, Type.TLiteral<"orphaned">]>;
    ageMs: Type.TInteger;
    idleMs: Type.TOptional<Type.TInteger>;
    attachedSessionIds: Type.TArray<Type.TString>;
    tunnelStatus: Type.TUnion<[Type.TLiteral<"stopped">, Type.TLiteral<"connecting">, Type.TLiteral<"connected">, Type.TLiteral<"reconnecting">]>;
  }>>;
}>;
/** Creates a worker environment from one configured provider profile. */
declare const EnvironmentsCreateParamsSchema: Type.TObject<{
  profileId: Type.TString;
  idempotencyKey: Type.TString;
}>;
/** Create result uses the same public summary shape as list and status. */
declare const EnvironmentsCreateResultSchema: Type.TObject<{
  id: Type.TString;
  type: Type.TString;
  label: Type.TOptional<Type.TString>;
  status: Type.TString;
  capabilities: Type.TOptional<Type.TArray<Type.TString>>;
  worker: Type.TOptional<Type.TObject<{
    providerId: Type.TString;
    leaseId: Type.TOptional<Type.TString>;
    state: Type.TUnion<[Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"bootstrapping">, Type.TLiteral<"ready">, Type.TLiteral<"attached">, Type.TLiteral<"idle">, Type.TLiteral<"draining">, Type.TLiteral<"destroying">, Type.TLiteral<"destroyed">, Type.TLiteral<"failed">, Type.TLiteral<"orphaned">]>;
    ageMs: Type.TInteger;
    idleMs: Type.TOptional<Type.TInteger>;
    attachedSessionIds: Type.TArray<Type.TString>;
    tunnelStatus: Type.TUnion<[Type.TLiteral<"stopped">, Type.TLiteral<"connecting">, Type.TLiteral<"connected">, Type.TLiteral<"reconnecting">]>;
  }>>;
}>;
/** Destroys one durable worker environment by its gateway-owned id. */
declare const EnvironmentsDestroyParamsSchema: Type.TObject<{
  environmentId: Type.TString;
  force: Type.TOptional<Type.TBoolean>;
}>;
/** Destroy result exposes the terminal worker lifecycle state. */
declare const EnvironmentsDestroyResultSchema: Type.TObject<{
  id: Type.TString;
  type: Type.TString;
  label: Type.TOptional<Type.TString>;
  status: Type.TString;
  capabilities: Type.TOptional<Type.TArray<Type.TString>>;
  worker: Type.TOptional<Type.TObject<{
    providerId: Type.TString;
    leaseId: Type.TOptional<Type.TString>;
    state: Type.TUnion<[Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"bootstrapping">, Type.TLiteral<"ready">, Type.TLiteral<"attached">, Type.TLiteral<"idle">, Type.TLiteral<"draining">, Type.TLiteral<"destroying">, Type.TLiteral<"destroyed">, Type.TLiteral<"failed">, Type.TLiteral<"orphaned">]>;
    ageMs: Type.TInteger;
    idleMs: Type.TOptional<Type.TInteger>;
    attachedSessionIds: Type.TArray<Type.TString>;
    tunnelStatus: Type.TUnion<[Type.TLiteral<"stopped">, Type.TLiteral<"connecting">, Type.TLiteral<"connected">, Type.TLiteral<"reconnecting">]>;
  }>>;
}>;
type EnvironmentStatus = Static<typeof EnvironmentStatusSchema>;
type WorkerEnvironmentState = Static<typeof WorkerEnvironmentStateSchema>;
type WorkerTunnelStatus = Static<typeof WorkerTunnelStatusSchema>;
type WorkerEnvironmentMetadata = Static<typeof WorkerEnvironmentMetadataSchema>;
type EnvironmentSummary = Static<typeof EnvironmentSummarySchema>;
type EnvironmentsCreateParams = Static<typeof EnvironmentsCreateParamsSchema>;
type EnvironmentsCreateResult = Static<typeof EnvironmentsCreateResultSchema>;
type EnvironmentsDestroyParams = Static<typeof EnvironmentsDestroyParamsSchema>;
type EnvironmentsDestroyResult = Static<typeof EnvironmentsDestroyResultSchema>;
type EnvironmentsListParams = Static<typeof EnvironmentsListParamsSchema>;
type EnvironmentsListResult = Static<typeof EnvironmentsListResultSchema>;
type EnvironmentsStatusParams = Static<typeof EnvironmentsStatusParamsSchema>;
type EnvironmentsStatusResult = Static<typeof EnvironmentsStatusResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/exec-approvals.d.ts
/** File-backed read snapshot with path/hash metadata for optimistic writes. */
declare const ExecApprovalsSnapshotSchema: Type.TObject<{
  path: Type.TString;
  exists: Type.TBoolean;
  hash: Type.TString;
  file: Type.TObject<{
    version: Type.TLiteral<1>;
    socket: Type.TOptional<Type.TObject<{
      path: Type.TOptional<Type.TString>;
      token: Type.TOptional<Type.TString>;
    }>>;
    defaults: Type.TOptional<Type.TObject<{
      security: Type.TOptional<Type.TString>;
      ask: Type.TOptional<Type.TString>;
      askFallback: Type.TOptional<Type.TString>;
      autoAllowSkills: Type.TOptional<Type.TBoolean>;
    }>>;
    agents: Type.TOptional<Type.TRecord<"^.*$", Type.TObject<{
      allowlist: Type.TOptional<Type.TArray<Type.TObject<{
        id: Type.TOptional<Type.TString>;
        pattern: Type.TString;
        source: Type.TOptional<Type.TLiteral<"allow-always">>;
        commandText: Type.TOptional<Type.TString>;
        argPattern: Type.TOptional<Type.TString>;
        lastUsedAt: Type.TOptional<Type.TNumber>;
        lastUsedCommand: Type.TOptional<Type.TString>;
        lastResolvedPath: Type.TOptional<Type.TString>;
      }>>>;
      security: Type.TOptional<Type.TString>;
      ask: Type.TOptional<Type.TString>;
      askFallback: Type.TOptional<Type.TString>;
      autoAllowSkills: Type.TOptional<Type.TBoolean>;
    }>>>;
  }>;
}>;
/** Node read snapshot supporting file-backed and host-native approval owners. */
declare const ExecApprovalsNodeSnapshotSchema: Type.TObject<{
  path: Type.TOptional<Type.TString>;
  exists: Type.TOptional<Type.TBoolean>;
  hash: Type.TOptional<Type.TString>;
  file: Type.TOptional<Type.TObject<{
    version: Type.TLiteral<1>;
    socket: Type.TOptional<Type.TObject<{
      path: Type.TOptional<Type.TString>;
      token: Type.TOptional<Type.TString>;
    }>>;
    defaults: Type.TOptional<Type.TObject<{
      security: Type.TOptional<Type.TString>;
      ask: Type.TOptional<Type.TString>;
      askFallback: Type.TOptional<Type.TString>;
      autoAllowSkills: Type.TOptional<Type.TBoolean>;
    }>>;
    agents: Type.TOptional<Type.TRecord<"^.*$", Type.TObject<{
      allowlist: Type.TOptional<Type.TArray<Type.TObject<{
        id: Type.TOptional<Type.TString>;
        pattern: Type.TString;
        source: Type.TOptional<Type.TLiteral<"allow-always">>;
        commandText: Type.TOptional<Type.TString>;
        argPattern: Type.TOptional<Type.TString>;
        lastUsedAt: Type.TOptional<Type.TNumber>;
        lastUsedCommand: Type.TOptional<Type.TString>;
        lastResolvedPath: Type.TOptional<Type.TString>;
      }>>>;
      security: Type.TOptional<Type.TString>;
      ask: Type.TOptional<Type.TString>;
      askFallback: Type.TOptional<Type.TString>;
      autoAllowSkills: Type.TOptional<Type.TBoolean>;
    }>>>;
  }>>;
  resolvedDefaults: Type.TOptional<Type.TObject<{
    security: Type.TUnion<[Type.TLiteral<"deny">, Type.TLiteral<"allowlist">, Type.TLiteral<"full">]>;
    ask: Type.TUnion<[Type.TLiteral<"off">, Type.TLiteral<"on-miss">, Type.TLiteral<"always">]>;
    askFallback: Type.TUnion<[Type.TLiteral<"deny">, Type.TLiteral<"allowlist">, Type.TLiteral<"full">]>;
    autoAllowSkills: Type.TBoolean;
  }>>;
  enabled: Type.TOptional<Type.TBoolean>;
  baseHash: Type.TOptional<Type.TString>;
  defaultAction: Type.TOptional<Type.TUnion<[Type.TLiteral<"allow">, Type.TLiteral<"deny">, Type.TLiteral<"prompt">]>>;
  rules: Type.TOptional<Type.TArray<Type.TObject<{
    pattern: Type.TString;
    action: Type.TUnion<[Type.TLiteral<"allow">, Type.TLiteral<"deny">, Type.TLiteral<"prompt">]>;
    shells: Type.TOptional<Type.TArray<Type.TString>>;
    description: Type.TOptional<Type.TString>;
    enabled: Type.TOptional<Type.TBoolean>;
  }>>>;
  constraints: Type.TOptional<Type.TObject<{
    baseHashRequired: Type.TOptional<Type.TBoolean>;
    defaultAllowAllowed: Type.TOptional<Type.TBoolean>;
    broadAllowRulesAllowed: Type.TOptional<Type.TBoolean>;
    dangerousAllowRulesAllowed: Type.TOptional<Type.TBoolean>;
  }>>;
  message: Type.TOptional<Type.TString>;
}>;
/** Empty request payload for reading local exec approval policy. */
declare const ExecApprovalsGetParamsSchema: Type.TObject<{}>;
/** Local exec approval policy write request with optional base hash guard. */
declare const ExecApprovalsSetParamsSchema: Type.TObject<{
  file: Type.TObject<{
    version: Type.TLiteral<1>;
    socket: Type.TOptional<Type.TObject<{
      path: Type.TOptional<Type.TString>;
      token: Type.TOptional<Type.TString>;
    }>>;
    defaults: Type.TOptional<Type.TObject<{
      security: Type.TOptional<Type.TString>;
      ask: Type.TOptional<Type.TString>;
      askFallback: Type.TOptional<Type.TString>;
      autoAllowSkills: Type.TOptional<Type.TBoolean>;
    }>>;
    agents: Type.TOptional<Type.TRecord<"^.*$", Type.TObject<{
      allowlist: Type.TOptional<Type.TArray<Type.TObject<{
        id: Type.TOptional<Type.TString>;
        pattern: Type.TString;
        source: Type.TOptional<Type.TLiteral<"allow-always">>;
        commandText: Type.TOptional<Type.TString>;
        argPattern: Type.TOptional<Type.TString>;
        lastUsedAt: Type.TOptional<Type.TNumber>;
        lastUsedCommand: Type.TOptional<Type.TString>;
        lastResolvedPath: Type.TOptional<Type.TString>;
      }>>>;
      security: Type.TOptional<Type.TString>;
      ask: Type.TOptional<Type.TString>;
      askFallback: Type.TOptional<Type.TString>;
      autoAllowSkills: Type.TOptional<Type.TBoolean>;
    }>>>;
  }>;
  baseHash: Type.TOptional<Type.TString>;
}>;
/** Node-scoped request payload for reading exec approval policy. */
declare const ExecApprovalsNodeGetParamsSchema: Type.TObject<{
  nodeId: Type.TString;
}>;
/** Node-scoped write for exactly one file-backed or host-native approval owner. */
declare const ExecApprovalsNodeSetParamsSchema: Type.TObject<{
  nodeId: Type.TString;
  file: Type.TOptional<Type.TObject<{
    version: Type.TLiteral<1>;
    socket: Type.TOptional<Type.TObject<{
      path: Type.TOptional<Type.TString>;
      token: Type.TOptional<Type.TString>;
    }>>;
    defaults: Type.TOptional<Type.TObject<{
      security: Type.TOptional<Type.TString>;
      ask: Type.TOptional<Type.TString>;
      askFallback: Type.TOptional<Type.TString>;
      autoAllowSkills: Type.TOptional<Type.TBoolean>;
    }>>;
    agents: Type.TOptional<Type.TRecord<"^.*$", Type.TObject<{
      allowlist: Type.TOptional<Type.TArray<Type.TObject<{
        id: Type.TOptional<Type.TString>;
        pattern: Type.TString;
        source: Type.TOptional<Type.TLiteral<"allow-always">>;
        commandText: Type.TOptional<Type.TString>;
        argPattern: Type.TOptional<Type.TString>;
        lastUsedAt: Type.TOptional<Type.TNumber>;
        lastUsedCommand: Type.TOptional<Type.TString>;
        lastResolvedPath: Type.TOptional<Type.TString>;
      }>>>;
      security: Type.TOptional<Type.TString>;
      ask: Type.TOptional<Type.TString>;
      askFallback: Type.TOptional<Type.TString>;
      autoAllowSkills: Type.TOptional<Type.TBoolean>;
    }>>>;
  }>>;
  native: Type.TOptional<Type.TObject<{
    defaultAction: Type.TOptional<Type.TUnion<[Type.TLiteral<"allow">, Type.TLiteral<"deny">, Type.TLiteral<"prompt">]>>;
    rules: Type.TArray<Type.TObject<{
      pattern: Type.TString;
      action: Type.TUnion<[Type.TLiteral<"allow">, Type.TLiteral<"deny">, Type.TLiteral<"prompt">]>;
      shells: Type.TOptional<Type.TArray<Type.TString>>;
      description: Type.TOptional<Type.TString>;
      enabled: Type.TOptional<Type.TBoolean>;
    }>>;
  }>>;
  baseHash: Type.TOptional<Type.TString>;
}>;
/** Lookup request for one pending exec approval by id. */
declare const ExecApprovalGetParamsSchema: Type.TObject<{
  id: Type.TString;
}>;
/** Pending command execution approval request shown to reviewers. */
declare const ExecApprovalRequestParamsSchema: Type.TObject<{
  id: Type.TOptional<Type.TString>;
  command: Type.TOptional<Type.TString>;
  commandArgv: Type.TOptional<Type.TArray<Type.TString>>;
  systemRunPlan: Type.TOptional<Type.TObject<{
    argv: Type.TArray<Type.TString>;
    cwd: Type.TUnion<[Type.TString, Type.TNull]>;
    commandText: Type.TString;
    commandPreview: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    agentId: Type.TUnion<[Type.TString, Type.TNull]>;
    sessionKey: Type.TUnion<[Type.TString, Type.TNull]>;
    policySnapshot: Type.TOptional<Type.TObject<{
      security: Type.TUnion<[Type.TLiteral<"deny">, Type.TLiteral<"allowlist">, Type.TLiteral<"full">]>;
      ask: Type.TUnion<[Type.TLiteral<"off">, Type.TLiteral<"on-miss">, Type.TLiteral<"always">]>;
      askFallback: Type.TUnion<[Type.TLiteral<"deny">, Type.TLiteral<"allowlist">, Type.TLiteral<"full">]>;
      autoAllowSkills: Type.TBoolean;
      allowlistRules: Type.TArray<Type.TObject<{
        pattern: Type.TString;
        argPattern: Type.TOptional<Type.TString>;
        source: Type.TOptional<Type.TLiteral<"allow-always">>;
      }>>;
    }>>;
    mutableFileOperand: Type.TOptional<Type.TUnion<[Type.TObject<{
      argvIndex: Type.TInteger;
      path: Type.TString;
      sha256: Type.TString;
    }>, Type.TNull]>>;
  }>>;
  env: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
  cwd: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  nodeId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  host: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  security: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  ask: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  warningText: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  unavailableDecisions: Type.TOptional<Type.TArray<Type.TString>>;
  commandSpans: Type.TOptional<Type.TArray<Type.TObject<{
    startIndex: Type.TInteger;
    endIndex: Type.TInteger;
  }>>>;
  agentId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  resolvedPath: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  sessionKey: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  sessionId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  runId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  toolCallId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  turnSourceChannel: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  turnSourceTo: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  turnSourceAccountId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  turnSourceThreadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber, Type.TNull]>>;
  approvalReviewerDeviceIds: Type.TOptional<Type.TArray<Type.TString>>;
  requireDeliveryRoute: Type.TOptional<Type.TBoolean>;
  suppressDelivery: Type.TOptional<Type.TBoolean>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  twoPhase: Type.TOptional<Type.TBoolean>;
}>;
/** Reviewer decision payload for one pending exec approval. */
declare const ExecApprovalResolveParamsSchema: Type.TObject<{
  id: Type.TString;
  decision: Type.TString;
}>;
type ExecApprovalsGetParams = Static<typeof ExecApprovalsGetParamsSchema>;
type ExecApprovalsSetParams = Static<typeof ExecApprovalsSetParamsSchema>;
type ExecApprovalsNodeGetParams = Static<typeof ExecApprovalsNodeGetParamsSchema>;
type ExecApprovalsNodeSnapshot = Static<typeof ExecApprovalsNodeSnapshotSchema>;
type ExecApprovalsNodeSetParams = Static<typeof ExecApprovalsNodeSetParamsSchema>;
type ExecApprovalsSnapshot = Static<typeof ExecApprovalsSnapshotSchema>;
type ExecApprovalGetParams = Static<typeof ExecApprovalGetParamsSchema>;
type ExecApprovalRequestParams = Static<typeof ExecApprovalRequestParamsSchema>;
type ExecApprovalResolveParams = Static<typeof ExecApprovalResolveParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/devices.d.ts
/**
 * Device pairing and token-management protocol schemas.
 *
 * These payloads cross the gateway approval boundary, so request ids and device
 * ids stay explicit and feature handlers own the authorization checks.
 */
/** Lists pending and approved device pairing records. */
declare const DevicePairListParamsSchema: Type.TObject<{}>;
/** Approves a pending pairing request by request id. */
declare const DevicePairApproveParamsSchema: Type.TObject<{
  requestId: Type.TString;
}>;
/** Rejects a pending pairing request by request id. */
declare const DevicePairRejectParamsSchema: Type.TObject<{
  requestId: Type.TString;
}>;
/** Removes an approved or remembered device by device id. */
declare const DevicePairRemoveParamsSchema: Type.TObject<{
  deviceId: Type.TString;
}>;
/** Renames a paired device while preserving its stable device id. */
declare const DevicePairRenameParamsSchema: Type.TObject<{
  deviceId: Type.TString;
  label: Type.TString;
}>;
/** Rotates or issues a device token for a specific role/scope grant. */
declare const DeviceTokenRotateParamsSchema: Type.TObject<{
  deviceId: Type.TString;
  role: Type.TString;
  scopes: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Revokes one role-bound device token grant. */
declare const DeviceTokenRevokeParamsSchema: Type.TObject<{
  deviceId: Type.TString;
  role: Type.TString;
}>;
/** Event emitted when a client opens or refreshes a pairing request. */
declare const DevicePairRequestedEventSchema: Type.TObject<{
  requestId: Type.TString;
  deviceId: Type.TString;
  publicKey: Type.TString;
  displayName: Type.TOptional<Type.TString>;
  platform: Type.TOptional<Type.TString>;
  deviceFamily: Type.TOptional<Type.TString>;
  clientId: Type.TOptional<Type.TString>;
  clientMode: Type.TOptional<Type.TString>;
  browserOrigin: Type.TOptional<Type.TString>;
  role: Type.TOptional<Type.TString>;
  roles: Type.TOptional<Type.TArray<Type.TString>>;
  scopes: Type.TOptional<Type.TArray<Type.TString>>;
  remoteIp: Type.TOptional<Type.TString>;
  silent: Type.TOptional<Type.TBoolean>;
  isRepair: Type.TOptional<Type.TBoolean>;
  ts: Type.TInteger;
}>;
/** Event emitted after a pairing request is approved, rejected, or otherwise resolved. */
declare const DevicePairResolvedEventSchema: Type.TObject<{
  requestId: Type.TString;
  deviceId: Type.TString;
  decision: Type.TString;
  ts: Type.TInteger;
}>;
/**
 * Generates a device-pairing setup code (and optional QR) so a mobile/companion
 * client can scan it and connect to this gateway. The embedded setup code mints
 * a short-lived bootstrap token that defaults to full native-mobile operator
 * access, so this method requires operator.admin
 * (enforced by the core method descriptor's method-scope policy, not the handler)
 * and is not advertised. `bootstrapProfile: "limited"` omits operator.admin;
 * `bootstrapProfile: "node"` narrows the handoff to a node role with no operator
 * scopes for companion devices such as watchOS.
 */
declare const DevicePairSetupCodeParamsSchema: Type.TObject<{
  publicUrl: Type.TOptional<Type.TString>;
  preferRemoteUrl: Type.TOptional<Type.TBoolean>;
  includeQr: Type.TOptional<Type.TBoolean>;
  bootstrapProfile: Type.TOptional<Type.TString>;
}>;
/**
 * Setup code plus non-secret connection metadata. `auth` is a label only
 * ("token" | "password"); the gateway credential itself is never returned.
 * `accessDowngraded` reports the plaintext-LAN safety fallback from full to
 * limited access so the presenting client can explain how to upgrade.
 */
declare const DevicePairSetupCodeResultSchema: Type.TObject<{
  setupCode: Type.TString;
  qrDataUrl: Type.TOptional<Type.TString>;
  gatewayUrl: Type.TString;
  gatewayUrls: Type.TOptional<Type.TArray<Type.TString>>;
  auth: Type.TUnion<[Type.TLiteral<"token">, Type.TLiteral<"password">]>;
  urlSource: Type.TString;
  access: Type.TOptional<Type.TUnion<[Type.TLiteral<"full">, Type.TLiteral<"limited">, Type.TLiteral<"node">]>>;
  accessDowngraded: Type.TOptional<Type.TBoolean>;
}>;
type DevicePairListParams = Static<typeof DevicePairListParamsSchema>;
type DevicePairApproveParams = Static<typeof DevicePairApproveParamsSchema>;
type DevicePairRejectParams = Static<typeof DevicePairRejectParamsSchema>;
type DevicePairRemoveParams = Static<typeof DevicePairRemoveParamsSchema>;
type DevicePairSetupCodeParams = Static<typeof DevicePairSetupCodeParamsSchema>;
type DevicePairSetupCodeResult = Static<typeof DevicePairSetupCodeResultSchema>;
type DevicePairRenameParams = Static<typeof DevicePairRenameParamsSchema>;
type DeviceTokenRotateParams = Static<typeof DeviceTokenRotateParamsSchema>;
type DeviceTokenRevokeParams = Static<typeof DeviceTokenRevokeParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/fs.d.ts
declare const FsListDirParamsSchema: Type.TObject<{
  /** Absolute directory to list; omitted means the selected host's home directory. */path: Type.TOptional<Type.TString>; /** Connected node host to browse; omitted means the Gateway host. */
  nodeId: Type.TOptional<Type.TString>;
}>;
declare const FsDirEntrySchema: Type.TObject<{
  name: Type.TString;
  path: Type.TString; /** Dot-prefixed directories; clients render them dimmed after visible ones. */
  hidden: Type.TOptional<Type.TBoolean>;
}>;
declare const FsListDirResultSchema: Type.TObject<{
  /** Resolved absolute path that was listed. */path: Type.TString; /** Absent at the filesystem root. */
  parent: Type.TOptional<Type.TString>; /** Selected host's home directory, for the picker's "home" shortcut. */
  home: Type.TString;
  entries: Type.TArray<Type.TObject<{
    name: Type.TString;
    path: Type.TString; /** Dot-prefixed directories; clients render them dimmed after visible ones. */
    hidden: Type.TOptional<Type.TBoolean>;
  }>>;
}>;
type FsDirEntry = Static<typeof FsDirEntrySchema>;
type FsListDirParams = Static<typeof FsListDirParamsSchema>;
type FsListDirResult = Static<typeof FsListDirResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/gateway-suspend.d.ts
declare const GatewaySuspendTaskBlockerSchema: Type.TObject<{
  taskId: Type.TString;
  status: Type.TLiteral<"running">;
  runtime: Type.TUnion<[Type.TLiteral<"subagent">, Type.TLiteral<"acp">, Type.TLiteral<"cli">, Type.TLiteral<"cron">]>;
  runId: Type.TOptional<Type.TString>;
  label: Type.TOptional<Type.TString>;
  title: Type.TOptional<Type.TString>;
}>;
declare const GatewaySuspendBlockerSchema: Type.TObject<{
  kind: Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"reply">, Type.TLiteral<"embedded-run">, Type.TLiteral<"background-exec">, Type.TLiteral<"cron-run">, Type.TLiteral<"task">, Type.TLiteral<"root-request">, Type.TLiteral<"session-admission">, Type.TLiteral<"session-mutation">, Type.TLiteral<"chat-run">, Type.TLiteral<"queued-turn">, Type.TLiteral<"terminal-persistence">, Type.TLiteral<"terminal-session">]>;
  count: Type.TInteger;
  message: Type.TString;
  task: Type.TOptional<Type.TObject<{
    taskId: Type.TString;
    status: Type.TLiteral<"running">;
    runtime: Type.TUnion<[Type.TLiteral<"subagent">, Type.TLiteral<"acp">, Type.TLiteral<"cli">, Type.TLiteral<"cron">]>;
    runId: Type.TOptional<Type.TString>;
    label: Type.TOptional<Type.TString>;
    title: Type.TOptional<Type.TString>;
  }>>;
}>;
declare const GatewaySuspendPrepareParamsSchema: Type.TObject<{
  requestId: Type.TString;
}>;
declare const GatewaySuspendPrepareBusyResultSchema: Type.TObject<{
  status: Type.TLiteral<"busy">;
  reason: Type.TUnion<[Type.TLiteral<"active-work">, Type.TLiteral<"gateway-draining">]>;
  retryAfterMs: Type.TInteger;
  activeCount: Type.TInteger;
  blockers: Type.TArray<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"reply">, Type.TLiteral<"embedded-run">, Type.TLiteral<"background-exec">, Type.TLiteral<"cron-run">, Type.TLiteral<"task">, Type.TLiteral<"root-request">, Type.TLiteral<"session-admission">, Type.TLiteral<"session-mutation">, Type.TLiteral<"chat-run">, Type.TLiteral<"queued-turn">, Type.TLiteral<"terminal-persistence">, Type.TLiteral<"terminal-session">]>;
    count: Type.TInteger;
    message: Type.TString;
    task: Type.TOptional<Type.TObject<{
      taskId: Type.TString;
      status: Type.TLiteral<"running">;
      runtime: Type.TUnion<[Type.TLiteral<"subagent">, Type.TLiteral<"acp">, Type.TLiteral<"cli">, Type.TLiteral<"cron">]>;
      runId: Type.TOptional<Type.TString>;
      label: Type.TOptional<Type.TString>;
      title: Type.TOptional<Type.TString>;
    }>>;
  }>>;
}>;
declare const GatewaySuspendPrepareReadyResultSchema: Type.TObject<{
  status: Type.TLiteral<"ready">;
  suspensionId: Type.TString;
  expiresAtMs: Type.TInteger;
  activeCount: Type.TInteger;
  blockers: Type.TArray<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"reply">, Type.TLiteral<"embedded-run">, Type.TLiteral<"background-exec">, Type.TLiteral<"cron-run">, Type.TLiteral<"task">, Type.TLiteral<"root-request">, Type.TLiteral<"session-admission">, Type.TLiteral<"session-mutation">, Type.TLiteral<"chat-run">, Type.TLiteral<"queued-turn">, Type.TLiteral<"terminal-persistence">, Type.TLiteral<"terminal-session">]>;
    count: Type.TInteger;
    message: Type.TString;
    task: Type.TOptional<Type.TObject<{
      taskId: Type.TString;
      status: Type.TLiteral<"running">;
      runtime: Type.TUnion<[Type.TLiteral<"subagent">, Type.TLiteral<"acp">, Type.TLiteral<"cli">, Type.TLiteral<"cron">]>;
      runId: Type.TOptional<Type.TString>;
      label: Type.TOptional<Type.TString>;
      title: Type.TOptional<Type.TString>;
    }>>;
  }>>;
}>;
declare const GatewaySuspendPrepareResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"busy">;
  reason: Type.TUnion<[Type.TLiteral<"active-work">, Type.TLiteral<"gateway-draining">]>;
  retryAfterMs: Type.TInteger;
  activeCount: Type.TInteger;
  blockers: Type.TArray<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"reply">, Type.TLiteral<"embedded-run">, Type.TLiteral<"background-exec">, Type.TLiteral<"cron-run">, Type.TLiteral<"task">, Type.TLiteral<"root-request">, Type.TLiteral<"session-admission">, Type.TLiteral<"session-mutation">, Type.TLiteral<"chat-run">, Type.TLiteral<"queued-turn">, Type.TLiteral<"terminal-persistence">, Type.TLiteral<"terminal-session">]>;
    count: Type.TInteger;
    message: Type.TString;
    task: Type.TOptional<Type.TObject<{
      taskId: Type.TString;
      status: Type.TLiteral<"running">;
      runtime: Type.TUnion<[Type.TLiteral<"subagent">, Type.TLiteral<"acp">, Type.TLiteral<"cli">, Type.TLiteral<"cron">]>;
      runId: Type.TOptional<Type.TString>;
      label: Type.TOptional<Type.TString>;
      title: Type.TOptional<Type.TString>;
    }>>;
  }>>;
}>, Type.TObject<{
  status: Type.TLiteral<"ready">;
  suspensionId: Type.TString;
  expiresAtMs: Type.TInteger;
  activeCount: Type.TInteger;
  blockers: Type.TArray<Type.TObject<{
    kind: Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"reply">, Type.TLiteral<"embedded-run">, Type.TLiteral<"background-exec">, Type.TLiteral<"cron-run">, Type.TLiteral<"task">, Type.TLiteral<"root-request">, Type.TLiteral<"session-admission">, Type.TLiteral<"session-mutation">, Type.TLiteral<"chat-run">, Type.TLiteral<"queued-turn">, Type.TLiteral<"terminal-persistence">, Type.TLiteral<"terminal-session">]>;
    count: Type.TInteger;
    message: Type.TString;
    task: Type.TOptional<Type.TObject<{
      taskId: Type.TString;
      status: Type.TLiteral<"running">;
      runtime: Type.TUnion<[Type.TLiteral<"subagent">, Type.TLiteral<"acp">, Type.TLiteral<"cli">, Type.TLiteral<"cron">]>;
      runId: Type.TOptional<Type.TString>;
      label: Type.TOptional<Type.TString>;
      title: Type.TOptional<Type.TString>;
    }>>;
  }>>;
}>]>;
declare const GatewaySuspendStatusParamsSchema: Type.TObject<{
  suspensionId: Type.TString;
}>;
declare const GatewaySuspendStatusRunningResultSchema: Type.TObject<{
  status: Type.TLiteral<"running">;
}>;
declare const GatewaySuspendStatusReadyResultSchema: Type.TObject<{
  status: Type.TLiteral<"ready">;
  expiresAtMs: Type.TInteger;
}>;
declare const GatewaySuspendStatusResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"running">;
}>, Type.TObject<{
  status: Type.TLiteral<"ready">;
  expiresAtMs: Type.TInteger;
}>]>;
declare const GatewaySuspendResumeParamsSchema: Type.TObject<{
  suspensionId: Type.TString;
}>;
declare const GatewaySuspendResumeResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  status: Type.TLiteral<"running">;
  resumed: Type.TBoolean;
}>;
type GatewaySuspendTaskBlocker = Static<typeof GatewaySuspendTaskBlockerSchema>;
type GatewaySuspendBlocker = Static<typeof GatewaySuspendBlockerSchema>;
type GatewaySuspendPrepareParams = Static<typeof GatewaySuspendPrepareParamsSchema>;
type GatewaySuspendPrepareResult = Static<typeof GatewaySuspendPrepareResultSchema>;
type GatewaySuspendStatusParams = Static<typeof GatewaySuspendStatusParamsSchema>;
type GatewaySuspendStatusResult = Static<typeof GatewaySuspendStatusResultSchema>;
type GatewaySuspendResumeParams = Static<typeof GatewaySuspendResumeParamsSchema>;
type GatewaySuspendResumeResult = Static<typeof GatewaySuspendResumeResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/hooks.d.ts
/** Empty request payload for the live Gateway hook status report. */
declare const HooksStatusParamsSchema: import("typebox").TObject<{}>;
type HooksStatusParams = Static<typeof HooksStatusParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/logs-chat.d.ts
/** Cursor-based request for the gateway log tail endpoint. */
declare const LogsTailParamsSchema: Type.TObject<{
  cursor: Type.TOptional<Type.TInteger>;
  limit: Type.TOptional<Type.TInteger>;
  maxBytes: Type.TOptional<Type.TInteger>;
}>;
/** Gateway log tail payload returned to dashboard clients. */
declare const LogsTailResultSchema: Type.TObject<{
  file: Type.TString;
  cursor: Type.TInteger;
  size: Type.TInteger;
  lines: Type.TArray<Type.TString>;
  truncated: Type.TOptional<Type.TBoolean>;
  reset: Type.TOptional<Type.TBoolean>;
}>;
/** Session-scoped history request used by WebChat and native WebSocket clients. */
declare const ChatHistoryParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  limit: Type.TOptional<Type.TInteger>;
  offset: Type.TOptional<Type.TInteger>;
  messageId: Type.TOptional<Type.TString>;
  sessionId: Type.TOptional<Type.TString>;
  maxChars: Type.TOptional<Type.TInteger>;
}>;
/** Lightweight chat metadata request; optional agent scope keeps selector state explicit. */
declare const ChatMetadataParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
}>;
/** Batched purpose-title request for tool calls rendered in the Control UI. */
declare const ChatToolTitlesParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  items: Type.TArray<Type.TObject<{
    id: Type.TString;
    name: Type.TString;
    input: Type.TString;
  }>>;
}>;
/**
 * Titles keyed by the caller-provided item id; missing ids mean no title.
 * `disabled: true` tells clients the gateway has tool titles switched off so
 * they stop requesting for the rest of the session.
 */
declare const ChatToolTitlesResultSchema: Type.TObject<{
  titles: Type.TRecord<"^.*$", Type.TString>;
  disabled: Type.TOptional<Type.TBoolean>;
}>;
/** Typed result shape for tool-title consumers. */
type ChatToolTitlesResult = Static<typeof ChatToolTitlesResultSchema>;
/** Fetches one stored chat message without forcing history callers to request huge payloads. */
declare const ChatMessageGetParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  messageId: Type.TString;
  maxChars: Type.TOptional<Type.TInteger>;
}>;
/** Result envelope for single-message lookup, including the stable miss/visibility reason. */
declare const ChatMessageGetResultSchema: Type.TObject<{
  ok: Type.TBoolean;
  message: Type.TOptional<Type.TUnknown>;
  unavailableReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"not_found">, Type.TLiteral<"oversized">, Type.TLiteral<"not_visible">]>>;
}>;
/** Typed result shape for callers that branch on message availability. */
type ChatMessageGetResult = Static<typeof ChatMessageGetResultSchema>;
/** Permissive attachment envelope shared by chat and session entrypoints. */
declare const ChatAttachmentSchema: Type.TObject<{
  type: Type.TOptional<Type.TString>;
  mimeType: Type.TOptional<Type.TString>;
  fileName: Type.TOptional<Type.TString>;
  content: Type.TOptional<Type.TUnknown>;
  sizeBytes: Type.TOptional<Type.TNumber>;
  durationMs: Type.TOptional<Type.TNumber>;
  width: Type.TOptional<Type.TNumber>;
  height: Type.TOptional<Type.TNumber>;
}>;
/** Attachment list shared by chat.send and session creation's initial turn. */
declare const ChatAttachmentsSchema: Type.TArray<Type.TObject<{
  type: Type.TOptional<Type.TString>;
  mimeType: Type.TOptional<Type.TString>;
  fileName: Type.TOptional<Type.TString>;
  content: Type.TOptional<Type.TUnknown>;
  sizeBytes: Type.TOptional<Type.TNumber>;
  durationMs: Type.TOptional<Type.TNumber>;
  width: Type.TOptional<Type.TNumber>;
  height: Type.TOptional<Type.TNumber>;
}>>;
/** User-to-agent send request; idempotency key lets clients safely retry transport failures. */
declare const ChatSendParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  sessionId: Type.TOptional<Type.TString>;
  message: Type.TString;
  thinking: Type.TOptional<Type.TString>;
  fastMode: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TLiteral<"auto">]>>;
  fastAutoOnSeconds: Type.TOptional<Type.TInteger>;
  queueMode: Type.TOptional<Type.TString>;
  deliver: Type.TOptional<Type.TBoolean>;
  originatingChannel: Type.TOptional<Type.TString>;
  originatingTo: Type.TOptional<Type.TString>;
  originatingAccountId: Type.TOptional<Type.TString>;
  originatingThreadId: Type.TOptional<Type.TString>;
  replyToId: Type.TOptional<Type.TString>;
  attachments: Type.TOptional<Type.TArray<Type.TObject<{
    type: Type.TOptional<Type.TString>;
    mimeType: Type.TOptional<Type.TString>;
    fileName: Type.TOptional<Type.TString>;
    content: Type.TOptional<Type.TUnknown>;
    sizeBytes: Type.TOptional<Type.TNumber>;
    durationMs: Type.TOptional<Type.TNumber>;
    width: Type.TOptional<Type.TNumber>;
    height: Type.TOptional<Type.TNumber>;
  }>>>;
  toolBindings: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  systemInputProvenance: Type.TOptional<Type.TObject<{
    kind: Type.TString;
    originSessionId: Type.TOptional<Type.TString>;
    sourceSessionKey: Type.TOptional<Type.TString>;
    sourceChannel: Type.TOptional<Type.TString>;
    sourceTool: Type.TOptional<Type.TString>;
  }>>;
  systemProvenanceReceipt: Type.TOptional<Type.TString>;
  suppressCommandInterpretation: Type.TOptional<Type.TBoolean>;
  expectedLeafEntryId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  expectedSessionRoutingContract: Type.TOptional<Type.TString>;
  idempotencyKey: Type.TString;
}>;
/** Cancels the active or named run for a chat session. */
declare const ChatAbortParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  preserveSideRuns: Type.TOptional<Type.TBoolean>;
}>;
/** Inserts an operator-visible synthetic message into an existing chat transcript. */
declare const ChatInjectParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  message: Type.TString;
  label: Type.TOptional<Type.TString>;
}>;
/** Coarse startup stages shown while a run has not produced visible activity yet. */
declare const ChatRunStartupPhaseSchema: Type.TUnion<[Type.TLiteral<"preparing_workspace">, Type.TLiteral<"provisioning_environment">, Type.TLiteral<"preparing_context">, Type.TLiteral<"starting_model">]>;
/** Non-terminal run status emitted before assistant or tool activity becomes visible. */
declare const ChatStatusEventSchema: Type.TObject<{
  state: Type.TLiteral<"status">;
  phase: Type.TUnion<[Type.TLiteral<"preparing_workspace">, Type.TLiteral<"provisioning_environment">, Type.TLiteral<"preparing_context">, Type.TLiteral<"starting_model">]>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>;
/** Incremental assistant output event; `replace` marks full-content refresh deltas. */
declare const ChatDeltaEventSchema: Type.TObject<{
  state: Type.TLiteral<"delta">;
  message: Type.TOptional<Type.TUnknown>;
  deltaText: Type.TString;
  replace: Type.TOptional<Type.TBoolean>;
  usage: Type.TOptional<Type.TUnknown>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>;
/** Successful terminal event for a completed chat run. */
declare const ChatFinalEventSchema: Type.TObject<{
  state: Type.TLiteral<"final">;
  message: Type.TOptional<Type.TUnknown>;
  usage: Type.TOptional<Type.TUnknown>;
  stopReason: Type.TOptional<Type.TString>;
  yielded: Type.TOptional<Type.TLiteral<true>>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>;
/** Terminal event for user-initiated or coordinator-initiated cancellation. */
declare const ChatAbortedEventSchema: Type.TObject<{
  state: Type.TLiteral<"aborted">;
  message: Type.TOptional<Type.TUnknown>;
  errorMessage: Type.TOptional<Type.TString>;
  stopReason: Type.TOptional<Type.TString>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>;
/** Terminal event for failed chat runs with an optional normalized failure kind. */
declare const ChatErrorEventSchema: Type.TObject<{
  state: Type.TLiteral<"error">;
  message: Type.TOptional<Type.TUnknown>;
  errorMessage: Type.TOptional<Type.TString>;
  errorKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"refusal">, Type.TLiteral<"timeout">, Type.TLiteral<"rate_limit">, Type.TLiteral<"context_length">, Type.TLiteral<"unknown">]>>;
  usage: Type.TOptional<Type.TUnknown>;
  stopReason: Type.TOptional<Type.TString>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>;
/** Public chat stream event union consumed by gateway protocol validators. */
declare const ChatEventSchema: Type.TUnion<[Type.TObject<{
  state: Type.TLiteral<"status">;
  phase: Type.TUnion<[Type.TLiteral<"preparing_workspace">, Type.TLiteral<"provisioning_environment">, Type.TLiteral<"preparing_context">, Type.TLiteral<"starting_model">]>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>, Type.TObject<{
  state: Type.TLiteral<"delta">;
  message: Type.TOptional<Type.TUnknown>;
  deltaText: Type.TString;
  replace: Type.TOptional<Type.TBoolean>;
  usage: Type.TOptional<Type.TUnknown>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>, Type.TObject<{
  state: Type.TLiteral<"final">;
  message: Type.TOptional<Type.TUnknown>;
  usage: Type.TOptional<Type.TUnknown>;
  stopReason: Type.TOptional<Type.TString>;
  yielded: Type.TOptional<Type.TLiteral<true>>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>, Type.TObject<{
  state: Type.TLiteral<"aborted">;
  message: Type.TOptional<Type.TUnknown>;
  errorMessage: Type.TOptional<Type.TString>;
  stopReason: Type.TOptional<Type.TString>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>, Type.TObject<{
  state: Type.TLiteral<"error">;
  message: Type.TOptional<Type.TUnknown>;
  errorMessage: Type.TOptional<Type.TString>;
  errorKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"refusal">, Type.TLiteral<"timeout">, Type.TLiteral<"rate_limit">, Type.TLiteral<"context_length">, Type.TLiteral<"unknown">]>>;
  usage: Type.TOptional<Type.TUnknown>;
  stopReason: Type.TOptional<Type.TString>;
  runId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  seq: Type.TInteger;
}>]>;
type ChatMetadataParams = Static<typeof ChatMetadataParamsSchema>;
type ChatToolTitlesParams = Static<typeof ChatToolTitlesParamsSchema>;
type LogsTailParams = Static<typeof LogsTailParamsSchema>;
type LogsTailResult = Static<typeof LogsTailResultSchema>;
type ChatAbortParams = Static<typeof ChatAbortParamsSchema>;
type ChatInjectParams = Static<typeof ChatInjectParamsSchema>;
type ChatRunStartupPhase = Static<typeof ChatRunStartupPhaseSchema>;
type ChatStatusEvent = Static<typeof ChatStatusEventSchema>;
type ChatEvent = Static<typeof ChatEventSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/nodes.d.ts
/** Reasons a node can report itself alive without implying an operator action. */
declare const NodePresenceAliveReasonSchema: Type.TString;
/** Presence heartbeat payload sent by remote nodes to refresh gateway state. */
declare const NodePresenceAlivePayloadSchema: Type.TObject<{
  trigger: Type.TString;
  sentAtMs: Type.TOptional<Type.TInteger>;
  displayName: Type.TOptional<Type.TString>;
  version: Type.TOptional<Type.TString>;
  platform: Type.TOptional<Type.TString>;
  deviceFamily: Type.TOptional<Type.TString>;
  modelIdentifier: Type.TOptional<Type.TString>;
  pushTransport: Type.TOptional<Type.TString>;
}>;
/** Recent operator input activity reported by an interactive node. */
declare const NodePresenceActivityPayloadSchema: Type.TUnion<[Type.TObject<{
  idleSeconds: Type.TInteger;
  saturated: Type.TOptional<Type.TBoolean>;
}>, Type.TObject<{
  action: Type.TLiteral<"clear">;
}>]>;
/** Normalized result for node-originated events after gateway dispatch. */
declare const NodeEventResultSchema: Type.TObject<{
  ok: Type.TBoolean;
  event: Type.TString;
  handled: Type.TBoolean;
  reason: Type.TOptional<Type.TString>;
}>;
/** Lists pending node-pairing requests. */
declare const NodePairListParamsSchema: Type.TObject<{}>;
/** Approves a pending node-pairing request by request id. */
declare const NodePairApproveParamsSchema: Type.TObject<{
  requestId: Type.TString;
}>;
/** Rejects a pending node-pairing request by request id. */
declare const NodePairRejectParamsSchema: Type.TObject<{
  requestId: Type.TString;
}>;
/** Removes an already paired node from the gateway trust set. */
declare const NodePairRemoveParamsSchema: Type.TObject<{
  nodeId: Type.TString;
}>;
/** Renames a paired node while preserving its stable node id. */
declare const NodeRenameParamsSchema: Type.TObject<{
  nodeId: Type.TString;
  displayName: Type.TString;
}>;
/** Lists paired nodes known to the gateway. */
declare const NodeListParamsSchema: Type.TObject<{}>;
/** Agent-visible tool descriptor advertised by a connected node. */
declare const NodePluginToolDescriptorSchema: Type.TObject<{
  pluginId: Type.TString;
  name: Type.TString;
  description: Type.TString;
  parameters: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  command: Type.TOptional<Type.TString>;
  mcp: Type.TOptional<Type.TObject<{
    server: Type.TString;
    tool: Type.TString;
  }>>;
}>;
/** Replaces the connected node's dynamic agent-visible plugin/MCP tool catalog. */
declare const NodePluginToolsUpdateParamsSchema: Type.TObject<{
  tools: Type.TArray<Type.TObject<{
    pluginId: Type.TString;
    name: Type.TString;
    description: Type.TString;
    parameters: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    command: Type.TOptional<Type.TString>;
    mcp: Type.TOptional<Type.TObject<{
      server: Type.TString;
      tool: Type.TString;
    }>>;
  }>>;
}>;
type NodePluginToolDescriptor = Static<typeof NodePluginToolDescriptorSchema>;
type NodePluginToolsUpdateParams = Static<typeof NodePluginToolsUpdateParamsSchema>;
/** Agent-visible skill descriptor advertised by a connected node. */
declare const NodeSkillDescriptorSchema: Type.TObject<{
  name: Type.TString;
  description: Type.TString;
  content: Type.TString;
}>;
/** Replaces the connected node's agent-visible skill catalog. */
declare const NodeSkillsUpdateParamsSchema: Type.TObject<{
  skills: Type.TArray<Type.TObject<{
    name: Type.TString;
    description: Type.TString;
    content: Type.TString;
  }>>;
}>;
type NodeSkillDescriptor = Static<typeof NodeSkillDescriptorSchema>;
type NodeSkillsUpdateParams = Static<typeof NodeSkillsUpdateParamsSchema>;
/** Acknowledges queued node work that the node has consumed. */
declare const NodePendingAckParamsSchema: Type.TObject<{
  ids: Type.TArray<Type.TString>;
}>;
/** Requests detailed metadata for one paired node. */
declare const NodeDescribeParamsSchema: Type.TObject<{
  nodeId: Type.TString;
}>;
/** Invokes a command on a paired node; idempotency allows safe retries. */
declare const NodeInvokeParamsSchema: Type.TObject<{
  nodeId: Type.TString;
  command: Type.TString;
  params: Type.TOptional<Type.TUnknown>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  idempotencyKey: Type.TString;
  sessionKey: Type.TOptional<Type.TString>;
  turnSourceChannel: Type.TOptional<Type.TString>;
  turnSourceTo: Type.TOptional<Type.TString>;
  turnSourceAccountId: Type.TOptional<Type.TString>;
  turnSourceThreadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
}>;
/** Result callback payload for a node command invocation. */
declare const NodeInvokeResultParamsSchema: Type.TObject<{
  id: Type.TString;
  nodeId: Type.TString;
  ok: Type.TBoolean;
  payload: Type.TOptional<Type.TUnknown>;
  payloadJSON: Type.TOptional<Type.TString>;
  error: Type.TOptional<Type.TObject<{
    code: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
  }>>;
}>;
/** Ordered UTF-8 output emitted while a node command invocation is running. */
declare const NodeInvokeProgressParamsSchema: Type.TObject<{
  invokeId: Type.TString;
  nodeId: Type.TString;
  seq: Type.TInteger;
  chunk: Type.TString;
}>;
/** Generic node event envelope accepted by the gateway. */
declare const NodeEventParamsSchema: Type.TObject<{
  event: Type.TString;
  payload: Type.TOptional<Type.TUnknown>;
  payloadJSON: Type.TOptional<Type.TString>;
}>;
/** Request for a bounded batch of queued work assigned to the calling node. */
declare const NodePendingDrainParamsSchema: Type.TObject<{
  maxItems: Type.TOptional<Type.TInteger>;
}>;
/** Drain response with a revision marker for node queue state. */
declare const NodePendingDrainResultSchema: Type.TObject<{
  nodeId: Type.TString;
  revision: Type.TInteger;
  items: Type.TArray<Type.TObject<{
    id: Type.TString;
    type: Type.TString;
    priority: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    payload: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  }>>;
  hasMore: Type.TBoolean;
}>;
/** Enqueues gateway-initiated work for a paired node. */
declare const NodePendingEnqueueParamsSchema: Type.TObject<{
  nodeId: Type.TString;
  type: Type.TString;
  priority: Type.TOptional<Type.TString>;
  expiresInMs: Type.TOptional<Type.TInteger>;
  wake: Type.TOptional<Type.TBoolean>;
}>;
/** Enqueue result echoes queue revision and whether wake delivery was attempted. */
declare const NodePendingEnqueueResultSchema: Type.TObject<{
  nodeId: Type.TString;
  revision: Type.TInteger;
  queued: Type.TObject<{
    id: Type.TString;
    type: Type.TString;
    priority: Type.TString;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
    payload: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  }>;
  wakeTriggered: Type.TBoolean;
}>;
/** Event payload used by the gateway to ask a node to run a command. */
declare const NodeInvokeRequestEventSchema: Type.TObject<{
  id: Type.TString;
  nodeId: Type.TString;
  command: Type.TString;
  paramsJSON: Type.TOptional<Type.TString>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  idempotencyKey: Type.TOptional<Type.TString>;
}>;
/** Ordered input frame sent by the gateway to one long-lived node invoke. */
declare const NodeInvokeInputEventSchema: Type.TObject<{
  id: Type.TString;
  nodeId: Type.TString;
  seq: Type.TInteger;
  payloadJSON: Type.TString;
}>;
type NodePairListParams = Static<typeof NodePairListParamsSchema>;
type NodePairApproveParams = Static<typeof NodePairApproveParamsSchema>;
type NodePairRejectParams = Static<typeof NodePairRejectParamsSchema>;
type NodePairRemoveParams = Static<typeof NodePairRemoveParamsSchema>;
type NodeRenameParams = Static<typeof NodeRenameParamsSchema>;
type NodeListParams = Static<typeof NodeListParamsSchema>;
type NodePendingAckParams = Static<typeof NodePendingAckParamsSchema>;
type NodeDescribeParams = Static<typeof NodeDescribeParamsSchema>;
type NodeInvokeParams = Static<typeof NodeInvokeParamsSchema>;
type NodeInvokeResultParams = Static<typeof NodeInvokeResultParamsSchema>;
type NodeInvokeProgressParams = Static<typeof NodeInvokeProgressParamsSchema>;
type NodeInvokeInputEvent = Static<typeof NodeInvokeInputEventSchema>;
type NodeEventParams = Static<typeof NodeEventParamsSchema>;
type NodeEventResult = Static<typeof NodeEventResultSchema>;
type NodePresenceAlivePayload = Static<typeof NodePresenceAlivePayloadSchema>;
type NodePresenceAliveReason = Static<typeof NodePresenceAliveReasonSchema>;
type NodePresenceActivityPayload = Static<typeof NodePresenceActivityPayloadSchema>;
type NodePendingDrainParams = Static<typeof NodePendingDrainParamsSchema>;
type NodePendingDrainResult = Static<typeof NodePendingDrainResultSchema>;
type NodePendingEnqueueParams = Static<typeof NodePendingEnqueueParamsSchema>;
type NodePendingEnqueueResult = Static<typeof NodePendingEnqueueResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/push.d.ts
/** Request payload for sending a test APNS notification to one node. */
declare const PushTestParamsSchema: Type.TObject<{
  nodeId: Type.TString;
  title: Type.TOptional<Type.TString>;
  body: Type.TOptional<Type.TString>;
  environment: Type.TOptional<Type.TString>;
}>;
/** Result payload from an APNS push test, including provider status and transport. */
declare const PushTestResultSchema: Type.TObject<{
  ok: Type.TBoolean;
  status: Type.TInteger;
  apnsId: Type.TOptional<Type.TString>;
  reason: Type.TOptional<Type.TString>;
  tokenSuffix: Type.TString;
  topic: Type.TString;
  environment: Type.TString;
  transport: Type.TString;
}>;
/** Empty request payload for fetching the Web Push VAPID public key. */
declare const WebPushVapidPublicKeyParamsSchema: Type.TObject<{}>;
/** Browser Web Push subscription payload registered with the gateway. */
declare const WebPushSubscribeParamsSchema: Type.TObject<{
  endpoint: Type.TString;
  keys: Type.TObject<{
    p256dh: Type.TString;
    auth: Type.TString;
  }>;
}>;
/** Browser Web Push endpoint removal payload. */
declare const WebPushUnsubscribeParamsSchema: Type.TObject<{
  endpoint: Type.TString;
}>;
/** Request payload for sending a test Web Push notification to current subscriptions. */
declare const WebPushTestParamsSchema: Type.TObject<{
  title: Type.TOptional<Type.TString>;
  body: Type.TOptional<Type.TString>;
}>;
/** Empty request type for fetching the Web Push VAPID public key. */
type WebPushVapidPublicKeyParams = Record<string, never>;
/** Browser PushSubscription subset persisted by the gateway. */
type WebPushSubscribeParams = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};
/** Browser PushSubscription endpoint removal request. */
type WebPushUnsubscribeParams = {
  endpoint: string;
};
/** Optional title/body overrides for a Web Push test notification. */
type WebPushTestParams = {
  title?: string;
  body?: string;
};
type PushTestParams = Static<typeof PushTestParamsSchema>;
type PushTestResult = Static<typeof PushTestResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/questions.d.ts
declare const QuestionOptionSchema: Type.TObject<{
  label: Type.TString;
  description: Type.TOptional<Type.TString>;
}>;
/** Unnormalized question accepted by question.request. */
declare const QuestionRequestQuestionSchema: Type.TObject<{
  questionId: Type.TString;
  header: Type.TString;
  question: Type.TString;
  options: Type.TArray<Type.TObject<{
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
  }>>;
  multiSelect: Type.TOptional<Type.TBoolean>;
  isOther: Type.TOptional<Type.TBoolean>;
  isSecret: Type.TOptional<Type.TBoolean>;
}>;
/** Canonical normalized question shown to an operator. */
declare const QuestionSchema: Type.TObject<{
  questionId: Type.TString;
  header: Type.TString;
  question: Type.TString;
  options: Type.TArray<Type.TObject<{
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
  }>>;
  multiSelect: Type.TOptional<Type.TBoolean>;
  isOther: Type.TOptional<Type.TBoolean>;
  isSecret: Type.TOptional<Type.TBoolean>;
}>;
declare const QuestionAnswersSchema: Type.TObject<{
  answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
}>;
declare const QuestionStatusSchema: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"answered">, Type.TLiteral<"cancelled">, Type.TLiteral<"expired">]>;
/**
 * One pending or recently resolved transient question request. Flat object with
 * optional terminal fields (exec-approval record precedent): native protocol
 * codegen cannot emit per-status object unions, and the manager owns the
 * status/answers invariant (answers present only when status is "answered").
 */
declare const QuestionRecordSchema: Type.TObject<{
  id: Type.TString;
  questions: Type.TArray<Type.TObject<{
    questionId: Type.TString;
    header: Type.TString;
    question: Type.TString;
    options: Type.TArray<Type.TObject<{
      label: Type.TString;
      description: Type.TOptional<Type.TString>;
    }>>;
    multiSelect: Type.TOptional<Type.TBoolean>;
    isOther: Type.TOptional<Type.TBoolean>;
    isSecret: Type.TOptional<Type.TBoolean>;
  }>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"answered">, Type.TLiteral<"cancelled">, Type.TLiteral<"expired">]>;
  answers: Type.TOptional<Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>>;
  resolvedBy: Type.TOptional<Type.TString>;
}>;
declare const QuestionRequestParamsSchema: Type.TObject<{
  id: Type.TOptional<Type.TString>;
  questions: Type.TArray<Type.TObject<{
    questionId: Type.TString;
    header: Type.TString;
    question: Type.TString;
    options: Type.TArray<Type.TObject<{
      label: Type.TString;
      description: Type.TOptional<Type.TString>;
    }>>;
    multiSelect: Type.TOptional<Type.TBoolean>;
    isOther: Type.TOptional<Type.TBoolean>;
    isSecret: Type.TOptional<Type.TBoolean>;
  }>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  timeoutMs: Type.TOptional<Type.TInteger>;
}>;
declare const QuestionRequestResultSchema: Type.TObject<{
  id: Type.TString;
  expiresAtMs: Type.TInteger;
}>;
declare const QuestionWaitAnswerParamsSchema: Type.TObject<{
  id: Type.TString;
  timeoutMs: Type.TOptional<Type.TInteger>;
}>;
declare const QuestionWaitAnswerResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"pending">;
}>, Type.TObject<{
  status: Type.TLiteral<"answered">;
  answers: Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>;
}>, Type.TObject<{
  status: Type.TLiteral<"cancelled">;
}>, Type.TObject<{
  status: Type.TLiteral<"expired">;
}>]>;
declare const QuestionResolveParamsSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
  answers: Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>;
  resolvedBy: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  id: Type.TString;
  cancel: Type.TLiteral<true>;
  resolvedBy: Type.TOptional<Type.TString>;
}>]>;
declare const QuestionResolveResultSchema: Type.TUnion<[Type.TObject<{
  status: Type.TLiteral<"answered">;
  answers: Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>;
}>, Type.TObject<{
  status: Type.TLiteral<"cancelled">;
}>]>;
declare const QuestionGetParamsSchema: Type.TObject<{
  id: Type.TString;
}>;
declare const QuestionGetResultSchema: Type.TObject<{
  question: Type.TObject<{
    id: Type.TString;
    questions: Type.TArray<Type.TObject<{
      questionId: Type.TString;
      header: Type.TString;
      question: Type.TString;
      options: Type.TArray<Type.TObject<{
        label: Type.TString;
        description: Type.TOptional<Type.TString>;
      }>>;
      multiSelect: Type.TOptional<Type.TBoolean>;
      isOther: Type.TOptional<Type.TBoolean>;
      isSecret: Type.TOptional<Type.TBoolean>;
    }>>;
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"answered">, Type.TLiteral<"cancelled">, Type.TLiteral<"expired">]>;
    answers: Type.TOptional<Type.TObject<{
      answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
    }>>;
    resolvedBy: Type.TOptional<Type.TString>;
  }>;
}>;
declare const QuestionListParamsSchema: Type.TObject<{}>;
declare const QuestionListResultSchema: Type.TObject<{
  questions: Type.TArray<Type.TObject<{
    id: Type.TString;
    questions: Type.TArray<Type.TObject<{
      questionId: Type.TString;
      header: Type.TString;
      question: Type.TString;
      options: Type.TArray<Type.TObject<{
        label: Type.TString;
        description: Type.TOptional<Type.TString>;
      }>>;
      multiSelect: Type.TOptional<Type.TBoolean>;
      isOther: Type.TOptional<Type.TBoolean>;
      isSecret: Type.TOptional<Type.TBoolean>;
    }>>;
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    createdAtMs: Type.TInteger;
    expiresAtMs: Type.TInteger;
    status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"answered">, Type.TLiteral<"cancelled">, Type.TLiteral<"expired">]>;
    answers: Type.TOptional<Type.TObject<{
      answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
    }>>;
    resolvedBy: Type.TOptional<Type.TString>;
  }>>;
}>;
declare const QuestionRequestedEventSchema: Type.TObject<{
  id: Type.TString;
  questions: Type.TArray<Type.TObject<{
    questionId: Type.TString;
    header: Type.TString;
    question: Type.TString;
    options: Type.TArray<Type.TObject<{
      label: Type.TString;
      description: Type.TOptional<Type.TString>;
    }>>;
    multiSelect: Type.TOptional<Type.TBoolean>;
    isOther: Type.TOptional<Type.TBoolean>;
    isSecret: Type.TOptional<Type.TBoolean>;
  }>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  createdAtMs: Type.TInteger;
  expiresAtMs: Type.TInteger;
  status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"answered">, Type.TLiteral<"cancelled">, Type.TLiteral<"expired">]>;
  answers: Type.TOptional<Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>>;
  resolvedBy: Type.TOptional<Type.TString>;
}>;
declare const QuestionResolvedEventSchema: Type.TUnion<[Type.TObject<{
  id: Type.TString;
  status: Type.TLiteral<"answered">;
  answers: Type.TObject<{
    answers: Type.TRecord<"^.*$", Type.TArray<Type.TString>>;
  }>;
}>, Type.TObject<{
  id: Type.TString;
  status: Type.TLiteral<"cancelled">;
}>, Type.TObject<{
  id: Type.TString;
  status: Type.TLiteral<"expired">;
}>]>;
type QuestionOption = Static<typeof QuestionOptionSchema>;
type Question = Static<typeof QuestionSchema>;
type QuestionRequestQuestion = Static<typeof QuestionRequestQuestionSchema>;
type QuestionAnswers = Static<typeof QuestionAnswersSchema>;
type QuestionStatus = Static<typeof QuestionStatusSchema>;
type QuestionRecord = Static<typeof QuestionRecordSchema>;
type QuestionRequestParams = Static<typeof QuestionRequestParamsSchema>;
type QuestionRequestResult = Static<typeof QuestionRequestResultSchema>;
type QuestionWaitAnswerParams = Static<typeof QuestionWaitAnswerParamsSchema>;
type QuestionWaitAnswerResult = Static<typeof QuestionWaitAnswerResultSchema>;
type QuestionResolveParams = Static<typeof QuestionResolveParamsSchema>;
type QuestionResolveResult = Static<typeof QuestionResolveResultSchema>;
type QuestionGetParams = Static<typeof QuestionGetParamsSchema>;
type QuestionGetResult = Static<typeof QuestionGetResultSchema>;
type QuestionListParams = Static<typeof QuestionListParamsSchema>;
type QuestionListResult = Static<typeof QuestionListResultSchema>;
type QuestionRequestedEvent = Static<typeof QuestionRequestedEventSchema>;
type QuestionResolvedEvent = Static<typeof QuestionResolvedEventSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/secrets.d.ts
/**
 * Secret-provider protocol schemas.
 *
 * These payloads request secret materialization from the gateway while keeping
 * caller scope, allowed paths, and provider overrides explicit.
 */
/** Empty request payload for reloading configured secret providers. */
declare const SecretsReloadParamsSchema: Type.TObject<{}>;
/** Request payload for resolving the secrets needed by one command invocation. */
declare const SecretsResolveParamsSchema: Type.TObject<{
  commandName: Type.TString;
  targetIds: Type.TArray<Type.TString>;
  allowedPaths: Type.TOptional<Type.TArray<Type.TString>>;
  forcedActivePaths: Type.TOptional<Type.TArray<Type.TString>>;
  optionalActivePaths: Type.TOptional<Type.TArray<Type.TString>>;
  providerOverrides: Type.TOptional<Type.TObject<{
    webSearch: Type.TOptional<Type.TString>;
    webFetch: Type.TOptional<Type.TString>;
  }>>;
}>;
/** Static type for secret resolution requests. */
type SecretsResolveParams = Static<typeof SecretsResolveParamsSchema>;
/** One resolved secret assignment path plus its provider-owned value. */
declare const SecretsResolveAssignmentSchema: Type.TObject<{
  path: Type.TOptional<Type.TString>;
  pathSegments: Type.TArray<Type.TString>;
  value: Type.TUnknown;
}>;
/** Secret resolution response with assignments and safe diagnostics. */
declare const SecretsResolveResultSchema: Type.TObject<{
  ok: Type.TOptional<Type.TBoolean>;
  assignments: Type.TOptional<Type.TArray<Type.TObject<{
    path: Type.TOptional<Type.TString>;
    pathSegments: Type.TArray<Type.TString>;
    value: Type.TUnknown;
  }>>>;
  diagnostics: Type.TOptional<Type.TArray<Type.TString>>;
  inactiveRefPaths: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Static type for secret resolution responses. */
type SecretsResolveResult = Static<typeof SecretsResolveResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/session-placement-state.d.ts
declare const SESSION_PLACEMENT_STATES: readonly ["local", "requested", "provisioning", "syncing", "starting", "active", "draining", "reconciling", "reclaimed", "failed"];
type SessionPlacementState = (typeof SESSION_PLACEMENT_STATES)[number];
declare function isCloudWorkerPlacementState(state: SessionPlacementState | undefined): state is Exclude<SessionPlacementState, "local" | "reclaimed">;
//#endregion
//#region packages/gateway-protocol/src/schema/session-placement.d.ts
/** Durable gateway ownership states for one session execution placement.
 * The literal list stays explicit because Type.Union needs a tuple for
 * Static inference (a mapped array collapses Static to never); the guard
 * below keeps it in lockstep with SESSION_PLACEMENT_STATES. */
declare const SessionPlacementStateSchema: Type.TUnion<[Type.TLiteral<"local">, Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"syncing">, Type.TLiteral<"starting">, Type.TLiteral<"active">, Type.TLiteral<"draining">, Type.TLiteral<"reconciling">, Type.TLiteral<"reclaimed">, Type.TLiteral<"failed">]>;
/** Gateway-visible placement projection; `state` remains the closed discriminator. */
declare const SessionPlacementSchema: Type.TUnion<[Type.TObject<{
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"local">;
}>, Type.TObject<{
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"requested">;
}>, Type.TObject<{
  environmentId: Type.TOptional<Type.TString>;
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"provisioning">;
}>, Type.TObject<{
  environmentId: Type.TString;
  workerBundleHash: Type.TString;
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"syncing">;
}>, Type.TObject<{
  workspaceBaseManifestRef: Type.TString;
  remoteWorkspaceDir: Type.TString;
  environmentId: Type.TString;
  workerBundleHash: Type.TString;
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"starting">;
}>, Type.TObject<{
  workspaceResultConflict: Type.TOptional<Type.TObject<{
    paths: Type.TArray<Type.TString>;
    stagedResultRef: Type.TString;
    totalCount: Type.TOptional<Type.TInteger>;
  }>>;
  lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
  lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
  workspaceBaseManifestRef: Type.TString;
  remoteWorkspaceDir: Type.TString;
  environmentId: Type.TString;
  activeOwnerEpoch: Type.TInteger;
  workerBundleHash: Type.TString;
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"active">;
}>, Type.TObject<{
  workspaceResultConflict: Type.TOptional<Type.TObject<{
    paths: Type.TArray<Type.TString>;
    stagedResultRef: Type.TString;
    totalCount: Type.TOptional<Type.TInteger>;
  }>>;
  lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
  lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
  workspaceBaseManifestRef: Type.TString;
  remoteWorkspaceDir: Type.TString;
  environmentId: Type.TString;
  activeOwnerEpoch: Type.TInteger;
  workerBundleHash: Type.TString;
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"draining">;
}>, Type.TObject<{
  workspaceResultConflict: Type.TOptional<Type.TObject<{
    paths: Type.TArray<Type.TString>;
    stagedResultRef: Type.TString;
    totalCount: Type.TOptional<Type.TInteger>;
  }>>;
  lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
  lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
  workspaceBaseManifestRef: Type.TString;
  remoteWorkspaceDir: Type.TString;
  environmentId: Type.TString;
  activeOwnerEpoch: Type.TInteger;
  workerBundleHash: Type.TString;
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"reconciling">;
}>, Type.TObject<{
  workspaceResultConflict: Type.TOptional<Type.TObject<{
    paths: Type.TArray<Type.TString>;
    stagedResultRef: Type.TString;
    totalCount: Type.TOptional<Type.TInteger>;
  }>>;
  lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
  lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
  environmentId: Type.TOptional<Type.TString>;
  activeOwnerEpoch: Type.TOptional<Type.TInteger>;
  workspaceBaseManifestRef: Type.TOptional<Type.TString>;
  remoteWorkspaceDir: Type.TOptional<Type.TString>;
  workerBundleHash: Type.TOptional<Type.TString>;
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"reclaimed">;
}>, Type.TObject<{
  recoveryError: Type.TString;
  workspaceResultConflict: Type.TOptional<Type.TObject<{
    paths: Type.TArray<Type.TString>;
    stagedResultRef: Type.TString;
    totalCount: Type.TOptional<Type.TInteger>;
  }>>;
  lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
  lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
  environmentId: Type.TOptional<Type.TString>;
  activeOwnerEpoch: Type.TOptional<Type.TInteger>;
  workspaceBaseManifestRef: Type.TOptional<Type.TString>;
  remoteWorkspaceDir: Type.TOptional<Type.TString>;
  workerBundleHash: Type.TOptional<Type.TString>;
  generation: Type.TInteger;
  createdAtMs: Type.TInteger;
  updatedAtMs: Type.TInteger;
  stateChangedAtMs: Type.TInteger;
  state: Type.TLiteral<"failed">;
}>]>;
/** Requests one-way dispatch of an existing local session to a configured worker profile. */
declare const SessionsDispatchParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  profileId: Type.TString;
}>;
/** Result returned once session dispatch reaches durable worker ownership. */
declare const SessionsDispatchResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  key: Type.TString;
  sessionId: Type.TString;
  placement: Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    activeOwnerEpoch: Type.TInteger;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"active">;
  }>;
}>;
/** Requests safe workspace reconciliation and teardown of an active cloud worker. */
declare const SessionsReclaimParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Result returned once worker ownership has been destroyed and reclaimed. */
declare const SessionsReclaimResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  key: Type.TString;
  sessionId: Type.TString;
  placement: Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    environmentId: Type.TOptional<Type.TString>;
    activeOwnerEpoch: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TOptional<Type.TString>;
    remoteWorkspaceDir: Type.TOptional<Type.TString>;
    workerBundleHash: Type.TOptional<Type.TString>;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"reclaimed">;
  }>;
}>;
declare const SessionPlacementProtocolSchemas: {
  readonly SessionPlacementState: Type.TUnion<[Type.TLiteral<"local">, Type.TLiteral<"requested">, Type.TLiteral<"provisioning">, Type.TLiteral<"syncing">, Type.TLiteral<"starting">, Type.TLiteral<"active">, Type.TLiteral<"draining">, Type.TLiteral<"reconciling">, Type.TLiteral<"reclaimed">, Type.TLiteral<"failed">]>;
  readonly LocalSessionPlacement: Type.TObject<{
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"local">;
  }>;
  readonly RequestedSessionPlacement: Type.TObject<{
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"requested">;
  }>;
  readonly ProvisioningSessionPlacement: Type.TObject<{
    environmentId: Type.TOptional<Type.TString>;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"provisioning">;
  }>;
  readonly SyncingSessionPlacement: Type.TObject<{
    environmentId: Type.TString;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"syncing">;
  }>;
  readonly StartingSessionPlacement: Type.TObject<{
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"starting">;
  }>;
  readonly ActiveWorkerSessionPlacement: Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    activeOwnerEpoch: Type.TInteger;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"active">;
  }>;
  readonly DrainingSessionPlacement: Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    activeOwnerEpoch: Type.TInteger;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"draining">;
  }>;
  readonly ReconcilingSessionPlacement: Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    activeOwnerEpoch: Type.TInteger;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"reconciling">;
  }>;
  readonly ReclaimedSessionPlacement: Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    environmentId: Type.TOptional<Type.TString>;
    activeOwnerEpoch: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TOptional<Type.TString>;
    remoteWorkspaceDir: Type.TOptional<Type.TString>;
    workerBundleHash: Type.TOptional<Type.TString>;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"reclaimed">;
  }>;
  readonly FailedSessionPlacement: Type.TObject<{
    recoveryError: Type.TString;
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    environmentId: Type.TOptional<Type.TString>;
    activeOwnerEpoch: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TOptional<Type.TString>;
    remoteWorkspaceDir: Type.TOptional<Type.TString>;
    workerBundleHash: Type.TOptional<Type.TString>;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"failed">;
  }>;
  readonly SessionPlacement: Type.TUnion<[Type.TObject<{
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"local">;
  }>, Type.TObject<{
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"requested">;
  }>, Type.TObject<{
    environmentId: Type.TOptional<Type.TString>;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"provisioning">;
  }>, Type.TObject<{
    environmentId: Type.TString;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"syncing">;
  }>, Type.TObject<{
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"starting">;
  }>, Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    activeOwnerEpoch: Type.TInteger;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"active">;
  }>, Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    activeOwnerEpoch: Type.TInteger;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"draining">;
  }>, Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TString;
    remoteWorkspaceDir: Type.TString;
    environmentId: Type.TString;
    activeOwnerEpoch: Type.TInteger;
    workerBundleHash: Type.TString;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"reconciling">;
  }>, Type.TObject<{
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    environmentId: Type.TOptional<Type.TString>;
    activeOwnerEpoch: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TOptional<Type.TString>;
    remoteWorkspaceDir: Type.TOptional<Type.TString>;
    workerBundleHash: Type.TOptional<Type.TString>;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"reclaimed">;
  }>, Type.TObject<{
    recoveryError: Type.TString;
    workspaceResultConflict: Type.TOptional<Type.TObject<{
      paths: Type.TArray<Type.TString>;
      stagedResultRef: Type.TString;
      totalCount: Type.TOptional<Type.TInteger>;
    }>>;
    lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
    lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
    environmentId: Type.TOptional<Type.TString>;
    activeOwnerEpoch: Type.TOptional<Type.TInteger>;
    workspaceBaseManifestRef: Type.TOptional<Type.TString>;
    remoteWorkspaceDir: Type.TOptional<Type.TString>;
    workerBundleHash: Type.TOptional<Type.TString>;
    generation: Type.TInteger;
    createdAtMs: Type.TInteger;
    updatedAtMs: Type.TInteger;
    stateChangedAtMs: Type.TInteger;
    state: Type.TLiteral<"failed">;
  }>]>;
  readonly SessionsDispatchParams: Type.TObject<{
    key: Type.TString;
    agentId: Type.TOptional<Type.TString>;
    profileId: Type.TString;
  }>;
  readonly SessionsDispatchResult: Type.TObject<{
    ok: Type.TLiteral<true>;
    key: Type.TString;
    sessionId: Type.TString;
    placement: Type.TObject<{
      workspaceResultConflict: Type.TOptional<Type.TObject<{
        paths: Type.TArray<Type.TString>;
        stagedResultRef: Type.TString;
        totalCount: Type.TOptional<Type.TInteger>;
      }>>;
      lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
      lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
      workspaceBaseManifestRef: Type.TString;
      remoteWorkspaceDir: Type.TString;
      environmentId: Type.TString;
      activeOwnerEpoch: Type.TInteger;
      workerBundleHash: Type.TString;
      generation: Type.TInteger;
      createdAtMs: Type.TInteger;
      updatedAtMs: Type.TInteger;
      stateChangedAtMs: Type.TInteger;
      state: Type.TLiteral<"active">;
    }>;
  }>;
  readonly SessionsReclaimParams: Type.TObject<{
    key: Type.TString;
    agentId: Type.TOptional<Type.TString>;
  }>;
  readonly SessionsReclaimResult: Type.TObject<{
    ok: Type.TLiteral<true>;
    key: Type.TString;
    sessionId: Type.TString;
    placement: Type.TObject<{
      workspaceResultConflict: Type.TOptional<Type.TObject<{
        paths: Type.TArray<Type.TString>;
        stagedResultRef: Type.TString;
        totalCount: Type.TOptional<Type.TInteger>;
      }>>;
      lastTranscriptAckCursor: Type.TOptional<Type.TInteger>;
      lastLiveEventAckCursor: Type.TOptional<Type.TInteger>;
      environmentId: Type.TOptional<Type.TString>;
      activeOwnerEpoch: Type.TOptional<Type.TInteger>;
      workspaceBaseManifestRef: Type.TOptional<Type.TString>;
      remoteWorkspaceDir: Type.TOptional<Type.TString>;
      workerBundleHash: Type.TOptional<Type.TString>;
      generation: Type.TInteger;
      createdAtMs: Type.TInteger;
      updatedAtMs: Type.TInteger;
      stateChangedAtMs: Type.TInteger;
      state: Type.TLiteral<"reclaimed">;
    }>;
  }>;
};
type SessionPlacement = Static<typeof SessionPlacementSchema>;
type SessionsDispatchParams = Static<typeof SessionsDispatchParamsSchema>;
type SessionsDispatchResult = Static<typeof SessionsDispatchResultSchema>;
type SessionsReclaimParams = Static<typeof SessionsReclaimParamsSchema>;
type SessionsReclaimResult = Static<typeof SessionsReclaimResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/session-discussion.d.ts
declare const SessionDiscussionStateSchema: Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"available">, Type.TLiteral<"open">]>;
declare const SessionDiscussionInfoSchema: Type.TObject<{
  state: Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"available">, Type.TLiteral<"open">]>;
  embedUrl: Type.TOptional<Type.TString>;
  openUrl: Type.TOptional<Type.TString>;
}>;
declare const SessionDiscussionInfoParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
}>;
declare const SessionDiscussionOpenParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
}>;
declare const SessionDiscussionInfoResultSchema: Type.TObject<{
  state: Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"available">, Type.TLiteral<"open">]>;
  embedUrl: Type.TOptional<Type.TString>;
  openUrl: Type.TOptional<Type.TString>;
}>;
declare const SessionDiscussionOpenResultSchema: Type.TObject<{
  state: Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"available">, Type.TLiteral<"open">]>;
  embedUrl: Type.TOptional<Type.TString>;
  openUrl: Type.TOptional<Type.TString>;
}>;
type SessionDiscussionState = Static<typeof SessionDiscussionStateSchema>;
type SessionDiscussionInfo = Static<typeof SessionDiscussionInfoSchema>;
type SessionDiscussionInfoParams = Static<typeof SessionDiscussionInfoParamsSchema>;
type SessionDiscussionOpenParams = Static<typeof SessionDiscussionOpenParamsSchema>;
type SessionDiscussionInfoResult = Static<typeof SessionDiscussionInfoResultSchema>;
type SessionDiscussionOpenResult = Static<typeof SessionDiscussionOpenResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-create.d.ts
/** Creates or adopts a session with optional model, thinking, label, and parent linkage. */
declare const SessionsCreateParamsSchema: Type.TObject<{
  key: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  label: Type.TOptional<Type.TString>;
  model: Type.TOptional<Type.TString>;
  thinkingLevel: Type.TOptional<Type.TString>;
  incognito: Type.TOptional<Type.TBoolean>;
  visibility: Type.TOptional<Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>>;
  catalogId: Type.TOptional<Type.TString>;
  parentSessionKey: Type.TOptional<Type.TString>;
  spawnDepth: Type.TOptional<Type.TInteger>;
  fork: Type.TOptional<Type.TBoolean>;
  emitCommandHooks: Type.TOptional<Type.TBoolean>;
  succeedsParent: Type.TOptional<Type.TBoolean>;
  task: Type.TOptional<Type.TString>;
  message: Type.TOptional<Type.TString>;
  attachments: Type.TOptional<Type.TArray<Type.TObject<{
    type: Type.TOptional<Type.TString>;
    mimeType: Type.TOptional<Type.TString>;
    fileName: Type.TOptional<Type.TString>;
    content: Type.TOptional<Type.TUnknown>;
    sizeBytes: Type.TOptional<Type.TNumber>;
    durationMs: Type.TOptional<Type.TNumber>;
    width: Type.TOptional<Type.TNumber>;
    height: Type.TOptional<Type.TNumber>;
  }>>>;
  worktree: Type.TOptional<Type.TBoolean>;
  worktreeBaseRef: Type.TOptional<Type.TString>;
  worktreeName: Type.TOptional<Type.TString>;
  execNode: Type.TOptional<Type.TString>;
  cwd: Type.TOptional<Type.TString>;
}>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions.d.ts
declare const SESSION_OBSERVER_HEALTH_VALUES: readonly ["on-track", "grinding", "stuck", "waiting-on-user", "wrapping-up", "done", "failed"];
/** Trajectory judgment produced for one observed agent session. */
declare const SessionObserverHealthSchema: Type.TUnion<[Type.TLiteral<"on-track">, Type.TLiteral<"grinding">, Type.TLiteral<"stuck">, Type.TLiteral<"waiting-on-user">, Type.TLiteral<"wrapping-up">, Type.TLiteral<"done">, Type.TLiteral<"failed">]>;
/** Completed and total step counts from the session's current plan. */
declare const SessionObserverPlanProgressSchema: Type.TObject<{
  completed: Type.TInteger;
  total: Type.TInteger;
}>;
/** Live session status judgment broadcast to subscribed operator clients. */
declare const SessionObserverDigestSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  revision: Type.TInteger;
  updatedAt: Type.TInteger;
  headline: Type.TString;
  assessment: Type.TOptional<Type.TString>;
  health: Type.TUnion<[Type.TLiteral<"on-track">, Type.TLiteral<"grinding">, Type.TLiteral<"stuck">, Type.TLiteral<"waiting-on-user">, Type.TLiteral<"wrapping-up">, Type.TLiteral<"done">, Type.TLiteral<"failed">]>;
  planProgress: Type.TOptional<Type.TObject<{
    completed: Type.TInteger;
    total: Type.TInteger;
  }>>;
}>;
/** Declares whether this connection currently renders session observer output. */
declare const SessionsObserverVisibilityParamsSchema: Type.TObject<{
  visible: Type.TBoolean;
}>;
/** Acknowledges a connection's observer visibility declaration. */
declare const SessionsObserverVisibilityResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
}>;
/** One bounded question/answer exchange in the ephemeral session companion. */
declare const SessionCompanionExchangeSchema: Type.TObject<{
  question: Type.TString;
  answer: Type.TString;
  ts: Type.TInteger;
}>;
/** Asks the read-only companion about one session and its workspace. */
declare const SessionsCompanionAskParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  question: Type.TString;
}>;
/** Companion answer returned only to the requesting operator. */
declare const SessionsCompanionAskResultSchema: Type.TObject<{
  answer: Type.TString;
  ts: Type.TInteger;
}>;
/** Selects the in-memory companion thread for one session. */
declare const SessionsCompanionStateParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
}>;
/** Current bounded exchanges for one session companion thread. */
declare const SessionsCompanionStateResultSchema: Type.TObject<{
  exchanges: Type.TArray<Type.TObject<{
    question: Type.TString;
    answer: Type.TString;
    ts: Type.TInteger;
  }>>;
}>;
/** Selects the in-memory companion thread to clear. */
declare const SessionsCompanionResetParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
}>;
/** Acknowledges clearing one companion thread. */
declare const SessionsCompanionResetResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
}>;
/** Start/end event emitted while a session compaction operation runs. */
declare const SessionOperationEventSchema: Type.TObject<{
  operationId: Type.TString;
  operation: Type.TLiteral<"compact">;
  phase: Type.TUnion<[Type.TLiteral<"start">, Type.TLiteral<"end">]>;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  ts: Type.TInteger;
  completed: Type.TOptional<Type.TBoolean>;
  reason: Type.TOptional<Type.TString>;
}>;
/** Stored compaction checkpoint metadata for branching or restoring a session. */
declare const SessionCompactionCheckpointSchema: Type.TObject<{
  checkpointId: Type.TString;
  sessionKey: Type.TString;
  sessionId: Type.TString;
  createdAt: Type.TInteger;
  reason: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"auto-threshold">, Type.TLiteral<"overflow-retry">, Type.TLiteral<"timeout-retry">]>;
  tokensBefore: Type.TOptional<Type.TInteger>;
  tokensAfter: Type.TOptional<Type.TInteger>;
  summary: Type.TOptional<Type.TString>;
  firstKeptEntryId: Type.TOptional<Type.TString>;
  preCompaction: Type.TObject<{
    sessionId: Type.TString;
    sessionFile: Type.TOptional<Type.TString>;
    leafId: Type.TOptional<Type.TString>;
    entryId: Type.TOptional<Type.TString>;
  }>;
  postCompaction: Type.TObject<{
    sessionId: Type.TString;
    sessionFile: Type.TOptional<Type.TString>;
    leafId: Type.TOptional<Type.TString>;
    entryId: Type.TOptional<Type.TString>;
  }>;
}>;
/** Session file grouping used by the Control UI session workspace rail. */
declare const SessionFileKindSchema: Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">]>;
/** Session relevance marker for browser entries. */
declare const SessionFileRelevanceSchema: Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">, Type.TLiteral<"mixed">]>;
/** Encoding used when a session file preview includes inline content. */
declare const SessionFileContentEncodingSchema: Type.TUnion<[Type.TLiteral<"utf8">, Type.TLiteral<"base64">]>;
/** Renderer class selected for one session workspace file preview. */
declare const SessionFilePreviewKindSchema: Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"unsupported">]>;
/** One file path referenced by a session transcript. */
declare const SessionFileEntrySchema: Type.TObject<{
  path: Type.TString;
  workspacePath: Type.TOptional<Type.TString>;
  name: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">]>;
  missing: Type.TBoolean;
  size: Type.TOptional<Type.TInteger>;
  updatedAtMs: Type.TOptional<Type.TInteger>;
  content: Type.TOptional<Type.TString>;
  hash: Type.TOptional<Type.TString>;
  mimeType: Type.TOptional<Type.TString>;
  contentEncoding: Type.TOptional<Type.TUnion<[Type.TLiteral<"utf8">, Type.TLiteral<"base64">]>>;
  previewKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"unsupported">]>>;
}>;
/** One file or folder in the session-rooted browser. */
declare const SessionFileBrowserEntrySchema: Type.TObject<{
  path: Type.TString;
  name: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"file">, Type.TLiteral<"directory">]>;
  sessionKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">, Type.TLiteral<"mixed">]>>;
  size: Type.TOptional<Type.TInteger>;
  updatedAtMs: Type.TOptional<Type.TInteger>;
}>;
/** Folder listing or search result rooted at the session workspace. */
declare const SessionFileBrowserResultSchema: Type.TObject<{
  path: Type.TString;
  parentPath: Type.TOptional<Type.TString>;
  search: Type.TOptional<Type.TString>;
  entries: Type.TArray<Type.TObject<{
    path: Type.TString;
    name: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"file">, Type.TLiteral<"directory">]>;
    sessionKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">, Type.TLiteral<"mixed">]>>;
    size: Type.TOptional<Type.TInteger>;
    updatedAtMs: Type.TOptional<Type.TInteger>;
  }>>;
  truncated: Type.TOptional<Type.TBoolean>;
}>;
/** Lists files touched by a session transcript. */
declare const SessionsFilesListParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  path: Type.TOptional<Type.TString>;
  search: Type.TOptional<Type.TString>;
}>;
/** File references visible in one session workspace. */
declare const SessionsFilesListResultSchema: Type.TObject<{
  sessionKey: Type.TString;
  root: Type.TOptional<Type.TString>; /** Whether the session workspace directory is inside a git checkout; absent when the workspace root is unknown or the gateway predates the field. */
  gitCheckout: Type.TOptional<Type.TBoolean>;
  files: Type.TArray<Type.TObject<{
    path: Type.TString;
    workspacePath: Type.TOptional<Type.TString>;
    name: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">]>;
    missing: Type.TBoolean;
    size: Type.TOptional<Type.TInteger>;
    updatedAtMs: Type.TOptional<Type.TInteger>;
    content: Type.TOptional<Type.TString>;
    hash: Type.TOptional<Type.TString>;
    mimeType: Type.TOptional<Type.TString>;
    contentEncoding: Type.TOptional<Type.TUnion<[Type.TLiteral<"utf8">, Type.TLiteral<"base64">]>>;
    previewKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"unsupported">]>>;
  }>>;
  browser: Type.TOptional<Type.TObject<{
    path: Type.TString;
    parentPath: Type.TOptional<Type.TString>;
    search: Type.TOptional<Type.TString>;
    entries: Type.TArray<Type.TObject<{
      path: Type.TString;
      name: Type.TString;
      kind: Type.TUnion<[Type.TLiteral<"file">, Type.TLiteral<"directory">]>;
      sessionKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">, Type.TLiteral<"mixed">]>>;
      size: Type.TOptional<Type.TInteger>;
      updatedAtMs: Type.TOptional<Type.TInteger>;
    }>>;
    truncated: Type.TOptional<Type.TBoolean>;
  }>>;
}>;
/** Reads one session-referenced file by path. */
declare const SessionsFilesGetParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  path: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Result for reading one session-referenced file. */
declare const SessionsFilesGetResultSchema: Type.TObject<{
  sessionKey: Type.TString;
  root: Type.TOptional<Type.TString>;
  file: Type.TObject<{
    path: Type.TString;
    workspacePath: Type.TOptional<Type.TString>;
    name: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">]>;
    missing: Type.TBoolean;
    size: Type.TOptional<Type.TInteger>;
    updatedAtMs: Type.TOptional<Type.TInteger>;
    content: Type.TOptional<Type.TString>;
    hash: Type.TOptional<Type.TString>;
    mimeType: Type.TOptional<Type.TString>;
    contentEncoding: Type.TOptional<Type.TUnion<[Type.TLiteral<"utf8">, Type.TLiteral<"base64">]>>;
    previewKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"unsupported">]>>;
  }>;
}>;
/** Overwrites one existing session workspace file with hash-based CAS. */
declare const SessionsFilesSetParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  path: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  content: Type.TString;
  expectedHash: Type.TString;
}>;
/** Result for overwriting one session workspace file. */
declare const SessionsFilesSetResultSchema: Type.TObject<{
  sessionKey: Type.TString;
  root: Type.TOptional<Type.TString>;
  file: Type.TObject<{
    path: Type.TString;
    workspacePath: Type.TOptional<Type.TString>;
    name: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"modified">, Type.TLiteral<"read">]>;
    missing: Type.TBoolean;
    size: Type.TOptional<Type.TInteger>;
    updatedAtMs: Type.TOptional<Type.TInteger>;
    content: Type.TOptional<Type.TString>;
    hash: Type.TOptional<Type.TString>;
    mimeType: Type.TOptional<Type.TString>;
    contentEncoding: Type.TOptional<Type.TUnion<[Type.TLiteral<"utf8">, Type.TLiteral<"base64">]>>;
    previewKind: Type.TOptional<Type.TUnion<[Type.TLiteral<"text">, Type.TLiteral<"image">, Type.TLiteral<"unsupported">]>>;
  }>;
}>;
/** Opens a session workspace on the Gateway host without accepting a client path. */
declare const SessionsFilesRevealParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Result for revealing a session workspace on the Gateway host. */
declare const SessionsFilesRevealResultSchema: Type.TObject<{
  ok: Type.TBoolean;
  path: Type.TOptional<Type.TString>;
  error: Type.TOptional<Type.TString>;
}>;
/** Change status for one file in a session checkout diff. */
declare const SessionDiffFileStatusSchema: Type.TUnion<[Type.TLiteral<"added">, Type.TLiteral<"modified">, Type.TLiteral<"deleted">, Type.TLiteral<"renamed">]>;
/** One changed file in a session checkout diff. */
declare const SessionDiffFileSchema: Type.TObject<{
  path: Type.TString;
  oldPath: Type.TOptional<Type.TString>;
  status: Type.TUnion<[Type.TLiteral<"added">, Type.TLiteral<"modified">, Type.TLiteral<"deleted">, Type.TLiteral<"renamed">]>;
  additions: Type.TInteger;
  deletions: Type.TInteger;
  binary: Type.TOptional<Type.TBoolean>;
  untracked: Type.TOptional<Type.TBoolean>; /** Per-file unified patch text; absent for binary or oversized files. */
  patch: Type.TOptional<Type.TString>;
  truncated: Type.TOptional<Type.TBoolean>;
}>;
/** Reads the git diff of a session checkout against its base branch. */
declare const SessionsDiffParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Branch + working-tree diff for one session checkout. */
declare const SessionsDiffResultSchema: Type.TObject<{
  sessionKey: Type.TString;
  root: Type.TOptional<Type.TString>;
  branch: Type.TOptional<Type.TString>; /** Display label of the diff base: the default branch name or "HEAD". */
  baseRef: Type.TOptional<Type.TString>;
  files: Type.TArray<Type.TObject<{
    path: Type.TString;
    oldPath: Type.TOptional<Type.TString>;
    status: Type.TUnion<[Type.TLiteral<"added">, Type.TLiteral<"modified">, Type.TLiteral<"deleted">, Type.TLiteral<"renamed">]>;
    additions: Type.TInteger;
    deletions: Type.TInteger;
    binary: Type.TOptional<Type.TBoolean>;
    untracked: Type.TOptional<Type.TBoolean>; /** Per-file unified patch text; absent for binary or oversized files. */
    patch: Type.TOptional<Type.TString>;
    truncated: Type.TOptional<Type.TBoolean>;
  }>>;
  additions: Type.TInteger;
  deletions: Type.TInteger;
  truncated: Type.TOptional<Type.TBoolean>;
  unavailableReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"unknown_session">, Type.TLiteral<"not_git">]>>;
}>;
/** Lists sessions with optional scope, activity, label, and preview filters. */
declare const SessionsListParamsSchema: Type.TObject<{
  /** Maximum rows to return; omitted Gateway RPC calls use a bounded default. */limit: Type.TOptional<Type.TInteger>;
  offset: Type.TOptional<Type.TInteger>;
  activeMinutes: Type.TOptional<Type.TInteger>; /** Require a real user/channel interaction; excludes synthetic isolated heartbeat rows. */
  requireLastInteraction: Type.TOptional<Type.TBoolean>;
  sortBy: Type.TOptional<Type.TUnion<[Type.TLiteral<"updatedAt">, Type.TLiteral<"lastInteractionAt">]>>;
  includeGlobal: Type.TOptional<Type.TBoolean>;
  includeUnknown: Type.TOptional<Type.TBoolean>; /** Limit agent-scoped rows to agents currently present in config. */
  configuredAgentsOnly: Type.TOptional<Type.TBoolean>;
  /**
   * Read first 8KB of each session transcript to derive title from first user message.
   * Performs a file read per session - use `limit` to bound result set on large stores.
   */
  includeDerivedTitles: Type.TOptional<Type.TBoolean>;
  /**
   * Read last 16KB of each session transcript to extract most recent message preview.
   * Performs a file read per session - use `limit` to bound result set on large stores.
   */
  includeLastMessage: Type.TOptional<Type.TBoolean>;
  label: Type.TOptional<Type.TString>; /** Limit rows to sessions with an explicitly stored Control UI face preference. */
  boardFace: Type.TOptional<Type.TUnion<[Type.TLiteral<"chat">, Type.TLiteral<"dashboard">]>>; /** Filter rows by their permanent creator identity. */
  creatorId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  search: Type.TOptional<Type.TString>;
  /**
   * True lists archived sessions; "all" lists archived and active;
   * false or omitted lists active sessions.
   */
  archived: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TLiteral<"all">]>>;
}>;
/** Searches one agent's indexed session transcripts, optionally within selected sessions. */
declare const SessionsSearchParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  sessionKeys: Type.TOptional<Type.TArray<Type.TString>>;
  query: Type.TString;
  limit: Type.TOptional<Type.TInteger>;
}>;
/** One full-text session transcript match with follow-up provenance. */
declare const SessionsSearchHitSchema: Type.TObject<{
  sessionKey: Type.TString;
  sessionId: Type.TString;
  messageId: Type.TString;
  role: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"assistant">]>;
  timestamp: Type.TInteger;
  snippet: Type.TString;
  score: Type.TNumber;
}>;
/** Full-text search response; indexing marks a still-running first-use reconcile. */
declare const SessionsSearchResultSchema: Type.TObject<{
  results: Type.TArray<Type.TObject<{
    sessionKey: Type.TString;
    sessionId: Type.TString;
    messageId: Type.TString;
    role: Type.TUnion<[Type.TLiteral<"user">, Type.TLiteral<"assistant">]>;
    timestamp: Type.TInteger;
    snippet: Type.TString;
    score: Type.TNumber;
  }>>;
  indexing: Type.TOptional<Type.TBoolean>;
  truncated: Type.TOptional<Type.TBoolean>;
}>;
/** Repairs or removes invalid session records from the selected agent scope. */
declare const SessionsCleanupParamsSchema: Type.TObject<{
  agent: Type.TOptional<Type.TString>;
  allAgents: Type.TOptional<Type.TBoolean>;
  enforce: Type.TOptional<Type.TBoolean>;
  activeKey: Type.TOptional<Type.TString>;
  fixMissing: Type.TOptional<Type.TBoolean>;
  fixDmScope: Type.TOptional<Type.TBoolean>;
}>;
/** Reads short previews for selected session keys. */
declare const SessionsPreviewParamsSchema: Type.TObject<{
  keys: Type.TArray<Type.TString>;
  limit: Type.TOptional<Type.TInteger>;
  maxChars: Type.TOptional<Type.TInteger>;
}>;
/** Describes one session and optional derived title/last-message previews. */
declare const SessionsDescribeParamsSchema: Type.TObject<{
  key: Type.TString;
  includeDerivedTitles: Type.TOptional<Type.TBoolean>;
  includeLastMessage: Type.TOptional<Type.TBoolean>;
}>;
/** Resolves a session by key, raw session id, label, or parent/agent scope. */
declare const SessionsResolveParamsSchema: Type.TObject<{
  key: Type.TOptional<Type.TString>;
  sessionId: Type.TOptional<Type.TString>;
  label: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  spawnedBy: Type.TOptional<Type.TString>;
  includeGlobal: Type.TOptional<Type.TBoolean>;
  includeUnknown: Type.TOptional<Type.TBoolean>; /** Return a successful `{ ok: false }` response when the selector does not match a session. */
  allowMissing: Type.TOptional<Type.TBoolean>;
}>;
declare const SessionWorktreeInfoSchema: Type.TObject<{
  id: Type.TString;
  path: Type.TString;
  branch: Type.TString;
}>;
/** Result returned after creating or adopting a session. */
declare const SessionsCreateResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  key: Type.TString;
  sessionId: Type.TOptional<Type.TString>;
  entry: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  runStarted: Type.TOptional<Type.TBoolean>;
  runId: Type.TOptional<Type.TString>;
  messageSeq: Type.TOptional<Type.TInteger>;
  runError: Type.TOptional<Type.TObject<{
    code: Type.TString;
    message: Type.TString;
    details: Type.TOptional<Type.TUnknown>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>>;
  worktree: Type.TOptional<Type.TObject<{
    id: Type.TString;
    path: Type.TString;
    branch: Type.TString;
  }>>;
}>;
/** Sends one message into an existing session. */
declare const SessionsSendParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  message: Type.TString;
  thinking: Type.TOptional<Type.TString>;
  attachments: Type.TOptional<Type.TArray<Type.TObject<{
    type: Type.TOptional<Type.TString>;
    mimeType: Type.TOptional<Type.TString>;
    fileName: Type.TOptional<Type.TString>;
    content: Type.TOptional<Type.TUnknown>;
    sizeBytes: Type.TOptional<Type.TNumber>;
    durationMs: Type.TOptional<Type.TNumber>;
    width: Type.TOptional<Type.TNumber>;
    height: Type.TOptional<Type.TNumber>;
  }>>>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  idempotencyKey: Type.TOptional<Type.TString>;
}>;
/** Subscribes a client to live message updates for one session. */
declare const SessionsMessagesSubscribeParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>; /** Opt in to sanitized durable approval events for this session and its descendants. */
  includeApprovals: Type.TOptional<Type.TLiteral<true>>;
}>;
/** Removes a live message subscription for one session. */
declare const SessionsMessagesUnsubscribeParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Aborts the active or named run for a session. */
declare const SessionsAbortParamsSchema: Type.TObject<{
  key: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>; /** Also discard followup and lane queues for a key-only non-global session abort. */
  clearQueued: Type.TOptional<Type.TBoolean>;
}>;
/** Mutable per-session preferences and routing metadata. */
declare const SessionsPatchParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>; /** Reject the mutation if the session was reset or replaced before it commits. */
  expectedSessionId: Type.TOptional<Type.TString>;
  expectedLifecycleRevision: Type.TOptional<Type.TString>;
  label: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>; /** User-defined organization bucket ("category", not chat-group); null clears it. */
  category: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  boardFace: Type.TOptional<Type.TUnion<[Type.TLiteral<"chat">, Type.TLiteral<"dashboard">]>>;
  icon: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  statusNote: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  attention: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  ttlMinutes: Type.TOptional<Type.TInteger>;
  archived: Type.TOptional<Type.TBoolean>;
  pinned: Type.TOptional<Type.TBoolean>;
  unread: Type.TOptional<Type.TBoolean>;
  thinkingLevel: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  fastMode: Type.TOptional<Type.TUnion<[Type.TBoolean, Type.TLiteral<"auto">, Type.TNull]>>;
  toolOverrides: Type.TOptional<Type.TUnion<[Type.TObject<{
    mcpServers: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
    mcpToolsDeny: Type.TOptional<Type.TRecord<"^.*$", Type.TArray<Type.TString>>>;
    skills: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
    webSearch: Type.TOptional<Type.TBoolean>;
  }>, Type.TNull]>>;
  verboseLevel: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  traceLevel: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  reasoningLevel: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  responseUsage: Type.TOptional<Type.TUnion<[Type.TLiteral<"off">, Type.TLiteral<"tokens">, Type.TLiteral<"full">, Type.TLiteral<"on">, Type.TNull]>>;
  elevatedLevel: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  execHost: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  execSecurity: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  execAsk: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  execNode: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  model: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  completionOwnerSessionKey: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  inheritedToolPolicyVersion: Type.TOptional<Type.TUnion<[Type.TLiteral<1>, Type.TNull]>>;
  inheritedToolAllow: Type.TOptional<Type.TUnion<[Type.TArray<Type.TString>, Type.TNull]>>;
  inheritedToolDeny: Type.TOptional<Type.TUnion<[Type.TArray<Type.TString>, Type.TNull]>>;
  sendPolicy: Type.TOptional<Type.TUnion<[Type.TLiteral<"allow">, Type.TLiteral<"deny">, Type.TNull]>>;
  groupActivation: Type.TOptional<Type.TUnion<[Type.TLiteral<"mention">, Type.TLiteral<"always">, Type.TNull]>>;
}>;
type SessionsPatchParams = Static<typeof SessionsPatchParamsSchema>;
/** Updates or clears one plugin namespace value on a session record. */
declare const SessionsPluginPatchParamsSchema: Type.TObject<{
  key: Type.TString;
  pluginId: Type.TString;
  namespace: Type.TString;
  value: Type.TOptional<Type.TUnknown>;
  unset: Type.TOptional<Type.TBoolean>;
}>;
/** Result returned after patching session plugin state. */
declare const SessionsPluginPatchResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  key: Type.TString;
  value: Type.TOptional<Type.TUnknown>;
}>;
/** Resets a session to a new or reset transcript state. */
declare const SessionsResetParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  reason: Type.TOptional<Type.TUnion<[Type.TLiteral<"new">, Type.TLiteral<"reset">]>>;
}>;
/** Deletes a session record and optionally its transcript. */
declare const SessionsDeleteParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  deleteTranscript: Type.TOptional<Type.TBoolean>;
  expectedSessionId: Type.TOptional<Type.TString>;
  expectedLifecycleRevision: Type.TOptional<Type.TString>;
  expectedSessionUpdatedAt: Type.TOptional<Type.TNumber>;
  emitLifecycleHooks: Type.TOptional<Type.TBoolean>;
  /**
   * Restricts the delete to already-archived sessions (archive-then-delete).
   * operator.write callers must set this; deletes without it require
   * operator.admin.
   */
  archivedOnly: Type.TOptional<Type.TBoolean>;
}>;
/** Lists the gateway-owned custom session group catalog (names + order). */
declare const SessionsGroupsListParamsSchema: Type.TObject<{}>;
/** One custom session group catalog entry. */
declare const SessionGroupSchema: Type.TObject<{
  name: Type.TString;
  position: Type.TInteger;
}>;
/** Custom session group catalog in display order. */
declare const SessionsGroupsListResultSchema: Type.TObject<{
  groups: Type.TArray<Type.TObject<{
    name: Type.TString;
    position: Type.TInteger;
  }>>;
  sectionOrder: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Replaces the ordered group catalog; creates listed names, keeps member categories untouched. */
declare const SessionsGroupsPutParamsSchema: Type.TObject<{
  names: Type.TArray<Type.TString>;
  sectionOrder: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Renames a group and repoints every member session's category. */
declare const SessionsGroupsRenameParamsSchema: Type.TObject<{
  name: Type.TString;
  to: Type.TString;
}>;
/** Deletes a group and clears every member session's category. */
declare const SessionsGroupsDeleteParamsSchema: Type.TObject<{
  name: Type.TString;
}>;
/** Result for group catalog mutations, with member sessions updated where applicable. */
declare const SessionsGroupsMutationResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  groups: Type.TArray<Type.TObject<{
    name: Type.TString;
    position: Type.TInteger;
  }>>;
  sectionOrder: Type.TOptional<Type.TArray<Type.TString>>;
  updatedSessions: Type.TOptional<Type.TInteger>;
}>;
/** Requests manual compaction for a session transcript. */
declare const SessionsCompactParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  maxLines: Type.TOptional<Type.TInteger>;
}>;
/** Lists compaction checkpoints for one session. */
declare const SessionsCompactionListParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
/** Reads one compaction checkpoint by id. */
declare const SessionsCompactionGetParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  checkpointId: Type.TString;
}>;
/** Creates a new branch from a compaction checkpoint. */
declare const SessionsCompactionBranchParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  checkpointId: Type.TString;
}>;
/** Restores an existing session to a compaction checkpoint. */
declare const SessionsCompactionRestoreParamsSchema: Type.TObject<{
  key: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  checkpointId: Type.TString;
}>;
/** Repoints a session to the active-path state before one persisted user message. */
declare const SessionsRewindParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  entryId: Type.TString;
}>;
/** Creates a new session from the active-path state before one persisted user message. */
declare const SessionsForkParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  entryId: Type.TString;
}>;
declare const SessionsRewindResultSchema: Type.TObject<{
  editorText: Type.TOptional<Type.TString>;
  editorAttachments: Type.TOptional<Type.TArray<Type.TObject<{
    mimeType: Type.TString;
    data: Type.TString;
  }>>>;
}>;
declare const SessionsForkResultSchema: Type.TObject<{
  sessionKey: Type.TString;
  editorText: Type.TOptional<Type.TString>;
  editorAttachments: Type.TOptional<Type.TArray<Type.TObject<{
    mimeType: Type.TString;
    data: Type.TString;
  }>>>;
}>;
declare const SessionBranchSchema: Type.TObject<{
  leafEntryId: Type.TString;
  headline: Type.TString;
  messageCount: Type.TInteger;
  updatedAt: Type.TOptional<Type.TString>;
  active: Type.TBoolean;
}>;
/** Lists transcript DAG tips available for branch switching. */
declare const SessionsBranchesListParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionsBranchesListResultSchema: Type.TObject<{
  branches: Type.TArray<Type.TObject<{
    leafEntryId: Type.TString;
    headline: Type.TString;
    messageCount: Type.TInteger;
    updatedAt: Type.TOptional<Type.TString>;
    active: Type.TBoolean;
  }>>;
}>;
/** Repoints the active transcript path to one existing DAG tip. */
declare const SessionsBranchesSwitchParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  leafEntryId: Type.TString;
}>;
declare const SessionsBranchesSwitchResultSchema: Type.TObject<{}>;
/** List response for session compaction checkpoints. */
declare const SessionsCompactionListResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  key: Type.TString;
  checkpoints: Type.TArray<Type.TObject<{
    checkpointId: Type.TString;
    sessionKey: Type.TString;
    sessionId: Type.TString;
    createdAt: Type.TInteger;
    reason: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"auto-threshold">, Type.TLiteral<"overflow-retry">, Type.TLiteral<"timeout-retry">]>;
    tokensBefore: Type.TOptional<Type.TInteger>;
    tokensAfter: Type.TOptional<Type.TInteger>;
    summary: Type.TOptional<Type.TString>;
    firstKeptEntryId: Type.TOptional<Type.TString>;
    preCompaction: Type.TObject<{
      sessionId: Type.TString;
      sessionFile: Type.TOptional<Type.TString>;
      leafId: Type.TOptional<Type.TString>;
      entryId: Type.TOptional<Type.TString>;
    }>;
    postCompaction: Type.TObject<{
      sessionId: Type.TString;
      sessionFile: Type.TOptional<Type.TString>;
      leafId: Type.TOptional<Type.TString>;
      entryId: Type.TOptional<Type.TString>;
    }>;
  }>>;
}>;
/** Get response for a single compaction checkpoint. */
declare const SessionsCompactionGetResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  key: Type.TString;
  checkpoint: Type.TObject<{
    checkpointId: Type.TString;
    sessionKey: Type.TString;
    sessionId: Type.TString;
    createdAt: Type.TInteger;
    reason: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"auto-threshold">, Type.TLiteral<"overflow-retry">, Type.TLiteral<"timeout-retry">]>;
    tokensBefore: Type.TOptional<Type.TInteger>;
    tokensAfter: Type.TOptional<Type.TInteger>;
    summary: Type.TOptional<Type.TString>;
    firstKeptEntryId: Type.TOptional<Type.TString>;
    preCompaction: Type.TObject<{
      sessionId: Type.TString;
      sessionFile: Type.TOptional<Type.TString>;
      leafId: Type.TOptional<Type.TString>;
      entryId: Type.TOptional<Type.TString>;
    }>;
    postCompaction: Type.TObject<{
      sessionId: Type.TString;
      sessionFile: Type.TOptional<Type.TString>;
      leafId: Type.TOptional<Type.TString>;
      entryId: Type.TOptional<Type.TString>;
    }>;
  }>;
}>;
/** Branch response with the newly created session key and entry metadata. */
declare const SessionsCompactionBranchResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  sourceKey: Type.TString;
  key: Type.TString;
  sessionId: Type.TString;
  checkpoint: Type.TObject<{
    checkpointId: Type.TString;
    sessionKey: Type.TString;
    sessionId: Type.TString;
    createdAt: Type.TInteger;
    reason: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"auto-threshold">, Type.TLiteral<"overflow-retry">, Type.TLiteral<"timeout-retry">]>;
    tokensBefore: Type.TOptional<Type.TInteger>;
    tokensAfter: Type.TOptional<Type.TInteger>;
    summary: Type.TOptional<Type.TString>;
    firstKeptEntryId: Type.TOptional<Type.TString>;
    preCompaction: Type.TObject<{
      sessionId: Type.TString;
      sessionFile: Type.TOptional<Type.TString>;
      leafId: Type.TOptional<Type.TString>;
      entryId: Type.TOptional<Type.TString>;
    }>;
    postCompaction: Type.TObject<{
      sessionId: Type.TString;
      sessionFile: Type.TOptional<Type.TString>;
      leafId: Type.TOptional<Type.TString>;
      entryId: Type.TOptional<Type.TString>;
    }>;
  }>;
  entry: Type.TObject<{
    sessionId: Type.TString;
    updatedAt: Type.TInteger;
  }>;
}>;
/** Restore response with updated session entry metadata. */
declare const SessionsCompactionRestoreResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  key: Type.TString;
  sessionId: Type.TString;
  checkpoint: Type.TObject<{
    checkpointId: Type.TString;
    sessionKey: Type.TString;
    sessionId: Type.TString;
    createdAt: Type.TInteger;
    reason: Type.TUnion<[Type.TLiteral<"manual">, Type.TLiteral<"auto-threshold">, Type.TLiteral<"overflow-retry">, Type.TLiteral<"timeout-retry">]>;
    tokensBefore: Type.TOptional<Type.TInteger>;
    tokensAfter: Type.TOptional<Type.TInteger>;
    summary: Type.TOptional<Type.TString>;
    firstKeptEntryId: Type.TOptional<Type.TString>;
    preCompaction: Type.TObject<{
      sessionId: Type.TString;
      sessionFile: Type.TOptional<Type.TString>;
      leafId: Type.TOptional<Type.TString>;
      entryId: Type.TOptional<Type.TString>;
    }>;
    postCompaction: Type.TObject<{
      sessionId: Type.TString;
      sessionFile: Type.TOptional<Type.TString>;
      leafId: Type.TOptional<Type.TString>;
      entryId: Type.TOptional<Type.TString>;
    }>;
  }>;
  entry: Type.TObject<{
    sessionId: Type.TString;
    updatedAt: Type.TInteger;
  }>;
}>;
/** Usage report query across one session, one agent, or all agent sessions. */
declare const SessionsUsageParamsSchema: Type.TObject<{
  /** Specific session key to analyze; if omitted returns sessions for the effective agent. */key: Type.TOptional<Type.TString>; /** Agent scope for list-style usage queries. */
  agentId: Type.TOptional<Type.TString>; /** Explicit all-agent scope for list-style usage queries. */
  agentScope: Type.TOptional<Type.TLiteral<"all">>; /** Start date for range filter (YYYY-MM-DD). */
  startDate: Type.TOptional<Type.TString>; /** End date for range filter (YYYY-MM-DD). */
  endDate: Type.TOptional<Type.TString>; /** How start/end dates should be interpreted. Defaults to UTC when omitted. */
  mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"utc">, Type.TLiteral<"gateway">, Type.TLiteral<"specific">]>>; /** Preset range for usage queries when explicit start/end dates are omitted. */
  range: Type.TOptional<Type.TUnion<[Type.TLiteral<"7d">, Type.TLiteral<"30d">, Type.TLiteral<"90d">, Type.TLiteral<"1y">, Type.TLiteral<"all">]>>; /** Usage row grouping. `family` rolls up known rotated session ids for a logical key. */
  groupBy: Type.TOptional<Type.TUnion<[Type.TLiteral<"instance">, Type.TLiteral<"family">]>>; /** Backward-compatible alias for requesting family grouping. */
  includeHistorical: Type.TOptional<Type.TBoolean>; /** UTC offset to use when mode is `specific` (for example, UTC-4 or UTC+5:30). */
  utcOffset: Type.TOptional<Type.TString>; /** IANA time zone for `specific`; preferred over `utcOffset`, which remains a compatibility fallback. */
  timeZone: Type.TOptional<Type.TString>; /** Maximum sessions to return (default 50). */
  limit: Type.TOptional<Type.TInteger>; /** Include context weight breakdown (systemPromptReport). */
  includeContextWeight: Type.TOptional<Type.TBoolean>;
}>;
type SessionsListParams = Static<typeof SessionsListParamsSchema>;
type SessionsCleanupParams = Static<typeof SessionsCleanupParamsSchema>;
type SessionsPreviewParams = Static<typeof SessionsPreviewParamsSchema>;
type SessionsDescribeParams = Static<typeof SessionsDescribeParamsSchema>;
type SessionsResolveParams = Static<typeof SessionsResolveParamsSchema>;
type SessionsSearchParams = Static<typeof SessionsSearchParamsSchema>;
type SessionsSearchHit = Static<typeof SessionsSearchHitSchema>;
type SessionsSearchResult = Static<typeof SessionsSearchResultSchema>;
type SessionCompactionCheckpoint = Static<typeof SessionCompactionCheckpointSchema>;
type SessionOperationEvent = Static<typeof SessionOperationEventSchema>;
type SessionObserverHealth = Static<typeof SessionObserverHealthSchema>;
type SessionObserverPlanProgress = Static<typeof SessionObserverPlanProgressSchema>;
type SessionObserverDigest = Static<typeof SessionObserverDigestSchema>;
type SessionsObserverVisibilityParams = Static<typeof SessionsObserverVisibilityParamsSchema>;
type SessionsObserverVisibilityResult = Static<typeof SessionsObserverVisibilityResultSchema>;
type SessionCompanionExchange = Static<typeof SessionCompanionExchangeSchema>;
type SessionsCompanionAskParams = Static<typeof SessionsCompanionAskParamsSchema>;
type SessionsCompanionAskResult = Static<typeof SessionsCompanionAskResultSchema>;
type SessionsCompanionStateParams = Static<typeof SessionsCompanionStateParamsSchema>;
type SessionsCompanionStateResult = Static<typeof SessionsCompanionStateResultSchema>;
type SessionsCompanionResetParams = Static<typeof SessionsCompanionResetParamsSchema>;
type SessionsCompanionResetResult = Static<typeof SessionsCompanionResetResultSchema>;
type SessionsCompactionListParams = Static<typeof SessionsCompactionListParamsSchema>;
type SessionsCompactionGetParams = Static<typeof SessionsCompactionGetParamsSchema>;
type SessionsCompactionBranchParams = Static<typeof SessionsCompactionBranchParamsSchema>;
type SessionsCompactionRestoreParams = Static<typeof SessionsCompactionRestoreParamsSchema>;
type SessionsCompactionListResult = Static<typeof SessionsCompactionListResultSchema>;
type SessionsCompactionGetResult = Static<typeof SessionsCompactionGetResultSchema>;
type SessionsCompactionBranchResult = Static<typeof SessionsCompactionBranchResultSchema>;
type SessionsCompactionRestoreResult = Static<typeof SessionsCompactionRestoreResultSchema>;
type SessionsRewindParams = Static<typeof SessionsRewindParamsSchema>;
type SessionsForkParams = Static<typeof SessionsForkParamsSchema>;
type SessionsRewindResult = Static<typeof SessionsRewindResultSchema>;
type SessionsForkResult = Static<typeof SessionsForkResultSchema>;
type SessionBranch = Static<typeof SessionBranchSchema>;
type SessionsBranchesListParams = Static<typeof SessionsBranchesListParamsSchema>;
type SessionsBranchesListResult = Static<typeof SessionsBranchesListResultSchema>;
type SessionsBranchesSwitchParams = Static<typeof SessionsBranchesSwitchParamsSchema>;
type SessionsBranchesSwitchResult = Static<typeof SessionsBranchesSwitchResultSchema>;
type SessionWorktreeInfo = Static<typeof SessionWorktreeInfoSchema>;
type SessionsCreateParams = Static<typeof SessionsCreateParamsSchema>;
type SessionsCreateResult = Static<typeof SessionsCreateResultSchema>;
type SessionsSendParams = Static<typeof SessionsSendParamsSchema>;
type SessionsMessagesSubscribeParams = Static<typeof SessionsMessagesSubscribeParamsSchema>;
type SessionsMessagesUnsubscribeParams = Static<typeof SessionsMessagesUnsubscribeParamsSchema>;
type SessionsAbortParams = Static<typeof SessionsAbortParamsSchema>;
type SessionsPluginPatchParams = Static<typeof SessionsPluginPatchParamsSchema>;
type SessionsPluginPatchResult = Static<typeof SessionsPluginPatchResultSchema>;
type SessionsResetParams = Static<typeof SessionsResetParamsSchema>;
type SessionsDeleteParams = Static<typeof SessionsDeleteParamsSchema>;
type SessionGroup = Static<typeof SessionGroupSchema>;
type SessionsGroupsListParams = Static<typeof SessionsGroupsListParamsSchema>;
type SessionsGroupsListResult = Static<typeof SessionsGroupsListResultSchema>;
type SessionsGroupsPutParams = Static<typeof SessionsGroupsPutParamsSchema>;
type SessionsGroupsRenameParams = Static<typeof SessionsGroupsRenameParamsSchema>;
type SessionsGroupsDeleteParams = Static<typeof SessionsGroupsDeleteParamsSchema>;
type SessionsGroupsMutationResult = Static<typeof SessionsGroupsMutationResultSchema>;
type SessionsCompactParams = Static<typeof SessionsCompactParamsSchema>;
type SessionsUsageParams = Static<typeof SessionsUsageParamsSchema>;
type SessionFileContentEncoding = Static<typeof SessionFileContentEncodingSchema>;
type SessionFileKind = Static<typeof SessionFileKindSchema>;
type SessionFilePreviewKind = Static<typeof SessionFilePreviewKindSchema>;
type SessionFileRelevance = Static<typeof SessionFileRelevanceSchema>;
type SessionFileEntry = Static<typeof SessionFileEntrySchema>;
type SessionFileBrowserEntry = Static<typeof SessionFileBrowserEntrySchema>;
type SessionFileBrowserResult = Static<typeof SessionFileBrowserResultSchema>;
type SessionsFilesListParams = Static<typeof SessionsFilesListParamsSchema>;
type SessionsFilesListResult = Static<typeof SessionsFilesListResultSchema>;
type SessionsFilesGetParams = Static<typeof SessionsFilesGetParamsSchema>;
type SessionsFilesGetResult = Static<typeof SessionsFilesGetResultSchema>;
type SessionsFilesSetParams = Static<typeof SessionsFilesSetParamsSchema>;
type SessionsFilesSetResult = Static<typeof SessionsFilesSetResultSchema>;
type SessionsFilesRevealParams = Static<typeof SessionsFilesRevealParamsSchema>;
type SessionsFilesRevealResult = Static<typeof SessionsFilesRevealResultSchema>;
type SessionDiffFileStatus = Static<typeof SessionDiffFileStatusSchema>;
type SessionDiffFile = Static<typeof SessionDiffFileSchema>;
type SessionsDiffParams = Static<typeof SessionsDiffParamsSchema>;
type SessionsDiffResult = Static<typeof SessionsDiffResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-viewer-presence.d.ts
/** Maximum sessions one connection may declare as concurrently visible. */
declare const SESSION_VIEWER_PRESENCE_MAX_KEYS = 32;
/** Replaces the sessions this connection is currently rendering. */
declare const SessionsViewerPresenceSetParamsSchema: Type.TObject<{
  sessionKeys: Type.TArray<Type.TString>;
}>;
/** Canonical session keys retained for this connection's viewer presence. */
declare const SessionsViewerPresenceSetResultSchema: Type.TObject<{
  sessionKeys: Type.TArray<Type.TString>;
}>;
type SessionsViewerPresenceSetParams = Static<typeof SessionsViewerPresenceSetParamsSchema>;
type SessionsViewerPresenceSetResult = Static<typeof SessionsViewerPresenceSetResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-sharing-values.d.ts
declare const SESSION_VISIBILITY_VALUES: readonly ["shared", "read-only", "suggest", "draft"];
declare const SessionVisibilitySchema: Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>;
declare const SessionSharingRoleSchema: Type.TUnion<[Type.TLiteral<"admin">, Type.TLiteral<"owner">, Type.TLiteral<"member">, Type.TLiteral<"viewer">]>;
type SessionVisibility = Static<typeof SessionVisibilitySchema>;
type SessionSharingRole = Static<typeof SessionSharingRoleSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/sessions-sharing.d.ts
/** A selectable sharing identity is a created actor with a durable id. */
declare const SessionSharingIdentitySchema: Type.TObject<{
  id: Type.TString;
  type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
  label: Type.TOptional<Type.TString>;
  avatarUrl: Type.TOptional<Type.TString>;
}>;
declare const SessionSharingActionSchema: Type.TUnion<[Type.TLiteral<"visibility">, Type.TLiteral<"member-added">, Type.TLiteral<"member-removed">]>;
declare const SessionVisibilitySetParamsSchema: Type.TObject<{
  visibility: Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionVisibilitySetResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  sessionKey: Type.TString;
  visibility: Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>;
}>;
declare const SessionMembersListParamsSchema: Type.TObject<{
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionMemberSchema: Type.TObject<{
  identityId: Type.TString;
  addedBy: Type.TString;
  addedAt: Type.TInteger;
}>;
declare const SessionMembersListResultSchema: Type.TObject<{
  sessionKey: Type.TString;
  owner: Type.TOptional<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    label: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>>;
  members: Type.TArray<Type.TObject<{
    identityId: Type.TString;
    addedBy: Type.TString;
    addedAt: Type.TInteger;
  }>>;
  identities: Type.TArray<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    label: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>>;
  role: Type.TUnion<[Type.TLiteral<"admin">, Type.TLiteral<"owner">, Type.TLiteral<"member">, Type.TLiteral<"viewer">]>;
  allowedVisibilities: Type.TArray<Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>>;
}>;
declare const SessionMemberAddParamsSchema: Type.TObject<{
  identityId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionMemberRemoveParamsSchema: Type.TObject<{
  identityId: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const SessionMemberMutationResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  sessionKey: Type.TString;
  identityId: Type.TString;
}>;
declare const SessionSharingEventSchema: Type.TObject<{
  action: Type.TUnion<[Type.TLiteral<"visibility">, Type.TLiteral<"member-added">, Type.TLiteral<"member-removed">]>;
  sessionKey: Type.TString;
  agentId: Type.TString;
  actor: Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"human">, Type.TLiteral<"agent">, Type.TLiteral<"system">]>;
    label: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>;
  visibility: Type.TOptional<Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>>;
  identityId: Type.TOptional<Type.TString>;
  ts: Type.TInteger;
}>;
type SessionSharingIdentity = Static<typeof SessionSharingIdentitySchema>;
type SessionSharingAction = Static<typeof SessionSharingActionSchema>;
type SessionVisibilitySetParams = Static<typeof SessionVisibilitySetParamsSchema>;
type SessionVisibilitySetResult = Static<typeof SessionVisibilitySetResultSchema>;
type SessionMembersListParams = Static<typeof SessionMembersListParamsSchema>;
type SessionMember = Static<typeof SessionMemberSchema>;
type SessionMembersListResult = Static<typeof SessionMembersListResultSchema>;
type SessionMemberAddParams = Static<typeof SessionMemberAddParamsSchema>;
type SessionMemberRemoveParams = Static<typeof SessionMemberRemoveParamsSchema>;
type SessionMemberMutationResult = Static<typeof SessionMemberMutationResultSchema>;
type SessionSharingEvent = Static<typeof SessionSharingEventSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/snapshot.d.ts
/**
 * Gateway state snapshot schemas.
 *
 * Snapshots are sent during hello and later event streams; they summarize node
 * presence, health, session defaults, and version counters for clients.
 */
/** One gateway-visible presence record for a node/client/runtime. */
declare const PresenceEntrySchema: Type.TObject<{
  host: Type.TOptional<Type.TString>;
  ip: Type.TOptional<Type.TString>;
  version: Type.TOptional<Type.TString>;
  platform: Type.TOptional<Type.TString>;
  deviceFamily: Type.TOptional<Type.TString>;
  modelIdentifier: Type.TOptional<Type.TString>;
  mode: Type.TOptional<Type.TString>;
  lastInputSeconds: Type.TOptional<Type.TInteger>;
  reason: Type.TOptional<Type.TString>;
  tags: Type.TOptional<Type.TArray<Type.TString>>;
  text: Type.TOptional<Type.TString>;
  ts: Type.TInteger;
  deviceId: Type.TOptional<Type.TString>;
  roles: Type.TOptional<Type.TArray<Type.TString>>;
  scopes: Type.TOptional<Type.TArray<Type.TString>>;
  instanceId: Type.TOptional<Type.TString>;
  user: Type.TOptional<Type.TObject<{
    /** Opaque identity key: authenticated email today, durable profile id later. Clients group presence by this. */id: Type.TString;
    email: Type.TOptional<Type.TString>;
    name: Type.TOptional<Type.TString>;
    avatarUrl: Type.TOptional<Type.TString>;
  }>>; /** Session keys this connection is actively subscribed to (watching). Sorted lexicographically for deterministic snapshots. */
  watchedSessions: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Monotonic version counters for snapshot subtrees. */
declare const StateVersionSchema: Type.TObject<{
  presence: Type.TInteger;
  health: Type.TInteger;
}>;
/** Initial and incremental gateway state snapshot payload. */
declare const SnapshotSchema: Type.TObject<{
  presence: Type.TArray<Type.TObject<{
    host: Type.TOptional<Type.TString>;
    ip: Type.TOptional<Type.TString>;
    version: Type.TOptional<Type.TString>;
    platform: Type.TOptional<Type.TString>;
    deviceFamily: Type.TOptional<Type.TString>;
    modelIdentifier: Type.TOptional<Type.TString>;
    mode: Type.TOptional<Type.TString>;
    lastInputSeconds: Type.TOptional<Type.TInteger>;
    reason: Type.TOptional<Type.TString>;
    tags: Type.TOptional<Type.TArray<Type.TString>>;
    text: Type.TOptional<Type.TString>;
    ts: Type.TInteger;
    deviceId: Type.TOptional<Type.TString>;
    roles: Type.TOptional<Type.TArray<Type.TString>>;
    scopes: Type.TOptional<Type.TArray<Type.TString>>;
    instanceId: Type.TOptional<Type.TString>;
    user: Type.TOptional<Type.TObject<{
      /** Opaque identity key: authenticated email today, durable profile id later. Clients group presence by this. */id: Type.TString;
      email: Type.TOptional<Type.TString>;
      name: Type.TOptional<Type.TString>;
      avatarUrl: Type.TOptional<Type.TString>;
    }>>; /** Session keys this connection is actively subscribed to (watching). Sorted lexicographically for deterministic snapshots. */
    watchedSessions: Type.TOptional<Type.TArray<Type.TString>>;
  }>>;
  health: Type.TObject<{
    ok: Type.TOptional<Type.TLiteral<true>>;
    ts: Type.TOptional<Type.TInteger>;
    durationMs: Type.TOptional<Type.TInteger>;
    eventLoop: Type.TOptional<Type.TObject<{
      degraded: Type.TBoolean;
      degradedSinceMs: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
      reasons: Type.TArray<Type.TUnion<[Type.TLiteral<"event_loop_delay">, Type.TLiteral<"event_loop_utilization">, Type.TLiteral<"cpu">]>>;
      intervalMs: Type.TNumber;
      delayP99Ms: Type.TNumber;
      delayMaxMs: Type.TNumber;
      utilization: Type.TNumber;
      cpuCoreRatio: Type.TNumber;
    }>>;
    plugins: Type.TOptional<Type.TObject<{
      loaded: Type.TArray<Type.TString>;
      errors: Type.TArray<Type.TObject<{
        id: Type.TString;
        origin: Type.TString;
        activated: Type.TBoolean;
        activationSource: Type.TOptional<Type.TString>;
        activationReason: Type.TOptional<Type.TString>;
        failurePhase: Type.TOptional<Type.TString>;
        error: Type.TString;
      }>>;
      unavailable: Type.TOptional<Type.TArray<Type.TObject<{
        id: Type.TString;
        state: Type.TLiteral<"configured-unavailable">;
        diagnostic: Type.TObject<{
          kind: Type.TLiteral<"plugin-verification">;
          reason: Type.TString;
          detail: Type.TString;
        }>;
      }>>>;
    }>>;
    contextEngines: Type.TOptional<Type.TObject<{
      quarantined: Type.TArray<Type.TObject<{
        engineId: Type.TString;
        owner: Type.TOptional<Type.TString>;
        operation: Type.TString;
        reason: Type.TString;
        failedAt: Type.TInteger;
      }>>;
    }>>;
    deliveryQueues: Type.TOptional<Type.TObject<{
      failed: Type.TArray<Type.TObject<{
        queueName: Type.TString;
        count: Type.TInteger;
        oldestFailedAt: Type.TOptional<Type.TInteger>;
      }>>;
    }>>;
    modelPricing: Type.TOptional<Type.TObject<{
      state: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"degraded">, Type.TLiteral<"disabled">]>;
      sources: Type.TArray<Type.TObject<{
        source: Type.TUnion<[Type.TLiteral<"openrouter">, Type.TLiteral<"litellm">, Type.TLiteral<"bootstrap">, Type.TLiteral<"refresh">]>;
        state: Type.TUnion<[Type.TLiteral<"ok">, Type.TLiteral<"degraded">]>;
        lastFailureAt: Type.TOptional<Type.TInteger>;
        detail: Type.TOptional<Type.TString>;
      }>>;
      lastFailureAt: Type.TOptional<Type.TInteger>;
      detail: Type.TOptional<Type.TString>;
    }>>;
    configReload: Type.TOptional<Type.TObject<{
      hotReloadStatus: Type.TUnion<[Type.TLiteral<"active">, Type.TLiteral<"disabled">]>;
    }>>;
    channels: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    channelOrder: Type.TOptional<Type.TArray<Type.TString>>;
    channelLabels: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
    heartbeatSeconds: Type.TOptional<Type.TInteger>;
    defaultAgentId: Type.TOptional<Type.TString>;
    agents: Type.TOptional<Type.TArray<Type.TObject<{
      agentId: Type.TString;
      name: Type.TOptional<Type.TString>;
      isDefault: Type.TBoolean;
      heartbeat: Type.TObject<{
        enabled: Type.TBoolean;
        every: Type.TString;
        everyMs: Type.TUnion<[Type.TInteger, Type.TNull]>;
        prompt: Type.TString;
        target: Type.TString;
        model: Type.TOptional<Type.TString>;
        ackMaxChars: Type.TInteger;
      }>;
      sessions: Type.TObject<{
        path: Type.TString;
        count: Type.TInteger;
        recent: Type.TArray<Type.TObject<{
          key: Type.TString;
          updatedAt: Type.TUnion<[Type.TInteger, Type.TNull]>;
          age: Type.TUnion<[Type.TInteger, Type.TNull]>;
        }>>;
      }>;
    }>>>;
    sessions: Type.TOptional<Type.TObject<{
      path: Type.TString;
      count: Type.TInteger;
      recent: Type.TArray<Type.TObject<{
        key: Type.TString;
        updatedAt: Type.TUnion<[Type.TInteger, Type.TNull]>;
        age: Type.TUnion<[Type.TInteger, Type.TNull]>;
      }>>;
    }>>;
  }>;
  stateVersion: Type.TObject<{
    presence: Type.TInteger;
    health: Type.TInteger;
  }>;
  uptimeMs: Type.TInteger; /** Resolved source-config revision accepted by the active Gateway runtime. */
  appliedConfigHash: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
  configPath: Type.TOptional<Type.TString>;
  stateDir: Type.TOptional<Type.TString>;
  sessionDefaults: Type.TOptional<Type.TObject<{
    defaultAgentId: Type.TString;
    mainKey: Type.TString;
    mainSessionKey: Type.TString;
    scope: Type.TOptional<Type.TString>;
  }>>;
  authMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"none">, Type.TLiteral<"token">, Type.TLiteral<"password">, Type.TLiteral<"trusted-proxy">]>>;
  updateAvailable: Type.TOptional<Type.TObject<{
    currentVersion: Type.TString;
    latestVersion: Type.TString;
    channel: Type.TString;
  }>>;
}>;
type Snapshot = Static<typeof SnapshotSchema>;
type PresenceEntry = Static<typeof PresenceEntrySchema>;
type StateVersion = Static<typeof StateVersionSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/system-info.d.ts
/** Empty request payload for Gateway host system information. */
declare const SystemInfoParamsSchema: Type.TObject<{}>;
/** Gateway host identity and resource snapshot. */
declare const SystemInfoResultSchema: Type.TObject<{
  machineName: Type.TString;
  hostname: Type.TString;
  platform: Type.TString;
  release: Type.TString;
  arch: Type.TString;
  osLabel: Type.TString;
  lanAddress: Type.TOptional<Type.TString>;
  port: Type.TOptional<Type.TInteger>;
  nodeVersion: Type.TString;
  pid: Type.TInteger; /** Process-start identity for invalidating work that cannot survive a Gateway restart. */
  processInstanceId: Type.TOptional<Type.TString>;
  uptimeMs: Type.TInteger;
  cpuCount: Type.TInteger;
  cpuModel: Type.TOptional<Type.TString>;
  loadAverage: Type.TOptional<Type.TTuple<[Type.TNumber, Type.TNumber, Type.TNumber]>>;
  memoryTotalBytes: Type.TInteger;
  memoryFreeBytes: Type.TInteger;
  diskTotalBytes: Type.TOptional<Type.TInteger>;
  diskAvailableBytes: Type.TOptional<Type.TInteger>;
  diskPath: Type.TOptional<Type.TString>; /** Resolved utility model for the configured default agent. */
  defaultAgentUtilityModel: Type.TOptional<Type.TUnion<[Type.TObject<{
    status: Type.TLiteral<"auto">;
    model: Type.TString;
  }>, Type.TObject<{
    status: Type.TLiteral<"configured">;
    model: Type.TString;
  }>, Type.TObject<{
    status: Type.TLiteral<"disabled">;
  }>, Type.TObject<{
    status: Type.TLiteral<"unavailable">;
  }>]>>;
}>;
type SystemInfoParams = Static<typeof SystemInfoParamsSchema>;
type SystemInfoResult = Static<typeof SystemInfoResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/system-event.d.ts
/** Backward-compatible system-presence marker for removing retained input recency. */
declare const SYSTEM_PRESENCE_CLEAR_LAST_INPUT_TAG = "system-presence-clear-last-input";
/** Non-sensitive overwrite for Gateways that accept tags but do not interpret the clear marker. */
declare const SYSTEM_PRESENCE_LEGACY_CLEAR_LAST_INPUT_SECONDS = 2592000;
declare const validateSystemEventParams: ProtocolValidator<{
  reason?: string | undefined;
  version?: string | undefined;
  platform?: string | undefined;
  deviceFamily?: string | undefined;
  modelIdentifier?: string | undefined;
  mode?: string | undefined;
  instanceId?: string | undefined;
  scopes?: string[] | undefined;
  host?: string | undefined;
  ip?: string | undefined;
  lastInputSeconds?: number | undefined;
  tags?: string[] | undefined;
  deviceId?: string | undefined;
  roles?: string[] | undefined;
  sessionKey?: string | undefined;
  idempotencyKey?: string | undefined;
  wake?: boolean | undefined;
  text: string;
}>;
//#endregion
//#region packages/gateway-protocol/src/schema/task-suggestions.d.ts
/** One model-proposed follow-up task waiting for operator action. */
declare const TaskSuggestionSchema: Type.TObject<{
  id: Type.TString;
  title: Type.TString;
  prompt: Type.TString;
  tldr: Type.TString;
  cwd: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
  createdAt: Type.TInteger;
}>;
/** Lists pending suggestions, optionally narrowed to one source session. */
declare const TaskSuggestionsListParamsSchema: Type.TObject<{
  sessionKey: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const TaskSuggestionsListResultSchema: Type.TObject<{
  suggestions: Type.TArray<Type.TObject<{
    id: Type.TString;
    title: Type.TString;
    prompt: Type.TString;
    tldr: Type.TString;
    cwd: Type.TString;
    sessionKey: Type.TString;
    agentId: Type.TOptional<Type.TString>;
    createdAt: Type.TInteger;
  }>>;
}>;
/** Creates a pending suggestion without starting any work. */
declare const TaskSuggestionsCreateParamsSchema: Type.TObject<{
  title: Type.TString;
  prompt: Type.TString;
  tldr: Type.TString;
  cwd: Type.TString;
  sessionKey: Type.TString;
  agentId: Type.TOptional<Type.TString>;
}>;
declare const TaskSuggestionsCreateResultSchema: Type.TObject<{
  taskId: Type.TString;
  suggestion: Type.TObject<{
    id: Type.TString;
    title: Type.TString;
    prompt: Type.TString;
    tldr: Type.TString;
    cwd: Type.TString;
    sessionKey: Type.TString;
    agentId: Type.TOptional<Type.TString>;
    createdAt: Type.TInteger;
  }>;
}>;
declare const TaskSuggestionResolutionSchema: Type.TUnion<[Type.TLiteral<"dismissed">, Type.TLiteral<"accepted">, Type.TLiteral<"expired">]>;
/** Atomically claims a pending suggestion and starts its server-owned worktree session. */
declare const TaskSuggestionsAcceptParamsSchema: Type.TObject<{
  taskId: Type.TString;
}>;
declare const TaskSuggestionsAcceptResultSchema: Type.TObject<{
  taskId: Type.TString;
  key: Type.TString;
}>;
/** Removes a pending suggestion without starting work. */
declare const TaskSuggestionsDismissParamsSchema: Type.TObject<{
  taskId: Type.TString;
  reason: Type.TOptional<Type.TString>;
}>;
declare const TaskSuggestionsDismissResultSchema: Type.TObject<{
  taskId: Type.TString;
  dismissed: Type.TBoolean;
}>;
/** Live update emitted when a pending suggestion is created or resolved. */
declare const TaskSuggestionEventSchema: Type.TUnion<[Type.TObject<{
  action: Type.TLiteral<"created">;
  suggestion: Type.TObject<{
    id: Type.TString;
    title: Type.TString;
    prompt: Type.TString;
    tldr: Type.TString;
    cwd: Type.TString;
    sessionKey: Type.TString;
    agentId: Type.TOptional<Type.TString>;
    createdAt: Type.TInteger;
  }>;
}>, Type.TObject<{
  action: Type.TLiteral<"resolved">;
  taskId: Type.TString;
  resolution: Type.TUnion<[Type.TLiteral<"dismissed">, Type.TLiteral<"accepted">, Type.TLiteral<"expired">]>;
}>]>;
type TaskSuggestion = Static<typeof TaskSuggestionSchema>;
type TaskSuggestionEvent = Static<typeof TaskSuggestionEventSchema>;
type TaskSuggestionResolution = Static<typeof TaskSuggestionResolutionSchema>;
type TaskSuggestionsAcceptParams = Static<typeof TaskSuggestionsAcceptParamsSchema>;
type TaskSuggestionsAcceptResult = Static<typeof TaskSuggestionsAcceptResultSchema>;
type TaskSuggestionsCreateParams = Static<typeof TaskSuggestionsCreateParamsSchema>;
type TaskSuggestionsCreateResult = Static<typeof TaskSuggestionsCreateResultSchema>;
type TaskSuggestionsDismissParams = Static<typeof TaskSuggestionsDismissParamsSchema>;
type TaskSuggestionsDismissResult = Static<typeof TaskSuggestionsDismissResultSchema>;
type TaskSuggestionsListParams = Static<typeof TaskSuggestionsListParamsSchema>;
type TaskSuggestionsListResult = Static<typeof TaskSuggestionsListResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/tasks.d.ts
/** Public task summary returned by task list/get/cancel responses. */
declare const TaskSummarySchema: Type.TObject<{
  id: Type.TString;
  kind: Type.TOptional<Type.TString>;
  runtime: Type.TOptional<Type.TString>;
  status: Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"completed">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">]>;
  title: Type.TOptional<Type.TString>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  childSessionKey: Type.TOptional<Type.TString>;
  ownerKey: Type.TOptional<Type.TString>;
  runId: Type.TOptional<Type.TString>;
  taskId: Type.TOptional<Type.TString>;
  flowId: Type.TOptional<Type.TString>;
  parentTaskId: Type.TOptional<Type.TString>;
  sourceId: Type.TOptional<Type.TString>;
  createdAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
  updatedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
  startedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
  endedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
  toolUseCount: Type.TOptional<Type.TInteger>;
  lastToolName: Type.TOptional<Type.TString>;
  progressSummary: Type.TOptional<Type.TString>;
  terminalSummary: Type.TOptional<Type.TString>;
  error: Type.TOptional<Type.TString>;
  deliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"delivered">, Type.TLiteral<"session_queued">, Type.TLiteral<"failed">, Type.TLiteral<"dismissed">, Type.TLiteral<"parent_missing">, Type.TLiteral<"not_applicable">]>>;
  terminalOutcome: Type.TOptional<Type.TUnion<[Type.TLiteral<"succeeded">, Type.TLiteral<"blocked">]>>; /** Bounded canonical completion result. Returned only by tasks.get. */
  result: Type.TOptional<Type.TString>; /** Bounded task input. Returned by tasks.get; omitted from list/event summaries. */
  prompt: Type.TOptional<Type.TString>;
}>;
/** Task list filters with bounded pagination. */
declare const TasksListParamsSchema: Type.TObject<{
  status: Type.TOptional<Type.TUnion<[Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"completed">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">]>, Type.TArray<Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"completed">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">]>>]>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  limit: Type.TOptional<Type.TInteger>;
  cursor: Type.TOptional<Type.TString>;
}>;
/** Task list page response. */
declare const TasksListResultSchema: Type.TObject<{
  tasks: Type.TArray<Type.TObject<{
    id: Type.TString;
    kind: Type.TOptional<Type.TString>;
    runtime: Type.TOptional<Type.TString>;
    status: Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"completed">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">]>;
    title: Type.TOptional<Type.TString>;
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    childSessionKey: Type.TOptional<Type.TString>;
    ownerKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    taskId: Type.TOptional<Type.TString>;
    flowId: Type.TOptional<Type.TString>;
    parentTaskId: Type.TOptional<Type.TString>;
    sourceId: Type.TOptional<Type.TString>;
    createdAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    updatedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    startedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    endedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    toolUseCount: Type.TOptional<Type.TInteger>;
    lastToolName: Type.TOptional<Type.TString>;
    progressSummary: Type.TOptional<Type.TString>;
    terminalSummary: Type.TOptional<Type.TString>;
    error: Type.TOptional<Type.TString>;
    deliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"delivered">, Type.TLiteral<"session_queued">, Type.TLiteral<"failed">, Type.TLiteral<"dismissed">, Type.TLiteral<"parent_missing">, Type.TLiteral<"not_applicable">]>>;
    terminalOutcome: Type.TOptional<Type.TUnion<[Type.TLiteral<"succeeded">, Type.TLiteral<"blocked">]>>; /** Bounded canonical completion result. Returned only by tasks.get. */
    result: Type.TOptional<Type.TString>; /** Bounded task input. Returned by tasks.get; omitted from list/event summaries. */
    prompt: Type.TOptional<Type.TString>;
  }>>;
  nextCursor: Type.TOptional<Type.TString>;
}>;
/** Lookup request for one task id. */
declare const TasksGetParamsSchema: Type.TObject<{
  taskId: Type.TString;
}>;
/** Lookup result for one task summary. */
declare const TasksGetResultSchema: Type.TObject<{
  task: Type.TObject<{
    id: Type.TString;
    kind: Type.TOptional<Type.TString>;
    runtime: Type.TOptional<Type.TString>;
    status: Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"completed">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">]>;
    title: Type.TOptional<Type.TString>;
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    childSessionKey: Type.TOptional<Type.TString>;
    ownerKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    taskId: Type.TOptional<Type.TString>;
    flowId: Type.TOptional<Type.TString>;
    parentTaskId: Type.TOptional<Type.TString>;
    sourceId: Type.TOptional<Type.TString>;
    createdAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    updatedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    startedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    endedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    toolUseCount: Type.TOptional<Type.TInteger>;
    lastToolName: Type.TOptional<Type.TString>;
    progressSummary: Type.TOptional<Type.TString>;
    terminalSummary: Type.TOptional<Type.TString>;
    error: Type.TOptional<Type.TString>;
    deliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"delivered">, Type.TLiteral<"session_queued">, Type.TLiteral<"failed">, Type.TLiteral<"dismissed">, Type.TLiteral<"parent_missing">, Type.TLiteral<"not_applicable">]>>;
    terminalOutcome: Type.TOptional<Type.TUnion<[Type.TLiteral<"succeeded">, Type.TLiteral<"blocked">]>>; /** Bounded canonical completion result. Returned only by tasks.get. */
    result: Type.TOptional<Type.TString>; /** Bounded task input. Returned by tasks.get; omitted from list/event summaries. */
    prompt: Type.TOptional<Type.TString>;
  }>;
}>;
/** Cancel request for one task id with optional operator reason. */
declare const TasksCancelParamsSchema: Type.TObject<{
  taskId: Type.TString;
  reason: Type.TOptional<Type.TString>;
}>;
/** Cancel result, including the task snapshot when it was found. */
declare const TasksCancelResultSchema: Type.TObject<{
  found: Type.TBoolean;
  cancelled: Type.TBoolean;
  reason: Type.TOptional<Type.TString>;
  task: Type.TOptional<Type.TObject<{
    id: Type.TString;
    kind: Type.TOptional<Type.TString>;
    runtime: Type.TOptional<Type.TString>;
    status: Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"completed">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">]>;
    title: Type.TOptional<Type.TString>;
    agentId: Type.TOptional<Type.TString>;
    sessionKey: Type.TOptional<Type.TString>;
    childSessionKey: Type.TOptional<Type.TString>;
    ownerKey: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    taskId: Type.TOptional<Type.TString>;
    flowId: Type.TOptional<Type.TString>;
    parentTaskId: Type.TOptional<Type.TString>;
    sourceId: Type.TOptional<Type.TString>;
    createdAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    updatedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    startedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    endedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
    toolUseCount: Type.TOptional<Type.TInteger>;
    lastToolName: Type.TOptional<Type.TString>;
    progressSummary: Type.TOptional<Type.TString>;
    terminalSummary: Type.TOptional<Type.TString>;
    error: Type.TOptional<Type.TString>;
    deliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"delivered">, Type.TLiteral<"session_queued">, Type.TLiteral<"failed">, Type.TLiteral<"dismissed">, Type.TLiteral<"parent_missing">, Type.TLiteral<"not_applicable">]>>;
    terminalOutcome: Type.TOptional<Type.TUnion<[Type.TLiteral<"succeeded">, Type.TLiteral<"blocked">]>>; /** Bounded canonical completion result. Returned only by tasks.get. */
    result: Type.TOptional<Type.TString>; /** Bounded task input. Returned by tasks.get; omitted from list/event summaries. */
    prompt: Type.TOptional<Type.TString>;
  }>>;
}>;
declare const TasksRecoveryParamsSchema: Type.TObject<{
  taskIds: Type.TArray<Type.TString>;
}>;
declare const TasksRecoveryResultSchema: Type.TObject<{
  results: Type.TArray<Type.TObject<{
    taskId: Type.TString;
    ok: Type.TBoolean;
    reason: Type.TOptional<Type.TString>;
    duplicateRisk: Type.TOptional<Type.TBoolean>;
    task: Type.TOptional<Type.TObject<{
      id: Type.TString;
      kind: Type.TOptional<Type.TString>;
      runtime: Type.TOptional<Type.TString>;
      status: Type.TUnion<[Type.TLiteral<"queued">, Type.TLiteral<"running">, Type.TLiteral<"completed">, Type.TLiteral<"failed">, Type.TLiteral<"cancelled">, Type.TLiteral<"timed_out">]>;
      title: Type.TOptional<Type.TString>;
      agentId: Type.TOptional<Type.TString>;
      sessionKey: Type.TOptional<Type.TString>;
      childSessionKey: Type.TOptional<Type.TString>;
      ownerKey: Type.TOptional<Type.TString>;
      runId: Type.TOptional<Type.TString>;
      taskId: Type.TOptional<Type.TString>;
      flowId: Type.TOptional<Type.TString>;
      parentTaskId: Type.TOptional<Type.TString>;
      sourceId: Type.TOptional<Type.TString>;
      createdAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
      updatedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
      startedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
      endedAt: Type.TOptional<Type.TUnion<[Type.TString, Type.TInteger]>>;
      toolUseCount: Type.TOptional<Type.TInteger>;
      lastToolName: Type.TOptional<Type.TString>;
      progressSummary: Type.TOptional<Type.TString>;
      terminalSummary: Type.TOptional<Type.TString>;
      error: Type.TOptional<Type.TString>;
      deliveryStatus: Type.TOptional<Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"delivered">, Type.TLiteral<"session_queued">, Type.TLiteral<"failed">, Type.TLiteral<"dismissed">, Type.TLiteral<"parent_missing">, Type.TLiteral<"not_applicable">]>>;
      terminalOutcome: Type.TOptional<Type.TUnion<[Type.TLiteral<"succeeded">, Type.TLiteral<"blocked">]>>; /** Bounded canonical completion result. Returned only by tasks.get. */
      result: Type.TOptional<Type.TString>; /** Bounded task input. Returned by tasks.get; omitted from list/event summaries. */
      prompt: Type.TOptional<Type.TString>;
    }>>;
  }>>;
}>;
type TaskSummary = Static<typeof TaskSummarySchema>;
type TasksListParams = Static<typeof TasksListParamsSchema>;
type TasksListResult = Static<typeof TasksListResultSchema>;
type TasksGetParams = Static<typeof TasksGetParamsSchema>;
type TasksGetResult = Static<typeof TasksGetResultSchema>;
type TasksCancelParams = Static<typeof TasksCancelParamsSchema>;
type TasksCancelResult = Static<typeof TasksCancelResultSchema>;
type TasksRecoveryParams = Static<typeof TasksRecoveryParamsSchema>;
type TasksRecoveryResult = Static<typeof TasksRecoveryResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/terminal.d.ts
/** Opens a shell session; the server picks the shell, cwd, and confinement. */
declare const TerminalOpenParamsSchema: Type.TObject<{
  agentId: Type.TOptional<Type.TString>;
  catalog: Type.TOptional<Type.TObject<{
    catalogId: Type.TString;
    hostId: Type.TString;
    threadId: Type.TString;
  }>>;
  cols: Type.TInteger;
  rows: Type.TInteger;
}>;
type TerminalOpenParams = Static<typeof TerminalOpenParamsSchema>;
/** Result of a successful open; carries the facts the UI header renders. */
declare const TerminalOpenResultSchema: Type.TObject<{
  sessionId: Type.TString;
  agentId: Type.TString;
  shell: Type.TString;
  cwd: Type.TString;
  confined: Type.TBoolean;
  title: Type.TOptional<Type.TString>;
}>;
type TerminalOpenResult = Static<typeof TerminalOpenResultSchema>;
/** Writes client keystrokes to the session stdin. */
declare const TerminalInputParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  data: Type.TString;
}>;
type TerminalInputParams = Static<typeof TerminalInputParamsSchema>;
/** Stages one file on the host bound to an existing terminal session. */
declare const TerminalUploadParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  name: Type.TString;
  contentBase64: Type.TString;
}>;
type TerminalUploadParams = Static<typeof TerminalUploadParamsSchema>;
/** Absolute temporary path pasted into the active terminal after upload. */
declare const TerminalUploadResultSchema: Type.TObject<{
  path: Type.TString;
  size: Type.TInteger;
}>;
type TerminalUploadResult = Static<typeof TerminalUploadResultSchema>;
/** Resizes the PTY grid after the client viewport changes. */
declare const TerminalResizeParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  cols: Type.TInteger;
  rows: Type.TInteger;
}>;
type TerminalResizeParams = Static<typeof TerminalResizeParamsSchema>;
/** Closes a session and kills its process tree. */
declare const TerminalCloseParamsSchema: Type.TObject<{
  sessionId: Type.TString;
}>;
type TerminalCloseParams = Static<typeof TerminalCloseParamsSchema>;
/**
 * Attaches the calling admin connection. Connection-owned sessions use
 * take-over; agent-owned sessions retain ownership and add a shared viewer.
 */
declare const TerminalAttachParamsSchema: Type.TObject<{
  sessionId: Type.TString;
}>;
type TerminalAttachParams = Static<typeof TerminalAttachParamsSchema>;
/** Result of a successful attach; mirrors open plus the replay buffer. */
declare const TerminalAttachResultSchema: Type.TObject<{
  sessionId: Type.TString;
  agentId: Type.TString;
  shell: Type.TString;
  cwd: Type.TString;
  confined: Type.TBoolean;
  buffer: Type.TString;
  seq: Type.TOptional<Type.TInteger>;
}>;
type TerminalAttachResult = Static<typeof TerminalAttachResultSchema>;
/** One attachable session, as reported by terminal.list. */
declare const TerminalSessionInfoSchema: Type.TObject<{
  sessionId: Type.TString;
  agentId: Type.TString;
  shell: Type.TString;
  cwd: Type.TString;
  confined: Type.TBoolean; /** False while the session is detached (no connection owns its stream). */
  attached: Type.TBoolean; /** Connection-owned session, or the trusted agent session key that owns it. */
  owner: Type.TOptional<Type.TUnion<[Type.TLiteral<"conn">, Type.TString]>>;
  createdAtMs: Type.TInteger;
}>;
type TerminalSessionInfo = Static<typeof TerminalSessionInfoSchema>;
/**
 * Sessions a reconnecting admin client can attach. All admin connections see
 * the same list: the terminal surface is already operator.admin (full host
 * access), so cross-connection visibility adds no privilege.
 */
declare const TerminalListResultSchema: Type.TObject<{
  sessions: Type.TArray<Type.TObject<{
    sessionId: Type.TString;
    agentId: Type.TString;
    shell: Type.TString;
    cwd: Type.TString;
    confined: Type.TBoolean; /** False while the session is detached (no connection owns its stream). */
    attached: Type.TBoolean; /** Connection-owned session, or the trusted agent session key that owns it. */
    owner: Type.TOptional<Type.TUnion<[Type.TLiteral<"conn">, Type.TString]>>;
    createdAtMs: Type.TInteger;
  }>>;
}>;
type TerminalListResult = Static<typeof TerminalListResultSchema>;
/** Reads the current output buffer as plain text without attaching. */
declare const TerminalTextParamsSchema: Type.TObject<{
  sessionId: Type.TString;
}>;
type TerminalTextParams = Static<typeof TerminalTextParamsSchema>;
/** Plain-text buffer contents (ANSI stripped); an agent/LLM affordance. */
declare const TerminalTextResultSchema: Type.TObject<{
  text: Type.TString;
}>;
type TerminalTextResult = Static<typeof TerminalTextResultSchema>;
/** Shared ok/void result for input, resize, and close. */
declare const TerminalAckResultSchema: Type.TObject<{
  ok: Type.TBoolean;
}>;
type TerminalAckResult = Static<typeof TerminalAckResultSchema>;
/** Streamed output chunk; seq is its cumulative UTF-16 end offset within the session. */
declare const TerminalDataEventSchema: Type.TObject<{
  sessionId: Type.TString;
  seq: Type.TInteger;
  data: Type.TString;
}>;
type TerminalDataEvent = Static<typeof TerminalDataEventSchema>;
/** Terminal end-of-life notice; the session id is invalid after this event. */
declare const TerminalExitEventSchema: Type.TObject<{
  sessionId: Type.TString;
  exitCode: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
  signal: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
  reason: Type.TOptional<Type.TUnion<[Type.TLiteral<"process_exit">, Type.TLiteral<"closed">, Type.TLiteral<"disconnected">, Type.TLiteral<"detached">, Type.TLiteral<"error">]>>;
  error: Type.TOptional<Type.TString>;
}>;
type TerminalExitEvent = Static<typeof TerminalExitEventSchema>;
/** Union of every event a terminal session can emit. */
declare const TerminalEventSchema: Type.TUnion<[Type.TObject<{
  sessionId: Type.TString;
  seq: Type.TInteger;
  data: Type.TString;
}>, Type.TObject<{
  sessionId: Type.TString;
  exitCode: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
  signal: Type.TOptional<Type.TUnion<[Type.TInteger, Type.TNull]>>;
  reason: Type.TOptional<Type.TUnion<[Type.TLiteral<"process_exit">, Type.TLiteral<"closed">, Type.TLiteral<"disconnected">, Type.TLiteral<"detached">, Type.TLiteral<"error">]>>;
  error: Type.TOptional<Type.TString>;
}>]>;
type TerminalEvent = Static<typeof TerminalEventSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/plugin-approvals.d.ts
/** Approval request raised by a plugin before a sensitive tool action proceeds. */
declare const PluginApprovalRequestParamsSchema: Type.TObject<{
  pluginId: Type.TOptional<Type.TString>;
  title: Type.TString;
  description: Type.TString;
  detail: Type.TOptional<Type.TString>;
  severity: Type.TOptional<Type.TString>;
  toolName: Type.TOptional<Type.TString>;
  toolCallId: Type.TOptional<Type.TString>;
  allowedDecisions: Type.TOptional<Type.TArray<Type.TString>>;
  agentId: Type.TOptional<Type.TString>;
  sessionKey: Type.TOptional<Type.TString>;
  approvalReviewerDeviceIds: Type.TOptional<Type.TArray<Type.TString>>;
  turnSourceChannel: Type.TOptional<Type.TString>;
  turnSourceTo: Type.TOptional<Type.TString>;
  turnSourceAccountId: Type.TOptional<Type.TString>;
  turnSourceThreadId: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
  timeoutMs: Type.TOptional<Type.TInteger>;
  twoPhase: Type.TOptional<Type.TBoolean>;
}>;
/** Reviewer decision payload resolving one pending plugin approval request. */
declare const PluginApprovalResolveParamsSchema: Type.TObject<{
  id: Type.TString;
  decision: Type.TString;
}>;
type PluginApprovalRequestParams = Static<typeof PluginApprovalRequestParamsSchema>;
type PluginApprovalResolveParams = Static<typeof PluginApprovalResolveParamsSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/plugins.d.ts
/**
 * Plugin control-surface protocol schemas.
 *
 * These payloads let the gateway expose plugin-provided UI actions without
 * baking plugin-specific payload shapes into the core protocol.
 */
/** Arbitrary plugin-owned JSON payload carried opaquely through the gateway. */
declare const PluginJsonValueSchema: Type.TUnknown;
/** Descriptor for one plugin-provided control UI action or surface. */
declare const PluginControlUiDescriptorSchema: Type.TObject<{
  id: Type.TString;
  pluginId: Type.TString;
  pluginName: Type.TOptional<Type.TString>;
  surface: Type.TUnion<[Type.TLiteral<"session">, Type.TLiteral<"tool">, Type.TLiteral<"run">, Type.TLiteral<"settings">, Type.TLiteral<"tab">, Type.TLiteral<"widget">]>;
  label: Type.TString;
  description: Type.TOptional<Type.TString>;
  placement: Type.TOptional<Type.TString>;
  schema: Type.TOptional<Type.TUnknown>;
  requiredScopes: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Empty request payload for listing plugin UI descriptors. */
declare const PluginsUiDescriptorsParamsSchema: Type.TObject<{}>;
/** Response payload containing all plugin UI descriptors visible to the client. */
declare const PluginsUiDescriptorsResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  descriptors: Type.TArray<Type.TObject<{
    id: Type.TString;
    pluginId: Type.TString;
    pluginName: Type.TOptional<Type.TString>;
    surface: Type.TUnion<[Type.TLiteral<"session">, Type.TLiteral<"tool">, Type.TLiteral<"run">, Type.TLiteral<"settings">, Type.TLiteral<"tab">, Type.TLiteral<"widget">]>;
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
    placement: Type.TOptional<Type.TString>;
    schema: Type.TOptional<Type.TUnknown>;
    requiredScopes: Type.TOptional<Type.TArray<Type.TString>>;
  }>>;
}>;
/** Request payload for invoking one plugin-owned session action. */
declare const PluginsSessionActionParamsSchema: Type.TObject<{
  pluginId: Type.TString;
  actionId: Type.TString;
  sessionKey: Type.TOptional<Type.TString>;
  payload: Type.TOptional<Type.TUnknown>;
}>;
/** Successful plugin action result, optionally continuing the agent turn. */
declare const PluginsSessionActionSuccessResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  result: Type.TOptional<Type.TUnknown>;
  continueAgent: Type.TOptional<Type.TBoolean>;
  reply: Type.TOptional<Type.TUnknown>;
}>;
/** Failed plugin action result with plugin-owned detail payload. */
declare const PluginsSessionActionFailureResultSchema: Type.TObject<{
  ok: Type.TLiteral<false>;
  error: Type.TString;
  code: Type.TOptional<Type.TString>;
  details: Type.TOptional<Type.TUnknown>;
}>;
/** Discriminated plugin action result returned to gateway clients. */
declare const PluginsSessionActionResultSchema: Type.TUnion<[Type.TObject<{
  ok: Type.TLiteral<true>;
  result: Type.TOptional<Type.TUnknown>;
  continueAgent: Type.TOptional<Type.TBoolean>;
  reply: Type.TOptional<Type.TUnknown>;
}>, Type.TObject<{
  ok: Type.TLiteral<false>;
  error: Type.TString;
  code: Type.TOptional<Type.TString>;
  details: Type.TOptional<Type.TUnknown>;
}>]>;
/** ClawHub-backed install action for one catalog entry. */
declare const PluginCatalogClawHubInstallSchema: Type.TObject<{
  source: Type.TLiteral<"clawhub">;
  packageName: Type.TString;
}>;
/** Official-catalog install action for one catalog entry. */
declare const PluginCatalogOfficialInstallSchema: Type.TObject<{
  source: Type.TLiteral<"official">;
  pluginId: Type.TString;
}>;
declare const PluginCatalogInstallActionSchema: Type.TUnion<[Type.TObject<{
  source: Type.TLiteral<"clawhub">;
  packageName: Type.TString;
}>, Type.TObject<{
  source: Type.TLiteral<"official">;
  pluginId: Type.TString;
}>]>;
/** Cold control-plane representation of an installed or available plugin. */
declare const PluginCatalogEntrySchema: Type.TObject<{
  id: Type.TString;
  name: Type.TString;
  packageName: Type.TOptional<Type.TString>;
  description: Type.TOptional<Type.TString>;
  version: Type.TOptional<Type.TString>;
  kind: Type.TOptional<Type.TArray<Type.TString>>;
  origin: Type.TOptional<Type.TString>;
  installed: Type.TBoolean;
  enabled: Type.TBoolean;
  state: Type.TUnion<[Type.TLiteral<"enabled">, Type.TLiteral<"disabled">, Type.TLiteral<"not-installed">, Type.TLiteral<"error">]>;
  featured: Type.TOptional<Type.TBoolean>;
  featuredAt: Type.TOptional<Type.TInteger>;
  order: Type.TOptional<Type.TNumber>; /** True when the gateway can resolve a manifest or catalog icon for this plugin identity. */
  hasIcon: Type.TOptional<Type.TBoolean>;
  install: Type.TOptional<Type.TUnion<[Type.TObject<{
    source: Type.TLiteral<"clawhub">;
    packageName: Type.TString;
  }>, Type.TObject<{
    source: Type.TLiteral<"official">;
    pluginId: Type.TString;
  }>]>>;
  error: Type.TOptional<Type.TString>; /** Coarse manifest-derived grouping (channel, provider, memory, ...) for catalog UIs. */
  category: Type.TOptional<Type.TString>; /** True when the plugin has an install record and can be removed via plugins.uninstall. */
  removable: Type.TOptional<Type.TBoolean>;
}>;
/** Empty request payload for the cold plugin catalog. */
declare const PluginsListParamsSchema: Type.TObject<{}>;
/** Installed and curated plugin catalog visible to the current gateway client. */
declare const PluginsListResultSchema: Type.TObject<{
  plugins: Type.TArray<Type.TObject<{
    id: Type.TString;
    name: Type.TString;
    packageName: Type.TOptional<Type.TString>;
    description: Type.TOptional<Type.TString>;
    version: Type.TOptional<Type.TString>;
    kind: Type.TOptional<Type.TArray<Type.TString>>;
    origin: Type.TOptional<Type.TString>;
    installed: Type.TBoolean;
    enabled: Type.TBoolean;
    state: Type.TUnion<[Type.TLiteral<"enabled">, Type.TLiteral<"disabled">, Type.TLiteral<"not-installed">, Type.TLiteral<"error">]>;
    featured: Type.TOptional<Type.TBoolean>;
    featuredAt: Type.TOptional<Type.TInteger>;
    order: Type.TOptional<Type.TNumber>; /** True when the gateway can resolve a manifest or catalog icon for this plugin identity. */
    hasIcon: Type.TOptional<Type.TBoolean>;
    install: Type.TOptional<Type.TUnion<[Type.TObject<{
      source: Type.TLiteral<"clawhub">;
      packageName: Type.TString;
    }>, Type.TObject<{
      source: Type.TLiteral<"official">;
      pluginId: Type.TString;
    }>]>>;
    error: Type.TOptional<Type.TString>; /** Coarse manifest-derived grouping (channel, provider, memory, ...) for catalog UIs. */
    category: Type.TOptional<Type.TString>; /** True when the plugin has an install record and can be removed via plugins.uninstall. */
    removable: Type.TOptional<Type.TBoolean>;
  }>>;
  diagnostics: Type.TArray<Type.TUnknown>;
  mutationAllowed: Type.TBoolean;
}>;
/** Request payload for searching installable ClawHub plugin families. */
declare const PluginsSearchParamsSchema: Type.TObject<{
  query: Type.TString;
  limit: Type.TOptional<Type.TInteger>;
}>;
/** ClawHub package fields exposed by plugin search. */
declare const PluginSearchPackageSchema: Type.TObject<{
  name: Type.TString;
  displayName: Type.TString;
  family: Type.TUnion<[Type.TLiteral<"code-plugin">, Type.TLiteral<"bundle-plugin">]>;
  channel: Type.TUnion<[Type.TLiteral<"official">, Type.TLiteral<"community">, Type.TLiteral<"private">]>;
  isOfficial: Type.TBoolean;
  summary: Type.TOptional<Type.TString>;
  latestVersion: Type.TOptional<Type.TString>;
  runtimeId: Type.TOptional<Type.TString>;
  downloads: Type.TOptional<Type.TNumber>;
  verificationTier: Type.TOptional<Type.TString>;
}>;
/** Ranked ClawHub plugin search hit. */
declare const PluginSearchResultEntrySchema: Type.TObject<{
  score: Type.TNumber;
  package: Type.TObject<{
    name: Type.TString;
    displayName: Type.TString;
    family: Type.TUnion<[Type.TLiteral<"code-plugin">, Type.TLiteral<"bundle-plugin">]>;
    channel: Type.TUnion<[Type.TLiteral<"official">, Type.TLiteral<"community">, Type.TLiteral<"private">]>;
    isOfficial: Type.TBoolean;
    summary: Type.TOptional<Type.TString>;
    latestVersion: Type.TOptional<Type.TString>;
    runtimeId: Type.TOptional<Type.TString>;
    downloads: Type.TOptional<Type.TNumber>;
    verificationTier: Type.TOptional<Type.TString>;
  }>;
}>;
/** Ranked installable plugin packages matching the query. */
declare const PluginsSearchResultSchema: Type.TObject<{
  results: Type.TArray<Type.TObject<{
    score: Type.TNumber;
    package: Type.TObject<{
      name: Type.TString;
      displayName: Type.TString;
      family: Type.TUnion<[Type.TLiteral<"code-plugin">, Type.TLiteral<"bundle-plugin">]>;
      channel: Type.TUnion<[Type.TLiteral<"official">, Type.TLiteral<"community">, Type.TLiteral<"private">]>;
      isOfficial: Type.TBoolean;
      summary: Type.TOptional<Type.TString>;
      latestVersion: Type.TOptional<Type.TString>;
      runtimeId: Type.TOptional<Type.TString>;
      downloads: Type.TOptional<Type.TNumber>;
      verificationTier: Type.TOptional<Type.TString>;
    }>;
  }>>;
}>;
/** Trusted official-catalog or acknowledged ClawHub install request. */
declare const PluginsInstallParamsSchema: Type.TUnion<[Type.TObject<{
  source: Type.TLiteral<"clawhub">;
  packageName: Type.TString;
  version: Type.TOptional<Type.TString>;
  acknowledgeClawHubRisk: Type.TOptional<Type.TBoolean>;
}>, Type.TObject<{
  source: Type.TLiteral<"official">;
  pluginId: Type.TString;
}>]>;
/** Successful plugin installation result. */
declare const PluginsInstallResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  plugin: Type.TObject<{
    id: Type.TString;
    name: Type.TString;
    packageName: Type.TOptional<Type.TString>;
    description: Type.TOptional<Type.TString>;
    version: Type.TOptional<Type.TString>;
    kind: Type.TOptional<Type.TArray<Type.TString>>;
    origin: Type.TOptional<Type.TString>;
    installed: Type.TBoolean;
    enabled: Type.TBoolean;
    state: Type.TUnion<[Type.TLiteral<"enabled">, Type.TLiteral<"disabled">, Type.TLiteral<"not-installed">, Type.TLiteral<"error">]>;
    featured: Type.TOptional<Type.TBoolean>;
    featuredAt: Type.TOptional<Type.TInteger>;
    order: Type.TOptional<Type.TNumber>; /** True when the gateway can resolve a manifest or catalog icon for this plugin identity. */
    hasIcon: Type.TOptional<Type.TBoolean>;
    install: Type.TOptional<Type.TUnion<[Type.TObject<{
      source: Type.TLiteral<"clawhub">;
      packageName: Type.TString;
    }>, Type.TObject<{
      source: Type.TLiteral<"official">;
      pluginId: Type.TString;
    }>]>>;
    error: Type.TOptional<Type.TString>; /** Coarse manifest-derived grouping (channel, provider, memory, ...) for catalog UIs. */
    category: Type.TOptional<Type.TString>; /** True when the plugin has an install record and can be removed via plugins.uninstall. */
    removable: Type.TOptional<Type.TBoolean>;
  }>;
  restartRequired: Type.TLiteral<true>;
  warnings: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Internal signal that persisted plugin metadata changed outside the Gateway process. */
declare const PluginsRefreshParamsSchema: Type.TObject<{}>;
/** Successful plugin metadata refresh admission. */
declare const PluginsRefreshResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
}>;
/** Request payload for removing one installed plugin and its managed files. */
declare const PluginsUninstallParamsSchema: Type.TObject<{
  pluginId: Type.TString;
}>;
/** Successful plugin removal result listing the cleanup actions that ran. */
declare const PluginsUninstallResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  pluginId: Type.TString;
  restartRequired: Type.TLiteral<true>;
  removed: Type.TArray<Type.TString>;
  warnings: Type.TOptional<Type.TArray<Type.TString>>;
}>;
/** Request payload for changing one installed plugin's policy state. */
declare const PluginsSetEnabledParamsSchema: Type.TObject<{
  pluginId: Type.TString;
  enabled: Type.TBoolean;
}>;
/** Successful plugin enablement policy update. */
declare const PluginsSetEnabledResultSchema: Type.TObject<{
  ok: Type.TLiteral<true>;
  plugin: Type.TObject<{
    id: Type.TString;
    name: Type.TString;
    packageName: Type.TOptional<Type.TString>;
    description: Type.TOptional<Type.TString>;
    version: Type.TOptional<Type.TString>;
    kind: Type.TOptional<Type.TArray<Type.TString>>;
    origin: Type.TOptional<Type.TString>;
    installed: Type.TBoolean;
    enabled: Type.TBoolean;
    state: Type.TUnion<[Type.TLiteral<"enabled">, Type.TLiteral<"disabled">, Type.TLiteral<"not-installed">, Type.TLiteral<"error">]>;
    featured: Type.TOptional<Type.TBoolean>;
    featuredAt: Type.TOptional<Type.TInteger>;
    order: Type.TOptional<Type.TNumber>; /** True when the gateway can resolve a manifest or catalog icon for this plugin identity. */
    hasIcon: Type.TOptional<Type.TBoolean>;
    install: Type.TOptional<Type.TUnion<[Type.TObject<{
      source: Type.TLiteral<"clawhub">;
      packageName: Type.TString;
    }>, Type.TObject<{
      source: Type.TLiteral<"official">;
      pluginId: Type.TString;
    }>]>>;
    error: Type.TOptional<Type.TString>; /** Coarse manifest-derived grouping (channel, provider, memory, ...) for catalog UIs. */
    category: Type.TOptional<Type.TString>; /** True when the plugin has an install record and can be removed via plugins.uninstall. */
    removable: Type.TOptional<Type.TBoolean>;
  }>;
  restartRequired: Type.TBoolean;
  warnings: Type.TOptional<Type.TArray<Type.TString>>;
}>;
type PluginCatalogEntry = Static<typeof PluginCatalogEntrySchema>;
type PluginsListParams = Static<typeof PluginsListParamsSchema>;
type PluginsListResult = Static<typeof PluginsListResultSchema>;
type PluginsSearchParams = Static<typeof PluginsSearchParamsSchema>;
type PluginsSearchResult = Static<typeof PluginsSearchResultSchema>;
type PluginsInstallParams = Static<typeof PluginsInstallParamsSchema>;
type PluginsInstallResult = Static<typeof PluginsInstallResultSchema>;
type PluginsRefreshParams = Static<typeof PluginsRefreshParamsSchema>;
type PluginsRefreshResult = Static<typeof PluginsRefreshResultSchema>;
type PluginsUninstallParams = Static<typeof PluginsUninstallParamsSchema>;
type PluginsUninstallResult = Static<typeof PluginsUninstallResultSchema>;
type PluginsSetEnabledParams = Static<typeof PluginsSetEnabledParamsSchema>;
type PluginsSetEnabledResult = Static<typeof PluginsSetEnabledResultSchema>;
type PluginControlUiDescriptor = Static<typeof PluginControlUiDescriptorSchema>;
type PluginsUiDescriptorsParams = Static<typeof PluginsUiDescriptorsParamsSchema>;
type PluginsUiDescriptorsResult = Static<typeof PluginsUiDescriptorsResultSchema>;
type PluginsSessionActionParams = Static<typeof PluginsSessionActionParamsSchema>;
type PluginsSessionActionResult = Static<typeof PluginsSessionActionResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/wizard.d.ts
/** Starts a setup wizard, optionally scoped to a local or remote workspace. */
declare const WizardStartParamsSchema: Type.TObject<{
  mode: Type.TOptional<Type.TUnion<[Type.TLiteral<"local">, Type.TLiteral<"remote">]>>;
  workspace: Type.TOptional<Type.TString>;
  installDaemon: Type.TOptional<Type.TBoolean>;
  flow: Type.TOptional<Type.TUnion<[Type.TLiteral<"setup">, Type.TLiteral<"channels">]>>;
  channel: Type.TOptional<Type.TString>;
}>;
/** Client answer payload for the current wizard step. */
declare const WizardAnswerSchema: Type.TObject<{
  stepId: Type.TString;
  value: Type.TOptional<Type.TUnknown>;
}>;
/** Advances a wizard session, with an answer when the previous step requested input. */
declare const WizardNextParamsSchema: Type.TObject<{
  sessionId: Type.TString;
  answer: Type.TOptional<Type.TObject<{
    stepId: Type.TString;
    value: Type.TOptional<Type.TUnknown>;
  }>>;
}>;
/** Cancels an active wizard session. */
declare const WizardCancelParamsSchema: Type.TObject<{
  sessionId: Type.TString;
}>;
/** Reads status for an active or recently completed wizard session. */
declare const WizardStatusParamsSchema: Type.TObject<{
  sessionId: Type.TString;
}>;
/** UI contract for one wizard step rendered by gateway clients. */
declare const WizardStepSchema: Type.TObject<{
  id: Type.TString;
  type: Type.TUnion<[Type.TLiteral<"note">, Type.TLiteral<"select">, Type.TLiteral<"text">, Type.TLiteral<"confirm">, Type.TLiteral<"multiselect">, Type.TLiteral<"progress">, Type.TLiteral<"action">]>;
  title: Type.TOptional<Type.TString>;
  message: Type.TOptional<Type.TString>;
  format: Type.TOptional<Type.TUnion<[Type.TLiteral<"plain">]>>;
  options: Type.TOptional<Type.TArray<Type.TObject<{
    value: Type.TUnknown;
    label: Type.TString;
    hint: Type.TOptional<Type.TString>;
  }>>>;
  initialValue: Type.TOptional<Type.TUnknown>;
  placeholder: Type.TOptional<Type.TString>;
  sensitive: Type.TOptional<Type.TBoolean>;
  executor: Type.TOptional<Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"client">]>>;
  externalUrl: Type.TOptional<Type.TString>;
  deviceCode: Type.TOptional<Type.TObject<{
    code: Type.TString;
    expiresInMinutes: Type.TOptional<Type.TInteger>;
    message: Type.TOptional<Type.TString>;
  }>>;
}>;
/** Result after advancing a wizard session. */
declare const WizardNextResultSchema: Type.TObject<{
  done: Type.TBoolean;
  step: Type.TOptional<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"note">, Type.TLiteral<"select">, Type.TLiteral<"text">, Type.TLiteral<"confirm">, Type.TLiteral<"multiselect">, Type.TLiteral<"progress">, Type.TLiteral<"action">]>;
    title: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    format: Type.TOptional<Type.TUnion<[Type.TLiteral<"plain">]>>;
    options: Type.TOptional<Type.TArray<Type.TObject<{
      value: Type.TUnknown;
      label: Type.TString;
      hint: Type.TOptional<Type.TString>;
    }>>>;
    initialValue: Type.TOptional<Type.TUnknown>;
    placeholder: Type.TOptional<Type.TString>;
    sensitive: Type.TOptional<Type.TBoolean>;
    executor: Type.TOptional<Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"client">]>>;
    externalUrl: Type.TOptional<Type.TString>;
    deviceCode: Type.TOptional<Type.TObject<{
      code: Type.TString;
      expiresInMinutes: Type.TOptional<Type.TInteger>;
      message: Type.TOptional<Type.TString>;
    }>>;
  }>>;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"cancelled">, Type.TLiteral<"error">]>>;
  error: Type.TOptional<Type.TString>;
  channels: Type.TOptional<Type.TArray<Type.TString>>;
  accounts: Type.TOptional<Type.TArray<Type.TObject<{
    channel: Type.TString;
    accountId: Type.TString;
  }>>>;
  preparedModelRef: Type.TOptional<Type.TString>;
}>;
/** Result returned when a wizard session is created. */
declare const WizardStartResultSchema: Type.TObject<{
  done: Type.TBoolean;
  step: Type.TOptional<Type.TObject<{
    id: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"note">, Type.TLiteral<"select">, Type.TLiteral<"text">, Type.TLiteral<"confirm">, Type.TLiteral<"multiselect">, Type.TLiteral<"progress">, Type.TLiteral<"action">]>;
    title: Type.TOptional<Type.TString>;
    message: Type.TOptional<Type.TString>;
    format: Type.TOptional<Type.TUnion<[Type.TLiteral<"plain">]>>;
    options: Type.TOptional<Type.TArray<Type.TObject<{
      value: Type.TUnknown;
      label: Type.TString;
      hint: Type.TOptional<Type.TString>;
    }>>>;
    initialValue: Type.TOptional<Type.TUnknown>;
    placeholder: Type.TOptional<Type.TString>;
    sensitive: Type.TOptional<Type.TBoolean>;
    executor: Type.TOptional<Type.TUnion<[Type.TLiteral<"gateway">, Type.TLiteral<"client">]>>;
    externalUrl: Type.TOptional<Type.TString>;
    deviceCode: Type.TOptional<Type.TObject<{
      code: Type.TString;
      expiresInMinutes: Type.TOptional<Type.TInteger>;
      message: Type.TOptional<Type.TString>;
    }>>;
  }>>;
  status: Type.TOptional<Type.TUnion<[Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"cancelled">, Type.TLiteral<"error">]>>;
  error: Type.TOptional<Type.TString>;
  channels: Type.TOptional<Type.TArray<Type.TString>>;
  accounts: Type.TOptional<Type.TArray<Type.TObject<{
    channel: Type.TString;
    accountId: Type.TString;
  }>>>;
  preparedModelRef: Type.TOptional<Type.TString>;
  sessionId: Type.TString;
}>;
/** Minimal status poll result used when the client does not need the next step. */
declare const WizardStatusResultSchema: Type.TObject<{
  status: Type.TUnion<[Type.TLiteral<"running">, Type.TLiteral<"done">, Type.TLiteral<"cancelled">, Type.TLiteral<"error">]>;
  error: Type.TOptional<Type.TString>;
}>;
type WizardStartParams = Static<typeof WizardStartParamsSchema>;
type WizardAnswer = Static<typeof WizardAnswerSchema>;
type WizardNextParams = Static<typeof WizardNextParamsSchema>;
type WizardCancelParams = Static<typeof WizardCancelParamsSchema>;
type WizardStatusParams = Static<typeof WizardStatusParamsSchema>;
type WizardStep = Static<typeof WizardStepSchema>;
type WizardNextResult = Static<typeof WizardNextResultSchema>;
type WizardStartResult = Static<typeof WizardStartResultSchema>;
type WizardStatusResult = Static<typeof WizardStatusResultSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/worker-protocol-primitives.d.ts
declare const WORKER_PROTOCOL_MAX_IDENTIFIER_LENGTH = 256;
declare const WORKER_PROTOCOL_MAX_FRAME_ID_LENGTH = 128;
declare const WORKER_PROTOCOL_MAX_PAYLOAD_BYTES: number;
declare const WorkerIdentifierSchema: Type.TString;
declare const WorkerFrameIdSchema: Type.TString;
declare const WorkerAdmissionFailureReasonSchema: Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>;
declare const WorkerProtocolCloseReasonSchema: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
declare const WorkerErrorShapeSchema: Type.TObject<{
  code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
  message: Type.TString;
  details: Type.TObject<{
    reason: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
  }>;
  retryable: Type.TOptional<Type.TBoolean>;
  retryAfterMs: Type.TOptional<Type.TInteger>;
}>;
declare const LiveIntegerSchema: Type.TInteger;
declare const LiveSequenceSchema: Type.TInteger;
//#endregion
//#region packages/gateway-protocol/src/schema/worker-admission.d.ts
declare const WORKER_RPC_SET_VERSION = 1;
declare const WORKER_HEARTBEAT_INTERVAL_MS = 15000;
declare const WORKER_PROTOCOL_METHODS: readonly ["worker.heartbeat", "worker.transcript.commit", "worker.live-event"];
declare const WORKER_TRANSCRIPT_COMMIT_PROTOCOL_FEATURE = "worker-transcript-commit-v1";
declare const WORKER_LIVE_EVENT_PROTOCOL_FEATURE = "worker-live-event-v1";
declare const WORKER_LAUNCH_V2_PROTOCOL_FEATURE = "worker-launch-v2";
declare const WORKER_PROTOCOL_FEATURES: readonly ["worker-heartbeat-v1", "worker-transcript-commit-v1", "worker-live-event-v1", "worker-launch-v2", "worker-inference-v1"];
declare const WORKER_PROTOCOL_MAX_METHOD_LENGTH = 64;
declare const WORKER_PROTOCOL_MAX_FEATURES = 64;
declare const WORKER_PROTOCOL_MAX_FEATURE_LENGTH = 128;
declare const WORKER_TRANSCRIPT_MAX_BATCH_MESSAGES = 64;
declare const WORKER_TRANSCRIPT_MAX_CONTENT_PARTS = 128;
declare const WORKER_TRANSCRIPT_MAX_JSON_DEPTH = 32;
/** Build identity presented by a worker before the gateway admits it. */
declare const WorkerAdmissionHandshakeSchema: Type.TObject<{
  bundleHash: Type.TString;
  openclawVersion: Type.TString;
  protocolFeatures: Type.TArray<Type.TString>;
}>;
/** Dedicated first-frame payload accepted only on the worker ingress. */
declare const WorkerConnectParamsSchema: Type.TObject<{
  minProtocol: Type.TInteger;
  maxProtocol: Type.TInteger;
  client: Type.TObject<{
    id: Type.TLiteral<"openclaw-worker">;
    version: Type.TString;
    platform: Type.TString;
    mode: Type.TLiteral<"worker">;
  }>;
  role: Type.TLiteral<"worker">;
  admission: Type.TUnion<[Type.TObject<{
    sessionId: Type.TNull;
    runId: Type.TNull;
    environmentId: Type.TString;
    credential: Type.TString;
    ownerEpoch: Type.TInteger;
    rpcSetVersion: Type.TInteger;
    handshake: Type.TObject<{
      bundleHash: Type.TString;
      openclawVersion: Type.TString;
      protocolFeatures: Type.TArray<Type.TString>;
    }>;
  }>, Type.TObject<{
    sessionId: Type.TString;
    runId: Type.TString;
    environmentId: Type.TString;
    credential: Type.TString;
    ownerEpoch: Type.TInteger;
    rpcSetVersion: Type.TInteger;
    handshake: Type.TObject<{
      bundleHash: Type.TString;
      openclawVersion: Type.TString;
      protocolFeatures: Type.TArray<Type.TString>;
    }>;
  }>]>;
}>;
declare const WorkerConnectRequestFrameSchema: Type.TObject<{
  type: Type.TLiteral<"req">;
  id: Type.TString;
  method: Type.TLiteral<"connect">;
  params: Type.TObject<{
    minProtocol: Type.TInteger;
    maxProtocol: Type.TInteger;
    client: Type.TObject<{
      id: Type.TLiteral<"openclaw-worker">;
      version: Type.TString;
      platform: Type.TString;
      mode: Type.TLiteral<"worker">;
    }>;
    role: Type.TLiteral<"worker">;
    admission: Type.TUnion<[Type.TObject<{
      sessionId: Type.TNull;
      runId: Type.TNull;
      environmentId: Type.TString;
      credential: Type.TString;
      ownerEpoch: Type.TInteger;
      rpcSetVersion: Type.TInteger;
      handshake: Type.TObject<{
        bundleHash: Type.TString;
        openclawVersion: Type.TString;
        protocolFeatures: Type.TArray<Type.TString>;
      }>;
    }>, Type.TObject<{
      sessionId: Type.TString;
      runId: Type.TString;
      environmentId: Type.TString;
      credential: Type.TString;
      ownerEpoch: Type.TInteger;
      rpcSetVersion: Type.TInteger;
      handshake: Type.TObject<{
        bundleHash: Type.TString;
        openclawVersion: Type.TString;
        protocolFeatures: Type.TArray<Type.TString>;
      }>;
    }>]>;
  }>;
}>;
/** Minimal admission response; workers never receive the general gateway snapshot. */
declare const WorkerHelloOkSchema: Type.TObject<{
  type: Type.TLiteral<"worker-hello-ok">;
  environmentId: Type.TString;
  sessionId: Type.TUnion<[Type.TString, Type.TNull]>;
  ownerEpoch: Type.TInteger;
  rpcSetVersion: Type.TInteger;
  protocolFeatures: Type.TArray<Type.TString>;
  credentialExpiresAtMs: Type.TInteger;
  policy: Type.TObject<{
    heartbeatIntervalMs: Type.TInteger;
    maxPayload: Type.TInteger;
  }>;
}>;
declare const WorkerAdmissionResponseFrameSchema: Type.TUnion<[Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<true>;
  payload: Type.TObject<{
    type: Type.TLiteral<"worker-hello-ok">;
    environmentId: Type.TString;
    sessionId: Type.TUnion<[Type.TString, Type.TNull]>;
    ownerEpoch: Type.TInteger;
    rpcSetVersion: Type.TInteger;
    protocolFeatures: Type.TArray<Type.TString>;
    credentialExpiresAtMs: Type.TInteger;
    policy: Type.TObject<{
      heartbeatIntervalMs: Type.TInteger;
      maxPayload: Type.TInteger;
    }>;
  }>;
}>, Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<false>;
  error: Type.TObject<{
    code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
    message: Type.TString;
    details: Type.TObject<{
      reason: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
    }>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>;
}>]>;
declare const WorkerHeartbeatParamsSchema: Type.TObject<{
  sentAtMs: Type.TInteger;
  status: Type.TUnion<[Type.TLiteral<"ready">, Type.TLiteral<"busy">, Type.TLiteral<"draining">]>;
}>;
declare const WorkerHeartbeatResultSchema: Type.TObject<{
  receivedAtMs: Type.TInteger;
  status: Type.TLiteral<"ok">;
  ownerEpoch: Type.TInteger;
}>;
declare const WorkerHeartbeatRequestFrameSchema: Type.TObject<{
  type: Type.TLiteral<"req">;
  id: Type.TString;
  method: Type.TLiteral<"worker.heartbeat">;
  params: Type.TObject<{
    sentAtMs: Type.TInteger;
    status: Type.TUnion<[Type.TLiteral<"ready">, Type.TLiteral<"busy">, Type.TLiteral<"draining">]>;
  }>;
}>;
declare const WorkerHeartbeatResponseFrameSchema: Type.TUnion<[Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<true>;
  payload: Type.TObject<{
    receivedAtMs: Type.TInteger;
    status: Type.TLiteral<"ok">;
    ownerEpoch: Type.TInteger;
  }>;
}>, Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<false>;
  error: Type.TObject<{
    code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
    message: Type.TString;
    details: Type.TObject<{
      reason: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
    }>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>;
}>]>;
declare const WorkerTranscriptMessageSchema: Type.TUnion<[Type.TObject<{
  role: Type.TLiteral<"user">;
  content: Type.TArray<Type.TUnion<[Type.TObject<{
    type: Type.TLiteral<"text">;
    text: Type.TString;
    textSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    type: Type.TLiteral<"image">;
    data: Type.TString;
    mimeType: Type.TString;
  }>]>>;
  timestamp: Type.TInteger;
}>, Type.TObject<{
  role: Type.TLiteral<"assistant">;
  content: Type.TArray<Type.TUnion<[Type.TObject<{
    type: Type.TLiteral<"text">;
    text: Type.TString;
    textSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    type: Type.TLiteral<"thinking">;
    thinking: Type.TString;
    thinkingSignature: Type.TOptional<Type.TString>;
    redacted: Type.TOptional<Type.TBoolean>;
  }>, Type.TObject<{
    type: Type.TLiteral<"toolCall">;
    id: Type.TString;
    name: Type.TString;
    arguments: Type.TRecord<"^.*$", Type.TUnknown>;
    thoughtSignature: Type.TOptional<Type.TString>;
    executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
  }>]>>;
  api: Type.TString;
  provider: Type.TString;
  model: Type.TString;
  responseModel: Type.TOptional<Type.TString>;
  responseId: Type.TOptional<Type.TString>;
  diagnostics: Type.TOptional<Type.TArray<Type.TObject<{
    type: Type.TString;
    timestamp: Type.TInteger;
    error: Type.TOptional<Type.TObject<{
      name: Type.TOptional<Type.TString>;
      message: Type.TString;
      stack: Type.TOptional<Type.TString>;
      code: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
    }>>;
    details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
  }>>>;
  usage: Type.TObject<{
    input: Type.TNumber;
    output: Type.TNumber;
    cacheRead: Type.TNumber;
    cacheWrite: Type.TNumber;
    contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
      state: Type.TLiteral<"available">;
      promptTokens: Type.TNumber;
      totalTokens: Type.TNumber;
    }>, Type.TObject<{
      state: Type.TLiteral<"unavailable">;
    }>]>>;
    totalTokens: Type.TNumber;
    cost: Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      total: Type.TNumber;
      totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
    }>;
  }>;
  stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">, Type.TLiteral<"error">, Type.TLiteral<"aborted">]>;
  errorMessage: Type.TOptional<Type.TString>;
  errorCode: Type.TOptional<Type.TString>;
  errorType: Type.TOptional<Type.TString>;
  errorBody: Type.TOptional<Type.TString>;
  timestamp: Type.TInteger;
}>, Type.TObject<{
  role: Type.TLiteral<"toolResult">;
  toolCallId: Type.TString;
  toolName: Type.TString;
  content: Type.TArray<Type.TUnion<[Type.TObject<{
    type: Type.TLiteral<"text">;
    text: Type.TString;
    textSignature: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    type: Type.TLiteral<"image">;
    data: Type.TString;
    mimeType: Type.TString;
  }>]>>;
  details: Type.TOptional<Type.TUnknown>;
  isError: Type.TBoolean;
  timestamp: Type.TInteger;
}>]>;
declare const WorkerTranscriptCommitParamsSchema: Type.TObject<{
  runEpoch: Type.TInteger;
  seq: Type.TInteger;
  baseLeafId: Type.TUnion<[Type.TString, Type.TNull]>;
  messages: Type.TArray<Type.TUnion<[Type.TObject<{
    role: Type.TLiteral<"user">;
    content: Type.TArray<Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"text">;
      text: Type.TString;
      textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      type: Type.TLiteral<"image">;
      data: Type.TString;
      mimeType: Type.TString;
    }>]>>;
    timestamp: Type.TInteger;
  }>, Type.TObject<{
    role: Type.TLiteral<"assistant">;
    content: Type.TArray<Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"text">;
      text: Type.TString;
      textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      type: Type.TLiteral<"thinking">;
      thinking: Type.TString;
      thinkingSignature: Type.TOptional<Type.TString>;
      redacted: Type.TOptional<Type.TBoolean>;
    }>, Type.TObject<{
      type: Type.TLiteral<"toolCall">;
      id: Type.TString;
      name: Type.TString;
      arguments: Type.TRecord<"^.*$", Type.TUnknown>;
      thoughtSignature: Type.TOptional<Type.TString>;
      executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
    }>]>>;
    api: Type.TString;
    provider: Type.TString;
    model: Type.TString;
    responseModel: Type.TOptional<Type.TString>;
    responseId: Type.TOptional<Type.TString>;
    diagnostics: Type.TOptional<Type.TArray<Type.TObject<{
      type: Type.TString;
      timestamp: Type.TInteger;
      error: Type.TOptional<Type.TObject<{
        name: Type.TOptional<Type.TString>;
        message: Type.TString;
        stack: Type.TOptional<Type.TString>;
        code: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
      }>>;
      details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
    }>>>;
    usage: Type.TObject<{
      input: Type.TNumber;
      output: Type.TNumber;
      cacheRead: Type.TNumber;
      cacheWrite: Type.TNumber;
      contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
        state: Type.TLiteral<"available">;
        promptTokens: Type.TNumber;
        totalTokens: Type.TNumber;
      }>, Type.TObject<{
        state: Type.TLiteral<"unavailable">;
      }>]>>;
      totalTokens: Type.TNumber;
      cost: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        total: Type.TNumber;
        totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
      }>;
    }>;
    stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">, Type.TLiteral<"error">, Type.TLiteral<"aborted">]>;
    errorMessage: Type.TOptional<Type.TString>;
    errorCode: Type.TOptional<Type.TString>;
    errorType: Type.TOptional<Type.TString>;
    errorBody: Type.TOptional<Type.TString>;
    timestamp: Type.TInteger;
  }>, Type.TObject<{
    role: Type.TLiteral<"toolResult">;
    toolCallId: Type.TString;
    toolName: Type.TString;
    content: Type.TArray<Type.TUnion<[Type.TObject<{
      type: Type.TLiteral<"text">;
      text: Type.TString;
      textSignature: Type.TOptional<Type.TString>;
    }>, Type.TObject<{
      type: Type.TLiteral<"image">;
      data: Type.TString;
      mimeType: Type.TString;
    }>]>>;
    details: Type.TOptional<Type.TUnknown>;
    isError: Type.TBoolean;
    timestamp: Type.TInteger;
  }>]>>;
}>;
declare const WorkerTranscriptCommitResultSchema: Type.TObject<{
  entryIds: Type.TArray<Type.TString>;
  newLeafId: Type.TString;
}>;
declare const WorkerTranscriptCommitErrorReasonSchema: Type.TUnion<[Type.TLiteral<"stale-base-leaf">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"invalid-batch">, Type.TLiteral<"session-not-attached">]>;
declare const WorkerTranscriptCommitErrorShapeSchema: Type.TObject<{
  code: Type.TLiteral<"INVALID_REQUEST">;
  message: Type.TString;
  details: Type.TObject<{
    reason: Type.TUnion<[Type.TLiteral<"stale-base-leaf">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"invalid-batch">, Type.TLiteral<"session-not-attached">]>;
  }>;
}>;
declare const WorkerTranscriptCommitRequestFrameSchema: Type.TObject<{
  type: Type.TLiteral<"req">;
  id: Type.TString;
  method: Type.TLiteral<"worker.transcript.commit">;
  params: Type.TObject<{
    runEpoch: Type.TInteger;
    seq: Type.TInteger;
    baseLeafId: Type.TUnion<[Type.TString, Type.TNull]>;
    messages: Type.TArray<Type.TUnion<[Type.TObject<{
      role: Type.TLiteral<"user">;
      content: Type.TArray<Type.TUnion<[Type.TObject<{
        type: Type.TLiteral<"text">;
        text: Type.TString;
        textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        type: Type.TLiteral<"image">;
        data: Type.TString;
        mimeType: Type.TString;
      }>]>>;
      timestamp: Type.TInteger;
    }>, Type.TObject<{
      role: Type.TLiteral<"assistant">;
      content: Type.TArray<Type.TUnion<[Type.TObject<{
        type: Type.TLiteral<"text">;
        text: Type.TString;
        textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        type: Type.TLiteral<"thinking">;
        thinking: Type.TString;
        thinkingSignature: Type.TOptional<Type.TString>;
        redacted: Type.TOptional<Type.TBoolean>;
      }>, Type.TObject<{
        type: Type.TLiteral<"toolCall">;
        id: Type.TString;
        name: Type.TString;
        arguments: Type.TRecord<"^.*$", Type.TUnknown>;
        thoughtSignature: Type.TOptional<Type.TString>;
        executionMode: Type.TOptional<Type.TUnion<[Type.TLiteral<"sequential">, Type.TLiteral<"parallel">]>>;
      }>]>>;
      api: Type.TString;
      provider: Type.TString;
      model: Type.TString;
      responseModel: Type.TOptional<Type.TString>;
      responseId: Type.TOptional<Type.TString>;
      diagnostics: Type.TOptional<Type.TArray<Type.TObject<{
        type: Type.TString;
        timestamp: Type.TInteger;
        error: Type.TOptional<Type.TObject<{
          name: Type.TOptional<Type.TString>;
          message: Type.TString;
          stack: Type.TOptional<Type.TString>;
          code: Type.TOptional<Type.TUnion<[Type.TString, Type.TNumber]>>;
        }>>;
        details: Type.TOptional<Type.TRecord<"^.*$", Type.TUnknown>>;
      }>>>;
      usage: Type.TObject<{
        input: Type.TNumber;
        output: Type.TNumber;
        cacheRead: Type.TNumber;
        cacheWrite: Type.TNumber;
        contextUsage: Type.TOptional<Type.TUnion<[Type.TObject<{
          state: Type.TLiteral<"available">;
          promptTokens: Type.TNumber;
          totalTokens: Type.TNumber;
        }>, Type.TObject<{
          state: Type.TLiteral<"unavailable">;
        }>]>>;
        totalTokens: Type.TNumber;
        cost: Type.TObject<{
          input: Type.TNumber;
          output: Type.TNumber;
          cacheRead: Type.TNumber;
          cacheWrite: Type.TNumber;
          total: Type.TNumber;
          totalOrigin: Type.TOptional<Type.TLiteral<"provider-billed">>;
        }>;
      }>;
      stopReason: Type.TUnion<[Type.TLiteral<"stop">, Type.TLiteral<"length">, Type.TLiteral<"toolUse">, Type.TLiteral<"error">, Type.TLiteral<"aborted">]>;
      errorMessage: Type.TOptional<Type.TString>;
      errorCode: Type.TOptional<Type.TString>;
      errorType: Type.TOptional<Type.TString>;
      errorBody: Type.TOptional<Type.TString>;
      timestamp: Type.TInteger;
    }>, Type.TObject<{
      role: Type.TLiteral<"toolResult">;
      toolCallId: Type.TString;
      toolName: Type.TString;
      content: Type.TArray<Type.TUnion<[Type.TObject<{
        type: Type.TLiteral<"text">;
        text: Type.TString;
        textSignature: Type.TOptional<Type.TString>;
      }>, Type.TObject<{
        type: Type.TLiteral<"image">;
        data: Type.TString;
        mimeType: Type.TString;
      }>]>>;
      details: Type.TOptional<Type.TUnknown>;
      isError: Type.TBoolean;
      timestamp: Type.TInteger;
    }>]>>;
  }>;
}>;
declare const WorkerTranscriptCommitResponseFrameSchema: Type.TUnion<[Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<true>;
  payload: Type.TObject<{
    entryIds: Type.TArray<Type.TString>;
    newLeafId: Type.TString;
  }>;
}>, Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<false>;
  error: Type.TObject<{
    code: Type.TLiteral<"INVALID_REQUEST">;
    message: Type.TString;
    details: Type.TObject<{
      reason: Type.TUnion<[Type.TLiteral<"stale-base-leaf">, Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"invalid-batch">, Type.TLiteral<"session-not-attached">]>;
    }>;
  }>;
}>, Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<false>;
  error: Type.TObject<{
    code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
    message: Type.TString;
    details: Type.TObject<{
      reason: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
    }>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>;
}>]>;
declare const WorkerLiveEventSchema: Type.TUnion<[Type.TObject<{
  readonly kind: Type.TLiteral<"assistant">;
  readonly payload: Type.TObject<{
    readonly text: Type.TString;
    readonly delta: Type.TString;
    readonly replace: Type.TOptional<Type.TLiteral<true>>;
    readonly mediaUrls: Type.TOptional<Type.TArray<Type.TString>>;
    readonly phase: Type.TOptional<Type.TUnion<[Type.TLiteral<"commentary">, Type.TLiteral<"final_answer">]>>;
    readonly itemId: Type.TOptional<Type.TString>;
  }>;
}>, Type.TObject<{
  readonly kind: Type.TLiteral<"thinking">;
  readonly payload: Type.TObject<{
    readonly text: Type.TString;
    readonly delta: Type.TString;
  }>;
}>, Type.TObject<{
  readonly kind: Type.TLiteral<"tool">;
  readonly payload: Type.TUnion<[Type.TObject<{
    readonly phase: Type.TLiteral<"start">;
    readonly args: Type.TUnknown;
    readonly name: Type.TString;
    readonly toolCallId: Type.TString;
    readonly hideFromChannelProgress: Type.TOptional<Type.TLiteral<true>>;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"update">;
    readonly partialResult: Type.TUnknown;
    readonly name: Type.TString;
    readonly toolCallId: Type.TString;
    readonly hideFromChannelProgress: Type.TOptional<Type.TLiteral<true>>;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"result">;
    readonly meta: Type.TOptional<Type.TString>;
    readonly isError: Type.TBoolean;
    readonly result: Type.TUnknown;
    readonly toolErrorSummary: Type.TOptional<Type.TString>;
    readonly name: Type.TString;
    readonly toolCallId: Type.TString;
    readonly hideFromChannelProgress: Type.TOptional<Type.TLiteral<true>>;
  }>]>;
}>, Type.TObject<{
  readonly kind: Type.TLiteral<"approval">;
  readonly payload: Type.TUnion<[Type.TObject<{
    readonly phase: Type.TLiteral<"requested">;
    readonly status: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"unavailable">]>;
    readonly kind: Type.TUnion<[Type.TLiteral<"exec">, Type.TLiteral<"plugin">, Type.TLiteral<"unknown">]>;
    readonly title: Type.TString;
    readonly itemId: Type.TOptional<Type.TString>;
    readonly toolCallId: Type.TOptional<Type.TString>;
    readonly approvalId: Type.TOptional<Type.TString>;
    readonly approvalSlug: Type.TOptional<Type.TString>;
    readonly command: Type.TOptional<Type.TString>;
    readonly host: Type.TOptional<Type.TString>;
    readonly reason: Type.TOptional<Type.TString>;
    readonly scope: Type.TOptional<Type.TUnion<[Type.TLiteral<"turn">, Type.TLiteral<"session">]>>;
    readonly message: Type.TOptional<Type.TString>;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"resolved">;
    readonly status: Type.TUnion<[Type.TLiteral<"approved">, Type.TLiteral<"denied">, Type.TLiteral<"failed">]>;
    readonly kind: Type.TUnion<[Type.TLiteral<"exec">, Type.TLiteral<"plugin">, Type.TLiteral<"unknown">]>;
    readonly title: Type.TString;
    readonly itemId: Type.TOptional<Type.TString>;
    readonly toolCallId: Type.TOptional<Type.TString>;
    readonly approvalId: Type.TOptional<Type.TString>;
    readonly approvalSlug: Type.TOptional<Type.TString>;
    readonly command: Type.TOptional<Type.TString>;
    readonly host: Type.TOptional<Type.TString>;
    readonly reason: Type.TOptional<Type.TString>;
    readonly scope: Type.TOptional<Type.TUnion<[Type.TLiteral<"turn">, Type.TLiteral<"session">]>>;
    readonly message: Type.TOptional<Type.TString>;
  }>]>;
}>, Type.TObject<{
  readonly kind: Type.TLiteral<"lifecycle">;
  readonly payload: Type.TUnion<[Type.TObject<{
    readonly phase: Type.TLiteral<"start">;
    readonly startedAt: Type.TInteger;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"fallback">;
    readonly reasonSummary: Type.TString;
    readonly attemptSummaries: Type.TArray<Type.TString>;
    readonly attempts: Type.TArray<Type.TObject<{
      readonly provider: Type.TString;
      readonly model: Type.TString;
      readonly error: Type.TString;
      readonly reason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
      readonly authMode: Type.TOptional<Type.TString>;
      readonly status: Type.TOptional<Type.TInteger>;
      readonly code: Type.TOptional<Type.TString>;
    }>>;
    readonly selectedProvider: Type.TString;
    readonly selectedModel: Type.TString;
    readonly activeProvider: Type.TString;
    readonly activeModel: Type.TString;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"fallback_cleared">;
    readonly previousActiveModel: Type.TOptional<Type.TString>;
    readonly selectedProvider: Type.TString;
    readonly selectedModel: Type.TString;
    readonly activeProvider: Type.TString;
    readonly activeModel: Type.TString;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"fallback_step">;
    readonly fallbackStepType: Type.TLiteral<"fallback_step">;
    readonly fallbackStepFromModel: Type.TString;
    readonly fallbackStepToModel: Type.TOptional<Type.TString>;
    readonly fallbackStepFromFailureReason: Type.TOptional<Type.TUnion<[Type.TLiteral<"auth">, Type.TLiteral<"auth_permanent">, Type.TLiteral<"format">, Type.TLiteral<"rate_limit">, Type.TLiteral<"overloaded">, Type.TLiteral<"billing">, Type.TLiteral<"server_error">, Type.TLiteral<"timeout">, Type.TLiteral<"context_overflow">, Type.TLiteral<"model_not_found">, Type.TLiteral<"session_expired">, Type.TLiteral<"empty_response">, Type.TLiteral<"no_error_details">, Type.TLiteral<"unclassified">, Type.TLiteral<"unknown">]>>;
    readonly fallbackStepFromFailureDetail: Type.TOptional<Type.TString>;
    readonly fallbackStepChainPosition: Type.TOptional<Type.TInteger>;
    readonly fallbackStepFinalOutcome: Type.TUnion<[Type.TLiteral<"next_fallback">, Type.TLiteral<"succeeded">, Type.TLiteral<"chain_exhausted">]>;
  }>, Type.TUnion<[Type.TObject<{
    readonly phase: Type.TLiteral<"finishing">;
    readonly error: Type.TOptional<Type.TString>;
    readonly startedAt: Type.TOptional<Type.TInteger>;
    readonly endedAt: Type.TInteger;
    readonly stopReason: Type.TOptional<Type.TString>;
    readonly yielded: Type.TOptional<Type.TLiteral<true>>;
    readonly timeoutPhase: Type.TOptional<Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"preflight">, Type.TLiteral<"provider">, Type.TLiteral<"post_turn">, Type.TLiteral<"gateway_draining">]>>;
    readonly providerStarted: Type.TOptional<Type.TBoolean>;
    readonly aborted: Type.TOptional<Type.TBoolean>;
    readonly toolErrorSummary: Type.TOptional<Type.TString>;
    readonly livenessState: Type.TOptional<Type.TUnion<[Type.TLiteral<"working">, Type.TLiteral<"paused">, Type.TLiteral<"blocked">, Type.TLiteral<"abandoned">]>>;
    readonly replayInvalid: Type.TOptional<Type.TLiteral<true>>;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"end">;
    readonly startedAt: Type.TOptional<Type.TInteger>;
    readonly endedAt: Type.TInteger;
    readonly stopReason: Type.TOptional<Type.TString>;
    readonly yielded: Type.TOptional<Type.TLiteral<true>>;
    readonly timeoutPhase: Type.TOptional<Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"preflight">, Type.TLiteral<"provider">, Type.TLiteral<"post_turn">, Type.TLiteral<"gateway_draining">]>>;
    readonly providerStarted: Type.TOptional<Type.TBoolean>;
    readonly aborted: Type.TOptional<Type.TBoolean>;
    readonly toolErrorSummary: Type.TOptional<Type.TString>;
    readonly livenessState: Type.TOptional<Type.TUnion<[Type.TLiteral<"working">, Type.TLiteral<"paused">, Type.TLiteral<"blocked">, Type.TLiteral<"abandoned">]>>;
    readonly replayInvalid: Type.TOptional<Type.TLiteral<true>>;
  }>, Type.TObject<{
    readonly phase: Type.TLiteral<"error">;
    readonly error: Type.TString;
    readonly fallbackExhaustedFailure: Type.TOptional<Type.TLiteral<true>>;
    readonly startedAt: Type.TOptional<Type.TInteger>;
    readonly endedAt: Type.TInteger;
    readonly stopReason: Type.TOptional<Type.TString>;
    readonly yielded: Type.TOptional<Type.TLiteral<true>>;
    readonly timeoutPhase: Type.TOptional<Type.TUnion<[Type.TLiteral<"queue">, Type.TLiteral<"preflight">, Type.TLiteral<"provider">, Type.TLiteral<"post_turn">, Type.TLiteral<"gateway_draining">]>>;
    readonly providerStarted: Type.TOptional<Type.TBoolean>;
    readonly aborted: Type.TOptional<Type.TBoolean>;
    readonly toolErrorSummary: Type.TOptional<Type.TString>;
    readonly livenessState: Type.TOptional<Type.TUnion<[Type.TLiteral<"working">, Type.TLiteral<"paused">, Type.TLiteral<"blocked">, Type.TLiteral<"abandoned">]>>;
    readonly replayInvalid: Type.TOptional<Type.TLiteral<true>>;
  }>]>]>;
}>]>;
declare const WorkerLiveEventParamsSchema: Type.TObject<{
  readonly runEpoch: typeof LiveIntegerSchema;
  readonly lastAckedSeq: typeof LiveIntegerSchema;
  readonly seq: typeof LiveSequenceSchema;
  readonly runId: typeof WorkerIdentifierSchema;
  readonly event: typeof WorkerLiveEventSchema;
}>;
declare const WorkerLiveEventResultSchema: Type.TObject<{
  readonly ackedSeq: Type.TInteger;
}>;
declare const WorkerLiveEventErrorDetailsSchema: Type.TUnion<[Type.TObject<{
  readonly reason: Type.TUnion<[Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"invalid-event">, Type.TLiteral<"capacity-exceeded">]>;
}>, Type.TObject<{
  readonly reason: Type.TLiteral<"resync-required">;
  readonly ackedSeq: Type.TInteger;
  readonly expectedSeq: Type.TInteger;
}>]>;
declare const WorkerLiveEventErrorShapeSchema: Type.TObject<{
  readonly code: Type.TLiteral<"INVALID_REQUEST">;
  readonly message: Type.TString;
  readonly details: Type.TUnion<[Type.TObject<{
    readonly reason: Type.TUnion<[Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"invalid-event">, Type.TLiteral<"capacity-exceeded">]>;
  }>, Type.TObject<{
    readonly reason: Type.TLiteral<"resync-required">;
    readonly ackedSeq: Type.TInteger;
    readonly expectedSeq: Type.TInteger;
  }>]>;
}>;
declare const WorkerLiveEventRequestFrameSchema: Type.TObject<{
  readonly type: Type.TLiteral<"req">;
  readonly id: typeof WorkerFrameIdSchema;
  readonly method: Type.TLiteral<(typeof WORKER_PROTOCOL_METHODS)[2]>;
  readonly params: typeof WorkerLiveEventParamsSchema;
}>;
declare const WorkerLiveEventResponseFrameSchema: Type.TUnion<[Type.TObject<{
  readonly type: Type.TLiteral<"res">;
  readonly id: Type.TString;
  readonly ok: Type.TLiteral<true>;
  readonly payload: Type.TObject<{
    readonly ackedSeq: Type.TInteger;
  }>;
}>, Type.TObject<{
  readonly type: Type.TLiteral<"res">;
  readonly id: Type.TString;
  readonly ok: Type.TLiteral<false>;
  readonly error: Type.TObject<{
    readonly code: Type.TLiteral<"INVALID_REQUEST">;
    readonly message: Type.TString;
    readonly details: Type.TUnion<[Type.TObject<{
      readonly reason: Type.TUnion<[Type.TLiteral<"epoch-mismatch">, Type.TLiteral<"session-not-attached">, Type.TLiteral<"invalid-event">, Type.TLiteral<"capacity-exceeded">]>;
    }>, Type.TObject<{
      readonly reason: Type.TLiteral<"resync-required">;
      readonly ackedSeq: Type.TInteger;
      readonly expectedSeq: Type.TInteger;
    }>]>;
  }>;
}>, Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TLiteral<false>;
  error: Type.TObject<{
    code: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"UNAVAILABLE">]>;
    message: Type.TString;
    details: Type.TObject<{
      reason: Type.TUnion<[Type.TUnion<[Type.TLiteral<"invalid-credential">, Type.TLiteral<"credential-expired">, Type.TLiteral<"environment-mismatch">, Type.TLiteral<"environment-unavailable">, Type.TLiteral<"bundle-mismatch">, Type.TLiteral<"version-mismatch">, Type.TLiteral<"session-mismatch">, Type.TLiteral<"placement-mismatch">, Type.TLiteral<"owner-epoch-mismatch">, Type.TLiteral<"rpc-set-mismatch">, Type.TLiteral<"protocol-features-mismatch">]>, Type.TLiteral<"invalid-handshake">, Type.TLiteral<"protocol-mismatch">, Type.TLiteral<"gateway-unavailable">, Type.TLiteral<"invalid-frame">, Type.TLiteral<"slow-consumer">, Type.TLiteral<"method-not-allowed">, Type.TLiteral<"invalid-heartbeat">, Type.TLiteral<"credential-replaced">, Type.TLiteral<"gateway-shutdown">]>;
    }>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>;
}>]>;
type WorkerAdmissionHandshake = Static<typeof WorkerAdmissionHandshakeSchema>;
type WorkerConnectParams = Static<typeof WorkerConnectParamsSchema>;
type WorkerConnectRequestFrame = Static<typeof WorkerConnectRequestFrameSchema>;
type WorkerAdmissionFailureReason = Static<typeof WorkerAdmissionFailureReasonSchema>;
type WorkerProtocolCloseReason = Static<typeof WorkerProtocolCloseReasonSchema>;
type WorkerErrorShape = Static<typeof WorkerErrorShapeSchema>;
type WorkerHelloOk = Static<typeof WorkerHelloOkSchema>;
type WorkerAdmissionResponseFrame = Static<typeof WorkerAdmissionResponseFrameSchema>;
type WorkerHeartbeatParams = Static<typeof WorkerHeartbeatParamsSchema>;
type WorkerHeartbeatResult = Static<typeof WorkerHeartbeatResultSchema>;
type WorkerHeartbeatRequestFrame = Static<typeof WorkerHeartbeatRequestFrameSchema>;
type WorkerHeartbeatResponseFrame = Static<typeof WorkerHeartbeatResponseFrameSchema>;
type WorkerTranscriptMessage = Static<typeof WorkerTranscriptMessageSchema>;
type WorkerTranscriptCommitParams = Static<typeof WorkerTranscriptCommitParamsSchema>;
type WorkerTranscriptCommitResult = Static<typeof WorkerTranscriptCommitResultSchema>;
type WorkerTranscriptCommitErrorReason = Static<typeof WorkerTranscriptCommitErrorReasonSchema>;
type WorkerTranscriptCommitErrorShape = Static<typeof WorkerTranscriptCommitErrorShapeSchema>;
type WorkerTranscriptCommitRequestFrame = Static<typeof WorkerTranscriptCommitRequestFrameSchema>;
type WorkerTranscriptCommitResponseFrame = Static<typeof WorkerTranscriptCommitResponseFrameSchema>;
type WorkerLiveEvent = Static<typeof WorkerLiveEventSchema>;
type WorkerLiveEventParams = Static<typeof WorkerLiveEventParamsSchema>;
type WorkerLiveEventResult = Static<typeof WorkerLiveEventResultSchema>;
type WorkerLiveEventErrorDetails = Static<typeof WorkerLiveEventErrorDetailsSchema>;
type WorkerLiveEventErrorShape = Static<typeof WorkerLiveEventErrorShapeSchema>;
type WorkerLiveEventRequestFrame = Static<typeof WorkerLiveEventRequestFrameSchema>;
type WorkerLiveEventResponseFrame = Static<typeof WorkerLiveEventResponseFrameSchema>;
//#endregion
//#region packages/gateway-protocol/src/schema/worktrees.d.ts
declare const WorktreeRecordSchema: Type.TObject<{
  id: Type.TString;
  name: Type.TString;
  repoFingerprint: Type.TString;
  repoRoot: Type.TString;
  path: Type.TString;
  branch: Type.TString;
  baseRef: Type.TString;
  ownerKind: Type.TString;
  ownerId: Type.TOptional<Type.TString>;
  snapshotRef: Type.TOptional<Type.TString>;
  createdAt: Type.TInteger;
  lastActiveAt: Type.TInteger;
  removedAt: Type.TOptional<Type.TInteger>;
}>;
declare const WorktreesListParamsSchema: Type.TObject<{}>;
declare const WorktreesListResultSchema: Type.TObject<{
  worktrees: Type.TArray<Type.TObject<{
    id: Type.TString;
    name: Type.TString;
    repoFingerprint: Type.TString;
    repoRoot: Type.TString;
    path: Type.TString;
    branch: Type.TString;
    baseRef: Type.TString;
    ownerKind: Type.TString;
    ownerId: Type.TOptional<Type.TString>;
    snapshotRef: Type.TOptional<Type.TString>;
    createdAt: Type.TInteger;
    lastActiveAt: Type.TInteger;
    removedAt: Type.TOptional<Type.TInteger>;
  }>>;
}>;
declare const WorktreesCreateParamsSchema: Type.TObject<{
  repoRoot: Type.TString;
  name: Type.TOptional<Type.TString>;
  baseRef: Type.TOptional<Type.TString>;
}>;
declare const WorktreesRemoveParamsSchema: Type.TObject<{
  id: Type.TString;
  force: Type.TOptional<Type.TBoolean>;
}>;
declare const WorktreesRemoveResultSchema: Type.TObject<{
  removed: Type.TBoolean;
  snapshotRef: Type.TOptional<Type.TString>; /** Why the pre-removal snapshot failed; present only on forced removals that continued without one. */
  snapshotError: Type.TOptional<Type.TString>;
}>;
declare const WORKTREE_REPOSITORY_STATUSES: readonly ["git", "not_git", "unavailable"];
declare const WorktreeRepositoryStatusSchema: Type.TString;
declare const WorktreesBranchesParamsSchema: Type.TObject<{
  repoRoot: Type.TString;
  includeRepositoryStatus: Type.TOptional<Type.TBoolean>;
}>;
declare const WorktreeBranchSchema: Type.TObject<{
  name: Type.TString;
  kind: Type.TUnion<[Type.TLiteral<"local">, Type.TLiteral<"remote">]>;
}>;
declare const WorktreesBranchesResultSchema: Type.TObject<{
  branches: Type.TArray<Type.TObject<{
    name: Type.TString;
    kind: Type.TUnion<[Type.TLiteral<"local">, Type.TLiteral<"remote">]>;
  }>>;
  defaultBranch: Type.TOptional<Type.TString>;
  headBranch: Type.TOptional<Type.TString>;
  repositoryStatus: Type.TOptional<Type.TString>;
}>;
declare const WorktreesRestoreParamsSchema: Type.TObject<{
  id: Type.TString;
}>;
declare const WorktreesGcParamsSchema: Type.TObject<{}>;
declare const WorktreesGcResultSchema: Type.TObject<{
  removed: Type.TArray<Type.TString>;
  orphansDeleted: Type.TInteger;
  snapshotsPruned: Type.TInteger;
}>;
type WorktreeRecord = Static<typeof WorktreeRecordSchema>;
type WorktreesListParams = Static<typeof WorktreesListParamsSchema>;
type WorktreesListResult = Static<typeof WorktreesListResultSchema>;
type WorktreesCreateParams = Static<typeof WorktreesCreateParamsSchema>;
type WorktreesRemoveParams = Static<typeof WorktreesRemoveParamsSchema>;
type WorktreesRemoveResult = Static<typeof WorktreesRemoveResultSchema>;
type WorktreesRestoreParams = Static<typeof WorktreesRestoreParamsSchema>;
type WorktreesGcParams = Static<typeof WorktreesGcParamsSchema>;
type WorktreesGcResult = Static<typeof WorktreesGcResultSchema>;
type WorktreeBranch = Static<typeof WorktreeBranchSchema>;
type WorktreeRepositoryStatus = (typeof WORKTREE_REPOSITORY_STATUSES)[number];
type WorktreesBranchesParams = Static<typeof WorktreesBranchesParamsSchema>;
type WorktreesBranchesResult = Static<typeof WorktreesBranchesResultSchema>;
//#endregion
export { WorkerHeartbeatResponseFrame as $, AgentsFileEntry as $C, ApprovalHistoryResult as $S, SkillsStatusParamsSchema as $T, ConversationListItem as $_, SessionsCleanupParams as $a, BoardWidgetAppViewResultSchema as $b, QuestionRequestQuestionSchema as $c, ExecApprovalRequestParams as $d, CronScratchSetParams as $f, AuditEventSchema as $g, TalkSessionCreateParams as $h, SessionVisibility as $i, NodePairRemoveParamsSchema as $l, ChannelsPairingDismissResultSchema as $m, TerminalAttachResult as $n, SessionsFilesRevealResultSchema as $o, SystemChangeKind as $p, TaskSuggestionsAcceptParams as $r, SessionsSendParamsSchema as $s, WizardStep as $t, LogsTailParams as $u, SessionsCatalogArchiveResult as $v, SkillsCuratorStatusParamsSchema as $w, SkillsProposalHistoryStatusParams as $x, SessionRow as $y, WORKER_PROTOCOL_FEATURES as A, SessionApprovalReplay as AC, ToolsInvokeParamsSchema as AE, WorkerInferenceTerminalOutcome as AS, SkillsProposalRequestRevisionResult as AT, ArtifactsListResult as A_, SessionFileRelevanceSchema as Aa, BoardOpSchema as Ab, SecretsResolveAssignmentSchema as Ac, FsListDirResultSchema as Ad, EnvironmentsListResultSchema as Af, UserProfileAvatarMimeSchema as Ag, TalkClientSteerParamsSchema as Ah, SessionMemberAddParamsSchema as Ai, NodeDescribeParamsSchema as Al, COMMAND_ARG_DESCRIPTION_MAX_LENGTH as Am, PluginsSessionActionResult as An, SessionsCompanionStateResultSchema as Ao, SystemAgentChatParamsSchema as Ap, TaskSummarySchema as Ar, SessionsPatchParams as As, WorkerTranscriptMessage as At, ChatAttachmentsSchema as Au, InputProvenanceSchema as Av, ModelsListParams as Aw, McpAppViewExpiredErrorDetailsSchema as Ax, SessionSuggestionSchema as Ay, WorkerAdmissionFailureReason as B, formatValidationErrors as BC, ApprovalAllowDecisionSchema as BS, SkillsSearchParams as BT, AgentsWorkspaceListParams as B_, SessionOperationEventSchema as Ba, BoardTabDeleteOpSchema as Bb, QuestionGetResult as Bc, DevicePairRenameParamsSchema as Bd, WorkerTunnelStatusSchema as Bf, UsersSelfParams as Bg, TalkConfigResultSchema as Bh, SessionSharingAction as Bi, NodeInvokeProgressParamsSchema as Bl, CommandsListParamsSchema as Bm, PluginsUiDescriptorsResultSchema as Bn, SessionsDiffResult as Bo, SystemAgentSetupAuthStartParamsSchema as Bp, TasksListParamsSchema as Br, SessionsResolveParams as Bs, WizardCancelParamsSchema as Bt, ChatMessageGetResult as Bu, SessionCatalogHost as Bv, SkillProposalEvaluation as Bw, UiCommandParamsSchema as Bx, SessionSuggestionsListResultSchema as By, WorktreesRemoveResult as C, PendingSessionApprovalEventSchema as CC, ToolsEffectiveNoticeSchema as CE, WorkerInferenceStartParams as CS, SkillsProposalInspectParamsSchema as CT, ArtifactsDownloadResultSchema as C_, SessionFileEntry as Ca, BoardFocusTabCommandSchema as Cb, SessionsReclaimParams as Cc, GatewaySuspendTaskBlocker as Cd, EnvironmentsDestroyParams as Cf, TtsSpeakResult as Cg, TalkClientCreateParams as Ch, PresenceEntrySchema as Ci, WebPushTestParams as Cl, UpdateRunParams as Cm, PluginsSearchParams as Cn, SessionsCompanionResetParams as Co, SystemAgentChatHistoryParams as Cp, TerminalTextResult as Cr, SessionsMessagesSubscribeParamsSchema as Cs, WorkerTranscriptCommitParamsSchema as Ct, NodeSkillDescriptorSchema as Cu, SendParamsSchema as Cv, GatewayAgentRuntime as Cw, BoardWidgetPutParamsSchema as Cx, SessionSuggestion as Cy, WORKER_HEARTBEAT_INTERVAL_MS as D, PluginApprovalSeveritySchema as DC, ToolsEffectiveResultSchema as DE, WorkerInferenceStartResponseFrameSchema as DS, SkillsProposalRecordResultSchema as DT, ArtifactsGetResultSchema as D_, SessionFilePreviewKind as Da, BoardMcpAppDescriptor as Db, SessionPlacementState as Dc, FsListDirParams as Dd, EnvironmentsListParams as Df, WebLoginWaitParams as Dg, TalkClientMutationResult as Dh, StateVersionSchema as Di, WebPushVapidPublicKeyParams as Dl, COMMAND_ALIAS_MAX_ITEMS as Dm, PluginsSessionActionFailureResultSchema as Dn, SessionsCompanionStateParams as Do, SystemAgentChatHistoryTurn as Dp, TerminalUploadResult as Dr, SessionsObserverVisibilityParamsSchema as Ds, WorkerTranscriptCommitResponseFrameSchema as Dt, ChatAbortParamsSchema as Du, ChatSendSessionKeyString as Dv, ModelsAuthLogoutParamsSchema as Dw, BoardWidgetResizeOpSchema as Dx, SessionSuggestionEventSchema as Dy, WorktreesRestoreParamsSchema as E, PluginApprovalSeverity as EC, ToolsEffectiveResult as EE, WorkerInferenceStartResponseFrame as ES, SkillsProposalRecordResult as ET, ArtifactsGetResult as E_, SessionFileKindSchema as Ea, BoardLegacyEventParamsSchema as Eb, SessionsReclaimResultSchema as Ec, FsDirEntrySchema as Ed, EnvironmentsDestroyResultSchema as Ef, WebLoginStartParamsSchema as Eg, TalkClientCreateResultSchema as Eh, StateVersion as Ei, WebPushUnsubscribeParamsSchema as El, UpdateStatusParamsSchema as Em, PluginsSearchResultSchema as En, SessionsCompanionResetResultSchema as Eo, SystemAgentChatHistoryResultSchema as Ep, TerminalUploadParamsSchema as Er, SessionsObserverVisibilityParams as Es, WorkerTranscriptCommitResponseFrame as Et, ChatAbortParams as Eu, CHAT_SEND_SESSION_KEY_MAX_LENGTH as Ev, ModelsAuthLogoutParams as Ew, BoardWidgetRemoveOpSchema as Ex, SessionSuggestionEvent as Ey, WORKER_RPC_SET_VERSION as F, TerminalApprovalSnapshotSchema as FC, validateWorkerInferenceTerminalFrame as FS, SkillsProposalUpdateParamsSchema as FT, AgentsWorkspaceFileSchema as F_, SessionObserverHealth as Fa, BoardSizeSchema as Fb, Question as Fc, DevicePairRejectParams as Fd, WorkerEnvironmentMetadata as Ff, UsersLinkEmailResultSchema as Fg, TalkClientTranscriptParams as Fh, SessionMemberSchema as Fi, NodeInvokeInputEvent as Fl, COMMAND_LIST_MAX_ITEMS as Fm, PluginsSetEnabledResult as Fn, SessionsDeleteParamsSchema as Fo, SystemAgentSetupActivateParams as Fp, TasksGetParams as Fr, SessionsPluginPatchResultSchema as Fs, WorkerAdmissionFailureReasonSchema as Ft, ChatFinalEventSchema as Fu, SessionCatalog as Fv, ModelsProbeParamsSchema as Fw, errorShape as Fx, SessionSuggestionsAddResult as Fy, WorkerConnectParams as G, AgentsCreateParams as GC, ApprovalDeniedReasonSchema as GS, SkillsSecurityVerdictsParamsSchema as GT, AgentEventSchema as G_, SessionsBranchesListParams as Ga, BoardTicketEventParamsSchema as Gb, QuestionListResultSchema as Gc, DevicePairSetupCodeResult as Gd, CronJob as Gf, UsersSetAvatarParamsSchema as Gg, TalkSessionAppendAudioParams as Gh, SessionSharingIdentitySchema as Gi, NodeListParamsSchema as Gl, ChannelsPairingAccount as Gm, PluginApprovalRequestParams as Gn, SessionsFilesGetResultSchema as Go, SystemAgentSetupDetectResult as Gp, TasksRecoveryResult as Gr, SessionsRewindResultSchema as Gs, WizardStartParams as Gt, ChatRunStartupPhaseSchema as Gu, SessionCatalogPullRequestSummarySchema as Gv, SkillsBinsParamsSchema as Gw, UiNavigateCommandSchema as Gx, SessionTypingEvent as Gy, WorkerAdmissionHandshakeSchema as H, AgentKindSchema as HC, ApprovalCancelledReasonSchema as HS, SkillsSearchResult as HT, AgentsWorkspaceListResult as H_, SessionWorktreeInfoSchema as Ha, BoardTabSchema as Hb, QuestionListParams as Hc, DevicePairResolvedEventSchema as Hd, CronAddResult as Hf, UsersSelfResult as Hg, TalkEventSchema as Hh, SessionSharingEvent as Hi, NodeInvokeResultParams as Hl, CommandsListResultSchema as Hm, PluginsUninstallParamsSchema as Hn, SessionsFilesGetParams as Ho, SystemAgentSetupAuthStartResultSchema as Hp, TasksListResultSchema as Hr, SessionsRewindParams as Hs, WizardNextParamsSchema as Ht, ChatMetadataParams as Hu, SessionCatalogLocator as Hv, SkillProposalLifecycleEvent as Hw, UiCommandResultSchema as Hx, SessionSuggestionsResolveParamsSchema as Hy, WORKER_TRANSCRIPT_COMMIT_PROTOCOL_FEATURE as I, TerminalSessionApprovalEventSchema as IC, validateWorkerInferenceTerminalOutcome as IS, SkillsProposalsListParams as IT, AgentsWorkspaceGetParams as I_, SessionObserverHealthSchema as Ia, BoardSnapshot as Ib, QuestionAnswers as Ic, DevicePairRejectParamsSchema as Id, WorkerEnvironmentMetadataSchema as If, UsersListParams as Ig, TalkClientTranscriptParamsSchema as Ih, SessionMembersListParams as Ii, NodeInvokeInputEventSchema as Il, COMMAND_NAME_MAX_LENGTH as Im, PluginsSetEnabledResultSchema as In, SessionsDescribeParams as Io, SystemAgentSetupActivateParamsSchema as Ip, TasksGetParamsSchema as Ir, SessionsPreviewParams as Is, WorkerProtocolCloseReasonSchema as It, ChatHistoryParamsSchema as Iu, SessionCatalogCapabilities as Iv, ModelsProbeResult as Iw, missingScopeErrorShape as Ix, SessionSuggestionsAddResultSchema as Iy, WorkerErrorShape as J, AgentsCreateResultSchema as JC, ApprovalGetParamsSchema as JS, SkillsSkillCardParams as JT, AgentIdentityResult as J_, SessionsBranchesListResultSchema as Ja, BoardViewTicketSchema as Jb, QuestionRecord as Jc, DeviceTokenRevokeParamsSchema as Jd, CronRunLogEntry as Jf, UsersSetDisplayNameParams as Jg, TalkSessionCancelOutputParamsSchema as Jh, SessionVisibilitySetResult as Ji, NodePairListParams as Jl, ChannelsPairingApproveResult as Jm, PluginApprovalResolveParamsSchema as Jn, SessionsFilesListResult as Jo, SystemAgentSetupVerifyParamsSchema as Jp, TaskSuggestionEvent as Jr, SessionsSearchParams as Js, WizardStartResultSchema as Jt, ChatStatusEventSchema as Ju, SessionCatalogSessionSchema as Jv, SkillsCuratorActionParams as Jw, UiSplitCommandSchema as Jx, SessionTypingParamsSchema as Jy, WorkerConnectRequestFrame as K, AgentsCreateParamsSchema as KC, ApprovalExpiredReasonSchema as KS, SkillsSecurityVerdictsResult as KT, AgentIdentityParams as K_, SessionsBranchesListParamsSchema as Ka, BoardUpdateParams as Kb, QuestionOption as Kc, DevicePairSetupCodeResultSchema as Kd, CronListParams as Kf, UsersSetAvatarResult as Kg, TalkSessionAppendAudioParamsSchema as Kh, SessionVisibilitySetParams as Ki, NodePairApproveParams as Kl, ChannelsPairingApproveParams as Km, PluginApprovalRequestParamsSchema as Kn, SessionsFilesListParams as Ko, SystemAgentSetupDetectResultSchema as Kp, TasksRecoveryResultSchema as Kr, SessionsSearchHit as Ks, WizardStartParamsSchema as Kt, ChatSendParamsSchema as Ku, SessionCatalogSchema as Kv, SkillsBinsResult as Kw, UiPanelCommandSchema as Kx, SessionTypingEventSchema as Ky, WORKER_TRANSCRIPT_MAX_BATCH_MESSAGES as L, isWellFormedApprovalId as LC, AllowedApprovalSnapshot as LS, SkillsProposalsListParamsSchema as LT, AgentsWorkspaceGetParamsSchema as L_, SessionObserverPlanProgress as La, BoardSnapshotSchema as Lb, QuestionAnswersSchema as Lc, DevicePairRemoveParams as Ld, WorkerEnvironmentState as Lf, UsersListParamsSchema as Lg, TalkConfigParams as Lh, SessionMembersListParamsSchema as Li, NodeInvokeParams as Ll, CommandEntry as Lm, PluginsUiDescriptorsParams as Ln, SessionsDescribeParamsSchema as Lo, SystemAgentSetupActivateResult as Lp, TasksGetResult as Lr, SessionsPreviewParamsSchema as Ls, WizardAnswer as Lt, ChatInjectParams as Lu, SessionCatalogCapabilitiesSchema as Lv, ModelsProbeResultSchema as Lw, UiClosePaneCommandSchema as Lx, SessionSuggestionsListParams as Ly, WORKER_PROTOCOL_MAX_FEATURE_LENGTH as M, SystemAgentApprovalPresentation as MC, ToolsInvokeResultSchema as ME, validateWorkerInferenceCancelParams as MS, SkillsProposalReviseParams as MT, AgentsWorkspaceEntry as M_, SessionGroupSchema as Ma, BoardPromptAuthorizeParams as Mb, SecretsResolveParamsSchema as Mc, DevicePairApproveParamsSchema as Md, EnvironmentsStatusParamsSchema as Mf, UsersLinkEmailParams as Mg, TalkClientToolCallParamsSchema as Mh, SessionMemberMutationResultSchema as Mi, NodeEventParamsSchema as Ml, COMMAND_CHOICE_LABEL_MAX_LENGTH as Mm, PluginsSessionActionSuccessResultSchema as Mn, SessionsCreateResult as Mo, SystemAgentChatQuestionSchema as Mp, TasksCancelParamsSchema as Mr, SessionsPluginPatchParams as Ms, WORKER_PROTOCOL_MAX_FRAME_ID_LENGTH as Mt, ChatErrorEventSchema as Mu, SecretInputSchema as Mv, ModelsListResult as Mw, UnknownAgentIdErrorDetailsSchema as Mx, SessionSuggestionStateSchema as My, WORKER_PROTOCOL_MAX_METHOD_LENGTH as N, SystemAgentApprovalPresentationSchema as NC, validateWorkerInferenceEventFrame as NS, SkillsProposalReviseParamsSchema as NT, AgentsWorkspaceEntrySchema as N_, SessionObserverDigest as Na, BoardPromptAuthorizeParamsSchema as Nb, SecretsResolveResult as Nc, DevicePairListParams as Nd, EnvironmentsStatusResult as Nf, UsersLinkEmailParamsSchema as Ng, TalkClientToolCallResult as Nh, SessionMemberRemoveParams as Ni, NodeEventResult as Nl, COMMAND_CHOICE_VALUE_MAX_LENGTH as Nm, PluginsSetEnabledParams as Nn, SessionsCreateResultSchema as No, SystemAgentChatResult as Np, TasksCancelResult as Nr, SessionsPluginPatchParamsSchema as Ns, WORKER_PROTOCOL_MAX_IDENTIFIER_LENGTH as Nt, ChatEvent as Nu, SecretRefSchema as Nv, ModelsListResultSchema as Nw, WizardNotFoundErrorDetailsSchema as Nx, SessionSuggestionsAddParams as Ny, WORKER_LAUNCH_V2_PROTOCOL_FEATURE as O, SessionApprovalEvent as OC, ToolsInvokeErrorSchema as OE, WorkerInferenceStartResult as OS, SkillsProposalRequestRevisionParams as OT, ArtifactsListParams as O_, SessionFilePreviewKindSchema as Oa, BoardMcpAppDescriptorSchema as Ob, isCloudWorkerPlacementState as Oc, FsListDirParamsSchema as Od, EnvironmentsListParamsSchema as Of, WebLoginWaitParamsSchema as Og, TalkClientMutationResultSchema as Oh, SessionMember as Oi, WebPushVapidPublicKeyParamsSchema as Ol, COMMAND_ARGS_MAX_ITEMS as Om, PluginsSessionActionParams as On, SessionsCompanionStateParamsSchema as Oo, SystemAgentChatHistoryTurnSchema as Op, TerminalUploadResultSchema as Or, SessionsObserverVisibilityResult as Os, WorkerTranscriptCommitResult as Ot, ChatAbortedEventSchema as Ou, GatewayClientIdSchema as Ov, ModelsAuthStatusParams as Ow, BoardWidgetSchema as Ox, SessionSuggestionResolution as Oy, WORKER_PROTOCOL_METHODS as P, TerminalApprovalSnapshot as PC, validateWorkerInferenceStartParams as PS, SkillsProposalUpdateParams as PT, AgentsWorkspaceFile as P_, SessionObserverDigestSchema as Pa, BoardSetChatDockCommandSchema as Pb, SecretsResolveResultSchema as Pc, DevicePairListParamsSchema as Pd, EnvironmentsStatusResultSchema as Pf, UsersLinkEmailResult as Pg, TalkClientToolCallResultSchema as Ph, SessionMemberRemoveParamsSchema as Pi, NodeEventResultSchema as Pl, COMMAND_DESCRIPTION_MAX_LENGTH as Pm, PluginsSetEnabledParamsSchema as Pn, SessionsDeleteParams as Po, SystemAgentChatResultSchema as Pp, TasksCancelResultSchema as Pr, SessionsPluginPatchResult as Ps, WORKER_PROTOCOL_MAX_PAYLOAD_BYTES as Pt, ChatEventSchema as Pu, SessionLabelString as Pv, ModelsProbeParams as Pw, buildMissingScopeErrorDetails as Px, SessionSuggestionsAddParamsSchema as Py, WorkerHeartbeatRequestFrameSchema as Q, AgentsDeleteResultSchema as QC, ApprovalHistoryParamsSchema as QS, SkillsStatusParams as QT, AgentWaitParamsSchema as Q_, SessionsBranchesSwitchResultSchema as Qa, BoardWidgetAppViewResult as Qb, QuestionRequestQuestion as Qc, ExecApprovalGetParamsSchema as Qd, CronScratchGetResult as Qf, AuditEvent as Qg, TalkSessionCloseParamsSchema as Qh, SessionSharingRoleSchema as Qi, NodePairRemoveParams as Ql, ChannelsPairingDismissResult as Qm, TerminalAttachParamsSchema as Qn, SessionsFilesRevealResult as Qo, SystemChangeEntrySchema as Qp, TaskSuggestionSchema as Qr, SessionsSendParams as Qs, WizardStatusResultSchema as Qt, ChatToolTitlesResultSchema as Qu, SessionsCatalogArchiveParamsSchema as Qv, SkillsCuratorStatusParams as Qw, SkillsProposalHistoryScanResultSchema as Qx, SessionCreatedActorSchema as Qy, WORKER_TRANSCRIPT_MAX_CONTENT_PARTS as R, ProtocolValidator as RC, AllowedApprovalSnapshotSchema as RS, SkillsProposalsListResult as RT, AgentsWorkspaceGetResult as R_, SessionObserverPlanProgressSchema as Ra, BoardTab as Rb, QuestionGetParams as Rc, DevicePairRemoveParamsSchema as Rd, WorkerEnvironmentStateSchema as Rf, UsersListResult as Rg, TalkConfigParamsSchema as Rh, SessionMembersListResult as Ri, NodeInvokeParamsSchema as Rl, CommandEntrySchema as Rm, PluginsUiDescriptorsParamsSchema as Rn, SessionsDiffParams as Ro, SystemAgentSetupActivateResultSchema as Rp, TasksGetResultSchema as Rr, SessionsResetParams as Rs, WizardAnswerSchema as Rt, ChatInjectParamsSchema as Ru, SessionCatalogDescriptor as Rv, ModelsProbeTargetResult as Rw, UiCommand as Rx, SessionSuggestionsListParamsSchema as Ry, WorktreesRemoveParamsSchema as S, PendingApprovalSnapshotSchema as SC, ToolsEffectiveNotice as SE, WorkerInferenceOptionsSchema as SS, SkillsProposalInspectParams as ST, ArtifactsDownloadResult as S_, SessionFileContentEncodingSchema as Sa, BoardEventParamsSchema as Sb, SessionsDispatchResultSchema as Sc, GatewaySuspendStatusRunningResultSchema as Sd, EnvironmentsCreateResultSchema as Sf, TtsSpeakParamsSchema as Sg, TalkClientCloseParamsSchema as Sh, PresenceEntry as Si, WebPushSubscribeParamsSchema as Sl, ConfigSetParamsSchema as Sm, PluginsRefreshResultSchema as Sn, SessionsCompanionAskResultSchema as So, CronUpdateParamsSchema as Sp, TerminalTextParamsSchema as Sr, SessionsMessagesSubscribeParams as Ss, WorkerTranscriptCommitParams as St, NodeSkillDescriptor as Su, PollParamsSchema as Sv, AuthProbeStatusSchema as Sw, BoardWidgetPutParams as Sx, MigrationsMemoryPlanResult as Sy, WorktreesRestoreParams as T, PluginApprovalPresentationSchema as TC, ToolsEffectiveParamsSchema as TE, WorkerInferenceStartRequestFrameSchema as TS, SkillsProposalInspectResultSchema as TT, ArtifactsGetParamsSchema as T_, SessionFileKind as Ta, BoardGetParamsSchema as Tb, SessionsReclaimResult as Tc, FsDirEntry as Td, EnvironmentsDestroyResult as Tf, WebLoginStartParams as Tg, TalkClientCreateResult as Th, SnapshotSchema as Ti, WebPushUnsubscribeParams as Tl, UpdateStatusParams as Tm, PluginsSearchResult as Tn, SessionsCompanionResetResult as To, SystemAgentChatHistoryResult as Tp, TerminalUploadParams as Tr, SessionsMessagesUnsubscribeParamsSchema as Ts, WorkerTranscriptCommitRequestFrameSchema as Tt, NodeSkillsUpdateParamsSchema as Tu, WakeParamsSchema as Tv, ModelChoiceSchema as Tw, BoardWidgetPutResultSchema as Tx, SessionSuggestionActionSchema as Ty, WorkerAdmissionResponseFrame as U, AgentSummary as UC, ApprovalDecision as US, SkillsSearchResultSchema as UT, AgentsWorkspaceListResultSchema as U_, SessionsAbortParams as Ua, BoardTabUpdateOpSchema as Ub, QuestionListParamsSchema as Uc, DevicePairSetupCodeParams as Ud, CronDeclarativeAddResult as Uf, UsersSelfResultSchema as Ug, TalkModeParams as Uh, SessionSharingEventSchema as Ui, NodeInvokeResultParamsSchema as Ul, TalkSessionAcknowledgeMarkParams as Um, PluginsUninstallResult as Un, SessionsFilesGetParamsSchema as Uo, SystemAgentSetupDetectParams as Up, TasksRecoveryParams as Ur, SessionsRewindParamsSchema as Us, WizardNextResult as Ut, ChatMetadataParamsSchema as Uu, SessionCatalogLocatorSchema as Uv, SkillProposalLifecycleEventSchema as Uw, UiCommandSchema as Ux, SessionSuggestionsResolveResult as Uy, WorkerAdmissionHandshake as V, AgentKind as VC, ApprovalAllowedReasonSchema as VS, SkillsSearchParamsSchema as VT, AgentsWorkspaceListParamsSchema as V_, SessionWorktreeInfo as Va, BoardTabIdSchema as Vb, QuestionGetResultSchema as Vc, DevicePairRequestedEventSchema as Vd, CronAddParams as Vf, UsersSelfParamsSchema as Vg, TalkEvent as Vh, SessionSharingActionSchema as Vi, NodeInvokeRequestEventSchema as Vl, CommandsListResult as Vm, PluginsUninstallParams as Vn, SessionsDiffResultSchema as Vo, SystemAgentSetupAuthStartResult as Vp, TasksListResult as Vr, SessionsResolveParamsSchema as Vs, WizardNextParams as Vt, ChatMessageGetResultSchema as Vu, SessionCatalogHostSchema as Vv, SkillProposalEvaluationSchema as Vw, UiCommandResult as Vx, SessionSuggestionsResolveParams as Vy, WorkerAdmissionResponseFrameSchema as W, AgentSummarySchema as WC, ApprovalDecisionSchema as WS, SkillsSecurityVerdictsParams as WT, AgentEvent as W_, SessionsAbortParamsSchema as Wa, BoardTabsReorderOpSchema as Wb, QuestionListResult as Wc, DevicePairSetupCodeParamsSchema as Wd, CronGetParams as Wf, UsersSetAvatarParams as Wg, TalkModeParamsSchema as Wh, SessionSharingIdentity as Wi, NodeListParams as Wl, TalkSessionAcknowledgeMarkParamsSchema as Wm, PluginsUninstallResultSchema as Wn, SessionsFilesGetResult as Wo, SystemAgentSetupDetectParamsSchema as Wp, TasksRecoveryParamsSchema as Wr, SessionsRewindResult as Ws, WizardNextResultSchema as Wt, ChatRunStartupPhase as Wu, SessionCatalogPullRequestSummary as Wv, SkillsBinsParams as Ww, UiFocusCommandSchema as Wx, SessionSuggestionsResolveResultSchema as Wy, WorkerHeartbeatParamsSchema as X, AgentsDeleteParamsSchema as XC, ApprovalGetResultSchema as XS, SkillsSkillCardResult as XT, AgentParamsSchema as X_, SessionsBranchesSwitchParamsSchema as Xa, BoardWidgetAppViewParams as Xb, QuestionRequestParams as Xc, DeviceTokenRotateParamsSchema as Xd, CronRunsParams as Xf, UsersSetDisplayNameResult as Xg, TalkSessionCancelTurnParamsSchema as Xh, SESSION_VISIBILITY_VALUES as Xi, NodePairRejectParams as Xl, ChannelsPairingDismissParams as Xm, TerminalAckResultSchema as Xn, SessionsFilesRevealParams as Xo, SystemAgentSetupVerifyResultSchema as Xp, TaskSuggestionResolution as Xr, SessionsSearchResult as Xs, WizardStatusParamsSchema as Xt, ChatToolTitlesParamsSchema as Xu, SessionCatalogTranscriptItemSchema as Xv, SkillsCuratorActionResult as Xw, SkillsProposalHistoryScanParamsSchema as Xx, SessionTypingResultSchema as Xy, WorkerHeartbeatParams as Y, AgentsDeleteParams as YC, ApprovalGetResult as YS, SkillsSkillCardParamsSchema as YT, AgentIdentityResultSchema as Y_, SessionsBranchesSwitchParams as Ya, BoardWidget as Yb, QuestionRecordSchema as Yc, DeviceTokenRotateParams as Yd, CronRunParams as Yf, UsersSetDisplayNameParamsSchema as Yg, TalkSessionCancelTurnParams as Yh, SessionVisibilitySetResultSchema as Yi, NodePairListParamsSchema as Yl, ChannelsPairingApproveResultSchema as Ym, TerminalAckResult as Yn, SessionsFilesListResultSchema as Yo, SystemAgentSetupVerifyResult as Yp, TaskSuggestionEventSchema as Yr, SessionsSearchParamsSchema as Ys, WizardStatusParams as Yt, ChatToolTitlesParams as Yu, SessionCatalogTranscriptItem as Yv, SkillsCuratorActionParamsSchema as Yw, SkillsProposalHistoryScanParams as Yx, SessionTypingResult as Yy, WorkerHeartbeatRequestFrame as Z, AgentsDeleteResult as ZC, ApprovalHistoryParams as ZS, SkillsSkillCardResultSchema as ZT, AgentWaitParams as Z_, SessionsBranchesSwitchResult as Za, BoardWidgetAppViewParamsSchema as Zb, QuestionRequestParamsSchema as Zc, ExecApprovalGetParams as Zd, CronScratchGetParams as Zf, UsersSetDisplayNameResultSchema as Zg, TalkSessionCloseParams as Zh, SessionSharingRole as Zi, NodePairRejectParamsSchema as Zl, ChannelsPairingDismissParamsSchema as Zm, TerminalAttachParams as Zn, SessionsFilesRevealParamsSchema as Zo, SystemChangeEntry as Zp, TaskSuggestionResolutionSchema as Zr, SessionsSearchResultSchema as Zs, WizardStatusResult as Zt, ChatToolTitlesResult as Zu, SessionsCatalogArchiveParams as Zv, SkillsCuratorActionResultSchema as Zw, SkillsProposalHistoryScanResult as Zx, SessionCreatedActor as Zy, WorktreesListParams as _, ExecApprovalPresentation as _C, ToolsCatalogResultSchema as _E, WorkerInferenceEventFrame as _S, SkillsProposalEvaluateResultSchema as _T, AuditActivityToolActionV1Schema as __, SessionFileBrowserEntry as _a, BoardCommandSchema as _b, SessionPlacementSchema as _c, GatewaySuspendStatusParams as _d, EnvironmentSummary as _f, TalkSpeakParams as _g, TalkCatalogParams as _h, validateSystemEventParams as _i, PushTestParams as _l, ConfigSchemaParams as _m, PluginsListResult as _n, SessionsCompactionRestoreResult as _o, CronScratchGetResultSchema as _p, TerminalResizeParams as _r, SessionsGroupsPutParamsSchema as _s, WorkerProtocolCloseReason as _t, NodePresenceAlivePayloadSchema as _u, ConversationTurnResult as _v, AgentsUpdateParams as _w, BoardWidgetPluginKindSchema as _x, MemoryMigrationProviderPlan as _y, WorktreeRepositoryStatus as a, ApprovalResolveParams as aC, SkillsUploadChunkParamsSchema as aE, WORKER_INFERENCE_METHODS as aS, SkillsDetailResultSchema as aT, AuditActivityAgentRunV1Schema as a_, SessionsViewerPresenceSetResultSchema as aa, BOARD_DATA_BINDING_ID_MAX_LENGTH as ab, SessionDiscussionInfoParamsSchema as ac, GatewaySuspendBlocker as ad, ExecApprovalsNodeGetParams as af, TalkSessionJoinResult as ag, ChannelsLogoutParams as ah, TaskSuggestionsCreateResult as ai, QuestionResolveParamsSchema as al, SystemChangesListResult as am, PluginCatalogOfficialInstallSchema as an, SessionsCompactionBranchResult as ao, CronDeclarativeAddResultSchema as ap, TerminalEvent as ar, SessionsForkParamsSchema as as, WorkerLiveEventErrorDetailsSchema as at, NodePendingDrainResultSchema as au, ConversationSendParams as av, AgentsFilesListParams as aw, BoardWidgetGeneratedIdentitySchema as ax, SessionsCatalogHostEvent as ay, WorktreesListResultSchema as b, ExpiredApprovalSnapshotSchema as bC, ToolsEffectiveGroup as bE, WorkerInferenceModelRefSchema as bS, SkillsProposalEventsListResult as bT, ArtifactsDownloadParams as b_, SessionFileBrowserResultSchema as ba, BoardDataReadParamsSchema as bb, SessionsDispatchParamsSchema as bc, GatewaySuspendStatusResult as bd, EnvironmentsCreateParamsSchema as bf, TalkSpeakResultSchema as bg, TalkCatalogResultSchema as bh, SystemInfoResult as bi, PushTestResultSchema as bl, ConfigSchemaResponseSchema as bm, PluginsRefreshParamsSchema as bn, SessionsCompanionAskParamsSchema as bo, CronScratchSetResultSchema as bp, TerminalSessionInfoSchema as br, SessionsListParams as bs, WorkerTranscriptCommitErrorShape as bt, NodeRenameParams as bu, MessageActionParamsSchema as bv, AgentsUpdateResultSchema as bw, BoardWidgetPutContent as bx, MigrationsMemoryApplyResult as by, WorktreesBranchesParamsSchema as c, ApprovalResolveResultSchema as cC, ToolCatalogEntry as cE, WorkerInferenceCancelParams as cS, SkillsProposalActionParams as cT, AuditActivityInboundMessageV1 as c_, SessionBranchSchema as ca, BoardActionParamsSchema as cb, SessionDiscussionInfoSchema as cc, GatewaySuspendPrepareParams as cd, ExecApprovalsNodeSetParamsSchema as cf, TalkSessionOkResultSchema as cg, ChannelsStartParamsSchema as ch, TaskSuggestionsDismissParamsSchema as ci, QuestionResolvedEvent as cl, ConfigApplyParamsSchema as cm, PluginJsonValueSchema as cn, SessionsCompactionGetParamsSchema as co, CronJobSchema as cp, TerminalExitEventSchema as cr, SessionsGroupsDeleteParams as cs, WorkerLiveEventParams as ct, NodePendingEnqueueResult as cu, ConversationSendResultSchema as cv, AgentsFilesListResultSchema as cw, BoardWidgetHeightModeSchema as cx, SessionsCatalogListParamsSchema as cy, WorktreesCreateParams as d, ApprovalTerminalReason as dC, ToolCatalogGroupSchema as dE, WorkerInferenceCancelResponseFrame as dS, SkillsProposalApplyResultSchema as dT, AuditActivityListParamsSchema as d_, SessionCompanionExchange as da, BoardChangedEvent as db, SessionDiscussionOpenResult as dc, GatewaySuspendPrepareResult as dd, ExecApprovalsSetParams as df, TalkSessionSubmitToolResultParams as dg, ChannelsStatusResult as dh, TaskSuggestionsListParams as di, QuestionStatus as dl, ConfigPatchParams as dm, PluginsInstallParams as dn, SessionsCompactionListParams as do, CronPacingSchema as dp, TerminalListResult as dr, SessionsGroupsListParamsSchema as ds, WorkerLiveEventRequestFrameSchema as dt, NodePluginToolDescriptorSchema as du, ConversationTurnCancelResult as dv, AgentsFilesSetResult as dw, BoardWidgetMaterializedPutParams as dx, SessionsCatalogReadParams as dy, ApprovalHistoryResultSchema as eC, SkillsUpdateParams as eE, SkillsProposalHistoryStatusParamsSchema as eS, SkillsCuratorStatusResult as eT, AuditListParams as e_, SessionVisibilitySchema as ea, SessionRowSchema as eb, SessionsUsageParams as ec, LogsTailParamsSchema as ed, ExecApprovalRequestParamsSchema as ef, TalkSessionCreateParamsSchema as eg, ChannelsPairingListParams as eh, TaskSuggestionsAcceptParamsSchema as ei, QuestionRequestResult as el, SystemChangeKindSchema as em, WizardStepSchema as en, SessionsCleanupParamsSchema as eo, CronScratchSetResult as ep, TerminalAttachResultSchema as er, SessionsFilesSetParams as es, WorkerHeartbeatResponseFrameSchema as et, NodePendingAckParams as eu, ConversationListItemSchema as ev, AgentsFileEntrySchema as ew, BoardWidgetContent as ex, SessionsCatalogArchiveResultSchema as ey, WorktreesCreateParamsSchema as f, ApprovalTerminalReasonSchema as fC, ToolCatalogProfile as fE, WorkerInferenceCancelResponseFrameSchema as fS, SkillsProposalCreateParams as fT, AuditActivityListResult as f_, SessionCompanionExchangeSchema as fa, BoardChangedEventSchema as fb, SessionDiscussionOpenResultSchema as fc, GatewaySuspendPrepareResultSchema as fd, ExecApprovalsSetParamsSchema as ff, TalkSessionSubmitToolResultParamsSchema as fg, ChannelsStatusResultSchema as fh, TaskSuggestionsListParamsSchema as fi, QuestionStatusSchema as fl, ConfigPatchParamsSchema as fm, PluginsInstallParamsSchema as fn, SessionsCompactionListParamsSchema as fo, CronRemoveParamsSchema as fp, TerminalListResultSchema as fr, SessionsGroupsListResult as fs, WorkerLiveEventResponseFrame as ft, NodePluginToolsUpdateParams as fu, ConversationTurnCancelResultSchema as fv, AgentsFilesSetResultSchema as fw, BoardWidgetMcpAppContentSchema as fx, SessionsCatalogReadParamsSchema as fy, WorktreesGcResultSchema as g, DeniedApprovalSnapshotSchema as gC, ToolsCatalogResult as gE, WorkerInferenceErrorShape as gS, SkillsProposalEvaluateResult as gT, AuditActivityToolActionV1 as g_, SessionDiffFileStatusSchema as ga, BoardCommandEventSchema as gb, SessionPlacementProtocolSchemas as gc, GatewaySuspendResumeResultSchema as gd, EnvironmentStatusSchema as gf, TalkSessionTurnResultSchema as gg, TalkAgentControlResultSchema as gh, SYSTEM_PRESENCE_LEGACY_CLEAR_LAST_INPUT_SECONDS as gi, QuestionWaitAnswerResultSchema as gl, ConfigSchemaLookupResultSchema as gm, PluginsListParamsSchema as gn, SessionsCompactionRestoreParamsSchema as go, CronScratchGetParamsSchema as gp, TerminalOpenResultSchema as gr, SessionsGroupsPutParams as gs, WorkerLiveEventSchema as gt, NodePresenceAlivePayload as gu, ConversationTurnReplySchema as gv, AgentsListResultSchema as gw, BoardWidgetPluginContentSchema as gx, MemoryMigrationItem as gy, WorktreesGcResult as h, DeniedApprovalSnapshot as hC, ToolsCatalogParamsSchema as hE, WorkerInferenceErrorReason as hS, SkillsProposalEvaluateParamsSchema as hT, AuditActivityOutboundMessageV1Schema as h_, SessionDiffFileStatus as ha, BoardCommandEvent as hb, SessionPlacement as hc, GatewaySuspendResumeResult as hd, EnvironmentStatus as hf, TalkSessionTurnResult as hg, TalkAgentControlResult as hh, SYSTEM_PRESENCE_CLEAR_LAST_INPUT_TAG as hi, QuestionWaitAnswerResult as hl, ConfigSchemaLookupResult as hm, PluginsListParams as hn, SessionsCompactionRestoreParams as ho, CronRunsParamsSchema as hp, TerminalOpenResult as hr, SessionsGroupsMutationResultSchema as hs, WorkerLiveEventResultSchema as ht, NodePresenceActivityPayloadSchema as hu, ConversationTurnReply as hv, AgentsListResult as hw, BoardWidgetNameSchema as hx, MAX_MEMORY_MIGRATION_ITEMS as hy, WorktreeRecordSchema as i, ApprovalPresentationSchema as iC, SkillsUploadChunkParams as iE, WORKER_INFERENCE_MAX_OUTPUT_TOKENS as iS, SkillsDetailResult as iT, AuditActivityAgentRunV1 as i_, SessionsViewerPresenceSetResult as ia, BOARD_CRON_TRIGGER_PREFIX as ib, SessionDiscussionInfoParams as ic, HooksStatusParamsSchema as id, ExecApprovalsGetParamsSchema as if, TalkSessionJoinParamsSchema as ig, ChannelsPairingRequest as ih, TaskSuggestionsCreateParamsSchema as ii, QuestionResolveParams as il, SystemChangesListParamsSchema as im, PluginCatalogInstallActionSchema as in, SessionsCompactionBranchParamsSchema as io, CronAddResultSchema as ip, TerminalDataEventSchema as ir, SessionsForkParams as is, WorkerLiveEventErrorDetails as it, NodePendingDrainResult as iu, ConversationListResultSchema as iv, AgentsFilesGetResultSchema as iw, BoardWidgetGeneratedIdentity as ix, SessionsCatalogContinueResultSchema as iy, WORKER_PROTOCOL_MAX_FEATURES as j, SessionApprovalReplaySchema as jC, ToolsInvokeResult as jE, WorkerInferenceTerminalParams as jS, SkillsProposalRequestRevisionResultSchema as jT, ArtifactsListResultSchema as j_, SessionGroup as ja, BoardPluginActionParamsSchema as jb, SecretsResolveParams as jc, DevicePairApproveParams as jd, EnvironmentsStatusParams as jf, UserProfileSchema as jg, TalkClientToolCallParams as jh, SessionMemberMutationResult as ji, NodeEventParams as jl, COMMAND_ARG_NAME_MAX_LENGTH as jm, PluginsSessionActionResultSchema as jn, SessionsCreateParams as jo, SystemAgentChatQuestion as jp, TasksCancelParams as jr, SessionsPatchParamsSchema as js, WorkerTranscriptMessageSchema as jt, ChatDeltaEventSchema as ju, NonEmptyString as jv, ModelsListParamsSchema as jw, MissingScopeErrorDetailsSchema as jx, SessionSuggestionState as jy, WORKER_LIVE_EVENT_PROTOCOL_FEATURE as k, SessionApprovalEventSchema as kC, ToolsInvokeParams as kE, WorkerInferenceTerminalFrame as kS, SkillsProposalRequestRevisionParamsSchema as kT, ArtifactsListParamsSchema as k_, SessionFileRelevance as ka, BoardOp as kb, SecretsReloadParamsSchema as kc, FsListDirResult as kd, EnvironmentsListResult as kf, UserProfile as kg, TalkClientSteerParams as kh, SessionMemberAddParams as ki, NodeDescribeParams as kl, COMMAND_ARG_CHOICES_MAX_ITEMS as km, PluginsSessionActionParamsSchema as kn, SessionsCompanionStateResult as ko, SystemAgentChatParams as kp, TaskSummary as kr, SessionsObserverVisibilityResultSchema as ks, WorkerTranscriptCommitResultSchema as kt, ChatAttachmentSchema as ku, GatewayClientModeSchema as kv, ModelsAuthStatusParamsSchema as kw, GatewayErrorDetailsSchema as kx, SessionSuggestionResolutionSchema as ky, WorktreesBranchesResult as l, ApprovalSnapshot as lC, ToolCatalogEntrySchema as lE, WorkerInferenceCancelRequestFrame as lS, SkillsProposalActionParamsSchema as lT, AuditActivityInboundMessageV1Schema as l_, SessionCompactionCheckpoint as la, BoardCanvasDocumentSource as lb, SessionDiscussionOpenParams as lc, GatewaySuspendPrepareParamsSchema as ld, ExecApprovalsNodeSnapshot as lf, TalkSessionSteerParams as lg, ChannelsStatusParams as lh, TaskSuggestionsDismissResult as li, QuestionResolvedEventSchema as ll, ConfigGetParams as lm, PluginSearchPackageSchema as ln, SessionsCompactionGetResult as lo, CronJobStateSchema as lp, TerminalInputParams as lr, SessionsGroupsDeleteParamsSchema as ls, WorkerLiveEventParamsSchema as lt, NodePendingEnqueueResultSchema as lu, ConversationTurnCancelParams as lv, AgentsFilesSetParams as lw, BoardWidgetHtmlContentSchema as lx, SessionsCatalogListResult as ly, WorktreesGcParamsSchema as m, CancelledApprovalSnapshotSchema as mC, ToolsCatalogParams as mE, WorkerInferenceContext as mS, SkillsProposalEvaluateParams as mT, AuditActivityOutboundMessageV1 as m_, SessionDiffFileSchema as ma, BoardCommand as mb, SessionDiscussionStateSchema as mc, GatewaySuspendResumeParamsSchema as md, ExecApprovalsSnapshotSchema as mf, TalkSessionTurnParamsSchema as mg, ChannelsStopParamsSchema as mh, TaskSuggestionsListResultSchema as mi, QuestionWaitAnswerParamsSchema as ml, ConfigSchemaLookupParamsSchema as mm, PluginsInstallResultSchema as mn, SessionsCompactionListResultSchema as mo, CronRunParamsSchema as mp, TerminalOpenParamsSchema as mr, SessionsGroupsMutationResult as ms, WorkerLiveEventResult as mt, NodePresenceActivityPayload as mu, ConversationTurnParamsSchema as mv, AgentsListParamsSchema as mw, BoardWidgetMoveOpSchema as mx, SessionsCatalogReadResultSchema as my, WorktreeBranchSchema as n, ApprovalKindSchema as nC, SkillsUploadBeginParams as nE, validateSkillsProposalHistoryStatusParams as nS, SkillsDetailParams as nT, AuditListResult as n_, SessionsViewerPresenceSetParams as na, SessionToolOverridesSchema as nb, SessionsCreateParamsSchema as nc, LogsTailResultSchema as nd, ExecApprovalResolveParamsSchema as nf, TalkSessionCreateResultSchema as ng, ChannelsPairingListResult as nh, TaskSuggestionsAcceptResultSchema as ni, QuestionRequestedEvent as nl, SystemChangeSourceSchema as nm, PluginCatalogEntry as nn, SessionsCompactParamsSchema as no, CronUpdateParams as np, TerminalCloseParamsSchema as nr, SessionsFilesSetResult as ns, WorkerHelloOk as nt, NodePendingDrainParams as nu, ConversationListParamsSchema as nv, AgentsFilesGetParamsSchema as nw, BoardWidgetDeclared as nx, SessionsCatalogContinueParamsSchema as ny, WorktreeRepositoryStatusSchema as o, ApprovalResolveParamsSchema as oC, SkillsUploadCommitParams as oE, WORKER_INFERENCE_PROTOCOL_FEATURE as oS, SkillsInstallParams as oT, AuditActivityEventV1 as o_, SESSION_OBSERVER_HEALTH_VALUES as oa, BOARD_WIDGET_TOOL_MAX_LENGTH as ob, SessionDiscussionInfoResult as oc, GatewaySuspendBlockerSchema as od, ExecApprovalsNodeGetParamsSchema as of, TalkSessionJoinResultSchema as og, ChannelsLogoutParamsSchema as oh, TaskSuggestionsCreateResultSchema as oi, QuestionResolveResult as ol, SystemChangesListResultSchema as om, PluginControlUiDescriptor as on, SessionsCompactionBranchResultSchema as oo, CronDeliverySchema as op, TerminalEventSchema as or, SessionsForkResult as os, WorkerLiveEventErrorShape as ot, NodePendingEnqueueParams as ou, ConversationSendParamsSchema as ov, AgentsFilesListParamsSchema as ow, BoardWidgetGrantParams as ox, SessionsCatalogHostEventSchema as oy, WorktreesGcParams as p, CancelledApprovalSnapshot as pC, ToolCatalogProfileSchema as pE, WorkerInferenceCancelResult as pS, SkillsProposalCreateParamsSchema as pT, AuditActivityListResultSchema as p_, SessionDiffFile as pa, BoardChatDockSchema as pb, SessionDiscussionState as pc, GatewaySuspendResumeParams as pd, ExecApprovalsSnapshot as pf, TalkSessionTurnParams as pg, ChannelsStopParams as ph, TaskSuggestionsListResult as pi, QuestionWaitAnswerParams as pl, ConfigSchemaLookupParams as pm, PluginsInstallResult as pn, SessionsCompactionListResult as po, CronRunLogEntrySchema as pp, TerminalOpenParams as pr, SessionsGroupsListResultSchema as ps, WorkerLiveEventResponseFrameSchema as pt, NodePluginToolsUpdateParamsSchema as pu, ConversationTurnParams as pv, AgentsListParams as pw, BoardWidgetMcpAppPutContentSchema as px, SessionsCatalogReadResult as py, WorkerConnectRequestFrameSchema as q, AgentsCreateResult as qC, ApprovalGetParams as qS, SkillsSecurityVerdictsResultSchema as qT, AgentIdentityParamsSchema as q_, SessionsBranchesListResult as qa, BoardUpdateParamsSchema as qb, QuestionOptionSchema as qc, DeviceTokenRevokeParams as qd, CronRemoveParams as qf, UsersSetAvatarResultSchema as qg, TalkSessionCancelOutputParams as qh, SessionVisibilitySetParamsSchema as qi, NodePairApproveParamsSchema as ql, ChannelsPairingApproveParamsSchema as qm, PluginApprovalResolveParams as qn, SessionsFilesListParamsSchema as qo, SystemAgentSetupVerifyParams as qp, TaskSuggestion as qr, SessionsSearchHitSchema as qs, WizardStartResult as qt, ChatStatusEvent as qu, SessionCatalogSession as qv, SkillsBinsResultSchema as qw, UiSidebarCommandSchema as qx, SessionTypingParams as qy, WorktreeRecord as r, ApprovalPresentation as rC, SkillsUploadBeginParamsSchema as rE, WORKER_INFERENCE_MAX_CONTEXT_MESSAGES as rS, SkillsDetailParamsSchema as rT, AuditListResultSchema as r_, SessionsViewerPresenceSetParamsSchema as ra, BOARD_CRON_JOB_ID_MAX_LENGTH as rb, SessionDiscussionInfo as rc, HooksStatusParams as rd, ExecApprovalsGetParams as rf, TalkSessionJoinParams as rg, ChannelsPairingListResultSchema as rh, TaskSuggestionsCreateParams as ri, QuestionRequestedEventSchema as rl, SystemChangesListParams as rm, PluginCatalogEntrySchema as rn, SessionsCompactionBranchParams as ro, CronAddParamsSchema as rp, TerminalDataEvent as rr, SessionsFilesSetResultSchema as rs, WorkerLiveEvent as rt, NodePendingDrainParamsSchema as ru, ConversationListResult as rv, AgentsFilesGetResult as rw, BoardWidgetDeclaredSchema as rx, SessionsCatalogContinueResult as ry, WorktreesBranchesParams as s, ApprovalResolveResult as sC, SkillsUploadCommitParamsSchema as sE, WORKER_PROTOCOL_MAX_INFERENCE_PAYLOAD_BYTES as sS, SkillsInstallParamsSchema as sT, AuditActivityEventV1Schema as s_, SessionBranch as sa, BoardActionParams as sb, SessionDiscussionInfoResultSchema as sc, GatewaySuspendPrepareBusyResultSchema as sd, ExecApprovalsNodeSetParams as sf, TalkSessionOkResult as sg, ChannelsStartParams as sh, TaskSuggestionsDismissParams as si, QuestionResolveResultSchema as sl, ConfigApplyParams as sm, PluginControlUiDescriptorSchema as sn, SessionsCompactionGetParams as so, CronGetParamsSchema as sp, TerminalExitEvent as sr, SessionsForkResultSchema as ss, WorkerLiveEventErrorShapeSchema as st, NodePendingEnqueueParamsSchema as su, ConversationSendResult as sv, AgentsFilesListResult as sw, BoardWidgetGrantParamsSchema as sx, SessionsCatalogListParams as sy, WorktreeBranch as t, ApprovalKind as tC, SkillsUpdateParamsSchema as tE, validateSkillsProposalHistoryScanParams as tS, SkillsCuratorStatusResultSchema as tT, AuditListParamsSchema as t_, SESSION_VIEWER_PRESENCE_MAX_KEYS as ta, SessionToolOverrides as tb, SessionsUsageParamsSchema as tc, LogsTailResult as td, ExecApprovalResolveParams as tf, TalkSessionCreateResult as tg, ChannelsPairingListParamsSchema as th, TaskSuggestionsAcceptResult as ti, QuestionRequestResultSchema as tl, SystemChangeSource as tm, PluginCatalogClawHubInstallSchema as tn, SessionsCompactParams as to, CronStatusParams as tp, TerminalCloseParams as tr, SessionsFilesSetParamsSchema as ts, WorkerHeartbeatResult as tt, NodePendingAckParamsSchema as tu, ConversationListParams as tv, AgentsFilesGetParams as tw, BoardWidgetContentSchema as tx, SessionsCatalogContinueParams as ty, WorktreesBranchesResultSchema as u, ApprovalSnapshotSchema as uC, ToolCatalogGroup as uE, WorkerInferenceCancelRequestFrameSchema as uS, SkillsProposalApplyResult as uT, AuditActivityListParams as u_, SessionCompactionCheckpointSchema as ua, BoardCanvasDocumentSourceSchema as ub, SessionDiscussionOpenParamsSchema as uc, GatewaySuspendPrepareReadyResultSchema as ud, ExecApprovalsNodeSnapshotSchema as uf, TalkSessionSteerParamsSchema as ug, ChannelsStatusParamsSchema as uh, TaskSuggestionsDismissResultSchema as ui, QuestionSchema as ul, ConfigGetParamsSchema as um, PluginSearchResultEntrySchema as un, SessionsCompactionGetResultSchema as uo, CronListParamsSchema as up, TerminalInputParamsSchema as ur, SessionsGroupsListParams as us, WorkerLiveEventRequestFrame as ut, NodePluginToolDescriptor as uu, ConversationTurnCancelParamsSchema as uv, AgentsFilesSetParamsSchema as uw, BoardWidgetMaterializedContent as ux, SessionsCatalogListResultSchema as uy, WorktreesListParamsSchema as v, ExecApprovalPresentationSchema as vC, ToolsEffectiveEntry as vE, WorkerInferenceEventParams as vS, SkillsProposalEventsListParams as vT, ArtifactSummary as v_, SessionFileBrowserEntrySchema as va, BoardCronActionParamsSchema as vb, SessionPlacementStateSchema as vc, GatewaySuspendStatusParamsSchema as vd, EnvironmentSummarySchema as vf, TalkSpeakParamsSchema as vg, TalkCatalogParamsSchema as vh, SystemInfoParams as vi, PushTestParamsSchema as vl, ConfigSchemaParamsSchema as vm, PluginsListResultSchema as vn, SessionsCompactionRestoreResultSchema as vo, CronScratchSchema as vp, TerminalResizeParamsSchema as vr, SessionsGroupsRenameParams as vs, WorkerTranscriptCommitErrorReason as vt, NodePresenceAliveReason as vu, ConversationTurnResultSchema as vv, AgentsUpdateParamsSchema as vw, BoardWidgetPluginPropsSchema as vx, MigrationProtocolSchemas as vy, WorktreesRemoveResultSchema as w, PluginApprovalPresentation as wC, ToolsEffectiveParams as wE, WorkerInferenceStartRequestFrame as wS, SkillsProposalInspectResult as wT, ArtifactsGetParams as w_, SessionFileEntrySchema as wa, BoardGetParams as wb, SessionsReclaimParamsSchema as wc, GatewaySuspendTaskBlockerSchema as wd, EnvironmentsDestroyParamsSchema as wf, TtsSpeakResultSchema as wg, TalkClientCreateParamsSchema as wh, Snapshot as wi, WebPushTestParamsSchema as wl, UpdateRunParamsSchema as wm, PluginsSearchParamsSchema as wn, SessionsCompanionResetParamsSchema as wo, SystemAgentChatHistoryParamsSchema as wp, TerminalTextResultSchema as wr, SessionsMessagesUnsubscribeParams as ws, WorkerTranscriptCommitRequestFrame as wt, NodeSkillsUpdateParams as wu, WakeParams as wv, ModelChoice as ww, BoardWidgetPutResult as wx, SessionSuggestionAction as wy, WorktreesRemoveParams as x, PendingApprovalSnapshot as xC, ToolsEffectiveGroupSchema as xE, WorkerInferenceOptions as xS, SkillsProposalEventsListResultSchema as xT, ArtifactsDownloadParamsSchema as x_, SessionFileContentEncoding as xa, BoardEventParams as xb, SessionsDispatchResult as xc, GatewaySuspendStatusResultSchema as xd, EnvironmentsCreateResult as xf, TtsSpeakParams as xg, TalkClientCloseParams as xh, SystemInfoResultSchema as xi, WebPushSubscribeParams as xl, ConfigSetParams as xm, PluginsRefreshResult as xn, SessionsCompanionAskResult as xo, CronStatusParamsSchema as xp, TerminalTextParams as xr, SessionsListParamsSchema as xs, WorkerTranscriptCommitErrorShapeSchema as xt, NodeRenameParamsSchema as xu, PollParams as xv, AuthProbeStatus as xw, BoardWidgetPutContentSchema as xx, MigrationsMemoryPlanParamsSchema as xy, WorktreesListResult as y, ExpiredApprovalSnapshot as yC, ToolsEffectiveEntrySchema as yE, WorkerInferenceModelRef as yS, SkillsProposalEventsListParamsSchema as yT, ArtifactSummarySchema as y_, SessionFileBrowserResult as ya, BoardDataReadParams as yb, SessionsDispatchParams as yc, GatewaySuspendStatusReadyResultSchema as yd, EnvironmentsCreateParams as yf, TalkSpeakResult as yg, TalkCatalogResult as yh, SystemInfoParamsSchema as yi, PushTestResult as yl, ConfigSchemaResponse as ym, PluginsRefreshParams as yn, SessionsCompanionAskParams as yo, CronScratchSetParamsSchema as yp, TerminalSessionInfo as yr, SessionsGroupsRenameParamsSchema as ys, WorkerTranscriptCommitErrorReasonSchema as yt, NodePresenceAliveReasonSchema as yu, MessageActionParams as yv, AgentsUpdateResult as yw, BoardWidgetPresentationSchema as yx, MigrationsMemoryApplyParamsSchema as yy, WORKER_TRANSCRIPT_MAX_JSON_DEPTH as z, ValidationError as zC, ApprovalAllowDecision as zS, SkillsProposalsListResultSchema as zT, AgentsWorkspaceGetResultSchema as z_, SessionOperationEvent as za, BoardTabCreateOpSchema as zb, QuestionGetParamsSchema as zc, DevicePairRenameParams as zd, WorkerTunnelStatus as zf, UsersListResultSchema as zg, TalkConfigResult as zh, SessionMembersListResultSchema as zi, NodeInvokeProgressParams as zl, CommandsListParams as zm, PluginsUiDescriptorsResult as zn, SessionsDiffParamsSchema as zo, SystemAgentSetupAuthStartParams as zp, TasksListParams as zr, SessionsResetParamsSchema as zs, WizardCancelParams as zt, ChatMessageGetParamsSchema as zu, SessionCatalogDescriptorSchema as zv, ModelsProbeTargetResultSchema as zw, UiCommandParams as zx, SessionSuggestionsListResult as zy };