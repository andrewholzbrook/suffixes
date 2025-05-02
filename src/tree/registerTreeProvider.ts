import * as vscode from 'vscode';
import { TreeProvider } from './TreeProvider';

/**
 * Creates an instance of TreeProvider, registers it with VS Code,
 * and adds its disposable to the extension context.
 *
 * @param context The extension context for managing disposables.
 * @param workspaceRoot The root path of the workspace, or undefined.
 * @returns The created TreeProvider instance.
 */
export function registerTreeProvider(
  context: vscode.ExtensionContext,
  workspaceRoot: string | undefined
): TreeProvider {
  console.log('[Suffixes] Registering TreeProvider...');

  const treeProvider = new TreeProvider(workspaceRoot);
  const treeViewRegistration = vscode.window.registerTreeDataProvider(
    'suffixesTreeView', // Ensure this ID matches package.json
    treeProvider
  );
  context.subscriptions.push(treeViewRegistration);
  console.log('[Suffixes] TreeProvider registered.');

  return treeProvider;
}
