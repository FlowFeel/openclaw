import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { t as isDiagnosticFlagEnabled } from "./diagnostic-flags-DoJxaJiY.js";
import { t as countFailedChannelIngressQueueEntries } from "./ingress-queue-Bhky4XMY.js";
import { r as countFailedDeliveryQueueEntries } from "./delivery-queue-sqlite-C1XlYRGJ.js";
//#region src/gateway/health/delivery-queue.ts
const healthLog = createSubsystemLogger("health");
const debugHealth = (message, error) => {
	if (isDiagnosticFlagEnabled("health")) healthLog.info(message, { error: formatErrorMessage(error) });
};
/** Builds dead-lettered inbound and outbound queue health for gateway snapshots. */
function buildDeliveryQueueHealthSummary() {
	let failed = [];
	try {
		failed = countFailedDeliveryQueueEntries().map((queue) => {
			const entry = {
				queueName: queue.queueName,
				count: queue.count
			};
			if (queue.oldestFailedAt != null) entry.oldestFailedAt = queue.oldestFailedAt;
			return entry;
		});
	} catch (error) {
		debugHealth("outbound delivery queue health read failed", error);
	}
	let ingressFailed = [];
	try {
		ingressFailed = countFailedChannelIngressQueueEntries().map((queue) => {
			const entry = {
				channelId: queue.channelId,
				accountId: queue.accountId,
				count: queue.count
			};
			if (queue.oldestFailedAt != null) entry.oldestFailedAt = queue.oldestFailedAt;
			return entry;
		});
	} catch (error) {
		debugHealth("channel ingress queue health read failed", error);
	}
	if (failed.length === 0 && ingressFailed.length === 0) return;
	return {
		failed,
		...ingressFailed.length > 0 ? { ingressFailed } : {}
	};
}
//#endregion
export { buildDeliveryQueueHealthSummary as t };
