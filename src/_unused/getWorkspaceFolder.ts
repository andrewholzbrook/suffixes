import { workspace } from 'vscode';
import { Uri } from './Uri';

export function getWorkspaceFolder(uri: Uri) {
  return workspace.getWorkspaceFolder(uri);
}
