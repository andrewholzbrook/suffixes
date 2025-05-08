import * as vscode from 'vscode';

/**
 * Provides CodeLenses for items in the configured TODO file (e.g., .vscode/TODO.md).
 */
export class CodeLensProvider implements vscode.CodeLensProvider {
  /**
   * Computes the CodeLenses for a given document.
   * @param document The document to compute lenses for.
   * @param token A cancellation token.
   * @returns An array of CodeLenses or a thenable that resolves to such an array.
   */
  provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    console.log(
      `[Suffixes:CodeLensProvider] provideCodeLenses triggered for: ${document.uri.fsPath}`
    );

    const lenses: vscode.CodeLens[] = [];
    const next3Heading = '## Next 3';
    const readyHeading = '## Ready';
    const refineHeading = '## Refine';
    const backlogHeading = '## Backlog';

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);

      // Check for Next 3
      if (line.text.trim() === next3Heading) {
        const range = new vscode.Range(i, 0, i, line.text.length);
        const command: vscode.Command = {
          title: 'Log Heading Click',
          command: 'suffixes.logHeadingClick',
          arguments: [next3Heading, i],
        };
        lenses.push(new vscode.CodeLens(range, command));
        console.log(
          `[Suffixes:CodeLensProvider] Found heading "${next3Heading}" on line ${i + 1}. Adding CodeLens.`
        );
        // No break, continue checking other lines/headings
      }

      // Check for Ready
      if (line.text.trim() === readyHeading) {
        const range = new vscode.Range(i, 0, i, line.text.length);
        const command: vscode.Command = {
          title: 'Log Heading Click',
          command: 'suffixes.logHeadingClick',
          arguments: [readyHeading, i],
        };
        lenses.push(new vscode.CodeLens(range, command));
        console.log(
          `[Suffixes:CodeLensProvider] Found heading "${readyHeading}" on line ${i + 1}. Adding CodeLens.`
        );
        // No break
      }

      // Check for Refine
      if (line.text.trim() === refineHeading) {
        const range = new vscode.Range(i, 0, i, line.text.length);
        const command: vscode.Command = {
          title: 'Log Heading Click',
          command: 'suffixes.logHeadingClick',
          arguments: [refineHeading, i],
        };
        lenses.push(new vscode.CodeLens(range, command));
        console.log(
          `[Suffixes:CodeLensProvider] Found heading "${refineHeading}" on line ${i + 1}. Adding CodeLens.`
        );
        // No break
      }

      // Check for Backlog
      if (line.text.trim() === backlogHeading) {
        const range = new vscode.Range(i, 0, i, line.text.length);
        const command: vscode.Command = {
          title: 'Log Heading Click',
          command: 'suffixes.logHeadingClick',
          arguments: [backlogHeading, i],
        };
        lenses.push(new vscode.CodeLens(range, command));
        console.log(
          `[Suffixes:CodeLensProvider] Found heading "${backlogHeading}" on line ${i + 1}. Adding CodeLens.`
        );
        // No break
      }
    }

    return lenses;
  }

  // Optional: Implement resolveCodeLens later for performance if needed
}
