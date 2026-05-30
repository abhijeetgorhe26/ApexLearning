"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star, Trophy, ArrowRight, Zap, Target } from "lucide-react";

export default function HeroTile() {
  const [greeting, setGreeting] = useState("Welcome back");
  const [userName] = useState("Abhijeet");
  const [streakDays, setStreakDays] = useState([
    { name: "Mon", completed: true, active: false },
    { name: "Tue", completed: true, active: false },
    { name: "Wed", completed: true, active: false },
    { name: "Thu", completed: true, active: false },
    { name: "Fri", completed: true, active: false },
    { name: "Sat", completed: false, active: true },
    { name: "Sun", completed: false, active: false },
  ]);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Micro-interaction: allow clicking a day to toggle it (pure high-fidelity delight)
  const toggleDay = (index: number) => {
    setStreakDays((prev) =>
      prev.map((day, idx) => {
        if (idx === index) {
          return {
            ...day,
            completed: !day.completed,
            active: day.active, // keep active status
          };
        }
        return day;
      })
    );
  };

  const completedCount = streakDays.filter((d) => d.completed).length;

  return (
    <article className="glass-card rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col md:flex-row justify-between gap-6 md:col-span-3 overflow-hidden relative group">
      {/* Decorative ambient glow inside hero card */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-700" />
      <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Greeting and Motivation */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4 self-start tracking-wide uppercase font-mono">
            <Zap size={12} className="text-indigo-400 animate-pulse" /> Accelerator Hub
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-slate-100 via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
            {greeting}, {userName}!
          </h1>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed mt-2">
            You are accelerating past <strong className="text-slate-200">89%</strong> of students in React and Database system tracks. Complete today's targets to maintain your leaderboard position.
          </p>
        </div>

        {/* Motivational Tip Card */}
        <div className="mt-6 flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3.5 max-w-sm hover:bg-white/10 transition-colors">
          <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/25 shrink-0">
            <Trophy className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">Daily Milestone</p>
            <p className="text-xs font-medium text-slate-300">Complete 1 lesson in Framer Motion to get the <span className="text-amber-400 font-bold">Physics Badge</span></p>
          </div>
        </div>
      </div>

      {/* Learning Streak Indicator */}
      <div className="relative z-10 flex flex-col justify-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 md:w-80 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/25">
              <Flame size={18} className="text-orange-400 fill-orange-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Daily Streak</p>
              <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-1.5 leading-tight">
                {completedCount + 7} <span className="text-xs text-orange-400 font-bold">Days</span>
              </h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Velocity</p>
            <p className="text-xs font-semibold text-slate-200">5.2 hrs/wk</p>
          </div>
        </div>

        {/* Streak Nodes Row */}
        <div className="flex justify-between items-center mt-2 gap-1 sm:gap-1.5">
          {streakDays.map((day, index) => (
            <div
              key={day.name}
              onClick={() => toggleDay(index)}
              className="flex flex-col items-center gap-1.5 cursor-pointer select-none group/node"
            >
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 font-medium transition-colors group-hover/node:text-indigo-300">
                {day.name}
              </span>
              
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 relative ${
                  day.completed
                    ? "bg-gradient-to-br from-indigo-500 to-indigo-600 border border-indigo-400/30 text-white shadow-lg shadow-indigo-500/20"
                    : day.active
                    ? "bg-indigo-500/10 border-2 border-indigo-400 text-indigo-400 shadow-lg shadow-indigo-500/10"
                    : "bg-[#0d0d16] border border-white/5 text-slate-600 hover:border-slate-500/30 hover:text-slate-400"
                }`}
              >
                {day.completed ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Flame size={13} className="fill-white" />
                  </motion.div>
                ) : day.active ? (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                  />
                ) : (
                  <span className="text-[9px] sm:text-[10px] font-bold font-mono">
                    {index + 1}
                  </span>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
