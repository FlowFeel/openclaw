import { A as loadPairedDevicePairingStoreRecord } from "./device-bootstrap-DYEV7gvD.js";
import { b as resolveNodePairingGeneration, l as hasEffectivePairedDeviceRole, s as getPairedDevice, x as resolveNodePairingState } from "./device-pairing-D3ZJFObN.js";
//#region src/infra/node-pairing-state.ts
function toNodePairingBinding(state) {
	return state ? {
		identity: state.identity.key,
		...state.generation ? { generation: state.generation.key } : {}
	} : void 0;
}
/** Captures the persistent authenticated pairing and optional approved surface. */
async function captureNodePairingState(nodeId, baseDir) {
	return resolveNodePairingState(await getPairedDevice(nodeId, baseDir));
}
/** Registry projection of the current persistent pairing owner. */
async function resolveCurrentNodePairingBinding(nodeId) {
	return toNodePairingBinding(await captureNodePairingState(nodeId));
}
/** Synchronous registry projection for non-yielding process-local reads. */
function isNodePairingBindingCurrent(nodeId, expected) {
	const current = toNodePairingBinding(resolveNodePairingState(loadPairedDevicePairingStoreRecord(nodeId)));
	return Boolean(current && current.identity === expected.identity && (!expected.generation || current.generation === expected.generation));
}
/** Captures the persistent node pairing generation admitted for new work. */
async function captureNodePairingGeneration(nodeId) {
	return (await captureNodePairingState(nodeId))?.generation ?? null;
}
/** Binds a connected session to the exact device key and node token it authenticated with. */
async function captureAuthenticatedNodePairingState(params) {
	const device = await getPairedDevice(params.nodeId, params.baseDir);
	if (!device || device.publicKey !== params.publicKey || device.tokens?.node?.token !== params.token || !hasEffectivePairedDeviceRole(device, "node")) return null;
	return resolveNodePairingState(device);
}
/** Revalidates that asynchronous work still belongs to the admitted pairing. */
async function isNodePairingGenerationCurrent(generation) {
	return resolveNodePairingGeneration(await getPairedDevice(generation.nodeId))?.key === generation.key;
}
//#endregion
export { isNodePairingGenerationCurrent as a, isNodePairingBindingCurrent as i, captureNodePairingGeneration as n, resolveCurrentNodePairingBinding as o, captureNodePairingState as r, captureAuthenticatedNodePairingState as t };
