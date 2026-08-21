//#region src/auto-reply/reply/reply-dispatcher.types.ts
function readDispatcherFailedCounts(dispatcher) {
	return dispatcher.getFailedCounts?.() ?? {
		tool: 0,
		block: 0,
		final: 0
	};
}
//#endregion
export { readDispatcherFailedCounts as t };
