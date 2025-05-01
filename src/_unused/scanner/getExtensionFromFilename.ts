export function getExtensionFromFilename(filename: string): string | undefined {
  const extensionMatch = filename.match(/\.[^.]+$/);
  return extensionMatch ? extensionMatch[0] : undefined;
}
