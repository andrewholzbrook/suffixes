import * as vscode from 'vscode';
import { TreeProvider } from './TreeProvider';

export function createTreeView(context: vscode.ExtensionContext, treeProvider: TreeProvider) {
  console.log('[Suffixes:createTreeView] Creating UI components...');

  const treeView = vscode.window.createTreeView('suffixesTreeView', {
    treeDataProvider: treeProvider,
    showCollapseAll: true,
  });

  context.subscriptions.push(treeView);

  console.log('[Suffixes:createTreeView] Tree view created and registered for disposal.');

  return { treeView, treeDataProvider: treeProvider };
}
