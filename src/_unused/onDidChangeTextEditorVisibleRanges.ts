import { window } from 'vscode';
import { TextEditorVisibleRangesChangeEvent } from './TextEditorVisibleRangesChangeEvent';

export function onDidChangeTextEditorVisibleRanges(
  callback: (e: TextEditorVisibleRangesChangeEvent) => void
) {
  return window.onDidChangeTextEditorVisibleRanges(callback);
}
