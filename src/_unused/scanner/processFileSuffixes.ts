import { log } from '../../logging/log';
import { getFilePathSuffixFromScanner } from '../getFilePathSuffixFromScanner';
import { SuffixScanner } from '../SuffixScanner';

export function processFileSuffixes(scanner: SuffixScanner, filePath: string): void {
  const suffix = getFilePathSuffixFromScanner(scanner, filePath);
  if (suffix) {
    log(`[ProcessFileSuffixes] Found suffix: ${suffix}`);
  } else {
    log('[ProcessFileSuffixes] No suffix found');
  }
}
