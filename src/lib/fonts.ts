import { FontInfo } from '@/types';
import { validateFont } from './ascii-art';

// 基本フォント定義（検証前）
const BASE_FONTS: FontInfo[] = [
  { name: 'Standard', category: 'standard', displayName: 'スタンダード', preview: 'ABC' },
  { name: 'Big', category: 'block', displayName: 'ビッグ', preview: 'ABC' },
  { name: 'Block', category: 'block', displayName: 'ブロック', preview: 'ABC' },
  { name: 'Bubble', category: 'decorative', displayName: 'バブル', preview: 'ABC' },
  { name: 'Digital', category: 'decorative', displayName: 'デジタル', preview: 'ABC' },
  { name: 'Graffiti', category: 'script', displayName: 'グラフィティ', preview: 'ABC' },
  { name: 'Ghost', category: 'decorative', displayName: 'ゴースト', preview: 'ABC' },
  { name: 'Speed', category: 'script', displayName: 'スピード', preview: 'ABC' },
  // 追加の安全なフォント
  { name: 'Banner', category: 'block', displayName: 'バナー', preview: 'ABC' },
  { name: 'Colossal', category: 'block', displayName: 'コロッサル', preview: 'ABC' },
  { name: 'Slant', category: 'script', displayName: 'スラント', preview: 'ABC' },
  { name: 'Small', category: 'standard', displayName: 'スモール', preview: 'ABC' },
];

// 利用可能フォント一覧（text-to-asciiライブラリ対応）
export const AVAILABLE_FONTS: FontInfo[] = BASE_FONTS.filter(font => {
  return validateFont(font.name);
});

// デフォルト設定
export const DEFAULT_FONT = 'Standard';
export const DEFAULT_HORIZONTAL_LAYOUT = 'default';
export const DEFAULT_VERTICAL_LAYOUT = 'default';
export const DEFAULT_MAX_WIDTH = 80;
export const DEFAULT_WHITESPACE_BREAK = true;
export const DEFAULT_THEME = 'light';

// フォント情報を取得
export function getFontInfo(fontName: string): FontInfo | undefined {
  return AVAILABLE_FONTS.find(font => font.name === fontName);
}

// カテゴリ別フォント取得
export function getFontsByCategory(category: string): FontInfo[] {
  if (category === 'all') {
    return AVAILABLE_FONTS;
  }
  return AVAILABLE_FONTS.filter(font => font.category === category);
}