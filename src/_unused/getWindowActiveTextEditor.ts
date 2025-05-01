import { window } from 'vscode';

export function getWindowActiveTextEditor() {
  return window.activeTextEditor;
}
