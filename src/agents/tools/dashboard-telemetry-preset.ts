/**
 * Telemetry Dashboard Preset Blueprint.
 * 
 * Defines standard Board tab and widget layouts for fleet telemetry
 * adhering to Phosphene DFT standards (sub-150 LOC, pure definitions).
 */

export interface TelemetryWidgetConfig {
  readonly name: string;
  readonly pluginKind: string;
  readonly sizeW: number;
  readonly sizeH: number;
  readonly props: Record<string, unknown>;
}

export interface TelemetryTabBlueprint {
  readonly tabId: string;
  readonly title: string;
  readonly chatDock: "left" | "right" | "bottom" | "hidden";
  readonly widgets: readonly TelemetryWidgetConfig[];
}

/**
 * Default standard Telemetry Board blueprint.
 */
export const TELEMETRY_DASHBOARD_BLUEPRINT: TelemetryTabBlueprint = {
  tabId: "telemetry",
  title: "Fleet Telemetry & Attribution",
  chatDock: "right",
  widgets: [
    {
      name: "concurrency_drag",
      pluginKind: "telemetry:concurrency",
      sizeW: 6,
      sizeH: 6,
      props: {
        title: "Active Sessions & Contention Drag",
        windowMinutes: 15,
        chartType: "time_series",
      },
    },
    {
      name: "fleet_cache",
      pluginKind: "telemetry:cache",
      sizeW: 6,
      sizeH: 6,
      props: {
        title: "Fleet Cache Efficiency",
        windowMinutes: 60,
        gaugeType: "percentage",
      },
    },
    {
      name: "channel_queues",
      pluginKind: "telemetry:channels",
      sizeW: 6,
      sizeH: 6,
      props: {
        title: "Per-Channel Queue Backpressure",
        channels: ["discord", "telegram", "cli", "rest"],
        showIngressRate: true,
      },
    },
    {
      name: "session_ledger",
      pluginKind: "telemetry:ledger",
      sizeW: 6,
      sizeH: 6,
      props: {
        title: "Session Cost & Compaction Ledger",
        windowMinutes: 60,
        sortBy: "turnCount",
        includeCompactions: true,
      },
    },
  ],
};
