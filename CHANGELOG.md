# OpenClaw Fork (Inferno Labs) — CHANGELOG

All notable changes to the Inferno OpenClaw core fork (`v2026.8.1-inferno`) authored by **Ed Phillips `<ed@cronos.net>` (phosphene) for inferno labs**.

---

## [v2026.8.2-inferno] — 2026-08-20

### 🚀 Key Features & Updates

1. **Integrated OpenRouter Model Routing Defaults**:
   - Model defaults updated in `config.d/agents.yaml`:
     - Primary: `openrouter/~deepseek/deepseek-v4-flash-latest` (1,024+ token prefix cache alignment)
     - Fallbacks: `google/gemini-3.7-flash` (75% off deal on OpenRouter), `google/gemini-2.5-flash`, `openrouter/@preset/glm-5-2`
   - Fully compatible with Go proxy smart model router on `infernoroute.phosphene.net`.

---

## [v2026.8.1-inferno] — 2026-08-20

### 🚀 Key Features & Core Mods

1. **Ultra-Slim Prompt Engine (`ContextFilterPolicy`)**:
   - Reduces system prompt overhead from ~1,114 tokens down to **~213 tokens** (90.4% reduction over full mode).
   - Beats Pi's 480 token baseline by 55%!

2. **Phosphene MD StructRAG Dual-Store Engine**:
   - Structured Markdown (`.md`) context surfaces. Zero JSON escaping clutter.
   - 0ms indexed SQL section queries via `topic_sections` table (`PRIMARY KEY (topic_key, section_name)`).
   - Workspace `.md` sidecars at `workspace/meta/surfaces/*.md`.

3. **Open-Source AST Libraries**:
   - `marked@18.0.7` GFM AST lexer & `yaml@2.9.0` frontmatter engine.
   - Zero custom AST parsers.

4. **Isolated Pattern Utilities**:
   - `src/utils/markdown-patterns.ts` encapsulating all regular expressions into standalone pure functions.

5. **Decomposed YAML Configuration**:
   - Root `openclaw.yaml` with `./config.d/*.yaml` glob `$include` support.

6. **SQLite Key-Value Storage**:
   - Unified `openclaw-state.sqlite` database and `SqliteKvStore` module with automatic legacy `.json` migration.

---

**Author**: Ed Phillips `<ed@cronos.net>` (phosphene) for inferno labs
