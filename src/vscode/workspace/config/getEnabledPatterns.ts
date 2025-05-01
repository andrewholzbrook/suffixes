import { workspace } from 'vscode';

import { log } from '../../../logging/log';
import { configKeys } from './configKeys';

export function getEnabledPatterns(
  extensionName: string,
  defaultValue: string[] = ['*.ts', '*.js', '*.tsx', '*.jsx', '*.css', '*.scss', '*.html', '*.json']
) {
  const patterns = workspace
    .getConfiguration(extensionName)
    .get(configKeys.enabledPatterns, defaultValue);
  log(`Enabled patterns: ${patterns.join(', ')}`);
  return patterns;
}
