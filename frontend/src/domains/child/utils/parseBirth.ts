export const parseBirth = (iso: string) => {
  const [year, month, day] = iso.split("-");
  return { year, month, day };
};

export const joinBirth = (y: string, m: string, d: string) =>
  `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
