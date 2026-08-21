import { n as OpenClawConfig } from "./types.openclaw-B-6RRL7F.js";
import { _n as requireApiKey, dn as completeWithPreparedSimpleCompletionModel, dt as ResolvedTtsConfig, fn as prepareSimpleCompletionModel } from "./types-DdUyjaEr.js";

//#region src/tts/tts-core.d.ts
type SummarizeTextDeps = {
  completeWithPreparedSimpleCompletionModel: typeof completeWithPreparedSimpleCompletionModel;
  prepareSimpleCompletionModel: typeof prepareSimpleCompletionModel;
  requireApiKey: typeof requireApiKey;
};
type SummarizeResult = {
  summary: string;
  latencyMs: number;
  inputLength: number;
  outputLength: number;
};
/** Summarize long text before synthesis using the configured summary model. */
declare function summarizeText(params: {
  text: string;
  targetLength: number;
  cfg: OpenClawConfig;
  config: ResolvedTtsConfig;
  timeoutMs: number;
}, deps?: SummarizeTextDeps): Promise<SummarizeResult>;
//#endregion
export { summarizeText as t };