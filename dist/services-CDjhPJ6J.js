import { r as STATE_DIR } from "./paths-CL43LNS6.js";
import { g as onTrustedInternalDiagnosticEvent, s as emitTrustedDiagnosticEventWithPrivateData } from "./diagnostic-events-Dt41CZkD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { t as isPluginJsonValue } from "./host-hook-json-CRVrIqU9.js";
import { t as encodeStartupTraceSegment } from "./startup-trace-segment-Cd4cVDJE.js";
import { n as withPluginHttpRouteRegistry } from "./http-registry-_vokbhOo.js";
import { r as subscribePluginSessionsChanged } from "./gateway-events-D7Hxt4AB.js";
//#region src/plugins/services.ts
/** Starts, stops, and inspects plugin service registrations. */
const log = createSubsystemLogger("plugins");
function createPluginLogger() {
	return {
		info: (msg) => log.info(msg),
		warn: (msg) => log.warn(msg),
		error: (msg) => log.error(msg),
		debug: (msg) => log.debug(msg)
	};
}
function createServiceContext(params) {
	const grantsInternalDiagnostics = params.service?.pluginId === params.service?.service.id && (params.service?.service.id === "diagnostics-otel" || params.service?.service.id === "diagnostics-prometheus") && (params.service?.origin === "bundled" || params.service?.trustedOfficialInstall === true);
	return {
		config: params.config,
		workspaceDir: params.workspaceDir,
		stateDir: STATE_DIR,
		logger: createPluginLogger(),
		...params.gatewayEvents ? { gatewayEvents: params.gatewayEvents } : {},
		...params.startupTrace ? { startupTrace: createScopedPluginServiceStartupTrace(params.startupTrace, createPluginServiceTraceName(params.service)) } : {},
		...grantsInternalDiagnostics ? { internalDiagnostics: {
			emit: emitTrustedDiagnosticEventWithPrivateData,
			onEvent: onTrustedInternalDiagnosticEvent
		} } : {}
	};
}
function createScopedGatewayEvents(params) {
	if (!params.broadcast) return { revoke: () => void 0 };
	const broadcast = params.broadcast;
	let active = true;
	const subscriptions = /* @__PURE__ */ new Set();
	return {
		gatewayEvents: {
			emit: (event, payload, opts) => {
				if (!active) throw new Error("plugin service gateway event emitter is no longer active");
				if (!/^[a-z][a-z0-9_-]*$/u.test(event)) throw new Error(`invalid plugin gateway event name: ${event}`);
				if (!isPluginJsonValue(payload)) throw new Error("plugin gateway event payload must be bounded JSON");
				if (opts?.scope !== "operator.read" && opts?.scope !== "operator.write" && opts?.scope !== "operator.admin") throw new Error("plugin gateway event scope must be an operator scope");
				broadcast(`plugin.${params.pluginId}.${event}`, payload, opts.scope);
			},
			onSessionsChanged: (handler) => {
				if (!active) throw new Error("plugin service gateway event subscriber is no longer active");
				const unsubscribe = subscribePluginSessionsChanged(handler);
				let subscribed = true;
				const release = () => {
					if (!subscribed) return;
					subscribed = false;
					subscriptions.delete(release);
					unsubscribe();
				};
				subscriptions.add(release);
				return release;
			}
		},
		revoke: () => {
			active = false;
			for (const unsubscribe of subscriptions) unsubscribe();
		}
	};
}
function createPluginServiceTraceName(entry) {
	return `sidecars.plugin-services.${encodeStartupTraceSegment(entry.pluginId)}.${encodeStartupTraceSegment(entry.service.id)}`;
}
function createScopedPluginServiceStartupTrace(startupTrace, prefix) {
	const scopeName = (name) => `${prefix}.${name.split(".").map((segment) => encodeStartupTraceSegment(segment)).join(".")}`;
	return {
		measure: (name, run) => startupTrace.measure(scopeName(name), run),
		...startupTrace.detail ? { detail: (name, metrics) => startupTrace.detail?.(scopeName(name), metrics) } : {}
	};
}
async function startPluginServices(params) {
	const running = [];
	const stopService = async (entry) => {
		try {
			if (entry.stop) await withPluginHttpRouteRegistry(params.registry, () => entry.stop?.());
		} catch (err) {
			log.warn(`plugin service stop failed (${entry.id}): ${String(err)}`);
		} finally {
			entry.revokeGatewayEvents();
		}
	};
	let failedCount = 0;
	for (const entry of params.registry.services) {
		const service = entry.service;
		const traceName = createPluginServiceTraceName(entry);
		const scopedGatewayEvents = createScopedGatewayEvents({
			pluginId: entry.pluginId,
			broadcast: params.broadcastPluginEvent
		});
		const serviceContext = createServiceContext({
			config: params.config,
			startupTrace: params.startupTrace,
			workspaceDir: params.workspaceDir,
			service: entry,
			gatewayEvents: scopedGatewayEvents.gatewayEvents
		});
		const runningService = {
			id: service.id,
			stop: service.stop ? () => service.stop?.(serviceContext) : void 0,
			revokeGatewayEvents: scopedGatewayEvents.revoke
		};
		try {
			const startService = () => withPluginHttpRouteRegistry(params.registry, () => service.start(serviceContext));
			if (params.startupTrace) await params.startupTrace.measure(traceName, startService);
			else await startService();
			running.push(runningService);
		} catch (err) {
			failedCount += 1;
			const error = err;
			log.error(`plugin service failed (${service.id}, plugin=${entry.pluginId}, root=${entry.rootDir ?? "unknown"}): ${error?.message ?? String(err)}`);
			await stopService(runningService);
		}
	}
	params.startupTrace?.detail?.("sidecars.plugin-services.summary", [
		["serviceCount", params.registry.services.length],
		["startedCount", running.length],
		["failedCount", failedCount]
	]);
	let stopPromise;
	return { stop: () => stopPromise ??= Promise.resolve().then(async () => {
		for (const entry of running.toReversed()) await stopService(entry);
	}) };
}
//#endregion
export { startPluginServices };
