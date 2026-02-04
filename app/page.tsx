"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Globe,
  Zap,
  TrendingUp,
  Layout,
  Users,
  Lock,
  X,
  ChevronDown,
  Check,
  MessageSquare,
  Mail,
  Headphones,
  Video,
  FileText,
  DollarSign,
  Target,
  Sparkles,
  Clock,
  AlertCircle,
  Play,
  Star,
  Rocket,
  Shield,
  BarChart3,
  Bot,
  MousePointerClick
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from "framer-motion";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LAUNCH_DATE_STRING } from "@/lib/config";

// --- Animated Background Components ---

function GradientMeshBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Animated gradient orbs */}
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
      <motion.div
        animate={{
          x: [0, 70, -30, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-emerald-600/20 via-teal-600/10 to-transparent blur-[100px]"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-50" />
    </div>
  );
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on the client side to avoid hydration mismatch
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// --- Animated Counter Component ---

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

// --- Country Code Data ---

const COUNTRIES = [
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸", placeholder: "(555) 123-4567", pattern: "^[\\d\\s\\-\\(\\)]{10,14}$" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺", placeholder: "412 345 678", pattern: "^[\\d\\s]{9,12}$" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦", placeholder: "(555) 123-4567", pattern: "^[\\d\\s\\-\\(\\)]{10,14}$" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧", placeholder: "7911 123456", pattern: "^[\\d\\s]{10,12}$" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿", placeholder: "21 123 4567", pattern: "^[\\d\\s]{8,11}$" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "AE", name: "UAE", dial: "+971", flag: "🇦🇪" },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
];

// --- Waitlist Modal Component ---

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (phone: string, country: typeof COUNTRIES[0]) => {
    if (!phone) return true;
    if (!country.pattern) return true;
    const regex = new RegExp(country.pattern);
    return regex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(formData.phone, selectedCountry)) {
      setPhoneError(`Please enter a valid ${selectedCountry.name} phone number`);
      return;
    }

    setIsSubmitting(true);
    setError("");
    setPhoneError("");

    try {
      const fullPhone = formData.phone ? `${selectedCountry.dial} ${formData.phone}` : "";
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, phone: fullPhone }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      // Navigate to thank you page on success
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-30" />
              <div className="relative glass-card-premium rounded-2xl p-8 bg-slate-900">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Enter your details to join the waitlist
                  </h2>
                  <p className="text-slate-400">
                    First 10 spots at $500. Launch {LAUNCH_DATE_STRING}.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectedCountry.code}
                        onChange={(e) => {
                          const country = COUNTRIES.find(c => c.code === e.target.value);
                          if (country) {
                            setSelectedCountry(country);
                            setPhoneError("");
                          }
                        }}
                        className="w-28 px-2 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
                      >
                        {COUNTRIES.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          handleChange(e);
                          setPhoneError("");
                        }}
                        required
                        className={`flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          phoneError ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20"
                        }`}
                        placeholder={selectedCountry.placeholder || "123 456 7890"}
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-2 text-red-400 text-sm">{phoneError}</p>
                    )}
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-lg shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? "Joining..." : "Join the Waitlist"}</span>
                    {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                  No obligation to buy. Be first in line when doors open.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- Magnetic Button Component ---

function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}

// --- Reveal Animation Wrapper ---

function RevealOnScroll({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Staggered Children Animation ---

function StaggeredReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as const
    }
  }
};

// --- Inline CTA Component ---

function InlineCTA({ variant = "default", onOpenModal }: { variant?: "default" | "compact" | "emphasized"; onOpenModal: () => void }) {
  if (variant === "compact") {
    return (
      <RevealOnScroll className="mt-12 text-center">
        <MagneticButton onClick={onOpenModal} className="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-lg shadow-2xl shadow-indigo-500/25 cursor-pointer inline-flex items-center gap-3">
          <span>Join the Waitlist</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </MagneticButton>
        <p className="mt-4 text-sm text-slate-500">Only 10 spots at $500 launch price</p>
      </RevealOnScroll>
    );
  }

  if (variant === "emphasized") {
    return (
      <RevealOnScroll className="mt-16">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-20" />
          <div className="relative glass-card-premium rounded-2xl p-8 text-center">
            <p className="text-lg text-slate-300 mb-4">Ready to transform your web design business?</p>
            <MagneticButton onClick={onOpenModal} className="group px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-lg shadow-2xl shadow-indigo-500/25 cursor-pointer inline-flex items-center gap-3">
              <span>Join the Waitlist Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                $500 one-time
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                10 spots only
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {LAUNCH_DATE_STRING}
              </span>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
      <MagneticButton onClick={onOpenModal} className="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-lg shadow-2xl shadow-indigo-500/25 cursor-pointer flex items-center gap-3">
        <span>Join the Waitlist</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </MagneticButton>
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Lock className="w-4 h-4" />
        <span>Only 10 spots at launch price</span>
      </div>
    </RevealOnScroll>
  );
}

// --- Premium Glass Card ---

function PremiumCard({ children, className = "", hover = true, glow = false }: { children: React.ReactNode; className?: string; hover?: boolean; glow?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative group ${className}`}
    >
      {glow && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
      )}
      <div className="relative glass-card-premium rounded-2xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

// --- Navbar ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl ${
        scrolled
          ? "py-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          className="text-xl font-bold tracking-tighter text-white flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          The Website<span className="text-indigo-400">Client</span>
          <span className="text-cyan-400">Machine</span>
        </motion.div>

        {/* Countdown Timer - Center */}
        <div className="hidden lg:flex items-center">
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20">
            <CountdownTimer variant="header" />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">FAQ</a>
          <MagneticButton className="px-5 py-2 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white cursor-pointer">
            Login
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
}

// --- Hero Section ---

function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ y: y1 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                For Web Designers Tired of Struggling to Find Clients
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.05]"
            >
              Your #1 Problem Isn't Building Websites.{" "}
              <span className="relative">
                <span className="text-gradient">It's Finding People to Pay You.</span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <motion.path
                    d="M2 10 Q150 0 298 10"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="50%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed"
            >
              This system finds local businesses without websites, auto-builds a demo site for each one, and hands you the leads ready to close.
              <span className="block mt-4 text-white font-semibold text-2xl">
                Bank <span className="text-gradient">$200k+</span> in year one.
              </span>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <MagneticButton onClick={onOpenModal} className="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-lg shadow-2xl shadow-indigo-500/25 cursor-pointer flex items-center gap-3">
                <span>Join the Waitlist</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-slate-950 flex items-center justify-center text-xs font-bold text-white">
                      {i}
                    </div>
                  ))}
                </div>
                <span>Only <span className="text-white font-semibold">10 spots</span> at launch price</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
            style={{ perspective: "1000px" }}
          >
            <PremiumCard glow className="p-1">
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-xl p-6">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-slate-800/50 rounded-lg px-4 py-1.5 text-xs text-slate-500 font-mono">
                      thewebsiteclientmachine.com/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Revenue", value: "$12,450", change: "+15%", color: "emerald" },
                    { label: "Clients", value: "42", change: "+3 today", color: "indigo" },
                    { label: "Close Rate", value: "3.2%", change: "+0.5%", color: "cyan" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="bg-slate-800/50 rounded-xl p-4"
                    >
                      <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className={`text-xs text-${stat.color}-400 flex items-center gap-1 mt-1`}>
                        <TrendingUp className="w-3 h-3" /> {stat.change}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Live Feed */}
                <div className="bg-slate-800/30 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium text-white">Recent Leads</div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Plumber Pro NYC", status: "Demo Sent", time: "2m ago" },
                      { name: "Dentist LA", status: "Site Generated", time: "5m ago" },
                      { name: "Landscape Co", status: "Call Scheduled", time: "12m ago" },
                    ].map((lead, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.15 }}
                        className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                          {lead.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-white font-medium">{lead.name}</div>
                          <div className="text-xs text-slate-400">{lead.status}</div>
                        </div>
                        <div className="text-xs text-slate-500">{lead.time}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </PremiumCard>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-emerald-500/25"
            >
              +$7,500/mo
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-6 bg-gradient-to-br from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-indigo-500/25"
            >
              15 clients/mo
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// --- Problem Section ---

function ProblemSection({ onOpenModal }: { onOpenModal: () => void }) {
  const problems = [
    "Cold emailing businesses and getting ignored",
    "Posting on social media hoping someone notices",
    "Asking for referrals that never come",
    "Competing on Upwork against $50 designers",
    "Running ads that burn cash faster than they bring leads"
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-red-400 font-semibold tracking-wider text-sm uppercase">The Problem</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Let's Be Honest About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Your Biggest Challenge
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              You know how to build websites. That's not the issue. The issue is finding people who'll actually pay you.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8">
          <RevealOnScroll delay={0.2}>
            <PremiumCard className="h-full">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">You've Tried It All</h3>
                </div>
                <ul className="space-y-4">
                  {problems.map((problem, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-slate-400"
                    >
                      <div className="w-2 h-2 rounded-full bg-red-500/50 mt-2 shrink-0" />
                      {problem}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </PremiumCard>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <PremiumCard glow className="h-full">
              <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">The Secret They Know</h3>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Meanwhile, you watch other designers landing client after client and wonder what they know that you don't.
                </p>
                <div className="p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <p className="text-lg text-indigo-300 font-medium italic">
                    "The best clients don't come from waiting. They come from making offers so good, people feel stupid saying no."
                  </p>
                </div>
                <p className="mt-6 text-white font-semibold text-lg">
                  You're about to become the person who shows them.
                </p>
              </div>
            </PremiumCard>
          </RevealOnScroll>
        </div>

        <InlineCTA variant="compact" onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}

// --- Solution Section ---

function SolutionSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-32 relative z-10">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">The Solution</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              What If You Could Call a Business Owner{" "}
              <span className="text-gradient">With Their Website Already Built?</span>
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <PremiumCard glow className="max-w-3xl mx-auto">
            <div className="p-10 md:p-14">
              <p className="text-lg text-slate-300 mb-8">Imagine this scenario:</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-slate-400">
                    You pick up the phone. Call a local plumber. And say:
                  </p>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 p-6 rounded-xl border-l-4 border-cyan-500">
                  <p className="text-white italic text-xl">
                    "Hi, I noticed you don't have a website. So I built you one. It's already live. Want me to send you the link?"
                  </p>
                </div>

                <p className="text-slate-400 text-lg">
                  No pitch. No convincing. Just a website with their business name, phone number, services—<span className="text-white font-semibold">already done.</span>
                </p>

                <div className="bg-indigo-500/10 p-6 rounded-xl border border-indigo-500/20">
                  <p className="text-indigo-300 text-lg">
                    "Want to keep it? It's <span className="text-white font-bold">$500</span> to set up and <span className="text-white font-bold">$99/month</span>."
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-3xl font-bold text-gradient mb-8">
                  This is The Website Client Machine.
                </p>
                <MagneticButton onClick={onOpenModal} className="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-lg shadow-2xl shadow-indigo-500/25 cursor-pointer inline-flex items-center gap-3">
                  <span>I Want This System</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </div>
            </div>
          </PremiumCard>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// --- How It Works (Bento Grid) ---

function HowItWorks({ onOpenModal }: { onOpenModal: () => void }) {
  const steps = [
    {
      icon: Globe,
      step: "01",
      title: "Import Your Leads",
      desc: "Scrape Google Maps for any industry in any location. Plumbers in London. Dentists in New York. Get 1,000 businesses without websites in minutes.",
      highlight: "Cost: $3",
      span: "md:col-span-2"
    },
    {
      icon: Bot,
      step: "02",
      title: "AI Auto-Generates Demo Sites",
      desc: "Our AI builds a demo website for every single lead—automatically. Their business name, contact info, professional template. Zero manual work.",
      span: "md:col-span-1"
    },
    {
      icon: Phone,
      step: "03",
      title: "Call, Send, Close",
      desc: "Open the built-in CRM. Call each lead. Send them their demo site via SMS or email. When they see their business looking that good online, closing becomes easy.",
      span: "md:col-span-1"
    },
    {
      icon: Rocket,
      step: "Result",
      title: "Scale Your Business",
      desc: "No hunting for leads. No building sites on spec. No wasted hours on prospects who ghost you. Just qualified leads with done-for-you demos, ready to close.",
      span: "md:col-span-2",
      featured: true
    },
  ];

  return (
    <section id="how-it-works" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase">How It Works</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
              3 Simple Steps to{" "}
              <span className="text-gradient">$200k+ Revenue</span>
            </h2>
          </div>
        </RevealOnScroll>

        <StaggeredReveal className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className={step.span}
            >
              <PremiumCard
                glow={step.featured}
                className="h-full"
              >
                <div className={`p-8 h-full ${step.featured ? 'bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10' : ''}`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      step.featured
                        ? 'bg-gradient-to-br from-indigo-500 to-cyan-500'
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <step.icon className={`w-7 h-7 ${step.featured ? 'text-white' : 'text-indigo-400'}`} />
                    </div>
                    <span className={`text-sm font-mono ${step.featured ? 'text-cyan-400' : 'text-slate-600'}`}>
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  {step.highlight && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                      <DollarSign className="w-4 h-4" />
                      {step.highlight}
                    </div>
                  )}
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </StaggeredReveal>

        <InlineCTA onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}

// --- The Math Section ---

function TheMathSection({ onOpenModal }: { onOpenModal: () => void }) {
  const stats = [
    { value: 25, label: "Calls/Day", suffix: "", prefix: "" },
    { value: 125, label: "Calls/Week", suffix: "", prefix: "" },
    { value: 15, label: "New Clients/Month", suffix: "", prefix: "" },
    { value: 7500, label: "Setup Fees/Month", suffix: "", prefix: "$" },
  ];

  const projections = [
    { month: "Month 1", recurring: 1485, fill: "8%" },
    { month: "Month 3", recurring: 4455, fill: "25%" },
    { month: "Month 6", recurring: 8910, fill: "50%" },
    { month: "Month 12", recurring: 17820, fill: "100%" },
  ];

  return (
    <section className="py-32 relative z-10 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold tracking-wider text-sm uppercase">The Math</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
              Let's Talk Numbers
            </h2>
            <p className="text-xl text-gradient font-semibold">(This Is Where It Gets Exciting)</p>
          </div>
        </RevealOnScroll>

        {/* Stats Grid */}
        <StaggeredReveal className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={staggerChild}>
              <PremiumCard className="text-center">
                <div className="p-6">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </StaggeredReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <RevealOnScroll delay={0.2}>
            <PremiumCard>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Recurring Revenue Growth</h3>
                <div className="space-y-6">
                  {projections.map((proj, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="text-slate-400">{proj.month}</span>
                        <span className="text-white font-bold">
                          $<AnimatedCounter value={proj.recurring} />/mo
                        </span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: proj.fill }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PremiumCard>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <PremiumCard glow>
              <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5">
                <h3 className="text-2xl font-bold text-white mb-6">Year One Total</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
                    <span className="text-slate-400">Setup Fees</span>
                    <span className="text-2xl font-bold text-cyan-400">
                      $<AnimatedCounter value={90000} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
                    <span className="text-slate-400">Recurring Collected</span>
                    <span className="text-2xl font-bold text-indigo-400">
                      $<AnimatedCounter value={116000} />
                    </span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-white/10 text-center">
                  <div className="text-sm text-slate-400 mb-2">Total Year One Revenue</div>
                  <div className="text-5xl font-bold text-gradient">
                    $<AnimatedCounter value={206000} duration={3} />
                  </div>
                </div>
                <p className="mt-6 text-slate-400 text-sm text-center">
                  By month 12: <span className="text-white font-semibold">180 clients × $99/mo = $17,820/mo recurring</span>
                </p>
              </div>
            </PremiumCard>
          </RevealOnScroll>
        </div>

        {/* Pricing Tiers */}
        <RevealOnScroll delay={0.3} className="mt-12">
          <PremiumCard>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Multiple Revenue Streams</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { tier: "Entry", price: "$99/mo", desc: "Basic site (foot in the door)", color: "indigo" },
                  { tier: "Custom", price: "$1,000-$3,000", desc: "One-time custom builds", color: "cyan" },
                  { tier: "Premium", price: "$200-$500/mo", desc: "SEO, maintenance, premium services", color: "purple" },
                ].map((tier, i) => (
                  <div key={i} className={`p-6 rounded-xl bg-${tier.color}-500/10 border border-${tier.color}-500/20 text-center`}>
                    <div className={`text-${tier.color}-400 font-semibold mb-2`}>{tier.tier}</div>
                    <div className="text-2xl font-bold text-white mb-2">{tier.price}</div>
                    <p className="text-slate-400 text-sm">{tier.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </PremiumCard>
        </RevealOnScroll>

        <InlineCTA variant="emphasized" onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}

// --- Why This Works ---

function WhyThisWorks({ onOpenModal }: { onOpenModal: () => void }) {
  const benefits = [
    { icon: Check, text: "No imagination required—they can SEE it" },
    { icon: Shield, text: "No risk—it already exists" },
    { icon: MousePointerClick, text: "No commitment—just \"want to keep it?\"" },
    { icon: Star, text: "No competition—you're the only one who did this" },
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold tracking-wider text-sm uppercase">The Edge</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
              Why This Offer Is{" "}
              <span className="text-gradient">Almost Unfair</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8">
          <RevealOnScroll delay={0.2}>
            <PremiumCard className="h-full">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-6">Traditional Approach</h3>
                <div className="space-y-4 text-slate-400">
                  <p>"Do you need a website? I can build you one."</p>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-300 italic text-sm">
                      Business owner thinks: How much? How long? Can I trust them? I'm busy. I'll think about it.
                    </p>
                  </div>
                  <p className="text-red-400">And they never call back.</p>
                </div>
              </div>
            </PremiumCard>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <PremiumCard glow className="h-full">
              <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-transparent">
                <h3 className="text-xl font-bold text-white mb-6">With Demo Site Already Built</h3>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <benefit.icon className="w-5 h-5 text-emerald-400 mb-2" />
                      <span className="text-sm text-slate-300">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-6 text-white font-semibold">
                  The demo site IS the offer. It makes you <span className="text-gradient">uncloseable competition</span>.
                </p>
              </div>
            </PremiumCard>
          </RevealOnScroll>
        </div>

        <InlineCTA variant="compact" onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}

// --- What's Included ---

function WhatsIncluded({ onOpenModal }: { onOpenModal: () => void }) {
  const features = [
    {
      icon: Layout,
      title: "Complete Lead Gen System",
      items: ["Google Maps scraper", "AI demo site generator", "Built-in CRM", "SMS & email sending"]
    },
    {
      icon: Sparkles,
      title: "10 Premium Templates",
      items: ["Marketing-optimized", "10+ years refined", "Industry-specific", "Conversion-focused"]
    },
    {
      icon: Bot,
      title: "AI Deployment System",
      items: ["Build sites in 10 mins", "No coding required", "One-click launch", "Instant customization"]
    },
    {
      icon: Users,
      title: "Client Onboarding",
      items: ["Done-for-you process", "Welcome templates", "Setup guides", "Check-in scripts"]
    },
    {
      icon: Video,
      title: "Training & Support",
      items: ["1-hour onboarding call", "Video library", "Cold call scripts", "Sales training"]
    },
    {
      icon: BarChart3,
      title: "Growth Resources",
      items: ["Pricing guidance", "Upsell strategies", "Private Q&A group", "Regular updates"]
    },
  ];

  return (
    <section id="pricing" className="py-32 relative z-10 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase">What's Included</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
              Everything You Get for{" "}
              <span className="text-gradient">$500</span>
            </h2>
          </div>
        </RevealOnScroll>

        <StaggeredReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <motion.div key={i} variants={staggerChild}>
              <PremiumCard hover className="h-full">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">{feature.title}</h3>
                  <ul className="space-y-2">
                    {feature.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-400 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </StaggeredReveal>

        <RevealOnScroll delay={0.3}>
          <PremiumCard glow className="max-w-2xl mx-auto">
            <div className="p-8 text-center bg-gradient-to-br from-indigo-500/10 to-cyan-500/10">
              <div className="text-6xl font-bold text-gradient mb-4">$500</div>
              <p className="text-xl text-slate-300 mb-2">One-time payment. You own the system.</p>
              <p className="text-slate-400">Only API cost: ~$3 per 1,000 leads</p>
              <MagneticButton onClick={onOpenModal} className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-lg cursor-pointer inline-flex items-center gap-3">
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </div>
          </PremiumCard>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// --- Who This Is For ---

function WhoThisIsFor({ onOpenModal }: { onOpenModal: () => void }) {
  const perfectFor = [
    "Freelance web designers struggling for consistent clients",
    "Small agencies wanting predictable lead sources",
    "New designers who don't know how to get first clients",
    "Designers tired of competing on price",
    "Anyone wanting recurring revenue vs one-off projects",
    "People willing to pick up the phone and make calls"
  ];

  const notFor = [
    "Not willing to do cold outreach",
    "Want completely passive, done-for-you business",
    "Looking for get-rich-quick scheme"
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              This Is For You If...
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8">
          <RevealOnScroll delay={0.2}>
            <PremiumCard className="h-full border-l-4 border-emerald-500/50">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Perfect For</h3>
                </div>
                <ul className="space-y-4">
                  {perfectFor.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </PremiumCard>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <PremiumCard className="h-full border-l-4 border-red-500/50">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">NOT For You If</h3>
                </div>
                <ul className="space-y-4">
                  {notFor.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-slate-400"
                    >
                      <X className="w-5 h-5 text-red-500/70 shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </PremiumCard>
          </RevealOnScroll>
        </div>

        <InlineCTA onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}

// --- Urgency Section ---

function UrgencySection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-32 relative z-10 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <RevealOnScroll>
          <PremiumCard glow>
            <div className="p-10 md:p-14 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8">
                <AlertCircle className="w-4 h-4" />
                Limited Launch Offer
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Why Only 10 Spots{" "}
                <span className="text-gradient">(And Why the Price Doubles)</span>
              </h2>

              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Every new user gets the system personally installed. We configure it for your market.
                We walk you through everything on a 1-hour call. That takes time—and we'd rather have
                10 designers crushing it than 100 confused and failing.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10 max-w-lg mx-auto">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
                  <div className="text-sm text-indigo-300 mb-2">Launch Price</div>
                  <div className="text-5xl font-bold text-white">$500</div>
                  <div className="text-slate-400 text-sm mt-2">First 10 spots only</div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/10">
                  <div className="text-sm text-slate-500 mb-2">After Launch</div>
                  <div className="text-5xl font-bold text-slate-600">$1,000</div>
                  <div className="text-slate-500 text-sm mt-2">Everyone else</div>
                </div>
              </div>

              <MagneticButton onClick={onOpenModal} className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-lg cursor-pointer inline-flex items-center gap-3">
                Secure Your Spot Now
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </div>
          </PremiumCard>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// --- FAQ Section ---

function FAQSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How is this different from GoHighLevel or other tools?",
      a: "Most tools require you to manually build each demo site—15 to 30 minutes per lead. Our system auto-generates demo sites for every lead the moment you import them. You do zero site building. Just import, call, close."
    },
    {
      q: "Do I need technical skills to use this?",
      a: "If you can follow video instructions and make phone calls, you can use this. We install everything for you and walk you through it step by step."
    },
    {
      q: "What if I've never done cold calling before?",
      a: "We include scripts and training on exactly what to say. Plus, you're not cold calling with a pitch—you're calling with a finished website. That makes the conversation 10x easier."
    },
    {
      q: "Is this a monthly subscription?",
      a: "No. You pay $500 once and own the system. The only ongoing cost is the API for leads—about $3 per 1,000 businesses."
    },
    {
      q: "What countries does this work in?",
      a: "This system works worldwide. You can find leads and build sites for businesses in any country."
    },
    {
      q: "Is a 3% close rate realistic?",
      a: "3% is actually conservative when you're calling with a done-for-you demo site. You're not pitching—you're showing them something that already exists with their name on it. Many users close higher than 3%."
    },
    {
      q: "How long does it take to deploy a real website?",
      a: "About 10 minutes. We give you AI website templates that let you build and deploy a production-ready site fast. No coding required."
    },
  ];

  return (
    <section id="faq" className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">FAQ</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
              Frequently Asked Questions
            </h2>
          </div>
        </RevealOnScroll>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <PremiumCard hover={false}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-400">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </PremiumCard>
            </RevealOnScroll>
          ))}
        </div>

        <InlineCTA variant="compact" onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}

// --- Final CTA ---

function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-32 relative z-10 px-6">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto relative">
          {/* Glow effects */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-[3rem] blur-2xl opacity-20" />

          <PremiumCard className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            <div className="relative p-12 lg:p-20 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                viewport={{ once: true }}
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Stop Hunting for Clients?
              </h2>

              <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
                Join the waitlist now. We launch {LAUNCH_DATE_STRING}.
              </p>
              <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
                First 10 people get access at $500. Everyone else pays $1,000—or waits for the next round.
              </p>

              <MagneticButton onClick={onOpenModal} className="px-12 py-5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white text-xl font-bold shadow-2xl shadow-indigo-500/30 cursor-pointer inline-flex items-center gap-3 group">
                Join the Waitlist
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <p className="mt-8 text-sm text-slate-500">
                No obligation to buy. Be first in line when doors open.
              </p>

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
          </PremiumCard>
        </div>
      </RevealOnScroll>
    </section>
  );
}

// --- Footer ---

function Footer() {
  return (
    <footer className="py-12 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">The Website Client Machine</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} The Website Client Machine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page ---

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="relative min-h-screen text-slate-200 selection:bg-cyan-500/30 overflow-x-hidden">
      <GradientMeshBackground />
      <FloatingParticles />
      <Navbar />
      <Hero onOpenModal={openModal} />
      <ProblemSection onOpenModal={openModal} />
      <SolutionSection onOpenModal={openModal} />
      <HowItWorks onOpenModal={openModal} />
      <TheMathSection onOpenModal={openModal} />
      <WhyThisWorks onOpenModal={openModal} />
      <WhatsIncluded onOpenModal={openModal} />
      <WhoThisIsFor onOpenModal={openModal} />
      <UrgencySection onOpenModal={openModal} />
      <FAQSection onOpenModal={openModal} />
      <FinalCTA onOpenModal={openModal} />
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
