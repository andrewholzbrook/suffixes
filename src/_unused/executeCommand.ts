import { commands } from 'vscode';
import { Uri } from './Uri';

export function executeCommand(originalUri: Uri, modifiedUri: Uri, title: string) {
  return commands.executeCommand('vscode.diff', originalUri, modifiedUri, title);
}
