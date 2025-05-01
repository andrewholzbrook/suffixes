import { SuffixScanner } from './SuffixScanner';

export function getFilePathSuffixFromScanner(
  scanner: SuffixScanner,
  filePath: string
): string | undefined {
  return scanner.getSuffixForFile(filePath);
}
