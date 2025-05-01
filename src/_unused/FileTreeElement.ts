import { Uri } from 'vscode';
import { TreeElement } from './SuffixTreeItem';

export interface FileTreeElement extends TreeElement {
  type: 'file';
  resourceUri: Uri;
  command: {
    command: string;
    title: string;
    arguments: [Uri];
  };
}
