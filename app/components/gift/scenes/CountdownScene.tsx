"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cream, rose, lavender, CONFIG, BIRTHDAY_ISO } from "../config";

function getTimeLeft() {
  const target = new Date(`${BIRTHDAY_ISO}T00:00:00`);
  // target as local midnight — adjust for device TZ
  const localMidnight = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
    0, 0, 0
  );
  const diff = localMidnight.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Pad({ n }: { n: number }) {
  return <>{String(n).padStart(2, "0")}</>;
}

export function CountdownScene() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const unitStyle = {
    fontFamily: "var(--font-geist-sans)",
    fontSize: "0.6rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    color: rose(0.5),
    marginTop: "0.35rem",
  };

  const numStyle = {
    fontFamily: "var(--font-playfair-display)",
    fontSize: "clamp(2.2rem, 10vw, 3rem)",
    color: cream(0.9),
    lineHeight: 1,
    fontStyle: "italic",
  };

  const sep = (
    <span style={{ ...numStyle, color: rose(0.3), alignSelf: "flex-start", paddingTop: "0.15rem" }}>:</span>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10 gap-8"
    >
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${lavender(0.06)} 0%, transparent 70%)`,
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        style={{
          fontFamily: "var(--font-playfair-display)",
          fontStyle: "italic",
          fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
          color: cream(0.9),
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {CONFIG.script.countdown.title}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="flex items-start gap-3 relative z-10"
      >
        <div className="flex flex-col items-center">
          <span style={numStyle}><Pad n={time.days} /></span>
          <span style={unitStyle}>días</span>
        </div>
        {sep}
        <div className="flex flex-col items-center">
          <span style={numStyle}><Pad n={time.hours} /></span>
          <span style={unitStyle}>horas</span>
        </div>
        {sep}
        <div className="flex flex-col items-center">
          <span style={numStyle}><Pad n={time.minutes} /></span>
          <span style={unitStyle}>min</span>
        </div>
        {sep}
        <div className="flex flex-col items-center">
          <span style={numStyle}><Pad n={time.seconds} /></span>
          <span style={unitStyle}>seg</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase" as const,
          color: rose(0.45),
          textAlign: "center",
        }}
      >
        {CONFIG.script.countdown.hint}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{
          fontFamily: "var(--font-playfair-display)",
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
          color: cream(0.4),
          textAlign: "center",
        }}
      >
        {CONFIG.script.countdown.tease}
      </motion.p>
    </motion.div>
  );
}
