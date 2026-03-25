/**
 * Colombo di Pasqua — zelfde venster als de spotlight-pop-up (bestellen t/m 3 april).
 */
export const COLOMBO_PASQUA = {
  campaignId: "pasqua-di-colombo-pasen-2026",
  /** Bestellen mogelijk vanaf (inclusief) */
  orderFrom: "2026-03-10",
  /** Laatste dag om te bestellen (inclusief), gelijk aan pop-up */
  orderUntil: "2026-04-03",
  label: "Colombo di Pasqua",
  /** Weergave in formulier en mails */
  priceLabel: "€ 10,50",
} as const;

/** Voor in bestellijst / API: vaste productnaam */
export const COLOMBO_PASQUA_ORDER_LABEL = "Colombo di Pasqua (€ 10,50 per stuk)";
