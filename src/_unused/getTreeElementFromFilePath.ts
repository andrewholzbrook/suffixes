import * as path from 'path';
import { MarkdownString, Uri } from 'vscode';
import { asRelativePath } from './asWorkspaceRelativePath';
import { FileTreeElement } from './FileTreeElement';

export function getTreeElementFromFilePath(
  filePath: string,
  suffix: string,
  getMatchPattern: (filePath: string, suffix: string) => string
): FileTreeElement {
  const fileName = path.basename(filePath);
  const matchPattern = getMatchPattern(filePath, suffix);
  const fileUri = Uri.file(filePath);
  const relativePath = asRelativePath(filePath);

  return {
    type: 'file',
    label: fileName,
    description: `matches '${matchPattern}'`,
    resourceUri: fileUri,
    command: {
      command: 'vscode.open',
      title: 'Open File',
      arguments: [fileUri],
    },
    contextValue: 'file',
    tooltip: new MarkdownString()
      .appendMarkdown(`**${fileName}**\n\n`)
      .appendMarkdown(`Matches: \`${matchPattern}\`\n\n`)
      .appendMarkdown(`Path: ${relativePath}`),
  };
}
