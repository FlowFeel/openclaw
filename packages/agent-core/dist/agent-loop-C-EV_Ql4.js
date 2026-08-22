import { t as resolveAgentReasoningOption } from "./reasoning-D-xemFxK.js";
import { resolveAgentCoreStreamFn } from "./runtime-deps.js";
import { validateToolArguments } from "./validation.js";
import { EventStream } from "@openclaw/ai/event-stream";
import { AsyncLocalStorage } from "node:async_hooks";
//#region packages/agent-core/src/errors.ts
const TRANSCRIPT_NOT_CONTINUABLE_ERROR_CODE = "openclaw_transcript_not_continuable";
var TranscriptNotContinuableError = class extends Error {
	constructor(role) {
		super(`Cannot continue from message role: ${role}`);
		this.code = TRANSCRIPT_NOT_CONTINUABLE_ERROR_CODE;
		this.name = "TranscriptNotContinuableError";
		this.role = role;
	}
};
//#endregion
//#region packages/agent-core/src/harness/session/uuid.ts
let lastTimestamp = -Infinity;
let sequence = 0;
function fillRandomBytes(bytes) {
	const crypto = globalThis.crypto;
	if (crypto?.getRandomValues) {
		crypto.getRandomValues(bytes);
		return;
	}
	for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
}
/** Generate a monotonic UUIDv7 string. */
function uuidv7() {
	const random = /* @__PURE__ */ new Uint8Array(16);
	fillRandomBytes(random);
	const timestamp = Date.now();
	if (timestamp > lastTimestamp) {
		sequence = new DataView(random.buffer, random.byteOffset + 6, 4).getUint32(0);
		lastTimestamp = timestamp;
	} else {
		sequence = sequence + 1 >>> 0;
		if (sequence === 0) lastTimestamp++;
	}
	const bytes = /* @__PURE__ */ new Uint8Array(16);
	bytes[0] = lastTimestamp / 1099511627776 & 255;
	bytes[1] = lastTimestamp / 4294967296 & 255;
	bytes[2] = lastTimestamp / 16777216 & 255;
	bytes[3] = lastTimestamp / 65536 & 255;
	bytes[4] = lastTimestamp / 256 & 255;
	bytes[5] = lastTimestamp & 255;
	bytes[6] = 112 | sequence >>> 28 & 15;
	bytes[7] = sequence >>> 20 & 255;
	bytes[8] = 128 | sequence >>> 14 & 63;
	bytes[9] = sequence >>> 6 & 255;
	const randomLowBits = random.at(10);
	if (randomLowBits === void 0) throw new Error("UUID random buffer is shorter than 11 bytes");
	bytes[10] = (sequence & 63) << 2 | randomLowBits & 3;
	bytes.set(random.subarray(11), 11);
	return formatUuid(bytes);
}
function formatUuid(bytes) {
	const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
	return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}
//#endregion
//#region packages/agent-core/src/tool-execution-context.ts
const activeToolExecution = new AsyncLocalStorage();
function runWithAgentToolExecutionContext(context, run) {
	return activeToolExecution.run(context, run);
}
//#endregion
//#region packages/agent-core/src/turn-interruption.ts
/** Canonical empty aborted/error assistant recorded when a run ends without output. */
function createFailureMessage(model, error, aborted) {
	return {
		role: "assistant",
		content: [{
			type: "text",
			text: ""
		}],
		api: model.api,
		provider: model.provider,
		model: model.id,
		stopReason: aborted ? "aborted" : "error",
		errorMessage: error instanceof Error ? error.message : String(error),
		timestamp: Date.now(),
		usage: {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0,
			totalTokens: 0,
			cost: {
				input: 0,
				output: 0,
				cacheRead: 0,
				cacheWrite: 0,
				total: 0
			}
		}
	};
}
const INTERRUPTED_TURN_GUIDANCE = `<turn_aborted>
The previous turn was interrupted. Any running background processes may still be active. If any tools or commands were aborted, they may have partially executed.
</turn_aborted>`;
/**
* Aborts that end a turn as an intentional handoff (e.g. yield-style tools)
* mark it with an abort reason carrying `turnHandoff: true`. Interruption
* guidance is skipped for them: the next turn would otherwise be told tools
* may have partially executed after a clean, deliberate stop.
*/
function isTurnHandoffAbort(signal) {
	if (!signal?.aborted) return false;
	const reason = signal.reason;
	return typeof reason === "object" && reason !== null && reason.turnHandoff === true;
}
function createInterruptedTurnMessage() {
	return {
		role: "custom",
		customType: "openclaw:turn-aborted",
		content: INTERRUPTED_TURN_GUIDANCE,
		display: false,
		timestamp: Date.now()
	};
}
async function appendInterruptedTurnMessage(messages, emit) {
	const interruption = createInterruptedTurnMessage();
	messages.push(interruption);
	await emit({
		type: "message_start",
		message: interruption
	});
	await emit({
		type: "message_end",
		message: interruption
	});
}
function normalizeCoreContextMessages(messages) {
	return messages.map((message) => {
		if (message.role !== "custom" || message.customType !== "openclaw:turn-aborted") return message;
		return {
			role: "user",
			content: typeof message.content === "string" ? [{
				type: "text",
				text: message.content
			}] : message.content,
			timestamp: message.timestamp
		};
	});
}
//#endregion
//#region packages/agent-core/src/agent-loop.ts
const EventStreamConstructor = EventStream;
function appendTextDeltaToAssistantMessage(message, contentIndex, delta) {
	const content = [...message.content];
	const currentContent = content[contentIndex];
	content[contentIndex] = currentContent?.type === "text" ? {
		...currentContent,
		text: currentContent.text + delta
	} : {
		type: "text",
		text: delta
	};
	return {
		...message,
		content
	};
}
function resolveAssistantMessageUpdate(event, currentMessage) {
	if ("partial" in event && event.partial) return event.partial;
	if (event.type === "text_delta") return appendTextDeltaToAssistantMessage(currentMessage, event.contentIndex, event.delta);
	return currentMessage;
}
function removeNonExecutableToolCalls(message) {
	if (message.stopReason === "toolUse") return message;
	const content = message.content.filter((item) => item.type !== "toolCall");
	return content.length === message.content.length ? message : {
		...message,
		content
	};
}
function ensureToolTurnIdentity(message) {
	if (message.stopReason !== "toolUse" || message.responseId?.trim() || message.turnId?.trim()) return message;
	return {
		...message,
		turnId: uuidv7()
	};
}
/**
* Start an agent loop with a new prompt message.
* The prompt is added to the context and events are emitted for it.
*/
function agentLoop(prompts, context, config, signal, streamFn, runtime) {
	const stream = createAgentStream();
	runAgentLoop(prompts, context, config, async (event) => {
		stream.push(event);
	}, signal, streamFn, runtime).then((messages) => {
		stream.end(messages);
	}).catch((error) => {
		pushLoopFailure(stream, config, error, signal);
	});
	return stream;
}
/**
* Continue an agent loop from the current context without adding a new message.
* Used for retries - context already has user message or tool results.
*
* **Important:** The last message in context must convert to a `user` or `toolResult` message
* via `convertToLlm`. If it doesn't, the LLM provider will reject the request.
* This cannot be validated here since `convertToLlm` is only called once per turn.
*/
function agentLoopContinue(context, config, signal, streamFn, runtime) {
	const lastMessage = context.messages.at(-1);
	if (!lastMessage) throw new Error("Cannot continue: no messages in context");
	if (lastMessage.role === "assistant") throw new TranscriptNotContinuableError(lastMessage.role);
	const stream = createAgentStream();
	runAgentLoopContinue(context, config, async (event) => {
		stream.push(event);
	}, signal, streamFn, runtime).then((messages) => {
		stream.end(messages);
	}).catch((error) => {
		pushLoopFailure(stream, config, error, signal);
	});
	return stream;
}
/** Run a prompt-started loop and emit events through a caller-owned sink. */
async function runAgentLoop(prompts, context, config, emit, signal, streamFn, runtime) {
	const newMessages = [...prompts];
	const currentContext = {
		...context,
		messages: [...context.messages, ...prompts]
	};
	await emit({ type: "agent_start" });
	await emit({ type: "turn_start" });
	for (const prompt of prompts) {
		await emit({
			type: "message_start",
			message: prompt
		});
		await emit({
			type: "message_end",
			message: prompt
		});
	}
	await runLoop(currentContext, newMessages, config, signal, emit, streamFn, runtime);
	return newMessages;
}
/** Continue an existing loop context and emit only newly produced messages. */
async function runAgentLoopContinue(context, config, emit, signal, streamFn, runtime) {
	const lastMessage = context.messages.at(-1);
	if (!lastMessage) throw new Error("Cannot continue: no messages in context");
	if (lastMessage.role === "assistant") throw new TranscriptNotContinuableError(lastMessage.role);
	const newMessages = [];
	const currentContext = { ...context };
	await emit({ type: "agent_start" });
	await emit({ type: "turn_start" });
	await runLoop(currentContext, newMessages, config, signal, emit, streamFn, runtime);
	return newMessages;
}
function createAgentStream() {
	return new EventStreamConstructor((event) => event.type === "agent_end", (event) => event.type === "agent_end" ? event.messages : []);
}
function pushLoopFailure(stream, config, error, signal) {
	const aborted = signal?.aborted === true;
	const failureMessage = createFailureMessage(config.model, error, aborted);
	stream.push({
		type: "message_start",
		message: failureMessage
	});
	stream.push({
		type: "message_end",
		message: failureMessage
	});
	stream.push({
		type: "turn_end",
		message: failureMessage,
		toolResults: []
	});
	const messages = [failureMessage];
	if (aborted && !isTurnHandoffAbort(signal)) {
		const interruption = createInterruptedTurnMessage();
		messages.push(interruption);
		stream.push({
			type: "message_start",
			message: interruption
		});
		stream.push({
			type: "message_end",
			message: interruption
		});
	}
	stream.push({
		type: "agent_end",
		messages
	});
}
/**
* Main loop logic shared by agentLoop and agentLoopContinue.
*/
async function runLoop(initialContext, newMessages, initialConfig, signal, emit, streamFn, runtime) {
	let currentContext = initialContext;
	let config = initialConfig;
	let firstTurn = true;
	let turnOpen = true;
	let turnTainted = isActiveTurnTainted(initialContext.messages);
	let pendingMessages = await config.getSteeringMessages?.() || [];
	const stopIfAborted = async () => {
		if (!signal?.aborted) return false;
		const abortedMessage = withAssistantTurnTaint(createFailureMessage(config.model, signal.reason instanceof Error ? signal.reason : /* @__PURE__ */ new Error("Agent run aborted"), true), turnTainted);
		newMessages.push(abortedMessage);
		if (!turnOpen) {
			await emit({ type: "turn_start" });
			turnOpen = true;
		}
		await emit({
			type: "message_start",
			message: abortedMessage
		});
		await emit({
			type: "message_end",
			message: abortedMessage
		});
		await emit({
			type: "turn_end",
			message: abortedMessage,
			toolResults: []
		});
		turnOpen = false;
		if (!isTurnHandoffAbort(signal)) await appendInterruptedTurnMessage(newMessages, emit);
		await emit({
			type: "agent_end",
			messages: newMessages
		});
		return true;
	};
	while (true) {
		let hasMoreToolCalls = true;
		while (hasMoreToolCalls || pendingMessages.length > 0) {
			if (await stopIfAborted()) return;
			if (!firstTurn) {
				await emit({ type: "turn_start" });
				turnOpen = true;
			} else firstTurn = false;
			if (pendingMessages.length > 0) for (const message of pendingMessages) {
				if (message.role === "user") turnTainted = false;
				await emit({
					type: "message_start",
					message
				});
				await emit({
					type: "message_end",
					message
				});
				currentContext.messages.push(message);
				newMessages.push(message);
			}
			if (await stopIfAborted()) return;
			const message = await streamAssistantResponse(currentContext, config, signal, emit, streamFn, runtime, turnTainted);
			newMessages.push(message);
			if (message.stopReason === "error" || message.stopReason === "aborted") {
				await emit({
					type: "turn_end",
					message,
					toolResults: []
				});
				if (message.stopReason === "aborted" && signal?.aborted && !isTurnHandoffAbort(signal)) await appendInterruptedTurnMessage(newMessages, emit);
				await emit({
					type: "agent_end",
					messages: newMessages
				});
				return;
			}
			const toolCalls = message.content.filter((c) => c.type === "toolCall");
			const toolResults = [];
			hasMoreToolCalls = false;
			if (message.stopReason === "toolUse" && toolCalls.length > 0) {
				const executedToolBatch = await executeToolCalls(currentContext, message, config, signal, emit);
				toolResults.push(...executedToolBatch.messages);
				turnTainted ||= toolResults.some(toolResultTaintsTurn);
				hasMoreToolCalls = !executedToolBatch.terminate;
				for (const result of toolResults) {
					currentContext.messages.push(result);
					newMessages.push(result);
				}
			}
			await emit({
				type: "turn_end",
				message,
				toolResults
			});
			turnOpen = false;
			if (await stopIfAborted()) return;
			const nextTurnContext = {
				message,
				toolResults,
				context: currentContext,
				newMessages
			};
			const nextTurnSnapshot = await config.prepareNextTurn?.(nextTurnContext);
			if (nextTurnSnapshot) {
				currentContext = nextTurnSnapshot.context ?? currentContext;
				const nextModel = nextTurnSnapshot.model ?? config.model;
				const nextThinkingLevel = nextTurnSnapshot.thinkingLevel ?? config.thinkingLevel;
				const nextReasoning = (nextTurnSnapshot.thinkingLevel !== void 0 || nextTurnSnapshot.model !== void 0 && nextThinkingLevel !== void 0) && nextThinkingLevel !== void 0 ? resolveAgentReasoningOption(nextModel, nextThinkingLevel) : config.reasoning;
				config = Object.assign({}, config, {
					model: nextModel,
					thinkingLevel: nextThinkingLevel,
					reasoning: nextReasoning
				});
			}
			if (await stopIfAborted()) return;
			if (await config.shouldStopAfterTurn?.({
				message,
				toolResults,
				context: currentContext,
				newMessages
			})) {
				await emit({
					type: "agent_end",
					messages: newMessages
				});
				return;
			}
			pendingMessages = await config.getSteeringMessages?.() || [];
			if (await stopIfAborted()) return;
		}
		const followUpMessages = await config.getFollowUpMessages?.() || [];
		if (followUpMessages.length > 0) {
			pendingMessages = followUpMessages;
			continue;
		}
		break;
	}
	await emit({
		type: "agent_end",
		messages: newMessages
	});
}
/**
* Stream an assistant response from the LLM.
* This is where AgentMessage[] gets transformed to Message[] for the LLM.
*/
async function streamAssistantResponse(context, config, signal, emit, streamFn, runtime, turnTainted = false) {
	let messages = context.messages;
	if (config.transformContext) messages = await config.transformContext(messages, signal);
	messages = normalizeCoreContextMessages(messages);
	const llmMessages = await config.convertToLlm(messages);
	const llmContext = {
		systemPrompt: context.systemPrompt,
		messages: llmMessages,
		tools: context.tools
	};
	const streamFunction = resolveAgentCoreStreamFn(runtime, streamFn);
	const resolvedApiKey = (config.getApiKey ? await config.getApiKey(config.model.provider) : void 0) || config.apiKey;
	const response = await streamFunction(config.model, llmContext, {
		...config,
		apiKey: resolvedApiKey,
		signal
	});
	let partialMessage = null;
	let addedPartial = false;
	for await (const event of response) switch (event.type) {
		case "start": {
			const message = event.partial;
			partialMessage = message;
			context.messages.push(message);
			addedPartial = true;
			await emit({
				type: "message_start",
				message: { ...message }
			});
			break;
		}
		case "text_start":
		case "text_delta":
		case "text_end":
		case "thinking_start":
		case "thinking_delta":
		case "thinking_end":
		case "toolcall_start":
		case "toolcall_delta":
		case "toolcall_end":
			if (partialMessage) {
				const message = resolveAssistantMessageUpdate(event, partialMessage);
				partialMessage = message;
				context.messages[context.messages.length - 1] = message;
				await emit({
					type: "message_update",
					assistantMessageEvent: event,
					message: { ...message }
				});
			}
			break;
		case "done":
		case "error": {
			const finalMessage = withAssistantTurnTaint(ensureToolTurnIdentity(removeNonExecutableToolCalls(await response.result())), turnTainted);
			if (addedPartial) context.messages[context.messages.length - 1] = finalMessage;
			else context.messages.push(finalMessage);
			if (!addedPartial) await emit({
				type: "message_start",
				message: { ...finalMessage }
			});
			await emit({
				type: "message_end",
				message: finalMessage
			});
			return finalMessage;
		}
	}
	const finalMessage = withAssistantTurnTaint(ensureToolTurnIdentity(removeNonExecutableToolCalls(await response.result())), turnTainted);
	if (addedPartial) context.messages[context.messages.length - 1] = finalMessage;
	else {
		context.messages.push(finalMessage);
		await emit({
			type: "message_start",
			message: { ...finalMessage }
		});
	}
	await emit({
		type: "message_end",
		message: finalMessage
	});
	return finalMessage;
}
/**
* Execute tool calls from an assistant message.
*/
async function executeToolCalls(currentContext, assistantMessage, config, signal, emit) {
	const toolCalls = assistantMessage.content.filter((c) => c.type === "toolCall");
	const resolvedToolCalls = /* @__PURE__ */ new Map();
	let hasSequentialToolCall = false;
	if (config.toolExecution !== "sequential") for (const toolCall of toolCalls) {
		const resolution = await resolveToolCallTool(currentContext, assistantMessage, toolCall, config, signal, resolvedToolCalls);
		if (resolution.kind === "resolved" && resolution.tool?.executionMode === "sequential") {
			hasSequentialToolCall = true;
			break;
		}
		if (signal?.aborted) break;
	}
	if (config.toolExecution === "sequential" || hasSequentialToolCall) return executeToolCallsSequential(currentContext, assistantMessage, toolCalls, resolvedToolCalls, config, signal, emit);
	return executeToolCallsParallel(currentContext, assistantMessage, toolCalls, resolvedToolCalls, config, signal, emit);
}
function hidesToolCallFromChannelProgress(context, toolCall, resolvedToolCalls) {
	const resolution = resolvedToolCalls.get(toolCall);
	return (resolution?.kind === "resolved" ? resolution.tool : context.tools?.find((candidate) => candidate.name === toolCall.name))?.hideFromChannelProgress === true;
}
async function executeToolCallsSequential(currentContext, assistantMessage, toolCalls, resolvedToolCalls, config, signal, emit) {
	const finalizedCalls = [];
	const messages = [];
	for (const toolCall of toolCalls) {
		const hideFromChannelProgress = hidesToolCallFromChannelProgress(currentContext, toolCall, resolvedToolCalls);
		await emit({
			type: "tool_execution_start",
			toolCallId: toolCall.id,
			toolName: toolCall.name,
			args: toolCall.arguments,
			...hideFromChannelProgress ? { hideFromChannelProgress: true } : {}
		});
		const preparation = await prepareToolCall(currentContext, assistantMessage, toolCall, config, signal, resolvedToolCalls);
		let finalized;
		if (preparation.kind === "immediate") finalized = await finalizeToolCallOutcome(currentContext, assistantMessage, {
			toolCall,
			result: preparation.result,
			isError: preparation.isError,
			executionStarted: false,
			...preparation.errorKind ? { errorKind: preparation.errorKind } : {},
			...hideFromChannelProgress ? { hideFromChannelProgress: true } : {}
		}, toolCall.arguments, config, signal);
		else finalized = await finalizeExecutedToolCall(currentContext, assistantMessage, preparation, await executePreparedToolCall(preparation, {
			assistantMessage,
			toolCall: preparation.toolCall
		}, signal, emit), config, signal);
		await emitToolExecutionEnd(finalized, emit);
		const toolResultMessage = createToolResultMessage(finalized);
		await emitToolResultMessage(toolResultMessage, emit);
		finalizedCalls.push(finalized);
		messages.push(toolResultMessage);
		if (signal?.aborted) {
			for (let i = finalizedCalls.length; i < toolCalls.length; i++) {
				const skippedToolCall = toolCalls[i];
				if (!skippedToolCall) continue;
				const completed = await completeAbortedToolCall(currentContext, assistantMessage, skippedToolCall, resolvedToolCalls, config, signal, emit);
				finalizedCalls.push(completed.finalized);
				messages.push(completed.message);
			}
			break;
		}
	}
	return {
		messages,
		terminate: shouldTerminateToolBatch(finalizedCalls)
	};
}
async function executeToolCallsParallel(currentContext, assistantMessage, toolCalls, resolvedToolCalls, config, signal, emit) {
	const finalizedCalls = [];
	for (const toolCall of toolCalls) {
		const hideFromChannelProgress = hidesToolCallFromChannelProgress(currentContext, toolCall, resolvedToolCalls);
		await emit({
			type: "tool_execution_start",
			toolCallId: toolCall.id,
			toolName: toolCall.name,
			args: toolCall.arguments,
			...hideFromChannelProgress ? { hideFromChannelProgress: true } : {}
		});
		const preparation = await prepareToolCall(currentContext, assistantMessage, toolCall, config, signal, resolvedToolCalls);
		if (preparation.kind === "immediate") {
			const finalized = await finalizeToolCallOutcome(currentContext, assistantMessage, {
				toolCall,
				result: preparation.result,
				isError: preparation.isError,
				executionStarted: false,
				...preparation.errorKind ? { errorKind: preparation.errorKind } : {},
				...hideFromChannelProgress ? { hideFromChannelProgress: true } : {}
			}, toolCall.arguments, config, signal);
			await emitToolExecutionEnd(finalized, emit);
			finalizedCalls.push(finalized);
			if (signal?.aborted) break;
			continue;
		}
		finalizedCalls.push(async () => {
			const executed = await executePreparedToolCall(preparation, {
				assistantMessage,
				toolCall: preparation.toolCall
			}, signal, emit);
			const finalized = await finalizeExecutedToolCall(currentContext, assistantMessage, preparation, executed, config, signal);
			await emitToolExecutionEnd(finalized, emit);
			return finalized;
		});
		if (signal?.aborted) break;
	}
	const orderedFinalizedCalls = await Promise.all(finalizedCalls.map((entry) => typeof entry === "function" ? entry() : Promise.resolve(entry)));
	const messages = [];
	for (const finalized of orderedFinalizedCalls) {
		const toolResultMessage = createToolResultMessage(finalized);
		await emitToolResultMessage(toolResultMessage, emit);
		messages.push(toolResultMessage);
	}
	if (signal?.aborted && orderedFinalizedCalls.length < toolCalls.length) for (let i = orderedFinalizedCalls.length; i < toolCalls.length; i++) {
		const skippedToolCall = toolCalls[i];
		if (!skippedToolCall) continue;
		const completed = await completeAbortedToolCall(currentContext, assistantMessage, skippedToolCall, resolvedToolCalls, config, signal, emit);
		orderedFinalizedCalls.push(completed.finalized);
		messages.push(completed.message);
	}
	return {
		messages,
		terminate: shouldTerminateToolBatch(orderedFinalizedCalls)
	};
}
function shouldTerminateToolBatch(finalizedCalls) {
	return finalizedCalls.length > 0 && finalizedCalls.every((finalized) => finalized.result.terminate === true);
}
function prepareToolCallArguments(tool, toolCall) {
	if (!tool.prepareArguments) return toolCall;
	const preparedArguments = tool.prepareArguments(toolCall.arguments);
	if (preparedArguments === toolCall.arguments) return toolCall;
	return {
		...toolCall,
		arguments: preparedArguments
	};
}
async function resolveToolCallTool(currentContext, assistantMessage, toolCall, config, signal, resolvedToolCalls) {
	const cached = resolvedToolCalls?.get(toolCall);
	if (cached) return cached;
	let resolution;
	try {
		let tool = currentContext.tools?.find((t) => t.name === toolCall.name);
		if (!tool) {
			const resolvedTool = await config.resolveDeferredTool?.({
				assistantMessage,
				toolCall,
				context: currentContext
			}, signal);
			if (resolvedTool && resolvedTool.name !== toolCall.name) throw new Error(`Deferred tool resolver returned "${resolvedTool.name}" for requested "${toolCall.name}"`);
			tool = resolvedTool;
			if (tool) currentContext.tools = [...currentContext.tools ?? [], tool];
		}
		resolution = {
			kind: "resolved",
			...tool ? { tool } : {}
		};
	} catch (error) {
		resolution = {
			kind: "error",
			error
		};
	}
	resolvedToolCalls?.set(toolCall, resolution);
	return resolution;
}
async function prepareToolCall(currentContext, assistantMessage, toolCall, config, signal, resolvedToolCalls) {
	const resolution = await resolveToolCallTool(currentContext, assistantMessage, toolCall, config, signal, resolvedToolCalls);
	if (resolution.kind === "error") return {
		kind: "immediate",
		result: createErrorToolResult(signal?.aborted ? "Operation aborted" : resolution.error instanceof Error ? resolution.error.message : String(resolution.error)),
		isError: true
	};
	const tool = resolution.tool;
	if (!tool) return {
		kind: "immediate",
		result: createErrorToolResult(`Tool ${toolCall.name} not found`),
		isError: true
	};
	let preparedToolCall;
	try {
		preparedToolCall = prepareToolCallArguments(tool, toolCall);
	} catch (error) {
		return {
			kind: "immediate",
			result: createErrorToolResult(error instanceof Error ? error.message : String(error)),
			isError: true
		};
	}
	let validatedArgs;
	try {
		validatedArgs = validateToolArguments(tool, preparedToolCall);
	} catch (error) {
		return {
			kind: "immediate",
			result: createErrorToolResult(error instanceof Error ? error.message : String(error)),
			isError: true,
			errorKind: "argument-validation"
		};
	}
	try {
		if (config.beforeToolCall) {
			const beforeResult = await config.beforeToolCall({
				assistantMessage,
				toolCall,
				args: validatedArgs,
				context: currentContext
			}, signal);
			if (signal?.aborted) return {
				kind: "immediate",
				result: createErrorToolResult("Operation aborted"),
				isError: true
			};
			if (beforeResult?.block) return {
				kind: "immediate",
				result: createErrorToolResult(beforeResult.reason || "Tool execution was blocked"),
				isError: true
			};
		}
		if (signal?.aborted) return {
			kind: "immediate",
			result: createErrorToolResult("Operation aborted"),
			isError: true
		};
		return {
			kind: "prepared",
			toolCall,
			tool,
			args: validatedArgs
		};
	} catch (error) {
		return {
			kind: "immediate",
			result: createErrorToolResult(error instanceof Error ? error.message : String(error)),
			isError: true
		};
	}
}
async function executePreparedToolCall(prepared, executionContext, signal, emit) {
	if (signal?.aborted) return {
		result: createErrorToolResult("Operation aborted"),
		isError: true,
		executionStarted: false
	};
	const updateEvents = [];
	let acceptingUpdates = true;
	try {
		const result = await runWithAgentToolExecutionContext(executionContext, () => prepared.tool.execute(prepared.toolCall.id, prepared.args, signal, (partialResult) => {
			if (!acceptingUpdates) return;
			updateEvents.push(Promise.resolve(emit({
				type: "tool_execution_update",
				toolCallId: prepared.toolCall.id,
				toolName: prepared.toolCall.name,
				args: prepared.toolCall.arguments,
				partialResult,
				...prepared.tool.hideFromChannelProgress === true ? { hideFromChannelProgress: true } : {}
			})));
		}));
		acceptingUpdates = false;
		await Promise.all(updateEvents);
		return {
			result,
			isError: false,
			executionStarted: true
		};
	} catch (error) {
		acceptingUpdates = false;
		await Promise.all(updateEvents);
		return {
			result: createErrorToolResult(error instanceof Error ? error.message : String(error)),
			isError: true,
			executionStarted: true,
			...signal?.aborted && error === signal.reason ? { callerCancelled: true } : {}
		};
	} finally {
		acceptingUpdates = false;
	}
}
async function finalizeExecutedToolCall(currentContext, assistantMessage, prepared, executed, config, signal) {
	let result = executed.result;
	let isError = executed.isError;
	if (executed.executionStarted && config.afterToolCall) try {
		const afterResult = await config.afterToolCall({
			assistantMessage,
			toolCall: prepared.toolCall,
			args: prepared.args,
			result,
			isError,
			context: currentContext
		}, signal);
		if (afterResult) {
			result = {
				...result,
				content: afterResult.content ?? result.content,
				details: afterResult.details ?? result.details,
				terminate: afterResult.terminate ?? result.terminate
			};
			isError = afterResult.isError ?? isError;
		}
	} catch (error) {
		result = createErrorToolResult(error instanceof Error ? error.message : String(error));
		isError = true;
	}
	return await finalizeToolCallOutcome(currentContext, assistantMessage, {
		toolCall: prepared.toolCall,
		result,
		isError,
		executionStarted: executed.executionStarted,
		...prepared.tool.hideFromChannelProgress === true ? { hideFromChannelProgress: true } : {},
		...executed.executionStarted && !executed.callerCancelled && prepared.tool.resultContentSource ? { resultContentSource: prepared.tool.resultContentSource } : {}
	}, prepared.args, config, signal);
}
async function finalizeToolCallOutcome(currentContext, assistantMessage, finalized, args, config, signal) {
	if (!config.afterToolOutcome) return finalized;
	try {
		const afterResult = await config.afterToolOutcome({
			assistantMessage,
			toolCall: finalized.toolCall,
			args,
			result: finalized.result,
			isError: finalized.isError,
			executionStarted: finalized.executionStarted,
			...finalized.errorKind ? { errorKind: finalized.errorKind } : {},
			context: currentContext
		}, signal);
		if (!afterResult) return finalized;
		return {
			...finalized,
			result: {
				...finalized.result,
				content: afterResult.content ?? finalized.result.content,
				details: afterResult.details ?? finalized.result.details,
				terminate: afterResult.terminate ?? finalized.result.terminate
			},
			isError: afterResult.isError ?? finalized.isError
		};
	} catch (error) {
		const errorResult = createErrorToolResult(error instanceof Error ? error.message : String(error));
		return {
			...finalized,
			result: {
				...errorResult,
				...finalized.result.terminate === void 0 ? {} : { terminate: finalized.result.terminate }
			},
			isError: true
		};
	}
}
async function completeAbortedToolCall(currentContext, assistantMessage, toolCall, resolvedToolCalls, config, signal, emit) {
	const hideFromChannelProgress = hidesToolCallFromChannelProgress(currentContext, toolCall, resolvedToolCalls);
	await emit({
		type: "tool_execution_start",
		toolCallId: toolCall.id,
		toolName: toolCall.name,
		args: toolCall.arguments,
		...hideFromChannelProgress ? { hideFromChannelProgress: true } : {}
	});
	const finalized = await finalizeToolCallOutcome(currentContext, assistantMessage, {
		toolCall,
		result: createErrorToolResult("Operation aborted"),
		isError: true,
		executionStarted: false,
		...hideFromChannelProgress ? { hideFromChannelProgress: true } : {}
	}, toolCall.arguments, config, signal);
	await emitToolExecutionEnd(finalized, emit);
	const message = createToolResultMessage(finalized);
	await emitToolResultMessage(message, emit);
	return {
		finalized,
		message
	};
}
function createErrorToolResult(message) {
	return {
		content: [{
			type: "text",
			text: message
		}],
		details: {}
	};
}
async function emitToolExecutionEnd(finalized, emit) {
	await emit({
		type: "tool_execution_end",
		toolCallId: finalized.toolCall.id,
		toolName: finalized.toolCall.name,
		result: finalized.result,
		isError: finalized.isError,
		executionStarted: finalized.executionStarted,
		...finalized.errorKind ? { errorKind: finalized.errorKind } : {},
		...finalized.hideFromChannelProgress === true ? { hideFromChannelProgress: true } : {}
	});
}
function createToolResultMessage(finalized) {
	return withToolResultContentSource({
		role: "toolResult",
		toolCallId: finalized.toolCall.id,
		toolName: finalized.toolCall.name,
		content: finalized.result.content ?? [],
		details: finalized.result.details,
		isError: finalized.isError,
		timestamp: Date.now()
	}, finalized.resultContentSource);
}
function readTurnTaintMetadata(message) {
	const metadata = message["__openclaw"];
	return metadata && typeof metadata === "object" && !Array.isArray(metadata) ? metadata : void 0;
}
function toolResultTaintsTurn(message) {
	return readTurnTaintMetadata(message)?.resultContentSource === "network";
}
function isActiveTurnTainted(messages) {
	for (const message of messages.toReversed()) {
		if (message.role === "user") return false;
		const metadata = readTurnTaintMetadata(message);
		if (metadata?.turnTainted === true || metadata?.resultContentSource === "network") return true;
	}
	return false;
}
function withAssistantTurnTaint(message, tainted) {
	if (!tainted) return message;
	return {
		...message,
		__openclaw: {
			...readTurnTaintMetadata(message),
			turnTainted: true
		}
	};
}
function withToolResultContentSource(message, source) {
	if (!source) return message;
	return {
		...message,
		__openclaw: {
			...readTurnTaintMetadata(message),
			resultContentSource: source
		}
	};
}
async function emitToolResultMessage(toolResultMessage, emit) {
	await emit({
		type: "message_start",
		message: toolResultMessage
	});
	await emit({
		type: "message_end",
		message: toolResultMessage
	});
}
//#endregion
export { appendInterruptedTurnMessage as a, uuidv7 as c, runAgentLoopContinue as i, TRANSCRIPT_NOT_CONTINUABLE_ERROR_CODE as l, agentLoopContinue as n, createFailureMessage as o, runAgentLoop as r, isTurnHandoffAbort as s, agentLoop as t, TranscriptNotContinuableError as u };
