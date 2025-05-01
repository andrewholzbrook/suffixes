import { getSuffix as getFileSuffix } from './patternMatcher';

export const getSuffix = (filePath: string, getEnabledPatterns: () => string[]): string => {
  const suffix = getFileSuffix(getEnabledPatterns, filePath);
  return suffix || '';
};
