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
import { useReviewList } from "@/domains/review/hooks/useReviewLIst";

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

export const ReviewTree = () => {
  const { reviewCount } = useReviewList();
  const Tree = Trees[Math.min(reviewCount, 9)];
  return (
    <>
      <Tree className="w-full h-auto object-contain drop-shadow-[0px_0px_5px_rgba(0,0,0.5,0)]" />
    </>
  );
};
