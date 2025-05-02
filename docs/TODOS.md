# Suffixes Extension TODOs

## Current Initiative

> **Define the main goal/theme for this work cycle and link it to project objectives.** > _Example: Implement Core TODO File Scaffolding -> Improve new user onboarding_ > **Current:** [Your initiative description here]

<!-- QUICK IDEA INPUT: Add new raw ideas directly under the '# Refine' header below for quick capture and later triage. -->

# Task List Instruction Templates

- **Process Completed:** (Routine Check & Cleanup)

  - **Identify:** Systematically scan the `# Next 3` section line-by-line. Look specifically for the `[x]` marker indicating a task is finished.
  - **Log/Archive (Conditional):**
    - **Necessity Check:** Determine if logging is needed based on project standards (e.g., maintaining a `#CHANGELOG`), team communication protocols, or personal tracking habits.
    - **Detail Capture:** If logging, extract key information: the full task description, the date of completion, any associated issue numbers or pull requests, and brief notes on significant challenges, solutions, or learnings encountered.
    - **Location:** Add this information to the designated log file or tracking system _before_ modifying the `TODOS.md` file.
  - **Remove:** Carefully delete the entire line(s) for _each_ completed task from `# Next 3`. Ensure no remnants are left. The goal is a clean list showing only active or pending work for the immediate cycle.

- **Select Next:** (Strategic Planning for the Next Cycle)

  - **Review `# Ready`:** Read through all tasks currently residing in the `# Ready` list. Understand the scope and goal of each.
  - **Prioritization Factors:**
    - **P/E Scores:** Use `[P:X, E:Y]` as a primary filter. Lower 'P' (Priority) values mean higher importance. Lower 'E' (Effort) values suggest quicker wins. Balance these based on current goals (e.g., tackle a high-priority item even if effort is high, or clear several low-effort items).
    - **Dependencies:** Identify if any tasks in `# Ready` are blocked by others or are prerequisites for future work. Favor tasks that unblock others or follow a logical sequence.
    - **Context Switching Cost:** Consider grouping tasks that relate to similar parts of the codebase or require a similar mental context to minimize switching overhead.
    - **Energy/Time:** Align task selection with available time and mental energy. Pick smaller tasks for short work blocks, larger ones for focused sessions.
  - **Choose (Max 3):** Select a maximum of three tasks. This limit prevents over-commitment and maintains focus. Ensure chosen tasks are genuinely actionable and represent the best use of the upcoming work cycle.

- **Promote to Next:** (Transitioning Tasks to Active Work)

  - **Cut:** Select the entire line(s) for the chosen tasks in `# Ready` and use a 'cut' operation (Cmd/Ctrl+X) to remove them while copying them to the clipboard.
  - **Paste:** Navigate to the `# Next 3` section. Paste the cut lines typically at the end of the list, preserving the order they were selected in, if relevant. Verify they appear correctly formatted. `# Next 3` now reflects the immediate work queue.

- **Begin Work:** (Executing the Top Priority)

  - **Identify Focus:** Look at the tasks listed under `# Next 3`. Pinpoint the very first task in the list that still has an empty checkbox `[ ]`.
  - **Engage & Execute:**
    - **Understand:** Re-read the task description to ensure full clarity on the objective.
    - **Implement:** Begin the core work—coding, writing, designing, researching, etc.
    - **Single-Task Focus:** Dedicate your effort to completing _this specific task_. Actively resist the urge to jump to other tasks in `# Next 3` or `# Ready` unless the current task becomes blocked.
    - **Update Status (if blocked):** If progress halts due to external factors or dependencies, make a note directly on the task line (e.g., `[ ] Task Foo - BLOCKED pending API key`) and consider if you should switch to the _next_ available task in `# Next 3`.

- **Prepare Commit:** (Ensuring Code Quality and Clarity Before Saving)
  - **Review Diffs:**
    - **Tooling:** Use `git diff`, `git diff --staged`, or your IDE's built-in comparison tools.
    - **Scope:** Examine _all_ changes—additions, deletions, modifications—since the last commit. Ensure the changes directly relate to the completed task and don't include unrelated tweaks.
    - **Self-Correction:** Look for typos, logical errors, debugging leftovers (e.g., `console.log`s), or incomplete implementations.
  - **Clean Comments:**
    - **Redundancy Check:** Read each comment. If it merely repeats _what_ the adjacent code clearly does (e.g., `// Loop through items`), remove it. Code should be self-documenting where possible.
    - **Artifact Removal:** Delete any boilerplate comments, AI-generated placeholders (like `// TODO: Implement this`), or temporary notes that are no longer relevant.
  - **Retain/Add Rationale:**
    - **Preserve "Why":** Keep comments that explain the _reasoning_ behind non-obvious code, complex algorithms, design choices, or workarounds for specific issues. Link to relevant documentation or issue trackers if helpful (e.g., `// See issue #123 for context`).
    - **Add Clarity:** If reviewing the diff reveals code that is complex or potentially confusing to others (or your future self), add concise comments explaining the _intent_.
  - **Commit:**
    - **Stage:** Use `git add` to stage the cleaned-up files.
    - **Message:** Write a clear, concise commit message following project conventions (e.g., conventional commits). Reference the completed task if applicable.
    - **Execute:** Run `git commit`.

---

# Next 3

> **MODE: Execute.** Work the top `[ ]` task. When done: Mark `[x]`, Log (optional), Remove, Commit. **Trigger:** If this list is empty or blocked, go to `# Ready`. (Ref: Full Instructions)

- [ ] **Empty Project: Handle Dismissal:** Save dismissal choice to `context.workspaceState` using key `'suffixes.prompt.createTodoDismissed'`. [P:1, E:1]
- [ ] **Empty Project: Create Empty File:** Implement logic to create an _empty_ `.vscode/TODO.md` file (`workspace.fs.writeFile`). [P:1, E:1]

---

# Ready

> **MODE: Replenish `# Next 3`.** **Trigger:** When `# Next 3` has space. Select top 1-3 (P/E, sequence). Move them to `# Next 3`. **Trigger:** If this list is empty/low, go to `# Refine`. (Ref: Full Instructions)

- [ ] **Empty Project: Open Created File:** Open the newly created `.vscode/TODO.md` file for the user (`openTextDocument`, `showTextDocument`). [P:1, E:1]
- [ ] **Empty Project: Define Initial TODO Content:** Specify the (potentially empty) content for the initial file. [P:2, E:1]
- [ ] **Refactor: Update File References:** Audit code (HoverProvider, TreeView, etc.) and update any references to use the decided `.vscode/TODO.md` path. [P:2, E:1]
- [ ] **Empty Project: Update UI/Command States:** Adjust Tree View display and command availability based on file existence or user choice. [P:2, E:2]

---

# Refine

> **MODE: Prepare for `# Ready`.** **Trigger:** When `# Ready` needs items. Clarify tasks, break down, add P/E. Move defined tasks to `# Ready`. **Trigger:** If this list is empty/low, go to `# Backlog`. (Ref: Full Instructions)

- [ ] **Configuration:** Add setting to customize the tone/wording of user prompts (e.g., the create TODO.md prompt). [P:3, E:1]
- [ ] **Empty Project User Story:** Define the user experience and expected behavior when the extension is activated in a completely empty workspace. [P:1, E:1]
  - [ ] **Future Guidance Strategy:** Plan how to populate/guide the user _after_ the initial empty `.vscode/TODO.md` file is created.
  - [ ] **Documentation:** Document the scaffolding feature, including the default `.vscode/TODO.md` location.
- [ ] **Hover Provider Integration:** Implement `vscode.HoverProvider` to show contextual info (e.g., LLM prompts, file details) on hover within `TODOS.md`. [P:1, E:2]
  - [ ] **Clean up HoverProvider.ts** Some things in here can be extracted out.
  - [ ] **Command Links (continued):** Add actions (Mark Done, Open File, Copy) to hover. [P:2, E:2]
  - [ ] **CancellationToken** Explore `token: vscode.CancellationToken` and how it would be used
  - [ ] **LLM Prompt Integration:** Define convention & display linked prompts. [P:2, E:2]
  - [ ] **Define Task Format:**
  - [ ] **Parse Task Metadata:** Extract checkbox status, P/E tags, description. [P:1, E:1]
  - [ ] **Configuration:** Allow user to customize hover content. [P:2, E:1]
  - [ ] **Context from Related Files:** Show snippets/details of linked files. [P:3, E:3]
  - [ ] **(don't understand purpose yet) File/Symbol Linking:** Detect and link file paths/symbols in descriptions. [P:2, E:2]
- [ ] **Logging:** Standardize logging format and levels (e.g., use vscode.LogOutputChannel). [P:2, E:2]
- [ ] **TODOS.md Standardization:** Define and apply a consistent format/structure for this file, potentially leveraging CodeLens/Hovers. [P:2, E:2]
- [ ] **Suffix Logic Integration:** Connect TreeDataProvider to suffix detection logic. [P:3, E:2]
- [ ] **CodeLens Integration - 2:** Logging when `/docs/TODOS.md# Next Steps` clicked added, explore next steps
- [ ] **VIEW_IDS** Find a place for this.
- [ ] **Clean up registerCommands** Some things in here can be extracted out.
- [ ] **Rename extension** to something a little less specific to the "suffixes" concept.

---

# Backlog

> **MODE: Capture Ideas.** Add raw thoughts/low-priority items. **Trigger:** Periodically review; promote viable tasks to `# Refine`.

- [ ] **VSCode Extension Exploration - Menus (Context Menus, View Actions, Palette):** Add commands to UI locations using `contributes.menus` in `package.json` (Define placements like `view/item/context`, `view/title`) and use `when` clauses for context-aware visibility. [P:2, E:2]
- [ ] **VSCode Extension Exploration - Decorations (Editor):** Apply visual styles in the editor using `vscode.window.createTextEditorDecorationType`, `TextEditor.setDecorations`. [P:3, E:2]
- [ ] **Webviews:** Create custom HTML/CSS/JS panels using `vscode.window.createWebviewPanel`. [P:3, E:3]
- [ ] **Status Bar Item:** Add item to status bar using `vscode.window.createStatusBarItem`, set properties. [P:3, E:1]
- [ ] **Configuration Settings:** Allow user customization via Settings UI. [P:2, E:2]
  - [ ] `

---
