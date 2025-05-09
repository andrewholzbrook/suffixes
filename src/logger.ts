import * as vscode from 'vscode';

let outputChannel: vscode.LogOutputChannel | undefined;

function getOutputChannel(): vscode.LogOutputChannel {
  if (!outputChannel) {
    // The second argument `{ log: true }` enables methods like .debug, .info, etc.
    // and makes it a "Log Output Channel" which has filtering capabilities.
    outputChannel = vscode.window.createOutputChannel('Suffixes', { log: true });
  }
  return outputChannel;
}

export class Logger {
  private sourcePrefix: string;

  /**
   * Creates a new Logger instance.
   * @param sourceFileName The name of the source file (e.g., "extension" or "CodeLensProvider").
   *                         If a full filename like "extension.ts" is provided, ".ts" will be stripped.
   */
  constructor(sourceFileName: string) {
    const baseName = sourceFileName.endsWith('.ts') ? sourceFileName.slice(0, -3) : sourceFileName;
    this.sourcePrefix = `[Suffixes:${baseName}]`;
  }

  private log(level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR', message: string, ...args: any[]): void {
    const channel = getOutputChannel();
    // Constructing the message similar to how LogOutputChannel itself might format it when using console-like methods.
    // No need to manually add [LEVEL] as channel.info(), channel.debug() etc. handle it if the channel is a LogOutputChannel
    const formattedMessage = `${this.sourcePrefix} ${message}`;

    switch (level) {
      case 'DEBUG':
        channel.debug(formattedMessage, ...args);
        break;
      case 'INFO':
        channel.info(formattedMessage, ...args);
        break;
      case 'WARN':
        channel.warn(formattedMessage, ...args);
        break;
      case 'ERROR':
        channel.error(formattedMessage, ...args);
        break;
    }
  }

  debug(message: string, ...args: any[]): void {
    this.log('DEBUG', message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log('INFO', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log('WARN', message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log('ERROR', message, ...args);
  }

  // Method to reveal the output channel to the user
  show(): void {
    const channel = getOutputChannel();
    channel.show();
  }
}
