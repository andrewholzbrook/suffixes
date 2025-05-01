import * as path from 'path';
import * as vscode from 'vscode';
import { log } from '../logging/log';
import { getPreferredSuffixes } from './getPreferredSuffixes';
import { InFileDisplayProvider } from './inFileDisplay';
import { createTreeDataProviderWithRefresh } from './scanner/createTreeDataProviderWithRefresh';
import { initializeScanner } from './scanner/initializeScanner';
import { createInitialSortingState, sortingReducer } from './state/sorting.state';

export async function initializeCoreComponents(context: vscode.ExtensionContext) {
  const scanner = initializeScanner({
    extensionName: '',
    onError: (error) => {
      log(`[Init] Error during initialization: ${error}`);
      throw error;
    },
  });

  // Initialize sorting state
  const sortingState = createInitialSortingState();

  // Create tree provider with sorting state
  const treeProvider = createTreeDataProviderWithRefresh({
    onDidChangeTreeData: sortingState.onDidChangeTreeData,
    getActiveSorts: () => sortingState.activeSorts,
    getAllSuffixes: scanner.getAllSuffixes,
    getFilesForSuffix: scanner.getFilesForSuffix,
    getMatchPattern: (filePath: string, suffix: string): string => {
      const filename = path.basename(filePath);
      const matchIndex = filename.lastIndexOf(suffix);
      return matchIndex >= 0 ? filename.substring(matchIndex) : suffix;
    },
    getPreferredSuffixes,
  });

  // Register commands for sorting
  context.subscriptions.push(
    vscode.commands.registerCommand('suffixes.toggleSortByName', () => {
      sortingReducer(sortingState, { type: 'TOGGLE_SORT', sortType: 'name' });
    }),
    vscode.commands.registerCommand('suffixes.toggleSortByCount', () => {
      sortingReducer(sortingState, { type: 'TOGGLE_SORT', sortType: 'count' });
    })
  );

  const inFileProvider = new InFileDisplayProvider(scanner);

  // Initialize the in-file provider now that scanner is ready
  log('[Init] Initializing in-file provider');
  await inFileProvider.initialize();
  log('[Init] In-file provider initialization complete');

  return { scanner, treeProvider, inFileProvider };
}
