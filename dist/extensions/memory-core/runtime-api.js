import { t as getProviderEnvVars } from "../../provider-env-vars-5Fdeltvz.js";
import { n as listMemoryEmbeddingProviders } from "../../memory-embedding-provider-runtime-AkEjb_hA.js";
import { t as DEFAULT_LOCAL_MODEL } from "../../embedding-defaults-BP3wPc9o.js";
import "../../memory-core-host-embedding-registry-Uyl8KC-g.js";
import { t as hasConfiguredMemorySecretInput } from "../../secret-input-C8FkUo1T.js";
import { t as checkQmdBinaryAvailability } from "../../engine-qmd-g_0nMN6D.js";
import "../../memory-core-host-engine-qmd-CrfErb8X.js";
import { n as resolveMemoryFtsState, r as resolveMemoryVectorState, t as resolveMemoryCacheSummary } from "../../status-format-ExS6-yQO.js";
import "../../memory-core-host-status-BeKkPEJl.js";
import "../../provider-env-vars-5Bj-Xf2G.js";
import { p as configureMemoryCoreDreamingState } from "../../dreaming-state-CswYxS-h.js";
import { i as repairShortTermPromotionArtifacts, n as auditShortTermPromotionArtifacts, p as loadShortTermPromotionDreamingStats, r as removeGroundedShortTermCandidates } from "../../short-term-promotion-DUqa2NDK.js";
import { t as MemoryIndexManager } from "../../manager-FFhZNdh2.js";
import { t as createEmbeddingProvider } from "../../embeddings-Baj9sUb_.js";
import { r as getMemorySearchManager } from "../../memory-CxbDaqgb.js";
import { n as memoryRuntime } from "../../runtime-provider-BFvZM-GN.js";
import { n as repairDreamingArtifacts, t as auditDreamingArtifacts } from "../../dreaming-repair-D7G77EgD.js";
//#region extensions/memory-core/src/memory/provider-adapters.ts
function getBuiltinMemoryEmbeddingProviderAdapter(id) {
	return listMemoryEmbeddingProviders().find((adapter) => adapter.id === id);
}
function getBuiltinMemoryEmbeddingProviderDoctorMetadata(providerId) {
	const adapter = getBuiltinMemoryEmbeddingProviderAdapter(providerId);
	if (!adapter) return null;
	const authProviderId = adapter.authProviderId ?? adapter.id;
	return {
		providerId: adapter.id,
		authProviderId,
		envVars: getProviderEnvVars(authProviderId),
		transport: adapter.transport === "local" ? "local" : "remote",
		autoSelectPriority: adapter.autoSelectPriority
	};
}
function listBuiltinAutoSelectMemoryEmbeddingProviderDoctorMetadata() {
	return listMemoryEmbeddingProviders().filter((adapter) => typeof adapter.autoSelectPriority === "number").toSorted((a, b) => (a.autoSelectPriority ?? 0) - (b.autoSelectPriority ?? 0)).map((adapter) => {
		const authProviderId = adapter.authProviderId ?? adapter.id;
		return {
			providerId: adapter.id,
			authProviderId,
			envVars: getProviderEnvVars(authProviderId),
			transport: adapter.transport === "local" ? "local" : "remote",
			autoSelectPriority: adapter.autoSelectPriority
		};
	});
}
//#endregion
export { DEFAULT_LOCAL_MODEL, MemoryIndexManager, auditDreamingArtifacts, auditShortTermPromotionArtifacts, checkQmdBinaryAvailability, configureMemoryCoreDreamingState, createEmbeddingProvider, getBuiltinMemoryEmbeddingProviderDoctorMetadata, getMemorySearchManager, hasConfiguredMemorySecretInput, listBuiltinAutoSelectMemoryEmbeddingProviderDoctorMetadata, loadShortTermPromotionDreamingStats, memoryRuntime, removeGroundedShortTermCandidates, repairDreamingArtifacts, repairShortTermPromotionArtifacts, resolveMemoryCacheSummary, resolveMemoryFtsState, resolveMemoryVectorState };
