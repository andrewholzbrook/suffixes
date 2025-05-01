import { window } from 'vscode';
import { TreeElement } from './SuffixTreeItem';
import { TreeDataProvider } from './TreeDataProvider';

export function createTreeView(treeProvider: TreeDataProvider<TreeElement>) {
  return window.createTreeView('suffixes.groups', {
    treeDataProvider: treeProvider,
    showCollapseAll: true,
  });
}
