import { a as collectExplicitDenylist } from "./tool-policy-CrjVfI-s.js";
import { i as getPluginToolMeta } from "./tools-sUgO7zqy.js";
import { t as applyToolPolicyPipeline } from "./tool-policy-pipeline-Caz0N3cQ.js";
import { r as resolveConversationToolPolicies, t as buildConversationToolPolicyPipelineSteps } from "./conversation-tool-policy-pipeline-Bo3TW3-_.js";
import { t as buildDeclaredToolAllowlistContext } from "./tool-policy-declared-context-BFPIkCPZ.js";
//#region src/agents/embedded-agent-runner/effective-tool-policy.ts
function applyFinalEffectiveToolPolicy(params) {
	if (params.bundledTools.length === 0) return params.bundledTools;
	const capabilityProfile = params.conversationCapabilityProfile;
	const { trustedGroup } = capabilityProfile.policy;
	if (trustedGroup.dropped) params.warn("effective tool policy: dropping caller-provided groupId that does not match session-derived group context");
	const pipelineSteps = buildConversationToolPolicyPipelineSteps({
		capabilityProfile,
		policies: resolveConversationToolPolicies({ capabilityProfile }),
		includeRuntimeToolPolicy: false
	}).map((step) => Object.assign({}, step, { suppressUnavailableCoreToolWarning: true }));
	return applyToolPolicyPipeline({
		tools: params.bundledTools,
		toolMeta: (tool) => getPluginToolMeta(tool),
		warn: params.warn,
		steps: pipelineSteps,
		auditLogLevel: params.toolPolicyAuditLogLevel,
		onFilter: params.onFilter,
		declaredToolAllowlist: buildDeclaredToolAllowlistContext({
			config: params.config,
			workspaceDir: params.workspaceDir,
			metadataSnapshot: params.metadataSnapshot,
			toolDenylist: collectExplicitDenylist(pipelineSteps.map((step) => step.policy))
		})
	});
}
//#endregion
export { applyFinalEffectiveToolPolicy as t };
