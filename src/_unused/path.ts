export function getFilePathSuffix(filePath: string): string | undefined {
  const parts = filePath.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
  return undefined;
}
