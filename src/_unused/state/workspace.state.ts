export interface WorkspaceState {
  excludeFromIndex: string[];
  showCodeLens: boolean;
}

export function createInitialWorkspaceState(
  excludeFromIndex: string[],
  showCodeLens: boolean = true
): WorkspaceState {
  return {
    excludeFromIndex,
    showCodeLens,
  };
}

export type WorkspaceAction =
  | { type: 'SET_EXCLUDE_FROM_INDEX'; patterns: string[] }
  | { type: 'SET_SHOW_CODE_LENS'; value: boolean };

export function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {
    case 'SET_EXCLUDE_FROM_INDEX':
      return {
        ...state,
        excludeFromIndex: action.patterns,
      };

    case 'SET_SHOW_CODE_LENS':
      return {
        ...state,
        showCodeLens: action.value,
      };

    default:
      return state;
  }
}
