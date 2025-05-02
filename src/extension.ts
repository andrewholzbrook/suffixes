import * as path from 'path';
import * as vscode from 'vscode';
import { registerCodeLensProvider } from './codeLens/registerCodeLensProvider';
import { registerCommands } from './commands/registerCommands';
import { registerHoverProvider } from './hover/registerProvider';
import { registerTreeProvider } from './tree/registerTreeProvider';
import { TreeProvider } from './tree/TreeProvider';

export async function activate(context: vscode.ExtensionContext) {
  console.log('[Suffixes] Activating extension...');

  try {
    const workspaceRoot =
      vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;

    // Check for TODO.md and prompt user if needed
    if (workspaceRoot) {
      await checkAndPromptForTodoFile(workspaceRoot, context);
    } else {
      console.log('[Suffixes] No workspace root found, skipping TODO.md check.');
    }

    const { treeProvider, codeLensProvider } = _registerProviders(context, workspaceRoot);
    const { treeView } = _createAndRegisterUIComponents(context, treeProvider);

    registerCommands(context, treeProvider, treeView);
  } catch (error) {
    console.error('[Suffixes] Error during activation:', error);
    vscode.window.showErrorMessage(`Suffixes activation failed: ${error}`);
  }
}

// --- Helper function to check for TODO.md ---
async function checkAndPromptForTodoFile(workspaceRoot: string, context: vscode.ExtensionContext) {
  const todoFilePath = path.join(workspaceRoot, '.vscode', 'TODO.md');
  const todoFileUri = vscode.Uri.file(todoFilePath);

  try {
    await vscode.workspace.fs.stat(todoFileUri);
    console.log(`[Suffixes] Found existing TODO file: ${todoFilePath}`);
    // File exists, do nothing for now.
  } catch (error) {
    // File does not exist (stat throws an error)
    console.log(`[Suffixes] TODO file not found at ${todoFilePath}. Prompting user.`);

    const createOption = 'Create & Enable Vibe-Tasking';
    const dismissOption = 'Not Now';

    const selection = await vscode.window.showInformationMessage(
      'Create `.vscode/TODO.md` to unlock LLM-Agent driven task management.',
      { modal: false },
      createOption,
      dismissOption
    );

    if (selection === createOption) {
      console.log('[Suffixes] User chose to create TODO.md.');
      // --- TODO: Implement file creation logic (next step) ---
      // For now, just log it. We'll add file creation in the next task.
      vscode.window.showInformationMessage('TODO: Implement file creation!');
    } else {
      console.log('[Suffixes] User dismissed the create TODO.md prompt.');
      // --- TODO: Handle dismissal (next step) ---
      // For now, just log it. We'll handle storing the dismissal in the next task.
    }
  }
}
// --- End Helper Function ---

function _registerProviders(context: vscode.ExtensionContext, workspaceRoot: string | undefined) {
  console.log('[Suffixes] Registering providers...');

  const codeLensProvider = registerCodeLensProvider(context);
  const hoverProvider = registerHoverProvider(context);
  const treeProvider = registerTreeProvider(context, workspaceRoot);

  console.log('[Suffixes] All providers registered.');

  return {
    codeLensProvider,
    hoverProvider,
    treeProvider,
  };
}

function _createAndRegisterUIComponents(
  context: vscode.ExtensionContext,
  treeProvider: TreeProvider
) {
  console.log('[Suffixes] Creating UI components...');

  const treeView = vscode.window.createTreeView('suffixesTreeView', {
    treeDataProvider: treeProvider,
  });

  context.subscriptions.push(treeView);

  console.log('[Suffixes] Tree view created and registered for disposal.');

  return { treeView };
}

export function deactivate() {
  console.log('[Suffixes] Deactivating extension...');
}
