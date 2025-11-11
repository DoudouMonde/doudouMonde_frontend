import { NeedFriendDoudou } from "@/assets/icons/playroom";
import { StorytownTree5 } from "@/assets/icons/playroom/storytown_tree";
import { AddReviewBtn } from "@/domains/child/components/AddReviewBtn";
import { TitleWithClount } from "@/domains/review/components/TitleWithCount";

export const EmptyReviewsPage = () => {
  return (
    <>
    {/* 나무 이미지 삽입 */}
    <StorytownTree5/>
       
      <TitleWithClount />
      <AddReviewBtn />
      {/* 두두이미지  */}
         <NeedFriendDoudou className="w-32"/>

    </>
  );
};
