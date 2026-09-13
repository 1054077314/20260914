import React from "react";
import { ModelAudit, TaskScore } from "../types";
import {
  ShieldAlert,
  Zap,
  Briefcase,
  Quote,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  GitCompare,
} from "lucide-react";

interface DossierCardProps {
  models: ModelAudit[];
  selectedModelKey: string;
  onSelectModel: (key: string) => void;
  onInspectTask: (model: ModelAudit, task: TaskScore) => void;
  onCompareWith: (model: ModelAudit) => void;
}

export const DossierCard: React.FC<DossierCardProps> = ({
  models,
  selectedModelKey,
  onSelectModel,
  onInspectTask,
  onCompareWith,
}) => {
  const currentModel = models.find((m) => m.key === selectedModelKey) || models[0];

  return (
    <section className="py-12 border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span>EXECUTIVE AUDIT DOSSIER</span>
              <span className="text-zinc-600">//</span>
              <span>DEEP REASONING PROFILES</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-white italic tracking-tight">
              Intelligence Dossier<span className="not-italic text-zinc-400 text-3xl font-sans ml-2">深度审计档案</span>
            </h2>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            MODEL ID: #{currentModel.id} &middot; {currentModel.name}
          </div>
        </div>

        {/* Model Selector Pills Rail */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/[0.06]">
          {models.map((m) => {
            const isCurrent = m.key === currentModel.key;
            return (
              <button
                key={m.key}
                onClick={() => onSelectModel(m.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all shrink-0 ${
                  isCurrent
                    ? "bg-zinc-800 border-indigo-500/50 shadow-lg text-white"
                    : "bg-zinc-900/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400">#{m.id}</span>
                    <span className="text-sm font-semibold text-zinc-100">{m.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">{m.tag}</span>
                </div>
                <span className="font-serif-display text-xl ml-2 font-normal text-zinc-200">
                  {m.score.toFixed(1)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Dossier Content Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/50 border border-white/[0.09] shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top Strip */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono text-xs text-zinc-400 tracking-wider">
                  IDENTIFIER: {currentModel.id}
                </span>
                <span className="text-zinc-600">&bull;</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                  {currentModel.tag}
                </span>
                <span className="text-zinc-600">&bull;</span>
                <span className="text-xs font-mono text-zinc-400">
                  FOOTPRINT: {currentModel.tokenFootprint || "STANDARD"}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {currentModel.name}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                ALIAS & REPO FILENAMES: {currentModel.alias}
              </p>
            </div>

            {/* Score & Quick Actions */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
                  Composite Score
                </span>
                <span className="font-serif-display text-5xl sm:text-6xl font-normal text-white">
                  {currentModel.score.toFixed(1)}
                </span>
                <span className="text-zinc-500 font-serif-display text-2xl"> / 100</span>
              </div>

              <button
                onClick={() => onCompareWith(currentModel)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono font-medium transition-all shadow-sm active:scale-95"
              >
                <GitCompare className="w-4 h-4" />
                <span>发起对比</span>
              </button>
            </div>
          </div>

          {/* Notable Quote Banner */}
          {currentModel.notableQuote && (
            <div className="my-8 p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] flex items-start gap-4">
              <Quote className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-300 font-semibold block mb-1">
                  Audit Transcript Highlight // 关键审读真言
                </span>
                <p className="text-base sm:text-lg font-serif-display italic text-zinc-200 leading-relaxed">
                  {currentModel.notableQuote}
                </p>
              </div>
            </div>
          )}

          {/* Detailed Narrative Description */}
          <div className="mb-10">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
              Executive Evaluation Summary // 高管评估综述
            </h4>
            <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed">
              {currentModel.desc}
            </p>
          </div>

          {/* 3 Pillars: Core Advantage, Factual Boundary, Ideal Deployment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Pillar 1: Advantage */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Core Advantage // 核心突破</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {currentModel.adv}
              </p>
            </div>

            {/* Pillar 2: Boundary & Limitations */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Factual Boundary // 事实边界与短板</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {currentModel.limit}
              </p>
            </div>

            {/* Pillar 3: Ideal Deployment */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
                <Briefcase className="w-4 h-4" />
                <span>Ideal Deployment // 建议落地场景</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {currentModel.usage}
              </p>
            </div>
          </div>

          {/* 4-Task Performance Grid Breakdown */}
          <div className="border-t border-white/[0.08] pt-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                4-Task Scorecard Breakdown // 四项套件得分实录
              </h4>
              <span className="text-[11px] font-mono text-zinc-400">
                CLICK ITEM TO READ DETAILED RUBRIC & OBSERVATIONS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentModel.tasks.map((t) => {
                const hasScore = t.score !== null;
                return (
                  <div
                    key={t.no}
                    onClick={() => hasScore && onInspectTask(currentModel, t)}
                    className={`p-4 rounded-xl border transition-all ${
                      hasScore
                        ? "bg-zinc-950/80 border-white/10 hover:border-indigo-500/50 hover:bg-zinc-900 cursor-pointer group shadow-sm"
                        : "bg-zinc-950/30 border-white/[0.04] opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-400">TASK {t.no}</span>
                      {hasScore ? (
                        <span className="flex items-center gap-1 text-[10px] text-indigo-400 group-hover:underline">
                          <Eye className="w-3 h-3" /> 审读详情
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-600">未纳评</span>
                      )}
                    </div>

                    <div className="font-semibold text-sm text-zinc-100 mb-2 truncate">
                      {t.fullName}
                    </div>

                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-serif-display text-3xl font-normal text-white">
                        {hasScore ? t.score : "&mdash;"}
                      </span>
                      {hasScore && (
                        <span className="text-xs font-mono text-zinc-500">/ 100</span>
                      )}
                    </div>

                    {hasScore && (
                      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-indigo-400 rounded-full"
                          style={{ width: `${t.score}%` }}
                        />
                      </div>
                    )}

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {t.keyObservation || "暂无抽样答卷数据。"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
