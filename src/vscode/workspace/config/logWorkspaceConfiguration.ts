import { log } from '../../../logging/log';
import { ExtensionContext } from '../../../vscode/extension/ExtensionContext';
import { getEnabledPatterns } from './getEnabledPatterns';
import { getExcludeFromIndex } from './getExcludeFromIndex';
import { getShouldShowCodeLens } from './getShouldShowCodeLens';
import { getShouldShowTreeView } from './getShouldShowTreeView';

export const logWorkspaceConfiguration = (context: ExtensionContext) => {
  try {
    const extensionName = context.extension.id;
    const patterns = getEnabledPatterns(extensionName);
    const excludeFromIndex = getExcludeFromIndex(extensionName);
    const showCodeLens = getShouldShowCodeLens(extensionName);
    const showTreeView = getShouldShowTreeView(extensionName);

    log('=== Extension Configuration ===');
    log('Enabled Patterns:');
    patterns.forEach((pattern) => log(`  - ${pattern}`));

    log('Exclude From Index:');
    excludeFromIndex.forEach((pattern) => log(`  - ${pattern}`));

    log('UI Settings:');
    log(`  - CodeLens: ${showCodeLens ? 'enabled' : 'disabled'}`);
    log(`  - TreeView: ${showTreeView ? 'enabled' : 'disabled'}`);
    log('================================');
  } catch (error) {
    log(`Error reading configuration: ${error}`);
  }
};
