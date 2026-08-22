import { i as OpenClawConfig } from "./types.openclaw-3lPuYQv-.js";
import { N as ReplyPayload, d as GetReplyOptions, o as RuntimeMsgContext } from "./templating-CXWZ_qCV.js";
//#region src/auto-reply/reply/get-reply.d.ts
declare function getReplyFromConfig(ctx: RuntimeMsgContext, opts?: GetReplyOptions, configOverride?: OpenClawConfig): Promise<ReplyPayload | ReplyPayload[] | undefined>;
//#endregion
export { getReplyFromConfig as t };