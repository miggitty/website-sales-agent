"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { LAUNCH_DATE } from "@/lib/config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = LAUNCH_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

interface CountdownTimerProps {
  variant?: "compact" | "full" | "header";
  showLabel?: boolean;
  className?: string;
}

export function CountdownTimer({
  variant = "full",
  showLabel = true,
  className = ""
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const isLaunched = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isLaunched) {
    return (
      <div className={`flex items-center gap-2 text-emerald-400 font-semibold ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        We're Live!
      </div>
    );
  }

  if (variant === "header") {
    return (
      <div className={`flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-cyan-500/30 ${className}`}>
        <Clock className="w-5 h-5 text-cyan-400" />
        <span className="text-slate-300 font-medium">Launch in</span>
        <div className="flex items-center gap-1.5">
          <HeaderTimeUnit value={timeLeft.days} label="d" />
          <span className="text-cyan-400 font-bold">:</span>
          <HeaderTimeUnit value={timeLeft.hours} label="h" />
          <span className="text-cyan-400 font-bold">:</span>
          <HeaderTimeUnit value={timeLeft.minutes} label="m" />
          <span className="text-cyan-400 font-bold">:</span>
          <HeaderTimeUnit value={timeLeft.seconds} label="s" />
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showLabel && (
          <span className="text-slate-400 text-sm">Launches in:</span>
        )}
        <div className="flex items-center gap-1 font-mono text-sm">
          <TimeUnit value={timeLeft.days} label="d" />
          <span className="text-slate-600">:</span>
          <TimeUnit value={timeLeft.hours} label="h" />
          <span className="text-slate-600">:</span>
          <TimeUnit value={timeLeft.minutes} label="m" />
          <span className="text-slate-600">:</span>
          <TimeUnit value={timeLeft.seconds} label="s" />
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`${className}`}>
      {showLabel && (
        <div className="text-center mb-4">
          <span className="text-sm text-slate-400 uppercase tracking-wider">Launching in</span>
        </div>
      )}
      <div className="flex items-center justify-center gap-3 md:gap-4">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeSeparator />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeSeparator />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeSeparator />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <span className="text-white font-bold tabular-nums">
      {value.toString().padStart(2, "0")}{label}
    </span>
  );
}

function HeaderTimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <span className="text-lg font-bold text-white tabular-nums">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-xs font-medium text-cyan-400 uppercase">
        {label}
      </span>
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center"
      >
        <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-xs text-slate-400 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function TimeSeparator() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 pb-6">
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
    </div>
  );
}
