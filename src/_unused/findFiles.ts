import { workspace } from 'vscode';
import { RelativePattern } from './RelativePattern';

export function findFiles(pattern: RelativePattern, excludePatterns: string[]) {
  return workspace.findFiles(pattern, `{${excludePatterns.join(',')}}`);
}
