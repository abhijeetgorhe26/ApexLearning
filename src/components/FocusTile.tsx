"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Brain, Hourglass } from "lucide-react";

export default function FocusTile() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(25 * 60);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <article className="glass-card rounded-3xl p-6 md:col-span-1 flex flex-col justify-between h-full overflow-hidden relative group hardware-accelerated">
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/25 shrink-0">
            <Brain size={18} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-100 text-sm tracking-tight">
              Focus Canvas
            </h2>
            <p className="text-slate-400 text-[10px] mt-0.5 font-sans">
              Pomodoro study clock.
            </p>
          </div>
        </div>

        {/* Counter UI Display */}
        <div className="bg-[#090910] border border-white/5 py-5 rounded-2xl flex flex-col items-center justify-center relative">
          {isActive && (
            <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-semibold text-emerald-300 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> ACTIVE
            </div>
          )}

          <span className="text-3xl font-mono font-extrabold tracking-widest text-slate-100 select-none">
            {formatTime(seconds)}
          </span>
          <p className="text-[9px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
            Focus Session
          </p>
        </div>
      </div>

      {/* Button Controls */}
      <div className="flex gap-2.5 mt-4 pt-4 border-t border-white/5">
        <button
          onClick={toggleTimer}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 border select-none cursor-pointer ${
            isActive
              ? "bg-slate-900 border-indigo-500/20 hover:border-indigo-500/40 text-slate-200"
              : "bg-gradient-to-r from-indigo-500 to-indigo-600 border-indigo-400/20 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/10"
          }`}
        >
          {isActive ? (
            <>
              <Pause size={14} className="fill-current" /> Pause
            </>
          ) : (
            <>
              <Play size={14} className="fill-current" /> Focus
            </>
          )}
        </button>

        <button
          onClick={resetTimer}
          className="h-9 w-9 rounded-xl hover:bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
          title="Reset timer"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </article>
  );
}
