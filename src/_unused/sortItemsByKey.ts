import { SortToggleState } from './SortToggleState';

export function sortItemsByKey<T>(
  items: T[],
  getKey: (item: T) => string | number,
  sortState: SortToggleState
): T[] {
  if (sortState === 'off') return items;

  const sorted = [...items].sort((a, b) => {
    const keyA = getKey(a);
    const keyB = getKey(b);
    if (typeof keyA === 'string' && typeof keyB === 'string') {
      return keyA.toLowerCase().localeCompare(keyB.toLowerCase());
    }
    return (keyA as number) - (keyB as number);
  });

  return sortState === 'asc' ? sorted : sorted.reverse();
}
