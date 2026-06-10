/**
 * Gera um event_id único para desduplicação entre Meta Pixel e CAPI.
 * O mesmo event_id deve ser enviado no dataLayer (pixel)
 * e também para o servidor (CAPI Gateway).
 */
export function generateEventId(prefix: string): string {
  const random =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID().split("-")[0]
      : Math.random().toString(36).slice(2, 11)
  return `${prefix}_${Date.now()}_${random}`
}
