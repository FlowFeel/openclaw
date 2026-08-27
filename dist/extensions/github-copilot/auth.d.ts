import { n as OpenClawConfig } from "../../types.openclaw-DZDgdSgX.js";
import { S as ProviderPrepareDynamicModelContext } from "../../plugin-entry-CS8C3z51.js";

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