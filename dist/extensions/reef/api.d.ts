import { n as OpenClawConfig } from "../../types.openclaw-BsftVpqJ.js";
import { T as MessageReceipt, s as ChannelOutboundAdapter, w as ChannelMessageSendTextContext } from "../../types.public-CFhLhhWm.js";
import { a as ReefInboxConnection, i as ReefFriendManager, n as createConfiguredGuard, o as ReefTransportClient, s as WebSocketLike, t as ReefMessageFlow } from "../../flow-vAtWPXoQ.js";
import { a as ReefIngressMessage, c as RelayFriend, i as ReefDependencies, n as ReefAccount, o as ReefKeys, t as InboxEntry } from "../../types-DuDlwF_j.js";
import { t as reefPlugin } from "../../channel-DMHDGt9E.js";

//#region extensions/reef/src/outbound.d.ts
declare const reefOutboundAdapter: ChannelOutboundAdapter;
declare const reefMessageAdapter: {
  readonly id: "reef";
  readonly durableFinal: {
    readonly capabilities: {
      readonly text: true;
      readonly replyTo: true;
      readonly thread: true;
    };
  };
  readonly send: {
    readonly text: (ctx: ChannelMessageSendTextContext<OpenClawConfig>) => Promise<{
      receipt: MessageReceipt;
      messageId: string;
    }>;
  };
  readonly receive: {
    readonly defaultAckPolicy: "after_receive_record";
    readonly supportedAckPolicies: readonly ["after_receive_record"];
  };
} & {
  receive: {
    readonly defaultAckPolicy: "after_receive_record";
    readonly supportedAckPolicies: readonly ["after_receive_record"];
  };
};
//#endregion
export { type InboxEntry, type ReefAccount, type ReefDependencies, ReefFriendManager, ReefInboxConnection, type ReefIngressMessage, type ReefKeys, ReefMessageFlow, ReefTransportClient, type RelayFriend, type WebSocketLike, createConfiguredGuard, reefMessageAdapter, reefOutboundAdapter, reefPlugin };