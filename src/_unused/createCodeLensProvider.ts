import * as path from 'path';
import { type CodeLensProvider } from 'vscode';
import { CodeLens } from './CodeLens';
import { Command } from './Command';
import { Range } from './Range';
import { SuffixScanner } from './SuffixScanner';
import { TextDocument } from './TextDocument';
import { Uri } from './Uri';

export function createCodeLensProvider(getScanner: () => SuffixScanner): CodeLensProvider {
  return {
    provideCodeLenses(document: TextDocument): CodeLens[] {
      const scanner = getScanner();
      const filePath = document.uri.fsPath;
      const suffix = scanner.getSuffixForFile(filePath);

      if (!suffix) {
        return [];
      }

      const matchingFiles = scanner.getFilesForSuffix(suffix);
      if (matchingFiles.length <= 1) {
        return [];
      }

      // Find the first class or function definition
      const firstLine = document.lineAt(0);
      const range = new Range(firstLine.range.start, firstLine.range.end);

      return matchingFiles.map((matchingFile) => {
        const command: Command = {
          title: `Compare with ${path.basename(matchingFile)}`,
          command: 'suffixes.showComparison',
          arguments: [document.uri, Uri.file(matchingFile)],
        };

        return new CodeLens(range, command);
      });
    },
  };
}
