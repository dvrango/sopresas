"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rose, lavender, cream } from "../config";

interface Props {
  onContinue: () => void;
}

const LINES = [
  { text: "oye…", delay: 400 },
  { text: "antes de empezar,", delay: 1600 },
  { text: "sube el volumen de tu celular.", delay: 2800 },
  { text: "y el brillo también.", delay: 4000 },
];

export function VolumeScene({ onContinue }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    );
    const hintTimer = setTimeout(() => setShowHint(true), 5600);
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
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
      onClick={showHint ? onContinue : undefined}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 480,
          maxHeight: 480,
          background: `radial-gradient(circle, ${rose(0.06)} 0%, ${lavender(0.04)} 40%, transparent 70%)`,
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
                  color: i === 0 ? cream(0.72) : i === 2 || i === 3 ? cream(0.9) : cream(0.5),
                  lineHeight: 1.7,
                  marginBottom: "0.1rem",
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
              transition={{ duration: 1.2 }}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase" as const,
                color: rose(0.3),
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
