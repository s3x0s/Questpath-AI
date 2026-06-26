/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Career } from "../types";

interface CareerCardProps {
  key?: string | number;
  career: Career;
  onSelect: (id: string) => void;
}

export function CareerCard({ career, onSelect }: CareerCardProps) {
  // Resolve Lucide icon dynamically
  const IconComponent = (Icons as any)[career.icon] || Icons.HelpCircle;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md"
    >
      {/* Dynamic Background Glow on Hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Career Image with subtle zoom */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
        <img
          src={career.image}
          alt={career.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Floating Icon badge */}
        <div className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/80 border border-white/20 backdrop-blur-sm text-cyan-400">
          <IconComponent className="h-5 w-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-6">
        <h3 className="font-sans text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
          {career.title}
        </h3>
        <p className="mt-2.5 flex-grow font-sans text-sm text-slate-400 leading-relaxed">
          {career.description}
        </p>

        {/* Start Button */}
        <button
          onClick={() => onSelect(career.id)}
          className="mt-6 w-full rounded-xl bg-cyan-600 px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-900/30 transition-all hover:bg-cyan-500 hover:shadow-cyan-400/20 active:scale-95"
          id={`btn-career-${career.id}`}
        >
          Begin Simulation
        </button>
      </div>
    </motion.div>
  );
}
