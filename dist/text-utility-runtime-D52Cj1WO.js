import { u as withTimeout } from "./fs-safe-DVaClkIX.js";
import "./utils-Bs67j6-3.js";
import "./fetch-timeout-COlTo1hD.js";
import "./with-timeout-C4AhiECB.js";
//#region src/plugin-sdk/text-utility-runtime.ts
/** Run a channel probe with shared timeout, elapsed-time, and error-result handling. */
async function runChannelProbe(timeoutMs, run, onError) {
	const startedAt = Date.now();
	const elapsedMs = () => Date.now() - startedAt;
	const finish = (result) => ({
		...result,
		elapsedMs: result.elapsedMs ?? elapsedMs()
	});
	try {
		return finish(await withTimeout(run({
			startedAt,
			elapsedMs
		}), timeoutMs ?? 0));
	} catch (error) {
		if (!onError) throw error;
		return finish(onError(error));
	}
}
//#endregion
export { runChannelProbe as t };
