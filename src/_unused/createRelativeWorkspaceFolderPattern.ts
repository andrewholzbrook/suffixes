import { RelativePattern } from './RelativePattern';
import { Uri } from './Uri';
import { WorkspaceFolder } from './WorkspaceFolder';

export function createRelativeWorkspaceFolderPattern(
  folder: WorkspaceFolder | Uri | string,
  pattern = '**/*'
) {
  return new RelativePattern(folder, pattern);
}
