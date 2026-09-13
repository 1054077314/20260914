import React from "react";
import { ShieldCheck, Lock, ExternalLink } from "lucide-react";
import { BENCHMARK_OVERVIEW } from "../data/benchmarkData";

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-white/[0.08] bg-[#050608] text-zinc-500 text-xs font-mono">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-300 font-semibold tracking-wider uppercase text-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>THE DECISION LEDGER &middot; EXECUTIVE AUDIT 2026</span>
            </div>
            <p className="text-zinc-400 font-light text-xs font-sans max-w-xl leading-relaxed">
              严格遵循实操因果链审计规范。所有数据均基于一手 20 份物理答卷样本进行双盲人工事实一致性裁决，拒绝任何模板化 AI 商业修饰词。
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] tracking-wider">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>RESTRICTED CLASSIFICATION</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} FRONTIER DECISION INTELLIGENCE AUDIT COUNCIL. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>AUDIT CYCLE: 2026-Q3</span>
            <span>VERIFIED SAMPLES: 20</span>
            <span>STANDARDS: ISO/IEC AI-AUDIT 4.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
