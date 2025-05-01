import { log } from '../logging/log';
import { getExcludeFromIndex } from '../vscode/workspace/config/getExcludeFromIndex';
import { createRelativeWorkspaceFolderPattern } from './createRelativeWorkspaceFolderPattern';
import { findFiles } from './findFiles';

export async function findFilesInDirectory(
  extensionName: string,
  directory: string
): Promise<string[]> {
  try {
    const pattern = createRelativeWorkspaceFolderPattern(directory, '**/*');
    const excludePatterns = getExcludeFromIndex(extensionName);

    log(`Searching for files in ${directory}`);
    log(`Using exclude patterns: ${excludePatterns.join(', ')}`);

    const files = await findFiles(pattern, excludePatterns);
    const filePaths = files.map((file) => file.fsPath);

    log(`Found ${filePaths.length} files`);
    return filePaths;
  } catch (error) {
    log(`Error finding files in directory: ${error}`);
    return [];
  }
}
