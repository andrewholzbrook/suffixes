import { extensionName } from '../extensionName';
import { log } from '../logging/log';
import { findFilesInDirectory } from './findFilesInDirectory';
import { getWorkspaceFolders } from './getWorkspaceFolders';

export async function findFilesInWorkspace(): Promise<string[]> {
  const workspaceFolders = getWorkspaceFolders();

  if (!workspaceFolders || workspaceFolders.length === 0) {
    log('[findFilesInWorkspace] No workspace folders found');
    return [];
  }

  const allFiles: string[] = [];

  for (const folder of workspaceFolders) {
    log(`[findFilesInWorkspace] Processing workspace folder: ${folder.uri.fsPath}`);
    const files = await findFilesInDirectory(extensionName, folder.uri.fsPath);
    allFiles.push(...files);
  }

  log(`[findFilesInWorkspace] Found ${allFiles.length} files across all workspaces`);
  if (allFiles.length > 0) {
    const sampleFiles = allFiles.slice(0, 5);
    log(`[findFilesInWorkspace] Sample files: ${JSON.stringify(sampleFiles)}`);
  }

  return allFiles;
}
