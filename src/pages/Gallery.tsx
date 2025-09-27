import React, { useState, useEffect } from 'react';
import { generateAsciiArt } from '@/lib/ascii-art';
import { AVAILABLE_FONTS } from '@/lib/fonts';
import { copyToClipboard } from '@/lib/clipboard';
import { Copy, Eye, Palette, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  text: string;
  font: string;
  art: string;
  category: string;
}

export function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const sampleTexts = [
    { text: 'HELLO', category: 'greeting' },
    { text: 'WORLD', category: 'greeting' },
    { text: 'ASCII', category: 'tech' },
    { text: 'ART', category: 'creative' },
    { text: 'CODE', category: 'tech' },
    { text: 'LOVE', category: 'emotion' },
    { text: 'COOL', category: 'emotion' },
    { text: 'STAR', category: 'creative' },
  ];

  const categories = [
    { value: 'all', label: 'すべて', icon: '🎨' },
    { value: 'greeting', label: '挨拶', icon: '👋' },
    { value: 'tech', label: 'テック', icon: '💻' },
    { value: 'creative', label: 'クリエイティブ', icon: '✨' },
    { value: 'emotion', label: '感情', icon: '❤️' },
  ];

  useEffect(() => {
    generateGalleryItems();
  }, []);

  const generateGalleryItems = async () => {
    setIsLoading(true);
    const items: GalleryItem[] = [];

    for (const sample of sampleTexts) {
      for (const font of AVAILABLE_FONTS.slice(0, 4)) { // 最初の4つのフォントのみ使用
        try {
          const result = await generateAsciiArt(sample.text, {
            font: font.name,
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true,
          });

          if (result.success && result.text) {
            items.push({
              id: `${sample.text}-${font.name}`,
              text: sample.text,
              font: font.name,
              art: result.text,
              category: sample.category,
            });
          }
        } catch (error) {
          console.warn(`Failed to generate art for ${sample.text} with ${font.name}:`, error);
        }
      }
    }

    setGalleryItems(items);
    setIsLoading(false);
  };

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleCopy = async (art: string) => {
    await copyToClipboard(art);
  };

  const toggleExpanded = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-500 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              ギャラリーを生成中...
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              様々なフォントでサンプルアートを作成しています
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              アートギャラリー
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            様々なフォントスタイルで作成されたアスキーアートのコレクションです。
            お気に入りを見つけて、あなたの作品作りの参考にしてください。
          </p>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.value
                  ? 'bg-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700 shadow-md'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* 統計 */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredItems.length} 個のアート作品を表示中
          </p>
        </div>

        {/* ギャラリーグリッド */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
                       hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* カード ヘッダー */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      "{item.text}"
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.font} フォント
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                      title={expandedItem === item.id ? '縮小' : '拡大'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleCopy(item.art)}
                      className="p-2 text-gray-500 hover:text-green-500 transition-colors"
                      title="コピー"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* アート表示 */}
              <div className="p-4">
                <pre className={`bg-gray-900 text-green-400 p-3 rounded font-mono text-xs 
                               leading-tight overflow-x-auto ${
                  expandedItem === item.id 
                    ? 'max-h-none' 
                    : 'max-h-32 overflow-y-hidden'
                }`}>
                  {expandedItem === item.id 
                    ? item.art 
                    : item.art.split('\n').slice(0, 4).join('\n') + 
                      (item.art.split('\n').length > 4 ? '\n...' : '')
                  }
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* フッター */}
        <div className="text-center mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <Palette className="w-8 h-8 mx-auto mb-3 text-purple-500" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            あなたも作ってみませんか？
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ホームページでオリジナルのアスキーアートを作成できます
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 
                     text-white rounded-lg transition-colors font-medium"
          >
            <Sparkles className="w-5 h-5" />
            アート作成を始める
          </a>
        </div>
      </div>
    </div>
  );
}