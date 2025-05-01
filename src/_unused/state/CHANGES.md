# State Management Consolidation Changes

## Overview

This document outlines the recent changes made to consolidate and improve the state management in the codebase.

## Changes Made

### 1. Sorting State Consolidation

- **Files Affected:**

  - `tree.state.ts` (deleted)
  - `activeSorts.state.ts` (deleted)
  - `SortConfig.ts` (deleted)
  - `sorting.state.ts` (new consolidated file)

- **Changes:**
  - Merged duplicate sorting logic from `tree.state.ts` and `activeSorts.state.ts`
  - Consolidated `SortConfig` interface into `sorting.state.ts`
  - Updated all references to use the new consolidated file
  - Implemented a single source of truth for sorting-related types and logic

### 2. excludeFromIndex Consolidation

- **Files Affected:**

  - `scanner.state.ts`
  - `workspace.state.ts`

- **Changes:**
  - Removed `excludeFromIndex` from `scanner.state.ts`
  - Established `workspace.state.ts` as the source of truth for `excludeFromIndex`
  - Updated `scanner.state.ts` to receive `excludeFromIndex` from workspace state

## Current State Files

The codebase now maintains the following state files:

1. `scanner.state.ts`
2. `inFileDisplay.state.ts`
3. `command.state.ts`
4. `extension.state.ts`
5. `workspace.state.ts`
6. `sorting.state.ts`

## Benefits

- Reduced code duplication
- Improved maintainability
- Clearer state management responsibilities
- Single source of truth for related functionality

## Next Steps

- Review remaining state management for potential consolidation
- Add tests for the consolidated sorting state
- Document the new state management structure
- Consider implementing state management best practices across all state files
