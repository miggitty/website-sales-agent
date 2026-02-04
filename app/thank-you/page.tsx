"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Rocket, ArrowRight, Zap, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LAUNCH_DATE_STRING } from "@/lib/config";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen text-slate-200 selection:bg-cyan-500/30 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <motion.div
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.2, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, -100, 0],
            y: [0, 100, 50, 0],
            scale: [1, 1.1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-tl from-cyan-600/30 via-blue-600/20 to-transparent blur-[120px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl w-full"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-[3rem] blur-2xl opacity-20" />

            <div className="relative glass-card-premium rounded-3xl p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

              {/* Success Icon - Smaller */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>

              {/* Main Headline - Smaller */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-semibold text-white mb-4"
              >
                You're On the List!
              </motion.h2>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-8"
              >
                <CountdownTimer variant="full" showLabel={true} />
              </motion.div>

              {/* Body Copy - Smaller */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 mb-8"
              >
                <p className="text-base text-slate-400">
                  We launch on <span className="text-white font-medium">{LAUNCH_DATE_STRING}</span>. You'll get an email the moment doors open.
                </p>

                <p className="text-sm text-slate-500">
                  But there are only <span className="text-slate-300 font-medium">10 spots at $500</span>. And a lot of people are signing up.
                </p>
              </motion.div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10" />

              {/* Skip the Line Section - BIGGER & More Prominent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-8"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
                  <div className="relative space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                      Want to skip to the front of the line?
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
                      Only <span className="text-cyan-400 font-bold">10 people</span> get access at the founding price of <span className="text-cyan-400 font-bold">$500</span>.
                    </p>

                    <p className="text-lg text-slate-300 max-w-xl mx-auto">
                      After that, it's <span className="text-white font-semibold">$1,000</span>. Pay a <span className="text-white font-semibold">$50 deposit now</span> to lock in your spot—you'll only pay <span className="text-white font-semibold">$450</span> at launch.
                    </p>
                  </div>
                </div>

                {/* Skip Line CTA - Larger */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <a
                    href="https://buy.stripe.com/7sY28s1yJ8iiaEg5AFg360B"
                    className="group px-12 py-6 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white text-2xl font-bold shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-105 transition-all inline-flex items-center gap-4"
                  >
                    <span>Pay $50 to Lock In $500</span>
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

                <p className="text-sm text-slate-500 max-w-lg mx-auto">
                  Not ready to commit? No problem. Just watch your inbox. But if you're serious about getting in at the founding price, this guarantees your spot.
                </p>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="text-lg font-bold text-white">{LAUNCH_DATE_STRING}</div>
                  <div className="text-xs text-slate-400">Launch Date</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">10 spots</div>
                  <div className="text-xs text-slate-400">At $500</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">$1,000</div>
                  <div className="text-xs text-slate-400">After Launch</div>
                </div>
              </motion.div>

              {/* Floating decorations */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-10 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"
              />
            </div>
          </div>

          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
