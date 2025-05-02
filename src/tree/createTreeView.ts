import * as vscode from 'vscode';
import { TreeProvider } from './TreeProvider';

export function createTreeView(context: vscode.ExtensionContext, treeProvider: TreeProvider) {
  console.log('[Suffixes] Creating UI components...');

  const treeView = vscode.window.createTreeView('suffixesTreeView', {
    treeDataProvider: treeProvider,
  });

  context.subscriptions.push(treeView);

  console.log('[Suffixes] Tree view created and registered for disposal.');

  return { treeView };
}
