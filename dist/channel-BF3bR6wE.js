import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { i as createLazyRuntimeNamedExport, r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { t as DEFAULT_ACCOUNT_ID } from "./account-id-CIVg1QNG.js";
import { At as boolean, Rn as string, Tn as object, wn as number } from "./schemas-CZ9Toj_c.js";
import { T as MarkdownConfigSchema, _ as DmPolicySchema, b as GroupPolicySchema } from "./zod-schema.agent-runtime-CaWcMFul.js";
import { a as buildChannelConfigSchema, c as buildMultiAccountChannelSchema, t as AllowFromListSchema } from "./config-schema-CPBvH4gM.js";
import { _ as readStringParam } from "./common-RkLs-2lL.js";
import { t as jsonResult } from "./tool-results-BCM3fdVS.js";
import { n as sanitizeAssistantVisibleText } from "./assistant-visible-text-DONkuTGN.js";
import { g as sendPayloadWithChunkedTextAndMedia } from "./reply-payload-BE_j43tQ.js";
import { l as createScopedDmSecurityResolver, m as mapAllowFromEntries, s as createScopedChannelConfigAdapter, t as adaptScopedAccountAccessor } from "./channel-config-helpers-BwgkzH7b.js";
import { r as describeWebhookAccountSnapshot } from "./account-helpers-Dal2iRvY.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import { r as buildSecretInputSchema } from "./secret-input-Dsfz4fVL.js";
import { n as createStaticReplyToModeResolver } from "./threading-helpers-CMXJIj4M.js";
import { d as stripTargetKindPrefix, i as createChatChannelPlugin, t as buildChannelOutboundSessionRoute, u as stripChannelTargetPrefix } from "./core-CRsjVk-I.js";
import { t as createChannelApprovalAuth } from "./approval-auth-helpers-BtEiGp-a.js";
import "./conversation-runtime-Di32wlpI.js";
import { t as chunkTextForOutbound } from "./text-chunking-nhEIGrpB.js";
import { t as formatAllowFromLowercase } from "./allow-from-CoKxBCLg.js";
import { d as createDefaultChannelRuntimeState, m as standardDmPolicyOpenIssue, o as buildTokenChannelStatusSummary, u as createComputedAccountStatusAdapter } from "./status-helpers-CSowaqvB.js";
import "./channel-status-DC6xsPE6.js";
import { a as coerceStatusIssueAccountId, d as readStatusIssueFields } from "./extension-shared-C6go2BUn.js";
import "./channel-config-schema-DElcW4F1.js";
import "./channel-actions-BCwQOL9z.js";
import "./channel-core-B4iQii76.js";
import { p as defineChannelMessageAdapter } from "./channel-outbound-O2_4qIiZ.js";
import { M as createOpenProviderGroupPolicyWarningCollector, g as buildOpenGroupPolicyWarning, h as buildOpenGroupPolicyRestrictSendersWarning } from "./channel-policy-DDPgHZTe.js";
import { a as createEmptyChannelResult, i as createAttachedChannelResultAdapter } from "./channel-send-result-BFAnsv6z.js";
import { p as listResolvedDirectoryUserEntriesFromAllowFrom } from "./directory-config-helpers-DAQqtnAv.js";
import { n as createChannelDirectoryAdapter } from "./directory-runtime-DH1Nd6Dz.js";
import { t as extractToolSend } from "./tool-send-DlIp2cBO.js";
import { i as resolveZaloAccount, n as listZaloAccountIds, r as resolveDefaultZaloAccountId, t as inspectZaloAccount } from "./accounts-CAmu-yYo.js";
import { n as collectRuntimeConfigAssignments, r as secretTargetRegistryEntries } from "./secret-contract-8O-M-edG.js";
import { i as zaloSetupContract, t as createZaloSetupWizardProxy } from "./setup-core-D5-PIt_z.js";
//#region extensions/zalo/src/actions.ts
const loadZaloActionsRuntime = createLazyRuntimeNamedExport(() => import("./actions.runtime.js"), "zaloActionsRuntime");
const providerId = "zalo";
const ZALO_ACTIONS = /* @__PURE__ */ new Set(["send"]);
function listEnabledAccounts(cfg, accountId) {
	return (accountId ? [inspectZaloAccount({
		cfg,
		accountId
	})] : listZaloAccountIds(cfg).map((listedAccountId) => inspectZaloAccount({
		cfg,
		accountId: listedAccountId
	}))).filter((account) => account.enabled && account.tokenStatus === "available");
}
const zaloMessageActions = {
	describeMessageTool: ({ cfg, accountId }) => {
		if (listEnabledAccounts(cfg, accountId).length === 0) return null;
		return {
			actions: Array.from(ZALO_ACTIONS),
			capabilities: []
		};
	},
	supportsAction: ({ action }) => ZALO_ACTIONS.has(action),
	extractToolSend: ({ args }) => extractToolSend(args, "sendMessage"),
	handleAction: async ({ action, params, cfg, accountId }) => {
		if (action === "send") {
			const to = readStringParam(params, "to", { required: true });
			const content = readStringParam(params, "message", {
				required: true,
				allowEmpty: true
			});
			const mediaUrl = readStringParam(params, "media", { trim: false });
			const { sendMessageZalo } = await loadZaloActionsRuntime();
			const result = await sendMessageZalo(to ?? "", content ?? "", {
				accountId: accountId ?? void 0,
				mediaUrl: mediaUrl ?? void 0,
				cfg
			});
			if (!result.ok) return jsonResult({
				ok: false,
				error: result.error ?? "Failed to send Zalo message"
			});
			return jsonResult({
				ok: true,
				to,
				messageId: result.messageId
			});
		}
		throw new Error(`Action ${action} is not supported for provider ${providerId}.`);
	}
};
//#endregion
//#region extensions/zalo/src/approval-auth.ts
function normalizeZaloApproverId(value) {
	const normalized = String(value).trim().replace(/^(zalo|zl):/i, "").trim();
	return /^\d+$/.test(normalized) ? normalized : void 0;
}
const zaloApprovalAuth = createChannelApprovalAuth({
	channelLabel: "Zalo",
	resolveInputs: ({ cfg, accountId }) => {
		return { allowFrom: resolveZaloAccount({
			cfg,
			accountId
		}).config.allowFrom };
	},
	normalizeApprover: normalizeZaloApproverId
}).approvalAuth;
const ZaloConfigSchema = buildMultiAccountChannelSchema(object({
	name: string().optional(),
	enabled: boolean().optional(),
	configWrites: boolean().optional(),
	markdown: MarkdownConfigSchema,
	botToken: buildSecretInputSchema().optional(),
	tokenFile: string().optional(),
	webhookUrl: string().optional(),
	webhookSecret: buildSecretInputSchema().optional(),
	webhookPath: string().optional(),
	dmPolicy: DmPolicySchema.optional(),
	allowFrom: AllowFromListSchema,
	groupPolicy: GroupPolicySchema.optional(),
	groupAllowFrom: AllowFromListSchema,
	mediaMaxMb: number().optional(),
	proxy: string().optional(),
	responsePrefix: string().optional()
}), { accountsMode: "catchall" });
//#endregion
//#region extensions/zalo/src/session-route.ts
function resolveZaloOutboundSessionRoute(params) {
	const trimmed = stripChannelTargetPrefix(params.target, "zalo", "zl");
	if (!trimmed) return null;
	const normalizedTarget = normalizeLowercaseStringOrEmpty(trimmed);
	const isGroup = normalizedTarget.startsWith("group:");
	const recipientSessionExact = /^(?:group|user|dm):/.test(normalizedTarget);
	const peerId = stripTargetKindPrefix(trimmed);
	if (!peerId) return null;
	return buildChannelOutboundSessionRoute({
		cfg: params.cfg,
		agentId: params.agentId,
		channel: "zalo",
		accountId: params.accountId,
		recipientSessionExact,
		peer: {
			kind: isGroup ? "group" : "direct",
			id: peerId
		},
		chatType: isGroup ? "group" : "direct",
		from: isGroup ? `zalo:group:${peerId}` : `zalo:${peerId}`,
		to: `zalo:${peerId}`
	});
}
//#endregion
//#region extensions/zalo/src/status-issues.ts
const ZALO_STATUS_FIELDS = [
	"accountId",
	"enabled",
	"configured",
	"dmPolicy"
];
function collectZaloStatusIssues(accounts) {
	const issues = [];
	for (const entry of accounts) {
		const account = readStatusIssueFields(entry, ZALO_STATUS_FIELDS);
		if (!account) continue;
		const accountId = coerceStatusIssueAccountId(account.accountId) ?? "default";
		const enabled = account.enabled !== false;
		const configured = account.configured === true;
		if (!enabled || !configured) continue;
		if (account.dmPolicy === "open") issues.push(standardDmPolicyOpenIssue({
			channel: "zalo",
			accountId,
			channelLabel: "Zalo",
			configPath: "channels.zalo"
		}));
	}
	return issues;
}
//#endregion
//#region extensions/zalo/src/channel.ts
const meta = {
	id: "zalo",
	label: "Zalo",
	selectionLabel: "Zalo (Bot API)",
	docsPath: "/channels/zalo",
	docsLabel: "zalo",
	blurb: "Vietnam-focused messaging platform with Bot API.",
	aliases: ["zl"],
	order: 80,
	quickstartAllowFrom: true
};
function normalizeZaloMessagingTarget(raw) {
	const trimmed = raw?.trim();
	if (!trimmed) return;
	return trimmed.replace(/^(zalo|zl):/i, "").trim();
}
function looksLikeZaloChatId(raw, normalized) {
	const target = normalizeZaloMessagingTarget(normalized ?? raw);
	return Boolean(target);
}
const loadZaloChannelRuntime = createLazyRuntimeModule(() => import("./channel.runtime-5HUJF7XF.js"));
const zaloSetupWizard = createZaloSetupWizardProxy(async () => (await import("./setup-surface-CTI-Yc3E.js")).zaloSetupWizard);
const zaloTextChunkLimit = 2e3;
async function sendZaloDelivery(ctx) {
	const result = await (await loadZaloChannelRuntime()).sendZaloText({
		to: ctx.to,
		text: ctx.text,
		accountId: ctx.accountId ?? void 0,
		mediaUrl: ctx.mediaUrl,
		cfg: ctx.cfg
	});
	if (!result.ok) throw new Error(result.error ?? `Failed to send Zalo ${ctx.mediaUrl ? "media" : "message"}`);
	return {
		messageId: result.messageId ?? "",
		receipt: result.receipt
	};
}
const zaloSendResultAdapter = createAttachedChannelResultAdapter({
	channel: "zalo",
	sendText: sendZaloDelivery,
	sendMedia: sendZaloDelivery
});
const zaloMessageAdapter = defineChannelMessageAdapter({
	id: "zalo",
	durableFinal: { capabilities: {
		text: true,
		media: true,
		messageSendingHooks: true
	} },
	send: {
		text: sendZaloDelivery,
		media: sendZaloDelivery
	}
});
function isZaloAccountConfigured(account) {
	return account.tokenStatus ? account.tokenStatus !== "missing" : Boolean(account.token?.trim());
}
const zaloConfigAdapter = createScopedChannelConfigAdapter({
	sectionKey: "zalo",
	listAccountIds: listZaloAccountIds,
	resolveAccount: adaptScopedAccountAccessor(resolveZaloAccount),
	defaultAccountId: resolveDefaultZaloAccountId,
	clearBaseFields: [
		"botToken",
		"tokenFile",
		"name"
	],
	resolveAllowFrom: (account) => account.config.allowFrom,
	formatAllowFrom: (allowFrom) => formatAllowFromLowercase({
		allowFrom,
		stripPrefixRe: /^(zalo|zl):/i
	})
});
const resolveZaloDmPolicy = createScopedDmSecurityResolver({
	channelKey: "zalo",
	resolvePolicy: (account) => account.config.dmPolicy,
	resolveAllowFrom: (account) => account.config.allowFrom,
	policyPathSuffix: "dmPolicy",
	normalizeEntry: (raw) => raw.trim().replace(/^(zalo|zl):/i, "")
});
const collectZaloSecurityWarnings = createOpenProviderGroupPolicyWarningCollector({
	providerConfigPresent: (cfg) => cfg.channels?.zalo !== void 0,
	resolveGroupPolicy: ({ account }) => account.config.groupPolicy,
	collect: ({ account, groupPolicy }) => {
		if (groupPolicy !== "open") return [];
		const explicitGroupAllowFrom = mapAllowFromEntries(account.config.groupAllowFrom);
		const dmAllowFrom = mapAllowFromEntries(account.config.allowFrom);
		if ((explicitGroupAllowFrom.length > 0 ? explicitGroupAllowFrom : dmAllowFrom).length > 0) return [buildOpenGroupPolicyRestrictSendersWarning({
			surface: "Zalo groups",
			openScope: "any member",
			groupPolicyPath: "channels.zalo.groupPolicy",
			groupAllowFromPath: "channels.zalo.groupAllowFrom"
		})];
		return [buildOpenGroupPolicyWarning({
			surface: "Zalo groups",
			openBehavior: "with no groupAllowFrom/allowFrom allowlist; any member can trigger (mention-gated)",
			remediation: "Set channels.zalo.groupPolicy=\"allowlist\" + channels.zalo.groupAllowFrom"
		})];
	}
});
const zaloPlugin = createChatChannelPlugin({
	base: {
		id: "zalo",
		meta,
		setupContract: zaloSetupContract,
		setupWizard: zaloSetupWizard,
		capabilities: {
			chatTypes: ["direct", "group"],
			media: true,
			reactions: false,
			threads: false,
			polls: false,
			nativeCommands: false,
			blockStreaming: true
		},
		reload: { configPrefixes: ["channels.zalo"] },
		configSchema: buildChannelConfigSchema(ZaloConfigSchema),
		config: {
			...zaloConfigAdapter,
			inspectAccount: adaptScopedAccountAccessor(inspectZaloAccount),
			isConfigured: isZaloAccountConfigured,
			describeAccount: (account) => describeWebhookAccountSnapshot({
				account,
				configured: isZaloAccountConfigured(account),
				mode: account.config.webhookUrl ? "webhook" : "polling",
				extra: {
					tokenSource: account.tokenSource,
					tokenStatus: account.tokenStatus
				}
			})
		},
		approvalCapability: zaloApprovalAuth,
		secrets: {
			secretTargetRegistryEntries,
			collectRuntimeConfigAssignments
		},
		groups: { resolveRequireMention: () => true },
		actions: zaloMessageActions,
		messaging: {
			targetPrefixes: ["zalo", "zl"],
			normalizeTarget: normalizeZaloMessagingTarget,
			resolveOutboundSessionRoute: (params) => resolveZaloOutboundSessionRoute(params),
			targetResolver: {
				looksLikeId: looksLikeZaloChatId,
				hint: "<chatId>"
			}
		},
		directory: createChannelDirectoryAdapter({
			listPeers: async (params) => listResolvedDirectoryUserEntriesFromAllowFrom({
				...params,
				resolveAccount: adaptScopedAccountAccessor(resolveZaloAccount),
				resolveAllowFrom: (account) => account.config.allowFrom,
				normalizeId: (entry) => entry.trim().replace(/^(zalo|zl):/i, "")
			}),
			listGroups: async () => []
		}),
		status: createComputedAccountStatusAdapter({
			defaultRuntime: createDefaultChannelRuntimeState(DEFAULT_ACCOUNT_ID),
			collectStatusIssues: collectZaloStatusIssues,
			buildChannelSummary: ({ snapshot }) => buildTokenChannelStatusSummary(snapshot),
			probeAccount: async ({ account, timeoutMs }) => await (await loadZaloChannelRuntime()).probeZaloAccount({
				account,
				timeoutMs
			}),
			resolveAccountSnapshot: ({ account }) => {
				const configured = isZaloAccountConfigured(account);
				return {
					accountId: account.accountId,
					name: account.name,
					enabled: account.enabled,
					configured,
					extra: {
						tokenSource: account.tokenSource,
						tokenStatus: account.tokenStatus,
						mode: account.config.webhookUrl ? "webhook" : "polling",
						dmPolicy: account.config.dmPolicy ?? "pairing"
					}
				};
			}
		}),
		gateway: { startAccount: async (ctx) => await (await loadZaloChannelRuntime()).startZaloGatewayAccount(ctx) },
		message: zaloMessageAdapter
	},
	security: {
		resolveDmPolicy: resolveZaloDmPolicy,
		collectWarnings: collectZaloSecurityWarnings
	},
	pairing: { text: {
		idLabel: "zaloUserId",
		message: "Your pairing request has been approved.",
		normalizeAllowEntry: (entry) => entry.trim().replace(/^(zalo|zl):/i, ""),
		notify: async (params) => await (await loadZaloChannelRuntime()).notifyZaloPairingApproval(params)
	} },
	threading: { resolveReplyToMode: createStaticReplyToModeResolver("off") },
	outbound: {
		deliveryMode: "direct",
		chunker: chunkTextForOutbound,
		chunkerMode: "text",
		textChunkLimit: zaloTextChunkLimit,
		sanitizeText: ({ text }) => sanitizeAssistantVisibleText(text),
		sendPayload: async (ctx) => await sendPayloadWithChunkedTextAndMedia({
			ctx,
			textChunkLimit: zaloTextChunkLimit,
			chunker: chunkTextForOutbound,
			sendText: (nextCtx) => zaloSendResultAdapter.sendText(nextCtx),
			sendMedia: (nextCtx) => zaloSendResultAdapter.sendMedia(nextCtx),
			emptyResult: createEmptyChannelResult("zalo"),
			onResult: ctx.onDeliveryResult
		}),
		...zaloSendResultAdapter
	}
});
//#endregion
export { zaloPlugin as t };
