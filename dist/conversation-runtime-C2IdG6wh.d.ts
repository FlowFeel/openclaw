//#region src/channels/thread-bindings-policy.d.ts
/** Resolves the effective enabled flag for thread bindings. */
declare function resolveThreadBindingsEnabled(params: {
  channelEnabledRaw: unknown;
  sessionEnabledRaw: unknown;
}): boolean;
//#endregion
export { resolveThreadBindingsEnabled as t };