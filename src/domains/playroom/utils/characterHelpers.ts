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

const accessoryModules = {
  crown: CrownCharacters,
  cap: CapCharacters,
  flower: FlowerCharacters,
  glasses: GlassesCharacters,
  ribbon: RibbonCharacters,
  wizhat: WizhatCharacters,
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

  let characterModule = (accessoryModules as any)[accessory];

  if (!characterModule) return null;

  return characterModule[componentName];
};
