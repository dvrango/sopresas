"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── EDIT THIS SECTION ────────────────────────────────────────────────────────
const CONFIG = {
  recipientName: "Sofía",
  senderName: "Tu amor",
  date: "29 de mayo, 2026",
  moments: [
    {
      roman: "I",
      title: "El primer día",
      text: "Desde que te vi, algo en el mundo cambió de forma permanente.",
    },
    {
      roman: "II",
      title: "Lo que más admiro",
      text: "Tu fuerza callada. La forma en que iluminas los cuartos sin saber que lo haces.",
    },
    {
      roman: "III",
      title: "Lo que quiero para ti",
      text: "Que cada mañana sepas que existes en los pensamientos de alguien.",
    },
  ],
  letter: [
    "Hay personas que entran a tu vida",
    "y reorganizan todo sin tocarlo.",
    "",
    "Tú eres una de esas personas.",
    "",
    "Este momento lo creé para ti,",
    "para que sepas que hay alguien",
    "que piensa en tu sonrisa",
    "cuando nadie más está mirando.",
    "",
    "Con todo lo que tengo,",
  ],
  signature: "Siempre tuyo.",
  finalLine1: "Para siempre,",
  finalLine2: "tuyo.",
};
// ──────────────────────────────────────────────────────────────────────────────

type Scene = "intro" | "name" | "moments" | "letter" | "finale";

// ─── Ambient floating particles ───────────────────────────────────────────────
type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 20 + Math.random() * 70,
        size: Math.random() * 2 + 0.8,
        duration: Math.random() * 8 + 7,
        delay: -(Math.random() * 15),
        drift: (Math.random() - 0.5) * 50,
        opacity: Math.random() * 0.35 + 0.1,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(200, 169, 110, ${p.opacity})`,
            animation: `floatUp ${p.duration}s ${p.delay}s infinite linear`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

// ─── SCENE: INTRO ─────────────────────────────────────────────────────────────
function IntroScene({ onNext }: { onNext: () => void }) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
      className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer"
      onClick={onNext}
    >
      {/* Ambient glow layer */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)",
          animation: "breathe 4s ease-in-out infinite",
        }}
      />

      {/* Outer slow ring */}
      <div
        className="absolute w-40 h-40 rounded-full border"
        style={{
          borderColor: "rgba(200,169,110,0.08)",
          animation: "slowPulseRing 4s 1s ease-out infinite",
        }}
      />

      {/* Inner ring */}
      <div
        className="absolute w-24 h-24 rounded-full border"
        style={{
          borderColor: "rgba(200,169,110,0.14)",
          animation: "pulseRing 3s ease-out infinite",
        }}
      />

      {/* Orb core */}
      <div
        className="w-5 h-5 rounded-full relative z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(240,210,150,1) 0%, rgba(200,169,110,0.8) 50%, rgba(200,169,110,0.2) 100%)",
          boxShadow:
            "0 0 20px rgba(200,169,110,0.9), 0 0 50px rgba(200,169,110,0.4), 0 0 100px rgba(200,169,110,0.15)",
          animation: "breathe 3.5s ease-in-out infinite",
        }}
      />

      {/* Tap hint */}
      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="fixed bottom-16 text-xs tracking-[0.45em] uppercase"
            style={{ color: "rgba(200,169,110,0.4)" }}
          >
            toca para comenzar
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── SCENE: NAME REVEAL ───────────────────────────────────────────────────────
type BurstParticle = { id: number; x: number; y: number; size: number };

function NameScene({ onNext }: { onNext: () => void }) {
  const letters = CONFIG.recipientName.split("");
  const [burst, setBurst] = useState(false);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);

  useEffect(() => {
    setBurstParticles(
      Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const radius = 90 + Math.random() * 80;
        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          size: Math.random() * 3 + 1,
        };
      })
    );
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setBurst(true), 1000);
    const t2 = setTimeout(() => onNext(), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center"
    >
      {/* "esto es para" label */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="text-xs tracking-[0.55em] uppercase mb-10"
        style={{
          fontFamily: "var(--font-geist-sans)",
          color: "rgba(200,169,110,0.38)",
        }}
      >
        esto es para
      </motion.p>

      {/* Name — letter by letter */}
      <div className="relative flex items-center justify-center">
        <div
          className="flex"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.7 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-light"
              style={{
                fontSize: "clamp(4rem, 12vw, 8rem)",
                letterSpacing: "0.06em",
                color: "#c8a96e",
                display: "inline-block",
              }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          ))}
        </div>

        {/* Burst particles */}
        {burst &&
          burstParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
              transition={{ duration: 1.8, ease: [0.2, 0.8, 0.4, 1] }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                background: "#c8a96e",
              }}
            />
          ))}
      </div>
    </motion.div>
  );
}

// ─── SCENE: THREE MOMENTS ─────────────────────────────────────────────────────
function MomentsScene({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    if (index < CONFIG.moments.length - 1) {
      setIndex((i) => i + 1);
    } else {
      onNext();
    }
  }, [index, onNext]);

  const m = CONFIG.moments[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10 cursor-pointer"
      onClick={advance}
    >
      {/* Subtle ambient glow */}
      <div
        className="fixed w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24, transition: { duration: 0.5 } }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg w-full relative"
        >
          {/* Roman numeral */}
          <p
            className="text-xs tracking-[0.6em] uppercase mb-10"
            style={{
              fontFamily: "var(--font-playfair-display)",
              color: "rgba(200,169,110,0.45)",
            }}
          >
            {m.roman}
          </p>

          {/* Title */}
          <h2
            className="text-xl font-light mb-8 tracking-wide"
            style={{
              fontFamily: "var(--font-playfair-display)",
              color: "rgba(242,232,217,0.45)",
            }}
          >
            {m.title}
          </h2>

          {/* Quote */}
          <p
            className="font-light leading-relaxed"
            style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "rgba(242,232,217,0.92)",
              lineHeight: 1.5,
            }}
          >
            &ldquo;{m.text}&rdquo;
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="fixed bottom-14 flex gap-3 items-center">
        {CONFIG.moments.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-700"
            style={{
              width: i === index ? 16 : 4,
              height: 4,
              background:
                i === index
                  ? "rgba(200,169,110,0.75)"
                  : "rgba(200,169,110,0.2)",
            }}
          />
        ))}
      </div>

      {/* Tap hint */}
      <motion.p
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="fixed bottom-6 text-xs tracking-[0.35em] uppercase"
        style={{ color: "rgba(200,169,110,0.3)" }}
      >
        {index < CONFIG.moments.length - 1 ? "toca para continuar" : "toca para leer"}
      </motion.p>
    </motion.div>
  );
}

// ─── SCENE: THE LETTER ────────────────────────────────────────────────────────
function LetterScene({ onNext }: { onNext: () => void }) {
  const lines = CONFIG.letter;
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSignature, setShowSignature] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const pace = 680;

    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * pace + 600));
    });

    const end = lines.length * pace;
    timers.push(setTimeout(() => setShowSignature(true), end + 400));
    timers.push(setTimeout(() => setShowButton(true), end + 1600));

    return () => timers.forEach(clearTimeout);
  }, [lines.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 flex items-start justify-center overflow-y-auto"
    >
      <div className="max-w-sm w-full px-8 py-20">
        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xs tracking-[0.45em] uppercase mb-14"
          style={{ color: "rgba(200,169,110,0.28)" }}
        >
          {CONFIG.date}
        </motion.p>

        {/* Letter lines */}
        <div
          className="mb-10 space-y-1"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          {lines.slice(0, visibleCount).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              style={{
                fontStyle: "italic",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color:
                  line === "" ? "transparent" : "rgba(242,232,217,0.82)",
                userSelect: "none",
                minHeight: line === "" ? "0.9rem" : undefined,
              }}
            >
              {line === "" ? " " : line}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <AnimatePresence>
          {showSignature && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              <div
                className="mb-1 h-px w-8"
                style={{ background: "rgba(200,169,110,0.3)" }}
              />
              <p
                className="text-base mb-1"
                style={{
                  fontStyle: "italic",
                  color: "rgba(200,169,110,0.8)",
                }}
              >
                {CONFIG.signature}
              </p>
              <p
                className="text-xs tracking-widest"
                style={{ color: "rgba(242,232,217,0.3)" }}
              >
                {CONFIG.senderName}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              onClick={onNext}
              className="mt-16 text-xs tracking-[0.45em] uppercase transition-all duration-700 hover:tracking-[0.6em]"
              style={{ color: "rgba(200,169,110,0.35)" }}
            >
              continuar →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── SCENE: FINALE ────────────────────────────────────────────────────────────
type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function FinaleScene({ onRestart }: { onRestart: () => void }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.25,
      }))
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 flex flex-col items-center justify-center"
    >
      {/* Star field */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, s.opacity, s.opacity * 0.6, s.opacity], scale: 1 }}
            transition={{
              delay: s.delay,
              duration: s.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: `rgba(200,169,110,1)`,
            }}
          />
        ))}
      </div>

      {/* Central orb + text */}
      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-20"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: "#c8a96e",
              boxShadow:
                "0 0 18px rgba(200,169,110,1), 0 0 50px rgba(200,169,110,0.5), 0 0 120px rgba(200,169,110,0.2)",
              animation: "breathe 2.5s ease-in-out infinite",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.6 }}
          className="font-light"
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(2.2rem, 8vw, 5rem)",
            color: "rgba(242,232,217,0.88)",
            lineHeight: 1.15,
          }}
        >
          {CONFIG.finalLine1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1.6 }}
          className="font-light mb-20"
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(2.2rem, 8vw, 5rem)",
            color: "#c8a96e",
            lineHeight: 1.15,
          }}
        >
          {CONFIG.finalLine2}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 1.4 }}
          onClick={onRestart}
          className="text-xs tracking-[0.45em] uppercase transition-all duration-700 hover:tracking-[0.6em]"
          style={{ color: "rgba(200,169,110,0.25)" }}
        >
          volver al inicio
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function GiftExperience() {
  const [scene, setScene] = useState<Scene>("intro");

  const goTo = useCallback((s: Scene) => setScene(s), []);

  return (
    <div
      className="fixed inset-0 select-none"
      style={{ background: "#080808" }}
    >
      <AmbientParticles />

      <AnimatePresence mode="wait">
        {scene === "intro" && (
          <IntroScene key="intro" onNext={() => goTo("name")} />
        )}
        {scene === "name" && (
          <NameScene key="name" onNext={() => goTo("moments")} />
        )}
        {scene === "moments" && (
          <MomentsScene key="moments" onNext={() => goTo("letter")} />
        )}
        {scene === "letter" && (
          <LetterScene key="letter" onNext={() => goTo("finale")} />
        )}
        {scene === "finale" && (
          <FinaleScene key="finale" onRestart={() => goTo("intro")} />
        )}
      </AnimatePresence>
    </div>
  );
}
