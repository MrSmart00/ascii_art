import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { copyToClipboard, downloadAsText, countLines, countCharacters } from '@/lib/clipboard';
import { Copy, Download, Save, Eye, EyeOff } from 'lucide-react';

export function AsciiOutput() {
  const { outputArt, inputText, settings, saveToHistory } = useAppStore();
  const [showPreview, setShowPreview] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (outputArt) {
      const success = await copyToClipboard(outputArt);
      if (success) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    }
  };

  const handleDownload = () => {
    if (outputArt) {
      const filename = `ascii-art-${inputText.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.txt`;
      downloadAsText(outputArt, filename);
    }
  };

  const handleSaveToHistory = () => {
    saveToHistory();
  };

  const lineCount = countLines(outputArt);
  const charCount = countCharacters(outputArt);

  if (!outputArt) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">🎨</div>
          <p>アスキーアートがここに表示されます</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 統計情報 */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex gap-4">
          <span>{lineCount} 行</span>
          <span>{charCount} 文字</span>
          <span>フォント: {settings.selectedFont}</span>
        </div>
        
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? '非表示' : '表示'}
        </button>
      </div>

      {/* アスキーアート表示 */}
      {showPreview && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs 
                         font-mono leading-tight whitespace-pre border-2 border-gray-700
                         max-h-96 overflow-y-auto">
            {outputArt}
          </pre>
          
          {/* オーバーレイボタン */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all ${
                copySuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}
              title="クリップボードにコピー"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            copySuccess
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Copy className="w-4 h-4" />
          {copySuccess ? 'コピー完了!' : 'コピー'}
        </button>
        
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 
                   text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          ダウンロード
        </button>
        
        <button
          onClick={handleSaveToHistory}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 
                   text-white rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          履歴に保存
        </button>
      </div>

      {/* 使用方法のヒント */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>💡 ヒント: 生成されたアスキーアートは等幅フォントで表示することをお勧めします</p>
        <p>💡 SNSやメールで共有する際は、プレーンテキスト形式を使用してください</p>
      </div>
    </div>
  );
}