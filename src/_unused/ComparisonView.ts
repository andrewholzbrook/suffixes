import { log } from '../logging/log';
import { createComparisonWebviewPanel } from './createComparisonWebviewPanel';
import { getWorkspaceFolders } from './getWorkspaceFolders';
import { openTextDocument } from './openTextDocument';
import { showErrorMessage } from './showErrorMessage';
import { TextDocument } from './TextDocument';
import { Uri } from './Uri';
import { ViewColumn } from './ViewColumn';
import { WebviewPanel } from './WebviewPanel';

interface ComparisonData {
  original: {
    content: string;
    path: string;
  };
  modified: {
    content: string;
    path: string;
  };
  similarities: {
    line: number;
    similarity: number;
    wordMatches: Array<{
      start: number;
      end: number;
      similarity: number;
    }>;
  }[];
}

export class ComparisonView {
  private panel: WebviewPanel | undefined;

  constructor() {}

  public async showComparison(originalUri: Uri, modifiedUri: Uri) {
    try {
      const [originalDoc, modifiedDoc] = await Promise.all([
        openTextDocument(originalUri, getWorkspaceFolders()),
        openTextDocument(modifiedUri, getWorkspaceFolders()),
      ]);

      const data: ComparisonData = {
        original: {
          content: originalDoc.getText(),
          path: originalUri.fsPath,
        },
        modified: {
          content: modifiedDoc.getText(),
          path: modifiedUri.fsPath,
        },
        similarities: this.calculateSimilarities(originalDoc, modifiedDoc),
      };

      if (this.panel) {
        this.panel.reveal(ViewColumn.Beside);
      } else {
        this.panel = createComparisonWebviewPanel(originalUri, modifiedUri);
      }

      if (this.panel) {
        this.panel.webview.html = this.getWebviewContent(data);
      }
    } catch (error) {
      log(`Error showing comparison: ${error}`);
      showErrorMessage();
    }
  }

  private calculateSimilarities(originalDoc: TextDocument, modifiedDoc: TextDocument) {
    const similarities: ComparisonData['similarities'] = [];
    const originalLines = originalDoc.getText().split('\n');
    const modifiedLines = modifiedDoc.getText().split('\n');

    for (let i = 0; i < Math.max(originalLines.length, modifiedLines.length); i++) {
      const originalLine = originalLines[i] || '';
      const modifiedLine = modifiedLines[i] || '';

      const lineSimilarity = this.calculateLineSimilarity(originalLine, modifiedLine);
      const wordMatches = this.findWordMatches(originalLine, modifiedLine);

      similarities.push({
        line: i,
        similarity: lineSimilarity,
        wordMatches,
      });
    }

    return similarities;
  }

  private calculateLineSimilarity(line1: string, line2: string): number {
    // Simple similarity calculation - can be improved
    const words1 = line1.split(/\s+/);
    const words2 = line2.split(/\s+/);
    const commonWords = words1.filter((word) => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  private findWordMatches(line1: string, line2: string) {
    const matches: Array<{ start: number; end: number; similarity: number }> = [];
    const words1 = line1.split(/\s+/);
    const words2 = line2.split(/\s+/);

    for (let i = 0; i < words1.length; i++) {
      const word1 = words1[i];
      const start = line1.indexOf(word1);
      const end = start + word1.length;

      // Find best matching word in line2
      let bestMatch = 0;
      for (const word2 of words2) {
        const similarity = this.calculateWordSimilarity(word1, word2);
        bestMatch = Math.max(bestMatch, similarity);
      }

      if (bestMatch > 0.3) {
        // Only show matches with >30% similarity
        matches.push({ start, end, similarity: bestMatch });
      }
    }

    return matches;
  }

  private calculateWordSimilarity(word1: string, word2: string): number {
    // Simple word similarity - can be improved
    const commonChars = word1.split('').filter((char) => word2.includes(char)).length;
    return commonChars / Math.max(word1.length, word2.length);
  }

  private getWebviewContent(data: ComparisonData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            .container {
              display: flex;
              height: 100vh;
              font-family: var(--vscode-font-family);
            }
            .editor {
              flex: 1;
              padding: 16px;
              overflow: auto;
              white-space: pre;
              font-family: var(--vscode-editor-font-family);
              font-size: var(--vscode-editor-font-size);
              line-height: var(--vscode-editor-line-height);
            }
            .line {
              position: relative;
              padding: 2px 0;
            }
            .similarity-marker {
              position: absolute;
              left: 0;
              right: 0;
              height: 100%;
              opacity: 0.2;
              pointer-events: none;
            }
            .word-match {
              position: relative;
              display: inline-block;
            }
            .word-match::after {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              bottom: 2px;
              height: 2px;
              opacity: 0.5;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="editor" id="original">
              ${this.renderEditorContent(data.original.content, data.similarities)}
            </div>
            <div class="editor" id="modified">
              ${this.renderEditorContent(data.modified.content, data.similarities)}
            </div>
          </div>
          <script>
            function updateSimilarityMarkers() {
              const similarities = ${JSON.stringify(data.similarities)};
              const originalEditor = document.getElementById('original');
              const modifiedEditor = document.getElementById('modified');

              similarities.forEach(({line, similarity, wordMatches}) => {
                const originalLine = originalEditor.children[line];
                const modifiedLine = modifiedEditor.children[line];

                if (originalLine && modifiedLine) {
                  // Add line similarity background
                  const originalMarker = document.createElement('div');
                  originalMarker.className = 'similarity-marker';
                  originalMarker.style.backgroundColor = \`hsl(120, 100%, \${similarity * 50}%)\`;
                  originalLine.appendChild(originalMarker);

                  const modifiedMarker = document.createElement('div');
                  modifiedMarker.className = 'similarity-marker';
                  modifiedMarker.style.backgroundColor = \`hsl(120, 100%, \${similarity * 50}%)\`;
                  modifiedLine.appendChild(modifiedMarker);

                  // Add word matches
                  wordMatches.forEach(match => {
                    const originalText = originalLine.textContent;
                    const modifiedText = modifiedLine.textContent;
                    
                    if (originalText && modifiedText) {
                      const word = originalText.substring(match.start, match.end);
                      const wordSpan = document.createElement('span');
                      wordSpan.className = 'word-match';
                      wordSpan.style.setProperty('--similarity', match.similarity);
                      wordSpan.textContent = word;
                      
                      originalLine.innerHTML = originalLine.innerHTML.replace(
                        word,
                        wordSpan.outerHTML
                      );
                    }
                  });
                }
              });
            }

            updateSimilarityMarkers();
          </script>
        </body>
      </html>
    `;
  }

  private renderEditorContent(
    content: string,
    similarities: ComparisonData['similarities']
  ): string {
    return content
      .split('\n')
      .map((line, i) => {
        const similarity = similarities[i]?.similarity || 0;
        return `<div class="line" data-line="${i}" data-similarity="${similarity}">${line}</div>`;
      })
      .join('\n');
  }
}
