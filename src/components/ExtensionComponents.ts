import { Disposable } from '../_unused/Disposable';
import { FileSystemWatcher } from '../_unused/FileSystemWatcher';
import { InFileDisplayProvider } from '../_unused/inFileDisplay';
import { SimpleSuffixScanner } from '../_unused/scanner/scanner.bloc';
import { StatusBarButton } from '../_unused/StatusBarButton';
import { TreeElement } from '../_unused/SuffixTreeItem';
import { TreeDataProvider } from '../_unused/TreeDataProvider';
import { TreeView } from './TreeView';

export interface ExtensionComponents {
  scanner: SimpleSuffixScanner;
  treeProvider: TreeDataProvider<TreeElement>;
  inFileProvider: InFileDisplayProvider;
  statusBarButton: StatusBarButton;
  treeView?: TreeView<TreeElement>;
  commands: {
    showMatchesInFile: Disposable;
    refreshCommand: Disposable;
  };
  monitoring: {
    watchers: FileSystemWatcher[];
  };
}
