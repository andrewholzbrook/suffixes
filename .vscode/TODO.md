# Suffixes Extension TODOs

## Current Initiative

> **Define the main goal/theme for this work cycle and link it to project objectives.** > _Example: Implement Core TODO File Scaffolding -> Improve new user onboarding_ > **Current:** [Your initiative description here]

<!-- QUICK IDEA INPUT: Add new raw ideas directly under the '# Refine' header below for quick capture and later triage. -->

---

## Next 3

> **MODE: Execute.** Verify top `[ ]` task is refined (clear scope, P/E). Work the task. Focus on code implementation. **Action:** Review/QA the implementation. **Trigger:** When ready, move to `Stage & Clean`.
> **MODE: Stage & Clean.** Review code changes, run linters/formatters, remove temporary code/comments. Stage relevant _code_ files (`git add <code files>`). **Trigger:** When ready, move to `Mark Complete`.
> **MODE: Mark Complete.** Change `[ ]` to `[x]` for the task in TODO.md. Log changes (e.g., in CHANGELOG.md, optional). **Trigger:** Move to `Stage Completion`.
> **MODE: Stage Completion.** Stage the updated TODO.md (`git add TODO.md`) and CHANGELOG.md (if changed). **Trigger:** If more `[ ]` tasks exist in `# Next 3`, return to `Execute`. **Trigger:** If no more `[ ]` tasks, or ready to bundle changes, move to `Commit Staged Changes`.
> **MODE: Commit Staged Changes.** **Action:** Review final staged changes (`git diff --staged`). **Action:** Group related completed `[x]` tasks (if multiple). **Action:** Construct commit message(s). **Action:** Confirm readiness to commit with the user. **Action (on confirmation):** Commit (`git commit`). **Action (after successful commit):** Remove corresponding `[x]` task lines from this section. **Trigger:** After commit(s) and removal, check if `# Next 3` needs replenishment (go to `# Ready`).

---

## Ready

> **MODE: Initiate Refinement.** **Trigger:** When `# Next 3` needs items (empty/low) AND this list is not empty. **Action:** Select the top task from this list. Go to `# Refine` mode to process _only this task_. **Trigger:** If this list is empty when checked, go to `# Refine` (to process backlog/new ideas). (Ref: Full Instructions)

- [ ] **Empty Project: Update UI/Command States:** Adjust Tree View display and command availability based on file existence or user choice. [P:2, E:2]
- [ ] **Lint & Fix:** Run linter and fix the issues. It's okay for some of the items to be fixed with lint comments if it's obviously a thing we'll build upon later.

---

## Refine

> **MODE: Refine Task.** **Trigger:** Activated by `# Ready` (for a specific task) or by other modes needing task preparation. **Action (Specific Task):** Review description, P/E. Ask user: "Does this need clarification or breakdown?". If yes, collaborate. If no, confirm readiness. **Stop after processing.** **Action (General):** Review/process list items for `# Ready`. **Output:** Refined task(s) stay here or move to `# Ready`. **Trigger:** If list empty/low, check `# Backlog`. (Ref: Full Instructions)

- [ ] **Code Lens - Prompt Copy to Clipboard**
- [ ] **Audit Log Prefixes** Not all logs are using the same prefix
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
- [ ] **AppName Wrangling** Find all instances of current app name "suffixes", veryify it's being used as the app name, make it a const
- [ ] Split apart command registration into granular registrations, one per file, files in their domain
- [ ] Move `/src/codeLens/` and `/src/hover/` stuff dealing direction with the TODO.md file into the `/todoFile/` dir.

---

## Backlog

> **MODE: Capture Ideas.** Add raw thoughts/low-priority items. **Trigger:** Periodically review; promote viable tasks to `# Refine`.

- [ ] **VSCode Extension Exploration - Menus (Context Menus, View Actions, Palette):** Add commands to UI locations using `contributes.menus` in `package.json` (Define placements like `
