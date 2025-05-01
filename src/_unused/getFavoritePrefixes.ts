import { workspace } from 'vscode';

export function getFavoritePrefixes(): string[] {
  const config = workspace.getConfiguration('suffixes');
  const favoritePrefixes = config.get<string[]>('favoritePrefixes', []);
  console.log(`[Config] Favorite prefixes: ${favoritePrefixes.join(', ')}`);
  return favoritePrefixes;
}
