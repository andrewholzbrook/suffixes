import * as path from 'path';

import { TextEditor, TextEditorDecorationType, ThemeColor, Uri, ViewColumn, window } from 'vscode';
import { log } from '../logging/log';
import { createInFileViewWebviewPanel } from './createInFileViewWebviewPanel';
import { createStatusBarItem } from './createStatusBarItem';
import { createTextEditorDecorationType } from './createTextEditorDecorationType';
import { Disposable } from './Disposable';
import { executeCommand } from './executeCommand';
import { getFavoritePrefixes } from './getFavoritePrefixes';
import { getFilePathSuffixFromScanner } from './getFilePathSuffixFromScanner';
import { getWindowActiveTextEditor } from './getWindowActiveTextEditor';
import { getInFileTemplate } from './inFileTemplate';
import { onDidChangeActiveTextEditor } from './onDidChangeActiveTextEditor';
import { onDidChangeTextDocument } from './onDidChangeTextDocument';
import { onDidChangeTextEditorVisibleRanges } from './onDidChangeTextEditorVisibleRanges';
import { readFile } from './readFile';
import { showQuickPick } from './showQuickPick';
import { showTextDocument } from './showTextDocument';
import { StatusBarAlignment } from './StatusBarAlignment';
import { StatusBarItem } from './StatusBarItem';
import { SuffixScanner } from './SuffixScanner';
import { TextDocument } from './TextDocument';
import { TextDocumentChangeEvent } from './TextDocumentChangeEvent';
import { TextEditorVisibleRangesChangeEvent } from './TextEditorVisibleRangesChangeEvent';
import { WebviewPanel } from './WebviewPanel';

interface WebviewMessage {
  command: 'openFile' | 'compareFiles';
  filePath?: string;
  originalPath?: string;
  modifiedPath?: string;
}

export class InFileDisplayProvider implements Disposable {
  private decorations: TextEditorDecorationType[] = [];
  private disposables: Disposable[] = [];
  public titleButton: StatusBarItem;
  private currentPanel: WebviewPanel | undefined;
  private isInitted = false;
  private decorationType: TextEditorDecorationType;
  private scanner: SuffixScanner;

  constructor(scanner: SuffixScanner) {
    log('[InFileDisplay] Initializing provider');

    this.scanner = scanner;
    this.decorationType = window.createTextEditorDecorationType({
      isWholeLine: true,
      backgroundColor: new ThemeColor('editor.lineHighlightBackground'),
    });

    // Create the title button
    this.titleButton = createStatusBarItem();
    this.titleButton.name = 'Show Similar Files';
    this.titleButton.command = 'suffixes.showInFileView';
    this.titleButton.text = '$(files)';
    this.titleButton.backgroundColor = new ThemeColor('statusBarItem.warningBackground');
    this.titleButton.tooltip = 'Show files with matching suffix';
    this.disposables.push(this.titleButton);
    // Update button visibility when active editor changes
    this.disposables.push(
      onDidChangeActiveTextEditor((editor: TextEditor | undefined) => {
        log('[InFileDisplay] Active editor changed');
        if (editor && this.isInitted) {
          this.updateButtonVisibility();
        } else {
          this.titleButton.hide();
        }
      })
    );

    this.disposables.push(
      onDidChangeTextDocument((e: TextDocumentChangeEvent) => {
        const editor = getWindowActiveTextEditor();
        if (editor && editor.document === e.document && this.isInitted) {
          this.updateButtonVisibility();
        }
      })
    );

    this.initialize();
  }

  public async initialize(): Promise<void> {
    try {
      // Initialize any required components
      this.isInitted = true;
      log('[InFileDisplay] Initialized successfully');
    } catch (error) {
      log('[InFileDisplay] Initialization failed:', error?.toString());
    }
  }

  private updateButtonVisibility() {
    if (!this.isInitted) {
      log('[InFileDisplay] Skipping button visibility update - not initialized');
      return;
    }

    const editor = getWindowActiveTextEditor();
    if (!editor) {
      this.titleButton.hide();
      return;
    }

    const filePath = editor.document.uri.fsPath;

    // Skip output panel and non-file URIs
    if (!filePath || filePath.includes('extension-output-') || !filePath.startsWith('/')) {
      this.titleButton.hide();
      return;
    }

    log(`[InFileDisplay] Checking button visibility for ${filePath}`);
    const suffix = this.scanner.getSuffixForFile(filePath);

    if (!suffix) {
      log('[InFileDisplay] No suffix found - hiding button');
      this.titleButton.hide();
      return;
    }

    const matchingFiles = this.scanner.getFilesForSuffix(suffix);
    if (matchingFiles.length > 1) {
      // Update button to show just icon and count
      this.titleButton.text = `$(files) ${matchingFiles.length}`;
      this.titleButton.tooltip = `${matchingFiles.length} files matching *${suffix}\nClick to view similar files`;
      log(
        `[InFileDisplay] Button shown for ${filePath} with suffix ${suffix} (${matchingFiles.length} matches)`
      );
      this.titleButton.show();
      // Double check it's shown after a short delay
      setTimeout(() => {
        this.titleButton.show();
      }, 100);
    } else {
      log('[InFileDisplay] Not enough matches - hiding button');
      this.titleButton.hide();
    }
  }

  private isWebviewMessage(message: unknown): message is WebviewMessage {
    if (typeof message !== 'object' || message === null) {
      return false;
    }

    const msg = message as Record<string, unknown>;

    if (typeof msg.command !== 'string' || !['openFile', 'compareFiles'].includes(msg.command)) {
      return false;
    }

    if (msg.filePath !== undefined && typeof msg.filePath !== 'string') {
      return false;
    }

    if (msg.originalPath !== undefined && typeof msg.originalPath !== 'string') {
      return false;
    }

    if (msg.modifiedPath !== undefined && typeof msg.modifiedPath !== 'string') {
      return false;
    }

    return true;
  }

  private async handleMessage(message: WebviewMessage): Promise<void> {
    if (message.command === 'openFile' && message.filePath) {
      const uri = Uri.file(message.filePath);
      await showTextDocument(uri);
    } else if (message.command === 'compareFiles' && message.originalPath && message.modifiedPath) {
      const originalUri = Uri.file(message.originalPath);
      const modifiedUri = Uri.file(message.modifiedPath);
      const title = `${path.basename(message.originalPath)} ↔ ${path.basename(message.modifiedPath)}`;
      await executeCommand(originalUri, modifiedUri, title);
    }
  }

  public async showInFileView(): Promise<void> {
    const editor = getWindowActiveTextEditor();
    if (!editor) {
      return;
    }

    const filePath = editor.document.uri.fsPath;
    const suffix = this.scanner.getSuffixForFile(filePath);

    if (!suffix) {
      return;
    }

    const matchingFiles = this.scanner.getFilesForSuffix(suffix);
    if (matchingFiles.length <= 1) {
      return;
    }

    log(`[${suffix}] Showing ${matchingFiles.length} files`);

    // If we already have a panel, show it
    if (this.currentPanel) {
      this.currentPanel.reveal(ViewColumn.Beside);
      return;
    }

    // Create and show panel
    this.currentPanel = createInFileViewWebviewPanel(suffix, filePath);

    // Set initial content
    if (this.currentPanel != null) {
      this.currentPanel.webview.html = getInFileTemplate({
        files: await Promise.all(
          matchingFiles.map(async (filePath) => ({
            path: filePath,
            content: (await readFile(filePath)).toString(),
          }))
        ),
        favoritePrefixes: await getFavoritePrefixes(),
      });
    }

    log(`Created webview panel with ${matchingFiles.length} files`);

    // Handle messages from the webview
    if (this.currentPanel != null) {
      this.currentPanel.webview.onDidReceiveMessage(
        (message: unknown) => {
          if (this.isWebviewMessage(message)) {
            this.handleMessage(message);
          }
        },
        undefined,
        this.disposables
      );
    }

    // Handle editor scroll events
    const scrollDisposable = onDidChangeTextEditorVisibleRanges(
      (e: TextEditorVisibleRangesChangeEvent) => {
        if (e.textEditor === getWindowActiveTextEditor() && this.currentPanel) {
          const firstLine = e.visibleRanges[0]?.start.line || 0;
          const percentage = firstLine / e.textEditor.document.lineCount;
          this.currentPanel.webview.postMessage({
            command: 'scrollEditor',
            percentage: percentage,
          });
        }
      }
    );

    // Handle panel disposal
    if (this.currentPanel) {
      this.currentPanel.onDidDispose(
        () => {
          this.currentPanel = undefined;
          scrollDisposable.dispose();
          log('Webview panel disposed');
        },
        null,
        this.disposables
      );
    }
  }

  public refresh(files: string[]): void {
    log('[InFileDisplay] Refreshing with new files');
    // Clear scanner data
    this.scanner.initialize(files);

    // Clear UI state
    this.dispose();

    // Recreate the title button
    this.titleButton = createStatusBarItem(StatusBarAlignment.Right, 100);
    this.titleButton.name = 'Show Similar Files';
    this.titleButton.command = 'suffixes.showInFileView';
    this.titleButton.text = '$(files)';
    this.titleButton.backgroundColor = new ThemeColor('statusBarItem.warningBackground');
    this.titleButton.tooltip = 'Show files with matching suffix';
    this.disposables.push(this.titleButton);

    // Update button visibility
    this.updateButtonVisibility();
  }

  public async showMatches(document: TextDocument): Promise<void> {
    const editor = getWindowActiveTextEditor();
    if (!editor) {
      return;
    }

    const suffix = this.scanner.getSuffixForFile(document.uri.fsPath);
    if (!suffix) {
      return;
    }

    const matchingFiles = this.scanner.getFilesForSuffix(suffix);
    if (matchingFiles.length === 0) {
      return;
    }

    // Create decoration for each matching file
    const decorations = matchingFiles.map((file) => {
      const decoration = createTextEditorDecorationType();
      this.decorations.push(decoration);
      return decoration;
    });

    // Add to disposables
    this.disposables.push(...decorations);

    // Show files in a quick pick
    const selected = await showQuickPick(matchingFiles);

    if (selected) {
      const uri = Uri.file(selected);
      await showTextDocument(uri);
    }
  }

  public updateDecorations(editor: TextEditor): void {
    const suffix = getFilePathSuffixFromScanner(this.scanner, editor.document.uri.fsPath);
    if (suffix) {
      log(`[InFileDisplay] Found suffix: ${suffix}`);
    } else {
      log('[InFileDisplay] No suffix found');
    }
  }

  public dispose(): void {
    this.decorations.forEach((d) => d.dispose());
    this.disposables.forEach((d) => d.dispose());
    this.decorations = [];
    this.disposables = [];
    if (this.currentPanel) {
      this.currentPanel.dispose();
    }
  }
}
