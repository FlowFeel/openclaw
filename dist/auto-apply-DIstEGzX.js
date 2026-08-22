import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { t as applySkillProposal } from "./service-CmvGStrk.js";
//#region src/skills/workshop/auto-apply.ts
const log = createSubsystemLogger("skills/workshop");
const defaultDeps = { apply: applySkillProposal };
/** Applies one capture through the normal Workshop service without retrying failures. */
async function autoApplySkillProposal(params, deps = defaultDeps) {
	try {
		const applied = await deps.apply({
			workspaceDir: params.workspaceDir,
			...params.agentId ? { agentId: params.agentId } : {},
			...params.config ? { config: params.config } : {},
			...params.env ? { env: params.env } : {},
			proposalId: params.proposalId,
			reason: "Autonomous self-learning capture"
		});
		log.info(`auto-applied skill ${params.skillName} from proposal ${params.proposalId}`);
		return applied;
	} catch (error) {
		log.warn(`auto-apply left skill ${params.skillName} proposal ${params.proposalId} unapplied: ${String(error)}`);
		return;
	}
}
//#endregion
export { autoApplySkillProposal as t };
