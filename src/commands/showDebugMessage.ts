import * as vscode from 'vscode';

export function showDebugMessage() {
  vscode.window.showInformationMessage('Suffixes Debug Message! [P:?, E:?]'); // Placeholder
  console.log('[Suffixes:showDebugMessage] showDebugMessage command executed.');
}
