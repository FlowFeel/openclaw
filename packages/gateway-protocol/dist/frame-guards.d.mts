import { a as EventFrame, c as GatewayFrame, f as RequestFrame, m as ResponseFrame, r as ErrorShape, t as ConnectParams, u as HelloOk } from "./frames-C3sy04oE.mjs";

//#region packages/gateway-protocol/src/frame-guards.d.ts
declare function isGatewayEventFrame(value: unknown): value is EventFrame;
declare function isGatewayResponseFrame(value: unknown): value is ResponseFrame;
//#endregion
export { type ConnectParams, type ErrorShape, type EventFrame, type GatewayFrame, type HelloOk, type RequestFrame, type ResponseFrame, isGatewayEventFrame, isGatewayResponseFrame };