import { _ as Model, m as Context, v as SimpleStreamOptions } from "./types.openclaw-hJEKisz6.js";
import { Kt as StreamFn } from "./setup-wizard-types-B72aypBk.js";
import { i as GoogleThinkingLevel } from "./thinking-CAvaEbuB.js";
//#region extensions/google/transport-stream.d.ts
type CanonicalGoogleTransportApi = "google-generative-ai" | "google-vertex";
type GoogleTransportApi = CanonicalGoogleTransportApi | "openclaw-google-generative-ai-transport";
type GoogleTransportModel = Model<GoogleTransportApi> & {
  headers?: Record<string, string>;
  provider: string;
};
type GoogleTransportOptions = SimpleStreamOptions & {
  cachedContent?: string;
  toolChoice?: "auto" | "none" | "any" | "required" | {
    type: "function";
    function: {
      name: string;
    };
  };
  thinking?: {
    enabled: boolean;
    budgetTokens?: number;
    level?: GoogleThinkingLevel;
  };
};
type GoogleGenerateContentRequest = {
  cachedContent?: string;
  contents: Array<Record<string, unknown>>;
  generationConfig?: Record<string, unknown>;
  systemInstruction?: Record<string, unknown>;
  tools?: Array<Record<string, unknown>>;
  toolConfig?: Record<string, unknown>;
};
declare function buildGoogleGenerativeAiParams(model: GoogleTransportModel, context: Context, options?: GoogleTransportOptions): GoogleGenerateContentRequest;
declare function createGoogleGenerativeAiTransportStreamFn(): StreamFn;
declare function createGoogleVertexTransportStreamFn(): StreamFn;
//#endregion
export { createGoogleGenerativeAiTransportStreamFn as n, createGoogleVertexTransportStreamFn as r, buildGoogleGenerativeAiParams as t };