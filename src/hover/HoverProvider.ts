import * as vscode from 'vscode';

export class HoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    const line = document.lineAt(position.line);
    const lineText = line.text.trim(); // Get the text of the hovered line

    // If the line is empty or just whitespace, don't show a hover
    if (!lineText) {
      return null;
    }

    // Build commands
    // Use a built-in command for testing
    // const openSettingsCommandUri = vscode.Uri.parse('command:workbench.action.openSettings');
    const openTreeViewCommandUri = vscode.Uri.parse('command:suffixes.openTreeView');
    const refreshTreeCommandUri = vscode.Uri.parse('command:suffixes.refreshTree');

    // Create the hover content
    const hoverText = new vscode.MarkdownString('', true); // Enable commands
    hoverText.isTrusted = true; // Explicitly trust the content
    hoverText.supportHtml = true; // Allows for more styling if needed later

    // Add the line content
    hoverText.appendCodeblock(lineText, 'markdown');
    hoverText.appendMarkdown('\n\n---\n\n');

    // Add command links
    // Use the built-in command URI for the first link
    // hoverText.appendMarkdown(`[Open Settings](${openSettingsCommandUri}) | `);
    hoverText.appendMarkdown(`[Open Suffixes View](${openTreeViewCommandUri}) | `);
    hoverText.appendMarkdown(`[Refresh Suffixes View](${refreshTreeCommandUri})`);

    // Log the hover event with line number and text
    console.log(
      `[Suffixes:HoverProvider] Hover detected on line ${position.line + 1}: "${lineText}"`
    );

    // Return the hover object for the specific range of the line's non-whitespace content
    const hoverRange = new vscode.Range(
      position.line,
      line.firstNonWhitespaceCharacterIndex,
      position.line,
      line.text.length
    );

    return new vscode.Hover(hoverText, hoverRange);
  }
}
