import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { v as resolveIsNixMode } from "./paths-CL43LNS6.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { t as createSubsystemLogger } from "./subsystem-Ess1Ww-N.js";
import { b as setAgentEffectiveModelPrimary } from "./agent-scope-DyEposw2.js";
import { n as mutateConfigFileWithRetry } from "./mutate-dYcqgG_5.js";
import "./config-BBVHtcXg.js";
//#region src/agents/sticky-model-selection.ts
const log = createSubsystemLogger("agents/sticky-model-selection");
let warnedImmutableConfig = false;
/** Persists a validated session model selection at the agent's effective config layer. */
async function persistStickyModelSelection(params) {
	const model = normalizeOptionalString(params.model);
	if (!model) throw new Error("Sticky model selection must be non-empty.");
	const agentId = normalizeAgentId(params.agentId);
	const committed = await mutateConfigFileWithRetry({
		afterWrite: { mode: "auto" },
		mutate: (draft) => setAgentEffectiveModelPrimary(draft, agentId, model)
	});
	if (!committed.result) throw new Error("Sticky model config mutation did not return its write target.");
	log.info(`persisted sticky model selection agentId=${agentId} model=${model} target=${committed.result}`);
	return committed.result;
}
/** Starts a best-effort sticky write without delaying or failing the session mutation. */
function persistStickyModelSelectionBestEffort(params) {
	if (resolveIsNixMode()) {
		if (!warnedImmutableConfig) {
			warnedImmutableConfig = true;
			log.warn(`skipped sticky model persistence agentId=${params.agentId} model=${params.model} reason=config is immutable in OPENCLAW_NIX_MODE`);
		}
		return;
	}
	persistStickyModelSelection(params).catch((error) => {
		log.warn(`failed sticky model persistence agentId=${params.agentId} model=${params.model} reason=${formatErrorMessage(error)}`);
	});
}
//#endregion
export { persistStickyModelSelectionBestEffort as t };
