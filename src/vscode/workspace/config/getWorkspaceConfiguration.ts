import { workspace } from 'vscode';

export function getWorkspaceConfiguration(extensionName: string) {
  return workspace.getConfiguration(extensionName);
}
