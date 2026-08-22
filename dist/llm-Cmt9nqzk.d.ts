import { _ as SimpleStreamOptions, a as AssistantMessageEventStreamContract, c as Context, d as Model, g as ProviderStreamOptions, n as Api, r as AssistantMessage } from "./types-xx0UXBU1.js";
import { ApiProvider } from "@openclaw/ai";
import { calculateCost, clampThinkingLevel, getApiProvider, getApiProviders, getEnvApiKey, parseStreamingJson, sanitizeSurrogates } from "@openclaw/ai/internal/runtime";
import { adjustMaxTokensForThinking, buildBaseOptions, clampReasoning, transformMessages } from "@openclaw/ai/internal/shared";
import { Agent } from "node:http";
import { Agent as Agent$1 } from "node:https";

//#region src/llm/stream.d.ts
declare function stream<TApi extends Api>(model: Model<TApi>, context: Context, options?: ProviderStreamOptions): AssistantMessageEventStreamContract;
declare function complete<TApi extends Api>(model: Model<TApi>, context: Context, options?: ProviderStreamOptions): Promise<AssistantMessage>;
declare function streamSimple<TApi extends Api>(model: Model<TApi>, context: Context, options?: SimpleStreamOptions): AssistantMessageEventStreamContract;
declare function completeSimple<TApi extends Api>(model: Model<TApi>, context: Context, options?: SimpleStreamOptions): Promise<AssistantMessage>;
//#endregion
//#region src/llm/utils/node-http-proxy.d.ts
/** HTTP(S) agent pair for Node fetch/client integrations that accept explicit agents. */
interface NodeHttpProxyAgents {
  httpAgent: Agent;
  httpsAgent: Agent$1;
}
/** Builds fixed HTTP and HTTPS proxy agents for a target URL, when env proxy config applies. */
declare function createHttpProxyAgentsForTarget(targetUrl: string | URL): NodeHttpProxyAgents | undefined;
//#endregion
export { streamSimple as _, clampReasoning as a, getApiProviders as c, sanitizeSurrogates as d, transformMessages as f, stream as g, completeSimple as h, calculateCost as i, getEnvApiKey as l, complete as m, adjustMaxTokensForThinking as n, clampThinkingLevel as o, createHttpProxyAgentsForTarget as p, buildBaseOptions as r, getApiProvider as s, ApiProvider as t, parseStreamingJson as u };