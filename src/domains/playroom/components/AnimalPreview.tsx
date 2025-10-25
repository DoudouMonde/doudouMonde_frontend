import { Shadow } from "@/assets/icons/playroom";
import { animals } from "@/domains/playroom/constants/animals";
import { ChickBody } from "@/assets/icons/playroom/type_body";

export interface AnimalPreviewProps {
  selectedAnimal: string;
  isAnimating: boolean;
}

export const AnimalPreview = ({
  selectedAnimal,
  isAnimating,
}: AnimalPreviewProps) => {
  return (
    <div className="flex relative z-10 flex-col items-center">
      <div className="flex justify-center">
        {(() => {
          const selected = animals.find((a) => a.id === selectedAnimal);
          const BodyIcon = selected?.bodyIcon ?? ChickBody;
          return (
            <BodyIcon
              className={`w-[350px] h-[250px] relative z-20 ${
                isAnimating ? "animate-gentle-bounce" : ""
              }`}
            />
          );
        })()}
      </div>
      <Shadow className="w-[147px] h-[40px] mt-[-40px] relative z-10" />
    </div>
  );
};
