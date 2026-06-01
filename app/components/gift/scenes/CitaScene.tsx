"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rose, lavender, cream, R, CONFIG } from "../config";
import { DialogLines } from "../DialogLines";

type Phase = "dialog" | "ticket" | "accepted" | "declined";
type AcceptStep = "reaction" | "place" | "datetime" | "confirmed";

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

const CITA_LS_KEY = "cita_confirmed";

const inputStyle = (rose: (a: number) => string, cream: (a: number) => string): React.CSSProperties => ({
  background: "rgba(15,6,18,0.85)",
  border: `1px solid ${rose(0.3)}`,
  borderRadius: 2,
  padding: "0.75rem 1rem",
  color: cream(0.9),
  fontFamily: "var(--font-geist-sans)",
  fontSize: "16px",
  width: "100%",
  outline: "none",
  colorScheme: "dark" as const,
});

function AcceptedFlow({ onBack, onDone, onCancelled }: { onBack: () => void; onDone: () => void; onCancelled: () => void }) {
  const t = CONFIG.script.cita;
  const hasPrev = !!(() => { try { return localStorage.getItem(CITA_LS_KEY); } catch { return null; } })();
  const [step, setStep] = useState<AcceptStep>(hasPrev ? "datetime" : "reaction");
  const [date, setDate] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CITA_LS_KEY) ?? "{}").date ?? ""; } catch { return ""; }
  });
  const [time, setTime] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CITA_LS_KEY) ?? "{}").time ?? ""; } catch { return ""; }
  });
  const [customPlace, setCustomPlace] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CITA_LS_KEY) ?? "{}").place ?? ""; } catch { return ""; }
  });
  const [showPlaceInput, setShowPlaceInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirm() {
    if (!date || !time) return;
    setSubmitting(true);
    try {
      const prev = JSON.parse(localStorage.getItem(CITA_LS_KEY) ?? "null");
      const finalPlace = customPlace.trim() || CONFIG.script.cita.place;
      const changed = prev && (prev.date !== date || prev.time !== time || prev.place !== finalPlace);
      const event = changed ? "cita_changed" : "cita_accepted";
      const payload = changed
        ? { event, date, time, place: finalPlace, prev_date: prev.date, prev_time: prev.time, prev_place: prev.place }
        : { event, date, time, place: finalPlace };
      await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      localStorage.setItem(CITA_LS_KEY, JSON.stringify({ date, time, place: finalPlace }));
    } catch {
      // ignore
    }
    setStep("confirmed");
    setSubmitting(false);
  }

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

      <AnimatePresence mode="wait">
        {step === "reaction" && (
          <motion.div
            key="reaction"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", textAlign: "center" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
                color: cream(0.9),
                lineHeight: 1.6,
              }}
            >
              sabía que dirías que sí. ♡
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              onClick={() => setStep("place")}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
                color: rose(0.7),
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              seguir →
            </motion.button>
          </motion.div>
        )}

        {step === "place" && (
          <motion.div
            key="place"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.55rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: rose(0.5),
              }}
            >
              {t.placeIntro}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1.2 }}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                color: cream(0.95),
                lineHeight: 1.3,
              }}
            >
              {t.place}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 200 }}
              style={{ filter: `drop-shadow(0 0 8px ${rose(0.7)})` }}
            >
              <HeartSvg />
            </motion.div>
<AnimatePresence mode="wait">
              {!showPlaceInput ? (
                <motion.button
                  key="suggest-other"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                  onClick={() => setShowPlaceInput(true)}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase" as const,
                    color: cream(0.85),
                    cursor: "pointer",
                    padding: "0.25rem 1rem",
                  }}
                >
                  prefieres otro lugar?
                </motion.button>
              ) : (
                <motion.div
                  key="place-input"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", width: "100%", maxWidth: 260 }}
                >
                  <p style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: cream(0.9),
                    margin: 0,
                  }}>
                    ¿dónde?
                  </p>
                  <input
                    type="text"
                    value={customPlace}
                    onChange={(e) => setCustomPlace(e.target.value)}
                    placeholder="escribe el lugar..."
                    style={{
                      background: "rgba(15,6,18,0.85)",
                      border: `1px solid ${rose(0.2)}`,
                      borderRadius: 2,
                      padding: "0.6rem 1rem",
                      color: cream(0.85),
                      fontFamily: "var(--font-playfair-display)",
                      fontStyle: "italic",
                      fontSize: "16px",
                      width: "100%",
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              onClick={() => setStep("datetime")}
              style={{
                marginTop: "0.5rem",
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
                color: rose(0.9),
                background: "none",
                border: `1px solid ${rose(0.3)}`,
                borderRadius: 2,
                padding: "0.75rem 2rem",
                cursor: "pointer",
              }}
            >
              continuar
            </motion.button>

            
          </motion.div>
        )}

        {step === "datetime" && (
          <motion.div
            key="datetime"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", width: "100%", maxWidth: 300, textAlign: "center" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
                color: cream(0.8),
                lineHeight: 1.5,
              }}
            >
              {hasPrev ? "¿quieres cambiar algo?" : t.datePrompt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}
            >
              {[
                { label: "fecha", node: <input key="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle(rose, cream)} /> },
                { label: "hora", node: <input key="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle(rose, cream)} /> },
                { label: "lugar", node: <input key="place" type="text" value={customPlace} onChange={(e) => setCustomPlace(e.target.value)} placeholder={CONFIG.script.cita.place} style={inputStyle(rose, cream)} /> },
              ].map(({ label, node }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.3rem", }}>
                  <span style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: rose(0.45),
                  }}>{label}</span>
                  {node}
                </div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              onClick={handleConfirm}
              disabled={!date || !time || submitting}
              style={{
                fontFamily: "var(--font-playfair-display)",
                fontStyle: "italic",
                fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
                color: date && time ? rose(0.9) : rose(0.35),
                background: "none",
                border: `1px solid ${date && time ? rose(0.35) : rose(0.15)}`,
                borderRadius: 2,
                padding: "0.75rem 2rem",
                cursor: date && time ? "pointer" : "not-allowed",
                transition: "all 0.4s ease",
              }}
            >
              {hasPrev ? "actualizar" : "confirmar"}
            </motion.button>

            {hasPrev && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                onClick={async () => {
                  try {
                    await fetch("/api/log", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ event: "cita_cancelled" }),
                    });
                    localStorage.removeItem("cita_confirmed");
                  } catch { /* ignore */ }
                  onCancelled();
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase" as const,
                  color: cream(0.3),
                  cursor: "pointer",
                  padding: "0.25rem 1rem",
                }}
              >
                cancelar la cita
              </motion.button>
            )}
          </motion.div>
        )}

        {step === "confirmed" && (
          <motion.p
            key="confirmed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
              color: cream(0.9),
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            {t.confirmedMessage}
          </motion.p>
        )}
        {step === "confirmed" && (
          <motion.button
            key="confirmed-back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            onClick={onDone}
            style={{
              marginTop: "2.5rem",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.55rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase" as const,
              color: rose(0.8),
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            volver
          </motion.button>
        )}
      </AnimatePresence>

      {step !== "confirmed" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
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
      )}
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

  async function handleDecline() {
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "cita_declined" }),
      });
    } catch {
      // ignore
    }
    onDecline();
  }

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
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 320,
          border: `1px solid ${rose(0.3)}`,
          borderRadius: 2,
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          background: "rgba(15,6,18,0.85)",
          boxShadow: `0 0 40px ${rose(0.06)}, 0 0 80px ${lavender(0.04)}`,
        }}
      >
        <div style={{
          position: "absolute", top: 36, left: 0, right: 0,
          borderTop: `1px dashed ${rose(0.15)}`,
        }} />
        <div style={{
          position: "absolute", bottom: 36, left: 0, right: 0,
          borderTop: `1px dashed ${rose(0.15)}`,
        }} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.55rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: rose(0.9),
          }}
        >
          {t.label}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(2rem, 8vw, 2.6rem)",
            color: cream(0.95),
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          {t.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 4vw, 1.2rem)",
            color: cream(0.95),
            letterSpacing: "0.05em",
          }}
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, type: "spring", stiffness: 200 }}
          style={{
            filter: `drop-shadow(0 0 8px ${rose(0.7)})`,
            marginTop: "0.25rem",
          }}
        >
          <HeartSvg />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: cream(0.85),
            marginTop: "0.25rem",
          }}
        >
          {t.detail}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginTop: "2rem" }}
      >
        <button
          onClick={onAccept}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 4vw, 1.2rem)",
            color: rose(1),
            background: "none",
            border: `1px solid ${rose(0.3)}`,
            borderRadius: 2,
            padding: "0.75rem 2rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          {t.ctaAccept}
        </button>

        <button
          onClick={handleDecline}
          style={{
            fontFamily: "var(--font-playfair-display)",
            fontStyle: "italic",
            fontSize: "clamp(0.1rem, 3vw, 0.9rem)",
            color: cream(0.75),
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.05em",
            padding: "0.25rem 1rem",
          }}
        >
          {t.ctaDecline}
        </button>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
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

export function CitaScene({ onBack, onDone, directEdit = false }: { onBack: () => void; onDone?: () => void; directEdit?: boolean }) {
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
          <AcceptedFlow key="accepted" onBack={onBack} onDone={onDone ?? onBack} onCancelled={() => setPhase("declined")} />
        )}
        {phase === "declined" && (
          <DeclinedView key="declined" onBack={onBack} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
