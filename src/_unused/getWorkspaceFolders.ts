import { workspace } from 'vscode';

export function getWorkspaceFolders() {
  return workspace.workspaceFolders;
}
