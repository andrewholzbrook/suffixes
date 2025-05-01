import { log } from '../logging/log';
import { ExtensionContext } from '../vscode/extension/ExtensionContext';
import { initializeCoreComponents } from './initializeCoreComponents';

export async function reinitializeComponents(context: ExtensionContext) {
  try {
    const { scanner, treeProvider } = await initializeCoreComponents(context);
    treeProvider.refresh();
    return { scanner, treeProvider };
  } catch (error) {
    log(`Error reinitializing components: ${error}`);
    throw error;
  }
}
