import { $ as ChannelCapabilities, C as ChannelPairingAdapter, H as ChannelMessageAdapterShape, Q as ChannelAgentToolFactory, S as ChannelStatusAdapter, T as ChannelOutboundAdapter, X as ChannelAgentPromptAdapter, Z as ChannelAgentTool, _ as ChannelHeartbeatAdapter, a as ChannelAuthAdapter, at as ChannelMeta, b as ChannelSecretsAdapter, c as ChannelConfiguredBindingProvider, d as ChannelDoctorAdapter, g as ChannelGroupAdapter, h as ChannelGatewayAdapter, i as ChannelApprovalCapability, it as ChannelMessagingAdapter, l as ChannelConversationBindingSupport, m as ChannelElevatedAdapter, n as ChannelSetupWizardAdapter, nt as ChannelMentionAdapter, o as ChannelCommandAdapter, ot as ChannelStreamingAdapter, r as ChannelAllowlistAdapter, rt as ChannelMessageActionAdapter, s as ChannelConfigAdapter, st as ChannelThreadingAdapter, t as ChannelSetupWizard, u as ChannelDirectoryAdapter, ut as ChannelMessageActionName$1, v as ChannelLifecycleAdapter, x as ChannelSecurityAdapter, y as ChannelResolverAdapter } from "./setup-wizard-types-B72aypBk.js";
import { t as ChannelId } from "./channel-id.types-DExEjsX7.js";
import { l as ChannelOwnedSetupContract, u as ChannelSetupAdapter } from "./manifest-registry-C0GShb_1.js";
import { n as ChannelConfigSchema } from "./types.config-WMvbJ5bh.js";

//#region src/gateway/operator-scopes.d.ts
declare const ADMIN_SCOPE: "operator.admin";
declare const READ_SCOPE: "operator.read";
declare const WRITE_SCOPE: "operator.write";
declare const APPROVALS_SCOPE: "operator.approvals";
declare const QUESTIONS_SCOPE: "operator.questions";
declare const PAIRING_SCOPE: "operator.pairing";
declare const TALK_SCOPE: "operator.talk";
declare const TALK_SECRETS_SCOPE: "operator.talk.secrets";
/** Operator privileges advertised by gateway auth and checked by method policy. */
type OperatorScope = typeof ADMIN_SCOPE | typeof READ_SCOPE | typeof WRITE_SCOPE | typeof APPROVALS_SCOPE | typeof QUESTIONS_SCOPE | typeof PAIRING_SCOPE | typeof TALK_SCOPE | typeof TALK_SECRETS_SCOPE;
//#endregion
//#region src/channels/plugins/types.plugin.d.ts
/** Full capability contract for a native channel plugin. */
type ChannelPluginSetupWizard = ChannelSetupWizard | ChannelSetupWizardAdapter;
type ChannelGatewayMethodDescriptor = {
  name: string;
  scope?: OperatorScope;
  description?: string;
};
type ChannelPlugin<ResolvedAccount = any, Probe = unknown, Audit = unknown> = {
  id: ChannelId;
  meta: ChannelMeta;
  capabilities: ChannelCapabilities;
  defaults?: {
    queue?: {
      debounceMs?: number;
    };
  };
  reload?: {
    configPrefixes: string[];
    noopPrefixes?: string[];
    /**
     * Opt into restarting only the changed non-default named account.
     * Set only when sibling account resolution and lifecycle state are isolated and
     * account stop fully settles owned work. Shared, default, removed, or unresolved
     * account changes still restart the whole channel.
     */
    accountScopedRestart?: boolean;
  };
  setupWizard?: ChannelPluginSetupWizard;
  config: ChannelConfigAdapter<ResolvedAccount>;
  configSchema?: ChannelConfigSchema; /** Channel-owned typed setup contract. Preferred over the legacy shared input adapter. */
  setupContract?: ChannelOwnedSetupContract; /** @deprecated Use setupContract for new plugins. */
  setup?: ChannelSetupAdapter;
  pairing?: ChannelPairingAdapter;
  security?: ChannelSecurityAdapter<ResolvedAccount>;
  groups?: ChannelGroupAdapter;
  mentions?: ChannelMentionAdapter;
  outbound?: ChannelOutboundAdapter;
  status?: ChannelStatusAdapter<ResolvedAccount, Probe, Audit>;
  gatewayMethods?: string[];
  gatewayMethodDescriptors?: ChannelGatewayMethodDescriptor[];
  gateway?: ChannelGatewayAdapter<ResolvedAccount>;
  auth?: ChannelAuthAdapter;
  approvalCapability?: ChannelApprovalCapability;
  elevated?: ChannelElevatedAdapter;
  commands?: ChannelCommandAdapter;
  lifecycle?: ChannelLifecycleAdapter;
  secrets?: ChannelSecretsAdapter;
  allowlist?: ChannelAllowlistAdapter;
  doctor?: ChannelDoctorAdapter;
  bindings?: ChannelConfiguredBindingProvider;
  conversationBindings?: ChannelConversationBindingSupport;
  streaming?: ChannelStreamingAdapter;
  threading?: ChannelThreadingAdapter;
  message?: ChannelMessageAdapterShape;
  messaging?: ChannelMessagingAdapter;
  agentPrompt?: ChannelAgentPromptAdapter;
  directory?: ChannelDirectoryAdapter;
  resolver?: ChannelResolverAdapter;
  actions?: ChannelMessageActionAdapter;
  heartbeat?: ChannelHeartbeatAdapter;
  agentTools?: ChannelAgentToolFactory | ChannelAgentTool[];
};
//#endregion
//#region src/channels/plugins/types.public.d.ts
/** Stable message action name union derived from the registered action list. */
type ChannelMessageActionName = ChannelMessageActionName$1;
//#endregion
export { ChannelPlugin as n, OperatorScope as r, ChannelMessageActionName as t };