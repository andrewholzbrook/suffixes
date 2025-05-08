import * as vscode from 'vscode';
import { registerCommands } from './commands/registerCommands';
import { registerProviders } from './registerProviders';
import { maybePromptToCreateTodoFile } from './todoFile/maybePromptToCreateTodoFile';
import { createTreeView } from './tree/createTreeView';
import { getWorkspaceRoot } from './workspace/getWorkspaceRoot';

export async function activate(context: vscode.ExtensionContext) {
  console.log('[Suffixes:extension] Activating extension...');

  try {
    const workspaceRoot = getWorkspaceRoot(context);

    const { treeProvider, codeLensProvider } = registerProviders(context, workspaceRoot);
    const { treeView } = createTreeView(context, treeProvider);
    registerCommands(context, treeProvider, treeView);
    await maybePromptToCreateTodoFile(workspaceRoot, context);
  } catch (error) {
    console.error('[Suffixes] Error during activation:', error);
    vscode.window.showErrorMessage(`Suffixes activation failed: ${error}`);
  }
}

export function deactivate() {
  console.log('[Suffixes:extension] Deactivating extension...');
}
