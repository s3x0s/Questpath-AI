/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface ChoiceButtonProps {
  letter: "A" | "B" | "C" | string;
  text: string;
  isSelected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function ChoiceButton({ letter, text, isSelected = false, onClick, disabled = false }: ChoiceButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.015, x: 4 } : {}}
      whileTap={!disabled ? { scale: 0.985 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full flex items-start gap-4 p-5 rounded-2xl border text-left font-sans transition-all duration-300 ${
        isSelected
          ? "border-cyan-400 bg-cyan-950/35 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-white"
          : "border-white/10 bg-slate-900/30 hover:border-white/20 hover:bg-white/5 text-slate-300 hover:text-white"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      id={`btn-choice-${letter}`}
    >
      {/* Selection Glow line */}
      {isSelected && (
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
      )}

      {/* Choice Letter Badge */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold transition-colors duration-300 ${
          isSelected
            ? "bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
            : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
        }`}
      >
        {letter}
      </div>

      {/* Text */}
      <div className="flex-grow pt-0.5 leading-relaxed text-sm sm:text-base">
        {text}
      </div>

      {/* Selector Icon */}
      <div className="shrink-0 pt-1.5 text-slate-500">
        {isSelected ? (
          <CheckCircle2 className="h-5 w-5 text-cyan-400 animate-bounce" />
        ) : (
          <ChevronRight className="h-5 w-5 opacity-40 transition-transform group-hover:translate-x-1" />
        )}
      </div>
    </motion.button>
  );
}
