import { n as OpenClawConfig } from "../../types.openclaw-DZDgdSgX.js";
import { S as ProviderPrepareDynamicModelContext } from "../../plugin-entry-V3twzgF5.js";

//#region extensions/github-copilot/auth.d.ts
declare function resolveFirstGithubToken(params: {
  agentDir?: string;
  config?: OpenClawConfig;
  env: NodeJS.ProcessEnv;
  profileId?: string;
  authProfileMode?: ProviderPrepareDynamicModelContext["authProfileMode"];
}): Promise<{
  githubToken: string;
  hasProfile: boolean;
}>;
//#endregion
export { resolveFirstGithubToken };