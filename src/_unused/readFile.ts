import { Uri, workspace } from 'vscode';

export function readFile(filePath: string) {
  return workspace.fs.readFile(Uri.file(filePath));
}
