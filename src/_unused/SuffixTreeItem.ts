import * as path from 'path';
import { MarkdownString } from './MarkdownString';
import { ThemeIcon } from './ThemeIcon';
import { TreeItem } from './TreeItem';
import { TreeItemCollapsibleState } from './TreeItemCollapsibleState';
import { Uri } from './Uri';
import { getWorkspaceFolder } from './getWorkspaceFolder';

export interface TreeElement extends TreeItem {
  type: 'file' | 'suffix';
  label: string;
  resourceUri?: Uri;
}

export class SuffixTreeItem extends TreeItem {
  constructor(
    element: TreeElement,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(element.label, collapsibleState);

    if (element.type === 'file' && element.resourceUri) {
      this.resourceUri = element.resourceUri;
      this.description = this.getRelativePath(element.resourceUri);
      this.tooltip = this.getTooltip(element.resourceUri);
      this.contextValue = 'file';
      this.command = {
        command: 'vscode.open',
        title: 'Open File',
        arguments: [element.resourceUri],
      };
    } else {
      // For suffix group items
      this.iconPath = new ThemeIcon('symbol-folder');
      this.contextValue = 'suffixGroup';
      this.tooltip = `${element.label} - Click to expand`;
    }
  }

  private getRelativePath(uri: Uri): string {
    const workspaceFolder = getWorkspaceFolder(uri);
    if (workspaceFolder) {
      return path.relative(workspaceFolder.uri.fsPath, uri.fsPath);
    }
    return path.basename(uri.fsPath);
  }

  private getTooltip(uri: Uri): MarkdownString | string {
    const relativePath = this.getRelativePath(uri);
    const fileName = path.basename(uri.fsPath);
    return new MarkdownString(`$(file) **${fileName}**\n\n$(folder) ${relativePath}`);
  }
}
