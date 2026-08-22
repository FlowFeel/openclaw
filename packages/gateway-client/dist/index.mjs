import { C as buildDeviceAuthPayload, S as shouldRetryGatewayWithDeviceToken, T as normalizeDeviceMetadataForAuth, _ as GatewayProtocolRequestError, a as createSessionProjection, b as resolveGatewayConnectScopes, c as normalizeSessionProjectionRunId, d as readSessionMessageSequence, f as reconcileSessionProjectionSnapshot, g as GatewayProtocolClient, h as shouldPauseGatewayReconnect, i as resetGatewaySessionMessageSubscriptionCoordinator, l as projectLiveSessionMessage, m as reduceSessionProjectionRunEvent, n as getGatewaySessionMessageSubscriptionCoordinator, o as hasSessionProjectionAcceptedFinal, p as reduceSessionProjection, r as releaseGatewaySessionMessageSubscription, s as isLocallyOptimisticSessionMessage, t as GatewaySessionMessageSubscriptionCoordinator, u as readSessionMessageIdentity, v as GatewayBrowserDeviceAuthLifecycle, w as buildDeviceAuthPayloadV3, x as selectGatewayConnectAuth, y as buildGatewayConnectAuth } from "./session-subscriptions-D4Xv60cN.mjs";
import { DEFAULT_GATEWAY_REQUEST_TIMEOUT_MS, DEFAULT_PREAUTH_HANDSHAKE_TIMEOUT_MS, MAX_CONNECT_CHALLENGE_TIMEOUT_MS, MAX_SAFE_TIMEOUT_DELAY_MS, MIN_CONNECT_CHALLENGE_TIMEOUT_MS, addSafeTimeoutDelayGraceMs, clampConnectChallengeTimeoutMs, clearGatewayConnectTimeout, getConnectChallengeTimeoutMsFromEnv, resolveConnectChallengeTimeoutMs, resolveFiniteTimeoutDelayMs, resolvePreauthHandshakeTimeoutMs, resolveSafeTimeoutDelayMs, startGatewayConnectTimeout } from "./timeouts.mjs";
import { n as startGatewayClientWithReadinessWait, r as waitForEventLoopReady, t as startGatewayClientWhenEventLoopReady } from "./readiness-CrWxd4TI.mjs";
import { ConnectErrorDetailCodes, formatConnectErrorMessage, readConnectErrorDetailCode } from "@openclaw/gateway-protocol/connect-error-details";
import { GATEWAY_CLIENT_MODES, GATEWAY_CLIENT_NAMES } from "@openclaw/gateway-protocol/client-info";
import { resolveGatewayStartupRetryAfterMs } from "@openclaw/gateway-protocol/startup-unavailable";
import { MIN_CLIENT_PROTOCOL_VERSION, PROTOCOL_VERSION } from "@openclaw/gateway-protocol/version";
import { randomUUID } from "node:crypto";
import { WebSocket } from "ws";
import { Buffer as Buffer$1 } from "node:buffer";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region packages/net-policy/src/ip.ts
var import_ipaddr = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root) {
		"use strict";
		const ipv4Part = "(0?\\d+|0x[a-f0-9]+)";
		const ipv4Regexes = {
			fourOctet: new RegExp(`^${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}$`, "i"),
			threeOctet: new RegExp(`^${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}$`, "i"),
			twoOctet: new RegExp(`^${ipv4Part}\\.${ipv4Part}$`, "i"),
			longValue: new RegExp(`^${ipv4Part}$`, "i")
		};
		const octalRegex = new RegExp(`^0[0-7]+$`, "i");
		const hexRegex = new RegExp(`^0x[a-f0-9]+$`, "i");
		const zoneIndex = "%[0-9a-z]{1,}";
		const ipv6Part = "(?:[0-9a-f]+::?)+";
		const ipv6Regexes = {
			zoneIndex: new RegExp(zoneIndex, "i"),
			"native": new RegExp(`^(::)?(${ipv6Part})?([0-9a-f]+)?(::)?(${zoneIndex})?$`, "i"),
			deprecatedTransitional: new RegExp(`^(?:::)(${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}(${zoneIndex})?)$`, "i"),
			transitional: new RegExp(`^((?:${ipv6Part})|(?:::)(?:${ipv6Part})?)${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}(${zoneIndex})?$`, "i")
		};
		function expandIPv6(string, parts) {
			if (string.indexOf("::") !== string.lastIndexOf("::")) return null;
			let colonCount = 0;
			let lastColon = -1;
			let zoneId = (string.match(ipv6Regexes.zoneIndex) || [])[0];
			let replacement, replacementCount;
			if (zoneId) {
				zoneId = zoneId.substring(1);
				string = string.replace(/%.+$/, "");
			}
			while ((lastColon = string.indexOf(":", lastColon + 1)) >= 0) colonCount++;
			if (string.substr(0, 2) === "::") colonCount--;
			if (string.substr(-2, 2) === "::") colonCount--;
			if (colonCount > parts) return null;
			replacementCount = parts - colonCount;
			replacement = ":";
			while (replacementCount--) replacement += "0:";
			string = string.replace("::", replacement);
			if (string[0] === ":") string = string.slice(1);
			if (string[string.length - 1] === ":") string = string.slice(0, -1);
			parts = (function() {
				const ref = string.split(":");
				const results = [];
				for (let i = 0; i < ref.length; i++) results.push(parseInt(ref[i], 16));
				return results;
			})();
			return {
				parts,
				zoneId
			};
		}
		function matchCIDR(first, second, partSize, cidrBits) {
			if (first.length !== second.length) throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
			let part = 0;
			let shift;
			while (cidrBits > 0) {
				shift = partSize - cidrBits;
				if (shift < 0) shift = 0;
				if (first[part] >> shift !== second[part] >> shift) return false;
				cidrBits -= partSize;
				part += 1;
			}
			return true;
		}
		function parseIntAuto(string) {
			if (hexRegex.test(string)) return parseInt(string, 16);
			if (string[0] === "0" && !isNaN(parseInt(string[1], 10))) {
				if (octalRegex.test(string)) return parseInt(string, 8);
				throw new Error(`ipaddr: cannot parse ${string} as octal`);
			}
			return parseInt(string, 10);
		}
		function padPart(part, length) {
			while (part.length < length) part = `0${part}`;
			return part;
		}
		const ipaddr = {};
		ipaddr.IPv4 = (function() {
			function IPv4(octets) {
				if (octets.length !== 4) throw new Error("ipaddr: ipv4 octet count should be 4");
				let i, octet;
				for (i = 0; i < octets.length; i++) {
					octet = octets[i];
					if (!(0 <= octet && octet <= 255)) throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
				}
				this.octets = octets;
			}
			IPv4.prototype.SpecialRanges = {
				unspecified: [[new IPv4([
					0,
					0,
					0,
					0
				]), 8]],
				broadcast: [[new IPv4([
					255,
					255,
					255,
					255
				]), 32]],
				multicast: [[new IPv4([
					224,
					0,
					0,
					0
				]), 4]],
				linkLocal: [[new IPv4([
					169,
					254,
					0,
					0
				]), 16]],
				loopback: [[new IPv4([
					127,
					0,
					0,
					0
				]), 8]],
				carrierGradeNat: [[new IPv4([
					100,
					64,
					0,
					0
				]), 10]],
				"private": [
					[new IPv4([
						10,
						0,
						0,
						0
					]), 8],
					[new IPv4([
						172,
						16,
						0,
						0
					]), 12],
					[new IPv4([
						192,
						168,
						0,
						0
					]), 16]
				],
				reserved: [
					[new IPv4([
						192,
						0,
						0,
						0
					]), 24],
					[new IPv4([
						192,
						0,
						2,
						0
					]), 24],
					[new IPv4([
						192,
						88,
						99,
						0
					]), 24],
					[new IPv4([
						198,
						18,
						0,
						0
					]), 15],
					[new IPv4([
						198,
						51,
						100,
						0
					]), 24],
					[new IPv4([
						203,
						0,
						113,
						0
					]), 24],
					[new IPv4([
						240,
						0,
						0,
						0
					]), 4]
				],
				as112: [[new IPv4([
					192,
					175,
					48,
					0
				]), 24], [new IPv4([
					192,
					31,
					196,
					0
				]), 24]],
				amt: [[new IPv4([
					192,
					52,
					193,
					0
				]), 24]]
			};
			IPv4.prototype.kind = function() {
				return "ipv4";
			};
			IPv4.prototype.match = function(other, cidrRange) {
				let ref;
				if (cidrRange === void 0) {
					ref = other;
					other = ref[0];
					cidrRange = ref[1];
				}
				if (other.kind() !== "ipv4") throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
				return matchCIDR(this.octets, other.octets, 8, cidrRange);
			};
			IPv4.prototype.prefixLengthFromSubnetMask = function() {
				let cidr = 0;
				let stop = false;
				const zerotable = {
					0: 8,
					128: 7,
					192: 6,
					224: 5,
					240: 4,
					248: 3,
					252: 2,
					254: 1,
					255: 0
				};
				let i, octet, zeros;
				for (i = 3; i >= 0; i -= 1) {
					octet = this.octets[i];
					if (octet in zerotable) {
						zeros = zerotable[octet];
						if (stop && zeros !== 0) return null;
						if (zeros !== 8) stop = true;
						cidr += zeros;
					} else return null;
				}
				return 32 - cidr;
			};
			IPv4.prototype.range = function() {
				return ipaddr.subnetMatch(this, this.SpecialRanges);
			};
			IPv4.prototype.toByteArray = function() {
				return this.octets.slice(0);
			};
			IPv4.prototype.toIPv4MappedAddress = function() {
				return ipaddr.IPv6.parse(`::ffff:${this.toString()}`);
			};
			IPv4.prototype.toNormalizedString = function() {
				return this.toString();
			};
			IPv4.prototype.toString = function() {
				return this.octets.join(".");
			};
			return IPv4;
		})();
		ipaddr.IPv4.broadcastAddressFromCIDR = function(string) {
			try {
				const cidr = this.parseCIDR(string);
				const ipInterfaceOctets = cidr[0].toByteArray();
				const subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
				const octets = [];
				let i = 0;
				while (i < 4) {
					octets.push(parseInt(ipInterfaceOctets[i], 10) | parseInt(subnetMaskOctets[i], 10) ^ 255);
					i++;
				}
				return new this(octets);
			} catch (e) {
				throw new Error("ipaddr: the address does not have IPv4 CIDR format");
			}
		};
		ipaddr.IPv4.isIPv4 = function(string) {
			return this.parser(string) !== null;
		};
		ipaddr.IPv4.isValid = function(string) {
			try {
				new this(this.parser(string));
				return true;
			} catch (e) {
				return false;
			}
		};
		ipaddr.IPv4.isValidCIDR = function(string) {
			try {
				this.parseCIDR(string);
				return true;
			} catch (e) {
				return false;
			}
		};
		ipaddr.IPv4.isValidFourPartDecimal = function(string) {
			if (ipaddr.IPv4.isValid(string) && string.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/)) return true;
			else return false;
		};
		ipaddr.IPv4.isValidCIDRFourPartDecimal = function(string) {
			const match = string.match(/^(.+)\/(\d+)$/);
			if (!ipaddr.IPv4.isValidCIDR(string) || !match) return false;
			return ipaddr.IPv4.isValidFourPartDecimal(match[1]);
		};
		ipaddr.IPv4.networkAddressFromCIDR = function(string) {
			let cidr, i, ipInterfaceOctets, octets, subnetMaskOctets;
			try {
				cidr = this.parseCIDR(string);
				ipInterfaceOctets = cidr[0].toByteArray();
				subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
				octets = [];
				i = 0;
				while (i < 4) {
					octets.push(parseInt(ipInterfaceOctets[i], 10) & parseInt(subnetMaskOctets[i], 10));
					i++;
				}
				return new this(octets);
			} catch (e) {
				throw new Error("ipaddr: the address does not have IPv4 CIDR format");
			}
		};
		ipaddr.IPv4.parse = function(string) {
			const parts = this.parser(string);
			if (parts === null) throw new Error("ipaddr: string is not formatted like an IPv4 Address");
			return new this(parts);
		};
		ipaddr.IPv4.parseCIDR = function(string) {
			let match;
			if (match = string.match(/^(.+)\/(\d+)$/)) {
				const maskLength = parseInt(match[2]);
				if (maskLength >= 0 && maskLength <= 32) {
					const parsed = [this.parse(match[1]), maskLength];
					Object.defineProperty(parsed, "toString", { value: function() {
						return this.join("/");
					} });
					return parsed;
				}
			}
			throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
		};
		ipaddr.IPv4.parser = function(string) {
			let match, part, value;
			if (match = string.match(ipv4Regexes.fourOctet)) return (function() {
				const ref = match.slice(1, 6);
				const results = [];
				for (let i = 0; i < ref.length; i++) {
					part = ref[i];
					results.push(parseIntAuto(part));
				}
				return results;
			})();
			else if (match = string.match(ipv4Regexes.longValue)) {
				value = parseIntAuto(match[1]);
				if (value > 4294967295 || value < 0) throw new Error("ipaddr: address outside defined range");
				return (function() {
					const results = [];
					let shift;
					for (shift = 0; shift <= 24; shift += 8) results.push(value >> shift & 255);
					return results;
				})().reverse();
			} else if (match = string.match(ipv4Regexes.twoOctet)) return (function() {
				const ref = match.slice(1, 4);
				const results = [];
				value = parseIntAuto(ref[1]);
				if (value > 16777215 || value < 0) throw new Error("ipaddr: address outside defined range");
				results.push(parseIntAuto(ref[0]));
				results.push(value >> 16 & 255);
				results.push(value >> 8 & 255);
				results.push(value & 255);
				return results;
			})();
			else if (match = string.match(ipv4Regexes.threeOctet)) return (function() {
				const ref = match.slice(1, 5);
				const results = [];
				value = parseIntAuto(ref[2]);
				if (value > 65535 || value < 0) throw new Error("ipaddr: address outside defined range");
				results.push(parseIntAuto(ref[0]));
				results.push(parseIntAuto(ref[1]));
				results.push(value >> 8 & 255);
				results.push(value & 255);
				return results;
			})();
			else return null;
		};
		ipaddr.IPv4.subnetMaskFromPrefixLength = function(prefix) {
			prefix = parseInt(prefix);
			if (prefix < 0 || prefix > 32) throw new Error("ipaddr: invalid IPv4 prefix length");
			const octets = [
				0,
				0,
				0,
				0
			];
			let j = 0;
			const filledOctetCount = Math.floor(prefix / 8);
			while (j < filledOctetCount) {
				octets[j] = 255;
				j++;
			}
			if (filledOctetCount < 4) octets[filledOctetCount] = Math.pow(2, prefix % 8) - 1 << 8 - prefix % 8;
			return new this(octets);
		};
		ipaddr.IPv6 = (function() {
			function IPv6(parts, zoneId) {
				let i, part;
				if (parts.length === 16) {
					this.parts = [];
					for (i = 0; i <= 14; i += 2) this.parts.push(parts[i] << 8 | parts[i + 1]);
				} else if (parts.length === 8) this.parts = parts;
				else throw new Error("ipaddr: ipv6 part count should be 8 or 16");
				for (i = 0; i < this.parts.length; i++) {
					part = this.parts[i];
					if (!(0 <= part && part <= 65535)) throw new Error("ipaddr: ipv6 part should fit in 16 bits");
				}
				if (zoneId) this.zoneId = zoneId;
			}
			IPv6.prototype.SpecialRanges = {
				unspecified: [new IPv6([
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 128],
				linkLocal: [new IPv6([
					65152,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 10],
				multicast: [new IPv6([
					65280,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 8],
				loopback: [new IPv6([
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				]), 128],
				uniqueLocal: [new IPv6([
					64512,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 7],
				ipv4Mapped: [new IPv6([
					0,
					0,
					0,
					0,
					0,
					65535,
					0,
					0
				]), 96],
				deprecatedSiteLocal: [new IPv6([
					65216,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 10],
				discard: [new IPv6([
					256,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 64],
				rfc6145: [new IPv6([
					0,
					0,
					0,
					0,
					65535,
					0,
					0,
					0
				]), 96],
				rfc6052: [[new IPv6([
					100,
					65435,
					0,
					0,
					0,
					0,
					0,
					0
				]), 96], [new IPv6([
					100,
					65435,
					1,
					0,
					0,
					0,
					0,
					0
				]), 48]],
				"6to4": [new IPv6([
					8194,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 16],
				teredo: [new IPv6([
					8193,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 32],
				benchmarking: [new IPv6([
					8193,
					2,
					0,
					0,
					0,
					0,
					0,
					0
				]), 48],
				amt: [new IPv6([
					8193,
					3,
					0,
					0,
					0,
					0,
					0,
					0
				]), 32],
				as112v6: [[new IPv6([
					8193,
					4,
					274,
					0,
					0,
					0,
					0,
					0
				]), 48], [new IPv6([
					9760,
					79,
					32768,
					0,
					0,
					0,
					0,
					0
				]), 48]],
				deprecatedOrchid: [new IPv6([
					8193,
					16,
					0,
					0,
					0,
					0,
					0,
					0
				]), 28],
				orchid2: [new IPv6([
					8193,
					32,
					0,
					0,
					0,
					0,
					0,
					0
				]), 28],
				droneRemoteIdProtocolEntityTags: [new IPv6([
					8193,
					48,
					0,
					0,
					0,
					0,
					0,
					0
				]), 28],
				segmentRouting: [new IPv6([
					24320,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 16],
				reserved: [
					[new IPv6([
						8193,
						0,
						0,
						0,
						0,
						0,
						0,
						0
					]), 23],
					[new IPv6([
						8193,
						3512,
						0,
						0,
						0,
						0,
						0,
						0
					]), 32],
					[new IPv6([
						16383,
						0,
						0,
						0,
						0,
						0,
						0,
						0
					]), 20]
				]
			};
			IPv6.prototype.isIPv4MappedAddress = function() {
				return this.range() === "ipv4Mapped";
			};
			IPv6.prototype.kind = function() {
				return "ipv6";
			};
			IPv6.prototype.match = function(other, cidrRange) {
				let ref;
				if (cidrRange === void 0) {
					ref = other;
					other = ref[0];
					cidrRange = ref[1];
				}
				if (other.kind() !== "ipv6") throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
				return matchCIDR(this.parts, other.parts, 16, cidrRange);
			};
			IPv6.prototype.prefixLengthFromSubnetMask = function() {
				let cidr = 0;
				let stop = false;
				const zerotable = {
					0: 16,
					32768: 15,
					49152: 14,
					57344: 13,
					61440: 12,
					63488: 11,
					64512: 10,
					65024: 9,
					65280: 8,
					65408: 7,
					65472: 6,
					65504: 5,
					65520: 4,
					65528: 3,
					65532: 2,
					65534: 1,
					65535: 0
				};
				let part, zeros;
				for (let i = 7; i >= 0; i -= 1) {
					part = this.parts[i];
					if (part in zerotable) {
						zeros = zerotable[part];
						if (stop && zeros !== 0) return null;
						if (zeros !== 16) stop = true;
						cidr += zeros;
					} else return null;
				}
				return 128 - cidr;
			};
			IPv6.prototype.range = function() {
				return ipaddr.subnetMatch(this, this.SpecialRanges);
			};
			IPv6.prototype.toByteArray = function() {
				let part;
				const bytes = [];
				const ref = this.parts;
				for (let i = 0; i < ref.length; i++) {
					part = ref[i];
					bytes.push(part >> 8);
					bytes.push(part & 255);
				}
				return bytes;
			};
			IPv6.prototype.toFixedLengthString = function() {
				const addr = (function() {
					const results = [];
					for (let i = 0; i < this.parts.length; i++) results.push(padPart(this.parts[i].toString(16), 4));
					return results;
				}).call(this).join(":");
				let suffix = "";
				if (this.zoneId) suffix = `%${this.zoneId}`;
				return addr + suffix;
			};
			IPv6.prototype.toIPv4Address = function() {
				if (!this.isIPv4MappedAddress()) throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
				const ref = this.parts.slice(-2);
				const high = ref[0];
				const low = ref[1];
				return new ipaddr.IPv4([
					high >> 8,
					high & 255,
					low >> 8,
					low & 255
				]);
			};
			IPv6.prototype.toNormalizedString = function() {
				const addr = (function() {
					const results = [];
					for (let i = 0; i < this.parts.length; i++) results.push(this.parts[i].toString(16));
					return results;
				}).call(this).join(":");
				let suffix = "";
				if (this.zoneId) suffix = `%${this.zoneId}`;
				return addr + suffix;
			};
			IPv6.prototype.toRFC5952String = function() {
				const regex = /((^|:)(0(:|$)){2,})/g;
				const string = this.toNormalizedString();
				let bestMatchIndex = 0;
				let bestMatchLength = -1;
				let match;
				while (match = regex.exec(string)) if (match[0].length > bestMatchLength) {
					bestMatchIndex = match.index;
					bestMatchLength = match[0].length;
				}
				if (bestMatchLength < 0) return string;
				return `${string.substring(0, bestMatchIndex)}::${string.substring(bestMatchIndex + bestMatchLength)}`;
			};
			IPv6.prototype.toString = function() {
				return this.toRFC5952String();
			};
			return IPv6;
		})();
		ipaddr.IPv6.broadcastAddressFromCIDR = function(string) {
			try {
				const cidr = this.parseCIDR(string);
				const ipInterfaceOctets = cidr[0].toByteArray();
				const subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
				const octets = [];
				let i = 0;
				while (i < 16) {
					octets.push(parseInt(ipInterfaceOctets[i], 10) | parseInt(subnetMaskOctets[i], 10) ^ 255);
					i++;
				}
				return new this(octets);
			} catch (e) {
				throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${e})`);
			}
		};
		ipaddr.IPv6.isIPv6 = function(string) {
			return this.parser(string) !== null;
		};
		ipaddr.IPv6.isValid = function(string) {
			if (typeof string === "string" && string.indexOf(":") === -1) return false;
			try {
				const addr = this.parser(string);
				new this(addr.parts, addr.zoneId);
				return true;
			} catch (e) {
				return false;
			}
		};
		ipaddr.IPv6.isValidCIDR = function(string) {
			if (typeof string === "string" && string.indexOf(":") === -1) return false;
			try {
				this.parseCIDR(string);
				return true;
			} catch (e) {
				return false;
			}
		};
		ipaddr.IPv6.networkAddressFromCIDR = function(string) {
			let cidr, i, ipInterfaceOctets, octets, subnetMaskOctets;
			try {
				cidr = this.parseCIDR(string);
				ipInterfaceOctets = cidr[0].toByteArray();
				subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
				octets = [];
				i = 0;
				while (i < 16) {
					octets.push(parseInt(ipInterfaceOctets[i], 10) & parseInt(subnetMaskOctets[i], 10));
					i++;
				}
				return new this(octets);
			} catch (e) {
				throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${e})`);
			}
		};
		ipaddr.IPv6.parse = function(string) {
			const addr = this.parser(string);
			if (addr.parts === null) throw new Error("ipaddr: string is not formatted like an IPv6 Address");
			return new this(addr.parts, addr.zoneId);
		};
		ipaddr.IPv6.parseCIDR = function(string) {
			let maskLength, match, parsed;
			if (match = string.match(/^(.+)\/(\d+)$/)) {
				maskLength = parseInt(match[2]);
				if (maskLength >= 0 && maskLength <= 128) {
					parsed = [this.parse(match[1]), maskLength];
					Object.defineProperty(parsed, "toString", { value: function() {
						return this.join("/");
					} });
					return parsed;
				}
			}
			throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
		};
		ipaddr.IPv6.parser = function(string) {
			let addr, i, match, octet, octets, zoneId;
			if (match = string.match(ipv6Regexes.deprecatedTransitional)) return this.parser(`::ffff:${match[1]}`);
			if (ipv6Regexes.native.test(string)) return expandIPv6(string, 8);
			if (match = string.match(ipv6Regexes.transitional)) {
				zoneId = match[6] || "";
				addr = match[1];
				if (!match[1].endsWith("::")) addr = addr.slice(0, -1);
				addr = expandIPv6(addr + zoneId, 6);
				if (addr.parts) {
					octets = [
						parseInt(match[2]),
						parseInt(match[3]),
						parseInt(match[4]),
						parseInt(match[5])
					];
					for (i = 0; i < octets.length; i++) {
						octet = octets[i];
						if (!(0 <= octet && octet <= 255)) return null;
					}
					addr.parts.push(octets[0] << 8 | octets[1]);
					addr.parts.push(octets[2] << 8 | octets[3]);
					return {
						parts: addr.parts,
						zoneId: addr.zoneId
					};
				}
			}
			return null;
		};
		ipaddr.IPv6.subnetMaskFromPrefixLength = function(prefix) {
			prefix = parseInt(prefix);
			if (prefix < 0 || prefix > 128) throw new Error("ipaddr: invalid IPv6 prefix length");
			const octets = [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
			let j = 0;
			const filledOctetCount = Math.floor(prefix / 8);
			while (j < filledOctetCount) {
				octets[j] = 255;
				j++;
			}
			if (filledOctetCount < 16) octets[filledOctetCount] = Math.pow(2, prefix % 8) - 1 << 8 - prefix % 8;
			return new this(octets);
		};
		ipaddr.fromByteArray = function(bytes) {
			const length = bytes.length;
			if (length === 4) return new ipaddr.IPv4(bytes);
			else if (length === 16) return new ipaddr.IPv6(bytes);
			else throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
		};
		ipaddr.isValid = function(string) {
			return ipaddr.IPv6.isValid(string) || ipaddr.IPv4.isValid(string);
		};
		ipaddr.isValidCIDR = function(string) {
			return ipaddr.IPv6.isValidCIDR(string) || ipaddr.IPv4.isValidCIDR(string);
		};
		ipaddr.parse = function(string) {
			if (ipaddr.IPv6.isValid(string)) return ipaddr.IPv6.parse(string);
			else if (ipaddr.IPv4.isValid(string)) return ipaddr.IPv4.parse(string);
			else throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
		};
		ipaddr.parseCIDR = function(string) {
			try {
				return ipaddr.IPv6.parseCIDR(string);
			} catch (e) {
				try {
					return ipaddr.IPv4.parseCIDR(string);
				} catch (e2) {
					throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
				}
			}
		};
		ipaddr.process = function(string) {
			const addr = this.parse(string);
			if (addr.kind() === "ipv6" && addr.isIPv4MappedAddress()) return addr.toIPv4Address();
			else return addr;
		};
		ipaddr.subnetMatch = function(address, rangeList, defaultName) {
			let i, rangeName, rangeSubnets, subnet;
			if (defaultName === void 0 || defaultName === null) defaultName = "unicast";
			for (rangeName in rangeList) if (Object.prototype.hasOwnProperty.call(rangeList, rangeName)) {
				rangeSubnets = rangeList[rangeName];
				if (rangeSubnets[0] && !(rangeSubnets[0] instanceof Array)) rangeSubnets = [rangeSubnets];
				for (i = 0; i < rangeSubnets.length; i++) {
					subnet = rangeSubnets[i];
					if (address.kind() === subnet[0].kind() && address.match.apply(address, subnet)) return rangeName;
				}
			}
			return defaultName;
		};
		if (typeof module !== "undefined" && module.exports) module.exports = ipaddr;
		else root.ipaddr = ipaddr;
	})(exports);
})))(), 1);
function normalizeOptionalString(value) {
	if (typeof value !== "string") return;
	return value.trim() || void 0;
}
function normalizeLowercaseStringOrEmpty$1(value) {
	return typeof value === "string" ? value.trim().toLowerCase() : "";
}
import_ipaddr.default.IPv4.parse("198.18.0.0");
function stripIpv6Brackets(value) {
	if (value.startsWith("[") && value.endsWith("]")) return value.slice(1, -1);
	return value;
}
/** Type guard for parsed IPv6 addresses. */
function isIpv6Address(address) {
	return address.kind() === "ipv6";
}
function normalizeIpv4MappedAddress(address) {
	if (!isIpv6Address(address)) return address;
	if (!address.isIPv4MappedAddress()) return address;
	return address.toIPv4Address();
}
function normalizeIpParseInput(raw) {
	const trimmed = normalizeOptionalString(raw);
	if (!trimmed) return;
	return stripIpv6Brackets(trimmed);
}
/** Parses canonical IPv4/IPv6 literals, rejecting legacy IPv4 shorthand forms. */
function parseCanonicalIpAddress(raw) {
	const normalized = normalizeIpParseInput(raw);
	if (!normalized) return;
	return import_ipaddr.default.IPv4.isValidFourPartDecimal(normalized) || import_ipaddr.default.IPv6.isValid(normalized) ? import_ipaddr.default.parse(normalized) : void 0;
}
/** Normalizes canonical IP literals and maps IPv4-mapped IPv6 addresses to IPv4 text. */
function normalizeIpAddress(raw) {
	const parsed = parseCanonicalIpAddress(raw);
	if (!parsed) return;
	return normalizeLowercaseStringOrEmpty$1(normalizeIpv4MappedAddress(parsed).toString());
}
/** True when a canonical IP literal is loopback, including IPv4-mapped IPv6. */
function isLoopbackIpAddress(raw) {
	const parsed = parseCanonicalIpAddress(raw);
	if (!parsed) return false;
	return normalizeIpv4MappedAddress(parsed).range() === "loopback";
}
//#endregion
//#region packages/gateway-client/src/client-address-utils.ts
function normalizeLowercaseStringOrEmpty(value) {
	return typeof value === "string" ? value.trim().toLowerCase() : "";
}
function isSensitiveUrlQueryParamName(key) {
	return /(?:token|password|secret|key|auth|credential)/iu.test(key);
}
function normalizeFingerprint(fingerprint) {
	return (fingerprint ?? "").replaceAll(":", "").trim().toLowerCase();
}
function parseHostForAddressChecks(host) {
	if (!host) return null;
	const normalizedHost = host.toLowerCase().trim();
	const canonicalHost = normalizedHost.replace(/\.+$/, "");
	if (canonicalHost === "localhost") return {
		isLocalhost: true,
		unbracketedHost: canonicalHost
	};
	return {
		isLocalhost: false,
		unbracketedHost: normalizedHost.startsWith("[") && normalizedHost.endsWith("]") ? normalizedHost.slice(1, -1) : normalizedHost
	};
}
function parseGatewayIpAddress(host) {
	const normalized = normalizeIpAddress(host);
	return normalized ? parseCanonicalIpAddress(normalized) : void 0;
}
//#endregion
//#region packages/gateway-client/src/websocket-data.ts
function rawDataToString(data) {
	if (Array.isArray(data)) return Buffer$1.concat(data).toString("utf8");
	return data instanceof ArrayBuffer ? Buffer$1.from(data).toString("utf8") : data.toString("utf8");
}
//#endregion
//#region packages/gateway-client/src/client.ts
const DEFAULT_HOST_DEPS = {
	loadOrCreateDeviceIdentity: () => void 0,
	signDevicePayload: () => {
		throw new Error("GatewayClient device signature dependency is not configured");
	},
	publicKeyRawBase64UrlFromPem: () => {
		throw new Error("GatewayClient public key dependency is not configured");
	},
	loadDeviceAuthToken: () => null,
	storeDeviceAuthToken: () => {},
	clearDeviceAuthToken: () => {},
	beforeConnect: () => {},
	registerGatewayLoopbackBypass: () => void 0,
	logDebug: () => {},
	logError: () => {},
	redactForLog: (message) => message,
	normalizeTlsFingerprint: normalizeFingerprint
};
function resolveHostDeps(overrides) {
	return Object.fromEntries(Object.entries(DEFAULT_HOST_DEPS).map(([key, fallback]) => [key, overrides?.[key] ?? fallback]));
}
const PRIVATE_OR_LOOPBACK_IPV4_RANGES = /* @__PURE__ */ new Set([
	"loopback",
	"private",
	"linkLocal",
	"carrierGradeNat"
]);
const PRIVATE_OR_LOOPBACK_IPV6_RANGES = /* @__PURE__ */ new Set([
	"loopback",
	"linkLocal",
	"uniqueLocal",
	"deprecatedSiteLocal"
]);
function isPrivateOrLoopbackIpAddress(address) {
	return (address.kind() === "ipv4" ? PRIVATE_OR_LOOPBACK_IPV4_RANGES : PRIVATE_OR_LOOPBACK_IPV6_RANGES).has(address.range());
}
function isLoopbackHost(host) {
	const parsed = parseHostForAddressChecks(host);
	if (!parsed) return false;
	if (parsed.isLocalhost) return true;
	return isLoopbackIpAddress(parsed.unbracketedHost);
}
function isPrivateOrLoopbackHost(host) {
	const parsed = parseHostForAddressChecks(host);
	if (!parsed) return false;
	if (parsed.isLocalhost) return true;
	const address = parseGatewayIpAddress(parsed.unbracketedHost);
	if (!address) return false;
	return isPrivateOrLoopbackIpAddress(address);
}
function isTrustedPlaintextWebSocketHost(hostname) {
	if (isPrivateOrLoopbackHost(hostname)) return true;
	const normalized = hostname.toLowerCase().trim().replace(/\.+$/, "");
	return normalized.endsWith(".local") || normalized.endsWith(".ts.net");
}
function isSecureWebSocketUrl(rawUrl, options) {
	try {
		const url = new URL(rawUrl);
		const protocol = url.protocol === "https:" ? "wss:" : url.protocol === "http:" ? "ws:" : url.protocol;
		if (protocol === "wss:") return true;
		if (protocol !== "ws:") return false;
		if (isLoopbackHost(url.hostname) || isTrustedPlaintextWebSocketHost(url.hostname)) return true;
		if (options?.allowPrivateWs === true) {
			const hostForIpCheck = url.hostname.startsWith("[") && url.hostname.endsWith("]") ? url.hostname.slice(1, -1) : url.hostname;
			return isPrivateOrLoopbackHost(url.hostname) || parseGatewayIpAddress(hostForIpCheck) === void 0;
		}
		return false;
	} catch {
		return false;
	}
}
const DEFAULT_GATEWAY_CLIENT_URL = "ws://127.0.0.1:18789";
const DEFAULT_CLIENT_VERSION = "0.0.0";
var GatewayClientRequestError = class extends GatewayProtocolRequestError {
	constructor(error) {
		super({
			...error,
			message: formatConnectErrorMessage({
				message: error.message,
				details: error.details
			})
		});
		this.name = "GatewayClientRequestError";
	}
};
var GatewayClientRequestTimeoutError = class extends Error {
	constructor(params) {
		super(`gateway request timeout for ${params.method}`);
		this.name = "GatewayClientRequestTimeoutError";
		this.method = params.method;
		this.timeoutMs = params.timeoutMs;
		this.requestSent = params.requestSent;
	}
};
var GatewayClientTransientPreHelloCloseError = class extends Error {
	constructor() {
		super("gateway transient pre-hello clean close");
		this.name = "GatewayClientTransientPreHelloCloseError";
	}
};
var GatewayClientSocketFactoryConfigurationError = class extends Error {};
var GatewayClientTransportPolicyError = class extends GatewayClientSocketFactoryConfigurationError {};
const GATEWAY_CONNECT_ASSEMBLY_ERROR = Symbol("gateway.connectAssemblyError");
function markGatewayConnectAssemblyError(error) {
	Object.defineProperty(error, GATEWAY_CONNECT_ASSEMBLY_ERROR, {
		configurable: true,
		value: true
	});
	return error;
}
function isGatewayConnectAssemblyError(value) {
	return value instanceof Error && value[GATEWAY_CONNECT_ASSEMBLY_ERROR] === true;
}
function isGatewayClientStoppedError(err) {
	const message = err instanceof Error ? err.message : String(err);
	return message === "gateway client stopped" || message === "Error: gateway client stopped";
}
function formatGatewayClientErrorForLog(err) {
	return String(err).replace(/\/\/([^@/?#\s]+)@/g, "//***:***@").replace(/(Authorization:\s*Bearer\s+)[^\s]+/giu, "$1***").replace(/([?&])([^=&\s]+)=([^&#\s"'<>)]*)/g, (match, prefix, key) => isSensitiveUrlQueryParamName(key) ? `${prefix}${key}=***` : match);
}
const FORCE_STOP_TERMINATE_GRACE_MS = 250;
const STOP_AND_WAIT_TIMEOUT_MS = 1e3;
const MAX_SUPPRESSED_TRANSIENT_PRE_HELLO_CLEAN_CLOSES = 1;
var GatewayClient = class {
	constructor(opts) {
		this.ws = null;
		this.stopped = false;
		this.pendingDeviceTokenRetry = false;
		this.deviceTokenRetryBudgetUsed = false;
		this.approvalRuntimeTokenCompatibilityDisabled = false;
		this.approvalRuntimeTokenRetryBudgetUsed = false;
		this.lastTick = null;
		this.tickIntervalMs = 3e4;
		this.tickTimer = null;
		this.pendingStop = null;
		this.transportValidated = false;
		this.suppressedTransientPreHelloCleanCloses = 0;
		this.deps = resolveHostDeps(opts.hostDeps);
		this.opts = {
			...opts,
			deviceIdentity: opts.deviceIdentity === null ? void 0 : opts.deviceIdentity ?? this.deps.loadOrCreateDeviceIdentity()
		};
		this.requestTimeoutMs = typeof opts.requestTimeoutMs === "number" && Number.isFinite(opts.requestTimeoutMs) ? resolveSafeTimeoutDelayMs(opts.requestTimeoutMs, { minMs: 0 }) : DEFAULT_GATEWAY_REQUEST_TIMEOUT_MS;
		const connectChallengeTimeoutMs = resolveConnectChallengeTimeoutMs(this.opts.connectChallengeTimeoutMs, {
			env: this.opts.env,
			configuredTimeoutMs: this.opts.preauthHandshakeTimeoutMs
		});
		this.protocol = new GatewayProtocolClient({
			createSocket: (handlers) => this.createSocket(handlers),
			createRequestId: randomUUID,
			createRequestError: (error) => new GatewayClientRequestError(error),
			createRequestTimeoutError: (method, timeoutMs, requestSent) => new GatewayClientRequestTimeoutError({
				method,
				timeoutMs,
				requestSent
			}),
			createRequestAbortError: createGatewayRequestAbortError,
			buildConnectPlan: ({ nonce, challengeTs }) => {
				if (!nonce) throw new Error("gateway connect challenge missing nonce");
				if (this.opts.deviceIdentity && challengeTs == null) throw new Error("gateway connect challenge timestamp invalid");
				return this.assembleConnectParams({
					role: this.opts.role ?? "operator",
					nonce,
					signedAtMs: challengeTs ?? Date.now()
				});
			},
			buildConnectParams: (assembled) => assembled.params,
			onConnectPlanError: (error) => {
				this.stopped = true;
				const marked = markGatewayConnectAssemblyError(error);
				const msg = `gateway connect failed: ${formatGatewayClientErrorForLog(error)}`;
				if (this.opts.mode === GATEWAY_CLIENT_MODES.PROBE || isGatewayClientStoppedError(error)) this.logDebug(msg);
				else this.logError(msg);
				return {
					closeCode: 1008,
					closeReason: "connect failed",
					stop: true,
					error: marked
				};
			},
			onConnectHello: (hello, context) => this.handleConnectHello(hello, context.plan),
			onHello: (hello) => this.opts.onHelloOk?.(hello),
			onConnectFailure: (error, context) => this.handleConnectRequestFailure(error, context.plan),
			resolveClose: (context) => this.resolveClose(context),
			onClose: (context, decision) => {
				if (this.tickTimer) {
					clearInterval(this.tickTimer);
					this.tickTimer = null;
				}
				if (decision.notify) this.opts.onClose?.(context.code, context.reason, this.closeInfo(context));
			},
			notifyStoppedClose: true,
			onConnectError: (error) => this.notifyConnectError(error),
			onParseError: (error) => this.logDebug(`gateway client parse error: ${formatGatewayClientErrorForLog(error)}`),
			onEvent: (event) => this.opts.onEvent?.(event),
			onGap: (info) => this.opts.onGap?.(info),
			onActivity: () => {
				this.lastTick = Date.now();
			},
			onCallbackError: (label, error) => this.logDebug(`gateway client ${label === "hello" ? "hello-ok" : label === "gap" ? "event" : label} handler error: ${formatGatewayClientErrorForLog(error)}`),
			handshake: {
				mode: "require-challenge",
				timeoutMs: connectChallengeTimeoutMs,
				timeoutMessage: (elapsedMs) => `gateway connect challenge timeout (waited ${elapsedMs}ms, limit ${connectChallengeTimeoutMs}ms)`
			},
			reconnect: {
				initialMs: 1e3,
				multiplier: 2,
				maxMs: 3e4
			},
			requestTimeoutMs: this.requestTimeoutMs,
			shouldRetrySocketFactoryError: (error) => !(error instanceof GatewayClientSocketFactoryConfigurationError) && !(error instanceof SyntaxError) && !(error instanceof TypeError) && !(error instanceof RangeError),
			rethrowSocketFactoryError: (error) => error instanceof GatewayClientTransportPolicyError
		});
	}
	getConnectionMetadata() {
		return {
			clientName: this.opts.clientName,
			hasDeviceIdentity: Boolean(this.opts.deviceIdentity),
			mode: this.opts.mode,
			preauthHandshakeTimeoutMs: this.opts.preauthHandshakeTimeoutMs
		};
	}
	updateNodeManifest(manifest) {
		this.opts = {
			...this.opts,
			caps: [...manifest.caps],
			commands: [...manifest.commands]
		};
		if (!this.stopped) this.protocol.closeSocket(1012, "node manifest changed");
	}
	start() {
		if (this.stopped) return;
		this.protocol.start();
	}
	createSocket(handlers) {
		const url = this.opts.url ?? DEFAULT_GATEWAY_CLIENT_URL;
		if (this.opts.tlsFingerprint && !url.startsWith("wss://")) throw new GatewayClientSocketFactoryConfigurationError("gateway tls fingerprint requires wss:// gateway url");
		const allowPrivateWs = (this.opts.env ?? process.env).OPENCLAW_ALLOW_INSECURE_PRIVATE_WS === "1";
		if (!isSecureWebSocketUrl(url, { allowPrivateWs })) {
			let displayHost = url;
			try {
				displayHost = new URL(url).hostname || url;
			} catch {}
			throw new GatewayClientSocketFactoryConfigurationError(`SECURITY ERROR: Cannot connect to "${displayHost}" over plaintext ws://. Both credentials and chat data would be exposed to network interception. Use wss:// for remote URLs. Safe defaults: keep gateway.bind=loopback and connect via SSH tunnel (ssh -N -L 18789:127.0.0.1:18789 user@gateway-host), or use Tailscale Serve/Funnel. ` + (allowPrivateWs ? "" : "Break-glass (trusted private networks only): set OPENCLAW_ALLOW_INSECURE_PRIVATE_WS=1. ") + "Run `openclaw doctor --fix` for guidance.");
		}
		this.deps.beforeConnect();
		const wsOptions = {
			maxPayload: 25 * 1024 * 1024,
			handshakeTimeout: resolvePreauthHandshakeTimeoutMs({
				env: this.opts.env,
				configuredTimeoutMs: this.opts.preauthHandshakeTimeoutMs
			}),
			...this.opts.origin ? { origin: this.opts.origin } : {}
		};
		if (url.startsWith("wss://") && this.opts.tlsFingerprint) {
			wsOptions.rejectUnauthorized = false;
			wsOptions.checkServerIdentity = (_hostValue, cert) => {
				const fingerprintValue = typeof cert === "object" && cert && "fingerprint256" in cert ? cert.fingerprint256 ?? "" : "";
				const fingerprint = this.deps.normalizeTlsFingerprint(typeof fingerprintValue === "string" ? fingerprintValue : "");
				const expected = this.deps.normalizeTlsFingerprint(this.opts.tlsFingerprint ?? "");
				if (!expected) return;
				if (!fingerprint) return /* @__PURE__ */ new Error("Missing server TLS fingerprint");
				if (fingerprint !== expected) return /* @__PURE__ */ new Error("Server TLS fingerprint mismatch");
			};
		}
		let ws;
		let unregisterGatewayLoopbackBypass;
		try {
			unregisterGatewayLoopbackBypass = this.deps.registerGatewayLoopbackBypass(url);
		} catch (error) {
			throw new GatewayClientTransportPolicyError(error instanceof Error ? error.message : String(error));
		}
		try {
			ws = new WebSocket(url, wsOptions);
			ws.binaryType = "nodebuffer";
		} catch (error) {
			throw error instanceof Error ? error : new Error(String(error));
		} finally {
			unregisterGatewayLoopbackBypass?.();
		}
		this.ws = ws;
		this.transportValidated = false;
		ws.on("open", () => {
			handlers.open();
			if (url.startsWith("wss://") && this.opts.tlsFingerprint) {
				const tlsError = this.validateTlsFingerprint();
				if (tlsError) {
					handlers.error(tlsError);
					ws.close(1008, tlsError.message);
					return;
				}
			}
			this.transportValidated = true;
		});
		ws.on("message", (data) => handlers.message(rawDataToString(data)));
		ws.on("close", (code, reason) => {
			const reasonText = reason.toString();
			if (this.ws === ws) this.ws = null;
			this.resolvePendingStop(ws);
			handlers.close(code, reasonText);
		});
		ws.on("error", (err) => {
			this.logDebug(`gateway client error: ${formatGatewayClientErrorForLog(err)}`);
			handlers.error(err instanceof Error ? err : new Error(String(err)));
		});
		return {
			isOpen: () => ws.readyState === WebSocket.OPEN,
			send: (data) => ws.send(data),
			close: (code, reason) => ws.close(code, reason)
		};
	}
	stop() {
		this.beginStop();
	}
	async stopAndWait(opts) {
		const stopPromise = this.beginStop();
		if (!stopPromise) return;
		const timeoutMs = opts?.timeoutMs === void 0 ? STOP_AND_WAIT_TIMEOUT_MS : resolveSafeTimeoutDelayMs(opts.timeoutMs);
		let timeout = null;
		try {
			await Promise.race([stopPromise, new Promise((_, reject) => {
				timeout = setTimeout(() => {
					reject(/* @__PURE__ */ new Error(`gateway client stop timed out after ${timeoutMs}ms`));
				}, timeoutMs);
				timeout.unref?.();
			})]);
		} finally {
			if (timeout) clearTimeout(timeout);
		}
	}
	beginStop() {
		this.stopped = true;
		this.pendingDeviceTokenRetry = false;
		this.deviceTokenRetryBudgetUsed = false;
		if (this.tickTimer) {
			clearInterval(this.tickTimer);
			this.tickTimer = null;
		}
		if (this.pendingStop) return this.pendingStop.promise;
		const ws = this.ws;
		this.ws = null;
		if (ws) {
			const pendingStop = this.createPendingStop(ws);
			const forceTerminateTimer = setTimeout(() => {
				try {
					ws.terminate();
				} finally {
					this.resolvePendingStop(ws);
				}
			}, FORCE_STOP_TERMINATE_GRACE_MS);
			forceTerminateTimer.unref?.();
			pendingStop.terminateTimer = forceTerminateTimer;
			if (this.protocol.connecting) {
				const error = /* @__PURE__ */ new Error("gateway client stopped");
				this.notifyConnectError(error);
				this.logDebug(`gateway connect failed: ${formatGatewayClientErrorForLog(error)}`);
			}
			this.protocol.stop();
			return pendingStop.promise;
		}
		this.protocol.stop();
		return null;
	}
	createPendingStop(ws) {
		if (this.pendingStop?.ws === ws) return this.pendingStop;
		let resolve = () => {};
		const promise = new Promise((done) => {
			resolve = done;
		});
		this.pendingStop = {
			ws,
			promise,
			resolve
		};
		return this.pendingStop;
	}
	resolvePendingStop(ws) {
		if (this.pendingStop?.ws !== ws) return;
		const { resolve, terminateTimer } = this.pendingStop;
		if (terminateTimer) clearTimeout(terminateTimer);
		this.pendingStop = null;
		resolve();
	}
	logDebug(message) {
		this.deps.logDebug(this.deps.redactForLog(message));
	}
	logError(message) {
		this.deps.logError(this.deps.redactForLog(message));
	}
	assembleConnectParams(params) {
		const { role, nonce, signedAtMs } = params;
		const selectedAuth = this.selectConnectAuth(role);
		const { authDeviceToken, authApprovalRuntimeToken, authAgentRuntimeIdentityToken, signatureToken, resolvedDeviceToken, storedToken, storedScopes, usingStoredDeviceToken } = selectedAuth;
		if (this.pendingDeviceTokenRetry && authDeviceToken) this.pendingDeviceTokenRetry = false;
		const auth = buildGatewayConnectAuth(selectedAuth);
		const scopes = resolveGatewayConnectScopes({
			requestedScopes: this.opts.scopes,
			usingStoredDeviceToken,
			storedScopes,
			defaultScopes: ["operator.admin"]
		});
		const platform = this.opts.platform ?? process.platform;
		return {
			params: {
				minProtocol: this.opts.minProtocol ?? MIN_CLIENT_PROTOCOL_VERSION,
				maxProtocol: this.opts.maxProtocol ?? PROTOCOL_VERSION,
				client: {
					id: this.opts.clientName ?? GATEWAY_CLIENT_NAMES.GATEWAY_CLIENT,
					displayName: this.opts.clientDisplayName,
					version: this.opts.clientVersion ?? DEFAULT_CLIENT_VERSION,
					platform,
					deviceFamily: this.opts.deviceFamily,
					mode: this.opts.mode ?? GATEWAY_CLIENT_MODES.BACKEND,
					instanceId: this.opts.instanceId
				},
				caps: Array.isArray(this.opts.caps) ? this.opts.caps : [],
				commands: Array.isArray(this.opts.commands) ? this.opts.commands : void 0,
				permissions: this.opts.permissions && typeof this.opts.permissions === "object" ? this.opts.permissions : void 0,
				pathEnv: this.opts.pathEnv,
				auth,
				role,
				scopes,
				device: this.buildDeviceConnectParams({
					nonce,
					role,
					scopes,
					signatureToken,
					signedAtMs,
					platform
				})
			},
			authApprovalRuntimeToken,
			authAgentRuntimeIdentityToken,
			resolvedDeviceToken,
			storedToken,
			usingStoredDeviceToken
		};
	}
	buildDeviceConnectParams(params) {
		if (!this.opts.deviceIdentity) return;
		const { nonce, role, scopes, signatureToken, signedAtMs, platform } = params;
		const payload = buildDeviceAuthPayloadV3({
			deviceId: this.opts.deviceIdentity.deviceId,
			clientId: this.opts.clientName ?? GATEWAY_CLIENT_NAMES.GATEWAY_CLIENT,
			clientMode: this.opts.mode ?? GATEWAY_CLIENT_MODES.BACKEND,
			role,
			scopes,
			signedAtMs,
			token: signatureToken ?? null,
			nonce,
			platform,
			deviceFamily: this.opts.deviceFamily
		});
		const signature = this.deps.signDevicePayload(this.opts.deviceIdentity.privateKeyPem, payload);
		return {
			id: this.opts.deviceIdentity.deviceId,
			publicKey: this.deps.publicKeyRawBase64UrlFromPem(this.opts.deviceIdentity.publicKeyPem),
			signature,
			signedAt: signedAtMs,
			nonce
		};
	}
	handleConnectHello(helloOk, assembled) {
		this.pendingDeviceTokenRetry = false;
		this.deviceTokenRetryBudgetUsed = false;
		this.suppressedTransientPreHelloCleanCloses = 0;
		const role = this.opts.role ?? "operator";
		const authInfo = helloOk.auth;
		if (authInfo?.deviceToken && this.opts.deviceIdentity) this.deps.storeDeviceAuthToken({
			deviceId: this.opts.deviceIdentity.deviceId,
			role: authInfo.role ?? role,
			token: authInfo.deviceToken,
			scopes: authInfo.scopes ?? [],
			env: this.opts.env
		});
		this.tickIntervalMs = typeof helloOk.policy?.tickIntervalMs === "number" ? helloOk.policy.tickIntervalMs : 3e4;
		this.lastTick = Date.now();
		this.startTickWatch();
	}
	handleConnectRequestFailure(error, assembled) {
		const role = this.opts.role ?? "operator";
		const shouldRetryWithDeviceToken = shouldRetryGatewayWithDeviceToken({
			retryBudgetUsed: this.deviceTokenRetryBudgetUsed,
			currentDeviceToken: assembled.resolvedDeviceToken,
			explicitToken: this.opts.token?.trim() || void 0,
			storedToken: assembled.storedToken,
			trustedEndpoint: this.isTrustedDeviceRetryEndpoint(),
			errorDetails: error instanceof GatewayClientRequestError ? error.details : void 0
		});
		if (this.opts.deviceIdentity && assembled.usingStoredDeviceToken && error instanceof GatewayClientRequestError && readConnectErrorDetailCode(error.details) === ConnectErrorDetailCodes.AUTH_DEVICE_TOKEN_MISMATCH) {
			const deviceId = this.opts.deviceIdentity.deviceId;
			try {
				this.deps.clearDeviceAuthToken({
					deviceId,
					role,
					env: this.opts.env
				});
				this.logDebug(`cleared stale device-auth token for device ${deviceId}`);
			} catch (clearError) {
				this.logDebug(`failed clearing stale device-auth token for device ${deviceId}: ${String(clearError)}`);
			}
		}
		if (shouldRetryWithDeviceToken) {
			this.pendingDeviceTokenRetry = true;
			this.deviceTokenRetryBudgetUsed = true;
			this.protocol.resetReconnectBackoff(250);
		}
		const startupRetryAfterMs = resolveGatewayStartupRetryAfterMs(error);
		if (startupRetryAfterMs !== null) {
			this.logDebug(`gateway connect failed: ${formatGatewayClientErrorForLog(error)}`);
			return {
				closeCode: 1013,
				closeReason: "gateway starting",
				reconnectDelayMs: startupRetryAfterMs
			};
		}
		if (this.shouldFailClosedForUnsupportedAgentRuntimeIdentity({
			error,
			authAgentRuntimeIdentityToken: assembled.authAgentRuntimeIdentityToken
		})) {
			const unsupportedIdentityError = /* @__PURE__ */ new Error("gateway rejected required agent runtime identity auth field; refusing to retry without it");
			this.stopped = true;
			this.notifyConnectError(unsupportedIdentityError);
			this.logError(`gateway connect failed: ${unsupportedIdentityError.message}`);
			return {
				closeCode: 1008,
				closeReason: "connect failed",
				stop: true
			};
		}
		if (this.shouldRetryWithoutApprovalRuntimeToken({
			error,
			authApprovalRuntimeToken: assembled.authApprovalRuntimeToken
		})) {
			this.approvalRuntimeTokenCompatibilityDisabled = true;
			this.approvalRuntimeTokenRetryBudgetUsed = true;
			this.protocol.resetReconnectBackoff(250);
			this.logDebug("gateway rejected approval runtime auth field; retrying without it");
			return {
				closeCode: 1008,
				closeReason: "connect retry"
			};
		}
		this.notifyConnectError(error);
		const message = `gateway connect failed: ${formatGatewayClientErrorForLog(error)}`;
		if (this.opts.mode === GATEWAY_CLIENT_MODES.PROBE || isGatewayClientStoppedError(error)) this.logDebug(message);
		else this.logError(message);
		return {
			closeCode: 1008,
			closeReason: "connect failed"
		};
	}
	resolveClose(context) {
		const info = this.closeInfo(context);
		const detailCode = context.connectFailure?.error instanceof GatewayClientRequestError ? readConnectErrorDetailCode(context.connectFailure.error.details) : null;
		const details = context.connectFailure?.error instanceof GatewayClientRequestError ? context.connectFailure.error.details : void 0;
		if (context.code === 1013 && context.connectFailure?.reconnectDelayMs !== void 0) return {
			retry: true,
			notify: false,
			reconnectDelayMs: context.connectFailure.reconnectDelayMs
		};
		if (info.transientPreHelloCleanClose && this.suppressedTransientPreHelloCleanCloses < MAX_SUPPRESSED_TRANSIENT_PRE_HELLO_CLEAN_CLOSES) {
			this.suppressedTransientPreHelloCleanCloses += 1;
			return {
				retry: true,
				notify: true,
				pendingError: new GatewayClientTransientPreHelloCloseError()
			};
		}
		if (info.transientPreHelloCleanClose || context.connectRequestSent && !context.helloReceived && !context.connectFailure) {
			const error = /* @__PURE__ */ new Error(`gateway closed (${context.code}): ${context.reason}`);
			this.notifyConnectError(error);
			this.logError(`gateway connect failed: ${formatGatewayClientErrorForLog(error)}`);
		}
		this.clearStaleDeviceTokenForClose(context.code, context.reason);
		if (shouldPauseGatewayReconnect({
			details,
			deviceTokenRetryPending: this.pendingDeviceTokenRetry,
			tokenMismatchIsTerminal: true,
			clientVersionMismatchIsTerminal: true
		})) {
			this.notifyReconnectPaused({
				code: context.code,
				reason: context.reason,
				detailCode
			});
			return {
				retry: false,
				notify: true
			};
		}
		return {
			retry: true,
			notify: true,
			reconnectDelayMs: context.connectFailure?.reconnectDelayMs
		};
	}
	closeInfo(context) {
		return {
			phase: context.helloReceived ? "post-hello" : "pre-hello",
			socketOpened: context.socketOpened,
			transportValidated: this.transportValidated,
			transientPreHelloCleanClose: !context.helloReceived && context.code === 1e3 && context.reason === ""
		};
	}
	clearStaleDeviceTokenForClose(code, reason) {
		if (code !== 1008 || !normalizeLowercaseStringOrEmpty(reason).includes("device token mismatch") || this.opts.token || this.opts.password || !this.opts.deviceIdentity) return;
		const deviceId = this.opts.deviceIdentity.deviceId;
		const role = this.opts.role ?? "operator";
		try {
			this.deps.clearDeviceAuthToken({
				deviceId,
				role,
				env: this.opts.env
			});
			this.logDebug(`cleared stale device-auth token for device ${deviceId}`);
		} catch (error) {
			this.logDebug(`failed clearing stale device-auth token for device ${deviceId}: ${String(error)}`);
		}
	}
	notifyConnectError(error) {
		try {
			this.opts.onConnectError?.(error);
		} catch (err) {
			this.logDebug(`gateway client connect error handler error: ${formatGatewayClientErrorForLog(err)}`);
		}
	}
	notifyReconnectPaused(info) {
		try {
			this.opts.onReconnectPaused?.(info);
		} catch (err) {
			this.logDebug(`gateway client reconnect paused handler error: ${formatGatewayClientErrorForLog(err)}`);
		}
	}
	shouldRetryWithoutApprovalRuntimeToken(params) {
		if (this.approvalRuntimeTokenRetryBudgetUsed) return false;
		if (!params.authApprovalRuntimeToken) return false;
		if (!(params.error instanceof GatewayClientRequestError)) return false;
		if (params.error.gatewayCode !== "INVALID_REQUEST") return false;
		const message = normalizeLowercaseStringOrEmpty(params.error.message);
		return message.includes("invalid connect params") && message.includes("approvalruntimetoken");
	}
	shouldFailClosedForUnsupportedAgentRuntimeIdentity(params) {
		if (!params.authAgentRuntimeIdentityToken) return false;
		if (!(params.error instanceof GatewayClientRequestError)) return false;
		if (params.error.gatewayCode !== "INVALID_REQUEST") return false;
		const message = normalizeLowercaseStringOrEmpty(params.error.message);
		return message.includes("invalid connect params") && message.includes("agentruntimeidentitytoken");
	}
	isTrustedDeviceRetryEndpoint() {
		const rawUrl = this.opts.url ?? "ws://127.0.0.1:18789";
		try {
			const parsed = new URL(rawUrl);
			const protocol = parsed.protocol === "https:" ? "wss:" : parsed.protocol === "http:" ? "ws:" : parsed.protocol;
			if (isLoopbackHost(parsed.hostname)) return true;
			return protocol === "wss:" && Boolean(this.opts.tlsFingerprint?.trim());
		} catch {
			return false;
		}
	}
	selectConnectAuth(role) {
		const storedAuth = this.opts.deviceIdentity ? this.deps.loadDeviceAuthToken({
			deviceId: this.opts.deviceIdentity.deviceId,
			role,
			env: this.opts.env
		}) : null;
		return selectGatewayConnectAuth({
			token: this.opts.token,
			bootstrapToken: this.opts.bootstrapToken,
			deviceToken: this.opts.deviceToken,
			password: this.opts.password,
			approvalRuntimeToken: this.approvalRuntimeTokenCompatibilityDisabled ? void 0 : this.opts.approvalRuntimeToken,
			agentRuntimeIdentityToken: this.opts.agentRuntimeIdentityToken,
			storedToken: storedAuth?.token,
			storedScopes: storedAuth?.scopes,
			pendingDeviceTokenRetry: this.pendingDeviceTokenRetry,
			trustedDeviceTokenRetry: this.isTrustedDeviceRetryEndpoint()
		});
	}
	startTickWatch() {
		if (this.tickTimer) clearInterval(this.tickTimer);
		const rawMinInterval = this.opts.tickWatchMinIntervalMs;
		const minInterval = typeof rawMinInterval === "number" && Number.isFinite(rawMinInterval) ? Math.max(1, Math.min(3e4, rawMinInterval)) : 1e3;
		const interval = resolveSafeTimeoutDelayMs(Math.max(this.tickIntervalMs, minInterval));
		this.tickTimer = setInterval(() => {
			if (this.stopped) return;
			if (!this.lastTick) return;
			if (this.protocol.hasPendingRequests && !this.protocol.hasUnboundedPendingRequests) return;
			const gap = Date.now() - this.lastTick;
			const rawTimeoutMs = this.opts.tickWatchTimeoutMs;
			if (gap > (typeof rawTimeoutMs === "number" && Number.isFinite(rawTimeoutMs) ? Math.max(1, rawTimeoutMs) : this.tickIntervalMs * 2)) this.protocol.closeSocket(4e3, "tick timeout");
		}, interval);
	}
	validateTlsFingerprint() {
		if (!this.opts.tlsFingerprint || !this.ws) return null;
		const expected = this.deps.normalizeTlsFingerprint(this.opts.tlsFingerprint);
		if (!expected) return /* @__PURE__ */ new Error("gateway tls fingerprint missing");
		const socket = this.ws["_socket"];
		if (!socket || typeof socket.getPeerCertificate !== "function") return /* @__PURE__ */ new Error("gateway tls fingerprint unavailable");
		const cert = socket.getPeerCertificate();
		const fingerprint = this.deps.normalizeTlsFingerprint(cert?.fingerprint256 ?? "");
		if (!fingerprint) return /* @__PURE__ */ new Error("gateway tls fingerprint unavailable");
		if (fingerprint !== expected) return /* @__PURE__ */ new Error("gateway tls fingerprint mismatch");
		return null;
	}
	async request(method, params, opts) {
		const expectFinal = opts?.expectFinal === true;
		const timeoutMs = opts?.timeoutMs === null ? null : typeof opts?.timeoutMs === "number" && Number.isFinite(opts.timeoutMs) ? resolveSafeTimeoutDelayMs(opts.timeoutMs, { minMs: 0 }) : expectFinal ? null : this.requestTimeoutMs;
		return this.protocol.request(method, params, {
			expectFinal,
			timeoutMs,
			signal: opts?.signal,
			onSent: opts?.onSent,
			onAccepted: opts?.onAccepted
		});
	}
};
function createGatewayRequestAbortError(method) {
	const err = /* @__PURE__ */ new Error(`gateway request aborted for ${method}`);
	err.name = "AbortError";
	return err;
}
//#endregion
export { DEFAULT_GATEWAY_REQUEST_TIMEOUT_MS, DEFAULT_PREAUTH_HANDSHAKE_TIMEOUT_MS, GatewayBrowserDeviceAuthLifecycle, GatewayClient, GatewayClientRequestError, GatewayClientRequestTimeoutError, GatewaySessionMessageSubscriptionCoordinator, MAX_CONNECT_CHALLENGE_TIMEOUT_MS, MAX_SAFE_TIMEOUT_DELAY_MS, MIN_CONNECT_CHALLENGE_TIMEOUT_MS, addSafeTimeoutDelayGraceMs, buildDeviceAuthPayload, buildDeviceAuthPayloadV3, buildGatewayConnectAuth, clampConnectChallengeTimeoutMs, clearGatewayConnectTimeout, createSessionProjection, getConnectChallengeTimeoutMsFromEnv, getGatewaySessionMessageSubscriptionCoordinator, hasSessionProjectionAcceptedFinal, isGatewayConnectAssemblyError, isLocallyOptimisticSessionMessage, normalizeDeviceMetadataForAuth, normalizeSessionProjectionRunId, projectLiveSessionMessage, readSessionMessageIdentity, readSessionMessageSequence, reconcileSessionProjectionSnapshot, reduceSessionProjection, reduceSessionProjectionRunEvent, releaseGatewaySessionMessageSubscription, resetGatewaySessionMessageSubscriptionCoordinator, resolveConnectChallengeTimeoutMs, resolveFiniteTimeoutDelayMs, resolveGatewayConnectScopes, resolvePreauthHandshakeTimeoutMs, resolveSafeTimeoutDelayMs, selectGatewayConnectAuth, shouldRetryGatewayWithDeviceToken, startGatewayClientWhenEventLoopReady, startGatewayClientWithReadinessWait, startGatewayConnectTimeout, waitForEventLoopReady };
