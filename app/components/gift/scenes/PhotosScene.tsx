"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { rose, PHOTOS, INTRO_PHOTO_COUNT } from "../config";

const INTRO_PHOTOS = PHOTOS.slice(0, INTRO_PHOTO_COUNT);

export function PhotosScene({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    if (index < INTRO_PHOTOS.length - 1) {
      setIndex((i) => i + 1);
    } else {
      onNext();
    }
  }, [index, onNext]);

  useEffect(() => {
    const t = setTimeout(advance, 5000);
    return () => clearTimeout(t);
  }, [advance]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 cursor-pointer"
      onClick={advance}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
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
            <Image src={INTRO_PHOTOS[index]} alt="" fill className="object-cover" priority />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,8,0.45) 100%)" }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(10,6,8,0.45) 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(10,6,8,0.8) 0%, transparent 100%)" }}
      />

      <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-2.5 pointer-events-none">
        {INTRO_PHOTOS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-700"
            style={{
              width: i === index ? 18 : 4,
              height: 4,
              background: i === index ? rose(0.85) : rose(0.25),
            }}
          />
        ))}
      </div>

      <motion.p
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-6 left-0 right-0 text-center text-xs tracking-[0.35em] uppercase pointer-events-none"
        style={{ color: rose(0.45) }}
      >
        {index < INTRO_PHOTOS.length - 1 ? "toca para ver más" : "toca para continuar"}
      </motion.p>
    </motion.div>
  );
}
