"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { R, rose, lavender } from "../config";

export function IntroScene({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const t = setTimeout(onNext, 3000);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
      className="fixed inset-0 flex flex-col items-center justify-center"
    >
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${rose(0.07)} 0%, transparent 70%)`,
          animation: "breathe 4s ease-in-out infinite",
        }}
      />

      <div
        className="absolute rounded-full border"
        style={{
          width: 140,
          height: 140,
          borderColor: rose(0.07),
          animation: "slowPulseRing 4s 1s ease-out infinite",
        }}
      />

      <div
        className="absolute rounded-full border"
        style={{
          width: 90,
          height: 90,
          borderColor: lavender(0.12),
          animation: "pulseRing 3s ease-out infinite",
        }}
      />

      <div
        className="relative z-10"
        style={{
          animation: "breathe 3.5s ease-in-out infinite",
          filter: `drop-shadow(0 0 12px ${rose(0.9)}) drop-shadow(0 0 30px ${rose(0.5)}) drop-shadow(0 0 60px ${lavender(0.3)})`,
        }}
      >
        <svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 32C19 32 2 21.5 2 10.5C2 5.8 5.8 2 10.5 2C13.8 2 16.7 3.8 19 6.5C21.3 3.8 24.2 2 27.5 2C32.2 2 36 5.8 36 10.5C36 21.5 19 32 19 32Z"
            fill={R}
          />
        </svg>
      </div>

    </motion.div>
  );
}
