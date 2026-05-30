"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Course, ActiveSection } from "@/types";
import Sidebar from "@/components/Sidebar";
import DashboardGrid from "@/components/DashboardGrid";
import CourseTile from "@/components/CourseTile";
import { 
  Sparkles, 
  Library, 
  GraduationCap, 
  Flame, 
  Star, 
  ShieldAlert, 
  Search, 
  X, 
  Terminal, 
  BookOpen, 
  LineChart, 
  Users, 
  Settings 
} from "lucide-react";

interface DashboardProps {
  courses: Course[];
  isSandbox: boolean;
}

export default function Dashboard({ courses, isSandbox }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard");
  const [courseFilter, setCourseFilter] = useState<"all" | "completed" | "active">("all");

  // Mobile enhancements: search bar and overlay drawer state hooks
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((c) => {
    const matchesFilter =
      courseFilter === "all" ||
      (courseFilter === "completed" && c.progress >= 90) ||
      (courseFilter === "active" && c.progress < 90);

    const matchesSearch =
      searchQuery === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full w-full min-h-screen relative">
      {/* Sidebar - Collapsible on Desktop, Bottom bar on Mobile */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSandbox={isSandbox}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto min-h-screen max-w-full">
        {/* Top Header Row - Responsive Desktop Location Path vs Mobile Next.js styled branding */}
        <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5 h-16 shrink-0 relative z-20 bg-[#06060c]">
          {/* Desktop Left: Location Path */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Location //
            </span>
            <span className="text-xs font-semibold text-slate-300 capitalize font-mono">
              {activeSection}
            </span>
          </div>

          {/* Mobile Left: Brand logo matching Next.js minimalist solid triangle styling */}
          <div className="md:hidden flex items-center gap-2 select-none">
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-current shrink-0">
              <path d="M9 1L17 15H1L9 1Z" />
            </svg>
            <span className="text-slate-800 font-light text-xl select-none">/</span>
            <span className="text-xs sm:text-sm font-black tracking-widest text-white font-sans uppercase">
              APEX.JS
            </span>
          </div>

          {/* Desktop Right: XP badge / Sandbox status */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300 font-semibold font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" /> 180 XP Today
            </div>
            
            {isSandbox && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-400 font-bold font-mono">
                <ShieldAlert size={12} /> Local Sandbox Fallback
              </div>
            )}
          </div>

          {/* Mobile Right: Search magnifying glass & Minimalist 2-line Hamburger Menu */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Search syllabus"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 flex flex-col justify-between h-3.5 w-5 py-0.5"
              aria-label="Navigation drawer"
            >
              <span className="h-[1.5px] w-full bg-current rounded-full" />
              <span className="h-[1.5px] w-full bg-current rounded-full" />
            </button>
          </div>
        </header>

        {/* Dynamic section rendering with fade-in animations */}
        <div className="flex-1 p-2 sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full h-full flex flex-col"
            >
              {/* ================= SECTION: DASHBOARD BENTO ================= */}
              {activeSection === "dashboard" && (
                <DashboardGrid courses={courses} />
              )}

              {/* ================= SECTION: COURSES VIEWER ================= */}
              {activeSection === "courses" && (
                <section className="p-4 lg:p-6 max-w-6xl mx-auto w-full pb-28 md:pb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
                        <Library size={24} className="text-indigo-400" /> Syllabus Catalogs
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Track syllabus completions, practice exercises, and final assessments.
                      </p>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex items-center gap-1.5 bg-[#090910] border border-white/5 p-1 rounded-xl shrink-0 select-none">
                      {(["all", "active", "completed"] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setCourseFilter(filter)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            courseFilter === filter
                              ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Course Cards list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseTile key={course.id} course={course} />
                    ))}
                  </div>
                </section>
              )}

              {/* ================= SECTION: ANALYTICS ================= */}
              {activeSection === "analytics" && (
                <section className="p-4 lg:p-6 max-w-4xl mx-auto w-full pb-28 md:pb-6">
                  <h2 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2 mb-6">
                    <Sparkles size={24} className="text-indigo-400" /> Analytics Canvas
                  </h2>
                  <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-center items-center h-80 text-center">
                    <GraduationCap size={48} className="text-indigo-400 animate-bounce mb-4" />
                    <h3 className="text-lg font-bold text-slate-200 mb-1">Learning Velocity Charting</h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                      Your historical learning metrics, average session speeds, and concept comprehension vectors are currently compiling.
                    </p>
                  </div>
                </section>
              )}

              {/* ================= SECTION: COMMUNITY ================= */}
              {activeSection === "community" && (
                <section className="p-4 lg:p-6 max-w-4xl mx-auto w-full pb-28 md:pb-6">
                  <h2 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2 mb-6">
                    Network Circle
                  </h2>
                  <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-center items-center h-80 text-center">
                    <Flame size={48} className="text-orange-400 animate-pulse mb-4" />
                    <h3 className="text-lg font-bold text-slate-200 mb-1">Cohort Lounge</h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                      Connect with peers on the same track, share progress blocks, and review peer pull requests.
                    </p>
                  </div>
                </section>
              )}

              {/* ================= SECTION: SETTINGS ================= */}
              {activeSection === "settings" && (
                <section className="p-4 lg:p-6 max-w-4xl mx-auto w-full pb-28 md:pb-6">
                  <h2 className="text-2xl font-black text-slate-100 tracking-tight mb-6">
                    Dashboard Settings
                  </h2>
                  <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-6">
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-200">Hardware Acceleration</h3>
                        <p className="text-[11px] text-slate-500">Enable WebGL and translation layers for faster framer rendering.</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-md uppercase tracking-wider">active</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-200">Data Fetching Node</h3>
                        <p className="text-[11px] text-slate-500">Current active connection serving active courses data.</p>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        isSandbox 
                          ? "text-amber-400 bg-amber-500/10 border border-amber-500/25"
                          : "text-indigo-400 bg-indigo-500/10 border border-indigo-500/25"
                      }`}>
                        {isSandbox ? "local sandbox" : "supabase cloud"}
                      </span>
                    </div>
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ================= MOBILE NAVIGATION OVERLAY DRAWER ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop blurred overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#090910]/95 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col z-50 md:hidden overflow-y-auto select-none"
            >
              {/* Drawer Close & Brand Logo */}
              <div className="flex justify-between items-center pb-5 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2 select-none">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-current shrink-0">
                    <path d="M9 1L17 15H1L9 1Z" />
                  </svg>
                  <span className="text-[12px] font-black tracking-widest text-white uppercase font-sans">
                    APEX.JS
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-8 w-8 rounded-lg hover:bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* User Profile info */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-4 mb-6 hover:bg-white/10 transition-colors">
                <div className="relative h-11 w-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shrink-0 text-base">
                  AG
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#090910]" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-100 truncate">Abhijeet Gorhe</p>
                  <p className="text-xs text-indigo-400 truncate flex items-center gap-1 font-mono">
                    <Terminal size={10} /> Student Intern
                  </p>
                </div>
              </div>

              {/* Learning stats layout */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-3 text-center animate-pulse">
                  <p className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Today</p>
                  <p className="text-sm font-bold text-slate-200 mt-0.5">180 XP</p>
                </div>
                <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-mono text-purple-400 uppercase tracking-widest font-bold">Streak</p>
                  <p className="text-sm font-bold text-slate-200 mt-0.5">12 Days</p>
                </div>
              </div>

              {/* Sandbox info */}
              {isSandbox && (
                <div className="px-4 py-2.5 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-2 mb-6">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <span className="text-[10px] font-mono text-amber-300 tracking-wider uppercase font-semibold">
                    Sandbox Mode Active
                  </span>
                </div>
              )}

              {/* Sidebar Menu mimic list */}
              <div className="flex-1 space-y-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold mb-3">Navigation Menu</p>
                {(
                  [
                    { id: "dashboard", label: "Dashboard", icon: Sparkles },
                    { id: "courses", label: "My Courses", icon: BookOpen },
                    { id: "analytics", label: "Analytics", icon: LineChart },
                    { id: "community", label: "Network", icon: Users },
                    { id: "settings", label: "Settings", icon: Settings },
                  ] as const
                ).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                        isActive 
                          ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/10 font-bold" 
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer footer info */}
              <div className="pt-4 border-t border-white/5 text-center mt-auto">
                <p className="text-[10px] font-mono text-slate-500">Apex EdTech // v0.1.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= MOBILE SEARCH BAR OVERLAY ================= */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Dark Search Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed top-0 left-0 right-0 h-16 bg-[#06060c]/95 backdrop-blur-md border-b border-white/10 z-50 flex items-center px-4 gap-3 md:hidden"
            >
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search courses or modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-100 placeholder-slate-500 font-sans h-full"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                <X size={16} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
