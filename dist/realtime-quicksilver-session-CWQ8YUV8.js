import { s as readRequestBodyWithLimit } from "./http-body-DhB9daEt.js";
import { r as resolveAcceptedBrowserOrigin } from "./origin-check-1UpqVOpx.js";
import { s as resolveProviderAuthProfileApiKey } from "./provider-auth-D9UigLvZ.js";
import "./webhook-request-guards-CgiiFJiC.js";
import { n as resolveCodexAuthIdentity } from "./openai-chatgpt-auth-identity-DtFnVVxz.js";
import { n as isOpenAIGptLiveModel } from "./realtime-quicksilver-BdMyAyC5.js";
import { r as buildOpenAIQuicksilverSession, s as createOpenAIQuicksilverCall, u as resolveOpenAIQuicksilverVoice } from "./realtime-quicksilver-wire-BBX4r-sl.js";
import { t as OpenAIQuicksilverDelegationController } from "./realtime-quicksilver-delegation-controller-BuaZobKq.js";
import { n as reserveOpenAIQuicksilverSession, t as releaseOpenAIQuicksilverSession } from "./realtime-quicksilver-session-limit-C_rvr0yn.js";
import { t as connectOpenAIQuicksilverSideband } from "./realtime-quicksilver-sideband-BzE1kzbI.js";
import { randomBytes, randomUUID } from "node:crypto";
import WebSocket$1 from "ws";
//#region extensions/openai/realtime-quicksilver-session.ts
const OPENAI_QUICKSILVER_OFFER_PATH = "/plugins/openai/realtime/calls";
const OPENAI_QUICKSILVER_CAPABILITIES = {
	transports: ["webrtc", "gateway-relay"],
	handlesAgentConsult: true,
	supportsToolCalls: false,
	supportsVideoFrames: false
};
const OPENAI_QUICKSILVER_PENDING_TTL_MS = 6e4;
const OPENAI_QUICKSILVER_SESSION_TTL_MS = 30 * 6e4;
const OPENAI_QUICKSILVER_MAX_SDP_BYTES = 256 * 1024;
const OPENAI_QUICKSILVER_UPSTREAM_TIMEOUT_MS = 3e4;
const WEBSOCKET_OPEN = 1;
function createResponseDeliveryWaiter(res, onDelivered) {
	let settle;
	const result = new Promise((resolve) => {
		settle = (delivered) => {
			res.removeListener("finish", onFinish);
			res.removeListener("close", onClose);
			resolve(delivered);
		};
	});
	const onFinish = () => {
		onDelivered();
		settle(true);
	};
	const onClose = () => settle(false);
	res.once("finish", onFinish);
	res.once("close", onClose);
	return {
		result,
		cancel: () => settle(false)
	};
}
function respondText(res, statusCode, body) {
	res.statusCode = statusCode;
	res.setHeader("cache-control", "no-store");
	res.setHeader("content-type", "text/plain; charset=utf-8");
	res.setHeader("x-content-type-options", "nosniff");
	res.end(body);
}
function applyRealtimeOfferCorsHeaders(req, res, cfg) {
	if (!req.headers.origin) return true;
	const origin = resolveAcceptedBrowserOrigin({
		req,
		cfg
	});
	if (!origin) return false;
	res.setHeader("Access-Control-Allow-Origin", origin);
	res.setHeader("Vary", "Origin");
	return true;
}
function readBearerToken(req) {
	return (req.headers.authorization?.trim())?.match(/^Bearer\s+([^\s]+)$/i)?.[1];
}
async function resolveOpenAIChatGptSubscriptionAuth(params) {
	const token = await resolveProviderAuthProfileApiKey({
		provider: "openai",
		cfg: params.cfg,
		agentDir: params.agentDir,
		profileTypes: ["oauth"],
		includeExternalCliAuth: false
	});
	if (!token) return;
	const accountId = resolveCodexAuthIdentity({ accessToken: token }).accountId;
	if (!accountId) throw new Error("The selected ChatGPT OAuth profile is missing its account id");
	return {
		type: "oauth",
		token,
		accountId
	};
}
function createOpenAIQuicksilverBrowserSessionBroker(params) {
	const pendingOffers = /* @__PURE__ */ new Map();
	const inFlightOffers = /* @__PURE__ */ new Map();
	const activeSessions = /* @__PURE__ */ new Map();
	const reservations = /* @__PURE__ */ new Set();
	const inFlightHandlers = /* @__PURE__ */ new Set();
	const shutdownController = new AbortController();
	const createSocket = params.webSocketFactory ?? ((url, options) => new WebSocket$1(url, options));
	let cleanedUp = false;
	const finalizeSession = (session) => {
		if (activeSessions.get(session.token) !== session) return false;
		activeSessions.delete(session.token);
		reservations.delete(session.token);
		releaseOpenAIQuicksilverSession(session.token);
		clearTimeout(session.timer);
		session.delegations.stop(/* @__PURE__ */ new Error("GPT-Live delegation stopped"));
		session.abortController.abort(/* @__PURE__ */ new Error("GPT-Live session closed"));
		return true;
	};
	const closeSession = (session) => {
		if (!finalizeSession(session)) return;
		if (session.socket.readyState === WEBSOCKET_OPEN) try {
			session.socket.send(JSON.stringify({ type: "session.close" }));
		} catch {}
		try {
			session.socket.close(1e3, "session closed");
		} catch {}
	};
	const scheduleSessionExpiry = (session, ttlMs) => {
		clearTimeout(session.timer);
		session.timer = setTimeout(() => closeSession(session), Math.max(0, ttlMs));
		session.timer.unref?.();
	};
	const handleSidebandFrame = (session, data, isBinary) => {
		session.delegations.handleFrame(data, isBinary);
	};
	const attachSidebandHandlers = (session) => {
		session.socket.on("message", (data, isBinary) => {
			handleSidebandFrame(session, data, isBinary);
		});
		session.socket.on("error", (error) => {
			params.logger.warn(`OpenAI GPT-Live sideband socket failed: ${error.message}`);
			closeSession(session);
		});
		session.socket.on("close", () => {
			finalizeSession(session);
		});
	};
	const prunePendingOffers = () => {
		const now = Date.now();
		for (const [token, offer] of pendingOffers) if (offer.expiresAt <= now) {
			pendingOffers.delete(token);
			reservations.delete(token);
			releaseOpenAIQuicksilverSession(token);
		}
	};
	const broker = {
		capabilities: OPENAI_QUICKSILVER_CAPABILITIES,
		createBrowserSession: async (request, auth) => {
			if (cleanedUp || shutdownController.signal.aborted) throw new Error("OpenAI GPT-Live sessions are stopping; restart Gateway and try again");
			const model = request.model?.trim();
			if (!model) throw new Error("OpenAI realtime browser sessions require a model");
			if (isOpenAIGptLiveModel(model) && !request.runAgentConsult) throw new Error("OpenAI GPT-Live requires the Gateway agent-consult runtime");
			prunePendingOffers();
			const voice = resolveOpenAIQuicksilverVoice(request.voice);
			const token = randomBytes(32).toString("base64url");
			const expiresAt = Date.now() + OPENAI_QUICKSILVER_PENDING_TTL_MS;
			reserveOpenAIQuicksilverSession(token, { expiresAtMs: expiresAt });
			pendingOffers.set(token, {
				auth,
				expiresAt,
				requestIds: {
					realtimeSessionId: randomUUID(),
					sessionId: randomUUID(),
					threadId: randomUUID()
				},
				request: {
					...request,
					model,
					voice
				}
			});
			reservations.add(token);
			return {
				provider: "openai",
				transport: "webrtc",
				clientSecret: token,
				offerUrl: OPENAI_QUICKSILVER_OFFER_PATH,
				model,
				voice,
				expiresAt
			};
		},
		cancelBrowserSession: (session) => {
			if (session.transport !== "webrtc") return;
			pendingOffers.delete(session.clientSecret);
			inFlightOffers.get(session.clientSecret)?.abort(/* @__PURE__ */ new Error("GPT-Live session canceled"));
			const active = activeSessions.get(session.clientSecret);
			if (active) closeSession(active);
			else {
				reservations.delete(session.clientSecret);
				releaseOpenAIQuicksilverSession(session.clientSecret);
			}
		}
	};
	const handleOffer = async (req, res) => {
		const corsAllowed = applyRealtimeOfferCorsHeaders(req, res, params.getConfig());
		if (req.method === "OPTIONS") {
			if (!corsAllowed) {
				respondText(res, 403, "Origin not allowed");
				return true;
			}
			res.statusCode = 204;
			res.setHeader("cache-control", "no-store");
			res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
			res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
			res.setHeader("Vary", "Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
			if (req.headers["access-control-request-private-network"] === "true") res.setHeader("Access-Control-Allow-Private-Network", "true");
			res.setHeader("Access-Control-Max-Age", "600");
			res.end();
			return true;
		}
		if (!corsAllowed) {
			respondText(res, 403, "Origin not allowed");
			return true;
		}
		if (req.method !== "POST") {
			respondText(res, 405, "Method not allowed");
			return true;
		}
		if (!req.headers["content-type"]?.toLowerCase().startsWith("application/sdp")) {
			respondText(res, 415, "Expected application/sdp");
			return true;
		}
		prunePendingOffers();
		const token = readBearerToken(req);
		const offer = token ? pendingOffers.get(token) : void 0;
		if (!token || !offer || offer.expiresAt <= Date.now()) {
			respondText(res, 401, "Invalid or expired realtime session token");
			return true;
		}
		pendingOffers.delete(token);
		const requestController = new AbortController();
		let browserDisconnected = false;
		inFlightOffers.set(token, requestController);
		const abortFromBrowser = () => {
			browserDisconnected = true;
			requestController.abort(/* @__PURE__ */ new Error("Browser GPT-Live offer request closed"));
		};
		req.once("aborted", abortFromBrowser);
		res.once("close", abortFromBrowser);
		const detachBrowserAbort = () => {
			req.removeListener("aborted", abortFromBrowser);
			res.removeListener("close", abortFromBrowser);
		};
		const lifecycleSignal = AbortSignal.any([shutdownController.signal, requestController.signal]);
		let session;
		let reservationTransferred = false;
		let responseDeliveryWaiter;
		try {
			const sdp = await readRequestBodyWithLimit(req, {
				maxBytes: OPENAI_QUICKSILVER_MAX_SDP_BYTES,
				timeoutMs: 15e3
			});
			if (!sdp.trim()) {
				respondText(res, 400, "SDP offer is required");
				return true;
			}
			const upstreamSignal = AbortSignal.any([lifecycleSignal, AbortSignal.timeout(OPENAI_QUICKSILVER_UPSTREAM_TIMEOUT_MS)]);
			const call = await createOpenAIQuicksilverCall({
				auth: offer.auth,
				requestIds: offer.requestIds,
				sdp,
				session: buildOpenAIQuicksilverSession({
					model: offer.request.model,
					instructions: offer.request.instructions,
					voice: offer.request.voice,
					initialItems: offer.request.initialItems
				}),
				signal: upstreamSignal,
				fetchImpl: params.fetchImpl
			});
			if (call.kind === "ga-realtime") {
				res.statusCode = call.status;
				res.setHeader("cache-control", "no-store");
				res.setHeader("content-type", "application/sdp");
				res.setHeader("x-content-type-options", "nosniff");
				res.end(call.answerSdp);
				return true;
			}
			const runAgentConsult = offer.request.runAgentConsult;
			if (!runAgentConsult) throw new Error("OpenAI GPT-Live requires the Gateway agent-consult runtime");
			const connected = await connectOpenAIQuicksilverSideband({
				auth: offer.auth,
				createSocket,
				requestIds: offer.requestIds,
				signal: lifecycleSignal,
				url: call.sidebandUrl
			});
			if (lifecycleSignal.aborted) {
				connected.socket.close(1e3, "session stopped");
				throw lifecycleSignal.reason;
			}
			const abortController = new AbortController();
			const timer = setTimeout(() => {
				const active = activeSessions.get(token);
				if (active) closeSession(active);
			}, OPENAI_QUICKSILVER_SESSION_TTL_MS);
			timer.unref?.();
			session = {
				abortController,
				delegations: new OpenAIQuicksilverDelegationController({
					getSocket: () => connected.socket,
					logger: params.logger,
					onFatalError: () => {
						if (session) closeSession(session);
					},
					onSessionStarted: (expiresAt) => {
						if (session && expiresAt !== void 0) {
							const upstreamTtlMs = expiresAt * 1e3 - Date.now();
							scheduleSessionExpiry(session, Math.min(OPENAI_QUICKSILVER_SESSION_TTL_MS, upstreamTtlMs));
						}
					},
					runAgentConsult,
					signal: abortController.signal
				}),
				socket: connected.socket,
				timer,
				token
			};
			activeSessions.set(token, session);
			reserveOpenAIQuicksilverSession(token);
			reservationTransferred = true;
			attachSidebandHandlers(session);
			const terminalEvent = connected.detachBuffer();
			for (const frame of connected.bufferedFrames) handleSidebandFrame(session, frame.data, frame.isBinary);
			if (terminalEvent && activeSessions.get(token) === session) if (terminalEvent.kind === "error") {
				params.logger.warn(`OpenAI GPT-Live sideband socket failed: ${terminalEvent.error.message}`);
				closeSession(session);
			} else finalizeSession(session);
			if (activeSessions.get(token) !== session) throw new Error("OpenAI GPT-Live sideband failed during startup");
			responseDeliveryWaiter = createResponseDeliveryWaiter(res, detachBrowserAbort);
			res.statusCode = 200;
			res.setHeader("cache-control", "no-store");
			res.setHeader("content-type", "application/sdp");
			res.setHeader("x-content-type-options", "nosniff");
			res.end(call.answerSdp);
			const delivered = await responseDeliveryWaiter.result;
			responseDeliveryWaiter = void 0;
			if (!delivered || lifecycleSignal.aborted) closeSession(session);
			return true;
		} catch (error) {
			if (session) closeSession(session);
			if (browserDisconnected) return true;
			respondText(res, 502, error instanceof Error ? error.message : "OpenAI GPT-Live session failed");
			return true;
		} finally {
			responseDeliveryWaiter?.cancel();
			detachBrowserAbort();
			inFlightOffers.delete(token);
			if (!reservationTransferred) {
				reservations.delete(token);
				releaseOpenAIQuicksilverSession(token);
			}
		}
	};
	const handler = (req, res) => {
		const handling = handleOffer(req, res);
		inFlightHandlers.add(handling);
		return handling.finally(() => inFlightHandlers.delete(handling));
	};
	const cleanup = async () => {
		if (cleanedUp) return;
		cleanedUp = true;
		shutdownController.abort(/* @__PURE__ */ new Error("OpenAI GPT-Live broker stopped"));
		pendingOffers.clear();
		for (const controller of inFlightOffers.values()) controller.abort(/* @__PURE__ */ new Error("OpenAI GPT-Live broker stopped"));
		for (const session of activeSessions.values()) closeSession(session);
		await Promise.allSettled(inFlightHandlers);
		for (const token of reservations) releaseOpenAIQuicksilverSession(token);
		reservations.clear();
	};
	return {
		broker,
		handler,
		cleanup
	};
}
//#endregion
export { resolveOpenAIChatGptSubscriptionAuth as i, OPENAI_QUICKSILVER_OFFER_PATH as n, createOpenAIQuicksilverBrowserSessionBroker as r, OPENAI_QUICKSILVER_CAPABILITIES as t };
