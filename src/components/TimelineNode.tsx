/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Milestone } from "../types";

interface TimelineNodeProps {
  key?: string | number;
  milestone: Milestone;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
}

export function TimelineNode({ milestone, index, isCompleted, isActive }: TimelineNodeProps) {
  // Select icon dynamically based on milestone index
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return Icons.Sprout;
      case 1:
        return Icons.Star;
      case 2:
        return Icons.Award;
      case 3:
        return Icons.Trophy;
      default:
        return Icons.Sparkles;
    }
  };

  const IconComponent = getIcon(index);
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center md:gap-12 min-h-[220px]">
      {/* Timeline Node Center Circle */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 bg-slate-950 shadow-md">
        {isCompleted ? (
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-sm" />
        ) : isActive ? (
          <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-sm" />
        ) : null}
        
        <IconComponent
          className={`h-5 w-5 transition-colors duration-500 ${
            isCompleted
              ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]"
              : isActive
              ? "text-amber-400"
              : "text-slate-600"
          }`}
        />
      </div>

      {/* Left Column (Desktop) / Main Column (Mobile) */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 flex flex-col ${isLeft ? "md:items-end md:text-right" : "md:opacity-100"}`}>
        {/* Only show on left-side nodes on desktop, or normal on mobile */}
        {isLeft ? (
          <TimelineContent milestone={milestone} isCompleted={isCompleted} isActive={isActive} index={index} />
        ) : (
          <TimelineImage milestone={milestone} isCompleted={isCompleted} />
        )}
      </div>

      {/* Right Column (Desktop) */}
      <div className="hidden md:flex w-[45%] flex-col">
        {isLeft ? (
          <TimelineImage milestone={milestone} isCompleted={isCompleted} />
        ) : (
          <TimelineContent milestone={milestone} isCompleted={isCompleted} isActive={isActive} index={index} />
        )}
      </div>
    </div>
  );
}

// Inner helper for textual milestone card
function TimelineContent({ milestone, isCompleted, isActive, index }: { milestone: Milestone; isCompleted: boolean; isActive: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative p-5 rounded-2xl border transition-all duration-300 ${
        isCompleted
          ? "border-cyan-500/20 bg-slate-900/30"
          : isActive
          ? "border-amber-500/30 bg-slate-900/40"
          : "border-white/5 bg-slate-950/20 opacity-40"
      }`}
    >
      <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold">
        <span className={isCompleted ? "text-cyan-400" : isActive ? "text-amber-400" : "text-slate-500"}>
          YEAR {milestone.year}
        </span>
        <span className="text-slate-600">•</span>
        <span className={isCompleted ? "text-cyan-500" : "text-slate-400"}>
          Milestone {index + 1}
        </span>
      </div>

      <h4 className={`font-sans text-lg font-bold ${isCompleted ? "text-white" : "text-slate-300"}`}>
        {milestone.title}
      </h4>
      <p className="mt-2 font-sans text-sm text-slate-400 leading-relaxed">
        {milestone.description}
      </p>
    </motion.div>
  );
}

// Inner helper for visual milestone image
function TimelineImage({ milestone, isCompleted }: { milestone: Milestone; isCompleted: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: isCompleted ? 1 : 0.4, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`relative h-28 w-full md:w-64 overflow-hidden rounded-xl border mt-3 md:mt-0 transition-opacity duration-300 ${
        isCompleted ? "border-white/10" : "border-white/5 opacity-30"
      }`}
    >
      <div className="absolute inset-0 bg-slate-950/40" />
      <img
        src={milestone.image}
        alt={milestone.title}
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover grayscale opacity-60 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
      />
    </motion.div>
  );
}
