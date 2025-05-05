## BACKLOG

<!-- QUICK IDEA INPUT: Add new raw ideas directly under this header for quick capture and later triage. -->

> **MODE: Capture Ideas.** Add raw thoughts/low-priority items. **Trigger:** Periodically review; promote viable tasks and trigger `MODE: Prioritize Refinement List` in `REFINE.md`.

---

- [ ] **VSCode Extension Exploration - Menus (Context Menus, View Actions, Palette):** Add commands to UI locations using `contributes.menus` in `package.json` (Define placements like `view/item/context`, `view/title`) and use `when` clauses for context-aware visibility. [P:2, E:2]
- [ ] **VSCode Extension Exploration - Decorations (Editor):** Apply visual styles in the editor using `vscode.window.createTextEditorDecorationType`, `TextEditor.setDecorations`. [P:3, E:2]
- [ ] **Webviews:** Create custom HTML/CSS/JS panels using `vscode.window.createWebviewPanel`. [P:3, E:3]
- [ ] **Status Bar Item:** Add item to status bar using `vscode.window.createStatusBarItem`, set properties. [P:3, E:1]
- [ ] **Configuration:** Add setting to customize the tone/wording of user prompts (e.g., the create TODO.md prompt). [P:3, E:1]
- [ ] **Configuration Settings:** Allow user customization via Settings UI. [P:2, E:2]
