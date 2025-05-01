export interface IndexingState {
  indexingPromise: Promise<void> | null;
  resolveIndexing: ((value: void | PromiseLike<void>) => void) | null;
  rejectIndexing: ((reason?: any) => void) | null;
}

export type IndexingAction =
  | { type: 'START_INDEXING' }
  | { type: 'COMPLETE_INDEXING' }
  | { type: 'ERROR'; error: Error };

export function createInitialIndexingState(): IndexingState {
  return {
    indexingPromise: null,
    resolveIndexing: null,
    rejectIndexing: null,
  };
}

export function indexingReducer(state: IndexingState, action: IndexingAction): IndexingState {
  switch (action.type) {
    case 'START_INDEXING':
      let resolveIndexing: ((value: void | PromiseLike<void>) => void) | null = null;
      let rejectIndexing: ((reason?: any) => void) | null = null;

      const indexingPromise = new Promise<void>((resolve, reject) => {
        resolveIndexing = resolve;
        rejectIndexing = reject;
      });

      return {
        ...state,
        indexingPromise,
        resolveIndexing,
        rejectIndexing,
      };

    case 'COMPLETE_INDEXING':
      state.resolveIndexing?.();
      return {
        ...state,
        indexingPromise: null,
        resolveIndexing: null,
        rejectIndexing: null,
      };

    case 'ERROR':
      state.rejectIndexing?.(action.error);
      return {
        ...state,
        indexingPromise: null,
        resolveIndexing: null,
        rejectIndexing: null,
      };

    default:
      return state;
  }
}
