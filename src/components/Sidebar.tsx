"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  LineChart,
  Users,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Terminal
} from "lucide-react";
import { ActiveSection } from "@/types";

interface SidebarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  isSandbox: boolean;
}

interface NavItem {
  id: ActiveSection;
  label: string;
  icon: React.ComponentType<any>;
}

export default function Sidebar({ activeSection, setActiveSection, isSandbox }: SidebarProps) {
  const [isManualCollapsed, setIsManualCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: LineChart },
    { id: "community", label: "Network", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavClick = (id: ActiveSection) => {
    setActiveSection(id);
  };

  return (
    <>
      {/* ================= DESKTOP & TABLET SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col shrink-0 h-[calc(100vh-2rem)] sticky top-4 my-4 ml-4 rounded-2xl glass-card transition-all duration-300 ease-out z-20 ${isManualCollapsed ? "w-20" : "w-64 lg:w-72"
          }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 flex items-center justify-between border-b border-white/5 h-16">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/25 shrink-0">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
            {!isManualCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="font-bold bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-lg tracking-tight font-sans whitespace-nowrap"
              >
                Apex Learning
              </motion.span>
            )}
          </div>

          {/* Manual Collapse Button (visible on desktop screen sizes) */}
          <button
            onClick={() => setIsManualCollapsed(!isManualCollapsed)}
            className="hidden lg:flex h-6 w-6 rounded-md hover:bg-white/5 items-center justify-center text-slate-400 hover:text-slate-100 transition-colors"
            title={isManualCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isManualCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Status indicator for sandbox mode */}
        {isSandbox && !isManualCollapsed && (
          <div className="mx-4 mt-4 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-[11px] font-mono text-amber-300 tracking-wider uppercase font-semibold">
              Sandbox Mode
            </span>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-colors duration-200 group cursor-pointer ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                {/* Active Indicator Slide Highlight */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-l-2 border-indigo-400 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="relative z-10 shrink-0">
                  <Icon
                    size={20}
                    className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                  />
                </div>

                {!isManualCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 font-sans tracking-wide"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / User Profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div className="relative h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shrink-0 text-sm">
              AG
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#0c0c14]" />
            </div>
            {!isManualCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-200 truncate">Abhijeet Gorhe</p>
                <p className="text-xs text-indigo-400 truncate flex items-center gap-1 font-mono">
                  <Terminal size={10} /> Student Intern
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 rounded-2xl glass-card border border-white/10 flex items-center justify-around px-1.5 py-1 z-40 shadow-2xl shadow-black/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative flex flex-col items-center justify-center px-2 sm:px-3.5 py-1.5 rounded-xl transition-all duration-200 select-none cursor-pointer ${isActive ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileSidebarHighlight"
                  className="absolute inset-0 bg-indigo-500/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={18} className="relative z-10 transition-transform duration-200 group-active:scale-95" />
              <span className={`text-[9px] sm:text-[10px] mt-0.5 font-bold relative z-10 transition-all duration-200 ${isActive ? "block" : "hidden min-[380px]:block"
                }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
