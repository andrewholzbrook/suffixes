// Common Dart file patterns
const DART_PATTERNS = [
  '_page.dart',
  '_widget.dart',
  '_screen.dart',
  '_view.dart',
  '_model.dart',
  '_service.dart',
  '_bloc.dart',
  '_cubit.dart',
  '_repository.dart',
  '_provider.dart',
  '_controller.dart',
  '_state.dart',
  '_event.dart',
  '_mapper.dart',
  '_adapter.dart',
  '_delegate.dart',
  '_action.dart',
] as const;

export function getSuffix(
  getEnabledPatterns: () => string[],
  filePath: string
): string | undefined {
  const enabledPatterns = getEnabledPatterns();

  // First check if the file matches any enabled pattern
  if (!enabledPatterns.some((pattern) => filePath.endsWith(pattern))) {
    return undefined;
  }

  // Check each specific pattern
  for (const pattern of DART_PATTERNS) {
    if (filePath.endsWith(pattern)) {
      return pattern;
    }
  }

  // If it's a .dart file but doesn't match any specific pattern, return .dart
  if (filePath.endsWith('.dart')) {
    return '.dart';
  }

  return undefined;
}
