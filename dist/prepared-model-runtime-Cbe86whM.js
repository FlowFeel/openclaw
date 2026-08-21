import { c as resolveAgentDir, d as resolveDefaultAgentDir, f as resolveDefaultAgentId, i as listAgentIds, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { t as createSubsystemLogger } from "./subsystem-Ess1Ww-N.js";
import { h as resolveRunModelFallbacksOverride } from "./agent-scope-DyEposw2.js";
import { u as hashRuntimeConfigValue } from "./runtime-snapshot-Bzqj8IgJ.js";
import "./defaults-CdX9UGcX.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-BDwklqCa.js";
import { t as runTasksWithConcurrency } from "./run-with-concurrency-BHgpSCM6.js";
import { p as registerRuntimeAuthProfileStoreMutationListener } from "./runtime-snapshots-YBJlkOR-.js";
import { a as prepareFullCatalogFacts, i as prepareConfiguredRuntimeFactsBatch, o as prepareWorkspaceBuildGroup, r as prepareAgentCatalogSource, s as preparedModelRuntimeWorkspaceFactsKey, t as fingerprintPreparedRuntimeFacts } from "./prepared-model-runtime.facts-BjVNdeA7.js";
import { mt as AuthStorage } from "./sessions-CxWGGmnA.js";
import { i as resolveSelectedAgentHarnessRuntime, t as requiresAgentHarnessPluginSelection } from "./runtime-plugin-load-plan-CfrMO8pl.js";
import { r as isReservedSystemAgentId } from "./agent-id-D7-xzIog.js";
import { r as resolveModelCandidateChain } from "./model-fallback-candidates-04-xfJ0g.js";
import { t as withTimeout } from "./with-timeout-DLevvI3c.js";
import path from "node:path";
import { performance } from "node:perf_hooks";
import pLimit from "p-limit";
//#region src/agents/prepared-model-runtime.errors.ts
var PreparedModelRuntimeOwnerNotPublishedError = class extends Error {};
var PreparedModelRuntimePublicationSupersededError = class extends PreparedModelRuntimeOwnerNotPublishedError {};
function toPreparedModelRuntimeError(error) {
	return error instanceof Error ? error : new Error(String(error));
}
//#endregion
//#region src/agents/prepared-model-runtime.build.ts
const MAX_CONCURRENT_MODEL_RUNTIME_AGENT_SOURCE_BUILDS = 2;
const MAX_CONCURRENT_FULL_MODEL_CATALOG_BUILDS = 1;
const limitFullModelCatalogBuild = pLimit(MAX_CONCURRENT_FULL_MODEL_CATALOG_BUILDS);
function runSerializedPreparedModelRuntimeTask(params) {
	const previous = params.agentBuildCompletions.get(params.agentDir);
	const pending = (async () => {
		if (previous) await previous;
		if (!params.isCurrent()) throw new PreparedModelRuntimePublicationSupersededError(`prepared model runtime catalog generation was superseded for ${params.agentDir}`);
		return await params.task();
	})();
	const completion = pending.then(() => void 0, () => void 0);
	params.agentBuildCompletions.set(params.agentDir, completion);
	completion.then(() => {
		if (params.agentBuildCompletions.get(params.agentDir) === completion) params.agentBuildCompletions.delete(params.agentDir);
	});
	return pending;
}
function assertPreparedModelRuntimeInputCurrent(input, guards) {
	const isCurrent = typeof guards === "function" ? guards : guards.get(input);
	if (isCurrent && !isCurrent()) throw new PreparedModelRuntimePublicationSupersededError(`prepared model runtime publication was superseded for ${input.agentDir}`);
}
function assertPreparedModelRuntimeInputsCurrent(inputs, guards) {
	for (const input of inputs) assertPreparedModelRuntimeInputCurrent(input, guards);
}
function createFullModelCatalogAccess(params) {
	let fullCatalog = params.eagerCatalog;
	let pending;
	const assertCurrent = () => {
		if (!params.isCurrent()) throw new PreparedModelRuntimePublicationSupersededError(`prepared model runtime catalog generation was superseded for ${params.agentFacts.input.agentDir}`);
	};
	return { loadFullModelCatalog: () => {
		if (fullCatalog) return Promise.resolve(fullCatalog);
		if (!pending) pending = runSerializedPreparedModelRuntimeTask({
			agentDir: params.agentFacts.input.agentDir,
			agentBuildCompletions: params.agentBuildCompletions,
			isCurrent: params.isCurrent,
			task: async () => await limitFullModelCatalogBuild(async () => {
				assertCurrent();
				const fullCatalogMode = "live";
				const liveWorkspaceFacts = (await prepareWorkspaceBuildGroup([params.agentFacts.input], fullCatalogMode)).workspaceFacts;
				assertCurrent();
				const catalogSource = await prepareAgentCatalogSource(params.agentFacts, liveWorkspaceFacts, fullCatalogMode, false);
				assertCurrent();
				const facts = await prepareFullCatalogFacts(params.agentFacts, liveWorkspaceFacts, fullCatalogMode, catalogSource);
				assertCurrent();
				fullCatalog = facts.modelCatalog;
				return fullCatalog;
			})
		}).finally(() => {
			pending = void 0;
		});
		return pending;
	} };
}
function createSnapshot(agentFacts, workspaceFacts, catalogFacts, catalogAccess) {
	const { credentials, input } = agentFacts;
	const { mediaCapabilityProviders, messageToolCatalog, pluginMetadataSnapshot, pluginRegistry } = workspaceFacts;
	const { configuredRuntimeModels, inlineProviderModels, modelCatalog, templateModelRegistry } = catalogFacts;
	const createStores = () => {
		const authStorage = AuthStorage.inMemory(credentials);
		return {
			authStorage,
			modelRegistry: templateModelRegistry.fork(authStorage)
		};
	};
	return Object.freeze({
		...input.agentId ? { agentId: input.agentId } : {},
		agentDir: input.agentDir,
		activeProjectKeys: [],
		...input.inheritedAuthDir ? { inheritedAuthDir: input.inheritedAuthDir } : {},
		...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {},
		config: input.config,
		metadataSnapshot: pluginMetadataSnapshot,
		allowGatewaySubagentBinding: input.allowGatewaySubagentBinding === true,
		...pluginRegistry ? { pluginRegistry } : {},
		...messageToolCatalog ? { messageToolCatalog } : {},
		...mediaCapabilityProviders ? { mediaCapabilityProviders } : {},
		modelCatalog,
		loadFullModelCatalog: catalogAccess.loadFullModelCatalog,
		configuredRuntimeModels,
		inlineProviderModels,
		createStores
	});
}
async function buildSnapshotBatch(inputs, catalogMode, agentBuildCompletions, generationGuards, buildGuards, onBuildStats) {
	const groups = /* @__PURE__ */ new Map();
	for (const input of inputs) {
		const key = preparedModelRuntimeWorkspaceFactsKey(input);
		const group = groups.get(key);
		if (group) group.push(input);
		else groups.set(key, [input]);
	}
	const preparedInputs = /* @__PURE__ */ new Map();
	const workspaceFacts = /* @__PURE__ */ new Map();
	const workspaceKeys = /* @__PURE__ */ new Map();
	let runtimePluginMs = 0;
	let pluginMetadataMs = 0;
	let staticProviderCatalogMs = 0;
	let ambientCredentialsMs = 0;
	let agentFactsMs = 0;
	let configuredProjectionMs = 0;
	const workspaceFactsStartedAt = performance.now();
	for (const [key, group] of groups) {
		if (typeof buildGuards === "function") assertPreparedModelRuntimeInputsCurrent(group, buildGuards);
		const prepared = await prepareWorkspaceBuildGroup(group, catalogMode);
		assertPreparedModelRuntimeInputsCurrent(group, buildGuards);
		workspaceFacts.set(key, prepared.workspaceFacts);
		runtimePluginMs += prepared.buildStats.runtimePluginMs;
		pluginMetadataMs += prepared.buildStats.pluginMetadataMs;
		staticProviderCatalogMs += prepared.buildStats.staticProviderCatalogMs;
		ambientCredentialsMs += prepared.buildStats.ambientCredentialsMs;
		agentFactsMs += prepared.buildStats.agentFactsMs;
		configuredProjectionMs += prepared.buildStats.configuredProjectionMs;
		for (const agentFacts of prepared.agentFacts) {
			preparedInputs.set(agentFacts.input, agentFacts);
			workspaceKeys.set(agentFacts.input, key);
		}
	}
	const workspaceFactsMs = performance.now() - workspaceFactsStartedAt;
	const catalogSourceStartedAt = performance.now();
	const catalogSources = /* @__PURE__ */ new Map();
	if (catalogMode === "live") {
		const sourceInputsByAgentDir = /* @__PURE__ */ new Map();
		for (const input of inputs) {
			const group = sourceInputsByAgentDir.get(input.agentDir);
			if (group) group.push(input);
			else sourceInputsByAgentDir.set(input.agentDir, [input]);
		}
		const sourceErrors = [];
		const sourceBuild = await runTasksWithConcurrency({
			limit: MAX_CONCURRENT_MODEL_RUNTIME_AGENT_SOURCE_BUILDS,
			errorMode: "stop",
			onTaskError: (error) => {
				sourceErrors.push(error);
			},
			tasks: [...sourceInputsByAgentDir.values()].map((sourceInputs) => async () => {
				for (const input of sourceInputs) {
					const prepared = preparedInputs.get(input);
					const workspaceKey = workspaceKeys.get(input);
					const facts = workspaceKey ? workspaceFacts.get(workspaceKey) : void 0;
					if (!prepared) throw new Error(`prepared model runtime agent facts missing for ${input.agentDir}`);
					if (!facts) throw new Error(`prepared model runtime workspace facts missing for ${input.agentDir}`);
					assertPreparedModelRuntimeInputCurrent(input, buildGuards);
					const catalogSource = await prepareAgentCatalogSource(prepared, facts, catalogMode);
					assertPreparedModelRuntimeInputCurrent(input, buildGuards);
					catalogSources.set(input, catalogSource);
				}
			})
		});
		if (sourceBuild.hasError) throw toPreparedModelRuntimeError(sourceErrors.find((error) => !(error instanceof PreparedModelRuntimePublicationSupersededError)) ?? sourceBuild.firstError);
	}
	const catalogSourceMs = performance.now() - catalogSourceStartedAt;
	const preparedCatalogs = /* @__PURE__ */ new Map();
	let runtimeRegistryCount = 0;
	const registryStartedAt = performance.now();
	if (catalogMode === "live") for (const input of inputs) {
		const agentFacts = preparedInputs.get(input);
		const workspaceKey = workspaceKeys.get(input);
		const facts = workspaceKey ? workspaceFacts.get(workspaceKey) : void 0;
		if (!agentFacts || !facts) throw new Error(`prepared model runtime facts missing for ${input.agentDir}`);
		const catalogSource = catalogSources.get(input);
		if (!catalogSource) throw new Error(`prepared model runtime catalog source missing for ${input.agentDir}`);
		assertPreparedModelRuntimeInputCurrent(input, buildGuards);
		preparedCatalogs.set(input, await prepareFullCatalogFacts(agentFacts, facts, catalogMode, catalogSource));
		assertPreparedModelRuntimeInputCurrent(input, buildGuards);
		runtimeRegistryCount += 1;
	}
	else for (const [workspaceKey, group] of groups) {
		assertPreparedModelRuntimeInputsCurrent(group, buildGuards);
		const facts = workspaceFacts.get(workspaceKey);
		if (!facts) throw new Error(`prepared model runtime workspace facts missing for ${workspaceKey}`);
		const batch = prepareConfiguredRuntimeFactsBatch({
			agentFacts: group.map((input) => {
				const agentFacts = preparedInputs.get(input);
				if (!agentFacts) throw new Error(`prepared model runtime facts missing for ${input.agentDir}`);
				return agentFacts;
			}),
			workspaceFacts: facts
		});
		runtimeRegistryCount += batch.registryCount;
		for (const [input, catalogFacts] of batch.catalogs) preparedCatalogs.set(input, catalogFacts);
		assertPreparedModelRuntimeInputsCurrent(group, buildGuards);
	}
	const registryMs = performance.now() - registryStartedAt;
	const preparedAgentFacts = [...preparedInputs.values()];
	const configuredRuntimeModelCount = preparedAgentFacts.reduce((count, facts) => count + facts.configuredRuntimeModels.length, 0);
	const generatedCatalogPluginCount = new Set(preparedAgentFacts.flatMap((facts) => facts.configuredGeneratedCatalogPluginIds)).size;
	const generatedCatalogReadCount = preparedAgentFacts.reduce((count, facts) => count + facts.configuredGeneratedCatalogPluginIds.length, 0);
	onBuildStats?.({
		agentCount: inputs.length,
		workspaceGroupCount: groups.size,
		configuredFactsGroupCount: groups.size,
		catalogSourceCount: catalogMode === "live" ? [...preparedInputs.values()].filter(({ input }) => !input.readOnly).length : 0,
		credentialGroupCount: new Set([...preparedInputs.values()].map((agentFacts) => fingerprintPreparedRuntimeFacts(agentFacts.credentials))).size,
		catalogGroupCount: catalogMode === "live" ? inputs.length : 0,
		runtimeRegistryCount,
		configuredRuntimeModelCount,
		generatedCatalogPluginCount,
		generatedCatalogReadCount,
		workspaceFactsMs,
		runtimePluginMs,
		pluginMetadataMs,
		staticProviderCatalogMs,
		ambientCredentialsMs,
		agentFactsMs,
		configuredProjectionMs,
		catalogSourceMs,
		registryMs,
		sourceConcurrencyLimit: MAX_CONCURRENT_MODEL_RUNTIME_AGENT_SOURCE_BUILDS,
		fullCatalogConcurrencyLimit: MAX_CONCURRENT_FULL_MODEL_CATALOG_BUILDS
	});
	assertPreparedModelRuntimeInputsCurrent(inputs, buildGuards);
	return inputs.map((input) => {
		const agentFacts = preparedInputs.get(input);
		const workspaceKey = workspaceKeys.get(input);
		const facts = workspaceKey ? workspaceFacts.get(workspaceKey) : void 0;
		const catalogFacts = preparedCatalogs.get(input);
		if (!agentFacts || !facts || !catalogFacts) throw new Error(`prepared model runtime snapshot facts missing for ${input.agentDir}`);
		return createSnapshot(agentFacts, facts, catalogFacts, createFullModelCatalogAccess({
			agentFacts,
			workspaceFacts: facts,
			agentBuildCompletions,
			isCurrent: generationGuards.get(input) ?? (() => false),
			...catalogMode === "live" ? { eagerCatalog: catalogFacts.modelCatalog } : {}
		}));
	});
}
function startSerializedSnapshotBuildBatch(inputs, agentBuildCompletions, buildTimeoutMs, catalogMode = "live", onBuildStats, generationGuards = /* @__PURE__ */ new Map(), buildGuards = generationGuards) {
	const agentDirs = [...new Set(inputs.map((input) => input.agentDir))];
	const previousBuildCompletions = [...new Set(agentDirs.map((agentDir) => agentBuildCompletions.get(agentDir)).filter((completion) => completion !== void 0))];
	const startBuild = (async () => {
		if (previousBuildCompletions.length > 0) await Promise.all(previousBuildCompletions);
		return { actualBuild: buildSnapshotBatch(inputs, catalogMode, agentBuildCompletions, generationGuards, buildGuards, onBuildStats) };
	})();
	const completion = startBuild.then(async ({ actualBuild }) => await actualBuild).then(() => void 0, () => void 0);
	for (const agentDir of agentDirs) {
		agentBuildCompletions.set(agentDir, completion);
		completion.then(() => {
			if (agentBuildCompletions.get(agentDir) === completion) agentBuildCompletions.delete(agentDir);
		});
	}
	return {
		pending: withTimeout(async () => {
			const { actualBuild } = await startBuild;
			return await actualBuild;
		}, buildTimeoutMs, "prepared model runtime publication"),
		completion
	};
}
function startSerializedSnapshotBuild(input, agentBuildCompletions, buildTimeoutMs, catalogMode = "live", generationGuard = () => true) {
	const build = startSerializedSnapshotBuildBatch([input], agentBuildCompletions, buildTimeoutMs, catalogMode, void 0, /* @__PURE__ */ new Map([[input, generationGuard]]));
	return {
		pending: build.pending.then((snapshots) => snapshots[0]),
		completion: build.completion
	};
}
//#endregion
//#region src/agents/prepared-model-runtime.owner.ts
function createPreparedModelRuntimeOwner(input, provenance, catalogMode = "live") {
	return {
		input,
		environmentFingerprint: effectiveEnvironmentFingerprint(input),
		catalogMode,
		provenance,
		generation: 0,
		needsRefresh: true
	};
}
var PreparedModelRuntimeOwnerRetention = class {
	#retained = /* @__PURE__ */ new Map();
	constructor(maxSize) {
		this.maxSize = maxSize;
	}
	clear(owners) {
		for (const [key, owner] of this.#retained) if (owner.provenance === "run" && (owner.leaseCount ?? 0) === 0 && owners.get(key) === owner) owners.delete(key);
		this.#retained.clear();
	}
	has(key, owner) {
		return this.#retained.get(key) === owner;
	}
	retain(key, owner, owners) {
		if (owner.provenance !== "run") return;
		this.#retained.delete(key);
		this.#retained.set(key, owner);
		while (this.#retained.size > this.maxSize) {
			const oldest = this.#retained.entries().next().value;
			if (!oldest) return;
			const [oldestKey, oldestOwner] = oldest;
			this.#retained.delete(oldestKey);
			if ((oldestOwner.leaseCount ?? 0) === 0 && owners.get(oldestKey) === oldestOwner) owners.delete(oldestKey);
		}
	}
};
function findConfiguredOwnerCandidates(owners, rawInput) {
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const configured = [...owners.values()].filter((owner) => owner.provenance === "configured");
	const identityCandidates = input.agentId === void 0 ? [] : configured.filter((owner) => owner.input.agentId === input.agentId);
	const exactCandidates = identityCandidates.filter((owner) => owner.input.agentDir === input.agentDir);
	const directoryCandidates = configured.filter((owner) => owner.input.agentDir === input.agentDir);
	const canRebindByDirectory = input.agentId === void 0 || isReservedSystemAgentId(input.agentId);
	return exactCandidates.length > 0 ? exactCandidates : canRebindByDirectory && directoryCandidates.length > 0 ? directoryCandidates : identityCandidates;
}
/** Whether a configured owner matches the requesting runtime's identity/directory. */
function hasConfiguredOwnerMatching(owners, rawInput) {
	return findConfiguredOwnerCandidates(owners, rawInput).length > 0;
}
function rebindInputToCommittedConfiguredOwner(owners, rawInput) {
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const candidates = findConfiguredOwnerCandidates(owners, rawInput).filter((owner) => owner.snapshot && !owner.needsRefresh && !owner.pending);
	if (candidates.length !== 1) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model runtime owner was not committed after replacement for ${input.agentDir}`);
	const owner = candidates[0];
	const preserveWorkspaceDir = input.preserveWorkspaceDirOnRefresh === true && input.workspaceDir !== void 0;
	const agentId = input.agentId ?? owner.input.agentId;
	return normalizePreparedModelRuntimeInput({
		...input,
		...agentId ? { agentId } : {},
		agentDir: owner.input.agentDir,
		config: owner.input.config,
		inheritedAuthDir: owner.input.inheritedAuthDir,
		env: owner.input.env,
		workspaceDir: preserveWorkspaceDir ? input.workspaceDir : owner.input.workspaceDir,
		preserveWorkspaceDirOnRefresh: preserveWorkspaceDir,
		allowGatewaySubagentBinding: input.allowGatewaySubagentBinding ?? owner.input.allowGatewaySubagentBinding,
		runtimePluginSelections: input.runtimePluginSelections ?? owner.input.runtimePluginSelections
	});
}
/** Accepts canonical config clones without weakening projected-config isolation. */
function preparedModelRuntimeConfigsMatch(left, right) {
	if (left === right) return true;
	try {
		return hashRuntimeConfigValue(left) === hashRuntimeConfigValue(right);
	} catch {
		return false;
	}
}
function normalizeOptionalDir(dirname) {
	return dirname ? path.resolve(dirname) : void 0;
}
function normalizePreparedModelRuntimeInput(input) {
	const { inheritedAuthDir: _inheritedAuthDir, readOnly, runtimePluginSelections: _runtimePluginSelections, skipCredentials, workspaceDir: _workspaceDir, ...rest } = input;
	const inheritedAuthDir = normalizeOptionalDir(input.inheritedAuthDir ?? resolveDefaultAgentDir(input.config, input.env));
	const workspaceDir = normalizeOptionalDir(input.workspaceDir);
	const env = input.env ? Object.freeze({ ...input.env }) : void 0;
	const runtimePluginSelections = input.runtimePluginSelections ? Object.freeze([...input.runtimePluginSelections].filter((selection) => requiresAgentHarnessPluginSelection(selection, input.config)).map((selection) => {
		const runtime = resolveSelectedAgentHarnessRuntime(selection, input.config);
		const { agentId: _agentId, ...normalized } = selection;
		return Object.freeze({
			...normalized,
			runtime
		});
	}).toSorted((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)))) : void 0;
	return {
		...rest,
		agentDir: path.resolve(input.agentDir),
		...inheritedAuthDir ? { inheritedAuthDir } : {},
		...readOnly === true ? { readOnly: true } : {},
		...skipCredentials === true ? { skipCredentials: true } : {},
		...workspaceDir ? { workspaceDir } : {},
		...env ? { env } : {},
		...input.allowGatewaySubagentBinding === true ? { allowGatewaySubagentBinding: true } : {},
		...runtimePluginSelections?.length ? { runtimePluginSelections } : {}
	};
}
function environmentFingerprint(env) {
	return env ? hashRuntimeConfigValue(env) : void 0;
}
function effectiveEnvironmentFingerprint(input) {
	return hashRuntimeConfigValue(input.env ?? process.env);
}
function ownerKey(input) {
	return JSON.stringify({
		agentId: input.agentId,
		agentDir: input.agentDir,
		inheritedAuthDir: input.inheritedAuthDir,
		readOnly: input.readOnly === true,
		skipCredentials: input.skipCredentials === true,
		workspaceDir: input.workspaceDir,
		env: environmentFingerprint(input.env),
		allowGatewaySubagentBinding: input.allowGatewaySubagentBinding === true,
		runtimePluginSelections: input.runtimePluginSelections,
		config: input.readOnly ? hashRuntimeConfigValue(input.config) : void 0
	});
}
function resolvePublishedOwner(owners, input, options = {}) {
	const exact = owners.get(ownerKey(input));
	if (exact) return exact;
	if (!options.allowConfiguredWorkspaceFallback) return;
	const candidates = [...owners.values()].filter((owner) => owner.provenance === "configured" && (input.agentId === void 0 || owner.input.agentId === input.agentId) && owner.input.agentDir === input.agentDir && owner.input.inheritedAuthDir === input.inheritedAuthDir && owner.input.readOnly === input.readOnly && owner.input.skipCredentials === input.skipCredentials && owner.input.allowGatewaySubagentBinding === input.allowGatewaySubagentBinding && (input.runtimePluginSelections === void 0 || JSON.stringify(owner.input.runtimePluginSelections) === JSON.stringify(input.runtimePluginSelections)) && (input.env === void 0 || owner.environmentFingerprint === environmentFingerprint(input.env)) && (input.workspaceDir === void 0 || owner.input.workspaceDir === input.workspaceDir));
	return candidates.length === 1 ? candidates[0] : void 0;
}
function hasSameLifecycleInput(left, right) {
	return left.config === right.config && left.agentId === right.agentId && left.inheritedAuthDir === right.inheritedAuthDir && left.readOnly === right.readOnly && left.skipCredentials === right.skipCredentials && left.workspaceDir === right.workspaceDir && environmentFingerprint(left.env) === environmentFingerprint(right.env) && left.preserveWorkspaceDirOnRefresh === right.preserveWorkspaceDirOnRefresh && left.allowGatewaySubagentBinding === right.allowGatewaySubagentBinding && JSON.stringify(left.runtimePluginSelections) === JSON.stringify(right.runtimePluginSelections);
}
function toError(error) {
	return toPreparedModelRuntimeError(error);
}
function createPreparedModelRuntimeReplacement() {
	let resolve;
	let reject;
	const promise = new Promise((resolvePromise, rejectPromise) => {
		resolve = resolvePromise;
		reject = rejectPromise;
	});
	promise.catch(() => void 0);
	return {
		gateId: Symbol("prepared-model-runtime-replacement"),
		promise,
		resolve,
		reject
	};
}
function listConfiguredOwnerInputs(config, defaultWorkspaceDir, allowGatewaySubagentBinding) {
	const inheritedAuthDir = resolveDefaultAgentDir(config);
	const defaultAgentId = resolveDefaultAgentId(config);
	return listAgentIds(config).map((agentId) => {
		const preserveWorkspaceDirOnRefresh = agentId === defaultAgentId && defaultWorkspaceDir;
		const input = {
			agentId,
			agentDir: resolveAgentDir(config, agentId),
			config,
			inheritedAuthDir,
			workspaceDir: preserveWorkspaceDirOnRefresh ? defaultWorkspaceDir : resolveAgentWorkspaceDir(config, agentId),
			runtimePluginSelections: resolveConfiguredRuntimePluginSelections(config, agentId)
		};
		if (allowGatewaySubagentBinding === true) input.allowGatewaySubagentBinding = true;
		if (preserveWorkspaceDirOnRefresh) input.preserveWorkspaceDirOnRefresh = true;
		return input;
	});
}
function resolveConfiguredRuntimePluginSelections(config, agentId) {
	const configured = resolveDefaultModelForAgent({
		cfg: config,
		agentId
	});
	return resolveModelCandidateChain({
		cfg: config,
		manifestPlugins: [],
		provider: configured.provider || "openai",
		model: configured.model || "gpt-5.6-sol",
		requestedRouteResolution: "resolved",
		fallbacksOverride: resolveRunModelFallbacksOverride({
			cfg: config,
			agentId
		})
	}).map((candidate) => ({
		provider: candidate.provider,
		modelId: candidate.model,
		agentId
	}));
}
async function publishPreparedModelRuntimeOwnerBatch(params) {
	const candidates = params.entries.map(({ owner, input }) => {
		owner.input = input;
		owner.environmentFingerprint = effectiveEnvironmentFingerprint(input);
		owner.generation += 1;
		owner.needsRefresh = true;
		owner.refreshError = void 0;
		const generation = owner.generation;
		const key = ownerKey(input);
		let registered = params.owners.get(key) === owner;
		return {
			catalogMode: owner.catalogMode,
			input,
			isEligible: () => (params.isPublicationCurrent?.() ?? true) && owner.generation === generation && (registered ? params.owners.get(key) === owner : params.registerEntriesAfterBuildStart === true),
			isCurrent: () => (params.isPublicationCurrent?.() ?? true) && owner.generation === generation && params.owners.get(key) === owner,
			key,
			markRegistered: () => {
				registered = true;
			},
			owner
		};
	});
	const groups = /* @__PURE__ */ new Map();
	for (const candidate of candidates) {
		const group = groups.get(candidate.catalogMode);
		if (group) group.push(candidate);
		else groups.set(candidate.catalogMode, [candidate]);
	}
	const snapshots = /* @__PURE__ */ new Map();
	const publication = (async () => {
		try {
			while (true) {
				const attempt = candidates.filter((candidate) => candidate.isEligible() && !snapshots.has(candidate.owner));
				if (attempt.length === 0) break;
				try {
					for (const [catalogMode, group] of groups) {
						const currentGroup = group.filter((candidate) => candidate.isEligible() && !snapshots.has(candidate.owner));
						if (currentGroup.length === 0) continue;
						const build = startSerializedSnapshotBuildBatch(currentGroup.map(({ input }) => input), params.agentBuildCompletions, params.buildTimeoutMs, catalogMode, params.onBuildStats, new Map(currentGroup.map((candidate) => [candidate.input, candidate.isCurrent])), params.isBuildCurrent);
						for (const candidate of currentGroup) {
							if (params.registerEntriesAfterBuildStart === true) {
								params.owners.set(candidate.key, candidate.owner);
								candidate.markRegistered();
							}
							candidate.owner.buildCompletion = build.completion;
							build.completion.then(() => {
								if (candidate.owner.buildCompletion === build.completion) candidate.owner.buildCompletion = void 0;
							});
						}
						const built = await build.pending;
						for (const [index, candidate] of currentGroup.entries()) snapshots.set(candidate.owner, built[index]);
					}
					break;
				} catch (error) {
					const refreshError = toError(error);
					const lostCandidate = attempt.some((candidate) => !candidate.isCurrent());
					if (!(refreshError instanceof PreparedModelRuntimePublicationSupersededError) || !(params.isPublicationCurrent?.() ?? true) || !lostCandidate) throw refreshError;
				}
			}
			for (const candidate of candidates) {
				if (!candidate.isCurrent()) continue;
				const snapshot = snapshots.get(candidate.owner);
				if (!snapshot) throw new Error(`prepared model runtime snapshot missing after auth refresh for ${candidate.input.agentDir}`);
				candidate.owner.snapshot = snapshot;
				candidate.owner.pending = void 0;
				candidate.owner.needsRefresh = false;
			}
		} catch (error) {
			const refreshError = toError(error);
			for (const candidate of candidates) {
				if (!candidate.isCurrent()) continue;
				candidate.owner.pending = void 0;
				candidate.owner.needsRefresh = true;
				candidate.owner.refreshError = refreshError;
			}
			throw refreshError;
		}
	})();
	for (const candidate of candidates) {
		const pending = publication.then(() => {
			if (!candidate.isCurrent()) throw new PreparedModelRuntimePublicationSupersededError(`prepared model runtime publication was superseded for ${candidate.input.agentDir}`);
			return snapshots.get(candidate.owner);
		});
		candidate.owner.pending = pending;
		pending.catch(() => void 0);
	}
	await publication;
}
async function publishModelRuntimeSnapshot(input, owners, agentBuildCompletions, buildTimeoutMs, existing, provenance = "explicit", catalogMode = existing?.catalogMode ?? "live") {
	const key = ownerKey(input);
	const owner = existing ?? createPreparedModelRuntimeOwner(input, provenance, catalogMode);
	owner.input = input;
	owner.environmentFingerprint = effectiveEnvironmentFingerprint(input);
	owner.catalogMode = catalogMode;
	owner.provenance = provenance;
	owner.generation += 1;
	owner.needsRefresh = true;
	owner.refreshError = void 0;
	const generation = owner.generation;
	const build = startSerializedSnapshotBuild(input, agentBuildCompletions, buildTimeoutMs, catalogMode, () => owner.generation === generation && owners.get(key) === owner);
	owner.buildCompletion = build.completion;
	build.completion.then(() => {
		if (owner.buildCompletion === build.completion) owner.buildCompletion = void 0;
	});
	owners.set(key, owner);
	const publication = (async () => {
		try {
			const snapshot = await build.pending;
			if (owner.generation !== generation || owners.get(key) !== owner) throw new PreparedModelRuntimePublicationSupersededError(`prepared model runtime publication was superseded for ${input.agentDir}`);
			owner.snapshot = snapshot;
			owner.pending = void 0;
			owner.needsRefresh = false;
			return snapshot;
		} catch (error) {
			const refreshError = toError(error);
			if (owner.generation === generation && owners.get(key) === owner) {
				owner.pending = void 0;
				owner.needsRefresh = true;
				owner.refreshError = refreshError;
			}
			throw refreshError;
		}
	})();
	owner.pending = publication;
	return await publication;
}
//#endregion
//#region src/agents/prepared-model-runtime.ts
const log = createSubsystemLogger("agents/prepared-model-runtime");
const DEFAULT_MODEL_RUNTIME_BUILD_TIMEOUT_MS = 12e4;
let modelRuntimeBuildTimeoutMs = DEFAULT_MODEL_RUNTIME_BUILD_TIMEOUT_MS;
const owners = /* @__PURE__ */ new Map();
const agentBuildCompletions = /* @__PURE__ */ new Map();
const standaloneActivationTails = /* @__PURE__ */ new Map();
const retainedDirectRunOwners = new PreparedModelRuntimeOwnerRetention(1);
const retainedGatewayRunOwners = new PreparedModelRuntimeOwnerRetention(8);
let gatewayLifecycleActive = false;
let refreshTail = Promise.resolve();
let refreshRequestEpoch = 0;
let pendingModelRuntimeReplacement;
const pendingAuthMutations = [];
/** Resolves a published owner or activates a standalone lifecycle owner. */
async function loadPreparedModelRuntimeSnapshot(rawInput) {
	let input = normalizePreparedModelRuntimeInput({
		...rawInput,
		preserveWorkspaceDirOnRefresh: rawInput.preserveWorkspaceDirOnRefresh ?? rawInput.workspaceDir !== void 0
	});
	for (;;) {
		const replacement = pendingModelRuntimeReplacement;
		if (replacement) {
			await replacement.promise;
			if (pendingModelRuntimeReplacement) continue;
			input = rebindInputToCommittedConfiguredOwner(owners, input);
			continue;
		}
		try {
			return await prepareModelRuntimeSnapshot(input);
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
		}
		const activationGate = pendingModelRuntimeReplacement;
		if (activationGate) {
			await activationGate.promise;
			if (pendingModelRuntimeReplacement) continue;
			input = rebindInputToCommittedConfiguredOwner(owners, input);
			continue;
		}
		const activated = await activateStandalonePreparedModelRuntime(input);
		const replacementAfterActivation = pendingModelRuntimeReplacement;
		if (replacementAfterActivation) {
			await replacementAfterActivation.promise;
			if (pendingModelRuntimeReplacement) continue;
			input = rebindInputToCommittedConfiguredOwner(owners, input);
			continue;
		}
		if (!activated) return await prepareModelRuntimeSnapshot(input);
		try {
			return await prepareModelRuntimeSnapshot(input);
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
		}
	}
}
/** Returns an already-published generation without starting discovery. */
function getPreparedModelRuntimeSnapshot(rawInput) {
	if (pendingModelRuntimeReplacement) return;
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const owner = resolvePublishedOwner(owners, input, { allowConfiguredWorkspaceFallback: rawInput.workspaceDir === void 0 || rawInput.agentId === void 0 || rawInput.runtimePluginSelections === void 0 });
	if (!owner?.snapshot || owner.needsRefresh || owner.pending) return;
	if (input.readOnly && !preparedModelRuntimeConfigsMatch(owner.input.config, input.config)) return;
	return owner.snapshot;
}
/** Publishes one owner from an explicit startup/activation lifecycle boundary. */
async function publishPreparedModelRuntimeSnapshot(rawInput, options = {}) {
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const existing = owners.get(ownerKey(input));
	if (existing?.pending) {
		if (!options.force && hasSameLifecycleInput(existing.input, input)) return await existing.pending;
		return await publishModelRuntimeSnapshot(input, owners, agentBuildCompletions, modelRuntimeBuildTimeoutMs, existing, options.provenance, options.catalogMode);
	}
	if (existing?.buildCompletion) throw existing.refreshError ?? /* @__PURE__ */ new Error(`prepared model runtime build is still settling for ${input.agentDir}`);
	if (existing?.snapshot && !existing.needsRefresh && !options.force && hasSameLifecycleInput(existing.input, input)) return existing.snapshot;
	return await publishModelRuntimeSnapshot(input, owners, agentBuildCompletions, modelRuntimeBuildTimeoutMs, existing, options.provenance, options.catalogMode);
}
/** Activates lifecycle publication for direct embedded runtimes without a gateway startup. */
async function activateStandalonePreparedModelRuntime(rawInput) {
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const key = ownerKey(input);
	const activation = (standaloneActivationTails.get(key) ?? Promise.resolve()).then(async () => await activateStandalonePreparedModelRuntimeNow(input));
	const tail = activation.then(() => void 0, () => void 0);
	standaloneActivationTails.set(key, tail);
	try {
		return await activation;
	} finally {
		if (standaloneActivationTails.get(key) === tail) standaloneActivationTails.delete(key);
	}
}
async function activateStandalonePreparedModelRuntimeNow(input) {
	for (;;) {
		const overlapsConfiguredOwner = [...owners.values()].some((owner) => owner.provenance === "configured" && owner.input.agentDir === input.agentDir && (input.agentId === void 0 || owner.input.agentId === input.agentId) && (input.workspaceDir === void 0 || owner.input.workspaceDir === input.workspaceDir));
		if (gatewayLifecycleActive && (!input.readOnly || overlapsConfiguredOwner)) return;
		try {
			return await publishPreparedModelRuntimeSnapshot({
				...input,
				preserveWorkspaceDirOnRefresh: input.workspaceDir !== void 0
			}, { provenance: "standalone" });
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimePublicationSupersededError)) throw error;
			const replacement = pendingModelRuntimeReplacement;
			if (replacement) await replacement.promise;
		}
	}
}
async function acquirePreparedModelRuntimeLease(rawInput, provenance, options = {}) {
	let input = normalizePreparedModelRuntimeInput({
		...rawInput,
		preserveWorkspaceDirOnRefresh: rawInput.preserveWorkspaceDirOnRefresh ?? rawInput.workspaceDir !== void 0
	});
	let key = ownerKey(input);
	let owner;
	let snapshot;
	for (;;) {
		const replacement = pendingModelRuntimeReplacement;
		if (replacement) {
			await replacement.promise;
			if (pendingModelRuntimeReplacement) continue;
			if (provenance === "run") {
				input = rebindInputToCommittedConfiguredOwner(owners, input);
				key = ownerKey(input);
			}
			continue;
		}
		let existing = owners.get(key);
		let staleDynamicOwner = existing?.needsRefresh && !existing.pending && (existing.provenance === "run" || existing.provenance === "ephemeral");
		if (gatewayLifecycleActive && provenance === "run" && (!existing || staleDynamicOwner)) try {
			input = rebindInputToCommittedConfiguredOwner(owners, input);
			key = ownerKey(input);
			existing = owners.get(key);
			staleDynamicOwner = existing?.needsRefresh && !existing.pending && (existing.provenance === "run" || existing.provenance === "ephemeral");
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
			const canActivateConfiglessSetup = input.agentId !== void 0 && isReservedSystemAgentId(input.agentId);
			if (hasConfiguredOwnerMatching(owners, input) || !canActivateConfiglessSetup) throw error;
		}
		try {
			if (staleDynamicOwner) snapshot = await publishModelRuntimeSnapshot(input, owners, agentBuildCompletions, modelRuntimeBuildTimeoutMs, void 0, provenance);
			else if (existing) snapshot = await prepareModelRuntimeSnapshot(input);
			else snapshot = await publishPreparedModelRuntimeSnapshot(input, { provenance });
		} catch (error) {
			if (error instanceof PreparedModelRuntimePublicationSupersededError) continue;
			throw error;
		}
		const published = owners.get(key);
		if (pendingModelRuntimeReplacement || !published || published.snapshot !== snapshot || published.needsRefresh || published.pending) continue;
		owner = published;
		break;
	}
	if (owner.provenance !== provenance) return {
		snapshot,
		release: () => {}
	};
	if (provenance === "run" && options.retainIdleRunOwner) retainedDirectRunOwners.retain(key, owner, owners);
	else if (provenance === "run" && gatewayLifecycleActive) retainedGatewayRunOwners.retain(key, owner, owners);
	owner.leaseCount = (owner.leaseCount ?? 0) + 1;
	let released = false;
	return {
		snapshot,
		release: () => {
			if (released) return;
			released = true;
			owner.leaseCount = Math.max(0, (owner.leaseCount ?? 1) - 1);
			if (owner.leaseCount === 0 && owners.get(key) === owner) {
				if (!retainedDirectRunOwners.has(key, owner) && !retainedGatewayRunOwners.has(key, owner)) owners.delete(key);
			}
		}
	};
}
/** Acquires the exact writable workspace generation at agent-run admission. */
async function acquireAgentRunPreparedModelRuntime(rawInput, options = {}) {
	return await acquirePreparedModelRuntimeLease(rawInput, "run", options);
}
/** Acquires an exact read-only generation scoped to the returned lease. */
async function acquireReadOnlyPreparedModelRuntime(rawInput) {
	return await acquirePreparedModelRuntimeLease({
		...rawInput,
		readOnly: true
	}, "ephemeral");
}
/** Returns the snapshot published by the lifecycle owner. Request config cannot replace it. */
async function prepareModelRuntimeSnapshot(rawInput) {
	const replacement = pendingModelRuntimeReplacement;
	if (replacement) {
		await replacement.promise;
		return await prepareModelRuntimeSnapshot(rawInput);
	}
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const existing = resolvePublishedOwner(owners, input, { allowConfiguredWorkspaceFallback: rawInput.workspaceDir === void 0 || rawInput.agentId === void 0 || rawInput.runtimePluginSelections === void 0 });
	if (input.readOnly && existing && !preparedModelRuntimeConfigsMatch(existing.input.config, input.config)) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared read-only model runtime owner was not published for the requested config (${input.agentDir})`);
	if (existing?.pending) {
		try {
			await existing.pending;
		} catch {}
		return await prepareModelRuntimeSnapshot(rawInput);
	}
	if (existing?.needsRefresh) throw existing.refreshError ?? /* @__PURE__ */ new Error("prepared model runtime refresh is pending");
	if (existing?.snapshot) return existing.snapshot;
	throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model runtime owner was not published for ${input.agentDir}`);
}
/** Invalidates every published generation before config/plugin runtime replacement. */
function markPreparedModelRuntimeSnapshotsStale(reason = "prepared model runtime owner is stale after config publication", options = {}) {
	if (options.waitForReplacement) {
		const superseded = pendingModelRuntimeReplacement;
		pendingModelRuntimeReplacement = createPreparedModelRuntimeReplacement();
		superseded?.resolve();
	} else if (!options.preserveReplacementWait && pendingModelRuntimeReplacement) {
		const cancelled = pendingModelRuntimeReplacement;
		pendingModelRuntimeReplacement = void 0;
		cancelled.resolve();
	}
	refreshRequestEpoch += 1;
	const staleError = new Error(reason);
	for (const [key, owner] of owners) {
		if (owner.provenance === "standalone") {
			owner.generation += 1;
			owners.delete(key);
			continue;
		}
		owner.generation += 1;
		owner.needsRefresh = true;
		owner.refreshError = staleError;
	}
	return pendingModelRuntimeReplacement?.gateId;
}
/** Rejects readers waiting for a replacement when its owning reload cannot continue. */
function rejectPendingPreparedModelRuntimeReplacement(gateId, error) {
	const replacement = pendingModelRuntimeReplacement;
	if (!replacement || !gateId || replacement.gateId !== gateId) return;
	pendingModelRuntimeReplacement = void 0;
	replacement.reject(toError(error));
}
/** Rebuilds active owners after config/plugin runtime publication. */
async function refreshPreparedModelRuntimeSnapshotsNow(config, options, publicationEpoch) {
	retainedGatewayRunOwners.clear(owners);
	const { defaultWorkspaceDir: workspace, allowGatewaySubagentBinding: bindings } = options;
	const catalogMode = options.catalogMode ?? "live";
	gatewayLifecycleActive ||= options.gatewayLifecycle === true;
	const staleError = /* @__PURE__ */ new Error("prepared model runtime owner is stale after config publication");
	for (const owner of owners.values()) {
		owner.generation += 1;
		owner.needsRefresh = true;
		owner.refreshError = staleError;
	}
	const entries = [];
	const knownKeys = /* @__PURE__ */ new Set();
	for (const rawInput of listConfiguredOwnerInputs(config, workspace, bindings)) {
		let input = normalizePreparedModelRuntimeInput(rawInput);
		const preservedOwner = [...owners.values()].find((owner) => owner.provenance === "configured" && owner.input.agentId === input.agentId && owner.input.agentDir === input.agentDir && owner.input.preserveWorkspaceDirOnRefresh && owner.input.workspaceDir);
		if (preservedOwner?.input.workspaceDir) input = {
			...input,
			workspaceDir: preservedOwner.input.workspaceDir,
			preserveWorkspaceDirOnRefresh: true
		};
		const key = ownerKey(input);
		if (knownKeys.has(key)) continue;
		knownKeys.add(key);
		const owner = owners.get(key);
		entries.push({
			owner,
			input
		});
	}
	for (const [key, owner] of owners) if (!knownKeys.has(key) && (gatewayLifecycleActive || owner.provenance === "configured")) owners.delete(key);
	await publishPreparedModelRuntimeOwnerBatch({
		entries: entries.map(({ owner: existing, input }) => {
			const owner = existing?.provenance === "configured" ? existing : createPreparedModelRuntimeOwner(input, "configured", catalogMode);
			owner.input = input;
			owner.environmentFingerprint = effectiveEnvironmentFingerprint(input);
			owner.catalogMode = catalogMode;
			owner.provenance = "configured";
			return {
				input,
				owner
			};
		}),
		owners,
		agentBuildCompletions,
		buildTimeoutMs: modelRuntimeBuildTimeoutMs,
		isPublicationCurrent: () => publicationEpoch === refreshRequestEpoch,
		isBuildCurrent: () => publicationEpoch === refreshRequestEpoch,
		onBuildStats: options.onBuildStats,
		registerEntriesAfterBuildStart: true
	});
}
/** Serializes config/plugin publications so only the latest completed refresh retires owners. */
function refreshPreparedModelRuntimeSnapshots(config, options = {}) {
	markPreparedModelRuntimeSnapshotsStale(void 0, { waitForReplacement: true });
	const requestEpoch = refreshRequestEpoch;
	const replacement = pendingModelRuntimeReplacement;
	return enqueuePreparedModelRuntimePublication(async () => {
		if (requestEpoch !== refreshRequestEpoch) return;
		await refreshPreparedModelRuntimeSnapshotsNow(config, options, requestEpoch);
		if (requestEpoch !== refreshRequestEpoch) return;
		await drainPendingAuthMutations();
	}).then(() => {
		if (requestEpoch === refreshRequestEpoch && replacement && pendingModelRuntimeReplacement === replacement) {
			pendingModelRuntimeReplacement = void 0;
			replacement.resolve();
		}
	}, (error) => {
		const refreshError = toError(error);
		if (requestEpoch === refreshRequestEpoch) for (const owner of owners.values()) {
			owner.generation += 1;
			owner.pending = void 0;
			owner.needsRefresh = true;
			owner.refreshError = refreshError;
		}
		if (requestEpoch === refreshRequestEpoch && replacement && pendingModelRuntimeReplacement === replacement) {
			pendingModelRuntimeReplacement = void 0;
			replacement.reject(refreshError);
		}
		throw refreshError;
	});
}
function enqueuePreparedModelRuntimePublication(task) {
	const publication = refreshTail.then(task);
	refreshTail = publication.then(() => void 0, () => void 0);
	return publication;
}
async function drainPendingAuthMutations() {
	while (pendingAuthMutations.length > 0) {
		const events = pendingAuthMutations.splice(0);
		for (const event of events) event.agentDir = normalizeOptionalDir(event.agentDir);
		const entries = [];
		for (const owner of owners.values()) if (events.some((event) => event.affectsInheritedStores || owner.input.agentDir === event.agentDir || owner.input.inheritedAuthDir === event.agentDir)) entries.push({
			owner,
			input: owner.input
		});
		await publishPreparedModelRuntimeOwnerBatch({
			entries,
			owners,
			agentBuildCompletions,
			buildTimeoutMs: modelRuntimeBuildTimeoutMs
		});
	}
}
function invalidateForAuthMutation(event) {
	const normalizedEvent = {
		...event,
		agentDir: normalizeOptionalDir(event.agentDir)
	};
	const staleError = /* @__PURE__ */ new Error("prepared model runtime owner is stale after auth mutation");
	let invalidatedOwner = false;
	for (const owner of owners.values()) {
		if (!normalizedEvent.affectsInheritedStores && owner.input.agentDir !== normalizedEvent.agentDir && owner.input.inheritedAuthDir !== normalizedEvent.agentDir) continue;
		invalidatedOwner = true;
		owner.generation += 1;
		owner.needsRefresh = true;
		owner.refreshError = staleError;
	}
	if (!invalidatedOwner) return;
	pendingAuthMutations.push(normalizedEvent);
	enqueuePreparedModelRuntimePublication(drainPendingAuthMutations).catch((error) => {
		if (error instanceof PreparedModelRuntimePublicationSupersededError) return;
		log.warn(`auth-triggered model runtime refresh failed: ${String(error)}`);
	});
}
registerRuntimeAuthProfileStoreMutationListener(invalidateForAuthMutation);
function resetPreparedModelRuntimeSnapshotsForTest() {
	pendingModelRuntimeReplacement?.resolve();
	pendingModelRuntimeReplacement = void 0;
	owners.clear();
	agentBuildCompletions.clear();
	standaloneActivationTails.clear();
	retainedGatewayRunOwners.clear(owners);
	gatewayLifecycleActive = false;
	refreshTail = Promise.resolve();
	refreshRequestEpoch = 0;
	pendingAuthMutations.length = 0;
	modelRuntimeBuildTimeoutMs = DEFAULT_MODEL_RUNTIME_BUILD_TIMEOUT_MS;
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.preparedModelRuntimeTestApi")] = {
	resetPreparedModelRuntimeSnapshotsForTest,
	getPreparedModelRuntimeOwnerCountForTest: () => owners.size,
	setModelRuntimeBuildTimeoutMsForTest: (timeoutMs) => {
		modelRuntimeBuildTimeoutMs = timeoutMs;
	}
};
//#endregion
export { loadPreparedModelRuntimeSnapshot as a, publishPreparedModelRuntimeSnapshot as c, preparedModelRuntimeConfigsMatch as d, PreparedModelRuntimeOwnerNotPublishedError as f, getPreparedModelRuntimeSnapshot as i, refreshPreparedModelRuntimeSnapshots as l, acquireReadOnlyPreparedModelRuntime as n, markPreparedModelRuntimeSnapshotsStale as o, activateStandalonePreparedModelRuntime as r, prepareModelRuntimeSnapshot as s, acquireAgentRunPreparedModelRuntime as t, rejectPendingPreparedModelRuntimeReplacement as u };
