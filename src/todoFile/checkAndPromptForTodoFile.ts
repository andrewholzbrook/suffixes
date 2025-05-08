import * as path from 'path';
import * as vscode from 'vscode';

// --- Helper function to check for TODO.md ---
export async function checkAndPromptForTodoFile(
  workspaceRoot: string,
  context: vscode.ExtensionContext
) {
  const config = vscode.workspace.getConfiguration('suffixes');
  const relativeFilePath = config.get<string>('todo.filePath', '.vscode/TODO.md');
  const absoluteFilePath = path.join(workspaceRoot, relativeFilePath);
  const workspaceFileUri = vscode.Uri.file(absoluteFilePath);

  try {
    await vscode.workspace.fs.stat(workspaceFileUri);
    console.log(
      `[Suffixes:checkAndPromptForTodoFile] Found existing TODO file: ${relativeFilePath}`
    );
    return; // File exists, no need to prompt
  } catch (error) {
    // File doesn't exist, proceed to check config
    console.log(
      `[Suffixes:checkAndPromptForTodoFile] TODO file not found at ${relativeFilePath}. Checking configuration.`
    );
  }

  // Read prompt disable setting *after* file check
  const disablePrompt = config.get<boolean>('prompt.disableCreateTodo');

  if (disablePrompt) {
    console.log(
      '[Suffixes:checkAndPromptForTodoFile] Create TODO prompt is disabled by configuration. Skipping.'
    );
    return;
  }

  // Prompt is needed
  console.log(`[Suffixes:checkAndPromptForTodoFile] Prompting user to create ${relativeFilePath}.`);
  await _showAndHandleCreateTodoPrompt(config, relativeFilePath);
}

async function _showAndHandleCreateTodoPrompt(
  config: vscode.WorkspaceConfiguration,
  relativeFilePath: string
) {
  const createOption = `Create ${relativeFilePath}`;
  const dismissOption = "Don't Show Again";

  const selection = await vscode.window.showInformationMessage(
    `Create \`${relativeFilePath}\` to unlock LLM-Agent driven task management.`,
    { modal: false },
    createOption,
    dismissOption
  );

  if (selection === createOption) {
    console.log(`[Suffixes:checkAndPromptForTodoFile] User chose to create ${relativeFilePath}.`);
    // Execute the command to create the file
    await vscode.commands.executeCommand('suffixes.createTodoFile');
  } else if (selection === dismissOption) {
    console.log(
      '[Suffixes:checkAndPromptForTodoFile] User dismissed the create TODO prompt. Updating configuration.'
    );
    try {
      await config.update('prompt.disableCreateTodo', true, vscode.ConfigurationTarget.Workspace);
      vscode.window.showInformationMessage(
        `Prompt disabled for this workspace. To re-enable, change the 'suffixes.prompt.disableCreateTodo' setting.`
      );
    } catch (updateError) {
      console.error('[Suffixes] Failed to update configuration:', updateError);
      vscode.window.showErrorMessage('Failed to disable the prompt. Please check console logs.');
    }
  } else {
    console.log(
      `[Suffixes:checkAndPromptForTodoFile] Create ${relativeFilePath} prompt closed without selection.`
    );
  }
}
