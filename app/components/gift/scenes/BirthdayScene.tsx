"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { R, rose, lavender, cream, CONFIG } from "../config";

export function BirthdayScene({ onNext }: { onNext: () => void }) {
  const [showMessage, setShowMessage] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowMessage(true), 1400);
    const t2 = setTimeout(() => setShowHint(true), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
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
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-sm tracking-[0.55em] uppercase mb-4"
          style={{ fontFamily: "var(--font-geist-sans)", color: rose(0.5) }}
        >
          feliz cumpleaños
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-light mb-6"
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 16vw, 7rem)",
            color: R,
            lineHeight: 1.1,
            textShadow: `0 0 60px ${rose(0.4)}, 0 0 120px ${lavender(0.2)}`,
          }}
        >
          princesa
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center mb-10"
        >
          <div className="w-px h-4" style={{ background: lavender(0.3) }} />
          <span
            className="mx-4 text-sm tracking-[0.4em]"
            style={{ fontFamily: "var(--font-geist-sans)", color: lavender(0.55) }}
          >
            {CONFIG.birthdayAge} años
          </span>
          <div className="w-px h-4" style={{ background: lavender(0.3) }} />
        </motion.div>

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
