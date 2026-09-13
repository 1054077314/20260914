import React from "react";
import { Sparkles, Terminal, FileCheck, Award } from "lucide-react";
import { BENCHMARK_OVERVIEW } from "../data/benchmarkData";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden">
      {/* Subtle atmospheric gradient light */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -z-10 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Main Title & Editorial Headline */}
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                <Sparkles className="w-3 h-3" />
                Intelligence Audit Dossier
              </span>
              <span className="text-zinc-600 text-xs font-mono">//</span>
              <span className="text-xs font-mono text-zinc-400 tracking-wider">
                CONFIDENTIAL EVALUATION SUITE
              </span>
            </div>

            <h1 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white font-normal italic leading-[0.92]">
              The Decision <br />
              <span className="text-zinc-100 not-italic tracking-normal font-light">Ledger.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl pt-2">
              面向<span className="text-zinc-200 font-normal">极限生存压力决策</span>、
              <span className="text-zinc-200 font-normal">消费合规与隐形条款审计</span>、
              <span className="text-zinc-200 font-normal">长程现金流断裂点推演</span>与
              <span className="text-zinc-200 font-normal">一手录音事实纪要改写</span>四大高难度实操套件。
              对 6 大前沿主力大模型物理答卷进行逐行人工交叉复核与事实一致性评定。
            </p>
          </div>

          {/* Right Stamp Card / Credential Box */}
          <div className="lg:w-80 p-5 rounded-2xl bg-zinc-900/60 border border-white/[0.09] shadow-2xl backdrop-blur-md space-y-3 shrink-0">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                Audit Rigor
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-semibold">
                VERIFIED 100%
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span className="text-zinc-500">METHODOLOGY:</span>
                <span className="text-zinc-300">Double Blind Cross-Audit</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="text-zinc-500">SAMPLES COVERED:</span>
                <span className="text-zinc-200 font-semibold">{BENCHMARK_OVERVIEW.auditedPhysicalAnswers} Transcripts</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="text-zinc-500">TASK VECTORS:</span>
                <span className="text-zinc-300">4 Core Stress Suites</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="text-zinc-500">LEADER:</span>
                <span className="text-indigo-300 font-bold">GPT-5.6 LUNA (87.8)</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-zinc-400 leading-snug border-t border-white/[0.06] italic">
              “杜绝模糊估算与伪概念，纯净以真实商业约束穿透力为唯一度量衡。”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
