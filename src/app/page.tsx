"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, ChevronDown, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- MOTION CONFIGURATION ---
const premiumSpring = { type: "spring", bounce: 0, duration: 0.25 } as const;
const hoverScale = 1.01;
const tapScale = 0.98;

// --- CUSTOM INLINE BRAND SVG COMPONENTS (Bulletproof Versioning) ---
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const OnlyFansIcon = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center transition-all duration-200 ${className}`}>
    <Image 
      src="/onlyfans.svg" 
      alt="OnlyFans" 
      width={16} 
      height={16} 
      className="object-contain brightness-[0.7] group-hover:brightness-100 transition-all duration-200"
    />
  </div>
);

// --- CHAOTIC LIQUID ENTROPY MATERIAL ENGINE ---
interface Grain {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSpeed: number;
  layer: number;
  colorStr: string;
  size: number;
  chaosSeed: number;
}

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let grains: Grain[] = [];
    
    const bounds = { width: 0, height: 0, cx: 0, cy: 0 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      bounds.width = rect.width;
      bounds.height = rect.height;
      bounds.cx = rect.width / 2;
      bounds.cy = rect.height / 2;

      initGrains();
    };

    const initGrains = () => {
      grains = [];
      const totalGrains = bounds.width < 768 ? 3800 : 7800;
      
      for (let i = 0; i < totalGrains; i++) {
        const x = Math.random() * bounds.width;
        const y = Math.random() * bounds.height;
        
        const layerRand = Math.random();
        let layer = 0;
        let size = 0.9;
        let baseSpeed = 0.35;
        
        if (layerRand > 0.4 && layerRand <= 0.75) {
          layer = 1;
          size = 1.4;
          baseSpeed = 0.55;
        } else if (layerRand > 0.75) {
          layer = 2;
          size = 2.1;
          baseSpeed = 0.85;
        }

        const noiseFactor = Math.sin(x * 0.015) * Math.cos(y * 0.015) + Math.sin(x * 0.04) * 0.3;
        const isRed = noiseFactor > -0.2 ? Math.random() > 0.25 : Math.random() > 0.85;
        
        let colorStr = "#121212"; 
        if (isRed) {
          colorStr = layer === 0 ? "#cc0010" : layer === 1 ? "#ff1a2b" : "#ff4d5a";
        } else if (layer === 2) {
          colorStr = "#2a2a2a"; 
        }

        grains.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          baseSpeed,
          layer,
          colorStr,
          size,
          chaosSeed: Math.random() * 100
        });
      }
    };

    const render = (time: number) => {
      ctx.fillStyle = "#090909";
      ctx.fillRect(0, 0, bounds.width, bounds.height);

      const pulse = Math.sin(time * 0.001) * 0.03;

      for (let i = 0; i < grains.length; i++) {
        const g = grains[i];

        const wave1 = Math.sin(g.y * 0.035 + time * 0.0014 + g.chaosSeed) * 1.4;
        const wave2 = Math.cos(g.x * 0.025 - time * 0.0018 + g.chaosSeed) * 1.4;
        const wave3 = Math.sin((g.x + g.y) * 0.045 + time * 0.0022) * 0.8;

        const thermalEntropyX = (Math.random() - 0.5) * 0.45;
        const thermalEntropyY = (Math.random() - 0.5) * 0.45;

        g.vx += (wave1 + wave3 + thermalEntropyX) * g.baseSpeed * 0.12;
        g.vy += (wave2 + wave3 + thermalEntropyY) * g.baseSpeed * 0.12;

        g.vx *= 0.88;
        g.vy *= 0.88;

        g.x += g.vx + (g.x - bounds.cx) * pulse * 0.15;
        g.y += g.vy + (g.y - bounds.cy) * pulse * 0.15;

        if (g.x < -15) g.x = bounds.width + 15;
        if (g.x > bounds.width + 15) g.x = -15;
        if (g.y < -15) g.y = bounds.height + 15;
        if (g.y > bounds.height + 15) g.y = -15;

        ctx.fillStyle = g.colorStr;
        ctx.fillRect(g.x, g.y, g.size, g.size);
      }

      const edgeVignette = ctx.createRadialGradient(bounds.cx, bounds.cy, bounds.width * 0.15, bounds.cx, bounds.cy, bounds.width * 0.52);
      edgeVignette.addColorStop(0, "rgba(9,9,9,0)");
      edgeVignette.addColorStop(0.8, "rgba(9,9,9,0.75)");
      edgeVignette.addColorStop(1, "rgba(9,9,9,1)");
      ctx.fillStyle = edgeVignette;
      ctx.fillRect(0, 0, bounds.width, bounds.height);

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    
    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-2xl cursor-default" />;
};

// --- REUSABLE COMPONENTS ---
const Card = ({ children, className = "", noHover = false }: { children: React.ReactNode, className?: string, noHover?: boolean }) => (
  <motion.div
    whileHover={noHover ? undefined : { scale: hoverScale }}
    whileTap={noHover ? undefined : { scale: tapScale }}
    transition={premiumSpring}
    className={`bg-[#090909] border border-[#ffffff14] rounded-2xl overflow-hidden ${!noHover && 'hover:bg-[#101010]'} transition-colors duration-200 ${className}`}
  >
    {children}
  </motion.div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 text-xs font-medium text-[#A1A1AA] bg-black/40 border border-[#ffffff14] rounded-full">
    {children}
  </span>
);

// --- MAIN PAGE ---
export default function HiringExperience() {
  const [expExpanded, setExpExpanded] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  return (
    <div className="min-h-screen bg-[#000000] text-[#FAFAFA] font-sans selection:bg-[#C8102E]/30 pb-24 relative overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-[#ffffff14] bg-black/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 overflow-hidden">
              <Image src="/logo.svg" alt="Atharv" width={24} height={24} className="object-cover" />
            </div>
            <span className="font-medium">Atharv</span>
          </div>
          <div className="flex items-center gap-6 text-[#A1A1AA]">
            <a href="/resume.pdf" download className="hover:text-white transition-colors duration-200">Resume</a>
            <a 
              href="https://cal.com/atharvmalve/quick-discovery-call?overlayCalendar=true" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white flex items-center gap-1 hover:text-[#A1A1AA] transition-colors duration-200"
            >
              Book a Call <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 mt-12 space-y-12">
        
        {/* HERO BENTO GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* 1. ABOUT CARD */}
          <Card className="order-2 lg:order-none h-72 w-full lg:col-span-1 p-5 flex flex-col justify-between" noHover>
            <div>
              <h1 className="text-neutral-200 text-[16px] font-medium leading-tight tracking-tight">
                I'm Atharv, a{" "}
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-transparent bg-clip-text font-bold">
                  Product Developer
                </span>{" "}
                 from Pune❤️
              </h1>
              <p className="text-neutral-400 mt-3 text-[13px] font-normal leading-snug">
                With a passion for product building. I help agencies create end-to-end products for their clients.
              </p>
            </div>
            <div>
              <h2 className="uppercase text-[11px] text-neutral-200 font-semibold tracking-wider">
                Currently
              </h2>
              <p className="text-neutral-400 mt-0.5 text-[13px] leading-snug">
                Available for freelancing. <br />
                From Pune to the world!
              </p>
            </div>
          </Card>

          {/* 2. VISUAL CANVAS MATRIX */}
          <Card className="order-1 lg:order-none relative h-42 lg:h-42 lg:col-span-2 bg-[#090909] self-center overflow-hidden border border-[#ffffff14]" noHover>
            <HeroCanvas />
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay select-none z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%27 height='100%27 filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                animation: 'grain-dance 0.6s steps(6) infinite'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20">
              <div className="w-[280px] md:w-[480px] h-48 md:h-[160px] bg-[#5e090e] opacity-35 blur-[80px] rounded-full mix-blend-screen" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-30 px-4">
              <span className="text-[10px] md:text-[12px] font-normal tracking-[0.12em] text-neutral-300 lowercase mb-1.5 md:mb-1 text-center opacity-85">
                i take ideas from
              </span>
              <h1 className="text-[32px] md:text-[38px] font-semibold tracking-tighter text-white text-center leading-[1.05] max-w-xs md:max-w-xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
                Sentence to Software
              </h1>
            </div>
            <style jsx global>{`
              @keyframes grain-dance {
                0% { background-position: 0% 0%; }
                20% { background-position: 10% 5%; }
                40% { background-position: -5% 15%; }
                60% { background-position: 15% -5%; }
                80% { background-position: -10% 10%; }
                100% { background-position: 5% -10%; }
              }
            `}</style>
          </Card>

          {/* 3. SOCIALS CARD BENTO CLUSTER */}
          <div className="order-3 lg:order-none lg:col-span-1 lg:row-span-2 flex flex-col gap-4">
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/atharvmalve", icon: LinkedInIcon },
              { label: "GitHub", href: "https://github.com/atharvmalve", icon: GitHubIcon },
              { label: "X", href: "https://x.com/devvincii", icon: XIcon },
              { label: "Mail", href: "mailto:atharvmalve@gmail.com", icon: Mail },
              { label: "OnlyFans", href: "#", icon: OnlyFansIcon, actionToast: true }
            ].map((social) => {
              const cardMarkup = (
                <Card className="h-full min-h-[72px] flex items-center justify-between px-6 group cursor-pointer">
                  <span className="font-medium text-[#FAFAFA] flex items-center gap-3">
                    <social.icon className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
                    {social.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              );

              return social.actionToast ? (
                <button 
                  key={social.label} 
                  onClick={() => setToastVisible(true)} 
                  className="block flex-1 text-left outline-none border-none bg-transparent p-0 w-full"
                >
                  {cardMarkup}
                </button>
              ) : (
                <Link key={social.label} href={social.href} className="block flex-1">
                  {cardMarkup}
                </Link>
              );
            })}
          </div>

          {/* 4. EXPERIENCE CARD */}
          <motion.div
            layout
            transition={premiumSpring}
            className="order-4 lg:order-none lg:col-span-3 bg-[#090909] border border-[#ffffff14] rounded-2xl overflow-hidden hover:bg-[#101010] transition-colors duration-200 cursor-pointer"
            onClick={() => setExpExpanded(!expExpanded)}
          >
            <motion.div layout className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">BetterMind Labs</h3>
                <p className="text-sm text-[#A1A1AA] mt-1">Product Engineer</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#A1A1AA]">
                <span>1.5 Years</span>
                <motion.div animate={{ rotate: expExpanded ? 180 : 0 }} transition={premiumSpring}>
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
            
            <AnimatePresence>
              {expExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={premiumSpring}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-[#ffffff0a] space-y-6">
                    <ul className="space-y-3 text-[14px] text-[#A1A1AA]">
                      <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5"/> Built and maintained marketing website (30–40K monthly impressions)</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5"/> Saved founder 5–6 hours/day</li>
             
                      <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5"/> Built internal CRM & AI recommendation engine</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Pill>Django</Pill><Pill>FastAPI</Pill><Pill>SQLite</Pill><Pill>JavaScript</Pill><Pill>HTML</Pill><Pill>CSS</Pill>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </section>

        {/* PRODUCTS SECTION */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium tracking-tight">Products I'm Proud Of</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <Card className="p-2 flex flex-col" noHover>
              <div className="aspect-video w-full bg-[#1A1A1A] rounded-xl overflow-hidden relative mb-4">
                <Image src="/screenshot.png" alt="Draft" fill className="object-cover" />
              </div>
              <div className="px-4 pb-4 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Draft</h3>
                    <div className="flex gap-3 text-sm text-[#A1A1AA]">
                      <a href="https://www.getdraft.xyz/" target="_blank" rel="noopener noreferrer">
                        <button className="hover:text-white transition-colors">Live</button>
                      </a>
                      
                    </div>
                  </div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">
                    AI-powered knowledge vault that transforms student experiences into personalized college application material.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Pill>React</Pill><Pill>FastAPI</Pill><Pill>SQLite</Pill><Pill>Groq</Pill>
                </div>
              </div>
            </Card>

            <Card className="p-8 flex flex-col items-center justify-center text-center border-dashed border-[#ffffff20] bg-transparent" noHover>
              <h3 className="text-xl font-medium mb-2 text-[#A1A1AA]">Your product.</h3>
              <h3 className="text-xl font-medium mb-6 text-[#A1A1AA]">Will be here.</h3>
              <p className="text-sm text-[#A1A1AA] mb-8">Let's build something together.</p>
              <a href="https://cal.com/atharvmalve/quick-discovery-call?overlayCalendar=true" target="_blank" rel="noopener noreferrer">
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={premiumSpring}
                  className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  Book a Call
                </motion.button>
              </a>
            </Card>

          </div>
        </section>

        {/* COLLABORATION SECTION */}
        <section className="pt-8 border-t border-[#ffffff14]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-xl font-medium tracking-tight mb-2">Let's collaborate.</h2>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Building something ambitious?<br/>
                Need another product engineer? Let's talk.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/918828821585" target="_blank" rel="noopener noreferrer">
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={premiumSpring}
                  className="bg-[#1A1A1A] border border-[#ffffff14] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#222] transition-colors"
                >
                  WhatsApp
                </motion.button>
              </a>
              <a href="https://cal.com/atharvmalve/quick-discovery-call?overlayCalendar=true" target="_blank" rel="noopener noreferrer">
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={premiumSpring}
                  className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  Book a Call
                </motion.button>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* PREMIUM HIGH-DENSITY DIGITAL TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={premiumSpring}
            className="fixed bottom-6 right-6 z-[100] bg-[#0c0c0c] border border-[#ffffff14] text-[#FAFAFA] px-4 py-3 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex items-center gap-3 text-xs md:text-sm font-medium backdrop-blur-md selection:bg-transparent select-none"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse shrink-0" />
            <span>not yet, need one more rejection</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}