import * as vscode from 'vscode';
import { registerCodeLensProvider } from './codeLens/registerCodeLensProvider';
import { registerCommands } from './commands/registerCommands';
import { registerHoverProvider } from './hover/registerProvider';
import { registerTreeProvider } from './tree/registerTreeProvider';
import { TreeProvider } from './tree/TreeProvider';

export async function activate(context: vscode.ExtensionContext) {
  console.log('[Suffixes] Activating extension...');

  try {
    const workspaceRoot =
      vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;

    const { treeProvider, codeLensProvider } = _registerProviders(context, workspaceRoot);
    const { treeView } = _createAndRegisterUIComponents(context, treeProvider);

    registerCommands(context, treeProvider, treeView);
  } catch (error) {
    console.error('[Suffixes] Error during activation:', error);
    vscode.window.showErrorMessage(`Suffixes activation failed: ${error}`);
  }
}

function _registerProviders(context: vscode.ExtensionContext, workspaceRoot: string | undefined) {
  console.log('[Suffixes] Registering providers...');

  const codeLensProvider = registerCodeLensProvider(context);
  const hoverProvider = registerHoverProvider(context);
  const treeProvider = registerTreeProvider(context, workspaceRoot);

  console.log('[Suffixes] All providers registered.');

  return {
    codeLensProvider,
    hoverProvider,
    treeProvider,
  };
}

function _createAndRegisterUIComponents(
  context: vscode.ExtensionContext,
  treeProvider: TreeProvider
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
