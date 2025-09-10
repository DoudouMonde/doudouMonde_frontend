export const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString()}원`;
};

export const formatNegativeCurrency = (amount: number) => {
  return `- ${Math.abs(amount).toLocaleString()}원`;
};
