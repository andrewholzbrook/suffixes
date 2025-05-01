# Story: File Tree View

## 1. Description

As a VS Code user,
I want to click the explorer icon and see a file tree view of my workspace,
So that I can navigate and manage my suffix configurations visually.

## 2. Acceptance Criteria

1.  An icon for this extension is visible in the VS Code activity bar.
2.  Clicking this icon opens a dedicated tree view panel.
3.  The file tree view accurately represents the workspace structure (folders and files).
4.  Files with configured suffixes are visually distinct (e.g., different icon, description, styling).
5.  The tree view updates automatically in response to relevant changes (file system, configuration).
6.  Context menus on tree items provide relevant actions (e.g., Add/Remove Suffix).
7.  View-level actions (e.g., Refresh) are available.

## 3. Technical Details

### 3.1 UI Components & VS Code Contributions

- **Activity Bar Icon:** Defined in `package.json` under `contributes.viewsContainers.activitybar`.
- **Tree View Container:** Defined in `package.json` under `contributes.views` linked to the activity bar container.
- **TreeDataProvider:** A custom class implementing `vscode.TreeDataProvider` interface.
- **TreeItem:** A custom class extending `vscode.TreeItem` to represent folders/files, including suffix status.
- **Commands:** Defined in `package.json` under `contributes.commands` for actions like refresh, add, remove.
- **Menus:** Defined in `package.json` under `contributes.menus` to place commands in:
  - `view/title`: For view-level actions (e.g., refresh icon).
  - `view/item/context`: For context menus on tree items.
- **Configuration (`package.json` Snippet):**
  ```json
  {
    "contributes": {
      "views": {
        "suffixes-explorer": [
          {
            "id": "suffixesFileExplorer",
            "name": "Suffixes Explorer",
            "icon": "resources/icons/suffix-explorer.svg", // TODO: Create icon
            "contextualTitle": "Suffixes Explorer"
          }
        ]
      },
      "viewsContainers": {
        "activitybar": [
          {
            "id": "suffixes-explorer",
            "title": "Suffixes Explorer",
            "icon": "resources/icons/suffix-explorer.svg" // TODO: Create icon
          }
        ]
      },
      "commands": [
        {
          "command": "suffixes.explorer.refresh",
          "title": "Refresh Suffixes Explorer",
          "icon": "$(refresh)",
          "category": "Suffixes"
        },
        {
          "command": "suffixes.explorer.addSuffix",
          "title": "Add Suffix",
          "icon": "$(add)",
          "category": "Suffixes"
        },
        {
          "command": "suffixes.explorer.removeSuffix",
          "title": "Remove Suffix",
          "icon": "$(remove)",
          "category": "Suffixes"
        }
      ],
      "menus": {
        "view/title": [
          {
            "command": "suffixes.explorer.refresh",
            "when": "view == suffixesFileExplorer",
            "group": "navigation"
          },
          {
            "command": "suffixes.explorer.addSuffix", // Consider if this makes sense here
            "when": "view == suffixesFileExplorer",
            "group": "navigation"
          }
        ],
        "view/item/context": [
          {
            "command": "suffixes.explorer.addSuffix",
            // Use context value set on TreeItem based on suffix status
            "when": "view == suffixesFileExplorer && viewItem.contextValue == 'suffixFileWithoutSuffix'",
            "group": "inline@1"
          },
          {
            "command": "suffixes.explorer.removeSuffix",
            "when": "view == suffixesFileExplorer && viewItem.contextValue == 'suffixFileWithSuffix'",
            "group": "inline@1"
          }
          // Potentially add other actions like 'Open File'
        ]
      }
    }
  }
  ```

### 3.2 Functional Area Responsibilities (High-Level)

- **UI:** Register and manage the `TreeDataProvider`, handle view rendering and user interactions (clicks, context menus).
- **Workspace:** Provide the list of workspace folders.
- **FileSystem:** Watch for file changes and notify the UI to refresh.
- **Suffix:** Provide data on which files have suffixes, handle add/remove logic invoked by commands.
- **Command:** Implement the handlers for `suffixes.explorer.*` commands.
- **Configuration:** Provide settings (e.g., ignored files) and notify on changes.

### 3.3 Key Events & Interactions

1.  **Activation:** Extension activates, modules initialize.
2.  **Icon Click:** User clicks activity bar icon -> VS Code shows the `suffixesFileExplorer` view.
3.  **View Population:** VS Code calls `TreeDataProvider.getChildren()`:
    - Provider asks `Workspace` module for folders.
    - Provider asks `FileSystem` module (or VS Code API) for files/folders within roots.
    - Provider asks `Suffix` module if each file has a suffix.
    - Provider returns `TreeItem[]`.
4.  **File Change:** `FileSystem` module detects change -> Notifies `UI` -> `TreeDataProvider` fires `onDidChangeTreeData` -> VS Code calls `getChildren()` again.
5.  **Config Change:** `Configuration` module detects change -> Notifies `Suffix` module (to reload mappings) and `UI` module -> `TreeDataProvider` fires `onDidChangeTreeData`.
6.  **Context Menu Action:** User right-clicks item -> VS Code shows menu based on `viewItem.contextValue` -> User clicks action -> Corresponding command handler runs -> Handler calls `Suffix` module -> `Suffix` module notifies `UI` -> `TreeDataProvider` fires `onDidChangeTreeData`.

## 4. Implementation Steps (Guide)

1.  Define icons and add contributions to `package.json` (as above).
2.  Create the `TreeDataProvider` implementation class.
3.  Implement `getChildren` logic to fetch workspace structure.
4.  Integrate with `Suffix` module to determine `hasSuffix` for items.
5.  Set `contextValue` on `TreeItem` based on `hasSuffix`.
6.  Implement command handlers (`suffixes.explorer.*`).
7.  Connect `FileSystem` change events to trigger `TreeDataProvider.refresh()`.
8.  Connect `Configuration` change events to trigger refreshes/reloads.
9.  Connect `Suffix` change events (after add/remove) to trigger `TreeDataProvider.refresh()`.

## 5. Test Plan Summary

### 5.1 Unit Tests

- **TreeDataProvider:**
  - Verify `getChildren` returns correct structure for empty, single-root, multi-root workspaces.
  - Verify `getTreeItem` returns the element.
  - Verify `contextValue` is set correctly based on mock suffix data.
- **Command Handlers:**
  - Verify `addSuffix` handler calls appropriate UI prompt and Suffix service.
  - Verify `removeSuffix` handler calls Suffix service.
  - Verify `refresh` handler triggers `TreeDataProvider.refresh()`.
- **Other Modules:** Verify methods used by the Tree View (e.g., `Workspace.getFolders`, `Suffix.hasSuffix`, etc.).

### 5.2 Integration Tests

- **Provider + Suffix Logic:** Test that the TreeDataProvider correctly reflects suffix status provided by the Suffix module.
- **Provider + FileSystem:** Test that file system events correctly trigger tree refreshes.
- **Command + Suffix + UI:** Test the flow from command execution to Suffix logic update to UI refresh.

### 5.3 E2E / Manual Tests

- Click activity bar icon -> View opens.
- Verify tree structure matches workspace.
- Verify suffix indication (requires implementing suffix logic).
- Add/Remove file -> Tree updates.
- Add/Remove workspace folder -> Tree updates.
- Execute Add/Remove Suffix command via context menu -> Tree updates correctly.
- Execute Refresh command -> Tree updates.
- Test with large workspace / rapid file changes for performance.
- Check console for errors.

## 6. Dependencies & Limitations

- **Dependencies:** VS Code API (TreeView, FileSystem, Workspace, Configuration, Commands, Menus).
- **Limitations:** Potential performance issues in very large workspaces (mitigate with efficient data fetching, debouncing updates). Complex ignore patterns might be deferred.
