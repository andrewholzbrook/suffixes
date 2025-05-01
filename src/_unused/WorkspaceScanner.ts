import { WorkspaceFolder } from 'vscode';

export interface WorkspaceScanner {
  scan(workspaceFolders: WorkspaceFolder[]): Promise<Map<string, string>>;
}
