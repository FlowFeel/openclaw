import { r as ModelDefinitionConfig } from "../../types.models-BEJn4TTJ.js";
//#region extensions/huggingface/models.d.ts
declare const HUGGINGFACE_BASE_URL = "https://router.huggingface.co/v1";
declare const HUGGINGFACE_POLICY_SUFFIXES: readonly ["cheapest", "fastest"];
declare const HUGGINGFACE_MODEL_CATALOG: ModelDefinitionConfig[];
declare function isHuggingfacePolicyLocked(modelRef: string): boolean;
declare function buildHuggingfaceModelDefinition(model: (typeof HUGGINGFACE_MODEL_CATALOG)[number]): ModelDefinitionConfig;
declare function discoverHuggingfaceModels(apiKey: string, timeoutMs?: number): Promise<ModelDefinitionConfig[]>;
//#endregion
export { HUGGINGFACE_BASE_URL, HUGGINGFACE_MODEL_CATALOG, HUGGINGFACE_POLICY_SUFFIXES, buildHuggingfaceModelDefinition, discoverHuggingfaceModels, isHuggingfacePolicyLocked };