import * as path from 'path';

export function getSuffixMatchPattern(filePath: string, suffix: string): string {
  const filename = path.basename(filePath);
  const matchIndex = filename.lastIndexOf(suffix);
  if (matchIndex >= 0) {
    return filename.substring(matchIndex);
  }
  return suffix;
}
