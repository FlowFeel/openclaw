import { AGENT_MODEL_CONFIG_KEYS, ConfiguredModelRef, collectConfiguredModelRefValues, collectConfiguredModelRefs, listModelRefsFromConfigValue } from "./configured-model-refs.mjs";
import { MODEL_CATALOG_APIS, MODEL_CATALOG_THINKING_FORMATS, MODEL_CATALOG_THINKING_LEVELS, ModelCatalog, ModelCatalogAlias, ModelCatalogApi, ModelCatalogCompatConfig, ModelCatalogCost, ModelCatalogDiscovery, ModelCatalogImageInputConfig, ModelCatalogInput, ModelCatalogMediaInputConfig, ModelCatalogModel, ModelCatalogOpenRouterRouting, ModelCatalogProvider, ModelCatalogSource, ModelCatalogStatus, ModelCatalogSuppression, ModelCatalogThinkingFormat, ModelCatalogThinkingLevel, ModelCatalogThinkingLevelMap, ModelCatalogTieredCost, ModelCatalogVercelGatewayRouting, NormalizedModelCatalogRow, UnifiedModelCatalogEntry, UnifiedModelCatalogKind, UnifiedModelCatalogSource, isModelCatalogThinkingFormat } from "./model-catalog-types.mjs";
import { normalizeModelCatalog, normalizeModelCatalogProviderRows } from "./model-catalog-normalize.mjs";
import { ModelCatalogRef, ProviderModelRef, buildModelCatalogMergeKey, buildModelCatalogRef, isCloudModelRef, normalizeModelCatalogProviderId, parseModelCatalogRef, parseProviderModelRef } from "./model-catalog-refs.mjs";
import { a as normalizeLowercaseStringOrEmpty, i as normalizeProviderIdForAuth, n as findNormalizedProviderValue, r as normalizeProviderId, t as findNormalizedProviderKey } from "./provider-id-B1WJ7P_q.mjs";
import { ManifestModelIdNormalizationProvider, ManifestModelIdNormalizationRecord, collectManifestModelIdNormalizationPolicies, normalizeBuiltInProviderModelId, normalizeConfiguredProviderCatalogModelId, normalizeConfiguredProviderCatalogModelRef, normalizeProviderModelIdWithPolicies, normalizeStaticProviderModelIdWithPolicies, setCurrentManifestModelIdNormalizationRecords, stripSelfProviderModelPrefix } from "./provider-model-id-normalization.mjs";
import { normalizeAntigravityPreviewModelId, normalizeGooglePreviewModelId, normalizeTogetherModelId } from "./provider-model-id-normalize.mjs";
import { z } from "zod";

//#region packages/model-catalog-core/src/remote-catalog-bundle.d.ts
declare const REMOTE_CATALOG_MAX_FUTURE_SKEW_MS: number;
declare const hostedPricingSchema: z.ZodObject<{
  input: z.ZodNumber;
  output: z.ZodNumber;
  cacheRead: z.ZodOptional<z.ZodNumber>;
  cacheWrite: z.ZodOptional<z.ZodNumber>;
  tieredPricing: z.ZodOptional<z.ZodArray<z.ZodObject<{
    input: z.ZodNumber;
    output: z.ZodNumber;
    cacheRead: z.ZodNumber;
    cacheWrite: z.ZodNumber;
    range: z.ZodUnion<readonly [z.ZodTuple<[z.ZodNumber], null>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>;
  }, z.core.$strict>>>;
}, z.core.$strict>;
type RemoteModelCatalogPricing = z.infer<typeof hostedPricingSchema>;
declare const remoteModelCatalogProviderSchema: z.ZodObject<{
  baseUrl: z.ZodOptional<z.ZodString>;
  api: z.ZodOptional<z.ZodEnum<{
    "openai-completions": "openai-completions";
    "openai-responses": "openai-responses";
    "openai-chatgpt-responses": "openai-chatgpt-responses";
    "anthropic-messages": "anthropic-messages";
    "google-generative-ai": "google-generative-ai";
    "google-vertex": "google-vertex";
    "github-copilot": "github-copilot";
    "bedrock-converse-stream": "bedrock-converse-stream";
    ollama: "ollama";
    "azure-openai-responses": "azure-openai-responses";
  }>>;
  headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
  defaultModel: z.ZodOptional<z.ZodString>;
  defaultUtilityModel: z.ZodOptional<z.ZodString>;
  models: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    api: z.ZodOptional<z.ZodEnum<{
      "openai-completions": "openai-completions";
      "openai-responses": "openai-responses";
      "openai-chatgpt-responses": "openai-chatgpt-responses";
      "anthropic-messages": "anthropic-messages";
      "google-generative-ai": "google-generative-ai";
      "google-vertex": "google-vertex";
      "github-copilot": "github-copilot";
      "bedrock-converse-stream": "bedrock-converse-stream";
      ollama: "ollama";
      "azure-openai-responses": "azure-openai-responses";
    }>>;
    baseUrl: z.ZodOptional<z.ZodString>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    input: z.ZodOptional<z.ZodArray<z.ZodEnum<{
      text: "text";
      image: "image";
      document: "document";
    }>>>;
    reasoning: z.ZodOptional<z.ZodBoolean>;
    contextWindow: z.ZodOptional<z.ZodNumber>;
    contextTokens: z.ZodOptional<z.ZodNumber>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    thinkingLevelMap: z.ZodOptional<z.ZodRecord<z.ZodEnum<{
      off: "off";
      minimal: "minimal";
      low: "low";
      medium: "medium";
      high: "high";
      xhigh: "xhigh";
      max: "max";
    }> & z.core.$partial, z.ZodNullable<z.ZodString>>>;
    cost: z.ZodOptional<z.ZodObject<{
      input: z.ZodOptional<z.ZodNumber>;
      output: z.ZodOptional<z.ZodNumber>;
      cacheRead: z.ZodOptional<z.ZodNumber>;
      cacheWrite: z.ZodOptional<z.ZodNumber>;
      tieredPricing: z.ZodOptional<z.ZodArray<z.ZodObject<{
        input: z.ZodNumber;
        output: z.ZodNumber;
        cacheRead: z.ZodNumber;
        cacheWrite: z.ZodNumber;
        range: z.ZodUnion<readonly [z.ZodTuple<[z.ZodNumber], null>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>;
      }, z.core.$strict>>>;
    }, z.core.$strict>>;
    compat: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    mediaInput: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    status: z.ZodOptional<z.ZodEnum<{
      available: "available";
      preview: "preview";
      deprecated: "deprecated";
      disabled: "disabled";
    }>>;
    statusReason: z.ZodOptional<z.ZodString>;
    replaces: z.ZodOptional<z.ZodArray<z.ZodString>>;
    replacedBy: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
  }, z.core.$strip>>;
}, z.core.$strict>;
declare const remoteModelCatalogBundleSchema: z.ZodObject<{
  schemaVersion: z.ZodLiteral<1>;
  generatedAt: z.ZodNumber;
  minVersion: z.ZodOptional<z.ZodString>;
  sourceCommit: z.ZodString;
  providers: z.ZodRecord<z.ZodString, z.ZodObject<{
    baseUrl: z.ZodOptional<z.ZodString>;
    api: z.ZodOptional<z.ZodEnum<{
      "openai-completions": "openai-completions";
      "openai-responses": "openai-responses";
      "openai-chatgpt-responses": "openai-chatgpt-responses";
      "anthropic-messages": "anthropic-messages";
      "google-generative-ai": "google-generative-ai";
      "google-vertex": "google-vertex";
      "github-copilot": "github-copilot";
      "bedrock-converse-stream": "bedrock-converse-stream";
      ollama: "ollama";
      "azure-openai-responses": "azure-openai-responses";
    }>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    defaultModel: z.ZodOptional<z.ZodString>;
    defaultUtilityModel: z.ZodOptional<z.ZodString>;
    models: z.ZodArray<z.ZodObject<{
      id: z.ZodString;
      name: z.ZodOptional<z.ZodString>;
      api: z.ZodOptional<z.ZodEnum<{
        "openai-completions": "openai-completions";
        "openai-responses": "openai-responses";
        "openai-chatgpt-responses": "openai-chatgpt-responses";
        "anthropic-messages": "anthropic-messages";
        "google-generative-ai": "google-generative-ai";
        "google-vertex": "google-vertex";
        "github-copilot": "github-copilot";
        "bedrock-converse-stream": "bedrock-converse-stream";
        ollama: "ollama";
        "azure-openai-responses": "azure-openai-responses";
      }>>;
      baseUrl: z.ZodOptional<z.ZodString>;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      input: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        text: "text";
        image: "image";
        document: "document";
      }>>>;
      reasoning: z.ZodOptional<z.ZodBoolean>;
      contextWindow: z.ZodOptional<z.ZodNumber>;
      contextTokens: z.ZodOptional<z.ZodNumber>;
      maxTokens: z.ZodOptional<z.ZodNumber>;
      thinkingLevelMap: z.ZodOptional<z.ZodRecord<z.ZodEnum<{
        off: "off";
        minimal: "minimal";
        low: "low";
        medium: "medium";
        high: "high";
        xhigh: "xhigh";
        max: "max";
      }> & z.core.$partial, z.ZodNullable<z.ZodString>>>;
      cost: z.ZodOptional<z.ZodObject<{
        input: z.ZodOptional<z.ZodNumber>;
        output: z.ZodOptional<z.ZodNumber>;
        cacheRead: z.ZodOptional<z.ZodNumber>;
        cacheWrite: z.ZodOptional<z.ZodNumber>;
        tieredPricing: z.ZodOptional<z.ZodArray<z.ZodObject<{
          input: z.ZodNumber;
          output: z.ZodNumber;
          cacheRead: z.ZodNumber;
          cacheWrite: z.ZodNumber;
          range: z.ZodUnion<readonly [z.ZodTuple<[z.ZodNumber], null>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>;
        }, z.core.$strict>>>;
      }, z.core.$strict>>;
      compat: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
      mediaInput: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
      status: z.ZodOptional<z.ZodEnum<{
        available: "available";
        preview: "preview";
        deprecated: "deprecated";
        disabled: "disabled";
      }>>;
      statusReason: z.ZodOptional<z.ZodString>;
      replaces: z.ZodOptional<z.ZodArray<z.ZodString>>;
      replacedBy: z.ZodOptional<z.ZodString>;
      tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
  }, z.core.$strict>>;
  pricing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
    input: z.ZodNumber;
    output: z.ZodNumber;
    cacheRead: z.ZodOptional<z.ZodNumber>;
    cacheWrite: z.ZodOptional<z.ZodNumber>;
    tieredPricing: z.ZodOptional<z.ZodArray<z.ZodObject<{
      input: z.ZodNumber;
      output: z.ZodNumber;
      cacheRead: z.ZodNumber;
      cacheWrite: z.ZodNumber;
      range: z.ZodUnion<readonly [z.ZodTuple<[z.ZodNumber], null>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>;
    }, z.core.$strict>>>;
  }, z.core.$strict>>>;
}, z.core.$strict>;
type RemoteModelCatalogBundle = Omit<z.infer<typeof remoteModelCatalogBundleSchema>, "providers"> & {
  providers: Record<string, ModelCatalogProvider>;
};
declare function parseRemoteModelCatalogBundle(value: unknown): RemoteModelCatalogBundle;
/** Removes every transport endpoint/header override before remote data reaches persistence. */
declare function sanitizeRemoteModelCatalogBundle(bundle: RemoteModelCatalogBundle): RemoteModelCatalogBundle;
declare function validateAndSanitizeRemoteModelCatalogBundle(value: unknown): RemoteModelCatalogBundle;
//#endregion
export { AGENT_MODEL_CONFIG_KEYS, ConfiguredModelRef, MODEL_CATALOG_APIS, MODEL_CATALOG_THINKING_FORMATS, MODEL_CATALOG_THINKING_LEVELS, ManifestModelIdNormalizationProvider, ManifestModelIdNormalizationRecord, ModelCatalog, ModelCatalogAlias, ModelCatalogApi, ModelCatalogCompatConfig, ModelCatalogCost, ModelCatalogDiscovery, ModelCatalogImageInputConfig, ModelCatalogInput, ModelCatalogMediaInputConfig, ModelCatalogModel, ModelCatalogOpenRouterRouting, ModelCatalogProvider, ModelCatalogRef, ModelCatalogSource, ModelCatalogStatus, ModelCatalogSuppression, ModelCatalogThinkingFormat, ModelCatalogThinkingLevel, ModelCatalogThinkingLevelMap, ModelCatalogTieredCost, ModelCatalogVercelGatewayRouting, NormalizedModelCatalogRow, ProviderModelRef, REMOTE_CATALOG_MAX_FUTURE_SKEW_MS, RemoteModelCatalogBundle, RemoteModelCatalogPricing, UnifiedModelCatalogEntry, UnifiedModelCatalogKind, UnifiedModelCatalogSource, buildModelCatalogMergeKey, buildModelCatalogRef, collectConfiguredModelRefValues, collectConfiguredModelRefs, collectManifestModelIdNormalizationPolicies, findNormalizedProviderKey, findNormalizedProviderValue, isCloudModelRef, isModelCatalogThinkingFormat, listModelRefsFromConfigValue, normalizeAntigravityPreviewModelId, normalizeBuiltInProviderModelId, normalizeConfiguredProviderCatalogModelId, normalizeConfiguredProviderCatalogModelRef, normalizeGooglePreviewModelId, normalizeLowercaseStringOrEmpty, normalizeModelCatalog, normalizeModelCatalogProviderId, normalizeModelCatalogProviderRows, normalizeProviderId, normalizeProviderIdForAuth, normalizeProviderModelIdWithPolicies, normalizeStaticProviderModelIdWithPolicies, normalizeTogetherModelId, parseModelCatalogRef, parseProviderModelRef, parseRemoteModelCatalogBundle, remoteModelCatalogBundleSchema, remoteModelCatalogProviderSchema, sanitizeRemoteModelCatalogBundle, setCurrentManifestModelIdNormalizationRecords, stripSelfProviderModelPrefix, validateAndSanitizeRemoteModelCatalogBundle };