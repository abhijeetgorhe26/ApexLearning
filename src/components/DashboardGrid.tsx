"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Course } from "@/types";
import HeroTile from "./HeroTile";
import CourseTile from "./CourseTile";
import ActivityTile from "./ActivityTile";
import StatsTile from "./StatsTile";
import FocusTile from "./FocusTile";

interface DashboardGridProps {
  courses: Course[];
}

// Framer Motion spring-physics presets for highly performant staggered entries
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08, // Stagger tiles incrementally
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.8,
    },
  },
};

export default function DashboardGrid({ courses }: DashboardGridProps) {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-3 sm:p-4 lg:p-6 w-full max-w-[1600px] mx-auto pb-28 md:pb-8"
    >
      {/* ================= ROW 1 ================= */}
      {/* Hero card greeting */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-3 hardware-accelerated"
      >
        <HeroTile />
      </motion.div>

      {/* Cohort standing stats */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 hardware-accelerated"
      >
        <StatsTile />
      </motion.div>

      {/* ================= ROW 2 (DYNAMIC COURSES) ================= */}
      {courses.map((course) => (
        <motion.div
          key={course.id}
          variants={itemVariants}
          className="md:col-span-1 hardware-accelerated"
        >
          <CourseTile course={course} />
        </motion.div>
      ))}

      {/* ================= ROW 3 ================= */}
      {/* Main heatmap visualizer */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-3 hardware-accelerated"
      >
        <ActivityTile />
      </motion.div>

      {/* Pomodoro study click timer */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 hardware-accelerated"
      >
        <FocusTile />
      </motion.div>
    </motion.main>
  );
}
