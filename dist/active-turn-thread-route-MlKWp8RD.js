//#region extensions/discord/src/active-turn-thread-route.ts
const activeRoutes = /* @__PURE__ */ new Map();
function normalizeId(value) {
	return value?.trim() || void 0;
}
function beginDiscordActiveTurnThreadRoute(sessionKey, route) {
	const key = normalizeId(sessionKey);
	if (!key) return () => {};
	const routes = activeRoutes.get(key) ?? /* @__PURE__ */ new Set();
	routes.add(route);
	activeRoutes.set(key, routes);
	return () => {
		routes.delete(route);
		if (routes.size === 0 && activeRoutes.get(key) === routes) activeRoutes.delete(key);
	};
}
async function notifyDiscordActiveTurnThreadCreated(params) {
	const key = normalizeId(params.sessionKey ?? void 0);
	const threadId = normalizeId(params.threadId);
	const sourceChannelId = normalizeId(params.sourceChannelId);
	const sourceMessageId = normalizeId(params.sourceMessageId);
	const route = key ? Array.from(activeRoutes.get(key) ?? []).find((candidate) => sourceChannelId === candidate.sourceChannelId && sourceMessageId === candidate.sourceMessageId && (!candidate.accountId || !params.accountId || candidate.accountId === params.accountId)) : void 0;
	if (!route || !threadId) return false;
	route.adoptedThreadId = threadId;
	try {
		await route.onThreadAdopted(threadId);
	} catch (error) {
		route.onThreadAdoptionError?.(error);
	}
	return true;
}
function notifyDiscordActiveTurnThreadReplyDelivered(params) {
	const route = findDiscordActiveTurnThreadReplyRoute(params);
	const threadId = normalizeId(params.threadId ?? void 0);
	if (!route || !threadId) return false;
	route.onThreadReplyDelivered?.(threadId);
	return true;
}
function findDiscordActiveTurnThreadReplyRoute(params) {
	const key = normalizeId(params.sessionKey ?? void 0);
	const threadId = normalizeId(params.threadId);
	if (!key || !threadId) return;
	return Array.from(activeRoutes.get(key) ?? []).find((route) => Boolean(route.adoptedThreadId) && route.adoptedThreadId === threadId && (!route.accountId || !params.accountId || route.accountId === params.accountId));
}
//#endregion
export { notifyDiscordActiveTurnThreadCreated as n, notifyDiscordActiveTurnThreadReplyDelivered as r, beginDiscordActiveTurnThreadRoute as t };
