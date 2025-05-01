# In-File Display Implementation Plan

## Overview

Implement a feature to show matching files' code directly within the current file's view, using VS Code's split view or custom webview.

## Phase 1: Basic Display

1. **Create Display Provider**

   - [ ] Create new class `InFileDisplayProvider`
   - [ ] Implement basic split view display
   - [ ] Show matching files in a list
   - [ ] Add click-to-open functionality

2. **Integrate with SuffixScanner**

   - [ ] Modify `SuffixScanner` to support in-file display
   - [ ] Add method to get file contents for display
   - [ ] Implement basic filtering for large result sets

3. **UI Components**
   - [ ] Create basic split view layout
   - [ ] Add file list component
   - [ ] Implement basic styling
   - [ ] Add loading states

## Phase 2: Pattern Management

1. **Pattern Configuration**

   - [ ] Add pattern configuration UI
   - [ ] Implement pattern storage
   - [ ] Add pattern validation

2. **Result Set Management**
   - [ ] Add result count display
   - [ ] Implement pattern suggestion when too many results
   - [ ] Add pattern quick pick

## Phase 3: Enhanced Display

1. **Code Display**

   - [ ] Add syntax highlighting
   - [ ] Implement code folding
   - [ ] Add line numbers
   - [ ] Show file headers

2. **Navigation**
   - [ ] Add file navigation controls
   - [ ] Implement scroll sync
   - [ ] Add search within displayed files

## Phase 4: Performance & Polish

1. **Performance**

   - [ ] Implement lazy loading
   - [ ] Add file content caching
   - [ ] Optimize large file handling

2. **UX Improvements**
   - [ ] Add loading indicators
   - [ ] Implement error states
   - [ ] Add tooltips and help text

## Technical Considerations

- Use VS Code's Webview API for custom display
- Consider using VS Code's built-in diff view for comparison
- Implement proper disposal of resources
- Handle workspace changes gracefully

## Testing Plan

1. Unit Tests

   - Display provider
   - Pattern management
   - File content handling

2. Integration Tests

   - Split view integration
   - Pattern configuration
   - Performance with large files

3. User Testing
   - Basic functionality
   - Pattern configuration
   - Performance feedback

## Dependencies

- VS Code API
- Current SuffixScanner implementation
- Pattern configuration system

## Success Criteria

- Users can view matching files directly in their editor
- Pattern configuration works for large result sets
- Performance is acceptable with large files
- UI is intuitive and consistent with VS Code
