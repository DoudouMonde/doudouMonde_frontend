// 로컬스토리지 키
export const STORAGE_KEY_NAMES = "childNames";        // 원본 이름 목록(표시용)
export const STORAGE_KEY_NAMES_NORM = "childNamesNorm"; // 정규화된 이름 목록(중복 체크용)

export const loadJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const saveJson = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 필요하면 console.error(e)
  }
};
