//#region packages/net-policy/src/url-protocol.d.ts
declare function hasHttpUrlPrefix(value: string): boolean;
declare function isHttpUrl(value: string | URL): boolean;
declare function isHttpsUrl(value: string | URL): boolean;
declare function isWebSocketUrl(value: string | URL): boolean;
//#endregion
export { hasHttpUrlPrefix, isHttpUrl, isHttpsUrl, isWebSocketUrl };