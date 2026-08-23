import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";
import { Download, Mail, ArrowDown, Code2, Smartphone, Cpu, Layers, AppWindow, Database } from "lucide-react";

// Web Audio API hooks for "Premium Glassy" UI Sounds
const useUISounds = () => {
  const playHover = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.04);
      gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) { }
  };

  const playClick = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) { }
  };

  return { playHover, playClick };
};

// Cyber Scramble Hook
const chars = "!<>-_\\\\/[]{}—=+*^?#_0101";
const useScramble = (text: string) => {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return displayText;
};

// Animated Number Counter Component
const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;
    if (node && isInView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <span ref={nodeRef} />;
};

// Abstract Floating Tech Particles
const FloatingParticles = () => {
  const icons = [Code2, Smartphone, Cpu, Layers, AppWindow, Database];
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05] dark:opacity-20 transition-opacity duration-300">
      {icons.map((Icon, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.1,
            scale: 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.1, 0.5, 0.1],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Icon className="w-16 h-16 text-cyan-600 dark:text-cyan-500 blur-[2px]" />
        </motion.div>
      ))}
    </div>
  );
};

export const Hero = () => {
  const { playHover, playClick } = useUISounds();

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Typographic Role Scrambler
  const roles = [
    "SENIOR FLUTTER DEVELOPER",
    "MOBILE APP ENGINEER",
    "ARCHITECT & INNOVATOR",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 4000);
    return () => clearInterval(id);
  }, []);
  const currentRole = roles[roleIndex];
  const scrambledRole = useScramble(currentRole);

  const stats = [
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 15, suffix: "%", label: "Performance Boost" },
    { value: 40, suffix: "%", label: "Code Reduction" },
  ];

  const downloadResume = () => {
    playClick();
    const link = document.createElement("a");
    link.href = "/SURAJ_S_PILLAI_Resume.pdf";
    link.download = "Suraj_S_Pillai_Flutter_Developer_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    playClick();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-background pt-16 perspective-1000 transition-colors duration-300"
    >
      {/* Dynamic Radar/Gradient Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-[120vw] h-[120vw] absolute opacity-[0.15] dark:opacity-30"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0, 242, 254, 0.1) 180deg, transparent 360deg)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)] transition-colors duration-300" />
      </div>

      <FloatingParticles />

      {/* 3D Tilted Interactive Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="container px-4 mx-auto max-w-7xl relative z-10 flex flex-col items-center justify-center space-y-8"
      >
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, translateZ: 50 }}
          animate={{ opacity: 1, y: 0, translateZ: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transform: "translateZ(80px)" }}
          className="px-6 py-2 rounded-full border border-cyan-500/20 dark:border-cyan-500/30 bg-cyan-50/50 dark:bg-cyan-950/20 backdrop-blur-md flex items-center gap-3 shadow-[0_0_20px_rgba(0,242,254,0.1)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
          <span className="text-sm font-mono tracking-widest text-cyan-800 dark:text-cyan-100 uppercase">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Massive Split Typography Name */}
        <div style={{ transform: "translateZ(120px)" }} className="relative text-center w-full">
          {/* Back Glowing Layer */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase leading-none text-transparent blur-[8px] absolute inset-0 flex items-center justify-center"
            style={{ WebkitTextStroke: "4px rgba(0, 242, 254, 0.6)" }}
          >
            SURAJ S PILLAI
          </motion.h1>

          {/* Front Crisp Layer */}
          <motion.h1
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase leading-none text-slate-800 dark:text-white relative z-10 transition-colors duration-300"
            style={{ textShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
          >
            SURAJ S PILLAI
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className="h-[2px] w-3/4 md:w-1/2 bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent mx-auto mt-6 shadow-[0_0_15px_rgba(0,242,254,0.8)]"
          />
        </div>

        {/* Cyber Scramble Role */}
        <motion.div
          style={{ transform: "translateZ(90px)" }}
          className="h-10 md:h-14 flex items-center justify-center"
        >
          <h2 className="text-xl md:text-3xl font-mono text-cyan-700 dark:text-cyan-300 font-bold tracking-[0.2em] transition-colors duration-300">
            &gt; {scrambledRole} <span className="animate-pulse opacity-50">_</span>
          </h2>
        </motion.div>

        {/* Sleek Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ transform: "translateZ(60px)" }}
          className="max-w-2xl text-center p-8 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.05] backdrop-blur-xl shadow-2xl relative overflow-hidden group transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-inter relative z-10 transition-colors duration-300">
            Accomplished Flutter Developer with <span className="text-foreground font-bold">3+ years</span> of experience in the complete mobile development lifecycle.
            Mastery in <span className="text-cyan-600 dark:text-cyan-400 font-mono">Dart</span>,
            <span className="text-blue-600 dark:text-blue-400 font-mono"> Riverpod</span>, and <span className="text-indigo-600 dark:text-indigo-400 font-mono">BLoC</span>.
            Engineering zero-latency mobile solutions from ideation to scaled production.
            <br />
            <span className="text-sm text-foreground/50 mt-4 block font-mono">
              // LOCATION: Alappuzha, Kerala, India [ 9.4981° N, 76.3388° E ]
            </span>
          </p>
        </motion.div>

        {/* Action Dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ transform: "translateZ(100px)" }}
          className="flex flex-col sm:flex-row gap-6 mt-8"
        >
          {/* Primary Action */}
          <button
            onClick={() => scrollToSection("#projects")}
            onMouseEnter={playHover}
            className="group relative isolate flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-cyan-100/50 dark:bg-cyan-950/70 border-2 border-cyan-500/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:shadow-[0_0_30px_rgba(0,242,254,0.4)]"
          >
            <div className="absolute inset-0 bg-cyan-400 w-0 group-hover:w-full transition-all duration-500 z-0 ease-out" />
            <Code2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-950 relative z-10 transition-colors duration-300" />
            <span className="font-mono font-bold tracking-widest text-cyan-900 dark:text-cyan-100 group-hover:text-cyan-950 relative z-10 transition-colors duration-300">
              INITIATE_PROJECTS
            </span>
          </button>

          {/* Secondary Actions with Text */}
          <div className="flex gap-4">
            <button
              onClick={downloadResume}
              onMouseEnter={playHover}
              className="group relative isolate flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-foreground/10 dark:border-gray-700 bg-foreground/5 dark:bg-gray-900/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              title="Download Resume"
            >
              <div className="absolute inset-0 bg-green-400 dark:bg-green-500 w-0 group-hover:w-full transition-all duration-500 z-0 ease-out" />
              <Download className="w-5 h-5 text-muted-foreground group-hover:text-green-950 relative z-10 transition-colors" />
              <span className="font-mono font-bold text-sm tracking-widest text-muted-foreground group-hover:text-green-950 relative z-10 transition-colors duration-300 uppercase">
                RESUME
              </span>
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              onMouseEnter={playHover}
              className="group relative isolate flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-foreground/10 dark:border-gray-700 bg-foreground/5 dark:bg-gray-900/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              title="Transmit Message"
            >
              <div className="absolute inset-0 bg-purple-400 dark:bg-purple-500 w-0 group-hover:w-full transition-all duration-500 z-0 ease-out" />
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-purple-950 relative z-10 transition-colors" />
              <span className="font-mono font-bold text-sm tracking-widest text-muted-foreground group-hover:text-purple-950 relative z-10 transition-colors duration-300 uppercase whitespace-nowrap">
                LET'S CONNECT
              </span>
            </button>
          </div>
        </motion.div>

        {/* Premium Animated Stats Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ transform: "translateZ(80px)" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 w-full"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              onMouseEnter={playHover}
              className="group relative p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.05] backdrop-blur-md hover:bg-foreground/[0.05] transition-colors duration-500 overflow-hidden flex flex-col items-center justify-center text-center"
            >
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-cyan-600 dark:text-cyan-400 drop-shadow-md">
                <AnimatedCounter from={0} to={stat.value} />
                <span>{stat.suffix}</span>
              </div>

              <div className="text-sm font-medium text-muted-foreground/80 group-hover:text-foreground transition-colors duration-300 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ transform: "translateZ(40px)" }}
          className="mt-8 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection("#experience")}
          onMouseEnter={playHover}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/50 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors duration-300">
            Scroll Down
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-500 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [-20, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-4 bg-foreground/50 filter blur-[2px]"
            />
          </div>
          <ArrowDown className="w-4 h-4 text-cyan-600/50 dark:text-cyan-500/50 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};
