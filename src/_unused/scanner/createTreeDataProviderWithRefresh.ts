import { EventEmitter } from 'vscode';
import { TreeElement } from '../SuffixTreeItem';

export interface TreeDataProviderDependencies {
  onDidChangeTreeData: EventEmitter<TreeElement | undefined>;
  getActiveSorts: () => Array<{ type: 'name' | 'count'; state: 'asc' | 'desc' | 'off' }>;
  getAllSuffixes: () => string[];
  getFilesForSuffix: (suffix: string) => string[];
  getMatchPattern: (filePath: string, suffix: string) => string;
  getPreferredSuffixes: () => string[];
}

export interface TreeDataProvider {
  onDidChangeTreeData: EventEmitter<TreeElement | undefined>['event'];
  getTreeItem: (element: TreeElement) => TreeElement;
  getChildren: (element?: TreeElement) => TreeElement[];
  refresh: () => void;
}

export function createTreeDataProviderWithRefresh({
  onDidChangeTreeData,
  getActiveSorts,
  getAllSuffixes,
  getFilesForSuffix,
  getMatchPattern,
  getPreferredSuffixes,
}: TreeDataProviderDependencies): TreeDataProvider {
  return {
    onDidChangeTreeData: onDidChangeTreeData.event,
    getTreeItem: (element: TreeElement) => element,
    getChildren: (element?: TreeElement) => {
      if (element) {
        return [];
      }
      return [];
    },
    refresh: () => onDidChangeTreeData.fire(undefined),
  };
}
