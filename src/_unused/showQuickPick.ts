import { window } from 'vscode';

export function showQuickPick(matchingFiles: string[]) {
  return window.showQuickPick(matchingFiles, {
    placeHolder: 'Select a file to open',
  });
}
