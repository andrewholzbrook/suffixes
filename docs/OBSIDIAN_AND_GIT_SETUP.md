# Using Obsidian with Your Project Tasks & Git

This guide explains how to use Obsidian alongside this project's Markdown-based task files (located in `.vscode/suffixes/tasks/`) and leverage Git for versioning and syncing. This allows you to benefit from both the VS Code extension's task management features and Obsidian's powerful note-taking and knowledge management capabilities on the same set of files.

## Prerequisites

- **Obsidian Installed:** Download and install from [obsidian.md](https://obsidian.md).
- **Git Installed:** Ensure Git is installed on your system.
- **Project Cloned:** You should have this project repository cloned to your local machine.

## Setting Up Obsidian

1.  **Open Your Project as a Vault (or part of one):**

    - Launch Obsidian.
    - Choose "Open folder as vault."
    - Navigate to and select the root folder of this project repository, or a specific subfolder if you prefer (e.g., if you create a dedicated `/notes` or `/docs` folder alongside `.vscode/suffixes/tasks/`).
    - **Note:** The core task files managed by the VS Code extension are in `.vscode/suffixes/tasks/`. Ensure this path is accessible within the folder you open as your vault.

2.  **Explore Your Files:**
    - Obsidian will now index the Markdown files in the selected folder. You'll be able to open, edit, and link your task files and any other notes.

## Using Git with Obsidian

Synchronizing your Obsidian vault (which is just a folder of files) with a remote Git repository (like GitHub) ensures your data is backed up and accessible across multiple machines.

### Method 1: Manual Git Workflow (Universal)

- **Process:** After making changes in Obsidian, or before starting a session, use your standard Git workflow from the command line or VS Code's Git interface:
  1.  `git pull` (to get the latest changes, especially important if you use multiple machines or collaborate).
  2.  `git add .` (or add specific files).
  3.  `git commit -m "Your descriptive commit message"`
  4.  `git push`
- **Pros:** Full control, uses familiar Git tools.
- **Cons:** Requires manual steps.

### Method 2: Obsidian Git Community Plugin (Recommended for Convenience)

The "Obsidian Git" community plugin automates most of the Git operations from within Obsidian.

1.  **Installation:**

    - In Obsidian, go to `Settings` > `Community plugins`.
    - Turn off "Safe mode" if it's on.
    - Click `Browse` and search for "Obsidian Git".
    - Click `Install`, then `Enable`.

2.  **Configuration (Basic):**

    - Open the settings for the "Obsidian Git" plugin.
    - **Commit author/email:** Configure if not already set globally in your Git config.
    - **Automatic Operations (Optional but Recommended):**
      - Set an interval for `Auto Backup` (commits and pushes changes periodically).
      - Enable `Pull updates on startup` to automatically fetch changes when Obsidian opens.
    - **Manual Controls:** The plugin also adds commands to the command palette (Ctrl/Cmd+P) for manual pull, push, commit, etc.

3.  **Usage:**
    - The plugin will handle most syncing in the background if configured for auto operations.
    - You can also trigger Git actions manually via the command palette or by configuring hotkeys in the plugin settings.

## Best Practices

- **Commit Frequently:** Whether manually or via the plugin, commit your changes often from both VS Code (after the extension modifies task files) and Obsidian.
- **Pull Before Working:** Always ensure you have the latest changes by pulling before starting a significant work session in either VS Code or Obsidian, especially if you switch between machines.
- **Merge Conflicts:** Git handles merge conflicts. If you edit the same line in the same file on two different machines without syncing, you might encounter a conflict. Git's standard conflict resolution markers will appear in the files.
- **`.gitignore` and the `.obsidian` folder:**
  - The `.obsidian` folder in your vault root contains workspace-specific settings, plugin configurations, themes, etc.
  - Decide if you want to commit this folder.
    - **For solo use:** Committing it is usually fine and syncs your Obsidian setup.
    - **For team collaboration:** You might want to add parts of `.obsidian/` (like `workspace.json` which stores per-user UI state) to your project's `.gitignore` file to avoid conflicts with other users' personal Obsidian layouts. Shared configurations like plugin settings might be committed.
- **Task File Integrity:** Be mindful that the VS Code extension relies on a specific format for task lines (especially the HTML comment block for properties). While Obsidian is great for adding content around these tasks, avoid manually altering the structure of the property comments unless you understand how the extension parses them.

## Leveraging the Setup

With this setup:

- Your task files in `.vscode/suffixes/tasks/` become a single source of truth.
- Use the **VS Code extension** for its dedicated task management features (CodeLenses, hovers, commands, future dashboard).
- Use **Obsidian** for its strengths in:
  - Rich text editing and note-taking around your tasks.
  - Creating links between tasks and other project documentation or research notes.
  - Visualizing connections with the graph view.
  - Utilizing other Obsidian plugins (e.g., Dataview for querying tasks if your format becomes compatible, diagramming tools).

This combination allows for a flexible and powerful workflow, keeping your tasks and related knowledge organized, version-controlled, and synced.
