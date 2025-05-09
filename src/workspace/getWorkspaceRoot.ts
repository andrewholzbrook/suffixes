import * as vscode from 'vscode';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getWorkspaceRoot(_context: vscode.ExtensionContext) {
  return vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
    ? vscode.workspace.workspaceFolders[0].uri.fsPath
    : undefined;
}
