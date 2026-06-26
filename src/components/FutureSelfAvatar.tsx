/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, User } from "lucide-react";

export function FutureSelfAvatar() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        {/* Pulsating Amber Halos */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -z-10 rounded-full bg-amber-500/20 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute inset-0 -z-20 rounded-full bg-amber-600/15 blur-2xl"
        />

        {/* Central Avatar Orb */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-400 bg-slate-950 p-[3px] shadow-[0_0_25px_rgba(245,158,11,0.3)]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-amber-600/40 to-amber-400/20 text-amber-400">
            <User className="h-11 w-11 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          </div>
        </div>

        {/* Small floating Sparkle Badge */}
        <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-lg border border-amber-300 bg-slate-950 text-amber-400 shadow-md shadow-amber-950/40">
          <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
        </div>
      </div>

      <div className="mt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500 font-semibold">
          AI TEMPORAL TRANSCEIVER
        </span>
        <h3 className="font-sans text-lg font-bold text-slate-100">
          Your Future Self <span className="text-amber-400">(Year 10+)</span>
        </h3>
      </div>
    </div>
  );
}
