"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { R, rose, CONFIG } from "../config";

type BurstParticle = { id: number; x: number; y: number; size: number; isLavender: boolean };

export function NameScene({ onNext }: { onNext: () => void }) {
  const letters = CONFIG.recipientName.split("");
  const [burst, setBurst] = useState(false);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);

  useEffect(() => {
    setBurstParticles(
      Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * Math.PI * 2;
        const radius = 90 + Math.random() * 80;
        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          size: Math.random() * 3 + 1,
          isLavender: Math.random() > 0.5,
        };
      })
    );
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setBurst(true), 1000);
    const t2 = setTimeout(() => onNext(), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center"
    >
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="text-xs tracking-[0.55em] uppercase mb-10"
        style={{ fontFamily: "var(--font-geist-sans)", color: rose(0.38) }}
      >
        esto es para
      </motion.p>

      <div className="relative flex items-center justify-center">
        <div className="flex" style={{ fontFamily: "var(--font-playfair-display)" }}>
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, delay: 0.7 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="font-light"
              style={{
                fontSize: "clamp(1.5rem, 20vw, 8rem)",
                letterSpacing: "0.06em",
                color: R,
                display: "inline-block",
              }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          ))}
        </div>

        {burst &&
          burstParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
              transition={{ duration: 1.8, ease: [0.2, 0.8, 0.4, 1] }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                background: p.isLavender ? "#c8a0d4" : R,
              }}
            />
          ))}
      </div>
    </motion.div>
  );
}
