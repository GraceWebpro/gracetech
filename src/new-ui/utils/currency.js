// utils/currency.js
export const formatNairaFromUSD = (usd) => {
  const rate = 1600; // your conversion rate

  const amount = Number(usd);

  if (!amount || isNaN(amount)) return "₦0";

  return `₦${(amount * rate).toLocaleString()}`;
};