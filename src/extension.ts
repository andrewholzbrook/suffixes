import { createExtension } from './createExtension';
import { ExtensionContext } from './vscode/extension/ExtensionContext';
import { onDidChangeConfiguration } from './vscode/workspace/config/onDidChangeConfiguration';

let extension: ReturnType<typeof createExtension>;

export async function activate(context: ExtensionContext) {
  extension = createExtension(context);
  const configWatcher = onDidChangeConfiguration(context, extension.initialize);
  context.subscriptions.push(configWatcher);
  await extension.initialize();
}

export function deactivate() {
  if (extension) {
    extension.dispose();
  }
}
