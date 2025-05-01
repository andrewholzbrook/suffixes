import { window } from 'vscode';

export function showErrorMessage() {
  window.showErrorMessage('Failed to show comparison view');
}
