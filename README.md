# Apex Learning // Next-Gen Student Dashboard

Welcome to **Apex Learning**, a futuristic, highly immersive, and hardware-accelerated Student Dashboard. This platform has been meticulously crafted to demonstrate how cutting-edge visual design can meet modern software engineering principles: **zero layout shifts, buttery-smooth interactions, and modular React patterns.**

![Apex Learning Screenshot](public/Screenshot%202026-05-30%20at%2010.00.31%E2%80%AFAM.png)

The interface is built around an atmospheric dark mode theme (`#06060c`), using glassmorphic bento grids, glowing hover gradients, and organic spring physics to create a delightful learning experience.

---

## 🛠️ The Tech Stack

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Database / BaaS**: Supabase PostgreSQL
- **Styling**: Tailwind CSS v4 (with modern atmospheric radial layouts)
- **Animations**: Framer Motion (strict spring-physics implementations)
- **Icons**: Lucide React

---

## 🏗️ Architectural Overview & Design Split

To satisfy both SEO velocity and dynamic UI interactions, the application is divided cleanly into **Server Components** and **Client Components**:

### 1. Server Components (RSC)

- **`src/app/page.tsx`**: Serves as our secure entry gate. It executes the database query directly on the server, fetching our course schedules and progress milestones securely without exposing API keys or triggering client-side hydration waterfalls.
- **`src/lib/supabase.ts`**: Coordinates the client connectors. If live database variables are missing, it triggers our highly interactive **Local Sandbox Fallback**, providing flawless seeded data so that inspectors can explore the complete application immediately without database setup.

### 2. Client Components

- **`Sidebar`**: Manages collapsible navigation drawer states (full on desktop, compact on tablet, floating tab bar on mobile) and uses Framer Motion's `layoutId` to animate the active highlight indicator smoothly across tabs.
- **`DashboardGrid`**: Manages the staggered entrance animation of the Bento grid tiles sequentially, utilizing spring physics for a fluid, natural cascade.
- **`HeroTile`**: Incorporates custom greeting timers and manages an interactive **Streak Tracker calendar** where days can be clicked to toggle progress.
- **`CourseTile`**: Features custom SVG mesh canvas backgrounds styled individually for each course and handles progress-bar loading animations from `0%` to target on initial mount.
- **`ActivityTile`**: Replicates a study-contribution heatmap (similar to GitHub commits) with interactive tooltip triggers showing dynamic learning session minutes and lesson scores.
- **`FocusTile`**: Implements an interactive Pomodoro Study Counter with state controls, perfect for focused session reviews.

---

## ⚡ Performance Optimization & Zero Layout Shifts

To achieve a **Cumulative Layout Shift (CLS) of exactly 0**, we strictly adhered to these guidelines:

1. **Absolute Aspect Positioning**: Skeletons match the precise vertical and horizontal heights of the interactive Bento tiles.
2. **GPU Acceleration**: Animations exclusively modify `transform` and `opacity` parameters, leveraging hardware layers for smooth 60fps rendering without paint events.
3. **Responsive CSS Media Hooks**: Responsive structural layouts are completely CSS-driven (using Tailwind's breakpoints) to prevent flash-of-unstyled-content (FOUC) layout jumps.

---

## 💾 Database Integration & Setup

To initialize the live Supabase database, run the following SQL commands in your Supabase SQL Editor:

```sql
-- 1. Create the courses table
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0 check (progress >= 0 and  progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default now()
);

-- 2. Enable Row Level Security (RLS)
alter table courses enable row level security;

-- 3. Create a public read-only access policy
create policy "Allow public read access"
on courses for select
using (true);

-- 4. Seed the database with high-fidelity learning courses
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 78, 'Atom'),
  ('Next-Gen Server Architectures', 45, 'Server'),
  ('Framer Motion Masterclass', 92, 'Sparkles'),
  ('Database Systems & Web Security', 30, 'Database');
```

---

## 🚀 Getting Started & Local Launch

### 1. Configure Credentials

Duplicate `.env.example` to `.env.local` and insert your credentials:

```bash
cp .env.example .env.local
```

_(Note: If you leave these values blank, the dashboard will automatically run in its elegant **Sandbox Fallback Mode** with mock credentials!)_

### 2. Run the Development Server

Install dependencies and trigger the server node:

```bash
npm install
npm run dev
```

The application is now active at **[http://localhost:3000](http://localhost:3000)**.

---

## 📱 Responsive Grid Breakdown

- **Desktop (>1024px)**: Expandable left navigation drawer with 4-column Bento layout.
- **Tablet (768px - 1024px)**: Collapsed icon-only navigation, scaling the grid down to 2 columns.
- **Mobile (<768px)**: Smooth bottom-floating tab bar, reflowing the Bento grid into a single vertical scroll.

# ApexLearning
