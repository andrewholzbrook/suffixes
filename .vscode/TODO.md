# Suffixes Extension TODOs

## Current Initiative

> **Define the main goal/theme for this work cycle and link it to project objectives.** > _Example: Implement Core TODO File Scaffolding -> Improve new user onboarding_ > **Current:** [Your initiative description here]

<!-- QUICK IDEA INPUT: Add new raw ideas directly under the '# Refine' header below for quick capture and later triage. -->

---

# Next 3

> **MODE: Execute.** Work the top `[ ]` task. When done: Mark `[x]`, Log to change log (if necessary, and translate verbiage if necessary), Remove, Ask user if ready to commit. **Trigger:** If this list is empty or blocked, go to `# Ready`. (Ref: Full Instructions)

- [ ] **Empty Project: Open Created File:** Open the newly created `.vscode/TODO.md` file for the user (`openTextDocument`, `showTextDocument`). [P:1, E:1]
- [ ] **Empty Project: Define Initial TODO Content:** Specify the (potentially empty) content for the initial file. [P:2, E:1]
- [ ] **Refactor: Update File References:** Audit code (HoverProvider, TreeView, etc.) and update any references to use the decided `.vscode/TODO.md` path. [P:2, E:1]

---

# Ready

> **MODE: Replenish `# Next 3`.** **Trigger:** When `# Next 3` has space. Select top 1-3 (P/E, sequence). Move them to `# Next 3`. **Trigger:** If this list is empty/low, go to `# Refine`. (Ref: Full Instructions)

- [ ] **Empty Project: Update UI/Command States:** Adjust Tree View display and command availability based on file existence or user choice. [P:2, E:2]

---

# Refine

> **MODE: Prepare for `# Ready`.** **Trigger:** When `# Ready` needs items. Clarify tasks, break down, add P/E. Move defined tasks to `# Ready`. **Trigger:** If this list is empty/low, go to `# Backlog`. (Ref: Full Instructions)

- [ ] **Configuration:** Add setting to customize the tone/wording of user prompts (e.g., the create TODO.md prompt). [P:3, E:1]
- [ ] **Empty Project User Story:** Define the user experience and expected behavior when the extension is activated in a completely empty workspace. [P:1, E:1]
  - [ ] **Future Guidance Strategy:** Plan how to populate/guide the user _after_ the initial empty `.vscode/TODO.md` file is created.
  - [ ] **Documentation:** Document the scaffolding feature, including the default `.vscode/TODO.md` location.
- [ ] **Hover Provider Integration:** Implement `vscode.HoverProvider` to show contextual info (e.g., LLM prompts, file details) on hover within `TODOS.md`. [P:1, E:2]
  - [ ] **Clean up HoverProvider.ts** Some things in here can be extracted out.
  - [ ] **Command Links (continued):** Add actions (Mark Done, Open File, Copy) to hover. [P:2, E:2]
  - [ ] **CancellationToken** Explore `token: vscode.CancellationToken` and how it would be used
  - [ ] **LLM Prompt Integration:** Define convention & display linked prompts. [P:2, E:2]
  - [ ] **Define Task Format:**
  - [ ] **Parse Task Metadata:** Extract checkbox status, P/E tags, description. [P:1, E:1]
  - [ ] **Configuration:** Allow user to customize hover content. [P:2, E:1]
  - [ ] **Context from Related Files:** Show snippets/details of linked files. [P:3, E:3]
  - [ ] **(don't understand purpose yet) File/Symbol Linking:** Detect and link file paths/symbols in descriptions. [P:2, E:2]
- [ ] **Logging:** Standardize logging format and levels (e.g., use vscode.LogOutputChannel). [P:2, E:2]
- [ ] **TODOS.md Standardization:** Define and apply a consistent format/structure for this file, potentially leveraging CodeLens/Hovers. [P:2, E:2]
- [ ] **Suffix Logic Integration:** Connect TreeDataProvider to suffix detection logic. [P:3, E:2]
- [ ] **CodeLens Integration - 2:** Logging when `/docs/TODOS.md# Next Steps` clicked added, explore next steps
- [ ] **VIEW_IDS** Find a place for this.
- [ ] **Clean up registerCommands** Some things in here can be extracted out.
- [ ] **Rename extension** to something a little less specific to the "suffixes" concept.
- [ ] **AppName Wrangling** Find all instances of current app name "suffixes", veryify it's being used as the app name, make it a const
- [ ] Split apart command registration into granular registrations, one per file, files in their domain
- [ ] Move `/src/codeLens/` and `/src/hover/` stuff dealing direction with the TODO.md file into the `/todoFile/` dir.

---

# Backlog

> **MODE: Capture Ideas.** Add raw thoughts/low-priority items. **Trigger:** Periodically review; promote viable tasks to `# Refine`.

- [ ] **VSCode Extension Exploration - Menus (Context Menus, View Actions, Palette):** Add commands to UI locations using `contributes.menus` in `package.json` (Define placements like `view/item/context`, `view/title`) and use `when` clauses for context-aware visibility. [P:2, E:2]
- [ ] **VSCode Extension Exploration - Decorations (Editor):** Apply visual styles in the editor using `vscode.window.createTextEditorDecorationType`, `TextEditor.setDecorations`. [P:3, E:2]
- [ ] **Webviews:** Create custom HTML/CSS/JS panels using `vscode.window.createWebviewPanel`. [P:3, E:3]
- [ ] **Status Bar Item:** Add item to status bar using `vscode.window.createStatusBarItem`, set properties. [P:3, E:1]
- [ ] **Configuration Settings:** Allow user customization via Settings UI. [P:2, E:2]
  - [ ] `

---
