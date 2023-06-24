export const formatCurrency = (value: number, options?: { cents?: number }): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: options?.cents ?? 0,
  }).format(value);
};