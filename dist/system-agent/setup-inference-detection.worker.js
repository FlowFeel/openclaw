import { t as listRecommendedToolInstalls } from "../recommended-tool-installs-5z2KJP_x.js";
import { c as listManualSetupInferenceOptions, s as detectSetupInference } from "../setup-inference-AF1siA3p.js";
import { parentPort } from "node:worker_threads";
//#region src/system-agent/setup-inference-detection.worker.ts
if (!parentPort) throw new Error("setup inference detection worker requires a parent port");
const port = parentPort;
try {
	const manual = await listManualSetupInferenceOptions();
	const partial = {
		candidates: [],
		unavailableCandidates: [],
		recommendedInstalls: listRecommendedToolInstalls(),
		...manual
	};
	port.postMessage({
		type: "partial",
		detection: partial
	});
	const detection = await detectSetupInference();
	port.postMessage({
		type: "result",
		detection
	});
} catch (error) {
	port.postMessage({
		ok: false,
		error: error instanceof Error ? error.message : String(error)
	});
} finally {
	port.close();
}
//#endregion
export {};
