"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rose, lavender, cream, CONFIG } from "../config";

export function LetterScene({ onNext }: { onNext: () => void }) {
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
      className="fixed inset-0 flex items-center justify-center overflow-y-auto"
    >
      <div className="max-w-sm w-full" style={{ paddingLeft: "max(2rem, env(safe-area-inset-left) + 1.5rem)", paddingRight: "max(2rem, env(safe-area-inset-right) + 1.5rem)", paddingTop: "max(2rem, env(safe-area-inset-top) + 1rem)", paddingBottom: "max(2rem, env(safe-area-inset-bottom) + 1rem)" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xs tracking-[0.45em] uppercase mb-14"
          style={{ color: rose(0.28) }}
        >
          {CONFIG.date}
        </motion.p>

        <div className="mb-10 space-y-1" style={{ fontFamily: "var(--font-playfair-display)" }}>
          {lines.slice(0, visibleCount).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              style={{
                fontStyle: "italic",
                fontSize: "1.25rem",
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
              <div className="mb-1 h-px w-8" style={{ background: lavender(0.35) }} />
              <p className="text-base mb-1" style={{ fontStyle: "italic", color: rose(0.8) }}>
                {CONFIG.signature}
              </p>
              <p className="text-xs tracking-widest" style={{ color: cream(0.3) }}>
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
              className="mt-24 text-xs tracking-[0.45em] uppercase transition-all duration-700 hover:tracking-[0.6em]"
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
