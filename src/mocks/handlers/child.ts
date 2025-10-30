import { http, HttpResponse, delay } from "msw";
import { z } from "zod";
import { childDb } from "../db/childDb";
import {
  ChildListResponse,
  ChildItemResponse,
} from "@/domains/child/types/childApiTypes";

const ORIGIN = "http://localhost:8080";
const API = `${ORIGIN}/api`;

// 실제 코드에서 사용하는 타입 추정
// ChildRequest를 서버 관점에서 검증 (프론트 zod와 1:1로 안 맞아도 OK)
// const ChildRequestSchema = z.object({
//   name: z.string().min(1),
//   birthYear: z.string().min(1),
//   birthMonth: z.string().min(1),
//   birthDay: z.string().min(1),
//   gender: z.enum(["M", "F"]).optional(),
//   // selectedTraits: z.array(z.string()),
//   // selectedGenres: z.array(z.string()),
//   selectedProfile: z.string(),
// });

// GET /v1/child 응답 타입 추정
// const ChildListResponseSchema = z.object({
//   children: z.array(
//     z.object({
//       id: z.number(),
//       name: z.string(),
//       profile: z.string(),
//     })
//   ),
// });

// PATCH 요청 스키마
const UpdateChildNameRequestSchema = z.object({ name: z.string().min(1) });
const UpdateChildProfileRequestSchema = z.object({
  profile: z.string().min(1),
});

const BASE = ""; // apiRequester의 baseURL을 쓰면 상대경로로도 매칭됨.

export const childHandlers = [
  // 아이 등록
  // http.post(`${API}/v1/child`, async ({ request }) => {
  //   await delay(800); // 네트워크 지연 흉내
  //   const body = await request.json().catch(() => ({}));
  //   const parsed = ChildRequestSchema.safeParse(body);

  //   if (!parsed.success) {
  //     return HttpResponse.json(
  //       { message: "validation error", issues: parsed.error.format() },
  //       { status: 400 }
  //     );
  //   }

  //   const created = childDb.create({
  //     ...parsed.data,
  //   });

  //   // 네 코드에 맞춘 성공 응답
  //   return HttpResponse.json(
  //     { childId: created.id, success: true },
  //     { status: 201 }
  //   );
  // }),

  // 아이 목록
  http.get(`${API}/v1/child`, async () => {
    await delay(300);
    const list = childDb.list().map((c) => ({
      id: c.id,
      name: c.name,
      profile: c.profile,
    }));

    const payload = { items: list };

    return HttpResponse.json(payload, { status: 200 });
  }),

  // 이름 변경
  // http.patch(`${API}/v1/child/:id/name`, async ({ params, request }) => {
  //   await delay(300);
  //   const id = Number(params.id);
  //   const body = await request.json().catch(() => ({}));
  //   const parsed = UpdateChildNameRequestSchema.safeParse(body);

  //   if (!parsed.success) {
  //     return HttpResponse.json(
  //       { message: "validation error", issues: parsed.error.format() },
  //       { status: 400 }
  //     );
  //   }

  //   const updated = childDb.updateName(id, parsed.data.name);
  //   if (!updated)
  //     return HttpResponse.json({ message: "Not Found" }, { status: 404 });

  //   return HttpResponse.json(
  //     { childId: updated.id, name: updated.name },
  //     { status: 200 }
  //   );
  // }),

  // 프로필 변경
  // http.patch(`${BASE}/v1/child/:id/profile`, async ({ params, request }) => {
  //   await delay(300);
  //   const id = Number(params.id);
  //   const body = await request.json().catch(() => ({}));
  //   const parsed = UpdateChildProfileRequestSchema.safeParse(body);

  //   if (!parsed.success) {
  //     return HttpResponse.json(
  //       { message: "validation error", issues: parsed.error.format() },
  //       { status: 400 }
  //     );
  //   }

  //   const updated = childDb.updateProfile(id, parsed.data.profile);
  //   if (!updated)
  //     return HttpResponse.json({ message: "Not Found" }, { status: 404 });

  //   return HttpResponse.json(
  //     { childId: updated.id, profile: updated.selectedProfile },
  //     { status: 200 }
  //   );
  // }),
];
