// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SuffixScanner } from './suffixScanner';
import { SuffixViewPanel } from './viewPanel';
import { WorkspaceManager } from './workspaceManager';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let scanner: SuffixScanner | undefined;
	let titleButton: vscode.StatusBarItem | undefined;
	const workspaceManager = WorkspaceManager.getInstance();

	// Function to initialize the extension
	function initializeExtension() {
		try {
			// Initialize scanner
			scanner = new SuffixScanner();

			// Register the command to show suffix matches
			const disposable = vscode.commands.registerCommand('suffixes.showMatches', () => {
				if (!workspaceManager.isWorkspaceAvailable()) {
					vscode.window.showInformationMessage('Please open a workspace folder to use Suffixes.');
					return;
				}

				if (!scanner) {
					scanner = new SuffixScanner();
				}

				const activeEditor = workspaceManager.getActiveEditor();
				if (!activeEditor) {
					vscode.window.showInformationMessage('Please open a file to show suffix matches.');
					return;
				}

				SuffixViewPanel.createOrShow(scanner);
			});

			// Create and configure the status bar button
			titleButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
			titleButton.text = "$(files) Show Suffix Matches";
			titleButton.command = 'suffixes.showMatches';
			titleButton.tooltip = 'Show files with matching suffixes';

			// Show the button when a file is opened
			vscode.window.onDidChangeActiveTextEditor((editor) => {
				if (editor?.document.uri.scheme === 'file' && workspaceManager.isWorkspaceAvailable()) {
					titleButton?.show();
				} else {
					titleButton?.hide();
				}
			});

			// Initial button state
			if (workspaceManager.getActiveEditor()?.document.uri.scheme === 'file' && 
				workspaceManager.isWorkspaceAvailable()) {
				titleButton.show();
			} else {
				titleButton.hide();
			}

			context.subscriptions.push(disposable, titleButton);
		} catch (error) {
			console.error('Error initializing Suffixes extension:', error);
		}
	}

	// Try to initialize immediately
	initializeExtension();

	// Listen for workspace folder changes
	context.subscriptions.push(
		vscode.workspace.onDidChangeWorkspaceFolders(() => {
			initializeExtension();
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {
	// Cleanup will be handled by VS Code's disposal system
}
