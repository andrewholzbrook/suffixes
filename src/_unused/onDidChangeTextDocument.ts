import { workspace } from 'vscode';
import { Disposable } from './Disposable';
import { TextDocumentChangeEvent } from './TextDocumentChangeEvent';

export function onDidChangeTextDocument(
  didChangeTextEditorHandler: (e: TextDocumentChangeEvent) => void
): Disposable {
  return workspace.onDidChangeTextDocument(didChangeTextEditorHandler);
}
