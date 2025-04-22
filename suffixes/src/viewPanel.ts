import * as vscode from 'vscode';
import * as path from 'path';
import { SuffixScanner } from './suffixScanner';

export class SuffixViewPanel {
    public static currentPanel: SuffixViewPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private readonly _scanner: SuffixScanner;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, scanner: SuffixScanner) {
        this._panel = panel;
        this._scanner = scanner;

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._updateWebviewContent();
    }

    public static createOrShow(scanner: SuffixScanner) {
        const column = vscode.window.activeTextEditor?.viewColumn || vscode.ViewColumn.One;

        if (SuffixViewPanel.currentPanel) {
            SuffixViewPanel.currentPanel._panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'suffixView',
            'Suffix Matches',
            column,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        SuffixViewPanel.currentPanel = new SuffixViewPanel(panel, scanner);
    }

    private async _updateWebviewContent() {
        this._panel.webview.html = await this._getWebviewContent();
    }

    private async _getWebviewContent(): Promise<string> {
        const currentFile = vscode.window.activeTextEditor?.document.uri.fsPath;
        if (!currentFile) {
            return this._getErrorContent('No active file');
        }

        const matchingFiles = await this._scanner.findMatchingFiles(currentFile);
        if (matchingFiles.length === 0) {
            return this._getErrorContent('No matching files found');
        }

        const fileContents = await Promise.all(
            matchingFiles.map(uri => this._scanner.getFileContents(uri))
        );

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Suffix Matches</title>
                <style>
                    body {
                        padding: 20px;
                        font-family: var(--vscode-font-family);
                    }
                    .file-container {
                        margin-bottom: 20px;
                        border: 1px solid var(--vscode-panel-border);
                        border-radius: 4px;
                        overflow: hidden;
                    }
                    .file-header {
                        padding: 8px;
                        background: var(--vscode-panel-background);
                        border-bottom: 1px solid var(--vscode-panel-border);
                    }
                    .file-content {
                        padding: 8px;
                        background: var(--vscode-editor-background);
                        color: var(--vscode-editor-foreground);
                        white-space: pre;
                        font-family: var(--vscode-editor-font-family);
                    }
                </style>
            </head>
            <body>
                <h2>Files matching suffix: ${this._scanner.getSuffix(currentFile)}</h2>
                ${matchingFiles.map((uri, index) => `
                    <div class="file-container">
                        <div class="file-header">
                            <strong>${path.basename(uri.fsPath)}</strong>
                        </div>
                        <div class="file-content">
                            ${this._escapeHtml(fileContents[index])}
                        </div>
                    </div>
                `).join('')}
            </body>
            </html>
        `;
    }

    private _getErrorContent(message: string): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Suffix Matches</title>
            </head>
            <body>
                <h2>${message}</h2>
            </body>
            </html>
        `;
    }

    private _escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    public dispose() {
        SuffixViewPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
} 