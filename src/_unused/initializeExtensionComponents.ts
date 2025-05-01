import { languages } from 'vscode';
import { ExtensionComponents } from '../components/ExtensionComponents';
import { log } from '../logging/log';
import { ExtensionContext } from '../vscode/extension/ExtensionContext';
import { createCodeLensProvider } from './createCodeLensProvider';
import { createTreeView } from './createTreeView';
import { initializeCoreComponents } from './initializeCoreComponents';
import { initializeSuffixCommands } from './initializeSuffixCommands';

export async function initializeExtensionComponents(
  context: ExtensionContext
): Promise<ExtensionComponents> {
  try {
    const { scanner, treeProvider, inFileProvider } = await initializeCoreComponents(context);

    const treeView = createTreeView(treeProvider);
    const commands = initializeSuffixCommands(inFileProvider);
    const codeLensProvider = createCodeLensProvider(() => scanner);
    const codeLensRegistration = languages.registerCodeLensProvider(
      { scheme: 'file' },
      codeLensProvider
    );

    context.subscriptions.push(treeView, codeLensRegistration, inFileProvider, ...commands);

    return {
      scanner,
      treeProvider,
      inFileProvider,
      statusBarButton: {
        button: inFileProvider.titleButton,
        show: () => inFileProvider.titleButton.show(),
        dispose: () => inFileProvider.titleButton.dispose(),
      },
      commands: {
        showMatchesInFile: commands[0],
        refreshCommand: commands[2],
      },
      monitoring: { watchers: [] },
    };
  } catch (error) {
    log(`Error initializing components: ${error}`);
    throw error;
  }
}
