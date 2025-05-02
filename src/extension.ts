import * as vscode from 'vscode';
import { SuffixTreeDataProvider } from './tree/SuffixTreeDataProvider';

export async function activate(context: vscode.ExtensionContext) {
  console.log('[Suffixes] Activating extension...');

  try {
    // Get workspace folder
    const workspaceRoot =
      vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;

    // --- Tree View Setup ---
    const suffixTreeDataProvider = new SuffixTreeDataProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('suffixesTreeView', suffixTreeDataProvider);
    const treeView = vscode.window.createTreeView('suffixesTreeView', {
      treeDataProvider: suffixTreeDataProvider,
    });
    context.subscriptions.push(treeView);
    console.log('[Suffixes] Tree view registered.');

    // --- Register Commands ---
    const showDebugCommand = vscode.commands.registerCommand('suffixes.showDebugMessage', () => {
      vscode.window.showInformationMessage('Suffixes Debug Message! [P:?, E:?]'); // Placeholder
      console.log('[Suffixes] showDebugMessage command executed.');
    });
    context.subscriptions.push(showDebugCommand);

    console.log('[Suffixes] Commands registered.');

    // TODO: Add back other initialization logic if any
  } catch (error) {
    console.error('[Suffixes] Error during activation:', error);
    vscode.window.showErrorMessage(`Suffixes activation failed: ${error}`);
  }
}

export function deactivate() {
  console.log('[Suffixes] Deactivating extension...');
  // Cleanup resources if needed
}
