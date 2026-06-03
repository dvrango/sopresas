"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rose, lavender, cream, R, CONFIG } from "../config";
import { track } from "../../../lib/analytics";
import { DialogLines } from "../DialogLines";

type Phase = "dialog" | "ticket" | "accepted" | "declined";

function HeartSvg() {
  return (
    <svg width="22" height="20" viewBox="0 0 38 34" fill="none">
      <path
        d="M19 32C19 32 2 21.5 2 10.5C2 5.8 5.8 2 10.5 2C13.8 2 16.7 3.8 19 6.5C21.3 3.8 24.2 2 27.5 2C32.2 2 36 5.8 36 10.5C36 21.5 19 32 19 32Z"
        fill={R}
      />
    </svg>
  );
}

function AcceptedFlow({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-8"
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80vw", height: "80vw", maxWidth: 500, maxHeight: 500,
          background: `radial-gradient(circle, ${lavender(0.07)} 0%, transparent 70%)`,
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
            color: cream(0.9),
            lineHeight: 1.6,
          }}
        >
          sabía que dirías que sí.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 4.5vw, 1.5rem)",
            color: cream(0.75),
            lineHeight: 1.6,
          }}
        >
          nos vemos pronto entonces. ♡
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: "4%",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.55rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: rose(0.8),
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        volver
      </motion.button>
    </motion.div>
  );
}

function DeclinedView({ onBack }: { onBack: () => void }) {
  const lines = CONFIG.script.cita.declineMessage.split("\n");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-8"
    >
      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textAlign: "center" }}
      >
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.5, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 4vw, 1.3rem)",
              color: cream(line ? 0.75 : 0),
              lineHeight: 1.6,
              minHeight: "1.5rem",
            }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: "4%",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.55rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: rose(0.8),
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        volver
      </motion.button>
    </motion.div>
  );
}

function TicketScene({ onAccept, onDecline, onBack }: { onAccept: () => void; onDecline: () => void; onBack: () => void }) {
  const t = CONFIG.script.cita.ticket;

  useEffect(() => {
    track("cita_ticket_viewed");
  }, []);

  function handleAccept() {
    track("cita_accepted");
    onAccept();
  }

  function handleDecline() {
    track("cita_declined");
    onDecline();
  }

  const pageBg = "#07040a";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-8"
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80vw", height: "80vw", maxWidth: 500, maxHeight: 500,
          background: `radial-gradient(circle, ${lavender(0.07)} 0%, transparent 70%)`,
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.1, ease: "easeOut" }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 300,
          border: `1px solid ${rose(0.28)}`,
          borderRadius: 3,
          background: "rgba(18,8,22,0.92)",
          boxShadow: `0 0 50px ${rose(0.07)}, 0 0 100px ${lavender(0.04)}, inset 0 0 40px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Inner border ornament */}
        <div style={{
          position: "absolute", inset: 5,
          border: `1px solid ${rose(0.1)}`,
          borderRadius: 1,
          pointerEvents: "none",
        }} />

        {/* Main body */}
        <div style={{
          padding: "2rem 2.25rem 1.75rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.9rem",
          background: `linear-gradient(to bottom, rgba(60,20,70,0.15) 0%, transparent 100%)`,
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.9 }}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
          >
            <span style={{ color: rose(0.35), fontSize: "0.45rem", lineHeight: 1 }}>✦</span>
            <span style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.5rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: rose(0.85),
            }}>
              {t.label}
            </span>
            <span style={{ color: rose(0.35), fontSize: "0.45rem", lineHeight: 1 }}>✦</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1 }}
            style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(2.2rem, 9vw, 2.8rem)",
              color: cream(0.97),
              lineHeight: 1.0,
              textAlign: "center",
              marginTop: "0.1rem",
            }}
          >
            {t.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.9 }}
            style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 4.5vw, 1.3rem)",
              color: cream(0.8),
              letterSpacing: "0.08em",
            }}
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.7, type: "spring", stiffness: 180 }}
            style={{
              filter: `drop-shadow(0 0 10px ${rose(0.75)})`,
              marginTop: "0.1rem",
              marginBottom: "0.1rem",
            }}
          >
            <HeartSvg />
          </motion.div>
        </div>

        {/* Perforation tear line with notch circles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          style={{ position: "relative", height: 0, margin: "0 0" }}
        >
          <div style={{
            position: "absolute", left: -9, top: -9,
            width: 18, height: 18, borderRadius: "50%",
            background: pageBg,
            border: `1px solid ${rose(0.2)}`,
            zIndex: 2,
          }} />
          <div style={{
            position: "absolute", right: -9, top: -9,
            width: 18, height: 18, borderRadius: "50%",
            background: pageBg,
            border: `1px solid ${rose(0.2)}`,
            zIndex: 2,
          }} />
          <div style={{
            width: "100%",
            borderTop: `1px dashed ${rose(0.22)}`,
          }} />
        </motion.div>

        {/* Stub section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
          style={{
            padding: "1.25rem 2.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <p style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: cream(0.55),
            textAlign: "center",
            lineHeight: 1.7,
          }}>
            {t.detail}
          </p>
          <p style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.45rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: rose(0.3),
            marginTop: "0.1rem",
          }}>
            N° 0001 · 2026
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.9 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem", marginTop: "2.25rem" }}
      >
        <button
          onClick={handleAccept}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 4vw, 1.15rem)",
            color: rose(1),
            background: `linear-gradient(135deg, rgba(180,60,100,0.08) 0%, rgba(120,40,80,0.12) 100%)`,
            border: `1px solid ${rose(0.35)}`,
            borderRadius: 2,
            padding: "0.8rem 2.5rem",
            cursor: "pointer",
            letterSpacing: "0.06em",
            boxShadow: `0 0 20px ${rose(0.08)}`,
          }}
        >
          {t.ctaAccept}
        </button>

        <button
          onClick={handleDecline}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: cream(0.45),
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.04em",
            padding: "0.25rem 1rem",
          }}
        >
          {t.ctaDecline}
        </button>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.8 }}
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: "4%",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.55rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: rose(0.8),
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        volver
      </motion.button>
    </motion.div>
  );
}

export function CitaScene({ onBack, directEdit = false }: { onBack: () => void; directEdit?: boolean }) {
  const [phase, setPhase] = useState<Phase>(directEdit ? "accepted" : "dialog");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
      className="fixed inset-0"
      style={{ background: "#07040a" }}
    >
      <AnimatePresence mode="wait">
        {phase === "dialog" && (
          <motion.div
            key="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center px-10"
          >
            <DialogLines
              lines={CONFIG.script.cita.dialog}
              onDone={() => setPhase("ticket")}
            />
          </motion.div>
        )}
        {phase === "ticket" && (
          <TicketScene
            key="ticket"
            onAccept={() => setPhase("accepted")}
            onDecline={() => setPhase("declined")}
            onBack={onBack}
          />
        )}
        {phase === "accepted" && (
          <AcceptedFlow key="accepted" onBack={onBack} />
        )}
        {phase === "declined" && (
          <DeclinedView key="declined" onBack={onBack} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
