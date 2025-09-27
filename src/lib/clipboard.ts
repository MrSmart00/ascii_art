// クリップボードにテキストをコピー
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // フォールバック: 古いブラウザ対応
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.warn('Failed to copy to clipboard:', error);
    return false;
  }
}

// テキストファイルとしてダウンロード
export function downloadAsText(content: string, filename: string = 'ascii-art.txt'): void {
  try {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.warn('Failed to download file:', error);
  }
}

// 文字数をカウント（改行も含む）
export function countCharacters(text: string): number {
  if (!text) return 0;
  return text.length;
}

// 行数をカウント
export function countLines(text: string): number {
  if (!text) return 0;
  return text.split('\n').length;
}

// テキストが空かどうかチェック
export function isEmpty(text: string): boolean {
  return !text || text.trim().length === 0;
}