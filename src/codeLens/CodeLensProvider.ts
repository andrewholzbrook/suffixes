import * as vscode from 'vscode';

/**
 * Provides CodeLenses for items in the /docs/TODOS.md file.
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
    console.log(`[TodoCodeLensProvider] provideCodeLenses triggered for: ${document.uri.fsPath}`);

    const lenses: vscode.CodeLens[] = [];
    const targetHeading = '# Next Steps';

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      if (line.text.trim() === targetHeading) {
        const range = new vscode.Range(i, 0, i, line.text.length);
        const command: vscode.Command = {
          title: 'Log Heading Click',
          command: 'suffixes.logHeadingClick',
          arguments: [targetHeading, i], // Pass heading text and line number
        };
        lenses.push(new vscode.CodeLens(range, command));
        console.log(
          `[TodoCodeLensProvider] Found heading "${targetHeading}" on line ${i + 1}. Adding CodeLens.`
        );
        break; // Found it, no need to check further lines for this example
      }
    }

    return lenses;
  }

  // Optional: Implement resolveCodeLens later for performance if needed
  // resolveCodeLens?(codeLens: vscode.CodeLens, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens> {
  //     console.log("[TodoCodeLensProvider] resolveCodeLens triggered");
  //     // Potentially enrich the codeLens here, e.g., setting the command
  //     return codeLens;
  // }
}
