import { IndexingState, createInitialIndexingState } from './indexing/indexing.state';
import { SimpleSuffixScanner } from './scanner.bloc';

export interface ScannerState {
  scanner: SimpleSuffixScanner;
  indexing: IndexingState;
  excludeFromIndex: string[];
  isAGo: boolean;
  tempSuffixTree: Map<string, Set<string>>;
  suffixTree: Map<string, Set<string>>;
}

export function createInitialState(excludeFromIndex: string[]): ScannerState {
  return {
    scanner: new SimpleSuffixScanner(excludeFromIndex),
    indexing: createInitialIndexingState(),
    excludeFromIndex,
    isAGo: false,
    tempSuffixTree: new Map(),
    suffixTree: new Map(),
  };
}
