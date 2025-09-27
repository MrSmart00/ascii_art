import { UserSettings, RecentInput, RecentInputs } from '@/types';
import {
  DEFAULT_FONT,
  DEFAULT_HORIZONTAL_LAYOUT,
  DEFAULT_VERTICAL_LAYOUT,
  DEFAULT_MAX_WIDTH,
  DEFAULT_WHITESPACE_BREAK,
  DEFAULT_THEME,
} from './fonts';

const SETTINGS_KEY = 'ascii-art-settings';
const HISTORY_KEY = 'ascii-art-history';
const MAX_HISTORY_ITEMS = 10;

// デフォルト設定
const DEFAULT_SETTINGS: UserSettings = {
  selectedFont: DEFAULT_FONT,
  horizontalLayout: DEFAULT_HORIZONTAL_LAYOUT as 'default',
  verticalLayout: DEFAULT_VERTICAL_LAYOUT as 'default',
  maxWidth: DEFAULT_MAX_WIDTH,
  whitespaceBreak: DEFAULT_WHITESPACE_BREAK,
  theme: DEFAULT_THEME as 'light',
};

// ユーザー設定の取得
export function getUserSettings(): UserSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load user settings:', error);
  }
  return DEFAULT_SETTINGS;
}

// ユーザー設定の保存
export function saveUserSettings(settings: Partial<UserSettings>): void {
  try {
    const current = getUserSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save user settings:', error);
  }
}

// 履歴の取得
export function getRecentInputs(): RecentInputs {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.warn('Failed to load recent inputs:', error);
  }
  return [];
}

// 履歴に追加
export function addRecentInput(input: Omit<RecentInput, 'id' | 'createdAt'>): void {
  try {
    const current = getRecentInputs();
    const newInput: RecentInput = {
      ...input,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    
    // 同じ入力テキストがある場合は削除
    const filtered = current.filter(item => item.inputText !== input.inputText);
    
    // 新しい入力を先頭に追加
    const updated = [newInput, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save recent input:', error);
  }
}

// 履歴をクリア
export function clearRecentInputs(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn('Failed to clear recent inputs:', error);
  }
}

// 特定の履歴項目を削除
export function removeRecentInput(id: string): void {
  try {
    const current = getRecentInputs();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to remove recent input:', error);
  }
}