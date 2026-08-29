import { r as OpenClawConfig } from "../types.openclaw-C7iFpWwX.js";
import { c as SessionEntry } from "../types-CEcJgDdy.js";
import { n as CommandArgs, t as CommandArgValues } from "../commands-args.types-zglMcgeO.js";
import { Bo as resolveFastModeState, Go as formatFastModeSourceSuffix, Ko as formatFastModeStatusValue, To as resolveControlCommandGate, Uo as formatFastModeCommandOptions, Wo as formatFastModeCurrentStatus, wo as resolveCommandAuthorizedFromAuthorizers } from "../types-CVuq6K6F.js";
import { a as CommandArgsParsing, l as NativeCommandSpec, r as CommandArgDefinition, t as ChatCommandDefinition } from "../commands-registry.types-tUEnBO8G.js";
import { i as shouldComputeCommandAuthorized, t as hasControlCommand } from "../command-detection-B0hWNlnt.js";
import { _ as normalizeCommandBody, a as formatCommandArgMenuTitle, b as listChatCommands, c as listNativeCommandSpecsForConfig, d as resolveCommandArgMenu, f as serializeCommandArgs, g as maybeResolveTextAlias, i as findCommandByNativeName, l as parseCommandArgs, r as buildCommandTextFromArgs, s as listNativeCommandSpecs, u as resolveCommandArgChoices } from "../commands-registry-aEhADc52.js";
import { i as resolveCommandAuthorization, n as resolveStoredModelOverride, o as resolveNativeCommandSessionTargets, r as CommandAuthorization } from "../stored-model-override-RmYWjBmG.js";
import { t as ModelsProviderData } from "../commands-models-WXkCW8_D.js";
import { t as listSkillCommandsForAgents } from "../chat-commands-HMVLY7qT.js";
import { n as listProviderPluginCommandSpecs } from "../command-specs-IqK-_ufo.js";

//#region src/agents/thinking-runtime.d.ts
/** Resolves an explicit session override before configured model/provider policy. */
declare function resolveEffectiveAgentRuntime(params: {
  cfg: OpenClawConfig;
  provider: string;
  modelId: string;
  agentId?: string;
  sessionKey?: string;
  sessionEntry?: Pick<SessionEntry, "agentHarnessId" | "agentRuntimeOverride">;
}): string;
//#endregion
export { type ChatCommandDefinition, type CommandArgDefinition, type CommandArgValues, type CommandArgs, type CommandArgsParsing, type CommandAuthorization, type ModelsProviderData, type NativeCommandSpec, buildCommandTextFromArgs, findCommandByNativeName, formatCommandArgMenuTitle, formatFastModeCommandOptions, formatFastModeCurrentStatus, formatFastModeSourceSuffix, formatFastModeStatusValue, hasControlCommand, listChatCommands, listNativeCommandSpecs, listNativeCommandSpecsForConfig, listProviderPluginCommandSpecs, listSkillCommandsForAgents, maybeResolveTextAlias, normalizeCommandBody, parseCommandArgs, resolveCommandArgChoices, resolveCommandArgMenu, resolveCommandAuthorization, resolveCommandAuthorizedFromAuthorizers, resolveControlCommandGate, resolveEffectiveAgentRuntime, resolveFastModeState, resolveNativeCommandSessionTargets, resolveStoredModelOverride, serializeCommandArgs, shouldComputeCommandAuthorized };