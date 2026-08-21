import { n as asNullableRecord } from "./record-coerce-DHZ4bFlT.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { a as writeRuntimeJson } from "./runtime-DOr96aVu.js";
import { n as isRich } from "./theme-vjDs9tao.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { t as isDiagnosticFlagEnabled } from "./diagnostic-flags-DoJxaJiY.js";
import { n as info } from "./globals-DHQUG86L.js";
import { n as isGatewaySecretRefUnavailableError } from "./credentials-DnLJcD2p.js";
import { c as callGateway, f as formatGatewayAuthErrorJson, h as isGatewayCredentialsRequiredError, m as formatGatewayTransportErrorJson, o as buildGatewayConnectionDetails, p as formatGatewayClientRequestErrorJson, s as buildGatewayProbeConnectionDetails } from "./call-YSl9HPoR.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { n as formatDurationHuman, t as formatDurationCompact } from "./format-duration-DKk9BtRb.js";
import { a as resolvePreferredAccountId, t as buildChannelAccountBindings } from "./bindings-Bqt9Bjm5.js";
import { i as resolveChannelDefaultAccountId } from "./helpers-B381bECH.js";
import { t as listReadOnlyChannelPluginsForConfig } from "./read-only-BQv_fXCa.js";
import { r as resolveHeartbeatSummaryForAgent } from "./heartbeat-summary-S-VZc34p.js";
import { r as withProgress } from "./progress-BjGUBuxw.js";
import { t as styleHealthChannelLine } from "./health-style-CVFbNeiH.js";
import { t as probeGatewayStatus } from "./probe-DVCEulL0.js";
import { n as formatHealthChannelLines } from "./health-format-eGOFBXrJ.js";
import { i as resolveHealthAccountContext, r as resolveHealthAgentOrder, t as buildHealthSessionSummary } from "./collector-CouXx0wH.js";
import { a as gatewayProbeResultSawGateway, i as buildCredentialsRequiredHealthDiagnostic, r as GATEWAY_HEALTH_REACHABLE_LINE } from "./gateway-health-auth-diagnostic-Bd2f-neB.js";
import { t as logGatewayConnectionDetails } from "./status.gateway-connection-BhoLn6II.js";
//#region src/commands/health.ts
/** Collects and renders gateway health for channels, agents, plugins, and sessions. */
const DEFAULT_TIMEOUT_MS = 1e4;
const healthLog = createSubsystemLogger("health");
const debugHealth = (cfg, message, meta) => {
	if (isDiagnosticFlagEnabled("health", cfg)) healthLog.info(message, meta);
};
function isGatewayHealthAuthUnavailableError(error) {
	return isGatewayCredentialsRequiredError(error) || isGatewaySecretRefUnavailableError(error);
}
async function emitReachableGatewayAuthDiagnostic(params) {
	if (!isGatewayHealthAuthUnavailableError(params.error)) return false;
	const details = await buildGatewayProbeConnectionDetails({
		config: params.config,
		token: params.token,
		password: params.password,
		localPortOverride: params.localPortOverride
	});
	if (!gatewayProbeResultSawGateway(await probeGatewayStatus({
		url: details.url,
		token: params.token,
		password: params.password,
		tlsFingerprint: details.tlsFingerprint,
		preauthHandshakeTimeoutMs: details.preauthHandshakeTimeoutMs,
		timeoutMs: params.timeoutMs ?? DEFAULT_TIMEOUT_MS,
		config: params.config,
		json: params.json
	}))) return false;
	const diagnostic = buildCredentialsRequiredHealthDiagnostic();
	if (params.json) {
		writeRuntimeJson(params.runtime, diagnostic);
		params.runtime.exit(1);
		return true;
	}
	params.runtime.log(GATEWAY_HEALTH_REACHABLE_LINE);
	params.runtime.log(diagnostic.error.message);
	params.runtime.exit(1);
	return true;
}
const loadConfigRuntime = async () => await import("./config/config.js");
const formatDurationParts = (ms) => {
	if (!Number.isFinite(ms)) return "unknown";
	if (ms < 1e3) return `${Math.max(0, Math.round(ms))}ms`;
	const units = [
		{
			label: "w",
			size: 10080 * 60 * 1e3
		},
		{
			label: "d",
			size: 1440 * 60 * 1e3
		},
		{
			label: "h",
			size: 3600 * 1e3
		},
		{
			label: "m",
			size: 60 * 1e3
		},
		{
			label: "s",
			size: 1e3
		}
	];
	let remaining = Math.max(0, Math.floor(ms));
	const parts = [];
	for (const unit of units) {
		const value = Math.floor(remaining / unit.size);
		if (value > 0) {
			parts.push(`${value}${unit.label}`);
			remaining -= value * unit.size;
		}
	}
	if (parts.length === 0) return "0s";
	return parts.join(" ");
};
function formatEventLoopHealthLine(summary) {
	const eventLoop = summary.eventLoop;
	if (!eventLoop) return null;
	return `Gateway event loop: ${eventLoop.degraded ? "degraded" : "ok"}${eventLoop.degraded && eventLoop.degradedSinceMs != null ? ` for ${formatDurationCompact(eventLoop.degradedSinceMs) ?? "0s"}` : ""}${eventLoop.reasons.length > 0 ? ` reasons=${eventLoop.reasons.join(",")}` : ""} max=${Math.round(eventLoop.delayMaxMs)}ms p99=${Math.round(eventLoop.delayP99Ms)}ms util=${eventLoop.utilization} cpu=${eventLoop.cpuCoreRatio}`;
}
/** Formats context engine quarantine state for text health output. */
function formatContextEngineHealthLine(summary) {
	const quarantined = summary.contextEngines?.quarantined ?? [];
	if (quarantined.length === 0) return null;
	const engines = quarantined.map((entry) => entry.engineId).join(", ");
	return `Context engine: warning (${quarantined.length} quarantined; downgraded to legacy: ${engines})`;
}
/** Formats dead-lettered delivery queue entries for text health output. */
function formatDeliveryQueueHealthLine(summary, now = Date.now()) {
	const failed = summary.deliveryQueues?.failed ?? [];
	const ingressFailed = summary.deliveryQueues?.ingressFailed ?? [];
	if (failed.length === 0 && ingressFailed.length === 0) return null;
	const counts = [...failed.map((queue) => `${queue.queueName}: ${queue.count}`), ...ingressFailed.map((queue) => `inbound ${queue.channelId}/${queue.accountId}: ${queue.count}`)].join(", ");
	const oldest = [...failed, ...ingressFailed].map((queue) => queue.oldestFailedAt).filter((value) => typeof value === "number");
	return `Delivery queue: warning (dead-lettered entries — ${counts}${oldest.length > 0 ? `; oldest ${formatDurationHuman(now - Math.min(...oldest))} ago` : ""})`;
}
/** Formats config hot-reload watcher degradation for text health output. */
function formatConfigReloadHealthLine(summary) {
	if (summary.configReload?.hotReloadStatus !== "disabled") return null;
	return "Config hot reload: disabled (watcher retries exhausted; restart the gateway to restore it)";
}
const resolveHeartbeatSummary = (cfg, agentId) => resolveHeartbeatSummaryForAgent(cfg, agentId);
/** Runs the `openclaw health` command against the gateway and renders JSON or text. */
async function healthCommand(opts, runtime) {
	const cfg = opts.config ?? await readBestEffortHealthConfig();
	let summary;
	try {
		summary = await withProgress({
			label: "Checking gateway health…",
			indeterminate: true,
			enabled: opts.json !== true
		}, async () => await callGateway({
			method: "health",
			params: opts.verbose ? { probe: true } : void 0,
			timeoutMs: opts.timeoutMs,
			config: cfg,
			token: opts.token,
			password: opts.password,
			localPortOverride: opts.localPortOverride
		}));
	} catch (error) {
		if (await emitReachableGatewayAuthDiagnostic({
			error,
			config: cfg,
			runtime,
			timeoutMs: opts.timeoutMs,
			token: opts.token,
			password: opts.password,
			localPortOverride: opts.localPortOverride,
			json: opts.json
		})) return;
		if (opts.json) {
			const payload = formatGatewayAuthErrorJson(error) ?? formatGatewayClientRequestErrorJson(error) ?? formatGatewayTransportErrorJson(error);
			if (payload) {
				writeRuntimeJson(runtime, payload);
				runtime.exit(1);
				return;
			}
		}
		throw error;
	}
	if (opts.json) writeRuntimeJson(runtime, summary);
	else {
		const debugEnabled = isDiagnosticFlagEnabled("health", cfg);
		const rich = isRich();
		if (opts.verbose) logGatewayConnectionDetails({
			runtime,
			info,
			message: buildGatewayConnectionDetails({
				config: cfg,
				localPortOverride: opts.localPortOverride
			}).message
		});
		const localAgents = resolveHealthAgentOrder(cfg);
		const defaultAgentId = summary.defaultAgentId ?? localAgents.defaultAgentId;
		const agents = Array.isArray(summary.agents) ? summary.agents : [];
		const resolvedAgents = agents.length > 0 ? agents : await Promise.all(localAgents.ordered.map(async (entry) => {
			const storePath = resolveStorePath(cfg.session?.store, { agentId: entry.id });
			return {
				agentId: entry.id,
				name: entry.name,
				isDefault: entry.id === localAgents.defaultAgentId,
				heartbeat: resolveHeartbeatSummary(cfg, entry.id),
				sessions: await buildHealthSessionSummary(storePath, entry.id)
			};
		}));
		const displayAgents = opts.verbose ? resolvedAgents : resolvedAgents.filter((agent) => agent.agentId === defaultAgentId);
		const channelBindings = buildChannelAccountBindings(cfg);
		const displayPlugins = listReadOnlyChannelPluginsForConfig(cfg, { includeSetupFallbackPlugins: false });
		if (debugEnabled) {
			runtime.log(info("[debug] local channel accounts"));
			for (const plugin of displayPlugins) {
				const accountIds = plugin.config.listAccountIds(cfg);
				const defaultAccountId = resolveChannelDefaultAccountId({
					plugin,
					cfg,
					accountIds
				});
				runtime.log(`  ${plugin.id}: accounts=${accountIds.join(", ") || "(none)"} default=${defaultAccountId}`);
				for (const accountId of accountIds) {
					const { snapshotAccount, configured, diagnostics } = await resolveHealthAccountContext({
						plugin,
						cfg,
						accountId
					});
					const record = asNullableRecord(snapshotAccount);
					const tokenSource = record && typeof record.tokenSource === "string" ? record.tokenSource : void 0;
					runtime.log(`    - ${accountId}: configured=${configured}${tokenSource ? ` tokenSource=${tokenSource}` : ""}`);
					for (const diagnostic of diagnostics) runtime.log(`      ! ${diagnostic}`);
				}
			}
			runtime.log(info("[debug] bindings map"));
			for (const [channelId, byAgent] of channelBindings.entries()) {
				const entries = Array.from(byAgent.entries()).map(([agentId, ids]) => `${agentId}=[${ids.join(", ")}]`);
				runtime.log(`  ${channelId}: ${entries.join(" ")}`);
			}
			runtime.log(info("[debug] gateway channel probes"));
			for (const [channelId, channelSummary] of Object.entries(summary.channels ?? {})) {
				const accounts = channelSummary.accounts ?? {};
				const probes = Object.entries(accounts).map(([accountId, accountSummary]) => {
					const probe = asNullableRecord(accountSummary.probe);
					const bot = probe ? asNullableRecord(probe.bot) : null;
					return `${accountId}=${(bot && typeof bot.username === "string" ? bot.username : null) ?? "(no bot)"}`;
				});
				runtime.log(`  ${channelId}: ${probes.join(", ") || "(none)"}`);
			}
		}
		const channelAccountFallbacks = Object.fromEntries(displayPlugins.map((plugin) => {
			const accountIds = plugin.config.listAccountIds(cfg);
			const preferred = resolvePreferredAccountId({
				accountIds,
				defaultAccountId: resolveChannelDefaultAccountId({
					plugin,
					cfg,
					accountIds
				}),
				boundAccounts: channelBindings.get(plugin.id)?.get(defaultAgentId) ?? []
			});
			return [plugin.id, [preferred]];
		}));
		const accountIdsByChannel = (() => {
			const entries = displayAgents.length > 0 ? displayAgents : resolvedAgents;
			const byChannel = {};
			for (const [channelId, byAgent] of channelBindings.entries()) {
				const accountIds = [];
				for (const agent of entries) {
					const ids = byAgent.get(agent.agentId) ?? [];
					for (const id of ids) if (!accountIds.includes(id)) accountIds.push(id);
				}
				if (accountIds.length > 0) byChannel[channelId] = accountIds;
			}
			for (const [channelId, fallbackIds] of Object.entries(channelAccountFallbacks)) if (!byChannel[channelId] || byChannel[channelId].length === 0) byChannel[channelId] = fallbackIds;
			return byChannel;
		})();
		const channelLines = Object.keys(accountIdsByChannel).length > 0 ? formatHealthChannelLines(summary, {
			accountMode: opts.verbose ? "all" : "default",
			accountIdsByChannel
		}) : formatHealthChannelLines(summary, { accountMode: opts.verbose ? "all" : "default" });
		for (const line of channelLines) runtime.log(styleHealthChannelLine(line, rich));
		const eventLoopLine = formatEventLoopHealthLine(summary);
		if (eventLoopLine) runtime.log(styleHealthChannelLine(eventLoopLine, rich));
		const contextEngineLine = formatContextEngineHealthLine(summary);
		if (contextEngineLine) runtime.log(styleHealthChannelLine(contextEngineLine, rich));
		const deliveryQueueLine = formatDeliveryQueueHealthLine(summary);
		if (deliveryQueueLine) runtime.log(styleHealthChannelLine(deliveryQueueLine, rich));
		const configReloadLine = formatConfigReloadHealthLine(summary);
		if (configReloadLine) runtime.log(styleHealthChannelLine(configReloadLine, rich));
		for (const plugin of displayPlugins) {
			const channelSummary = summary.channels?.[plugin.id];
			if (!channelSummary || channelSummary.linked !== true) continue;
			if (!plugin.status?.logSelfId) continue;
			const boundAccounts = channelBindings.get(plugin.id)?.get(defaultAgentId) ?? [];
			const accountIds = plugin.config.listAccountIds(cfg);
			const accountId = resolvePreferredAccountId({
				accountIds,
				defaultAccountId: resolveChannelDefaultAccountId({
					plugin,
					cfg,
					accountIds
				}),
				boundAccounts
			});
			const accountContext = await resolveHealthAccountContext({
				plugin,
				cfg,
				accountId
			});
			if (!accountContext.enabled || !accountContext.configured) continue;
			if (accountContext.diagnostics.length > 0) continue;
			try {
				plugin.status.logSelfId({
					account: accountContext.probeAccount,
					cfg,
					runtime,
					includeChannelPrefix: true
				});
			} catch (error) {
				debugHealth(cfg, "logSelfId.failed", {
					channel: plugin.id,
					accountId,
					error: formatErrorMessage(error)
				});
			}
		}
		if (Number.isFinite(summary.durationMs)) runtime.log(info(`Gateway probe duration: ${summary.durationMs}ms`));
		if (resolvedAgents.length > 0) {
			const agentLabels = resolvedAgents.map((agent) => agent.isDefault ? `${agent.agentId} (default)` : agent.agentId);
			runtime.log(info(`Agents: ${agentLabels.join(", ")}`));
		}
		const heartbeatParts = displayAgents.map((agent) => {
			const everyMs = agent.heartbeat?.everyMs;
			return `${everyMs ? formatDurationParts(everyMs) : "disabled"} (${agent.agentId})`;
		}).filter(Boolean);
		if (heartbeatParts.length > 0) runtime.log(info(`Heartbeat interval: ${heartbeatParts.join(", ")}`));
		if (displayAgents.length === 0) {
			runtime.log(info(`Session store: ${summary.sessions.path} (${summary.sessions.count} entries)`));
			if (summary.sessions.recent.length > 0) for (const r of summary.sessions.recent) runtime.log(`- ${r.key} (${r.updatedAt ? `${Math.round((Date.now() - r.updatedAt) / 6e4)}m ago` : "no activity"})`);
		} else for (const agent of displayAgents) {
			runtime.log(info(`Session store (${agent.agentId}): ${agent.sessions.path} (${agent.sessions.count} entries)`));
			if (agent.sessions.recent.length > 0) for (const r of agent.sessions.recent) runtime.log(`- ${r.key} (${r.updatedAt ? `${Math.round((Date.now() - r.updatedAt) / 6e4)}m ago` : "no activity"})`);
		}
	}
}
async function readBestEffortHealthConfig() {
	const { readBestEffortConfig } = await loadConfigRuntime();
	return await readBestEffortConfig();
}
//#endregion
export { healthCommand as a, formatDeliveryQueueHealthLine as i, formatConfigReloadHealthLine as n, formatContextEngineHealthLine as r, emitReachableGatewayAuthDiagnostic as t };
