//#region packages/media-understanding-common/src/video.d.ts
/** Estimate base64 size for a byte count. */
declare function estimateBase64Size(bytes: number): number;
/** Resolve video base64 byte limit from raw byte limit and global cap. */
declare function resolveVideoMaxBase64Bytes(maxBytes: number): number;
//#endregion
export { estimateBase64Size, resolveVideoMaxBase64Bytes };