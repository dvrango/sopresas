export interface DialogLine {
  text: string;
  delay: number;
  suspense?: boolean;
  resetBefore?: boolean;
}

export const PHOTOS = [
  "/photos/IMG_9450.webp",
  "/photos/IMG_9453.webp",
  "/photos/IMG_9442.webp",
  "/photos/IMG_8996.webp",
  "/photos/IMG_9467 2.webp",
  "/photos/IMG_9468.webp",
];
export const INTRO_PHOTO_COUNT = 2;

// ─── EDIT THIS SECTION ────────────────────────────────────────────────────────
export const CONFIG = {
  recipientName: "Cami",
  senderName: "Angel",
  date: "29 de mayo, 2026",
  birthdayAge: "21",
  birthdayMessage:
    "espero que recuerdes este día durante el resto de tu vida, que te diviertas como una niña, y lo disfrutes como una reina",
  moments: [
    {
      roman: "I",
      title: "Los buenos recuerdos",
      text: "Me llevo todo lo bonito que vivimos juntos",
    },
    {
      roman: "II",
      title: "Lo que admiro de ti",
      text: "Eres una persona con muchísima luz y determinación. Sigue siendo tan auténtica.",
    },
    {
      roman: "III",
      title: "Mis mejores deseos",
      text: "Que la vida te llene de éxitos, paz y que cumplas todo lo que te propongas en esta nueva etapa.",
    },
  ],
  letter: [
    "Quería dejarte un último detalle",
    "para celebrar tu cumpleaños.",
    "",
    "Aunque nuestros caminos cambien,",
    "te deseo genuinamente lo mejor.",
    "",
    "Eres una gran persona",
    "y mereces que te pasen",
    "puras cosas increíbles",
    "en esta nueva vuelta al sol.",
    "",
    "Te mando un abrazo y un ultimo beso,",
  ],
signature: "Con cariño,",
  finalLine1: "Que disfrutes muchisimo",
  finalLine2: "tus 21's.",

  // ─── SCRIPT / DIALOGUES ───────────────────────────────────────────────────
  script: {
    introDialog: [
      { text: "oye…", delay: 600 },
     { text: "te preparé este detalle por tu cumple.", delay: 1800 },
      { text: "pero espera un momento.", delay: 3400, suspense: true },
      { text: "antes necesitamos una pequeña prueba de seguridad.", delay: 5000, resetBefore: true },
      { text: "no vaya a ser que alguien más lo abra.", delay: 6600 },
      { text: "pues nooo", delay: 8200 },
    ] as DialogLine[],

    pinSuccessDialog: [
      { text: "jajaja muy bieeen…", delay: 400 },
      { text: "difícil de adivinar eeh por cierto.", delay: 3200 },
      { text: "a ver, pero esa estuvo fácil.", delay: 5200 },
      { text: "aquí va una más.", delay: 7000 },
    ] as DialogLine[],

    dateInput: {
      question: "La pregunta del millon es...",
      subtitle: "¿cuándo fue nuestro primer día?",
      wrongAnswer: "¿¿cómo que no sabes?? ♡",
    },

 pinInput: {
      question: "primero, una pregunta…",
      subtitle: "¿cuál es tu pin de Disney+?",
      wrongAnswer: "Noo eres tu, no puede ser... ♡",
    },

   dateSuccess: {
      headline: "¡Genial!",
      subtitle: "mira q buena memoria tienes, eh",
      ctaReady: "¿Estás lista?",
      ctaStart: "toca aquí para iniciar",
    },

    birthday: {
      label: "feliz cumpleaños",
      heroWord: "princesa",
    },

    name: {
      label: "esto es para ti",
    },
  },
};
// ──────────────────────────────────────────────────────────────────────────────

export const R = "#e896b0";
export const rose = (a: number) => `rgba(232,150,176,${a})`;
export const lavender = (a: number) => `rgba(200,160,212,${a})`;
export const cream = (a: number) => `rgba(248,236,242,${a})`;

export const PASSWORD = "17032026";
export const DISNEY_PIN = "0000";

export type Scene =
  | "volume"
  | "password"
  | "dateSuccess"
  | "intro"
  | "name"
  | "birthday"
  | "photos"
  | "moments"
  | "letter"
  | "finale"
  | "return"
  | "surprise";
