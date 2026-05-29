"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PHOTOS = [
  "/photos/IMG_8990.jpg",
  "/photos/IMG_9441.jpg",
  "/photos/IMG_9467.jpg",
  "/photos/IMG_9453.jpg",
  "/photos/IMG_9233.jpg",
];

// ─── EDIT THIS SECTION ────────────────────────────────────────────────────────
const CONFIG = {
  recipientName: "Sofía",
  senderName: "Tu amor",
  date: "29 de mayo, 2026",
  birthdayAge: "21",
  birthdayMessage:
    "espero que recuerdes este día durante el resto de tu vida, diviértete como una niña, y disfrútalo como una reina",
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
  finalLine2: "tuya.",
};
// ──────────────────────────────────────────────────────────────────────────────

// Color constants
const R = "#e896b0"; // primary rose
const rose = (a: number) => `rgba(232,150,176,${a})`;
const lavender = (a: number) => `rgba(200,160,212,${a})`;
const cream = (a: number) => `rgba(248,236,242,${a})`;

const PASSWORD = "17032026";
const DISNEY_PIN = "0000";

type Scene = "password" | "intro" | "name" | "birthday" | "photos" | "moments" | "letter" | "finale";

// ─── SCENE: PASSWORD ──────────────────────────────────────────────────────────
const DIALOG_LINES = [
  { text: "oye…", delay: 600 },
  { text: "hay algo aquí para ti.", delay: 1800 },
  { text: "pero espera un momento.", delay: 3400 },
  { text: "antes necesito saber que eres tú.", delay: 5000 },
];
const SWITCH_DELAY = 6600;

function DialogScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    DIALOG_LINES.forEach((l, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), l.delay));
    });
    timers.push(setTimeout(onDone, SWITCH_DELAY));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      key="dialog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
    >
      <div className="w-full max-w-xs space-y-4">
        {DIALOG_LINES.slice(0, visibleLines).map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
              color: i < visibleLines - 1 ? cream(0.35) : cream(0.85),
              lineHeight: 1.5,
            }}
          >
            {l.text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

function InputScreen({ onUnlock }: { onUnlock: () => void }) {
  const [dd, setDd] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [shake, setShake] = useState(false);
  const [wrong, setWrong] = useState(false);

  const refMm = React.useRef<HTMLInputElement>(null);
  const refYyyy = React.useRef<HTMLInputElement>(null);

  const attempt = useCallback((d: string, m: string, y: string) => {
    const val = d.padStart(2, "0") + m.padStart(2, "0") + y;
    if (val === PASSWORD) {
      onUnlock();
    } else {
      setShake(true);
      setWrong(true);
      setDd(""); setMm(""); setYyyy("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setWrong(false), 2500);
    }
  }, [onUnlock]);

  const handleDd = (v: string) => {
    const n = v.replace(/\D/g, "").slice(0, 2);
    setDd(n);
    if (n.length === 2) refMm.current?.focus();
  };

  const handleMm = (v: string) => {
    const n = v.replace(/\D/g, "").slice(0, 2);
    setMm(n);
    if (n.length === 2) refYyyy.current?.focus();
  };

  const handleYyyy = (v: string) => {
    const n = v.replace(/\D/g, "").slice(0, 4);
    setYyyy(n);
    if (n.length === 4) attempt(dd, mm, n);
  };

  const fieldStyle = (wrong: boolean) => ({
    fontFamily: "var(--font-geist-sans)",
    color: wrong ? "#e88096" : cream(0.9),
    borderColor: wrong ? "rgba(232,128,150,0.5)" : rose(0.2),
    caretColor: R,
    fontSize: "1.4rem",
    letterSpacing: "0.15em",
  });

  const labelStyle = {
    fontFamily: "var(--font-geist-sans)",
    color: rose(0.3),
    fontSize: "0.6rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase" as const,
    marginTop: "0.5rem",
  };

  return (
    <motion.div
      key="input"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
    >
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${rose(0.05)} 0%, transparent 70%)`,
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 w-full max-w-xs">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
            color: cream(0.72),
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          y una última cosa…
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            color: cream(0.35),
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          ¿cuándo fue nuestro primer día?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          <motion.div
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-end gap-4"
          >
            {/* Día */}
            <div className="flex flex-col items-center flex-1">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={dd}
                onChange={(e) => handleDd(e.target.value)}
                placeholder="17"
                autoFocus
                className="w-full text-center bg-transparent border-b outline-none pb-2 placeholder:opacity-20"
                style={fieldStyle(wrong)}
              />
              <span style={labelStyle}>día</span>
            </div>

            <span style={{ color: rose(0.2), fontSize: "1.2rem", paddingBottom: "1.6rem" }}>/</span>

            {/* Mes */}
            <div className="flex flex-col items-center flex-1">
              <input
                ref={refMm}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={mm}
                onChange={(e) => handleMm(e.target.value)}
                placeholder="03"
                className="w-full text-center bg-transparent border-b outline-none pb-2 placeholder:opacity-20"
                style={fieldStyle(wrong)}
              />
              <span style={labelStyle}>mes</span>
            </div>

            <span style={{ color: rose(0.2), fontSize: "1.2rem", paddingBottom: "1.6rem" }}>/</span>

            {/* Año */}
            <div className="flex flex-col items-center" style={{ flex: 1.8 }}>
              <input
                ref={refYyyy}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={yyyy}
                onChange={(e) => handleYyyy(e.target.value)}
                placeholder="2026"
                className="w-full text-center bg-transparent border-b outline-none pb-2 placeholder:opacity-20"
                style={fieldStyle(wrong)}
              />
              <span style={labelStyle}>año</span>
            </div>
          </motion.div>

          <AnimatePresence>
            {wrong && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 text-xs text-center"
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  fontStyle: "italic",
                  color: "rgba(232,128,150,0.65)",
                }}
              >
                ¿¿cómo que no sabes?? ♡
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function PinScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [wrong, setWrong] = useState(false);

  const attempt = useCallback((val: string) => {
    if (val === DISNEY_PIN) {
      onUnlock();
    } else {
      setShake(true);
      setWrong(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setWrong(false), 2500);
    }
  }, [onUnlock]);

  const handleChange = (v: string) => {
    const n = v.replace(/\D/g, "").slice(0, 4);
    setPin(n);
    if (n.length === 4) attempt(n);
  };

  return (
    <motion.div
      key="pin"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
    >
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${lavender(0.05)} 0%, transparent 70%)`,
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 w-full max-w-xs">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
            color: cream(0.72),
            lineHeight: 1.6,
            marginBottom: "0.75rem",
          }}
        >
          primero, una pregunta…
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            color: cream(0.35),
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          ¿cuál es tu pin de Disney+?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9 }}
        >
          <motion.div
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center gap-4"
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border flex items-center justify-center"
                style={{
                  borderColor: wrong ? "rgba(232,128,150,0.4)" : rose(0.18),
                  background: pin.length > i ? rose(0.25) : "transparent",
                  transition: "background 0.2s",
                }}
              >
                {pin.length > i && (
                  <div className="w-2 h-2 rounded-full" style={{ background: R }} />
                )}
              </div>
            ))}
          </motion.div>

          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={(e) => handleChange(e.target.value)}
            autoFocus
            className="absolute opacity-0 pointer-events-none w-0 h-0"
            aria-hidden
          />

          <div
            className="mt-4 text-center text-xs"
            style={{ color: rose(0.2), fontFamily: "var(--font-geist-sans)", cursor: "pointer" }}
            onClick={() => {
              const inp = document.querySelector<HTMLInputElement>("input[type=tel]");
              inp?.focus();
            }}
          >
            toca aquí para escribir
          </div>

          <AnimatePresence>
            {wrong && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 text-xs text-center"
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  fontStyle: "italic",
                  color: "rgba(232,128,150,0.65)",
                }}
              >
                ¿¿cómo que no sabes?? ♡
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function PasswordScene({ onUnlock }: { onUnlock: () => void }) {
  const [phase, setPhase] = useState<"dialog" | "pin" | "input">("dialog");

  return (
    <AnimatePresence mode="wait">
      {phase === "dialog" && <DialogScreen key="dialog" onDone={() => setPhase("pin")} />}
      {phase === "pin" && <PinScreen key="pin" onUnlock={() => setPhase("input")} />}
      {phase === "input" && <InputScreen key="input" onUnlock={onUnlock} />}
    </AnimatePresence>
  );
}

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
  isLavender: boolean;
};

function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 20 + Math.random() * 70,
        size: Math.random() * 2.2 + 0.8,
        duration: Math.random() * 8 + 7,
        delay: -(Math.random() * 15),
        drift: (Math.random() - 0.5) * 50,
        opacity: Math.random() * 0.35 + 0.1,
        isLavender: Math.random() > 0.6,
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
            background: p.isLavender
              ? lavender(p.opacity)
              : rose(p.opacity),
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
      {/* Ambient glow */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${rose(0.07)} 0%, transparent 70%)`,
          animation: "breathe 4s ease-in-out infinite",
        }}
      />

      {/* Outer pulse ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: 140,
          height: 140,
          borderColor: rose(0.07),
          animation: "slowPulseRing 4s 1s ease-out infinite",
        }}
      />

      {/* Inner pulse ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: 90,
          height: 90,
          borderColor: lavender(0.12),
          animation: "pulseRing 3s ease-out infinite",
        }}
      />

      {/* Heart core */}
      <div
        className="relative z-10"
        style={{
          animation: "breathe 3.5s ease-in-out infinite",
          filter: `drop-shadow(0 0 12px ${rose(0.9)}) drop-shadow(0 0 30px ${rose(0.5)}) drop-shadow(0 0 60px ${lavender(0.3)})`,
        }}
      >
        <svg
          width="38"
          height="34"
          viewBox="0 0 38 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 32C19 32 2 21.5 2 10.5C2 5.8 5.8 2 10.5 2C13.8 2 16.7 3.8 19 6.5C21.3 3.8 24.2 2 27.5 2C32.2 2 36 5.8 36 10.5C36 21.5 19 32 19 32Z"
            fill={R}
          />
        </svg>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="fixed bottom-16 text-xs tracking-[0.45em] uppercase"
            style={{ color: rose(0.4) }}
          >
            toca para comenzar
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── SCENE: NAME REVEAL ───────────────────────────────────────────────────────
type BurstParticle = { id: number; x: number; y: number; size: number; isLavender: boolean };

function NameScene({ onNext }: { onNext: () => void }) {
  const letters = CONFIG.recipientName.split("");
  const [burst, setBurst] = useState(false);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);

  useEffect(() => {
    setBurstParticles(
      Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * Math.PI * 2;
        const radius = 90 + Math.random() * 80;
        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          size: Math.random() * 3 + 1,
          isLavender: Math.random() > 0.5,
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
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="text-xs tracking-[0.55em] uppercase mb-10"
        style={{
          fontFamily: "var(--font-geist-sans)",
          color: rose(0.38),
        }}
      >
        esto es para
      </motion.p>

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
                color: R,
                display: "inline-block",
              }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          ))}
        </div>

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
                background: p.isLavender ? "#c8a0d4" : R,
              }}
            />
          ))}
      </div>
    </motion.div>
  );
}

// ─── SCENE: BIRTHDAY MESSAGE ──────────────────────────────────────────────────
function BirthdayScene({ onNext }: { onNext: () => void }) {
  const [showMessage, setShowMessage] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowMessage(true), 1400);
    const t2 = setTimeout(() => setShowHint(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10 cursor-pointer"
      onClick={onNext}
    >
      {/* Glow backdrop */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 500,
          maxHeight: 500,
          background: `radial-gradient(circle, ${rose(0.06)} 0%, ${lavender(0.04)} 40%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 text-center max-w-md">
        {/* "Feliz cumpleaños" */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-sm tracking-[0.55em] uppercase mb-4"
          style={{
            fontFamily: "var(--font-geist-sans)",
            color: rose(0.5),
          }}
        >
          feliz cumpleaños
        </motion.p>

        {/* "princesa" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-light mb-6"
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(3.5rem, 14vw, 7rem)",
            color: R,
            lineHeight: 1.1,
            textShadow: `0 0 60px ${rose(0.4)}, 0 0 120px ${lavender(0.2)}`,
          }}
        >
          princesa
        </motion.h1>

        {/* Age badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center mb-10"
        >
          <div
            className="w-px h-4"
            style={{ background: lavender(0.3) }}
          />
          <span
            className="mx-4 text-sm tracking-[0.4em]"
            style={{
              fontFamily: "var(--font-geist-sans)",
              color: lavender(0.55),
            }}
          >
            {CONFIG.birthdayAge} años
          </span>
          <div
            className="w-px h-4"
            style={{ background: lavender(0.3) }}
          />
        </motion.div>

        {/* Birthday message */}
        <AnimatePresence>
          {showMessage && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 3.2vw, 1.2rem)",
                lineHeight: 1.8,
                color: cream(0.72),
              }}
            >
              {CONFIG.birthdayMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Tap hint */}
      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="fixed bottom-16 text-xs tracking-[0.45em] uppercase"
            style={{ color: rose(0.35) }}
          >
            toca para continuar
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── SCENE: PHOTOS ────────────────────────────────────────────────────────────
function PhotosScene({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    if (index < PHOTOS.length - 1) {
      setIndex((i) => i + 1);
    } else {
      onNext();
    }
  }, [index, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 cursor-pointer"
      onClick={advance}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 14, ease: "linear" }}
          >
            <Image src={PHOTOS[index]} alt="" fill className="object-cover" priority />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,8,0.45) 100%)" }} />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(10,6,8,0.45) 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(10,6,8,0.8) 0%, transparent 100%)" }} />

      <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-2.5 pointer-events-none">
        {PHOTOS.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-700" style={{ width: i === index ? 18 : 4, height: 4, background: i === index ? rose(0.85) : rose(0.25) }} />
        ))}
      </div>

      <motion.p
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-6 left-0 right-0 text-center text-xs tracking-[0.35em] uppercase pointer-events-none"
        style={{ color: rose(0.45) }}
      >
        {index < PHOTOS.length - 1 ? "toca para ver más" : "toca para continuar"}
      </motion.p>
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
      <div
        className="fixed w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${rose(0.04)} 0%, transparent 70%)`,
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
          <p
            className="text-xs tracking-[0.6em] uppercase mb-10"
            style={{
              fontFamily: "var(--font-playfair-display)",
              color: lavender(0.5),
            }}
          >
            {m.roman}
          </p>

          <h2
            className="text-xl font-light mb-8 tracking-wide"
            style={{
              fontFamily: "var(--font-playfair-display)",
              color: cream(0.45),
            }}
          >
            {m.title}
          </h2>

          <p
            className="font-light leading-relaxed"
            style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: cream(0.92),
              lineHeight: 1.5,
            }}
          >
            &ldquo;{m.text}&rdquo;
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-14 flex gap-3 items-center">
        {CONFIG.moments.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-700"
            style={{
              width: i === index ? 16 : 4,
              height: 4,
              background:
                i === index ? rose(0.75) : rose(0.2),
            }}
          />
        ))}
      </div>

      <motion.p
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="fixed bottom-6 text-xs tracking-[0.35em] uppercase"
        style={{ color: rose(0.3) }}
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xs tracking-[0.45em] uppercase mb-14"
          style={{ color: rose(0.28) }}
        >
          {CONFIG.date}
        </motion.p>

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
                color: line === "" ? "transparent" : cream(0.82),
                userSelect: "none",
                minHeight: line === "" ? "0.9rem" : undefined,
              }}
            >
              {line === "" ? " " : line}
            </motion.p>
          ))}
        </div>

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
                style={{ background: lavender(0.35) }}
              />
              <p
                className="text-base mb-1"
                style={{ fontStyle: "italic", color: rose(0.8) }}
              >
                {CONFIG.signature}
              </p>
              <p
                className="text-xs tracking-widest"
                style={{ color: cream(0.3) }}
              >
                {CONFIG.senderName}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              onClick={onNext}
              className="mt-16 text-xs tracking-[0.45em] uppercase transition-all duration-700 hover:tracking-[0.6em]"
              style={{ color: rose(0.35) }}
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
  isLavender: boolean;
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
        isLavender: Math.random() > 0.55,
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
              background: s.isLavender ? "#c8a0d4" : R,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-20"
        >
          <div
            style={{
              animation: "breathe 2.5s ease-in-out infinite",
              filter: `drop-shadow(0 0 10px ${rose(1)}) drop-shadow(0 0 30px ${rose(0.5)}) drop-shadow(0 0 70px ${lavender(0.3)})`,
            }}
          >
            <svg width="22" height="20" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 32C19 32 2 21.5 2 10.5C2 5.8 5.8 2 10.5 2C13.8 2 16.7 3.8 19 6.5C21.3 3.8 24.2 2 27.5 2C32.2 2 36 5.8 36 10.5C36 21.5 19 32 19 32Z" fill={R} />
            </svg>
          </div>
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
            color: cream(0.88),
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
            color: R,
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
          style={{ color: rose(0.25) }}
        >
          volver al inicio
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function GiftExperience() {
  const [scene, setScene] = useState<Scene>("password");

  const goTo = useCallback((s: Scene) => setScene(s), []);

  return (
    <div
      className="fixed inset-0 select-none"
      style={{ background: "#0a0608" }}
    >
      <AmbientParticles />

      <AnimatePresence mode="wait">
        {scene === "password" && (
          <PasswordScene key="password" onUnlock={() => goTo("intro")} />
        )}
        {scene === "intro" && (
          <IntroScene key="intro" onNext={() => goTo("name")} />
        )}
        {scene === "name" && (
          <NameScene key="name" onNext={() => goTo("birthday")} />
        )}
        {scene === "birthday" && (
          <BirthdayScene key="birthday" onNext={() => goTo("photos")} />
        )}
        {scene === "photos" && (
          <PhotosScene key="photos" onNext={() => goTo("moments")} />
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
