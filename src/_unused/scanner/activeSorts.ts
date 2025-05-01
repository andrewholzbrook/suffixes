import { SortToggleState } from '../SortToggleState';

export type SortType = 'name' | 'count';

export interface SortToggle {
  type: SortType;
  state: SortToggleState;
}

export interface ActiveSorts {
  getActiveSorts: () => SortToggle[];
  setActiveSorts: (sorts: SortToggle[]) => void;
}

export function createActiveSorts(): ActiveSorts {
  let activeSorts: SortToggle[] = [];

  return {
    getActiveSorts: () => activeSorts,
    setActiveSorts: (sorts: SortToggle[]) => {
      activeSorts = sorts;
    },
  };
}
