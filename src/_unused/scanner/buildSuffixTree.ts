import { SuffixScanner } from '../SuffixScanner';
import { processFileSuffixes } from './processFileSuffixes';
import { shouldIgnoreFile } from './shouldIgnoreFile';

export function buildSuffixTree(
  scanner: SuffixScanner,
  filePath: string,
  excludeFromIndex: string[] = []
): void {
  if (shouldIgnoreFile(filePath, excludeFromIndex)) {
    return;
  }

  processFileSuffixes(scanner, filePath);
}
