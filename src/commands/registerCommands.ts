import * as vscode from 'vscode';

import path from 'path';

import { TreeProvider } from '../tree/TreeProvider';
import { showDebugMessage } from './showDebugMessage';

export function registerCommands(
  context: vscode.ExtensionContext,
  treeProvider: TreeProvider,
  treeView: vscode.TreeView<vscode.TreeItem>
): void {
  console.log('[Suffixes:registerCommands] Registering commands...');

  // Debug command
  const showDebugCommand = vscode.commands.registerCommand(
    'suffixes.showDebugMessage',
    showDebugMessage
  );
  context.subscriptions.push(showDebugCommand);

  // Refresh command
  const refreshCommand = vscode.commands.registerCommand('suffixes.refreshTree', () => {
    treeProvider.refresh();
    console.log('[Suffixes:registerCommands] Executed command: suffixes.refreshTree');
  });
  context.subscriptions.push(refreshCommand);

  // Open Tree View command
  const openTreeViewCommand = vscode.commands.registerCommand('suffixes.openTreeView', async () => {
    console.log('[Suffixes:registerCommands] Command suffixes.openTreeView: Handler started.');
    try {
      console.log('[Suffixes:registerCommands] Command suffixes.openTreeView: Getting children...');
      const children = await treeProvider.getChildren();
      console.log(
        `[Suffixes:registerCommands] Command suffixes.openTreeView: Got ${children?.length ?? 0} children.`
      );
      const firstElement = children && children.length > 0 ? children[0] : undefined;
      const elementToReveal = firstElement;

      if (elementToReveal) {
        console.log(
          `[Suffixes:registerCommands] Command suffixes.openTreeView: Attempting to reveal first element...`
        );
        await treeView.reveal(elementToReveal, { focus: true, select: false, expand: true });
        console.log(
          '[Suffixes:registerCommands] Command suffixes.openTreeView: Reveal element finished.'
        );
      } else {
        console.log(
          `[Suffixes:registerCommands] Command suffixes.openTreeView: No element to reveal, focusing view container...`
        );
        await vscode.commands.executeCommand('workbench.view.explorer');
        await vscode.commands.executeCommand('workbench.action.focusSideBar');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await treeView.reveal(undefined as any, { focus: true });
        console.log(
          '[Suffixes:registerCommands] Command suffixes.openTreeView: Focused view container.'
        );
      }
    } catch (error) {
      console.error('[Suffixes] Command suffixes.openTreeView: Error during execution:', error);
      vscode.window.showErrorMessage(`Error opening Suffixes view: ${error}`);
    }
    console.log('[Suffixes:registerCommands] Executed command: suffixes.openTreeView');
  });
  context.subscriptions.push(openTreeViewCommand);

  // Register the new CodeLens command
  const logHeadingClickCommand = vscode.commands.registerCommand(
    'suffixes.logHeadingClick',
    (heading: string, lineNumber: number) => {
      console.log(
        `[Suffixes:registerCommands] CodeLens clicked for heading: "${heading}" on line ${lineNumber + 1}`
      );
      vscode.window.showInformationMessage(`CodeLens clicked for: ${heading}`);
    }
  );
  context.subscriptions.push(logHeadingClickCommand);

  // Command to manually create the TODO.md file
  const createTodoFileCommand = vscode.commands.registerCommand(
    'suffixes.createTodoFile',
    async () => {
      console.log('[Suffixes:registerCommands] Executed command: suffixes.createTodoFile');

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace open to create the TODO file.');
        return;
      }
      const workspaceRoot = workspaceFolders[0].uri.fsPath;

      // Read settings
      const config = vscode.workspace.getConfiguration('suffixes');
      const relativeFilePath = config.get<string>('todo.filePath', '.vscode/TODO.md');
      const todoFilePath = path.join(workspaceRoot, relativeFilePath);
      const todoFileUri = vscode.Uri.file(todoFilePath);
      const dirPath = path.dirname(todoFilePath);
      const dirUri = vscode.Uri.file(dirPath);

      // Path to the template file within the extension's directory
      const templatePath = vscode.Uri.joinPath(
        context.extensionUri,
        'src',
        'templates',
        'initialTodoContent.md'
      );

      try {
        await vscode.workspace.fs.stat(todoFileUri);
        vscode.window.showInformationMessage(`\`${relativeFilePath}\` already exists.`);
      } catch (error) {
        // File does not exist, proceed with creation
        try {
          await vscode.workspace.fs.createDirectory(dirUri);
          // Read content from template file
          const initialContentBuffer = await vscode.workspace.fs.readFile(templatePath);
          // Create file with initial content
          await vscode.workspace.fs.writeFile(todoFileUri, initialContentBuffer);
          vscode.window.showInformationMessage(`Created \`${relativeFilePath}\` successfully.`);
          await vscode.window.showTextDocument(todoFileUri);
        } catch (creationError) {
          console.error(`[Suffixes] Failed to create ${relativeFilePath}:`, creationError);
          vscode.window.showErrorMessage(`Failed to create ${relativeFilePath}: ${creationError}`);
        }
      }
    }
  );
  context.subscriptions.push(createTodoFileCommand);

  // Command to reset the TODO.md prompt dismissal state stored in workspaceState
  const resetDismissalCommand = vscode.commands.registerCommand(
    'suffixes.resetTodoPromptDismissal',
    async () => {
      await context.workspaceState.update('suffixes.prompt.createTodoDismissed', undefined);
      vscode.window.showInformationMessage(
        'Prompt for creating `.vscode/TODO.md` has been re-enabled for this workspace.'
      );
      console.log(
        '[Suffixes:registerCommands] Executed command: suffixes.resetTodoPromptDismissal'
      );
    }
  );
  context.subscriptions.push(resetDismissalCommand);

  console.log('[Suffixes:registerCommands] All commands registered.');
}
