import { log } from '../../logging/log';
import { getExcludeFromIndex } from '../../vscode/workspace/config/getExcludeFromIndex';
import { findFilesInWorkspace } from '../findFilesInWorkspace';
import { SimpleSuffixScanner } from './scanner.bloc';

export function initializeScanner({
  extensionName,
  onError,
}: {
  extensionName: string;
  onError: (error: Error) => void;
}): SimpleSuffixScanner {
  const scanner = new SimpleSuffixScanner(getExcludeFromIndex(extensionName));

  findFilesInWorkspace()
    .then((files) => {
      if (!files || files.length === 0) {
        throw new Error('No files found in workspace');
      }
      scanner.initialize(files);
      log('[Init] Initial workspace scan complete');

      const suffixes = scanner.getAllSuffixes();
      if (!suffixes || suffixes.length === 0) {
        throw new Error('No suffixes found after initialization');
      }
    })
    .catch((error) => {
      log(`[Init] Error during scanner initialization: ${error}`);
      onError(error);
    });

  return scanner;
}
