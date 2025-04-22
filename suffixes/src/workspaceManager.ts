import * as vscode from 'vscode';

export class WorkspaceManager {
    private static instance: WorkspaceManager;
    private workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined;

    private constructor() {
        this.workspaceFolders = vscode.workspace.workspaceFolders;
        vscode.workspace.onDidChangeWorkspaceFolders(() => {
            this.workspaceFolders = vscode.workspace.workspaceFolders;
        });
    }

    public static getInstance(): WorkspaceManager {
        if (!WorkspaceManager.instance) {
            WorkspaceManager.instance = new WorkspaceManager();
        }
        return WorkspaceManager.instance;
    }

    public isWorkspaceAvailable(): boolean {
        return this.workspaceFolders !== undefined && this.workspaceFolders.length > 0;
    }

    public getActiveEditor(): vscode.TextEditor | undefined {
        return vscode.window.activeTextEditor;
    }

    public getWorkspaceFolders(): readonly vscode.WorkspaceFolder[] | undefined {
        return this.workspaceFolders;
    }

    public async findFiles(pattern: string): Promise<vscode.Uri[]> {
        if (!this.isWorkspaceAvailable()) {
            return [];
        }

        try {
            return await vscode.workspace.findFiles(pattern);
        } catch (error) {
            console.error('Error finding files:', error);
            return [];
        }
    }

    public async openTextDocument(uri: vscode.Uri): Promise<vscode.TextDocument> {
        if (!this.isWorkspaceAvailable()) {
            throw new Error('Workspace is not available');
        }

        try {
            return await vscode.workspace.openTextDocument(uri);
        } catch (error) {
            console.error(`Error opening document ${uri.fsPath}:`, error);
            throw error;
        }
    }

    public getActiveFilePath(): string | undefined {
        const editor = this.getActiveEditor();
        return editor?.document.uri.fsPath;
    }
} 