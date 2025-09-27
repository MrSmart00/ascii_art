import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { AVAILABLE_FONTS, getFontsByCategory } from '@/lib/fonts';
import { FontCategory } from '@/types';
import { ChevronDown } from 'lucide-react';

export function FontSelector() {
  const { settings, updateSettings } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<FontCategory>('all');
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'すべて' },
    { value: 'standard', label: 'スタンダード' },
    { value: 'block', label: 'ブロック' },
    { value: 'decorative', label: 'デコラティブ' },
    { value: 'script', label: 'スクリプト' },
  ] as const;

  const filteredFonts = getFontsByCategory(selectedCategory);
  const selectedFont = AVAILABLE_FONTS.find(font => font.name === settings.selectedFont);

  const handleFontSelect = (fontName: string) => {
    updateSettings({ selectedFont: fontName });
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* 選択されたフォント表示 */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-left
                   hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {selectedFont?.displayName || 'フォントを選択'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedFont?.category || ''}
              </div>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </button>

        {/* ドロップダウンメニュー */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                        rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredFonts.map((font) => (
              <button
                key={font.name}
                onClick={() => handleFontSelect(font.name)}
                className={`w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 
                          transition-colors border-b border-gray-200 dark:border-gray-600 last:border-b-0 ${
                  settings.selectedFont === font.name
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                <div className="font-medium">{font.displayName}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {font.category} • {font.name}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* プレビュー */}
      {selectedFont && (
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            プレビュー: {selectedFont.displayName}
          </div>
          <div className="font-mono text-xs text-gray-800 dark:text-gray-200 whitespace-pre overflow-x-auto">
            {selectedFont.preview}
          </div>
        </div>
      )}
    </div>
  );
}