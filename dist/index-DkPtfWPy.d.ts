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
//#region packages/gateway-protocol/src/clawhub-trust-error-details.d.ts
/** Structured ClawHub trust details carried in gateway error payloads. */
declare const ClawHubTrustErrorCodes: {
  readonly SECURITY_UNAVAILABLE: "clawhub_security_unavailable";
  readonly RISK_ACKNOWLEDGEMENT_REQUIRED: "clawhub_risk_acknowledgement_required";
  readonly DOWNLOAD_BLOCKED: "clawhub_download_blocked";
};
type ClawHubTrustErrorCode = (typeof ClawHubTrustErrorCodes)[keyof typeof ClawHubTrustErrorCodes];
type ClawHubTrustErrorDetails = {
  clawhubTrustCode?: ClawHubTrustErrorCode;
  version?: string;
  warning?: string;
};
declare function isClawHubTrustErrorCode(value: unknown): value is ClawHubTrustErrorCode;
declare function buildClawHubTrustErrorDetails(params: {
  code?: ClawHubTrustErrorCode;
  version?: string;
  warning?: string;
}): ClawHubTrustErrorDetails | undefined;
declare function readClawHubTrustErrorDetails(details: unknown): ClawHubTrustErrorDetails | undefined;
//#endregion
//#region packages/gateway-protocol/src/system-agent-error-details.d.ts
/** Structured system-agent details carried in gateway error payloads. */
declare const SystemAgentErrorDetailCodes: {
  readonly INFERENCE_UNAVAILABLE: "system_agent_inference_unavailable";
  readonly SESSION_INVALIDATED: "system_agent_session_invalidated";
};
type SystemAgentInferenceUnavailableErrorDetails = {
  code: typeof SystemAgentErrorDetailCodes.INFERENCE_UNAVAILABLE;
};
type SystemAgentSessionInvalidatedErrorDetails = {
  code: typeof SystemAgentErrorDetailCodes.SESSION_INVALIDATED;
};
declare function buildSystemAgentInferenceUnavailableErrorDetails(): SystemAgentInferenceUnavailableErrorDetails;
declare function buildSystemAgentSessionInvalidatedErrorDetails(): SystemAgentSessionInvalidatedErrorDetails;
declare function readSystemAgentInferenceUnavailableErrorDetails(details: unknown): SystemAgentInferenceUnavailableErrorDetails | undefined;
declare function readSystemAgentSessionInvalidatedErrorDetails(details: unknown): SystemAgentSessionInvalidatedErrorDetails | undefined;
//#endregion
//#region packages/gateway-protocol/src/gateway-error-details.d.ts
/** Gateway JSON-RPC style error codes shared by clients and server handlers. */
declare const ErrorCodes: {
  /** Client has not completed account/device linking for this gateway. */readonly NOT_LINKED: "NOT_LINKED"; /** Device exists but still needs an explicit pairing approval. */
  readonly NOT_PAIRED: "NOT_PAIRED"; /** Agent turn exceeded the gateway wait window. */
  readonly AGENT_TIMEOUT: "AGENT_TIMEOUT"; /** Request payload failed protocol validation or method preconditions. */
  readonly INVALID_REQUEST: "INVALID_REQUEST"; /** Authenticated caller lacks permission for the requested operation. */
  readonly FORBIDDEN: "FORBIDDEN"; /** Approval resolution referenced a missing or expired approval request. */
  readonly APPROVAL_NOT_FOUND: "APPROVAL_NOT_FOUND"; /** Gateway service or required backend is temporarily unavailable. */
  readonly UNAVAILABLE: "UNAVAILABLE";
};
/** Closed set of canonical gateway error code strings. */
type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
/** Stable discriminants for structured method-level failures. */
declare const GatewayErrorDetailCodes: {
  readonly MISSING_SCOPE: "MISSING_SCOPE";
  readonly MCP_APP_VIEW_EXPIRED: "MCP_APP_VIEW_EXPIRED";
  readonly SESSION_COMPANION_BUSY: "SESSION_COMPANION_BUSY";
  readonly UNKNOWN_AGENT_ID: "UNKNOWN_AGENT_ID";
  readonly WIZARD_NOT_FOUND: "WIZARD_NOT_FOUND";
};
/** Missing operator-scope details shared by WebSocket and HTTP responses. */
type MissingScopeErrorDetails = {
  code: typeof GatewayErrorDetailCodes.MISSING_SCOPE;
  missingScope: string;
  requiredScopes: string[];
};
type McpAppViewExpiredErrorDetails = {
  code: typeof GatewayErrorDetailCodes.MCP_APP_VIEW_EXPIRED;
};
/** Unknown agent details carried by agent-scoped method validation failures. */
type UnknownAgentIdErrorDetails = {
  code: typeof GatewayErrorDetailCodes.UNKNOWN_AGENT_ID;
  agentId: string;
};
/** Missing or expired process-local setup wizard session. */
type WizardNotFoundErrorDetails = {
  code: typeof GatewayErrorDetailCodes.WIZARD_NOT_FOUND;
};
/** Structured details emitted by method-level failures. */
type GatewayErrorDetails = MissingScopeErrorDetails | McpAppViewExpiredErrorDetails | UnknownAgentIdErrorDetails | WizardNotFoundErrorDetails;
/** Reads validated missing-scope details from an untrusted protocol payload. */
declare function readMissingScopeErrorDetails(details: unknown): MissingScopeErrorDetails | null;
declare function isMcpAppViewExpiredError(error: unknown): boolean;
/**
 * Reads a method-level missing-scope failure, preferring structured details.
 * The message fallback keeps clients compatible with gateways predating structured details.
 */
declare function readMissingScopeError(error: unknown): MissingScopeErrorDetails | null;
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
//#region packages/gateway-protocol/src/terminal-validators.d.ts
declare const validateTerminalOpenParams: ProtocolValidator<{
  agentId?: string | undefined;
  catalog?: {
    catalogId: string;
    threadId: string;
    hostId: string;
  } | undefined;
  cols: number;
  rows: number;
}>;
declare const validateTerminalInputParams: ProtocolValidator<{
  sessionId: string;
  data: string;
}>;
declare const validateTerminalResizeParams: ProtocolValidator<{
  sessionId: string;
  cols: number;
  rows: number;
}>;
declare const validateTerminalCloseParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTerminalAttachParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTerminalTextParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTerminalUploadParams: ProtocolValidator<{
  sessionId: string;
  name: string;
  contentBase64: string;
}>;
declare const validateTerminalUploadResult: ProtocolValidator<{
  path: string;
  size: number;
}>;
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
//#region packages/gateway-protocol/src/approval-result-validators.d.ts
declare const validateApprovalGetResult: ProtocolValidator<{
  approval: {
    id: string;
    status: "pending";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    urlPath: string;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "user";
    status: "allowed";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "allow-once" | "allow-always";
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "user" | "malformed-verdict" | "no-route" | "storage-corrupt";
    status: "denied";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "deny";
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "timeout";
    status: "expired";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "run-aborted" | "gateway-restart";
    status: "cancelled";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    urlPath: string;
    resolvedAtMs: number;
  };
}>;
declare const validateApprovalHistoryResult: ProtocolValidator<{
  nextCursor?: string | undefined;
  items: ({
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "user";
    status: "allowed";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "allow-once" | "allow-always";
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "user" | "malformed-verdict" | "no-route" | "storage-corrupt";
    status: "denied";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "deny";
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "timeout";
    status: "expired";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "run-aborted" | "gateway-restart";
    status: "cancelled";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    urlPath: string;
    resolvedAtMs: number;
  })[];
}>;
declare const validateApprovalResolveResult: ProtocolValidator<{
  applied: boolean;
  approval: {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "user";
    status: "allowed";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "allow-once" | "allow-always";
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "user" | "malformed-verdict" | "no-route" | "storage-corrupt";
    status: "denied";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "deny";
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "timeout";
    status: "expired";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "channel" | "runtime" | "system" | "device";
    } | undefined;
    id: string;
    reason: "run-aborted" | "gateway-restart";
    status: "cancelled";
    createdAtMs: number;
    expiresAtMs: number;
    presentation: {
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      host?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      detail?: string | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    urlPath: string;
    resolvedAtMs: number;
  };
}>;
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
//#region packages/gateway-protocol/src/schema/frames.d.ts
declare const GATEWAY_SERVER_CAPS: {
  readonly BOARD_WIDGET_PUT_CANVAS_DOC: "board-widget-put-canvas-doc";
  readonly CHAT_SEND_ROUTING_CONTRACT: "chat-send-routing-contract";
  readonly SYSTEM_AGENT_SETUP_MODEL_REF: "openclaw-setup-model-ref";
};
/**
 * Top-level gateway frame schemas.
 *
 * These are the WebSocket envelope contracts; method/event payload schemas live
 * in feature-specific modules and are referenced by runtime validators.
 */
/** Periodic server heartbeat event payload. */
declare const TickEventSchema: Type.TObject<{
  ts: Type.TInteger;
}>;
/** Server shutdown notice event payload. */
declare const ShutdownEventSchema: Type.TObject<{
  reason: Type.TString;
  restartExpectedMs: Type.TOptional<Type.TInteger>;
}>;
/** Initial client hello/connect payload sent before the gateway accepts frames. */
declare const ConnectParamsSchema: Type.TObject<{
  minProtocol: Type.TInteger;
  maxProtocol: Type.TInteger;
  client: Type.TObject<{
    id: Type.TEnum<["webchat-ui", "openclaw-control-ui", "openclaw-browser-copilot", "openclaw-tui", "webchat", "cli", "gateway-client", "openclaw-macos", "openclaw-linux", "openclaw-ios", "openclaw-watchos", "openclaw-android", "node-host", "openclaw-worker", "test", "fingerprint", "openclaw-probe"]>;
    displayName: Type.TOptional<Type.TString>;
    version: Type.TString;
    platform: Type.TString;
    deviceFamily: Type.TOptional<Type.TString>;
    modelIdentifier: Type.TOptional<Type.TString>;
    mode: Type.TEnum<["webchat", "cli", "worker", "test", "probe", "ui", "backend", "node"]>;
    instanceId: Type.TOptional<Type.TString>;
  }>;
  caps: Type.TOptional<Type.TArray<Type.TString>>;
  commands: Type.TOptional<Type.TArray<Type.TString>>;
  permissions: Type.TOptional<Type.TRecord<"^.*$", Type.TBoolean>>;
  pathEnv: Type.TOptional<Type.TString>;
  role: Type.TOptional<Type.TString>;
  scopes: Type.TOptional<Type.TArray<Type.TString>>;
  device: Type.TOptional<Type.TObject<{
    id: Type.TString;
    publicKey: Type.TString;
    signature: Type.TString;
    signedAt: Type.TInteger;
    nonce: Type.TString;
  }>>;
  auth: Type.TOptional<Type.TObject<{
    token: Type.TOptional<Type.TString>;
    bootstrapToken: Type.TOptional<Type.TString>;
    deviceToken: Type.TOptional<Type.TString>;
    password: Type.TOptional<Type.TString>;
    approvalRuntimeToken: Type.TOptional<Type.TString>;
    agentRuntimeIdentityToken: Type.TOptional<Type.TString>;
  }>>;
  locale: Type.TOptional<Type.TString>;
  userAgent: Type.TOptional<Type.TString>;
}>;
/** Successful gateway hello response with negotiated protocol and initial state. */
declare const HelloOkSchema: Type.TObject<{
  type: Type.TLiteral<"hello-ok">;
  protocol: Type.TInteger;
  server: Type.TObject<{
    version: Type.TString;
    connId: Type.TString;
  }>;
  features: Type.TObject<{
    methods: Type.TArray<Type.TString>;
    events: Type.TArray<Type.TString>;
    capabilities: Type.TOptional<Type.TArray<Type.TString>>;
  }>;
  snapshot: Type.TObject<{
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
        id: Type.TString;
        email: Type.TOptional<Type.TString>;
        name: Type.TOptional<Type.TString>;
        avatarUrl: Type.TOptional<Type.TString>;
      }>>;
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
    uptimeMs: Type.TInteger;
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
  controlUiTabs: Type.TOptional<Type.TArray<Type.TObject<{
    pluginId: Type.TString;
    id: Type.TString;
    label: Type.TString;
    description: Type.TOptional<Type.TString>;
    icon: Type.TOptional<Type.TString>;
    path: Type.TOptional<Type.TString>;
    requiresGatewayAuth: Type.TOptional<Type.TBoolean>;
    group: Type.TOptional<Type.TUnion<[Type.TLiteral<"control">, Type.TLiteral<"agent">]>>;
    order: Type.TOptional<Type.TNumber>;
  }>>>;
  controlUiWidgetKinds: Type.TOptional<Type.TArray<Type.TObject<{
    pluginId: Type.TString;
    kind: Type.TString;
    label: Type.TString;
  }>>>;
  pluginSurfaceUrls: Type.TOptional<Type.TRecord<"^.*$", Type.TString>>;
  deviceAuthMigration: Type.TOptional<Type.TObject<{
    pending: Type.TLiteral<true>;
  }>>;
  auth: Type.TObject<{
    deviceToken: Type.TOptional<Type.TString>;
    role: Type.TString;
    scopes: Type.TArray<Type.TString>;
    issuedAtMs: Type.TOptional<Type.TInteger>;
    deviceTokens: Type.TOptional<Type.TArray<Type.TObject<{
      deviceToken: Type.TString;
      role: Type.TString;
      scopes: Type.TArray<Type.TString>;
      issuedAtMs: Type.TInteger;
    }>>>;
  }>;
  policy: Type.TObject<{
    maxPayload: Type.TInteger;
    maxBufferedBytes: Type.TInteger;
    tickIntervalMs: Type.TInteger;
    attachments: Type.TOptional<Type.TObject<{
      maxBytes: Type.TInteger;
      maxImageBytes: Type.TInteger;
    }>>;
    allowedSessionVisibilities: Type.TOptional<Type.TArray<Type.TUnion<[Type.TLiteral<"shared">, Type.TLiteral<"read-only">, Type.TLiteral<"suggest">, Type.TLiteral<"draft">]>>>;
    hasMultipleSessionSharingIdentities: Type.TOptional<Type.TBoolean>;
  }>;
}>;
/** Standard structured error shape used in response frames and connect failures. */
declare const ErrorShapeSchema: Type.TObject<{
  code: Type.TString;
  message: Type.TString;
  details: Type.TOptional<Type.TUnknown>;
  retryable: Type.TOptional<Type.TBoolean>;
  retryAfterMs: Type.TOptional<Type.TInteger>;
}>;
/** Client request frame envelope; `method` selects the payload validator. */
declare const RequestFrameSchema: Type.TObject<{
  type: Type.TLiteral<"req">;
  id: Type.TString;
  method: Type.TString;
  params: Type.TOptional<Type.TUnknown>;
  traceparent: Type.TOptional<Type.TString>;
}>;
/** Server response frame envelope paired with a prior request id. */
declare const ResponseFrameSchema: Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TBoolean;
  payload: Type.TOptional<Type.TUnknown>;
  error: Type.TOptional<Type.TObject<{
    code: Type.TString;
    message: Type.TString;
    details: Type.TOptional<Type.TUnknown>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>>;
}>;
/** Server event frame envelope; `event` selects the payload validator. */
declare const EventFrameSchema: Type.TObject<{
  type: Type.TLiteral<"event">;
  event: Type.TString;
  payload: Type.TOptional<Type.TUnknown>;
  seq: Type.TOptional<Type.TInteger>;
  stateVersion: Type.TOptional<Type.TObject<{
    presence: Type.TInteger;
    health: Type.TInteger;
  }>>;
}>;
declare const GatewayFrameSchema: Type.TUnion<[Type.TObject<{
  type: Type.TLiteral<"req">;
  id: Type.TString;
  method: Type.TString;
  params: Type.TOptional<Type.TUnknown>;
  traceparent: Type.TOptional<Type.TString>;
}>, Type.TObject<{
  type: Type.TLiteral<"res">;
  id: Type.TString;
  ok: Type.TBoolean;
  payload: Type.TOptional<Type.TUnknown>;
  error: Type.TOptional<Type.TObject<{
    code: Type.TString;
    message: Type.TString;
    details: Type.TOptional<Type.TUnknown>;
    retryable: Type.TOptional<Type.TBoolean>;
    retryAfterMs: Type.TOptional<Type.TInteger>;
  }>>;
}>, Type.TObject<{
  type: Type.TLiteral<"event">;
  event: Type.TString;
  payload: Type.TOptional<Type.TUnknown>;
  seq: Type.TOptional<Type.TInteger>;
  stateVersion: Type.TOptional<Type.TObject<{
    presence: Type.TInteger;
    health: Type.TInteger;
  }>>;
}>]>;
type ConnectParams = Static<typeof ConnectParamsSchema>;
type HelloOk = Static<typeof HelloOkSchema>;
type ErrorShape = Static<typeof ErrorShapeSchema>;
type RequestFrame = Static<typeof RequestFrameSchema>;
type ResponseFrame = Static<typeof ResponseFrameSchema>;
type EventFrame = Static<typeof EventFrameSchema>;
type GatewayFrame = Static<typeof GatewayFrameSchema>;
type TickEvent = Static<typeof TickEventSchema>;
type ShutdownEvent = Static<typeof ShutdownEventSchema>;
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
//#region packages/gateway-protocol/src/migration-api.d.ts
declare const validateMigrationsMemoryPlanParams: ProtocolValidator<{
  overwrite?: boolean | undefined;
  agentId: string;
}>;
declare const validateMigrationsMemoryApplyParams: ProtocolValidator<{
  overwrite?: boolean | undefined;
  agentId: string;
  idempotencyKey: string;
  providerId: string;
  planFingerprint: string;
  itemIds: string[];
}>;
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
  sessionKey?: string | undefined;
  reason?: string | undefined;
  idempotencyKey?: string | undefined;
  mode?: string | undefined;
  version?: string | undefined;
  platform?: string | undefined;
  deviceFamily?: string | undefined;
  modelIdentifier?: string | undefined;
  wake?: boolean | undefined;
  host?: string | undefined;
  instanceId?: string | undefined;
  scopes?: string[] | undefined;
  ip?: string | undefined;
  lastInputSeconds?: number | undefined;
  tags?: string[] | undefined;
  deviceId?: string | undefined;
  roles?: string[] | undefined;
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
//#region packages/gateway-protocol/src/validator-registry.d.ts
declare const validateCommandsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  provider?: string | undefined;
  scope?: "text" | "native" | "both" | undefined;
  includeArgs?: boolean | undefined;
}>;
declare const validateConnectParams: ProtocolValidator<{
  auth?: {
    token?: string | undefined;
    bootstrapToken?: string | undefined;
    deviceToken?: string | undefined;
    password?: string | undefined;
    approvalRuntimeToken?: string | undefined;
    agentRuntimeIdentityToken?: string | undefined;
  } | undefined;
  role?: string | undefined;
  permissions?: Record<string, boolean> | undefined;
  commands?: string[] | undefined;
  caps?: string[] | undefined;
  pathEnv?: string | undefined;
  scopes?: string[] | undefined;
  device?: {
    id: string;
    publicKey: string;
    signature: string;
    signedAt: number;
    nonce: string;
  } | undefined;
  locale?: string | undefined;
  userAgent?: string | undefined;
  minProtocol: number;
  maxProtocol: number;
  client: {
    displayName?: string | undefined;
    deviceFamily?: string | undefined;
    modelIdentifier?: string | undefined;
    instanceId?: string | undefined;
    id: "webchat-ui" | "openclaw-control-ui" | "openclaw-browser-copilot" | "openclaw-tui" | "webchat" | "cli" | "gateway-client" | "openclaw-macos" | "openclaw-linux" | "openclaw-ios" | "openclaw-watchos" | "openclaw-android" | "node-host" | "openclaw-worker" | "test" | "fingerprint" | "openclaw-probe";
    mode: "webchat" | "cli" | "test" | "ui" | "backend" | "node" | "worker" | "probe";
    version: string;
    platform: string;
  };
}>;
declare const validateWorkerAdmissionHandshake: ProtocolValidator<{
  bundleHash: string;
  openclawVersion: string;
  protocolFeatures: string[];
}>;
declare const validateWorkerConnectRequestFrame: ProtocolValidator<{
  id: string;
  type: "req";
  params: {
    role: "worker";
    minProtocol: number;
    maxProtocol: number;
    client: {
      id: "openclaw-worker";
      mode: "worker";
      version: string;
      platform: string;
    };
    admission: {
      runId: null;
      sessionId: null;
      credential: string;
      environmentId: string;
      ownerEpoch: number;
      rpcSetVersion: number;
      handshake: {
        bundleHash: string;
        openclawVersion: string;
        protocolFeatures: string[];
      };
    } | {
      runId: string;
      sessionId: string;
      credential: string;
      environmentId: string;
      ownerEpoch: number;
      rpcSetVersion: number;
      handshake: {
        bundleHash: string;
        openclawVersion: string;
        protocolFeatures: string[];
      };
    };
  };
  method: "connect";
}>;
declare const validateWorkerHeartbeatParams: ProtocolValidator<{
  status: "ready" | "busy" | "draining";
  sentAtMs: number;
}>;
declare const validateWorkerTranscriptCommitParams: ProtocolValidator<{
  seq: number;
  messages: ({
    content: ({
      textSignature?: string | undefined;
      type: "text";
      text: string;
    } | {
      type: "image";
      mimeType: string;
      data: string;
    })[];
    role: "user";
    timestamp: number;
  } | {
    diagnostics?: {
      error?: {
        name?: string | undefined;
        code?: string | number | undefined;
        stack?: string | undefined;
        message: string;
      } | undefined;
      details?: Record<string, unknown> | undefined;
      type: string;
      timestamp: number;
    }[] | undefined;
    errorCode?: string | undefined;
    errorType?: string | undefined;
    errorMessage?: string | undefined;
    errorBody?: string | undefined;
    responseModel?: string | undefined;
    responseId?: string | undefined;
    model: string;
    content: ({
      textSignature?: string | undefined;
      type: "text";
      text: string;
    } | {
      redacted?: boolean | undefined;
      thinkingSignature?: string | undefined;
      type: "thinking";
      thinking: string;
    } | {
      executionMode?: "sequential" | "parallel" | undefined;
      thoughtSignature?: string | undefined;
      id: string;
      name: string;
      type: "toolCall";
      arguments: Record<string, unknown>;
    })[];
    role: "assistant";
    timestamp: number;
    provider: string;
    api: string;
    stopReason: "length" | "error" | "stop" | "toolUse" | "aborted";
    usage: {
      contextUsage?: {
        state: "available";
        totalTokens: number;
        promptTokens: number;
      } | {
        state: "unavailable";
      } | undefined;
      input: number;
      output: number;
      totalTokens: number;
      cost: {
        totalOrigin?: "provider-billed" | undefined;
        input: number;
        output: number;
        total: number;
        cacheRead: number;
        cacheWrite: number;
      };
      cacheRead: number;
      cacheWrite: number;
    };
  } | {
    details?: unknown;
    content: ({
      textSignature?: string | undefined;
      type: "text";
      text: string;
    } | {
      type: "image";
      mimeType: string;
      data: string;
    })[];
    role: "toolResult";
    timestamp: number;
    toolCallId: string;
    toolName: string;
    isError: boolean;
  })[];
  runEpoch: number;
  baseLeafId: string | null;
}>;
declare const validateWorkerLiveEventParams: ProtocolValidator<{
  readonly runId: string;
  readonly event: {
    readonly kind: "assistant";
    readonly payload: {
      readonly replace?: true | undefined;
      readonly phase?: "commentary" | "final_answer" | undefined;
      readonly mediaUrls?: string[] | undefined;
      readonly itemId?: string | undefined;
      readonly text: string;
      readonly delta: string;
    };
  } | {
    readonly kind: "thinking";
    readonly payload: {
      readonly text: string;
      readonly delta: string;
    };
  } | {
    readonly kind: "tool";
    readonly payload: {
      readonly hideFromChannelProgress?: true | undefined;
      readonly name: string;
      readonly phase: "start";
      readonly toolCallId: string;
      readonly args: unknown;
    } | {
      readonly hideFromChannelProgress?: true | undefined;
      readonly name: string;
      readonly phase: "update";
      readonly toolCallId: string;
      readonly partialResult: unknown;
    } | {
      readonly meta?: string | undefined;
      readonly hideFromChannelProgress?: true | undefined;
      readonly toolErrorSummary?: string | undefined;
      readonly name: string;
      readonly phase: "result";
      readonly toolCallId: string;
      readonly result: unknown;
      readonly isError: boolean;
    };
  } | {
    readonly kind: "approval";
    readonly payload: {
      readonly message?: string | undefined;
      readonly reason?: string | undefined;
      readonly command?: string | undefined;
      readonly toolCallId?: string | undefined;
      readonly host?: string | undefined;
      readonly scope?: "session" | "turn" | undefined;
      readonly approvalId?: string | undefined;
      readonly itemId?: string | undefined;
      readonly approvalSlug?: string | undefined;
      readonly kind: "unknown" | "exec" | "plugin";
      readonly title: string;
      readonly phase: "requested";
      readonly status: "unavailable" | "pending";
    } | {
      readonly message?: string | undefined;
      readonly reason?: string | undefined;
      readonly command?: string | undefined;
      readonly toolCallId?: string | undefined;
      readonly host?: string | undefined;
      readonly scope?: "session" | "turn" | undefined;
      readonly approvalId?: string | undefined;
      readonly itemId?: string | undefined;
      readonly approvalSlug?: string | undefined;
      readonly kind: "unknown" | "exec" | "plugin";
      readonly title: string;
      readonly phase: "resolved";
      readonly status: "failed" | "denied" | "approved";
    };
  } | {
    readonly kind: "lifecycle";
    readonly payload: {
      readonly phase: "start";
      readonly startedAt: number;
    } | {
      readonly phase: "fallback";
      readonly attemptSummaries: string[];
      readonly attempts: {
        readonly code?: string | undefined;
        readonly reason?: "timeout" | "unknown" | "auth" | "auth_permanent" | "format" | "rate_limit" | "overloaded" | "billing" | "server_error" | "context_overflow" | "model_not_found" | "session_expired" | "empty_response" | "no_error_details" | "unclassified" | undefined;
        readonly status?: number | undefined;
        readonly authMode?: string | undefined;
        readonly error: string;
        readonly model: string;
        readonly provider: string;
      }[];
      readonly reasonSummary: string;
      readonly selectedProvider: string;
      readonly selectedModel: string;
      readonly activeProvider: string;
      readonly activeModel: string;
    } | {
      readonly previousActiveModel?: string | undefined;
      readonly phase: "fallback_cleared";
      readonly selectedProvider: string;
      readonly selectedModel: string;
      readonly activeProvider: string;
      readonly activeModel: string;
    } | {
      readonly fallbackStepToModel?: string | undefined;
      readonly fallbackStepFromFailureReason?: "timeout" | "unknown" | "auth" | "auth_permanent" | "format" | "rate_limit" | "overloaded" | "billing" | "server_error" | "context_overflow" | "model_not_found" | "session_expired" | "empty_response" | "no_error_details" | "unclassified" | undefined;
      readonly fallbackStepFromFailureDetail?: string | undefined;
      readonly fallbackStepChainPosition?: number | undefined;
      readonly phase: "fallback_step";
      readonly fallbackStepType: "fallback_step";
      readonly fallbackStepFinalOutcome: "next_fallback" | "succeeded" | "chain_exhausted";
      readonly fallbackStepFromModel: string;
    } | {
      readonly error?: string | undefined;
      readonly stopReason?: string | undefined;
      readonly aborted?: boolean | undefined;
      readonly startedAt?: number | undefined;
      readonly toolErrorSummary?: string | undefined;
      readonly yielded?: true | undefined;
      readonly timeoutPhase?: "provider" | "queue" | "preflight" | "post_turn" | "gateway_draining" | undefined;
      readonly providerStarted?: boolean | undefined;
      readonly livenessState?: "blocked" | "working" | "paused" | "abandoned" | undefined;
      readonly replayInvalid?: true | undefined;
      readonly phase: "finishing";
      readonly endedAt: number;
    } | {
      readonly stopReason?: string | undefined;
      readonly aborted?: boolean | undefined;
      readonly startedAt?: number | undefined;
      readonly toolErrorSummary?: string | undefined;
      readonly yielded?: true | undefined;
      readonly timeoutPhase?: "provider" | "queue" | "preflight" | "post_turn" | "gateway_draining" | undefined;
      readonly providerStarted?: boolean | undefined;
      readonly livenessState?: "blocked" | "working" | "paused" | "abandoned" | undefined;
      readonly replayInvalid?: true | undefined;
      readonly phase: "end";
      readonly endedAt: number;
    } | {
      readonly stopReason?: string | undefined;
      readonly aborted?: boolean | undefined;
      readonly startedAt?: number | undefined;
      readonly toolErrorSummary?: string | undefined;
      readonly yielded?: true | undefined;
      readonly timeoutPhase?: "provider" | "queue" | "preflight" | "post_turn" | "gateway_draining" | undefined;
      readonly providerStarted?: boolean | undefined;
      readonly livenessState?: "blocked" | "working" | "paused" | "abandoned" | undefined;
      readonly replayInvalid?: true | undefined;
      readonly fallbackExhaustedFailure?: true | undefined;
      readonly error: string;
      readonly phase: "error";
      readonly endedAt: number;
    };
  };
  readonly seq: number;
  readonly runEpoch: number;
  readonly lastAckedSeq: number;
}>;
declare const validateGatewaySuspendPrepareParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateGatewaySuspendStatusParams: ProtocolValidator<{
  suspensionId: string;
}>;
declare const validateGatewaySuspendResumeParams: ProtocolValidator<{
  suspensionId: string;
}>;
declare const validateRequestFrame: ProtocolValidator<{
  params?: unknown;
  traceparent?: string | undefined;
  id: string;
  type: "req";
  method: string;
}>;
declare const validateMessageActionParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  sessionId?: string | undefined;
  accountId?: string | undefined;
  conversationReadOrigin?: "direct-operator" | undefined;
  requesterAccountId?: string | undefined;
  requesterSenderId?: string | undefined;
  senderIsOwner?: boolean | undefined;
  inboundTurnKind?: string | undefined;
  toolContext?: {
    currentChannelId?: string | undefined;
    currentMessagingTarget?: string | undefined;
    currentGraphChannelId?: string | undefined;
    currentChannelProvider?: string | undefined;
    currentThreadTs?: string | undefined;
    currentMessageId?: string | number | undefined;
    replyToMode?: "off" | "all" | "first" | "batched" | undefined;
    hasRepliedRef?: {
      value: boolean;
    } | undefined;
    sameChannelThreadRequired?: boolean | undefined;
    skipCrossContextDecoration?: boolean | undefined;
  } | undefined;
  channel: string;
  params: Record<string, unknown>;
  idempotencyKey: string;
  action: string;
}>;
declare const validateSendParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  channel?: string | undefined;
  accountId?: string | undefined;
  message?: string | undefined;
  silent?: boolean | undefined;
  threadId?: string | undefined;
  mediaUrls?: string[] | undefined;
  mediaUrl?: string | undefined;
  buffer?: string | undefined;
  filename?: string | undefined;
  contentType?: string | undefined;
  asVoice?: boolean | undefined;
  gifPlayback?: boolean | undefined;
  replyToId?: string | undefined;
  forceDocument?: boolean | undefined;
  parseMode?: "HTML" | undefined;
  idempotencyKey: string;
  to: string;
}>;
declare const validateConversationListParams: ProtocolValidator<{
  channel?: string | undefined;
  limit?: number | undefined;
  query?: string | undefined;
  agentId: string;
}>;
declare const validateConversationSendParams: ProtocolValidator<{
  sourceSessionKey?: string | undefined;
  agentId: string;
  message: string;
  operationId: string;
  conversationRef: string;
}>;
declare const validateConversationTurnCancelParams: ProtocolValidator<{
  agentId: string;
  turnId: string;
}>;
declare const validateConversationTurnParams: ProtocolValidator<{
  sourceSessionKey?: string | undefined;
  agentId: string;
  message: string;
  timeoutMs: number;
  turnId: string;
  conversationRef: string;
}>;
declare const validatePollParams: ProtocolValidator<{
  channel?: string | undefined;
  accountId?: string | undefined;
  silent?: boolean | undefined;
  threadId?: string | undefined;
  maxSelections?: number | undefined;
  durationSeconds?: number | undefined;
  durationHours?: number | undefined;
  isAnonymous?: boolean | undefined;
  options: string[];
  question: string;
  idempotencyKey: string;
  to: string;
}>;
declare const validateAgentParams: ProtocolValidator<{
  timeout?: number | undefined;
  attachments?: unknown[] | undefined;
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  sessionId?: string | undefined;
  channel?: string | undefined;
  accountId?: string | undefined;
  model?: string | undefined;
  label?: string | undefined;
  thinking?: string | undefined;
  to?: string | undefined;
  provider?: string | undefined;
  cwd?: string | undefined;
  replyTo?: string | undefined;
  threadId?: string | undefined;
  expectedExistingSessionId?: string | undefined;
  deliver?: boolean | undefined;
  replyChannel?: string | undefined;
  replyAccountId?: string | undefined;
  groupId?: string | undefined;
  groupChannel?: string | undefined;
  groupSpace?: string | undefined;
  bestEffortDeliver?: boolean | undefined;
  lane?: string | undefined;
  cleanupBundleMcpOnRunEnd?: boolean | undefined;
  modelRun?: boolean | undefined;
  promptMode?: "none" | "full" | "minimal" | undefined;
  extraSystemPrompt?: string | undefined;
  bootstrapContextMode?: "full" | "lightweight" | undefined;
  bootstrapContextRunKind?: "cron" | "default" | "heartbeat" | undefined;
  acpTurnSource?: "manual_spawn" | undefined;
  internalRuntimeHandoffId?: string | undefined;
  execApprovalFollowupExpectedSessionId?: string | undefined;
  internalEvents?: {
    attachments?: {
      name?: string | undefined;
      url?: string | undefined;
      type?: string | undefined;
      path?: string | undefined;
      mimeType?: string | undefined;
      sizeBytes?: number | undefined;
      durationMs?: number | undefined;
      width?: number | undefined;
      height?: number | undefined;
      mediaUrl?: string | undefined;
      filePath?: string | undefined;
    }[] | undefined;
    mediaUrls?: string[] | undefined;
    childSessionId?: string | undefined;
    statsLine?: string | undefined;
    childSessionKey: string;
    type: "task_completion";
    status: string;
    result: string;
    source: string;
    announceType: string;
    taskLabel: string;
    statusLabel: string;
    replyInstruction: string;
  }[] | undefined;
  inputProvenance?: {
    sourceTool?: string | undefined;
    sourceSessionKey?: string | undefined;
    originSessionId?: string | undefined;
    sourceChannel?: string | undefined;
    kind: string;
  } | undefined;
  suppressPromptPersistence?: boolean | undefined;
  sessionEffects?: "visible" | "internal" | undefined;
  sourceReplyDeliveryMode?: "automatic" | "message_tool_only" | undefined;
  disableMessageTool?: boolean | undefined;
  swarmCollector?: boolean | undefined;
  swarmOutputSchema?: Record<string, unknown> | undefined;
  forceRestartSafeTools?: boolean | undefined;
  forceCodeModeTools?: boolean | undefined;
  voiceWakeTrigger?: string | undefined;
  message: string;
  idempotencyKey: string;
}>;
declare const validateAuditActivityListParams: ProtocolValidator<AuditActivityListParams>;
declare const validateAuditListParams: ProtocolValidator<{
  kind?: "agent_run" | "tool_action" | undefined;
  runId?: string | undefined;
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  status?: "unknown" | "failed" | "blocked" | "cancelled" | "started" | "succeeded" | "timed_out" | undefined;
  limit?: number | undefined;
  after?: number | undefined;
  before?: number | undefined;
  cursor?: string | undefined;
}>;
declare const validateUsersListParams: ProtocolValidator<object>;
declare const validateUsersSelfParams: ProtocolValidator<object>;
declare const validateUsersSelfResult: ProtocolValidator<{
  profile: {
    id: string;
    updatedAt: number;
    createdAt: number;
    displayName: string | null;
    avatarMime: "image/png" | "image/jpeg" | "image/webp" | null;
    mergedInto: string | null;
    emails: string[];
    hasAvatar: boolean;
  };
}>;
declare const validateUsersLinkEmailParams: ProtocolValidator<{
  email: string;
  targetProfileId: string;
}>;
declare const validateUsersLinkEmailResult: ProtocolValidator<{
  profile: {
    id: string;
    updatedAt: number;
    createdAt: number;
    displayName: string | null;
    avatarMime: "image/png" | "image/jpeg" | "image/webp" | null;
    mergedInto: string | null;
    emails: string[];
    hasAvatar: boolean;
  };
}>;
declare const validateUsersSetDisplayNameParams: ProtocolValidator<{
  displayName: string | null;
  profileId: string;
}>;
declare const validateUsersSetDisplayNameResult: ProtocolValidator<{
  profile: {
    id: string;
    updatedAt: number;
    createdAt: number;
    displayName: string | null;
    avatarMime: "image/png" | "image/jpeg" | "image/webp" | null;
    mergedInto: string | null;
    emails: string[];
    hasAvatar: boolean;
  };
}>;
declare const validateUsersSetAvatarParams: ProtocolValidator<{
  profileId: string;
  mime: "image/png" | "image/jpeg" | "image/webp";
  avatarBase64: string;
}>;
declare const validateUsersSetAvatarResult: ProtocolValidator<{
  profile: {
    id: string;
    updatedAt: number;
    createdAt: number;
    displayName: string | null;
    avatarMime: "image/png" | "image/jpeg" | "image/webp" | null;
    mergedInto: string | null;
    emails: string[];
    hasAvatar: boolean;
  };
}>;
declare const validateAgentIdentityParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
}>;
declare const validateAgentWaitParams: ProtocolValidator<{
  timeoutMs?: number | undefined;
  runId: string;
}>;
declare const validateWakeParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  text: string;
  mode: "now" | "next-heartbeat";
}>;
declare const validateAgentsListParams: ProtocolValidator<object>;
declare const validateWorktreesListParams: ProtocolValidator<object>;
declare const validateBoardGetParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateBoardUpdateParams: ProtocolValidator<{
  sessionKey: string;
  ops: ({
    chatDock?: "left" | "right" | "bottom" | "hidden" | undefined;
    kind: "tab_create";
    title: string;
    tabId: string;
  } | {
    title?: string | undefined;
    position?: number | undefined;
    chatDock?: "left" | "right" | "bottom" | "hidden" | undefined;
    kind: "tab_update";
    tabId: string;
  } | {
    kind: "tab_delete";
    tabId: string;
  } | {
    kind: "tabs_reorder";
    tabIds: string[];
  } | {
    position?: number | undefined;
    tabId?: string | undefined;
    after?: string | undefined;
    kind: "widget_move";
    name: string;
  } | {
    heightMode?: "fixed" | "auto" | undefined;
    kind: "widget_resize";
    name: string;
    sizeW: number;
    sizeH: number;
  } | {
    kind: "widget_remove";
    name: string;
  })[];
}>;
declare const validateBoardWidgetContent: ProtocolValidator<{
  kind: "html";
  html: string;
} | {
  kind: "mcp-app";
  descriptor: {
    toolCallId: string;
    toolName: string;
    serverName: string;
    uiResourceUri: string;
  };
} | {
  props?: Record<string, unknown> | undefined;
  kind: "plugin";
  pluginKind: string;
}>;
declare const validateBoardWidgetAppViewParams: ProtocolValidator<{
  sessionKey: string;
  name: string;
  revision: number;
  instanceId: string;
}>;
declare const validateBoardWidgetPutParams: ProtocolValidator<{
  title?: string | undefined;
  presentation?: "card" | "full-bleed" | "frameless" | undefined;
  heightMode?: "fixed" | "auto" | undefined;
  declared?: {
    tools?: string[] | undefined;
    netOrigins?: string[] | undefined;
  } | undefined;
  placement?: {
    size?: "full" | "sm" | "md" | "lg" | "xl" | undefined;
    tabId?: string | undefined;
    after?: string | undefined;
  } | undefined;
  generatedIdentity?: {
    key: string;
    source: "show_widget";
    fallbackName: string;
  } | undefined;
  sessionKey: string;
  name: string;
  content: {
    kind: "html";
    html: string;
  } | {
    props?: Record<string, unknown> | undefined;
    kind: "plugin";
    pluginKind: string;
  } | {
    kind: "mcp-app";
    viewId: string;
  } | {
    kind: "canvas-doc";
    docId: string;
  };
}>;
declare const validateBoardWidgetGrantParams: ProtocolValidator<{
  sessionKey: string;
  name: string;
  revision: number;
  instanceId: string;
  decision: "rejected" | "granted";
}>;
declare const validateBoardEventParams: ProtocolValidator<{
  sessionKey: string;
  payload: unknown;
  widget: string;
} | {
  payload: unknown;
  ticket: string;
}>;
declare const validateBoardPromptAuthorizeParams: ProtocolValidator<{
  ticket: string;
}>;
declare const validateBoardDataReadParams: ProtocolValidator<{
  params?: Record<string, unknown> | undefined;
  ticket: string;
  bindingId: string;
}>;
declare const validateBoardActionParams: ProtocolValidator<{
  jobId: string;
  action: "cron.trigger";
  ticket: string;
} | {
  params?: Record<string, unknown> | undefined;
  action: string;
  ticket: string;
}>;
declare const validateWorktreesCreateParams: ProtocolValidator<{
  name?: string | undefined;
  baseRef?: string | undefined;
  repoRoot: string;
}>;
declare const validateWorktreesRemoveParams: ProtocolValidator<{
  force?: boolean | undefined;
  id: string;
}>;
declare const validateWorktreesRestoreParams: ProtocolValidator<{
  id: string;
}>;
declare const validateWorktreesGcParams: ProtocolValidator<object>;
declare const validateWorktreesBranchesParams: ProtocolValidator<{
  includeRepositoryStatus?: boolean | undefined;
  repoRoot: string;
}>;
declare const validateFsListDirParams: ProtocolValidator<{
  path?: string | undefined;
  nodeId?: string | undefined;
}>;
declare const validateFsListDirResult: ProtocolValidator<{
  parent?: string | undefined;
  entries: {
    hidden?: boolean | undefined;
    name: string;
    path: string;
  }[];
  path: string;
  home: string;
}>;
declare const validateAgentsCreateParams: ProtocolValidator<{
  model?: string | undefined;
  workspace?: string | undefined;
  emoji?: string | undefined;
  avatar?: string | undefined;
  name: string;
}>;
declare const validateAgentsUpdateParams: ProtocolValidator<{
  model?: string | null | undefined;
  workspace?: string | undefined;
  name?: string | undefined;
  emoji?: string | undefined;
  avatar?: string | undefined;
  agentId: string;
}>;
declare const validateAgentsDeleteParams: ProtocolValidator<{
  deleteFiles?: boolean | undefined;
  agentId: string;
}>;
declare const validateAgentsFilesListParams: ProtocolValidator<{
  agentId: string;
}>;
declare const validateAgentsFilesGetParams: ProtocolValidator<{
  agentId: string;
  name: string;
}>;
declare const validateAgentsFilesSetParams: ProtocolValidator<{
  agentId: string;
  name: string;
  content: string;
}>;
declare const validateAgentsWorkspaceListParams: ProtocolValidator<{
  path?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  agentId: string;
}>;
declare const validateAgentsWorkspaceGetParams: ProtocolValidator<{
  agentId: string;
  path: string;
}>;
declare const validateArtifactsListParams: ProtocolValidator<{
  runId?: string | undefined;
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  taskId?: string | undefined;
}>;
declare const validateArtifactsGetParams: ProtocolValidator<{
  runId?: string | undefined;
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  taskId?: string | undefined;
  artifactId: string;
}>;
declare const validateArtifactsDownloadParams: ProtocolValidator<{
  runId?: string | undefined;
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  taskId?: string | undefined;
  artifactId: string;
}>;
declare const validateNodePairListParams: ProtocolValidator<object>;
declare const validateNodePairApproveParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateNodePairRejectParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateNodePairRemoveParams: ProtocolValidator<{
  nodeId: string;
}>;
declare const validateNodeRenameParams: ProtocolValidator<{
  displayName: string;
  nodeId: string;
}>;
declare const validateNodeListParams: ProtocolValidator<object>;
declare const validateNodePluginToolsUpdateParams: ProtocolValidator<{
  tools: {
    parameters?: Record<string, unknown> | undefined;
    command?: string | undefined;
    mcp?: {
      server: string;
      tool: string;
    } | undefined;
    name: string;
    description: string;
    pluginId: string;
  }[];
}>;
declare const validateNodeSkillsUpdateParams: ProtocolValidator<{
  skills: {
    name: string;
    description: string;
    content: string;
  }[];
}>;
declare const validateEnvironmentsCreateParams: ProtocolValidator<{
  idempotencyKey: string;
  profileId: string;
}>;
declare const validateEnvironmentsDestroyParams: ProtocolValidator<{
  force?: boolean | undefined;
  environmentId: string;
}>;
declare const validateEnvironmentsListParams: ProtocolValidator<object>;
declare const validateEnvironmentsStatusParams: ProtocolValidator<{
  environmentId: string;
}>;
declare const validateSystemInfoParams: ProtocolValidator<object>;
declare const validateSystemInfoResult: ProtocolValidator<{
  lanAddress?: string | undefined;
  port?: number | undefined;
  processInstanceId?: string | undefined;
  cpuModel?: string | undefined;
  loadAverage?: [number, number, number] | undefined;
  diskTotalBytes?: number | undefined;
  diskAvailableBytes?: number | undefined;
  diskPath?: string | undefined;
  defaultAgentUtilityModel?: {
    model: string;
    status: "auto";
  } | {
    model: string;
    status: "configured";
  } | {
    status: "disabled";
  } | {
    status: "unavailable";
  } | undefined;
  platform: string;
  uptimeMs: number;
  machineName: string;
  hostname: string;
  release: string;
  arch: string;
  osLabel: string;
  nodeVersion: string;
  pid: number;
  cpuCount: number;
  memoryTotalBytes: number;
  memoryFreeBytes: number;
}>;
declare const validateNodePendingAckParams: ProtocolValidator<{
  ids: string[];
}>;
declare const validateNodeDescribeParams: ProtocolValidator<{
  nodeId: string;
}>;
declare const validateNodeInvokeParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  params?: unknown;
  timeoutMs?: number | undefined;
  turnSourceChannel?: string | undefined;
  turnSourceTo?: string | undefined;
  turnSourceAccountId?: string | undefined;
  turnSourceThreadId?: string | number | undefined;
  idempotencyKey: string;
  nodeId: string;
  command: string;
}>;
declare const validateNodeInvokeResultParams: ProtocolValidator<{
  error?: {
    message?: string | undefined;
    code?: string | undefined;
  } | undefined;
  payload?: unknown;
  payloadJSON?: string | undefined;
  ok: boolean;
  id: string;
  nodeId: string;
}>;
declare const validateNodeInvokeProgressParams: ProtocolValidator<{
  nodeId: string;
  invokeId: string;
  seq: number;
  chunk: string;
}>;
declare const validateNodeEventParams: ProtocolValidator<{
  payload?: unknown;
  payloadJSON?: string | undefined;
  event: string;
}>;
declare const validateNodePresenceActivityPayload: ProtocolValidator<{
  saturated?: boolean | undefined;
  idleSeconds: number;
} | {
  action: "clear";
}>;
declare const validateNodePendingDrainParams: ProtocolValidator<{
  maxItems?: number | undefined;
}>;
declare const validateNodePendingEnqueueParams: ProtocolValidator<{
  priority?: string | undefined;
  expiresInMs?: number | undefined;
  wake?: boolean | undefined;
  type: string;
  nodeId: string;
}>;
declare const validatePushTestParams: ProtocolValidator<{
  title?: string | undefined;
  body?: string | undefined;
  environment?: string | undefined;
  nodeId: string;
}>;
declare const validateWebPushVapidPublicKeyParams: ProtocolValidator<WebPushVapidPublicKeyParams>;
declare const validateWebPushSubscribeParams: ProtocolValidator<WebPushSubscribeParams>;
declare const validateWebPushUnsubscribeParams: ProtocolValidator<WebPushUnsubscribeParams>;
declare const validateWebPushTestParams: ProtocolValidator<WebPushTestParams>;
declare const validateSecretsResolveParams: ProtocolValidator<{
  allowedPaths?: string[] | undefined;
  forcedActivePaths?: string[] | undefined;
  optionalActivePaths?: string[] | undefined;
  providerOverrides?: {
    webSearch?: string | undefined;
    webFetch?: string | undefined;
  } | undefined;
  commandName: string;
  targetIds: string[];
}>;
declare const validateSecretsResolveResult: ProtocolValidator<{
  ok?: boolean | undefined;
  diagnostics?: string[] | undefined;
  assignments?: {
    path?: string | undefined;
    value: unknown;
    pathSegments: string[];
  }[] | undefined;
  inactiveRefPaths?: string[] | undefined;
}>;
declare const validateSessionsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  label?: string | undefined;
  search?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  activeMinutes?: number | undefined;
  requireLastInteraction?: boolean | undefined;
  sortBy?: "updatedAt" | "lastInteractionAt" | undefined;
  includeGlobal?: boolean | undefined;
  includeUnknown?: boolean | undefined;
  configuredAgentsOnly?: boolean | undefined;
  includeDerivedTitles?: boolean | undefined;
  includeLastMessage?: boolean | undefined;
  boardFace?: "chat" | "dashboard" | undefined;
  creatorId?: string | undefined;
  spawnedBy?: string | undefined;
  archived?: boolean | "all" | undefined;
}>;
declare const validateSessionsCatalogListParams: ProtocolValidator<{
  agentId?: string | undefined;
  search?: string | undefined;
  catalogId?: string | undefined;
  cursors?: Record<string, string> | undefined;
  progressId?: string | undefined;
  limitPerHost?: number | undefined;
  hostIds?: string[] | undefined;
}>;
declare const validateSessionsCatalogReadParams: ProtocolValidator<{
  limit?: number | undefined;
  cursor?: string | undefined;
  catalogId: string;
  threadId: string;
  hostId: string;
}>;
declare const validateSessionsCatalogContinueParams: ProtocolValidator<{
  catalogId: string;
  threadId: string;
  hostId: string;
}>;
declare const validateSessionsCatalogArchiveParams: ProtocolValidator<{
  catalogId: string;
  threadId: string;
  hostId: string;
  confirmNoOtherRunner: true;
}>;
declare const validateSessionsSearchParams: ProtocolValidator<{
  agentId?: string | undefined;
  limit?: number | undefined;
  sessionKeys?: string[] | undefined;
  query: string;
}>;
declare const validateSessionsCleanupParams: ProtocolValidator<{
  agent?: string | undefined;
  allAgents?: boolean | undefined;
  enforce?: boolean | undefined;
  activeKey?: string | undefined;
  fixMissing?: boolean | undefined;
  fixDmScope?: boolean | undefined;
}>;
declare const validateSessionsPreviewParams: ProtocolValidator<{
  limit?: number | undefined;
  maxChars?: number | undefined;
  keys: string[];
}>;
declare const validateSessionsDescribeParams: ProtocolValidator<{
  includeDerivedTitles?: boolean | undefined;
  includeLastMessage?: boolean | undefined;
  key: string;
}>;
declare const validateSessionsResolveParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionId?: string | undefined;
  label?: string | undefined;
  key?: string | undefined;
  includeGlobal?: boolean | undefined;
  includeUnknown?: boolean | undefined;
  spawnedBy?: string | undefined;
  allowMissing?: boolean | undefined;
}>;
declare const validateSessionsFilesListParams: ProtocolValidator<{
  agentId?: string | undefined;
  path?: string | undefined;
  search?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionsFilesGetParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  path: string;
}>;
declare const validateSessionsFilesSetParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  path: string;
  content: string;
  expectedHash: string;
}>;
declare const validateSessionsFilesRevealParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsDiffParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionsCompanionAskParams: ProtocolValidator<{
  sessionKey: string;
  question: string;
}>;
declare const validateSessionsCompanionStateParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateSessionsCompanionResetParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateSessionsObserverVisibilityParams: ProtocolValidator<{
  visible: boolean;
}>;
declare const validateSessionVisibilitySetParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  visibility: "shared" | "read-only" | "suggest" | "draft";
}>;
declare const validateSessionMembersListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionMemberAddParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  identityId: string;
}>;
declare const validateSessionMemberRemoveParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  identityId: string;
}>;
declare const validateSessionSuggestionsAddParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  text: string;
}>;
declare const validateSessionSuggestionsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionSuggestionsResolveParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  id: string;
  resolution: "queue" | "send" | "edit" | "dismiss";
}>;
declare const validateSessionTypingParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  sessionId: string;
  typing: boolean;
}>;
declare const validateSessionsCreateParams: ProtocolValidator<{
  attachments?: {
    type?: string | undefined;
    content?: unknown;
    mimeType?: string | undefined;
    fileName?: string | undefined;
    sizeBytes?: number | undefined;
    durationMs?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
  }[] | undefined;
  agentId?: string | undefined;
  model?: string | undefined;
  label?: string | undefined;
  message?: string | undefined;
  key?: string | undefined;
  worktree?: boolean | undefined;
  thinkingLevel?: string | undefined;
  execNode?: string | undefined;
  incognito?: boolean | undefined;
  parentSessionKey?: string | undefined;
  spawnDepth?: number | undefined;
  visibility?: "shared" | "read-only" | "suggest" | "draft" | undefined;
  catalogId?: string | undefined;
  fork?: boolean | undefined;
  emitCommandHooks?: boolean | undefined;
  succeedsParent?: boolean | undefined;
  task?: string | undefined;
  worktreeBaseRef?: string | undefined;
  worktreeName?: string | undefined;
  cwd?: string | undefined;
}>;
declare const validateSessionsSendParams: ProtocolValidator<{
  attachments?: {
    type?: string | undefined;
    content?: unknown;
    mimeType?: string | undefined;
    fileName?: string | undefined;
    sizeBytes?: number | undefined;
    durationMs?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
  }[] | undefined;
  agentId?: string | undefined;
  thinking?: string | undefined;
  timeoutMs?: number | undefined;
  idempotencyKey?: string | undefined;
  message: string;
  key: string;
}>;
declare const validateSessionsDispatchParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
  profileId: string;
}>;
declare const validateSessionsReclaimParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsMessagesSubscribeParams: ProtocolValidator<{
  agentId?: string | undefined;
  includeApprovals?: true | undefined;
  key: string;
}>;
declare const validateSessionsMessagesUnsubscribeParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsViewerPresenceSetParams: ProtocolValidator<{
  sessionKeys: string[];
}>;
declare const validateSessionsAbortParams: ProtocolValidator<{
  runId?: string | undefined;
  agentId?: string | undefined;
  key?: string | undefined;
  clearQueued?: boolean | undefined;
}>;
declare const validateSessionsPatchParams: ProtocolValidator<{
  agentId?: string | undefined;
  model?: string | null | undefined;
  label?: string | null | undefined;
  boardFace?: "chat" | "dashboard" | undefined;
  archived?: boolean | undefined;
  expectedSessionId?: string | undefined;
  expectedLifecycleRevision?: string | undefined;
  category?: string | null | undefined;
  icon?: string | null | undefined;
  statusNote?: string | null | undefined;
  attention?: string | null | undefined;
  ttlMinutes?: number | undefined;
  pinned?: boolean | undefined;
  unread?: boolean | undefined;
  thinkingLevel?: string | null | undefined;
  fastMode?: boolean | "auto" | null | undefined;
  toolOverrides?: {
    mcpServers?: Record<string, boolean> | undefined;
    mcpToolsDeny?: Record<string, string[]> | undefined;
    skills?: Record<string, boolean> | undefined;
    webSearch?: boolean | undefined;
  } | null | undefined;
  verboseLevel?: string | null | undefined;
  traceLevel?: string | null | undefined;
  reasoningLevel?: string | null | undefined;
  responseUsage?: "off" | "tokens" | "full" | "on" | null | undefined;
  elevatedLevel?: string | null | undefined;
  execHost?: string | null | undefined;
  execSecurity?: string | null | undefined;
  execAsk?: string | null | undefined;
  execNode?: string | null | undefined;
  completionOwnerSessionKey?: string | null | undefined;
  inheritedToolPolicyVersion?: 1 | null | undefined;
  inheritedToolAllow?: string[] | null | undefined;
  inheritedToolDeny?: string[] | null | undefined;
  sendPolicy?: "allow" | "deny" | null | undefined;
  groupActivation?: "mention" | "always" | null | undefined;
  key: string;
}>;
declare const validateSessionsPluginPatchParams: ProtocolValidator<{
  value?: unknown;
  unset?: boolean | undefined;
  key: string;
  pluginId: string;
  namespace: string;
}>;
declare const validateSessionsResetParams: ProtocolValidator<{
  agentId?: string | undefined;
  reason?: "new" | "reset" | undefined;
  key: string;
}>;
declare const validateSessionsDeleteParams: ProtocolValidator<{
  agentId?: string | undefined;
  expectedSessionId?: string | undefined;
  expectedLifecycleRevision?: string | undefined;
  deleteTranscript?: boolean | undefined;
  expectedSessionUpdatedAt?: number | undefined;
  emitLifecycleHooks?: boolean | undefined;
  archivedOnly?: boolean | undefined;
  key: string;
}>;
declare const validateSessionsGroupsListParams: ProtocolValidator<object>;
declare const validateSessionsGroupsListResult: ProtocolValidator<{
  sectionOrder?: string[] | undefined;
  groups: {
    name: string;
    position: number;
  }[];
}>;
declare const validateSessionsGroupsPutParams: ProtocolValidator<{
  sectionOrder?: string[] | undefined;
  names: string[];
}>;
declare const validateSessionsGroupsRenameParams: ProtocolValidator<{
  name: string;
  to: string;
}>;
declare const validateSessionsGroupsDeleteParams: ProtocolValidator<{
  name: string;
}>;
declare const validateSessionsGroupsMutationResult: ProtocolValidator<{
  sectionOrder?: string[] | undefined;
  updatedSessions?: number | undefined;
  ok: true;
  groups: {
    name: string;
    position: number;
  }[];
}>;
declare const validateSessionsCompactParams: ProtocolValidator<{
  agentId?: string | undefined;
  maxLines?: number | undefined;
  key: string;
}>;
declare const validateSessionsCompactionListParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsCompactionGetParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
  checkpointId: string;
}>;
declare const validateSessionsCompactionBranchParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
  checkpointId: string;
}>;
declare const validateSessionsCompactionRestoreParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
  checkpointId: string;
}>;
declare const validateSessionsBranchesListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionsBranchesSwitchParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  leafEntryId: string;
}>;
declare const validateSessionsRewindParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  entryId: string;
}>;
declare const validateSessionsForkParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  entryId: string;
}>;
declare const validateSessionsUsageParams: ProtocolValidator<{
  agentId?: string | undefined;
  key?: string | undefined;
  limit?: number | undefined;
  agentScope?: "all" | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  mode?: "utc" | "gateway" | "specific" | undefined;
  range?: "all" | "7d" | "30d" | "90d" | "1y" | undefined;
  groupBy?: "instance" | "family" | undefined;
  includeHistorical?: boolean | undefined;
  utcOffset?: string | undefined;
  timeZone?: string | undefined;
  includeContextWeight?: boolean | undefined;
}>;
declare const validateSessionDiscussionInfoParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateSessionDiscussionInfoResult: ProtocolValidator<{
  embedUrl?: string | undefined;
  openUrl?: string | undefined;
  state: "none" | "available" | "open";
}>;
declare const validateSessionDiscussionOpenParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateSessionDiscussionOpenResult: ProtocolValidator<{
  embedUrl?: string | undefined;
  openUrl?: string | undefined;
  state: "none" | "available" | "open";
}>;
declare const validateTaskSuggestionsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
}>;
declare const validateTaskSuggestionsCreateParams: ProtocolValidator<{
  agentId?: string | undefined;
  prompt: string;
  sessionKey: string;
  title: string;
  cwd: string;
  tldr: string;
}>;
declare const validateTaskSuggestionsAcceptParams: ProtocolValidator<{
  taskId: string;
}>;
declare const validateTaskSuggestionsDismissParams: ProtocolValidator<{
  reason?: string | undefined;
  taskId: string;
}>;
declare const validateTasksListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  status?: "failed" | "completed" | "queued" | "running" | "cancelled" | "timed_out" | ("failed" | "completed" | "queued" | "running" | "cancelled" | "timed_out")[] | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
}>;
declare const validateTasksGetParams: ProtocolValidator<{
  taskId: string;
}>;
declare const validateTasksCancelParams: ProtocolValidator<{
  reason?: string | undefined;
  taskId: string;
}>;
declare const validateTasksRecoveryParams: ProtocolValidator<{
  taskIds: string[];
}>;
declare const validateConfigGetParams: ProtocolValidator<object>;
declare const validateConfigSetParams: ProtocolValidator<{
  baseHash?: string | undefined;
  raw: string;
}>;
declare const validateConfigApplyParams: ProtocolValidator<{
  readonly sessionKey?: string | undefined;
  readonly note?: string | undefined;
  readonly baseHash?: string | undefined;
  readonly deliveryContext?: {
    channel?: string | undefined;
    accountId?: string | undefined;
    to?: string | undefined;
    threadId?: string | number | undefined;
  } | undefined;
  readonly restartDelayMs?: number | undefined;
  readonly raw: string;
}>;
declare const validateConfigPatchParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  note?: string | undefined;
  baseHash?: string | undefined;
  deliveryContext?: {
    channel?: string | undefined;
    accountId?: string | undefined;
    to?: string | undefined;
    threadId?: string | number | undefined;
  } | undefined;
  restartDelayMs?: number | undefined;
  replacePaths?: string[] | undefined;
  raw: string;
}>;
declare const validateConfigSchemaParams: ProtocolValidator<object>;
declare const validateConfigSchemaLookupParams: ProtocolValidator<{
  path: string;
}>;
declare const validateConfigSchemaLookupResult: ProtocolValidator<{
  hint?: {
    label?: string | undefined;
    order?: number | undefined;
    group?: string | undefined;
    presentation?: "phone-number" | undefined;
    advanced?: boolean | undefined;
    tags?: string[] | undefined;
    placeholder?: string | undefined;
    sensitive?: boolean | undefined;
    help?: string | undefined;
    docsUrl?: string | undefined;
    itemTemplate?: unknown;
  } | undefined;
  reloadKind?: "none" | "restart" | "hot" | undefined;
  hintPath?: string | undefined;
  children: {
    type?: string | string[] | undefined;
    hint?: {
      label?: string | undefined;
      order?: number | undefined;
      group?: string | undefined;
      presentation?: "phone-number" | undefined;
      advanced?: boolean | undefined;
      tags?: string[] | undefined;
      placeholder?: string | undefined;
      sensitive?: boolean | undefined;
      help?: string | undefined;
      docsUrl?: string | undefined;
      itemTemplate?: unknown;
    } | undefined;
    reloadKind?: "none" | "restart" | "hot" | undefined;
    hintPath?: string | undefined;
    path: string;
    key: string;
    required: boolean;
    hasChildren: boolean;
  }[];
  path: string;
  schema: unknown;
}>;
declare const validateSystemAgentChatParams: ProtocolValidator<{
  message?: string | undefined;
  reset?: boolean | undefined;
  context?: {
    page: string;
  } | undefined;
  wizardAnswer?: {
    value?: unknown;
    stepId: string;
  } | undefined;
  welcomeVariant?: "onboarding" | "new-agent" | undefined;
  delegation?: {
    agentId?: string | undefined;
    sessionKey?: string | undefined;
    turnSourceChannel?: string | undefined;
    turnSourceTo?: string | undefined;
    turnSourceAccountId?: string | undefined;
    turnSourceThreadId?: string | number | undefined;
  } | undefined;
  sessionId: string;
}>;
declare const validateSystemAgentChatHistoryParams: ProtocolValidator<{
  limit?: number | undefined;
}>;
declare const validateSystemChangesListParams: ProtocolValidator<{
  limit?: number | undefined;
  beforeCursor?: string | undefined;
}>;
declare const validateSystemAgentSetupDetectParams: ProtocolValidator<object>;
declare const validateSystemAgentSetupVerifyParams: ProtocolValidator<object>;
declare const validateSystemAgentSetupActivateParams: ProtocolValidator<{
  workspace?: string | undefined;
  modelRef?: string | undefined;
  apiKey?: string | undefined;
  authChoice?: string | undefined;
  kind: "api-key" | "existing-model" | "openai-api-key" | "anthropic-api-key" | "claude-cli" | "codex-cli" | "gemini-cli" | `provider-auto:${string}`;
}>;
declare const validateSystemAgentSetupAuthStartParams: ProtocolValidator<{
  workspace?: string | undefined;
  sessionId: string;
  authChoice: string;
}>;
declare const validateWizardStartParams: ProtocolValidator<{
  channel?: string | undefined;
  workspace?: string | undefined;
  mode?: "local" | "remote" | undefined;
  installDaemon?: boolean | undefined;
  flow?: "setup" | "channels" | undefined;
}>;
declare const validateWizardNextParams: ProtocolValidator<{
  answer?: {
    value?: unknown;
    stepId: string;
  } | undefined;
  sessionId: string;
}>;
declare const validateWizardCancelParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateWizardStatusParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTalkModeParams: ProtocolValidator<{
  phase?: string | undefined;
  enabled: boolean;
}>;
declare const validateTalkCatalogParams: ProtocolValidator<object>;
declare const validateTalkConfigParams: ProtocolValidator<{
  includeSecrets?: boolean | undefined;
}>;
declare const validateTalkConfigResult: ProtocolValidator<{
  config: {
    talk?: {
      provider?: string | undefined;
      resolved?: {
        config: {
          apiKey?: string | {
            id: string;
            provider: string;
            source: "env";
          } | {
            id: string;
            provider: string;
            source: "file";
          } | {
            id: string;
            provider: string;
            source: "exec";
          } | undefined;
        };
        provider: string;
      } | undefined;
      providers?: Record<string, {
        apiKey?: string | {
          id: string;
          provider: string;
          source: "env";
        } | {
          id: string;
          provider: string;
          source: "file";
        } | {
          id: string;
          provider: string;
          source: "exec";
        } | undefined;
      }> | undefined;
      realtime?: {
        model?: string | undefined;
        mode?: "realtime" | "stt-tts" | "transcription" | undefined;
        voice?: string | undefined;
        provider?: string | undefined;
        transport?: "webrtc" | "provider-websocket" | "gateway-relay" | "managed-room" | undefined;
        instructions?: string | undefined;
        providers?: Record<string, {
          apiKey?: string | {
            id: string;
            provider: string;
            source: "env";
          } | {
            id: string;
            provider: string;
            source: "file";
          } | {
            id: string;
            provider: string;
            source: "exec";
          } | undefined;
        }> | undefined;
        speakerVoice?: string | undefined;
        speakerVoiceId?: string | undefined;
        vadThreshold?: number | undefined;
        silenceDurationMs?: number | undefined;
        prefixPaddingMs?: number | undefined;
        reasoningEffort?: string | undefined;
        brain?: "none" | "agent-consult" | "direct-tools" | undefined;
        consultRouting?: "provider-direct" | "force-agent-consult" | undefined;
      } | undefined;
      consultThinkingLevel?: string | undefined;
      consultFastMode?: boolean | undefined;
      speechLocale?: string | undefined;
      interruptOnSpeech?: boolean | undefined;
      silenceTimeoutMs?: number | undefined;
    } | undefined;
    session?: {
      mainKey?: string | undefined;
    } | undefined;
    ui?: {
      seamColor?: string | undefined;
    } | undefined;
  };
}>;
declare const validateTalkClientCreateParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  model?: string | undefined;
  mode?: "realtime" | "stt-tts" | "transcription" | undefined;
  voice?: string | undefined;
  provider?: string | undefined;
  transport?: "webrtc" | "provider-websocket" | "gateway-relay" | "managed-room" | undefined;
  voiceSessionId?: string | undefined;
  capabilities?: ("camera-frame" | "voice-transcript")[] | undefined;
  vadThreshold?: number | undefined;
  silenceDurationMs?: number | undefined;
  prefixPaddingMs?: number | undefined;
  reasoningEffort?: string | undefined;
  brain?: "none" | "agent-consult" | "direct-tools" | undefined;
}>;
declare const validateTalkClientCreateResult: ProtocolValidator<{
  model?: string | undefined;
  voice?: string | undefined;
  offerUrl?: string | undefined;
  offerHeaders?: Record<string, string> | undefined;
  expiresAt?: number | undefined;
  provider: string;
  transport: "webrtc";
  voiceSessionId: string;
  clientSecret: string;
} | {
  model?: string | undefined;
  voice?: string | undefined;
  expiresAt?: number | undefined;
  initialMessage?: unknown;
  audio: {
    inputEncoding: "pcm16" | "g711_ulaw";
    inputSampleRateHz: number;
    outputEncoding: "pcm16" | "g711_ulaw";
    outputSampleRateHz: number;
  };
  provider: string;
  transport: "provider-websocket";
  voiceSessionId: string;
  protocol: string;
  clientSecret: string;
  websocketUrl: string;
} | {
  model?: string | undefined;
  voice?: string | undefined;
  voiceSessionId?: string | undefined;
  expiresAt?: number | undefined;
  audio: {
    inputEncoding: "pcm16" | "g711_ulaw";
    inputSampleRateHz: number;
    outputEncoding: "pcm16" | "g711_ulaw";
    outputSampleRateHz: number;
  };
  provider: string;
  transport: "gateway-relay";
  relaySessionId: string;
} | {
  model?: string | undefined;
  token?: string | undefined;
  voice?: string | undefined;
  voiceSessionId?: string | undefined;
  expiresAt?: number | undefined;
  provider: string;
  transport: "managed-room";
  roomUrl: string;
}>;
declare const validateTalkClientCloseParams: ProtocolValidator<{
  sessionKey: string;
  voiceSessionId: string;
}>;
declare const validateTalkClientMutationResult: ProtocolValidator<{
  ok: true;
}>;
declare const validateTalkClientToolCallParams: ProtocolValidator<{
  voiceSessionId?: string | undefined;
  args?: unknown;
  relaySessionId?: string | undefined;
  sessionKey: string;
  name: string;
  callId: string;
}>;
declare const validateTalkClientToolCallResult: ProtocolValidator<{
  runId: string;
  idempotencyKey: string;
}>;
declare const validateTalkClientTranscriptParams: ProtocolValidator<{
  timestamp?: number | undefined;
  sessionKey: string;
  entryId: string;
  text: string;
  role: "user" | "assistant";
  voiceSessionId: string;
}>;
declare const validateTalkClientSteerParams: ProtocolValidator<{
  mode?: "status" | "steer" | "cancel" | "followup" | undefined;
  sessionKey: string;
  text: string;
}>;
declare const validateTalkSessionCreateParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  model?: string | undefined;
  spawnedBy?: string | undefined;
  mode?: "realtime" | "stt-tts" | "transcription" | undefined;
  voice?: string | undefined;
  provider?: string | undefined;
  transport?: "webrtc" | "provider-websocket" | "gateway-relay" | "managed-room" | undefined;
  vadThreshold?: number | undefined;
  silenceDurationMs?: number | undefined;
  prefixPaddingMs?: number | undefined;
  reasoningEffort?: string | undefined;
  brain?: "none" | "agent-consult" | "direct-tools" | undefined;
  language?: string | undefined;
  ttlMs?: number | undefined;
}>;
declare const validateTalkSessionJoinParams: ProtocolValidator<{
  sessionId: string;
  token: string;
}>;
declare const validateTalkSessionAppendAudioParams: ProtocolValidator<{
  timestamp?: number | undefined;
  sessionId: string;
  audioBase64: string;
}>;
declare const validateTalkSessionAcknowledgeMarkParams: ProtocolValidator<{
  sessionId: string;
  markName: string;
}>;
declare const validateTalkSessionTurnParams: ProtocolValidator<{
  turnId?: string | undefined;
  sessionId: string;
}>;
declare const validateTalkSessionCancelTurnParams: ProtocolValidator<{
  reason?: string | undefined;
  turnId?: string | undefined;
  sessionId: string;
}>;
declare const validateTalkSessionCancelOutputParams: ProtocolValidator<{
  reason?: string | undefined;
  turnId?: string | undefined;
  sessionId: string;
}>;
declare const validateTalkSessionSteerParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  mode?: "status" | "steer" | "cancel" | "followup" | undefined;
  sessionId: string;
  text: string;
}>;
declare const validateTalkSessionSubmitToolResultParams: ProtocolValidator<{
  options?: {
    suppressResponse?: boolean | undefined;
    willContinue?: boolean | undefined;
  } | undefined;
  sessionId: string;
  result: unknown;
  callId: string;
}>;
declare const validateTalkSessionCloseParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTalkSpeakParams: ProtocolValidator<{
  modelId?: string | undefined;
  normalize?: string | undefined;
  language?: string | undefined;
  voiceId?: string | undefined;
  outputFormat?: string | undefined;
  speed?: number | undefined;
  rateWpm?: number | undefined;
  stability?: number | undefined;
  similarity?: number | undefined;
  style?: number | undefined;
  speakerBoost?: boolean | undefined;
  seed?: number | undefined;
  latencyTier?: number | undefined;
  text: string;
}>;
declare const validateTtsSpeakParams: ProtocolValidator<{
  text: string;
}>;
declare const validateChannelsStatusParams: ProtocolValidator<{
  channel?: string | undefined;
  timeoutMs?: number | undefined;
  probe?: boolean | undefined;
}>;
declare const validateChannelsPairingListParams: ProtocolValidator<{
  channel?: string | undefined;
  accountId?: string | undefined;
}>;
declare const validateChannelsPairingApproveParams: ProtocolValidator<{
  notify?: boolean | undefined;
  bootstrapCommandOwner?: boolean | undefined;
  channel: string;
  accountId: string;
  requestId: string;
}>;
declare const validateChannelsPairingDismissParams: ProtocolValidator<{
  channel: string;
  accountId: string;
  requestId: string;
}>;
declare const validateChannelsStartParams: ProtocolValidator<{
  accountId?: string | undefined;
  channel: string;
}>;
declare const validateChannelsStopParams: ProtocolValidator<{
  accountId?: string | undefined;
  channel: string;
}>;
declare const validateChannelsLogoutParams: ProtocolValidator<{
  accountId?: string | undefined;
  channel: string;
}>;
declare const validateModelsAuthLogoutParams: ProtocolValidator<{
  agentId?: string | undefined;
  profileIds?: string[] | undefined;
  provider: string;
}>;
declare const validateModelsAuthStatusParams: ProtocolValidator<{
  agentId?: string | undefined;
  refresh?: boolean | undefined;
}>;
declare const validateModelsListParams: ProtocolValidator<{
  includeProviderCapabilities?: boolean | undefined;
  view?: "default" | "all" | "configured" | "provider-config" | undefined;
}>;
declare const validateSkillsStatusParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateHooksStatusParams: ProtocolValidator<object>;
declare const validateToolsCatalogParams: ProtocolValidator<{
  agentId?: string | undefined;
  includePlugins?: boolean | undefined;
}>;
declare const validateToolsEffectiveParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateToolsInvokeParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  idempotencyKey?: string | undefined;
  confirm?: boolean | undefined;
  args?: Record<string, unknown> | undefined;
  conversationReadOrigin?: "direct-operator" | undefined;
  name: string;
}>;
declare const validateSkillsBinsParams: ProtocolValidator<object>;
declare const validateSkillsInstallParams: ProtocolValidator<{
  agentId?: string | undefined;
  timeoutMs?: number | undefined;
  dangerouslyForceUnsafeInstall?: boolean | undefined;
  name: string;
  installId: string;
} | {
  agentId?: string | undefined;
  timeoutMs?: number | undefined;
  version?: string | undefined;
  force?: boolean | undefined;
  acknowledgeClawHubRisk?: boolean | undefined;
  source: "clawhub";
  slug: string;
} | {
  agentId?: string | undefined;
  timeoutMs?: number | undefined;
  sha256?: string | undefined;
  force?: boolean | undefined;
  source: "upload";
  slug: string;
  uploadId: string;
}>;
declare const validateSkillsUploadBeginParams: ProtocolValidator<{
  idempotencyKey?: string | undefined;
  sha256?: string | undefined;
  force?: boolean | undefined;
  kind: "skill-archive";
  sizeBytes: number;
  slug: string;
}>;
declare const validateSkillsUploadChunkParams: ProtocolValidator<{
  offset: number;
  uploadId: string;
  dataBase64: string;
}>;
declare const validateSkillsUploadCommitParams: ProtocolValidator<{
  sha256?: string | undefined;
  uploadId: string;
}>;
declare const validateSkillsUpdateParams: ProtocolValidator<{
  enabled?: boolean | undefined;
  env?: Record<string, string> | undefined;
  apiKey?: string | undefined;
  skillKey: string;
} | {
  agentId?: string | undefined;
  all?: boolean | undefined;
  slug?: string | undefined;
  acknowledgeClawHubRisk?: boolean | undefined;
  source: "clawhub";
}>;
declare const validateSkillsSearchParams: ProtocolValidator<{
  limit?: number | undefined;
  query?: string | undefined;
}>;
declare const validateSkillsDetailParams: ProtocolValidator<{
  slug: string;
}>;
declare const validateSkillsCuratorStatusParams: ProtocolValidator<object>;
declare const validateSkillsCuratorActionParams: ProtocolValidator<{
  skill: string;
}>;
declare const validateSkillsProposalsListParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateSkillsProposalInspectParams: ProtocolValidator<{
  agentId?: string | undefined;
  proposalId: string;
}>;
declare const validateSkillsProposalCreateParams: ProtocolValidator<{
  agentId?: string | undefined;
  supportFiles?: {
    path: string;
    content: string;
  }[] | undefined;
  evidence?: string | undefined;
  goal?: string | undefined;
  name: string;
  description: string;
  content: string;
}>;
declare const validateSkillsProposalUpdateParams: ProtocolValidator<{
  agentId?: string | undefined;
  description?: string | undefined;
  supportFiles?: {
    path: string;
    content: string;
  }[] | undefined;
  evidence?: string | undefined;
  goal?: string | undefined;
  content: string;
  skillName: string;
}>;
declare const validateSkillsProposalReviseParams: ProtocolValidator<{
  agentId?: string | undefined;
  description?: string | undefined;
  content?: string | undefined;
  correlationId?: string | undefined;
  supportFiles?: {
    path: string;
    content: string;
  }[] | undefined;
  evidence?: string | undefined;
  goal?: string | undefined;
  expectedRevisionHash?: string | undefined;
  proposalId: string;
}>;
declare const validateSkillsProposalRequestRevisionParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionId?: string | undefined;
  expectedRevisionHash?: string | undefined;
  targetAgentId?: string | undefined;
  sessionKey: string;
  idempotencyKey: string;
  proposalId: string;
  instructions: string;
}>;
declare const validateSkillsProposalActionParams: ProtocolValidator<{
  agentId?: string | undefined;
  reason?: string | undefined;
  correlationId?: string | undefined;
  expectedRevisionHash?: string | undefined;
  proposalId: string;
}>;
declare const validateSkillsProposalEvaluateParams: ProtocolValidator<{
  agentId?: string | undefined;
  correlationId?: string | undefined;
  expectedRevisionHash?: string | undefined;
  proposalId: string;
}>;
declare const validateSkillsProposalEventsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  limit?: number | undefined;
  proposalId?: string | undefined;
  afterSequence?: number | undefined;
}>;
declare const validateSkillsSecurityVerdictsParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateSkillsSkillCardParams: ProtocolValidator<{
  agentId?: string | undefined;
  skillKey: string;
}>;
declare const validateCronListParams: ProtocolValidator<{
  agentId?: string | undefined;
  enabled?: "enabled" | "all" | "disabled" | undefined;
  compact?: boolean | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  sortBy?: "name" | "updatedAtMs" | "nextRunAtMs" | undefined;
  query?: string | undefined;
  includeDisabled?: boolean | undefined;
  scheduleKind?: "every" | "at" | "cron" | "all" | "stream" | "on-exit" | undefined;
  lastRunStatus?: "ok" | "error" | "unknown" | "all" | "skipped" | undefined;
  sortDir?: "asc" | "desc" | undefined;
  includeDeliveryPreviews?: boolean | undefined;
}>;
declare const validateCronStatusParams: ProtocolValidator<object>;
declare const validateCronGetParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronAddParams: ProtocolValidator<{
  agentId?: string | null | undefined;
  sessionKey?: string | null | undefined;
  trigger?: {
    once?: boolean | undefined;
    script: string;
  } | undefined;
  description?: string | undefined;
  enabled?: boolean | undefined;
  displayName?: string | undefined;
  owner?: {
    agentId?: string | undefined;
    sessionKey?: string | undefined;
    accountId?: string | undefined;
  } | undefined;
  declarationKey?: string | undefined;
  pacing?: {
    max?: string | undefined;
    min?: string | undefined;
  } | undefined;
  delivery?: {
    channel?: string | undefined;
    accountId?: string | undefined;
    to?: string | undefined;
    threadId?: string | number | undefined;
    bestEffort?: boolean | undefined;
    failureDestination?: {
      channel?: string | undefined;
      accountId?: string | undefined;
      to?: string | undefined;
      mode?: "announce" | "webhook" | undefined;
    } | undefined;
    mode: "none";
  } | {
    channel?: string | undefined;
    accountId?: string | undefined;
    to?: string | undefined;
    threadId?: string | number | undefined;
    bestEffort?: boolean | undefined;
    failureDestination?: {
      channel?: string | undefined;
      accountId?: string | undefined;
      to?: string | undefined;
      mode?: "announce" | "webhook" | undefined;
    } | undefined;
    completionDestination?: {
      to: string;
      mode: "webhook";
    } | undefined;
    mode: "announce";
  } | {
    channel?: string | undefined;
    accountId?: string | undefined;
    threadId?: string | number | undefined;
    bestEffort?: boolean | undefined;
    failureDestination?: {
      channel?: string | undefined;
      accountId?: string | undefined;
      to?: string | undefined;
      mode?: "announce" | "webhook" | undefined;
    } | undefined;
    to: string;
    mode: "webhook";
  } | undefined;
  failureAlert?: false | {
    channel?: string | undefined;
    accountId?: string | undefined;
    to?: string | undefined;
    mode?: "announce" | "webhook" | undefined;
    after?: number | undefined;
    cooldownMs?: number | undefined;
    includeSkipped?: boolean | undefined;
  } | undefined;
  deleteAfterRun?: boolean | undefined;
  name: string;
  payload: {
    toolsAllow?: string[] | undefined;
    toolsAllowIsDefault?: boolean | undefined;
    kind: "systemEvent";
    text: string;
  } | {
    model?: unknown;
    thinking?: unknown;
    timeoutSeconds?: number | undefined;
    fallbacks?: unknown;
    toolsAllow?: unknown;
    toolsAllowIsDefault?: boolean | undefined;
    allowUnsafeExternalContent?: boolean | undefined;
    lightContext?: boolean | undefined;
    kind: "agentTurn";
    message: unknown;
  } | {
    input?: string | undefined;
    env?: Record<string, string> | undefined;
    cwd?: string | undefined;
    timeoutSeconds?: number | undefined;
    toolsAllow?: unknown;
    toolsAllowIsDefault?: boolean | undefined;
    noOutputTimeoutSeconds?: number | undefined;
    outputMaxBytes?: number | undefined;
    kind: "command";
    argv: unknown;
  } | {
    timeoutSeconds?: number | undefined;
    toolsAllow?: unknown;
    toolsAllowIsDefault?: boolean | undefined;
    toolBudget?: number | undefined;
    kind: "script";
    script: unknown;
  };
  schedule: {
    at: string;
    kind: "at";
  } | {
    anchorMs?: number | undefined;
    kind: "every";
    everyMs: number;
  } | {
    tz?: string | undefined;
    staggerMs?: number | undefined;
    kind: "cron";
    expr: string;
  } | {
    cwd?: string | undefined;
    kind: "on-exit";
    command: string;
  } | {
    match?: string | undefined;
    mode?: "match" | "line" | undefined;
    cwd?: string | undefined;
    batchMs?: number | undefined;
    maxBatchBytes?: number | undefined;
    kind: "stream";
    command: string[];
  };
  sessionTarget: string;
  wakeMode: "now" | "next-heartbeat";
}>;
declare const validateCronUpdateParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronRemoveParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronRunParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronRunsParams: ProtocolValidator<{
  runId?: string | undefined;
  jobId?: string | undefined;
  agentId?: string | undefined;
  id?: string | undefined;
  status?: "ok" | "error" | "all" | "skipped" | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  query?: string | undefined;
  scope?: "all" | "job" | undefined;
  sortDir?: "asc" | "desc" | undefined;
  statuses?: ("ok" | "error" | "skipped")[] | undefined;
  deliveryStatuses?: ("unknown" | "delivered" | "not-delivered" | "not-requested")[] | undefined;
  deliveryStatus?: "unknown" | "delivered" | "not-delivered" | "not-requested" | undefined;
}>;
declare const validateCronScratchGetParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronScratchSetParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateDevicePairListParams: ProtocolValidator<object>;
declare const validateDevicePairApproveParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateDevicePairRejectParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateDevicePairRemoveParams: ProtocolValidator<{
  deviceId: string;
}>;
declare const validateDevicePairSetupCodeParams: ProtocolValidator<{
  publicUrl?: string | undefined;
  preferRemoteUrl?: boolean | undefined;
  includeQr?: boolean | undefined;
  bootstrapProfile?: string | undefined;
}>;
declare const validateDevicePairRenameParams: ProtocolValidator<{
  label: string;
  deviceId: string;
}>;
declare const validateDeviceTokenRotateParams: ProtocolValidator<{
  scopes?: string[] | undefined;
  role: string;
  deviceId: string;
}>;
declare const validateDeviceTokenRevokeParams: ProtocolValidator<{
  role: string;
  deviceId: string;
}>;
declare const validateApprovalPresentation: ProtocolValidator<{
  agentId?: string | null | undefined;
  nodeId?: string | null | undefined;
  host?: string | null | undefined;
  commandPreview?: string | null | undefined;
  warningText?: string | null | undefined;
  kind: "exec";
  commandText: string;
  allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
} | {
  agentId?: string | null | undefined;
  pluginId?: string | null | undefined;
  detail?: string | undefined;
  toolName?: string | null | undefined;
  kind: "plugin";
  description: string;
  title: string;
  severity: "info" | "warning" | "critical";
  allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
} | {
  agentId?: string | null | undefined;
  kind: "system-agent";
  description: string;
  title: string;
  allowedDecisions: ["allow-once", "deny"];
  proposalHash: string;
}>;
declare const validateApprovalGetParams: ProtocolValidator<{
  id: string;
}>;
declare const validateApprovalHistoryParams: ProtocolValidator<{
  kind?: "exec" | "plugin" | "system-agent" | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
}>;
declare const validateApprovalResolveParams: ProtocolValidator<{
  kind: "exec" | "plugin" | "system-agent";
  id: string;
  decision: "deny" | "allow-once" | "allow-always";
}>;
declare const validateExecApprovalsGetParams: ProtocolValidator<object>;
declare const validateExecApprovalsSetParams: ProtocolValidator<{
  baseHash?: string | undefined;
  file: {
    agents?: Record<string, {
      ask?: string | undefined;
      security?: string | undefined;
      allowlist?: {
        id?: string | undefined;
        commandText?: string | undefined;
        source?: "allow-always" | undefined;
        argPattern?: string | undefined;
        lastUsedAt?: number | undefined;
        lastUsedCommand?: string | undefined;
        lastResolvedPath?: string | undefined;
        pattern: string;
      }[] | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    }> | undefined;
    defaults?: {
      ask?: string | undefined;
      security?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    } | undefined;
    socket?: {
      path?: string | undefined;
      token?: string | undefined;
    } | undefined;
    version: 1;
  };
}>;
declare const validateExecApprovalGetParams: ProtocolValidator<{
  id: string;
}>;
declare const validateExecApprovalRequestParams: ProtocolValidator<{
  runId?: string | null | undefined;
  agentId?: string | null | undefined;
  sessionKey?: string | null | undefined;
  sessionId?: string | null | undefined;
  id?: string | undefined;
  env?: Record<string, string> | undefined;
  timeoutMs?: number | undefined;
  suppressDelivery?: boolean | undefined;
  nodeId?: string | null | undefined;
  command?: string | undefined;
  turnSourceChannel?: string | null | undefined;
  turnSourceTo?: string | null | undefined;
  turnSourceAccountId?: string | null | undefined;
  turnSourceThreadId?: string | number | null | undefined;
  ask?: string | null | undefined;
  toolCallId?: string | null | undefined;
  cwd?: string | null | undefined;
  host?: string | null | undefined;
  security?: string | null | undefined;
  warningText?: string | null | undefined;
  commandArgv?: string[] | undefined;
  systemRunPlan?: {
    commandPreview?: string | null | undefined;
    policySnapshot?: {
      ask: "off" | "always" | "on-miss";
      security: "full" | "deny" | "allowlist";
      askFallback: "full" | "deny" | "allowlist";
      autoAllowSkills: boolean;
      allowlistRules: {
        source?: "allow-always" | undefined;
        argPattern?: string | undefined;
        pattern: string;
      }[];
    } | undefined;
    mutableFileOperand?: {
      path: string;
      sha256: string;
      argvIndex: number;
    } | null | undefined;
    agentId: string | null;
    sessionKey: string | null;
    commandText: string;
    cwd: string | null;
    argv: string[];
  } | undefined;
  unavailableDecisions?: string[] | undefined;
  commandSpans?: {
    startIndex: number;
    endIndex: number;
  }[] | undefined;
  resolvedPath?: string | null | undefined;
  approvalReviewerDeviceIds?: string[] | undefined;
  requireDeliveryRoute?: boolean | undefined;
  twoPhase?: boolean | undefined;
}>;
declare const validateExecApprovalResolveParams: ProtocolValidator<{
  id: string;
  decision: string;
}>;
declare const validateQuestionRequestParams: ProtocolValidator<{
  runId?: string | undefined;
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  id?: string | undefined;
  timeoutMs?: number | undefined;
  questions: {
    multiSelect?: boolean | undefined;
    isOther?: boolean | undefined;
    isSecret?: boolean | undefined;
    options: {
      description?: string | undefined;
      label: string;
    }[];
    question: string;
    questionId: string;
    header: string;
  }[];
}>;
declare const validateQuestionWaitAnswerParams: ProtocolValidator<{
  timeoutMs?: number | undefined;
  id: string;
}>;
declare const validateQuestionResolveParams: ProtocolValidator<{
  resolvedBy?: string | undefined;
  id: string;
  answers: {
    answers: Record<string, string[]>;
  };
} | {
  resolvedBy?: string | undefined;
  id: string;
  cancel: true;
}>;
declare const validateQuestionGetParams: ProtocolValidator<{
  id: string;
}>;
declare const validateQuestionListParams: ProtocolValidator<object>;
declare const validatePluginApprovalRequestParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  timeoutMs?: number | undefined;
  pluginId?: string | undefined;
  detail?: string | undefined;
  turnSourceChannel?: string | undefined;
  turnSourceTo?: string | undefined;
  turnSourceAccountId?: string | undefined;
  turnSourceThreadId?: string | number | undefined;
  toolCallId?: string | undefined;
  toolName?: string | undefined;
  severity?: string | undefined;
  allowedDecisions?: string[] | undefined;
  approvalReviewerDeviceIds?: string[] | undefined;
  twoPhase?: boolean | undefined;
  description: string;
  title: string;
}>;
declare const validatePluginApprovalResolveParams: ProtocolValidator<{
  id: string;
  decision: string;
}>;
declare const validatePluginsListParams: ProtocolValidator<object>;
declare const validatePluginsRefreshParams: ProtocolValidator<object>;
declare const validatePluginsSearchParams: ProtocolValidator<{
  limit?: number | undefined;
  query: string;
}>;
declare const validatePluginsInstallParams: ProtocolValidator<{
  version?: string | undefined;
  acknowledgeClawHubRisk?: boolean | undefined;
  source: "clawhub";
  packageName: string;
} | {
  pluginId: string;
  source: "official";
}>;
declare const validatePluginsSetEnabledParams: ProtocolValidator<{
  enabled: boolean;
  pluginId: string;
}>;
declare const validatePluginsUninstallParams: ProtocolValidator<{
  pluginId: string;
}>;
declare const validatePluginsUiDescriptorsParams: ProtocolValidator<object>;
declare const validatePluginsUiDescriptorsResult: ProtocolValidator<{
  ok: true;
  descriptors: {
    description?: string | undefined;
    schema?: unknown;
    requiredScopes?: string[] | undefined;
    placement?: string | undefined;
    pluginName?: string | undefined;
    id: string;
    label: string;
    pluginId: string;
    surface: "tool" | "run" | "session" | "widget" | "settings" | "tab";
  }[];
}>;
declare const validatePluginsSessionActionParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  payload?: unknown;
  pluginId: string;
  actionId: string;
}>;
declare const validatePluginsSessionActionResult: ProtocolValidator<{
  reply?: unknown;
  result?: unknown;
  continueAgent?: boolean | undefined;
  ok: true;
} | {
  code?: string | undefined;
  details?: unknown;
  ok: false;
  error: string;
}>;
declare const validateExecApprovalsNodeGetParams: ProtocolValidator<{
  nodeId: string;
}>;
declare const validateExecApprovalsNodeSetParams: ProtocolValidator<{
  file?: {
    agents?: Record<string, {
      ask?: string | undefined;
      security?: string | undefined;
      allowlist?: {
        id?: string | undefined;
        commandText?: string | undefined;
        source?: "allow-always" | undefined;
        argPattern?: string | undefined;
        lastUsedAt?: number | undefined;
        lastUsedCommand?: string | undefined;
        lastResolvedPath?: string | undefined;
        pattern: string;
      }[] | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    }> | undefined;
    defaults?: {
      ask?: string | undefined;
      security?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    } | undefined;
    socket?: {
      path?: string | undefined;
      token?: string | undefined;
    } | undefined;
    version: 1;
  } | undefined;
  native?: {
    defaultAction?: "prompt" | "allow" | "deny" | undefined;
    rules: {
      description?: string | undefined;
      enabled?: boolean | undefined;
      shells?: string[] | undefined;
      pattern: string;
      action: "prompt" | "allow" | "deny";
    }[];
  } | undefined;
  baseHash?: string | undefined;
  nodeId: string;
}>;
declare const validateExecApprovalsNodeSnapshot: ProtocolValidator<{
  enabled?: boolean | undefined;
  path?: string | undefined;
  message?: string | undefined;
  file?: {
    agents?: Record<string, {
      ask?: string | undefined;
      security?: string | undefined;
      allowlist?: {
        id?: string | undefined;
        commandText?: string | undefined;
        source?: "allow-always" | undefined;
        argPattern?: string | undefined;
        lastUsedAt?: number | undefined;
        lastUsedCommand?: string | undefined;
        lastResolvedPath?: string | undefined;
        pattern: string;
      }[] | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    }> | undefined;
    defaults?: {
      ask?: string | undefined;
      security?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    } | undefined;
    socket?: {
      path?: string | undefined;
      token?: string | undefined;
    } | undefined;
    version: 1;
  } | undefined;
  hash?: string | undefined;
  baseHash?: string | undefined;
  defaultAction?: "prompt" | "allow" | "deny" | undefined;
  rules?: {
    description?: string | undefined;
    enabled?: boolean | undefined;
    shells?: string[] | undefined;
    pattern: string;
    action: "prompt" | "allow" | "deny";
  }[] | undefined;
  exists?: boolean | undefined;
  resolvedDefaults?: {
    ask: "off" | "always" | "on-miss";
    security: "full" | "deny" | "allowlist";
    askFallback: "full" | "deny" | "allowlist";
    autoAllowSkills: boolean;
  } | undefined;
  constraints?: {
    baseHashRequired?: boolean | undefined;
    defaultAllowAllowed?: boolean | undefined;
    broadAllowRulesAllowed?: boolean | undefined;
    dangerousAllowRulesAllowed?: boolean | undefined;
  } | undefined;
}>;
declare const validateLogsTailParams: ProtocolValidator<{
  limit?: number | undefined;
  maxBytes?: number | undefined;
  cursor?: number | undefined;
}>;
declare const validateModelsProbeParams: ProtocolValidator<{
  agentId?: string | undefined;
  timeoutMs?: number | undefined;
  profileId?: string | undefined;
  provider: string;
}>;
declare const validateChatHistoryParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionId?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  messageId?: string | undefined;
  maxChars?: number | undefined;
  sessionKey: string;
}>;
declare const validateChatMetadataParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateChatMessageGetParams: ProtocolValidator<{
  agentId?: string | undefined;
  maxChars?: number | undefined;
  sessionKey: string;
  messageId: string;
}>;
declare const validateChatToolTitlesParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  items: {
    id: string;
    name: string;
    input: string;
  }[];
}>;
declare const validateChatSendParams: ProtocolValidator<{
  attachments?: {
    type?: string | undefined;
    content?: unknown;
    mimeType?: string | undefined;
    fileName?: string | undefined;
    sizeBytes?: number | undefined;
    durationMs?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
  }[] | undefined;
  agentId?: string | undefined;
  sessionId?: string | undefined;
  thinking?: string | undefined;
  timeoutMs?: number | undefined;
  fastMode?: boolean | "auto" | undefined;
  replyToId?: string | undefined;
  deliver?: boolean | undefined;
  fastAutoOnSeconds?: number | undefined;
  queueMode?: string | undefined;
  originatingChannel?: string | undefined;
  originatingTo?: string | undefined;
  originatingAccountId?: string | undefined;
  originatingThreadId?: string | undefined;
  toolBindings?: Record<string, unknown> | undefined;
  systemInputProvenance?: {
    sourceTool?: string | undefined;
    sourceSessionKey?: string | undefined;
    originSessionId?: string | undefined;
    sourceChannel?: string | undefined;
    kind: string;
  } | undefined;
  systemProvenanceReceipt?: string | undefined;
  suppressCommandInterpretation?: boolean | undefined;
  expectedLeafEntryId?: string | null | undefined;
  expectedSessionRoutingContract?: string | undefined;
  sessionKey: string;
  message: string;
  idempotencyKey: string;
}>;
declare const validateChatAbortParams: ProtocolValidator<{
  runId?: string | undefined;
  agentId?: string | undefined;
  preserveSideRuns?: boolean | undefined;
  sessionKey: string;
}>;
declare const validateChatInjectParams: ProtocolValidator<{
  agentId?: string | undefined;
  label?: string | undefined;
  sessionKey: string;
  message: string;
}>;
declare const validateUpdateStatusParams: ProtocolValidator<object>;
declare const validateUpdateRunParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  timeoutMs?: number | undefined;
  note?: string | undefined;
  deliveryContext?: {
    channel?: string | undefined;
    accountId?: string | undefined;
    to?: string | undefined;
    threadId?: string | number | undefined;
  } | undefined;
  restartDelayMs?: number | undefined;
  continuationMessage?: string | undefined;
}>;
declare const validateUiCommandParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  command: {
    kind: "split";
    sessionKey: string;
    direction: "right" | "down";
  } | {
    kind: "close-pane";
    sessionKey: string;
  } | {
    kind: "focus";
    sessionKey: string;
  } | {
    kind: "sidebar";
    visible: boolean;
  } | {
    dock?: "right" | "bottom" | undefined;
    terminalSessionId?: string | undefined;
    kind: "panel";
    panel: "browser" | "terminal";
    open: boolean;
  } | {
    kind: "navigate";
    sessionKey: string;
  };
}>;
declare const validateWebLoginStartParams: ProtocolValidator<{
  accountId?: string | undefined;
  timeoutMs?: number | undefined;
  verbose?: boolean | undefined;
  force?: boolean | undefined;
}>;
declare const validateWebLoginWaitParams: ProtocolValidator<{
  accountId?: string | undefined;
  timeoutMs?: number | undefined;
  currentQrDataUrl?: string | undefined;
}>;
//#endregion
//#region packages/gateway-protocol/src/version.d.ts
/** Current gateway protocol version emitted by modern clients and servers. */
declare const PROTOCOL_VERSION: 4;
/** Lowest general client protocol version accepted by the gateway. */
declare const MIN_CLIENT_PROTOCOL_VERSION: 4;
/** Lowest authenticated node protocol version accepted by the gateway. */
declare const MIN_NODE_PROTOCOL_VERSION: 3;
/** Lowest lightweight probe protocol version accepted by the gateway. */
declare const MIN_PROBE_PROTOCOL_VERSION: 3;
//#endregion
//#region packages/gateway-protocol/src/index.d.ts
type SessionsPatchResult = {
  ok: true;
  path: string;
  key: string;
  entry: Record<string, unknown>;
  resolved?: {
    modelProvider?: string;
    model?: string;
    agentRuntime?: GatewayAgentRuntime;
    thinkingLevel?: string;
    thinkingLevels?: Array<{
      id: string;
      label: string;
    }>;
  };
};
//#endregion
export { validateConfigGetParams as $, BoardWidgetPutContent as $C, AuthProbeStatus as $D, GatewayErrorDetails as $E, SkillsProposalEventsListResultSchema as $O, BoardDataReadParamsSchema as $S, ApprovalHistoryParamsSchema as $T, TalkAgentControlResultSchema as $_, WorktreesListResult as $a, ConversationTurnReplySchema as $b, TerminalSessionInfo as $c, QuestionWaitAnswerResultSchema as $d, NodePresenceAlivePayload as $f, ConfigSchemaLookupResultSchema as $g, CronScratchGetParamsSchema as $h, validateToolsInvokeParams as $i, ToolsEffectiveGroupSchema as $k, SystemInfoParamsSchema as $l, EnvironmentStatusSchema as $m, validateSessionsCatalogArchiveParams as $n, WorkerTranscriptCommitErrorReasonSchema as $o, GatewaySuspendResumeResultSchema as $p, validateSkillsProposalRequestRevisionParams as $r, PluginsRefreshParams as $s, validateNodeEventParams as $t, SessionPlacementProtocolSchemas as $u, TalkSessionTurnResultSchema as $v, validateSkillsProposalHistoryScanParams as $w, validateMigrationsMemoryPlanParams as $x, AuditActivityToolActionV1 as $y, validateBoardGetParams as A, BoardWidgetAppViewParamsSchema as AC, AgentsDeleteResultSchema as AD, SessionApprovalEventSchema as AE, SkillsCuratorStatusParams as AO, SessionTypingEvent as AS, validateWorkerInferenceCancelParams as AT, ChannelsPairingApproveParamsSchema as A_, validateWorktreesCreateParams as Aa, AgentIdentityParamsSchema as Ab, TerminalAckResultSchema as Ac, QuestionOptionSchema as Ad, NodePairApproveParamsSchema as Af, SystemAgentSetupVerifyParams as Ag, CronRemoveParams as Ah, validateTalkConfigResult as Ai, SkillsStatusParams as Ak, TaskSuggestionResolution as Al, DeviceTokenRevokeParams as Am, validateQuestionListParams as An, WorkerHeartbeatParamsSchema as Ao, ChatStatusEvent as Ap, validateSessionsMessagesUnsubscribeParams as Ar, WizardStatusParamsSchema as As, validateEnvironmentsListParams as At, SESSION_VISIBILITY_VALUES as Au, TalkSessionCancelOutputParams as Av, ResponseFrameSchema as Aw, SessionCatalogSession as Ax, UsersSetAvatarResultSchema as Ay, validateChannelsPairingListParams as B, BoardWidgetGrantParamsSchema as BC, AgentsFilesListResultSchema as BD, validateTerminalCloseParams as BE, SkillsProposalActionParams as BO, BoardActionParams as BS, ApprovalAllowDecision as BT, ChannelsPairingListResultSchema as B_, WorktreeRepositoryStatusSchema as Ba, ConversationListResult as Bb, TerminalEventSchema as Bc, QuestionRequestedEventSchema as Bd, NodePendingDrainParamsSchema as Bf, SystemChangesListParams as Bg, CronAddParamsSchema as Bh, validateTalkSessionSubmitToolResultParams as Bi, ToolCatalogEntry as Bk, TaskSuggestionsCreateResultSchema as Bl, ExecApprovalsGetParams as Bm, validateSessionDiscussionOpenParams as Bn, WorkerLiveEventErrorShape as Bo, HooksStatusParams as Bp, validateSessionsSendParams as Br, PluginControlUiDescriptor as Bs, validateFsListDirParams as Bt, SessionDiscussionInfo as Bu, TalkSessionJoinParams as Bv, UiCommandResultSchema as Bw, SessionsCatalogContinueResult as Bx, AuditListResultSchema as By, validateArtifactsGetParams as C, BoardTabsReorderOpSchema as CC, AgentsCreateParams as CD, PendingApprovalSnapshotSchema as CE, SkillsBinsParamsSchema as CO, SessionSuggestionsListParamsSchema as CS, WorkerInferenceStartRequestFrameSchema as CT, CommandsListParamsSchema as C_, validateWizardStatusParams as Ca, AgentsWorkspaceListParams as Cb, PluginsUninstallResult as Cc, QuestionGetResult as Cd, NodeInvokeProgressParamsSchema as Cf, SystemAgentSetupAuthStartParamsSchema as Cg, WorkerTunnelStatusSchema as Ch, validateTalkClientCreateResult as Ci, SkillsSecurityVerdictsParamsSchema as Ck, TasksRecoveryParams as Cl, DevicePairRenameParamsSchema as Cm, validatePluginsSetEnabledParams as Cn, WorkerAdmissionResponseFrame as Co, ChatMessageGetResult as Cp, validateSessionsGroupsListParams as Cr, WizardNextResult as Cs, validateDevicePairRemoveParams as Ct, SessionSharingEventSchema as Cu, TalkConfigResultSchema as Cv, GatewayFrame as Cw, SessionCatalogHost as Cx, UsersSelfParams as Cy, validateBoardActionParams as D, BoardViewTicketSchema as DC, AgentsDeleteParams as DD, PluginApprovalSeverity as DE, SkillsCuratorActionParamsSchema as DO, SessionSuggestionsResolveParamsSchema as DS, WorkerInferenceTerminalFrame as DT, TalkSessionAcknowledgeMarkParamsSchema as D_, validateWorkerLiveEventParams as Da, AgentEvent as Db, PluginApprovalResolveParams as Dc, QuestionListResult as Dd, NodeListParams as Df, SystemAgentSetupDetectParamsSchema as Dg, CronGetParams as Dh, validateTalkClientToolCallResult as Di, SkillsSkillCardParamsSchema as Dk, TaskSuggestion as Dl, DevicePairSetupCodeParamsSchema as Dm, validatePollParams as Dn, WorkerConnectRequestFrameSchema as Do, ChatRunStartupPhase as Dp, validateSessionsGroupsRenameParams as Dr, WizardStartResult as Ds, validateDeviceTokenRotateParams as Dt, SessionVisibilitySetParamsSchema as Du, TalkModeParamsSchema as Dv, RequestFrame as Dw, SessionCatalogPullRequestSummary as Dx, UsersSetAvatarParams as Dy, validateAuditListParams as E, BoardUpdateParamsSchema as EC, AgentsCreateResultSchema as ED, PluginApprovalPresentationSchema as EE, SkillsCuratorActionParams as EO, SessionSuggestionsResolveParams as ES, WorkerInferenceStartResult as ET, TalkSessionAcknowledgeMarkParams as E_, validateWorkerHeartbeatParams as Ea, AgentsWorkspaceListResultSchema as Eb, PluginApprovalRequestParamsSchema as Ec, QuestionListParamsSchema as Ed, NodeInvokeResultParamsSchema as Ef, SystemAgentSetupDetectParams as Eg, CronDeclarativeAddResult as Eh, validateTalkClientToolCallParams as Ei, SkillsSkillCardParams as Ek, TasksRecoveryResultSchema as El, DevicePairSetupCodeParams as Em, validatePluginsUninstallParams as En, WorkerConnectRequestFrame as Eo, ChatMetadataParamsSchema as Ep, validateSessionsGroupsPutParams as Er, WizardStartParamsSchema as Es, validateDeviceTokenRevokeParams as Et, SessionVisibilitySetParams as Eu, TalkModeParams as Ev, HelloOkSchema as Ew, SessionCatalogLocatorSchema as Ex, UsersSelfResultSchema as Ey, validateBoardWidgetGrantParams as F, BoardWidgetDeclared as FC, AgentsFilesGetResult as FD, TerminalApprovalSnapshot as FE, SkillsDetailParamsSchema as FO, SessionTypingResultSchema as FS, validateApprovalGetResult as FT, ChannelsPairingDismissResult as F_, WorktreeBranch as Fa, AgentWaitParamsSchema as Fb, TerminalCloseParams as Fc, QuestionRequestQuestion as Fd, NodePairRemoveParams as Ff, SystemChangeEntrySchema as Fg, CronScratchGetResult as Fh, validateTalkSessionCancelTurnParams as Fi, SkillsUploadBeginParamsSchema as Fk, TaskSuggestionsAcceptResult as Fl, ExecApprovalGetParamsSchema as Fm, validateSecretsResolveParams as Fn, WorkerHeartbeatResult as Fo, ChatToolTitlesResultSchema as Fp, validateSessionsReclaimParams as Fr, PluginCatalogClawHubInstallSchema as Fs, validateExecApprovalsGetParams as Ft, SESSION_VIEWER_PRESENCE_MAX_KEYS as Fu, TalkSessionCloseParamsSchema as Fv, UiClosePaneCommandSchema as Fw, SessionsCatalogArchiveParamsSchema as Fx, AuditEvent as Fy, validateChatHistoryParams as G, BoardWidgetMcpAppContentSchema as GC, AgentsListParams as GD, validateTerminalUploadParams as GE, SkillsProposalCreateParamsSchema as GO, BoardChangedEventSchema as GS, ApprovalDecisionSchema as GT, ChannelsStartParamsSchema as G_, WorktreesCreateParams as Ga, ConversationSendResultSchema as Gb, TerminalListResult as Gc, QuestionResolvedEvent as Gd, NodePendingEnqueueResult as Gf, ConfigApplyParamsSchema as Gg, CronJobSchema as Gh, validateTaskSuggestionsDismissParams as Gi, ToolCatalogProfileSchema as Gk, TaskSuggestionsListParams as Gl, ExecApprovalsNodeSetParamsSchema as Gm, validateSessionSuggestionsAddParams as Gn, WorkerLiveEventRequestFrameSchema as Go, GatewaySuspendPrepareParams as Gp, validateSkillsCuratorStatusParams as Gr, PluginsInstallParams as Gs, validateHooksStatusParams as Gt, SessionDiscussionInfoSchema as Gu, TalkSessionOkResultSchema as Gv, UiSidebarCommandSchema as Gw, SessionsCatalogListParamsSchema as Gx, AuditActivityInboundMessageV1 as Gy, validateChannelsStatusParams as H, BoardWidgetHtmlContentSchema as HC, AgentsFilesSetParamsSchema as HD, validateTerminalOpenParams as HE, SkillsProposalApplyResult as HO, BoardCanvasDocumentSource as HS, ApprovalAllowedReasonSchema as HT, ChannelsLogoutParams as H_, WorktreesBranchesParamsSchema as Ha, ConversationSendParams as Hb, TerminalExitEventSchema as Hc, QuestionResolveParamsSchema as Hd, NodePendingDrainResultSchema as Hf, SystemChangesListResult as Hg, CronDeclarativeAddResultSchema as Hh, validateTalkSpeakParams as Hi, ToolCatalogGroup as Hk, TaskSuggestionsDismissParamsSchema as Hl, ExecApprovalsNodeGetParams as Hm, validateSessionMemberAddParams as Hn, WorkerLiveEventParams as Ho, GatewaySuspendBlocker as Hp, validateSessionsViewerPresenceSetParams as Hr, PluginJsonValueSchema as Hs, validateGatewaySuspendPrepareParams as Ht, SessionDiscussionInfoParamsSchema as Hu, TalkSessionJoinResult as Hv, UiFocusCommandSchema as Hw, SessionsCatalogHostEvent as Hx, AuditActivityAgentRunV1Schema as Hy, validateBoardWidgetPutParams as I, BoardWidgetDeclaredSchema as IC, AgentsFilesGetResultSchema as ID, TerminalApprovalSnapshotSchema as IE, SkillsDetailResult as IO, BOARD_CRON_JOB_ID_MAX_LENGTH as IS, validateApprovalHistoryResult as IT, ChannelsPairingDismissResultSchema as I_, WorktreeBranchSchema as Ia, ConversationListItem as Ib, TerminalCloseParamsSchema as Ic, QuestionRequestQuestionSchema as Id, NodePairRemoveParamsSchema as If, SystemChangeKind as Ig, CronScratchSetParams as Ih, validateTalkSessionCloseParams as Ii, SkillsUploadChunkParams as Ik, TaskSuggestionsAcceptResultSchema as Il, ExecApprovalRequestParams as Im, validateSecretsResolveResult as In, WorkerHelloOk as Io, LogsTailParams as Ip, validateSessionsResetParams as Ir, PluginCatalogEntry as Is, validateExecApprovalsNodeGetParams as It, SessionsViewerPresenceSetParams as Iu, TalkSessionCreateParams as Iv, UiCommand as Iw, SessionsCatalogArchiveResult as Ix, AuditEventSchema as Iy, validateChatMetadataParams as J, BoardWidgetNameSchema as JC, AgentsListResultSchema as JD, ValidationError as JE, SkillsProposalEvaluateResult as JO, BoardCommandEvent as JS, ApprovalGetParams as JT, ChannelsStatusResult as J_, WorktreesGcParamsSchema as Ja, ConversationTurnCancelResult as Jb, TerminalOpenParamsSchema as Jc, QuestionStatus as Jd, NodePluginToolDescriptorSchema as Jf, ConfigPatchParams as Jg, CronPacingSchema as Jh, validateTasksGetParams as Ji, ToolsCatalogResult as Jk, TaskSuggestionsListResultSchema as Jl, ExecApprovalsSetParams as Jm, validateSessionTypingParams as Jn, WorkerLiveEventResult as Jo, GatewaySuspendPrepareResult as Jp, validateSkillsProposalActionParams as Jr, PluginsInstallResultSchema as Js, validateModelsAuthLogoutParams as Jt, SessionDiscussionOpenResult as Ju, TalkSessionSubmitToolResultParams as Jv, SkillsProposalHistoryScanParamsSchema as Jw, SessionsCatalogReadParams as Jx, AuditActivityListParamsSchema as Jy, validateChatInjectParams as K, BoardWidgetMcpAppPutContentSchema as KC, AgentsListParamsSchema as KD, validateTerminalUploadResult as KE, SkillsProposalEvaluateParams as KO, BoardChatDockSchema as KS, ApprovalDeniedReasonSchema as KT, ChannelsStatusParams as K_, WorktreesCreateParamsSchema as Ka, ConversationTurnCancelParams as Kb, TerminalListResultSchema as Kc, QuestionResolvedEventSchema as Kd, NodePendingEnqueueResultSchema as Kf, ConfigGetParams as Kg, CronJobStateSchema as Kh, validateTaskSuggestionsListParams as Ki, ToolsCatalogParams as Kk, TaskSuggestionsListParamsSchema as Kl, ExecApprovalsNodeSnapshot as Km, validateSessionSuggestionsListParams as Kn, WorkerLiveEventResponseFrame as Ko, GatewaySuspendPrepareParamsSchema as Kp, validateSkillsDetailParams as Kr, PluginsInstallParamsSchema as Ks, validateLogsTailParams as Kt, SessionDiscussionOpenParams as Ku, TalkSessionSteerParams as Kv, UiSplitCommandSchema as Kw, SessionsCatalogListResult as Kx, AuditActivityInboundMessageV1Schema as Ky, validateChannelsLogoutParams as L, BoardWidgetGeneratedIdentity as LC, AgentsFilesListParams as LD, TerminalSessionApprovalEventSchema as LE, SkillsDetailResultSchema as LO, BOARD_CRON_TRIGGER_PREFIX as LS, validateApprovalResolveResult as LT, ChannelsPairingListParams as L_, WorktreeRecord as La, ConversationListItemSchema as Lb, TerminalDataEvent as Lc, QuestionRequestResult as Ld, NodePendingAckParams as Lf, SystemChangeKindSchema as Lg, CronScratchSetResult as Lh, validateTalkSessionCreateParams as Li, SkillsUploadChunkParamsSchema as Lk, TaskSuggestionsCreateParams as Ll, ExecApprovalRequestParamsSchema as Lm, validateSendParams as Ln, WorkerLiveEvent as Lo, LogsTailParamsSchema as Lp, validateSessionsResolveParams as Lr, PluginCatalogEntrySchema as Ls, validateExecApprovalsNodeSetParams as Lt, SessionsViewerPresenceSetParamsSchema as Lu, TalkSessionCreateParamsSchema as Lv, UiCommandParams as Lw, SessionsCatalogArchiveResultSchema as Lx, AuditListParams as Ly, validateBoardUpdateParams as M, BoardWidgetAppViewResultSchema as MC, AgentsFileEntrySchema as MD, SessionApprovalReplaySchema as ME, SkillsCuratorStatusResult as MO, SessionTypingParams as MS, validateWorkerInferenceStartParams as MT, ChannelsPairingApproveResultSchema as M_, validateWorktreesListParams as Ma, AgentIdentityResultSchema as Mb, TerminalAttachParamsSchema as Mc, QuestionRecordSchema as Md, NodePairListParamsSchema as Mf, SystemAgentSetupVerifyResult as Mg, CronRunParams as Mh, validateTalkSessionAcknowledgeMarkParams as Mi, SkillsUpdateParams as Mk, TaskSuggestionSchema as Ml, DeviceTokenRotateParams as Mm, validateQuestionResolveParams as Mn, WorkerHeartbeatRequestFrameSchema as Mo, ChatToolTitlesParams as Mp, validateSessionsPatchParams as Mr, WizardStatusResultSchema as Ms, validateExecApprovalGetParams as Mt, SessionSharingRoleSchema as Mu, TalkSessionCancelTurnParams as Mv, ShutdownEventSchema as Mw, SessionCatalogTranscriptItem as Mx, UsersSetDisplayNameParamsSchema as My, validateBoardWidgetAppViewParams as N, BoardWidgetContent as NC, AgentsFilesGetParams as ND, SystemAgentApprovalPresentation as NE, SkillsCuratorStatusResultSchema as NO, SessionTypingParamsSchema as NS, validateWorkerInferenceTerminalFrame as NT, ChannelsPairingDismissParams as N_, validateWorktreesRemoveParams as Na, AgentParamsSchema as Nb, TerminalAttachResult as Nc, QuestionRequestParams as Nd, NodePairRejectParams as Nf, SystemAgentSetupVerifyResultSchema as Ng, CronRunsParams as Nh, validateTalkSessionAppendAudioParams as Ni, SkillsUpdateParamsSchema as Nk, TaskSuggestionsAcceptParams as Nl, DeviceTokenRotateParamsSchema as Nm, validateQuestionWaitAnswerParams as Nn, WorkerHeartbeatResponseFrame as No, ChatToolTitlesParamsSchema as Np, validateSessionsPluginPatchParams as Nr, WizardStep as Ns, validateExecApprovalRequestParams as Nt, SessionVisibility as Nu, TalkSessionCancelTurnParamsSchema as Nv, TickEvent as Nw, SessionCatalogTranscriptItemSchema as Nx, UsersSetDisplayNameResult as Ny, validateBoardDataReadParams as O, BoardWidget as OC, AgentsDeleteParamsSchema as OD, PluginApprovalSeveritySchema as OE, SkillsCuratorActionResult as OO, SessionSuggestionsResolveResult as OS, WorkerInferenceTerminalOutcome as OT, ChannelsPairingAccount as O_, validateWorkerTranscriptCommitParams as Oa, AgentEventSchema as Ob, PluginApprovalResolveParamsSchema as Oc, QuestionListResultSchema as Od, NodeListParamsSchema as Of, SystemAgentSetupDetectResult as Og, CronJob as Oh, validateTalkClientTranscriptParams as Oi, SkillsSkillCardResult as Ok, TaskSuggestionEvent as Ol, DevicePairSetupCodeResult as Om, validatePushTestParams as On, WorkerErrorShape as Oo, ChatRunStartupPhaseSchema as Op, validateSessionsListParams as Or, WizardStartResultSchema as Os, validateEnvironmentsCreateParams as Ot, SessionVisibilitySetResult as Ou, TalkSessionAppendAudioParams as Ov, RequestFrameSchema as Ow, SessionCatalogPullRequestSummarySchema as Ox, UsersSetAvatarParamsSchema as Oy, validateBoardWidgetContent as P, BoardWidgetContentSchema as PC, AgentsFilesGetParamsSchema as PD, SystemAgentApprovalPresentationSchema as PE, SkillsDetailParams as PO, SessionTypingResult as PS, validateWorkerInferenceTerminalOutcome as PT, ChannelsPairingDismissParamsSchema as P_, validateWorktreesRestoreParams as Pa, AgentWaitParams as Pb, TerminalAttachResultSchema as Pc, QuestionRequestParamsSchema as Pd, NodePairRejectParamsSchema as Pf, SystemChangeEntry as Pg, CronScratchGetParams as Ph, validateTalkSessionCancelOutputParams as Pi, SkillsUploadBeginParams as Pk, TaskSuggestionsAcceptParamsSchema as Pl, ExecApprovalGetParams as Pm, validateRequestFrame as Pn, WorkerHeartbeatResponseFrameSchema as Po, ChatToolTitlesResult as Pp, validateSessionsPreviewParams as Pr, WizardStepSchema as Ps, validateExecApprovalResolveParams as Pt, SessionVisibilitySchema as Pu, TalkSessionCloseParams as Pv, TickEventSchema as Pw, SessionsCatalogArchiveParams as Px, UsersSetDisplayNameResultSchema as Py, validateConfigApplyParams as Q, BoardWidgetPresentationSchema as QC, AgentsUpdateResultSchema as QD, GatewayErrorDetailCodes as QE, SkillsProposalEventsListResult as QO, BoardDataReadParams as QS, ApprovalHistoryParams as QT, TalkAgentControlResult as Q_, WorktreesListParamsSchema as Qa, ConversationTurnReply as Qb, TerminalResizeParamsSchema as Qc, QuestionWaitAnswerResult as Qd, NodePresenceActivityPayloadSchema as Qf, ConfigSchemaLookupResult as Qg, CronRunsParamsSchema as Qh, validateToolsEffectiveParams as Qi, ToolsEffectiveGroup as Qk, SystemInfoParams as Ql, EnvironmentStatus as Qm, validateSessionsBranchesSwitchParams as Qn, WorkerTranscriptCommitErrorReason as Qo, GatewaySuspendResumeResult as Qp, validateSkillsProposalInspectParams as Qr, PluginsListResultSchema as Qs, validateNodeDescribeParams as Qt, SessionPlacement as Qu, TalkSessionTurnResult as Qv, SkillsProposalHistoryStatusParamsSchema as Qw, validateMigrationsMemoryApplyParams as Qx, AuditActivityOutboundMessageV1Schema as Qy, validateChannelsPairingApproveParams as R, BoardWidgetGeneratedIdentitySchema as RC, AgentsFilesListParamsSchema as RD, isWellFormedApprovalId as RE, SkillsInstallParams as RO, BOARD_DATA_BINDING_ID_MAX_LENGTH as RS, AllowedApprovalSnapshot as RT, ChannelsPairingListParamsSchema as R_, WorktreeRecordSchema as Ra, ConversationListParams as Rb, TerminalDataEventSchema as Rc, QuestionRequestResultSchema as Rd, NodePendingAckParamsSchema as Rf, SystemChangeSource as Rg, CronStatusParams as Rh, validateTalkSessionJoinParams as Ri, SkillsUploadCommitParams as Rk, TaskSuggestionsCreateParamsSchema as Rl, ExecApprovalResolveParams as Rm, validateSessionDiscussionInfoParams as Rn, WorkerLiveEventErrorDetails as Ro, LogsTailResult as Rp, validateSessionsRewindParams as Rr, PluginCatalogInstallActionSchema as Rs, validateExecApprovalsNodeSnapshot as Rt, SessionsViewerPresenceSetResult as Ru, TalkSessionCreateResult as Rv, UiCommandParamsSchema as Rw, SessionsCatalogContinueParams as Rx, AuditListParamsSchema as Ry, validateArtifactsDownloadParams as S, BoardTabUpdateOpSchema as SC, AgentSummarySchema as SD, PendingApprovalSnapshot as SE, SkillsBinsParams as SO, SessionSuggestionsListParams as SS, WorkerInferenceStartRequestFrame as ST, CommandsListParams as S_, validateWizardStartParams as Sa, AgentsWorkspaceGetResultSchema as Sb, PluginsUninstallParamsSchema as Sc, QuestionGetParamsSchema as Sd, NodeInvokeProgressParams as Sf, SystemAgentSetupAuthStartParams as Sg, WorkerTunnelStatus as Sh, validateTalkClientCreateParams as Si, SkillsSecurityVerdictsParams as Sk, TasksListResultSchema as Sl, DevicePairRenameParams as Sm, validatePluginsSessionActionResult as Sn, WorkerAdmissionHandshakeSchema as So, ChatMessageGetParamsSchema as Sp, validateSessionsGroupsDeleteParams as Sr, WizardNextParamsSchema as Ss, validateDevicePairRejectParams as St, SessionSharingEvent as Su, TalkConfigResult as Sv, GATEWAY_SERVER_CAPS as Sw, SessionCatalogDescriptorSchema as Sx, UsersListResultSchema as Sy, validateAuditActivityListParams as T, BoardUpdateParams as TC, AgentsCreateResult as TD, PluginApprovalPresentation as TE, SkillsBinsResultSchema as TO, SessionSuggestionsListResultSchema as TS, WorkerInferenceStartResponseFrameSchema as TT, CommandsListResultSchema as T_, validateWorkerConnectRequestFrame as Ta, AgentsWorkspaceListResult as Tb, PluginApprovalRequestParams as Tc, QuestionListParams as Td, NodeInvokeResultParams as Tf, SystemAgentSetupAuthStartResultSchema as Tg, CronAddResult as Th, validateTalkClientSteerParams as Ti, SkillsSecurityVerdictsResultSchema as Tk, TasksRecoveryResult as Tl, DevicePairResolvedEventSchema as Tm, validatePluginsUiDescriptorsResult as Tn, WorkerConnectParams as To, ChatMetadataParams as Tp, validateSessionsGroupsMutationResult as Tr, WizardStartParams as Ts, validateDevicePairSetupCodeParams as Tt, SessionSharingIdentitySchema as Tu, TalkEventSchema as Tv, HelloOk as Tw, SessionCatalogLocator as Tx, UsersSelfResult as Ty, validateChannelsStopParams as U, BoardWidgetMaterializedContent as UC, AgentsFilesSetResult as UD, validateTerminalResizeParams as UE, SkillsProposalApplyResultSchema as UO, BoardCanvasDocumentSourceSchema as US, ApprovalCancelledReasonSchema as UT, ChannelsLogoutParamsSchema as U_, WorktreesBranchesResult as Ua, ConversationSendParamsSchema as Ub, TerminalInputParams as Uc, QuestionResolveResult as Ud, NodePendingEnqueueParams as Uf, SystemChangesListResultSchema as Ug, CronDeliverySchema as Uh, validateTaskSuggestionsAcceptParams as Ui, ToolCatalogGroupSchema as Uk, TaskSuggestionsDismissResult as Ul, ExecApprovalsNodeGetParamsSchema as Um, validateSessionMemberRemoveParams as Un, WorkerLiveEventParamsSchema as Uo, GatewaySuspendBlockerSchema as Up, validateSkillsBinsParams as Ur, PluginSearchPackageSchema as Us, validateGatewaySuspendResumeParams as Ut, SessionDiscussionInfoResult as Uu, TalkSessionJoinResultSchema as Uv, UiNavigateCommandSchema as Uw, SessionsCatalogHostEventSchema as Ux, AuditActivityEventV1 as Uy, validateChannelsStartParams as V, BoardWidgetHeightModeSchema as VC, AgentsFilesSetParams as VD, validateTerminalInputParams as VE, SkillsProposalActionParamsSchema as VO, BoardActionParamsSchema as VS, ApprovalAllowDecisionSchema as VT, ChannelsPairingRequest as V_, WorktreesBranchesParams as Va, ConversationListResultSchema as Vb, TerminalExitEvent as Vc, QuestionResolveParams as Vd, NodePendingDrainResult as Vf, SystemChangesListParamsSchema as Vg, CronAddResultSchema as Vh, validateTalkSessionTurnParams as Vi, ToolCatalogEntrySchema as Vk, TaskSuggestionsDismissParams as Vl, ExecApprovalsGetParamsSchema as Vm, validateSessionDiscussionOpenResult as Vn, WorkerLiveEventErrorShapeSchema as Vo, HooksStatusParamsSchema as Vp, validateSessionsUsageParams as Vr, PluginControlUiDescriptorSchema as Vs, validateFsListDirResult as Vt, SessionDiscussionInfoParams as Vu, TalkSessionJoinParamsSchema as Vv, UiCommandSchema as Vw, SessionsCatalogContinueResultSchema as Vx, AuditActivityAgentRunV1 as Vy, validateChatAbortParams as W, BoardWidgetMaterializedPutParams as WC, AgentsFilesSetResultSchema as WD, validateTerminalTextParams as WE, SkillsProposalCreateParams as WO, BoardChangedEvent as WS, ApprovalDecision as WT, ChannelsStartParams as W_, WorktreesBranchesResultSchema as Wa, ConversationSendResult as Wb, TerminalInputParamsSchema as Wc, QuestionResolveResultSchema as Wd, NodePendingEnqueueParamsSchema as Wf, ConfigApplyParams as Wg, CronGetParamsSchema as Wh, validateTaskSuggestionsCreateParams as Wi, ToolCatalogProfile as Wk, TaskSuggestionsDismissResultSchema as Wl, ExecApprovalsNodeSetParams as Wm, validateSessionMembersListParams as Wn, WorkerLiveEventRequestFrame as Wo, GatewaySuspendPrepareBusyResultSchema as Wp, validateSkillsCuratorActionParams as Wr, PluginSearchResultEntrySchema as Ws, validateGatewaySuspendStatusParams as Wt, SessionDiscussionInfoResultSchema as Wu, TalkSessionOkResult as Wv, UiPanelCommandSchema as Ww, SessionsCatalogListParams as Wx, AuditActivityEventV1Schema as Wy, validateChatToolTitlesParams as X, BoardWidgetPluginKindSchema as XC, AgentsUpdateParamsSchema as XD, ErrorCode as XE, SkillsProposalEventsListParams as XO, BoardCommandSchema as XS, ApprovalGetResult as XT, ChannelsStopParams as X_, WorktreesGcResultSchema as Xa, ConversationTurnParams as Xb, TerminalOpenResultSchema as Xc, QuestionWaitAnswerParams as Xd, NodePluginToolsUpdateParamsSchema as Xf, ConfigSchemaLookupParams as Xg, CronRunLogEntrySchema as Xh, validateTasksRecoveryParams as Xi, ToolsEffectiveEntry as Xk, SYSTEM_PRESENCE_LEGACY_CLEAR_LAST_INPUT_SECONDS as Xl, ExecApprovalsSnapshot as Xm, validateSessionsAbortParams as Xn, WorkerLiveEventSchema as Xo, GatewaySuspendResumeParams as Xp, validateSkillsProposalEvaluateParams as Xr, PluginsListParamsSchema as Xs, validateModelsListParams as Xt, SessionDiscussionState as Xu, TalkSessionTurnParams as Xv, SkillsProposalHistoryScanResultSchema as Xw, SessionsCatalogReadResult as Xx, AuditActivityListResultSchema as Xy, validateChatSendParams as Y, BoardWidgetPluginContentSchema as YC, AgentsUpdateParams as YD, formatValidationErrors as YE, SkillsProposalEvaluateResultSchema as YO, BoardCommandEventSchema as YS, ApprovalGetParamsSchema as YT, ChannelsStatusResultSchema as Y_, WorktreesGcResult as Ya, ConversationTurnCancelResultSchema as Yb, TerminalOpenResult as Yc, QuestionStatusSchema as Yd, NodePluginToolsUpdateParams as Yf, ConfigPatchParamsSchema as Yg, CronRemoveParamsSchema as Yh, validateTasksListParams as Yi, ToolsCatalogResultSchema as Yk, SYSTEM_PRESENCE_CLEAR_LAST_INPUT_TAG as Yl, ExecApprovalsSetParamsSchema as Ym, validateSessionVisibilitySetParams as Yn, WorkerLiveEventResultSchema as Yo, GatewaySuspendPrepareResultSchema as Yp, validateSkillsProposalCreateParams as Yr, PluginsListParams as Ys, validateModelsAuthStatusParams as Yt, SessionDiscussionOpenResultSchema as Yu, TalkSessionSubmitToolResultParamsSchema as Yv, SkillsProposalHistoryScanResult as Yw, SessionsCatalogReadParamsSchema as Yx, AuditActivityListResult as Yy, validateCommandsListParams as Z, BoardWidgetPluginPropsSchema as ZC, AgentsUpdateResult as ZD, ErrorCodes as ZE, SkillsProposalEventsListParamsSchema as ZO, BoardCronActionParamsSchema as ZS, ApprovalGetResultSchema as ZT, ChannelsStopParamsSchema as Z_, WorktreesListParams as Za, ConversationTurnParamsSchema as Zb, TerminalResizeParams as Zc, QuestionWaitAnswerParamsSchema as Zd, NodePresenceActivityPayload as Zf, ConfigSchemaLookupParamsSchema as Zg, CronRunParamsSchema as Zh, validateToolsCatalogParams as Zi, ToolsEffectiveEntrySchema as Zk, validateSystemEventParams as Zl, ExecApprovalsSnapshotSchema as Zm, validateSessionsBranchesListParams as Zn, WorkerProtocolCloseReason as Zo, GatewaySuspendResumeParamsSchema as Zp, validateSkillsProposalEventsListParams as Zr, PluginsListResult as Zs, validateModelsProbeParams as Zt, SessionDiscussionStateSchema as Zu, TalkSessionTurnParamsSchema as Zv, SkillsProposalHistoryStatusParams as Zw, SessionsCatalogReadResultSchema as Zx, AuditActivityOutboundMessageV1 as Zy, validateAgentsWorkspaceListParams as _, BoardTab as _C, isClawHubTrustErrorCode as _D, DeniedApprovalSnapshotSchema as _E, ModelsProbeTargetResultSchema as _O, SessionSuggestionStateSchema as _S, WorkerInferenceModelRef as _T, COMMAND_DESCRIPTION_MAX_LENGTH as __, validateWebPushTestParams as _a, AgentsWorkspaceFile as _b, PluginsUiDescriptorsParams as _c, SecretsResolveResultSchema as _d, NodeEventResultSchema as _f, SystemAgentChatResultSchema as _g, EnvironmentsStatusResultSchema as _h, validateSystemChangesListParams as _i, SkillsProposalsListResultSchema as _k, TasksGetResult as _l, DevicePairListParamsSchema as _m, validatePluginsInstallParams as _n, WORKER_TRANSCRIPT_MAX_BATCH_MESSAGES as _o, ChatEventSchema as _p, validateSessionsFilesGetParams as _r, WizardAnswer as _s, validateCronScratchSetParams as _t, SessionMembersListParamsSchema as _u, TalkClientToolCallResultSchema as _v, ConnectParamsSchema as _w, SessionLabelString as _x, UsersLinkEmailResult as _y, PROTOCOL_VERSION as a, ToolsEffectiveResultSchema as aA, BoardLegacyEventParamsSchema as aC, readMissingScopeError as aD, ApprovalPresentationSchema as aE, ModelsAuthLogoutParamsSchema as aO, MigrationsMemoryApplyResult as aS, WORKER_PROTOCOL_MAX_INFERENCE_PAYLOAD_BYTES as aT, ConfigSetParamsSchema as a_, validateUsersLinkEmailResult as aa, ArtifactsDownloadResult as ab, PluginsSearchResult as ac, SessionsDispatchResultSchema as ad, WebPushSubscribeParamsSchema as af, CronUpdateParamsSchema as ag, EnvironmentsCreateResultSchema as ah, validateSkillsSkillCardParams as ai, SkillsProposalRecordResultSchema as ak, TerminalUploadParams as al, GatewaySuspendStatusRunningResultSchema as am, validateNodePairListParams as an, WorktreesRestoreParams as ao, NodeSkillDescriptor as ap, validateSessionsCompactionBranchParams as ar, WorkerTranscriptCommitRequestFrameSchema as as, validateConnectParams as at, SnapshotSchema as au, TalkClientCloseParamsSchema as av, BoardWidgetRemoveOpSchema as aw, PollParamsSchema as ax, TtsSpeakParamsSchema as ay, validateApprovalPresentation as b, BoardTabIdSchema as bC, AgentKindSchema as bD, ExpiredApprovalSnapshot as bE, SkillProposalLifecycleEvent as bO, SessionSuggestionsAddResult as bS, WorkerInferenceOptionsSchema as bT, CommandEntry as b_, validateWizardCancelParams as ba, AgentsWorkspaceGetParamsSchema as bb, PluginsUiDescriptorsResultSchema as bc, QuestionAnswersSchema as bd, NodeInvokeParams as bf, SystemAgentSetupActivateResult as bg, WorkerEnvironmentState as bh, validateTalkCatalogParams as bi, SkillsSearchResult as bk, TasksListParamsSchema as bl, DevicePairRemoveParams as bm, validatePluginsSearchParams as bn, WorkerAdmissionFailureReason as bo, ChatInjectParams as bp, validateSessionsFilesSetParams as br, WizardCancelParamsSchema as bs, validateDevicePairApproveParams as bt, SessionSharingAction as bu, TalkConfigParams as bv, EventFrame as bw, SessionCatalogCapabilitiesSchema as bx, UsersListParamsSchema as by, validateAgentWaitParams as c, ToolsInvokeParamsSchema as cA, BoardOp as cC, SystemAgentInferenceUnavailableErrorDetails as cD, ApprovalResolveResult as cE, ModelsListParams as cO, SessionSuggestion as cS, WorkerInferenceCancelRequestFrameSchema as cT, UpdateStatusParams as c_, validateUsersSelfResult as ca, ArtifactsGetParamsSchema as cb, PluginsSessionActionParams as cc, SessionsReclaimResult as cd, WebPushUnsubscribeParams as cf, SystemAgentChatHistoryResult as cg, EnvironmentsDestroyResult as ch, validateSkillsUploadBeginParams as ci, SkillsProposalRequestRevisionResult as ck, TerminalUploadResultSchema as cl, FsDirEntry as cm, validateNodePendingAckParams as cn, WORKER_LAUNCH_V2_PROTOCOL_FEATURE as co, NodeSkillsUpdateParamsSchema as cp, validateSessionsCompactionRestoreParams as cr, WorkerTranscriptCommitResult as cs, validateConversationTurnCancelParams as ct, SessionMember as cu, TalkClientCreateResult as cv, GatewayErrorDetailsSchema as cw, WakeParamsSchema as cx, WebLoginStartParams as cy, validateAgentsFilesGetParams as d, BoardPromptAuthorizeParams as dC, buildSystemAgentSessionInvalidatedErrorDetails as dD, ApprovalSnapshotSchema as dE, ModelsListResultSchema as dO, SessionSuggestionEvent as dS, WorkerInferenceCancelResult as dT, COMMAND_ARGS_MAX_ITEMS as d_, validateUsersSetDisplayNameParams as da, ArtifactsListParams as db, PluginsSessionActionResultSchema as dc, isCloudWorkerPlacementState as dd, WebPushVapidPublicKeyParamsSchema as df, SystemAgentChatHistoryTurnSchema as dg, EnvironmentsListParamsSchema as dh, validateSystemAgentChatHistoryParams as di, SkillsProposalReviseParamsSchema as dk, TasksCancelParams as dl, FsListDirParamsSchema as dm, validateNodePluginToolsUpdateParams as dn, WORKER_PROTOCOL_MAX_FEATURES as do, ChatAbortedEventSchema as dp, validateSessionsCompanionStateParams as dr, WorkerTranscriptMessageSchema as ds, validateCronGetParams as dt, SessionMemberMutationResult as du, TalkClientMutationResultSchema as dv, UnknownAgentIdErrorDetailsSchema as dw, GatewayClientIdSchema as dx, WebLoginWaitParamsSchema as dy, ToolsEffectiveNotice as eA, BoardEventParams as eC, McpAppViewExpiredErrorDetails as eD, ApprovalHistoryResult as eE, AuthProbeStatusSchema as eO, MAX_MEMORY_MIGRATION_ITEMS as eS, validateSkillsProposalHistoryStatusParams as eT, ConfigSchemaParams as e_, validateTtsSpeakParams as ea, AuditActivityToolActionV1Schema as eb, PluginsRefreshParamsSchema as ec, SessionPlacementSchema as ed, PushTestParams as ef, CronScratchGetResultSchema as eg, EnvironmentSummary as eh, validateSkillsProposalReviseParams as ei, SkillsProposalInspectParams as ek, TerminalSessionInfoSchema as el, GatewaySuspendStatusParams as em, validateNodeInvokeParams as en, WorktreesListResultSchema as eo, NodePresenceAlivePayloadSchema as ep, validateSessionsCatalogContinueParams as er, WorkerTranscriptCommitErrorShape as es, validateConfigPatchParams as et, SystemInfoResult as eu, TalkCatalogParams as ev, BoardWidgetPutContentSchema as ew, ConversationTurnResult as ex, TalkSpeakParams as ey, validateAgentsFilesListParams as f, BoardPromptAuthorizeParamsSchema as fC, readSystemAgentInferenceUnavailableErrorDetails as fD, ApprovalTerminalReason as fE, ModelsProbeParams as fO, SessionSuggestionEventSchema as fS, WorkerInferenceContext as fT, COMMAND_ARG_CHOICES_MAX_ITEMS as f_, validateUsersSetDisplayNameResult as fa, ArtifactsListParamsSchema as fb, PluginsSessionActionSuccessResultSchema as fc, SecretsReloadParamsSchema as fd, NodeDescribeParams as ff, SystemAgentChatParams as fg, EnvironmentsListResult as fh, validateSystemAgentChatParams as fi, SkillsProposalUpdateParams as fk, TasksCancelParamsSchema as fl, FsListDirResult as fm, validateNodePresenceActivityPayload as fn, WORKER_PROTOCOL_MAX_FEATURE_LENGTH as fo, ChatAttachmentSchema as fp, validateSessionsCreateParams as fr, WORKER_PROTOCOL_MAX_FRAME_ID_LENGTH as fs, validateCronListParams as ft, SessionMemberMutationResultSchema as fu, TalkClientSteerParams as fv, WizardNotFoundErrorDetailsSchema as fw, GatewayClientModeSchema as fx, UserProfile as fy, validateAgentsWorkspaceGetParams as g, BoardSnapshotSchema as gC, buildClawHubTrustErrorDetails as gD, DeniedApprovalSnapshot as gE, ModelsProbeTargetResult as gO, SessionSuggestionState as gS, WorkerInferenceEventParams as gT, COMMAND_CHOICE_VALUE_MAX_LENGTH as g_, validateWebPushSubscribeParams as ga, AgentsWorkspaceEntrySchema as gb, PluginsSetEnabledResultSchema as gc, SecretsResolveResult as gd, NodeEventResult as gf, SystemAgentChatResult as gg, EnvironmentsStatusResult as gh, validateSystemAgentSetupVerifyParams as gi, SkillsProposalsListResult as gk, TasksGetParamsSchema as gl, DevicePairListParams as gm, validatePluginApprovalResolveParams as gn, WORKER_TRANSCRIPT_COMMIT_PROTOCOL_FEATURE as go, ChatEvent as gp, validateSessionsDispatchParams as gr, WorkerProtocolCloseReasonSchema as gs, validateCronScratchGetParams as gt, SessionMembersListParams as gu, TalkClientToolCallResult as gv, ConnectParams as gw, SecretRefSchema as gx, UsersLinkEmailParamsSchema as gy, validateAgentsUpdateParams as h, BoardSnapshot as hC, ClawHubTrustErrorDetails as hD, CancelledApprovalSnapshotSchema as hE, ModelsProbeResultSchema as hO, SessionSuggestionSchema as hS, WorkerInferenceEventFrame as hT, COMMAND_CHOICE_LABEL_MAX_LENGTH as h_, validateWebLoginWaitParams as ha, AgentsWorkspaceEntry as hb, PluginsSetEnabledResult as hc, SecretsResolveParamsSchema as hd, NodeEventParamsSchema as hf, SystemAgentChatQuestionSchema as hg, EnvironmentsStatusParamsSchema as hh, validateSystemAgentSetupDetectParams as hi, SkillsProposalsListParamsSchema as hk, TasksGetParams as hl, DevicePairApproveParamsSchema as hm, validatePluginApprovalRequestParams as hn, WORKER_RPC_SET_VERSION as ho, ChatErrorEventSchema as hp, validateSessionsDiffParams as hr, WorkerAdmissionFailureReasonSchema as hs, validateCronRunsParams as ht, SessionMemberSchema as hu, TalkClientToolCallParamsSchema as hv, missingScopeErrorShape as hw, SecretInputSchema as hx, UsersLinkEmailParams as hy, MIN_PROBE_PROTOCOL_VERSION as i, ToolsEffectiveResult as iA, BoardGetParamsSchema as iC, isMcpAppViewExpiredError as iD, ApprovalPresentation as iE, ModelsAuthLogoutParams as iO, MigrationsMemoryApplyParamsSchema as iS, WORKER_INFERENCE_PROTOCOL_FEATURE as iT, ConfigSetParams as i_, validateUsersLinkEmailParams as ia, ArtifactsDownloadParamsSchema as ib, PluginsSearchParamsSchema as ic, SessionsDispatchResult as id, WebPushSubscribeParams as if, CronStatusParamsSchema as ig, EnvironmentsCreateResult as ih, validateSkillsSecurityVerdictsParams as ii, SkillsProposalRecordResult as ik, TerminalTextResultSchema as il, GatewaySuspendStatusResultSchema as im, validateNodePairApproveParams as in, WorktreesRemoveResultSchema as io, NodeRenameParamsSchema as ip, validateSessionsCompactParams as ir, WorkerTranscriptCommitRequestFrame as is, validateConfigSetParams as it, Snapshot as iu, TalkClientCloseParams as iv, BoardWidgetPutResultSchema as iw, PollParams as ix, TtsSpeakParams as iy, validateBoardPromptAuthorizeParams as j, BoardWidgetAppViewResult as jC, AgentsFileEntry as jD, SessionApprovalReplay as jE, SkillsCuratorStatusParamsSchema as jO, SessionTypingEventSchema as jS, validateWorkerInferenceEventFrame as jT, ChannelsPairingApproveResult as j_, validateWorktreesGcParams as ja, AgentIdentityResult as jb, TerminalAttachParams as jc, QuestionRecord as jd, NodePairListParams as jf, SystemAgentSetupVerifyParamsSchema as jg, CronRunLogEntry as jh, validateTalkModeParams as ji, SkillsStatusParamsSchema as jk, TaskSuggestionResolutionSchema as jl, DeviceTokenRevokeParamsSchema as jm, validateQuestionRequestParams as jn, WorkerHeartbeatRequestFrame as jo, ChatStatusEventSchema as jp, validateSessionsObserverVisibilityParams as jr, WizardStatusResult as js, validateEnvironmentsStatusParams as jt, SessionSharingRole as ju, TalkSessionCancelOutputParamsSchema as jv, ShutdownEvent as jw, SessionCatalogSessionSchema as jx, UsersSetDisplayNameParams as jy, validateBoardEventParams as k, BoardWidgetAppViewParams as kC, AgentsDeleteResult as kD, SessionApprovalEvent as kE, SkillsCuratorActionResultSchema as kO, SessionSuggestionsResolveResultSchema as kS, WorkerInferenceTerminalParams as kT, ChannelsPairingApproveParams as k_, validateWorktreesBranchesParams as ka, AgentIdentityParams as kb, TerminalAckResult as kc, QuestionOption as kd, NodePairApproveParams as kf, SystemAgentSetupDetectResultSchema as kg, CronListParams as kh, validateTalkConfigParams as ki, SkillsSkillCardResultSchema as kk, TaskSuggestionEventSchema as kl, DevicePairSetupCodeResultSchema as km, validateQuestionGetParams as kn, WorkerHeartbeatParams as ko, ChatSendParamsSchema as kp, validateSessionsMessagesSubscribeParams as kr, WizardStatusParams as ks, validateEnvironmentsDestroyParams as kt, SessionVisibilitySetResultSchema as ku, TalkSessionAppendAudioParamsSchema as kv, ResponseFrame as kw, SessionCatalogSchema as kx, UsersSetAvatarResult as ky, validateAgentsCreateParams as l, ToolsInvokeResult as lA, BoardOpSchema as lC, SystemAgentSessionInvalidatedErrorDetails as lD, ApprovalResolveResultSchema as lE, ModelsListParamsSchema as lO, SessionSuggestionAction as lS, WorkerInferenceCancelResponseFrame as lT, UpdateStatusParamsSchema as l_, validateUsersSetAvatarParams as la, ArtifactsGetResult as lb, PluginsSessionActionParamsSchema as lc, SessionsReclaimResultSchema as ld, WebPushUnsubscribeParamsSchema as lf, SystemAgentChatHistoryResultSchema as lg, EnvironmentsDestroyResultSchema as lh, validateSkillsUploadChunkParams as li, SkillsProposalRequestRevisionResultSchema as lk, TaskSummary as ll, FsDirEntrySchema as lm, validateNodePendingDrainParams as ln, WORKER_LIVE_EVENT_PROTOCOL_FEATURE as lo, ChatAbortParams as lp, validateSessionsCompanionAskParams as lr, WorkerTranscriptCommitResultSchema as ls, validateConversationTurnParams as lt, SessionMemberAddParams as lu, TalkClientCreateResultSchema as lv, McpAppViewExpiredErrorDetailsSchema as lw, CHAT_SEND_SESSION_KEY_MAX_LENGTH as lx, WebLoginStartParamsSchema as ly, validateAgentsListParams as m, BoardSizeSchema as mC, ClawHubTrustErrorCodes as mD, CancelledApprovalSnapshot as mE, ModelsProbeResult as mO, SessionSuggestionResolutionSchema as mS, WorkerInferenceErrorShape as mT, COMMAND_ARG_NAME_MAX_LENGTH as m_, validateWebLoginStartParams as ma, ArtifactsListResultSchema as mb, PluginsSetEnabledParamsSchema as mc, SecretsResolveParams as md, NodeEventParams as mf, SystemAgentChatQuestion as mg, EnvironmentsStatusParams as mh, validateSystemAgentSetupAuthStartParams as mi, SkillsProposalsListParams as mk, TasksCancelResultSchema as ml, DevicePairApproveParams as mm, validateNodeSkillsUpdateParams as mn, WORKER_PROTOCOL_METHODS as mo, ChatDeltaEventSchema as mp, validateSessionsDescribeParams as mr, WORKER_PROTOCOL_MAX_PAYLOAD_BYTES as ms, validateCronRunParams as mt, SessionMemberRemoveParamsSchema as mu, TalkClientToolCallParams as mv, errorShape as mw, NonEmptyString as mx, UserProfileSchema as my, MIN_CLIENT_PROTOCOL_VERSION as n, ToolsEffectiveParams as nA, BoardFocusTabCommandSchema as nC, UnknownAgentIdErrorDetails as nD, ApprovalKind as nE, ModelChoice as nO, MemoryMigrationProviderPlan as nS, WORKER_INFERENCE_MAX_OUTPUT_TOKENS as nT, ConfigSchemaResponse as n_, validateUpdateRunParams as na, ArtifactSummarySchema as nb, PluginsRefreshResultSchema as nc, SessionsDispatchParams as nd, PushTestResult as nf, CronScratchSetParamsSchema as ng, EnvironmentsCreateParams as nh, validateSkillsProposalsListParams as ni, SkillsProposalInspectResult as nk, TerminalTextParamsSchema as nl, GatewaySuspendStatusReadyResultSchema as nm, validateNodeInvokeResultParams as nn, WorktreesRemoveParamsSchema as no, NodePresenceAliveReasonSchema as np, validateSessionsCatalogReadParams as nr, WorkerTranscriptCommitParams as ns, validateConfigSchemaLookupResult as nt, PresenceEntry as nu, TalkCatalogResult as nv, BoardWidgetPutParamsSchema as nw, MessageActionParams as nx, TalkSpeakResult as ny, validateAgentIdentityParams as o, ToolsInvokeErrorSchema as oA, BoardMcpAppDescriptor as oC, readMissingScopeErrorDetails as oD, ApprovalResolveParams as oE, ModelsAuthStatusParams as oO, MigrationsMemoryPlanParamsSchema as oS, WorkerInferenceCancelParams as oT, UpdateRunParams as o_, validateUsersListParams as oa, ArtifactsDownloadResultSchema as ob, PluginsSearchResultSchema as oc, SessionsReclaimParams as od, WebPushTestParams as of, SystemAgentChatHistoryParams as og, EnvironmentsDestroyParams as oh, validateSkillsStatusParams as oi, SkillsProposalRequestRevisionParams as ok, TerminalUploadParamsSchema as ol, GatewaySuspendTaskBlocker as om, validateNodePairRejectParams as on, WorktreesRestoreParamsSchema as oo, NodeSkillDescriptorSchema as op, validateSessionsCompactionGetParams as or, WorkerTranscriptCommitResponseFrame as os, validateConversationListParams as ot, StateVersion as ou, TalkClientCreateParams as ov, BoardWidgetResizeOpSchema as ow, SendParamsSchema as ox, TtsSpeakResult as oy, validateAgentsFilesSetParams as p, BoardSetChatDockCommandSchema as pC, readSystemAgentSessionInvalidatedErrorDetails as pD, ApprovalTerminalReasonSchema as pE, ModelsProbeParamsSchema as pO, SessionSuggestionResolution as pS, WorkerInferenceErrorReason as pT, COMMAND_ARG_DESCRIPTION_MAX_LENGTH as p_, validateWakeParams as pa, ArtifactsListResult as pb, PluginsSetEnabledParams as pc, SecretsResolveAssignmentSchema as pd, NodeDescribeParamsSchema as pf, SystemAgentChatParamsSchema as pg, EnvironmentsListResultSchema as ph, validateSystemAgentSetupActivateParams as pi, SkillsProposalUpdateParamsSchema as pk, TasksCancelResult as pl, FsListDirResultSchema as pm, validateNodeRenameParams as pn, WORKER_PROTOCOL_MAX_METHOD_LENGTH as po, ChatAttachmentsSchema as pp, validateSessionsDeleteParams as pr, WORKER_PROTOCOL_MAX_IDENTIFIER_LENGTH as ps, validateCronRemoveParams as pt, SessionMemberRemoveParams as pu, TalkClientSteerParamsSchema as pv, buildMissingScopeErrorDetails as pw, InputProvenanceSchema as px, UserProfileAvatarMimeSchema as py, validateChatMessageGetParams as q, BoardWidgetMoveOpSchema as qC, AgentsListResult as qD, ProtocolValidator as qE, SkillsProposalEvaluateParamsSchema as qO, BoardCommand as qS, ApprovalExpiredReasonSchema as qT, ChannelsStatusParamsSchema as q_, WorktreesGcParams as qa, ConversationTurnCancelParamsSchema as qb, TerminalOpenParams as qc, QuestionSchema as qd, NodePluginToolDescriptor as qf, ConfigGetParamsSchema as qg, CronListParamsSchema as qh, validateTasksCancelParams as qi, ToolsCatalogParamsSchema as qk, TaskSuggestionsListResult as ql, ExecApprovalsNodeSnapshotSchema as qm, validateSessionSuggestionsResolveParams as qn, WorkerLiveEventResponseFrameSchema as qo, GatewaySuspendPrepareReadyResultSchema as qp, validateSkillsInstallParams as qr, PluginsInstallResult as qs, validateMessageActionParams as qt, SessionDiscussionOpenParamsSchema as qu, TalkSessionSteerParamsSchema as qv, SkillsProposalHistoryScanParams as qw, SessionsCatalogListResultSchema as qx, AuditActivityListParams as qy, MIN_NODE_PROTOCOL_VERSION as r, ToolsEffectiveParamsSchema as rA, BoardGetParams as rC, WizardNotFoundErrorDetails as rD, ApprovalKindSchema as rE, ModelChoiceSchema as rO, MigrationProtocolSchemas as rS, WORKER_INFERENCE_METHODS as rT, ConfigSchemaResponseSchema as r_, validateUpdateStatusParams as ra, ArtifactsDownloadParams as rb, PluginsSearchParams as rc, SessionsDispatchParamsSchema as rd, PushTestResultSchema as rf, CronScratchSetResultSchema as rg, EnvironmentsCreateParamsSchema as rh, validateSkillsSearchParams as ri, SkillsProposalInspectResultSchema as rk, TerminalTextResult as rl, GatewaySuspendStatusResult as rm, validateNodeListParams as rn, WorktreesRemoveResult as ro, NodeRenameParams as rp, validateSessionsCleanupParams as rr, WorkerTranscriptCommitParamsSchema as rs, validateConfigSchemaParams as rt, PresenceEntrySchema as ru, TalkCatalogResultSchema as rv, BoardWidgetPutResult as rw, MessageActionParamsSchema as rx, TalkSpeakResultSchema as ry, validateAgentParams as s, ToolsInvokeParams as sA, BoardMcpAppDescriptorSchema as sC, SystemAgentErrorDetailCodes as sD, ApprovalResolveParamsSchema as sE, ModelsAuthStatusParamsSchema as sO, MigrationsMemoryPlanResult as sS, WorkerInferenceCancelRequestFrame as sT, UpdateRunParamsSchema as s_, validateUsersSelfParams as sa, ArtifactsGetParams as sb, PluginsSessionActionFailureResultSchema as sc, SessionsReclaimParamsSchema as sd, WebPushTestParamsSchema as sf, SystemAgentChatHistoryParamsSchema as sg, EnvironmentsDestroyParamsSchema as sh, validateSkillsUpdateParams as si, SkillsProposalRequestRevisionParamsSchema as sk, TerminalUploadResult as sl, GatewaySuspendTaskBlockerSchema as sm, validateNodePairRemoveParams as sn, WORKER_HEARTBEAT_INTERVAL_MS as so, NodeSkillsUpdateParams as sp, validateSessionsCompactionListParams as sr, WorkerTranscriptCommitResponseFrameSchema as ss, validateConversationSendParams as st, StateVersionSchema as su, TalkClientCreateParamsSchema as sv, BoardWidgetSchema as sw, WakeParams as sx, TtsSpeakResultSchema as sy, SessionsPatchResult as t, ToolsEffectiveNoticeSchema as tA, BoardEventParamsSchema as tC, MissingScopeErrorDetails as tD, ApprovalHistoryResultSchema as tE, GatewayAgentRuntime as tO, MemoryMigrationItem as tS, WORKER_INFERENCE_MAX_CONTEXT_MESSAGES as tT, ConfigSchemaParamsSchema as t_, validateUiCommandParams as ta, ArtifactSummary as tb, PluginsRefreshResult as tc, SessionPlacementStateSchema as td, PushTestParamsSchema as tf, CronScratchSchema as tg, EnvironmentSummarySchema as th, validateSkillsProposalUpdateParams as ti, SkillsProposalInspectParamsSchema as tk, TerminalTextParams as tl, GatewaySuspendStatusParamsSchema as tm, validateNodeInvokeProgressParams as tn, WorktreesRemoveParams as to, NodePresenceAliveReason as tp, validateSessionsCatalogListParams as tr, WorkerTranscriptCommitErrorShapeSchema as ts, validateConfigSchemaLookupParams as tt, SystemInfoResultSchema as tu, TalkCatalogParamsSchema as tv, BoardWidgetPutParams as tw, ConversationTurnResultSchema as tx, TalkSpeakParamsSchema as ty, validateAgentsDeleteParams as u, ToolsInvokeResultSchema as uA, BoardPluginActionParamsSchema as uC, buildSystemAgentInferenceUnavailableErrorDetails as uD, ApprovalSnapshot as uE, ModelsListResult as uO, SessionSuggestionActionSchema as uS, WorkerInferenceCancelResponseFrameSchema as uT, COMMAND_ALIAS_MAX_ITEMS as u_, validateUsersSetAvatarResult as ua, ArtifactsGetResultSchema as ub, PluginsSessionActionResult as uc, SessionPlacementState as ud, WebPushVapidPublicKeyParams as uf, SystemAgentChatHistoryTurn as ug, EnvironmentsListParams as uh, validateSkillsUploadCommitParams as ui, SkillsProposalReviseParams as uk, TaskSummarySchema as ul, FsListDirParams as um, validateNodePendingEnqueueParams as un, WORKER_PROTOCOL_FEATURES as uo, ChatAbortParamsSchema as up, validateSessionsCompanionResetParams as ur, WorkerTranscriptMessage as us, validateCronAddParams as ut, SessionMemberAddParamsSchema as uu, TalkClientMutationResult as uv, MissingScopeErrorDetailsSchema as uw, ChatSendSessionKeyString as ux, WebLoginWaitParams as uy, validateApprovalGetParams as v, BoardTabCreateOpSchema as vC, readClawHubTrustErrorDetails as vD, ExecApprovalPresentation as vE, SkillProposalEvaluation as vO, SessionSuggestionsAddParams as vS, WorkerInferenceModelRefSchema as vT, COMMAND_LIST_MAX_ITEMS as v_, validateWebPushUnsubscribeParams as va, AgentsWorkspaceFileSchema as vb, PluginsUiDescriptorsParamsSchema as vc, Question as vd, NodeInvokeInputEvent as vf, SystemAgentSetupActivateParams as vg, WorkerEnvironmentMetadata as vh, validateSystemInfoParams as vi, SkillsSearchParams as vk, TasksGetResultSchema as vl, DevicePairRejectParams as vm, validatePluginsListParams as vn, WORKER_TRANSCRIPT_MAX_CONTENT_PARTS as vo, ChatFinalEventSchema as vp, validateSessionsFilesListParams as vr, WizardAnswerSchema as vs, validateCronStatusParams as vt, SessionMembersListResult as vu, TalkClientTranscriptParams as vv, ErrorShape as vw, SessionCatalog as vx, UsersLinkEmailResultSchema as vy, validateArtifactsListParams as w, BoardTicketEventParamsSchema as wC, AgentsCreateParamsSchema as wD, PendingSessionApprovalEventSchema as wE, SkillsBinsResult as wO, SessionSuggestionsListResult as wS, WorkerInferenceStartResponseFrame as wT, CommandsListResult as w_, validateWorkerAdmissionHandshake as wa, AgentsWorkspaceListParamsSchema as wb, PluginsUninstallResultSchema as wc, QuestionGetResultSchema as wd, NodeInvokeRequestEventSchema as wf, SystemAgentSetupAuthStartResult as wg, CronAddParams as wh, validateTalkClientMutationResult as wi, SkillsSecurityVerdictsResult as wk, TasksRecoveryParamsSchema as wl, DevicePairRequestedEventSchema as wm, validatePluginsUiDescriptorsParams as wn, WorkerAdmissionResponseFrameSchema as wo, ChatMessageGetResultSchema as wp, validateSessionsGroupsListResult as wr, WizardNextResultSchema as ws, validateDevicePairRenameParams as wt, SessionSharingIdentity as wu, TalkEvent as wv, GatewayFrameSchema as ww, SessionCatalogHostSchema as wx, UsersSelfParamsSchema as wy, validateApprovalResolveParams as x, BoardTabSchema as xC, AgentSummary as xD, ExpiredApprovalSnapshotSchema as xE, SkillProposalLifecycleEventSchema as xO, SessionSuggestionsAddResultSchema as xS, WorkerInferenceStartParams as xT, CommandEntrySchema as x_, validateWizardNextParams as xa, AgentsWorkspaceGetResult as xb, PluginsUninstallParams as xc, QuestionGetParams as xd, NodeInvokeParamsSchema as xf, SystemAgentSetupActivateResultSchema as xg, WorkerEnvironmentStateSchema as xh, validateTalkClientCloseParams as xi, SkillsSearchResultSchema as xk, TasksListResult as xl, DevicePairRemoveParamsSchema as xm, validatePluginsSessionActionParams as xn, WorkerAdmissionHandshake as xo, ChatInjectParamsSchema as xp, validateSessionsForkParams as xr, WizardNextParams as xs, validateDevicePairListParams as xt, SessionSharingActionSchema as xu, TalkConfigParamsSchema as xv, EventFrameSchema as xw, SessionCatalogDescriptor as xx, UsersListResult as xy, validateApprovalHistoryParams as y, BoardTabDeleteOpSchema as yC, AgentKind as yD, ExecApprovalPresentationSchema as yE, SkillProposalEvaluationSchema as yO, SessionSuggestionsAddParamsSchema as yS, WorkerInferenceOptions as yT, COMMAND_NAME_MAX_LENGTH as y_, validateWebPushVapidPublicKeyParams as ya, AgentsWorkspaceGetParams as yb, PluginsUiDescriptorsResult as yc, QuestionAnswers as yd, NodeInvokeInputEventSchema as yf, SystemAgentSetupActivateParamsSchema as yg, WorkerEnvironmentMetadataSchema as yh, validateSystemInfoResult as yi, SkillsSearchParamsSchema as yk, TasksListParams as yl, DevicePairRejectParamsSchema as ym, validatePluginsRefreshParams as yn, WORKER_TRANSCRIPT_MAX_JSON_DEPTH as yo, ChatHistoryParamsSchema as yp, validateSessionsFilesRevealParams as yr, WizardCancelParams as ys, validateCronUpdateParams as yt, SessionMembersListResultSchema as yu, TalkClientTranscriptParamsSchema as yv, ErrorShapeSchema as yw, SessionCatalogCapabilities as yx, UsersListParams as yy, validateChannelsPairingDismissParams as z, BoardWidgetGrantParams as zC, AgentsFilesListResult as zD, validateTerminalAttachParams as zE, SkillsInstallParamsSchema as zO, BOARD_WIDGET_TOOL_MAX_LENGTH as zS, AllowedApprovalSnapshotSchema as zT, ChannelsPairingListResult as z_, WorktreeRepositoryStatus as za, ConversationListParamsSchema as zb, TerminalEvent as zc, QuestionRequestedEvent as zd, NodePendingDrainParams as zf, SystemChangeSourceSchema as zg, CronUpdateParams as zh, validateTalkSessionSteerParams as zi, SkillsUploadCommitParamsSchema as zk, TaskSuggestionsCreateResult as zl, ExecApprovalResolveParamsSchema as zm, validateSessionDiscussionInfoResult as zn, WorkerLiveEventErrorDetailsSchema as zo, LogsTailResultSchema as zp, validateSessionsSearchParams as zr, PluginCatalogOfficialInstallSchema as zs, validateExecApprovalsSetParams as zt, SessionsViewerPresenceSetResultSchema as zu, TalkSessionCreateResultSchema as zv, UiCommandResult as zw, SessionsCatalogContinueParamsSchema as zx, AuditListResult as zy };