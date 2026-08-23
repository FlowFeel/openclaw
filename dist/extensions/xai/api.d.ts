import { n as normalizeXaiModelId } from "../../model-id-DYqQmxkI.js";
import { n as XAI_TOOL_SCHEMA_PROFILE, r as applyXaiModelCompat, t as HTML_ENTITY_TOOL_CALL_ARGUMENTS_ENCODING } from "../../model-compat-DNTkCs1G.js";
import { i as buildXaiProvider } from "../../provider-catalog-g1oX9uy9.js";
import { a as applyXaiProviderConfig, r as applyXaiConfig, t as XAI_DEFAULT_MODEL_REF } from "../../onboard-B9YTfCBr.js";
import { t as buildXaiImageGenerationProvider } from "../../image-generation-provider-Q9ouRtxP.js";
import { a as XAI_DEFAULT_MODEL_ID, c as buildXaiModelDefinition, i as XAI_DEFAULT_MAX_TOKENS, n as XAI_DEFAULT_CONTEXT_WINDOW, o as XAI_IMAGE_MODELS, r as XAI_DEFAULT_IMAGE_MODEL, s as buildXaiCatalogModels, t as XAI_BASE_URL, u as resolveXaiCatalogEntry } from "../../model-definitions-DWN0zuxb.js";
import { r as resolveXaiForwardCompatModel, t as isModernXaiModel } from "../../provider-models-6YGmGvFB.js";
import { t as applyXaiRuntimeModelCompat } from "../../runtime-model-compat-C_17pCLE.js";

//#region extensions/xai/api.d.ts
declare function isXaiModelHint(modelId: string): boolean;
declare function resolveXaiTransport(params: {
  provider: string;
  api?: unknown;
  baseUrl?: unknown;
}): {
  api: "openai-responses";
  baseUrl?: string;
} | undefined;
//#endregion
export { HTML_ENTITY_TOOL_CALL_ARGUMENTS_ENCODING, XAI_BASE_URL, XAI_DEFAULT_CONTEXT_WINDOW, XAI_DEFAULT_IMAGE_MODEL, XAI_DEFAULT_MAX_TOKENS, XAI_DEFAULT_MODEL_ID, XAI_DEFAULT_MODEL_REF, XAI_IMAGE_MODELS, XAI_TOOL_SCHEMA_PROFILE, applyXaiConfig, applyXaiModelCompat, applyXaiProviderConfig, applyXaiRuntimeModelCompat, buildXaiCatalogModels, buildXaiImageGenerationProvider, buildXaiModelDefinition, buildXaiProvider, isModernXaiModel, isXaiModelHint, normalizeXaiModelId, resolveXaiCatalogEntry, resolveXaiForwardCompatModel, resolveXaiTransport };