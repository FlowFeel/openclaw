import "./fs-safe-defaults-BsoUVa5C.js";
import { i as root } from "./root-impl-DYBxk3hn.js";
//#region src/infra/root-walk.ts
async function* walkRootDirectory(rootDir, relativePath, options) {
	yield* (await root(rootDir)).walk(relativePath, options);
}
//#endregion
export { walkRootDirectory as t };
