import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { i as asOptionalRecord } from "./record-coerce-DHZ4bFlT.js";
import { o as resolveChannelDmPolicy } from "./dm-access-Bq5cULcy.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { i as listChannelPlugins } from "./registry-B1AiP2IQ.js";
import "./plugins-1tM2ZjdA.js";
import { F as validateChannelsPairingListParams, N as validateChannelsPairingApproveParams, P as validateChannelsPairingDismissParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { f as notifyPairingApproved } from "./pairing-store-sqlite-BGFFsO5N.js";
import { a as dismissChannelPairingRequest, i as approveChannelPairingRequest, o as listChannelPairingRequests, t as CHANNEL_PAIRING_PENDING_TTL_MS, u as resolveChannelPairingRequestId } from "./pairing-store-CTy8U4zO.js";
import { n as hasConfiguredCommandOwners } from "./doctor-command-owner-CIbtW56M.js";
import { t as formatForLog } from "./ws-log-B1D_Y86r.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as bootstrapCommandOwnerFromPairing } from "./command-owner-07MymdO1.js";
import { t as resolveGatewayPluginConfig } from "./runtime-plugin-config-CwjSnlUj.js";
//#region src/gateway/server-methods/channel-pairing.ts
var InvalidPairingTargetError = class extends Error {};
function normalizeFilter(value) {
	return normalizeOptionalString(value)?.toLowerCase();
}
function resolvePairingPolicy(params) {
	const securityPolicy = params.plugin.security?.resolveDmPolicy?.({
		cfg: params.cfg,
		accountId: params.accountId,
		account: params.account
	})?.policy;
	if (securityPolicy) return securityPolicy;
	const account = asOptionalRecord(params.account);
	return resolveChannelDmPolicy({
		account,
		parent: asOptionalRecord(account?.config),
		defaultPolicy: "pairing"
	});
}
function resolvePairingAccountLabel(plugin, account, cfg) {
	const described = plugin.config.describeAccount?.(account, cfg);
	return normalizeOptionalString(described?.name) ?? normalizeOptionalString(asOptionalRecord(account)?.name);
}
async function listPairingAccounts(params) {
	const requestedChannel = normalizeFilter(params.channel);
	const requestedAccount = normalizeFilter(params.accountId);
	const pairingPlugins = listChannelPlugins().filter((plugin) => plugin.pairing);
	if (requestedChannel && !pairingPlugins.some((plugin) => plugin.id === requestedChannel)) throw new InvalidPairingTargetError(`unknown pairing channel: ${params.channel}`);
	const accounts = [];
	for (const plugin of pairingPlugins) {
		if (requestedChannel && plugin.id !== requestedChannel) continue;
		for (const accountId of plugin.config.listAccountIds(params.cfg)) {
			if (requestedAccount && accountId.toLowerCase() !== requestedAccount) continue;
			const account = plugin.config.resolveAccount(params.cfg, accountId);
			if (!(plugin.config.isConfigured ? await plugin.config.isConfigured(account, params.cfg) : asOptionalRecord(account)?.configured !== false) || resolvePairingPolicy({
				plugin,
				cfg: params.cfg,
				accountId,
				account
			}) !== "pairing") continue;
			const accountLabel = resolvePairingAccountLabel(plugin, account, params.cfg);
			accounts.push({
				plugin,
				accountId,
				...accountLabel ? { accountLabel } : {}
			});
		}
	}
	return accounts;
}
async function resolvePairingAccount(params) {
	const accounts = await listPairingAccounts(params);
	return accounts.length === 1 ? accounts[0] ?? null : null;
}
function publicAccount(account) {
	const adapter = account.plugin.pairing;
	if (!adapter) throw new Error(`Channel ${account.plugin.id} does not support pairing`);
	return {
		channel: account.plugin.id,
		channelLabel: account.plugin.meta.label,
		accountId: account.accountId,
		...account.accountLabel ? { accountLabel: account.accountLabel } : {},
		notifySupported: Boolean(adapter.notifyApproval)
	};
}
function publicRequest(params) {
	const adapter = params.account.plugin.pairing;
	if (!adapter) throw new Error(`Channel ${params.account.plugin.id} does not support pairing`);
	const metadata = params.request.meta ? Object.fromEntries(Object.entries(params.request.meta).filter(([key, value]) => key !== "accountId" && value)) : void 0;
	const createdAtMs = Date.parse(params.request.createdAt);
	return {
		requestId: resolveChannelPairingRequestId(params.account.plugin.id, params.request),
		channel: params.account.plugin.id,
		channelLabel: params.account.plugin.meta.label,
		accountId: params.account.accountId,
		...params.account.accountLabel ? { accountLabel: params.account.accountLabel } : {},
		senderId: params.request.id,
		senderLabel: adapter.idLabel,
		...metadata && Object.keys(metadata).length > 0 ? { metadata } : {},
		createdAt: params.request.createdAt,
		lastSeenAt: params.request.lastSeenAt,
		expiresAt: new Date(createdAtMs + CHANNEL_PAIRING_PENDING_TTL_MS).toISOString(),
		notifySupported: Boolean(adapter.notifyApproval)
	};
}
function invalidPairingAccount(respond, channel, accountId) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `channel account does not use DM pairing: ${channel}:${accountId}`));
}
function respondPairingFailure(respond, error) {
	respond(false, void 0, errorShape(error instanceof InvalidPairingTargetError ? ErrorCodes.INVALID_REQUEST : ErrorCodes.UNAVAILABLE, formatForLog(error)));
}
const channelPairingHandlers = {
	"channels.pairing.list": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateChannelsPairingListParams, "channels.pairing.list", respond)) return;
		try {
			const parsed = params;
			const cfg = resolveGatewayPluginConfig({ config: context.getRuntimeConfig() });
			const accounts = await listPairingAccounts({
				cfg,
				...parsed.channel ? { channel: parsed.channel } : {},
				...parsed.accountId ? { accountId: parsed.accountId } : {}
			});
			const requests = [];
			for (const account of accounts) {
				const pending = await listChannelPairingRequests(account.plugin.id, process.env, account.accountId);
				requests.push(...pending.map((request) => publicRequest({
					account,
					request
				})));
			}
			respond(true, {
				accounts: accounts.map(publicAccount),
				requests,
				commandOwnerConfigured: hasConfiguredCommandOwners(cfg),
				limits: {
					pendingPerAccount: 3,
					ttlMs: CHANNEL_PAIRING_PENDING_TTL_MS
				}
			}, void 0);
		} catch (error) {
			respondPairingFailure(respond, error);
		}
	},
	"channels.pairing.approve": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateChannelsPairingApproveParams, "channels.pairing.approve", respond)) return;
		const parsed = params;
		let cfg;
		let account;
		try {
			cfg = resolveGatewayPluginConfig({ config: context.getRuntimeConfig() });
			account = await resolvePairingAccount({
				cfg,
				channel: parsed.channel,
				accountId: parsed.accountId
			});
		} catch (error) {
			respondPairingFailure(respond, error);
			return;
		}
		if (!account?.plugin.pairing) {
			invalidPairingAccount(respond, parsed.channel, parsed.accountId);
			return;
		}
		try {
			const approved = await approveChannelPairingRequest({
				channel: account.plugin.id,
				accountId: account.accountId,
				requestId: parsed.requestId,
				pairingAdapter: account.plugin.pairing
			});
			if (!approved) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "pending DM access request no longer exists"));
				return;
			}
			let commandOwnerBootstrap = "not-requested";
			if (parsed.bootstrapCommandOwner === true) try {
				commandOwnerBootstrap = (await bootstrapCommandOwnerFromPairing({
					channel: account.plugin.id,
					id: approved.id
				})).status;
			} catch (error) {
				context.logGateway.warn(`DM pairing command-owner bootstrap failed channel=${account.plugin.id} account=${account.accountId}: ${formatForLog(error)}`);
				commandOwnerBootstrap = "unavailable";
			}
			let notification = "not-requested";
			if (parsed.notify === true) if (!account.plugin.pairing.notifyApproval) notification = "unsupported";
			else try {
				await notifyPairingApproved({
					channelId: account.plugin.id,
					accountId: account.accountId,
					id: approved.id,
					cfg,
					pairingAdapter: account.plugin.pairing
				});
				notification = "sent";
			} catch (error) {
				context.logGateway.warn(`DM pairing approval notification failed channel=${account.plugin.id} account=${account.accountId}: ${formatForLog(error)}`);
				notification = "failed";
			}
			respond(true, {
				requestId: parsed.requestId,
				senderId: approved.id,
				notification,
				commandOwnerBootstrap
			}, void 0);
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatForLog(error)));
		}
	},
	"channels.pairing.dismiss": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateChannelsPairingDismissParams, "channels.pairing.dismiss", respond)) return;
		const parsed = params;
		let account;
		try {
			account = await resolvePairingAccount({
				cfg: resolveGatewayPluginConfig({ config: context.getRuntimeConfig() }),
				channel: parsed.channel,
				accountId: parsed.accountId
			});
		} catch (error) {
			respondPairingFailure(respond, error);
			return;
		}
		if (!account) {
			invalidPairingAccount(respond, parsed.channel, parsed.accountId);
			return;
		}
		try {
			const dismissed = await dismissChannelPairingRequest({
				channel: account.plugin.id,
				accountId: account.accountId,
				requestId: parsed.requestId
			});
			if (!dismissed) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "pending DM access request no longer exists"));
				return;
			}
			respond(true, {
				requestId: parsed.requestId,
				senderId: dismissed.id
			}, void 0);
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatForLog(error)));
		}
	}
};
//#endregion
export { channelPairingHandlers };
