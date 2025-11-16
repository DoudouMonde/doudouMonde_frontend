//LocalDate [2025, 9, 30] -> 2025.09.30
export const toYYYYMMDD = (localDate: [number, number, number]) => {
  return `${localDate[0]}.${localDate[1]}.${localDate[2]}`;
};
