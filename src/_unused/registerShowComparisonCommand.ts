import { Uri } from 'vscode';
import { ComparisonView } from './ComparisonView';
import { registerCommand } from './registerCommand';

export function registerShowComparisonCommand(comparisonView: ComparisonView) {
  return registerCommand('suffixes.showComparison', (originalUri: Uri, modifiedUri: Uri) => {
    return new Promise((resolve) => {
      comparisonView.showComparison(originalUri, modifiedUri);
      resolve();
    });
  });
}
