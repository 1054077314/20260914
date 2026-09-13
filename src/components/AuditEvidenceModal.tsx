import React, { useEffect } from "react";
import { TaskInspectionTarget } from "../types";
import {
  X,
  FileCheck,
  Award,
  AlertCircle,
  Scale,
  ExternalLink,
  Target,
  FileText,
  FileCode,
} from "lucide-react";

interface AuditEvidenceModalProps {
  target: TaskInspectionTarget | null;
  onClose: () => void;
}

export const AuditEvidenceModal: React.FC<AuditEvidenceModalProps> = ({
  target,
  onClose,
}) => {
  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!target) return null;

  const { model, task, suite } = target;
  const hasScore = task.score !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/75 animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-white/[0.12] shadow-2xl z-10 p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-wider uppercase mb-1">
              <span>EVALUATION AUDIT EVIDENCE</span>
              <span className="text-zinc-600">//</span>
              <span>TASK {task.no}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {model.name} &mdash; {task.fullName}
            </h3>
            <span className="text-xs font-mono text-zinc-400 mt-0.5 block">
              MODEL STRATEGY: {model.tag} &middot; {model.alias}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Score Badge */}
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                AUDITED SCORE
              </span>
              <span className="font-serif-display text-4xl text-white font-normal leading-none">
                {hasScore ? task.score : "&mdash;"}
              </span>
              {hasScore && (
                <span className="text-xs font-mono text-zinc-500"> / 100</span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Physical Transcript Link reference */}
        {task.link && (
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2 truncate">
              <FileCode className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-zinc-500">PHYSICAL ANSWER TRANSCRIPT:</span>
              <span className="text-zinc-200 truncate">{task.link}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-400 shrink-0 ml-2">
              AUDITED 100%
            </span>
          </div>
        )}

        {/* Task Objective Synopsis */}
        <div className="p-4 rounded-2xl bg-zinc-950/50 border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
            <Target className="w-3.5 h-3.5" />
            <span>Suite Mission & Challenge // 任务内核</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            {suite.coreQuestion}
          </p>
          <div className="text-[11px] text-zinc-400 font-mono italic">
            考核重点: {suite.keyChallenge}
          </div>
        </div>

        {/* Key Observations & Deductions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Key Observation / Strengths */}
          <div className="p-5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
              <FileCheck className="w-4 h-4" />
              <span>Key Audit Observation // 关键审读亮点</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
              {task.keyObservation || "该模型在此项评测中未包含公开抽样答卷。"}
            </p>
          </div>

          {/* Deduction Reason */}
          <div className="p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>Deductions & Gaps // 扣分与未尽之处</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
              {task.deductionReason || "无明显重大失分点或未采样。"}
            </p>
          </div>
        </div>

        {/* Suite Rubric Weights Allocation */}
        <div className="border-t border-white/[0.08] pt-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-zinc-400" />
            <span>Scoring Rubric Baseline // 审读评分权重基准</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suite.scoringWeights.map((w, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-zinc-950/40 border border-white/[0.04] flex items-center justify-between text-xs"
              >
                <span className="text-zinc-400 text-[11px]">{w.criteria}</span>
                <span className="font-mono text-indigo-300 font-semibold">{w.weight}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 text-xs font-mono tracking-wider transition-colors"
          >
            关闭凭证视窗 (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
