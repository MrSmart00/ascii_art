import { AsciiArtOptions, AsciiArtResult } from '@/types';

// アスキーアート生成
// シンプルなASCII文字マッピング
const ASCII_CHARS = {
  'A': ['  ██  ', ' ████ ', '██  ██', '██████', '██  ██', '██  ██', '      '],
  'B': ['██████', '██  ██', '██████', '██████', '██  ██', '██████', '      '],
  'C': [' █████', '██    ', '██    ', '██    ', '██    ', ' █████', '      '],
  'D': ['██████', '██  ██', '██  ██', '██  ██', '██  ██', '██████', '      '],
  'E': ['██████', '██    ', '█████ ', '█████ ', '██    ', '██████', '      '],
  'F': ['██████', '██    ', '█████ ', '█████ ', '██    ', '██    ', '      '],
  'G': [' █████', '██    ', '██ ███', '██  ██', '██  ██', ' █████', '      '],
  'H': ['██  ██', '██  ██', '██████', '██████', '██  ██', '██  ██', '      '],
  'I': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '██████', '      '],
  'J': ['██████', '    ██', '    ██', '    ██', '██  ██', ' █████', '      '],
  'K': ['██  ██', '██ ██ ', '████  ', '████  ', '██ ██ ', '██  ██', '      '],
  'L': ['██    ', '██    ', '██    ', '██    ', '██    ', '██████', '      '],
  'M': ['██  ██', '██████', '██████', '██  ██', '██  ██', '██  ██', '      '],
  'N': ['██  ██', '███ ██', '██████', '██ ███', '██  ██', '██  ██', '      '],
  'O': [' █████', '██  ██', '██  ██', '██  ██', '██  ██', ' █████', '      '],
  'P': ['██████', '██  ██', '██████', '██    ', '██    ', '██    ', '      '],
  'Q': [' █████', '██  ██', '██  ██', '██ ███', '██  ██', ' ██████', '     █'],
  'R': ['██████', '██  ██', '██████', '██ ██ ', '██  ██', '██  ██', '      '],
  'S': [' █████', '██    ', ' ████ ', '    ██', '    ██', '█████ ', '      '],
  'T': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '      '],
  'U': ['██  ██', '██  ██', '██  ██', '██  ██', '██  ██', ' █████', '      '],
  'V': ['██  ██', '██  ██', '██  ██', '██  ██', ' ████ ', '  ██  ', '      '],
  'W': ['██  ██', '██  ██', '██  ██', '██████', '██████', '██  ██', '      '],
  'X': ['██  ██', ' ████ ', '  ██  ', '  ██  ', ' ████ ', '██  ██', '      '],
  'Y': ['██  ██', '██  ██', ' ████ ', '  ██  ', '  ██  ', '  ██  ', '      '],
  'Z': ['██████', '    ██', '   ██ ', '  ██  ', ' ██   ', '██████', '      '],
  ' ': ['      ', '      ', '      ', '      ', '      ', '      ', '      '],
  '!': ['  ██  ', '  ██  ', '  ██  ', '  ██  ', '      ', '  ██  ', '      '],
  '?': [' █████', '██  ██', '   ██ ', '  ██  ', '      ', '  ██  ', '      '],
  '.': ['      ', '      ', '      ', '      ', '      ', '  ██  ', '      '],
  ',': ['      ', '      ', '      ', '      ', '  ██  ', ' ██   ', '      '],
  '0': [' █████', '██  ██', '██ ███', '███ ██', '██  ██', ' █████', '      '],
  '1': ['  ██  ', ' ███  ', '  ██  ', '  ██  ', '  ██  ', '██████', '      '],
  '2': [' █████', '██  ██', '   ██ ', '  ██  ', ' ██   ', '██████', '      '],
  '3': [' █████', '██  ██', '  ███ ', '   ██ ', '██  ██', ' █████', '      '],
  '4': ['██  ██', '██  ██', '██████', '    ██', '    ██', '    ██', '      '],
  '5': ['██████', '██    ', '█████ ', '    ██', '██  ██', ' █████', '      '],
  '6': [' █████', '██    ', '█████ ', '██  ██', '██  ██', ' █████', '      '],
  '7': ['██████', '    ██', '   ██ ', '  ██  ', ' ██   ', '██    ', '      '],
  '8': [' █████', '██  ██', ' █████', ' █████', '██  ██', ' █████', '      '],
  '9': [' █████', '██  ██', ' ██████', '    ██', '    ██', ' █████', '      '],
};

function generateSimpleAsciiArt(text: string): string {
  const lines = ['', '', '', '', '', '', ''];
  
  for (const char of text.toUpperCase()) {
    const charPattern = ASCII_CHARS[char as keyof typeof ASCII_CHARS] || ASCII_CHARS[' '];
    
    for (let i = 0; i < 7; i++) {
      lines[i] += charPattern[i] + ' ';
    }
  }
  
  return lines.join('\n');
}

export async function generateAsciiArt(
  input: string,
  options: AsciiArtOptions
): Promise<AsciiArtResult> {
  try {
    console.log('generateAsciiArt called with:', { input, options });
    
    if (!input.trim()) {
      console.log('Input text is empty');
      return {
        success: false,
        text: '',
        error: 'Input text is required',
      };
    }

    // シンプルなASCII art生成
    const result = generateSimpleAsciiArt(input.trim());
    console.log('Simple ASCII art generated successfully, result length:', result.length);
    console.log('Generated ASCII art:', result);

    return {
      success: true,
      text: result,
    };
  } catch (error) {
    console.error('ASCII art generation failed:', error);
    return {
      success: false,
      text: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// 利用可能なフォント一覧を取得
export function getAvailableFonts(): string[] {
  return [
    'Standard', 'Big', 'Block', 'Bubble', 'Digital', 
    'Graffiti', 'Ghost', 'Speed', 'Banner', 'Colossal', 
    'Slant', 'Small'
  ];
}

// フォント検証
export function validateFont(fontName: string): boolean {
  const availableFonts = getAvailableFonts();
  return availableFonts.includes(fontName);
}