import React from 'react';
import { useAppStore } from '@/store';
import { Settings as SettingsIcon, Sliders } from 'lucide-react';

export function Settings() {
  const { settings, updateSettings } = useAppStore();

  const layoutOptions = [
    { value: 'default', label: 'デフォルト' },
    { value: 'full', label: 'フル' },
    { value: 'fitted', label: 'フィット' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* 水平レイアウト */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          水平レイアウト
        </label>
        <select
          value={settings.horizontalLayout}
          onChange={(e) => updateSettings({ 
            horizontalLayout: e.target.value as 'default' | 'full' | 'fitted' 
          })}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {layoutOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 垂直レイアウト */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          垂直レイアウト
        </label>
        <select
          value={settings.verticalLayout}
          onChange={(e) => updateSettings({ 
            verticalLayout: e.target.value as 'default' | 'full' | 'fitted' 
          })}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {layoutOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 最大幅 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          最大幅: {settings.maxWidth} 文字
        </label>
        <input
          type="range"
          min="40"
          max="120"
          step="10"
          value={settings.maxWidth}
          onChange={(e) => updateSettings({ maxWidth: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                   slider:bg-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>40</span>
          <span>80</span>
          <span>120</span>
        </div>
      </div>

      {/* 空白文字での改行 */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            空白文字で改行
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            長いテキストを空白で自動改行
          </p>
        </div>
        <button
          onClick={() => updateSettings({ whitespaceBreak: !settings.whitespaceBreak })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.whitespaceBreak
              ? 'bg-blue-500'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.whitespaceBreak ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* 設定説明 */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p><strong>水平レイアウト:</strong> 文字の横方向の配置を調整</p>
        <p><strong>垂直レイアウト:</strong> 文字の縦方向の配置を調整</p>
        <p><strong>最大幅:</strong> 1行あたりの最大文字数を制限</p>
      </div>
    </div>
  );
}