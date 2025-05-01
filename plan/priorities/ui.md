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
