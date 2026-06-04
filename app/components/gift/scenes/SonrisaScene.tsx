"use client";

import { motion } from "framer-motion";
import { rose, lavender, cream, R } from "../config";

export function SonrisaScene({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
      style={{ background: "#07040a" }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: 500,
          maxHeight: 500,
          background: `radial-gradient(circle, ${lavender(0.06)} 0%, ${rose(0.03)} 50%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "breathe 6s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 text-center w-full max-w-xs flex flex-col items-center gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.6, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: rose(0.55),
            lineHeight: 1.9,
          }}
        >
          ya tienes algo bonito
          <br />
          para escribir en tu diario
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 2, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.4rem, 6.5vw, 2.2rem)",
            color: cream(0.88),
            lineHeight: 1.55,
          }}
        >
          Espero que sonrías
          <br />
          cuando recuerdes esto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            filter: `drop-shadow(0 0 8px ${rose(0.7)}) drop-shadow(0 0 24px ${rose(0.3)})`,
            animation: "breathe 3s ease-in-out infinite",
          }}
        >
          <svg width="18" height="16" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 32C19 32 2 21.5 2 10.5C2 5.8 5.8 2 10.5 2C13.8 2 16.7 3.8 19 6.5C21.3 3.8 24.2 2 27.5 2C32.2 2 36 5.8 36 10.5C36 21.5 19 32 19 32Z"
              fill={R}
            />
          </svg>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.4, duration: 1.2 }}
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: "6%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.68rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: rose(0.45),
          background: "none",
          border: "none",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        regresar
      </motion.button>
    </motion.div>
  );
}
