// utils/currency.js
export const USD_TO_NGN = 1550;


export const formatNairaFromUSD = (priceUSD) => {
    return `₦${(priceUSD * USD_TO_NGN).toLocaleString()}`;
  };