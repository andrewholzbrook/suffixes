import { workspace } from 'vscode';
import { configKeys } from './configKeys';

export function getExcludeFromIndex(extensionName: string, defaultValue: string[] = []): string[] {
  return workspace.getConfiguration(extensionName).get(configKeys.excludeFromIndex, defaultValue);
}
