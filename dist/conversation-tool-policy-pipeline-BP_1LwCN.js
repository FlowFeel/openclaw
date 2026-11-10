import { r as isKnownCoreToolId } from "./tool-catalog-aNM_LYak.js";
import { c as mergeAlsoAllowPolicy, h as normalizeToolName, n as analyzeAllowlistByToolType, o as expandPolicyWithPluginGroups, r as buildPluginToolGroups } from "./tool-policy-CrjVfI-s.js";
import { n as auditToolPolicyFilter } from "./tool-policy-audit-BIf-i3os.js";
import { t as filterToolsByPolicy } from "./agent-tools.policy-CJPBubq7.js";
//#region src/agents/tool-policy-pipeline.ts
/**
* Applies layered tool policy in runtime resolution order. Policy diagnostics
* stay tied to the layer that introduced them, while plugin groups are
* expanded only after unknown core/plugin entries are classified.
*/
const MAX_TOOL_POLICY_WARNING_CACHE = 256;
const seenToolPolicyWarnings = /* @__PURE__ */ new Set();
const toolPolicyWarningOrder = [];
function rememberToolPolicyWarning(warning) {
	if (seenToolPolicyWarnings.has(warning)) return false;
	if (seenToolPolicyWarnings.size >= MAX_TOOL_POLICY_WARNING_CACHE) {
		const oldest = toolPolicyWarningOrder.shift();
		if (oldest) seenToolPolicyWarnings.delete(oldest);
	}
	seenToolPolicyWarnings.add(warning);
	toolPolicyWarningOrder.push(warning);
	return true;
}
/** Builds the default profile, provider, agent, group, and sender policy layers. */
function buildDefaultToolPolicyPipelineSteps(params) {
	const agentId = params.agentId?.trim();
	const profile = params.profile?.trim();
	const providerProfile = params.providerProfile?.trim();
	const unavailableCoreToolReason = params.unavailableCoreToolReason?.trim();
	return [
		{
			policy: params.profilePolicy,
			label: profile ? `tools.profile (${profile})` : "tools.profile",
			stripPluginOnlyAllowlist: true,
			suppressUnavailableCoreToolWarningAllowlist: params.profileUnavailableCoreWarningAllowlist,
			unavailableCoreToolReason
		},
		{
			policy: params.providerProfilePolicy,
			label: providerProfile ? `tools.byProvider.profile (${providerProfile})` : "tools.byProvider.profile",
			stripPluginOnlyAllowlist: true,
			suppressUnavailableCoreToolWarningAllowlist: params.providerProfileUnavailableCoreWarningAllowlist,
			unavailableCoreToolReason
		},
		{
			policy: params.globalPolicy,
			label: "tools.allow",
			stripPluginOnlyAllowlist: true,
			unavailableCoreToolReason
		},
		{
			policy: params.globalProviderPolicy,
			label: "tools.byProvider.allow",
			stripPluginOnlyAllowlist: true,
			unavailableCoreToolReason
		},
		{
			policy: params.agentPolicy,
			label: agentId ? `agents.${agentId}.tools.allow` : "agent tools.allow",
			stripPluginOnlyAllowlist: true,
			unavailableCoreToolReason
		},
		{
			policy: params.agentProviderPolicy,
			label: agentId ? `agents.${agentId}.tools.byProvider.allow` : "agent tools.byProvider.allow",
			stripPluginOnlyAllowlist: true,
			unavailableCoreToolReason
		},
		{
			policy: params.groupPolicy,
			label: "group tools.allow",
			stripPluginOnlyAllowlist: true,
			unavailableCoreToolReason
		},
		{
			policy: params.senderPolicy,
			label: "tools.toolsBySender",
			stripPluginOnlyAllowlist: true,
			unavailableCoreToolReason
		}
	];
}
/** Applies configured policy layers to a tool list and emits deduped warnings/audit events. */
function applyToolPolicyPipeline(params) {
	const coreToolNames = new Set(params.tools.filter((tool) => !params.toolMeta(tool)).map((tool) => normalizeToolName(tool.name)).filter(Boolean));
	const pluginGroups = buildPluginToolGroups({
		tools: params.tools,
		toolMeta: params.toolMeta
	});
	let filtered = params.tools;
	for (const step of params.steps) {
		if (!step.policy) continue;
		let policy = step.policy;
		if (step.stripPluginOnlyAllowlist) {
			const resolved = analyzeAllowlistByToolType(policy, pluginGroups, coreToolNames, params.declaredToolAllowlist);
			if (resolved.unknownAllowlist.length > 0) {
				const unavailableCoreWarningAllowlist = new Set((step.suppressUnavailableCoreToolWarningAllowlist ?? []).map((entry) => normalizeToolName(entry)));
				const gatedCoreEntries = resolved.unknownAllowlist.filter((entry) => isKnownCoreToolId(entry));
				const warnableGatedCoreEntries = step.suppressUnavailableCoreToolWarning ? [] : gatedCoreEntries.filter((entry) => !unavailableCoreWarningAllowlist.has(entry));
				const otherEntries = resolved.unknownAllowlist.filter((entry) => !isKnownCoreToolId(entry) && !unavailableCoreWarningAllowlist.has(entry));
				const warningEntries = [...warnableGatedCoreEntries, ...otherEntries];
				if (shouldWarnAboutUnknownAllowlist({
					hasGatedCoreEntries: warnableGatedCoreEntries.length > 0,
					hasOtherEntries: otherEntries.length > 0
				})) {
					const entries = warningEntries.join(", ");
					const suffix = describeUnknownAllowlistSuffix({
						pluginOnlyAllowlist: resolved.pluginOnlyAllowlist,
						hasGatedCoreEntries: warnableGatedCoreEntries.length > 0,
						hasOtherEntries: otherEntries.length > 0,
						unavailableCoreToolReason: step.unavailableCoreToolReason
					});
					const warning = `tools: ${step.label} allowlist contains unknown entries (${entries}). ${suffix}`;
					if (rememberToolPolicyWarning(warning)) params.warn(warning);
				}
			}
			policy = resolved.policy;
		}
		const expanded = expandPolicyWithPluginGroups(policy, pluginGroups);
		if (!expanded) continue;
		const before = filtered;
		filtered = filterToolsByPolicy(before, expanded);
		params.onFilter?.({
			step,
			policy: expanded,
			before,
			after: filtered
		});
		auditToolPolicyFilter({
			stepLabel: step.label,
			policy: expanded,
			before,
			after: filtered,
			logLevel: params.auditLogLevel
		});
	}
	return filtered;
}
function shouldWarnAboutUnknownAllowlist(params) {
	return params.hasGatedCoreEntries || params.hasOtherEntries;
}
function describeUnknownAllowlistSuffix(params) {
	const preface = params.pluginOnlyAllowlist ? "Allowlist contains only plugin entries; core tools will not be available." : "";
	const unavailableCoreToolReason = params.unavailableCoreToolReason?.trim();
	const unavailableCoreDetail = unavailableCoreToolReason ? `These entries are shipped core tools but unavailable here: ${unavailableCoreToolReason}.` : "These entries are shipped core tools but unavailable in the current runtime/provider/model/config.";
	const mixedUnavailableCoreDetail = unavailableCoreToolReason ? `Some entries are shipped core tools but unavailable here: ${unavailableCoreToolReason}; other entries won't match any tool unless the plugin is enabled.` : "Some entries are shipped core tools but unavailable in the current runtime/provider/model/config; other entries won't match any tool unless the plugin is enabled.";
	const detail = params.hasGatedCoreEntries && params.hasOtherEntries ? mixedUnavailableCoreDetail : params.hasGatedCoreEntries ? unavailableCoreDetail : "These entries won't match any tool unless the plugin is enabled.";
	return preface ? `${preface} ${detail}` : detail;
}
/** Clears process-local warning dedupe state between tests. */
function resetToolPolicyWarningCacheForTest() {
	seenToolPolicyWarnings.clear();
	toolPolicyWarningOrder.length = 0;
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.toolPolicyWarningCacheTestApi")] = { resetToolPolicyWarningCacheForTest };
//#endregion
//#region src/agents/conversation-tool-policy-pipeline.ts
function mergePolicyAllowlist(policy, alsoAllow) {
	return mergeAlsoAllowPolicy(policy, alsoAllow ? [...alsoAllow] : void 0);
}
/**
* Resolves the shared policy layers once so local and remote fixed tool surfaces cannot
* diverge on profile `alsoAllow`, sender, sandbox, delegation, or runtime-cap semantics.
*/
function resolveConversationToolPolicies(params) {
	const policy = params.capabilityProfile.policy;
	const profileAllow = [...policy.profileAlsoAllow ?? [], ...params.additionalProfileAllow ?? []];
	const providerProfileAllow = [...policy.providerProfileAlsoAllow ?? [], ...params.additionalProfileAllow ?? []];
	return {
		profilePolicy: mergePolicyAllowlist(policy.profilePolicy, profileAllow),
		providerProfilePolicy: mergePolicyAllowlist(policy.providerProfilePolicy, providerProfileAllow),
		globalPolicy: mergePolicyAllowlist(policy.globalPolicy, params.additionalPolicyAllow),
		globalProviderPolicy: mergePolicyAllowlist(policy.globalProviderPolicy, params.additionalPolicyAllow),
		agentPolicy: mergePolicyAllowlist(policy.agentPolicy, params.additionalPolicyAllow),
		agentProviderPolicy: mergePolicyAllowlist(policy.agentProviderPolicy, params.additionalPolicyAllow),
		groupPolicy: mergePolicyAllowlist(policy.groupPolicy, params.additionalPolicyAllow),
		senderPolicy: mergePolicyAllowlist(policy.senderPolicy, params.additionalPolicyAllow),
		sandboxPolicy: mergePolicyAllowlist(policy.sandboxPolicy, params.additionalPolicyAllow),
		subagentPolicy: mergePolicyAllowlist(policy.subagentPolicy, params.additionalPolicyAllow),
		runtimeToolPolicy: policy.runtimeToolPolicyForInheritance,
		inheritedToolPolicy: mergePolicyAllowlist(policy.inheritedToolPolicy, params.additionalInheritedAllow)
	};
}
/** Builds the canonical ordered policy pipeline for a resolved conversation. */
function buildConversationToolPolicyPipelineSteps(params) {
	const profile = params.capabilityProfile.policy;
	return [
		...buildDefaultToolPolicyPipelineSteps({
			profilePolicy: params.policies.profilePolicy,
			profile: profile.profile,
			profileUnavailableCoreWarningAllowlist: profile.profilePolicy?.allow,
			providerProfilePolicy: params.policies.providerProfilePolicy,
			providerProfile: profile.providerProfile,
			providerProfileUnavailableCoreWarningAllowlist: profile.providerProfilePolicy?.allow,
			globalPolicy: params.policies.globalPolicy,
			globalProviderPolicy: params.policies.globalProviderPolicy,
			agentPolicy: params.policies.agentPolicy,
			agentProviderPolicy: params.policies.agentProviderPolicy,
			groupPolicy: params.policies.groupPolicy,
			senderPolicy: params.policies.senderPolicy,
			agentId: profile.agentId,
			unavailableCoreToolReason: params.unavailableCoreToolReason
		}),
		{
			policy: params.policies.sandboxPolicy,
			label: "sandbox tools.allow",
			unavailableCoreToolReason: params.unavailableCoreToolReason
		},
		...params.additionalStepsAfterSandbox ?? [],
		{
			policy: params.policies.subagentPolicy,
			label: "subagent tools.allow",
			unavailableCoreToolReason: params.unavailableCoreToolReason
		},
		...params.includeRuntimeToolPolicy ? [{
			policy: params.policies.runtimeToolPolicy,
			label: "runtime tools.allow",
			unavailableCoreToolReason: params.unavailableCoreToolReason
		}] : [],
		{
			policy: params.policies.inheritedToolPolicy,
			label: "inherited tools",
			unavailableCoreToolReason: params.unavailableCoreToolReason
		}
	];
}
/** Projects a fixed runtime catalog through the exact conversation policy pipeline. */
function projectConversationToolNames(params) {
	const policies = resolveConversationToolPolicies({ capabilityProfile: params.capabilityProfile });
	return applyToolPolicyPipeline({
		tools: params.toolNames.map((name) => ({ name })),
		toolMeta: () => void 0,
		warn: params.warn,
		steps: buildConversationToolPolicyPipelineSteps({
			capabilityProfile: params.capabilityProfile,
			policies,
			includeRuntimeToolPolicy: true
		})
	}).map((tool) => tool.name);
}
//#endregion
export { buildDefaultToolPolicyPipelineSteps as a, applyToolPolicyPipeline as i, projectConversationToolNames as n, resolveConversationToolPolicies as r, buildConversationToolPolicyPipelineSteps as t };
