import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, ChevronRight, ExternalLink, HelpCircle, Eye, GitCompare } from "lucide-react";
import { ModelAudit, StrategyTier, TaskScore } from "../types";

interface LedgerTableProps {
  models: ModelAudit[];
  selectedModelKey: string;
  onSelectModel: (key: string) => void;
  onInspectTask: (model: ModelAudit, task: TaskScore) => void;
  onCompareWith: (model: ModelAudit) => void;
  onGoToDossier: (key: string) => void;
}

export const LedgerTable: React.FC<LedgerTableProps> = ({
  models,
  selectedModelKey,
  onSelectModel,
  onInspectTask,
  onCompareWith,
  onGoToDossier,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"score-desc" | "score-asc" | "name" | "t1" | "t2" | "t3" | "t4">("score-desc");

  // Filtered & Sorted models
  const processedModels = useMemo(() => {
    let list = [...models];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.alias.toLowerCase().includes(q) ||
          m.tag.toLowerCase().includes(q) ||
          m.desc.toLowerCase().includes(q)
      );
    }

    if (selectedTier !== "ALL") {
      list = list.filter((m) => m.tag === selectedTier);
    }

    list.sort((a, b) => {
      if (sortBy === "score-desc") return b.score - a.score;
      if (sortBy === "score-asc") return a.score - b.score;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "t1") {
        const scoreA = a.tasks.find((t) => t.no === "01")?.score ?? -1;
        const scoreB = b.tasks.find((t) => t.no === "01")?.score ?? -1;
        return scoreB - scoreA;
      }
      if (sortBy === "t2") {
        const scoreA = a.tasks.find((t) => t.no === "02")?.score ?? -1;
        const scoreB = b.tasks.find((t) => t.no === "02")?.score ?? -1;
        return scoreB - scoreA;
      }
      if (sortBy === "t3") {
        const scoreA = a.tasks.find((t) => t.no === "03")?.score ?? -1;
        const scoreB = b.tasks.find((t) => t.no === "03")?.score ?? -1;
        return scoreB - scoreA;
      }
      if (sortBy === "t4") {
        const scoreA = a.tasks.find((t) => t.no === "04")?.score ?? -1;
        const scoreB = b.tasks.find((t) => t.no === "04")?.score ?? -1;
        return scoreB - scoreA;
      }
      return 0;
    });

    return list;
  }, [models, searchTerm, selectedTier, sortBy]);

  const tiers = ["ALL", "ELITE STRATEGY", "CORE AGILE", "BOUNDARY STABLE", "INDEPENDENT", "AUDIT NEUTRAL", "SOP STANDARD"];

  // Helper for tier color styling
  const getTierBadgeClass = (tag: StrategyTier) => {
    switch (tag) {
      case "ELITE STRATEGY":
        return "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
      case "CORE AGILE":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
      case "BOUNDARY STABLE":
        return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
      case "INDEPENDENT":
        return "border-amber-500/30 bg-amber-500/10 text-amber-300";
      case "AUDIT NEUTRAL":
        return "border-purple-500/30 bg-purple-500/10 text-purple-300";
      case "SOP STANDARD":
        return "border-rose-500/30 bg-rose-500/10 text-rose-300";
      default:
        return "border-zinc-500/30 bg-zinc-500/10 text-zinc-300";
    }
  };

  return (
    <section className="py-12 border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-1">
              <span>EVALUATION SUITES 01 &mdash; 04</span>
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-400">DOUBLE-BLIND CROSS AUDIT</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-white italic tracking-tight">
              The Matrix Ledger<span className="not-italic text-zinc-400 text-3xl font-sans ml-2">总账矩阵</span>
            </h2>
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            CLICK ANY SCORE CHIP TO INSPECT AUDIT EVIDENCE &middot; CLICK ROW FOR DOSSIER
          </div>
        </div>

        {/* Controls Toolbar: Search, Filters & Sorting */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.08] backdrop-blur-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索模型名称、代号或战略定位..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-950/80 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
              >
                清除
              </button>
            )}
          </div>

          {/* Tier pills & Sort dropdown */}
          <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap justify-between lg:justify-end">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 max-w-full">
              {tiers.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTier(t)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono tracking-wider transition-all whitespace-nowrap ${
                    selectedTier === t
                      ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 font-semibold"
                      : "bg-zinc-800/60 border border-white/[0.05] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-zinc-500 text-xs font-mono hidden sm:inline">排序:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="score-desc">综合得分 (高至低)</option>
                <option value="score-asc">综合得分 (低至高)</option>
                <option value="t1">Task 01 生存决策</option>
                <option value="t2">Task 02 按摩消费</option>
                <option value="t3">Task 03 现金流推演</option>
                <option value="t4">Task 04 录音纪要改写</option>
                <option value="name">模型字母排序</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ledger Table Container */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-lg overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] font-mono text-zinc-400 tracking-wider uppercase bg-white/[0.02]">
                  <th className="py-4 px-4 w-16 text-center">ID</th>
                  <th className="py-4 px-4 min-w-[220px]">MODEL FAMILY & ALIAS</th>
                  <th className="py-4 px-4 min-w-[340px]">
                    <div className="flex items-center gap-2">
                      <span>4-TASK SUITES SCORES</span>
                      <span className="text-[10px] text-zinc-400 lowercase normal-case">(点击得分查看证据链)</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[140px] text-right">COMPOSITE</th>
                  <th className="py-4 px-4 min-w-[150px] text-right">STRATEGY TIER</th>
                  <th className="py-4 px-4 w-28 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {processedModels.map((m, idx) => {
                  const isSelected = m.key === selectedModelKey;
                  return (
                    <tr
                      key={m.key}
                      onClick={() => onSelectModel(m.key)}
                      className={`group transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-indigo-500/[0.08] border-l-2 border-indigo-500"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      {/* ID */}
                      <td className="py-4 px-4 text-center font-mono text-xs text-zinc-400 group-hover:text-zinc-200">
                        {m.id}
                      </td>

                      {/* Name & Alias */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm sm:text-base text-zinc-100 group-hover:text-white">
                              {m.name}
                            </span>
                            {idx === 0 && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                TOP
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[11px] text-zinc-400 group-hover:text-zinc-400 transition-colors">
                            {m.alias}
                          </span>
                        </div>
                      </td>

                      {/* Task Chips */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                          {m.tasks.map((task) => {
                            const hasScore = task.score !== null;
                            return (
                              <button
                                key={task.no}
                                onClick={() => onInspectTask(m, task)}
                                title={
                                  hasScore
                                    ? `查看 ${m.name} 在 ${task.fullName} 的审读实录 (得分: ${task.score})`
                                    : `${task.fullName}: 样本暂缺`
                                }
                                className={`group/chip relative flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all duration-150 border ${
                                  hasScore
                                    ? "bg-zinc-900 border-white/10 hover:border-indigo-500/60 hover:bg-indigo-500/15 text-zinc-300 hover:text-white active:scale-95 shadow-sm"
                                    : "bg-zinc-950/40 border-white/[0.04] text-zinc-600 cursor-not-allowed"
                                }`}
                              >
                                <span className="text-zinc-400 group-hover/chip:text-zinc-300 text-[10px]">
                                  {task.no}
                                </span>
                                <span className="text-zinc-600">:</span>
                                <span
                                  className={`font-semibold ${
                                    hasScore
                                      ? (task.score ?? 0) >= 85
                                        ? "text-emerald-400"
                                        : (task.score ?? 0) >= 75
                                        ? "text-indigo-300"
                                        : "text-amber-300"
                                      : "text-zinc-600"
                                  }`}
                                >
                                  {hasScore ? task.score : "&mdash;"}
                                </span>
                                {hasScore && (
                                  <Eye className="w-2.5 h-2.5 text-zinc-400 group-hover/chip:text-indigo-300 ml-0.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </td>

                      {/* Composite Score with mini progress gauge */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-serif-display text-3xl font-normal text-white leading-none">
                            {m.score.toFixed(1)}
                          </span>
                          {/* Mini visual meter */}
                          <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden mt-1.5">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                              style={{ width: `${(m.score / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Strategy Tier Tag */}
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase border ${getTierBadgeClass(
                            m.tag
                          )}`}
                        >
                          {m.tag}
                        </span>
                      </td>

                      {/* Quick Actions */}
                      <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onGoToDossier(m.key)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            title="打开模型深度档案"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onCompareWith(m)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-zinc-800 transition-colors"
                            title="以此模型发起双模对比"
                          >
                            <GitCompare className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footnote tips */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400 font-mono pt-2">
          <div>
            &bull; 任务套件覆盖：01 生存决策 &middot; 02 按摩消费审计 &middot; 03 现金流断裂点 &middot; 04 录音事实纪要
          </div>
          <div className="text-zinc-400">
            TOTAL VERIFIED: 6 FRONTIER MODELS &middot; RESTRICTED ARCHIVE
          </div>
        </div>
      </div>
    </section>
  );
};
