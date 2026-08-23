import { A as ProviderRuntimeModel } from "../../types-B3KbIvCl.js";
import { f as ProviderResolveDynamicModelContext } from "../../plugin-entry-CuznV56Y.js";

//#region extensions/google/provider-models.d.ts
declare function isGoogleTextGenerationModelId(id: string): boolean;
declare function resolveGoogleStaticModelId(id: string, staticIds: ReadonlySet<string>): string | undefined;
declare function resolveGoogleGeminiForwardCompatModel(params: {
  providerId: string;
  templateProviderId?: string;
  ctx: ProviderResolveDynamicModelContext;
}): ProviderRuntimeModel | undefined;
declare function isModernGoogleModel(modelId: string): boolean;
//#endregion
export { isGoogleTextGenerationModelId, isModernGoogleModel, resolveGoogleGeminiForwardCompatModel, resolveGoogleStaticModelId };