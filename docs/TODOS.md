# Suffixes Extension TODOs

---

# Next 3

- [x] **Empty Project: Define Trigger:** Check for `TODOS.md` within the `activate` function on extension startup. [P:1, E:1]
- [x] **Empty Project: Determine TODO Location:** Decide the default path: USE `.vscode/TODO.md`. [P:1, E:1]
- [x] **Empty Project: Check Dismissal State:** Read `context.workspaceState` (key: `'suffixes.prompt.createTodoDismissed'`) to check dismissal status. [P:1, E:1]

---

# Ready

- [ ] **Empty Project: Implement User Prompt:** Implement notification asking user to create `.vscode/TODO.md` (using `showInformationMessage`). [P:1, E:1]
- [ ] **Empty Project: Handle Dismissal:** Save dismissal choice to `context.workspaceState` using key `'suffixes.prompt.createTodoDismissed'`. [P:1, E:1]
- [ ] **Empty Project: Create Empty File:** Implement logic to create an _empty_ `.vscode/TODO.md` file (`workspace.fs.writeFile`). [P:1, E:1]
- [ ] **Empty Project: Open Created File:** Open the newly created `.vscode/TODO.md` file for the user (`openTextDocument`, `showTextDocument`). [P:1, E:1]
- [ ] **Empty Project: Define Initial TODO Content:** Specify the (potentially empty) content for the initial file. [P:2, E:1]
- [ ] **Refactor: Update File References:** Audit code (HoverProvider, TreeView, etc.) and update any references to use the decided `.vscode/TODO.md` path. [P:2, E:1]
- [ ] **Empty Project: Update UI/Command States:** Adjust Tree View display and command availability based on file existence or user choice. [P:2, E:2]

---

# Refine

- [ ] **Empty Project User Story:** Define the user experience and expected behavior when the extension is activated in a completely empty workspace. [P:1, E:1]
  - [ ] **Future Guidance Strategy:** Plan how to populate/guide the user _after_ the initial empty `.vscode/TODO.md` file is created.
  - [ ] **Configuration:** Add settings to disable scaffolding, customize location (defaulting to `.vscode/TODO.md`).
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

---

# Core Logic & Integration

- [ ] **Suffix Logic Changes:** Enable notification from suffix logic to Tree View for updates. [P:2, E:2]
- [ ] **File System Watcher:** React to file system changes using `vscode.workspace.createFileSystemWatcher` (Detect changes and trigger `TreeDataProvider.refresh()`). [P:2, E:2]

---

# UI & UX (Tree View, Menus, etc.)

- [ ] **Directory Grouping:** Ensure `getChildren` correctly handles directory hierarchy. [P:2, E:2]
- [ ] **Menus (Context Menus, View Actions, Palette):** Add commands to UI locations using `contributes.menus` in `package.json` (Define placements like `view/item/context`, `view/title`) and use `when` clauses for context-aware visibility. [P:2, E:2]
- [ ] **Decorations (Editor):** Apply visual styles in the editor using `vscode.window.createTextEditorDecorationType`, `TextEditor.setDecorations`. [P:3, E:2]
- [ ] **Webviews:** Create custom HTML/CSS/JS panels using `vscode.window.createWebviewPanel`. [P:3, E:3]
- [ ] **Status Bar Item:** Add item to status bar using `vscode.window.createStatusBarItem`, set properties. [P:3, E:1]
- [ ] **Input & Selection:** Implement user prompts using `vscode.window.showInputBox` (For Add/Remove commands) and `vscode.window.showQuickPick` (For future features). [P:2, E:1]
- [ ] **Notifications:** User feedback messages using `vscode.window.showInformationMessage`, `showWarningMessage`, `showErrorMessage`. [P:3, E:1]

---

# Commands

- [ ] **Commands (Add/Remove):** Implement Add/Remove suffix functionality. [P:2, E:3]
  - [ ] `package.json`: Define `addSuffix`, `removeSuffix` commands.
  - [ ] `vscode.commands.registerCommand`: Register handlers.
    - [ ] Implement handlers (prompt user, update suffix data).

---

# Configuration & Workspace

- [ ] **Configuration Settings:** Allow user customization via Settings UI. [P:2, E:2]
  - [ ] `
