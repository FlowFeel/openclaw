import { t as getProviderEnvVars } from "../../provider-env-vars-5Fdeltvz.js";
import { n as listMemoryEmbeddingProviders } from "../../memory-embedding-provider-runtime-zFJ3Eme9.js";
import { t as DEFAULT_LOCAL_MODEL } from "../../embedding-defaults-BP3wPc9o.js";
import "../../memory-core-host-embedding-registry-c4SeSkUG.js";
import { t as hasConfiguredMemorySecretInput } from "../../secret-input-C8FkUo1T.js";
import { t as checkQmdBinaryAvailability } from "../../engine-qmd-Dvs-C0LX.js";
import "../../memory-core-host-engine-qmd-B6puvyud.js";
import { n as resolveMemoryFtsState, r as resolveMemoryVectorState, t as resolveMemoryCacheSummary } from "../../status-format-ExS6-yQO.js";
import "../../memory-core-host-status-DSYZv50a.js";
import "../../provider-env-vars-5Bj-Xf2G.js";
import { p as configureMemoryCoreDreamingState } from "../../dreaming-state-CswYxS-h.js";
import { i as repairShortTermPromotionArtifacts, n as auditShortTermPromotionArtifacts, p as loadShortTermPromotionDreamingStats, r as removeGroundedShortTermCandidates } from "../../short-term-promotion-ByFj77Sc.js";
import { t as MemoryIndexManager } from "../../manager-Diaa3WiM.js";
import { t as createEmbeddingProvider } from "../../embeddings-f9KxNIrL.js";
import { r as getMemorySearchManager } from "../../memory-RjZbrc7P.js";
import { n as memoryRuntime } from "../../runtime-provider-C-mXyryq.js";
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
