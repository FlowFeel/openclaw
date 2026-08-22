import { r as OpenClawConfig } from "../types.openclaw-DqdTE9e3.js";
import { c as SessionEntry } from "../types-CJ2AFyfH.js";
import { n as CommandArgs, t as CommandArgValues } from "../commands-args.types-zglMcgeO.js";
import { Bo as resolveFastModeState, Go as formatFastModeSourceSuffix, Ko as formatFastModeStatusValue, To as resolveControlCommandGate, Uo as formatFastModeCommandOptions, Wo as formatFastModeCurrentStatus, wo as resolveCommandAuthorizedFromAuthorizers } from "../types-CWvW31qx.js";
import { a as CommandArgsParsing, l as NativeCommandSpec, r as CommandArgDefinition, t as ChatCommandDefinition } from "../commands-registry.types-DW35EQHq.js";
import { i as shouldComputeCommandAuthorized, t as hasControlCommand } from "../command-detection-B8Gyr1WM.js";
import { _ as normalizeCommandBody, a as formatCommandArgMenuTitle, b as listChatCommands, c as listNativeCommandSpecsForConfig, d as resolveCommandArgMenu, f as serializeCommandArgs, g as maybeResolveTextAlias, i as findCommandByNativeName, l as parseCommandArgs, r as buildCommandTextFromArgs, s as listNativeCommandSpecs, u as resolveCommandArgChoices } from "../commands-registry-im-llDmt.js";
import { i as resolveCommandAuthorization, n as resolveStoredModelOverride, o as resolveNativeCommandSessionTargets, r as CommandAuthorization } from "../stored-model-override-DY0sKju0.js";
import { t as ModelsProviderData } from "../commands-models-BxJDX8_j.js";
import { t as listSkillCommandsForAgents } from "../chat-commands-DJ_dPVox.js";
import { n as listProviderPluginCommandSpecs } from "../command-specs-V2Zqw-6U.js";

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