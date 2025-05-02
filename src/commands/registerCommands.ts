import * as vscode from 'vscode';
import { SuffixTreeDataProvider } from '../tree/SuffixTreeDataProvider';
import { showDebugMessage } from './showDebugMessage';

export function registerCommands(
  context: vscode.ExtensionContext,
  suffixTreeDataProvider: SuffixTreeDataProvider
): void {
  console.log('[Suffixes] Registering commands...');

  // Debug command
  const showDebugCommand = vscode.commands.registerCommand(
    'suffixes.showDebugMessage',
    showDebugMessage
  );
  context.subscriptions.push(showDebugCommand);

  // Refresh command
  const refreshCommand = vscode.commands.registerCommand('suffixes.refreshTree', () =>
    suffixTreeDataProvider.refresh()
  );
  context.subscriptions.push(refreshCommand);

  // ... Register other commands here ...

  console.log('[Suffixes] All commands registered.');
}
