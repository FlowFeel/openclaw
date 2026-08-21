import { a as generateSecureUuid } from "./secure-random-Ds4AFLgz.js";
import { a as expireStagingAndLoadDeliveryQueueEntries, i as deleteDeliveryQueueEntry, m as upsertDeliveryQueueEntry } from "./delivery-queue-sqlite-C2mJ-TeJ.js";
//#region src/infra/outbound/delivery-queue-media-staging.ts
const LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME = "outbound";
const OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME = "outbound-legacy-preparing-v1";
const OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME = "outbound-preparing-v1";
const OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME = "outbound-prepared-migration-v1";
const OUTBOUND_DELIVERY_QUEUE_NAME = "outbound-prepared-v1";
const DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME = "outbound-media-staging";
function entryPayloads(entry) {
	if (Array.isArray(entry.payloads)) return entry.payloads;
	return (entry.preparedBatch?.entries ?? []).flatMap((prepared) => prepared.status === "accepted" && prepared.payload ? [prepared.payload] : []);
}
function createDeliveryQueueMediaRetention(artifacts, entryKind, stateDir) {
	const id = generateSecureUuid();
	if (!upsertDeliveryQueueEntry({
		queueName: "outbound-media-staging",
		entry: {
			id,
			enqueuedAt: Date.now(),
			retryCount: 0,
			artifacts: [...artifacts]
		},
		metadata: { entryKind },
		stateDir,
		insertOnly: true
	})) throw new Error(`Delivery queue media stage already exists: ${id}`);
	return id;
}
/** Register planned artifacts before any file becomes visible to the sweeper. */
function createDeliveryQueueMediaStage(artifacts, stateDir) {
	return createDeliveryQueueMediaRetention(artifacts, "outbound-media-stage", stateDir);
}
/** Keep queue-owned artifacts visible to GC while a recovered send is active. */
function createDeliveryQueueMediaRecoveryLease(artifacts, stateDir) {
	return createDeliveryQueueMediaRetention(artifacts, "outbound-media-recovery-lease", stateDir);
}
/** Cancel a stage that will never publish an outbound queue row. */
function cancelDeliveryQueueMediaStage(id, stateDir) {
	if (!id) return;
	deleteDeliveryQueueEntry(DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME, id, stateDir);
}
/** Release an active recovery lease after its adapter attempt settles. */
function cancelDeliveryQueueMediaRecoveryLease(id, stateDir) {
	cancelDeliveryQueueMediaStage(id, stateDir);
}
/**
* Atomically expire abandoned stages and return every artifact still owned by
* either a replayable outbound row or a producer that may still commit one.
*/
function loadDeliveryQueueMediaRetentionSnapshot(params) {
	const snapshot = expireStagingAndLoadDeliveryQueueEntries({
		queueNames: [
			OUTBOUND_DELIVERY_QUEUE_NAME,
			LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME,
			OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
			OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME
		],
		stagingQueueName: DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME,
		expireBeforeMs: params.expireBeforeMs,
		stateDir: params.stateDir
	});
	return {
		payloads: snapshot.entries.map((entry) => entryPayloads(entry)),
		stagedArtifacts: snapshot.stagingEntries.flatMap((entry) => {
			const artifacts = entry.artifacts;
			return Array.isArray(artifacts) ? artifacts.filter((artifact) => typeof artifact === "string") : [];
		})
	};
}
//#endregion
export { OUTBOUND_DELIVERY_QUEUE_NAME as a, cancelDeliveryQueueMediaStage as c, loadDeliveryQueueMediaRetentionSnapshot as d, OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME as i, createDeliveryQueueMediaRecoveryLease as l, LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME as n, OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME as o, OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME as r, cancelDeliveryQueueMediaRecoveryLease as s, DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME as t, createDeliveryQueueMediaStage as u };
