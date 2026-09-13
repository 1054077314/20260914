export interface TaskScore {
  no: string; // e.g. "01", "02", "03", "04"
  name: string; // e.g. "生存决策", "按摩消费", "现金流", "纪要改写"
  fullName: string;
  score: number | null;
  link: string;
  keyObservation?: string;
  deductionReason?: string;
}

export type StrategyTier =
  | "ELITE STRATEGY"
  | "CORE AGILE"
  | "BOUNDARY STABLE"
  | "INDEPENDENT"
  | "AUDIT NEUTRAL"
  | "SOP STANDARD";

export interface ModelAudit {
  id: string; // "001", "002"
  key: string; // "gpt", "glm", etc.
  name: string;
  alias: string;
  score: number;
  tag: StrategyTier;
  tagColor: string;
  desc: string;
  adv: string;
  limit: string;
  usage: string;
  notableQuote?: string;
  tokenFootprint?: string;
  hallucinationRate?: string;
  tasks: TaskScore[];
}

export interface BenchmarkSuite {
  no: string;
  id: string;
  title: string;
  subtitle: string;
  coreQuestion: string;
  evaluationFocus: string[];
  scoringWeights: { criteria: string; weight: number }[];
  expertCommentary: string;
  keyChallenge: string;
}

export interface TaskInspectionTarget {
  model: ModelAudit;
  task: TaskScore;
  suite: BenchmarkSuite;
}
