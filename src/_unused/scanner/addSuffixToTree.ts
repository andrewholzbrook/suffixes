import { log } from '../../logging/log';

export function addSuffixToTree(
  suffix: string,
  filePath: string,
  tree: Map<string, Set<string>>
): Map<string, Set<string>> {
  // Create a new map to maintain immutability
  const newTree = new Map(tree);

  // Get or create a new set for the suffix
  const existingSet = newTree.get(suffix);
  const newSet = new Set(existingSet || []);
  newSet.add(filePath);

  // Set the new set in the new map
  newTree.set(suffix, newSet);

  log(`[Scanner] Added suffix pattern: ${suffix} for ${filePath}`);
  return newTree;
}
