import { log } from '../../logging/log';
import { getPreferredSuffixes } from '../getPreferredSuffixes';
import { getAllPossibleSuffixes } from './getAllPossibleSuffixes';
import { shouldIgnoreFile } from './shouldIgnoreFile';

export function getSuffixFromTree(
  filePath: string,
  tree: Map<string, Set<string>>,
  excludeFromIndex: string[]
): string | undefined {
  if (shouldIgnoreFile(filePath, excludeFromIndex)) {
    log(`[Scanner] File ${filePath} is ignored`);
    return undefined;
  }

  // Split the path to get the filename
  const parts = filePath.split(/[\\/]/);
  const filename = parts[parts.length - 1];
  log(`[Scanner] Processing filename: ${filename}`);

  // Get the extension
  const extensionMatch = filename.match(/\.[^.]+$/);
  if (!extensionMatch) {
    log(`[Scanner] No extension found in ${filename}`);
    return undefined;
  }
  const extension = extensionMatch[0];
  log(`[Scanner] Found extension: ${extension}`);

  // First check preferred suffixes (still prioritize these)
  const preferredSuffixes = getPreferredSuffixes();
  log(`[Scanner] Checking preferred suffixes: ${preferredSuffixes.join(', ')}`);
  for (const preferred of preferredSuffixes) {
    if (filePath.endsWith(preferred)) {
      log(`[Scanner] Found preferred suffix ${preferred} for ${filePath}`);
      return preferred;
    }
  }

  // Get all possible suffixes for this file
  const possibleSuffixes = getAllPossibleSuffixes(filename, extension);
  log(`[Scanner] Possible suffixes for ${filename}: ${possibleSuffixes.join(', ')}`);

  // If no suffixes found, use the extension as a fallback
  if (possibleSuffixes.length === 0) {
    log(`[Scanner] No suffixes found, using extension as fallback: ${extension}`);
    return extension;
  }

  // Find all matching suffixes that exist in our tree
  const matchingSuffixes = possibleSuffixes.filter((suffix) => tree.has(suffix));
  log(`[Scanner] Matching suffixes in tree: ${matchingSuffixes.join(', ')}`);

  if (matchingSuffixes.length === 0) {
    log(`[Scanner] No matching suffixes found for ${filePath}`);
    return extension; // Use extension as fallback
  }

  // Sort by:
  // 1. Number of files using this suffix (more = better)
  // 2. Length of suffix (shorter = better)
  // 3. Prefix (_ or . preferred)
  const sortedSuffixes = matchingSuffixes.sort((a, b) => {
    const aFiles = tree.get(a)?.size || 0;
    const bFiles = tree.get(b)?.size || 0;

    // If one suffix has more files, prefer it
    if (aFiles !== bFiles) return bFiles - aFiles;

    // If same number of files, prefer shorter suffix
    if (a.length !== b.length) return a.length - b.length;

    // If same length, prefer _ prefix
    if (a.startsWith('_') && !b.startsWith('_')) return -1;
    if (!a.startsWith('_') && b.startsWith('_')) return 1;

    return 0;
  });

  const bestSuffix = sortedSuffixes[0];
  log(
    `[Scanner] Found suffix ${bestSuffix} for ${filePath} (${tree.get(bestSuffix)?.size || 0} files use this pattern)`
  );
  return bestSuffix;
}
