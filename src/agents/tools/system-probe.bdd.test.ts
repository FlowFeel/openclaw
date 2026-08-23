/**
 * BDD Scenario Suite: Live System Probe & Operational Telemetry
 *
 * Implements literate Given / When / Then steps corresponding to:
 * kitchen/suites/oc-mods/features/system_probe.feature
 */

import { describe, expect, it } from "vitest";
import { createSystemProbeTool } from "./system-probe-tool.js";
import type { SystemProbeResult } from "../../infra/system-probe-service.js";

describe("Feature: Live System Probe & Operational Telemetry (BDD)", () => {
  it("Scenario: Agent queries runtime under nominal system conditions", async () => {
    // Given the gateway heap utilization is 42% (below 75% soft threshold)
    // And the event loop lag is 12ms (below 100ms warning threshold)
    // And the root disk usage is 58% (below 85% warning threshold)
    const tool = createSystemProbeTool({
      getHeapMetrics: () => ({
        usedBytes: 430 * 1024 * 1024,
        totalBytes: 1024 * 1024 * 1024,
        limitBytes: 1024 * 1024 * 1024,
        utilizationRatio: 0.42,
      }),
      getEventLoopMetrics: () => ({
        lagMs: 12,
        p95LagMs: 20,
      }),
      getDiskMetrics: () => ({
        usedPercent: 58,
        freeBytes: 12 * 1024 * 1024 * 1024,
        totalBytes: 30 * 1024 * 1024 * 1024,
      }),
      getConfig: () => ({
        channel: "telegram",
        activeModel: "claude-3-5-sonnet",
        concurrencyLimit: 4,
      }),
      gatewayVersion: "1.0.0",
      activeProvider: "anthropic",
      activeModel: "claude-3-5-sonnet",
    });

    // When the agent invokes the "system_probe" tool
    const execution = await tool.execute("call_probe_nominal", {});

    // Then the probe result kind is "healthy"
    const result = execution.details as SystemProbeResult;
    expect(result.kind).toBe("healthy");

    // And the response includes valid memory, event loop, and disk metrics
    if (result.kind === "healthy") {
      expect(result.heap.utilizationRatio).toBe(0.42);
      expect(result.eventLoop.lagMs).toBe(12);
      expect(result.disk.usedPercent).toBe(58);
      // And the response contains sanitized gateway configuration with zero plaintext secrets
      expect(result.config.channel).toBe("telegram");
      expect(result.config.activeModel).toBe("claude-3-5-sonnet");
    }
  });

  it("Scenario: Agent detects elevated heap pressure and triggers cache eviction", async () => {
    // Given the gateway heap utilization reaches 82% (exceeds 75% soft warning)
    const tool = createSystemProbeTool({
      getHeapMetrics: () => ({
        usedBytes: 840 * 1024 * 1024,
        totalBytes: 900 * 1024 * 1024,
        limitBytes: 1024 * 1024 * 1024,
        utilizationRatio: 0.82,
      }),
      getEventLoopMetrics: () => ({ lagMs: 10, p95LagMs: 15 }),
      getDiskMetrics: () => ({ usedPercent: 50, freeBytes: 15 * 1024 * 1024 * 1024, totalBytes: 30 * 1024 * 1024 * 1024 }),
    });

    // When the agent invokes the "system_probe" tool
    const execution = await tool.execute("call_probe_heap_warn", {});
    const result = execution.details as SystemProbeResult;

    // Then the probe result kind is "degraded"
    expect(result.kind).toBe("degraded");
    if (result.kind === "degraded") {
      // And the degradation reason contains "heap_warning: utilization >= 75%"
      expect(result.reason).toContain("heap_warning");
      expect(result.reason).toContain("82.0%");
      // And the critical flag is false
      expect(result.critical).toBe(false);
    }
  });

  it("Scenario: Agent detects emergency heap pressure requiring task shedding", async () => {
    // Given the gateway heap utilization reaches 91% (exceeds 88% emergency threshold)
    const tool = createSystemProbeTool({
      getHeapMetrics: () => ({
        usedBytes: 930 * 1024 * 1024,
        totalBytes: 980 * 1024 * 1024,
        limitBytes: 1024 * 1024 * 1024,
        utilizationRatio: 0.91,
      }),
    });

    // When the agent invokes the "system_probe" tool
    const execution = await tool.execute("call_probe_heap_crit", {});
    const result = execution.details as SystemProbeResult;

    // Then the probe result kind is "degraded"
    expect(result.kind).toBe("degraded");
    if (result.kind === "degraded") {
      // And the degradation reason contains "heap_emergency: utilization >= 88%"
      expect(result.reason).toContain("heap_emergency");
      expect(result.reason).toContain("91.0%");
      // And the critical flag is true
      expect(result.critical).toBe(true);
    }
  });

  it("Scenario: Agent detects host disk saturation warning", async () => {
    // Given the root disk usage reaches 89% (exceeds 85% warning threshold)
    const tool = createSystemProbeTool({
      getHeapMetrics: () => ({
        usedBytes: 400 * 1024 * 1024,
        totalBytes: 1024 * 1024 * 1024,
        limitBytes: 1024 * 1024 * 1024,
        utilizationRatio: 0.39,
      }),
      getEventLoopMetrics: () => ({ lagMs: 10, p95LagMs: 15 }),
      getDiskMetrics: () => ({
        usedPercent: 89,
        freeBytes: 3.3 * 1024 * 1024 * 1024,
        totalBytes: 30 * 1024 * 1024 * 1024,
      }),
    });

    // When the agent invokes the "system_probe" tool
    const execution = await tool.execute("call_probe_disk_warn", {});
    const result = execution.details as SystemProbeResult;

    // Then the probe result kind is "degraded"
    expect(result.kind).toBe("degraded");
    if (result.kind === "degraded") {
      // And the degradation reason contains "disk_warning: usage >= 85%"
      expect(result.reason).toContain("disk_warning");
      expect(result.reason).toContain("89.0%");
    }
  });

  it("Scenario: Sensitive configuration tokens are never leaked to agent", async () => {
    // Given the gateway configuration contains sensitive API keys and tokens
    const rawApiKey = "sk-ant-api03-secret12345";
    const rawBotToken = "123456:ABC-DEF1234ghIkl-zyx57W";
    const rawWebhookSecret = "super_secret_webhook_pass";

    const tool = createSystemProbeTool({
      getConfig: () => ({
        anthropicApiKey: rawApiKey,
        telegramBotToken: rawBotToken,
        webhookSecret: rawWebhookSecret,
        publicSetting: "ok_to_read",
      }),
    });

    // When the agent invokes the "system_probe" tool
    const execution = await tool.execute("call_probe_leak_check", {});
    const jsonOutput = JSON.stringify(execution);

    // Then none of the raw secret values appear anywhere in the tool output
    expect(jsonOutput).not.toContain(rawApiKey);
    expect(jsonOutput).not.toContain(rawBotToken);
    expect(jsonOutput).not.toContain(rawWebhookSecret);

    // And all secret fields in the config are replaced with "[REDACTED]"
    const result = execution.details as SystemProbeResult;
    if (result.kind === "healthy") {
      expect(result.config.anthropicApiKey).toBe("[REDACTED]");
      expect(result.config.telegramBotToken).toBe("[REDACTED]");
      expect(result.config.webhookSecret).toBe("[REDACTED]");
      expect(result.config.publicSetting).toBe("ok_to_read");
    }
  });
});
