import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { m as readProviderJsonResponse } from "./provider-http-errors-Dm9G78mz.js";
import { s as buildCopilotIdeHeaders } from "./copilot-dynamic-headers-C42FH9jo.js";
import "./provider-auth-D9UigLvZ.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./provider-http-C8bsuM26.js";
import { n as PROVIDER_LABELS, r as clampPercent } from "./provider-usage.shared-C4x5KiVT.js";
import { S as fetchJson, x as buildUsageHttpErrorSnapshot } from "./provider-usage-BSeZrJp0.js";
import { t as PUBLIC_GITHUB_COPILOT_DOMAIN } from "./domain-DI7ThHsj.js";
//#region extensions/github-copilot/usage.ts
async function fetchCopilotUsage(token, timeoutMs, fetchFn, githubDomain = PUBLIC_GITHUB_COPILOT_DOMAIN) {
	const res = await fetchJson(`https://api.${githubDomain}/copilot_internal/user`, { headers: {
		Authorization: `token ${token}`,
		...buildCopilotIdeHeaders({ includeApiVersion: true })
	} }, timeoutMs, fetchFn);
	if (!res.ok) {
		await res.body?.cancel().catch(() => void 0);
		return buildUsageHttpErrorSnapshot({
			provider: "github-copilot",
			status: res.status
		});
	}
	const payload = await readProviderJsonResponse(res, "github-copilot-usage");
	const data = isRecord(payload) ? payload : {};
	const windows = [];
	if (data.quota_snapshots?.premium_interactions) {
		const remaining = data.quota_snapshots.premium_interactions.percent_remaining;
		windows.push({
			label: "Premium",
			usedPercent: clampPercent(100 - (remaining ?? 0))
		});
	}
	if (data.quota_snapshots?.chat) {
		const remaining = data.quota_snapshots.chat.percent_remaining;
		windows.push({
			label: "Chat",
			usedPercent: clampPercent(100 - (remaining ?? 0))
		});
	}
	return {
		provider: "github-copilot",
		displayName: PROVIDER_LABELS["github-copilot"],
		windows,
		plan: data.copilot_plan
	};
}
//#endregion
export { fetchCopilotUsage as t };
