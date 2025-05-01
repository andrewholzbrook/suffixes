import { SortToggleState } from '../SortToggleState';

export type SortType = 'name' | 'count';

export interface SortToggle {
  type: SortType;
  state: SortToggleState;
}

export function toggleSort({
  type,
  getCurrentSorts,
  setCurrentSorts,
  notifyChange,
}: {
  type: SortType;
  getCurrentSorts: () => SortToggle[];
  setCurrentSorts: (sorts: SortToggle[]) => void;
  notifyChange: () => void;
}): void {
  const currentSorts = getCurrentSorts();
  const currentIndex = currentSorts.findIndex((s) => s.type === type);
  const currentState = currentIndex >= 0 ? currentSorts[currentIndex].state : 'off';

  const newSorts = [...currentSorts];
  if (currentIndex >= 0) {
    newSorts.splice(currentIndex, 1);
  }

  let nextSortToggleState: SortToggleState;
  if (type === 'name') {
    nextSortToggleState = currentState === 'off' ? 'asc' : currentState === 'asc' ? 'desc' : 'off';
  } else {
    nextSortToggleState = currentState === 'off' ? 'desc' : currentState === 'desc' ? 'asc' : 'off';
  }

  if (nextSortToggleState !== 'off') {
    newSorts.unshift({ type, state: nextSortToggleState });
  }

  setCurrentSorts(newSorts);
  notifyChange();
}
