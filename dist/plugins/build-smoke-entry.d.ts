import { i as OpenClawConfig } from "../types.openclaw-3lPuYQv-.js";
import { i as PluginCommandResult, n as OpenClawPluginCommandDefinition, r as PluginCommandContext } from "../types-BZnfG5oC2.js";
import { n as loadPluginRegistryHandle, r as loadOpenClawPlugins } from "../loader-CjljQ6q6.js";

//#region src/plugins/command-registry-state.d.ts
type RegisteredPluginCommand = OpenClawPluginCommandDefinition & {
  pluginId: string;
  pluginName?: string;
  pluginRoot?: string;
  trustedOwnerStatusExposure?: true;
};
declare function clearPluginCommands(): void;
//#endregion
//#region src/plugins/commands.d.ts
/**
 * Check if a command body matches a registered plugin command.
 * Returns the command definition and parsed args if matched.
 *
 * Note: If a command has `acceptsArgs: false` and the user provides arguments,
 * the command will not match. This allows the message to fall through to
 * built-in handlers or the agent. Document this behavior to plugin authors.
 */
declare function matchPluginCommand(commandBody: string, options?: {
  channel?: string;
}): {
  command: RegisteredPluginCommand;
  args?: string;
} | null;
/**
 * Execute a plugin command handler.
 *
 * Note: Plugin authors should still validate and sanitize ctx.args for their
 * specific use case. This function provides basic defense-in-depth sanitization.
 */
declare function executePluginCommand(params: {
  command: RegisteredPluginCommand;
  args?: string;
  senderId?: string;
  channel: string;
  channelId?: PluginCommandContext["channelId"];
  isAuthorizedSender: boolean;
  senderIsOwner?: boolean;
  gatewayClientScopes?: PluginCommandContext["gatewayClientScopes"]; /** Host-resolved agent authority for plugin-owned or non-agent-shaped session keys. */
  agentId?: string;
  sessionKey?: PluginCommandContext["sessionKey"];
  sessionId?: PluginCommandContext["sessionId"];
  sessionTarget?: PluginCommandContext["sessionTarget"];
  sessionFile?: PluginCommandContext["sessionFile"];
  authProfileId?: string;
  commandBody: string;
  config: OpenClawConfig;
  from?: PluginCommandContext["from"];
  to?: PluginCommandContext["to"];
  originatingTo?: string;
  accountId?: PluginCommandContext["accountId"];
  messageThreadId?: PluginCommandContext["messageThreadId"];
  threadParentId?: PluginCommandContext["threadParentId"];
  diagnosticsSessions?: PluginCommandContext["diagnosticsSessions"];
  diagnosticsUploadApproved?: PluginCommandContext["diagnosticsUploadApproved"];
  diagnosticsPreviewOnly?: PluginCommandContext["diagnosticsPreviewOnly"];
  diagnosticsPrivateRouted?: PluginCommandContext["diagnosticsPrivateRouted"];
}): Promise<PluginCommandResult>;
//#endregion
//#region src/plugins/command-specs.d.ts
type PluginCommandSpecOptions = {
  env?: NodeJS.ProcessEnv;
  stateDir?: string;
  workspaceDir?: string;
  config?: OpenClawConfig;
};
declare function getPluginCommandSpecs(provider?: string, options?: PluginCommandSpecOptions): Array<{
  name: string;
  description: string;
  descriptionLocalizations?: Record<string, string>;
  acceptsArgs: boolean;
}>;
//#endregion
export { clearPluginCommands, executePluginCommand, getPluginCommandSpecs, loadOpenClawPlugins, loadPluginRegistryHandle, matchPluginCommand };