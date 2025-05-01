export function getAllSuffixesFromTree(tree: Map<string, Set<string>>): string[] {
  return Array.from(tree.keys());
}
