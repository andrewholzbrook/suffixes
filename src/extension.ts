import * as vscode from 'vscode';
import { SuffixTreeDataProvider } from './SuffixTreeDataProvider';

export async function activate(context: vscode.ExtensionContext) {
  console.log('[Suffixes] Activating extension...');

  try {
    // Get workspace folder
    const workspaceRoot =
      vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;

    // Create and register the TreeDataProvider
    const suffixTreeDataProvider = new SuffixTreeDataProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('suffixesTreeView', suffixTreeDataProvider);
    vscode.window.createTreeView('suffixesTreeView', {
      treeDataProvider: suffixTreeDataProvider,
    });

    console.log('[Suffixes] Tree view registered.');
    // TODO: Add back other initialization logic if any
  } catch (error) {
    console.error('[Suffixes] Error during activation:', error);
    vscode.window.showErrorMessage(`Suffixes activation failed: ${error}`);
  }
}

export function deactivate() {
  console.log('[Suffixes] Deactivating extension...');
}
