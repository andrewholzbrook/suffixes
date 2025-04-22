import * as vscode from 'vscode';
import * as path from 'path';
import { WorkspaceManager } from './workspaceManager';

export class SuffixScanner {
    private workspaceManager: WorkspaceManager;

    constructor() {
        this.workspaceManager = WorkspaceManager.getInstance();
    }

    public getSuffix(filename: string): string {
        try {
            const parts = filename.split('.');
            return parts.length > 1 ? `.${parts.slice(1).join('.')}` : '';
        } catch (error) {
            console.error('Error getting suffix:', error);
            return '';
        }
    }

    public async findMatchingFiles(currentFile: string): Promise<vscode.Uri[]> {
        try {
            if (!this.workspaceManager.isWorkspaceAvailable()) {
                console.warn('No workspace folder is open or trusted');
                return [];
            }

            const currentSuffix = this.getSuffix(path.basename(currentFile));
            if (!currentSuffix) {
                return [];
            }

            const pattern = `**/*${currentSuffix}`;
            const matchingFiles = await this.workspaceManager.findFiles(pattern);
            return matchingFiles.filter(uri => uri.fsPath !== currentFile);
        } catch (error) {
            console.error('Error finding matching files:', error);
            return [];
        }
    }

    public async getFileContents(uri: vscode.Uri): Promise<string> {
        try {
            const document = await this.workspaceManager.openTextDocument(uri);
            return document.getText();
        } catch (error) {
            console.error(`Error reading file ${uri.fsPath}:`, error);
            return '';
        }
    }
} 