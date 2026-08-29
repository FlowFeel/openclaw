import { y as CommandTurnContext } from "../templating-B4o_FX7q.js";
import { Ao as DispatchReplyWithDispatcher, Do as finalizeInboundContextForSdk, ko as DispatchReplyWithBufferedBlockDispatcher } from "../types-CVuq6K6F.js";
import { m as resolveChunkMode } from "../outbound.types-CQfbvogr.js";
import { r as ReplyPayload } from "../reply-payload-D0viCEMI.js";
import { n as generateConversationLabel } from "../conversation-label-generator-Ky9PQyD6.js";

//#region src/plugin-sdk/reply-dispatch-runtime.d.ts
/** Dispatches a reply with buffered block support after lazy-loading the runtime dispatcher. */
declare const dispatchReplyWithBufferedBlockDispatcher: DispatchReplyWithBufferedBlockDispatcher;
/** Dispatches a reply through the provider dispatcher after lazy-loading runtime code. */
declare const dispatchReplyWithDispatcher: DispatchReplyWithDispatcher;
//#endregion
export { type CommandTurnContext, type DispatchReplyWithBufferedBlockDispatcher, type DispatchReplyWithDispatcher, type ReplyPayload, dispatchReplyWithBufferedBlockDispatcher, dispatchReplyWithDispatcher, finalizeInboundContextForSdk as finalizeInboundContext, generateConversationLabel, resolveChunkMode };