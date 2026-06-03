"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { R, rose, lavender, cream, CONFIG } from "../config";

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

export function FinaleScene({ onRestart }: { onRestart: () => void }) {
  const [stars, setStars] = useState<Star[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 5200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("regalo_completed", "1");
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
      onClick={showButton ? onRestart : undefined}
      style={{ cursor: showButton ? "pointer" : "default" }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, s.opacity, s.opacity * 0.6, s.opacity], scale: 1 }}
            transition={{ delay: s.delay, duration: s.duration, repeat: Infinity, repeatType: "reverse" }}
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
              <path
                d="M19 32C19 32 2 21.5 2 10.5C2 5.8 5.8 2 10.5 2C13.8 2 16.7 3.8 19 6.5C21.3 3.8 24.2 2 27.5 2C32.2 2 36 5.8 36 10.5C36 21.5 19 32 19 32Z"
                fill={R}
              />
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
            fontSize: "clamp(1.5rem, 10vw, 5rem)",
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
            fontSize: "clamp(1.5rem, 10vw, 5rem)",
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
          style={{ color: rose(0.9) }}
        >
          toca para continuar
        </motion.button>
      </div>
    </motion.div>
  );
}
