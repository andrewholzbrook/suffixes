import { Disposable } from 'vscode';
import { ComparisonView } from '../ComparisonView';

export interface CommandState {
  comparisonView: ComparisonView;
  commands: {
    showMatchesInFile: Disposable;
    showInFileView: Disposable;
    refresh: Disposable;
    showComparison: Disposable;
  };
}

export function createInitialCommandState(comparisonView: ComparisonView): CommandState {
  return {
    comparisonView,
    commands: {
      showMatchesInFile: { dispose: () => {} },
      showInFileView: { dispose: () => {} },
      refresh: { dispose: () => {} },
      showComparison: { dispose: () => {} },
    },
  };
}

export type CommandAction =
  | { type: 'REGISTER_COMMAND'; name: keyof CommandState['commands']; command: Disposable }
  | { type: 'DISPOSE_COMMAND'; name: keyof CommandState['commands'] }
  | { type: 'DISPOSE_ALL' };

export function commandReducer(state: CommandState, action: CommandAction): CommandState {
  switch (action.type) {
    case 'REGISTER_COMMAND':
      return {
        ...state,
        commands: {
          ...state.commands,
          [action.name]: action.command,
        },
      };

    case 'DISPOSE_COMMAND':
      state.commands[action.name].dispose();
      return {
        ...state,
        commands: {
          ...state.commands,
          [action.name]: { dispose: () => {} },
        },
      };

    case 'DISPOSE_ALL':
      Object.values(state.commands).forEach((cmd) => cmd.dispose());
      return {
        ...state,
        commands: {
          showMatchesInFile: { dispose: () => {} },
          showInFileView: { dispose: () => {} },
          refresh: { dispose: () => {} },
          showComparison: { dispose: () => {} },
        },
      };

    default:
      return state;
  }
}
