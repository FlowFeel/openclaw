import { $ as SecretInput, n as OpenClawConfig, o as ModelDefinitionConfig, u as ModelProviderDeclarationConfig } from "../../types.openclaw-hJEKisz6.js";
import { V as WizardPrompter } from "../../setup-wizard-types-B72aypBk.js";
import { f as RuntimeEnv } from "../../manifest-registry-C0GShb_1.js";
import { p as SecretInputMode } from "../../types-D4-wxMAX.js";
import { t as LookupFn } from "../../ssrf-CR70xC7h.js";
import { a as createConfiguredOllamaCompatStreamWrapper, c as isOllamaCompatProvider, d as resolveOllamaCompatNumCtxEnabled, f as shouldInjectOllamaCompatNumCtx, p as wrapOllamaCompatNumCtx, r as buildOllamaChatRequest } from "../../stream-CL_qaqPE.js";

//#region extensions/ollama/src/defaults.d.ts
declare const OLLAMA_DEFAULT_BASE_URL = "http://127.0.0.1:11434";
declare const OLLAMA_DEFAULT_CONTEXT_WINDOW = 128000;
declare const OLLAMA_DEFAULT_MAX_TOKENS = 8192;
declare const OLLAMA_DEFAULT_COST: {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
};
declare const OLLAMA_DEFAULT_MODEL = "gemma4";
//#endregion
//#region extensions/ollama/src/provider-models.d.ts
type OllamaTagModel = {
  name: string;
  modified_at?: string;
  size?: number;
  digest?: string;
  remote_host?: string;
  details?: {
    family?: string;
    parameter_size?: string;
    quantization_level?: string;
  };
};
type OllamaTagsResponse = {
  models?: OllamaTagModel[];
};
type OllamaModelWithContext = OllamaTagModel & {
  contextWindow?: number;
  capabilities?: string[];
  showInspectionFailed?: boolean;
};
declare function resolveOllamaApiBase(configuredBaseUrl?: string): string;
type OllamaModelShowInfo = {
  contextWindow?: number;
  capabilities?: string[]; /** Distinguishes a failed request from a successful response that omitted capabilities. */
  showInspectionFailed?: boolean;
};
type OllamaModelRequestOptions = {
  apiKey?: string;
  timeoutMs?: number;
  signal?: AbortSignal;
};
declare function queryOllamaModelShowInfo(apiBase: string, modelName: string, opts?: OllamaModelRequestOptions): Promise<OllamaModelShowInfo>;
/** @deprecated Use queryOllamaModelShowInfo instead. */
declare function queryOllamaContextWindow(apiBase: string, modelName: string): Promise<number | undefined>;
declare function enrichOllamaModelsWithContext(apiBase: string, models: OllamaTagModel[], opts?: OllamaModelRequestOptions & {
  concurrency?: number;
}): Promise<OllamaModelWithContext[]>;
declare function isReasoningModelHeuristic(modelId: string): boolean;
declare function buildOllamaModelDefinition(modelId: string, contextWindow?: number, capabilities?: string[], opts?: {
  showInspectionFailed?: boolean;
}): ModelDefinitionConfig;
/** Optional test hooks so discovery can exercise the real guarded-fetch owner. */
type OllamaModelsFetchDeps = {
  fetchImpl?: typeof fetch;
  lookupFn?: LookupFn;
};
declare function fetchOllamaModels(baseUrl: string, opts?: OllamaModelRequestOptions, deps?: OllamaModelsFetchDeps): Promise<{
  reachable: boolean;
  models: OllamaTagModel[];
}>;
declare function buildOllamaProvider(configuredBaseUrl?: string, opts?: {
  apiKey?: string;
  quiet?: boolean;
}): Promise<ModelProviderDeclarationConfig>;
//#endregion
//#region extensions/ollama/src/setup.d.ts
type OllamaSetupOptions = {
  customBaseUrl?: string;
  customModelId?: string;
};
type OllamaSetupResult = {
  config: OpenClawConfig;
  credential: SecretInput;
  credentialMode?: SecretInputMode;
  defaultModel?: string;
};
declare function resolveOllamaSetupDefaultBaseUrl(env?: NodeJS.ProcessEnv): string;
declare function promptAndConfigureOllama(params: {
  cfg: OpenClawConfig;
  env?: NodeJS.ProcessEnv;
  opts?: Record<string, unknown>;
  prompter: WizardPrompter;
  secretInputMode?: SecretInputMode;
  allowSecretRefPrompt?: boolean;
  signal?: AbortSignal;
}): Promise<OllamaSetupResult>;
declare function configureOllamaNonInteractive(params: {
  nextConfig: OpenClawConfig;
  opts: OllamaSetupOptions;
  runtime: RuntimeEnv;
  agentDir?: string;
}): Promise<OpenClawConfig>;
declare function ensureOllamaModelPulled(params: {
  config: OpenClawConfig;
  model: string;
  prompter: WizardPrompter;
}): Promise<void>;
//#endregion
export { OLLAMA_DEFAULT_BASE_URL, OLLAMA_DEFAULT_CONTEXT_WINDOW, OLLAMA_DEFAULT_COST, OLLAMA_DEFAULT_MAX_TOKENS, OLLAMA_DEFAULT_MODEL, type OllamaModelShowInfo, type OllamaModelWithContext, type OllamaTagModel, type OllamaTagsResponse, buildOllamaChatRequest, buildOllamaModelDefinition, buildOllamaProvider, configureOllamaNonInteractive, createConfiguredOllamaCompatStreamWrapper, enrichOllamaModelsWithContext, ensureOllamaModelPulled, fetchOllamaModels, isOllamaCompatProvider, isReasoningModelHeuristic, promptAndConfigureOllama, queryOllamaContextWindow, queryOllamaModelShowInfo, resolveOllamaApiBase, resolveOllamaCompatNumCtxEnabled, resolveOllamaSetupDefaultBaseUrl, shouldInjectOllamaCompatNumCtx, wrapOllamaCompatNumCtx };