import { workspace } from 'vscode';

import { TextDocument } from './TextDocument';
import { Uri } from './Uri';
import { WorkspaceFolder } from './WorkspaceFolder';

export async function openTextDocument(
  uri: Uri,
  workspaceFolders: readonly WorkspaceFolder[] | undefined
): Promise<TextDocument> {
  if (!workspaceFolders || workspaceFolders.length === 0) {
    throw new Error('Workspace is not available');
  }

  try {
    return await workspace.openTextDocument(uri);
  } catch (error) {
    console.error(`Error opening document ${uri.fsPath}:`, error);
    throw error;
  }
}
