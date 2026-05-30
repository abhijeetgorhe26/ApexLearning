"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw, HelpCircle, ArrowLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error details internally for site inspection
    console.error("Dashboard caught error boundary trigger:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative z-10">
      <div className="max-w-md w-full glass-card rounded-3xl p-6 lg:p-8 border border-red-500/20 shadow-2xl shadow-red-500/5 text-center relative overflow-hidden">
        {/* Background visual red blur */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Warning Icon */}
        <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>

        <h2 className="text-2xl font-black text-slate-100 tracking-tight mb-2">
          Dashboard Interrupted
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans">
          The application encountered a runtime obstacle while assembling live course components. Let's attempt a quick system refresh.
        </p>

        {/* Diagnostic console panel */}
        <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4 mb-6 text-left font-mono text-[10px] text-slate-400 max-h-36 overflow-y-auto">
          <p className="text-red-400 font-bold mb-1">SYSTEM_DIAGNOSTICS_LOG:</p>
          <p className="text-slate-300 font-semibold break-all">{error.message || "Unknown Application Fault"}</p>
          {error.digest && <p className="text-slate-500 mt-1">Digest: {error.digest}</p>}
          <p className="text-slate-600 mt-2">// Stack reference: client-rsc-boundary-failed</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors select-none cursor-pointer"
          >
            Full Reload
          </button>
          
          <button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border border-red-400/20 text-white shadow-lg shadow-red-500/10 transition-all select-none cursor-pointer"
          >
            <RefreshCw size={14} className="animate-spin-slow" /> Hot Reset
          </button>
        </div>
      </div>
    </main>
  );
}
