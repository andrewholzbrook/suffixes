import { log } from '../../logging/log';
import { SuffixScanner } from '../SuffixScanner';
import { getAllSuffixesFromTree } from './getAllSuffixesFromTree';
import { getSuffixFromTree } from './getSuffixFromTree';
import { scannerReducer } from './scanner.events';
import { createInitialState, ScannerState } from './scanner.state';
import { shouldIgnoreFile } from './shouldIgnoreFile';

export class SimpleSuffixScanner implements SuffixScanner {
  private state: ScannerState;
  private isDisposed: boolean = false;

  constructor(excludeFromIndex: string[]) {
    this.state = createInitialState(excludeFromIndex);
  }

  private checkDisposed() {
    if (this.isDisposed) {
      throw new Error('Scanner has been disposed');
    }
  }

  initialize(files: string[]): void {
    this.checkDisposed();

    if (this.state.indexing.indexingPromise) {
      return;
    }

    // Start indexing
    this.state = scannerReducer(this.state, { type: 'START_INDEXING' });

    // Process files
    try {
      log(`[Scanner] Indexing ${files.length} files`);

      files.forEach((file) => {
        if (shouldIgnoreFile(file, this.state.excludeFromIndex)) {
          return;
        }

        // Add each file to the tree
        this.state = scannerReducer(this.state, { type: 'ADD_FILE', filePath: file });
      });

      // Complete indexing
      this.state = scannerReducer(this.state, { type: 'COMPLETE_INDEXING' });
    } catch (error) {
      this.state = scannerReducer(this.state, { type: 'ERROR', error: error as Error });
      throw error;
    }
  }

  getSuffixForFile(filePath: string): string | undefined {
    this.checkDisposed();

    if (!this.state.isAGo) {
      // If not initialized, try to use the temporary tree
      if (this.state.tempSuffixTree.size > 0) {
        return getSuffixFromTree(filePath, this.state.tempSuffixTree, this.state.excludeFromIndex);
      }
      log(`[Scanner] Attempted to get suffix before initialization`);
      return undefined;
    }

    return getSuffixFromTree(filePath, this.state.suffixTree, this.state.excludeFromIndex);
  }

  getFilesForSuffix(suffix: string): string[] {
    this.checkDisposed();

    if (!this.state.isAGo) {
      // If not initialized, try to use the temporary tree
      if (this.state.tempSuffixTree.size > 0) {
        return Array.from(this.state.tempSuffixTree.get(suffix) || []);
      }
      log(`[Scanner] Attempted to get files before initialization`);
      return [];
    }
    return Array.from(this.state.suffixTree.get(suffix) || []);
  }

  getAllSuffixes(): string[] {
    this.checkDisposed();

    if (!this.state.isAGo) {
      // If not initialized, try to use the temporary tree
      if (this.state.tempSuffixTree.size > 0) {
        return getAllSuffixesFromTree(this.state.tempSuffixTree);
      }
      log(`[Scanner] Attempted to get suffixes before initialization`);
      return [];
    }
    return getAllSuffixesFromTree(this.state.suffixTree);
  }
}
