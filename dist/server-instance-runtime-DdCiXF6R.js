import { t as DEFAULT_GATEWAY_REQUEST_TIMEOUT_MS } from "./timeouts-Dbj-IGQf.js";
import "./method-scopes-BPNMlnDQ.js";
import { c as WRITE_SCOPE, n as APPROVALS_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { n as registerGatewayRecoveryRuntime } from "./server-recovery-runtime-context-B5sNTTcg.js";
import { i as dispatchGatewayRequestInProcess, t as createSyntheticPluginRuntimeClient } from "./server-plugin-runtime-client-BNy1eDxN.js";
import { t as createApprovalNativeRouteCoordinator } from "./approval-native-route-coordinator-BXI6mT2o.js";
import { t as GATEWAY_NATIVE_APPROVAL_METHODS } from "./approval-gateway-runtime-methods-DJBMXVto.js";
//#region src/gateway/server-instance-runtime.ts
/** Creates closed internal principals bound to one concrete Gateway lifecycle. */
function createGatewayInstanceRuntime(options) {
	const approvalSubscribers = /* @__PURE__ */ new Set();
	const routeCoordinator = createApprovalNativeRouteCoordinator();
	let closed = false;
	const dispatch = async (params) => {
		if (closed || !options.isDispatchAvailable()) throw new Error(`Gateway instance dispatch unavailable for ${params.method}`);
		if (!params.allowedMethods.has(params.method)) throw new Error(`Gateway internal principal cannot dispatch ${params.method}`);
		return await dispatchGatewayRequestInProcess(params.method, params.payload, {
			client: params.client,
			context: options.getContext(),
			methodRegistry: options.getMethodRegistry(),
			requestIdPrefix: "gateway-internal",
			timeoutMs: params.timeoutMs
		});
	};
	const recoveryClient = createSyntheticPluginRuntimeClient({ scopes: [WRITE_SCOPE] });
	const recoveryMethods = /* @__PURE__ */ new Set(["agent", "agent.wait"]);
	const recoveryNoticeMethods = /* @__PURE__ */ new Set(["message.action"]);
	const approvalClient = createSyntheticPluginRuntimeClient({ scopes: [APPROVALS_SCOPE] });
	const approvalMethods = new Set(GATEWAY_NATIVE_APPROVAL_METHODS);
	const approvalRouteClient = createSyntheticPluginRuntimeClient({ scopes: [WRITE_SCOPE] });
	const approvalRouteMethods = /* @__PURE__ */ new Set(["send"]);
	const recovery = {
		dispatchAgent: async (payload, timeoutMs) => await dispatch({
			allowedMethods: recoveryMethods,
			client: recoveryClient,
			method: "agent",
			payload,
			timeoutMs
		}),
		waitForAgent: async (payload, timeoutMs) => await dispatch({
			allowedMethods: recoveryMethods,
			client: recoveryClient,
			method: "agent.wait",
			payload,
			timeoutMs
		}),
		sendRecoveryNotice: async (payload, timeoutMs) => await dispatch({
			allowedMethods: recoveryNoticeMethods,
			client: recoveryClient,
			method: "message.action",
			payload,
			timeoutMs
		})
	};
	const releaseRecoveryRuntime = registerGatewayRecoveryRuntime(recovery);
	const publish = (kind, callback, shouldDeliver) => {
		if (closed) return 0;
		let delivered = 0;
		for (const subscriber of approvalSubscribers) {
			if (!subscriber.eventKinds.has(kind)) continue;
			try {
				if (shouldDeliver && !shouldDeliver(subscriber)) continue;
				callback(subscriber);
				delivered += 1;
			} catch (error) {
				options.logError?.(`internal approval subscriber failed: ${String(error)}`);
			}
		}
		return delivered;
	};
	return {
		approvalEvents: {
			publishRequested: (kind, request) => publish(kind, (subscriber) => subscriber.onRequested(request), (subscriber) => subscriber.shouldHandle(request)),
			publishResolved: (kind, resolved) => {
				publish(kind, (subscriber) => subscriber.onResolved(resolved));
			}
		},
		nativeApprovals: {
			request: async (method, payload, requestOptions) => await dispatch({
				allowedMethods: approvalMethods,
				client: requestOptions?.clientDisplayName ? {
					...approvalClient,
					connect: {
						...approvalClient.connect,
						client: {
							...approvalClient.connect.client,
							displayName: requestOptions.clientDisplayName
						}
					}
				} : approvalClient,
				method,
				payload,
				timeoutMs: DEFAULT_GATEWAY_REQUEST_TIMEOUT_MS
			}),
			requestRoute: async (method, payload) => await dispatch({
				allowedMethods: approvalRouteMethods,
				client: approvalRouteClient,
				method,
				payload,
				timeoutMs: DEFAULT_GATEWAY_REQUEST_TIMEOUT_MS
			}),
			routeCoordinator,
			subscribe: (subscriber) => {
				if (closed) throw new Error("Gateway instance approval runtime is closed");
				approvalSubscribers.add(subscriber);
				let subscribed = true;
				return () => {
					if (!subscribed) return;
					subscribed = false;
					approvalSubscribers.delete(subscriber);
				};
			}
		},
		recovery,
		close: () => {
			closed = true;
			releaseRecoveryRuntime();
			approvalSubscribers.clear();
			routeCoordinator.close();
		}
	};
}
//#endregion
export { createGatewayInstanceRuntime };
