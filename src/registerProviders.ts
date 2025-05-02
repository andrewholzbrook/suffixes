import * as vscode from 'vscode';
import { registerCodeLensProvider } from './codeLens/registerCodeLensProvider';
import { registerHoverProvider } from './hover/registerProvider';
import { registerTreeProvider } from './tree/registerTreeProvider';

// --- End Helper Function ---
export function registerProviders(
  context: vscode.ExtensionContext,
  workspaceRoot: string | undefined
) {
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
