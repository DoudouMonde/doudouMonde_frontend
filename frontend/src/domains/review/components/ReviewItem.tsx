import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import {
  CharacterAccessories,
  CharacterEmotion,
  CharacterType,
} from "../types";
import { ReviewListRecord } from "../types/reviewApiTypes";

const mockData: ReviewListRecord = {
  id: "1",
  watchDate: "2024-03-14",
  //   tree: string;
  performance: {
    name: "햄릿",
    posterUrl: "https://picsum.photos/id/1015/400/400",
  },
  character: {
    animal: CharacterType.CAT,
    emotion: CharacterEmotion.HAPPY,
    accessory: CharacterAccessories.FLOWER,
  },
};

export const ReviewItem = ({ review }: { review: ReviewListRecord }) => {
  const displayReview = review || mockData;

  return (
    <article className="rounded-3xl border border-gray-400 p-3 relative mb-4">
      <div className="flex  gap-4">
        <figure className="flex items-center">
          <img
            src={displayReview.performance.posterUrl}
            alt={`${displayReview.performance.name} 포스터`}
            className="w-20 h-32 object-cover rounded-lg"
          />
        </figure>

        <header className="flex flex-col justify-start flex-1 gap-2">
          <p className="body-inter-b">{displayReview.performance.name}</p>
          <time className="subtitle-b text-secondary-100">
            {displayReview.watchDate}
          </time>
        </header>

        <figure className="absolute -right-3 bottom-1 ml-auto">
          <AnimalPreview
            step="accessory"
            size="small"
            isAnimating={false}
            isShadow={false}
            selectedAnimal={displayReview.character.animal}
            selectedEmotion={displayReview.character.emotion}
            selectedAcc={displayReview.character.accessory}
          />
        </figure>
      </div>
    </article>
  );
};
