/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between font-mono text-xs text-slate-400">
        <span>SIMULATION TRAJECTORY</span>
        <span className="text-cyan-400 font-bold">
          {current} OF {total} SCENARIOS
        </span>
      </div>
      
      {/* Visual Bar */}
      <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-900 border border-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Discrete Tick Markers */}
      <div className="mt-2 flex justify-between px-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              i < current
                ? "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]"
                : i === current
                ? "bg-amber-400 animate-pulse"
                : "bg-slate-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
