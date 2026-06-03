"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { R, rose, lavender, cream, DISNEY_PIN, CONFIG, hasBirthdayArrived } from "../config";
import { DialogLines } from "../DialogLines";
import { track } from "../../../lib/analytics";
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
      <DialogLines lines={CONFIG.script.introDialog(hasBirthdayArrived())} onDone={onDone} />
    </motion.div>
  );
}

function InputScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [wrong, setWrong] = useState(false);

  const attempt = useCallback(
    (val: string) => {
      const lower = val.toLowerCase();
      if (lower.includes("diablo") || lower.includes("moda")) {
        track("gift_unlocked");
        onUnlock();
      } else {
        track("date_wrong", { tried: val });
        setShake(true);
        setWrong(true);
        setValue("");
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setWrong(false), 2500);
      }
    },
    [onUnlock]
  );

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
            fontSize: "clamp(1.45rem, 5vw, 1.75rem)",
            color: cream(0.9),
            lineHeight: 1.5,
            marginBottom: "1rem",
          }}
        >
          {CONFIG.script.dateInput.question}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.15rem, 4vw, 1.35rem)",
            color: cream(0.65),
            lineHeight: 1.5,
            marginBottom: "2.5rem",
          }}
        >
          {CONFIG.script.dateInput.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          <motion.div
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && value.trim()) attempt(value.trim()); }}
              placeholder="escribe tu respuesta…"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="w-full bg-transparent border-b outline-none pb-2 placeholder:opacity-30"
              style={{
                fontFamily: "var(--font-geist-sans)",
                color: wrong ? "#e88096" : cream(0.9),
                borderColor: wrong ? "rgba(232,128,150,0.5)" : rose(0.45),
                caretColor: R,
                fontSize: "1.15rem",
                letterSpacing: "0.04em",
              }}
            />
            <motion.button
              onClick={() => { if (value.trim()) attempt(value.trim()); }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: "1.5rem",
                display: "block",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: rose(0.7),
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              confirmar →
            </motion.button>
          </motion.div>

        </motion.div>
      </div>

      <AnimatePresence>
        {wrong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
            style={{ background: `rgb(20,8,14)` }}
          >
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 6vw, 2rem)",
                color: rose(0.9),
                textAlign: "center",
                padding: "0 2rem",
                lineHeight: 1.5,
              }}
            >
              {CONFIG.script.dateInput.wrongAnswer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
      <DialogLines lines={CONFIG.script.pinSuccessDialog} onDone={onDone} />
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
        track("pin_correct");
        onUnlock();
      } else {
        track("pin_wrong", { tried: val });
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
      onClick={() => document.querySelector<HTMLInputElement>("input[type=tel]")?.focus()}
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
            fontSize: "clamp(1.45rem, 5vw, 1.75rem)",
            color: cream(0.9),
            lineHeight: 1.5,
            marginBottom: "1rem",
          }}
        >
          {CONFIG.script.pinInput.question}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.15rem, 4vw, 1.35rem)",
            color: cream(0.65),
            lineHeight: 1.5,
            marginBottom: "2.5rem",
          }}
        >
          {CONFIG.script.pinInput.subtitle}
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
                  borderColor: wrong ? "rgba(232,128,150,0.7)" : rose(0.5),
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
            <span className="text-xs text-center" style={{ color: rose(0.5), fontFamily: "var(--font-geist-sans)" }}>
              toca aquí para ingresar
            </span>
          </div>

        </motion.div>
      </div>

      <AnimatePresence>
        {wrong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
            style={{ background: `rgb(20,8,14)` }}
          >
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 6vw, 2rem)",
                color: rose(0.9),
                textAlign: "center",
                padding: "0 2rem",
                lineHeight: 1.5,
              }}
            >
              {CONFIG.script.pinInput.wrongAnswer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
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
