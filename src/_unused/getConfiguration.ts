import { workspace } from 'vscode';

export function getConfiguration() {
  return workspace.getConfiguration('suffixes');
}
