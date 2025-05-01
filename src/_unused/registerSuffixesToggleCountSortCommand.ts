import { registerCommand } from './registerCommand';

export function registerSuffixesToggleCountSortCommand(callback: () => Promise<void>) {
  registerCommand('suffixes.toggleCountSort', callback);
}
