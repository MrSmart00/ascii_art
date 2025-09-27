import React from 'react';
import { useAppStore } from '@/store';
import { Type, RotateCcw, Zap } from 'lucide-react';

export function TextInput() {
  const { inputText, setInputText, generateArt, isLoading } = useAppStore();

  const handleClear = () => {
    setInputText('');
  };

  const handleSampleText = () => {
    setInputText('HELLO WORLD');
  };

  const handleGenerate = () => {
    console.log('Generate button clicked');
    console.log('Current inputText:', inputText);
    generateArt();
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="ここにテキストを入力してください..."
          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   resize-none transition-colors"
          maxLength={100}
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
          {inputText.length}/100
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={!inputText.trim() || isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-blue-500 
                   hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all 
                   disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
        >
          <Zap className="w-4 h-4" />
          {isLoading ? '生成中...' : 'アスキーアート生成'}
        </button>
        
        <button
          onClick={handleSampleText}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 
                   text-white rounded-lg transition-colors"
        >
          <Type className="w-4 h-4" />
          サンプル
        </button>
        
        <button
          onClick={handleClear}
          disabled={!inputText}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-500 hover:bg-gray-600 
                   text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" />
          クリア
        </button>
      </div>
      
      <div className="text-xs text-gray-600 dark:text-gray-400">
        <p>💡 ヒント: 英数字と記号が最適です</p>
        <p>💡 短いテキストほど美しく表示されます</p>
      </div>
    </div>
  );
}