import { n as loadWebMedia } from "./web-media-DG7t3WQ-.js";
import { t as buildOutboundMediaLoadOptions } from "./load-options-VzbF4ozo.js";
import "./web-media-I61cmKEo.js";
import { randomBytes } from "node:crypto";
//#region src/plugin-sdk/outbound-media.ts
/** Load outbound media from a remote URL or approved local path using the shared web-media policy. */
async function loadOutboundMediaFromUrl(mediaUrl, options = {}) {
	return await loadWebMedia(mediaUrl, buildOutboundMediaLoadOptions({
		maxBytes: options.maxBytes,
		mediaAccess: options.mediaAccess,
		mediaLocalRoots: options.mediaLocalRoots,
		mediaReadFile: options.mediaReadFile,
		workspaceDir: options.workspaceDir,
		proxyUrl: options.proxyUrl,
		fetchImpl: options.fetchImpl,
		requestInit: options.requestInit,
		optimizeImages: options.optimizeImages,
		trustExplicitProxyDns: options.trustExplicitProxyDns
	}));
}
const DEFAULT_HOSTED_OUTBOUND_MEDIA_RAW_CHUNK_BYTES = 36 * 1024;
const DEFAULT_HOSTED_OUTBOUND_MEDIA_MAX_ENTRIES = 64;
const DEFAULT_HOSTED_OUTBOUND_MEDIA_CHUNK_ROWS_PER_ENTRY_BUDGET = 512;
const HOSTED_OUTBOUND_MEDIA_METADATA_TTL_GRACE_MS = 6e4;
function createHostedOutboundMediaId() {
	return randomBytes(12).toString("hex");
}
function createHostedOutboundMediaToken() {
	return randomBytes(24).toString("hex");
}
function buildHostedOutboundMediaMetaKey(id) {
	return `media:${id}:meta`;
}
function buildHostedOutboundMediaChunkKey(id, index) {
	return `media:${id}:chunk:${String(index).padStart(4, "0")}`;
}
function parseHostedOutboundMediaMetaKey(key) {
	if (!key.startsWith("media:") || !key.endsWith(":meta")) return;
	return key.slice(6, -5) || void 0;
}
function resolveHostedOutboundMediaMetadataTtlMs(ttlMs) {
	return ttlMs + Math.min(ttlMs, HOSTED_OUTBOUND_MEDIA_METADATA_TTL_GRACE_MS);
}
function isFutureHostedOutboundMediaExpiry(expiresAt, nowMs) {
	return typeof expiresAt === "number" && Number.isSafeInteger(expiresAt) && expiresAt > nowMs;
}
function createHostedOutboundMediaMetaRecord(params) {
	return {
		id: params.id,
		routePath: params.routePath,
		token: params.token,
		...params.contentType ? { contentType: params.contentType } : {},
		expiresAt: params.expiresAt,
		chunkCount: params.chunkCount,
		byteLength: params.byteLength
	};
}
function createHostedOutboundMediaMetadata(meta) {
	return {
		routePath: meta.routePath,
		token: meta.token,
		...meta.contentType ? { contentType: meta.contentType } : {},
		expiresAt: meta.expiresAt,
		byteLength: meta.byteLength
	};
}
async function deleteHostedOutboundMediaRows(id, metadataStore, chunkStore, knownChunkCount) {
	const metaKey = buildHostedOutboundMediaMetaKey(id);
	const chunkCount = (await metadataStore.lookup(metaKey))?.chunkCount ?? knownChunkCount;
	if (chunkCount != null) for (let index = 0; index < chunkCount; index += 1) await chunkStore.delete(buildHostedOutboundMediaChunkKey(id, index));
	await metadataStore.delete(metaKey);
}
function createHostedOutboundMediaStore(options) {
	const rawChunkBytes = options.rawChunkBytes ?? DEFAULT_HOSTED_OUTBOUND_MEDIA_RAW_CHUNK_BYTES;
	const maxEntries = options.maxEntries ?? DEFAULT_HOSTED_OUTBOUND_MEDIA_MAX_ENTRIES;
	const chunkRowsPerEntryBudget = options.chunkRowsPerEntryBudget ?? DEFAULT_HOSTED_OUTBOUND_MEDIA_CHUNK_ROWS_PER_ENTRY_BUDGET;
	const maxChunkRows = options.maxChunkRows ?? maxEntries * chunkRowsPerEntryBudget;
	const overflowPolicy = options.overflowPolicy ?? "evict-oldest";
	if (!Number.isSafeInteger(maxEntries) || maxEntries < 1) throw new Error("hosted outbound media maxEntries must be a positive integer");
	if (!Number.isSafeInteger(maxChunkRows) || maxChunkRows < 1) throw new Error("hosted outbound media maxChunkRows must be a positive integer");
	if (overflowPolicy !== "evict-oldest" && overflowPolicy !== "reject-new") throw new Error("hosted outbound media overflowPolicy must be evict-oldest or reject-new");
	const createId = options.createId ?? createHostedOutboundMediaId;
	const createToken = options.createToken ?? createHostedOutboundMediaToken;
	let capacityMutation = Promise.resolve();
	async function withCapacityMutation(operation) {
		const result = capacityMutation.then(operation, operation);
		capacityMutation = result.then(() => void 0, () => void 0);
		return await result;
	}
	async function deleteEntry(id) {
		await deleteHostedOutboundMediaRows(id, options.metadataStore, options.chunkStore);
	}
	async function deleteEntryRows(id, chunkCount) {
		await deleteHostedOutboundMediaRows(id, options.metadataStore, options.chunkStore, chunkCount);
	}
	async function readMetadataRecord(id, nowMs) {
		const meta = await options.metadataStore.lookup(buildHostedOutboundMediaMetaKey(id));
		if (!meta) return null;
		if (!isFutureHostedOutboundMediaExpiry(meta.expiresAt, nowMs)) {
			await withCapacityMutation(async () => await deleteEntry(id));
			return null;
		}
		return meta;
	}
	async function deleteStoredRow(row) {
		const id = parseHostedOutboundMediaMetaKey(row.key);
		if (!id || !Number.isSafeInteger(row.value.chunkCount) || row.value.chunkCount < 1 || row.value.chunkCount > maxChunkRows) {
			await options.metadataStore.delete(row.key);
			return;
		}
		for (let index = 0; index < row.value.chunkCount; index += 1) await options.chunkStore.delete(buildHostedOutboundMediaChunkKey(id, index));
		await options.metadataStore.delete(row.key);
	}
	async function cleanupExpired(nowMs = Date.now()) {
		await withCapacityMutation(async () => {
			for (const row of await options.metadataStore.entries()) if (!isFutureHostedOutboundMediaExpiry(row.value.expiresAt, nowMs)) await deleteStoredRow(row);
		});
	}
	async function pruneForCapacity(incomingChunkCount, nowMs = Date.now()) {
		const rows = await options.metadataStore.entries();
		const validRows = rows.filter((row) => {
			const id = parseHostedOutboundMediaMetaKey(row.key);
			return id !== void 0 && row.value.id === id && Number.isSafeInteger(row.value.chunkCount) && row.value.chunkCount > 0 && row.value.chunkCount <= maxChunkRows && isFutureHostedOutboundMediaExpiry(row.value.expiresAt, nowMs);
		});
		const validKeys = new Set(validRows.map((row) => row.key));
		const orderedRows = validRows.toSorted((a, b) => a.createdAt - b.createdAt || a.key.localeCompare(b.key));
		const invalidRows = rows.filter((row) => !validKeys.has(row.key));
		for (const row of invalidRows) await deleteStoredRow(row);
		let entryCount = orderedRows.length;
		let chunkCount = orderedRows.reduce((total, row) => total + row.value.chunkCount, 0);
		if (overflowPolicy === "reject-new" && (entryCount >= maxEntries || chunkCount + incomingChunkCount > maxChunkRows)) throw new Error(`hosted outbound media capacity is full (${entryCount}/${maxEntries} entries, ${chunkCount + incomingChunkCount}/${maxChunkRows} chunk rows)`);
		for (const row of orderedRows) {
			if (entryCount < maxEntries && chunkCount + incomingChunkCount <= maxChunkRows) break;
			const id = parseHostedOutboundMediaMetaKey(row.key);
			if (!id) continue;
			await deleteEntry(id);
			entryCount -= 1;
			chunkCount -= row.value.chunkCount;
		}
	}
	return {
		async prepareUrl(params) {
			const expiresAt = options.resolveExpiresAtMs(options.ttlMs);
			if (expiresAt === void 0) throw new Error("hosted outbound media expiry could not be resolved");
			const media = await loadOutboundMediaFromUrl(params.mediaUrl, {
				maxBytes: params.maxBytes,
				mediaAccess: params.mediaAccess,
				...params.proxyUrl ? { proxyUrl: params.proxyUrl } : {}
			});
			const id = createId();
			const token = createToken();
			const metadataTtlMs = resolveHostedOutboundMediaMetadataTtlMs(options.ttlMs);
			const chunkCount = Math.max(1, Math.ceil(media.buffer.byteLength / rawChunkBytes));
			if (chunkCount > maxChunkRows) throw new Error(`hosted outbound media exceeds SQLite chunk row limit (${chunkCount}/${maxChunkRows})`);
			return await withCapacityMutation(async () => {
				await pruneForCapacity(chunkCount);
				try {
					for (let index = 0; index < chunkCount; index += 1) {
						const chunk = media.buffer.subarray(index * rawChunkBytes, (index + 1) * rawChunkBytes);
						await options.chunkStore.register(buildHostedOutboundMediaChunkKey(id, index), {
							id,
							index,
							dataBase64: chunk.toString("base64")
						}, { ttlMs: options.ttlMs });
					}
					await options.metadataStore.register(buildHostedOutboundMediaMetaKey(id), createHostedOutboundMediaMetaRecord({
						id,
						routePath: params.routePath,
						token,
						contentType: media.contentType,
						expiresAt,
						chunkCount,
						byteLength: media.buffer.byteLength
					}), { ttlMs: metadataTtlMs });
				} catch (error) {
					await deleteEntryRows(id, chunkCount);
					throw error;
				}
				return `${params.publicBaseUrl}${params.routePath}${id}?token=${token}`;
			});
		},
		async readMetadata(id, nowMs = Date.now()) {
			const meta = await readMetadataRecord(id, nowMs);
			return meta ? createHostedOutboundMediaMetadata(meta) : null;
		},
		async read(id, nowMs = Date.now()) {
			const meta = await readMetadataRecord(id, nowMs);
			if (!meta) return null;
			const chunks = [];
			for (let index = 0; index < meta.chunkCount; index += 1) {
				const chunk = await options.chunkStore.lookup(buildHostedOutboundMediaChunkKey(id, index));
				if (!chunk || chunk.id !== id || chunk.index !== index) {
					await withCapacityMutation(async () => await deleteEntry(id));
					return null;
				}
				chunks.push(Buffer.from(chunk.dataBase64, "base64"));
			}
			return {
				metadata: createHostedOutboundMediaMetadata(meta),
				buffer: Buffer.concat(chunks, meta.byteLength)
			};
		},
		async delete(id) {
			await withCapacityMutation(async () => await deleteEntry(id));
		},
		cleanupExpired,
		async clear() {
			await withCapacityMutation(async () => await Promise.all([options.metadataStore.clear(), options.chunkStore.clear()]));
		}
	};
}
//#endregion
export { loadOutboundMediaFromUrl as n, createHostedOutboundMediaStore as t };
