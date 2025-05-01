import * as path from 'path';

import { createWebviewPanel } from './createWebviewPanel';
import { Uri } from './Uri';
import { ViewColumn } from './ViewColumn';
import { WebviewPanel } from './WebviewPanel';

export function createComparisonWebviewPanel(
  originalUri: Uri,
  modifiedUri: Uri
): WebviewPanel | undefined {
  return createWebviewPanel(
    'suffixes.comparison',
    `Compare: ${path.basename(originalUri.fsPath)} ↔ ${path.basename(modifiedUri.fsPath)}`,
    ViewColumn.Beside,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );
}
