import { r as STATE_DIR } from "./paths-CL43LNS6.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { u as normalizeMainKey } from "./session-key-DtTE9-Tg.js";
import { b as createConfigIO, r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import "./agent-scope-DyEposw2.js";
import { i as getRuntimeConfigAppliedHash } from "./runtime-snapshot-DLOCFXOE.js";
import "./auth-uTW579rj.js";
import { n as resolveGatewayAuth } from "./auth-resolve-C_gCVWQ8.js";
import { a as resolveMainSessionKey } from "./main-session-Bjm_i_Af.js";
import "./sessions-CBo4LOdS.js";
import { t as listSystemPresence } from "./system-presence-CeixrtPU.js";
import { n as collectGatewayHealthSnapshot } from "./collector-CouXx0wH.js";
import { t as getUpdateAvailable } from "./update-startup-xtq7vJml.js";
//#region src/gateway/server/health-state.ts
let presenceVersion = 1;
let healthVersion = 1;
let healthCache = null;
let broadcastHealthUpdate = null;
const healthRefreshStates = {
	public: {
		nextGeneration: 0,
		committedGeneration: 0,
		inFlight: {
			passive: null,
			probe: null
		}
	},
	admin: {
		nextGeneration: 0,
		committedGeneration: 0,
		inFlight: {
			passive: null,
			probe: null
		}
	}
};
function buildGatewaySnapshot(opts) {
	const cfg = getRuntimeConfig();
	const defaultAgentId = resolveDefaultAgentId(cfg);
	const mainKey = normalizeMainKey(cfg.session?.mainKey);
	const mainSessionKey = resolveMainSessionKey(cfg);
	const scope = cfg.session?.scope ?? "per-sender";
	const presence = listSystemPresence();
	const uptimeMs = Math.round(process.uptime() * 1e3);
	const updateAvailable = getUpdateAvailable() ?? void 0;
	const snapshot = {
		presence,
		health: {},
		stateVersion: {
			presence: presenceVersion,
			health: healthVersion
		},
		uptimeMs,
		appliedConfigHash: getRuntimeConfigAppliedHash(),
		sessionDefaults: {
			defaultAgentId,
			mainKey,
			mainSessionKey,
			scope
		},
		updateAvailable
	};
	if (opts?.includeSensitive === true) {
		const auth = resolveGatewayAuth({
			authConfig: cfg.gateway?.auth,
			env: process.env
		});
		snapshot.configPath = createConfigIO().configPath;
		snapshot.stateDir = STATE_DIR;
		snapshot.authMode = auth.mode;
	}
	return snapshot;
}
function getHealthCache() {
	return healthCache;
}
function getHealthVersion() {
	return healthVersion;
}
function incrementPresenceVersion() {
	presenceVersion += 1;
	return presenceVersion;
}
function getPresenceVersion() {
	return presenceVersion;
}
function setBroadcastHealthUpdate(fn) {
	broadcastHealthUpdate = fn;
}
async function refreshGatewayHealthSnapshot(opts) {
	const includeSensitive = opts?.includeSensitive === true;
	const audience = includeSensitive ? "admin" : "public";
	const state = healthRefreshStates[audience];
	const strength = opts?.probe === false ? "passive" : "probe";
	const existing = strength === "passive" ? state.inFlight.probe ?? state.inFlight.passive : state.inFlight.probe;
	if (existing) return existing.promise;
	const generation = state.nextGeneration + 1;
	state.nextGeneration = generation;
	const promise = (async () => {
		let runtimeSnapshot;
		try {
			runtimeSnapshot = opts?.getRuntimeSnapshot?.();
		} catch {
			runtimeSnapshot = void 0;
		}
		const eventLoop = opts?.getEventLoopHealth?.();
		const configReloadHotReloadStatus = opts?.getConfigReloaderHotReloadStatus?.();
		const snap = await collectGatewayHealthSnapshot({
			audience,
			probe: strength === "probe",
			runtimeSnapshot,
			...eventLoop ? { eventLoop } : {},
			...configReloadHotReloadStatus ? { configReloadHotReloadStatus } : {}
		});
		if (strength === "probe" && state.inFlight.passive && state.inFlight.passive.generation < generation) state.inFlight.passive = null;
		if (!includeSensitive && generation > state.committedGeneration) {
			state.committedGeneration = generation;
			healthCache = snap;
			healthVersion += 1;
			if (broadcastHealthUpdate) broadcastHealthUpdate(snap);
		}
		return snap;
	})().finally(() => {
		if (state.inFlight[strength]?.generation === generation) state.inFlight[strength] = null;
	});
	state.inFlight[strength] = {
		generation,
		promise
	};
	return promise;
}
//#endregion
export { incrementPresenceVersion as a, getPresenceVersion as i, getHealthCache as n, refreshGatewayHealthSnapshot as o, getHealthVersion as r, setBroadcastHealthUpdate as s, buildGatewaySnapshot as t };
