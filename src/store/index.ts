import { create } from 'zustand';
import { UserSettings, RecentInputs, AsciiArtOptions } from '@/types';
import { getUserSettings, saveUserSettings, getRecentInputs, addRecentInput } from '@/lib/storage';
import { generateAsciiArt } from '@/lib/ascii-art';
import { DEFAULT_FONT } from '@/lib/fonts';

interface AppState {
  // UI状態
  isLoading: boolean;
  error: string | null;
  
  // ユーザー設定
  settings: UserSettings;
  
  // 入力とアウトプット
  inputText: string;
  outputArt: string;
  
  // 履歴
  recentInputs: RecentInputs;
  
  // アクション
  setInputText: (text: string) => void;
  setOutputArt: (art: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  generateArt: () => Promise<void>;
  loadRecentInputs: () => void;
  saveToHistory: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // 初期状態
  isLoading: false,
  error: null,
  settings: getUserSettings(),
  inputText: '',
  outputArt: '',
  recentInputs: [],
  
  // アクション
  setInputText: (text: string) => {
    set({ inputText: text });
  },
  
  setOutputArt: (art: string) => set({ outputArt: art }),
  
  updateSettings: (newSettings: Partial<UserSettings>) => {
    const currentSettings = get().settings;
    const updatedSettings = { ...currentSettings, ...newSettings };
    set({ settings: updatedSettings });
    saveUserSettings(updatedSettings);
    
    // 設定変更時にアートを再生成
    const { generateArt } = get();
    generateArt();
  },
  
  generateArt: async () => {
    console.log('generateArt function called');
    const { inputText, settings } = get();
    console.log('Current state:', { inputText, settings });
    
    if (!inputText.trim()) {
      console.log('Input text is empty, clearing output');
      set({ outputArt: '', isLoading: false, error: null });
      return;
    }
    
    console.log('Setting loading state to true');
    set({ isLoading: true, error: null });
    
    try {
      const options: AsciiArtOptions = {
        font: settings.selectedFont,
        horizontalLayout: settings.horizontalLayout,
        verticalLayout: settings.verticalLayout,
        width: settings.maxWidth,
        whitespaceBreak: settings.whitespaceBreak,
      };
      
      console.log('Calling generateAsciiArt with options:', options);
      const result = await generateAsciiArt(inputText, options);
      console.log('generateAsciiArt result:', result);
      
      if (result.success) {
        console.log('Setting output art:', result.text);
        set({ outputArt: result.text, isLoading: false });
      } else {
        console.log('Generation failed:', result.error);
        set({ 
          outputArt: '', 
          isLoading: false, 
          error: result.error || 'アスキーアート生成に失敗しました' 
        });
      }
    } catch (error) {
      console.error('Exception in generateArt:', error);
      set({ 
        outputArt: '', 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'エラーが発生しました' 
      });
    }
  },
  
  loadRecentInputs: () => {
    const recentInputs = getRecentInputs();
    set({ recentInputs });
  },
  
  saveToHistory: () => {
    const { inputText, outputArt, settings } = get();
    
    if (inputText.trim() && outputArt.trim()) {
      addRecentInput({
        inputText,
        outputArt,
        fontUsed: settings.selectedFont,
      });
      
      // 履歴を再読み込み
      const { loadRecentInputs } = get();
      loadRecentInputs();
    }
  },
  
  setError: (error: string | null) => set({ error }),
  
  clearError: () => set({ error: null }),
}));