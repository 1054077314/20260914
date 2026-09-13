import React from "react";
import { TrendingUp, ShieldAlert, Cpu, Zap } from "lucide-react";

export const BentoStats: React.FC = () => {
  return (
    <section className="py-12 border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Top Performance */}
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-white/[0.08] hover:border-indigo-500/40 hover:bg-zinc-900/70 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 tracking-wider mb-6">
              <span className="flex items-center gap-1.5 uppercase">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                Top Performance
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">
                RANK #1
              </span>
            </div>

            <div className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-white mb-3 group-hover:text-indigo-200 transition-colors">
              87.8
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-light">
              <span className="text-white font-medium">GPT-5.6 Luna</span> 在全四项任务中均位居第一位，变量化因果建模与违约连环死局推导刷新基准记录。
            </p>
          </div>

          {/* Card 2: Factual Rigor */}
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-white/[0.08] hover:border-emerald-500/40 hover:bg-zinc-900/70 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 tracking-wider mb-6">
              <span className="flex items-center gap-1.5 uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                Factual Boundary
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                ZERO FICTION
              </span>
            </div>

            <div className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-white mb-3 group-hover:text-emerald-200 transition-colors">
              0.0<span className="text-2xl font-sans text-zinc-500 ml-1">%</span>
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-light">
              头部梯队在未知借款日期与录音未定事项中，严守事实边界，绝不把“讨论中”脑补为“已敲定决议”。
            </p>
          </div>

          {/* Card 3: Minimal Tokens */}
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-white/[0.08] hover:border-cyan-500/40 hover:bg-zinc-900/70 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 tracking-wider mb-6">
              <span className="flex items-center gap-1.5 uppercase">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Minimal Tokens
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-semibold">
                HIGH DENSITY
              </span>
            </div>

            <div className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-white mb-3 group-hover:text-cyan-200 transition-colors">
              130<span className="text-2xl font-sans text-zinc-500 ml-1">L</span>
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-light">
              <span className="text-white font-medium">智谱 GLM-5.3</span> 仅用 130 行精炼文本即构建出具备杀伤力的反向博弈筹码，高层汇报首选底稿。
            </p>
          </div>

          {/* Card 4: Real Independent Insight */}
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-white/[0.08] hover:border-amber-500/40 hover:bg-zinc-900/70 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 tracking-wider mb-6">
              <span className="flex items-center gap-1.5 uppercase">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Commercial Realism
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">
                ANTI-SLOP
              </span>
            </div>

            <div className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-white mb-3 group-hover:text-amber-200 transition-colors">
              100<span className="text-2xl font-sans text-zinc-500 ml-1">%</span>
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-light">
              穿透“面子消费”陷阱，破除公文套话，以真实商业法律实操为唯一评判标尺，还原真实决策锋芒。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
