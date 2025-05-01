import { EventEmitter } from 'vscode';

export interface SortConfig {
  type: 'name' | 'count';
  state: 'asc' | 'desc' | 'off';
}

export interface SortingState {
  activeSorts: SortConfig[];
  onDidChangeTreeData: EventEmitter<any>;
}

export function createInitialSortingState(): SortingState {
  return {
    activeSorts: [],
    onDidChangeTreeData: new EventEmitter<any>(),
  };
}

export type SortingAction =
  | { type: 'TOGGLE_SORT'; sortType: 'name' | 'count' }
  | { type: 'SET_SORT'; sortType: 'name' | 'count'; direction: 'asc' | 'desc' | 'off' };

export function sortingReducer(state: SortingState, action: SortingAction): void {
  switch (action.type) {
    case 'TOGGLE_SORT': {
      const existingSort = state.activeSorts.find((sort) => sort.type === action.sortType);
      if (existingSort) {
        // Cycle through states: off -> asc -> desc -> off
        const newState =
          existingSort.state === 'off' ? 'asc' : existingSort.state === 'asc' ? 'desc' : 'off';
        state.activeSorts = state.activeSorts.map((sort) =>
          sort.type === action.sortType ? { ...sort, state: newState } : sort
        );
      } else {
        state.activeSorts = [...state.activeSorts, { type: action.sortType, state: 'asc' }];
      }
      break;
    }
    case 'SET_SORT': {
      const existingSort = state.activeSorts.find((sort) => sort.type === action.sortType);
      if (existingSort) {
        state.activeSorts = state.activeSorts.map((sort) =>
          sort.type === action.sortType ? { ...sort, state: action.direction } : sort
        );
      } else {
        state.activeSorts = [
          ...state.activeSorts,
          { type: action.sortType, state: action.direction },
        ];
      }
      break;
    }
  }
  state.onDidChangeTreeData.fire(undefined);
}
