import { c as normalizeOptionalString, p as readStringValue, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey, f as parseThreadSessionSuffix, o as normalizeSessionKeyPreservingOpaquePeerIds } from "./session-key-utils-02xWdGSz.js";
import { n as normalizeAccountId, r as normalizeOptionalAccountId } from "./account-id-CIVg1QNG.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { a as getRuntimeConfigSnapshot, c as getRuntimeConfigSourceSnapshot, x as selectApplicableRuntimeConfig } from "./runtime-snapshot-DLOCFXOE.js";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.js";
import "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import "./message-channel-constants-76XnXM8q.js";
import { i as normalizeMessageChannel } from "./message-channel-normalize-Bmutiks_.js";
import "./message-channel-1n7hD5_u.js";
import { h as isAgentHarnessSessionKey, w as resolveMissingAgentHarnessSessionError } from "./session-entry-slot-keys-DR5d2mKt.js";
import { Ht as validateMessageActionParams, Mn as validateSendParams, Sn as validatePollParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { r as resolveChannelThreadAddressing } from "./thread-addressing-CEiTb1uv.js";
import { S as loadSessionEntry } from "./session-utils-row-Cby7i9PV.js";
import "./session-utils-DRzriWC1.js";
import { s as projectOutboundPayloadPlanForMirror, t as createOutboundPayloadPlan } from "./payloads-BRd0B8mC.js";
import { a as maybeResolveIdLikeTarget } from "./target-resolver-Dmfs1wnc.js";
import { t as buildOutboundSessionContext } from "./session-context-DdqCb4cM.js";
import { n as getAgentScopedMediaLocalRoots } from "./local-roots-DY1lg2k6.js";
import { c as dispatchChannelMessageAction, f as hydrateAttachmentParamsForAction, n as cancelTerminalSourceReplyDelivery, o as mirrorDeliveredSourceReplyToTranscript, s as reconcileTerminalSourceReplyDelivery, t as beginTerminalSourceReplyDelivery, v as resolveAttachmentMediaPolicy } from "./source-reply-mirror-Crvb6bnm.js";
import { r as resolveOutboundChannelPlugin } from "./channel-resolution-9przSS8z.js";
import { t as resolveAgentScopedOutboundMediaAccess } from "./read-capability-DYpFEyQ-.js";
import { t as sendDurableMessageBatch } from "./runtime-C46yYDXd.js";
import { n as normalizePollInput } from "./polls-C-v11_tu.js";
import { r as resolveMessageChannelSelection } from "./channel-selection-C2mCQw_4.js";
import { i as resolveChannelDefaultAccountId } from "./helpers-B381bECH.js";
import { n as ensureOutboundSessionEntry, r as resolveOutboundSessionRoute } from "./outbound-session-BvIhfemr.js";
import { i as resolveOutboundTarget } from "./targets-CBM4OASj.js";
import { n as validateExplicitMessageAccountSelection } from "./message-account-selection-DyvhxIP-.js";
import { t as extractToolPayload } from "./tool-payload-BEUQxf_X.js";
import { t as createOutboundSendDeps } from "./outbound-send-deps-9PgpYcx6.js";
import { t as DEDUPE_MAX } from "./server-constants-DKuFNbQH.js";
import { t as formatForLog } from "./ws-log-B1D_Y86r.js";
import "./deps-DjEsu1aS.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as resolveGatewayPluginConfig } from "./runtime-plugin-config-CwjSnlUj.js";
import { n as resolveGatewayInflightRequest$1, r as runGatewayInflightWork } from "./inflight-C7tVF6RA.js";
import { t as resolveGatewayConversationReadOrigin } from "./conversation-read-origin-CcxTNkzD.js";
//#region src/gateway/server-methods/send.ts
const MESSAGE_OPERATION_ROUTE_BINDING_MAX = DEDUPE_MAX * 4;
const messageOperationRouteBindings = /* @__PURE__ */ new WeakMap();
const messageOperationRouteBindingQueues = /* @__PURE__ */ new WeakMap();
function pruneMessageOperationRouteBindings(bindings, now) {
	for (const [key, entry] of bindings) if (!entry.retainUntilSettled && now - entry.ts > 3e5) bindings.delete(key);
	const excess = bindings.size - MESSAGE_OPERATION_ROUTE_BINDING_MAX;
	if (excess <= 0) return;
	const oldestSettledKeys = [...bindings.entries()].filter(([, entry]) => !entry.retainUntilSettled).toSorted(([, left], [, right]) => left.ts - right.ts).slice(0, excess).map(([key]) => key);
	for (const key of oldestSettledKeys) bindings.delete(key);
}
function getMessageOperationRouteBindings(context) {
	let bindings = messageOperationRouteBindings.get(context);
	if (!bindings) {
		bindings = /* @__PURE__ */ new Map();
		messageOperationRouteBindings.set(context, bindings);
	}
	pruneMessageOperationRouteBindings(bindings, Date.now());
	return bindings;
}
function getMessageOperationRouteBindingQueue(context) {
	let queue = messageOperationRouteBindingQueues.get(context);
	if (!queue) {
		queue = new KeyedAsyncQueue();
		messageOperationRouteBindingQueues.set(context, queue);
	}
	return queue;
}
async function acquireMessageOperationRouteBindingLock(params) {
	if (!params.binding) return () => void 0;
	let signalAcquired;
	let signalRelease;
	const acquired = new Promise((resolve) => {
		signalAcquired = resolve;
	});
	const held = new Promise((resolve) => {
		signalRelease = resolve;
	});
	getMessageOperationRouteBindingQueue(params.context).enqueue(params.binding.key, async () => {
		signalAcquired?.();
		await held;
	});
	await acquired;
	let released = false;
	return () => {
		if (released) return;
		released = true;
		signalRelease?.();
	};
}
function resolveTrustedMessageActionToolContext(params) {
	const identity = params.client?.internal?.agentRuntimeIdentity;
	const messageActionContext = identity?.messageActionContext;
	if (!identity || !messageActionContext) return {
		ok: true,
		toolContext: void 0,
		requesterAccountId: void 0,
		requesterSenderId: void 0,
		sessionId: void 0,
		sourceReplySessionKey: void 0,
		sourceReplyFinal: void 0,
		sourceReplyToolCallId: void 0
	};
	if (Date.now() >= messageActionContext.expiresAtMs) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "message.action agent runtime context has expired")
	};
	const requestSessionKey = normalizeSessionKeyPreservingOpaquePeerIds(params.request.sessionKey);
	const identitySessionKey = normalizeSessionKeyPreservingOpaquePeerIds(identity.sessionKey);
	const identityAgentId = normalizeAgentId(identity.agentId);
	const requestAgentId = normalizeOptionalString(params.request.agentId);
	const sessionAgentId = parseAgentSessionKey(requestSessionKey)?.agentId;
	const requestSessionId = normalizeOptionalString(params.request.sessionId);
	const sourceReplySessionKey = normalizeSessionKeyPreservingOpaquePeerIds(messageActionContext.sourceReplySessionKey) || void 0;
	const sourceReplySessionAgentId = parseAgentSessionKey(sourceReplySessionKey)?.agentId;
	if (!requestSessionKey || requestSessionKey !== identitySessionKey || requestAgentId && normalizeAgentId(requestAgentId) !== identityAgentId || sessionAgentId && normalizeAgentId(sessionAgentId) !== identityAgentId || messageActionContext.sessionId && requestSessionId !== messageActionContext.sessionId || sourceReplySessionKey && (!sourceReplySessionAgentId || normalizeAgentId(sourceReplySessionAgentId) !== identityAgentId)) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "message.action agent runtime identity does not match the requested session")
	};
	return {
		ok: true,
		toolContext: messageActionContext.toolContext,
		requesterAccountId: messageActionContext.requesterAccountId,
		requesterSenderId: messageActionContext.requesterSenderId,
		sessionId: messageActionContext.sessionId,
		sourceReplySessionKey,
		sourceReplyFinal: messageActionContext.sourceReplyFinal,
		sourceReplyToolCallId: messageActionContext.sourceReplyToolCallId
	};
}
function resolveMessageOperationAuthorityScope(params) {
	return params.prefix === "message.action" ? `:${params.conversationReadOrigin ?? "delegated"}` : "";
}
function resolveGatewayInflightRequest(params) {
	const idem = params.idempotencyKey;
	const authorityScope = resolveMessageOperationAuthorityScope(params);
	const requestScope = params.requestScope ? `:${params.requestScope}` : "";
	const dedupeKey = `${params.prefix}${authorityScope}${requestScope}:${idem}`;
	return resolveGatewayInflightRequest$1({
		context: params.context,
		dedupeKey,
		idempotencyKey: idem,
		respond: params.respond
	});
}
function parseMessageOperationRoute(requestScope) {
	if (!requestScope) return;
	try {
		const parsed = JSON.parse(requestScope);
		if (!Array.isArray(parsed) || parsed.length !== 2 || typeof parsed[0] !== "string" || typeof parsed[1] !== "string") return;
		const channel = normalizeMessageChannel(parsed[0]);
		const accountId = normalizeOptionalAccountId(parsed[1]);
		if (!channel || channel !== parsed[0] || !accountId || accountId !== parsed[1]) return;
		return {
			channel,
			accountId,
			requestScope
		};
	} catch {
		return;
	}
}
function resolveMessageOperationRouteBinding(params) {
	const rawChannel = readStringValue(params.requestChannel);
	const channel = rawChannel ? normalizeMessageChannel(rawChannel) : void 0;
	if (rawChannel && !channel) return;
	const normalizedAccountIds = params.accountIds.filter((value) => value !== void 0 && value !== null && (typeof value !== "string" || value.trim())).map((value) => typeof value === "string" ? normalizeOptionalAccountId(value) : void 0);
	if (normalizedAccountIds.some((accountId) => !accountId)) return;
	const distinctAccountIds = [...new Set(normalizedAccountIds)];
	if (distinctAccountIds.length > 1) return;
	const accountId = distinctAccountIds[0];
	const authorityScope = resolveMessageOperationAuthorityScope(params);
	const explicitRouteScope = JSON.stringify([channel ?? null, accountId ?? null]);
	const key = `${params.prefix}${authorityScope}:route-binding:${explicitRouteScope}:${params.idempotencyKey}`;
	return {
		key,
		reservedRoute: parseMessageOperationRoute(getMessageOperationRouteBindings(params.context).get(key)?.requestScope)
	};
}
function bindMessageOperationRoute(params) {
	if (!params.binding) return true;
	const bindings = getMessageOperationRouteBindings(params.context);
	const existing = bindings.get(params.binding.key);
	if (existing) {
		if (existing.requestScope !== params.requestScope) return false;
		bindings.set(params.binding.key, {
			...existing,
			ts: Date.now()
		});
		return true;
	}
	bindings.set(params.binding.key, {
		ts: Date.now(),
		requestScope: params.requestScope,
		retainUntilSettled: false
	});
	pruneMessageOperationRouteBindings(bindings, Date.now());
	return true;
}
function refreshMessageOperationRouteBinding(params) {
	if (!params.binding) return;
	const bindings = getMessageOperationRouteBindings(params.context);
	const existing = bindings.get(params.binding.key);
	if (existing?.requestScope === params.requestScope) {
		bindings.set(params.binding.key, {
			...existing,
			ts: Date.now(),
			retainUntilSettled: false
		});
		pruneMessageOperationRouteBindings(bindings, Date.now());
	}
}
function retainMessageOperationRouteBinding(params) {
	if (!params.binding) return;
	const bindings = getMessageOperationRouteBindings(params.context);
	const existing = bindings.get(params.binding.key);
	if (existing?.requestScope === params.requestScope) bindings.set(params.binding.key, {
		...existing,
		retainUntilSettled: true
	});
}
function replayReservedMessageOperationRoute(params) {
	if (!params.binding?.reservedRoute) return;
	const inflight = resolveGatewayInflightRequest({
		context: params.context,
		prefix: params.prefix,
		idempotencyKey: params.idempotencyKey,
		respond: params.respond,
		conversationReadOrigin: params.conversationReadOrigin,
		requestScope: params.binding.reservedRoute.requestScope
	});
	if (inflight.kind === "ready") return;
	return inflight.done;
}
function resolveMessageOperationAccountRoute(params) {
	const accountIds = params.accountIds.map((accountId) => validateExplicitMessageAccountSelection({
		cfg: params.cfg,
		channel: params.channel,
		accountId,
		plugin: params.plugin
	})).filter((accountId) => accountId !== void 0);
	const distinctAccountIds = [...new Set(accountIds)];
	if (distinctAccountIds.length > 1) throw new Error(params.conflictMessage);
	const accountId = distinctAccountIds[0];
	const effectiveAccountId = accountId ?? normalizeAccountId(resolveChannelDefaultAccountId({
		plugin: params.plugin,
		cfg: params.cfg
	}));
	return {
		accountId,
		requestScope: JSON.stringify([params.channel, effectiveAccountId])
	};
}
async function withMessageOperationRoute(params) {
	const bindingParams = {
		context: params.context,
		prefix: params.prefix,
		idempotencyKey: params.idempotencyKey,
		conversationReadOrigin: params.conversationReadOrigin,
		requestChannel: params.requestChannel,
		accountIds: params.bindingAccountIds
	};
	let binding = resolveMessageOperationRouteBinding(bindingParams);
	const releaseLock = await acquireMessageOperationRouteBindingLock({
		context: params.context,
		binding
	});
	try {
		binding = resolveMessageOperationRouteBinding(bindingParams);
		const reservedReplay = replayReservedMessageOperationRoute({
			context: params.context,
			binding,
			prefix: params.prefix,
			idempotencyKey: params.idempotencyKey,
			respond: params.respond,
			conversationReadOrigin: params.conversationReadOrigin
		});
		if (reservedReplay) {
			releaseLock();
			await reservedReplay;
			return;
		}
		const resolved = await params.resolveChannel(binding?.reservedRoute?.channel ?? params.requestChannel);
		if (!resolved) return;
		let accountRoute;
		try {
			accountRoute = resolveMessageOperationAccountRoute({
				...resolved,
				accountIds: params.routeAccountIds(binding),
				conflictMessage: params.conflictMessage
			});
		} catch (error) {
			respondGatewayInvalidRequest({
				respond: params.respond,
				channel: resolved.channel,
				error
			});
			return;
		}
		if (!bindMessageOperationRoute({
			context: params.context,
			binding,
			requestScope: accountRoute.requestScope
		})) {
			respondGatewayInvalidRequest({
				respond: params.respond,
				channel: resolved.channel,
				error: "idempotency key is already bound to a different message route"
			});
			return;
		}
		const inflight = resolveGatewayInflightRequest({
			context: params.context,
			prefix: params.prefix,
			idempotencyKey: params.idempotencyKey,
			respond: params.respond,
			conversationReadOrigin: params.conversationReadOrigin,
			requestScope: accountRoute.requestScope
		});
		if (inflight.kind === "handled") {
			releaseLock();
			await inflight.done;
			return;
		}
		retainMessageOperationRouteBinding({
			context: params.context,
			binding,
			requestScope: accountRoute.requestScope
		});
		const work = params.work({
			...resolved,
			accountId: accountRoute.accountId,
			idem: inflight.idem,
			dedupeKey: inflight.dedupeKey
		}).finally(() => {
			refreshMessageOperationRouteBinding({
				context: params.context,
				binding,
				requestScope: accountRoute.requestScope
			});
		});
		const inflightWork = runGatewayInflightWork({
			...inflight,
			work,
			respond: params.respond
		});
		releaseLock();
		await inflightWork;
	} finally {
		releaseLock();
	}
}
function respondGatewayInvalidRequest(params) {
	params.respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, String(params.error)), {
		channel: params.channel,
		error: formatForLog(params.error)
	});
}
async function resolveRequestedChannel(params) {
	const channelInput = readStringValue(params.requestChannel);
	const normalizedChannel = channelInput ? normalizeMessageChannel(channelInput) : void 0;
	if (params.rejectWebchatAsInternalOnly && normalizedChannel === "webchat") return { error: errorShape(ErrorCodes.INVALID_REQUEST, "unsupported channel: webchat (internal-only). Use `chat.send` for WebChat UI messages or choose a deliverable channel.") };
	if (channelInput && !normalizedChannel) return { error: errorShape(ErrorCodes.INVALID_REQUEST, params.unsupportedMessage(channelInput)) };
	const sourceCfg = params.context.getRuntimeConfig();
	const cfg = resolveGatewayPluginConfig({ config: sourceCfg });
	let channel = normalizedChannel;
	if (!channel) try {
		channel = (await resolveMessageChannelSelection({ cfg })).channel;
	} catch (err) {
		return { error: errorShape(ErrorCodes.INVALID_REQUEST, String(err)) };
	}
	return {
		cfg,
		sourceCfg,
		channel
	};
}
async function resolveInternalDeliveryChannel(requestChannel, context) {
	const resolvedChannel = await resolveRequestedChannel({
		requestChannel,
		unsupportedMessage: (input) => `unsupported channel: ${input}`,
		context,
		rejectWebchatAsInternalOnly: true
	});
	if ("error" in resolvedChannel) return {
		kind: "failed",
		result: {
			ok: false,
			error: resolvedChannel.error
		}
	};
	return {
		kind: "ready",
		...resolvedChannel
	};
}
function resolveGatewayOutboundTarget(params) {
	const resolved = resolveOutboundTarget({
		channel: params.channel,
		to: params.to,
		cfg: params.cfg,
		accountId: params.accountId,
		mode: "explicit"
	});
	if (!resolved.ok) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, String(resolved.error))
	};
	return {
		ok: true,
		to: resolved.to
	};
}
function resolveMessageActionRuntimeConfig(params) {
	const runtimeConfig = getRuntimeConfigSnapshot();
	const runtimeSourceConfig = getRuntimeConfigSourceSnapshot();
	if (!runtimeConfig || !runtimeSourceConfig) return params.cfg;
	const selected = selectApplicableRuntimeConfig({
		inputConfig: params.sourceCfg,
		runtimeConfig,
		runtimeSourceConfig
	});
	if (selected === runtimeConfig && selected !== params.cfg) return resolveGatewayPluginConfig({ config: selected });
	return params.cfg;
}
function buildGatewayDeliveryPayload(params) {
	const payload = {
		runId: params.runId,
		messageId: params.result.messageId,
		channel: params.channel
	};
	for (const key of [
		"chatId",
		"channelId",
		"toJid",
		"conversationId",
		"pollId"
	]) if (key in params.result) payload[key] = params.result[key];
	return payload;
}
function createGatewayInflightResult(params) {
	params.context.dedupe.set(params.dedupeKey, {
		ts: Date.now(),
		...params.result
	});
	return {
		...params.result,
		meta: {
			channel: params.channel,
			...params.meta
		}
	};
}
function createGatewayInflightSuccess(params) {
	return createGatewayInflightResult({
		...params,
		result: {
			ok: true,
			payload: params.payload
		}
	});
}
function createGatewayInflightUnavailableFailure(params) {
	const error = errorShape(ErrorCodes.UNAVAILABLE, String(params.err));
	return createGatewayInflightResult({
		...params,
		result: {
			ok: false,
			error
		},
		meta: { error: formatForLog(params.err) }
	});
}
async function mirrorDeliveredSourceReplyToTranscriptBestEffort(params) {
	try {
		if (!await mirrorDeliveredSourceReplyToTranscript(params.mirror) && params.mirror.sourceReplyFinal === true) params.context.logGateway?.warn?.("Terminal source reply receipt was not mirrored; restart recovery is fail-closed.", {
			channel: params.mirror.channel,
			sessionKey: params.mirror.sessionKey
		});
	} catch (err) {
		params.context.logGateway?.warn?.("Source reply transcript mirror failed after delivery.", {
			error: formatForLog(err),
			channel: params.mirror.channel,
			sessionKey: params.mirror.sessionKey
		});
	}
}
const sourceReplyTranscriptMirrorQueue = new KeyedAsyncQueue();
function resolveSourceReplyTranscriptMirrorQueueKey(mirror) {
	return mirror.sessionKey?.trim() || "__global__";
}
function scheduleDeliveredSourceReplyTranscriptMirror(params) {
	const queueKey = resolveSourceReplyTranscriptMirrorQueueKey(params.mirror);
	return sourceReplyTranscriptMirrorQueue.enqueue(queueKey, () => mirrorDeliveredSourceReplyToTranscriptBestEffort(params));
}
const sendHandlers = {
	"message.action": async ({ params, respond, context, client }) => {
		const p = params;
		if (!assertValidParams(p, validateMessageActionParams, "message.action", respond)) return;
		const request = p;
		const trustedContext = resolveTrustedMessageActionToolContext({
			client,
			request
		});
		if (!trustedContext.ok) {
			respond(false, void 0, trustedContext.error);
			return;
		}
		const conversationReadOrigin = resolveGatewayConversationReadOrigin({
			client,
			requestedOrigin: request.conversationReadOrigin
		});
		await withMessageOperationRoute({
			context,
			prefix: "message.action",
			idempotencyKey: request.idempotencyKey,
			respond,
			conversationReadOrigin,
			requestChannel: request.channel,
			bindingAccountIds: [request.accountId, request.params.accountId],
			routeAccountIds: (binding) => [
				request.accountId,
				request.params.accountId,
				binding?.reservedRoute?.accountId
			],
			conflictMessage: "message.action accountId does not match params.accountId",
			resolveChannel: async (requestChannel) => {
				const resolved = await resolveRequestedChannel({
					requestChannel,
					unsupportedMessage: (input) => `unsupported channel: ${input}`,
					context,
					rejectWebchatAsInternalOnly: true
				});
				if ("error" in resolved) {
					respond(false, void 0, resolved.error);
					return;
				}
				const { cfg: selectedCfg, sourceCfg, channel } = resolved;
				const cfg = resolveMessageActionRuntimeConfig({
					cfg: selectedCfg,
					sourceCfg
				});
				const plugin = resolveOutboundChannelPlugin({
					channel,
					cfg
				});
				if (!plugin?.actions?.handleAction) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Channel ${channel} does not support action ${request.action}.`));
					return;
				}
				return {
					cfg,
					channel,
					plugin
				};
			},
			work: async ({ cfg, channel, accountId, dedupeKey }) => {
				try {
					const sessionKey = normalizeOptionalString(request.sessionKey) ?? void 0;
					const agentId = normalizeOptionalString(request.agentId) ?? (sessionKey ? resolveSessionAgentId({
						sessionKey,
						config: cfg
					}) : void 0);
					if (accountId) request.params.accountId = accountId;
					const resolvedMediaAccess = request.action === "send" ? resolveAgentScopedOutboundMediaAccess({
						cfg,
						agentId,
						sessionKey,
						messageProvider: sessionKey ? void 0 : channel,
						accountId: sessionKey ? trustedContext.requesterAccountId ?? accountId : accountId,
						requesterSenderId: trustedContext.requesterSenderId
					}) : void 0;
					const mediaAccess = resolvedMediaAccess ? {
						localRoots: resolvedMediaAccess.localRoots,
						...resolvedMediaAccess.workspaceDir ? { workspaceDir: resolvedMediaAccess.workspaceDir } : {}
					} : void 0;
					if (request.action === "send") await hydrateAttachmentParamsForAction({
						cfg,
						channel,
						accountId,
						args: request.params,
						action: "send",
						mediaPolicy: resolveAttachmentMediaPolicy({ mediaLocalRoots: getAgentScopedMediaLocalRoots(cfg, agentId) })
					});
					const sourceReplyMirror = {
						action: request.action,
						channel,
						actionParams: request.params,
						cfg,
						accountId,
						currentAccountId: trustedContext.requesterAccountId,
						sessionKey: trustedContext.sourceReplySessionKey ?? sessionKey,
						sessionId: trustedContext.sessionId,
						agentId,
						toolContext: trustedContext.toolContext,
						idempotencyKey: request.idempotencyKey,
						toolCallId: trustedContext.sourceReplyToolCallId,
						...trustedContext.sourceReplyFinal !== void 0 ? { sourceReplyFinal: trustedContext.sourceReplyFinal } : {}
					};
					const terminalDeliveryReceipt = trustedContext.sourceReplyFinal === true ? await beginTerminalSourceReplyDelivery(sourceReplyMirror) : void 0;
					const gatewayClientScopes = client?.connect?.scopes ?? [];
					const handled = await dispatchChannelMessageAction({
						channel,
						action: request.action,
						cfg,
						params: request.params,
						accountId,
						requesterAccountId: trustedContext.requesterAccountId,
						requesterSenderId: trustedContext.requesterSenderId,
						senderIsOwner: gatewayClientScopes.includes("operator.admin") ? request.senderIsOwner === true : false,
						conversationReadOrigin,
						sessionKey,
						sessionId: normalizeOptionalString(request.sessionId) ?? void 0,
						inboundEventKind: request.inboundTurnKind,
						agentId,
						...mediaAccess ? {
							mediaAccess,
							mediaLocalRoots: mediaAccess.localRoots
						} : { mediaLocalRoots: getAgentScopedMediaLocalRoots(cfg, agentId) },
						toolContext: trustedContext.toolContext,
						dryRun: false,
						gatewayClientScopes
					});
					if (!handled) {
						await cancelTerminalSourceReplyDelivery(terminalDeliveryReceipt);
						return createGatewayInflightResult({
							context,
							dedupeKey,
							channel,
							result: {
								ok: false,
								error: errorShape(ErrorCodes.INVALID_REQUEST, `Message action ${request.action} not supported for channel ${channel}.`)
							}
						});
					}
					const payload = extractToolPayload(handled);
					try {
						await reconcileTerminalSourceReplyDelivery({
							deliveredPayload: payload,
							mirror: sourceReplyMirror,
							receipt: terminalDeliveryReceipt
						});
					} catch (err) {
						context.logGateway?.warn?.("Terminal source reply receipt reconciliation failed.", {
							error: formatForLog(err),
							channel,
							sessionKey
						});
					}
					await scheduleDeliveredSourceReplyTranscriptMirror({
						context,
						mirror: {
							...sourceReplyMirror,
							deliveredPayload: payload
						}
					});
					return createGatewayInflightSuccess({
						context,
						dedupeKey,
						payload,
						channel
					});
				} catch (err) {
					return createGatewayInflightUnavailableFailure({
						context,
						dedupeKey,
						channel,
						err
					});
				}
			}
		});
	},
	send: async ({ params, respond, context, client }) => {
		const p = params;
		if (!assertValidParams(p, validateSendParams, "send", respond)) return;
		const request = p;
		const to = normalizeOptionalString(request.to) ?? "";
		const message = request.message?.trim() ? request.message : "";
		const mediaUrl = normalizeOptionalString(request.mediaUrl);
		const mediaUrls = Array.isArray(request.mediaUrls) ? request.mediaUrls.map((entry) => normalizeOptionalString(entry)).filter((entry) => Boolean(entry)) : void 0;
		const buffer = readStringValue(request.buffer);
		if (!message && !mediaUrl && (mediaUrls?.length ?? 0) === 0 && !buffer) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "invalid send params: text or media is required"));
			return;
		}
		const requestedAccountId = normalizeOptionalString(request.accountId);
		const replyToId = normalizeOptionalString(request.replyToId);
		const threadId = normalizeOptionalString(request.threadId);
		await withMessageOperationRoute({
			context,
			prefix: "send",
			idempotencyKey: request.idempotencyKey,
			respond,
			requestChannel: request.channel,
			bindingAccountIds: [request.accountId],
			routeAccountIds: (binding) => [requestedAccountId, binding?.reservedRoute?.accountId],
			conflictMessage: "send account selections do not match",
			resolveChannel: async (requestChannel) => {
				const resolved = await resolveInternalDeliveryChannel(requestChannel, context);
				if (resolved.kind !== "ready") {
					const result = resolved.result;
					respond(result.ok, result.payload, result.error, result.meta);
					return;
				}
				const { cfg, channel } = resolved;
				const plugin = resolveOutboundChannelPlugin({
					channel,
					cfg
				});
				if (!plugin) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unsupported channel: ${channel}`));
					return;
				}
				return {
					cfg,
					channel,
					plugin
				};
			},
			work: async ({ cfg, channel, accountId, idem, dedupeKey }) => {
				try {
					const resolvedTarget = resolveGatewayOutboundTarget({
						channel,
						to,
						cfg,
						accountId
					});
					if (!resolvedTarget.ok) return {
						ok: false,
						error: resolvedTarget.error,
						meta: { channel }
					};
					const idLikeTarget = await maybeResolveIdLikeTarget({
						cfg,
						channel,
						input: resolvedTarget.to,
						accountId
					});
					const deliveryTarget = idLikeTarget?.to ?? resolvedTarget.to;
					const providedSessionKey = normalizeSessionKeyPreservingOpaquePeerIds(request.sessionKey) || void 0;
					const explicitAgentId = normalizeOptionalString(request.agentId);
					const sessionAgentId = providedSessionKey ? resolveSessionAgentId({
						sessionKey: providedSessionKey,
						config: cfg
					}) : void 0;
					const defaultAgentId = resolveSessionAgentId({ config: cfg });
					const effectiveAgentId = explicitAgentId ?? sessionAgentId ?? defaultAgentId;
					const sendArgs = {
						mediaUrl,
						mediaUrls,
						buffer,
						filename: normalizeOptionalString(request.filename) ?? void 0,
						contentType: normalizeOptionalString(request.contentType) ?? void 0
					};
					await hydrateAttachmentParamsForAction({
						cfg,
						channel,
						accountId,
						args: sendArgs,
						action: "send",
						mediaPolicy: resolveAttachmentMediaPolicy({ mediaLocalRoots: getAgentScopedMediaLocalRoots(cfg, effectiveAgentId) })
					});
					const hydratedMediaUrl = normalizeOptionalString(sendArgs.mediaUrl);
					const hydratedMediaUrls = Array.isArray(sendArgs.mediaUrls) ? sendArgs.mediaUrls.map((entry) => normalizeOptionalString(entry)).filter((entry) => Boolean(entry)) : void 0;
					const outboundDeps = context.deps ? createOutboundSendDeps(context.deps) : void 0;
					const outboundPayloads = [{
						text: message,
						mediaUrl: hydratedMediaUrl,
						mediaUrls: hydratedMediaUrls,
						...request.asVoice === true ? { audioAsVoice: true } : {}
					}];
					const mirrorProjection = projectOutboundPayloadPlanForMirror(createOutboundPayloadPlan(outboundPayloads));
					const mirrorText = mirrorProjection.text;
					const mirrorMediaUrls = mirrorProjection.mediaUrls;
					const derivedRoute = await resolveOutboundSessionRoute({
						cfg,
						channel,
						agentId: effectiveAgentId,
						accountId,
						target: deliveryTarget,
						currentSessionKey: providedSessionKey,
						resolvedTarget: idLikeTarget,
						replyToId,
						threadId
					});
					const providedSessionBaseKey = parseThreadSessionSuffix(providedSessionKey).baseSessionKey ?? providedSessionKey;
					const shouldUseDerivedThreadSessionKey = resolveChannelThreadAddressing(channel) === "message" && Boolean(providedSessionKey) && Boolean(normalizeOptionalString(derivedRoute?.threadId)) && normalizeOptionalLowercaseString(derivedRoute?.baseSessionKey) === normalizeOptionalLowercaseString(providedSessionBaseKey) && normalizeOptionalLowercaseString(derivedRoute?.sessionKey) !== providedSessionKey;
					const outboundRoute = derivedRoute ? providedSessionKey ? shouldUseDerivedThreadSessionKey ? {
						...derivedRoute,
						baseSessionKey: derivedRoute.baseSessionKey ?? providedSessionKey
					} : {
						...derivedRoute,
						sessionKey: providedSessionKey,
						baseSessionKey: providedSessionKey
					} : derivedRoute : null;
					const outboundSessionKey = outboundRoute?.sessionKey ?? providedSessionKey;
					if (outboundSessionKey && isAgentHarnessSessionKey(outboundSessionKey)) {
						const { canonicalKey, entry } = loadSessionEntry(outboundSessionKey);
						const missingHarnessSessionError = resolveMissingAgentHarnessSessionError(canonicalKey, entry);
						if (missingHarnessSessionError) return {
							ok: false,
							error: errorShape(ErrorCodes.INVALID_REQUEST, missingHarnessSessionError),
							meta: { channel }
						};
					}
					if (outboundRoute) await ensureOutboundSessionEntry({
						cfg,
						channel,
						accountId,
						route: outboundRoute
					});
					const outboundSession = buildOutboundSessionContext({
						cfg,
						agentId: effectiveAgentId,
						sessionKey: outboundSessionKey,
						conversationType: outboundRoute?.chatType
					});
					const send = await sendDurableMessageBatch({
						cfg,
						channel,
						to: deliveryTarget,
						accountId,
						payloads: outboundPayloads,
						replyToId: replyToId ?? null,
						session: outboundSession,
						gifPlayback: request.gifPlayback,
						forceDocument: request.forceDocument,
						threadId: outboundRoute?.threadId ?? threadId ?? null,
						deps: outboundDeps,
						gatewayClientScopes: client?.connect?.scopes ?? [],
						silent: request.silent,
						formatting: request.parseMode ? { parseMode: request.parseMode } : void 0,
						mirror: outboundSessionKey ? {
							sessionKey: outboundSessionKey,
							agentId: effectiveAgentId,
							text: mirrorText || message,
							mediaUrls: mirrorMediaUrls.length > 0 ? mirrorMediaUrls : void 0,
							idempotencyKey: idem
						} : void 0
					});
					if (send.status === "failed" || send.status === "partial_failed") throw send.error;
					const result = (send.status === "sent" ? send.results : []).at(-1);
					if (!result) throw new Error("No delivery result");
					return createGatewayInflightSuccess({
						context,
						dedupeKey,
						payload: buildGatewayDeliveryPayload({
							runId: idem,
							channel,
							result
						}),
						channel
					});
				} catch (err) {
					return createGatewayInflightUnavailableFailure({
						context,
						dedupeKey,
						channel,
						err
					});
				}
			}
		});
	},
	poll: async ({ params, respond, context, client }) => {
		const p = params;
		if (!assertValidParams(p, validatePollParams, "poll", respond)) return;
		const request = p;
		await withMessageOperationRoute({
			context,
			prefix: "poll",
			idempotencyKey: request.idempotencyKey,
			respond,
			requestChannel: request.channel,
			bindingAccountIds: [request.accountId],
			routeAccountIds: (binding) => [request.accountId, binding?.reservedRoute?.accountId],
			conflictMessage: "poll account selections do not match",
			resolveChannel: async (requestChannel) => {
				const resolved = await resolveRequestedChannel({
					requestChannel,
					unsupportedMessage: (input) => `unsupported poll channel: ${input}`,
					context
				});
				if ("error" in resolved) {
					respond(false, void 0, resolved.error);
					return;
				}
				const { cfg, channel } = resolved;
				const plugin = resolveOutboundChannelPlugin({
					channel,
					cfg
				});
				const outbound = plugin?.outbound;
				if (typeof request.durationSeconds === "number" && outbound?.supportsPollDurationSeconds !== true) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `durationSeconds is not supported for ${channel} polls`));
					return;
				}
				if (typeof request.isAnonymous === "boolean" && outbound?.supportsAnonymousPolls !== true) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `isAnonymous is not supported for ${channel} polls`));
					return;
				}
				if (!plugin || !outbound?.sendPoll) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unsupported poll channel: ${channel}`));
					return;
				}
				return {
					cfg,
					channel,
					plugin,
					outbound,
					sendPoll: outbound.sendPoll
				};
			},
			work: async ({ cfg, channel, accountId, idem, dedupeKey, outbound, sendPoll }) => {
				const poll = {
					question: request.question,
					options: request.options,
					maxSelections: request.maxSelections,
					durationSeconds: request.durationSeconds,
					durationHours: request.durationHours
				};
				const threadId = normalizeOptionalString(request.threadId);
				try {
					const resolvedTarget = resolveGatewayOutboundTarget({
						channel,
						to: request.to.trim(),
						cfg,
						accountId
					});
					if (!resolvedTarget.ok) return {
						ok: false,
						error: resolvedTarget.error
					};
					const normalized = outbound.pollMaxOptions ? normalizePollInput(poll, { maxOptions: outbound.pollMaxOptions }) : normalizePollInput(poll);
					return createGatewayInflightSuccess({
						context,
						dedupeKey,
						payload: buildGatewayDeliveryPayload({
							runId: idem,
							channel,
							result: await sendPoll({
								cfg,
								to: resolvedTarget.to,
								poll: normalized,
								accountId,
								threadId,
								silent: request.silent,
								isAnonymous: request.isAnonymous,
								gatewayClientScopes: client?.connect?.scopes ?? []
							})
						}),
						channel
					});
				} catch (err) {
					return createGatewayInflightUnavailableFailure({
						context,
						dedupeKey,
						channel,
						err
					});
				}
			}
		});
	}
};
//#endregion
export { sendHandlers };
