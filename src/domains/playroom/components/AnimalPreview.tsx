import { Shadow } from "@/assets/icons/playroom";
import { animals } from "@/domains/playroom/constants/animals";
import { ChickBody } from "@/assets/icons/playroom/type_body";
import * as EmotionCharacters from "@/assets/icons/playroom/storytown/character/emotion";
import * as CrownCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/crown";
import * as CapCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/cap";
import * as FlowerCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/flower";
import * as GlassesCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/glasses";
import * as RibbonCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/ribbon";
import * as WizhatCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/wizhat";

export interface AnimalPreviewProps {
  step: "animal" | "emotion" | "accessory" | string;
  selectedAnimal: string;
  selectedEmotion?: string;
  selectedAcc?: string;
  isAnimating: boolean;

}

export const AnimalPreview = ({
  step,
  selectedAnimal,
  selectedEmotion,
  selectedAcc,
  isAnimating,
}: AnimalPreviewProps) => {

  const emotion = selectedEmotion ?? "";
  const accessory = selectedAcc ?? "";


  const getEmotionCharacter = (animal: string, emotion: string) => {
    const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
    const emotionName = emotion.charAt(0).toUpperCase() + emotion.slice(1);
    const componentName = `${animalName}${emotionName}`;

    // 컴포넌트 이름 매핑 (oneMore -> Onemore)
    const mappedComponentName = componentName.replace("Onemore", "Onemore");

    return (
      EmotionCharacters as Record<
        string,
        React.ComponentType<{ className?: string }>
      >
    )[mappedComponentName];
  };

    // 동물, 감정, 액세사리를 조합해서 캐릭터 컴포넌트를 가져오는 함수
    const getAccessoryCharacter = (
      animal: string,
      emotion: string,
      accessory: string
    ) => {
      const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
      const emotionName = emotion.charAt(0).toUpperCase() + emotion.slice(1);
      const accessoryName =
        accessory.charAt(0).toUpperCase() + accessory.slice(1);
      const componentName = `${animalName}${emotionName}${accessoryName}`;
  
      // 액세사리별로 다른 모듈에서 가져오기
      let characterModule: Record<
        string,
        React.ComponentType<{ className?: string }>
      >;
  
      switch (accessory) {
        case "crown":
          characterModule = CrownCharacters as Record<
            string,
            React.ComponentType<{ className?: string }>
          >;
          break;
        case "cap":
          characterModule = CapCharacters as Record<
            string,
            React.ComponentType<{ className?: string }>
          >;
          break;
        case "flower":
          characterModule = FlowerCharacters as Record<
            string,
            React.ComponentType<{ className?: string }>
          >;
          break;
        case "glasses":
          characterModule = GlassesCharacters as Record<
            string,
            React.ComponentType<{ className?: string }>
          >;
          break;
        case "ribbon":
          characterModule = RibbonCharacters as Record<
            string,
            React.ComponentType<{ className?: string }>
          >;
          break;
        case "wizhat":
          characterModule = WizhatCharacters as Record<
            string,
            React.ComponentType<{ className?: string }>
          >;
          break;
        default:
          return null;
      }
  
      return characterModule[componentName];
    };


  return (
    <div className="flex relative z-10 flex-col items-center">
<div className="flex justify-center">
          {(() => {

            if (step === "accessory") {
              // 액세사리 단계에서는 액세사리가 적용된 캐릭터 표시
              const AccessoryCharacter = getAccessoryCharacter(
                selectedAnimal,
                emotion,
                accessory
              );
              console.log("액세사리동물:", AccessoryCharacter);
              if (AccessoryCharacter) {
                return (
                  <AccessoryCharacter
                    className={`w-[350px] h-[250px] relative z-20 ${
                      isAnimating ? "animate-gentle-bounce" : ""
                    }`}
                  />
                );
              }
            } else if (step === "emotion") {
              // 감정 단계에서는 감정이 적용된 캐릭터 표시
              const EmotionCharacter = getEmotionCharacter(
                selectedAnimal,
                emotion
              );
              console.log("감정동물:", EmotionCharacter);
              if (EmotionCharacter) {
                return (
                  <EmotionCharacter
                    className={`w-[350px] h-[250px] relative z-20 ${
                      isAnimating ? "animate-gentle-bounce" : ""
                    }`}
                  />
                );
              }
            }
            else {
            // 동물 단계이거나 캐릭터를 찾을 수 없는 경우 기본 동물 표시
            const selectedAnimalData = animals.find(
              (animal) => animal.id === selectedAnimal
            );
            const BodyIcon = selectedAnimalData?.bodyIcon || ChickBody;
            return (
              <BodyIcon
                className={`w-[350px] h-[250px] relative z-20 ${
                  isAnimating ? "animate-gentle-bounce" : ""
                }`}
              />
            );
            }


          })()}
        </div>
      <Shadow className="w-[147px] h-[40px] mt-[-40px] relative z-10" />
    </div>
  );
};
