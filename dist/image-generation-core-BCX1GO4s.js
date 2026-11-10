import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import "./subsystem-Cr19cPPQ.js";
import "./provider-env-vars-5Fdeltvz.js";
import "./failover-error-U3al4tnA.js";
import "./runtime-shared-ldiFuWC7.js";
import "./provider-registry-DzPH9fBh.js";
import "./provider-model-shared-DrLWc2-B.js";
//#region src/plugin-sdk/image-generation-core.ts
/** Default OpenAI image model used when image-generation provider config omits one. */
const OPENAI_DEFAULT_IMAGE_MODEL = "gpt-image-2";
const loadImageGenerationCoreAuthRuntime = createLazyRuntimeModule(() => import("./image-generation-core.auth.runtime.js"));
/** Resolve image-generation provider API keys through the lazy auth runtime helper. */
async function resolveApiKeyForProvider(...args) {
	return (await loadImageGenerationCoreAuthRuntime()).resolveApiKeyForProvider(...args);
}
//#endregion
export { resolveApiKeyForProvider as n, OPENAI_DEFAULT_IMAGE_MODEL as t };
