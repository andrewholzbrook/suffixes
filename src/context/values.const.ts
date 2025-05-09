/**
 * Defines context values used for VS Code 'when' clauses, typically in package.json menus.
 * These values are set on TreeItems using the `contextValue` property.
 *
 * @see https://code.visualstudio.com/api/references/when-clause-contexts
 */
export const contextValues = {
  /**
   * Represents a file item in the Suffixes tree view.
   * Used in `SuffixTreeDataProvider.ts`:
   *   `treeItem.contextValue = ContextValues.FILE;`
   * Used in `package.json` (example):
   *   `"when": "view == suffixesTreeView && viewItem == file"`
   */
  file: 'file',

  /**
   * Represents a folder item in the Suffixes tree view.
   * Used in `SuffixTreeDataProvider.ts`:
   *   `treeItem.contextValue = ContextValues.FOLDER;`
   * Used in `package.json` (example):
   *   `"when": "view == suffixesTreeView && viewItem == folder"`
   */
  folder: 'folder',
};
