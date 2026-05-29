"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rose, lavender, cream, CONFIG } from "../config";

export function MomentsScene({ onNext }: { onNext: () => void }) {
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
            style={{ fontFamily: "var(--font-playfair-display)", color: lavender(0.5) }}
          >
            {m.roman}
          </p>

          <h2
            className="text-xl font-light mb-8 tracking-wide"
            style={{ fontFamily: "var(--font-playfair-display)", color: cream(0.45) }}
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
              background: i === index ? rose(0.75) : rose(0.2),
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
