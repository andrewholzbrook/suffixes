# Suffixes Extension TODOs

---

# Next Steps

- [ ] **CodeLens Integration:** Implement `vscode.CodeLensProvider` to add interactive elements (e.g., "Open File", "Get LLM Prompt") within `TODOS.md`. [P:1, E:3]
  - [ ] Define `TodoCodeLensProvider` class (implement `provideCodeLenses` with basic console logging).
  - [ ] Register the provider in `extension.ts` (add console log on registration).
- [ ] **Hover Provider Integration:** Implement `vscode.HoverProvider` to show contextual info (e.g., LLM prompts, file details) on hover within `TODOS.md`. [P:1, E:2]
- [ ] **Suffix Logic Integration:** Connect TreeDataProvider to suffix detection logic. [P:1, E:2]

---

# Refine

- [ ] **Logging:** Standardize logging format and levels (e.g., use vscode.LogOutputChannel). [P:2, E:2]
- [ ] **TODOS.md Standardization:** Define and apply a consistent format/structure for this file, potentially leveraging CodeLens/Hovers. [P:2, E:2]

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
  - [ ] `package.json`: `contributes.configuration` (Define settings structure/defaults)
  - [ ] `vscode.workspace.getConfiguration` (Read settings)
  - [ ] `vscode.workspace.onDidChangeConfiguration` (React to changes). [P:1, E:2]

---

# Enhancements (Future Ideas)

- [ ] **Tree View Appearance & Interaction:** [P:3]
  - [ ] Basic Icons (ThemeIcon). [P:3, E:1]
  - [ ] Collapse/Expand (Inherent). [P:3, E:1]
  - [ ] Highlight Active File. [P:3, E:2]
  - [ ] Copy Path commands. [P:3, E:2]
  - [ ] Sorting options. [P:3, E:2]
  - [ ] Custom Appearance settings. [P:3, E:2]
  - [ ] Display Suffix in label/description. [P:3, E:2]
  - [ ] Search/Filter in Tree View. [P:3, E:3]
  - [ ] Hover Preview. [P:3, E:3]
  - [ ] Tooltips (size, date). [P:3, E:1]
  - [ ] Breadcrumbs integration. [P:3, E:3]
  - [ ] Pinning items. [P:3, E:2]
  - [ ] Display Settings (max items, etc.). [P:3, E:2]
- [ ] **Performance Enhancements:** [P:3]
  - [ ] Update Optimizations (virtual scrolling, granular updates). [P:3, E:3]
  - [ ] Indexing/Caching for large workspaces. [P:3, E:3]

---

# Out of Scope / Different Features

(These items represent significantly different features or separate extension ideas not covered by the current DESIGN.md.)
