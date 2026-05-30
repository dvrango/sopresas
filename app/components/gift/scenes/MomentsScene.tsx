"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { rose, lavender, cream, CONFIG, PHOTOS, INTRO_PHOTO_COUNT } from "../config";

const MOMENT_PHOTOS = PHOTOS.slice(INTRO_PHOTO_COUNT);

type Step =
  | { type: "moment"; roman: string; title: string; text: string }
  | { type: "photo"; src: string };

function buildSteps(): Step[] {
  const steps: Step[] = [];
  CONFIG.moments.forEach((m, i) => {
    steps.push({ type: "moment", ...m });
    if (MOMENT_PHOTOS[i]) steps.push({ type: "photo", src: MOMENT_PHOTOS[i] });
  });
  return steps;
}

const STEPS = buildSteps();
const MOMENT_COUNT = CONFIG.moments.length;

export function MomentsScene({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    if (index < STEPS.length - 1) {
      setIndex((i) => i + 1);
    } else {
      onNext();
    }
  }, [index, onNext]);

  // auto-advance
  useEffect(() => {
    const delay = STEPS[index]?.type === "photo" ? 5000 : 6000;
    const t = setTimeout(advance, delay);
    return () => clearTimeout(t);
  }, [index, advance]);

  const step = STEPS[index];
  const momentIndex = STEPS.slice(0, index + 1).filter((s) => s.type === "moment").length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 cursor-pointer"
      onClick={advance}
    >
      <AnimatePresence mode="wait">
        {step.type === "photo" ? (
          <motion.div
            key={`photo-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 14, ease: "linear" }}
            >
              <Image src={step.src} alt="" fill className="object-cover" priority />
            </motion.div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,8,0.45) 100%)" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(10,6,8,0.8) 0%, transparent 100%)" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`moment-${index}`}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24, transition: { duration: 0.5 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center py-20"
            style={{ paddingLeft: "max(2rem, env(safe-area-inset-left) + 1.5rem)", paddingRight: "max(2rem, env(safe-area-inset-right) + 1.5rem)" }}
          >
            <div
              className="absolute w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${rose(0.04)} 0%, transparent 70%)`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div className="max-w-lg w-full relative">
              <p
                className="text-xs tracking-[0.6em] uppercase mb-10"
                style={{ fontFamily: "var(--font-playfair-display)", color: lavender(0.5) }}
              >
                {step.roman}
              </p>
              <h2
                className="text-xl font-light mb-8 tracking-wide"
                style={{ fontFamily: "var(--font-playfair-display)", color: cream(0.45) }}
              >
                {step.title}
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
                &ldquo;{step.text}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed flex gap-3 items-center pointer-events-none" style={{ bottom: "calc(env(safe-area-inset-bottom) + 3rem)" }}>
        {CONFIG.moments.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-700"
            style={{
              width: i === momentIndex ? 16 : 4,
              height: 4,
              background: i <= momentIndex ? rose(0.75) : rose(0.2),
            }}
          />
        ))}
      </div>

      <motion.p
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="fixed text-xs tracking-[0.35em] uppercase pointer-events-none"
        style={{ color: rose(0.3), bottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
      >
        {index < STEPS.length - 1 ? "toca para continuar" : "toca para leer"}
      </motion.p>
    </motion.div>
  );
}
