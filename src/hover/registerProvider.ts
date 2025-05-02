import * as vscode from 'vscode';
import { HoverProvider } from './HoverProvider';

export function registerHoverProvider(context: vscode.ExtensionContext) {
  const todoHoverProvider = new HoverProvider();
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { pattern: '**/docs/TODOS.md', scheme: 'file' },
      todoHoverProvider
    )
  );
}
