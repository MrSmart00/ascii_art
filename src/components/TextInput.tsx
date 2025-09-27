import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { Type, RotateCcw, Zap, AlertCircle } from 'lucide-react';

export function TextInput() {
  const { inputText, setInputText, generateArt, isLoading } = useAppStore();
  const [validationError, setValidationError] = useState<string>('');

  const validateEnglishOnly = (text: string): boolean => {
    // 英語文字（A-Z、a-z）、数字（0-9）、基本的な句読点、スペースを許可
    const englishOnlyRegex = /^[A-Za-z0-9!?.,;:\-'"()\s]*$/;
    return englishOnlyRegex.test(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    
    // 常に入力を許可し、テキストを更新
    setInputText(newText);
    
    // バリデーションチェックして警告のみ表示
    if (!validateEnglishOnly(newText) && newText.trim() !== '') {
      setValidationError('推奨: 英語文字（A-Z、a-z）、数字（0-9）、基本的な句読点のみ使用してください');
    } else {
      setValidationError('');
    }
  };

  const handleClear = () => {
    setInputText('');
    setValidationError('');
  };

  const handleSampleText = () => {
    setInputText('HELLO WORLD');
    setValidationError('');
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
          onChange={handleInputChange}
          placeholder="テキストを入力してください (推奨: 英語文字、数字、基本的な句読点)..."
          className={`w-full h-32 p-3 border rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:ring-2 focus:border-transparent
                   resize-none transition-colors ${
                     validationError 
                       ? 'border-red-500 dark:border-red-400 focus:ring-red-500' 
                       : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                   }`}
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
      
      {validationError && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span>{validationError}</span>
        </div>
      )}
      
      <div className="text-xs text-gray-600 dark:text-gray-400">
        <p>💡 ヒント: 英語文字（A-Z、a-z）、数字（0-9）、基本的な句読点の使用を推奨</p>
        <p>💡 短いテキストほど美しく表示されます</p>
      </div>
    </div>
  );
}