import * as vscode from 'vscode';
import { registerCodeLensProvider } from './codeLens/registerCodeLensProvider';
import { registerHoverProvider } from './hover/registerProvider';
import { Logger } from './logger';
import { registerTreeProvider } from './tree/registerTreeProvider';

const logger = new Logger('registerProviders');

export function registerProviders(
  context: vscode.ExtensionContext,
  workspaceRoot: string | undefined
) {
  logger.info('Registering providers...');

  const codeLensProvider = registerCodeLensProvider(context);
  const hoverProvider = registerHoverProvider(context);
  const treeProvider = registerTreeProvider(context, workspaceRoot);

  logger.info('All providers registered.');

  return {
    codeLensProvider,
    hoverProvider,
    treeProvider,
  };
}
