import { ft as AgentMessage } from "../../types.public-DrgteDAF.js";
import { w as ProviderSanitizeReplayHistoryContext } from "../../plugin-entry-i32wLQY9.js";

//#region extensions/github-copilot/replay-policy.d.ts
declare function stripCopilotAssistantThinkingMessages<T>(messages: T[]): T[];
declare function buildGithubCopilotReplayPolicy(modelId?: string): {
  dropThinkingBlocks: boolean;
} | {
  dropThinkingBlocks?: undefined;
};
declare function sanitizeGithubCopilotReplayHistory(ctx: ProviderSanitizeReplayHistoryContext): AgentMessage[];
//#endregion
export { buildGithubCopilotReplayPolicy, sanitizeGithubCopilotReplayHistory, stripCopilotAssistantThinkingMessages };