# Configuration Priorities

## Current Focus: Supporting Suffix Logic and Feature Toggles

### Goals:

1.  **Define Settings:** Clearly define the structure and keys for suffix-related settings in `package.json` (`contributes.configuration`).
    - e.g., `suffixes.mappings` (object mapping file paths/patterns to suffixes).
    - e.g., `suffixes.ignoredPatterns` (list of glob patterns to ignore).
    - e.g., `suffixes.enableTreeView` (boolean toggle).
2.  **Provide Access:** Offer a centralized way for other components to read the current configuration values.
3.  **Monitor Changes:** Watch for changes to the relevant configuration sections (`onDidChangeConfiguration`).
4.  **Notify Consumers:** Notify components (like Suffix logic, UI) when relevant settings change so they can adapt (e.g., reload mappings, update watcher scope, refresh UI).

### Related VS Code Concepts:

- `vscode.workspace.getConfiguration(section)`
- `WorkspaceConfiguration` interface (`get`, `has`, `update`)
- `vscode.workspace.onDidChangeConfiguration`
- `contributes.configuration` in `package.json`

### Dependencies on other areas:

- **Suffix:** Needs configuration data to load its mappings.
- **FileSystem:** May need ignored patterns from configuration.
- **UI:** May need configuration settings to enable/disable features or change behavior.

---

# Command Priorities

## Current Focus: Supporting File Tree View Interactions

### Goals:

1.  **Register Commands:** Register the necessary commands defined in `package.json` (or dynamically) that the user can invoke.
2.  **Implement Handlers:** Provide the implementation (handler functions) for each registered command.
3.  **Core Suffix Actions:** Implement commands for:
    - Adding a suffix (likely prompting the user for input).
    - Removing a suffix from a specific file.
    - Refreshing the File Tree View.
4.  **Invocation:** Commands will be triggered by:
    - User activating them from the Command Palette.
    - User clicking icons in the view title (e.g., Refresh).
    - User clicking items in context menus.
5.  **Integration:** Command handlers will interact with other components (Suffix logic, UI) to perform actions and update state.

### Related VS Code Concepts:

- `vscode.commands.registerCommand(commandId, handler)`
- `contributes.commands` in `package.json`
- `contributes.menus` (defines where commands appear)
- VS Code UI APIs for input (`showInputBox`, `showQuickPick`) if needed by handlers.

### Dependencies on other areas:

- **UI:** Needs commands to be registered to attach them to buttons and menus. UI interactions trigger commands.
- **Suffix:** Command handlers will call suffix logic methods to add/remove/update suffixes.
- **Extension Entry Point (`extension.ts`):** Responsible for calling the registration logic.

---

# FileSystem Priorities

## Current Focus: Supporting the File Tree View Updates

### Goals:

1.  **Monitor Changes:** Watch the workspace for file creation, deletion, and modification events.
2.  **Relevant Scope:** Focus watching on file types or directories relevant to suffix configuration, if applicable, or watch broadly within workspace folders.
3.  **Notification:** Notify relevant components (primarily the UI's TreeDataProvider) when file system changes occur that require a view update.
4.  **Performance:** Implement efficiently, potentially using debouncing for rapid changes if necessary.
5.  **File Operations (Future):** Potentially provide helpers for reading/writing files if the extension needs to modify files directly (e.g., apply suffixes - _scope to be confirmed_).

### Related VS Code Concepts:

- `vscode.workspace.createFileSystemWatcher(globPattern)`
- `FileSystemWatcher` interface (`onDidChange`, `onDidCreate`, `onDidDelete`, `dispose`)
- `vscode.workspace.fs` API (for potential direct read/write)
- `vscode.RelativePattern` (for scoping watchers)

### Dependencies on other areas:

- **Workspace:** Needs workspace folder information to set up watchers correctly.
- **UI:** Needs to be notified of changes to refresh the File Tree View.
- **Configuration:** May need settings to determine which files/patterns to watch or ignore.

---

# Workspace Priorities

## Current Focus: Supporting the File Tree View & Core Functionality

### Goals:

1.  **Identify Workspace Roots:** Provide access to the list of currently open `WorkspaceFolder` objects.
2.  **Handle Multi-Root:** Ensure functionality works correctly whether one or multiple folders are open.
3.  **Detect Changes:** Monitor and notify when workspace folders are added or removed (`onDidChangeWorkspaceFolders`).
4.  **Path Resolution:** Offer utilities to determine if a given file path belongs to the current workspace.
5.  **Provide Context:** Supply workspace folder information to other components (like the UI for the tree view root).

### Related VS Code Concepts:

- `vscode.workspace.workspaceFolders`
- `vscode.workspace.getWorkspaceFolder(uri)`
- `vscode.workspace.onDidChangeWorkspaceFolders`
- `vscode.WorkspaceFolder` interface

### Dependencies on other areas:

- **UI:** Needs the list of workspace folders to render the tree view root(s).
- **FileSystem:** May need workspace context to configure file watchers appropriately.

---

# Suffix Logic Priorities

## Current Focus: Supporting the File Tree View

### Goals:

1.  **Data Storage:** Define and manage how suffix configurations are stored (e.g., map file paths to suffix strings).
2.  **Configuration Loading:** Load suffix settings from the defined source (likely VS Code settings).
3.  **Querying:** Provide a way for other components (like the UI) to query:
    - If a specific file path has a suffix configured.
    - What the suffix is for a given file path.
    - A list of all currently configured suffixes.
4.  **Modification:** Provide methods to:
    - Add a new suffix configuration for a file.
    - Remove an existing suffix configuration for a file.
    - Update a suffix configuration.
5.  **Notification:** Emit events or messages when the suffix configuration changes (e.g., after an add/remove operation or after settings are reloaded) so other components (like the UI) can react.

### Related VS Code Concepts:

- `workspace.getConfiguration` to read settings.
- Potentially storing state in `ExtensionContext.workspaceState` or `globalState` if not solely relying on settings.

### Dependencies on other areas:

- **Configuration:** Needs to know which configuration keys to read.
- **UI:** Will trigger add/remove/update operations based on user interaction.
- **Command:** Commands will likely invoke the modification methods.

---

# UI Priorities

## Current Focus: File Tree View

### Goals:

1.  **Visibility:** Provide an icon in the VS Code Activity Bar to launch the Suffixes view.
2.  **Structure:** Display a tree representation of the current workspace.
    - Handle single-root and multi-root workspaces correctly.
    - Show folders and files in a hierarchical manner.
3.  **Suffix Indication:** Visually distinguish files that have suffixes configured (e.g., unique icon, description text, or styling).
4.  **Interactivity:**
    - Allow users to expand/collapse folders.
    - Provide context menu actions on files/folders (e.g., Add Suffix, Remove Suffix).
    - Include view-level actions (e.g., Refresh Tree, Add Suffix to selected).
5.  **Responsiveness:** Update the tree view automatically when changes occur (file system changes, suffix configuration changes).

### Related VS Code Concepts:

- `viewsContainers` / `activitybar` contribution
- `views` contribution (specifically `TreeView`)
- `TreeDataProvider` interface
- `TreeItem` class (potentially custom subclass)
- `commands` contribution
- `menus` contribution (for context menus and view title icons)
- `when` clauses for conditional command/menu visibility

### Dependencies on other areas:

- **Workspace:** Needs the list of open workspace folders.
- **FileSystem:** Needs notifications about file/folder changes.
- **Suffix:** Needs data about which files have suffixes and the ability to trigger suffix add/remove actions.
- **Command:** Needs commands to be registered for the UI actions.
