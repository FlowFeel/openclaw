import { n as OpenClawConfig } from "../../types.openclaw-BsftVpqJ.js";
import { R as ProviderRuntimeModel } from "../../types-CFJXaPHi.js";
import { C as ProviderResolveDynamicModelContext, S as ProviderPrepareDynamicModelContext, b as ProviderCatalogResult, y as ProviderCatalogContext } from "../../plugin-entry-rqx6-3xm.js";

//#region extensions/github-copilot/dynamic-models.d.ts
declare function createGithubCopilotDynamicModelHooks(params: {
  discoveryEnabled(config?: OpenClawConfig): boolean;
}): {
  prepareDynamicModel: (ctx: ProviderPrepareDynamicModelContext) => Promise<void>;
  resolveDynamicModel: (ctx: ProviderResolveDynamicModelContext) => ProviderRuntimeModel | undefined;
  runCatalog: (ctx: ProviderCatalogContext) => Promise<ProviderCatalogResult>;
  preferRuntimeResolvedModel: ({
    config
  }: {
    config?: OpenClawConfig;
  }) => boolean;
};
//#endregion
export { createGithubCopilotDynamicModelHooks };