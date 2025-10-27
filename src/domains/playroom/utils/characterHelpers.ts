import * as EmotionCharacters from "@/assets/icons/playroom/storytown/character/emotion";
import * as CrownCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/crown";
import * as CapCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/cap";
import * as FlowerCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/flower";
import * as GlassesCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/glasses";
import * as RibbonCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/ribbon";
import * as WizhatCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/wizhat";

export const getEmotionCharacter = (animal: string, emotion: string) => {
  const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
  const emotionName = emotion.charAt(0).toUpperCase() + emotion.slice(1);
  const componentName = `${animalName}${emotionName}`;

  const mappedComponentName = componentName.replace("Onemore", "Onemore");

  return (
    EmotionCharacters as Record<
      string,
      React.ComponentType<{ className?: string }>
    >
  )[mappedComponentName];
};

export const getAccessoryCharacter = (
  animal: string,
  emotion: string,
  accessory: string
) => {
  const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
  const emotionName = emotion.charAt(0).toUpperCase() + emotion.slice(1);
  const accessoryName = accessory.charAt(0).toUpperCase() + accessory.slice(1);
  const componentName = `${animalName}${emotionName}${accessoryName}`;

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
