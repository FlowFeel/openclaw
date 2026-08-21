import { _ as readStringParam, h as readStringArrayParam } from "./common-yW0U9cHP.js";
import { t as jsonResult } from "./tool-results-BCM3fdVS.js";
import "./channel-actions-BcF0YtO7.js";
import { t as extractToolSend } from "./tool-send-DlIp2cBO.js";
import { i as resolveGoogleChatAccount } from "./accounts-FwHl_OI1.js";
import { o as resolveGoogleChatOutboundSpace, u as sendGoogleChatMessage } from "./targets-DGhnsvDM.js";
import { t as describeGoogleChatMessageTool } from "./message-tool-api-C3_Pbfo2.js";
//#region extensions/googlechat/src/actions.ts
const providerId = "googlechat";
const OUTBOUND_MEDIA_KEYS = [
	"media",
	"mediaUrl",
	"path",
	"filePath",
	"fileUrl"
];
const STRUCTURED_ATTACHMENT_MEDIA_KEYS = [...OUTBOUND_MEDIA_KEYS, "url"];
function hasGoogleChatOutboundAttachment(params) {
	if (OUTBOUND_MEDIA_KEYS.some((key) => readStringParam(params, key) !== void 0)) return true;
	if (readStringArrayParam(params, "mediaUrls") !== void 0) return true;
	if (!Array.isArray(params.attachments)) return false;
	return params.attachments.some((attachment) => {
		if (!attachment || typeof attachment !== "object" || Array.isArray(attachment)) return false;
		const record = attachment;
		return STRUCTURED_ATTACHMENT_MEDIA_KEYS.some((key) => readStringParam(record, key) !== void 0);
	});
}
const googlechatMessageActions = {
	describeMessageTool: describeGoogleChatMessageTool,
	supportsAction: ({ action }) => action === "send",
	extractToolSend: ({ args }) => {
		return extractToolSend(args, "sendMessage");
	},
	handleAction: async ({ action, params, cfg, accountId }) => {
		if (action === "upload-file") throw new Error("Google Chat outbound attachments require user OAuth and are not supported by this service-account channel.");
		if (action === "send") {
			if (hasGoogleChatOutboundAttachment(params)) throw new Error("Google Chat outbound attachments require user OAuth and are not supported by this service-account channel.");
		}
		const account = resolveGoogleChatAccount({
			cfg,
			accountId
		});
		if (account.credentialSource === "none" || account.tokenStatus === "configured_unavailable") throw new Error("Google Chat credentials are missing.");
		if (action === "send") {
			const to = readStringParam(params, "to", { required: true });
			const content = readStringParam(params, "message", {
				required: true,
				allowEmpty: true
			});
			const threadId = readStringParam(params, "threadId") ?? readStringParam(params, "replyTo");
			const space = await resolveGoogleChatOutboundSpace({
				account,
				target: to
			});
			return jsonResult({
				ok: true,
				to: space,
				...await sendGoogleChatMessage({
					account,
					space,
					text: content,
					thread: threadId ?? void 0
				})
			});
		}
		throw new Error(`Action ${action} is not supported for provider ${providerId}.`);
	}
};
//#endregion
export { googlechatMessageActions };
