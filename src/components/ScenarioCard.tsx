/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Scenario } from "../types";
import { ChoiceButton } from "./ChoiceButton";
import { AlertCircle } from "lucide-react";

interface ScenarioCardProps {
  scenario: Scenario;
  selectedChoiceIndex: number | null;
  onSelectChoice: (index: number) => void;
}

export function ScenarioCard({ scenario, selectedChoiceIndex, onSelectChoice }: ScenarioCardProps) {
  // Map difficulty levels to distinct colors
  const difficultyColors: Record<string, string> = {
    junior: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    mid: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    senior: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    executive: "border-amber-500/30 bg-amber-500/10 text-amber-400"
  };

  const diffKey = scenario.difficulty.toLowerCase();
  const badgeStyle = difficultyColors[diffKey] || "border-slate-500/30 bg-slate-500/10 text-slate-400";

  return (
    <div className="space-y-6">
      {/* Narrative Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md"
      >
        {/* Dynamic header image */}
        {scenario.image && (
          <div className="relative h-44 w-full sm:h-56">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
            <img
              src={scenario.image}
              alt={scenario.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover opacity-80"
            />
            {/* Title overlay */}
            <div className="absolute bottom-4 left-6 right-6 z-20">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${badgeStyle}`}>
                {scenario.difficulty} Level
              </span>
              <h2 className="mt-2 font-sans text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                {scenario.title}
              </h2>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {!scenario.image && (
            <div className="mb-4">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${badgeStyle}`}>
                {scenario.difficulty} Level
              </span>
              <h2 className="mt-2 font-sans text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                {scenario.title}
              </h2>
            </div>
          )}
          
          <div className="flex gap-4 items-start">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-500 animate-pulse" />
            <p className="font-sans text-slate-300 leading-relaxed text-base sm:text-lg">
              {scenario.narrative}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Choice Buttons Staggered */}
      <div className="space-y-3.5">
        <div className="font-mono text-xs tracking-widest text-slate-500 uppercase">
          Evaluate & Choose Your Path:
        </div>
        
        {scenario.choices.map((choice, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C...
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            >
              <ChoiceButton
                letter={letter}
                text={choice.text}
                isSelected={selectedChoiceIndex === index}
                onClick={() => onSelectChoice(index)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
