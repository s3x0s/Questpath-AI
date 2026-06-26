/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, RotateCcw } from "lucide-react";

interface NavbarProps {
  onReset: () => void;
  showReset?: boolean;
}

export function Navbar({ onReset, showReset = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/65 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div 
          onClick={onReset}
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-500 p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Compass className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-bold tracking-tight text-white sm:text-2xl">
              Real<span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">Quest</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
              Learn by Living
            </span>
          </div>
        </div>

        {showReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            id="btn-navbar-restart"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart Sim
          </button>
        )}
      </div>
    </header>
  );
}
