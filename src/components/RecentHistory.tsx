import React from 'react';
import { useAppStore } from '@/store';
import { copyToClipboard } from '@/lib/clipboard';
import { Clock, Copy, Trash2, RotateCcw } from 'lucide-react';
import { removeRecentInput, clearRecentInputs } from '@/lib/storage';

export function RecentHistory() {
  const { recentInputs, setInputText, loadRecentInputs, updateSettings } = useAppStore();

  const handleUseInput = (inputText: string, fontUsed: string) => {
    setInputText(inputText);
    updateSettings({ selectedFont: fontUsed });
  };

  const handleCopyOutput = async (outputArt: string) => {
    await copyToClipboard(outputArt);
  };

  const handleRemoveItem = (id: string) => {
    removeRecentInput(id);
    loadRecentInputs();
  };

  const handleClearAll = () => {
    if (confirm('すべての履歴を削除しますか？')) {
      clearRecentInputs();
      loadRecentInputs();
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'たった今';
    if (diffMins < 60) return `${diffMins}分前`;
    if (diffHours < 24) return `${diffHours}時間前`;
    if (diffDays < 7) return `${diffDays}日前`;
    
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (recentInputs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-lg mb-1">履歴はまだありません</p>
        <p className="text-sm">アスキーアートを生成すると、ここに履歴が表示されます</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Clock className="w-5 h-5" />
          <span className="text-sm">{recentInputs.length} 件の履歴</span>
        </div>
        
        {recentInputs.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 
                     hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            すべて削除
          </button>
        )}
      </div>

      {/* 履歴リスト */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {recentInputs.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 
                     hover:border-blue-300 dark:hover:border-blue-600 transition-colors
                     bg-gray-50 dark:bg-gray-700/50"
          >
            {/* ヘッダー */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                  "{item.inputText}"
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{item.fontUsed}</span>
                  <span>•</span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>
              
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="削除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* プレビュー */}
            <div className="mb-3">
              <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs font-mono 
                           overflow-x-auto max-h-20 overflow-y-hidden leading-tight">
                {item.outputArt.split('\n').slice(0, 3).join('\n')}
                {item.outputArt.split('\n').length > 3 && '\n...'}
              </pre>
            </div>

            {/* アクションボタン */}
            <div className="flex gap-2">
              <button
                onClick={() => handleUseInput(item.inputText, item.fontUsed)}
                className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 
                         text-white rounded transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                再利用
              </button>
              
              <button
                onClick={() => handleCopyOutput(item.outputArt)}
                className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-500 hover:bg-gray-600 
                         text-white rounded transition-colors"
              >
                <Copy className="w-3 h-3" />
                コピー
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}