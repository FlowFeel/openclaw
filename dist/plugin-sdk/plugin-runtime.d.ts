import { r as OpenClawConfig } from "../types.openclaw-C7iFpWwX.js";
import { t as PluginOrigin } from "../plugin-origin.types-DOQEvsWL.js";
import { i as ReplyPayload } from "../reply-payload-DdceO6tf.js";
import { At as OpenClawPluginApi, Dn as PluginCommandResult, En as PluginCommandContext, Et as PluginRegistry, Fa as PluginRuntime, Tn as OpenClawPluginCommandDefinition, _n as PluginInteractiveHandlerRegistration, j as RuntimeLogger, kt as OpenClawPluginConfigSchema, vn as PluginInteractiveRegistration, wn as AgentPromptSurfaceKind } from "../types-CVuq6K6F.js";
import { a as GatewayRequestOptions, t as GatewayRequestContext } from "../types-DCanIKq0.js";
import { t as getGlobalHookRunner } from "../hook-runner-global-CPVYHGhn.js";
import { n as PluginConversationBindingRequestParams, r as PluginConversationBindingRequestResult, t as PluginConversationBinding } from "../conversation-binding.types-Cf59DwvU.js";
import { t as getPluginCommandSpecs } from "../command-specs-IqK-_ufo.js";
import { i as requestPluginConversationBinding } from "../conversation-binding-D5p7P9kt.js";

//#region src/plugins/command-registry-state.d.ts
type RegisteredPluginCommand = OpenClawPluginCommandDefinition & {
  pluginId: string;
  pluginName?: string;
  pluginRoot?: string;
  trustedOwnerStatusExposure?: true;
};
declare function clearPluginCommands(): void;
declare function listRegisteredPluginAgentPromptGuidance(params?: {
  surface?: AgentPromptSurfaceKind;
  includeLegacyGlobalGuidance?: boolean;
}): string[];
//#endregion
//#region src/plugins/command-registration.d.ts
/** Result returned when a plugin command registration succeeds or fails validation. */
type CommandRegistrationResult = {
  ok: boolean;
  error?: string;
};
/** Returns true when a command name is owned by built-in OpenClaw command handling. */
declare function registerPluginCommand(pluginId: string, command: OpenClawPluginCommandDefinition, opts?: {
  pluginName?: string;
  pluginRoot?: string;
  allowReservedCommandNames?: boolean;
  allowOwnerStatusExposure?: boolean;
}): CommandRegistrationResult;
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
//#region src/plugins/interactive-binding-helpers.d.ts
type RegisteredInteractiveMetadata = {
  pluginId: string;
  pluginName?: string;
  pluginRoot?: string;
};
type PluginBindingConversation = Parameters<typeof requestPluginConversationBinding>[0]["conversation"];
declare function createInteractiveConversationBindingHelpers(params: {
  registration: RegisteredInteractiveMetadata;
  senderId?: string;
  conversation: PluginBindingConversation;
}): {
  requestConversationBinding: (binding?: PluginConversationBindingRequestParams) => Promise<{
    status: "bound";
    binding: PluginConversationBinding;
  } | {
    status: "pending";
    approvalId: string;
    reply: ReplyPayload;
  } | {
    status: "error";
    message: string;
  }>;
  detachConversationBinding: () => Promise<{
    removed: boolean;
  }>;
  getCurrentConversationBinding: () => Promise<PluginConversationBinding | null>;
};
//#endregion
//#region src/plugins/interactive-registry.d.ts
/** Registered interactive handler with owning plugin metadata. */
type RegisteredInteractiveHandler = PluginInteractiveHandlerRegistration & {
  pluginId: string;
  pluginName?: string;
  pluginRoot?: string;
};
/** Registration result for plugin interactive namespace handlers. */
type InteractiveRegistrationResult = {
  ok: boolean;
  error?: string;
};
/** Resolves a channel payload to a registered plugin interactive namespace handler. */
/** Registers one process-global interactive handler. */
declare function registerPluginInteractiveHandler(pluginId: string, registration: PluginInteractiveHandlerRegistration, opts?: {
  pluginName?: string;
  pluginRoot?: string;
}): InteractiveRegistrationResult;
/** Clears all active plugin interactive handlers. */
declare function clearPluginInteractiveHandlers(): void;
//#endregion
//#region src/plugins/interactive.d.ts
type InteractiveDispatchResult<TResult = unknown> = {
  matched: false;
  handled: false;
  duplicate: false;
} | {
  matched: true;
  handled: boolean;
  duplicate: boolean;
  result?: TResult;
};
type PluginInteractiveDispatchRegistration = {
  channel: string;
  namespace: string;
};
/** Resolved interactive handler match passed to plugin callback dispatch. */
type PluginInteractiveMatch<TRegistration extends PluginInteractiveDispatchRegistration> = {
  registration: RegisteredInteractiveHandler & TRegistration;
  namespace: string;
  payload: string;
};
/** Dispatches one interactive callback payload to a matching plugin handler. */
declare function dispatchPluginInteractiveHandler<TRegistration extends PluginInteractiveDispatchRegistration, TResult extends {
  handled?: boolean;
} | void = {
  handled?: boolean;
} | void>(params: {
  channel: TRegistration["channel"];
  data: string;
  dedupeId?: string;
  onMatched?: () => Promise<void> | void;
  invoke: (match: PluginInteractiveMatch<TRegistration>) => Promise<TResult> | TResult;
  afterInvoke?: (result: TResult) => Promise<void> | void;
}): Promise<InteractiveDispatchResult<TResult>>;
//#endregion
//#region src/plugins/lazy-service-module.d.ts
type LazyServiceModule = Record<string, unknown>;
type LazyPluginServiceHandle = {
  stop: () => Promise<void>;
};
declare function startLazyPluginServiceModule(params: {
  skipEnvVar?: string;
  overrideEnvVar?: string;
  validateOverrideSpecifier?: (specifier: string) => string;
  loadDefaultModule: () => Promise<LazyServiceModule>;
  loadOverrideModule?: (specifier: string) => Promise<LazyServiceModule>;
  startExportNames: string[];
  stopExportNames?: string[];
}): Promise<LazyPluginServiceHandle | null>;
//#endregion
//#region src/plugins/runtime/gateway-request-scope.d.ts
type PluginRuntimeGatewayRequestScope = {
  context?: GatewayRequestContext;
  client?: GatewayRequestOptions["client"];
  isWebchatConnect: GatewayRequestOptions["isWebchatConnect"];
  pluginId?: string;
  pluginSource?: string;
  pluginOrigin?: PluginOrigin;
  pluginTrustedOfficialInstall?: boolean;
  gatewayMethodDispatchAllowed?: boolean;
  pluginRegistry?: PluginRegistry;
};
/**
 * Returns the current plugin gateway request scope when called from a plugin request handler.
 */
declare function getPluginRuntimeGatewayRequestScope(): PluginRuntimeGatewayRequestScope | undefined;
//#endregion
export { type LazyPluginServiceHandle, type OpenClawPluginApi, type OpenClawPluginConfigSchema, type PluginConversationBinding, type PluginConversationBindingRequestParams, type PluginConversationBindingRequestResult, type PluginInteractiveRegistration, type PluginRuntime, type RuntimeLogger, clearPluginCommands, clearPluginInteractiveHandlers, createInteractiveConversationBindingHelpers, dispatchPluginInteractiveHandler, executePluginCommand, getGlobalHookRunner, getPluginCommandSpecs, getPluginRuntimeGatewayRequestScope, listRegisteredPluginAgentPromptGuidance, matchPluginCommand, registerPluginCommand, registerPluginInteractiveHandler, startLazyPluginServiceModule };