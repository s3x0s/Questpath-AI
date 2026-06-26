/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";
import { Scores } from "../types";

interface RadarScoreChartProps {
  scores: Scores;
}

export function RadarScoreChart({ scores }: RadarScoreChartProps) {
  const data = [
    {
      subject: "Decision-Making",
      score: scores.decisionMaking,
    },
    {
      subject: "Leadership",
      score: scores.leadership,
    },
    {
      subject: "Communication",
      score: scores.communication,
    },
    {
      subject: "Risk Tolerance",
      score: scores.riskTolerance,
    },
    {
      subject: "Empathy",
      score: scores.empathy,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-slate-900/20 border border-white/5 rounded-2xl">
      <h4 className="font-mono text-xs tracking-widest text-slate-500 uppercase mb-4 text-center">
        DECISION ALIGNMENT MATRIX
      </h4>
      <div className="w-full h-[280px] sm:h-[320px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" gridType="polygon" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500, fontFamily: "Inter" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#64748b", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <Radar
              name="Decision Scores"
              dataKey="score"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.25}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Mini Score Badges */}
      <div className="mt-4 grid grid-cols-5 gap-2 w-full text-center">
        {data.map((item, idx) => (
          <div key={idx} className="bg-slate-950/40 border border-white/5 p-2 rounded-xl">
            <span className="block font-sans text-[10px] text-slate-400 font-medium truncate">
              {item.subject.split("-")[0]}
            </span>
            <span className="block font-mono text-sm font-bold text-cyan-400">
              {item.score}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
