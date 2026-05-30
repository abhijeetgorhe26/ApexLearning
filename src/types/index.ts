export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export type ActiveSection = "dashboard" | "courses" | "analytics" | "community" | "settings";

export interface LearningStat {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: string;
}

export interface ContributionDay {
  date: string;
  count: number; // 0 to 4 representing activity level
  lessons: number;
}
