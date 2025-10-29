export interface BookMakeModalProps {
  onClose: () => void; // ← Modal 시그니처에 맞춤
  onPurchase: () => void; // ← '구매하러 가기' 핸들러
}

export const BookMakeModal = ({ onClose, onPurchase }: BookMakeModalProps) => {
  return (
    <section className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-gray-900/50">
      <article className="p-6 mx-4 w-full max-w-sm bg-gray-200 rounded-2xl shadow-2xl transition-all duration-300 transform scale-100">
        <section className="space-y-4 text-center">
          <p className="mb-2 text-4xl">🎉</p>
          <h3 className="text-lg font-bold text-gray-800 title-hak">
            축하해요!
          </h3>
          <p className="leading-relaxed text-gray-600 subtitle">
            이야기마을 후기를 9개 작성하셨네요!
            <br />
            우리 아이와 공연 추억을 담은
            <br />
            이야기마을북을 구매할 수 있어요
          </p>

          <nav className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 font-medium text-gray-700 bg-gray-100 rounded-xl transition-colors duration-200 hover:bg-gray-300"
            >
              취소
            </button>
            <button
              onClick={onPurchase}
              className="flex-1 px-4 py-3 font-medium text-gray-200 bg-green-200 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl transition-all duration-200 transform hover:shadow-lg hover:scale-105"
            >
              구매하러 가기
            </button>
          </nav>
        </section>
      </article>
    </section>
  );
};
