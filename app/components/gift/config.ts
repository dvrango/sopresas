export const PHOTOS = [
  "/photos/IMG_8990.jpg",
  "/photos/IMG_9441.jpg",
  "/photos/IMG_9467.jpg",
  "/photos/IMG_9453.jpg",
  "/photos/IMG_9233.jpg",
];

// ─── EDIT THIS SECTION ────────────────────────────────────────────────────────
export const CONFIG = {
  recipientName: "Sofía",
  senderName: "Tu amor",
  date: "29 de mayo, 2026",
  birthdayAge: "21",
  birthdayMessage:
    "espero que recuerdes este día durante el resto de tu vida, diviértete como una niña, y disfrútalo como una reina",
  moments: [
    {
      roman: "I",
      title: "El primer día",
      text: "Desde que te vi, algo en el mundo cambió de forma permanente.",
    },
    {
      roman: "II",
      title: "Lo que más admiro",
      text: "Tu fuerza callada. La forma en que iluminas los cuartos sin saber que lo haces.",
    },
    {
      roman: "III",
      title: "Lo que quiero para ti",
      text: "Que cada mañana sepas que existes en los pensamientos de alguien.",
    },
  ],
  letter: [
    "Hay personas que entran a tu vida",
    "y reorganizan todo sin tocarlo.",
    "",
    "Tú eres una de esas personas.",
    "",
    "Este momento lo creé para ti,",
    "para que sepas que hay alguien",
    "que piensa en tu sonrisa",
    "cuando nadie más está mirando.",
    "",
    "Con todo lo que tengo,",
  ],
  signature: "Siempre tuyo.",
  finalLine1: "Para siempre,",
  finalLine2: "tuya.",
};
// ──────────────────────────────────────────────────────────────────────────────

export const R = "#e896b0";
export const rose = (a: number) => `rgba(232,150,176,${a})`;
export const lavender = (a: number) => `rgba(200,160,212,${a})`;
export const cream = (a: number) => `rgba(248,236,242,${a})`;

export const PASSWORD = "17032026";
export const DISNEY_PIN = "0000";

export type Scene =
  | "password"
  | "dateSuccess"
  | "intro"
  | "name"
  | "birthday"
  | "photos"
  | "moments"
  | "letter"
  | "finale";
