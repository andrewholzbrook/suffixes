import * as vscode from 'vscode';

import { HoverProvider } from './HoverProvider';

export function registerHoverProvider(context: vscode.ExtensionContext) {
  const todoHoverProvider = new HoverProvider();

  // Get the configured path, default to .vscode/TODO.md
  const config = vscode.workspace.getConfiguration('suffixes');
  const todoFilePathPattern = config.get<string>('todo.filePath', '.vscode/TODO.md');
  // Ensure the pattern is suitable for a glob (relative to workspace)
  const globPattern = `**/${todoFilePathPattern.startsWith('./') ? todoFilePathPattern.substring(2) : todoFilePathPattern}`;

  console.log(`[Suffixes:registerProvider] Registering HoverProvider for pattern: ${globPattern}`);

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { pattern: globPattern, scheme: 'file' }, // Use dynamic glob pattern
      todoHoverProvider
    )
  );
}
