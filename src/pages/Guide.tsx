import React from 'react';
import { BookOpen, Lightbulb, Target, Zap, Heart, Share2 } from 'lucide-react';

export function Guide() {
  const steps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'テキストを入力',
      description: 'ホームページの入力欄に変換したいテキストを入力します。英数字と記号が最適です。',
      tips: ['短いテキスト（1-10文字）が美しく表示されます', '大文字の方が見栄えが良くなります', '特殊文字は避けることをお勧めします']
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'フォントを選択',
      description: 'お好みのフォントスタイルを選択してください。カテゴリ別に整理されています。',
      tips: ['スタンダード: 基本的で読みやすい', 'ブロック: 太くて目立つ', 'デコラティブ: 装飾的で華やか', 'スクリプト: 手書き風でおしゃれ']
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: '設定を調整',
      description: 'レイアウトや幅などの詳細設定で、理想的な見た目に調整できます。',
      tips: ['水平レイアウト: 文字の横方向の配置', '垂直レイアウト: 文字の縦方向の配置', '最大幅: 1行の文字数制限']
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'コピー＆共有',
      description: '生成されたアスキーアートをコピーして、SNSやメールで共有しましょう。',
      tips: ['等幅フォントで表示すると美しく見えます', 'プレーンテキスト形式で共有してください', '履歴機能で後から再利用できます']
    }
  ];

  const useCases = [
    {
      title: 'SNS投稿',
      description: 'TwitterやInstagramの投稿を目立たせる',
      example: 'HAPPY\nBIRTHDAY',
      icon: '📱'
    },
    {
      title: 'メール署名',
      description: 'ビジネスメールに個性的な署名を追加',
      example: 'THANKS',
      icon: '📧'
    },
    {
      title: 'プレゼンテーション',
      description: 'スライドのタイトルを印象的に',
      example: 'SUCCESS',
      icon: '📊'
    },
    {
      title: 'コードコメント',
      description: 'プログラムのセクション分けに',
      example: 'DEBUG',
      icon: '💻'
    },
    {
      title: 'お祝いメッセージ',
      description: '特別な日のメッセージを華やかに',
      example: 'CONGRATS',
      icon: '🎉'
    },
    {
      title: 'ロゴデザイン',
      description: 'シンプルなテキストロゴの作成',
      example: 'BRAND',
      icon: '🎨'
    }
  ];

  const tips = [
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      title: '美しいアートのコツ',
      content: '短くて大文字のテキストを使用し、適切なフォントを選択することで、より美しいアスキーアートが作成できます。'
    },
    {
      icon: <Target className="w-6 h-6 text-blue-500" />,
      title: 'フォント選択のポイント',
      content: '用途に応じてフォントを選びましょう。フォーマルな場面ではスタンダード、カジュアルな場面ではデコラティブがおすすめです。'
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      title: '設定の活用',
      content: 'レイアウト設定を調整することで、同じテキストでも全く違った印象のアートが作成できます。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              使い方ガイド
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ASCII Art Generatorの使い方を詳しく説明します。
            初心者の方でも簡単に美しいアスキーアートが作成できます。
          </p>
        </div>

        {/* 基本的な使い方 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            <BookOpen className="w-8 h-8 inline-block mr-3 text-green-500" />
            基本的な使い方
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                    {step.icon}
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="inline-block w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold leading-8 mb-3">
                    {index + 1}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {step.description}
                </p>
                
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">💡 ポイント:</h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 活用例 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            <Target className="w-8 h-8 inline-block mr-3 text-blue-500" />
            活用例
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{useCase.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {useCase.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {useCase.description}
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">例:</p>
                  <pre className="text-xs font-mono text-gray-800 dark:text-gray-200">
                    {useCase.example}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 役立つヒント */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            <Lightbulb className="w-8 h-8 inline-block mr-3 text-yellow-500" />
            役立つヒント
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {tip.icon}
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white ml-3">
                    {tip.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* よくある質問 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            ❓ よくある質問
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Q: 日本語のテキストは使用できますか？
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A: 英数字と記号の使用をお勧めします。日本語文字は正しく表示されない場合があります。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Q: 生成されたアートが崩れて見えます
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A: 等幅フォント（Courier、Monaco、Consolas等）で表示してください。プロポーショナルフォントでは正しく表示されません。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Q: 商用利用は可能ですか？
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A: 生成されたアスキーアートは自由にご利用いただけます。ただし、フォントによっては制限がある場合があります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">さあ、始めましょう！</h3>
            <p className="text-lg mb-6">このガイドを参考に、素晴らしいアスキーアートを作成してください。</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-600 
                       rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Zap className="w-5 h-5" />
              アート作成を始める
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}