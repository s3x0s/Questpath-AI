/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface GlowingOrbProps {
  color: "cyan" | "amber" | "purple";
  size?: string;
  className?: string;
}

export function GlowingOrb({ color, size = "w-[400px] h-[400px]", className = "" }: GlowingOrbProps) {
  const colorMap = {
    cyan: "bg-cyan-500/10 shadow-[0_0_80px_40px_rgba(6,182,212,0.15)]",
    amber: "bg-amber-500/10 shadow-[0_0_80px_40px_rgba(245,158,11,0.15)]",
    purple: "bg-purple-500/10 shadow-[0_0_80px_40px_rgba(168,85,247,0.15)]",
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${size} ${colorMap[color]} ${className}`}
      animate={{
        x: [0, 40, -30, 0],
        y: [0, -50, 30, 0],
        scale: [1, 1.15, 0.9, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
