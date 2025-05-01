import { window } from 'vscode';
import { StatusBarAlignment } from './StatusBarAlignment';
import { StatusBarItem } from './StatusBarItem';

export function createStatusBarItem(
  alignment: StatusBarAlignment = StatusBarAlignment.Right,
  priority: number = 100
): StatusBarItem {
  return window.createStatusBarItem(alignment, priority);
}
