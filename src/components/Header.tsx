import React from "react";
import { ShieldCheck, Layers, FileText, GitCompare, Download, Check, Sparkles } from "lucide-react";
import { BENCHMARK_OVERVIEW } from "../data/benchmarkData";

interface HeaderProps {
  activeTab: "index" | "dossier" | "suites" | "compare";
  setActiveTab: (tab: "index" | "dossier" | "suites" | "compare") => void;
  onExportReport: () => void;
  copied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onExportReport,
  copied,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#07080b]/85 border-b border-white/[0.07] transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left identity & classification status */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] text-xs font-mono tracking-widest text-indigo-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="font-semibold tracking-wider">LEVEL 1 AUDIT</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-zinc-400 hidden sm:inline">RESTRICTED</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono text-zinc-400">
            <span className="text-zinc-500">SAMPLE INDEX:</span>
            <span className="text-zinc-200 font-semibold">{BENCHMARK_OVERVIEW.sampleIndex}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">20 ANSWERS</span>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="flex items-center p-1 rounded-xl bg-zinc-900/80 border border-white/[0.08] shadow-inner text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab("index")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "index"
                ? "bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>总账大盘</span>
          </button>
          <button
            onClick={() => setActiveTab("dossier")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "dossier"
                ? "bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>深度档案</span>
          </button>
          <button
            onClick={() => setActiveTab("suites")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "suites"
                ? "bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>四大测试套件</span>
          </button>
          <button
            onClick={() => setActiveTab("compare")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "compare"
                ? "bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
            <span>双模对决</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExportReport}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-sm active:scale-95"
            title="复制高管审计摘要到剪贴板"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-medium">已复制报告</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline">导出审计摘要</span>
                <span className="sm:hidden">导出</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
