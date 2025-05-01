import { createOutputChannel } from './_unused/createOutputChannel';
import { disposeComponents } from './_unused/disposeComponents';
import { initializeExtensionComponents } from './_unused/initializeExtensionComponents';
import { ExtensionComponents } from './components/ExtensionComponents';
import { log } from './logging/log';
import { ExtensionContext } from './vscode/extension/ExtensionContext';
import { getOutputChannel, initializeOutputChannel } from './vscode/outputChannel/getOutputChannel';
import { OutputChannel } from './vscode/outputChannel/OutputChannel';
import { logWorkspaceConfiguration } from './vscode/workspace/config/logWorkspaceConfiguration';

export function createExtension(context: ExtensionContext) {
  let outputChannel: OutputChannel;

  try {
    outputChannel = getOutputChannel();
  } catch {
    outputChannel = createOutputChannel();
    initializeOutputChannel(outputChannel);
  }
  outputChannel.show(true);

  context.subscriptions.push(outputChannel);

  let currentComponents: ExtensionComponents | undefined;

  const initialize = async () => {
    log('Initializing extension');

    logWorkspaceConfiguration(context);

    if (currentComponents) {
      disposeComponents(currentComponents);
    }

    currentComponents = await initializeExtensionComponents(context);

    if (currentComponents) {
      context.subscriptions.push(
        currentComponents.commands.showMatchesInFile,
        currentComponents.commands.refreshCommand,
        currentComponents.statusBarButton.button,
        ...currentComponents.monitoring.watchers
      );
    }
  };

  const dispose = () => {
    log('Disposing extension');
    if (currentComponents) {
      disposeComponents(currentComponents);
      currentComponents = undefined;
    }
    // Clean up logger
    const channel = getOutputChannel();
    channel.dispose();
  };

  const getComponents = () => currentComponents;

  return {
    initialize,
    dispose,
    getComponents,
  };
}
