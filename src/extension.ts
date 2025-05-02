import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
  console.log('[Suffixes] Activating extension...');

  try {
    // TODO: Add back initialization logic, including Tree View setup
    console.log('[Suffixes] Basic activation complete. No UI initialized yet.');
  } catch (error) {
    console.error('[Suffixes] Error during activation:', error);
    vscode.window.showErrorMessage(`Suffixes activation failed: ${error}`);
  }
}

export function deactivate() {
  console.log('[Suffixes] Deactivating extension...');
}
