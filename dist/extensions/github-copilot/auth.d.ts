import { n as OpenClawConfig } from "../../types.openclaw-CXX8ljmy.js";
import { S as ProviderPrepareDynamicModelContext } from "../../plugin-entry-i32wLQY9.js";

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