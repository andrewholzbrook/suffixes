## REFINE

> **MODE: Prioritize Refinement List.** **Trigger:** Activated when entering `# Refine` generally (e.g., `READY.md` empty, promotion from `BACKLOG.md`). **Action:** Identify any tasks below lacking a Priority (P) score. **Action:** For each such task, AI suggests P score or collaborates with user to assign one. **Action:** Once all tasks have a P score, automatically sort the entire list below by P score (lowest first). **Trigger:** Transition to `MODE: Refine Task` for the (new) top item. (Ref: Full Instructions)

> **MODE: Refine Task.** **Trigger:** Activated by `READY.md` (for a specific task) or by `MODE: Prioritize Refinement List`. **Action (Specific Task):** Present short description. Priority (P) should exist. AI suggests Effort (E) score. Present options: 1. Ready (Move to READY.md), 2. Needs Refinement (Collaborate), 3. Discard (Remove). Wait for user choice or free text. **AI Assessment:** [State if Ready or Needs Refinement]. **Stop after processing.** **Action (General):** Review/process list items for `READY.md`. **Output:** Refined task(s) stay here, move to `READY.md`, or are discarded. **Trigger:** If list empty/low, check `BACKLOG.md`. (Ref: Full Instructions)

---

## BLOCKED

> **Purpose:** This section lists tasks from the `# REFINE` or `# READY` lists that cannot proceed due to external dependencies, unanswered questions, or other impediments.
> **Action:** Regularly review items here. When a blocker is resolved, move the task back to the appropriate section (e.g., `# REFINE` for further refinement if needed, or `# READY` if it's now actionable). Add a comment indicating why it was blocked and how it was unblocked.

---

- [ ] **Hover Provider Integration:** Implement `vscode.HoverProvider` to show contextual info (e.g., LLM prompts, file details) on hover within `TODOS.md`. [P:1, E:3]
  - [ ] **Parse Task Metadata:** Parse new rich inline property format (IDs, relationships, custom key-values), build internal task graph. [P:1, E:2]
  - [ ] **Define Task Format:** Standardize one-liner Markdown tasks with properties (ID, Effort, BV, Status, relationships, etc.) embedded within an HTML comment block (e.g., `<!-- {ID:task123 ...} -->`) at the start of the task line. [P:1, E:1]
  - [ ] **Command Links (continued):** Add actions (Mark Done, Open File, Copy) to hover. [P:2, E:2]
  - [ ] **LLM Prompt Integration:** Define convention & display linked prompts. [P:2, E:2]
  - [ ] **Configuration:** Allow user to customize hover content. [P:2, E:1]
  - [ ] **Clean up HoverProvider.ts:** Some things in here can be extracted out. [P:3, E:1]
  - [ ] **Context from Related Files:** Show snippets/details of linked files. [P:3, E:3]
  - [ ] **CancellationToken:** Explore `token: vscode.CancellationToken` and how it would be used. [P:3, E:1]
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
- [ ] **Feature: Generate Actionable Work Order from Task** [P:2, E:2]
  - [ ] Define Work Order Markdown template (pre-filled fields for scope, assessment, arch impact, linked tickets). [P:2, E:1]
  - [ ] Implement command to select a task and generate a pre-filled Work Order file (e.g., in .vscode/work_orders/). [P:2, E:2]
  - [ ] Add CodeLens action "Create Work Order" to eligible tasks. [P:2, E:1]
- [ ] **Feature: CodeLens - Add "Play a Recap" for Tasks** [P:3, E:3]
  - [ ] Define data points for recap (current state, basic git history for line/ID, relationships, work order summary). [P:3, E:1]
  - [ ] Implement Git history parsing for a specific task line/ID (MVP: last change, creation date via git log). [P:3, E:2]
  - [ ] Design and implement recap presentation (MVP: Textual summary in showInformationMessage or quick pick). [P:3, E:1]
  - [ ] Add 'Play Recap' button to task CodeLenses. [P:3, E:1]
- [ ] **Code Lens: Define Prompt Identification Convention for Copy Command** [P:2, E:1] - Goal: Establish a clear system for how LLM prompts are marked or referenced within markdown task files (e.g., `TODOS.md`). - This convention will enable a CodeLens to appear near these prompts. - The CodeLens will include a "Copy Command" to easily copy the identified prompt's content to the clipboard.

- [ ] **Feature: Obsidian Interoperability & Enhanced Markdown Tooling** [P:2, E:3]

  - [ ] **Research Obsidian Plugin Compatibility:** Investigate plugins (Tasks, Dataview, Mermaid, Excalidraw) for syntax/frontmatter conventions. [P:2, E:2]
  - [ ] **Define Conventions for "Open in Obsidian":** Establish folder structure/markers for Obsidian-friendly areas. [P:3, E:1]
  - [ ] **Task Format Alignment/Transformation (If Needed):** Explore adapting our format or providing transformers for Obsidian plugin syntax. [P:2, E:2]
  - [ ] **Diagramming Integration (e.g., Mermaid):** Ensure easy embedding and explore preview/rendering options. [P:2, E:2]
  - [ ] **(Optional) VS Code Commands for Obsidian Actions:** e.g., "Open folder in Obsidian". [P:3, E:1]

- [ ] **Feature: CodeLens - Contextual Diff Summary for Current Task** [P:2, E:3]

  - [ ] **CodeLens Provider Logic:** Implement logic to display a "Summarize Diff for Task" CodeLens on files with Git modifications (when a task is active in `1_NOW.md`). [P:2, E:1]
  - [ ] **Git Diff Retrieval:** Implement functionality to get the `git diff` output for the current file. [P:2, E:1]
  - [ ] **Current Task Retrieval:** Implement functionality to read and parse the current active task from `.vscode/suffixes/tasks/1_NOW.md`. [P:2, E:1]
  - [ ] **Summarization - MVP:** Implement a basic, non-AI summary (e.g., "File X has N additions, M deletions. Current task: [Task Title]"). [P:2, E:1]
  - [ ] **Summarization - Advanced (LLM-based):** Design and implement LLM-powered summarization. [P:1, E:3]
    - [ ] Construct LLM prompt including diff, task details, and user-defined style/format. [P:1, E:1]
    - [ ] Integrate with an LLM API for generating the summary. [P:1, E:2]
    - [ ] Address LLM API key management and obtain user opt-in for sending diff/task data. [P:1, E:1]
  - [ ] **User Configuration for Summary Style/Format:** Define VS Code settings for predefined summary formats and/or user-described styles (for LLM). [P:2, E:2]
  - [ ] **Display Summary:** Determine how to present the generated summary to the user (e.g., information message, new untitled document, webview panel). [P:3, E:1]

- [ ] **[NEEDS CLARIFICATION] File/Symbol Linking:** Detect and link file paths/symbols in descriptions. [P:2, E:2]

- [ ] **[SCOPE NEEDS DETAIL] Code Lens: Implement 'Copy to Clipboard' Command & Basic Provider** [P:2, E:2]
