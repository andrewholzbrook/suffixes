import * as vscode from 'vscode';
import { SuffixTreeDataProvider } from './SuffixTreeDataProvider'; // Import the provider definition

/**
 * Creates an instance of SuffixTreeDataProvider, registers it with VS Code,
 * and adds its disposable to the extension context.
 *
 * @param context The extension context for managing disposables.
 * @param workspaceRoot The root path of the workspace, or undefined.
 * @returns The created SuffixTreeDataProvider instance.
 */
export function registerProvider(
  context: vscode.ExtensionContext,
  workspaceRoot: string | undefined
): SuffixTreeDataProvider {
  console.log('[Suffixes] Registering SuffixTreeDataProvider...');

  const suffixTreeDataProvider = new SuffixTreeDataProvider(workspaceRoot);
  const treeViewRegistration = vscode.window.registerTreeDataProvider(
    'suffixesTreeView', // Ensure this ID matches package.json
    suffixTreeDataProvider
  );
  context.subscriptions.push(treeViewRegistration);
  console.log('[Suffixes] SuffixTreeDataProvider registered.');

  return suffixTreeDataProvider;
}
