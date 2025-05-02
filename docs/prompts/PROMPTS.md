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
