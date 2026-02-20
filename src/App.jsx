import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, RefreshCw, Share2, Download, Book, Zap, Star, Crown, X, Heart } from 'lucide-react';

// データ拡張：画像パス(image)を追加
const TAROT_DATA = [
  // 既存データ (0〜21)
  { id: 0, name: "THE FOOL", rarity: 2, animal: "冒険柴犬", emoji: "🐕", image: "/00_shiba.png", bgGradient: "from-yellow-200 via-orange-100 to-yellow-100", textColor: "text-yellow-800", accentColor: "bg-yellow-400", title: "ノープランでGO!", desc: "考えすぎ？今のキミに必要なのは「根拠のない自信」だけ！失敗してもネタになるから大丈夫。とりあえず一歩踏み出してみよう。", luckyItem: "新しい靴", luckyColor: "イエロー", tags: ["#自由", "#冒険", "#直感"] },
  { id: 1, name: "THE MAGICIAN", rarity: 3, animal: "天才アライグマ", emoji: "🦝", image: "/01_raccoon.png", bgGradient: "from-purple-200 via-pink-200 to-purple-100", textColor: "text-purple-800", accentColor: "bg-purple-400", title: "準備は整った！", desc: "今のキミ、無敵モードかも！道具もスキルも揃ってるから、あとはやる気スイッチを押すだけ。アイデアを形にするなら今！", luckyItem: "最新ガジェット", luckyColor: "パープル", tags: ["#創造力", "#スキル", "#スタート"] },
  { id: 2, name: "THE HIGH PRIESTESS", rarity: 2, animal: "神秘の黒猫", emoji: "🐈‍⬛", image: "/02_blackcat.png", bgGradient: "from-indigo-200 via-blue-200 to-indigo-100", textColor: "text-indigo-800", accentColor: "bg-indigo-400", title: "直感を信じて", desc: "周りのノイズはミュートしてOK。答えはググるより、自分の心に聞いた方が早いかも。今日は早めに帰ってチルな時間を過ごして。", luckyItem: "香水", luckyColor: "ミントブルー", tags: ["#直感", "#静寂", "#知性"] },
  { id: 3, name: "THE EMPRESS", rarity: 3, animal: "愛されパンダ", emoji: "🐼", image: "/03_panda.png", bgGradient: "from-pink-200 via-rose-100 to-white", textColor: "text-pink-800", accentColor: "bg-pink-400", title: "愛されモード全開", desc: "今日はとことん自分を甘やかしてOK！美味しいものを食べて、好きな服を着てリラックス。その余裕が周りを惹きつけるよ。", luckyItem: "ふわふわクッション", luckyColor: "パステルピンク", tags: ["#豊かさ", "#愛", "#魅力"] },
  { id: 4, name: "THE EMPEROR", rarity: 2, animal: "リーダーゴリラ", emoji: "🦍", image: "/04_gorilla.png", bgGradient: "from-red-200 via-gray-200 to-slate-200", textColor: "text-slate-800", accentColor: "bg-slate-600", title: "意志を貫く！", desc: "迷いは禁物。今日は「俺についてこい」スタイルが正解。決断力が冴えてるから、難しい問題もパワーで解決できそう。", luckyItem: "腕時計", luckyColor: "シルバー", tags: ["#リーダーシップ", "#決断", "#安定"] },
  { id: 5, name: "THE HIEROPHANT", rarity: 1, animal: "賢者カメ", emoji: "🐢", image: "/05_turtle.png", bgGradient: "from-green-200 via-teal-100 to-green-100", textColor: "text-teal-800", accentColor: "bg-teal-500", title: "焦らずコツコツ", desc: "近道しようとすると失敗しそう。今日は基本に忠実に、一歩ずつ進むのが吉。年上の人からのアドバイスにヒントがあるかも。", luckyItem: "手帳", luckyColor: "モスグリーン", tags: ["#信頼", "#伝統", "#学び"] },
  { id: 6, name: "THE LOVERS", rarity: 3, animal: "ラブラブうさぎ", emoji: "🐇", image: "/06_rabbit.png", bgGradient: "from-pink-200 via-rose-200 to-pink-100", textColor: "text-pink-800", accentColor: "bg-pink-400", title: "ときめきセンサーON", desc: "「なんとなく好き」という感覚を大事に。選択を迫られたら、心がワクワクする方を選んで正解。推し活も大吉！", luckyItem: "ペアアクセ", luckyColor: "チェリーピンク", tags: ["#愛", "#調和", "#選択"] },
  { id: 7, name: "THE CHARIOT", rarity: 2, animal: "爆走イノシシ", emoji: "🐗", image: "/07_boar.png", bgGradient: "from-orange-200 via-red-200 to-orange-100", textColor: "text-red-800", accentColor: "bg-orange-400", title: "勢いで押し切る！", desc: "今はブレーキを踏む時じゃないよ、アクセル全開で！多少の障害物は気合で乗り越えられる運気。迷わず突き進め！", luckyItem: "スニーカー", luckyColor: "ビビッドオレンジ", tags: ["#前進", "#勝利", "#スピード"] },
  { id: 8, name: "STRENGTH", rarity: 2, animal: "優しいクマ", emoji: "🧸", image: "/08_bear.png", bgGradient: "from-yellow-200 via-orange-100 to-yellow-100", textColor: "text-orange-800", accentColor: "bg-orange-400", title: "優しさは強さ", desc: "力でねじ伏せるより、北風と太陽の「太陽」作戦でいこう。ニコニコしながら粘り強く接すれば、相手も心を開いてくれるはず。", luckyItem: "はちみつ", luckyColor: "ブラウン", tags: ["#忍耐", "#優しさ", "#勇気"] },
  { id: 9, name: "THE HERMIT", rarity: 1, animal: "哲学フクロウ", emoji: "🦉", image: "/09_owl.png", bgGradient: "from-slate-200 via-gray-200 to-slate-100", textColor: "text-slate-700", accentColor: "bg-slate-400", title: "自分探しの旅へ", desc: "みんなとワイワイするより、一人で深掘りしたい気分。スマホを置いてデジタルデトックス推奨。自分だけの答えが見つかるはず。", luckyItem: "イヤホン", luckyColor: "グレー", tags: ["#内省", "#探求", "#孤独"] },
  { id: 10, name: "WHEEL OF FORTUNE", rarity: 3, animal: "運命カメレオン", emoji: "🦎", image: "/10_chameleon.png", bgGradient: "from-green-200 via-emerald-200 to-green-100", textColor: "text-green-800", accentColor: "bg-green-400", title: "チャンス到来！", desc: "ラッキーな風が吹いてきた！状況がコロコロ変わるかもしれないけど、波に乗っちゃえばこっちのもの。変化を楽しんで！", luckyItem: "サングラス", luckyColor: "エメラルド", tags: ["#転換点", "#幸運", "#変化"] },
  { id: 11, name: "JUSTICE", rarity: 2, animal: "バランスフラミンゴ", emoji: "🦩", image: "/11_flamingo.png", bgGradient: "from-pink-200 via-red-100 to-pink-100", textColor: "text-rose-800", accentColor: "bg-rose-400", title: "バランス感覚", desc: "仕事と遊び、本音と建前。今日はそのバランスが絶妙に取れる日。片方に偏りすぎず、冷静な判断ができるよ。", luckyItem: "ヨガマット", luckyColor: "コーラル", tags: ["#公平", "#均衡", "#正しさ"] },
  { id: 12, name: "THE HANGED MAN", rarity: 1, animal: "のんびりナマケモノ", emoji: "🦥", image: "/12_sloth.png", bgGradient: "from-green-100 via-yellow-100 to-green-100", textColor: "text-green-800", accentColor: "bg-green-500", title: "視点を変えて", desc: "行き詰まったら、逆立ちしてみる？（比喩だよ！）無理に動かず、一旦停止して違う角度から見ると、意外な解決策が見つかるかも。", luckyItem: "アイマスク", luckyColor: "ベージュ", tags: ["#忍耐", "#視点変更", "#試練"] },
  { id: 13, name: "DEATH", rarity: 3, animal: "再生の蝶", emoji: "🦋", image: "/13_butterfly.png", bgGradient: "from-purple-300 via-blue-300 to-indigo-300", textColor: "text-purple-900", accentColor: "bg-purple-500", title: "華麗なる変身", desc: "「終わり」は「始まり」の合図。古い習慣やイマイチな関係はスッパリ手放して、新しい自分に生まれ変わるチャンス！脱皮の時だよ。", luckyItem: "新しいコスメ", luckyColor: "ラベンダー", tags: ["#終了", "#再生", "#変容"] },
  { id: 14, name: "TEMPERANCE", rarity: 2, animal: "調和のイルカ", emoji: "🐬", image: "/14_dolphin.png", bgGradient: "from-cyan-200 via-blue-200 to-cyan-100", textColor: "text-cyan-800", accentColor: "bg-cyan-500", title: "流れに乗ろう", desc: "無理せず、力まず、水の流れのように。異なる意見や環境も、今のキミなら上手にミックスして新しい価値を作れるよ。", luckyItem: "ミネラル水", luckyColor: "アクアブルー", tags: ["#調和", "#節度", "#融合"] },
  { id: 15, name: "THE DEVIL", rarity: 1, animal: "誘惑のサル", emoji: "🐵", image: "/15_monkey.png", bgGradient: "from-red-200 via-purple-200 to-gray-200", textColor: "text-red-900", accentColor: "bg-red-500", title: "誘惑に注意！", desc: "「あと5分だけ…」が命取りになりそう。甘い話や怠け心にロックオンされてるかも。今日は強い意志でブレーキを踏んで！", luckyItem: "目覚まし時計", luckyColor: "ブラック", tags: ["#束縛", "#誘惑", "#欲望"] },
  { id: 16, name: "THE TOWER", rarity: 1, animal: "衝撃のヤギ", emoji: "🐐", image: "/16_goat.png", bgGradient: "from-gray-300 via-yellow-200 to-orange-200", textColor: "text-gray-800", accentColor: "bg-orange-500", title: "ハプニング発生!?", desc: "予期せぬ出来事があるかも。でもビビらないで！それは「現状打破」の合図。壊れた後には、もっと頑丈な土台が作れるから。", luckyItem: "スマホケース", luckyColor: "ショッキングピンク", tags: ["#崩壊", "#啓示", "#急変"] },
  { id: 17, name: "THE STAR", rarity: 3, animal: "希望のスワン", emoji: "🦢", image: "/17_swan.png", bgGradient: "from-sky-200 via-blue-100 to-white", textColor: "text-sky-800", accentColor: "bg-sky-400", title: "キラキラの希望", desc: "暗闇に星が輝くように、明るい見通しが立ってくるよ。願い事は叶う前提で語ってみて。君の才能がスポットライトを浴びる予感。", luckyItem: "ラメ入りグッズ", luckyColor: "パールホワイト", tags: ["#希望", "#ひらめき", "#才能"] },
  { id: 18, name: "THE MOON", rarity: 1, animal: "迷いのオオカミ", emoji: "🐺", image: "/18_wolf.png", bgGradient: "from-indigo-300 via-purple-300 to-slate-300", textColor: "text-indigo-900", accentColor: "bg-indigo-500", title: "モヤモヤ期", desc: "なんとなく不安？それは夜明け前の暗闇かも。はっきりしない事は無理に決めなくてOK。今は直感だけを信じて、静かに過ごそう。", luckyItem: "アロマキャンドル", luckyColor: "ミッドナイト", tags: ["#不安", "#幻想", "#潜在意識"] },
  { id: 19, name: "THE SUN", rarity: 3, animal: "最強ライオン", emoji: "🦁", image: "/19_lion.png", bgGradient: "from-red-200 via-orange-200 to-yellow-100", textColor: "text-red-800", accentColor: "bg-red-400", title: "最強ポジティブ", desc: "おめでとう！今のキミは太陽みたいに輝いてるよ。悩みごとも「ま、いっか！」で解決しちゃうレベル。その明るさで周りも元気に！", luckyItem: "ゴールドアクセ", luckyColor: "ゴールド", tags: ["#成功", "#喜び", "#エネルギー"] },
  { id: 20, name: "JUDGEMENT", rarity: 2, animal: "目覚めのニワトリ", emoji: "🐓", image: "/20_rooster.png", bgGradient: "from-orange-200 via-yellow-200 to-red-100", textColor: "text-orange-900", accentColor: "bg-orange-500", title: "復活のチャンス", desc: "諦めていたことや、やり残したことに再挑戦するなら今！「やっぱりやりたい！」という心の声に従えば、大きな成果が得られるよ。", luckyItem: "モーニング珈琲", luckyColor: "レッド", tags: ["#復活", "#覚醒", "#決断"] },
  { id: 21, name: "THE WORLD", rarity: 3, animal: "完成のクジラ", emoji: "🐋", image: "/21_whale.png", bgGradient: "from-blue-200 via-teal-200 to-blue-100", textColor: "text-blue-800", accentColor: "bg-blue-500", title: "ハッピーエンド", desc: "ひとつの物語が美しく完成する時。努力が報われて、最高の達成感を味わえそう。次のステージへ進む準備もバッチリだね！", luckyItem: "世界地図", luckyColor: "オーシャンブルー", tags: ["#完成", "#統合", "#達成"] },
  // オリジナルカード (99, 100)
  { id: 99, name: "THE DREAMER", rarity: 1, animal: "夢見るヒツジ", emoji: "🐑", image: "/99_sheep.png", bgGradient: "from-purple-100 via-pink-100 to-white", textColor: "text-purple-400", accentColor: "bg-purple-300", title: "ひと休みしよう", desc: "ちょっとお疲れ気味かな？今日は無理せず、早めにお布団に入ろう。良い夢を見ることが、明日の運気アップへの一番の近道だよ。", luckyItem: "枕", luckyColor: "ホワイト", tags: ["#休息", "#夢", "#癒し"] },
  { id: 100, name: "THE GOURMAND", rarity: 2, animal: "食いしん坊ハム", emoji: "🐹", image: "/100_hamster.png", bgGradient: "from-yellow-200 via-orange-100 to-white", textColor: "text-orange-600", accentColor: "bg-orange-400", title: "食欲全開！", desc: "美味しいものが幸運を運んでくるよ！ダイエットは明日からにして、今日は好きなものを好きなだけ頬張っちゃおう。", luckyItem: "おやつ", luckyColor: "オレンジ", tags: ["#食事", "#健康", "#満腹"] },
  // 🌟 シークレットカード追加（レア度4）
  {
    id: 998,
    name: "THE UNIVERSE",
    rarity: 4,
    animal: "宇宙ネコ",
    emoji: "🌌🐈",
    image: "/998_spacecat.png",
    bgGradient: "from-indigo-900 via-purple-900 to-black",
    textColor: "text-indigo-900",
    accentColor: "bg-purple-600",
    title: "無限の可能性",
    desc: "★シークレット発見★ 今のキミは宇宙レベルで無敵！常識にとらわれず、スケールの大きい夢を描いてみよう。",
    luckyItem: "プラネタリウム",
    luckyColor: "ギャラクシー",
    tags: ["#宇宙", "#シークレット", "#無限"]
  },
  {
    id: 999,
    name: "THE MIRACLE",
    rarity: 4,
    animal: "伝説のペガサス",
    emoji: "🦄✨",
    image: "/999_pegasus.png",
    bgGradient: "from-yellow-300 via-pink-300 to-cyan-300",
    textColor: "text-pink-900",
    accentColor: "bg-yellow-400",
    title: "奇跡の到来",
    desc: "★シークレット発見★ 超激レア！信じられないような奇跡がすぐそこまで来ているよ。心の翼を広げて大空へ羽ばたこう！",
    luckyItem: "虹色のアイテム",
    luckyColor: "オーロラ",
    tags: ["#奇跡", "#伝説", "#飛躍"]
  }
];

// 相性計算ロジック（改行を追加）
const getCompatibility = (id1, id2) => {
  const score = ((id1 * 7 + id2 * 13) % 61) + 40;
  let text = "";
  if (score >= 90) text = "運命のペア！\n息ピッタリで最高の1日になりそう✨";
  else if (score >= 70) text = "とても良い相性！\n一緒に行動するとラッキーなことが起こるかも♪";
  else if (score >= 50) text = "まずまずの相性。\nお互いの違いを楽しんでみて！";
  else text = "逆に新鮮な組み合わせ！\n新しい発見があるかも？";
  return { score, text };
};

// sizeプロップを追加してサイズによって表示を微調整
const RarityDisplay = ({ rarity, size = "large" }) => {
  const isSecret = rarity === 4;
  const maxStars = isSecret ? 4 : 3;
  const isSmall = size === "small";

  return (
    <div className={`flex bg-white/50 backdrop-blur-md rounded-full border shadow-sm ${isSecret ? 'border-pink-400' : 'border-white'} ${isSmall ? 'gap-0 px-1.5 py-0.5' : 'gap-0.5 px-2 py-1'}`}>
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          className={`${isSmall ? 'w-3 h-3' : 'w-4 h-4'} ${isSecret ? 'fill-pink-400 text-pink-500' : (i < rarity ? 'fill-yellow-400 text-yellow-500' : 'text-gray-300')}`}
        />
      ))}
    </div>
  );
};

const CardBack = () => (
  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 p-3 shadow-xl border-[6px] border-white relative overflow-hidden group">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 20%, transparent 20%)', backgroundSize: '15px 15px' }}></div>
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

// sizeプロップを追加して、コンテナサイズに合わせて中身の比率を変更する
const CardFront = ({ data, size = "large" }) => {
  const isSmall = size === "small";

  const rarityEffects = {
    1: "border-white",
    2: "border-white ring-4 ring-yellow-100",
    3: "border-white ring-4 ring-yellow-300 shadow-[0_0_30px_rgba(255,215,0,0.4)]",
    4: "border-pink-300 ring-4 ring-purple-400 shadow-[0_0_40px_rgba(236,72,153,0.6)]"
  };

  return (
    <div className={`w-full h-full rounded-3xl bg-gradient-to-b ${data.bgGradient} ${isSmall ? 'p-2 border-[5px]' : 'p-4 border-[8px]'} shadow-2xl ${rarityEffects[data.rarity]} flex flex-col items-center justify-between text-center relative overflow-hidden transition-all duration-500`}>
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[40%] bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-2xl"></div>
        <div className={`absolute top-10 right-10 text-white/60 ${isSmall ? 'text-lg' : 'text-xl'}`}>✦</div>
        <div className={`absolute bottom-20 left-8 text-white/60 ${isSmall ? 'text-xl' : 'text-2xl'}`}>★</div>
      </div>
      
      {/* 🌟 Header Area */}
      <div className="relative z-10 w-full flex justify-between items-center mt-1">
        <div className={`font-black tracking-widest bg-white/90 backdrop-blur-sm rounded-full ${data.textColor} uppercase shadow-sm border border-white/50 ${isSmall ? 'text-[8px] px-2 py-1' : 'text-[10px] px-3 py-1.5'}`}>
          {data.name}
        </div>
        <RarityDisplay rarity={data.rarity} size={size} />
      </div>

      {/* 🌟 Main Image Area */}
      <div className={`relative z-10 flex-1 flex flex-col items-center justify-center w-full min-h-0 ${isSmall ? '-mt-2' : '-mt-4'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/50 rounded-full blur-xl animate-pulse pointer-events-none"></div>
        
        {data.rarity >= 3 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <Sparkles className={`absolute -top-4 -right-4 text-yellow-400 animate-bounce ${isSmall ? 'w-6 h-6' : 'w-8 h-8'}`} />
             <Sparkles className={`absolute top-10 -left-6 text-pink-400 animate-pulse delay-75 ${isSmall ? 'w-4 h-4' : 'w-6 h-6'}`} />
             {data.rarity === 4 && (
                <>
                  <Sparkles className={`absolute bottom-10 -right-6 text-purple-400 animate-bounce delay-150 ${isSmall ? 'w-6 h-6' : 'w-10 h-10'}`} />
                  <Star className={`absolute -bottom-4 left-4 fill-yellow-300 text-yellow-400 animate-pulse ${isSmall ? 'w-4 h-4' : 'w-6 h-6'}`} />
                </>
             )}
          </div>
        )}

        <div className="relative transform hover:scale-105 transition-transform duration-300 cursor-default flex flex-col items-center justify-center w-full flex-1 min-h-0 py-4">
          {data.image && (
            <img 
              src={data.image} 
              alt={data.animal} 
              className="max-w-[90%] max-h-full object-contain filter drop-shadow-xl z-10"
              loading="eager"       // 隠し領域でも読み込ませる設定
              onError={(e) => { 
                e.target.style.display = 'none'; 
                if(e.target.nextSibling) e.target.nextSibling.style.display = 'block'; 
              }} 
            />
          )}
          <div className={`leading-none filter drop-shadow-xl emoji-pop ${isSmall ? 'text-[6rem]' : 'text-[8.5rem]'}`} style={{ display: data.image ? 'none' : 'block' }}>
            {data.emoji}
          </div>
          
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border-2 ${data.textColor.replace('text', 'border')} rounded-full shadow-md z-20 ${isSmall ? 'px-3 py-0.5' : 'px-4 py-1'}`}>
             <span className={`font-black ${data.textColor} ${isSmall ? 'text-[10px]' : 'text-sm'}`}>
                {data.animal}
             </span>
          </div>
        </div>
      </div>

      {/* 🌟 Footer Area */}
      <div className={`relative z-10 w-full bg-white/80 rounded-2xl shadow-lg border-2 border-white/60 backdrop-blur-md flex flex-col justify-center ${isSmall ? 'p-2 mt-3' : 'p-4 mt-6'}`}>
        <h4 className={`font-black ${data.textColor} flex items-center justify-center gap-1 leading-tight ${isSmall ? 'text-[11px] mb-1' : 'text-lg mb-2'}`}>
          {data.rarity >= 3 && <Crown className={`${isSmall ? 'w-3 h-3' : 'w-4 h-4'} ${data.rarity === 4 ? 'fill-pink-400 text-pink-600' : 'fill-yellow-400 text-yellow-600'}`} />}
          {data.title}
          {data.rarity >= 3 && <Crown className={`${isSmall ? 'w-3 h-3' : 'w-4 h-4'} ${data.rarity === 4 ? 'fill-pink-400 text-pink-600' : 'fill-yellow-400 text-yellow-600'}`} />}
        </h4>
        <div className={`bg-white/60 rounded-lg flex flex-col border border-white/50 ${isSmall ? 'gap-0.5 p-1 mb-1 text-[9px]' : 'gap-1 p-2 mb-2 text-xs'}`}>
          <div className="flex items-center justify-center gap-1">
             <span className="font-bold text-gray-400">🔑 ITEM:</span>
             <span className={`font-bold ${data.textColor} truncate max-w-[120px]`}>{data.luckyItem}</span>
          </div>
          <div className="w-full h-px bg-gray-200/50"></div>
          <div className="flex items-center justify-center gap-1">
             <span className="font-bold text-gray-400">🎨 COLOR:</span>
             <span className={`font-bold ${data.textColor} truncate max-w-[120px]`}>{data.luckyColor}</span>
          </div>
        </div>
        <div className={`w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50 ${isSmall ? 'my-1' : 'my-2'}`}></div>
        <div className="flex flex-wrap justify-center gap-1">
          {data.tags.map(tag => (
            <span key={tag} className={`${data.accentColor} text-white font-bold rounded-full shadow-sm ${isSmall ? 'text-[8px] px-1.5 py-0.5' : 'text-[10px] px-2 py-1'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState('start');
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [theme, setTheme] = useState('day');
  
  const [collection, setCollection] = useState([]);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [collectionDetailCard, setCollectionDetailCard] = useState(null);
  
  const [partnerCard, setPartnerCard] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null); // ダウンロード用画像状態
  const [isGenerating, setIsGenerating] = useState(false); // 画像生成中フラグ

  const captureRef = useRef(null); // 画像生成（オフスクリーン）用のRef
  const detailScrollRef = useRef(null);

  useEffect(() => {
    if (collectionDetailCard && detailScrollRef.current) {
      setTimeout(() => {
        if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;
      }, 10);
    }
  }, [collectionDetailCard]);

  useEffect(() => {
    if (!window.confetti) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
      document.head.appendChild(script);
    }
    if (!window.htmlToImage) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js';
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 16) setTheme('day');
    else if (hour >= 16 && hour < 19) setTheme('sunset');
    else setTheme('night');
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('anitaro_collection');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const formatted = parsed.map(item => {
          if (typeof item === 'number') return { id: item, dates: [new Date().toISOString()] };
          else if (item.date && !item.dates) return { id: item.id, dates: [item.date] };
          return item;
        });
        setCollection(formatted);
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('partner') || params.get('id');
    if (sharedId !== null) {
      const cardId = parseInt(sharedId, 10);
      const card = TAROT_DATA.find(c => c.id === cardId);
      if (card) setPartnerCard(card);
    }
  }, []);

  const addToCollection = (id) => {
    setCollection(prev => {
      const now = new Date().toISOString();
      const existingIndex = prev.findIndex(item => item.id === id);
      let next;
      if (existingIndex >= 0) {
        next = [...prev];
        next[existingIndex] = { ...next[existingIndex], dates: [now, ...(next[existingIndex].dates || [])] };
      } else {
        next = [...prev, { id, dates: [now] }];
      }
      localStorage.setItem('anitaro_collection', JSON.stringify(next));
      return next;
    });
  };

  const startReading = () => {
    setGameState('shuffling');
    setTimeout(() => setGameState('dealing'), 2000);
  };

  const selectCard = () => {
    if (gameState !== 'dealing') return;
    const rand = Math.random();
    let drawnCard;
    if (rand < 0.03) {
      const secrets = TAROT_DATA.filter(c => c.rarity === 4);
      drawnCard = secrets[Math.floor(Math.random() * secrets.length)];
    } else {
      const normals = TAROT_DATA.filter(c => c.rarity < 4);
      drawnCard = normals[Math.floor(Math.random() * normals.length)];
    }

    setSelectedCard(drawnCard);
    setGameState('revealing');
    if (navigator.vibrate) navigator.vibrate(200);

    setTimeout(() => {
      setGameState('result');
      addToCollection(drawnCard.id);
      setTimeout(() => {
        setIsFlipped(true);
        if (drawnCard.rarity >= 3 && window.confetti) {
          window.confetti({
            particleCount: drawnCard.rarity === 4 ? 200 : 100,
            spread: 80, origin: { y: 0.6 },
            colors: ['#FFC0CB', '#FFD700', '#87CEFA', '#9370DB']
          });
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        }
      }, 100);
    }, 2500);
  };

  const resetReading = () => {
    setIsFlipped(false);
    try { window.history.replaceState({}, '', window.location.pathname); } catch (e) {}
    setTimeout(() => {
      setGameState('start');
      setSelectedCard(null);
      setPartnerCard(null);
    }, 300);
  };

  const handleShare = async () => {
    if (!selectedCard) return;
    const shareUrl = `https://ani-taro-app.vercel.app/?partner=${selectedCard.id}`;
    let shareText = '';

    if (partnerCard) {
      const comp = getCompatibility(selectedCard.id, partnerCard.id);
      const compText = comp.text.replace(/\n/g, ' '); 
      shareText = `#AniTaro 相性チェック！\nあなた「${selectedCard.animal}」\nお友達「${partnerCard.animal}」\n\n相性度は【 ${comp.score}% 】✨\n${compText}\n\n▼あなたも占ってみる？\n${shareUrl}`;
    } else {
      const rarityStars = "★".repeat(selectedCard.rarity);
      shareText = `#AniTaro 運勢レア度：${rarityStars}\n今日の相棒は「${selectedCard.animal}」！\n\n🔮 ${selectedCard.title}\n\n▼私との相性を占ってみる？\n${shareUrl}`;
    }

    if (navigator.share) {
      try { await navigator.share({ text: shareText }); } catch (err) {}
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  // 🌟 画像保存処理（オフスクリーンで横型4:3レイアウトをキャプチャ）
  const handleDownload = useCallback(() => {
    if (captureRef.current === null) return;
    if (!window.htmlToImage) {
      alert("準備中です。数秒後にもう一度お試しください。");
      return;
    }
    
    setIsGenerating(true); 
    const bgColors = { day: '#fff0f5', sunset: '#fff7ed', night: '#1e1b4b' };
    
    // 少し待ってから生成を開始し、画面のレンダリングサイクルを確保する
    setTimeout(() => {
      window.htmlToImage.toPng(captureRef.current, { 
        cacheBust: true, 
        backgroundColor: bgColors[theme],
        pixelRatio: 2 // 高画質で出力
      })
        .then((dataUrl) => {
          setGeneratedImage(dataUrl); 
          setIsGenerating(false);
        })
        .catch((err) => {
          console.error('画像生成エラー:', err);
          alert("画像の生成に失敗しました🙇‍♂️");
          setIsGenerating(false);
        });
    }, 150);
  }, [captureRef, selectedCard, theme]);

  const themeStyles = {
    day: "bg-[#fff0f5] text-gray-800",
    sunset: "bg-orange-50 text-orange-950",
    night: "bg-indigo-950 text-indigo-100"
  };

  return (
    <div className={`min-h-screen ${themeStyles[theme]} font-sans flex flex-col items-center overflow-x-clip selection:bg-pink-200 transition-colors duration-1000`}>
      <header className="w-full p-4 flex justify-between items-center max-w-md mx-auto z-30">
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-xl shadow-md rotate-3 border-2 border-pink-200">
            <Sparkles className="w-5 h-5 text-pink-400 fill-pink-100" />
          </div>
          <h1 className={`font-black text-2xl tracking-tighter italic transform -skew-x-6 drop-shadow-sm ${theme === 'night' ? 'text-white' : 'text-gray-700'}`}>
            Ani-Taro<span className="text-pink-400">!</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsCollectionOpen(true)} className={`p-2.5 rounded-full shadow-sm hover:scale-110 transition-transform relative ${theme === 'night' ? 'bg-indigo-900/80 text-white border border-indigo-500/50' : 'bg-white text-pink-500 border border-white'}`}>
            <Book className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md flex flex-col items-center justify-start pt-6 p-6 relative">
        {theme === 'day' && (
          <>
            <div className="absolute top-1/4 -left-10 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-1/3 -right-10 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-56 h-56 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
          </>
        )}
        {theme === 'sunset' && (
          <>
            <div className="absolute top-1/4 -left-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-1/3 -right-10 w-56 h-56 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </>
        )}
        {theme === 'night' && (
          <>
            <div className="absolute top-1/4 -left-10 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob"></div>
            <div className="absolute top-1/3 -right-10 w-56 h-56 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-ping opacity-70"></div>
            <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-50"></div>
            <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-60"></div>
          </>
        )}

        {gameState === 'start' && (
          <div className="flex flex-col items-center text-center w-full z-10">
            {partnerCard && (
              <div className={`mb-6 p-4 rounded-3xl backdrop-blur-md border shadow-lg flex flex-col items-center w-full max-w-[280px] animate-fade-in ${theme === 'night' ? 'bg-pink-900/40 border-pink-500/50' : 'bg-white/80 border-pink-200'}`}>
                <div className="text-xs font-black text-pink-500 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> お友達からのお誘い！ <Sparkles className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {partnerCard.image ? (
                      <img src={partnerCard.image} alt={partnerCard.animal} className="max-w-full max-h-full object-contain filter drop-shadow-sm" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    ) : null}
                    <div className="text-3xl filter drop-shadow-sm" style={{ display: partnerCard.image ? 'none' : 'block' }}>{partnerCard.emoji}</div>
                  </div>
                  <div className={`text-sm font-bold ${theme === 'night' ? 'text-pink-100' : 'text-gray-700'}`}>
                    「{partnerCard.animal}」との<br/>相性を占おう🐾
                  </div>
                </div>
              </div>
            )}

            <div className={`relative group cursor-pointer transform hover:scale-105 transition-transform duration-300 ${!partnerCard && 'mt-8'}`} onClick={startReading}>
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse"></div>
              <div className="relative w-60 h-80"><CardBack /></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-pink-500 px-8 py-3 rounded-full shadow-xl border-4 border-pink-100 whitespace-nowrap z-20 hover:scale-105 transition-transform">
                <span className="text-sm font-black tracking-widest flex items-center gap-2"><Star className="w-4 h-4 fill-pink-400" /> TAP TO START</span>
              </div>
            </div>
            
            <div className={`space-y-3 mt-16 p-4 rounded-2xl backdrop-blur-sm border ${theme === 'night' ? 'bg-indigo-900/50 border-indigo-500/30' : 'bg-white/50 border-white/50'}`}>
              <h2 className="text-xl font-black tracking-tight">今日の相棒を見つけよう♪</h2>
              <p className={`text-sm font-bold ${theme === 'night' ? 'text-indigo-200' : 'text-gray-500'}`}>★3が出たら超ラッキー！<br/>個性豊かな動物たちが占うよ🐾</p>
            </div>
          </div>
        )}

        {gameState === 'shuffling' && (
          <div className="relative w-full h-64 flex items-center justify-center z-10 mt-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-36 h-56 transition-all duration-500 ease-in-out shadow-xl rounded-2xl" style={{ animation: `shuffle 0.5s infinite alternate ${i * 0.1}s`, zIndex: i }}>
                <CardBack />
              </div>
            ))}
            <div className="absolute -bottom-24 bg-white/80 px-6 py-2 rounded-full shadow-sm text-pink-500">
              <p className="font-bold animate-pulse text-lg tracking-widest">SHUFFLING...</p>
            </div>
          </div>
        )}

        {gameState === 'dealing' && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-8 animate-fade-in z-10 mt-4">
            <h2 className={`text-xl font-black px-6 py-3 rounded-full backdrop-blur-sm shadow-md border ${theme === 'night' ? 'bg-indigo-900/80 text-white border-indigo-500/50' : 'bg-white/80 text-gray-700 border-white'}`}>直感で1枚選んでね！</h2>
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs perspective-1000">
              {[...Array(6)].map((_, i) => (
                <button key={i} onClick={selectCard} className="w-full aspect-[2/3] transform hover:-translate-y-4 hover:rotate-2 transition-all duration-300 focus:outline-none drop-shadow-md hover:drop-shadow-xl" style={{ animation: `dealCard 0.5s ease-out ${i * 0.1}s backwards` }}>
                  <CardBack />
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'revealing' && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-8 animate-fade-in z-40 relative mt-10">
            <div className="absolute inset-0 bg-white/20 animate-pulse mix-blend-overlay"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-[100px] animate-pulse-fast"></div>
            <div className="relative w-64 h-[400px] animate-shake"><CardBack /></div>
            <h2 className="text-2xl font-black text-pink-500 drop-shadow-lg animate-pulse tracking-widest bg-white/90 px-6 py-2 rounded-full">運命のカードは...!?</h2>
          </div>
        )}

        {gameState === 'result' && selectedCard && (
          <div className="w-full flex flex-col items-center animate-fade-in pb-10 z-20">
            <div className="w-full flex flex-col items-center pt-2 pb-4 px-2">
              <div className="perspective-1000 w-72 h-[450px] cursor-pointer mb-6 relative z-20 touch-pan-y" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  <div className="absolute w-full h-full backface-hidden"><CardBack /></div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 drop-shadow-2xl"><CardFront data={selectedCard} /></div>
                </div>
              </div>

              <div className={`w-full max-w-sm rounded-[2rem] p-6 shadow-xl border-2 transform transition-all duration-700 delay-300 z-10 ${isFlipped ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${theme === 'night' ? 'bg-indigo-900/90 border-indigo-500/30' : 'bg-white/90 border-white'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-pink-500 text-white p-1.5 rounded-lg shadow-sm"><Zap className="w-4 h-4 fill-white" /></span>
                  <span className={`text-xs font-black uppercase tracking-widest ${theme === 'night' ? 'text-indigo-200' : 'text-gray-400'}`}>MESSAGE</span>
                </div>
                <p className={`text-base leading-relaxed font-medium ${theme === 'night' ? 'text-indigo-50' : 'text-gray-700'}`}>{selectedCard.desc}</p>
              </div>

              {partnerCard && isFlipped && (
                <div className={`w-full max-w-sm mt-4 rounded-[2rem] p-6 shadow-xl border-2 transform transition-all duration-700 delay-[800ms] animate-fade-in ${theme === 'night' ? 'bg-pink-900/40 border-pink-500/30' : 'bg-pink-50/90 border-pink-200'}`}>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
                    <span className={`text-sm font-black tracking-widest ${theme === 'night' ? 'text-pink-200' : 'text-pink-600'}`}>相性チェック</span>
                    <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
                  </div>
                  <div className="flex justify-around items-center mb-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center">
                        {selectedCard.image ? (
                          <img src={selectedCard.image} alt="you" className="max-w-full max-h-full object-contain filter drop-shadow-md" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        ) : null}
                        <div className="text-4xl filter drop-shadow-md" style={{ display: selectedCard.image ? 'none' : 'block' }}>{selectedCard.emoji}</div>
                      </div>
                      <div className={`text-[10px] font-black mt-1 bg-white/50 px-2 py-0.5 rounded-full ${theme === 'night' ? 'text-indigo-900' : 'text-gray-700'}`}>あなた</div>
                    </div>
                    
                    <div className="flex flex-col items-center z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-pink-200 shadow-md transform hover:scale-110 transition-transform">
                       <div className="text-2xl font-black text-pink-500 leading-none">{getCompatibility(selectedCard.id, partnerCard.id).score}<span className="text-sm">%</span></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center">
                        {partnerCard.image ? (
                          <img src={partnerCard.image} alt="partner" className="max-w-full max-h-full object-contain filter drop-shadow-md" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        ) : null}
                        <div className="text-4xl filter drop-shadow-md" style={{ display: partnerCard.image ? 'none' : 'block' }}>{partnerCard.emoji}</div>
                      </div>
                      <div className={`text-[10px] font-black mt-1 bg-white/50 px-2 py-0.5 rounded-full ${theme === 'night' ? 'text-indigo-900' : 'text-gray-700'}`}>お友達</div>
                    </div>
                  </div>
                  {/* テキストを改行して表示 */}
                  <p className={`text-sm text-center font-bold px-2 leading-relaxed ${theme === 'night' ? 'text-pink-100' : 'text-gray-700'}`}>
                    {getCompatibility(selectedCard.id, partnerCard.id).text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}<br/>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}
            </div>

            <div className={`flex flex-col gap-3 w-full max-w-sm px-2 mt-2 transition-all duration-700 delay-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex gap-3">
                <button onClick={resetReading} className={`flex-1 py-3.5 border-2 rounded-2xl font-bold active:scale-95 transition-all flex items-center justify-center gap-2 ${theme === 'night' ? 'bg-indigo-950 border-indigo-800 text-indigo-300 hover:bg-indigo-900' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}><RefreshCw className="w-5 h-5" /> もう一度</button>
                <button onClick={handleShare} className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-200/50 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"><Share2 className="w-5 h-5" /> シェア</button>
              </div>
              <button 
                onClick={handleDownload} 
                disabled={isGenerating}
                className="w-full py-3.5 bg-gray-800 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border border-gray-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />} 
                {isGenerating ? "画像を作成中..." : "画像として保存する"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 🌟 【画像生成用】非表示エリア (1024x768 の余裕を持たせた4:3 横型レイアウト) */}
      {selectedCard && (
        <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', pointerEvents: 'none' }}>
          <div ref={captureRef} className={`w-[1024px] h-[768px] flex items-center justify-center p-12 gap-12 ${themeStyles[theme]} font-sans`}>
            
            {/* 左側: カード */}
            <div className="w-[360px] h-[580px] shrink-0">
              <CardFront data={selectedCard} size="large" />
            </div>

            {/* 右側: 情報エリア (ロゴ、メッセージ、相性) */}
            <div className="flex-1 flex flex-col gap-8 h-full justify-center">
              
              {/* ヘッダーロゴ */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-md rotate-3 border-2 border-pink-200 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-pink-400 fill-pink-100" />
                </div>
                <h1 className={`font-black text-5xl tracking-tighter italic transform -skew-x-6 drop-shadow-sm ${theme === 'night' ? 'text-white' : 'text-gray-700'}`}>
                  Ani-Taro<span className="text-pink-400">!</span>
                </h1>
              </div>

              {/* メッセージ */}
              <div className={`w-full rounded-[2rem] p-8 shadow-xl border-2 flex flex-col ${theme === 'night' ? 'bg-indigo-900/90 border-indigo-500/30' : 'bg-white/90 border-white'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-pink-500 text-white p-2.5 rounded-xl shadow-sm"><Zap className="w-6 h-6 fill-white" /></span>
                  <span className={`text-lg font-black uppercase tracking-widest ${theme === 'night' ? 'text-indigo-200' : 'text-gray-400'}`}>MESSAGE</span>
                </div>
                <p className={`text-2xl leading-relaxed font-medium break-words whitespace-pre-wrap tracking-wide ${theme === 'night' ? 'text-indigo-50' : 'text-gray-700'}`}>{selectedCard.desc}</p>
              </div>

              {/* 相性チェック（あれば） */}
              {partnerCard && (
                <div className={`w-full rounded-[2rem] p-8 shadow-xl border-2 shrink-0 ${theme === 'night' ? 'bg-pink-900/40 border-pink-500/30' : 'bg-pink-50/90 border-pink-200'}`}>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                    <span className={`text-xl font-black tracking-widest ${theme === 'night' ? 'text-pink-200' : 'text-pink-600'}`}>相性チェック</span>
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                  </div>
                  <div className="flex justify-around items-center mb-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 flex items-center justify-center">
                        {selectedCard.image ? (
                          <img src={selectedCard.image} alt="you" className="max-w-full max-h-full object-contain filter drop-shadow-md" loading="eager" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        ) : null}
                        <div className="text-6xl filter drop-shadow-md" style={{ display: selectedCard.image ? 'none' : 'block' }}>{selectedCard.emoji}</div>
                      </div>
                      <div className={`text-sm font-black mt-3 bg-white/70 px-4 py-1.5 rounded-full shadow-sm ${theme === 'night' ? 'text-indigo-900' : 'text-gray-700'}`}>あなた</div>
                    </div>
                    <div className="flex flex-col items-center z-10 bg-white/90 px-8 py-3 rounded-full border-4 border-pink-200 shadow-md">
                       <div className="text-5xl font-black text-pink-500 leading-none">{getCompatibility(selectedCard.id, partnerCard.id).score}<span className="text-2xl">%</span></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 flex items-center justify-center">
                        {partnerCard.image ? (
                          <img src={partnerCard.image} alt="partner" className="max-w-full max-h-full object-contain filter drop-shadow-md" loading="eager" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        ) : null}
                        <div className="text-6xl filter drop-shadow-md" style={{ display: partnerCard.image ? 'none' : 'block' }}>{partnerCard.emoji}</div>
                      </div>
                      <div className={`text-sm font-black mt-3 bg-white/70 px-4 py-1.5 rounded-full shadow-sm ${theme === 'night' ? 'text-indigo-900' : 'text-gray-700'}`}>お友達</div>
                    </div>
                  </div>
                  <p className={`text-xl text-center font-bold px-4 leading-relaxed ${theme === 'night' ? 'text-pink-100' : 'text-gray-700'}`}>
                    {getCompatibility(selectedCard.id, partnerCard.id).text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}<br/></React.Fragment>
                    ))}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 🌟 画像保存用モーダル（長押し保存対応＆背景タップで戻れる） */}
      {generatedImage && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-fade-in" onClick={() => setGeneratedImage(null)}>
          <div className="w-full max-w-[800px] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <div className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold mb-4 shadow-lg flex items-center gap-2 animate-bounce pointer-events-none">
              <Download className="w-5 h-5" /> 画像を長押しして保存！
            </div>
            
            {/* スクロール可能な画像表示エリア (影を削除しスッキリ) */}
            <div className="relative w-full max-h-[70vh] overflow-y-auto rounded-xl mb-6 hide-scrollbar flex justify-center">
              {/* pointer-events-auto を指定して長押しメニューが確実に反応するようにする */}
              <img src={generatedImage} alt="Result" className="w-full max-w-full h-auto object-contain pointer-events-auto" />
            </div>

            {/* 下部の大きな閉じるボタン */}
            <button onClick={() => setGeneratedImage(null)} className="bg-white text-gray-800 px-8 py-3.5 rounded-full font-black hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2 w-[80%] max-w-xs">
              閉じる
            </button>
          </div>
        </div>
      )}

      {isCollectionOpen && (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto pb-20 px-4 pt-4 animate-fade-in hide-scrollbar" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
             <div className="w-full max-w-md mx-auto flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-2xl mb-6 sticky top-0 z-10 border border-white/20 shadow-md">
               <button onClick={() => setIsCollectionOpen(false)} className="text-white flex items-center font-bold bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition shadow-sm"><X className="w-5 h-5 mr-1" /> 閉じる</button>
               <div className="text-right">
                 <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Collection</div>
                 <div className="text-pink-300 font-black text-xl leading-none">{collection.length} <span className="text-sm text-white/50">/ {TAROT_DATA.length}</span></div>
               </div>
             </div>

             <div className="w-full max-w-md mx-auto grid grid-cols-3 gap-3">
               {TAROT_DATA.map(card => {
                 const collectedItem = collection.find(item => item.id === card.id);
                 const isCollected = !!collectedItem;
                 const isSecret = card.rarity === 4;
                 
                 return (
                   <div key={card.id} onClick={() => isCollected && setCollectionDetailCard({ card, dates: collectedItem.dates })} className={`aspect-[2/3] rounded-2xl border-2 flex flex-col items-center justify-between p-2 text-center transition-all ${isCollected ? card.bgGradient + ' border-white/80 shadow-lg cursor-pointer hover:scale-105 active:scale-95' : 'bg-gray-800/80 border-gray-700 shadow-inner'}`}>
                     {isCollected ? (
                       <>
                         <div className={`text-[8px] font-black tracking-widest bg-white/90 px-1.5 py-0.5 rounded-full ${card.textColor} uppercase w-full truncate mb-1 shadow-sm`}>{card.name}</div>
                         <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                           {card.image ? (
                             <img src={card.image} alt={card.animal} className="w-12 h-12 object-contain filter drop-shadow-md" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                           ) : null}
                           <div className="text-4xl filter drop-shadow-md emoji-pop" style={{ display: card.image ? 'none' : 'block' }}>{card.emoji}</div>
                         </div>
                         <div className="flex gap-0.5 mt-1 bg-white/50 px-1.5 py-0.5 rounded-full shadow-sm">
                           {[...Array(isSecret ? 4 : card.rarity)].map((_, i) => <Star key={i} className={`w-2 h-2 ${isSecret ? 'fill-pink-400 text-pink-500' : 'fill-yellow-400 text-yellow-500'}`} />)}
                         </div>
                       </>
                     ) : (
                       <div className="flex-1 flex flex-col items-center justify-center w-full">
                         <div className="text-2xl text-gray-600/50 font-black mb-2">?</div>
                         <div className="text-[9px] font-bold text-gray-600/50 uppercase tracking-wider">{isSecret ? 'Secret' : 'Unknown'}</div>
                       </div>
                     )}
                   </div>
                 );
               })}
             </div>
          </div>

          {collectionDetailCard && (
             <div key={collectionDetailCard.card.id} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setCollectionDetailCard(null)}>
               <div className="relative w-full max-w-sm flex flex-col items-center animate-dealCard">
                 <div ref={detailScrollRef} className="w-full max-h-[85vh] overflow-y-auto hide-scrollbar rounded-3xl pb-6 pt-2" onClick={e => e.stopPropagation()}>
                   
                   {/* バツボタンをスクロール内に移動 */}
                   <div className="flex justify-end px-4 mb-2">
                     <button onClick={() => setCollectionDetailCard(null)} className="bg-white/20 text-white p-2.5 rounded-full hover:bg-white/40 transition backdrop-blur-sm shadow-md"><X className="w-5 h-5" /></button>
                   </div>

                   {/* ここでサイズ"small"を指定して描画崩れを防ぐ */}
                   <div className="w-56 h-[350px] mx-auto mb-6 relative shrink-0"><CardFront data={collectionDetailCard.card} size="small" /></div>
                   <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 shadow-2xl border-2 border-white text-gray-800 relative mx-2">
                     <div className="flex items-center gap-2 mb-3">
                       <span className="bg-pink-500 text-white p-1 rounded-lg"><Zap className="w-3 h-3 fill-white" /></span>
                       <span className="text-xs font-black uppercase tracking-widest text-gray-400">MESSAGE</span>
                     </div>
                     <p className="text-sm leading-relaxed font-medium text-gray-700 mb-6">{collectionDetailCard.card.desc}</p>
                     <div className="w-full h-px bg-gray-200 mb-5"></div>
                     <div className="flex items-center gap-2 mb-3">
                       <span className="bg-indigo-500 text-white p-1 rounded-lg"><Book className="w-3 h-3 fill-white" /></span>
                       <span className="text-xs font-black uppercase tracking-widest text-gray-400">取得履歴 ({collectionDetailCard.dates.length}回)</span>
                     </div>
                     <div className="max-h-36 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                       {collectionDetailCard.dates.map((d, i) => (
                         <div key={i} className="text-xs font-bold text-gray-600 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                           <span className="tracking-wide">{new Date(d).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                           <span className="text-gray-400 tracking-wider">{new Date(d).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          )}
        </>
      )}

      <style>{`
        .capture-mode * { font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif !important; }
        .emoji-pop { text-shadow: 3px 3px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 0px 0 #fff, -3px 0px 0 #fff, 0px 3px 0 #fff, 0px -3px 0 #fff; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        @keyframes shuffle { 0% { transform: translateX(0) rotate(0); } 50% { transform: translateX(20px) rotate(5deg); } 100% { transform: translateX(-20px) rotate(-5deg); } }
        @keyframes dealCard { from { opacity: 0; transform: translateY(50px) scale(0.8); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes shake { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px) rotate(-2deg); } 20%, 40%, 60%, 80% { transform: translate(2px, 2px) rotate(2deg); } }
        @keyframes pulse-fast { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-shake { animation: shake 0.4s infinite; }
        .animate-pulse-fast { animation: pulse-fast 0.6s infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}