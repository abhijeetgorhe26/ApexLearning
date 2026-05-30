"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import * as Icons from "lucide-react";
import { Course } from "@/types";

interface CourseTileProps {
  course: Course;
}

// Map database strings to actual Lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  Atom: Icons.Atom,
  Server: Icons.Server,
  Sparkles: Icons.Sparkles,
  Database: Icons.Database,
  Code: Icons.Code,
  Shield: Icons.ShieldAlert,
};

// Course-specific visual presets to provide rich, human-creative design layouts
const themeMap: Record<string, {
  color: string;
  glow: string;
  gradient: string;
  svgPath: string;
}> = {
  Atom: {
    color: "text-blue-400 border-blue-500/25 bg-blue-500/5",
    glow: "rgba(59, 130, 246, 0.15)",
    gradient: "from-blue-500 to-indigo-500",
    svgPath: "M 0,50 Q 25,25 50,50 T 100,50 T 150,50 T 200,50",
  },
  Server: {
    color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/5",
    glow: "rgba(16, 185, 129, 0.15)",
    gradient: "from-emerald-400 to-teal-500",
    svgPath: "M 0,20 Q 40,80 80,30 T 160,70 T 200,20",
  },
  Sparkles: {
    color: "text-fuchsia-400 border-fuchsia-500/25 bg-fuchsia-500/5",
    glow: "rgba(217, 70, 239, 0.15)",
    gradient: "from-fuchsia-500 to-purple-500",
    svgPath: "M 0,80 Q 30,10 70,60 T 140,20 T 200,80",
  },
  Database: {
    color: "text-amber-400 border-amber-500/25 bg-amber-500/5",
    glow: "rgba(245, 158, 11, 0.15)",
    gradient: "from-amber-500 to-orange-500",
    svgPath: "M 0,40 Q 50,90 100,10 T 180,60 T 200,40",
  },
};

export default function CourseTile({ course }: CourseTileProps) {
  // Select preset theme based on the course icon
  const theme = themeMap[course.icon_name] || {
    color: "text-indigo-400 border-indigo-500/25 bg-indigo-500/5",
    glow: "rgba(99, 102, 241, 0.15)",
    gradient: "from-indigo-500 to-purple-500",
    svgPath: "M 0,50 Q 50,20 100,80 T 200,50",
  };

  const IconComponent = iconMap[course.icon_name] || Icons.BookOpen;

  // Spring physics setup for progress indicator
  const progressSpring = useSpring(0, {
    stiffness: 70,
    damping: 15,
    mass: 1,
  });

  const width = useTransform(progressSpring, (val) => `${val}%`);

  useEffect(() => {
    // Animate progress bar from 0 to full progress on component mount
    const timer = setTimeout(() => {
      progressSpring.set(course.progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [course.progress, progressSpring]);

  // Hooking spring animation state to local state to render text securely
  const [displayedProgress, setDisplayedProgress] = useState(0);
  useEffect(() => {
    return progressSpring.on("change", (latest) => {
      setDisplayedProgress(Math.round(latest));
    });
  }, [progressSpring]);

  return (
    <motion.article
      whileHover={{
        scale: 1.018,
        y: -3,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="glass-card rounded-2xl p-5 flex flex-col justify-between h-48 overflow-hidden relative cursor-pointer group hardware-accelerated"
    >
      {/* Dynamic Colored Mesh background preset */}
      <div
        className="mesh-pattern absolute inset-0 mix-blend-screen opacity-10 transition-opacity duration-300 group-hover:opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 75% 20%, ${theme.glow} 0%, transparent 60%)`,
        }}
      />
      
      {/* Decorative SVG abstract wave track in background */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20 text-slate-500/5 pointer-events-none transition-all duration-500 group-hover:text-slate-500/10 group-hover:scale-y-110"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        <path
          d={theme.svgPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      {/* Header Info */}
      <div className="relative z-10 flex justify-between items-start">
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:rotate-6 ${theme.color}`}>
          <IconComponent size={22} className="relative z-10" />
        </div>
        <span className="text-[10px] font-mono text-slate-400 font-bold bg-white/5 border border-white/5 px-2 py-0.5 rounded-md uppercase tracking-wider">
          active track
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 my-3">
        <h3 className="font-bold text-slate-100 group-hover:text-white transition-colors text-base line-clamp-2 tracking-tight">
          {course.title}
        </h3>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 w-full mt-auto">
        <div className="flex justify-between items-center text-xs mb-1.5 font-sans">
          <span className="text-slate-400 font-medium">Course Completion</span>
          <span className="font-mono font-bold text-indigo-300">
            {displayedProgress}%
          </span>
        </div>
        
        {/* Custom Progress Track & Glow Head */}
        <div className="h-2 w-full bg-slate-950/60 rounded-full overflow-hidden border border-white/5 p-[1px] relative">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} relative`}
            style={{
              width,
            }}
          >
            {/* Shimmer light effect overlaying progress bar */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] bg-[length:120px_100%] animate-[shimmer_2.5s_infinite_linear]" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
