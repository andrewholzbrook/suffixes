import { ExtensionComponents } from '../../components/ExtensionComponents';
import { OutputChannel } from '../../vscode/outputChannel/OutputChannel';

export interface ExtensionState {
  currentComponents: ExtensionComponents | undefined;
  outputChannel: OutputChannel;
}

export function createInitialExtensionState(outputChannel: OutputChannel): ExtensionState {
  return {
    currentComponents: undefined,
    outputChannel,
  };
}

export type ExtensionAction =
  | { type: 'SET_COMPONENTS'; components: ExtensionComponents }
  | { type: 'CLEAR_COMPONENTS' }
  | { type: 'SET_OUTPUT_CHANNEL'; channel: OutputChannel };

export function extensionReducer(state: ExtensionState, action: ExtensionAction): ExtensionState {
  switch (action.type) {
    case 'SET_COMPONENTS':
      return {
        ...state,
        currentComponents: action.components,
      };

    case 'CLEAR_COMPONENTS':
      return {
        ...state,
        currentComponents: undefined,
      };

    case 'SET_OUTPUT_CHANNEL':
      return {
        ...state,
        outputChannel: action.channel,
      };

    default:
      return state;
  }
}
