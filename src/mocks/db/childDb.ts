import { z } from "zod";
import { Gender, Profile } from "@/entities/types";

// 간단한 인메모리 + localStorage persist DB
export type ChildRecord = {
  id: number;
  name: string;
  birthday: string;
  gender: Gender;
  profile: Profile;
};
const KEY = "__mock_child_db__";

// 🌟🌟🌟 초기 목업 데이터 정의 🌟🌟🌟
const INITIAL_MOCK_CHILDREN: ChildRecord[] = [
  {
    id: 1,
    name: "도윤 (Mock)",
    birthday: "2020-05-10",
    gender: Gender.MALE,
    profile: Profile.CAT,
  },
  {
    id: 2,
    name: "서아 (Mock)",
    birthday: "2021-01-20",
    gender: Gender.FEMALE,
    profile: Profile.RABBIT,
  },
  {
    id: 3,
    name: "하준 (Mock)",
    birthday: "2020-11-25",
    gender: Gender.MALE,
    profile: Profile.DOG,
  },
];

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

//localstorage가 없을 때 Mock 데이터를 불러오도록 한다.
if (store.length === 0) {
  console.log(
    "Mock DB :localStorage가 비어 있어 초기 Mock 데이터로 대체합니다."
  );
  store = INITIAL_MOCK_CHILDREN;
  seq = store.reduce((max, child) => Math.max(max, child.id), 0);
}

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
