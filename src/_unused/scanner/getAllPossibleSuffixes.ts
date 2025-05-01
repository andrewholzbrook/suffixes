import { getWordsFromFilename } from './getWordsFromFilename';

export function getAllPossibleSuffixes(filename: string, extension: string): string[] {
  const words = getWordsFromFilename(filename);
  const suffixes: string[] = [];

  if (words.length > 0) {
    // Start from the last word and progressively add more words from right to left
    for (let i = words.length - 1; i >= 0; i--) {
      const wordSlice = words.slice(i).join('_');

      // Check if the actual filename uses a dot or underscore prefix for this pattern
      const dotPattern = `.${wordSlice}${extension}`;
      const underscorePattern = `_${wordSlice}${extension}`;
      const noPrefix = `${wordSlice}${extension}`;

      // Prioritize patterns with _ or . prefix
      if (filename.includes(underscorePattern)) {
        suffixes.push(underscorePattern);
      } else if (filename.includes(dotPattern)) {
        suffixes.push(dotPattern);
      } else if (filename.includes(noPrefix)) {
        // Only add no-prefix pattern if we haven't found a prefixed version
        if (!suffixes.some((s) => s.endsWith(wordSlice + extension))) {
          suffixes.push(noPrefix);
        }
      }
    }
  }

  // Sort by length descending (longest first) and then by prefix (_ before .)
  return suffixes.sort((a, b) => {
    if (a.length !== b.length) return b.length - a.length;
    if (a.startsWith('_') && !b.startsWith('_')) return -1;
    if (!a.startsWith('_') && b.startsWith('_')) return 1;
    return 0;
  });
}
