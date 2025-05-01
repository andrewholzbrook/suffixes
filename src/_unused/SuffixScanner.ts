export interface SuffixScanner {
  initialize(files: string[]): void;
  getSuffixForFile(filePath: string): string | undefined;
  getFilesForSuffix(suffix: string): string[];
  getAllSuffixes(): string[];
}
