"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { R, rose, lavender, cream, PASSWORD, DISNEY_PIN } from "../config";
import { DialogLines } from "../DialogLines";

const DIALOG_LINES = [
  { text: "oye…", delay: 600 },
  { text: "hay algo aquí para ti.", delay: 1800 },
  { text: "pero espera un momento.", delay: 3400, suspense: true },
  { text: "antes necesito saber que realmente eres tú.", delay: 5000, resetBefore: true },
  { text: "porque imaginate que lo abre otra persona.", delay: 6600 },
  { text: "pues nooo", delay: 8200 },
];
function DialogScreen({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      key="dialog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
    >
      <DialogLines lines={DIALOG_LINES} onDone={onDone} />
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

  const attempt = useCallback(
    (d: string, m: string, y: string) => {
      const val = d.padStart(2, "0") + m.padStart(2, "0") + y;
      if (val === PASSWORD) {
        onUnlock();
      } else {
        setShake(true);
        setWrong(true);
        setDd("");
        setMm("");
        setYyyy("");
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setWrong(false), 2500);
      }
    },
    [onUnlock]
  );

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

  const fieldStyle = (isWrong: boolean) => ({
    fontFamily: "var(--font-geist-sans)",
    color: isWrong ? "#e88096" : cream(0.9),
    borderColor: isWrong ? "rgba(232,128,150,0.5)" : rose(0.2),
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
          La pregunta del millon es...
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

const PIN_SUCCESS_LINES = [
  { text: "muy bieeen…", delay: 400 },
  { text: "difícil de adivinar eeh por cierto.", delay: 3200 },
  { text: "a ver, pero esa estuvo fácil.", delay: 5200 },
  { text: "aquí va una más.", delay: 7000 },
];

function PinSuccessScreen({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      key="pinsuccess"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
    >
      <DialogLines lines={PIN_SUCCESS_LINES} onDone={onDone} />
    </motion.div>
  );
}

function PinScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [wrong, setWrong] = useState(false);

  const attempt = useCallback(
    (val: string) => {
      if (val === DISNEY_PIN) {
        onUnlock();
      } else {
        setShake(true);
        setWrong(true);
        setPin("");
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setWrong(false), 2500);
      }
    },
    [onUnlock]
  );

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
            className="mt-2 flex items-center justify-center"
            style={{ cursor: "pointer", padding: "1rem 2rem" }}
            onClick={() => {
              const inp = document.querySelector<HTMLInputElement>("input[type=tel]");
              inp?.focus();
            }}
          >
            <span className="text-xs text-center" style={{ color: rose(0.2), fontFamily: "var(--font-geist-sans)" }}>
              toca aquí para escribir
            </span>
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

export function PasswordScene({ onUnlock }: { onUnlock: () => void }) {
  const [phase, setPhase] = useState<"dialog" | "pin" | "pinsuccess" | "input">("dialog");

  return (
    <AnimatePresence mode="wait">
      {phase === "dialog" && <DialogScreen key="dialog" onDone={() => setPhase("pin")} />}
      {phase === "pin" && <PinScreen key="pin" onUnlock={() => setPhase("pinsuccess")} />}
      {phase === "pinsuccess" && <PinSuccessScreen key="pinsuccess" onDone={() => setPhase("input")} />}
      {phase === "input" && <InputScreen key="input" onUnlock={onUnlock} />}
    </AnimatePresence>
  );
}
