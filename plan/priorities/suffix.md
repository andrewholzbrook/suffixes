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
