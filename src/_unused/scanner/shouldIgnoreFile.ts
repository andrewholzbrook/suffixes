export function shouldIgnoreFile(filePath: string, excludeFromIndex: string[]): boolean {
  // Ignore system files and output panel
  if (
    filePath.includes('extension-output-') ||
    filePath.includes('extension-output-undefined_publisher') ||
    filePath.includes('extension-output-#') ||
    !filePath.startsWith('/')
  ) {
    return true;
  }

  // Check against ignore patterns
  return excludeFromIndex.some((pattern) => {
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    return regex.test(filePath);
  });
}
