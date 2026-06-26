/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Scores {
  decisionMaking: number;
  leadership: number;
  communication: number;
  riskTolerance: number;
  empathy: number;
}

export interface Choice {
  text: string;
  scores: Scores;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
  image: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  icon: string; // Key of Lucide Icons (e.g. "ClipboardList", "BarChart3", "Rocket", "Megaphone")
  image: string;
  milestones: Milestone[];
}

export interface Scenario {
  id: string;
  title: string;
  narrative: string;
  image: string;
  difficulty: "Junior" | "Mid" | "Senior" | "Executive" | string;
  choices: Choice[];
  optimalChoice: number; // 0-based index of the best option
}
