# Changelog

All notable changes to the "Suffixes" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - YYYY-MM-DD

### Added

- Initial extension structure.
- Suffixes Activity Bar icon (`resources/suffixes.svg`) and View Container.
- Basic "Suffixes Explorer" Tree View (`suffixesTreeView`).
  - Displays placeholder file/folder structure.
  - Uses `ThemeIcon` for basic file/folder icons.
  - Shows full path as item description.
  - Sets `contextValue` ('file'/'folder') for items.
- Refresh command (`suffixes.refreshTree`) available in Command Palette.
- Refresh button added to the Suffixes Explorer view title bar.
