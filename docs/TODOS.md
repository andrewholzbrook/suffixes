# Suffixes Extension TODOs

## VS Code UI Elements & APIs

Here's a quick reference for common VS Code UI elements and how extensions typically interact with them, sorted by typical implementation order for a UI-focused extension:

- [x] **Activity Bar Icon & View Container:** (S, High Priority) Add icon to sidebar, define custom view area.
  - [x] `package.json`: `contributes.viewsContainers.activitybar` (Defines the container)
  - [x] `package.json`: `contributes.icons` (Optional: Defines custom icon path - using `$(list-tree)` for now)
- [x] **Tree View:** (L, High Priority) Display hierarchical data in a custom view.
  - [x] `package.json`: `contributes.views` (Links view ID to container)
  - [x] `vscode.window.createTreeView` (Creates the view instance)
  - [x] `vscode.TreeDataProvider` (Interface to implement for data)
  - [ ] `vscode.TreeItem` (Represents an item in the tree)
- [ ] **Commands:** (M, High Priority) Define actions users can trigger (palette, menus, keybinds).
  - [ ] `package.json`: `contributes.commands` (Defines command ID, title, category)
  - [ ] `vscode.commands.registerCommand` (Registers the command handler)
- [ ] **Menus (Context Menus, View Actions, Command Palette):** (M, Medium Priority) Add commands to specific UI locations.
  - [ ] `package.json`: `contributes.menus` (Defines where commands appear)
    - [ ] `commandPalette`: Show in Command Palette (Ctrl+Shift+P)
    - [ ] `view/title`: Buttons on the view's title bar
    - [ ] `view/item/context`: Context menu for items _within_ a specific view
    - [ ] `editor/context`: Context menu in the text editor
    - [ ] `explorer/context`: Context menu in the File Explorer
  - [ ] `when` clauses are used within `menus` to control visibility based on context.
- [ ] **Configuration Settings:** (M, Medium Priority) Allow users to customize extension behavior via Settings UI.
  - [ ] `package.json`: `contributes.configuration` (Defines settings structure and defaults)
  - [ ] `vscode.workspace.getConfiguration` (Reads settings values)
  - [ ] `vscode.workspace.onDidChangeConfiguration` (Listens for changes)
- [ ] **File System Watcher:** (M, Medium Priority) React to file creation, deletion, or changes on disk.
  - [ ] `vscode.workspace.createFileSystemWatcher` (Monitors file changes)
- [ ] **Notifications:** (S, Low Priority) Display messages (info, warning, error) to the user.
  - [ ] `vscode.window.showInformationMessage`
  - [ ] `vscode.window.showWarningMessage`
  - [ ] `vscode.window.showErrorMessage`
- [ ] **Input & Selection:** (S, Medium Priority) Prompt users for text input or choices from a list.
  - [ ] `vscode.window.showInputBox` (Prompt for text input)
  - [ ] `vscode.window.showQuickPick` (Show a dropdown list for selection)
- [ ] **Status Bar Item:** (S, Low Priority) Show brief info or actions in the bottom status bar.
  - [ ] `vscode.window.createStatusBarItem` (Creates the item)
  - [ ] `StatusBarItem` properties (e.g., `.text`, `.tooltip`, `.command`)
- [ ] **Decorations (Editor):** (M, Low Priority) Apply visual styles (color, borders) to text in the editor.
  - [ ] `vscode.window.createTextEditorDecorationType` (Defines styling for text ranges)
  - [ ] `TextEditor.setDecorations` (Applies decorations)
- [ ] **Webviews:** (L, Low Priority) Create custom UI panels using HTML/CSS/JS.
  - [ ] `vscode.window.createWebviewPanel` (Creates a custom HTML/JS/CSS view)

---

# High Priority (Core MVP)

- [x] (M) **Activity Bar & View:** Define Activity Bar icon and Tree View container in `package.json`.
  - [x] (S) Understand `contributes.viewsContainers` and `contributes.views` in `package.json`.
  - [x] (S) Define the `viewsContainers` entry for the Activity Bar (ID, title, icon).
  - [ ] (S) Choose/prepare an icon file (e.g., SVG) or select a VS Code Product Icon (`$(icon-name)`). (Using `$(list-tree)` for now)
  - [x] (S) Define the `views` entry for the Tree View (ID, name, type) linked to the container.
  - [ ] (S) Ensure the chosen Tree View `id` is noted for use in `extension.ts` later. (`suffixesTreeView`)
  - [ ] (S) Document the new UI elements in `README.md`.
  - [ ] (S) Add entry to `CHANGELOG.md`.
  - [x] (S) Manually test: check icon, title, view panel appearance after loading the extension.
- [ ] (L) **TreeDataProvider Basics:** Implement `TreeDataProvider` to show workspace folder structure (`getChildren`).
  - [ ] (S) Implement `getChildren` to return a few hardcoded placeholder `TreeItem`s (e.g., `file1.txt`, `folderA/`).
- [ ] (M) **Configuration Integration:** Read basic `suffixes.mappings` and `suffixes.ignoredPatterns` from VS Code settings.
- [ ] (M) **Suffix Logic Integration:** Create mechanism for `TreeDataProvider` to query the `Suffix` module/logic to determine if a file has a suffix.
- [ ] (M) **Visual Distinction:** Set `TreeItem` properties (`iconPath`, `description`, `tooltip`, or `contextValue`) to visually distinguish files/folders with configured suffixes.
- [ ] (L) **Command Registration:** Register commands (`suffixes.addSuffix`, `suffixes.removeSuffix`, `suffixes.refreshTree`) in `package.json`.
- [ ] (M) **Command Implementation (Refresh):** Implement handler for Refresh command to trigger `TreeDataProvider.refresh()`.
- [ ] (M) **FileSystem Watcher:** Implement basic `FileSystemWatcher` to detect file create/delete/rename events. Trigger `TreeDataProvider.refresh()` on relevant changes.
- [ ] (M) **Configuration Changes:** Listen to `onDidChangeConfiguration` for relevant `suffixes.*` settings. Trigger full reload/refresh of suffix logic and `TreeDataProvider`.

---

# Medium Priority (Core MVP)

- [ ] (L) **Command Implementation (Add/Remove):** Implement handlers for Add/Remove commands. These should:
  - Prompt user if necessary (e.g., input for suffix to add).
  - Interact with the `Suffix` module/logic to update suffix data.
- [ ] (M) **Context Menus:** Define context menus (`menus` contribution in `package.json`) for files/folders in the tree view to trigger Add/Remove commands (using `when` clauses based on `contextValue`).
- [ ] (M) **View Actions:** Define view title actions (`menus` contribution) for the Refresh command.
- [ ] (M) **Suffix Logic Changes:** Ensure the `Suffix` module/logic can notify the Tree View (e.g., via events) when suffixes are added/removed via commands, triggering `TreeDataProvider.refresh()`.
- [ ] (M) **Directory Grouping:** Ensure `getChildren` correctly represents the hierarchical directory structure. (Largely inherent in TreeDataProvider).

---

# Low Priority (Core MVP & Enhancements)

- [ ] (S) **Basic Icons:** Use standard VS Code icons (`ThemeIcon`) for files and folders in the tree.
- [ ] (S) **Collapse/Expand:** Ensure folders can be collapsed and expanded. (Largely inherent in TreeDataProvider).
- [ ] (S-M) **Enhancement - Visual:** Highlight the currently active file in the Suffixes tree view.
- [ ] (M) **Enhancement - Interaction:** Add options for copying file paths from the tree view (e.g., full path, relative path).
- [ ] (M) **Enhancement - Navigation:** Add sorting options to the tree view (e.g., by name, by type, by suffix status) with state persistence.
- [ ] (M) **Enhancement - Configuration:** Add settings for customizing the _appearance_ of suffixed items (e.g., specific icon, label format).
- [ ] (M) **Enhancement - Visual:** Display suffix directly in the tree item label or description.
- [ ] (M-L) **Enhancement - Interaction:** Add basic text search/filter capability within the Suffixes tree view.
- [ ] (L) **Enhancement - Visual:** Show file content previews on hover (consider performance implications).
- [ ] (S) **Enhancement - Core Display:** Add file size and last modified date to tooltips.
- [ ] (L) **Enhancement - Interaction:** Implement breadcrumb navigation reflecting suffix context (if applicable).
- [ ] (L) **Enhancement - Performance:** Implement more advanced real-time update optimizations (e.g., virtual scrolling, more granular updates if needed).
- [ ] (L) **Enhancement - Performance:** Implement optimized workspace indexing/caching if performance becomes an issue with large workspaces.
- [ ] (M) **Enhancement - Interaction:** Allow pinning of specific suffixes or files/folders.
- [ ] (M) **Enhancement - Configuration:** Add settings for display properties like maximum items shown (if list becomes flat).

---

# Out of Scope / Different Features

These items represent significantly different features or separate extension ideas not covered by the current `DESIGN.md`.

- **Solo Extension Idea:** (All items listed under this heading in the original file)
  - `- [ ] - TODO.md Hover Buttons...`
  - `- [ ] - Hover over markdown checkbox...`
  - `- [ ] - AI TODO...`
  - `- [ ] - AI TRUNKY...`
  - `- [ ] - AI Word Association...`
- **Story: Pattern Configuration:** (All items related to dynamic pattern configuration based on match counts)
  - `- [ ] - Allow users to configure patterns per file type...`
  - `- [ ] - Use VS Code's quick pick for pattern selection...`
  - `- [ ] - Store patterns in workspace settings...`
  - _etc._
- **In-File Display Implementation Plan:** (All items related to showing matches in a split editor view)
  - `- [ ] - Create new class InFileDisplayProvider...`
  - `- [ ] - Implement basic split view display...`
  - `- [ ] - Show matching files in a list...`
  - _etc._
- **(From other stories):** Specific items clearly related to search/filtering features rather than the core tree view display (e.g., fuzzy search, match counts per suffix group if not tied to tree view).
