import { workspace } from 'vscode';

export const getSuffixesConfig = () => workspace.getConfiguration('suffixes');
