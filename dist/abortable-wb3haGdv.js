import { r as toErrorObject } from "./error-coercion-CrJRoLe1.js";
import "./errors-D-7D3ZtF.js";
//#region src/agents/embedded-agent-runner/run/abortable.ts
/**
* AbortSignal-aware promise racing helper for embedded-agent attempts.
*/
function getAbortReason(signal) {
	return "reason" in signal ? signal.reason : void 0;
}
/** Marks AbortErrors produced by abortable() so provider aborts stay retryable. */
const OPENCLAW_ABORTABLE_WRAPPER = Symbol.for("openclaw.abortable.wrapper");
function isOpenClawAbortableWrapper(err) {
	return err !== null && typeof err === "object" && OPENCLAW_ABORTABLE_WRAPPER in err;
}
function tagAsAbortableWrapper(err) {
	err[OPENCLAW_ABORTABLE_WRAPPER] = true;
	return err;
}
function makeAbortError(signal) {
	const reason = getAbortReason(signal);
	if (reason instanceof Error) {
		const err = new Error(reason.message, { cause: reason });
		err.name = "AbortError";
		return tagAsAbortableWrapper(err);
	}
	const err = reason ? new Error("aborted", { cause: reason }) : /* @__PURE__ */ new Error("aborted");
	err.name = "AbortError";
	return tagAsAbortableWrapper(err);
}
/**
* Races a promise against an AbortSignal while preserving normal promise
* settlement. Abort wins immediately and rejected non-Error payloads are
* normalized so callers can safely log/inspect them as Error objects.
*/
function abortable(signal, promise) {
	if (signal.aborted) return Promise.reject(makeAbortError(signal));
	return new Promise((resolve, reject) => {
		const onAbort = () => {
			signal.removeEventListener("abort", onAbort);
			reject(makeAbortError(signal));
		};
		signal.addEventListener("abort", onAbort, { once: true });
		promise.then((value) => {
			signal.removeEventListener("abort", onAbort);
			resolve(value);
		}, (err) => {
			signal.removeEventListener("abort", onAbort);
			reject(toErrorObject(err, "Non-Error rejection"));
		});
	});
}
//#endregion
export { isOpenClawAbortableWrapper as n, abortable as t };
