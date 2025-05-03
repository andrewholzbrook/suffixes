# Changelog

All notable changes to the "Suffixes" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - YYYY-MM-DD

### Added

- Initial extension structure.
- Suffixes Activity Bar icon (`resources/suffixes.svg`) and View Container.
- Basic "Suffixes Explorer" Tree View (`suffixesTreeView`).
  - Displays placeholder file/folder structure.
  - Uses `ThemeIcon` for basic file/folder icons.
  - Shows full path as item description.
  - Sets `contextValue` ('file'/'folder') for items.
- Refresh command (`suffixes.refreshTree`) available in Command Palette.
- Refresh button added to the Suffixes Explorer view title bar.
- **CodeLens Integration:** Basic implementation of `vscode.CodeLensProvider` for `TODOS.md`.
- **Hover Provider Integration:** Implement `vscode.HoverProvider` to show contextual info (e.g., LLM prompts, file details) on hover within `TODOS.md`.
  - Basic implementation showing static text.
  - Show hovered line content.
  - **Command Links:** Add simple actions (Open tree view, refresh) to hover.

### Changed

- **TODO File Prompt:**
  - Changed dismiss button text to "Don't Show Again" for clarity.
  - Refactored prompt logic into a helper function (`_showAndHandleCreateTodoPrompt`).
  - The prompt now calls the `suffixes.createTodoFile` command.
- **TODO File Path:** The location for the TODO file is now configurable via the `suffixes.todo.filePath` setting (defaults to `.vscode/TODO.md`).

### Fixed

- **Activation Error:** Resolved `CodeExpectedError` caused by unregistered `suffixes.prompt.disableCreateTodo` configuration setting.
- **Activation Race Condition:** Ensured commands are registered before potentially showing the TODO file creation prompt during activation.
- **TODO File Creation:** Implemented the actual file creation logic in the `suffixes.createTodoFile` command.

## [Unreleased]

### Added

- Command `suffixes.createTodoFile` now populates the new `.vscode/TODO.md` with a basic template structure from `src/templates/initialTodoContent.md`.
