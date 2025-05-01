import { log } from '../logging/log';
import { getSuffixesConfig } from './getSuffixesConfig';

export const getShouldShowCodeLens = (config = getSuffixesConfig()): boolean => {
  const value = config.get<boolean>('showCodeLens') ?? true;
  log(`Should show CodeLens: ${value}`);
  return value;
};
