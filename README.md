# Suffixes VS Code Extension

A VS Code extension that helps you manage and navigate files with similar suffixes.

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

## Features

- **Suffix Grouping**: Automatically groups files with similar suffixes
- **Multiple Views**: Access files through TreeView, split view, or CodeLens
- **Real-time Updates**: File list updates automatically as you add/remove files
- **Customizable**: Configure which suffixes to track and which directories to ignore

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
