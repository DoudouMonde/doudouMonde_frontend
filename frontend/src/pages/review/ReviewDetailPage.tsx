import { useNavigate, useParams } from "react-router-dom";
import { ReviewMetaInfo } from "@/domains/review/components/ReviewMetaInfo";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { ReviewTree } from "@/domains/playroom/components/ReviewTree";
import { useReviewDetail } from "@/domains/review/hooks/useReviewDetail";
import { ConfirmModal } from "@/shared/components";
import { useState } from "react";
import { reviewApi } from "@/domains/review/apis/reviewApi";
import { PATH } from "@/shared/constants";
import { OneButtonModal } from "@/shared/components/Modal/OneButtonModal";
import { useAlert } from "@/shared/hooks/useAlert";

export const ReviewDetailPage = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams<{ reviewId: string }>();
  const { reviewData, isLoading, error } = useReviewDetail(reviewId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { alertModal, openAlert, closeAlert } = useAlert();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  const handleEditClick = () => {
    navigate(`/reviews/${reviewId}/edit`);
  };

  const handleConfirmDelete = async () => {
    try {
      await reviewApi.deleteReview(Number(reviewId));
      //삭제가 완료되었다는 모달 띄우기
      openAlert({
        title: "삭제 완료",
        message: "리뷰가 삭제되었습니다.",
        buttonText: "확인",
        onConfirm: () => navigate(PATH.REVIEW_LIST),
      });
      handleCloseModal();
      //리뷰 리스트 화면으로 이동하기
      navigate(PATH.REVIEW_LIST);
    } catch (error) {
      console.log("리뷰 삭제 중 오류: ", error);
      //삭제 중 오류가 발생했다는 모달 띄우기
      openAlert({
        title: "오류 발생",
        message: "잠시 후 다시 시도해주세요.",
        buttonText: "확인",
        onConfirm: () => {},
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // const handleEdit = () => navigate(PATH);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">리뷰를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !reviewData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="mb-4 text-lg text-red-600">
            {error || "리뷰를 찾을 수 없습니다."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white bg-blue-100 rounded-lg hover:bg-blue-200"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <PlayroomLayout>
      {/* 스크롤 가능한 콘텐츠 */}
      <section className="flex relative z-10">
        <ReviewTree />
        <figure className="absolute inset-x-0 bottom-0 -mb-10 flex justify-center">
          <AnimalPreview
            step="accessory"
            isAnimating={false}
            isShadow={false}
            selectedAnimal={reviewData.characterAnimal}
            selectedEmotion={reviewData.characterEmotion}
            selectedAcc={reviewData.characterAccessory}
          />
        </figure>
      </section>

      {/* 회색 배경 콘텐츠 영역 */}
      <article className="relative -z-50  bg-gray-200 backdrop-blur-sm py-6 w-full ">
        <header className="flex justify-center">
          <ReviewMetaInfo reviewData={reviewData} />
          <hr className="mb-6 border-secondary-100/30" />
        </header>
        {/* 리뷰 내용 */}
        <section className="px-6">
          <div className="flex justify-between  mb-4">
            <p className="title-inter body-hak-b">기록장</p>
            <div className="flex text-gray-900 subtitle-b gap-2">
              <button
                className="bg-yellow-200 rounded-[10px] w-20 py-1"
                onClick={handleEditClick}
              >
                수정
              </button>
              <button
                className="bg-tertiary-100 rounded-[10px] w-20 py-1"
                onClick={handleDeleteClick}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {reviewData.imageUrls.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`review-image-${idx}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ))}
            {/* 텍스트 후기 */}
            <div className="py-4 ">
              <p className="text-black body-hak-r ">{reviewData.content}</p>
            </div>
          </div>
        </section>
      </article>
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="기록장을 정말 삭제하시겠어요?"
          message="삭제한 시 상상친구와 공연기록이 모두
          영구적으로 사라집니다."
          confirmText="삭제"
          onConfirm={handleConfirmDelete}
        />
      )}

      {alertModal && (
        <OneButtonModal
          isOpen={alertModal.isOpen}
          title={alertModal.title}
          message={alertModal.message}
          buttonText={alertModal.buttonText}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </PlayroomLayout>
  );
};
