import * as vscode from 'vscode';
import { CodeLensProvider } from './CodeLensProvider';

/**
 * Creates and registers the CodeLensProvider.
 * @param context The extension context.
 */
export function registerCodeLensProvider(context: vscode.ExtensionContext): void {
  const codeLensProvider = new CodeLensProvider();

  // Get the configured path, default to .vscode/TODO.md
  const config = vscode.workspace.getConfiguration('suffixes');
  const todoFilePathPattern = config.get<string>('todo.filePath', '.vscode/TODO.md');
  // Ensure the pattern is suitable for a glob (relative to workspace)
  const globPattern = `**/${todoFilePathPattern.startsWith('./') ? todoFilePathPattern.substring(2) : todoFilePathPattern}`;

  console.log(`[Suffixes] Registering CodeLensProvider for pattern: ${globPattern}`);

  const codeLensDisposable = vscode.languages.registerCodeLensProvider(
    { language: 'markdown', pattern: globPattern }, // Use dynamic glob pattern
    codeLensProvider
  );
  context.subscriptions.push(codeLensDisposable);
  // console.log('[Suffixes] CodeLensProvider registered for docs/TODOS.md.'); // Old log
}
