import * as path from 'path';
import { EventEmitter, MarkdownString, ThemeIcon, TreeItemCollapsibleState } from 'vscode';
import { getTreeElementFromFilePath } from './getTreeElementFromFilePath';
import { sortItemsByKey } from './sortItemsByKey';
import { sortItemsByNameAndCount } from './sortItemsByNameAndCount';
import { SortConfig } from './state/sorting.state';
import { SuffixItem } from './SuffixItem';
import { TreeElement } from './SuffixTreeItem';
import { TreeDataProviderWithRefresh } from './TreeDataProviderWithRefresh';

export const createTreeDataProviderWithRefresh = (
  eventEmitter: EventEmitter<TreeElement | undefined>,
  activeSorts: SortConfig[],
  getAllSuffixes: () => string[],
  getFilesForSuffix: (suffix: string) => string[],
  getMatchPattern: (filePath: string, suffix: string) => string,
  getPreferredSuffixes: () => string[]
): TreeDataProviderWithRefresh<TreeElement> => {
  return {
    onDidChangeTreeData: eventEmitter.event,
    getTreeItem: (element: TreeElement) => element,
    refresh: () => {
      eventEmitter.fire(undefined);
    },
    getChildren: async (element?: TreeElement): Promise<TreeElement[]> => {
      if (element && element.type === 'suffix') {
        const suffix = element.label.split(' ')[0];
        const files = getFilesForSuffix(suffix);

        return sortItemsByNameAndCount(
          files.map((file) => ({
            isPreferred: false,
            file,
            suffix,
          })),
          (item) => path.basename(item.file),
          () => 0,
          activeSorts,
          sortItemsByKey
        ).map(({ file }) => getTreeElementFromFilePath(file, suffix, getMatchPattern));
      }

      const preferredSuffixes = getPreferredSuffixes();
      const suffixes = getAllSuffixes();

      const suffixItems: SuffixItem[] = suffixes
        .map((suffix) => {
          const files = getFilesForSuffix(suffix);
          const isPreferred = preferredSuffixes.includes(suffix);

          const element: TreeElement = {
            type: 'suffix' as const,
            label: `${suffix} (${files.length} files)${isPreferred ? ' ★' : ''}`,
            collapsibleState: TreeItemCollapsibleState.Collapsed,
            contextValue: 'suffix',
            iconPath: isPreferred ? new ThemeIcon('star') : ThemeIcon.Folder,
            tooltip: new MarkdownString()
              .appendMarkdown(`**${suffix}**\n\n`)
              .appendMarkdown(`${files.length} matching files\n\n`)
              .appendMarkdown(
                isPreferred
                  ? '**✨ Best Practice Pattern!**\n' +
                      'This suffix follows recommended naming conventions and is prioritized in search results.'
                  : ''
              ),
          };

          return {
            suffix,
            fileCount: files.length,
            isPreferred,
            element: element,
          };
        })
        .filter((item) => item.fileCount > 1);

      return sortItemsByNameAndCount(
        suffixItems,
        (item) => item.suffix,
        (item) => item.fileCount,
        activeSorts,
        sortItemsByKey
      ).map((item) => item.element);
    },
  };
};
