import { StatusBarItem } from './StatusBarItem';

export interface StatusBarButton {
  show: () => void;
  dispose: () => void;
  button: StatusBarItem;
}
