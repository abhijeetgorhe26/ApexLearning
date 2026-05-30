"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Shield, Hourglass, Zap, TrendingUp, Sparkles } from "lucide-react";

export default function StatsTile() {
  const leaders = [
    { rank: 1, name: "Saket K.", xp: 4890, active: false },
    { rank: 2, name: "Abhijeet G.", xp: 3240, active: true },
    { rank: 3, name: "Pranav M.", xp: 3120, active: false },
  ];

  return (
    <article className="glass-card rounded-3xl p-6 md:col-span-1 flex flex-col justify-between h-full overflow-hidden relative group hardware-accelerated">
      {/* Visual background details */}
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/25 shrink-0">
            <Award size={18} className="text-purple-400" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-100 text-sm tracking-tight">
              Rank & Achievements
            </h2>
            <p className="text-slate-400 text-[10px] mt-0.5">
              XP rewards and cohort standings.
            </p>
          </div>
        </div>

        {/* Dynamic XP Gauge */}
        <div className="bg-[#090910] border border-white/5 p-4 rounded-2xl mb-4 text-center">
          <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold mb-1">
            Current Level
          </p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              Level 12
            </span>
          </div>
          
          {/* Progress to next level */}
          <div className="h-1.5 w-full bg-slate-950 rounded-full mt-3 overflow-hidden p-[1px] border border-white/5 relative">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-[65%]" />
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mt-1.5 uppercase font-bold tracking-wide">
            <span>3,240 XP</span>
            <span>4,000 XP for Lvl 13</span>
          </div>
        </div>

        {/* Mini Leaderboard list */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            Cohort Leaderboard
          </p>
          {leaders.map((leader) => (
            <div
              key={leader.rank}
              className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                leader.active
                  ? "bg-indigo-500/5 border-indigo-500/20 shadow-md shadow-indigo-500/5"
                  : "bg-white/5 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span
                  className={`h-5 w-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                    leader.rank === 1
                      ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                      : leader.rank === 2
                      ? "bg-indigo-500/10 border border-indigo-500/30 text-indigo-400"
                      : "bg-slate-500/10 border border-slate-500/20 text-slate-400"
                  }`}
                >
                  {leader.rank}
                </span>
                <span
                  className={`text-xs truncate font-medium ${
                    leader.active ? "text-indigo-300 font-bold" : "text-slate-300"
                  }`}
                >
                  {leader.name}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {leader.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Micro-badge alert */}
      <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-sans font-medium text-slate-400 flex items-center gap-1.5">
          <Sparkles size={11} className="text-purple-400" /> Top 15% this week
        </span>
        <TrendingUp size={12} className="text-emerald-400 animate-pulse" />
      </div>
    </article>
  );
}
