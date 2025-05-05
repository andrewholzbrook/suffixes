## REFINE

> **MODE: Prioritize Refinement List.** **Trigger:** Activated when entering `# Refine` generally (e.g., `READY.md` empty, promotion from `BACKLOG.md`). **Action:** Identify any tasks below lacking a Priority (P) score. **Action:** For each such task, AI suggests P score or collaborates with user to assign one. **Action:** Once all tasks have a P score, automatically sort the entire list below by P score (lowest first). **Trigger:** Transition to `MODE: Refine Task` for the (new) top item. (Ref: Full Instructions)

> **MODE: Refine Task.** **Trigger:** Activated by `READY.md` (for a specific task) or by `MODE: Prioritize Refinement List`. **Action (Specific Task):** Present short description. Priority (P) should exist. AI suggests Effort (E) score. Present options: 1. Ready (Move to READY.md), 2. Needs Refinement (Collaborate), 3. Discard (Remove). Wait for user choice or free text. **AI Assessment:** [State if Ready or Needs Refinement]. **Stop after processing.** **Action (General):** Review/process list items for `READY.md`. **Output:** Refined task(s) stay here, move to `READY.md`, or are discarded. **Trigger:** If list empty/low, check `BACKLOG.md`. (Ref: Full Instructions)

---

- [ ] **Hover Provider Integration:** Implement `vscode.HoverProvider` to show contextual info (e.g., LLM prompts, file details) on hover within `TODOS.md`. [P:1, E:2]
  - [ ] **Parse Task Metadata:** Extract checkbox status, P/E tags, description. [P:1, E:1]
  - [ ] **Define Task Format:** [P:1]
  - [ ] **Command Links (continued):** Add actions (Mark Done, Open File, Copy) to hover. [P:2, E:2]
  - [ ] **LLM Prompt Integration:** Define convention & display linked prompts. [P:2, E:2]
  - [ ] **Configuration:** Allow user to customize hover content. [P:2, E:1]
  - [ ] **(don't understand purpose yet) File/Symbol Linking:** Detect and link file paths/symbols in descriptions. [P:2, E:2]
  - [ ] **Clean up HoverProvider.ts** Some things in here can be extracted out. [P:3]
  - [ ] **Context from Related Files:** Show snippets/details of linked files. [P:3, E:3]
  - [ ] **CancellationToken** Explore `token: vscode.CancellationToken` and how it would be used [P:3]
- [ ] **Code Lens: Implement 'Copy to Clipboard' Command & Basic Provider** [P:2, E:2]
- [ ] **Logging:** Standardize logging format and levels (e.g., use vscode.LogOutputChannel). [P:2, E:2]
- [ ] **TODOS.md Standardization:** Define and apply a consistent format/structure for this file, potentially leveraging CodeLens/Hovers. [P:2, E:2]
- [ ] **AppName Wrangling** Find all instances of current app name "suffixes", veryify it's being used as the app name, make it a const [P:2]
- [ ] **Suffix Logic Integration:** Connect TreeDataProvider to suffix detection logic. [P:3, E:2]
- [ ] **CodeLens Integration - 2:** Logging when `/docs/TODOS.md# Next Steps` clicked added, explore next steps [P:3]
- [ ] **VIEW_IDS** Find a place for this. [P:3]
- [ ] **Clean up registerCommands** Some things in here can be extracted out. [P:3]
- [ ] **Split apart command registration** into granular registrations, one per file, files in their domain [P:3]
- [ ] **Move /src/codeLens/ and /src/hover/ stuff dealing direction with the TODO.md file into the /todoFile/ dir.** [P:3]
- [ ] **Rename extension** to something a little less specific to the "suffixes" concept. [P:4]
- [ ] **Project Dashboard Webview:** Create a custom webview panel to act as a project dashboard, displaying tasks (from `*.md` files), prompts, architecture diagrams (e.g., Mermaid), suffix patterns, domain names, etc. [P:2, E:3]
  - **Inspirations from existing extensions:**
    - **Project/Item Management & Display:**
      - Organize projects (local folders, remote SSH, specific files).
      - Speed-dial / grid layout.
      - Pin frequently used items.
      - Group items into folders/sections.
      - Custom colors (gradients?) & icons (emojis?).
      - Drag-and-drop reordering.
      - Show/hide project paths.
      - Git repo indicator.
      - Filter/search projects.
      - Configurable tile size.
    - **Interaction & Workflow:**
      - Open items in current/new window.
      - Access via command, icon, keybinding.
      - Configurable auto-open behavior.
      - Inline management (add, edit, delete).
    - **Appearance & Customization:**
      - Auto-theming with VS Code theme.
      - Custom color overrides.
      - Responsive layout.
      - Multiple named layouts?
    - **Extensibility & Data:**
      - Widget-based system (like VSC-Home).
      - Support custom React (or other framework) widgets.
      - Configurable storage (local vs. syncable settings).
- [ ] Discuss {domain}.{layer} Naming Convention Pros/Cons [P:3, E:1]
- [ ] Refine {domain}.{layer} Naming Convention (Nesting, Shared, Tests) [P:3, E:2]
- [ ] Integrate {domain}.{layer} Convention with Suffixes Extension Features [P:2, E:2]
