"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rose, lavender, cream, CONFIG } from "../config";
import { Fireworks } from "../Fireworks";

const LINES = CONFIG.script.birthdayArrivalDialog;

export function BirthdayArrivalScene({ onNext, onStartMusic }: { onNext: () => void; onStartMusic?: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    );
    const lastDelay = LINES[LINES.length - 1].delay + 2400;
    const hintTimer = setTimeout(() => setShowHint(true), lastDelay);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hintTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
      onClick={() => { onStartMusic?.(); if (showHint) onNext(); }}
    >
      <Fireworks />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: 520,
          maxHeight: 520,
          background: `radial-gradient(circle, ${rose(0.09)} 0%, ${lavender(0.05)} 40%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 w-full max-w-xs">
        {LINES.map((line, i) => (
          <AnimatePresence key={i}>
            {visibleCount > i && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  fontStyle: "italic",
                  fontSize: line.suspense
                    ? "clamp(1.6rem, 5vw, 2rem)"
                    : "clamp(1.4rem, 4.5vw, 1.75rem)",
                  color:
                    i === 0
                      ? cream(0.65)
                      : line.suspense
                      ? cream(1)
                      : i >= 4
                      ? cream(0.92)
                      : cream(0.5),
                  lineHeight: 1.7,
                  marginBottom: "0.15rem",
                  ...(line.suspense && {
                    filter: `drop-shadow(0 0 10px ${rose(0.5)})`,
                  }),
                }}
              >
                {line.text}
              </motion.p>
            )}
          </AnimatePresence>
        ))}

        <AnimatePresence>
          {showHint && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4 }}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase" as const,
                color: rose(0.7),
                marginTop: "2.5rem",
              }}
            >
              toca para continuar
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
