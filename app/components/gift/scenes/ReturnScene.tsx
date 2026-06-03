"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { R, rose, lavender, cream } from "../config";

export function ReturnScene({
  onReplay,
  onSurprise,
  onCita,
}: {
  onReplay: () => void;
  onSurprise: () => void;
  onCita: () => void;
}) {
  const [hasCita, setHasCita] = useState(false);

  useEffect(() => {
    setHasCita(!!localStorage.getItem("cita_confirmed"));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 480,
          maxHeight: 480,
          background: `radial-gradient(circle, ${rose(0.07)} 0%, ${lavender(0.04)} 45%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 text-center max-w-sm flex flex-col items-center gap-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            animation: "breathe 3s ease-in-out infinite",
            filter: `drop-shadow(0 0 10px ${rose(0.9)}) drop-shadow(0 0 28px ${rose(0.5)}) drop-shadow(0 0 60px ${lavender(0.3)})`,
          }}
        >
          <svg width="32" height="29" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 32C19 32 2 21.5 2 10.5C2 5.8 5.8 2 10.5 2C13.8 2 16.7 3.8 19 6.5C21.3 3.8 24.2 2 27.5 2C32.2 2 36 5.8 36 10.5C36 21.5 19 32 19 32Z"
              fill={R}
            />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.4rem, 6vw, 2.2rem)",
            color: cream(0.88),
            lineHeight: 1.4,
          }}
        >
          ¿lo quieres volver a ver eh?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.0 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <button
            onClick={onReplay}
            style={{
              background: "none",
              border: `1px solid ${rose(0.35)}`,
              borderRadius: "999px",
              padding: "0.85rem 2.4rem",
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
              color: cream(0.85),
              cursor: "pointer",
              width: "100%",
              transition: "border-color 0.3s",
            }}
          >
            sí, otra vez
          </button>

          <button
            onClick={onSurprise}
            style={{
              background: "none",
              border: `1px solid ${lavender(0.3)}`,
              borderRadius: "999px",
              padding: "0.85rem 2.4rem",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.72rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              color: cream(0.55),
              cursor: "pointer",
              width: "100%",
              transition: "border-color 0.3s",
            }}
          >
            aquí hay otra sorpresa más
          </button>

          {hasCita && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              onClick={onCita}
              style={{
                background: "none",
                border: `1px solid ${rose(0.25)}`,
                borderRadius: "999px",
                padding: "0.85rem 2.4rem",
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(0.85rem, 3vw, 1rem)",
                color: rose(0.8),
                cursor: "pointer",
                width: "100%",
                transition: "border-color 0.3s",
              }}
            >
              nuestra cita ♡
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
