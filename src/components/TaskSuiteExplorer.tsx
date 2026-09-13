import React, { useState } from "react";
import { BenchmarkSuite, ModelAudit, TaskScore } from "../types";
import { BENCHMARK_SUITES } from "../data/benchmarkData";
import { CheckCircle, AlertCircle, FileText, Scale, Target, Trophy, ChevronRight } from "lucide-react";

interface TaskSuiteExplorerProps {
  models: ModelAudit[];
  onInspectTask: (model: ModelAudit, task: TaskScore) => void;
}

export const TaskSuiteExplorer: React.FC<TaskSuiteExplorerProps> = ({
  models,
  onInspectTask,
}) => {
  const [selectedSuiteNo, setSelectedSuiteNo] = useState<string>("01");

  const currentSuite =
    BENCHMARK_SUITES.find((s) => s.no === selectedSuiteNo) || BENCHMARK_SUITES[0];

  // Get models ranked for this suite
  const suiteRankings = models
    .map((m) => {
      const task = m.tasks.find((t) => t.no === currentSuite.no);
      return {
        model: m,
        task: task,
        score: task?.score ?? null,
      };
    })
    .sort((a, b) => {
      if (a.score === null && b.score === null) return 0;
      if (a.score === null) return 1;
      if (b.score === null) return -1;
      return b.score - a.score;
    });

  return (
    <section className="py-12 border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span>EVALUATION METHODOLOGY</span>
              <span className="text-zinc-600">//</span>
              <span>4 STRESS BENCHMARK SUITES</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-white italic tracking-tight">
              Evaluation Suites<span className="not-italic text-zinc-400 text-3xl font-sans ml-2">四大实操套件解析</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            SUITE ID: SUITE-{currentSuite.no} &middot; {currentSuite.title}
          </div>
        </div>

        {/* 4 Suite Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BENCHMARK_SUITES.map((suite) => {
            const isActive = suite.no === currentSuite.no;
            return (
              <button
                key={suite.no}
                onClick={() => setSelectedSuiteNo(suite.no)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isActive
                    ? "bg-zinc-800 border-amber-500/50 shadow-xl"
                    : "bg-zinc-900/40 border-white/[0.06] hover:bg-zinc-900 hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span
                    className={
                      isActive
                        ? "text-amber-400 font-bold"
                        : "text-zinc-400"
                    }
                  >
                    SUITE {suite.no}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">WEIGHT: 100 PTS</span>
                </div>
                <div className="font-bold text-sm sm:text-base text-white mb-1">
                  {suite.title}
                </div>
                <div className="text-xs text-zinc-400 font-light truncate">
                  {suite.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Suite Detailed Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-10 rounded-3xl bg-zinc-900/50 border border-white/[0.09] shadow-2xl backdrop-blur-xl">
          {/* Left 2 Cols: Question context & Rubrics */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
                <Target className="w-4 h-4" />
                <span>Core Stress Challenge // 极限命题内核</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {currentSuite.title}
              </h3>
              <p className="text-base text-zinc-200 leading-relaxed font-light p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.06]">
                {currentSuite.coreQuestion}
              </p>
            </div>

            {/* Evaluation Focus Points */}
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Audited Vectors // 4大核心穿透维度</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSuite.evaluationFocus.map((focus, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-zinc-950/50 border border-white/[0.06] text-xs text-zinc-300 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed">{focus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring Weights */}
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scoring Weights Allocation // 赋分权重标尺</span>
              </div>
              <div className="space-y-2">
                {currentSuite.scoringWeights.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-950/40 border border-white/[0.04] flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-300 font-light">{w.criteria}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${w.weight * 2.5}%` }}
                        />
                      </div>
                      <span className="font-mono text-emerald-400 font-bold min-w-[32px] text-right">
                        {w.weight}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Commentary */}
            <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed font-light">
              <span className="font-mono font-bold uppercase tracking-wider block mb-1 text-amber-300">
                AUDITOR NOTES // 审读专家评注:
              </span>
              {currentSuite.expertCommentary}
            </div>
          </div>

          {/* Right Col: Leaderboard on this specific suite */}
          <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Suite Rankings // 本项排位
              </span>
              <span className="text-[10px] font-mono text-zinc-400">SCORES</span>
            </div>

            <div className="space-y-2.5">
              {suiteRankings.map((item, idx) => {
                const hasScore = item.score !== null;
                return (
                  <div
                    key={item.model.key}
                    onClick={() =>
                      hasScore &&
                      item.task &&
                      onInspectTask(item.model, item.task)
                    }
                    className={`p-3.5 rounded-xl border transition-all ${
                      hasScore
                        ? "bg-zinc-950/60 border-white/[0.08] hover:border-amber-500/40 hover:bg-zinc-900/80 cursor-pointer group shadow-sm"
                        : "bg-zinc-950/20 border-white/[0.03] opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-md font-mono text-[10px] flex items-center justify-center font-bold ${
                            idx === 0 && hasScore
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-xs text-zinc-200 group-hover:text-white">
                            {item.model.name}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-400">
                            {item.model.tag}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-serif-display text-2xl font-normal text-white">
                          {hasScore ? item.score : "&mdash;"}
                        </span>
                        {hasScore && (
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-300" />
                        )}
                      </div>
                    </div>

                    {hasScore && item.task?.keyObservation && (
                      <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 leading-snug">
                        {item.task.keyObservation}
                      </p>
                    )}
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
