//#region src/agents/session-write-lock-error.ts
/** Stable session ownership errors shared by runtime and public harness adapters. */
const TIMEOUT_CODE = "OPENCLAW_SESSION_WRITE_LOCK_TIMEOUT";
const STALE_CODE = "OPENCLAW_SESSION_WRITE_LOCK_STALE";
var SessionWriteLockTimeoutError = class extends Error {
	constructor(params) {
		super(`session file locked (timeout ${params.timeoutMs}ms): ${params.owner} ${params.lockPath}`);
		this.code = TIMEOUT_CODE;
		this.name = "SessionWriteLockTimeoutError";
		Object.assign(this, params);
	}
};
var SessionWriteLockStaleError = class extends Error {
	constructor(params) {
		const staleReasons = params.staleReasons?.length ? params.staleReasons : ["unknown"];
		super(`session file lock stale (${staleReasons.join(", ")}): ${params.owner} ${params.lockPath}`);
		this.code = STALE_CODE;
		this.name = "SessionWriteLockStaleError";
		Object.assign(this, params, { staleReasons });
	}
};
/** Returns whether another owner replaced the active SQLite session lease. */
function isSessionWriteLockLeaseLostError(error) {
	const code = error?.code;
	const staleReasons = error?.staleReasons;
	return (error instanceof SessionWriteLockStaleError || code === STALE_CODE) && Array.isArray(staleReasons) && staleReasons.includes("lease-lost");
}
function isSessionWriteLockAcquireError(error) {
	const code = error?.code;
	return error instanceof SessionWriteLockTimeoutError || error instanceof SessionWriteLockStaleError || code === TIMEOUT_CODE || code === STALE_CODE;
}
//#endregion
export { isSessionWriteLockLeaseLostError as i, SessionWriteLockTimeoutError as n, isSessionWriteLockAcquireError as r, SessionWriteLockStaleError as t };
