export const workspace = {
  rootPath: '/test/workspace',
  getConfiguration: () => ({}),
  findFiles: async () => [
    { fsPath: '/test/workspace/file1.ts' },
    { fsPath: '/test/workspace/file2.ts' },
    { fsPath: '/test/workspace/file3.ts' },
  ],
};

export const commands = {
  registerCommand: () => ({ dispose: () => {} }),
};

export const window = {
  showErrorMessage: () => {},
  showInformationMessage: () => {},
};

export const StatusBarAlignment = {
  Left: 1,
  Right: 2,
};

export const Uri = {
  file: (path: string) => ({ fsPath: path }),
};
