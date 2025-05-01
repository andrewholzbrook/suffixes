import { ComparisonView } from './ComparisonView';
import { InFileDisplayProvider } from './inFileDisplay';
import { registerRefreshCommand } from './registerRefreshCommand';
import { registerShowComparisonCommand } from './registerShowComparisonCommand';
import { registerShowFilesInViewCommand } from './registerShowFilesInViewCommand';
import { registerShowMatchesInFileCommand } from './registerShowMatchesInFileCommand';

export function initializeSuffixCommands(inFileProvider: InFileDisplayProvider) {
  const comparisonView = new ComparisonView();

  const showMatchesInFileCommand = registerShowMatchesInFileCommand(inFileProvider);
  const showInFileViewCommand = registerShowFilesInViewCommand(inFileProvider);
  const refreshCommand = registerRefreshCommand(inFileProvider);
  const showComparison = registerShowComparisonCommand(comparisonView);

  return [showMatchesInFileCommand, showInFileViewCommand, showComparison, refreshCommand];
}
