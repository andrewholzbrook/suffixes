# Solo Extension Idea

- [ ] - TODO.md Hover Buttons that Tell the AI to do a common thing on this page.. like prioritizing tickets.
- [ ] - Hover over markdown checkbox + bold word, click, copies that line + a small prompt about estimating it, breaking it down and giving rest back, start on it if it's small, and mark it complete when it's done.
- [ ] - AI TODO - Click on any TODO, see its status synced with the list at `./docs/TODOS.md`. Right click to prompt to pull this to the top of the stack and start working on it.
- [ ] - AI TRUNKY - When files that look like they are a page/feature/etc, it will go figure out if something is going to be exposed.
- [ ] - AI Word Association - Click any word, get a word cloud, left click them to include them, right click to exclude them and immediately exclude them. Encourages you to type and guess one of the related words.

# Stack

- [ ] - Reaquaint myself with this project.

# Story: Workspace Index Optimization

- [ ] - Implement efficient workspace indexing using VSCode's internal APIs and file system watchers
- [ ] - Use VSCode's workspace.findFiles() with optimized patterns.
- [ ] - Implement file system watcher-based index updates.
- [ ] - Consider caching strategies for large workspaces.
- [ ] - Add background indexing with progress indicators.
- [ ] - Support incremental updates for better performance.
- [ ] - Consider using vscode.workspace.textDocuments for opened files.
- [ ] - Add configuration for index update frequency and caching behavior.

# Story: Configuration Enhancements

- [ ] - Add settings for display properties, match limits, and appearance
- [ ] - Use VS Code's settings API.
- [ ] - Keep options simple and intuitive.
- [ ] - Add configurable file properties display.
- [ ] - Add maximum matches display setting with dynamic adjustment.
- [ ] - Enable match list appearance customization using VS Code's theming system.
- [ ] - Consider caching strategies for file metadata and search results.

# Story: Interaction Features

- [ ] - Add search, path copying, and breadcrumb navigation
- [ ] - Consider fuzzy search and different path format options.
- [ ] - Enable one-click path copying.
- [ ] - Add pinning for frequently used suffix groups with state persistence.
- [ ] - Show breadcrumb navigation for suffix context using VS Code's breadcrumb API.
- [ ] - Planned: Context menu actions, Drag-and-drop support, Keyboard shortcuts.

# Story: Visual Enhancements

- [ ] - Add file type icons, hover previews, and current file highlighting
- [ ] - Use VS Code's built-in icons and theming system.
- [ ] - Show file content preview on hover with content caching.
- [ ] - Highlight current file in matches list using active editor tracking.
- [ ] - Display match count for each suffix.
- [ ] - Current status: ✅ Custom icons for suffix groups, ✅ File type icons.
- [ ] - Next: Implement status indicators, Add visual feedback, Improve styling with theme support.

# Story: Real-time Updates

- [ ] - Implement real-time match updates with performance optimizations
- [ ] - Consider debouncing updates and virtual scrolling for large lists.
- [ ] - Implement file system watching for updates.
- [ ] - Add loading indicators, progress bars, and status messages.
- [ ] - Implement lazy loading with background loading and cancel support.

# Story: File Navigation Enhancements

- [ ] - Group files by directory with collapse/expand and sorting options (Enhancements for the Tree View)
- [ ] - Consider performance with deep directory structures.
- [ ] - Use VS Code's tree view patterns.
- [ ] - Implement sorting options (name, path, last modified) with caching.
- [ ] - Add collapse/expand functionality.
- [ ] - Current status: ✅ Basic sorting by name, ✅ File count badges.
- [ ] - Next: Implement parent directory grouping, Add more sorting options with persistence.

# Story: Core Display

- [ ] - Show matching files in a dedicated panel/sidebar with full file paths and direct file opening
- [ ] - Foundation for other features.
- [ ] - Need to decide between panel vs sidebar approach.
- [ ] - Consider truncation for long paths.
- [ ] - Enable direct file opening from matches list.
- [ ] - Current implementation: ✅ Basic file icons and paths, ✅ Error handling, ✅ Auto-refresh.
- [ ] - Next: Add file size and last modified date to tooltips.

# Story: Pattern Configuration

- [ ] - Allow users to configure patterns per file type when too many matches are found
- [ ] - Use VS Code's quick pick for pattern selection.
- [ ] - Store patterns in workspace settings.
- [ ] - Consider regex support for advanced filtering.
- [ ] - Implement real-time search with fuzzy matching and history support.

# In-File Display Implementation Plan

- [ ] - Create new class InFileDisplayProvider
- [ ] - Implement basic split view display
- [ ] - Show matching files in a list
- [ ] - Add click-to-open functionality
- [ ] - Modify SuffixScanner to support in-file display
- [ ] - Add method to get file contents for display
- [ ] - Implement basic filtering for large result sets
- [ ] - Create basic split view layout
- [ ] - Add file list component
- [ ] - Implement basic styling
- [ ] - Add loading states
- [ ] - Add pattern configuration UI
- [ ] - Implement pattern storage
- [ ] - Add pattern validation
- [ ] - Add result count display
- [ ] - Implement pattern suggestion when too many results
- [ ] - Add pattern quick pick
- [ ] - Add syntax highlighting
- [ ] - Implement code folding
- [ ] - Add line numbers
- [ ] - Show file headers
- [ ] - Add file navigation controls
- [ ] - Implement scroll sync
- [ ] - Add search within displayed files
- [ ] - Implement lazy loading
- [ ] - Add file content caching
- [ ] - Optimize large file handling
- [ ] - Add loading indicators
- [ ] - Implement error states
- [ ] - Add tooltips and help text

# Story: File Tree View

- [ ] - An icon for this extension is visible in the VS Code activity bar.
- [ ] - Clicking this icon opens a dedicated tree view panel.
- [ ] - The file tree view accurately represents the workspace structure.
- [ ] - Files with configured suffixes are visually distinct.
- [ ] - The tree view updates automatically in response to relevant changes.
- [ ] - Context menus on tree items provide relevant actions.
- [ ] - View-level actions (e.g., Refresh) are available.
- [ ] - Define icons and add contributions to package.json.
- [ ] - Create the TreeDataProvider implementation class.
- [ ] - Implement getChildren logic to fetch workspace structure.
- [ ] - Integrate with Suffix module to determine hasSuffix for items.
- [ ] - Set contextValue on TreeItem based on hasSuffix.
- [ ] - Implement command handlers (suffixes.explorer.\*).
- [ ] - Connect FileSystem change events to trigger TreeDataProvider.refresh().
- [ ] - Connect Configuration change events to trigger refreshes/reloads.
- [ ] - Connect Suffix change events (after add/remove) to trigger TreeDataProvider.refresh().
