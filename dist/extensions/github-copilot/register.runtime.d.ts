import { Y as coerceSecretRef } from "../../types.openclaw-CXX8ljmy.js";
import { D as listProfilesForProvider, E as ensureAuthProfileStore } from "../../types-CJY5tURi.js";
import { githubCopilotLoginCommand } from "./login.js";
import { PROVIDER_ID, resolveCopilotForwardCompatModel } from "./models.js";
import { DEFAULT_COPILOT_API_BASE_URL, resolveCopilotRuntimeAuth } from "./runtime-auth.js";
import { resolveCopilotStarterModel } from "./starter-model.js";
import { wrapCopilotAnthropicStream, wrapCopilotProviderStream } from "./stream.js";
import { fetchCopilotUsage } from "./usage.js";
export { DEFAULT_COPILOT_API_BASE_URL, PROVIDER_ID, coerceSecretRef, ensureAuthProfileStore, fetchCopilotUsage, githubCopilotLoginCommand, listProfilesForProvider, resolveCopilotForwardCompatModel, resolveCopilotRuntimeAuth, resolveCopilotStarterModel, wrapCopilotAnthropicStream, wrapCopilotProviderStream };