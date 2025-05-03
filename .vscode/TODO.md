# Suffixes Extension TODOs

## Current Initiative

> **Define the main goal/theme for this work cycle and link it to project objectives.** > _Example: Implement Core TODO File Scaffolding -> Improve new user onboarding_ > **Current:** [Your initiative description here]

<!-- QUICK IDEA INPUT: Add new raw ideas directly under the '# Refine' header below for quick capture and later triage. -->

---

## Next 3

> **MODE: Execute.** Verify top `[ ]` task is refined (clear scope, P/E). Work the task. Focus on code implementation. **Action:** Review/QA the implementation. **Trigger:** When ready, move to `Stage & Clean`.
> **MODE: Stage & Clean.** Review code changes, run linters/formatters, remove temporary code/comments. Stage relevant _code_ files (`git add <code files>`). **Trigger:** When ready, move to `Mark Complete`.
> **MODE: Mark Complete.** Change `[ ]` to `[x]` for the task in TODO.md. Log changes (e.g., in CHANGELOG.md, optional). **Trigger:** Move to `Stage Completion`.
> **MODE: Stage Completion.** Stage the updated TODO.md (`git add TODO.md`) and CHANGELOG.md (if changed). **Trigger:** Move to `Commit Staged Changes`.
> **MODE: Commit Staged Changes.** **Action:** Review final staged changes (`git diff --staged`). **Action:** Group related completed `[x]` tasks (if multiple). **Action:** Construct commit message(s). **Action:** Confirm readiness to commit with the user. **Action (on confirmation):** Commit (`git commit`). **Action (after successful commit):** Remove corresponding `[x]` task lines from this section. **Trigger:** After commit(s) and removal, check if `# Next 3` needs replenishment (go to `# Ready`).

- [ ] **Empty Project: Update UI/Command States:** Adjust Tree View display and command availability based on file existence or user choice. [P:2, E:2]
- [ ] **Code Lens: Define Prompt Identification Convention for Copy Command** [P:2, E:1]

---

## Ready

> **MODE: Fill Next 3.** **Trigger:** Invoked when `# Next 3` has space _and_ suitable, refined tasks exist here. **Action:** Select top 1-3 refined tasks (P/E exists, scope clear) from this list. Move them to `# Next 3`. **Trigger:** Go to `MODE: Execute` in `# Next 3`.

> **MODE: Initiate Refinement.** **Trigger:** Invoked when `# Next 3` has space _but_ the top task here needs refinement (missing P/E, unclear scope, etc.). **Action:** Select the top task needing refinement. **Action:** Outline 1-3 potential sub-tasks. **Action:** Go to `MODE: Refine Task` in `# Refine`. **Trigger:** If this list is empty when replenishment is needed, go to `MODE: Prioritize Refinement List` in `# Refine`. (Ref: Full Instructions)

- [ ] **Audit Log Prefixes** [P:3, E:1]
- [ ] **Lint & Fix:** Run linter and fix the issues. It's okay for some of the items to be fixed with lint comments if it's obviously a thing we'll build upon later.

---

## Refine

> **MODE: Prioritize Refinement List.** **Trigger:** Activated when entering `# Refine` generally (e.g., `# Ready` empty, promotion from `# Backlog`). **Action:** Identify any tasks below lacking a Priority (P) score. **Action:** For each such task, AI suggests P score or collaborates with user to assign one. **Action:** Once all tasks have a P score, automatically sort the entire list below by P score (lowest first). **Trigger:** Transition to `MODE: Refine Task` for the (new) top item. (Ref: Full Instructions)

> **MODE: Refine Task.** **Trigger:** Activated by `# Ready` (for a specific task) or by `MODE: Prioritize Refinement List`. **Action (Specific Task):** Present short description. Priority (P) should exist. AI suggests Effort (E) score. Present options: 1. Ready (Move to #Ready), 2. Needs Refinement (Collaborate), 3. Discard (Remove). Wait for user choice or free text. **AI Assessment:** [State if Ready or Needs Refinement]. **Stop after processing.** **Action (General):** Review/process list items for `# Ready`. **Output:** Refined task(s) stay here, move to `# Ready`, or are discarded. **Trigger:** If list empty/low, check `# Backlog`. (Ref: Full Instructions)

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

---

## Backlog

> **MODE: Capture Ideas.** Add raw thoughts/low-priority items. **Trigger:** Periodically review; promote viable tasks and trigger `MODE: Prioritize Refinement List` in `# Refine`.

- [ ] **VSCode Extension Exploration - Menus (Context Menus, View Actions, Palette):** Add commands to UI locations using `contributes.menus` in `package.json` (Define placements like `view/item/context`, `view/title`) and use `when` clauses for context-aware visibility. [P:2, E:2]
- [ ] **VSCode Extension Exploration - Decorations (Editor):** Apply visual styles in the editor using `vscode.window.createTextEditorDecorationType`, `TextEditor.setDecorations`. [P:3, E:2]
- [ ] **Webviews:** Create custom HTML/CSS/JS panels using `vscode.window.createWebviewPanel`. [P:3, E:3]
- [ ] **Status Bar Item:** Add item to status bar using `vscode.window.createStatusBarItem`, set properties. [P:3, E:1]
- [ ] **Configuration:** Add setting to customize the tone/wording of user prompts (e.g., the create TODO.md prompt). [P:3, E:1]
- [ ] **Configuration Settings:** Allow user customization via Settings UI. [P:2, E:2]
  - [ ] `
