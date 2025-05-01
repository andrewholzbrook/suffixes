import { getWindowActiveTextEditor } from './getWindowActiveTextEditor';
import { InFileDisplayProvider } from './inFileDisplay';
import { registerCommand } from './registerCommand';

export function registerShowFilesInViewCommand(inFileProvider: InFileDisplayProvider) {
  return registerCommand('suffixes.showInFileView', async () => {
    const editor = getWindowActiveTextEditor();

    if (!editor) {
      return;
    }

    await inFileProvider.showInFileView();
  });
}
