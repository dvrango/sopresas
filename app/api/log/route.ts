import { NextRequest, NextResponse } from "next/server";

const MESSAGES: Record<string, (data: Record<string, unknown>) => string> = {
  gift_opened: (d) => {
    const n = d.visit_number as number;
    if (n === 1) return "🎁 Cami abrió el regalo por primera vez!";
    if (n === 2) return "💌 Cami volvió a abrirlo (2da vez)";
    return `💌 Cami abrió el regalo de nuevo (vez #${n})`;
  },
  pin_wrong: (d) => `🔒 PIN incorrecto — puso: ${d.tried}`,
  pin_correct: () => "✅ Adivinó el PIN de Disney+",
  date_wrong: (d) => `📅 Fecha incorrecta — puso: ${d.tried}`,
  gift_unlocked: () => "🔓 Adivinó la fecha!! El regalo está abierto 🎉",
  music_started: () => "🎵 La música empezó a sonar",
  gift_completed: () => "🥹 Llegó al final del regalo!!",
  surprise_visited: () => "🎀 Abrió la sección sorpresa",
  cita_accepted: (d) => `💌 Aceptó la cita!! — Día: ${d.date}, Hora: ${d.time}`,
  cita_changed: (d) => `🔄 Cami cambió la cita — Antes: ${d.prev_date} ${d.prev_time} → Ahora: ${d.date} ${d.time}`,
  cita_declined: () => "💔 Declinó la cita por ahora",
  cita_cancelled: () => "❌ Cami canceló la cita",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, ...data } = body as { event: string } & Record<string, unknown>;

    const format = MESSAGES[event];
    const message = format ? format(data) : `📊 ${event}`;

    const time = new Date().toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Mexico_City",
    });

    console.log(`[${time}] ${message}`);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: `[${time}] ${message}` }),
      });
    }
  } catch {
    // ignore
  }

  return NextResponse.json({ ok: true });
}
