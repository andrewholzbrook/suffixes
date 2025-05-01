import { TreeDataProvider } from 'vscode';

export interface TreeDataProviderWithRefresh<T> extends TreeDataProvider<T> {
  refresh: () => void;
}
