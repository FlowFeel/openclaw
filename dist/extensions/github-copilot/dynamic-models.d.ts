import { n as OpenClawConfig } from "../../types.openclaw-CXX8ljmy.js";
import { R as ProviderRuntimeModel } from "../../types-CAQ6JuHx.js";
import { C as ProviderResolveDynamicModelContext, S as ProviderPrepareDynamicModelContext, b as ProviderCatalogResult, y as ProviderCatalogContext } from "../../plugin-entry-i32wLQY9.js";

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