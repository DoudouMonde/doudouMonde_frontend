import { http, HttpResponse, delay } from "msw";
import { childDb } from "../db/childDb";
import { ChildRequestSchema } from "@/domains/child/schemas/ChildRequestSchema";
import { PostChildRegistrationRequest } from "@/domains/child/types/childApiTypes";

const ORIGIN = "http://localhost:8080";
const API = `${ORIGIN}/api`;

export const childHandlers = [
  // 아이 등록
  http.post(`${API}/v1/child`, async ({ request }) => {
    await delay(800); // 네트워크 지연 흉내
    const body = await request.json().catch(() => ({}));
    const parsed = ChildRequestSchema.safeParse(body);

    if (!parsed.success) {
      return HttpResponse.json(
        { message: "validation error", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const requetsData = parsed.data as PostChildRegistrationRequest;

    const created = childDb.create(requetsData);

    return HttpResponse.json(
      { childId: created.id, success: true },
      { status: 201 }
    );
  }),

  // 아이 목록
  http.get(`${API}/v1/child`, async () => {
    //1. 네트워크 지연 흉내
    await delay(300);
    //2. Mcok DB에서 데이터 조회 및 가공
    const list = childDb.list().map((c) => ({
      id: c.id,
      name: c.name,
      profile: c.profile,
    }));
    //3. 최종 응답 페이로드 생성
    const payload = { items: list };
    //4. 응답 반환
    return HttpResponse.json(payload, { status: 200 });
  }),

  //아이 단건 조회
  //childId를 어떻게 보내지?
  http.get("*/api/v1/child/:id", async ({ params }) => {
    await delay(200);

    // 1) id 안전 파싱
    const raw = (Array.isArray(params.id) ? params.id[0] : params.id) as
      | string
      | undefined;
    const id = raw != null ? parseInt(String(raw), 10) : NaN;

    if (!Number.isFinite(id)) {
      console.warn("[MSW] invalid id param:", params.id);
      return HttpResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    // 2) DB 조회
    const item = childDb.get(id);
    if (!item) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(item, { status: 200 });
  }),

  // ✅ 아이 수정 (PATCH)
  http.patch("*/api/v1/child/:id", async ({ params, request }) => {
    await delay(300); // 네트워크 지연 흉내

    const raw = (Array.isArray(params.id) ? params.id[0] : params.id) as
      | string
      | undefined;
    const id = raw != null ? parseInt(String(raw), 10) : NaN;

    if (!Number.isFinite(id)) {
      return HttpResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));

    // ✅ 유효성 검사 (필요한 필드만 검사)
    const parsed = ChildRequestSchema.partial().safeParse(body);
    if (!parsed.success) {
      return HttpResponse.json(
        { message: "Validation error", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    // ✅ DB 업데이트
    // const updated = childDb.update(id, parsed.data);
    // if (!updated) {
    //   return HttpResponse.json({ message: "Not found" }, { status: 404 });
    // }

    // ✅ 성공 (반환값 없이 성공 표시)
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
  //아이 삭제
  http.delete("*/api/v1/child/:id", ({ params }) => {
    // ✅ params.id는 string
    const idStr = params.id as string;
    const id = Number(idStr);

    if (Number.isNaN(id)) {
      return HttpResponse.json(
        { message: "Invalid child id" },
        { status: 400 }
      );
    }

    return new HttpResponse(null, { status: 204 }); // 204 No Content
  }),
];
