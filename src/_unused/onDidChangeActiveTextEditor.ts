import { window } from 'vscode';
import { Disposable } from './Disposable';
import { TextEditor } from './TextEditor';

export function onDidChangeActiveTextEditor(
  didChangeActiveTextEditorHandler: (editor: TextEditor | undefined) => void
): Disposable {
  return window.onDidChangeActiveTextEditor(didChangeActiveTextEditorHandler);
}
