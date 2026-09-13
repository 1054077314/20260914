import React, { useState } from "react";
import { ModelAudit } from "../types";
import { GitCompare, Trophy, ArrowRight, Check, AlertCircle, Quote } from "lucide-react";

interface ModelComparatorProps {
  models: ModelAudit[];
  initialModelKeyA?: string;
  initialModelKeyB?: string;
}

export const ModelComparator: React.FC<ModelComparatorProps> = ({
  models,
  initialModelKeyA = "gpt",
  initialModelKeyB = "glm",
}) => {
  const [modelKeyA, setModelKeyA] = useState<string>(initialModelKeyA);
  const [modelKeyB, setModelKeyB] = useState<string>(initialModelKeyB);

  const modelA = models.find((m) => m.key === modelKeyA) || models[0];
  const modelB = models.find((m) => m.key === modelKeyB) || models[1];

  const scoreDiff = (modelA.score - modelB.score).toFixed(1);

  return (
    <section className="py-12 border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <GitCompare className="w-4 h-4" />
              <span>HEAD-TO-HEAD ARBITRATION</span>
              <span className="text-zinc-600">//</span>
              <span>DUAL MODEL ARBITRAGE</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-white italic tracking-tight">
              Model Comparison<span className="not-italic text-zinc-400 text-3xl font-sans ml-2">双模对决仲裁</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            COMPARING {modelA.name} VS {modelB.name}
          </div>
        </div>

        {/* Comparison Selector Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.08] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Model A Selector */}
          <div className="w-full md:w-5/12 flex items-center gap-3">
            <span className="text-xs font-mono text-indigo-400 font-bold">MODEL A:</span>
            <select
              value={modelKeyA}
              onChange={(e) => setModelKeyA(e.target.value)}
              className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {models.map((m) => (
                <option key={m.key} value={m.key} disabled={m.key === modelKeyB}>
                  {m.name} ({m.score.toFixed(1)}) - {m.tag}
                </option>
              ))}
            </select>
          </div>

          {/* VS Center Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs font-bold tracking-widest">
            VS
          </div>

          {/* Model B Selector */}
          <div className="w-full md:w-5/12 flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 font-bold">MODEL B:</span>
            <select
              value={modelKeyB}
              onChange={(e) => setModelKeyB(e.target.value)}
              className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
            >
              {models.map((m) => (
                <option key={m.key} value={m.key} disabled={m.key === modelKeyA}>
                  {m.name} ({m.score.toFixed(1)}) - {m.tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side by Side Comparative Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Model A */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-indigo-500/30 shadow-xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {modelA.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {modelA.name}
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  {modelA.alias}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                  COMPOSITE
                </span>
                <span className="font-serif-display text-5xl text-white font-normal">
                  {modelA.score.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Task Scores Breakdown */}
            <div className="space-y-2 border-t border-white/[0.08] pt-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                4-Task Head-to-Head
              </span>
              {modelA.tasks.map((t, idx) => {
                const bTask = modelB.tasks[idx];
                const aScore = t.score;
                const bScore = bTask?.score;
                const isWinner =
                  aScore !== null && (bScore === null || aScore > bScore);

                return (
                  <div
                    key={t.no}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/60 text-xs font-mono"
                  >
                    <span className="text-zinc-300">
                      Task {t.no}: {t.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          aScore !== null ? "text-white text-sm" : "text-zinc-600"
                        }`}
                      >
                        {aScore !== null ? aScore : "&mdash;"}
                      </span>
                      {isWinner && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                          WIN
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            {modelA.notableQuote && (
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-xs font-serif-display italic text-zinc-300 leading-relaxed">
                {modelA.notableQuote}
              </div>
            )}

            {/* Advantage & Limitations */}
            <div className="space-y-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20">
                <span className="font-mono text-emerald-400 font-bold block mb-1">
                  核心优势:
                </span>
                <p className="text-zinc-300 leading-relaxed font-light">{modelA.adv}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20">
                <span className="font-mono text-amber-400 font-bold block mb-1">
                  事实边界短板:
                </span>
                <p className="text-zinc-300 leading-relaxed font-light">{modelA.limit}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-500/[0.05] border border-indigo-500/20">
                <span className="font-mono text-indigo-400 font-bold block mb-1">
                  最佳落地场景:
                </span>
                <p className="text-zinc-300 leading-relaxed font-light">{modelA.usage}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Model B */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-emerald-500/30 shadow-xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {modelB.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {modelB.name}
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  {modelB.alias}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                  COMPOSITE
                </span>
                <span className="font-serif-display text-5xl text-white font-normal">
                  {modelB.score.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Task Scores Breakdown */}
            <div className="space-y-2 border-t border-white/[0.08] pt-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                4-Task Head-to-Head
              </span>
              {modelB.tasks.map((t, idx) => {
                const aTask = modelA.tasks[idx];
                const bScore = t.score;
                const aScore = aTask?.score;
                const isWinner =
                  bScore !== null && (aScore === null || bScore > aScore);

                return (
                  <div
                    key={t.no}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/60 text-xs font-mono"
                  >
                    <span className="text-zinc-300">
                      Task {t.no}: {t.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          bScore !== null ? "text-white text-sm" : "text-zinc-600"
                        }`}
                      >
                        {bScore !== null ? bScore : "&mdash;"}
                      </span>
                      {isWinner && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                          WIN
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            {modelB.notableQuote && (
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-xs font-serif-display italic text-zinc-300 leading-relaxed">
                {modelB.notableQuote}
              </div>
            )}

            {/* Advantage & Limitations */}
            <div className="space-y-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20">
                <span className="font-mono text-emerald-400 font-bold block mb-1">
                  核心优势:
                </span>
                <p className="text-zinc-300 leading-relaxed font-light">{modelB.adv}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20">
                <span className="font-mono text-amber-400 font-bold block mb-1">
                  事实边界短板:
                </span>
                <p className="text-zinc-300 leading-relaxed font-light">{modelB.limit}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-500/[0.05] border border-indigo-500/20">
                <span className="font-mono text-indigo-400 font-bold block mb-1">
                  最佳落地场景:
                </span>
                <p className="text-zinc-300 leading-relaxed font-light">{modelB.usage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verdict Summary Box */}
        <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-zinc-300 font-light">
            <span className="font-mono font-bold text-cyan-300 mr-2">AUDIT ARBITRATION VERDICT:</span>
            {Number(scoreDiff) > 0 ? (
              <>
                <span className="text-white font-semibold">{modelA.name}</span> 凭借更深厚的系统建模与闭环因果分析，在综合审计上高出{" "}
                <span className="text-indigo-400 font-mono font-bold">+{scoreDiff}</span> 分。
              </>
            ) : Number(scoreDiff) < 0 ? (
              <>
                <span className="text-white font-semibold">{modelB.name}</span> 凭借更高的精炼交付与敏捷博弈，在综合审计上高出{" "}
                <span className="text-emerald-400 font-mono font-bold">+{Math.abs(Number(scoreDiff))}</span> 分。
              </>
            ) : (
              <>两款模型在综合得分上旗鼓相当，建议根据具体落地场景（敏捷汇报 vs 复杂建模）进行差异化选型。</>
            )}
          </div>

          <div className="text-xs font-mono text-zinc-500 shrink-0">
            AUTO-ARBITRATION ENGINE
          </div>
        </div>
      </div>
    </section>
  );
};
