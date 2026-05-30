const getSessionId = (): string => {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem("regalo_sid");
  if (!id) {
    id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    sessionStorage.setItem("regalo_sid", id);
  }
  return id;
};

export const track = (event: string, data?: Record<string, unknown>): void => {
  fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      ...data,
      sid: getSessionId(),
      ts: new Date().toISOString(),
    }),
  }).catch(() => {});
};
