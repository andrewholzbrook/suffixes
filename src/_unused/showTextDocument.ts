import { Uri, window } from 'vscode';

export function showTextDocument(uri: Uri) {
  return window.showTextDocument(uri);
}
