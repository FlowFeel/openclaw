import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { i as resolveGlobalSingleton } from "./global-singleton-Dc_stLtU.js";
import { s as resolveAgentContextLimits, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { t as createSubsystemLogger } from "./subsystem-Ess1Ww-N.js";
import { l as resolveMemorySearchSyncConfig } from "./config-utils-CIfwi7ve.js";
import { t as resolveMemoryBackendConfig } from "./backend-config-DlnaHa7G.js";
import "./error-runtime-Dbl9_3mW.js";
import "./routing-ofUAgwWc.js";
import "./memory-core-host-engine-foundation-C9wj4OCo.js";
import { r as resolveQmdBinaryUnavailableReason, t as checkQmdBinaryAvailability } from "./engine-qmd-Ci26YE_-.js";
import "./memory-core-host-engine-qmd-2OgG7BxA.js";
import "./memory-core-host-engine-storage-Bxl8QSwD.js";
import { a as resolveMemoryCoreLocalServiceHostIdentity } from "./manager-BVy_a-2k.js";
import { i as runMemorySearchWithDeadline, n as MEMORY_SEARCH_DEADLINE_CONTROL, t as DEFAULT_MEMORY_SEARCH_TIMEOUT_MS } from "./search-deadline-BtL8D_eO.js";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
//#region extensions/memory-core/src/memory/runtime-host.ts
const LEASE_HOST_IDENTITIES = resolveGlobalSingleton(Symbol.for("openclaw.memoryLeaseHostIdentities"), () => ({
	ids: /* @__PURE__ */ new WeakMap(),
	nextId: 1
}));
function resolveMemoryCoreLeaseHostIdentity(withLease) {
	if (!withLease) return "none";
	let id = LEASE_HOST_IDENTITIES.ids.get(withLease);
	if (id === void 0) {
		id = LEASE_HOST_IDENTITIES.nextId;
		LEASE_HOST_IDENTITIES.nextId += 1;
		LEASE_HOST_IDENTITIES.ids.set(withLease, id);
	}
	return String(id);
}
//#endregion
//#region extensions/memory-core/src/memory/search-manager.ts
const MEMORY_SEARCH_MANAGER_CACHE_KEY = Symbol.for("openclaw.memorySearchManagerCache");
const QMD_MANAGER_OPEN_FAILURE_COOLDOWN_MS = 6e4;
function createMemorySearchManagerCacheStore() {
	return {
		qmdManagerCache: /* @__PURE__ */ new Map(),
		pendingQmdManagerCreates: /* @__PURE__ */ new Map(),
		qmdManagerOpenFailures: /* @__PURE__ */ new Map(),
		retainedQmdManagers: /* @__PURE__ */ new Map(),
		scopeLifecycleTails: /* @__PURE__ */ new Map(),
		globalClosePromise: null
	};
}
function getMemorySearchManagerCacheStore() {
	const resolved = resolveGlobalSingleton(MEMORY_SEARCH_MANAGER_CACHE_KEY, createMemorySearchManagerCacheStore);
	if (typeof resolved === "object" && resolved !== null && resolved.qmdManagerCache instanceof Map && resolved.pendingQmdManagerCreates instanceof Map) {
		const cacheStore = resolved;
		if (!(cacheStore.qmdManagerOpenFailures instanceof Map)) cacheStore.qmdManagerOpenFailures = /* @__PURE__ */ new Map();
		if (!(cacheStore.scopeLifecycleTails instanceof Map)) cacheStore.scopeLifecycleTails = /* @__PURE__ */ new Map();
		if (!(cacheStore.retainedQmdManagers instanceof Map)) cacheStore.retainedQmdManagers = /* @__PURE__ */ new Map();
		if (cacheStore.globalClosePromise !== null && !(cacheStore.globalClosePromise instanceof Promise)) cacheStore.globalClosePromise = null;
		return cacheStore;
	}
	const repaired = createMemorySearchManagerCacheStore();
	globalThis[MEMORY_SEARCH_MANAGER_CACHE_KEY] = repaired;
	return repaired;
}
const log = createSubsystemLogger("memory");
const MEMORY_SEARCH_MANAGER_CACHE_STORE = getMemorySearchManagerCacheStore();
const { qmdManagerCache: QMD_MANAGER_CACHE, pendingQmdManagerCreates: PENDING_QMD_MANAGER_CREATES, qmdManagerOpenFailures: QMD_MANAGER_OPEN_FAILURES } = MEMORY_SEARCH_MANAGER_CACHE_STORE;
function retainQmdManagerForCleanup(scopeKey, manager) {
	const retained = MEMORY_SEARCH_MANAGER_CACHE_STORE.retainedQmdManagers.get(scopeKey) ?? /* @__PURE__ */ new Set();
	retained.add(manager);
	MEMORY_SEARCH_MANAGER_CACHE_STORE.retainedQmdManagers.set(scopeKey, retained);
}
function releaseRetainedQmdManager(scopeKey, manager) {
	const retained = MEMORY_SEARCH_MANAGER_CACHE_STORE.retainedQmdManagers.get(scopeKey);
	if (!retained) return;
	retained.delete(manager);
	if (retained.size === 0) MEMORY_SEARCH_MANAGER_CACHE_STORE.retainedQmdManagers.delete(scopeKey);
}
async function drainRetainedQmdManagers(scopeKey) {
	const retained = MEMORY_SEARCH_MANAGER_CACHE_STORE.retainedQmdManagers.get(scopeKey);
	if (!retained) return;
	let firstError;
	let closeFailed = false;
	for (const manager of retained) try {
		await manager.close?.();
		retained.delete(manager);
	} catch (err) {
		if (!closeFailed) firstError = err;
		closeFailed = true;
	}
	if (retained.size === 0) MEMORY_SEARCH_MANAGER_CACHE_STORE.retainedQmdManagers.delete(scopeKey);
	if (closeFailed) throw firstError;
}
async function runMemorySearchManagerScopeOperation(scopeKey, operation, options = {}) {
	while (MEMORY_SEARCH_MANAGER_CACHE_STORE.globalClosePromise) {
		const globalClose = MEMORY_SEARCH_MANAGER_CACHE_STORE.globalClosePromise;
		try {
			await globalClose;
		} catch {
			if (MEMORY_SEARCH_MANAGER_CACHE_STORE.globalClosePromise === globalClose) await closeAllMemorySearchManagers();
		}
	}
	const previous = MEMORY_SEARCH_MANAGER_CACHE_STORE.scopeLifecycleTails.get(scopeKey) ?? Promise.resolve();
	const run = async () => {
		if (options.drainRetained !== false) await drainRetainedQmdManagers(scopeKey);
		return await operation();
	};
	const result = previous.then(run, run);
	const tail = result.then(() => void 0, () => void 0);
	MEMORY_SEARCH_MANAGER_CACHE_STORE.scopeLifecycleTails.set(scopeKey, tail);
	try {
		return await result;
	} finally {
		if (MEMORY_SEARCH_MANAGER_CACHE_STORE.scopeLifecycleTails.get(scopeKey) === tail) MEMORY_SEARCH_MANAGER_CACHE_STORE.scopeLifecycleTails.delete(scopeKey);
	}
}
async function runMemorySearchManagerGlobalClose(operation) {
	const closePromise = (MEMORY_SEARCH_MANAGER_CACHE_STORE.globalClosePromise ?? Promise.resolve()).then(operation, operation);
	MEMORY_SEARCH_MANAGER_CACHE_STORE.globalClosePromise = closePromise;
	await closePromise;
	if (MEMORY_SEARCH_MANAGER_CACHE_STORE.globalClosePromise === closePromise) MEMORY_SEARCH_MANAGER_CACHE_STORE.globalClosePromise = null;
}
function retireQmdManagerInScope(scopeKey, manager) {
	retainQmdManagerForCleanup(scopeKey, manager);
	runMemorySearchManagerScopeOperation(scopeKey, async () => {
		await manager.close?.();
		releaseRetainedQmdManager(scopeKey, manager);
	}, { drainRetained: false }).catch((err) => {
		log.warn(`failed to retire qmd memory manager: ${formatErrorMessage(err)}`);
	});
}
const managerRuntimeLoader = createLazyRuntimeModule(() => import("./extensions/memory-core/manager-runtime.js"));
const loadManagerRuntime = managerRuntimeLoader;
const loadQmdManagerModule = createLazyRuntimeModule(() => import("./qmd-manager-CQE0Y-_E.js"));
function isClosedMemorySearchManager(manager) {
	const isClosed = Reflect.get(manager, "isClosed");
	return typeof isClosed === "function" && isClosed.call(manager) === true;
}
function getActiveQmdManagerOpenFailure(scopeKey, identityKey, nowMs = Date.now()) {
	const failure = QMD_MANAGER_OPEN_FAILURES.get(scopeKey);
	if (!failure) return null;
	if (failure.identityKey !== identityKey || failure.retryAfterMs <= nowMs) {
		QMD_MANAGER_OPEN_FAILURES.delete(scopeKey);
		return null;
	}
	return failure;
}
function recordQmdManagerOpenFailure(scopeKey, identityKey, reason, nowMs = Date.now()) {
	QMD_MANAGER_OPEN_FAILURES.set(scopeKey, {
		identityKey,
		reason,
		retryAfterMs: nowMs + QMD_MANAGER_OPEN_FAILURE_COOLDOWN_MS
	});
}
function clearQmdManagerOpenFailure(scopeKey, identityKey) {
	if (QMD_MANAGER_OPEN_FAILURES.get(scopeKey)?.identityKey === identityKey) QMD_MANAGER_OPEN_FAILURES.delete(scopeKey);
}
function hashQmdManagerIdentity(identityKey) {
	return createHash("sha256").update(identityKey).digest("hex");
}
function applyManagerDebug(result, debug) {
	if (result.debug && Object.keys(result.debug).length > 0 && Object.keys(debug).length === 0) return result;
	return {
		...result,
		debug: {
			...result.debug,
			...debug
		}
	};
}
async function getMemorySearchManager(params) {
	return await runMemorySearchManagerScopeOperation(buildQmdManagerScopeKey(normalizeAgentId(params.agentId)), async () => await getMemorySearchManagerWithinLifecycle(params), { drainRetained: resolveMemoryBackendConfig(params).backend === "qmd" });
}
async function getMemorySearchManagerWithinLifecycle(params) {
	const acquireStartedAt = Date.now();
	const purpose = params.purpose ?? "default";
	const finish = (result, debug) => applyManagerDebug(result, {
		purpose,
		managerMs: Math.max(0, Date.now() - acquireStartedAt),
		...debug
	});
	const resolved = resolveMemoryBackendConfig(params);
	if (resolved.backend === "qmd" && resolved.qmd) {
		const qmdResolved = resolved.qmd;
		const normalizedAgentId = normalizeAgentId(params.agentId);
		const runtimeConfig = resolveQmdManagerRuntimeConfig(params.cfg, normalizedAgentId);
		const { workspaceDir } = runtimeConfig;
		const transient = params.purpose === "status" || params.purpose === "cli";
		const scopeKey = buildQmdManagerScopeKey(normalizedAgentId);
		const identityKey = buildQmdManagerIdentityKey(normalizedAgentId, qmdResolved, runtimeConfig, params.acquireLocalService, params.withLease);
		const debugIdentityHash = hashQmdManagerIdentity(identityKey);
		const createPrimaryQmdManager = async (mode) => {
			if (!params.withLease) {
				const message = "memory-core host does not provide SQLite lease coordination";
				log.warn(`qmd memory unavailable; falling back to builtin: ${message}`);
				return {
					manager: null,
					failureReason: `qmd memory unavailable: ${message}`
				};
			}
			try {
				await fs.mkdir(workspaceDir, { recursive: true });
			} catch (err) {
				const message = formatErrorMessage(err);
				log.warn(`qmd workspace unavailable (${workspaceDir}); falling back to builtin: ${message}`);
				return {
					manager: null,
					failureReason: `qmd workspace unavailable (${workspaceDir}): ${message}`
				};
			}
			const qmdBinary = await checkQmdBinaryAvailability({
				command: qmdResolved.command,
				env: process.env,
				cwd: workspaceDir
			});
			if (!qmdBinary.available) {
				const message = qmdBinary.error;
				const failurePrefix = resolveQmdBinaryUnavailableReason(qmdBinary) === "workspace-cwd" ? `qmd workspace unavailable (${workspaceDir})` : `qmd binary unavailable (${qmdResolved.command})`;
				log.warn(`${failurePrefix}; falling back to builtin: ${message}`);
				return {
					manager: null,
					failureReason: `${failurePrefix}: ${message}`
				};
			}
			try {
				const { QmdMemoryManager } = await loadQmdManagerModule();
				const primary = await QmdMemoryManager.create({
					cfg: params.cfg,
					agentId: normalizedAgentId,
					resolved: {
						...resolved,
						qmd: qmdResolved
					},
					mode,
					runtimeConfig,
					withLease: params.withLease
				});
				if (primary) {
					clearQmdManagerOpenFailure(scopeKey, identityKey);
					return { manager: primary };
				}
			} catch (err) {
				const message = formatErrorMessage(err);
				log.warn(`qmd memory unavailable; falling back to builtin: ${message}`);
				return {
					manager: null,
					failureReason: `qmd memory unavailable: ${message}`
				};
			}
			return {
				manager: null,
				failureReason: "qmd memory unavailable: no manager returned"
			};
		};
		const createFullQmdManager = async (expectedIdentityKey) => {
			const { manager: primary, failureReason } = await createPrimaryQmdManager("full");
			if (!primary) return {
				entry: null,
				failureReason
			};
			const cacheEntry = {
				identityKey: expectedIdentityKey,
				manager: new FallbackMemoryManager({
					primary,
					retirePrimary: () => retireQmdManagerInScope(scopeKey, primary),
					fallbackFactory: async () => {
						const { MemoryIndexManager } = await loadManagerRuntime();
						return await MemoryIndexManager.get(params);
					}
				}, () => {
					if (QMD_MANAGER_CACHE.get(scopeKey) === cacheEntry) QMD_MANAGER_CACHE.delete(scopeKey);
				})
			};
			return { entry: cacheEntry };
		};
		let cached = QMD_MANAGER_CACHE.get(scopeKey);
		if (cached && isClosedMemorySearchManager(cached.manager)) {
			await cached.manager.close?.();
			if (QMD_MANAGER_CACHE.get(scopeKey) === cached) QMD_MANAGER_CACHE.delete(scopeKey);
			cached = void 0;
		}
		if (cached?.identityKey === identityKey && cached) {
			if (params.purpose === "status") return finish({ manager: new BorrowedMemoryManager(cached.manager) }, {
				backend: "qmd",
				managerCacheState: "cached-full-hit",
				qmdIdentityHash: debugIdentityHash
			});
			if (params.purpose !== "cli") return finish({ manager: cached.manager }, {
				backend: "qmd",
				managerCacheState: "cached-full-hit",
				qmdIdentityHash: debugIdentityHash
			});
		}
		if (transient) {
			const { manager, failureReason } = await createPrimaryQmdManager(params.purpose === "cli" ? "cli" : "status");
			return manager ? finish({ manager }, {
				backend: "qmd",
				managerCacheState: params.purpose === "cli" ? "transient-cli" : "transient-status",
				qmdIdentityHash: debugIdentityHash
			}) : finish(await getBuiltinMemorySearchManagerAfterQmdFailure(params, failureReason), {
				backend: "qmd",
				managerCacheState: "fallback-builtin",
				qmdIdentityHash: debugIdentityHash,
				failureCode: "qmd-unavailable"
			});
		}
		const recentFailure = getActiveQmdManagerOpenFailure(scopeKey, identityKey);
		if (recentFailure) {
			log.debug?.(`qmd memory unavailable; using builtin during cooldown: ${recentFailure.reason}`);
			return finish(await getBuiltinMemorySearchManagerAfterQmdFailure(params, recentFailure.reason), {
				backend: "qmd",
				managerCacheState: "recent-failure-cooldown",
				qmdIdentityHash: debugIdentityHash,
				failureCode: "qmd-unavailable"
			});
		}
		const pending = PENDING_QMD_MANAGER_CREATES.get(scopeKey);
		if (pending) {
			await pending.promise;
			return finish(await getMemorySearchManagerWithinLifecycle(params), {
				backend: "qmd",
				managerCacheState: "pending-create-wait",
				qmdIdentityHash: debugIdentityHash
			});
		}
		let pendingFailureReason;
		const pendingCreate = {
			identityKey,
			promise: (async () => {
				const created = await createFullQmdManager(identityKey);
				if (!created.entry) {
					pendingFailureReason = created.failureReason ?? "qmd memory unavailable";
					recordQmdManagerOpenFailure(scopeKey, identityKey, pendingFailureReason);
					return null;
				}
				if (cached) try {
					await closeQmdManagerForReplacement(cached.manager);
				} catch (err) {
					retainQmdManagerForCleanup(scopeKey, created.entry.manager);
					try {
						await created.entry.manager.close?.();
						releaseRetainedQmdManager(scopeKey, created.entry.manager);
					} catch (closeErr) {
						log.warn(`failed to close unused qmd memory manager: ${formatErrorMessage(closeErr)}`);
					}
					throw err;
				}
				QMD_MANAGER_CACHE.set(scopeKey, created.entry);
				return created.entry.manager;
			})().finally(() => {
				if (PENDING_QMD_MANAGER_CREATES.get(scopeKey) === pendingCreate) PENDING_QMD_MANAGER_CREATES.delete(scopeKey);
			})
		};
		PENDING_QMD_MANAGER_CREATES.set(scopeKey, pendingCreate);
		const manager = await pendingCreate.promise;
		return manager ? finish({ manager }, {
			backend: "qmd",
			managerCacheState: "cached-full-miss",
			qmdIdentityHash: debugIdentityHash
		}) : finish(await getBuiltinMemorySearchManagerAfterQmdFailure(params, pendingFailureReason), {
			backend: "qmd",
			managerCacheState: "fallback-builtin",
			qmdIdentityHash: debugIdentityHash,
			failureCode: "qmd-unavailable"
		});
	}
	return finish(await getBuiltinMemorySearchManager(params), { backend: "builtin" });
}
async function getBuiltinMemorySearchManagerAfterQmdFailure(params, qmdFailureReason) {
	const fallback = await getBuiltinMemorySearchManager(params);
	if (fallback.manager || !qmdFailureReason) return fallback;
	const fallbackError = fallback.error?.trim();
	return {
		manager: null,
		error: fallbackError ? `${qmdFailureReason}; builtin fallback unavailable: ${fallbackError}` : qmdFailureReason
	};
}
async function getBuiltinMemorySearchManager(params) {
	try {
		const { MemoryIndexManager } = await loadManagerRuntime();
		return { manager: await MemoryIndexManager.get(params) };
	} catch (err) {
		return {
			manager: null,
			error: formatErrorMessage(err)
		};
	}
}
var BorrowedMemoryManager = class {
	constructor(inner) {
		this.inner = inner;
		if (inner.probeVectorStoreAvailability) {
			const probeVectorStoreAvailability = inner.probeVectorStoreAvailability.bind(inner);
			this.probeVectorStoreAvailability = async () => await probeVectorStoreAvailability();
		}
	}
	async search(query, opts) {
		return await this.inner.search(query, opts);
	}
	async readFile(params) {
		return await this.inner.readFile(params);
	}
	async listCuratedProjectCandidates(opts) {
		return await this.inner.listCuratedProjectCandidates?.(opts) ?? [];
	}
	status() {
		return this.inner.status();
	}
	async sync(params) {
		await this.inner.sync?.(params);
	}
	async probeEmbeddingAvailability() {
		return await this.inner.probeEmbeddingAvailability();
	}
	getCachedEmbeddingAvailability() {
		return this.inner.getCachedEmbeddingAvailability?.() ?? null;
	}
	async probeVectorAvailability() {
		return await this.inner.probeVectorAvailability();
	}
	async close() {}
};
async function closeAllMemorySearchManagers() {
	await runMemorySearchManagerGlobalClose(closeAllMemorySearchManagersWithinLifecycle);
}
async function closeAllMemorySearchManagersWithinLifecycle() {
	const scopeTails = Array.from(MEMORY_SEARCH_MANAGER_CACHE_STORE.scopeLifecycleTails.values());
	if (scopeTails.length > 0) await Promise.allSettled(scopeTails);
	const pendingCreates = Array.from(PENDING_QMD_MANAGER_CREATES.values(), (entry) => entry.promise);
	await Promise.allSettled(pendingCreates);
	const entries = Array.from(QMD_MANAGER_CACHE.entries());
	QMD_MANAGER_OPEN_FAILURES.clear();
	let firstError;
	let closeFailed = false;
	for (const scopeKey of Array.from(MEMORY_SEARCH_MANAGER_CACHE_STORE.retainedQmdManagers.keys())) try {
		await drainRetainedQmdManagers(scopeKey);
	} catch (err) {
		if (!closeFailed) firstError = err;
		closeFailed = true;
	}
	for (const [scopeKey, entry] of entries) try {
		await entry.manager.close?.();
		if (QMD_MANAGER_CACHE.get(scopeKey) === entry) QMD_MANAGER_CACHE.delete(scopeKey);
	} catch (err) {
		if (!closeFailed) firstError = err;
		closeFailed = true;
		log.warn(`failed to close qmd memory manager: ${String(err)}`);
	}
	if (managerRuntimeLoader.peek()) try {
		const { closeAllMemoryIndexManagers } = await loadManagerRuntime();
		await closeAllMemoryIndexManagers();
	} catch (err) {
		if (!closeFailed) firstError = err;
		closeFailed = true;
	}
	if (closeFailed) throw firstError;
}
async function closeMemorySearchManager(params) {
	await runMemorySearchManagerScopeOperation(buildQmdManagerScopeKey(normalizeAgentId(params.agentId)), async () => await closeMemorySearchManagerWithinLifecycle(params), { drainRetained: false });
}
async function closeMemorySearchManagerWithinLifecycle(params) {
	const normalizedAgentId = normalizeAgentId(params.agentId);
	const scopeKey = buildQmdManagerScopeKey(normalizedAgentId);
	let closeError;
	let closeFailed = false;
	try {
		await drainRetainedQmdManagers(scopeKey);
	} catch (err) {
		closeError = err;
		closeFailed = true;
	}
	const pending = PENDING_QMD_MANAGER_CREATES.get(scopeKey);
	if (pending) await Promise.allSettled([pending.promise]);
	const cached = QMD_MANAGER_CACHE.get(scopeKey);
	if (cached) try {
		await cached.manager.close?.();
		if (QMD_MANAGER_CACHE.get(scopeKey) === cached) QMD_MANAGER_CACHE.delete(scopeKey);
		QMD_MANAGER_OPEN_FAILURES.delete(scopeKey);
	} catch (err) {
		closeError = err;
		closeFailed = true;
		log.warn(`failed to close qmd memory manager for agent ${normalizedAgentId}: ${String(err)}`);
	}
	if (managerRuntimeLoader.peek()) try {
		const { closeMemoryIndexManagersForAgent } = await loadManagerRuntime();
		await closeMemoryIndexManagersForAgent({
			cfg: params.cfg,
			agentId: normalizedAgentId
		});
	} catch (err) {
		if (!closeFailed) closeError = err;
		closeFailed = true;
	}
	if (closeFailed) throw closeError;
}
var FallbackMemoryManager = class {
	constructor(deps, onClose) {
		this.deps = deps;
		this.onClose = onClose;
		this.fallback = null;
		this.fallbackInitPromise = null;
		this.primaryFailed = false;
		this.cacheEvicted = false;
		this.closed = false;
		this.closePromise = null;
		this.closeReason = "memory search manager is closed";
	}
	async search(query, opts) {
		this.ensureOpen();
		if (!this.primaryFailed) try {
			return await this.deps.primary.search(query, opts);
		} catch (err) {
			if (opts?.signal?.aborted) throw err;
			this.primaryFailed = true;
			this.lastError = formatErrorMessage(err);
			log.warn(`qmd memory failed; switching to builtin index: ${this.lastError}`);
			this.deps.retirePrimary();
			this.evictCacheEntry();
		}
		opts?.[MEMORY_SEARCH_DEADLINE_CONTROL]?.("handoff");
		opts?.onDebug?.({ backend: "builtin" });
		return await runMemorySearchWithDeadline({
			timeoutMs: DEFAULT_MEMORY_SEARCH_TIMEOUT_MS,
			parentSignal: opts?.signal,
			run: async (signal) => {
				const fallback = await this.ensureFallback();
				if (!fallback) throw new Error(this.lastError ?? "memory search unavailable");
				return await fallback.search(query, {
					...opts,
					signal
				});
			}
		});
	}
	async readFile(params) {
		this.ensureOpen();
		if (!this.primaryFailed) return await this.deps.primary.readFile(params);
		const fallback = await this.ensureFallback();
		if (fallback) return await fallback.readFile(params);
		throw new Error(this.lastError ?? "memory read unavailable");
	}
	async listCuratedProjectCandidates(opts) {
		this.ensureOpen();
		if (!this.primaryFailed && this.deps.primary.listCuratedProjectCandidates) try {
			return await this.deps.primary.listCuratedProjectCandidates(opts);
		} catch (err) {
			this.primaryFailed = true;
			this.lastError = formatErrorMessage(err);
			log.warn(`qmd memory failed; switching to builtin index: ${this.lastError}`);
			this.deps.retirePrimary();
			this.evictCacheEntry();
		}
		return await (await this.ensureFallback())?.listCuratedProjectCandidates?.(opts) ?? [];
	}
	status() {
		this.ensureOpen();
		if (!this.primaryFailed) return this.deps.primary.status();
		const fallbackStatus = this.fallback?.status() ?? this.deps.primary.status();
		const fallbackInfo = {
			from: "qmd",
			reason: this.lastError ?? "unknown"
		};
		return {
			...fallbackStatus,
			fallback: fallbackInfo,
			custom: {
				...fallbackStatus.custom,
				fallback: {
					disabled: true,
					reason: this.lastError ?? "unknown"
				}
			}
		};
	}
	async sync(params) {
		this.ensureOpen();
		if (!this.primaryFailed) {
			await this.deps.primary.sync?.(params);
			return;
		}
		await (await this.ensureFallback())?.sync?.(params);
	}
	async probeEmbeddingAvailability() {
		this.ensureOpen();
		if (!this.primaryFailed) return await this.deps.primary.probeEmbeddingAvailability();
		const fallback = await this.ensureFallback();
		if (fallback) return await fallback.probeEmbeddingAvailability();
		return {
			ok: false,
			error: this.lastError ?? "memory embeddings unavailable"
		};
	}
	getCachedEmbeddingAvailability() {
		this.ensureOpen();
		if (!this.primaryFailed) return this.deps.primary.getCachedEmbeddingAvailability?.() ?? null;
		return this.fallback?.getCachedEmbeddingAvailability?.() ?? null;
	}
	async probeVectorStoreAvailability() {
		this.ensureOpen();
		if (!this.primaryFailed) return await (this.deps.primary.probeVectorStoreAvailability?.() ?? this.deps.primary.probeVectorAvailability());
		const fallback = await this.ensureFallback();
		return await (fallback?.probeVectorStoreAvailability?.() ?? fallback?.probeVectorAvailability()) ?? false;
	}
	async probeVectorAvailability() {
		this.ensureOpen();
		if (!this.primaryFailed) return await this.deps.primary.probeVectorAvailability();
		return await (await this.ensureFallback())?.probeVectorAvailability() ?? false;
	}
	async close() {
		const existingClose = this.closePromise;
		if (existingClose) {
			await existingClose;
			return;
		}
		const closeOperation = this.closeOnce();
		this.closePromise = closeOperation;
		try {
			await closeOperation;
		} catch (err) {
			if (this.closePromise === closeOperation) this.closePromise = null;
			throw err;
		}
	}
	async closeOnce() {
		this.closed = true;
		const pendingFallback = this.fallbackInitPromise;
		await this.deps.primary.close?.();
		await pendingFallback;
		await this.fallback?.close?.();
		this.fallback = null;
		this.evictCacheEntry();
	}
	async invalidate(reason) {
		this.closeReason = reason;
		await this.close();
	}
	async ensureFallback() {
		this.ensureOpen();
		if (this.fallback) return this.fallback;
		const pending = this.fallbackInitPromise;
		if (pending) {
			const fallback = await pending;
			this.ensureOpen();
			return fallback;
		}
		const initialization = (async () => {
			let fallback;
			try {
				fallback = await this.deps.fallbackFactory();
				if (!fallback) {
					log.warn("memory fallback requested but builtin index is unavailable");
					return null;
				}
			} catch (err) {
				const message = formatErrorMessage(err);
				log.warn(`memory fallback unavailable: ${message}`);
				return null;
			}
			this.fallback = fallback;
			if (this.closed) {
				await fallback.close?.();
				if (this.fallback === fallback) this.fallback = null;
				return null;
			}
			return fallback;
		})();
		this.fallbackInitPromise = initialization;
		try {
			const fallback = await initialization;
			this.ensureOpen();
			return fallback;
		} finally {
			if (this.fallbackInitPromise === initialization) this.fallbackInitPromise = null;
		}
	}
	ensureOpen() {
		if (this.closed) throw new Error(this.closeReason);
	}
	isClosed() {
		return this.closed;
	}
	evictCacheEntry() {
		if (this.cacheEvicted) return;
		this.cacheEvicted = true;
		this.onClose?.();
	}
};
async function closeQmdManagerForReplacement(manager) {
	if (manager instanceof FallbackMemoryManager) {
		await manager.invalidate("memory search manager was replaced by a newer qmd manager");
		return;
	}
	await manager.close?.();
}
function buildQmdManagerScopeKey(agentId) {
	return agentId;
}
function buildQmdManagerIdentityKey(agentId, config, runtimeConfig, acquireLocalService, withLease) {
	const localServiceHostId = resolveMemoryCoreLocalServiceHostIdentity(acquireLocalService);
	const leaseHostId = resolveMemoryCoreLeaseHostIdentity(withLease);
	return `${agentId}:${JSON.stringify(config)}:${JSON.stringify(runtimeConfig.syncSettings ?? null)}:${JSON.stringify(runtimeConfig.contextLimits ?? null)}:${runtimeConfig.workspaceDir}:${localServiceHostId}:${leaseHostId}`;
}
function resolveQmdManagerRuntimeConfig(cfg, agentId) {
	return {
		workspaceDir: resolveAgentWorkspaceDir(cfg, agentId),
		syncSettings: resolveMemorySearchSyncConfig(cfg, agentId),
		contextLimits: resolveAgentContextLimits(cfg, agentId)
	};
}
//#endregion
export { closeMemorySearchManager as n, getMemorySearchManager as r, closeAllMemorySearchManagers as t };
