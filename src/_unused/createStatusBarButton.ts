import { StatusBarAlignment } from './StatusBarAlignment';
import { StatusBarButton } from './StatusBarButton';
import { createStatusBarItem } from './createStatusBarItem';

export function createStatusBarButton(): StatusBarButton {
  const button = createStatusBarItem(StatusBarAlignment.Right, 100);
  button.text = '$(file-code) Suffixes';
  button.tooltip = 'Show file suffixes';
  button.command = 'suffixes.showMatchesInFile';

  return {
    show: () => button.show(),
    dispose: () => button.dispose(),
    button,
  };
}
