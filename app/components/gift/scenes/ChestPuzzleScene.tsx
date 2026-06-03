"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import chestData from "../../../../public/chest.json";
import { rose, cream, CONFIG } from "../config";
import { Fireworks } from "../Fireworks";

const isCorrect = (s: string) => {
  const lower = s.toLowerCase();
  return lower.includes("diablo") || lower.includes("moda");
};

export function ChestPuzzleScene({ onNext }: { onNext: () => void }) {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowInput(true);
      setTimeout(() => inputRef.current?.focus(), 400);
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  const attempt = useCallback(
    (val: string) => {
      if (isCorrect(val)) {
        setOpened(true);
        lottieRef.current?.goToAndPlay(0, true);
        setTimeout(() => setShowSuccess(true), 1200);
        setTimeout(() => onNext(), 4000);
      } else {
        setShake(true);
        setWrong(true);
        setInput("");
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setWrong(false), 2500);
      }
    },
    [onNext]
  );

  const cfg = CONFIG.script.chestPuzzle;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-10"
    >
      {!opened && <Fireworks />}
      {/* ambient halo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={
          opened
            ? { opacity: 1, scale: 1.6 }
            : { opacity: [0.25, 0.55, 0.25], scale: [1, 1.1, 1] }
        }
        transition={
          opened
            ? { duration: 1.4 }
            : { repeat: Infinity, duration: 3.2, ease: "easeInOut" }
        }
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: 480,
          maxHeight: 480,
          background: opened
            ? "radial-gradient(circle, rgba(255,220,90,0.2) 0%, rgba(232,150,176,0.08) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(210,165,75,0.1) 0%, rgba(232,150,176,0.04) 50%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
        {/* chest — spring drop + float + shake */}
        <motion.div
          initial={{ y: -240, opacity: 0, scale: 0.28, rotate: -6 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.3,
            delay: 0.05,
          }}
        >
          <motion.div
            animate={!opened ? { y: [0, -11, 0] } : { y: 0 }}
            transition={
              !opened
                ? { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.6 }
                : { duration: 0.3 }
            }
          >
            <motion.div
              animate={
                shake
                  ? { x: [-12, 12, -9, 9, -5, 5, 0], rotate: [-2, 2, -1.5, 1.5, 0] }
                  : { x: 0, rotate: 0 }
              }
              transition={{ duration: 0.45 }}
              style={{ cursor: !opened ? "pointer" : "default" }}
              onClick={() => !opened && inputRef.current?.focus()}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={chestData}
                autoplay={false}
                loop={false}
                style={{ width: 260, height: 260 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* question + input / success */}
        <div style={{ width: "100%", minHeight: 140 }}>
          <AnimatePresence mode="wait">
            {showInput && !opened && (
              <motion.div
                key="input-area"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.85 }}
                className="w-full"
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair-display)",
                    fontStyle: "italic",
                    fontSize: "clamp(1.15rem, 4vw, 1.4rem)",
                    color: cream(0.88),
                    textAlign: "center",
                    lineHeight: 1.65,
                    marginBottom: "1.5rem",
                  }}
                >
                  {cfg.question}
                </p>

                <input
                  ref={inputRef}
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && input.trim() && attempt(input)
                  }
                  placeholder="escribe aquí…"
                  className="w-full bg-transparent border-b outline-none pb-2 text-center placeholder:opacity-25"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.1rem",
                    color: cream(0.9),
                    borderColor: rose(0.38),
                    caretColor: rose(1),
                    letterSpacing: "0.04em",
                  }}
                />

                <motion.button
                  animate={{ opacity: input.trim() ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => input.trim() && attempt(input)}
                  style={{
                    display: "block",
                    margin: "1.2rem auto 0",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase" as const,
                    color: rose(0.75),
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                  }}
                >
                  abrir →
                </motion.button>
              </motion.div>
            )}

            {opened && showSuccess && (
              <motion.p
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0 }}
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.2rem, 4.5vw, 1.5rem)",
                  color: cream(1),
                  textAlign: "center",
                  filter: `drop-shadow(0 0 14px ${rose(0.6)})`,
                  lineHeight: 1.6,
                }}
              >
                {cfg.successText}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* wrong overlay */}
      <AnimatePresence>
        {wrong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
            style={{ background: "rgb(20,8,14)" }}
          >
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 6vw, 2rem)",
                color: rose(0.9),
                textAlign: "center",
                padding: "0 2rem",
                lineHeight: 1.5,
              }}
            >
              {cfg.wrongAnswer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
