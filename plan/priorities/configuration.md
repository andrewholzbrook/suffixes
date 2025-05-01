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
