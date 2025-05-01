import { TreeElement } from './SuffixTreeItem';

export interface SuffixItem {
  suffix: string;
  fileCount: number;
  isPreferred: boolean;
  element: TreeElement;
}
