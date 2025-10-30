import { ChildFormValues } from "@/domains/child/example/models";
import { Gender, Profile } from "@/shared/types";

/**
 * FeedBack: 아이 생성시 초기값을 가진 객체를 반환하는 함수
 * - 디자인 패턴 중 팩토리 패턴을 적용함
 */
export const createNewChild = (): ChildFormValues => {
  return {
    name: "",
    birthday: "",
    gender: Gender.MALE,
    profile: Profile.DOG,
  };
};
