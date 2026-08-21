//#region packages/net-policy/src/redact-sensitive-url.d.ts
type ConfigUiHintTags = {
  tags?: string[];
};
/** Config UI hint tag for URL-like values that may embed credentials or tokens. */
declare const SENSITIVE_URL_HINT_TAG = "url-secret";
/** True for auth-like URL query parameter names that should be redacted. */
declare function isSensitiveUrlQueryParamName(name: string): boolean;
/** True for config paths whose URL values may contain credentials or secret query params. */
declare function isSensitiveUrlConfigPath(path: string): boolean;
/** True when a config UI hint explicitly marks a URL-like value as secret-bearing. */
declare function hasSensitiveUrlHintTag(hint: ConfigUiHintTags | undefined): boolean;
/** Redacts credentials and sensitive query params from URL values. */
declare function redactSensitiveUrl(value: string): string;
/** Redacts sensitive URL-looking substrings even when the full value is not a valid URL. */
declare function redactSensitiveUrlLikeString(value: string): string;
//#endregion
export { SENSITIVE_URL_HINT_TAG, hasSensitiveUrlHintTag, isSensitiveUrlConfigPath, isSensitiveUrlQueryParamName, redactSensitiveUrl, redactSensitiveUrlLikeString };