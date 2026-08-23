import { n as OpenClawConfig } from "../types.openclaw-B-6RRL7F.js";
import { r as AuthProfileStore } from "../types-BqfkEFeu.js";
import { v as VideoGenerationProviderPlugin } from "../types-dPYYJRo2.js";
import { t as FallbackAttempt } from "../model-fallback.types-97WZcYrx.js";
import { n as createSubsystemLogger } from "../subsystem-RmDRaRJV.js";
import { a as VideoGenerationModeCapabilities, c as VideoGenerationProvider, d as VideoGenerationRequest, f as VideoGenerationResolution, h as VideoGenerationTransformCapabilities, i as VideoGenerationMode, l as VideoGenerationProviderCapabilities, m as VideoGenerationSourceAsset, n as VideoGenerationCatalogModelEntry, o as VideoGenerationModelCapabilitiesContext, p as VideoGenerationResult, r as VideoGenerationIgnoredOverride, t as GeneratedVideoAsset, u as VideoGenerationProviderConfiguredContext } from "../types-BxdX8JcN.js";
import { n as getProviderEnvVars } from "../provider-env-vars-DMJl7-H2.js";
import { n as isFailoverError, t as describeFailoverError } from "../failover-error-C39zfedP.js";
import { i as throwCapabilityGenerationFailure, n as resolveCapabilityModelCandidates, t as buildNoCapabilityModelConfiguredMessage } from "../runtime-shared-Be_jeqUj.js";
import { n as resolveAgentModelPrimaryValue, t as resolveAgentModelFallbackValues } from "../model-input-0hu-ONGj.js";
import { n as listVideoGenerationProviders, t as getVideoGenerationProvider } from "../provider-registry-CfEJxEjk.js";

//#region src/video-generation/model-ref.d.ts
declare function parseVideoGenerationModelRef(raw: string | undefined): {
  provider: string;
  model: string;
} | null;
//#endregion
export { type AuthProfileStore, type FallbackAttempt, type GeneratedVideoAsset, type OpenClawConfig, type VideoGenerationCatalogModelEntry, type VideoGenerationIgnoredOverride, type VideoGenerationMode, type VideoGenerationModeCapabilities, type VideoGenerationModelCapabilitiesContext, type VideoGenerationProvider, type VideoGenerationProviderCapabilities, type VideoGenerationProviderConfiguredContext, type VideoGenerationProviderPlugin, type VideoGenerationRequest, type VideoGenerationResolution, type VideoGenerationResult, type VideoGenerationSourceAsset, type VideoGenerationTransformCapabilities, buildNoCapabilityModelConfiguredMessage, createSubsystemLogger, describeFailoverError, getProviderEnvVars, getVideoGenerationProvider, isFailoverError, listVideoGenerationProviders, parseVideoGenerationModelRef, resolveAgentModelFallbackValues, resolveAgentModelPrimaryValue, resolveCapabilityModelCandidates, throwCapabilityGenerationFailure };