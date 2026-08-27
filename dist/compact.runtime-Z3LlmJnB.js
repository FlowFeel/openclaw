import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
//#region src/agents/embedded-agent-runner/compact.runtime.ts
/**
* Lazy-loads the embedded-agent compaction runtime.
*/
const compactRuntimeLoader = createLazyImportLoader(() => import("./compact-C_vkO4NB.js"));
function loadCompactRuntime() {
	return compactRuntimeLoader.load();
}
/** Loads the compaction runtime on demand and forwards the direct compaction call. */
async function compactEmbeddedAgentSessionDirect(params) {
	const { compactEmbeddedAgentSessionDirect: compactEmbeddedAgentSessionDirectLocal } = await loadCompactRuntime();
	return compactEmbeddedAgentSessionDirectLocal(params);
}
//#endregion
export { compactEmbeddedAgentSessionDirect };
