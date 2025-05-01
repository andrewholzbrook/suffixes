import { window } from 'vscode';
import { OverviewRulerLane } from './OverviewRulerLane';

export function createTextEditorDecorationType() {
  return window.createTextEditorDecorationType({
    backgroundColor: 'rgba(100, 100, 255, 0.1)',
    overviewRulerColor: 'rgba(100, 100, 255, 0.5)',
    overviewRulerLane: OverviewRulerLane.Right,
  });
}
