import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { f as resolveDefaultAgentId, i as listAgentIds } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { t as createSubsystemLogger } from "./subsystem-Ess1Ww-N.js";
import { d as getActivePluginRegistry, k as getPluginRuntimeGatewayRequestScope } from "./runtime-WkCmQTS9.js";
import { _ as getPluginRegistryRuntime } from "./loader-CT1KBBu5.js";
import "./agent-scope-DyEposw2.js";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { t as INTERNAL_MESSAGE_CHANNEL } from "./message-channel-constants-76XnXM8q.js";
import { i as resolveStoredSessionKeyForAgentStore } from "./session-store-key-DmGCpash.js";
import { nt as listSqliteSessionEntriesReadOnly } from "./session-accessor.sqlite-CtCo5VZ6.js";
import "./session-accessor-D5Or7WgI.js";
import { Jn as validateSessionsCatalogArchiveParams, Xn as validateSessionsCatalogListParams, Yn as validateSessionsCatalogContinueParams, Zn as validateSessionsCatalogReadParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { p as recordSessionStateEvent } from "./session-state-events-COmXZrBv.js";
import { a as upsertSessionUpstreamLink } from "./session-upstream-links-UhsYefUG.js";
import { _ as createConversationBindingRecord, a as buildPluginBindingIdentity, b as unbindConversationBindingRecord, t as bindConversationNow, v as resolveConversationBindingRecord } from "./conversation-binding-BN-i7DFo.js";
import { n as projectSessionActor } from "./session-utils-row-Br8x7LNG.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as resolveAgentIdOrRespondError } from "./agent-id-shared-BJBtOhUA.js";
import crypto from "node:crypto";
//#region src/plugins/session-conversation-binding.ts
const log = createSubsystemLogger("plugins/binding");
const pluginSessionBindQueue = new KeyedAsyncQueue();
/** Binds a plugin-owned runtime to one authenticated Control UI session. */
async function bindPluginSessionConversation(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) throw new Error("session key is required for a plugin session binding");
	return await pluginSessionBindQueue.enqueue(sessionKey, async () => bindPluginSessionConversationExclusive({
		...params,
		sessionKey
	}));
}
async function bindPluginSessionConversationExclusive(params) {
	const sessionKey = params.sessionKey;
	const conversation = {
		channel: INTERNAL_MESSAGE_CHANNEL,
		accountId: "default",
		conversationId: sessionKey
	};
	const previous = resolveConversationBindingRecord(conversation);
	const bindingAttemptId = crypto.randomUUID();
	const binding = await bindConversationNow({
		identity: buildPluginBindingIdentity(params),
		conversation,
		targetSessionKey: sessionKey,
		summary: params.binding.summary,
		detachHint: params.binding.detachHint,
		data: params.binding.data,
		bindingAttemptId
	});
	try {
		await params.afterBind?.();
		return binding;
	} catch (error) {
		const current = resolveConversationBindingRecord(conversation);
		if (current?.metadata?.bindingAttemptId !== bindingAttemptId) throw error;
		try {
			await unbindConversationBindingRecord({
				bindingId: current.bindingId,
				reason: "plugin-session-bind-rollback"
			});
			if (previous && (previous.expiresAt === void 0 || previous.expiresAt > Date.now())) await createConversationBindingRecord({
				targetSessionKey: previous.targetSessionKey,
				targetKind: previous.targetKind,
				conversation: previous.conversation,
				placement: "current",
				metadata: previous.metadata,
				...previous.expiresAt === void 0 ? {} : { ttlMs: Math.max(1, previous.expiresAt - Date.now()) }
			});
		} catch (rollbackError) {
			log.warn("plugin session binding finalization failed before rollback", { error });
			throw new Error("plugin session binding finalization failed and its previous binding could not be restored", { cause: rollbackError });
		}
		throw error;
	}
}
//#endregion
//#region src/gateway/server-methods/session-catalog-entry-snapshot.ts
function createSessionCatalogRequestEntrySnapshot(params) {
	const entriesByAgentId = /* @__PURE__ */ new Map();
	const entryIndexByAgentId = /* @__PURE__ */ new Map();
	const actorBySessionKey = /* @__PURE__ */ new Map();
	let catalogEntries;
	const entriesForAgent = (rawAgentId) => {
		const agentId = normalizeAgentId(rawAgentId);
		if (!entriesByAgentId.has(agentId)) entriesByAgentId.set(agentId, listSqliteSessionEntriesReadOnly({
			agentId,
			clone: false,
			projection: "list"
		}));
		return entriesByAgentId.get(agentId) ?? [];
	};
	const entriesForCatalog = () => {
		if (catalogEntries) return catalogEntries;
		const defaultAgentId = resolveDefaultAgentId(params.cfg);
		catalogEntries = [defaultAgentId, ...listAgentIds(params.cfg).filter((agentId) => agentId !== defaultAgentId)].flatMap((agentId) => entriesForAgent(agentId).map((entry) => Object.assign({}, entry, { agentId })));
		return catalogEntries;
	};
	const entryIndexForAgent = (agentId) => {
		const normalizedAgentId = normalizeAgentId(agentId);
		const cached = entryIndexByAgentId.get(normalizedAgentId);
		if (cached) return cached;
		const index = new Map(entriesForAgent(normalizedAgentId).map(({ sessionKey, entry }) => [sessionKey, entry]));
		entryIndexByAgentId.set(normalizedAgentId, index);
		return index;
	};
	const createdActorForSession = (sessionKey) => {
		if (actorBySessionKey.has(sessionKey)) return actorBySessionKey.get(sessionKey);
		const agentId = resolveAgentIdFromSessionKey(sessionKey, params.fallbackAgentId);
		const index = entryIndexForAgent(agentId);
		const canonicalKey = resolveStoredSessionKeyForAgentStore({
			cfg: params.cfg,
			agentId,
			sessionKey
		});
		const candidates = /* @__PURE__ */ new Set([sessionKey, canonicalKey]);
		let freshest;
		for (const key of candidates) {
			const entry = index.get(key);
			if (entry && (!freshest || (entry.updatedAt ?? 0) > (freshest.updatedAt ?? 0))) freshest = entry;
		}
		const actor = projectSessionActor(freshest?.createdActor);
		actorBySessionKey.set(sessionKey, actor);
		return actor;
	};
	return {
		sessionEntries: {
			entriesForAgent,
			entriesForCatalog
		},
		projectHostCreatedActors: (host) => ({
			...host,
			sessions: host.sessions.map(({ createdActor: _providerCreatedActor, ...session }) => {
				const createdActor = session.sessionKey ? createdActorForSession(session.sessionKey) : void 0;
				return createdActor ? {
					...session,
					createdActor
				} : session;
			})
		})
	};
}
//#endregion
//#region src/gateway/server-methods/session-catalog-list-admission.ts
var SessionCatalogListBusyError = class extends Error {
	constructor(maxConcurrent, maxQueued) {
		super(`session catalog is busy (${maxConcurrent} active, ${maxQueued} queued); retry shortly`);
		this.code = "catalog_busy";
		this.name = "SessionCatalogListBusyError";
	}
};
var SessionCatalogListAdmission = class {
	constructor(maxConcurrent, maxQueued) {
		this.maxConcurrent = maxConcurrent;
		this.maxQueued = maxQueued;
		this.active = 0;
		this.queue = [];
		if (!Number.isInteger(maxConcurrent) || maxConcurrent < 1) throw new Error("maxConcurrent must be a positive integer");
		if (!Number.isInteger(maxQueued) || maxQueued < 0) throw new Error("maxQueued must be a non-negative integer");
	}
	run(task) {
		if (this.active < this.maxConcurrent) return this.start(task);
		if (this.queue.length >= this.maxQueued) return Promise.reject(new SessionCatalogListBusyError(this.maxConcurrent, this.maxQueued));
		return new Promise((resolve, reject) => {
			this.queue.push({ start: () => {
				this.start(task).then(resolve, reject);
			} });
		});
	}
	async start(task) {
		this.active += 1;
		try {
			return await task();
		} finally {
			this.active -= 1;
			this.drain();
		}
	}
	drain() {
		while (this.active < this.maxConcurrent) {
			const next = this.queue.shift();
			if (!next) return;
			next.start();
		}
	}
};
//#endregion
//#region src/gateway/server-methods/session-catalog.ts
const SESSION_CATALOG_SEARCH_MAX_UTF16_UNITS = 500;
const SESSION_CATALOG_SHARE_WINDOW_MS = 3e3;
const SESSION_CATALOG_LIST_CACHE_MAX_ENTRIES = 128;
const sessionCatalogListAdmission = new SessionCatalogListAdmission(4, 32);
function createSessionCatalogRequestNodeSnapshot() {
	const registry = resolveSessionCatalogRegistry();
	const nodes = registry ? getPluginRegistryRuntime(registry)?.nodes : void 0;
	let request;
	return () => {
		request ??= nodes?.list() ?? Promise.reject(/* @__PURE__ */ new Error("Plugin node runtime is only available inside the Gateway."));
		return request;
	};
}
function normalizeSessionCatalogSearch(search) {
	const normalized = normalizeOptionalString(search);
	return normalized ? truncateUtf16Safe(normalized, SESSION_CATALOG_SEARCH_MAX_UTF16_UNITS) : void 0;
}
function catalogError(error) {
	const record = error && typeof error === "object" ? error : void 0;
	const recordMessage = typeof record?.message === "string" ? record.message.trim() : "";
	const fallbackMessage = typeof error === "string" ? error.trim() : "";
	return {
		code: typeof record?.code === "string" && record.code ? record.code : "catalog_error",
		message: recordMessage || fallbackMessage || "session catalog provider failed"
	};
}
let cachedCatalogRegistrations;
function resolveSessionCatalogRegistry() {
	return getPluginRuntimeGatewayRequestScope()?.pluginRegistry ?? getActivePluginRegistry();
}
function catalogRegistrationSnapshot() {
	const registry = resolveSessionCatalogRegistry();
	const source = registry?.sessionCatalogs;
	if (cachedCatalogRegistrations?.registry === registry && cachedCatalogRegistrations.source === source) return cachedCatalogRegistrations;
	const sortedRegistrations = (source ?? []).toSorted((left, right) => left.provider.id.localeCompare(right.provider.id));
	cachedCatalogRegistrations = {
		registry,
		source,
		registrations: sortedRegistrations,
		providers: sortedRegistrations.map((entry) => entry.provider)
	};
	return cachedCatalogRegistrations;
}
function providers() {
	return catalogRegistrationSnapshot().providers;
}
function resolveSessionCatalogProvider(catalogId) {
	return providers().find((candidate) => candidate.id === catalogId);
}
function registrations() {
	return catalogRegistrationSnapshot().registrations;
}
const providerCreateTargetsByConfig = /* @__PURE__ */ new WeakMap();
const catalogListsByConfig = /* @__PURE__ */ new WeakMap();
function providerCreateTargetCache(config, provider) {
	let byProvider = providerCreateTargetsByConfig.get(config);
	if (!byProvider) {
		byProvider = /* @__PURE__ */ new WeakMap();
		providerCreateTargetsByConfig.set(config, byProvider);
	}
	let byAgent = byProvider.get(provider);
	if (!byAgent) {
		byAgent = /* @__PURE__ */ new Map();
		byProvider.set(provider, byAgent);
	}
	return byAgent;
}
function resolveProviderCreateTarget(provider, agentId, config) {
	const cache = providerCreateTargetCache(config, provider);
	const cached = cache.get(agentId);
	if (cached) return cached;
	let resolution;
	try {
		const target = provider.resolveCreateSession?.({ agentId });
		const model = target?.model.trim();
		const agentRuntime = target?.agentRuntime.trim();
		resolution = model && agentRuntime ? {
			ok: true,
			target: {
				model,
				agentRuntime
			}
		} : {
			ok: false,
			message: `session catalog ${provider.id} cannot create sessions`
		};
	} catch (error) {
		return {
			ok: false,
			message: catalogError(error).message
		};
	}
	cache.set(agentId, resolution);
	return resolution;
}
/** Resolves a catalog-owned create target at the start of sessions.create. */
function resolveSessionCatalogCreateTarget(catalogId, agentId, config) {
	const registration = registrations().find((entry) => entry.provider.id === catalogId);
	if (!registration) return {
		ok: false,
		message: `unknown session catalog: ${catalogId}`,
		unknownCatalog: true
	};
	const resolved = resolveProviderCreateTarget(registration.provider, agentId, config);
	return resolved.ok ? {
		ok: true,
		target: {
			...resolved.target,
			pluginOwnerId: registration.pluginId
		}
	} : resolved;
}
function sessionCatalogListKey(params) {
	const cursors = params.request.cursors ? Object.entries(params.request.cursors).toSorted(([left], [right]) => left.localeCompare(right)) : null;
	return JSON.stringify([
		params.agentId,
		params.request.catalogId ?? null,
		params.search ?? null,
		params.request.limitPerHost ?? null,
		params.request.hostIds ?? null,
		cursors
	]);
}
function catalogListCache(config, registrationSnapshot) {
	let state = catalogListsByConfig.get(config);
	if (!state || state.registrations !== registrationSnapshot) {
		state = {
			registrations: registrationSnapshot,
			entries: /* @__PURE__ */ new Map()
		};
		catalogListsByConfig.set(config, state);
	}
	return state.entries;
}
function providerOrRespond(catalogId, respond) {
	const provider = resolveSessionCatalogProvider(catalogId);
	if (!provider) respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unknown session catalog: ${catalogId}`));
	return provider;
}
function registrationOrRespond(catalogId, respond) {
	const registration = registrations().find((candidate) => candidate.provider.id === catalogId);
	if (!registration) respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unknown session catalog: ${catalogId}`));
	return registration;
}
function catalogResult(provider, hosts, error, createSession) {
	const result = {
		id: provider.id,
		label: provider.label,
		capabilities: {
			continueSession: Boolean(provider.continueSession),
			archive: Boolean(provider.archive),
			...provider.openTerminal ? { openTerminal: true } : {},
			...createSession ? { createSession } : {}
		},
		hosts
	};
	if (error) result.error = error;
	return result;
}
const sessionCatalogHandlers = {
	"sessions.catalog.list": async ({ params, respond, context, client }) => {
		if (!assertValidParams(params, validateSessionsCatalogListParams, "sessions.catalog.list", respond)) return;
		const request = params;
		if (request.cursors !== void 0 && request.catalogId === void 0) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "catalogId is required when cursors are provided"));
			return;
		}
		const catalogRegistrations = catalogRegistrationSnapshot();
		let selected;
		if (request.catalogId) {
			const provider = catalogRegistrations.providers.find((candidate) => candidate.id === request.catalogId);
			if (!provider) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unknown session catalog: ${request.catalogId}`));
				return;
			}
			selected = [provider];
		} else selected = catalogRegistrations.providers;
		const config = context.getRuntimeConfig();
		const resolvedAgent = resolveAgentIdOrRespondError({
			rawAgentId: request.agentId,
			respond,
			cfg: config,
			normalize: normalizeOptionalString
		});
		if (!resolvedAgent) return;
		const search = normalizeSessionCatalogSearch(request.search);
		const progressId = request.progressId;
		const progressConnId = progressId && client?.connId ? client.connId : void 0;
		const listKey = sessionCatalogListKey({
			agentId: resolvedAgent.agentId,
			request,
			search
		});
		const cache = catalogListCache(config, catalogRegistrations);
		const cached = cache.get(listKey);
		if (cached && (cached.expiresAt === void 0 || cached.expiresAt > Date.now())) {
			if (cached.expiresAt === void 0 && progressConnId && progressId) cached.progressSubscribers.set(`${progressConnId}\0${progressId}`, {
				broadcastToConnIds: context.broadcastToConnIds,
				connId: progressConnId,
				progressId
			});
			cache.delete(listKey);
			cache.set(listKey, cached);
			respond(true, await cached.result);
			return;
		}
		if (cached) cache.delete(listKey);
		const progressSubscribers = /* @__PURE__ */ new Map();
		if (progressConnId && progressId) progressSubscribers.set(`${progressConnId}\0${progressId}`, {
			broadcastToConnIds: context.broadcastToConnIds,
			connId: progressConnId,
			progressId
		});
		const operation = (async () => {
			const requestEntries = createSessionCatalogRequestEntrySnapshot({
				cfg: config,
				fallbackAgentId: resolvedAgent.agentId
			});
			const listNodes = createSessionCatalogRequestNodeSnapshot();
			return { catalogs: await Promise.all(selected.map(async (provider) => {
				const createTarget = resolveProviderCreateTarget(provider, resolvedAgent.agentId, config);
				const createSession = createTarget.ok ? { model: createTarget.target.model } : void 0;
				const onHost = (host) => {
					const catalog = catalogResult(provider, [requestEntries.projectHostCreatedActors(host)], void 0, createSession);
					for (const subscriber of progressSubscribers.values()) subscriber.broadcastToConnIds("sessions.catalog.host", {
						progressId: subscriber.progressId,
						agentId: resolvedAgent.agentId,
						catalog
					}, /* @__PURE__ */ new Set([subscriber.connId]), { dropIfSlow: true });
				};
				try {
					return catalogResult(provider, (await sessionCatalogListAdmission.run(() => provider.list({
						search,
						limitPerHost: request.limitPerHost,
						hostIds: request.hostIds,
						...request.cursors !== void 0 ? { cursors: request.cursors } : {},
						sessionEntries: requestEntries.sessionEntries,
						listNodes,
						onHost
					}))).map(requestEntries.projectHostCreatedActors), void 0, createSession);
				} catch (error) {
					return catalogResult(provider, [], catalogError(error), createSession);
				}
			})) };
		})();
		const entry = {
			progressSubscribers,
			result: operation
		};
		cache.set(listKey, entry);
		pruneMapToMaxSize(cache, SESSION_CATALOG_LIST_CACHE_MAX_ENTRIES);
		try {
			const result = await operation;
			if (cache.get(listKey) === entry) entry.expiresAt = Date.now() + SESSION_CATALOG_SHARE_WINDOW_MS;
			respond(true, result);
		} catch (error) {
			if (cache.get(listKey) === entry) cache.delete(listKey);
			throw error;
		} finally {
			progressSubscribers.clear();
		}
	},
	"sessions.catalog.read": async ({ params, respond }) => {
		if (!assertValidParams(params, validateSessionsCatalogReadParams, "sessions.catalog.read", respond)) return;
		const request = params;
		const provider = providerOrRespond(request.catalogId, respond);
		if (!provider) return;
		try {
			const { catalogId: _catalogId, ...providerRequest } = request;
			respond(true, await provider.read(providerRequest));
		} catch (error) {
			const details = catalogError(error);
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, details.message, { details }));
		}
	},
	"sessions.catalog.continue": async ({ params, respond, client }) => {
		if (!assertValidParams(params, validateSessionsCatalogContinueParams, "sessions.catalog.continue", respond)) return;
		const request = params;
		const registration = registrationOrRespond(request.catalogId, respond);
		if (!registration) return;
		const provider = registration.provider;
		if (!provider.continueSession) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "catalog is view-only"));
			return;
		}
		try {
			const { catalogId: _catalogId, ...providerRequest } = request;
			const clientScopes = Array.isArray(client?.connect?.scopes) ? client.connect.scopes : [];
			const result = await provider.continueSession({
				...providerRequest,
				clientScopes
			});
			if (result.conversationBinding) await bindPluginSessionConversation({
				pluginId: registration.pluginId,
				pluginName: registration.pluginName,
				pluginRoot: registration.rootDir?.trim() || registration.source,
				sessionKey: result.sessionKey,
				binding: result.conversationBinding,
				afterBind: result.afterConversationBound
			});
			const agentId = resolveAgentIdFromSessionKey(result.sessionKey);
			if (result.upstream) upsertSessionUpstreamLink({
				sessionKey: result.sessionKey,
				agentId,
				catalogId: request.catalogId,
				hostId: request.hostId,
				threadId: request.threadId,
				upstreamKind: result.upstream.kind,
				upstreamRef: result.upstream.ref,
				marker: result.upstream.marker
			});
			recordSessionStateEvent({
				sessionKey: result.sessionKey,
				agentId,
				kind: "adopted",
				actorType: "human",
				dedupeKey: `adopted:${result.sessionKey}`,
				summary: `adopted from ${request.catalogId}`,
				payload: {
					catalogId: request.catalogId,
					hostId: request.hostId
				}
			});
			respond(true, { sessionKey: result.sessionKey });
		} catch (error) {
			const details = catalogError(error);
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, details.message, { details }));
		}
	},
	"sessions.catalog.archive": async ({ params, respond }) => {
		if (!assertValidParams(params, validateSessionsCatalogArchiveParams, "sessions.catalog.archive", respond)) return;
		const request = params;
		const provider = providerOrRespond(request.catalogId, respond);
		if (!provider) return;
		if (!provider.archive) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "catalog cannot archive"));
			return;
		}
		try {
			const { catalogId: _catalogId, ...providerRequest } = request;
			respond(true, await provider.archive(providerRequest));
		} catch (error) {
			const details = catalogError(error);
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, details.message, { details }));
		}
	}
};
/** Fill the same list single-flight and provider caches used by the Gateway RPC. */
async function prewarmSessionCatalogList(params) {
	const handler = sessionCatalogHandlers["sessions.catalog.list"];
	if (!handler) throw new Error("sessions.catalog.list handler is unavailable");
	let responded = false;
	let responseError;
	const respond = (ok, _payload, error) => {
		responded = true;
		if (!ok) responseError = error?.message || "sessions.catalog.list prewarm failed";
	};
	await handler({
		params: {
			agentId: params.agentId,
			limitPerHost: params.limitPerHost
		},
		client: null,
		context: { getRuntimeConfig: () => params.config },
		respond
	});
	if (!responded) throw new Error("sessions.catalog.list prewarm returned no result");
	if (responseError) throw new Error(responseError);
}
//#endregion
export { sessionCatalogHandlers as i, resolveSessionCatalogCreateTarget as n, resolveSessionCatalogProvider as r, prewarmSessionCatalogList as t };
