import { ft as AgentMessage } from "../../types.public-Cbcwotuf.js";
import { w as ProviderSanitizeReplayHistoryContext } from "../../plugin-entry-CS8C3z51.js";

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