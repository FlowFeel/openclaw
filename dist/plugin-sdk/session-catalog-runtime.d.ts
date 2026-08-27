import { Yn as SessionCatalogProvider } from "../types-fxGJj6Ov.js";

//#region src/plugins/session-catalog-active.d.ts
type ActiveSessionCatalog = {
  pluginId: string;
  id: string;
  label: string;
  list: SessionCatalogProvider["list"];
  read: SessionCatalogProvider["read"];
};
/**
 * Read-only list/read facade over the active registered session catalogs.
 * Deliberately excludes continue/archive/terminal so consumers cannot gain
 * session control through this seam; mutation stays on the gateway RPCs.
 */
declare function listActiveSessionCatalogs(): ActiveSessionCatalog[];
//#endregion
export { type ActiveSessionCatalog, listActiveSessionCatalogs };