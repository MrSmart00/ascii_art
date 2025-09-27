// アスキーアート変換オプション
export interface AsciiArtOptions {
  font: string;
  horizontalLayout?: 'default' | 'full' | 'fitted';
  verticalLayout?: 'default' | 'full' | 'fitted';
  width?: number;
  whitespaceBreak?: boolean;
}

// アスキーアート変換結果
export interface AsciiArtResult {
  text: string;
  success: boolean;
  error?: string;
}

// フォント情報
export interface FontInfo {
  name: string;
  displayName: string;
  category: 'standard' | 'decorative' | 'block' | 'script';
  preview: string;
}

// ユーザー設定
export interface UserSettings {
  selectedFont: string;
  horizontalLayout: 'default' | 'full' | 'fitted';
  verticalLayout: 'default' | 'full' | 'fitted';
  maxWidth: number;
  whitespaceBreak: boolean;
  theme: 'light' | 'dark';
}

// 最近の入力履歴
export interface RecentInput {
  id: string;
  inputText: string;
  outputArt: string;
  fontUsed: string;
  createdAt: number;
}

export type RecentInputs = RecentInput[];

// フォントカテゴリ
export type FontCategory = 'all' | 'standard' | 'decorative' | 'block' | 'script';