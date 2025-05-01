export function getWordsFromFilename(filename: string): string[] {
  // Remove extension first
  const withoutExt = filename.replace(/\.[^.]+$/, '');
  // Split by common delimiters
  return withoutExt.split(/[_\-\s.]+/).filter(Boolean);
}
