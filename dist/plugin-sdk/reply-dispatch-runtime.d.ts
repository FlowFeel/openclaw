import { y as CommandTurnContext } from "../templating-BhJuWyZk.js";
import { Ao as DispatchReplyWithDispatcher, Do as finalizeInboundContextForSdk, ko as DispatchReplyWithBufferedBlockDispatcher } from "../types-CWvW31qx.js";
import { m as resolveChunkMode } from "../outbound.types-BsP6frUw.js";
import { r as ReplyPayload } from "../reply-payload-DSgZ_G6Q.js";
import { n as generateConversationLabel } from "../conversation-label-generator-CCEp3Tol.js";

//#region src/plugin-sdk/reply-dispatch-runtime.d.ts
/** Dispatches a reply with buffered block support after lazy-loading the runtime dispatcher. */
declare const dispatchReplyWithBufferedBlockDispatcher: DispatchReplyWithBufferedBlockDispatcher;
/** Dispatches a reply through the provider dispatcher after lazy-loading runtime code. */
declare const dispatchReplyWithDispatcher: DispatchReplyWithDispatcher;
//#endregion
export { type CommandTurnContext, type DispatchReplyWithBufferedBlockDispatcher, type DispatchReplyWithDispatcher, type ReplyPayload, dispatchReplyWithBufferedBlockDispatcher, dispatchReplyWithDispatcher, finalizeInboundContextForSdk as finalizeInboundContext, generateConversationLabel, resolveChunkMode };