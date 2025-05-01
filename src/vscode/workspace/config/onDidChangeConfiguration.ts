import { workspace } from 'vscode';
import { ExtensionContext } from '../../../vscode/extension/ExtensionContext';

export function onDidChangeConfiguration(context: ExtensionContext, callback: () => void) {
  return workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration(context.extension.id)) {
      callback();
    }
  });
}
