import ipaddr from "ipaddr.js";
//#region packages/net-policy/src/ip.ts
function normalizeOptionalString(value) {
	if (typeof value !== "string") return;
	return value.trim() || void 0;
}
function normalizeLowercaseStringOrEmpty(value) {
	return typeof value === "string" ? value.trim().toLowerCase() : "";
}
function expectIpv6Hextets(parts) {
	const [a, b, c, d, e, f, g, h] = parts;
	if (a === void 0 || b === void 0 || c === void 0 || d === void 0 || e === void 0 || f === void 0 || g === void 0 || h === void 0) throw new Error("expected IPv6 address to expose 8 hextets");
	return [
		a,
		b,
		c,
		d,
		e,
		f,
		g,
		h
	];
}
const BLOCKED_IPV4_SPECIAL_USE_RANGES = /* @__PURE__ */ new Set([
	"unspecified",
	"broadcast",
	"multicast",
	"linkLocal",
	"loopback",
	"carrierGradeNat",
	"private",
	"reserved"
]);
const PRIVATE_OR_LOOPBACK_IPV4_RANGES = /* @__PURE__ */ new Set([
	"loopback",
	"private",
	"linkLocal",
	"carrierGradeNat"
]);
const BLOCKED_IPV6_SPECIAL_USE_RANGES = /* @__PURE__ */ new Set([
	"unspecified",
	"loopback",
	"linkLocal",
	"uniqueLocal",
	"multicast",
	"reserved",
	"benchmarking",
	"discard",
	"orchid2"
]);
const RFC2544_BENCHMARK_PREFIX = [ipaddr.IPv4.parse("198.18.0.0"), 15];
const CLOUD_METADATA_IP_ADDRESSES = /* @__PURE__ */ new Set(["100.100.100.200", "fd00:ec2::254"]);
function stripIpv6Brackets(value) {
	if (value.startsWith("[") && value.endsWith("]")) return value.slice(1, -1);
	return value;
}
function isNumericIpv4LiteralPart(value) {
	return /^[0-9]+$/.test(value) || /^0x[0-9a-f]+$/i.test(value);
}
/** Type guard for parsed IPv4 addresses. */
function isIpv4Address(address) {
	return address.kind() === "ipv4";
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
	return ipaddr.IPv4.isValidFourPartDecimal(normalized) || ipaddr.IPv6.isValid(normalized) ? ipaddr.parse(normalized) : void 0;
}
/** Parses canonical IP literals plus legacy IPv4 forms needed for SSRF checks. */
function parseLooseIpAddress(raw) {
	const normalized = normalizeIpParseInput(raw);
	if (!normalized) return;
	return ipaddr.isValid(normalized) ? ipaddr.parse(normalized) : void 0;
}
/** Normalizes canonical IP literals and maps IPv4-mapped IPv6 addresses to IPv4 text. */
function normalizeIpAddress(raw) {
	const parsed = parseCanonicalIpAddress(raw);
	if (!parsed) return;
	return normalizeLowercaseStringOrEmpty(normalizeIpv4MappedAddress(parsed).toString());
}
/** True only for canonical four-part dotted-decimal IPv4 literals. */
function isCanonicalDottedDecimalIPv4(raw) {
	const normalized = normalizeIpParseInput(raw);
	return normalized !== void 0 && ipaddr.IPv4.isValidFourPartDecimal(normalized);
}
/** Detects legacy numeric IPv4 forms that canonical parsing deliberately rejects. */
function isLegacyIpv4Literal(raw) {
	const trimmed = normalizeOptionalString(raw);
	if (!trimmed) return false;
	const normalized = stripIpv6Brackets(trimmed);
	if (!normalized || normalized.includes(":")) return false;
	if (isCanonicalDottedDecimalIPv4(normalized)) return false;
	const parts = normalized.split(".");
	if (parts.length === 0 || parts.length > 4) return false;
	if (parts.some((part) => part.length === 0)) return false;
	if (!parts.every((part) => isNumericIpv4LiteralPart(part))) return false;
	return true;
}
/** True when a canonical IP literal is loopback, including IPv4-mapped IPv6. */
function isLoopbackIpAddress(raw) {
	const parsed = parseCanonicalIpAddress(raw);
	if (!parsed) return false;
	return normalizeIpv4MappedAddress(parsed).range() === "loopback";
}
/** True for link-local IPs, including legacy and embedded-IPv4 forms. */
function isLinkLocalIpAddress(raw) {
	const parsed = parseLooseIpAddress(raw);
	if (!parsed) return false;
	const normalized = normalizeIpv4MappedAddress(parsed);
	if (isIpv4Address(normalized)) return normalized.range() === "linkLocal";
	if (extractEmbeddedIpv4FromIpv6(normalized)?.range() === "linkLocal") return true;
	return normalized.range() === "linkLocal";
}
/** True for cloud metadata IP literals, including mapped and embedded forms. */
function isCloudMetadataIpAddress(raw) {
	const parsed = parseLooseIpAddress(raw);
	if (!parsed) return false;
	const normalized = normalizeIpv4MappedAddress(parsed);
	if (isIpv6Address(normalized)) {
		const embeddedIpv4 = extractEmbeddedIpv4FromIpv6(normalized);
		if (embeddedIpv4 && CLOUD_METADATA_IP_ADDRESSES.has(embeddedIpv4.toString())) return true;
	}
	return CLOUD_METADATA_IP_ADDRESSES.has(normalized.toString());
}
/** True for canonical private, loopback, link-local, or blocked special-use IPs. */
function isPrivateOrLoopbackIpAddress(raw) {
	const parsed = parseCanonicalIpAddress(raw);
	if (!parsed) return false;
	const normalized = normalizeIpv4MappedAddress(parsed);
	if (isIpv4Address(normalized)) return PRIVATE_OR_LOOPBACK_IPV4_RANGES.has(normalized.range());
	return isBlockedSpecialUseIpv6Address(normalized);
}
/** Applies the SSRF block policy for parsed IPv6 special-use ranges. */
function isBlockedSpecialUseIpv6Address(address, options = {}) {
	const range = address.range();
	if (range === "uniqueLocal" && options.allowUniqueLocalRange === true) return false;
	if (BLOCKED_IPV6_SPECIAL_USE_RANGES.has(range)) return true;
	const [firstPart] = expectIpv6Hextets(address.parts);
	return (firstPart & 65472) === 65216;
}
/** True for canonical IPv4 literals in RFC 1918 private ranges. */
function isRfc1918Ipv4Address(raw) {
	return parseCanonicalIpAddress(raw)?.range() === "private";
}
/** True for canonical IPv4 literals in the carrier-grade NAT range. */
function isCarrierGradeNatIpv4Address(raw) {
	return parseCanonicalIpAddress(raw)?.range() === "carrierGradeNat";
}
/** Applies the SSRF block policy for parsed IPv4 special-use ranges. */
function isBlockedSpecialUseIpv4Address(address, options = {}) {
	const inRfc2544BenchmarkRange = address.match(RFC2544_BENCHMARK_PREFIX);
	if (inRfc2544BenchmarkRange && options.allowRfc2544BenchmarkRange === true) return false;
	return BLOCKED_IPV4_SPECIAL_USE_RANGES.has(address.range()) || inRfc2544BenchmarkRange;
}
function decodeIpv4FromHextets(high, low) {
	const octets = [
		high >>> 8 & 255,
		high & 255,
		low >>> 8 & 255,
		low & 255
	];
	return ipaddr.IPv4.parse(octets.join("."));
}
/** Extracts embedded IPv4 addresses from mapped and transition IPv6 prefixes. */
function extractEmbeddedIpv4FromIpv6(address) {
	const parts = expectIpv6Hextets(address.parts);
	switch (address.range()) {
		case "ipv4Mapped": return address.toIPv4Address();
		case "rfc6145":
		case "rfc6052": return decodeIpv4FromHextets(parts[6], parts[7]);
		case "6to4": return decodeIpv4FromHextets(parts[1], parts[2]);
		case "teredo": return decodeIpv4FromHextets(parts[6] ^ 65535, parts[7] ^ 65535);
		default: break;
	}
	const isIpv4Compatible = parts[0] === 0 && parts[1] === 0 && parts[2] === 0 && parts[3] === 0 && parts[4] === 0 && parts[5] === 0;
	const isIsatap = (parts[4] & 64767) === 0 && parts[5] === 24318;
	if (isIpv4Compatible || isIsatap) return decodeIpv4FromHextets(parts[6], parts[7]);
}
/** Checks an IP literal against an exact IP or CIDR range, normalizing mapped IPv4. */
function isIpInCidr(ip, cidr) {
	const normalizedIp = parseCanonicalIpAddress(ip);
	if (!normalizedIp) return false;
	const candidate = cidr.trim();
	if (!candidate) return false;
	const comparableIp = normalizeIpv4MappedAddress(normalizedIp);
	if (!candidate.includes("/")) {
		const exact = parseCanonicalIpAddress(candidate);
		if (!exact) return false;
		const comparableExact = normalizeIpv4MappedAddress(exact);
		return comparableIp.kind() === comparableExact.kind() && comparableIp.toString() === comparableExact.toString();
	}
	try {
		const [baseAddress, prefixLength] = ipaddr.parseCIDR(candidate);
		const comparableBase = normalizeIpv4MappedAddress(baseAddress);
		if (isIpv4Address(comparableIp) && isIpv4Address(comparableBase)) return comparableIp.match([comparableBase, prefixLength]);
		if (isIpv6Address(comparableIp) && isIpv6Address(comparableBase)) return comparableIp.match([comparableBase, prefixLength]);
		return false;
	} catch {
		return false;
	}
}
//#endregion
export { extractEmbeddedIpv4FromIpv6, isBlockedSpecialUseIpv4Address, isBlockedSpecialUseIpv6Address, isCanonicalDottedDecimalIPv4, isCarrierGradeNatIpv4Address, isCloudMetadataIpAddress, isIpInCidr, isIpv4Address, isIpv6Address, isLegacyIpv4Literal, isLinkLocalIpAddress, isLoopbackIpAddress, isPrivateOrLoopbackIpAddress, isRfc1918Ipv4Address, normalizeIpAddress, parseCanonicalIpAddress, parseLooseIpAddress };
