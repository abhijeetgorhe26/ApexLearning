"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, HelpCircle, Activity, Hourglass, Zap } from "lucide-react";
import { ContributionDay } from "@/types";

export default function ActivityTile() {
  const [metric, setMetric] = useState<"lessons" | "minutes">("minutes");
  const [hoveredCell, setHoveredCell] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Generate 16 weeks of realistic learning activity data (112 days)
  const activityData = useMemo(() => {
    const data: ContributionDay[] = [];
    
    // Fixed base UTC date (Monday, February 2, 2026) to prevent timezone/time hydration mismatches
    const startDate = new Date(Date.UTC(2026, 1, 2)); // Feb is 1 (0-indexed)

    // Deterministic pseudo-random number generator using sine-wave seeds
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < 112; i++) {
      const currentDate = new Date(startDate.getTime());
      currentDate.setUTCDate(startDate.getUTCDate() + i);
      
      const dayIndex = currentDate.getUTCDay();
      const isWeekend = dayIndex === 0 || dayIndex === 6;
      let probability = isWeekend ? 0.35 : 0.75;
      
      // Seeded high activity bursts
      const isSpurt = Math.sin(i / 10) > 0.6;
      if (isSpurt) probability += 0.2;

      const rand1 = seededRandom(i + 1);
      const hasActivity = rand1 < probability;
      let count = 0;
      let lessons = 0;

      if (hasActivity) {
        const rand2 = seededRandom(i + 500);
        count = Math.floor(rand2 * 4) + 1; // 1 to 4 intensity
        
        const rand3 = seededRandom(i + 1000);
        lessons = Math.floor(count * (rand3 > 0.5 ? 1.5 : 1));
      }

      // Safe locale-independent date string
      const dateString = `${months[currentDate.getUTCMonth()]} ${currentDate.getUTCDate()}, ${currentDate.getUTCFullYear()}`;

      data.push({
        date: dateString,
        count,
        lessons,
      });
    }
    return data;
  }, []);

  // Compute aggregated visual metrics
  const stats = useMemo(() => {
    let totalLessons = 0;
    let totalMinutes = 0;
    let activeDays = 0;

    activityData.forEach((day) => {
      totalLessons += day.lessons;
      totalMinutes += day.count * 45; // 45 mins per activity unit
      if (day.count > 0) activeDays++;
    });

    return {
      totalLessons,
      totalHours: (totalMinutes / 60).toFixed(1),
      consistency: Math.round((activeDays / activityData.length) * 100),
    };
  }, [activityData]);

  // Handle cell hovers and retrieve mouse absolute coordinates
  const handleMouseEnter = (event: React.MouseEvent, day: ContributionDay) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();
    
    // Position tooltip directly above hovered cell relative to container
    setHoveredCell({
      day,
      x: cellRect.left - rect.left + cellRect.width / 2,
      y: cellRect.top - rect.top - 8,
    });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  // Color intensities representing learning velocity
  const getCellColor = (count: number) => {
    switch (count) {
      case 0:
        return "bg-slate-900 border-white/5 hover:border-slate-700/50";
      case 1:
        return "bg-indigo-950/40 border-indigo-950/80 text-indigo-400 hover:bg-indigo-900/40";
      case 2:
        return "bg-indigo-900/60 border-indigo-900/90 text-indigo-300 hover:bg-indigo-800/60";
      case 3:
        return "bg-indigo-500/50 border-indigo-400/40 text-indigo-100 hover:bg-indigo-500/70";
      case 4:
        return "bg-indigo-400 border-indigo-300/50 text-white hover:bg-indigo-300 shadow-sm shadow-indigo-500/10";
      default:
        return "bg-slate-900 border-white/5";
    }
  };

  // Reshape flat 112 days into 16 weeks of 7 days
  const weeks = useMemo(() => {
    const chunked = [];
    for (let i = 0; i < activityData.length; i += 7) {
      chunked.push(activityData.slice(i, i + 7));
    }
    return chunked;
  }, [activityData]);

  return (
    <article
      ref={containerRef}
      className="glass-card rounded-3xl p-6 lg:col-span-3 flex flex-col justify-between overflow-hidden relative group hardware-accelerated"
    >
      {/* Dynamic visual headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/25 shrink-0">
              <Calendar size={18} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-100 text-lg tracking-tight">
                Activity Velocity
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Heatmap tracing your live development and review sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Tab switch controls */}
        <div className="flex items-center gap-1 bg-[#090910] border border-white/5 p-1 rounded-xl shrink-0 select-none">
          <button
            onClick={() => setMetric("minutes")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              metric === "minutes"
                ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Study Hours
          </button>
          <button
            onClick={() => setMetric("lessons")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              metric === "lessons"
                ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Lessons Finished
          </button>
        </div>
      </div>

      {/* Grid container overlaying tooltips */}
      <div className="relative my-4 overflow-x-auto pb-2 scrollbar-none select-none">
        {/* Hover Tooltip Render */}
        <AnimatePresence>
          {hoveredCell && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-30 bg-slate-950 border border-indigo-500/25 backdrop-blur-md px-3 py-2 rounded-xl text-center text-xs shadow-xl pointer-events-none w-44"
              style={{
                left: `${hoveredCell.x}px`,
                top: `${hoveredCell.y}px`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="font-semibold text-slate-200">{hoveredCell.day.date}</p>
              <p className="text-[11px] text-indigo-300 font-medium mt-0.5">
                {hoveredCell.day.count === 0
                  ? "No learning logged"
                  : metric === "minutes"
                  ? `⚡️ ${hoveredCell.day.count * 45} mins studied`
                  : `📚 ${hoveredCell.day.lessons} lessons completed`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heatmap Layout Grid */}
        <div className="flex gap-1.5 min-w-[400px]">
          {/* Weekday Labels Column */}
          <div className="flex flex-col justify-between py-1 text-[10px] font-mono text-slate-500 w-7 shrink-0 text-right pr-2">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>

          {/* Map weeks */}
          <div className="flex-1 flex gap-1.5 justify-between">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5 justify-between">
                {week.map((day, dIdx) => (
                  <motion.div
                    key={dIdx}
                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ scale: 1.25, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-[3px] border cursor-crosshair transition-colors duration-200 ${getCellColor(
                      day.count
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Legend & Metric Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-white/5 relative z-10">
        {/* Heatmap Legend */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <span>Less</span>
          <div className="h-2.5 w-2.5 rounded-[2px] bg-slate-900 border border-white/5" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-indigo-950/40 border border-indigo-950/80" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-indigo-900/60 border border-indigo-900/90" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-indigo-500/50 border border-indigo-400/40" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-indigo-400 border border-indigo-300/50" />
          <span>More</span>
        </div>

        {/* Aggregated totals */}
        <div className="flex items-center gap-6 text-xs text-slate-400 font-sans">
          <div className="flex items-center gap-1.5">
            <Hourglass size={13} className="text-indigo-400" />
            <span>
              <strong className="text-slate-200">{stats.totalHours} hrs</strong> studied
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={13} className="text-indigo-400 animate-pulse" />
            <span>
              <strong className="text-slate-200">{stats.consistency}%</strong> consistency
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
