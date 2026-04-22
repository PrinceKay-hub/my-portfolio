"use client";

import { useState, useEffect, useRef } from "react";
import {  motion, useInView, AnimatePresence, Variants } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { name: "HTML/CSS",     level: 91, color: "#68A063" },
  { name: "Flutter",      level: 90, color: "#00D4FF" },
  { name: "React Native", level: 88, color: "#61DAFB" },
  { name: "Next.js",      level: 92, color: "#A78BFA" },
  { name: "Tailwind CSS", level: 95, color: "#38BDF8" },
  { name: "JavaScript",   level: 93, color: "#F7DF1E" },
  { name: "TypeScript",   level: 85, color: "#818CF8" },
  { name: "Java",         level: 78, color: "#F89820" },
  { name: "Dart",         level: 89, color: "#A78BFA" },
  { name: "Node.js",      level: 82, color: "#68A063" },
];

const PROJECTS = [
  {
    title: "Bisame",
    tech: ["Flutter", "MongoDB", "Dart"],
    desc: "Multi-vendor e-commerce platform with complex features for artisans or service providers.",
    accent: "#00D4FF",
    icon: "◈",
  },
  {
    title: "Timely",
    tech: ["React Native","Next.js" ,"Flutter", "Firebase","Dart", "TypeScript"],
    desc: "Full featured booking application with real-time availability and with AI-powered recommendations.",
    accent: "#A78BFA",
    icon: "⬡",
  },
  {
    title: "PC-Zone",
    tech: ["Flutter", "Firebase", "Dart"],
    desc: "Multi-vendor e-commerce platform with complex features for computer and electronics sellers.",
    accent: "#34D399",
    icon: "◎",
  },
];

const EXPERIENCE = [
  {
    role: "Senior Frontend Engineer",
    company: "Bisame Digital Ltd",
    period: "2022 — 2025",
    desc: "Single-handedly developed and maintained the frontend for a multi-vendor e-commerce platform, ensuring a seamless user experience across all devices.",
    color: "#34D399",
  },
  {
    role: "Full Stack Developer",
    company: "Enorince Technologies",
    period: "2021 — present",
    desc: "Developed 10+ Android and iOS apps using Flutter and React Native for startups across Ghana.",
    color: "#00D4FF",
  },
];

// ─── Variants ────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Small helpers ────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="font-mono text-[9px] tracking-[0.35em] text-gray-500 dark:text-gray-600 uppercase mb-3">
      {label}
    </p>
  );
}

function FadeSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <motion.button onClick={toggle} whileTap={{ scale: 0.85 }}
      className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300"
      style={{
        background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
        borderColor: dark ? "rgba(0,212,255,0.2)" : "rgba(0,0,0,0.1)",
      }}
      aria-label="Toggle theme">
      <AnimatePresence mode="wait">
        <motion.span key={dark ? "d" : "l"}
          initial={{ opacity: 0, rotate: -60, scale: 0.4 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.4 }}
          transition={{ duration: 0.22 }}
          className="text-sm leading-none select-none">
          {dark ? "🌙" : "☀️"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Skill Card ───────────────────────────────────────────────────────────────

function SkillCard({ sk, i }: { sk: typeof SKILLS[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} custom={i} initial="hidden"
      animate={inView ? "visible" : "hidden"} variants={fadeUp}
      whileHover={{ scale: 1.03 }}
      className="p-5 rounded-2xl border"
      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono font-bold text-xs tracking-wider">{sk.name}</span>
        <span className="font-mono text-[11px]" style={{ color: sk.color }}>{sk.level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${sk.level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: `linear-gradient(90deg,${sk.color}88,${sk.color})`, boxShadow: `0 0 12px ${sk.color}44` }} />
      </div>
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} custom={i} initial="hidden"
      animate={inView ? "visible" : "hidden"} variants={fadeUp}
      whileHover={{ scale: 1.025 }}
      className="relative p-7 rounded-2xl border overflow-hidden cursor-pointer"
      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
      <motion.div className="absolute top-0 right-0 w-28 h-28 rounded-bl-full"
        style={{ background: p.accent }}
        initial={{ opacity: 0.08 }} whileHover={{ opacity: 0.2 }} transition={{ duration: 0.3 }} />
      <div className="text-3xl mb-4" style={{ color: p.accent }}>{p.icon}</div>
      <h3 className="text-lg font-black mb-2">{p.title}</h3>
      <p className="text-sm leading-relaxed mb-5 text-gray-400">{p.desc}</p>
      <div className="flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span key={t} className="font-mono text-[10px] px-3 py-1 rounded-full"
            style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}30`, color: p.accent }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Experience Item ──────────────────────────────────────────────────────────

function ExpItem({ exp, i }: { exp: typeof EXPERIENCE[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} custom={i} initial="hidden"
      animate={inView ? "visible" : "hidden"} variants={slideLeft}
      className="relative pl-10 mb-10">
      <motion.div className="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: exp.color, background: "var(--bg-base, #050510)", boxShadow: `0 0 14px ${exp.color}55` }}
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}>
        <div className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
      </motion.div>
      <div className="p-6 rounded-2xl border"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
          <h3 className="font-black text-base">{exp.role}</h3>
          <span className="font-mono text-[10px] tracking-wider" style={{ color: exp.color }}>{exp.period}</span>
        </div>
        <p className="font-mono text-[11px] mb-3" style={{ color: "#00D4FF" }}>{exp.company}</p>
        <p className="text-sm leading-relaxed text-gray-400">{exp.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [active, setActive] = useState("About");
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");

  const words = ["Full Stack Developer", "Flutter Engineer", "React Native Dev", "Next.js Specialist"];
  const wordRef = useRef(0);
  const charRef = useRef(0);
  const delRef = useRef(false);

  // Typewriter
  useEffect(() => {
    const tick = () => {
      const w = words[wordRef.current];
      if (!delRef.current) {
        charRef.current++;
        setTypedText(w.slice(0, charRef.current));
        if (charRef.current >= w.length) { delRef.current = true; setTimeout(tick, 1600); return; }
      } else {
        charRef.current--;
        setTypedText(w.slice(0, charRef.current));
        if (charRef.current <= 0) { delRef.current = false; wordRef.current = (wordRef.current + 1) % words.length; }
      }
      setTimeout(tick, delRef.current ? 45 : 90);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Scroll listener
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active section tracking
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    NAV_LINKS.forEach((n) => { const el = document.getElementById(n); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv/developer_cv.pdf";
    link.download = "Developer_CV.pdf";
    link.click();
  };

  const handleSubmit = async () => {
  const { name, email, message } = formData;
  if (!name || !email || !message) {
    setFormStatus({ type: 'error', text: 'Please fill in all fields.' });
    return;
  }

  setIsSending(true);
  setFormStatus(null);

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setFormStatus({ type: 'success', text: 'Message sent successfully! I’ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' }); // clear form
    } else {
      throw new Error(data.error || 'Something went wrong');
    }
  } catch (error) {
    console.error(error);
    setFormStatus({ type: 'error', text: 'Failed to send. Please try again later.' });
  } finally {
    setIsSending(false);
  }
};

  const bg = dark ? "#050510" : "#F5F5FC";
  const text = dark ? "#fff" : "#111";
  const muted = dark ? "#4B5563" : "#6B7280";
  const navBg = scrolled ? (dark ? "rgba(5,5,16,0.88)" : "rgba(245,245,252,0.88)") : "transparent";
  const navBorder = scrolled ? (dark ? "rgba(0,212,255,0.1)" : "rgba(0,0,0,0.08)") : "transparent";

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-500"
      style={{ background: bg, color: text, ["--bg-base" as string]: bg }}>

      {/* Grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Glows */}
      <div className="fixed -top-50 -left-50 w-150 h-150 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle,rgba(0,212,255,0.08) 0%,transparent 70%)" }} />
      <div className="fixed -bottom-50 -right-50 w-150 h-150 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)" }} />

      {/* ── NAV ── */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between rounded-2xl mt-3 transition-all duration-300"
          style={{ background: navBg, backdropFilter: scrolled ? "blur(20px)" : "none", border: `1px solid ${navBorder}` }}>

          <span className="font-mono text-[#00D4FF] text-base font-bold tracking-widest">PRINCEKAY</span>

          <ul className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((n) => (
              <li key={n}>
                <button onClick={() => scrollTo(n)}
                  className="font-mono text-[12px] tracking-wider transition-colors duration-200"
                  style={{ color: active === n ? "#00D4FF" : muted }}>
                  {active === n && <span className="text-[#00D4FF] mr-1">›</span>}
                  {n}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle dark={dark} toggle={() => setDark((d) => !d)} />
            <motion.button onClick={handleDownloadCV} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-[10px] font-bold tracking-wider text-black"
              style={{ background: "linear-gradient(135deg,#00D4FF,#A78BFA)" }}>
              ↓ CV
            </motion.button>
            <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="block w-5 h-px" style={{ background: "#00D4FF" }}
                  animate={menuOpen
                    ? i === 0 ? { rotate: 45, y: 5 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -5 }
                    : { rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-1 mx-4 rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: dark ? "rgba(5,5,16,0.96)" : "rgba(245,245,252,0.96)", backdropFilter: "blur(20px)", border: `1px solid ${dark ? "rgba(0,212,255,0.15)" : "rgba(0,0,0,0.1)"}` }}>
              {NAV_LINKS.map((n) => (
                <button key={n} onClick={() => scrollTo(n)}
                  className="text-left font-mono text-xs tracking-wider transition-colors hover:text-[#00D4FF]"
                  style={{ color: muted }}>{n}</button>
              ))}
              <button onClick={handleDownloadCV}
                className="text-left font-mono text-xs tracking-wider text-[#00D4FF]">
                ↓ Download CV
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="About" className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-[#00D4FF] text-[10px] tracking-[0.35em] mb-6 uppercase">
            Available for hire
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-4">
            Building<br />
            <span style={{ background: "linear-gradient(135deg,#00D4FF 0%,#A78BFA 50%,#34D399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Digital
            </span><br />
            Experiences
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
            className="font-mono text-lg md:text-xl mt-6 mb-3" style={{ color: muted }}>
            <span style={{ color: text }}>{typedText}</span>
            <motion.span className="text-[#00D4FF]"
              animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>_</motion.span>
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-xl mx-auto mt-4 mb-12 text-sm leading-relaxed" style={{ color: muted }}>
            Based in Kumasi, Ghana · Crafting pixel-perfect mobile &amp; web apps with Flutter, React Native, and Next.js.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button onClick={() => scrollTo("Projects")} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full font-mono text-xs tracking-wider text-black font-bold"
              style={{ background: "linear-gradient(135deg,#00D4FF,#A78BFA)" }}>
              View Projects
            </motion.button>
            <motion.button onClick={handleDownloadCV} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full font-mono text-xs tracking-wider"
              style={{ border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}>
              ↓ Download CV
            </motion.button>
            <motion.button onClick={() => scrollTo("Contact")} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full font-mono text-xs tracking-wider"
              style={{ border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, color: muted }}>
              Contact Me
            </motion.button>
          </motion.div>

          <motion.div className="flex flex-col items-center gap-2 mt-20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}>
            <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: dark ? "#374151" : "#9CA3AF" }}>Scroll</span>
            <motion.div className="w-px h-10"
              style={{ background: "linear-gradient(to bottom,#00D4FF,transparent)" }}
              animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }} />
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <SectionLabel label="02 // Skills" />
            <h2 className="text-4xl md:text-5xl font-black mb-14">
              Tech <span style={{ color: "#00D4FF" }}>Arsenal</span>
            </h2>
          </FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SKILLS.map((sk, i) => <SkillCard key={sk.name} sk={sk} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="Projects" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <SectionLabel label="03 // Projects" />
            <h2 className="text-4xl md:text-5xl font-black mb-14">
              Featured <span style={{ color: "#A78BFA" }}>Work</span>
            </h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="Experience" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeSection>
            <SectionLabel label="04 // Experience" />
            <h2 className="text-4xl md:text-5xl font-black mb-14">
              Career <span style={{ color: "#34D399" }}>Path</span>
            </h2>
          </FadeSection>
          <div className="relative">
            <div className="absolute left-2.5 top-2 bottom-2 w-px"
              style={{ background: "linear-gradient(to bottom,#34D399,#00D4FF,#A78BFA)" }} />
            <div>
              {EXPERIENCE.map((exp, i) => <ExpItem key={exp.company} exp={exp} i={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeSection>
            <SectionLabel label="05 // Contact" />
            <h2 className="text-4xl md:text-6xl font-black mb-5">
              Let&apos;s{" "}
              <span style={{ background: "linear-gradient(135deg,#00D4FF,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Build
              </span><br />Something
            </h2>
            <p className="max-w-lg mx-auto mb-10 text-sm leading-relaxed" style={{ color: muted }}>
              Have a project in mind? I&apos;m open to new opportunities and freelance work. Let&apos;s connect.
            </p>
          </FadeSection>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-10 rounded-3xl mb-8 text-left"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,212,255,0.15)",
                backdropFilter: "blur(20px)"
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3.5 font-mono text-xs outline-none transition-colors"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    color: text,
                  }}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl px-4 py-3.5 font-mono text-xs outline-none transition-colors"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    color: text,
                  }}
                  required
                />
              </div>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl px-4 py-3.5 font-mono text-xs outline-none transition-colors resize-none mb-3"
                style={{
                  background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  color: text,
                }}
                required
              />

              {formStatus && (
                <div className={`mb-4 text-xs font-mono text-center p-2 rounded ${
                  formStatus.type === 'success' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
                }`}>
                  {formStatus.text}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={isSending}
                className="w-full py-4 rounded-xl font-mono font-bold text-xs tracking-wider text-black disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg,#00D4FF,#A78BFA)" }}
              >
                {isSending ? "Sending ..." : "Send Message →"}
              </motion.button>
            </motion.div>

          <motion.button onClick={handleDownloadCV} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-[11px] tracking-wider"
            style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
            ↓ Download My CV
          </motion.button>

          <div className="flex justify-center gap-8">
            {["GitHub", "LinkedIn", "Twitter", "Email"].map((link) => (
              <motion.button key={link} whileHover={{ y: -2 }}
                className="font-mono text-[9px] tracking-widest uppercase transition-colors hover:text-[#00D4FF]"
                style={{ color: dark ? "#374151" : "#9CA3AF" }}>
                {link}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center"
        style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}` }}>
        <p className="font-mono text-[10px] tracking-wider" style={{ color: dark ? "#1F2937" : "#D1D5DB" }}>
          © 2025 · Built with Next.js &amp; Tailwind
        </p>
      </footer>
    </div>
  );
}