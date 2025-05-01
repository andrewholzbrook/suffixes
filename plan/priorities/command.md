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
