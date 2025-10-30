import { Gender, Profile } from "@/shared/types";
import { PostChildRegistrationRequest } from "@/domains/child/types/childApiTypes";
import { ChildRecord } from "@/domains/child/types/childApiTypes";

const KEY = "__mock_child_db__";

// / 초기 목업 데이터 정의
const INITIAL_MOCK_CHILDREN: ChildRecord[] = [
  {
    id: 1,
    name: "도윤 (Mock)",
    profile: Profile.CAT,
    birthday: "2020-05-15",
    gender: Gender.MALE,
  },
  {
    id: 2,
    name: "서아 (Mock)",
    profile: Profile.RABBIT,
    birthday: "2021-08-22",
    gender: Gender.FEMALE,
  },
  {
    id: 3,
    name: "하준 (Mock)",
    profile: Profile.DOG,
    birthday: "2019-11-01",
    gender: Gender.MALE,
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
  create(input: PostChildRegistrationRequest): ChildRecord {
    const id = ++seq;
    const rec: ChildRecord = { id, ...input };
    store = [rec, ...store];
    save(store);
    return rec;
  },
};
