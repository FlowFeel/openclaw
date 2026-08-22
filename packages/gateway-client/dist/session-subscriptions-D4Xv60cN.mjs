import { clearGatewayConnectTimeout, startGatewayConnectTimeout } from "./timeouts.mjs";
import { ConnectErrorDetailCodes, readConnectErrorDetailCode, readConnectErrorRecoveryAdvice, readPairingConnectErrorDetails } from "@openclaw/gateway-protocol/connect-error-details";
import { isGatewayEventFrame, isGatewayResponseFrame } from "@openclaw/gateway-protocol/frame-guards";
//#region packages/gateway-client/src/device-auth.ts
function normalizeDeviceMetadataForAuth(value) {
	if (typeof value !== "string") return "";
	const trimmed = value.trim();
	if (!trimmed) return "";
	return trimmed.replace(/[A-Z]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 32));
}
function buildDeviceAuthPayload(params) {
	const scopes = params.scopes.join(",");
	const token = params.token ?? "";
	return [
		"v2",
		params.deviceId,
		params.clientId,
		params.clientMode,
		params.role,
		scopes,
		String(params.signedAtMs),
		token,
		params.nonce
	].join("|");
}
function buildDeviceAuthPayloadV3(params) {
	const scopes = params.scopes.join(",");
	const token = params.token ?? "";
	const platform = normalizeDeviceMetadataForAuth(params.platform);
	const deviceFamily = normalizeDeviceMetadataForAuth(params.deviceFamily);
	return [
		"v3",
		params.deviceId,
		params.clientId,
		params.clientMode,
		params.role,
		scopes,
		String(params.signedAtMs),
		token,
		params.nonce,
		platform,
		deviceFamily
	].join("|");
}
//#endregion
//#region packages/gateway-client/src/connect-auth.ts
function normalized(value) {
	return typeof value === "string" ? value.trim() || void 0 : void 0;
}
function selectGatewayConnectAuth(params) {
	const authToken = normalized(params.token);
	const bootstrapToken = normalized(params.bootstrapToken);
	const explicitDeviceToken = normalized(params.deviceToken);
	const authPassword = normalized(params.password);
	const storedToken = normalized(params.storedToken);
	const stored = {
		storedToken,
		storedScopes: params.storedScopes
	};
	if (params.preferBootstrapToken && bootstrapToken) return {
		authBootstrapToken: bootstrapToken,
		authPassword,
		...stored
	};
	const useRetryToken = params.pendingDeviceTokenRetry === true && !explicitDeviceToken && Boolean(authToken && storedToken && params.trustedDeviceTokenRetry);
	const resolvedDeviceToken = explicitDeviceToken ?? (useRetryToken || !(authToken || authPassword) && (!bootstrapToken || storedToken) ? storedToken : void 0);
	const usingStoredDeviceToken = Boolean(resolvedDeviceToken && !explicitDeviceToken && storedToken) && resolvedDeviceToken === storedToken;
	const selectedToken = authToken ?? resolvedDeviceToken;
	const authBootstrapToken = !authToken && !resolvedDeviceToken && !authPassword ? bootstrapToken : void 0;
	return {
		authToken: selectedToken,
		authBootstrapToken,
		authDeviceToken: useRetryToken ? storedToken : void 0,
		authPassword,
		authApprovalRuntimeToken: normalized(params.approvalRuntimeToken),
		authAgentRuntimeIdentityToken: normalized(params.agentRuntimeIdentityToken),
		signatureToken: selectedToken ?? authBootstrapToken,
		resolvedDeviceToken,
		usingStoredDeviceToken,
		...stored
	};
}
function buildGatewayConnectAuth(selected) {
	const auth = {
		token: selected.authToken,
		bootstrapToken: selected.authBootstrapToken,
		deviceToken: selected.authDeviceToken ?? selected.resolvedDeviceToken,
		password: selected.authPassword,
		approvalRuntimeToken: selected.authApprovalRuntimeToken,
		agentRuntimeIdentityToken: selected.authAgentRuntimeIdentityToken
	};
	return Object.values(auth).some(Boolean) ? auth : void 0;
}
function resolveGatewayConnectScopes(params) {
	return params.requestedScopes ?? (params.usingStoredDeviceToken && params.storedScopes?.length ? params.storedScopes : [...params.defaultScopes]);
}
function shouldRetryGatewayWithDeviceToken(params) {
	if (params.retryBudgetUsed || params.currentDeviceToken || !params.explicitToken || !params.storedToken || !params.trustedEndpoint) return false;
	const advice = readConnectErrorRecoveryAdvice(params.errorDetails);
	return params.canRetryWithDeviceTokenHint === true || advice.canRetryWithDeviceToken === true || advice.recommendedNextStep === "retry_with_device_token" || readConnectErrorDetailCode(params.errorDetails) === ConnectErrorDetailCodes.AUTH_TOKEN_MISMATCH;
}
//#endregion
//#region packages/gateway-client/src/browser-device-auth.ts
/** Browser-safe device pairing and issued-token lifecycle shared by first-party UI clients. */
var GatewayBrowserDeviceAuthLifecycle = class {
	constructor(deps) {
		this.deps = deps;
	}
	async buildPlan(params) {
		const identity = await this.deps.loadIdentity();
		const stored = identity ? await this.deps.tokenStore.load({
			clientId: params.client.id,
			deviceId: identity.deviceId,
			role: params.role
		}) : null;
		const storedValue = stored?.token;
		const selectedAuth = selectGatewayConnectAuth({
			token: params.token,
			bootstrapToken: params.bootstrapToken,
			password: params.password,
			storedToken: storedValue,
			storedScopes: stored?.scopes,
			pendingDeviceTokenRetry: params.pendingDeviceTokenRetry,
			trustedDeviceTokenRetry: params.trustedDeviceTokenRetry,
			preferBootstrapToken: params.preferBootstrapToken
		});
		const { usingStoredDeviceToken } = selectedAuth;
		const scopes = resolveGatewayConnectScopes({
			requestedScopes: selectedAuth.authBootstrapToken ? params.bootstrapScopes ? [...params.bootstrapScopes] : void 0 : void 0,
			usingStoredDeviceToken,
			storedScopes: selectedAuth.storedScopes,
			defaultScopes: params.defaultScopes
		});
		if (!identity) return {
			clientId: params.client.id,
			role: params.role,
			identity,
			selectedAuth,
			scopes,
			auth: buildGatewayConnectAuth(selectedAuth)
		};
		const signedAtMs = params.challengeTs === void 0 ? this.deps.nowMs?.() ?? Date.now() : params.challengeTs;
		if (typeof signedAtMs !== "number" || !Number.isSafeInteger(signedAtMs) || signedAtMs < 0) throw new Error("gateway connect challenge timestamp invalid");
		const nonce = params.nonce ?? "";
		const { authBootstrapToken: primary, signatureToken: signed } = selectedAuth;
		let token = null;
		if (primary) token = primary;
		else if (signed) token = signed;
		const payload = buildDeviceAuthPayloadV3({
			deviceId: identity.deviceId,
			clientId: params.client.id,
			clientMode: params.client.mode,
			role: params.role,
			scopes,
			signedAtMs,
			token,
			nonce,
			platform: params.client.platform,
			deviceFamily: params.client.deviceFamily
		});
		return {
			clientId: params.client.id,
			role: params.role,
			identity,
			selectedAuth,
			scopes,
			auth: buildGatewayConnectAuth(selectedAuth),
			device: {
				id: identity.deviceId,
				publicKey: identity.publicKey,
				signature: await identity.sign(payload),
				signedAt: signedAtMs,
				nonce
			}
		};
	}
	async acceptHello(hello, plan) {
		const token = hello.auth?.deviceToken?.trim();
		if (!token || !plan.identity) return;
		await this.deps.tokenStore.store({
			clientId: plan.clientId,
			deviceId: plan.identity.deviceId,
			role: hello.auth?.role ?? plan.role,
			token,
			scopes: hello.auth?.scopes ?? []
		});
	}
	async clearStoredToken(plan) {
		if (!plan.identity) return;
		await this.deps.tokenStore.clear({
			clientId: plan.clientId,
			deviceId: plan.identity.deviceId,
			role: plan.role
		});
	}
};
//#endregion
//#region packages/retry/src/index.ts
const MAX_TIMER_TIMEOUT_MS = 2147e6;
function computeBackoff(policy, attempt) {
	const base = Math.min(policy.maxMs, policy.initialMs * policy.factor ** Math.max(attempt - 1, 0));
	const jitter = base * policy.jitter * Math.random();
	return Math.min(policy.maxMs, Math.round(base + jitter));
}
async function sleepWithAbort(ms, abortSignal, options = {}) {
	if (!Number.isFinite(ms) || ms <= 0) return;
	const delayMs = Math.min(Math.max(Math.floor(ms), 1), MAX_TIMER_TIMEOUT_MS);
	await new Promise((resolve, reject) => {
		let settled = false;
		let timer = null;
		const cleanup = () => abortSignal?.removeEventListener("abort", onAbort);
		const onAbort = () => {
			if (settled) return;
			settled = true;
			if (timer) clearTimeout(timer);
			timer = null;
			cleanup();
			reject(new Error("aborted", { cause: abortSignal?.reason ?? /* @__PURE__ */ new Error("aborted") }));
		};
		abortSignal?.addEventListener("abort", onAbort, { once: true });
		if (abortSignal?.aborted) {
			onAbort();
			return;
		}
		timer = setTimeout(() => {
			settled = true;
			cleanup();
			timer = null;
			resolve();
		}, delayMs);
		if (options.ref === false) timer.unref?.();
		if (abortSignal?.aborted) onAbort();
	});
}
var RetrySupervisor = class {
	constructor(policy, maxAttempts = Number.POSITIVE_INFINITY) {
		this.policy = policy;
		this.maxAttempts = maxAttempts;
		this.attempts = 0;
		this.initialMs = policy.initialMs;
	}
	reset(initialMs = this.policy.initialMs) {
		this.cancel();
		this.attempts = 0;
		this.initialMs = initialMs;
		this.nextDelayOverrideMs = void 0;
	}
	cancel(reason = /* @__PURE__ */ new Error("retry cancelled")) {
		this.pendingAbort?.abort(reason);
		this.pendingAbort = void 0;
	}
	next(abortSignal) {
		const override = this.nextDelayOverrideMs;
		this.nextDelayOverrideMs = void 0;
		if (override === void 0 && ++this.attempts > Math.ceil(this.maxAttempts)) return;
		const attempt = Math.max(this.attempts, 1);
		const delayMs = override ?? computeBackoff({
			...this.policy,
			initialMs: this.initialMs
		}, attempt);
		this.cancel();
		const pendingAbort = new AbortController();
		this.pendingAbort = pendingAbort;
		return {
			attempt,
			delayMs,
			signal: abortSignal ? AbortSignal.any([pendingAbort.signal, abortSignal]) : pendingAbort.signal
		};
	}
};
const DEFAULT_RETRY_CONFIG = {
	attempts: 3,
	minDelayMs: 300,
	maxDelayMs: 3e4,
	jitter: 0
};
const defaultSleep = (ms) => new Promise((resolve) => {
	setTimeout(resolve, ms);
});
function asFiniteNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function clampNumber(value, fallback, min, max) {
	const next = asFiniteNumber(value);
	if (next === void 0) return fallback;
	return Math.min(Math.max(next, min ?? Number.NEGATIVE_INFINITY), max ?? Number.POSITIVE_INFINITY);
}
function resolveAttemptCount(value, fallback) {
	return Math.max(1, Math.round(asFiniteNumber(value) ?? fallback));
}
function resolveRetryDelayMs(value) {
	const finite = value === Number.POSITIVE_INFINITY ? MAX_TIMER_TIMEOUT_MS : asFiniteNumber(value) ?? 0;
	return Math.min(Math.max(Math.round(finite), 0), MAX_TIMER_TIMEOUT_MS);
}
function resolveJitterConfig(value, fallback) {
	if (value === "full") return "full";
	const fraction = asFiniteNumber(value);
	return fraction === void 0 ? fallback : Math.min(Math.max(fraction, 0), 1);
}
function resolveRetryConfig(defaults = DEFAULT_RETRY_CONFIG, overrides) {
	const attempts = resolveAttemptCount(overrides?.attempts, defaults.attempts);
	const minDelayMs = resolveRetryDelayMs(clampNumber(overrides?.minDelayMs, defaults.minDelayMs, 0));
	return {
		attempts,
		minDelayMs,
		maxDelayMs: Math.max(minDelayMs, resolveRetryDelayMs(clampNumber(overrides?.maxDelayMs, defaults.maxDelayMs, 0))),
		jitter: resolveJitterConfig(overrides?.jitter, defaults.jitter)
	};
}
function applyJitter(delayMs, jitter, mode, random) {
	if (jitter === "full") {
		if (mode === "symmetric") return Math.max(0, Math.round(delayMs * (.5 + random() * .5)));
		return Math.max(0, Math.ceil(delayMs * (1 + random())));
	}
	if (jitter <= 0) return mode === "positive" ? Math.ceil(delayMs) : delayMs;
	const fraction = random();
	const raw = delayMs * (1 + (mode === "positive" ? fraction * jitter : (fraction * 2 - 1) * jitter));
	return Math.max(0, mode === "positive" ? Math.ceil(raw) : Math.round(raw));
}
function toRetryError(value, fallbackMessage = "Non-Error thrown") {
	if (value instanceof Error) return value;
	if (typeof value === "string") return new Error(value);
	const error = new Error(fallbackMessage, { cause: value });
	if (typeof value === "object" && value !== null || typeof value === "function") Object.assign(error, value);
	return error;
}
function createRetryRunner(runtime = {}) {
	const runtimeSleep = runtime.sleep ?? defaultSleep;
	const runtimeRandom = runtime.random ?? Math.random;
	const createFailure = runtime.createFailure ?? ((errors) => toRetryError(errors.at(-1) ?? /* @__PURE__ */ new Error("Retry failed")));
	return async function retryAsync(fn, attemptsOrOptions = 3, initialDelayMs = 300) {
		const attemptErrors = [];
		if (typeof attemptsOrOptions === "number") {
			const attempts = resolveAttemptCount(attemptsOrOptions, DEFAULT_RETRY_CONFIG.attempts);
			for (let index = 0; index < attempts; index += 1) try {
				return await fn();
			} catch (err) {
				attemptErrors.push(err);
				if (index === attempts - 1) break;
				await runtimeSleep(resolveRetryDelayMs(initialDelayMs * 2 ** index));
			}
			throw createFailure(attemptErrors);
		}
		const options = attemptsOrOptions;
		const resolved = resolveRetryConfig(DEFAULT_RETRY_CONFIG, options);
		const maxAttempts = resolved.attempts;
		const minDelayMs = resolved.minDelayMs;
		const maxDelayMs = resolved.maxDelayMs > 0 ? resolved.maxDelayMs : Number.POSITIVE_INFINITY;
		const retryAfterMaxDelayMs = options.retryAfterMaxDelayMs === void 0 ? maxDelayMs : Math.max(minDelayMs, resolveRetryDelayMs(clampNumber(options.retryAfterMaxDelayMs, maxDelayMs, 0)));
		const random = options.random ?? runtimeRandom;
		const sleep = options.sleep ?? runtimeSleep;
		const shouldRetry = options.shouldRetry ?? (() => true);
		for (let attempt = 1; attempt <= maxAttempts; attempt += 1) try {
			return await fn();
		} catch (err) {
			attemptErrors.push(err);
			if (attempt >= maxAttempts || !shouldRetry(err, attempt)) break;
			const context = {
				attempt,
				maxAttempts,
				err,
				label: options.label
			};
			const retryAfterMs = options.retryAfterMs?.(err);
			const hasRetryAfter = typeof retryAfterMs === "number" && Number.isFinite(retryAfterMs);
			const configuredDelay = typeof options.delayMs === "function" ? options.delayMs(context) : options.delayMs;
			const resolvedConfiguredDelay = configuredDelay === void 0 ? void 0 : resolveRetryDelayMs(configuredDelay);
			const baseDelay = hasRetryAfter ? Math.max(retryAfterMs, minDelayMs) : resolvedConfiguredDelay === void 0 ? minDelayMs * 2 ** (attempt - 1) : Math.max(resolvedConfiguredDelay, minDelayMs);
			const delayCap = hasRetryAfter ? retryAfterMaxDelayMs : maxDelayMs;
			let delay = Math.min(baseDelay, delayCap);
			const canHonorRetryAfter = hasRetryAfter && (retryAfterMs ?? 0) <= delayCap;
			const wantsPositiveDraw = resolved.jitter === "full" ? !hasRetryAfter || canHonorRetryAfter : canHonorRetryAfter;
			delay = applyJitter(delay, resolved.jitter, wantsPositiveDraw ? "positive" : "symmetric", random);
			delay = Math.min(Math.max(delay, minDelayMs), delayCap);
			await options.onRetry?.({
				...context,
				delayMs: delay
			});
			if (delay > 0) await sleep(delay);
		}
		throw createFailure(attemptErrors);
	};
}
createRetryRunner();
//#endregion
//#region packages/gateway-client/src/event-listeners.ts
/** Subscription identity prevents old frames and disposers from reviving callbacks. */
var GatewayEventListeners = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Map();
	}
	add(listener) {
		const subscription = this.listeners.get(listener) ?? {};
		this.listeners.set(listener, subscription);
		return () => {
			if (this.listeners.get(listener) === subscription) this.listeners.delete(listener);
		};
	}
	snapshot() {
		return [...this.listeners];
	}
	isCurrent(listener, subscription) {
		return this.listeners.get(listener) === subscription;
	}
};
//#endregion
//#region packages/gateway-client/src/protocol-request.ts
var GatewayProtocolRequestError = class extends Error {
	constructor(error) {
		super(error.message ?? "request failed");
		this.name = "GatewayProtocolRequestError";
		this.code = error.code ?? "UNAVAILABLE";
		this.gatewayCode = this.code;
		this.details = error.details;
		this.retryable = error.retryable === true;
		this.retryAfterMs = error.retryAfterMs;
	}
};
//#endregion
//#region packages/gateway-client/src/protocol-client.ts
/**
* Browser-safe gateway wire client. Environment adapters own transport and auth
* policy; this class owns the single socket/handshake/reconnect/frame state machine.
*/
var GatewayProtocolClient = class {
	constructor(opts) {
		this.opts = opts;
		this.socket = null;
		this.pending = /* @__PURE__ */ new Map();
		this.listeners = new GatewayEventListeners();
		this.stopped = true;
		this.generation = 0;
		this.lastSeq = null;
		this.connectNonce = null;
		this.connectSent = false;
		this.connectRequestSent = false;
		this.handshakeTimer = null;
		this.reconnectSignal = null;
		this.socketOpened = false;
		this.helloReceived = false;
		this.connectTiming = null;
		this.reconnectSupervisor = new RetrySupervisor({
			initialMs: opts.reconnect.initialMs,
			maxMs: opts.reconnect.maxMs,
			factor: opts.reconnect.multiplier,
			jitter: 0
		});
	}
	get connected() {
		return this.socket?.isOpen() ?? false;
	}
	get hasPendingRequests() {
		return this.pending.size > 0;
	}
	get connecting() {
		return this.connectSent && !this.helloReceived;
	}
	get hasUnboundedPendingRequests() {
		return [...this.pending.values()].some((pending) => pending.unbounded);
	}
	start() {
		if (this.socket || this.reconnectSignal) return;
		this.stopped = false;
		this.reconnectSupervisor.cancel();
		this.connect();
	}
	stop() {
		this.stopped = true;
		this.clearHandshakeTimer();
		this.reconnectSignal = null;
		this.reconnectSupervisor.reset();
		const socket = this.socket;
		if (socket && this.opts.notifyStoppedClose) this.stoppedSocket = {
			socket,
			context: this.closeContext()
		};
		this.socket = null;
		this.connectFailure = void 0;
		this.connectTiming = null;
		this.flushRequests(/* @__PURE__ */ new Error("gateway client stopped"));
		socket?.close();
	}
	request(method, params, options) {
		const socket = this.socket;
		if (!socket?.isOpen()) return Promise.reject(/* @__PURE__ */ new Error("gateway not connected"));
		if (typeof method !== "string" || method.length === 0) return Promise.reject(/* @__PURE__ */ new Error("invalid request frame: method must be a non-empty string"));
		const id = this.opts.createRequestId();
		const timeoutMs = options?.timeoutMs === null ? void 0 : options?.timeoutMs ?? this.opts.requestTimeoutMs;
		return new Promise((resolve, reject) => {
			let timeout;
			let requestSent = false;
			const pending = {
				resolve: (value) => resolve(value),
				reject,
				expectFinal: options?.expectFinal === true,
				acceptedNotified: false,
				onAccepted: options?.onAccepted,
				unbounded: timeoutMs === void 0,
				method,
				startedAtMs: this.nowMs()
			};
			const onAbort = () => {
				this.pending.delete(id);
				pending.cleanup?.();
				this.finishRequestTiming(id, pending, false, "CLIENT_ABORTED");
				reject(this.opts.createRequestAbortError?.(method) ?? /* @__PURE__ */ new Error(`gateway request aborted for ${method}`));
			};
			const cleanup = () => {
				if (timeout) clearTimeout(timeout);
				options?.signal?.removeEventListener("abort", onAbort);
			};
			if (options?.signal?.aborted) {
				reject(this.opts.createRequestAbortError?.(method) ?? /* @__PURE__ */ new Error(`gateway request aborted for ${method}`));
				return;
			}
			pending.cleanup = cleanup;
			if (timeoutMs !== void 0 && timeoutMs >= 0) {
				timeout = setTimeout(() => {
					if (this.pending.get(id) !== pending) return;
					this.pending.delete(id);
					options?.signal?.removeEventListener("abort", onAbort);
					this.finishRequestTiming(id, pending, false, "CLIENT_TIMEOUT");
					reject(this.opts.createRequestTimeoutError?.(method, timeoutMs, requestSent) ?? /* @__PURE__ */ new Error(`gateway request timed out after ${timeoutMs}ms: ${method}`));
				}, timeoutMs);
				timeout.unref?.();
			}
			options?.signal?.addEventListener("abort", onAbort, { once: true });
			this.pending.set(id, pending);
			try {
				socket.send(JSON.stringify({
					type: "req",
					id,
					method,
					params
				}));
				requestSent = true;
				this.invoke("sent", () => options?.onSent?.());
			} catch (error) {
				this.pending.delete(id);
				cleanup();
				this.finishRequestTiming(id, pending, false, "CLIENT_SEND_ERROR");
				reject(error instanceof Error ? error : new Error(String(error)));
			}
		});
	}
	addEventListener(listener) {
		return this.listeners.add(listener);
	}
	closeSocket(code, reason) {
		this.socket?.close(code, reason);
	}
	resetReconnectBackoff(initialMs) {
		this.reconnectSignal = null;
		this.reconnectSupervisor.reset(initialMs);
	}
	recordTiming(phase, generation, plan, detail) {
		const now = this.nowMs();
		const state = this.connectTiming;
		if (!state || state.generation !== generation) return;
		state.hasChallenge ||= phase === "challenge";
		state.usedFallback ||= phase === "fallback";
		this.invoke("connect timing", () => this.opts.onTiming?.({
			phase,
			generation,
			durationMs: Math.max(0, now - state.startedAtMs),
			phaseDurationMs: Math.max(0, now - state.lastAtMs),
			hasChallenge: state.hasChallenge,
			usedFallback: state.usedFallback,
			plan,
			detail
		}));
		state.lastAtMs = now;
		if (phase === "hello" || phase === "failed") this.connectTiming = null;
	}
	connect() {
		if (this.stopped) return;
		const generation = this.generation + 1;
		this.lastSeq = null;
		this.connectNonce = null;
		this.connectChallengeTs = void 0;
		this.connectSent = this.connectRequestSent = false;
		this.socketOpened = false;
		this.helloReceived = false;
		this.connectFailure = void 0;
		let socket;
		try {
			socket = this.opts.createSocket({
				open: () => this.handleOpen(socket, generation),
				message: (data) => this.handleMessage(socket, generation, data),
				close: (code, reason) => this.handleClose(socket, generation, code, reason),
				error: (error) => this.handleSocketError(socket, generation, error)
			});
		} catch (error) {
			const normalized = error instanceof Error ? error : new Error(String(error));
			this.opts.onSocketFactoryError?.(normalized);
			this.opts.onConnectError?.(normalized);
			if (this.opts.rethrowSocketFactoryError?.(normalized)) throw normalized;
			if (this.opts.shouldRetrySocketFactoryError?.(normalized) && !this.stopped && !this.socket && !this.reconnectSignal) this.scheduleReconnect();
			return;
		}
		this.generation = generation;
		this.socket = socket;
		const now = this.nowMs();
		this.connectTiming = {
			generation,
			startedAtMs: now,
			lastAtMs: now,
			hasChallenge: false,
			usedFallback: false
		};
	}
	handleOpen(socket, generation) {
		if (!this.isActive(socket, generation)) return;
		this.socketOpened = true;
		this.recordTiming("socket-open", generation);
		if (this.connectNonce) {
			this.sendConnect(socket, generation);
			return;
		}
		this.armHandshakeTimer(socket, generation);
	}
	armHandshakeTimer(socket, generation) {
		this.clearHandshakeTimer();
		const armedAt = Date.now();
		this.handshakeTimer = setTimeout(() => {
			this.handshakeTimer = null;
			if (!this.isActive(socket, generation) || this.connectSent || !socket.isOpen()) return;
			if (this.opts.handshake.mode === "fallback") {
				this.recordTiming("fallback", generation);
				this.sendConnect(socket, generation);
				return;
			}
			const elapsedMs = Date.now() - armedAt;
			const error = new Error(this.opts.handshake.timeoutMessage?.(elapsedMs) ?? `gateway connect challenge timeout after ${elapsedMs}ms`);
			this.opts.onConnectError?.(error);
			socket.close(1008, "connect challenge timeout");
		}, this.opts.handshake.timeoutMs);
		this.handshakeTimer.unref?.();
	}
	sendConnect(socket, generation) {
		if (!this.isActive(socket, generation) || !socket.isOpen() || this.connectSent) return;
		this.connectSent = true;
		this.clearHandshakeTimer();
		this.handshakeTimer = startGatewayConnectTimeout(() => {
			if (this.isActive(socket, generation) && !this.helloReceived) socket.close(4e3, "connect timeout");
		});
		let planOrPromise;
		try {
			planOrPromise = this.opts.buildConnectPlan({
				nonce: this.connectNonce,
				challengeTs: this.connectChallengeTs,
				generation
			});
		} catch (error) {
			this.handleConnectPlanError(socket, generation, error);
			return;
		}
		if (planOrPromise instanceof Promise) {
			planOrPromise.then((plan) => this.sendConnectPlan(socket, generation, plan)).catch((error) => this.handleConnectPlanError(socket, generation, error));
			return;
		}
		this.sendConnectPlan(socket, generation, planOrPromise);
	}
	handleConnectPlanError(socket, generation, error) {
		if (!this.isActive(socket, generation)) return;
		const normalized = error instanceof Error ? error : new Error(String(error));
		const outcome = this.opts.onConnectPlanError?.(normalized) ?? {
			closeCode: 1008,
			closeReason: "connect failed"
		};
		this.opts.onConnectError?.(outcome.error ?? normalized);
		if (outcome.stop) this.stopped = true;
		socket.close(outcome.closeCode, outcome.closeReason);
	}
	sendConnectPlan(socket, generation, plan) {
		if (!this.isActive(socket, generation) || !socket.isOpen()) return;
		const context = {
			generation,
			nonce: this.connectNonce,
			challengeTs: this.connectChallengeTs,
			plan
		};
		this.recordTiming("connect-plan-ready", generation, plan);
		this.recordTiming("request-sent", generation, plan);
		this.connectRequestSent = true;
		this.request("connect", this.opts.buildConnectParams(plan)).then((hello) => {
			if (!this.isActive(socket, generation)) return;
			this.helloReceived = true;
			this.clearHandshakeTimer();
			this.connectFailure = void 0;
			this.reconnectSupervisor.reset();
			this.recordTiming("hello", generation, plan);
			this.opts.onConnectHello?.(hello, context);
			this.invoke("hello", () => this.opts.onHello?.(hello));
		}).catch((error) => {
			if (!this.isActive(socket, generation)) return;
			const requestError = error instanceof GatewayProtocolRequestError ? error : new GatewayProtocolRequestError({ message: String(error) });
			const outcome = this.opts.onConnectFailure?.(requestError, context) ?? {
				closeCode: 1008,
				closeReason: "connect failed"
			};
			this.connectFailure = {
				error: requestError,
				reconnectDelayMs: outcome.reconnectDelayMs
			};
			if (outcome.stop) this.stopped = true;
			socket.close(outcome.closeCode, outcome.closeReason);
		});
	}
	handleMessage(socket, generation, raw) {
		if (!this.isActive(socket, generation)) return;
		let parsed;
		try {
			parsed = JSON.parse(raw);
		} catch (error) {
			this.opts.onParseError?.(error);
			return;
		}
		if (isGatewayEventFrame(parsed)) {
			this.opts.onActivity?.();
			if (parsed.event === "connect.challenge") {
				const payload = parsed.payload;
				const nonce = typeof payload?.nonce === "string" ? payload.nonce.trim() : "";
				if (!nonce) {
					if (this.opts.handshake.mode === "require-challenge") {
						const error = /* @__PURE__ */ new Error("gateway connect challenge missing nonce");
						this.opts.onConnectError?.(error);
						socket.close(1008, "connect challenge missing nonce");
					}
					return;
				}
				this.connectNonce = nonce;
				const challengeTs = payload?.ts;
				this.connectChallengeTs = typeof challengeTs === "number" && Number.isSafeInteger(challengeTs) && challengeTs >= 0 ? challengeTs : null;
				this.recordTiming("challenge", generation);
				this.sendConnect(socket, generation);
				return;
			}
			const seq = typeof parsed.seq === "number" ? parsed.seq : null;
			if (seq !== null) {
				if (this.lastSeq !== null && seq > this.lastSeq + 1) {
					const expected = this.lastSeq + 1;
					this.invoke("gap", () => this.opts.onGap?.({
						expected,
						received: seq
					}));
					if (!this.isActive(socket, generation)) return;
				}
				this.lastSeq = seq;
			}
			const listeners = this.listeners.snapshot();
			this.invoke("event", () => this.opts.onEvent?.(parsed));
			for (const [listener, subscription] of listeners) {
				if (!this.isActive(socket, generation)) return;
				if (this.listeners.isCurrent(listener, subscription)) this.invoke("event listener", () => listener(parsed));
			}
			return;
		}
		if (!isGatewayResponseFrame(parsed)) return;
		this.opts.onActivity?.();
		this.handleResponse(parsed);
	}
	handleResponse(frame) {
		const pending = this.pending.get(frame.id);
		if (!pending) return;
		const status = frame.payload?.status;
		if (pending.expectFinal && status === "accepted") {
			if (!pending.acceptedNotified) {
				pending.acceptedNotified = true;
				this.invoke("accepted", () => pending.onAccepted?.(frame.payload));
			}
			return;
		}
		this.pending.delete(frame.id);
		pending.cleanup?.();
		if (frame.ok) {
			this.finishRequestTiming(frame.id, pending, true);
			pending.resolve(frame.payload);
			return;
		}
		this.finishRequestTiming(frame.id, pending, false, frame.error?.code);
		pending.reject(this.opts.createRequestError?.(frame.error ?? {}) ?? new GatewayProtocolRequestError(frame.error ?? {}));
	}
	handleClose(socket, generation, code, reason) {
		if (this.socket !== socket) {
			if (this.stoppedSocket?.socket === socket) {
				const context = {
					...this.stoppedSocket.context,
					code,
					reason
				};
				this.stoppedSocket = void 0;
				this.invoke("close", () => this.opts.onClose?.(context, {
					retry: false,
					notify: true
				}));
			}
			return;
		}
		this.socket = null;
		this.clearHandshakeTimer();
		const context = {
			...this.closeContext(),
			code,
			reason,
			generation
		};
		this.connectFailure = void 0;
		const decision = this.opts.resolveClose(context);
		this.flushRequests(decision.pendingError ?? context.connectFailure?.error ?? /* @__PURE__ */ new Error(`gateway closed (${code}): ${reason}`));
		this.invoke("close", () => this.opts.onClose?.(context, decision));
		if (decision.retry && !this.stopped) this.scheduleReconnect(decision.reconnectDelayMs ?? context.connectFailure?.reconnectDelayMs);
	}
	handleSocketError(socket, generation, error) {
		if (!this.isActive(socket, generation) || this.connectSent) return;
		this.opts.onConnectError?.(error);
	}
	flushRequests(error) {
		for (const [id, pending] of this.pending) {
			this.finishRequestTiming(id, pending, false, "CLIENT_CLOSED");
			pending.cleanup?.();
			pending.reject(error);
		}
		this.pending.clear();
	}
	finishRequestTiming(id, pending, ok, errorCode) {
		const endedAtMs = this.nowMs();
		this.invoke("request timing", () => this.opts.onRequestTiming?.({
			id,
			method: pending.method,
			ok,
			durationMs: Math.max(0, endedAtMs - pending.startedAtMs),
			startedAtMs: pending.startedAtMs,
			endedAtMs,
			errorCode
		}));
	}
	scheduleReconnect(overrideMs) {
		if (overrideMs !== void 0) this.reconnectSupervisor.nextDelayOverrideMs = overrideMs;
		const retry = this.reconnectSupervisor.next();
		if (!retry) return;
		this.reconnectSignal = retry.signal;
		sleepWithAbort(retry.delayMs, retry.signal).then(() => {
			if (this.reconnectSignal !== retry.signal) return;
			this.reconnectSignal = null;
			this.connect();
		}, () => {
			if (this.reconnectSignal === retry.signal) this.reconnectSignal = null;
		});
	}
	closeContext() {
		return {
			generation: this.generation,
			socketOpened: this.socketOpened,
			helloReceived: this.helloReceived,
			connectRequestSent: this.connectRequestSent,
			connectFailure: this.connectFailure
		};
	}
	isActive(socket, generation) {
		return !this.stopped && this.socket === socket && this.generation === generation;
	}
	nowMs() {
		return this.opts.nowMs?.() ?? Date.now();
	}
	clearHandshakeTimer() {
		this.handshakeTimer = clearGatewayConnectTimeout(this.handshakeTimer);
	}
	invoke(label, callback) {
		try {
			callback();
		} catch (error) {
			this.opts.onCallbackError?.(label, error);
		}
	}
};
//#endregion
//#region packages/gateway-client/src/reconnect-policy.ts
const NON_RECOVERABLE_AUTH_ERRORS = /* @__PURE__ */ new Set([
	ConnectErrorDetailCodes.AUTH_TOKEN_MISSING,
	ConnectErrorDetailCodes.AUTH_BOOTSTRAP_TOKEN_INVALID,
	ConnectErrorDetailCodes.AUTH_PASSWORD_MISSING,
	ConnectErrorDetailCodes.AUTH_PASSWORD_MISMATCH,
	ConnectErrorDetailCodes.AUTH_RATE_LIMITED,
	ConnectErrorDetailCodes.AUTH_DEVICE_TOKEN_MISMATCH,
	ConnectErrorDetailCodes.AUTH_SCOPE_MISMATCH,
	ConnectErrorDetailCodes.PAIRING_REQUIRED,
	ConnectErrorDetailCodes.CONTROL_UI_DEVICE_IDENTITY_REQUIRED,
	ConnectErrorDetailCodes.DEVICE_IDENTITY_REQUIRED
]);
function shouldPauseGatewayReconnect(params) {
	const code = readConnectErrorDetailCode(params.details);
	if (!code) return false;
	const pairing = readPairingConnectErrorDetails(params.details);
	if (code === ConnectErrorDetailCodes.PAIRING_REQUIRED && (pairing?.pauseReconnect === false || pairing?.recommendedNextStep === "wait_then_retry")) return false;
	if (code === ConnectErrorDetailCodes.AUTH_TOKEN_MISMATCH) return params.tokenMismatchIsTerminal === true && !params.deviceTokenRetryPending;
	return NON_RECOVERABLE_AUTH_ERRORS.has(code) || params.protocolMismatchIsTerminal === true && code === ConnectErrorDetailCodes.PROTOCOL_MISMATCH || params.clientVersionMismatchIsTerminal === true && code === ConnectErrorDetailCodes.CLIENT_VERSION_MISMATCH;
}
//#endregion
//#region packages/gateway-client/src/session-projection.ts
const MAX_TRACKED_SESSION_RUNS = 200;
const RETAINED_SESSION_RUNS = 150;
const SESSION_PROJECTION_SCOPE_KEYS = [
	"sessionKey",
	"sessionId",
	"agentId",
	"lifecycleRevision",
	"activeLeafEntryId"
];
function readRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function readNonemptyString(value) {
	return typeof value === "string" ? value.trim() || null : null;
}
function readPositiveSafeInteger(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : null;
}
/** History and status markers carry transcript order even when they have no chat role. */
function readSessionMessageSequence(message, envelope) {
	return readPositiveSafeInteger(readRecord(readRecord(message)?.["__openclaw"])?.seq) ?? readPositiveSafeInteger(envelope?.messageSeq);
}
/** Run ownership normalizes a user-turn suffix without changing its persisted send key. */
function normalizeSessionProjectionRunId(value) {
	const runId = readNonemptyString(value);
	return runId?.endsWith(":user") ? runId.slice(0, -5) || null : runId;
}
/** Persisted transcript facts win over envelope projections and provider-local import IDs. */
function readSessionMessageIdentity(message, envelope) {
	const record = readRecord(message);
	const role = readNonemptyString(record?.role)?.toLowerCase();
	if (!record || !role) return null;
	const metadata = readRecord(record["__openclaw"]);
	const importedFrom = readNonemptyString(metadata?.importedFrom);
	const cliSessionId = readNonemptyString(metadata?.cliSessionId);
	const externalId = readNonemptyString(metadata?.externalId);
	const idempotencyKey = readNonemptyString(metadata?.idempotencyKey) ?? readNonemptyString(record.idempotencyKey) ?? readNonemptyString(envelope?.idempotencyKey) ?? readNonemptyString(envelope?.clientRunId);
	return {
		role,
		id: readNonemptyString(metadata?.id) ?? readNonemptyString(envelope?.messageId),
		sequence: readSessionMessageSequence(message, envelope),
		idempotencyKey,
		runId: normalizeSessionProjectionRunId(idempotencyKey) ?? normalizeSessionProjectionRunId(envelope?.runId),
		isImported: Boolean(importedFrom || cliSessionId || externalId),
		externalSource: importedFrom && cliSessionId && externalId ? JSON.stringify([
			importedFrom,
			cliSessionId,
			externalId
		]) : null
	};
}
/** Local turns have no durable transcript metadata beyond their own optional send key. */
function isLocallyOptimisticSessionMessage(message) {
	const identity = readSessionMessageIdentity(message);
	if (!identity || identity.role !== "user" && identity.role !== "assistant") return false;
	const metadata = readRecord(readRecord(message)?.["__openclaw"]);
	return !metadata || Object.keys(metadata).every((key) => key === "idempotencyKey");
}
function createEntry(message, options) {
	const identity = readSessionMessageIdentity(message, options?.envelope);
	const inferredPendingRunId = options?.live !== true && isLocallyOptimisticSessionMessage(message) ? identity?.runId : null;
	const pendingRunId = normalizeSessionProjectionRunId(options?.pendingRunId ?? inferredPendingRunId);
	return {
		message,
		identity,
		live: options?.live === true,
		pending: pendingRunId !== null,
		pendingRunId
	};
}
function createProjectionEntries(messages) {
	let pendingUserRunId = null;
	return messages.map((message) => {
		const entry = createEntry(message);
		if (entry.identity?.role === "user") {
			pendingUserRunId = entry.pending ? entry.pendingRunId : null;
			return entry;
		}
		if (pendingUserRunId && entry.identity?.role === "assistant" && !entry.pending && isLocallyOptimisticSessionMessage(message)) return createEntry(message, { pendingRunId: pendingUserRunId });
		if (!isLocallyOptimisticSessionMessage(message)) pendingUserRunId = null;
		return entry;
	});
}
function createSessionProjection(scope = {}, messages = []) {
	const entries = createProjectionEntries(messages);
	return {
		scope: { ...scope },
		entries,
		messages: entries.map((entry) => entry.message),
		runs: {},
		hasTransportGap: false
	};
}
function scopesMatch(left, right) {
	return SESSION_PROJECTION_SCOPE_KEYS.every((key) => left[key] === void 0 || right[key] === void 0 || left[key] === right[key]);
}
function readEventScope(event) {
	const scope = { ...event.scope };
	for (const key of SESSION_PROJECTION_SCOPE_KEYS) if (event[key] !== void 0) Object.assign(scope, { [key]: event[key] });
	return scope;
}
function sameTranscriptIdentity(left, right) {
	if (!left || !right || left.role !== right.role) return false;
	if (left.isImported || right.isImported) {
		if (!left.isImported || !right.isImported) return false;
		if (left.externalSource || right.externalSource) return Boolean(left.externalSource && left.externalSource === right.externalSource);
		return left.sequence !== null && right.sequence !== null && left.sequence === right.sequence;
	}
	if (left.id || right.id) return Boolean(left.id && right.id && left.id === right.id);
	return left.sequence !== null && right.sequence !== null && left.sequence === right.sequence;
}
function entryMatches(left, right, allowSnapshotPromotion = false) {
	if (sameTranscriptIdentity(left.identity, right.identity)) return true;
	const persisted = left.identity;
	const observed = right.identity;
	if (allowSnapshotPromotion && right.live && persisted && observed && persisted.role === observed.role && !persisted.isImported && !observed.isImported && persisted.id && !observed.id && (persisted.sequence !== null && persisted.sequence === observed.sequence || persisted.role === "assistant" && observed.sequence === null && persisted.runId !== null && persisted.runId === observed.runId)) return true;
	if (left.pending && right.pending) return Boolean(left.identity?.role === right.identity?.role && left.pendingRunId && left.pendingRunId === right.pendingRunId);
	const pending = left.pending ? left : right.pending ? right : null;
	const authoritative = pending === left ? right : pending === right ? left : null;
	return Boolean(pending && authoritative && pending.identity?.role === authoritative.identity?.role && !pending.identity?.isImported && !authoritative.identity?.isImported && pending.pendingRunId && pending.pendingRunId === authoritative.identity?.runId);
}
function withEntries(state, entries) {
	return {
		...state,
		entries,
		messages: entries.map((entry) => entry.message)
	};
}
function insertEntry(entries, incoming, runs) {
	const sequence = incoming.identity?.sequence;
	let nextIndex = sequence === void 0 || sequence === null ? -1 : entries.findIndex((entry) => {
		const candidate = entry.identity?.sequence;
		return candidate !== void 0 && candidate !== null && candidate > sequence;
	});
	if (nextIndex < 0 && incoming.identity?.role === "user" && incoming.identity.runId) {
		const runId = incoming.identity.runId;
		const terminalMessage = runs?.[runId]?.message;
		nextIndex = entries.findIndex((entry) => entry.identity?.role === "assistant" && (entry.identity.runId === runId || entry.message === terminalMessage));
	}
	return nextIndex < 0 ? [...entries, incoming] : [
		...entries.slice(0, nextIndex),
		incoming,
		...entries.slice(nextIndex)
	];
}
function projectLiveSessionMessage(state, message, envelope, scope = {}) {
	if (!scopesMatch(state.scope, scope)) return state;
	const incoming = createEntry(message, {
		envelope,
		live: true
	});
	if (!incoming.identity) return state;
	const existingIndex = state.entries.findIndex((entry) => entryMatches(entry, incoming));
	if (existingIndex < 0) return withEntries(state, insertEntry(state.entries, incoming, state.runs));
	const existing = state.entries[existingIndex];
	if (existing && existing.message === message && existing.live && !existing.pending) return state;
	if (existing?.pending && incoming.identity.sequence !== null) {
		const sequence = incoming.identity.sequence;
		return withEntries(state, state.entries.some(({ identity }, index) => identity?.sequence != null && (index < existingIndex ? identity.sequence > sequence : identity.sequence < sequence)) ? insertEntry(state.entries.filter((_, index) => index !== existingIndex), incoming, state.runs) : state.entries.toSpliced(existingIndex, 1, incoming));
	}
	return withEntries(state, [
		...state.entries.slice(0, existingIndex),
		incoming,
		...state.entries.slice(existingIndex + 1)
	]);
}
/** Only observed live events and this client's pending turns may survive an older snapshot. */
function reconcileSessionProjectionSnapshot(state, messages, scope = {}, options = {}) {
	const visibleMessages = options.shouldIncludeMessage ? messages.filter(options.shouldIncludeMessage) : messages;
	if (!scopesMatch(state.scope, scope)) return createSessionProjection(scope, visibleMessages);
	let entries = createProjectionEntries(visibleMessages);
	for (const current of state.entries) {
		if (!current.live && !current.pending || options.shouldIncludeMessage?.(current.message) === false || entries.filter((entry) => entryMatches(entry, current, true)).length === 1) continue;
		entries = insertEntry(entries, current, state.runs);
	}
	return {
		...withEntries(state, entries),
		scope: {
			...state.scope,
			...scope
		},
		hasTransportGap: false
	};
}
function hasDisplayableSessionMessage(message) {
	if (typeof message === "string") return message.trim().length > 0;
	const record = readRecord(message);
	if (!record) return false;
	const displayableBlocks = Array.isArray(record.content) && record.content.some((block) => {
		const entry = readRecord(block);
		return entry ? entry.type !== "text" || readNonemptyString(entry.text) !== null : typeof block === "string" && block.trim().length > 0;
	});
	const media = readRecord(record["__openclaw"])?.media;
	return Boolean(typeof record.content === "string" && record.content.trim() || displayableBlocks || Array.isArray(media) && media.length > 0);
}
function readSessionProjectionFinalMessageIdentity(message) {
	if (!hasDisplayableSessionMessage(message)) return null;
	const identity = readSessionMessageIdentity(message);
	if (identity?.externalSource) return `import:${identity.role}:${identity.externalSource}`;
	if (identity?.id && !identity.isImported) return `id:${identity.role}:${identity.id}`;
	if (identity?.sequence !== null && identity?.sequence !== void 0) return `seq:${identity.role}:${identity.sequence}`;
	const record = readRecord(message);
	const metadata = readRecord(record?.["__openclaw"]);
	try {
		return `content:${JSON.stringify([
			identity?.role ?? "assistant",
			typeof message === "string" ? message : record?.content ?? null,
			metadata?.media ?? null,
			identity?.isImported ? [
				metadata?.importedFrom ?? null,
				metadata?.cliSessionId ?? null,
				metadata?.externalId ?? null
			] : null
		])}`;
	} catch {
		return null;
	}
}
/** Replayed finals are recognized against this run's bounded canonical terminal history. */
function hasSessionProjectionAcceptedFinal(run, message) {
	const identity = readSessionProjectionFinalMessageIdentity(message);
	return Boolean(identity && run && (run.acceptedFinalMessageIdentities?.includes(identity) || readSessionProjectionFinalMessageIdentity(run.message) === identity));
}
function retainSessionProjectionRuns(runs) {
	const entries = Object.entries(runs);
	if (entries.length <= MAX_TRACKED_SESSION_RUNS) return runs;
	const active = entries.filter(([, run]) => run.status === "streaming");
	const terminal = entries.filter(([, run]) => run.status !== "streaming");
	const terminalLimit = Math.max(0, RETAINED_SESSION_RUNS - active.length);
	const retainedTerminal = terminalLimit > 0 ? terminal.slice(-terminalLimit) : [];
	return Object.fromEntries([...active, ...retainedTerminal]);
}
function updateRun(state, incoming) {
	const incomingErrorMessage = readNonemptyString(incoming.errorMessage);
	const normalizedIncoming = { ...incoming };
	if (incomingErrorMessage) normalizedIncoming.errorMessage = incomingErrorMessage;
	else delete normalizedIncoming.errorMessage;
	const current = state.runs[incoming.runId];
	if (current && current.status !== "streaming") {
		const incomingFinalIdentity = readSessionProjectionFinalMessageIdentity(incoming.message);
		const incomingIsFinal = incoming.status === "completed" || incoming.status === "yielded";
		const canRecoverFinal = !hasDisplayableSessionMessage(current.message) || (current.acceptedFinalMessageIdentities?.length ?? 0) > 0;
		const acceptFinal = incomingIsFinal && (current.status === incoming.status || canRecoverFinal) && incomingFinalIdentity !== null && !hasSessionProjectionAcceptedFinal(current, incoming.message);
		const recoverMessage = acceptFinal && !hasDisplayableSessionMessage(current.message);
		const recoverError = readNonemptyString(current.errorMessage) === null && incomingErrorMessage !== null;
		if (!acceptFinal && !recoverError) return state;
		const firstFinalIdentity = readSessionProjectionFinalMessageIdentity(current.message);
		const previousFinalIdentities = current.acceptedFinalMessageIdentities ?? (firstFinalIdentity ? [firstFinalIdentity] : []);
		return {
			...state,
			runs: {
				...state.runs,
				[incoming.runId]: {
					...current,
					...recoverMessage ? { message: incoming.message } : {},
					...acceptFinal && incomingFinalIdentity ? { acceptedFinalMessageIdentities: [...previousFinalIdentities, incomingFinalIdentity].slice(-32) } : {},
					...recoverError && incomingErrorMessage ? {
						errorMessage: incomingErrorMessage,
						...incoming.errorKind ? { errorKind: incoming.errorKind } : {}
					} : {}
				}
			}
		};
	}
	const previousRuns = current && current.status === "streaming" && incoming.status !== "streaming" ? Object.fromEntries(Object.entries(state.runs).filter(([runId]) => runId !== incoming.runId)) : state.runs;
	const acceptedFinalIdentity = incoming.status === "completed" || incoming.status === "yielded" ? readSessionProjectionFinalMessageIdentity(incoming.message) : null;
	return {
		...state,
		runs: retainSessionProjectionRuns({
			...previousRuns,
			[incoming.runId]: {
				...current,
				...normalizedIncoming,
				...acceptedFinalIdentity ? { acceptedFinalMessageIdentities: [acceptedFinalIdentity] } : {},
				...incoming.message === void 0 && current?.message !== void 0 ? { message: current.message } : {}
			}
		})
	};
}
/** Reduces durable events, snapshots, and transport lifecycle without client-specific policy. */
function reduceSessionProjection(state, event) {
	const scope = readEventScope(event);
	if (event.type === "snapshotLoaded") return scopesMatch(state.scope, scope) ? reconcileSessionProjectionSnapshot(state, event.messages, scope, event.options) : state;
	if (event.type === "sessionReset") {
		const { sessionKey, sessionId, agentId } = state.scope;
		return scopesMatch({
			sessionKey,
			sessionId,
			agentId
		}, scope) ? createSessionProjection({
			...state.scope,
			...scope
		}) : state;
	}
	if (!scopesMatch(state.scope, scope)) return state;
	switch (event.type) {
		case "messagePersisted": return projectLiveSessionMessage(state, event.message, event.envelope ?? event, scope);
		case "sendPending": {
			const pendingRunId = normalizeSessionProjectionRunId(event.idempotencyKey ?? event.runId);
			const incoming = createEntry(event.message, { pendingRunId });
			if (!pendingRunId || !incoming.identity) return state;
			return state.entries.findIndex((entry) => entryMatches(entry, incoming)) < 0 ? withEntries(state, insertEntry(state.entries, incoming, state.runs)) : state;
		}
		case "sendAcknowledged": {
			const runId = normalizeSessionProjectionRunId(event.idempotencyKey ?? event.runId);
			const previousRunId = normalizeSessionProjectionRunId(event.previousRunId);
			if (!runId || !previousRunId || previousRunId === runId) return state;
			let changed = false;
			const entries = state.entries.flatMap((entry) => {
				if (!entry.pending || entry.pendingRunId !== previousRunId) return [entry];
				changed = true;
				const rekeyed = {
					...entry,
					pendingRunId: runId
				};
				return state.entries.some((candidate) => !candidate.pending && entryMatches(rekeyed, candidate)) ? [] : [rekeyed];
			});
			return changed ? withEntries(state, entries) : state;
		}
		case "sendFailed": {
			const runId = normalizeSessionProjectionRunId(event.runId);
			const entries = state.entries.filter((entry) => !entry.pending || entry.pendingRunId !== runId);
			return entries.length === state.entries.length ? state : withEntries(state, entries);
		}
		case "runDelta": return updateRun(state, {
			runId: event.runId,
			status: "streaming",
			...event.message === void 0 ? {} : { message: event.message }
		});
		case "runTerminal": return updateRun(state, {
			runId: event.runId,
			status: event.status,
			...event.message === void 0 ? {} : { message: event.message },
			...event.stopReason === void 0 ? {} : { stopReason: event.stopReason },
			...event.errorKind === void 0 ? {} : { errorKind: event.errorKind },
			...event.errorMessage === void 0 ? {} : { errorMessage: event.errorMessage }
		});
		case "transportGap": return state.hasTransportGap ? state : {
			...state,
			hasTransportGap: true
		};
		case "reconnected": return state;
		default: return state;
	}
}
/** Normalizes Gateway run envelopes once for every browser and terminal adapter. */
function reduceSessionProjectionRunEvent(projection, event, scope = {}) {
	const runId = readNonemptyString(event.runId);
	const eventState = event.state;
	if (!runId || typeof eventState !== "string" || ![
		"delta",
		"final",
		"error",
		"aborted"
	].includes(eventState)) return null;
	const message = event.message;
	const stopReason = readNonemptyString(event.stopReason) ?? readNonemptyString(readRecord(message)?.stopReason);
	const errorKind = readNonemptyString(event.errorKind);
	const base = {
		runId,
		...message === void 0 ? {} : { message },
		scope
	};
	const next = reduceSessionProjection(projection, eventState === "delta" ? {
		type: "runDelta",
		...base
	} : {
		type: "runTerminal",
		...base,
		status: eventState === "aborted" ? "aborted" : eventState === "error" ? errorKind === "timeout" ? "timeout" : "error" : event.yielded === true && stopReason === "end_turn" ? "yielded" : stopReason === "error" ? "error" : "completed",
		...stopReason === null ? {} : { stopReason },
		...errorKind === null ? {} : { errorKind },
		...typeof event.errorMessage === "string" ? { errorMessage: event.errorMessage } : {}
	});
	return {
		projection: next,
		previousRun: projection.runs[runId],
		currentRun: next.runs[runId]
	};
}
//#endregion
//#region packages/gateway-client/src/session-subscriptions.ts
function sessionSubscriptionParams(key, agentId) {
	return {
		key: key.trim(),
		...agentId ? { agentId } : {}
	};
}
/**
* One Gateway connection owns one targeted observer per canonical session.
* Approval delivery is an upgrade of that observer, never a second observer.
*/
var GatewaySessionMessageSubscriptionCoordinator = class {
	#client;
	#keysEquivalent;
	#entries = /* @__PURE__ */ new Set();
	#retired = false;
	constructor(client, options = {}) {
		this.#client = client;
		this.#keysEquivalent = options.keysEquivalent;
	}
	configure(options = {}) {
		const matcher = options.keysEquivalent;
		if (!matcher || matcher === this.#keysEquivalent) return this;
		if (this.#keysEquivalent || this.#entries.size > 0) throw new Error("Session message key equivalence cannot change for an active connection");
		this.#keysEquivalent = matcher;
		return this;
	}
	async acquire(key, options = {}) {
		const normalizedKey = key.trim();
		if (!normalizedKey) throw new Error("Session message subscription requires a session key");
		const agentId = options.agentId?.trim() || null;
		let entry;
		while (true) {
			if (this.#retired) throw new Error("Session message subscription belongs to a replaced Gateway connection");
			const existing = [...this.#entries].find((candidate) => candidate.agentId === agentId && (this.#areKeysEquivalent(candidate.key, normalizedKey) || [...candidate.requestedKeys].some((requestedKey) => this.#areKeysEquivalent(requestedKey, normalizedKey))));
			if (!existing) {
				const provisional = [...this.#entries].find((candidate) => candidate.agentId === agentId && !candidate.canonicalSettled);
				if (provisional) {
					await (provisional.plainFallback ?? provisional.ready).catch(() => void 0);
					continue;
				}
				entry = this.#createEntry(normalizedKey, agentId, options.includeApprovals === true);
				break;
			}
			if (!existing.release) {
				entry = existing;
				entry.requestedKeys.add(normalizedKey);
				break;
			}
			await existing.release.catch(() => void 0);
		}
		entry.pendingOwners += 1;
		try {
			const result = await this.#acquireCapability(entry, options.includeApprovals === true);
			if (this.#retired) throw new Error("Session message subscription completed on a replaced Gateway connection");
			const subscription = {
				key: result.key,
				agentId,
				...options.includeApprovals === true ? {
					includeApprovals: true,
					...result.approvalReplay !== void 0 ? { approvalReplay: result.approvalReplay } : {}
				} : {}
			};
			entry.handles.add(subscription);
			sessionMessageSubscriptionOwners.set(subscription, {
				coordinator: this,
				entry
			});
			return subscription;
		} finally {
			entry.pendingOwners -= 1;
			if (entry.pendingOwners === 0 && entry.handles.size === 0 && !entry.release) this.#entries.delete(entry);
		}
	}
	release(subscription) {
		const owner = sessionMessageSubscriptionOwners.get(subscription);
		if (!owner || owner.coordinator !== this) return Promise.resolve();
		const { entry } = owner;
		if (this.#retired || entry.handles.size > 1) {
			this.#finishRelease(subscription, owner);
			return Promise.resolve();
		}
		if (entry.release) return entry.release;
		if (entry.pendingOwners > 0) {
			const pending = [entry.ready, ...entry.approvalRequest ? [entry.approvalRequest] : []];
			const tracked = Promise.allSettled(pending).then(() => {
				if (entry.release === tracked) entry.release = null;
				return this.release(subscription);
			});
			entry.release = tracked;
			return tracked;
		}
		const tracked = this.#client.request("sessions.messages.unsubscribe", sessionSubscriptionParams(entry.key, entry.agentId)).then(() => {
			this.#finishRelease(subscription, owner, true);
		}).finally(() => {
			if (entry.release === tracked) entry.release = null;
		});
		entry.release = tracked;
		return tracked;
	}
	/** A reconnect retires leases without touching the next connection's observers. */
	reset() {
		this.#retired = true;
		for (const entry of this.#entries) for (const subscription of entry.handles) {
			const owner = sessionMessageSubscriptionOwners.get(subscription);
			if (owner?.coordinator === this) this.#finishRelease(subscription, owner);
		}
		this.#entries.clear();
	}
	#createEntry(key, agentId, includeApprovals) {
		const entry = {
			key,
			requestedKeys: /* @__PURE__ */ new Set([key]),
			agentId,
			ready: Promise.resolve({ key }),
			approvalRequest: null,
			approvalResponse: null,
			plainFallback: null,
			canonicalSettled: false,
			handles: /* @__PURE__ */ new Set(),
			pendingOwners: 0,
			release: null
		};
		entry.ready = this.#requestSubscribe(entry, includeApprovals).then((result) => {
			entry.key = result.key;
			entry.canonicalSettled = true;
			if (includeApprovals) entry.approvalResponse = result;
			return result;
		});
		if (includeApprovals) entry.approvalRequest = entry.ready;
		entry.ready.catch(() => void 0);
		this.#entries.add(entry);
		return entry;
	}
	#acquireCapability(entry, includeApprovals) {
		if (!includeApprovals) {
			if (entry.approvalRequest === entry.ready && !entry.approvalResponse) {
				if (!entry.plainFallback) {
					const approvalRequest = entry.ready;
					entry.plainFallback = approvalRequest.catch(async (error) => {
						if (this.#retired) throw error;
						const result = await this.#requestSubscribe(entry, false);
						entry.key = result.key;
						entry.canonicalSettled = true;
						entry.ready = Promise.resolve(result);
						if (entry.approvalRequest === approvalRequest) entry.approvalRequest = null;
						return result;
					});
				}
				return entry.plainFallback;
			}
			return entry.ready;
		}
		if (entry.approvalResponse) return Promise.resolve(entry.approvalResponse);
		if (entry.approvalRequest) return entry.approvalRequest;
		const upgrade = entry.ready.then(() => this.#requestSubscribe(entry, true)).then((result) => {
			entry.key = result.key;
			entry.approvalResponse = result;
			return result;
		});
		entry.approvalRequest = upgrade;
		upgrade.catch(() => {
			if (entry.approvalRequest === upgrade) entry.approvalRequest = null;
		});
		return upgrade;
	}
	async #requestSubscribe(entry, includeApprovals) {
		const result = await this.#client.request("sessions.messages.subscribe", {
			...sessionSubscriptionParams(entry.key, entry.agentId),
			...includeApprovals ? { includeApprovals: true } : {}
		});
		const response = result && typeof result === "object" ? result : null;
		const responseKey = response && "key" in response ? response.key : void 0;
		return {
			key: typeof responseKey === "string" && responseKey.trim() ? responseKey.trim() : entry.key,
			...response && "approvalReplay" in response ? { approvalReplay: response.approvalReplay } : {}
		};
	}
	#finishRelease(subscription, owner, removeEntry = false) {
		if (sessionMessageSubscriptionOwners.get(subscription) !== owner) return;
		sessionMessageSubscriptionOwners.delete(subscription);
		owner.entry.handles.delete(subscription);
		if (removeEntry) this.#entries.delete(owner.entry);
	}
	#areKeysEquivalent(left, right) {
		return left === right || this.#keysEquivalent?.(left, right) === true;
	}
};
const sessionMessageSubscriptionOwners = /* @__PURE__ */ new WeakMap();
const sessionMessageSubscriptionCoordinators = /* @__PURE__ */ new WeakMap();
function getGatewaySessionMessageSubscriptionCoordinator(client, options = {}) {
	const existing = sessionMessageSubscriptionCoordinators.get(client);
	if (existing) return existing.configure(options);
	const coordinator = new GatewaySessionMessageSubscriptionCoordinator(client, options);
	sessionMessageSubscriptionCoordinators.set(client, coordinator);
	return coordinator;
}
function resetGatewaySessionMessageSubscriptionCoordinator(client) {
	sessionMessageSubscriptionCoordinators.get(client)?.reset();
	sessionMessageSubscriptionCoordinators.delete(client);
}
function releaseGatewaySessionMessageSubscription(subscription) {
	return sessionMessageSubscriptionOwners.get(subscription)?.coordinator.release(subscription) ?? Promise.resolve();
}
//#endregion
export { buildDeviceAuthPayload as C, shouldRetryGatewayWithDeviceToken as S, normalizeDeviceMetadataForAuth as T, GatewayProtocolRequestError as _, createSessionProjection as a, resolveGatewayConnectScopes as b, normalizeSessionProjectionRunId as c, readSessionMessageSequence as d, reconcileSessionProjectionSnapshot as f, GatewayProtocolClient as g, shouldPauseGatewayReconnect as h, resetGatewaySessionMessageSubscriptionCoordinator as i, projectLiveSessionMessage as l, reduceSessionProjectionRunEvent as m, getGatewaySessionMessageSubscriptionCoordinator as n, hasSessionProjectionAcceptedFinal as o, reduceSessionProjection as p, releaseGatewaySessionMessageSubscription as r, isLocallyOptimisticSessionMessage as s, GatewaySessionMessageSubscriptionCoordinator as t, readSessionMessageIdentity as u, GatewayBrowserDeviceAuthLifecycle as v, buildDeviceAuthPayloadV3 as w, selectGatewayConnectAuth as x, buildGatewayConnectAuth as y };
