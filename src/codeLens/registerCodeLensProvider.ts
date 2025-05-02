import * as vscode from 'vscode';
import { CodeLensProvider } from './CodeLensProvider';

/**
 * Creates and registers the CodeLensProvider.
 * @param context The extension context.
 */
export function registerCodeLensProvider(context: vscode.ExtensionContext): void {
  const codeLensProvider = new CodeLensProvider();
  const codeLensDisposable = vscode.languages.registerCodeLensProvider(
    { language: 'markdown', pattern: '**/docs/TODOS.md' },
    codeLensProvider
  );
  context.subscriptions.push(codeLensDisposable);
  console.log('[Suffixes] CodeLensProvider registered for docs/TODOS.md.');
}
