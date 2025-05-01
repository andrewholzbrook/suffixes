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
