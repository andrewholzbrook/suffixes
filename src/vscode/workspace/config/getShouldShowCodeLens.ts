import { workspace } from 'vscode';

import { configKeys } from './configKeys';

export function getShouldShowCodeLens(
  extensionName: string,
  defaultValue: boolean = true
): boolean {
  return workspace.getConfiguration(extensionName).get(configKeys.showCodeLens, defaultValue);
}
