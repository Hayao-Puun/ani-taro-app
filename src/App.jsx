import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Share2, Info, Heart, Zap, Anchor, Moon, Sun as SunIcon, Star, Crown } from 'lucide-react';

// データ拡張：24種類（大アルカナ22枚＋オリジナル2枚）
const TAROT_DATA = [
  // Existing & Updated
  {
    id: 0,
    name: "THE FOOL",
    rarity: 2,
    animal: "冒険柴犬",
    emoji: "🐕",
    bgGradient: "from-yellow-200 via-orange-100 to-yellow-100",
    textColor: "text-yellow-800",
    accentColor: "bg-yellow-400",
    title: "ノープランでGO!",
    desc: "考えすぎ？今のキミに必要なのは「根拠のない自信」だけ！失敗してもネタになるから大丈夫。とりあえず一歩踏み出してみよう。",
    luckyItem: "新しい靴",
    luckyColor: "イエロー",
    tags: ["#自由", "#冒険", "#直感"]
  },
  {
    id: 1,
    name: "THE MAGICIAN",
    rarity: 3,
    animal: "天才アライグマ",
    emoji: "🦝",
    bgGradient: "from-purple-200 via-pink-200 to-purple-100",
    textColor: "text-purple-800",
    accentColor: "bg-purple-400",
    title: "準備は整った！",
    desc: "今のキミ、無敵モードかも！道具もスキルも揃ってるから、あとはやる気スイッチを押すだけ。アイデアを形にするなら今！",
    luckyItem: "最新ガジェット",
    luckyColor: "パープル",
    tags: ["#創造力", "#スキル", "#スタート"]
  },
  {
    id: 2,
    name: "THE HIGH PRIESTESS",
    rarity: 2,
    animal: "神秘の黒猫",
    emoji: "🐈‍⬛",
    bgGradient: "from-indigo-200 via-blue-200 to-indigo-100",
    textColor: "text-indigo-800",
    accentColor: "bg-indigo-400",
    title: "直感を信じて",
    desc: "周りのノイズはミュートしてOK。答えはググるより、自分の心に聞いた方が早いかも。今日は早めに帰ってチルな時間を過ごして。",
    luckyItem: "香水",
    luckyColor: "ミントブルー",
    tags: ["#直感", "#静寂", "#知性"]
  },
  // New Entries
  {
    id: 3,
    name: "THE EMPRESS",
    rarity: 3,
    animal: "愛されパンダ",
    emoji: "🐼",
    bgGradient: "from-pink-200 via-rose-100 to-white",
    textColor: "text-pink-800",
    accentColor: "bg-pink-400",
    title: "愛されモード全開",
    desc: "今日はとことん自分を甘やかしてOK！美味しいものを食べて、好きな服を着てリラックス。その余裕が周りを惹きつけるよ。",
    luckyItem: "ふわふわクッション",
    luckyColor: "パステルピンク",
    tags: ["#豊かさ", "#愛", "#魅力"]
  },
  {
    id: 4,
    name: "THE EMPEROR",
    rarity: 2,
    animal: "リーダーゴリラ",
    emoji: "🦍",
    bgGradient: "from-red-200 via-gray-200 to-slate-200",
    textColor: "text-slate-800",
    accentColor: "bg-slate-600",
    title: "意志を貫く！",
    desc: "迷いは禁物。今日は「俺についてこい」スタイルが正解。決断力が冴えてるから、難しい問題もパワーで解決できそう。",
    luckyItem: "腕時計",
    luckyColor: "シルバー",
    tags: ["#リーダーシップ", "#決断", "#安定"]
  },
  {
    id: 5,
    name: "THE HIEROPHANT",
    rarity: 1,
    animal: "賢者カメ",
    emoji: "🐢",
    bgGradient: "from-green-200 via-teal-100 to-green-100",
    textColor: "text-teal-800",
    accentColor: "bg-teal-500",
    title: "焦らずコツコツ",
    desc: "近道しようとすると失敗しそう。今日は基本に忠実に、一歩ずつ進むのが吉。年上の人からのアドバイスにヒントがあるかも。",
    luckyItem: "手帳",
    luckyColor: "モスグリーン",
    tags: ["#信頼", "#伝統", "#学び"]
  },
  {
    id: 6,
    name: "THE LOVERS",
    rarity: 3,
    animal: "ラブラブうさぎ",
    emoji: "🐇",
    bgGradient: "from-pink-200 via-rose-200 to-pink-100",
    textColor: "text-pink-800",
    accentColor: "bg-pink-400",
    title: "ときめきセンサーON",
    desc: "「なんとなく好き」という感覚を大事に。選択を迫られたら、心がワクワクする方を選んで正解。推し活も大吉！",
    luckyItem: "ペアアクセ",
    luckyColor: "チェリーピンク",
    tags: ["#愛", "#調和", "#選択"]
  },
  {
    id: 7,
    name: "THE CHARIOT",
    rarity: 2,
    animal: "爆走イノシシ",
    emoji: "🐗",
    bgGradient: "from-orange-200 via-red-200 to-orange-100",
    textColor: "text-red-800",
    accentColor: "bg-orange-400",
    title: "勢いで押し切る！",
    desc: "今はブレーキを踏む時じゃないよ、アクセル全開で！多少の障害物は気合で乗り越えられる運気。迷わず突き進め！",
    luckyItem: "スニーカー",
    luckyColor: "ビビッドオレンジ",
    tags: ["#前進", "#勝利", "#スピード"]
  },
  {
    id: 8,
    name: "STRENGTH",
    rarity: 2,
    animal: "優しいクマ",
    emoji: "🧸",
    bgGradient: "from-yellow-200 via-orange-100 to-yellow-100",
    textColor: "text-orange-800",
    accentColor: "bg-orange-400",
    title: "優しさは強さ",
    desc: "力でねじ伏せるより、北風と太陽の「太陽」作戦でいこう。ニコニコしながら粘り強く接すれば、相手も心を開いてくれるはず。",
    luckyItem: "はちみつ",
    luckyColor: "ブラウン",
    tags: ["#忍耐", "#優しさ", "#勇気"]
  },
  {
    id: 9,
    name: "THE HERMIT",
    rarity: 1,
    animal: "哲学フクロウ",
    emoji: "🦉",
    bgGradient: "from-slate-200 via-gray-200 to-slate-100",
    textColor: "text-slate-700",
    accentColor: "bg-slate-400",
    title: "自分探しの旅へ",
    desc: "みんなとワイワイするより、一人で深掘りしたい気分。スマホを置いてデジタルデトックス推奨。自分だけの答えが見つかるはず。",
    luckyItem: "イヤホン",
    luckyColor: "グレー",
    tags: ["#内省", "#探求", "#孤独"]
  },
  {
    id: 10,
    name: "WHEEL OF FORTUNE",
    rarity: 3,
    animal: "運命カメレオン",
    emoji: "🦎",
    bgGradient: "from-green-200 via-emerald-200 to-green-100",
    textColor: "text-green-800",
    accentColor: "bg-green-400",
    title: "チャンス到来！",
    desc: "ラッキーな風が吹いてきた！状況がコロコロ変わるかもしれないけど、波に乗っちゃえばこっちのもの。変化を楽しんで！",
    luckyItem: "サングラス",
    luckyColor: "エメラルド",
    tags: ["#転換点", "#幸運", "#変化"]
  },
  {
    id: 11,
    name: "JUSTICE",
    rarity: 2,
    animal: "バランスフラミンゴ",
    emoji: "🦩",
    bgGradient: "from-pink-200 via-red-100 to-pink-100",
    textColor: "text-rose-800",
    accentColor: "bg-rose-400",
    title: "バランス感覚",
    desc: "仕事と遊び、本音と建前。今日はそのバランスが絶妙に取れる日。片方に偏りすぎず、冷静な判断ができるよ。",
    luckyItem: "ヨガマット",
    luckyColor: "コーラル",
    tags: ["#公平", "#均衡", "#正しさ"]
  },
  {
    id: 12,
    name: "THE HANGED MAN",
    rarity: 1,
    animal: "のんびりナマケモノ",
    emoji: "🦥",
    bgGradient: "from-green-100 via-yellow-100 to-green-100",
    textColor: "text-green-800",
    accentColor: "bg-green-500",
    title: "視点を変えて",
    desc: "行き詰まったら、逆立ちしてみる？（比喩だよ！）無理に動かず、一旦停止して違う角度から見ると、意外な解決策が見つかるかも。",
    luckyItem: "アイマスク",
    luckyColor: "ベージュ",
    tags: ["#忍耐", "#視点変更", "#試練"]
  },
  {
    id: 13,
    name: "DEATH",
    rarity: 3,
    animal: "再生の蝶",
    emoji: "🦋",
    bgGradient: "from-purple-300 via-blue-300 to-indigo-300",
    textColor: "text-purple-900",
    accentColor: "bg-purple-500",
    title: "華麗なる変身",
    desc: "「終わり」は「始まり」の合図。古い習慣やイマイチな関係はスッパリ手放して、新しい自分に生まれ変わるチャンス！脱皮の時だよ。",
    luckyItem: "新しいコスメ",
    luckyColor: "ラベンダー",
    tags: ["#終了", "#再生", "#変容"]
  },
  {
    id: 14,
    name: "TEMPERANCE",
    rarity: 2,
    animal: "調和のイルカ",
    emoji: "🐬",
    bgGradient: "from-cyan-200 via-blue-200 to-cyan-100",
    textColor: "text-cyan-800",
    accentColor: "bg-cyan-500",
    title: "流れに乗ろう",
    desc: "無理せず、力まず、水の流れのように。異なる意見や環境も、今のキミなら上手にミックスして新しい価値を作れるよ。",
    luckyItem: "ミネラル水",
    luckyColor: "アクアブルー",
    tags: ["#調和", "#節度", "#融合"]
  },
  {
    id: 15,
    name: "THE DEVIL",
    rarity: 1,
    animal: "誘惑のサル",
    emoji: "🐵",
    bgGradient: "from-red-200 via-purple-200 to-gray-200",
    textColor: "text-red-900",
    accentColor: "bg-red-500",
    title: "誘惑に注意！",
    desc: "「あと5分だけ…」が命取りになりそう。甘い話や怠け心にロックオンされてるかも。今日は強い意志でブレーキを踏んで！",
    luckyItem: "目覚まし時計",
    luckyColor: "ブラック",
    tags: ["#束縛", "#誘惑", "#欲望"]
  },
  {
    id: 16,
    name: "THE TOWER",
    rarity: 1,
    animal: "衝撃のヤギ",
    emoji: "🐐",
    bgGradient: "from-gray-300 via-yellow-200 to-orange-200",
    textColor: "text-gray-800",
    accentColor: "bg-orange-500",
    title: "ハプニング発生!?",
    desc: "予期せぬ出来事があるかも。でもビビらないで！それは「現状打破」の合図。壊れた後には、もっと頑丈な土台が作れるから。",
    luckyItem: "スマホケース",
    luckyColor: "ショッキングピンク",
    tags: ["#崩壊", "#啓示", "#急変"]
  },
  {
    id: 17,
    name: "THE STAR",
    rarity: 3,
    animal: "希望のスワン",
    emoji: "🦢",
    bgGradient: "from-sky-200 via-blue-100 to-white",
    textColor: "text-sky-800",
    accentColor: "bg-sky-400",
    title: "キラキラの希望",
    desc: "暗闇に星が輝くように、明るい見通しが立ってくるよ。願い事は叶う前提で語ってみて。君の才能がスポットライトを浴びる予感。",
    luckyItem: "ラメ入りグッズ",
    luckyColor: "パールホワイト",
    tags: ["#希望", "#ひらめき", "#才能"]
  },
  {
    id: 18,
    name: "THE MOON",
    rarity: 1,
    animal: "迷いのオオカミ",
    emoji: "🐺",
    bgGradient: "from-indigo-300 via-purple-300 to-slate-300",
    textColor: "text-indigo-900",
    accentColor: "bg-indigo-500",
    title: "モヤモヤ期",
    desc: "なんとなく不安？それは夜明け前の暗闇かも。はっきりしない事は無理に決めなくてOK。今は直感だけを信じて、静かに過ごそう。",
    luckyItem: "アロマキャンドル",
    luckyColor: "ミッドナイト",
    tags: ["#不安", "#幻想", "#潜在意識"]
  },
  {
    id: 19,
    name: "THE SUN",
    rarity: 3,
    animal: "最強ライオン",
    emoji: "🦁",
    bgGradient: "from-red-200 via-orange-200 to-yellow-100",
    textColor: "text-red-800",
    accentColor: "bg-red-400",
    title: "最強ポジティブ",
    desc: "おめでとう！今のキミは太陽みたいに輝いてるよ。悩みごとも「ま、いっか！」で解決しちゃうレベル。その明るさで周りも元気に！",
    luckyItem: "ゴールドアクセ",
    luckyColor: "ゴールド",
    tags: ["#成功", "#喜び", "#エネルギー"]
  },
  {
    id: 20,
    name: "JUDGEMENT",
    rarity: 2,
    animal: "目覚めのニワトリ",
    emoji: "🐓",
    bgGradient: "from-orange-200 via-yellow-200 to-red-100",
    textColor: "text-orange-900",
    accentColor: "bg-orange-500",
    title: "復活のチャンス",
    desc: "諦めていたことや、やり残したことに再挑戦するなら今！「やっぱりやりたい！」という心の声に従えば、大きな成果が得られるよ。",
    luckyItem: "モーニング珈琲",
    luckyColor: "レッド",
    tags: ["#復活", "#覚醒", "#決断"]
  },
  {
    id: 21,
    name: "THE WORLD",
    rarity: 3,
    animal: "完成のクジラ",
    emoji: "🐋",
    bgGradient: "from-blue-200 via-teal-200 to-blue-100",
    textColor: "text-blue-800",
    accentColor: "bg-blue-500",
    title: "ハッピーエンド",
    desc: "ひとつの物語が美しく完成する時。努力が報われて、最高の達成感を味わえそう。次のステージへ進む準備もバッチリだね！",
    luckyItem: "世界地図",
    luckyColor: "オーシャンブルー",
    tags: ["#完成", "#統合", "#達成"]
  },
  // Extra Fun Cards
  {
    id: 99,
    name: "THE DREAMER",
    rarity: 1,
    animal: "夢見るヒツジ",
    emoji: "🐑",
    bgGradient: "from-purple-100 via-pink-100 to-white",
    textColor: "text-purple-400",
    accentColor: "bg-purple-300",
    title: "ひと休みしよう",
    desc: "ちょっとお疲れ気味かな？今日は無理せず、早めにお布団に入ろう。良い夢を見ることが、明日の運気アップへの一番の近道だよ。",
    luckyItem: "枕",
    luckyColor: "ホワイト",
    tags: ["#休息", "#夢", "#癒し"]
  },
  {
    id: 100,
    name: "THE GOURMAND",
    rarity: 2,
    animal: "食いしん坊ハム",
    emoji: "🐹",
    bgGradient: "from-yellow-200 via-orange-100 to-white",
    textColor: "text-orange-600",
    accentColor: "bg-orange-400",
    title: "食欲全開！",
    desc: "美味しいものが幸運を運んでくるよ！ダイエットは明日からにして、今日は好きなものを好きなだけ頬張っちゃおう。",
    luckyItem: "おやつ",
    luckyColor: "オレンジ",
    tags: ["#食事", "#健康", "#満腹"]
  }
];

// レア度表示用コンポーネント
const RarityDisplay = ({ rarity }) => {
  return (
    <div className="flex gap-0.5 bg-white/50 backdrop-blur-md px-2 py-1 rounded-full border border-white shadow-sm">
      {[...Array(3)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rarity ? 'fill-yellow-400 text-yellow-500' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const CardBack = () => (
  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 p-3 shadow-xl border-[6px] border-white relative overflow-hidden group">
    {/* パステルドット背景 */}
    <div className="absolute inset-0 opacity-20" 
         style={{ backgroundImage: 'radial-gradient(#fff 20%, transparent 20%)', backgroundSize: '15px 15px' }}>
    </div>
    <div className="w-full h-full border-4 border-dashed border-white/60 rounded-2xl flex flex-col items-center justify-center gap-2">
      <div className="relative">
        <Sparkles className="text-yellow-200 w-12 h-12 absolute -top-1 -right-1 animate-pulse" />
        <Crown className="text-white w-14 h-14 drop-shadow-md" />
      </div>
      <div className="text-white font-black text-2xl tracking-widest drop-shadow-md transform -rotate-6">
        ANI<br/>TARO
      </div>
    </div>
  </div>
);

const CardFront = ({ data }) => {
  // レア度に応じた演出クラス
  const rarityEffects = {
    1: "border-white",
    2: "border-white ring-4 ring-yellow-100",
    3: "border-white ring-4 ring-yellow-300 shadow-[0_0_30px_rgba(255,215,0,0.4)]"
  };

  return (
    <div className={`w-full h-full rounded-3xl bg-gradient-to-b ${data.bgGradient} p-4 shadow-2xl border-[8px] ${rarityEffects[data.rarity]} flex flex-col items-center justify-between text-center relative overflow-hidden transition-all duration-500`}>
      
      {/* Background Decorations (Sanrio-ish style) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[40%] bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-2xl"></div>
        {/* 小さな星を散らす */}
        <div className="absolute top-10 right-10 text-white/60 text-xl">✦</div>
        <div className="absolute bottom-20 left-8 text-white/60 text-2xl">★</div>
      </div>
      
      {/* Header: Name & Rarity */}
      <div className="relative z-10 w-full flex justify-between items-center mt-1">
        <div className={`text-[10px] font-black tracking-widest bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full ${data.textColor} uppercase shadow-sm border border-white/50`}>
          {data.name}
        </div>
        <RarityDisplay rarity={data.rarity} />
      </div>

      {/* Main Illustration Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-4">
        {/* 動物の後ろの光 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/50 rounded-full blur-xl animate-pulse"></div>
        
        {/* レア度3の場合のキラキラエフェクト */}
        {data.rarity === 3 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-bounce" />
             <Sparkles className="absolute top-10 -left-6 w-6 h-6 text-pink-400 animate-pulse delay-75" />
          </div>
        )}

        {/* 動物の絵文字（大きく、ポップに） */}
        <div className="relative transform hover:scale-110 transition-transform duration-300 cursor-default">
          <div className="text-[9rem] leading-none filter drop-shadow-xl emoji-pop">
            {data.emoji}
          </div>
          {/* 動物の名前ラベル */}
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border-2 ${data.textColor.replace('text', 'border')} px-4 py-1 rounded-full shadow-md z-20`}>
             <span className={`text-sm font-black ${data.textColor}`}>
                {data.animal}
             </span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 w-full bg-white/80 rounded-2xl p-4 shadow-lg border-2 border-white/60 backdrop-blur-md mt-4">
        <h4 className={`font-black ${data.textColor} text-lg mb-2 flex items-center justify-center gap-1`}>
          {data.rarity === 3 && <Crown className="w-4 h-4 fill-yellow-400 text-yellow-600" />}
          {data.title}
          {data.rarity === 3 && <Crown className="w-4 h-4 fill-yellow-400 text-yellow-600" />}
        </h4>
        
        {/* Lucky Items Area - NEW */}
        <div className="bg-white/60 rounded-lg p-2 mb-2 flex flex-col gap-1 text-xs border border-white/50">
          <div className="flex items-center justify-center gap-1">
             <span className="font-bold text-gray-400">🔑 ITEM:</span>
             <span className={`font-bold ${data.textColor}`}>{data.luckyItem}</span>
          </div>
          <div className="w-full h-px bg-gray-200/50"></div>
          <div className="flex items-center justify-center gap-1">
             <span className="font-bold text-gray-400">🎨 COLOR:</span>
             <span className={`font-bold ${data.textColor}`}>{data.luckyColor}</span>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2 opacity-50"></div>
        
        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {data.tags.map(tag => (
            <span key={tag} className={`text-[10px] ${data.accentColor} text-white font-bold px-2 py-1 rounded-full shadow-sm`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState('start'); // start, shuffling, dealing, result
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // New useEffect for handling query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('id');

    if (sharedId !== null) {
      const cardId = parseInt(sharedId, 10);
      const card = TAROT_DATA.find(c => c.id === cardId);
      if (card) {
        setSelectedCard(card);
        setGameState('result');
        setIsFlipped(true); // Show result immediately
      }
    }
  }, []);

  const startReading = () => {
    setGameState('shuffling');
    setTimeout(() => {
      setGameState('dealing');
    }, 2000);
  };

  const selectCard = () => {
    if (gameState !== 'dealing') return;
    
    const randomCard = TAROT_DATA[Math.floor(Math.random() * TAROT_DATA.length)];
    setSelectedCard(randomCard);
    setGameState('result');
    
    setTimeout(() => {
      setIsFlipped(true);
    }, 500);
  };

  const resetReading = () => {
    setIsFlipped(false);
    
    // Clear URL param to prevent re-opening the same result on refresh
    window.history.pushState({}, '', window.location.pathname);

    setTimeout(() => {
      setGameState('start');
      setSelectedCard(null);
    }, 300);
  };

  const handleShare = async () => {
    if (!selectedCard) return;

    const rarityStars = "★".repeat(selectedCard.rarity);
    // Updated Share Text: Includes unique URL with ID
    const shareUrl = `https://ani-taro-app.vercel.app/?id=${selectedCard.id}`;
    const shareText = `【Ani-Taro!】運勢レア度：${rarityStars}\n今日の相棒は「${selectedCard.animal}」！\n\n🔮 ${selectedCard.title}\n${selectedCard.desc}\n\n#AniTaro\n\n▼占いはコチラから！\n${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ani-Taro! 今日の運勢',
          text: shareText,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#fff0f5] font-sans text-gray-800 flex flex-col items-center overflow-hidden selection:bg-pink-200">
      
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center max-w-md mx-auto z-10">
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-xl shadow-md rotate-3 border-2 border-pink-200">
            <Sparkles className="w-5 h-5 text-pink-400 fill-pink-100" />
          </div>
          <h1 className="font-black text-2xl tracking-tighter text-gray-700 italic transform -skew-x-6 drop-shadow-sm">
            Ani-Taro<span className="text-pink-400">!</span>
          </h1>
        </div>
        <div className="text-xs font-bold text-pink-400 bg-white border border-pink-100 px-3 py-1.5 rounded-full shadow-sm">
          by Hayao
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md flex flex-col items-center justify-start pt-12 p-6 relative">
        
        {/* Background Decor (Soft & Fancy) */}
        <div className="absolute top-1/4 -left-10 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 -right-10 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-56 h-56 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

        {/* START SCREEN */}
        {gameState === 'start' && (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in w-full">
            <div className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300" onClick={startReading}>
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse"></div>
              <div className="relative w-60 h-80">
                <CardBack />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-pink-500 px-8 py-3 rounded-full shadow-xl border-4 border-pink-100 whitespace-nowrap z-20 hover:scale-105 transition-transform">
                <span className="text-sm font-black tracking-widest flex items-center gap-2">
                  <Star className="w-4 h-4 fill-pink-400" /> TAP TO START
                </span>
              </div>
            </div>
            
            <div className="space-y-3 mt-16 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
              <h2 className="text-xl font-black text-gray-700 tracking-tight">
                今日の相棒を見つけよう♪
              </h2>
              <p className="text-gray-500 text-sm font-bold">
                ★3が出たら超ラッキー！<br/>
                個性豊かな動物たちが占うよ🐾
              </p>
            </div>
          </div>
        )}

        {/* SHUFFLING ANIMATION */}
        {gameState === 'shuffling' && (
          <div className="relative w-full h-64 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-36 h-56 transition-all duration-500 ease-in-out shadow-xl rounded-2xl"
                style={{
                  animation: `shuffle 0.5s infinite alternate ${i * 0.1}s`,
                  zIndex: i
                }}
              >
                <CardBack />
              </div>
            ))}
            <div className="absolute -bottom-24 bg-white/80 px-6 py-2 rounded-full shadow-sm">
              <p className="text-pink-400 font-bold animate-pulse text-lg tracking-widest">SHUFFLING...</p>
            </div>
          </div>
        )}

        {/* DEALING / SELECTION */}
        {gameState === 'dealing' && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-8 animate-fade-in">
            <h2 className="text-xl font-black text-gray-700 bg-white/80 px-6 py-3 rounded-full backdrop-blur-sm shadow-md border border-white">
              直感で1枚選んでね！
            </h2>
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs perspective-1000">
              {[...Array(6)].map((_, i) => (
                <button
                  key={i}
                  onClick={selectCard}
                  className="w-full aspect-[2/3] transform hover:-translate-y-4 hover:rotate-2 transition-all duration-300 focus:outline-none drop-shadow-md hover:drop-shadow-xl"
                  style={{ animation: `dealCard 0.5s ease-out ${i * 0.1}s backwards` }}
                >
                  <CardBack />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {gameState === 'result' && selectedCard && (
          <div className="w-full flex flex-col items-center animate-fade-in pb-10">
            
            {/* Main Card Reveal */}
            <div className="perspective-1000 w-72 h-[450px] cursor-pointer mb-6 relative z-20" onClick={() => setIsFlipped(!isFlipped)}>
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden">
                  <CardBack />
                </div>
                <div className="absolute w-full h-full backface-hidden rotate-y-180 drop-shadow-2xl">
                  <CardFront data={selectedCard} />
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div className={`w-full bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border-2 border-white transform transition-all duration-700 delay-300 z-10 ${isFlipped ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-pink-500 text-white p-1.5 rounded-lg shadow-sm">
                  <Zap className="w-4 h-4 fill-white" />
                </span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">MESSAGE</span>
              </div>
              
              <p className="text-gray-700 text-base leading-relaxed mb-6 font-medium">
                {selectedCard.desc}
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={resetReading}
                  className="flex-1 py-3.5 border-2 border-gray-100 bg-white rounded-2xl font-bold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  もう一度
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  シェアする
                </button>
              </div>
            </div>

          </div>
        )}
      </main>

      <style>{`
        .emoji-pop {
          /* ステッカー風の白い太枠をつけるテクニック */
          text-shadow: 
            3px 3px 0 #fff,
           -3px -3px 0 #fff,  
            3px -3px 0 #fff,
           -3px 3px 0 #fff,
            3px 0px 0 #fff,
           -3px 0px 0 #fff,
            0px 3px 0 #fff,
            0px -3px 0 #fff;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes shuffle {
          0% { transform: translateX(0) rotate(0); }
          50% { transform: translateX(20px) rotate(5deg); }
          100% { transform: translateX(-20px) rotate(-5deg); }
        }
        @keyframes dealCard {
          from { opacity: 0; transform: translateY(50px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}