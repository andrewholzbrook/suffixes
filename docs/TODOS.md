# Suffixes Extension TODOs

---

# High Priority (Core MVP)

- [ ] (M) **Activity Bar & View:** Define Activity Bar icon and Tree View container in `package.json`.
  - [ ] (S) Understand `contributes.viewsContainers` and `contributes.views` in `package.json`.
  - [ ] (S) Define the `viewsContainers` entry for the Activity Bar (ID, title, icon).
  - [ ] (S) Choose/prepare an icon file (e.g., SVG) or select a VS Code Product Icon (`$(icon-name)`).
  - [ ] (S) Define the `views` entry for the Tree View (ID, name, type) linked to the container.
  - [ ] (S) Ensure the chosen Tree View `id` is noted for use in `extension.ts` later.
  - [ ] (S) Document the new UI elements in `README.md`.
  - [ ] (S) Add entry to `CHANGELOG.md`.
  - [ ] (S) Manually test: check icon, title, view panel appearance after loading the extension.
- [ ] (L) **TreeDataProvider Basics:** Implement `TreeDataProvider` to show workspace folder structure (`getChildren`).
- [ ] (M) **Configuration Integration:** Read basic `suffixes.mappings` and `suffixes.ignoredPatterns` from VS Code settings.
- [ ] (M) **Suffix Logic Integration:** Create mechanism for `TreeDataProvider` to query the `Suffix` module/logic to determine if a file has a suffix.
- [ ] (M) **Visual Distinction:** Set `TreeItem` properties (`iconPath`, `description`, `tooltip`, or `contextValue`) to visually distinguish files/folders with configured suffixes.
- [ ] (L) **Command Registration:** Register commands (`suffixes.addSuffix`, `suffixes.removeSuffix`, `suffixes.refreshTree`) in `package.json`.
- [ ] (M) **Command Implementation (Refresh):** Implement handler for Refresh command to trigger `TreeDataProvider.refresh()`.
- [ ] (M) **FileSystem Watcher:** Implement basic `FileSystemWatcher` to detect file create/delete/rename events. Trigger `TreeDataProvider.refresh()` on relevant changes.
- [ ] (M) **Configuration Changes:** Listen to `onDidChangeConfiguration` for relevant `suffixes.*` settings. Trigger full reload/refresh of suffix logic and `TreeDataProvider`.

---

# Medium Priority (Core MVP)

- [ ] (L) **Command Implementation (Add/Remove):** Implement handlers for Add/Remove commands. These should:
  - Prompt user if necessary (e.g., input for suffix to add).
  - Interact with the `Suffix` module/logic to update suffix data.
- [ ] (M) **Context Menus:** Define context menus (`menus` contribution in `package.json`) for files/folders in the tree view to trigger Add/Remove commands (using `when` clauses based on `contextValue`).
- [ ] (M) **View Actions:** Define view title actions (`menus` contribution) for the Refresh command.
- [ ] (M) **Suffix Logic Changes:** Ensure the `Suffix` module/logic can notify the Tree View (e.g., via events) when suffixes are added/removed via commands, triggering `TreeDataProvider.refresh()`.
- [ ] (M) **Directory Grouping:** Ensure `getChildren` correctly represents the hierarchical directory structure. (Largely inherent in TreeDataProvider).

---

# Low Priority (Core MVP & Enhancements)

- [ ] (S) **Basic Icons:** Use standard VS Code icons (`ThemeIcon`) for files and folders in the tree.
- [ ] (S) **Collapse/Expand:** Ensure folders can be collapsed and expanded. (Largely inherent in TreeDataProvider).
- [ ] (S-M) **Enhancement - Visual:** Highlight the currently active file in the Suffixes tree view.
- [ ] (M) **Enhancement - Interaction:** Add options for copying file paths from the tree view (e.g., full path, relative path).
- [ ] (M) **Enhancement - Navigation:** Add sorting options to the tree view (e.g., by name, by type, by suffix status) with state persistence.
- [ ] (M) **Enhancement - Configuration:** Add settings for customizing the _appearance_ of suffixed items (e.g., specific icon, label format).
- [ ] (M) **Enhancement - Visual:** Display suffix directly in the tree item label or description.
- [ ] (M-L) **Enhancement - Interaction:** Add basic text search/filter capability within the Suffixes tree view.
- [ ] (L) **Enhancement - Visual:** Show file content previews on hover (consider performance implications).
- [ ] (S) **Enhancement - Core Display:** Add file size and last modified date to tooltips.
- [ ] (L) **Enhancement - Interaction:** Implement breadcrumb navigation reflecting suffix context (if applicable).
- [ ] (L) **Enhancement - Performance:** Implement more advanced real-time update optimizations (e.g., virtual scrolling, more granular updates if needed).
- [ ] (L) **Enhancement - Performance:** Implement optimized workspace indexing/caching if performance becomes an issue with large workspaces.
- [ ] (M) **Enhancement - Interaction:** Allow pinning of specific suffixes or files/folders.
- [ ] (M) **Enhancement - Configuration:** Add settings for display properties like maximum items shown (if list becomes flat).

---

# Out of Scope / Different Features

These items represent significantly different features or separate extension ideas not covered by the current `DESIGN.md`.

- **Solo Extension Idea:** (All items listed under this heading in the original file)
  - `- [ ] - TODO.md Hover Buttons...`
  - `- [ ] - Hover over markdown checkbox...`
  - `- [ ] - AI TODO...`
  - `- [ ] - AI TRUNKY...`
  - `- [ ] - AI Word Association...`
- **Story: Pattern Configuration:** (All items related to dynamic pattern configuration based on match counts)
  - `- [ ] - Allow users to configure patterns per file type...`
  - `- [ ] - Use VS Code's quick pick for pattern selection...`
  - `- [ ] - Store patterns in workspace settings...`
  - _etc._
- **In-File Display Implementation Plan:** (All items related to showing matches in a split editor view)
  - `- [ ] - Create new class InFileDisplayProvider...`
  - `- [ ] - Implement basic split view display...`
  - `- [ ] - Show matching files in a list...`
  - _etc._
- **(From other stories):** Specific items clearly related to search/filtering features rather than the core tree view display (e.g., fuzzy search, match counts per suffix group if not tied to tree view).
