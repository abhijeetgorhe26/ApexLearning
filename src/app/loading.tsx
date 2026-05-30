import React from "react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col md:flex-row h-full">
      {/* Sidebar Placeholder */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 h-[calc(100vh-2rem)] sticky top-4 my-4 ml-4 rounded-2xl glass-card p-5 border border-white/5 justify-between">
        <div className="space-y-6">
          {/* Logo shimmer */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/5 shimmer-pulse" />
            <div className="h-4 w-28 rounded-md bg-white/5 shimmer-pulse" />
          </div>
          {/* Nav items shimmer */}
          <div className="space-y-3 mt-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="h-5 w-5 rounded-md bg-white/5 shimmer-pulse" />
                <div className="h-3 w-20 rounded-md bg-white/5 shimmer-pulse" />
              </div>
            ))}
          </div>
        </div>
        {/* Profile shimmer */}
        <div className="flex items-center gap-3 p-2 border-t border-white/5 pt-4">
          <div className="h-9 w-9 rounded-full bg-white/5 shimmer-pulse" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 w-24 rounded-md bg-white/5 shimmer-pulse" />
            <div className="h-2.5 w-16 rounded-md bg-white/5 shimmer-pulse" />
          </div>
        </div>
      </aside>

      {/* Main Grid Placeholder (Zero Layout Shift target) */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 lg:p-6 w-full max-w-[1600px] mx-auto pb-24 md:pb-6 flex-1">
        {/* Hero Tile Skeleton */}
        <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row justify-between gap-6 md:col-span-2 lg:col-span-3 h-64 border border-white/5">
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-5 w-24 rounded-full bg-white/5 shimmer-pulse" />
              <div className="h-8 w-60 rounded-md bg-white/5 shimmer-pulse" />
              <div className="h-4 w-80 rounded-md bg-white/5 shimmer-pulse" />
            </div>
            <div className="h-12 w-48 rounded-xl bg-white/5 shimmer-pulse" />
          </div>
          <div className="w-80 bg-white/5 border border-white/5 rounded-2xl p-5 shimmer-pulse hidden md:block" />
        </div>

        {/* Stats Tile Skeleton */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 h-64 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/5 shimmer-pulse" />
            <div className="space-y-1">
              <div className="h-3.5 w-24 rounded-md bg-white/5 shimmer-pulse" />
              <div className="h-2 w-16 rounded-md bg-white/5 shimmer-pulse" />
            </div>
          </div>
          <div className="h-20 bg-white/5 rounded-2xl shimmer-pulse" />
          <div className="h-8 bg-white/5 rounded-lg shimmer-pulse" />
        </div>

        {/* Course Card Skeletons */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between h-48 border border-white/5"
          >
            <div className="flex justify-between items-start">
              <div className="h-11 w-11 rounded-xl bg-white/5 shimmer-pulse" />
              <div className="h-4 w-16 rounded-md bg-white/5 shimmer-pulse" />
            </div>
            <div className="h-5 w-40 rounded-md bg-white/5 shimmer-pulse my-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3.5 w-16 bg-white/5 rounded-md shimmer-pulse" />
                <div className="h-3.5 w-8 bg-white/5 rounded-md shimmer-pulse" />
              </div>
              <div className="h-2 bg-white/5 rounded-full shimmer-pulse" />
            </div>
          </div>
        ))}

        {/* Activity Heatmap Skeleton */}
        <div className="glass-card rounded-3xl p-6 md:col-span-2 lg:col-span-3 border border-white/5 h-64 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white/5 shimmer-pulse" />
              <div className="space-y-1">
                <div className="h-3.5 w-32 rounded-md bg-white/5 shimmer-pulse" />
                <div className="h-2 w-48 rounded-md bg-white/5 shimmer-pulse" />
              </div>
            </div>
            <div className="h-8 w-44 bg-white/5 rounded-xl shimmer-pulse" />
          </div>
          <div className="h-20 bg-white/5 rounded-2xl shimmer-pulse my-4" />
          <div className="h-6 bg-white/5 rounded-lg shimmer-pulse" />
        </div>

        {/* Focus Timer Skeleton */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 h-64 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/5 shimmer-pulse" />
            <div className="space-y-1">
              <div className="h-3.5 w-20 rounded-md bg-white/5 shimmer-pulse" />
              <div className="h-2 w-24 rounded-md bg-white/5 shimmer-pulse" />
            </div>
          </div>
          <div className="h-16 bg-white/5 rounded-2xl shimmer-pulse" />
          <div className="h-9 bg-white/5 rounded-xl shimmer-pulse" />
        </div>
      </main>

      {/* Mobile Nav Bar Placeholder */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 rounded-2xl glass-card border border-white/10 flex items-center justify-around z-40">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center justify-center p-2">
            <div className="h-5 w-5 bg-white/5 rounded-md shimmer-pulse" />
            <div className="h-2.5 w-8 bg-white/5 rounded-md shimmer-pulse mt-1" />
          </div>
        ))}
      </nav>
    </div>
  );
}
