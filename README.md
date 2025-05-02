# Suffixes VS Code Extension

A VS Code extension that helps you manage and navigate files with similar suffixes.

## Features

- **Activity Bar Icon**: Provides quick access to the Suffixes Explorer view.
- **Suffixes Explorer View**: A dedicated tree view showing files grouped by suffixes (placeholder implementation currently).
  - Displays files and folders (currently hardcoded placeholders like README.md and src/extension.ts).
  - Shows file/folder paths as descriptions.
  - Includes a Refresh button in the view title bar.
- **Suffix Grouping**: (Future) Automatically groups files with similar suffixes.
- **Multiple Views**: (Future) Access files through TreeView, split view, or CodeLens.
- **Real-time Updates**: (Future) File list updates automatically as you add/remove files.
- **Customizable**: Configure which suffixes to track and which directories to ignore (via Settings).

## Getting Started (Current State)

1.  **Find the Icon**: Look for the Suffixes icon (using the custom `resources/suffixes.svg` icon) in the VS Code Activity Bar (usually on the left-hand side).
2.  **Open the View**: Click the icon to open the "Suffixes Explorer" tree view.
3.  **Explore (Placeholders)**: You'll see a basic tree structure with placeholder items.
4.  **Refresh**: Use the refresh icon in the view's title bar to manually trigger a refresh (reloads the placeholder data).

## Ways to Use the Extension

### 1. Activity Bar

- Look for the Suffixes icon in VS Code's activity bar (side bar)
- Click to see all suffix groups and their files in a TreeView
- Files are grouped by their suffix patterns

### 2. Status Bar

- When viewing a file with a matching suffix, you'll see a "Show Suffix Matches" button
- Click to view related files in a split view
- Automatically appears/disappears based on the current file

### 3. Commands

Open the command palette (Cmd/Ctrl+Shift+P) and type:

- `Suffixes: Show Matches` - Opens matches in a panel
- `Suffixes: Show Matches in Split View` - Shows matches beside current file

### 4. CodeLens

- Look for the clickable text above files with matching suffixes
- Shows the number of related files
- Click to view all matches

## Configuration

The extension can be configured through VS Code's settings:

```json
{
  "suffixes.enabledPatterns": ["form.tsx", "model.ts", "test.ts", "spec.ts", "component.tsx"],
  "suffixes.ignorePatterns": ["node_modules", "dist", "build"],
  "suffixes.showCodeLens": true,
  "suffixes.showTreeView": true
}
```

### Settings

- `suffixes.enabledPatterns`: Array of suffix patterns to track
- `suffixes.ignorePatterns`: Directories to ignore when scanning
- `suffixes.showCodeLens`: Toggle CodeLens visibility
- `suffixes.showTreeView`: Toggle TreeView panel visibility

## Supported Suffixes

The extension supports both simple and compound suffixes:

- Simple: `.ts`, `.tsx`, `.js`, `.jsx`
- Compound: `.test.ts`, `.spec.tsx`, `.component.tsx`, `.container.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
