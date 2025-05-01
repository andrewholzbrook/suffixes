import { workspace } from 'vscode';
import { RelativePattern } from './RelativePattern';

export function findWorkspaceFiles(pattern: RelativePattern, ignorePattern: string) {
  return workspace.findFiles(pattern, ignorePattern);
}
