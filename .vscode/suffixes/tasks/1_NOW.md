## NOW

---

- [ ] **Logging:** Standardize logging format and levels (e.g., use vscode.LogOutputChannel). [P:2, E:2]

  - [x] Create `src/logger.ts` utility using `vscode.LogOutputChannel`.
  - [x] Refactor first log in `src/extension.ts` to use the new Logger.
  - [x] Refactor `deactivate` log in `src/extension.ts` to use new Logger.
  - [x] Refactor logs in `src/registerProviders.ts` to use new Logger.

- [x] **Documentation & Guidance:** Instruct users on setting up repo folders with Obsidian, including best practices for using Git (e.g., with the Obsidian Git plugin) for versioning and syncing the vault content. [P:3, E:1]

---

<!--













Modes below









-->

---

> **MODE: Execute.** Verify top `[ ]` task is refined (clear scope, P/E). Work the task. Focus on code implementation. **Action:** Review/QA the implementation. **Trigger:** When ready, move to `Stage & Clean`.
> **MODE: Stage & Clean.** Review code changes, run linters/formatters, remove temporary code/comments. Stage relevant _code_ files (`git add <code files>`). **Trigger:** When ready, move to `Mark Complete`.
> **MODE: Mark Complete.** Change `[ ]` to `[x]` for the task in this file. Log changes (e.g., in CHANGELOG.md, optional). **Trigger:** Move to `Stage Completion`.
> **MODE: Stage Completion.** Stage the updated `NOW.md` (`git add NOW.md`) and CHANGELOG.md (if changed). **Trigger:** Move to `Commit Staged Changes`.
> **MODE: Commit Staged Changes.** **Action:** Review final staged changes (`git diff --staged`). **Action:** Group related completed `[x]` tasks (if multiple). **Action:** Construct commit message(s). **Action:** Confirm readiness to commit with the user. **Action (on confirmation):** Commit (`git commit`). **Action (after successful commit):** Remove corresponding `[x]` task lines from this section. **Trigger:** After commit(s) and removal, check if `# NOW` needs replenishment (go to `MODE: Fill Next 3` in `READY.md`).

---
