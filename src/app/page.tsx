import React from "react";
import { getCourses } from "@/lib/supabase";
import Dashboard from "@/components/Dashboard";

// Forces Next.js App Router to fetch dynamically on demand
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch dynamic courses securely inside Next.js Server Components (RSC)
  const { data: courses, isSandbox } = await getCourses();

  return (
    <Dashboard
      courses={courses}
      isSandbox={isSandbox}
    />
  );
}
