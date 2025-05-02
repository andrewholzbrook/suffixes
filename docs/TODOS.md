# Suffixes Extension TODOs

- [ ] **Logging:** Standardize logging format and levels (e.g., use vscode.LogOutputChannel). [P:?, E:?]

---

# Top 3 Priorities (Next Steps)

- [x] **Tree View:** Implement basic functionality. [P:1, E:3]
  - [x] package.json: contributes.views (Links view ID `suffixesTreeView` to container)
  - [x] vscode.window.createTreeView (Create view instance - _Done in `createAndRegisterUIComponents`_)
  - [x] vscode.TreeDataProvider (Register provider instance - _Done in `registerSuffixTreeDataProvider`_)
    - [ ] Implement getChildren to return hardcoded placeholder TreeItems (e.g., `file1.txt`, `folderA/`). [P:1, E:3] _<- NEXT_
  - [ ] vscode.TreeItem (Set visual properties like iconPath, description, contextValue). [P:1, E:2]
- [ ] **Commands:** Implement core commands. [P:1, E:2]
  - [ ] package.json: contributes.commands (Define `suffixes.refreshTree` - _Partially done_, Add/Remove later). [P:1, E:3]
  - [x] vscode.commands.registerCommand (Register handlers - _Done in `registerCommands`_)
    - [x] Implement handler for Refresh (`suffixes.refreshTree`) to trigger TreeDataProvider.refresh(). [P:1, E:2]
- [x] **Activity Bar & View Container:** Basic UI setup. [P:1, E:1]
  - [x] package.json: contributes.viewsContainers.activitybar (Define container)
  - [x] package.json: contributes.icons (Using default `$(list-tree)` icon for now)
  - [ ] Choose/prepare a custom icon (e.g., SVG). (Optional)
  - [ ] Document new UI in README.md. [P:1, E:1]
  - [ ] Add entry to CHANGELOG.md. [P:1, E:1]
  - [x] Manually tested basic appearance.

---

# All Tasks

(Reference: Quick list of VS Code UI elements and APIs)

- [ ] **Configuration Settings:** Allow user customization via Settings UI. [P:2, E:2]
  - [ ] package.json: contributes.configuration (Define settings structure/defaults)
  - [ ] vscode.workspace.getConfiguration (Read settings)
  - [ ] vscode.workspace.onDidChangeConfiguration (React to changes). [P:1, E:2]
- [ ] **File System Watcher:** React to file system changes. [P:2, E:2]
  - [ ] vscode.workspace.createFileSystemWatcher (Detect changes and trigger TreeDataProvider.refresh()). [P:1, E:2]
- [ ] **Suffix Logic Integration:** Connect TreeDataProvider to suffix detection logic. [P:1, E:2]
- [ ] **Commands (Continued):** Implement Add/Remove suffix functionality. [P:2, E:3]
  - [ ] package.json: Define `addSuffix`, `removeSuffix` commands.
  - [ ] vscode.commands.registerCommand: Register handlers.
    - [ ] Implement handlers (prompt user, update suffix data).
- [ ] **Menus (Context Menus, View Actions, Palette):** Add commands to UI locations. [P:2, E:2]
  - [ ] package.json: contributes.menus (Define placements like view/item/context, view/title).
  - [ ] Use `when` clauses for context-aware visibility.
- [ ] **Suffix Logic Changes:** Enable notification from suffix logic to Tree View for updates. [P:2, E:2]
- [ ] **Directory Grouping:** Ensure getChildren correctly handles directory hierarchy. [P:2, E:2]
- [ ] **Input & Selection:** Implement user prompts. [P:2, E:1]
  - [ ] vscode.window.showInputBox (For Add/Remove commands).
  - [ ] vscode.window.showQuickPick (For future features).
- [ ] **Notifications:** User feedback messages. [P:3, E:1]
  - [ ] vscode.window.showInformationMessage, showWarningMessage, showErrorMessage.
- [ ] **Status Bar Item:** Add item to status bar. [P:3, E:1]
  - [ ] vscode.window.createStatusBarItem, set properties.
- [ ] **Decorations (Editor):** Apply visual styles in the editor. [P:3, E:2]
  - [ ] vscode.window.createTextEditorDecorationType, TextEditor.setDecorations.
- [ ] **Webviews:** Create custom HTML/CSS/JS panels. [P:3, E:3]
  - [ ] vscode.window.createWebviewPanel.

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
