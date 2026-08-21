import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { M as resolveTimestampMsToIsoString, S as resolveDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { y as toAgentStoreSessionKey } from "./session-key-DtTE9-Tg.js";
import { r as getRuntimeConfig } from "./io-BsQc3Kgy.js";
import "./agent-scope-DyEposw2.js";
import { t as safeEqualSecret } from "./secret-equal-DRsL8lKD.js";
import { b as resolveRequestClientIp } from "./net-B22ilI8B.js";
import { d as normalizeRateLimitClientIp, i as AUTH_RATE_LIMIT_SCOPE_HOOK_AUTH, u as createAuthRateLimiter } from "./auth-rate-limit-D67GPKfj.js";
import { h as runWithGatewayIndependentRootWorkContinuation } from "./gateway-work-admission-BaRJo64l.js";
import { a as resolveMainSessionKey, n as canonicalizeMainSessionAlias, r as resolveAgentMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { r as resolveHookExternalContentSource } from "./external-content-source-CzLOB3HH.js";
import "./external-content-NkkZExk2.js";
import { a as requestHeartbeat } from "./heartbeat-wake-D9__uym3.js";
import { a as enqueueSystemEvent } from "./system-events-BNZxjP0P.js";
import "./sessions-BqBqRT1f.js";
import { t as resolveMainSessionKeyFromConfig } from "./main-session.runtime.js";
import { t as resolveCronAgentSessionKey } from "./session-key-BFTxmFQN.js";
import { _ as resolveHookSessionKey, a as getHookSessionKeyPrefixError, b as applyHookMappings, c as normalizeAgentPayload, d as normalizeWakePayload, f as readJsonBody, g as resolveHookIdempotencyKey, h as resolveHookDeliver, i as getHookChannelError, l as normalizeHookDispatchSessionKey, m as resolveHookChannel, n as extractHookToken, o as isHookAgentAllowed, p as resolveEffectiveHookTargetAgentId, r as getHookAgentPolicyError, s as isSessionKeyAllowedByPrefix, u as normalizeHookHeaders, v as resolveHookTargetAgentId } from "./hooks-kjOfgOL9.js";
import { r as resolveOutboundChannelPlugin } from "./channel-resolution-DCE36-h8.js";
import { i as resolveChannelDefaultAccountId } from "./helpers-B381bECH.js";
import { n as validateExplicitMessageAccountSelection } from "./message-account-selection-DuJpJCUA.js";
import { n as DEDUPE_TTL_MS, t as DEDUPE_MAX } from "./server-constants-DKuFNbQH.js";
import { s as sendJson } from "./http-common-C1Esyf5_.js";
import { createHash, randomUUID } from "node:crypto";
//#region src/gateway/server/hooks-request-handler.ts
const HOOK_AUTH_FAILURE_LIMIT = 20;
const HOOK_AUTH_FAILURE_WINDOW_MS = 6e4;
function resolveMappedHookExternalContentSource(params) {
	if (params.subPath === "gmail") return "gmail";
	return resolveHookExternalContentSource(params.sessionKey) ?? "webhook";
}
function createHooksRequestHandler(opts) {
	const { getHooksConfig, logHooks, dispatchAgentHook, dispatchWakeHook, getClientIpConfig } = opts;
	const hookReplayCache = /* @__PURE__ */ new Map();
	const pendingHookReplays = /* @__PURE__ */ new Map();
	const hookAuthLimiter = createAuthRateLimiter({
		maxAttempts: HOOK_AUTH_FAILURE_LIMIT,
		windowMs: HOOK_AUTH_FAILURE_WINDOW_MS,
		lockoutMs: HOOK_AUTH_FAILURE_WINDOW_MS,
		exemptLoopback: false,
		pruneIntervalMs: 0
	});
	const resolveHookClientKey = (req) => {
		const clientIpConfig = getClientIpConfig?.();
		return normalizeRateLimitClientIp(resolveRequestClientIp(req, clientIpConfig?.trustedProxies, clientIpConfig?.allowRealIpFallback === true) ?? req.socket?.remoteAddress);
	};
	const pruneHookReplayCache = (now) => {
		const cutoff = now - DEDUPE_TTL_MS;
		for (const [key, entry] of hookReplayCache) if (entry.ts < cutoff) hookReplayCache.delete(key);
		pruneMapToMaxSize(hookReplayCache, DEDUPE_MAX);
	};
	const buildHookReplayCacheKey = (params) => {
		const idem = params.idempotencyKey?.trim();
		if (!idem) return;
		const tokenFingerprint = createHash("sha256").update(params.token ?? "", "utf8").digest("hex");
		const idempotencyFingerprint = createHash("sha256").update(idem, "utf8").digest("hex");
		return `${tokenFingerprint}:${createHash("sha256").update(JSON.stringify({
			pathKey: params.pathKey,
			dispatchScope: params.dispatchScope
		}), "utf8").digest("hex")}:${idempotencyFingerprint}`;
	};
	const resolveCachedHookRunId = (key, now) => {
		if (!key) return;
		pruneHookReplayCache(now);
		const cached = hookReplayCache.get(key);
		if (!cached) return;
		hookReplayCache.delete(key);
		hookReplayCache.set(key, cached);
		return cached.runId;
	};
	const rememberHookRunId = (key, runId, now) => {
		if (!key) return;
		hookReplayCache.delete(key);
		hookReplayCache.set(key, {
			ts: now,
			runId
		});
		pruneHookReplayCache(now);
	};
	const resolveHookReplay = (key, now) => {
		if (!key) return;
		const cachedRunId = resolveCachedHookRunId(key, now);
		if (cachedRunId) return {
			ok: true,
			runId: cachedRunId
		};
		return pendingHookReplays.get(key);
	};
	const dispatchAgentHookWithReplay = (key, now, dispatch) => {
		if (!key) return dispatch();
		const existing = resolveHookReplay(key, now);
		if (existing) return existing;
		const pending = Promise.resolve().then(dispatch).then((result) => {
			if (result.ok) rememberHookRunId(key, result.runId, now);
			return result;
		}).finally(() => {
			if (pendingHookReplays.get(key) === pending) pendingHookReplays.delete(key);
		});
		pendingHookReplays.set(key, pending);
		return pending;
	};
	const sendAgentDispatchResult = (res, result) => {
		if (result.ok) {
			sendJson(res, 200, {
				ok: true,
				runId: result.runId
			});
			return;
		}
		sendJson(res, result.statusCode, {
			ok: false,
			error: result.error,
			...result.runId ? { runId: result.runId } : {}
		});
	};
	return async (req, res) => {
		const hooksConfig = getHooksConfig();
		if (!hooksConfig) return false;
		const url = new URL(req.url ?? "/", "http://localhost");
		const basePath = hooksConfig.basePath;
		if (url.pathname !== basePath && !url.pathname.startsWith(`${basePath}/`)) return false;
		if (url.searchParams.has("token")) {
			res.statusCode = 400;
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.end("Hook token must be provided via Authorization: Bearer <token> or X-OpenClaw-Token header (query parameters are not allowed).");
			return true;
		}
		if (req.method !== "POST") {
			res.statusCode = 405;
			res.setHeader("Allow", "POST");
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.end("Method Not Allowed");
			return true;
		}
		const token = extractHookToken(req);
		const clientKey = resolveHookClientKey(req);
		if (!safeEqualSecret(token, hooksConfig.token)) {
			const throttle = hookAuthLimiter.check(clientKey, AUTH_RATE_LIMIT_SCOPE_HOOK_AUTH);
			if (!throttle.allowed) {
				const retryAfter = throttle.retryAfterMs > 0 ? Math.ceil(throttle.retryAfterMs / 1e3) : 1;
				res.statusCode = 429;
				res.setHeader("Retry-After", String(retryAfter));
				res.setHeader("Content-Type", "text/plain; charset=utf-8");
				res.end("Too Many Requests");
				logHooks.warn(`hook auth throttled for ${clientKey}; retry-after=${retryAfter}s`);
				return true;
			}
			hookAuthLimiter.recordFailure(clientKey, AUTH_RATE_LIMIT_SCOPE_HOOK_AUTH);
			res.statusCode = 401;
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.end("Unauthorized");
			return true;
		}
		hookAuthLimiter.reset(clientKey, AUTH_RATE_LIMIT_SCOPE_HOOK_AUTH);
		const subPath = url.pathname.slice(basePath.length).replace(/^\/+/, "");
		if (!subPath) {
			res.statusCode = 404;
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.end("Not Found");
			return true;
		}
		const body = await readJsonBody(req, hooksConfig.maxBodyBytes);
		if (!body.ok) {
			sendJson(res, body.error === "payload too large" ? 413 : body.error === "request body timeout" ? 408 : 400, {
				ok: false,
				error: body.error
			});
			return true;
		}
		const payload = typeof body.value === "object" && body.value !== null ? body.value : {};
		const headers = normalizeHookHeaders(req);
		const idempotencyKey = resolveHookIdempotencyKey({
			payload,
			headers
		});
		const now = Date.now();
		const resolveDispatchSessionKeyOrRespond = (sessionKeyValue, targetAgentId) => {
			const dispatchSessionKey = normalizeHookDispatchSessionKey({
				sessionKey: sessionKeyValue,
				targetAgentId
			});
			const allowedPrefixes = hooksConfig.sessionPolicy.allowedSessionKeyPrefixes;
			if (allowedPrefixes && !isSessionKeyAllowedByPrefix(dispatchSessionKey, allowedPrefixes)) {
				sendJson(res, 400, {
					ok: false,
					error: getHookSessionKeyPrefixError(allowedPrefixes)
				});
				return null;
			}
			return dispatchSessionKey;
		};
		if (subPath === "wake") {
			const normalized = normalizeWakePayload(payload);
			if (!normalized.ok) {
				sendJson(res, 400, {
					ok: false,
					error: normalized.error
				});
				return true;
			}
			dispatchWakeHook(normalized.value);
			sendJson(res, 200, {
				ok: true,
				mode: normalized.value.mode
			});
			return true;
		}
		if (subPath === "agent") {
			const normalized = normalizeAgentPayload(payload);
			if (!normalized.ok) {
				sendJson(res, 400, {
					ok: false,
					error: normalized.error
				});
				return true;
			}
			if (!isHookAgentAllowed(hooksConfig, normalized.value.agentId)) {
				sendJson(res, 400, {
					ok: false,
					error: getHookAgentPolicyError()
				});
				return true;
			}
			if (normalized.value.sessionMode === "persistent" && !normalized.value.sessionKey) {
				sendJson(res, 400, {
					ok: false,
					error: "sessionKey is required when sessionMode is persistent"
				});
				return true;
			}
			const sessionKey = resolveHookSessionKey({
				hooksConfig,
				source: "request",
				sessionKey: normalized.value.sessionKey
			});
			if (!sessionKey.ok) {
				sendJson(res, 400, {
					ok: false,
					error: sessionKey.error
				});
				return true;
			}
			if (normalized.value.sessionMode === "persistent" && !hooksConfig.sessionPolicy.allowedSessionKeyPrefixes?.length) {
				sendJson(res, 400, {
					ok: false,
					error: "hooks.allowedSessionKeyPrefixes is required when direct hook sessionMode is persistent"
				});
				return true;
			}
			const targetAgentId = resolveHookTargetAgentId(hooksConfig, normalized.value.agentId);
			const effectiveTargetAgentId = resolveEffectiveHookTargetAgentId(hooksConfig, normalized.value.agentId);
			const replayKey = buildHookReplayCacheKey({
				pathKey: "agent",
				token,
				idempotencyKey,
				dispatchScope: {
					agentId: effectiveTargetAgentId,
					sessionKey: normalized.value.sessionKey ?? hooksConfig.sessionPolicy.defaultSessionKey ?? null,
					message: normalized.value.message,
					name: normalized.value.name,
					wakeMode: normalized.value.wakeMode,
					sessionMode: normalized.value.sessionMode,
					deliver: normalized.value.deliver,
					channel: normalized.value.channel,
					to: normalized.value.to ?? null,
					accountId: normalized.value.accountId ?? null,
					model: normalized.value.model ?? null,
					thinking: normalized.value.thinking ?? null,
					timeoutSeconds: normalized.value.timeoutSeconds ?? null
				}
			});
			const replay = resolveHookReplay(replayKey, now);
			if (replay) {
				sendAgentDispatchResult(res, await replay);
				return true;
			}
			const dispatchSessionKey = resolveDispatchSessionKeyOrRespond(sessionKey.value, effectiveTargetAgentId);
			if (dispatchSessionKey === null) return true;
			const dispatched = await dispatchAgentHookWithReplay(replayKey, now, () => dispatchAgentHook({
				...normalized.value,
				idempotencyKey,
				sessionKey: dispatchSessionKey,
				sourcePath: `${basePath}/agent`,
				agentId: targetAgentId,
				externalContentSource: "webhook"
			}));
			sendAgentDispatchResult(res, dispatched);
			return true;
		}
		if (hooksConfig.mappings.length > 0) try {
			const mapped = await applyHookMappings(hooksConfig.mappings, {
				payload,
				headers,
				url,
				path: subPath
			});
			if (mapped) {
				if (!mapped.ok) {
					sendJson(res, 400, {
						ok: false,
						error: mapped.error
					});
					return true;
				}
				if (mapped.action === null) {
					res.statusCode = 204;
					res.end();
					return true;
				}
				if (mapped.action.kind === "wake") {
					const action = mapped.action;
					let targetAgentId;
					let dispatchSessionKey;
					if (action.agentId || action.sessionKey) {
						if (!isHookAgentAllowed(hooksConfig, action.agentId)) {
							sendJson(res, 400, {
								ok: false,
								error: getHookAgentPolicyError()
							});
							return true;
						}
						targetAgentId = resolveEffectiveHookTargetAgentId(hooksConfig, action.agentId);
						if (action.sessionKey) {
							const sessionKey = resolveHookSessionKey({
								hooksConfig,
								source: action.sessionKeySource === "static" ? "mapping-static" : "mapping-templated",
								sessionKey: action.sessionKey
							});
							if (!sessionKey.ok) {
								sendJson(res, 400, {
									ok: false,
									error: sessionKey.error
								});
								return true;
							}
							dispatchSessionKey = resolveDispatchSessionKeyOrRespond(sessionKey.value, targetAgentId) ?? void 0;
							if (!dispatchSessionKey) return true;
						}
					}
					dispatchWakeHook({
						text: action.text,
						mode: action.mode,
						...targetAgentId ? { agentId: targetAgentId } : {},
						...dispatchSessionKey ? { sessionKey: dispatchSessionKey } : {}
					});
					sendJson(res, 200, {
						ok: true,
						mode: action.mode
					});
					return true;
				}
				const action = mapped.action;
				const channel = resolveHookChannel(action.channel);
				if (!channel) {
					sendJson(res, 400, {
						ok: false,
						error: getHookChannelError()
					});
					return true;
				}
				const deliver = resolveHookDeliver(action.deliver);
				const delivery = deliver ? {
					mode: "announce",
					channel,
					to: action.to
				} : { mode: "none" };
				if (!isHookAgentAllowed(hooksConfig, action.agentId)) {
					sendJson(res, 400, {
						ok: false,
						error: getHookAgentPolicyError()
					});
					return true;
				}
				if (mapped.action.sessionMode === "persistent" && !mapped.action.sessionKey && !hooksConfig.sessionPolicy.defaultSessionKey) {
					sendJson(res, 400, {
						ok: false,
						error: "sessionKey or hooks.defaultSessionKey is required when mapped hook sessionMode is persistent"
					});
					return true;
				}
				const sessionKey = resolveHookSessionKey({
					hooksConfig,
					source: action.sessionKeySource === "static" ? "mapping-static" : "mapping-templated",
					sessionKey: action.sessionKey
				});
				if (!sessionKey.ok) {
					sendJson(res, 400, {
						ok: false,
						error: sessionKey.error
					});
					return true;
				}
				const targetAgentId = resolveHookTargetAgentId(hooksConfig, action.agentId);
				const effectiveTargetAgentId = resolveEffectiveHookTargetAgentId(hooksConfig, action.agentId);
				const dispatchSessionKey = resolveDispatchSessionKeyOrRespond(sessionKey.value, effectiveTargetAgentId);
				if (dispatchSessionKey === null) return true;
				const replayKey = buildHookReplayCacheKey({
					pathKey: subPath || "mapping",
					token,
					idempotencyKey,
					dispatchScope: {
						agentId: effectiveTargetAgentId,
						sessionKey: action.sessionKey ?? hooksConfig.sessionPolicy.defaultSessionKey ?? null,
						message: action.message,
						name: action.name ?? "Hook",
						wakeMode: action.wakeMode,
						sessionMode: action.sessionMode,
						deliver,
						channel,
						to: action.to ?? null,
						model: action.model ?? null,
						thinking: action.thinking ?? null,
						timeoutSeconds: action.timeoutSeconds ?? null
					}
				});
				const replay = resolveHookReplay(replayKey, now);
				if (replay) {
					sendAgentDispatchResult(res, await replay);
					return true;
				}
				const dispatched = await dispatchAgentHookWithReplay(replayKey, now, () => dispatchAgentHook({
					message: action.message,
					name: action.name ?? "Hook",
					idempotencyKey,
					agentId: targetAgentId,
					wakeMode: action.wakeMode,
					sessionKey: dispatchSessionKey,
					sessionMode: action.sessionMode,
					sourcePath: `${basePath}/${subPath}`,
					deliver,
					channel,
					to: action.to,
					delivery,
					model: action.model,
					thinking: action.thinking,
					timeoutSeconds: action.timeoutSeconds,
					allowUnsafeExternalContent: action.allowUnsafeExternalContent,
					externalContentSource: resolveMappedHookExternalContentSource({
						subPath,
						sessionKey: sessionKey.value
					})
				}));
				sendAgentDispatchResult(res, dispatched);
				return true;
			}
		} catch (err) {
			logHooks.warn(`hook mapping failed: ${String(err)}`);
			sendJson(res, 500, {
				ok: false,
				error: "hook mapping failed"
			});
			return true;
		}
		res.statusCode = 404;
		res.setHeader("Content-Type", "text/plain; charset=utf-8");
		res.end("Not Found");
		return true;
	};
}
//#endregion
//#region src/gateway/server/hooks.ts
const HOOK_AGENT_START_ADMISSION_TIMEOUT_MS = 15e3;
const HOOK_AGENT_START_ADMISSION_TIMEOUT_ERROR = "hook agent run did not start before admission timeout";
const HOOK_AGENT_SESSION_CONFLICT_ERROR = "hook agent run was rejected because the target session changed";
const HOOK_AGENT_PREPARATION_ERROR = "hook agent run failed before entering the agent runner";
function resolveHookEventSessionKey(params) {
	return params.agentId ? resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	}) : resolveMainSessionKey(params.cfg);
}
function shouldAnnounceHookRunResult(params) {
	if (params.result.status !== "ok") return true;
	return params.deliver && params.result.delivered !== true && params.result.deliveryAttempted !== true;
}
function resolveHookRunSummary(result) {
	return (result.status !== "ok" ? normalizeOptionalString(result.diagnostics?.summary) : void 0) || normalizeOptionalString(result.summary) || normalizeOptionalString(result.error) || result.status;
}
function sanitizeHookConsoleValue(value) {
	const normalized = normalizeOptionalString(value);
	if (!normalized) return;
	return truncateUtf16Safe(Array.from(normalized, (char) => {
		const code = char.charCodeAt(0);
		return code < 32 || code === 127 ? " " : char;
	}).join("").replace(/\s+/gu, " ").trim(), 500);
}
function formatHookRunWarningConsoleMessage(params) {
	const parts = ["hook agent run returned non-ok status", `status=${sanitizeHookConsoleValue(params.status) ?? "unknown"}`];
	const model = sanitizeHookConsoleValue(params.model);
	if (model) parts.push(`model=${model}`);
	const summary = sanitizeHookConsoleValue(params.summary);
	if (summary) parts.push(`summary=${summary}`);
	return parts.join(" ");
}
function createHookAdmissionFailure(params) {
	const statusCode = params.statusCode ?? (params.disposition === "session-conflict" ? 409 : 502);
	return {
		ok: false,
		statusCode,
		error: statusCode === 409 ? HOOK_AGENT_SESSION_CONFLICT_ERROR : statusCode === 503 ? HOOK_AGENT_START_ADMISSION_TIMEOUT_ERROR : HOOK_AGENT_PREPARATION_ERROR,
		runId: params.runId
	};
}
function createSessionKeyedHookDispatchQueue() {
	const hookAgentDispatchTails = /* @__PURE__ */ new Map();
	return (sessionKey, operation) => {
		const previousTail = hookAgentDispatchTails.get(sessionKey);
		const run = previousTail ? previousTail.catch(() => void 0).then(operation) : operation();
		const tail = run.then(() => void 0, () => void 0);
		hookAgentDispatchTails.set(sessionKey, tail);
		tail.finally(() => {
			if (hookAgentDispatchTails.get(sessionKey) === tail) hookAgentDispatchTails.delete(sessionKey);
		});
		return run;
	};
}
function validateHookAgentDeliveryAccount(params) {
	if (params.value.delivery.mode !== "announce" || params.value.delivery.channel === "last" || !params.value.delivery.to) return params.value;
	const accountId = params.value.delivery.accountId ? validateExplicitMessageAccountSelection({
		cfg: params.cfg,
		channel: params.value.delivery.channel,
		accountId: params.value.delivery.accountId
	}) : (() => {
		const plugin = resolveOutboundChannelPlugin({
			channel: params.value.delivery.channel,
			cfg: params.cfg
		});
		if (!plugin) throw new Error(`Channel ${params.value.delivery.channel} is unavailable.`);
		return resolveChannelDefaultAccountId({
			plugin,
			cfg: params.cfg
		});
	})();
	if (!accountId) throw new Error(`Channel ${params.value.delivery.channel} did not resolve an account.`);
	return {
		...params.value,
		accountId,
		delivery: {
			...params.value.delivery,
			accountId
		}
	};
}
/** Creates the HTTP handler used by gateway hook endpoints. */
function createGatewayHooksRequestHandler(params) {
	const { deps, getHooksConfig, getClientIpConfig, bindHost, port, logHooks, agentStartAdmissionTimeoutMs = HOOK_AGENT_START_ADMISSION_TIMEOUT_MS } = params;
	const enqueueHookAgentDispatch = createSessionKeyedHookDispatchQueue();
	let isolatedAgentModulePromise;
	const loadIsolatedAgentModule = () => isolatedAgentModulePromise ??= import("./isolated-agent-CuxRP4BP.js");
	const dispatchWakeHook = (value) => {
		const target = Boolean(value.agentId || value.sessionKey) ? (() => {
			const cfg = getRuntimeConfig();
			const agentId = value.agentId ?? resolveDefaultAgentId(cfg);
			if (cfg.session?.scope === "global") return {
				eventSessionKey: "global",
				heartbeatTarget: { agentId }
			};
			const eventSessionKey = canonicalizeMainSessionAlias({
				cfg,
				agentId,
				sessionKey: value.sessionKey ? toAgentStoreSessionKey({
					agentId,
					requestKey: value.sessionKey,
					mainKey: cfg.session?.mainKey
				}) : resolveAgentMainSessionKey({
					cfg,
					agentId
				})
			});
			return {
				eventSessionKey,
				heartbeatTarget: {
					agentId,
					sessionKey: eventSessionKey
				}
			};
		})() : void 0;
		const sessionKey = target?.eventSessionKey ?? resolveMainSessionKeyFromConfig();
		enqueueSystemEvent(value.text, { sessionKey });
		if (value.mode === "now") requestHeartbeat({
			source: "hook",
			intent: "immediate",
			reason: "hook:wake",
			...target?.heartbeatTarget
		});
	};
	const dispatchAgentHook = async (value) => {
		const sessionKey = value.sessionKey;
		const safeName = sanitizeHookConsoleValue(value.name) ?? "Hook";
		const jobId = randomUUID();
		const runId = randomUUID();
		const nowMs = resolveDateTimestampMs(Date.now());
		const job = {
			id: jobId,
			agentId: value.agentId,
			name: safeName,
			enabled: true,
			createdAtMs: nowMs,
			updatedAtMs: nowMs,
			schedule: {
				kind: "at",
				at: resolveTimestampMsToIsoString(nowMs)
			},
			sessionTarget: value.sessionMode === "persistent" ? `session:${sessionKey}` : "isolated",
			wakeMode: value.wakeMode,
			payload: {
				kind: "agentTurn",
				message: value.message,
				model: value.model,
				thinking: value.thinking,
				timeoutSeconds: value.timeoutSeconds,
				allowUnsafeExternalContent: value.allowUnsafeExternalContent,
				externalContentSource: value.externalContentSource
			},
			delivery: value.delivery,
			state: { nextRunAtMs: nowMs }
		};
		let hookEventSessionKey;
		const reportHookFailure = (err) => {
			logHooks.warn(`hook agent failed: ${String(err)}`);
			enqueueSystemEvent(`Hook ${safeName} (error): ${String(err)}`, { sessionKey: hookEventSessionKey ?? resolveMainSessionKeyFromConfig() });
			if (value.wakeMode === "now") requestHeartbeat({
				source: "hook",
				intent: "immediate",
				reason: `hook:${jobId}:error`
			});
		};
		let dispatchCfg;
		try {
			dispatchCfg = getRuntimeConfig();
		} catch (err) {
			runWithGatewayIndependentRootWorkContinuation(async () => reportHookFailure(err));
			return createHookAdmissionFailure({ runId });
		}
		let acceptedValue;
		try {
			acceptedValue = validateHookAgentDeliveryAccount({
				cfg: dispatchCfg,
				value
			});
			job.delivery = acceptedValue.delivery;
		} catch (err) {
			return {
				ok: false,
				statusCode: 400,
				error: formatErrorMessage(err),
				runId
			};
		}
		const agentId = acceptedValue.agentId ?? resolveDefaultAgentId(dispatchCfg);
		const queueKey = resolveCronAgentSessionKey({
			sessionKey,
			agentId,
			mainKey: dispatchCfg.session?.mainKey,
			cfg: dispatchCfg
		});
		let settleAdmission;
		let admissionSettled = false;
		let admissionTimedOut = false;
		let admissionTimer;
		const admission = new Promise((resolve) => {
			settleAdmission = (result) => {
				if (admissionSettled) return;
				admissionSettled = true;
				if (admissionTimer) {
					clearTimeout(admissionTimer);
					admissionTimer = void 0;
				}
				resolve(result);
			};
		});
		const admissionTimeoutError = /* @__PURE__ */ new Error(HOOK_AGENT_START_ADMISSION_TIMEOUT_ERROR);
		const startupAbortController = new AbortController();
		admissionTimer = setTimeout(() => {
			admissionTimedOut = true;
			startupAbortController.abort(admissionTimeoutError);
			settleAdmission(createHookAdmissionFailure({
				runId,
				statusCode: 503
			}));
		}, agentStartAdmissionTimeoutMs);
		admissionTimer.unref?.();
		runWithGatewayIndependentRootWorkContinuation(() => enqueueHookAgentDispatch(queueKey, async () => {
			if (startupAbortController.signal.aborted) return;
			try {
				const cfg = getRuntimeConfig();
				try {
					validateHookAgentDeliveryAccount({
						cfg,
						value: acceptedValue
					});
				} catch (err) {
					settleAdmission({
						ok: false,
						statusCode: 400,
						error: formatErrorMessage(err),
						runId
					});
					return;
				}
				hookEventSessionKey = resolveHookEventSessionKey({
					cfg,
					agentId: acceptedValue.agentId
				});
				const { runCronIsolatedAgentTurn } = await loadIsolatedAgentModule();
				if (startupAbortController.signal.aborted) return;
				const result = await runCronIsolatedAgentTurn({
					cfg,
					deps,
					job,
					message: acceptedValue.message,
					sessionKey,
					agentId,
					lane: "hook-dispatch",
					abortSignal: startupAbortController.signal,
					onExecutionStarted: () => {
						startupAbortController.signal.throwIfAborted();
						settleAdmission({
							ok: true,
							runId
						});
					}
				});
				if (admissionTimedOut) return;
				const summary = resolveHookRunSummary(result);
				if (!admissionSettled) settleAdmission(result.status === "ok" || result.executionStarted === true ? {
					ok: true,
					runId
				} : createHookAdmissionFailure({
					runId,
					disposition: result.admissionDisposition
				}));
				const prefix = result.status === "ok" ? `Hook ${safeName}` : `Hook ${safeName} (${result.status})`;
				const shouldAnnounce = shouldAnnounceHookRunResult({
					deliver: value.deliver,
					result
				});
				if (result.status !== "ok") logHooks.warn("hook agent run returned non-ok status", {
					sourcePath: value.sourcePath,
					name: safeName,
					runId,
					jobId,
					agentId: value.agentId,
					sessionKey,
					status: result.status,
					model: value.model,
					summary,
					consoleMessage: formatHookRunWarningConsoleMessage({
						status: result.status,
						model: value.model,
						summary
					})
				});
				if (shouldAnnounce) {
					const eventSessionKey = hookEventSessionKey ?? resolveMainSessionKeyFromConfig();
					enqueueSystemEvent(`${prefix}: ${summary}`.trim(), { sessionKey: eventSessionKey });
					if (value.wakeMode === "now") requestHeartbeat({
						source: "hook",
						intent: "immediate",
						reason: `hook:${jobId}`
					});
				} else if (result.status === "ok" && !value.deliver) logHooks.info("hook agent run completed without announcement", {
					sourcePath: value.sourcePath,
					name: safeName,
					runId,
					jobId,
					agentId: value.agentId,
					sessionKey,
					completedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
			} catch (err) {
				if (admissionTimedOut) return;
				settleAdmission(createHookAdmissionFailure({ runId }));
				reportHookFailure(err);
			}
		})).catch((err) => {
			if (admissionTimedOut) return;
			settleAdmission(createHookAdmissionFailure({ runId }));
			reportHookFailure(err);
		});
		return await admission;
	};
	return createHooksRequestHandler({
		getHooksConfig,
		bindHost,
		port,
		logHooks,
		getClientIpConfig,
		dispatchAgentHook,
		dispatchWakeHook
	});
}
//#endregion
export { createGatewayHooksRequestHandler };
