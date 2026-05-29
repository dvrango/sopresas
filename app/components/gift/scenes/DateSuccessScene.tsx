"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { R, rose, lavender, cream, CONFIG } from "../config";

export function DateSuccessScene({ onNext, onStart }: { onNext: () => void; onStart?: () => void }) {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: 560,
          maxHeight: 560,
          background: `radial-gradient(circle, ${rose(0.08)} 0%, ${lavender(0.05)} 40%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 text-center max-w-sm">
        <motion.h1
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(3rem, 18vw, 7rem)",
            color: R,
            lineHeight: 1,
            textShadow: `0 0 60px ${rose(0.5)}, 0 0 120px ${lavender(0.3)}`,
            marginBottom: "1.5rem",
          }}
        >
          {CONFIG.script.dateSuccess.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
            color: cream(0.5),
            lineHeight: 1.6,
            marginBottom: "3rem",
          }}
        >
          {CONFIG.script.dateSuccess.subtitle}
        </motion.p>

        <AnimatePresence>
          {showCta && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              onClick={() => { onStart?.(); onNext(); }}
              className="relative group"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <div
                style={{
                  border: `1px solid ${rose(0.3)}`,
                  borderRadius: "999px",
                  padding: "0.85rem 2.2rem",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase" as const,
                  color: cream(0.75),
                  transition: "border-color 0.3s, color 0.3s",
                }}
              >
                <div style={{ fontFamily: "var(--font-playfair-display)", fontStyle: "italic", fontSize: "clamp(1rem, 4vw, 1.15rem)", letterSpacing: "0.05em", textTransform: "none" as const, color: cream(0.9), marginBottom: "0.25rem" }}>
                  {CONFIG.script.dateSuccess.ctaReady}
                </div>
                <div>
                  {CONFIG.script.dateSuccess.ctaStart}
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
