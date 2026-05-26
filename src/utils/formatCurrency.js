/**
 * Format a number as Indonesian Rupiah currency.
 * @param {number} amount - The amount in IDR
 * @returns {string} Formatted string like "Rp 25.000"
 */
export function formatCurrency(amount) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

/**
 * Format a number as compact currency for map pins.
 * @param {number} amount - The amount in IDR
 * @returns {string} Formatted string like "Rp 25.000"
 */
export function formatCurrencyCompact(amount) {
  if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1)}jt`;
  }
  return `Rp ${(amount / 1000).toFixed(0)}.000`;
}
