"use client";

import { useEffect, useRef } from "react";
import styles from "./card.module.css";

export default function PrintPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scale = () => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const scaleX = window.innerWidth / card.offsetWidth;
      const scaleY = window.innerHeight / card.offsetHeight;
      const s = Math.min(scaleX, scaleY, 1);
      card.style.transform = `scale(${s})`;
      card.style.transformOrigin = "top center";
    };
    scale();
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.card} ref={cardRef}>
        {/* ── Watercolor background blobs ─────────────────── */}
        <svg
          className={styles.watercolorLayer}
          viewBox="0 0 559 794"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="wc1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
            <filter id="wc2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            <filter id="wc3" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="28" />
            </filter>
          </defs>
          {/* top-right blob */}
          <ellipse
            cx="490"
            cy="95"
            rx="68"
            ry="52"
            fill="#e8b4b0"
            opacity="0.12"
            filter="url(#wc1)"
          />
          {/* middle-left blob */}
          <ellipse
            cx="65"
            cy="420"
            rx="55"
            ry="70"
            fill="#e8b4b0"
            opacity="0.10"
            filter="url(#wc2)"
          />
          {/* bottom-right blob */}
          <ellipse
            cx="460"
            cy="680"
            rx="80"
            ry="58"
            fill="#dda8a4"
            opacity="0.09"
            filter="url(#wc3)"
          />
          {/* center hint */}
          <ellipse
            cx="280"
            cy="520"
            rx="120"
            ry="40"
            fill="#e8c4c0"
            opacity="0.06"
            filter="url(#wc2)"
          />
        </svg>

        {/* ── Balloon top-left ────────────────────────────── */}
        <svg
          className={styles.balloon}
          viewBox="0 0 160 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="balloonBlur" x="-40%" y="-30%" width="180%" height="160%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
            <filter id="balloonShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <radialGradient id="balloonGrad" cx="34%" cy="28%" r="68%">
              <stop offset="0%" stopColor="#f7dbd8" />
              <stop offset="45%" stopColor="#e8a8a2" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#d48880" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#c47870" stopOpacity="0.55" />
            </radialGradient>
          </defs>
          {/* Soft ambient glow */}
          <ellipse cx="78" cy="100" rx="72" ry="88" fill="#e8a8a2" opacity="0.2" filter="url(#balloonBlur)" />
          {/* Shadow under balloon */}
          <ellipse cx="80" cy="108" rx="52" ry="62" fill="#c07068" opacity="0.12" filter="url(#balloonShadow)" />
          {/* Main balloon body — organic watercolor shape */}
          <path
            d="M78 18 C104 16 128 38 132 66 C138 98 124 132 104 148 C92 158 80 160 72 158 C54 156 36 144 28 124 C18 100 22 68 36 48 C48 30 64 20 78 18Z"
            fill="url(#balloonGrad)"
            opacity="0.82"
          />
          {/* Secondary watercolor layer for depth */}
          <path
            d="M82 22 C106 22 126 44 128 72 C130 100 116 130 98 144 C86 152 74 154 66 150 C50 144 38 128 32 108 C26 88 32 62 46 46 C58 32 70 22 82 22Z"
            fill="#e8a8a2"
            opacity="0.18"
          />
          {/* Highlight — organic irregular shape */}
          <path
            d="M52 44 C56 36 68 34 74 40 C78 44 76 56 68 62 C60 68 50 64 48 56 C46 50 48 48 52 44Z"
            fill="white"
            opacity="0.32"
          />
          {/* Small secondary highlight */}
          <ellipse cx="100" cy="52" rx="5" ry="8" fill="white" opacity="0.14" transform="rotate(-20 100 52)" />
          {/* Knot */}
          <path d="M80 158 C86 165 84 171 80 168 C76 171 74 165 80 158Z" fill="#c07870" opacity="0.72" />
          {/* String — long organic curve */}
          <path
            d="M80 168 C88 180 76 196 84 212 C90 224 78 238 82 252 C84 260 80 270 78 276"
            stroke="#9a6858"
            strokeWidth="1.0"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
          {/* Small sparkle near balloon */}
          <g transform="translate(128, 60)" opacity="0.45">
            <path d="M0-5 C0.4-1.8 1.8 0 5 0 C1.8 0.4 0 1.8 0 5 C-0.4 1.8 -1.8 0 -5 0 C-1.8 -0.4 0 -1.8 0 -5Z" fill="#c9908a" />
          </g>
          <g transform="translate(14, 80)" opacity="0.3">
            <path d="M0-3 C0.25-1.1 1.1 0 3 0 C1.1 0.25 0 1.1 0 3 C-0.25 1.1 -1.1 0 -3 0 C-1.1 -0.25 0 -1.1 0 -3Z" fill="#c9908a" />
          </g>
        </svg>

        {/* ── Stars scattered ─────────────────────────────── */}
        <svg
          className={styles.starsLayer}
          viewBox="0 0 559 794"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Large 4-pointed star top-right */}
          <g transform="translate(440, 55)" opacity="0.6">
            <path d="M0-9 C0.7-3 3 0 9 0 C3 0.7 0 3 0 9 C-0.7 3 -3 0 -9 0 C-3 -0.7 0 -3 0 -9Z" fill="#c9908a" />
          </g>
          {/* Medium star top-right cluster */}
          <g transform="translate(472, 36)" opacity="0.38">
            <path d="M0-5 C0.4-1.8 1.8 0 5 0 C1.8 0.4 0 1.8 0 5 C-0.4 1.8 -1.8 0 -5 0 C-1.8 -0.4 0 -1.8 0 -5Z" fill="#c9908a" />
          </g>
          <g transform="translate(460, 82)" opacity="0.28">
            <path d="M0-3.5 C0.3-1.2 1.2 0 3.5 0 C1.2 0.3 0 1.2 0 3.5 C-0.3 1.2 -1.2 0 -3.5 0 C-1.2 -0.3 0 -1.2 0 -3.5Z" fill="#c9908a" />
          </g>
          {/* right side — large star with extra lines */}
          <g transform="translate(518, 195)" opacity="0.5">
            <path d="M0-8 C0.6-2.8 2.8 0 8 0 C2.8 0.6 0 2.8 0 8 C-0.6 2.8 -2.8 0 -8 0 C-2.8 -0.6 0 -2.8 0 -8Z" fill="#c9908a" />
            {/* Extra diagonal lines */}
            <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke="#c9908a" strokeWidth="0.8" opacity="0.5" />
            <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5" stroke="#c9908a" strokeWidth="0.8" opacity="0.5" />
          </g>
          {/* left side */}
          <g transform="translate(44, 210)" opacity="0.38">
            <path d="M0-5 C0.4-1.8 1.8 0 5 0 C1.8 0.4 0 1.8 0 5 C-0.4 1.8 -1.8 0 -5 0 C-1.8 -0.4 0 -1.8 0 -5Z" fill="#c9908a" />
          </g>
          {/* above QR right — asterisk-style star */}
          <g transform="translate(496, 395)" opacity="0.48">
            <path d="M0-7 C0.5-2.5 2.5 0 7 0 C2.5 0.5 0 2.5 0 7 C-0.5 2.5 -2.5 0 -7 0 C-2.5 -0.5 0 -2.5 0 -7Z" fill="#c9908a" />
            <line x1="-5" y1="-5" x2="5" y2="5" stroke="#c9908a" strokeWidth="0.9" opacity="0.45" />
            <line x1="5" y1="-5" x2="-5" y2="5" stroke="#c9908a" strokeWidth="0.9" opacity="0.45" />
          </g>
          {/* below QR left */}
          <g transform="translate(60, 608)" opacity="0.3">
            <path d="M0-4 C0.3-1.5 1.5 0 4 0 C1.5 0.3 0 1.5 0 4 C-0.3 1.5 -1.5 0 -4 0 C-1.5 -0.3 0 -1.5 0 -4Z" fill="#c9908a" />
          </g>
          {/* dots/tiny sparkles */}
          <circle cx="450" cy="30" r="2" fill="#c9908a" opacity="0.42" />
          <circle cx="506" cy="314" r="1.2" fill="#c9908a" opacity="0.35" />
          <circle cx="50" cy="348" r="1.3" fill="#c9908a" opacity="0.3" />
          <circle cx="40" cy="130" r="1.2" fill="#c9908a" opacity="0.38" />
          <circle cx="485" cy="68" r="1.4" fill="#c9908a" opacity="0.3" />
          <circle cx="530" cy="165" r="1" fill="#c9908a" opacity="0.28" />
        </svg>

        {/* ── Cake icon ───────────────────────────────────── */}
        <svg
          className={styles.cakeIcon}
          viewBox="0 0 36 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Single candle */}
          <line x1="18" y1="6" x2="18" y2="13" stroke="#9a8878" strokeWidth="1.4" />
          {/* Flame — organic teardrop */}
          <path d="M18 3 C19.5 4.5 20 6.5 18 7.5 C16 6.5 16.5 4.5 18 3Z" fill="#e8b070" opacity="0.95" />
          {/* Flame inner */}
          <path d="M18 4.5 C18.8 5.3 19 6.2 18 6.8 C17 6.2 17.2 5.3 18 4.5Z" fill="#f5d080" opacity="0.7" />
          {/* Top layer */}
          <path d="M8 13 C8 12.4 8.4 12 9 12 L27 12 C27.6 12 28 12.4 28 13 L28 19 C28 19.6 27.6 20 27 20 L9 20 C8.4 20 8 19.6 8 19 Z" stroke="#9a8878" strokeWidth="1.2" />
          {/* Frosting drips */}
          <path d="M9 12 Q11 10 13 12 Q15 14 17 12 Q19 10 21 12 Q23 14 25 12 Q27 10 28 12" stroke="#c9908a" strokeWidth="1.1" fill="none" opacity="0.75" />
          {/* Bottom layer */}
          <path d="M6 20 C6 19.4 6.4 19 7 19 L29 19 C29.6 19 30 19.4 30 20 L30 29 C30 29.6 29.6 30 29 30 L7 30 C6.4 30 6 29.6 6 29 Z" stroke="#9a8878" strokeWidth="1.2" />
          {/* Frosting drips bottom layer */}
          <path d="M7 19 Q9.5 17.5 12 19 Q14.5 20.5 17 19 Q19.5 17.5 22 19 Q24.5 20.5 27 19 Q28.5 17.5 30 19" stroke="#c9908a" strokeWidth="0.9" fill="none" opacity="0.55" />
          {/* Base plate */}
          <path d="M5 30 Q5.5 32 6.5 32 L29.5 32 Q30.5 32 31 30" stroke="#9a8878" strokeWidth="1.1" opacity="0.6" />
        </svg>

        {/* ── FELIZ + Cumpleaños overlapping block ─────────── */}
        <div className={styles.titleBlock}>
          <h1 className={styles.titleFeliz}>FELIZ</h1>
          <div className={styles.cumpleGroup}>
          <p className={styles.titleCumple}>cumpleaños!</p>
          {/* Hand-drawn underline stroke */}
          <svg
            className={styles.cumpleUnderline}
            viewBox="0 0 200 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M4 6 C20 4 50 7 80 5 C110 3 140 6 168 4.5 C180 4 192 5.5 198 5"
              stroke="#c28780"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Small decorative dash to right */}
            <path
              d="M188 2 L196 2"
              stroke="#c28780"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────── */}
        <div className={styles.divider} />

        {/* ── Subtitle ────────────────────────────────────── */}
        <p className={styles.subtitle}>Hoy es tu día,</p>
        <p className={styles.subtitle}>
          y alguien preparó algo{" "}
          <span className={styles.highlight}>especial</span> para ti.
        </p>

        {/* ── QR card with doodles ────────────────────────── */}
        <div className={styles.qrWrapper}>
          {/* Hand-drawn doodles around QR */}
          <svg
            className={styles.doodlesQr}
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Corner doodles */}
            {/* top-left */}
            <circle cx="24" cy="24" r="4" stroke="#c9908a" strokeWidth="0.8" opacity="0.45" />
            <circle cx="24" cy="24" r="8" stroke="#c9908a" strokeWidth="0.6" opacity="0.25" strokeDasharray="2 3" />
            <path d="M36 16 L42 10" stroke="#c9908a" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
            <path d="M14 36 L10 42" stroke="#c9908a" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
            {/* top-right */}
            <circle cx="296" cy="24" r="4" stroke="#c9908a" strokeWidth="0.8" opacity="0.45" />
            <circle cx="296" cy="24" r="8" stroke="#c9908a" strokeWidth="0.6" opacity="0.25" strokeDasharray="2 3" />
            <path d="M284 16 L278 10" stroke="#c9908a" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
            <path d="M306 36 L310 42" stroke="#c9908a" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
            {/* bottom-left */}
            <circle cx="24" cy="296" r="4" stroke="#c9908a" strokeWidth="0.8" opacity="0.45" />
            <circle cx="24" cy="296" r="8" stroke="#c9908a" strokeWidth="0.6" opacity="0.25" strokeDasharray="2 3" />
            <path d="M36 304 L42 310" stroke="#c9908a" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
            <path d="M14 284 L10 278" stroke="#c9908a" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
            {/* bottom-right */}
            <circle cx="296" cy="296" r="4" stroke="#c9908a" strokeWidth="0.8" opacity="0.45" />
            <circle cx="296" cy="296" r="8" stroke="#c9908a" strokeWidth="0.6" opacity="0.25" strokeDasharray="2 3" />
            <path d="M284 304 L278 310" stroke="#c9908a" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
            <path d="M306 284 L310 278" stroke="#c9908a" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
            {/* Small scattered dots */}
            <circle cx="160" cy="12" r="1.5" fill="#c9908a" opacity="0.3" />
            <circle cx="180" cy="308" r="1.5" fill="#c9908a" opacity="0.3" />
            <circle cx="12" cy="160" r="1.5" fill="#c9908a" opacity="0.3" />
            <circle cx="308" cy="140" r="1.5" fill="#c9908a" opacity="0.3" />
            {/* tiny cross marks */}
            <g opacity="0.3" stroke="#c9908a" strokeWidth="0.7" strokeLinecap="round">
              <line x1="50" y1="8" x2="54" y2="12" />
              <line x1="54" y1="8" x2="50" y2="12" />
            </g>
            <g opacity="0.3" stroke="#c9908a" strokeWidth="0.7" strokeLinecap="round">
              <line x1="266" y1="308" x2="270" y2="312" />
              <line x1="270" y1="308" x2="266" y2="312" />
            </g>
          </svg>

          <div className={styles.qrCard}>
            {/*
             * ── QR CODE PLACEHOLDER ────────────────────────
             * Replace the contents of this div with your QR.
             * Example: <img src="/qr.png" width="264" height="264" alt="QR" />
             * Or:      <img src={qrDataUrl} width="264" height="264" alt="QR" />
             * The container is 66×66mm (≈250×250px at 96dpi).
             */}
            <div className={styles.qrPlaceholder} id="qr-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/qr.png" width="250" height="250" alt="QR" style={{ display: "block" }} />
            </div>
          </div>
        </div>

        {/* ── Torn paper strip with tape ───────────────────── */}
        <div className={styles.tornWrapper}>
          <div className={styles.tape} />
          {/* Torn top edge SVG */}
          <svg
            className={styles.tornTop}
            viewBox="0 0 400 12"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12 L0 7 L4 10 L8 4 L12 9 L16 3 L20 8 L24 2 L28 7 L32 3 L36 9 L40 4 L44 8 L48 2 L52 7 L56 4 L60 10 L64 3 L68 8 L72 2 L76 7 L80 3 L84 9 L88 5 L92 10 L96 2 L100 7 L104 4 L108 9 L112 2 L116 7 L120 3 L124 8 L128 4 L132 10 L136 2 L140 7 L144 3 L148 9 L152 5 L156 8 L160 2 L164 7 L168 3 L172 9 L176 4 L180 8 L184 2 L188 7 L192 4 L196 9 L200 3 L204 8 L208 2 L212 7 L216 4 L220 10 L224 3 L228 7 L232 2 L236 8 L240 4 L244 9 L248 3 L252 7 L256 2 L260 8 L264 5 L268 9 L272 3 L276 7 L280 2 L284 8 L288 4 L292 10 L296 3 L300 7 L304 2 L308 8 L312 4 L316 9 L320 3 L324 7 L328 2 L332 8 L336 5 L340 10 L344 3 L348 7 L352 2 L356 8 L360 4 L364 9 L368 3 L372 7 L376 2 L380 8 L384 5 L388 10 L392 3 L396 7 L400 4 L400 12 Z"
              fill="#f5ede0"
            />
          </svg>
          <div className={styles.tornBody}>
            <p className={styles.tornText}>Escanéa para descubrirlo.</p>
            <svg
              width="80"
              height="14"
              viewBox="0 0 80 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block", margin: "1.5mm auto 0" }}
            >
              {/* Thin line */}
              <path
                d="M4 5 C16 3.5 36 5.5 40 5 C44 4.5 64 3.5 76 5"
                stroke="#c28780"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.6"
              />
              {/* Heart centered below */}
              <path
                d="M40 9.5 C40 9.5 36 7 36 5.5 C36 4.2 37.3 3.5 38.5 4 C39.2 4.3 40 5 40 5 C40 5 40.8 4.3 41.5 4 C42.7 3.5 44 4.2 44 5.5 C44 7 40 9.5 40 9.5Z"
                fill="#c28780"
                opacity="0.65"
              />
            </svg>
          </div>
          {/* Torn bottom edge SVG */}
          <svg
            className={styles.tornBottom}
            viewBox="0 0 400 12"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0 L0 5 L4 2 L8 8 L12 3 L16 9 L20 4 L24 10 L28 5 L32 1 L36 7 L40 3 L44 9 L48 4 L52 8 L56 2 L60 6 L64 10 L68 4 L72 8 L76 2 L80 7 L84 3 L88 9 L92 4 L96 10 L100 5 L104 1 L108 7 L112 3 L116 9 L120 4 L124 8 L128 2 L132 6 L136 10 L140 4 L144 8 L148 2 L152 7 L156 3 L160 9 L164 5 L168 1 L172 7 L176 3 L180 9 L184 4 L188 8 L192 2 L196 6 L200 10 L204 4 L208 8 L212 2 L216 7 L220 3 L224 9 L228 5 L232 1 L236 7 L240 3 L244 9 L248 4 L252 8 L256 2 L260 7 L264 3 L268 9 L272 5 L276 1 L280 7 L284 3 L288 9 L292 4 L296 8 L300 2 L304 7 L308 3 L312 9 L316 5 L320 10 L324 4 L328 8 L332 2 L336 7 L340 3 L344 9 L348 5 L352 1 L356 7 L360 3 L364 9 L368 4 L372 8 L376 2 L380 7 L384 3 L388 9 L392 5 L396 8 L400 3 L400 0 Z"
              fill="#f5ede0"
            />
          </svg>
        </div>

        {/* ── Lock + footer text ───────────────────────────── */}
        <div className={styles.lockSection}>
          <svg
            className={styles.lockIcon}
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1" y="6" width="10" height="7.5" rx="1.2" stroke="#9a8880" strokeWidth="1" />
            <path
              d="M3 6 L3 4 C3 2.34 4.34 1 6 1 C7.66 1 9 2.34 9 4 L9 6"
              stroke="#9a8880"
              strokeWidth="1"
            />
            <circle cx="6" cy="9.5" r="1.2" fill="#9a8880" opacity="0.7" />
          </svg>
          <p className={styles.lockText}>Ábrelo cuando estés lista.</p>
        </div>
      </div>
    </div>
  );
}
