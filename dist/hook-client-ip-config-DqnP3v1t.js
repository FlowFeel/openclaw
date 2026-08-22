import { X as resolveAgentMaxConcurrent, Z as resolveSubagentMaxConcurrent } from "./io-DCw4R0kD.js";
import { g as setCommandLaneConcurrency, o as getCommandLaneSnapshot, p as publishLaneConfiguration } from "./command-queue-BbrEP4i9.js";
import { t as resolveCronMaxConcurrentRuns } from "./cron-limits-txevLFpr.js";
import { n as enableSessionSuspensionTimersForGatewayStart, r as getSuspendedLaneIdsForGatewayPublication, s as setGatewayLaneResumeConcurrencies } from "./session-suspension-DMbHqSuh.js";
//#region src/gateway/server-lanes.ts
/** Capacity held inside the cron budget so hook dispatch cannot be starved. */
const HOOK_DISPATCH_LANE_RESERVATION = 1;
/** Group bounding cron inner work and hook dispatch to one shared budget. */
const CRON_HOOK_LANE_GROUP = "cron-hooks";
function resolveGatewayLaneConcurrency(cfg) {
	const cron = resolveCronMaxConcurrentRuns();
	return {
		cron,
		hookDispatch: cfg.hooks?.enabled === true ? cron : 0,
		main: resolveAgentMaxConcurrent(cfg),
		subagent: resolveSubagentMaxConcurrent(cfg)
	};
}
function applyGatewayLaneConcurrency(concurrency, opts = {}) {
	setGatewayLaneResumeConcurrencies({
		["cron"]: concurrency.cron,
		["cron-nested"]: concurrency.cron,
		["hook-dispatch"]: concurrency.hookDispatch,
		["main"]: concurrency.main,
		["nested"]: 1,
		["subagent"]: concurrency.subagent
	});
	const suspendedLaneIds = opts.gatewayStart ? enableSessionSuspensionTimersForGatewayStart() : getSuspendedLaneIdsForGatewayPublication();
	if (!suspendedLaneIds.has("cron")) setCommandLaneConcurrency("cron", concurrency.cron);
	const hooksEnabled = concurrency.hookDispatch > 0;
	const hookSnapshot = getCommandLaneSnapshot("hook-dispatch");
	const retainInFlightHookBudget = !hooksEnabled && hookSnapshot.activeCount > 0;
	const grouped = {};
	if (!suspendedLaneIds.has("cron-nested")) grouped["cron-nested"] = concurrency.cron;
	if (!suspendedLaneIds.has("hook-dispatch")) grouped["hook-dispatch"] = concurrency.hookDispatch;
	publishLaneConfiguration({
		lanes: grouped,
		groups: hooksEnabled || retainInFlightHookBudget ? { [CRON_HOOK_LANE_GROUP]: {
			budget: concurrency.cron,
			members: ["cron-nested", "hook-dispatch"],
			reservations: hooksEnabled ? { ["hook-dispatch"]: HOOK_DISPATCH_LANE_RESERVATION } : void 0
		} } : void 0,
		clearGroups: hooksEnabled || retainInFlightHookBudget ? void 0 : [CRON_HOOK_LANE_GROUP]
	});
	if (!suspendedLaneIds.has("main")) setCommandLaneConcurrency("main", concurrency.main);
	if (opts.gatewayStart) {
		if (!suspendedLaneIds.has("nested")) setCommandLaneConcurrency("nested", 1);
	}
	if (!suspendedLaneIds.has("subagent")) setCommandLaneConcurrency("subagent", concurrency.subagent);
}
//#endregion
//#region src/gateway/server/hook-client-ip-config.ts
/**
* Adapts gateway network trust config to the hooks HTTP request handler.
*/
function resolveHookClientIpConfig(cfg) {
	return {
		trustedProxies: cfg.gateway?.trustedProxies,
		allowRealIpFallback: cfg.gateway?.allowRealIpFallback === true
	};
}
//#endregion
export { applyGatewayLaneConcurrency as n, resolveGatewayLaneConcurrency as r, resolveHookClientIpConfig as t };
