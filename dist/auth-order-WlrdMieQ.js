import { l as normalizeStringEntries } from "./string-normalization-CRyoFBPt.js";
import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import { t as formatCliCommand } from "./command-format-C5kg4XY_.js";
import { a as writeRuntimeJson } from "./runtime-DOr96aVu.js";
import { n as resolveProviderIdForAuth } from "./provider-auth-aliases-C6ORXz22.js";
import { s as normalizeProviderId } from "./model-ref-shared-BEKlpylb.js";
import { t as findNormalizedProviderValue } from "./model-selection-normalize-BL5u3jOs.js";
import { i as ensureAuthProfileStore } from "./store-BWT5kQzj.js";
import { t as resolveAuthStatePathForDisplay } from "./paths-DRJEwVxD.js";
import "./auth-profiles-67bIpdG9.js";
import { n as externalCliDiscoveryForProviderAuth } from "./external-cli-discovery-WL3vnn14.js";
import { s as setAuthProfileOrder } from "./profiles-Hfbx6aWI.js";
import "./model-selection-CZlE_kEq.js";
import { c as resolveModelsTargetAgent } from "./shared-BzUAJo8W.js";
import { t as loadModelsConfig } from "./load-config-BZxlbK_l.js";
//#region src/commands/models/auth-order.ts
/** Commands for viewing and editing per-agent provider auth profile order. */
function describeOrder(store, provider) {
	const providerKey = normalizeProviderId(provider);
	const order = store.order?.[providerKey];
	return Array.isArray(order) ? order : [];
}
function describeOrderFallback(cfg, provider) {
	const authProvider = resolveProviderIdForAuth(provider, { config: cfg });
	const configuredOrder = findNormalizedProviderValue(cfg.auth?.order, authProvider) ?? findNormalizedProviderValue(cfg.auth?.order, provider);
	if (configuredOrder === void 0) return "selecting automatically";
	return configuredOrder.length > 0 ? `using order from config: ${configuredOrder.join(", ")}` : "config selects no profiles";
}
async function resolveAuthOrderContext(opts, runtime) {
	const rawProvider = opts.provider?.trim();
	if (!rawProvider) throw new Error(`Missing --provider. Run ${formatCliCommand("openclaw models auth list")} to see saved provider profiles.`);
	const provider = normalizeProviderId(rawProvider);
	const cfg = await loadModelsConfig({
		commandName: "models auth-order",
		runtime
	});
	const { agentId, agentDir } = resolveModelsTargetAgent(cfg, opts.agent);
	return {
		cfg,
		agentId,
		agentDir,
		provider
	};
}
/** Shows the configured auth profile priority order for a provider. */
async function modelsAuthOrderGetCommand(opts, runtime) {
	const { cfg, agentId, agentDir, provider } = await resolveAuthOrderContext(opts, runtime);
	const order = describeOrder(ensureAuthProfileStore(agentDir, { externalCli: externalCliDiscoveryForProviderAuth({
		cfg,
		provider
	}) }), provider);
	if (opts.json) {
		writeRuntimeJson(runtime, {
			agentId,
			agentDir,
			provider,
			authStatePath: shortenHomePath(resolveAuthStatePathForDisplay(agentDir)),
			order: order.length > 0 ? order : null
		});
		return;
	}
	runtime.log(`Agent: ${agentId}`);
	runtime.log(`Provider: ${provider}`);
	runtime.log(`Auth state store: ${shortenHomePath(resolveAuthStatePathForDisplay(agentDir))}`);
	runtime.log(order.length > 0 ? `Auth profile order override: ${order.join(", ")}` : `Auth profile order override: none (${describeOrderFallback(cfg, provider)})`);
}
/** Clears the configured auth profile priority order for a provider. */
async function modelsAuthOrderClearCommand(opts, runtime) {
	const { cfg, agentId, agentDir, provider } = await resolveAuthOrderContext(opts, runtime);
	if (!await setAuthProfileOrder({
		agentDir,
		provider,
		order: null
	})) throw new Error(`Failed to update auth state; the auth state lock may be busy. Wait a moment and rerun ${formatCliCommand("openclaw models auth order clear --provider " + provider)}.`);
	runtime.log(`Agent: ${agentId}`);
	runtime.log(`Provider: ${provider}`);
	runtime.log(`Auth profile order override cleared; ${describeOrderFallback(cfg, provider)}.`);
}
/** Sets the provider auth profile priority order after validating each profile id. */
async function modelsAuthOrderSetCommand(opts, runtime) {
	const { cfg, agentId, agentDir, provider } = await resolveAuthOrderContext(opts, runtime);
	const store = ensureAuthProfileStore(agentDir, { externalCli: externalCliDiscoveryForProviderAuth({
		cfg,
		provider
	}) });
	const providerKey = provider;
	const requested = normalizeStringEntries(opts.order ?? []);
	if (requested.length === 0) throw new Error(`Missing profile ids. Run ${formatCliCommand("openclaw models auth list --provider " + provider)} to choose one or more profile ids.`);
	for (const profileId of requested) {
		const cred = store.profiles[profileId];
		if (!cred) throw new Error(`Auth profile "${profileId}" not found in ${shortenHomePath(agentDir)}. Run ${formatCliCommand("openclaw models auth list --provider " + provider)} to see saved profiles.`);
		if (normalizeProviderId(cred.provider) !== providerKey) throw new Error(`Auth profile "${profileId}" is for ${cred.provider}, not ${provider}.`);
	}
	const updated = await setAuthProfileOrder({
		agentDir,
		provider,
		order: requested
	});
	if (!updated) throw new Error(`Failed to update auth state; the auth state lock may be busy. Wait a moment and rerun ${formatCliCommand("openclaw models auth order set --provider " + provider + " <profileIds...>")}.`);
	runtime.log(`Agent: ${agentId}`);
	runtime.log(`Provider: ${provider}`);
	runtime.log(`Auth profile order override: ${describeOrder(updated, provider).join(", ")}`);
}
//#endregion
export { modelsAuthOrderClearCommand, modelsAuthOrderGetCommand, modelsAuthOrderSetCommand };
