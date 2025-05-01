import { outputChannel } from '../vscode/outputChannel/getOutputChannel';
import { formatTimestampForLogger } from './formatTimestampForLogger';

export function log(message: string, prefix: string = '[Suffixes]'): void {
  const timestamp = formatTimestampForLogger();
  const logMessage = `[${timestamp}] ${prefix} ${message}`;

  if (!outputChannel) {
    console.log(logMessage);
    return;
  }

  outputChannel.appendLine(logMessage);
}
