"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rose, lavender, cream, CONFIG } from "../config";

const LINES = CONFIG.script.chestIntroDialog;

export function ChestIntroScene({ onNext }: { onNext: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    );
    const advanceAt = LINES[LINES.length - 1].delay + 1800;
    const advance = setTimeout(onNext, advanceAt);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(advance);
    };
  }, [onNext]);

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
                  fontSize:
                    i === 3
                      ? "clamp(1.1rem, 3.5vw, 1.35rem)"
                      : "clamp(1.4rem, 4.5vw, 1.75rem)",
                  color:
                    i === 0
                      ? cream(1)
                      : i === 3
                      ? cream(0.45)
                      : cream(0.65),
                  lineHeight: 1.7,
                  marginBottom: "0.15rem",
                  ...(i === 0 && {
                    filter: `drop-shadow(0 0 10px ${rose(0.4)})`,
                  }),
                }}
              >
                {line.text}
              </motion.p>
            )}
          </AnimatePresence>
        ))}
      </div>
    </motion.div>
  );
}
