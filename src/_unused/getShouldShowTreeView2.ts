import { log } from '../logging/log';
import { getSuffixesConfig } from './getSuffixesConfig';

export const getShouldShowTreeView = (config = getSuffixesConfig()): boolean => {
  const value = config.get<boolean>('showTreeView') ?? true;
  log(`Should show TreeView: ${value}`);
  return value;
};
