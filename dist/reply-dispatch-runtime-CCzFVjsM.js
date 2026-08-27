import { n as createLazyPromise } from "./lazy-promise-DGqyc4Y4.js";
import "./inbound-context-BIpjK7pv.js";
import "./chunk-BJdR4AYS.js";
import "./conversation-label-generator-Bd7004d7.js";
//#region src/plugin-sdk/reply-dispatch-runtime.ts
const loadProviderDispatcherRuntimeModule = createLazyPromise(() => import("./provider-dispatcher.runtime.js"), { cacheRejections: true });
/** Dispatches a reply with buffered block support after lazy-loading the runtime dispatcher. */
const dispatchReplyWithBufferedBlockDispatcher = async (params) => {
	const { dispatchReplyWithBufferedBlockDispatcher: dispatch } = await loadProviderDispatcherRuntimeModule();
	return await dispatch(params);
};
/** Dispatches a reply through the provider dispatcher after lazy-loading runtime code. */
const dispatchReplyWithDispatcher = async (params) => {
	const { dispatchReplyWithDispatcher: dispatch } = await loadProviderDispatcherRuntimeModule();
	return await dispatch(params);
};
//#endregion
export { dispatchReplyWithDispatcher as n, dispatchReplyWithBufferedBlockDispatcher as t };
