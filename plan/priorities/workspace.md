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
