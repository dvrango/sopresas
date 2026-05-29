"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cream, type DialogLine } from "./config";

export type { DialogLine };

interface DialogLinesProps {
  lines: DialogLine[];
  /** ms to call onDone. Defaults to last line delay + 1800ms. Pass null to disable auto-advance. */
  doneTrigger?: number | null;
  onDone?: () => void;
  fontSize?: string;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 pl-1" style={{ height: "1.5em" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          style={{
            display: "block",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: cream(0.4),
          }}
        />
      ))}
    </div>
  );
}

export function DialogLines({
  lines,
  doneTrigger,
  onDone,
  fontSize = "clamp(1.5rem, 5.5vw, 2rem)",
}: DialogLinesProps) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((l, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), l.delay));
    });

    if (doneTrigger !== null && onDone) {
      const lastDelay = lines[lines.length - 1]?.delay ?? 0;
      const trigger = doneTrigger ?? lastDelay + 1800;
      timers.push(setTimeout(onDone, trigger));
    }

    return () => timers.forEach(clearTimeout);
  }, [lines, doneTrigger, onDone]);

  const currentLine = lines[visibleLines - 1];
  const showDots = visibleLines > 0 && visibleLines < lines.length && !!currentLine?.suspense;

  // Find the last resetBefore index at or before current visible count
  const resetIndex = lines
    .slice(0, visibleLines)
    .reduce((acc, l, i) => (l.resetBefore ? i : acc), 0);

  const displayedLines = lines.slice(resetIndex, visibleLines);

  return (
    <div className="w-full max-w-xs space-y-4">
      <AnimatePresence mode="popLayout">
        {displayedLines.map((l) => (
          <motion.p
            key={l.text}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize,
              color: l === displayedLines[displayedLines.length - 1] ? cream(0.85) : cream(0.35),
              lineHeight: 1.5,
            }}
          >
            {l.text}
          </motion.p>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {showDots && (
          <motion.div
            key="dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TypingDots />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
