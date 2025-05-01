import { configKeys } from './configKeys';
import { getWorkspaceConfiguration } from './getWorkspaceConfiguration';

export function getShouldShowTreeView(
  extensionName: string,
  defaultValue: boolean = true
): boolean {
  return getWorkspaceConfiguration(extensionName).get(configKeys.showTreeView, defaultValue);
}
