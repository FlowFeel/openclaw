import { r as registerCoreCliCommands } from "./command-registry-core-C_05VNlA.js";
import { n as registerSubCliCommands } from "./register.subclis-DjAe_of8.js";
//#region src/cli/program/command-registry.ts
/** Register all root-program commands for the current argv shape. */
function registerProgramCommands(program, ctx, argv = process.argv) {
	registerCoreCliCommands(program, ctx, argv);
	registerSubCliCommands(program, argv);
}
//#endregion
export { registerProgramCommands as t };
