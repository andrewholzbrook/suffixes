import { workspace } from 'vscode';
import { Uri } from './Uri';

export function asRelativePath(file: string | Uri) {
  return workspace.asRelativePath(file);
}
