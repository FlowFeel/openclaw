import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { a as sha256Hex } from "./crypto-digest-CmUwt1S-.js";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.js";
import { t as truncateUtf8Prefix } from "./utf8-truncate-Dro7v_iB.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { B as stripProposalFrontmatterForSkill, Y as readWorkspaceSkillFile, l as resolveSkillProposalTarget, nt as normalizeSkillIndexName } from "./store-CR6r1z2u.js";
import { t as resolveSkillWorkshopConfig } from "./config-DFolTFBo.js";
import { d as inspectSkillProposal, f as listSkillProposals, i as proposeUpdateSkill, n as listWritableWorkspaceSkillSummaries, r as proposeCreateSkill, s as reviseSkillProposal } from "./service-CmvGStrk.js";
import { a as recordSessionSkillSuggestion, i as recordSessionSkillCaptureSignals, o as releaseSessionSkillCaptureSignals, r as readSessionSkillCaptureSignalHashes, t as claimSessionSkillCaptureSignals } from "./skill-suggestions-CwhvRyrc.js";
import { t as autoApplySkillProposal } from "./auto-apply-DIstEGzX.js";
import { createHash } from "node:crypto";
//#region src/skills/research/text.ts
const TEXT_BLOCK_TYPES = /* @__PURE__ */ new Set([
	"text",
	"input_text",
	"output_text"
]);
function readTextValue(value) {
	if (typeof value === "string") return value;
	if (value && typeof value === "object" && typeof value.value === "string") return value.value;
	return "";
}
function extractTextBlock(block) {
	if (!block || typeof block !== "object") return "";
	const type = block.type;
	if (typeof type !== "string" || !TEXT_BLOCK_TYPES.has(type)) return "";
	return readTextValue(block.text);
}
function extractMessageText(content) {
	if (typeof content === "string") return content;
	if (Array.isArray(content)) return content.map(extractTextBlock).filter(Boolean).join("\n");
	return extractTextBlock(content);
}
/** Extracts role/text pairs from mixed transcript message shapes. */
function extractTranscriptText(messages) {
	const result = [];
	for (const message of messages) {
		if (!message || typeof message !== "object") continue;
		const role = message.role;
		const content = message.content;
		if (typeof role !== "string") continue;
		const text = extractMessageText(content).trim();
		if (text) result.push({
			role,
			text
		});
	}
	return result;
}
function compactWhitespace(value) {
	return value.replace(/\s+/g, " ").trim();
}
//#endregion
//#region src/skills/research/signals.ts
const SIGNAL_PATTERNS = [
	/(?:^|[.;—–-]\s+)next time\b|\bnext time\s+(?:during|for|in|under|when|while|you)\b|\bnext time[.!?]*$/i,
	/\b(?:from now on|going forward)\b/i,
	/\bremember to\b/i,
	/\bmake sure to\b/i,
	/^(?:(?:(?:can|could|would) you\s+|please\s+|you\s+)?always\s+\w+\s+\S+|(?!i\b).+\b(?:must|should)\s+always\s+\w+|i (?:need|want) you to always\s+\w+|(?:for|on|when|whenever)\b.+(?:\balways\s+|,\s+please\s+)\w+|(?:make it a rule to|policy:)\s+always\s+\w+)/i,
	/\bprefer\b.{0,120}\b(?:for|instead|use|when)\b/i,
	/\bwhen asked\b/i,
	/^(?!(?:can|could|would|will)\b)[a-z][\w-]*\s+.+\bnext time\s+[a-z]/i,
	/\b(?:that|this|it)(?:'s| is| was)? (?:wrong|not what i (?:asked|meant|said|wanted))\b/i,
	/\bdon['’]?t\b.{0,60}\bagain\b/i,
	/\bstop\s+[a-z]+ing\b/i,
	/\bstill (?:doing|ignoring|making|using)\b/i,
	/\b(?:i|we) (?:asked|told) you\b/i,
	/\brepeat myself\b/i,
	/\bshould (?:not|never) (?:be|have)\b/i,
	/\bi thought (?:we|you) (?:agreed|was|were|would)\b/i
];
const IMPERATIVE_ACTIONS = "add|address|apply|archive|avoid|build|calculate|capture|check|close|configure|confirm|contain|convert|copy|create|delete|deploy|disclose|draft|emit|encrypt|ensure|export|fix|focus|format|generate|handle|include|inspect|keep|link|mask|merge|move|notify|open|optimize|prefer|process|provide|publish|put|read|record|redact|remove|rename|replace|require|return|review|run|sanitize|save|scrub|send|set|share|sign|sort|switch|treat|update|upload|use|validate|verify|wrap|write";
const IMPERATIVE_RULE = new RegExp(`^(?:${IMPERATIVE_ACTIONS})\\b`, "i");
const FORMAT_OUTPUT = /^(?:[A-Z][A-Z0-9.+-]*(?:\s+\d+)?|csv|Csv|json|Json|markdown|Markdown|text|Text|toml|Toml|xml|Xml|yaml|Yaml)\s+(?:output|Output)$/;
const RULE_SHORTHAND = /^(?:always|do not|don['’]?t|never|not|only use|sorted|stop)\b|^no\s+(?:\w+ing\b|.+\boutput$)|\bin parentheses$/i;
const UNMARKED_FIX = /^(?!i\b|it\b|th\w+\b|we\b|you\b)[a-z][\w-]*\s+\S+/i;
const COMMAND_SHAPED = /^(?:git|gh|node|npm|openclaw|pnpm)\s+|^[a-z][\w-]*\s+(?:-|\.?\/|https?:\/\/|[A-Z_][A-Z0-9_]*=)/;
const EXPLICIT_ACTION_MARKER = /\b(?:remember to|make sure to)\b|^(?:(?:can|could|would|will) you\s+|please\s+)?always\b|[,;:—–-]\s+always\b/i;
const MATCH_STOPWORDS = new Set("and are as before but for from have into not should that the them then they this was were what when with you your".split(" "));
const TASK_CLASS_STOPWORDS = /* @__PURE__ */ new Set([...MATCH_STOPWORDS, ..."a again all always an ask asked attaching chronologically do doing done every going handling i it make making must my never next now on only parentheses please processing reply replying still stop time to we week".split(" ")]);
const TOPIC_STOPWORDS = /* @__PURE__ */ new Set([
	...TASK_CLASS_STOPWORDS,
	...IMPERATIVE_ACTIONS.split("|"),
	..."adding after allow building checking doing exporting formatting including inspecting making optimizing publishing reading recording reformat sanitizing saving sending sharing sorting testing uploading using verifying while without workflow writing".split(" ")
]);
function extractInstruction(text) {
	const trimmed = compactWhitespace(text);
	return trimmed.length >= 12 && trimmed.length <= 1200 && SIGNAL_PATTERNS.some((pattern) => pattern.test(trimmed)) ? trimmed.replace(/^ok[,. ]+/i, "") : void 0;
}
function splitInstructionCandidates(value) {
	const sentences = compactWhitespace(value).replace(/\s*(?:[;—–-]\s+|,\s+but\s+)(?=(?:from now on|going forward|next time|remember to|make sure to)\b)/gi, ". ").replace(/\b(?:(?:Dr|Jr|Mr|Mrs|Ms|Mt|Prof|Sr|St|etc|e\.g|i\.e|vs)\.|(?:[A-Z]\.){2,})/gi, (match) => match.replaceAll(".", "\0")).replace(/\s\.(?=\s+(?:-|&&|\|\||[A-Za-z]))/g, " ").split(/(?<=[.!?])\s+/).map((sentence) => sentence.replaceAll("\0", ".").replaceAll("", "."));
	const candidates = [];
	for (let index = 0; index < sentences.length; index += 1) {
		const sentence = sentences[index] ?? "";
		const next = sentences[index + 1];
		const bareComplaint = /(?:\b(?:that|this|it)(?:'s| is| was)? (?:wrong|not what i (?:asked|meant|said|wanted)(?: for)?)|^(?:you(?:'re|’re| are)\s+)?still (?:doing|ignoring|making|using)\b.+)[.!?]*$/i.test(sentence);
		const nextIsFix = next && !extractInstruction(next) && UNMARKED_FIX.test(next);
		if (bareComplaint && nextIsFix) {
			candidates.push(`${sentence.replace(/[.!?]+$/, "")}, ${next}`);
			index += 1;
		} else candidates.push(sentence);
	}
	return candidates;
}
function isUnmarkedDirective(value) {
	const text = compactWhitespace(value).replace(/^also\s+/i, "");
	const directive = new RegExp(`^(?:always|do not|don['’]?t|never|only use|please|stop|${IMPERATIVE_ACTIONS}|git|gh|node|npm|openclaw|pnpm)\\b`, "i").test(text);
	return !text.endsWith("?") && (directive || /^[a-z][\w-]*\s+(?:-|\.?\/|https?:\/\/|[A-Z_][A-Z0-9_]*=)/.test(text));
}
function skillTokensMatch(a, b) {
	const singularMatch = a === `${b}s` || b === `${a}s` || a === `${b}es` || b === `${a}es`;
	return a === b || a !== "news" && b !== "news" && singularMatch;
}
function tokenizeForSkillMatch(value) {
	return value.toLowerCase().split(/[^a-z0-9]+/).flatMap((token) => token === "pr" || token === "prs" ? ["pull", "request"] : [token]).filter((token) => token.length >= 3 && !MATCH_STOPWORDS.has(token));
}
function matchExistingSkill(instruction, skills) {
	const instructionTokens = new Set(tokenizeForSkillMatch(instruction));
	let best;
	let bestScore = 0;
	for (const skill of skills) {
		const nameTokens = tokenizeForSkillMatch(skill.name.replace(/-/g, " "));
		const descriptionTokens = tokenizeForSkillMatch(skill.description ?? "");
		let score = 0;
		for (const token of instructionTokens) if (nameTokens.some((candidate) => skillTokensMatch(candidate, token))) score += 2;
		else if (descriptionTokens.some((candidate) => skillTokensMatch(candidate, token))) score += 1;
		if (score > bestScore) {
			bestScore = score;
			best = skill;
		}
	}
	return bestScore >= 2 ? best : void 0;
}
function cleanTaskClass(value) {
	return compactWhitespace(value).replace(/^(?:i|we|you)\s+(?:ask|asked)\s+(?:you\s+)?for\s+/i, "").replace(/^(?:i|we|you)(?:['’]re| are)\s+(?:handling|processing|reviewing|writing)\s+/i, "").replace(/^(?:i|we|you)\s+(?:handle|process|review|write)\s+/i, "").replace(/^(?:handling|processing|reviewing|working (?:on|with)|writing)\s+/i, "").replace(/^asked (?:for|to)\s+/i, "").replace(/^(?:a|an|every|the|this|these|those|my|your|our)\s+/i, "").replace(/[.!?]+$/, "").trim();
}
function stripSignalMarkers(value) {
	const compact = compactWhitespace(value).replace(/^(?:can|could|would|will) you\s+(?=(?:from now on|going forward|next time|remember to|make sure to)\b)/i, "");
	return (compact.match(/(?:^|[.!?;:—–-]\s+|,\s+(?:but\s+)?)((?:from now on|going forward|next time|remember to|make sure to)\b(?=[\s,:;—–-]*\w).*)$/i)?.[1] ?? compact).replace(/^(?:from now on|going forward|next time|remember to|make sure to)\b[\s,:;—–-]*/i, "").replace(/\s*,?\s+(?:from now on|going forward|next time)[.!?]*$/i, "").trim();
}
function normalizeRule(value, explicit = false) {
	const compact = compactWhitespace(value);
	const request = compact.match(/^(?:can|could|would|will) you\s+(.+)$/i);
	let rule = (request?.[1] ?? compact).replace(/^(?:(?:also|always|make sure to|please|just|remember to)\s+)+/i, "").trim();
	const literalDotArgument = /^run\s+\S+.*\s\.$/i.test(rule);
	rule = literalDotArgument ? rule : rule.replace(/[.!?]+$/, "");
	if (!rule || compact.endsWith("?") && !request && !IMPERATIVE_RULE.test(rule) || /^(?:i|we)\s+always\b/i.test(rule)) return;
	const commandShaped = COMMAND_SHAPED.test(rule);
	if (!explicit && (!IMPERATIVE_RULE.test(rule) || /\b(?:are|is|was|were) still\b/i.test(rule)) && !commandShaped && !RULE_SHORTHAND.test(rule) && !FORMAT_OUTPUT.test(rule)) return;
	if (/^only use\b/i.test(rule)) rule = rule.replace(/^only use\b/i, "Use only");
	else if (/^don['’]?t\s+/i.test(rule)) rule = `Do not ${rule.replace(/^don['’]?t\s+/i, "")}`;
	else if (/^not\s+/i.test(rule)) rule = `Do not ${rule.replace(/^not\s+/i, "")}`;
	else if (/^never\s+/i.test(rule)) {
		const prohibited = rule.replace(/^never\s+/i, "");
		if (/^(?:csv|json|markdown|text|toml|xml|yaml)(?:\s+output)?$/i.test(prohibited)) rule = `Do not use ${prohibited}`;
		else if (IMPERATIVE_RULE.test(prohibited)) rule = `Do not ${prohibited}`;
		else return;
	} else if (/^no\s+(.+)$/i.test(rule)) {
		const prohibited = rule.replace(/^no\s+/i, "");
		rule = `Do not ${prohibited.endsWith("output") ? "use" : "allow"} ${prohibited}`;
	} else if (/^sorted\b/i.test(rule)) rule = rule.replace(/^sorted\b/i, "Sort");
	else if (FORMAT_OUTPUT.test(rule)) rule = `Use ${rule}`;
	else if (/\bin parentheses$/i.test(rule) && !IMPERATIVE_RULE.test(rule)) rule = `Include ${rule}`;
	return `${commandShaped ? rule : rule.charAt(0).toUpperCase() + rule.slice(1)}${literalDotArgument ? "" : "."}`;
}
function normalizeRuleList(value, splitList, explicit = false) {
	const commaClauses = value.split(/\s*,\s*/);
	const independentClause = (clause) => IMPERATIVE_RULE.test(clause) || /^(?:always|do not|don['’]?t|never|only use|sorted)\b|\bin parentheses$/i.test(clause) || FORMAT_OUTPUT.test(clause);
	const clauses = splitList && commaClauses.length > 1 && commaClauses.every(independentClause) ? commaClauses : value.split(/\s*,\s*(?=never\b)/i);
	const leadingUse = /^(?:only\s+)?use\b/i.test(clauses[0] ?? "");
	return clauses.map((clause, index) => {
		const nounOnlyNever = index > 0 && leadingUse && clause.match(/^never\s+(.+)$/i)?.[1];
		return normalizeRule(nounOnlyNever && !IMPERATIVE_RULE.test(nounOnlyNever) ? `never use ${nounOnlyNever}` : clause, explicit);
	}).filter((rule) => Boolean(rule));
}
function parseInstruction(instruction) {
	const compactInstruction = compactWhitespace(instruction.split("", 1)[0] ?? instruction);
	const isolatedInstruction = stripSignalMarkers(compactInstruction);
	const actorEvent = isolatedInstruction.match(new RegExp(`^you\\s+(${IMPERATIVE_ACTIONS}|work on)\\s+(.+),\\s+((?:always|do not|don['’]?t|make sure to|never|please)\\s+.+|(?:${IMPERATIVE_ACTIONS})\\b.+)$`, "i"));
	if (actorEvent?.[1] && actorEvent[2] && actorEvent[3]) return {
		taskClass: cleanTaskClass(actorEvent[2]),
		rules: normalizeRuleList(actorEvent[3], false)
	};
	const progressiveEvent = isolatedInstruction.match(/^you(?:'re|’re| are)\s+(handling|processing|reviewing|writing|exporting)\s+(.+?),\s*(?:always\s+)?(.+)$/i);
	if (progressiveEvent?.[1] && progressiveEvent[2] && progressiveEvent[3]) return {
		taskClass: cleanTaskClass(progressiveEvent[2]),
		rules: normalizeRuleList(progressiveEvent[3], false)
	};
	const postfixActor = compactInstruction.match(new RegExp(`^(.+?)\\s+next time you\\s+(${IMPERATIVE_ACTIONS}|work on)\\s+(.+?)[.!?]*$`, "i"));
	if (postfixActor?.[1] && postfixActor[2] && postfixActor[3]) return {
		taskClass: cleanTaskClass(postfixActor[3]),
		rules: normalizeRuleList(postfixActor[1], false)
	};
	const postfixPassive = compactInstruction.match(/^(?!(?:always|from now on|going forward|make sure to|remember to)\b)(.+?)\s+(?:from now on|going forward|next time)\s+(.+?(?:\s+(?:is|are|was|were)\s+(?:[a-z]+ed|built|done|given|kept|known|made|read|run|sent|set|shown|taken|written)|\s+(?:runs?|happens?)))[.!?]*$/i);
	if (postfixPassive?.[1] && postfixPassive[2]) return {
		taskClass: cleanTaskClass(postfixPassive[2]),
		rules: normalizeRuleList(postfixPassive[1], false)
	};
	const text = isolatedInstruction.replace(/^also\s+/i, "");
	const postfixScope = compactInstruction.match(/^(.+?)\s*,?\s+(?:from now on|going forward|next time)\s*,?\s*(?:during|for|in|under|when|while)\s+(.+?)[.!?]*$/i);
	if (postfixScope?.[1] && postfixScope[2]) {
		const scopeParts = postfixScope[2].split(/\s*,\s+and\s+/i);
		const continuations = scopeParts.slice(1);
		const hasContinuations = continuations.length > 0 && continuations.every(isUnmarkedDirective);
		const continuationRules = hasContinuations ? continuations.flatMap((continuation) => normalizeRuleList(continuation, false)) : [];
		return {
			taskClass: cleanTaskClass(hasContinuations ? scopeParts[0] ?? "" : postfixScope[2]),
			rules: [...normalizeRuleList(postfixScope[1], false), ...continuationRules]
		};
	}
	const postfixContinuation = compactInstruction.match(/^(.+?)\s*,?\s+(?:from now on|going forward|next time)\s*,?\s+and\s+(.+)$/i);
	if (postfixContinuation?.[1] && postfixContinuation[2]) return { rules: normalizeRuleList(`${postfixContinuation[1]}, ${postfixContinuation[2]}`, true) };
	const actorRequest = text.match(/^(?:i need you to|i want you to|you|(?:can|could|would|will) you)\s+(?:to\s+)?always\s+(.+)$/i);
	if (actorRequest?.[1]) return { rules: normalizeRuleList(actorRequest[1].replace(/\?$/, ""), false, true) };
	const policyRule = text.match(/^(?:policy:\s*|make it a rule to\s+)(.+)$/i)?.[1];
	if (policyRule) return { rules: normalizeRuleList(policyRule, false, true) };
	const still = text.match(new RegExp(`^(?:you(?:'re|’re| are)\\s+)?still (using|doing|making|ignoring)\\s+(.+)(?:\\s+[—–-]\\s+|[,;:]\\s+)(cut that out(?:\\s+of\\s+.+)?|they should not be included\\s+.+|(?:do not|don['’]?t|never|only use)\\s+.+|(?:always\\s+)?(?:${IMPERATIVE_ACTIONS})\\s+.+?)[.!?]*$`, "i"));
	if (still?.[1] && still[2] && still[3]) {
		const taskClass = cleanTaskClass(still[2]);
		const replacement = still[3].replace(/[.!?]+$/, "");
		if (/^they should not be included\s+/i.test(replacement)) return {
			taskClass,
			rules: [`Do not use ${taskClass} or include them ${replacement.replace(/^they should not be included\s+/i, "")}.`]
		};
		if (/^cut that out/i.test(replacement)) {
			const verbs = {
				doing: "do",
				ignoring: "ignore",
				making: "make",
				using: "use"
			};
			const scope = replacement.match(/^cut that out\s+of\s+(.+)$/i)?.[1];
			return {
				taskClass,
				rules: [`Do not ${verbs[still[1].toLowerCase()]} ${taskClass}${scope ? ` in ${scope}` : ""}.`]
			};
		}
		return {
			taskClass,
			rules: normalizeRuleList(replacement, false)
		};
	}
	const reflection = text.match(/^i thought (?:we|you) (?:were|was|would|agreed(?: to)?)\s+(.+?)(?:\s+[—–-]\s+(.+))?$/i);
	if (reflection?.[1]) {
		if (!reflection[2] && /^i thought (?:we|you) (?:were|was)\b/i.test(text)) return;
		const replacement = reflection[2] ?? reflection[1];
		return {
			taskClass: reflection[2] ? cleanTaskClass(reflection[1].replace(/^working on\s+/i, "")) : void 0,
			rules: normalizeRuleList(replacement, false, true)
		};
	}
	const stop = text.match(/^(?:(?:(?:i need|i want) you to|(?:we|you) need to|please)\s+)?stop ([a-z]+ing)\s+(.+)$/i);
	if (stop?.[1] && stop[2]) {
		const target = stop[2].replace(/[.!?]+$/, "");
		return {
			taskClass: cleanTaskClass(target.split(/\s+(?:before|until|without)\b/i)[0] ?? target),
			rules: [`Stop ${stop[1].toLowerCase()} ${target}.`]
		};
	}
	const contextualDirective = text.match(/^(?!.*:)(?:for|on|when|whenever)\s+(.+),\s+((?:(?:always|do not|don['’]?t|make sure to|never|please)\s+|[a-z]+\s+).+)$/i);
	if (contextualDirective?.[1] && contextualDirective[2]) return {
		taskClass: cleanTaskClass(contextualDirective[1]),
		rules: normalizeRuleList(contextualDirective[2], false)
	};
	const contextual = text.match(/^(?:for|on|when|whenever)\s+(.+?)(\s*:\s*|,\s+)(.+)$/i);
	if (contextual?.[1] && contextual[3]) return {
		taskClass: cleanTaskClass(contextual[1]),
		rules: normalizeRuleList(contextual[3], contextual[2]?.includes(":") === true)
	};
	const contextualAlways = text.match(/^(?:for|on|when|whenever)\s+(.+?)\s+always\s+(.+)$/i);
	if (contextualAlways?.[1] && contextualAlways[2]) {
		if (/\b(?:i|we)$/i.test(contextualAlways[1])) return;
		return {
			taskClass: cleanTaskClass(contextualAlways[1]),
			rules: normalizeRuleList(contextualAlways[2], false, true)
		};
	}
	const modal = text.match(/^(?!i\s)([^.!?]+?)\s+(?:must|should)(?:\s+always)?\s+(.+)$/i);
	if (modal?.[1] && modal[2]) {
		const taskClass = cleanTaskClass(modal[1]);
		const predicate = modal[2].replace(/[.!?]+$/, "");
		if (/^(?:not|never) have been\b/i.test(predicate)) return;
		if (/^(?:not|never) have\s+/i.test(predicate)) return {
			taskClass,
			rules: [`Do not allow ${taskClass} to have ${predicate.replace(/^(?:not|never) have\s+/i, "")}.`]
		};
		if (/^(?:not|never) be\s+/i.test(predicate)) return {
			taskClass,
			rules: [`Do not allow ${taskClass} to be ${predicate.replace(/^(?:not|never) be\s+/i, "")}.`]
		};
		if (/^be\s+/i.test(predicate)) return {
			taskClass,
			rules: [`Require ${taskClass} to be ${predicate.replace(/^be\s+/i, "")}.`]
		};
		if (/^not\s+/i.test(predicate)) {
			const prohibition = `Do not ${predicate.replace(/^not\s+/i, "")}.`;
			return {
				taskClass,
				rules: [`${/^(?:i|we|you)$/i.test(taskClass) ? "" : `For ${taskClass}: `}${prohibition}`]
			};
		}
		return {
			taskClass,
			rules: normalizeRuleList(predicate, false)
		};
	}
	const event = text.match(/^(.+?)\s+(?:runs?|happens?),\s+(.+)$/i);
	if (event?.[1] && event[2]) return {
		taskClass: cleanTaskClass(event[1]),
		rules: normalizeRuleList(event[2], false)
	};
	const replacement = text.match(/^(?:that|this|it)(?:'s| is| was)? (?:wrong|not what i (?:asked|meant|said|wanted)(?: for)?)(?:\s*[—–-]\s*|[.!?,;:]\s+)(.+)$/i)?.[1];
	if (replacement && !/^(?:i|it|the|these|they|this|those|we|you)\b/i.test(replacement)) return { rules: normalizeRuleList(replacement, false, true) };
	const directFix = text.match(/^(?:i|we) (?:asked|told) you (?:to\s+|not to\s+|never to\s+|don['’]?t\s+)(.+)$/i);
	if (directFix?.[1]) return { rules: normalizeRuleList(`${/\b(?:(?:not|never) to|don['’]?t)\s+/i.test(text) ? "Do not " : ""}${directFix[1]}`, false, true) };
	if (/\brepeat myself\b/i.test(text)) {
		const explicitFix = text.match(/\brepeat myself\b.*?(?:\s+[—–-]\s+|[,;:]\s*)(.+)$/i)?.[1];
		return explicitFix && isUnmarkedDirective(explicitFix) ? { rules: normalizeRuleList(explicitFix, false) } : void 0;
	}
	const rules = normalizeRuleList(text, false, EXPLICIT_ACTION_MARKER.test(compactInstruction));
	return rules.length > 0 ? { rules } : void 0;
}
function deriveTopicTokens(value, dropLeadingAction = false) {
	const topicValue = value.replace(/\b(attempt|build|execution|incident|job|run|session|task|trace)\s+(?:(?:id\s+|#)\s*)[a-z0-9-]+\b/gi, "$1").replace(/\b(attempt|build|execution|incident|job|run|session|task|trace)\s+([a-z0-9-]+)\b/gi, (match, taskClass, identifier) => {
		const digitCount = identifier.match(/\d/g)?.length ?? 0;
		return /^\d+$/.test(identifier) || /^[a-f0-9]{7,}$/i.test(identifier) || /^(?:attempt|execution|incident|job|run|session|task|trace)$/i.test(taskClass) && identifier.length >= 8 && digitCount >= 2 ? taskClass : match;
	}).replace(/\b\d{4}-\d{2}-\d{2}\b/g, "").replace(/\b(?:bug|inc|incident|issue|ticket)-\d+\b/gi, "").replace(/\b[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}\b/gi, "");
	const namespace = topicValue.match(/\b[a-z0-9]+hub\b/i)?.[0];
	if (namespace) return [namespace.toLowerCase()];
	const leadingWord = dropLeadingAction ? topicValue.match(/^([a-z][a-z0-9-]*)\b/i)?.[1]?.toLowerCase() : void 0;
	const tokens = topicValue.normalize("NFKD").replace(/\p{M}/gu, "").replace(/[’']/g, "").toLowerCase().split(/[^a-z0-9]+/).filter((token) => token && !(dropLeadingAction ? TOPIC_STOPWORDS : TASK_CLASS_STOPWORDS).has(token));
	const commandTopic = COMMAND_SHAPED.test(topicValue);
	return leadingWord && !commandTopic && tokens[0] === leadingWord ? tokens.slice(1) : tokens;
}
function boundSkillName(value) {
	const normalized = normalizeSkillIndexName(value);
	return normalized.length <= 64 ? normalized : `${normalized.slice(0, 55).replace(/-+$/, "")}-${createHash("sha256").update(normalized).digest("hex").slice(0, 8)}`;
}
function titleFromSkillName(skillName) {
	return skillName.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ").replace(/\b(?:Api|Ci|Gif|Iso|Qa|Url)\b/g, (value) => value.toUpperCase()).replace("Github", "GitHub");
}
function buildDescription(title, rules) {
	const clauses = [];
	for (const rule of rules) {
		const next = [...clauses, rule.replace(/\.$/, "")];
		if (Buffer.byteLength(`${title}: ${next.join("; ")}.`, "utf8") > 160) break;
		clauses.push(next.at(-1) ?? "");
	}
	if (clauses.length > 0) return `${title}: ${clauses.join("; ")}.`;
	const availableBytes = 160 - Buffer.byteLength(`${title}: …`, "utf8");
	return `${title}: ${truncateUtf8Prefix(rules[0]?.replace(/\.$/, "") ?? "", availableBytes).replace(/\s+\S*$/, "").trimEnd()}…`;
}
function findEquivalentName(name, candidates) {
	const tokens = name.split("-");
	return [...candidates].find((candidate) => candidate.split("-").length === tokens.length && tokens.every((token, index) => skillTokensMatch(token, candidate.split("-")[index] ?? "")));
}
function buildProposal(params) {
	const skillName = normalizeSkillIndexName(params.skillName);
	const rules = [...new Set(params.rules)];
	if (!skillName || rules.length === 0) return;
	return {
		skillName,
		description: buildDescription(params.title, rules),
		goal: `Apply the ${params.title} procedure consistently.`,
		evidence: params.instructions.join("\n"),
		instructions: [...params.instructions],
		existingSkill: params.existingSkill,
		content: [
			`# ${params.title}`,
			"",
			"## Procedure",
			"",
			...rules.map((rule) => `- ${rule}`),
			"",
			"## Verification",
			"",
			"- Verify the result follows every procedure step."
		].join("\n")
	};
}
function extractDurableInstructions(messages) {
	const instructions = [];
	for (const entry of extractTranscriptText(messages)) {
		if (entry.role !== "user") continue;
		const active = {
			enabled: false,
			taskClass: ""
		};
		for (const sentence of splitInstructionCandidates(entry.text)) {
			const markedInstruction = extractInstruction(sentence);
			const instruction = markedInstruction ?? (active.enabled && sentence.length >= 12 && sentence.length <= 1200 && isUnmarkedDirective(sentence) ? active.taskClass ? `For ${active.taskClass}: ${compactWhitespace(sentence)}\uE000${compactWhitespace(sentence)}` : compactWhitespace(sentence) : void 0);
			const parsed = instruction ? parseInstruction(instruction) : void 0;
			const bareComplaint = markedInstruction && /(?:\b(?:not what i (?:asked|meant|said|wanted)|repeat myself)\b|^(?:you(?:'re|’re| are)\s+)?still (?:doing|ignoring|making|using)\b)/i.test(markedInstruction);
			active.enabled = Boolean(parsed?.rules.length || bareComplaint);
			active.taskClass = parsed?.taskClass ?? (markedInstruction ? "" : active.taskClass);
			const taskTokens = parsed?.taskClass ? deriveTopicTokens(parsed.taskClass) : [];
			const topicTokens = taskTokens.length > 0 ? taskTokens : deriveTopicTokens(parsed?.rules.join(" ") ?? "", true);
			if (instruction && parsed && parsed.rules.length > 0 && topicTokens.length > 0 && !instructions.includes(instruction)) instructions.push(instruction);
		}
	}
	return instructions.slice(-8);
}
function groupDurableInstructionProposals(params) {
	const groups = /* @__PURE__ */ new Map();
	for (const instruction of params.instructions) {
		const parsed = parseInstruction(instruction);
		if (!parsed || parsed.rules.length === 0) continue;
		const taskTokens = parsed.taskClass ? deriveTopicTokens(parsed.taskClass) : [];
		const inferredName = boundSkillName((taskTokens.length > 0 ? taskTokens : deriveTopicTokens(parsed.rules.join(" "), true)).join("-"));
		if (!inferredName) continue;
		const existingSkills = params.existingSkills ?? [];
		const equivalentExistingName = findEquivalentName(inferredName, existingSkills.map((skill) => normalizeSkillIndexName(skill.name)));
		const equivalentExisting = existingSkills.find((skill) => normalizeSkillIndexName(skill.name) === equivalentExistingName);
		const fuzzyExisting = equivalentExisting ? void 0 : matchExistingSkill(instruction, existingSkills);
		const existing = equivalentExisting ?? fuzzyExisting;
		const skillName = existing?.name ?? findEquivalentName(inferredName, groups.keys()) ?? inferredName;
		const namespaceOnly = parsed.taskClass && skillName.split("-").length === 1 && /\b[a-z0-9]+hub\b/i.test(parsed.taskClass);
		const rules = taskTokens.length > 0 && Boolean(namespaceOnly || fuzzyExisting) ? parsed.rules.map((rule) => /^For\b/.test(rule) ? rule : `For ${parsed.taskClass}: ${rule}`) : parsed.rules;
		const group = groups.get(skillName);
		if (group) {
			group.instructions.push(instruction.split("").at(-1) ?? instruction);
			group.rules.push(...rules);
			groups.delete(skillName);
			groups.set(skillName, group);
		} else groups.set(skillName, {
			title: titleFromSkillName(existing?.name ?? skillName),
			rules: [...rules],
			instructions: [instruction.split("").at(-1) ?? instruction],
			existingSkill: Boolean(existing)
		});
	}
	const proposals = [];
	for (const [skillName, group] of [...groups.entries()].slice(-(params.maxProposals ?? 3))) {
		const proposal = buildProposal({
			skillName,
			...group
		});
		if (proposal) proposals.push(proposal);
	}
	return proposals;
}
//#endregion
//#region src/skills/research/autocapture.ts
const log = createSubsystemLogger("skills/research");
const AUTO_CAPTURE_BLOCKED_TRIGGERS = /* @__PURE__ */ new Set([
	"cron",
	"heartbeat",
	"memory",
	"overflow"
]);
const AUTO_CAPTURE_BLOCKED_SESSION_SEGMENTS = /* @__PURE__ */ new Set([
	"cron",
	"hook",
	"subagent",
	"skill-workshop-review"
]);
const TOOL_CALL_BLOCK_TYPES = /* @__PURE__ */ new Set([
	"toolCall",
	"tool_use",
	"function_call"
]);
const SKILL_WORKSHOP_MUTATING_ACTIONS = /* @__PURE__ */ new Set([
	"create",
	"update",
	"revise"
]);
const skillCaptureQueue = new KeyedAsyncQueue();
function buildAutoCaptureUpdateContent(existingSkill, capturedContent) {
	return [
		existingSkill.trimEnd(),
		"",
		"## Captured Update",
		"",
		capturedContent.trim(),
		""
	].join("\n");
}
function isSkillResearchAutoCaptureEligible(ctx) {
	const trigger = ctx.trigger?.trim().toLowerCase();
	if (trigger && AUTO_CAPTURE_BLOCKED_TRIGGERS.has(trigger)) return false;
	const sessionKey = ctx.sessionKey?.trim().toLowerCase();
	if (!sessionKey) return true;
	if (sessionKey.includes("active-memory")) return false;
	return !sessionKey.split(":").some((segment) => AUTO_CAPTURE_BLOCKED_SESSION_SEGMENTS.has(segment));
}
function readToolCallAction(value) {
	let input = value;
	if (typeof input === "string") try {
		input = JSON.parse(input);
	} catch {
		return;
	}
	if (!input || typeof input !== "object" || Array.isArray(input)) return;
	const action = input.action;
	return typeof action === "string" ? action.trim().toLowerCase() : void 0;
}
function isSkillWorkshopMutationBlock(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	const block = value;
	if (!TOOL_CALL_BLOCK_TYPES.has(String(block.type))) return false;
	if (typeof block.name !== "string" || block.name.trim().toLowerCase() !== "skill_workshop") return false;
	const action = readToolCallAction(block.arguments ?? block.input ?? block.args);
	return action ? SKILL_WORKSHOP_MUTATING_ACTIONS.has(action) : false;
}
function hasUnfailedSkillWorkshopMutationCall(messages) {
	const callIds = /* @__PURE__ */ new Set();
	let hasUnidentifiedCall = false;
	for (const message of messages) {
		if (!message || typeof message !== "object" || Array.isArray(message)) continue;
		const content = message.content;
		const blocks = Array.isArray(content) ? content : [content];
		for (const block of blocks) {
			if (!isSkillWorkshopMutationBlock(block)) continue;
			const id = block && typeof block === "object" && !Array.isArray(block) ? block.id : void 0;
			if (typeof id === "string" && id) callIds.add(id);
			else hasUnidentifiedCall = true;
		}
	}
	if (hasUnidentifiedCall) return true;
	for (const message of messages) {
		if (!message || typeof message !== "object" || Array.isArray(message)) continue;
		const result = message;
		if (result.role === "toolResult" && result.isError === true && typeof result.toolCallId === "string") callIds.delete(result.toolCallId);
	}
	return callIds.size > 0;
}
function currentTurnMessages(messages) {
	for (let index = messages.length - 1; index >= 0; index -= 1) {
		const message = messages[index];
		if (message && typeof message === "object" && !Array.isArray(message) && message.role === "user") return messages.slice(index);
	}
	return messages;
}
function fingerprintInstructions(instructions) {
	return sha256Hex(instructions.map((instruction) => compactWhitespace(instruction).toLowerCase()).join("\n"));
}
function proposalSignalHashes(proposal) {
	return [.../* @__PURE__ */ new Set([...proposal.instructions.map((instruction) => fingerprintInstructions([instruction])), fingerprintInstructions(proposal.instructions)])];
}
function instructionSignalHashes(instructions) {
	return [...new Set(instructions.map((instruction) => fingerprintInstructions([instruction])))];
}
function buildProposalOrigin(ctx) {
	return {
		...ctx.agentId ? { agentId: ctx.agentId } : {},
		...ctx.sessionKey ? { sessionKey: ctx.sessionKey } : {},
		...ctx.runId ? { runId: ctx.runId } : {}
	};
}
/**
* Captures or suggests durable skill research signals from a completed session turn.
*
* Runs regardless of the turn's success flag: the extracted signals are the user's own words,
* which stay valid when a run fails — corrections given in a failed or timed-out turn are the
* ones most worth keeping.
*/
async function runSkillResearchAutoCapture(params) {
	const workshopConfig = resolveSkillWorkshopConfig(params.config);
	const workspaceDir = params.ctx.workspaceDir;
	if (!workspaceDir) return;
	if (!isSkillResearchAutoCaptureEligible(params.ctx)) return;
	const sessionKey = params.ctx.sessionKey?.trim();
	if (!sessionKey) return;
	const sessionScope = {
		agentId: params.ctx.agentId,
		sessionKey,
		storePath: resolveStorePath(params.config?.session?.store, { agentId: params.ctx.agentId })
	};
	await skillCaptureQueue.enqueue(workspaceDir, async () => {
		const turnMessages = currentTurnMessages(params.event.messages);
		if (hasUnfailedSkillWorkshopMutationCall(turnMessages)) {
			const signalHashes = extractDurableInstructions([...turnMessages]).map((instruction) => fingerprintInstructions([instruction]));
			await recordSessionSkillCaptureSignals({
				...sessionScope,
				signalHashes
			});
			return;
		}
		const capturedSignalHashes = readSessionSkillCaptureSignalHashes(sessionScope);
		if (!capturedSignalHashes) return;
		const capturedSignals = new Set(capturedSignalHashes);
		const instructions = extractDurableInstructions(params.event.messages).filter((instruction) => !capturedSignals.has(fingerprintInstructions([instruction])));
		if (instructions.length === 0) return;
		const existingSkills = listWritableWorkspaceSkillSummaries(workspaceDir, {
			config: params.config,
			agentId: params.ctx.agentId
		});
		const proposals = groupDurableInstructionProposals({
			instructions,
			existingSkills
		});
		if (proposals.length === 0) return;
		const manifest = await listSkillProposals({ workspaceDir });
		const allInstructionSignalHashes = instructionSignalHashes(instructions);
		if (workshopConfig.autonomous.mode === "off") {
			const proposal = proposals.at(-1);
			if (!proposal) return;
			const signalHashes = proposalSignalHashes(proposal);
			const signalHash = signalHashes.at(-1);
			if (!signalHash || capturedSignals.has(signalHash)) return;
			if (manifest.proposals.some((entry) => (entry.status === "pending" || entry.status === "quarantined") && entry.skillKey === proposal.skillName)) {
				await recordSessionSkillCaptureSignals({
					...sessionScope,
					signalHashes: [...allInstructionSignalHashes, ...signalHashes]
				});
				return;
			}
			try {
				if (!proposal.existingSkill) {
					if (await readWorkspaceSkillFile(resolveSkillProposalTarget({
						workspaceDir,
						skillName: proposal.skillName
					}).skillFile) !== null) {
						await recordSessionSkillCaptureSignals({
							...sessionScope,
							signalHashes: [...allInstructionSignalHashes, ...signalHashes]
						});
						return;
					}
				}
				if (await recordSessionSkillSuggestion({
					...sessionScope,
					skillName: proposal.skillName,
					signalHash,
					relatedSignalHashes: [...allInstructionSignalHashes, ...signalHashes.slice(0, -1)]
				})) log.info(`skill research queued suggestion ${proposal.skillName}`);
			} catch (error) {
				log.warn(`skill research suggestion skipped: ${String(error)}`);
			}
			return;
		}
		const selectedInstructionHashes = new Set(proposals.flatMap((proposal) => instructionSignalHashes(proposal.instructions)));
		await recordSessionSkillCaptureSignals({
			...sessionScope,
			signalHashes: allInstructionSignalHashes.filter((hash) => !selectedInstructionHashes.has(hash))
		});
		for (const proposal of proposals) {
			const signalHashes = proposalSignalHashes(proposal);
			const signalHash = signalHashes.at(-1);
			if (!signalHash || capturedSignals.has(signalHash)) continue;
			const claimedSignalHashes = await claimSessionSkillCaptureSignals({
				...sessionScope,
				signalHash,
				signalHashes
			});
			if (!claimedSignalHashes) continue;
			for (const hash of claimedSignalHashes) capturedSignals.add(hash);
			try {
				const sameSkillEntries = manifest.proposals.filter((entry) => entry.skillKey === proposal.skillName);
				if (sameSkillEntries.some((entry) => entry.status === "quarantined")) {
					await recordSessionSkillCaptureSignals({
						...sessionScope,
						signalHashes
					});
					continue;
				}
				const pendingEntries = sameSkillEntries.filter((entry) => entry.status === "pending");
				let autocapturePending;
				for (const entry of pendingEntries) {
					const inspected = await inspectSkillProposal(entry.id, { workspaceDir });
					if (inspected?.record.createdBy === "skill-workshop") {
						autocapturePending = inspected;
						break;
					}
				}
				if (pendingEntries.length > 0 && !autocapturePending) {
					await recordSessionSkillCaptureSignals({
						...sessionScope,
						signalHashes
					});
					continue;
				}
				const existingSkill = await readWorkspaceSkillFile(existingSkills.find((entry) => entry.name === proposal.skillName)?.filePath ?? resolveSkillProposalTarget({
					workspaceDir,
					skillName: proposal.skillName
				}).skillFile);
				const result = autocapturePending ? await reviseSkillProposal({
					workspaceDir,
					config: params.config,
					proposalId: autocapturePending.record.id,
					content: buildAutoCaptureUpdateContent(stripProposalFrontmatterForSkill(autocapturePending.content), proposal.content),
					evidence: [autocapturePending.record.evidence, proposal.evidence].filter((value) => Boolean(value)).join("\n")
				}) : existingSkill === null ? await proposeCreateSkill({
					workspaceDir,
					config: params.config,
					name: proposal.skillName,
					description: proposal.description,
					content: proposal.content,
					createdBy: "skill-workshop",
					autonomousCapture: true,
					origin: buildProposalOrigin(params.ctx),
					goal: proposal.goal,
					evidence: proposal.evidence
				}) : await proposeUpdateSkill({
					workspaceDir,
					config: params.config,
					agentId: params.ctx.agentId,
					skillName: proposal.skillName,
					description: proposal.description,
					content: buildAutoCaptureUpdateContent(existingSkill, proposal.content),
					createdBy: "skill-workshop",
					autonomousCapture: true,
					origin: buildProposalOrigin(params.ctx),
					goal: proposal.goal,
					evidence: proposal.evidence
				});
				log.info(`skill research auto-capture queued workshop proposal ${result.record.target.skillKey}`);
				if (workshopConfig.autonomous.mode === "auto" && params.ctx.skillWorkshopAvailable === true) await autoApplySkillProposal({
					workspaceDir,
					...params.ctx.agentId ? { agentId: params.ctx.agentId } : {},
					...params.config ? { config: params.config } : {},
					proposalId: result.record.id,
					skillName: result.record.target.skillName
				});
			} catch (error) {
				await releaseSessionSkillCaptureSignals({
					...sessionScope,
					signalHashes: claimedSignalHashes
				});
				for (const hash of claimedSignalHashes) capturedSignals.delete(hash);
				log.warn(`skill research auto-capture skipped ${proposal.skillName}: ${String(error)}`);
			}
		}
	});
}
//#endregion
export { runSkillResearchAutoCapture };
