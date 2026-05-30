import { createClient } from "@supabase/supabase-js";
import { Course } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials exist
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// High fidelity mock database seeds for zero-config visual sandbox mode
const MOCK_COURSES: Course[] = [
  {
    id: "f37a544c-f17e-4028-a6d3-c9cd077d962a",
    title: "Advanced React Patterns",
    progress: 78,
    icon_name: "Atom",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "f37a544c-f17e-4028-a6d3-c9cd077d962b",
    title: "Next-Gen Server Architectures",
    progress: 45,
    icon_name: "Server",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "f37a544c-f17e-4028-a6d3-c9cd077d962c",
    title: "Framer Motion Masterclass",
    progress: 92,
    icon_name: "Sparkles",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "f37a544c-f17e-4028-a6d3-c9cd077d962d",
    title: "Database Systems & Web Security",
    progress: 30,
    icon_name: "Database",
    created_at: new Date().toISOString(),
  },
];

/**
 * Fetches course records.
 * Uses Server-Side rendering. 
 * Automatically falls back to high-fidelity mock data if database is unconfigured or unreachable.
 */
export async function getCourses(): Promise<{ data: Course[]; isSandbox: boolean }> {
  // Simulate standard network latency (800ms) to allow skeletal animations to demonstrate their high-fidelity shimmers
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (!isSupabaseConfigured || !supabase) {
    console.warn("Supabase environment variables are missing. Falling back to local Sandbox Mode.");
    return { data: MOCK_COURSES, isSandbox: true };
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase query error: ", error.message);
      return { data: MOCK_COURSES, isSandbox: true };
    }

    if (!data || data.length === 0) {
      console.warn("Supabase returned empty rows. Displaying seed records in Sandbox Mode.");
      return { data: MOCK_COURSES, isSandbox: true };
    }

    return { data: data as Course[], isSandbox: false };
  } catch (err: any) {
    console.error("Unexpected connection failure to Supabase: ", err.message);
    return { data: MOCK_COURSES, isSandbox: true };
  }
}
