import { TextEditorDecorationType } from 'vscode';

export interface InFileDisplayState {
  decorations: TextEditorDecorationType[];
  isInitted: boolean;
}

export function createInitialInFileDisplayState(): InFileDisplayState {
  return {
    decorations: [],
    isInitted: false,
  };
}

export type InFileDisplayAction =
  | { type: 'ADD_DECORATION'; decoration: TextEditorDecorationType }
  | { type: 'REMOVE_DECORATION'; decoration: TextEditorDecorationType }
  | { type: 'CLEAR_DECORATIONS' }
  | { type: 'SET_INITIALIZED'; value: boolean };

export function inFileDisplayReducer(
  state: InFileDisplayState,
  action: InFileDisplayAction
): InFileDisplayState {
  switch (action.type) {
    case 'ADD_DECORATION':
      return {
        ...state,
        decorations: [...state.decorations, action.decoration],
      };

    case 'REMOVE_DECORATION':
      return {
        ...state,
        decorations: state.decorations.filter((d) => d !== action.decoration),
      };

    case 'CLEAR_DECORATIONS':
      return {
        ...state,
        decorations: [],
      };

    case 'SET_INITIALIZED':
      return {
        ...state,
        isInitted: action.value,
      };

    default:
      return state;
  }
}
