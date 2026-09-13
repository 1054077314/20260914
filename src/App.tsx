import React, { useState, useEffect, useRef } from "react";
import { Copy, Check, ArrowUpRight, ShieldCheck, Terminal, Sparkles } from "lucide-react";

interface ModelRecord {
  id: string;
  code: string;
  name: string;
  tag: string;
  tagClass: string;
  score: string;
  highlight: string;
  advantage: string;
  deployment: string;
  rigor: string;
  survival: string;
  latency: string;
}

const MODELS: ModelRecord[] = [
  {
    id: "gpt",
    code: "001",
    name: "GPT-5.6 LUNA",
    tag: "ELITE",
    tagClass: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",
    score: "87.8",
    highlight: "综合逻辑推演与极端压力博弈表现近乎完美，在多轮极限生存对弈中始终保持事实一致性与精准推断。",
    advantage: "在极端对抗与反事实诱导测试中，几乎零产生关键逻辑幻觉，执行边界极其克制。",
    deployment: "企业核心合规风控、复杂多智能体协同决策及高价值财务推演。",
    rigor: "99.4%",
    survival: "92.4",
    latency: "142ms",
  },
  {
    id: "glm",
    code: "002",
    name: "GLM-5.3 FLASH",
    tag: "CORE",
    tagClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    score: "81.8",
    highlight: "以极低 Token 消耗与亚百毫秒响应完成了最高质量的汇报决策，长程事实对齐与现金流核算能力卓越。",
    advantage: "高吞吐并发下的稳定性与极致的 Token 能效比，复杂财务逻辑下响应敏捷。",
    deployment: "实时高频商业审计流水线、企业财报即时核验及成本敏感型推理系统。",
    rigor: "96.2%",
    survival: "84.1",
    latency: "58ms",
  },
  {
    id: "grok",
    code: "003",
    name: "GROK-4.6 ENGINE",
    tag: "STABLE",
    tagClass: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
    score: "78.0",
    highlight: "在高压反事实测试中展现出极强的抗欺骗性与逻辑韧性，在模糊语境下具有高度自省与纠错能力。",
    advantage: "抗提示词注入防线坚固，面对恶意混淆财务条目时能坚决拒绝捏造。",
    deployment: "敏感信息多重审计、外部非结构化文本真实性核查及法务合规防线。",
    rigor: "94.8%",
    survival: "79.5",
    latency: "96ms",
  },
  {
    id: "deep",
    code: "004",
    name: "DEEPSEEK V4",
    tag: "NEUTRAL",
    tagClass: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/30",
    score: "75.7",
    highlight: "数学逻辑推理与算法推演深度出众，在固定已知边界的代码与数理结构推导中表现极其稳健。",
    advantage: "复杂的数理关系抽象与多层嵌套逻辑推导，长上下文信息提取精准。",
    deployment: "深度算法推演、离线结构化数据清洗及长程技术文档结构化拆解。",
    rigor: "91.5%",
    survival: "76.2",
    latency: "110ms",
  },
];

export default function App() {
  const [activeModelId, setActiveModelId] = useState<string>("gpt");
  const [copied, setCopied] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<"default" | "lens" | "button">("default");
  const [lensSize, setLensSize] = useState<number>(140);
  const dossierRef = useRef<HTMLDivElement>(null);

  const currentModel = MODELS.find((m) => m.id === activeModelId) || MODELS[0];

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

  const handleSelectModel = (id: string, scrollIntoView = false) => {
    setActiveModelId(id);
    if (scrollIntoView && dossierRef.current) {
      dossierRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCursorSize =
    cursorMode === "lens" ? `${lensSize}px` : cursorMode === "button" ? "54px" : "8px";

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 selection:text-indigo-200 relative pb-24">
      {/* Noise Texture */}
      <div className="grain-overlay" />

      {/* Custom Interactive Magnifying Glass Lens Cursor */}
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
        {/* Top Minimal Nav */}
        <header className="h-24 sm:h-28 flex flex-wrap justify-between items-center border-b border-white/[0.08] mb-12 sm:mb-16 gap-4">
          <div
            className="flex items-center gap-2.5 font-mono-code text-[11px] sm:text-xs text-zinc-400 bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-full"
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYSTEM STATUS: ENCRYPTED</span>
          </div>

          {/* Quick Lens Magnifier Size Selector */}
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
              onClick={handleCopyLink}
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
              RELEASE: 2026.08
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          className="mb-20 sm:mb-28"
          onMouseEnter={handleMouseEnterLens}
          onMouseLeave={handleMouseLeaveCursor}
        >
          <div className="font-mono-code text-xs text-indigo-400 tracking-[0.25em] mb-4 sm:mb-6 uppercase flex items-center gap-2">
            <span className="inline-block w-4 h-[1px] bg-indigo-500/60" />
            INTELLIGENCE REPORT
          </div>

          <h1 className="font-serif-title italic text-[3.8rem] sm:text-[6rem] lg:text-[7.8rem] leading-[0.88] tracking-[-0.03em] mb-10 text-white font-normal">
            The Decision <br />
            Ledger.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.08]">
            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl font-light">
              一份关于大规模语言模型在极端生存压力、复杂现金流推演及事实边际严谨度方面的深度审计报告。
            </p>

            <div className="md:justify-self-end flex items-start">
              <div className="border-l-2 border-indigo-500 pl-5 font-mono-code text-xs leading-relaxed text-zinc-400">
                <span className="text-white font-semibold block tracking-wider mb-1">
                  CONFIDENTIAL AUDIT DATA
                </span>
                <span className="text-zinc-500">Unauthorized duplication prohibited.</span>
                <div className="mt-2 text-[10px] text-indigo-400/80 uppercase">
                  Level 1 Executive Access
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid (3 Clean Minimal Stats with Large Magnifying Lens) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden mb-24 sm:mb-32">
          {/* Card 1 */}
          <div
            className="bg-[#050505] p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#0a0a0f] transition-colors cursor-none"
            onMouseEnter={handleMouseEnterLens}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <div>
              <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
                <span>TOP PERFORMANCE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div className="font-serif-title text-5xl sm:text-6xl text-white mb-4">
                87.8
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed border-t border-white/[0.06] pt-4">
              <strong className="text-white font-medium">GPT-5.6 Luna</strong> 在逻辑连贯性与生存博弈测试中刷新了行业记录。
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-[#050505] p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#0a0a0f] transition-colors cursor-none"
            onMouseEnter={handleMouseEnterLens}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <div>
              <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
                <span>FACT RIGOR</span>
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div className="font-serif-title text-5xl sm:text-6xl text-white mb-4">
                99.4%
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed border-t border-white/[0.06] pt-4">
              头部梯队模型在对抗性诱导与事实边界审计中表现出惊人的拒绝捏造克制力。
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-[#050505] p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#0a0a0f] transition-colors cursor-none"
            onMouseEnter={handleMouseEnterLens}
            onMouseLeave={handleMouseLeaveCursor}
          >
            <div>
              <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
                <span>EFFICIENCY</span>
                <Sparkles className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div className="font-serif-title text-5xl sm:text-6xl text-white mb-4">
                Minimal
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed border-t border-white/[0.06] pt-4">
              <strong className="text-white font-medium">GLM-5.3</strong> 以最低的 Token 消耗和 58ms 极低延迟完成了高质量决策。
            </p>
          </div>
        </section>

        {/* The Index (Matrix Table) */}
        <section className="mb-24 sm:mb-32">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-6 mb-2">
            <h2 className="font-serif-title italic text-4xl sm:text-5xl text-white font-normal">
              The Index
            </h2>
            <span className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mt-2 sm:mt-0">
              INDEXED DATA 001–004
            </span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {MODELS.map((model) => {
              const isSelected = model.id === activeModelId;
              return (
                <div
                  key={model.id}
                  onClick={() => handleSelectModel(model.id, true)}
                  onMouseEnter={() => {
                    handleMouseEnterLens();
                    setActiveModelId(model.id);
                  }}
                  onMouseLeave={handleMouseLeaveCursor}
                  className={`grid grid-cols-12 items-center py-6 sm:py-7 px-4 rounded-lg transition-all duration-200 select-none cursor-none ${
                    isSelected
                      ? "bg-white/[0.04] translate-x-2 pl-6"
                      : "hover:bg-white/[0.02] hover:translate-x-1"
                  }`}
                >
                  <div className="col-span-2 sm:col-span-1 font-mono-code text-xs sm:text-sm text-zinc-500">
                    {model.code}
                  </div>

                  <div className="col-span-6 sm:col-span-7 flex items-center gap-3">
                    <span
                      className={`text-base sm:text-xl font-medium tracking-tight transition-colors ${
                        isSelected ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {model.name}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 hidden sm:inline-block animate-pulse" />
                    )}
                  </div>

                  <div className="col-span-2 sm:col-span-2 text-right">
                    <span
                      className={`inline-block text-[10px] sm:text-xs font-mono-code px-2 sm:px-2.5 py-0.5 rounded ${model.tagClass}`}
                    >
                      {model.tag}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-2 text-right font-serif-title text-2xl sm:text-3xl text-white">
                    {model.score}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* The Dossier Section */}
        <section ref={dossierRef} className="mb-24 sm:mb-32 pt-6">
          <div className="border-b border-white/[0.08] pb-6 mb-12">
            <h2 className="font-serif-title italic text-4xl sm:text-5xl text-white font-normal">
              The Dossier
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">
            {/* Left Nav Tabs */}
            <div className="lg:col-span-4 flex lg:flex-col gap-3 sm:gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
              {MODELS.map((model) => {
                const isActive = model.id === activeModelId;
                const shortLabel = model.name.split(" ")[0]; // GPT, GLM, GROK, DEEPSEEK
                return (
                  <button
                    key={model.id}
                    onClick={() => handleSelectModel(model.id)}
                    onMouseEnter={handleMouseEnterButton}
                    onMouseLeave={handleMouseLeaveCursor}
                    className={`text-left font-serif-title text-3xl sm:text-4xl lg:text-5xl transition-all duration-300 py-2 px-3 rounded-lg flex items-center gap-3 whitespace-nowrap ${
                      isActive
                        ? "text-white lg:translate-x-3"
                        : "text-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
                    )}
                    <span>{shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Detail Card */}
            <div
              className="lg:col-span-8 bg-white/[0.02] border border-white/[0.08] rounded-xl p-8 sm:p-12 relative overflow-hidden cursor-none"
              onMouseEnter={handleMouseEnterLens}
              onMouseLeave={handleMouseLeaveCursor}
            >
              <div className="flex items-center justify-between font-mono-code text-xs text-indigo-400 tracking-[0.2em] uppercase mb-8 pb-4 border-b border-white/[0.06]">
                <span>DETAILED DOSSIER / {currentModel.code}</span>
                <span className="text-zinc-500 font-normal">{currentModel.name}</span>
              </div>

              {/* High impact summary */}
              <p className="font-light text-xl sm:text-2xl text-zinc-100 leading-relaxed mb-10">
                {currentModel.highlight}
              </p>

              {/* Advantage & Deployment in clean columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/[0.06]">
                <div>
                  <div className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase mb-2">
                    CORE ADVANTAGE
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {currentModel.advantage}
                  </p>
                </div>

                <div>
                  <div className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase mb-2">
                    IDEAL DEPLOYMENT
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {currentModel.deployment}
                  </p>
                </div>
              </div>

              {/* Quick telemetry footer */}
              <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs text-zinc-500">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-zinc-600">FACT RIGOR: </span>
                    <span className="text-zinc-300">{currentModel.rigor}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600">SURVIVAL INDEX: </span>
                    <span className="text-zinc-300">{currentModel.survival}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600">LATENCY: </span>
                    <span className="text-zinc-300">{currentModel.latency}</span>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-600">
                  AUDITED // 2026 BENCHMARK SUITE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono-code text-xs text-zinc-500">
          <div>DESIGNED FOR EXECUTIVE AUDIT / 2026</div>
          <div className="flex items-center gap-6">
            <span>LLM DECISION BENCHMARK</span>
            <span>PROPRIETARY RESEARCH ©</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
