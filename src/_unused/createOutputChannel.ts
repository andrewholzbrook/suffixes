import { window } from 'vscode';
import { OutputChannel } from '../vscode/outputChannel/OutputChannel';

export function createOutputChannel(): OutputChannel {
  return window.createOutputChannel('Suffixes');
}
