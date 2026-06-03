"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rose, lavender, cream, R, CONFIG } from "../config";

const STARS = CONFIG.script.surprise.stars;
const CONNECTIONS = CONFIG.script.surprise.connections;

export function SurpriseScene({ onBack, onSpecialStar }: { onBack: () => void; onSpecialStar?: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showOverlay, setShowOverlay] = useState(true);
  const [hintDone, setHintDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowOverlay(false), 3200);
    const t2 = setTimeout(() => setHintDone(true), 7500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleStar = (i: number) => {
    if (STARS[i].link && onSpecialStar) {
      onSpecialStar();
      return;
    }
    setSelected(i);
    setRevealed((prev) => new Set(prev).add(i));
  };

  const close = () => setSelected(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
      className="fixed inset-0"
      style={{ background: "#07040a" }}
    >
      {/* entrance overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onClick={() => setShowOverlay(false)}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#07040a",
              cursor: "pointer",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem, 5vw, 1.8rem)",
                color: cream(0.9),
                textAlign: "center",
                lineHeight: 1.7,
                padding: "0 2rem",
                pointerEvents: "none",
              }}
            >
              {CONFIG.script.surprise.overlayIntro}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* intro text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        style={{
          position: "absolute",
          top: "5%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--font-playfair-display)",
          fontStyle: "italic",
          fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
          color: cream(0.85),
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {CONFIG.script.surprise.intro}
      </motion.p>

      {/* SVG layer: lines + stars */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* connection lines */}
        {CONNECTIONS.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={STARS[a].x} y1={STARS[a].y}
            x2={STARS[b].x} y2={STARS[b].y}
            stroke={`rgba(200,160,212,0.12)`}
            strokeWidth="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.08, duration: 0.8 }}
          />
        ))}
      </svg>

      {/* Stars as DOM elements (easier for hit targets) */}
      {STARS.map((star, i) => {
        const isSelected = selected === i;
        const isRevealed = revealed.has(i);
        const isHintStar = i === 0 && !isRevealed && !showOverlay && !hintDone;
        return (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isHintStar ? { opacity: 1, scale: 1, x: [0, -5, 5, -5, 5, 0] } : { opacity: 1, scale: 1, x: 0 }}
            transition={isHintStar
              ? { opacity: { delay: 0.8, duration: 0.5 }, scale: { delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }, x: { delay: 3.8, duration: 0.4, repeat: 2, repeatDelay: 1.2, ease: "easeInOut" } }
              : { delay: 0.8 + i * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
            onClick={() => handleStar(i)}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: "translate(-50%, -50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "12px",
              zIndex: 20,
            }}
          >
            {/* glow */}
            <motion.div
              animate={isSelected ? { opacity: 1, scale: 1.8 } : { opacity: isRevealed ? 0.5 : 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                inset: "50%",
                transform: "translate(-50%,-50%)",
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${rose(0.6)} 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            {/* dot */}
            <motion.div
              animate={
                isSelected
                  ? { backgroundColor: R, boxShadow: `0 0 8px 2px ${rose(0.8)}`, scale: 1.4 }
                  : isRevealed
                  ? { backgroundColor: rose(0.7), boxShadow: `0 0 4px 1px ${rose(0.4)}`, scale: 1 }
                  : { backgroundColor: cream(0.6), boxShadow: "none", scale: 1 }
              }
              transition={{ duration: 0.3 }}
              style={{ width: 6, height: 6, borderRadius: "50%", position: "relative" }}
            />
            {/* label */}
            <motion.span
              animate={{ opacity: isSelected ? 0 : isRevealed ? 0.9 : 0.45 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.68rem",
                letterSpacing: "0.15em",
                color: cream(0.8),
                pointerEvents: "none",
                marginTop: 2,
              }}
            >
              {star.name}
            </motion.span>
          </motion.button>
        );
      })}

      {/* hint */}
      <AnimatePresence>
        {selected === null && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: "absolute",
              bottom: "12%",
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.72rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: rose(0.75),
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {CONFIG.script.surprise.hint}
          </motion.p>
        )}
      </AnimatePresence>

      {/* info panel */}
      <AnimatePresence>
        {selected !== null && (
          <>
          <div
            onClick={close}
            style={{ position: "absolute", inset: 0, zIndex: 29 }}
          />
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 30,
              background: `linear-gradient(to top, rgba(15,6,18,0.98) 60%, transparent)`,
              padding: "3rem 2rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              cursor: "pointer",
            }}
          >
            <p style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.72rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: rose(0.6),
            }}>
              {STARS[selected].name}
            </p>
            <p style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 4.5vw, 1.5rem)",
              color: cream(0.9),
              lineHeight: 1.6,
            }}>
              {STARS[selected].text}
            </p>
            {STARS[selected].link && (
              <motion.a
                href={STARS[selected].link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  display: "inline-block",
                  marginTop: "0.75rem",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: lavender(0.9),
                  textDecoration: "none",
                  borderBottom: `1px solid ${lavender(0.3)}`,
                  paddingBottom: "2px",
                }}
              >
                seguir leyendo →
              </motion.a>
            )}
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* back */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: "4%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.68rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: rose(0.7),
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
