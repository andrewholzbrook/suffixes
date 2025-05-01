import { SortConfig } from './state/sorting.state';

export const defaultActiveSorts: SortConfig[] = [{ type: 'count', state: 'desc' }];

let activeSorts: SortConfig[] = defaultActiveSorts;

export interface ActiveSorts {
  getActiveSorts(): SortConfig[];
  setActiveSorts: (activeSorts: SortConfig[]) => void;
}

export const activeSortsState: ActiveSorts = {
  getActiveSorts: () => activeSorts,
  setActiveSorts: (newActiveSorts: SortConfig[]) => {
    activeSorts = newActiveSorts;
  },
};
