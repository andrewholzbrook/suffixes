import * as vscode from 'vscode';
import { TreeProvider } from '../tree/TreeProvider';
import { showDebugMessage } from './showDebugMessage';

export function registerCommands(
  context: vscode.ExtensionContext,
  treeProvider: TreeProvider,
  treeView: vscode.TreeView<vscode.TreeItem>
): void {
  console.log('[Suffixes] Registering commands...');

  // Debug command
  const showDebugCommand = vscode.commands.registerCommand(
    'suffixes.showDebugMessage',
    showDebugMessage
  );
  context.subscriptions.push(showDebugCommand);

  // Refresh command
  const refreshCommand = vscode.commands.registerCommand('suffixes.refreshTree', () => {
    treeProvider.refresh();
    console.log('[Suffixes] Executed command: suffixes.refreshTree');
  });
  context.subscriptions.push(refreshCommand);

  // Open Tree View command
  const openTreeViewCommand = vscode.commands.registerCommand('suffixes.openTreeView', async () => {
    console.log('[Suffixes] Command suffixes.openTreeView: Handler started.');
    try {
      console.log('[Suffixes] Command suffixes.openTreeView: Getting children...');
      const children = await treeProvider.getChildren();
      console.log(
        `[Suffixes] Command suffixes.openTreeView: Got ${children?.length ?? 0} children.`
      );
      const firstElement = children && children.length > 0 ? children[0] : undefined;
      const elementToReveal = firstElement;

      if (elementToReveal) {
        console.log(
          '[Suffixes] Command suffixes.openTreeView: Attempting to reveal first element...'
        );
        await treeView.reveal(elementToReveal, { focus: true, select: false, expand: true });
        console.log('[Suffixes] Command suffixes.openTreeView: Reveal element finished.');
      } else {
        console.log(
          '[Suffixes] Command suffixes.openTreeView: No element to reveal, focusing view container...'
        );
        await vscode.commands.executeCommand('workbench.view.explorer');
        await vscode.commands.executeCommand('workbench.action.focusSideBar');
        await treeView.reveal(undefined as any, { focus: true });
        console.log('[Suffixes] Command suffixes.openTreeView: Focused view container.');
      }
    } catch (error) {
      console.error('[Suffixes] Command suffixes.openTreeView: Error during execution:', error);
      vscode.window.showErrorMessage(`Error opening Suffixes view: ${error}`);
    }
    console.log('[Suffixes] Executed command: suffixes.openTreeView');
  });
  context.subscriptions.push(openTreeViewCommand);

  // Register the new CodeLens command
  const logHeadingClickCommand = vscode.commands.registerCommand(
    'suffixes.logHeadingClick',
    (heading: string, lineNumber: number) => {
      console.log(
        `[Suffixes] CodeLens clicked for heading: "${heading}" on line ${lineNumber + 1}`
      );
      vscode.window.showInformationMessage(`CodeLens clicked for: ${heading}`);
    }
  );
  context.subscriptions.push(logHeadingClickCommand);

  console.log('[Suffixes] All commands registered.');
}
