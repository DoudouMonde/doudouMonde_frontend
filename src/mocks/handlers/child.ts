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
  http.get(`${API}/v1/child/:id`, async ({ params }) => {
    await delay(300);
    const id = Number(params);
    if (Number.isNaN(id)) {
      return HttpResponse.json(
        { message: "Invalid id" },
        {
          status: 400,
        }
      );
    }

    const item = childDb.get(id);
    if (!item) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    return HttpResponse.json(item, { status: 200 });
  }),

  //아이 삭제
  http.delete(`${API}/v1/child/:id`, async ({ params }) => {
    await delay(300);
    const id = Number(params);
    if (Number.isNaN(id)) {
      return HttpResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    const ok = childDb.remove(id);
    if (!ok) {
      return HttpResponse.json({ messages: "Not Found" }, { status: 404 });
    }
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];
