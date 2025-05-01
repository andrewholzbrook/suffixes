import * as vscode from 'vscode';

// Define the structure for a tree item (can be expanded later)
export class SuffixTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly resourceUri?: vscode.Uri,
    public readonly hasSuffix?: boolean // Custom property to track suffix status
  ) {
    super(label, collapsibleState);
    this.resourceUri = resourceUri;
    this.tooltip = `${this.label}`;
    this.description = hasSuffix ? 'Has Suffix' : ''; // Example description
    // Add context value for context menu visibility based on hasSuffix
    this.contextValue = hasSuffix ? 'suffixFileWithSuffix' : 'suffixFileWithoutSuffix';

    // Potentially set icons based on type (folder/file) or suffix status
    // this.iconPath = ...;
  }
}

export class SuffixTreeDataProvider implements vscode.TreeDataProvider<SuffixTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<SuffixTreeItem | undefined | null | void> =
    new vscode.EventEmitter<SuffixTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<SuffixTreeItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  constructor() {
    // TODO: Subscribe to relevant agent events to trigger refresh
    // e.g., workspaceAgent.bulletinBoard.subscribe(...)
    // e.g., suffixAgent.bulletinBoard.subscribe(...)
    // e.g., fileSystemAgent.bulletinBoard.subscribe(...)
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: SuffixTreeItem): vscode.TreeItem {
    // Return the element itself as it's already a TreeItem
    return element;
  }

  async getChildren(element?: SuffixTreeItem): Promise<SuffixTreeItem[]> {
    if (!vscode.workspace.workspaceFolders?.length) {
      vscode.window.showInformationMessage('No workspace folder open');
      return [];
    }

    if (element) {
      // If element exists, it's a directory; get its children (files/subdirs)
      if (
        element.resourceUri &&
        element.collapsibleState !== vscode.TreeItemCollapsibleState.None
      ) {
        return this.getFilesInDirectory(element.resourceUri);
      } else {
        return []; // Should not happen for correctly structured items
      }
    } else {
      // If no element, get root workspace folders
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (workspaceFolders.length === 1) {
        // If single root, directly show its contents
        return this.getFilesInDirectory(workspaceFolders[0].uri);
      } else {
        // If multiple roots, show them as top-level items
        return workspaceFolders.map(
          (folder) =>
            new SuffixTreeItem(folder.name, vscode.TreeItemCollapsibleState.Collapsed, folder.uri)
        );
      }
    }
  }

  /**
   * Helper method to get files and directories within a given directory URI.
   */
  private async getFilesInDirectory(dirUri: vscode.Uri): Promise<SuffixTreeItem[]> {
    const entries = await vscode.workspace.fs.readDirectory(dirUri);
    const items: SuffixTreeItem[] = [];

    for (const [name, type] of entries) {
      const resourceUri = vscode.Uri.joinPath(dirUri, name);
      let collapsibleState: vscode.TreeItemCollapsibleState;
      let hasSuffix = false; // Placeholder

      if (type === vscode.FileType.Directory) {
        collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        // Optionally check if folder itself or children have suffixes
      } else if (type === vscode.FileType.File) {
        collapsibleState = vscode.TreeItemCollapsibleState.None;
        // TODO: Check if this file has a suffix using SuffixAgent
        // hasSuffix = this.suffixAgent.hasSuffixForFile(resourceUri.fsPath); // Example
      } else {
        collapsibleState = vscode.TreeItemCollapsibleState.None; // Symbolic links, etc.
      }

      // TODO: Filter out ignored files (e.g., .git, node_modules)

      items.push(new SuffixTreeItem(name, collapsibleState, resourceUri, hasSuffix));
    }

    // Sort entries: folders first, then files, alphabetically
    items.sort((a, b) => {
      if (a.collapsibleState !== b.collapsibleState) {
        return a.collapsibleState === vscode.TreeItemCollapsibleState.None ? 1 : -1;
      }
      return a.label.localeCompare(b.label);
    });

    return items;
  }

  // TODO: Implement logic to check if a file has a suffix
  // private hasSuffixForFile(filePath: string): boolean {
  //   // Use suffixAgent to determine if the file has a configured suffix
  //   return false;
  // }
}
