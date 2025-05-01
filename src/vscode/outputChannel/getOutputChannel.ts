import { OutputChannel } from './OutputChannel';

export let outputChannel: OutputChannel | undefined;

export function initializeOutputChannel(channel: OutputChannel) {
  if (outputChannel) {
    outputChannel.dispose();
  }
  outputChannel = channel;
  channel.clear();
}

export function getOutputChannel(): OutputChannel {
  if (!outputChannel) {
    throw new Error('Logger not initialized. Call initializeLogger first.');
  }
  return outputChannel;
}
