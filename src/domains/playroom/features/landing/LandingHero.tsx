import { PageContainer } from "@/shared/components/Layout";
// import { BookMakeModal } from "@/shared/components/Modal/BookMakeModal";
import { ActionButton } from "@/shared/components/Button/ActionButton";

import {
  StorytownTree0,
  StorytownTree1,
  StorytownTree2,
  StorytownTree3,
  StorytownTree4,
  StorytownTree5,
  StorytownTree6,
  StorytownTree7,
  StorytownTree8,
  StorytownTree9,
} from "@/assets/icons/playroom/storytown_tree";

const Trees = [
  StorytownTree0,
  StorytownTree1,
  StorytownTree2,
  StorytownTree3,
  StorytownTree4,
  StorytownTree5,
  StorytownTree6,
  StorytownTree7,
  StorytownTree8,
  StorytownTree9,
];
// import { useChildListContext } from "@/domains/child/contexts/ChildListContext";
import { useChildListData } from "@/domains/child/hooks/useChildListData";
import { useReviewList } from "@/domains/review/hooks/useReviewLIst";
import { useReviewAction } from "@/domains/review/hooks/useReviewActions";

//TODO: 책 구매 팝업 구현

export const LandingHero = () => {
  const { reviewCount } = useReviewList();
  const { children } = useChildListData();
  const { handleStart, handleSkip } = useReviewAction();
  const childNames = "서아"; //구현 필요
  const Tree = Trees[Math.min(reviewCount, 9)];

  return (
    <PageContainer>
      {/* {popup && <BookMakeModal onClose={onClosePopup} onPurchase={onPurchase} />} */}
      <section className="relative">
        <figure className="flex z-20 justify-center items-start w-full">
          <Tree className="w-full h-auto object-contain drop-shadow-[0px_0px_5px_rgba(0,0,0.5,0)]" />
        </figure>

        <article className="flex z-20 flex-col gap-0 justify-center items-center mx-auto mt-4">
          <header className="bg-gray-200/70 backdrop-blur-sm rounded-[40px] w-[90%] sm:w-[80%] p-4 sm:p-6 shadow-[0px_0px_12px_0px_rgba(255,246,165,1)]">
            <p className="text-center text-gray-900 text-sm sm:text-base font-normal body-inter-r leading-[1.3] tracking-[-0.04em]">
              안녕 {childNames}!
              <br />
              이야기마을에 온 걸 환영해.
              <br />
              나와 함께 상상친구를 만들면서
              <br />
              우리가 본 공연을 한 번 추억해볼까?
            </p>
          </header>

          <section className="flex z-20 gap-2 justify-center items-center px-4 w-full sm:gap-0 sm:justify-evenly sm:px-0">
            <img
              src="/assets/characters/doudou.png"
              alt="두두 캐릭터"
              className="animate-breathe w-[150px] h-[190px] sm:w-[193px] sm:h-[248px] object-contain drop-shadow-[0px_0px_10px_rgba(202, 255, 133, 0.1)] flex-shrink-0"
            />
            <nav className="flex flex-col flex-shrink-0 gap-4 items-center pb-8 sm:gap-7 sm:items-end">
              <ActionButton onClick={handleStart}>좋아</ActionButton>

              <ActionButton onClick={handleSkip}>다음에 할래</ActionButton>
            </nav>
          </section>
        </article>
      </section>
    </PageContainer>
  );
};
