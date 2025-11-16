export const WEIGHT_LIMIT = 20;

const HANGUL_RE = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/;

export const charWeight = (ch: string) => {
  return HANGUL_RE.test(ch) ? 2 : 1;
};

// 가중치 한도 안에서 자르기 (서로게이트 안전: for..of)
export const clampByWeight = (s: string, limit = WEIGHT_LIMIT) => {
  let w = 0;
  let out = "";
  for (const ch of s) {
    const c = charWeight(ch);
    if (w + c > limit) break;
    w += c;
    out += ch;
  }
  return out;
};
