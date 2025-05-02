# Suffixes Extension TODOs

# Top 3 Priorities

- [ ] **Commands:** Define actions users can trigger (palette, menus, keybinds). [P:1, E:2]
  - [ ] `package.json`: `contributes.commands` (Define IDs `suffixes.addSuffix`, `suffixes.removeSuffix`, `suffixes.refreshTree`, titles, category). [P:1, E:3]
  - [ ] `vscode.commands.registerCommand` (Registers the command handlers) [P:1, E:2]
    - [ ] Implement handler for Refresh command (`suffixes.refreshTree`) to trigger `TreeDataProvider.refresh()`. [P:1, E:2]
- [x] **Activity Bar & View Container:** Add icon to sidebar, define custom view area. [P:1, E:1]
  - [x] `package.json`: `contributes.viewsContainers.activitybar` (Defines the container)
  - [x] `package.json`: `contributes.icons` (Optional: Defines custom icon path - using `$(list-tree)` for now)
  - [ ] Choose/prepare an icon file (e.g., SVG) or select a VS Code Product Icon (`$(icon-name)`). (Using `$(list-tree)` for now)
  - [ ] Document the new UI elements in `README.md`. [P:1, E:1]
  - [ ] Add entry to `CHANGELOG.md`. [P:1, E:1]
  - [x] Manually test: check icon, title, view panel appearance after loading the extension. [P:1, E:1]
- [x] **Tree View:** Display hierarchical data in a custom view. [P:1, E:3]
  - [x] `package.json`: `contributes.views` (Links view ID `suffixesTreeView` to container)
  - [x] `vscode.window.createTreeView` (Creates the view instance)
  - [x] `vscode.TreeDataProvider` (Interface to implement for data)
    - [ ] Implement `getChildren` to return a few hardcoded placeholder `TreeItem`s (e.g., `file1.txt`, `folderA/`). [P:1, E:3]
  - [ ] `vscode.TreeItem` (Represents an item in the tree)
    - [ ] Set properties (`iconPath`, `description`, `tooltip`, or `contextValue`) to visually distinguish files/folders with configured suffixes. [P:1, E:2]

# All Tasks

(Reference: Quick list of VS Code UI elements and APIs, sorted by typical implementation order for a UI-focused extension)

- [ ] **Configuration Settings:** Allow users to customize extension behavior via Settings UI. [P:2, E:2]
  - [ ] `package.json`: `contributes.configuration` (Defines settings structure and defaults for `suffixes.mappings` and `suffixes.ignoredPatterns`)
  - [ ] `vscode.workspace.getConfiguration` (Read `suffixes.mappings` and `suffixes.ignoredPatterns`)
  - [ ] `vscode.workspace.onDidChangeConfiguration` (Listen for changes to `suffixes.*` settings and trigger full reload/refresh). [P:1, E:2] _(Note: Promoted to P:1 based on previous explicit task)_
- [ ] **File System Watcher:** React to file creation, deletion, or changes on disk. [P:2, E:2]
  - [ ] `vscode.workspace.createFileSystemWatcher` (Detect file create/delete/rename events and trigger `TreeDataProvider.refresh()`). [P:1, E:2] _(Note: Promoted to P:1 based on previous explicit task)_
- [ ] **Suffix Logic Integration:** Create mechanism for `TreeDataProvider` to query the `Suffix` module/logic to determine if a file has a suffix. [P:1, E:2] _(Note: Core task, kept P:1)_
- [ ] **Commands:** (Continued Implementation) [P:2, E:3]
  - [ ] `vscode.commands.registerCommand` (Register handlers for Add/Remove commands)
    - [ ] Implement handlers for `suffixes.addSuffix` / `suffixes.removeSuffix`. [P:2, E:3]
      - Prompt user if necessary (e.g., `vscode.window.showInputBox` for suffix to add).
      - Interact with the `Suffix` module/logic to update suffix data.
- [ ] **Menus (Context Menus, View Actions, Command Palette):** Add commands to specific UI locations. [P:2, E:2]
  - [ ] `package.json`: `contributes.menus` (Defines where commands appear)
    - [ ] `view/item/context`: Context menu for items _within_ the `suffixesTreeView` to trigger Add/Remove commands (using `when` clauses based on `contextValue`). [P:2, E:2]
    - [ ] `view/title`: Buttons on the `suffixesTreeView` title bar for the Refresh command. [P:2, E:2]
    - [ ] `commandPalette`: Show relevant commands in Command Palette (Ctrl+Shift+P)
    - [ ] `editor/context`: (Optional) Context menu in the text editor
    - [ ] `explorer/context`: (Optional) Context menu in the File Explorer
  - [ ] `when` clauses are used within `menus` to control visibility based on context.
- [ ] **Suffix Logic Changes:** Ensure the `Suffix` module/logic can notify the Tree View (e.g., via events) when suffixes are added/removed via commands, triggering `TreeDataProvider.refresh()`. [P:2, E:2]
- [ ] **Directory Grouping:** Ensure `getChildren` correctly represents the hierarchical directory structure. (Largely inherent in TreeDataProvider, refine as needed). [P:2, E:2]
- [ ] **Input & Selection:** Prompt users for text input or choices from a list. [P:2, E:1]
  - [ ] `vscode.window.showInputBox` (Used for Add/Remove Suffix commands)
  - [ ] `vscode.window.showQuickPick` (Consider for future features)
- [ ] **Notifications:** Display messages (info, warning, error) to the user. [P:3, E:1]
  - [ ] `vscode.window.showInformationMessage`
  - [ ] `vscode.window.showWarningMessage`
  - [ ] `vscode.window.showErrorMessage`
- [ ] **Status Bar Item:** Show brief info or actions in the bottom status bar. [P:3, E:1]
  - [ ] `vscode.window.createStatusBarItem` (Creates the item)
  - [ ] `StatusBarItem` properties (e.g., `.text`, `.tooltip`, `.command`)
- [ ] **Decorations (Editor):** Apply visual styles (color, borders) to text in the editor. [P:3, E:2]
  - [ ] `vscode.window.createTextEditorDecorationType` (Defines styling for text ranges)
  - [ ] `TextEditor.setDecorations` (Applies decorations)
- [ ] **Webviews:** Create custom UI panels using HTML/CSS/JS. [P:3, E:3]
  - [ ] `vscode.window.createWebviewPanel` (Creates a custom HTML/JS/CSS view)
- [ ] **Enhancements (Tree View Appearance & Interaction):** [P:3]
  - [ ] **Basic Icons:** Use standard VS Code icons (`ThemeIcon`) for files and folders in the tree. [P:3, E:1]
  - [ ] **Collapse/Expand:** Ensure folders can be collapsed and expanded. (Largely inherent in TreeDataProvider). [P:3, E:1]
  - [ ] **Highlight Active File:** Highlight the currently active file in the Suffixes tree view. [P:3, E:2] _(S-M -> E:2)_
  - [ ] **Copy Path:** Add options for copying file paths from the tree view (e.g., full path, relative path). [P:3, E:2]
  - [ ] **Sorting:** Add sorting options to the tree view (e.g., by name, by type, by suffix status) with state persistence. [P:3, E:2]
  - [ ] **Custom Appearance:** Add settings for customizing the _appearance_ of suffixed items (e.g., specific icon, label format). [P:3, E:2]
  - [ ] **Suffix Display:** Display suffix directly in the tree item label or description. [P:3, E:2]
  - [ ] **Search/Filter:** Add basic text search/filter capability within the Suffixes tree view. [P:3, E:3] _(M-L -> E:3)_
  - [ ] **Hover Preview:** Show file content previews on hover (consider performance implications). [P:3, E:3]
  - [ ] **Tooltips:** Add file size and last modified date to tooltips. [P:3, E:1]
  - [ ] **Breadcrumbs:** Implement breadcrumb navigation reflecting suffix context (if applicable). [P:3, E:3]
  - [ ] **Pinning:** Allow pinning of specific suffixes or files/folders. [P:3, E:2]
  - [ ] **Display Settings:** Add settings for display properties like maximum items shown (if list becomes flat). [P:3, E:2]
- [ ] **Enhancements (Performance):** [P:3]
  - [ ] **Optimization:** Implement more advanced real-time update optimizations (e.g., virtual scrolling, more granular updates if needed). [P:3, E:3]
  - [ ] **Indexing/Caching:** Implement optimized workspace indexing/caching if performance becomes an issue with large workspaces. [P:3, E:3]

# Out of Scope / Different Features

These items represent significantly different features or separate extension ideas not covered by the current `DESIGN.md`.
