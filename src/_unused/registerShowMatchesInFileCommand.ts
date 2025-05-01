import { getWindowActiveTextEditor } from './getWindowActiveTextEditor';
import { InFileDisplayProvider } from './inFileDisplay';
import { registerCommand } from './registerCommand';

export function registerShowMatchesInFileCommand(inFileProvider: InFileDisplayProvider) {
  return registerCommand('suffixes.showMatchesInFile', async () => {
    const editor = getWindowActiveTextEditor();
    if (!editor) {
      return;
    }

    await inFileProvider.showMatches(editor.document);
  });
}
