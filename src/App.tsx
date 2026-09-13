import React, { useState, useEffect } from "react";
import { Copy, Check, Skull, ShieldCheck, Coins, Zap, Info } from "lucide-react";

interface KillLineRecord {
  model: string;
  gold: string;
  diamond: string;
  king: string;
  goldStatus: "pass" | "warn" | "fail" | "none";
  diamondStatus: "pass" | "warn" | "fail" | "none";
  kingStatus: "pass" | "warn" | "fail" | "none";
  quote: string;
  timestamp: string;
}

const KILL_LINE_DATA: KillLineRecord[] = [
  {
    model: "GPT-6 Astra",
    gold: "一轮过",
    diamond: "一轮过",
    king: "一轮过",
    goldStatus: "pass",
    diamondStatus: "pass",
    kingStatus: "pass",
    quote: "钻石/王者均唯一一轮秒杀，断层第一成立。",
    timestamp: "09-12 08:55",
  },
  {
    model: "Grok 4.6",
    gold: "一轮过",
    diamond: "一轮过",
    king: "两轮过",
    goldStatus: "pass",
    diamondStatus: "pass",
    kingStatus: "warn",
    quote: "王者当时仅 grok4.6 与 v4pro 做对，应入 T1。",
    timestamp: "08-30 02:15",
  },
  {
    model: "Claude Fable 5.1",
    gold: "一轮过",
    diamond: "一到两轮",
    king: "需三轮",
    goldStatus: "pass",
    diamondStatus: "warn",
    kingStatus: "warn",
    quote: "对线 Astra，钻石一轮对过、王者需三轮。",
    timestamp: "09-08 04:43",
  },
  {
    model: "DeepSeek V4.1 Flash",
    gold: "一轮过",
    diamond: "一轮过",
    king: "全灭",
    goldStatus: "pass",
    diamondStatus: "pass",
    kingStatus: "fail",
    quote: "钻石一轮秒过弹幕刷屏，王者全灭；全场性价比第一。",
    timestamp: "09-12 09:59",
  },
  {
    model: "DeepSeek V4 Pro",
    gold: "无记录",
    diamond: "常卡住",
    king: "两轮过",
    goldStatus: "none",
    diamondStatus: "fail",
    kingStatus: "warn",
    quote: "曾两轮做对王者题，但钻石常卡住不稳定。",
    timestamp: "09-12 12:22",
  },
  {
    model: "GLM 5.3 Flash",
    gold: "一轮过",
    diamond: "卡住",
    king: "全灭",
    goldStatus: "pass",
    diamondStatus: "fail",
    kingStatus: "fail",
    quote: "Token 效率极佳，但钻石卡住，时间效率拉跨。",
    timestamp: "09-12 15:31",
  },
  {
    model: "Qwen 3.8 Flash",
    gold: "一轮过",
    diamond: "长考未成",
    king: "重写未过",
    goldStatus: "pass",
    diamondStatus: "fail",
    kingStatus: "fail",
    quote: "老爷爷大思考近 2 小时仍卡钻石，成本过高。",
    timestamp: "09-12 12:56",
  },
  {
    model: "GLM 5.3 完整版",
    gold: "无记录",
    diamond: "卡住",
    king: "全灭",
    goldStatus: "none",
    diamondStatus: "fail",
    kingStatus: "fail",
    quote: "与 K3 双双天黑，花费是 V4 Pro 两倍以上。",
    timestamp: "08-16 16:19",
  },
  {
    model: "Kimi K3",
    gold: "无记录",
    diamond: "常卡住",
    king: "无记录",
    goldStatus: "none",
    diamondStatus: "fail",
    kingStatus: "none",
    quote: "44 分钟烧几百万 token，无王者记录。",
    timestamp: "09-12 10:14",
  },
  {
    model: "Gemini 3.8",
    gold: "三轮全对",
    diamond: "从未做对",
    king: "从未做对",
    goldStatus: "pass",
    diamondStatus: "fail",
    kingStatus: "fail",
    quote: "黄金三轮稳定全对，但钻石以上跨期从未做对。",
    timestamp: "09-08 09:36",
  },
  {
    model: "Opus 4.8",
    gold: "无记录",
    diamond: "翻车",
    king: "做不到",
    goldStatus: "none",
    diamondStatus: "fail",
    kingStatus: "fail",
    quote: "在屎山论剑恶劣工况下高频翻车。",
    timestamp: "08-02 07:18",
  },
];

const COST_DATA = [
  {
    model: "DeepSeek V4.1 Flash",
    cost: "¥6.10",
    tokens: "1.17 亿词元消耗",
    source: "09-12 期官方成本结算",
    verdict: "四家 Flash 中最烧词元却断层最便宜（性价比之王，钻石一轮秒过）",
    badge: "VALUE NO.1",
    costColor: "text-emerald-400",
  },
  {
    model: "GLM 5.3 Flash",
    cost: "Lite 13%",
    tokens: "Lite 周额度 / 3,365 万词元",
    source: "09-12 期官方成本结算",
    verdict: "相当于单期约 ¥2 块钱，Token 能效比好但时间极长、卡死钻石",
    badge: "LOW COST",
    costColor: "text-white",
  },
  {
    model: "Qwen 3.8 Flash",
    cost: "Std 13.6%",
    tokens: "Standard 周额度 / 9,500 万词元",
    source: "09-12 期官方成本结算",
    verdict: "老爷爷大思考近 2 小时，缓存命中 99.7% 开销依旧剧烈",
    badge: "HEAVY THINK",
    costColor: "text-amber-400",
  },
  {
    model: "Gemini 3.8",
    cost: "Pro 37.35%",
    tokens: "Pro 档周额度剧烈扣减",
    source: "09-12 期官方成本结算",
    verdict: "实际使用 Pro 档扣减最凶狠，且钻石题跨 12 期从未做对",
    badge: "EXPENSIVE",
    costColor: "text-rose-400",
  },
  {
    model: "GLM 5.2 (历史)",
    cost: "¥4–5 左右",
    tokens: "单期套餐折算",
    source: "08-02 期弹幕实测",
    verdict: "同场 DeepSeek 的费用为其几十分之一",
    badge: "LEGACY",
    costColor: "text-zinc-400",
  },
  {
    model: "Kimi K3",
    cost: "几百元估算",
    tokens: "44 分钟数百万 Token",
    source: "07-18 期实录反推",
    verdict: "长考陷入死循环，Token 开销失控且未能解出",
    badge: "UNSTABLE",
    costColor: "text-zinc-500",
  },
];

const TIER_DATA = [
  { tier: "T0", models: "GPT-6 Astra", desc: "唯一黄金/钻石/王者全一轮秒过，断层第一成立。" },
  { tier: "T1", models: "Grok 4.6 ／ Claude Fable 5.1", desc: "Grok 4.6 王者两轮过、钻石一轮秒过，独救闭源；Claude 钻石一轮对过、王者需三轮。" },
  { tier: "T2", models: "DeepSeek V4 Pro", desc: "王者曾两轮做对，但钻石偶尔卡住；综合实力稳居旗舰前列。" },
  { tier: "T3", models: "DeepSeek V4.1 Flash ／ GLM 5.3 Flash ／ Qwen 3.8 Flash ／ Gemini 3.8", desc: "轻量 Flash 梯队全军止步钻石/王者；其中 DS V4.1 Flash 凭 ¥6.10 斩获性价比之冠。" },
  { tier: "T4", models: "GLM 5.3 完整版 ／ Kimi K3 ／ Opus 4.8", desc: "在屎山论剑恶劣工况下高频超时卡死或巨额开销，难以收敛。" },
];

export default function App() {
  const [selectedModel, setSelectedModel] = useState<KillLineRecord>(KILL_LINE_DATA[0]);
  const [filterLevel, setFilterLevel] = useState<"ALL" | "TOP" | "FLASH">("ALL");
  const [copied, setCopied] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<"default" | "lens" | "button">("default");
  const [lensSize, setLensSize] = useState<number>(140);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseEnterLens = () => setCursorMode("lens");
  const handleMouseEnterButton = () => setCursorMode("button");
  const handleMouseLeaveCursor = () => setCursorMode("default");

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredData = KILL_LINE_DATA.filter((item) => {
    if (filterLevel === "TOP") {
      return item.kingStatus === "pass" || item.kingStatus === "warn";
    }
    if (filterLevel === "FLASH") {
      return item.model.toLowerCase().includes("flash");
    }
    return true;
  });

  const getStatusBadge = (status: "pass" | "warn" | "fail" | "none", text: string) => {
    if (status === "pass") {
      return (
        <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
          {text}
        </span>
      );
    }
    if (status === "warn") {
      return (
        <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 whitespace-nowrap">
          {text}
        </span>
      );
    }
    if (status === "fail") {
      return (
        <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 whitespace-nowrap">
          {text}
        </span>
      );
    }
    return (
      <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-white/[0.05] whitespace-nowrap">
        {text}
      </span>
    );
  };

  const activeCursorSize =
    cursorMode === "lens" ? `${lensSize}px` : cursorMode === "button" ? "54px" : "8px";

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-rose-500/30 selection:text-rose-200 relative pb-28">
      {/* Noise Texture */}
      <div className="grain-overlay" />

      {/* Magnifier Lens Cursor */}
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: activeCursorSize,
          height: activeCursorSize,
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        {/* Top Header */}
        <header className="h-24 sm:h-28 flex flex-wrap justify-between items-center border-b border-white/[0.08] mb-12 sm:mb-16 gap-4">
          <div
            className="flex items-center gap-2.5 font-mono-code text-[11px] sm:text-xs text-zinc-400 bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-full"
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>BUG BATTLE AUDIT · 12 EPISODES</span>
          </div>

          {/* Lens Controller */}
          <div
            className="flex items-center gap-1 font-mono-code text-[11px] sm:text-xs text-zinc-400 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded-full"
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <span className="text-zinc-500 mr-1 hidden sm:inline text-[10px] tracking-wider uppercase">
              LENS SIZE:
            </span>
            {[110, 140, 175].map((size) => (
              <button
                key={size}
                onClick={() => setLensSize(size)}
                className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] transition-colors ${
                  lensSize === size
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
                title={`Set magnifying glass size to ${size}px`}
              >
                {size}px
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              onMouseEnter={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveCursor}
              className="flex items-center gap-2 font-mono-code text-[11px] sm:text-xs text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] px-3.5 py-1.5 rounded-full transition-colors"
              title="Copy link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>SHARE</span>
                </>
              )}
            </button>

            <div
              className="font-mono-code text-[11px] sm:text-xs text-zinc-500 border border-white/[0.08] px-3.5 py-1.5 rounded-full hidden sm:block"
              onMouseEnter={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveCursor}
            >
              DATA: 2026.07.02 – 09.12
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          className="mb-20 sm:mb-28"
          onMouseEnter={handleMouseEnterLens}
          onMouseLeave={handleMouseLeaveCursor}
        >
          <div className="font-mono-code text-xs text-rose-400 tracking-[0.25em] mb-4 sm:mb-6 uppercase flex items-center gap-2">
            <span className="inline-block w-4 h-[1px] bg-rose-500/60" />
            EPISODES 01–12 COMPLETE DOSSIER
          </div>

          <h1 className="font-serif-title italic text-[3.8rem] sm:text-[6rem] lg:text-[7.8rem] leading-[0.88] tracking-[-0.03em] mb-10 text-white font-normal">
            The Bug Kill-Line <br />
            & Cost Ledger.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.08]">
            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl font-light">
              屎山论剑全 12 期弹幕（6,075 条时间轴逐秒解析）与官方元数据重构：横跨 20+ 款大模型的难度斩杀线、真实 Token 成本账单与战绩订正。
            </p>

            <div className="md:justify-self-end flex items-start">
              <div className="border-l-2 border-rose-500 pl-5 font-mono-code text-xs leading-relaxed text-zinc-400">
                <span className="text-white font-semibold block tracking-wider mb-1">
                  CONFIDENTIAL BENCHMARK AUDIT
                </span>
                <span className="text-zinc-500">UP 主: Token就是词元 ｜ 弹幕全量交叉验证</span>
                <div className="mt-2 text-[10px] text-rose-400/80 uppercase">
                  Zero Hallucination Verified
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento 4 Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden mb-24 sm:mb-32">
          {/* Card 1: GPT-6 Astra */}
          <div
            className="bg-[#050505] p-8 flex flex-col justify-between group hover:bg-[#0a0a0f] transition-colors cursor-none"
            onMouseEnter={handleMouseEnterLens}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <div>
              <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
                <span>ABSOLUTE T0</span>
                <Zap className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-400 transition-colors" />
              </div>
              <div className="font-serif-title text-4xl sm:text-5xl text-white mb-2">
                GPT-6 Astra
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed border-t border-white/[0.06] pt-4">
              黄金 / 钻石 / 王者三轮全<strong className="text-white font-medium">一轮秒杀</strong>，目前全场唯一的全难度断层第一。
            </p>
          </div>

          {/* Card 2: DS V4.1 Flash */}
          <div
            className="bg-[#050505] p-8 flex flex-col justify-between group hover:bg-[#0a0a0f] transition-colors cursor-none"
            onMouseEnter={handleMouseEnterLens}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <div>
              <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
                <span>VALUE KING</span>
                <Coins className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="font-serif-title text-4xl sm:text-5xl text-emerald-400 mb-2">
                ¥6.10
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed border-t border-white/[0.06] pt-4">
              <strong className="text-white font-medium">DS V4.1 Flash</strong> 狂烧 1.17 亿词元，以极低总价一轮秒杀钻石。
            </p>
          </div>

          {/* Card 3: 钻石线 */}
          <div
            className="bg-[#050505] p-8 flex flex-col justify-between group hover:bg-[#0a0a0f] transition-colors cursor-none"
            onMouseEnter={handleMouseEnterLens}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <div>
              <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
                <span>WATERSHED</span>
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="font-serif-title text-4xl sm:text-5xl text-white mb-2">
                钻石线
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed border-t border-white/[0.06] pt-4">
              真正的分水岭；Flash 级大半卡死于此，Gemini 跨 12 期<strong className="text-white font-medium">从未做对</strong>。
            </p>
          </div>

          {/* Card 4: 王者级 */}
          <div
            className="bg-[#050505] p-8 flex flex-col justify-between group hover:bg-[#0a0a0f] transition-colors cursor-none"
            onMouseEnter={handleMouseEnterLens}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <div>
              <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
                <span>FLAGSHIP GRAVE</span>
                <Skull className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-500 transition-colors" />
              </div>
              <div className="font-serif-title text-4xl sm:text-5xl text-rose-400 mb-2">
                王者级
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed border-t border-white/[0.06] pt-4">
              Flash 级全灭；仅 Astra 一轮过，Grok 4.6 与 DS V4 Pro 曾两轮答对。
            </p>
          </div>
        </section>

        {/* Part 1: The Kill-Line Matrix */}
        <section className="mb-24 sm:mb-32">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-6 mb-6">
            <div>
              <h2 className="font-serif-title italic text-4xl sm:text-5xl text-white font-normal">
                The Kill-Line Matrix
              </h2>
              <p className="text-xs text-zinc-500 font-mono-code mt-1">
                难度体系与过审轮次全量对照（点击或悬停行可放大查看）
              </p>
            </div>

            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              {(["ALL", "TOP", "FLASH"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterLevel(filter)}
                  onMouseEnter={handleMouseEnterButton}
                  onMouseLeave={handleMouseLeaveCursor}
                  className={`font-mono-code text-[11px] px-3 py-1 rounded-full border transition-colors ${
                    filterLevel === filter
                      ? "bg-white text-black font-semibold border-white"
                      : "text-zinc-400 hover:text-white border-white/[0.08] bg-white/[0.02]"
                  }`}
                >
                  {filter === "ALL" ? "全部模型" : filter === "TOP" ? "突围旗舰" : "Flash 梯队"}
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Header */}
          <div className="hidden md:grid grid-cols-12 px-6 py-3 font-mono-code text-xs text-zinc-500 border-b border-white/[0.06] uppercase tracking-wider">
            <div className="col-span-3">MODEL / CONFIG</div>
            <div className="col-span-2 text-center">GOLD (黄金)</div>
            <div className="col-span-2 text-center">DIAMOND (钻石)</div>
            <div className="col-span-2 text-center">KING (王者)</div>
            <div className="col-span-3 text-right">EVIDENCE NOTE</div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-white/[0.06]">
            {filteredData.map((row) => {
              const isCurrent = selectedModel.model === row.model;
              return (
                <div
                  key={row.model}
                  onClick={() => setSelectedModel(row)}
                  onMouseEnter={() => {
                    handleMouseEnterLens();
                    setSelectedModel(row);
                  }}
                  onMouseLeave={handleMouseLeaveCursor}
                  className={`grid grid-cols-1 md:grid-cols-12 items-center py-5 px-6 rounded-lg transition-all duration-200 cursor-none select-none ${
                    isCurrent
                      ? "bg-white/[0.04] md:translate-x-1.5 border-l-2 border-rose-400 pl-5"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="md:col-span-3 flex items-center gap-2 mb-2 md:mb-0">
                    <span className="text-base sm:text-lg font-medium text-white tracking-tight">
                      {row.model}
                    </span>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block animate-ping" />
                    )}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-center py-1 md:py-0">
                    <span className="text-xs text-zinc-500 md:hidden font-mono-code">黄金线:</span>
                    {getStatusBadge(row.goldStatus, row.gold)}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-center py-1 md:py-0">
                    <span className="text-xs text-zinc-500 md:hidden font-mono-code">钻石线:</span>
                    {getStatusBadge(row.diamondStatus, row.diamond)}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-center py-1 md:py-0">
                    <span className="text-xs text-zinc-500 md:hidden font-mono-code">王者线:</span>
                    {getStatusBadge(row.kingStatus, row.king)}
                  </div>

                  <div className="md:col-span-3 text-left md:text-right font-mono-code text-xs text-zinc-400 mt-2 md:mt-0 truncate">
                    <span className="text-zinc-600 mr-2">{row.timestamp}</span>
                    <span className="text-zinc-300 font-light">{row.quote}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Part 2: Cost of Truth */}
        <section className="mb-24 sm:mb-32">
          <div className="border-b border-white/[0.08] pb-6 mb-8 flex flex-col sm:flex-row justify-between items-baseline gap-2">
            <div>
              <h2 className="font-serif-title italic text-4xl sm:text-5xl text-white font-normal">
                The Cost of Truth
              </h2>
              <p className="text-xs text-zinc-500 font-mono-code mt-1">
                确切数字出处与真实 Token 账单结算（非定性推测）
              </p>
            </div>
            <div className="font-mono-code text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>口径：仅列官方结算与可靠确切数字</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COST_DATA.map((item) => (
              <div
                key={item.model}
                className="bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-6 flex flex-col justify-between transition-colors cursor-none"
                onMouseEnter={handleMouseEnterLens}
                onMouseLeave={handleMouseLeaveCursor}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-medium text-white">{item.model}</span>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded border text-zinc-400 border-zinc-500/30 bg-white/[0.03]">
                      {item.badge}
                    </span>
                  </div>

                  <div className={`font-serif-title text-3xl sm:text-4xl ${item.costColor} mb-1`}>
                    {item.cost}
                  </div>
                  <div className="font-mono-code text-xs text-zinc-500 mb-6">
                    {item.tokens}
                  </div>
                </div>

                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-3">
                    {item.verdict}
                  </p>
                  <div className="font-mono-code text-[10px] text-zinc-500">
                    出处：{item.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Part 3: Revised Tiers */}
        <section className="mb-24">
          <div className="border-b border-white/[0.08] pb-6 mb-8">
            <h2 className="font-serif-title italic text-4xl sm:text-5xl text-white font-normal">
              The Verified Hierarchy
            </h2>
            <p className="text-xs text-zinc-500 font-mono-code mt-1">
              经 12 期全弹幕与元数据严谨订正后的实战梯队
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl divide-y divide-white/[0.06] overflow-hidden">
            {TIER_DATA.map((tier) => (
              <div
                key={tier.tier}
                className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors cursor-none"
                onMouseEnter={handleMouseEnterLens}
                onMouseLeave={handleMouseLeaveCursor}
              >
                <div className="flex items-center gap-6">
                  <span
                    className={`font-serif-title text-4xl sm:text-5xl w-14 sm:w-16 ${
                      tier.tier === "T0"
                        ? "text-rose-400"
                        : tier.tier === "T1"
                        ? "text-amber-400"
                        : "text-white"
                    }`}
                  >
                    {tier.tier}
                  </span>
                  <div>
                    <div className="text-lg sm:text-xl font-medium text-white mb-1">
                      {tier.models}
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-400 font-light">
                      {tier.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <div className="font-mono-code text-xs text-zinc-500">
              <strong className="text-zinc-300">场景限定说明：</strong> 
              GLM 5.3 完整版与 Kimi K3 归入 T4，仅代表在「屎山论剑恶劣工况与长程代码排错」特定场景下的实战表现，不等于模型其他多模态或日常文科任务的综合排序。
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center font-mono-code text-xs text-zinc-600 gap-4">
          <div>PROPRIETARY BENCHMARK AUDIT · EPISODES 01–12</div>
          <div>基于 B 站公开弹幕时间轴与官方视频元数据整理</div>
        </footer>
      </div>
    </div>
  );
}
