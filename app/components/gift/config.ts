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

export const BIRTHDAY_ISO = process.env.NEXT_PUBLIC_BIRTHDAY_ISO ?? "2026-06-07";
export const hasBirthdayArrived = () => {
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return today >= BIRTHDAY_ISO;
};

// ─── EDIT THIS SECTION ────────────────────────────────────────────────────────
export const CONFIG = {
  recipientName: "Cami",
  senderName: "Angel",
  date: "7 de Junio de 2026",
  birthdayAge: "21",
  birthdayMessage:
    "espero que recuerdes este día durante el resto de tu vida, que te diviertas como una niña, y lo disfrutes como una reina",
  moments: [
    {
      roman: "I",
      title: "Nuestra historia",
      text: "Me encanto conocerte, me quedo todo lo bonito que vivimos juntos",
    },
    {
      roman: "II",
      title: "Nos faltaron fotos",
      text: "Aqui hubiera puesto mas fotos bonitas pero no me queriass pasaaaarr jaja",
    },
    {
      roman: "III",
      title: "Te deseo lo mejor",
      text: "Que te pasen muchas cosas bonitas, q aprendas a andar en bici y todo lo que te propongas de aqui en adelante.",
    },
  ],
  letter: [
    "Quería dejarte algo bonito",
    "para el día de tu cumpleaños.",
    "",
    "Hay recuerdos contigo",
    "que siempre voy a guardar.",
    "",
    "Ojala que estes en ese hotel disfrutando tu día como querias,",
    "y que este detalle te saque una sonrisa y me recuerdes con cariño.",

    "Feliz cumpleaños Cami,",
    "te mando un abrazo y un beso.",
  ],
  signature: "Con mucho cariño,",
  finalLine1: "Que disfrutes muchisimo",
  finalLine2: "tus 21's.",

  // ─── SCRIPT / DIALOGUES ───────────────────────────────────────────────────
  script: {
    introDialog: (arrived: boolean) => [
      { text: "oye…", delay: 800 },
      { text: arrived ? "hoy es un día especial, ¿verdad?" : "se acerca un día especial, ¿verdad?", delay: 2800 },
      { text: "creias que lo había olvidado?", delay: 5200 },
      { text: arrived ? "te preparé este detalle por tu cumple." : "te preparé una sorpresa.", delay: 7800, suspense: true },
      { text: "pero espera un momento.", delay: 10400, suspense: true },
      { text: "antes necesitamos una pequeña prueba de seguridad.", delay: 13400, resetBefore: true },
      { text: "no vaya a ser que alguien más lo abra.", delay: 16400 },
      { text: "y no quiero que eso pase…", delay: 19400 },
    ] as DialogLine[],

    pinSuccessDialog: [
      { text: "jajaja muy bieeen…", delay: 400 },
      { text: "difícil de adivinar eeh por cierto.", delay: 3200 },
      { text: "a ver, pero esa estuvo fácil.", delay: 5200 },
      { text: "aquí va una prueba más.", delay: 7000 },
    ] as DialogLine[],

    dateInput: {
      question: "La pregunta del millon es...",
      subtitle: "¿que dia nos conocimos?",
      wrongAnswer: "¿¿mmm no te acuerdas?? ♡",
    },

    pinInput: {
      question: "primero, una pregunta…",
      subtitle: "recuerdas tu dificilisimo pin de Disney+?",
      wrongAnswer: "ya no te acuerdas de tu pin??",
    },

    dateSuccess: {
      headline: "¡Genial!",
      subtitle: "mira q buena memoria tienes, eh",
      ctaReady: "¿Estás lista?",
      ctaStart: "toca aquí para iniciar",
    },

    birthday: {
      label: "feliz cumpleaños",
      heroWord: "Camiii",
    },

    name: {
      label: "esto es para ti",
    },

    surprise: {
      intro: "algunas estrellas esconden cosas, toca una y descúbrelo",
      overlayIntro: "cada estrella es algo que descubrí de ti…",
      hint: "",
      stars: [
        { name: "tu risa", text: "Especialmente con las cosquillas", x: 22, y: 14 },
        { name: "tu musica", text: "Nunca la entendi jaja pero debo aceptar que algunas canciones si eran buenas", x: 62, y: 19 },
        { name: "trabajadora y responsable", text: "Levantarte a las 5 am y con 20 alarmas y asi irte a trabajar, me decia mucho de ti", x: 78, y: 36 },
        { name: "tu de chiquita", text: "Querias ser maestra, y tu primer recuerdo es cuando sentias tus manos quemadas en el kinder", x: 42, y: 27 },
        { name: "tu autenticidad", text: "Nunca tratas de ser otra persona. Y tu forma de vestir y arreglarte siempre me encanto", x: 28, y: 46 },
        { name: "lo que no te gusta", text: "Nopales, menudo, higado, champiñones y que no te muerdaa. Ah y los chiles rellenos definitivamente.", x: 68, y: 54 },
        { name: "tus tatuajes", text: "Made in heaven mi fav, pero no te hagas ese blackout porfavor", x: 18, y: 66 },
        { name: "tu lado cariñoso", text: "Mas cuando se te acerca un perrito de la callee", x: 52, y: 71 },
        { name: "lo que inspiras", text: "Conocerte me hizo querer ser mejor. Eso no te lo había dicho.", x: 78, y: 73 },
        { name: "tus pasatiempos", text: "Te gusta escribir, tejer y hacer pasteles. Mmm lo de cocinar aun no se si me lo creo eh jaja ntc", x: 36, y: 76 },
        { name: "una última cosa", text: "Espero que sonrías cuando recuerdes esto.", x: 50, y: 48 },
      ],
      connections: [[0, 3], [3, 1], [1, 2], [0, 4], [3, 4], [2, 5], [4, 6], [5, 7], [5, 8], [7, 8], [6, 7], [7, 9]],
    },

    countdown: {
      title: "aguanta un poco maaaasss Camii",
      subtitle: "aún no es tu cumpleaños 🙈",
      hint: "ya falta poco",
      tease: "la paciencia es una virtud, ¿recuerdas? :)",
    },

    chestIntroDialog: [
      { text: "¿lista para ver tu regalo?", delay: 800 },
      { text: "pero una última prueba primero…", delay: 2800 },
      { text: "ya ves que aquí si nos tomamos la seguridad muy en serio", delay: 5400 },
      { text: "jajajaj", delay: 8600 },
    ] as DialogLine[],

    chestPuzzle: {
      question: "¿recuerdas la última película que vimos juntos en el cine?",
      wrongAnswer: "como q no te acuerdass?? 😠",
      successText: "¡exacto! sabía que te acordabas.",
    },

    birthdayArrivalDialog: [
      { text: "oye…", delay: 600 },
      { text: "¡por fin llegó!", delay: 2000 },
      { text: "sabía que esperabas este día con muchísimas ganas.", delay: 4000, suspense: true },
      { text: "hoy cumples 21.", delay: 7000 },
      { text: "este día es tuyo, Cami.", delay: 9200, suspense: true },
      { text: "deseo que lo disfrutes muchísimo", delay: 12000 },
    ] as DialogLine[],
  },
};
// ──────────────────────────────────────────────────────────────────────────────

export const R = "#e896b0";
export const rose = (a: number) => `rgba(232,150,176,${a})`;
export const lavender = (a: number) => `rgba(200,160,212,${a})`;
export const cream = (a: number) => `rgba(248,236,242,${a})`;

export const PASSWORD = "17032026";
export const DISNEY_PIN = "0000";
export const MOVIE_ANSWER = "el diablo viste a la moda 2"; // cambia esto a la película correcta

export type Scene =
  | "volume"
  | "password"
  | "dateSuccess"
  | "countdown"
  | "birthdayTap"
  | "birthdayArrival"
  | "chestIntro"
  | "chestPuzzle"
  | "intro"
  | "name"
  | "birthday"
  | "photos"
  | "moments"
  | "letter"
  | "finale"
  | "return"
  | "surprise"
  | "sonrisa";
