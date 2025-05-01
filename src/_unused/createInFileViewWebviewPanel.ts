import * as path from 'path';
import { Uri, ViewColumn } from 'vscode';
import { createWebviewPanel } from './createWebviewPanel';

export function createInFileViewWebviewPanel(
  suffix: string,
  filePath: string
): import('vscode').WebviewPanel | undefined {
  return createWebviewPanel('suffixes.inFileView', `Similar Files: ${suffix}`, ViewColumn.Beside, {
    enableScripts: true,
    retainContextWhenHidden: true,
    localResourceRoots: [Uri.file(path.dirname(filePath))],
  });
}
