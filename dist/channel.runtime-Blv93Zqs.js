import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { b as createReplyToFanout, f as sendPayloadMediaSequence, l as resolvePayloadMediaUrls } from "./reply-payload-BE_j43tQ.js";
import { v as renderMessagePresentationFallbackText } from "./payload-BofbwVaq.js";
import { t as createMessageReceiptFromOutboundResults } from "./receipt-DSE0BXtY.js";
import { n as resolveOutboundSendDep } from "./send-deps-DjbvQHZ4.js";
import "./error-runtime-Dbl9_3mW.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import { t as chunkTextForOutbound } from "./text-chunking-nhEIGrpB.js";
import "./channel-outbound-sjGCUxtt.js";
import { t as attachChannelToResult } from "./channel-send-result-BFAnsv6z.js";
import { t as runChannelProbe } from "./text-utility-runtime-Dwuhfjgs.js";
import { b as cleanupMatrixDeliveryPlans, i as sendPollMatrix, r as sendMessageMatrix, s as sendTypingMatrix, x as reconcileMatrixUnknownSend } from "./send-BX1nUWA6.js";
import { t as isBunRuntime } from "./runtime-BefyhPWv.js";
import { n as resolveMatrixAuth } from "./config-BTkVuYGB.js";
import "./client-DMlCd1Ny.js";
import { n as listMatrixDirectoryPeersLive, t as listMatrixDirectoryGroupsLive } from "./directory-live-BOCv58Qk.js";
import "./runtime-api-CucHbwUO.js";
import { t as resolveMatrixTargets } from "./resolve-targets-BhvfHBgp.js";
//#region extensions/matrix/src/matrix/probe.ts
const loadMatrixProbeRuntimeDeps = createLazyRuntimeModule(() => import("./probe.runtime-QBgrBSJ6.js").then((runtimeModule) => ({ createMatrixClient: runtimeModule.createMatrixClient })));
async function probeMatrix(params) {
	return await runChannelProbe(void 0, async () => {
		const result = {
			ok: false,
			status: null,
			error: null
		};
		if (isBunRuntime()) return {
			...result,
			error: "Matrix probe requires Node (bun runtime not supported)"
		};
		if (!params.homeserver?.trim()) return {
			...result,
			error: "missing homeserver"
		};
		if (!params.accessToken?.trim()) return {
			...result,
			error: "missing access token"
		};
		const { createMatrixClient } = await loadMatrixProbeRuntimeDeps();
		const inputUserId = normalizeOptionalString(params.userId);
		const client = await createMatrixClient({
			homeserver: params.homeserver,
			userId: inputUserId,
			accessToken: params.accessToken,
			deviceId: params.deviceId,
			persistStorage: false,
			localTimeoutMs: params.timeoutMs,
			accountId: params.accountId,
			allowPrivateNetwork: params.allowPrivateNetwork,
			ssrfPolicy: params.ssrfPolicy,
			dispatcherPolicy: params.dispatcherPolicy
		});
		return {
			...result,
			ok: true,
			userId: await client.getUserId() ?? null
		};
	}, (error) => ({
		ok: false,
		status: typeof error === "object" && error && "statusCode" in error ? Number(error.statusCode) : null,
		error: formatErrorMessage(error)
	}));
}
//#endregion
//#region extensions/matrix/src/outbound.ts
const MATRIX_OPENCLAW_PRESENTATION_KEY = "com.openclaw.presentation";
const MATRIX_OPENCLAW_PRESENTATION_TYPE = "message.presentation";
const MATRIX_EMPTY_PRESENTATION_FALLBACK_TEXT = "---";
function toRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
}
function resolveMatrixChannelData(payload) {
	const raw = toRecord(payload.channelData)?.matrix;
	return toRecord(raw) ?? {};
}
function buildMatrixPresentationContent(presentation) {
	return {
		...presentation,
		version: 1,
		type: MATRIX_OPENCLAW_PRESENTATION_TYPE
	};
}
function resolveMatrixPresentationContent(payload) {
	const presentation = toRecord(toRecord(resolveMatrixChannelData(payload).extraContent)?.[MATRIX_OPENCLAW_PRESENTATION_KEY]);
	if (!presentation || presentation.version !== 1 || presentation.type !== MATRIX_OPENCLAW_PRESENTATION_TYPE) return;
	return presentation;
}
function renderMatrixPresentationPayload(params) {
	const matrixData = resolveMatrixChannelData(params.payload);
	const fallbackText = renderMessagePresentationFallbackText({
		text: params.payload.text,
		presentation: params.presentation,
		emptyFallback: MATRIX_EMPTY_PRESENTATION_FALLBACK_TEXT
	});
	return {
		...params.payload,
		text: fallbackText,
		channelData: {
			...params.payload.channelData,
			matrix: {
				...matrixData,
				extraContent: { [MATRIX_OPENCLAW_PRESENTATION_KEY]: buildMatrixPresentationContent(params.presentation) }
			}
		}
	};
}
function resolveMatrixPayloadText(payload) {
	const text = payload.text ?? "";
	if (text.trim() || !resolveMatrixPresentationContent(payload)) return text;
	return MATRIX_EMPTY_PRESENTATION_FALLBACK_TEXT;
}
function resolveMatrixExtraContent(payload) {
	const presentation = resolveMatrixPresentationContent(payload);
	return presentation ? { [MATRIX_OPENCLAW_PRESENTATION_KEY]: presentation } : void 0;
}
function resolveMatrixDeliveryProgress(onDeliveryResult) {
	return onDeliveryResult ? async (result) => {
		await onDeliveryResult(attachChannelToResult("matrix", result));
	} : void 0;
}
//#endregion
//#region extensions/matrix/src/channel.runtime.ts
const matrixChannelRuntime = {
	cleanupMatrixDeliveryPlans,
	listMatrixDirectoryGroupsLive,
	listMatrixDirectoryPeersLive,
	matrixOutbound: {
		deliveryMode: "direct",
		chunker: chunkTextForOutbound,
		chunkerMode: "markdown",
		textChunkLimit: 4e3,
		presentationCapabilities: {
			supported: true,
			buttons: true,
			selects: true,
			context: true,
			divider: true,
			limits: { text: {
				markdownDialect: "markdown",
				supportsEdit: true
			} }
		},
		renderPresentation: ({ payload, presentation }) => renderMatrixPresentationPayload({
			payload,
			presentation
		}),
		sendPayload: async ({ cfg, to, payload, mediaLocalRoots, mediaReadFile, mediaAccess, deps, replyToId, replyToIdSource, replyToMode, threadId, accountId, audioAsVoice, onDeliveryResult }) => {
			const send = resolveOutboundSendDep(deps, "matrix") ?? sendMessageMatrix;
			const resolvedThreadId = threadId !== void 0 && threadId !== null ? String(threadId) : void 0;
			const resolveReplyToId = createReplyToFanout({
				...replyToId != null ? { replyToId } : {},
				...replyToIdSource !== void 0 ? { replyToIdSource } : {},
				...replyToMode !== void 0 ? { replyToMode } : {}
			});
			const urls = resolvePayloadMediaUrls(payload);
			const payloadText = resolveMatrixPayloadText(payload);
			if (urls.length > 0) {
				const sentResults = [];
				const lastResult = await sendPayloadMediaSequence({
					text: payloadText,
					mediaUrls: urls,
					send: async ({ text, mediaUrl, isFirst }) => await send(to, text, {
						cfg,
						mediaUrl,
						mediaAccess,
						mediaLocalRoots,
						mediaReadFile,
						replyToId: resolveReplyToId(),
						threadId: resolvedThreadId,
						accountId: accountId ?? void 0,
						audioAsVoice: payload.audioAsVoice ?? audioAsVoice,
						extraContent: isFirst ? resolveMatrixExtraContent(payload) : void 0,
						onDeliveryResult: resolveMatrixDeliveryProgress(onDeliveryResult)
					}),
					onResult: (result) => {
						sentResults.push(result);
					}
				});
				if (lastResult !== void 0) {
					const receipt = createMessageReceiptFromOutboundResults({ results: sentResults });
					receipt.parts = receipt.parts.map((part, index) => ({
						...part,
						index
					}));
					return attachChannelToResult("matrix", {
						...lastResult,
						primaryMessageId: receipt.primaryPlatformMessageId,
						receipt,
						content: sentResults.map((result) => result.content).join("\n")
					});
				}
			}
			return attachChannelToResult("matrix", await send(to, payloadText, {
				cfg,
				mediaAccess,
				mediaLocalRoots,
				mediaReadFile,
				replyToId: resolveReplyToId(),
				threadId: resolvedThreadId,
				accountId: accountId ?? void 0,
				audioAsVoice: payload.audioAsVoice ?? audioAsVoice,
				extraContent: resolveMatrixExtraContent(payload),
				onDeliveryResult: resolveMatrixDeliveryProgress(onDeliveryResult)
			}));
		},
		sendText: async ({ cfg, to, text, deps, replyToId, threadId, accountId, audioAsVoice, deliveryQueueId, deliveryPartIndex, deliveryPartCount, onPlatformSendDispatch, onDeliveryResult }) => {
			return attachChannelToResult("matrix", await (resolveOutboundSendDep(deps, "matrix") ?? sendMessageMatrix)(to, text, {
				cfg,
				replyToId: replyToId ?? void 0,
				threadId: threadId !== void 0 && threadId !== null ? String(threadId) : void 0,
				accountId: accountId ?? void 0,
				audioAsVoice,
				deliveryQueueId,
				deliveryPartIndex,
				...deliveryQueueId !== void 0 ? { deliveryPartCount } : {},
				onPlatformSendDispatch,
				onDeliveryResult: resolveMatrixDeliveryProgress(onDeliveryResult)
			}));
		},
		sendMedia: async ({ cfg, to, text, mediaUrl, mediaLocalRoots, mediaReadFile, mediaAccess, deps, replyToId, threadId, accountId, audioAsVoice, deliveryQueueId, deliveryPartIndex, deliveryPartCount, onPlatformSendDispatch, onDeliveryResult }) => {
			return attachChannelToResult("matrix", await (resolveOutboundSendDep(deps, "matrix") ?? sendMessageMatrix)(to, text, {
				cfg,
				mediaUrl,
				mediaLocalRoots,
				mediaReadFile,
				mediaAccess,
				replyToId: replyToId ?? void 0,
				threadId: threadId !== void 0 && threadId !== null ? String(threadId) : void 0,
				accountId: accountId ?? void 0,
				audioAsVoice,
				deliveryQueueId,
				deliveryPartIndex,
				...deliveryQueueId !== void 0 ? { deliveryPartCount } : {},
				onPlatformSendDispatch,
				onDeliveryResult: resolveMatrixDeliveryProgress(onDeliveryResult)
			}));
		},
		sendPoll: async ({ cfg, to, poll, threadId, accountId }) => {
			const result = await sendPollMatrix(to, poll, {
				cfg,
				threadId: threadId !== void 0 && threadId !== null ? threadId : void 0,
				accountId: accountId ?? void 0
			});
			return {
				channel: "matrix",
				messageId: result.eventId,
				roomId: result.roomId,
				pollId: result.eventId
			};
		}
	},
	probeMatrix,
	resolveMatrixAuth,
	resolveMatrixTargets,
	reconcileMatrixUnknownSend,
	sendMessageMatrix,
	sendTypingMatrix
};
//#endregion
export { matrixChannelRuntime };
