import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { t as formatCliCommand } from "./command-format-C5kg4XY_.js";
import { n as normalizeAccountId, t as DEFAULT_ACCOUNT_ID } from "./account-id-CIVg1QNG.js";
import { u as readResponseWithLimit } from "./http-body-CcNaNPg0.js";
import { n as buildTimeoutAbortSignal } from "./fetch-timeout-0BajCOME.js";
import { c as hasConfiguredSecretInput } from "./types.secrets-BvApkFoj.js";
import { s as getChatChannelMeta } from "./registry-DqHlaOgA.js";
import { t as defineChannelSetupContract } from "./setup-contract-v3-D0s84.js";
import { t as formatDocsLink } from "./links-ClIwBcy4.js";
import { t as createSetupTranslator } from "./i18n-BYpJa9f7.js";
import { n as resolveNormalizedAccountEntry } from "./account-lookup-CHR5ohoU.js";
import { A as resolveChannelStreamingPreviewToolProgress, T as resolveChannelStreamingBlockEnabled } from "./streaming-Df3LUUGR.js";
import { l as createScopedDmSecurityResolver, s as createScopedChannelConfigAdapter, t as adaptScopedAccountAccessor } from "./channel-config-helpers-BwgkzH7b.js";
import { r as makeProxyFetch } from "./proxy-fetch-CXtGpMfW.js";
import "./error-runtime-Dbl9_3mW.js";
import "./response-limit-runtime-CwytpHSo.js";
import { a as hasTelegramBotEndpointApiRoot, n as resolveTelegramFetch, o as normalizeTelegramApiRoot, r as resolveTelegramTransport, t as resolveTelegramApiBase } from "./fetch-Cn7NhJH6.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import { r as resolveTelegramRequestTimeoutMs } from "./request-timeouts-C2F_8uWi.js";
import "./account-core-DVrFK8V1.js";
import "./routing-ofUAgwWc.js";
import { n as applySetupAccountConfigPatch, r as createEnvPatchedAccountSetupAdapter } from "./setup-helpers-t3GC4Z1N.js";
import { t as collectChannelAccountScopes, u as asObjectRecord } from "./runtime-doctor-BHX5ardJ.js";
import { N as splitSetupEntries, a as createAllowFromSection, b as patchChannelConfigForAccount, j as setSetupChannelEnabled, s as createStandardChannelSetupStatus, w as promptResolvedAllowFrom } from "./setup-wizard-helpers-C8pTV3Ti.js";
import { n as defineTokenCredential } from "./setup-credential-ASZO-4c5.js";
import "./setup-oCHSAPND.js";
import "./setup-runtime-B3zeWYrb.js";
import "./channel-setup-BejEKHbw.js";
import "./setup-tools-DvrgjDew.js";
import { t as formatAllowFromLowercase } from "./allow-from-CoKxBCLg.js";
import { t as createChannelDmPolicy } from "./channel-dm-policy-DqLuEQvL.js";
import "./channel-plugin-common-CbDMp58p.js";
import "./extension-shared-CyJFAMlE.js";
import { t as createChannelPluginBase } from "./channel-core-e_-777iC.js";
import "./channel-outbound-sjGCUxtt.js";
import { O as createAllowlistProviderRouteAllowlistWarningCollector } from "./channel-policy-BgbKncah.js";
import { t as mergeTelegramAccountConfig } from "./account-config-DE09jCa-.js";
import { a as resolveDefaultTelegramAccountId, o as resolveTelegramAccount, r as listTelegramAccountIds } from "./accounts-CAnRRRPr.js";
import { r as normalizeTelegramAllowFromEntry, t as isNumericTelegramSenderUserId } from "./allow-from-Byf7JKVc.js";
import { t as inspectTelegramAccount } from "./account-inspect-BPGNcGLc.js";
import { t as detectTelegramLegacyStateMigrations } from "./state-migrations-Dbt3xdK6.js";
import { t as resolveTelegramPreviewStreamMode } from "./preview-streaming-CAf3wRPb.js";
import { t as collectTelegramSecurityAuditFindings } from "./security-audit-DKy9dZuq.js";
import { n as singleAccountKeysToMove, t as namedAccountPromotionKeys } from "./setup-contract-CDcIs5O0.js";
import { a as buildTelegramModelsListChannelData, c as buildTelegramModelsProviderChannelData, i as buildTelegramModelsAddProviderChannelData, n as buildTelegramCommandsListChannelData, r as buildTelegramModelBrowseChannelData, s as buildTelegramModelsMenuChannelData } from "./command-ui-Ck7X4qib.js";
import { t as TelegramChannelConfigSchema } from "./config-schema-BjH29mo4.js";
import { n as normalizeCompatibilityConfig, t as legacyConfigRules } from "./doctor-contract-DMw012Ci.js";
import { n as collectRuntimeConfigAssignments, r as secretTargetRegistryEntries } from "./secret-contract-Bd6pWyzb.js";
//#region extensions/telegram/src/api-fetch.ts
const TELEGRAM_BOT_API_MAX_RESPONSE_BYTES = 4 * 1024 * 1024;
function resolveTelegramChatLookupFetch(params) {
	const proxyUrl = params?.proxyUrl?.trim();
	return resolveTelegramFetch(proxyUrl ? makeProxyFetch(proxyUrl) : void 0, { network: params?.network });
}
async function lookupTelegramChatId(params) {
	const proxyUrl = params.proxyUrl?.trim();
	const transport = resolveTelegramTransport(proxyUrl ? makeProxyFetch(proxyUrl) : void 0, { network: params.network });
	try {
		return await fetchTelegramChatId({
			token: params.token,
			chatId: params.chatId,
			signal: params.signal,
			apiRoot: params.apiRoot,
			timeoutSeconds: params.timeoutSeconds,
			fetchImpl: transport.fetch
		});
	} finally {
		await transport.close();
	}
}
async function fetchTelegramChatId(params) {
	const url = `${resolveTelegramApiBase(params.apiRoot)}/bot${params.token}/getChat?chat_id=${encodeURIComponent(params.chatId)}`;
	const fetchImpl = params.fetchImpl ?? fetch;
	const requestAbortController = new AbortController();
	const timeout = buildTimeoutAbortSignal({
		signal: params.signal ? AbortSignal.any([params.signal, requestAbortController.signal]) : requestAbortController.signal,
		timeoutMs: resolveTelegramRequestTimeoutMs("getchat", params.timeoutSeconds),
		operation: "telegram-getchat-lookup",
		url
	});
	try {
		const res = await fetchImpl(url, timeout.signal ? { signal: timeout.signal } : void 0);
		if (!res.ok) {
			requestAbortController.abort(/* @__PURE__ */ new Error(`Telegram getChat failed with HTTP ${res.status}`));
			res.body?.cancel().catch(() => void 0);
			return null;
		}
		let data = null;
		try {
			data = JSON.parse((await readResponseWithLimit(res, TELEGRAM_BOT_API_MAX_RESPONSE_BYTES)).toString("utf8"));
		} catch {
			return null;
		}
		const id = data?.ok ? data?.result?.id : void 0;
		if (typeof id === "number" || typeof id === "string") return String(id);
		return null;
	} catch {
		return null;
	} finally {
		timeout.cleanup();
	}
}
const telegramSecurityAdapter = {
	resolveDmPolicy: createScopedDmSecurityResolver({
		channelKey: "telegram",
		resolvePolicy: (account) => account.config.dmPolicy,
		resolveAllowFrom: (account) => account.config.allowFrom,
		policyPathSuffix: "dmPolicy",
		normalizeEntry: (raw) => raw.replace(/^(telegram|tg):/i, "")
	}),
	collectWarnings: createAllowlistProviderRouteAllowlistWarningCollector({
		providerConfigPresent: (cfg) => cfg.channels?.telegram !== void 0,
		resolveGroupPolicy: (account) => account.config.groupPolicy,
		resolveRouteAllowlistConfigured: (account) => Boolean(account.config.groups) && Object.keys(account.config.groups ?? {}).length > 0,
		restrictSenders: {
			surface: "Telegram groups",
			openScope: "any member in allowed groups",
			groupPolicyPath: "channels.telegram.groupPolicy",
			groupAllowFromPath: "channels.telegram.groupAllowFrom"
		},
		noRouteAllowlist: {
			surface: "Telegram groups",
			routeAllowlistPath: "channels.telegram.groups",
			routeScope: "group",
			groupPolicyPath: "channels.telegram.groupPolicy",
			groupAllowFromPath: "channels.telegram.groupAllowFrom"
		}
	}),
	collectAuditFindings: collectTelegramSecurityAuditFindings
};
//#endregion
//#region extensions/telegram/src/setup-core.ts
const t$1 = createSetupTranslator();
const channel$2 = "telegram";
function getTelegramTokenHelpLines() {
	return [
		t$1("wizard.telegram.tokenHelpOpenBotFather"),
		t$1("wizard.telegram.tokenHelpNewBot"),
		t$1("wizard.telegram.tokenHelpCopyToken"),
		t$1("wizard.telegram.tokenHelpWebApp", { url: "https://t.me/BotFather?startapp" }),
		t$1("wizard.telegram.tokenEnvTip"),
		t$1("wizard.channels.docs", { link: formatDocsLink("/telegram") }),
		t$1("wizard.telegram.website", { url: "https://openclaw.ai" })
	];
}
function getTelegramUserIdHelpLines() {
	return [
		t$1("wizard.telegram.userIdHelpLogs", { command: formatCliCommand("openclaw logs --follow") }),
		t$1("wizard.telegram.userIdHelpGetUpdates"),
		t$1("wizard.telegram.userIdHelpThirdParty"),
		t$1("wizard.channels.docs", { link: formatDocsLink("/telegram") }),
		t$1("wizard.telegram.website", { url: "https://openclaw.ai" })
	];
}
function normalizeTelegramAllowFromInput(raw) {
	return raw.trim().replace(/^(telegram|tg):/i, "").trim();
}
function parseTelegramAllowFromId(raw) {
	const stripped = normalizeTelegramAllowFromInput(raw);
	return isNumericTelegramSenderUserId(stripped) ? stripped : null;
}
async function promptTelegramAllowFromForAccount(params) {
	const accountId = params.accountId ?? resolveDefaultTelegramAccountId(params.cfg);
	const resolved = resolveTelegramAccount({
		cfg: params.cfg,
		accountId
	});
	await params.prompter.note(getTelegramUserIdHelpLines().join("\n"), t$1("wizard.telegram.userIdTitle"));
	const unique = await promptResolvedAllowFrom({
		prompter: params.prompter,
		existing: resolved.config.allowFrom ?? [],
		message: t$1("wizard.telegram.allowFromPrompt"),
		placeholder: "123456789",
		label: t$1("wizard.telegram.allowlistTitle"),
		parseInputs: splitSetupEntries,
		parseId: parseTelegramAllowFromId,
		invalidWithoutTokenNote: t$1("wizard.telegram.allowFromInvalid"),
		resolveEntries: async ({ entries }) => entries.map((entry) => {
			const id = parseTelegramAllowFromId(entry);
			return {
				input: entry,
				resolved: Boolean(id),
				id
			};
		})
	});
	return patchChannelConfigForAccount({
		cfg: params.cfg,
		channel: channel$2,
		accountId,
		patch: {
			dmPolicy: "allowlist",
			allowFrom: unique
		},
		setupSurface: telegramSetupAdapter
	});
}
const telegramSetupAdapter = {
	...createEnvPatchedAccountSetupAdapter({
		channelKey: channel$2,
		defaultAccountOnlyEnvError: "TELEGRAM_BOT_TOKEN can only be used for the default account.",
		missingCredentialError: "Telegram requires token or --token-file (or --use-env).",
		hasCredentials: (input) => Boolean(input.token || input.tokenFile),
		buildPatch: (input) => input.tokenFile ? { tokenFile: input.tokenFile } : input.token ? { botToken: input.token } : {}
	}),
	singleAccountKeysToMove,
	namedAccountPromotionKeys
};
const telegramSetupContract = defineChannelSetupContract({
	fields: {
		token: {
			kind: "string",
			sensitive: true,
			cli: {
				flags: "--token <token>",
				description: "Telegram bot token"
			}
		},
		tokenFile: {
			kind: "string",
			sensitive: true,
			cli: {
				flags: "--token-file <path>",
				description: "Telegram bot token file"
			}
		},
		useEnv: {
			kind: "boolean",
			cli: {
				flags: "--use-env",
				description: "Use TELEGRAM_BOT_TOKEN"
			}
		}
	},
	legacyAdapter: telegramSetupAdapter
});
//#endregion
//#region extensions/telegram/src/setup-surface.helpers.ts
const channel$1 = "telegram";
function ensureTelegramDefaultGroupMentionGate(cfg, accountId) {
	const resolved = resolveTelegramAccount({
		cfg,
		accountId
	});
	const wildcardGroup = resolved.config.groups?.["*"];
	if (wildcardGroup?.requireMention !== void 0) return cfg;
	return patchChannelConfigForAccount({
		cfg,
		channel: channel$1,
		accountId,
		patch: { groups: {
			...resolved.config.groups,
			"*": {
				...wildcardGroup,
				requireMention: true
			}
		} },
		setupSurface: telegramSetupAdapter
	});
}
function shouldShowTelegramDmAccessWarning(cfg, accountId) {
	const merged = mergeTelegramAccountConfig(cfg, accountId);
	const policy = merged.dmPolicy ?? "pairing";
	const hasAllowFrom = Array.isArray(merged.allowFrom) && merged.allowFrom.some((entry) => normalizeOptionalString(String(entry)));
	return policy === "pairing" && !hasAllowFrom;
}
function buildTelegramDmAccessWarningLines(accountId) {
	const configBase = accountId === "default" ? "channels.telegram" : `channels.telegram.accounts.${accountId}`;
	return [
		"Your bot is using DM policy: pairing.",
		"Any Telegram user who discovers the bot can send pairing requests.",
		"For private use, configure an allowlist with your Telegram user id:",
		"  " + formatCliCommand(`openclaw config set ${configBase}.dmPolicy "allowlist"`),
		"  " + formatCliCommand(`openclaw config set ${configBase}.allowFrom '["YOUR_USER_ID"]'`),
		`Docs: ${formatDocsLink("/channels/pairing", "channels/pairing")}`
	];
}
const telegramSetupDmPolicy = createChannelDmPolicy({
	label: "Telegram",
	channel: channel$1,
	resolveAccount: (cfg, accountId) => {
		const resolvedAccountId = accountId ?? resolveDefaultTelegramAccountId(cfg);
		return {
			accountId: resolvedAccountId,
			config: mergeTelegramAccountConfig(cfg, resolvedAccountId)
		};
	},
	applyPatch: ({ cfg, requestedAccountId, account, patch }) => requestedAccountId == null && account.accountId !== "default" ? applySetupAccountConfigPatch({
		cfg,
		channelKey: channel$1,
		accountId: account.accountId,
		patch
	}) : patchChannelConfigForAccount({
		cfg,
		channel: channel$1,
		accountId: account.accountId,
		patch,
		setupSurface: telegramSetupAdapter
	}),
	promptAllowFrom: promptTelegramAllowFromForAccount
});
//#endregion
//#region extensions/telegram/src/setup-surface.ts
const t = createSetupTranslator();
const channel = "telegram";
const telegramSetupWizard = {
	channel,
	status: createStandardChannelSetupStatus({
		channelLabel: "Telegram",
		configuredLabel: t("wizard.channels.statusConfigured"),
		unconfiguredLabel: t("wizard.channels.statusNeedsToken"),
		configuredHint: t("wizard.channels.statusRecommendedConfigured"),
		unconfiguredHint: t("wizard.channels.statusRecommendedNewcomerFriendly"),
		configuredScore: 1,
		unconfiguredScore: 10,
		resolveConfigured: ({ cfg, accountId }) => (accountId ? [accountId] : listTelegramAccountIds(cfg)).some((resolvedAccountId) => {
			return inspectTelegramAccount({
				cfg,
				accountId: resolvedAccountId
			}).configured;
		})
	}),
	prepare: async ({ cfg, accountId, credentialValues }) => ({
		cfg: ensureTelegramDefaultGroupMentionGate(cfg, accountId),
		credentialValues
	}),
	credentials: [defineTokenCredential({
		inputKey: "token",
		configKey: "botToken",
		configuredFields: ["botToken", "tokenFile"],
		providerHint: channel,
		credentialLabel: t("wizard.telegram.botToken"),
		preferredEnvVar: "TELEGRAM_BOT_TOKEN",
		helpTitle: t("wizard.telegram.botToken"),
		helpLines: getTelegramTokenHelpLines(),
		envPrompt: t("wizard.telegram.tokenEnvPrompt"),
		keepPrompt: t("wizard.telegram.tokenKeepPrompt"),
		inputPrompt: t("wizard.telegram.tokenInputPrompt"),
		allowEnv: ({ accountId }) => accountId === DEFAULT_ACCOUNT_ID,
		resolveAccount: ({ cfg, accountId }) => resolveTelegramAccount({
			cfg,
			accountId
		}),
		hasConfiguredValue: (account) => hasConfiguredSecretInput(account.config.botToken) || Boolean(account.config.tokenFile?.trim()),
		resolvedValue: (account) => normalizeOptionalString(account.token),
		envValue: ({ accountId }) => accountId === "default" ? normalizeOptionalString(process.env.TELEGRAM_BOT_TOKEN) : void 0
	})],
	allowFrom: createAllowFromSection({
		helpTitle: t("wizard.telegram.userIdTitle"),
		helpLines: getTelegramUserIdHelpLines(),
		message: t("wizard.telegram.allowFromPrompt"),
		placeholder: "123456789",
		invalidWithoutCredentialNote: t("wizard.telegram.allowFromInvalid"),
		parseInputs: splitSetupEntries,
		parseId: parseTelegramAllowFromId,
		resolveEntries: async ({ entries }) => entries.map((entry) => {
			const id = parseTelegramAllowFromId(entry);
			return {
				input: entry,
				resolved: Boolean(id),
				id
			};
		}),
		apply: async ({ cfg, accountId, allowFrom }) => patchChannelConfigForAccount({
			cfg,
			channel,
			accountId,
			patch: {
				dmPolicy: "allowlist",
				allowFrom
			},
			setupSurface: telegramSetupAdapter
		})
	}),
	finalize: async ({ cfg, accountId, prompter }) => {
		if (!shouldShowTelegramDmAccessWarning(cfg, accountId)) return;
		await prompter.note(buildTelegramDmAccessWarningLines(accountId).join("\n"), "Telegram DM access warning");
	},
	dmPolicy: telegramSetupDmPolicy,
	disable: (cfg) => setSetupChannelEnabled(cfg, channel, false)
};
//#endregion
//#region extensions/telegram/src/doctor.ts
function sanitizeForLog(value) {
	return value.replace(/\p{Cc}+/gu, " ").trim();
}
function hasAllowFromEntries(values) {
	return Array.isArray(values) && values.some((entry) => normalizeOptionalString(String(entry)));
}
function collectTelegramAllowFromLists(prefix, account) {
	const refs = [{
		pathLabel: `${prefix}.allowFrom`,
		holder: account,
		key: "allowFrom"
	}, {
		pathLabel: `${prefix}.groupAllowFrom`,
		holder: account,
		key: "groupAllowFrom"
	}];
	const groups = asObjectRecord(account.groups);
	if (!groups) return refs;
	for (const groupId of Object.keys(groups)) {
		const group = asObjectRecord(groups[groupId]);
		if (!group) continue;
		refs.push({
			pathLabel: `${prefix}.groups.${groupId}.allowFrom`,
			holder: group,
			key: "allowFrom"
		});
		const topics = asObjectRecord(group.topics);
		if (!topics) continue;
		for (const topicId of Object.keys(topics)) {
			const topic = asObjectRecord(topics[topicId]);
			if (!topic) continue;
			refs.push({
				pathLabel: `${prefix}.groups.${groupId}.topics.${topicId}.allowFrom`,
				holder: topic,
				key: "allowFrom"
			});
		}
	}
	return refs;
}
function describeConfigValueType(value) {
	if (Array.isArray(value)) return "array";
	if (value === null) return "null";
	return typeof value;
}
function scanTelegramMalformedGroupsConfig(cfg) {
	const hits = [];
	for (const scope of collectChannelAccountScopes({
		cfg,
		channelId: "telegram"
	})) {
		if (!Object.hasOwn(scope.account, "groups")) continue;
		const groups = scope.account.groups;
		if (asObjectRecord(groups)) continue;
		hits.push({
			path: `${scope.prefix}.groups`,
			actualType: describeConfigValueType(groups)
		});
	}
	return hits;
}
function collectTelegramMalformedGroupsWarnings(params) {
	if (params.hits.length === 0) return [];
	const sample = params.hits[0] ?? {
		path: "channels.telegram.groups",
		actualType: "unknown"
	};
	return [`- ${sanitizeForLog(sample.path)} has invalid Telegram groups shape (${sanitizeForLog(sample.actualType)}); expected an object map keyed by Telegram group/chat id, not an array, string, or null.`, `- Example shape: channels.telegram.groups."-1001234567890".topics."99" = { agentId: "support" }. Use topics for forum-topic routing, then rerun ${params.doctorFixCommand} for any remaining Telegram config cleanup.`];
}
function scanTelegramInvalidAllowFromEntries(cfg) {
	const hits = [];
	const scanList = (pathLabel, list) => {
		if (!Array.isArray(list)) return;
		for (const entry of list) {
			const normalized = normalizeTelegramAllowFromEntry(entry);
			if (!normalized || normalized === "*" || isNumericTelegramSenderUserId(normalized)) continue;
			hits.push({
				path: pathLabel,
				entry: normalizeOptionalString(String(entry)) ?? ""
			});
		}
	};
	for (const scope of collectChannelAccountScopes({
		cfg,
		channelId: "telegram"
	})) for (const ref of collectTelegramAllowFromLists(scope.prefix, scope.account)) scanList(ref.pathLabel, ref.holder[ref.key]);
	return hits;
}
function collectTelegramInvalidAllowFromWarnings(params) {
	if (params.hits.length === 0) return [];
	const sampleEntry = sanitizeForLog(params.hits[0]?.entry ?? "@");
	return [`- Telegram allowFrom contains ${params.hits.length} invalid sender entries (e.g. ${sampleEntry}); Telegram authorization requires positive numeric sender user IDs.`, `- Run "${params.doctorFixCommand}" to auto-resolve @username entries to numeric IDs (requires a Telegram bot token). Move negative chat IDs under channels.telegram.groups instead of allowFrom.`];
}
function scanTelegramBotEndpointApiRoots(cfg) {
	const hits = [];
	for (const scope of collectChannelAccountScopes({
		cfg,
		channelId: "telegram"
	})) {
		const value = scope.account.apiRoot;
		if (typeof value !== "string" || !hasTelegramBotEndpointApiRoot(value)) continue;
		hits.push({
			path: `${scope.prefix}.apiRoot`,
			pathSegments: [...scope.pathSegments, "apiRoot"],
			value,
			normalized: normalizeTelegramApiRoot(value)
		});
	}
	return hits;
}
function collectTelegramApiRootWarnings(params) {
	if (params.hits.length === 0) return [];
	return [`- ${sanitizeForLog(params.hits[0]?.path ?? "channels.telegram.apiRoot")} points at a full Telegram bot endpoint; apiRoot must be the Bot API root only. This can make startup calls like deleteWebhook, deleteMyCommands, and setMyCommands fail with 404 even when direct curl commands work.`, `- Run "${params.doctorFixCommand}" to remove the trailing /bot<TOKEN> path from Telegram apiRoot.`];
}
function formatTelegramAccountConfigPath(cfg, accountId) {
	const accounts = asObjectRecord(asObjectRecord(cfg.channels?.telegram)?.accounts);
	if (!accounts || Object.keys(accounts).length === 0) return "channels.telegram";
	return accountId === "default" ? "channels.telegram" : `channels.telegram.accounts.${accountId}`;
}
function scanTelegramSelectedQuoteToolProgressWarnings(cfg) {
	if (!asObjectRecord(cfg.channels?.telegram)) return [];
	return listTelegramAccountIds(cfg).flatMap((accountId) => {
		const account = mergeTelegramAccountConfig(cfg, accountId);
		const replyToMode = account.replyToMode ?? "off";
		if (replyToMode === "off") return [];
		if (resolveTelegramPreviewStreamMode(account) === "off") return [];
		if ((resolveChannelStreamingBlockEnabled(account) ?? cfg.agents?.defaults?.blockStreamingDefault === "on") || !resolveChannelStreamingPreviewToolProgress(account, true, resolveTelegramPreviewStreamMode(account))) return [];
		return [{
			path: formatTelegramAccountConfigPath(cfg, accountId),
			replyToMode
		}];
	});
}
function collectTelegramSelectedQuoteToolProgressWarnings(params) {
	if (params.hits.length === 0) return [];
	const sample = params.hits[0] ?? {
		path: "channels.telegram",
		replyToMode: "first"
	};
	return [`- ${sanitizeForLog(sample.path)} has replyToMode: "${sanitizeForLog(sample.replyToMode)}" while Telegram preview tool-progress is enabled. Telegram selected quote replies must send the final answer through the native quote-reply path, so those turns skip the short "Working" tool-progress preview. Current-message replies without selected quote text still keep preview streaming.`, "- Set replyToMode: \"off\" when tool-progress preview matters more than native quote replies, or set streaming.preview.toolProgress: false to keep quote replies and silence this warning."];
}
function maybeRepairTelegramApiRoots(cfg) {
	const hits = scanTelegramBotEndpointApiRoots(cfg);
	if (hits.length === 0) return {
		config: cfg,
		changes: []
	};
	const next = structuredClone(cfg);
	const apply = (path, normalized) => {
		let target = next;
		for (const segment of path.slice(0, -1)) {
			target = asObjectRecord(target?.[segment]);
			if (!target) return;
		}
		target[path[path.length - 1] ?? "apiRoot"] = normalized;
	};
	for (const hit of hits) apply(hit.pathSegments, hit.normalized);
	return {
		config: next,
		changes: hits.map((hit) => `- ${sanitizeForLog(hit.path)}: removed trailing /bot<TOKEN> from Telegram apiRoot.`)
	};
}
function collectTelegramMissingEnvTokenWarnings(params) {
	if (resolveDefaultTelegramAccountId(params.cfg) !== "default") return [];
	const account = inspectTelegramAccount({
		cfg: params.cfg,
		accountId: "default",
		envToken: params.env?.TELEGRAM_BOT_TOKEN ?? ""
	});
	if (!account.enabled || account.tokenStatus !== "missing" || account.tokenSource !== "none") return [];
	return ["- channels.telegram: default account has no available bot token, and TELEGRAM_BOT_TOKEN is absent in this doctor environment. After migration, verify TELEGRAM_BOT_TOKEN is present in the state-dir .env or configure channels.telegram.botToken / channels.telegram.accounts.default.botToken as a SecretRef."];
}
async function repairTelegramConfig(params) {
	const apiRootRepair = maybeRepairTelegramApiRoots(params.cfg);
	const allowFromRepair = await maybeRepairTelegramAllowFromUsernames(apiRootRepair.config);
	return {
		config: allowFromRepair.config,
		changes: [...apiRootRepair.changes, ...allowFromRepair.changes]
	};
}
async function maybeRepairTelegramAllowFromUsernames(cfg) {
	const hits = scanTelegramInvalidAllowFromEntries(cfg);
	if (hits.length === 0) return {
		config: cfg,
		changes: []
	};
	if (hits.filter((hit) => {
		const normalized = normalizeTelegramAllowFromEntry(hit.entry);
		return normalized.length > 0 && !/\s/.test(normalized) && !normalized.startsWith("-");
	}).length === 0) return {
		config: cfg,
		changes: hits.slice(0, 5).map((hit) => `- ${sanitizeForLog(hit.path)}: invalid sender entry ${sanitizeForLog(hit.entry)}; allowFrom requires positive numeric Telegram user IDs. Move group chat IDs under channels.telegram.groups.`)
	};
	const { getChannelsCommandSecretTargetIds, resolveCommandSecretRefsViaGateway } = await import("./plugin-sdk/runtime.js");
	const { resolvedConfig } = await resolveCommandSecretRefsViaGateway({
		config: cfg,
		commandName: "doctor --fix",
		targetIds: getChannelsCommandSecretTargetIds(),
		mode: "read_only_status"
	});
	const tokenResolutionWarnings = [];
	const resolverAccountIds = [];
	let sawConfiguredUnavailableToken = false;
	for (const accountId of listTelegramAccountIds(resolvedConfig)) {
		let inspected;
		try {
			inspected = inspectTelegramAccount({
				cfg: resolvedConfig,
				accountId
			});
		} catch (error) {
			tokenResolutionWarnings.push(`- Telegram account ${accountId}: failed to inspect bot token (${formatErrorMessage(error)}).`);
			continue;
		}
		if (inspected.tokenStatus === "configured_unavailable") {
			sawConfiguredUnavailableToken = true;
			tokenResolutionWarnings.push(`- Telegram account ${accountId}: failed to inspect bot token (configured but unavailable in this command path).`);
		}
		if (inspected.tokenSource === "none" ? "" : normalizeOptionalString(inspected.token) ?? "") resolverAccountIds.push(accountId);
	}
	if (resolverAccountIds.length === 0) return {
		config: cfg,
		changes: [...tokenResolutionWarnings, sawConfiguredUnavailableToken ? "- Telegram allowFrom contains @username entries, but configured Telegram bot credentials are unavailable in this command path; cannot auto-resolve." : "- Telegram allowFrom contains @username entries, but no Telegram bot token is available in this command path; cannot auto-resolve."]
	};
	const resolveUserId = async (raw) => {
		const trimmed = normalizeOptionalString(raw) ?? "";
		if (!trimmed) return null;
		const normalized = normalizeTelegramAllowFromEntry(trimmed);
		if (!normalized || normalized === "*") return null;
		if (isNumericTelegramSenderUserId(normalized) || /\s/.test(normalized)) return isNumericTelegramSenderUserId(normalized) ? normalized : null;
		const username = normalized.startsWith("@") ? normalized : `@${normalized}`;
		for (const accountId of resolverAccountIds) try {
			const account = resolveTelegramAccount({
				cfg: resolvedConfig,
				accountId
			});
			const token = account.token.trim();
			if (!token) continue;
			const id = await lookupTelegramChatId({
				token,
				chatId: username,
				network: account.config.network,
				signal: void 0
			});
			if (id) return id;
		} catch {}
		return null;
	};
	const next = structuredClone(cfg);
	const changes = [];
	const repairList = async (pathLabel, holder, key) => {
		const raw = holder[key];
		if (!Array.isArray(raw)) return;
		const out = [];
		const replaced = [];
		for (const entry of raw) {
			const normalized = normalizeTelegramAllowFromEntry(entry);
			if (!normalized) continue;
			if (normalized === "*" || isNumericTelegramSenderUserId(normalized)) {
				out.push(normalized);
				continue;
			}
			const resolved = await resolveUserId(String(entry));
			if (resolved) {
				out.push(resolved);
				replaced.push({
					from: normalizeOptionalString(String(entry)) ?? "",
					to: resolved
				});
			} else out.push(normalizeOptionalString(String(entry)) ?? "");
		}
		const deduped = [];
		const seen = /* @__PURE__ */ new Set();
		for (const entry of out) {
			const keyValue = normalizeOptionalString(String(entry)) ?? "";
			if (!keyValue || seen.has(keyValue)) continue;
			seen.add(keyValue);
			deduped.push(entry);
		}
		holder[key] = deduped;
		for (const replacement of replaced.slice(0, 5)) changes.push(`- ${sanitizeForLog(pathLabel)}: resolved ${sanitizeForLog(replacement.from)} -> ${sanitizeForLog(replacement.to)}`);
		if (replaced.length > 5) changes.push(`- ${sanitizeForLog(pathLabel)}: resolved ${replaced.length - 5} more @username entries`);
	};
	for (const scope of collectChannelAccountScopes({
		cfg: next,
		channelId: "telegram"
	})) for (const ref of collectTelegramAllowFromLists(scope.prefix, scope.account)) await repairList(ref.pathLabel, ref.holder, ref.key);
	if (changes.length === 0) return {
		config: cfg,
		changes: []
	};
	return {
		config: next,
		changes
	};
}
function hasConfiguredGroups(account, parent) {
	const groups = asObjectRecord(account.groups) ?? asObjectRecord(parent?.groups);
	return Boolean(groups) && Object.keys(groups ?? {}).length > 0;
}
function collectTelegramGroupPolicyWarnings(params) {
	if (!hasConfiguredGroups(params.account, params.parent)) {
		const effectiveDmPolicy = params.dmPolicy ?? "pairing";
		const dmSetupLine = effectiveDmPolicy === "pairing" ? "DMs use pairing mode, so new senders must start a chat and be approved before regular messages are accepted." : effectiveDmPolicy === "allowlist" ? `DMs use allowlist mode, so only sender IDs in ${params.prefix}.allowFrom are accepted.` : effectiveDmPolicy === "open" ? "DMs are open." : "DMs are disabled.";
		return [`- ${params.prefix}: Telegram is in first-time setup mode. ${dmSetupLine} Group messages stay blocked until you add allowed chats under ${params.prefix}.groups (and optional sender IDs under ${params.prefix}.groupAllowFrom), or set ${params.prefix}.groupPolicy to "open" if you want broad group access.`];
	}
	const rawGroupAllowFrom = params.account.groupAllowFrom ?? params.parent?.groupAllowFrom;
	if (hasAllowFromEntries((hasAllowFromEntries(rawGroupAllowFrom) ? rawGroupAllowFrom : void 0) ?? params.effectiveAllowFrom)) return [];
	return [`- ${params.prefix}.groupPolicy is "allowlist" but groupAllowFrom (and allowFrom) is empty — all group messages will be silently dropped. Add sender IDs to ${params.prefix}.groupAllowFrom or ${params.prefix}.allowFrom, or set ${params.prefix}.groupPolicy to "open".`];
}
function collectTelegramEmptyAllowlistExtraWarnings(params) {
	const account = params.account;
	const parent = params.parent;
	return params.channelName === "telegram" && (account.groupPolicy ?? parent?.groupPolicy ?? void 0) === "allowlist" ? collectTelegramGroupPolicyWarnings({
		account,
		dmPolicy: params.dmPolicy,
		effectiveAllowFrom: params.effectiveAllowFrom,
		parent,
		prefix: params.prefix
	}) : [];
}
const telegramDoctor = {
	legacyConfigRules,
	normalizeCompatibilityConfig,
	collectPreviewWarnings: ({ cfg, doctorFixCommand, env }) => [
		...collectTelegramMissingEnvTokenWarnings({
			cfg,
			env
		}),
		...collectTelegramMalformedGroupsWarnings({
			hits: scanTelegramMalformedGroupsConfig(cfg),
			doctorFixCommand
		}),
		...collectTelegramInvalidAllowFromWarnings({
			hits: scanTelegramInvalidAllowFromEntries(cfg),
			doctorFixCommand
		}),
		...collectTelegramApiRootWarnings({
			hits: scanTelegramBotEndpointApiRoots(cfg),
			doctorFixCommand
		}),
		...collectTelegramSelectedQuoteToolProgressWarnings({ hits: scanTelegramSelectedQuoteToolProgressWarnings(cfg) })
	],
	repairConfig: async ({ cfg }) => await repairTelegramConfig({ cfg }),
	collectEmptyAllowlistExtraWarnings: collectTelegramEmptyAllowlistExtraWarnings,
	shouldSkipDefaultEmptyGroupAllowlistWarning: (params) => params.channelName === "telegram"
};
//#endregion
//#region extensions/telegram/src/shared.ts
const TELEGRAM_CHANNEL = "telegram";
function findTelegramTokenOwnerAccountId(params) {
	const normalizedAccountId = normalizeAccountId(params.accountId);
	const tokenOwners = /* @__PURE__ */ new Map();
	for (const id of listTelegramAccountIds(params.cfg)) {
		const account = inspectTelegramAccount({
			cfg: params.cfg,
			accountId: id
		});
		const token = (account.token ?? "").trim();
		if (!token) continue;
		const ownerAccountId = tokenOwners.get(token);
		if (!ownerAccountId) {
			tokenOwners.set(token, account.accountId);
			continue;
		}
		if (account.accountId === normalizedAccountId) return ownerAccountId;
	}
	return null;
}
function formatDuplicateTelegramTokenReason(params) {
	return `Duplicate Telegram bot token: account "${params.accountId}" shares a token with account "${params.ownerAccountId}". Keep one owner account per bot token.`;
}
/**
* Returns true when the runtime token resolver (`resolveTelegramToken`) would
* block channel-level fallthrough for the given accountId.  This mirrors the
* guard in `token.ts` so that status-check functions (`isConfigured`,
* `unconfiguredReason`, `describeAccount`) stay consistent with the gateway
* runtime behaviour.
*
* The guard fires when:
*   1. The accountId is not the default account, AND
*   2. The config has an explicit `accounts` section with entries, AND
*   3. The accountId is not found in that `accounts` section.
*
* See: https://github.com/openclaw/openclaw/issues/53876
*/
function isBlockedByMultiBotGuard(cfg, accountId) {
	if (normalizeAccountId(accountId) === "default") return false;
	const accounts = cfg.channels?.telegram?.accounts;
	if (!(Boolean(accounts) && typeof accounts === "object" && !Array.isArray(accounts) && Object.keys(accounts).length > 0)) return false;
	return !resolveNormalizedAccountEntry(accounts, accountId, normalizeAccountId);
}
function resolveTelegramConfigAccessorAccount(params) {
	const accountId = normalizeAccountId(params.accountId ?? resolveDefaultTelegramAccountId(params.cfg));
	return { config: mergeTelegramAccountConfig(params.cfg, accountId) };
}
const telegramConfigAdapter = createScopedChannelConfigAdapter({
	sectionKey: TELEGRAM_CHANNEL,
	listAccountIds: listTelegramAccountIds,
	resolveAccount: adaptScopedAccountAccessor(resolveTelegramAccount),
	resolveAccessorAccount: resolveTelegramConfigAccessorAccount,
	inspectAccount: adaptScopedAccountAccessor(inspectTelegramAccount),
	defaultAccountId: resolveDefaultTelegramAccountId,
	clearBaseFields: [
		"botToken",
		"tokenFile",
		"name"
	],
	resolveAllowFrom: (account) => account.config.allowFrom,
	formatAllowFrom: (allowFrom) => formatAllowFromLowercase({
		allowFrom,
		stripPrefixRe: /^(telegram|tg):/i
	}),
	resolveDefaultTo: (account) => account.config.defaultTo
});
function createTelegramPluginBase(params) {
	return {
		...createChannelPluginBase({
			id: TELEGRAM_CHANNEL,
			setupContract: params.setupContract,
			meta: {
				...getChatChannelMeta(TELEGRAM_CHANNEL),
				quickstartAllowFrom: true
			},
			setupWizard: params.setupWizard,
			capabilities: {
				chatTypes: [
					"direct",
					"group",
					"channel",
					"thread"
				],
				reactions: true,
				threads: true,
				media: true,
				tts: { voice: { synthesisTarget: "voice-note" } },
				polls: true,
				nativeCommands: true,
				blockStreaming: true
			},
			commands: {
				nativeCommandsAutoEnabled: true,
				nativeSkillsAutoEnabled: true,
				buildCommandsListChannelData: buildTelegramCommandsListChannelData,
				buildModelsMenuChannelData: buildTelegramModelsMenuChannelData,
				buildModelsProviderChannelData: buildTelegramModelsProviderChannelData,
				buildModelsAddProviderChannelData: buildTelegramModelsAddProviderChannelData,
				buildModelsListChannelData: buildTelegramModelsListChannelData,
				buildModelBrowseChannelData: buildTelegramModelBrowseChannelData
			},
			doctor: telegramDoctor,
			security: telegramSecurityAdapter,
			reload: { configPrefixes: ["channels.telegram"] },
			configSchema: TelegramChannelConfigSchema,
			config: {
				...telegramConfigAdapter,
				hasConfiguredState: ({ env }) => typeof env?.TELEGRAM_BOT_TOKEN === "string" && env.TELEGRAM_BOT_TOKEN.trim().length > 0,
				isConfigured: (account, cfg) => {
					if (isBlockedByMultiBotGuard(cfg, account.accountId)) return false;
					if (!inspectTelegramAccount({
						cfg,
						accountId: account.accountId
					}).token?.trim()) return false;
					return !findTelegramTokenOwnerAccountId({
						cfg,
						accountId: account.accountId
					});
				},
				unconfiguredReason: (account, cfg) => {
					if (isBlockedByMultiBotGuard(cfg, account.accountId)) return `not configured: unknown accountId "${account.accountId}" in multi-bot setup`;
					const inspected = inspectTelegramAccount({
						cfg,
						accountId: account.accountId
					});
					if (!inspected.token?.trim()) {
						if (inspected.tokenStatus === "configured_unavailable") return `not configured: token ${inspected.tokenSource} is configured but unavailable`;
						return "not configured";
					}
					const ownerAccountId = findTelegramTokenOwnerAccountId({
						cfg,
						accountId: account.accountId
					});
					if (!ownerAccountId) return "not configured";
					return formatDuplicateTelegramTokenReason({
						accountId: account.accountId,
						ownerAccountId
					});
				},
				describeAccount: (account, cfg) => {
					if (isBlockedByMultiBotGuard(cfg, account.accountId)) return {
						accountId: account.accountId,
						name: account.name,
						enabled: account.enabled,
						configured: false,
						tokenSource: "none"
					};
					const inspected = inspectTelegramAccount({
						cfg,
						accountId: account.accountId
					});
					return {
						accountId: account.accountId,
						name: account.name,
						enabled: account.enabled,
						configured: inspected.tokenStatus !== "missing" && !findTelegramTokenOwnerAccountId({
							cfg,
							accountId: account.accountId
						}),
						tokenSource: inspected.tokenSource,
						tokenStatus: inspected.tokenStatus
					};
				}
			}
		}),
		secrets: {
			secretTargetRegistryEntries,
			collectRuntimeConfigAssignments
		}
	};
}
//#endregion
//#region extensions/telegram/src/channel.setup.ts
const telegramSetupPlugin = {
	...createTelegramPluginBase({
		setupWizard: telegramSetupWizard,
		setupContract: telegramSetupContract
	}),
	lifecycle: { detectLegacyStateMigrations: (params) => detectTelegramLegacyStateMigrations(params) }
};
//#endregion
export { telegramConfigAdapter as a, telegramSecurityAdapter as c, resolveTelegramChatLookupFetch as d, formatDuplicateTelegramTokenReason as i, fetchTelegramChatId as l, createTelegramPluginBase as n, telegramSetupWizard as o, findTelegramTokenOwnerAccountId as r, telegramSetupContract as s, telegramSetupPlugin as t, lookupTelegramChatId as u };
