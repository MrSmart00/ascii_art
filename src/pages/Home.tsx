import React, { useEffect } from 'react';
import { useAppStore } from '@/store';
import { TextInput } from '@/components/TextInput';
import { FontSelector } from '@/components/FontSelector';
import { AsciiOutput } from '@/components/AsciiOutput';
import { RecentHistory } from '@/components/RecentHistory';
import { Settings } from '@/components/Settings';
import { Loader2 } from 'lucide-react';

export function Home() {
  const {
    inputText,
    outputArt,
    isLoading,
    error,
    loadRecentInputs,
    clearError,
  } = useAppStore();

  useEffect(() => {
    loadRecentInputs();
  }, [loadRecentInputs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            ASCII Art Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            テキストを美しいアスキーアートに変換しましょう。様々なフォントスタイルから選択できます。
          </p>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側: 入力エリア */}
          <div className="lg:col-span-1 space-y-6">
            {/* テキスト入力 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                テキスト入力
              </h2>
              <TextInput />
            </div>

            {/* フォント選択 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                フォント選択
              </h2>
              <FontSelector />
            </div>

            {/* 設定 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                設定
              </h2>
              <Settings />
            </div>
          </div>

          {/* 中央: 出力エリア */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  アスキーアート結果
                </h2>
                {isLoading && (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                )}
              </div>
              
              <AsciiOutput />
              
              {!inputText && !outputArt && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <p className="text-lg mb-2">テキストを入力してください</p>
                  <p className="text-sm">リアルタイムでアスキーアートが生成されます</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 履歴セクション */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              最近の履歴
            </h2>
            <RecentHistory />
          </div>
        </div>
      </div>
    </div>
  );
}