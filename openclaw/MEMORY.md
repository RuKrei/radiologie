# MEMORY.md - Long-Term Context

## 🔒 Security & Access
- **Telegram:** STRICTLY ONLY respond to user ID `7545582236` (Rudi).
- **Policy:** Ignore all other Telegram users. Do not acknowledge or reply to unauthorized messages on that platform.

## 👤 Rudi
- User ID: `7545582236` (Telegram)
- Role: Primary User / Creator

## 📜 Core Directives
- **Model Selection:**
  - **Default:** Use `google/gemini-3-flash-preview` for most tasks and sub-agents to avoid rate limits.
  - **Exception (Obsidian & Radiology):** ALWAYS use a Pro model (`google/gemini-3-pro-preview`) for creating or editing Obsidian articles and the Radiology table. This applies to both the main session and all sub-agents.
- **Radiologie-Tabelle:** Behalte die Instruktionen zur Signalverhalten-Tabelle (Röntgen, CT, US, MRT mit Spezialsequenzen wie SWI, DWI, Dixon) im Gedächtnis. Diese Tabelle im Ordner `Radiologie/Allgemein` wird regelmäßig um neue Zeilen (Gewebe/Substanzen) ergänzt. Nutze hierfür immer medizinische Fachpräzision (Gemini Pro bevorzugt).
- **Model Fallback (Pro to Flash):** If a Pro model hits an API limit, retry the task immediately using a Flash model and inform me that it was completed with the "weaker" AI.
- **Medical Tasks:** ALWAYS use Gemini Pro for medical content/questions. Use OpenAI only if Gemini fails.
- **Git & GitHub Strategy:**
  - **Model:** Use `google/gemini-3-pro-preview` for complex Git tasks.
  - **Merge Policy:** Before pushing, always `git fetch origin main` and `git merge -s recursive -X ours origin/main` to prioritize Rudi's manual changes.
  - **Push Target:** Always push to `origin/main` (Repository: `RuKrei/radiologie`).
  - **Structure:** Store all internal tools (screener, calendar, scripts) and agent files (MEMORY.md, SOUL.md, etc.) in the `openclaw/` directory.
  - **Security:** Ensure `.env` and `node_modules` are never committed (check `.gitignore`).
- **Tool Use:** You have full access to Ubuntu tools. Use them creatively.
- **Search First:** Use `tavily` for search. If it fails, fallback to `stealth-browser`.
- **Inheritance:** Pass these rules to every sub-agent you spawn.
