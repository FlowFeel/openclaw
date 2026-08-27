import { y as CommandTurnContext } from "../templating-RcIMvz09.js";
import { Ao as DispatchReplyWithDispatcher, Do as finalizeInboundContextForSdk, ko as DispatchReplyWithBufferedBlockDispatcher } from "../types-CaDBLrp9.js";
import { m as resolveChunkMode } from "../outbound.types-BuHE57eo.js";
import { r as ReplyPayload } from "../reply-payload-rDQHvdOz.js";
import { n as generateConversationLabel } from "../conversation-label-generator-BG4BdaTF.js";

//#region src/plugin-sdk/reply-dispatch-runtime.d.ts
/** Dispatches a reply with buffered block support after lazy-loading the runtime dispatcher. */
declare const dispatchReplyWithBufferedBlockDispatcher: DispatchReplyWithBufferedBlockDispatcher;
/** Dispatches a reply through the provider dispatcher after lazy-loading runtime code. */
declare const dispatchReplyWithDispatcher: DispatchReplyWithDispatcher;
//#endregion
export { type CommandTurnContext, type DispatchReplyWithBufferedBlockDispatcher, type DispatchReplyWithDispatcher, type ReplyPayload, dispatchReplyWithBufferedBlockDispatcher, dispatchReplyWithDispatcher, finalizeInboundContextForSdk as finalizeInboundContext, generateConversationLabel, resolveChunkMode };