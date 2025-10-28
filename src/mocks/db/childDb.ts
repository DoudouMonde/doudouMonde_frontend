// 간단한 인메모리 + localStorage persist DB
export type ChildRecord = {
  id: number;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender?: "M" | "F";
  // selectedTraits: string[];
  // selectedGenres: string[];
  selectedProfile: string; // 예: "CAT"
};

const KEY = "__mock_child_db__";

function load(): ChildRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ChildRecord[]) : [];
  } catch {
    return [];
  }
}
function save(data: ChildRecord[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

let seq = 1000;
let store: ChildRecord[] = load();

export const childDb = {
  list() {
    return store;
  },
  create(input: Omit<ChildRecord, "id">) {
    const id = ++seq;
    const rec: ChildRecord = { id, ...input };
    store = [rec, ...store];
    save(store);
    return rec;
  },
  updateName(id: number, name: string) {
    const idx = store.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    store[idx] = { ...store[idx], name };
    save(store);
    return store[idx];
  },
  updateProfile(id: number, profile: string) {
    const idx = store.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    store[idx] = { ...store[idx], selectedProfile: profile };
    save(store);
    return store[idx];
  },
};
