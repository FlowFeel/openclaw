import { t as RuntimeEnv } from "../../runtime-COwxLt5E.js";
//#region extensions/github-copilot/login.d.ts
type GitHubCopilotDeviceFlowResult = {
  status: "authorized";
  accessToken: string;
} | {
  status: "access_denied";
} | {
  status: "expired";
};
type GitHubCopilotDeviceFlowIO = {
  showCode(args: {
    verificationUrl: string;
    userCode: string;
    expiresInMs: number;
  }): Promise<void>;
  openUrl?: (url: string) => Promise<void>;
  signal?: AbortSignal;
};
declare function runGitHubCopilotDeviceFlow(io: GitHubCopilotDeviceFlowIO, domain?: string): Promise<GitHubCopilotDeviceFlowResult>;
declare function githubCopilotLoginCommand(opts: {
  profileId?: string;
  yes?: boolean;
  agentDir?: string;
}, runtime: RuntimeEnv): Promise<void>;
//#endregion
export { githubCopilotLoginCommand, runGitHubCopilotDeviceFlow };