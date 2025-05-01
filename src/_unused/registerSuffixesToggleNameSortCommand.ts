import { registerCommand } from './registerCommand';

export function registerSuffixesToggleNameSortCommand(callback: () => Promise<void>) {
  registerCommand('suffixes.toggleNameSort', callback);
}
