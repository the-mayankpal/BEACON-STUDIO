/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useAnimationFrame, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, Star, Plus, Minus, X, ArrowRight, Bot, Zap, Globe, LayoutDashboard, Users, MessageSquare, BarChart3, Clock, CheckCircle2, Calendar, Send, Linkedin, Twitter, Github, Mail, MapPin, ExternalLink, Phone, Monitor, Component, Database } from 'lucide-react';
import { useEffect, useState, useRef, type ReactNode, type CSSProperties } from 'react';
import Lenis from 'lenis';
import websiteCard from './assets/website-card.png';
import dashboardCard from './assets/dashboard-card.png';


const PROJECTS = [
  { id: 1, title: 'SALES INTELLIGENCE', category: 'Call Performance Hub', year: '2025', image: 'https://res.cloudinary.com/dkxe8h4cs/image/upload/v1771056422/ai_sales_b0ob4i.png' },
  { id: 2, title: 'LOS SANTOS', category: 'Digital Architecture', year: '2024', image: 'https://res.cloudinary.com/dkxe8h4cs/image/upload/v1774287737/photo_6201569219787296188_w_otkvxh.jpg' },
  { id: 3, title: 'AI CO-DESIGNER', category: 'Creative AI Agent', year: '2025', image: 'https://res.cloudinary.com/dkxe8h4cs/image/upload/v1774290114/photo_6201569219787296196_y_goxilz.jpg' },
  { id: 4, title: 'SHOES NEXT', category: 'E-Commerce Hub', year: '2025', image: 'https://res.cloudinary.com/dkxe8h4cs/image/upload/v1774287631/photo_6201569219787296183_w_iigb1o.jpg' },
  { id: 5, title: 'AURA SALES', category: 'CRM Optimizer', year: '2025', image: 'https://res.cloudinary.com/dkxe8h4cs/video/upload/v1774290374/document_6201569219327302910_fqv2o4.mp4' },
  { id: 6, title: 'SUMMIT & SOUL', category: 'Premium Experience', year: '2025', image: 'https://res.cloudinary.com/dkxe8h4cs/video/upload/v1774290370/document_6201569219327302909_ytxguq.mp4' },
  { id: 7, title: 'ZENITH ANALYTICS', category: 'Corporate Tech Hub', year: '2025', image: 'https://res.cloudinary.com/dkxe8h4cs/video/upload/v1774290370/document_6201569219327302908_e34fot.mp4' },
  { id: 8, title: 'FINANCIAL OS', category: 'Investment Hub', year: '2024', image: 'https://res.cloudinary.com/dkxe8h4cs/image/upload/v1774289035/photo_6201569219787296193_y_ylkwjy.jpg' },
  { id: 9, title: 'STRATEGY HUB', category: 'Automation Engine', year: '2025', image: 'https://res.cloudinary.com/dkxe8h4cs/image/upload/v1771056422/ai_sales_b0ob4i.png' },
];

const SERVICES = [
  {
    id: "01",
    title: "Business website",
    description: "Your business deserves a website that actually works. I build clean, fast sites that make a great first impression and turn visitors into customers.",
    tags: ["Mobile friendly", "Fast turnaround", "Custom built"]
  },
  {
    id: "02",
    title: "Dashboards",
    description: "Spreadsheets get messy fast. I build dashboards that bring all your numbers into one place so you always know what's going on in your business.",
    tags: ["All in one place", "Real time", "No chaos"]
  },
  {
    id: "03",
    title: "AI agents",
    description: "Imagine having someone available 24/7 to answer questions, capture leads, and help your customers without hiring anyone. That's what an AI agent does.",
    tags: ["24/7 available", "Instant replies", "Never misses a lead"]
  },
  {
    id: "04",
    title: "Automation",
    description: "Still doing things manually that could run on their own? I connect your tools and set up workflows that save you hours every week so you can focus on what matters.",
    tags: ["Saves hours", "Runs itself", "No manual work"]
  }
];

const FAQS = [
  {
    id: "01",
    question: "How long does it take to build a website?",
    answer: "Most projects are done within 1–2 weeks. It depends on how many pages you need and how quickly we can get the content sorted together."
  },
  {
    id: "02",
    question: "Do I need to be technical to work with you?",
    answer: "Not at all. You just tell me what you need and I handle everything. No tech knowledge required on your end."
  },
  {
    id: "03",
    question: "How much does it cost?",
    answer: "Every project is different, so I don't have fixed prices. But I always give you a clear quote before we start — no surprises."
  },
  {
    id: "04",
    question: "What if I already have a website but just want to improve it?",
    answer: "That works too. I can take what you already have and make it faster, better looking, or add new features like a chatbot or automation on top of it."
  },
  {
    id: "05",
    question: "What if I'm not sure what I actually need?",
    answer: "Most of our clients start here. We'll have a free chat, figure out what's actually slowing you down, and suggest only what makes sense."
  },
  {
    id: "06",
    question: "Can you keep supporting us as we grow?",
    answer: "100%. We're not a build-and-disappear team; we stick around as your business evolves and your needs change."
  }
];

const TECH_LOGOS = [
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180' fill='white'%3E%3Cmask id='m' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='180' height='180'%3E%3Ccircle cx='90' cy='90' r='90' fill='black'/%3E%3C/mask%3E%3Cg mask='url(%23m)'%3E%3Ccircle cx='90' cy='90' r='90' fill='black'/%3E%3Cpath d='M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z' fill='url(%23g1)'/%3E%3Crect x='115' y='54' width='12' height='72' fill='url(%23g2)'/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='109' y1='116.5' x2='144.5' y2='160.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='g2' x1='121' y1='54' x2='120.799' y2='106.875' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E" },
  { name: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Supabase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
  { name: 'Vercel', url: "data:image/svg+xml,%3Csvg viewBox='0 0 116 100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M57.5 0L115 100H0L57.5 0z'/%3E%3C/svg%3E" },
];

import VerticalSlotStack from './components/VerticalSlotStack';
import Logo from './components/Logo';
import WhyUsSection from './components/WhyUsSection';

// Smooth GPU-driven infinite marquee using Framer Motion
function SmoothMarquee({ children, speed = 60 }: { children: ReactNode; speed?: number }) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return;
    const containerWidth = containerRef.current?.scrollWidth ?? 0;
    const halfWidth = containerWidth / 2;
    if (halfWidth === 0) return;
    let current = x.get();
    current -= (speed * delta) / 1000;
    if (current <= -halfWidth) current = 0;
    x.set(current);
  });

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex w-max will-change-transform"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollY } = useScroll();
  const logoRotation = useTransform(scrollY, [0, 1000], [0, 360], { clamp: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black selection:bg-white selection:text-black">
      <div className="noise-overlay" />

      {/* Dynamic Ambient Glow following mouse */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        animate={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      />

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-7xl z-50 h-[64px] flex items-center justify-between px-[24px] border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex items-center"
        >
          <a href="#home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <motion.div style={{ rotate: logoRotation }} className="origin-center flex justify-center items-center shrink-0">
              <Logo iconOnly className="h-7 md:h-10 w-auto text-white" />
            </motion.div>
            <span className="font-heading font-extrabold text-sm tracking-wide text-white uppercase md:hidden mt-[2px]">
              Beacon Studio
            </span>
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="hidden md:flex items-center gap-12 text-xs font-medium tracking-[0.15em] uppercase text-white/50 relative z-10"
        >
          <a href="#home" className="hover:text-white transition-colors duration-300">Home</a>
          <a href="#work" className="hover:text-white transition-colors duration-300">Work</a>
          <a href="#services" className="hover:text-white transition-colors duration-300">Services</a>
          <a href="#why" className="hover:text-white transition-colors duration-300">Why Us</a>
          <a href="#faq" className="hover:text-white transition-colors duration-300">FAQ</a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative z-10 flex items-center gap-3"
        >
          {/* Desktop CTA */}
          <motion.a 
            href="https://t.me/mayank01me" target="_blank" rel="noopener noreferrer" 
            aria-label="Start a Telegram project chat"
            className="btn-primary hidden md:inline-flex items-center gap-2 text-xs relative overflow-hidden group"
            initial="initial" whileHover="hover" whileTap="tap"
          >
            {/* Button Bottom Radial Expansion Effect */}
            <motion.div
              className="absolute bottom-0 left-1/2 w-[20px] h-[20px] rounded-full pointer-events-none z-0 blur-[10px]"
              style={{
                background: 'radial-gradient(circle, rgba(255,122,0,1) 0%, rgba(255,122,0,0) 70%)',
                x: '-50%',
                y: '50%'
              }}
              variants={{
                initial: { scale: 0, opacity: 0.4 },
                hover: { scale: 12, opacity: 0.8, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                tap: { scale: 12, opacity: 0.8, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Start Project <ArrowUpRight className="w-4 h-4" />
            </span>
          </motion.a>
          {/* Mobile compact CTA removed as requested */}
          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-white relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? "0%" : "-100%"
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      >
        <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading font-extrabold tracking-widest uppercase text-white hover:text-white/70 transition-colors">Home</a>
        <a href="#work" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading font-extrabold tracking-widest uppercase text-white hover:text-white/70 transition-colors">Work</a>
        <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading font-extrabold tracking-widest uppercase text-white hover:text-white/70 transition-colors">Services</a>
        <a href="#why" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading font-extrabold tracking-widest uppercase text-white hover:text-white/70 transition-colors">Why Us</a>
        <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading font-extrabold tracking-widest uppercase text-white hover:text-white/70 transition-colors">FAQ</a>
        <motion.a 
          href="https://t.me/mayank01me" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} 
          className="btn-primary mt-8 inline-flex items-center gap-2 text-sm relative overflow-hidden group"
          initial="initial" whileHover="hover" whileTap="tap"
        >
          {/* Button Bottom Radial Expansion Effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 w-[20px] h-[20px] rounded-full pointer-events-none z-0 blur-[10px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,122,0,1) 0%, rgba(255,122,0,0) 70%)',
              x: '-50%',
              y: '50%'
            }}
            variants={{
              initial: { scale: 0, opacity: 0.4 },
              hover: { scale: 12, opacity: 0.8, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              tap: { scale: 12, opacity: 0.8, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
          <span className="relative z-10 flex items-center gap-2">
            Start a Project <ArrowUpRight className="w-4 h-4 shrink-0" />
          </span>
        </motion.a>
      </motion.div>

      {/* --- HERO SECTION --- 
          The primary entry point. Uses a single <h1> for maximum SEO impact.
      */}
      <motion.main 
        id="home"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="sticky top-0 z-[1] w-full flex flex-col items-center justify-center h-screen min-h-screen pt-[80px] pb-[40px] px-6 box-border overflow-hidden"
      >
        {/* Vibrant multi-hue radial glow matching CTA colors — lower center */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(226,147,67,0.8) 0%, rgba(232,93,52,0.8) 30%, rgba(200,58,34,0.6) 55%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Edge vignette — focuses attention centre */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Content block */}
        <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center justify-center text-center gap-[16px]">
          {/* 3-line heading */}
          <h1 className="flex flex-col items-center leading-[1.1] w-full overflow-visible">
            <div className="overflow-hidden mb-[8px] w-full flex justify-center">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="text-[15vw] md:text-[9vw] lg:text-[7.5vw] font-heading font-extrabold tracking-tighter text-white"
              >
                Your
              </motion.div>
            </div>
            
            <div className="overflow-visible mt-[6px] mb-[10px] flex items-center justify-center w-full">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.47 }}
                className="flex items-center justify-center gap-[1.5vw]"
              >
                {/* Left sparkle */}
                <span className="text-white/60 font-sans" style={{ fontSize: 'clamp(12px, 2vw, 28px)' }}>✦</span>

                {/* "unfair" with oval border */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="text-[15vw] md:text-[9vw] lg:text-[7.5vw] font-display italic text-white px-[4vw] md:px-[24px] py-[1vw] md:py-[8px]"
                    style={{ fontWeight: 400, border: '1px solid rgba(255,255,255,0.45)', borderRadius: '50%' }}
                  >
                    unfair
                  </div>
                </div>

                {/* Right sparkle */}
                <span className="text-white/60 font-sans" style={{ fontSize: 'clamp(12px, 2vw, 28px)' }}>✦</span>
              </motion.div>
            </div>
            
            <div className="overflow-hidden mt-[4px] pb-[6px] w-full flex justify-center">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.59 }}
                className="text-[15vw] md:text-[9vw] lg:text-[7.5vw] font-heading font-extrabold tracking-tighter text-white"
              >
                advantage.
              </motion.div>
            </div>
          </h1>

          {/* Recreated Get Started Button matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82 }}
            className="relative flex items-center justify-center py-2 px-6 md:px-8"
          >
            {/* Decorative Stars matching image */}
            <svg className="absolute top-0 left-2 w-3 h-3 text-[#F2A65A] drop-shadow-[0_0_8px_rgba(242,166,90,0.8)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 7.5 14.5 9.5 22 12C14.5 14.5 12 16.5 12 24C12 16.5 9.5 14.5 2 12C9.5 9.5 12 7.5 12 0Z" />
            </svg>
            <svg className="absolute bottom-2 right-0 w-3 h-3 text-[#E85D34] drop-shadow-[0_0_8px_rgba(232,93,52,0.8)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 7.5 14.5 9.5 22 12C14.5 14.5 12 16.5 12 24C12 16.5 9.5 14.5 2 12C9.5 9.5 12 7.5 12 0Z" />
            </svg>
            <svg className="absolute top-1/2 -left-4 w-1.5 h-1.5 text-[#F2A65A]/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 7.5 14.5 9.5 22 12C14.5 14.5 12 16.5 12 24C12 16.5 9.5 14.5 2 12C9.5 9.5 12 7.5 12 0Z" />
            </svg>
            <svg className="absolute top-2 right-8 w-1.5 h-1.5 text-[#E85D34]/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 7.5 14.5 9.5 22 12C14.5 14.5 12 16.5 12 24C12 16.5 9.5 14.5 2 12C9.5 9.5 12 7.5 12 0Z" />
            </svg>

            <a
              href="https://t.me/mayank01me" target="_blank" rel="noopener noreferrer"
              aria-label="Start your project with us"
              className="relative group cursor-pointer inline-flex items-center justify-center px-14 py-[18px] rounded-full font-sans text-[22px] font-medium text-white shadow-[0_0_40px_rgba(232,93,52,0.35)] hover:shadow-[0_0_50px_rgba(232,93,52,0.5)] transition-shadow duration-300"
            >
              {/* Gradient border ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F2A65A] to-[#E85D34] p-[1.5px]">
                {/* Inner dark pill */}
                <div className="relative w-full h-full bg-[#0a0a0a] rounded-full overflow-hidden" />
              </div>
              
              {/* Text Content */}
              <span className="relative z-10 leading-none">Get Started</span>
            </a>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="w-full max-w-[600px] text-xs md:text-sm font-mono uppercase tracking-[0.18em] leading-loose text-white/50 m-0"
          >
            THE SAME AI POWER BIG COMPANIES PAY MILLIONS FOR, FINALLY BUILT FOR BUSINESSES LIKE YOURS.
          </motion.p>
        </div>
      </motion.main>

      {/* --- CONTENT OVERLAY LAYER --- 
          Contains all secondary informational sections.
      */}
      <motion.div
        initial={{ y: 40, opacity: 0.95 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="relative z-[2] bg-black min-h-[120vh] border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
      >
        {/* --- TRUST BAR / TECH STACK --- */}
        <motion.section 
          className="relative z-20 overflow-hidden py-5 flex items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS].map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center w-32 md:w-48 shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-8 md:h-10 object-contain"
                title={logo.name}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* --- PROJECTS / PORTFOLIO SECTION --- */}
      <motion.section 
        id="work" 
        className="relative z-20 py-32 bg-black"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="px-6 md:px-12 lg:px-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-white/30" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                Selected Archives
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter uppercase leading-[0.9]">
              FEATURED <br/><span className="font-display italic text-white/70">WORKS</span>
            </h2>
          </motion.div>
          <motion.p 
            className="max-w-xs text-sm text-white/50 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            A curated selection of our most recent digital transformations.
          </motion.p>
        </div>

        <div className="relative py-12">
          <SmoothMarquee speed={50}>
            {PROJECTS.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="shrink-0 w-[42vw] md:w-[32vw] lg:w-[26vw] mx-4 md:mx-6 group cursor-pointer"
              >
                <div className={`relative aspect-[16/10] overflow-hidden rounded-xl mb-6 border border-white/5 group-hover:border-white/20 transition-all duration-500 ${project.image.includes('cloudinary') ? 'bg-black' : 'bg-white/[0.03]'}`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  {project.image.includes('cloudinary') && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-orange-600 text-[9px] font-mono font-bold text-white uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Featured
                    </div>
                  )}
                  {project.image.includes('/video/') ? (
                    <video
                      src={project.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain p-4 md:p-6 transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-110 ${project.image.includes('cloudinary') ? 'object-contain p-4 md:p-6' : 'object-cover'}`}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div className="flex items-start justify-between px-1">
                  <div>
                    <h3 className="text-xl md:text-2xl font-heading font-extrabold tracking-tight mb-2 text-white/90 group-hover:text-white transition-colors">{project.title}</h3>
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 group-hover:text-white/60 transition-colors">{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </SmoothMarquee>
        </div>
      </motion.section>

      {/* --- SERVICES / EXPERTISE SECTION --- */}
        <motion.section 
          id="services" 
          className="relative z-20 py-32 bg-black border-t border-white/5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
        <div className="px-6 md:px-12 lg:px-16 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-white/30" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                Our Expertise
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter uppercase">HERE'S HOW <br/><span className="text-white/70">WE HELP</span></h2>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-4">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className="group relative flex flex-col-reverse md:flex-row items-stretch rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.035] transition-colors duration-500 overflow-hidden cursor-pointer"
                style={{ minHeight: 200 }}
              >
                  {/* Left Panel: Text Content */}
                  <div className="flex flex-col justify-between p-8 md:p-10 md:w-1/2 gap-8 relative z-10">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">{service.id}</span>
                    <h3 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <span key={tag} className="whitespace-nowrap text-[9px] uppercase tracking-[0.18em] font-medium border border-white/[0.12] bg-white/[0.04] px-3 py-1 rounded-md text-white/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Right Panel: Visual */}
                <div className="relative md:w-1/2 min-h-[180px] md:min-h-0 overflow-hidden rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none border-t md:border-t-0 md:border-l border-white/10 flex items-center justify-center">
                  {i === 0 && (
                    /* Professional Floating Browser Mockup — Auto-Scrolling Page */
                    <div className="absolute inset-0 bg-[#08080a] flex items-center justify-center p-6 md:p-10">
                      <div className="relative w-full h-full max-w-[340px] max-h-[220px] group/device">
                        {/* Browser Frame */}
                        <div className="absolute inset-0 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden shadow-2xl transition-transform duration-700 group-hover/device:-translate-y-2 group-hover/device:rotate-1">
                          {/* Browser Bar */}
                          <div className="h-6 bg-white/[0.05] border-b border-white/10 flex items-center px-3 gap-1.5 z-20 relative">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#E85D34]/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                          </div>
                          {/* Mockup Canvas — Scrolling Inner Area */}
                          <div className="relative w-full h-[calc(100%-1.5rem)] overflow-hidden">
                            <motion.img 
                              src={websiteCard} 
                              alt="Business Website Design" 
                              className="w-full h-auto object-cover opacity-90 origin-top"
                              animate={{ y: [0, -150, 0] }}
                              transition={{ 
                                duration: 10, 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                repeatDelay: 2
                              }}
                            />
                            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent z-10" />
                          </div>
                        </div>
                        {/* Ambient Glows */}
                        <div className="absolute -inset-4 bg-[#E85D34]/5 blur-[40px] rounded-full opacity-50 z-[-1]" />
                      </div>
                    </div>
                  )}

                  {i === 1 && (
                    /* Premium Dashboard — Interactive Multi-Section Workflow */
                    <div className="absolute inset-0 bg-[#060608] flex items-center justify-center p-6 md:p-10">
                      <div className="relative w-full h-full max-w-[340px] max-h-[220px] group/device">
                        {/* Glass Dashboard Shell */}
                        <motion.div 
                          className="absolute inset-0 rounded-2xl bg-white/[0.02] border border-white/20 backdrop-blur-md overflow-hidden shadow-2xl"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          
                          {/* Main Screen Content */}
                          <div className="relative w-full h-full">
                            {/* BASE IMAGE */}
                            <img 
                              src={dashboardCard} 
                              alt="Intelligence Dashboard" 
                              className="w-full h-full object-cover opacity-80"
                            />

                            {/* SECTION A: STATS OVERLAY (Smooth Slide/Fade) */}
                            <motion.div 
                              className="absolute inset-0 bg-[#08080a] z-10 p-6 flex flex-col gap-4"
                              initial={{ y: "100%", opacity: 0 }}
                              animate={{ 
                                y: ["100%", "0%", "0%", "100%", "100%"],
                                opacity: [0, 1, 1, 0, 0]
                              }}
                              transition={{ 
                                duration: 10, 
                                repeat: Infinity, 
                                times: [0, 0.1, 0.45, 0.55, 1],
                                ease: "easeInOut"
                              }}
                            >
                               <div className="flex gap-2">
                                 {[1, 2, 3].map(j => (
                                   <div key={j} className="flex-1 h-12 rounded-lg bg-white/[0.05] border border-white/10 relative overflow-hidden">
                                      <motion.div 
                                        className="h-full bg-orange-500/20"
                                        initial={{ width: 0 }}
                                        animate={{ width: "70%" }}
                                        transition={{ delay: 1, duration: 1.5 }}
                                      />
                                   </div>
                                 ))}
                               </div>
                               <div className="flex-1 rounded-lg bg-orange-500/[0.03] border border-orange-500/10 flex items-center justify-center">
                                  <motion.div 
                                    className="w-2/3 h-1/2 flex items-end gap-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                  >
                                    {[0.3, 0.8, 0.5, 1.2, 0.7].map((h, k) => (
                                      <motion.div 
                                        key={k} 
                                        className="flex-1 bg-orange-500/40 rounded-t-sm" 
                                        animate={{ height: h * 40 }}
                                      />
                                    ))}
                                  </motion.div>
                               </div>
                            </motion.div>

                            {/* SECTION B: DETAIL OVERLAY (Scale In) */}
                            <motion.div 
                              className="absolute inset-0 bg-black/60 z-20 backdrop-blur-sm flex items-center justify-center"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ 
                                scale: [0.8, 0.8, 1, 1, 0.8],
                                opacity: [0, 0, 1, 1, 0]
                              }}
                              transition={{ 
                                duration: 10, 
                                repeat: Infinity, 
                                times: [0, 0.6, 0.7, 0.9, 1],
                                ease: "backOut"
                              }}
                            >
                               <div className="w-2/3 h-2/3 rounded-xl border border-white/20 bg-[#121215] p-4">
                                  <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                                     <motion.div className="h-full bg-orange-500" animate={{ width: ["0%", "100%"] }} transition={{ duration: 3, delay: 6.5 }} />
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                     {[1, 2, 3, 4].map(l => <div key={l} className="h-8 rounded bg-white/5 border border-white/5" />)}
                                  </div>
                               </div>
                            </motion.div>

                            {/* Virtual Cursor — Coordinated Clicks */}
                            <motion.div 
                              className="absolute z-50 pointer-events-none"
                              initial={{ x: 300, y: 180, opacity: 0 }}
                              animate={{ 
                                x: [300, 20, 20, 150, 150, 300], 
                                y: [180, 50, 50, 120, 120, 180],
                                scale: [1, 1, 0.8, 1, 0.8, 1],
                                opacity: [0, 1, 1, 1, 1, 0]
                              }}
                              transition={{ 
                                duration: 10, 
                                repeat: Infinity, 
                                times: [0, 0.05, 0.1, 0.6, 0.65, 1],
                                ease: "easeInOut"
                              }}
                            >
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="white" stroke="black" strokeWidth="1">
                                 <path d="M4 2.5L4 16.5L7.5 13L10.5 19L12.5 18L9.5 12L15 12L4 2.5Z" />
                              </svg>
                              
                              {/* Selection Circles at click times */}
                              <motion.div 
                                className="absolute -left-2 -top-2 w-8 h-8 rounded-full border-2 border-white/50"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                  scale: [0, 0, 2, 0, 0, 2, 0],
                                  opacity: [0, 0, 1, 0, 0, 1, 0]
                                }}
                                transition={{ 
                                  duration: 10, 
                                  repeat: Infinity, 
                                  times: [0, 0.08, 0.12, 0.15, 0.63, 0.67, 0.7] 
                                }}
                              />
                            </motion.div>

                            <div className="absolute inset-0 bg-gradient-to-tr from-[#E85D34]/10 via-transparent to-transparent" />
                          </div>
                        </motion.div>
                        
                        {/* Technical HUD accents */}
                        <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none opacity-40">
                          <rect x="0" y="0" width="100%" height="100%" rx="20" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="100 20" />
                          <circle cx="20" cy="20" r="2" fill="#E85D34" />
                          <circle cx="calc(100% - 20px)" cy="calc(100% - 20px)" r="2" fill="#E85D34" />
                        </svg>
                      </div>
                    </div>
                  )}








                  {i === 2 && (
                    /* AI neural network — animated signal propagation */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a001a] via-[#0d0d0d] to-[#00081a]">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
                        <defs>
                          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(232,93,52,0.8)" />
                            <stop offset="100%" stopColor="rgba(232,93,52,0)" />
                          </radialGradient>
                        </defs>

                        {/* Static dim connection lines — layer 1→2 */}
                        {[[70,60],[70,125],[70,190]].map(([x1,y1]) =>
                          [[200,80],[200,125],[200,170]].map(([x2,y2]) => (
                            <line key={`s1-${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(232,93,52,0.08)" strokeWidth="1"/>
                          ))
                        )}
                        {/* Static dim connection lines — layer 2→3 */}
                        {[[200,80],[200,125],[200,170]].map(([x1,y1]) =>
                          [[330,60],[330,100],[330,140],[330,180]].map(([x2,y2]) => (
                            <line key={`s2-${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(232,93,52,0.08)" strokeWidth="1"/>
                          ))
                        )}

                        {/* Animated signal packets — layer 1→2 */}
                        {([[70,60],[70,125],[70,190]] as [number,number][]).map(([x1,y1], li) =>
                          ([[200,80],[200,125],[200,170]] as [number,number][]).map(([x2,y2], hi) => (
                            <motion.circle
                              key={`p1-${li}-${hi}`}
                              r="3"
                              fill="rgba(232,93,52,0.95)"
                              initial={{ offsetDistance: "0%", opacity: 0 }}
                              animate={{ offsetDistance: ["0%","100%","100%"], opacity: [0, 1, 0] }}
                              transition={{
                                duration: 1.8,
                                delay: li * 0.4 + hi * 0.15,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                                ease: "easeInOut"
                              }}
                              style={{
                                offsetPath: `path("M ${x1} ${y1} L ${x2} ${y2}")`,
                                offsetRotate: "0deg"
                              } as CSSProperties}
                            />
                          ))
                        )}

                        {/* Animated signal packets — layer 2→3 */}
                        {([[200,80],[200,125],[200,170]] as [number,number][]).map(([x1,y1], hi) =>
                          ([[330,60],[330,100],[330,140],[330,180]] as [number,number][]).map(([x2,y2], oi) => (
                            <motion.circle
                              key={`p2-${hi}-${oi}`}
                              r="3"
                              fill="rgba(232,93,52,0.95)"
                              initial={{ offsetDistance: "0%", opacity: 0 }}
                              animate={{ offsetDistance: ["0%","100%","100%"], opacity: [0, 1, 0] }}
                              transition={{
                                duration: 1.8,
                                delay: 1.8 + hi * 0.4 + oi * 0.12,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                                ease: "easeInOut"
                              }}
                              style={{
                                offsetPath: `path("M ${x1} ${y1} L ${x2} ${y2}")`,
                                offsetRotate: "0deg"
                              } as CSSProperties}
                            />
                          ))
                        )}

                        {/* Input nodes */}
                        {([60,125,190] as number[]).map((y, idx) => (
                          <g key={`in-${y}`}>
                            <circle cx="70" cy={y} r="14" fill="url(#nodeGlow)" opacity="0.3"/>
                            <motion.circle cx="70" cy={y} r="10"
                              fill="rgba(232,93,52,0.25)" stroke="rgba(232,93,52,0.7)" strokeWidth="1.5"
                              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
                              transition={{ duration: 1.5, delay: idx * 0.4, repeat: Infinity, ease: "easeInOut" }}
                            />
                          </g>
                        ))}

                        {/* Hidden nodes */}
                        {([80,125,170] as number[]).map((y, idx) => (
                          <g key={`hid-${y}`}>
                            <circle cx="200" cy={y} r="16" fill="url(#nodeGlow)" opacity="0.25"/>
                            <motion.circle cx="200" cy={y} r="12"
                              fill="rgba(232,93,52,0.2)" stroke="rgba(232,93,52,0.55)" strokeWidth="1.5"
                              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, delay: 1.8 + idx * 0.35, repeat: Infinity, ease: "easeInOut" }}
                            />
                          </g>
                        ))}

                        {/* Output nodes */}
                        {([60,100,140,180] as number[]).map((y, idx) => (
                          <g key={`out-${y}`}>
                            <circle cx="330" cy={y} r="14" fill="url(#nodeGlow)" opacity="0.3"/>
                            <motion.circle cx="330" cy={y} r="10"
                              fill="rgba(232,93,52,0.35)" stroke="rgba(232,93,52,0.8)" strokeWidth="1.5"
                              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }}
                              transition={{ duration: 1.2, delay: 3.6 + idx * 0.25, repeat: Infinity, ease: "easeInOut" }}
                            />
                          </g>
                        ))}

                      </svg>
                    </div>
                  )}
                  {i === 3 && (
                    /* Abstract Automation Engine Visual */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#120a05] via-[#0d0d0d] to-[#0a0505]">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
                        {/* Background faint grid/radar */}
                        <circle cx="200" cy="125" r="150" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                        <circle cx="200" cy="125" r="100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="0" y1="125" x2="400" y2="125" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                        <line x1="200" y1="0" x2="200" y2="250" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                        {/* Outer sweeping pipelines */}
                        <path d="M -50,125 C 50,250 150,0 200,125 C 250,250 350,0 450,125" fill="none" stroke="rgba(232,93,52,0.05)" strokeWidth="2" />
                        <path d="M -50,125 C 50,0 150,250 200,125 C 250,0 350,250 450,125" fill="none" stroke="rgba(232,93,52,0.05)" strokeWidth="2" />
                        
                        <motion.path 
                          d="M -50,125 C 50,250 150,0 200,125 C 250,250 350,0 450,125" fill="none" stroke="rgba(232,93,52,0.5)" strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "40 400", strokeDashoffset: 0 }}
                          animate={{ strokeDashoffset: -460 }}
                          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        />
                        <motion.path 
                          d="M -50,125 C 50,0 150,250 200,125 C 250,0 350,250 450,125" fill="none" stroke="rgba(232,93,52,0.5)" strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "40 400", strokeDashoffset: 0 }}
                          animate={{ strokeDashoffset: 460 }}
                          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        />

                        {/* Geometric Automation Core */}
                        <g transform="translate(200, 125)">
                          {/* Inner glowing core */}
                          <motion.circle cx="0" cy="0" r="8" fill="rgba(232,93,52,0.8)" 
                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                          />
                          <motion.circle cx="0" cy="0" r="14" fill="none" stroke="rgba(232,93,52,0.5)" strokeWidth="1" 
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                          />
                          
                          {/* Concentric tracks representing automation loops */}
                          <motion.circle cx="0" cy="0" r="30" fill="none" stroke="rgba(232,93,52,0.3)" strokeWidth="4" strokeDasharray="4 8" 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                            style={{ transformOrigin: "0px 0px" }}
                          />
                          <circle cx="0" cy="0" r="45" fill="none" stroke="rgba(232,93,52,0.2)" strokeWidth="1" />
                          <motion.circle cx="0" cy="0" r="60" fill="none" stroke="rgba(232,93,52,0.4)" strokeWidth="1.5" strokeDasharray="40 20 10 20" 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                            style={{ transformOrigin: "0px 0px" }}
                          />
                          <circle cx="0" cy="0" r="80" fill="none" stroke="rgba(232,93,52,0.1)" strokeWidth="8" />
                          
                          {/* Data transmission dots along rings */}
                          <motion.g 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                            style={{ transformOrigin: "0px 0px" }}
                          >
                            <circle cx="45" cy="0" r="3" fill="rgba(232,93,52,1)" />
                            <circle cx="-45" cy="0" r="3" fill="rgba(232,93,52,1)" />
                          </motion.g>
                          <motion.g 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                            style={{ transformOrigin: "0px 0px" }}
                          >
                            <circle cx="0" cy="60" r="4" fill="rgba(232,93,52,1)" />
                            <circle cx="0" cy="-60" r="4" fill="rgba(232,93,52,1)" />
                          </motion.g>
                        </g>

                        {/* Secondary nodes connecting to the core */}
                        {[ 
                          [100, 125], [300, 125], [130, 55], [270, 55], [130, 195], [270, 195] 
                        ].map(([x, y], idx) => (
                          <g key={`${x}-${y}`}>
                            <line x1="200" y1="125" x2={x} y2={y} stroke="rgba(232,93,52,0.2)" strokeWidth="1" />
                            <circle cx={x} cy={y} r="6" fill="rgba(10,5,5,1)" stroke="rgba(232,93,52,0.6)" strokeWidth="1.5" />
                            <motion.circle cx={x} cy={y} r="2" fill="rgba(232,93,52,1)" 
                              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
                              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, delay: idx * 0.2 }}
                              style={{ transformOrigin: "50% 50%" }}
                            />
                          </g>
                        ))}
                      </svg>
                    </div>
                  )}
                  {/* Overlay gradient for blending */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent md:from-black/80 md:via-black/20 md:to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
            </div>
          </div>
        </motion.section>


      {/* --- WHY US / VALUE PROPOSITION --- */}
      <WhyUsSection />

      {/* --- FAQ SECTION --- */}
        <motion.section 
          id="faq" 
          className="relative z-20 py-32 bg-black border-t border-white/5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
        <div className="px-6 md:px-12 lg:px-16 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-white/30" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                The Details
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter uppercase">GOT <br/><span className="text-white/70">QUESTIONS?</span></h2>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto flex flex-col gap-3">
          {FAQS.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors duration-300 hover:bg-white/[0.05]"
            >
              {/* Header row */}
              <button
                onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                  {faq.question}
                </h3>
                {/* Circular arrow button */}
                <div className={`shrink-0 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${activeFaq === faq.id ? 'bg-white/10 border-white/40' : 'bg-transparent'}`}>
                  <ArrowUpRight
                    className={`w-4 h-4 text-white transition-transform duration-500 ${activeFaq === faq.id ? 'rotate-0' : 'rotate-90'}`}
                  />
                </div>
              </button>

              {/* Answer — expands with grid trick */}
              <div className={`grid transition-all duration-500 ease-in-out ${activeFaq === faq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  {/* Dashed divider */}
                  <div className="mx-6 border-t border-dashed border-white/20" />
                  <p className="px-6 pt-4 pb-6 text-sm md:text-base text-white/50 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* --- CTA / CONTACT SECTION --- */}
      <motion.section 
        id="contact" 
        className="relative z-20 py-24 bg-black border-t border-white/5 px-4 md:px-8 lg:px-16 flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full max-w-[1400px] rounded-2xl overflow-hidden shadow-2xl min-h-[500px] md:min-h-[600px] flex flex-col">
          
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E85D34] via-[#C83A22] to-[#E29343] z-0" />
          
          {/* Blurred Blobs for Mesh Effect */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F2A65A] rounded-full mix-blend-overlay filter blur-[100px] opacity-80 animate-pulse z-0" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B22222] rounded-full mix-blend-overlay filter blur-[100px] opacity-80 animate-pulse z-0" />

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
            {/* Brand Logo Icon */}
            <Logo iconOnly className="h-12 w-auto text-white mb-2 opacity-90" />

            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Less manual, more automated?
            </motion.h2>
            <motion.p 
              className="text-white/90 text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Let's arrange an initial consultation to identify your greatest needs and explore potential areas for optimisation.
            </motion.p>
            <motion.a 
              href="https://t.me/mayank01me" target="_blank" rel="noopener noreferrer" 
              className="btn-white inline-flex items-center gap-2 text-xs relative overflow-hidden group"
              initial="initial" whileHover="hover" whileTap="tap"
            >
              {/* Button Bottom Radial Expansion Effect */}
              <motion.div
                className="absolute bottom-0 left-1/2 w-[20px] h-[20px] rounded-full pointer-events-none z-0 blur-[10px]"
                style={{
                  background: 'radial-gradient(circle, rgba(255,122,0,1) 0%, rgba(255,122,0,0) 70%)',
                  x: '-50%',
                  y: '50%'
                }}
                variants={{
                  initial: { scale: 0, opacity: 0.4 },
                  hover: { scale: 12, opacity: 0.8, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  tap: { scale: 12, opacity: 0.8, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Start Project <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.a>
          </div>

          {/* Bottom Slots */}
          <div className="block md:hidden">
            <VerticalSlotStack />
          </div>

          {/* Desktop Slots — horizontal row */}
          <div className="hidden md:flex relative z-10 flex-row border-t border-white/20 bg-black/5 backdrop-blur-sm">
            {[1, 2, 3, 4, 5].map((slot) => (
              <div
                key={slot}
                className="relative flex-1 h-24 border-r border-white/10 px-4 py-3 flex flex-col items-start justify-between overflow-hidden group"
              >
                {/* Diagonal line graphic */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.5" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider relative z-10">Slot 0{slot}</span>
                <span className="text-sm font-sans font-medium text-white/50 relative z-10">Assigned</span>
              </div>
            ))}
            {/* Slot 06 — Available */}
            <div className="relative flex-1 h-24 px-4 py-3 flex flex-col items-start justify-between bg-white/10 overflow-hidden cursor-pointer hover:bg-white/20 transition-colors">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider relative z-10">Slot 06</span>
              <span className="text-sm font-sans font-bold text-white flex items-center gap-2 relative z-10">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                Available
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- FOOTER SECTION --- */}
      <motion.footer 
        className="relative bg-black text-white overflow-hidden pt-12 pb-6 px-6 md:px-12 lg:px-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Orange blurred background effect */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[40%] w-[60vw] h-[60vw] bg-[#E85D34] rounded-full blur-[100px] md:blur-[140px] opacity-30"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#E29343] rounded-full blur-[100px] md:blur-[120px] opacity-35"></div>
          <div className="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-[#C83A22] rounded-full blur-[100px] md:blur-[160px] opacity-20"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col">
          
          {/* Top Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-white/10 mb-16 gap-4">
            <div className="flex flex-wrap gap-6 text-xs font-semibold text-white/70">
              {/* Social handles text removed as requested */}
            </div>
            <a href="mailto:me.mayank.pal@gmail.com" className="text-xs font-medium text-white/40 hover:text-white transition-colors">
              me.mayank.pal@gmail.com
            </a>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/10 mb-16">
            {/* Logo */}
            <div>
              <div className="flex flex-col items-start gap-3">
                <Logo className="h-32 md:h-40 w-auto text-white" />
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-1">
              <a href="#" className="text-3xl md:text-4xl font-medium text-white hover:text-white/70 transition-colors tracking-tight">Home</a>
              <a href="#work" className="text-3xl md:text-4xl font-medium text-white/50 hover:text-white transition-colors tracking-tight">Work</a>
              <a href="#services" className="text-3xl md:text-4xl font-medium text-white/50 hover:text-white transition-colors tracking-tight">Services</a>
              <a href="#why" className="text-3xl md:text-4xl font-medium text-white/50 hover:text-white transition-colors tracking-tight">Why Us</a>
              <a href="#faq" className="text-3xl md:text-4xl font-medium text-white/50 hover:text-white transition-colors tracking-tight">FAQ</a>
              <a href="#contact" className="text-3xl md:text-4xl font-medium text-white/50 hover:text-white transition-colors tracking-tight">Contact</a>
            </div>

            {/* Description */}
            <div className="flex md:justify-end">
              <motion.p 
                className="text-xs text-white/40 max-w-[220px] md:text-right leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Digital studio, We engineer obsessions.
              </motion.p>
            </div>
          </div>

          {/* Giant Text */}
          <div className="w-full flex justify-center mb-16 md:mb-24">
            <div className="text-[13vw] md:text-[14vw] leading-[0.85] font-sans font-medium tracking-tighter text-white whitespace-nowrap">
              BEACON Studio
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-white/50 mt-8 gap-4">
            <span>BEACONSTUDIO © 2026</span>
            <span>Global 10:32:16 AM</span>
          </div>

        </div>
      </motion.footer>
      </motion.div>
    </div>
  );
}
