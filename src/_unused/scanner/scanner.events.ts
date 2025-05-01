import { log } from '../../logging/log';
import { buildSuffixTree } from './buildSuffixTree';
import { IndexingAction, indexingReducer } from './indexing/indexing.state';
import { ScannerState } from './scanner.state';

export type ScannerAction =
  | { type: 'START_INDEXING' }
  | { type: 'ADD_FILE'; filePath: string }
  | { type: 'COMPLETE_INDEXING' }
  | { type: 'ERROR'; error: Error };

function isIndexingAction(action: ScannerAction): action is IndexingAction {
  return (
    action.type === 'START_INDEXING' ||
    action.type === 'COMPLETE_INDEXING' ||
    action.type === 'ERROR'
  );
}

export function scannerReducer(state: ScannerState, action: ScannerAction): ScannerState {
  // Handle indexing state first
  const newIndexingState = isIndexingAction(action)
    ? indexingReducer(state.indexing, action)
    : state.indexing;

  switch (action.type) {
    case 'ADD_FILE':
      buildSuffixTree(state.scanner, action.filePath, state.excludeFromIndex);
      return {
        ...state,
        indexing: newIndexingState,
      };

    case 'COMPLETE_INDEXING':
      const suffixes = state.scanner.getAllSuffixes();
      const totalFileCount = suffixes.reduce(
        (count, suffix) => count + state.scanner.getFilesForSuffix(suffix).length,
        0
      );

      log(
        `[Scanner] Indexing complete. Found ${totalFileCount} files with ${suffixes.length} unique suffixes`
      );

      return {
        ...state,
        indexing: newIndexingState,
        isAGo: true,
      };

    default:
      return {
        ...state,
        indexing: newIndexingState,
      };
  }
}
