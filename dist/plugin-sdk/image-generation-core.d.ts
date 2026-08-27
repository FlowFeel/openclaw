import { f as normalizeGooglePreviewModelId } from "../provider-model-shared-B4Uw4Woi.js";
import { n as OpenClawConfig } from "../types.openclaw-B4JlK2kd.js";
import { r as AuthProfileStore } from "../types-BqfkEFeu.js";
import { hn as resolveApiKeyForProvider$1, m as ImageGenerationProviderPlugin } from "../types-fxGJj6Ov.js";
import { t as FallbackAttempt } from "../model-fallback.types-97WZcYrx.js";
import { n as createSubsystemLogger } from "../subsystem-RmDRaRJV.js";
import { _ as ImageGenerationSourceImage, d as ImageGenerationProviderConfiguredContext, f as ImageGenerationProviderOptions, g as ImageGenerationResult, h as ImageGenerationResolution, l as ImageGenerationProvider, m as ImageGenerationRequest, t as GeneratedImageAsset } from "../types-Dgl6wS7O.js";
import { n as getProviderEnvVars } from "../provider-env-vars-FZEzpQ8b.js";
import { n as isFailoverError, t as describeFailoverError } from "../failover-error-C39zfedP.js";
import { i as throwCapabilityGenerationFailure, n as resolveCapabilityModelCandidates, t as buildNoCapabilityModelConfiguredMessage } from "../runtime-shared-B2sffNvU.js";
import { n as resolveAgentModelPrimaryValue, t as resolveAgentModelFallbackValues } from "../model-input-0hu-ONGj.js";
import { n as listImageGenerationProviders, t as getImageGenerationProvider } from "../provider-registry-TK3dA2l_.js";

//#region src/plugin-sdk/image-generation-core.auth.runtime.d.ts
declare namespace image_generation_core_auth_runtime_d_exports {
  export { resolveApiKeyForProvider$1 as resolveApiKeyForProvider };
}
//#endregion
//#region src/image-generation/model-ref.d.ts
declare function parseImageGenerationModelRef(raw: string | undefined): {
  provider: string;
  model: string;
} | null;
//#endregion
//#region src/plugin-sdk/image-generation-core.d.ts
/** Default OpenAI image model used when image-generation provider config omits one. */
declare const OPENAI_DEFAULT_IMAGE_MODEL = "gpt-image-2";
type ImageGenerationCoreAuthRuntimeModule = typeof image_generation_core_auth_runtime_d_exports;
/** Resolve image-generation provider API keys through the lazy auth runtime helper. */
declare function resolveApiKeyForProvider(...args: Parameters<ImageGenerationCoreAuthRuntimeModule["resolveApiKeyForProvider"]>): Promise<Awaited<ReturnType<ImageGenerationCoreAuthRuntimeModule["resolveApiKeyForProvider"]>>>;
//#endregion
export { type AuthProfileStore, type FallbackAttempt, type GeneratedImageAsset, type ImageGenerationProvider, type ImageGenerationProviderConfiguredContext, type ImageGenerationProviderOptions, type ImageGenerationProviderPlugin, type ImageGenerationRequest, type ImageGenerationResolution, type ImageGenerationResult, type ImageGenerationSourceImage, OPENAI_DEFAULT_IMAGE_MODEL, type OpenClawConfig, buildNoCapabilityModelConfiguredMessage, createSubsystemLogger, describeFailoverError, getImageGenerationProvider, getProviderEnvVars, isFailoverError, listImageGenerationProviders, normalizeGooglePreviewModelId as normalizeGoogleModelId, parseImageGenerationModelRef, resolveAgentModelFallbackValues, resolveAgentModelPrimaryValue, resolveApiKeyForProvider, resolveCapabilityModelCandidates, throwCapabilityGenerationFailure };