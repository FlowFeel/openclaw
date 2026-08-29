import { Ln as strictObject, Rn as string, Tn as object, wn as number, yt as _enum } from "../../schemas-CZ9Toj_c.js";
import { n as resolvePreferredOpenClawTmpDir } from "../../tmp-openclaw-dir-BBjU-hqW.js";
import { t as canonicalizeBase64 } from "../../base64-KcXAb-1x.js";
import { n as buildPluginConfigSchema } from "../../config-schema-Cjz2ed1U.js";
import "../../temp-path-CVFOBJ6f.js";
import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import "../../media-runtime-CUlmu2wD.js";
import { createRequire } from "node:module";
import { createHash, randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRastermill } from "rastermill";
const ComputerActParamsSchema = strictObject({
	action: _enum([
		"left_click",
		"right_click",
		"middle_click",
		"double_click",
		"triple_click",
		"mouse_move",
		"left_click_drag",
		"left_mouse_down",
		"left_mouse_up",
		"scroll",
		"type",
		"key",
		"hold_key"
	]),
	displayFrameId: string().optional(),
	x: number().finite().nonnegative().optional(),
	y: number().finite().nonnegative().optional(),
	fromX: number().finite().nonnegative().optional(),
	fromY: number().finite().nonnegative().optional(),
	text: string().optional(),
	keys: string().optional(),
	modifiers: string().optional(),
	scrollDirection: _enum([
		"up",
		"down",
		"left",
		"right"
	]).optional(),
	scrollAmount: number().int().positive().optional(),
	durationMs: number().int().nonnegative().optional(),
	screenIndex: number().int().nonnegative().optional(),
	refWidth: number().int().positive().optional()
});
const MODIFIER_ALIASES = /* @__PURE__ */ new Map([
	["ctrl", "ctrl"],
	["control", "ctrl"],
	["shift", "shift"],
	["alt", "alt"],
	["menu", "alt"],
	["option", "alt"],
	["mod1", "alt"],
	["cmd", "meta"],
	["command", "meta"],
	["meta", "meta"],
	["super", "meta"],
	["win", "meta"],
	["windows", "meta"],
	["mod4", "meta"]
]);
const KEY_ALIASES = /* @__PURE__ */ new Map([
	["return", "enter"],
	["enter", "enter"],
	["tab", "tab"],
	["escape", "escape"],
	["esc", "escape"],
	["space", "space"],
	["backspace", "backspace"],
	["delete", "delete"],
	["del", "delete"],
	["insert", "insert"],
	["ins", "insert"],
	["home", "home"],
	["end", "end"],
	["pageup", "pageup"],
	["pgup", "pageup"],
	["pagedown", "pagedown"],
	["pgdn", "pagedown"],
	["up", "up"],
	["down", "down"],
	["left", "left"],
	["right", "right"],
	["capslock", "capslock"],
	["numlock", "numlock"]
]);
for (let index = 1; index <= 12; index += 1) KEY_ALIASES.set(`f${index}`, `f${index}`);
function unsupportedKey(message) {
	return /* @__PURE__ */ new Error(`COMPUTER_UNSUPPORTED_KEY: ${message}`);
}
function normalizeModifiers(value) {
	if (!value?.trim()) return [];
	return value.split("+").map((entry) => {
		const raw = entry.trim();
		const normalized = MODIFIER_ALIASES.get(raw.toLowerCase());
		if (!normalized) throw unsupportedKey(`unknown modifier ${JSON.stringify(raw)}`);
		return normalized;
	});
}
function normalizeKey(value) {
	const raw = value.trim();
	if (!raw) throw unsupportedKey("key chord contains an empty key");
	const lowered = raw.toLowerCase();
	const modifier = MODIFIER_ALIASES.get(lowered);
	if (modifier) return modifier;
	const named = KEY_ALIASES.get(lowered);
	if (named) return named;
	if (/^[a-z]$/i.test(raw)) return lowered;
	if (raw.length === 1) throw unsupportedKey(`single-character key ${JSON.stringify(raw)} loses layout shift state in cua-driver; use the type action instead`);
	throw unsupportedKey(`unknown key ${JSON.stringify(raw)}`);
}
function parseKeyChord(value) {
	const segments = value?.split("+").map((entry) => entry.trim()) ?? [];
	const rawKey = segments.pop();
	if (!rawKey) throw unsupportedKey("key chord is empty");
	const modifiers = segments.map((entry) => {
		const normalized = MODIFIER_ALIASES.get(entry.toLowerCase());
		if (!normalized) throw unsupportedKey(`unknown modifier ${JSON.stringify(entry)}`);
		return normalized;
	});
	return {
		key: normalizeKey(rawKey),
		modifiers
	};
}
function scalePoint(frame, x, y, label) {
	if (x === void 0 || y === void 0) throw new Error(`COMPUTER_INVALID_REQUEST: ${label} coordinates are required`);
	if (x >= frame.deliveredWidth || y >= frame.deliveredHeight) throw new Error(`COMPUTER_INVALID_REQUEST: ${label} coordinates are outside the captured primary-display frame`);
	return {
		x: Math.min(frame.nativeWidth - 1, Math.round(x * frame.nativeWidth / frame.deliveredWidth)),
		y: Math.min(frame.nativeHeight - 1, Math.round(y * frame.nativeHeight / frame.deliveredHeight))
	};
}
//#endregion
//#region extensions/cua-computer/src/driver-client.ts
const ClickButton = {
	Left: 0,
	Right: 1,
	Middle: 2
};
const ScrollDirection = {
	Up: 0,
	Down: 1,
	Left: 2,
	Right: 3
};
function asyncOptions(signal) {
	return signal ? { signal } : void 0;
}
var DirectCuaDriverSession = class {
	constructor(sdk) {
		this.sdk = sdk;
		this.generation = randomUUID();
		this.publicSession = `openclaw-${randomUUID()}`;
		this.started = false;
		this.disposed = false;
		const unrestricted = sdk.SessionPermissionMode.Unrestricted;
		const authorization = {
			allowedModes: [unrestricted],
			compatibilityMode: unrestricted,
			unrestrictedAcknowledged: true,
			maxSessionTtlSeconds: 3600n,
			maxIdleTtlSeconds: 300n
		};
		this.runtime = sdk.CuaDriver.createConfigured({
			claudeCodeCompatibility: false,
			authorization
		});
		this.session = sdk.createTrustedSession(this.runtime, {
			publicSession: this.publicSession,
			mode: unrestricted,
			ttlSeconds: authorization.maxSessionTtlSeconds,
			idleTtlSeconds: authorization.maxIdleTtlSeconds
		});
	}
	async ensureStarted(signal) {
		if (this.disposed) throw new Error("COMPUTER_DRIVER_UNAVAILABLE: cua-computer is stopping");
		if (!this.startPromise) {
			const start = this.session.startSession({
				session: this.publicSession,
				captureScope: this.sdk.CaptureScope.Desktop
			}, asyncOptions(signal)).then(() => {
				this.started = true;
			});
			this.startPromise = start;
			try {
				await start;
			} catch (error) {
				if (this.startPromise === start) this.startPromise = void 0;
				throw error;
			}
			return;
		}
		await this.startPromise;
	}
	async invoke(signal, operation) {
		await this.ensureStarted(signal);
		return await operation();
	}
	isAvailable() {
		return !this.disposed && this.runtime.isAvailable();
	}
	resetAvailabilityCache() {}
	async getDesktopState(signal) {
		return await this.invoke(signal, () => this.session.getDesktopState({}, asyncOptions(signal)));
	}
	async getScreenSize(signal) {
		return await this.invoke(signal, () => this.session.getScreenSize({}, asyncOptions(signal)));
	}
	async click(input, signal) {
		return await this.invoke(signal, () => this.session.click({
			...input,
			scope: this.sdk.DesktopScope.Desktop
		}, asyncOptions(signal)));
	}
	async drag(input, signal) {
		return await this.invoke(signal, () => this.session.drag({
			...input,
			scope: this.sdk.DesktopScope.Desktop
		}, asyncOptions(signal)));
	}
	async moveCursor(input, signal) {
		return await this.invoke(signal, () => this.session.moveCursor({
			...input,
			scope: this.sdk.DesktopScope.Desktop
		}, asyncOptions(signal)));
	}
	async scroll(input, signal) {
		return await this.invoke(signal, () => this.session.scroll({
			...input,
			scope: this.sdk.DesktopScope.Desktop,
			by: this.sdk.ScrollBy.Line
		}, asyncOptions(signal)));
	}
	async typeText(text, signal) {
		return await this.invoke(signal, () => this.session.typeText({
			text,
			scope: this.sdk.DesktopScope.Desktop
		}, asyncOptions(signal)));
	}
	async pressKey(input, signal) {
		return await this.invoke(signal, () => this.session.pressKey({
			...input,
			scope: this.sdk.DesktopScope.Desktop
		}, asyncOptions(signal)));
	}
	async dispose() {
		if (this.disposed) return;
		this.disposed = true;
		let failure;
		try {
			await this.startPromise;
		} catch (error) {
			failure = error;
		}
		if (this.started) try {
			await this.session.endSession({ session: this.publicSession });
		} catch (error) {
			failure ??= error;
		}
		try {
			this.session.close();
		} catch (error) {
			failure = error;
		}
		try {
			await this.runtime.shutdown();
		} catch (error) {
			failure ??= error;
		}
		try {
			this.runtime.uniffiDestroy?.();
		} catch (error) {
			failure ??= error;
		}
		if (failure) throw failure instanceof Error ? failure : new Error("CUA Driver cleanup failed", { cause: failure });
	}
};
const require = createRequire(import.meta.url);
function loadCuaDriverSdk() {
	return require("@trycua/cua-driver");
}
function unavailableError(failure) {
	const detail = failure instanceof Error ? failure.message : String(failure);
	return new Error(`COMPUTER_DRIVER_UNAVAILABLE: failed to load CUA Driver SDK: ${detail}`, { cause: failure });
}
var LazyCuaDriverSession = class {
	constructor(loadSdk) {
		this.loadSdk = loadSdk;
		this.unloadedGeneration = randomUUID();
		this.hasLoadFailure = false;
		this.disposed = false;
	}
	get generation() {
		return this.runtime?.generation ?? this.unloadedGeneration;
	}
	resolveRuntime() {
		if (this.disposed || this.hasLoadFailure) return;
		if (this.runtime) return this.runtime;
		try {
			this.runtime = new DirectCuaDriverSession(this.loadSdk());
			return this.runtime;
		} catch (error) {
			this.loadFailure = error;
			this.hasLoadFailure = true;
			return;
		}
	}
	requireRuntime() {
		const runtime = this.resolveRuntime();
		if (runtime) return runtime;
		throw unavailableError(this.disposed ? /* @__PURE__ */ new Error("cua-computer is stopping") : this.loadFailure);
	}
	isAvailable() {
		return this.resolveRuntime()?.isAvailable() ?? false;
	}
	resetAvailabilityCache() {
		if (this.runtime) this.runtime.resetAvailabilityCache();
		else if (!this.disposed) {
			this.loadFailure = void 0;
			this.hasLoadFailure = false;
		}
	}
	async getDesktopState(signal) {
		return await this.requireRuntime().getDesktopState(signal);
	}
	async getScreenSize(signal) {
		return await this.requireRuntime().getScreenSize(signal);
	}
	async click(input, signal) {
		return await this.requireRuntime().click(input, signal);
	}
	async drag(input, signal) {
		return await this.requireRuntime().drag(input, signal);
	}
	async moveCursor(input, signal) {
		return await this.requireRuntime().moveCursor(input, signal);
	}
	async scroll(input, signal) {
		return await this.requireRuntime().scroll(input, signal);
	}
	async typeText(text, signal) {
		return await this.requireRuntime().typeText(text, signal);
	}
	async pressKey(input, signal) {
		return await this.requireRuntime().pressKey(input, signal);
	}
	async dispose() {
		if (this.disposed) return;
		this.disposed = true;
		await this.runtime?.dispose();
	}
};
function createCuaDriver(options = {}) {
	return new LazyCuaDriverSession(options.loadSdk ?? loadCuaDriverSdk);
}
//#endregion
//#region extensions/cua-computer/src/frame.ts
function staleFrame(message) {
	return /* @__PURE__ */ new Error(`COMPUTER_STALE_FRAME: ${message}; take a new screenshot`);
}
/**
* CUA Driver exposes only the primary-display label, not a stable display ID.
* Bind authorization to connection generation plus the complete live geometry.
*/
function issueFrame(state, geometry, delivered) {
	const id = `cua:v1:${createHash("sha256").update(JSON.stringify([
		state.generation,
		geometry.platform,
		geometry.display,
		geometry.screenWidth,
		geometry.screenHeight,
		geometry.scaleFactor,
		geometry.screenshotWidth,
		geometry.screenshotHeight
	])).digest("hex")}`;
	state.lastFrame = {
		id,
		nativeWidth: geometry.screenshotWidth,
		nativeHeight: geometry.screenshotHeight,
		deliveredWidth: delivered.width,
		deliveredHeight: delivered.height,
		geometry: {
			width: geometry.screenWidth,
			height: geometry.screenHeight,
			scaleFactor: geometry.scaleFactor
		}
	};
	return id;
}
function verifyFrame(state, echoedId, currentScreenSize) {
	const frame = state.lastFrame;
	if (!frame || !echoedId || echoedId !== frame.id) {
		state.lastFrame = void 0;
		throw staleFrame("the coordinate frame is missing or no longer current");
	}
	if (!(currentScreenSize.width === frame.geometry.width && currentScreenSize.height === frame.geometry.height && currentScreenSize.scaleFactor === frame.geometry.scaleFactor)) {
		state.lastFrame = void 0;
		throw staleFrame("the primary display geometry changed");
	}
	return frame;
}
function verifyReferenceWidth(state, frame, refWidth) {
	if (refWidth === frame.deliveredWidth) return;
	state.lastFrame = void 0;
	throw staleFrame("the coordinate reference width changed");
}
//#endregion
//#region extensions/cua-computer/src/commands.ts
const AVAILABILITY_POLL_MS = 5e3;
const MAX_IMAGE_PIXELS = 4e7;
const SnapshotParamsSchema = strictObject({
	screenIndex: number().int().nonnegative().optional(),
	maxWidth: number().int().positive().optional(),
	quality: number().finite().optional(),
	format: _enum(["jpeg", "png"]).optional()
});
const DesktopStateSchema = object({
	platform: string().min(1),
	display: string().min(1),
	screenshot_width: number().int().positive(),
	screenshot_height: number().int().positive(),
	screen_width: number().int().positive(),
	screen_height: number().int().positive(),
	scale_factor: number().positive()
});
const ScreenSizeSchema = object({
	width: number().int().positive(),
	height: number().int().positive(),
	scale_factor: number().positive()
});
var PromiseQueue = class {
	constructor() {
		this.tail = Promise.resolve();
	}
	async run(operation) {
		const previous = this.tail;
		let release = () => {};
		this.tail = new Promise((resolve) => {
			release = resolve;
		});
		await previous;
		try {
			return await operation();
		} finally {
			release();
		}
	}
};
function parseParams(schema, paramsJSON) {
	let value;
	try {
		value = JSON.parse(paramsJSON ?? "{}");
	} catch {
		throw new Error("COMPUTER_INVALID_REQUEST: params must be valid JSON");
	}
	const parsed = schema.safeParse(value);
	if (!parsed.success) throw new Error(`COMPUTER_INVALID_REQUEST: ${parsed.error.issues[0]?.message ?? "invalid params"}`);
	return parsed.data;
}
function assertPrimaryDisplay(screenIndex) {
	if (screenIndex !== void 0 && screenIndex !== 0) throw new Error("COMPUTER_UNSUPPORTED_DISPLAY: cua-driver controls only the primary display (screenIndex 0)");
}
function assertToolSuccess(result, tool) {
	if (result.isError) {
		const code = result.errorCode ? `COMPUTER_REFUSED_${result.errorCode}` : "COMPUTER_DRIVER_ERROR";
		throw new Error(`${code}: ${result.text || `${tool} failed`}`);
	}
	return result;
}
function structuredContent(result, tool) {
	assertToolSuccess(result, tool);
	if (!result.structuredJson) throw new Error(`COMPUTER_DRIVER_ERROR: ${tool} returned no structuredContent`);
	try {
		const value = JSON.parse(result.structuredJson);
		if (value && typeof value === "object" && !Array.isArray(value)) return value;
	} catch {}
	throw new Error(`COMPUTER_DRIVER_ERROR: ${tool} returned invalid structuredContent`);
}
function desktopGeometry(result) {
	const parsed = DesktopStateSchema.safeParse(structuredContent(result, "get_desktop_state"));
	if (!parsed.success) throw new Error("COMPUTER_DRIVER_ERROR: invalid get_desktop_state geometry");
	return {
		platform: parsed.data.platform,
		display: parsed.data.display,
		screenWidth: parsed.data.screen_width,
		screenHeight: parsed.data.screen_height,
		scaleFactor: parsed.data.scale_factor,
		screenshotWidth: parsed.data.screenshot_width,
		screenshotHeight: parsed.data.screenshot_height
	};
}
function desktopPng(result) {
	const image = result.images.find((entry) => entry.mimeType === "image/png");
	if (!image) throw new Error("COMPUTER_DRIVER_ERROR: get_desktop_state returned no PNG image");
	const canonicalPng = canonicalizeBase64(image.dataBase64);
	if (!canonicalPng) throw new Error("COMPUTER_DRIVER_ERROR: get_desktop_state returned malformed PNG base64");
	return Buffer.from(canonicalPng, "base64");
}
function screenSize(result) {
	const parsed = ScreenSizeSchema.safeParse(structuredContent(result, "get_screen_size"));
	if (!parsed.success) throw new Error("COMPUTER_DRIVER_ERROR: invalid get_screen_size geometry");
	return {
		width: parsed.data.width,
		height: parsed.data.height,
		scaleFactor: parsed.data.scale_factor
	};
}
function resolveImageCommand(command, env) {
	const names = process.platform === "win32" && !path.extname(command) ? [
		command,
		`${command}.exe`,
		`${command}.cmd`
	] : [command];
	for (const entry of (env.PATH ?? "").split(path.delimiter).filter(Boolean)) for (const name of names) {
		const candidate = path.resolve(entry, name);
		try {
			fs.accessSync(candidate, fs.constants.X_OK);
			return candidate;
		} catch {}
	}
	return null;
}
function createImageProcessor(env) {
	return createRastermill({
		execution: "auto",
		limits: {
			inputPixels: MAX_IMAGE_PIXELS,
			outputPixels: MAX_IMAGE_PIXELS
		},
		temp: {
			rootDir: resolvePreferredOpenClawTmpDir(),
			prefix: "openclaw-cua-computer-"
		},
		commandResolver: (command) => resolveImageCommand(command, env)
	});
}
function clickArgs(frame, params, button, count) {
	const point = scalePoint(frame, params.x, params.y, params.action);
	if (normalizeModifiers(params.modifiers).length > 0) throw new Error("COMPUTER_UNSUPPORTED_ACTION: modifier-held clicks are unsupported by cua-driver on Linux");
	return {
		...point,
		button,
		count
	};
}
async function currentFrame(driver, frameState, params, signal) {
	const current = screenSize(await driver.getScreenSize(signal));
	if (driver.generation !== frameState.generation) {
		frameState.lastFrame = void 0;
		throw new Error("COMPUTER_STALE_FRAME: the computer driver reconnected; take a new screenshot");
	}
	const frame = verifyFrame(frameState, params.displayFrameId, current);
	verifyReferenceWidth(frameState, frame, params.refWidth);
	return frame;
}
async function handleAct(driver, frameState, params, signal) {
	assertPrimaryDisplay(params.screenIndex);
	if (params.action === "hold_key" || params.action === "left_mouse_down" || params.action === "left_mouse_up") throw new Error(`COMPUTER_UNSUPPORTED_ACTION: ${params.action}`);
	switch (params.action) {
		case "type":
			if (!params.text) throw new Error("COMPUTER_INVALID_REQUEST: text is required for type");
			assertToolSuccess(await driver.typeText(params.text, signal), "type_text");
			break;
		case "key": {
			const chord = parseKeyChord(params.keys);
			assertToolSuccess(await driver.pressKey({
				key: chord.key,
				modifiers: chord.modifiers
			}, signal), "press_key");
			break;
		}
		case "scroll": {
			if (!params.scrollDirection) throw new Error("COMPUTER_INVALID_REQUEST: scrollDirection is required for scroll");
			if (normalizeModifiers(params.modifiers).length > 0) throw new Error("COMPUTER_UNSUPPORTED_ACTION: modifier-held scroll is unsupported by cua-driver");
			const point = scalePoint(await currentFrame(driver, frameState, params, signal), params.x, params.y, params.action);
			const direction = {
				up: ScrollDirection.Up,
				down: ScrollDirection.Down,
				left: ScrollDirection.Left,
				right: ScrollDirection.Right
			}[params.scrollDirection];
			assertToolSuccess(await driver.scroll({
				direction,
				amount: BigInt(Math.min(50, params.scrollAmount ?? 3)),
				...point
			}, signal), "scroll");
			break;
		}
		default: {
			const frame = await currentFrame(driver, frameState, params, signal);
			switch (params.action) {
				case "left_click":
					assertToolSuccess(await driver.click(clickArgs(frame, params, ClickButton.Left, 1), signal), "click");
					break;
				case "right_click":
					assertToolSuccess(await driver.click(clickArgs(frame, params, ClickButton.Right, 1), signal), "click");
					break;
				case "middle_click":
					assertToolSuccess(await driver.click(clickArgs(frame, params, ClickButton.Middle, 1), signal), "click");
					break;
				case "double_click":
					assertToolSuccess(await driver.click(clickArgs(frame, params, ClickButton.Left, 2), signal), "click");
					break;
				case "triple_click":
					assertToolSuccess(await driver.click(clickArgs(frame, params, ClickButton.Left, 3), signal), "click");
					break;
				case "mouse_move": {
					const point = scalePoint(frame, params.x, params.y, params.action);
					assertToolSuccess(await driver.moveCursor(point, signal), "move_cursor");
					break;
				}
				case "left_click_drag": {
					const from = scalePoint(frame, params.fromX, params.fromY, "drag start");
					const to = scalePoint(frame, params.x, params.y, "drag end");
					if (normalizeModifiers(params.modifiers).length > 0) throw new Error("COMPUTER_UNSUPPORTED_ACTION: modifier-held drag is unsupported by cua-driver");
					assertToolSuccess(await driver.drag({
						fromX: from.x,
						fromY: from.y,
						toX: to.x,
						toY: to.y,
						...params.durationMs === void 0 ? {} : { durationMs: BigInt(Math.min(1e4, params.durationMs)) }
					}, signal), "drag");
					break;
				}
				default: throw new Error("COMPUTER_UNSUPPORTED_ACTION: unknown action");
			}
		}
	}
	return JSON.stringify({ ok: true });
}
function createCuaComputerCommands(options = {}) {
	const platform = options.platform ?? process.platform;
	const env = options.env ?? process.env;
	let ownedDriver;
	let stopped = false;
	const driver = () => {
		if (stopped) throw new Error("COMPUTER_DRIVER_UNAVAILABLE: cua-computer is stopping");
		return options.driver ?? (ownedDriver ??= (options.createDriver ?? createCuaDriver)());
	};
	const disposeOwnedDriver = async () => {
		stopped = true;
		const current = ownedDriver;
		ownedDriver = void 0;
		await current?.dispose();
	};
	const imageProcessor = options.imageProcessor ?? createImageProcessor(env);
	const queue = new PromiseQueue();
	const frameState = { generation: "uninitialized" };
	const interval = options.setInterval ?? setInterval;
	const clear = options.clearInterval ?? clearInterval;
	const isSupportedPlatform = platform === "linux" || platform === "win32";
	const isAvailable = () => isSupportedPlatform && driver().isAvailable();
	return [{
		command: "screen.snapshot",
		cap: "screen",
		dangerous: false,
		isAvailable,
		watchAvailability: (_context, onChange) => {
			let knownAvailable = isAvailable();
			const timer = interval(() => {
				driver().resetAvailabilityCache();
				const available = isAvailable();
				if (available !== knownAvailable) {
					knownAvailable = available;
					onChange();
				}
			}, AVAILABILITY_POLL_MS);
			timer.unref?.();
			return () => {
				clear(timer);
				disposeOwnedDriver();
			};
		},
		handle: async (paramsJSON, _io, context) => await queue.run(async () => {
			if (!isSupportedPlatform) throw new Error("COMPUTER_DRIVER_UNAVAILABLE: cua-computer supports Windows and Linux");
			const params = parseParams(SnapshotParamsSchema, paramsJSON);
			assertPrimaryDisplay(params.screenIndex);
			const format = params.format ?? "jpeg";
			const maxWidth = params.maxWidth ?? (format === "png" ? 900 : 1600);
			const quality = Math.min(1, Math.max(.05, params.quality ?? .72));
			const desktop = await driver().getDesktopState(context?.signal);
			const geometry = desktopGeometry(desktop);
			if (geometry.screenWidth !== geometry.screenshotWidth || geometry.screenHeight !== geometry.screenshotHeight) throw new Error("COMPUTER_UNSUPPORTED_DISPLAY: cua-driver reported capture and screen geometry in different pixel spaces");
			const nativePng = desktopPng(desktop);
			let encoded = nativePng;
			let width = geometry.screenshotWidth;
			let height = geometry.screenshotHeight;
			if (format === "jpeg" || width > maxWidth) {
				const result = await imageProcessor.encode(nativePng, {
					format,
					...format === "jpeg" ? { quality: Math.round(quality * 100) } : {},
					...width > maxWidth ? { resize: {
						width: maxWidth,
						enlarge: false
					} } : {}
				});
				encoded = result.data;
				width = result.width;
				height = result.height;
			}
			frameState.generation = driver().generation;
			const displayFrameId = issueFrame(frameState, geometry, {
				width,
				height
			});
			return JSON.stringify({
				format,
				base64: encoded.toString("base64"),
				displayFrameId,
				screenIndex: 0,
				width,
				height
			});
		})
	}, {
		command: "computer.act",
		cap: "computer",
		dangerous: true,
		isAvailable,
		handle: async (paramsJSON, _io, context) => await queue.run(async () => {
			if (!isSupportedPlatform) throw new Error("COMPUTER_DRIVER_UNAVAILABLE: cua-computer supports Windows and Linux");
			return await handleAct(driver(), frameState, parseParams(ComputerActParamsSchema, paramsJSON), context?.signal);
		})
	}];
}
//#endregion
//#region extensions/cua-computer/index.ts
const CuaComputerConfigSchema = strictObject({});
var cua_computer_default = definePluginEntry({
	id: "cua-computer",
	name: "CUA Computer",
	description: "Experimental CUA Driver SDK computer control for Windows and Linux node hosts.",
	configSchema: buildPluginConfigSchema(CuaComputerConfigSchema, { uiHints: {} }),
	register(api) {
		const parsed = CuaComputerConfigSchema.safeParse(api.pluginConfig ?? {});
		if (!parsed.success) throw new Error(`Invalid cua-computer plugin config: ${parsed.error.issues[0]?.message ?? "invalid config"}`);
		for (const command of createCuaComputerCommands()) api.registerNodeHostCommand(command);
	}
});
//#endregion
export { cua_computer_default as default };
