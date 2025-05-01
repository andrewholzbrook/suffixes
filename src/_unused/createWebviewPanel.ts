import { ViewColumn, window } from 'vscode';
import { WebviewOptions } from './WebviewOptions';
import { WebviewPanel } from './WebviewPanel';
import { WebviewPanelOptions } from './WebviewPanelOptions';

export function createWebviewPanel(
  viewType: string,
  title: string,
  showOptions: ViewColumn,
  options?: WebviewPanelOptions & WebviewOptions
): WebviewPanel | undefined {
  return window.createWebviewPanel(viewType, title, showOptions, options);
}
