//#region extensions/xai/model-id.d.ts
declare const XAI_OAUTH_AUTO_MODEL_ID = "auto";
declare function normalizeXaiModelId(id: string): string;
//#endregion
export { normalizeXaiModelId as n, XAI_OAUTH_AUTO_MODEL_ID as t };