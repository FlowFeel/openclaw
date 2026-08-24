/**
 * @file hickey-map-tools.test.ts
 * @description Degree 1 Tool Contract & Schema Certification for Hickey Map Tools.
 *
 * @dft
 * - Prediction: Tools conform to Atomic arity (k <= 2), zero base param duplication, and exact JSON contracts.
 * - Competing account: Tools fail Rule A5 or throw on missing keys.
 * - What would support: All 4 tools pass validateCertifiedToolArity; execute returns valid JSON structures.
 * - What would refute: Arity violations or unhandled exceptions.
 */

import { beforeEach, describe, expect, it } from "vitest";
import { validateCertifiedToolArity } from "../../infra/shannon-weaver/certified-tool-validator.js";
import { InMemoryHickeyMap } from "../../map/in-memory-hickey-map.js";
import { createHickeyMapTools } from "./hickey-map-tools.js";

describe("hickey-map-tools (Degree 1 Tool Contracts)", () => {
  let map: InMemoryHickeyMap;
  let tools: ReturnType<typeof createHickeyMapTools>;

  beforeEach(() => {
    map = new InMemoryHickeyMap();
    tools = createHickeyMapTools(map);
  });

  it("certifies that all map tools are Atomic tier (k <= 2) and satisfy Rule A5", () => {
    for (const tool of tools) {
      const valResult = validateCertifiedToolArity({
        name: tool.name,
        parameters: tool.parameters as Record<string, unknown>,
      });
      expect(valResult.valid).toBe(true);
      expect(valResult.tier).toBe("atomic");
      expect(valResult.certifiedArity).toBeLessThanOrEqual(2);
    }
  });

  it("executes map_read and returns null safely on absent keys (M3)", async () => {
    const readTool = tools.find((t) => t.name === "map_read")!;
    const res = await readTool.execute("call-1", { key: "nonexistent/key" });
    const payload = JSON.parse(res.content[0].text);
    expect(payload).toEqual({
      key: "nonexistent/key",
      value: null,
      found: false,
    });
  });

  it("executes map_write and subsequent map_read correctly (M1, M2)", async () => {
    const writeTool = tools.find((t) => t.name === "map_write")!;
    const readTool = tools.find((t) => t.name === "map_read")!;

    const writeRes = await writeTool.execute("call-w1", {
      key: "fin/framework/panic-not-doom",
      value: "we assume stability",
    });
    const writePayload = JSON.parse(writeRes.content[0].text);
    expect(writePayload).toEqual({ written: true, key: "fin/framework/panic-not-doom" });

    const readRes = await readTool.execute("call-r1", { key: "fin/framework/panic-not-doom" });
    const readPayload = JSON.parse(readRes.content[0].text);
    expect(readPayload).toEqual({
      key: "fin/framework/panic-not-doom",
      value: "we assume stability",
      found: true,
    });
  });

  it("executes map_list_keys and enumerates prefix matches (M4)", async () => {
    map.write("fin/a", "1");
    map.write("fin/b", "2");
    map.write("other/c", "3");

    const listTool = tools.find((t) => t.name === "map_list_keys")!;
    const res = await listTool.execute("call-l1", { prefix: "fin/" });
    const payload = JSON.parse(res.content[0].text);

    expect(payload.prefix).toBe("fin/");
    expect(payload.count).toBe(2);
    expect(payload.keys.sort()).toEqual(["fin/a", "fin/b"]);
  });

  it("executes map_delete cleanly", async () => {
    map.write("fin/del", "val");
    const deleteTool = tools.find((t) => t.name === "map_delete")!;

    const res = await deleteTool.execute("call-d1", { key: "fin/del" });
    const payload = JSON.parse(res.content[0].text);
    expect(payload).toEqual({ existed: true, key: "fin/del" });

    expect(map.read("fin/del")).toBeNull();
  });
});
