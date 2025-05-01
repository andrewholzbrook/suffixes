import { SortableItem } from './SortableItem';
import { SortToggleState } from './SortToggleState';
import { SortConfig } from './state/sorting.state';

export function sortItemsByNameAndCount<T extends SortableItem>(
  items: T[],
  getNameKey: (item: T) => string,
  getCountKey: (item: T) => number,
  activeSorts: SortConfig[],
  sortItems: <T>(
    items: T[],
    getKey: (item: T) => string | number,
    sortState: SortToggleState
  ) => T[]
): T[] {
  let sorted = [...items];

  // First sort by preferred status
  sorted = sorted.sort((a, b) => {
    if (a.isPreferred && !b.isPreferred) return -1;
    if (!a.isPreferred && b.isPreferred) return 1;
    return 0;
  });

  // Apply active sorts in order (most recently toggled first)
  for (const sort of activeSorts) {
    sorted = sortItems(sorted, sort.type === 'name' ? getNameKey : getCountKey, sort.state);
  }

  return sorted;
}
