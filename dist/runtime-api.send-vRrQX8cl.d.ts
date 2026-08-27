import { ct as MarkdownTableMode, n as OpenClawConfig } from "./types.openclaw-DlZm98yj.js";
import { N as ChunkMode, St as OutboundMediaAccess } from "./setup-wizard-types-C6GPHZpk.js";
import { g as RequestClient } from "./discord-B3FRtvAS.js";
import { v as DiscordSendResult } from "./send.types-BzqJHpNz.js";
import { d as DiscordComponentBuildResult, h as DiscordComponentMessageSpec } from "./components-CPk8G0UP.js";
import { i as DiscordReplyReference, t as DiscordAllowedMentions } from "./send.shared-trGDW0nb.js";

//#region extensions/discord/src/send.components.d.ts
type DiscordComponentSendOpts = {
  cfg: OpenClawConfig;
  accountId?: string;
  token?: string;
  rest?: RequestClient;
  silent?: boolean;
  reply?: DiscordReplyReference;
  sessionKey?: string;
  agentId?: string;
  mediaUrl?: string;
  mediaAccess?: OutboundMediaAccess;
  mediaLocalRoots?: readonly string[];
  mediaReadFile?: (filePath: string) => Promise<Buffer>;
  filename?: string;
  textLimit?: number;
  maxLinesPerMessage?: number;
  tableMode?: MarkdownTableMode;
  chunkMode?: ChunkMode;
  suppressEmbeds?: boolean;
  allowedMentions?: DiscordAllowedMentions; /** Persist the concrete platform send before component bookkeeping can fail. */
  onDeliveryResult?: (result: DiscordSendResult) => Promise<void> | void;
};
declare function registerBuiltDiscordComponentMessage(params: {
  buildResult: DiscordComponentBuildResult;
  messageId: string;
  ttlMs?: number;
}): void;
declare function sendDiscordComponentMessage(to: string, spec: DiscordComponentMessageSpec, opts: DiscordComponentSendOpts): Promise<DiscordSendResult>;
declare function editDiscordComponentMessage(to: string, messageId: string, spec: DiscordComponentMessageSpec, opts: DiscordComponentSendOpts): Promise<DiscordSendResult>;
//#endregion
export { registerBuiltDiscordComponentMessage as n, sendDiscordComponentMessage as r, editDiscordComponentMessage as t };