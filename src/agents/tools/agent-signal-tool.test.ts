import { describe, expect, it } from "vitest";
import { AgentSignalBus } from "../../infra/agent-signal-bus.js";
import { createAgentSignalTool } from "./agent-signal-tool.js";

describe("emit_agent_signal tool", () => {
  it("emits signal to bus and returns acknowledgement", async () => {
    const bus = new AgentSignalBus(10);
    const tool = createAgentSignalTool({ signalBus: bus, sessionId: "sess_test" });

    const execution = await tool.execute("call_1", {
      level: "warn",
      topic: "knowledge_gap",
      message: "Need more context on RPC",
      payload: { rpcMethod: "fetchDetails" },
    });

    const result = execution.details as { status: string; signalId: string };
    expect(result.status).toBe("acknowledged");
    expect(result.signalId).toBeDefined();

    const stored = bus.getSignals();
    expect(stored.length).toBe(1);
    expect(stored[0]?.message).toBe("Need more context on RPC");
    expect(stored[0]?.level).toBe("warn");
  });
});
