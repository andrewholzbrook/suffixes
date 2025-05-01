interface TemplateData {
  files: Array<{
    path: string;
    content: string;
  }>;
  favoritePrefixes: string[];
}

export function getInFileTemplate(data: TemplateData): string {
  const { files, favoritePrefixes } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'vscode-input-border': 'var(--vscode-input-border)',
                  'vscode-input-background': 'var(--vscode-input-background)',
                  'vscode-input-foreground': 'var(--vscode-input-foreground)',
                  'vscode-panel-border': 'var(--vscode-panel-border)',
                  'vscode-panel-background': 'var(--vscode-panel-background)',
                  'vscode-list-hoverBackground': 'var(--vscode-list-hoverBackground)',
                  'vscode-gitDecoration-addedResourceForeground': 'var(--vscode-gitDecoration-addedResourceForeground)',
                  'vscode-textLink-foreground': 'var(--vscode-textLink-foreground)',
                  'vscode-editor-background': 'var(--vscode-editor-background)',
                  'vscode-editor-foreground': 'var(--vscode-editor-foreground)',
                }
              }
            }
          }
        </script>
      </head>
      <body class="bg-vscode-panel-background p-4">
        <input 
          type="text" 
          class="w-full p-2 mb-4 border border-vscode-input-border bg-vscode-input-background text-vscode-input-foreground rounded"
          placeholder="Search files..." 
          oninput="this.nextElementSibling.querySelectorAll('.file-card').forEach(card => {
            const query = this.value.toLowerCase();
            const fileName = card.querySelector('.file-path').textContent.toLowerCase();
            const fileContent = card.querySelector('.file-content').textContent.toLowerCase();
            card.style.display = fileName.includes(query) || fileContent.includes(query) ? 'block' : 'none';
          })"
        >
        <div class="space-y-2">
          ${files
            .map((file) => {
              const isFavorite = favoritePrefixes.some((prefix) => file.path.startsWith(prefix));
              return `
              <div class="file-card border border-vscode-panel-border p-2 rounded hover:bg-vscode-list-hoverBackground ${
                isFavorite ? 'border-l-4 border-l-vscode-gitDecoration-addedResourceForeground' : ''
              }">
                <div 
                  class="file-path font-bold mb-1 text-vscode-textLink-foreground underline cursor-pointer"
                  onclick="vscode.postMessage({ command: 'openFile', filePath: '${file.path}' })"
                  title="Click to open file"
                >
                  ${file.path}
                </div>
                <div class="file-content font-mono text-sm whitespace-pre overflow-x-auto bg-vscode-editor-background text-vscode-editor-foreground p-2 rounded border border-vscode-panel-border">
                  ${file.content}
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </body>
    </html>
  `;
}
