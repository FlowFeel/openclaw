/** The worker key for the main thread (workerIndex 0). */
const MAIN_WORKER_KEY = "main";
/**
* Resolve the effective worker-pool config from raw options.
*
* Pure — clamps workerCount to [1, MAX_WORKER_COUNT], defaults to 1.
*
* @example
*   resolveWorkerPoolConfig({})                                  // → { workerCount: 1, isolationMode: "disabled" }
*   resolveWorkerPoolConfig({ workerCount: 4, isolationMode: "enabled" }) // → { workerCount: 4, isolationMode: "enabled" }
*/
function resolveWorkerPoolConfig(options = {}) {
	const raw = options.workerCount;
	let workerCount;
	if (typeof raw === "number" && Number.isFinite(raw)) workerCount = Math.max(1, Math.min(64, Math.floor(raw)));
	else workerCount = 1;
	const isolationMode = options.isolationMode ?? (workerCount > 1 ? "enabled" : "disabled");
	return {
		workerCount,
		isolationMode
	};
}
/**
* Compute a deterministic FNV-1a 32-bit hash of a topic key.
*
* Pure — same input always yields the same hash. Used for stable worker
* assignment (session affinity): a topic maps to the same worker across
* requests, so its warm state is reused.
*
* @example
*   hashTopicKey("topic-A") // → a fixed number
*   hashTopicKey("topic-A") === hashTopicKey("topic-A") // → true
*/
function hashTopicKey(topicKey) {
	let hash = 2166136261;
	for (let i = 0; i < topicKey.length; i++) {
		hash ^= topicKey.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}
/**
* Resolve the worker assignment for a topic key given the worker count.
*
* Pure — `workerIndex = hashTopicKey(topicKey) % workerCount`. When
* workerCount is 1, every topic maps to the main thread (workerIndex 0).
*
* @example
*   resolveWorkerAssignment({ topicKey: "s1", workerCount: 1 })  // → { workerIndex: 0, workerKey: "main" }
*   resolveWorkerAssignment({ topicKey: "s1", workerCount: 4 })  // → { workerIndex: 2, workerKey: "worker-2" } (deterministic)
*/
function resolveWorkerAssignment(params) {
	const workerCount = Math.max(1, Math.floor(params.workerCount) || 1);
	const workerIndex = workerCount <= 1 ? 0 : hashTopicKey(params.topicKey) % workerCount;
	return {
		workerIndex,
		workerKey: workerIndex === 0 ? MAIN_WORKER_KEY : `worker-${workerIndex}`
	};
}
/**
* Decide whether a topic should be isolated to a worker thread.
*
* Policy:
*   - isolationMode "disabled" OR workerCount <= 1 → main thread (not isolated)
*   - isolationMode "enabled" AND workerCount > 1 → isolate to assigned worker
*
* @example
*   resolveTopicIsolation({ topicKey: "s1", workerCount: 1 })                      // → { isolate: false, ... }
*   resolveTopicIsolation({ topicKey: "s1", workerCount: 4, isolationMode: "enabled" }) // → { isolate: true, ... }
*/
function resolveTopicIsolation(params) {
	const config = resolveWorkerPoolConfig({
		workerCount: params.workerCount,
		isolationMode: params.isolationMode
	});
	const assignment = resolveWorkerAssignment({
		topicKey: params.topicKey,
		workerCount: config.workerCount
	});
	const isolate = config.isolationMode === "enabled" && config.workerCount > 1;
	return {
		topicKey: params.topicKey,
		isolate,
		assignment,
		reason: isolate ? `isolationMode enabled with workerCount ${config.workerCount}; topic routed to ${assignment.workerKey}` : config.workerCount <= 1 ? `workerCount ${config.workerCount} <= 1; topic runs on main thread` : `isolationMode disabled; topic runs on main thread (assigned ${assignment.workerKey})`
	};
}
//#endregion
export { resolveTopicIsolation as n, hashTopicKey as t };
