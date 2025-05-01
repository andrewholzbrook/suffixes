import { commands } from 'vscode';
import { Disposable } from './Disposable';
import { Uri } from './Uri';

export function registerCommand(
  command: string,
  callback: (originalUri: Uri, modifiedUri: Uri) => Promise<void>
): Disposable {
  return commands.registerCommand(command, callback);
}
