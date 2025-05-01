import { log } from '../logging/log';
import { findFilesInWorkspace } from './findFilesInWorkspace';
import { InFileDisplayProvider } from './inFileDisplay';
import { registerCommand } from './registerCommand';

export function registerRefreshCommand(inFileProvider: InFileDisplayProvider) {
  return registerCommand('suffixes.refresh', async () => {
    log('Command triggered: Refresh');
    const files = await findFilesInWorkspace();
    log(`Total files to process: ${files.length}`);
    inFileProvider.refresh(files);
  });
}
