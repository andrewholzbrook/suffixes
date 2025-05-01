import { workspace } from 'vscode';

/**
 * Gets the list of preferred suffixes from VSCode configuration.
 * These suffixes will be prioritized when matching files.
 * @returns Array of preferred suffixes
 */
export function getPreferredSuffixes(): string[] {
  const config = workspace.getConfiguration('suffixes');
  return config.get<string[]>('preferredSuffixes', []);
}
