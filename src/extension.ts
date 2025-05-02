import * as vscode from 'vscode';
import { registerCommands } from './commands/registerCommands';
import { SuffixTreeDataProvider } from './tree/SuffixTreeDataProvider';
import { registerProvider as registerTreeProvider } from './tree/registerProvider';

export async function activate(context: vscode.ExtensionContext) {
  console.log('[Suffixes] Activating extension...');

  try {
    const workspaceRoot =
      vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;

    const { treeProvider } = _registerProviders(context, workspaceRoot);
    const { treeView } = _createAndRegisterUIComponents(context, treeProvider);

    registerCommands(context, treeProvider);
  } catch (error) {
    console.error('[Suffixes] Error during activation:', error);
    vscode.window.showErrorMessage(`Suffixes activation failed: ${error}`);
  }
}

function _registerProviders(context: vscode.ExtensionContext, workspaceRoot: string | undefined) {
  console.log('[Suffixes] Registering providers...');

  const treeProvider = registerTreeProvider(context, workspaceRoot);

  console.log('[Suffixes] All providers registered.');

  return {
    treeProvider,
  };
}

function _createAndRegisterUIComponents(
  context: vscode.ExtensionContext,
  treeProvider: SuffixTreeDataProvider
) {
  console.log('[Suffixes] Creating UI components...');

  const treeView = vscode.window.createTreeView('suffixesTreeView', {
    treeDataProvider: treeProvider,
  });

  context.subscriptions.push(treeView);

  console.log('[Suffixes] Tree view created and registered for disposal.');

  return { treeView };
}

export function deactivate() {
  console.log('[Suffixes] Deactivating extension...');
}
