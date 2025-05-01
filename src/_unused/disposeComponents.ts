import { ExtensionComponents } from '../components/ExtensionComponents';

export function disposeComponents(components: ExtensionComponents): void {
  components.commands.showMatchesInFile.dispose();
  components.commands.refreshCommand.dispose();
  components.statusBarButton.button.dispose();
  components.monitoring.watchers.forEach((watcher) => watcher.dispose());
}
