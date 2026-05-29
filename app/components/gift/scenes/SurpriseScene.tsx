"use client";

import { motion } from "framer-motion";
import { rose, lavender, cream } from "../config";

export function SurpriseScene({ onBack }: { onBack: () => void }) {
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
          background: `radial-gradient(circle, ${lavender(0.08)} 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 text-center max-w-sm flex flex-col items-center gap-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.4rem, 6vw, 2.2rem)",
            color: cream(0.75),
            lineHeight: 1.4,
          }}
        >
          {/* TODO: contenido de la sorpresa */}
          próximamente…
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.0 }}
          onClick={onBack}
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: rose(0.25), background: "none", border: "none", cursor: "pointer" }}
        >
          volver
        </motion.button>
      </div>
    </motion.div>
  );
}
