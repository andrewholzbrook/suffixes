import { log } from '../logging/log';
import { createRelativeWorkspaceFolderPattern } from './createRelativeWorkspaceFolderPattern';
import { findWorkspaceFiles } from './files';
import { WorkspaceFolder } from './WorkspaceFolder';

export async function findMatchingFiles(
  suffix: string,
  workspaceFolders: readonly WorkspaceFolder[] | undefined,
  ignorePatterns: string[],
  getSuffixFn: (filePath: string) => Promise<string>
): Promise<string[]> {
  log(`Finding files matching suffix: ${suffix}`);
  if (!workspaceFolders) {
    log('No workspace folders found');
    return [];
  }

  log(`Ignore patterns: ${ignorePatterns.join(', ')}`);

  const matchingFiles: string[] = [];
  for (const folder of workspaceFolders) {
    const pattern = createRelativeWorkspaceFolderPattern(folder);
    const ignorePattern = ignorePatterns.join(',');

    const fileUris = await findWorkspaceFiles(pattern, ignorePattern);
    const files = fileUris.map((uri) => uri.fsPath);

    for (const file of files) {
      const fileSuffix = await getSuffixFn(file);
      if (fileSuffix === suffix) {
        matchingFiles.push(file);
      }
    }
  }

  log(`Found ${matchingFiles.length} files matching suffix ${suffix}`);
  return matchingFiles;
}
