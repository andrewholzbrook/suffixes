import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export class SuffixTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  // Event emitter for when tree data changes
  private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> =
    new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  constructor(private workspaceRoot: string | undefined) {
    // TODO: Add logic if needed, like listening to configuration changes
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    // Returns the UI representation (TreeItem) of the element that gets displayed in the view.
    // For now, just return the element itself as it will be a TreeItem.
    return element;
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
    // Returns the children for the given element or root if no element is provided.
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage('No folder or workspace opened');
      return Promise.resolve([]);
    }

    if (element) {
      // Get children of a specific element (e.g., files in a directory)
      // The element.resourceUri should contain the path to the directory
      if (element.resourceUri) {
        return this.getWorkspaceEntries(element.resourceUri.fsPath);
      } else {
        return Promise.resolve([]); // Should not happen for folders, but handle defensively
      }
    } else {
      // Get root elements (top-level files/folders in the workspace)
      return this.getWorkspaceEntries(this.workspaceRoot);
    }
  }

  private async getWorkspaceEntries(folderPath: string): Promise<vscode.TreeItem[]> {
    if (!folderPath) {
      return [];
    }

    try {
      const entries = await fs.promises.readdir(folderPath, { withFileTypes: true });

      const specificRootFile = 'README.md';
      const specificRootFolder = 'src';
      const specificFileInFolder = 'extension.ts';

      const filteredEntries = entries.filter((entry) => {
        if (!this.workspaceRoot) {
          return false; // Should not happen, but safety first
        }

        const isRootLevel = folderPath === this.workspaceRoot;
        const isInSpecificFolder = folderPath === path.join(this.workspaceRoot, specificRootFolder);

        if (isRootLevel) {
          // At root: show only the specific file and folder
          return entry.name === specificRootFile || entry.name === specificRootFolder;
        } else if (isInSpecificFolder) {
          // In the specific folder: show only the specific file
          return entry.name === specificFileInFolder;
        } else {
          // In any other folder: show nothing
          return false;
        }
      });

      const items = filteredEntries.map((entry) => {
        const fullPath = path.join(folderPath, entry.name);
        const collapsibleState = entry.isDirectory()
          ? vscode.TreeItemCollapsibleState.Collapsed
          : vscode.TreeItemCollapsibleState.None;

        const treeItem = new vscode.TreeItem(entry.name, collapsibleState);
        treeItem.resourceUri = vscode.Uri.file(fullPath);

        if (entry.isFile()) {
          treeItem.command = {
            command: 'vscode.open',
            title: 'Open File',
            arguments: [treeItem.resourceUri],
          };
          treeItem.iconPath = new vscode.ThemeIcon('file');
        } else if (entry.isDirectory()) {
          treeItem.iconPath = new vscode.ThemeIcon('folder');
        }
        return treeItem;
      });
      // Sort entries alphabetically, folders first
      items.sort((a, b) => {
        const aIsFolder = a.collapsibleState !== vscode.TreeItemCollapsibleState.None;
        const bIsFolder = b.collapsibleState !== vscode.TreeItemCollapsibleState.None;
        if (aIsFolder !== bIsFolder) {
          return aIsFolder ? -1 : 1;
        }
        return (a.label! as string).localeCompare(b.label! as string);
      });

      return items;
    } catch (err) {
      console.error(`Error reading directory ${folderPath}:`, err);
      vscode.window.showErrorMessage(`Error reading workspace directory: ${folderPath}`);
      return [];
    }
  }

  // TODO: Add methods for getting parent, resolving tree item, etc. if needed
}
