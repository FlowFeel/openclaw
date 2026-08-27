import { r as OpenClawConfig } from "../types.openclaw-BwKjboya.js";
import { c as SessionEntry } from "../types-B2L6CuzI.js";
import { n as ThinkLevel } from "../thinking.shared-Dn7xz8fk.js";
import { t as ModelCatalogEntry } from "../model-catalog.types-Xxg-MSqT.js";
import { a as resolveAgentMaxConcurrent, i as isModelSelectionLocked, n as ModelSelectionLockedError, o as resolveChannelModelOverride, r as applyModelOverrideToSessionEntry, t as MODEL_SELECTION_LOCKED_MESSAGE } from "../model-overrides-BvLi0R0W.js";

//#region src/agents/session-runtime-compat.d.ts
/** Persisted runtime fields used to recover session runtime compatibility. */
type SessionRuntimeCompatEntry = Pick<SessionEntry, "agentHarnessId" | "agentRuntimeOverride" | "modelSelectionLocked">;
/** Resolves the persisted runtime id, preserving locked transcript ownership. */
declare function resolvePersistedSessionRuntimeId(entry?: SessionRuntimeCompatEntry): string | undefined;
//#endregion
//#region src/model-picker/apply-session-model-selection.d.ts
type SessionModelSelectionRequest = {
  provider: string;
  model: string;
  isDefault: boolean;
  alias?: string;
  profileOverride?: string;
  runtime: {
    kind: "unchanged";
  } | {
    kind: "clear";
  } | {
    kind: "set";
    runtime: string;
  };
};
type ApplySessionModelSelectionParams = {
  cfg: OpenClawConfig;
  agentId: string;
  sessionKey: string;
  storePath?: string;
  sessionEntry: SessionEntry;
  sessionStore: Record<string, SessionEntry>;
  defaultProvider: string;
  defaultModel: string;
  currentProvider: string;
  currentModel: string;
  allowedModelKeys: ReadonlySet<string>;
  modelCatalog: readonly ModelCatalogEntry[];
  thinkingCatalog?: readonly ModelCatalogEntry[];
  canPersistStickyModelSelection?: boolean;
  request: SessionModelSelectionRequest; /** Raw directive text used only by the existing session patch hook. */
  patchModel?: string;
  markLiveSwitchPending: true;
};
type ApplySessionModelSelectionResult = {
  status: "applied";
  provider: string;
  model: string;
  effectiveModelRef: string;
  changed: boolean;
  contextTokens: number;
  runtimeChange?: {
    kind: "clear";
  } | {
    kind: "set";
    runtime: string;
  };
  thinkingRemap?: {
    from: ThinkLevel;
    to: ThinkLevel;
    provider: string;
    model: string;
  };
} | {
  status: "rejected";
  reason: "locked" | "not-allowed" | "invalid-runtime";
  message: string;
} | {
  status: "conflict";
  message: string;
};
/** Applies one validated picker selection to the authoritative live session. */
declare function applySessionModelSelection(params: ApplySessionModelSelectionParams): Promise<ApplySessionModelSelectionResult>;
//#endregion
export { type ApplySessionModelSelectionParams, type ApplySessionModelSelectionResult, MODEL_SELECTION_LOCKED_MESSAGE, ModelSelectionLockedError, type SessionModelSelectionRequest, applyModelOverrideToSessionEntry, applySessionModelSelection, isModelSelectionLocked, resolveAgentMaxConcurrent, resolveChannelModelOverride, resolvePersistedSessionRuntimeId };