export const normalizeName = (raw: string) =>
  raw.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();
