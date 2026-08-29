import { c as buildSummaryChunks, l as computeAdaptiveChunkRatio, o as buildOversizedFallbackPlan, s as buildStageSplitPlan } from "../compaction-planning-w6kN4r-m.js";
import { parentPort, workerData } from "node:worker_threads";
//#region src/agents/compaction-planning.worker.ts
/**
* Worker-thread entrypoint for serializable compaction planning requests.
*/
function isWorkerInput(value) {
	if (!value || typeof value !== "object" || !("kind" in value)) return false;
	const input = value;
	if (!Array.isArray(input.messages)) return false;
	switch (input.kind) {
		case "summaryChunks":
		case "stageSplit": return typeof input.maxChunkTokens === "number" && Number.isFinite(input.maxChunkTokens);
		case "oversizedFallback":
		case "adaptiveChunkRatio": return typeof input.contextWindow === "number" && Number.isFinite(input.contextWindow);
		default: return false;
	}
}
function createMessageIndexer(source) {
	const indexByMessage = new Map(source.map((message, index) => [message, index]));
	const keyMap = /* @__PURE__ */ new Map();
	for (const [index, message] of source.entries()) {
		const rawContent = "content" in message ? message.content : void 0;
		const key = `${message.role}:${message.timestamp}:${JSON.stringify(rawContent)}`;
		if (!keyMap.has(key)) keyMap.set(key, index);
	}
	return (selected) => selected.map((message) => {
		let index = indexByMessage.get(message);
		if (index === void 0) {
			const rawContent = "content" in message ? message.content : void 0;
			const key = `${message.role}:${message.timestamp}:${JSON.stringify(rawContent)}`;
			index = keyMap.get(key);
		}
		if (index === void 0) throw new Error("Compaction planning result contains an unknown message");
		return index;
	});
}
function planCompactionWorkerInput(input) {
	switch (input.kind) {
		case "summaryChunks": return {
			kind: input.kind,
			chunkIndexes: buildSummaryChunks(input).map(createMessageIndexer(input.messages))
		};
		case "oversizedFallback": {
			const plan = buildOversizedFallbackPlan(input);
			return {
				kind: input.kind,
				smallMessageIndexes: createMessageIndexer(input.messages)(plan.smallMessages),
				oversizedNotes: plan.oversizedNotes
			};
		}
		case "stageSplit": {
			const plan = buildStageSplitPlan(input);
			return plan.mode === "split" ? {
				kind: input.kind,
				mode: "split",
				chunkIndexes: plan.chunks.map(createMessageIndexer(input.messages))
			} : {
				kind: input.kind,
				mode: "single"
			};
		}
		case "adaptiveChunkRatio": return {
			kind: input.kind,
			ratio: computeAdaptiveChunkRatio(input.messages, input.contextWindow)
		};
	}
	throw new Error("unsupported compaction planning worker input");
}
/** Run one compaction planning request and return a serializable result. */
function runCompactionPlanningWorkerInput(input) {
	if (!isWorkerInput(input)) return {
		status: "failed",
		error: "invalid compaction planning worker input"
	};
	try {
		return {
			status: "ok",
			value: planCompactionWorkerInput(input)
		};
	} catch (error) {
		return {
			status: "failed",
			error: error instanceof Error ? error.message : String(error)
		};
	}
}
function isPersistentMode(data) {
	return typeof data === "object" && data !== null && data.mode === "persistent";
}
if (parentPort) if (isPersistentMode(workerData)) parentPort.on("message", (request) => {
	const result = runCompactionPlanningWorkerInput(request.input);
	const response = {
		seq: request.seq,
		...result
	};
	parentPort.postMessage(response);
});
else parentPort.postMessage.bind(parentPort)(runCompactionPlanningWorkerInput(workerData));
//#endregion
export { createMessageIndexer, runCompactionPlanningWorkerInput };
