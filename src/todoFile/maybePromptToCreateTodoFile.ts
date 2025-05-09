import * as vscode from 'vscode';

import { checkAndPromptForTodoFile } from './checkAndPromptForTodoFile';

export async function maybePromptToCreateTodoFile(
  workspaceRoot: string | undefined,
  context: vscode.ExtensionContext
) {
  if (workspaceRoot) {
    await checkAndPromptForTodoFile(workspaceRoot, context);
  } else {
    console.log(
      '[Suffixes:maybePromptToCreateTodoFile] No workspace root found, skipping TODO file check.'
    );
  }
}
